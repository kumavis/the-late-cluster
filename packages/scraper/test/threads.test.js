import { test } from 'node:test'
import assert from 'node:assert/strict'
import { performableThreads } from '../src/threads.js'
import { normalizePost } from '../src/normalize.js'
import { loadConfig } from '../src/config.js'
import { isoWeekWindow } from '../src/window.js'
import { post, uriOf, ACCOUNTS } from './fixtures/synthetic.js'

const W = isoWeekWindow('2026-W46')
const cfg = { ...loadConfig().show.performableThreads, minTurns: 3 }
const MEMBERS = new Set(['alpha', 'bravo', 'charlie', 'delta', 'echo'].map((k) => ACCOUNTS[k].did))
const N = (k, r, o) => { const p = normalizePost(post(k, r, o)); p.member = MEMBERS.has(p.authorDid); return p }

function chat(extra = []) {
  const root = uriOf('alpha', 't0')
  const at = (m) => `2026-11-12T10:${String(m).padStart(2, '0')}:00Z`
  return [
    N('alpha', 't0', { text: 'what if the crow ran for mayor', at: at(0), likes: 10 }),
    N('bravo', 't1', { text: 'the crow has no platform', reply: { root }, at: at(1) }),
    N('alpha', 't2', { text: 'the crow IS the platform\n\nvote crow 🐦‍⬛', reply: { root, parent: uriOf('bravo', 't1') }, at: at(2) }),
    N('charlie', 't3', { text: 'I would canvass for the crow', reply: { root, parent: uriOf('alpha', 't2') }, at: at(3) }),
    N('delta', 't4', { text: 'built a campaign site for it', reply: { root }, at: at(4) }),
    ...extra,
  ]
}
const run = (posts, o = {}) => performableThreads({ posts, window: W, cfg, ...o })

test('a good-natured back-and-forth is offered complete, in order, with exact text', () => {
  const { threads } = run(chat(), { complete: new Set([uriOf('alpha', 't0')]) })
  assert.equal(threads.length, 1)
  const t = threads[0]
  assert.equal(t.complete, true)
  assert.deepEqual(t.posts.map((p) => [p.handle, p.depth]), [
    ['alpha.example.test', 0], ['bravo.example.test', 1], ['alpha.example.test', 2], ['charlie.example.test', 3], ['delta.example.test', 1],
  ])
  assert.equal(t.posts[2].text, 'the crow IS the platform\n\nvote crow 🐦‍⬛', 'text is exact, newlines and emoji included')
  assert.equal(t.posts[2].inReplyTo, uriOf('bravo', 't1'))
  assert.equal(t.posts[0].inReplyTo, null)
  assert.equal(t.speakers, 4)
  assert.equal(t.turns, 4)
})

test('a removed leaf is marked where it was, without its URI or author', () => {
  const removed = [{ threadKey: uriOf('alpha', 't0'), parent: uriOf('charlie', 't3') }]
  const t = run(chat(), { removed }).threads[0]
  const i = t.posts.findIndex((p) => p.removed)
  assert.deepEqual(t.posts[i], { removed: true, count: 1, inReplyTo: uriOf('charlie', 't3'), depth: 4 })
  assert.equal(t.posts[i - 1].handle, 'charlie.example.test')
  assert.equal(t.removedPosts, 1)
})

test('rejected: an excluded post in the middle, a gap, a flag, a long post, hostility, redaction, too few speakers', () => {
  const root = uriOf('alpha', 't0')
  const cases = {
    'an excluded post in the middle': (ps) => { ps[3].reply = { root, parent: null, hidden: true } },
    'a gap in the thread': (ps) => { ps[3].reply = { root, parent: uriOf('echo', 'missing') } },
    'a sensitivity flag': (ps) => { ps[1].sensitive = ['health'] },
    'a post too long to speak': (ps) => { ps[1].text = 'x'.repeat(281) },
    'hostile wording': (ps) => { ps[1].text = 'shut up, crow' },
    'text redacted by the consent rules': (ps) => { ps[1]._redacted = true },
    'a post with no text to speak': (ps) => { ps[1].text = '' },
    'a post that is only a link or a mention': (ps) => { ps[1].text = 'bsky.app/profile/someone... @alpha.example.test' },
  }
  for (const [why, mutate] of Object.entries(cases)) {
    const ps = chat()
    mutate(ps)
    const out = run(ps)
    assert.equal(out.threads.length, 0, why)
    assert.equal(out.rejected[why], 1, `${why}: ${JSON.stringify(out.rejected)}`)
  }
  const two = chat().filter((p) => ['alpha', 'bravo'].some((k) => p.authorDid === ACCOUNTS[k].did))
  assert.equal(run(two).threads.length, 0)
})

test('selection is deterministic and offers incomplete candidates for fetching', () => {
  const a = run(chat())
  const b = run([...chat()].reverse())
  assert.deepEqual(b.threads, a.threads)
  assert.deepEqual(a.candidates, [uriOf('alpha', 't0')])
  assert.deepEqual(run(chat(), { complete: new Set([uriOf('alpha', 't0')]) }).candidates, [])
})
