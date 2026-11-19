// Pure helpers for scripts/avatar.mjs (the show's Bluesky profile picture): its arguments, a small
// PNG encoder (RGB, sRGB chunk, zlib 9) and the checks on the finished file. Node builtins only;
// tested in scripts/test/avatar.test.mjs.
import { deflateSync } from 'node:zlib'
import { EpisodeError } from './episodes.mjs'

/** three variations of one composition, head and bow tie in the gold ring (scripts/avatar/page.js) */
export const VARIANTS = Object.freeze({
  a: 'violet behind him, mouth slightly open, turned about 28 degrees',
  b: 'the same on near-black',
  c: 'violet, mouth closed in a slight smile, turned about 18 degrees',
})
export const DEFAULT_VARIANT = 'c'
export const AVATAR = 'brand/avatar.png'
export const SIZE = 1000
/** Bluesky refuses an avatar over 1,000,000 bytes; we keep a margin */
export const MAX_BYTES = 900_000

export const USAGE = 'usage: npm run avatar -- [--variant a|b|c] [--out file] [--candidates]'

/**
 * argv (after the script) → { variant, out, candidates }. --candidates renders all three into
 * preview/_avatar/ with a contact sheet instead of writing the avatar.
 */
export function parseAvatarArgs(argv) {
  const o = { variant: DEFAULT_VARIANT, out: AVATAR, candidates: false }
  const a = [...argv]
  while (a.length) {
    const k = a.shift()
    if (k === '--candidates') o.candidates = true
    else if (k === '--variant' || k === '--out') {
      const v = a.shift()
      if (v === undefined || v.startsWith('--')) throw new EpisodeError(`${k} needs a value\n${USAGE}`)
      o[k.slice(2)] = v
    } else if (k === '-h' || k === '--help') throw new EpisodeError(USAGE)
    else throw new EpisodeError(`unknown argument: ${k}\n${USAGE}`)
  }
  if (!Object.hasOwn(VARIANTS, o.variant)) throw new EpisodeError(`unknown variant: ${o.variant} (${Object.keys(VARIANTS).join(', ')})`)
  return o
}

// ---------------------------------------------------------------- PNG

const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

const CRC = new Uint32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
export function crc32(buf) {
  let c = 0xffffffff
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

/** the chunks of a PNG: [{ type, data, start }] (throws on anything that is not a PNG) */
export function pngChunks(buf) {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(SIG)) throw new Error('not a PNG')
  const out = []
  let p = 8
  while (p + 12 <= buf.length) {
    const len = buf.readUInt32BE(p)
    const type = buf.toString('latin1', p + 4, p + 8)
    if (p + 12 + len > buf.length) throw new Error(`truncated PNG chunk ${type}`)
    out.push({ type, data: buf.subarray(p + 8, p + 8 + len), start: p })
    p += 12 + len
    if (type === 'IEND') break
  }
  if (out[0]?.type !== 'IHDR') throw new Error('PNG without IHDR')
  return out
}

/** width, height, and whether it declares sRGB (an sRGB chunk) or carries a profile (iCCP) */
export function pngInfo(buf) {
  const chunks = pngChunks(buf)
  const ihdr = chunks[0].data
  const types = new Set(chunks.map((c) => c.type))
  return { width: ihdr.readUInt32BE(0), height: ihdr.readUInt32BE(4), srgb: types.has('sRGB'), iccp: types.has('iCCP'), bytes: buf.length }
}

function chunk(type, data) {
  const head = Buffer.alloc(8)
  head.writeUInt32BE(data.length, 0)
  head.write(type, 4, 'latin1')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0)
  return Buffer.concat([head, data, crc])
}

/** problems with a finished avatar, as messages (empty when it is fine) */
export function avatarProblems(buf) {
  const i = pngInfo(buf)
  const p = []
  if (i.width !== SIZE || i.height !== SIZE) p.push(`${i.width}×${i.height}, not ${SIZE}×${SIZE}`)
  if (!i.srgb && !i.iccp) p.push('no sRGB chunk')
  if (i.bytes > MAX_BYTES) p.push(`${i.bytes} bytes, over ${MAX_BYTES}`)
  return p
}

/**
 * Encode 8-bit RGB pixels (width*height*3 bytes, rows top to bottom) as a PNG with an sRGB chunk:
 * per row the filter with the smallest sum of absolute differences, then zlib at level 9. The
 * browser's own encoder is quick rather than small, and keeps an alpha channel the avatar has no
 * use for.
 */
export function encodePng(width, height, rgb) {
  if (rgb.length !== width * height * 3) throw new Error(`expected ${width * height * 3} bytes of RGB, got ${rgb.length}`)
  const stride = width * 3
  const raw = Buffer.alloc((stride + 1) * height)
  const cand = Array.from({ length: 5 }, () => Buffer.alloc(stride))
  const zero = Buffer.alloc(stride)
  for (let y = 0; y < height; y++) {
    const cur = rgb.subarray(y * stride, (y + 1) * stride)
    const up = y ? rgb.subarray((y - 1) * stride, y * stride) : zero
    let best = 0, bestSum = Infinity
    for (let ft = 0; ft < 5; ft++) {
      const o = cand[ft]
      let sum = 0
      for (let i = 0; i < stride; i++) {
        const a = i >= 3 ? cur[i - 3] : 0, b = up[i], c = i >= 3 ? up[i - 3] : 0
        let p
        if (ft === 0) p = 0
        else if (ft === 1) p = a
        else if (ft === 2) p = b
        else if (ft === 3) p = (a + b) >> 1
        else {
          const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c)
          p = pa <= pb && pa <= pc ? a : pb <= pc ? b : c
        }
        const v = (cur[i] - p) & 0xff
        o[i] = v
        sum += v < 128 ? v : 256 - v
      }
      if (sum < bestSum) {
        bestSum = sum
        best = ft
      }
    }
    raw[y * (stride + 1)] = best
    cand[best].copy(raw, y * (stride + 1) + 1)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // truecolour RGB
  return Buffer.concat([SIG, chunk('IHDR', ihdr), chunk('sRGB', Buffer.from([0])), chunk('IDAT', deflateSync(raw, { level: 9, memLevel: 9 })), chunk('IEND', Buffer.alloc(0))])
}
