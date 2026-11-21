// The caption bar's arithmetic (src/stage/caption-layout.js): scale 1 is the bar as it always was,
// a larger bar keeps its bottom edge, stays in the frame, and pages long lines through more pairs.
// Node builtins only.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CAP, LAUGH, parseCaptionScale, wrapWidth, breakLines, pageStart, pairCount, captionBox, laughBox, captionRise } from '../src/stage/caption-layout.js'

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
  assert.equal(captionRise(1), 0)
  assert.equal(captionRise(1, true), 0)
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

test('the chyron rises by what a two-line bar or the laughter caption grew', () => {
  for (const s of [1.4, 1.8]) {
    assert.ok(Math.abs(captionRise(s) - (captionBox(2, 900, 0, 0, 1).by - captionBox(2, 900, 0, 0, s).by)) < 1e-9)
    assert.ok(Math.abs(captionRise(s, true) - (laughBox(100, 1).y - laughBox(100, s).y)) < 1e-9)
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
