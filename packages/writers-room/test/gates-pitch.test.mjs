import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pitchDocument, pitchFreshness, pitchOptOut, pitchPlan } from '../src/gates/pitch.mjs'
import { cleanup, ctxFor, fakeRepo, makeEpisode, PITCH, plan, POSTS, put, ID } from './helpers.mjs'

async function withEpisode(files, fn, opts) {
  const root = fakeRepo(opts)
  try {
    makeEpisode(root, { files })
    return await fn(await ctxFor(root), root)
  } finally {
    cleanup(root)
  }
}
const ok = (r) => assert.equal(r.ok, true, r.failures.join('\n'))
const fails = (r, re) => {
  assert.equal(r.ok, false, 'expected a failure')
  assert.ok(r.failures.some((f) => re.test(f)), `no failure matching ${re}:\n${r.failures.join('\n')}`)
}

test('pitch.document passes the template with sourced stories and checked guests', () =>
  withEpisode({ 'production/pitch.md': PITCH, 'production/plan.json': plan() }, async (ctx) => ok(await pitchDocument(ctx))))

test('pitch.document fails: missing file, wrong heading, missing section, placeholder', async () => {
  await withEpisode({}, async (ctx) => fails(await pitchDocument(ctx), /pitch\.md is missing/))
  await withEpisode({ 'production/pitch.md': PITCH.replace('Episode 002', 'Episode 003') }, async (ctx) => fails(await pitchDocument(ctx), /says episode 003/))
  await withEpisode({ 'production/pitch.md': PITCH.replace('## Risks and open questions', '## Other') }, async (ctx) => fails(await pitchDocument(ctx), /no "## Risks and open questions"/))
  await withEpisode({ 'production/pitch.md': PITCH.replace('This week the cluster asked whether a throat can host.', '<the week in a sentence>') }, async (ctx) => fails(await pitchDocument(ctx), /placeholder/))
})

test('pitch.document fails a story with no source and a post not in the digest', async () => {
  await withEpisode({ 'production/pitch.md': PITCH.replace(`sources: ${POSTS.anaClaim.uri}`, 'sources: none') }, async (ctx) => fails(await pitchDocument(ctx), /story 1 cites no post/))
  await withEpisode({ 'production/pitch.md': PITCH + '\nAlso at://did:plc:zz/app.bsky.feed.post/zz\n' }, async (ctx) => fails(await pitchDocument(ctx), /not in the week's digest/))
})

test('pitch.document fails a real guest without a real-people check', () =>
  withEpisode({ 'production/pitch.md': PITCH.replace('Bo, bo.test — replies in the thread — real-people check: R1–R15 passed', 'Bo, bo.test — replies in the thread'), 'production/plan.json': plan() }, async (ctx) => fails(await pitchDocument(ctx), /bo\.test has no "real-people check/)))

test('pitch.plan passes a well-formed plan, with no minimum length', () =>
  withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'cold-open', format: 'ask', seconds: 12, built: [0, 1] }], guests: [] }) }, async (ctx) => ok(await pitchPlan(ctx))))

test('pitch.plan fails: fields, ceiling, BUILT chain, song without genre', async () => {
  await withEpisode({}, async (ctx) => fails(await pitchPlan(ctx), /plan\.json is missing/))
  await withEpisode({ 'production/plan.json': plan({ week: '2026-W48' }) }, async (ctx) => fails(await pitchPlan(ctx), /"week" is "2026-W48"/))
  await withEpisode({ 'production/plan.json': plan({ question: '' }) }, async (ctx) => fails(await pitchPlan(ctx), /"question" is empty/))
  await withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'a', format: 'ask', seconds: 300 }, { id: 'b', format: 'panel', seconds: 300 }], guests: [] }) }, async (ctx) => fails(await pitchPlan(ctx), /over the 590 s ceiling/))
  await withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'a', format: 'ask', seconds: 20, built: [0, 1] }, { id: 'b', format: 'monologue', seconds: 20, built: [2, 3] }], guests: [] }) }, async (ctx) => fails(await pitchPlan(ctx), /BUILT chain breaks/))
  await withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'song', format: 'song', seconds: 50, theme: 'x' }], guests: [] }) }, async (ctx) => fails(await pitchPlan(ctx), /needs "genre"/))
  await withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'Bad Id', format: 'ask', seconds: 20 }], guests: [] }) }, async (ctx) => fails(await pitchPlan(ctx), /"id" must be a segment id/))
})

test('pitch.plan fails out-of-bounds posts, opted-out and unknown guests', async () => {
  await withEpisode({ 'production/plan.json': plan({ sincere: { kind: 'credit', source: POSTS.oob.uri } }) }, async (ctx) => fails(await pitchPlan(ctx), /out of bounds \(rule R10\)/))
  await withEpisode({ 'production/plan.json': plan({ guests: [{ cast: 'x', handle: 'nope.test' }] }) }, async (ctx) => fails(await pitchPlan(ctx), /opted out \(rule R11\)/))
  await withEpisode({ 'production/plan.json': plan({ guests: [{ cast: 'x', handle: 'stranger.test' }] }) }, async (ctx) => fails(await pitchPlan(ctx), /not in the week's digest/))
})

test('pitch.plan checks a verbatim thread is in thread order', async () => {
  const seg = (posts) => plan({ segments: [{ id: 'chat', format: 'thread', seconds: 40, thread: { posts } }] })
  await withEpisode({ 'production/plan.json': seg([POSTS.anaClaim.uri, POSTS.anaAgain.uri]) }, async (ctx) => ok(await pitchPlan(ctx)))
  await withEpisode({ 'production/plan.json': seg([POSTS.boReply.uri, POSTS.anaClaim.uri]) }, async (ctx) => fails(await pitchPlan(ctx), /not in the thread's order/))
  await withEpisode({ 'production/plan.json': seg([]) }, async (ctx) => fails(await pitchPlan(ctx), /needs "thread"/))
})

test('pitch.freshness: the one gate is the previous episode\'s song genre', async () => {
  const song = (genre) => plan({ segments: [{ id: 'song', format: 'song', genre, theme: 'a throat', seconds: 50 }] })
  await withEpisode({ 'production/plan.json': song('Stomp-clap anthem') }, async (ctx) => fails(await pitchFreshness(ctx), /is the previous episode's/))
  await withEpisode({ 'production/plan.json': song('sea shanty') }, async (ctx) => ok(await pitchFreshness(ctx)))
})

test('pitch.freshness: the history falls back to the rotation log when a plan is missing', () =>
  withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'song', format: 'song', genre: 'stomp-clap anthem', theme: 'x', seconds: 50 }] }) }, async (ctx) => {
    assert.equal(ctx.history[0].source, 'rotation log')
    fails(await pitchFreshness(ctx), /previous episode's \(001-pilot\)/)
  }, { pilotPlan: false }))

test('pitch.freshness warns, never fails, on rules of thumb, and shows the answers', () =>
  withEpisode({ 'production/plan.json': plan({ segments: [{ id: 'p', format: 'panel', seconds: 40 }], runner: 'gm/gn', descriptor: 'a throat', sincere: { kind: 'belonging' }, builtShapes: ['plain', 'plain'], callbacks: ['SL-01', 'SL-02', 'SL-03'], overrides: { runner: 'its return is the joke' } }) }, async (ctx) => {
    const r = await pitchFreshness(ctx)
    ok(r)
    const w = r.warnings.join('\n')
    assert.match(w, /middle format "panel"/)
    assert.match(w, /guest ana\.test was also in 001-pilot \[answered: the thread is hers\]/)
    assert.match(w, /episode runner "gm\/gn".*\[answered: its return is the joke\]/)
    assert.match(w, /Sibyl descriptor "a throat".*\[unanswered/)
    assert.match(w, /sincere beat is "belonging" again/)
    assert.match(w, /shape repeated within the episode: plain/)
    assert.match(w, /3 cross-episode callbacks/)
  }))

test('pitch.optout fails when an opted-out account is named in any file, without naming it', () =>
  withEpisode({ 'production/pitch.md': PITCH + '\nconsidered @nope.test but no\n' }, async (ctx) => {
    const r = await pitchOptOut(ctx)
    fails(r, /opt-out list/)
    assert.ok(!r.failures.join(' ').includes('nope'))
  }))

test('pitch.optout passes when the name appears only inside a longer handle', () =>
  withEpisode({ 'production/pitch.md': PITCH + '\nsee @nope.test.other.test\n' }, async (ctx) => ok(await pitchOptOut(ctx))))
