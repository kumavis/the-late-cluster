import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizePost, normalizeUrl, publicPost, bskyUrl, effectiveTime, mergePost } from '../src/normalize.js'
import { post, uriOf, ACCOUNTS } from './fixtures/synthetic.js'

test('a plain post keeps exactly the fields writers need', () => {
  const p = normalizePost(post('alpha', 'r1', { text: 'hello cluster', likes: 4, reposts: 1, replies: 2, quotes: 3 }), { source: 'author' })
  assert.equal(p.uri, uriOf('alpha', 'r1'))
  assert.equal(p.url, 'https://bsky.app/profile/alpha.example.test/post/r1')
  assert.equal(p.authorDid, ACCOUNTS.alpha.did)
  assert.equal(p.handle, 'alpha.example.test')
  assert.equal(p.displayName, 'Alpha Tester')
  assert.deepEqual(p.counts, { likes: 4, reposts: 1, replies: 2, quotes: 3 })
  assert.equal(p.reply, null)
  assert.equal(p.quote, null)
  const pub = publicPost(p)
  assert.ok(!Object.keys(pub).some((k) => k.startsWith('_')))
  assert.ok(!('avatar' in pub))
  assert.ok(!JSON.stringify(pub).includes('cdn.bsky.app'))
})

test('reply relations, quotes with media, alt text and link titles', () => {
  const quoted = post('bravo', 'q1', { text: 'the original bit', likes: 9 })
  const v = post('alpha', 'r2', {
    text: 'built it',
    reply: { root: uriOf('charlie', 'root'), parent: uriOf('delta', 'mid') },
    quote: quoted,
    external: { uri: 'https://www.Example.org/tool/?utm_source=bsky&x=1#top', title: 'The Tool' },
  })
  const p = normalizePost(v)
  assert.deepEqual(p.reply, { root: uriOf('charlie', 'root'), parent: uriOf('delta', 'mid') })
  assert.equal(p.quote.uri, uriOf('bravo', 'q1'))
  assert.equal(p._quoted.text, 'the original bit')
  assert.deepEqual(p.links, [{ url: 'https://example.org/tool?x=1', domain: 'example.org', title: 'The Tool' }])

  const withImages = normalizePost(post('alpha', 'r3', { text: 'meme', images: ['a crow wearing a crown', ''] }))
  assert.deepEqual(withImages.imageAlts, ['a crow wearing a crown'])
  assert.equal(withImages.hasImages, true)
})

test('a quoted post that cannot be seen is recorded by state only', () => {
  const v = post('alpha', 'r4', { text: 'lol' })
  v.embed = { $type: 'app.bsky.embed.record#view', record: { $type: 'app.bsky.embed.record#viewNotFound', uri: uriOf('bravo', 'gone'), notFound: true } }
  const p = normalizePost(v)
  assert.deepEqual(p.quote, { uri: uriOf('bravo', 'gone'), state: 'notfound' })
  assert.equal(p._quoted, null)
})

test('url normalization collapses the usual variants', () => {
  assert.equal(normalizeUrl('https://youtu.be/abc123?si=xyz'), 'https://youtube.com/watch?v=abc123')
  assert.equal(normalizeUrl('http://www.youtube.com/watch?v=abc123&feature=share'), 'https://youtube.com/watch?v=abc123')
  assert.equal(normalizeUrl('https://twitter.com/someone/status/1'), 'https://x.com/someone/status/1')
  assert.equal(normalizeUrl('https://site.test/'), 'https://site.test')
  assert.equal(normalizeUrl('https://site.test/a/'), 'https://site.test/a')
  assert.equal(normalizeUrl('https://site.test/?b=2&a=1'), 'https://site.test/?a=1&b=2')
  assert.equal(normalizeUrl('mailto:x@y.test'), null)
  assert.equal(normalizeUrl('not a url'), null)
})

test('bsky URLs fall back to the DID when the handle is invalid', () => {
  assert.equal(bskyUrl('at://did:plc:x/app.bsky.feed.post/abc', 'handle.invalid'), 'https://bsky.app/profile/did:plc:x/post/abc')
})

test('backdated createdAt falls back to indexedAt', () => {
  assert.equal(effectiveTime('2020-01-01T00:00:00Z', '2026-11-10T00:00:00Z'), Date.parse('2026-11-10T00:00:00Z'))
  assert.equal(effectiveTime('2026-11-10T00:00:00Z', '2026-11-10T00:00:05Z'), Date.parse('2026-11-10T00:00:00Z'))
})

test('merging two sightings keeps the highest counts and every source', () => {
  const a = normalizePost(post('alpha', 'm', { likes: 3 }), { source: 'author' })
  const b = normalizePost(post('alpha', 'm', { likes: 5, replies: 1 }), { source: 'thread' })
  const m = mergePost(a, b)
  assert.equal(m.counts.likes, 5)
  assert.equal(m.counts.replies, 1)
  assert.deepEqual(m.sources, ['author', 'thread'])
})
