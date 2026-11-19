// prompts, the claude command line and its permissions, the writers, state.json and the digest index
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildPrompt, stageScope } from '../src/prompt.mjs'
import { claudeArgs, claudeWriter, permissions } from '../src/writers/claude.mjs'
import { manualWriter } from '../src/writers/manual.mjs'
import { loadConfig } from '../src/pipeline.mjs'
import { loadState, newState, nextStage, resetFrom, saveState, STAGES } from '../src/state.mjs'
import { findPost, isOptedOut, loadDigest, postRefs } from '../src/digest.mjs'
import { episodePaths } from '../src/repo.mjs'
import { cleanup, fakeRepo, POSTS, WEEK, ID } from './helpers.mjs'

/** a minimal glob for these tests: ** any depth, * one segment */
const matches = (pattern, path) => new RegExp('^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\0').replace(/\*/g, '[^/]*').replace(/\0/g, '.*') + '$').test(path)

const { config } = loadConfig()

test('buildPrompt: run values, scope, check command, feedback, then the playbooks', () => {
  const p = buildPrompt({ stage: 'write', id: ID, week: WEEK, number: '002', title: 'T', digestDir: `data/weeks/${WEEK}`, limits: config.limits, attempt: 2, maxAttempts: 3, feedback: ['write.guest-lines: segments/chat/script.js:9: no source comment'] })
  assert.match(p, /^# The Late Cluster: the write stage of episode 002-2026-w47/)
  assert.match(p, /- week: `2026-W47`/)
  assert.match(p, /`data\/weeks\/2026-W47\/digest\.json`/)
  assert.match(p, /attempt 2 of 3/)
  assert.match(p, /Run only: .*`npm run render -- 002-2026-w47 <seg>\.\.\.`/)
  assert.match(p, /`npm run produce -- --week 2026-W47 --check write`/)
  assert.match(p, /## The previous attempt failed these gates[\s\S]*- write\.guest-lines: segments\/chat\/script\.js:9/)
  assert.match(p, /# Playbooks: rules for every stage/)
  assert.match(p, /# Write\n/)
  assert.ok(!p.includes('$comment'), 'config comments are not sent')
  assert.ok(p.indexOf('# Playbooks') < p.indexOf('# Write\n'))
})

test('buildPrompt marks trial limits, and every creative stage has a playbook and a scope', () => {
  assert.match(buildPrompt({ stage: 'pitch', id: ID, week: WEEK, number: '002', digestDir: 'x', limits: { words: { max: 80 } }, limitsAreDefault: false }), /NOT the defaults: this is a trial run/)
  for (const stage of ['pitch', 'write', 'direct', 'self-check']) {
    const s = stageScope({ stage, id: ID, week: WEEK })
    assert.ok(s.edit.length && s.run.includes(`npm run produce -- --week ${WEEK} --check ${stage}`))
    assert.ok(buildPrompt({ stage, id: ID, week: WEEK, number: '002', digestDir: 'x', limits: {} }).length > 1000)
  }
  assert.ok(stageScope({ stage: 'self-check', id: ID, week: WEEK, lore: '/tmp/lore.md' }).edit.includes('/tmp/lore.md'))
})

test('claudeArgs: headless, dontAsk, restricted tools, model and budgets, variadic lists last', () => {
  const a = claudeArgs({ stage: 'write', id: ID, week: WEEK, model: 'claude-fable-5-2', maxTurns: 200, maxBudgetUsd: 25 })
  const at = (f) => a[a.indexOf(f) + 1]
  assert.equal(a[0], '-p')
  assert.equal(at('--model'), 'claude-fable-5-2')
  assert.equal(at('--output-format'), 'json')
  assert.equal(at('--permission-mode'), 'dontAsk')
  assert.equal(at('--setting-sources'), 'project')
  assert.equal(at('--tools'), 'Read,Edit,Write,Bash', 'no Glob or Grep: Read deny rules do not stop a search from above')
  assert.equal(at('--max-turns'), '200')
  assert.equal(at('--max-budget-usd'), '25')
  for (const f of ['--strict-mcp-config', '--disable-slash-commands', '--no-session-persistence']) assert.ok(a.includes(f), f)
  assert.ok(a.indexOf('--allowedTools') > a.indexOf('--max-budget-usd'))
  assert.ok(a.indexOf('--disallowedTools') > a.indexOf('--allowedTools'))
  assert.equal(a.at(-1).startsWith('Write(') || a.at(-1).startsWith('Edit('), true)
})

test('permissions: each stage edits only its files and runs only its commands; git, network, bot, build denied', () => {
  const w = permissions({ stage: 'write', id: ID, week: WEEK })
  assert.ok(w.allow.includes(`Edit(episodes/${ID}/segments/**)`))
  assert.ok(w.allow.includes(`Bash(npm run render -- ${ID} *)`))
  assert.ok(!w.allow.some((r) => /docs\/bible|Bash\(git|npm run build|npm run bot|Glob|Grep/.test(r)))
  for (const d of ['Bash(git *)', 'Bash(gh *)', 'Bash(npm run bot *)', 'Bash(npm run build *)', 'WebFetch', 'WebSearch', 'Bash(curl *)', `Edit(episodes/${ID}/production/state.json)`, `Edit(episodes/${ID}/production/inherited/**)`, 'Read(.secrets)']) assert.ok(w.deny.includes(d), d)
  const d = permissions({ stage: 'direct', id: ID, week: WEEK })
  assert.ok(d.allow.includes(`Edit(episodes/${ID}/segments/**)`) && d.deny.includes(`Edit(episodes/${ID}/segments/**/script.js)`), 'direct may add helpers but not touch scripts')
  assert.ok(!d.allow.some((r) => /sources\.json/.test(r)))
  assert.ok(d.allow.includes(`Bash(npm run shoot -- ${ID} *)`))
  const p = permissions({ stage: 'pitch', id: ID, week: WEEK })
  assert.ok(!p.allow.some((r) => r.startsWith('Bash(npm run render')))
})

test('permissions: no other episode, no build, in every creative stage; its own episode stays readable', () => {
  const others = ['001-pilot', '003-later', '004-even-later']
  for (const stage of ['pitch', 'write', 'direct', 'self-check']) {
    const { allow, deny } = permissions({ stage, id: ID, week: WEEK, others })
    for (const o of others) for (const r of [`Read(episodes/${o}/**)`, `Edit(episodes/${o}/**)`, `Read(shots/${o}/**)`, `Read(preview/${o}/**)`]) assert.ok(deny.includes(r), `${stage}: ${r}`)
    for (const r of ['Read(dist/episodes/**)', 'Read(preview/**)', 'Read(video/**)']) assert.ok(deny.includes(r), `${stage}: ${r}`)
    // shell readers and searchers cannot route around the Read rules
    for (const c of ['grep', 'rg', 'find', 'cat', 'head', 'awk', 'diff', 'xargs']) assert.ok(deny.includes(`Bash(${c} *)`) && deny.includes(`Bash(${c})`), `${stage}: ${c}`)
    assert.ok(deny.includes('Bash(ls -*R*)'))
    // nothing denies its own episode, its inherited copies, the studio, the bible or the digest
    const own = [`episodes/${ID}/production/inherited/001-pilot/segments/cold-open/script.js`, `episodes/${ID}/production/plan.json`, 'packages/show/reference/segments/demo/index.js', 'docs/bible/03-episode-shape.md', `data/weeks/${WEEK}/digest.json`, 'packages/writers-room/playbooks/write.md']
    for (const f of own) assert.ok(!deny.some((r) => r.startsWith('Read(') && matches(r.slice(5, -1), f)), `${stage}: ${f} is readable`)
    assert.ok(allow.includes('Read'))
  }
})

test('permissions: the self-check may amend the DNA and never the constitution', () => {
  const s = permissions({ stage: 'self-check', id: ID, week: WEEK, bible: 'docs/bible', constitution: ['00-constitution.md', '09-real-people.md'] })
  assert.ok(s.allow.includes('Edit(docs/bible/**)') && s.allow.includes(`Edit(episodes/${ID}/production/dna-amendments.md)`))
  assert.ok(s.deny.includes('Edit(docs/bible/00-constitution.md)') && s.deny.includes('Edit(docs/bible/09-real-people.md)'), 'deny wins over the bible allow')
  for (const stage of ['pitch', 'write', 'direct']) {
    const p = permissions({ stage, id: ID, week: WEEK })
    assert.ok(!p.allow.some((r) => r.includes('docs/bible')), `${stage} cannot edit the bible`)
    assert.ok(p.deny.includes('Edit(docs/bible/00-constitution.md)'))
  }
  const trial = permissions({ stage: 'self-check', id: ID, week: WEEK, bible: '../tmp/bible', lore: '../tmp/bible/lore.md' })
  assert.ok(trial.allow.includes('Edit(../tmp/bible/**)') && trial.deny.includes('Edit(../tmp/bible/09-real-people.md)'))
})

test('buildPrompt states the reading rule and the inheritance for any writer, the manual one included', () => {
  const p = buildPrompt({ stage: 'direct', id: ID, week: WEEK, number: '002', digestDir: 'x', limits: {}, others: ['001-pilot'], inherited: ['production/inherited/001-pilot/segments/cold-open/index.js'] })
  assert.match(p, /Do not read any other episode \(`episodes\/001-pilot\/`\), any build in `dist\/episodes\/`/)
  assert.match(p, /carries forward `production\/inherited\/001-pilot\/segments\/cold-open\/index\.js`/)
  assert.match(p, /The constitution \(`docs\/bible\/00-constitution\.md` and `docs\/bible\/09-real-people\.md`\) is the owner's/)
  assert.match(buildPrompt({ stage: 'pitch', id: ID, week: WEEK, number: '002', digestDir: 'x', limits: {} }), /carries nothing forward/)
  for (const stage of ['pitch', 'write', 'direct', 'self-check']) assert.ok(!/episodes\/001-pilot\/segments/.test(buildPrompt({ stage, id: ID, week: WEEK, number: '002', digestDir: 'x', limits: {} })), `${stage} playbook points at the pilot`)
})

test('claudeWriter: passes the prompt on stdin, records cost, maps failures', async () => {
  const root = fakeRepo()
  try {
    const paths = episodePaths(root, ID)
    let seen
    const spawn = (cmd, args, o) => ((seen = { cmd, args, o }), { status: 0, stdout: JSON.stringify({ type: 'result', subtype: 'success', is_error: false, result: 'ok', total_cost_usd: 1.25, num_turns: 12 }) })
    const out = []
    const w = claudeWriter({ config, model: 'claude-opus-5-5', spawn, env: {}, print: (l) => out.push(l) })
    assert.deepEqual(await w.run({ stage: 'pitch', prompt: 'PROMPT', root, id: ID, week: WEEK, paths }), { status: 'done' })
    assert.equal(seen.cmd, 'claude')
    assert.equal(seen.o.input, 'PROMPT')
    assert.equal(seen.o.cwd, root)
    assert.equal(seen.args[seen.args.indexOf('--model') + 1], 'claude-opus-5-5')
    assert.match(readFileSync(join(paths.work, 'costs.jsonl'), 'utf8'), /"cost":1.25/)
    assert.ok(existsSync(join(paths.work, 'prompts', 'pitch.md')))
    assert.match(out.join('\n'), /success, 12 turns, \$1\.25/)
    const bad = claudeWriter({ config, spawn: () => ({ status: 1, stdout: JSON.stringify({ subtype: 'error_max_budget_usd', is_error: true, result: 'budget' }) }), env: {}, print: () => {} })
    assert.match((await bad.run({ stage: 'pitch', prompt: 'x', root, id: ID, week: WEEK, paths })).detail, /error_max_budget_usd/)
    const missing = claudeWriter({ config, spawn: () => ({ status: null, error: new Error('spawn claude ENOENT') }), env: {}, print: () => {} })
    assert.match((await missing.run({ stage: 'pitch', prompt: 'x', root, id: ID, week: WEEK, paths })).detail, /could not run claude/)
    assert.equal(claudeWriter({ config, env: { PRODUCE_MODEL: 'claude-opus-5-5' } }).model, 'claude-opus-5-5')
    assert.equal(claudeWriter({ config, env: {} }).model, 'claude-fable-5-2')
  } finally {
    cleanup(root)
  }
})

test('manualWriter: saves and prints the prompt and the expected files, then waits', async () => {
  const root = fakeRepo()
  try {
    const paths = episodePaths(root, ID)
    const out = []
    const r = await manualWriter({ print: (l) => out.push(l) }).run({ stage: 'direct', prompt: 'THE PROMPT', paths, id: ID, week: WEEK })
    assert.equal(r.status, 'waiting')
    assert.equal(readFileSync(join(paths.work, 'prompts', 'direct.md'), 'utf8'), 'THE PROMPT')
    assert.match(out.join('\n'), /THE PROMPT[\s\S]*segments\/<seg>\/index\.js[\s\S]*--check direct[\s\S]*npm run produce -- --week 2026-W47$/)
  } finally {
    cleanup(root)
  }
})

test('state.json: round trip, stable order, no timestamps, resume and reset', () => {
  const d = mkdtempSync(join(tmpdir(), 'wr-state-'))
  const f = join(d, 'state.json')
  const s = newState({ week: WEEK, episode: ID, digest: 'data/weeks/2026-W47', limits: 'default' })
  s.stages.scrape.status = 'done'
  s.stages.scaffold.status = 'done'
  s.stages.pitch = { status: 'done', attempts: 2, gates: [{ name: 'pitch.plan', ok: true, failures: [], warnings: ['w'] }] }
  saveState(f, s)
  const back = loadState(f)
  assert.deepEqual(Object.keys(back.stages), STAGES)
  assert.equal(back.stages.pitch.attempts, 2)
  assert.deepEqual(back.stages.pitch.gates[0], { name: 'pitch.plan', ok: true, warnings: ['w'] })
  assert.equal(nextStage(back), 'write')
  resetFrom(back, 'pitch')
  assert.equal(back.stages.pitch.status, 'pending')
  assert.equal(nextStage(back), 'pitch')
  saveState(f, back)
  assert.ok(!/T\d\d:\d\d/.test(readFileSync(f, 'utf8')))
  cleanup(d)
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
