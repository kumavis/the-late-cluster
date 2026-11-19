import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Candidates, selectMembers } from '../src/cluster.js'
import { loadConfig } from '../src/config.js'

const exp = { ...loadConfig().cluster.expansion }
const seeds = new Set(['did:s1', 'did:s2', 'did:s3'])

function build() {
  const c = new Candidates()
  for (const s of seeds) c.get(s, { did: s, handle: s.slice(4) + '.test' })
  // followed by two seeds and talked to once: in
  c.follow('did:s1', { did: 'did:x1', handle: 'x1.test' })
  c.follow('did:s2', { did: 'did:x1', handle: 'x1.test' })
  c.interact({ did: 'did:x1' }, 'seedRepliedTo')
  // followed by two seeds, never interacted: out
  c.follow('did:s1', { did: 'did:x2', handle: 'x2.test' })
  c.follow('did:s2', { did: 'did:x2', handle: 'x2.test' })
  // followed by all three: in
  for (const s of seeds) c.follow(s, { did: 'did:x3', handle: 'x3.test' })
  // lots of interaction, no follows: in
  c.interact({ did: 'did:x4', handle: 'x4.test' }, 'repliedToSeed', 7)
  // used the search term and one seed follows: in
  c.follow('did:s3', { did: 'did:x5', handle: 'x5.test' })
  c.get('did:x5').termPosts = 1
  // a stranger who used the term once: out
  c.get('did:x6', { did: 'did:x6', handle: 'x6.test' }).termPosts = 1
  return c
}

test('members are seeds plus accounts satisfying any rule', () => {
  const sel = selectMembers(build(), seeds, exp)
  const dids = sel.members.map((m) => m.did)
  for (const s of seeds) assert.ok(dids.includes(s))
  assert.ok(dids.includes('did:x1'))
  assert.ok(!dids.includes('did:x2'))
  assert.ok(dids.includes('did:x3'))
  assert.ok(dids.includes('did:x4'))
  assert.ok(dids.includes('did:x5'))
  assert.ok(!dids.includes('did:x6'))
  assert.equal(sel.members[0].seed, true)
  assert.equal(sel.members.find((m) => m.did === 'did:x1').rule, 0)
})

test('the cap keeps seeds and the highest scores, ties broken by DID', () => {
  const sel = selectMembers(build(), seeds, { ...exp, maxMembers: 4 })
  assert.equal(sel.members.length, 4)
  assert.deepEqual(sel.members.slice(0, 3).map((m) => m.seed), [true, true, true])
  assert.equal(sel.cut, sel.qualified - 4)
  const again = selectMembers(build(), seeds, { ...exp, maxMembers: 4 })
  assert.deepEqual(again.members.map((m) => m.did), sel.members.map((m) => m.did))
})

test('excluded accounts never become members, even as seeds', () => {
  const sel = selectMembers(build(), seeds, exp, (c) => c.did === 'did:x3' || c.did === 'did:s2')
  const dids = sel.members.map((m) => m.did)
  assert.ok(!dids.includes('did:x3'))
  assert.ok(!dids.includes('did:s2'))
})
