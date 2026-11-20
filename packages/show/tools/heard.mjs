// What the transcription heard, judged: word scores, which caption words were missed, the flags
// (alarming, out-of-bounds or crude words; a real name heard as something else; a statement about
// a real person turned around) and a line's status. Used by analyze.ts (whisper) and fit.ts.
//
// Pure, Node builtins only: `node --test` loads it with nothing installed.

/** the hearing gate: a line with fewer of its words heard than this is weak */
export const GATE = 0.6

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
export function numWords(n) {
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '')
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numWords(n % 100) : '')
  if (n < 10000) return numWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numWords(n % 1000) : '')
  return String(n)
}

/** words for scoring: lower case, no punctuation, digits and % spelled out (Whisper writes "90 %") */
export const norm = (s) =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/%/g, ' percent ')
    .replace(/\d+/g, (d) => ' ' + numWords(+d) + ' ')
    .replace(/[^a-z' ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

// "built" and "build" sound the same before a vowel (the t flaps): count either
const SAME = { build: 'built', builds: 'built' }

/**
 * Which reference words were heard: a bag of words, each heard word used once; compounds count
 * ("simcluster" covers "sim" and "cluster"). Returns one boolean per norm(ref) word.
 */
export function heardMask(ref, heard) {
  const r = norm(ref).map((w) => SAME[w] ?? w)
  const h = norm(heard).map((w) => SAME[w] ?? w)
  const joined = h.join('')
  return r.map((w) => {
    const i = h.indexOf(w)
    if (i >= 0) {
      h.splice(i, 1)
      return true
    }
    return w.length >= 3 && joined.includes(w)
  })
}

/** how many reference words were heard: [heard, of] */
export function wordScore(ref, heard) {
  const m = heardMask(ref, heard)
  return [m.filter(Boolean).length, m.length]
}

/** the norm()ed reference words that were not heard */
export function missedWords(ref, heard) {
  const r = norm(ref)
  return heardMask(ref, heard).flatMap((ok, i) => (ok ? [] : [r[i]]))
}

const words = (s) => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean)
/** a whole-word (or whole-phrase) match, as the pipeline's heard-text gate matches */
export const hasPhrase = (text, phrase) => ` ${words(text).join(' ')} `.includes(` ${words(phrase).join(' ')} `)
/** hasPhrase, also matching a plural or -ed/-ing form of the last word ("elections" for "election") */
export function hasTerm(text, term) {
  if (hasPhrase(text, term)) return true
  const t = words(term)
  if (!t.length) return false
  const last = t[t.length - 1]
  return ['s', 'es', 'ed', 'ing'].some((suf) => hasPhrase(text, [...t.slice(0, -1), last + suf].join(' ')))
}

const NEGATIONS = new Set(['not', 'no', 'never', 'nothing', 'none', 'nobody', 'nowhere', 'neither', 'nor', 'cannot', "can't", "won't", "don't", "doesn't", "didn't", "isn't", "aren't", "wasn't", "weren't", "shouldn't", "wouldn't", "couldn't", "haven't", "hasn't", "hadn't", "ain't"])
/** the number of negations in a text (a statement and its reverse differ by one) */
export const negations = (s) => words(s).filter((w) => NEGATIONS.has(w) || w.endsWith("n't")).length

/** an account the show invented (no handle, or a handle on an example domain) */
export const isInvented = (entry) => {
  const h = String(entry?.handle ?? '').trim().replace(/^@/, '').toLowerCase()
  return !h || /(^|\.)example(\.(com|org|net))?$/.test(h)
}

/**
 * The real people's names that can appear in captions: real guests in the cast (name and the
 * handle's first part) and the accounts in sources.json (display name and handle). Only names of
 * three letters or more, split into words ("Minor Mobius" → "minor mobius" as one phrase).
 */
export function realNames(cast = {}, sources = null) {
  const out = []
  const add = (s) => {
    const n = String(s ?? '').replace(/[^\p{L}\p{N}' .-]/gu, ' ').replace(/\s+/g, ' ').trim()
    if (n.replace(/[^a-z]/gi, '').length > 2) out.push(n)
  }
  for (const c of Object.values(cast)) {
    if (!c?.guest || isInvented(c)) continue
    add(c.name)
    add(String(c.handle ?? '').replace(/^@/, '').split('.')[0])
  }
  for (const a of sources?.accounts ?? []) {
    add(a.displayName)
    add(String(a.handle ?? '').replace(/^@/, '').split('.')[0])
  }
  return [...new Set(out)]
}

/**
 * Is this line a real person's: said by a real guest's puppet, or reading a real post aloud (the
 * caption, ellipses and emoji aside, is part of a post in sources.json), or naming a real person.
 */
export function isRealLine(line, { cast = {}, sources = null, names = [] } = {}) {
  const c = cast[line.who]
  if (c?.guest && !isInvented(c)) return true
  const core = words(line.text).join(' ')
  if (core.split(' ').length >= 3) for (const p of sources?.posts ?? []) if (` ${words(p.text).join(' ')} `.includes(` ${core} `)) return true
  return names.some((n) => hasPhrase(line.text, n))
}

/**
 * The flags for one heard text of a line. `terms` is { alarming: [], outOfBounds: [], crude: [],
 * loaded: [] } (the pipeline's heard lists, and the studio's own two). Each flag is a short string.
 * - an alarming, out-of-bounds or crude term heard (and not in the caption);
 * - a real name in the caption not heard;
 * - on a real person's line: a negation gained or lost, or a loaded word heard that is not in the
 *   caption ("repost" heard as "report").
 */
export function flagsFor(caption, heard, { terms = {}, names = [], real = false } = {}) {
  const f = []
  for (const [kind, list] of [['alarming', terms.alarming], ['out of bounds', terms.outOfBounds], ['crude', terms.crude]])
    for (const t of list ?? []) if (hasTerm(heard, t) && !hasTerm(caption, t)) f.push(`${kind}: ${t}`)
  for (const n of names) if (hasPhrase(caption, n) && !hasPhrase(heard, n)) f.push(`name: ${n}`)
  if (real) {
    if (negations(caption) !== negations(heard)) f.push('statement: negation')
    for (const t of terms.loaded ?? []) if (hasTerm(heard, t) && !hasTerm(caption, t)) f.push(`statement: ${t}`)
  }
  return f
}

/**
 * Summarise one candidate's takes: takes is [{ heard, score: [ok, of], flags: [] }].
 * Returns { heard: [{ text, count }], score: { heard, of, min }, flags, pass } where score.heard is
 * the median take's words heard, min the worst take's, and pass every take at the gate.
 */
export function summarise(takes, gate = GATE) {
  const counts = new Map()
  for (const t of takes) counts.set(t.heard, (counts.get(t.heard) ?? 0) + 1)
  const heard = [...counts].map(([text, count]) => ({ text, count })).sort((a, b) => b.count - a.count || a.text.localeCompare(b.text))
  const oks = takes.map((t) => t.score[0]).sort((a, b) => a - b)
  const of = takes[0]?.score[1] ?? 0
  const med = oks.length ? oks[Math.floor((oks.length - 1) / 2)] : 0
  const min = oks.length ? oks[0] : 0
  const flags = [...new Set(takes.flatMap((t) => t.flags))].sort()
  return { heard, score: { heard: med, of, min }, flags, pass: of === 0 || min / of >= gate }
}

/** the median take over the gate */
export const overGate = (s, gate = GATE) => s.score.of === 0 || s.score.heard / s.score.of >= gate

/**
 * A line's status from its chosen candidate's summary and whether any candidate got over the gate:
 * flagged (a flag in any take), ok (every take at the gate), weak (the median over the gate but a
 * take under it: unstable; or not searched), unsayable (searched, and no candidate's median over).
 */
export function lineStatus(chosen, { searched = true, anyOver = overGate(chosen) } = {}) {
  if (chosen.flags.length) return 'flagged'
  if (chosen.pass) return 'ok'
  if (overGate(chosen)) return 'weak'
  return searched && !anyOver ? 'unsayable' : 'weak'
}

/**
 * Order candidates, best first: no flags, then every take over the gate, then the median, then the
 * worst take, then fewest edits (the line as written first).
 */
export function better(a, b, gate = GATE) {
  const key = (c) => [c.flags.length ? 0 : 1, c.pass ? 1 : 0, c.score.of ? c.score.heard / c.score.of : 1, c.score.of ? c.score.min / c.score.of : 1, -(c.edits ?? 0)]
  const ka = key(a), kb = key(b)
  for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) return kb[i] - ka[i]
  return 0
}
