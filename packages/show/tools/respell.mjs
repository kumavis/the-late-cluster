// Candidate fixes for a line that is not heard well, without changing its words: respellings of
// the missed words (from the pronunciation dictionary, the README's tested table and its known weak
// sounds), commas that set a word apart or let it run on, and the respelling taken back out.
// fit.ts renders and transcribes every candidate and keeps the best.
//
// Pure, Node builtins only (the dictionary is read with node:zlib): `node --test` loads it with
// nothing installed. A candidate is an `as` string with exactly as many space-separated tokens as
// the caption, so the renderer's word timings still map onto the caption.
import { readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { norm } from './heard.mjs'

/** the respellings tested in tools/README.md ("Respelling with `as`" and the weak sounds) */
export const KNOWN = {
  bluesky: ['blue-sky'],
  simcluster: ['sim-cluster'],
  vibecoded: ['vibe-coded'],
  bsky: ['bee-sky', 'blue-sky'],
  gm: ['gee-em'],
  gn: ['gee-en'],
  atproto: ['att-pro-toe'],
  nx: ['En-Ex'],
  ai: ['ay-eye'],
  acknowledged: ['acknowledge'],
  heuristic: ['hew-ristic'],
  lol: ['ell-oh-ell'],
  // posting shorthand, read out as it is meant (the caption keeps the shorthand)
  tho: ['though'],
  thru: ['through'],
  pls: ['please'],
  idk: ['i-dunno', 'eye-dee-kay'],
  afaik: ['as-far-as-i-know'],
  imo: ['in-my-opinion'],
  tbh: ['to-be-honest'],
  irl: ['eye-are-ell'],
  gg: ['good-game', 'gee-gee'],
}

/**
 * Hyphen parts are G2P'd as words, and function words get their weak form (`for-mints` → /fəɹ/):
 * a part that is a function word is spelled so it is not one.
 */
export const STRONG = { a: 'uh', an: 'ann', and: 'annd', as: 'azz', at: 'att', be: 'bee', but: 'butt', by: 'bye', for: 'four', from: 'frum', he: 'hee', her: 'herr', him: 'himm', in: 'inn', is: 'izz', it: 'itt', me: 'mee', of: 'uhv', on: 'awn', or: 'ore', so: 'sew', than: 'thann', that: 'thatt', the: 'thuh', them: 'themm', to: 'too', us: 'uss', was: 'wuzz', we: 'wee', were: 'wurr', you: 'yoo', your: 'yore' }

/** words whose weak form swallows them when stressed ("that" as a pronoun): the strong spelling */
export const FUNCTION_WORDS = new Set(Object.keys(STRONG))

let DICT = null
/** the CMU pronouncing dictionary the engine uses: word → ARPAbet phones (first pronunciation) */
export function loadDict(file = fileURLToPath(new URL('./data/cmudict.txt.gz', import.meta.url))) {
  if (DICT) return DICT
  DICT = new Map()
  for (const line of gunzipSync(readFileSync(file)).toString('utf8').split('\n')) {
    const tab = line.indexOf('\t')
    if (tab < 1) continue
    const w = line.slice(0, tab)
    if (!DICT.has(w)) DICT.set(w, line.slice(tab + 1).trim().split(/\s+/))
  }
  return DICT
}

/** a caption token split into leading punctuation, the word, trailing punctuation */
export function splitToken(tok) {
  const m = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u.exec(tok)
  return { lead: m[1], core: m[2], trail: m[3] }
}

const VOWEL = /^(AA|AE|AH|AO|AW|AY|EH|ER|EY|IH|IY|OW|OY|UH|UW)[0-2]$/
const LIQUID_ONSET = new Set(['P R', 'P L', 'B R', 'B L', 'T R', 'D R', 'K R', 'K L', 'G R', 'G L', 'F R', 'F L', 'TH R', 'S T', 'S P', 'S K', 'S L', 'S M', 'S N', 'K W', 'T W', 'S W'])

/** ARPAbet phones → syllables [{ onset: [], vowel, coda: [] }] (maximal legal onsets, roughly) */
export function syllabify(phones) {
  const sy = []
  let pend = []
  for (const p of phones) {
    if (!VOWEL.test(p)) {
      pend.push(p)
      continue
    }
    if (!sy.length) sy.push({ onset: pend, vowel: p, coda: [] })
    else {
      // between two vowels: one consonant goes to the next onset; of two or more, a legal
      // two-consonant onset goes to the next syllable, else only the last one does
      const prev = sy[sy.length - 1]
      let k = pend.length ? 1 : 0
      if (pend.length >= 2 && LIQUID_ONSET.has(pend.slice(-2).join(' '))) k = 2
      prev.coda = pend.slice(0, pend.length - k)
      sy.push({ onset: pend.slice(pend.length - k), vowel: p, coda: [] })
    }
    pend = []
  }
  if (sy.length) sy[sy.length - 1].coda.push(...pend)
  return sy
}

const CONS = { B: 'b', CH: 'ch', D: 'd', DH: 'th', F: 'f', G: 'g', HH: 'h', JH: 'j', K: 'k', L: 'l', M: 'm', N: 'n', NG: 'ng', P: 'p', R: 'r', S: 's', SH: 'sh', T: 't', TH: 'th', V: 'v', W: 'w', Y: 'y', Z: 'z', ZH: 'zh' }
// [open syllable, closed syllable]; a closed spelling with "_" puts the coda before a silent e
const VOW = { AA: ['ah', 'o'], AE: ['aa', 'a'], AH: ['uh', 'u'], AO: ['aw', 'aw'], AW: ['ow', 'ow'], AY: ['eye', 'i_e'], EH: ['eh', 'e'], ER: ['er', 'er'], EY: ['ay', 'a_e'], IH: ['ih', 'i'], IY: ['ee', 'ee'], OW: ['oh', 'o_e'], OY: ['oy', 'oy'], UH: ['oo', 'oo'], UW: ['oo', 'oo'] }

function spellSyl(s, { closedE = true } = {}) {
  const on = s.onset.map((p) => CONS[p] ?? '').join('')
  const co = s.coda.map((p) => CONS[p] ?? '').join('')
  const v = VOW[s.vowel.slice(0, -1)] ?? ['uh', 'u']
  if (!co) return on + v[0]
  // a vowel before r: "ar", "or", not a closed short vowel ("part" is "pahrt", never "port")
  if (s.coda[0] === 'R' && ['AA', 'AE'].includes(s.vowel.slice(0, -1))) return on + 'ah' + co
  const c = v[1]
  if (c.includes('_')) return closedE && s.coda.length === 1 ? on + c.replace('_', co) : on + v[0] + co
  return on + c + co
}

/**
 * Respellings of a dictionary pronunciation, one hyphenated part per syllable: plain, and closed
 * (a single consonant between two syllables doubled into the first, a cluster split between them:
 * "suh-man-thuh" and "sum-man-thuh", "suh-spens" and "sus-pens").
 * Parts that are function words get their strong spelling.
 */
export function respellPhones(phones) {
  const sy = syllabify(phones)
  if (!sy.length) return []
  const fix = (parts) => parts.map((p) => STRONG[p] ?? p).join('-')
  const plain = fix(sy.map((s) => spellSyl(s)))
  const doubled = fix(
    sy.map((s, i) => {
      const nx = sy[i + 1]
      if (!nx || s.coda.length || !nx.onset.length) return spellSyl(s)
      return spellSyl({ ...s, coda: [nx.onset[0]] }, { closedE: false })
    }).map((part, i, parts) => {
      // a cluster is split, not doubled: "sus-pens", not "sus-spens"
      const s = sy[i], pv = sy[i - 1]
      if (!pv || pv.coda.length || s.onset.length < 2) return part
      return spellSyl({ ...s, onset: s.onset.slice(1) })
    }),
  )
  return [...new Set([plain, doubled])].filter((x) => x.replace(/-/g, '').length >= 2)
}

/** two dictionary words that make up a word the dictionary does not have ("vibecoded" → "vibe-coded") */
export function compoundSplits(core, dict) {
  const w = core.toLowerCase()
  const out = []
  for (let i = 2; i <= w.length - 2; i++) {
    const a = w.slice(0, i), b = w.slice(i)
    if (dict.has(a) && dict.has(b) && !FUNCTION_WORDS.has(a) && !FUNCTION_WORDS.has(b) && a.length + b.length === w.length) out.push(`${a}-${b}`)
  }
  return out.slice(0, 2)
}

/** keep the first letter's case of the word being replaced */
const caseLike = (orig, s) => (/^\p{Lu}/u.test(orig) ? s.charAt(0).toUpperCase() + s.slice(1) : s)

/**
 * Respellings for one caption word (its core, without punctuation). `dict` maps lower-case words
 * to ARPAbet phones; `learned` maps lower-case words to respellings that fixed them before.
 */
export function wordCandidates(core, { dict = new Map(), learned = {} } = {}) {
  const orig = core.toLowerCase()
  // letters with marks are read as noise ("Möbius" → /ɛmbɪʌz/): the plain letters first
  const plain = core.normalize('NFD').replace(/\p{M}/gu, '')
  const w = plain.toLowerCase().replace(/[’‘]/g, "'")
  if (!/^[a-z][a-z'-]*$/.test(w)) return []
  const out = []
  const unstress = (p) => (p ?? []).map((x) => x.replace(/\d/, '')).join(' ')
  const push = (s) => {
    if (!s || s.toLowerCase() === orig) return
    // never a respelling that is another word said another way ("port" for "part")
    const other = dict.get(s.toLowerCase().replace(/-/g, ''))
    if (other && dict.has(w) && unstress(other) !== unstress(dict.get(w))) return
    out.push(caseLike(core, s))
  }
  if (w !== orig) push(plain)
  for (const s of learned[orig] ?? learned[w] ?? []) push(s)
  for (const s of KNOWN[w] ?? []) push(s)
  if (STRONG[w]) push(STRONG[w])
  // initial /dʒ/ is weak: an extra closure (README: `djoke`)
  const ph = dict.get(w.replace(/-/g, ''))
  if (ph && ph[0] === 'JH') push('d' + w)
  // /u/ after a tongue-tip consonant can be heard as /o/ ("New" → "No"): the glide spelled out
  if (ph && ph.length === 2 && ['N', 'T', 'D', 'S', 'Z', 'L'].includes(ph[0]) && ph[1].startsWith('UW')) push(`${CONS[ph[0]]}ee-oo`)
  if (ph) for (const s of respellPhones(ph)) push(s)
  else for (const s of compoundSplits(w, dict)) push(s)
  if (w.includes('-')) push(w.replace(/-/g, ''))
  // a short closed word: double its last consonant ("that" → "thatt")
  if (ph && ph.filter((p) => VOWEL.test(p)).length === 1 && /[bdgkmnpt]$/.test(w) && !/(.)\1$/.test(w)) push(w + w.slice(-1))
  return [...new Set(out)]
}

/** an `as` string's tokens, aligned with the caption's; null when they do not align */
export function alignedTokens(text, as) {
  const t = String(text).split(/\s+/).filter(Boolean)
  const a = String(as ?? text).split(/\s+/).filter(Boolean)
  return a.length === t.length ? { text: t, spoken: a } : null
}

/** the caption token indices that hold any of these norm()ed words, most missed first */
export function targetTokens(text, missed) {
  const toks = String(text).split(/\s+/).filter(Boolean)
  const count = new Map()
  for (const m of missed) count.set(m, (count.get(m) ?? 0) + 1)
  const hits = []
  toks.forEach((tok, i) => {
    const n = norm(tok).reduce((a, w) => a + (count.get(w) ?? 0), 0)
    if (n) hits.push({ i, n })
  })
  return hits.sort((a, b) => b.n - a.n || a.i - b.i).map((h) => h.i)
}

const join = (toks) => toks.join(' ')

/**
 * Candidate `as` strings for a line, each with what it changes: [{ as, edits, why }].
 * - `text` the caption, `as` the respelling in use (or undefined);
 * - `missed` the norm()ed caption words missed across the takes (repeats count);
 * - `maxWords` how many of the most-missed words to work on, `perWord` respellings per word.
 * The line as it stands is not included. Every candidate has as many tokens as the caption.
 */
export function lineCandidates(text, as, missed, { dict = new Map(), learned = {}, maxWords = 3, perWord = 4 } = {}) {
  const al = alignedTokens(text, as) ?? alignedTokens(text, text)
  const spoken = al.spoken
  const out = []
  const seen = new Set([join(spoken)])
  const add = (toks, edits, why) => {
    const s = join(toks)
    if (seen.has(s)) return
    seen.add(s)
    out.push({ as: s, edits, why })
  }
  // the respelling in use, taken out
  if (as && join(al.text) !== join(spoken)) add(al.text, 1, 'as written')
  for (const i of targetTokens(text, missed).slice(0, maxWords)) {
    const cap = splitToken(al.text[i])
    const cur = splitToken(spoken[i])
    // respellings of the word, with the punctuation the spoken token has
    for (const r of wordCandidates(cap.core, { dict, learned }).slice(0, perWord)) {
      const toks = spoken.slice()
      toks[i] = cur.lead + r + cur.trail
      add(toks, 1, `${cap.core} → ${r}`)
    }
    if (cur.core.toLowerCase() !== cap.core.toLowerCase()) {
      const toks = spoken.slice()
      toks[i] = cur.lead + cap.core + cur.trail
      add(toks, 1, `${cur.core} → ${cap.core}`)
    }
    // commas: set the word apart, or take a comma out next to it
    const prev = i > 0 ? splitToken(spoken[i - 1]) : null
    if (prev && !prev.trail) {
      const toks = spoken.slice()
      toks[i - 1] = spoken[i - 1] + ','
      add(toks, 1, `comma before ${cap.core}`)
    }
    if (i < spoken.length - 1 && !cur.trail) {
      const toks = spoken.slice()
      toks[i] = spoken[i] + ','
      add(toks, 1, `comma after ${cap.core}`)
    }
    if (prev && prev.trail === ',') {
      const toks = spoken.slice()
      toks[i - 1] = spoken[i - 1].slice(0, -1)
      add(toks, 1, `no comma before ${cap.core}`)
    }
  }
  return out
}

/** two single-word fixes on different words, combined into one candidate (null if they clash) */
export function combine(base, a, b) {
  const t0 = base.split(' '), ta = a.split(' '), tb = b.split(' ')
  if (ta.length !== t0.length || tb.length !== t0.length) return null
  const out = t0.map((x, i) => {
    const ca = ta[i] !== x, cb = tb[i] !== x
    if (ca && cb && ta[i] !== tb[i]) return null
    return ca ? ta[i] : cb ? tb[i] : x
  })
  return out.includes(null) ? null : out.join(' ')
}

/** Levenshtein distance between two arrays (of IPA segments) */
export function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}
