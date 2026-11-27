// The studio switched off: the pieces the dark studio draws for itself, in the studio's world
// units (2000 × 1125, floor at y 960; packages/show/src/stage/set.js). Kept with the special.
//
// The studio's own desk, ON AIR light and sign carry words (the name plate, LC, ON AIR,
// APPLAUSE), and the special shows no words but OPEN, DON'T WALK and WALK. So those three pieces
// are drawn again here, dark and blank. The couch and the guest chair are drawn again too,
// because the studio draws their fronts after the puppets, where the dimmer cannot reach them.
// Everything is a pure function of its arguments.
import { beam, seg, dot, occlude, rectPath, roundPath, P, mix } from '@late-cluster/show/kit/draw.js'
import { clamp } from '@late-cluster/show/kit/ease.js'

/** the studio's own numbers (set.js), repeated for the pieces drawn again */
export const WIN = { x: 1220, y: 140, w: 740, h: 500 }
export const DESK = { x: 1600, top: 728, w: 360 }
export const FLOOR = 960
/** the mug's base centre, as the studio's desk has it */
export const MUG = { x: DESK.x + 96, y: DESK.top - 14 }
/** the work lamp: its stand's foot and its bulb */
export const LAMP = { x: 1385, bulb: { x: 1408, y: 588 } }
/** the pool of light by the desk, on the floor */
export const POOL = { x: 1520, y: FLOOR + 4, rx: 230, ry: 26 }
/** the exit door, past the desk at the right of the room (beyond the wide's frame) */
export const DOOR = { x0: 2150, x1: 2370, top: 392 }

const WARM = '#ffd79a'
const WARM_HOT = '#fff1d6'

/** the room, barely there: the wall and floor carried on past x 2000, to the exit door */
export function roomBeyond(ctx, a = 1) {
  const p = new Path2D()
  for (let x = 2040; x < 2900; x += 160) {
    if (x > DOOR.x0 - 30 && x < DOOR.x1 + 30) continue
    p.moveTo(x, 90)
    p.lineTo(x, FLOOR)
  }
  beam(ctx, p, P.blueDim, 1, { alpha: 0.18 * a })
  seg(ctx, 2000, FLOOR, 2900, FLOOR, P.blueMid, 1.4, { alpha: 0.8 * a })
  const f = new Path2D()
  for (const y of [990, 1035, 1100]) {
    f.moveTo(2000, y)
    f.lineTo(2900, y)
  }
  beam(ctx, f, P.blueDim, 1, { alpha: 0.32 * a })
}

/** the ON AIR light, off: an empty dark box on its wire (no letters) */
export function onAirDark(ctx) {
  const x = 1250, y = 82, w = 120, h = 38
  seg(ctx, x + w / 2, 64, x + w / 2, y, P.blueDim, 1, { alpha: 0.4 })
  const b = roundPath(x, y, w, h, 6)
  occlude(ctx, b)
  beam(ctx, b, P.onair, 1.4, { alpha: 0.22 })
}

/** the laugh sign, unlit: a dark frame on its two wires (no letters) */
export function signDark(ctx) {
  const x = 970, y = 64, w = 250, h = 46
  seg(ctx, x - w / 2 + 20, 64, x - w / 2 + 20, y, P.blueDim, 1, { alpha: 0.3 })
  seg(ctx, x + w / 2 - 20, 64, x + w / 2 - 20, y, P.blueDim, 1, { alpha: 0.3 })
  const b = rectPath(x - w / 2, y, w, h, 8)
  occlude(ctx, b)
  beam(ctx, b, P.amber, 1.3, { alpha: 0.16 })
}

/** the couch and the guest chair, dark */
export function seatsDark(ctx) {
  const c = roundPath(1150, 610, 250, 180, 30)
  occlude(ctx, c)
  beam(ctx, c, P.cyan, 1.3, { alpha: 0.13 })
  const ch = roundPath(1475 - 80, 560, 160, 230, 40)
  occlude(ctx, ch)
  beam(ctx, ch, P.violet, 1.3, { alpha: 0.14 })
}

/** the city in the window: the skyline (drawn by the caller) under the window's frame */
export function windowFrame(ctx) {
  const { x, y, w, h } = WIN
  const f = new Path2D()
  f.rect(x, y, w, h)
  for (let i = 1; i < 4; i++) {
    f.moveTo(x + (w * i) / 4, y)
    f.lineTo(x + (w * i) / 4, y + h)
  }
  f.moveTo(x, y + h * 0.3)
  f.lineTo(x + w, y + h * 0.3)
  beam(ctx, f, P.blueMid, 1.5, { alpha: 0.6 })
  beam(ctx, rectPath(x - 10, y - 10, w + 20, h + 20), P.blueDim, 1.2, { alpha: 0.45 })
  seg(ctx, x - 22, y + h + 12, x + w + 22, y + h + 12, P.blueMid, 1.3, { alpha: 0.6 })
}

/**
 * The pool of light the work lamp makes, `on` 0..1: a warm patch on the floor and a faint warm
 * cone down from the bulb. No shadows; the lit things are drawn brighter by their own functions.
 */
export function pool(ctx, on) {
  if (on <= 0) return
  const { x, y, rx, ry } = POOL
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  // the warm air round the bulb and down to the floor
  const b = LAMP.bulb
  const g = ctx.createRadialGradient(b.x, b.y, 4, b.x + 40, b.y + 120, 360)
  g.addColorStop(0, `rgba(255, 214, 150, ${0.16 * on})`)
  g.addColorStop(0.45, `rgba(255, 190, 110, ${0.06 * on})`)
  g.addColorStop(1, 'rgba(255, 180, 100, 0)')
  ctx.fillStyle = g
  ctx.fillRect(b.x - 420, b.y - 380, 900, 820)
  // the patch on the floor
  ctx.translate(x, y)
  ctx.scale(1, ry / rx)
  const f = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
  f.addColorStop(0, `rgba(255, 205, 140, ${0.22 * on})`)
  f.addColorStop(0.7, `rgba(255, 190, 120, ${0.08 * on})`)
  f.addColorStop(1, 'rgba(255, 190, 120, 0)')
  ctx.fillStyle = f
  ctx.beginPath()
  ctx.arc(0, 0, rx, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  const e = new Path2D()
  e.ellipse(x, y, rx * 0.82, ry * 0.82, 0, 0, Math.PI * 2)
  beam(ctx, e, WARM, 1.2, { alpha: 0.35 * on })
  const e2 = new Path2D()
  e2.ellipse(x, y, rx * 0.5, ry * 0.5, 0, 0, Math.PI * 2)
  beam(ctx, e2, WARM, 1, { alpha: 0.22 * on })
}

/**
 * The work lamp: a tripod stand, a pole, a short arm and one bare bulb in a wire cage, `on`
 * 0..1. Off, the bulb is a dim outline.
 */
export function workLamp(ctx, on) {
  const { x } = LAMP
  const b = LAMP.bulb
  const metal = mix(P.blueMid, WARM, 0.35 * on)
  const ma = 0.35 + 0.4 * on
  // tripod feet and the pole
  const st = new Path2D()
  st.moveTo(x - 44, FLOOR)
  st.lineTo(x, FLOOR - 70)
  st.lineTo(x + 44, FLOOR)
  st.moveTo(x - 6, FLOOR + 6)
  st.lineTo(x, FLOOR - 70)
  st.moveTo(x, FLOOR - 70)
  st.lineTo(x, b.y + 60)
  beam(ctx, st, metal, 1.5, { alpha: ma })
  // the collar on the pole, and the arm up to the bulb
  seg(ctx, x - 6, FLOOR - 250, x + 6, FLOOR - 250, metal, 1.3, { alpha: ma })
  const arm = new Path2D()
  arm.moveTo(x, b.y + 60)
  arm.lineTo(b.x - 6, b.y + 22)
  beam(ctx, arm, metal, 1.4, { alpha: ma })
  // the socket
  const so = new Path2D()
  so.moveTo(b.x - 12, b.y + 26)
  so.lineTo(b.x - 2, b.y + 12)
  so.lineTo(b.x + 6, b.y + 18)
  so.lineTo(b.x - 4, b.y + 32)
  so.closePath()
  occlude(ctx, so)
  beam(ctx, so, metal, 1.2, { alpha: ma })
  // the bulb, tipped toward the desk
  const bulb = new Path2D()
  bulb.ellipse(b.x + 8, b.y, 13, 17, -0.55, 0, Math.PI * 2)
  if (on > 0) {
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(b.x + 8, b.y, 2, b.x + 8, b.y, 70)
    g.addColorStop(0, `rgba(255, 240, 210, ${0.5 * on})`)
    g.addColorStop(1, 'rgba(255, 220, 160, 0)')
    ctx.fillStyle = g
    ctx.fillRect(b.x - 70, b.y - 70, 156, 140)
    ctx.restore()
    beam(ctx, bulb, WARM_HOT, 2.2, { alpha: on, hot: true })
    dot(ctx, b.x + 8, b.y, 5, WARM_HOT, on)
  } else {
    occlude(ctx, bulb)
    beam(ctx, bulb, P.blueMid, 1.1, { alpha: 0.35 })
  }
  // the wire cage round it
  const cage = new Path2D()
  for (const k of [-1, 0, 1]) {
    cage.moveTo(b.x - 6, b.y + 18)
    cage.quadraticCurveTo(b.x + 8 + k * 30, b.y - 4 + k * 4, b.x + 22 + k * 3, b.y - 22)
  }
  cage.moveTo(b.x - 10, b.y - 8)
  cage.quadraticCurveTo(b.x + 14, b.y - 28, b.x + 34, b.y + 6)
  beam(ctx, cage, metal, 1, { alpha: ma * 0.8 })
  // the cord, down the pole and away along the floor
  const cord = new Path2D()
  cord.moveTo(x + 3, b.y + 70)
  cord.lineTo(x + 3, FLOOR - 80)
  cord.quadraticCurveTo(x + 20, FLOOR, x + 120, FLOOR + 14)
  cord.quadraticCurveTo(x + 220, FLOOR + 26, x - 160, FLOOR + 22)
  beam(ctx, cord, P.blueDim, 1, { alpha: 0.45 })
}

/**
 * Larry's desk, switched off and blank: no name plate, no emblem. Where the lamp's pool reaches
 * (its left end, toward the lamp) the top is drawn warm and bright. `on` is the lamp.
 */
export function deskDark(ctx, on) {
  const { x, top, w } = DESK
  const surf = new Path2D()
  surf.moveTo(x + 20, top - 22)
  surf.lineTo(x + w - 10, top - 22)
  surf.lineTo(x + w, top)
  surf.lineTo(x, top)
  surf.closePath()
  occlude(ctx, surf)
  beam(ctx, surf, P.goldDim, 1.4, { alpha: 0.7 })
  const front = new Path2D()
  front.moveTo(x, top)
  front.lineTo(x + w, top)
  front.lineTo(x + w - 14, FLOOR)
  front.lineTo(x + 14, FLOOR)
  front.closePath()
  occlude(ctx, front)
  beam(ctx, front, P.goldDim, 1.4, { alpha: 0.55 })
  const inset = new Path2D()
  inset.moveTo(x + 30, top + 22)
  inset.lineTo(x + w - 30, top + 22)
  inset.lineTo(x + w - 40, FLOOR - 22)
  inset.lineTo(x + 40, FLOOR - 22)
  inset.closePath()
  beam(ctx, inset, P.goldDim, 1, { alpha: 0.3 })
  // the lit end: the top's near edge and corner in the lamp's pool, warm
  if (on > 0) {
    // the near and far edges of the top, brightest at the lamp's end and fading along the desk
    seg(ctx, x + 20, top - 22, x, top, WARM, 1.6, { alpha: 0.85 * on, hot: true })
    for (let i = 0; i < 4; i++) {
      const u0 = i / 4, u1 = (i + 1) / 4, al = 0.85 * on * (1 - u0) ** 1.6
      seg(ctx, x + 20 + 200 * u0, top - 22, x + 20 + 200 * u1, top - 22, WARM, 1.5, { alpha: al })
      seg(ctx, x + 230 * u0, top, x + 230 * u1, top, WARM, 1.6, { alpha: al })
    }
    seg(ctx, x, top, x + 14, top + 160, WARM, 1.4, { alpha: 0.5 * on })
  }
  // the mug, cold: no steam tonight
  const mx = MUG.x, my = MUG.y
  const mug = new Path2D()
  mug.moveTo(mx - 15, my - 40)
  mug.lineTo(mx - 13, my)
  mug.lineTo(mx + 13, my)
  mug.lineTo(mx + 15, my - 40)
  mug.closePath()
  occlude(ctx, mug)
  const mc = mix(P.sky, WARM, 0.45 * on)
  beam(ctx, mug, mc, 1.5, { alpha: 0.45 + 0.45 * on })
  const rim = new Path2D()
  rim.ellipse(mx, my - 40, 15, 4, 0, 0, Math.PI * 2)
  beam(ctx, rim, mc, 1.2, { alpha: 0.45 + 0.45 * on })
  const hd = new Path2D()
  hd.moveTo(mx + 14, my - 32)
  hd.bezierCurveTo(mx + 30, my - 32, mx + 30, my - 10, mx + 13, my - 10)
  beam(ctx, hd, mc, 1.4, { alpha: 0.4 + 0.4 * on })
}

/**
 * The pay envelope on the desk, blank, leaning against the mug's left side, lit by the lamp.
 * Nothing is written on it.
 */
export function deskEnvelope(ctx, on) {
  const bx = MUG.x - 15, by = MUG.y + 1
  ctx.save()
  ctx.translate(bx, by)
  ctx.rotate(0.2)
  const w = 62, h = 38
  const d = new Path2D()
  d.moveTo(-w, 0)
  d.lineTo(0, 0)
  d.lineTo(0, -h)
  d.lineTo(-w, -h)
  d.closePath()
  occlude(ctx, d)
  const paper = mix('#eef6f8', WARM_HOT, 0.4 * on)
  beam(ctx, d, paper, 1.5, { alpha: 0.5 + 0.45 * on, hot: on > 0.5 })
  // the flap's crease, and nothing else
  const fl = new Path2D()
  fl.moveTo(-w, -h)
  fl.lineTo(-w / 2, -h * 0.42)
  fl.lineTo(0, -h)
  beam(ctx, fl, paper, 1, { alpha: 0.35 + 0.3 * on })
  ctx.restore()
}

/**
 * The exit door, `open` 0..1: a plain steel door with a push bar, hinged on its right edge and
 * swinging away from us into the dark. The doorway behind it is black.
 */
export function exitDoor(ctx, open, light = 1) {
  const { x0, x1, top } = DOOR
  const a = 0.35 + 0.35 * light
  // the frame
  const fr = new Path2D()
  fr.moveTo(x0 - 14, FLOOR)
  fr.lineTo(x0 - 14, top - 14)
  fr.lineTo(x1 + 14, top - 14)
  fr.lineTo(x1 + 14, FLOOR)
  occlude(ctx, rectPath(x0 - 14, top - 14, x1 - x0 + 28, FLOOR - top + 14))
  beam(ctx, fr, P.blueMid, 1.5, { alpha: a })
  beam(ctx, rectPath(x0, top, x1 - x0, FLOOR - top), P.blueDim, 1.1, { alpha: a * 0.8 })
  // the leaf: its free edge travels toward the hinge as it swings away, and grows a little shorter
  const u = clamp(open)
  const sw = Math.sin((u * Math.PI) / 2)
  const fx = x0 + (x1 - x0) * sw * 0.86
  const shrink = 26 * sw
  const leaf = new Path2D()
  leaf.moveTo(x1, top)
  leaf.lineTo(fx, top + shrink)
  leaf.lineTo(fx, FLOOR - shrink * 0.6)
  leaf.lineTo(x1, FLOOR)
  leaf.closePath()
  occlude(ctx, leaf, '#000')
  beam(ctx, leaf, P.sky, 1.5, { alpha: a + 0.1 })
  // the push bar, across the leaf at waist height, foreshortened with it
  const by = 700
  const bl = fx + (x1 - fx) * 0.12, br = fx + (x1 - fx) * 0.88
  const bar = new Path2D()
  bar.moveTo(bl, by + shrink * 0.1)
  bar.lineTo(br, by + shrink * 0.04)
  bar.moveTo(bl, by + 16 + shrink * 0.1)
  bar.lineTo(br, by + 16 + shrink * 0.04)
  beam(ctx, bar, P.sky, 1.3, { alpha: a })
  // a kick plate along the bottom
  seg(ctx, fx + 6, FLOOR - 60 - shrink * 0.4, x1 - 6, FLOOR - 60, P.sky, 1, { alpha: a * 0.6 })
}

