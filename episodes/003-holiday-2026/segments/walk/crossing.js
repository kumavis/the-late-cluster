// The crossing: one kerb, an empty road, DON'T WALK in red through everything he says, still red
// after it, and WALK in green only when the sign is ready. On from `crossing-red` until `cross`.
//
// The place. A crossroads on our side of the walk. Across the main road the side street goes away
// between the far buildings (a gap in the fronts, its kerbs and a few small lamps getting smaller
// to where the picture ends). On our side its mouth is a gap in our kerb with a crosswalk across
// it, and on the far corner of it, our side of the road, stands the signal post: the "far post".
// It is a landmark (index.js), so the street scenes draw it arriving (`walk-past`) and leaving
// (`cross`, the green sign sliding past behind him).
//
// The shots, by cue (all keyed to cue names and line ids):
//   crossing-red      wide: Larry stopping at the kerb, the side street, the red sign
//   our-look          medium: he glances at us and answers the look
//   listen-put-right  close, the red on him: his head turns to us slowly and stays (the long hold)
//   looks-at-red      the same close, pushing in very slowly: he looks across at the red
//   tarfon-close      closer still, Larry and the red light and nothing else
//   where-he-found-it a looser medium
//   two-at-the-kerb   the wide again, and on through still-red and walk-sign
//   still-red         nothing happens: he looks at the sign, at us (a small tilt), and waits
//   walk-sign         the sign is WALK in green, at the cue's tick and nowhere else; no look at it
import { beam, occlude, rectPath, label, mix, P } from '@late-cluster/show/kit/draw.js'
import { clamp, smoothstep, noise1, ease } from '@late-cluster/show/kit/ease.js'
import { LARRY, AZ, Y } from '@late-cluster/episode/segments/walk/street.js'

// ---------------------------------------------------------------- the place, street x at the stop

/** the side street across the road (fronts layer); keep this gap about this wide (plan.md) */
const FAR = { x0: 520, x1: 850 }
/** its mouth on our side (kerb layer): our kerb stops at x0 and starts again at x1 */
const NEAR = { x0: 470, x1: 1060 }
/** the signal post on the far corner of the mouth (kerb layer) and its signal head */
const POST = { x: 1110, base: 614, top: 196 }
const HEAD = { w: 112, h: 84, dy: 0 } // hung on the post's road side, top at POST.top

const RED = '#ff3b30'
const GREEN = '#5dff8a'

/** the sign is WALK from the cue `walk-sign` on (its one tick), DON'T WALK before */
const isWalk = (show, t) => t >= show.at('walk-sign')

// ---------------------------------------------------------------- the shots

/** cameras, in street units (VIEW is 640/360/1) */
const CAM = {
  wide: { x: 700, y: 360, zoom: 0.9 },
  look: { x: 690, y: 342, zoom: 1.3 },
  close: { x: 505, y: 330, zoom: 1.45 },
  tarfon: { x: 500, y: 316, zoom: 1.8 },
  found: { x: 720, y: 348, zoom: 1.15 },
}

function shotAt(show, t) {
  if (t < show.at('our-look')) return 'wide'
  if (t < show.at('listen-put-right')) return 'look'
  if (t < show.at('tarfon-close')) return 'close'
  if (t < show.at('where-he-found-it')) return 'tarfon'
  if (t < show.at('two-at-the-kerb')) return 'found'
  return 'wide2'
}

/** how much of the sign's red is on him in this shot (0 none, 1 the closest) */
const WASH = { wide: 0, wide2: 0, look: 0.45, close: 0.8, tarfon: 1, found: 0.4 }

/** the azimuth 'camera' resolves to (show.js _resolveAz), so a turn to us can be tweened by hand */
function camAz(x, cam) {
  const sx = (x - cam.x) * cam.zoom
  const side = Math.abs(sx) > 40 ? Math.sign(sx) : -1
  return Math.PI / 2 + side * (0.36 + 0.12 * clamp(Math.abs(sx) / 400))
}

/** the sign, as he looks at it: nearly profile, chin a touch up */
const AT_RED = 0.03
const RED_CHIN = 0.06

/** a nod (chin down, negative) centred `dt` after time t0 */
function nodBump(t, t0, depth, dur) {
  const u = (t - t0) / dur + 0.5
  return u > 0 && u < 1 ? depth * Math.sin(Math.PI * u) : 0
}

export default {
  name: 'crossing',

  direct(t, show, seg) {
    const { street } = seg
    const shot = shotAt(show, t)
    seg.shot(shot)
    const cam = { ...CAM[shot === 'wide2' ? 'wide' : shot] }
    // looks-at-red: the close pushes in very slowly while he talks
    if (shot === 'close' && t >= show.at('looks-at-red')) cam.zoom += 0.08 * smoothstep(show.at('looks-at-red'), show.at('tarfon-close'), t)
    // still-red: not a frozen picture. A slow drift in (the red stays steady)
    if (shot === 'wide2' && t >= show.at('still-red')) {
      const u = clamp((t - show.at('still-red')) / 6)
      cam.zoom += 0.025 * ease.inOutSine(u)
      cam.x += 6 * ease.inOutSine(u) + 1.5 * noise1(t * 0.3, 41)
      cam.y += 1.2 * noise1(t * 0.25, 42)
    }
    show.camera(cam)

    const pl = street.placeLarry(t, show, seg)
    street.directLandmarks(t, show, seg)
    const larry = show.puppet('larry')
    const us = camAz(pl.x, cam)
    const L = (id) => show.line(id)
    const c = (name) => show.at(name)
    let look = AZ.ahead
    let chin = 0
    let tilt = 0

    if (t < c('our-look')) {
      // stopping at the kerb, then he looks at the sign and waits
      const u = smoothstep(c('crossing-red') + 1.3, c('crossing-red') + 2.0, t)
      look = AZ.ahead + (AT_RED - AZ.ahead) * u
      chin = RED_CHIN * u
    } else if (t < c('listen-put-right')) {
      // he glances at us and answers the look; back to the sign after it
      const back = smoothstep(L('no-cars').t1 + 0.35, L('no-cars').t1 + 0.75, t)
      look = 'camera'
      if (back > 0) {
        look = us + (AT_RED - us) * back
        chin = RED_CHIN * back
      }
    } else if (t < c('looks-at-red')) {
      // the long hold: from the sign to us, slowly, and he stays there
      const u = ease.inOutSine(clamp((t - c('listen-put-right')) / 1.4))
      look = AT_RED + (us - AT_RED) * u
      chin = RED_CHIN * (1 - u)
    } else if (t < c('tarfon-close')) {
      // away from us, across the road, at the red
      const u = ease.inOutSine(clamp((t - c('looks-at-red')) / 0.7))
      look = us + (AT_RED - us) * u
      chin = RED_CHIN * u
      // and back to us as he gets to the quotation
      const back = ease.inOutSine(clamp((t - (L('tarfon-recorded').t0 + 0.2)) / 0.6))
      if (back > 0) {
        look = look + (us - look) * back
        chin *= 1 - back
      }
    } else if (t < c('where-he-found-it')) {
      // to us, plainly. Then it gets its silence: he looks down, then across at the red
      const end = L('tarfon-2').t1
      look = us
      chin = nodBump(t, end + 0.9, -0.16, 1.2)
      const across = ease.inOutSine(clamp((t - (end + 1.25)) / 0.6))
      if (across > 0) {
        look = us + (AT_RED - us) * across
        chin += RED_CHIN * across
      }
    } else if (t < c('two-at-the-kerb')) {
      // about himself now: to us, a glance down at the underlining, a tilt at "a guest"
      look = us
      const w = L('used-book').words
      const under = w.length ? w[w.length - 1][0] : L('used-book').t1
      chin = nodBump(t, under + 0.1, -0.09, 0.9)
      tilt = 0.06 * smoothstep(L('guest-in-sentence').t0 + 1.4, L('guest-in-sentence').t0 + 1.9, t) * (1 - smoothstep(L('guest-in-sentence').t1, L('guest-in-sentence').t1 + 0.5, t))
    } else if (t < c('still-red')) {
      // the wide again: from the sign, he turns to us for his borrowing
      const u = ease.inOutSine(clamp((t - (c('two-at-the-kerb') + 0.35)) / 0.6))
      look = AT_RED + (us - AT_RED) * u
      chin = RED_CHIN * (1 - u)
    } else {
      // nothing happens. He looks at the sign, then at us with a small tilt, then goes on waiting
      const s = c('still-red')
      const toSign = ease.inOutSine(clamp((t - (s + 0.45)) / 0.55))
      const toUs = ease.inOutSine(clamp((t - (s + 1.4)) / 0.5))
      const away = ease.inOutSine(clamp((t - (s + 2.75)) / 0.5))
      look = us + (AT_RED - us) * toSign
      chin = RED_CHIN * toSign
      look = look + (us - look) * toUs
      chin *= 1 - toUs
      tilt = 0.075 * toUs * (1 - away)
      // waiting: eyes on the road ahead, level. At walk-sign nothing in him changes; he steps off
      look = look + (AZ.ahead - look) * away
    }

    larry.lookAt(look)
    if (chin) larry.nod(chin)
    if (tilt) larry.tilt(tilt)
  },

  drawBack(ctx, t, show, seg) {
    const shot = seg.now.shot
    if (shot === 'tarfon') {
      // Larry and the red light, nothing else: the street goes to black and the sign is all there is
      signClose(ctx, t, show)
      return
    }
    seg.street.drawBack(ctx, t, show)
  },

  drawFront(ctx, t, show, seg) {
    seg.street.drawFront(ctx, t, show)
    const k = WASH[seg.now.shot] ?? 0
    if (k > 0 && !isWalk(show, t)) redOnHim(ctx, k)
  },

  landmark: {
    stop: 'crossing',
    layer: 'kerb',
    // its parts sit on several layers (the far side street on the fronts and slower, the mouth and
    // the post on the kerb); this span on the kerb layer keeps it drawn whenever any part shows
    span: [-1600, 3000],
    // the side street: a gap in the fronts, the lamps and the centre line, and the mouth in our kerb
    clear: { fronts: [FAR.x0, FAR.x1], lamps: [500, 1260], centre: [480, 1240], kerb: [NEAR.x0, NEAR.x1] },
    back(ctx, t, show, seg, at) {
      farSideStreet(ctx, t, show, at)
    },
    front(ctx, t, show, seg, at) {
      nearMouth(ctx, t, show, at)
      signalPost(ctx, t, show, at)
    },
  },
}

// ---------------------------------------------------------------- drawing

function stroke(ctx, pts, color, w, alpha) {
  const p = new Path2D()
  p.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1])
  beam(ctx, p, color, w, { alpha })
}

/**
 * Across the road: the side street going away between the far buildings, empty to where the
 * picture ends. Its far parts slide slower than the fronts (they are further off), and all of it is
 * clipped to the gap in the fronts, so none of it is ever drawn over a building.
 */
function farSideStreet(ctx, t, show, at) {
  const g0 = at(FAR.x0), g1 = at(FAR.x1)
  // the far pavement and kerb lines do not run across a street mouth
  occlude(ctx, rectPath(g0 + 1, Y.fronts - 3, g1 - g0 - 2, Y.roadTop - Y.fronts))
  ctx.save()
  const clip = new Path2D()
  clip.rect(g0, -2000, g1 - g0, Y.roadTop + 2000)
  ctx.clip(clip)
  // a point d (0 near .. 1 at the far end) along a line from near x n to far x f
  const kNear = 1, kFar = 0.42
  const yNear = Y.farKerb + 2, yFar = 364
  const along = (n, f, d) => {
    const e = 1 - (1 - d) ** 1.6 // foreshortened: the far half is short
    const x = at(n, 1) + (at(f, kFar) - at(n, 1)) * e
    return [x, yNear + (yFar - yNear) * e]
  }
  const L = { bld: [FAR.x0, 632], kerb: [FAR.x0 + 26, 648], kerbR: [FAR.x1 - 26, 712], bldR: [FAR.x1, 728] }
  const seg = (n, f) => [along(n, f, 0), along(n, f, 1)]
  // the building lines and the kerbs of the side street
  stroke(ctx, seg(...L.bld).map(([x, y]) => [x, y - 18]), P.blueMid, 1.1, 0.5)
  stroke(ctx, seg(...L.bldR).map(([x, y]) => [x, y - 18]), P.blueMid, 1.1, 0.5)
  stroke(ctx, seg(...L.kerb), P.blueMid, 1.1, 0.6)
  stroke(ctx, seg(...L.kerbR), P.blueMid, 1.1, 0.6)
  // the far corners where its kerbs meet the main road's far kerb
  const corner = (x, dir) => {
    const p = new Path2D()
    p.moveTo(x - dir * 22, Y.farKerb)
    p.quadraticCurveTo(x, Y.farKerb, x, Y.farKerb + 2)
    beam(ctx, p, P.blueMid, 1.1, { alpha: 0.55 })
  }
  corner(at(FAR.x0 + 26), 1)
  corner(at(FAR.x1 - 26), -1)
  // the receding sides of the corner buildings, a few verticals getting shorter
  for (const [n, f, side] of [[...L.bld, -1], [...L.bldR, 1]]) {
    for (const d of [0.18, 0.42, 0.66, 0.86]) {
      const [x, y] = along(n, f, d)
      const h = 150 * (1 - 0.82 * (1 - (1 - d) ** 1.6))
      stroke(ctx, [[x, y - 18], [x, y - 18 - h]], P.blueDim, 1, 0.4)
      // a lit window now and then, small with distance
      if (d === 0.42 && side < 0) dot(ctx, x + 6 * (1 - d), y - 18 - h * 0.6, 2.2 * (1 - d * 0.6), P.amber, 0.55)
    }
  }
  // its centre line, dashes shrinking with distance
  const cn = (FAR.x0 + FAR.x1) / 2, cf = (632 + 728) / 2
  for (let i = 0; i < 9; i++) {
    const d0 = i / 9, d1 = d0 + 0.045
    stroke(ctx, [along(cn, cf, d0), along(cn, cf, d1)], P.blueDim, 1.2 * (1 - d0 * 0.6), 0.4)
  }
  // its lamps, smaller and dimmer to the end of the picture, with a little light in the wet road
  for (const d of [0.12, 0.34, 0.55, 0.72, 0.86]) {
    for (const [n, f] of [L.kerb, L.kerbR]) {
      const [x, y] = along(n, f, d)
      const s = 1 - 0.85 * (1 - (1 - d) ** 1.6)
      const top = y - 120 * s
      stroke(ctx, [[x, y], [x, top]], P.blueDim, 1, 0.5)
      dot(ctx, x, top, 2.6 * s + 0.6, '#ffe2a8', 0.75 * (1 - d * 0.5))
      dot(ctx, x, top, 8 * s + 1, P.amber, 0.14)
      stroke(ctx, [[x - 3 * s, y + 4 * s], [x + 3 * s, y + 4 * s]], P.amber, 1, 0.3 * (1 - d * 0.5))
    }
  }
  // where the picture ends: another junction, and nothing on it
  const e0 = along(...L.bld, 1), e1 = along(...L.bldR, 1)
  stroke(ctx, [[e0[0] - 30, e0[1] - 2], [e1[0] + 30, e1[1] - 2]], P.blueDim, 1, 0.35)
  ctx.restore()
}

function dot(ctx, x, y, r, color, alpha) {
  const p = new Path2D()
  p.arc(x, y, Math.max(0.5, r), 0, Math.PI * 2)
  beam(ctx, p, color, 1, { alpha })
}

/** our side: the mouth of the side street, the corners of our kerb turning toward us, a crosswalk */
function nearMouth(ctx, t, show, at) {
  const kk = 'kerb'
  // the corners: our kerb turns down toward the camera on both sides of the mouth
  const corner = (x, dir) => {
    const x0 = at(x, kk)
    const p = new Path2D()
    p.moveTo(x0 - dir * 30, Y.nearKerb)
    p.quadraticCurveTo(x0, Y.nearKerb, at(x + dir * 18, 2.6), Y.nearKerb + 30)
    p.lineTo(at(x + dir * 46, 2.9), 760)
    p.moveTo(x0 - dir * 30, Y.kerbFace)
    p.quadraticCurveTo(x0 - dir * 4, Y.kerbFace, at(x + dir * 10, 2.6), Y.kerbFace + 30)
    p.lineTo(at(x + dir * 36, 2.9), 760)
    beam(ctx, p, P.blueMid, 1.2, { alpha: 0.55 })
  }
  corner(NEAR.x0, 1)
  corner(NEAR.x1, -1)
  // the crosswalk across the mouth: two edge lines and short bars
  const bars = new Path2D()
  const a = at(NEAR.x0 + 50, 2.6), b = at(NEAR.x1 - 50, 2.6)
  bars.moveTo(a, 640)
  bars.lineTo(b, 640)
  bars.moveTo(at(NEAR.x0 + 60, 2.8), 712)
  bars.lineTo(at(NEAR.x1 - 60, 2.8), 712)
  beam(ctx, bars, P.blueDim, 1.1, { alpha: 0.32 })
  // and the wet road in the mouth gives back a little of the sign's colour, under the post
  const color = isWalk(show, t) ? GREEN : RED
  const px = at(POST.x, kk) - HEAD.w * 0.56 - 6
  const streak = new Path2D()
  for (let i = 0; i < 6; i++) {
    const yy = 650 + i * 9
    const w = (14 + i * 4) * (0.85 + 0.15 * noise1(t * 1.3 + i, 5))
    const sx = px + 2 * noise1(t * 0.9 + i * 1.7, 6)
    streak.moveTo(sx - w, yy)
    streak.lineTo(sx + w, yy)
  }
  beam(ctx, streak, color, 1.2, { alpha: 0.22 })
}

/** the signal post and its head, DON'T WALK in red or WALK in green, drawn at x (street units) */
function signalPost(ctx, t, show, at) {
  const x = at(POST.x, 'kerb')
  // the post: solid, so it hides what is behind it
  occlude(ctx, rectPath(x - 4, POST.top + 20, 8, POST.base - POST.top - 20))
  const post = new Path2D()
  post.moveTo(x - 4, POST.base)
  post.lineTo(x - 4, POST.top + 20)
  post.moveTo(x + 4, POST.base)
  post.lineTo(x + 4, POST.top + 20)
  post.moveTo(x - 10, POST.base)
  post.lineTo(x + 10, POST.base)
  post.moveTo(x - 6, POST.base - 40)
  post.lineTo(x + 6, POST.base - 40)
  beam(ctx, post, P.blueMid, 1.3, { alpha: 0.75 })
  signHead(ctx, t, show, x - HEAD.w * 1.12 - 6, POST.top, 1.12)
}

/**
 * The signal head: a black housing with a hood, and its lit panel. (x, y) is its top-left, s its size.
 * The words are the only words the special shows, and the only state is the cue.
 */
function signHead(ctx, t, show, x, y, s, o = {}) {
  const w = HEAD.w * s, h = HEAD.h * s
  const walk = isWalk(show, t)
  const color = walk ? GREEN : RED
  // the bracket to the post
  if (!o.noBracket) {
    const br = new Path2D()
    br.moveTo(x + w, y + h * 0.3)
    br.lineTo(x + w + 6 * s, y + h * 0.3)
    br.moveTo(x + w, y + h * 0.7)
    br.lineTo(x + w + 6 * s, y + h * 0.7)
    beam(ctx, br, P.blueMid, 1.2, { alpha: 0.7 })
  }
  // the housing and its hood
  const box = rectPath(x, y, w, h, 4 * s)
  occlude(ctx, box)
  beam(ctx, box, P.blueMid, 1.4, { alpha: 0.8 })
  const hood = new Path2D()
  hood.moveTo(x - 5 * s, y + 2 * s)
  hood.lineTo(x + 4 * s, y - 6 * s)
  hood.lineTo(x + w - 4 * s, y - 6 * s)
  hood.lineTo(x + w + 5 * s, y + 2 * s)
  beam(ctx, hood, P.blueDim, 1.2, { alpha: 0.7 })
  // the panel, a little lit by its own words
  const px = x + 8 * s, py = y + 8 * s, pw = w - 16 * s, ph = h - 16 * s
  const panel = rectPath(px, py, pw, ph, 2 * s)
  occlude(ctx, panel, mix(color, '#000', 0.9))
  beam(ctx, panel, color, 1, { alpha: 0.35 })
  // a soft halo round the head: it is the brightest thing on the street
  const halo = new Path2D()
  halo.ellipse(x + w / 2, y + h / 2, w * 0.85, h * 0.95, 0, 0, Math.PI * 2)
  beam(ctx, halo, color, 1, { alpha: 0.1 })
  const cx = x + w / 2
  const size = 25 * s
  const lab = { size, color, weight: 'm', align: 'center', ls: 0.08 }
  ctx.save()
  // a glow under the letters, then the letters
  ctx.filter = `blur(${(size * 0.14).toFixed(1)}px)`
  if (walk) label(ctx, 'WALK', cx, py + ph / 2 + size * 0.36, { ...lab, alpha: 0.8 })
  else {
    label(ctx, "DON'T", cx, py + ph * 0.44, { ...lab, alpha: 0.8 })
    label(ctx, 'WALK', cx, py + ph * 0.44 + size * 1.05, { ...lab, alpha: 0.8 })
  }
  ctx.restore()
  if (walk) label(ctx, 'WALK', cx, py + ph / 2 + size * 0.36, lab)
  else {
    label(ctx, "DON'T", cx, py + ph * 0.44, lab)
    label(ctx, 'WALK', cx, py + ph * 0.44 + size * 1.05, lab)
  }
}

/**
 * tarfon-close: Larry and the red light, nothing else. The sign is behind his shoulder, nearer
 * the lens than it really stands and a little out of focus, in stage units.
 */
function signClose(ctx, t, show) {
  ctx.save()
  ctx.filter = 'blur(2.2px)'
  signHead(ctx, t, show, 930, 150, 1.85, { noBracket: true })
  ctx.restore()
  // the post going down out of the frame, dim
  const p = new Path2D()
  p.moveTo(930 + HEAD.w * 1.85 + 16, 160)
  p.lineTo(930 + HEAD.w * 1.85 + 16, 720)
  beam(ctx, p, P.blueDim, 2, { alpha: 0.35 })
}

/**
 * The red of the sign on him: no light source, only the side of the picture toward the sign drawn
 * redder, over the puppets. Steady: it never flickers.
 */
function redOnHim(ctx, k) {
  ctx.save()
  // 'color' keeps each pixel's brightness and moves its hue toward the red, so black stays black:
  // only lit lines take the colour, the side of him toward the sign most
  ctx.globalCompositeOperation = 'color'
  const g = ctx.createLinearGradient(1280, 0, 200, 0)
  g.addColorStop(0, `rgba(255,50,40,${(0.7 * k).toFixed(3)})`)
  g.addColorStop(0.45, `rgba(255,50,40,${(0.42 * k).toFixed(3)})`)
  g.addColorStop(1, 'rgba(255,50,40,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1280, 720)
  ctx.restore()
}
