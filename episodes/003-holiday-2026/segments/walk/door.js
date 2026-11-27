// His door: a brick front in the snow, the warm window on the top floor, the latch. On from
// `apartment-door` until `table-wide`.
//
// The place. His building is on our side of the street, at Larry's own depth, like the
// restaurant: a landmark at the `door` stop on the 'larry' layer, so it slides in and stops with
// the walk at the head of the scene. It is drawn in "door units" (D): the stage pixels of the
// scene's wide shot, mapped into street units by `toD` below, so the layout can be read off one
// frame. A street door with a lit pane over it, three floors of windows above, and one window on
// the top floor warm and crowded: the restaurant's window again, smaller (the same warm fill, the
// same black head-and-shoulder silhouettes rimmed in amber with a nose that shows which way they
// face, a hanging lamp, cold glints on the glass), and we are outside it again.
//
// The watcher. One figure in that window stands still and faces the street, larger than the
// others (nearer the glass), square on (no nose: it is looking out), while the others bob and talk.
// It is there from `apartment-door` on and leaves the window a moment before the latch: it turns
// (the nose comes round) and goes out of the side of the glass. Then the door opens on its own.
//
// The shots, by cue:
//   apartment-door  wide on the front, the street stopping; Larry looking up at the window. He says
//                   "This is me." to us, then turns to the door and starts for it
//   listen-door     medium: he has stopped, turns back to us, and holds (nothing else changes)
//   looks-up        low medium: he says the couplet up toward the window, out of the top of frame
//   guest-1         the window, close: the table, the room, the watcher looking out at us
//   guest-2         the wide again: him outside it. back-to-us: he looks at us; the watcher goes;
//                   let-in: the latch (two ticks), the door swings in, warm light on the snow and on him
import { beam, occlude, rectPath, mix, P } from '@late-cluster/show/kit/draw.js'
import { clamp, smoothstep, noise1, ease } from '@late-cluster/show/kit/ease.js'
import { LARRY } from '@late-cluster/episode/segments/walk/street.js'

// ---------------------------------------------------------------- door units

/** the wide shot's camera; D units are its stage pixels */
const Z = 0.62
const HEAD_D = { x: 400, y: 450 } // where Larry's head sits in it
const CW = { x: LARRY.x - (HEAD_D.x - 640) / Z, y: LARRY.y - (HEAD_D.y - 360) / Z, zoom: Z }
/** D → street units, at the stop */
const toW = (dx, dy) => [CW.x + (dx - 640) / Z, CW.y + (dy - 360) / Z]

// the building, in D
const B = { x0: -70, x1: 1600, top: 20, base: 640 }
const DOOR = { x: 560, w: 100, y: 410 }
const TRANSOM = { y: 380, h: 24 }
const COLS = [110, 330, 545, 785, 1030, 1240]
const FLOORS = [
  { y: 272, h: 70 }, // first
  { y: 172, h: 70 }, // second
  { y: 52, h: 90 }, // top
]
const WARM_COL = 3
const WIN = { x0: 690, x1: 880, y0: 52, y1: 142 } // the warm window

const WARM = mix(P.amber, '#000', 0.84) // the room through the glass (as the restaurant)
const RIM = P.amber
const BRICK = mix(P.coral, '#000', 0.25)
const SNOWC = '#dfeeff'

// ---------------------------------------------------------------- the shots

const camOf = (dx, dy, zoom) => {
  const [x, y] = toW(dx, dy)
  return { x, y, zoom }
}
const CAMS = {
  wide: { ...CW },
  medium: { x: 578, y: 300, zoom: 1.15 },
  up: { x: 674, y: 240, zoom: 0.9 },
  window: camOf(785, 104, 2.1),
}

function shotAt(show, t) {
  if (t < show.at('listen-door')) return 'wide'
  if (t < show.at('looks-up')) return 'medium'
  if (t < show.at('guest-1')) return 'up'
  if (t < show.at('guest-2')) return 'window'
  return 'wide2'
}

/** the azimuth 'camera' resolves to (show.js _resolveAz), so a turn to us can be tweened */
function camAz(x, cam) {
  const sx = (x - cam.x) * cam.zoom
  const side = Math.abs(sx) > 40 ? Math.sign(sx) : -1
  return Math.PI / 2 + side * (0.36 + 0.12 * clamp(Math.abs(sx) / 400))
}
const mixAz = (a, b, u) => a + (b - a) * u

const UP = { az: 0.3, chin: 0.26 } // up at the warm window
const TO_DOOR = 0.02 // the door is on his right

/** the latch: the first tick lets it go, the door swings from the second */
const latch = (show) => show.at('let-in')
const swingStart = (show) => {
  // the second tick at or after let-in, else a quarter second after the cue
  const ticks = (show.sfxList ?? []).filter((x) => x.name.startsWith('tick') && x.t0 >= show.at('let-in') - 0.01)
  return ticks[1]?.t0 ?? show.at('let-in') + 0.25
}
/** 0..1: how far the door has swung in */
function swing(show, t) {
  const t0 = swingStart(show)
  return ease.outCubic(clamp((t - t0) / 1.4))
}
/** the watcher: 0 standing looking out, 1 turned; and how far it has gone out of the window (0..1) */
function watcher(show, t) {
  const L = latch(show)
  return { turn: smoothstep(L - 1.15, L - 0.95, t), gone: ease.inOutSine(clamp((t - (L - 0.95)) / 0.5)) }
}

export default {
  name: 'door',

  direct(t, show, seg) {
    const { street } = seg
    const shot = shotAt(show, t)
    seg.shot(shot)
    const cam = { ...CAMS[shot === 'wide2' ? 'wide' : shot] }
    show.camera(cam)

    // his step toward the door at the end of "started without me", and he stays there
    const sw = show.line('started-without-me')
    const step = 16 * ease.inOutSine(clamp((t - (sw.t0 + 0.95)) / 0.6))
    const pl = street.placeLarry(t, show, seg, { x: LARRY.x + step })
    street.directLandmarks(t, show, seg)
    const larry = show.puppet('larry')
    const us = camAz(pl.x, cam)
    let look = UP.az, chin = UP.chin, tilt = 0

    if (shot === 'wide') {
      // up at the window; "This is me." to us; then up again, and to the door
      const me = show.line('this-is-me')
      const toUs = ease.inOutSine(clamp((t - (me.t0 - 0.35)) / 0.4))
      const upAgain = ease.inOutSine(clamp((t - (sw.t0 + 0.05)) / 0.45))
      const toDoor = ease.inOutSine(clamp((t - (sw.t0 + 0.9)) / 0.4))
      look = mixAz(UP.az, us, toUs)
      chin = UP.chin * (1 - toUs)
      look = mixAz(look, UP.az, upAgain)
      chin += (UP.chin * 0.8 - chin) * upAgain
      look = mixAz(look, TO_DOOR, toDoor)
      chin *= 1 - toDoor
    } else if (shot === 'medium') {
      // he has stopped because we have not moved: back to us, and he holds
      const u = ease.inOutSine(clamp((t - show.at('listen-door')) / 0.55))
      look = mixAz(TO_DOOR, us, u)
      chin = 0
    } else if (shot === 'up') {
      // the couplet, up at the warm window (out of the top of the frame)
      const u = ease.inOutSine(clamp((t - show.at('looks-up')) / 0.6))
      look = mixAz(us, UP.az + 0.04, u)
      chin = (UP.chin + 0.06) * u
    } else if (shot === 'wide2') {
      const L = latch(show)
      const back = ease.inOutSine(clamp((t - (show.at('back-to-us') + 0.05)) / 0.5))
      // caught wanting us to come: a small tilt as he looks at us
      tilt = 0.075 * smoothstep(show.at('back-to-us') + 0.45, show.at('back-to-us') + 0.9, t) * (1 - smoothstep(L + 0.3, L + 0.7, t))
      look = mixAz(UP.az, us, back)
      chin = UP.chin * (1 - back)
      // the latch: he turns to the door after it has gone, then back to us for "Come on up."
      const cu = show.line('come-up')
      const toDoor = ease.inOutSine(clamp((t - (L + 0.45)) / 0.4))
      const toUs = ease.inOutSine(clamp((t - (cu.t0 - 0.45)) / 0.4))
      look = mixAz(look, TO_DOOR + 0.06, toDoor)
      look = mixAz(look, us, toUs)
    }
    larry.lookAt(look)
    if (chin) larry.nod(chin)
    if (tilt) larry.tilt(tilt)
  },

  drawBack(ctx, t, show, seg) {
    seg.street.drawBack(ctx, t, show, { snow: 0 })
    show.world(ctx, (ctx) => {
      const amount = seg.street.snowAmount(t)
      const o = snowOpts(show, t)
      seg.street.snow(ctx, t, show, { ...o, amount, layer: 'far' })
      seg.street.snow(ctx, t, show, { ...o, amount, layer: 'mid' })
    })
  },

  drawFront(ctx, t, show, seg) {
    seg.street.drawFront(ctx, t, show, { snow: 0 })
    show.world(ctx, (ctx) => {
      seg.street.snow(ctx, t, show, { ...snowOpts(show, t), amount: seg.street.snowAmount(t), layer: 'near' })
    })
    // the door's light across him
    const k = swing(show, t)
    if (k > 0 && seg.now.shot === 'wide2') warmOnHim(ctx, show, k)
  },

  landmark: {
    stop: 'door',
    layer: 'larry',
    span: [toW(B.x0, 0)[0], toW(B.x1, 0)[0]],
    front(ctx, t, show, seg, at) {
      // into door units: D (640, 360) is the wide camera's centre, wherever the walk has it now
      ctx.translate(at(CW.x, 'larry') - 640 / Z, CW.y - 360 / Z)
      ctx.scale(1 / Z, 1 / Z)
      building(ctx, t, show)
    },
  },
}

// ---------------------------------------------------------------- snow

/** the snow fills the camera's view; it is brighter under the lit pane and, once open, the doorway */
function snowOpts(show, t) {
  const c = show.cam
  const w = 1280 / c.zoom + 200, h = 720 / c.zoom + 200
  const lamps = [toW(DOOR.x + DOOR.w / 2, TRANSOM.y)]
  if (swing(show, t) > 0.2) lamps.push(toW(DOOR.x + DOOR.w / 2, DOOR.y + 40), toW(DOOR.x + DOOR.w * 0.2, DOOR.y + 120))
  return { rect: { x: c.x - w / 2, y: c.y - h / 2, w, h }, lamps }
}

// ---------------------------------------------------------------- the building, in D

/** a line width in D that stays near `px` stage pixels when the camera is pushed in */
function lw(show, px) {
  const s = show.cam.zoom / Z
  return (px * (1 + (s - 1) * 0.35)) / s
}

function building(ctx, t, show) {
  const front = rectPath(B.x0, B.top, B.x1 - B.x0, 900)
  occlude(ctx, front)
  // the cornice, its snow, and a chimney stack at the right
  const top = new Path2D()
  top.moveTo(B.x0, B.top)
  top.lineTo(B.x1, B.top)
  top.moveTo(B.x0, B.top + 12)
  top.lineTo(B.x1, B.top + 12)
  for (let x = B.x0 + 20; x < B.x1; x += 40) {
    top.moveTo(x, B.top + 12)
    top.lineTo(x, B.top + 20)
  }
  beam(ctx, top, BRICK, lw(show, 1.3), { alpha: 0.6 })
  const chim = rectPath(1120, B.top - 46, 60, 46)
  occlude(ctx, chim)
  beam(ctx, chim, BRICK, lw(show, 1.2), { alpha: 0.5 })
  snowCap(ctx, show, B.x0, B.x1, B.top, 4)
  snowCap(ctx, show, 1116, 1184, B.top - 46, 5)

  // the brick: courses, and joints staggered course by course (faint)
  const brick = new Path2D()
  for (let y = B.top + 34, i = 0; y < B.base; y += 13, i++) {
    brick.moveTo(B.x0, y)
    brick.lineTo(B.x1, y)
    for (let x = B.x0 + (i % 2 ? 0 : 17); x < B.x1; x += 34) {
      brick.moveTo(x, y)
      brick.lineTo(x, y + 13)
    }
  }
  beam(ctx, brick, BRICK, lw(show, 0.8), { alpha: 0.13 })

  // the upper floors' windows
  FLOORS.forEach((F, fi) => {
    COLS.forEach((cx, ci) => {
      const warm = fi === 2 && ci === WARM_COL
      if (warm) return warmWindow(ctx, t, show)
      const w = ci === WARM_COL ? 150 : 78
      darkWindow(ctx, show, cx - w / 2, F.y, w, F.h, ci === WARM_COL)
    })
  })
  // the ground floor: a dark window either side of the door
  darkWindow(ctx, show, 100, 432, 120, 140, true)
  darkWindow(ctx, show, 760, 432, 130, 140, true)
  darkWindow(ctx, show, 1000, 432, 120, 140, true)
  darkWindow(ctx, show, 1200, 432, 120, 140, true)
  door(ctx, t, show)
  pavement(ctx, t, show)
}

/** a line of snow lying along a ledge, a little lumpy */
function snowCap(ctx, show, x0, x1, y, h = 3) {
  const p = new Path2D()
  p.moveTo(x0, y)
  const n = Math.max(2, Math.round((x1 - x0) / 9))
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n
    p.lineTo(x, y - h * (0.55 + 0.45 * Math.sin(i * 1.7 + x0 * 0.01)))
  }
  p.lineTo(x1, y)
  occlude(ctx, p)
  beam(ctx, p, SNOWC, lw(show, 1.1), { alpha: 0.55 })
}

function darkWindow(ctx, show, x, y, w, h, double = false) {
  const r = rectPath(x, y, w, h)
  occlude(ctx, r)
  beam(ctx, r, P.blueDim, lw(show, 1.1), { alpha: 0.55 })
  const bars = new Path2D()
  bars.moveTo(x, y + h * 0.5)
  bars.lineTo(x + w, y + h * 0.5)
  if (double) {
    bars.moveTo(x + w / 2, y)
    bars.lineTo(x + w / 2, y + h)
  }
  beam(ctx, bars, P.blueDim, lw(show, 0.9), { alpha: 0.4 })
  // the lintel and the sill, and the snow on the sill
  const ls = new Path2D()
  ls.moveTo(x - 6, y - 5)
  ls.lineTo(x + w + 6, y - 5)
  ls.moveTo(x - 8, y + h + 4)
  ls.lineTo(x + w + 8, y + h + 4)
  beam(ctx, ls, BRICK, lw(show, 1.2), { alpha: 0.5 })
  snowCap(ctx, show, x - 8, x + w + 8, y + h + 3, 3)
}

/**
 * The warm window: the restaurant's picture again, smaller. Warm fill, a hanging lamp, the table,
 * small figures talking, and the watcher at the glass.
 */
function warmWindow(ctx, t, show) {
  const { x0, x1, y0, y1 } = WIN
  const w = x1 - x0, h = y1 - y0
  const glass = rectPath(x0, y0, w, h)
  occlude(ctx, glass, WARM)
  ctx.save()
  ctx.clip(glass)
  // the back wall's rail, and a picture on it
  const wall = new Path2D()
  wall.moveTo(x0, y0 + 44)
  wall.lineTo(x1, y0 + 44)
  wall.rect(x0 + 120, y0 + 16, 26, 18)
  beam(ctx, wall, P.goldDim, lw(show, 0.9), { alpha: 0.55 })
  // the hanging lamp over the table
  const lx = x0 + 118, ly = y0 + 30
  const cord = new Path2D()
  cord.moveTo(lx, y0)
  cord.lineTo(lx, ly - 9)
  beam(ctx, cord, P.goldDim, lw(show, 0.9), { alpha: 0.8 })
  const shade = new Path2D()
  shade.moveTo(lx - 3, ly - 9)
  shade.lineTo(lx + 3, ly - 9)
  shade.lineTo(lx + 11, ly)
  shade.lineTo(lx - 11, ly)
  shade.closePath()
  occlude(ctx, shade)
  beam(ctx, shade, P.goldMid, lw(show, 1.1), { alpha: 0.85 })
  const bulb = new Path2D()
  bulb.moveTo(lx - 8, ly + 1)
  bulb.lineTo(lx + 8, ly + 1)
  beam(ctx, bulb, '#ffe2a8', lw(show, 1.8), { alpha: 0.95, hot: true })
  // the people at the table, behind it: talking, laughing, turning to each other
  for (const d of DINERS) diner(ctx, show, t, d)
  // the table's edge in front of them, and what is on it
  const table = rectPath(x0 + 58, y0 + 74, 128, 30)
  occlude(ctx, table)
  const top = new Path2D()
  top.moveTo(x0 + 58, y0 + 74)
  top.lineTo(x0 + 186, y0 + 74)
  beam(ctx, top, P.goldMid, lw(show, 1.2), { alpha: 0.8 })
  const things = new Path2D()
  // a big dish in the middle
  things.moveTo(x0 + 114, y0 + 74)
  things.quadraticCurveTo(x0 + 128, y0 + 60, x0 + 142, y0 + 74)
  beam(ctx, things, P.white, lw(show, 0.9), { alpha: 0.45 })
  // the watcher, at the glass, in front of everything in the room
  watcherFigure(ctx, show, t)
  ctx.restore()
  // the frame, the mullion and the transom bar, and cold glints on the glass: we are outside
  const frame = new Path2D()
  frame.rect(x0, y0, w, h)
  frame.moveTo((x0 + x1) / 2, y0)
  frame.lineTo((x0 + x1) / 2, y1)
  frame.moveTo(x0, y0 + 22)
  frame.lineTo(x1, y0 + 22)
  beam(ctx, frame, mix(P.amber, '#000', 0.35), lw(show, 1.4), { alpha: 0.85 })
  const glint = new Path2D()
  for (const [gx, gy, gl] of [[x0 + 14, y0 + 60, 24], [x0 + 22, y0 + 72, 14], [x1 - 40, y0 + 34, 22]]) {
    glint.moveTo(gx, gy)
    glint.lineTo(gx + gl * 0.6, gy - gl)
  }
  beam(ctx, glint, P.sky, lw(show, 0.9), { alpha: 0.28 })
  const ls = new Path2D()
  ls.moveTo(x0 - 8, y0 - 5)
  ls.lineTo(x1 + 8, y0 - 5)
  ls.moveTo(x0 - 10, y1 + 4)
  ls.lineTo(x1 + 10, y1 + 4)
  beam(ctx, ls, BRICK, lw(show, 1.2), { alpha: 0.5 })
  snowCap(ctx, show, x0 - 10, x1 + 10, y1 + 3, 3)
}

/** the people at the table (D, relative to the window): x, head y, radius, facing, rhythm */
const DINERS = [
  { x: 72, y: 62, r: 7.5, face: 1, f: 0.9, ph: 0.3, seed: 1 },
  { x: 100, y: 58, r: 8, face: -1, f: 1.25, ph: 2.1, seed: 2 },
  { x: 146, y: 60, r: 8, face: 1, f: 1.05, ph: 4.0, seed: 3 },
  { x: 172, y: 63, r: 7.5, face: -1, f: 0.8, ph: 1.2, seed: 4 },
]

/** one head-and-shoulders silhouette: filled black, rimmed in amber, nose toward `face` (0: none) */
function silhouette(ctx, show, x, y, r, face, alpha, color = RIM) {
  const p = new Path2D()
  const sw = r * 1.9, sy = y + r * 1.35
  p.moveTo(x - sw, sy + r * 3)
  p.bezierCurveTo(x - sw, sy + r * 0.2, x - sw * 0.7, sy - r * 0.15, x - r * 0.45, sy - r * 0.3)
  p.lineTo(x - r * 0.42, y + r * 0.7)
  p.arc(x, y, r, Math.PI * 0.62, Math.PI * 2.38)
  p.lineTo(x + r * 0.42, sy - r * 0.3)
  p.bezierCurveTo(x + sw * 0.7, sy - r * 0.15, x + sw, sy + r * 0.2, x + sw, sy + r * 3)
  p.closePath()
  occlude(ctx, p)
  beam(ctx, p, color, lw(show, 1.1), { alpha })
  if (face) {
    const nose = new Path2D()
    const nx = x + face * r * 0.96
    nose.moveTo(nx, y - r * 0.12)
    nose.lineTo(nx + face * r * 0.28, y + r * 0.18)
    nose.lineTo(nx, y + r * 0.3)
    nose.closePath()
    occlude(ctx, nose)
    beam(ctx, nose, color, lw(show, 1), { alpha: alpha * 0.85 })
  }
}

function diner(ctx, show, t, d) {
  const laugh = Math.max(0, noise1(t * 0.32 + d.seed * 3.1, d.seed + 20) - 0.15) * 1.6
  const bob = 1.4 * Math.sin(2 * Math.PI * d.f * t + d.ph) + laugh * 2.4 * Math.abs(Math.sin(2 * Math.PI * 4.4 * t + d.ph))
  const lean = d.face * 2 * (0.5 + 0.5 * noise1(t * 0.45 + d.seed, d.seed + 27))
  silhouette(ctx, show, WIN.x0 + d.x + lean, WIN.y0 + d.y + bob, d.r, d.face, 0.62)
}

/**
 * The watcher: standing at the glass in the left pane, square on to the street and still, larger
 * and brighter-rimmed than the people at the table. A moment before the latch it turns (its nose
 * comes round to the right) and goes out of the side of the pane.
 */
function watcherFigure(ctx, show, t) {
  const { turn, gone } = watcher(show, t)
  if (gone >= 1) return
  const x = WIN.x0 + 44 + gone * 120
  const y = WIN.y0 + 46 + 0.6 * Math.sin(t * 1.4) // breathing, nothing more
  silhouette(ctx, show, x, y, 12.5, turn > 0.5 ? 1 : 0, 0.95, P.gold)
}

/** the street door, the lit pane over it, its step; it swings in on its own after the latch */
function door(ctx, t, show) {
  const { x, w, y } = DOOR
  const bottom = B.base - 12
  const h = bottom - y
  // the surround and the lit pane over the door
  const surround = new Path2D()
  surround.rect(x - 10, TRANSOM.y - 10, w + 20, bottom - TRANSOM.y + 10)
  occlude(ctx, surround)
  beam(ctx, surround, BRICK, lw(show, 1.3), { alpha: 0.6 })
  const pane = rectPath(x, TRANSOM.y, w, TRANSOM.h)
  occlude(ctx, pane, mix(P.amber, '#000', 0.6))
  beam(ctx, pane, P.amber, lw(show, 1.3), { alpha: 0.95 })
  const bars = new Path2D()
  for (const k of [0.25, 0.5, 0.75]) {
    bars.moveTo(x + w * k, TRANSOM.y)
    bars.lineTo(x + w * k, TRANSOM.y + TRANSOM.h)
  }
  beam(ctx, bars, mix(P.amber, '#000', 0.3), lw(show, 1), { alpha: 0.7 })
  // the step, with snow on it
  const stepR = rectPath(x - 16, bottom, w + 32, 12)
  occlude(ctx, stepR)
  beam(ctx, stepR, P.blueDim, lw(show, 1.1), { alpha: 0.6 })
  snowCap(ctx, show, x - 16, x + w + 16, bottom, 3)

  // the doorway behind the door: warm, a hall and the bottom of a stair going up
  const s = swing(show, t)
  const L = latch(show)
  const ajar = t >= L ? 1 : 0 // the latch has gone: it stands a hair open
  const open = s * 0.78 // fraction of the width now open
  const hall = rectPath(x, y, w, h)
  if (ajar) {
    occlude(ctx, hall, mix(P.gold, '#000', 0.55))
    const stair = new Path2D()
    for (let i = 0; i < 7; i++) {
      const sy = bottom - 12 - i * 26
      stair.moveTo(x + w * 0.45 + i * 6, sy)
      stair.lineTo(x + w + 4, sy)
    }
    stair.moveTo(x + w * 0.45, bottom - 12)
    stair.lineTo(x + w * 0.45 + 42, bottom - 12 - 6 * 26)
    beam(ctx, stair, mix(P.gold, '#000', 0.2), lw(show, 1), { alpha: 0.55 })
    beam(ctx, hall, P.gold, lw(show, 1.2), { alpha: 0.7 })
  }
  // the door itself: hinged on the left, its free edge coming toward the hinge as it swings in
  const fw = w * (1 - open) - (ajar && s === 0 ? 2.5 : 0)
  const inset = 10 * s // its free edge, further away, looks a little shorter
  const leaf = new Path2D()
  leaf.moveTo(x, y)
  leaf.lineTo(x + fw, y + inset)
  leaf.lineTo(x + fw, bottom - inset * 0.6)
  leaf.lineTo(x, bottom)
  leaf.closePath()
  occlude(ctx, leaf)
  beam(ctx, leaf, P.blueMid, lw(show, 1.3), { alpha: 0.75 })
  const panels = new Path2D()
  const pw = fw * 0.32
  for (const [px, py, ph] of [[fw * 0.14, 16, 82], [fw * 0.54, 16, 82], [fw * 0.14, 118, 90], [fw * 0.54, 118, 90]]) {
    const yi = (inset * px) / Math.max(1, fw)
    panels.moveTo(x + px, y + py + yi)
    panels.lineTo(x + px + pw, y + py + yi + (inset * pw) / Math.max(1, fw))
    panels.lineTo(x + px + pw, y + py + ph - yi * 0.6)
    panels.lineTo(x + px, y + py + ph - yi * 0.6)
    panels.closePath()
  }
  beam(ctx, panels, P.blueDim, lw(show, 1), { alpha: 0.5 })
  if (fw > 20) {
    const knob = new Path2D()
    knob.arc(x + fw - 12, y + h * 0.52, 3, 0, Math.PI * 2)
    beam(ctx, knob, P.goldMid, lw(show, 1.2), { alpha: 0.8 })
  }
}

/** the pavement in front of the building: snow lying, and the light from the open door across it */
function pavement(ctx, t, show) {
  const base = B.base
  const p = new Path2D()
  p.moveTo(B.x0, base)
  p.lineTo(B.x1, base)
  beam(ctx, p, P.blueMid, lw(show, 1.2), { alpha: 0.5 })
  // drifts: soft lines lying along the foot of the wall and across the pavement
  const drift = new Path2D()
  for (const [y, a, ph] of [[base + 14, 6, 0.3], [base + 40, 9, 1.7], [base + 70, 12, 3.1]]) {
    drift.moveTo(B.x0, y)
    for (let x = B.x0; x <= B.x1; x += 30) drift.lineTo(x, y - a * (0.5 + 0.5 * Math.sin(x * 0.011 + ph)))
  }
  beam(ctx, drift, SNOWC, lw(show, 1), { alpha: 0.22 })
  // the door's light falling out across the snow, toward us and over to him
  const s = swing(show, t)
  if (s <= 0) return
  const { x, w } = DOOR
  const reach = s
  const spill = new Path2D()
  spill.moveTo(x, base)
  spill.lineTo(x + w * (0.25 + 0.75 * s), base)
  spill.lineTo(x + w + 160 * reach, base + 120)
  spill.lineTo(x - 380 * reach, base + 120)
  spill.closePath()
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.22 * s
  ctx.fillStyle = mix(P.gold, '#000', 0.35)
  ctx.fill(spill)
  ctx.restore()
  ctx.save()
  ctx.clip(spill)
  beam(ctx, drift, P.gold, lw(show, 1.2), { alpha: 0.55 * s })
  ctx.restore()
}

/** the door's light across him: his lit lines drawn warmer and brighter on the door's side */
function warmOnHim(ctx, show, k) {
  const c = show.cam
  const [dx, dy] = toW(DOOR.x + DOOR.w / 2, DOOR.y + 120)
  const sx = (dx - c.x) * c.zoom + 640, sy = (dy - c.y) * c.zoom + 360
  ctx.save()
  // color-dodge brightens what is lit and leaves black black: no light source, only brighter lines
  ctx.globalCompositeOperation = 'color-dodge'
  const g = ctx.createRadialGradient(sx, sy, 10, sx, sy, 460)
  g.addColorStop(0, `rgba(255,200,120,${(0.26 * k).toFixed(3)})`)
  g.addColorStop(0.6, `rgba(255,200,120,${(0.1 * k).toFixed(3)})`)
  g.addColorStop(1, 'rgba(255,214,140,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1280, 720)
  ctx.restore()
}
