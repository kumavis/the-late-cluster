// Finding and validating a built episode against the contract in docs/ARCHITECTURE.md:
// dist/episodes/<id>/episode.json (source manifest + build object) and thumbnail.jpg.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { BotError, UsageError } from './errors.mjs';

const ID_RE = /^(\d{3,})-[a-z0-9]+(?:-[a-z0-9]+)*$/;

function listIds(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory() && ID_RE.test(d.name)).map((d) => d.name);
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

/** Turns `1`, `001` or `001-pilot` into a full id, looking in dist/ and episodes/. */
export function resolveEpisodeId(ep, root) {
  const arg = String(ep ?? '').trim();
  const known = [...new Set([...listIds(join(root, 'dist/episodes')), ...listIds(join(root, 'episodes'))])];
  if (ID_RE.test(arg)) {
    if (!known.includes(arg)) throw new BotError(`episode ${arg} is missing: no episodes/${arg}/ or dist/episodes/${arg}/`);
    return arg;
  }
  if (!/^\d+$/.test(arg)) throw new UsageError(`"${arg}" is not an episode number or id (expected 1, 001 or 001-pilot)`);
  const prefix = `${String(Number(arg)).padStart(3, '0')}-`;
  const matches = known.filter((id) => id.startsWith(prefix));
  if (matches.length === 0) throw new BotError(`episode ${arg} is missing: no folder ${prefix}* in episodes/ or dist/episodes/`);
  if (matches.length > 1) throw new BotError(`episode ${arg} is ambiguous: ${matches.join(', ')}`);
  return matches[0];
}

/** Loads and validates the built manifest. Refuses anything not ready to announce. */
export function loadPublishedEpisode(ep, root) {
  const id = resolveEpisodeId(ep, root);
  const dir = join(root, 'dist/episodes', id);
  const manifestPath = join(dir, 'episode.json');
  if (!existsSync(manifestPath)) {
    throw new BotError(`episode ${id} is unbuilt: ${manifestPath} does not exist (run npm run build -- ${id})`);
  }
  let m;
  try { m = JSON.parse(readFileSync(manifestPath, 'utf8')); } catch (e) {
    throw new BotError(`${manifestPath} is not valid JSON: ${e.message}`);
  }
  const problems = [];
  if (!m || typeof m !== 'object' || Array.isArray(m)) throw new BotError(`${manifestPath} is not a JSON object`);
  if (m.id !== id) problems.push(`id is ${JSON.stringify(m.id)}, expected "${id}"`);
  if (!Number.isInteger(m.number) || m.number < 1) problems.push('number must be a positive integer');
  else if (m.number !== Number(id.match(ID_RE)[1])) problems.push(`number ${m.number} does not match id ${id}`);
  for (const key of ['title', 'description']) {
    if (typeof m[key] !== 'string' || !m[key].trim()) problems.push(`${key} must be a non-empty string`);
  }
  if (m.status !== 'draft' && m.status !== 'published') problems.push(`status must be "draft" or "published", got ${JSON.stringify(m.status)}`);
  if (problems.length) throw new BotError(`invalid manifest ${manifestPath}:\n  - ${problems.join('\n  - ')}`);

  if (m.status !== 'published') throw new BotError(`episode ${id} has status "${m.status}"; only published episodes are announced`);
  if (!m.build || typeof m.build.sourceHash !== 'string' || !m.build.sourceHash) {
    throw new BotError(`episode ${id} is unbuilt: ${manifestPath} has no build.sourceHash (run npm run build -- ${id})`);
  }
  const thumbnailPath = join(dir, 'thumbnail.jpg');
  if (!existsSync(thumbnailPath)) throw new BotError(`episode ${id} has no thumbnail: ${thumbnailPath} is missing`);
  return { id, manifest: m, manifestPath, thumbnailPath, thumbnailSize: statSync(thumbnailPath).size };
}

/** Sniffs the image type from its first bytes; the extension alone is not trusted. */
export function imageMimeType(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  return null;
}
