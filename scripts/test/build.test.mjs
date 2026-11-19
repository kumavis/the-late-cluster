// The bundler-free half of `npm run build`: where assets come from, refusals, and the swap that
// must never lose the committed audio.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, renameSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { buildEpisode, planBuild } from '../lib/build.mjs'
import { recover } from '../lib/swap.mjs'
import { resolveEpisode } from '../lib/episodes.mjs'
import { sourceHash } from '../lib/hash.mjs'
import { tempRoot, addEpisode, fakeBundle } from './fixture.mjs'

const read = (fx, rel) => readFileSync(join(fx.root, rel), 'utf8')
const ep = (fx, id = '1') => resolveEpisode(id, { root: fx.root })

test('a fresh render in public/ is built into dist/ with the manifest', async () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { render: 'public' })
    const r = await buildEpisode(ep(fx), { bundle: fakeBundle })
    assert.equal(r.assets.length, 4)
    assert.ok(r.assets.every((a) => a.from === 'public'))
    assert.equal(read(fx, 'dist/episodes/001-pilot/audio/intro.mp3'), 'mp3 intro from public')
    assert.equal(read(fx, 'dist/episodes/001-pilot/thumbnail.jpg'), 'jpeg of 001-pilot')
    const man = JSON.parse(read(fx, 'dist/episodes/001-pilot/episode.json'))
    assert.equal(man.build.sourceHash, sourceHash(join(fx.root, 'episodes/001-pilot')))
    assert.match(man.build.studioHash, /^[0-9a-f]{64}$/)
    assert.equal(man.status, 'published')
    assert.deepEqual(readdirSync(join(fx.root, 'dist/episodes')), ['001-pilot']) // no temp folders left
  } finally {
    fx.cleanup()
  }
})

test('with no public/, the committed audio and telemetry are carried forward', async () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { render: 'dist' }) // the normal case for a published episode
    assert.equal(existsSync(join(fx.root, 'episodes/001-pilot/public')), false)
    const r = await buildEpisode(ep(fx), { bundle: fakeBundle })
    assert.ok(r.assets.every((a) => a.from === 'current build'))
    for (const s of ['intro', 'outro']) {
      assert.equal(read(fx, `dist/episodes/001-pilot/audio/${s}.mp3`), `mp3 ${s} from dist`)
      assert.equal(read(fx, `dist/episodes/001-pilot/tele/${s}.bin`), `tele ${s} from dist`)
    }
    // and again: building twice gives the same bytes
    const before = read(fx, 'dist/episodes/001-pilot/episode.json')
    await buildEpisode(ep(fx), { bundle: fakeBundle })
    assert.equal(read(fx, 'dist/episodes/001-pilot/episode.json'), before)
    assert.equal(read(fx, 'dist/episodes/001-pilot/audio/intro.mp3'), 'mp3 intro from dist')
  } finally {
    fx.cleanup()
  }
})

test('a failing bundler leaves the committed build untouched', async () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { render: 'dist' })
    await buildEpisode(ep(fx), { bundle: fakeBundle })
    const man = read(fx, 'dist/episodes/001-pilot/episode.json')
    const boom = async (out) => {
      await fakeBundle(out)
      throw new Error('bundler crashed')
    }
    await assert.rejects(buildEpisode(ep(fx), { bundle: boom }), /bundler crashed/)
    assert.equal(read(fx, 'dist/episodes/001-pilot/episode.json'), man)
    assert.equal(read(fx, 'dist/episodes/001-pilot/audio/outro.mp3'), 'mp3 outro from dist')
    assert.deepEqual(readdirSync(join(fx.root, 'dist/episodes')), ['001-pilot'])
  } finally {
    fx.cleanup()
  }
})

test('an interrupted swap is repaired by the next build', async () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { render: 'dist' })
    // killed between "rename the old build aside" and "rename the new one in" (pid 1 is never ours)
    renameSync(join(fx.root, 'dist/episodes/001-pilot'), join(fx.root, 'dist/episodes/.001-pilot.old-999999'))
    mkdirSync(join(fx.root, 'dist/episodes/.001-pilot.new-999999'))
    assert.deepEqual(recover(join(fx.root, 'dist/episodes/001-pilot')).sort(), ['removed .001-pilot.new-999999', 'restored .001-pilot.old-999999'])
    await buildEpisode(ep(fx), { bundle: fakeBundle })
    assert.equal(read(fx, 'dist/episodes/001-pilot/audio/intro.mp3'), 'mp3 intro from dist')
    assert.deepEqual(readdirSync(join(fx.root, 'dist/episodes')), ['001-pilot'])
  } finally {
    fx.cleanup()
  }
})

test('refusals: missing render, missing files, missing thumbnail, drafts, ref', async () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { render: null, thumbnail: false })
    fx.put('episodes/001-pilot/public/audio/intro.mp3', 'x')
    const p = planBuild(ep(fx))
    assert.deepEqual(p.problems, [
      'intro: not rendered (no tele/intro.bin in episodes/001-pilot/public/ or dist/episodes/001-pilot/): npm run render -- 001-pilot intro',
      'outro: not rendered (no audio/outro.mp3 in episodes/001-pilot/public/ or dist/episodes/001-pilot/): npm run render -- 001-pilot outro',
      'outro: not rendered (no tele/outro.bin in episodes/001-pilot/public/ or dist/episodes/001-pilot/): npm run render -- 001-pilot outro',
      'no episodes/001-pilot/thumbnail.jpg: npm run thumbnail -- 001-pilot',
    ])
    await assert.rejects(buildEpisode(ep(fx), { bundle: fakeBundle }), (e) => e.code === 1 && /^cannot build 001-pilot:/.test(e.message))
    assert.equal(existsSync(join(fx.root, 'dist/episodes/001-pilot')), false)

    addEpisode(fx, '002-wip', { status: 'draft', render: 'public', thumbnail: false })
    fx.put('episodes/002-wip/segments/outro/index.js', 'export default {}\n')
    const { rmSync } = await import('node:fs')
    rmSync(join(fx.root, 'episodes/002-wip/segments/outro/cues.json'))
    await assert.rejects(buildEpisode(ep(fx, '2'), { bundle: fakeBundle }), (e) => e.code === 1 && /draft/.test(e.message) && /--preview/.test(e.message))
    assert.deepEqual(planBuild(ep(fx, '2'), { preview: true }).problems, ['outro: no episodes/002-wip/segments/outro/cues.json'])
    assert.throws(() => planBuild(resolveEpisode('ref', { root: fx.root })), /never built/)
  } finally {
    fx.cleanup()
  }
})

test('a preview build goes to preview/<id>/ and may lack a thumbnail', async () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '002-wip', { status: 'draft', thumbnail: false })
    const r = await buildEpisode(ep(fx, '2'), { preview: true, bundle: fakeBundle })
    assert.deepEqual(r.warnings, ['no thumbnail.jpg yet (npm run thumbnail -- 002-wip)'])
    assert.ok(existsSync(join(fx.root, 'preview/002-wip/index.html')))
    assert.equal(existsSync(join(fx.root, 'dist')), false)
  } finally {
    fx.cleanup()
  }
})
