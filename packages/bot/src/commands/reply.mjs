// `reply <post> --text-file <file> --episode <ep> [--live]`: a reply under one of the show's own
// posts, which may tag the accounts that appear in that episode.
//
// The owner's ruling of 21 November 2026: "The bot tags only the accounts that appear in the episode
// a post is about". So every @handle in the text must be an account in
// episodes/<ep>/production/sources.json, and the mention's DID is the one on record there. A
// handle that now resolves to another DID is refused (handles change), and so is anyone on the
// opt-out list, any other @handle, and any link. This is the only command that ever mentions anyone.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createClient } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { resolveEpisodeId } from '../episodes.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { loadOptOut, normHandle } from '../optout.mjs';
import { LINK_RE, MENTION_RE_ALL, utf8Length } from '../richtext.mjs';
import { checkLangs, checkPostText, readTextFile } from './post.mjs';
import { parsePostRef } from './repost.mjs';

const USAGE = 'reply <post> --text-file <file> --episode <ep> [--live]';
const POST_COLLECTION = 'app.bsky.feed.post';
export const REPLY_LOG = 'data/bot/replies.jsonl';
const DID_RE = /^did:[a-z]+:[A-Za-z0-9._:%-]*[A-Za-z0-9._-]$/;

export default {
  name: 'reply',
  summary: 'reply under one of the show\'s own posts, tagging only accounts in that episode\'s sources; dry run unless --live',
  usage: USAGE,
  options: {
    'text-file': { type: 'string' },
    episode: { type: 'string' },
    live: { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  run,
};

/** The episode's accounts from production/sources.json: Map(normalised handle -> { handle, did }). */
export function loadEpisodeAccounts(root, ep) {
  const id = resolveEpisodeId(ep, root);
  const rel = `episodes/${id}/production/sources.json`;
  const path = join(root, rel);
  if (!existsSync(path)) throw new BotError(`${rel} does not exist, so no account in episode ${id} can be tagged`);
  let data;
  try { data = JSON.parse(readFileSync(path, 'utf8')); } catch (e) { throw new BotError(`${rel} is not valid JSON: ${e.message}`); }
  if (!Array.isArray(data?.accounts)) throw new BotError(`${rel} has no "accounts" list`);
  const accounts = new Map();
  for (const a of data.accounts) {
    if (typeof a?.handle !== 'string' || !a.handle.trim()) continue;
    accounts.set(normHandle(a.handle), { handle: normHandle(a.handle), did: typeof a.did === 'string' ? a.did.trim() : null, role: a.role ?? null });
  }
  return { id, rel, accounts };
}

/**
 * Every @handle in the text, with where it sits: `at` is the UTF-16 index of the "@", `written`
 * the text as written ("@Name.Example"), `handle` normalised.
 */
export function findMentions(text) {
  const found = [];
  for (const m of text.matchAll(MENTION_RE_ALL)) {
    const written = m[2].replace(/[.:_-]+$/, '');
    found.push({ at: m.index + m[1].length, written, handle: normHandle(written.slice(1)) });
  }
  return found;
}

/** A mention facet over "@handle": UTF-8 byte offsets, start inclusive, end exclusive. */
export function mentionFacet(text, at, written, did) {
  const byteStart = utf8Length(text.slice(0, at));
  return { index: { byteStart, byteEnd: byteStart + utf8Length(written) }, features: [{ $type: 'app.bsky.richtext.facet#mention', did }] };
}

/** reply.root is the parent's own root when the parent is a reply, else the parent. */
export function replyRefs(parent) {
  const p = { uri: parent.uri, cid: parent.cid };
  const r = parent.record?.reply?.root;
  if (r && typeof r.uri === 'string' && typeof r.cid === 'string') return { root: { uri: r.uri, cid: r.cid }, parent: p };
  return { root: p, parent: p };
}

async function resolveDid(client, handle) {
  const res = await client.resolveHandle(handle);
  if (typeof res?.did !== 'string' || !DID_RE.test(res.did)) throw new BotError(`could not resolve @${handle} to a DID`);
  return res.did;
}

async function run(ctx) {
  const { positionals, values, env, out, root, cwd, now, fetch, configPath } = ctx;
  if (positionals.length !== 1) throw new UsageError(`usage: ${USAGE}`);
  if (!values['text-file']) throw new UsageError(`reply needs --text-file <file>\nusage: ${USAGE}`);
  if (!values.episode) throw new UsageError(`reply needs --episode <ep>: the episode the post is about, whose accounts may be tagged\nusage: ${USAGE}`);
  const settings = loadSettings({ env, configPath, showConfigPath: join(root, 'show.config.json') });
  if (!settings.did) throw new BotError('reply needs the show\'s DID: set bluesky.did in show.config.json (the bot replies only under its own posts)');
  if (values.live) {
    const missing = [];
    if (!settings.handle) missing.push('a handle: set bluesky.handle in show.config.json (or BSKY_HANDLE)');
    if (!env.BSKY_APP_PASSWORD) missing.push('BSKY_APP_PASSWORD in the environment (locally: put it in .secrets; npm run bot loads it)');
    if (missing.length) throw new BotError(`--live needs ${missing.join(', and ')}. Use an app password, never the account password.`);
  }

  // Everything that can be refused locally is refused here, before any request.
  const ref = parsePostRef(positionals[0]);
  if (ref.actor.did && ref.actor.did !== settings.did) {
    throw new BotError(`the bot replies only under its own posts: ${ref.actor.did} is not the show's account (${settings.did})`);
  }
  if (ref.actor.handle && settings.handle && ref.actor.handle !== normHandle(settings.handle)) {
    throw new BotError(`the bot replies only under its own posts: @${ref.actor.handle} is not the show's account (@${settings.handle})`);
  }
  const textPath = resolve(cwd, values['text-file']);
  const text = readTextFile(textPath, 'text file');
  if (!text) throw new BotError(`the text file ${values['text-file']} is empty`);
  const stats = checkPostText(text, 'the reply text');
  const link = text.match(LINK_RE);
  if (link) throw new BotError(`the reply text contains "${link[0]}", which reads as a link; a reply carries no links`);
  const episode = loadEpisodeAccounts(root, values.episode);
  const optOut = loadOptOut(root);
  const mentions = findMentions(text).map((m) => {
    if (m.handle.startsWith('did:')) throw new BotError(`the reply text contains "${m.written}": tag an account by its handle, as it appears in ${episode.rel}`);
    const rec = episode.accounts.get(m.handle);
    if (!rec) {
      throw new BotError(`the reply text tags @${m.handle}, who is not an account in ${episode.rel}. The bot tags only the accounts that appear in the episode a post is about (the owner's ruling, 21 November 2026).`);
    }
    if (!rec.did || !DID_RE.test(rec.did)) throw new BotError(`@${m.handle} is in ${episode.rel} without a DID, so the mention has nothing to point at`);
    if (optOut.has({ did: rec.did, handle: m.handle })) throw new BotError(`@${m.handle} is on the opt-out list (${optOut.path}). The show does not tag them.`);
    return { ...m, did: rec.did };
  });
  const langs = checkLangs(settings.langs);
  const shown = (p) => { const r = relative(cwd, p); return !r ? p : r.startsWith('..') ? p : r; };

  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });
  const session = values.live ? await client.createSession({ identifier: settings.handle, password: env.BSKY_APP_PASSWORD }) : null;
  if (session) {
    out(`Logged in as @${session.handle} (${session.did}) on ${client.service}`);
    if (session.did !== settings.did) throw new BotError(`refusing: logged in as ${session.did}, but bluesky.did in show.config.json is ${settings.did}`);
  }

  // Handles change: each must still point at the DID on record, checked now.
  const checked = new Map();
  for (const m of mentions) {
    if (checked.has(m.handle)) continue;
    const now_ = await resolveDid(client, m.handle);
    if (now_ !== m.did) {
      throw new BotError(`@${m.handle} now resolves to ${now_}, but ${episode.rel} records ${m.did}: the handle has moved, so it is not the account in the episode. Nothing was sent.`);
    }
    checked.set(m.handle, now_);
  }

  // The parent, read now: it must be the show's own post.
  const parentDid = ref.actor.did ?? await resolveDid(client, ref.actor.handle);
  if (parentDid !== settings.did) throw new BotError(`the bot replies only under its own posts: ${ref.given} is by ${parentDid}, not the show's account (${settings.did})`);
  const parentUri = `at://${parentDid}/${POST_COLLECTION}/${ref.rkey}`;
  const res = await client.getPosts([parentUri], { appView: settings.appView });
  const parent = (res?.posts ?? []).find((p) => p?.uri === parentUri);
  if (!parent || typeof parent.cid !== 'string') throw new BotError(`post not found: ${parentUri} (deleted, or not shown to logged-out readers). Nothing was sent.`);
  if (parent.author?.did !== settings.did) throw new BotError(`the bot replies only under its own posts: the AppView says ${parentUri} is by ${parent.author?.did ?? 'nobody'}`);

  const record = {
    $type: POST_COLLECTION,
    text,
    ...(mentions.length ? { facets: mentions.map((m) => mentionFacet(text, m.at, m.written, m.did)) } : {}),
    langs: [...langs],
    reply: replyRefs(parent),
    createdAt: now().toISOString(),
  };

  if (!values.live) {
    out([
      'DRY RUN: nothing was sent. Add --live to reply.',
      '',
      `Under:    ${ref.given}`,
      `          ${parent.uri} (cid ${parent.cid}), the show's own post${parent.record?.reply ? ', itself a reply' : ''}`,
      `Episode:  ${episode.id} (${episode.rel})`,
      `Text:     ${shown(textPath)}: ${stats.graphemes} graphemes, ${stats.bytes} bytes; no links`,
      ...text.split('\n').map((l) => `  | ${l}`),
      `Mentions: ${mentions.length ? '' : 'none'}`,
      ...mentions.map((m, i) => `  ${m.written} -> ${m.did} (from ${episode.rel}; resolves there now; not opted out), bytes ${record.facets[i].index.byteStart}-${record.facets[i].index.byteEnd}`),
      '',
      `With --live the bot would log in, stop unless the session is ${settings.did}, check the handles and the post again,`,
      `and POST com.atproto.repo.createRecord to ${POST_COLLECTION} with this record (createdAt set at that moment), logging it to ${REPLY_LOG}:`,
      '',
      JSON.stringify(record, null, 2),
    ].join('\n'));
    return 0;
  }

  const created = await client.createRecord({ repo: session.did, collection: POST_COLLECTION, record });
  const rkey = created.uri.split('/').pop();
  const url = `https://bsky.app/profile/${session.handle}/post/${rkey}`;
  mkdirSync(join(root, 'data/bot'), { recursive: true });
  appendFileSync(join(root, REPLY_LOG), `${JSON.stringify({
    at: now().toISOString(), episode: episode.id, uri: created.uri, url, parent: record.reply.parent.uri, root: record.reply.root.uri,
    mentions: mentions.map((m) => ({ handle: m.handle, did: m.did })),
  })}\n`);
  out(`Replied ${created.uri}\n  ${url}\n  logged: ${REPLY_LOG}`);
  return 0;
}
