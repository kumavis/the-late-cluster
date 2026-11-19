// the gates on the early stages, through the stage definitions: research (cards, screen), brainstorm
// (ideas from enough writers), rank (two reviewers each), draft (the standing segments)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STAGE_DEFS } from '../src/stages.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, ctxFor, fakeRepo, makeEpisode, POSTS, WEEK } from './helpers.mjs'

// gates are named in the stage definitions by function; this finds one by its gate name
const FN = { 'research.cards': 'researchCards', 'research.screen': 'researchScreen', 'brainstorm.ideas': 'brainstormIdeas', 'rank.first': 'rankFirst', 'draft.standing': 'draftStanding' }
const gateOf = (stage, name) => STAGE_DEFS[stage].waves.flatMap((w) => w.gates ?? []).find((g) => g.name === FN[name])
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

const CARD = { id: 'host-throat', lane: 'talk', title: 'A talk show with a throat for a host', summary: 'Ana proposed a talk show whose host is a throat; Bo replied.', sensitive: 'none', posts: [{ uri: POSTS.anaClaim.uri, text: POSTS.anaClaim.text }], people: [{ handle: 'ana.test', followers: 900 }] }
const card = (over = {}) => ({ 'production/research/cards/talk/host-throat.json': { ...CARD, ...over } })

test('research.cards: real posts quoted exactly, people with followers, no jokes', async () => {
  ok(await run('research', 'research.cards', card()))
  fails(await run('research', 'research.cards', card({ premise: 'the throat hosts' })), /a card carries no jokes \("premise"\)/)
  fails(await run('research', 'research.cards', card({ posts: [{ uri: POSTS.anaClaim.uri, text: 'concept: a talk show where the host is a throat' }] })), /is not the post's exact text/)
  fails(await run('research', 'research.cards', card({ posts: [{ uri: 'at://did:plc:zz/app.bsky.feed.post/zz' }] })), /is not in the window's digest/)
  fails(await run('research', 'research.cards', card({ people: [{ handle: 'ana.test' }] })), /needs "followers"/)
  fails(await run('research', 'research.cards', card({ lane: 'made' })), /says lane made but sits in talk\//)
})

test('research.screen: a decision with a reason for every card; out-of-bounds material cannot be kept', async () => {
  const oob = { 'production/research/cards/talk/left-alone.json': { ...CARD, id: 'left-alone', posts: [{ uri: POSTS.oob.uri, text: POSTS.oob.text }], people: [] } }
  ok(await run('research', 'research.screen', { ...card(), 'production/research/screen.json': { cards: { 'host-throat': { keep: true, reason: 'a real turn' } } } }))
  fails(await run('research', 'research.screen', { ...card(), ...oob, 'production/research/screen.json': { cards: { 'host-throat': { keep: true, reason: 'a real turn' } } } }), /no decision for card left-alone/)
  fails(await run('research', 'research.screen', { ...card(), ...oob, 'production/research/screen.json': { cards: { 'host-throat': { keep: true, reason: 'x' }, 'left-alone': { keep: true, reason: 'y' } } } }), /keeps left-alone, which carries an out-of-bounds/)
  fails(await run('research', 'research.screen', { ...card(), 'production/research/screen.json': { cards: { 'host-throat': { keep: 'yes' } } } }), /give "keep": true\|false and a "reason"/)
})

const LONGLIST = { 'production/research/longlist.json': { cards: [{ id: 'host-throat', title: 'T', kept: true, reach: 10 }, { id: 'dropped', title: 'D', kept: false }] } }
const idea = (card, n) => ({ card, premise: `premise ${n}`, turn: 'turn', screen: 'screen', format: 'thread' })
const jsonl = (...xs) => xs.map((x) => JSON.stringify(x)).join('\n') + '\n'

test('brainstorm.ideas: every kept card has ideas from at least two writers; ideas are complete and for kept cards', async () => {
  ok(await run('brainstorm', 'brainstorm.ideas', { ...LONGLIST, 'production/brainstorm/writer-1.jsonl': jsonl(idea('host-throat', 1)), 'production/brainstorm/writer-2.jsonl': jsonl(idea('host-throat', 2)) }))
  fails(await run('brainstorm', 'brainstorm.ideas', { ...LONGLIST, 'production/brainstorm/writer-1.jsonl': jsonl(idea('host-throat', 1), idea('host-throat', 2)) }), /card host-throat has ideas from 1 writer; every card needs ideas from at least 2/)
  fails(await run('brainstorm', 'brainstorm.ideas', { ...LONGLIST, 'production/brainstorm/writer-1.jsonl': jsonl(idea('host-throat', 1), idea('dropped', 2)), 'production/brainstorm/writer-2.jsonl': jsonl({ ...idea('host-throat', 3), turn: '' }) }), /is for card dropped, which is not on the screened longlist|has no "turn"/)
})

test('rank.first: scores from two reviewers per card, 0 to 10, best joke naming a real idea for that card', async () => {
  const ideas = { 'production/brainstorm/writer-1.jsonl': jsonl(idea('host-throat', 1)), 'production/brainstorm/writer-2.jsonl': jsonl(idea('host-throat', 2)) }
  const review = (r, s = {}) => ({ [`production/rank/reviews/${r}.json`]: { reviewer: r, cards: { 'host-throat': { interest: 7, bestJoke: { idea: 'writer-1-1', score: 6 }, reason: 'r', ...s } } } })
  ok(await run('rank', 'rank.first', { ...LONGLIST, ...ideas, ...review('reviewer-1'), ...review('reviewer-2') }))
  fails(await run('rank', 'rank.first', { ...LONGLIST, ...ideas, ...review('reviewer-1') }), /card host-throat has first-pass scores from 1 reviewers; it needs 2/)
  fails(await run('rank', 'rank.first', { ...LONGLIST, ...ideas, ...review('reviewer-1', { interest: 11 }), ...review('reviewer-2') }), /scores are 0 to 10/)
  fails(await run('rank', 'rank.first', { ...LONGLIST, ...ideas, ...review('reviewer-1', { bestJoke: { idea: 'writer-9-9', score: 5 } }), ...review('reviewer-2') }), /names idea writer-9-9, which does not exist/)
})

const draft = (slug, notes) => ({ [`production/drafts/${slug}/script.js`]: 'export default (s) => {}\n', [`production/drafts/${slug}/notes.json`]: notes })
const STANDING = { ...draft('interview', { standing: 'interview', speakers: ['ana.test'] }), ...draft('top-chicken', { standing: 'top-chicken', results: [] }), ...draft('music', { standing: 'music', genre: 'sea shanty', theme: 'the week' }) }

test('draft.standing: interview, Top Chicken and music drafted every week; one interviewee; the song changes genre', async () => {
  ok(await run('draft', 'draft.standing', STANDING))
  const { ['production/drafts/music/script.js']: _, ...noMusic } = STANDING
  fails(await run('draft', 'draft.standing', noMusic), /the standing segment music has no draft/)
  fails(await run('draft', 'draft.standing', { ...STANDING, ...draft('interview', { standing: 'interview', speakers: ['ana.test', 'bo.test'] }) }), /an interview is with one community member; notes\.json "speakers" lists 2/)
  fails(await run('draft', 'draft.standing', { ...STANDING, ...draft('music', { standing: 'music', genre: 'Stomp-clap anthem', theme: 'x' }) }), /the genre "Stomp-clap anthem" is the previous episode's/)
  fails(await run('draft', 'draft.standing', { ...STANDING, ...draft('music', { standing: 'music', genre: 'polka' }) }), /needs "genre" and "theme"/)
})

test('draft.standing: Top Chicken draws on at least the configured number of the window\'s results', async () => {
  const results = [POSTS.anaClaim, POSTS.boReply, POSTS.anaAgain, POSTS.build].map((p) => ({ resultPost: p.uri, uri: p.uri }))
  const games = (root) => {
    const f = join(root, `data/weeks/${WEEK}/digest.json`)
    const d = JSON.parse(readFileSync(f, 'utf8'))
    d.sections = { ...(d.sections ?? {}), games: [{ id: 'top-chicken', results }] }
    writeFileSync(f, JSON.stringify(d))
  }
  fails(await run('draft', 'draft.standing', STANDING, { setup: games }), /draws on 0 of the window's 4 results; use at least 3/)
  ok(await run('draft', 'draft.standing', { ...STANDING, ...draft('top-chicken', { standing: 'top-chicken', results: results.slice(0, 3).map((r) => r.uri) }) }, { setup: games }))
})
