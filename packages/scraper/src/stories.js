// Group posts into stories and rank them. Pure and deterministic: same posts and config in,
// same stories (ids, order, scores) out.
//
// Grouping (a union-find over posts and shared keys):
//   T  same thread root                       (replies join their root's story)
//   T  quoting a post joins the quoted post's thread, so quote chains become one story
//   L  the same normalized link, posted by two or more authors
//   D  the same domain, when it is new this week or a build host, posted by two or more members
//   W  posts left on their own that share a spiked phrase
//
// Scoring: see README "Scoring". Every component is normalised to 0..1 against the week's
// maximum, then weighted by config/scoring.json.

import { engagement, shortHash, publicPost } from './normalize.js'
import { phrasesOf, firstLine } from './text.js'
import { utcDay } from './window.js'
import { storySensitivity } from './sensitivity.js'

class DSU {
  constructor() { this.p = new Map(); this.size = new Map() }
  find(x) {
    if (!this.p.has(x)) { this.p.set(x, x); this.size.set(x, x.startsWith('P:') ? 1 : 0) }
    let r = x
    while (this.p.get(r) !== r) r = this.p.get(r)
    while (this.p.get(x) !== r) { const n = this.p.get(x); this.p.set(x, r); x = n }
    return r
  }
  posts(x) { return this.size.get(this.find(x)) }
  /** Merge; with `cap`, refuse a merge that would make a group of more than `cap` posts. */
  union(a, b, cap = Infinity) {
    const ra = this.find(a), rb = this.find(b)
    if (ra === rb) return true
    const total = this.size.get(ra) + this.size.get(rb)
    if (total > cap && this.size.get(ra) > 0 && this.size.get(rb) > 0) return false
    // Deterministic: the lexicographically smaller root wins.
    const [keep, drop] = ra < rb ? [ra, rb] : [rb, ra]
    this.p.set(drop, keep)
    this.size.set(keep, total)
    return true
  }
}

const median = (xs) => {
  if (!xs.length) return 0
  const s = [...xs].sort((a, b) => a - b)
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

const isReply = (p) => !!p.reply

/**
 * Per-author engagement baselines from every post we hold for them (window and baseline
 * weeks), split by top-level posts and replies because replies get far less attention.
 */
export function authorBaselines(posts, weights, { minPosts = 5 } = {}) {
  const by = new Map()
  const global = { top: [], reply: [] }
  for (const p of posts) {
    const e = engagement(p.counts, weights)
    let a = by.get(p.authorDid)
    if (!a) by.set(p.authorDid, (a = { top: [], reply: [] }))
    const k = isReply(p) ? 'reply' : 'top'
    a[k].push(e)
    global[k].push(e)
  }
  const g = { top: median(global.top), reply: median(global.reply) }
  const out = new Map()
  for (const [did, a] of by) {
    // A kind with too few posts falls back to the global median and is marked unknown, so
    // no one gets a huge "lift" from comparing a top-level post with their replies.
    out.set(did, {
      top: a.top.length >= minPosts ? median(a.top) : g.top,
      reply: a.reply.length >= minPosts ? median(a.reply) : g.reply,
      nTop: a.top.length,
      nReply: a.reply.length,
      n: a.top.length + a.reply.length,
    })
  }
  return { byAuthor: out, global: g }
}

export function postMetrics(p, baselines, cfg) {
  const e = engagement(p.counts, cfg.engagementWeights)
  const b = baselines.byAuthor.get(p.authorDid)
  const known = !!b && (isReply(p) ? b.nReply : b.nTop) >= (cfg.baselineMinPosts ?? 5)
  const base = known ? (isReply(p) ? b.reply : b.top) : isReply(p) ? baselines.global.reply : baselines.global.top
  // Without enough of the author's own posts we cannot say they beat their usual.
  const lift = known ? Math.log2((e + 1) / (base + 1)) : 0
  const pw = cfg.postWeights
  const score = pw.engagement * Math.log1p(e) + pw.lift * Math.max(0, lift) + (p.member ? pw.member : 0)
  return { engagement: round(e), baseline: round(base), lift: round(lift), score: round(score) }
}

export function compileBuiltPatterns(list = []) {
  return list.map((s) => new RegExp(s, 'i'))
}

const hostMatches = (domain, patterns) =>
  !!domain && patterns.some((pat) => (pat.startsWith('*.') ? domain.endsWith(pat.slice(1)) || domain === pat.slice(2) : domain === pat || domain.endsWith('.' + pat)))

/**
 * @param {object} args
 * @param {Array} args.posts filtered window posts (each with `member` set)
 * @param {object} args.baselines from authorBaselines
 * @param {Array} args.phrases spiked phrases, ranked
 * @param {Set} args.baselineDomains domains seen in the baseline weeks
 * @param {Map} args.context uri -> post, for roots and quoted posts outside the window
 * @param {Map} args.memberReposts uri -> number of members who reposted it
 * @param {object} args.cfg scoring config
 */
export function buildStories({ posts, baselines, phrases = [], baselineDomains = new Set(), context = new Map(), memberReposts = new Map(), memberHandles = [], sensitivity = {}, reach = null, cfg }) {
  const sorted = [...posts].sort((a, b) => (a.uri < b.uri ? -1 : 1))
  const byUri = new Map(sorted.map((p) => [p.uri, p]))
  const metrics = new Map(sorted.map((p) => [p.uri, postMetrics(p, baselines, cfg)]))
  const dsu = new DSU()
  const keysOf = new Map(sorted.map((p) => [p.uri, new Set()]))
  const cap = cfg.grouping?.maxMergedPosts ?? Infinity
  // Thread membership is unconditional; every other edge is capped so chains of quotes and
  // links cannot swallow the week.
  const attach = (p, key, capped = false) => {
    if (dsu.union('P:' + p.uri, key, capped ? cap : Infinity)) keysOf.get(p.uri).add(key)
  }
  const ownDomain = ownDomainMatcher(memberHandles)
  const genericDomains = cfg.genericDomains ?? []
  const buildHosts = cfg.buildHosts ?? []
  const builtRes = compileBuiltPatterns(cfg.builtPatterns)

  // threads and quote chains
  const quoteTarget = new Map()
  for (const p of sorted) attach(p, 'T:' + p._threadKey)
  // A top-level quote post is a reaction to the quoted post and joins its story. A reply that
  // quotes something stays in its own thread, or one reply would bridge two conversations.
  for (const p of sorted) {
    if (!p.quote?.uri) continue
    const q = byUri.get(p.quote.uri)
    const target = q ? q._threadKey : p.quote.uri
    quoteTarget.set(p.uri, target)
    if (!p.reply) attach(p, 'T:' + target, true)
  }

  // links and domains
  const linkPosts = new Map()
  const domainMembers = new Map()
  for (const p of sorted) {
    for (const l of p.links ?? []) {
      if (!linkPosts.has(l.url)) linkPosts.set(l.url, [])
      linkPosts.get(l.url).push(p)
      if (p.member && l.domain) {
        if (!domainMembers.has(l.domain)) domainMembers.set(l.domain, new Map())
        domainMembers.get(l.domain).set(p.authorDid, p)
      }
    }
  }
  const linkInfo = new Map()
  for (const [url, ps] of linkPosts) {
    const authors = new Set(ps.map((p) => p.authorDid))
    const domain = ps[0].links.find((l) => l.url === url)?.domain
    const title = ps.map((p) => p.links.find((l) => l.url === url)?.title).find(Boolean) ?? null
    linkInfo.set(url, {
      url, title, domain,
      posts: ps.length,
      authors: authors.size,
      members: new Set(ps.filter((p) => p.member).map((p) => p.authorDid)).size,
      isNewDomain: !!domain && !baselineDomains.has(domain) && !hostMatches(domain, genericDomains),
      buildHost: hostMatches(domain, buildHosts),
      ownDomain: ownDomain(domain) && !hostMatches(domain, genericDomains),
    })
    // Only top-level posts announce a link; a reply with a link is commentary.
    const tops = ps.filter((p) => !p.reply)
    if (new Set(tops.map((p) => p.authorDid)).size >= 2 && !hostMatches(domain, genericDomains.filter((g) => g !== 'youtube.com'))) {
      for (const p of tops) attach(p, 'L:' + url, true)
    }
  }
  for (const [domain, m] of domainMembers) {
    if (hostMatches(domain, genericDomains)) continue
    const isNew = !baselineDomains.has(domain)
    if (m.size < (cfg.grouping?.minDomainMembers ?? 2) || !(isNew || hostMatches(domain, buildHosts))) continue
    if (hostMatches(domain, buildHosts) && !isNew) continue // github.com etc: group by exact link only
    for (const p of sorted) if (!p.reply && p.links?.some((l) => l.domain === domain)) attach(p, 'D:' + domain, true)
  }

  // singletons sharing a spiked phrase
  const comps = () => {
    const m = new Map()
    for (const p of sorted) {
      const r = dsu.find('P:' + p.uri)
      if (!m.has(r)) m.set(r, [])
      m.get(r).push(p)
    }
    return m
  }
  let groups = comps()
  const sizeOf = new Map()
  for (const ps of groups.values()) for (const p of ps) sizeOf.set(p.uri, ps.length)
  const assigned = new Set()
  const phraseTerms = new Map()
  for (const ph of phrases) {
    phraseTerms.set(ph.term, ph)
    const cands = (ph._posts ?? []).map((p) => byUri.get(p.uri)).filter((p) => p && sizeOf.get(p.uri) === 1 && !assigned.has(p.uri))
    const authors = new Set(cands.map((p) => p.authorDid))
    if (cands.length < 2 || authors.size < 2) continue
    for (const p of cands) {
      attach(p, 'W:' + ph.term, true)
      assigned.add(p.uri)
    }
  }
  groups = comps()

  // phrases present in each post, for the burst component
  const phrasesInPost = new Map()
  const maxPhraseScore = Math.max(0, ...phrases.map((p) => p.score))
  for (const ph of phrases) for (const p of ph._posts ?? []) {
    if (!phrasesInPost.has(p.uri)) phrasesInPost.set(p.uri, [])
    phrasesInPost.get(p.uri).push(ph.term)
  }

  // ---- build raw stories
  const raw = []
  for (const ps of groups.values()) {
    const keyCount = new Map()
    for (const p of ps) for (const k of keysOf.get(p.uri)) keyCount.set(k, (keyCount.get(k) ?? 0) + 1)
    const prio = { T: 0, L: 1, D: 2, W: 3 }
    const anchor = [...keyCount.entries()].sort((a, b) => b[1] - a[1] || prio[a[0][0]] - prio[b[0][0]] || (a[0] < b[0] ? -1 : 1))[0][0]
    const members = new Set(ps.filter((p) => p.member).map((p) => p.authorDid))
    const authors = new Set(ps.map((p) => p.authorDid))
    const days = [...new Set(ps.map((p) => p.time && utcDay(Date.parse(p.time))).filter(Boolean))].sort()
    const inStory = new Set(ps.map((p) => p.uri))
    const quoteEdges = ps.filter((p) => quoteTarget.has(p.uri)).length
    // Outsiders' engagement counts for less: a celebrity a member replied to is not the story.
    const outF = cfg.outsiderEngagementFactor ?? 0.25
    const totalE = ps.reduce((s, p) => s + metrics.get(p.uri).engagement * (p.member ? 1 : outF), 0)
    const lifts = ps.filter((p) => p.member).map((p) => metrics.get(p.uri).lift).sort((a, b) => b - a)
    const reposts = ps.reduce((s, p) => s + (memberReposts.get(p.uri) ?? 0), 0)

    const links = new Map()
    for (const p of ps) for (const l of p.links ?? []) links.set(l.url, linkInfo.get(l.url))
    const linkList = [...links.values()].sort((a, b) => b.members - a.members || b.posts - a.posts || (a.url < b.url ? -1 : 1))
    // Built: a link to a member's own domain or a build host is strong evidence; a merely new
    // domain is weak (news sites are new too) unless the post says it was built.
    const builtPosts = ps.filter((p) => p.member && builtRes.some((re) => re.test(p.text)))
    const builtAuthors = new Set(builtPosts.map((p) => p.authorDid))
    const announced = new Set(builtPosts.flatMap((p) => (p.links ?? []).map((l) => l.url)))
    const strong = new Set(linkList.filter((l) => l.ownDomain || l.buildHost || (l.isNewDomain && announced.has(l.url))).map((l) => l.domain))
    const weak = new Set(linkList.filter((l) => l.isNewDomain && !strong.has(l.domain)).map((l) => l.domain))
    const sharedBuild = linkList.some((l) => strong.has(l.domain) && l.members >= 2)
    for (const l of linkList) l.built = strong.has(l.domain)
    const builtRaw = 2 * Math.min(strong.size, 3) + 0.5 * Math.min(weak.size, 2) + (sharedBuild ? 2 : 0) + Math.min(builtAuthors.size, 3) * 0.75

    const storyPhrases = new Set()
    for (const p of ps) for (const t of phrasesInPost.get(p.uri) ?? []) storyPhrases.add(t)
    const burstRaw = Math.max(0, ...[...storyPhrases].map((t) => phraseTerms.get(t)?.score ?? 0))

    raw.push({
      ps, anchor, keyCount, members, authors, days, inStory, quoteEdges, linkList, storyPhrases, builtAuthors,
      components: {
        engagement: Math.log1p(totalE),
        lift: Math.max(0, lifts[0] ?? 0) * 0.7 + Math.max(0, lifts[1] ?? 0) * 0.3,
        breadth: Math.log2(members.size || 1),
        quotes: Math.log1p(quoteEdges),
        built: builtRaw,
        burst: maxPhraseScore > 0 ? burstRaw / maxPhraseScore : 0,
        runningBit: Math.max(0, days.length - 1),
        amplification: Math.log1p(reposts),
      },
      totals: { engagement: round(totalE), memberReposts: reposts },
    })
  }

  // ---- normalise and score
  const W = cfg.storyWeights
  const max = {}
  for (const k of Object.keys(W)) max[k] = Math.max(0, ...raw.map((r) => r.components[k] ?? 0))
  for (const r of raw) {
    let total = 0
    r.scores = {}
    for (const [k, w] of Object.entries(W)) {
      const v = r.components[k] ?? 0
      const norm = max[k] > 0 ? v / max[k] : 0
      r.scores[k] = { raw: round(v), norm: round(norm), weight: w }
      total += w * norm
    }
    if (r.members.size === 0) total *= cfg.nonMemberFactor ?? 0.5
    if (r.ps.length === 1) total *= cfg.singletonFactor ?? 1
    r.total = round(total)
  }

  const stories = raw.map((r) => shapeStory(r, { byUri, metrics, quoteTarget, context, memberReposts, cfg, phraseTerms, sensitivity, reach }))
  stories.sort((a, b) => b.scores.total - a.scores.total || (a.id < b.id ? -1 : 1))
  stories.forEach((s, i) => { s.rank = i + 1 })
  return stories
}

function kindOf(r) {
  const k = r.anchor[0]
  const built = r.linkList.some((l) => l.built)
  if (r.ps.length === 1) return built ? 'built' : 'post'
  if (k === 'W') return 'phrase'
  if (k === 'D' || ((k === 'L' || r.ps.length <= 12) && built)) return 'built'
  if (k === 'L') return 'link'
  if (r.quoteEdges >= Math.max(2, 0.25 * r.ps.length)) return 'quote-chain'
  return 'thread'
}

function reasons(r, { quoteTarget, byUri, phraseTerms }) {
  const out = []
  const threads = [...r.keyCount.entries()].filter(([k, n]) => k.startsWith('T:') && n >= 2)
  const replies = r.ps.filter((p) => p.reply).length
  if (threads.length === 1 && replies > 0) out.push(`${replies} ${replies === 1 ? 'reply' : 'replies'} in one thread`)
  else if (threads.length > 1) out.push(`${threads.length} threads joined by quotes or shared links`)
  if (r.quoteEdges > 0) out.push(`${r.quoteEdges} quote ${r.quoteEdges === 1 ? 'post' : 'posts'}`)
  for (const [k, n] of r.keyCount) {
    if (k.startsWith('L:')) out.push(`${n} posts share the link ${k.slice(2)}`)
    if (k.startsWith('D:')) out.push(`${n} posts link to ${k.slice(2)}, a domain not seen in the baseline`)
    if (k.startsWith('W:')) {
      const ph = phraseTerms.get(k.slice(2))
      out.push(`${n} separate posts use the phrase "${k.slice(2)}" (${ph?.authors ?? n} people in the window, ${ph?.ratio ? ph.ratio + 'x its usual rate' : 'no baseline'})`)
    }
  }
  if (r.members.size >= 2) out.push(`${r.members.size} cluster members took part`)
  if (r.days.length >= 3) out.push(`ran across ${r.days.length} days`)
  if (r.builtAuthors.size) out.push(`${r.builtAuthors.size} ${r.builtAuthors.size === 1 ? 'member says' : 'members say'} they built or shipped something`)
  if (r.ps.length === 1) out.push('a single post that stood out')
  return out
}

function summarizeContext(p) {
  if (!p) return null
  const out = { uri: p.uri, url: p.url, handle: p.handle, displayName: p.displayName, text: p.text, time: p.time, counts: p.counts }
  if (p.authorFollowers != null) out.authorFollowers = p.authorFollowers
  if (p.smallAccount) out.smallAccount = true
  if (p.sensitive?.length) out.sensitive = p.sensitive
  return out
}

function shapeStory(r, { byUri, metrics, quoteTarget, context, memberReposts, cfg, phraseTerms, sensitivity, reach }) {
  const scored = r.ps.map((p) => ({ p, m: metrics.get(p.uri) }))
  // Members first, then outsiders; best first within each.
  scored.sort((a, b) => Number(b.p.member) - Number(a.p.member) || b.m.score - a.m.score || (a.p.uri < b.p.uri ? -1 : 1))
  // The thread root (when we have it) leads; then the best posts.
  const anchorUri = r.anchor.startsWith('T:') ? r.anchor.slice(2) : null
  const lead = anchorUri && r.inStory.has(anchorUri) ? anchorUri : scored[0].p.uri
  const ordered = [scored.find((s) => s.p.uri === lead), ...scored.filter((s) => s.p.uri !== lead)]
  const maxPosts = cfg.maxPostsPerStory ?? 40

  const ctx = []
  if (anchorUri && !r.inStory.has(anchorUri) && context.has(anchorUri)) ctx.push(summarizeContext(context.get(anchorUri)))

  const lookup = (uri) => byUri.get(uri) ?? context.get(uri) ?? null
  const posts = ordered.slice(0, maxPosts).map(({ p, m }) => {
    const out = publicPost(p)
    out.metrics = m
    // Thread context for anything a writer might quote (bible R4): what it replied to.
    const parent = p.reply?.parent && p.reply.parent !== lead ? lookup(p.reply.parent) : null
    if (parent) out.inReplyTo = summarizeContext(parent)
    if (reach) out.reach = reach.post(p)
    if (memberReposts.get(p.uri)) out.memberReposts = memberReposts.get(p.uri)
    if (p._quoted && !r.inStory.has(p._quoted.uri)) out.quoted = summarizeContext(p._quoted)
    return out
  })
  const headlinePost = ctx[0] ?? posts[0]
  const leadPost = byUri.get(lead)
  const ctxPost = anchorUri && !r.inStory.has(anchorUri) ? context.get(anchorUri) : null
  const outOfBounds = storySensitivity(r.ps, [leadPost, ctxPost].filter(Boolean), sensitivity)
  const anchorKind = { T: 'thread', L: 'link', D: 'domain', W: 'phrase' }[r.anchor[0]]
  return {
    id: 's-' + shortHash(r.anchor, 10),
    rank: 0,
    kind: kindOf(r),
    headline: firstLine(headlinePost.text || (headlinePost.imageAlts?.[0] ? `(image) ${headlinePost.imageAlts[0]}` : '') || (headlinePost.quoted?.text ? `(quoting) ${headlinePost.quoted.text}` : '') || (headlinePost.hasVideo ? '(video)' : headlinePost.hasImages ? '(image)' : '(no text)'), 120),
    anchor: { kind: anchorKind, value: anchorKind === 'thread' ? (r.anchor.slice(2).startsWith('at://') ? r.anchor.slice(2) : 'hidden') : r.anchor.slice(2) },
    reason: reasons(r, { quoteTarget, byUri, phraseTerms }),
    outOfBounds,
    ...(reach ? { reach: reach.story(r.ps) } : {}),
    scores: { total: r.total, ...r.scores },
    stats: {
      posts: r.ps.length,
      authors: r.authors.size,
      members: r.members.size,
      engagement: r.totals.engagement,
      memberReposts: r.totals.memberReposts,
      quotePosts: r.quoteEdges,
      days: r.days,
    },
    links: r.linkList.slice(0, 10),
    phrases: [...r.storyPhrases].sort(),
    context: ctx,
    posts,
  }
}

const round = (x) => Math.round(x * 1000) / 1000

/** Is a domain a member's own (their handle is a custom domain and the link is on it)? */
export function ownDomainMatcher(handles) {
  const own = handles.map((h) => String(h ?? '').toLowerCase()).filter((h) => h.includes('.') && !h.endsWith('.bsky.social'))
  return (domain) => !!domain && own.some((h) => domain === h || domain.endsWith('.' + h))
}
