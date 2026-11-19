// Read-only lookups into a digest folder, so an agent never has to read digest.json whole.
// Prints exact records as JSON lines: a post by address, posts by text or author, a story's
// posts, or a thread in order.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

export const LOOKUP_USAGE = `Usage: npm run lookup -- [--dir <digest folder>] <one query> [--limit n]

  --uri <at://... or https://bsky.app/profile/.../post/...>   one post, exactly as stored
  --text <words>       posts whose text contains the words (case-insensitive)
  --author <handle or did>   an account's posts in the window, oldest first
  --story <id>         a story's header and its posts (ids look like s-1a2b3c4d5e)
  --thread <uri or url>      a thread's posts in reply order, from its root
  --limit <n>          at most n records (default 20; a story or thread prints whole)
  --dir <folder>       the digest folder (default: the newest under data/weeks or data/ranges)

Output: one JSON record per line. Text is exact; nothing is trimmed.
`

export function newestDigestDir(roots) {
  const dirs = []
  for (const r of roots) {
    if (!existsSync(r)) continue
    for (const n of readdirSync(r)) {
      const f = join(r, n, 'digest.json')
      if (existsSync(f)) dirs.push({ dir: join(r, n), t: statSync(f).mtimeMs })
    }
  }
  return dirs.sort((a, b) => b.t - a.t)[0]?.dir ?? null
}

const urlToKey = (u) => {
  const m = /bsky\.app\/profile\/([^/]+)\/post\/([^/?#]+)/.exec(u)
  return m ? { who: m[1].toLowerCase(), rkey: m[2] } : null
}

export function loadPosts(dir) {
  const f = join(dir, 'posts.jsonl')
  return existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []
}

/** Every post record the digest holds: posts.jsonl, plus story context and quoted posts. */
function allRecords(dir, digest) {
  const map = new Map()
  for (const p of loadPosts(dir)) map.set(p.uri, p)
  for (const s of digest?.stories ?? []) {
    for (const p of s.posts ?? []) if (!map.has(p.uri)) map.set(p.uri, p)
    for (const c of s.context ?? []) if (c?.uri && !map.has(c.uri)) map.set(c.uri, c)
  }
  return map
}

export function findByAddress(records, addr) {
  if (addr.startsWith('at://')) return records.get(addr) ?? null
  const k = urlToKey(addr)
  if (!k) return null
  for (const p of records.values()) {
    const pk = p.url ? urlToKey(p.url) : null
    if (pk && pk.rkey === k.rkey && (pk.who === k.who || p.authorDid === k.who || String(p.handle).toLowerCase() === k.who)) return p
  }
  return null
}

/** A thread from its root, depth-first, replies by time. */
export function threadOf(records, root) {
  const ps = [...records.values()].filter((p) => p.uri === root || p.reply?.root === root)
  const kids = new Map()
  for (const p of ps) if (p.uri !== root && p.reply?.parent) {
    if (!kids.has(p.reply.parent)) kids.set(p.reply.parent, [])
    kids.get(p.reply.parent).push(p)
  }
  const out = []
  const seen = new Set()
  const walk = (p, depth) => {
    if (seen.has(p.uri)) return
    seen.add(p.uri)
    out.push({ depth, ...p })
    for (const k of (kids.get(p.uri) ?? []).sort((a, b) => (a.time < b.time ? -1 : 1))) walk(k, depth + 1)
  }
  const r = records.get(root)
  if (r) walk(r, 0)
  for (const p of ps.sort((a, b) => (a.time < b.time ? -1 : 1))) if (!seen.has(p.uri)) out.push({ depth: null, unreachable: true, ...p })
  return out
}

export function lookup(argv, { roots = [], write = (s) => process.stdout.write(s) } = {}) {
  const { values: a } = parseArgs({
    args: argv,
    options: { dir: { type: 'string' }, uri: { type: 'string' }, url: { type: 'string' }, text: { type: 'string' }, author: { type: 'string' }, story: { type: 'string' }, thread: { type: 'string' }, limit: { type: 'string' }, help: { type: 'boolean', short: 'h' } },
    strict: true,
  })
  const queries = ['uri', 'url', 'text', 'author', 'story', 'thread'].filter((k) => a[k])
  if (a.help || queries.length !== 1) { write(LOOKUP_USAGE); return a.help ? 0 : 2 }
  const dir = a.dir ?? newestDigestDir(roots)
  if (!dir || !existsSync(join(dir, 'digest.json'))) { write(`no digest found${dir ? ` in ${dir}` : ''}\n`); return 1 }
  const digest = JSON.parse(readFileSync(join(dir, 'digest.json'), 'utf8'))
  const records = allRecords(dir, digest)
  const limit = Number(a.limit ?? 20)
  const emit = (x) => write(JSON.stringify(x) + '\n')
  if (a.uri || a.url) {
    const p = findByAddress(records, a.uri ?? a.url)
    if (!p) { write('not found\n'); return 1 }
    emit(p)
    return 0
  }
  if (a.text) {
    const q = a.text.toLowerCase()
    const hits = [...records.values()].filter((p) => String(p.text ?? '').toLowerCase().includes(q)).sort((x, y) => (x.time < y.time ? -1 : 1))
    for (const p of hits.slice(0, limit)) emit(p)
    if (hits.length > limit) write(`# ${hits.length - limit} more; raise --limit\n`)
    return hits.length ? 0 : 1
  }
  if (a.author) {
    const q = a.author.replace(/^@/, '').toLowerCase()
    const hits = [...records.values()].filter((p) => p.authorDid === a.author || String(p.handle).toLowerCase() === q).sort((x, y) => (x.time < y.time ? -1 : 1))
    for (const p of hits.slice(0, limit)) emit(p)
    if (hits.length > limit) write(`# ${hits.length - limit} more; raise --limit\n`)
    return hits.length ? 0 : 1
  }
  if (a.story) {
    const s = (digest.stories ?? []).find((x) => x.id === a.story)
    if (!s) { write('no such story in digest.json (only the top stories are kept there)\n'); return 1 }
    const { posts, ...head } = s
    emit({ story: head })
    for (const p of posts) emit(p)
    if (s.stats?.posts > posts.length) write(`# the story has ${s.stats.posts} posts; digest.json keeps ${posts.length}\n`)
    return 0
  }
  if (a.thread) {
    const start = findByAddress(records, a.thread)
    const root = start?.reply?.root ?? start?.uri ?? (a.thread.startsWith('at://') ? a.thread : null)
    const perf = (digest.sections?.performableThreads?.threads ?? []).find((t) => t.root === root)
    if (perf) { emit({ thread: { root, complete: perf.complete, performable: true } }); for (const p of perf.posts) emit(p); return 0 }
    const t = root ? threadOf(records, root) : []
    if (!t.length) { write('thread not found\n'); return 1 }
    emit({ thread: { root, complete: false, note: 'assembled from the posts this digest holds; replies outside the cluster may be missing' } })
    for (const p of t) emit(p)
    return 0
  }
  return 2
}
