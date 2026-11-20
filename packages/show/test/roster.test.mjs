// The roster resolver (src/roster.js): the first episode's legacy cast exists for 001-pilot only.
// Node builtins only; src/roster.js, src/cast.js and src/legacy/ import nothing that needs an install.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rosterCast, legacyFor, applyRoster } from '../src/roster.js'
import { CAST } from '../src/cast.js'

const LEGACY_IDS = ['bot', 'norvid', 'abel', 'samantha', 'borjev']
const HOUSE = ['larry', 'sibyl', 'hy', 'al', 'dee', 'pete', 'eppy']

test('the house cast is the house, with no bot and no legacy guest', () => {
  assert.deepEqual(Object.keys(CAST), HOUSE)
})

test('001-pilot resolves the legacy ids after the house, in their old order', () => {
  const cast = rosterCast('001-pilot', CAST)
  assert.deepEqual(Object.keys(cast), [...HOUSE, ...LEGACY_IDS])
  assert.equal(cast.bot.name, 'A website bot')
  assert.equal(cast.bot.title, 'Builds it')
  assert.equal(cast.bot.guest, undefined)
  for (const id of LEGACY_IDS.slice(1)) assert.equal(cast[id].guest, true, id)
  assert.deepEqual(Object.keys(legacyFor('001-pilot').looks), LEGACY_IDS)
  assert.deepEqual(legacyFor('001-pilot').house, ['bot'])
})

test('any other episode id has none of the legacy ids, bot included', () => {
  for (const id of ['ref', '002-anything', '1', '001', 'pilot', '', 'constructor', '__proto__']) {
    const cast = rosterCast(id, CAST)
    assert.deepEqual(Object.keys(cast), HOUSE, id)
    for (const k of LEGACY_IDS) assert.equal(k in cast, false, `${id}: ${k}`)
    assert.deepEqual(Object.keys(legacyFor(id).looks), [], id)
    assert.deepEqual([...legacyFor(id).house], [], id)
  }
})

test("an episode's own entries come last and replace whole entries", () => {
  const own = { bot: { name: 'Their bot', title: 'x' }, zed: { name: 'Zed' } }
  const other = rosterCast('002-x', CAST, own)
  assert.deepEqual(Object.keys(other), [...HOUSE, 'bot', 'zed'])
  assert.deepEqual(other.bot, own.bot)
  assert.deepEqual(rosterCast('001-pilot', CAST, own).bot, own.bot)
})

test('applyRoster mutates the given singletons: legacy looks via look(), own looks via defineLook()', () => {
  const studio = () => {
    const s = { CAST: { ...CAST }, LOOKS: {}, HOUSE_IDS: [...HOUSE], defined: [] }
    s.look = (color, costume, extra = {}) => ({ color, costume, ...extra })
    s.defineLook = (id, spec) => s.defined.push(id) && (s.LOOKS[id] = spec)
    return s
  }
  const pilot = studio()
  applyRoster('001-pilot', { cast: {}, looks: {} }, pilot)
  assert.deepEqual(Object.keys(pilot.CAST), [...HOUSE, ...LEGACY_IDS])
  assert.deepEqual(Object.keys(pilot.LOOKS), LEGACY_IDS)
  assert.equal(pilot.LOOKS.bot.costume.model, 'WEBSITE-BOT')
  assert.deepEqual(pilot.HOUSE_IDS, [...HOUSE, 'bot'])

  const other = studio()
  applyRoster('ref', { cast: { zed: { name: 'Zed' } }, looks: { zed: { color: '#fff' } } }, other)
  assert.deepEqual(Object.keys(other.CAST), [...HOUSE, 'zed'])
  assert.deepEqual(Object.keys(other.LOOKS), ['zed'])
  assert.deepEqual(other.defined, ['zed'])
  assert.deepEqual(other.HOUSE_IDS, HOUSE)
})

test("the studio's drawn text: neutral by default, the first episode's for 001-pilot only", async () => {
  const { STAGE_DEFAULTS } = await import('../src/stage/text.js')
  const { rosterStage } = await import('../src/roster.js')
  assert.deepEqual(rosterStage('001-pilot', STAGE_DEFAULTS), { counterLabel: 'BUILT DURING THIS EPISODE', keyLabel: 'E' })
  for (const id of ['ref', '002-anything', '001', 'pilot', '__proto__']) assert.deepEqual(rosterStage(id, STAGE_DEFAULTS), { ...STAGE_DEFAULTS }, id)
  assert.notEqual(STAGE_DEFAULTS.counterLabel, 'BUILT DURING THIS EPISODE')
  assert.notEqual(STAGE_DEFAULTS.keyLabel, 'E')
  const text = { ...STAGE_DEFAULTS }
  applyRoster('001-pilot', { cast: {}, looks: {} }, { CAST: { ...CAST }, LOOKS: {}, look: () => ({}), defineLook: () => {}, STAGE_TEXT: text })
  assert.equal(text.counterLabel, 'BUILT DURING THIS EPISODE')
  assert.equal(text.keyLabel, 'E')
  const other = { ...STAGE_DEFAULTS }
  applyRoster('002-x', { cast: {}, looks: {} }, { CAST: { ...CAST }, LOOKS: {}, look: () => ({}), defineLook: () => {}, STAGE_TEXT: other })
  assert.deepEqual(other, { ...STAGE_DEFAULTS })
})
