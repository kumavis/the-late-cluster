// The finance channel's furniture for riemann-market-wrap. All of it is the show's fiction and looks
// it: arrows that point at nothing, a globe with no map on it, a bell, a DEVELOPING banner, a
// session clock. No graphic carries a number, a symbol, a company's name, a reason or a word about
// the proof. Every drawer is a pure function of what it is given.
import { beam, beamPts, seg, ring, dot, label, labelWidth, box, occlude, rectPath, roundPath, P } from '@late-cluster/show/kit/draw.js'
import { rng } from '@late-cluster/show/kit/ease.js'

export const UP = '#5bff9c'
export const DOWN = '#ff5468'
export const CHROME = '#58f0e8'

/**
 * How lit a graphic is: 0 before `on`, a short sweep up, 1, then a flicker down to 0 after `off`.
 * Returns 0..1.
 */
export function lit(t, on, off = Infinity) {
  if (t < on) return 0
  let a = Math.min(1, (t - on) / 0.25)
  if (t >= off) {
    const u = (t - off) / 0.35
    if (u >= 1) return 0
    const flick = Math.floor((t - off) * 34) % 2 === 0 ? 1 : 0.2
    a *= (1 - u) * flick
  }
  return a
}

/** a small solid-looking triangle arrow (outline beams) at x, y; dir +1 up, -1 down */
export function tri(ctx, x, y, s, dir, color, o = {}) {
  const pts = dir > 0 ? [[x - s, y + s * 0.6], [x, y - s * 0.7], [x + s, y + s * 0.6]] : [[x - s, y - s * 0.6], [x, y + s * 0.7], [x + s, y - s * 0.6]]
  beamPts(ctx, pts, color, o.width ?? 1.6, { alpha: o.alpha ?? 1, hot: o.hot ?? false, close: true })
}

/**
 * A crawl made of arrows only, full width at y. o: { h, speed (units/s, negative = rightward),
 * seed, alpha, stop (seconds: the crawl freezes where it was at that moment and goes to bare
 * lines), color }
 */
export function arrowTicker(ctx, y, t, o = {}) {
  const a = o.alpha ?? 1
  if (a <= 0.01 && !o.bare) return
  const h = o.h ?? 30
  const rail = o.color ?? CHROME
  occlude(ctx, rectPath(0, y, 1280, h), '#000', 1)
  seg(ctx, 0, y, 1280, y, rail, 1.4, { hot: !o.bare, alpha: o.bare ? 0.35 : a })
  seg(ctx, 0, y + h, 1280, y + h, rail, 1, { alpha: o.bare ? 0.3 : a * 0.8 })
  const r = rng(o.seed ?? 7)
  const N = 44, gap = 34
  const items = Array.from({ length: N }, () => ({ dir: r() < 0.5 ? 1 : -1, big: r() < 0.25 }))
  const period = N * gap
  const tt = Math.min(t, o.stop ?? Infinity)
  const off = (((tt * (o.speed ?? 90)) % period) + period) % period
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, y, 1280, h)
  ctx.clip()
  for (let k = 0; k < N * 2; k++) {
    const x = k * gap - off + 12
    if (x < -20 || x > 1300) continue
    const it = items[k % N]
    const s = it.big ? 8.5 : 6.5
    if (o.bare) tri(ctx, x, y + h / 2, s, it.dir, P.blueMid, { alpha: 0.4, width: 1 })
    else tri(ctx, x, y + h / 2, s, it.dir, it.dir > 0 ? UP : DOWN, { alpha: a })
  }
  ctx.restore()
}

/**
 * A wireframe globe with nothing on it: meridians turning, a few parallels, an orbit ring.
 * spin = the rotation phase (radians); a = 0..1 lit.
 */
export function globe(ctx, x, y, R, spin, a = 1, o = {}) {
  if (a <= 0.01) return
  const c = o.color ?? CHROME
  const disc = new Path2D()
  disc.arc(x, y, R, 0, Math.PI * 2)
  occlude(ctx, disc, '#000', 0.9 * Math.min(1, a * 2))
  beam(ctx, disc, c, 1.8, { alpha: a, hot: true })
  // parallels
  for (const lat of [-0.9, -0.5, 0, 0.5, 0.9]) {
    const yy = y + R * Math.sin(lat)
    const rx = R * Math.cos(lat)
    const p = new Path2D()
    p.ellipse(x, yy, rx, rx * 0.16, 0, 0, Math.PI * 2)
    beam(ctx, p, c, 1, { alpha: a * 0.45 })
  }
  // meridians: visible halves only, turning
  for (let k = 0; k < 6; k++) {
    const ph = spin + (k * Math.PI) / 6
    const rx = Math.abs(Math.sin(ph)) * R
    const front = Math.cos(ph) > 0
    const p = new Path2D()
    p.ellipse(x, y, Math.max(0.5, rx), R, 0, -Math.PI / 2, Math.PI / 2, Math.sin(ph) < 0)
    beam(ctx, p, c, 1.1, { alpha: a * (front ? 0.75 : 0.25) })
  }
  // the orbit ring, tilted
  const orb = new Path2D()
  orb.ellipse(x, y, R * 1.32, R * 0.3, -0.32, 0, Math.PI * 2)
  beam(ctx, orb, c, 1, { alpha: a * 0.5 })
  const oa = spin * 0.8
  dot(ctx, x + Math.cos(oa) * R * 1.32 * Math.cos(-0.32) - Math.sin(oa) * R * 0.3 * Math.sin(-0.32), y + Math.cos(oa) * R * 1.32 * Math.sin(-0.32) + Math.sin(oa) * R * 0.3 * Math.cos(-0.32), 3, c, a)
}

/** the globe's spin at t: spins up from `on` and keeps turning */
export function globeSpin(t, on) {
  const u = Math.max(0, t - on)
  // accelerate over the first second, then a steady turn
  return u < 1.2 ? 1.1 * (u * u) / 2.4 + 0.3 : 1.1 * (u - 0.6) + 0.3
}

/** a bell, swinging; ring = 0..1 how hard it is ringing now */
export function bell(ctx, x, y, s, swing, a = 1, ring01 = 0) {
  if (a <= 0.01) return
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(swing)
  const p = new Path2D()
  p.moveTo(-s * 0.15, -s * 0.9)
  p.quadraticCurveTo(-s * 0.55, -s * 0.85, -s * 0.6, -s * 0.2)
  p.quadraticCurveTo(-s * 0.62, s * 0.25, -s * 0.85, s * 0.45)
  p.lineTo(s * 0.85, s * 0.45)
  p.quadraticCurveTo(s * 0.62, s * 0.25, s * 0.6, -s * 0.2)
  p.quadraticCurveTo(s * 0.55, -s * 0.85, s * 0.15, -s * 0.9)
  p.closePath()
  occlude(ctx, p, '#000', 0.9 * a)
  beam(ctx, p, P.gold, 1.8, { alpha: a, hot: true })
  const cl = new Path2D()
  cl.arc(0, s * 0.58, s * 0.14, 0, Math.PI * 2)
  beam(ctx, cl, P.gold, 1.4, { alpha: a })
  ring(ctx, 0, -s * 0.98, s * 0.1, P.gold, 1.2, { alpha: a })
  ctx.restore()
  if (ring01 > 0.02) {
    for (const side of [-1, 1]) {
      for (let k = 0; k < 3; k++) {
        const r0 = s * (0.95 + k * 0.22)
        const p2 = new Path2D()
        p2.arc(x, y, r0, side > 0 ? -0.5 : Math.PI - 0.5 + 1, side > 0 ? 0.5 : Math.PI + 0.5)
        beam(ctx, p2, P.gold, 1.2, { alpha: a * ring01 * (1 - k * 0.28) })
      }
    }
  }
}

/** the DEVELOPING banner (no words but the one) */
export function developing(ctx, x, y, w, h, t, a = 1) {
  if (a <= 0.01) return
  const blink = Math.floor(t * 2.2) % 2 === 0 ? 1 : 0.55
  box(ctx, x, y, w, h, { color: DOWN, cut: 6, width: 1.6, alpha: a, fillAlpha: 0.9 })
  dot(ctx, x + 18, y + h / 2, 5, DOWN, a * blink)
  label(ctx, 'DEVELOPING', x + 34, y + h * 0.7, { size: 18, color: P.white, weight: 'm', ls: 0.22, alpha: a * (0.7 + 0.3 * blink) })
}

/** split-flap cells for the clock; while a cell flips it shows passing digits, never letters */
function clockFlap(ctx, x, y, text, age, size) {
  const cw = size * 0.82, ch = size * 1.3
  for (let i = 0; i < text.length; i++) {
    const cx = x + i * (cw + 3)
    const p = rectPath(cx, y - ch, cw, ch, 2)
    occlude(ctx, p, '#05080c')
    beam(ctx, p, P.blueDim, 1)
    seg(ctx, cx, y - ch / 2, cx + cw, y - ch / 2, '#000', 1.2)
    const settle = 0.25 + i * 0.05
    let chr = text[i]
    // while a cell flips it is blank, with the flap passing over it: a change, never another time
    if (age >= 0 && age < settle && chr !== ' ' && chr !== ':') {
      const u = age / settle
      const fy = y - ch + ch * u
      seg(ctx, cx + 1, fy, cx + cw - 1, fy, P.blueMid, 1.4, { alpha: 0.9 })
      continue
    }
    label(ctx, chr, cx + cw / 2, y - ch * 0.25, { size, align: 'center', color: P.amber, weight: 'm', ls: 0 })
  }
}

/** the channel's header: MARKET WRAP on the left, the session clock on the right */
export function header(ctx, t, clock, clockAge) {
  box(ctx, 20, 8, 250, 40, { color: CHROME, cut: 8, width: 1.6, fillAlpha: 0.92 })
  seg(ctx, 32, 16, 32, 40, CHROME, 4, { hot: true })
  label(ctx, 'MARKET WRAP', 46, 37, { size: 22, color: P.white, weight: 'm', ls: 0.16 })
  // the session clock
  const cx = 1010
  box(ctx, cx, 8, 250, 40, { color: CHROME, cut: 8, width: 1.4, fillAlpha: 0.92 })
  label(ctx, 'FRI', cx + 14, 25, { size: 11, color: CHROME, ls: 0.22 })
  label(ctx, '20 NOV', cx + 14, 41, { size: 11, color: CHROME, ls: 0.22 })
  clockFlap(ctx, cx + 70, 43, clock, clockAge, 17)
  label(ctx, 'EST', cx + 238, 37, { size: 12, align: 'right', color: CHROME, ls: 0.2 })
}

/**
 * An analyst box: a bezel around a screen rect r. state: { on 0..1 (the screen lit), outline
 * (only the bare outline, the wall dimmed) }.
 */
export function analystBox(ctx, r, t, s = {}) {
  const outer = roundPath(r.x - 6, r.y - 6, r.w + 12, r.h + 12, 8)
  if (s.outline) {
    occlude(ctx, outer, '#000', 0.9)
    beam(ctx, outer, P.blueMid, 1, { alpha: 0.35 })
    return
  }
  occlude(ctx, outer)
  beam(ctx, outer, P.blueMid, 1.6)
  const inner = roundPath(r.x, r.y, r.w, r.h, 4)
  occlude(ctx, inner, '#02060b')
  beam(ctx, inner, s.on > 0.5 ? CHROME : P.blueDim, 1, { alpha: 0.5 + 0.4 * (s.on ?? 0) })
  if (!(s.on > 0)) {
    // a dark box: faint scan lines only
    for (let yy = r.y + 8; yy < r.y + r.h - 4; yy += 9) seg(ctx, r.x + 6, yy, r.x + r.w - 6, yy, P.blueDim, 0.8, { alpha: 0.25 })
  }
}

/** the box's screen glass, drawn over the head: scan lines, and the lit flicker as it comes on */
export function analystGlass(ctx, r, t, on) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(r.x, r.y, r.w, r.h)
  ctx.clip()
  ctx.globalAlpha = 0.16
  ctx.fillStyle = '#000'
  for (let yy = r.y; yy < r.y + r.h; yy += 3) ctx.fillRect(r.x, yy, r.w, 1.2)
  ctx.restore()
  if (on < 1) {
    // coming on: a bright line opening out from the middle
    const hh = (r.h * on) / 2
    occlude(ctx, rectPath(r.x, r.y, r.w, r.h / 2 - hh), '#02060b')
    occlude(ctx, rectPath(r.x, r.y + r.h / 2 + hh, r.w, r.h / 2 - hh), '#02060b')
    seg(ctx, r.x + 4, r.y + r.h / 2 - hh, r.x + r.w - 4, r.y + r.h / 2 - hh, P.white, 1.4, { hot: true, alpha: 1 - on })
    seg(ctx, r.x + 4, r.y + r.h / 2 + hh, r.x + r.w - 4, r.y + r.h / 2 + hh, P.white, 1.4, { hot: true, alpha: 1 - on })
  }
}

/** the parody tag, as the studio's chyron draws it */
export function parodyTag(ctx, x, y, size = 11) {
  const tw = labelWidth(ctx, 'PUPPET · PARODY', { size, ls: 0.22 }) + 16
  box(ctx, x, y, tw, size * 2, { color: P.amber, cut: 4, width: 1.1 })
  label(ctx, 'PUPPET · PARODY', x + 8, y + size * 1.38, { size, color: P.amber, ls: 0.22 })
  return tw
}

/**
 * The analyst's nameplate under a box: the exact display name, the exact handle, the parody tag.
 * big: the feature layout's larger plate.
 */
export function plate(ctx, x, y, w, c, o = {}) {
  const big = !!o.big
  const a = o.alpha ?? 1
  if (a <= 0.01) return
  const h = big ? 74 : 46
  box(ctx, x, y, w, h, { color: o.dim ? P.blueMid : c.color, cut: 6, width: 1.3, alpha: (o.dim ? 0.4 : 0.95) * a, fillAlpha: 0.92 })
  if (o.dim) return
  seg(ctx, x + 9, y + 8, x + 9, y + h - 8, c.color, 3, { hot: true, alpha: a })
  const nSize = big ? 22 : 15
  label(ctx, c.name, x + 20, y + (big ? 30 : 20), { size: nSize, color: P.white, weight: 'm', ls: 0.03, alpha: a })
  label(ctx, '@' + c.handle, x + 20, y + (big ? 56 : 38), { size: big ? 15 : 12, color: c.color, ls: 0.04, alpha: a })
  if (big) parodyTag(ctx, x + w - labelWidth(ctx, 'PUPPET · PARODY', { size: 11, ls: 0.22 }) - 28, y + 12, 11)
}
