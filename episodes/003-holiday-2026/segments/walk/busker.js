// The busker: a man under a lamp singing to an empty pavement, an open case at his feet, one coin.
//
// On from `busker-heard` to `walk-past` (index.js SCENES). The place is a landmark at the `busker`
// stop, on our side of the street at Larry's depth (production/stage/plan.md): the busker slides in
// from the right just after `busker-in`, two notes into his tune, as the walk eases to a stop, and
// the street scene slides him away to the left after `walk-past`, so his puppet and everything at
// his feet live in the landmark's hooks, which the street calls too.
//
// He is drawn smaller than Larry and full length: he stands a little further along the pavement,
// so his feet, the open case and the coin can be seen. The pavement is low in the frame, so while
// we stand with him the camera settles a little lower (and rises again before we walk on), which
// keeps the case above the captions.
//
// Shots: `approach` (walking, the tune heard, Larry's head lifts; the busker slides in and the
// street stops), `singer` (closer on him singing; at `tune-stops` his head tilts, looking for the
// next note), `two` (both of them and the case; at `coin` one coin comes up from just below the
// frame in front of Larry, his side, and lands in the case; his head dips to it and comes up).
// (Integration pass: it came from our side, which said the viewer gave it; the script means Larry.)
//
// The sign that he is singing, for a viewer without sound, is a small note glyph that leaves his
// mouth on each sung syllable and fades as it rises. No words.
import { beam, occlude, rectPath, mix, P } from '@late-cluster/show/kit/draw.js'
import { clamp, smoothstep, lerp, noise1 } from '@late-cluster/show/kit/ease.js'
import { drawBuskerHat } from '@late-cluster/episode/segments/walk/costumes.js'
import { AZ, VIEW, LARRY } from '@late-cluster/episode/segments/walk/street.js'

// ---------------------------------------------------------------- the place, street x at the stop

const LAYER = 'larry'
/** the busker: head centre, scale, and the pavement he stands on */
const MAN = { x: 965, y: 300, scale: 0.74, floor: 652 }
/** his lamp post, behind him and to his left, its head over him */
const POST = { x: 1062, foot: 650, top: 70, head: [992, 98] }
/** the open case at his feet, towards Larry: the base's top-left corner and size; the lid stands behind it */
const CASE = { x: 806, y: 634, w: 128, h: 16, lid: 30 }
/** the camera's lower framing while we stand with him */
const LOW = 412
const SINGER = { x: 948, y: 352, zoom: 2.5 }

/**
 * As we walk on he gets smaller (review round two: he slid away at one size). Over the three
 * seconds after `walk-past` he, his lamp and his case shrink together about his feet, to
 * 0.55, and his feet rise a little towards the far kerb: he is behind us and further every step.
 * { k: scale, floor: street y of his feet, pivot: street x of his feet }
 */
function recede(show, t, at) {
  // over the three seconds he is still in frame, so the shrinking is seen
  const u = smoothstep(show.at('walk-past') + 0.3, show.at('walk-past') + 3.3, t)
  return { k: 1 - 0.45 * u, floor: MAN.floor - 70 * u, pivot: at(MAN.x, LAYER) }
}

/** his look: three-quarters to our left, towards Larry and us */
const BUSKER_AZ = Math.PI / 2 + 0.55
/** one beat of his tune (the script's 72 bpm) */
const BEAT = 60 / 72

// ---------------------------------------------------------------- timing

const nodAt = (t, at, depth, dur) => {
  const u = (t - at) / dur
  return u > 0 && u < 1 ? depth * Math.sin(Math.PI * u) : 0
}

/** the busker's head this frame: { tilt, nod } */
function buskerHead(show, t) {
  const ts = show.at('tune-stops')
  // a slow sway while he sings
  const singing = show.line('busker-tune')
  const on = singing ? show.window(t, singing.t0, singing.t1 + 0.2, 0.4) : 0
  const sway = 0.035 * on * Math.sin(2 * Math.PI * (72 / 60 / 2) * t)
  // tune-stops: the head tilts, looking for the next note, and holds until the coin
  const look = smoothstep(ts, ts + 0.6, t) * (1 - smoothstep(show.at('coin') + 0.2, show.at('coin') + 1.0, t))
  // walk-past: he nods to us as we go
  const nod = -nodAt(t, show.at('walk-past') + 0.25, 0.14, 0.7) + 0.06 * look
  return { tilt: sway + 0.17 * look, nod }
}

/** the coin: where it is at t (street units, relative to the case), or null before it is thrown */
function coinAt(show, t) {
  const land = show.at('coin')
  const fly = 0.5
  const u = (t - (land - fly)) / fly
  if (u < 0) return null
  const x1 = CASE.x + CASE.w * 0.6, y1 = CASE.y + 5
  if (u >= 1) {
    // a small bounce, then it lies there
    const b = t - land
    const hop = b < 0.22 ? 7 * Math.sin((Math.PI * b) / 0.22) : 0
    return { x: x1, y: y1 - hop, spin: b < 0.3 ? 0.3 + 0.7 * Math.abs(Math.cos(b * 30)) : 0.32 }
  }
  // from just below the frame in front of Larry (his side, not ours), up and over into the case
  const x0 = LARRY.x + 90, y0 = 800
  const x = lerp(x0, x1, u)
  const y = lerp(y0, y1, u) - 300 * Math.sin(Math.PI * u) * (1 - 0.25 * u)
  return { x, y, spin: Math.abs(Math.cos(t * 26)) }
}

// ---------------------------------------------------------------- drawing (street units)

function lampPost(ctx, dx) {
  const { x, foot, top, head } = POST
  const [hx, hy] = [head[0] + dx, head[1]]
  const px = x + dx
  const post = new Path2D()
  post.moveTo(px, foot)
  post.lineTo(px, top + 30)
  post.quadraticCurveTo(px, top, px - 30, top + 4)
  post.lineTo(hx + 12, hy - 18)
  post.moveTo(px - 11, foot)
  post.lineTo(px + 11, foot)
  post.moveTo(px - 6, foot - 46)
  post.lineTo(px + 6, foot - 46)
  occlude(ctx, rectPath(px - 4, top + 20, 8, foot - top - 20))
  beam(ctx, post, P.blueMid, 2, { alpha: 0.8 })
  const hood = new Path2D()
  hood.moveTo(hx - 20, hy)
  hood.lineTo(hx - 10, hy - 12)
  hood.lineTo(hx + 10, hy - 12)
  hood.lineTo(hx + 20, hy)
  hood.closePath()
  occlude(ctx, hood)
  beam(ctx, hood, P.goldMid, 1.6, { alpha: 0.9 })
  const glow = new Path2D()
  glow.arc(hx, hy + 3, 6, 0, Math.PI * 2)
  beam(ctx, glow, '#ffe2a8', 2.6, { alpha: 1, hot: true })
  const halo = new Path2D()
  halo.arc(hx, hy + 3, 26, 0, Math.PI * 2)
  beam(ctx, halo, P.amber, 1.2, { alpha: 0.2 })
  // his pool of light on the pavement: he is the lit thing on this stretch
  const pool = new Path2D()
  pool.ellipse(MAN.x + dx - 20, MAN.floor + 2, 170, 15, 0, 0, Math.PI * 2)
  beam(ctx, pool, P.amber, 1.3, { alpha: 0.28 })
  const pool2 = new Path2D()
  pool2.ellipse(MAN.x + dx - 20, MAN.floor + 2, 100, 8, 0, 0, Math.PI * 2)
  beam(ctx, pool2, P.amber, 1, { alpha: 0.18 })
}

function openCase(ctx, dx, t, show) {
  const { x: x0, y, w, h, lid } = CASE
  const x = x0 + dx
  // the lid, open and leaning back
  const L = new Path2D()
  L.moveTo(x + 4, y)
  L.lineTo(x + 14, y - lid)
  L.lineTo(x + w - 10, y - lid)
  L.lineTo(x + w - 2, y)
  L.closePath()
  occlude(ctx, L)
  beam(ctx, L, P.violet, 1.5, { alpha: 0.8 })
  const lining = new Path2D()
  lining.moveTo(x + 12, y - 4)
  lining.lineTo(x + 19, y - lid + 6)
  lining.lineTo(x + w - 15, y - lid + 6)
  lining.lineTo(x + w - 9, y - 4)
  beam(ctx, lining, mix(P.violet, '#000', 0.4), 1, { alpha: 0.6 })
  // the coin, when it is in, sits in the base (drawn between the lid and the base's front)
  const c = coinAt(show, t)
  const inCase = c && t >= show.at('coin')
  // the base: an open tray, empty, seen a little from above
  const tray = new Path2D()
  tray.moveTo(x - 6, y)
  tray.lineTo(x + w + 6, y)
  tray.lineTo(x + w + 2, y + h)
  tray.lineTo(x - 2, y + h)
  tray.closePath()
  occlude(ctx, tray, mix(P.violet, '#000', 0.88))
  const inner = new Path2D()
  inner.moveTo(x + 2, y + 3)
  inner.lineTo(x + w - 2, y + 3)
  beam(ctx, inner, mix(P.violet, '#000', 0.35), 1, { alpha: 0.7 })
  if (inCase) coin(ctx, c.x + dx, c.y, c.spin)
  beam(ctx, tray, P.violet, 1.6, { alpha: 0.85 })
  const clasp = new Path2D()
  clasp.rect(x + w / 2 - 6, y + h - 5, 12, 4)
  beam(ctx, clasp, P.violet, 1, { alpha: 0.6 })
}

function coin(ctx, x, y, spin) {
  const p = new Path2D()
  p.ellipse(x, y, 11 * Math.max(0.15, spin), 11 * (spin < 0.4 ? 0.42 : 1), 0, 0, Math.PI * 2)
  occlude(ctx, p)
  beam(ctx, p, P.gold, 2, { alpha: 1, hot: true })
}

/** a small note glyph: a head and a stem with a flag */
function note(ctx, x, y, s, alpha) {
  const head = new Path2D()
  head.ellipse(x, y, 5.2 * s, 3.6 * s, -0.4, 0, Math.PI * 2)
  const stem = new Path2D()
  stem.moveTo(x + 4.6 * s, y - 1.5 * s)
  stem.lineTo(x + 4.6 * s, y - 20 * s)
  stem.quadraticCurveTo(x + 6 * s, y - 13 * s, x + 11 * s, y - 11 * s)
  beam(ctx, head, P.violet, 1.6, { alpha })
  beam(ctx, stem, P.violet, 1.4, { alpha })
}

/** run fn in stage units from inside a landmark hook (which draws in street units) */
function inStage(ctx, show, fn) {
  const c = show.cam
  ctx.save()
  ctx.translate(c.x, c.y)
  ctx.scale(1 / c.zoom, 1 / c.zoom)
  ctx.translate(-640, -360)
  try {
    fn()
  } finally {
    ctx.restore()
  }
}

// ---------------------------------------------------------------- the scene

/** where Larry looks, and his nod */
function larryHead(show, t) {
  const heard = show.at('busker-heard')
  const lift = smoothstep(heard + 0.25, heard + 0.9, t)
  const coinT = show.at('coin')
  // the dip to the case, and back up
  const dip = nodAt(t, coinT + 0.08, 1, 0.85)
  const look = t < show.at('busker-in') ? AZ.ahead - 0.06 * lift : 0.06 + 0.24 * dip
  return { look, nod: 0.06 * lift * (1 - smoothstep(show.at('busker-in') + 1.5, show.at('busker-in') + 2.6, t)) - 0.3 * dip }
}

export default {
  name: 'busker',

  direct(t, show, seg) {
    const h = larryHead(show, t)
    seg.street.placeLarry(t, show, seg, { look: h.look })
    show.puppet('larry').nod(h.nod)
    seg.street.directLandmarks(t, show, seg)

    const ease = show.ease.inOutCubic
    const stop = seg.street.moves.find((m) => m.name === 'busker')?.stop ?? show.at('busker-in') + 2.8 // where the walk stops
    const singerAt = stop + 0.5
    const twoAt = show.at('tune-stops') + 1.0
    if (t < singerAt) {
      // walking; the camera settles a little lower as the walk stops
      seg.shot('approach')
      const u = ease(clamp((t - (stop - 1.8)) / 2.0))
      show.camera({ x: VIEW.x, y: lerp(VIEW.y, LOW, u), zoom: 1 })
    } else if (t < twoAt) {
      seg.shot('singer')
      const u = clamp((t - singerAt) / (twoAt - singerAt))
      show.camera({ x: SINGER.x, y: SINGER.y - 6 * u, zoom: SINGER.zoom + 0.08 * u })
    } else {
      // both of them and the case; back up to the walking framing before we walk on
      seg.shot('two')
      const u = ease(show.progress(show.at('coin') + 1.3, show.at('walk-past')))
      show.camera({ x: VIEW.x, y: lerp(LOW, VIEW.y, u), zoom: 1 })
    }
  },

  drawBack(ctx, t, show, seg) {
    seg.street.drawBack(ctx, t, show)
  },

  drawFront(ctx, t, show, seg) {
    seg.street.drawFront(ctx, t, show)
  },

  landmark: {
    stop: 'busker',
    layer: LAYER,
    span: [CASE.x - 160, POST.x + 30],
    // no lamp of the street's own close by: his is the lamp here
    clear: { lamps: [700, 1260] },

    direct(t, show, seg, at) {
      const x = at(MAN.x, LAYER)
      if (x < -300 || x > 1700) return
      const h = buskerHead(show, t)
      const r = recede(show, t, at)
      seg.place('busker', { x, y: r.floor - (MAN.floor - MAN.y) * r.k, scale: MAN.scale * r.k, look: BUSKER_AZ, z: 4, floor: r.floor })
      const b = show.puppet('busker')
      b.tilt(h.tilt)
      b.nod(h.nod)
    },

    front(ctx, t, show, seg, at) {
      const dx = at(0, LAYER)
      const r = recede(show, t, at)
      ctx.save()
      ctx.translate(r.pivot, r.floor)
      ctx.scale(r.k, r.k)
      ctx.translate(-r.pivot, -MAN.floor)
      lampPost(ctx, dx)
      openCase(ctx, dx, t, show)
      ctx.restore()
    },

    over(ctx, t, show, seg, at) {
      const dx = at(0, LAYER)
      // the coin in the air (once it is in, the case draws it)
      const c = coinAt(show, t)
      if (c && t < show.at('coin')) coin(ctx, c.x + dx, c.y, c.spin)
      inStage(ctx, show, () => {
        const hb = buskerHead(show, t)
        drawBuskerHat(ctx, show, { tilt: hb.tilt, nod: hb.nod })
        // a note leaves his mouth on each sung syllable, rising and fading
        const head = show.headOf('busker')
        if (!head || head.x > 1300) return
        for (const id of ['busker-tune', 'busker-behind']) {
          const L = show.line(id)
          // one on each syllable, and one more on every beat a long note is held
          const emits = (L?.words ?? []).flatMap(([w0, w1]) => {
            const out = [w0]
            for (let e = w0 + BEAT; e < w1 - 0.2; e += BEAT) out.push(e)
            return out
          })
          for (const w0 of emits) {
            const age = t - w0
            if (age < 0 || age > 1.4) continue
            const u = age / 1.4
            const k = head.size / 260
            const x = head.mouth[0] - (30 + 50 * u) * k + 10 * noise1(w0 * 7 + age, 3) * k
            const y = head.mouth[1] - (10 + 120 * u) * k
            note(ctx, x, y, 1.7 * k + 0.6, (1 - u) * Math.min(1, age / 0.12))
          }
        }
      })
    },
  },
}
