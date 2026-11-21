// `profile [--only avatar|description] [--avatar <file>] [--live] [--no-backup]`: set the account's
// profile picture and its bio (`description`). It changes those two fields and nothing else: every
// other field of the profile record is kept exactly as it was read.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createClient, XrpcError } from '../atproto.mjs';
import { loadSettings } from '../config.mjs';
import { BotError, UsageError } from '../errors.mjs';
import { imageDimensions, sniffImageType } from '../image.mjs';
import { AVATAR_MAX_BYTES, AVATAR_MIME_TYPES, AVATAR_MIN_SIDE_WARN, DESCRIPTION_MAX_BYTES, DESCRIPTION_MAX_GRAPHEMES } from '../limits.mjs';
import { normHandle } from '../optout.mjs';
import { graphemeLength, utf8Length } from '../richtext.mjs';

const PROFILE_COLLECTION = 'app.bsky.actor.profile';
const PROFILE_RKEY = 'self';
/** Where the replaced picture and record are saved, relative to the repo root (gitignored by /data/). */
export const BACKUP_DIR = 'data/bot';
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg' };
const USAGE = 'profile [--only avatar|description] [--avatar <file>] [--live] [--no-backup]';
const DESCRIPTION_AT = 'bluesky.profile.description in show.config.json';
const CREDITED_AT = 'bluesky.profile.credited in show.config.json';
// Anything that reads as naming an account: @ at a word start followed by a name or DID.
const AT_NAME_RE = /(^|[^\w])@([a-z0-9][a-z0-9.:_-]*)/gi;

export default {
  name: 'profile',
  summary: 'set the account\'s profile picture and bio from committed configuration; dry run unless --live',
  usage: USAGE,
  options: {
    only: { type: 'string' },
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
  if (values.only !== undefined && !['avatar', 'description'].includes(values.only)) {
    throw new UsageError(`--only takes avatar or description, not "${values.only}"\nusage: ${USAGE}`);
  }
  const doAvatar = values.only !== 'description';
  const doDescription = values.only !== 'avatar';
  if (!doAvatar && values.avatar !== undefined) throw new UsageError('--avatar and --only description do not go together');
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
  const avatar = doAvatar ? loadAvatar(avatarPath) : null;
  const description = doDescription ? loadDescription(settings.profile) : null;
  const shown = (p) => { const r = relative(cwd, p); return !r ? p : r.startsWith('..') ? p : r; };
  for (const w of avatar?.warnings ?? []) err(`warning: ${w}`);
  const backupDir = join(root, BACKUP_DIR);
  const target = settings.handle ? `@${settings.handle}` : '(no handle: set bluesky.handle in show.config.json)';
  const did = settings.did ?? '(no DID: set bluesky.did in show.config.json)';
  const fields = [avatar && '"avatar"', description && '"description"'].filter(Boolean).join(' and ');
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
    lines.push(`Account: ${target} (${did}) on ${settings.service}`);
    if (description) {
      lines.push('', `Description (${DESCRIPTION_AT}): ${description.graphemes}/${DESCRIPTION_MAX_GRAPHEMES} graphemes, ${description.bytes}/${DESCRIPTION_MAX_BYTES} bytes`,
        '  configured:', ...quoted(description.text));
      // A dry run may read: the profile record is public, so it is fetched without logging in.
      if (!settings.did) {
        lines.push('  live: cannot be read without bluesky.did in show.config.json');
      } else {
        let live;
        try {
          live = await client.getRecord({ repo: settings.did, collection: PROFILE_COLLECTION, rkey: PROFILE_RKEY, auth: false });
        } catch (e) {
          live = e instanceof XrpcError && e.error === 'RecordNotFound' ? null : { error: e };
        }
        if (live?.error) {
          lines.push(`  live: could not be read without logging in (${live.error.message}); --live reads it after logging in`);
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
    }
    const steps = [
      `POST com.atproto.server.createSession as ${target}`,
      `stop unless the session's DID is ${did}`,
      `GET  com.atproto.repo.getRecord ${PROFILE_COLLECTION}/${PROFILE_RKEY} (none yet: create it)`,
    ];
    if (avatar) {
      steps.push('POST com.atproto.repo.uploadBlob with this picture; the avatar is left alone if it is already this one');
      steps.push(values['no-backup']
        ? '(--no-backup: do not save the current avatar)'
        : `GET  com.atproto.sync.getBlob for the current avatar and save it to ${shown(backupDir)}/avatar-previous-<cid>.<ext>`);
    }
    if (description) {
      steps.push(values['no-backup']
        ? 'compare the description (--no-backup: the record is not saved first)'
        : `compare the description and, if it changes, save the whole record to ${shown(backupDir)}/profile-previous-<cid>.json`);
    }
    steps.push(`POST com.atproto.repo.putRecord ${PROFILE_COLLECTION}/${PROFILE_RKEY} with swapRecord, changing only ${fields}; if nothing changes, write nothing`);
    lines.push('', 'With --live the bot would:', ...steps.map((s, i) => `  ${i + 1}. ${s}`));
    if (!avatar) lines.push('  (--only description: the avatar is not touched)');
    if (!description) lines.push('  (--only avatar: the description is not touched)');
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
  const previousCid = blobCid(existing?.avatar);
  out(existing ? `Read the profile record (${current.cid}); current avatar: ${previousCid ?? 'none'}` : 'No profile record yet: one will be created.');

  let blob = null;
  let newCid = null;
  if (avatar) {
    blob = await client.uploadBlob(avatar.bytes, avatar.mimeType);
    newCid = blobCid(blob);
    if (!newCid) throw new BotError('uploadBlob returned a blob without a CID; nothing was written');
    out(`Uploaded ${shown(avatarPath)} (${avatar.bytes.length} bytes): ${newCid}`);
    if (newCid === previousCid) out('That picture is already the avatar.');
  }
  const avatarChanges = Boolean(avatar) && newCid !== previousCid;
  const descriptionChanges = Boolean(description) && existing?.description !== description.text;
  if (description && !descriptionChanges) out('The description is already the configured one.');
  if (!avatarChanges && !descriptionChanges) {
    out('Nothing to change. Nothing was written.');
    return 0;
  }

  let backup = values['no-backup'] ? 'skipped (--no-backup)' : 'none (no previous avatar)';
  if (!avatarChanges) backup = 'not needed (avatar unchanged)';
  else if (previousCid && !values['no-backup']) {
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

  const changes = {
    ...(avatarChanges ? { avatar: blob } : {}),
    ...(descriptionChanges ? { description: description.text } : {}),
  };
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
  if (avatar) {
    lines.push(
      `  previous avatar: ${previousCid ?? 'none'}`,
      `  new avatar:      ${newCid}${avatarChanges ? '' : ' (unchanged)'}`,
      `  backup:          ${backup}`,
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
