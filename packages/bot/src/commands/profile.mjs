// `profile [--only avatar|banner|description] [--avatar <file>] [--banner <file>] [--live] [--no-backup]`:
// set the account's profile picture, its banner and its bio (`description`). It changes those
// three fields and nothing else: every other field of the profile record is kept exactly as read.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createClient, XrpcError } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { imageDimensions, sniffImageType } from '../image.mjs';
import {
  AVATAR_MAX_BYTES, AVATAR_MIME_TYPES, AVATAR_MIN_SIDE_WARN, BANNER_ASPECT, BANNER_MAX_BYTES, BANNER_MIME_TYPES,
  DESCRIPTION_MAX_BYTES, DESCRIPTION_MAX_GRAPHEMES,
} from '../limits.mjs';
import { normHandle } from '../optout.mjs';
import { graphemeLength, utf8Length } from '../richtext.mjs';

const PROFILE_COLLECTION = 'app.bsky.actor.profile';
const PROFILE_RKEY = 'self';
/** Where the replaced pictures and record are saved, relative to the repo root (gitignored by /data/). */
export const BACKUP_DIR = 'data/bot';
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg' };
const USAGE = 'profile [--only avatar|banner|description] [--avatar <file>] [--banner <file>] [--live] [--no-backup]';
const ONLY = ['avatar', 'banner', 'description'];
const DESCRIPTION_AT = 'bluesky.profile.description in show.config.json';
const CREDITED_AT = 'bluesky.profile.credited in show.config.json';
// Anything that reads as naming an account: @ at a word start followed by a name or DID.
const AT_NAME_RE = /(^|[^\w])@([a-z0-9][a-z0-9.:_-]*)/gi;

export default {
  name: 'profile',
  summary: 'set the account\'s profile picture, banner and bio from committed configuration; dry run unless --live',
  usage: USAGE,
  options: {
    only: { type: 'string' },
    avatar: { type: 'string' },
    banner: { type: 'string' },
    live: { type: 'boolean', default: false },
    'no-backup': { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  run,
};

/** Reads and checks a picture for `field`. Throws BotError on anything Bluesky would refuse. */
function loadPicture(path, field, { maxBytes, mimeTypes }) {
  if (!existsSync(path)) throw new BotError(`${field} ${path} does not exist`);
  if (!statSync(path).isFile()) throw new BotError(`${field} ${path} is not a file`);
  const bytes = readFileSync(path);
  const mimeType = sniffImageType(bytes);
  if (!mimeType || !mimeTypes.includes(mimeType)) {
    throw new BotError(`${field} ${path} is not a PNG or JPEG image (checked by its bytes, not its name)`);
  }
  if (bytes.length > maxBytes) {
    throw new BotError(`${field} ${path} is ${bytes.length} bytes; Bluesky ${field}s are limited to ${maxBytes} bytes. Re-export it smaller.`);
  }
  const size = imageDimensions(bytes, mimeType);
  if (!size) throw new BotError(`${field} ${path} looks like ${mimeType} but its header cannot be read; it may be damaged`);
  return { bytes, mimeType, ...size };
}

/** Reads and checks the avatar. Throws BotError on anything Bluesky would refuse. */
export function loadAvatar(path) {
  const pic = loadPicture(path, 'avatar', { maxBytes: AVATAR_MAX_BYTES, mimeTypes: AVATAR_MIME_TYPES });
  const warnings = [];
  if (pic.width !== pic.height) warnings.push(`the picture is ${pic.width}x${pic.height}, not square; the apps crop avatars to a circle`);
  if (Math.min(pic.width, pic.height) < AVATAR_MIN_SIDE_WARN) warnings.push(`the picture is under ${AVATAR_MIN_SIDE_WARN} px on a side (${pic.width}x${pic.height}); it may look soft`);
  return { ...pic, warnings };
}

/** Reads and checks the banner: the same checks, and a warning (not a refusal) when it is not 3:1. */
export function loadBanner(path) {
  const pic = loadPicture(path, 'banner', { maxBytes: BANNER_MAX_BYTES, mimeTypes: BANNER_MIME_TYPES });
  const warnings = [];
  if (pic.width !== pic.height * BANNER_ASPECT) warnings.push(`the banner is ${pic.width}x${pic.height}, not 3:1; the apps crop banners to 3:1`);
  return { ...pic, warnings };
}

/**
 * The CID a blob of these bytes gets: CIDv1, raw codec, sha2-256, base32 ("bafkrei…"), as the PDS
 * computes it. Lets a dry run say whether the live profile already has this exact picture.
 */
export function localBlobCid(bytes) {
  const cid = Buffer.concat([Buffer.from([0x01, 0x55, 0x12, 0x20]), createHash('sha256').update(bytes).digest()]);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz234567';
  let bits = 0; let value = 0; let s = 'b';
  for (const byte of cid) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 5) { s += alphabet[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) s += alphabet[(value << (5 - bits)) & 31];
  return s;
}

/**
 * The configured bio, checked: present, within Bluesky's limits, and naming no account (`@handle`)
 * that is not listed as credited. Returns { text, graphemes, bytes, credited }.
 */
export function loadDescription(profile) {
  const text = profile?.description;
  if (typeof text !== 'string' || !text.trim()) {
    throw new BotError(`no description configured: set ${DESCRIPTION_AT} (or use --only avatar)`);
  }
  const graphemes = graphemeLength(text);
  const bytes = utf8Length(text);
  if (graphemes > DESCRIPTION_MAX_GRAPHEMES) {
    throw new BotError(`the description (${DESCRIPTION_AT}) is ${graphemes} graphemes; Bluesky bios are limited to ${DESCRIPTION_MAX_GRAPHEMES}. Nothing was sent.`);
  }
  if (bytes > DESCRIPTION_MAX_BYTES) {
    throw new BotError(`the description (${DESCRIPTION_AT}) is ${bytes} bytes; Bluesky bios are limited to ${DESCRIPTION_MAX_BYTES}. Nothing was sent.`);
  }
  const raw = profile.credited ?? [];
  if (!Array.isArray(raw) || raw.some((h) => typeof h !== 'string' || !h.trim())) {
    throw new BotError(`${CREDITED_AT} must be a list of handles`);
  }
  const credited = raw.map(normHandle);
  for (const m of text.matchAll(AT_NAME_RE)) {
    const name = normHandle(m[2].replace(/[.:_-]+$/, ''));
    if (!credited.includes(name)) {
      throw new BotError(`the description (${DESCRIPTION_AT}) names @${name}, which is not a credited account. A handle may appear in the bio only if it is listed in ${CREDITED_AT} (now: ${credited.length ? credited.join(', ') : 'none'}).`);
    }
  }
  return { text, graphemes, bytes, credited };
}

/** A bio as printed: each line behind a bar, so blank lines and trailing spaces can be seen. */
function quoted(text, indent = '    ') {
  if (typeof text !== 'string') return [`${indent}(none)`];
  return text.split('\n').map((l) => `${indent}| ${l}`);
}

/** The CID of a blob ref, in either the current ({ ref: { $link } }) or legacy ({ cid }) form. */
export function blobCid(blob) {
  if (!blob || typeof blob !== 'object') return null;
  if (typeof blob.ref?.$link === 'string') return blob.ref.$link;
  if (typeof blob.cid === 'string') return blob.cid;
  return null;
}

async function run(ctx) {
  const { positionals, values, env, out, err, root, cwd, now, fetch, configPath } = ctx;
  if (positionals.length) throw new UsageError(`profile takes no positional arguments\nusage: ${USAGE}`);
  if (values.only !== undefined && !ONLY.includes(values.only)) {
    throw new UsageError(`--only takes avatar, banner or description, not "${values.only}"\nusage: ${USAGE}`);
  }
  const only = values.only;
  if (only && only !== 'avatar' && values.avatar !== undefined) throw new UsageError(`--avatar and --only ${only} do not go together`);
  if (only && only !== 'banner' && values.banner !== undefined) throw new UsageError(`--banner and --only ${only} do not go together`);
  const settings = loadSettings({ env, configPath, showConfigPath: join(root, 'show.config.json') });

  if (values.live) {
    const missing = [];
    if (!settings.handle) missing.push('a handle: set bluesky.handle in show.config.json (or BSKY_HANDLE)');
    if (!settings.did) missing.push('the account DID: set bluesky.did in show.config.json');
    if (!env.BSKY_APP_PASSWORD) missing.push('BSKY_APP_PASSWORD in the environment (locally: put it in .secrets; npm run bot loads it)');
    if (missing.length) {
      throw new BotError(`--live needs ${missing.join(', and ')}. Use an app password, never the account password.`);
    }
  }

  // Everything that can fail locally fails here, before any network call.
  const shown = (p) => { const r = relative(cwd, p); return !r ? p : r.startsWith('..') ? p : r; };
  const avatarPath = values.avatar ? resolve(cwd, values.avatar) : resolve(root, settings.avatar);
  const avatar = !only || only === 'avatar' ? loadAvatar(avatarPath) : null;
  for (const w of avatar?.warnings ?? []) err(`warning: ${w}`);
  // The banner: with no --only, only if the configured file is there; asked for by name, it must be.
  const bannerPath = values.banner ? resolve(cwd, values.banner) : settings.banner ? resolve(root, settings.banner) : null;
  let banner = null;
  let bannerNote = null;
  if (only === 'banner' || values.banner !== undefined) {
    if (!bannerPath) throw new BotError('no banner configured: set banner in bot.config.json, or give --banner <file>');
    banner = loadBanner(bannerPath);
  } else if (!only) {
    if (bannerPath && existsSync(bannerPath)) banner = loadBanner(bannerPath);
    else bannerNote = `Banner:  no banner file is configured or present${bannerPath ? ` (${shown(bannerPath)})` : ''}; the banner is left alone.`;
  }
  for (const w of banner?.warnings ?? []) err(`warning: ${w}`);
  const description = !only || only === 'description' ? loadDescription(settings.profile) : null;
  const backupDir = join(root, BACKUP_DIR);
  const target = settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)';
  const did = settings.did ?? '(no DID: set bluesky.did in show.config.json)';
  const fields = [avatar && '"avatar"', banner && '"banner"', description && '"description"'].filter(Boolean).join(' and ');
  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });

  if (!values.live) {
    const lines = ['DRY RUN: nothing was sent. Add --live to change the profile.', ''];
    if (avatar) {
      lines.push(
        `Avatar:  ${shown(avatarPath)}${values.avatar ? '' : ' (avatar in bot.config.json)'}`,
        `Type:    ${avatar.mimeType}`,
        `Size:    ${avatar.bytes.length} bytes (limit ${AVATAR_MAX_BYTES})`,
        `Pixels:  ${avatar.width}x${avatar.height}`,
      );
    }
    if (banner) {
      lines.push(
        `Banner:  ${shown(bannerPath)}${values.banner ? '' : ' (banner in bot.config.json)'}`,
        `Type:    ${banner.mimeType}`,
        `Size:    ${banner.bytes.length} bytes (limit ${BANNER_MAX_BYTES})`,
        `Pixels:  ${banner.width}x${banner.height}`,
      );
    }
    if (bannerNote) lines.push(bannerNote);
    lines.push(`Account: ${target} (${did}) on ${settings.service}`);

    // A dry run may read: the profile record is public, so it is fetched without logging in.
    let live;
    if ((banner || description) && settings.did) {
      try {
        live = await client.getRecord({ repo: settings.did, collection: PROFILE_COLLECTION, rkey: PROFILE_RKEY, auth: false });
      } catch (e) {
        live = e instanceof XrpcError && e.error === 'RecordNotFound' ? null : { error: e };
      }
    }
    const unread = !settings.did ? 'cannot be read without bluesky.did in show.config.json'
      : live?.error ? `could not be read without logging in (${live.error.message}); --live reads it after logging in` : null;
    if (banner) {
      const cid = localBlobCid(banner.bytes);
      const current = blobCid(live?.value?.banner);
      lines.push('', `Banner on the live profile: ${unread ?? (current ?? 'none')}`,
        unread ? '' : current === cid ? `  => unchanged: the live profile already has this exact banner (${cid}).` : `  => would change, to ${cid}.`);
      if (!lines.at(-1)) lines.pop();
    }
    if (description) {
      lines.push('', `Description (${DESCRIPTION_AT}): ${description.graphemes}/${DESCRIPTION_MAX_GRAPHEMES} graphemes, ${description.bytes}/${DESCRIPTION_MAX_BYTES} bytes`,
        '  configured:', ...quoted(description.text));
      if (unread) {
        lines.push(`  live: ${unread}`);
      } else {
        const current = live?.value?.description;
        lines.push(`  live (${live ? `record ${live.cid}` : 'no profile record yet'}):`, ...quoted(current));
        if (current === description.text) {
          lines.push('  => unchanged: --live would leave the description as it is.');
        } else {
          lines.push('  => would change. Exactly, as JSON:',
            `     live:       ${current === undefined ? '(none)' : JSON.stringify(current)}`,
            `     configured: ${JSON.stringify(description.text)}`);
        }
      }
    }
    const steps = [
      `POST com.atproto.server.createSession as ${target}`,
      `stop unless the session's DID is ${did}`,
      `GET  com.atproto.repo.getRecord ${PROFILE_COLLECTION}/${PROFILE_RKEY} (none yet: create it)`,
    ];
    for (const [pic, name] of [[avatar, 'avatar'], [banner, 'banner']]) {
      if (!pic) continue;
      steps.push(`POST com.atproto.repo.uploadBlob with this ${name === 'avatar' ? 'picture' : 'banner'}; the ${name} is left alone if it is already this one`);
      steps.push(values['no-backup']
        ? `(--no-backup: do not save the current ${name})`
        : `GET  com.atproto.sync.getBlob for the current ${name} and save it to ${shown(backupDir)}/${name}-previous-<cid>.<ext>`);
    }
    if (description) {
      steps.push(values['no-backup']
        ? 'compare the description (--no-backup: the record is not saved first)'
        : `compare the description and, if it changes, save the whole record to ${shown(backupDir)}/profile-previous-<cid>.json`);
    }
    steps.push(`POST com.atproto.repo.putRecord ${PROFILE_COLLECTION}/${PROFILE_RKEY} with swapRecord, changing only ${fields}; if nothing changes, write nothing`);
    lines.push('', 'With --live the bot would:', ...steps.map((s, i) => `  ${i + 1}. ${s}`));
    if (only) lines.push(`  (--only ${only}: ${ONLY.filter((f) => f !== only).map((f) => `the ${f}`).join(' and ')} are not touched)`);
    out(lines.join('\n'));
    return 0;
  }

  const session = await client.createSession({ identifier: settings.handle, password: env.BSKY_APP_PASSWORD });
  out(`Logged in as @${session.handle} (${session.did}) on ${client.service}`);
  if (session.did !== settings.did) {
    throw new BotError(`refusing to change the profile: logged in as ${session.did}, but bluesky.did in show.config.json is ${settings.did}`);
  }

  let current = null;
  try {
    current = await client.getRecord({ repo: session.did, collection: PROFILE_COLLECTION, rkey: PROFILE_RKEY });
  } catch (e) {
    if (!(e instanceof XrpcError && e.error === 'RecordNotFound')) throw e;
  }
  if (current && typeof current.cid !== 'string') {
    throw new BotError('getRecord returned the profile without a CID, so the write cannot be guarded against a concurrent change; nothing was written');
  }
  const existing = current?.value && typeof current.value === 'object' ? current.value : null;
  out(existing ? `Read the profile record (${current.cid}); current avatar: ${blobCid(existing.avatar) ?? 'none'}` : 'No profile record yet: one will be created.');
  if (bannerNote) out(bannerNote);

  // Each picture: upload it, compare its CID with the current one, and back the current one up.
  const pictures = [];
  for (const [pic, name, path] of [[avatar, 'avatar', avatarPath], [banner, 'banner', bannerPath]]) {
    if (!pic) continue;
    const previousCid = blobCid(existing?.[name]);
    const blob = await client.uploadBlob(pic.bytes, pic.mimeType);
    const newCid = blobCid(blob);
    if (!newCid) throw new BotError(`uploadBlob returned a blob without a CID; nothing was written`);
    out(`Uploaded ${shown(path)} (${pic.bytes.length} bytes): ${newCid}`);
    if (newCid === previousCid) out(`That picture is already the ${name}.`);
    pictures.push({ name, blob, newCid, previousCid, changes: newCid !== previousCid });
  }
  const descriptionChanges = Boolean(description) && existing?.description !== description.text;
  if (description && !descriptionChanges) out('The description is already the configured one.');
  if (!pictures.some((p) => p.changes) && !descriptionChanges) {
    out('Nothing to change. Nothing was written.');
    return 0;
  }

  for (const p of pictures) {
    p.backup = values['no-backup'] ? 'skipped (--no-backup)' : `none (no previous ${p.name})`;
    if (!p.changes) { p.backup = `not needed (${p.name} unchanged)`; continue; }
    if (!p.previousCid || values['no-backup']) continue;
    try {
      const { bytes, contentType } = await client.getBlob({ did: session.did, cid: p.previousCid });
      if (!bytes.length) throw new Error('getBlob returned no bytes');
      const type = sniffImageType(bytes) ?? existing[p.name]?.mimeType ?? contentType?.split(';')[0];
      const path = join(backupDir, `${p.name}-previous-${safeName(p.previousCid)}.${EXT[type] ?? 'bin'}`);
      mkdirSync(backupDir, { recursive: true });
      writeFileSync(path, bytes);
      p.backup = `${shown(path)} (${bytes.length} bytes)`;
    } catch (e) {
      throw new BotError(`could not back up the current ${p.name} ${p.previousCid}: ${e.message}. Nothing was written. --no-backup skips the backup.`);
    }
  }
  let recordBackup = values['no-backup'] ? 'skipped (--no-backup)' : 'none (no previous record)';
  if (!descriptionChanges) recordBackup = 'not needed (description unchanged)';
  else if (existing && !values['no-backup']) {
    const path = join(backupDir, `profile-previous-${safeName(current.cid)}.json`);
    try {
      mkdirSync(backupDir, { recursive: true });
      writeFileSync(path, `${JSON.stringify({ uri: current.uri ?? null, cid: current.cid, value: existing }, null, 2)}\n`);
    } catch (e) {
      throw new BotError(`could not back up the profile record ${current.cid}: ${e.message}. Nothing was written. --no-backup skips the backup.`);
    }
    recordBackup = shown(path);
  }

  const changes = {};
  for (const p of pictures) if (p.changes) changes[p.name] = p.blob;
  if (descriptionChanges) changes.description = description.text;
  const record = existing
    ? { ...existing, $type: PROFILE_COLLECTION, ...changes }
    : { $type: PROFILE_COLLECTION, ...changes, createdAt: now().toISOString() };
  let written;
  try {
    written = await client.putRecord({
      repo: session.did, collection: PROFILE_COLLECTION, rkey: PROFILE_RKEY, record,
      swapRecord: current ? current.cid : null,
    });
  } catch (e) {
    if (e instanceof XrpcError && e.error === 'InvalidSwap') {
      throw new BotError(`the profile changed since it was read (${current ? current.cid : 'it did not exist'}), so nothing was overwritten. Run the command again.`);
    }
    throw e;
  }
  const lines = [`Updated ${written?.uri ?? `at://${session.did}/${PROFILE_COLLECTION}/${PROFILE_RKEY}`}`];
  for (const p of pictures) {
    const pad = (s) => `${s}:`.padEnd(17);
    lines.push(
      `  ${pad(`previous ${p.name}`)}${p.previousCid ?? 'none'}`,
      `  ${pad(`new ${p.name}`)}${p.newCid}${p.changes ? '' : ' (unchanged)'}`,
      `  ${pad(p.name === 'avatar' ? 'backup' : 'banner backup')}${p.backup}`,
    );
  }
  if (description) {
    lines.push(
      `  description:     ${descriptionChanges ? 'changed' : 'unchanged'}`,
      `  record backup:   ${recordBackup}`,
    );
  }
  out(lines.join('\n'));
  return 0;
}

/** A CID is base32/base58 already; this keeps a malformed one from escaping the backup folder. */
function safeName(cid) {
  return cid.replace(/[^A-Za-z0-9]/g, '_');
}
