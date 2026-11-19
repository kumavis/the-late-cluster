// Reading the committed episode manifests (dist/episodes/<id>/episode.json).
// A manifest that cannot be used is skipped with a warning; one bad episode must never take
// the whole archive down with it.

import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { EPISODES_DIR } from './paths.mjs'

const ID_RE = /^(\d{3,})-[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/

/** true for a real calendar date written as YYYY-MM-DD */
export function isIsoDate(s) {
  if (typeof s !== 'string') return false
  const m = DATE_RE.exec(s)
  if (!m) return false
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3]
}

/** newest first: by number, then air date, then id so ties are still deterministic */
export function compareEpisodes(a, b) {
  if (a.number !== b.number) return b.number - a.number
  if (a.airDate !== b.airDate) return a.airDate < b.airDate ? 1 : -1
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

async function exists(p) {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

/**
 * Validate one parsed manifest. Returns { episode } for a listable episode, { skip: reason } for
 * a draft (not an error), or { error: reason } for a manifest that is broken.
 */
export function checkManifest(m, dirName) {
  if (m === null || typeof m !== 'object' || Array.isArray(m)) return { error: 'manifest is not a JSON object' }
  if (m.status === 'draft') return { skip: 'draft' }
  if (m.status !== 'published') return { error: `status must be "draft" or "published", got ${JSON.stringify(m.status)}` }
  if (typeof m.id !== 'string' || !ID_RE.test(m.id)) return { error: `id ${JSON.stringify(m.id)} is not of the form NNN-slug` }
  if (m.id !== dirName) return { error: `id "${m.id}" does not match its folder "${dirName}"` }
  if (!Number.isSafeInteger(m.number) || m.number < 1) return { error: `number must be a positive integer, got ${JSON.stringify(m.number)}` }
  if (typeof m.title !== 'string' || !m.title.trim()) return { error: 'title is missing or empty' }
  if (!isIsoDate(m.airDate)) return { error: `airDate must be a YYYY-MM-DD date, got ${JSON.stringify(m.airDate)}` }

  const warnings = []
  if (Number(ID_RE.exec(m.id)[1]) !== m.number) warnings.push(`number ${m.number} does not match id "${m.id}"`)
  let description = ''
  if (typeof m.description === 'string') description = m.description.trim()
  else if (m.description !== undefined) warnings.push('description is not a string; ignored')
  let week
  if (typeof m.week === 'string' && m.week.trim()) week = m.week.trim()
  else if (m.week !== undefined) warnings.push('week is not a string; ignored')

  return {
    warnings,
    episode: { id: m.id, number: m.number, title: m.title.trim(), description, airDate: m.airDate, ...(week ? { week } : {}) },
  }
}

/**
 * Read every <inDir>/episodes/<id>/episode.json.
 * @returns {Promise<{ episodes: object[], warnings: string[], drafts: string[] }>} episodes newest first
 */
export async function readEpisodes(inDir) {
  const root = join(inDir, EPISODES_DIR)
  const warnings = []
  const drafts = []
  const episodes = []

  let entries
  try {
    entries = await readdir(root, { withFileTypes: true })
  } catch (e) {
    if (e.code === 'ENOENT') return { episodes, warnings: [`no ${root} directory; the archive will be empty`], drafts }
    throw e
  }

  const dirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith('.')).map((e) => e.name).sort()
  for (const name of dirs) {
    const where = `${EPISODES_DIR}/${name}`
    const file = join(root, name, 'episode.json')
    let text
    try {
      text = await readFile(file, 'utf8')
    } catch (e) {
      warnings.push(`${where}: skipped, no readable episode.json (${e.code ?? e.message})`)
      continue
    }
    let manifest
    try {
      manifest = JSON.parse(text)
    } catch (e) {
      warnings.push(`${where}: skipped, episode.json is not valid JSON (${e.message})`)
      continue
    }
    const r = checkManifest(manifest, name)
    if (r.skip) {
      drafts.push(name)
      continue
    }
    if (r.error) {
      warnings.push(`${where}: skipped, ${r.error}`)
      continue
    }
    for (const w of r.warnings) warnings.push(`${where}: ${w}`)
    if (!(await exists(join(root, name, 'index.html')))) {
      warnings.push(`${where}: skipped, published but there is no index.html (is the build committed?)`)
      continue
    }
    r.episode.hasThumbnail = await exists(join(root, name, 'thumbnail.jpg'))
    if (!r.episode.hasThumbnail) warnings.push(`${where}: no thumbnail.jpg; using a placeholder card`)
    episodes.push(r.episode)
  }

  episodes.sort(compareEpisodes)
  for (let i = 1; i < episodes.length; i++) {
    if (episodes[i].number === episodes[i - 1].number) {
      warnings.push(`episodes ${episodes[i - 1].id} and ${episodes[i].id} share number ${episodes[i].number}`)
    }
  }
  return { episodes, warnings, drafts }
}
