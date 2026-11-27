// The table: the room, the meal, goodnight, black. Cues `table-wide` to the end.
//
// Two views of one warm room (table-room.js draws them):
//   DOOR  the room from its doorway, Larry at the frame's left edge in his coat with snow on his
//         shoulders. The long table across the frame; Sibyl at its head (the right end), then
//         along the far side Eppy, Al, Dee, Hy and Pete; on the near side the gold chair, its back
//         to us, empty, with a clean place set in front of it. The window with the snow is on the
//         back wall, the lamp in the corner. Used from `table-wide` until a second after `chair-in`.
//   SEAT  the room from our chair, at table height: the far side of the table across the frame,
//         the six spread along it, Larry beside us on the left in the gold chair (cardigan, scarf),
//         our place along the bottom of the frame.
// Seven heads share the frame only in the two door wides (`table-wide`, `they-look`). Every other
// shot places the heads whose seat is in frame. A seat behind Larry's head is not left empty
// (integration pass: six friends stay six across the cuts); its head is drawn behind his, and
// counts as no full head in the frame.
//
// Things arrive without hands: our chair slides in from the right edge, the place setting slides
// in along the bottom, the dish is covered before the cut to `served` and open after it, the bowl
// comes in from the left edge. Glasses stay on the table throughout.
//
// Everything is keyed to cue names and line ids; seconds appear only as short offsets from them.
import { clamp, smoothstep } from '@late-cluster/show/kit/ease.js'
import { beam, occlude } from '@late-cluster/show/kit/draw.js'
import { TILE } from '@late-cluster/show/stage/shots.js'
import * as R from '@late-cluster/episode/segments/walk/table-room.js'

// ---------------------------------------------------------------- the two worlds

/** the room from the door: world units = stage pixels at the wide */
const DOOR = {
  far: 452, // the table's far edge
  near: 520, // its near edge
  x0: 160, x1: 1090, // far edge, left and right
  nx0: 122, nx1: 1132, // near edge
  skirt: 592, // the tablecloth's hem
  floor: 690,
  headY: 378,
  scale: 0.62,
  seats: { pete: 230, hy: 400, dee: 570, al: 740, eppy: 910 },
  sibyl: { x: 1112, y: 370, scale: 0.66 },
  larry: { x: 60, y: 300, scale: 1.5 },
  gold: 400, // Larry's chair, across from Hy
  ours: 500, // where our chair stops, beside it
  window: { x: 330, y: 92, w: 230, h: 200 },
  lamp: { x: 1222, top: 150 },
  candles: [315, 825, 1000],
  dish: 655,
}

/** the room from our chair */
const SEAT = {
  edge: 470, // the table's far edge
  headY: 318,
  scale: 0.95,
  seats: { pete: 0, hy: 340, dee: 680, al: 1020, eppy: 1360 },
  sibyl: { x: 1720, y: 312, scale: 1.0 },
  end: 1830, // the head of the table
  window: { x: 1040, y: 26, w: 300, h: 180 },
  window2: { x: 120, y: 26, w: 300, h: 180 },
  lamp: { x: 1990, top: 100 },
  candles: [510, 850, 1530],
  dish: 1190,
  floor: 780,
}

const CREW = ['pete', 'hy', 'dee', 'al', 'eppy', 'sibyl']

// our place, in stage pixels as seen from our chair (it is right in front of us, so it keeps its
// place in the frame whichever way we look across the table)
const NEAR = { plate: [640, 616, 148], fork: [505, 650, 108], glass: [1004, 592, 84], bowl: [866, 604, 50] }

// ---------------------------------------------------------------- the shots

/**
 * The shot at t: { name, view, cam, base, near } where `base` is the camera the shot is laid out
 * for (near things and Larry are given in stage pixels against it) and `cam` the camera this frame.
 */
function shotAt(show, t) {
  const at = (c) => show.at(c)
  const ci = at('chair-in')
  const SIT = ci + 1.25 // the cut from the door to our chair
  let s
  if (t < at('sibyl-first')) s = { name: 'wide', view: 'door', base: { x: 640, y: 360, zoom: 1 } }
  else if (t < at('band-end')) s = { name: 'head', view: 'door', base: { x: 1035, y: 395, zoom: 2.5 } }
  else if (t < at('larry-at-door')) s = { name: 'band', view: 'door', base: { x: 390, y: 392, zoom: 2.3 } }
  else if (t < at('they-look')) s = { name: 'larry', view: 'door', base: { x: 330, y: 360, zoom: 1.6 } }
  else if (t < ci) s = { name: 'they-look', view: 'door', base: { x: 640, y: 360, zoom: 1 } }
  else if (t < SIT) {
    // the chair slides in, then the camera goes to it
    const base = { x: 400, y: 440, zoom: 2.0 }
    const u = show.ease.inQuad(clamp((t - ci - 0.85) / (SIT - ci - 0.85)))
    s = { name: 'chair', view: 'door', base, cam: { x: base.x + (DOOR.ours - base.x) * u, y: base.y + (540 - base.y) * u, zoom: base.zoom + 1.2 * u } }
  } else if (t < at('served')) {
    // we are sitting: the camera settles down to table height
    const base = { x: 1200, y: 360, zoom: 1 }
    const u = show.ease.outCubic(clamp((t - SIT) / 0.7))
    s = { name: 'sit', view: 'seat', base, cam: { x: base.x, y: base.y - 26 * (1 - u), zoom: 1.03 - 0.03 * u } }
  } else if (t < at('larry-and-sibyl')) s = { name: 'served', view: 'seat', base: { x: 1100, y: 360, zoom: 1.25 } }
  else if (t < at('eppy-calls-it')) s = { name: 'house', view: 'seat', base: { x: 1618, y: 360, zoom: 1.2 } }
  else if (t < at('the-meal')) s = { name: 'ruling', view: 'seat', base: { x: 1020, y: 360, zoom: 1.1 } }
  else if (t < at('goodnight')) s = { name: 'meal', view: 'seat', base: { x: 460, y: 360, zoom: 1 } }
  else {
    // goodnight: a slow push in on Larry while he says it, and it stays there
    // framed so that Larry sits in the gap between Dee and Al, with no head behind his
    // (review round two: at x 900 Dee was half behind him through the owner's last lines)
    const base = { x: 1084, y: 360, zoom: 1.15 }
    const u = show.ease.inOutSine(clamp((t - at('goodnight') - 2.0) / (at('stay-warm.end') - at('goodnight') - 2.0)))
    s = { name: 'goodnight', view: 'seat', base, cam: { x: base.x - 60 * u, y: base.y - 10 * u, zoom: base.zoom * (1 + 0.12 * u) } }
  }
  s.cam = s.cam ?? s.base
  s.near = ['sit', 'served', 'ruling', 'meal', 'goodnight'].includes(s.name)
  return s
}

/** stage pixels against the shot's base camera → world */
function w(s, sx, sy) {
  const b = s.base
  return [b.x + (sx - 640) / b.zoom, b.y + (sy - 360) / b.zoom]
}

/** where Larry is in each shot: world for the door shots, stage pixels (against base) for the seat */
const LARRY_AT = {
  wide: { world: DOOR.larry },
  larry: { world: { x: 224, y: 335, scale: 0.97 } },
  'they-look': { world: DOOR.larry },
  sit: { stage: { x: 175, y: 350, scale: 1.6 } },
  served: { stage: { x: 268, y: 352, scale: 1.5 } },
  house: { stage: { x: 300, y: 385, scale: 1.9 } },
  goodnight: { stage: { x: 350, y: 368, scale: 1.65 } },
}

function larryPlace(s) {
  const L = LARRY_AT[s.name]
  if (!L) return null
  if (L.world) return { ...L.world }
  const [x, y] = w(s, L.stage.x, L.stage.y)
  return { x, y, scale: L.stage.scale / s.base.zoom }
}

/** the crew's seats in the shot's world, and whether each is in frame */
function crewSeats(s) {
  const V = s.view === 'door' ? DOOR : SEAT
  const out = []
  for (const id of CREW) {
    const seat = id === 'sibyl' ? V.sibyl : { x: V.seats[id], y: V.headY, scale: V.scale }
    const half = TILE * seat.scale * s.cam.zoom * 0.42
    const sx = (seat.x - s.cam.x) * s.cam.zoom + 640
    out.push({ id, ...seat, sx, inFrame: sx > -half && sx < 1280 + half })
  }
  return out
}


// ---------------------------------------------------------------- where everyone looks

const AZ = { right: 0.5, left: 2.62, larryDoor: 2.5, sibylDoor: 2.82 }
/** talking to the neighbour: the pairs at the table */
const PAIR = { pete: AZ.right, hy: AZ.left, dee: AZ.right, al: AZ.left, eppy: AZ.right, sibyl: AZ.left + 0.2 }

/** a nod down and back, centred `dt` after `t0`, `depth` radians */
function dip(t, t0, depth = 0.1, dur = 0.5) {
  const u = (t - t0) / dur + 0.5
  return u > 0 && u < 1 ? -depth * Math.sin(Math.PI * u) : 0
}

/** the bowl's path in `served`, stage pixels against the shot's base: in from the left edge behind the candles, past Larry, to our plate */
function servedBowl(show, t) {
  // along the table behind the candles at an even pace, then forward to our plate, easing to a stop
  const s0 = show.at('served')
  const a0 = s0 + 0.1, a1 = s0 + 1.1, a2 = s0 + 1.6
  const P0 = [-110, 508], P1 = [520, 506], P2 = NEAR.bowl
  if (t < a1) {
    const v = clamp((t - a0) / (a1 - a0))
    const u = v < 0.15 ? (v * v) / 0.3 : v - 0.075 // a gentle start, then steady
    const k = u / 0.925
    return { x: P0[0] + (P1[0] - P0[0]) * k, y: P0[1] + (P1[1] - P0[1]) * k, r: 40, u: 0.6 * k }
  }
  const v = show.ease.outCubic(clamp((t - a1) / (a2 - a1)))
  return { x: P1[0] + (P2[0] - P1[0]) * v, y: P1[1] + (P2[1] - P1[1]) * v, r: 40 + (P2[2] - 40) * v, u: 0.6 + 0.4 * v }
}

function lookFor(show, t, s, id) {
  const at = (c) => show.at(c)
  switch (s.name) {
    case 'wide':
      // mid-conversation, then all six turn to the door at once
      return t < at('table-wide') + 0.25 ? PAIR[id] : 'camera'
    case 'head':
    case 'band':
    case 'larry':
      return id === 'sibyl' ? AZ.sibylDoor : AZ.larryDoor
    case 'they-look':
      // from Larry to us, together, and held
      return t < at('they-look') + 0.45 ? (id === 'sibyl' ? AZ.sibylDoor : AZ.larryDoor) : 'camera'
    case 'chair':
      // back to each other, and the room starts up again
      return t < at('chair-in') + 0.15 ? 'camera' : PAIR[id]
    case 'sit':
      return id === 'sibyl' ? 2.72 : 0.4 // Sibyl tells Larry the rule; the others look to her
    case 'served':
      return PAIR[id]
    case 'house':
      // Sibyl faces her plate, nearly to us, so her chin going down reads (review round two:
      // turned to Larry she read as level and talking to him)
      return id === 'sibyl' ? 1.8 : 2.35
    case 'ruling':
      return id === 'eppy' ? 2.05 : 0.45 // Eppy to the table at large; Al and Dee to Eppy
    case 'meal':
      return { pete: 0.62, hy: 0.42, dee: 2.55, al: 0.3 }[id] ?? PAIR[id]
    case 'goodnight':
      return PAIR[id]
  }
  return 'camera'
}

function larryLookFor(show, t, s) {
  const at = (c) => show.at(c)
  switch (s.name) {
    case 'wide':
      return 0.35 // into the room
    case 'larry':
      return t < at('larry-at-door') + 0.3 ? 0.3 : 'camera' // he turns his head to us, beside him
    case 'they-look':
      return 0.45 // watching them look at us
    case 'sit':
      return 0.32 // to Sibyl as she says the rule
    case 'served': {
      // his head follows the bowl all the way, from the left edge, past him, to our plate
      const b = servedBowl(show, t)
      const d = b.x - LARRY_AT.served.stage.x
      return Math.PI / 2 - Math.atan(d / 150) * 0.95
    }
    case 'house':
      return 0.12 // in profile, to her
    case 'goodnight': {
      const end = at('stay-warm.end')
      if (t < at('goodnight') + 2.3) return 0.45 // at the table
      if (t < end + 1.05) return 'camera' // to us, and he stays on us a moment after the last word
      return 0.45 // and back to the table
    }
  }
  return 'camera'
}

// ---------------------------------------------------------------- the scene

export default {
  name: 'table',

  direct(t, show, seg) {
    const s = shotAt(show, t)
    seg.shot(s.name)
    show.camera(s.cam)
    const V = s.view === 'door' ? DOOR : SEAT

    // the six
    const edge = s.view === 'door' ? DOOR.far + 2 : SEAT.edge + 1
    for (const c of crewSeats(s)) {
      if (!c.inFrame) continue
      let { x, y } = c
      const p = show.puppet(c.id)
      let nod = 0, tilt = 0
      if (s.name === 'ruling' && c.id === 'eppy') {
        y -= 14 // sitting up very straight
        nod += 0.07
      }
      if (s.name === 'ruling' && c.id === 'dee') nod -= dip(show.t, show.at('dee-laughs') + 0.18, 0.16, 0.55) // a laugh: the chin goes up
      if (s.name === 'they-look' && c.id === 'al') nod += dip(t, show.at('chair') + 0.2, 0.09, 0.45)
      if (s.name === 'meal') {
        const tm = show.at('the-meal')
        if (c.id === 'pete') nod -= 0.34 // his head down over his plate
        if (c.id === 'hy') {
          x += 30 * smoothstep(tm, tm + 1.2, t) // leaning across to Dee
          tilt -= 0.1 * smoothstep(tm, tm + 1.2, t)
          nod += dip(t, tm + 2.6, 0.06, 0.5)
        }
        if (c.id === 'dee') nod -= dip(t, tm + 1.6, 0.12, 0.6) + dip(t, tm + 3.5, 0.1, 0.5)
        if (c.id === 'al') nod += dip(t, tm + 0.9, 0.1, 0.5) + dip(t, tm + 2.2, 0.09, 0.5) + dip(t, tm + 3.6, 0.1, 0.5) // nodding at something Sibyl said
      }
      if (s.name === 'house' && c.id === 'sibyl') nod -= 0.62 // she does not look up from her plate
      if (s.name === 'goodnight') {
        // the room going on behind him, quietly: small nods, nothing that asks to be looked at
        const tg = show.at('goodnight')
        if (c.id === 'al') nod += dip(t, tg + 1.0, 0.05, 0.7) + dip(t, tg + 7.5, 0.05, 0.7) + dip(t, tg + 14.2, 0.05, 0.7)
        if (c.id === 'eppy') nod += dip(t, tg + 4.4, 0.05, 0.7) + dip(t, tg + 11.0, 0.05, 0.7)
      }
      seg.place(c.id, { x, y, scale: c.scale, look: lookFor(show, t, s, c.id), z: 4, seat: edge })
      if (nod) p.nod(nod)
      if (tilt) p.tilt(tilt)
    }

    // Larry
    const lp = larryPlace(s)
    if (lp) {
      seg.place('larry', { ...lp, look: larryLookFor(show, t, s), z: 7 })
      const L = show.puppet('larry')
      if (s.name === 'served') L.nod(-0.12 * smoothstep(0.75, 1, servedBowl(show, t).u))
      if (s.name === 'house') L.tilt(0.07 * Math.sin(Math.PI * clamp((t - show.at('my-house.end') - 0.1) / 0.9))) // fond: he is losing, and knows it
      if (s.name === 'goodnight') {
        const end = show.at('stay-warm.end')
        L.nod(dip(t, end + 0.6, 0.12, 0.5) + (t > end + 1.05 ? -0.05 * smoothstep(end + 1.05, end + 1.6, t) : 0))
      }
    }

    // black: his nod ends about 0.85 s after "Goodnight"; three seconds from our chair after it,
    // then a second's fade, in black before the audio ends (integration pass)
    const end = show.at('stay-warm.end')
    const blackAt = Math.min(end + 4.9, show.duration - 0.3)
    seg.fade(smoothstep(blackAt - 1.0, blackAt, t))
  },

  drawBack(ctx, t, show, seg) {
    const s = shotAt(show, t)
    show.world(ctx, (c) => (s.view === 'door' ? doorBack(c, t, show, seg, s) : seatBack(c, t, show, seg, s)))
  },

  drawFront(ctx, t, show, seg) {
    const s = shotAt(show, t)
    const h = show.headOf('larry')
    ctx.save()
    if (h) {
      // nothing on the table is drawn over Larry, who is nearer than all of it
      const clip = new Path2D()
      clip.rect(-20, -20, 1320, 760)
      clip.rect(h.x + h.size * 0.42, h.y - h.size * 0.55, -h.size * 0.86, 800)
      ctx.clip(clip, 'evenodd')
    }
    show.world(ctx, (c) => (s.view === 'door' ? doorFront(c, t, show, seg, s) : seatFront(c, t, show, seg, s)))
    ctx.restore()
    // our place is the nearest thing in the room: in front of everyone, Larry included
    if (s.near) show.world(ctx, (c) => nearPlace(c, t, show, s, lw(s)))
    // the street's snow still on his coat, at the door
    if (h && s.view === 'door') R.snowOnShoulders(ctx, h)
  },
}

// ---------------------------------------------------------------- drawing: the door view

const lw = (s, k = 1) => (k * 1.4) / Math.pow(s.cam.zoom, 0.55)

function doorBack(ctx, t, show, seg, s) {
  const D = DOOR
  const k = lw(s)
  R.walls(ctx, -400, 1700, -300, D.floor, { rail: 70, w: k })
  R.windowWithSnow(ctx, t, show, seg.street, D.window, { w: k })
  R.standingLamp(ctx, D.lamp.x, D.lamp.top, D.floor, { w: k })
  // the door we came in by: its jamb at the left
  const jamb = R.poly([[-30, D.floor], [-30, 40], [128, 40], [128, D.floor]])
  showBeam(ctx, jamb, R.C.wood, k * 1.2, 0.5)
  showBeam(ctx, R.poly([[112, D.floor], [112, 56]]), R.C.wood, k, 0.35)
  // the head of the table's chair, behind Sibyl
  R.chairFront(ctx, D.sibyl.x + 8, D.sibyl.y - 52, D.far + 4, { width: 120, w: k })
  table(ctx, t, s, k)
  // a clean place at every seat, and one set in front of the gold chair
  for (const id of ['pete', 'hy', 'dee', 'al', 'eppy']) R.plate(ctx, D.seats[id], D.far + 9, 30, { tilt: 0.22, w: k * 0.85 })
  R.plate(ctx, D.sibyl.x - 52, D.far + 16, 28, { tilt: 0.26, w: k * 0.85 })
  R.plate(ctx, D.gold, D.far + 30, 34, { tilt: 0.24, w: k, alpha: 0.95 })
}

function table(ctx, t, s, k) {
  const D = DOOR
  const top = R.poly([[D.x0, D.far], [D.x1, D.far], [D.nx1, D.near], [D.nx0, D.near]], true)
  occludeP(ctx, top)
  // the cloth hangs from the near edge to its hem, in folds
  const front = R.poly([[D.nx0, D.near], [D.nx1, D.near], [D.nx1 + 4, D.skirt], [D.nx0 - 4, D.skirt]], true)
  occludeP(ctx, front)
  // the legs below the cloth
  for (const x of [D.nx0 + 16, D.nx1 - 16]) showBeam(ctx, R.poly([[x, D.skirt], [x, D.floor]]), R.C.wood, k * 1.3, 0.55)
  showBeam(ctx, top, R.C.cloth, k * 1.2, 0.75)
  showBeam(ctx, R.poly([[D.nx0, D.near], [D.nx0 - 4, D.skirt], [D.nx1 + 4, D.skirt], [D.nx1, D.near]]), R.C.cloth, k, 0.55)
  for (let x = D.nx0 + 60; x < D.nx1 - 20; x += 72) {
    const wv = 4 * Math.sin(x * 0.07)
    showBeam(ctx, R.poly([[x, D.near + 6], [x + wv, D.skirt - 4]]), R.C.cloth, k * 0.8, 0.22)
  }
  // a runner down the middle of the table
  showBeam(ctx, R.poly([[D.x0 + 30, D.far + 30], [D.x1 - 20, D.far + 30]]), '#d0704a', k * 0.9, 0.35)
}

function doorFront(ctx, t, show, seg, s) {
  const D = DOOR
  const k = lw(s)
  const covered = true // in every door shot the dish is still covered
  for (const [i, x] of D.candles.entries()) R.candle(ctx, x, D.far + 22, 48, t, i, { w: k })
  R.dish(ctx, D.dish, D.far + 26, 58, t, { covered, w: k })
  for (const id of ['pete', 'hy', 'dee', 'al', 'eppy']) R.glass(ctx, D.seats[id] + 42, D.far + 14, 30, { w: k * 0.8 })
  // the gold chair, his, back to us and empty, and ours that slides in beside it from the right
  R.glass(ctx, D.gold + 50, D.far + 34, 32, { w: k * 0.85, alpha: 0.6 })
  R.chairBack(ctx, D.gold, D.near - 26, D.skirt + 8, D.floor, { width: 80, color: R.C.gold, w: k * 1.6, alpha: 1, hot: true })
  if (s.name === 'chair') {
    const ci = show.at('chair-in')
    const u = show.ease.outCubic(clamp((t - ci) / 0.85))
    const from = s.base.x + 640 / s.base.zoom + 60
    R.chairBack(ctx, from + (D.ours - from) * u, D.near - 24, D.skirt + 8, D.floor, { width: 74, color: R.C.chair, w: k, alpha: 0.75 })
  }
}

// ---------------------------------------------------------------- drawing: the view from our chair

function seatBack(ctx, t, show, seg, s) {
  const S = SEAT
  const k = lw(s)
  const at = (c) => show.at(c)
  const meal = t >= at('the-meal')
  const tg = at('goodnight')
  // no change of light anywhere at the table (integration pass): the softness at goodnight is the
  // slow push and the heads turned to one another
  const soft = 1
  R.walls(ctx, -1200, 2600, -400, S.floor, { rail: 250, w: k })
  R.windowWithSnow(ctx, t, show, seg.street, S.window, { w: k, alpha: soft, snow: soft })
  R.windowWithSnow(ctx, t, show, seg.street, S.window2, { w: k, alpha: soft, snow: soft })
  R.standingLamp(ctx, S.lamp.x, S.lamp.top, S.floor - 200, { w: k, size: 1.3 })
  R.chairFront(ctx, S.sibyl.x + 10, S.sibyl.y - 80, S.edge, { width: 180, w: k })
  // the table top, from its far edge to below the frame
  const top = R.poly([[-1400, S.edge], [S.end, S.edge], [S.end + 420, 1100], [-1400, 1100]], true)
  occludeP(ctx, top)
  showBeam(ctx, R.poly([[-1400, S.edge], [S.end, S.edge], [S.end + 420, 1100]]), R.C.cloth, k * 1.2, 0.75 * soft)
  showBeam(ctx, R.poly([[-1400, S.edge + 62], [S.end + 40, S.edge + 62]]), '#d0704a', k, 0.3 * soft)
  showBeam(ctx, R.poly([[-1400, S.edge + 86], [S.end + 58, S.edge + 86]]), '#d0704a', k, 0.3 * soft)
  // the far places: clean until the meal (the guest is served first)
  for (const id of ['pete', 'hy', 'dee', 'al', 'eppy']) R.plate(ctx, S.seats[id], S.edge + 28, 62, { tilt: 0.2, w: k, food: meal ? 1 : 0, seed: S.seats[id], alpha: 0.7 * soft })
  R.plate(ctx, S.sibyl.x - 90, S.edge + 30, 60, { tilt: 0.2, w: k, food: meal ? 1 : 0, seed: 9, alpha: 0.7 * soft })
  // bowls going along the table
  if (s.name === 'meal') {
    const tm = at('the-meal')
    R.bowl(ctx, 120 + 150 * (t - tm), S.edge + 74, 40, { w: k }) // left to right
    R.bowl(ctx, 1180 - 130 * (t - tm), S.edge + 52, 34, { w: k }) // and right to left
  }
  if (s.name === 'goodnight') R.bowl(ctx, 1290 - 16 * (t - tg), S.edge + 58, 36, { w: k, alpha: 0.55 })
  // the gold chair he sits in: its back post and the end of its top rail, behind his shoulder
  const L = LARRY_AT[s.name]?.stage
  if (L) {
    const S = TILE * L.scale
    const [cx, cy] = w(s, L.x + 0.02 * S, L.y + 0.17 * S)
    const z = s.base.zoom
    R.chairBack(ctx, cx, cy, cy + 900 / z, cy + 1000 / z, { width: (0.84 * S) / z, color: R.C.gold, w: k * 1.5, alpha: 0.95, hot: true, fill: false })
  }
}

/** our place along the bottom of the frame: plate, fork, glass; the bowl after `served`; food from `the-meal` */
function nearPlace(ctx, t, show, s, k) {
  const at = (c) => show.at(c)
  const z = s.base.zoom
  const slide = (t0, dur) => (s.name === 'sit' ? 1 - show.ease.outCubic(clamp((t - t0) / dur)) : 0)
  const arrive = at('chair-in') + 1.45
  const dx = (u) => u * 760 // from off the right edge
  const [px, py, pr] = NEAR.plate
  const pu = slide(arrive, 0.7)
  const fu = slide(arrive + 0.18, 0.7)
  const gu = slide(arrive + 0.34, 0.7)
  const food = t >= at('the-meal') ? 1 : 0
  {
    const [x, y] = w(s, px + dx(pu), py)
    R.plate(ctx, x, y, pr / z, { tilt: 0.25, w: k * 1.2, alpha: 0.85, food, seed: 4 })
  }
  {
    const [fx, fy, fl] = NEAR.fork
    const [x, y] = w(s, fx + dx(fu), fy)
    R.fork(ctx, x, y, fl / z, { w: k * 1.1, angle: -1.42 })
  }
  {
    const [gx, gy, gh] = NEAR.glass
    const [x, y] = w(s, gx + dx(gu), gy)
    R.glass(ctx, x, y, gh / z, { w: k * 1.1, alpha: 0.6 })
  }
  if (t >= at('served') + 1.45 && s.name !== 'served') {
    const [bx, by, br] = NEAR.bowl
    const [x, y] = w(s, bx, by)
    R.bowl(ctx, x, y, br / z, { w: k })
  }
}

function seatFront(ctx, t, show, seg, s) {
  const S = SEAT
  const k = lw(s)
  const open = t >= show.at('served')
  const soft = 1
  const b = s.name === 'served' ? servedBowl(show, t) : null
  // while it goes along the far side of the table the bowl is behind the candles and the dish
  if (b && b.u < 0.6) bowlAt(ctx, s, b, k)
  for (const [i, x] of S.candles.entries()) R.candle(ctx, x, S.edge + 50, 78, t, i + 5, { w: k, alpha: 0.85 * soft })
  R.dish(ctx, S.dish, S.edge + 52, 96, t, { covered: !open, w: k * 1.1, alpha: 0.85 * soft, steam: soft })
  for (const id of ['pete', 'hy', 'dee', 'al', 'eppy']) R.glass(ctx, S.seats[id] + 92, S.edge + 34, 62, { w: k, alpha: 0.5 * soft })
  R.glass(ctx, S.sibyl.x - 170, S.edge + 34, 62, { w: k, alpha: 0.5 * soft })
  // and when it comes forward to our plate it is in front of them
  if (b && b.u >= 0.6) bowlAt(ctx, s, b, k)
}

/** the served bowl (drawn inside drawFront's clip, so it passes behind Larry) */
function bowlAt(ctx, s, b, k) {
  const [x, y] = w(s, b.x, b.y)
  R.bowl(ctx, x, y, b.r / s.base.zoom, { w: k * 1.1, alpha: 0.95 })
}

// ---------------------------------------------------------------- tiny wrappers

function showBeam(ctx, p, color, width, alpha) {
  beam(ctx, p, color, width, { alpha })
}
function occludeP(ctx, p) {
  occlude(ctx, p)
}
