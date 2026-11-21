// `repost <post> [--live] [--undo]`: repost one post, or take the repost back.
//
// Only authors whose DID is in bluesky.repostAuthors in show.config.json can be reposted: that
// committed list is how the owner allows an account. A repost carries no text and no facets, so
// it can never mention anyone. Taking a repost back (--undo) needs no permission: it only removes.
import { appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createClient, XrpcError } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { LIST_RECORDS_MAX_LIMIT } from '../limits.mjs';
import { loadOptOut, normHandle } from '../optout.mjs';
import { parseRecipient } from './dm.mjs';

const USAGE = 'repost <post> [--live] [--undo]';
const POST_COLLECTION = 'app.bsky.feed.post';
export const REPOST_COLLECTION = 'app.bsky.feed.repost';
/** The local record of what was reposted, relative to the repo root (gitignored by /data/). */
export const REPOST_LOG = 'data/bot/reposts.jsonl';
/** How far back the "already reposted?" check reads: pages of LIST_RECORDS_MAX_LIMIT reposts. */
export const REPOST_PAGES = 10;

const DID_RE = /^did:[a-z]+:[A-Za-z0-9._:%-]*[A-Za-z0-9._-]$/;
const RKEY_RE = /^[A-Za-z0-9._:~-]{1,512}$/;
const LIST = 'bluesky.repostAuthors in show.config.json';

export default {
  name: 'repost',
  summary: 'repost a post by an account on the repost list (--undo takes it back); dry run unless --live',
  usage: USAGE,
  options: {
    live: { type: 'boolean', default: false },
    undo: { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  rejected: {
    text: 'a repost carries no text. To say something about a post, that is a quote post, which this command does not make.',
    quote: 'repost makes plain reposts only, never quote posts.',
    mention: 'a repost carries no text, so it cannot mention anyone. See README, "No mentions".',
  },
  run,
};

/**
 * `https://bsky.app/profile/<handle-or-did>/post/<rkey>` or `at://<handle-or-did>/app.bsky.feed.post/<rkey>`.
 * Returns { actor: { did } | { handle }, rkey, given }.
 */
export function parsePostRef(raw) {
  const v = String(raw ?? '').trim();
  const bad = () => new UsageError(`"${v}" is not a post address: use https://bsky.app/profile/<handle-or-did>/post/<rkey> or at://<did>/app.bsky.feed.post/<rkey>`);
  let actor; let rkey;
  if (v.startsWith('at://')) {
    const m = v.match(/^at:\/\/([^/?#]+)\/app\.bsky\.feed\.post\/([^/?#]+)$/);
    if (!m) throw bad();
    [, actor, rkey] = m;
  } else {
    let u;
    try { u = new URL(v); } catch { throw bad(); }
    if (u.protocol !== 'https:' || !['bsky.app', 'www.bsky.app'].includes(u.hostname)) throw bad();
    const m = u.pathname.match(/^\/profile\/([^/]+)\/post\/([^/]+)\/?$/);
    if (!m) throw bad();
    [, actor, rkey] = m;
  }
  try { actor = decodeURIComponent(actor); rkey = decodeURIComponent(rkey); } catch { throw bad(); }
  if (!RKEY_RE.test(rkey) || rkey === '.' || rkey === '..') throw bad();
  const who = parseRecipient(actor);
  return { actor: who.did ? { did: who.did } : { handle: who.handle }, rkey, given: v };
}

/** The committed allow-list, checked: a non-empty array of DIDs. */
export function loadRepostAuthors(raw) {
  if (!Array.isArray(raw) || !raw.length) {
    throw new BotError(`${LIST} is missing or empty. It lists the DIDs whose posts the show may repost; nothing is reposted without it.`);
  }
  const dids = new Set();
  for (const d of raw) {
    if (typeof d !== 'string' || !DID_RE.test(d.trim())) throw new BotError(`${LIST}: ${JSON.stringify(d)} is not a DID (did:<method>:<id>)`);
    dids.add(d.trim());
  }
  return dids;
}

function checkAllowed(allowed, did, label) {
  if (!allowed.has(did)) {
    throw new BotError(`${label} (${did}) is not on the repost list. The show reposts only authors whose DID is in ${LIST}: adding a DID there, in a commit, is how the owner allows an account.`);
  }
}

function checkOptOut(optOut, who) {
  if (optOut.has(who)) {
    throw new BotError(`${who.handle ? `@${who.handle}` : who.did} is on the opt-out list (${optOut.path}). The show does not repost them.`);
  }
}

/** True when the post view, or the record under it, carries a video (alone or with a quote). */
export function hasVideo(post) {
  const isVideo = (e) => typeof e?.$type === 'string' && e.$type.startsWith('app.bsky.embed.video');
  return [post?.embed, post?.embed?.media, post?.record?.embed, post?.record?.embed?.media].some(isVideo);
}

/** The account's repost of `subjectUri`, or null. Reads the account's own repost collection. */
export async function findRepost(client, repo, subjectUri, { auth = true, pages = REPOST_PAGES } = {}) {
  let cursor;
  let seen = 0;
  for (let page = 0; page < pages; page++) {
    const res = await client.listRecords({ repo, collection: REPOST_COLLECTION, limit: LIST_RECORDS_MAX_LIMIT, cursor, auth });
    for (const rec of res?.records ?? []) {
      seen++;
      if (rec?.value?.subject?.uri === subjectUri) return { record: rec, seen };
    }
    cursor = res?.cursor;
    if (!cursor || !res?.records?.length) break;
  }
  return { record: null, seen };
}

async function resolveDid(client, actor) {
  if (actor.did) return actor.did;
  const res = await client.resolveHandle(actor.handle);
  if (typeof res?.did !== 'string' || !DID_RE.test(res.did)) throw new BotError(`could not resolve @${actor.handle} to a DID`);
  return res.did;
}

/** The post as the public AppView shows it; checks that it is there and is the author's. */
async function fetchPost(client, settings, uri, did) {
  const res = await client.getPosts([uri], { appView: settings.appView });
  const post = (res?.posts ?? []).find((p) => p?.uri === uri);
  if (!post) throw new BotError(`post not found: ${uri} (deleted, or not shown to logged-out readers). Nothing was reposted.`);
  if (typeof post.cid !== 'string' || !post.cid) throw new BotError(`the AppView returned ${uri} without a CID, so a repost cannot point at it exactly`);
  if (post.author?.did !== did) throw new BotError(`the AppView says ${uri} is by ${post.author?.did ?? 'nobody'}, not ${did}; refusing`);
  return post;
}

function describePost(post, given) {
  const text = typeof post.record?.text === 'string' ? post.record.text : '';
  const n = (k) => (Number.isInteger(post[k]) ? post[k] : '?');
  return [
    `Post:     ${given}`,
    `Subject:  ${post.uri}`,
    `          cid ${post.cid}`,
    `Author:   @${post.author?.handle ?? '?'} (${post.author?.did})${post.author?.displayName ? `, "${post.author.displayName}"` : ''}`,
    `Posted:   ${post.record?.createdAt ?? '(no date)'}`,
    `Counts:   ${n('replyCount')} replies, ${n('repostCount')} reposts, ${n('quoteCount')} quotes, ${n('likeCount')} likes`,
    `Video:    ${hasVideo(post) ? 'yes' : 'no'}`,
    'Text:',
    ...(text ? text.split('\n').map((l) => `  | ${l}`) : ['  (no text)']),
  ];
}

function needLogin(settings, env) {
  const missing = [];
  if (!settings.handle) missing.push('a handle: set bluesky.handle in show.config.json (or BSKY_HANDLE)');
  if (!settings.did) missing.push('the account DID: set bluesky.did in show.config.json');
  if (!env.BSKY_APP_PASSWORD) missing.push('BSKY_APP_PASSWORD in the environment (locally: put it in .secrets; npm run bot loads it)');
  if (missing.length) throw new BotError(`--live needs ${missing.join(', and ')}. Use an app password, never the account password.`);
}

async function login(ctx, settings, client) {
  const { env, out } = ctx;
  const session = await client.createSession({ identifier: settings.handle, password: env.BSKY_APP_PASSWORD });
  out(`Logged in as @${session.handle} (${session.did}) on ${client.service}`);
  if (session.did !== settings.did) {
    throw new BotError(`refusing: logged in as ${session.did}, but bluesky.did in show.config.json is ${settings.did}`);
  }
  return session;
}

function log(root, now, entry) {
  const path = join(root, REPOST_LOG);
  mkdirSync(join(path, '..'), { recursive: true });
  appendFileSync(path, `${JSON.stringify({ at: now().toISOString(), ...entry })}\n`);
  return REPOST_LOG;
}

async function run(ctx) {
  const { positionals, values, env, root, configPath, fetch } = ctx;
  if (positionals.length !== 1) throw new UsageError(`usage: ${USAGE}`);
  const settings = loadSettings({ env, configPath, showConfigPath: join(root, 'show.config.json') });
  if (values.live) needLogin(settings, env);
  const ref = parsePostRef(positionals[0]);
  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });
  return values.undo ? undo(ctx, settings, client, ref) : repost(ctx, settings, client, ref);
}

async function repost(ctx, settings, client, ref) {
  const { values, out, root, now } = ctx;
  // Everything that can be refused locally is refused here, before any network call.
  const allowed = loadRepostAuthors(settings.repostAuthors);
  const optOut = loadOptOut(root);
  checkOptOut(optOut, ref.actor);
  if (ref.actor.did) checkAllowed(allowed, ref.actor.did, ref.actor.did);

  const target = settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)';
  const session = values.live ? await login(ctx, settings, client) : null;

  const did = await resolveDid(client, ref.actor);
  const label = ref.actor.handle ? `@${ref.actor.handle}` : did;
  checkOptOut(optOut, { did, handle: ref.actor.handle });
  checkAllowed(allowed, did, label);
  const subjectUri = `at://${did}/${POST_COLLECTION}/${ref.rkey}`;
  const post = await fetchPost(client, settings, subjectUri, did);
  checkOptOut(optOut, { did, handle: post.author?.handle ? normHandle(post.author.handle) : undefined });

  const record = { $type: REPOST_COLLECTION, subject: { uri: post.uri, cid: post.cid }, createdAt: now().toISOString() };

  if (!values.live) {
    const lines = ['DRY RUN: nothing was sent. Add --live to repost.', '', ...describePost(post, ref.given), '',
      `Allowed:  the author is in ${LIST}, and not on the opt-out list`,
      `Account:  ${target} (${settings.did ?? 'no DID: set bluesky.did in show.config.json'}) on ${settings.service}`];
    let already = null;
    if (settings.did) {
      try {
        const found = await findRepost(client, settings.did, post.uri, { auth: false });
        already = found.record;
        lines.push(already
          ? `Already:  reposted, at ${already.uri}. --live would stop and write nothing.`
          : `Already:  no repost of this post among the account's last ${found.seen} reposts`);
      } catch (e) {
        lines.push(`Already:  could not check without logging in (${e.message}); --live checks after logging in`);
      }
    }
    if (!already) {
      lines.push('', 'With --live the bot would:',
        `  1. POST com.atproto.server.createSession as ${target}, and stop unless the session's DID is ${settings.did ?? '(bluesky.did)'}`,
        '  2. read the post again and repeat these checks',
        `  3. GET  com.atproto.repo.listRecords on its own ${REPOST_COLLECTION} (up to ${REPOST_PAGES * LIST_RECORDS_MAX_LIMIT}), and stop if it already reposted this`,
        `  4. POST com.atproto.repo.createRecord to ${REPOST_COLLECTION} with this record (createdAt is set at that moment),`,
        `     and append a line to ${REPOST_LOG}:`, '', JSON.stringify(record, null, 2));
    }
    out(lines.join('\n'));
    return 0;
  }

  const { record: existing } = await findRepost(client, session.did, post.uri);
  if (existing) {
    out(`Already reposted: ${existing.uri} is the account's repost of ${post.uri}. Nothing was written.`);
    return 0;
  }
  const created = await client.createRecord({ repo: session.did, collection: REPOST_COLLECTION, record });
  if (typeof created?.uri !== 'string') throw new BotError('createRecord returned no address; check the account before trying again');
  const logged = log(root, now, { action: 'repost', subject: record.subject, repost: created.uri });
  out(`Reposted ${post.uri}\n  repost: ${created.uri}\n  logged: ${logged}`);
  return 0;
}

async function undo(ctx, settings, client, ref) {
  const { values, out, root, now } = ctx;
  const target = settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)';
  const session = values.live ? await login(ctx, settings, client) : null;
  const did = await resolveDid(client, ref.actor);
  const subjectUri = `at://${did}/${POST_COLLECTION}/${ref.rkey}`;

  if (!values.live) {
    const lines = ['DRY RUN: nothing was sent. Add --live to take the repost back.', '', `Post:     ${ref.given}`, `Subject:  ${subjectUri}`,
      `Account:  ${target} (${settings.did ?? 'no DID: set bluesky.did in show.config.json'}) on ${settings.service}`];
    if (!settings.did) {
      lines.push('Repost:   cannot look for it without bluesky.did in show.config.json');
    } else {
      try {
        const found = await findRepost(client, settings.did, subjectUri, { auth: false });
        if (found.record) {
          const rkey = found.record.uri.split('/').pop();
          lines.push(`Repost:   ${found.record.uri} (cid ${found.record.cid})`, '', 'With --live the bot would log in, find it again, and:',
            `  POST com.atproto.repo.deleteRecord ${REPOST_COLLECTION}/${rkey} with swapRecord ${found.record.cid},`,
            `  and append a line to ${REPOST_LOG}`);
        } else {
          lines.push(`Repost:   none among the account's last ${found.seen} reposts; --live would find nothing to undo`);
        }
      } catch (e) {
        lines.push(`Repost:   could not look without logging in (${e.message}); --live looks after logging in`);
      }
    }
    out(lines.join('\n'));
    return 0;
  }

  const { record: existing } = await findRepost(client, session.did, subjectUri);
  if (!existing) {
    out(`The account has no repost of ${subjectUri}. Nothing to undo; nothing was written.`);
    return 0;
  }
  const rkey = existing.uri.split('/').pop();
  try {
    await client.deleteRecord({ repo: session.did, collection: REPOST_COLLECTION, rkey, swapRecord: existing.cid });
  } catch (e) {
    if (e instanceof XrpcError && e.error === 'InvalidSwap') throw new BotError(`the repost ${existing.uri} changed since it was read, so nothing was deleted. Run the command again.`);
    throw e;
  }
  const logged = log(root, now, { action: 'undo', subject: { uri: subjectUri, cid: existing.value?.subject?.cid ?? null }, repost: existing.uri });
  out(`Took back the repost of ${subjectUri}\n  deleted: ${existing.uri}\n  logged:  ${logged}`);
  return 0;
}
