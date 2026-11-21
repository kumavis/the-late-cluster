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

// ---------------------------------------------------------------- clearance and the ceiling
// What the caption area must leave alone. A chyron is moved up until it clears whatever is drawn
// there (the bar, or the laughter box), lift included. Protected rectangles (post cards, credits:
// registered by the drawing code with kit/draw.js protect()) are never covered: a line's bar is
// drawn at the largest scale up to the asked one that clears them all, never below 1.

/** the gap kept between the caption area and what it must clear (stage units) */
export const CLEAR_MARGIN = 4

/** do rectangles {x, y, w, h} overlap, or come within m of each other? */
export function overlaps(a, b, m = 0) {
  return a.x < b.x + b.w + m && a.x + a.w > b.x - m && a.y < b.y + b.h + m && a.y + a.h > b.y - m
}

/** the area a caption bar takes (captionBox's result at scale s), its name tag included */
export function barRect(L, s = 1) {
  return { x: L.bx, y: L.by - 9 * s, w: L.bw, h: L.bh + 9 * s }
}

/** the area the laughter box takes (laughBox's result), lifted */
export function laughRect(B, lift = 0) {
  return { x: B.x, y: B.y - lift, w: B.w, h: B.h }
}

/**
 * The scales to try for an asked scale: 1, 1.05, … up to it (a scale below 1 is used as asked).
 */
export function scaleCandidates(max, step = 0.05) {
  if (!(max > 1)) return [max]
  const out = []
  for (let k = 0; ; k++) {
    const s = Math.round((1 + k * step) * 1e6) / 1e6
    if (s >= max - 1e-9) break
    out.push(s)
  }
  out.push(max)
  return out
}

/** the largest candidate the test accepts; the smallest (1, or the asked scale below 1) if none */
export function largestClear(cands, ok) {
  for (let i = cands.length - 1; i >= 0; i--) if (ok(cands[i])) return cands[i]
  return cands[0]
}

/** does a caption area clear every protected rectangle? */
export function clearsAll(area, rects, m = CLEAR_MARGIN) {
  return !rects.some((r) => overlaps(area, r, m))
}

/**
 * A chyron's top: at `base`, unless its box ({x, w} across, h tall) overlaps the caption area;
 * then just above it, a margin clear. `vis` (0..1) is how far the caption area is faded in:
 * the chyron moves with it (all the way from half visible), so it never jumps for a faint frame.
 */
export function chyronTop(base, chyron, area, m = CLEAR_MARGIN, vis = 1) {
  if (!area) return base
  const box = { x: chyron.x, y: base, w: chyron.w, h: chyron.h }
  if (!overlaps(box, area)) return base
  const clear = Math.min(base, area.y - m - chyron.h)
  const k = Math.min(1, Math.max(0, vis / 0.5))
  return k === 1 ? clear : base + (clear - base) * k
}

/** one key per caption line (or override): the same text by the same speaker shares a scale */
export const captionKey = (cap) => `${cap.who ?? ''}|${cap.kind ?? 'say'}|${cap.text}`

/** a line's plan from what each sampled frame allowed: { key → the largest scale every frame allowed } */
export function planFromSamples(cands, samples) {
  const plan = new Map()
  for (const [key, frames] of samples) plan.set(key, largestClear(cands, (s) => frames.every((okAt) => okAt.has(s))))
  return plan
}
