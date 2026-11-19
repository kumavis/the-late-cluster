// `dm send <handle-or-did> --file <path> [--live]` and `dm read <handle-or-did> [--limit N] [--json]`:
// interview someone by direct message, and read the answer later.
//
// Message text is private. It is printed to the terminal and appended to the gitignored local log
// data/bot/dm/<did>/sent.jsonl, and never written anywhere that is committed.
import { appendFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createClient, XrpcError } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { CHAT_PAGE_MAX_LIMIT, DM_MAX_BYTES, DM_MAX_GRAPHEMES } from '../limits.mjs';
import { loadOptOut, normHandle } from '../optout.mjs';
import { graphemeLength, utf8Length } from '../richtext.mjs';

const USAGE = 'dm send <handle-or-did> --file <path> [--live] | dm read <handle-or-did> [--limit 50] [--json]';
/** Where the sent log goes, relative to the repo root (gitignored by /data/). */
export const DM_LOG_DIR = 'data/bot/dm';
const DEFAULT_READ_LIMIT = 50;
const MAX_READ_LIMIT = 1000;
/** How many pages of conversations `dm read` looks through to find the one with the recipient. */
export const CONVO_PAGES = 20;

const DID_RE = /^did:[a-z]+:[A-Za-z0-9._:%-]+$/;
const HANDLE_RE = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/;
// Anything that reads as tagging an account: @ at a word start followed by a name or DID.
const MENTION_RE = /(^|[^\w])(@[a-z0-9][a-z0-9.:_-]*)/i;
// Anything that reads as a link: a scheme, www., or a domain with a path.
const LINK_RE = /\b[a-z][a-z0-9+.-]*:\/\/\S+|\bwww\.\S+|\b[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}\/\S*/i;

export default {
  name: 'dm',
  summary: 'send interview questions by direct message (dry run unless --live), or read the replies',
  usage: USAGE,
  options: {
    file: { type: 'string' },
    live: { type: 'boolean', default: false },
    limit: { type: 'string' },
    json: { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  rejected: {
    mention: 'dm never mentions accounts: a mention notifies people. See README, "No mentions".',
    tag: 'dm never tags accounts. See README, "No mentions".',
    facets: 'dm sends plain text only; it never sends facets.',
  },
  run,
};

/** A recipient as typed: { did } or { handle }. */
export function parseRecipient(raw) {
  const v = String(raw ?? '').trim();
  if (v.startsWith('did:')) {
    if (!DID_RE.test(v)) throw new UsageError(`"${v}" is not a valid DID`);
    return { did: v, given: v };
  }
  const handle = normHandle(v);
  if (!HANDLE_RE.test(handle)) throw new UsageError(`"${v}" is not a handle (like name.bsky.social) or a DID`);
  return { handle, given: `@${handle}` };
}

/**
 * Splits a file into messages: separated by a line holding only `---`, each trimmed of leading
 * and trailing blank lines, otherwise exactly as written (line endings become \n).
 */
export function parseMessages(text) {
  const lines = String(text).replace(/\r\n?/g, '\n').split('\n');
  const chunks = [[]];
  for (const line of lines) {
    if (line === '---') chunks.push([]);
    else chunks.at(-1).push(line);
  }
  return chunks.map((c) => {
    let a = 0; let b = c.length;
    while (a < b && !c[a].trim()) a++;
    while (b > a && !c[b - 1].trim()) b--;
    return c.slice(a, b).join('\n');
  });
}

/** Refuses anything the server would refuse, and anything that mentions or links. */
export function checkMessages(messages) {
  if (!messages.length) throw new BotError('the file holds no messages');
  messages.forEach((text, i) => {
    const which = `message ${i + 1} of ${messages.length}`;
    if (!text) throw new BotError(`${which} is empty (two --- lines in a row, or one at the start or end?)`);
    const g = graphemeLength(text);
    const bytes = utf8Length(text);
    if (g > DM_MAX_GRAPHEMES) throw new BotError(`${which} is ${g} graphemes; direct messages are limited to ${DM_MAX_GRAPHEMES}`);
    if (bytes > DM_MAX_BYTES) throw new BotError(`${which} is ${bytes} bytes; direct messages are limited to ${DM_MAX_BYTES}`);
    const mention = text.match(MENTION_RE);
    if (mention) throw new BotError(`${which} contains "${mention[2].replace(/[.:_-]+$/, '')}", which reads as a mention; the bot never mentions or tags anyone`);
    const link = text.match(LINK_RE);
    if (link) throw new BotError(`${which} contains "${link[0]}", which reads as a link; dm sends plain text only, with no links`);
  });
}

function checkOptOut(optOut, who) {
  if (optOut.has(who)) {
    throw new BotError(`${who.handle ? `@${who.handle}` : who.did} is on the opt-out list (${optOut.path}). The show does not contact them.`);
  }
}

/** Plain words for a failed chat call: the two likely causes, and the server's own error name. */
export function chatError(e, nsid, recipient) {
  if (!(e instanceof XrpcError)) return e;
  return new BotError([
    `${nsid} was refused: HTTP ${e.status}, server error ${e.error ?? '(none given)'}.`,
    'Two common causes, and the server does not always say which:',
    '  - the app password lacks direct-message access: create one with "Allow access to your direct messages" ticked and put it in .secrets;',
    `  - ${recipient} does not accept messages from this account (their chat setting, or a block).`,
  ].join('\n'));
}

async function run(ctx) {
  const { positionals, values } = ctx;
  const [sub, target, ...extra] = positionals;
  if (!['send', 'read'].includes(sub) || !target || extra.length) throw new UsageError(`usage: ${USAGE}`);
  if (sub === 'send') {
    if (values.limit !== undefined || values.json) throw new UsageError('--limit and --json are for dm read');
    return send(ctx, target);
  }
  if (values.live) throw new UsageError('dm read changes nothing, so it takes no --live');
  if (values.file !== undefined) throw new UsageError('--file is for dm send');
  return read(ctx, target);
}

function needLogin(settings, env, what) {
  const missing = [];
  if (!settings.handle) missing.push('a handle: set bluesky.handle in show.config.json (or BSKY_HANDLE)');
  if (!settings.did) missing.push('the account DID: set bluesky.did in show.config.json');
  if (!env.BSKY_APP_PASSWORD) missing.push('BSKY_APP_PASSWORD in the environment (locally: put it in .secrets; npm run bot loads it)');
  if (missing.length) {
    throw new BotError(`${what} needs ${missing.join(', and ')}. Use an app password with direct-message access, never the account password.`);
  }
}

/** Logs in, checks the account, and resolves the recipient to a DID, checking the opt-out list again. */
async function connect(ctx, settings, recipient, optOut) {
  const { env, fetch, out } = ctx;
  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });
  const session = await client.createSession({ identifier: settings.handle, password: env.BSKY_APP_PASSWORD });
  out(`Logged in as @${session.handle} (${session.did}) on ${client.service}`);
  if (session.did !== settings.did) {
    throw new BotError(`refusing: logged in as ${session.did}, but bluesky.did in show.config.json is ${settings.did}`);
  }
  let did = recipient.did;
  if (!did) {
    const res = await client.resolveHandle(recipient.handle);
    if (typeof res?.did !== 'string' || !DID_RE.test(res.did)) throw new BotError(`could not resolve @${recipient.handle} to a DID`);
    did = res.did;
  }
  checkOptOut(optOut, { did, handle: recipient.handle });
  if (did === session.did) throw new BotError('the recipient is the show\'s own account');
  return { client, session, did };
}

/** The handles a convo view gives for the recipient, checked against the opt-out list too. */
function checkMembers(optOut, convo, did) {
  for (const m of convo?.members ?? []) if (m?.did === did) checkOptOut(optOut, { did, handle: m.handle });
}

async function send(ctx, target) {
  const { values, env, out, root, cwd, now, configPath } = ctx;
  const settings = loadSettings({ env, configPath, showConfigPath: join(root, 'show.config.json') });
  if (values.live) needLogin(settings, env, '--live');

  // Everything that can fail locally fails here, before any network call.
  const recipient = parseRecipient(target);
  const optOut = loadOptOut(root);
  checkOptOut(optOut, recipient);
  if (!values.file) throw new UsageError('dm send needs --file <path>: the messages, separated by lines holding only ---');
  const file = resolve(cwd, values.file);
  if (!existsSync(file) || !statSync(file).isFile()) throw new BotError(`message file ${values.file} does not exist`);
  const messages = parseMessages(readFileSync(file, 'utf8'));
  checkMessages(messages);
  const shown = (p) => { const r = relative(cwd, p); return !r ? p : r.startsWith('..') ? p : r; };

  if (!values.live) {
    const lines = [
      'DRY RUN: nothing was sent. Add --live to send.',
      '',
      `To:       ${recipient.given} (not on the opt-out list)`,
      `From:     ${settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)'} (${settings.did ?? 'no DID: set bluesky.did in show.config.json'})`,
      `File:     ${shown(file)}`,
      `Messages: ${messages.length}, plain text, sent in this order:`,
    ];
    messages.forEach((m, i) => {
      lines.push('', `--- ${i + 1}/${messages.length} (${graphemeLength(m)}/${DM_MAX_GRAPHEMES} graphemes, ${utf8Length(m)} bytes)`, m);
    });
    lines.push(
      '',
      'With --live the bot would log in, stop unless the session is the show\'s DID,',
      `${recipient.handle ? 'resolve the handle to a DID, ' : ''}open the conversation (chat.bsky.convo.getConvoForMembers),`,
      `send each message (chat.bsky.convo.sendMessage), stopping at the first failure, and log each one to ${DM_LOG_DIR}/<did>/sent.jsonl.`,
    );
    out(lines.join('\n'));
    return 0;
  }

  const { client, did } = await connect(ctx, settings, recipient, optOut);
  let convo;
  try {
    ({ convo } = await client.getConvoForMembers([did]));
  } catch (e) { throw chatError(e, 'chat.bsky.convo.getConvoForMembers', recipient.given); }
  if (typeof convo?.id !== 'string') throw new BotError('getConvoForMembers returned no conversation; nothing was sent');
  checkMembers(optOut, convo, did);

  const logDir = join(root, DM_LOG_DIR, did.replace(/[^A-Za-z0-9.:_-]/g, '_'));
  const logPath = join(logDir, 'sent.jsonl');
  let sent = 0;
  for (const [i, text] of messages.entries()) {
    let res;
    try {
      res = await client.sendMessage({ convoId: convo.id, text });
    } catch (e) {
      const why = chatError(e, 'chat.bsky.convo.sendMessage', recipient.given);
      throw new BotError(`message ${i + 1} of ${messages.length} was not sent; ${sent} sent before it${sent ? ` (logged in ${shown(logPath)})` : ''}.\n${why.message}`);
    }
    sent++;
    mkdirSync(logDir, { recursive: true });
    appendFileSync(logPath, `${JSON.stringify({
      loggedAt: now().toISOString(), to: did, handle: recipient.handle ?? null, convoId: convo.id,
      index: i + 1, of: messages.length, id: res?.id ?? null, rev: res?.rev ?? null, sentAt: res?.sentAt ?? null, text,
    })}\n`);
    out(`Sent ${i + 1}/${messages.length}: id ${res?.id ?? '(none)'} at ${res?.sentAt ?? '(no time given)'}`);
  }
  out(`Sent ${sent} message${sent === 1 ? '' : 's'} to ${recipient.given} (${did}); logged in ${shown(logPath)}`);
  return 0;
}

/** Finds the existing 1:1 conversation with `did` by listing conversations: a pure read. */
async function findConvo(client, self, did) {
  let cursor;
  for (let page = 0; page < CONVO_PAGES; page++) {
    const res = await client.listConvos({ limit: CHAT_PAGE_MAX_LIMIT, cursor });
    for (const c of res?.convos ?? []) {
      const members = new Set((c.members ?? []).map((m) => m?.did));
      if (members.has(did) && [...members].every((m) => m === did || m === self)) return c;
    }
    cursor = res?.cursor;
    if (!cursor || !res?.convos?.length) return null;
  }
  return null;
}

async function read(ctx, target) {
  const { values, env, out, root, configPath } = ctx;
  const settings = loadSettings({ env, configPath, showConfigPath: join(root, 'show.config.json') });
  let limit = DEFAULT_READ_LIMIT;
  if (values.limit !== undefined) {
    limit = Number(values.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_READ_LIMIT) throw new UsageError(`--limit must be a whole number from 1 to ${MAX_READ_LIMIT}`);
  }
  const recipient = parseRecipient(target);
  const optOut = loadOptOut(root);
  checkOptOut(optOut, recipient);
  needLogin(settings, env, 'dm read (it reads a private conversation, so it logs in)');

  const { client, session, did } = await connect(ctx, settings, recipient, optOut);
  let convo;
  try {
    convo = await findConvo(client, session.did, did);
  } catch (e) { throw chatError(e, 'chat.bsky.convo.listConvos', recipient.given); }
  if (!convo) {
    out(`No conversation with ${recipient.given} (${did}) in the account's latest ${CONVO_PAGES * CHAT_PAGE_MAX_LIMIT} conversations. Nothing was created.`);
    return 0;
  }
  checkMembers(optOut, convo, did);

  const messages = [];
  let cursor;
  try {
    while (messages.length < limit) {
      const res = await client.getMessages({ convoId: convo.id, limit: Math.min(CHAT_PAGE_MAX_LIMIT, limit - messages.length), cursor });
      messages.push(...(res?.messages ?? []).slice(0, limit - messages.length));
      cursor = res?.cursor;
      if (!cursor || !res?.messages?.length) break;
    }
  } catch (e) { throw chatError(e, 'chat.bsky.convo.getMessages', recipient.given); }

  const rows = messages.reverse().map((m) => {
    const deleted = m?.$type === 'chat.bsky.convo.defs#deletedMessageView';
    return {
      id: m?.id ?? null,
      sentAt: m?.sentAt ?? null,
      from: m?.sender?.did === session.did ? 'show' : 'them',
      sender: m?.sender?.did ?? null,
      deleted,
      text: deleted ? null : (typeof m?.text === 'string' ? m.text : null),
    };
  });
  if (values.json) {
    for (const r of rows) out(JSON.stringify(r));
    return 0;
  }
  out(`Conversation with ${recipient.given} (${did}), ${rows.length} message${rows.length === 1 ? '' : 's'}, oldest first. Nothing was marked read.`);
  for (const r of rows) {
    const who = r.from === 'show' ? 'show' : 'them';
    const indent = `\n${' '.repeat(32)}`;
    const body = r.deleted ? '(deleted)' : (r.text ?? '(no text)').split('\n').join(indent);
    out(`${(r.sentAt ?? '?').padEnd(24)}  ${who.padEnd(4)}  ${body}`);
  }
  return 0;
}
