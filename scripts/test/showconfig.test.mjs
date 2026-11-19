import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readShowConfig, normalizeBluesky } from '../lib/showconfig.mjs'
import { REPO } from '../lib/episodes.mjs'
import { resolveEpisode } from '../lib/episodes.mjs'
import { episodePlugin } from '../../packages/show/vite/episode.js'
import { tempRoot, addEpisode } from './fixture.mjs'

test('show.config.json: siteUrl is validated when set and empty by default', () => {
  const fx = tempRoot()
  try {
    assert.equal(readShowConfig(fx.root).siteUrl, '') // no file
    fx.put('show.config.json', JSON.stringify({ siteUrl: '' }))
    assert.equal(readShowConfig(fx.root).siteUrl, '')
    fx.put('show.config.json', JSON.stringify({ siteUrl: 'https://user.github.io/the-late-cluster', other: 1 }))
    assert.deepEqual(readShowConfig(fx.root), { siteUrl: 'https://user.github.io/the-late-cluster/', other: 1 })
    for (const bad of ['http://user.github.io/', 'https://x.test/?a=1', 'https://x.test/#top', 'not a url']) {
      fx.put('show.config.json', JSON.stringify({ siteUrl: bad }))
      assert.throws(() => readShowConfig(fx.root), /siteUrl/)
    }
    fx.put('show.config.json', '{ nope')
    assert.throws(() => readShowConfig(fx.root), /show\.config\.json/)
  } finally {
    fx.cleanup()
  }
})


test('a build\'s Open Graph URLs come from show.config.json, never from SITE_URL', () => {
  const fx = tempRoot()
  const saved = process.env.SITE_URL
  try {
    addEpisode(fx, '001-pilot')
    const html = '<title>x</title>\n    <meta name="description" content="x" />'
    const page = () => episodePlugin(resolveEpisode('1', { root: fx.root })).transformIndexHtml(html)
    process.env.SITE_URL = 'https://env.example.test/'
    assert.match(page(), /<meta property="og:image" content="thumbnail.jpg" \/>/)
    assert.doesNotMatch(page(), /env\.example|og:url/)
    fx.put('show.config.json', JSON.stringify({ siteUrl: 'https://user.github.io/the-late-cluster' }))
    assert.match(page(), /<meta property="og:image" content="https:\/\/user\.github\.io\/the-late-cluster\/episodes\/001-pilot\/thumbnail\.jpg" \/>/)
    assert.match(page(), /<meta property="og:url" content="https:\/\/user\.github\.io\/the-late-cluster\/episodes\/001-pilot\/" \/>/)
  } finally {
    if (saved === undefined) delete process.env.SITE_URL
    else process.env.SITE_URL = saved
    fx.cleanup()
  }
})

test('show.config.json: the bluesky identity is optional, and handle and did go together', () => {
  const fx = tempRoot()
  try {
    fx.put('show.config.json', JSON.stringify({ siteUrl: '' }))
    assert.equal(readShowConfig(fx.root).bluesky, undefined)
    fx.put('show.config.json', JSON.stringify({ siteUrl: '', bluesky: { handle: '@LateCluster.Simcluster.TV', did: 'did:plc:zdobmviiuyfkc6xyylmpm2sf' } }))
    assert.deepEqual(readShowConfig(fx.root).bluesky, { handle: 'latecluster.simcluster.tv', did: 'did:plc:zdobmviiuyfkc6xyylmpm2sf' })
    assert.deepEqual(normalizeBluesky({ handle: 'show.example.com', did: 'did:web:show.example.com' }), { handle: 'show.example.com', did: 'did:web:show.example.com' })
    assert.equal(normalizeBluesky({}), undefined)
    for (const [b, re] of [
      [{ handle: 'latecluster.simcluster.tv' }, /together/],
      [{ did: 'did:plc:abc' }, /together/],
      [{ handle: 'nodot', did: 'did:plc:abc' }, /not a handle/],
      [{ handle: 'bad_char.example.com', did: 'did:plc:abc' }, /not a handle/],
      [{ handle: 'example.123', did: 'did:plc:abc' }, /not a handle/],
      [{ handle: 'show.example.com', did: 'plc:abc' }, /not a DID/],
      [{ handle: 'show.example.com', did: 'did:PLC:abc' }, /not a DID/],
      [{ handle: 'show.example.com', did: 'did:plc:abc:' }, /not a DID/],
      ['latecluster.simcluster.tv', /object/],
    ]) assert.throws(() => normalizeBluesky(b), re)
  } finally {
    fx.cleanup()
  }
})

test('the committed show.config.json is valid', () => {
  assert.doesNotThrow(() => readShowConfig(REPO))
})
