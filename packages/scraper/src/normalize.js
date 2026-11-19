// Turn AppView post views into the small record the digest keeps.
//
// Kept: URI, a bsky.app URL, author DID / handle / display name, text, timestamps, engagement
// counts, reply and quote relations, external link URLs and titles, image alt text.
// Not kept: avatars, images, video, follower lists, anything else.
//
// Fields starting with `_` are internal (used by the consent filter and grouping) and are
// stripped by `publicPost` before anything is written.

import { createHash } from 'node:crypto'

const DAY = 86_400_000

export function parseAtUri(uri) {
  const m = /^at:\/\/([^/]+)\/([^/]+)\/([^/]+)$/.exec(uri ?? '')
  return m ? { repo: m[1], collection: m[2], rkey: m[3] } : null
}

export const didOfUri = (uri) => parseAtUri(uri)?.repo ?? null

export function bskyUrl(uri, handle) {
  const p = parseAtUri(uri)
  if (!p) return null
  const who = handle && handle !== 'handle.invalid' ? handle : p.repo
  return `https://bsky.app/profile/${who}/post/${p.rkey}`
}

export const shortHash = (s, n = 12) => createHash('sha256').update(String(s)).digest('hex').slice(0, n)

const TRACKING = /^(utm_.*|fbclid|gclid|mc_cid|mc_eid|ref|ref_src|ref_url|si|igshid|s|t|share|feature)$/i

/** Canonical form of a link so the same page shared five ways counts once. */
export function normalizeUrl(raw) {
  let u
  try {
    u = new URL(String(raw).trim())
  } catch {
    return null
  }
  if (!/^https?:$/.test(u.protocol)) return null
  u.protocol = 'https:'
  u.hash = ''
  let host = u.hostname.toLowerCase().replace(/^(www\.|m\.|mobile\.)/, '')
  if (host === 'youtu.be') {
    const id = u.pathname.slice(1)
    host = 'youtube.com'
    u.pathname = '/watch'
    u.search = ''
    if (id) u.searchParams.set('v', id)
  }
  if (host === 'twitter.com') host = 'x.com'
  u.hostname = host
  u.port = ''
  const keep = [...u.searchParams.entries()].filter(([k]) => !(TRACKING.test(k) && !(host === 'youtube.com' && k === 'v')))
  keep.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  u.search = ''
  for (const [k, v] of keep) u.searchParams.append(k, v)
  if (u.pathname.length > 1 && u.pathname.endsWith('/')) u.pathname = u.pathname.replace(/\/+$/, '')
  const s = u.toString()
  return u.pathname === '/' && !u.search ? s.replace(/\/$/, '') : s
}

export function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

/** Effective time of a post: createdAt, unless it disagrees with indexedAt by more than a day. */
export function effectiveTime(createdAt, indexedAt) {
  const c = Date.parse(createdAt)
  const i = Date.parse(indexedAt)
  if (!Number.isFinite(c)) return Number.isFinite(i) ? i : NaN
  if (Number.isFinite(i) && Math.abs(c - i) > DAY) return i
  return c
}

const labelVals = (labels) => (Array.isArray(labels) ? labels.map((l) => l?.val).filter(Boolean) : [])

function collectAlts(node, out, depth = 0) {
  if (!node || typeof node !== 'object' || depth > 6) return
  if (Array.isArray(node)) {
    for (const n of node) collectAlts(n, out, depth + 1)
    return
  }
  if (typeof node.alt === 'string' && node.alt.trim()) out.push(node.alt.trim())
  for (const [k, v] of Object.entries(node)) {
    if (k === 'record' || k === 'alt') continue
    if (v && typeof v === 'object') collectAlts(v, out, depth + 1)
  }
}

/** Split an embed view into { media, external, quote } parts. */
function embedParts(embed) {
  const parts = { mediaViews: [], external: null, quote: null, video: false, embedded: null }
  const visit = (e) => {
    if (!e || typeof e !== 'object') return
    const t = e.$type ?? ''
    if (t.startsWith('app.bsky.embed.recordWithMedia')) {
      visit(e.media)
      visit({ $type: 'app.bsky.embed.record#view', record: e.record?.record ?? e.record })
      return
    }
    if (t.startsWith('app.bsky.embed.record')) {
      const r = e.record
      if (!r) return
      if ((r.$type ?? '').endsWith('#viewRecord') || r.value?.$type === 'app.bsky.feed.post') {
        parts.quote = { state: 'ok', view: r }
      } else if ((r.$type ?? '').match(/#view(NotFound|Blocked|Detached)$/)) {
        parts.quote = { state: r.$type.split('#view')[1].toLowerCase(), uri: r.uri }
      } else if (r.uri) {
        // a feed generator, list, starter pack or labeler card
        parts.embedded = { kind: (r.$type ?? '').split('.').slice(-1)[0], uri: r.uri, name: r.displayName ?? r.name ?? null }
      }
      return
    }
    if (t.startsWith('app.bsky.embed.external')) {
      parts.external = e.external ?? null
      return
    }
    if (t.startsWith('app.bsky.embed.video')) parts.video = true
    parts.mediaViews.push(e)
  }
  visit(embed)
  return parts
}

function facetsOf(record) {
  const links = []
  const mentions = []
  const tags = []
  const bytes = Buffer.from(record?.text ?? '', 'utf8')
  for (const f of record?.facets ?? []) {
    for (const feat of f.features ?? []) {
      const t = feat.$type ?? ''
      if (t.endsWith('#link') && feat.uri) links.push(feat.uri)
      else if (t.endsWith('#mention') && feat.did) {
        const { byteStart, byteEnd } = f.index ?? {}
        const text = Number.isInteger(byteStart) ? bytes.subarray(byteStart, byteEnd).toString('utf8') : null
        mentions.push({ did: feat.did, text })
      } else if (t.endsWith('#tag') && feat.tag) tags.push(String(feat.tag).toLowerCase())
    }
  }
  return { links, mentions, tags }
}

/**
 * Normalize a post view. Accepts both the full `PostView` (record in `record`, embed in
 * `embed`) and the `viewRecord` found inside a quote embed (record in `value`, embeds in
 * `embeds[0]`). Returns null for anything that is not a post.
 */
export function normalizePost(view, { source } = {}) {
  if (!view?.uri) return null
  const record = view.record?.$type === 'app.bsky.feed.post' || view.record?.text !== undefined ? view.record : view.value
  if (!record || (record.$type && record.$type !== 'app.bsky.feed.post')) return null
  const author = view.author ?? {}
  const embed = view.embed ?? view.embeds?.[0] ?? null
  const parts = embedParts(embed)
  const facets = facetsOf(record)

  const alts = []
  for (const m of parts.mediaViews) collectAlts(m, alts)

  const linkMap = new Map()
  const addLink = (raw, title) => {
    const url = normalizeUrl(raw)
    if (!url) return
    if (/^https:\/\/(bsky\.app|go\.bsky\.app)\//.test(url) && /\/post\//.test(url)) return // a post link, not a site
    const prev = linkMap.get(url)
    linkMap.set(url, { url, domain: domainOf(url), title: prev?.title || (title ? String(title).slice(0, 200) : null) })
  }
  if (parts.external?.uri) addLink(parts.external.uri, parts.external.title)
  for (const l of facets.links) addLink(l)

  const rootUri = record.reply?.root?.uri ?? null
  const parentUri = record.reply?.parent?.uri ?? null
  const quotedView = parts.quote?.state === 'ok' ? parts.quote.view : null
  const quoteUri = quotedView?.uri ?? parts.quote?.uri ?? null

  const t = effectiveTime(record.createdAt, view.indexedAt)
  return {
    uri: view.uri,
    url: bskyUrl(view.uri, author.handle),
    authorDid: author.did ?? didOfUri(view.uri),
    handle: author.handle ?? null,
    displayName: author.displayName?.trim() || null,
    text: record.text ?? '',
    createdAt: record.createdAt ?? null,
    indexedAt: view.indexedAt ?? null,
    time: Number.isFinite(t) ? new Date(t).toISOString() : null,
    langs: record.langs ?? [],
    counts: {
      likes: view.likeCount ?? 0,
      reposts: view.repostCount ?? 0,
      replies: view.replyCount ?? 0,
      quotes: view.quoteCount ?? 0,
    },
    reply: rootUri || parentUri ? { root: rootUri, parent: parentUri } : null,
    quote: quoteUri ? { uri: quoteUri, state: parts.quote?.state ?? 'ok' } : null,
    links: [...linkMap.values()].sort((a, b) => (a.url < b.url ? -1 : 1)),
    imageAlts: alts,
    hasImages: parts.mediaViews.some((m) => /images|gallery/.test(m.$type ?? '')),
    hasVideo: parts.video,
    embedded: parts.embedded,
    tags: [...new Set(facets.tags)].sort(),
    labels: [...new Set([...labelVals(view.labels), ...(record.labels?.values ?? []).map((v) => v.val)])].sort(),
    sources: source ? [source] : [],
    // internal
    _threadKey: rootUri ?? view.uri,
    _authorLabels: labelVals(author.labels),
    _mentions: facets.mentions,
    _quoted: quotedView ? normalizePost(quotedView, { source: 'quoted' }) : null,
  }
}

/** Fold a second sighting of the same post into the first: keep the latest counts and all sources. */
export function mergePost(a, b) {
  if (!a) return b
  if (!b) return a
  const pick = (x, y) => Math.max(x ?? 0, y ?? 0)
  return {
    ...a,
    counts: {
      likes: pick(a.counts.likes, b.counts.likes),
      reposts: pick(a.counts.reposts, b.counts.reposts),
      replies: pick(a.counts.replies, b.counts.replies),
      quotes: pick(a.counts.quotes, b.counts.quotes),
    },
    sources: [...new Set([...a.sources, ...b.sources])].sort(),
    _quoted: a._quoted ?? b._quoted,
  }
}

/** The record as written to posts.jsonl and digest.json. */
export function publicPost(p) {
  const out = {}
  for (const [k, v] of Object.entries(p)) if (!k.startsWith('_')) out[k] = v
  return out
}

export function engagement(counts, w = { likes: 1, reposts: 2, quotes: 3, replies: 1.5 }) {
  return (counts.likes ?? 0) * w.likes + (counts.reposts ?? 0) * w.reposts + (counts.quotes ?? 0) * w.quotes + (counts.replies ?? 0) * w.replies
}
