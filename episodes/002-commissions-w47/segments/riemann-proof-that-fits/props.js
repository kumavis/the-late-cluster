// This segment's own props, drawn in world units (inside show.world): the hanging zeta, the card
// stand with its account plate and the follow spot, the stage door and its corridor, a narrow
// sports desk for Eppy beside the couch, and the proof's pieces (bars, her brackets, the slabs).
import { label, labelWidth, beam, beamPts, seg, ring, occlude, rectPath, box, P, mix } from '@late-cluster/show/kit/draw.js'
import { clamp, ease } from '@late-cluster/show/kit/ease.js'

export const FLOOR = 960
export const VIOLET = '#a98bff'

/** the letter zeta on two wires; drop 0..1 brings it down from the flies */
export function zetaSign(ctx, x, y, size, drop, t) {
  if (drop <= 0) return
  const dy = (1 - ease.outBack(clamp(drop))) * -700
  const yy = y + dy
  const top = yy - size * 0.62
  for (const wx of [x - size * 0.2, x + size * 0.2]) seg(ctx, wx, top - 2000, wx, top, P.blueMid, 1.2, { alpha: 0.7 })
  seg(ctx, x - size * 0.24, top, x + size * 0.24, top, P.blueMid, 1.6, { alpha: 0.8 })
  const sway = Math.sin(t * 1.3) * 0.012 * (1 - clamp(drop - 1))
  ctx.save()
  ctx.translate(x, yy)
  ctx.rotate(sway)
  // a black cut-out first, so the window does not show through the letter
  ctx.save()
  ctx.font = `300 ${size}px "Hershey", "Archivo", system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineWidth = size * 0.06
  ctx.strokeStyle = '#000'
  ctx.strokeText('ζ', 0, 0)
  ctx.globalCompositeOperation = 'lighter'
  ctx.shadowColor = P.gold
  ctx.shadowBlur = size * 0.06
  ctx.fillStyle = P.gold
  ctx.fillText('ζ', 0, 0)
  ctx.restore()
  ctx.restore()
}

/** the empty card stand at Sibyl's side of the stage, with its account plate (lit 0..1) */
export function cardStand(ctx, x, plateLit, t) {
  const top = 700
  occlude(ctx, rectPath(x - 4, top, 8, FLOOR - top))
  seg(ctx, x, top, x, FLOOR - 4, P.blueMid, 2.4, { alpha: 0.9 })
  beamPts(ctx, [[x - 60, FLOOR], [x, FLOOR - 40], [x + 60, FLOOR]], P.blueMid, 2, { alpha: 0.9 })
  // the ledge and the plate on it
  seg(ctx, x - 140, top, x + 140, top, P.sky, 3, { hot: true, alpha: 0.9 })
  const pw = 270, ph = 62
  box(ctx, x - pw / 2, top - ph - 2, pw, ph, { color: plateLit > 0 ? mix(P.sky, '#ffffff', 0.3 * plateLit) : P.blueDim, cut: 6, width: 1.6, hot: plateLit > 0.5 })
  if (plateLit > 0) {
    label(ctx, 'Zeta Of 1', x, top - ph + 22, { size: 22, color: P.white, align: 'center', weight: 'm', ls: 0.06, alpha: plateLit })
    label(ctx, '@zetaof1.bsky.social', x, top - 14, { size: 15, color: P.sky, align: 'center', ls: 0.05, alpha: plateLit })
  }
}

/** a follow spot from the flies onto the stand: level 0..1 */
export function followSpot(ctx, x, level) {
  if (level <= 0) return
  const y0 = -300, y1 = FLOOR
  const w0 = 170, w1 = 235
  const p = new Path2D()
  p.moveTo(x - w0, y0)
  p.lineTo(x + w0, y0)
  p.lineTo(x + w1, y1)
  p.lineTo(x - w1, y1)
  p.closePath()
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(x - w1, 0, x + w1, 0)
  const c = `rgba(255, 244, 214, ${0.14 * level})`
  g.addColorStop(0, 'rgba(255,244,214,0)')
  g.addColorStop(0.2, c)
  g.addColorStop(0.5, `rgba(255, 244, 214, ${0.2 * level})`)
  g.addColorStop(0.8, c)
  g.addColorStop(1, 'rgba(255,244,214,0)')
  ctx.fillStyle = g
  ctx.fill(p)
  // the pool on the floor
  ctx.beginPath()
  ctx.ellipse(x, FLOOR, w1, 26, 0, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255, 244, 214, ${0.16 * level})`
  ctx.fill()
  ctx.restore()
  seg(ctx, x - w0, y0, x - w1, y1, P.white, 1, { alpha: 0.45 * level })
  seg(ctx, x + w0, y0, x + w1, y1, P.white, 1, { alpha: 0.45 * level })
}

export const DOOR = { x0: -90, x1: 60, top: 630 }

/** the stage door at the far left; open 0..1 shows the corridor and the brackets waiting in it */
export function stageDoor(ctx, open, t) {
  const { x0, x1, top } = DOOR
  const w = x1 - x0, h = FLOOR - top
  occlude(ctx, rectPath(x0 - 8, top - 8, w + 16, h + 8))
  box(ctx, x0 - 8, top - 8, w + 16, h + 8, { color: P.sky, width: 2, fill: null })
  const u = clamp(open)
  if (u > 0) {
    // the corridor: perspective lines to a far doorway
    ctx.save()
    ctx.beginPath()
    ctx.rect(x0, top, w, h)
    ctx.clip()
    const vx = (x0 + x1) / 2, vy = top + h * 0.42
    const far = { x0: vx - 12, x1: vx + 12, y0: vy - 22, y1: vy + 18 }
    beam(ctx, rectPath(far.x0, far.y0, far.x1 - far.x0, far.y1 - far.y0), P.blueMid, 1, { alpha: 0.7 })
    for (const [ax, ay, bx, by] of [[x0, top, far.x0, far.y0], [x1, top, far.x1, far.y0], [x0, FLOOR, far.x0, far.y1], [x1, FLOOR, far.x1, far.y1]]) seg(ctx, ax, ay, bx, by, P.blueMid, 1, { alpha: 0.6 })
    // brackets in a line down the corridor, each wider than the last (nearest first)
    for (let i = 0; i < 6; i++) {
      const d = Math.pow(0.6, i + 0.6) // depth scale
      const cy = vy + (FLOOR - vy) * d - 4 * d
      const halfW = Math.min(w * 0.46, 34 * Math.pow(2, i) * d)
      const bh = 44 * d
      const a = clamp(u * 2 - i * 0.15)
      bracketPair(ctx, vx - halfW, vx + halfW, cy, bh, VIOLET, a, Math.max(1.2, 3 * d))
      seg(ctx, vx - halfW, cy, vx + halfW, cy, VIOLET, Math.max(0.8, 1.6 * d), { alpha: 0.7 * a })
    }
    ctx.restore()
  }
  // the door leaf swinging open towards us (it narrows as it turns)
  const lw = w * (1 - 0.82 * ease.outCubic(u))
  const leaf = rectPath(x0, top, lw, h)
  occlude(ctx, leaf)
  beam(ctx, leaf, P.sky, 1.8, { alpha: 0.95 })
  if (lw > 20) ring(ctx, x0 + lw - 14, top + h * 0.55, 4, P.gold, 1.4)
}

/** a pair of round brackets standing on y (their feet), height h, from xa to xb */
export function bracketPair(ctx, xa, xb, y, h, color, alpha = 1, width = 2) {
  if (alpha <= 0) return
  const bulge = Math.max(4, h * 0.22)
  const L = new Path2D()
  L.moveTo(xa + bulge * 0.6, y - h)
  L.quadraticCurveTo(xa - bulge, y - h / 2, xa + bulge * 0.6, y)
  const R = new Path2D()
  R.moveTo(xb - bulge * 0.6, y - h)
  R.quadraticCurveTo(xb + bulge, y - h / 2, xb - bulge * 0.6, y)
  beam(ctx, L, color, width, { alpha, hot: true })
  beam(ctx, R, color, width, { alpha, hot: true })
}

/** one bracket side: which = -1 open '(' at x, +1 close ')' at x */
export function bracketSide(ctx, x, which, y, h, color, alpha = 1, width = 2.4) {
  if (alpha <= 0) return
  const bulge = Math.max(4, h * 0.22)
  const p = new Path2D()
  p.moveTo(x - which * bulge * 0.6, y - h)
  p.quadraticCurveTo(x + which * bulge, y - h / 2, x - which * bulge * 0.6, y)
  beam(ctx, p, color, width, { alpha, hot: true })
}

/** a bar of the proof: x left, width w, from y top to the floor */
export function bar(ctx, x, w, top, bottom, o = {}) {
  const h = bottom - top
  if (h <= 0.2 || w <= 0) return
  const color = o.color ?? VIOLET
  const r = rectPath(x, top, w, h)
  occlude(ctx, r)
  if (o.fill !== false) {
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.globalAlpha = (o.fillAlpha ?? 0.22) * (o.alpha ?? 1)
    ctx.fillStyle = color
    ctx.fill(r)
    ctx.restore()
  }
  beam(ctx, r, color, o.width ?? 1.6, { alpha: o.alpha ?? 1, hot: o.hot })
}

/** a dim ghost of a bar's top: what stands above the guide line (the "at least") */
export function ghost(ctx, x, w, top, bottom, alpha) {
  if (bottom - top <= 0.2) return
  beam(ctx, rectPath(x, top, w, bottom - top), VIOLET, 1, { alpha: 0.35 * alpha, dash: [3, 3] })
}

/** a slab: n pieces stacked (stripes), marked ≥ ½ (mark: 0..2 symbols shown), flash 0..1 */
export function slab(ctx, cx, bottom, w, h, o = {}) {
  const x = cx - w / 2, y = bottom - h
  const r = rectPath(x, y, w, h)
  occlude(ctx, r)
  const flash = clamp(o.flash ?? 0)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.2 + 0.35 * flash
  ctx.fillStyle = VIOLET
  ctx.fill(r)
  ctx.restore()
  const n = o.pieces ?? 1
  if (n > 1 && n <= 32) {
    const p = new Path2D()
    for (let i = 1; i < n; i++) {
      p.moveTo(x + 2, y + (h * i) / n)
      p.lineTo(x + w - 2, y + (h * i) / n)
    }
    beam(ctx, p, VIOLET, n > 8 ? 0.6 : 0.9, { alpha: n > 8 ? 0.35 : 0.55 })
  }
  beam(ctx, r, flash > 0.05 ? mix(VIOLET, '#ffffff', 0.5 * flash) : VIOLET, 1.8 + 1.6 * flash, { hot: true })
  const m = o.mark ?? 2
  if (m > 0) {
    const s = o.markSize ?? 24
    const text = m >= 2 ? '≥ ½' : '≥'
    const tw = labelWidth(ctx, '≥ ½', { size: s, weight: 'm', ls: 0.04 })
    occlude(ctx, rectPath(cx - tw / 2 - 4, bottom - h / 2 - s * 0.72, tw + 8, s * 1.1), '#000', 0.85)
    label(ctx, text, cx - tw / 2, bottom - h / 2 + s * 0.32, { size: s, color: flash > 0.2 ? P.white : mix(VIOLET, '#ffffff', 0.55), weight: 'm', ls: 0.04 })
  }
}

/** a narrow sports desk for Eppy beside the couch (the studio's own is too wide for this floor) */
export function sportsDesk(ctx, x, top, t) {
  const w = 210
  const p = new Path2D()
  p.moveTo(x - w / 2, top)
  p.lineTo(x + w / 2, top)
  p.lineTo(x + w / 2 - 12, FLOOR)
  p.lineTo(x - w / 2 + 12, FLOOR)
  p.closePath()
  occlude(ctx, p)
  beam(ctx, p, P.coral, 1.8, { hot: true })
  seg(ctx, x - w / 2 + 8, top + 22, x + w / 2 - 8, top + 22, P.coral, 1, { alpha: 0.6 })
  for (let i = 0; i < 5; i++) ring(ctx, x - 72 + i * 36, top + 11, 2.5, i % 2 ? P.gold : P.coral, 1.2, { alpha: 0.5 + 0.5 * (Math.floor(t * 3 + i) % 3 === 0 ? 1 : 0.3) })
  label(ctx, 'SPORTS', x, top + 72, { size: 30, align: 'center', color: P.coral, weight: 'm', ls: 0.26 })
}
