import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Consent } from '../src/consent.js'
import { normalizePost, publicPost } from '../src/normalize.js'
import { post, uriOf, ACCOUNTS, actor } from './fixtures/synthetic.js'

const LABELS = ['porn', 'sexual', 'nudity', 'graphic-media']
const make = () => new Consent({ optOut: ['@Ghost.Example.Test'], blockedLabels: LABELS })

test('an opted-out handle is skipped before any request and its DID is learned', () => {
  const c = make()
  assert.equal(c.skipHandle('ghost.example.test'), true)
  assert.equal(c.check(actor('ghost')), true)
  assert.equal(c.excludedDid(ACCOUNTS.ghost.did), true)
  assert.equal(c.check(actor('alpha')), false)
})

test('opt-out by DID works without ever seeing the handle', () => {
  const c = new Consent({ optOut: [ACCOUNTS.ghost.did] })
  assert.equal(c.excludedDid(ACCOUNTS.ghost.did), true)
  const p = c.filterPost(normalizePost(post('ghost', 'g1', { text: 'mine' })))
  assert.equal(p, null)
  assert.equal(c.stats.postsDroppedOptOut, 1)
})

test("opted-out posts are dropped; others' quotes and replies keep their own text only", () => {
  const c = make()
  c.check(actor('ghost'))
  const ghostPost = post('ghost', 'g1', { text: 'secret joke' })
  assert.equal(c.filterPost(normalizePost(ghostPost)), null)

  const quoting = c.filterPost(normalizePost(post('alpha', 'a1', { text: 'this is so good', quote: ghostPost })))
  assert.equal(quoting.text, 'this is so good')
  assert.deepEqual(quoting.quote, { uri: null, state: 'removed' })
  assert.equal(quoting._quoted, null)

  const reply = c.filterPost(normalizePost(post('alpha', 'a2', { text: 'agreed', reply: { root: uriOf('ghost', 'g1') } })))
  assert.equal(reply.text, 'agreed')
  assert.equal(reply.reply.root, null)
  assert.equal(reply.reply.parent, null)
  assert.equal(reply.reply.hidden, true)
  assert.ok(reply._threadKey.startsWith('hidden:'))

  const out = JSON.stringify([quoting, reply].map(publicPost))
  assert.ok(!out.includes(ACCOUNTS.ghost.did), 'no DID of the opted-out account in output')
  assert.ok(!out.includes('ghost.example.test'))
  assert.ok(!out.includes('secret joke'))
  assert.equal(c.stats.quotesStripped, 1)
  assert.equal(c.stats.replyLinksHidden, 1)
})

test('mentions of an opted-out account are redacted from other posts', () => {
  const c = make()
  c.check(actor('ghost'))
  const p = c.filterPost(normalizePost(post('alpha', 'a3', { text: 'lol @ghost.example.test said it first', mentions: [{ key: 'ghost', text: '@ghost.example.test' }] })))
  assert.equal(p.text, 'lol @[opted-out] said it first')
  assert.equal(c.stats.mentionsRedacted, 1)
})

test('!no-unauthenticated accounts are excluded like opt-outs', () => {
  const c = make()
  assert.equal(c.check(actor('hidden')), true)
  assert.equal(c.filterPost(normalizePost(post('hidden', 'h1', { text: 'logged-in eyes only' }))), null)
  assert.equal(c.stats.postsDroppedNoUnauthenticated, 1)
  assert.equal(c.stats.noUnauthenticatedAccounts, 1)
  // learned from the author view inside a post, too
  const c2 = make()
  c2.learnFromPost(normalizePost(post('hidden', 'h2')))
  assert.equal(c2.excludedDid(ACCOUNTS.hidden.did), true)
})

test('adult and graphic labels drop the post and are counted by label', () => {
  const c = make()
  assert.equal(c.filterPost(normalizePost(post('alpha', 'n1', { labels: ['porn'] }))), null)
  assert.equal(c.filterPost(normalizePost(post('alpha', 'n2', { labels: ['graphic-media'] }))), null)
  assert.ok(c.filterPost(normalizePost(post('alpha', 'n3', { labels: ['bot'] }))))
  assert.deepEqual(c.stats.postsDroppedLabel, { porn: 1, 'graphic-media': 1 })
  // labelled quoted content is stripped, the quoting post kept
  const q = c.filterPost(normalizePost(post('bravo', 'b1', { text: 'oh no', quote: post('alpha', 'n4', { labels: ['nudity'] }) })))
  assert.equal(q.quote.state, 'removed')
})

test('counting can be switched off for posts outside the window', () => {
  const c = make()
  c.filterPost(normalizePost(post('alpha', 'x', { labels: ['porn'] })), { count: false })
  assert.deepEqual(c.stats.postsDroppedLabel, {})
})
