// The voice research file (data/voice-research.json): what the voices find hard to say, word by
// word, and the patterns that are not single words. One source of truth, committed; the page
// docs/voice-research.md is generated from it. The owner's ruling of 21 November 2026: best effort
// on pronunciation is sufficient, as subtitles carry the line; hard words are documented here.
//
// A word entry:
//   { word, status: works|unstable|cannot|misleads, voices: [], heard: [{ as, count? }],
//     spellings: [{ as, voices: [], heard: [{ as, count? }] }], works: [{ as, voices: [] }],
//     misleads?: [{ as, voices: [], ipa, why? }], ipa?, note, seen: ["<episode id>" | "<episode id>/<draft or segment>"] }
// `heard` is what the word as written was heard as; `spellings` what each respelling tried was
// heard as; `works` the spellings that were heard, and in which voices. `misleads` the spellings the
// transcription heard as the word but whose sounds are not the word's (sounds.mjs: the engine's G2P
// changes a vowel or a consonant, as "showw" is /ʃ aʊ w/, "shao"), with their sounds, and `ipa` the
// word's own; status `misleads` is a word whose only accepted spellings are such: the transcription
// accepts them, a listener does not, and the plain spelling stays. A guest's voice is recorded
// as "guest", never by its cast id. `seen` never names a person, a handle or a post.
// A pattern: { pattern, note, words?: [], seen: [] } (`words`: words of a line that the pattern
// covers, for the stage 8 gate's "recorded" check; never a name).
//
// Pure, Node builtins only: `node --test` loads it with nothing installed. Used by
// voice-research.mjs (the command) and fit.ts (which tries a known spelling first and stops
// searching a word known to be hard).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { norm, heardMask, missedWords, hasPhrase, BLOCKING } from './heard.mjs'
import { splitToken } from './respell.mjs'

export const RESEARCH_FILE = fileURLToPath(new URL('./data/voice-research.json', import.meta.url))
export const PAGE_FILE = fileURLToPath(new URL('../../../docs/voice-research.md', import.meta.url))
export const STATUSES = ['works', 'unstable', 'cannot', 'misleads']
/** a guest's voice, whatever its cast id (a cast id can be a handle) */
export const GUEST = 'guest'
/** where something was seen: an episode id, or an episode id and a draft or segment slug */
export const SEEN_RE = /^\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/

export const COMMENT =
  "The voice research file: words and patterns the synthesized voices find hard, from the fitting tool's fit.json and the sound editors' notes. Generated page: docs/voice-research.md (npm run voice-research -- --page). Harvest and add with npm run voice-research (packages/show/tools/README.md, 'The voice research file'). A guest's voice is 'guest'; 'seen' holds episode or draft ids only, never a person, a handle or a post."

export const emptyResearch = () => ({ $comment: COMMENT, words: [], patterns: [] })

export function loadResearch(file = RESEARCH_FILE) {
  try {
    const r = JSON.parse(readFileSync(file, 'utf8'))
    return { $comment: r.$comment ?? COMMENT, words: r.words ?? [], patterns: r.patterns ?? [] }
  } catch (e) {
    if (e.code === 'ENOENT') return emptyResearch()
    throw e
  }
}

/** a word's key: lower case, plain letters (marks dropped), curly apostrophes straightened */
export const wordKey = (w) =>
  String(w ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .trim()

/** the voice a line is recorded under: a house id, else "guest" */
export const voiceOf = (who, house) => (house.has(who) ? who : GUEST)

/** the problems with a research file, as strings (empty when it is well formed) */
export function validate(r) {
  const out = []
  const one = (s) => typeof s === 'string' && s.trim() && !s.includes('\n')
  const counts = (list, at) => {
    if (!Array.isArray(list)) return out.push(`${at}: must be a list`)
    for (const h of list) if (typeof h?.as !== 'string' || (h.count !== undefined && !(Number.isInteger(h.count) && h.count > 0))) out.push(`${at}: each is { as, count? } with a positive count`)
  }
  const seen = (list, at) => {
    if (!Array.isArray(list) || !list.length) return out.push(`${at}: "seen" lists at least one episode or draft id`)
    for (const s of list) if (!SEEN_RE.test(s)) out.push(`${at}: "seen" has "${s}"; only "<episode id>" or "<episode id>/<draft>"`)
  }
  const keys = new Set()
  for (const [i, e] of (r.words ?? []).entries()) {
    const at = `words[${i}] ${e?.word ?? '?'}`
    if (!one(e?.word) || e.word !== wordKey(e.word)) out.push(`${at}: "word" is one lower-case word or short phrase`)
    if (keys.has(e?.word)) out.push(`${at}: listed twice`)
    keys.add(e?.word)
    if (!STATUSES.includes(e?.status)) out.push(`${at}: "status" is ${STATUSES.join(', ')}`)
    if (!Array.isArray(e?.voices) || !e.voices.length) out.push(`${at}: "voices" lists the voices it was tried in`)
    counts(e?.heard, `${at} heard`)
    if (!Array.isArray(e?.spellings)) out.push(`${at}: "spellings" must be a list`)
    else for (const s of e.spellings) {
      if (!one(s?.as) || !Array.isArray(s.voices)) out.push(`${at}: each spelling is { as, voices, heard }`)
      counts(s?.heard ?? [], `${at} spelling ${s?.as}`)
    }
    if (!Array.isArray(e?.works)) out.push(`${at}: "works" must be a list (empty when nothing works)`)
    else for (const w of e.works) if (!one(w?.as) || !Array.isArray(w.voices) || !w.voices.length) out.push(`${at}: each working spelling is { as, voices }`)
    if (e?.status === 'works' && !e.works?.length) out.push(`${at}: status "works" needs a spelling in "works"`)
    if (e?.misleads !== undefined) {
      if (!Array.isArray(e.misleads)) out.push(`${at}: "misleads" must be a list`)
      else for (const m of e.misleads) if (!one(m?.as) || !Array.isArray(m.voices) || !m.voices.length || typeof m.ipa !== 'string') out.push(`${at}: each misleading spelling is { as, voices, ipa }`)
    }
    if (e?.ipa !== undefined && typeof e.ipa !== 'string') out.push(`${at}: "ipa" is the word's sounds, a string`)
    if (e?.status === 'misleads' && !e.misleads?.length) out.push(`${at}: status "misleads" needs a spelling in "misleads"`)
    if (!one(e?.note)) out.push(`${at}: "note" is one line`)
    seen(e?.seen, at)
  }
  for (const [i, p] of (r.patterns ?? []).entries()) {
    const at = `patterns[${i}]`
    if (!one(p?.pattern)) out.push(`${at}: "pattern" is one line`)
    if (!one(p?.note)) out.push(`${at}: "note" is one line`)
    if (p?.words !== undefined && !(Array.isArray(p.words) && p.words.every((w) => one(w) && w === wordKey(w)))) out.push(`${at}: "words" is a list of lower-case words`)
    seen(p?.seen, at)
  }
  return out
}

/** entries sorted for the file: words alphabetically, patterns as they were added */
export function tidy(r) {
  const words = [...r.words].sort((a, b) => a.word.localeCompare(b.word))
  return { $comment: r.$comment ?? COMMENT, words, patterns: r.patterns }
}

// ------------------------------------------------------------------ what one word was heard as

/** the caption's words (norm()ed), each with the index of the caption token it came from */
function refWords(text) {
  const out = []
  String(text).split(/\s+/).filter(Boolean).forEach((tok, i) => norm(tok).forEach((w) => out.push({ w, i })))
  return out
}

/**
 * Word-level alignment (Levenshtein, with a backtrace): for each reference word, the heard words in
 * its place. A heard word inserted between two reference words goes with the neighbour that was not
 * heard exactly (the one before first); between two words heard exactly it belongs to neither.
 */
function align(ref, hyp) {
  const n = ref.length, m = hyp.length
  const d = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)))
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (ref[i - 1] === hyp[j - 1] ? 0 : 1))
  const got = Array.from({ length: n }, () => [])
  const exact = Array(n).fill(false)
  const inserted = [] // [gap, word]: gap g is between reference words g-1 and g
  let i = n, j = m
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (ref[i - 1] === hyp[j - 1] ? 0 : 1)) {
      got[i - 1].unshift(hyp[j - 1])
      exact[i - 1] = ref[i - 1] === hyp[j - 1]
      i--, j--
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) i--
    else {
      inserted.unshift([i, hyp[j - 1]])
      j--
    }
  }
  // inserted words, in order, onto the neighbour that was missed
  const before = Array.from({ length: n }, () => [])
  for (const [g, w] of inserted) {
    if (g - 1 >= 0 && !exact[g - 1]) got[g - 1].push(w)
    else if (g < n && !exact[g]) before[g].push(w)
  }
  return got.map((x, k) => [...before[k], ...x])
}

/**
 * What caption token `index` of `text` was heard as in `heard`: { heard: true } when every one of
 * its words was heard (as the hearing gate counts it), else { heard: false, as: "<the heard words
 * in its place>" } ("" when nothing was heard there).
 */
export function tokenHeard(text, heard, index) {
  const ref = refWords(text)
  const mine = ref.map((r, k) => (r.i === index ? k : -1)).filter((k) => k >= 0)
  if (!mine.length) return { heard: false, as: '' }
  const mask = heardMask(text, heard)
  if (mine.every((k) => mask[k])) return { heard: true, as: mine.map((k) => ref[k].w).join(' ') }
  const got = align(ref.map((r) => r.w), norm(heard))
  return { heard: false, as: mine.flatMap((k) => got[k]).join(' ') }
}

/** the index of the caption token holding `word` (a word or short phrase: its first token), or -1 */
export function tokenOf(text, word) {
  const want = norm(word)
  const ref = refWords(text)
  for (let k = 0; k + want.length <= ref.length; k++) if (want.every((w, j) => ref[k + j].w === w)) return ref[k].i
  return -1
}

/** add counts: [{ as, count }] + [{ as, count }] */
function addCounts(into, more) {
  const out = into.map((h) => ({ ...h }))
  for (const h of more) {
    const x = out.find((y) => y.as === h.as)
    if (x) x.count = (x.count ?? 0) + (h.count ?? 1)
    else out.push({ as: h.as, ...(h.count ? { count: h.count } : {}) })
  }
  return out.sort((a, b) => (b.count ?? 0) - (a.count ?? 0) || a.as.localeCompare(b.as))
}

/** what token `index` was heard as across heard texts [{ text, count }]: { counts: [{ as, count }], every, some } */
function heardAcross(text, heards, index) {
  let all = 0, yes = 0
  const counts = []
  for (const h of heards ?? []) {
    const c = h.count ?? 1
    const t = tokenHeard(text, h.text, index)
    all += c
    if (t.heard) yes += c
    const as = t.heard ? t.as : t.as || '(lost)'
    const x = counts.find((y) => y.as === as)
    if (x) x.count += c
    else counts.push({ as, count: c })
  }
  return { counts: counts.sort((a, b) => b.count - a.count || a.as.localeCompare(b.as)), every: all > 0 && yes === all, some: yes > 0 }
}

const tokens = (s) => String(s ?? '').split(/\s+/).filter(Boolean)
const core = (tok) => splitToken(tok ?? '').core
/** a caption token that is a word (letters, apostrophes, hyphens), lower case; null otherwise */
const wordAt = (text, i) => {
  const c = wordKey(core(tokens(text)[i]))
  return /^[a-z][a-z'-]*$/.test(c) ? c : null
}
/** is this word part of a real person's name or handle (names as realNames gives them) */
const isName = (word, names) => {
  const w = wordKey(word).replace(/['-]/g, '')
  return names.some((n) => {
    const parts = wordKey(n).split(/[\s.@_-]+/).filter(Boolean)
    return parts.includes(w) || parts.join('') === w
  })
}

// ------------------------------------------------------------------ harvest

export const HARD = ['weak', 'flagged', 'unsayable']

/**
 * What a fit.json says about single words, attributable to a word and nothing else:
 * - works: a caption word respelled in the chosen `as` and heard in every take, with what it was
 *   heard as, and the other spellings of that word the tool tried (with what each was heard as,
 *   when fit.json records it);
 * - listed: every line still weak, flagged or unsayable, with its heard texts and missed words, for
 *   the sound editor to record by hand (`--add`).
 * A word that is part of a real person's name or handle is never harvested (`names`).
 * → { works: [{ word, as, voice, line, heard, spellings, asWritten }], listed: [line], skipped: [{ word, why }] }
 */
export function harvest(fit, { house, names = [] }) {
  const works = []
  const listed = []
  const skipped = []
  for (const l of fit?.lines ?? []) {
    const voice = voiceOf(l.who, house)
    const text = l.text ?? ''
    const said = tokens(l.as ?? text)
    if (said.length === tokens(text).length && l.status !== 'unsayable') {
      said.forEach((tok, i) => {
        const word = wordAt(text, i)
        const as = core(tok).toLowerCase()
        if (!word || !as || wordKey(as) === word) return
        if (isName(word, names)) return skipped.push({ word: '(a name)', why: `line ${l.id}: a real name is not recorded` })
        const h = heardAcross(text, l.heard, i)
        if (!h.every) {
          if (h.some) skipped.push({ word, why: `line ${l.id}: "${as}" heard in some takes, not all: record it with --add if it matters` })
          return
        }
        // the other spellings of this word the tool tried, and the word as written
        const spellings = []
        let asWritten = []
        for (const t of l.tried ?? []) {
          const tt = tokens(t.as)
          if (tt.length !== said.length || !t.heard) continue
          const sp = core(tt[i]).toLowerCase()
          const hh = heardAcross(text, t.heard, i).counts
          if (wordKey(sp) === word) asWritten = addCounts(asWritten, hh)
          else if (sp !== as) {
            const x = spellings.find((s) => s.as === sp)
            if (x) x.heard = addCounts(x.heard, hh)
            else spellings.push({ as: sp, heard: hh })
          }
        }
        // fit.json's sounds check: a spelling heard as the word whose sounds are not the word's misleads
        const snd = (l.sounds ?? []).find((s) => s.i === i)
        const misleading = snd?.keeps === false ? { keeps: false, plain: snd.plain, ipa: snd.ipa, ...(snd.why ? { why: snd.why } : {}) } : {}
        works.push({ word, as, voice, line: l.id, heard: h.counts, spellings, asWritten, ...misleading })
      })
    }
    if (HARD.includes(l.status)) {
      const missed = new Map()
      for (const h of l.heard ?? []) for (const w of missedWords(text, h.text)) missed.set(w, (missed.get(w) ?? 0) + (h.count ?? 1))
      listed.push({ id: l.id, who: l.who, voice, status: l.status, flags: l.flags ?? [], text, as: l.as ?? null, heard: l.heard ?? [], missed: [...missed].map(([word, count]) => ({ word, count })).filter((m) => !isName(m.word, names)) })
    }
  }
  return { works, listed, skipped }
}

const union = (a = [], b = []) => [...new Set([...a, ...b])]

/**
 * Merge harvested working spellings into the research file, for one source ("<ep>/<draft>").
 * A new word goes in as `works`. A word already recorded keeps its status (a `cannot` that
 * worked once in one voice is for the sound editor to judge) and gains the spelling and voice.
 * Counts from a source already in an entry's `seen` are not added again, so a harvest can be re-run.
 * → { research, added: [word], updated: [word], unchanged: [word] }
 */
export function mergeWorks(research, works, { source }) {
  const r = { ...research, words: research.words.map((e) => structuredClone(e)) }
  const added = [], updated = [], unchanged = []
  // counts are added once per source: a word already seen in this source before this harvest is not counted again
  const seenBefore = new Map(research.words.map((e) => [e.word, new Set(e.seen ?? [])]))
  for (const w of works) {
    const misleading = w.keeps === false
    let e = r.words.find((x) => x.word === w.word)
    if (!e) {
      e = misleading
        ? { word: w.word, status: 'misleads', voices: [], heard: [], spellings: [], works: [], note: `"${w.as}" heard as the word in every take, but its sounds are not the word's (harvested from fit.json).`, seen: [] }
        : { word: w.word, status: 'works', voices: [], heard: [], spellings: [], works: [], note: `"${w.as}" heard in every take (harvested from fit.json).`, seen: [] }
      r.words.push(e)
      added.push(w.word)
    }
    const fresh = !seenBefore.get(w.word)?.has(source)
    const before = JSON.stringify(e)
    e.voices = union(e.voices, [w.voice])
    if (misleading) {
      // the transcription accepts it, a listener does not: kept apart from the working spellings
      e.misleads ??= []
      if (w.plain) e.ipa = w.plain
      const m = e.misleads.find((x) => x.as === w.as)
      if (m) m.voices = union(m.voices, [w.voice])
      else e.misleads.push({ as: w.as, voices: [w.voice], ipa: w.ipa ?? '', ...(w.why ? { why: w.why } : {}) })
    } else {
      const wk = e.works.find((x) => x.as === w.as)
      if (wk) wk.voices = union(wk.voices, [w.voice])
      else e.works.push({ as: w.as, voices: [w.voice] })
    }
    const sp = (as, heard) => {
      let s = e.spellings.find((x) => x.as === as)
      if (!s) e.spellings.push((s = { as, voices: [], heard: [] }))
      s.voices = union(s.voices, [w.voice])
      if (fresh) s.heard = addCounts(s.heard, heard)
    }
    sp(w.as, w.heard)
    for (const s of w.spellings) sp(s.as, s.heard)
    if (fresh) e.heard = addCounts(e.heard, w.asWritten)
    e.seen = union(e.seen, [source])
    if (!added.includes(w.word)) (JSON.stringify(e) === before ? unchanged : updated).push(w.word)
  }
  return { research: tidy(r), added: [...new Set(added)], updated: [...new Set(updated)], unchanged: [...new Set(unchanged)] }
}

/**
 * Record one hard word by hand, from one line of a fit.json: the sound editor's `--add`. The word
 * must be in the line's caption (nothing is recorded that cannot be attributed to a word) and not
 * part of a real name. What it was heard as comes from the line's heard texts (as said in the chosen
 * `as`) and, when fit.json records them, the heard texts of every spelling tried.
 * → { research, entry } or throws an Error with the reason.
 */
export function addWord(research, { fit, lineId, word, status, as = null, note, source, house, names = [] }) {
  const l = (fit?.lines ?? []).find((x) => x.id === lineId)
  if (!l) throw new Error(`no line ${lineId} in fit.json (lines: ${(fit?.lines ?? []).map((x) => x.id).join(', ')})`)
  const w = wordKey(word)
  if (!STATUSES.includes(status)) throw new Error(`--status is ${STATUSES.join(', ')}`)
  if (!String(note ?? '').trim() || String(note).includes('\n')) throw new Error('--note is one line: what the voice does with the word')
  if (status === 'works' && !as) throw new Error('--status works needs --as <the spelling that works>')
  if (status === 'misleads' && !as) throw new Error('--status misleads needs --as <the spelling the transcription accepts and a listener does not>')
  if (isName(w, names)) throw new Error(`"${word}" is part of a real person's name or handle: names are not recorded here (the caption carries them)`)
  const i = tokenOf(l.text, w)
  if (i < 0) throw new Error(`"${word}" is not in the caption of ${lineId}: "${l.text}"`)
  const voice = voiceOf(l.who, house)
  const text = l.text
  const n = tokens(text).length
  const r = { ...research, words: research.words.map((e) => structuredClone(e)) }
  let e = r.words.find((x) => x.word === w)
  if (!e) r.words.push((e = { word: w, status, voices: [], heard: [], spellings: [], works: [], note: String(note).trim(), seen: [] }))
  const fresh = !e.seen.includes(source)
  e.status = status
  e.note = String(note).trim()
  e.voices = union(e.voices, [voice])
  const record = (said, heards) => {
    const toks = tokens(said)
    if (toks.length !== n || !heards?.length) return
    const sp = core(toks[i])
    const counts = heardAcross(text, heards, i).counts
    if (wordKey(sp) === w) {
      if (fresh) e.heard = addCounts(e.heard, counts)
      return
    }
    let s = e.spellings.find((x) => x.as === sp)
    if (!s) e.spellings.push((s = { as: sp, voices: [], heard: [] }))
    s.voices = union(s.voices, [voice])
    if (fresh) s.heard = addCounts(s.heard, counts)
  }
  if (fresh) {
    record(l.as ?? text, l.heard)
    const chosen = l.as ?? text
    for (const t of l.tried ?? []) if (t.as !== chosen) record(t.as, t.heard)
  }
  if (as && status === 'misleads') {
    // its sounds are filled in by the sounds check (npm run voice-research -- --sounds)
    e.misleads ??= []
    e.works = e.works.filter((x) => x.as !== as)
    const m = e.misleads.find((x) => x.as === as)
    if (m) m.voices = union(m.voices, [voice])
    else e.misleads.push({ as, voices: [voice], ipa: '' })
  } else if (as) {
    const wk = e.works.find((x) => x.as === as)
    if (wk) wk.voices = union(wk.voices, [voice])
    else e.works.push({ as, voices: [voice] })
  }
  e.seen = union(e.seen, [source])
  return { research: tidy(r), entry: e }
}

/** record a pattern that is not one word (a one-word line; a word beginning "cl"): the sound editor's `--pattern` */
export function addPattern(research, { pattern, note, words = [], source, names = [] }) {
  if (!String(pattern ?? '').trim() || String(pattern).includes('\n')) throw new Error('--pattern is one line')
  if (!String(note ?? '').trim() || String(note).includes('\n')) throw new Error('--note is one line')
  const ws = words.map(wordKey).filter(Boolean)
  for (const w of ws) if (isName(w, names)) throw new Error(`"${w}" is part of a real person's name or handle: names are not recorded here`)
  const r = { ...research, patterns: research.patterns.map((p) => structuredClone(p)) }
  let p = r.patterns.find((x) => x.pattern === String(pattern).trim())
  if (!p) r.patterns.push((p = { pattern: String(pattern).trim(), note: String(note).trim(), seen: [] }))
  p.note = String(note).trim()
  if (ws.length) p.words = union(p.words, ws)
  p.seen = union(p.seen, [source])
  return { research: tidy(r), entry: p }
}

// ------------------------------------------------------------------ the gate's view

/**
 * The lines of a fit that are hard and must be recorded: unsayable, or flagged for something other
 * than a blocking word (alarming, out of bounds, crude) or a real name alone. A line whose only
 * missed words are a real name's needs no entry: names are not recorded, the caption carries them.
 * Mirrored by packages/writers-room/src/studio.mjs (the stage 8 gate), which cannot import this.
 */
export function hardLines(fit) {
  return (fit?.lines ?? []).filter((l) => {
    const flags = l.flags ?? []
    if (flags.some((f) => BLOCKING.some((k) => f.startsWith(`${k}:`)))) return false
    if (l.status === 'unsayable') {
      if (!Array.isArray(l.missed)) return true
      const nameWords = new Set(flags.filter((f) => f.startsWith('name: ')).flatMap((f) => norm(f.slice(6))))
      return l.missed.some((m) => !nameWords.has(m.word ?? m))
    }
    return l.status === 'flagged' && flags.some((f) => !f.startsWith('name: '))
  })
}

/**
 * Is this line recorded: a hard word (`cannot` or `unstable`) or a pattern seen in `source` covers a
 * word of its caption. A word recorded only as `works` does not: that is not why the line is hard.
 */
export function isRecorded(research, line, source) {
  const at = (e) => (e.seen ?? []).includes(source)
  if (research.words.some((e) => at(e) && e.status !== 'works' && hasPhrase(line.text, e.word))) return true
  return research.patterns.some((p) => at(p) && (p.words ?? []).some((w) => hasPhrase(line.text, w)))
}

// ------------------------------------------------------------------ what fit.ts reads

/**
 * What the fitting tool takes from the file for one voice (a house id, or "guest"):
 * - first: { word: [spellings] } that work in this voice, to try before anything else;
 * - hard: { word: [spellings] } for words marked `cannot` with no spelling working in this voice:
 *   only these known tries are heard again (none recorded: searched as usual), and the line says
 *   "known hard word";
 * - avoid: { word: [spellings] } the transcription accepted but whose sounds are not the word's
 *   (`misleads`, in any voice): never offered again, first or otherwise.
 */
export function knownFor(research, voice) {
  const first = {}
  const hard = {}
  const avoid = {}
  for (const e of research?.words ?? []) {
    const never = (e.misleads ?? []).map((m) => m.as)
    if (never.length) avoid[e.word] = never
    const mine = (e.works ?? []).filter((w) => w.voices.includes(voice) && !never.includes(w.as)).map((w) => w.as)
    if (mine.length) first[e.word] = mine
    else if (e.status === 'cannot') hard[e.word] = (e.spellings ?? []).map((s) => s.as).filter((s) => !never.includes(s)).slice(0, 4)
  }
  return { first, hard, avoid }
}

/**
 * The sounds check over the file (sounds.ts --research): every working spelling whose sounds are not
 * the word's (`check(word, spelling)` → { keeps, plain, ipa, why? } | null, from sounds.mjs) moves
 * from `works` to `misleads`, with its sounds and the word's; its evidence (`spellings`, `heard`)
 * stays. A `works` entry left with no working spelling becomes `misleads`; any other status is kept.
 * A misleading spelling already recorded gets its sounds filled in when they are missing. Running it
 * twice changes nothing the second time.
 * → { research, changed: [{ word, from, to, moved: [spelling] }] }
 */
export function markMisleading(research, check) {
  const r = { ...research, words: research.words.map((e) => structuredClone(e)) }
  const changed = []
  for (const e of r.words) {
    const before = JSON.stringify(e)
    const from = e.status
    const moved = []
    const mark = (as, voices) => {
      const c = check(e.word, as)
      if (c?.keeps !== false) return false
      e.misleads ??= []
      if (c.plain) e.ipa = c.plain
      const m = e.misleads.find((x) => x.as === as)
      if (m) m.voices = union(m.voices, voices)
      else e.misleads.push({ as, voices, ipa: c.ipa, ...(c.why ? { why: c.why } : {}) })
      moved.push(as)
      return true
    }
    e.works = (e.works ?? []).filter((w) => !mark(w.as, w.voices))
    for (const m of e.misleads ?? []) {
      if (m.ipa && e.ipa) continue
      const c = check(e.word, m.as)
      if (c?.ipa && !m.ipa) m.ipa = c.ipa
      if (c?.plain && !e.ipa) e.ipa = c.plain
    }
    if (e.status === 'works' && !e.works.length && e.misleads?.length) e.status = 'misleads'
    if (JSON.stringify(e) !== before) changed.push({ word: e.word, from, to: e.status, moved })
  }
  return { research: tidy(r), changed }
}

// ------------------------------------------------------------------ the page

const md = (s) => String(s ?? '').replace(/\|/g, '\\|')
const heardList = (list, n = 4) => (list ?? []).slice(0, n).map((h) => `"${md(h.as)}"${h.count ? ` ×${h.count}` : ''}`).join(', ') || '(not recorded)'
const spelled = (e) => (e.spellings ?? []).filter((s) => !(e.works ?? []).some((w) => w.as === s.as) && !(e.misleads ?? []).some((m) => m.as === s.as)).slice(0, 4).map((s) => `\`${md(s.as)}\` → ${s.heard?.length ? heardList(s.heard, 2) : '?'}`).join('; ') || '—'

/** docs/voice-research.md, generated from the file: what cannot be said, what is unstable, patterns, spellings that work */
export function renderPage(research) {
  const words = [...(research.words ?? [])].sort((a, b) => a.word.localeCompare(b.word))
  const by = (s) => words.filter((e) => e.status === s)
  const L = [
    '# Voice research: words the voices find hard',
    '',
    '<!-- Generated from packages/show/tools/data/voice-research.json by `npm run voice-research -- --page`. Do not edit by hand. -->',
    '',
    "What the show's synthesized voices are heard saying, word by word, as the fitting tool's",
    'transcription hears them. It is for a writer to scan in a minute before writing a line, and for',
    'a sound editor to start from a spelling that has worked before.',
    '',
    "**The owner's ruling (21 November 2026): best effort on pronunciation is sufficient, as subtitles",
    'carry the line.** A writer may still use a hard word. Captions are on by default and follow every',
    'line with the current word lit, so a viewer always reads the exact words. Nothing here is a reason',
    'to cut a line, and a real person\'s words are never changed to suit the voice.',
    '',
    'Voices are the house cast\'s ids; "guest" is any guest\'s voice. Spellings go in a line\'s `as`',
    'field, never in its `text`.',
    '',
  ]
  const table = (rows) => {
    L.push('| word | voices | heard as | spellings tried | note |', '|---|---|---|---|---|')
    for (const e of rows) L.push(`| **${md(e.word)}** | ${e.voices.join(', ')} | ${heardList(e.heard)} | ${spelled(e)} | ${md(e.note)} |`)
    L.push('')
  }
  L.push('## Cannot be said', '', 'No spelling tried was heard as the word.', '')
  if (by('cannot').length) table(by('cannot'))
  else L.push('Nothing recorded yet.', '')
  L.push('## Unstable', '', 'Heard in some takes or some lines, not others.', '')
  if (by('unstable').length) table(by('unstable'))
  else L.push('Nothing recorded yet.', '')
  L.push('## Patterns', '', 'Not single words.', '')
  if ((research.patterns ?? []).length) {
    L.push('| pattern | note |', '|---|---|')
    for (const p of research.patterns) L.push(`| ${md(p.pattern)} | ${md(p.note)} |`)
    L.push('')
  } else L.push('Nothing recorded yet.', '')
  L.push('## Spellings that work', '', 'Heard as the word, in these voices. Words above may have one too, in some voice.', '')
  const working = words.filter((e) => (e.works ?? []).length)
  if (working.length) {
    L.push('| word | `as` | voices | note |', '|---|---|---|---|')
    for (const e of working) for (const w of e.works) L.push(`| ${md(e.word)}${e.status !== 'works' ? ` (${e.status})` : ''} | \`${md(w.as)}\` | ${w.voices.join(', ')} | ${md(e.note)} |`)
    L.push('')
  } else L.push('Nothing recorded yet.', '')
  L.push(
    '## Heard by the transcription, not by a listener',
    '',
    "The transcription wrote the word for these spellings, but the engine says them with other sounds",
    "(its own phonemes, IPA): a listener hears another word. They are not working spellings, the",
    'fitting tool never tries them, and the plain spelling stays. Marked `misleads` when no other',
    'spelling works.',
    '',
  )
  const misleading = words.filter((e) => (e.misleads ?? []).length)
  if (misleading.length) {
    L.push("| word | the word's sounds | `as` | its sounds | voices | note |", '|---|---|---|---|---|---|')
    for (const e of misleading) for (const m of e.misleads) L.push(`| ${md(e.word)}${e.status !== 'misleads' ? ` (${e.status})` : ''} | /${md(e.ipa ?? '?')}/ | \`${md(m.as)}\` | /${md(m.ipa || '?')}/ | ${m.voices.join(', ')} | ${md(e.note)} |`)
    L.push('')
  } else L.push('Nothing recorded yet.', '')
  return L.join('\n')
}
