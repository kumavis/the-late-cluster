// The coverage report: is this the right community, and is it wide enough? Written with
// every run as coverage.md and as digest.json `coverage`, for the scope review (WORKFLOW
// stage 1). Counts and short samples only.

const pct = (x) => (Number.isFinite(x) ? `${Math.round(x * 100)}%` : 'n/a')
const share = (n, d) => (d ? n / d : 0)
const norm = (h) => String(h ?? '').toLowerCase()

/**
 * @param {object} a
 * @param {object} a.collected the collect() result
 * @param {object} a.digest the analyze() result (posts, stories, sections, authors)
 * @param {object} a.config the whole config
 * @param {object} a.seedPlan { mode, seeds, previousSeeds }
 * @param {object|null} a.previous { label, members } from the previous run
 * @param {object} a.run { requests, byEndpoint }
 * @param {object} a.consentStats
 */
export function buildCoverage({ collected: c, digest: d, config, seedPlan, previous, run = {}, consentStats = {}, ledger = null, frequent = [] }) {
  const T = { top10PostShare: 0.35, top10StoryShare: 0.4, seedPostShare: 0.15, seedStoryShare: 0.25, featuredStoryShare: 0.3, featuredBuiltShare: 0.3, rosterOverlapMin: 0.5, feedOverlapMin: 0.3, cutShareMax: 0.25, newMembersMin: 5, turnoverMax: 0.5, topStories: 30, sample: 8, ...(config.cluster.coverage?.thresholds ?? {}) }
  const ruleNames = config.cluster.expansion.ruleNames ?? []
  const members = c.members
  const memberSet = new Set(members.map((m) => m.did))
  const seedDids = new Set(members.filter((m) => m.seed).map((m) => m.did))
  const featured = (did) => { const a = d.authors?.[did]; return !!(a?.featuredPrevious || a?.featuredEarlier) }

  // ---- how members qualified
  const byRule = {}
  for (const m of members) {
    const name = m.rule === 'seed' ? 'seed' : ruleNames[m.rule] ?? `rule ${m.rule}`
    byRule[name] = (byRule[name] ?? 0) + 1
  }
  const signals = { followedByASeed: 0, interactedWithASeed: 0, onARoster: 0, inCommunityFeed: 0, onlyThroughSeeds: 0 }
  for (const m of members) {
    const s = m.signals ?? {}
    if (s.seedFollows > 0) signals.followedByASeed++
    if (s.interactions > 0) signals.interactedWithASeed++
    if (s.rosters?.length) signals.onARoster++
    if (s.feedPosts > 0) signals.inCommunityFeed++
    if (!m.seed && !s.rosters?.length && !s.feedPosts && !s.listed && !s.termPosts) signals.onlyThroughSeeds++
  }

  // ---- concentration
  const memberPosts = d.posts.filter((p) => p.member)
  const postsBy = new Map()
  for (const p of memberPosts) postsBy.set(p.authorDid, (postsBy.get(p.authorDid) ?? 0) + 1)
  const top10 = [...postsBy.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 10)
  const top10Set = new Set(top10.map(([did]) => did))
  const topStories = d.stories.slice(0, T.topStories)
  const leadOf = (s) => s.posts[0]?.authorDid
  const storyShare = (f) => share(topStories.filter((s) => f(leadOf(s))).length, topStories.length)
  const builds = d.sections?.built ?? []
  const builtShare = (f) => share(builds.filter((b) => f(b.builtBy?.authorDid)).length, builds.length)
  const postShare = (f) => share(memberPosts.filter((p) => f(p.authorDid)).length, memberPosts.length)
  const concentration = {
    memberPosts: memberPosts.length,
    topStoriesConsidered: topStories.length,
    builds: builds.length,
    top10: { posts: postShare((x) => top10Set.has(x)), topStories: storyShare((x) => top10Set.has(x)), built: builtShare((x) => top10Set.has(x)), accounts: top10.map(([did, n]) => ({ handle: d.authors?.[did]?.handle ?? did, posts: n })) },
    seeds: { posts: postShare((x) => seedDids.has(x)), topStories: storyShare((x) => seedDids.has(x)), built: builtShare((x) => seedDids.has(x)) },
    featuredBefore: { posts: postShare(featured), topStories: storyShare(featured), built: builtShare(featured), ledger: ledger?.found ? `${ledger.episodes.length} episode(s) in ${ledger.dir}` : 'no ledger: cannot tell' },
  }

  // ---- who is new, who fell out
  let change = null
  if (previous?.members?.length) {
    const prev = new Set(previous.members.map((m) => m.did))
    const prevHandle = new Map(previous.members.map((m) => [m.did, m.handle]))
    const joined = members.filter((m) => !prev.has(m.did))
    const left = [...prev].filter((did) => !memberSet.has(did))
    change = {
      previous: previous.label,
      joined: joined.length,
      left: left.length,
      stayed: members.length - joined.length,
      turnover: share(joined.length + left.length, members.length + prev.size),
      joinedSample: joined.slice(0, T.sample).map((m) => m.handle),
      leftSample: left.slice(0, T.sample).map((did) => prevHandle.get(did)),
    }
  }

  // ---- against independent signals
  const activeOutsiders = new Map()
  for (const p of d.posts) if (!p.member) activeOutsiders.set(p.authorDid, (activeOutsiders.get(p.authorDid) ?? 0) + 1)
  const handleOf = (did) => d.authors?.[did]?.handle ?? c.profiles?.get(did)?.handle ?? did
  const compare = (name, set, note) => {
    if (!set) return null
    const inBoth = members.filter((m) => set.has(m.did)).length
    const membersOnly = members.filter((m) => !set.has(m.did))
    const signalOnly = [...set].filter((did) => !memberSet.has(did))
    const mostActive = (dids) => [...dids].sort((a, b) => (activeOutsiders.get(b) ?? postsBy.get(b) ?? 0) - (activeOutsiders.get(a) ?? postsBy.get(a) ?? 0) || (a < b ? -1 : 1))
    return {
      name, note, size: set.size, inBoth, overlapOfMembers: share(inBoth, members.length),
      membersNotInIt: membersOnly.length, inItNotMembers: signalOnly.length,
      membersNotInItSample: mostActive(membersOnly.map((m) => m.did)).slice(0, T.sample).map(handleOf),
      inItNotMembersSample: mostActive(signalOnly).filter((did) => activeOutsiders.has(did)).slice(0, T.sample).map(handleOf),
      inItNotMembersActiveHere: signalOnly.filter((did) => activeOutsiders.has(did)).length,
    }
  }
  const independent = []
  for (const [id, set] of c.rosterSets ?? []) independent.push(compare(`roster: ${id}`, set, 'also used as a membership signal, so overlap is partly by construction'))
  if (c.feedAuthors?.size) independent.push(compare('community feed authors', c.feedAuthors, 'a ranked feed of current posts, so it reflects today more than the window'))
  const references = (config.cluster.references ?? []).map((r) => {
    const listed = [...(r.seeds ?? []), ...(r.hubs ?? [])].map(norm)
    const memberHandles = new Set(members.map((m) => norm(m.handle)))
    const found = listed.filter((h) => memberHandles.has(h))
    return { name: r.name, url: r.url ?? null, listed: listed.length, inCluster: found.length, missing: listed.filter((h) => !memberHandles.has(h)) }
  })

  // ---- the cap
  // Cost with a cold cache: author-feed calls (requests and cache hits) per account fetched.
  const authorFeedCalls = run.callsByEndpoint?.['app.bsky.feed.getAuthorFeed'] ?? run.byEndpoint?.['app.bsky.feed.getAuthorFeed'] ?? 0
  const fetched = c.coverage?.authorsFetched || members.length
  const perMember = fetched ? authorFeedCalls / fetched : 0
  const cap = {
    cap: config.cluster.expansion.maxMembers,
    qualified: c.selection.qualified,
    cut: c.selection.cut,
    cutShare: share(c.selection.cut, c.selection.qualified),
    requestsPerMember: Math.round(perMember * 10) / 10,
    costToIncludeAll: Math.round(perMember * c.selection.cut),
    cutSample: (c.selection.cutRows ?? []).slice(0, T.sample).map((r) => ({ handle: r.handle, rule: ruleNames[r.rule] ?? r.rule, score: r.score })),
  }

  // ---- seeds worth adding: central in this window's conversation inside the cluster, on a
  // roster, and talking with people outside the cluster (so following them widens the area)
  const partners = new Map()
  const outside = new Map()
  const addTo = (m, a, b) => { if (!m.has(a)) m.set(a, new Set()); m.get(a).add(b) }
  for (const p of d.posts) {
    for (const uri of [p.reply?.parent, p.quote?.uri]) {
      const t = uri?.split('/')[2]
      if (!t || t === p.authorDid) continue
      const aIn = memberSet.has(p.authorDid)
      const tIn = memberSet.has(t)
      if (aIn && tIn) { addTo(partners, p.authorDid, t); addTo(partners, t, p.authorDid) }
      else if (aIn && !tIn) addTo(outside, p.authorDid, t)
      else if (!aIn && tIn) addTo(outside, t, p.authorDid)
    }
  }
  const rostered = (did) => [...(c.rosterSets ?? new Map()).values()].some((set) => set.has(did))
  const seedSuggestions = members
    .filter((m) => !m.seed)
    .map((m) => {
      const inside = partners.get(m.did)?.size ?? 0
      const widen = outside.get(m.did)?.size ?? 0
      const onRoster = rostered(m.did)
      const score = inside + 0.5 * widen + (onRoster ? 3 : 0)
      return { did: m.did, handle: m.handle, inside, widen, onRoster, score: Math.round(score * 10) / 10 }
    })
    .sort((a, b) => b.score - a.score || (a.did < b.did ? -1 : 1))
    .slice(0, T.sample)
    .map((x) => ({ ...x, reason: `talked with ${x.inside} members in the window; with ${x.widen} accounts outside the cluster${x.onRoster ? '; on the Top Chicken roster' : ''}` }))

  // ---- what was excluded, in counts
  const excluded = { ...consentStats }

  // ---- worries, in plain words
  const worries = []
  const w = (cond, text) => { if (cond) worries.push(text) }
  w(concentration.top10.posts > T.top10PostShare, `The ten most active accounts wrote ${pct(concentration.top10.posts)} of member posts (threshold ${pct(T.top10PostShare)}): a few people dominate the material.`)
  w(concentration.top10.topStories > T.top10StoryShare, `${pct(concentration.top10.topStories)} of the top ${topStories.length} stories are led by the ten most active accounts (threshold ${pct(T.top10StoryShare)}).`)
  w(concentration.seeds.posts > T.seedPostShare, `The seeds wrote ${pct(concentration.seeds.posts)} of member posts (threshold ${pct(T.seedPostShare)}): the cluster may be the seeds' circle more than the community.`)
  w(concentration.seeds.topStories > T.seedStoryShare, `${pct(concentration.seeds.topStories)} of top stories are led by a seed (threshold ${pct(T.seedStoryShare)}).`)
  w(ledger?.found && concentration.featuredBefore.topStories > T.featuredStoryShare, `${pct(concentration.featuredBefore.topStories)} of top stories are led by accounts the show has featured (threshold ${pct(T.featuredStoryShare)}): variety is at risk.`)
  w(ledger?.found && concentration.featuredBefore.built > T.featuredBuiltShare, `${pct(concentration.featuredBefore.built)} of builds come from accounts the show has featured (threshold ${pct(T.featuredBuiltShare)}).`)
  w(!ledger?.found, 'No ledger was given, so the report cannot say how much material comes from accounts the show has featured.')
  for (const x of independent.filter(Boolean)) {
    const min = x.name.startsWith('roster') ? T.rosterOverlapMin : T.feedOverlapMin
    w(x.overlapOfMembers < min, `Only ${pct(x.overlapOfMembers)} of members are in the ${x.name} (threshold ${pct(min)}): the cluster may be drifting away from the community's own definition.`)
  }
  w(cap.cutShare > T.cutShareMax, `The cap cut ${cap.cut} of ${cap.qualified} qualified accounts (${pct(cap.cutShare)}, threshold ${pct(T.cutShareMax)}). Including them all would cost about ${cap.costToIncludeAll} more requests at this run's ${cap.requestsPerMember} per member.`)
  w(change && change.joined < T.newMembersMin, `Only ${change?.joined} accounts are new since ${change?.previous} (threshold ${T.newMembersMin}): the cluster may be frozen.`)
  w(change && change.turnover > T.turnoverMax, `Membership turned over ${pct(change?.turnover)} since ${change?.previous} (threshold ${pct(T.turnoverMax)}): the definition may be lurching.`)
  w(signals.onlyThroughSeeds > members.length / 2, `${signals.onlyThroughSeeds} of ${members.length} members qualified only through the seeds (no roster, feed or list signal): the cluster depends heavily on who the seeds are.`)
  for (const r of references) w(r.listed && r.inCluster / r.listed < 0.5, `Only ${r.inCluster} of the ${r.listed} accounts ${r.name} names are in the cluster.`)
  w(seedPlan.mode === 'show-follows' && (config.cluster.showFollows ?? 0) < 5, `The show's account follows ${config.cluster.showFollows ?? 0} account(s), so the seeds are mostly the bootstrap list. Following more people from the show's account widens the area; see the suggested seeds.`)

  return {
    thresholds: T,
    seeds: {
      mode: seedPlan.mode, showAccount: config.cluster.showAccount?.did ?? null, showFollows: config.cluster.showFollows ?? null,
      list: (config.cluster.seeds ?? []).map((s) => ({ did: s.did, handle: s.handle, reason: s.reason })),
      skipped: config.cluster.seedsSkipped ?? [], previousSeeds: seedPlan.previousSeeds ?? [], suggestions: seedSuggestions,
    },
    frequentlyFeatured: frequent.map((f) => ({ did: f.did, handle: f.handle, appearances: f.appearances, ofEpisodes: f.ofEpisodes, episodes: f.episodes })),
    size: { members: members.length, active: new Set(memberPosts.map((p) => p.authorDid)).size, candidates: c.selection.considered },
    byRule, signals, concentration, change, independent: independent.filter(Boolean), references, cap, excluded, worries,
  }
}

export function renderCoverage(cv, window) {
  const out = []
  out.push(`# Coverage: ${window.label}`)
  out.push('')
  out.push(`For the scope review: is this the community the show is about, and is it wide enough? Window ${window.start} to ${window.end}.`)
  out.push('')
  out.push('## Worries')
  out.push('')
  if (!cv.worries.length) out.push('None crossed a threshold (config/cluster.json coverage.thresholds).')
  for (const x of cv.worries) out.push(`- ${x}`)
  out.push('')
  out.push(`## Seeds (${cv.seeds.mode})`)
  out.push('')
  if (cv.seeds.showAccount) out.push(`The show's account (${cv.seeds.showAccount}) follows ${cv.seeds.showFollows ?? 'an unknown number of'} account(s); those are seeds alongside the bootstrap list.`, '')
  for (const s of cv.seeds.list) out.push(`- @${s.handle} (${s.did}): ${s.reason}`)
  const exclSeeds = cv.seeds.skipped.filter((s) => s.excluded).length
  for (const s of cv.seeds.skipped.filter((x) => !x.excluded)) out.push(`- not used: @${s.label ?? s.did} (${s.did ?? 'no DID'}): ${s.why}`)
  if (exclSeeds) out.push(`- ${exclSeeds} configured seed(s) not used: excluded by the consent rules`)
  if (cv.seeds.previousSeeds.length) out.push(`- previous seeds: ${cv.seeds.previousSeeds.map((h) => '@' + h).join(', ')}`)
  out.push('')
  out.push('**Suggested additional seeds**, for the owner to follow from the show\'s account or add to config (ranked by members they talked with in the window, plus half the accounts outside the cluster they talked with, plus 3 if on a roster):')
  out.push('')
  for (const x of cv.seeds.suggestions) out.push(`- @${x.handle} (${x.did}): ${x.reason}`)
  out.push('')
  out.push('## How members qualified')
  out.push('')
  out.push(`${cv.size.members} members (${cv.size.active} posted in the window), from ${cv.size.candidates} candidates.`)
  out.push('')
  for (const [k, v] of Object.entries(cv.byRule).sort((a, b) => b[1] - a[1])) out.push(`- ${k}: ${v}`)
  out.push('')
  out.push(`Signals among members: ${cv.signals.followedByASeed} followed by a seed, ${cv.signals.interactedWithASeed} talked with a seed, ${cv.signals.onARoster} on a roster, ${cv.signals.inCommunityFeed} in the community feed; ${cv.signals.onlyThroughSeeds} qualified only through the seeds.`)
  out.push('')
  out.push('## Concentration')
  out.push('')
  const c = cv.concentration
  out.push('| share of | member posts | top stories | builds |')
  out.push('|---|---:|---:|---:|')
  out.push(`| the ten most active accounts | ${pct(c.top10.posts)} | ${pct(c.top10.topStories)} | ${pct(c.top10.built)} |`)
  out.push(`| the seeds | ${pct(c.seeds.posts)} | ${pct(c.seeds.topStories)} | ${pct(c.seeds.built)} |`)
  out.push(`| accounts the show featured before | ${pct(c.featuredBefore.posts)} | ${pct(c.featuredBefore.topStories)} | ${pct(c.featuredBefore.built)} |`)
  out.push('')
  out.push(`Base: ${c.memberPosts} member posts, the top ${c.topStoriesConsidered} stories by lead author, ${c.builds} builds by builder. Ledger: ${c.featuredBefore.ledger}.`)
  out.push(`The ten most active: ${c.top10.accounts.map((a) => `@${a.handle} (${a.posts})`).join(', ')}.`)
  out.push('')
  out.push('## Featured before (the tracker)')
  out.push('')
  if (!cv.frequentlyFeatured.length) out.push('No account has been featured in more than one aired episode, or there is no ledger.')
  for (const f of cv.frequentlyFeatured) out.push(`- @${f.handle ?? f.did}: ${f.appearances} of ${f.ofEpisodes} aired episodes (${f.episodes.join(', ')})`)
  out.push('')
  out.push('## New and gone')
  out.push('')
  if (!cv.change) out.push('No earlier run to compare with.')
  else {
    out.push(`Since ${cv.change.previous}: ${cv.change.joined} joined, ${cv.change.left} left, ${cv.change.stayed} stayed (turnover ${pct(cv.change.turnover)}).`)
    if (cv.change.joinedSample.length) out.push(`- joined, for example: ${cv.change.joinedSample.map((h) => '@' + h).join(', ')}`)
    if (cv.change.leftSample.length) out.push(`- left, for example: ${cv.change.leftSample.map((h) => '@' + h).join(', ')}`)
  }
  out.push('')
  out.push('## Against independent signs of the community')
  out.push('')
  for (const x of cv.independent) {
    out.push(`- **${x.name}** (${x.size} accounts; ${x.note}): ${x.inBoth} members are in it (${pct(x.overlapOfMembers)} of members); ${x.membersNotInIt} members are not; ${x.inItNotMembers} of its accounts are not members, ${x.inItNotMembersActiveHere} of them active in this window's data.`)
    if (x.membersNotInItSample.length) out.push(`  - members not in it, most active first: ${x.membersNotInItSample.map((h) => '@' + h).join(', ')}`)
    if (x.inItNotMembersSample.length) out.push(`  - in it but not members, most active here first: ${x.inItNotMembersSample.map((h) => '@' + h).join(', ')}`)
  }
  for (const r of cv.references) {
    out.push(`- **${r.name}**${r.url ? ` (${r.url})` : ''}: ${r.inCluster} of the ${r.listed} accounts it names are members.${r.missing.length ? ` Not members: ${r.missing.map((h) => '@' + h).join(', ')}.` : ''}`)
  }
  out.push('')
  out.push('## The cap')
  out.push('')
  const k = cv.cap
  out.push(`${k.qualified} accounts qualified; the cap of ${k.cap} cut ${k.cut} (${pct(k.cutShare)}). This run needs ${k.requestsPerMember} author-feed requests per member with a cold cache (plus profiles and threads), so including every qualified account would cost about ${k.costToIncludeAll} more requests.`)
  if (k.cutSample.length) out.push(`Highest-scoring cuts: ${k.cutSample.map((r) => `@${r.handle} (${r.rule}, ${r.score})`).join(', ')}.`)
  out.push('')
  out.push('## Excluded, in counts')
  out.push('')
  const e = cv.excluded
  out.push(`- accounts: ${e.optedOutAccountsSeen ?? 0} opted out, ${e.noUnauthenticatedAccounts ?? 0} hidden from logged-out viewers, ${e.showOptOutRequests ?? 0} asked the show; ${e.bioNoteAccounts ?? 0} bios carry a repost note (not an exclusion)`)
  out.push(`- posts dropped: ${e.postsDroppedOptOut ?? 0} opt-out, ${e.postsDroppedNoUnauthenticated ?? 0} logged-out-hidden, ${e.postsDroppedShowRequest ?? 0} show request, ${Object.entries(e.postsDroppedLabel ?? {}).map(([l, n]) => `${n} ${l}`).join(', ') || '0 by label'}`)
  out.push(`- removed from others' posts: ${e.quotesStripped ?? 0} quoted posts, ${e.replyLinksHidden ?? 0} reply links, ${e.mentionsRedacted ?? 0} posts with an excluded account's name redacted, ${e.postsWithheldNamingExcluded ?? 0} withheld as mainly about one`)
  if (cv.tagged?.line) out.push(`- ${cv.tagged.line}`)
  out.push('')
  return out.join('\n')
}
