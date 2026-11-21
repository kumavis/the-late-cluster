// Stated pronouns (README "Pronouns") on invented accounts. No network.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadConfig } from '../src/config.js'
import { Consent } from '../src/consent.js'
import { normalizePost } from '../src/normalize.js'
import { pronounsOf, bioStatements, formsOf } from '../src/pronouns.js'
import { analyze } from '../src/digest.js'
import { buildSkeletons } from '../src/skeletons.js'
import { compact } from '../src/lookup.js'

const cfg = loadConfig()

test('pronouns: the built-in field exactly as written, the bio as a fallback, a conflict, none', () => {
  assert.deepEqual(pronounsOf({ pronouns: 'She/Her', description: 'he/him' }), { pronouns: { text: 'She/Her', forms: ['she'], source: 'profile' }, review: false })
  assert.deepEqual(pronounsOf({ description: 'synths and small games. they/them' }).pronouns, { text: 'they/them', forms: ['they'], source: 'bio' })
  assert.deepEqual(pronounsOf({ description: 'she/they 🌱 plotter art' }).pronouns.forms, ['she', 'they'])
  assert.deepEqual(pronounsOf({ description: 'xe/xem, makes games' }).pronouns.forms, ['xe'])
  assert.deepEqual(pronounsOf({ description: 'any pronouns. tinkering' }).pronouns.forms, ['any'])
  assert.deepEqual(pronounsOf({ description: 'no pronouns, use my name' }).pronouns.forms, ['name'])
  assert.deepEqual(pronounsOf({ description: 'pronouns: he' }).pronouns.forms, ['he'])
  const c = pronounsOf({ description: 'she/her at work, he/him online' })
  assert.equal(c.pronouns, null)
  assert.equal(c.review, true)
  for (const bio of ['she sells sea shells', 'he said', 'and/or', 'they make things', 'her name is on the door', '']) assert.equal(pronounsOf({ description: bio }).pronouns, null, bio)
  assert.equal(pronounsOf({}).pronouns, null)
  assert.deepEqual(bioStatements('she/her · she/her'), [{ text: 'she/her', forms: ['she'] }])
  assert.deepEqual(formsOf('he/they'), ['he', 'they'])
})

test('pronouns: the phrase reaches the digest authors, a skeleton post and lookup; the bio does not', () => {
  const D = (n) => `did:plc:pron${String(n).padStart(20, '0')}`
  const view = (n, r, text, reply) => ({ uri: `at://${D(n)}/app.bsky.feed.post/${r}`, cid: 'c', author: { did: D(n), handle: `p${n}.example.test` }, record: { $type: 'app.bsky.feed.post', text, createdAt: '2026-11-10T12:00:00.000Z', ...(reply ? { reply: { root: { uri: reply }, parent: { uri: reply } } } : {}) }, indexedAt: '2026-11-10T12:00:00.000Z', likeCount: 2, repostCount: 0, replyCount: 0, quoteCount: 0 })
  const a = normalizePost(view(1, 'a', 'made a tiny synth'))
  const b = normalizePost(view(2, 'b', 'wow', a.uri))
  const profiles = new Map([
    [D(1), { did: D(1), handle: 'p1.example.test', followersCount: 500, labels: [], pronouns: pronounsOf({ pronouns: 'she/they' }).pronouns }],
    [D(2), { did: D(2), handle: 'p2.example.test', followersCount: 500, labels: [], pronouns: null }],
  ])
  const window = { label: 'w', start: Date.parse('2026-11-09T00:00:00Z'), end: Date.parse('2026-11-16T00:00:00Z') }
  const d = analyze({ posts: [a, b], memberDids: new Set([D(1), D(2)]), window, baselineStart: window.start - 1, baselineWeeks: 0, consent: new Consent({}), scoring: cfg.scoring, profiles, safety: cfg.safety, show: { ...cfg.show, performableThreads: { count: 0 } }, games: {} })
  assert.equal(d.authors[D(1)].pronouns.text, 'she/they')
  assert.equal(d.authors[D(2)].pronouns, null)
  const sk = buildSkeletons({ d, window, profiles, memberDids: new Set([D(1), D(2)]), config: cfg })
  const f = [...sk.files.values()][0]
  const pa = f.posts.find((p) => p.uri === a.uri)
  assert.deepEqual(pa.author.pronouns, { text: 'she/they', forms: ['she', 'they'], source: 'profile' })
  assert.equal(f.posts.find((p) => p.uri === b.uri).author.pronouns, null)
  assert.ok(!JSON.stringify(f).includes('description'))
  assert.equal(compact(d.posts.find((p) => p.uri === a.uri), () => null, (did) => d.authors[did]?.pronouns).pronouns, 'she/they')
  assert.equal(compact(d.posts.find((p) => p.uri === b.uri), () => null, (did) => d.authors[did]?.pronouns).pronouns, undefined)
})

test('pronouns: a set that ends in a word the list does not know keeps its text and its known forms', () => {
  assert.deepEqual(pronounsOf({ description: 'plotter art\n\nshe/they/bit' }).pronouns, { text: 'she/they/bit', forms: ['she', 'they'], source: 'bio' })
})
