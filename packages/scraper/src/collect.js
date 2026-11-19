// The network side: discover the cluster around the seeds, then fetch its posts.
// Every request goes through the polite client; every actor and post passes the consent
// filter's `check` before it can become a seed, member or thread to expand.

import * as api from './api.js'
import { Candidates, selectMembers } from './cluster.js'
import { normalizePost, mergePost, didOfUri } from './normalize.js'
import { WEEK } from './window.js'
import { personHandles } from './games.js'

export class PostStore {
  constructor(consent) {
    this.consent = consent
    this.posts = new Map()
    this.reposts = new Map() // uri -> Set of reposter DIDs
    this.gaps = [] // { threadKey, parent }: posts a thread view says exist but cannot show
  }

  add(view, source) {
    const p = normalizePost(view, { source })
    if (!p || !p.time) return null
    this.consent.learnFromPost(p)
    this.posts.set(p.uri, mergePost(this.posts.get(p.uri), p))
    if (p._quoted) {
      const q = { ...p._quoted, sources: ['quoted'] }
      if (q.time) this.posts.set(q.uri, mergePost(this.posts.get(q.uri), q))
    }
    return p
  }

  /** A getAuthorFeed / getFeed item: the post, its reply context, and who reposted it. */
  addFeedItem(item, source) {
    const p = this.add(item.post, source)
    if (item.reply?.root?.uri && item.reply.root.author) this.add(item.reply.root, 'context')
    if (item.reply?.parent?.uri && item.reply.parent.author) this.add(item.reply.parent, 'context')
    if (item.reason?.$type?.endsWith('reasonRepost') && item.reason.by?.did && p) {
      this.consent.check(item.reason.by)
      if (!this.reposts.has(p.uri)) this.reposts.set(p.uri, new Set())
      this.reposts.get(p.uri).add(item.reason.by.did)
    }
    return p
  }

  /** Add a thread's posts; `keep(view)` can skip replies (the root is always kept). */
  addThread(node, { keep = () => true } = {}, depth = 0, ctx = {}) {
    if (!node || depth > 12) return
    const root = ctx.root ?? node.post?.record?.reply?.root?.uri ?? node.post?.uri
    if (depth === 0) this.gaps = this.gaps.filter((g) => g.threadKey !== root) // a re-fetch replaces
    if (!node.post && /#(notFoundPost|blockedPost)$/.test(node.$type ?? '')) {
      if (ctx.parent) this.gaps.push({ threadKey: root, parent: ctx.parent })
      return
    }
    if (node.post && (depth === 0 || keep(node.post))) this.add(node.post, 'thread')
    for (const r of node.replies ?? []) this.addThread(r, { keep }, depth + 1, { root, parent: node.post?.uri })
  }
}

function threadAuthors(node, out = [], depth = 0) {
  if (!node || depth > 12) return out
  for (const r of node.replies ?? []) {
    if (r.post?.author) out.push(r.post.author)
    threadAuthors(r, out, depth + 1)
  }
  return out
}

/** The few profile fields kept: follower count is for the small-account rule (R7). */
const slimProfile = (p) => ({ did: p.did, handle: p.handle, displayName: p.displayName?.trim() || null, followersCount: p.followersCount ?? null })

export async function collect({ client, config, window, consent, log = () => {} }) {
  const { cluster } = config
  const col = cluster.collection
  const exp = cluster.expansion
  const warnings = []
  const store = new PostStore(consent)
  const cands = new Candidates()
  const baselineStart = window.start - col.baselineWeeks * WEEK
  const coverage = { authorsFetched: 0, windowTruncated: 0, baselineTruncated: 0 }

  // ---- 1. seeds
  const seedInputs = cluster.seeds.filter((s) => !consent.skipHandle(s))
  const skippedSeeds = cluster.seeds.length - seedInputs.length
  const profiles = (await api.soft(warnings, 'seed profiles', () => api.getProfiles(client, seedInputs))) ?? []
  const profileMap = new Map()
  const learnProfiles = (list) => {
    for (const p of list ?? []) {
      consent.checkProfile(p) // description is read here and then dropped
      profileMap.set(p.did, slimProfile(p))
    }
  }
  learnProfiles(profiles)
  const seeds = profiles.filter((p) => !consent.excludedDid(p.did) && !consent.check(p))
  const seedDids = new Set(seeds.map((s) => s.did))
  for (const s of seeds) cands.get(s.did, s)
  log(`seeds: ${seeds.map((s) => '@' + s.handle).join(' ')}${skippedSeeds ? ` (${skippedSeeds} opted out)` : ''}`)

  // ---- 2. who the seeds follow
  for (const s of seeds) {
    if (!s.followsCount) continue
    const res = await api.soft(warnings, `follows of a seed`, () => api.getFollows(client, s.did, { maxPages: exp.maxFollowPagesPerSeed }))
    for (const f of res?.items ?? []) if (!consent.check(f)) cands.follow(s.did, f)
  }

  // ---- 3. curated lists and starter packs
  const listUris = [...(cluster.lists ?? [])]
  for (const sp of cluster.starterPacks ?? []) {
    const res = await api.soft(warnings, `starter pack ${sp}`, () => api.getStarterPack(client, sp))
    if (res?.starterPack?.list?.uri) listUris.push(res.starterPack.list.uri)
  }
  for (const l of listUris) {
    const res = await api.soft(warnings, `list ${l}`, () => api.getList(client, l))
    for (const it of res?.items ?? []) if (it.subject && !consent.check(it.subject)) cands.get(it.subject.did, it.subject).listed = true
  }

  // ---- 4. community feeds
  for (const f of cluster.feeds ?? []) {
    const res = await api.soft(warnings, `feed ${f.uri}`, () => api.getFeed(client, f.uri, { maxPages: f.maxPages ?? 2 }))
    for (const it of res?.items ?? []) {
      const a = it.post?.author
      if (!a || consent.check(a)) continue
      cands.get(a.did, a).feedPosts++
      store.addFeedItem(it, 'feed')
    }
  }

  // ---- 5. search terms (window only)
  const search = cluster.search ?? {}
  let searchWorked = null
  if (search.enabled && search.terms?.length) {
    for (const term of search.terms) {
      const res = await api.soft(warnings, `search "${term}"`, () =>
        api.searchPosts(client, term, { since: window.start, until: window.end, maxPages: search.maxPagesPerTerm ?? 3, host: search.host }))
      if (!res) { searchWorked = searchWorked ?? false; continue }
      searchWorked = true
      for (const v of res.posts) {
        if (!v.author || consent.check(v.author)) continue
        cands.get(v.author.did, v.author).termPosts++
        store.add(v, 'search')
      }
    }
  }

  // ---- 6. seed feeds, which also tell us who the seeds talk to
  const fetchAuthor = async (did, label, { windowPages, baselinePages }) => {
    const items = []
    const w = await api.soft(warnings, `${label} window feed`, () =>
      api.getAuthorFeedRange(client, did, { since: window.start, until: window.end, maxPages: windowPages, seek: col.seekCursor }))
    if (w) { items.push(...w.items); if (!w.reachedSince) coverage.windowTruncated++ }
    if (baselinePages > 0 && col.baselineWeeks > 0) {
      const b = await api.soft(warnings, `${label} baseline feed`, () =>
        api.getAuthorFeedRange(client, did, { since: baselineStart, until: window.start, maxPages: baselinePages, seek: col.seekCursor }))
      if (b) { items.push(...b.items); if (!b.reachedSince) coverage.baselineTruncated++ }
    }
    coverage.authorsFetched++
    return items
  }

  for (const s of seeds) {
    const items = await fetchAuthor(s.did, 'a seed', { windowPages: col.maxWindowPagesPerAuthor, baselinePages: col.maxBaselinePagesPerAuthor })
    for (const it of items) {
      const p = store.addFeedItem(it, 'author')
      if (!p) continue
      const isRepost = it.reason?.$type?.endsWith('reasonRepost')
      if (isRepost) { if (it.post.author.did !== s.did) cands.interact(it.post.author, 'repostedBySeed'); continue }
      const parentA = it.reply?.parent?.author
      const rootA = it.reply?.root?.author
      if (parentA && parentA.did !== s.did) cands.interact(parentA, 'seedRepliedTo')
      if (rootA && rootA.did !== s.did && rootA.did !== parentA?.did) cands.interact(rootA, 'seedJoinedThread')
      if (p._quoted && p._quoted.authorDid !== s.did) cands.interact({ did: p._quoted.authorDid, handle: p._quoted.handle, displayName: p._quoted.displayName }, 'quotedBySeed')
      for (const m of p._mentions ?? []) if (m.did !== s.did) cands.interact({ did: m.did }, 'mentionedBySeed')
    }
  }

  // ---- 7. who replied to the seeds' busiest posts this week
  for (const s of seeds) {
    const own = [...store.posts.values()]
      .filter((p) => p.authorDid === s.did && !p.reply && p.counts.replies >= 2 && Date.parse(p.time) >= window.start && Date.parse(p.time) < window.end)
      .sort((a, b) => b.counts.replies - a.counts.replies || (a.uri < b.uri ? -1 : 1))
      .slice(0, exp.seedThreadsPerSeed ?? 5)
    for (const p of own) {
      const t = await api.soft(warnings, 'seed thread', () => api.getPostThread(client, p.uri, { depth: col.threadDepth }))
      if (!t) continue
      store.addThread(t, { keep: (v) => seedDids.has(v.author?.did) || (v.likeCount ?? 0) >= (col.threadOutsiderMinLikes ?? 0) })
      for (const a of threadAuthors(t)) if (a.did !== s.did && !consent.check(a)) cands.interact(a, 'repliedToSeed')
    }
  }

  // ---- 8. membership
  const excluded = (c) => consent.excludedDid(c.did) || consent.check({ did: c.did, handle: c.handle, labels: c.labels })
  const sel = selectMembers(cands, seedDids, exp, excluded)
  // Read every member's profile before fetching their posts: a description that opts out
  // removes them here, so their posts are never requested.
  const toProfile = sel.members.filter((m) => !profileMap.has(m.did)).map((m) => m.did)
  learnProfiles(await api.soft(warnings, 'member profiles', () => api.getProfiles(client, toProfile)))
  const bioExcluded = sel.members.filter((m) => consent.excludedDid(m.did)).length
  sel.members = sel.members.filter((m) => !consent.excludedDid(m.did))
  for (const m of sel.members) m.followersCount = profileMap.get(m.did)?.followersCount ?? null
  const memberDids = new Set(sel.members.map((m) => m.did))
  log(`cluster: ${sel.members.length} members (${sel.qualified} qualified of ${sel.considered} candidates, ${sel.cut} cut by the cap${bioExcluded ? `, ${bioExcluded} excluded by their profile` : ''})`)

  // Recurring guests who did not make the cluster this week still get their week fetched.
  const guestHandles = (config.show?.guests ?? []).filter((h) => !consent.skipHandle(h))
  const known = new Map([...profileMap.values()].map((p) => [String(p.handle).toLowerCase(), p.did]))
  const missingGuests = guestHandles.filter((h) => !known.has(h.toLowerCase().replace(/^@/, '')) && !h.startsWith('did:'))
  if (missingGuests.length) learnProfiles(await api.soft(warnings, 'guest profiles', () => api.getProfiles(client, missingGuests)))
  const guestDids = new Set()
  for (const h of guestHandles) {
    const did = h.startsWith('did:') ? h : [...profileMap.values()].find((p) => String(p.handle).toLowerCase() === h.toLowerCase().replace(/^@/, ''))?.did
    if (did && !consent.excludedDid(did)) guestDids.add(did)
  }
  const guestsExcluded = guestHandles.length - guestDids.size

  // ---- 9. member feeds: the whole window first, then as much baseline as the budget allows
  const others = sel.members.filter((m) => !m.seed)
  const reserve = (col.threadsToExpand ?? 0) + 5
  const pool = async (list, fn) => {
    let done = 0
    await Promise.all(list.map(async (m) => {
      await fn(m)
      if (++done % 40 === 0) log(`  ${done}/${list.length} (${client.stats.requests} requests)`)
    }))
  }
  log('member feeds: window')
  await pool(others, async (m) => {
    const items = await fetchAuthor(m.did, 'a member', { windowPages: col.maxWindowPagesPerAuthor, baselinePages: 0 })
    for (const it of items) store.addFeedItem(it, 'author')
  })
  const perAuthor = Math.floor((client.remaining() - reserve) / Math.max(1, others.length))
  const baselinePages = Math.max(0, Math.min(col.maxBaselinePagesPerAuthor, perAuthor))
  if (baselinePages < col.maxBaselinePagesPerAuthor) warnings.push(`budget: baseline limited to ${baselinePages} pages per member`)
  if (baselinePages > 0 && col.baselineWeeks > 0) {
    log(`member feeds: baseline (${baselinePages} pages each)`)
    await pool(others, async (m) => {
      const b = await api.soft(warnings, 'a member baseline feed', () =>
        api.getAuthorFeedRange(client, m.did, { since: baselineStart, until: window.start, maxPages: baselinePages, seek: col.seekCursor }))
      if (!b) return
      if (!b.reachedSince) coverage.baselineTruncated++
      for (const it of b.items) store.addFeedItem(it, 'author')
    })
  }
  const windowPages = col.maxWindowPagesPerAuthor

  for (const did of guestDids) {
    if (memberDids.has(did)) continue
    const items = await fetchAuthor(did, 'a guest', { windowPages: col.maxWindowPagesPerAuthor, baselinePages: 0 })
    for (const it of items) store.addFeedItem(it, 'author')
  }

  // ---- 10. expand the busiest conversations
  const inWin = (p) => { const t = Date.parse(p.time); return t >= window.start && t < window.end }
  const threadMembers = new Map()
  for (const p of store.posts.values()) {
    if (!inWin(p) || !memberDids.has(p.authorDid)) continue
    const k = p._threadKey
    if (!k?.startsWith('at://') || consent.excludedDid(didOfUri(k))) continue
    if (!threadMembers.has(k)) threadMembers.set(k, { members: new Set(), posts: 0 })
    const e = threadMembers.get(k)
    e.members.add(p.authorDid)
    e.posts++
  }
  const toExpand = [...threadMembers.entries()]
    .map(([k, e]) => ({ k, m: e.members.size, n: e.posts, replies: store.posts.get(k)?.counts.replies ?? 0 }))
    .filter((e) => e.m >= 2 || e.replies >= 5)
    .sort((a, b) => b.m - a.m || b.n - a.n || b.replies - a.replies || (a.k < b.k ? -1 : 1))
    .slice(0, col.threadsToExpand ?? 0)
  for (const e of toExpand) {
    const t = await api.soft(warnings, 'thread expansion', () => api.getPostThread(client, e.k, { depth: col.threadDepth }))
    if (t) store.addThread(t, { keep: (v) => memberDids.has(v.author?.did) || (v.likeCount ?? 0) >= (col.threadOutsiderMinLikes ?? 0) })
  }

  // ---- 10b. community games: the result accounts' posts in the window
  const gameHandles = []
  const games = config.games?.games ?? []
  for (const g of games) {
    if (consent.skipHandle(g.account)) continue
    learnProfiles(await api.soft(warnings, `game account ${g.id}`, () => api.getProfiles(client, [g.account])))
    const prof = [...profileMap.values()].find((p) => String(p.handle).toLowerCase() === g.account.toLowerCase())
    if (!prof || consent.excludedDid(prof.did)) continue
    const res = await api.soft(warnings, `game ${g.id} feed`, () =>
      api.getAuthorFeedRange(client, prof.did, { since: window.start, until: window.end, maxPages: g.maxPages ?? 2, seek: col.seekCursor }))
    const mine = []
    for (const it of res?.items ?? []) {
      const p = store.addFeedItem(it, 'game')
      if (p && p.authorDid === prof.did) mine.push(p)
    }
    gameHandles.push(...personHandles(mine, g))
  }

  const completeThreads = new Set()

  // ---- 11. profiles of everyone who can appear in the output: follower counts for the
  // small-account rule, and descriptions that opt out. Mentioned accounts are checked too,
  // so a mention of someone who opted out in their bio is redacted.
  const appearing = new Set()
  for (const p of store.posts.values()) {
    if (Date.parse(p.time) < baselineStart) continue
    appearing.add(p.authorDid)
    for (const m of p._mentions ?? []) appearing.add(m.did)
  }
  const unprofiled = [...appearing].filter((d) => d && !profileMap.has(d) && !consent.excludedDid(d)).sort()
  log(`profiles: ${unprofiled.length} more accounts`)
  learnProfiles(await api.getProfiles(client, unprofiled, { onError: (e) => warnings.push(`author profiles: a batch failed (${e.name === 'BudgetExhausted' ? 'request budget exhausted' : e.message})`) }))
  // People named in game results by handle only (a record holder, say).
  const knownHandles = new Set([...profileMap.values()].map((p) => String(p.handle).toLowerCase()))
  const namedOnly = [...new Set(gameHandles)].filter((h) => !knownHandles.has(h) && !consent.skipHandle(h)).sort()
  if (namedOnly.length) learnProfiles(await api.getProfiles(client, namedOnly, { onError: (e) => warnings.push(`game people profiles: ${e.message}`) }))

  return {
    profiles: profileMap, guestDids, guestsExcluded, completeThreads, gaps: store.gaps,
    seeds, members: sel.members, memberDids, store, warnings, coverage, baselineStart,
    selection: { considered: sel.considered, qualified: sel.qualified, cut: sel.cut, skippedSeeds },
    searchWorked,
    pagesPerMember: { window: windowPages, baseline: baselinePages },
    threadsExpanded: toExpand.length,
  }
}

/**
 * Fetch candidate threads whole (getPostThread), so a thread offered for performance is
 * complete. Called after a first analysis has picked the candidates.
 */
export async function completeThreads({ client, store, consent, roots, complete, warnings, profiles }) {
  const before = new Set(store.posts.keys())
  for (const r of roots) {
    if (complete.has(r) || consent.excludedDid(didOfUri(r))) continue
    const t = await api.soft(warnings, 'performable thread', () => api.getPostThread(client, r, { depth: 12 }))
    if (t?.post) { store.addThread(t); complete.add(r) }
  }
  // New authors and mentions from these threads get the same profile checks as everyone.
  const fresh = new Set()
  for (const [uri, p] of store.posts) {
    if (before.has(uri)) continue
    fresh.add(p.authorDid)
    for (const m of p._mentions ?? []) fresh.add(m.did)
  }
  const todo = [...fresh].filter((d) => d && !profiles.has(d) && !consent.excludedDid(d)).sort()
  for (const p of await api.getProfiles(client, todo, { onError: (e) => warnings.push(`thread profiles: ${e.message}`) })) {
    consent.checkProfile(p)
    profiles.set(p.did, slimProfile(p))
  }
}
