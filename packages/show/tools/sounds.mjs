// A respelling keeps the word's sounds. The fitting tool's transcription is a proxy: it guesses real
// words from near sounds, so a spelling can be heard as the word by the transcription and as
// another word by a person ("showw" is transcribed "show" and said /ʃ aʊ w/, "shao"). For a word the
// pronunciation dictionary knows, a respelling is acceptable only when the engine's own G2P gives it
// the word's vowels, in order, and the word's consonants. It may double or lengthen a consonant, add a
// break between syllables or a pause, and shift stress; the only other vowel swaps are the
// near-identical pairs in config/sounds.json. A word the dictionary does not know (a name, a handle,
// an invented word, shorthand read as it is meant) has no reference: any spelling is a guess, and
// its sounds are only shown.
//
// Pure, Node builtins only: the sounds come in as a function (`ipa(word)` → IPA segments), which
// fit.ts and sounds.ts build from the engine's G2P (g2p.toPhrases), and tests from a table.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { splitToken, alignedTokens, SHORTHAND } from './respell.mjs'

export const SOUNDS_CONFIG = fileURLToPath(new URL('../config/sounds.json', import.meta.url))

let CONFIG = null
/** config/sounds.json: nearVowels, sameConsonant, lengthens (pairs of IPA segments), strongVowels ({ word: [vowel] }) */
export function loadSoundsConfig(file = SOUNDS_CONFIG) {
  if (CONFIG && file === SOUNDS_CONFIG) return CONFIG
  const c = JSON.parse(readFileSync(file, 'utf8'))
  const out = { nearVowels: c.nearVowels ?? [], strongVowels: c.strongVowels ?? {}, sameConsonant: c.sameConsonant ?? [], lengthens: c.lengthens ?? [] }
  if (file === SOUNDS_CONFIG) CONFIG = out
  return out
}

/** the dictionary's vowels as the engine says them, every stress (AH0 is ə, AH1 ʌ; ER0 ɚ, ER1 ɝ) */
export const ARPA_VOWEL = { AA: ['ɑ'], AE: ['æ'], AH: ['ə', 'ʌ'], AO: ['ɔ'], AW: ['aʊ'], AY: ['aɪ'], EH: ['ɛ'], ER: ['ɚ', 'ɝ'], EY: ['eɪ'], IH: ['ɪ'], IY: ['i'], OW: ['oʊ'], OY: ['ɔɪ'], UH: ['ʊ'], UW: ['u'] }
const ARPA_VOWEL_RE = /^(AA|AE|AH|AO|AW|AY|EH|ER|EY|IH|IY|OW|OY|UH|UW)[0-2]?$/

/** an IPA segment that is a vowel (the engine's English vowels, and any other it might print) */
export const isVowel = (s) => /^[aeiouyæɑɒɔəɚɛɜɝɪʊʌɐɨɯɤøœ]/.test(String(s ?? ''))

/** a word's key: lower case, plain letters, straight apostrophes */
export const soundKey = (w) =>
  String(w ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .trim()

/**
 * The dictionary's phones for a caption word when it has a reference: the word itself, or a
 * hyphenated word whose every part is in the dictionary. null for a word it does not know, for a
 * token that is not a word, and for shorthand read as it is meant (respell.mjs SHORTHAND).
 */
export function dictPhones(word, dict) {
  const k = soundKey(word)
  if (!/^[a-z][a-z'-]*$/.test(k) || SHORTHAND.has(k)) return null
  if (dict.has(k)) return dict.get(k)
  const parts = k.split('-').filter(Boolean)
  if (parts.length > 1 && parts.every((p) => dict.has(p))) return parts.flatMap((p) => dict.get(p))
  return null
}

/** segments → [consonant group, vowel, consonant group, vowel, …, consonant group] */
function shape(segs) {
  const groups = [[]]
  const vowels = []
  for (const s of segs) {
    if (isVowel(s)) {
      vowels.push(s)
      groups.push([])
    } else groups[groups.length - 1].push(s)
  }
  return { groups, vowels }
}

const pairSet = (pairs) => {
  const m = new Map()
  for (const [a, b] of pairs) {
    if (!m.has(a)) m.set(a, new Set())
    if (!m.has(b)) m.set(b, new Set())
    m.get(a).add(b)
    m.get(b).add(a)
  }
  return m
}

/**
 * Does `got` (a respelling's segments) keep the sounds of `plain` (the word's)? → { ok, why }.
 * `stress`: for each of the word's vowels, the forms the dictionary allows at that place (any
 * stress; a function word's strong vowel). Allowed: the same vowels in order, each the word's, one
 * of its `stress` forms, or a near-identical one (config nearVowels); between the vowels the same
 * consonants, a consonant doubled or held (repeats count once), an allophone (sameConsonant), or a
 * closure put before an affricate (lengthens). Everything else is a different sound.
 */
export function keepsSounds(plain, got, { stress = [], config = loadSoundsConfig() } = {}) {
  const near = pairSet(config.nearVowels)
  const same = pairSet(config.sameConsonant)
  const leng = new Map(config.lengthens.map(([a, b]) => [b, a]))
  const eq = (a, b) => a === b || !!same.get(a)?.has(b)
  const a = shape(plain), b = shape(got)
  if (!got.length) return { ok: false, why: 'says nothing' }
  if (a.vowels.length !== b.vowels.length) return { ok: false, why: `${a.vowels.length} vowel${a.vowels.length === 1 ? '' : 's'} → ${b.vowels.length}` }
  for (let k = 0; k < a.vowels.length; k++) {
    const want = new Set([a.vowels[k], ...(stress[k] ?? [])])
    for (const v of [...want]) for (const n of near.get(v) ?? []) want.add(n)
    if (!want.has(b.vowels[k])) return { ok: false, why: `vowel ${a.vowels[k]} → ${b.vowels[k]}` }
  }
  // consonants: repeats (a doubled or held consonant) count once; a closure before its affricate is part of it
  const squash = (g) => {
    const out = []
    for (let i = 0; i < g.length; i++) {
      const s = g[i]
      if (out.length && eq(out[out.length - 1], s)) continue
      if (leng.get(g[i + 1]) === s) continue
      out.push(s)
    }
    return out
  }
  for (let k = 0; k < a.groups.length; k++) {
    const x = squash(a.groups[k]), y = squash(b.groups[k])
    if (x.length !== y.length || x.some((s, i) => !eq(s, y[i]))) {
      const where = k === 0 ? 'before the first vowel' : k === a.groups.length - 1 ? 'after the last vowel' : `after vowel ${k}`
      return { ok: false, why: `consonants ${where}: ${x.join(' ') || '(none)'} → ${y.join(' ') || '(none)'}` }
    }
  }
  return { ok: true }
}

/** the stress forms of each of the dictionary's vowels, when they line up with the engine's */
function stressForms(phones, plain) {
  const vs = (phones ?? []).filter((p) => ARPA_VOWEL_RE.test(p)).map((p) => ARPA_VOWEL[p.replace(/\d$/, '')] ?? [])
  return vs.length === plain.filter(isVowel).length ? vs : []
}

export const ipaText = (segs) => (segs ?? []).join(' ')

/**
 * One caption word and the spelling said for it: { word, as, plain, ipa, keeps, why? }, where
 * `plain` and `ipa` are the word's and the spelling's sounds (IPA segments, space-separated) and
 * `keeps` is true or false for a dictionary word, null for a word with no reference (a guess).
 * null when the spelling is the word itself (any case).
 */
export function wordSounds(word, spelling, { ipa, dict, config = loadSoundsConfig() }) {
  const w = splitToken(String(word ?? '')).core, s = splitToken(String(spelling ?? '')).core
  if (soundKey(w) === soundKey(s)) return null
  const phones = dictPhones(w, dict)
  const got = s ? ipa(s) : []
  const plain = ipa(phones ? soundKey(w) : w)
  const out = { word: w, as: s, plain: ipaText(plain), ipa: ipaText(got) }
  if (!phones || !plain.length) return { ...out, keeps: null }
  const stress = stressForms(phones, plain)
  // a function word whose dictionary entry is its weak form: its strong vowel is a stress shift too
  const strong = config.strongVowels?.[soundKey(w)]
  if (strong && plain.filter(isVowel).length === 1) stress[0] = [...(stress[0] ?? []), ...strong]
  const r = keepsSounds(plain, got, { stress, config })
  return { ...out, keeps: r.ok, ...(r.ok ? {} : { why: r.why }) }
}

/**
 * The respelled words of a line: { aligned, words: [{ i, word, as, plain, ipa, keeps, why? }] } for
 * every token of `as` that is not the caption's word. `aligned` false (and no words) when `as` does
 * not have one token per caption word, so the words cannot be paired.
 */
export function lineSounds(text, as, opts) {
  if (as === undefined || as === null || as === text) return { aligned: true, words: [] }
  const al = alignedTokens(text, as)
  if (!al) return { aligned: false, words: [] }
  const words = []
  al.text.forEach((t, i) => {
    const r = wordSounds(t, al.spoken[i], opts)
    if (r) words.push({ i, ...r })
  })
  return { aligned: true, words }
}

/**
 * A word or short phrase and one spelling of it, word by word: { keeps, plain, ipa, why? }, where
 * keeps is false when any word's sounds change, null when no word has a reference (or the spelling
 * cannot be paired word for word), true otherwise. null when the spelling is the word itself.
 */
export function spellingSounds(word, spelling, opts) {
  const s = lineSounds(word, spelling, opts)
  if (!s.aligned) return { keeps: null, plain: '', ipa: '', why: 'not one word for each word' }
  if (!s.words.length) return null
  const bad = s.words.find((w) => w.keeps === false)
  const keeps = bad ? false : s.words.every((w) => w.keeps === null) ? null : true
  return { keeps, plain: s.words.map((w) => w.plain).join(' · '), ipa: s.words.map((w) => w.ipa).join(' · '), ...(bad ? { why: bad.why } : {}) }
}

/** a memo over an `ipa(word)` function (G2P is called once per spelling) */
export function memoIpa(fn) {
  const m = new Map()
  return (w) => {
    if (!m.has(w)) {
      let v = []
      try {
        v = fn(w) ?? []
      } catch {
        v = []
      }
      m.set(w, v)
    }
    return m.get(w)
  }
}

/**
 * The lines of a script that carry an `as`, without rendering: { id, who, kind, text, as } for every
 * say beat, sung beat and music track (lyrics or shout). `text` is what is said when there is no
 * `as` (a sung beat's lyrics; its caption may differ). Ids as the fitting tool shows them: the
 * beat's id, else `#<beat index>`; a track's id, else `#<beat>.<track>`.
 */
export function scriptLines(script) {
  const out = []
  for (const [bi, b] of (script?.beats ?? []).entries()) {
    if (!b || typeof b !== 'object') continue
    if (typeof b.say === 'string') out.push({ id: b.id ?? `#${bi}`, who: b.say, kind: 'say', text: b.text, as: b.as })
    else if (typeof b.sing === 'string') out.push({ id: b.id ?? `#${bi}`, who: b.sing, kind: 'sing', text: b.lyrics, as: b.as })
    else if (b.music && Array.isArray(b.music.tracks)) {
      b.music.tracks.forEach((tr, ti) => {
        const who = Array.isArray(tr.who) ? tr.who.join('+') : String(tr.who ?? '')
        const id = tr.id ?? `#${bi}.${ti}`
        if (typeof tr.lyrics === 'string') out.push({ id, who, kind: 'sing', text: tr.lyrics, as: tr.as })
        else if (typeof tr.shout === 'string') out.push({ id, who, kind: 'shout', text: tr.shout, as: tr.as })
      })
    }
  }
  return out.filter((l) => typeof l.text === 'string')
}

/**
 * The audit: every word of a script whose `as` spelling does not keep a dictionary word's sounds,
 * and, apart, the guesses (respelled words with no reference) and the lines whose `as` cannot be
 * paired word for word. → { lines, different: [{ id, who, word, as, plain, ipa, why }], guesses: [...], unaligned: [{ id, who }] }
 */
export function auditSounds(lines, opts) {
  const different = [], guesses = [], unaligned = []
  let withAs = 0
  for (const l of lines) {
    if (l.as === undefined || l.as === null) continue
    withAs++
    const s = lineSounds(l.text, l.as, opts)
    if (!s.aligned) unaligned.push({ id: l.id, who: l.who })
    for (const w of s.words) {
      const row = { id: l.id, who: l.who, word: w.word, as: w.as, plain: w.plain, ipa: w.ipa, ...(w.why ? { why: w.why } : {}) }
      if (w.keeps === false) different.push(row)
      // a guess: a word with no reference (a symbol said as words is not a word, and is left out)
      else if (w.keeps === null && /[\p{L}\p{N}]/u.test(w.word)) guesses.push(row)
    }
  }
  return { lines: withAs, different, guesses, unaligned }
}

/** one audit row as printed: `id (who) word → as: /plain/ → /ipa/ (why)` */
export const soundsRow = (r) => `${r.id} (${r.who}) ${r.word} → ${r.as}: /${r.plain || '?'}/ → /${r.ipa || '?'}/${r.why ? ` (${r.why})` : ''}`
