// the headless command line and its permissions per role, state.json and the digest index
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { claudeArgs, permissions } from '../src/writers/claude.mjs'
import { headlessReady, makeRunner } from '../src/runners.mjs'
import { loadState, newState, nextStage, resetFrom, saveState, STAGES } from '../src/state.mjs'
import { findPost, isOptedOut, loadDigest, postRefs } from '../src/digest.mjs'
import { cleanup, fakeRepo, POSTS, WEEK, ID } from './helpers.mjs'

/** a minimal glob for these tests: ** any depth, * one segment */
const matches = (pattern, path) => new RegExp('^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\0').replace(/\*/g, '[^/]*').replace(/\0/g, '.*') + '$').test(path)
const denies = (rules, tool, path) => rules.some((r) => r.startsWith(`${tool}(`) && matches(r.slice(tool.length + 1, -1), path))

const task = (id, role, writes, extra = {}) => ({ id, role, writes, ...extra })
const P = (role, t) => permissions({ role, task: t, id: ID, week: WEEK, others: ['001-pilot'] })

test('permissions: writers, researchers, builders and sound editors cannot read the ledger, the trials, earlier episodes or reviewers\' files; reviewers and auditors can', () => {
  for (const role of ['writer', 'researcher', 'builder', 'sound-editor']) {
    assert.ok(denies(P(role, task('x.y', role, [])).deny, 'Read', 'docs/trials/002-x.md'), `${role}: trials`)
    assert.ok(denies(P(role, task('x.y', role, [])).deny, 'Read', `episodes/${ID}/production/review/scope.md`), `${role}: review/`)
    const { deny } = P(role, task('x.y', role, []))
    assert.ok(denies(deny, 'Read', 'docs/ledger/001-pilot.json'), `${role}: ledger`)
    assert.ok(denies(deny, 'Read', 'episodes/001-pilot/segments/ask/script.js'), `${role}: earlier episode`)
    assert.ok(denies(deny, 'Read', 'dist/episodes/001-pilot/cues.json'), `${role}: built episodes`)
    assert.ok(!denies(deny, 'Read', `episodes/${ID}/production/research/cards/made/a.json`), `${role}: its own episode stays readable`)
    assert.ok(deny.includes('Bash(cat *)') && deny.includes('Bash(grep *)'), `${role}: shell readers denied`)
  }
  for (const role of ['reviewer', 'auditor']) {
    const { deny } = P(role, task('x.y', role, []))
    assert.ok(!denies(deny, 'Read', 'docs/ledger/001-pilot.json'), role)
    assert.ok(!denies(deny, 'Read', 'episodes/001-pilot/segments/ask/script.js'), role)
  }
  // the auditor reaches the network only through the scraper's commands; a viewer reads its frames and nothing else
  const a = P('auditor', task('select.consent-r1', 'auditor', []))
  assert.ok(a.allow.includes('Bash(npm run sources -- *)') && a.deny.includes('WebFetch') && a.deny.includes('Bash(curl *)'))
  const v = P('viewer', task('review.viewer-1', 'viewer', [`shots/${ID}/_cold/set-1/answer.md`]))
  assert.deepEqual(v.allow, [`Read(shots/${ID}/_cold/set-1/**)`, `Edit(shots/${ID}/_cold/set-1/answer.md)`])
  assert.ok(v.deny.includes('Bash'))
  const s = P('sound-editor', task('fit.x', 'sound-editor', []))
  assert.ok(s.allow.includes(`Bash(npm run fit -- ${ID} *)`))
  assert.ok(s.allow.includes(`Bash(npm run voice-research -- ${ID} *)`))
  assert.ok(!P('writer', task('draft.x', 'writer', [])).allow.some((x) => /npm run render/.test(x)), 'writers do not render')
  assert.ok(denies(P('reviewer', task('x.y', 'reviewer', [])).deny, 'Read', 'data/weeks/2026-W47/private/bio-review.md'), 'bios are for auditors')
  assert.ok(!denies(a.deny, 'Read', 'data/weeks/2026-W47/private/bio-review.md'))
  assert.ok(denies(P('writer', task('x.y', 'writer', [])).deny, 'Read', 'data/weeks/2026-W47/reviewers/about-show.json'))
})

test('permissions: every role is denied git, network, the bot, builds, scraping, secrets and the constitution', () => {
  for (const role of ['writer', 'researcher', 'builder', 'reviewer', 'auditor', 'sound-editor']) {
    const { deny } = P(role, task('x.y', role, []))
    for (const r of ['Bash(git *)', 'Bash(gh *)', 'WebFetch', 'Bash(npm run bot *)', 'Bash(npm run build *)', 'Bash(npm run scrape *)', 'Read(.secrets)', 'Edit(docs/bible/00-constitution.md)', 'Edit(docs/bible/09-real-people.md)']) assert.ok(deny.includes(r), `${role}: ${r}`)
    assert.ok(denies(deny, 'Edit', `episodes/${ID}/production/state.json`))
    assert.ok(denies(deny, 'Edit', `episodes/${ID}/production/briefs/draft/draft.x.md`))
  }
})

test('permissions: each task edits only what it writes; builders never edit scripts; only the final reviewer edits the bible', () => {
  const w = P('writer', task('brainstorm.writer-1', 'writer', [`episodes/${ID}/production/brainstorm/writer-1.jsonl`]))
  assert.deepEqual(w.allow.filter((a) => a.startsWith('Edit(')), [`Edit(episodes/${ID}/production/brainstorm/writer-1.jsonl)`])
  const b = P('builder', task('stage.chat', 'builder', [], { segment: 'chat' }))
  assert.ok(b.allow.includes(`Edit(episodes/${ID}/segments/chat/**)`))
  assert.ok(denies(b.deny, 'Edit', `episodes/${ID}/segments/chat/script.js`))
  assert.ok(!P('reviewer', task('rank.reviewer-1', 'reviewer', [])).allow.includes('Edit(docs/bible/**)'))
  assert.ok(P('reviewer', task('review.reviewer', 'reviewer', [])).allow.includes('Edit(docs/bible/**)'))
})

test('claudeArgs: print mode as the role subagent, dontAsk, project settings only, no Glob/Grep for non-reviewers, lists last', () => {
  const a = claudeArgs({ role: 'writer', task: task('draft.x', 'writer', []), id: ID, week: WEEK, others: [], maxTurns: 40, maxBudgetUsd: 5 })
  assert.deepEqual(a.slice(0, 3), ['-p', '--agent', 'writer'])
  for (const f of ['--permission-mode', 'dontAsk', '--setting-sources', 'project', '--max-turns', '40', '--max-budget-usd', '5']) assert.ok(a.includes(f), f)
  assert.equal(a[a.indexOf('--tools') + 1], 'Read,Edit,Write,Bash')
  assert.ok(a.indexOf('--allowedTools') < a.indexOf('--disallowedTools'))
  assert.ok(a.slice(a.indexOf('--allowedTools')).every((x) => !x.startsWith('--') || x === '--allowedTools' || x === '--disallowedTools'))
  const r = claudeArgs({ role: 'reviewer', task: task('rank.reviewer-1', 'reviewer', []), id: ID, week: WEEK, others: [] })
  assert.equal(r[r.indexOf('--tools') + 1], 'Read,Glob,Grep,Edit,Write,Bash')
})

test('headless runner: the brief on stdin, the role as --agent, failures mapped', async () => {
  const d = mkdtempSync(join(tmpdir(), 'wr-headless-'))
  try {
    const brief = join(d, 'b.md')
    const { writeFileSync } = await import('node:fs')
    writeFileSync(brief, '# the brief\n')
    const config = { constitution: ['00-constitution.md'], headless: { command: 'claude', timeoutMinutes: 1, maxTurns: 10, maxBudgetUsd: 1 } }
    const ctx = { id: ID, week: WEEK, bibleDir: join(d, 'docs/bible'), ledgerDir: join(d, 'docs/ledger'), paths: { rel: (x) => x, work: join(d, 'work') } }
    const seen = []
    const spawn = (cmd, args, o) => (seen.push({ cmd, args, input: o.input }), { status: 0, stdout: JSON.stringify({ result: 'wrote it', is_error: false }) })
    const run = makeRunner('headless', { root: d, config, print: () => {}, state: {}, spawn })
    assert.deepEqual(await run(ctx, [task('draft.x', 'writer', [])], { briefPath: () => brief }), { status: 'done' })
    assert.equal(seen[0].input, '# the brief\n')
    assert.equal(seen[0].args[seen[0].args.indexOf('--agent') + 1], 'writer')
    const bad = makeRunner('headless', { root: d, config, print: () => {}, state: {}, spawn: () => ({ status: 1, stdout: JSON.stringify({ result: 'budget', is_error: true }) }) })
    const r = await bad(ctx, [task('draft.x', 'writer', [])], { briefPath: () => brief })
    assert.equal(r.status, 'failed')
    assert.match(r.detail, /draft\.x: claude exited 1: budget/)
  } finally {
    cleanup(d)
  }
})

test('headless runner: a wave runs in parallel; ready only when claude is signed in or a credential is set', async () => {
  const d = mkdtempSync(join(tmpdir(), 'wr-headless-'))
  try {
    const { writeFileSync, chmodSync } = await import('node:fs')
    const fake = join(d, 'claude')
    writeFileSync(fake, '#!/bin/sh\ncat > /dev/null\nsleep 1\necho \'{"result":"ok","is_error":false,"num_turns":3,"total_cost_usd":0.01}\'\n')
    chmodSync(fake, 0o755)
    writeFileSync(join(d, 'b.md'), '# brief\n')
    const config = { constitution: [], headless: { command: fake, parallel: 3, timeoutMinutes: 1 } }
    const ctx = { id: ID, week: WEEK, bibleDir: join(d, 'docs/bible'), ledgerDir: join(d, 'docs/ledger'), paths: { rel: (x) => x, work: join(d, 'work') } }
    const lines = []
    const run = makeRunner('headless', { root: d, config, print: (l) => lines.push(l), state: {} })
    const t0 = Date.now()
    assert.deepEqual(await run(ctx, ['a', 'b', 'c'].map((x) => task(`draft.${x}`, 'writer', [])), { briefPath: () => join(d, 'b.md') }), { status: 'done' })
    assert.ok(Date.now() - t0 < 2600, `three tasks of 1 s (3 s one after another) took ${Date.now() - t0} ms`)
    assert.match(lines.join('\n'), /claude draft\.a ok \(writer, 3 turns, \$0\.01\)/)
    const said = (stdout, status = 0) => () => ({ status, stdout })
    assert.equal(headlessReady({ env: {}, spawn: said('{"loggedIn": true}') }), true)
    assert.equal(headlessReady({ env: {}, spawn: said('{"loggedIn": false}') }), false)
    assert.equal(headlessReady({ env: {}, spawn: () => ({ error: new Error('ENOENT') }) }), false)
    assert.equal(headlessReady({ env: { ANTHROPIC_API_KEY: 'x' }, spawn: said('', 0) }), true)
  } finally {
    cleanup(d)
  }
})

test('state.json: round trip, stable order, no timestamps, resume and reset', () => {
  const d = mkdtempSync(join(tmpdir(), 'wr-state-'))
  try {
  const f = join(d, 'state.json')
  const s = newState({ week: WEEK, episode: ID, digest: 'data/weeks/2026-W47', limits: 'default' })
  s.stages.scope.status = 'done'
  s.stages.research = { status: 'done', data: { excluded: ['x'] }, gates: [{ name: 'research.cards', ok: true, failures: [], warnings: ['w'] }] }
  saveState(f, s)
  const back = loadState(f)
  assert.deepEqual(Object.keys(back.stages), STAGES)
  assert.deepEqual(back.stages.research.data, { excluded: ['x'] })
  assert.deepEqual(back.stages.research.gates[0], { name: 'research.cards', ok: true, warnings: ['w'] })
  assert.equal(nextStage(back), 'rank')
  resetFrom(back, 'research')
  assert.deepEqual(back.stages.research, { status: 'pending', data: { excluded: ['x'] } })
  assert.equal(nextStage(back), 'research')
  saveState(f, back)
  assert.ok(!/T\d\d:\d\d/.test(readFileSync(f, 'utf8')))
  } finally {
    cleanup(d)
  }
})

test('loadDigest finds posts anywhere, by URI or URL, with story flags, threads and opt-outs', () => {
  const root = fakeRepo()
  try {
    const d = loadDigest(join(root, 'data/weeks', WEEK), { optOutFile: join(root, 'packages/scraper/config/optout.json') })
    assert.equal(findPost(d, POSTS.anaClaim.url).uri, POSTS.anaClaim.uri)
    assert.equal(findPost(d, POSTS.boReply.uri).parent, POSTS.anaClaim.uri)
    assert.equal(findPost(d, 'https://bsky.app/profile/someone.test/post/a1'), null, 'the rkey alone is not enough')
    assert.equal(findPost(d, POSTS.oob.uri).outOfBounds, true)
    assert.equal(findPost(d, POSTS.build.uri).outOfBounds, false)
    assert.equal(d.accounts.get('bo.test').small, true)
    assert.ok(d.threads.some((t) => t.posts.length === 3 && t.root === POSTS.anaClaim.uri))
    assert.ok(isOptedOut(d, '@nope.test') && !isOptedOut(d, 'ana.test'))
    assert.ok(d.links.has('golem.cy.test'))
    assert.deepEqual(postRefs(`see ${POSTS.anaClaim.uri} and ${POSTS.build.url}.`), [POSTS.anaClaim.uri, POSTS.build.url])
  } finally {
    cleanup(root)
  }
})
