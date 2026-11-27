// The street: the walk itself, and the helpers every outdoor scene draws with.
//
// Two things live here.
//   1. The street API (`street`, below): one continuous walk distance as a function of t, the
//      layers of the street drawn at that distance, Larry walking, his breath, and the snow. The
//      restaurant, busker, crossing and door scenes draw the street through it from their own
//      files (seg.street, see index.js).
//   2. The street scene (default export): the walk between the landmarks, `street-start` to
//      `answers-ahead`, `walk-on`, `walk-past` and `tune-again`, `cross` to `mostly` (the last block: `last-block`, `comrade`, `glance`).
//
// Units. The street has its own world, separate from the studio's: at the street's standard
// framing (VIEW) the camera is { x: 640, y: 360, zoom: 1 }, so one street unit is one stage pixel.
// A scene may move the camera (show.camera) and everything here follows, Larry included.
//
// Distance. walk(t) is how far we have walked, in pixels of the building-front layer. A layer
// with speed factor k (LAYERS) slides k times as far, so a thing at layer coordinate p is at
// screen x = p − walk(t) · k. Things are placed by where they should be when the walk is stopped
// at a named stop: street.arrive(stop, x, layer) gives that p. Nothing here keeps state between
// frames; seeking to any t gives the same street.
import { beam, occlude, rectPath, P, mix } from '@late-cluster/show/kit/draw.js'
import { clamp, smoothstep, hash01, noise1, rng } from '@late-cluster/show/kit/ease.js'

// ---------------------------------------------------------------- the numbers

/** the street's standard camera: street units = stage pixels */
export const VIEW = { x: 640, y: 360, zoom: 1 }

/** speed factors: how many pixels each layer slides per pixel walked on the fronts */
export const LAYERS = { sky: 0.08, fronts: 1, lamps: 1.2, road: 1.2, centre: 1.7, kerb: 2.3, pavement: 2.5, larry: 2.6 }

/** heights, street units (y down) */
export const Y = { fronts: 432, farKerb: 450, roadTop: 458, centre: 528, nearKerb: 606, kerbFace: 616 }

/** Larry walking: his head's centre and size (scale 1 = an adult head, 200 units across its tile) */
export const LARRY = { x: 430, y: 318, scale: 1.6 }

/** full walking pace, fronts pixels per second; and the length of one step */
export const SPEED = 118
export const STRIDE = SPEED / 1.7

/** head azimuths (radians): 0 is a profile facing screen-right, π/2 is facing us */
export const AZ = { ahead: 0.14, down: 0.2 }

/**
 * The walk. It moves from each `go` to the following `stop` (a cue, plus `after` seconds), easing
 * in over `in` and out over `out` seconds, and stands still between a stop and the next go. `name`
 * is the stop's name, used by street.stop() / street.arrive() and by a landmark's `stop`. `pace`
 * multiplies the speed for that move (default 1); the steps keep their cadence and lengthen.
 * `jump` fronts pixels are added at `jumpAt`, which must be a cut: an elliptical edit, the walk
 * a few seconds further on in the next shot. Breath and step phase ignore jumps.
 */
export const MOVES = [
  // a brisker pace and a short, late stop, so the restaurant's glass comes in at pass-restaurant
  // and not during "Some nights." (integration pass)
  { go: 'street-start', goAfter: 0.2, stop: 'stop-at-window', stopAfter: 0.6, name: 'restaurant', in: 1.4, out: 0.7, pace: 1.25 },
  // walk-on is a cut: the walk jumps on past the restaurant there, so its window is gone and the
  // street dark before the tune is heard (integration pass)
  { go: 'walk-on', goAfter: 0.2, stop: 'busker-in', stopAfter: 2.8, name: 'busker', in: 1.0, out: 2.6, jumpAt: 'walk-on', jump: 400 },
  { go: 'walk-past', goAfter: 0.3, stop: 'crossing-red', stopAfter: 1.4, name: 'crossing', in: 1.6, out: 2.6 },
  // across the side street a little quicker (pace), so its gap is behind us by the last block
  // apartment-door is a cut: the walk jumps there, so his building is not in the last block's
  // shot (it covered the lit flats from just before `glance`) and is in place in the door's wide
  { go: 'walk-sign', goAfter: 0.4, stop: 'apartment-door', stopAfter: 1.2, name: 'door', in: 1.4, out: 2.2, pace: 1.3, jumpAt: 'apartment-door', jump: 560 },
]

/** from here on it snows: a few flakes from `from`, all of it by `full` (cue, seconds after) */
// (review round two: the first snow did not read at 640 × 360; it now starts sooner, there is more of it
// at first, and the flakes are bigger and brighter. Still flakes, not a blizzard.)
export const SNOW = { from: ['cross', 0.8], some: ['cross', 3.4], full: ['apartment-door', 0] }

// ---------------------------------------------------------------- the walk, as a function of t

const sstep = (u) => u * u * (3 - 2 * u)
/** ∫0..u of smoothstep */
const sInt = (u) => u * u * u - (u * u * u * u) / 2

function moveTimes(show, m) {
  const go = show.at(m.go) + (m.goAfter ?? 0)
  const stop = show.at(m.stop) + (m.stopAfter ?? 0)
  let rin = m.in ?? 1.4, rout = m.out ?? 2.2
  const room = stop - go
  if (rin + rout > room) {
    const k = room / (rin + rout)
    rin *= k
    rout *= k
  }
  return { go, stop, rin, rout, name: m.name, pace: m.pace ?? 1, jumpAt: m.jumpAt ? show.at(m.jumpAt) : Infinity, jump: m.jump ?? 0 }
}

/** speed fraction 0..1 of one move at t */
function speedOf(M, t) {
  if (!(t > M.go && t < M.stop)) return 0
  if (t < M.go + M.rin) return M.pace * sstep((t - M.go) / M.rin)
  if (t > M.stop - M.rout) return M.pace * (1 - sstep((t - (M.stop - M.rout)) / M.rout))
  return M.pace
}

/** seconds-at-full-pace covered by one move up to t */
function coveredBy(M, t) {
  if (t <= M.go) return 0
  const tt = Math.min(t, M.stop)
  let s = M.rin * sInt(clamp((tt - M.go) / M.rin))
  const flat0 = M.go + M.rin, flat1 = M.stop - M.rout
  if (tt > flat0) s += Math.max(0, Math.min(tt, flat1) - flat0)
  if (tt > flat1) {
    const u = clamp((tt - flat1) / M.rout)
    s += M.rout * (u - sInt(u))
  }
  return s * M.pace
}

// ---------------------------------------------------------------- the street

/**
 * The street API. index.js builds it once (street.build(show, landmarks)) and hands it to every
 * scene as seg.street. Every method is a pure function of its arguments.
 */
export const street = {
  built: false,

  /**
   * Once, from index.js's setup: the moves' times, the stops' distances, and every layer's
   * geometry. `landmarks` are the scene files' `landmark` exports, each with its `scene`.
   */
  build(show, seg, landmarks = []) {
    this.show = show
    this.seg = seg
    this.moves = MOVES.map((m) => moveTimes(show, m))
    this.stops = {}
    for (const M of this.moves) this.stops[M.name] = this.walk(M.stop)
    this.end = this.walk(Infinity)
    this.landmarks = landmarks.map((L) => ({ ...L, W: this.stops[L.stop] ?? 0 }))
    for (const L of this.landmarks) if (!(L.stop in this.stops)) show._warn(`landmark stop "${L.stop}" is not in street.js MOVES`)
    this.clearedBy = {}
    for (const layer of ['fronts', 'lamps', 'centre', 'kerb', 'pavement']) this.clearedBy[layer] = this.clearRanges(layer)
    // where the moods of the street change, in fronts coordinates (the fronts layer has k = 1)
    const S = this.stops
    this.zones = {
      dark: [S.restaurant + 450, S.busker + 500], // "the street is darker here", from just past the restaurant
      flats: [S.crossing + 1000, S.door + 1400], // the last block: rows of lit apartment windows
    }
    this.holds = this.listenHolds(show)
    this.fronts = this.buildFronts(show)
    this.sky = this.buildSky(show)
    this.lamps = this.buildLamps(show)
    this.built = true
    return this
  },

  // ------------------------------------------------------------ distance and places

  /** fronts pixels walked by t (jumps: false leaves out the jumps at cuts) */
  walk(t, jumps = true) {
    let s = 0
    for (const M of this.moves) {
      s += coveredBy(M, t) * SPEED
      if (jumps && t >= M.jumpAt) s += M.jump
    }
    return s
  },

  /** 0..1: how fast we are walking at t (0 standing, 1 full pace) */
  moving(t) {
    let v = 0
    for (const M of this.moves) v += speedOf(M, t)
    return clamp(v)
  },

  /** the step phase at t (counts steps walked; the fractional part is where in the step). The
   * cadence is the footsteps' (102 a minute) whatever the pace: a faster pace is longer strides. */
  step(t) {
    let s = 0
    for (const M of this.moves) s += coveredBy(M, t) / M.pace
    return (s * SPEED) / STRIDE
  },

  /** fronts distance at a named stop ('restaurant', 'busker', 'crossing', 'door') */
  stop(name) {
    const s = this.stops?.[name]
    if (s === undefined) this.show?._warn(`unknown stop "${name}"`)
    return s ?? 0
  },

  /** a layer's speed factor: a LAYERS name, or a number */
  k(layer = 'fronts') {
    return typeof layer === 'number' ? layer : LAYERS[layer] ?? 1
  },

  /** the layer coordinate of a thing that stands at street x `x` when the walk is stopped at `stop` */
  arrive(stop, x, layer = 'fronts') {
    return x + this.stop(stop) * this.k(layer)
  },

  /** where a thing at layer coordinate p is at t (street x) */
  x(p, layer = 'fronts', t = this.show.t) {
    return p - this.walk(t) * this.k(layer)
  },

  /**
   * The function a landmark draws with: at(x, layer) is where a thing that stands at street x
   * `x` at the landmark's stop is now. At the stop, at(x) === x.
   */
  atFor(stop, t) {
    const d = this.stop(stop) - this.walk(t)
    return (x, layer = 'fronts') => x + d * this.k(layer)
  },

  // ------------------------------------------------------------ the holds

  /** every `listen-…` cue: from the cue to the start of the next line. That gap is the viewer speaking. */
  listenHolds(show) {
    const out = {}
    for (const [name, at] of Object.entries(show.cues.cues ?? {})) {
      if (!name.startsWith('listen-')) continue
      // the next spoken line: the footsteps are `beat` lines and do not end a hold
      const next = show.lines.find((l) => l.t0 >= at - 1e-3 && l.kind !== 'beat')
      out[name] = { t0: at, t1: next ? next.t0 : at + 1.5, line: next?.id }
    }
    return out
  },

  /** true while a listen hold is on (nothing new should happen in the picture) */
  holding(t) {
    for (const h of Object.values(this.holds)) if (t >= h.t0 && t < h.t1) return true
    return false
  },

  // ------------------------------------------------------------ geometry, built once

  /**
   * The ranges of one layer that the landmarks clear, as layer coordinates. A landmark's `clear`
   * gives them in street x at its stop: { fronts, lamps, centre, kerb, pavement } (pavement
   * defaults to kerb's).
   */
  clearRanges(layer) {
    const k = this.k(layer)
    const out = []
    for (const L of this.landmarks) {
      const r = L.clear?.[layer] ?? (layer === 'pavement' ? L.clear?.kerb : null)
      if (r) out.push([r[0] + L.W * k, r[1] + L.W * k])
    }
    return out.sort((a, b) => a[0] - b[0])
  },

  cleared(layer) {
    return this.clearedBy?.[layer] ?? this.clearRanges(layer)
  },

  buildFronts(show) {
    const r = show.rng('walk-fronts')
    const clear = this.cleared('fronts')
    const from = -700, to = this.end + 2600
    // fill the free stretches between cleared ranges with buildings
    const spans = []
    let a = from
    for (const [c0, c1] of clear) {
      if (c0 > a) spans.push([a, c0])
      a = Math.max(a, c1)
    }
    if (a < to) spans.push([a, to])
    const out = []
    for (const [s0, s1] of spans) {
      let x = s0
      while (x < s1 - 40) {
        let w = r.range(150, 320)
        if (s1 - (x + w) < 120) w = s1 - x
        out.push(this.building(r, x, w))
        x += w
      }
    }
    return out
  },

  zone(p) {
    const z = this.zones
    if (p >= z.flats[0] && p < z.flats[1]) return 'flats'
    if (p >= z.dark[0] && p < z.dark[1]) return 'dark'
    return 'plain'
  },

  /** one building front: local x 0..w, y up from the fronts line */
  building(r, x0, w) {
    const zone = this.zone(x0 + w / 2)
    const flats = zone === 'flats'
    const base = Y.fronts
    const groundH = 62, floorH = 46
    const floors = flats ? 6 + r.int(2) : 2 + r.int(4)
    const h = groundH + floors * floorH + r.range(8, 22)
    const top = base - h
    const outline = new Path2D()
    outline.moveTo(0, base)
    outline.lineTo(0, top)
    outline.lineTo(w, top)
    outline.lineTo(w, base)
    const detail = new Path2D()
    // cornice and the ground-floor line
    detail.moveTo(-3, top + 7)
    detail.lineTo(w + 3, top + 7)
    detail.moveTo(0, base - groundH)
    detail.lineTo(w, base - groundH)
    const dark = new Path2D(), lit = new Path2D(), litFill = new Path2D()
    const cols = Math.max(1, Math.floor((w - 22) / 46))
    const gap = (w - cols * 22) / (cols + 1)
    const litP = flats ? 0.62 : zone === 'dark' ? 0.015 : 0.15
    for (let f = 0; f < floors; f++) {
      const wy = base - groundH - (f + 1) * floorH + 10
      for (let c = 0; c < cols; c++) {
        const wx = gap + c * (22 + gap)
        // the last block's rows are lit from the second floor up
        const on = flats ? f >= 1 && r() < litP : r() < litP
        const p = on ? lit : dark
        p.rect(wx, wy, 22, 28)
        if (on) {
          litFill.rect(wx, wy, 22, 28)
          // a sash bar
          lit.moveTo(wx, wy + 14)
          lit.lineTo(wx + 22, wy + 14)
        }
      }
    }
    // the ground floor: a street door, or a shop with its shutter down
    const shop = !flats && w > 200 && r() < 0.45
    if (shop) {
      const sw = w * 0.62, sx = (w - sw) / 2 - 14
      detail.rect(sx, base - 46, sw, 40)
      for (let yy = base - 40; yy < base - 8; yy += 7) {
        detail.moveTo(sx + 3, yy)
        detail.lineTo(sx + sw - 3, yy)
      }
      detail.rect(sx + sw + 12, base - 46, 22, 46)
    } else {
      const dx = r.range(0.2, 0.7) * (w - 30)
      detail.rect(dx, base - 50, 26, 50)
      detail.moveTo(dx - 4, base - 54)
      detail.lineTo(dx + 30, base - 54)
      if (flats || r() < 0.4) {
        // the lit pane over a street door
        lit.rect(dx + 2, base - 62, 22, 6)
        litFill.rect(dx + 2, base - 62, 22, 6)
      }
    }
    // a fire escape down one column of windows
    if (!flats && floors >= 3 && cols >= 2 && r() < 0.3) {
      const ex = gap + r.int(cols) * (22 + gap) - 8
      for (let f = 0; f < floors; f++) {
        const py = base - groundH - f * floorH - 2
        detail.rect(ex, py - 3, 38, 3)
        detail.moveTo(ex + 4, py - 3)
        detail.lineTo(ex + 34, py - floorH + 2)
      }
    }
    return { x0, w, top, outline, detail, dark, lit, litFill, flats }
  },

  buildSky(show) {
    const r = show.rng('walk-sky')
    const towers = []
    const outline = new Path2D(), lights = []
    let x = -800
    const to = this.end * LAYERS.sky + 2400
    while (x < to) {
      const w = r.range(50, 140)
      const h = r.range(120, 300)
      const top = Y.fronts - h
      outline.moveTo(x, Y.fronts)
      outline.lineTo(x, top)
      if (r() < 0.15) {
        // a stepped top
        outline.lineTo(x + w * 0.3, top)
        outline.lineTo(x + w * 0.3, top - 22)
        outline.lineTo(x + w * 0.7, top - 22)
        outline.lineTo(x + w * 0.7, top)
      }
      outline.lineTo(x + w, top)
      outline.lineTo(x + w, Y.fronts)
      for (let i = 0; i < 4; i++) if (r() < 0.5) lights.push({ x: x + r.range(6, w - 6), y: top + r.range(10, h * 0.6) })
      towers.push({ x, w, top })
      x += w + r.range(-10, 30)
    }
    return { outline, lights, towers }
  },

  buildLamps(show) {
    const r = show.rng('walk-lamps')
    const k = LAYERS.lamps
    const lampAt = (t) => LARRY.x + this.walk(t) * k
    // lamps that pass behind Larry's head on a cue: the direction asks for them
    const at = (name, dt = 0) => show.at(name) + dt
    const featured = [
      lampAt(at('eyes-front', 0.7)), // "A lamp post goes by first."
      lampAt(at('what-helped.end', 0.05)), // "Two lamp posts go by with nobody talking."
      lampAt(at('listen-help', -0.45)),
    ].filter(Number.isFinite)
    const clear = this.cleared('lamps')
    const holds = Object.values(this.holds)
    const out = []
    let p = -300
    const to = this.end * k + 2400
    while (p < to) {
      const dark = this.zone(p / k) === 'dark'
      p += dark ? r.range(560, 680) : r.range(340, 460)
      if (featured.some((f) => Math.abs(f - p) < 190)) continue
      out.push(p)
    }
    out.push(...featured)
    return out
      .filter((q) => !clear.some(([a, b]) => q >= a && q <= b))
      // no lamp goes by during a listen hold: nothing else happens then
      .filter((q) => !holds.some((h) => q - this.walk(h.t0 - 0.1) * k > LARRY.x - 25 && q - this.walk(h.t1 + 0.1) * k < LARRY.x + 25))
      .sort((a, b) => a - b)
      .map((q) => ({ p: q, dim: this.zone(q / k) === 'dark' ? 0.6 : 1 }))
  },

  // ------------------------------------------------------------ drawing

  /** the street x range the current camera sees, with a margin */
  view(show, margin = 80) {
    const c = show.cam
    return [c.x - 640 / c.zoom - margin, c.x + 640 / c.zoom + margin]
  },

  /** the lamps in view at t: [{ x (street x of the post), y (top of its head), dim }] */
  lampsInView(show, t) {
    const [v0, v1] = this.view(show, 120)
    const off = this.walk(t) * LAYERS.lamps
    const out = []
    for (const L of this.lamps) {
      const x = L.p - off
      if (x > v0 && x < v1) out.push({ x, head: [x + 24, Y.farKerb - 236], dim: L.dim })
    }
    return out
  },

  /**
   * Everything behind the puppets, in the street world: the skyline, the fronts, the landmarks'
   * `back`, the lamps and their reflections, the road, the kerb, the landmarks' `front`, far snow.
   * o: { landmarks: false (leave them out), snow (an amount, overriding the cue's), bright (0..1:
   * the lamps) }. Call from a scene's drawBack: seg.street.drawBack(ctx, t, show).
   */
  drawBack(ctx, t, show, o = {}) {
    const seg = this.seg
    show.world(ctx, (ctx) => {
      const [v0, v1] = this.view(show)
      const walk = this.walk(t)
      // ---- the skyline: a plain city, very far
      ctx.save()
      ctx.translate(-walk * LAYERS.sky, 0)
      beam(ctx, this.sky.outline, P.blueDim, 1, { alpha: 0.55 })
      ctx.restore()
      for (const L of this.sky.lights) {
        const x = L.x - walk * LAYERS.sky
        if (x > v0 && x < v1) dotLight(ctx, x, L.y, 1.1, P.amber, 0.35)
      }
      // ---- the building fronts across the road
      for (const B of this.fronts) {
        const x = B.x0 - walk
        if (x + B.w < v0 || x > v1) continue
        ctx.save()
        ctx.translate(x, 0)
        occlude(ctx, B.outline)
        beam(ctx, B.outline, P.blueMid, 1.2, { alpha: 0.5 })
        beam(ctx, B.detail, P.blueDim, 1, { alpha: 0.55 })
        beam(ctx, B.dark, P.blueDim, 0.9, { alpha: 0.45 })
        occlude(ctx, B.litFill, mix(P.amber, '#000', 0.82))
        beam(ctx, B.lit, P.amber, 1.1, { alpha: 0.85 })
        ctx.restore()
      }
      // the far pavement and kerb
      line(ctx, v0, Y.fronts, v1, Y.fronts, P.blueDim, 1, 0.5)
      line(ctx, v0, Y.farKerb, v1, Y.farKerb, P.blueMid, 1.1, 0.55)
      line(ctx, v0, Y.roadTop, v1, Y.roadTop, P.blueDim, 1, 0.35)
      this.callLandmarks('back', ctx, t, show, seg, o)
      // ---- lamps, and each lamp again in the wet road
      for (const L of this.lampsInView(show, t)) lamp(ctx, L, t, o.bright ?? 1)
      // ---- the road: a dashed centre line, then our kerb and our pavement
      const cOff = walk * LAYERS.centre
      const dash = new Path2D()
      for (let x = Math.floor((v0 + cOff) / 160) * 160 - cOff; x < v1; x += 160) {
        if (this.isCleared('centre', x + cOff)) continue
        dash.moveTo(x, Y.centre)
        dash.lineTo(x + 70, Y.centre - 1)
      }
      beam(ctx, dash, P.blueDim, 1.4, { alpha: 0.4 })
      const kOff = walk * LAYERS.kerb, pOff = walk * LAYERS.pavement
      const kerb = new Path2D()
      // the kerb: its top edge and its face, broken where a landmark clears it
      for (const [a, b] of this.openRanges('kerb', v0 + kOff, v1 + kOff)) {
        kerb.moveTo(a - kOff, Y.nearKerb)
        kerb.lineTo(b - kOff, Y.nearKerb)
        kerb.moveTo(a - kOff, Y.kerbFace)
        kerb.lineTo(b - kOff, Y.kerbFace)
        for (let x = Math.ceil(a / 92) * 92; x < b; x += 92) {
          kerb.moveTo(x - kOff, Y.nearKerb)
          kerb.lineTo(x - kOff - 3, Y.kerbFace)
        }
      }
      beam(ctx, kerb, P.blueMid, 1.2, { alpha: 0.5 })
      const pave = new Path2D()
      for (const [a, b] of this.openRanges('pavement', v0 + pOff, v1 + pOff)) {
        for (let x = Math.ceil(a / 130) * 130; x < b; x += 130) {
          pave.moveTo(x - pOff, Y.kerbFace + 4)
          pave.lineTo(x - pOff - 38, 740)
        }
      }
      beam(ctx, pave, P.blueDim, 1, { alpha: 0.3 })
      this.callLandmarks('front', ctx, t, show, seg, o)
      // ---- snow behind the puppets
      const amount = o.snow ?? this.snowAmount(t)
      if (amount > 0) {
        this.snow(ctx, t, show, { amount, layer: 'far' })
        this.snow(ctx, t, show, { amount, layer: 'mid' })
      }
    })
  },

  /**
   * In front of the puppets: the landmarks' `over`, near snow (in the street world), then Larry's
   * breath (stage units). o: { breath: false, snow, landmarks: false }.
   * Call from a scene's drawFront: seg.street.drawFront(ctx, t, show).
   */
  drawFront(ctx, t, show, o = {}) {
    show.world(ctx, (ctx) => {
      this.callLandmarks('over', ctx, t, show, this.seg, o)
      const amount = o.snow ?? this.snowAmount(t)
      if (amount > 0) this.snow(ctx, t, show, { amount, layer: 'near' })
    })
    if (o.breath !== false) this.breath(ctx, t, show, 'larry')
  },

  /** a landmark's hook, for every landmark near enough to be in view */
  callLandmarks(hook, ctx, t, show, seg, o = {}) {
    if (o.landmarks === false) return
    const [v0, v1] = this.view(show, 0)
    for (const L of this.landmarks) {
      const fn = L[hook]
      if (!fn) continue
      const at = this.atFor(L.stop, t)
      // cull by its extent: `span` [x0, x1] street x at the stop, on its fastest `layer`
      const [x0, x1] = L.span ?? [-200, 1500]
      if (at(x1, L.layer ?? 'fronts') < v0 || at(x0, L.layer ?? 'fronts') > v1) continue
      ctx.save()
      try {
        fn.call(L.scene, ctx, t, show, seg, at)
      } catch (e) {
        show._warn(`landmark ${L.stop} ${hook}() threw: ${e?.message ?? e}`)
      }
      ctx.restore()
    }
  },

  /** puppets a landmark brings (its `direct`), placed while it is near: call from a scene's direct */
  directLandmarks(t, show, seg = this.seg) {
    for (const L of this.landmarks) {
      if (!L.direct) continue
      try {
        L.direct.call(L.scene, t, show, seg, this.atFor(L.stop, t))
      } catch (e) {
        show._warn(`landmark ${L.stop} direct() threw: ${e?.message ?? e}`)
      }
    }
  },

  isCleared(layer, p) {
    return this.cleared(layer).some(([a, b]) => p >= a && p <= b)
  },

  /** [a, b] layer ranges inside [p0, p1] that no landmark clears */
  openRanges(layer, p0, p1) {
    const out = []
    let a = p0
    for (const [c0, c1] of this.cleared(layer)) {
      if (c1 < a || c0 > p1) continue
      if (c0 > a) out.push([a, c0])
      a = Math.max(a, c1)
    }
    if (a < p1) out.push([a, p1])
    return out
  },

  // ------------------------------------------------------------ Larry walking

  /**
   * Put Larry on the street at t: side-on, chest up, at LARRY, with the walking bob and sway. It
   * places him and returns the placement; a scene then turns his head (lookAt) or moves him (place).
   * o: { x, y, scale } to stand him elsewhere (street units), look (default AZ.ahead).
   */
  placeLarry(t, show, seg = this.seg, o = {}) {
    const m = this.moving(t)
    const ph = this.step(t)
    const bob = 5 * m * (0.5 - 0.5 * Math.cos(2 * Math.PI * ph))
    const pl = seg.place('larry', { x: o.x ?? LARRY.x, y: (o.y ?? LARRY.y) - bob, scale: o.scale ?? LARRY.scale, look: o.look ?? AZ.ahead, z: 5 })
    show.puppet('larry').tilt(0.018 * m * Math.sin(Math.PI * ph))
    return pl
  },

  /**
   * His breath in the cold: a small puff from the mouth every few seconds, drifting back as he
   * walks, gone in a second and a half. Stage units; call after the puppets (drawFront). None
   * starts during a listen hold.
   */
  breath(ctx, t, show, who = 'larry') {
    const h = show.headOf(who)
    if (!h) return
    const p = show.puppets.get(who)
    const dir = Math.cos(p?.az ?? 0) >= 0 ? 1 : -1
    const period = 2.9, life = 1.3
    const n = Math.floor(t / period)
    for (let i = n - 1; i <= n; i++) {
      const tp = i * period + hash01(i, 77) * 0.8
      const age = t - tp
      if (age < 0 || age > life || this.holding(tp)) continue
      const u = age / life
      const k = h.size / 320
      // the breath hangs in still air while we walk on, but it leaves the mouth moving with him
      const drift = (this.walk(t, false) - this.walk(tp, false)) * LAYERS.larry * 0.3 * show.cam.zoom
      const x0 = h.mouth[0] + dir * (10 + 26 * Math.sqrt(u)) * k - drift
      const y0 = h.mouth[1] + 4 * k - 18 * u * k
      const a = 0.32 * (1 - u) * Math.min(1, age / 0.15)
      for (let j = 0; j < 4; j++) {
        const jx = x0 + dir * j * 7 * k * (0.6 + u) + noise1(t * 1.3 + j, i) * 4 * k
        const jy = y0 + (j - 1.5) * 3 * k * (0.6 + u)
        const r = (3 + 9 * u) * k * (1 - j * 0.12)
        const c = new Path2D()
        c.arc(jx, jy, r, 0, Math.PI * 2)
        beam(ctx, c, '#cfe6ff', 0.9, { alpha: a * (1 - j * 0.18) })
      }
    }
  },

  // ------------------------------------------------------------ snow

  /** how much snow at t: 0 before `cross`, a few flakes, then all of it by the door */
  snowAmount(t) {
    const show = this.show
    const at = ([c, dt]) => show.at(c) + dt
    const a0 = at(SNOW.from), a1 = at(SNOW.some), a2 = at(SNOW.full)
    if (t < a0) return 0
    if (t < a1) return 0.45 * smoothstep(a0, a1, t)
    return 0.45 + 0.55 * smoothstep(a1, a2, t)
  },

  /**
   * Snow, drawn in whatever units the context is in (call inside show.world for the street).
   * o: { amount 0..1, layer 'far' | 'mid' | 'near', walk (the walk distance it slides with:
   * default the street's; pass 0 indoors, for snow seen through a still window), rect { x, y, w, h }
   * (the box the flakes fill, default the street's whole world), lamps (lamp heads to brighten
   * near: default the street's in view) }
   */
  snow(ctx, t, show, o = {}) {
    const amount = o.amount ?? this.snowAmount(t)
    if (amount <= 0) return
    const L = SNOW_LAYERS[o.layer ?? 'mid']
    const R = o.rect ?? { x: -700, y: -120, w: 2680, h: 980 }
    const walk = o.walk ?? this.walk(t)
    const lamps = o.lamps ?? (o.rect ? [] : this.lampsInView(show, t).map((l) => l.head))
    const n = Math.round(L.n * (R.w * R.h) / (2680 * 980))
    const buckets = [new Path2D(), new Path2D(), new Path2D()]
    for (let i = 0; i < n; i++) {
      const thr = hash01(i, L.seed)
      if (thr > amount) continue
      const fall = L.vy * (0.75 + 0.5 * hash01(i, L.seed + 1))
      const y = R.y + mod(hash01(i, L.seed + 2) * R.h + fall * t, R.h)
      const sway = L.sway * noise1(t * 0.4 + i * 0.37, L.seed + 3)
      const x = R.x + mod(hash01(i, L.seed + 4) * R.w - walk * L.k + sway + L.wind * t, R.w)
      // brighter in a lamp's light
      let lit = 0
      for (const [lx, ly] of lamps) {
        const dy = y - ly
        if (dy < -30) continue
        const dx = Math.abs(x - lx)
        lit = Math.max(lit, clamp(1 - dx / (40 + dy * 0.55)) * clamp(1 - dy / 420))
      }
      const fade = smoothstep(thr, thr + 0.06, amount)
      const level = clamp((0.55 + 0.45 * lit) * fade)
      const b = level > 0.66 ? 2 : level > 0.4 ? 1 : 0
      const r = L.r * (0.7 + 0.6 * hash01(i, L.seed + 5))
      buckets[b].moveTo(x + r, y)
      buckets[b].arc(x, y, r, 0, Math.PI * 2)
    }
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = '#dfeeff'
    ;[0.3, 0.55, 0.9].forEach((a, b) => {
      ctx.globalAlpha = a * L.alpha
      ctx.fill(buckets[b])
    })
    ctx.restore()
  },
}

const SNOW_LAYERS = {
  far: { n: 220, k: 1.1, vy: 34, sway: 10, wind: -6, r: 1.6, alpha: 0.75, seed: 401 },
  mid: { n: 130, k: 1.9, vy: 58, sway: 18, wind: -9, r: 2.6, alpha: 0.9, seed: 402 },
  near: { n: 40, k: 3.2, vy: 96, sway: 30, wind: -14, r: 4.2, alpha: 0.9, seed: 403 },
}

const mod = (a, n) => ((a % n) + n) % n

function line(ctx, x0, y0, x1, y1, color, w, alpha) {
  const p = new Path2D()
  p.moveTo(x0, y0)
  p.lineTo(x1, y1)
  beam(ctx, p, color, w, { alpha })
}

function dotLight(ctx, x, y, r, color, alpha) {
  const p = new Path2D()
  p.arc(x, y, r, 0, Math.PI * 2)
  beam(ctx, p, color, 1, { alpha })
}

/** a lamp post on the far kerb, and the same lamp upside down and dimmer in the wet road */
function lamp(ctx, L, t, bright) {
  const x = L.x, base = Y.farKerb, top = base - 228
  const [hx, hy] = L.head
  const a = L.dim * bright
  const post = new Path2D()
  post.moveTo(x, base)
  post.lineTo(x, top)
  post.quadraticCurveTo(x + 2, hy - 10, hx - 4, hy - 6)
  post.moveTo(x - 7, base)
  post.lineTo(x + 7, base)
  post.moveTo(x - 4, base - 30)
  post.lineTo(x + 4, base - 30)
  occlude(ctx, rectPath(x - 3, top, 6, base - top))
  beam(ctx, post, P.blueMid, 1.4, { alpha: 0.75 * a })
  // the head: a small hood and the light under it
  const hood = new Path2D()
  hood.moveTo(hx - 12, hy)
  hood.lineTo(hx - 6, hy - 7)
  hood.lineTo(hx + 6, hy - 7)
  hood.lineTo(hx + 12, hy)
  hood.closePath()
  occlude(ctx, hood)
  beam(ctx, hood, P.goldMid, 1.2, { alpha: 0.8 * a })
  const glow = new Path2D()
  glow.arc(hx, hy + 2, 4, 0, Math.PI * 2)
  beam(ctx, glow, '#ffe2a8', 2, { alpha: a, hot: true })
  const halo = new Path2D()
  halo.arc(hx, hy + 2, 16, 0, Math.PI * 2)
  beam(ctx, halo, P.amber, 1, { alpha: 0.16 * a })
  // its pool of light on the far pavement
  const pool = new Path2D()
  pool.ellipse(hx, base - 4, 46, 5, 0, 0, Math.PI * 2)
  beam(ctx, pool, P.amber, 1, { alpha: 0.18 * a })
  // in the wet road: upside down, foreshortened, dimmer, broken by the water
  const water = Y.roadTop
  const ry = water + (water - hy) * 0.55
  const streak = new Path2D()
  for (let i = 0; i < 9; i++) {
    const u = i / 8
    const yy = water + 6 + u * (ry - water + 4)
    const w = (3 + 7 * u) * (0.8 + 0.4 * (0.5 + 0.5 * noise1(t * 1.7 + i * 0.9, Math.round(x))))
    const sx = hx + 2.5 * noise1(t * 1.1 + i * 1.3, Math.round(x) + 9)
    streak.moveTo(sx - w, yy)
    streak.lineTo(sx + w, yy)
  }
  beam(ctx, streak, P.amber, 1.3, { alpha: 0.42 * a })
  const rpost = new Path2D()
  for (let yy = water + 4; yy < ry - 6; yy += 9) {
    rpost.moveTo(x + noise1(t + yy * 0.05, 3) * 1.5, yy)
    rpost.lineTo(x, yy + 4)
  }
  beam(ctx, rpost, P.blueDim, 1, { alpha: 0.3 * a })
}

// ---------------------------------------------------------------- the street scene

/**
 * Where Larry looks on the street: from each entry's time on, until the next entry. A time is a
 * cue or line id (show.at), plus `dt` seconds. `look` is AZ.ahead (the road), 'camera' (us) or an
 * azimuth.
 */
const GAZE = [
  { at: 'street-start', look: AZ.ahead },
  { at: 'turn-to-us', look: 'camera' }, // he asks, and waits on us
  { at: 'eyes-front', look: AZ.ahead }, // easier to say the next part not looking at us
  { at: 'listen-help', look: 'camera' }, // the hold: we are speaking
  { at: 'answers-ahead', look: AZ.ahead },
  { at: 'walk-on', look: AZ.ahead },
  { at: 'started-anyway', dt: -0.45, look: 'camera' }, // the next line to us, walking
  { at: 'tune-again', look: AZ.ahead }, // he does not look back
  { at: 'cross', look: AZ.down },
  { at: 'last-block', look: AZ.ahead }, // straight ahead, not at us
  { at: 'glance', dt: 0.55, look: 'camera' }, // a beat of footsteps, then to us
  { at: 'glance', dt: 1.15, look: AZ.ahead }, // and away again at once
]

function gazeAt(show, t) {
  let cur = GAZE[0]
  for (const g of GAZE) if (show.at(g.at) + (g.dt ?? 0) <= t) cur = g
  return cur.look
}

/** a nod down and back up, centred `dt` after a cue: chin down by `depth` radians */
function nodAt(show, t, cue, dt, depth = 0.11, dur = 0.55) {
  const u = (t - show.at(cue) - dt) / dur + 0.5
  return u > 0 && u < 1 ? -depth * Math.sin(Math.PI * u) : 0
}

export default {
  name: 'street',

  setup(show, seg) {},

  direct(t, show, seg) {
    const { street } = seg
    street.placeLarry(t, show, seg, { look: gazeAt(show, t) })
    street.directLandmarks(t, show, seg)
    const larry = show.puppet('larry')
    // me-too: one small nod, late
    larry.nod(nodAt(show, t, 'me-too', 0.45))
    // cross: his head a little down in the first snow
    if (t >= show.at('cross') && t < show.at('last-block')) larry.nod(-0.08 * smoothstep(show.at('cross'), show.at('cross') + 1.2, t))
    // comrade: the Norse line, chin up a little, eyes on the road (round four)
    if (show.between('comrade', 'glance')) larry.nod(0.06 * smoothstep(show.at('comrade'), show.at('comrade') + 0.8, t))
    // glance: a tilt as he turns away again
    larry.tilt(0.07 * Math.max(0, Math.sin(Math.PI * clamp((t - show.at('glance') - 0.9) / 0.9))))

    // the camera. The standard framing, except: from eyes-front a tighter profile that pushes in
    // very slowly while he talks, cut back to the standard at the listen hold; the last block is
    // a little closer, with the lit windows above him.
    if (show.between('eyes-front', 'listen-help')) {
      const u = show.progress('eyes-front', 'listen-help')
      seg.shot('profile')
      show.camera({ x: 560, y: 352, zoom: 1.14 + 0.07 * u })
    } else if (show.between('comrade', 'glance')) {
      // round four: a cut on `comrade` to closer on him, still in profile and walking, the lit
      // windows going by above him; a slow push through the quotation. Cut back out on `glance`.
      const u = show.progress('comrade', 'glance')
      seg.shot('comrade')
      show.camera({ x: 560, y: 296, zoom: 1.42 + 0.06 * u })
    } else if (show.between('last-block', 'apartment-door')) {
      seg.shot('last-block')
      show.camera({ x: 520, y: 300, zoom: 1.2 })
    } else {
      seg.shot('track')
      show.camera(VIEW)
    }
  },

  drawBack(ctx, t, show, seg) {
    seg.street.drawBack(ctx, t, show)
  },

  drawFront(ctx, t, show, seg) {
    seg.street.drawFront(ctx, t, show)
  },
}
