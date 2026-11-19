// `profile [--avatar <file>] [--live] [--no-backup]`: set the account's profile picture.
// It changes the avatar and nothing else: every other field of the profile record is kept as it was.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createClient, XrpcError } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { imageDimensions, sniffImageType } from '../image.mjs';
import { AVATAR_MAX_BYTES, AVATAR_MIME_TYPES, AVATAR_MIN_SIDE_WARN } from '../limits.mjs';

const PROFILE_COLLECTION = 'app.bsky.actor.profile';
const PROFILE_RKEY = 'self';
/** Where the replaced picture is saved, relative to the repo root (gitignored by /data/). */
export const BACKUP_DIR = 'data/bot';
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg' };
const USAGE = 'profile [--avatar <file>] [--live] [--no-backup]';

export default {
  name: 'profile',
  summary: 'set the account\'s profile picture from a committed image; dry run unless --live',
  usage: USAGE,
  options: {
    avatar: { type: 'string' },
    live: { type: 'boolean', default: false },
    'no-backup': { type: 'boolean', default: false },
    root: { type: 'string' },
  },
  run,
};

/** Reads and checks the picture. Throws BotError on anything Bluesky would refuse. */
export function loadAvatar(path) {
  if (!existsSync(path)) throw new BotError(`avatar ${path} does not exist`);
  if (!statSync(path).isFile()) throw new BotError(`avatar ${path} is not a file`);
  const bytes = readFileSync(path);
  const mimeType = sniffImageType(bytes);
  if (!mimeType || !AVATAR_MIME_TYPES.includes(mimeType)) {
    throw new BotError(`avatar ${path} is not a PNG or JPEG image (checked by its bytes, not its name)`);
  }
  if (bytes.length > AVATAR_MAX_BYTES) {
    throw new BotError(`avatar ${path} is ${bytes.length} bytes; Bluesky avatars are limited to ${AVATAR_MAX_BYTES} bytes. Re-export it smaller.`);
  }
  const size = imageDimensions(bytes, mimeType);
  if (!size) throw new BotError(`avatar ${path} looks like ${mimeType} but its header cannot be read; it may be damaged`);
  const warnings = [];
  if (size.width !== size.height) warnings.push(`the picture is ${size.width}x${size.height}, not square; the apps crop avatars to a circle`);
  if (Math.min(size.width, size.height) < AVATAR_MIN_SIDE_WARN) warnings.push(`the picture is under ${AVATAR_MIN_SIDE_WARN} px on a side (${size.width}x${size.height}); it may look soft`);
  return { bytes, mimeType, ...size, warnings };
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
  const avatarPath = values.avatar ? resolve(cwd, values.avatar) : resolve(root, settings.avatar);
  const avatar = loadAvatar(avatarPath);
  const shown = (p) => { const r = relative(cwd, p); return !r ? p : r.startsWith('..') ? p : r; };
  for (const w of avatar.warnings) err(`warning: ${w}`);
  const backupDir = join(root, BACKUP_DIR);
  const target = settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)';
  const did = settings.did ?? '(no DID: set bluesky.did in show.config.json)';

  if (!values.live) {
    out([
      'DRY RUN: nothing was sent. Add --live to change the profile.',
      '',
      `Avatar:  ${shown(avatarPath)}${values.avatar ? '' : ' (avatar in bot.config.json)'}`,
      `Type:    ${avatar.mimeType}`,
      `Size:    ${avatar.bytes.length} bytes (limit ${AVATAR_MAX_BYTES})`,
      `Pixels:  ${avatar.width}x${avatar.height}`,
      `Account: ${target} (${did}) on ${settings.service}`,
      '',
      'With --live the bot would:',
      `  1. POST com.atproto.server.createSession as ${target}`,
      `  2. stop unless the session's DID is ${did}`,
      `  3. GET  com.atproto.repo.getRecord ${PROFILE_COLLECTION}/${PROFILE_RKEY} (none yet: create it)`,
      '  4. POST com.atproto.repo.uploadBlob with this picture, and stop if it is already the avatar',
      values['no-backup']
        ? '  5. (--no-backup: do not save the current avatar)'
        : `  5. GET  com.atproto.sync.getBlob for the current avatar and save it to ${shown(backupDir)}/avatar-previous-<cid>.<ext>`,
      `  6. POST com.atproto.repo.putRecord ${PROFILE_COLLECTION}/${PROFILE_RKEY} with swapRecord, changing only "avatar"`,
    ].join('\n'));
    return 0;
  }

  const client = createClient({ service: settings.service, userAgent: settings.userAgent, fetch });
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
  const previousCid = blobCid(existing?.avatar);
  out(existing ? `Read the profile record (${current.cid}); current avatar: ${previousCid ?? 'none'}` : 'No profile record yet: one will be created.');

  const blob = await client.uploadBlob(avatar.bytes, avatar.mimeType);
  const newCid = blobCid(blob);
  if (!newCid) throw new BotError('uploadBlob returned a blob without a CID; nothing was written');
  out(`Uploaded ${shown(avatarPath)} (${avatar.bytes.length} bytes): ${newCid}`);
  if (newCid === previousCid) {
    out('That picture is already the avatar. Nothing was written.');
    return 0;
  }

  let backup = values['no-backup'] ? 'skipped (--no-backup)' : 'none (no previous avatar)';
  if (previousCid && !values['no-backup']) {
    try {
      const { bytes, contentType } = await client.getBlob({ did: session.did, cid: previousCid });
      if (!bytes.length) throw new Error('getBlob returned no bytes');
      const type = sniffImageType(bytes) ?? existing.avatar?.mimeType ?? contentType?.split(';')[0];
      const path = join(backupDir, `avatar-previous-${safeName(previousCid)}.${EXT[type] ?? 'bin'}`);
      mkdirSync(backupDir, { recursive: true });
      writeFileSync(path, bytes);
      backup = `${shown(path)} (${bytes.length} bytes)`;
    } catch (e) {
      throw new BotError(`could not back up the current avatar ${previousCid}: ${e.message}. Nothing was written. --no-backup skips the backup.`);
    }
  }

  const record = existing
    ? { ...existing, $type: PROFILE_COLLECTION, avatar: blob }
    : { $type: PROFILE_COLLECTION, avatar: blob, createdAt: now().toISOString() };
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
  out([
    `Updated ${written?.uri ?? `at://${session.did}/${PROFILE_COLLECTION}/${PROFILE_RKEY}`}`,
    `  previous avatar: ${previousCid ?? 'none'}`,
    `  new avatar:      ${newCid}`,
    `  backup:          ${backup}`,
  ].join('\n'));
  return 0;
}

/** A CID is base32/base58 already; this keeps a malformed one from escaping the backup folder. */
function safeName(cid) {
  return cid.replace(/[^A-Za-z0-9]/g, '_');
}
