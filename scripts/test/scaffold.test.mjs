import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { newEpisode, newSegment, slugify, fridayOfWeek, formatEpisodeJson } from '../lib/scaffold.mjs'
import { resolveEpisode, REPO } from '../lib/episodes.mjs'
import { tempRoot, addEpisode } from './fixture.mjs'

test('slugs and ISO weeks', () => {
  assert.equal(slugify('Built It, Again!'), 'built-it-again')
  assert.equal(slugify('Café  Crème'), 'cafe-creme')
  assert.equal(fridayOfWeek('2026-W46'), '2026-11-13')
  assert.equal(fridayOfWeek('2026-W01'), '2026-01-02')
  assert.equal(fridayOfWeek('2027-W01'), '2027-01-08')
  assert.throws(() => fridayOfWeek('2026-47'), /not an ISO week/)
})

test('episode.json keeps the repository format', () => {
  const file = join(REPO, 'episodes/001-pilot/episode.json')
  const text = readFileSync(file, 'utf8')
  assert.equal(formatEpisodeJson(JSON.parse(text)), text)
})

test('episode:new makes the next numbered draft', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot')
    addEpisode(fx, '004-skipped')
    const { id, dir } = newEpisode({ title: 'Built It, Again!', week: '2026-W47', root: fx.root })
    assert.equal(id, '005-built-it-again')
    const meta = JSON.parse(readFileSync(join(dir, 'episode.json'), 'utf8'))
    assert.deepEqual(meta, { id, number: 5, slug: 'built-it-again', title: 'Built It, Again!', description: '', airDate: '2026-11-20', week: '2026-W47', status: 'draft', rundown: [] })
    assert.ok(existsSync(join(dir, 'segments')))
    assert.equal(resolveEpisode('5', { root: fx.root }).id, id)
    const second = newEpisode({ title: 'No week', date: '2026-12-04', root: fx.root })
    assert.equal(second.id, '006-no-week')
    assert.equal(second.meta.week, undefined)
    assert.throws(() => newEpisode({ title: '', root: fx.root }), /usage/)
    assert.throws(() => newEpisode({ title: '!!!', root: fx.root }), /cannot make a slug/)
    assert.throws(() => newEpisode({ title: 'x', week: 'soon', root: fx.root }), /not an ISO week/)
  } finally {
    fx.cleanup()
  }
})

test('the first episode in an empty repository is 001', () => {
  const fx = tempRoot()
  try {
    assert.equal(newEpisode({ title: 'Pilot', root: fx.root }).id, '001-pilot')
  } finally {
    fx.cleanup()
  }
})

test('segment:new adds a skeleton and appends it to the rundown', () => {
  const fx = tempRoot()
  try {
    const { id } = newEpisode({ title: 'Next', root: fx.root })
    const a = newSegment({ episode: '1', seg: 'cold-open', root: fx.root })
    newSegment({ episode: id, seg: 'desk-piece', root: fx.root })
    const ep = resolveEpisode('1', { root: fx.root })
    assert.deepEqual(ep.rundown, ['cold-open', 'desk-piece'])
    const script = readFileSync(join(a.dir, 'script.js'), 'utf8')
    assert.match(script, /id: 'cold-open'/)
    assert.match(script, /title: 'Cold Open'/)
    assert.match(script, /npm run render -- 1 cold-open/)
    assert.doesNotMatch(script + readFileSync(join(a.dir, 'index.js'), 'utf8'), /__[A-Z]+__/)
    assert.throws(() => newSegment({ episode: '1', seg: 'cold-open', root: fx.root }), (e) => e.code === 1 && /already exists/.test(e.message))
    assert.throws(() => newSegment({ episode: '1', seg: 'Cold Open', root: fx.root }), /not a segment id/)
    assert.throws(() => newSegment({ episode: '1', seg: 'title', root: fx.root }), /reserved/)
    assert.throws(() => newSegment({ episode: '9', seg: 'x', root: fx.root }), /unknown episode: 9/)
  } finally {
    fx.cleanup()
  }
})

test('segment:new refuses a published episode unless forced', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot')
    assert.throws(() => newSegment({ episode: '1', seg: 'extra', root: fx.root }), (e) => e.code === 1 && /published/.test(e.message))
    newSegment({ episode: '1', seg: 'extra', force: true, root: fx.root })
    assert.deepEqual(resolveEpisode('1', { root: fx.root }).rundown, ['intro', 'outro', 'extra'])
  } finally {
    fx.cleanup()
  }
})
