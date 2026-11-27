import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { resolveId, resolveEpisode, requireSegment, EpisodeError, REPO } from '../lib/episodes.mjs'
import { tempRoot, addEpisode } from './fixture.mjs'

test('episode ids: 1, 001, 001-pilot and ref', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot')
    addEpisode(fx, '012-later-on')
    for (const a of ['1', '001', '01', '001-pilot']) assert.equal(resolveId(a, fx.root), '001-pilot')
    for (const a of ['12', '012', '012-later-on']) assert.equal(resolveId(a, fx.root), '012-later-on')
    assert.equal(resolveId('ref', fx.root), 'ref')
    assert.throws(() => resolveId('2', fx.root), (e) => e instanceof EpisodeError && e.code === 2 && /unknown episode: 2/.test(e.message))
    assert.throws(() => resolveId('001-other', fx.root), /unknown episode/)
    assert.throws(() => resolveId('pilot', fx.root), /not an episode/)
    assert.throws(() => resolveId('', fx.root), /no episode given/)
  } finally {
    fx.cleanup()
  }
})

test('two folders with one number are ambiguous', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '003-a')
    addEpisode(fx, '003-b')
    assert.throws(() => resolveId('3', fx.root), /ambiguous/)
    assert.equal(resolveId('003-b', fx.root), '003-b')
  } finally {
    fx.cleanup()
  }
})

test('the episode folder and episode.json id must agree', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '004-x')
    fx.put('episodes/004-x/episode.json', JSON.stringify({ id: '004-y', status: 'draft', rundown: [] }))
    assert.throws(() => resolveEpisode('4', { root: fx.root }), /id is "004-y"/)
    fx.put('episodes/004-x/episode.json', JSON.stringify({ id: '004-x', status: 'live', rundown: [] }))
    assert.throws(() => resolveEpisode('4', { root: fx.root }), /status must be/)
  } finally {
    fx.cleanup()
  }
})

test('plainCards and credits: absent is fine; present, they must be well formed', () => {
  const fx = tempRoot()
  const write = (extra) => fx.put('episodes/004-x/episode.json', JSON.stringify({ id: '004-x', status: 'draft', rundown: ['a'], ...extra }))
  try {
    write({})
    assert.equal('plainCards' in resolveEpisode('4', { root: fx.root }).meta, false)
    const credits = [{ head: 'Quoted', lines: ['A book, chapter 2'] }, { head: 'Told from', lines: ['One', 'Two'] }]
    write({ plainCards: true, credits })
    const meta = resolveEpisode('4', { root: fx.root }).meta
    assert.equal(meta.plainCards, true)
    assert.deepEqual(meta.credits, credits)
    write({ plainCards: false })
    assert.equal(resolveEpisode('4', { root: fx.root }).meta.plainCards, false)
    for (const bad of [{ plainCards: 'true' }, { plainCards: 1 }]) {
      write(bad)
      assert.throws(() => resolveEpisode('4', { root: fx.root }), /plainCards must be true or false/)
    }
    for (const bad of [{ credits: {} }, { credits: [{ head: 'A' }] }, { credits: [{ head: '', lines: ['x'] }] }, { credits: [{ head: 'A', lines: [] }] }, { credits: [{ head: 'A', lines: ['x', 2] }] }]) {
      write(bad)
      assert.throws(() => resolveEpisode('4', { root: fx.root }), /credits must be a list/)
    }
  } finally {
    fx.cleanup()
  }
})

test('rendered assets: public/ first, then the committed build', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { render: 'dist' })
    const ep = resolveEpisode('1', { root: fx.root })
    assert.deepEqual(ep.findAsset('audio/intro.mp3'), { path: join(fx.root, 'dist/episodes/001-pilot/audio/intro.mp3'), from: 'dist' })
    fx.put('episodes/001-pilot/public/audio/intro.mp3', 'fresh')
    assert.equal(ep.findAsset('audio/intro.mp3').from, 'public')
    assert.equal(ep.asset('audio/nope.mp3'), null)
    assert.equal(ep.asset('../../etc/passwd'), null)
    assert.equal(ep.renderPath('tele/intro.bin'), join(fx.root, 'episodes/001-pilot/public/tele/intro.bin'))
  } finally {
    fx.cleanup()
  }
})

test('the reference episode lives in the studio and has no build', () => {
  const ep = resolveEpisode('ref')
  assert.equal(ep.dir, join(REPO, 'packages/show/reference'))
  assert.equal(ep.distDir, null)
  assert.ok(ep.rundown.includes('demo'))
})

test('unknown segments are an error', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot')
    const ep = resolveEpisode('1', { root: fx.root })
    assert.equal(requireSegment(ep, 'intro'), 'intro')
    assert.throws(() => requireSegment(ep, 'nope'), /unknown segment: nope in 001-pilot \(segments: intro, outro\)/)
    assert.throws(() => requireSegment(ep, 'Bad Id'), /not a segment id/)
  } finally {
    fx.cleanup()
  }
})
