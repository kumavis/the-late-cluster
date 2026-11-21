// Voice assignment (tools/voices-lib.mjs): distance, rules, and placing guests apart from the house
// and from each other. Node builtins only.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { distance, nearest, parseRule, allowed, assign, slotGrid, MIN_DISTANCE } from '../tools/voices-lib.mjs'

const flat = (f0, tilt = 0) => ({ f0, ltas: [tilt, 0, -tilt] })
const st = (a, b) => Math.abs(12 * Math.log2(a / b))

test('distance is pitch semitones over 2 and spectrum dB over 2.5', () => {
  assert.equal(distance(flat(100), flat(100)), 0)
  assert.ok(Math.abs(distance(flat(100), flat(200)) - 6) < 1e-9)
  assert.ok(Math.abs(distance(flat(100), { f0: 100, ltas: [2.5, 2.5, 2.5] }) - 1) < 1e-9)
  assert.deepEqual(nearest(flat(100), [{ id: 'a', feat: flat(300) }, { id: 'b', feat: flat(110) }]).id, 'b')
  assert.equal(nearest(flat(100), []), null)
})

test('rules parse and constrain', () => {
  assert.deepEqual(parseRule('amber:not-lowest'), { id: 'amber', rule: 'not-lowest' })
  assert.deepEqual(parseRule('dave:below:120'), { id: 'dave', rule: 'below', hz: 120 })
  assert.throws(() => parseRule('dave:below'))
  assert.throws(() => parseRule('dave:loud'))
  assert.equal(allowed(80, [{ rule: 'not-lowest' }], [90, 200]), false)
  assert.equal(allowed(95, [{ rule: 'not-lowest' }], [90, 200]), true)
  assert.equal(allowed(250, [{ rule: 'not-highest' }], [90, 200]), false)
  assert.equal(allowed(130, [{ rule: 'below', hz: 120 }], []), false)
})

const house = [80, 107, 119, 143, 159, 189, 207].map((f0, i) => ({ id: `h${i}`, feat: flat(f0) }))
// slots: pitches, each with a bright and a dark spectrum (5 dB of tilt: 1.63 from a flat voice at the same pitch)
const slots = [88, 96, 172, 176, 222, 240, 262, 276].flatMap((f0) => [5, -5].map((t) => ({ key: `${f0}/${t}`, f0, feat: flat(f0, t) })))

test('a guest already distinct keeps its voice; one too close is moved; two guests do not collide', () => {
  const r = assign({ house, guests: [{ id: 'far', feat: flat(262) }, { id: 'close', feat: flat(110) }, { id: 'twin', feat: flat(263) }], slots })
  assert.equal(r[0].keep, true)
  assert.equal(r[1].keep, false)
  assert.equal(r[2].keep, false, 'the second of two near-identical guests moves')
  for (const x of r) assert.ok(x.nearest.distance >= MIN_DISTANCE, `${x.id} ${x.feat.f0}: nearest ${x.nearest.id} ${x.nearest.distance}`)
  // a moved guest stays near its old pitch among the slots that clear the bar
  assert.ok(st(r[1].feat.f0, 110) <= st(96, 110) + 1e-9, String(r[1].feat.f0))
})

test('rules: not the lowest voice, keep, new', () => {
  const r = assign({ house, guests: [{ id: 'amber', feat: null }], slots, rules: { amber: [{ rule: 'not-lowest' }] } })
  assert.ok(r[0].feat.f0 > 80)
  const lowest = assign({ house: house.slice(1), guests: [{ id: 'x', feat: flat(60) }], slots, rules: { x: [{ rule: 'not-lowest' }] } })
  assert.equal(lowest[0].keep, false, 'a kept voice that breaks its rule is moved')
  const kept = assign({ house, guests: [{ id: 'x', feat: flat(108) }], slots, rules: { x: [{ rule: 'keep' }] } })
  assert.equal(kept[0].keep, true)
  const moved = assign({ house, guests: [{ id: 'x', feat: flat(262) }], slots, rules: { x: [{ rule: 'new' }] } })
  assert.equal(moved[0].keep, false)
})

test('the slot grid stays inside the engine’s safe pitches', () => {
  const g = slotGrid()
  assert.ok(g.length > 40)
  for (const s of g) assert.ok(s.f0 >= 85 && s.f0 <= 280 && s.body.child <= 0.4, s.key)
  assert.equal(new Set(g.map((s) => s.key)).size, g.length)
})

// The pronoun steer (config/voices.json, the owner's ruling of 21 November 2026), on invented guests.
import { steerRules, guestPronouns, pronounText } from '../tools/voices-lib.mjs'
import { readFileSync } from 'node:fs'
const STEER = JSON.parse(readFileSync(new URL('../config/voices.json', import.meta.url), 'utf8')).pronounSteer

test('pronoun steer: she without he keeps out of the lowest band, he without she out of the highest; anyone else is free', () => {
  assert.deepEqual(steerRules({ text: 'she/her', forms: ['she'] }, STEER), [{ rule: 'above', hz: STEER.lowestBandBelowHz }])
  assert.deepEqual(steerRules({ text: 'he/him', forms: ['he'] }, STEER), [{ rule: 'below', hz: STEER.highestBandAboveHz }])
  for (const p of [{ text: 'they/them', forms: ['they'] }, { text: 'she/he', forms: ['she', 'he'] }, { text: 'any pronouns', forms: ['any'] }, { text: 'xe/xem', forms: ['xe'] }, null]) assert.deepEqual(steerRules(p, STEER), [], JSON.stringify(p))
  assert.deepEqual(steerRules({ text: 'she/they', forms: ['she', 'they'] }, STEER).length, 1, 'she/they without he is steered')
  assert.deepEqual(steerRules({ forms: ['she'] }, { ...STEER, enabled: false }), [])
})

test('pronoun steer: learned from the sources record and the digest, never the cast entry; none without a record', () => {
  const authors = { 'did:plc:a': { handle: 'a.example.test', pronouns: { text: 'she/her', forms: ['she'] } }, 'did:plc:b': { handle: 'b.example.test', pronouns: null } }
  const m = guestPronouns([{ accounts: [{ handle: 'a.example.test', did: 'did:plc:a', role: 'guest', cast: 'ga' }, { handle: 'b.example.test', role: 'guest', cast: 'gb' }] }], authors)
  assert.equal(pronounText(m.get('ga')), 'she/her')
  assert.equal(pronounText(m.get('gb')), 'none stated')
  assert.equal(pronounText(m.get('gc')), 'no source record')
})

test('pronoun steer: applied as a preference; distinctness first; a hand rule wins; the unmet case is reported', () => {
  const lo = [{ rule: 'above', hz: 120 }]
  const hi = [{ rule: 'below', hz: 220 }]
  // a she/her guest whose voice is low and distinct moves up to a slot that is distinct and meets it
  const a = assign({ house, guests: [{ id: 'g', feat: flat(88, 20) }], slots, prefer: { g: lo } })[0]
  assert.ok(a.feat.f0 > 120 && a.steer.met, JSON.stringify(a))
  assert.ok(a.nearest.distance >= MIN_DISTANCE)
  // a he/him guest is kept out of the highest band
  const b = assign({ house, guests: [{ id: 'g', feat: flat(262) }], slots, prefer: { g: hi } })[0]
  assert.ok(b.feat.f0 < 220 && b.steer.met, JSON.stringify(b))
  // they/them or none stated: no preference, the old behaviour
  const c = assign({ house, guests: [{ id: 'g', feat: flat(262) }], slots })[0]
  assert.equal(c.keep, true)
  assert.equal(c.steer, undefined)
  // a hand rule wins: no steer at all
  const d = assign({ house, guests: [{ id: 'g', feat: flat(88, 20) }], slots, rules: { g: [{ id: 'g', rule: 'keep' }] }, prefer: { g: lo } })[0]
  assert.equal(d.keep, true)
  assert.equal(d.steer, undefined)
  // unmet: every slot above 120 Hz taken by distinctness; the guest is placed anyway, reported unmet
  const lowOnly = slots.filter((s) => s.f0 < 120)
  const e = assign({ house, guests: [{ id: 'g', feat: flat(110) }], slots: lowOnly, prefer: { g: lo } })[0]
  assert.equal(e.steer.met, false)
  assert.ok(e.feat.f0 < 120)
})

// A writer's guest entry ({ name, handle, title, guest: true }, no voice settings): found, placed
// fresh with the steer, and written. Invented guests on .example handles.
import { castGuests, writeVoice } from '../tools/voices-lib.mjs'

test('a guest: true entry with no body is a guest to place; one with neither is skipped; house ids are skipped', () => {
  const own = {
    larry: { name: 'House', body: { female: 0, child: 0 }, f0: 100 },
    nova: { name: 'Nova', handle: '@nova.example', title: 'Posted it', guest: true },
    olde: { name: 'Olde', handle: '@olde.example', title: 'Voiced', guest: true, body: { female: 1, child: 0 }, f0: 225 },
    prop: { name: 'A prop', handle: '@prop.example', title: 'Not a guest' },
  }
  assert.deepEqual(castGuests(own, ['larry']).map((g) => [g.id, g.voiced]), [['nova', false], ['olde', true]])
})

test('a guest with no voice is placed fresh: clears the bar, spreads with the most room, and takes the steer', () => {
  const lo = [{ rule: 'above', hz: 120 }]
  const hi = [{ rule: 'below', hz: 220 }]
  const r = assign({ house, guests: [{ id: 'she', feat: null }, { id: 'he', feat: null }, { id: 'free', feat: null }], slots, prefer: { she: lo, he: hi } })
  for (const x of r) {
    assert.equal(x.keep, false)
    assert.ok(x.nearest.distance >= MIN_DISTANCE, `${x.id} ${x.feat.f0}: nearest ${x.nearest.distance}`)
  }
  assert.ok(r[0].feat.f0 > 120 && r[0].steer.met, JSON.stringify(r[0]))
  assert.ok(r[1].feat.f0 < 220 && r[1].steer.met, JSON.stringify(r[1]))
  assert.equal(r[2].steer, undefined, 'none stated: no steer')
  assert.equal(new Set(r.map((x) => x.slot.key)).size, 3)
  // with no steer, the slot with the most room: a lone fresh guest takes a pitch at the edge of the range, not the middle
  const lone = assign({ house, guests: [{ id: 'x', feat: null }], slots })[0]
  assert.ok(lone.feat.f0 <= 96 || lone.feat.f0 >= 240, String(lone.feat.f0))
  // the steer still keeps a she/her guest out of the low band even when the low edge has the most room
  const shel = assign({ house, guests: [{ id: 'x', feat: null }], slots: slots.filter((s) => s.f0 < 100 || s.f0 === 172), prefer: { x: lo } })[0]
  assert.ok(shel.feat.f0 > 120, String(shel.feat.f0))
  const hel = assign({ house, guests: [{ id: 'x', feat: null }], slots: slots.filter((s) => s.f0 > 230 || s.f0 === 96), prefer: { x: hi } })[0]
  assert.ok(hel.feat.f0 < 220, String(hel.feat.f0))
})

test('writeVoice: an entry with no voice keys, on one line or several, gets body, f0 and source; the rest stays', async () => {
  const v = { body: { female: 0.5, child: 0 }, f0: 205, source: { tension: 0.62, brightness: 0.5 } }
  const src = [
    '// Guests of an invented draft. No voice settings: a sound editor places the voices.',
    'export const CAST = {',
    "  nova: { name: \"Nova 🌸\", handle: \"@nova.example\", title: 'Posted it, once', guest: true }, // one line",
    '  wren: {',
    "    name: 'Wren', // the account's display name",
    "    handle: '@wren.example',",
    "    title: 'Replied',",
    '    guest: true,',
    '  },',
    "  olde: { name: 'Olde', handle: '@olde.example', title: 'Voiced', guest: true, body: { female: 1, child: 0 }, f0: 225, rate: 1.1, accent: 0.3, source: { tension: 0.5 } },",
    '}',
    '',
  ].join('\n')
  let out = writeVoice(src, 'nova', v)
  out = writeVoice(out, 'wren', v)
  out = writeVoice(out, 'olde', v)
  const lines = out.split('\n')
  assert.equal(lines[0], src.split('\n')[0])
  assert.equal(lines[2], "  nova: { name: \"Nova 🌸\", handle: \"@nova.example\", title: 'Posted it, once', body: { female: 0.5, child: 0 }, f0: 205, source: { tension: 0.62, brightness: 0.5 }, guest: true }, // one line")
  assert.ok(out.includes("    name: 'Wren', // the account's display name\n"))
  assert.ok(out.includes("    title: 'Replied', body: { female: 0.5, child: 0 }, f0: 205, source: { tension: 0.62, brightness: 0.5 },\n    guest: true,\n"))
  assert.ok(out.includes("title: 'Voiced', guest: true, body: { female: 0.5, child: 0 }, f0: 205, rate: 1.1, accent: 0.3, source: { tension: 0.62, brightness: 0.5 } },"))
  const { CAST } = await import('data:text/javascript,' + encodeURIComponent(out))
  for (const id of ['nova', 'wren', 'olde']) {
    assert.deepEqual([CAST[id].body, CAST[id].f0, CAST[id].source], [v.body, v.f0, v.source], id)
    assert.equal(CAST[id].guest, true)
  }
  assert.deepEqual([CAST.nova.name, CAST.nova.handle, CAST.nova.title], ['Nova 🌸', '@nova.example', 'Posted it, once'])
  assert.deepEqual([CAST.olde.rate, CAST.olde.accent], [1.1, 0.3])
  assert.throws(() => writeVoice(src, 'nobody', v))
})
