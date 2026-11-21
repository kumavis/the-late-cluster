// The head tile's clear reaches past the tile, so the stage's smoothed copy never reads what an
// earlier, bigger tile left beside it (a thin line forming a corner beside a head).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tileClear, TILE_MARGIN } from '../src/engine/tile.js'

test('the clear covers the tile and a margin for the copy filter', () => {
  assert.ok(TILE_MARGIN >= 2, 'bilinear smoothing reads at least one pixel past the edge; keep a margin of two or more')
  for (const px of [8, 179, 270, 333, 512, 1100]) {
    const m = tileClear(px, 4096)
    assert.ok(m >= px + 2, `px ${px}: clears ${m}`)
  }
})

test('the clear never runs past the canvas', () => {
  assert.equal(tileClear(512, 512), 512)
  assert.equal(tileClear(510, 512), 512)
  assert.equal(tileClear(300, 512), 300 + TILE_MARGIN)
})

test('the heads renderer clears with it before drawing a head', async () => {
  const { readFile } = await import('node:fs/promises')
  const src = await readFile(new URL('../src/engine/heads.js', import.meta.url), 'utf8')
  const start = src.indexOf('render(head, px) {')
  const body = src.slice(start, src.indexOf('\n  }\n', start))
  assert.match(body, /tileClear\(px, this\.size\)/)
  assert.ok(body.indexOf('gl.clear()') < body.indexOf('gl.render('), 'clear before render')
  assert.match(body, /setScissor\(0, 0, m, m\)[\s\S]*gl\.clear\(\)/, 'the clear uses the margin, not just the tile')
})
