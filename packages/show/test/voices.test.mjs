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
