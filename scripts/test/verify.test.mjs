import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { verifyRepo } from '../lib/verify.mjs'
import { buildEpisode } from '../lib/build.mjs'
import { resolveEpisode } from '../lib/episodes.mjs'
import { tempRoot, addEpisode, fakeBundle } from './fixture.mjs'

const VERIFY = fileURLToPath(new URL('../verify.mjs', import.meta.url))

async function published(fx, id = '001-pilot') {
  addEpisode(fx, id)
  await buildEpisode(resolveEpisode(id, { root: fx.root }), { bundle: fakeBundle })
  rmSync(join(fx.root, 'episodes', id, 'public'), { recursive: true }) // as committed: assets only in dist/
}
const problems = (r) => r.results.flatMap((x) => x.problems.map((p) => `${x.id}: ${p}`))
const run = (root) => spawnSync(process.execPath, [VERIFY, '--root', root], { encoding: 'utf8' })

test('passing: a published episode with a matching build', async () => {
  const fx = tempRoot()
  try {
    await published(fx)
    const r = verifyRepo(fx.root)
    assert.deepEqual(problems(r), [])
    assert.equal(r.ok, true)
    const cli = run(fx.root)
    assert.equal(cli.status, 0)
    assert.equal(cli.stdout, 'ok 001-pilot\nverify: 1 published, 0 drafts, 0 problems\n')
  } finally {
    fx.cleanup()
  }
})

test('stale: a source file changed after the build', async () => {
  const fx = tempRoot()
  try {
    await published(fx)
    fx.put('episodes/001-pilot/segments/intro/script.js', "export default { id: 'intro', beats: [1] }\n")
    const r = verifyRepo(fx.root)
    assert.equal(r.ok, false)
    assert.match(problems(r).join('\n'), /001-pilot: stale build: sourceHash/)
    const cli = run(fx.root)
    assert.equal(cli.status, 1)
    assert.match(cli.stdout, /^FAIL 001-pilot: stale build/m)
  } finally {
    fx.cleanup()
  }
})

test('missing assets: a rundown segment has no audio in the build', async () => {
  const fx = tempRoot()
  try {
    await published(fx)
    rmSync(join(fx.root, 'dist/episodes/001-pilot/tele/outro.bin'))
    assert.deepEqual(problems(verifyRepo(fx.root)), ['001-pilot: missing dist/episodes/001-pilot/tele/outro.bin'])
  } finally {
    fx.cleanup()
  }
})

test('unbuilt: a published episode without a build', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot')
    assert.match(problems(verifyRepo(fx.root)).join(), /no build \(dist\/episodes\/001-pilot\/episode.json\)/)
  } finally {
    fx.cleanup()
  }
})

test('orphan builds: no source, or a draft source', async () => {
  const fx = tempRoot()
  try {
    await published(fx)
    fx.put('dist/episodes/009-gone/episode.json', '{}')
    addEpisode(fx, '002-wip', { status: 'draft' })
    fx.put('dist/episodes/002-wip/index.html', 'x')
    fx.put('dist/episodes/.001-pilot.new-123/index.html', 'temp folders are not builds')
    const r = verifyRepo(fx.root)
    assert.deepEqual(problems(r).sort(), ['002-wip: orphan build dist/episodes/002-wip: its source is a draft', '009-gone: orphan build dist/episodes/009-gone: no source in episodes/'])
    assert.equal(run(fx.root).status, 1)
  } finally {
    fx.cleanup()
  }
})

test('drafts are ignored', async () => {
  const fx = tempRoot()
  try {
    await published(fx)
    addEpisode(fx, '002-wip', { status: 'draft', render: null, thumbnail: false })
    const r = verifyRepo(fx.root)
    assert.equal(r.ok, true)
    assert.equal(r.drafts, 1)
    assert.equal(run(fx.root).stdout.trim().split('\n').at(-1), 'verify: 1 published, 1 drafts, 0 problems')
  } finally {
    fx.cleanup()
  }
})

