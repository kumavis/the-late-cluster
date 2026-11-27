// Reading episode source text without running it: a small JavaScript lexer (strings, comments,
// code), the guest-line locator for source comments (rule R3), the verbatim matcher, and the
// handle and URL finder (rule R8).

/**
 * Split JavaScript source into tokens: { kind: 'string' | 'comment' | 'template', value, start, end, line }.
 * Code between them is not returned; `masked` is the source with strings and comments blanked out
 * (same length, newlines kept), for brace matching and key search.
 */
export function lex(src) {
  const tokens = []
  const masked = src.split('')
  let i = 0
  let line = 1
  let lastCode = '' // the last significant code character, to tell a regex from a division
  const blank = (a, b) => {
    for (let k = a; k < b; k++) if (masked[k] !== '\n') masked[k] = ' '
  }
  while (i < src.length) {
    const c = src[i]
    const n = src[i + 1]
    if (c === '\n') {
      line++
      i++
      continue
    }
    if (c === '/' && n === '/') {
      const end = src.indexOf('\n', i) < 0 ? src.length : src.indexOf('\n', i)
      tokens.push({ kind: 'comment', value: src.slice(i + 2, end), start: i, end, line })
      blank(i, end)
      i = end
      continue
    }
    if (c === '/' && n === '*') {
      const close = src.indexOf('*/', i + 2)
      const end = close < 0 ? src.length : close + 2
      const value = src.slice(i + 2, close < 0 ? src.length : close)
      tokens.push({ kind: 'comment', value, start: i, end, line })
      blank(i, end)
      line += (value.match(/\n/g) ?? []).length
      i = end
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1
      let value = ''
      const startLine = line
      while (j < src.length && src[j] !== c) {
        if (src[j] === '\\' && j + 1 < src.length) {
          const e = src[j + 1]
          value += e === 'n' ? '\n' : e === 't' ? '\t' : e === 'u' && /^[0-9a-fA-F]{4}$/.test(src.slice(j + 2, j + 6)) ? String.fromCharCode(parseInt(src.slice(j + 2, j + 6), 16)) : e
          j += e === 'u' && /^[0-9a-fA-F]{4}$/.test(src.slice(j + 2, j + 6)) ? 6 : 2
          continue
        }
        if (src[j] === '\n') line++
        value += src[j]
        j++
      }
      const end = Math.min(src.length, j + 1)
      tokens.push({ kind: c === '`' ? 'template' : 'string', value, start: i, end, line: startLine })
      blank(i, end)
      i = end
      lastCode = 'x'
      continue
    }
    if (c === '/' && (lastCode === '' || '(,=:[!&|?{};+-*%<>~^'.includes(lastCode))) {
      // a regex literal: skip to its closing slash (respecting classes and escapes)
      let j = i + 1
      let inClass = false
      while (j < src.length && src[j] !== '\n') {
        if (src[j] === '\\') {
          j += 2
          continue
        }
        if (src[j] === '[') inClass = true
        else if (src[j] === ']') inClass = false
        else if (src[j] === '/' && !inClass) break
        j++
      }
      j++
      while (j < src.length && /[a-z]/i.test(src[j])) j++
      blank(i, j)
      i = j
      lastCode = 'x'
      continue
    }
    if (!/\s/.test(c)) lastCode = c
    i++
  }
  return { tokens, masked: masked.join('') }
}

const lineOf = (src, index) => src.slice(0, index).split('\n').length

/** the index of the `{` that encloses `at` in masked code, and its matching `}` */
export function enclosingObject(masked, at) {
  let depth = 0
  let open = -1
  for (let k = at; k >= 0; k--) {
    const ch = masked[k]
    if (ch === '}') depth++
    else if (ch === '{') {
      if (depth === 0) {
        open = k
        break
      }
      depth--
    }
  }
  if (open < 0) return null
  depth = 0
  for (let k = open; k < masked.length; k++) {
    if (masked[k] === '{') depth++
    else if (masked[k] === '}' && --depth === 0) return { open, close: k }
  }
  return null
}

/** the first string token right after `key:` inside [a, b] (null if the value is not a literal) */
function literalAfterKey(masked, tokens, a, b, key, src) {
  const re = new RegExp(`(^|[\\s,{])${key}\\s*:`, 'g')
  re.lastIndex = a
  let m
  while ((m = re.exec(masked)) && m.index < b) {
    // only keys at the object's own level
    const own = enclosingObject(masked, m.index + m[0].length - 1)
    if (!own || own.open !== a) continue
    let at = m.index + m[0].length
    while (at < src.length && /\s/.test(src[at])) at++
    const tok = tokens.find((t) => t.start === at && (t.kind === 'string' || t.kind === 'template'))
    return tok ? { value: tok.value, literal: tok.kind === 'string' || !tok.value.includes('${') } : { value: null, literal: false }
  }
  return null
}

/**
 * Every line beat in a script.js source: { who: [ids], kind, id, text, line, comments: [text], literal }.
 * `kind` is say | sing | lyrics (a music track) | shout. Comments are those inside the beat object,
 * trailing its closing line, and the run of whole-line comments directly above it.
 */
export function scriptLines(src) {
  const { tokens, masked } = lex(src)
  const out = []
  const seen = new Set()
  const re = /(^|[\s,{])(say|sing|who)\s*:/g
  let m
  while ((m = re.exec(masked))) {
    const keyAt = m.index + m[1].length
    const obj = enclosingObject(masked, keyAt)
    if (!obj || seen.has(obj.open)) continue
    let valueAt = m.index + m[0].length
    while (valueAt < src.length && /\s/.test(src[valueAt])) valueAt++
    let who = []
    const tok = tokens.find((t) => t.start === valueAt && t.kind === 'string')
    if (tok) who = [tok.value]
    else if (masked[valueAt] === '[') {
      const close = masked.indexOf(']', valueAt)
      who = tokens.filter((t) => t.kind === 'string' && t.start > valueAt && t.start < close).map((t) => t.value)
    } else continue
    const key = m[2]
    let kind = key
    let text = null
    if (key === 'say') text = literalAfterKey(masked, tokens, obj.open, obj.close, 'text', src)
    else if (key === 'sing') text = literalAfterKey(masked, tokens, obj.open, obj.close, 'text', src) ?? literalAfterKey(masked, tokens, obj.open, obj.close, 'lyrics', src)
    else {
      const lyr = literalAfterKey(masked, tokens, obj.open, obj.close, 'lyrics', src)
      const sh = literalAfterKey(masked, tokens, obj.open, obj.close, 'shout', src)
      if (lyr) (kind = 'lyrics'), (text = lyr)
      else if (sh) (kind = 'shout'), (text = sh)
      else continue // a beatbox track: no words
    }
    seen.add(obj.open)
    const startLine = lineOf(src, obj.open)
    const endLine = lineOf(src, obj.close)
    const comments = tokens.filter((t) => t.kind === 'comment' && ((t.start > obj.open && t.start < obj.close) || (t.line === endLine && t.start > obj.close))).map((t) => t.value.trim())
    // whole-line comments directly above the beat
    const lines = src.split('\n')
    const above = []
    for (let L = startLine - 1; L >= 1; L--) {
      const s = lines[L - 1].trim()
      if (s.startsWith('//')) above.unshift(s.slice(2).trim())
      else break
    }
    const idTok = literalAfterKey(masked, tokens, obj.open, obj.close, 'id', src)
    const asTok = literalAfterKey(masked, tokens, obj.open, obj.close, 'as', src)
    out.push({ who, kind, id: idTok?.value ?? null, text: text?.value ?? null, as: asTok?.value ?? null, literal: text ? text.literal : false, line: startLine, comments: [...above, ...comments] })
  }
  return out.sort((a, b) => a.line - b.line)
}

/**
 * A source comment of the kinds rule R3 defines, or null:
 *   // verbatim: at://did/app.bsky.feed.post/rkey   (or a bsky.app post URL)
 *   // interview: at://…      (an answer to the show's account: a proposal, nothing produces these yet)
 *   // catchphrase            (optionally: // catchphrase: "claim.")
 *   // pastiche of "concept:"
 *   // invented               (a fictional guest on .example only)
 */
export function sourceTag(comments) {
  const tag = baseTag(comments)
  // bible 09, R3: a tag may carry its context, `· context: at://…` (the post it answered, the root of
  // its thread, or for a catchphrase a post where the author uses it that way)
  const ctx = /\bcontext\s*:\s*(at:\/\/[^\s·;|]+|https?:\/\/bsky\.app\/[^\s·;|]+)/i.exec(comments.join(' '))
  if (tag && ctx) tag.context = ctx[1].replace(/[.,)]+$/, '')
  return tag
}

function baseTag(comments) {
  for (const c of comments) {
    for (const part of c.split(/\s*[·;|]\s*|\s{2,}/)) {
      let m
      if ((m = /^(verbatim|interview)\s*:?\s*(at:\/\/\S+|https?:\/\/\S+)/i.exec(part))) return { kind: m[1].toLowerCase(), ref: m[2].replace(/[.,)]+$/, '') }
      if (/^catchphrase\b/i.test(part)) return { kind: 'catchphrase', phrase: /^catchphrase\s*:?\s*["“](.+?)["”]/i.exec(part)?.[1] ?? null }
      if ((m = /^pastiche of\s+["“](.+?)["”]/i.exec(part))) return { kind: 'pastiche', format: m[1] }
      if (/^invented\b/i.test(part)) return { kind: 'invented' }
    }
  }
  // also accept the tag anywhere in a comment, as the bible writes it inline
  const all = comments.join(' ')
  let m
  if ((m = /(verbatim|interview)\s*:\s*(at:\/\/[^\s·;|]+|https?:\/\/bsky\.app\/[^\s·;|]+)/i.exec(all))) return { kind: m[1].toLowerCase(), ref: m[2].replace(/[.,)]+$/, '') }
  if (/\bcatchphrase\b/i.test(all)) return { kind: 'catchphrase', phrase: /catchphrase\s*:?\s*["“](.+?)["”]/i.exec(all)?.[1] ?? null }
  if ((m = /pastiche of\s+["“](.+?)["”]/i.exec(all))) return { kind: 'pastiche', format: m[1] }
  return null
}

export const ELLIPSIS = '…'
const ws = (s) => String(s).replace(/\s+/g, ' ').trim()

/**
 * Verbatim, with minimal normalisation: runs of whitespace (spaces, newlines) count as one space,
 * and leading/trailing whitespace is ignored. Nothing else: case, punctuation, quotes, emoji and
 * links must match. A cut is marked with the ellipsis character … (U+2026), and only that: the
 * pieces between cuts must appear in the post in order, a caption that does not start with … must
 * start where the post starts, and one that does not end with … must end where the post ends. An
 * ellipsis must stand for at least one cut word (trial 002: an ellipsis where nothing was cut).
 * Returns null when it matches, else a short reason.
 */
export function verbatimMismatch(caption, post) {
  const c = ws(caption)
  const p = ws(post)
  if (!c) return 'the caption is empty'
  if (!c.includes(ELLIPSIS)) return c === p ? null : firstDifference(c, p)
  const pieces = c.split(ELLIPSIS).map((x) => x.trim())
  const cutSomething = (from, to) => /[\p{L}\p{N}]/u.test(p.slice(from, to))
  let at = 0
  for (let k = 0; k < pieces.length; k++) {
    const piece = pieces[k]
    if (!piece) continue
    const found = p.indexOf(piece, at)
    if (found < 0) return `"${piece}" is not in the post${k ? ' after the previous piece' : ''}`
    if (k === 0 && found !== 0) return `the caption starts mid-post; mark the cut with … at the start`
    if (k > 0 && !cutSomething(at, found)) return `an ellipsis before "${piece.slice(0, 20)}" where nothing was cut`
    if (k === pieces.length - 1 && found + piece.length !== p.length) return `the caption stops before the post ends; mark the cut with … at the end`
    at = found + piece.length
  }
  if (!pieces.at(-1) && !cutSomething(at, p.length)) return 'an ellipsis at the end where nothing was cut'
  return null
}

function firstDifference(c, p) {
  let k = 0
  while (k < c.length && k < p.length && c[k] === p[k]) k++
  const show = (s) => JSON.stringify(s.slice(Math.max(0, k - 12), k + 18))
  return k === c.length && k < p.length ? `the caption stops before the post ends (post continues ${show(p)}); mark the cut with …` : `differs from the post at character ${k + 1}: caption ${show(c)} vs post ${show(p)}`
}

// ---- handles and URLs (rule R8)

const FILE_EXT = new Set('js mjs cjs ts json md mp3 bin png jpg jpeg gif webp svg html css txt wav csv yml yaml sh lock map'.split(' '))
// top-level domains a handle or link is likely to use; any two-letter label also counts (ccTLDs)
const TLDS = new Set(
  'com net org io ai app dev xyz me co social wiki website cat tv fm gg sh so is to ly us uk ca de fr jp nz au eu info biz online site tech blog page link space world club live zone fun lol art design studio cloud email systems network one top pub moe ink run computer software codes engineering cafe garden quest rocks ninja guru party pizza wtf gay lgbt cool games game land city town place day life love news press media works tools today chat bot bio bike band team ooo pink red blue black'.split(' '),
)

/**
 * Handles and links in text: [{ kind: 'url' | 'handle' | 'domain', value, host }]. Only tokens that
 * look like real names: a URL, an @handle with a dot, or a bare name ending in a likely TLD.
 */
export function namesIn(text) {
  const out = []
  const s = String(text)
  const taken = []
  for (const m of s.matchAll(/\b(?:https?|wss?):\/\/[^\s'"`<>)\]}]+/gi)) {
    let host = ''
    try {
      host = new URL(m[0]).hostname.toLowerCase()
    } catch {}
    out.push({ kind: 'url', value: m[0].replace(/[.,;:!?]+$/, ''), host })
    taken.push([m.index, m.index + m[0].length])
  }
  for (const m of s.matchAll(/at:\/\/[^\s'"`<>)\]}]+/gi)) taken.push([m.index, m.index + m[0].length])
  const inTaken = (i) => taken.some(([a, b]) => i >= a && i < b)
  for (const m of s.matchAll(/(?<![\w@.\/-])@([a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+)/gi)) {
    if (inTaken(m.index)) continue
    out.push({ kind: 'handle', value: m[1].toLowerCase(), host: m[1].toLowerCase() })
    taken.push([m.index, m.index + m[0].length])
  }
  for (const m of s.matchAll(/(?<![\w@.\/:-])([a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+)(?![\w-]|\.\w)/gi)) {
    if (inTaken(m.index)) continue
    const v = m[1].toLowerCase()
    const labels = v.split('.')
    const tld = labels.at(-1)
    if (/^\d+$/.test(tld) || FILE_EXT.has(tld)) continue
    if (!(tld === 'example' || TLDS.has(tld) || /^[a-z]{2}$/.test(tld))) continue
    if (labels.some((l) => /^\d+$/.test(l)) && labels.length < 3) continue // 2.5, v1.2
    if (labels.length === 2 && labels[0].length === 1) continue // e.g, i.e
    out.push({ kind: 'domain', value: v, host: v })
  }
  return out
}

/**
 * Format 9, rule 3 and bible 07: in a verbatim line `as` may only respell, word for word. It may
 * drop tokens that are not spoken (emoji, links, handles), never add or merge words. Returns null
 * or a reason.
 */
export function respellingMismatch(caption, as) {
  if (as === null || as === undefined) return null
  const words = ws(caption).split(' ').filter(Boolean)
  const spoken = words.filter((w) => /[\p{L}\p{N}]/u.test(w) && !/^(https?:\/\/|@|#)/i.test(w) && !/\.[a-z]{2,}\/?$/i.test(w))
  const n = ws(as).split(' ').filter(Boolean).length
  if (n > words.length) return `"as" has ${n} words but the caption has ${words.length}: it adds words; respell word for word, join a multi-word respelling with hyphens`
  if (n < spoken.length) return `"as" has ${n} words but the caption speaks ${spoken.length}: it drops words; only emoji, links and handles may be left unsaid`
  return null
}

export const isExampleHost = (h) => h === 'example' || String(h).toLowerCase().endsWith('.example')

/** the text a JS file shows or says: its string literals and comments, one per line */
export function jsText(src) {
  return lex(src)
    .tokens.map((t) => t.value)
    .join('\n')
}
