// the PreToolUse guard for researchers, writers and builders (bin/guard.mjs)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { check, currentEpisodes } from '../bin/guard.mjs'
import { cleanup, fakeRepo, put } from './helpers.mjs'

const root = '/repo'
const cur = ['002-two']
const c = (tool_name, tool_input, role = 'writer') => check({ tool_name, tool_input }, { role, root, current: cur })

test('guard: the ledger, earlier episodes and builds are refused for writers, researchers and builders', () => {
  for (const role of ['writer', 'researcher', 'builder']) {
    assert.match(c('Read', { file_path: '/repo/docs/ledger/001-pilot.json' }, role), /the ledger is for reviewers/)
    assert.match(c('Read', { file_path: 'episodes/001-pilot/segments/ask/script.js' }, role), /earlier episode/)
    assert.match(c('Read', { file_path: '/repo/dist/episodes/001-pilot/cues.json' }, role), /already done/)
    assert.match(c('Bash', { command: 'cat docs/ledger/featured.json' }, role), /ledger/)
    assert.match(c('Bash', { command: 'head -40 episodes/001-pilot/segments/ask/script.js' }, role), /001-pilot is an earlier episode/)
    assert.match(c('Bash', { command: 'git show HEAD~3:episodes/x.js' }, role), /git history/)
    assert.match(c('Grep', { pattern: 'Built it', path: '/repo' }, role), /start the search inside a folder/)
    assert.match(c('Grep', { pattern: 'x' }, role), /start the search inside a folder/)
    assert.match(c('Bash', { command: 'grep -rn "Built it" .' }, role), /recursive search/)
  }
})

test('guard: this episode, the bible, packages and the inherited copies stay open; reviewers are not guarded', () => {
  assert.equal(c('Read', { file_path: '/repo/episodes/002-two/production/research/longlist.json' }), null)
  assert.equal(c('Read', { file_path: '/repo/episodes/002-two/production/inherited/001-pilot/segments/ask/index.js' }, 'builder'), null)
  assert.equal(c('Read', { file_path: 'docs/bible/06-jokes.md' }), null)
  assert.equal(c('Grep', { pattern: 'x', path: 'packages/show' }, 'builder'), null)
  assert.equal(c('Bash', { command: 'grep -rn throat episodes/002-two/production/drafts' }), null)
  assert.equal(c('Bash', { command: 'npm run produce -- --week 2026-W47 --check draft' }), null)
  assert.equal(c('Read', { file_path: '/repo/docs/ledger/001-pilot.json' }, 'reviewer'), null)
  assert.equal(c('Bash', { command: 'git show HEAD:episodes/001-pilot/segments/ask/script.js' }, 'reviewer'), null)
  assert.match(c('Read', { file_path: '/repo/.secrets' }, 'reviewer'), /secrets/)
})

test('guard: the current episode is the one in production; the hook exits 2 with a reason', () => {
  const r = fakeRepo()
  try {
    put(r, 'episodes/002-two/production/state.json', { format: 'late-cluster-production/2', stages: { scope: { status: 'done' }, research: { status: 'waiting' } } })
    put(r, 'episodes/001-pilot/production/state.json', { stages: { review: { status: 'done' } } })
    assert.deepEqual(currentEpisodes(r, {}), ['002-two'])
    assert.deepEqual(currentEpisodes(r, { LATE_CLUSTER_EPISODE: '003-x' }), ['003-x'])
    const bin = fileURLToPath(new URL('../bin/guard.mjs', import.meta.url))
    const run = (input, role = 'writer') => spawnSync(process.execPath, [bin, role], { input: JSON.stringify(input), encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: r, LATE_CLUSTER_EPISODE: '' } })
    const no = run({ tool_name: 'Read', tool_input: { file_path: `${r}/episodes/001-pilot/segments/cold-open/script.js` } })
    assert.equal(no.status, 2)
    assert.match(no.stderr, /Refused for the writer role .* earlier episode/)
    assert.equal(run({ tool_name: 'Read', tool_input: { file_path: `${r}/episodes/002-two/production/state.json` } }).status, 0)
    assert.equal(run({ tool_name: 'Read', tool_input: { file_path: `${r}/episodes/001-pilot/segments/cold-open/script.js` } }, 'reviewer').status, 0)
  } finally {
    cleanup(r)
  }
})
