// The caption bar's arithmetic (src/stage/caption-layout.js): scale 1 is the bar as it always was,
// a larger bar keeps its bottom edge, stays in the frame, and pages long lines through more pairs.
// Node builtins only.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CAP, LAUGH, parseCaptionScale, wrapWidth, breakLines, pageStart, pairCount, captionBox, laughBox, barRect, laughRect, overlaps, scaleCandidates, largestClear, clearsAll, chyronTop, captionKey, planFromSamples, CLEAR_MARGIN } from '../src/stage/caption-layout.js'

/** the bar exactly as chrome.js computed it before the scale existed */
function before(rows, maxw, nameW, lift) {
  const lh = CAP.size * 1.32
  const bw = Math.max(maxw, nameW) + 56
  const bh = rows * lh + 40
  const bx = 640 - bw / 2, by = CAP.y - bh + 30 - lift
  return { lh, bw, bh, bx, by, row: (k) => by + 30 + k * lh + CAP.size * 0.55 }
}

test('at scale 1 every number is the old one, exactly', () => {
  for (const [rows, maxw, nameW, lift] of [[1, 412.7, 61.3, 0], [2, 999.9, 80, 34], [2, 120, 300, 46], [1, 3.3, 0, 17.21]]) {
    const a = captionBox(rows, maxw, nameW, lift, 1)
    const b = before(rows, maxw, nameW, lift)
    for (const k of ['lh', 'bw', 'bh', 'bx', 'by']) assert.equal(a[k], b[k], k)
    for (const k of [0, 1]) assert.equal(a.row(k), b.row(k))
    assert.deepEqual(a.tag, { x: b.bx + 18, y: b.by - 9, w: nameW + 20, h: 18, tx: b.bx + 28, ty: b.by + 5, size: 14 })
    assert.deepEqual(a.underline, { dy: 7, width: 2 })
    assert.deepEqual(a.frame, { cut: 8, width: 1.2 })
  }
  assert.equal(wrapWidth(1), CAP.maxW)
  assert.deepEqual(laughBox(200, 1), { x: 640 - 125, y: 640, w: 250, h: 44, ty: 669, size: 20, cut: 8, width: 1.2 })
})

test('a larger bar keeps its bottom edge, grows upward, stays centred and in the frame', () => {
  for (const s of [1, 1.4, 1.6, 1.8, 2.5, 3]) {
    for (const lift of [0, 34, 46]) {
      const one = captionBox(1, 500, 60, lift, s), two = captionBox(2, wrapWidth(s), 60, lift, s)
      for (const b of [one, two]) {
        assert.ok(Math.abs(b.by + b.bh - (CAP.y + 30 - lift)) < 1e-9, `bottom edge at scale ${s}`)
        assert.ok(Math.abs(b.bx + b.bw / 2 - 640) < 1e-9, 'centred')
        assert.ok(b.bx >= 0 && b.bx + b.bw <= 1280, `inside the frame at scale ${s}: ${b.bx}..${b.bx + b.bw}`)
        assert.ok(b.tag.y >= 0, 'the name tag is inside the frame')
      }
      assert.ok(Math.abs(two.bh - 2 * CAP.size * s * 1.32 - 40 * s) < 1e-9)
    }
    const L = laughBox(180, s)
    assert.ok(Math.abs(L.y + L.h - LAUGH.bottom) < 1e-9, 'the laughter caption keeps its bottom edge')
    assert.equal(L.size, LAUGH.size * s)
  }
})

test('lines break by width and the page follows the word being said', () => {
  const lines = breakLines([300, 300, 300, 300, 300, 300, 300], 10, 1000)
  assert.deepEqual(lines, [[0, 1, 2], [3, 4, 5], [6]])
  assert.equal(pageStart(lines, 0, false), 0)
  assert.equal(pageStart(lines, 4, false), 0)
  assert.equal(pageStart(lines, 6, false), 1) // the last pair, never a lone line when two fit
  assert.equal(pageStart(lines, 99, true), 1)
  assert.equal(pageStart(lines, 99, false), 0)
  assert.equal(pageStart([[0]], 0, false), 0)
  // an over-wide single word still gets a line of its own
  assert.deepEqual(breakLines([1200, 50], 10, 1000), [[0], [1]])
})

test('larger text wraps into more lines in the same stage width', () => {
  // a 159-character line in words about 6 characters wide, 0.6 em per character
  const words = Array.from({ length: 26 }, (_, i) => 4 + (i % 5))
  const pairs = (s) => {
    const size = CAP.size * s
    return pairCount(breakLines(words.map((n) => n * size * 0.6), size * 0.35, wrapWidth(s)))
  }
  const p1 = pairs(1), p16 = pairs(1.6), p18 = pairs(1.8)
  assert.ok(p1 >= 1 && p16 >= p1 && p18 >= p16)
  assert.ok(p18 > p1, `${p1} pair(s) at 1, ${p18} at 1.8`)
})

test('caption scales from the page and the command line', () => {
  assert.equal(parseCaptionScale('1.6'), 1.6)
  assert.equal(parseCaptionScale(1), 1)
  assert.equal(parseCaptionScale('0.5'), 0.5)
  assert.equal(parseCaptionScale('3'), 3)
  for (const bad of ['0.4', '3.1', 'big', '', null, undefined, 'NaN', 'Infinity', '-1']) assert.equal(parseCaptionScale(bad), null, String(bad))
})

// ---------------------------------------------------------------- clearance and the ceiling

const chy = { x: 56, w: 520, h: 88 }

test('a chyron clears the caption area, lift included, and stays put when it already does', () => {
  // the scale-1 two-line bar, no lift: the chyron at 478 is already clear
  const bar = barRect(captionBox(2, 900, 80, 0, 1), 1)
  assert.equal(chyronTop(478, chy, bar), 478)
  // the same bar lifted by the disclaimer (34): it reaches the chyron, which moves just above it
  const lifted = barRect(captionBox(2, 900, 80, 34, 1), 1)
  const y = chyronTop(478, chy, lifted)
  assert.ok(y < 478)
  assert.equal(y + chy.h + CLEAR_MARGIN, lifted.y)
  // the laughter box at scale 1 under a chyron at 560 (the applause case): the chyron moves up
  const laugh = laughRect(laughBox(220, 1), 0)
  const ly = chyronTop(560, chy, laugh)
  assert.equal(ly, laugh.y - CLEAR_MARGIN - chy.h)
  assert.ok(ly + chy.h <= laugh.y - CLEAR_MARGIN)
  // lifted by a ticker (46): still clear of it
  const laughUp = laughRect(laughBox(220, 1.4), 46)
  assert.ok(chyronTop(514, chy, laughUp) + chy.h <= laughUp.y - CLEAR_MARGIN)
  // nothing there, or nothing across from it: no move
  assert.equal(chyronTop(560, chy, null), 560)
  assert.equal(chyronTop(560, chy, { x: 900, y: 600, w: 200, h: 80 }), 560)
})

test('overlap with a margin', () => {
  const a = { x: 0, y: 0, w: 10, h: 10 }
  assert.ok(overlaps(a, { x: 5, y: 5, w: 10, h: 10 }))
  assert.ok(!overlaps(a, { x: 12, y: 0, w: 5, h: 5 }))
  assert.ok(overlaps(a, { x: 12, y: 0, w: 5, h: 5 }, 3))
  assert.ok(!overlaps(a, { x: 0, y: 14, w: 5, h: 5 }, 3))
})

test('the scales tried: 1 up to the asked scale; an asked scale at or below 1 is used as is', () => {
  assert.deepEqual(scaleCandidates(1.2), [1, 1.05, 1.1, 1.15, 1.2])
  assert.deepEqual(scaleCandidates(1.42), [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.42])
  assert.deepEqual(scaleCandidates(1), [1])
  assert.deepEqual(scaleCandidates(0.8), [0.8])
})

test('the ceiling: a protected rectangle below, at and above the bar\'s reach; never below 1', () => {
  const cands = scaleCandidates(1.6)
  // a two-line bar, its top for each scale (bottom edge at 706)
  const area = (s) => barRect(captionBox(2, 800, 60, 0, s), s)
  const top = (s) => area(s).y
  const card = (bottom) => ({ x: 400, y: bottom - 200, w: 480, h: 200 })
  // far above even the 1.6 bar: the asked scale
  assert.equal(largestClear(cands, (s) => clearsAll(area(s), [card(top(1.6) - 20)])), 1.6)
  // its bottom between the 1.2 and 1.25 bars' reach: 1.2
  const mid = (top(1.2) + top(1.25)) / 2 - CLEAR_MARGIN
  assert.equal(largestClear(cands, (s) => clearsAll(area(s), [card(mid)])), 1.2)
  // exactly at the 1.3 bar's reach less the margin: 1.3 still clears
  assert.equal(largestClear(cands, (s) => clearsAll(area(s), [card(top(1.3) - CLEAR_MARGIN)])), 1.3)
  // already under the scale-1 bar: 1, never less
  assert.equal(largestClear(cands, (s) => clearsAll(area(s), [card(top(1) + 10)])), 1)
  // off to the side, however low: no limit
  assert.equal(largestClear(cands, (s) => clearsAll(area(s), [{ x: 0, y: 600, w: 60, h: 100 }])), 1.6)
  // below 1 asked: used as asked
  assert.equal(largestClear(scaleCandidates(0.8), () => false), 0.8)
})

test('one scale per line: the largest every sampled frame allowed', () => {
  const cands = scaleCandidates(1.4)
  const all = new Set(cands)
  const upTo = (m) => new Set(cands.filter((s) => s <= m))
  const samples = new Map([
    ['larry|say|first', [all, upTo(1.2), all]],
    ['sibyl|say|second', [all, all]],
    ['amber|say|third', [new Set(), all]],
  ])
  const plan = planFromSamples(cands, samples)
  assert.equal(plan.get('larry|say|first'), 1.2)
  assert.equal(plan.get('sibyl|say|second'), 1.4)
  assert.equal(plan.get('amber|say|third'), 1)
  assert.equal(captionKey({ who: 'larry', kind: 'say', text: 'Hi.' }), 'larry|say|Hi.')
  assert.equal(captionKey({ who: null, text: 'Hi.' }), '|say|Hi.')
})

test('a chyron moves with the caption area as it fades in, never in a jump', () => {
  const laugh = laughRect(laughBox(220, 1), 0)
  const clear = laughRect(laughBox(220, 1), 0).y - CLEAR_MARGIN - chy.h
  assert.equal(chyronTop(560, chy, laugh, CLEAR_MARGIN, 0), 560)
  assert.equal(chyronTop(560, chy, laugh, CLEAR_MARGIN, 0.25), 560 + (clear - 560) / 2)
  assert.equal(chyronTop(560, chy, laugh, CLEAR_MARGIN, 0.5), clear)
  assert.equal(chyronTop(560, chy, laugh, CLEAR_MARGIN, 1), clear)
})
