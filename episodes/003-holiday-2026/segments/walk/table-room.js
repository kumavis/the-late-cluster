// The table's room and everything on the table, drawn in the room's own world units.
//
// Two views of one room, because the scene has two places to stand: the DOOR (the room seen
// from its doorway, the long table across the frame, the six on its far side, the gold chair on
// the near side with its back to us) and the SEAT (the room from our chair at the table: the far
// side of the table across the frame at table height, the six spread along it). Each view is its
// own world; table.js picks the camera into it. Every function here is a pure function of its
// arguments: nothing is kept between frames.
//
// Nothing here has words on it, and nothing is held by a hand.
import { beam, occlude, mix } from '@late-cluster/show/kit/draw.js'
import { clamp, smoothstep, noise1, hash01 } from '@late-cluster/show/kit/ease.js'

// ---------------------------------------------------------------- colours of the room

export const C = {
  wall: '#120904', // the warm wash on the walls (a fill, very dark)
  wallLine: '#b07a44',
  cloth: '#ffe2b8', // the tablecloth's lines
  wood: '#c98a4a',
  plate: '#fff1dc',
  glass: '#e9f2ff',
  flame: '#ffc861',
  lamp: '#ffd38a',
  night: '#05081a', // through the glass
  nightLine: '#5a78c8',
  gold: '#ffc861',
  goldHot: '#ffe2a0',
  chair: '#8a6a4a',
  food: '#ffb35c',
  steam: '#fff4e6',
}

const TAU = Math.PI * 2

// ---------------------------------------------------------------- small path helpers

export function poly(pts, close = false) {
  const p = new Path2D()
  pts.forEach(([x, y], i) => (i ? p.lineTo(x, y) : p.moveTo(x, y)))
  if (close) p.closePath()
  return p
}
export function ell(cx, cy, rx, ry, a0 = 0, a1 = TAU) {
  const p = new Path2D()
  p.ellipse(cx, cy, Math.max(0.1, rx), Math.max(0.1, ry), 0, a0, a1)
  return p
}
const ln = (ctx, pts, color, w, alpha = 1, hot = false) => beam(ctx, poly(pts), color, w, { alpha, hot })

// ---------------------------------------------------------------- things on the table

/** a plate seen from `tilt` (ry / rx); `food` 0..1 puts a helping on it */
export function plate(ctx, x, y, rx, { tilt = 0.24, w = 1.2, alpha = 0.7, food = 0, seed = 0 } = {}) {
  const ry = rx * tilt
  occlude(ctx, ell(x, y, rx, ry))
  beam(ctx, ell(x, y, rx, ry), C.plate, w, { alpha })
  beam(ctx, ell(x, y + ry * 0.08, rx * 0.66, ry * 0.62), C.plate, w * 0.8, { alpha: alpha * 0.45 })
  if (food > 0) {
    // a helping: a mound and a spoonful beside it, warm
    const k = food
    const m = new Path2D()
    m.moveTo(x - rx * 0.42, y + ry * 0.1)
    m.bezierCurveTo(x - rx * 0.36, y - ry * 1.5 * k, x + rx * 0.06, y - ry * 1.7 * k, x + rx * 0.12, y + ry * 0.12)
    occlude(ctx, m)
    beam(ctx, m, C.food, w * 1.1, { alpha: 0.85 * alpha + 0.1 })
    const s = new Path2D()
    s.moveTo(x + rx * 0.1, y + ry * 0.2)
    s.bezierCurveTo(x + rx * 0.16, y - ry * 0.9 * k, x + rx * 0.44, y - ry * 0.8 * k, x + rx * 0.48, y + ry * 0.15)
    beam(ctx, s, mix(C.food, '#b6ff5c', 0.35), w, { alpha: 0.8 * alpha })
    for (let i = 0; i < 4; i++) {
      const u = hash01(i, seed + 3)
      const px = x - rx * 0.34 + u * rx * 0.4, py = y - ry * (0.3 + 0.6 * hash01(i, seed + 4)) * k
      beam(ctx, ell(px, py, rx * 0.03, ry * 0.12), C.food, w * 0.8, { alpha: 0.7 * alpha })
    }
  }
}

/** a wine glass standing on the table at (x, y): its foot's centre. Glasses never leave the table. */
export function glass(ctx, x, y, h, { w = 1, alpha = 0.5 } = {}) {
  const bw = h * 0.32, bh = h * 0.42
  const top = y - h
  const bowl = new Path2D()
  bowl.moveTo(x - bw, top)
  bowl.bezierCurveTo(x - bw, top + bh * 0.9, x - bw * 0.3, top + bh, x, top + bh)
  bowl.bezierCurveTo(x + bw * 0.3, top + bh, x + bw, top + bh * 0.9, x + bw, top)
  occlude(ctx, bowl, '#000', 0.6)
  beam(ctx, bowl, C.glass, w, { alpha })
  beam(ctx, ell(x, top, bw, bw * 0.22), C.glass, w * 0.8, { alpha: alpha * 0.7 })
  ln(ctx, [[x, top + bh], [x, y - h * 0.06]], C.glass, w, alpha * 0.8)
  beam(ctx, ell(x, y - h * 0.03, bw * 0.7, bw * 0.16), C.glass, w * 0.8, { alpha: alpha * 0.7 })
  // the room's warm light caught in it
  ln(ctx, [[x - bw * 0.55, top + bh * 0.2], [x - bw * 0.5, top + bh * 0.55]], C.lamp, w * 0.9, alpha * 0.8)
}

/** a candle in a low holder, base at (x, y), with a flame that moves a little */
export function candle(ctx, x, y, h, t, seed = 0, { w = 1.2, alpha = 0.85 } = {}) {
  const cw = h * 0.11
  const top = y - h
  occlude(ctx, poly([[x - cw, y], [x - cw, top], [x + cw, top], [x + cw, y]], true))
  beam(ctx, poly([[x - cw, y], [x - cw, top], [x + cw, top], [x + cw, y]]), C.cloth, w, { alpha: alpha * 0.7 })
  beam(ctx, ell(x, y, cw * 2.4, cw * 0.6), C.wood, w, { alpha: alpha * 0.6 })
  // the flame: a teardrop, its height and lean breathing
  const fh = h * 0.32 * (1 + 0.1 * noise1(t * 3.1, seed + 11))
  const lean = h * 0.035 * noise1(t * 1.7, seed + 12)
  const fw = h * 0.07
  const by = top - h * 0.03
  const f = new Path2D()
  f.moveTo(x, by)
  f.bezierCurveTo(x - fw * 1.3, by - fh * 0.25, x - fw * 0.4 + lean, by - fh * 0.75, x + lean * 1.6, by - fh)
  f.bezierCurveTo(x + fw * 0.4 + lean, by - fh * 0.75, x + fw * 1.3, by - fh * 0.25, x, by)
  beam(ctx, f, C.flame, w * 1.3, { alpha, hot: true })
  beam(ctx, ell(x + lean * 0.5, by - fh * 0.45, fh * 0.9, fh * 0.9), C.flame, w, { alpha: 0.12 * alpha })
}

/**
 * The big dish nobody names: an oval platter, covered by a domed lid in the first wide, uncovered
 * from `served` on (the lid is never seen to move: it is there before the cut and not after).
 * Steam goes up from it once it is open. (x, y) is the platter's centre.
 */
export function dish(ctx, x, y, rw, t, { covered = true, w = 1.3, alpha = 0.85, steam = 1 } = {}) {
  const rh = rw * 0.22
  occlude(ctx, ell(x, y, rw, rh))
  beam(ctx, ell(x, y, rw, rh), C.plate, w, { alpha })
  if (covered) {
    const d = new Path2D()
    d.moveTo(x - rw * 0.86, y)
    d.bezierCurveTo(x - rw * 0.86, y - rw * 0.78, x + rw * 0.86, y - rw * 0.78, x + rw * 0.86, y)
    occlude(ctx, d)
    beam(ctx, d, C.plate, w * 1.1, { alpha })
    beam(ctx, ell(x, y, rw * 0.86, rh * 0.7, 0, Math.PI), C.plate, w * 0.8, { alpha: alpha * 0.6 })
    // the knob, and the lamp's light on the dome
    beam(ctx, ell(x, y - rw * 0.62, rw * 0.08, rw * 0.05), C.plate, w, { alpha })
    const hl = new Path2D()
    hl.moveTo(x - rw * 0.55, y - rw * 0.2)
    hl.bezierCurveTo(x - rw * 0.5, y - rw * 0.45, x - rw * 0.3, y - rw * 0.55, x - rw * 0.1, y - rw * 0.57)
    beam(ctx, hl, C.lamp, w, { alpha: alpha * 0.7 })
    return
  }
  // open: a golden roast, lower and longer than the lid was, scored across, and the things round it
  const m = new Path2D()
  m.moveTo(x - rw * 0.62, y + rh * 0.15)
  m.bezierCurveTo(x - rw * 0.7, y - rw * 0.3, x - rw * 0.3, y - rw * 0.42, x, y - rw * 0.4)
  m.bezierCurveTo(x + rw * 0.35, y - rw * 0.4, x + rw * 0.72, y - rw * 0.28, x + rw * 0.62, y + rh * 0.15)
  m.closePath()
  occlude(ctx, m, '#1c0c02', 1)
  beam(ctx, m, C.food, w * 1.3, { alpha: Math.min(1, alpha + 0.1), hot: true })
  for (let i = 0; i < 5; i++) {
    // the scoring: short curved strokes across the top
    const cx = x - rw * 0.4 + i * rw * 0.2
    const top = y - rw * (0.36 - 0.05 * Math.abs(i - 2))
    const c = new Path2D()
    c.moveTo(cx - rw * 0.06, top + rw * 0.02)
    c.quadraticCurveTo(cx + rw * 0.02, top + rw * 0.12, cx + rw * 0.04, top + rw * 0.26)
    beam(ctx, c, C.food, w * 0.9, { alpha: alpha * 0.75 })
  }
  for (const s of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const gx = x + s * rw * (0.68 + i * 0.08), gy = y - rh * 0.2 + i * rh * 0.3
      beam(ctx, ell(gx, gy, rw * 0.06, rw * 0.04), mix(C.food, '#b6ff5c', 0.5), w * 0.8, { alpha: alpha * 0.7 })
    }
  }
  if (steam > 0) steamOver(ctx, x, y - rw * 0.45, rw, t, steam, w)
}

/** three wisps of steam rising from (x, y), a pure function of t */
export function steamOver(ctx, x, y, rw, t, amount = 1, w = 1) {
  for (let k = 0; k < 3; k++) {
    const x0 = x + (k - 1) * rw * 0.32
    const H = rw * 1.5
    // each wisp is a column whose bright part travels upward and fades
    const pts = []
    for (let i = 0; i <= 14; i++) {
      const u = i / 14
      const yy = y - u * H
      const xx = x0 + rw * 0.12 * Math.sin(u * 5.5 - t * 1.6 + k * 2) + rw * 0.08 * u * noise1(t * 0.5 + k, 70 + k)
      pts.push([xx, yy])
    }
    const ph = ((t * 0.45 + k * 0.33) % 1 + 1) % 1
    // draw it in short pieces so it can fade along its length
    for (let i = 0; i < 14; i++) {
      const u = i / 14
      const a = Math.sin(Math.PI * u) * (0.55 + 0.45 * Math.sin(TAU * (u - ph))) * 0.32 * amount
      if (a <= 0.02) continue
      ln(ctx, [pts[i], pts[i + 1]], C.steam, w * 1.1, a)
    }
  }
}

/** a serving bowl at (x, y) (its rim's centre), rim radius r */
export function bowl(ctx, x, y, r, { w = 1.2, alpha = 0.8, tilt = 0.3, full = 1 } = {}) {
  const ry = r * tilt
  const b = new Path2D()
  b.moveTo(x - r, y)
  b.bezierCurveTo(x - r, y + r * 0.75, x + r, y + r * 0.75, x + r, y)
  b.ellipse(x, y, r, ry, 0, 0, Math.PI, true)
  occlude(ctx, b)
  beam(ctx, b, C.plate, w, { alpha })
  beam(ctx, ell(x, y, r, ry), C.plate, w * 0.9, { alpha: alpha * 0.8 })
  if (full > 0) {
    const f = new Path2D()
    f.moveTo(x - r * 0.8, y - ry * 0.1)
    f.bezierCurveTo(x - r * 0.6, y - r * 0.5, x + r * 0.6, y - r * 0.5, x + r * 0.8, y - ry * 0.1)
    occlude(ctx, f, '#1c0c02', 1)
    beam(ctx, f, C.food, w * 1.2, { alpha: alpha * 0.95, hot: true })
  }
}

/** a fork lying on the table, along the bottom of the frame */
export function fork(ctx, x, y, len, { w = 1.2, alpha = 0.7, angle = -1.45 } = {}) {
  const dx = Math.cos(angle), dy = Math.sin(angle)
  const px = -dy, py = dx
  const hx = x + dx * len * 0.62, hy = y + dy * len * 0.62
  ln(ctx, [[x, y], [hx, hy]], C.plate, w * 1.3, alpha)
  for (let i = -1.5; i <= 1.5; i++) {
    const sx = hx + px * i * len * 0.035, sy = hy + py * i * len * 0.035
    ln(ctx, [[sx, sy], [sx + dx * len * 0.36, sy + dy * len * 0.36]], C.plate, w, alpha)
  }
}

/**
 * A chair with its back to us: two posts, a curved top rail, three slats, and the seat's edge.
 * (x, top) is the middle of its top rail; `seat` the seat's height; `floor` where the legs end.
 */
export function chairBack(ctx, x, top, seat, floor, { width = 70, color = C.chair, w = 1.4, alpha = 0.7, hot = false, fill = true } = {}) {
  const hw = width / 2
  const out = new Path2D()
  out.moveTo(x - hw, floor)
  out.lineTo(x - hw, top + 6)
  out.quadraticCurveTo(x, top - 8, x + hw, top + 6)
  out.lineTo(x + hw, floor)
  out.lineTo(x + hw * 0.86, floor)
  out.lineTo(x + hw * 0.86, seat + 4)
  out.lineTo(x - hw * 0.86, seat + 4)
  out.lineTo(x - hw * 0.86, floor)
  out.closePath()
  if (fill) occlude(ctx, out)
  const back = new Path2D()
  back.moveTo(x - hw, floor)
  back.lineTo(x - hw, top + 6)
  back.quadraticCurveTo(x, top - 8, x + hw, top + 6)
  back.lineTo(x + hw, floor)
  beam(ctx, back, color, w * 1.2, { alpha, hot })
  const rail = new Path2D()
  rail.moveTo(x - hw, top + 18)
  rail.quadraticCurveTo(x, top + 6, x + hw, top + 18)
  beam(ctx, rail, color, w, { alpha: alpha * 0.85 })
  for (const k of [-0.45, 0, 0.45]) ln(ctx, [[x + k * hw, top + 14 + Math.abs(k) * 4], [x + k * hw, seat]], color, w, alpha * 0.7)
  ln(ctx, [[x - hw - 4, seat], [x + hw + 4, seat]], color, w * 1.2, alpha)
  ln(ctx, [[x - hw * 0.86, seat + 4], [x - hw * 0.86, floor]], color, w, alpha * 0.6)
  ln(ctx, [[x + hw * 0.86, seat + 4], [x + hw * 0.86, floor]], color, w, alpha * 0.6)
}

/** a high-backed chair seen from in front, for the head of the table (behind whoever sits in it) */
export function chairFront(ctx, x, top, seat, { width = 120, color = C.wood, w = 1.3, alpha = 0.55 } = {}) {
  const hw = width / 2
  const p = new Path2D()
  p.moveTo(x - hw, seat)
  p.lineTo(x - hw, top + 14)
  p.quadraticCurveTo(x, top - 16, x + hw, top + 14)
  p.lineTo(x + hw, seat)
  occlude(ctx, p)
  beam(ctx, p, color, w, { alpha })
  const q = new Path2D()
  q.moveTo(x - hw + 10, seat)
  q.lineTo(x - hw + 10, top + 22)
  q.quadraticCurveTo(x, top - 2, x + hw - 10, top + 22)
  q.lineTo(x + hw - 10, seat)
  beam(ctx, q, color, w * 0.8, { alpha: alpha * 0.6 })
}

// ---------------------------------------------------------------- the window, the lamp, the walls

/**
 * A window on the back wall with the snow going past it: night beyond the glass, two far roofs
 * with a lit window or two, four panes, a sill and a curtain at each side. The snow is the
 * street's own (seg.street.snow), clipped to the glass and still (walk 0).
 */
export function windowWithSnow(ctx, t, show, street, R, { w = 1.4, snow = 1, alpha = 1 } = {}) {
  const { x, y, w: W, h: H } = R
  const glassP = poly([[x, y], [x + W, y], [x + W, y + H], [x, y + H]], true)
  occlude(ctx, glassP, C.night, 1)
  ctx.save()
  ctx.clip(glassP)
  // the far roofs across the street
  const roof = new Path2D()
  roof.moveTo(x - 4, y + H * 0.78)
  roof.lineTo(x + W * 0.3, y + H * 0.78)
  roof.lineTo(x + W * 0.3, y + H * 0.6)
  roof.lineTo(x + W * 0.62, y + H * 0.6)
  roof.lineTo(x + W * 0.62, y + H * 0.7)
  roof.lineTo(x + W + 4, y + H * 0.7)
  beam(ctx, roof, C.nightLine, w * 0.8, { alpha: 0.35 * alpha })
  for (const [u, v] of [[0.38, 0.66], [0.5, 0.66], [0.8, 0.76]]) {
    const r = poly([[x + W * u, y + H * v], [x + W * u + W * 0.05, y + H * v], [x + W * u + W * 0.05, y + H * v + H * 0.06], [x + W * u, y + H * v + H * 0.06]], true)
    beam(ctx, r, '#ffb35c', w * 0.7, { alpha: 0.35 * alpha })
  }
  if (snow > 0 && street?.snow) {
    // flakes at half size, so a small pane holds a real snowfall
    // the street's snow is sized for the whole street, so a pane this small would hold only a
    // few flakes: lay three copies of the far and middle layers, each its own minutes later in
    // the fall, which reads as one snowfall
    const s = 0.62
    ctx.translate(x, y)
    ctx.scale(s, s)
    const rect = { x: 0, y: 0, w: W / s, h: H / s }
    for (let j = 0; j < 3; j++) {
      for (const layer of ['far', 'mid']) street.snow(ctx, t + 41.3 * j + (layer === 'mid' ? 17.9 : 0), show, { layer, walk: 0, rect, amount: snow, lamps: [] })
    }
    street.snow(ctx, t, show, { layer: 'near', walk: 0, rect, amount: snow, lamps: [] })
  }
  ctx.restore()
  // the frame, the glazing bars, the sill
  beam(ctx, glassP, C.wallLine, w * 1.3, { alpha: 0.8 * alpha })
  ln(ctx, [[x + W / 2, y], [x + W / 2, y + H]], C.wallLine, w, 0.7 * alpha)
  ln(ctx, [[x, y + H / 2], [x + W, y + H / 2]], C.wallLine, w, 0.7 * alpha)
  ln(ctx, [[x - 14, y + H + 8], [x + W + 14, y + H + 8]], C.wallLine, w * 1.2, 0.8 * alpha)
  // curtains, tied back
  for (const s of [-1, 1]) {
    const cx = s < 0 ? x - 6 : x + W + 6
    const c = new Path2D()
    c.moveTo(cx - s * 2, y - 16)
    c.bezierCurveTo(cx + s * 26, y + H * 0.3, cx + s * 4, y + H * 0.55, cx + s * 18, y + H + 30)
    c.lineTo(cx + s * 40, y + H + 30)
    c.bezierCurveTo(cx + s * 30, y + H * 0.5, cx + s * 44, y + H * 0.25, cx + s * 34, y - 16)
    occlude(ctx, c, C.wall, 1)
    beam(ctx, c, '#d0704a', w, { alpha: 0.55 * alpha })
  }
  ln(ctx, [[x - 50, y - 18], [x + W + 50, y - 18]], C.wood, w * 1.2, 0.7 * alpha)
}

/** a standing lamp: its shade lit (the brightest thing in the room is the lamp, by brightness alone) */
export function standingLamp(ctx, x, shadeTop, floor, { w = 1.4, size = 1, alpha = 1 } = {}) {
  const sw = 46 * size, sh = 58 * size
  const sb = shadeTop + sh
  ln(ctx, [[x, sb], [x, floor - 4]], C.wood, w, 0.7 * alpha)
  beam(ctx, ell(x, floor - 3, 26 * size, 5 * size), C.wood, w, { alpha: 0.6 * alpha })
  const shade = poly([[x - sw * 0.6, shadeTop], [x + sw * 0.6, shadeTop], [x + sw, sb], [x - sw, sb]], true)
  occlude(ctx, shade, '#2a1806', 1)
  beam(ctx, shade, C.lamp, w * 1.4, { alpha, hot: true })
  for (const k of [-0.5, 0, 0.5]) ln(ctx, [[x + k * sw * 0.6, shadeTop + 3], [x + k * sw, sb - 2]], C.lamp, w * 0.7, 0.35 * alpha)
  // the pool of light it makes, up and down
  beam(ctx, ell(x, sb + 3, sw * 1.15, 7 * size), C.lamp, w, { alpha: 0.5 * alpha })
  beam(ctx, ell(x, shadeTop + sh * 0.5, sw * 2.2, sh * 1.5), C.lamp, w, { alpha: 0.07 * alpha })
}

/** the warm wash on the walls of a room rect, and a picture rail */
export function walls(ctx, x0, x1, top, floor, { rail = null, w = 1.2 } = {}) {
  occlude(ctx, poly([[x0, top], [x1, top], [x1, floor], [x0, floor]], true), C.wall, 1)
  if (rail != null) ln(ctx, [[x0, rail], [x1, rail]], C.wallLine, w, 0.4)
  ln(ctx, [[x0, floor], [x1, floor]], C.wallLine, w * 1.2, 0.55)
  ln(ctx, [[x0, floor - 22], [x1, floor - 22]], C.wallLine, w, 0.25)
}

// ---------------------------------------------------------------- snow on a coat

/** snow resting on Larry's shoulders, from the street, at the head `h` (show.headOf) */
export function snowOnShoulders(ctx, h, { alpha = 1 } = {}) {
  if (!h) return
  const k = h.size / 300
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = '#eef6ff'
  for (let i = 0; i < 26; i++) {
    const s = i % 2 ? 1 : -1
    const u = hash01(i, 801)
    // along the top of each shoulder, from the collar out (the coat's line, measured on a frame)
    const ax = 0.17 + 0.2 * u
    const dx = s * h.size * ax
    const dy = h.y + h.size * (0.38 + (ax - 0.16) * 0.58) - (hash01(i, 802) * 6 + 2) * k
    const r = (1.2 + 1.6 * hash01(i, 803)) * k
    ctx.globalAlpha = (0.45 + 0.4 * hash01(i, 804)) * alpha
    ctx.beginPath()
    ctx.arc(h.x + dx, dy, r, 0, TAU)
    ctx.fill()
  }
  ctx.restore()
}

export { clamp, smoothstep }
