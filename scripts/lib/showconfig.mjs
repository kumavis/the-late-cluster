// show.config.json at the repo root: show-wide settings, committed. Node builtins only.
//
//   { "siteUrl": "" }   the public site root (https, no query or fragment). While empty, a build's
//                       Open Graph tags are relative. Builds read it from here and nowhere else, so
//                       a committed build never depends on who built it.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { EpisodeError, REPO } from './episodes.mjs'

export const showConfigPath = (root = REPO) => join(root, 'show.config.json')

/** validate a site URL; returns it with a trailing slash, or '' when empty */
export function normalizeSiteUrl(raw, where = 'siteUrl') {
  const s = String(raw ?? '').trim()
  if (!s) return ''
  let u
  try {
    u = new URL(s)
  } catch {
    throw new EpisodeError(`${where} is not a URL: ${JSON.stringify(s)}`)
  }
  if (u.protocol !== 'https:') throw new EpisodeError(`${where} must be https: ${JSON.stringify(s)}`)
  if (u.search || u.hash || s.includes('?') || s.includes('#')) throw new EpisodeError(`${where} must not have a query or fragment: ${JSON.stringify(s)}`)
  if (!u.pathname.endsWith('/')) u.pathname += '/'
  return u.href
}

/** the parsed, validated show.config.json ({} defaults when the file is missing) */
export function readShowConfig(root = REPO) {
  const file = showConfigPath(root)
  let cfg = {}
  try {
    cfg = JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    if (e.code !== 'ENOENT') throw new EpisodeError(`${file}: ${e.message}`)
  }
  if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) throw new EpisodeError(`${file}: not an object`)
  return { ...cfg, siteUrl: normalizeSiteUrl(cfg.siteUrl, 'show.config.json siteUrl') }
}
