// The scope stage's coverage figures (scope/coverage.md and .json). Two bugs these guard: the digest
// loader dropped the members' `seed` flag, so the seeds' share read 0 %; and the parsed digest was
// never kept, so every figure the scraper computes (its coverage, the excluded counts, the story-lead
// shares) came out null. Figures the scraper computes are taken from it; the rest is computed over
// members' posts in the window, never over everyone the digest mentions.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { loadDigest } from '../src/digest.mjs'
import { coverage, STAGE_DEFS } from '../src/stages.mjs'
import { readFileSync } from 'node:fs'
import { cleanup, ctxFor, fakeRepo, makeEpisode, put, uri, WEEK } from './helpers.mjs'

const post = (who, rkey, over = {}) => ({ uri: uri(who, rkey), url: `https://bsky.app/profile/${who}.test/post/${rkey}`, handle: `${who}.test`, authorDid: `did:plc:${who}`, text: `post ${rkey}`, time: '2026-11-17T10:00:00Z', ...over })

// ana is a seed; bo and cy were featured in the pilot (helpers' PILOT_LEDGER); dot is a member who is
// neither; zed is an outsider members talked with, who posts a lot and must not count.
function fixture({ withCoverage }) {
  const own = [post('ana', 'a1', { member: true }), post('ana', 'a2', { member: true }), post('bo', 'b1', { member: true }), post('cy', 'c1', { member: true }), post('dot', 'd1', { member: true })]
  const outsider = [post('zed', 'z1', { member: false }), post('zed', 'z2', { member: false }), post('zed', 'z3', { member: false })]
  const before = post('dot', 'd0', { member: true, time: '2026-11-01T10:00:00Z' }) // thread context before the window
  const d = {
    format: 'late-cluster-digest/1',
    window: { label: WEEK, kind: 'week', start: '2026-11-16T00:00:00.000Z', end: '2026-11-23T00:00:00.000Z' },
    stats: { excluded: { optedOutAccountsSeen: 1, noUnauthenticatedAccounts: 2 } },
    stories: [
      { id: 's-1', rank: 1, kind: 'thread', outOfBounds: null, posts: [own[0], outsider[0]] },
      { id: 's-2', rank: 2, kind: 'post', outOfBounds: null, posts: [own[4]], context: [before] },
      { id: 's-3', rank: 3, kind: 'post', outOfBounds: null, posts: [outsider[1]] },
      { id: 's-4', rank: 4, kind: 'post', outOfBounds: null, posts: [own[2]] },
    ],
    sections: { built: [{ builtBy: { handle: 'ana.test', authorDid: 'did:plc:ana' } }, { builtBy: { handle: 'dot.test', authorDid: 'did:plc:dot' } }], games: [] },
    members: [
      { did: 'did:plc:ana', handle: 'ana.test', seed: true, followers: 900, rule: 'seed' },
      { did: 'did:plc:bo', handle: 'bo.test', seed: false, followers: 120, small: true, rule: 0 },
      { did: 'did:plc:cy', handle: 'cy.test', seed: false, followers: 400, rule: 1 },
      { did: 'did:plc:dot', handle: 'dot.test', seed: false, followers: 50, small: true, rule: 0 },
    ],
    authors: {
      'did:plc:ana': { handle: 'ana.test', member: true, featuredPrevious: null, featuredEarlier: null, timesFeatured: 0 },
      'did:plc:bo': { handle: 'bo.test', member: true, featuredPrevious: 'spoke', timesFeatured: 1 },
      'did:plc:cy': { handle: 'cy.test', member: true, featuredPrevious: 'shown', timesFeatured: 1 },
      'did:plc:dot': { handle: 'dot.test', member: true, featuredPrevious: null, timesFeatured: 0 },
      'did:plc:zed': { handle: 'zed.test', member: false, featuredPrevious: null, timesFeatured: 0 },
    },
  }
  if (withCoverage)
    d.coverage = {
      size: { members: 4, active: 4, candidates: 40 },
      concentration: {
        memberPosts: 5, topStoriesConsidered: 4, builds: 2,
        top10: { posts: 1, topStories: 0.5, built: 1, accounts: [{ handle: 'ana.test', posts: 2 }, { handle: 'bo.test', posts: 1 }, { handle: 'cy.test', posts: 1 }, { handle: 'dot.test', posts: 1 }] },
        seeds: { posts: 0.18, topStories: 0.25, built: 0.5 },
        featuredBefore: { posts: 0.4, topStories: 0.25, built: 0, ledger: '1 episode(s)' },
      },
      worries: ['18% of member posts are from the seeds (threshold 15%).'],
      excluded: { optedOutAccountsSeen: 1, noUnauthenticatedAccounts: 2, selfDeclaredAccounts: 3 },
    }
  // posts.jsonl holds every kept post in the window, as the scraper writes it
  return { digest: d, jsonl: [...own, ...outsider].map((x) => JSON.stringify(x)).join('\n') + '\n' }
}

async function withRepo({ digest, jsonl }, fn) {
  const root = fakeRepo()
  try {
    makeEpisode(root)
    put(root, `data/weeks/${WEEK}/digest.json`, digest)
    put(root, `data/weeks/${WEEK}/posts.jsonl`, jsonl)
    if (digest.coverage) put(root, `data/weeks/${WEEK}/coverage.md`, '# Coverage\n')
    return await fn(await ctxFor(root), root)
  } finally {
    cleanup(root)
  }
}

test('the digest keeps who is a member and who is a seed, and the parsed digest itself', () => {
  const root = fakeRepo()
  try {
    put(root, `data/weeks/${WEEK}/digest.json`, fixture({ withCoverage: true }).digest)
    const d = loadDigest(join(root, 'data', 'weeks', WEEK))
    assert.equal(d.accounts.get('ana.test').seed, true)
    assert.equal(d.accounts.get('ana.test').member, true)
    assert.equal(d.accounts.get('bo.test').seed, false)
    assert.equal(d.accounts.get('zed.test').member, false)
    assert.equal(d.posts.get(uri('zed', 'z1')).member, false)
    assert.ok(d.raw?.coverage?.concentration, 'd.raw is the parsed digest')
  } finally {
    cleanup(root)
  }
})

test('without the scraper\'s coverage block: the seeds\' share is not 0 %, and outsiders do not count', () =>
  withRepo(fixture({ withCoverage: false }), (ctx) => {
    const c = coverage(ctx)
    assert.equal(c.source, 'tool')
    assert.equal(c.memberPosts, 5, 'members\' posts in the window only: no outsider, no context from before the window')
    assert.equal(c.shareSeeds, 40, 'ana, a seed, wrote 2 of the 5 member posts')
    assert.equal(c.shareFeaturedBefore, 40, 'bo and cy wrote 2 of 5')
    assert.ok(!c.top10.some((t) => t.handle === 'zed.test'), 'an outsider is not among the most active members')
    assert.equal(c.newVoices, 1, 'only dot is an active member neither seed nor featured; zed is not a member')
    assert.equal(c.storyLeadsSeeds, 25)
    assert.equal(c.buildsSeeds, 50)
    assert.deepEqual(c.excluded, { optedOutAccountsSeen: 1, noUnauthenticatedAccounts: 2 }, 'the excluded counts come from stats when there is no coverage block')
  }))

test('with the scraper\'s coverage block: every figure it has is taken from it, none is null', () =>
  withRepo(fixture({ withCoverage: true }), async (ctx, root) => {
    const c = coverage(ctx)
    assert.equal(c.source, 'scraper')
    const fromScraper = { members: 4, activeMembers: 4, memberPosts: 5, shareTop10: 100, shareSeeds: 18, shareFeaturedBefore: 40, topStories: 4, storyLeadsTop10: 50, storyLeadsSeeds: 25, storyLeadsFeaturedBefore: 25, builds: 2, buildsTop10: 100, buildsSeeds: 50, buildsFeaturedBefore: 0 }
    for (const [k, v] of Object.entries(fromScraper)) assert.equal(c[k], v, k)
    for (const k of ['excluded', 'worries', 'top10', 'newVoices', 'scraperReport']) assert.notEqual(c[k] ?? null, null, `${k} is null`)
    assert.equal(c.excluded.selfDeclaredAccounts, 3)
    assert.equal(c.newVoices, 1)
    // the stage writes it, and the table has no empty figure
    STAGE_DEFS.scope.prepare(await ctxFor(root))
    const md = readFileSync(join(root, 'episodes', '002-2026-w47', 'production', 'scope', 'coverage.md'), 'utf8')
    assert.match(md, /\| share of member posts from the seeds \| 18 % \|/)
    assert.match(md, /\| active members neither seeds nor featured before \| 1 of 4 \|/)
    assert.doesNotMatch(md, /\bnull\b|n\/a|undefined|NaN/)
  }))

test('a member whose handle changed in the window is one person, as the scraper counts them', () => {
  const f = fixture({ withCoverage: false })
  f.jsonl += JSON.stringify(post('dot', 'd2', { member: true, handle: 'dot-renamed.test' })) + '\n'
  return withRepo(f, (ctx) => {
    const c = coverage(ctx)
    assert.equal(c.memberPosts, 6)
    assert.equal(c.newVoices, 1, 'dot under either handle is one active member')
    assert.equal(c.top10.filter((t) => /^dot/.test(t.handle)).length, 1)
  })
})
