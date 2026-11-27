// The walk's clothes: Larry's overcoat and his gold scarf, his cardigan at the table, the crew off
// duty and the busker. Kept with the special (CLAUDE.md: new props live with the episode).
//
// How it reaches the studio. A costume kind is an entry in the studio's COSTUMES table,
// { back(ctx, a, c), front(ctx, a, c) }, drawn in centimetres about the neck base (x right, y
// down) with the context already scaled; the anchor `a` and spec `c` are described at the top of
// packages/show/src/stage/costumes.js. The table is exported, so importing this module adds the
// kinds below to it; the studio's drawing helpers are private to that file, so the few this needs
// are written again here on the kit's public `beam` and `occlude`. Nothing in packages/ changes.
//
// How it changes with time. Nothing here keeps state. `dressWalk(show, t)` reads the cue times
// and dresses everyone from them on every frame; `larryLook(...)` and `crewLook(id)` are the same
// thing by hand. Same arguments, same clothes, so seeking and frozen frames work.
import { COSTUMES } from '@late-cluster/show/stage/costumes.js'
import { beam, occlude, mix } from '@late-cluster/show/kit/draw.js'
import { OFF_DUTY } from '../../looks.js'

// ---------------------------------------------------------------- helpers (cm space)

const PATHS = new Map()
function path(d) {
  let p = PATHS.get(d)
  if (!p) {
    p = new Path2D(d)
    if (PATHS.size > 4000) PATHS.clear()
    PATHS.set(d, p)
  }
  return p
}
const f = (n) => (Math.round(n * 10) / 10).toString()
const pt = (x, y) => `${f(x)} ${f(y)}`
/** a stroke in cm space, `px` wide in stage px (the studio's own weighting) */
function line(ctx, a, d, color, px = 1.5, o = {}) {
  beam(ctx, typeof d === 'string' ? path(d) : d, color, (0.85 * px) / a.u, { ...o, alpha: (o.alpha ?? 1) * 0.92 })
}
function fill(ctx, a, d, color = '#000') {
  if (a.noFill) return
  occlude(ctx, typeof d === 'string' ? path(d) : d, color, 1)
}
/** fill black, then stroke */
function solid(ctx, a, d, color, px = 1.5, o = {}) {
  fill(ctx, a, d)
  line(ctx, a, d, color, px, o)
}
const circle = (cx, cy, r) => `M${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 0 ${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 0 ${f(cx + r)} ${f(cy)}`
const clamp01 = (v) => Math.max(0, Math.min(1, v))
const smooth = (v) => {
  v = clamp01(v)
  return v * v * (3 - 2 * v)
}
/** 0..1 of the way from u0 to u1 */
const span = (u, u0, u1) => clamp01((u - u0) / (u1 - u0))

/** a body outline: neck half-width N, shoulders S, hem H, flaring by `flare` at the hem */
function body(S, N, H, { slope = 6.5, flare = 0, waist = 0 } = {}) {
  const sl = slope + 2.5
  const mid = Math.min(H, 34)
  return [
    `M${pt(-N, -1)}`,
    `C${pt(-N - 3.5, 0.6)} ${pt(-S + 6, sl - 4.2)} ${pt(-S + 1.5, sl - 1.2)}`,
    `C${pt(-S - 1.8, sl + 0.2)} ${pt(-S - 2.8, sl + 4)} ${pt(-S - 2.7, sl + 9)}`,
    `C${pt(-S - 2.6 + waist, mid)} ${pt(-S - 2.6 - flare * 0.5, H - 6)} ${pt(-S - 2.6 - flare, H)}`,
    `L${pt(S + 2.6 + flare, H)}`,
    `C${pt(S + 2.6 + flare * 0.5, H - 6)} ${pt(S + 2.6 - waist, mid)} ${pt(S + 2.7, sl + 9)}`,
    `C${pt(S + 2.8, sl + 4)} ${pt(S + 1.8, sl + 0.2)} ${pt(S - 1.5, sl - 1.2)}`,
    `C${pt(S - 6, sl - 4.2)} ${pt(N + 3.5, 0.6)} ${pt(N, -1)} Z`,
  ].join(' ')
}
/** sleeve seams */
function sleeves(S, H, slope = 6.5) {
  return `M${pt(-S + 3.5, slope + 3)} C${pt(-S + 2.6, slope + 14)} ${pt(-S + 3, H - 10)} ${pt(-S + 3.8, H)} M${pt(S - 3.5, slope + 3)} C${pt(S - 2.6, slope + 14)} ${pt(S - 3, H - 10)} ${pt(S - 3.8, H)}`
}
/** trousers and shoes to the floor, for a standing figure */
function legs(ctx, a, top, color) {
  if (a.floor == null || a.floor <= top + 4) return
  const F = a.floor
  solid(ctx, a, `M-14 ${f(top)} L-12.5 ${f(F - 3)} L-2.5 ${f(F - 3)} L-1 ${f(top + 6)} L1 ${f(top + 6)} L2.5 ${f(F - 3)} L12.5 ${f(F - 3)} L14 ${f(top)} Z`, color, 1.4, { alpha: 0.85 })
  const shoe = (sx) => `M${f(sx * 2)} ${f(F - 3)} L${f(sx * 13.5)} ${f(F - 3)} C${f(sx * 16)} ${f(F - 2.5)} ${f(sx * 17)} ${f(F)} ${f(sx * 15)} ${f(F)} L${f(sx * 2)} ${f(F)} Z`
  for (const sx of [-1, 1]) solid(ctx, a, shoe(sx), mix(color, '#ffffff', 0.3), 1.3, { alpha: 0.75 })
}
/** where a garment of length `len` ends: its hem (standing) or the bottom of the view */
const hemOf = (a, len) => (a.floor != null ? Math.min(a.bottom, len) : a.bottom)

// ---------------------------------------------------------------- Larry's gold scarf

// The scarf is a knitted band: once round the collar, snug under the jaw, and both ends down
// the chest, the left one longer. Its centre lines (cm about the neck base; cx follows the turn):
const WRAP = (cx) => [[-8.8, -5.8], [-8.4, -2.6], [-5.4, 0.4], [cx * 0.6, 1.4], [5.4, 0.4], [8.4, -2.6], [8.8, -5.8]]
const TAIL_A = (cx) => [[cx * 0.6 - 2.2, 0.6], [cx * 0.6 - 4.4, 8], [cx * 0.6 - 5.4, 16], [cx * 0.6 - 5.8, 25]]
const TAIL_B = (cx) => [[cx * 0.6 + 0.8, 1], [cx * 0.6 + 2.2, 6.5], [cx * 0.6 + 2.8, 12.5], [cx * 0.6 + 3, 18.5]]
const BACK = [[-9.4, -4.6], [-7.2, -7.6], [0, -8.6], [7.2, -7.6], [9.4, -4.6]]

/** the length of a polyline */
const lengthOf = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0)
/** the first `u` (0..1) of a polyline, by length */
function partial(pts, u) {
  if (u >= 1) return pts
  let left = lengthOf(pts) * u
  const out = [pts[0]]
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    if (left >= l) {
      out.push(pts[i])
      left -= l
    } else {
      const k = left / l
      out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k])
      break
    }
  }
  return out
}
/** a band of width w along a polyline: its outline and its far end [left, right] */
function ribbon(pts, w, taper = 0) {
  const L = [], R = []
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[Math.min(pts.length - 1, i + 1)]
    let dx = p1[0] - p0[0], dy = p1[1] - p0[1]
    const n = Math.hypot(dx, dy) || 1
    dx /= n
    dy /= n
    const hw = (w / 2) * (1 - taper * (i / Math.max(1, pts.length - 1)))
    L.push([pts[i][0] - dy * hw, pts[i][1] + dx * hw])
    R.push([pts[i][0] + dy * hw, pts[i][1] - dx * hw])
  }
  const outline = `M${L.map((p) => pt(...p)).join(' L')} L${[...R].reverse().map((p) => pt(...p)).join(' L')} Z`
  return { outline, end: [L.at(-1), R.at(-1)] }
}
/** a smoothed polyline (corner cutting), so the knit band curves */
function soften(pts, n = 2) {
  let p = pts
  for (let k = 0; k < n; k++) {
    const q = [p[0]]
    for (let i = 0; i < p.length - 1; i++) {
      const [x0, y0] = p[i], [x1, y1] = p[i + 1]
      q.push([x0 * 0.75 + x1 * 0.25, y0 * 0.75 + y1 * 0.25], [x0 * 0.25 + x1 * 0.75, y0 * 0.25 + y1 * 0.75])
    }
    q.push(p.at(-1))
    p = q
  }
  return p
}
const seg2 = ([l, r]) => `M${pt(...l)} L${pt(...r)}`
/**
 * One piece of the scarf, the first `u` of it drawn. `fold` draws a soft line along it (the wrap's
 * roll); `ends` draws two knitted stripes and a fringe once the piece is whole.
 */
function scarfPiece(ctx, a, pts, w, u, color, o = {}) {
  if (u <= 0.001) return
  const full = soften(pts)
  const part = partial(full, u)
  if (part.length < 2) return
  const r = ribbon(part, w, o.taper ?? 0)
  solid(ctx, a, r.outline, color, 1.5)
  if (o.fold) line(ctx, a, `M${part.map((p) => pt(p[0], p[1] + 0.6)).join(' L')}`, color, 0.8, { alpha: 0.4 })
  // the end still being drawn glows: the scarf is drawing itself on
  if (u < 1) return line(ctx, a, seg2(r.end), '#fff3d6', 1.8, { hot: true })
  if (!o.ends) return
  const stripes = [0.8, 0.86].map((k) => seg2(ribbon(partial(full, k), w, (o.taper ?? 0) * k).end)).join(' ')
  line(ctx, a, stripes, color, 0.9, { alpha: 0.75 })
  const [l, rr] = r.end
  let d = ''
  for (let i = 0; i <= 5; i++) {
    const x = l[0] + ((rr[0] - l[0]) * i) / 5, y = l[1] + ((rr[1] - l[1]) * i) / 5
    d += `M${pt(x, y)} L${pt(x - 0.3, y + 2.2)} `
  }
  line(ctx, a, d, color, 0.9, { alpha: 0.8 })
}
/** the part that goes round behind the neck (drawn in the back layer, so the head covers it) */
function scarfBack(ctx, a, c) {
  const s = clamp01(c.scarf ?? 0)
  if (s <= 0) return
  scarfPiece(ctx, a, BACK, 5.2, smooth(span(s, 0.18, 0.6)), c.scarfColor ?? '#ffc861')
}
/** the front: round the throat, then the long end, then the short end tucked behind it */
function scarfFront(ctx, a, c) {
  const s = clamp01(c.scarf ?? 0)
  if (s <= 0) return
  const cx = a.turn * 4.5
  const g = c.scarfColor ?? '#ffc861'
  scarfPiece(ctx, a, TAIL_B(cx), 4.8, smooth(span(s, 0.72, 1)), mix(g, '#000', 0.2), { ends: true, taper: 0.1 })
  scarfPiece(ctx, a, TAIL_A(cx), 5.4, smooth(span(s, 0.5, 0.86)), g, { ends: true, taper: 0.08 })
  scarfPiece(ctx, a, WRAP(cx), 5.2, smooth(span(s, 0.18, 0.6)), g, { fold: true })
}

/** the pay envelope, blank, its corner standing out of the breast pocket at (px, py) */
function envelope(ctx, a, px, py, c) {
  const paper = c.paper ?? '#eef6f8'
  const d = `M${pt(px - 3.6, py + 0.4)} L${pt(px - 3.1, py - 4.4)} L${pt(px + 3.4, py - 3.7)} L${pt(px + 3.6, py + 0.4)} Z`
  solid(ctx, a, d, paper, 1.1, { alpha: 0.85 })
  // the flap's crease, and nothing written on it
  line(ctx, a, `M${pt(px - 3.1, py - 4.4)} L${pt(px + 0.2, py - 2.2)} L${pt(px + 3.4, py - 3.7)}`, paper, 0.7, { alpha: 0.5 })
}

// ---------------------------------------------------------------- Larry: the overcoat

COSTUMES.walkOvercoat = {
  back(ctx, a, c) {
    const H = hemOf(a, 84)
    legs(ctx, a, H - 2, c.under ?? '#5d5446')
    // the collar, turned up, standing behind the neck
    solid(ctx, a, `M-10.5 3 C-11.5 -2 -11 -6.5 -9.2 -9.4 C-4 -10.6 4 -10.6 9.2 -9.4 C11 -6.5 11.5 -2 10.5 3 Z`, c.color, 1.5)
    solid(ctx, a, body(19.5, 7.4, H, { flare: H > 60 ? 4 : 0, waist: -0.5 }), c.color, 1.8)
    line(ctx, a, sleeves(19.5, H), c.color, 1, { alpha: 0.5 })
    // rumples: creases at the shoulders and down the sleeves
    line(ctx, a, `M-17 14 C-15.5 16 -15.8 18 -17.2 20 M-19 27 C-17 28.5 -17.4 31 -19.6 32.5 M16.8 12.5 C15.4 15 15.6 17 17 19 M18.6 29 C16.8 30.4 17.2 33 19.4 34`, c.color, 0.8, { alpha: 0.4 })
    if (a.floor != null && H > 60) line(ctx, a, `M-12 ${f(H - 18)} C-11 ${f(H - 10)} -13 ${f(H - 5)} -12.5 ${f(H)} M10 ${f(H - 22)} C11 ${f(H - 12)} 9.5 ${f(H - 6)} 10.5 ${f(H)}`, c.color, 0.8, { alpha: 0.35 })
    scarfBack(ctx, a, c)
  },
  front(ctx, a, c) {
    const cx = a.turn * 4.5
    const B = hemOf(a, 84)
    const v = 25
    // the dark knit and an open shirt collar in the coat's opening
    solid(ctx, a, `M-7.2 -1.5 L${f(cx)} ${f(v)} L7.2 -1.5 Z`, c.under ?? '#5d5446', 1.1, { alpha: 0.8 })
    line(ctx, a, `M-5.8 2 C-3 5.2 3 5.2 5.8 2`, c.under ?? '#5d5446', 0.9, { alpha: 0.6 })
    solid(ctx, a, `M-5.2 -2 L${f(cx * 0.4 - 1.6)} 4 L-7 3 Z M5.2 -2 L${f(cx * 0.4 + 1.6)} 4 L7 3 Z`, c.shirt ?? '#d9ccb0', 1.1, { alpha: 0.8 })
    // the turned-up collar's front: it stands beside the jaw and folds down into the lapels
    for (const s of [-1, 1]) {
      solid(ctx, a, `M${pt(s * 7, -1)} L${pt(s * 8.6, -8.6)} L${pt(s * 12.2, -7.2)} C${pt(s * 13.6, -3)} ${pt(s * 14.8, 1)} ${pt(s * 16, 5.5)} L${pt(s * 11.5, 7.5)} Z`, c.color, 1.5)
      line(ctx, a, `M${pt(s * 8.6, -6.2)} L${pt(s * 11.4, -5.2)}`, c.color, 0.7, { alpha: 0.45 })
      // the long lapel, from the collar's foot down to the top button, slightly rumpled
      solid(ctx, a, `M${pt(s * 7.2, 0)} L${pt(s * 11.5, 7.5)} L${pt(s * 16, 5.5)} L${pt(s * 14.4, 12)} C${pt(s * 12.5, 17)} ${pt(cx + s * 4, v - 4)} ${pt(cx + s * 0.6, v + 1)} L${pt(cx, v + 1)} C${pt(cx + s * 2.4, v - 6)} ${pt(s * 6, 9)} ${pt(s * 7.2, 0)} Z`, c.color, 1.5)
      line(ctx, a, `M${pt(s * 12.8, 10)} C${pt(s * 11.4, 13.5)} ${pt(s * 10.6, 14.5)} ${pt(s * 9.8, 17)}`, c.color, 0.7, { alpha: 0.4 })
    }
    // the front edge and three buttons
    line(ctx, a, `M${pt(cx, v + 1)} L${pt(cx + 0.4, B)}`, c.color, 1.2)
    for (const y of [v + 4, v + 13, v + 22]) if (y < B - 1) line(ctx, a, circle(cx - 2.2, y, 0.95), c.button ?? '#c9b48a', 1.1)
    // the breast pocket on the wearer's left, and the envelope standing out of it
    const px = 12.5 + cx * 0.5, py = 19
    if (c.envelope) envelope(ctx, a, px, py, c)
    solid(ctx, a, `M${pt(px - 4.4, py)} L${pt(px + 4.2, py - 0.5)} L${pt(px + 4.3, py + 1.2)} L${pt(px - 4.3, py + 1.7)} Z`, c.color, 1.1)
    scarfFront(ctx, a, c)
  },
}

// ---------------------------------------------------------------- Larry: the cardigan at his table

COSTUMES.walkShawlCardigan = {
  back(ctx, a, c) {
    const H = hemOf(a, 50)
    legs(ctx, a, H - 2, '#4a4438')
    solid(ctx, a, body(17.5, 6.6, H, { slope: 7 }), c.color, 1.6)
    line(ctx, a, sleeves(17.5, H, 7), c.color, 0.9, { alpha: 0.45 })
    if (a.floor != null) for (let x = -17; x <= 17; x += 3.4) line(ctx, a, `M${f(x)} ${f(H - 5)} L${f(x)} ${f(H)}`, c.color, 0.6, { alpha: 0.3 })
    scarfBack(ctx, a, c)
  },
  front(ctx, a, c) {
    const cx = a.turn * 4.5
    const B = hemOf(a, 50)
    const v = 22
    solid(ctx, a, `M-6.8 -1.5 L${f(cx)} ${f(v)} L6.8 -1.5 Z`, c.shirt ?? '#dfe6ee', 1, { alpha: 0.7 })
    solid(ctx, a, `M-5.2 -2 L${f(cx * 0.4 - 1.8)} 3.6 L-7 2.8 Z M5.2 -2 L${f(cx * 0.4 + 1.8)} 3.6 L7 2.8 Z`, c.shirt ?? '#dfe6ee', 1.1, { alpha: 0.8 })
    // the knitted fronts, and the thick rolled shawl collar over them
    for (const s of [-1, 1]) {
      solid(ctx, a, `M${pt(s * 7, -1.5)} L${pt(cx + s * 1.4, v)} L${pt(cx + s * 1.4, B)} L${pt(s * 15, B)} L${pt(s * 13, 4)} Z`, c.color, 1.3)
      solid(ctx, a, `M${pt(s * 6.4, -2.2)} C${pt(s * 12.5, 1)} ${pt(s * 12, v * 0.6)} ${pt(cx + s * 1.4, v + 1)} L${pt(cx + s * 0.2, v - 2)} C${pt(s * 4.5, v * 0.55)} ${pt(s * 7.2, 5)} ${pt(s * 3.8, -1.2)} Z`, c.color, 1.5)
      line(ctx, a, `M${pt(s * 7.8, 0.5)} C${pt(s * 10.6, 4)} ${pt(s * 9.6, v * 0.6)} ${pt(cx + s * 2, v - 1)}`, c.color, 0.7, { alpha: 0.4 })
      // a cable down each front
      let d = ''
      for (let y = v + 2; y < Math.min(B, 70) - 2; y += 4) d += `M${pt(s * 8, y)} L${pt(s * 9.6, y + 2)} L${pt(s * 8, y + 4)} M${pt(s * 11.2, y)} L${pt(s * 9.6, y + 2)} L${pt(s * 11.2, y + 4)} `
      if (d) line(ctx, a, d, c.color, 0.6, { alpha: 0.35 })
    }
    for (let y = v + 4; y < Math.min(B, 64); y += 7) line(ctx, a, circle(cx - 2.4, y, 0.95), c.button ?? '#8a6a3e', 1.2)
    scarfFront(ctx, a, c)
  },
}

// ---------------------------------------------------------------- the crew off duty

/** Al: a heavy crewneck jumper, a ribbed neckband, two cables */
COSTUMES.walkJumper = {
  back(ctx, a, c) {
    const H = hemOf(a, 50)
    legs(ctx, a, H - 2, '#2c4250')
    solid(ctx, a, body(18.5, 7.2, H, { slope: 7.5 }), c.color, 1.7)
    line(ctx, a, sleeves(18.5, H, 7.5), c.color, 0.9, { alpha: 0.45 })
  },
  front(ctx, a, c) {
    const cx = a.turn * 4
    solid(ctx, a, `M-7.6 -1.6 C-5.6 4.2 5.6 4.2 7.6 -1.6 C9.6 3.4 6.4 7.6 0 7.6 C-6.4 7.6 -9.6 3.4 -7.6 -1.6 Z`, c.color, 1.5)
    let ribs = ''
    for (let i = -5; i <= 5; i++) ribs += `M${pt(i * 1.35, 3.2 - Math.abs(i) * 0.3)} L${pt(i * 1.6, 7.2 - Math.abs(i) * 0.55)} `
    line(ctx, a, ribs, c.color, 0.6, { alpha: 0.4 })
    const B = Math.min(a.bottom, 60)
    for (const x of [-6, 6]) {
      let d = ''
      for (let y = 10; y < B - 3; y += 4.5) d += `M${pt(cx + x - 1.8, y)} C${pt(cx + x + 1.8, y + 1.2)} ${pt(cx + x + 1.8, y + 3.3)} ${pt(cx + x - 1.8, y + 4.5)} M${pt(cx + x + 1.8, y)} C${pt(cx + x - 1.8, y + 1.2)} ${pt(cx + x - 1.8, y + 3.3)} ${pt(cx + x + 1.8, y + 4.5)} `
      line(ctx, a, d, c.color, 0.7, { alpha: 0.45 })
    }
  },
}

/** Sibyl: a fine-knit crewneck with a crisp shirt collar laid over it, and a small pendant */
COSTUMES.walkCollaredKnit = {
  back(ctx, a, c) {
    const H = hemOf(a, 48)
    legs(ctx, a, H - 2, '#2a3046')
    solid(ctx, a, body(16.8, 6.4, H, { slope: 7 }), c.color, 1.6)
    line(ctx, a, sleeves(16.8, H, 7), c.color, 0.9, { alpha: 0.4 })
  },
  front(ctx, a, c) {
    const cx = a.turn * 4
    const trim = c.trim ?? '#eef6f8'
    solid(ctx, a, `M-7 -1.6 C-5.2 3.6 5.2 3.6 7 -1.6 C8.6 2.8 6 6.4 0 6.4 C-6 6.4 -8.6 2.8 -7 -1.6 Z`, c.color, 1.4)
    for (const s of [-1, 1]) solid(ctx, a, `M${pt(s * 5.6, -2.2)} C${pt(s * 7.6, 1.4)} ${pt(s * 7.8, 4.6)} ${pt(s * 7, 6.6)} L${pt(cx * 0.3 + s * 0.5, 4.4)} C${pt(s * 2.6, 2.6)} ${pt(s * 4.2, 0)} ${pt(s * 5.6, -2.2)} Z`, trim, 1.1)
    line(ctx, a, `M${pt(cx * 0.3 - 2.6, 5.6)} C${pt(cx * 0.3 - 1.6, 11)} ${pt(cx * 0.3 + 1.6, 11)} ${pt(cx * 0.3 + 2.6, 5.6)}`, trim, 0.7, { alpha: 0.6 })
    line(ctx, a, circle(cx * 0.3, 11.6, 0.9), trim, 1.1, { hot: true })
    if (a.bottom > 30) line(ctx, a, `M-17 ${f(Math.min(a.bottom, 48) - 4)} L17 ${f(Math.min(a.bottom, 48) - 4)}`, c.color, 0.7, { alpha: 0.3 })
  },
}

/** Hy: a soft shirt with an open camp collar over a dark tee, a breast pocket */
COSTUMES.walkOpenShirt = {
  back(ctx, a, c) {
    const H = hemOf(a, 48)
    legs(ctx, a, H - 2, '#3a2838')
    solid(ctx, a, body(17.2, 6.4, H, { slope: 6.5 }), c.color, 1.6)
    line(ctx, a, sleeves(17.2, H), c.color, 0.9, { alpha: 0.45 })
  },
  front(ctx, a, c) {
    const cx = a.turn * 4.5
    const B = Math.min(a.bottom, 64)
    solid(ctx, a, `M-6.6 -1.5 L${f(cx)} 15 L6.6 -1.5 Z`, c.under ?? '#3a1d33', 1, { alpha: 0.8 })
    line(ctx, a, `M-5 1.5 C-3 4.2 3 4.2 5 1.5`, c.under ?? '#3a1d33', 0.8, { alpha: 0.7 })
    for (const s of [-1, 1]) solid(ctx, a, `M${pt(s * 6.4, -2)} L${pt(s * 12.5, 4.5)} L${pt(s * 8.4, 9.5)} L${pt(cx + s * 0.8, 15.5)} C${pt(s * 4.6, 8)} ${pt(s * 6, 3)} ${pt(s * 6.4, -2)} Z`, c.color, 1.4)
    line(ctx, a, `M${pt(cx, 15.5)} L${pt(cx + 0.3, B)}`, c.color, 1)
    for (let y = 20; y < B; y += 7) line(ctx, a, circle(cx + 1.4, y, 0.7), c.button ?? '#ffd0ee', 1)
    const px = 10.5 + cx * 0.5
    line(ctx, a, `M${pt(px - 3.6, 15)} L${pt(px - 3.4, 21)} L${pt(px + 3.4, 21)} L${pt(px + 3.6, 15)} Z`, c.color, 0.9, { alpha: 0.6 })
  },
}

/** Eppy: a quarter-zip pullover, its collar standing, the zip half down; no crest, no headset */
COSTUMES.walkQuarterZip = {
  back(ctx, a, c) {
    const H = hemOf(a, 48)
    legs(ctx, a, H - 2, '#3a2a20')
    solid(ctx, a, body(17.5, 7, H, { slope: 7 }), c.color, 1.6)
    // raglan seams from the collar to the underarm
    line(ctx, a, `M-7.5 2 L-17 16 M7.5 2 L17 16`, c.color, 0.8, { alpha: 0.45 })
  },
  front(ctx, a, c) {
    const cx = a.turn * 4.5
    const z = c.zip ?? '#ffe2cc'
    // the standing collar, open at the zip
    for (const s of [-1, 1]) solid(ctx, a, `M${pt(s * 7.4, 3)} L${pt(s * 7, -6)} C${pt(s * 4, -5)} ${pt(s * 1.6, -4.2)} ${pt(cx * 0.3 + s * 0.4, -3)} L${pt(cx * 0.5 + s * 2.8, 9)} C${pt(s * 4, 6.5)} ${pt(s * 6, 4.5)} ${pt(s * 7.4, 3)} Z`, c.color, 1.4)
    line(ctx, a, `M${pt(cx * 0.5, 9)} L${pt(cx * 0.6, 20)}`, z, 1.1, { alpha: 0.8 })
    solid(ctx, a, `M${pt(cx * 0.5 - 0.8, 9)} L${pt(cx * 0.5 + 0.8, 9)} L${pt(cx * 0.5 + 0.6, 12.6)} L${pt(cx * 0.5 - 0.6, 12.6)} Z`, z, 1, { hot: true })
    if (a.bottom > 32) line(ctx, a, `M-18 30 L18 30`, c.color, 0.7, { alpha: 0.35 })
  },
}

// ---------------------------------------------------------------- the busker

/** A short heavy coat, double-breasted, the collar up. His hat is drawn by drawBuskerHat (below). */
COSTUMES.walkBuskerCoat = {
  back(ctx, a, c) {
    const H = hemOf(a, 66)
    legs(ctx, a, H - 2, c.under ?? '#2e2840')
    solid(ctx, a, `M-10.5 3 C-11.5 -2 -11 -6 -9.4 -8.6 C-4 -9.8 4 -9.8 9.4 -8.6 C11 -6 11.5 -2 10.5 3 Z`, c.color, 1.5)
    solid(ctx, a, body(19, 7.4, H, { flare: H > 60 ? 2 : 0 }), c.color, 1.8)
    line(ctx, a, sleeves(19, H), c.color, 1, { alpha: 0.5 })
  },
  front(ctx, a, c) {
    const cx = a.turn * 4.5
    const B = hemOf(a, 66)
    solid(ctx, a, `M-7 -1.5 L${f(cx)} 14 L7 -1.5 Z`, c.under ?? '#2e2840', 1, { alpha: 0.8 })
    for (const s of [-1, 1]) {
      solid(ctx, a, `M${pt(s * 7, -1)} L${pt(s * 8.4, -8)} L${pt(s * 12.4, -6.6)} L${pt(s * 15.6, 6)} L${pt(cx + s * 0.4, 15)} C${pt(s * 4, 9)} ${pt(s * 6.6, 4)} ${pt(s * 7, -1)} Z`, c.color, 1.5)
    }
    // the overlap of a double-breasted front, and two rows of buttons
    line(ctx, a, `M${pt(cx + 4, 15)} L${pt(cx + 4.4, B)}`, c.color, 1.1)
    for (const y of [19, 27, 35]) for (const x of [-3.6, 7.2]) if (y < B - 1) line(ctx, a, circle(cx + x, y, 0.95), c.band ?? '#c9bcff', 1.1)
  },
}

/**
 * The busker's brimmed hat, on his head. A costume hangs from the neck and cannot see where the
 * head is, so the hat is drawn from the scene's drawFront with the head's on-screen crown
 * (show.headOf), which follows the head's turn. It does not see a nod or a tilt: pass the same
 * `tilt` and `nod` you give show.puppet(id) this frame and the hat leans and dips with them. A
 * puppet drawn through a `clip` rectangle needs the same rectangle passed as `clip`.
 */
export function drawBuskerHat(ctx, show, { id = 'busker', tilt = 0, nod = 0, clip = null } = {}) {
  const h = show.headOf(id)
  if (!h) return
  const c = show.puppet(id).look.costume ?? {}
  const k = h.size * 0.0215
  const a = { u: k, noFill: false }
  ctx.save()
  if (clip) {
    ctx.beginPath()
    ctx.rect(clip.x, clip.y, clip.w, clip.h)
    ctx.clip()
  }
  // lean about the middle of the head, then sit the hat on the crown
  ctx.translate(h.x, h.y)
  ctx.rotate(-tilt * 0.9)
  ctx.translate(h.crown[0] - h.x, h.crown[1] - h.y - nod * h.size * 0.28)
  ctx.scale(k, k)
  ctx.translate(0, 10.4)
  const hat = c.hat ?? '#7a6aa0'
  solid(ctx, a, `M-11.5 -6 C-11 -12.5 -7 -15.5 -2 -14 C-1 -14.6 1 -14.6 2 -14 C7 -15.5 11 -12.5 11.5 -6 Z`, hat, 1.5)
  line(ctx, a, `M-1.5 -14 C-0.8 -11.5 0.8 -11.5 1.5 -14`, hat, 0.8, { alpha: 0.5 })
  solid(ctx, a, `M-11.8 -6 L11.8 -6 L11.6 -3.6 L-11.6 -3.6 Z`, c.band ?? '#c9bcff', 1.1)
  solid(ctx, a, `M-15.5 -3.4 C-13 -5.4 13 -5.4 15.5 -3.4 C13.6 -1.6 -13.6 -1.6 -15.5 -3.4 Z`, hat, 1.4)
  ctx.restore()
}

// ---------------------------------------------------------------- dressing, per frame

/** the scarf's amount: 0 before `from`, eased to 1 over `dur` seconds, and 1 from then on */
export function scarfAt(t, from, dur = 2) {
  return smooth((t - from) / dur)
}

/**
 * A partial look for Larry, for show.puppet('larry').dress(...):
 *   garment  'overcoat' (the studio and the street) | 'cardigan' (the table)
 *   scarf    0..1, how much of the scarf is on
 *   envelope true to show the blank pay envelope at the coat's breast pocket (the cardigan has none)
 */
export function larryLook({ garment = 'overcoat', scarf = 0, envelope = false } = {}) {
  const base = garment === 'cardigan' ? OFF_DUTY.larryCardigan : OFF_DUTY.larryCoat
  return { costume: { ...base, scarf: clamp01(scarf), envelope: garment === 'overcoat' && !!envelope } }
}

/** a partial look for one of the six at the table: sibyl, hy, al, dee, pete, eppy */
export function crewLook(id) {
  return { costume: { ...OFF_DUTY[id] } }
}

export const CREW = ['sibyl', 'hy', 'al', 'dee', 'pete', 'eppy']

/**
 * Dress everyone for the walk at time t, from the cues. Call it first thing in direct(t, show).
 * The defaults are the script's cues; pass names or seconds to move them:
 *   scarfOn   when the scarf starts to draw on (it takes `scarfDur` seconds)
 *   envelope  when the envelope starts showing at his pocket
 *   coatOff   when the coat is gone and the cardigan is on (the envelope goes with the coat)
 */
export function dressWalk(show, t, { scarfOn = 'scarf-on', scarfDur = 2, envelope = 'ask', coatOff = 'chair-in' } = {}) {
  const at = (v) => (typeof v === 'number' ? v : show.at(v))
  const off = at(coatOff)
  const garment = t >= off ? 'cardigan' : 'overcoat'
  show.puppet('larry').dress(larryLook({ garment, scarf: scarfAt(t, at(scarfOn), scarfDur), envelope: t >= at(envelope) && t < off }))
  for (const id of CREW) show.puppet(id).dress(crewLook(id))
}
