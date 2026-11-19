// The show's ledger (docs/ledger/): who the show has already featured, by DID.
//
//   featured.json          the tracker: who was featured when, keyed by DID, with the handle as
//                          last seen and a list of appearances { episode, date, role }, role being
//                          "spoke" (their puppet spoke) or "shown" (their post was shown)
//   <episode-id>.json      one per episode: { id, aired, guests, featured, ... }, where guests and
//                          featured are handles or { did, handle }
//
// Read so that variety can be measured and the default window can start at the previous
// aired episode. It never promotes anyone, and it plays no part in choosing seeds.

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const norm = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()
const asPerson = (x) => (typeof x === 'string' ? (x.startsWith('did:') ? { did: x, handle: null } : { did: null, handle: norm(x) }) : { did: x?.did ?? null, handle: x?.handle ? norm(x.handle) : null })
const dateMs = (d) => (typeof d === 'string' && d ? Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(d) ? d + 'T00:00:00Z' : d) : NaN)

function trackerEntries(t) {
  if (!t) return []
  const rows = Array.isArray(t) ? t : Array.isArray(t.accounts) ? t.accounts : Object.entries(t.accounts ?? t).filter(([k]) => k.startsWith('did:')).map(([did, v]) => ({ did, ...v }))
  return rows.filter((r) => r && (r.did || r.handle)).map((r) => ({
    did: r.did ?? null, handle: r.handle ? norm(r.handle) : null,
    appearances: (r.appearances ?? []).map((a) => ({ episode: a.episode ?? null, date: a.date ?? null, role: a.role === 'spoke' ? 'spoke' : 'shown' })),
  }))
}

/**
 * @param {string|null} dir
 * @param {object} opts { repoRoot } to read an episode's air date from episodes/<id>/episode.json
 * @returns {{ dir, found, episodes, tracker, problems }}
 */
export function loadLedger(dir, { repoRoot = null } = {}) {
  const out = { dir: dir ?? null, found: false, episodes: [], tracker: [], problems: [] }
  if (!dir) return out
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    out.problems.push(`no ledger directory at ${dir}`)
    return out
  }
  out.found = true
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    let e
    try {
      e = JSON.parse(readFileSync(join(dir, f), 'utf8'))
    } catch (err) {
      out.problems.push(`${f}: not JSON (${err.message})`)
      continue
    }
    if (f === 'featured.json') { out.tracker = trackerEntries(e); continue }
    const id = e.id ?? f.replace(/\.json$/, '')
    const aired = e.aired !== false && e.status !== 'draft'
    let date = e.date ?? e.airDate ?? (typeof e.aired === 'string' ? e.aired : null)
    if (!date && repoRoot) {
      try { date = JSON.parse(readFileSync(join(repoRoot, 'episodes', id, 'episode.json'), 'utf8')).airDate ?? null } catch { /* no episode folder */ }
    }
    const airedMs = dateMs(date)
    if (aired && !Number.isFinite(airedMs)) out.problems.push(`${f}: aired but no date found; it counts as featured history, not as the previous episode`)
    out.episodes.push({ id, aired, date: date ?? null, airedMs: Number.isFinite(airedMs) ? airedMs : null, guests: (e.guests ?? []).map(asPerson), featured: (e.featured ?? []).map(asPerson) })
  }
  out.episodes.sort((a, b) => (a.airedMs ?? Infinity) - (b.airedMs ?? Infinity) || (a.id < b.id ? -1 : 1))
  return out
}

/** The latest aired episode dated at or before `atMs`, or null. */
export function previousEpisode(ledger, atMs = Date.now()) {
  return ledger.episodes.filter((e) => e.aired && e.airedMs != null && e.airedMs <= atMs).at(-1) ?? null
}

/**
 * Who was featured where, matched by DID first, then by handle. Only aired episodes count.
 * @returns {(did, handle) => { previous, earlier, episodes, appearances }}
 */
export function featuredLookup(ledger, atMs = Date.now()) {
  const prev = previousEpisode(ledger, atMs)
  const strongest = (a, b) => (a === 'spoke' || b === 'spoke' ? 'spoke' : a ?? b ?? null)
  const appearances = new Map() // key -> [{ episode, role }]
  const keyOf = (p) => p.did ?? `handle:${p.handle}`
  const add = (p, episode, role) => {
    const k = keyOf(p)
    if (!appearances.has(k)) appearances.set(k, [])
    const list = appearances.get(k)
    const had = list.find((x) => x.episode === episode)
    if (had) had.role = strongest(had.role, role)
    else list.push({ episode, role })
  }
  const handleToDid = new Map()
  const aired = new Set(ledger.episodes.filter((e) => e.aired && (e.airedMs == null || e.airedMs <= atMs)).map((e) => e.id))
  for (const e of ledger.episodes) {
    if (!aired.has(e.id)) continue
    for (const p of e.featured) add(p, e.id, 'shown')
    for (const p of e.guests) add(p, e.id, 'spoke')
    for (const p of [...e.featured, ...e.guests]) if (p.did && p.handle) handleToDid.set(p.handle, p.did)
  }
  for (const t of ledger.tracker) {
    if (t.did && t.handle) handleToDid.set(t.handle, t.did)
    for (const a of t.appearances) {
      const known = ledger.episodes.find((e) => e.id === a.episode)
      if (known && !aired.has(a.episode)) continue // a draft
      if (!known && Number.isFinite(dateMs(a.date)) && dateMs(a.date) > atMs) continue
      add(t, a.episode, a.role)
    }
  }
  return (did, handle) => {
    const h = norm(handle)
    const keys = [did, h && handleToDid.get(h), h && `handle:${h}`].filter(Boolean)
    const list = []
    for (const k of new Set(keys)) for (const a of appearances.get(k) ?? []) if (!list.some((x) => x.episode === a.episode)) list.push(a)
    let previous = null
    let earlier = null
    for (const a of list) {
      if (prev && a.episode === prev.id) previous = a.role
      else earlier = strongest(earlier, a.role)
    }
    return { previous, earlier, episodes: list.map((a) => a.episode).sort(), appearances: list.length }
  }
}

/** Accounts featured in at least `min` aired episodes, most first. */
export function frequentlyFeatured(ledger, { min = 2, atMs = Date.now() } = {}) {
  const look = featuredLookup(ledger, atMs)
  const all = [...ledger.episodes.flatMap((e) => [...e.guests, ...e.featured]), ...ledger.tracker]
  const didOf = new Map(all.filter((p) => p.did && p.handle).map((p) => [p.handle, p.did]))
  const people = new Map()
  for (const p of all) {
    const did = p.did ?? didOf.get(p.handle) ?? null
    const key = did ?? p.handle
    people.set(key, { did, handle: p.handle ?? people.get(key)?.handle ?? null })
  }
  const aired = ledger.episodes.filter((e) => e.aired).length
  return [...people.values()]
    .map((p) => ({ did: p.did, handle: p.handle, ...look(p.did, p.handle) }))
    .filter((r) => r.appearances >= min)
    .sort((a, b) => b.appearances - a.appearances || String(a.handle).localeCompare(String(b.handle)))
    .map((r) => ({ ...r, ofEpisodes: aired }))
}
