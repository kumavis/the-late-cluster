// The one place that knows where an episode's files live. Node builtins only: verify, build,
// the scaffolding commands and every studio tool (render, check, analyze, shoot, video) resolve
// episodes and paths through here.
//
//   resolveEpisode('1' | '001' | '001-pilot' | 'ref', { root })  → an Episode (below)
//
// Errors are EpisodeError (exit code 2 in every command: bad input, not a failed check).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/** the repository root (this file is scripts/lib/episodes.mjs) */
export const REPO = fileURLToPath(new URL('../../', import.meta.url)).replace(/[\\/]$/, '')

/** an episode folder name: zero-padded number, a dash, a slug */
export const ID_RE = /^(\d{3})-([a-z0-9]+(?:-[a-z0-9]+)*)$/
/** a segment id */
export const SEG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
/** the studio's reference episode, addressed as `ref` */
export const REF = 'ref'

/** a command's refusal: `error: <message>` and exit `code` (2 bad input, 1 refused or failed) */
export class EpisodeError extends Error {
  constructor(message, code = 2) {
    super(message)
    this.code = code
  }
}

/** paths under a repository root (overridable for tests) */
export function layout(root = REPO) {
  const studio = join(root, 'packages', 'show')
  return {
    root,
    studio,
    episodes: join(root, 'episodes'),
    dist: join(root, 'dist', 'episodes'),
    preview: join(root, 'preview'),
    reference: join(studio, 'reference'),
    templates: join(studio, 'templates'),
  }
}

/** the ids of every episode folder under episodes/, sorted */
export function listEpisodeIds(root = REPO) {
  const dir = layout(root).episodes
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && ID_RE.test(d.name))
    .map((d) => d.name)
    .sort()
}

/** `1`, `001`, `001-pilot` or `ref` → the episode's folder id; throws EpisodeError */
export function resolveId(arg, root = REPO) {
  const a = String(arg ?? '').trim()
  if (!a) throw new EpisodeError('no episode given (want a number such as 1, an id such as 001-pilot, or ref)')
  if (a === REF) return REF
  const ids = listEpisodeIds(root)
  let hits
  if (/^\d+$/.test(a)) hits = ids.filter((id) => Number(id.slice(0, 3)) === Number(a))
  else if (ID_RE.test(a)) hits = ids.filter((id) => id === a)
  else throw new EpisodeError(`not an episode: ${JSON.stringify(a)} (want a number such as 1, an id such as 001-pilot, or ref)`)
  if (hits.length > 1) throw new EpisodeError(`episode ${a} is ambiguous: ${hits.join(', ')}`)
  if (!hits.length) throw new EpisodeError(`unknown episode: ${a}${ids.length ? ` (episodes: ${ids.join(', ')})` : ' (no episodes yet)'}`)
  return hits[0]
}

/** read and sanity-check an episode.json */
export function readEpisodeJson(file) {
  let meta
  try {
    meta = JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    throw new EpisodeError(`${file}: ${e.code === 'ENOENT' ? 'missing' : e.message}`)
  }
  if (!meta || typeof meta !== 'object') throw new EpisodeError(`${file}: not an object`)
  if (!Array.isArray(meta.rundown)) throw new EpisodeError(`${file}: rundown must be an array of segment ids`)
  for (const s of meta.rundown) if (typeof s !== 'string' || !SEG_RE.test(s)) throw new EpisodeError(`${file}: bad segment id in rundown: ${JSON.stringify(s)}`)
  if (meta.status !== 'draft' && meta.status !== 'published') throw new EpisodeError(`${file}: status must be "draft" or "published", not ${JSON.stringify(meta.status)}`)
  // plainCards: no title card and a plain credits roll over black (packages/show/README.md); off unless true
  if ('plainCards' in meta && typeof meta.plainCards !== 'boolean') throw new EpisodeError(`${file}: plainCards must be true or false, not ${JSON.stringify(meta.plainCards)}`)
  // credits: the episode's own sections of the roll, [{ head, lines: [string, …] }]
  if ('credits' in meta) {
    const ok = (s) => s && typeof s === 'object' && typeof s.head === 'string' && s.head.trim() && Array.isArray(s.lines) && s.lines.length && s.lines.every((l) => typeof l === 'string' && l.trim())
    if (!Array.isArray(meta.credits) || !meta.credits.every(ok)) throw new EpisodeError(`${file}: credits must be a list of { "head": "…", "lines": ["…", …] }, each with a heading and at least one line`)
  }
  return meta
}

/**
 * An episode and every path the tools need. Rendered assets (audio/<seg>.mp3, tele/<seg>.bin) are
 * looked up in the episode's public/ first (a fresh render) and then in its committed build.
 */
export function resolveEpisode(arg, { root = REPO } = {}) {
  const L = layout(root)
  const id = resolveId(arg, root)
  const ref = id === REF
  const dir = ref ? L.reference : join(L.episodes, id)
  const meta = readEpisodeJson(join(dir, 'episode.json'))
  if (!ref && meta.id !== id) throw new EpisodeError(`${join(dir, 'episode.json')}: id is ${JSON.stringify(meta.id)}, but the folder is ${id}`)
  const publicDir = join(dir, 'public')
  const distDir = ref ? null : join(L.dist, id)
  const ep = {
    id,
    ref,
    root,
    dir,
    meta,
    rundown: meta.rundown.slice(),
    segmentsDir: join(dir, 'segments'),
    publicDir,
    distDir,
    previewDir: join(L.preview, id),
    studio: L.studio,
    /** a segment's folder */
    segDir: (seg) => join(dir, 'segments', seg),
    /** a segment file: script.js, index.js, cues.json */
    segFile: (seg, f) => join(dir, 'segments', seg, f),
    /** segment ids that have a folder, sorted */
    segments: () => (existsSync(join(dir, 'segments')) ? readdirSync(join(dir, 'segments'), { withFileTypes: true }).filter((d) => d.isDirectory() && SEG_RE.test(d.name)).map((d) => d.name).sort() : []),
    /** where render writes a rendered asset (rel: 'audio/x.mp3' or 'tele/x.bin') */
    renderPath: (rel) => join(publicDir, rel),
    /** where a rendered asset is read from: public/ first, then the committed build; null if neither */
    asset: (rel) => findAsset(ep, rel)?.path ?? null,
    /** { path, from: 'public' | 'dist' } or null */
    findAsset: (rel) => findAsset(ep, rel),
    /** a path for messages: relative to the repo root */
    rel: (p) => relative(root, p).split(sep).join('/'),
  }
  return ep
}

function findAsset(ep, rel) {
  if (!/^(audio|tele)\/[a-z0-9-]+\.(mp3|bin)$/.test(rel)) return null
  const a = join(ep.publicDir, rel)
  if (isFile(a)) return { path: a, from: 'public' }
  if (ep.distDir) {
    const b = join(ep.distDir, rel)
    if (isFile(b)) return { path: b, from: 'dist' }
  }
  return null
}

export function isFile(p) {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

/** check a segment id is one of the episode's segment folders (or its rundown); throws EpisodeError */
export function requireSegment(ep, seg, { needFolder = true } = {}) {
  if (!SEG_RE.test(String(seg))) throw new EpisodeError(`not a segment id: ${JSON.stringify(seg)}`)
  if (needFolder && !existsSync(ep.segDir(seg))) {
    const have = ep.segments()
    throw new EpisodeError(`unknown segment: ${seg} in ${ep.id}${have.length ? ` (segments: ${have.join(', ')})` : ' (no segments yet)'}`)
  }
  return seg
}

/** run a CLI main: EpisodeError → `error: …` and its exit code; anything else → the stack and exit 1 */
export async function cli(main) {
  try {
    const code = await main()
    process.exitCode = typeof code === 'number' ? code : 0
  } catch (e) {
    if (e instanceof EpisodeError) {
      console.error(`error: ${e.message}`)
      process.exitCode = e.code
    } else {
      console.error(e)
      process.exitCode = 1
    }
  }
}
