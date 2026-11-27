// The restaurant: a full room behind a big warm window, and one cook in the kitchen hatch at the back.
//
// On from `pass-restaurant` to `walk-on` (index.js SCENES). The place itself is a landmark at the
// `restaurant` stop, on our side of the street at Larry's depth (production/stage/plan.md), so the
// street scenes on either side draw it too: it slides in from the right before this scene and
// away to the left after it.
//
// THE WINDOW (the door's builder echoes it). One plate of glass in a black-filled shopfront. Behind
// it the room is a warm dark fill (amber mixed far into black), a back wall with a rail, two
// hanging lamps (black shades, a hot gold bulb line under each), and two rows of tables. Every
// diner is a head-and-shoulders silhouette: filled black, rimmed in amber, a small nose bump that
// shows which way they face, bobbing on their own rhythm (talk nods, bursts of laughing, leaning
// towards their partner). The front row is bigger and lower than the back row. A few cold, faint
// blue diagonal lines on the glass say "glass" and keep us outside it. The only lit text is a small
// red neon OPEN in the glass's upper left corner. Warmth is colour and brightness only: a lit
// thing is drawn brighter, and Larry, standing at it, gets a faint warm wash (landmark `over`).
//
// THE COOK. The hatch is the brightest thing in the room: a hot gold frame on a pale gold fill,
// with one cook in a tall toque, black against it, behind a board on the hatch's sill. Before
// `cook-slows` he works fast (a 3.2 Hz bob and shoulder rock, big enough to read at 640 × 360).
// At `cook-slows` he stops, leans in close over the board, and from a second later moves again
// at 0.45 Hz, while every diner keeps their own quicker rhythm.
//
// Shots: `window` (the walk in, the stop at the glass, then the push past the tables to the hatch
// at `cook-in-back`), `glass` (close on Larry at the window, turning to us to tell the story),
// `hatch` (the hatch, closer, for `cook-slows`), `watch` (wide enough for both, held).
import { beam, occlude, rectPath, label, labelWidth, mix, P } from '@late-cluster/show/kit/draw.js'
import { clamp, smoothstep, noise1, lerp } from '@late-cluster/show/kit/ease.js'
import { AZ, LARRY, VIEW } from '@late-cluster/episode/segments/walk/street.js'

// ---------------------------------------------------------------- the place, street x at the stop

const LAYER = 'larry'
/** the shopfront: a black block from above the frame down to just over our kerb */
const FRONT = { x0: 586, x1: 1296, top: -260, base: 602 }
/** the glass */
const GLASS = { x0: 628, x1: 1254, y0: 112, y1: 498 }
/** the kitchen hatch in the back wall */
const HATCH = { x: 898, y: 158, w: 224, h: 124 }
const COOK_X = HATCH.x + HATCH.w / 2
const SILL = HATCH.y + HATCH.h
/** the hanging lamps: x, and the bottom of the shade */
const LAMPS = [{ x: 784, y: 206 }, { x: 1190, y: 206 }]
/** rows of tables: the table top's y, the diners' head y and radius, and each table's centre */
const ROWS = [
  { top: 346, head: 318, r: 15.5, spread: 44, tables: [682, 800, 1010, 1190] },
  { top: 436, head: 396, r: 23, spread: 62, tables: [744, 960, 1166] },
]

const WARM = mix(P.amber, '#000', 0.84) // the room, through the glass
const KITCHEN = mix(P.gold, '#000', 0.42) // the hatch: the brightest thing in there
const RIM = P.amber

// ---------------------------------------------------------------- timing

/** the cook: { dy (down +), rock (rad), lean 0..1 } at t */
function cookAt(show, t) {
  const cs = show.at('cook-slows')
  const fast = 1 - smoothstep(cs, cs + 0.16, t)
  const slow = smoothstep(cs + 1.0, cs + 1.7, t)
  const lean = smoothstep(cs + 0.12, cs + 0.85, t) * (1 - 0.3 * smoothstep(cs + 1.2, cs + 2.4, t))
  const wf = 2 * Math.PI * 3.2 * t
  const ws = 2 * Math.PI * 0.45 * (t - cs - 1.0)
  return {
    // fast: a hard downstroke and a quick lift; slow: one long even stroke
    dy: fast * 8 * Math.abs(Math.sin(wf / 2)) + slow * 11 * (0.5 - 0.5 * Math.cos(ws)),
    rock: fast * 0.13 * Math.sin(wf + 0.8) + slow * 0.1 * Math.sin(ws + 0.8),
    lean,
  }
}

/** a line width that stays close to `px` stage pixels when the camera is pushed in */
const lw = (show, px) => (px * (1 + (show.cam.zoom - 1) * 0.35)) / show.cam.zoom

// ---------------------------------------------------------------- drawing

function diner(ctx, show, d, t, dx) {
  // talking nods, a burst of laughing now and then, a lean towards the other side of the table
  const laugh = Math.max(0, noise1(t * 0.32 + d.seed * 3.1, d.seed) - 0.15) * 1.6
  const bob = 2.8 * Math.sin(2 * Math.PI * d.f * t + d.ph) + laugh * 5 * Math.abs(Math.sin(2 * Math.PI * 4.4 * t + d.ph))
  const lean = d.face * 3.5 * (0.5 + 0.5 * noise1(t * 0.45 + d.seed, d.seed + 7))
  const x = dx + d.x + lean * 0.4
  const y = d.y + bob * (d.r / 18)
  const hx = x + lean, r = d.r
  const p = new Path2D()
  // shoulders and chest, then the head on its neck, then the nose on the side it faces
  const sw = r * 1.9, sy = y + r * 1.35
  p.moveTo(x - sw, sy + r * 2.4)
  p.bezierCurveTo(x - sw, sy + r * 0.2, x - sw * 0.7, sy - r * 0.15, x - r * 0.45, sy - r * 0.3)
  p.lineTo(x - r * 0.42, y + r * 0.7)
  p.arc(hx, y, r, Math.PI * 0.62, Math.PI * 2.38)
  p.lineTo(x + r * 0.42, sy - r * 0.3)
  p.bezierCurveTo(x + sw * 0.7, sy - r * 0.15, x + sw, sy + r * 0.2, x + sw, sy + r * 2.4)
  p.closePath()
  const nose = new Path2D()
  const nx = hx + d.face * r * 0.96
  nose.moveTo(nx, y - r * 0.12)
  nose.lineTo(nx + d.face * r * 0.26, y + r * 0.18)
  nose.lineTo(nx, y + r * 0.3)
  nose.closePath()
  occlude(ctx, p)
  occlude(ctx, nose)
  beam(ctx, p, RIM, lw(show, 1.2), { alpha: 0.62 })
  beam(ctx, nose, RIM, lw(show, 1.1), { alpha: 0.5 })
}

function table(ctx, show, x, y, w) {
  const top = rectPath(x - w / 2, y, w, 5)
  occlude(ctx, rectPath(x - w / 2, y, w, 90))
  beam(ctx, top, P.goldMid, lw(show, 1.2), { alpha: 0.7 })
  // two glasses and a candle: small, and only light
  const g = new Path2D()
  for (const gx of [x - w * 0.22, x + w * 0.2]) {
    g.moveTo(gx - 3, y - 9)
    g.lineTo(gx - 2, y - 3)
    g.lineTo(gx + 2, y - 3)
    g.lineTo(gx + 3, y - 9)
    g.moveTo(gx, y - 3)
    g.lineTo(gx, y)
  }
  beam(ctx, g, P.white, lw(show, 0.9), { alpha: 0.45 })
  const c = new Path2D()
  c.moveTo(x, y)
  c.lineTo(x, y - 8)
  beam(ctx, c, P.white, lw(show, 1.1), { alpha: 0.5 })
  const flame = new Path2D()
  flame.ellipse(x, y - 11, 1.4, 2.6, 0, 0, Math.PI * 2)
  beam(ctx, flame, P.gold, lw(show, 1.4), { alpha: 0.9, hot: true })
}

function hangingLamp(ctx, show, x, y) {
  const cord = new Path2D()
  cord.moveTo(x, GLASS.y0 - 10)
  cord.lineTo(x, y - 22)
  beam(ctx, cord, P.goldDim, lw(show, 1), { alpha: 0.8 })
  const shade = new Path2D()
  shade.moveTo(x - 7, y - 22)
  shade.lineTo(x + 7, y - 22)
  shade.lineTo(x + 26, y)
  shade.lineTo(x - 26, y)
  shade.closePath()
  occlude(ctx, shade)
  beam(ctx, shade, P.goldMid, lw(show, 1.3), { alpha: 0.85 })
  const bulb = new Path2D()
  bulb.moveTo(x - 20, y + 2)
  bulb.lineTo(x + 20, y + 2)
  beam(ctx, bulb, '#ffe2a8', lw(show, 2.2), { alpha: 0.95, hot: true })
  const halo = new Path2D()
  halo.ellipse(x, y + 4, 44, 12, 0, 0, Math.PI)
  beam(ctx, halo, P.amber, lw(show, 1), { alpha: 0.22 })
}

/** the kitchen behind the cook: a tiled wall, a shelf of pots, a rail of ladles, a heat lamp */
function kitchen(ctx, show) {
  const { x, y, w, h } = HATCH
  const tiles = new Path2D()
  for (let yy = y + 30; yy < y + h; yy += 13) {
    tiles.moveTo(x, yy)
    tiles.lineTo(x + w, yy)
  }
  for (let xx = x + 6; xx < x + w; xx += 13) {
    tiles.moveTo(xx, y + 30)
    tiles.lineTo(xx, y + h)
  }
  beam(ctx, tiles, mix(P.gold, '#000', 0.2), lw(show, 0.8), { alpha: 0.28 })
  // the shelf, with pots at both ends (clear of the cook)
  const shelf = new Path2D()
  shelf.moveTo(x, y + 28)
  shelf.lineTo(x + w, y + 28)
  beam(ctx, shelf, '#fff1cc', lw(show, 1.3), { alpha: 0.7 })
  const pots = new Path2D()
  for (const [px, pw, ph] of [[x + 10, 26, 16], [x + 40, 18, 12], [x + w - 34, 24, 18], [x + w - 60, 16, 10]]) {
    pots.rect(px, y + 28 - ph, pw, ph)
    pots.moveTo(px - 3, y + 28 - ph)
    pots.lineTo(px + pw + 3, y + 28 - ph)
  }
  occlude(ctx, pots)
  beam(ctx, pots, mix(P.gold, '#000', 0.35), lw(show, 1.1), { alpha: 0.8 })
  // ladles on a rail, low at the sides
  const ladles = new Path2D()
  for (const lx of [x + 16, x + 30, x + w - 30, x + w - 16]) {
    ladles.moveTo(lx, y + 40)
    ladles.lineTo(lx, y + 64)
    ladles.moveTo(lx + 5, y + 68)
    ladles.arc(lx, y + 68, 5, 0, Math.PI)
  }
  ladles.moveTo(x, y + 40)
  ladles.lineTo(x + w, y + 40)
  beam(ctx, ladles, mix(P.gold, '#000', 0.4), lw(show, 1.1), { alpha: 0.75 })
}

function cook(ctx, show, t) {
  const { dy, rock, lean } = cookAt(show, t)
  const x = COOK_X
  // the board on the hatch's sill, in front of him
  const shY = HATCH.y + 84 + dy * 0.7 + lean * 18
  const hy = HATCH.y + 52 + dy + lean * 40
  const r = 19 * (1 + lean * 0.08)
  ctx.save()
  ctx.translate(x, shY)
  ctx.rotate(rock)
  const body = new Path2D()
  body.moveTo(-58, 80)
  body.bezierCurveTo(-58, 6, -42, -4, -12, -8)
  body.lineTo(12, -8)
  body.bezierCurveTo(42, -4, 58, 6, 58, 80)
  body.closePath()
  occlude(ctx, body)
  beam(ctx, body, P.gold, lw(show, 1.3), { alpha: 0.55 })
  ctx.restore()
  // head and toque, leaning in over the board
  ctx.save()
  ctx.translate(x + rock * 40, hy)
  ctx.rotate(rock * 0.6 + lean * 0.12)
  const head = new Path2D()
  head.arc(0, 0, r, 0, Math.PI * 2)
  const hat = new Path2D()
  hat.moveTo(-r * 0.9, -r * 0.55)
  hat.lineTo(-r * 0.95, -r * 1.2)
  hat.bezierCurveTo(-r * 1.75, -r * 1.45, -r * 1.4, -r * 2.55, -r * 0.55, -r * 2.3)
  hat.bezierCurveTo(-r * 0.3, -r * 2.95, r * 0.5, -r * 2.95, r * 0.6, -r * 2.3)
  hat.bezierCurveTo(r * 1.45, -r * 2.5, r * 1.75, -r * 1.45, r * 0.95, -r * 1.2)
  hat.lineTo(r * 0.9, -r * 0.55)
  hat.closePath()
  occlude(ctx, hat)
  occlude(ctx, head)
  beam(ctx, hat, P.white, lw(show, 1.4), { alpha: 0.75 })
  beam(ctx, head, P.gold, lw(show, 1.3), { alpha: 0.55 })
  ctx.restore()
  // the counter and the board, over his body
  const counter = rectPath(HATCH.x, SILL - 12, HATCH.w, 12)
  occlude(ctx, counter, mix(P.gold, '#000', 0.8))
  beam(ctx, counter, P.gold, lw(show, 1.3), { alpha: 0.8 })
  const board = rectPath(x - 46, SILL - 18, 92, 6)
  occlude(ctx, board)
  beam(ctx, board, P.white, lw(show, 1.2), { alpha: 0.7 })
}

/** a covered plate on the pass at (x, y), and two wisps of steam rising from it, up past the hatch */
function passPlate(ctx, show, t, x, y) {
  const plate = new Path2D()
  plate.ellipse(x, y, 20, 4, 0, 0, Math.PI * 2)
  occlude(ctx, plate)
  beam(ctx, plate, '#fff1cc', lw(show, 1.3), { alpha: 0.9 })
  const food = new Path2D()
  food.moveTo(x - 12, y - 1)
  food.quadraticCurveTo(x, y - 13, x + 12, y - 1)
  occlude(ctx, food)
  beam(ctx, food, P.gold, lw(show, 1.2), { alpha: 0.85 })
  // steam: each wisp climbs and fades, starting again every 2.4 s, the two out of step
  for (let i = 0; i < 2; i++) {
    const u = ((t / 2.4 + i * 0.5) % 1 + 1) % 1
    const wisp = new Path2D()
    const x0 = x - 5 + i * 9, y0 = y - 12 - u * 14
    for (let k = 0; k <= 10; k++) {
      const v = k / 10
      const wx = x0 + 5 * Math.sin(v * 5 + t * 1.6 + i * 2), wy = y0 - v * 46
      k ? wisp.lineTo(wx, wy) : wisp.moveTo(wx, wy)
    }
    beam(ctx, wisp, '#fff6e0', lw(show, 1.1), { alpha: 0.55 * Math.sin(Math.PI * u) })
  }
}

/** the room behind the glass, clipped to it (street units, the window's own x offset `dx`) */
function room(ctx, t, show, dx, diners) {
  ctx.save()
  ctx.translate(dx, 0)
  const glass = rectPath(GLASS.x0, GLASS.y0, GLASS.x1 - GLASS.x0, GLASS.y1 - GLASS.y0)
  ctx.clip(glass)
  occlude(ctx, glass, WARM)
  // the back wall: a rail, the floor line
  const wall = new Path2D()
  wall.moveTo(GLASS.x0, 300)
  wall.lineTo(GLASS.x1, 300)
  wall.moveTo(GLASS.x0, 372)
  wall.lineTo(GLASS.x1, 372)
  beam(ctx, wall, P.goldDim, lw(show, 1), { alpha: 0.55 })
  // the kitchen hatch, the brightest thing in the room
  const hatch = rectPath(HATCH.x, HATCH.y, HATCH.w, HATCH.h)
  occlude(ctx, hatch, KITCHEN)
  ctx.save()
  ctx.clip(hatch)
  kitchen(ctx, show)
  cook(ctx, show, t)
  ctx.restore()
  // the frame of the opening, and the pass: a ledge that stands out from the wall under it
  beam(ctx, hatch, '#ffe2a8', lw(show, 1.6), { alpha: 0.85 })
  const pass = new Path2D()
  pass.moveTo(HATCH.x - 16, SILL + 9)
  pass.lineTo(HATCH.x + HATCH.w + 16, SILL + 9)
  pass.lineTo(HATCH.x + HATCH.w, SILL)
  pass.lineTo(HATCH.x, SILL)
  pass.closePath()
  occlude(ctx, pass, mix(P.gold, '#000', 0.75))
  beam(ctx, pass, '#ffe2a8', lw(show, 1.5), { alpha: 0.9, hot: true })
  const posts = new Path2D()
  for (const x of [HATCH.x - 16, HATCH.x + HATCH.w + 16]) {
    posts.moveTo(x, SILL + 9)
    posts.lineTo(x, SILL + 15)
  }
  beam(ctx, posts, P.goldMid, lw(show, 1.2), { alpha: 0.7 })
  // a plate waiting on the pass, its steam rising past the hatch's frame: an opening into a
  // kitchen, not a screen (review round two: a cold viewer saw "a chef on a screen")
  passPlate(ctx, show, t, HATCH.x + 34, SILL + 3)
  for (const L of LAMPS) hangingLamp(ctx, show, L.x, L.y)
  // the tables, the back row first
  for (let i = 0; i < ROWS.length; i++) {
    const row = ROWS[i]
    for (const d of diners[i]) diner(ctx, show, d, t, 0)
    for (const x of row.tables) table(ctx, show, x, row.top, row.spread * 1.7)
  }
  // the glass: a few cold lines across it
  const sheen = new Path2D()
  for (const [x, w] of [[700, 120], [742, 40], [1080, 150]]) {
    sheen.moveTo(x, GLASS.y1)
    sheen.lineTo(x + w, GLASS.y0)
  }
  beam(ctx, sheen, P.sky, lw(show, 1), { alpha: 0.1 })
  // the neon, small, hanging in the glass's upper left corner (clear of the captions). It is
  // seen whole or not at all: while a frame edge would cut it (the push at cook-in-back), it is
  // not drawn (review round two: it read "PEN", then "EN")
  const size = 15
  const text = 'OPEN'
  const tw = labelWidth(ctx, text, { size, ls: 0.16 })
  const nx = GLASS.x0 + 22, ny = GLASS.y0 + 52
  const box = { x0: dx + nx - 9, x1: dx + nx + tw + 5, y0: ny - size - 7, y1: ny + 8 }
  const c = show.cam
  const vx0 = c.x - 640 / c.zoom, vx1 = c.x + 640 / c.zoom, vy0 = c.y - 360 / c.zoom, vy1 = c.y + 360 / c.zoom
  if (box.x0 >= vx0 && box.x1 <= vx1 && box.y0 >= vy0 && box.y1 <= vy1) {
    const tube = rectPath(nx - 9, ny - size - 7, tw + 14, size + 15, 4)
    occlude(ctx, tube)
    beam(ctx, tube, '#ff4a4a', lw(show, 1.2), { alpha: 0.7 })
    label(ctx, text, nx, ny, { size, color: '#ff6a5c', ls: 0.16, weight: 'm' })
    label(ctx, text, nx, ny, { size, color: '#ffd0c8', ls: 0.16, weight: 'l', alpha: 0.6 })
  }
  ctx.restore()
}

/** the shopfront around the glass: black, with a plain frame and an empty fascia */
function shopfront(ctx, show, dx) {
  ctx.save()
  ctx.translate(dx, 0)
  const F = FRONT
  const block = rectPath(F.x0, F.top, F.x1 - F.x0, F.base - F.top)
  occlude(ctx, block)
  const frame = new Path2D()
  frame.moveTo(F.x0, F.top)
  frame.lineTo(F.x0, F.base)
  frame.lineTo(F.x1, F.base)
  frame.lineTo(F.x1, F.top)
  // the fascia over the window, and the stall riser under it
  frame.rect(F.x0 + 14, 58, F.x1 - F.x0 - 28, 40)
  frame.moveTo(F.x0, 104)
  frame.lineTo(F.x1, 104)
  frame.rect(GLASS.x0, GLASS.y1 + 12, GLASS.x1 - GLASS.x0, F.base - GLASS.y1 - 26)
  frame.moveTo(F.x0, 20)
  frame.lineTo(F.x1, 20)
  beam(ctx, frame, P.blueMid, lw(show, 1.2), { alpha: 0.5 })
  const sill = rectPath(GLASS.x0 - 8, GLASS.y1, GLASS.x1 - GLASS.x0 + 16, 10)
  occlude(ctx, sill)
  beam(ctx, sill, P.goldDim, lw(show, 1.2), { alpha: 0.8 })
  ctx.restore()
}

// ---------------------------------------------------------------- the scene

/** where Larry looks, from each entry's time on (a cue or a line id, plus dt) */
function gaze(show, t) {
  const word = (id, i) => show.line(id)?.words?.[i]?.[0] ?? show.at(id)
  const G = [
    { at: show.at('pass-restaurant'), look: AZ.ahead, nod: 0 },
    { at: show.at('stop-at-window') + 0.2, look: 0.02, nod: 0.05 }, // stops to look in
    { at: show.at('cook-story') - 0.3, look: 'camera', nod: 0 }, // turns to us to tell it
    { at: word('cook-prince', 9) - 0.15, look: 0.04, nod: 0.04 }, // "cook's knife work": back to the glass
    { at: show.at('cook-blade') - 0.2, look: 'camera', nod: 0 },
    { at: show.at('hatch-again'), look: 0.02, nod: 0.05 }, // watching the hatch, off screen, and in the wide
  ]
  let g = G[0]
  for (const e of G) if (e.at <= t) g = e
  return g
}

export default {
  name: 'restaurant',

  direct(t, show, seg) {
    const g = gaze(show, t)
    seg.street.placeLarry(t, show, seg, { look: g.look })
    seg.street.directLandmarks(t, show, seg)
    const larry = show.puppet('larry')
    // a sheepish tilt on "I'm probably saying that wrong"
    const zn = show.line('zhuangzi-name')
    const sheep = zn?.words?.[1] ? show.window(t, zn.words[1][1] + 0.1, zn.t1 + 0.3, 0.35) : 0
    larry.tilt(0.075 * sheep)
    larry.nod(g.nod)

    const ease = show.ease.inOutCubic
    if (t < show.at('larry-at-glass')) {
      // the walk in and the stop, then at cook-in-back the push past the tables to the hatch
      seg.shot('window')
      const u = ease(show.progress('cook-in-back', 2.6))
      show.camera({ x: lerp(VIEW.x, COOK_X, u), y: lerp(VIEW.y, 262, u), zoom: lerp(1, 2.3, u) })
    } else if (t < show.at('hatch-again')) {
      // close on Larry at the window, the room moving in the glass beside his face; a slow push
      seg.shot('glass')
      const u = show.progress('larry-at-glass', 'hatch-again')
      show.camera({ x: 552 - 10 * u, y: 322, zoom: 1.86 + 0.16 * u })
    } else if (t < show.at('watch-the-cook')) {
      // the hatch, closer: the cook slows on the words while the room keeps going in front of him
      seg.shot('hatch')
      const u = show.progress('hatch-again', 'watch-the-cook')
      show.camera({ x: COOK_X, y: 262, zoom: 2.85 + 0.1 * u })
    } else {
      // wide enough for both, held: nobody speaks
      seg.shot('watch')
      show.camera({ x: 752, y: 290, zoom: 1.5 })
    }
  },

  drawBack(ctx, t, show, seg) {
    seg.street.drawBack(ctx, t, show)
  },

  drawFront(ctx, t, show, seg) {
    seg.street.drawFront(ctx, t, show)
  },

  setup(show) {
    const r = show.rng('restaurant-room')
    // every table taken: two at each, facing each other, each on their own rhythm
    this.diners = ROWS.map((row, i) =>
      row.tables.flatMap((x) =>
        [-1, 1].map((side) => ({
          x: x + side * row.spread * r.range(0.9, 1.1),
          y: row.head + r.range(-3, 3),
          r: row.r * r.range(0.9, 1.08),
          face: -side,
          f: r.range(1.3, 2.4),
          ph: r.range(0, Math.PI * 2),
          seed: Math.floor(r() * 1e6) + i,
        })),
      ),
    )
  },

  landmark: {
    stop: 'restaurant',
    // on our side of the street, at Larry's own depth: it slides in at pass-restaurant and is gone
    // well before the busker
    layer: LAYER,
    span: [FRONT.x0, FRONT.x1],
    clear: {},
    front(ctx, t, show, seg, at) {
      const dx = at(0, LAYER)
      shopfront(ctx, show, dx)
      room(ctx, t, show, dx, this.diners ?? [[], []])
    },
    // the warm of the window on Larry when he is near it: brighter, not lit from anywhere
    over(ctx, t, show, seg, at) {
      const g0 = at(GLASS.x0, LAYER), g1 = at(GLASS.x1, LAYER)
      const near = clamp(Math.max(0, g0 - LARRY.x, LARRY.x - g1) - 110, 0, 1e9)
      const k = 1 - clamp(near / 360)
      if (k <= 0) return
      const cx = clamp(LARRY.x + 40, g0 - 60, g1)
      const grad = ctx.createRadialGradient(cx, LARRY.y + 10, 20, cx, LARRY.y + 10, 300)
      grad.addColorStop(0, 'rgba(255, 176, 84, 0.17)')
      grad.addColorStop(0.55, 'rgba(255, 150, 60, 0.07)')
      grad.addColorStop(1, 'rgba(255, 150, 60, 0)')
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = k
      ctx.fillStyle = grad
      ctx.fillRect(cx - 320, LARRY.y - 300, 640, 620)
      ctx.restore()
    },
  },
}
