// "Built this week": the show's engine is that someone wishes for a thing out loud and it
// gets built. For each build: the link, who built it and when, who shared it, and the wish
// (the post the build answered: its parent, or the post it quoted), ranked by how good a
// story it makes rather than by engagement alone.

import { engagement } from './normalize.js'
import { compileBuiltPatterns, ownDomainMatcher } from './stories.js'
import { firstLine } from './text.js'

const hostMatches = (domain, patterns) =>
  !!domain && patterns.some((pat) => (pat.startsWith('*.') ? domain.endsWith(pat.slice(1)) || domain === pat.slice(2) : domain === pat || domain.endsWith('.' + pat)))

/**
 * @param {object} a
 * @param {Array} a.posts kept window posts (with member, sensitive, authorFollowers, smallAccount)
 * @param {(uri) => object|null} a.lookup any kept post by URI (window or context)
 * @param {Array<string>} a.memberHandles
 * @param {Set<string>} a.baselineDomains
 * @param {object} a.cfg scoring config (genericDomains, buildHosts, builtPatterns, builds)
 * @param {Map} a.storyOfUrl url -> story rank
 */
export function buildsThisWeek({ posts, lookup, memberHandles = [], baselineDomains = new Set(), cfg, storyOfUrl = new Map(), reachOf = () => null }) {
  const generic = cfg.genericDomains ?? []
  const hosts = cfg.buildHosts ?? []
  const builtRes = compileBuiltPatterns(cfg.builtPatterns)
  const memberOwn = ownDomainMatcher(memberHandles)
  const wishRes = (cfg.wishPatterns ?? []).map((x) => new RegExp(x, 'iu'))
  const looksLikeWish = (w, b) => {
    const t = w.text ?? ''
    if (wishRes.some((re) => re.test(t))) return true
    if ((w._mentions ?? []).some((m) => m.did === b.authorDid) || (b.handle && t.toLowerCase().includes('@' + b.handle.toLowerCase()))) return true
    return /\?\s*$/.test(t.trim())
  }
  const W = { wish: 3, wishByOther: 1, sharers: 1.5, engagement: 0.5, announced: 1, ownDomain: 1, reactions: 0.75, ...(cfg.builds?.weights ?? {}) }

  // candidate build links
  const byUrl = new Map()
  const sorted = [...posts].sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1))
  for (const p of sorted) {
    const announced = builtRes.some((re) => re.test(p.text ?? ''))
    for (const l of p.links ?? []) {
      if (!l.domain || hostMatches(l.domain, generic)) continue
      let path = ''
      try { path = new URL(l.url).pathname } catch {}
      if (/\/\.well-known\//.test(path)) continue // handle verification, not a build
      const own = memberOwn(l.domain) || ownDomainMatcher([p.handle])(l.domain)
      const host = hostMatches(l.domain, hosts)
      const fresh = !baselineDomains.has(l.domain)
      // A build host's front page (github.com, itch.io) is not a build; a path on it is.
      if (host && !own && (path === '/' || path === '') && !l.domain.split('.').slice(0, -2).length) continue
      if (!(own || host || (fresh && announced))) continue
      if (!byUrl.has(l.url)) byUrl.set(l.url, { link: { ...l }, posts: [], own, host })
      const e = byUrl.get(l.url)
      e.link.title = e.link.title || l.title
      e.posts.push({ p, announced })
    }
  }

  // one entry per builder post (a post can announce a site and its repo)
  const entries = new Map()
  for (const [url, e] of byUrl) {
    if (!e.posts.some(({ p }) => p.member)) continue // the cluster has to be involved
    // The builder: whoever announced it ("built it"), else whoever owns the domain, else
    // the first to post it.
    const ownPost = e.posts.find(({ p }) => ownDomainMatcher([p.handle])(e.link.domain))
    const builder = (e.posts.find(({ announced }) => announced) ?? ownPost ?? e.posts[0]).p
    const key = builder.uri
    if (!entries.has(key)) entries.set(key, { builder, links: [], sharers: new Map(), announced: false, own: false, host: false })
    const x = entries.get(key)
    x.links.push({ url, title: e.link.title, domain: e.link.domain, story: storyOfUrl.get(url) ?? null })
    x.announced ||= e.posts.some(({ p, announced }) => p.uri === builder.uri && announced)
    x.own ||= !!ownDomainMatcher([builder.handle])(e.link.domain) || e.own
    x.host ||= e.host
    for (const { p } of e.posts) if (p.authorDid !== builder.authorDid && !x.sharers.has(p.authorDid)) x.sharers.set(p.authorDid, p)
  }

  const brief = (p) => p && {
    uri: p.uri, url: p.url, handle: p.handle, displayName: p.displayName, authorDid: p.authorDid, text: p.text, time: p.time,
    counts: p.counts, reach: reachOf(p), member: !!p.member, authorFollowers: p.authorFollowers ?? null, smallAccount: !!p.smallAccount, sensitive: p.sensitive ?? [],
  }

  const out = []
  for (const x of entries.values()) {
    const b = x.builder
    // The wish: what the builder replied to or quoted. Skip the builder's own thread posts.
    // The wish: what the builder replied to or quoted, by someone else, and only if it reads
    // as asking for something (wishPatterns, a mention of the builder, or a question).
    // Otherwise it is only what the build replied to.
    let wish = null
    let inReplyTo = null
    const cands = [b.quote?.uri, b.reply?.parent, b.reply?.root].filter(Boolean)
    for (const uri of cands) {
      const w = lookup(uri)
      if (!w || w.authorDid === b.authorDid) continue
      if (looksLikeWish(w, b)) { wish = w; break }
      inReplyTo ??= w
    }
    const sharerList = [...x.sharers.values()].sort((a, c) => (a.time < c.time ? -1 : 1))
    const memberSharers = sharerList.filter((p) => p.member).length
    const reactions = (b.counts.replies ?? 0) + (b.counts.quotes ?? 0)
    // Only a real build answers a wish; a link someone merely shared is "in reply to".
    const isBuild = x.announced || x.own
    const parts = {
      wish: wish && isBuild ? 1 : 0,
      wishByOther: wish && isBuild && wish.authorDid !== b.authorDid ? 1 : 0,
      sharers: Math.log2(1 + memberSharers),
      engagement: Math.log1p(engagement(b.counts) + (wish ? engagement(wish.counts) : 0)),
      announced: x.announced ? 1 : 0,
      ownDomain: x.own ? 1 : 0,
      reactions: Math.log1p(reactions),
    }
    const score = Object.entries(parts).reduce((s, [k, v]) => s + (W[k] ?? 0) * v, 0)
    const sensitive = [...new Set([...(b.sensitive ?? []), ...(wish?.sensitive ?? [])])].sort()
    out.push({
      title: x.links[0].title || x.links[0].url.replace(/^https:\/\//, ''),
      kind: isBuild ? 'built' : 'shared',
      links: x.links.sort((a, c) => (a.url < c.url ? -1 : 1)),
      builtBy: brief(b),
      builtAt: b.time,
      announced: x.announced,
      wish: brief(wish),
      inReplyTo: wish ? null : brief(inReplyTo),
      sharedBy: sharerList.map((p) => ({ handle: p.handle, displayName: p.displayName, url: p.url, time: p.time, member: !!p.member, smallAccount: !!p.smallAccount })),
      score: Math.round(score * 1000) / 1000,
      scoreParts: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, Math.round(v * 1000) / 1000])),
      outOfBounds: sensitive.length ? { topics: sensitive } : null,
      headline: firstLine(b.text, 120),
    })
  }
  out.sort((a, c) => c.score - a.score || (a.builtBy.uri < c.builtBy.uri ? -1 : 1))
  return out.slice(0, cfg.builds?.max ?? 30)
}
