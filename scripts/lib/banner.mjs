// Pure helpers for scripts/banner.mjs (the show's Bluesky profile banner): its arguments, the places
// on the banner the apps cover, and the checks on the finished file and on where the title landed.
// The PNG encoder is the avatar's (scripts/lib/avatar.mjs). Node builtins only; tested in
// scripts/test/banner.test.mjs.
import { EpisodeError } from './episodes.mjs'
import { pngInfo } from './avatar.mjs'

/** three compositions of the title over the skyline (scripts/banner/page.js) */
export const VARIANTS = Object.freeze({
  a: 'the title centred over the whole skyline, a dark halo behind it',
  b: 'the title to the right, the skyline dimmer behind it, its tallest towers on the left',
  c: 'a larger title over the skyline as a low band along the bottom',
})
/** the variant `npm run banner` writes: a, the owner's pick (21 November 2026) */
export const DEFAULT_VARIANT = 'a'
export const BANNER = 'brand/banner.png'
export const CANDIDATES = 'brand/candidates'
export const WIDTH = 3000
export const HEIGHT = 1000
/** the sizes a banner may be, largest first: 3000 × 1000 when it fits the byte limit as a PNG, else 1500 × 500 */
export const SIZES = Object.freeze([Object.freeze([WIDTH, HEIGHT]), Object.freeze([WIDTH / 2, HEIGHT / 2])])
/** Bluesky refuses a banner over 1,000,000 bytes (the profile record's limit) */
export const MAX_BYTES = 1_000_000

/**
 * What the apps lay over the banner, as fractions of its width and height (x0, y0, x1, y1), on a
 * phone 390 points wide, where the banner is 130 points tall and everything is largest relative to
 * it: the profile picture (94 points with its border, 10 from the left, overlapping the banner's
 * bottom 40), the back button over the top-left and the menu button over the top-right (34-point
 * discs 10 from the edges). Each has a 4-point margin. The desktop profile (600 × 200) covers less.
 */
export const PHONE = Object.freeze({ w: 390, h: 130 })
const pt = (x0, y0, x1, y1) => Object.freeze({ x0: x0 / PHONE.w, y0: y0 / PHONE.h, x1: x1 / PHONE.w, y1: y1 / PHONE.h })
export const ZONES = Object.freeze({
  avatar: pt(0, 90 - 4, 10 + 94 + 4, 130),
  back: pt(0, 0, 10 + 34 + 4, 10 + 34 + 4),
  menu: pt(390 - 10 - 34 - 4, 0, 390, 10 + 34 + 4),
})
/** the title's smallest width, as a fraction of the banner: 140 points on a phone */
export const MIN_TITLE_WIDTH = 140 / PHONE.w

export const USAGE = 'usage: npm run banner -- [--variant a|b|c] [--out file] [--candidates]'

/**
 * argv (after the script) → { variant, out, candidates }. --candidates renders all three into
 * brand/candidates/ with a judging sheet instead of writing the banner.
 */
export function parseBannerArgs(argv) {
  const o = { variant: DEFAULT_VARIANT, out: BANNER, candidates: false }
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
  if (o.candidates && (argv.includes('--out') || argv.includes('--variant'))) throw new EpisodeError(`--candidates writes all three to ${CANDIDATES}/: it takes no --variant or --out\n${USAGE}`)
  if (!o.candidates && !/\.png$/i.test(o.out)) throw new EpisodeError(`--out must be a .png file: ${o.out}`)
  return o
}

/** problems with a finished banner, as messages (empty when it is fine) */
export function bannerProblems(buf) {
  const i = pngInfo(buf)
  const p = []
  if (i.width !== i.height * 3) p.push(`${i.width}×${i.height} is not 3:1, so the apps would crop it`)
  else if (!SIZES.some(([w, h]) => i.width === w && i.height === h)) p.push(`${i.width}×${i.height}, not ${SIZES.map(([w, h]) => `${w}×${h}`).join(' or ')}`)
  if (!i.srgb && !i.iccp) p.push('no sRGB chunk')
  if (i.bytes > MAX_BYTES) p.push(`${i.bytes} bytes, over Bluesky's ${MAX_BYTES}`)
  return p
}

/**
 * the first of `pngs` (largest first) with no problems, as { buf, problems: [] }; when none passes,
 * the last with its problems
 */
export function pickBanner(pngs) {
  let last
  for (const buf of pngs) {
    last = { buf, problems: bannerProblems(buf) }
    if (!last.problems.length) return last
  }
  return last
}

const overlaps = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

/**
 * problems with where the title landed: box = { x0, y0, x1, y1 }, the lit pixels' bounds as
 * fractions of the banner. It must be inside the banner, clear of every zone, and wide enough to
 * read on a phone.
 */
export function titleProblems(box, zones = ZONES) {
  const p = []
  if (!(box.x1 > box.x0 && box.y1 > box.y0)) return ['the title drew nothing']
  if (box.x0 < 0 || box.y0 < 0 || box.x1 > 1 || box.y1 > 1) p.push('the title runs off the banner')
  for (const [name, z] of Object.entries(zones)) if (overlaps(box, z)) p.push(`the title is under the ${name === 'avatar' ? 'profile picture' : `${name} button`}`)
  if (box.x1 - box.x0 < MIN_TITLE_WIDTH) p.push(`the title is ${Math.round((box.x1 - box.x0) * PHONE.w)} points wide on a phone, under ${Math.round(MIN_TITLE_WIDTH * PHONE.w)}`)
  return p
}
