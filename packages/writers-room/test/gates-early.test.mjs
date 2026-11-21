// the gates and the tool's decisions on stages 1 to 9, through the stage definitions: scope (the
// verdict from a fixed field), research (cards from skeletons, the screen with merges and terms),
// rank, brainstorm, shortlist, draft (the standing segments, a draft's own cast), select (the caps),
// and the pieces briefs are made of (reading lists, --task, a fresh id, the cold-viewer stretch)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { STAGE_DEFS, selection } from '../src/stages.mjs'
import { scopeVerdict } from '../src/stage/early.mjs'
import { readingList } from '../src/briefs.mjs'
import { concerns, freshSlug } from '../src/pipeline.mjs'
import { longestSilence } from '../src/cold.mjs'
import { coldStretches } from '../src/experiment.mjs'
import { cleanup, ctxFor, fakeRepo, makeEpisode, POSTS, put, WEEK } from './helpers.mjs'

const gateOf = (stage, name) => STAGE_DEFS[stage].waves.flatMap((w) => w.gates ?? []).find((g) => g.name === name)
async function run(stage, name, files, { setup } = {}) {
  const root = fakeRepo()
  try {
    makeEpisode(root, { files })
    if (setup) setup(root)
    return await gateOf(stage, name)(await ctxFor(root))
  } finally {
    cleanup(root)
  }
}
const ok = (r) => assert.equal(r.ok, true, r.failures.join('\n'))
const fails = (r, re) => {
  assert.equal(r.ok, false, `expected a failure matching ${re}`)
  assert.ok(r.failures.some((f) => re.test(f)), `no failure matching ${re}:\n${r.failures.join('\n')}`)
}

test('scope: the verdict is the first line under "## Verdict", never a "Verdict:" line elsewhere (finding 2)', async () => {
  const md = (v, extra = '') => ['## Is this the community the show is about?', 'yes', '## Is it wide enough that the episode will not be about the same few people?', 'yes', '## Is anything obviously missing?', `no. ${extra}`, '## Notes to the owner', 'none', '## Notes to research', 'none', '## Verdict', '', v, ''].join('\n')
  assert.deepEqual(scopeVerdict(md('rescrape: raise the member cap to 250')), { verdict: 'rescrape', change: 'raise the member cap to 250' })
  const g = (text) => run('scope', 'scopeReview', { 'production/review/scope.md': text })
  ok(await g(md('proceed', '\nVerdict: rescrape: an earlier note')))
  const back = await g(md('rescrape: widen'))
  assert.equal(back.sentBack.route, 'scope')
  assert.ok(!back.sentBack.reason.includes('widen'), "state.json gets the route, not the auditor's words")
  fails(await g(md('maybe')), /first line under "## Verdict"/)
  fails(await g(md('proceed').replace('## Notes to research', '## Notes')), /no "## Notes to research" section/)
})

const CARD = { id: 'talk-throat', lane: 'talk', title: 'A talk show with a throat for a host', skeletons: ['s-thread'], posts: [POSTS.anaClaim.uri, POSTS.boReply.uri], summary: 'Ana proposed a talk show whose host is a throat; Bo replied.', media: {}, showable: 'none', unknown: 'none', sensitive: 'none' }
const card = (over = {}, id = 'talk-throat', lane = 'talk') => ({ [`production/research/cards/${lane}/${id}.json`]: { ...CARD, id, lane, ...over } })

test('research.cards: built from skeletons, never retyped; no jokes; a marked post is refused, the rest of its story stays', async () => {
  ok(await run('research', 'researchCards', card()))
  fails(await run('research', 'researchCards', card({ premise: 'the throat hosts' })), /a card carries no jokes \("premise"\)/)
  fails(await run('research', 'researchCards', card({ skeletons: ['s-nope'] })), /skeleton s-nope is not in the week's skeletons/)
  fails(await run('research', 'researchCards', card({ posts: [POSTS.build.uri] })), /is not a post of the card's skeletons/)
  fails(await run('research', 'researchCards', card({ posts: [{ uri: POSTS.anaClaim.uri, text: 'concept: a talk show where the host is a throat' }] })), /not the post's exact text; leave text out/)
  fails(await run('research', 'researchCards', card({ skeletons: ['s-oob'], posts: undefined }, 'talk-left')), /is marked sensitive by the scraper .*leave that post out, the rest of the story stays usable/)
  fails(await run('research', 'researchCards', card({}, 'made-throat', 'talk')), /"id" must be .* starting "talk-"/)
  fails(await run('research', 'researchCards', card({ showable: undefined })), /"showable" must be a sentence, or "none"/)
})

test('research.cards: a skeleton post with a picture needs its description (from the scraper\'s skeletons)', async () => {
  const skeletons = (root) => {
    const d = join(root, `data/weeks/${WEEK}/skeletons`)
    put(root, `data/weeks/${WEEK}/skeletons/index.json`, { skeletons: [{ id: 'k-1', lane: 'made' }] })
    put(root, `data/weeks/${WEEK}/skeletons/k-1.json`, { id: 'k-1', lane: 'made', posts: [{ uri: POSTS.build.uri, text: POSTS.build.text, handle: 'cy.test', media: [{ kind: 'image', url: 'https://cdn.test/x.jpg' }] }] })
    return d
  }
  const c = { 'production/research/cards/made/made-golem.json': { ...CARD, id: 'made-golem', lane: 'made', skeletons: ['k-1'], posts: undefined } }
  fails(await run('research', 'researchCards', c, { setup: skeletons }), /has pictures or video: say what they show in "media" \(look with npm run media/)
  ok(await run('research', 'researchCards', { 'production/research/cards/made/made-golem.json': { ...c['production/research/cards/made/made-golem.json'], media: { [POSTS.build.uri]: 'a clay figure on a desk' } } }, { setup: skeletons }))
})

test('research.screen: one file; a decision for every card; merges recorded as merges; post-level drops; terms (finding 13)', async () => {
  const two = { ...card(), ...card({ skeletons: ['s-thread'], posts: [POSTS.anaAgain.uri] }, 'talk-again') }
  const screen = (cards) => ({ 'production/review/screen.json': { cards } })
  ok(await run('research', 'researchScreen', { ...two, ...screen({ 'talk-throat': { keep: true, reason: 'a real turn', terms: 'none' }, 'talk-again': { keep: false, reason: 'the same story', mergedInto: 'talk-throat' } }) }))
  fails(await run('research', 'researchScreen', { ...two, ...screen({ 'talk-throat': { keep: true, reason: 'x', terms: 'none' } }) }), /no decision for card talk-again/)
  fails(await run('research', 'researchScreen', { ...two, ...screen({ 'talk-throat': { keep: true, reason: 'x', terms: 'none' }, 'talk-again': { keep: false, reason: 'dup', mergedInto: 'talk-nope' } }) }), /"mergedInto" talk-nope is not a kept card/)
  fails(await run('research', 'researchScreen', { ...card(), ...screen({ 'talk-throat': { keep: true, reason: 'x' } }) }), /a kept card needs "terms"/)
  fails(await run('research', 'researchScreen', { ...card(), ...screen({ 'talk-throat': { keep: true, reason: 'x', terms: 'none', drop: [POSTS.anaClaim.uri, POSTS.boReply.uri] } }) }), /kept, but every post is dropped/)
  fails(await run('research', 'researchScreen', { ...card(), ...screen({ 'talk-throat': { keep: true, reason: 'x', terms: 'none', drop: [POSTS.build.uri] } }) }), /"drop" names .* which is not on this card/)
})

const RANK = (rows) => ({ 'production/rank/cards.json': { weights: {}, cards: rows } })
const POOL = RANK([{ card: 'talk-throat', title: 'T', lane: 'talk', score: 0.8, pool: true, interview: false }, { card: 'made-golem', title: 'G', lane: 'made', score: 0.3, pool: false, interview: false }])
const LONGLIST = { 'production/research/longlist.json': { cards: [{ id: 'talk-throat', title: 'T', kept: true, reach: 10 }, { id: 'made-golem', title: 'G', kept: true, reach: 1 }, { id: 'dropped', kept: false }] } }
const idea = (card, n, extra = {}) => ({ card, premise: `premise ${n}`, turn: 'turn', screen: 'screen', format: 'thread', ...extra })
const jsonl = (...xs) => xs.map((x) => JSON.stringify(x)).join('\n') + '\n'

test('rank.cards: interest from two reviewers for every kept card, 0 to 10, with a reason', async () => {
  const review = (r, s = {}) => ({ [`production/review/rank/${r}.json`]: { reviewer: r, cards: { 'talk-throat': { interest: 7, reason: 'r', ...s }, 'made-golem': { interest: 3, reason: 'r' } } } })
  ok(await run('rank', 'rankScores', { ...LONGLIST, ...POOL, ...review('reviewer-1'), ...review('reviewer-2') }))
  fails(await run('rank', 'rankScores', { ...LONGLIST, ...POOL, ...review('reviewer-1') }), /card talk-throat has interest scores from 1 reviewers; it needs 2/)
  fails(await run('rank', 'rankScores', { ...LONGLIST, ...POOL, ...review('reviewer-1', { interest: 11 }), ...review('reviewer-2') }), /reviewer-1 talk-throat: "interest" is 0 to 10/)
})

test('brainstorm.ideas: the pool only; ideas from two writers per pool card; an idea spanning cards names them (finding 15)', async () => {
  ok(await run('brainstorm', 'brainstormIdeas', { ...POOL, 'production/brainstorm/writer-1.jsonl': jsonl(idea('talk-throat', 1)), 'production/brainstorm/writer-2.jsonl': jsonl(idea('talk-throat', 2)) }))
  fails(await run('brainstorm', 'brainstormIdeas', { ...POOL, 'production/brainstorm/writer-1.jsonl': jsonl(idea('talk-throat', 1), idea('talk-throat', 2)) }), /pool card talk-throat has ideas from 1 writer; every pool card needs ideas from at least 2/)
  fails(await run('brainstorm', 'brainstormIdeas', { ...POOL, 'production/brainstorm/writer-1.jsonl': jsonl(idea('made-golem', 1)), 'production/brainstorm/writer-2.jsonl': jsonl(idea('talk-throat', 1)) }), /is for card made-golem, which is not on the screened longlist/)
  fails(await run('brainstorm', 'brainstormIdeas', { ...POOL, 'production/brainstorm/writer-1.jsonl': jsonl(idea('talk-throat', 1, { cards: ['talk-throat', 'made-golem'] })), 'production/brainstorm/writer-2.jsonl': jsonl(idea('talk-throat', 2)) }), /names card made-golem, which is not in the pool/)
})

test('shortlist.scores: two reviewers for every pool card; the best joke names an idea for that card', async () => {
  const ideas = { 'production/brainstorm/writer-1.jsonl': jsonl(idea('talk-throat', 1)), 'production/brainstorm/writer-2.jsonl': jsonl(idea('talk-throat', 2)) }
  const review = (r, s = {}) => ({ [`production/review/shortlist/${r}.json`]: { reviewer: r, cards: { 'talk-throat': { bestJoke: { idea: 'writer-1-1', score: 6 }, synergy: 1, variety: 2, ideas: ['writer-2-1'], reason: 'r', ...s } } } })
  ok(await run('shortlist', 'shortlistScores', { ...POOL, ...ideas, ...review('reviewer-1'), ...review('reviewer-2') }))
  fails(await run('shortlist', 'shortlistScores', { ...POOL, ...ideas, ...review('reviewer-1') }), /has shortlist scores from 1 reviewers/)
  fails(await run('shortlist', 'shortlistScores', { ...POOL, ...ideas, ...review('reviewer-1', { synergy: 3 }), ...review('reviewer-2') }), /synergy and variety 0 to 2/)
  fails(await run('shortlist', 'shortlistScores', { ...POOL, ...ideas, ...review('reviewer-1', { bestJoke: { idea: 'writer-9-9', score: 5 } }), ...review('reviewer-2') }), /idea writer-9-9 is not an idea for this card/)
})

const draft = (slug, notes, script = 'export default { id: \'' + slug + '\', beats: [{ say: \'larry\', text: \'Hi.\' }] }\n') => ({ [`production/drafts/${slug}/script.js`]: script, [`production/drafts/${slug}/notes.json`]: { title: slug, format: 'x', seconds: 10, turn: 'a turn', speakers: [], featured: [], ...notes } })
const STANDING = { ...draft('interview', { standing: 'interview', format: 'interview', speakers: ['ana.test'] }), ...draft('top-chicken', { standing: 'top-chicken', results: [] }), ...draft('music', { standing: 'music', genre: 'sea shanty', theme: 'the week' }) }

test('draft.standing: interview, Top Chicken and music drafted every week; one interviewee; not the previous aired genre', async () => {
  ok(await run('draft', 'draftStanding', STANDING))
  const { ['production/drafts/music/script.js']: _, ...noMusic } = STANDING
  fails(await run('draft', 'draftStanding', noMusic), /the standing segment music has no draft/)
  fails(await run('draft', 'draftStanding', { ...STANDING, ...draft('interview', { standing: 'interview', speakers: ['ana.test', 'bo.test'] }) }), /an interview is with one community member; notes\.json "speakers" lists 2/)
  fails(await run('draft', 'draftStanding', { ...STANDING, ...draft('music', { standing: 'music', genre: 'Stomp-clap anthem', theme: 'x' }) }), /the genre "Stomp-clap anthem" is the previous aired episode's/)
})

test("draft.lines: a guest in the draft's own cast.js is checked as a guest (finding 20)", async () => {
  const script = "export default { id: 'golem', beats: [{ say: 'cy', id: 'c1', text: 'built it, obviously' }] }\n"
  const files = { ...draft('golem', {}, script), 'production/drafts/golem/cast.js': "export const CAST = { cy: { name: 'Cy', handle: '@cy.test', title: 'Guest', guest: true, body: { female: 0, child: 0 }, f0: 130 } }\n" }
  fails(await run('draft', 'draftLines', files), /cy says "built it, obviously" with no source comment \(rule R3\)/)
})

test('select: the tool applies the caps as it fills: one interview, two segments a person, nobody who spoke last aired time (finding 22)', async () => {
  const root = fakeRepo()
  try {
    const files = {
      ...draft('int-a', { standing: 'interview', format: 'interview', speakers: ['ana.test'], seconds: 5 }),
      ...draft('int-b', { format: 'interview', speakers: ['cy.test'], seconds: 5 }),
      ...draft('x1', { featured: ['ana.test'], seconds: 5 }),
      ...draft('x2', { featured: ['ana.test'], seconds: 5 }),
      ...draft('bo', { speakers: ['bo.test'], seconds: 5 }),
    }
    makeEpisode(root, { files })
    const s = (n) => ({ funny: n, interesting: n, television: n, variety: n, reason: 'r' })
    for (const r of ['reviewer-1', 'reviewer-2']) put(root, `episodes/002-2026-w47/production/review/select/${r}.json`, { reviewer: r, drafts: { 'int-a': s(9), 'int-b': s(8), x1: s(7), x2: s(6), bo: s(10) } })
    const ctx = await ctxFor(root, { limits: { ...(await ctxFor(root)).limits, targetSeconds: 100, runtimeSeconds: { max: 200 } } })
    const rows = Object.fromEntries(selection(ctx).rows.map((r) => [r.slug, r]))
    assert.equal(rows['int-a'].selected, true)
    assert.match(rows['int-b'].why, /an episode has 1 interview/)
    assert.equal(rows.x1.selected, true)
    assert.match(rows.x2.why, /already in 2 selected segments/)
    assert.match(rows.bo.why, /someone who spoke in 001-pilot speaks in it/)
  } finally {
    cleanup(root)
  }
})

test('--check --task shows a lone writer only its own lines (finding 14)', () => {
  const t = { keys: ['brainstorm/writer-1.jsonl'] }
  assert.ok(concerns(t, 'episodes/x/production/brainstorm/writer-1.jsonl: idea writer-1-2 has no "turn"'))
  assert.ok(!concerns(t, 'pool card talk-ask has ideas from 1 writer; every pool card needs ideas from at least 2'))
})

test('a second draft of the same week gets an id of its own (finding 32)', () => {
  const root = fakeRepo()
  try {
    assert.equal(freshSlug(root, join(root, 'docs/ledger'), WEEK), '2026-w47')
    put(root, 'docs/ledger/002-2026-w47.json', { id: '002-2026-w47', aired: false })
    assert.equal(freshSlug(root, join(root, 'docs/ledger'), WEEK), '2026-w47-2')
  } finally {
    cleanup(root)
  }
})

test('a brief names only files that exist, and never the whole bible (findings 31 and 5)', async () => {
  const root = fakeRepo()
  try {
    makeEpisode(root)
    const ctx = await ctxFor(root)
    const { list, missing } = readingList(ctx, { kind: 'draft', stage: 'draft', reads: ['packages/show/tools/README.md', 'episodes/002-2026-w47/production/nothing.json', 'episodes/002-2026-w47/production/later.json?'] })
    assert.deepEqual(list, ['docs/bible/00-constitution.md', 'docs/bible/09-real-people.md', 'packages/show/tools/README.md'], 'chapters the fake bible lacks are left out; an optional file that does not exist is left out')
    assert.deepEqual(missing, ['episodes/002-2026-w47/production/nothing.json'])
    assert.deepEqual(readingList(ctx, { kind: 'viewer', stage: 'review', reads: [] }).list, [], 'a viewer is given frames and nothing else')
  } finally {
    cleanup(root)
  }
})

test('the cold-viewer stretch: the longest interval with no spoken line and no audience sound, from the cues', () => {
  const cues = { duration: 30, lines: [{ t0: 0, t1: 4 }, { t0: 5, t1: 8 }, { t0: 22, t1: 24 }], sfx: [{ name: 'laugh-1', t0: 8, t1: 10 }, { name: 'whoosh', t0: 12, t1: 13 }] }
  assert.deepEqual(longestSilence(cues), { t0: 10, t1: 22 }, 'a whoosh is not an audience sound')
  assert.deepEqual(coldStretches('## Cold-viewer test\n\n- every segment: longest silence\n- talk-ask: 12-24 s\n').stretches, [{ target: 'every segment', longest: true }, { target: 'talk-ask', t0: 12, t1: 24 }])
  assert.match(coldStretches('## Cold-viewer test\n\n- talk-ask: whenever\n').problems[0], /cannot read/)
  assert.equal(coldStretches('## Measure\n\nx\n').absent, true)
})

test('the reader understands the real regenerated digest: skeletons, lanes, marks (skipped without data/weeks/2026-W47)', async () => {
  const { REPO } = await import('../src/repo.mjs')
  const { existsSync } = await import('node:fs')
  const dir = join(REPO, 'data/weeks/2026-W47')
  if (!existsSync(join(dir, 'skeletons/index.json'))) return
  const { loadDigest } = await import('../src/digest.mjs')
  const { loadSkeletons, laneSkeletons, markOf } = await import('../src/scraper.mjs')
  const d = loadDigest(dir, { optOutFile: join(REPO, 'packages/scraper/config/optout.json') })
  const sk = loadSkeletons(dir, d)
  assert.equal(sk.source, 'scraper')
  assert.ok(sk.list.length > 100)
  for (const lane of ['made', 'talk', 'games', 'voices', 'interview']) assert.ok(laneSkeletons(dir, sk, lane).length > 0, lane)
  const first = sk.list.find((s) => s.id === laneSkeletons(dir, sk, 'made')[0])
  assert.ok(first.title && first.posts.length && first.posts.every((p) => p.uri && p.handle && typeof p.text === 'string'))
  assert.ok(first.posts.some((p) => p.did && typeof p.followers === 'number'), 'author fields come from the nested author')
  const marked = sk.list.slice(0, 40).flatMap((s) => s.posts).filter((p) => markOf(p))
  assert.ok(marked.length > 0, 'consent and keyword marks are read')
})

test('the reading table in config names chapters that exist in the real bible', async () => {
  const { loadConfig } = await import('../src/pipeline.mjs')
  const { REPO } = await import('../src/repo.mjs')
  const { existsSync } = await import('node:fs')
  if (!existsSync(join(REPO, 'docs/bible/10-process.md'))) return
  const { config } = loadConfig()
  for (const [kind, chapters] of Object.entries(config.reading.kinds)) for (const c of [...config.reading.always, ...(chapters ?? [])]) assert.ok(existsSync(join(REPO, 'docs/bible', c)), `${kind}: ${c}`)
  assert.ok(!Object.values(config.reading.kinds).some((c) => c?.length > 3), 'no task kind reads more than three chapters beside the constitution')
  void readFileSync, void writeFileSync
})

test('research: the tagged lane gets a task only when something was pointed at; its card records who pointed and proposes nothing', async () => {
  const tagger = 'at://did:plc:cy/app.bsky.feed.post/tag1'
  const withLane = (root) => put(root, `data/weeks/${WEEK}/lanes/tagged.json`, { format: 'late-cluster-lane/1', lane: 'tagged', skeletons: ['s-thread'], entries: [{ rank: 1, id: 's-thread', weight: 0.5, taggers: [{ uri: tagger, handle: 'cy.test', did: 'did:plc:cy', weight: 0.5 }] }] })
  const emptyLane = (root) => put(root, `data/weeks/${WEEK}/lanes/tagged.json`, { format: 'late-cluster-lane/1', lane: 'tagged', skeletons: [], entries: [] })
  const tasksWith = async (setup) => {
    const root = fakeRepo()
    try {
      makeEpisode(root)
      setup(root)
      return (await STAGE_DEFS.research.waves[0].tasks(await ctxFor(root))).map((t) => t.id)
    } finally { cleanup(root) }
  }
  assert.ok(!(await tasksWith(emptyLane)).includes('research.tagged'), 'an empty lane creates no task')
  assert.ok((await tasksWith(withLane)).includes('research.tagged'))
  const empty = await run('research', 'researchCards', card(), { setup: emptyLane })
  assert.equal(empty.warnings.filter((w) => /lane tagged/.test(w)).length, 1)
  assert.match(empty.warnings.find((w) => /lane tagged/.test(w)), /nothing in this window's slice, so no task/)

  const tc = (over = {}) => card({ skeletons: ['s-thread'], pointedBy: [tagger], ...over }, 'tagged-throat', 'tagged')
  ok(await run('research', 'researchCards', tc(), { setup: withLane }))
  fails(await run('research', 'researchCards', tc({ pointedBy: undefined }), { setup: withLane }), /a tagged card records who pointed/)
  fails(await run('research', 'researchCards', tc({ pointedBy: ['at://did:plc:ana/app.bsky.feed.post/x'] }), { setup: withLane }), /is not a tagger's post/)
  fails(await run('research', 'researchCards', tc({ recommendation: 'feature it' }), { setup: withLane }), /a tagged card proposes nothing/)
})
