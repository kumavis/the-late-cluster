// The caption bar's arithmetic, apart from drawing (no imports: tested with Node builtins in
// test/caption-layout.test.mjs). Stage units. `s` is the caption scale (the stage's
// `captionScale`, `?capscale=` on the page, `--caption-scale` in the tools): 1 is the show as it
// has always been, and every number below is the old one when s is 1 (a product with 1 is exact).
// A larger bar keeps its bottom edge and grows upward; the wrap width stays in stage units, so
// larger text wraps into more lines and pages through more pairs of them.

export const CAP = { size: 25, y: 676, maxW: 1000 }
/** the laughter caption: [ LAUGHTER ] in a box whose bottom edge is at 684 */
export const LAUGH = { size: 20, h: 44, bottom: 684 }
/** the scales the tools accept */
export const CAPTION_SCALE_MIN = 0.5
export const CAPTION_SCALE_MAX = 3

/** a caption scale from a URL or command-line value: a number in range, else null */
export function parseCaptionScale(v) {
  if (v == null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) && n >= CAPTION_SCALE_MIN && n <= CAPTION_SCALE_MAX ? n : null
}

/** the widest a line may be: CAP.maxW, unless the box (line + padding) would leave the frame */
export function wrapWidth(s = 1) {
  return Math.min(CAP.maxW, 1280 - 24 - 56 * s)
}

/** break tokens (by width) into lines no wider than maxW: [[index…]…] */
export function breakLines(widths, space, maxW) {
  const lines = []
  let cur = [], curW = 0
  widths.forEach((w, i) => {
    if (cur.length && curW + space + w > maxW) {
      lines.push(cur)
      cur = []
      curW = 0
    }
    cur.push(i)
    curW += (cur.length > 1 ? space : 0) + w
  })
  if (cur.length) lines.push(cur)
  return lines
}

/** the first of the two lines shown: the pair holding word wi (or the last pair once done) */
export function pageStart(lines, wi, done) {
  let li = lines.findIndex((l) => l.includes(wi))
  if (li < 0) li = done ? lines.length - 1 : 0
  return Math.max(0, Math.min(lines.length - 2, li - (li % 2)))
}

/** how many pairs of lines a caption pages through */
export function pairCount(lines) {
  return Math.ceil(lines.length / 2)
}

/**
 * The bar's box for `rows` shown lines whose widest is `maxw`, a name tag `nameW` wide, lifted by
 * `lift`, at scale s: { size, lh, bx, by, bw, bh, tag: {x, y, w, h, tx, ty, size}, row(k) → baseline y }
 */
export function captionBox(rows, maxw, nameW, lift = 0, s = 1) {
  const size = CAP.size * s
  const lh = size * 1.32
  const bw = Math.max(maxw, nameW) + 56 * s
  const bh = rows * lh + 40 * s
  const bx = 640 - bw / 2
  // the bottom edge stays at CAP.y + 30 - lift whatever the scale
  const by = Math.max(4, CAP.y - bh + 30 - lift)
  return {
    size,
    lh,
    bx,
    by,
    bw,
    bh,
    tag: { x: bx + 18 * s, y: by - 9 * s, w: nameW + 20 * s, h: 18 * s, tx: bx + 28 * s, ty: by + 5 * s, size: 14 * s },
    row: (k) => by + 30 * s + k * lh + size * 0.55,
    underline: { dy: 7 * s, width: 2 * s },
    frame: { cut: 8 * s, width: 1.2 * s },
  }
}

/** the laughter caption's box for text `tw` wide at scale s: { x, y, w, h, ty, size, cut, width } */
export function laughBox(tw, s = 1) {
  const w = tw + 50 * s
  const h = LAUGH.h * s
  return { x: 640 - w / 2, y: LAUGH.bottom - h, w, h, ty: LAUGH.bottom - 15 * s, size: LAUGH.size * s, cut: 8 * s, width: 1.2 * s }
}

/**
 * How far a larger bar reaches above the scale-1 bar (stage units), so what sits above the bar (a
 * chyron) can move up with it: a two-line caption bar, or the laughter caption. 0 at scale 1.
 */
export function captionRise(s = 1, laugh = false) {
  if (s === 1) return 0
  return laugh ? LAUGH.h * (s - 1) : (2 * CAP.size * 1.32 + 40) * (s - 1)
}
