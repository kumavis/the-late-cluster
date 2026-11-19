import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizePost } from '../src/normalize.js'
import { buildsThisWeek } from '../src/builds.js'
import { loadConfig } from '../src/config.js'
import { post, uriOf, ACCOUNTS } from './fixtures/synthetic.js'

const cfg = loadConfig().scoring
const MEMBERS = new Set(['alpha', 'bravo', 'charlie', 'delta', 'echo', 'bot'].map((k) => ACCOUNTS[k].did))
const N = (k, r, o) => { const p = normalizePost(post(k, r, o)); p.member = MEMBERS.has(p.authorDid); return p }

function run(posts, extra = {}) {
  const byUri = new Map(posts.map((p) => [p.uri, p]))
  return buildsThisWeek({ posts, lookup: (u) => byUri.get(u) ?? null, memberHandles: ['alpha.example.test', 'builder.alpha.example.test'], baselineDomains: new Set(['old.example.test']), cfg, ...extra })
}

test('the wish is the post the build replied to, the builder is who announced it', () => {
  const posts = [
    N('charlie', 'w', { text: 'someone should build a crow simulator', at: '2026-11-10T10:00:00Z', likes: 10 }),
    N('alpha', 'own', { text: 'lol crow.alpha.example.test', reply: { root: uriOf('charlie', 'w') }, links: ['https://crow.alpha.example.test'], at: '2026-11-10T10:05:00Z' }),
    N('bot', 'b', { text: 'built it 🎉', reply: { root: uriOf('charlie', 'w') }, external: { uri: 'https://crow.alpha.example.test/', title: 'Crow Sim' }, at: '2026-11-10T10:30:00Z', likes: 4 }),
    N('delta', 's', { text: 'crow sim is great', links: ['https://crow.alpha.example.test'], at: '2026-11-11T10:00:00Z' }),
  ]
  const [b] = run(posts)
  assert.equal(b.kind, 'built')
  assert.equal(b.title, 'Crow Sim')
  assert.equal(b.builtBy.handle, 'builder.alpha.example.test')
  assert.equal(b.wish.uri, uriOf('charlie', 'w'))
  assert.deepEqual(b.sharedBy.map((x) => x.handle), ['alpha.example.test', 'delta.example.test'])
})

test('the wish can be a quoted post, and a self-reply is not a wish', () => {
  const wish = post('echo', 'w2', { text: 'concept: a website that rates your bread', at: '2026-11-10T09:00:00Z' })
  const posts = [
    N('echo', 'w2', { text: 'concept: a website that rates your bread', at: '2026-11-10T09:00:00Z' }),
    N('bravo', 'b2', { text: 'I made a site for this', quote: wish, external: { uri: 'https://bread.example.test', title: 'Bread' }, at: '2026-11-10T12:00:00Z' }),
    N('bravo', 'b3', { text: 'I built a thing', external: { uri: 'https://solo.example.test', title: 'Solo' }, at: '2026-11-10T13:00:00Z' }),
    N('bravo', 'b4', { text: 'and here it is', reply: { root: uriOf('bravo', 'b3') }, at: '2026-11-10T13:01:00Z' }),
  ]
  const out = run(posts)
  const bread = out.find((b) => b.title === 'Bread')
  assert.equal(bread.wish.uri, uriOf('echo', 'w2'))
  const solo = out.find((b) => b.title === 'Solo')
  assert.equal(solo.wish, null)
  assert.ok(out.indexOf(bread) < out.indexOf(solo), 'a build with a wish outranks one without')
})

test('not builds: generic sites, host front pages, verification files, old domains without an announcement, outsiders only', () => {
  const posts = [
    N('alpha', 'g', { text: 'I built this', links: ['https://youtube.com/watch?v=abc'] }),
    N('alpha', 'h', { text: 'itch', links: ['https://itch.io'] }),
    N('alpha', 'v', { text: 'handle', links: ['https://me.itch.io/.well-known/atproto-did'] }),
    N('alpha', 'o', { text: 'nice page', links: ['https://new.example.test/a'] }),
    N('alpha', 'old', { text: 'I built it', links: ['https://old.example.test/x'] }),
    N('bigacct', 'x', { text: 'I built a thing', links: ['https://outsider.example.test'] }),
  ]
  assert.deepEqual(run(posts).map((b) => b.title), [])
})

test('a repo shared without an announcement is "shared", not "built"', () => {
  const posts = [N('alpha', 'r', { text: 'neat repo', links: ['https://github.com/someone/tool'] })]
  const [b] = run(posts)
  assert.equal(b.kind, 'shared')
  assert.equal(b.title, 'github.com/someone/tool')
})

test('builds touching an out-of-bounds topic are marked', () => {
  const posts = [N('alpha', 'r', { text: 'I built an election tracker', external: { uri: 'https://vote.alpha.example.test', title: 'Tracker' } })]
  posts[0].sensitive = ['partisan politics']
  assert.deepEqual(run(posts)[0].outOfBounds, { topics: ['partisan politics'] })
})
