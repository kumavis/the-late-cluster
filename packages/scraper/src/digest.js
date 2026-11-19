// From collected posts to the digest object: consent filtering, baselines, phrase spikes,
// stories, appendices and stats. Pure given its inputs.

import { publicPost, engagement } from './normalize.js'
import { spikedPhrases, weekDeclarations } from './phrases.js'
import { authorBaselines, buildStories, postMetrics } from './stories.js'
import { compileTopics, topicsOf, postText } from './sensitivity.js'
import { buildsThisWeek } from './builds.js'
import { findShowPosts, correctionFlag, quotedLines } from './show.js'
import { gameResults, gameSegment } from './games.js'
import { performableThreads } from './threads.js'
import { makeReach } from './reach.js'
import { interviewCandidates } from './interview.js'
import { firstLine } from './text.js'
import { consentFlags } from './consent.js'
import { iso, utcDay } from './window.js'

const byTime = (a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1)

/**
 * @param {object} a
 * @param {Iterable} a.posts all normalized posts collected (any time)
 * @param {Set} a.memberDids
 * @param {Map} a.reposts uri -> Set of reposter DIDs
 * @param {object} a.window { label, start, end }
 * @param {number} a.baselineStart
 * @param {number} a.baselineWeeks
 * @param {Array} a.priorPosts posts from earlier weeks' posts.jsonl, if any
 * @param {Consent} a.consent
 * @param {object} a.scoring config.scoring
 * @param {Map} a.profiles did -> { handle, displayName, followersCount }
 * @param {Function} a.featured handle -> { previous, earlier, episodes } from the ledger
 * @param {object} a.safety config.safety
 * @param {object} a.show config.show
 */
export function analyze({ posts, memberDids, members = [], reposts = new Map(), window, baselineStart, baselineWeeks, priorPosts = [], consent, scoring, profiles = new Map(), featured = () => ({ previous: null, earlier: null, episodes: [], appearances: 0 }), safety = {}, show = {}, games = {}, completeThreads = new Set(), gaps = [] }) {
  const inWin = (p) => { const t = Date.parse(p.time); return t >= window.start && t < window.end }
  const inBase = (p) => { const t = Date.parse(p.time); return t >= baselineStart && t < window.start }

  // Learn every author before filtering, so a label seen anywhere applies everywhere.
  const all = [...posts]
  for (const p of all) consent.learnFromPost(p)
  // Which excluded accounts' display names are ordinary words in these posts.
  consent.calibrateNames(all)

  // Posts about the show, found before filtering: a request to be left out excludes its
  // author from everything that follows (bible R11).
  const rawWindow = all.filter(inWin)
  const showFound = findShowPosts(rawWindow, show, safety)
  const optOutRequests = []
  for (const r of showFound.requests) {
    if (consent.excludedDid(r.did) && !consent.showRequests.has(r.did)) continue
    consent.declareShowRequest(r.did, r.handle)
    if (!optOutRequests.some((x) => x.did === r.did)) optOutRequests.push(r)
  }
  consent.stats.showOptOutRequests = consent.showRequests.size

  const small = safety.smallAccountFollowers ?? 300
  const topics = compileTopics(safety.sensitivity?.topics, safety.sensitivity?.combinations)
  const annotate = (p) => {
    const f = profiles.get(p.authorDid)?.followersCount
    p.authorFollowers = Number.isFinite(f) ? f : null
    p.smallAccount = Number.isFinite(f) && f < small
    const fe = featured(p.authorDid, p.handle)
    if (fe.previous || fe.earlier) p.featured = { previous: fe.previous, earlier: fe.earlier }
    const t = topicsOf(postText(p), topics)
    if (t.length) p.sensitive = t
    if (p._quoted) {
      const qf = profiles.get(p._quoted.authorDid)?.followersCount
      p._quoted = { ...p._quoted, authorFollowers: Number.isFinite(qf) ? qf : null, smallAccount: Number.isFinite(qf) && qf < small }
    }
    return p
  }

  const windowPosts = []
  const removed = []
  const baselinePosts = []
  const context = new Map()
  // Posts withheld for being mainly about an excluded account: only the game section reads
  // them (a result it reports as "not included"); they are written nowhere.
  const withheld = []
  const seen = new Set()
  for (const raw of all.sort((a, b) => (a.uri < b.uri ? -1 : 1))) {
    if (seen.has(raw.uri)) continue
    seen.add(raw.uri)
    const w = inWin(raw)
    const kept = consent.filterPost(raw, { count: w, keepWithheld: true })
    if (kept?._withheld) withheld.push(kept)
    const p = kept?._withheld ? null : kept
    if (!p) {
      // Remember where a post was removed (never what or whose), for performable threads.
      removed.push({ threadKey: raw._threadKey, parent: raw.reply?.parent ?? null })
      continue
    }
    p.member = memberDids.has(p.authorDid)
    if (w || !inBase(p)) annotate(p)
    if (w) windowPosts.push(p)
    else {
      if (inBase(p)) baselinePosts.push(p)
      context.set(p.uri, p)
    }
  }
  for (const raw of priorPosts) {
    if (seen.has(raw.uri) || !raw.time || !inBase(raw)) continue
    seen.add(raw.uri)
    const p = consent.filterPost({ _threadKey: raw.reply?.root ?? raw.uri, ...raw }, { count: false })
    if (!p) continue
    p.member = memberDids.has(p.authorDid)
    baselinePosts.push(p)
  }

  const memberReposts = new Map()
  for (const [uri, set] of reposts) {
    const n = [...set].filter((d) => memberDids.has(d) && !consent.excludedDid(d)).length
    if (n) memberReposts.set(uri, n)
  }

  const memberWindow = windowPosts.filter((p) => p.member)
  const memberBase = baselinePosts.filter((p) => p.member)
  const baselines = authorBaselines([...windowPosts, ...baselinePosts], scoring.engagementWeights, { minPosts: scoring.baselineMinPosts ?? 5 })
  const { hasBaseline, phrases } = spikedPhrases(memberWindow, memberBase, baselineWeeks, scoring.phrases)
  const baselineDomains = new Set()
  for (const p of baselinePosts) for (const l of p.links ?? []) if (l.domain) baselineDomains.add(l.domain)

  const memberHandles = members.map((m) => m.handle).filter(Boolean)
  const memberReposters = new Map()
  for (const [uri, set] of reposts) memberReposters.set(uri, new Set([...set].filter((d) => memberDids.has(d) && !consent.excludedDid(d))))
  const reach = makeReach([...windowPosts, ...context.values()], memberReposters, (did) => profiles.get(did)?.followersCount ?? null, scoring.reach?.weights)
  const reachOf = (p) => reach.post(p)
  const stories = buildStories({ posts: windowPosts, baselines, phrases, baselineDomains, context, memberReposts, memberHandles, sensitivity: safety.sensitivity, reach, cfg: scoring })
  const inBounds = stories.filter((s) => !s.outOfBounds)
  const byUriAll = new Map(windowPosts.map((p) => [p.uri, p]))
  const lookup = (uri) => byUriAll.get(uri) ?? context.get(uri) ?? null

  // ---- appendices
  const metric = (p) => postMetrics(p, baselines, scoring)
  const activeAccounts = (() => {
    const by = new Map()
    for (const p of memberWindow) {
      let a = by.get(p.authorDid)
      if (!a) by.set(p.authorDid, (a = { did: p.authorDid, handle: p.handle, displayName: p.displayName, posts: 0, replies: 0, repliesToMembers: 0, engagement: 0, best: null, bestScore: -1 }))
      a.posts++
      if (p.reply) a.replies++
      const parentDid = p.reply?.parent?.split('/')[2]
      if (parentDid && parentDid !== p.authorDid && memberDids.has(parentDid)) a.repliesToMembers++
      a.engagement += engagement(p.counts, scoring.engagementWeights)
      const m = metric(p)
      if (m.score > a.bestScore) { a.bestScore = m.score; a.best = { uri: p.uri, url: p.url, text: firstLine(p.text, 100), counts: p.counts, ...consentFlags(p) } }
    }
    return [...by.values()]
      .map(({ bestScore, ...a }) => ({ ...a, engagement: Math.round(a.engagement) }))
      .sort((a, b) => b.posts - a.posts || b.engagement - a.engagement || (a.did < b.did ? -1 : 1))
      .slice(0, scoring.digest?.activeAccounts ?? 20)
  })()

  const links = (() => {
    const by = new Map()
    for (const p of windowPosts) for (const l of p.links ?? []) {
      let e = by.get(l.url)
      if (!e) by.set(l.url, (e = { url: l.url, title: l.title, domain: l.domain, posts: 0, authors: new Set(), members: new Set(), firstPost: null }))
      e.posts++
      e.title = e.title ?? l.title
      e.authors.add(p.authorDid)
      if (p.member) e.members.add(p.authorDid)
      if (!e.firstPost || byTime(p, e.firstPost) < 0) e.firstPost = p
    }
    return [...by.values()]
      .map((e) => ({
        url: e.url, title: e.title, domain: e.domain, posts: e.posts, authors: e.authors.size, members: e.members.size,
        newDomain: !baselineDomains.has(e.domain),
        firstPost: { url: e.firstPost.url, handle: e.firstPost.handle, time: e.firstPost.time },
      }))
      .filter((e) => e.members > 0)
      .sort((a, b) => b.members - a.members || b.authors - a.authors || b.posts - a.posts || (a.url < b.url ? -1 : 1))
      .slice(0, scoring.digest?.links ?? 30)
  })()

  const brief = (p, n = 280) => p && {
    uri: p.uri, url: p.url, handle: p.handle, displayName: p.displayName, text: firstLine(p.text, n), time: p.time, counts: p.counts, reach: reachOf(p),
    member: !!p.member, authorFollowers: p.authorFollowers ?? null, smallAccount: !!p.smallAccount, ...(p.sensitive ? { sensitive: p.sensitive } : {}), ...consentFlags(p),
  }
  const earliest = (ps) => [...ps].sort(byTime)[0]
  const share = (ps, f) => (ps.length ? ps.filter(f).length / ps.length : 0)
  const phraseList = phrases.map((ph) => {
    const ex = [...ph._posts].sort((a, b) => engagement(b.counts) - engagement(a.counts) || (a.uri < b.uri ? -1 : 1))[0]
    const sens = share(ph._posts, (p) => byUriAll.get(p.uri)?.sensitive) >= 0.3
    return {
      term: ph.term, variants: ph.variants, authors: ph.authors, posts: ph.posts, days: ph.days,
      per1k: ph.per1k, baselinePer1k: ph.baselinePer1k, baselineAuthors: ph.baselineAuthors,
      ratio: ph.ratio, isNew: ph.isNew, score: ph.score,
      outOfBounds: sens ? { topics: [...new Set(ph._posts.flatMap((p) => byUriAll.get(p.uri)?.sensitive ?? []))].sort() } : null,
      first: brief(byUriAll.get(earliest(ph._posts)?.uri), 200),
      example: ex ? { uri: ex.uri, url: ex.url, handle: ex.handle, text: firstLine(ex.text, 140), ...consentFlags(byUriAll.get(ex.uri) ?? ex) } : null,
    }
  })
  const weeks = weekDeclarations(memberWindow, scoring.weekDeclarations).map((w) => ({
    term: w.term, authors: w.authors, posts: w.posts, declared: w.declared,
    outOfBounds: share(w._posts, (p) => p.sensitive) >= 0.3 ? { topics: [...new Set(w._posts.flatMap((p) => p.sensitive ?? []))].sort() } : null,
    first: brief(w.first, 200),
  }))

  // ---- sections the bible asks for
  const storyOfUrl = new Map()
  for (const s of stories) for (const l of s.links) if (!storyOfUrl.has(l.url)) storyOfUrl.set(l.url, s.rank)
  // A post inside an out-of-bounds story carries the story's flag wherever it appears.
  const storyFlag = new Map()
  for (const st of stories) if (st.outOfBounds) for (const p of st.posts) storyFlag.set(p.uri, st.outOfBounds.topics)
  const builds = buildsThisWeek({ posts: windowPosts, lookup, memberHandles, baselineDomains, cfg: scoring, storyOfUrl, reachOf })
  for (const b of builds) {
    const inherited = [...new Set([b.builtBy?.uri, b.wish?.uri].flatMap((u) => storyFlag.get(u) ?? []))]
    if (inherited.length) b.outOfBounds = { topics: [...new Set([...(b.outOfBounds?.topics ?? []), ...inherited])].sort(), inFlaggedStory: true }
  }

  const aboutShow = {
    posts: windowPosts.filter((p) => showFound.about.has(p.uri)).sort(byTime).map((p) => ({
      ...brief(p, 400), why: showFound.about.get(p.uri), correction: correctionFlag(p.text, safety), quotesLines: quotedLines(p.text, safety),
      ...(p.reply?.parent && lookup(p.reply.parent) ? { inReplyTo: brief(lookup(p.reply.parent), 160) } : {}),
    })),
    // Handle and link only, so the reviewer can add them to config/optout.json. Their posts
    // are excluded from every other part of the digest.
    optOutRequests: optOutRequests.map((r) => ({ handle: r.handle, url: r.url })),
  }

  // ---- headline numbers
  const days = {}
  for (const p of windowPosts) { const d = utcDay(Date.parse(p.time)); days[d] = (days[d] ?? 0) + 1 }
  const top = memberWindow.filter((p) => !p.sensitive && !p.redacted).map((p) => ({ p, m: metric(p) }))
  const biggest = [...top].sort((a, b) => b.m.engagement - a.m.engagement || (a.p.uri < b.p.uri ? -1 : 1))[0]
  const breakout = [...top].filter((x) => x.p.member && x.m.engagement >= (scoring.breakoutMinEngagement ?? 10))
    .sort((a, b) => b.m.lift - a.m.lift || (a.p.uri < b.p.uri ? -1 : 1))[0]
  const describe = (p) => p.text?.trim() || (p.imageAlts?.[0] ? `(image: ${p.imageAlts[0]})` : p.hasVideo ? '(video)' : p.hasImages ? '(image)' : p._quoted?.text ? `(quoting) ${p._quoted.text}` : '')
  const headlineBrief = (x) => x && { uri: x.p.uri, url: x.p.url, handle: x.p.handle, displayName: x.p.displayName, text: firstLine(describe(x.p), 160), counts: x.p.counts, metrics: x.m, reach: reachOf(x.p), authorFollowers: x.p.authorFollowers, smallAccount: !!x.p.smallAccount, ...consentFlags(x.p) }

  // Voices the show has never featured, with a strong window: the strongest few members by
  // the sum of their three best post scores, out-of-bounds posts left out.
  const nv = show.newVoices ?? {}
  const memberPostsBy = new Map()
  for (const p of memberWindow) {
    if (p.sensitive || p.redacted) continue
    if (!memberPostsBy.has(p.authorDid)) memberPostsBy.set(p.authorDid, [])
    memberPostsBy.get(p.authorDid).push(p)
  }
  const newVoices = [...memberPostsBy.entries()]
    .filter(([did, ps]) => ps.length >= (nv.minPosts ?? 3) && featured(did, ps[0].handle).episodes.length === 0)
    .map(([did, ps]) => {
      const scored = ps.map((p) => ({ p, m: metric(p) })).sort((a, b) => b.m.score - a.m.score || (a.p.uri < b.p.uri ? -1 : 1))
      const strength = scored.slice(0, 3).reduce((x, y) => x + y.m.score, 0)
      const prof = profiles.get(did)
      return {
        did, handle: ps[0].handle, displayName: ps[0].displayName, followers: prof?.followersCount ?? null,
        small: Number.isFinite(prof?.followersCount) && prof.followersCount < small, postsInWindow: ps.length,
        strength: Math.round(strength * 1000) / 1000,
        top: scored.slice(0, nv.postsEach ?? 3).map(({ p, m }) => ({ ...brief(p, 400), imageAlts: p.imageAlts, links: p.links, quoted: p._quoted ? brief(p._quoted, 200) : null, metrics: m, reach: reachOf(p), ...(p.reply?.parent && lookup(p.reply.parent) ? { inReplyTo: brief(lookup(p.reply.parent), 160) } : {}) })),
      }
    })
    .sort((a, b) => b.strength - a.strength || (a.did < b.did ? -1 : 1))
    .slice(0, nv.count ?? 8)

  // Community games (config/games.json)
  const byHandle = new Map([...profiles.values()].map((p) => [String(p.handle ?? '').toLowerCase(), p]))
  const gameSections = (games.games ?? []).map((g) => {
    const gamePosts = [...windowPosts, ...context.values(), ...withheld].filter((p) => p.authorDid === g.account || String(p.handle ?? '').toLowerCase() === String(g.account).toLowerCase())
    const all = gameResults(gamePosts, g, { consent, profileByHandle: (h) => byHandle.get(h) ?? null, small })
    for (const r of all) {
      if (!r.winningPost) continue
      const t = topicsOf(r.winningPost.text, topics)
      const inStory = storyFlag.get(r.winningPost.uri)
      const merged = [...new Set([...t, ...(inStory ?? [])])]
      if (merged.length) r.winningPost.sensitive = merged
      if (inStory) r.winningPost.inFlaggedStory = true
    }
    const results = all.filter((r) => { const t = Date.parse(r.time); return t >= window.start && t < window.end })
    const personView = (h) => {
      const prof = byHandle.get(h)
      if (consent.excludedHandle(h) || (prof && consent.excludedDid(prof.did))) return { excluded: true }
      return { handle: h }
    }
    const segment = gameSegment(all, gamePosts, { window, game: g, personView })
    return { id: g.id, name: g.name ?? g.id, account: g.account, label: g.label ?? g.account, about: g.about ?? null, writerNote: g.writerNote ?? null, accountExcluded: consent.excludedHandle(g.account) || consent.excludedDid(g.account), results, segment }
  })

  // Interview material: real answers to real questions, both sides checked.
  const interview = interviewCandidates({ posts: windowPosts, lookup, featuredOf: featured, reachOf, profiles, small, cfg: show.interview })

  // Threads a writer could stage word for word.
  const performable = show.performableThreads?.count
    ? performableThreads({ posts: [...windowPosts, ...context.values()], removed: [...removed, ...gaps], complete: completeThreads, window, cfg: show.performableThreads })
    : { threads: [], considered: 0, rejected: {} }

  // Every author who appears, with the follower count the small-account rule needs and
  // whether the show featured them in the previous episode or an earlier one.
  const authorEntry = (p) => {
    const fe = featured(p.authorDid, p.handle)
    return { handle: p.handle, displayName: p.displayName, followers: p.authorFollowers, small: !!p.smallAccount, member: !!p.member, featuredPrevious: fe.previous, featuredEarlier: fe.earlier, timesFeatured: fe.appearances }
  }
  const authors = {}
  for (const p of windowPosts) {
    if (authors[p.authorDid]) continue
    authors[p.authorDid] = authorEntry(p)
  }
  for (const p of context.values()) {
    if (authors[p.authorDid] || inBase(p)) continue
    authors[p.authorDid] = authorEntry(p)
  }

  return {
    window: { label: window.label, kind: window.kind, start: iso(window.start), end: iso(window.end), baselineStart: iso(baselineStart), baselineWeeks, hasBaseline },
    overview: {
      posts: windowPosts.length,
      memberPosts: memberWindow.length,
      activeMembers: new Set(memberWindow.map((p) => p.authorDid)).size,
      clusterSize: memberDids.size,
      postsByDay: days,
      reachFormula: reach.formula,
      topStories: inBounds.slice(0, 5).map((s) => ({ id: s.id, rank: s.rank, kind: s.kind, headline: s.headline })),
      outOfBoundsWithin: 30,
      outOfBounds: stories.slice(0, 30).filter((s) => s.outOfBounds).map((s) => ({ id: s.id, rank: s.rank, headline: s.headline, topics: s.outOfBounds.topics })),
      spiking: phraseList.filter((p) => !p.outOfBounds).slice(0, 8).map((p) => p.term),
      built: builds.filter((b) => !b.outOfBounds).slice(0, 6).map((b) => ({ title: b.title, url: b.links[0].url, builtBy: b.builtBy.handle, wishBy: b.wish?.handle ?? null })),
      weeks: weeks.filter((w) => !w.outOfBounds).slice(0, 5).map((w) => w.term),
      biggestPost: headlineBrief(biggest),
      breakoutPost: headlineBrief(breakout),
    },
    stories,
    sections: { games: gameSections, built: builds, aboutShow, newVoices, interview, performableThreads: performable },
    authors,
    appendices: { activeAccounts, links, phrases: phraseList, weeks, runningBits: phraseList.filter((p) => p.days >= 3).map((p) => ({ term: p.term, days: p.days, authors: p.authors })) },
    members,
    posts: windowPosts.sort(byTime).map((p) => ({ ...publicPost(p), ...(memberReposts.get(p.uri) ? { memberReposts: memberReposts.get(p.uri) } : {}) })),
    counts: { windowPosts: windowPosts.length, baselinePosts: baselinePosts.length, contextPosts: context.size, priorPostsUsed: priorPosts.length },
  }
}
