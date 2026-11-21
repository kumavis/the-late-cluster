import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { encodePng } from '../lib/avatar.mjs'
import { parseBannerArgs, bannerProblems, pickBanner, titleProblems, VARIANTS, DEFAULT_VARIANT, BANNER, ZONES, SIZES, MAX_BYTES, MIN_TITLE_WIDTH, PHONE } from '../lib/banner.mjs'

test('banner arguments: defaults, --variant, --out, --candidates, and refusals', () => {
  assert.deepEqual(parseBannerArgs([]), { variant: DEFAULT_VARIANT, out: BANNER, candidates: false })
  assert.ok(Object.hasOwn(VARIANTS, DEFAULT_VARIANT))
  assert.deepEqual(parseBannerArgs(['--variant', 'a', '--out', '/tmp/x.png']), { variant: 'a', out: '/tmp/x.png', candidates: false })
  assert.equal(parseBannerArgs(['--candidates']).candidates, true)
  for (const bad of [['--variant', 'z'], ['--variant'], ['--out', '--candidates'], ['extra'], ['--out', '/tmp/x.jpg'], ['--candidates', '--variant', 'a'], ['--candidates', '--out', '/tmp/x.png']]) {
    assert.throws(() => parseBannerArgs(bad), (e) => e.code === 2, bad.join(' '))
  }
})

test('bannerProblems: 3:1, one of the two sizes, sRGB, and Bluesky\'s byte limit', () => {
  for (const [w, h] of SIZES) assert.deepEqual(bannerProblems(encodePng(w, h, Buffer.alloc(w * h * 3))), [], `${w}×${h}`)
  assert.match(bannerProblems(encodePng(300, 100, Buffer.alloc(9e4))).join(), /not 3000×1000 or 1500×500/)
  assert.match(bannerProblems(encodePng(1000, 1000, Buffer.alloc(3e6))).join(), /not 3:1/)
  // noise does not compress: 1500×500 of it is about 2.25 MB
  const noisy = encodePng(1500, 500, randomBytes(1500 * 500 * 3))
  assert.ok(noisy.length > MAX_BYTES)
  assert.match(bannerProblems(noisy).join(), /over Bluesky's 1000000/)
  assert.equal(MAX_BYTES, 1_000_000)
})

test('pickBanner: the largest size that passes, else the last with its problems', () => {
  const big = encodePng(3000, 1000, Buffer.alloc(9e6)), small = encodePng(1500, 500, Buffer.alloc(2.25e6))
  assert.equal(pickBanner([big, small]).buf, big)
  const noisy = encodePng(3000, 1000, randomBytes(9e6))
  assert.deepEqual(pickBanner([noisy, small]), { buf: small, problems: [] })
  const r = pickBanner([noisy, encodePng(1500, 500, randomBytes(2.25e6))])
  assert.match(r.problems.join(), /over/)
})

test('the zones are where the phone puts the profile picture and its two buttons', () => {
  assert.ok(ZONES.avatar.x0 === 0 && ZONES.avatar.y1 === 1 && ZONES.avatar.y0 > 0.5)
  assert.ok(ZONES.back.x0 === 0 && ZONES.back.y0 === 0 && ZONES.menu.x1 === 1 && ZONES.menu.y0 === 0)
  assert.equal(ZONES.back.x1, 1 - ZONES.menu.x0)
  assert.equal(Math.round(MIN_TITLE_WIDTH * PHONE.w), 140)
})

test('titleProblems: clear of the zones, on the banner, wide enough', () => {
  assert.deepEqual(titleProblems({ x0: 0.3, y0: 0.1, x1: 0.7, y1: 0.8 }), [])
  assert.match(titleProblems({ x0: 0.2, y0: 0.2, x1: 0.6, y1: 0.75 }).join(), /under the profile picture/)
  assert.match(titleProblems({ x0: 0.05, y0: 0.2, x1: 0.5, y1: 0.5 }).join(), /back button/)
  assert.match(titleProblems({ x0: 0.5, y0: 0.2, x1: 0.95, y1: 0.5 }).join(), /menu button/)
  assert.match(titleProblems({ x0: 0.4, y0: 0.2, x1: 0.6, y1: 0.5 }).join(), /78 points wide on a phone, under 140/)
  assert.match(titleProblems({ x0: 0.3, y0: -0.1, x1: 0.7, y1: 0.5 }).join(), /runs off/)
  assert.deepEqual(titleProblems({ x0: 1, y0: 1, x1: 0, y1: 0 }), ['the title drew nothing'])
})
