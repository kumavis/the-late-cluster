// Where things are, and the week-to-episode mapping. Node builtins only, and no imports from the
// rest of the repo, so this package's tests run from a copy of the package alone.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/** this package's folder */
export const PKG = fileURLToPath(new URL('../', import.meta.url)).replace(/[\\/]$/, '')
/** the repository root, when the package sits at packages/writers-room */
export const REPO = join(PKG, '..', '..')

export const ID_RE = /^(\d{3})-([a-z0-9]+(?:-[a-z0-9]+)*)$/
export const SEG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const WEEK_RE = /^(\d{4})-W(\d{2})$/

/** a refusal: printed as `error: <message>`, exit `code` (2 bad input, 1 refused or failed) */
export class ProduceError extends Error {
  constructor(message, code = 1) {
    super(message)
    this.code = code
  }
}

export function checkWeek(week) {
  const m = WEEK_RE.exec(String(week ?? ''))
  if (!m || Number(m[2]) < 1 || Number(m[2]) > 53) throw new ProduceError(`not an ISO week: ${JSON.stringify(week)} (want e.g. 2026-W47)`, 2)
  return week
}

/** the slug a week's episode is scaffolded with: 2026-W47 → 2026-w47 (its title comes from the pitch) */
export const weekSlug = (week) => checkWeek(week).toLowerCase()

export function readJson(file, fallback) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    if (fallback !== undefined && e.code === 'ENOENT') return fallback
    throw new ProduceError(`${file}: ${e.code === 'ENOENT' ? 'missing' : e.message}`)
  }
}

export function writeJson(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n')
}

/** episode.json as the repo writes it (scripts/lib/scaffold.mjs): two-space JSON, the rundown on one line */
export function formatEpisodeJson(meta) {
  return JSON.stringify(meta, null, 2).replace(/"rundown": \[[^\]]*\]/, () => `"rundown": [${(meta.rundown ?? []).map((s) => JSON.stringify(s)).join(', ')}]`) + '\n'
}

export const isFile = (p) => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

/** every episode folder with its episode.json (unreadable ones are skipped) */
export function listEpisodes(root) {
  const dir = join(root, 'episodes')
  if (!existsSync(dir)) return []
  const out = []
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (!d.isDirectory() || !ID_RE.test(d.name)) continue
    let meta
    try {
      meta = JSON.parse(readFileSync(join(dir, d.name, 'episode.json'), 'utf8'))
    } catch {
      continue
    }
    out.push({ id: d.name, number: Number(d.name.slice(0, 3)), dir: join(dir, d.name), meta })
  }
  return out.sort((a, b) => a.number - b.number)
}

/**
 * The episode that covers a week: the one whose episode.json has that `week`. The same week always
 * maps to the same episode; two episodes claiming one week is an error a person must resolve.
 */
export function findEpisodeForWeek(root, week) {
  checkWeek(week)
  const hits = listEpisodes(root).filter((e) => e.meta.week === week)
  if (hits.length > 1) throw new ProduceError(`week ${week} is claimed by ${hits.map((h) => h.id).join(' and ')}; keep one`)
  return hits[0] ?? null
}

/** paths of one episode and its working papers */
export function episodePaths(root, id) {
  const dir = join(root, 'episodes', id)
  const production = join(dir, 'production')
  return {
    root,
    id,
    number: Number(id.slice(0, 3)),
    dir,
    episodeJson: join(dir, 'episode.json'),
    production,
    state: join(production, 'state.json'),
    pitch: join(production, 'pitch.md'),
    plan: join(production, 'plan.json'),
    sources: join(production, 'sources.json'),
    scorecard: join(production, 'scorecard.md'),
    intelligibility: join(production, 'intelligibility.json'),
    thumbnailMoment: join(production, 'thumbnail.txt'),
    prTitle: join(production, 'pr-title.txt'),
    prBody: join(production, 'pr-body.md'),
    castJs: join(dir, 'cast.js'),
    looksJs: join(dir, 'looks.js'),
    thumbnail: join(dir, 'thumbnail.jpg'),
    segDir: (seg) => join(dir, 'segments', seg),
    segFile: (seg, f) => join(dir, 'segments', seg, f),
    shots: join(root, 'shots', id),
    /** logs and prompts of this run: under shots/ (gitignored), uploaded with the frames */
    work: join(root, 'shots', id, '_production'),
    dist: join(root, 'dist', 'episodes', id),
    preview: join(root, 'preview', id),
    rel: (p) => relative(root, p).split(sep).join('/'),
  }
}

export const rel = (root, p) => relative(root, p).split(sep).join('/')

/** every file under a folder (relative paths), skipping some top-level names */
export function walk(dir, { skip = [] } = {}) {
  const out = []
  const go = (d, prefix) => {
    if (!existsSync(d)) return
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const r = prefix ? `${prefix}/${e.name}` : e.name
      if (skip.some((s) => r === s || r.startsWith(s + '/'))) continue
      if (e.isDirectory()) go(join(d, e.name), r)
      else if (e.isFile()) out.push(r)
    }
  }
  go(dir, '')
  return out.sort()
}
