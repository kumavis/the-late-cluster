// The orchestrator end to end on the workflow fixture, with fake tools (no bun, ffmpeg or browser):
// the eleven stages in order, the briefs and the status listing, the repetition gate blocking at
// ideas and at scripts and passing a turned verdict, the heard-text and unread-text gates blocking,
// rework, send-backs, the runner remembered, preview-only.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { produce } from '../src/pipeline.mjs'
import { findEpisodeForWeek, PKG, checkWeek, weekSlug, listEpisodes } from '../src/repo.mjs'
import { loadState, STAGES } from '../src/state.mjs'
import { parseArgs } from '../bin/produce.mjs'
import { cleanup, fakeRepo, fakeTools, put } from './helpers.mjs'

const FX = join(PKG, 'test', 'fixtures', 'workflow')
const WEEK = '2099-W01'

function setup({ fixture = join(FX, 'tasks'), whisper = true } = {}) {
  const root = fakeRepo({ fullScorecard: true, ledger: false })
  cpSync(join(FX, 'ledger'), join(root, 'docs/ledger'), { recursive: true })
  const tools = fakeTools(root, { whisper })
  const lines = []
  const run = (o = {}) => produce({ root, week: WEEK, runner: 'fixture', fixture, digest: join(FX, 'digest'), settings: join(FX, 'settings.json'), tools, print: (l) => lines.push(l), ...o })
  return { root, tools, lines, run }
}
const out = (lines) => lines.join('\n')

test('the eleven stages run end to end; repeats block and are reworked; heard text and unread text block until reworked', async () => {
  const { root, lines, run, tools } = setup()
  try {
    // to the first block: the assemble stage's heard-text gate (the draft says "bomb")
    assert.equal(await run(), 1, out(lines))
    let o = out(lines)
    for (const s of STAGES.slice(0, 7)) assert.match(o, new RegExp(`stage ${s} done`))
    // the repetition gate on ideas: one repeat, reworked, then judged again
    assert.match(o, /fixture repetition-ideas\.rework-writer-1-3: 1 file/)
    assert.match(o, /fixture repetition-ideas\.reviewer-1-r2/)
    assert.match(o, /warn idea writer-2-3 is turned: the wish granted on the spot → granted so literally/)
    // the repetition gate on scripts: the selected talk-ask repeats, is redrafted, judged again
    assert.match(o, /fixture select\.redraft-talk-ask: 1 file/)
    assert.match(o, /fixture select\.repetition-reviewer-2-r2/)
    // heard text
    assert.match(o, /gate render\.heard FAIL\n  FAIL talk-ask calm \(larry, [\d.]+ s\): heard "Relax\. This show is not a bomb\.", which contains "bomb"\. No waiver/)
    assert.match(o, /stopped at assemble/)
    const ep = findEpisodeForWeek(root, WEEK)
    const prod = join(ep.dir, 'production')
    for (const f of ['scope/coverage.md', 'research/longlist.json', 'brainstorm/ideas.jsonl', 'rank/scores.json', 'rank/shortlist.md', 'experiment.md', 'review/repetition-ideas.json', 'select/scores.json', 'review/repetition-scripts.json', 'plan.json']) assert.ok(existsSync(join(prod, f)), f)
    const plan = JSON.parse(readFileSync(join(prod, 'plan.json'), 'utf8'))
    assert.deepEqual(plan.segments.map((s) => s.id), ['talk-ask', 'interview'])
    const longlist = JSON.parse(readFileSync(join(prod, 'research/longlist.json'), 'utf8'))
    assert.equal(longlist.cards.find((c) => c.id === 'made-zed').kept, false)
    assert.ok(longlist.cards.find((c) => c.id === 'talk-ask').reach > longlist.cards.find((c) => c.id === 'talk-bit').reach)
    assert.match(readFileSync(join(prod, 'briefs/draft/draft.interview.md'), 'utf8'), /production\/experiment\.md/)
    assert.match(o, /gate rank\.experiment ok/)
    // every brief exists, one per task
    const briefs = readdirSync(join(prod, 'briefs/brainstorm'))
    assert.deepEqual(briefs.sort(), ['brainstorm.writer-1.md', 'brainstorm.writer-2.md', 'brainstorm.writer-3.md'])
    // rework the assembler: its output is set aside, the new brief carries the failure
    lines.length = 0
    assert.equal(await run({ rework: ['assemble.writer'] }), 1, out(lines))
    o = out(lines)
    assert.match(o, /fixture assemble\.writer: \d+ files \(run 2\)/)
    assert.match(o, /gate render\.heard ok/)
    assert.match(o, /stage assemble done/)
    // the unread-text gate at staging
    assert.match(o, /gate stage\.unread FAIL\n  FAIL segments\/talk-ask\/index\.js:\d+: "THE REQUEST, AS POSTED ON TUESDAY BY AN ACCOUNT WITH FOUR HUNDRED FOLL…" \(13 words\) is on screen but only \d+ % of it is spoken/)
    assert.match(readFileSync(join(prod, 'briefs/assemble/assemble.writer.md'), 'utf8'), /## Sent back to you[\s\S]*bomb/)
    lines.length = 0
    assert.equal(await run({ rework: ['stage.talk-ask'] }), 0, out(lines))
    o = out(lines)
    for (const s of ['stage', 'build', 'review']) assert.match(o, new RegExp(`stage ${s} done`))
    assert.match(o, /gate stage\.credits ok/)
    assert.match(o, /done; pull request text in/)
    const body = readFileSync(join(prod, 'pr-body.md'), 'utf8')
    for (const re of [/## Why these segments/, /\| talk-ask \| ✓ \|/, /## How the material was ranked/, /turned writer-2-3 \(carries something forward from the previous episode\)/, /\*\*Trial settings:\*\*/, /Verdict: \*\*approve\*\*/, /Reviewer's checklist/]) assert.match(body, re)
    assert.ok(existsSync(join(root, 'docs/ledger', `${ep.id}.json`)))
    const state = loadState(join(prod, 'state.json'))
    assert.deepEqual(STAGES.map((s) => state.stages[s].status), STAGES.map(() => 'done'))
    assert.equal(state.runner, 'fixture')
    assert.ok(!/\d{4}-\d{2}-\d{2}T\d{2}:/.test(readFileSync(join(prod, 'state.json'), 'utf8')), 'no timestamps')
    // logs are labelled by run
    assert.ok(tools.calls.length > 0)
  } finally {
    cleanup(root)
  }
})

test('--status says exactly which subagents to spawn; the manual runner waits; the runner is remembered', async () => {
  const { root, lines, run } = setup()
  try {
    assert.equal(await run({ runner: 'manual' }), 1)
    assert.match(out(lines), /waiting at scope for 1 subagent/)
    lines.length = 0
    assert.equal(await run({ status: true, runner: undefined }), 0)
    assert.match(out(lines), /next: scope: spawn 1 subagent[\s\S]*spawn reviewer\s+scope\.reviewer\s+brief episodes\/002-2099-w01\/production\/briefs\/scope\/scope\.reviewer\.md\s+writes episodes\/002-2099-w01\/production\/scope\/review\.md/)
    lines.length = 0
    // no --runner: the run remembers manual, and does not fall back to anything else (trial finding 12)
    assert.equal(await produce({ root, week: WEEK, tools: fakeTools(root), print: (l) => lines.push(l) }), 1)
    assert.match(out(lines), /spawn reviewer\s+scope\.reviewer/)
    const st = loadState(join(findEpisodeForWeek(root, WEEK).dir, 'production/state.json'))
    assert.equal(st.runner, 'manual')
    assert.equal(listEpisodes(root).length, 2, 'the same week maps to the same episode')
  } finally {
    cleanup(root)
  }
})

test('briefs only point at what the role may read', async () => {
  const { root, run } = setup()
  try {
    await run({ runner: 'manual' })
    await run({ runner: 'fixture' }).catch(() => {})
    const prod = join(findEpisodeForWeek(root, WEEK).dir, 'production')
    const writer = readFileSync(join(prod, 'briefs/brainstorm/brainstorm.writer-1.md'), 'utf8')
    assert.match(writer, /\*\*Role:\*\* writer \(spawn the `writer` subagent/)
    assert.match(writer, /## Do not read[\s\S]*docs\/ledger\/ \(the ledger\)[\s\S]*episodes\/001-pilot\//)
    assert.ok(!/## Read[\s\S]*docs\/ledger\/ \(the ledger: what the show has already done\)[\s\S]*## Do not read/.test(writer))
    const reviewer = readFileSync(join(prod, 'briefs/repetition-ideas/repetition-ideas.reviewer-1-r1.md'), 'utf8')
    assert.match(reviewer, /## Read[\s\S]*docs\/ledger\/ \(the ledger: what the show has already done\)/)
    assert.ok(!/## Do not read/.test(reviewer))
  } finally {
    cleanup(root)
  }
})

test('a send-back at review routes the run to the stage that can fix it', async () => {
  const fx = mkdtempSync(join(tmpdir(), 'wr-fx-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  // assemble and stage pass at once; the review sends the episode back to stage
  cpSync(join(fx, 'assemble.writer@2'), join(fx, 'assemble.writer'), { recursive: true })
  cpSync(join(fx, 'stage.talk-ask@2'), join(fx, 'stage.talk-ask'), { recursive: true })
  writeFileSync(join(fx, 'review.reviewer/production/review.json'), JSON.stringify({ verdict: 'send-back', route: 'stage', reasons: ['the card in talk-ask is gone before it can be read'] }))
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run(), 1, out(lines))
    assert.match(out(lines), /SEND-BACK to stage: the card in talk-ask is gone before it can be read/)
    assert.match(out(lines), /review sent the episode back to stage/)
    lines.length = 0
    await run()
    assert.match(out(lines), /sent back from review to stage/)
    assert.match(out(lines), /stage stage start/)
    const prod = join(findEpisodeForWeek(root, WEEK).dir, 'production')
    assert.ok(existsSync(join(prod, 'review.json.rejected-1')), 'the verdict is set aside')
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('--preview-only keeps the episode a draft and builds into preview/', async () => {
  const fx = mkdtempSync(join(tmpdir(), 'wr-fx-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  cpSync(join(fx, 'assemble.writer@2'), join(fx, 'assemble.writer'), { recursive: true })
  cpSync(join(fx, 'stage.talk-ask@2'), join(fx, 'stage.talk-ask'), { recursive: true })
  const { root, lines, run, tools } = setup({ fixture: fx })
  try {
    assert.equal(await run({ previewOnly: true }), 0, out(lines))
    const ep = findEpisodeForWeek(root, WEEK)
    assert.equal(ep.meta.status, 'draft')
    assert.ok(tools.calls.some((c) => c[0] === 'build' && c.includes('--preview')))
    assert.ok(!existsSync(join(root, 'dist/episodes', ep.id)))
    assert.match(readFileSync(join(ep.dir, 'production/pr-body.md'), 'utf8'), /\*\*Preview only\.\*\*/)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('the repetition gate blocks a repeat idea; --exclude drops it instead of reworking it', async () => {
  const fx = mkdtempSync(join(tmpdir(), 'wr-fx-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  rmSync(join(fx, 'repetition-ideas.rework-writer-1-3'), { recursive: true })
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run(), 1)
    assert.match(out(lines), /the fixture has no output for task repetition-ideas\.rework-writer-1-3/)
    lines.length = 0
    assert.equal(await run({ exclude: ['writer-1-3'], stage: 'repetition-ideas' }), 0, out(lines))
    assert.match(out(lines), /excluded at repetition-ideas: writer-1-3/)
    assert.match(out(lines), /gate repetition\.ideas ok/)
    const rep = JSON.parse(readFileSync(join(findEpisodeForWeek(root, WEEK).dir, 'production/review/repetition-ideas.json'), 'utf8'))
    assert.deepEqual(rep.excluded, ['writer-1-3'])
    assert.ok(!rep.shortlist.some((c) => c.ideas.includes('writer-1-3')))
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('produce arguments', () => {
  assert.deepEqual(parseArgs(['--week', '2026-W47', '--check', 'stage', '--segment', 'a']), { week: '2026-W47', check: 'stage', segment: 'a' })
  assert.deepEqual(parseArgs(['--week', 'x', '--rework', 'a,b']).rework, ['a', 'b'])
  for (const [argv, re] of [[[], /--week is required/], [['--week', 'x', '--runner', 'gpt'], /--runner must be one of/], [['--week', 'x', '--runner', 'fixture'], /needs --fixture/], [['--week', 'x', '--segment', 'a'], /--segment goes with --check stage/], [['--week', 'x', '--status', '--from', 'draft'], /use one of/]])
    assert.throws(() => parseArgs(argv), (e) => e.code === 2 && re.test(e.message))
  assert.equal(weekSlug('2026-W47'), '2026-w47')
  assert.throws(() => checkWeek('2026-47'))
})
