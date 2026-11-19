import assert from 'node:assert/strict'
import { join } from 'node:path'
import { test } from 'node:test'
import { checkManifest, compareEpisodes, isIsoDate, readEpisodes } from '../src/manifests.mjs'
import { FIXTURES, makeEpisodes, tempDir } from './helpers.mjs'

test('isIsoDate accepts real calendar dates only', () => {
  assert.ok(isIsoDate('2026-11-13'))
  assert.ok(isIsoDate('2028-02-29'))
  for (const bad of ['2026-02-30', '2026-13-01', '2026-1-1', '13/11/2026', '', 20261113, null]) assert.equal(isIsoDate(bad), false, String(bad))
})

test('sorts newest first by number, then air date, then id', () => {
  const eps = [
    { id: '002-b', number: 2, airDate: '2026-11-20' },
    { id: '010-j', number: 10, airDate: '2027-01-15' },
    { id: '009-i', number: 9, airDate: '2027-01-08' },
    { id: '002-a', number: 2, airDate: '2026-11-20' },
    { id: '002-c', number: 2, airDate: '2026-11-27' },
  ]
  assert.deepEqual(eps.sort(compareEpisodes).map((e) => e.id), ['010-j', '009-i', '002-c', '002-a', '002-b'])
})

test('mixed fixture: lists the good episodes, skips drafts quietly and broken ones with a warning', async () => {
  const { episodes, drafts, warnings } = await readEpisodes(join(FIXTURES, 'mixed'))
  assert.deepEqual(episodes.map((e) => e.id), ['010-ten', '002-hostile', '001-first'])
  assert.deepEqual(drafts, ['003-draft'])
  const about = (id) => warnings.filter((w) => w.includes(id))
  assert.match(about('004-broken').join(), /not valid JSON/)
  assert.match(about('005-no-title').join(), /title/)
  assert.match(about('006-wrong-folder').join(), /does not match its folder/)
  assert.match(about('007-no-build').join(), /no index\.html/)
  assert.match(about('008-bad-date').join(), /airDate/)
  assert.match(about('episodes/notes').join(), /no readable episode\.json/)
  assert.match(about('001-first').join(), /placeholder/)
  assert.equal(about('003-draft').length, 0, 'drafts are not warnings')
  assert.equal(episodes.find((e) => e.id === '010-ten').hasThumbnail, true)
  assert.equal(episodes.find((e) => e.id === '001-first').hasThumbnail, false)
})

test('a missing episodes directory is an empty archive, not a crash', async (t) => {
  const r = await readEpisodes(await tempDir(t))
  assert.deepEqual(r.episodes, [])
  assert.match(r.warnings[0], /archive will be empty/)
})

test('checkManifest rejects wrong types and keeps optional fields optional', () => {
  const ok = { id: '001-pilot', number: 1, title: ' Pilot ', airDate: '2026-11-13', status: 'published' }
  assert.deepEqual(checkManifest(ok, '001-pilot').episode, { id: '001-pilot', number: 1, title: 'Pilot', description: '', airDate: '2026-11-13' })
  assert.match(checkManifest([], 'x').error, /object/)
  assert.match(checkManifest({ ...ok, status: 'live' }, '001-pilot').error, /status/)
  assert.match(checkManifest({ ...ok, number: '1' }, '001-pilot').error, /number/)
  assert.match(checkManifest({ ...ok, id: '../evil' }, '../evil').error, /NNN-slug/)
  assert.match(checkManifest({ ...ok, number: 2 }, '001-pilot').warnings[0], /does not match id/)
  assert.match(checkManifest({ ...ok, description: 5 }, '001-pilot').warnings[0], /description/)
})

test('sixty episodes come back in order', async (t) => {
  const dir = await tempDir(t)
  await makeEpisodes(dir, 60)
  const { episodes, warnings } = await readEpisodes(dir)
  assert.deepEqual(warnings, [])
  assert.equal(episodes.length, 60)
  assert.deepEqual(episodes.map((e) => e.number), Array.from({ length: 60 }, (_, i) => 60 - i))
})
