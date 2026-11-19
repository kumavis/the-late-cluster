// The orchestrator end to end with the fixture writer and fake tools: stage order, state.json,
// resume after a failure, --status / --stage / --from / --check, the week-to-episode mapping, the
// manual writer, the retry loop, render failures going back to the writer, and the pull request.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { produce } from '../src/pipeline.mjs'
import { findEpisodeForWeek, PKG, weekSlug, checkWeek, listEpisodes } from '../src/repo.mjs'
import { loadState, STAGES } from '../src/state.mjs'
import { parseArgs } from '../bin/produce.mjs'
import { cleanup, fakeRepo, fakeTools, put } from './helpers.mjs'

const TRIAL = join(PKG, 'test', 'fixtures', 'trial')
const WEEK = '2099-W01'

function setup({ fixture = TRIAL } = {}) {
  const root = fakeRepo({ fullScorecard: true })
  const tools = fakeTools(root)
  const lines = []
  const run = (o = {}) => produce({ root, week: WEEK, writer: 'fixture', fixture, digest: join(fixture, 'digest'), limits: join(fixture, 'limits.json'), tools, print: (l) => lines.push(l), ...o })
  return { root, tools, lines, run }
}
/** a copy of the trial fixture to plant violations in */
function fixtureCopy() {
  const d = mkdtempSync(join(tmpdir(), 'writers-room-fixture-'))
  cpSync(TRIAL, d, { recursive: true })
  return d
}

test('week to episode: none, one, or an error for two', () => {
  const root = fakeRepo()
  try {
    assert.equal(findEpisodeForWeek(root, '2026-W47'), null)
    assert.equal(findEpisodeForWeek(root, '2026-W46').id, '001-pilot')
    put(root, 'episodes/005-dupe/episode.json', { id: '005-dupe', status: 'draft', week: '2026-W46', rundown: [] })
    assert.throws(() => findEpisodeForWeek(root, '2026-W46'), /claimed by 001-pilot and 005-dupe/)
    assert.equal(weekSlug('2026-W47'), '2026-w47')
    assert.throws(() => checkWeek('2026-47'), /not an ISO week/)
  } finally {
    cleanup(root)
  }
})

test('the whole pipeline runs to a pull request with the fixture writer', async () => {
  const { root, tools, lines, run } = setup()
  try {
    assert.equal(await run(), 0, lines.join('\n'))
    const ep = findEpisodeForWeek(root, WEEK)
    assert.equal(ep.id, '002-2099-w01')
    const state = loadState(join(ep.dir, 'production', 'state.json'))
    assert.deepEqual(STAGES.map((s) => state.stages[s].status), STAGES.map(() => 'done'))
    assert.equal(state.stages.pitch.attempts, 1)
    assert.ok(!/\d{4}-\d{2}-\d{2}T\d{2}:/.test(readFileSync(join(ep.dir, 'production', 'state.json'), 'utf8')), 'no timestamps in state.json')
    assert.equal(ep.meta.status, 'published')
    assert.equal(ep.meta.title, 'Two Segments')
    assert.deepEqual(ep.meta.rundown, ['cold-open', 'chat'])
    // the stages called the repo's commands, in order
    const order = tools.calls.map((c) => c[0]).filter((c, k, a) => c !== a[k - 1])
    assert.deepEqual(order, ['episode:new', 'render', 'check', 'shoot', 'thumbnail', 'build', 'verify'])
    const body = readFileSync(join(ep.dir, 'production', 'pr-body.md'), 'utf8')
    assert.match(readFileSync(join(ep.dir, 'production', 'pr-title.txt'), 'utf8'), /^Episode 002: Two Segments \(week 2099-W01\)/)
    for (const re of [/Merging this pull request publishes/, /Trial limits/, /## Risks and open questions/, /This is a fixture/, /## Real accounts and posts used/, /npm run preview/, /- \[ \] Every real account is in sources\.json/, /render\.whisper: whisper is not installed/])
      assert.match(body, re)
    assert.match(lines.at(-1), /done; pull request text in/)
    // inheritance: exactly the plan's file, copied and recorded
    assert.ok(existsSync(join(ep.dir, 'production/inherited/001-pilot/segments/cold-open/script.js')))
    assert.deepEqual(state.stages.pitch.data.inherited.map((x) => `${x.from}/${x.path}`), ['001-pilot/segments/cold-open/script.js'])
    assert.ok(state.bible.snapshot.constitution['00-constitution.md'] && state.bible.snapshot.dna['03-episode-shape.md'])
    // the change to the show sits near the top of the pull request
    const top = body.indexOf('## This pull request also changes the show')
    assert.ok(top > 0 && top < body.indexOf('## The episode'))
    for (const re of [/\*\*Retro of 001-pilot\.\*\* Worked: The engine reads/, /Reactions: <https:\/\/bsky\.app\/profile\/fan\.example\/post\/f1>/, /\*\*Experiment:\*\* Cut the episode to two segments/, /Writer's verdict before air: \*\*worked\*\*/, /- `001-pilot\/segments\/cold-open\/script\.js`: the pilot's cold open/, /- `docs\/bible\/03-episode-shape\.md` \(modified\): adds a trial note/, /The constitution is unchanged/])
      assert.match(body, re)
    assert.match(readFileSync(join(root, 'docs/bible/03-episode-shape.md'), 'utf8'), /Trial note/)
    assert.match(readFileSync(join(root, 'docs/bible/lore.md'), 'utf8'), /\*\*E-002 Two Segments\*\*/)
    // running again does nothing
    lines.length = 0
    assert.equal(await run(), 0)
    assert.match(lines.join('\n'), /already done/)
  } finally {
    cleanup(root)
  }
})

test('a planted violation stops the run; after the fix it resumes where it stopped', async () => {
  const fx = fixtureCopy()
  const chat = join(fx, 'write/segments/chat/script.js')
  const good = readFileSync(chat, 'utf8')
  writeFileSync(chat, good.replace(" // invented", ''))
  const { root, lines, run, tools } = setup({ fixture: fx })
  try {
    assert.equal(await run({ maxAttempts: 2 }), 1)
    const out = lines.join('\n')
    assert.match(out, /gate write\.guest-lines FAIL\n  FAIL segments\/chat\/script\.js:9 \(hello\): zed says "Hello, Larry\. I am a test\." with no source comment \(rule R3\)/)
    assert.match(out, /stage write attempt 2 writer=fixture \(1 failures to fix\)/)
    assert.match(out, /produce 002-2099-w01: stopped at write/)
    const ep = findEpisodeForWeek(root, WEEK)
    let state = loadState(join(ep.dir, 'production', 'state.json'))
    assert.equal(state.stages.pitch.status, 'done')
    assert.equal(state.stages.write.status, 'failed')
    assert.equal(state.stages.write.attempts, 2)
    // --status shows where it is
    lines.length = 0
    assert.equal(await run({ status: true }), 0)
    assert.match(lines.join('\n'), /write {6}failed attempts=2[\s\S]*FAIL write\.guest-lines[\s\S]*next: write/)
    // fix the fixture and resume: pitch is not redone, and the same episode is used
    writeFileSync(chat, good)
    lines.length = 0
    const pitchCalls = tools.calls.length
    assert.equal(await run(), 0, lines.join('\n'))
    assert.ok(!lines.some((l) => l.startsWith('stage pitch')), 'pitch is not re-run')
    assert.match(lines[0], /stage write start/)
    assert.equal(listEpisodes(root).length, 2, 'no second episode for the week')
    state = loadState(join(ep.dir, 'production', 'state.json'))
    assert.equal(state.stages.write.status, 'done')
    assert.ok(tools.calls.length > pitchCalls)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('touching the constitution fails the self-check, whatever the writer was allowed', async () => {
  const fx = fixtureCopy()
  put(fx, 'self-check/bible-append/00-constitution.md', '\n## 7. A new article the writer wrote\n')
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run({ maxAttempts: 1 }), 1)
    const out = lines.join('\n')
    assert.match(out, /gate self-check\.constitution FAIL\n  FAIL 00-constitution\.md is part of the constitution and has changed since this run started/)
    assert.match(out, /stopped at self-check/)
    assert.ok(!existsSync(join(findEpisodeForWeek(root, WEEK).dir, 'production/pr-body.md')), 'no pull request text')
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a real-TLD handle fails write.names and stops the run', async () => {
  const fx = fixtureCopy()
  const f = join(fx, 'write/cast.js')
  writeFileSync(f, readFileSync(f, 'utf8').replace('@zed.example', '@zed.social'))
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run({ maxAttempts: 1 }), 1)
    assert.match(lines.join('\n'), /FAIL cast\.js: @zed\.social is neither on \.example nor in sources\.json/)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a retry overlay (<stage>@2) fixes the stage on its second attempt', async () => {
  const fx = fixtureCopy()
  const pitch = join(fx, 'pitch/production/pitch.md')
  const good = readFileSync(pitch, 'utf8')
  writeFileSync(pitch, good.replace('## Risks and open questions', '## Risks'))
  put(fx, 'pitch@2/production/pitch.md', good)
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run({ stage: undefined, from: undefined }), 0, lines.join('\n'))
    assert.match(lines.join('\n'), /FAIL pitch\.md: no "## Risks and open questions"[\s\S]*stage pitch attempt 2[\s\S]*stage pitch done attempts=2/)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('render failures go back to the write stage\'s writer', async () => {
  const fx = fixtureCopy()
  put(fx, 'write@2/segments/chat/script.js', readFileSync(join(fx, 'write/segments/chat/script.js'), 'utf8').replace("title: 'The Guest',", "title: 'The Guest', // duration: 11"))
  // the first write renders at 30 s (too long for an 11 s plan); the rewrite renders at 11 s
  writeFileSync(join(fx, 'write/segments/chat/script.js'), readFileSync(join(fx, 'write/segments/chat/script.js'), 'utf8').replace("title: 'The Guest',", "title: 'The Guest', // duration: 30"))
  const { root, lines, run } = setup({ fixture: fx })
  try {
    assert.equal(await run(), 0, lines.join('\n'))
    const out = lines.join('\n')
    assert.match(out, /FAIL chat renders at 30\.0 s but the plan gives it 11 s/)
    assert.match(out, /stage render: back to the write stage's writer with 1 failures/)
    assert.match(out, /stage render done/)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('--stage needs earlier stages done; --from resets and redoes', async () => {
  const { root, lines, run } = setup()
  try {
    await assert.rejects(run({ stage: 'direct' }), /no episode for 2099-W01 yet/)
    assert.equal(await run({ stage: 'scaffold' }), 0)
    await assert.rejects(run({ stage: 'direct' }), /direct needs pitch, write, render done first/)
    assert.equal(await run(), 0)
    lines.length = 0
    assert.equal(await run({ from: 'direct' }), 0, lines.join('\n'))
    assert.match(lines[0], /stage direct start/)
    assert.ok(lines.some((l) => l.startsWith('stage build start')))
  } finally {
    cleanup(root)
  }
})

test('--preview-only keeps the episode a draft, builds into preview/ and never into dist/', async () => {
  const { root, tools, lines, run } = setup()
  try {
    assert.equal(await run({ previewOnly: true, stage: 'scaffold' }), 0)
    assert.equal(await run(), 0, lines.join('\n'))
    const ep = findEpisodeForWeek(root, WEEK)
    assert.equal(ep.meta.status, 'draft')
    assert.ok(tools.calls.some((c) => c[0] === 'build' && c.includes('--preview')))
    assert.ok(!tools.calls.some((c) => c[0] === 'build' && !c.includes('--preview')))
    assert.ok(!existsSync(join(root, 'dist/episodes', ep.id)))
    assert.equal(loadState(join(ep.dir, 'production/state.json')).previewOnly, true)
    assert.match(readFileSync(join(ep.dir, 'production/pr-body.md'), 'utf8'), /\*\*Preview only\.\*\*/)
  } finally {
    cleanup(root)
  }
})

test('--check runs one stage\'s gates and exits 1 on a failure', async () => {
  const { root, lines, run } = setup()
  try {
    await run({ stage: 'scaffold' })
    lines.length = 0
    assert.equal(await run({ check: 'pitch' }), 1)
    assert.match(lines.join('\n'), /check pitch 002-2099-w01: FAIL/)
  } finally {
    cleanup(root)
  }
})

test('the manual writer prints the prompt and waits; the next run checks the work first', async () => {
  const { root, lines, run } = setup()
  try {
    assert.equal(await run({ writer: 'manual' }), 1)
    const out = lines.join('\n')
    assert.match(out, /manual pitch: the prompt is in shots\/002-2099-w01\/_production\/prompts\/pitch\.md/)
    assert.match(out, /# The Late Cluster: the pitch stage of episode 002-2099-w01/)
    assert.match(out, /produce 002-2099-w01: waiting at pitch/)
    const ep = findEpisodeForWeek(root, WEEK)
    assert.equal(loadState(join(ep.dir, 'production', 'state.json')).stages.pitch.status, 'waiting')
    // a person does the stage (here: copies the fixture), then runs produce again
    cpSync(join(TRIAL, 'pitch/production'), join(ep.dir, 'production'), { recursive: true })
    for (const f of ['pitch.md', 'plan.json']) {
      const p = join(ep.dir, 'production', f)
      writeFileSync(p, readFileSync(p, 'utf8').replaceAll('__ID__', ep.id).replaceAll('__NUMBER__', '002').replaceAll('__WEEK__', WEEK))
    }
    lines.length = 0
    assert.equal(await run({ writer: 'manual' }), 1)
    assert.match(lines.join('\n'), /stage pitch done[\s\S]*manual write:/)
  } finally {
    cleanup(root)
  }
})

test('a scrape runs only when the digest is missing', async () => {
  const root = fakeRepo()
  const tools = fakeTools(root)
  const lines = []
  try {
    const go = (week) => produce({ root, week, writer: 'fixture', fixture: TRIAL, tools, print: (l) => lines.push(l), stage: 'scaffold' })
    assert.equal(await go('2026-W47'), 0)
    assert.match(lines[0], /stage scrape skip \(digest exists/)
    assert.equal(await go('2026-W50'), 0)
    assert.ok(tools.calls.some((c) => c[0] === 'scrape' && c[2] === '2026-W50'))
  } finally {
    cleanup(root)
  }
})

test('produce arguments: required week, one mode, known writers, exit code 2 on bad input', () => {
  assert.deepEqual(parseArgs(['--week', '2026-W47', '--from', 'write', '--max-attempts', '2']), { week: '2026-W47', from: 'write', maxAttempts: '2' })
  for (const [argv, re] of [[[], /--week is required/], [['--week', 'x', '--stage', 'nope'], /--stage must be one of/], [['--week', 'x', '--status', '--from', 'write'], /use one of/], [['--week', 'x', '--writer', 'gpt'], /--writer must be one of/], [['--week', 'x', '--writer', 'fixture'], /needs --fixture/], [['--week'], /needs a value/], [['--wat'], /unknown option/]])
    assert.throws(() => parseArgs(argv), (e) => e.code === 2 && re.test(e.message))
})
