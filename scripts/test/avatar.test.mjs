import { test } from 'node:test'
import assert from 'node:assert/strict'
import { inflateSync } from 'node:zlib'
import { parseAvatarArgs, encodePng, pngInfo, pngChunks, avatarProblems, crc32, VARIANTS, DEFAULT_VARIANT, AVATAR, MAX_BYTES } from '../lib/avatar.mjs'

test('avatar arguments: defaults, --variant, --out, --candidates, and refusals', () => {
  assert.deepEqual(parseAvatarArgs([]), { variant: DEFAULT_VARIANT, out: AVATAR, candidates: false })
  assert.ok(Object.hasOwn(VARIANTS, DEFAULT_VARIANT))
  assert.deepEqual(parseAvatarArgs(['--variant', 'c', '--out', '/tmp/x.png']), { variant: 'c', out: '/tmp/x.png', candidates: false })
  assert.equal(parseAvatarArgs(['--candidates']).candidates, true)
  for (const bad of [['--variant', 'z'], ['--variant'], ['--out', '--candidates'], ['extra'], ['--size', '10']]) {
    assert.throws(() => parseAvatarArgs(bad), (e) => e.code === 2, bad.join(' '))
  }
})

test('crc32 matches the standard check value', () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926)
})

/** undo the PNG row filters (reference decoder for the test) */
function decode(buf) {
  const { width, height } = pngInfo(buf)
  const idat = Buffer.concat(pngChunks(buf).filter((c) => c.type === 'IDAT').map((c) => c.data))
  const raw = inflateSync(idat)
  const stride = width * 3
  const out = Buffer.alloc(stride * height)
  for (let y = 0; y < height; y++) {
    const ft = raw[y * (stride + 1)]
    for (let i = 0; i < stride; i++) {
      const v = raw[y * (stride + 1) + 1 + i]
      const a = i >= 3 ? out[y * stride + i - 3] : 0, b = y ? out[(y - 1) * stride + i] : 0, c = i >= 3 && y ? out[(y - 1) * stride + i - 3] : 0
      let p = 0
      if (ft === 1) p = a
      else if (ft === 2) p = b
      else if (ft === 3) p = (a + b) >> 1
      else if (ft === 4) {
        const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c)
        p = pa <= pb && pa <= pc ? a : pb <= pc ? b : c
      }
      out[y * stride + i] = (v + p) & 0xff
    }
  }
  return out
}

test('encodePng round-trips RGB pixels and declares sRGB', () => {
  const w = 37, h = 23
  const rgb = Buffer.alloc(w * h * 3)
  for (let i = 0; i < rgb.length; i++) rgb[i] = (i * 7 + ((i / 97) | 0) * 31) & 0xff // varied rows, so every filter gets picked
  const png = encodePng(w, h, rgb)
  const info = pngInfo(png)
  assert.deepEqual([info.width, info.height, info.srgb], [w, h, true])
  assert.equal(pngChunks(png)[1].type, 'sRGB')
  assert.deepEqual(decode(png), rgb)
  assert.throws(() => encodePng(w, h, rgb.subarray(1)), /RGB/)
  assert.throws(() => pngInfo(Buffer.from('not a png at all')), /not a PNG/)
})

test('avatarProblems: size, colour space and Bluesky\'s byte limit', () => {
  assert.deepEqual(avatarProblems(encodePng(1000, 1000, Buffer.alloc(3e6))), [])
  assert.match(avatarProblems(encodePng(10, 10, Buffer.alloc(300))).join(), /10×10/)
  assert.ok(MAX_BYTES < 1_000_000)
})
