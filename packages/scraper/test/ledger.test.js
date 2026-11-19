import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadLedger, previousEpisode, featuredLookup, frequentlyFeatured } from '../src/ledger.js'
import { chooseSeeds, connectedness } from '../src/seeds.js'

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'scraper-ledger-'))
  const dir = join(root, 'docs', 'ledger')
  await mkdir(dir, { recursive: true })
  await mkdir(join(root, 'episodes', '001-one'), { recursive: true })
  await writeFile(join(root, 'episodes', '001-one', 'episode.json'), JSON.stringify({ airDate: '2026-11-01' }))
  await writeFile(join(dir, '001-one.json'), JSON.stringify({ id: '001-one', aired: true, guests: ['a.example.test'], featured: ['a.example.test', 'b.example.test'] }))
  await writeFile(join(dir, '002-two.json'), JSON.stringify({ id: '002-two', aired: '2026-11-08', guests: [{ did: 'did:plc:ccc', handle: 'c-old.example.test' }], featured: [{ did: 'did:plc:ccc', handle: 'c-old.example.test' }, { did: 'did:plc:aaa', handle: 'a.example.test' }] }))
  await writeFile(join(dir, '003-draft.json'), JSON.stringify({ id: '003-draft', aired: false, guests: ['d.example.test'], featured: [] }))
  await writeFile(join(dir, 'featured.json'), JSON.stringify({
    'did:plc:aaa': { handle: 'a.example.test', appearances: [{ episode: '001-one', date: '2026-11-01', role: 'spoke' }, { episode: '002-two', date: '2026-11-08', role: 'shown' }] },
    'did:plc:ddd': { handle: 'd.example.test', appearances: [{ episode: '003-draft', date: '2026-11-15', role: 'spoke' }] },
  }))
  return { root, dir }
}

test('the ledger reads episodes, dates and the tracker, and skips drafts', async () => {
  const { root, dir } = await fixture()
  try {
    const l = loadLedger(dir, { repoRoot: root })
    assert.equal(l.found, true)
    assert.deepEqual(l.episodes.map((e) => [e.id, e.aired, e.date]), [['001-one', true, '2026-11-01'], ['002-two', true, '2026-11-08'], ['003-draft', false, null]])
    assert.equal(l.tracker.length, 2)
    const at = Date.parse('2026-11-19T00:00:00Z')
    assert.equal(previousEpisode(l, at).id, '002-two')
    const f = featuredLookup(l, at)
    // by DID, though the episode file has an old handle
    assert.deepEqual(f('did:plc:ccc', 'c-new.example.test'), { previous: 'spoke', earlier: null, episodes: ['002-two'], appearances: 1 })
    // by handle when only the handle is known, joined to the DID through the tracker
    assert.deepEqual(f('did:plc:aaa', 'a.example.test'), { previous: 'shown', earlier: 'spoke', episodes: ['001-one', '002-two'], appearances: 2 })
    assert.deepEqual(f(null, 'b.example.test'), { previous: null, earlier: 'shown', episodes: ['001-one'], appearances: 1 })
    // a draft is not featuring
    assert.equal(f('did:plc:ddd', 'd.example.test').appearances, 0)
    const freq = frequentlyFeatured(l, { min: 2, atMs: at })
    assert.deepEqual(freq.map((x) => [x.handle, x.appearances, x.ofEpisodes]), [['a.example.test', 2, 2]])
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('a missing or empty ledger is handled', async () => {
  const missing = loadLedger('/nonexistent/ledger')
  assert.equal(missing.found, false)
  assert.match(missing.problems[0], /no ledger directory/)
  assert.equal(previousEpisode(missing), null)
  assert.deepEqual(featuredLookup(missing)('did:plc:x', 'x.example.test'), { previous: null, earlier: null, episodes: [], appearances: 0 })
  const empty = await mkdtemp(join(tmpdir(), 'scraper-ledger-empty-'))
  try {
    const l = loadLedger(empty)
    assert.equal(l.found, true)
    assert.equal(l.episodes.length, 0)
    assert.deepEqual(frequentlyFeatured(l), [])
  } finally {
    await rm(empty, { recursive: true, force: true })
  }
  assert.equal(loadLedger(null).found, false)
})

test('the optional drift mode keeps strong seeds and turns over at most a few', () => {
  const M = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((k, i) => ({ did: `did:plc:${k}`, handle: `${k}.example.test`, seed: i < 4 }))
  // e and f talk with everyone; a talks a lot; b, c, d are quiet
  const P = (from, to, n) => ({ uri: `at://did:plc:${from}/app.bsky.feed.post/${n}`, authorDid: `did:plc:${from}`, reply: { parent: `at://did:plc:${to}/app.bsky.feed.post/x${n}` } })
  const posts = [P('e', 'a', 1), P('f', 'a', 2), P('g', 'a', 3), P('a', 'e', 4), P('f', 'e', 5), P('g', 'e', 6), P('e', 'f', 7), P('g', 'f', 8), P('b', 'c', 9)]
  const r = connectedness(M, posts)
  assert.deepEqual(r.slice(0, 3).map((x) => x.handle), ['a.example.test', 'e.example.test', 'f.example.test'])
  const plan = chooseSeeds({ bootstrap: [], cfg: { mode: 'drift', count: 4, maxTurnover: 2, keepWithinTop: 4 }, previous: { label: 'W', members: M, posts } })
  // a stays (still central); of b, c, d only two may go, so the strongest of them (c) stays
  assert.deepEqual(plan.seeds.map((s) => s.handle).sort(), ['a.example.test', 'c.example.test', 'e.example.test', 'f.example.test'])
  assert.ok(plan.seeds.filter((s) => s.reason.startsWith('new')).length <= 2, 'at most two change')
  assert.ok(plan.seeds.some((s) => s.handle === 'a.example.test' && s.reason.startsWith('kept')))
  // cold start: the bootstrap list
  const cold = chooseSeeds({ bootstrap: [{ did: 'did:plc:z', reason: 'bootstrap' }], cfg: { mode: 'drift' }, previous: null })
  assert.equal(cold.mode, 'cold start')
  assert.equal(cold.seeds[0].reason, 'bootstrap')
})
