import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizePost } from '../src/normalize.js'
import { buildStories, authorBaselines, postMetrics } from '../src/stories.js'
import { spikedPhrases } from '../src/phrases.js'
import { post, uriOf, ACCOUNTS } from './fixtures/synthetic.js'
import { loadConfig } from '../src/config.js'

const cfg = loadConfig().scoring
const MEMBERS = new Set(['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'].map((k) => ACCOUNTS[k].did))
const N = (v) => { const p = normalizePost(v, { source: 'author' }); p.member = MEMBERS.has(p.authorDid); return p }

function week() {
  const root = post('alpha', 'root', { text: 'what if the simcluster had a sports league', at: '2026-11-10T10:00:00Z', likes: 20, replies: 4 })
  const posts = [
    root,
    post('bravo', 'r1', { text: 'top chicken tonight', reply: { root: root.uri }, at: '2026-11-10T11:00:00Z', likes: 8 }),
    post('charlie', 'r2', { text: 'fantasy league when', reply: { root: root.uri }, at: '2026-11-10T12:00:00Z', likes: 5 }),
    post('delta', 'r3', { text: 'i would watch', reply: { root: root.uri, parent: uriOf('bravo', 'r1') }, at: '2026-11-11T09:00:00Z', likes: 2 }),
    // quote chain onto the thread
    post('echo', 'q1', { text: 'this is the best thread of the week', quote: root, at: '2026-11-11T10:00:00Z', likes: 6 }),
    // a new site, shared by two members in separate posts
    post('foxtrot', 'b1', { text: 'i built the league site, try it out at', external: { uri: 'https://league.example.test/', title: 'League' }, at: '2026-11-12T10:00:00Z', likes: 15 }),
    post('bravo', 'b2', { text: 'wow look at this', external: { uri: 'https://league.example.test/standings', title: 'Standings' }, at: '2026-11-13T10:00:00Z', likes: 3 }),
    // a huge account's single post
    post('bigacct', 'big', { text: 'unrelated opinion about the weather', at: '2026-11-12T08:00:00Z', likes: 400, reposts: 50 }),
    // three singletons sharing a coinage
    post('alpha', 'w1', { text: 'yeah absolutely', at: '2026-11-13T10:00:00Z', likes: 1 }),
    post('charlie', 'w2', { text: 'yeah absolutely, says the bot', at: '2026-11-14T10:00:00Z', likes: 2 }),
    post('echo', 'w3', { text: 'everyone saying yeah absolutely now', at: '2026-11-15T10:00:00Z', likes: 1 }),
  ]
  // past posts for baselines: the big account is always big
  const base = [
    post('bigacct', 'old1', { text: 'x', at: '2026-11-01T00:00:00Z', likes: 380 }),
    post('bigacct', 'old2', { text: 'y', at: '2026-11-02T00:00:00Z', likes: 420 }),
    post('bigacct', 'old3', { text: 'z', at: '2026-11-03T00:00:00Z', likes: 390 }),
    post('bigacct', 'old4', { text: 'z', at: '2026-11-04T00:00:00Z', likes: 410 }),
    post('bigacct', 'old5', { text: 'z', at: '2026-11-05T00:00:00Z', likes: 400 }),
  ]
  return { posts: posts.map(N), base: base.map(N) }
}

function run(posts, base) {
  const baselines = authorBaselines([...posts, ...base], cfg.engagementWeights)
  const ph = spikedPhrases(posts.filter((p) => p.member), base.filter((p) => p.member), 0, { ...cfg.phrases, minAuthors: 3 })
  return buildStories({ posts, baselines, phrases: ph.phrases, cfg })
}

test('replies and quotes of one root become one story with the root first', () => {
  const { posts, base } = week()
  const stories = run(posts, base)
  const t = stories.find((s) => s.posts.some((p) => p.uri === uriOf('alpha', 'root')))
  assert.equal(t.stats.posts, 5)
  assert.equal(t.posts[0].uri, uriOf('alpha', 'root'))
  assert.equal(t.anchor.kind, 'thread')
  assert.ok(t.reason.some((r) => /replies in one thread/.test(r)))
  assert.ok(t.reason.some((r) => /1 quote post/.test(r)))
  assert.equal(t.stats.members, 5)
})

test('two posts linking to the same new domain become a built story', () => {
  const { posts, base } = week()
  const s = run(posts, base).find((s) => s.posts.some((p) => p.uri === uriOf('foxtrot', 'b1')))
  assert.equal(s.stats.posts, 2)
  assert.equal(s.kind, 'built')
  assert.ok(s.reason.some((r) => /league\.example\.test, a domain new this week/.test(r)))
  assert.ok(s.scores.built.raw > 0)
})

test('posts left alone that share a spiked phrase are grouped by it', () => {
  const { posts, base } = week()
  const s = run(posts, base).find((s) => s.kind === 'phrase')
  assert.ok(s, 'a phrase story exists')
  assert.equal(s.stats.posts, 3)
  assert.match(s.anchor.value, /absolutely/)
})

test("a big account's routine post does not outrank the week's conversation", () => {
  const { posts, base } = week()
  const stories = run(posts, base)
  const big = stories.find((s) => s.posts[0].uri === uriOf('bigacct', 'big'))
  const thread = stories.find((s) => s.posts[0].uri === uriOf('alpha', 'root'))
  assert.ok(thread.rank < big.rank, `thread ${thread.rank} vs big ${big.rank}`)
  // its lift against its own baseline is about zero
  assert.ok(big.posts[0].metrics.lift < 0.5)
})

test('engagement relative to an author baseline', () => {
  const { posts, base } = week()
  const b = authorBaselines([...posts, ...base], cfg.engagementWeights)
  const m = postMetrics(posts.find((p) => p.uri === uriOf('bigacct', 'big')), b, cfg)
  assert.ok(m.engagement > 400)
  assert.ok(Math.abs(m.lift) < 0.5)
})

test('ids, order and scores are deterministic under input shuffles', () => {
  const { posts, base } = week()
  const a = run(posts, base)
  const shuffled = [...posts].sort((x, y) => (x.text.length % 3) - (y.text.length % 3)).reverse()
  const b = run(shuffled, base)
  assert.deepEqual(b.map((s) => [s.id, s.rank, s.scores.total]), a.map((s) => [s.id, s.rank, s.scores.total]))
  assert.ok(a.every((s) => /^s-[0-9a-f]{10}$/.test(s.id)))
  assert.equal(new Set(a.map((s) => s.id)).size, a.length)
})

test('every story says why it was grouped and carries its score breakdown', () => {
  const { posts, base } = week()
  for (const s of run(posts, base)) {
    assert.ok(s.reason.length > 0)
    for (const k of Object.keys(cfg.storyWeights)) assert.ok(k in s.scores, k)
    assert.equal(typeof s.scores.total, 'number')
  }
})
