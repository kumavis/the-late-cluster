// The cards an episode may set aside (episode.json `plainCards`) and the credit lines it may add
// (`credits`): show/credits.js. Node builtins only; credits.js, roster.js and cast.js import
// nothing that needs an install. What the page draws is shot, not tested here (README, "Title,
// production and end cards").
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { creditLines, cardOptions, episodeCredits, wrapCredit, rollHeight, plainRoll } from '../src/show/credits.js'
import { rosterCast } from '../src/roster.js'
import { CAST } from '../src/cast.js'

const heads = (lines) => lines.filter((l) => l?.head).map((l) => l.head)
const EXTRA = [
  { head: 'Quoted', lines: ['A book, chapter 2 · translated by Someone, "Its Title", first published 1913'] },
  { head: 'Told from', lines: ['Another book: a story in it', 'A third book, chapter 9'] },
]
// an invented one-off who only sings: no handle, no guest flag
const BUSKER = { busker: { name: 'The busker', title: 'On the corner', body: { female: 0.25 } } }
const GUEST = { zed: { name: 'Zed Real', handle: 'zed.example', guest: true } }

test('off by default: an episode.json without the fields asks for the stock cards', () => {
  for (const ep of [{}, { id: '001-pilot', rundown: ['a'] }, null, undefined, { plainCards: 'yes' }, { plainCards: 1 }]) {
    assert.deepEqual(cardOptions(ep), { plain: false, extra: [] })
  }
  assert.equal(cardOptions({ plainCards: true }).plain, true)
  assert.equal(cardOptions({ plainCards: false }).plain, false)
})

test('the stock roll is unchanged when an episode asks for nothing', () => {
  for (const id of ['001-pilot', '002-x', 'ref']) {
    const cast = rosterCast(id, CAST, GUEST)
    const who = new Set(['larry', 'hy', 'zed'])
    for (const w of [null, who, new Set(['larry'])]) {
      const stock = creditLines(cast, w)
      assert.deepEqual(creditLines(cast, w, {}), stock, id)
      assert.deepEqual(creditLines(cast, w, cardOptions({})), stock, id)
      assert.deepEqual(heads(stock).slice(-1), ['Good night, Bluesky'])
      assert.ok(stock.includes('Guests are puppets'))
    }
  }
})

test('plain: no good-night heading, and the puppets line only when a guest appears', () => {
  const cast = rosterCast('003-x', CAST, { ...BUSKER, ...GUEST })
  const noGuest = creditLines(cast, new Set(['larry', 'sibyl', 'busker']), { plain: true })
  assert.ok(!heads(noGuest).some((h) => /good ?night/i.test(h)))
  assert.ok(!noGuest.flat().some((l) => typeof l === 'string' && /good ?night/i.test(l)))
  assert.ok(!noGuest.includes('Guests are puppets'))
  assert.ok(!heads(noGuest).includes('Puppets played the'))
  const withGuest = creditLines(cast, new Set(['larry', 'zed']), { plain: true })
  assert.ok(withGuest.includes('Guests are puppets'))
  assert.deepEqual(withGuest.find((l) => Array.isArray(l) && l[1] === 'zed.example'), ['Zed Real', 'zed.example'])
  assert.ok(!heads(withGuest).some((h) => /good ?night/i.test(h)))
})

test('plain keeps what Article 4 requires: the cast who appear, and that every voice is synthesized', () => {
  const cast = rosterCast('003-x', CAST, BUSKER)
  const lines = creditLines(cast, new Set(['larry', 'hy', 'busker']), { plain: true })
  const names = lines.filter(Array.isArray).map((l) => l[1])
  assert.ok(names.includes(CAST.larry.name) && names.includes(CAST.hy.name))
  assert.ok(!names.includes(CAST.sibyl.name), 'only who appears')
  assert.ok(lines.includes('Every voice in this programme') && lines.includes('is synthesized by CHIMERA.'))
  assert.ok(names.includes('CHIMERA vocal synth'))
})

test('an invented one-off is credited under the cast, never under the personas heading', () => {
  const cast = rosterCast('003-x', CAST, { ...BUSKER, ...GUEST })
  for (const plain of [false, true]) {
    const lines = creditLines(cast, new Set(['larry', 'busker', 'zed']), { plain })
    const at = (pred) => lines.findIndex(pred)
    const busker = at((l) => Array.isArray(l) && l[1] === 'The busker')
    assert.deepEqual(lines[busker], ['On the corner', 'The busker'])
    assert.ok(busker > at((l) => l?.head === 'Starring'))
    assert.ok(busker < at((l) => l?.head === 'Puppets played the'))
  }
})

test("an episode's own credits: each under its heading, after the cast, before the voices", () => {
  const cast = rosterCast('003-x', CAST, BUSKER)
  for (const plain of [false, true]) {
    const lines = creditLines(cast, new Set(['larry', 'busker']), { plain, extra: episodeCredits(EXTRA) })
    const i = (x) => lines.findIndex((l) => (typeof x === 'string' ? l === x : l?.head === x.head))
    assert.ok(i({ head: 'Starring' }) < i({ head: 'Quoted' }))
    assert.equal(lines[i({ head: 'Quoted' }) + 1], EXTRA[0].lines[0])
    assert.deepEqual(lines.slice(i({ head: 'Told from' }) + 1, i({ head: 'Told from' }) + 3), EXTRA[1].lines)
    assert.ok(i({ head: 'Told from' }) < i({ head: 'Voices & faces' }))
  }
})

test('malformed episode credits are left out', () => {
  assert.deepEqual(episodeCredits(undefined), [])
  assert.deepEqual(episodeCredits('Quoted'), [])
  assert.deepEqual(episodeCredits([{ head: '', lines: ['x'] }, { head: 'A', lines: [] }, { head: 'B' }, null]), [])
  assert.deepEqual(episodeCredits([{ head: 'A', lines: ['x', '', 3] }]), [{ head: 'A', lines: ['x'] }])
})

test('a long credit line wraps at spaces without changing a character', () => {
  const s = EXTRA[0].lines[0]
  for (const w of [20, 40, 60, 200]) {
    const fits = (x) => x.length <= w
    const out = wrapCredit(s, fits)
    assert.equal(out.join(' '), s, `width ${w}`)
    assert.ok(out.every((l) => !l.startsWith('·')), `width ${w}: a piece starts with ·`)
    assert.ok(out.every((l) => fits(l) || !l.includes(' ')), `width ${w}: a piece is too wide`)
  }
  // the break goes after a comma or a ' · ' where the line has one
  assert.deepEqual(wrapCredit(s, (x) => x.length <= 60), ['A book, chapter 2 · translated by Someone, "Its Title",', 'first published 1913'])
  assert.deepEqual(wrapCredit(s, (x) => x.length <= 30), ['A book, chapter 2 ·', 'translated by Someone,', '"Its Title",', 'first published 1913'])
  // with no comma or ' · ' to break after, the last space that fits
  assert.deepEqual(wrapCredit('one two three four', (x) => x.length <= 9), ['one two', 'three', 'four'])
  assert.deepEqual(wrapCredit('short', () => true), ['short'])
  assert.deepEqual(wrapCredit('unbreakable', () => false), ['unbreakable'])
})

test('the plain roll is done in its seconds, and every line stays up to be read', () => {
  // as builtins.js PLAIN_ROLL (which needs a browser to import)
  const roll = { h: 540, scale: 1.3, delay: 1, tail: 1, seconds: 20, minUp: 4 }
  const cast = rosterCast('003-x', CAST, { ...BUSKER, ...GUEST })
  const up = (t) => roll.h / t.speed
  const done = (height, t) => roll.delay + (height + roll.h) / t.speed + roll.tail
  // a roll like episode three's: exactly the seconds, each line up for well over the minimum
  const short = creditLines(cast, new Set(['larry', 'hy', 'busker']), { plain: true, extra: episodeCredits(EXTRA) })
  const hs = rollHeight(short, 34 * roll.scale)
  const ts = plainRoll(hs, roll)
  assert.equal(ts.seconds, 20)
  assert.ok(Math.abs(done(hs, ts) - 20) < 1e-9)
  assert.ok(up(ts) > roll.minUp)
  // a much longer roll keeps the minimum and takes longer, never shorter
  const long = creditLines(cast, null, { plain: true, extra: episodeCredits([...EXTRA, ...EXTRA, ...EXTRA, ...EXTRA]) })
  const hl = rollHeight(long, 34 * roll.scale)
  const tl = plainRoll(hl, roll)
  assert.ok(Math.abs(up(tl) - roll.minUp) < 1e-9)
  assert.ok(tl.seconds > 20 && Math.abs(done(hl, tl) - tl.seconds) < 1e-9)
  assert.equal(rollHeight([{ head: 'A' }, 'b', ['c', 'd']]), 51 + 34 + 34)
})
