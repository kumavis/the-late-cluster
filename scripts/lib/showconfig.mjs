// show.config.json at the repo root: show-wide settings, committed. Node builtins only.
//
//   { "siteUrl": "" }   the public site root (https, no query or fragment). While empty, a build's
//                       Open Graph tags are relative. Builds read it from here and nowhere else, so
//                       a committed build never depends on who built it.
//   "bluesky": { "handle": "latecluster.simcluster.tv", "did": "did:plc:…" }
//                       the show's Bluesky account (optional; handle and did together). Used by
//                       the bot, not by the build. Configuration only: secrets live in .secrets.
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

// an atproto handle: a hostname of at least two labels, letters/digits/hyphens, TLD not numeric
const HANDLE_RE = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/i
// a DID: did:<method>:<method-specific id>
const DID_RE = /^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/

/** validate the bluesky block; returns it (handle lower-cased) or undefined when absent */
export function normalizeBluesky(b, where = 'show.config.json bluesky') {
  if (b === undefined || b === null) return undefined
  if (typeof b !== 'object' || Array.isArray(b)) throw new EpisodeError(`${where} must be an object with handle and did`)
  const { handle, did } = b
  if (handle === undefined && did === undefined) return undefined
  if (typeof handle !== 'string' || typeof did !== 'string') throw new EpisodeError(`${where}: handle and did go together; set both or neither`)
  const h = handle.trim().replace(/^@/, '')
  if (!HANDLE_RE.test(h)) throw new EpisodeError(`${where}.handle is not a handle (a hostname such as name.example.com): ${JSON.stringify(handle)}`)
  if (!DID_RE.test(did) || did.length > 2048) throw new EpisodeError(`${where}.did is not a DID (did:<method>:<id>): ${JSON.stringify(did)}`)
  return { ...b, handle: h.toLowerCase(), did }
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
  const out = { ...cfg, siteUrl: normalizeSiteUrl(cfg.siteUrl, 'show.config.json siteUrl') }
  const bluesky = normalizeBluesky(cfg.bluesky)
  if (bluesky) out.bluesky = bluesky
  else delete out.bluesky
  return out
}
