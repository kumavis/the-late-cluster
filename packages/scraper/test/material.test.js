import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { makeReach, reachFormula } from '../src/reach.js'
import { interviewCandidates, askKind } from '../src/interview.js'
import { gameResults, gameSegment, parseLeaderboard } from '../src/games.js'
import { compileTopics, topicsOf } from '../src/sensitivity.js'
import { quotedLines } from '../src/show.js'
import { buildsThisWeek } from '../src/builds.js'
import { lookup } from '../src/lookup.js'
import { Consent } from '../src/consent.js'
import { normalizePost } from '../src/normalize.js'
import { loadConfig } from '../src/config.js'
import { post, uriOf, ACCOUNTS, chickenText } from './fixtures/synthetic.js'

const cfg = loadConfig()
const MEMBERS = new Set(['alpha', 'bravo', 'charlie', 'delta', 'echo'].map((k) => ACCOUNTS[k].did))
const N = (k, r, o) => { const p = normalizePost(post(k, r, o)); p.member = MEMBERS.has(p.authorDid); return p }

test('reach: separate numbers, distinct participants, and the stated formula', () => {
  const root = N('alpha', 'r', { text: 'root', likes: 10, reposts: 2, quotes: 1, replies: 2 })
  const posts = [
    root,
    N('bravo', 'x1', { text: 'reply', reply: { root: root.uri }, likes: 1 }),
    N('bravo', 'x2', { text: 'again', reply: { root: root.uri }, likes: 0 }),
    N('charlie', 'q', { text: 'quote', quote: post('alpha', 'r', { text: 'root' }), likes: 3 }),
  ]
  const reposts = new Map([[root.uri, new Set([ACCOUNTS.delta.did])]])
  const r = makeReach(posts, reposts, (did) => (did === ACCOUNTS.delta.did ? 500 : null))
  const pr = r.post(root)
  assert.deepEqual({ likes: pr.likes, reposts: pr.reposts, quotes: pr.quotes, replies: pr.replies, participants: pr.participants, interactions: pr.interactions }, { likes: 10, reposts: 2, quotes: 1, replies: 2, participants: 3, interactions: 15 })
  assert.equal(pr.score, 10 + 4 + 3 + 3 + 15)
  assert.equal(pr.memberRepostAudience, 500, 'reported separately, never in the score')
  const sr = r.story(posts)
  assert.equal(sr.participants, 4, 'alpha, bravo, charlie, and delta who reposted')
  assert.match(r.formula, /^reach = 1×likes \+ 2×reposts \+ 3×quotes \+ 1\.5×replies \+ 5×participants$/)
  assert.equal(reachFormula({ likes: 2, reposts: 1, quotes: 1, replies: 1, participants: 0 }), 'reach = 2×likes + 1×reposts + 1×quotes + 1×replies + 0×participants')
})

test('interview: a parent is a question or a prompt by a stated rule', () => {
  const c = cfg.show.interview
  assert.equal(askKind('what are people\'s thoughts on Oceans 11', c), 'question')
  assert.equal(askKind('wait, really? https://bsky.app/x 🐦', c), 'question')
  assert.equal(askKind('name a better bird', c), 'prompt')
  assert.equal(askKind('concept: a talk show', c), 'prompt')
  assert.equal(askKind('this is great', c), null)
  assert.equal(askKind('I built a thing https://x.test', c), null)
})

test('interview: pairs with exact text both sides, consent and flags applied, unfeatured first', () => {
  const Q = (k, r, text) => N(k, r, { text, at: '2026-11-10T09:00:00Z' })
  const A = (k, r, parent, text, likes = 2) => N(k, r, { text, reply: { root: parent.uri }, at: '2026-11-10T10:00:00Z', likes })
  const q1 = Q('alpha', 'q1', 'what is the crow for?')
  const q2 = Q('delta', 'q2', 'name a better bird')
  const q3 = Q('charlie', 'q3', 'how do you build so fast?')
  const q4 = Q('delta', 'q4', 'thoughts on the election?')
  q4.sensitive = ['partisan politics']
  const q5 = Q('delta', 'q5', 'nice weather today')
  const answers = [
    A('echo', 'a1', q1, 'the crow is for everyone\nespecially you'), A('echo', 'a2', q2, 'the crow, obviously'), A('echo', 'a3', q3, 'I ask the bot nicely'),
    A('echo', 'a4', q4, 'no comment'), A('echo', 'a5', q5, 'it is!'),
    A('bravo', 'b1', q1, 'for reading'), A('bravo', 'b2', q3, 'coffee'), A('bravo', 'b3', q2, 'a crow'),
  ]
  const posts = [q1, q2, q3, q4, q5, ...answers]
  const by = new Map(posts.map((p) => [p.uri, p]))
  const featuredOf = (did) => ({ previous: null, earlier: did === ACCOUNTS.bravo.did ? 'spoke' : null, episodes: [] })
  const out = interviewCandidates({ posts, lookup: (u) => by.get(u), featuredOf, cfg: cfg.show.interview })
  assert.deepEqual(out.candidates.map((c) => c.handle), ['echo.example.test', 'bravo.example.test'], 'never featured first')
  const echo = out.candidates[0]
  assert.equal(echo.pairCount, 3, 'the flagged question and the non-question are left out')
  const pair = echo.pairs.find((p) => p.answer.uri === uriOf('echo', 'a1'))
  assert.equal(pair.answer.text, 'the crow is for everyone\nespecially you', 'exact text')
  assert.equal(pair.question.text, 'what is the crow for?')
  assert.equal(pair.question.handle, 'alpha.example.test')
  assert.equal(pair.question.kind, 'question')
  assert.match(out.rule, /question mark/)
  // someone in the previous episode is not a candidate
  const prevOut = interviewCandidates({ posts, lookup: (u) => by.get(u), featuredOf: (did) => ({ previous: did === ACCOUNTS.echo.did ? 'spoke' : null, earlier: null, episodes: [] }), cfg: cfg.show.interview })
  assert.ok(!prevOut.candidates.some((c) => c.handle === 'echo.example.test'))
})

test('Top Chicken as a segment: standings, streaks, record, history, participation, leaderboard', () => {
  const game = { ...cfg.games.games[0], account: 'chicken.example.test' }
  const day = (d) => `2026-11-${String(d).padStart(2, '0')}T14:05:00Z`
  const res = (d, who, likes, posted) => normalizePost(post('chicken', `r${d}`, { text: chickenText(who, likes, 'echo.example.test', 999, posted, 40, 300), at: day(d) }))
  const posts = [
    res(1, 'bravo.example.test', 300, 10), res(2, 'bravo.example.test', 200, 11), res(3, 'charlie.example.test', 150, 12), // history
    res(10, 'alpha.example.test', 400, 14), res(11, 'alpha.example.test', 500, 15), res(12, 'ghost.example.test', 999, 16), res(13, 'charlie.example.test', 100, 9),
    normalizePost(post('chicken', 'lb', { text: '🏆 All-time Top Chicken leaderboard:\n1. echo.example.test — 999 likes\n2. ghost.example.test — 950 likes\n3. alpha.example.test — 500 likes', at: day(13) })),
  ]
  const consent = new Consent({ optOut: ['ghost.example.test'] })
  const all = gameResults(posts, game, { consent })
  const window = { start: Date.parse('2026-11-09T00:00:00Z'), end: Date.parse('2026-11-16T00:00:00Z') }
  const personView = (h) => (consent.skipHandle(h) ? { excluded: true } : { handle: h })
  const sg = gameSegment(all, posts, { window, game, personView })
  assert.equal(sg.standings.length, 4)
  assert.deepEqual(sg.standings.map((s) => s.winner.handle ?? 'excluded'), ['alpha.example.test', 'alpha.example.test', 'excluded', 'charlie.example.test'])
  assert.equal(sg.standings[1].ofRecord, 0.501)
  assert.deepEqual(sg.repeatWinners, [{ handle: 'alpha.example.test', wins: 2 }])
  assert.deepEqual(sg.streaks.map((s) => [s.handle, s.length]), [['alpha.example.test', 2]])
  assert.equal(sg.history.results, 3)
  assert.equal(sg.history.medianWinningLikes, 200)
  assert.equal(sg.participation.lowestShare, 0.225)
  assert.deepEqual(sg.leaderboard.entries.map((e) => e.handle ?? 'excluded'), ['echo.example.test', 'excluded', 'alpha.example.test'])
  assert.equal(sg.leaderboard.entries[2].behindRecord, 499)
  assert.equal(sg.cameClose.known, false)
  assert.ok(!JSON.stringify(sg).includes('ghost'))
  assert.equal(parseLeaderboard('not a leaderboard', game), null)
})

test('national pastiche and political origins are flagged; ordinary nationality mentions are not', () => {
  const t = compileTopics(cfg.safety.sensitivity.topics, cfg.safety.sensitivity.combinations)
  assert.deepEqual(topicsOf('Can you create another site that offers a pastiche of clips celebrating the newfie lifestyle', t), ['identity'])
  assert.deepEqual(topicsOf('20 original pastiche clips of bikes, stroopwafels, dikes and tulips', t), ['identity'])
  assert.deepEqual(topicsOf('Read "NL" as Nick Land: shake the ball', t), ['partisan politics'])
  assert.deepEqual(topicsOf('a Japanese folk tune played on polyhedra', t), [])
  assert.deepEqual(topicsOf('a pastiche of 80s synth intros', t), [])
})

test('a viewer quoting a line from the show is listed for checking', () => {
  assert.deepEqual(quotedLines('wowowow it sounds exactly like me :o "built it"', cfg.safety), ['built it'])
  assert.deepEqual(quotedLines('the flashing “LAUGH” sign is a nice touch', cfg.safety), ['LAUGH'])
  assert.deepEqual(quotedLines('no quotes here', cfg.safety), [])
})

test('a build answering a post that asks for nothing has no wish, only what it replied to', () => {
  const posts = [
    N('charlie', 'p', { text: 'the weather is nice today', at: '2026-11-10T10:00:00Z' }),
    N('alpha', 'b', { text: 'I built a weather page', reply: { root: uriOf('charlie', 'p') }, external: { uri: 'https://wx.alpha.example.test', title: 'Wx' }, at: '2026-11-10T11:00:00Z' }),
  ]
  const by = new Map(posts.map((p) => [p.uri, p]))
  const [b] = buildsThisWeek({ posts, lookup: (u) => by.get(u), memberHandles: ['alpha.example.test'], cfg: cfg.scoring })
  assert.equal(b.wish, null)
  assert.equal(b.inReplyTo.uri, uriOf('charlie', 'p'))
  posts[0].text = 'someone should make a weather page'
  const [b2] = buildsThisWeek({ posts, lookup: (u) => by.get(u), memberHandles: ['alpha.example.test'], cfg: cfg.scoring })
  assert.equal(b2.wish.uri, uriOf('charlie', 'p'))
})

test('lookup prints exact records by address, text, author, story and thread', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'scraper-lookup-'))
  try {
    const root = { uri: uriOf('alpha', 'r'), url: 'https://bsky.app/profile/alpha.example.test/post/r', authorDid: ACCOUNTS.alpha.did, handle: 'alpha.example.test', text: 'the crow\n  is here', time: '2026-11-10T10:00:00Z' }
    const rep = { uri: uriOf('bravo', 'x'), url: 'https://bsky.app/profile/bravo.example.test/post/x', authorDid: ACCOUNTS.bravo.did, handle: 'bravo.example.test', text: 'Crow!', time: '2026-11-10T11:00:00Z', reply: { root: root.uri, parent: root.uri } }
    await writeFile(join(dir, 'posts.jsonl'), [root, rep].map((p) => JSON.stringify(p)).join('\n') + '\n')
    await writeFile(join(dir, 'digest.json'), JSON.stringify({ stories: [{ id: 's-0000000001', headline: 'the crow', stats: { posts: 2 }, posts: [root, rep], context: [] }], sections: {} }))
    const run = (args) => { let out = ''; const code = lookup([...args, '--dir', dir], { write: (s) => { out += s } }); return { code, lines: out.trim().split('\n') } }
    let r = run(['--uri', root.uri])
    assert.equal(r.code, 0)
    assert.equal(JSON.parse(r.lines[0]).text, 'the crow\n  is here')
    r = run(['--url', 'https://bsky.app/profile/bravo.example.test/post/x'])
    assert.equal(JSON.parse(r.lines[0]).uri, rep.uri)
    r = run(['--text', 'CROW'])
    assert.equal(r.lines.length, 2)
    r = run(['--author', '@bravo.example.test'])
    assert.equal(JSON.parse(r.lines[0]).uri, rep.uri)
    r = run(['--story', 's-0000000001'])
    assert.equal(JSON.parse(r.lines[0]).story.headline, 'the crow')
    assert.equal(r.lines.length, 3)
    r = run(['--thread', rep.url])
    assert.deepEqual(r.lines.slice(1).map((l) => [JSON.parse(l).depth, JSON.parse(l).uri]), [[0, root.uri], [1, rep.uri]])
    assert.equal(run(['--uri', 'at://nope/app.bsky.feed.post/1']).code, 1)
    assert.equal(run([]).code, 2, 'exactly one query')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
