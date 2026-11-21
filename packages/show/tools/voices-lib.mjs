// Giving guests voices that are distinct from each other and from the house: the distance between
// two measured voices, the slots a guest can be given, and the assignment. voices.ts measures (it
// renders through the engine) and writes the cast entries; everything here is arithmetic.
//
// Pure, Node builtins only: `node --test` loads it with nothing installed.
import { parseLiteral, prop, setProp } from './source-edit.mjs'

/** below this nearest-neighbour distance two voices are easy to confuse (tools/README.md) */
export const MIN_DISTANCE = 1.5

/**
 * The distance between two measured voices { f0, ltas }: pitch in semitones over 2 and the rms dB
 * difference of their long-term spectra over 2.5, combined (the same as analyze.ts voices).
 */
export function distance(a, b) {
  const st = Math.abs(12 * Math.log2(a.f0 / b.f0))
  const n = Math.min(a.ltas.length, b.ltas.length)
  let acc = 0
  for (let i = 0; i < n; i++) acc += (a.ltas[i] - b.ltas[i]) ** 2
  const sp = Math.sqrt(acc / Math.max(1, n))
  return Math.hypot(st / 2, sp / 2.5)
}

/** the nearest of `others` ({ id, feat }) to `feat`: { id, distance }, or null when there are none */
export function nearest(feat, others) {
  let best = null
  for (const o of others) {
    const d = distance(feat, o.feat)
    if (!best || d < best.distance) best = { id: o.id, distance: d }
  }
  return best
}

/** timbres a slot can have, each a patch on the voice source (and a note of what it sounds like) */
export const TIMBRES = {
  plain: { source: { tension: 0.5 }, note: 'plain' },
  bright: { source: { tension: 0.62, brightness: 0.5 }, note: 'bright' },
  soft: { source: { breathiness: 0.25, tension: 0.35, brightness: 0 }, note: 'soft' },
  dark: { source: { breathiness: 0.4, tension: 0.4, brightness: 0.05 }, note: 'dark, breathy' },
  pressed: { source: { tension: 0.6, roughness: 0.3, brightness: 0.35 }, note: 'pressed, a little rough' },
}

/**
 * The slots a guest can be given: bodies from adult male to adult female (and a little younger),
 * pitches inside the engine's safe ranges (men 85–150 Hz, women 165–270; README "Voice design"),
 * each with every timbre. Ordered low to high. A slot is { key, body, f0, source, note }.
 */
export function slotGrid() {
  const bodies = [
    { body: { female: 0, child: 0 }, f0s: [86, 96, 118, 132, 146] },
    { body: { female: 0.25, child: 0.1 }, f0s: [124, 140, 160] },
    { body: { female: 0.5, child: 0 }, f0s: [160, 178, 205, 228] },
    { body: { female: 0.8, child: 0.25 }, f0s: [176, 215, 240, 262] },
    { body: { female: 1, child: 0 }, f0s: [168, 225, 250, 270] },
  ]
  const out = []
  for (const b of bodies)
    for (const f0 of b.f0s)
      for (const [t, tim] of Object.entries(TIMBRES)) out.push({ key: `${b.body.female}/${b.body.child}/${f0}/${t}`, body: b.body, f0, source: tim.source, note: tim.note })
  return out.sort((a, b) => a.f0 - b.f0 || a.key.localeCompare(b.key))
}

/**
 * A rule for one guest, from `--rule <id>:<rule>`: not-lowest, not-highest, below:<Hz>,
 * above:<Hz>, keep (keep the voice it has even if it is too close; it still counts for the others),
 * new (give it a new voice even if the one it has is distinct). Returns { id, rule, hz? } or throws.
 */
export function parseRule(s) {
  const m = /^([a-z0-9_-]+):(not-lowest|not-highest|below|above|keep|new)(?::(\d+(?:\.\d+)?))?$/i.exec(String(s))
  if (!m) throw new Error(`bad rule ${JSON.stringify(s)} (want <castId>:not-lowest | not-highest | below:<Hz> | above:<Hz> | keep | new)`)
  if ((m[2] === 'below' || m[2] === 'above') !== (m[3] !== undefined)) throw new Error(`rule ${s}: below and above take a pitch in Hz (below:180), the others none`)
  return { id: m[1], rule: m[2], ...(m[3] !== undefined ? { hz: Number(m[3]) } : {}) }
}

/** does a measured f0 satisfy a guest's rules, given every other voice's f0 in the room? */
export function allowed(f0, rules, roomF0s) {
  for (const r of rules) {
    if (r.rule === 'not-lowest' && !roomF0s.some((x) => x < f0)) return false
    if (r.rule === 'not-highest' && !roomF0s.some((x) => x > f0)) return false
    if (r.rule === 'below' && !(f0 < r.hz)) return false
    if (r.rule === 'above' && !(f0 > r.hz)) return false
  }
  return true
}

const better = (a, b) => {
  for (let k = 0; k < a.length; k++) if (a[k] !== b[k]) return a[k] > b[k]
  return false
}

/**
 * Assign voices. `house` and `guests` are [{ id, feat }] (a guest's feat is its current voice, or
 * null if it has none); `slots` is [{ key, feat, ... }] measured; `rules` maps an id to its rules.
 * Guests are taken in order (guests with rules first). A guest keeps its voice when that voice is
 * at least `min` from the house and from every voice already placed (so its respellings stay
 * valid), unless a rule says otherwise. Otherwise it gets the slot farthest from everything placed
 * that its rules allow, preferring, among slots that clear `min`, the one nearest its current
 * pitch (with `margin` to spare: slots are measured at a standard rate and accent); a guest with no
 * voice yet (feat null) has no old pitch, so among those it gets the one with the most room, which
 * spreads fresh guests across the range. `prefer` maps an
 * id to soft rules (the pronoun steer, steerRules): among slots that clear `min`, one that meets them
 * comes first; distinctness always comes before them, and a hand rule for the guest switches them
 * off. A guest with a steer gets `steer: { wanted, met }`. Returns [{ id, keep, slot?, feat, nearest: { id, distance } }] in the input order.
 */
/**
 * The pronoun steer (the owner's ruling of 21 November 2026; config/voices.json `pronounSteer`): a
 * guest whose stated forms include "she" and not "he" is kept out of the lowest band (`above:<hz>`),
 * one whose forms include "he" and not "she" out of the highest (`below:<hz>`); anyone else (mixed
 * forms, any pronouns, they alone, neopronouns, none stated) is placed freely. A preference, not a
 * rule: it is the same `above` / `below` the --rule flag takes, applied softly by assign().
 * `pronouns` is the record the pipeline carries ({ text, forms } or null). Returns [] or [rule].
 */
export function steerRules(pronouns, cfg = {}) {
  if (cfg.enabled === false) return []
  const forms = Array.isArray(pronouns?.forms) ? pronouns.forms : []
  const she = forms.includes('she')
  const he = forms.includes('he')
  if (she && !he && Number.isFinite(cfg.lowestBandBelowHz)) return [{ rule: 'above', hz: cfg.lowestBandBelowHz }]
  if (he && !she && Number.isFinite(cfg.highestBandAboveHz)) return [{ rule: 'below', hz: cfg.highestBandAboveHz }]
  return []
}

export function assign({ house, guests, slots, rules = {}, prefer = {}, min = MIN_DISTANCE, margin = 0.25 }) {
  const placed = house.map((h) => ({ id: h.id, feat: h.feat }))
  const order = guests.map((g, i) => ({ g, i })).sort((a, b) => (rules[b.g.id]?.length ?? 0) - (rules[a.g.id]?.length ?? 0) || a.i - b.i)
  const out = new Array(guests.length)
  const taken = new Set()
  for (const { g, i } of order) {
    const rs = rules[g.id] ?? []
    const f0s = () => placed.map((p) => p.feat.f0)
    const keepRule = rs.some((r) => r.rule === 'keep')
    const newRule = rs.some((r) => r.rule === 'new')
    // a hand rule always wins over the pronoun steer: a guest with one gets no steer
    const pref = rs.length ? [] : prefer[g.id] ?? []
    const steer = (f0) => (pref.length ? { wanted: pref.map((r) => `${r.rule}:${r.hz}`).join(' '), met: allowed(f0, pref, []) } : null)
    let current = null
    if (g.feat && !newRule) {
      const nn = nearest(g.feat, placed)
      if (keepRule || ((!nn || nn.distance >= min) && allowed(g.feat.f0, rs, f0s()))) {
        current = { id: g.id, keep: true, feat: g.feat, nearest: nn }
        // distinct already: kept, unless the steer is unmet and a slot can meet it and stay distinct
        if (keepRule || !pref.length || allowed(g.feat.f0, pref, [])) {
          placed.push({ id: g.id, feat: g.feat })
          out[i] = { ...current, ...(steer(g.feat.f0) ? { steer: steer(g.feat.f0) } : {}) }
          continue
        }
      }
    }
    let best = null
    for (const s of slots) {
      if (taken.has(s.key) || !allowed(s.feat.f0, rs, f0s())) continue
      const nn = nearest(s.feat, placed)
      const d = nn ? nn.distance : Infinity
      // a slot is measured at a standard rate and accent; the guest keeps its own, which moves it a
      // little, so a new voice must clear the bar with some room
      const clears = d >= min + margin
      const near = g.feat ? Math.abs(12 * Math.log2(s.feat.f0 / g.feat.f0)) : 0
      const met = !pref.length || allowed(s.feat.f0, pref, [])
      // clear the bar first; then the steer, a preference only; then stay near the old pitch; then the most room
      const score = [clears ? 1 : 0, met ? 1 : 0, clears ? -near : d, d]
      if (!best || better(score, best.score)) best = { s, nn, score }
    }
    // a voice it already had that is distinct beats a new one that would not meet the steer either
    if (current && (!best || !best.score[0] || !best.score[1])) {
      placed.push({ id: g.id, feat: g.feat })
      out[i] = { ...current, steer: steer(g.feat.f0) }
      continue
    }
    if (!best) throw new Error(`no slot satisfies the rules for ${g.id}`)
    taken.add(best.s.key)
    placed.push({ id: g.id, feat: best.s.feat })
    out[i] = { id: g.id, keep: false, slot: best.s, feat: best.s.feat, nearest: best.nn, ...(steer(best.s.feat.f0) ? { steer: steer(best.s.feat.f0) } : {}) }
  }
  // report each guest's nearest neighbour among everyone, now that all are placed
  for (const o of out) o.nearest = nearest(o.feat, placed.filter((p) => p.id !== o.id))
  return out
}

/**
 * Each guest's stated pronouns, from the record the pipeline carries: the sources.json files of the
 * episode and its drafts name each guest's account (`role: guest`, `cast`, `did`, `handle`), and the
 * digest's `authors` (by DID, then handle) carry the scraper's `pronouns`. A pronouns field on the
 * sources account itself comes first. A guest with no source record is left out: no steer.
 * Never from the cast entry's name or look. Returns Map castId -> { pronouns, handle, did }.
 */
export function guestPronouns(sources = [], authors = {}) {
  const norm = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()
  const byHandle = new Map(Object.entries(authors ?? {}).map(([did, a]) => [norm(a?.handle), { did, ...a }]))
  const out = new Map()
  for (const s of sources) for (const a of s?.accounts ?? []) {
    if (!a?.cast || out.has(a.cast)) continue
    const rec = a.pronouns !== undefined ? a.pronouns : a.did && authors?.[a.did] ? authors[a.did].pronouns : byHandle.get(norm(a.handle))?.pronouns
    if (rec === undefined) continue
    out.set(a.cast, { pronouns: rec ?? null, handle: a.handle ?? null, did: a.did ?? null })
  }
  return out
}

/** how a pronoun record reads in the table: the phrase, "none stated", or "no source record" */
export const pronounText = (x) => (!x ? 'no source record' : x.pronouns?.text ? x.pronouns.text : 'none stated')

/**
 * Which entries of a cast.js `CAST` are guests to place: every id that is not a house id and either
 * has a voice (`body`) or is marked `guest: true` without one (a writer's entry, `{ name, handle,
 * title, guest: true }`: a guest that needs a voice). Anything else is skipped. Returns
 * [{ id, entry, voiced }] in the file's order.
 */
export function castGuests(own = {}, house = []) {
  const out = []
  for (const [id, entry] of Object.entries(own ?? {})) {
    if (house.includes(id) || !entry || typeof entry !== 'object') continue
    if (entry.body) out.push({ id, entry, voiced: true })
    else if (entry.guest === true) out.push({ id, entry, voiced: false })
  }
  return out
}

const fmtObj = (o) => `{ ${Object.entries(o ?? {}).map(([k, v]) => `${k}: ${v}`).join(', ')} }`

/**
 * Write a voice ({ body, f0, source }) into cast entry `id` of a cast.js source: each of the three
 * keys is replaced where it is, or inserted (body after `title`, f0 after `body`, source after
 * `accent` or else after `f0`), so an entry that has none of them yet, on one line or several, gets
 * all three and keeps every other key and comment as it was. Returns the new source.
 */
export function writeVoice(src, id, v) {
  for (const [key, val] of [['body', fmtObj(v.body)], ['f0', String(v.f0)], ['source', fmtObj(v.source)]]) {
    const entry = prop(parseLiteral(src, { name: 'CAST' }), id)?.value
    if (!entry) throw new Error(`no cast entry ${id}`)
    const after = key === 'body' ? 'title' : key === 'f0' ? 'body' : prop(entry, 'accent') ? 'accent' : 'f0'
    src = setProp(src, entry, key, val, { after })
  }
  return src
}
