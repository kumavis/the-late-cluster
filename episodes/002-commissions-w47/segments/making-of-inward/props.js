// making-of-inward: the segment's own props, drawn in stage units from the rig's projector.
// Everything is light on black; anything that sits in front of something else fills black first.
import { beam, beamPts, occlude, label, labelWidth, dot, ring, P, mix } from '@late-cluster/show/kit/draw.js'
import { add, mul, sub } from '@late-cluster/episode/segments/making-of-inward/rig.js'

const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x)

/** a polyline of 3D points through a projector, broken where it passes behind the camera */
export function polyline3(ctx, proj, pts, color, width, o = {}) {
  let run = []
  const flush = () => {
    if (run.length > 1) beamPts(ctx, run, color, width, { alpha: o.alpha ?? 1, hot: o.hot })
    run = []
  }
  for (const p of pts) {
    const s = proj(p)
    if (!s || Math.abs(s[0]) > 6000 || Math.abs(s[1]) > 6000) flush()
    else run.push([s[0], s[1]])
  }
  flush()
}

/** a ring of the throat: centre c, radius R, in the plane normal to y */
export function ringPts(c, R, n = 72) {
  const out = []
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2
    out.push([c[0] + R * Math.cos(a), c[1], c[2] + R * Math.sin(a)])
  }
  return out
}

/** a closed 3D quad, filled black then outlined, if all four corners are in front */
export function quad3(ctx, proj, pts, color, width, o = {}) {
  const s = pts.map(proj)
  if (s.some((p) => !p)) return false
  const path = new Path2D()
  s.forEach((p, i) => (i ? path.lineTo(p[0], p[1]) : path.moveTo(p[0], p[1])))
  path.closePath()
  if (o.fill !== false) occlude(ctx, path, '#000', o.fillAlpha ?? 1)
  beam(ctx, path, color, width, { alpha: o.alpha ?? 1, hot: o.hot })
  return s
}

/**
 * A Larry-sized desk in a head's own frame (body cm: x forward, y up), drawn in front of his body:
 * the top, the front panel and a trim line, as the studio's desk reads from the front.
 */
export function desk3(ctx, proj, color, o = {}) {
  const x0 = o.x0 ?? 3, x1 = o.x1 ?? 19, y0 = o.y0 ?? -15, y1 = o.y1 ?? -36, z = o.z ?? 30
  const w = o.width ?? 1.6, al = o.alpha ?? 1
  // the top, then the front panel
  quad3(ctx, proj, [[x0, y0, -z], [x1, y0, -z], [x1, y0, z], [x0, y0, z]], color, w, { alpha: al * 0.8 })
  quad3(ctx, proj, [[x1, y0, -z], [x1, y1, -z], [x1, y1, z], [x1, y0, z]], color, w, { alpha: al, hot: true })
  polyline3(ctx, proj, [[x1, y0 - 4, -z + 3], [x1, y0 - 4, z - 3]], mix(color, '#000000', 0.3), w * 0.8, { alpha: al * 0.8 })
}

/** a line-drawn ear (unit height s px, centred at x, y), facing left; it listens */
export function ear(ctx, x, y, s, color, o = {}) {
  const al = o.alpha ?? 1
  const k = (px, py) => [x + px * s, y + py * s]
  const P2 = (cmds) => {
    const p = new Path2D()
    for (const c of cmds) {
      if (c[0] === 'M') p.moveTo(...k(c[1], c[2]))
      else if (c[0] === 'C') p.bezierCurveTo(...k(c[1], c[2]), ...k(c[3], c[4]), ...k(c[5], c[6]))
      else if (c[0] === 'L') p.lineTo(...k(c[1], c[2]))
      else if (c[0] === 'Z') p.closePath()
    }
    return p
  }
  // the outer rim: up from the tragus, over the top, down the back, round the lobe
  const outer = P2([
    ['M', -0.16, 0.08],
    ['C', -0.24, -0.25, -0.1, -0.52, 0.12, -0.5],
    ['C', 0.36, -0.48, 0.42, -0.22, 0.36, 0.0],
    ['C', 0.31, 0.18, 0.2, 0.26, 0.16, 0.38],
    ['C', 0.12, 0.52, -0.06, 0.55, -0.08, 0.4],
    ['C', -0.09, 0.32, -0.12, 0.24, -0.16, 0.08],
    ['Z'],
  ])
  occlude(ctx, outer, '#000', al)
  beam(ctx, outer, color, Math.max(1.2, s * 0.018), { alpha: al, hot: true })
  // the fold inside the rim and the bowl
  beam(ctx, P2([['M', -0.02, -0.34], ['C', 0.16, -0.38, 0.27, -0.2, 0.22, 0.0], ['C', 0.19, 0.12, 0.1, 0.18, 0.04, 0.24]]), color, Math.max(1, s * 0.012), { alpha: al * 0.8 })
  beam(ctx, P2([['M', 0.08, -0.16], ['C', -0.04, -0.12, -0.07, 0.04, 0.02, 0.1], ['C', 0.08, 0.14, 0.13, 0.08, 0.12, 0.02]]), color, Math.max(1, s * 0.012), { alpha: al * 0.7 })
  // the opening, a dark dot with a ring
  ring(ctx, x - 0.04 * s, y + 0.02 * s, 0.035 * s, color, Math.max(1, s * 0.01), { alpha: al * 0.8 })
  // sound coming in: three arcs to its left, brightening with the voice
  const lv = o.level ?? 0
  for (let i = 0; i < 3; i++) {
    const r = (0.36 + i * 0.13) * s
    const p = new Path2D()
    p.arc(x - 0.04 * s, y + 0.02 * s, r, Math.PI * 0.8, Math.PI * 1.2)
    beam(ctx, p, color, Math.max(1, s * 0.01), { alpha: al * (0.18 + 0.5 * lv) * (1 - i * 0.25) })
  }
}

/** a label with a black fill behind it (labels sit over lines) */
export function plate(ctx, text, x, y, o = {}) {
  const size = o.size ?? 20
  const w = labelWidth(ctx, text, { size, weight: o.weight, ls: o.ls }) + size * 0.8
  const h = size * 1.5
  const align = o.align ?? 'center'
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w + size * 0.4 : x - size * 0.4
  const al = o.alpha ?? 1
  // the fill comes up faster than the words, so nothing behind shows through them as they fade
  if (o.fill !== false) occlude(ctx, rectPath2(x0, y - h * 0.72, w, h), '#000', Math.min(1, 3 * al))
  if (o.frame) beam(ctx, rectPath2(x0, y - h * 0.72, w, h), o.frame, 1.2, { alpha: al * 0.8 })
  label(ctx, text, x, y, { size, color: o.color ?? P.gold, align, weight: o.weight ?? 'm', ls: o.ls, alpha: al })
  return w
}
function rectPath2(x, y, w, h) {
  const p = new Path2D()
  p.rect(x, y, w, h)
  return p
}

/**
 * A strip of log: a framed band with words. `lit` = how many words are lit (−1: none), `greek`:
 * draw the words as dashes (a line of text too far away, or falling, to be read).
 */
export function strip(ctx, x, y, w, words, o = {}) {
  const al = o.alpha ?? 1
  const color = o.color ?? P.amber
  const size = o.size ?? Math.max(8, w / 34)
  const h = size * 2.1
  const r = rectPath2(x - w / 2, y - h / 2, w, h)
  occlude(ctx, r, '#000', al)
  beam(ctx, r, color, Math.max(1, size * 0.09), { alpha: al * 0.9 })
  // the strip's torn ends
  for (const sx of [-1, 1]) {
    const ex = x + (sx * w) / 2
    const pts = []
    for (let i = 0; i <= 6; i++) pts.push([ex + sx * (i % 2 ? size * 0.35 : 0), y - h / 2 + (h * i) / 6])
    beamPts(ctx, pts, color, Math.max(1, size * 0.08), { alpha: al * 0.7 })
  }
  if (o.greek) {
    let cx = x - w / 2 + size
    for (const wd of words) {
      const ww = wd.length * size * 0.62
      if (cx + ww > x + w / 2 - size * 0.5) break
      beamPts(ctx, [[cx, y], [cx + ww, y]], color, Math.max(1, size * 0.28), { alpha: al * 0.45 })
      cx += ww + size * 0.6
    }
    return
  }
  const lit = o.lit ?? -1
  const sp = size * 0.55
  const ws = words.map((wd) => labelWidth(ctx, wd, { size, ls: 0.04 }))
  const total = ws.reduce((a, b) => a + b, 0) + sp * (words.length - 1)
  let cx = x - total / 2
  words.forEach((wd, i) => {
    const on = i <= lit
    label(ctx, wd, cx, y + size * 0.36, { size, color: on ? mix(color, '#ffffff', 0.35) : mix(color, '#000000', 0.45), ls: 0.04, weight: on ? 'm' : 'l', alpha: al })
    cx += ws[i] + sp
  })
}

/**
 * The drawing in question: a kazoo that is plainly a submarine (m = 0), redrawn into a kazoo
 * (m = 1). In between, the submarine's giveaways are rubbed out and the kazoo's lines drawn on.
 */
export function kazooDrawing(ctx, x, y, s, m, o = {}) {
  const al = o.alpha ?? 1
  const color = o.color ?? P.gold
  const lw = Math.max(1.1, s * 0.012)
  const k = (px, py) => [x + px * s, y + py * s]
  const sub = 1 - clamp(m * 1.6)
  const kz = clamp(m * 1.6 - 0.6)
  // a page behind it
  const page = rectPath2(x - 0.62 * s, y - 0.42 * s, 1.24 * s, 0.84 * s)
  occlude(ctx, page, '#000', al)
  beam(ctx, page, mix(color, '#000000', 0.5), lw * 0.8, { alpha: al * 0.7 })
  if (sub > 0) {
    // the hull: a capsule
    const hull = new Path2D()
    hull.moveTo(...k(-0.38, -0.1))
    hull.lineTo(...k(0.34, -0.1))
    hull.bezierCurveTo(...k(0.5, -0.1), ...k(0.5, 0.1), ...k(0.34, 0.1))
    hull.lineTo(...k(-0.38, 0.1))
    hull.bezierCurveTo(...k(-0.52, 0.1), ...k(-0.52, -0.1), ...k(-0.38, -0.1))
    beam(ctx, hull, color, lw, { alpha: al * sub, hot: true })
    // the conning tower, the periscope, the propeller, the portholes
    beamPts(ctx, [k(-0.04, -0.1), k(-0.02, -0.22), k(0.14, -0.22), k(0.16, -0.1)], color, lw, { alpha: al * sub })
    beamPts(ctx, [k(0.08, -0.22), k(0.08, -0.32), k(0.15, -0.32)], color, lw, { alpha: al * sub })
    beamPts(ctx, [k(-0.5, 0), k(-0.58, -0.08)], color, lw, { alpha: al * sub })
    beamPts(ctx, [k(-0.5, 0), k(-0.58, 0.08)], color, lw, { alpha: al * sub })
    for (const px of [-0.22, -0.04, 0.14, 0.3]) ring(ctx, ...k(px, 0.01), 0.035 * s, color, lw * 0.8, { alpha: al * sub * 0.9 })
    // little waves under it
    for (const px of [-0.4, -0.1, 0.2]) {
      const p = new Path2D()
      p.moveTo(...k(px, 0.24))
      p.quadraticCurveTo(...k(px + 0.06, 0.2), ...k(px + 0.12, 0.24))
      p.quadraticCurveTo(...k(px + 0.18, 0.28), ...k(px + 0.24, 0.24))
      beam(ctx, p, P.sky, lw * 0.8, { alpha: al * sub * 0.7 })
    }
  }
  if (kz > 0) {
    // drawn on: each stroke grows with kz
    const stroke = (pts, u, w = lw, hot = false) => {
      const n = pts.length - 1
      const upto = clamp(u) * n
      const out = [pts[0]]
      for (let i = 1; i <= n; i++) {
        if (i <= upto) out.push(pts[i])
        else {
          const f = upto - (i - 1)
          if (f > 0) out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f])
          break
        }
      }
      if (out.length > 1) beamPts(ctx, out, color, w, { alpha: al, hot })
    }
    // the body: a tube, wide at the mouthpiece, narrow at the far end
    stroke([k(-0.46, -0.11), k(-0.1, -0.09), k(0.46, -0.055)], kz * 1.4, lw, true)
    stroke([k(-0.46, 0.11), k(-0.1, 0.09), k(0.46, 0.055)], kz * 1.4 - 0.1, lw, true)
    // the open ends
    const endA = [], endB = []
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI * 2
      endA.push(k(-0.46 + 0.035 * Math.cos(a), 0.11 * Math.sin(a)))
      endB.push(k(0.46 + 0.02 * Math.cos(a), 0.055 * Math.sin(a)))
    }
    stroke(endA, kz * 1.6 - 0.4)
    stroke(endB, kz * 1.6 - 0.5)
    // the turret with its membrane on top
    stroke([k(-0.02, -0.093), k(-0.02, -0.17), k(0.16, -0.17), k(0.16, -0.078)], kz * 1.5 - 0.5)
    const cap = []
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI * 2
      cap.push(k(0.07 + 0.09 * Math.cos(a), -0.17 + 0.025 * Math.sin(a)))
    }
    stroke(cap, kz * 1.5 - 0.5)
  }
}

/** a shut door standing on the throat's floor, in the parent's frame: base centre b, height up −x */
export function door3(ctx, proj, b, wdt, ht, color, o = {}) {
  const al = o.alpha ?? 1
  const zA = b[2] - wdt / 2, zB = b[2] + wdt / 2
  const corners = [[b[0], b[1], zA], [b[0] - ht, b[1], zA], [b[0] - ht, b[1], zB], [b[0], b[1], zB]]
  const s = quad3(ctx, proj, corners, color, 1.6, { alpha: al, hot: true })
  if (!s) return null
  // panels and a handle
  const inset = (u, v) => [b[0] - ht * v, b[1], zA + wdt * u]
  quad3(ctx, proj, [inset(0.15, 0.55), inset(0.15, 0.9), inset(0.85, 0.9), inset(0.85, 0.55)], mix(color, '#000000', 0.35), 1.1, { alpha: al, fill: false })
  quad3(ctx, proj, [inset(0.15, 0.08), inset(0.15, 0.32), inset(0.85, 0.32), inset(0.85, 0.08)], mix(color, '#000000', 0.35), 1.1, { alpha: al, fill: false })
  const hd = proj(inset(0.84, 0.46))
  if (hd && hd[1] < 585) dot(ctx, hd[0], hd[1], Math.max(2, hd[3] * 0.1), color, al)
  // where the plate goes
  const pl = proj(inset(0.5, 0.72))
  return pl
}

export { clamp, add, mul, sub }

/** a flat rectangle in the plane normal to y (facing down the throat): centre c, half-sizes hx (up/down, x) and hz (across, z) */
export function rect3(c, hx, hz) {
  return [[c[0] - hx, c[1], c[2] - hz], [c[0] - hx, c[1], c[2] + hz], [c[0] + hx, c[1], c[2] + hz], [c[0] + hx, c[1], c[2] - hz]]
}

/** many small quads (3D corner lists) as one beam, with an optional black fill */
export function quads3(ctx, proj, list, color, width, o = {}) {
  const p = new Path2D()
  let any = false
  for (const pts of list) {
    const s = pts.map(proj)
    if (s.some((q) => !q || Math.abs(q[0]) > 5000 || Math.abs(q[1]) > 5000)) continue
    s.forEach((q, i) => (i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])))
    p.closePath()
    any = true
  }
  if (!any) return
  if (o.fill) occlude(ctx, p, '#000', o.fill)
  beam(ctx, p, color, width, { alpha: o.alpha ?? 1, hot: o.hot })
}

/**
 * The post box of the show's own drawing: no name, no picture (an empty ring), no words but what
 * is typed. `typed` is the text so far; `mention` 0..1 turns it the colour of a mention.
 */
export function postBox(ctx, x, y, w, h, o = {}) {
  const al = o.alpha ?? 1
  const open = o.open ?? 1
  if (open <= 0 || al <= 0) return
  const hh = h * open
  const r = new Path2D()
  const rr = Math.min(18, w * 0.03)
  r.roundRect(x - w / 2, y - hh / 2, w, hh, rr)
  occlude(ctx, r, '#000', Math.min(1, al * 3))
  beam(ctx, r, o.color ?? P.white, 2, { alpha: al * 0.9 })
  if (open < 0.98) return
  // the empty picture, and where a name would go: nothing
  const ax = x - w / 2 + h * 0.3, ay = y - h / 2 + h * 0.3
  ring(ctx, ax, ay, h * 0.14, o.color ?? P.white, 1.6, { alpha: al * 0.8 })
  // the text, typed
  const size = o.size ?? 44
  const tx = x - w / 2 + h * 0.18, ty = y + h * 0.22
  const typed = o.typed ?? ''
  const m = clamp(o.mention ?? 0)
  const col = m > 0 ? mix(P.white, o.mentionColor ?? P.bsky, m) : P.white
  if (typed) label(ctx, typed, tx, ty, { size, color: col, weight: 'm', ls: 0.02, alpha: al })
  const tw = typed ? labelWidth(ctx, typed, { size, weight: 'm', ls: 0.02 }) : 0
  if (m > 0.05) {
    // the mention's underline glow: the act of atting, the biggest thing on screen
    beamPts(ctx, [[tx, ty + size * 0.22], [tx + tw, ty + size * 0.22]], o.mentionColor ?? P.bsky, 2.4, { alpha: al * m, hot: true })
  }
  if (o.cursor) beamPts(ctx, [[tx + tw + size * 0.12, ty - size * 0.78], [tx + tw + size * 0.12, ty + size * 0.12]], P.white, 2, { alpha: al })
}
