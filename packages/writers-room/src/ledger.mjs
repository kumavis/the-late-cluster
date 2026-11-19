// The ledger: what the show has already done (docs/ledger/), written by reviewers after each
// episode and read by reviewers, the project manager and these rules, never by writers,
// researchers or builders (docs/WORKFLOW.md, "Who may read what").
//
//   docs/ledger/<episode-id>.json  { "id", "aired", "guests": [{ did, handle }] (real accounts whose
//                                    puppets spoke), "featured": [{ did, handle }] (shown on screen),
//                                    "formats", "song": { genre, theme }, "runners", "catchphrases", "devices" }
//   docs/ledger/featured.json      the tracker of who was featured when, keyed by DID:
//                                    { "<did>": { "handle", "appearances": [{ "episode", "date", "role": "spoke"|"shown" }] } }
//
// People are matched by DID (handles change; a handle is a label). A bare handle in an older file
// is accepted and resolved through the digest when it can be. Being a scraper seed has nothing to
// do with these rules. A missing folder or file is not an error: the rules then have no history.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ID_RE } from './repo.mjs'
import { normHandle } from './digest.mjs'

/** { did, handle } from a ledger entry that may be a bare handle */
export const person = (x) => (typeof x === 'string' ? { did: x.startsWith('did:') ? x : null, handle: x.startsWith('did:') ? null : normHandle(x) } : { did: x?.did ?? null, handle: x?.handle ? normHandle(x.handle) : null })

/** the matching key for a person: the DID, else the DID the digest knows for the handle, else the handle */
export function keyOf(p, d) {
  const x = person(p)
  if (x.did) return x.did
  const acc = x.handle && d?.accounts?.get(x.handle)
  return acc?.did ?? (x.handle ? `handle:${x.handle}` : null)
}

/** load every <id>.json and the tracker in an absolute ledger folder */
export function loadLedger(abs) {
  const dir = abs
  const entries = []
  const problems = []
  let tracker = {}
  if (!existsSync(abs)) return { entries, problems, dir, tracker }
  const parse = (f) => {
    const text = readFileSync(join(abs, f), 'utf8').trim()
    return text ? JSON.parse(text) : {}
  }
  if (existsSync(join(abs, 'featured.json'))) {
    try {
      tracker = parse('featured.json')
    } catch (e) {
      problems.push(`${dir}/featured.json: ${e.message}`)
    }
  }
  for (const f of readdirSync(abs).filter((f) => f.endsWith('.json')).sort()) {
    const id = f.replace(/\.json$/, '')
    if (!ID_RE.test(id)) continue
    let j
    try {
      j = parse(f)
    } catch (e) {
      problems.push(`${dir}/${f}: ${e.message}`)
      continue
    }
    const list = (x) => (Array.isArray(x) ? x.filter((s) => typeof s === 'string') : [])
    const people = (x) => (Array.isArray(x) ? x.filter((p) => typeof p === 'string' || (p && typeof p === 'object')).map(person) : [])
    entries.push({
      id: j.id ?? id,
      number: Number(id.slice(0, 3)),
      aired: j.aired === true,
      guests: people(j.guests),
      featured: people(j.featured),
      formats: list(j.formats),
      song: j.song && typeof j.song === 'object' ? { genre: String(j.song.genre ?? ''), theme: String(j.song.theme ?? '') } : null,
      runners: list(j.runners),
      catchphrases: list(j.catchphrases),
      devices: list(j.devices),
      hasProse: existsSync(join(abs, `${id}.md`)),
    })
  }
  return { entries: entries.sort((a, b) => a.number - b.number), problems, dir, tracker }
}

/**
 * Aired ledger entries before this episode, newest first. Only aired episodes count (owner's ruling,
 * docs/ledger/README.md "Aired and drafted"): "the previous episode" is the most recent aired one,
 * and an unaired draft never blocks a person or a joke. `{ drafts: true }` includes unaired entries.
 */
export const earlier = (ledger, number, { drafts = false, id = null } = {}) =>
  ledger.entries.filter((e) => e.number < number && e.id !== id && (drafts || e.aired)).sort((a, b) => b.number - a.number)

/**
 * The people rules (docs/WORKFLOW.md, the repetition gate), matched by DID: nobody who spoke in the
 * previous episode speaks in this one, and the accounts featured on screen are mostly new. A
 * warning, never a failure, for anyone who would be featured in more than `frequentShare` of the
 * last `recentEpisodes` episodes: fresh people are preferred, nobody is barred for having appeared.
 * `speakers` and `featured` are handles or { did, handle }; `d` is the digest, to resolve handles.
 */
export function peopleRules(ledger, number, { speakers = [], featured = [] }, { maxRepeatFeaturedShare = 0.5, recentEpisodes = 4, frequentShare = 0.5 } = {}, d = null) {
  const failures = []
  const warnings = []
  const past = earlier(ledger, number)
  const prev = past[0]
  if (!prev) return { failures, warnings: ['no earlier aired episode in the ledger: the people rules have no history to check against'], repeatShare: 0, frequent: [] }
  const label = (p) => {
    const x = person(p)
    return x.handle ? `@${x.handle}` : x.did
  }
  const spoke = new Set(prev.guests.map((p) => keyOf(p, d)))
  const seenSpk = new Set()
  for (const p of speakers) {
    const k = keyOf(p, d)
    if (!k || seenSpk.has(k)) continue
    seenSpk.add(k)
    if (spoke.has(k)) failures.push(`${label(p)} spoke in the previous aired episode (${prev.id}) and may not speak in this one`)
  }
  // "mostly new" looks back over the last recentEpisodes aired episodes, not all history
  const recent = past.slice(0, recentEpisodes)
  const seen = new Set(recent.flatMap((e) => [...e.featured, ...e.guests].map((p) => keyOf(p, d))))
  const shown = new Map()
  for (const p of featured) {
    const k = keyOf(p, d)
    if (k && !shown.has(k)) shown.set(k, p)
  }
  const repeats = [...shown].filter(([k]) => seen.has(k)).map(([, p]) => label(p))
  const share = shown.size ? repeats.length / shown.size : 0
  if (shown.size && share > maxRepeatFeaturedShare) failures.push(`${repeats.length} of ${shown.size} accounts featured on screen were featured in the last ${recent.length} aired episode${recent.length === 1 ? '' : 's'} (${repeats.join(', ')}); at most ${Math.round(maxRepeatFeaturedShare * 100)} % may be (mostly new)`)
  else if (repeats.length) warnings.push(`featured before: ${repeats.join(', ')} (${repeats.length} of ${shown.size})`)
  // the same few should not be in too often (a warning for reviewers and the pull request)
  const frequent = []
  for (const [k, p] of shown) {
    const n = recent.filter((e) => [...e.featured, ...e.guests].some((x) => keyOf(x, d) === k)).length
    if (recent.length && (n + 1) / (recent.length + 1) > frequentShare) frequent.push(`${label(p)} would be in ${n + 1} of the last ${recent.length + 1} episodes`)
  }
  for (const f of frequent) warnings.push(`often featured: ${f}; fresh people are preferred (nobody is barred)`)
  return { failures, warnings, repeatShare: share, frequent }
}
