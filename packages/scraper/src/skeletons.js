// Card skeletons and lane slices (workflow v3, stage 2; trial 002, findings 7, 8, 10, 11, 12).
//
// The scraper does the copying. For every story in the window, a skeleton holds the
// posts in order with their exact text, author, counts, what they replied to and quoted,
// alt text and media addresses, and marks post by post. A researcher chooses skeletons and
// adds prose; nobody retypes a post. Each lane gets a ranked slice of skeleton ids, and a
// story appears once however many lanes it suits.
//
// Pure given its inputs: the same digest gives the same files.

import { firstLine } from './text.js'
import { answerPairs } from './interview.js'

export const SKELETON_FORMAT = 'late-cluster-skeleton/1'
export const INDEX_FORMAT = 'late-cluster-skeletons/1'
export const LANE_FORMAT = 'late-cluster-lane/1'
export const LANES = ['made', 'talk', 'games', 'voices', 'interview', 'tagged']

const byTime = (a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1)
const compile = (list = []) => list.map((x) => new RegExp(x, 'iu'))
const round = (x) => Math.round(x * 1000) / 1000
const clip = (s, n) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim()
  return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + ' …' : t
}

const slimMedia = ({ kind, url, thumb, alt, hasAlt }) => ({ kind, url, thumb, alt, hasAlt })

/**
 * A skeleton as text: the header indented, each post on one line, so a reader can take a
 * few posts at a time and the file stays small.
 */
export function stringifySkeleton(sk) {
  const { posts, context, ...head } = sk
  const h = JSON.stringify(head, null, 1).replace(/\n\}$/, '')
  const arr = (name, list) => `,\n "${name}": [${list.length ? '\n' + list.map((x) => '  ' + JSON.stringify(x)).join(',\n') + '\n ' : ''}]`
  return h + arr('context', context ?? []) + arr('posts', posts ?? []) + '\n}\n'
}

/** The index as text: the header indented, one story per line. */
export function stringifyIndex(ix) {
  const { skeletons, ...head } = ix
  return JSON.stringify(head, null, 1).replace(/\n\}$/, '') + `,\n "skeletons": [\n${skeletons.map((x) => '  ' + JSON.stringify(x)).join(',\n')}\n ]\n}\n`
}

/** A post's marks, or null: `sensitive` (keyword topics) and `consent` (reasons). */
export function marksOf(p) {
  const m = {}
  if (p?.sensitive?.length) m.sensitive = [...p.sensitive]
  if (p?.consent?.length) m.consent = [...p.consent]
  return Object.keys(m).length ? m : null
}

/** Is this account a bot: the self-label, a game account, the config list, or its bio. */
export function botTest({ profiles = new Map(), bios = new Map(), games = [], cfg = {} } = {}) {
  const res = compile(cfg.bioPatterns)
  const listed = new Set([...(cfg.accounts ?? []), ...games.map((g) => g.account)].filter(Boolean).map((x) => String(x).toLowerCase()))
  return (did, authorLabels = []) => {
    if (!did) return false
    if (listed.has(did.toLowerCase()) || listed.has(String(profiles.get(did)?.handle ?? '').toLowerCase())) return true
    const labels = [...(profiles.get(did)?.labels ?? []), ...authorLabels]
    if (labels.includes('bot')) return true
    const bio = bios.get(did)?.description ?? ''
    return !!bio && res.some((re) => re.test(bio))
  }
}

/**
 * @param {object} a
 * @param {object} a.d the result of analyze(): stories (with their posts), postsByUri, context, authors, sections, reachOf, metricOf
 * @param {object} a.window the digest's window ({ label, start, end })
 * @param {Map} a.profiles did -> slim profile (followersCount, labels)
 * @param {Map} a.bios did -> private profile (description), read only for the bot test
 * @param {Set} a.memberDids
 * @param {Set} a.bioReview DIDs marked for an auditor
 * @param {Function} a.featured (did, handle) -> { previous, earlier, appearances }
 * @param {object} a.config the loaded config (lanes, safety, show, games)
 */
export function buildSkeletons({ d, window, profiles = new Map(), bios = new Map(), memberDids = new Set(), bioReview = new Set(), featured = () => ({ previous: null, earlier: null, appearances: 0 }), config, outside = false }) {
  const L = config.lanes ?? {}
  const small = config.safety?.smallAccountFollowers ?? 300
  const games = config.games?.games ?? []
  const isBot = botTest({ profiles, bios, games, cfg: L.bots })
  const lineChars = L.lineChars ?? 90
  const lookup = (uri) => d.postsByUri.get(uri) ?? d.context.get(uri) ?? null

  // ---- people
  const authorOf = (did, handle, displayName, labels = []) => {
    const a = d.authors?.[did] ?? {}
    const prof = profiles.get(did)
    const followers = a.followers ?? prof?.followersCount ?? null
    const fe = a.featuredPrevious !== undefined ? { previous: a.featuredPrevious, earlier: a.featuredEarlier, appearances: a.timesFeatured ?? 0 } : featured(did, handle)
    return {
      did, handle: handle ?? a.handle ?? prof?.handle ?? null, displayName: displayName ?? a.displayName ?? prof?.displayName ?? null,
      followers, member: memberDids.has(did), small: Number.isFinite(followers) && followers < small, bot: isBot(did, labels),
      pronouns: a.pronouns !== undefined ? a.pronouns : prof?.pronouns ?? null, ...(a.pronounsReview || prof?.pronounsReview ? { pronounsReview: true } : {}),
      featuredPrevious: fe.previous ?? null, featuredEarlier: fe.earlier ?? null, timesFeatured: fe.appearances ?? 0,
      ...(bioReview.has(did) ? { bioReview: true } : {}),
    }
  }
  const brief = (p, inStory) => {
    // A parent or quoted post in the same skeleton is pointed at, not repeated.
    if (inStory.has(p.uri)) return { uri: p.uri, handle: p.handle, inStory: true }
    const out = { uri: p.uri, url: p.url, handle: p.handle, displayName: p.displayName ?? null, text: p.text ?? '', time: p.time, inStory: inStory.has(p.uri) }
    const a = authorOf(p.authorDid, p.handle, p.displayName, p._authorLabels)
    out.author = { did: a.did, followers: a.followers, member: a.member, small: a.small, bot: a.bot, pronouns: a.pronouns }
    if (p.media?.length) out.media = p.media.map(slimMedia)
    if (p.redacted) out.redacted = true
    Object.assign(out, marksOf(p) ?? {})
    return out
  }

  // ---- posts
  const skPost = (p, inStory) => {
    const out = {
      uri: p.uri, url: p.url, handle: p.handle, time: p.time,
      text: p.text ?? '',
      hasText: !!String(p.text ?? '').trim(),
      author: authorOf(p.authorDid, p.handle, p.displayName, p._authorLabels),
      counts: p.counts,
      reach: (({ score, participants }) => ({ score, participants }))(d.reachOf(p) ?? {}),
      replyTo: null,
      quoted: null,
    }
    if (p.reply) {
      if (p.reply.hidden) out.replyTo = { hidden: true, note: 'replies to a post the consent rules leave out' }
      else {
        const q = lookup(p.reply.parent)
        out.replyTo = q ? brief(q, inStory) : { uri: p.reply.parent, inStory: inStory.has(p.reply.parent), note: 'not in the digest' }
        if (p.reply.root && p.reply.root !== p.reply.parent) out.root = p.reply.root
      }
    }
    if (p.quote) {
      if (p.quote.state === 'removed') out.quoted = { state: 'removed', note: 'the quoted post is left out by the consent or label rules' }
      else if (p._quoted) out.quoted = { ...brief(lookup(p._quoted.uri) ?? p._quoted, inStory), state: 'ok' }
      else out.quoted = { uri: p.quote.uri, state: p.quote.state }
    }
    if (p.links?.length) out.links = p.links
    out.media = (p.media ?? []).map(slimMedia)
    if (p.embedded) out.embedded = p.embedded
    if (p.redacted) out.redacted = true
    if (p.addressedToShow) out.addressedToShow = true
    Object.assign(out, marksOf(p) ?? {})
    return out
  }

  // ---- lanes, per story
  const madeRes = compile(L.made?.patterns)
  const gameRes = compile([...(L.games?.patterns ?? []), ...games.map((g) => g.name).filter(Boolean).map((n) => `\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)])
  const gameIds = new Set(games.map((g) => String(g.account).toLowerCase()))
  const isGamePost = (p) => gameIds.has(String(p.authorDid).toLowerCase()) || gameIds.has(String(p.handle ?? '').toLowerCase())
  const winning = new Map()
  for (const g of d.sections?.games ?? []) for (const r of g.results ?? []) if (r.winningPost?.uri) winning.set(r.winningPost.uri, { game: g.id, time: r.time })
  const buildOf = new Map()
  for (const b of d.sections?.built ?? []) if (b.builtBy?.uri) buildOf.set(b.builtBy.uri, b)
  const linkInfo = (s) => new Map((s.links ?? []).map((l) => [l.url, l]))
  // Evidence that this member made the thing: their own build in Built this week, a link to
  // their own site, a link that counts as built and that they say they made, a video, or a
  // picture they say they made. Sharing someone else's repository is not making it.
  const madeEvidence = (p, links) => {
    if (!memberDids.has(p.authorDid) || p.redacted) return null
    const b = buildOf.get(p.uri)
    if (b && b.kind === 'built') return 'in Built this week'
    const mine = (p.links ?? []).map((l) => links.get(l.url)).filter(Boolean)
    if (mine.some((l) => l.ownDomain)) return 'a link to their own site'
    const text = [p.text, ...(p.imageAlts ?? [])].join('\n')
    const says = madeRes.some((re) => re.test(text))
    if (says && mine.some((l) => l.built)) return 'a built link they say they made'
    if (p.hasVideo || p.media?.some((m) => m.kind === 'video')) return 'a video'
    if (says && (p.media?.length || p.hasImages)) return 'a picture of something made'
    if (says && p.links?.some((l) => !/(^|\.)bsky\.app$/.test(l.domain ?? ''))) return 'a link they say they made'
    return null
  }

  const wrote = []
  const skipped = { noMember: 0, aboutShow: 0 }
  const index = []
  const files = new Map()
  const storyOfPost = new Map()
  const laneRows = { made: [], talk: [], games: [] }
  for (const s of d.stories) {
    const all = [...(s._posts ?? s.posts)]
    // Posts about the show go to reviewers only. A story about the show can still hold other
    // threads, joined to it by quotes or links; those are written without it.
    if (s.aboutShow) skipped.aboutShow++
    if (s.aboutShow && !all.some((p) => !p.aboutShow)) continue
    if (!all.some((p) => memberDids.has(p.authorDid))) skipped.noMember++
    const kept = all.filter((p) => !p.aboutShow).sort(byTime)
    const removedAboutShow = all.length - kept.length
    const inStory = new Set(kept.map((p) => p.uri))
    const leadUri = (s.posts.find((p) => !p.aboutShow) ?? kept[0])?.uri
    const headline = s.aboutShow || lookup(s.posts[0]?.uri)?.aboutShow ? firstLine(lookup(leadUri)?.text || '(no text)', 120) : s.headline
    const members = new Set(kept.filter((p) => memberDids.has(p.authorDid)).map((p) => p.authorDid))
    const marks = {
      postsMarked: kept.filter((p) => p.sensitive?.length).length,
      leadMarked: !!lookup(leadUri)?.sensitive?.length,
      topics: s.sensitivity?.counts ?? {},
      consentMarked: kept.filter((p) => p.consent?.length).length,
      leadConsent: !!lookup(leadUri)?.consent?.length,
      hint: s.sensitivity?.hint ?? [],
    }
    const excluded = s.outOfBounds ? { rule: s.outOfBounds.rule ?? 'R11', reasons: s.outOfBounds.reasons ?? [] } : null

    // lane hints
    const lanes = []
    let made = null
    // A thread fetched only because a member pointed at it (README "The tagged lane") is in no
    // lane but `tagged`, which the lane builder adds.
    if (!excluded && !outside) {
      const links = linkInfo(s)
      const makers = new Map()
      for (const p of kept) {
        const why = madeEvidence(p, links)
        if (why && !p.sensitive?.length && !p.consent?.length) { if (!makers.has(p.authorDid)) makers.set(p.authorDid, { did: p.authorDid, handle: p.handle, evidence: new Set(), posts: [] }); const m = makers.get(p.authorDid); m.evidence.add(why); m.posts.push(p.uri) }
      }
      if (makers.size) {
        const ev = new Set([...makers.values()].flatMap((m) => [...m.evidence]))
        const build = kept.map((p) => buildOf.get(p.uri)).find(Boolean)
        const video = kept.some((p) => makers.has(p.authorDid) && (p.hasVideo || p.media?.some((m) => m.kind === 'video')))
        const score = s.scores.total + (ev.has('in Built this week') || ev.has('a link to their own site') || ev.has('a built link they say they made') ? 1.5 : 0) + (video ? 1 : 0) + (ev.has('a picture of something made') ? 0.5 : 0) + (build?.wish ? 1 : 0)
        made = { makers: [...makers.values()].map((m) => ({ did: m.did, handle: m.handle, evidence: [...m.evidence].sort(), posts: m.posts })), score }
        const why = `${[...ev].sort().join(', ')} by ${[...makers.values()].map((m) => '@' + m.handle).join(', ')}${build?.wish ? `; answers a wish by @${build.wish.handle}` : ''}`
        lanes.push({ lane: 'made', why })
        laneRows.made.push({ s, score, why })
      }
      const isPhrase = s.kind === 'phrase' || (s.phrases?.length && members.size >= 2)
      if ((kept.length >= (L.talk?.minPosts ?? 4) && members.size >= (L.talk?.minMembers ?? 3)) || isPhrase) {
        const why = `${s.kind === 'phrase' ? `a phrase several people used ("${s.phrases[0] ?? ''}")` : s.kind === 'quote-chain' ? 'a quote chain' : 'a conversation'}, ${members.size} members${s.stats.days?.length > 2 ? `, across ${s.stats.days.length} days` : ''}`
        lanes.push({ lane: 'talk', why })
        laneRows.talk.push({ s, score: s.scores.total, why })
      }
      const fromGame = kept.some(isGamePost)
      const win = kept.find((p) => winning.has(p.uri))
      const talksGame = kept.some((p) => gameRes.some((re) => re.test(p.text ?? '')))
      if (fromGame || win || talksGame) {
        const why = win ? `holds a winning post (${winning.get(win.uri).game}, ${winning.get(win.uri).time.slice(0, 10)})` : fromGame ? "has the game account's posts" : 'talks about scores, records or bets'
        const score = (win ? 3 : 0) + (fromGame ? 2 : 0) + s.scores.total
        lanes.push({ lane: 'games', why })
        laneRows.games.push({ s, score, why })
      }
    }

    const people = new Set(kept.map((p) => p.authorDid))
    const ctx = (s.context ?? []).map((c) => lookup(c.uri)).filter(Boolean)
    const sk = {
      format: SKELETON_FORMAT,
      id: s.id,
      rank: s.rank,
      window: window.label,
      kind: s.kind,
      headline: excluded ? null : headline,
      lanes,
      ...(outside ? { outsideCluster: true, note: 'fetched only because a member of the cluster pointed at it; outside the cluster, in no lane but tagged' } : {}),
      ...(made ? { makers: made.makers } : {}),
      reason: excluded ? [] : s.reason,
      stats: { posts: kept.length, authors: people.size, members: members.size, days: s.stats.days, quotePosts: s.stats.quotePosts, memberReposts: s.stats.memberReposts },
      reach: s.reach ? { score: s.reach.score, likes: s.reach.likes, reposts: s.reach.reposts, quotes: s.reach.quotes, replies: s.reach.replies, participants: s.reach.participants, formula: d.overview?.reachFormula ?? null, note: 'not views: Bluesky publishes none' } : null,
      marks,
      excluded,
      links: excluded ? [] : (s.links ?? []).map(({ url, title, domain, members, built }) => ({ url, title, domain, members, built })),
      phrases: excluded ? [] : s.phrases,
      ...(removedAboutShow ? { omitted: { aboutShow: removedAboutShow, note: 'posts about the show are for reviewers only' } } : {}),
      ...(s.aboutShow ? { note: 'the rest of a story whose lead is about the show; what is about the show is for reviewers only' } : {}),
      context: excluded ? [] : ctx.map((p) => skPost(p, inStory)),
      posts: excluded ? [] : kept.map((p) => skPost(p, inStory)),
    }
    if (excluded) sk.withheld = { posts: kept.length, note: 'left out whole by the consent rules; no post may be used' }
    files.set(s.id, sk)
    for (const p of kept) storyOfPost.set(p.uri, s.id)
    wrote.push(s.id)
    index.push({
      id: s.id, rank: s.rank, kind: s.kind, headline: sk.headline,
      posts: kept.length, members: members.size, authors: people.size,
      reach: s.reach?.score ?? null,
      lanes: lanes.map((x) => x.lane),
      postsMarked: marks.postsMarked, leadMarked: marks.leadMarked, consentMarked: marks.consentMarked,
      excluded: !!excluded,
      ...(outside ? { outsideCluster: true } : {}),
      media: kept.reduce((n, p) => n + (p.media?.length ?? 0), 0),
      file: `skeletons/${s.id}.json`,
    })
  }

  // ---- lane slices
  const line = (s, why) => {
    const sk = files.get(s.id)
    const lead = sk.marks.leadMarked ? `(lead post marked: ${Object.keys(sk.marks.topics).join(', ')})` : clip(sk.headline, lineChars)
    return `${lead} — ${why}; ${sk.stats.posts} posts, ${sk.stats.members} members, reach ${s.reach?.score ?? '?'}${sk.marks.postsMarked ? `, ${sk.marks.postsMarked} posts marked` : ''}`
  }
  const storyEntries = (rows, limit) => rows.sort((a, b) => b.score - a.score || (a.s.id < b.s.id ? -1 : 1)).slice(0, limit).map((r, i) => ({ rank: i + 1, id: r.s.id, line: line(r.s, r.why), score: round(r.score) }))
  const lanes = {}
  lanes.made = { format: LANE_FORMAT, lane: 'made', window: window.label, rule: "Stories where a member made something and showed it: their own build in Built this week, a link to their own site, a built link they say they made, a video, or a picture or link they say they made. Ranked by the story's score plus the strength of that evidence (a built link, a video, an answered wish).", entries: storyEntries(laneRows.made, L.made?.limit ?? 60) }
  lanes.talk = { format: LANE_FORMAT, lane: 'talk', window: window.label, rule: `Conversations and running bits: at least ${L.talk?.minPosts ?? 4} posts from at least ${L.talk?.minMembers ?? 3} members, or a spiked phrase. Ranked by the story's score.`, entries: storyEntries(laneRows.talk, L.talk?.limit ?? 60) }

  // games: the stories, and the standings with which results may be named
  const gameSlices = (d.sections?.games ?? []).map((g) => {
    const seg = g.segment ?? {}
    const winnersInWindow = new Set((seg.standings ?? []).map((x) => x.winner?.handle).filter(Boolean))
    return {
      id: g.id, name: g.name, account: g.label ?? g.account, about: g.about, writerNote: g.writerNote,
      standings: (seg.standings ?? []).map((x) => {
        const wp = x.winningPost
        const wpMarks = wp ? { ...(wp.sensitive?.length ? { sensitive: wp.sensitive } : {}), ...(wp.consent?.length ? { consent: wp.consent } : {}), ...(wp.redacted ? { consent: ['redacted'] } : {}) } : {}
        return {
          time: x.time, likes: x.likes, ofRecord: x.ofRecord ?? null, rankInHistory: x.rankInHistory ?? null,
          winner: x.winner?.excluded ? { excluded: true } : x.winner ? { did: x.winner.did, handle: x.winner.handle, displayName: x.winner.displayName, pronouns: x.winner.did ? authorOf(x.winner.did, x.winner.handle).pronouns : null, followers: x.winner.followers, small: x.winner.small } : null,
          mayName: !!x.winner && !x.winner.excluded,
          why: x.winner?.excluded ? 'the winner is left out by the consent rules: not named, not described, the result counted only' : 'a winner may be named (R7), subject to R10 and R11',
          winningPost: wp && !x.winner?.excluded ? { uri: wp.uri, url: wp.url, skeleton: storyOfPost.get(wp.uri) ?? null, mayQuote: !Object.keys(wpMarks).length, ...(Object.keys(wpMarks).length ? { marks: wpMarks } : {}) } : null,
          resultPost: x.winner?.excluded ? null : x.resultPost ?? null,
        }
      }),
      record: seg.record ? { score: seg.record.score, changedInWindow: seg.record.changedInWindow, holder: seg.record.holder?.excluded ? { excluded: true } : seg.record.holder ? { did: seg.record.holder.did, handle: seg.record.holder.handle } : null, mayName: !!seg.record.holder && !seg.record.holder.excluded } : null,
      leaderboard: seg.leaderboard ? {
        time: seg.leaderboard.time, url: seg.leaderboard.url,
        entries: (seg.leaderboard.entries ?? []).map((e) => {
          const named = !e.excluded && !!e.handle && (e.rank === 1 || winnersInWindow.has(e.handle))
          return { rank: e.rank, score: e.score, behindRecord: e.behindRecord, ...(e.excluded || !e.handle ? { excluded: true } : { handle: e.handle }), mayName: named, ...(named ? {} : { why: e.excluded ? 'left out by the consent rules' : 'ranked, not a winner of this window: R7 names the winner of the moment only' }) }
        }),
      } : null,
      window: seg.window ?? null, history: seg.history ?? null, participation: seg.participation ?? null, cameClose: seg.cameClose ?? null,
      repeatWinners: seg.repeatWinners ?? [], streaks: seg.streaks ?? [],
    }
  })
  lanes.games = { format: LANE_FORMAT, lane: 'games', window: window.label, rule: "Stories with a game account's posts, a winning post, or talk of scores, records and bets; then the standings, each result marked with whether its winner may be named and its winning post quoted.", entries: storyEntries(laneRows.games, L.games?.limit ?? 30), games: gameSlices }

  // voices: never-featured members, no bots, no large accounts, nothing in an excluded story
  const V = L.voices ?? {}
  const usable = (p) => !p.sensitive?.length && !p.consent?.length && !p.redacted && !p.aboutShow
  const byPerson = new Map()
  for (const [uri, sid] of storyOfPost) {
    const sk = files.get(sid)
    if (sk.excluded) continue
    const p = d.postsByUri.get(uri)
    if (!p || !memberDids.has(p.authorDid) || !usable(p)) continue
    if (!byPerson.has(p.authorDid)) byPerson.set(p.authorDid, [])
    byPerson.get(p.authorDid).push(p)
  }
  const voiceRows = []
  for (const [did, ps] of byPerson) {
    const a = authorOf(did, ps[0].handle, ps[0].displayName, ps[0]._authorLabels)
    if (a.bot || a.timesFeatured > 0 || a.featuredPrevious || a.featuredEarlier) continue
    if (Number.isFinite(a.followers) && a.followers > (V.maxFollowers ?? 5000)) continue
    if (ps.length < (V.minPosts ?? 1)) continue
    // Smaller voices: a post's engagement is weighed against the author's audience, and
    // beating their own usual counts, so a 100-follower account's good day can lead.
    const aud = (V.audienceWeight ?? 0.5) * Math.log10((Number.isFinite(a.followers) ? a.followers : 1000) + 10)
    const scored = ps.map((p) => { const m = d.metricOf(p); return { p, m: { ...m, score: round(Math.log1p(m.engagement) + 1.2 * Math.max(0, m.lift) - aud) } } }).sort((x, y) => y.m.score - x.m.score || (x.p.uri < y.p.uri ? -1 : 1))
    const strength = scored.slice(0, 3).reduce((t, x) => t + x.m.score, 0)
    voiceRows.push({ a, strength, n: ps.length, top: scored.slice(0, V.postsEach ?? 3) })
  }
  voiceRows.sort((x, y) => y.strength - x.strength || (x.a.did < y.a.did ? -1 : 1))
  lanes.voices = {
    format: LANE_FORMAT, lane: 'voices', window: window.label,
    rule: `Members the show has never featured, ranked by the sum of their three best unmarked posts, each scored ln(1 + engagement) + 1.2 × lift over the author's usual − ${V.audienceWeight ?? 0.5} × log10(followers + 10), so a small account's good day can lead. Left out: bots, accounts over ${V.maxFollowers ?? 5000} followers, and posts that are marked or inside a story the consent rules leave out.`,
    entries: voiceRows.slice(0, V.limit ?? 30).map((r, i) => ({
      rank: i + 1, did: r.a.did, handle: r.a.handle, displayName: r.a.displayName, pronouns: r.a.pronouns, followers: r.a.followers, small: r.a.small, postsInWindow: r.n, strength: round(r.strength),
      line: `@${r.a.handle}${r.a.small ? ' (small account)' : ''}, ${r.a.followers ?? '?'} followers: ${clip(r.top[0].p.text || (r.top[0].p.media?.length ? `(${r.top[0].p.media[0].kind})` : ''), lineChars)}`,
      posts: r.top.map(({ p, m }) => ({ id: storyOfPost.get(p.uri), uri: p.uri, score: m.score, line: clip(p.text || (p.media?.length ? `(${p.media.map((x) => x.kind).join(', ')}${p.media.every((x) => !x.hasAlt) ? ', no alt text' : ''})` : '(no text)'), lineChars) })),
    })),
  }

  // interview: made something and was asked about it in public
  const I = L.interview ?? {}
  const windowPosts = [...d.postsByUri.values()].filter((p) => !p.aboutShow && !files.get(storyOfPost.get(p.uri))?.excluded)
  const pairsBy = answerPairs({ posts: windowPosts, lookup, reachOf: d.reachOf, cfg: config.show?.interview ?? {} })
  const madeBy = new Map() // did -> Set of skeleton ids
  const evidencePosts = new Map() // did -> Set of the posts that show what they made
  for (const [id, sk] of files) for (const m of sk.makers ?? []) {
    if (!madeBy.has(m.did)) { madeBy.set(m.did, new Set()); evidencePosts.set(m.did, new Set()) }
    madeBy.get(m.did).add(id)
    for (const u of m.posts) evidencePosts.get(m.did).add(u)
  }
  // Asked about it: the question replies to (or quotes) the post that shows the made thing,
  // or sits in the replies under it. Talk elsewhere in a busy thread is not about the thing.
  const underMade = (q, did) => {
    const ev = evidencePosts.get(did)
    if (!ev) return false
    if (q.quote?.uri && ev.has(q.quote.uri)) return true
    let cur = q
    for (let i = 0; i < 8 && cur?.reply?.parent; i++) {
      if (ev.has(cur.reply.parent)) return true
      cur = lookup(cur.reply.parent)
    }
    return false
  }
  // Inside a story a member made, someone else's reply to them is asking about it even when
  // it is not worded as a question ("now add a backflip"); the maker's answer makes a pair.
  const IC = { maxChars: 280, maxQuestionChars: 400, ...(config.show?.interview ?? {}) }
  const clean = (p) => p && !p.sensitive?.length && !p.consent?.length && !p.redacted && !p.aboutShow && !p.reply?.hidden
  for (const [did, ids] of madeBy) {
    const have = new Set((pairsBy.get(did) ?? []).map((x) => x.answer.uri))
    for (const id of ids) {
      for (const sp of files.get(id).posts) {
        const a = d.postsByUri.get(sp.uri)
        if (!a || a.authorDid !== did || !a.member || !a.reply?.parent || have.has(a.uri) || !clean(a)) continue
        if (!String(a.text ?? '').trim() || [...a.text].length > IC.maxChars) continue
        const q = lookup(a.reply.parent)
        if (!clean(q) || q.authorDid === did || !String(q.text ?? '').trim() || [...q.text].length > IC.maxQuestionChars) continue
        const toMaker = lookup(q.reply?.parent)?.authorDid === did || lookup(q.quote?.uri)?.authorDid === did
        if (!toMaker || !underMade(q, did)) continue
        const ex = (p) => ({ uri: p.uri, url: p.url, authorDid: p.authorDid, handle: p.handle, displayName: p.displayName, text: p.text, time: p.time, counts: p.counts, member: !!p.member, authorFollowers: p.authorFollowers ?? null, smallAccount: !!p.smallAccount })
        if (!pairsBy.has(did)) pairsBy.set(did, [])
        pairsBy.get(did).push({ kind: 'reply to the maker', score: 0, question: { ...ex(q), kind: 'reply to the maker' }, answer: ex(a) })
        have.add(a.uri)
      }
    }
  }
  const ivRows = []
  for (const [did, pairs] of pairsBy) {
    const a = authorOf(did, pairs[0].answer.handle, pairs[0].answer.displayName)
    if (a.bot || a.featuredPrevious) continue
    const mine = madeBy.get(did) ?? new Set()
    const withStory = pairs.map((x) => {
      const sid = storyOfPost.get(x.answer.uri) ?? null
      const aboutMade = !!sid && mine.has(sid) && x.question.authorDid !== did && underMade(lookup(x.question.uri) ?? x.question, did)
      return { ...x, skeleton: sid, aboutMade }
    })
    const madeAsked = withStory.filter((x) => x.aboutMade)
    const thingsAsked = new Set(madeAsked.map((x) => x.skeleton))
    if (!madeAsked.length && pairs.length < (I.minPairs ?? 3)) continue
    ivRows.push({ a, mine, withStory, madeAsked, thingsAsked, askers: new Set(pairs.map((x) => x.question.authorDid)).size })
  }
  // Made and asked first; then how many pairs are about what they made, from how many
  // different people, about how many made things; never featured before featured.
  const key = (r) => [r.madeAsked.length ? 1 : 0, r.madeAsked.length, new Set(r.madeAsked.map((x) => x.question.authorDid)).size, r.thingsAsked.size, r.a.featuredEarlier ? 0 : 1, r.askers, r.withStory.length]
  ivRows.sort((x, y) => { const kx = key(x), ky = key(y); for (let i = 0; i < kx.length; i++) if (kx[i] !== ky[i]) return ky[i] - kx[i]; return x.a.did < y.a.did ? -1 : 1 })
  const qa = (x) => ({
    skeleton: x.skeleton, aboutMade: x.aboutMade, kind: x.kind,
    question: { uri: x.question.uri, url: x.question.url, handle: x.question.handle, displayName: x.question.displayName, pronouns: authorOf(x.question.authorDid, x.question.handle).pronouns, text: x.question.text, time: x.question.time, member: x.question.member, followers: x.question.authorFollowers, small: x.question.smallAccount, bioReview: bioReview.has(x.question.authorDid) || undefined },
    answer: { uri: x.answer.uri, url: x.answer.url, text: x.answer.text, time: x.answer.time, counts: x.answer.counts },
  })
  lanes.interview = {
    format: LANE_FORMAT, lane: 'interview', window: window.label,
    rule: `Members who made something in the window and were asked about it in public (a usable question-and-answer pair whose question replies to, quotes, or sits under the post that shows what they made), ranked by how many such pairs, then how many different people asked, then how many made things were asked about; then members with at least ${I.minPairs ?? 3} usable pairs of any kind. Every usable pair is listed, oldest first; inside a made story, a reply to the maker that the maker answered counts as asking (kind "reply to the maker") even when it is not worded as a question. Both sides of a pair pass every mark. Nobody who appeared in the previous aired episode; no bots.`,
    entries: ivRows.slice(0, I.limit ?? 12).map((r, i) => ({
      rank: i + 1, did: r.a.did, handle: r.a.handle, displayName: r.a.displayName, pronouns: r.a.pronouns, followers: r.a.followers, small: r.a.small, featuredEarlier: r.a.featuredEarlier, timesFeatured: r.a.timesFeatured,
      line: `@${r.a.handle}: made ${r.mine.size} thing${r.mine.size === 1 ? '' : 's'} in the window, asked about ${r.thingsAsked.size} (${r.madeAsked.length} pair${r.madeAsked.length === 1 ? '' : 's'}); ${r.withStory.length} usable pair${r.withStory.length === 1 ? '' : 's'} from ${r.askers} asker${r.askers === 1 ? '' : 's'}`,
      made: [...r.mine].sort((x, y) => files.get(x).rank - files.get(y).rank).map((id) => ({ id, asked: r.thingsAsked.has(id), line: files.get(id).marks.leadMarked ? '(lead post marked)' : clip(files.get(id).headline, lineChars) })),
      pairs: [...r.withStory].sort((x, y) => (x.answer.time < y.answer.time ? -1 : 1)).map(qa),
    })),
  }

  // tagged: filled in by run.js once every skeleton exists (src/tagged.js)
  lanes.tagged = { format: LANE_FORMAT, lane: 'tagged', window: window.label, rule: 'What the audience pointed at; see src/tagged.js.', entries: [] }

  index.sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity) || (a.id < b.id ? -1 : 1))
  for (const l of LANES) lanes[l].skeletons = laneSkeletonIds(lanes[l])
  const counts = {
    stories: d.stories.length, written: wrote.length, excluded: index.filter((x) => x.excluded).length,
    noMember: skipped.noMember, aboutShowForReviewers: skipped.aboutShow,
    posts: index.reduce((n, x) => n + (x.excluded ? 0 : x.posts), 0),
    postsMarked: index.reduce((n, x) => n + x.postsMarked, 0),
    byLane: Object.fromEntries(LANES.map((l) => [l, lanes[l].entries.length])),
  }
  return {
    index: { format: INDEX_FORMAT, window: { label: window.label, start: window.start, end: window.end }, counts, lanes: LANES.map((l) => `lanes/${l}.json`), skeletons: index },
    files,
    storyOfPost,
    lanes,
    isBot: (did) => isBot(did),
  }
}

/** Every skeleton id a slice points at, ranked, once each: what the lane should look at. */
export function laneSkeletonIds(slice) {
  const ids = []
  const add = (id) => { if (id && !ids.includes(id)) ids.push(id) }
  for (const e of slice.entries) {
    add(e.id)
    for (const p of e.posts ?? []) add(p.id)
    for (const m of e.made ?? []) add(m.id)
    for (const q of e.pairs ?? []) add(q.skeleton)
  }
  return ids
}

/** A lane slice as short Markdown: the rule and one line per entry. */
export function renderLane(slice) {
  const out = [`# Lane: ${slice.lane} (${slice.window})`, '', slice.rule, '']
  if (slice.lane === 'voices') {
    for (const e of slice.entries) {
      out.push(`${e.rank}. ${e.line}`)
      for (const p of e.posts) out.push(`   - \`${p.id}\` ${p.line}`)
    }
  } else if (slice.lane === 'interview') {
    for (const e of slice.entries) {
      out.push(`${e.rank}. ${e.line}`)
      for (const m of e.made) out.push(`   - made: \`${m.id}\`${m.asked ? ' (asked about)' : ''} ${m.line}`)
    }
    out.push('', 'Every pair, with exact text, is in the JSON beside this file.')
  } else if (slice.lane === 'tagged') {
    for (const e of slice.entries) {
      out.push(`${e.rank}. \`${e.id}\` ${e.line}`)
      for (const t of e.taggers) out.push(`   - pointed by @${t.handle} (${t.kind}, weight ${t.weight}: membership score ${t.centrality.raw} of ${t.centrality.max}${t.nth > 1 ? `, their ${t.nth}${t.nth === 2 ? 'nd' : t.nth === 3 ? 'rd' : 'th'} pointer` : ''}) ${t.url}`)
    }
    if (slice.counts) out.push('', `Counted: ${slice.counts.counted} pointers from ${slice.counts.taggers} members. Not listed: ${slice.counts.ignored.notMember} from outside the cluster, ${slice.counts.ignored.bot} by bots, ${slice.counts.ignored.excludedTagger + slice.counts.ignored.excludedTarget} for consent, ${slice.counts.ignored.overCap + slice.counts.ignored.repeat} over the cap or repeated, ${slice.counts.ignored.notFound} not found; ${slice.counts.aboutShow} tags only about the show are for reviewers.`)
    if (slice.entries.length) out.push('', 'Each tagger\'s post, with exact text and marks, is in the JSON beside this file.')
  } else {
    for (const e of slice.entries) out.push(`${e.rank}. \`${e.id}\` ${e.line}`)
  }
  if (slice.lane === 'games') {
    for (const g of slice.games ?? []) {
      out.push('', `## ${g.name}: standings`, '')
      for (const r of g.standings) out.push(`- ${r.time.slice(0, 10)}: ${r.mayName ? `@${r.winner.handle}` : 'a winner who is not included'}, ${r.likes} likes${r.winningPost ? `; winning post \`${r.winningPost.skeleton ?? 'not in a skeleton'}\`${r.winningPost.mayQuote ? '' : ' (marked: not quoted)'}` : ''}`)
      if (g.record) out.push(`- record: ${g.record.score}${g.record.mayName ? ` by @${g.record.holder.handle}` : ''}${g.record.changedInWindow ? ', changed in the window' : ', unchanged'}`)
    }
  }
  if (!slice.entries.length) out.push('Nothing in this window.')
  return out.join('\n') + '\n'
}
