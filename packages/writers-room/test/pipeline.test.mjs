// The orchestrator end to end on the workflow fixture, with fake tools (no bun, ffmpeg or browser):
// the thirteen stages in order; the fitting tool flagging a line and a sound editor's best effort
// (a rewrite only when the owner asks); the repetition gate blocking at ideas, at scripts and at assembly; the consent refresh;
// the unread-text gate blocking until reworked; the stage auditor routing a change to a builder; the
// cold-viewer test; briefs, --check --task, send-backs, a fresh id, preview-only.
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
  // the fitting tool hears one line of the talk-ask draft as something alarming (trial 002's shape)
  const tools = fakeTools(root, { whisper, fitHeard: { 'Relax. This show is not a bum.': 'Relax. This show is not a bomb.' } })
  const lines = []
  const run = (o = {}) => produce({ root, week: WEEK, runner: 'fixture', fixture, digest: join(FX, 'digest'), settings: join(FX, 'settings.json'), tools, ready: () => false, print: (l) => lines.push(l), ...o })
  return { root, tools, lines, run }
}
const out = (lines) => lines.join('\n')
function fixtureCopy() {
  const fx = mkdtempSync(join(tmpdir(), 'wr-fx-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  cpSync(join(fx, 'stage.talk-ask@2'), join(fx, 'stage.talk-ask'), { recursive: true })
  return fx
}

test('the thirteen stages run end to end: fit, the three repetition gates, consent, unread text, the stage auditor, cold viewers', async () => {
  const { root, lines, run } = setup()
  try {
    // to the first block: the unread-text gate at staging
    assert.equal(await run(), 1, out(lines))
    let o = out(lines)
    for (const s of STAGES.slice(0, 10)) assert.match(o, new RegExp(`stage ${s} done`))
    // the repetition gate on ideas: one repeat, reworked, then judged again; a turned verdict passes
    assert.match(o, /fixture repetition-ideas\.rework-writer-1-3: 1 file[\s\S]*fixture repetition-ideas\.reviewer-1-r2/)
    assert.match(o, /warn turned: writer-2-3 \(review\/repetition-ideas\.json\)/)
    // fit: voices for the guests, a sound editor respells the line heard as something alarming; nothing goes to a writer
    assert.match(o, /fixture fit\.voices[\s\S]*fixture fit\.talk-ask: 2 files[\s\S]*gate fit\.words ok[\s\S]*gate fit\.heard ok/)
    assert.ok(!/fit\.rewrite-/.test(o), 'no rewrite in the routine flow')
    // select: scores, the gate on the selected scripts with a redraft, then the consent refresh
    assert.match(o, /fixture select\.redraft-talk-ask[\s\S]*fixture select\.repetition-reviewer-2-r2[\s\S]*fixture select\.consent-r1[\s\S]*gate select\.consent ok/)
    // assembly: the line the assembler added is judged, reworked and judged again
    assert.match(o, /fixture assemble\.repetition-reviewer-1-r1[\s\S]*fixture assemble\.rework[\s\S]*fixture assemble\.repetition-reviewer-2-r2[\s\S]*gate repetition\.assembly ok/)
    assert.match(o, /gate render\.heard ok/)
    // the unread-text gate at staging, and what the project manager must decide
    assert.match(o, /gate stage\.unread FAIL\n  FAIL segments\/talk-ask\/index\.js:\d+: "THE REQUEST, AS POSTED ON TUESDAY BY AN ACCOUNT WITH FOUR HUNDRED FOLL…" \(13 words\)/)
    assert.match(o, /decide: stage stopped with 1 failure; tasks in the failing wave: stage\.talk-ask, stage\.interview\./)
    const ep = findEpisodeForWeek(root, WEEK)
    const prod = join(ep.dir, 'production')
    for (const f of ['scope/coverage.md', 'review/scope.md', 'research/longlist.json', 'research/terms.md', 'research/kept/talk-ask.json', 'rank/cards.json', 'rank/pool.md', 'brainstorm/ideas.jsonl', 'rank/scores.json', 'rank/shortlist.md', 'experiment.md', 'review/repetition-ideas.json', 'drafts/talk-ask/fit.json', 'fit/voices.md', 'select/scores.json', 'review/repetition-scripts.json', 'review/consent/r1.json', 'plan.json', 'review/repetition-assembly.json', 'segments/talk-ask/fit.json'.replace('segments', '../segments')]) assert.ok(existsSync(join(prod, f)), f)
    assert.deepEqual(JSON.parse(readFileSync(join(prod, 'plan.json'), 'utf8')).segments.map((s) => s.id), ['talk-ask', 'interview'])
    const longlist = JSON.parse(readFileSync(join(prod, 'research/longlist.json'), 'utf8'))
    assert.equal(longlist.cards.find((c) => c.id === 'made-zed').kept, false)
    assert.equal(longlist.cards.find((c) => c.id === 'talk-ask').posts[0].text, 'somebody should make a talk show with only two segments', 'exact text from the skeleton, never retyped')
    assert.match(readFileSync(join(prod, 'research/terms.md'), 'utf8'), /## interview-quinn\n\nQuinn is invented/)
    // the standing interview is given its card and ideas (finding 16); the song's writer the previous genre (finding 21)
    const interview = readFileSync(join(prod, 'briefs/draft/draft.interview.md'), 'utf8')
    assert.match(interview, /- writer-1-4 \(card interview-quinn\): /)
    assert.match(interview, /^- episodes\/002-2099-w01\/production\/research\/kept\/interview-quinn\.json$/m)
    assert.match(interview, /\*\*interview-quinn:\*\* Quinn is invented/, 'the card\'s terms of use')
    assert.match(readFileSync(join(prod, 'briefs/draft/draft.music.md'), 'utf8'), /Avoid: the genre "stomp-clap anthem"\./)
    // the sound editor sees what was heard, is told best effort is enough, and records hard words
    const sound = readFileSync(join(prod, 'briefs/fit/fit.talk-ask.md'), 'utf8')
    assert.match(sound, /calm \(larry, flagged: alarming: bomb\): "Relax\. This show is not a bum\." heard as "Relax\. This show is not a bomb\."/)
    assert.match(sound, /Best effort is sufficient[\s\S]*nothing goes back to the writer/)
    assert.match(sound, /npm run voice-research -- 002-2099-w01 --draft talk-ask/)
    assert.match(sound, /The one exception: something heard that is crude, alarming or out of bounds is never accepted/)
    // a writer may still use a hard word
    assert.match(readFileSync(join(prod, 'briefs/draft/draft.talk-ask.md'), 'utf8'), /docs\/voice-research\.md lists the words the voices find hard\. A hard word may still be used/)
    // reviewers' reasons never reach a file another role reads, nor state.json (finding 17)
    for (const f of ['state.json', 'rank/cards.json', 'rank/scores.json', 'rank/shortlist.json', 'research/longlist.json', 'select/scores.json']) {
      const text = readFileSync(join(prod, f), 'utf8')
      for (const prose of ['fixture reason', 'granted so literally', "the episode's through-line"]) assert.ok(!text.includes(prose), `${f} carries "${prose}"`)
    }
    // rework the builder: a fresh brief carries its own failure
    lines.length = 0
    assert.equal(await run({ rework: ['stage.talk-ask'] }), 0, out(lines))
    o = out(lines)
    assert.match(readFileSync(join(prod, 'briefs/stage/stage.talk-ask.md'), 'utf8'), /## Sent back to you[\s\S]*THE REQUEST/)
    // the stage auditor routes a change to the segment's builder, then passes
    assert.match(o, /fixture stage\.auditor-r1[\s\S]*fixture stage\.fix-talk-ask-r1[\s\S]*fixture stage\.auditor-r2[\s\S]*gate stage\.audit ok/)
    assert.match(readFileSync(join(prod, 'briefs/stage/stage.fix-talk-ask-r1.md'), 'utf8'), /hold the rundown card 0\.5 s longer/)
    for (const s of ['stage', 'build', 'review']) assert.match(o, new RegExp(`stage ${s} done`))
    assert.match(o, /gate build\.sources-live ok/)
    // the cold-viewer test: frames under neutral names, the viewer's words beside the writer's
    assert.ok(existsSync(join(root, 'shots', ep.id, '_cold/set-1/01.png')))
    assert.match(readFileSync(join(prod, 'review/cold-viewers.md'), 'utf8'), /\| 1 \| talk-ask \| [\d.]+–[\d.]+ s .*\| the show obeys the request \| A studio with two hosts/)
    assert.match(readFileSync(join(prod, 'briefs/review/review.viewer-1.md'), 'utf8'), /^# Stills 1\n\nThese are \d+ still frames/)
    assert.ok(!/talk-ask|Larry|episode/i.test(readFileSync(join(prod, 'briefs/review/review.viewer-1.md'), 'utf8').replace(/shots\/[^/]+\//g, '')), 'a viewer is told nothing about the show')
    assert.match(o, /done; pull request text in/)
    const body = readFileSync(join(prod, 'pr-body.md'), 'utf8')
    for (const re of [/## Why these segments/, /\| talk-ask \| ✓ \|/, /## How the material was ranked/, /\*\*lines added at assembly:\*\*/, /\*\*Trial settings:\*\*/, /Verdict: \*\*approve\*\*/]) assert.match(body, re)
    assert.ok(existsSync(join(root, 'docs/ledger', `${ep.id}.json`)))
    const state = loadState(join(prod, 'state.json'))
    assert.deepEqual(STAGES.map((s) => state.stages[s].status), STAGES.map(() => 'done'))
    assert.ok(!/\d{4}-\d{2}-\d{2}T\d{2}:/.test(readFileSync(join(prod, 'state.json'), 'utf8')), 'no timestamps')
  } finally {
    cleanup(root)
  }
})

test('fit: a line still heard as something alarming stops the run for the owner; a rewrite only when the owner asks', async () => {
  const fx = mkdtempSync(join(tmpdir(), 'wr-fx-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  rmSync(join(fx, 'fit.talk-ask/production/drafts/talk-ask/script.js'))
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run(), 1)
    let o = out(lines)
    assert.match(o, /gate fit\.heard FAIL\n  FAIL for the owner: talk-ask calm \(larry, flagged: alarming: bomb\)/)
    assert.match(o, /decide: fit stopped/)
    assert.ok(!/fixture fit\.rewrite-/.test(o), 'no rewrite until the owner asks')
    const prod = join(findEpisodeForWeek(root, WEEK).dir, 'production')
    writeFileSync(join(prod, 'fit/owner-rewrites.json'), JSON.stringify({ drafts: { 'talk-ask': ['calm'] } }))
    lines.length = 0
    await run()
    o = out(lines)
    assert.match(o, /fixture fit\.rewrite-talk-ask[\s\S]*gate fit\.heard ok[\s\S]*stage fit done/)
    assert.match(readFileSync(join(prod, 'briefs/fit/fit.rewrite-talk-ask.md'), 'utf8'), /The owner asked for these lines to be rewritten:\n- calm \(larry, /)
  } finally {
    cleanup(root)
    rmSync(fx, { recursive: true, force: true })
  }
})

test('briefs: a short reading list, one place to write, a scratch folder, a check for the task alone', async () => {
  const { root, run } = setup()
  try {
    await run()
    const prod = join(findEpisodeForWeek(root, WEEK).dir, 'production')
    const writer = readFileSync(join(prod, 'briefs/brainstorm/brainstorm.writer-1.md'), 'utf8')
    assert.match(writer, /\*\*Role:\*\* `writer`/)
    assert.match(writer, /\*\*Scratch:\*\* `shots\/002-2099-w01\/_production\/scratch\/brainstorm\.writer-1\/`/)
    assert.match(writer, /--check brainstorm --task brainstorm\.writer-1/)
    assert.match(writer, /## What the check enforces/)
    assert.ok(!/docs\/bible\/ \(|docs\/ledger\/[^ ]|production\/review\/[a-z]/.test(writer.split('## Never')[0]), 'no whole bible, no ledger, no reviewers\' files')
    // every brief, for every role, names only files that exist (the run would have stopped otherwise)
    for (const dir of readdirSync(join(prod, 'briefs'))) for (const f of readdirSync(join(prod, 'briefs', dir))) {
      const text = readFileSync(join(prod, 'briefs', dir, f), 'utf8')
      if (!/\*\*Role:\*\* `(writer|researcher|builder|sound-editor)`/.test(text)) continue
      assert.ok(!/docs\/ledger|docs\/trials/.test(text.split('## Never')[0]), `${f} points a fenced role at the ledger or the trials`)
    }
  } finally {
    cleanup(root)
  }
})

test('--check --task prints only that task\'s lines: a lone writer never sees the others\' failures (finding 14)', async () => {
  const fx = fixtureCopy()
  rmSync(join(fx, 'brainstorm.writer-2'), { recursive: true })
  rmSync(join(fx, 'brainstorm.writer-3'), { recursive: true })
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run(), 1)
    assert.match(out(lines), /no output for task brainstorm\.writer-2/)
    lines.length = 0
    assert.equal(await run({ check: 'brainstorm', task: 'brainstorm.writer-1' }), 0, out(lines))
    assert.deepEqual(lines, ['check brainstorm --task brainstorm.writer-1: ok'])
    lines.length = 0
    assert.equal(await run({ check: 'brainstorm', task: 'brainstorm.writer-2' }), 1)
    assert.match(out(lines), /FAIL .*brainstorm\/writer-2\.jsonl: not written yet/)
    lines.length = 0
    assert.equal(await run({ check: 'brainstorm' }), 1)
    assert.match(out(lines), /pool card .* has ideas from 1 writer/)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('--status says exactly whom to spawn; without a signed-in claude the default runner is manual; it is remembered', async () => {
  const { root, lines, run } = setup()
  try {
    assert.equal(await run({ runner: undefined }), 1)
    assert.match(out(lines), /waiting at scope for 1 subagent/)
    lines.length = 0
    assert.equal(await run({ status: true, runner: undefined }), 0)
    assert.match(out(lines), /status 2099-W01 002-2099-w01 \(draft\), runner manual/)
    assert.match(out(lines), /spawn auditor\s+scope\.auditor\s+brief episodes\/002-2099-w01\/production\/briefs\/scope\/scope\.auditor\.md/)
    lines.length = 0
    assert.equal(await produce({ root, week: WEEK, tools: fakeTools(root), ready: () => true, print: (l) => lines.push(l) }), 1, 'a remembered runner wins over detection')
    assert.match(out(lines), /spawn auditor\s+scope\.auditor/)
    assert.equal(listEpisodes(root).length, 2, 'the same week maps to the same episode')
  } finally {
    cleanup(root)
  }
})

test('a second draft of a week whose id the ledger already holds gets a fresh id (finding 32)', async () => {
  const { root, lines, run } = setup()
  try {
    put(root, 'docs/ledger/002-2099-w01.json', { id: '002-2099-w01', aired: false })
    await run({ runner: 'manual' })
    assert.match(out(lines), /scaffold 002-2099-w01-2 \(2099-w01 is taken by an earlier draft\)/)
  } finally {
    cleanup(root)
  }
})

test('a send-back at review routes the run to the stage that can fix it, carrying only its changes', async () => {
  const fx = fixtureCopy()
  writeFileSync(join(fx, 'review.reviewer/production/review.json'), JSON.stringify({ verdict: 'send-back', route: 'stage', reasons: ["a reviewer's private reason"], changes: ['talk-ask: the card is gone before it can be read'] }))
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run(), 1, out(lines))
    assert.match(out(lines), /decide: review sent the episode back to stage/)
    lines.length = 0
    await run()
    assert.match(out(lines), /sent back from review to stage/)
    assert.match(out(lines), /stage stage start/)
    const prod = join(findEpisodeForWeek(root, WEEK).dir, 'production')
    assert.ok(existsSync(join(prod, 'review.json.rejected-1')), 'the verdict is set aside')
    const b = readFileSync(join(prod, 'briefs/stage/stage.talk-ask.md'), 'utf8')
    assert.match(b, /## Sent back to you[\s\S]*the card is gone before it can be read/)
    assert.ok(!b.includes('private reason'))
    assert.ok(!readFileSync(join(prod, 'state.json'), 'utf8').includes('private reason'))
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('--preview-only keeps the episode a draft and builds into preview/', async () => {
  const fx = fixtureCopy()
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
  const fx = fixtureCopy()
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
    assert.ok(!rep.plan.some((d) => d.ideas.includes('writer-1-3')))
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('produce arguments', () => {
  assert.deepEqual(parseArgs(['--week', '2026-W47', '--check', 'stage', '--segment', 'a']), { week: '2026-W47', check: 'stage', segment: 'a' })
  assert.deepEqual(parseArgs(['--week', '2026-W47', '--check', 'draft', '--task', 'draft.music']), { week: '2026-W47', check: 'draft', task: 'draft.music' })
  assert.deepEqual(parseArgs(['--week', 'x', '--rework', 'a,b']).rework, ['a', 'b'])
  for (const [argv, re] of [[[], /--week is required/], [['--week', 'x', '--runner', 'gpt'], /--runner must be one of/], [['--week', 'x', '--runner', 'fixture'], /needs --fixture/], [['--week', 'x', '--segment', 'a'], /--segment goes with --check stage/], [['--week', 'x', '--task', 'a'], /--task goes with --check/], [['--week', 'x', '--status', '--from', 'draft'], /use one of/]])
    assert.throws(() => parseArgs(argv), (e) => e.code === 2 && re.test(e.message))
  assert.equal(weekSlug('2026-W47'), '2026-w47')
  assert.throws(() => checkWeek('2026-47'))
})
