// What airs from a real account, against the record. Rule R4: every real post the show uses is
// recorded in production/sources.json; R3: every line a real account's puppet speaks is recorded
// there with its occasion. The writers' room checks this against the week's digest at stage 3; this
// check needs no digest, so the build can run it on any checkout, and it reads the segments as they
// stand rather than what sources.json lists (episode 002's close-out: two performed posts had been
// dropped from sources.json, their lines stayed, and the live check only reads what is listed).
//
//   airedFindings(ep) → { findings: [{ seg, file, line, what, ref, message }], notes: [string] }
//
// It reads every .js file under each rundown segment (segments not in the rundown do not air) and
// reports, with no record in sources.json:
//   - a line tagged `// verbatim: at://…`, `// interview: …` or `// catchphrase: "…"`: its post is not
//     in "posts", or (spoken by a real account's puppet) the line has no "lines" record, or the
//     catchphrase is not listed for the account;
//   - a post address written anywhere in a segment's code or comments that is not in "posts";
//   - a post card: an object with `text` and counts (likes, reposts, replies or counts) whose text
//     is no recorded post's text (cuts with … allowed), or whose handle is not in "accounts";
//   - a real account whose puppet speaks or appears (as the page computes it), or whose card is
//     shown, that is not in "accounts".
// `notes` are what it could not read: a card whose text is not a literal it can resolve.
// Node builtins only; the lexer, the line locator and the cast are the writers' room's own.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { lex, scriptLines, sourceTag, enclosingObject, isExampleHost, verbatimMismatch } from '../../packages/writers-room/src/scan.mjs'
import { normHandle, parseAtUri, parsePostUrl, postRefs } from '../../packages/writers-room/src/digest.mjs'
import { castHandle, isInvented, loadCast } from '../../packages/writers-room/src/context.mjs'
import { episodePaths, walk } from '../../packages/writers-room/src/repo.mjs'
import { sourcesIndex } from '../../packages/writers-room/src/gates/common.mjs'
import { appearing } from '../../packages/writers-room/src/gates/direct.mjs'
import { catchphrasesOf } from '../../packages/writers-room/src/gates/write.mjs'

/**
 * Episodes made before production/sources.json existed. The pilot has no record to check against,
 * and its files cannot gain one without changing its source hash and failing `npm run verify`, so
 * the build skips the check for it (npm run aired still reports its findings). Closed: nothing is
 * ever added to this list; every later episode is made with a sources.json.
 */
export const PREDATES_SOURCES = new Set(['001-pilot'])

const COUNT_KEYS =['likes', 'reposts', 'replies', 'counts']
const loose = (s) => String(s ?? '').toLowerCase().replace(/[\s.,!?;:'"“”‘’()…-]+/g, ' ').trim()
const sameText = (a, b) => String(a).replace(/\s+/g, ' ').trim() === String(b).replace(/\s+/g, ' ').trim()
const lineAt = (src, i) => src.slice(0, i).split('\n').length
const short = (s, n = 50) => {
  const t = String(s).replace(/\s+/g, ' ')
  return t.length > n ? `${t.slice(0, n)}…` : t
}

/** the sources.json post a reference names (at:// URI, or a bsky.app URL by handle or DID), or null */
export function recordedPost(posts, ref) {
  if (!ref) return null
  if (posts.has(ref)) return posts.get(ref)
  const at = parseAtUri(ref)
  const url = parsePostUrl(ref)
  for (const p of posts.values()) {
    const u = parseAtUri(p.uri)
    if (!u) continue
    if (at && at.rkey === u.rkey && at.did === u.did) return p
    if (url && url.rkey === u.rkey && (url.actor === u.did.toLowerCase() || url.actor === normHandle(p.author))) return p
  }
  return null
}

/** a source tag, including R3's interview by direct message (message ids in place of addresses) */
function tagOf(comments) {
  const t = sourceTag(comments)
  if (t) return t
  const m = /\binterview\s*:\s*([^\s·;|]+)/i.exec(comments.join(' '))
  return m ? { kind: 'interview', ref: m[1].replace(/[.,)]+$/, '') } : null
}

/** the own-level entries of the object at masked[open..close]: [{ key, at }] and spreads [{ spread, at }] */
function entries(masked, open, close) {
  const out = []
  let depth = 0
  let start = open + 1
  const take = (a, b) => {
    const part = masked.slice(a, b)
    const lead = part.length - part.trimStart().length
    let m
    if ((m = /^\s*\.\.\.\s*([A-Za-z_$][\w$]*)/.exec(part))) out.push({ spread: m[1], at: a + lead })
    else if ((m = /^\s*([A-Za-z_$][\w$]*)\s*:/.exec(part))) out.push({ key: m[1], at: a + m[0].length })
  }
  for (let k = open + 1; k < close; k++) {
    const c = masked[k]
    if ('{[('.includes(c)) depth++
    else if ('}])'.includes(c)) depth--
    else if (c === ',' && depth === 0) {
      take(start, k)
      start = k + 1
    }
  }
  take(start, close)
  return out
}

/** one file's lexed source and a resolver for values: a literal, a top-level const, or an object */
function reader(src) {
  const { tokens, masked } = lex(src)
  const tokAt = new Map(tokens.filter((t) => t.kind !== 'comment').map((t) => [t.start, t]))
  const skipWs = (i) => {
    while (i < src.length && /\s/.test(src[i])) i++
    return i
  }
  const constAt = (name) => {
    const m = new RegExp(`(?:^|[\\s;])(?:const|let|var)\\s+${name.replace(/\$/g, '\\$')}\\s*=`, 'm').exec(masked)
    return m ? skipWs(m.index + m[0].length) : -1
  }
  /** { kind: 'string', value } | { kind: 'object', open, close } | { kind: 'computed' } | { kind: 'pass' } */
  const value = (at, seen = 0) => {
    at = skipWs(at)
    const tok = tokAt.get(at)
    if (tok) {
      if (/^\s*(\+|\.|\?\.|\[)/.test(masked.slice(tok.end, tok.end + 40))) return { kind: 'computed' } // 'a' + b, '…'.slice()
      if (tok.kind === 'string' || !tok.value.includes('${')) return { kind: 'string', value: tok.value }
      return { kind: 'computed' }
    }
    if (masked[at] === '{') {
      const obj = enclosingObject(masked, at)
      return obj ? { kind: 'object', ...obj } : { kind: 'computed' }
    }
    const id = /^([A-Za-z_$][\w$]*)\s*(?=[,}\n;)]|$)/.exec(masked.slice(at, at + 80))
    if (id && seen < 4) {
      const c = constAt(id[1])
      return c < 0 ? { kind: 'computed', name: id[1] } : value(c, seen + 1)
    }
    if (/^[A-Za-z_$][\w$]*\s*(\.|\?\.|\[)/.test(masked.slice(at, at + 80))) return { kind: 'pass' } // c.text: a card passed through to a draw call
    return { kind: 'computed' }
  }
  /** an object's own keys, following spreads of top-level consts */
  const fields = (open, close, seen = 0) => {
    const f = new Map()
    for (const e of entries(masked, open, close)) {
      if (e.spread && seen < 4) {
        const c = constAt(e.spread)
        const v = c < 0 ? null : value(c)
        if (v?.kind === 'object') for (const [k, x] of fields(v.open, v.close, seen + 1)) f.set(k, x)
      } else if (e.key) f.set(e.key, e.at)
    }
    return f
  }
  return { src, tokens, masked, value, fields }
}

/** post cards in one file: [{ line, text?, handle?, unreadable? }] */
export function cardsIn(src) {
  const r = reader(src)
  const seen = new Set()
  const out = []
  for (const m of r.masked.matchAll(/(^|[\s,{])text\s*:/g)) {
    const obj = enclosingObject(r.masked, m.index + m[1].length)
    if (!obj || seen.has(obj.open)) continue
    seen.add(obj.open)
    const f = r.fields(obj.open, obj.close)
    if (!f.has('text') || !COUNT_KEYS.some((k) => f.has(k))) continue
    const text = r.value(f.get('text'))
    if (text.kind === 'pass') continue
    const handle = f.has('handle') ? r.value(f.get('handle')) : null
    const card = { line: lineAt(src, obj.open), handle: handle?.kind === 'string' ? normHandle(handle.value) : null }
    // a card that sets the post's link on a row of its own shows text, then link
    const link = f.has('link') ? r.value(f.get('link')) : null
    if (text.kind === 'string') card.text = link?.kind === 'string' ? `${text.value}\n\n${link.value}` : text.value
    else card.unreadable = text.name ?? 'an expression'
    out.push(card)
  }
  return out
}

/** the handle a file names for its cards when they carry none: a top-level `const HANDLE = '…'` */
function fileHandle(src) {
  const m = /(?:^|\n)\s*const\s+[A-Z_]*HANDLE\s*=\s*(['"])([^'"]+)\1/.exec(src)
  return m ? normHandle(m[2]) : null
}

/**
 * Everything from a real account that airs in `ep` (from resolveEpisode) with no record in its
 * production/sources.json.
 */
export async function airedFindings(ep) {
  const findings = []
  const notes = []
  if (ep.ref) return { findings, notes }
  const paths = episodePaths(ep.root, ep.id)
  let sources = null
  if (existsSync(paths.sources)) {
    try {
      sources = JSON.parse(readFileSync(paths.sources, 'utf8'))
    } catch (e) {
      findings.push({ seg: null, file: 'production/sources.json', line: null, what: 'sources', ref: null, message: `production/sources.json does not parse (${e.message}), so nothing in the episode has a record` })
      sources = null
    }
  }
  const ctx = { root: ep.root, id: ep.id, meta: ep.meta, paths, sources }
  const idx = sourcesIndex(ctx)
  const lineRecs = Array.isArray(sources?.lines) ? sources.lines.filter(Boolean) : []
  // a post may be listed once per segment that uses it, so text is matched against every entry
  const allPosts = Array.isArray(sources?.posts) ? sources.posts.filter((p) => p?.uri) : []
  // the occasion a line answers is recorded on its "lines" record, not necessarily in "posts"
  const contexts = new Map(lineRecs.filter((r) => typeof r.context === 'string').map((r) => [r.context, { uri: r.context, author: '' }]))
  const recorded = (ref) => recordedPost(idx.posts, ref) ?? recordedPost(contexts, ref)
  const { cast, guests } = await loadCast(ep.root, paths)
  const realGuest = (id) => guests.has(id) && !isInvented(cast[id])
  const add = (seg, file, line, what, ref, message) => findings.push({ seg, file, line, what, ref, message: `segments/${seg}/${file}${line ? `:${line}` : ''}: ${message}` })
  const needAccount = new Map() // handle → first place it airs

  for (const seg of ep.rundown) {
    const dir = paths.segDir(seg)
    // script.js first, so an account that speaks is reported at its first line
    const files = walk(dir).filter((f) => /\.(m?js)$/.test(f)).sort((a, b) => (b === 'script.js') - (a === 'script.js'))
    for (const file of files) {
      const src = readFileSync(join(dir, file), 'utf8')
      const reported = new Set()
      // tagged lines (rule R3)
      if (file === 'script.js') {
        for (const l of scriptLines(src)) {
          const real = l.who.filter(realGuest)
          for (const who of real) if (!needAccount.has(castHandle(cast[who]))) needAccount.set(castHandle(cast[who]), { seg, file, line: l.line, why: `${who} speaks` })
          const tag = tagOf(l.comments)
          if (!tag || !['verbatim', 'interview', 'catchphrase'].includes(tag.kind)) continue
          const at = `${l.id ? `(${l.id}) ` : ''}${l.who.join('+')}`
          if (tag.kind === 'verbatim' || tag.kind === 'interview') {
            const isPost = Boolean(parseAtUri(tag.ref) || parsePostUrl(tag.ref))
            if (isPost && !recordedPost(idx.posts, tag.ref)) {
              add(seg, file, l.line, 'line', tag.ref, `${at} performs ${tag.ref} (// ${tag.kind}), which is not in sources.json "posts"`)
              reported.add(tag.ref)
            }
          }
          for (const who of real) {
            const h = castHandle(cast[who])
            if (tag.kind === 'catchphrase') {
              const listed = catchphrasesOf(idx.accounts.get(h))
              if (!listed.some((c) => loose(c.phrase) === loose(l.text))) add(seg, file, l.line, 'catchphrase', h, `${at} says the catchphrase "${short(l.text)}", which sources.json does not list for ${h}`)
            }
            if (!l.id) {
              add(seg, file, l.line, 'line', tag.ref ?? h, `${at} speaks for ${h} (// ${tag.kind}) but has no id, so no sources.json "lines" record can name it`)
              continue
            }
            const rec = lineRecs.find((r) => r.segment === seg && r.line === l.id)
            if (!rec) add(seg, file, l.line, 'line', tag.ref ?? h, `${at} speaks for ${h} (// ${tag.kind}${tag.ref ? `: ${tag.ref}` : ''}) and sources.json "lines" has no record for segment ${seg}, line ${l.id}`)
            else if (tag.ref && rec.post && rec.post !== tag.ref && recordedPost(idx.posts, rec.post) !== recordedPost(idx.posts, tag.ref)) add(seg, file, l.line, 'line', tag.ref, `${at}: the sources.json "lines" record for ${l.id} names ${rec.post}, the tag ${tag.ref}`)
          }
        }
      }
      // every post address written in the segment, in code or comments
      for (const t of lex(src).tokens) {
        for (const ref of postRefs(t.value)) {
          if (reported.has(ref) || recorded(ref)) continue
          reported.add(ref)
          add(seg, file, t.line, 'address', ref, `${ref} is written here but is not in sources.json "posts"`)
        }
      }
      // post cards
      const byFile = fileHandle(src)
      for (const c of cardsIn(src)) {
        const h = c.handle ?? byFile
        if (h && isExampleHost(h)) continue // an invented account's card: fiction
        if (c.unreadable) {
          notes.push(`segments/${seg}/${file}:${c.line}: a card${h ? ` by ${h}` : ''} whose text is ${c.unreadable}, not a literal; its record was not checked`)
          continue
        }
        if (h && !needAccount.has(h)) needAccount.set(h, { seg, file, line: c.line, why: 'its card is shown' })
        const posts = allPosts.filter((p) => typeof p.text === 'string' && (!h || normHandle(p.author) === h))
        if (!posts.some((p) => sameText(c.text, p.text) || !verbatimMismatch(c.text, p.text))) add(seg, file, c.line, 'card', h, `a card${h ? ` by ${h}` : ''} shows "${short(c.text)}", which is no post${h ? ` of ${h}'s` : ''} in sources.json "posts"`)
      }
    }
  }
  // puppets of real accounts on screen, as the page computes them (lines in the cues, segment cast and guests)
  for (const seg of ep.rundown) {
    for (const id of appearing({ ...ctx, meta: { ...ctx.meta, rundown: [seg] } })) {
      if (!realGuest(id)) continue
      const h = castHandle(cast[id])
      if (!needAccount.has(h)) needAccount.set(h, { seg, file: 'cues.json or index.js', line: null, why: `${id} appears` })
    }
  }
  for (const [h, w] of needAccount) {
    if (idx.accounts.has(h)) continue
    const where = w.seg ? `segments/${w.seg}/${w.file}${w.line ? `:${w.line}` : ''}` : 'a segment\'s cues or cast'
    findings.push({ seg: w.seg, file: w.file, line: w.line, what: 'account', ref: h, message: `${where}: ${h} airs (${w.why}) but is not in sources.json "accounts"` })
  }
  if (!sources && findings.length) findings.unshift({ seg: null, file: 'production/sources.json', line: null, what: 'sources', ref: null, message: 'production/sources.json is missing' })
  return { findings, notes }
}

/** what `npm run aired` prints: { out: [lines], err: [notes], code } (1 on a finding) */
export async function airedReport(ep) {
  const out = []
  if (PREDATES_SOURCES.has(ep.id)) out.push(`${ep.id} predates production/sources.json: the build does not enforce these findings for it (PREDATES_SOURCES in scripts/lib/aired.mjs)`)
  const { findings, notes } = await airedFindings(ep)
  for (const f of findings) out.push(`✗ ${f.message}`)
  out.push(`aired ${ep.id} findings=${findings.length} notes=${notes.length}`)
  return { out, err: notes.map((n) => `note: ${n}`), code: findings.length ? 1 : 0 }
}
