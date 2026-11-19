// End to end against a fake AppView: collect -> analyze -> render, no network.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { collect } from '../src/collect.js'
import { analyze } from '../src/digest.js'
import { renderMarkdown } from '../src/render-md.js'
import { Consent } from '../src/consent.js'
import { XrpcClient } from '../src/http.js'
import { loadConfig } from '../src/config.js'
import { isoWeekWindow } from '../src/window.js'
import { featuredLookup } from '../src/ledger.js'
import { buildCoverage, renderCoverage } from '../src/coverage.js'
import { post, actor, profile, ACCOUNTS, uriOf, chickenText } from './fixtures/synthetic.js'

const W = isoWeekWindow('2026-W46') // 9-16 Nov 2026

function world() {
  const root = post('alpha', 'root', { text: 'Somebody should build a simcluster weather report', at: '2026-11-10T10:00:00Z', likes: 30, replies: 4 })
  const ghostPost = post('ghost', 'g1', { text: 'GHOST TEXT do not show', at: '2026-11-10T11:00:00Z', likes: 50 })
  const posts = [
    root,
    post('bravo', 'b1', { text: 'the forecast is vibes', reply: { root: root.uri }, at: '2026-11-10T10:30:00Z', likes: 9 }),
    post('charlie', 'c1', { text: 'built it: weather for the cluster', reply: { root: root.uri }, external: { uri: 'https://weather.example.test/', title: 'Cluster Weather' }, at: '2026-11-10T12:00:00Z', likes: 25 }),
    post('delta', 'd1', { text: 'the weather site says 80% chance of discourse', external: { uri: 'https://weather.example.test/today', title: 'Today' }, at: '2026-11-11T09:00:00Z', likes: 12 }),
    ghostPost,
    post('charlie', 'c2', { text: 'lmao @ghost.example.test', quote: ghostPost, mentions: [{ key: 'ghost', text: '@ghost.example.test' }], at: '2026-11-11T10:00:00Z', likes: 4 }),
    post('echo', 'e1', { text: 'replying to the ghost', reply: { root: ghostPost.uri }, at: '2026-11-11T11:00:00Z', likes: 3 }),
    post('hidden', 'h1', { text: 'HIDDEN TEXT logged-in only', reply: { root: root.uri }, at: '2026-11-10T13:00:00Z', likes: 6 }),
    post('delta', 'nsfw', { text: 'LABELLED TEXT', labels: ['porn'], at: '2026-11-12T10:00:00Z' }),
    post('bravo', 'b2', { text: 'is this live', reply: { root: uriOf('delta', 'd1') }, at: '2026-11-11T09:30:00Z', likes: 1 }),
    post('echo', 'e0', { text: 'simcluster weather is my religion now', at: '2026-11-12T09:30:00Z', likes: 2 }),
    // a member whose profile says not to quote them, quoted by a seed
    post('quiet', 'qt1', { text: 'QUIET TEXT about synths', at: '2026-11-12T08:00:00Z', likes: 4 }),
    post('alpha', 'a-q', { text: 'replying to quiet', reply: { root: uriOf('quiet', 'qt1') }, at: '2026-11-12T08:30:00Z', likes: 1 }),
    // a wish and the build that answered it, by a small bot account on a member's domain
    post('charlie', 'wish', { text: 'someone should make a golem grocery game', at: '2026-11-13T09:00:00Z', likes: 12, replies: 2 }),
    post('bot', 'built', { text: 'built it 🎉 golem.alpha.example.test', reply: { root: uriOf('charlie', 'wish') }, external: { uri: 'https://golem.alpha.example.test/', title: 'Golem Grocer' }, at: '2026-11-13T09:20:00Z', likes: 7 }),
    post('alpha', 'thanks', { text: 'amazing', reply: { root: uriOf('charlie', 'wish'), parent: uriOf('bot', 'built') }, at: '2026-11-13T09:40:00Z', likes: 2 }),
    post('delta', 'share', { text: 'everyone go play the golem game', external: { uri: 'https://golem.alpha.example.test', title: 'Golem Grocer' }, at: '2026-11-13T12:00:00Z', likes: 3 }),
    // the show, a reaction, and a request to be left out
    post('delta', 'show', { text: 'watched The Late Cluster last night, the crow bit got me', at: '2026-11-14T10:00:00Z', likes: 5, replies: 2 }),
    post('bravo', 'react', { text: 'that is not what I said, the crow was in the cold open', reply: { root: uriOf('delta', 'show') }, at: '2026-11-14T10:10:00Z', likes: 2 }),
    post('foxtrot', 'f0', { text: 'FOXTROT EARLIER POST', at: '2026-11-10T09:00:00Z', likes: 3 }),
    post('alpha', 'a-f', { text: 'ha', reply: { root: uriOf('foxtrot', 'f0') }, at: '2026-11-10T09:10:00Z', likes: 1 }),
    post('foxtrot', 'f1', { text: 'please leave me out of the show', reply: { root: uriOf('delta', 'show') }, at: '2026-11-14T11:00:00Z', likes: 1 }),
    // out of bounds, and a declared week
    post('charlie', 'pol', { text: 'the election results are making me crazy, trump again', at: '2026-11-15T10:00:00Z', likes: 40 }),
    post('alpha', 'wk', { text: "it's simcluster weather week, everyone", at: '2026-11-11T08:00:00Z', likes: 6 }),
    // the community game: one result for a member, one for the opted-out account
    post('chicken', 'c1', { text: chickenText('charlie.example.test', 12), quote: post('charlie', 'wish', { text: 'someone should make a golem grocery game', at: '2026-11-13T09:00:00Z', likes: 12, replies: 2 }), mentions: [{ key: 'charlie', text: '@charlie.example.test' }], at: '2026-11-14T14:05:00Z' }),
    post('chicken', 'c2', { text: chickenText('ghost.example.test', 50), quote: ghostPost, mentions: [{ key: 'ghost', text: '@ghost.example.test' }], at: '2026-11-15T14:05:00Z' }),
    post('echo', 'old', { text: 'a baseline post', at: '2026-11-02T10:00:00Z', likes: 1 }),
    post('echo', 'late', { text: 'after the window', at: '2026-11-17T10:00:00Z', likes: 1 }),
  ]
  // replies are part of the root's thread
  return { posts, root }
}

function fakeAppView({ posts, root }) {
  const requested = []
  const byActor = (a) => Object.values(ACCOUNTS).find((x) => x.did === a || x.handle === a)
  const follows = { alpha: ['charlie', 'delta', 'echo', 'ghost', 'hidden', 'quiet', 'bot', 'foxtrot'], bravo: ['charlie', 'delta', 'echo', 'ghost', 'quiet', 'bot', 'foxtrot'], delta: ['charlie'], echo: ['bravo', 'charlie', 'bigacct'], charlie: ['delta', 'echo'] }
  const fetchImpl = async (url) => {
    requested.push(url)
    const u = new URL(url)
    const nsid = u.pathname.split('/').pop()
    const q = u.searchParams
    const ok = (b) => new Response(JSON.stringify(b), { status: 200 })
    if (nsid === 'app.bsky.actor.getProfiles') {
      return ok({ profiles: q.getAll('actors').map(byActor).filter(Boolean).map((a) => profile(Object.keys(ACCOUNTS).find((k) => ACCOUNTS[k] === a))) })
    }
    if (nsid === 'app.bsky.graph.getFollows') {
      const key = Object.keys(ACCOUNTS).find((k) => ACCOUNTS[k].did === q.get('actor'))
      return ok({ follows: (follows[key] ?? []).map(actor) })
    }
    if (nsid === 'app.bsky.feed.getAuthorFeed') {
      const did = q.get('actor')
      const before = q.get('cursor') ? Date.parse(q.get('cursor')) : Infinity
      const mine = posts.filter((p) => p.author.did === did && Date.parse(p.indexedAt) < before)
      const byUri = new Map(posts.map((p) => [p.uri, p]))
      return ok({ feed: mine.sort((a, b) => (a.indexedAt < b.indexedAt ? 1 : -1)).map((p) => ({ post: p, ...(p.record.reply ? { reply: { root: byUri.get(p.record.reply.root.uri), parent: byUri.get(p.record.reply.parent.uri) } } : {}) })) })
    }
    if (nsid === 'app.bsky.feed.getPostThread') {
      const uri = q.get('uri')
      const top = posts.find((p) => p.uri === uri)
      return ok({ thread: { post: top, replies: posts.filter((p) => p.record.reply?.root.uri === uri).map((p) => ({ post: p, replies: [] })) } })
    }
    if (nsid === 'app.bsky.feed.searchPosts') {
      const since = Date.parse(q.get('since')), until = Date.parse(q.get('until'))
      return ok({ posts: posts.filter((p) => /simcluster/i.test(p.record.text) && Date.parse(p.record.createdAt) >= since && Date.parse(p.record.createdAt) < until) })
    }
    return new Response(JSON.stringify({ error: 'MethodNotImplemented' }), { status: 501 })
  }
  return { fetchImpl, requested }
}

// A synthetic ledger: alpha spoke in the previous episode; bravo was shown in an earlier one.
const LEDGER = {
  found: true, tracker: [],
  episodes: [
    { id: '000-earlier', aired: true, airedMs: Date.parse('2026-10-20T00:00:00Z'), guests: [], featured: [{ did: null, handle: 'bravo.example.test' }] },
    { id: '001-previous', aired: true, airedMs: Date.parse('2026-11-06T00:00:00Z'), guests: [{ did: ACCOUNTS.alpha.did, handle: 'renamed.example.test' }], featured: [] },
  ],
}

async function runFake({ showFollows = false } = {}) {
  const base = loadConfig()
  const config = structuredClone(base)
  config.cluster.seeds = showFollows
    ? [{ did: ACCOUNTS.alpha.did, reason: 'bootstrap' }, { did: ACCOUNTS.ghost.did, reason: 'bootstrap, but opted out' }, { did: ACCOUNTS.chicken.did, reason: 'bootstrap, but a bot' }]
    : ['alpha.example.test', 'bravo.example.test', 'ghost.example.test']
  config.cluster.feeds = []
  config.cluster.search.enabled = true // off by default; the test exercises the code path
  config.cluster.search.host = 'https://search.example.test'
  config.optOut.accounts = ['ghost.example.test']
  config.cluster.seedSelection.mode = showFollows ? 'show-follows' : 'fixed'
  config.cluster.showAccount = { did: ACCOUNTS.delta.did }
  config.cluster.rosters = [{ id: 'game', account: ACCOUNTS.echo.did, follows: true, followers: false, reason: 'test roster' }]
  config.games.games[0].account = 'chicken.example.test'
  config.show.performableThreads.minTurns = 2
  config.show.performableThreads.minPosts = 3
  const w = world()
  const fake = fakeAppView(w)
  const client = new XrpcClient({ fetchImpl: fake.fetchImpl, sleep: async () => {}, minIntervalMs: 0, maxRetries: 0, maxRequests: 200 })
  const consent = new Consent({ optOut: config.optOut.accounts, blockedLabels: config.scoring.blockedLabels, selfDeclaredPatterns: config.safety.selfDeclaredOptOut.patterns })
  const c = await collect({ client, config, window: W, consent })
  const d = analyze({ posts: c.store.posts.values(), memberDids: c.memberDids, members: c.members, reposts: c.store.reposts, window: W, baselineStart: c.baselineStart, baselineWeeks: 3, consent, scoring: config.scoring, profiles: c.profiles, featured: featuredLookup(LEDGER, W.end), safety: config.safety, show: config.show, games: config.games, completeThreads: c.completeThreads, gaps: c.store.gaps })
  const digest = { window: d.window, run: { generatedAt: '2026-11-19T00:00:00Z', requests: client.stats.requests, warnings: c.warnings }, stats: { cluster: { members: c.members.length, seeds: c.seeds.length }, posts: { window: d.counts.windowPosts }, excluded: consent.stats }, overview: d.overview, sections: d.sections, authors: d.authors, stories: d.stories, appendices: d.appendices, settings: { storiesInMarkdown: 40, postsPerStory: 4 }, ledger: { found: true } }
  const coverage = buildCoverage({ collected: c, digest: d, config, seedPlan: { mode: config.cluster.seedSelection.mode, previousSeeds: [] }, previous: { label: 'W45', members: [{ did: ACCOUNTS.alpha.did, handle: 'alpha.example.test' }, { did: 'did:plc:gone', handle: 'gone.example.test' }] }, run: { byEndpoint: { 'app.bsky.feed.getAuthorFeed': 14 } }, consentStats: consent.stats, ledger: LEDGER, frequent: [] })
  return { c, d, digest, md: renderMarkdown(digest), fake, consent, coverage, config }
}

test('the opted-out seed is never requested and never appears', async () => {
  const { fake, digest, md, d } = await runFake()
  for (const url of fake.requested) {
    assert.ok(!url.includes('ghost.example.test'), url)
    assert.ok(!decodeURIComponent(url).includes(`actor=${ACCOUNTS.ghost.did}`), url)
  }
  const out = JSON.stringify(digest) + md + JSON.stringify(d.posts)
  assert.ok(!out.includes(ACCOUNTS.ghost.did))
  assert.ok(!out.includes('ghost.example.test'))
  assert.ok(!out.includes('GHOST TEXT'))
  // the people who replied to or quoted them are still there
  assert.ok(d.posts.some((p) => p.uri === uriOf('echo', 'e1') && p.reply.hidden))
  assert.ok(d.posts.some((p) => p.uri === uriOf('charlie', 'c2') && p.quote.state === 'removed' && p.text === 'lmao @[opted-out]'))
})

test('logged-out-hidden and labelled posts are excluded and counted', async () => {
  const { digest, md, consent } = await runFake()
  const out = JSON.stringify(digest) + md
  assert.ok(!out.includes('HIDDEN TEXT'))
  assert.ok(!out.includes('LABELLED TEXT'))
  assert.equal(consent.stats.postsDroppedLabel.porn, 1)
  assert.ok(consent.stats.postsDroppedNoUnauthenticated >= 1)
  assert.ok(consent.stats.postsDroppedOptOut >= 1)
})

test('members, window and the top story come out as expected', async () => {
  const { c, d } = await runFake()
  const handles = c.members.map((m) => m.handle).sort()
  // quiet.example.test qualifies by the rules but its profile opts out, so it is dropped before its feed is fetched
  assert.deepEqual(handles, ['alpha.example.test', 'bravo.example.test', 'builder.alpha.example.test', 'charlie.example.test', 'delta.example.test', 'echo.example.test', 'foxtrot.example.test'])
  assert.ok(d.posts.every((p) => p.time >= '2026-11-09' && p.time < '2026-11-16'))
  const top = d.stories.find((x) => x.posts[0].uri === uriOf('alpha', 'root'))
  assert.ok(top.rank <= 3, `root thread ranks near the top (${top.rank})`)
  assert.ok(top.posts.some((p) => p.uri === uriOf('charlie', 'c1')))
  assert.ok(top.links.some((l) => l.domain === 'weather.example.test' && l.built), 'the announced site counts as built')
  // delta's separate top-level post about the site is its own story (a reply cannot bridge threads)
  assert.ok(d.stories.some((s) => s.posts[0].uri === uriOf('delta', 'd1')))
  assert.ok(d.sections.built.some((b) => b.links.some((l) => l.domain === 'weather.example.test')), 'listed under built this week')
})

test('the markdown has the sections a writer needs', async () => {
  const { md } = await runFake()
  for (const h of ['# Cluster digest: 2026-W46', '## The week at a glance', '## Built this week', '## About the show', '## New voices', '## Interview material', '## Threads you could perform', '## Stories', '### 1. ', 'Appendix A: most active accounts', 'Appendix B: links that circulated', 'Appendix C: phrases that spiked', 'Appendix D: "X week" declarations', 'Appendix E: how this was made']) {
    assert.ok(md.includes(h), h)
  }
  assert.match(md, /\[open\]\(https:\/\/bsky\.app\/profile\/alpha\.example\.test\/post\/root\)/)
  assert.match(md, /Why these are together:/)
})

test('two runs on the same inputs give the same stories', async () => {
  const a = await runFake()
  const b = await runFake()
  assert.deepEqual(b.d.stories, a.d.stories)
  assert.deepEqual(b.d.posts, a.d.posts)
})

test('a profile that asks not to be quoted is an opt-out: never fetched, never shown, counted', async () => {
  const { fake, digest, md, d, consent } = await runFake()
  for (const url of fake.requested) {
    if (url.includes('getAuthorFeed')) assert.ok(!decodeURIComponent(url).includes(ACCOUNTS.quiet.did), 'no feed request for the account')
  }
  const out = JSON.stringify(digest) + md + JSON.stringify(d.posts)
  assert.ok(!out.includes('QUIET TEXT'))
  assert.ok(!out.includes(ACCOUNTS.quiet.did))
  assert.ok(!out.includes('quiet.example.test'))
  assert.ok(!out.includes('Please do not quote'), 'the description itself is never written')
  assert.equal(consent.stats.selfDeclaredAccounts, 1)
  const reply = d.posts.find((p) => p.uri === uriOf('alpha', 'a-q'))
  assert.equal(reply.reply.hidden, true)
})

test('authors carry follower counts and small accounts are marked in both outputs', async () => {
  const { d, md } = await runFake()
  const echo = d.authors[ACCOUNTS.echo.did]
  assert.deepEqual([echo.followers, echo.small], [120, true])
  assert.equal(d.authors[ACCOUNTS.alpha.did].small, false)
  assert.equal(d.authors[ACCOUNTS.alpha.did].featuredPrevious, 'spoke', 'matched by DID although the ledger has an old handle')
  assert.equal(d.authors[ACCOUNTS.bravo.did].featuredEarlier, 'shown')
  assert.equal(d.authors[ACCOUNTS.charlie.did].featuredPrevious, null)
  const p = d.posts.find((x) => x.authorDid === ACCOUNTS.echo.did)
  assert.equal(p.smallAccount, true)
  assert.equal(p.authorFollowers, 120)
  assert.match(md, /@builder\.alpha\.example\.test \(\*\*small account\*\*, 90 followers\)/)
  assert.ok(!JSON.stringify(d).includes('"follows":'), 'no follow lists')
})

test('built this week names the builder, the wish and who shared it', async () => {
  const { d, md } = await runFake()
  const b = d.sections.built.find((x) => x.links.some((l) => l.domain === 'golem.alpha.example.test'))
  assert.equal(b.kind, 'built')
  assert.equal(b.builtBy.handle, 'builder.alpha.example.test')
  assert.equal(b.wish.handle, 'charlie.example.test')
  assert.equal(b.wish.text, 'someone should make a golem grocery game')
  assert.deepEqual(b.sharedBy.map((x) => x.handle), ['delta.example.test'])
  assert.equal(d.sections.built[0], b, 'a build that answered a wish ranks first')
  assert.ok(md.indexOf('## Built this week') < md.indexOf('## Stories'))
  assert.match(md, /The wish: \*\*Charlie C\*\* @charlie\.example\.test/)
  assert.match(md, /Built by \*\*Builder Bot\*\* @builder\.alpha\.example\.test/)
})

test('about the show: mentions, reactions, corrections, and a request to be left out', async () => {
  const { d, md, consent } = await runFake()
  const about = d.sections.aboutShow
  const show = about.posts.find((p) => p.uri === uriOf('delta', 'show'))
  assert.deepEqual(show.why, ['names the show'])
  const react = about.posts.find((p) => p.uri === uriOf('bravo', 'react'))
  assert.equal(react.correction, true)
  assert.deepEqual(about.optOutRequests.map((r) => r.handle), ['foxtrot.example.test'])
  assert.equal(consent.stats.showOptOutRequests, 1)
  // the requester is excluded from everything else, including their earlier posts
  assert.ok(!d.posts.some((p) => p.authorDid === ACCOUNTS.foxtrot.did))
  assert.ok(!JSON.stringify(d.stories).includes('FOXTROT'))
  assert.ok(!md.includes('please leave me out'), 'the request is linked, not quoted')
  assert.match(md, /Requests to be left out \(1\)[\s\S]*- @foxtrot\.example\.test: \[the post\]/)
})

test('out-of-bounds stories are flagged, kept as headlines, and kept out of the glance', async () => {
  const { d, md } = await runFake()
  const s = d.stories.find((x) => x.posts[0].uri === uriOf('charlie', 'pol'))
  assert.deepEqual(s.outOfBounds.topics, ['partisan politics'])
  assert.ok(!d.overview.topStories.some((t) => t.id === s.id))
  const glance = md.slice(md.indexOf('## The week at a glance'), md.indexOf('## Built this week'))
  assert.ok(!glance.includes('election results'))
  const section = md.slice(md.indexOf(`### ${s.rank}. **OUT OF BOUNDS (partisan politics)**`))
  assert.ok(section.length > 0)
  const block = section.slice(0, section.indexOf('---'))
  assert.ok(!/^> /m.test(block), 'no quoted posts for an out-of-bounds story')
  assert.ok(!/— .*\[open\]/.test(block))
})

test('new voices: strong members the show has never featured, nobody it has', async () => {
  const { d, md } = await runFake()
  const handles = d.sections.newVoices.map((v) => v.handle)
  assert.ok(!handles.includes('alpha.example.test'), 'featured in the previous episode')
  assert.ok(!handles.includes('bravo.example.test'), 'featured earlier')
  for (const v of d.sections.newVoices) {
    assert.ok(v.top.length > 0 && v.top.length <= 3)
    assert.ok(v.top.every((p) => !p.sensitive))
  }
  assert.ok(!md.includes('Recurring guests'))
})

test('declared weeks are listed with their first post', async () => {
  const { d } = await runFake()
  const w = d.appendices.weeks.find((x) => x.term === 'simcluster weather week')
  assert.ok(w, JSON.stringify(d.appendices.weeks))
  assert.equal(w.declared, true)
  assert.equal(w.first.uri, uriOf('alpha', 'wk'))
})

test('community games: each result with winner, winning post and stats; an excluded winner is left out', async () => {
  const { d, md } = await runFake()
  const g = d.sections.games[0]
  assert.equal(g.results.length, 2)
  const [a, b] = g.results
  assert.equal(a.winner.handle, 'charlie.example.test')
  assert.equal(a.winningPost.text, 'someone should make a golem grocery game')
  assert.deepEqual([a.likes, a.recordScore, a.posted, a.eligible, a.windowPosts], [12, 999, 12, 40, 300])
  assert.deepEqual(b.winner, { excluded: true })
  assert.equal(b.text, null)
  assert.ok(md.indexOf('## Community games') < md.indexOf('## Built this week'))
  assert.match(md, /\| \(not included\) \| 50 \| [^|]* \| [^|]* \| \(not included\) \|/)
  assert.match(md, /\*\*Who came close on the day:\*\* not known/)
  const sg = g.segment
  assert.equal(sg.standings.length, 2)
  assert.equal(sg.record.score, 999)
  assert.equal(sg.participation.days.length, 2)
  assert.ok(!JSON.stringify(d.sections.games).includes('ghost'))
})

test('performable threads come out whole, in order, with exact text', async () => {
  const { d, md } = await runFake()
  const t = d.sections.performableThreads.threads.find((x) => x.root === uriOf('charlie', 'wish'))
  assert.ok(t, JSON.stringify(d.sections.performableThreads.rejected))
  assert.deepEqual(t.posts.map((p) => p.handle), ['charlie.example.test', 'builder.alpha.example.test', 'alpha.example.test'])
  assert.equal(t.posts[1].text, 'built it 🎉 golem.alpha.example.test')
  assert.equal(t.posts[2].inReplyTo, uriOf('bot', 'built'))
  assert.match(md, /## Threads you could perform[\s\S]*- \*\*Charlie C\*\* \(@charlie\.example\.test\): someone should make a golem grocery game\n  - \*\*Builder Bot\*\* \(@builder\.alpha\.example\.test, small account\): built it 🎉/)
})

test('seeds: the show account\'s follows plus the bootstrap list, by DID; consent and bots apply', async () => {
  const { c, config, fake } = await runFake({ showFollows: true })
  const seeds = config.cluster.seeds
  assert.deepEqual(seeds.map((x) => x.handle).sort(), ['alpha.example.test', 'charlie.example.test'])
  assert.ok(seeds.every((x) => x.did.startsWith('did:')))
  assert.equal(seeds.find((x) => x.handle === 'charlie.example.test').reason, "followed by the show's account")
  assert.deepEqual(config.cluster.seedsSkipped.filter((x) => !x.excluded).map((x) => [x.did, x.why]), [[ACCOUNTS.chicken.did, 'a self-labelled bot (bots follow no one)']])
  assert.deepEqual(config.cluster.seedsSkipped.filter((x) => x.excluded), [{ excluded: true }], 'the opted-out seed is counted, not named')
  assert.ok(c.members.filter((m) => m.seed).every((m) => [ACCOUNTS.alpha.did, ACCOUNTS.charlie.did].includes(m.did)))
  assert.ok(!fake.requested.some((u) => decodeURIComponent(u).includes(`actor=${ACCOUNTS.ghost.did}`)), 'an opted-out seed is never asked about')
})

test('coverage: how members qualified, concentration, change, signals, the cap, worries', async () => {
  const { coverage: cv, c, config } = await runFake()
  const total = Object.values(cv.byRule).reduce((a, b) => a + b, 0)
  assert.equal(total, c.members.length)
  assert.ok(cv.byRule.seed >= 1)
  assert.ok(cv.concentration.top10.posts > 0 && cv.concentration.top10.posts <= 1)
  assert.equal(cv.change.previous, 'W45')
  assert.equal(cv.change.left, 1)
  assert.deepEqual(cv.change.leftSample, ['gone.example.test'])
  const roster = cv.independent.find((x) => x.name === 'roster: game')
  assert.ok(roster, 'the roster is compared')
  assert.equal(typeof roster.overlapOfMembers, 'number')
  assert.equal(cv.cap.cap, config.cluster.expansion.maxMembers)
  assert.ok(cv.seeds.suggestions.every((x) => !c.members.find((m) => m.did === x.did)?.seed))
  assert.ok(cv.seeds.suggestions.every((x) => /talked with \d+ members/.test(x.reason)))
  assert.ok(Array.isArray(cv.worries))
  assert.ok(cv.worries.some((w) => /ten most active/.test(w)), 'a tiny cluster is concentrated, and the report says so')
  const md = renderCoverage(cv, { label: 'W46', start: 'a', end: 'b' })
  for (const h of ['# Coverage: W46', '## Worries', '## Seeds', 'Suggested additional seeds', '## How members qualified', '## Concentration', '## Featured before (the tracker)', '## New and gone', '## Against independent signs of the community', '## The cap', '## Excluded, in counts']) assert.ok(md.includes(h), h)
  assert.ok(!md.includes('ghost'), 'no opted-out account in the report: ' + md.split('\n').filter((l) => l.includes('ghost')).join(' | '))
})
