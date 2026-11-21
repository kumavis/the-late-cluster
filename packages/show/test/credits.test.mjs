// The end roll's names (src/show/credits.js): `plays` folds a second voice into its character.
// Node builtins only; credits.js, roster.js and cast.js import nothing that needs an install.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { creditLines } from '../src/show/credits.js'
import { rosterCast } from '../src/roster.js'
import { CAST } from '../src/cast.js'

/** the credits as they were before `plays` existed, for comparison */
function before(cast, who = null) {
  const appears = ([id]) => !who || who.has(id)
  const list = Object.entries(cast).filter(appears)
  const out = [{ head: 'The Late Cluster' }, ['with', 'Larry Nx'], '']
  out.push({ head: 'Starring' })
  for (const [, c] of list) if (!c.guest) out.push([c.title ?? '', c.name])
  const guests = list.filter(([, c]) => c.guest)
  if (guests.length) {
    out.push('', { head: 'Puppets played the' }, { head: 'posting personas of' })
    for (const [, c] of guests) out.push(c.handle ? [c.name, c.handle] : ['', c.name])
  }
  out.push('', { head: 'Voices & faces' }, 'Every voice in this programme', 'is synthesized by CHIMERA.', '')
  out.push(['physical models', 'CHIMERA vocal synth'], ['by', 'jamesondh · MIT'], ['github.com', 'jamesondh/chimera-vocal-synth'], '')
  out.push('Guests are puppets', 'playing posting personas.', '', { head: 'Good night, Bluesky' })
  return out
}

const names = (lines) => lines.filter(Array.isArray).map((l) => l[1])

test('one character with two voices is credited once, whichever voice spoke', () => {
  const cast = rosterCast('002-x', CAST, { 'hy-bass': { name: 'Hy Oid', title: 'Bandleader, The Formants', plays: 'hy' } })
  const count = (lines) => names(lines).filter((n) => n === 'Hy Oid').length
  assert.equal(count(creditLines(cast)), 1)
  assert.equal(count(creditLines(cast, new Set(['larry', 'hy', 'hy-bass']))), 1)
  // only the second voice spoke: the character still appears
  assert.equal(count(creditLines(cast, new Set(['larry', 'hy-bass']))), 1)
  assert.equal(count(creditLines(cast, new Set(['larry']))), 0)
})

test('a plays naming an id that is not in the cast is credited normally', () => {
  const cast = rosterCast('002-x', CAST, { zed: { name: 'Zed', title: 'Stray', plays: 'nobody' } })
  assert.ok(names(creditLines(cast, new Set(['zed']))).includes('Zed'))
  assert.deepEqual(creditLines(cast, new Set(['zed', 'larry'])), before(cast, new Set(['zed', 'larry'])))
})

test('a cast without plays comes out as before, the first episode included', () => {
  for (const id of ['001-pilot', '002-x', 'ref']) {
    const cast = rosterCast(id, CAST)
    assert.ok(Object.values(cast).every((c) => !('plays' in c)), id)
    assert.deepEqual(creditLines(cast), before(cast), id)
    const who = new Set(Object.keys(cast).filter((_, i) => i % 2 === 0))
    assert.deepEqual(creditLines(cast, who), before(cast, who), id)
  }
})
