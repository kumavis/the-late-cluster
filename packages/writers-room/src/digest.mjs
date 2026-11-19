// The week's digest as the gates need it: which posts, accounts and links exist, their exact text,
// which stories are out of bounds, and who is opted out. The scraper's output is still changing, so
// nothing here depends on a particular section: posts are found wherever they appear in digest.json
// (any object with an at:// `uri`), plus posts.jsonl when it is there.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ProduceError } from './repo.mjs'

export const normHandle = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()

/** bsky.app/profile/<handle-or-did>/post/<rkey> → { actor, rkey } */
export function parsePostUrl(url) {
  const m = /^https?:\/\/(?:www\.)?bsky\.app\/profile\/([^/\s]+)\/post\/([a-z0-9]+)/i.exec(String(url))
  return m ? { actor: m[1].toLowerCase(), rkey: m[2] } : null
}
/** at://<did>/app.bsky.feed.post/<rkey> → { did, rkey } */
export function parseAtUri(uri) {
  const m = /^at:\/\/([^/\s]+)\/app\.bsky\.feed\.post\/([a-z0-9]+)/i.exec(String(uri))
  return m ? { did: m[1], rkey: m[2] } : null
}

export function emptyDigest() {
  return { dir: null, raw: null, posts: new Map(), byRkey: new Map(), accounts: new Map(), links: new Set(), outOfBoundsStories: new Set(), threads: [], optedOut: new Set(), sections: {} }
}

/**
 * Load data/weeks/<week>/ (or any folder holding digest.json). Returns
 * { posts: Map<uri, post>, accounts: Map<handle, account>, links: Set<url>, threads, optedOut, … }.
 * `optOutFile` is the scraper's packages/scraper/config/optout.json.
 */
export function loadDigest(dir, { optOutFile } = {}) {
  const file = join(dir, 'digest.json')
  if (!existsSync(file)) throw new ProduceError(`no digest at ${file}: run npm run scrape -- --week <week> first`)
  let data
  try {
    data = JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    throw new ProduceError(`${file}: ${e.message}`)
  }
  const d = emptyDigest()
  d.dir = dir
  // the parsed digest.json, for what the scraper computes itself (coverage, stats, ranked stories):
  // the scope stage takes those figures from here rather than computing its own
  d.raw = data
  d.format = data.format ?? null
  d.window = data.window ?? null
  d.sections = data.sections ?? {}
  for (const s of data.overview?.outOfBounds ?? []) if (s?.id) d.outOfBoundsStories.add(s.id)
  for (const [did, a] of Object.entries(data.authors ?? {})) addAccount(d, { did, ...a })
  for (const m of data.members ?? []) addAccount(d, { ...m, member: true })
  walkPosts(d, data, null)
  const jsonl = join(dir, 'posts.jsonl')
  if (existsSync(jsonl)) {
    for (const line of readFileSync(jsonl, 'utf8').split('\n')) {
      if (!line.trim()) continue
      try {
        addPost(d, JSON.parse(line), null)
      } catch {}
    }
  }
  if (optOutFile && existsSync(optOutFile)) {
    try {
      for (const a of JSON.parse(readFileSync(optOutFile, 'utf8')).accounts ?? []) {
        const v = typeof a === 'string' ? a : a?.did ?? a?.handle
        if (v) d.optedOut.add(normHandle(v))
      }
    } catch (e) {
      throw new ProduceError(`${optOutFile}: ${e.message}`)
    }
  }
  return d
}

function addAccount(d, a) {
  const h = normHandle(a.handle)
  if (!h) return
  const prev = d.accounts.get(h) ?? {}
  const acc = { ...prev, handle: h, did: a.did ?? a.authorDid ?? prev.did, displayName: a.displayName ?? prev.displayName, followers: a.followers ?? a.authorFollowers ?? prev.followers, small: a.small ?? a.smallAccount ?? prev.small, guest: a.guest ?? prev.guest, member: a.member ?? prev.member ?? null, seed: a.seed ?? prev.seed ?? false, featuredPrevious: a.featuredPrevious ?? prev.featuredPrevious ?? null, featuredEarlier: a.featuredEarlier ?? prev.featuredEarlier ?? null, timesFeatured: a.timesFeatured ?? prev.timesFeatured ?? 0, featuredBefore: Boolean(a.featuredBefore ?? a.featuredPrevious ?? a.featuredEarlier ?? (a.timesFeatured > 0 ? true : null) ?? prev.featuredBefore) }
  d.accounts.set(h, acc)
  // defensive: any opt-out style flag the scraper may add to an account record
  if (a.optedOut || a.optOut || a.selfDeclaredOptOut || a.excluded) {
    d.optedOut.add(h)
    if (acc.did) d.optedOut.add(normHandle(acc.did))
  }
}

function addPost(d, p, story) {
  if (!p || typeof p.uri !== 'string' || !p.uri.startsWith('at://')) return
  const prev = d.posts.get(p.uri)
  const post = {
    uri: p.uri,
    url: p.url ?? prev?.url ?? null,
    handle: normHandle(p.handle ?? p.author?.handle ?? prev?.handle),
    did: p.authorDid ?? p.author?.did ?? prev?.did ?? parseAtUri(p.uri)?.did,
    text: typeof p.text === 'string' ? p.text : prev?.text ?? null,
    displayName: p.displayName ?? p.author?.displayName ?? prev?.displayName ?? null,
    counts: p.counts && typeof p.counts === 'object' ? { likes: p.counts.likes ?? 0, reposts: p.counts.reposts ?? 0, replies: p.counts.replies ?? 0, quotes: p.counts.quotes ?? 0 } : prev?.counts ?? null,
    // the scraper's reach: separate numbers plus a combined score ({ likes, …, participants, score })
    reach: p.reach && typeof p.reach === 'object' ? p.reach : typeof p.reach === 'number' ? { score: p.reach } : prev?.reach ?? null,
    featured: p.featured ?? prev?.featured ?? null,
    member: typeof p.member === 'boolean' ? p.member : prev?.member ?? null,
    imageOnly: (typeof p.text !== 'string' || !p.text.trim()) && (p.hasImages || (p.imageAlts ?? []).length > 0) ? true : prev?.imageOnly ?? false,
    time: p.time ?? p.createdAt ?? prev?.time ?? null,
    parent: p.reply?.parent ?? p.inReplyTo ?? prev?.parent ?? null,
    root: p.reply?.root ?? prev?.root ?? null,
    links: [...(prev?.links ?? []), ...((p.links ?? []).map((l) => l?.url).filter(Boolean))],
    small: p.smallAccount ?? prev?.small,
    outOfBounds: prev?.outOfBounds || Boolean(p.outOfBounds) || Boolean(story?.outOfBounds && (Array.isArray(story.outOfBounds) ? story.outOfBounds.length : true)) || (story?.id ? d.outOfBoundsStories.has(story.id) : false),
    story: prev?.story ?? story?.id ?? null,
  }
  if (typeof post.parent === 'object' && post.parent) post.parent = post.parent.uri ?? null
  if (typeof post.root === 'object' && post.root) post.root = post.root.uri ?? null
  d.posts.set(p.uri, post)
  const r = parseAtUri(p.uri)
  if (r) d.byRkey.set(r.rkey, [...(d.byRkey.get(r.rkey) ?? []).filter((u) => u !== p.uri), p.uri])
  for (const l of post.links) d.links.add(normUrl(l))
  if (post.handle) addAccount(d, { handle: post.handle, did: post.did, displayName: p.displayName, authorFollowers: p.authorFollowers, smallAccount: p.smallAccount })
}

function walkPosts(d, node, story) {
  if (Array.isArray(node)) {
    for (const x of node) walkPosts(d, x, story)
    return
  }
  if (!node || typeof node !== 'object') return
  // a story: its id and its outOfBounds flag apply to every post inside it
  const isStory = typeof node.id === 'string' && /^s-/.test(node.id) && Array.isArray(node.posts)
  const ctx = isStory ? node : story
  if (typeof node.uri === 'string' && node.uri.startsWith('at://') && (typeof node.text === 'string' || node.handle)) addPost(d, node, ctx)
  // a candidate thread, whatever the scraper calls it: an object with a root and an ordered posts list
  if (Array.isArray(node.posts) && node.posts.length && (node.root || node.kind === 'thread') && !isStory) {
    const uris = node.posts.map((p) => (typeof p === 'string' ? p : p?.uri)).filter(Boolean)
    d.threads.push({ root: typeof node.root === 'string' ? node.root : node.root?.uri ?? uris[0], posts: uris })
  }
  for (const [k, v] of Object.entries(node)) if (v && typeof v === 'object' && k !== 'scores' && k !== 'run') walkPosts(d, v, ctx)
}

export const normUrl = (u) => String(u).trim().replace(/^https?:\/\/(www\.)?/i, '').replace(/[/#?]+$/, '').toLowerCase()

/** a post by at:// URI or bsky.app URL, or null */
export function findPost(d, ref) {
  if (!ref) return null
  if (d.posts.has(ref)) return d.posts.get(ref)
  const u = parsePostUrl(ref)
  if (!u) return null
  for (const uri of d.byRkey.get(u.rkey) ?? []) {
    const p = d.posts.get(uri)
    if (p && (p.handle === u.actor || normHandle(p.did) === u.actor)) return p
  }
  return null
}

/** is this handle or DID opted out (the list, or a flag the digest carries)? */
export function isOptedOut(d, handleOrDid) {
  const h = normHandle(handleOrDid)
  if (!h) return false
  if (d.optedOut.has(h)) return true
  const acc = d.accounts.get(h)
  return Boolean(acc?.did && d.optedOut.has(normHandle(acc.did)))
}

/** every post reference in a text: at:// post URIs and bsky.app post URLs */
export function postRefs(text) {
  const out = []
  for (const m of String(text).matchAll(/at:\/\/[^\s)'"`<>\]]+\/app\.bsky\.feed\.post\/[a-z0-9]+/gi)) out.push(m[0])
  for (const m of String(text).matchAll(/https?:\/\/(?:www\.)?bsky\.app\/profile\/[^\s/)'"`<>]+\/post\/[a-z0-9]+/gi)) out.push(m[0])
  return out
}

/**
 * Look posts up by address (at:// URI or bsky.app URL) or by text, because the digest is too big to
 * read whole (trial finding 2). Text matching is case-insensitive and whitespace-insensitive.
 */
export function lookupPosts(d, query, { limit = 20 } = {}) {
  const q = String(query ?? '').trim()
  if (!q) return []
  const exact = findPost(d, q)
  if (exact) return [exact]
  const needle = q.toLowerCase().replace(/\s+/g, ' ')
  const out = []
  for (const p of d.posts.values()) {
    if (p.text && p.text.toLowerCase().replace(/\s+/g, ' ').includes(needle)) out.push(p)
    else if (p.handle && p.handle === needle.replace(/^@/, '')) out.push(p)
    if (out.length >= limit) break
  }
  return out
}

/** one post, as the lookup command prints it: exact text, author, counts, what it replied to */
export function describePost(d, p) {
  const parent = p.parent ? findPost(d, p.parent) : null
  return {
    uri: p.uri,
    url: p.url,
    handle: p.handle,
    did: p.did ?? null,
    displayName: p.displayName,
    followers: d.accounts.get(p.handle)?.followers ?? null,
    time: p.time,
    counts: p.counts,
    reach: p.reach?.score ?? undefined,
    text: p.text,
    imageOnly: p.imageOnly || undefined,
    parent: p.parent ? { uri: p.parent, handle: parent?.handle ?? null, text: parent?.text ?? null } : null,
    root: p.root && p.root !== p.parent ? p.root : null,
    outOfBounds: p.outOfBounds || undefined,
  }
}
