// This segment's own props. Two kinds:
//
// Stage units (the news channel): the BREAKING banner and its strap, the guest boxes with their
// glass, the nameplates under them (exact display names and handles, PUPPET · PARODY), and the
// follow spot inside the empty box. The banner and the strap carry only the word BREAKING,
// Larry's sentence as he says it, and THE CLUSTER REACTS: no verdict, name, checking or market.
//
// World units (inside show.world): the hanging zeta, the stage door and its corridor, and the
// proof's pieces (bars, her brackets, the slabs). The proof props are copied from
// riemann-proof-that-fits' props.js.
import { label, labelWidth, beam, beamPts, seg, ring, dot, occlude, rectPath, roundPath, box, P, mix } from '@late-cluster/show/kit/draw.js'
import { clamp, ease } from '@late-cluster/show/kit/ease.js'

export const FLOOR = 960
export const VIOLET = '#a98bff'
export const NEWS_RED = '#ff4a5a'
export const CHROME = '#58f0e8'

// ---------------------------------------------------------------- the news frame (stage units)

export const BANNER = { x: 40, y: 446, w: 250, h: 48 }
export const STRAP = { x: 40, y: 498, w: 1200, h: 90 }

/** the BREAKING banner; a = 0..1, t for the blink */
export function banner(ctx, a, t) {
  if (a <= 0.01) return
  const { x, y, w, h } = BANNER
  box(ctx, x, y, w, h, { color: NEWS_RED, cut: 8, width: 2, alpha: a, fillAlpha: 1, hot: true })
  occlude(ctx, rectPath(x + 4, y + 4, w - 8, h - 8, 6), mix(NEWS_RED, '#000000', 0.55), a)
  const blink = Math.floor(t * 2.4) % 2 === 0 ? 1 : 0.45
  dot(ctx, x + 24, y + h / 2, 6, P.white, a * blink)
  label(ctx, 'BREAKING', x + 44, y + h * 0.72, { size: 28, color: P.white, weight: 'm', ls: 0.22, alpha: a })
}

/** the strap's frame (empty) */
export function strapFrame(ctx, a) {
  if (a <= 0.01) return
  const { x, y, w, h } = STRAP
  box(ctx, x, y, w, h, { color: P.sky, cut: 6, width: 1.5, alpha: 0.95 * a, fillAlpha: 0.94 })
  seg(ctx, x + 12, y + 12, x + 12, y + h - 12, NEWS_RED, 4, { hot: true, alpha: a })
}

/**
 * Lay the headline's words into the strap: two lines, the largest size that fits.
 * words: [[t0, t1, text]…] → { size, items: [{ x, y, w, text, t0, t1 }] }
 */
export function layoutHeadline(ctx, words) {
  const maxW = STRAP.w - 60
  for (const size of [26, 24, 22, 21, 20, 19, 18]) {
    const o = { size, ls: 0.05 }
    const space = labelWidth(ctx, ' ', o)
    const rows = [[]]
    let x = 0
    for (const w of words) {
      const ww = labelWidth(ctx, w[2], o)
      if (x > 0 && x + space + ww > maxW) {
        rows.push([])
        x = 0
      }
      if (x > 0) x += space
      rows[rows.length - 1].push({ x, w: ww, text: w[2], t0: w[0], t1: w[1] })
      x += ww
    }
    if (rows.length <= 2) {
      const lh = size * 1.3
      const top = STRAP.y + STRAP.h / 2 - (rows.length * lh) / 2
      const items = []
      rows.forEach((r, i) => r.forEach((it) => items.push({ ...it, x: STRAP.x + 32 + it.x, y: top + (i + 0.78) * lh })))
      return { size, items }
    }
  }
  return null
}

/** the headline: each word appears as it is said, the word being said lit in the speaker's colour */
export function headline(ctx, H, t, color, a) {
  if (!H || a <= 0.01) return
  for (const it of H.items) {
    if (t < it.t0) continue
    const now = t < it.t1
    label(ctx, it.text, it.x, it.y, { size: H.size, color: now ? color : P.white, weight: now ? 'm' : 'l', ls: 0.05, alpha: a })
    if (now) seg(ctx, it.x, it.y + 6, it.x + it.w, it.y + 6, color, 2, { hot: true, alpha: a })
  }
}

/** THE CLUSTER REACTS, in the strap */
export function reacts(ctx, a) {
  if (a <= 0.01) return
  label(ctx, 'THE CLUSTER REACTS', STRAP.x + 32, STRAP.y + STRAP.h / 2 + 12, { size: 34, color: P.white, weight: 'm', ls: 0.2, alpha: a })
}

// ---------------------------------------------------------------- the guest boxes (stage units)

/** a box's bezel and its dark screen, drawn behind the head */
export function guestBox(ctx, r, on = 1) {
  const outer = roundPath(r.x - 6, r.y - 6, r.w + 12, r.h + 12, 8)
  occlude(ctx, outer)
  beam(ctx, outer, P.blueMid, 1.6)
  const inner = roundPath(r.x, r.y, r.w, r.h, 4)
  occlude(ctx, inner, '#02060b')
  beam(ctx, inner, on > 0.5 ? CHROME : P.blueDim, 1, { alpha: 0.5 + 0.4 * on })
}

/** the box's glass, drawn over the head: scan lines, and the bright line opening out as it comes on */
export function guestGlass(ctx, r, on) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(r.x, r.y, r.w, r.h)
  ctx.clip()
  ctx.globalAlpha = 0.14
  ctx.fillStyle = '#000'
  for (let yy = r.y; yy < r.y + r.h; yy += 3) ctx.fillRect(r.x, yy, r.w, 1.2)
  ctx.restore()
  if (on < 1) {
    const hh = (r.h * clamp(on)) / 2
    occlude(ctx, rectPath(r.x, r.y, r.w, r.h / 2 - hh), '#02060b')
    occlude(ctx, rectPath(r.x, r.y + r.h / 2 + hh, r.w, r.h / 2 - hh), '#02060b')
    seg(ctx, r.x + 4, r.y + r.h / 2 - hh, r.x + r.w - 4, r.y + r.h / 2 - hh, P.white, 1.4, { hot: true, alpha: 1 - on })
    seg(ctx, r.x + 4, r.y + r.h / 2 + hh, r.x + r.w - 4, r.y + r.h / 2 + hh, P.white, 1.4, { hot: true, alpha: 1 - on })
  }
}

/** the parody tag, as the studio's chyron draws it */
export function parodyTag(ctx, x, y, size = 11, alpha = 1) {
  const tw = labelWidth(ctx, 'PUPPET · PARODY', { size, ls: 0.22 }) + 16
  box(ctx, x, y, tw, size * 2, { color: P.amber, cut: 4, width: 1.1, alpha })
  label(ctx, 'PUPPET · PARODY', x + 8, y + size * 1.38, { size, color: P.amber, ls: 0.22, alpha })
  return tw
}
export const parodyTagWidth = (ctx, size = 11) => labelWidth(ctx, 'PUPPET · PARODY', { size, ls: 0.22 }) + 16

/**
 * The nameplate under a box: the exact display name; the exact handle (14 px); PUPPET · PARODY for
 * a puppet of a real account. c: { name, handle?, color, parody }. Returns its height.
 */
export function plate(ctx, x, y, w, c, a = 1) {
  if (a <= 0.01) return 0
  const tagW = c.parody ? parodyTagWidth(ctx) : 0
  const nameW = labelWidth(ctx, c.name, { size: 17, weight: 'm', ls: 0.03 })
  // the tag sits beside the name when there is room, else on a row of its own
  const tagRow = c.parody && 20 + nameW + 10 + tagW > w - 8
  const h = (c.handle ? 52 : 34) + (tagRow ? 28 : 0)
  box(ctx, x, y, w, h, { color: c.color, cut: 6, width: 1.3, alpha: 0.95 * a, fillAlpha: 0.94 })
  seg(ctx, x + 9, y + 8, x + 9, y + h - 8, c.color, 3, { hot: true, alpha: a })
  label(ctx, c.name, x + 20, y + 23, { size: 17, color: P.white, weight: 'm', ls: 0.03, alpha: a })
  if (c.handle) label(ctx, c.handle, x + 20, y + 43, { size: 14, color: mix(c.color, '#ffffff', 0.35), ls: 0.03, alpha: a })
  if (c.parody) {
    if (tagRow) parodyTag(ctx, x + 20, y + h - 30, 11, a)
    else parodyTag(ctx, x + w - tagW - 8, y + 8, 11, a)
  }
  return h
}

/** a follow spot from the top of a box onto its floor: level 0..1 */
export function boxSpot(ctx, r, level) {
  if (level <= 0) return
  const cx = r.x + r.w / 2
  const w0 = r.w * 0.16, w1 = r.w * 0.36
  const y0 = r.y, y1 = r.y + r.h - 14
  ctx.save()
  ctx.beginPath()
  ctx.rect(r.x, r.y, r.w, r.h)
  ctx.clip()
  const p = new Path2D()
  p.moveTo(cx - w0, y0)
  p.lineTo(cx + w0, y0)
  p.lineTo(cx + w1, y1)
  p.lineTo(cx - w1, y1)
  p.closePath()
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(cx - w1, 0, cx + w1, 0)
  g.addColorStop(0, 'rgba(255,244,214,0)')
  g.addColorStop(0.2, `rgba(255,244,214,${0.1 * level})`)
  g.addColorStop(0.5, `rgba(255,244,214,${0.17 * level})`)
  g.addColorStop(0.8, `rgba(255,244,214,${0.1 * level})`)
  g.addColorStop(1, 'rgba(255,244,214,0)')
  ctx.fillStyle = g
  ctx.fill(p)
  ctx.beginPath()
  ctx.ellipse(cx, y1, w1, Math.max(6, r.h * 0.05), 0, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,244,214,${0.18 * level})`
  ctx.fill()
  ctx.restore()
  seg(ctx, cx - w0, y0, cx - w1, y1, P.white, 1, { alpha: 0.45 * level })
  seg(ctx, cx + w0, y0, cx + w1, y1, P.white, 1, { alpha: 0.45 * level })
}

/** the account plate inside the empty box: name and handle, lit 0..1 */
export function accountPlate(ctx, cx, cy, lit) {
  const pw = 250, ph = 62
  box(ctx, cx - pw / 2, cy - ph / 2, pw, ph, { color: lit > 0 ? mix(P.sky, '#ffffff', 0.3 * lit) : P.blueDim, cut: 6, width: 1.6, hot: lit > 0.5, fillAlpha: 0.94 })
  if (lit > 0) {
    label(ctx, 'Zeta Of 1', cx, cy - 5, { size: 21, color: P.white, align: 'center', weight: 'm', ls: 0.06, alpha: lit })
    label(ctx, '@zetaof1.bsky.social', cx, cy + 19, { size: 15, color: P.sky, align: 'center', ls: 0.04, alpha: lit })
  }
}

// ---------------------------------------------------------------- the studio (world units)

/** the letter zeta on two wires; drop 0..1 brings it down from the flies */
export function zetaSign(ctx, x, y, size, drop, t, alpha = 1) {
  if (drop <= 0 || alpha <= 0.01) return
  const dy = (1 - ease.outBack(clamp(drop))) * -700
  const yy = y + dy
  const top = yy - size * 0.62
  for (const wx of [x - size * 0.2, x + size * 0.2]) seg(ctx, wx, top - 2000, wx, top, P.blueMid, 1.2, { alpha: 0.7 * alpha })
  seg(ctx, x - size * 0.24, top, x + size * 0.24, top, P.blueMid, 1.6, { alpha: 0.8 * alpha })
  const sway = Math.sin(t * 1.3) * 0.012
  ctx.save()
  ctx.translate(x, yy)
  ctx.rotate(sway)
  ctx.save()
  ctx.font = `300 ${size}px "Hershey", "Archivo", system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineWidth = size * 0.06
  ctx.strokeStyle = '#000'
  ctx.globalAlpha = alpha
  ctx.strokeText('ζ', 0, 0)
  ctx.globalCompositeOperation = 'lighter'
  ctx.shadowColor = P.gold
  ctx.shadowBlur = size * 0.06
  ctx.fillStyle = P.gold
  ctx.fillText('ζ', 0, 0)
  ctx.restore()
  ctx.restore()
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
      const d = Math.pow(0.6, i + 0.6)
      const cy = vy + (FLOOR - vy) * d - 4 * d
      const halfW = Math.min(w * 0.46, 34 * Math.pow(2, i) * d)
      const bh = 44 * d
      const a = clamp(u * 2 - i * 0.15)
      bracketPair(ctx, vx - halfW, vx + halfW, cy, bh, VIOLET, a, Math.max(1.2, 3 * d))
      seg(ctx, vx - halfW, cy, vx + halfW, cy, VIOLET, Math.max(0.8, 1.6 * d), { alpha: 0.7 * a })
    }
    ctx.restore()
  }
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
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.22 * (o.alpha ?? 1)
  ctx.fillStyle = color
  ctx.fill(r)
  ctx.restore()
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
