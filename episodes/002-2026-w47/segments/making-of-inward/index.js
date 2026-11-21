// making-of-inward: the direction. ONE CONTINUOUS SHOT: the camera goes into Larry's mouth and down
// the show's pipeline backwards, one place to a word (show < scenes < review < scripts < review <
// posts < community): five throats, each with a smaller Larry at the far end, then the bare vocal
// tract and the cluster at the bottom, where the show's handle is typed. Then it backs out the way
// it came while each Larry says his place, and the line is said forwards.
// Preview: npm run dev -- 2, then /?seg=making-of-inward · frames: npm run shoot -- 2 making-of-inward 1 3
//
// The studio's puppets are not used on stage here. Every Larry, the one at the desk included, is the
// studio's own head model drawn from one 3D camera (rig.js), moving with Larry's telemetry as every
// head does, in the house look (gold head, the tuxedo from the studio's costume code). The first and
// last frames are the studio's desk shot exactly: the same camera the stage would use for the puppet,
// over the studio's own set.
import { lookFor } from '@late-cluster/show/looks.js'
import { mix } from '@late-cluster/show/engine/palette.js'
import { noise1, hashSeed } from '@late-cluster/show/kit/ease.js'
import { REST_ARTIC } from '@late-cluster/show/engine/heads.js'
import {
  T, MOUTH, AXIS_X as AX, DIST, NEST, W, H,
  add, sub, mul, norm, len, mix3, dirAz,
  convP, convD, convCam, projector, headFor, aimFull, paintHead, paintPuppet,
} from '@late-cluster/episode/segments/making-of-inward/rig.js'
import { polyline3, ringPts, desk3, quad3, quads3, rect3, ear, plate, strip, kazooDrawing, door3, postBox, clamp } from '@late-cluster/episode/segments/making-of-inward/props.js'

const PI = Math.PI
const SET_KEYS = ['wall', 'truss', 'floor', 'window', 'curtain', 'onair', 'sign', 'bandstand', 'couch', 'chair', 'desk']

// ---------------------------------------------------------------- the studio framing (the desk shot)
const DESK_MARK = { x: 1790, y: 548 }
const DESK_CAM = { x: 1750, y: 614, zoom: 1.85 }
const AZ0 = PI / 2 + 0.382 // how the stage turns Larry to camera in the desk shot
const S0 = 200 * DESK_CAM.zoom
const C0 = [(DESK_MARK.x - DESK_CAM.x) * DESK_CAM.zoom + 640, (DESK_MARK.y - DESK_CAM.y) * DESK_CAM.zoom + 360]
const studioCam = (az = AZ0) => ({ L: 0, pos: add(T, mul(dirAz(az, 0.13), DIST)), tgt: T, up: [0, 1, 0], S: S0, cx: C0[0], cy: C0[1] })

// ---------------------------------------------------------------- the throats
// level j's throat runs down head j's y axis from below the glottis; up on screen is −x, the floor +x.
// Plain ribs, no labels. Each is shorter than the one before; head j+1 stands at its end.
const UPT = [-1, 0, 0]
const R = 4
const THROATS = [
  { kind: 'scenes', D: 3, end: -42 },
  { kind: 'review', D: 3, end: -32 },
  { kind: 'scripts', D: 3, end: -34 },
  { kind: 'review2', D: 3, end: -28 },
  { kind: 'posts', D: 3, end: -21 },
]
THROATS.forEach((th, j) => (NEST.centre[j] = [AX - 1.1, th.end, 0]))
const ribYs = (j) => {
  const out = []
  for (let y = -2; y > THROATS[j].end + 4; y -= THROATS[j].D) out.push(y)
  return out
}
const LARRY_AT = (j) => [AX - 1.1, THROATS[j].end, 0] // the next Larry's head, in level j
// a small Larry's desk, in his own frame (as the studio's desk sits in front of the big one)
const DESK = { x0: 3, x1: 19, y0: -15, y1: -36, z: 30 }

// SCENES (level 0): a frame hanging from a rib with the drawing in it, the report strip under it
const FRAME_Y = -23
const KFRAME = [AX - 2.1, FRAME_Y, 1.5] // the frame with the kazoo in it
const STRIP_AT = [AX - 0.55, FRAME_Y, 1.5]
// REVIEW (levels 1 and 3): two desks back to back, the camera between them
const RDESK_Y = [-14, -10]
// SCRIPTS (level 2): the empty desk, the shut door, the ear on a rib beyond them
const DESK6 = { x: AX + 3.5, y: -11, z: 1.5 }
const DOOR6 = [AX + 3.8, -12.8, -0.6]
const EAR = [AX + 0.4, -20, -3.55]

// ---------------------------------------------------------------- the camera's path
// keys: { t, L, pos, tgt, up, S, cx, cy, ease, focus, orbit }; `focus` (in the key's level) makes
// the move from the previous key an approach (distance to it eased exponentially, like a push);
// `focusBack` makes it a retreat from the previous key's focus
const WIDE = 300 // S for a wide lens (about 55° tall)
const into = (L, t, o = {}) => ({ t, L, pos: add(MOUTH, mul(norm([1, 0.06, -0.12]), o.d ?? 1.2)), tgt: [2.4, 9.1, 0], up: [0, 1, 0], S: WIDE, cx: 640, cy: 360, focus: MOUTH, ...o })
const at = (L, t, pos, tgt, o = {}) => ({ t, L, pos, tgt, up: o.up ?? [0, 1, 0], S: o.S ?? WIDE, cx: o.cx ?? 640, cy: o.cy ?? 360, ...o })
const down = (L, t, y, o = {}) => at(L, t, [AX, y, o.z ?? 0], [AX + (o.lx ?? 0), y - 30, o.lz ?? 0], { up: UPT, ...o })
/** a medium shot of the Larry at the end of throat L, from d cm up the throat */
const facing = (L, t, d, o = {}) => {
  const c = LARRY_AT(L)
  return at(L, t, [AX - 0.9, c[1] + d, 0], [c[0] + 0.5, c[1], 0], { up: UPT, ...o })
}
// the head's insides, mouth to throat (level L); s scales the timing
function insides(L, t0, s) {
  return [
    at(L, t0 + 0.2 * s, [4.4, 9.7, -0.3], [0.6, 9.2, 0], { ease: 'lin' }),
    at(L, t0 + 0.4 * s, [1.3, 9.75, -0.2], [-1.6, 9.4, 0], { ease: 'lin' }),
    at(L, t0 + 0.65 * s, [-0.55, 9.2, -0.1], [-0.4, 4, 0], { up: UPT, ease: 'lin' }),
    down(L, t0 + 0.95 * s, 3.2, { ease: 'lin' }),
  ]
}
// backwards out of head L+1 into throat L and out of head L's mouth, landing at `t1`
function upThrough(L, t0, t1, yFrom) {
  const s = (t1 - t0) / 1
  return [
    down(L, t0 + 0.3 * s, yFrom, { ease: 'lin', focusBack: true }),
    down(L, t0 + 0.55 * s, 3.2, { ease: 'lin' }),
    at(L, t0 + 0.7 * s, [-0.55, 9.2, -0.1], [-0.4, 4, 0], { up: UPT, ease: 'lin' }),
    at(L, t0 + 0.84 * s, [3.0, 9.75, -0.25], [0.0, 9.3, 0], { ease: 'lin' }),
    into(L, t1, { d: 2.2, ease: 'lin' }),
  ]
}
const TC = [2.4, 7.2, 0] // the middle of the bare tract
const orbit = (t, az, el, d, o = {}) => ({ t, L: 5, orbit: { c: TC, az, el, d }, tgt: o.tgt ?? TC, up: [0, 1, 0], S: o.S ?? WIDE, cx: o.cx ?? 640, cy: o.cy ?? 300, ...o })
const BEHIND = add(TC, [12, 0, 3])
// the post box, among the lights (head 5's frame)
const BOX = [165, 34, -6]

const KEYS = [
  // THE SHOW · into Larry at the desk (before 3.15 the studio push is studioPush())
  { ...studioCam(), t: 3.15, S: 1100, cx: 0, cy: 0, studioEnd: true },
  into(0, 4.447, { d: 1.0, tgt: [3.0, 8.9, 0], ease: 'lin' }),
  at(0, 5.228, [6.0, 8.75, -0.35], [3.2, 6.0, 0]),
  at(0, 6.043, [4.6, 9.75, -0.3], [1.0, 8.9, 0.2]),
  at(0, 6.808, [3.0, 9.8, -0.25], [-1.0, 9.6, 0]),
  at(0, 8.965, [1.3, 9.75, -0.2], [-1.6, 9.45, 0], { ease: 'out' }),
  at(0, 9.6, [-0.55, 9.2, -0.1], [-0.4, 4, 0], { up: UPT, ease: 'in' }),
  down(0, 10.05, 4.2, { ease: 'lin' }),
  // SCENES · down the throat without slowing, frames hanging from the ribs
  down(0, 12.9, -13, { ease: 'lin' }),
  // close on the strip under the frame, then on the drawing in the frame
  at(0, 15.3, [AX - 1.6, FRAME_Y + 3.3, 1.3], [AX + 1.4, FRAME_Y - 16.7, 1.4], { up: UPT, ease: 'out' }),
  at(0, 17.3, [AX - 1.6, FRAME_Y + 3.1, 1.3], [AX + 1.4, FRAME_Y - 16.9, 1.4], { up: UPT, ease: 'lin' }),
  at(0, 17.95, [AX - 1.5, FRAME_Y + 3.4, 1.2], add(KFRAME, [0.25, 0, -0.1]), { up: UPT }),
  at(0, 19.15, [AX - 1.5, FRAME_Y + 3.2, 1.2], add(KFRAME, [0.25, 0, -0.1]), { up: UPT, ease: 'lin' }),
  // the small Larry; he opens up
  facing(0, 19.85, 6.5, { ease: 'io' }),
  into(1, 20.33, { d: 1.0 }),
  // REVIEW · between the two desks, against the drift of the pages, to the smaller Larry
  ...insides(1, 20.33, 0.85),
  down(1, 23.6, -8, { ease: 'lin' }),
  down(1, 25.0, -17, { ease: 'lin' }),
  facing(1, 26.45, 6.5, { ease: 'out' }),
  facing(1, 29.3, 5.6, { ease: 'lin' }),
  into(2, 30.18, { d: 1.0 }),
  // SCRIPTS · the empty desk, the shut door, the ear
  ...insides(2, 30.18, 0.8),
  down(2, 31.8, -5, { ease: 'out' }),
  at(2, 33.5, [AX - 1.2, DESK6.y + 3.0, 0.4], [DESK6.x - 1.6, DESK6.y - 0.6, DESK6.z - 0.3], { up: UPT }),
  at(2, 37.7, [AX - 1.2, DESK6.y + 2.8, 0.45], [DESK6.x - 1.6, DESK6.y - 0.6, DESK6.z - 0.3], { up: UPT, ease: 'lin' }),
  at(2, 38.35, [AX - 1.2, DESK6.y + 2.7, 0.3], [DOOR6[0] - 1.5, DOOR6[1], DOOR6[2] - 0.2], { up: UPT }),
  at(2, 39.05, [AX - 1.2, DESK6.y + 2.6, 0.3], [DOOR6[0] - 1.5, DOOR6[1], DOOR6[2] - 0.2], { up: UPT, ease: 'lin' }),
  at(2, 39.9, [AX + 0.1, EAR[1] + 1.6, -0.9], add(EAR, [0, 0, 0.75]), { up: UPT }),
  at(2, 43.1, [AX + 0.1, EAR[1] + 1.45, -1.0], add(EAR, [0, 0, 0.75]), { up: UPT, ease: 'lin' }),
  // closes on the very small Larry, who holds his mouth open; in through it
  facing(2, 44.3, 6.0),
  facing(2, 45.6, 4.0, { ease: 'lin' }),
  into(3, 46.03, { d: 1.0, ease: 'in' }),
  // REVIEW, AGAIN · it knows this room and does not slow
  ...insides(3, 46.03, 0.65),
  down(3, 47.4, -3.5, { ease: 'out' }),
  at(3, 48.3, [AX - 0.6, -4.5, 0], [AX + 1.4, -13, 0], { up: UPT }),
  at(3, 53.95, [AX - 0.6, -5.5, 0], [AX + 1.4, -13.5, 0], { up: UPT, ease: 'lin' }),
  // on the tiny Larry for "Except review"; already going on "You know the way"
  facing(3, 54.75, 6.0),
  facing(3, 55.4, 5.4, { ease: 'lin' }),
  into(4, 56.6, { d: 1.0, ease: 'io' }),
  // POSTS · the tiled throat, fast
  ...insides(4, 56.6, 0.55),
  down(4, 58.3, -6, { ease: 'lin' }),
  facing(4, 60.2, 9.5, { ease: 'out' }),
  facing(4, 63.35, 8.0, { ease: 'lin' }),
  into(5, 63.86, { d: 0.6, ease: 'in' }),
  // THE BOTTOM · inside, everything but the tract goes; to rest behind its shoulder
  at(5, 64.15, [4.3, 9.4, -0.25], [0.5, 9.0, 0], { ease: 'out' }),
  orbit(65.3, -0.5, 0.12, 22, { tgt: BEHIND, ease: 'io' }),
  orbit(72.45, -0.56, 0.12, 21.5, { tgt: BEHIND, ease: 'lin' }),
  // the post box opens among the lights: ease in until it and the tract share the frame
  orbit(74.6, -0.5, 0.16, 22.5, { tgt: add(TC, [16, 4, 1]), cy: 270, ease: 'io' }),
  orbit(93.7, -0.47, 0.16, 22, { tgt: add(TC, [16, 4, 1]), cy: 270, ease: 'lin' }),
  // THE WAY OUT · on "Community" back the way it came; each Larry says his place as we leave him
  at(5, 94.05, [4.3, 9.4, -0.25], [0.5, 9.0, 0], { ease: 'in' }),
  into(5, 94.58, { d: 2.2, ease: 'lin' }),
  ...upThrough(4, 94.58, 95.62, -10),
  ...upThrough(3, 95.62, 96.33, -14),
  ...upThrough(2, 96.33, 97.08, -16),
  ...upThrough(1, 97.08, 97.79, -14),
  ...upThrough(0, 97.79, 98.22, -24),
  // out between the lips, and still, at last: the first framing exactly
  { ...studioCam(), t: 98.31, ease: 'out', focus: MOUTH, focusL: 0 },
]

const EASE = {
  lin: (u) => u,
  io: (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2),
  out: (u) => 1 - Math.pow(1 - u, 3),
  in: (u) => u * u * u,
}

const keyPos = (k) => (k.orbit ? add(k.orbit.c, mul(dirAz(k.orbit.az, k.orbit.el), k.orbit.d)) : k.pos)

/** the camera at time t (pure) */
function camAt(t) {
  if (t < KEYS[0].t) return studioPush(t)
  if (t >= KEYS[KEYS.length - 1].t) return studioCam(glanceAz(t))
  let i = KEYS.length - 2
  for (let n = 0; n < KEYS.length - 1; n++) if (t < KEYS[n + 1].t) {
    i = n
    break
  }
  const a = KEYS[i], b = KEYS[i + 1]
  const u = (EASE[b.ease ?? 'io'] ?? EASE.io)(clamp((t - a.t) / (b.t - a.t)))
  const A = a.studioEnd ? studioPush(a.t) : a
  const L = Math.max(A.L, b.L)
  let pos
  if (A.orbit && b.orbit) {
    const o = { c: A.orbit.c, az: A.orbit.az + (b.orbit.az - A.orbit.az) * u, el: A.orbit.el + (b.orbit.el - A.orbit.el) * u, d: A.orbit.d + (b.orbit.d - A.orbit.d) * u }
    pos = add(o.c, mul(dirAz(o.az, o.el), o.d))
  } else {
    const pa = convP(keyPos(A), A.L, L), pb = convP(keyPos(b), b.L, L)
    const fk = b.focus ? b : b.focusBack ? A : null
    const F = fk ? convP(fk.focus, fk.focusL ?? fk.L, L) : null
    if (F) {
      const da = Math.max(1e-4, len(sub(pa, F))), db = Math.max(1e-4, len(sub(pb, F)))
      const d = Math.exp(Math.log(da) + (Math.log(db) - Math.log(da)) * u)
      const dir = norm(mix3(norm(sub(pa, F)), norm(sub(pb, F)), u))
      pos = add(F, mul(dir, d))
    } else pos = mix3(pa, pb, u)
  }
  const la = norm(convD(sub(A.tgt, keyPos(A)), A.L, L)), lb = norm(convD(sub(b.tgt, keyPos(b)), b.L, L))
  const look = norm(mix3(la, lb, u))
  const up = norm(mix3(norm(convD(A.up, A.L, L)), norm(convD(b.up, b.L, L)), u))
  const S = Math.exp(Math.log(A.S) + (Math.log(b.S) - Math.log(A.S)) * u)
  return { L, pos, tgt: add(pos, look), up, S, cx: A.cx + (b.cx - A.cx) * u, cy: A.cy + (b.cy - A.cy) * u }
}

const glanceAz = (t) => AZ0 + 0.06 * noise1(t * 0.31, 7) + 0.03 * noise1(t * 1.1, 12)

/** the studio push: from "First" the desk shot closes on his mouth (a zoom, as the stage zooms) */
function studioPush(t) {
  const c = studioCam(glanceAz(Math.min(t, 3.15)))
  const u = EASE.in(clamp((t - 1.95) / (3.15 - 1.95)))
  if (u <= 0) return c
  const proj = projector(c)
  const m = proj(MOUTH)
  const S = Math.exp(Math.log(S0) + (Math.log(1100) - Math.log(S0)) * u)
  const s = S / S0
  const mt = [m[0] + (640 - m[0]) * u, m[1] + (372 - m[1]) * u]
  return { ...c, S, cx: mt[0] - (m[0] - c.cx) * s, cy: mt[1] - (m[1] - c.cy) * s }
}

// ---------------------------------------------------------------- where the camera is
/** is a level-j point behind head j's lips (in his head or his throat)? */
function inside(p) {
  return p[0] < 7.0 && p[0] > -8 && p[1] < 15 && p[1] > -60 && Math.abs(p[2]) < 7
}
const NHEADS = 6
const BOTTOM = [63.92, 94.1]
function roomOf(cam, t) {
  if (t >= BOTTOM[0] && t < BOTTOM[1]) return 'bottom'
  for (let j = NHEADS - 1; j >= 0; j--) if (inside(convP(cam.pos, cam.L, j))) return j
  return -1
}

// ---------------------------------------------------------------- mouths held open
const OPEN = [
  // [head, from, to (shuts)]
  [1, 20.05, 20.5], [2, 29.15, 30.4], [3, 45.45, 46.25], [4, 56.3, 56.85], [5, 63.3, 64.05],
  // on the way out each mouth is open as the camera comes out of it, then says its word
  [5, 94.1, 94.6], [4, 95.3, 95.64], [3, 96.1, 96.35], [2, 96.85, 97.1], [1, 97.55, 97.8], [0, 98.0, 98.32],
]
function openness(j, t) {
  let a = 0
  for (const [h, t0, t1] of OPEN) if (h === j) a = Math.max(a, clamp((t - t0) / 0.12) * (1 - clamp((t - t1) / 0.06)))
  return a
}
function openArtic(art, a) {
  if (a <= 0) return art
  return { ...art, jaw: art.jaw + (0.95 - art.jaw) * a, lipAp: art.lipAp + (1 - art.lipAp) * a, lipProt: art.lipProt + (0.1 - art.lipProt) * a }
}

// ---------------------------------------------------------------- words
function wordAt(show, id, w) {
  const l = show.line(id)
  return l.words[w]?.[0] ?? l.t0
}
function wordPulse(show, id, t, tau = 0.16) {
  const l = show.line(id)
  let p = 0
  for (const w of l.words) if (t >= w[0]) p = Math.max(p, Math.exp(-(t - w[0]) / tau))
  return t < l.t1 + 0.4 ? p : 0
}

const STRIP_TEXT = '"The first kazoo looked like a submarine; I redrew it."'
const STRIP_WORDS = STRIP_TEXT.split(' ')
const HANDLE = '@latecluster.simcluster.tv'

// the gauge: the seven words, written when first said, lit again on the way out
const GAUGE = [
  ['SHOW', ['l0-how', 4], ['up-show', 3]],
  ['SCENES', ['scenes-title', 3], ['up-scenes', 0]],
  ['REVIEW', ['review-late-title', 3], ['up-review-late', 0]],
  ['SCRIPTS', ['scripts-title', 2], ['up-scripts', 0]],
  ['REVIEW', ['review-early-title', 3], ['up-review-early', 0]],
  ['POSTS', ['posts-title', 2], ['up-posts', 0]],
  ['COMMUNITY', ['bottom-community', 4], ['up-community', 4]],
]

/** a seeded page drifting up a review throat: position (level coords) and alpha at time t */
function page(k, t, y0, yDesk, drops) {
  const period = 7
  const ph = ((k * 0.6180339) % 1)
  const u = ((t / period + ph) % 1 + 1) % 1
  const y = y0 + u * (yDesk + 9 - y0)
  const side = ((k * 0.37) % 1) - 0.5
  let x = AX + 1.2 + 1.4 * Math.sin(k * 2.1 + t * 0.7) * 0.5
  const z = side * 3.2
  let a = clamp(u / 0.1) * clamp((1 - u) / 0.15)
  if (drops && y > yDesk + 1) {
    const f = y - yDesk - 1
    x += f * f * 0.12
    a *= clamp(1 - f / 6)
  }
  return { p: [x, y, z], a, spin: t * 0.8 + k }
}

export default {
  defaultShot: 'desk',
  drift: false,

  setup(show) {
    const look = lookFor('larry')
    this.look = look
    this.pal = look.head
    this.bare = { ...look.head, blue: '#000000', blueMid: '#000000', blueDim: '#000000', frame: '#000000', amber: mix('#ffb340', '#000000', 0.2) }
    // the cluster: 248 small lights in the dark beyond the tract, no label, no names
    const r = show.rng('cluster-lights')
    const blobs = []
    for (let i = 0; i < 7; i++) blobs.push([r.range(120, 210), r.range(-25, 40), r.range(-110, 50)])
    const cols = [show.P.sky, show.P.bsky, show.P.cyan, show.P.violet, show.P.gold, show.P.white]
    this.lights = []
    for (let i = 0; i < 248; i++) {
      const b = blobs[i % blobs.length]
      this.lights.push({ p: [b[0] + r.gauss() * 14, b[1] + r.gauss() * 9, b[2] + r.gauss() * 16], c: cols[r.int(cols.length)], delay: r.range(0, 0.9), size: r.range(0.7, 1.3) })
    }
    // empty frames hanging from the ribs of the scenes throat, like washing
    const rf = show.rng('frames')
    this.frames = []
    for (const y of ribYs(0)) {
      if (Math.abs(y - FRAME_Y) < 1 || y > -4 || y < -21) continue
      const n = 1 + rf.int(2)
      for (let k = 0; k < n; k++) {
        const ang = PI + rf.range(-1.0, 1.0) // around the top of the rib (−x)
        const top = [AX + R * Math.cos(ang), y, R * Math.sin(ang)]
        const drop = rf.range(0.2, 0.5)
        this.frames.push({ top, c: [top[0] + drop + 0.5, y, top[2]], hx: 0.5, hz: rf.range(0.5, 0.7) })
      }
    }
    // the posts throat's tiles: thousands of empty outlines, drawn as a few hundred
    this.tiles = []
    for (let y = -1.6; y > THROATS[4].end + 3.5; y -= 0.8) {
      for (let k = 0; k < 26; k++) {
        const a = (k / 26) * PI * 2 + (y * 0.37) % 0.24
        const da = 0.085
        const pt = (aa, yy) => [AX + R * 0.98 * Math.cos(aa), yy, R * 0.98 * Math.sin(aa)]
        this.tiles.push([pt(a - da, y - 0.3), pt(a + da, y - 0.3), pt(a + da, y + 0.3), pt(a - da, y + 0.3)])
      }
    }
    // the shelves of the second review: blank spines along both walls
    const rs = show.rng('spines')
    this.spines = []
    for (const side of [-1, 1]) {
      for (let row = 0; row < 3; row++) {
        const xr = AX + 3.2 - row * 1.25
        let y = -12
        while (y > -22) {
          const w = rs.range(0.18, 0.32)
          this.spines.push({ side, x0: xr, x1: xr - rs.range(0.75, 1.05), y0: y, y1: y - w })
          y -= w + 0.04
        }
      }
    }
  },

  direct(t, show) {
    // no puppet is placed by the stage: every Larry is drawn by the rig
    show.puppet('larry').hide()
    const cam = camAt(t)
    const room = roomOf(cam, t)
    this.cam = cam
    this.room = room
    for (const k of SET_KEYS) show.set[k] = room === -1
    if (room === -1) {
      // the studio's camera, matched to the head's: Larry's head centre lands where the rig draws it
      const proj = projector(convCam(cam, 0))
      const c = proj(T)
      const zoom = (DESK_CAM.zoom * cam.S) / S0 * (DIST / c[2])
      show.camera({ x: DESK_MARK.x - (c[0] - 640) / zoom, y: DESK_MARK.y - (c[1] - 360) / zoom, zoom })
    } else show.camera({ x: 1000, y: 560, zoom: 1 })

    // Larry's voice, as the stage would sample it for his puppet
    const P = show.puppets.get('larry')
    P.sample(t, -1)
    const tele = P.tele, art = P.artic ?? REST_ARTIC

    // which heads are drawn this frame
    const plan = []
    const seed = hashSeed('larry') % 997
    const nod0 = 0.025 * noise1(t * 0.23, seed + 9), tilt0 = 0.03 * noise1(t * 0.17, seed + 3)
    const headIn = (j) => ({ j, c: convCam(cam, j), inside: true })
    if (room === -1) plan.push({ ...headIn(0), inside: false })
    else if (room === 'bottom') {
      plan.push({ ...headIn(5), bare: true, alpha: clamp((t - BOTTOM[0]) / 0.35) * (1 - clamp((t - 93.95) / 0.12)) })
      if (t < BOTTOM[0] + 0.4) plan.push({ ...headIn(5), alpha: 1 - clamp((t - BOTTOM[0]) / 0.35) })
      if (t > 93.9) plan.push({ ...headIn(5), alpha: clamp((t - 93.9) / 0.15) })
    } else {
      const c = convCam(cam, room)
      // his own head, around us (skipped once we are well down the throat)
      if (c.pos[1] > -9) plan.push({ j: room, c, inside: true })
      // the next Larry at the far end, once we look down the throat
      const fwd = norm(sub(c.tgt, c.pos))
      if (room < NHEADS - 1 && (fwd[1] < -0.3 || c.pos[1] < 2)) plan.push({ j: room + 1, c: convCam(cam, room + 1), inside: false })
    }
    // a head's parts light on their words (only Larry at the desk names them)
    const parts = [['pink', 0], ['red', 1], ['green', 2], ['white', 3]]
    const flare = {}
    if (t > 4.2 && t < 9.5) for (const [slot, w] of parts) flare[slot] = t >= wordAt(show, 'l0-parts', w) ? 0.85 * Math.exp(-(t - wordAt(show, 'l0-parts', w)) / 0.7) : 0
    // the burp: a small jump of the jaw and the bow tie
    const burp = show.line('burp')
    const bj = t >= burp.t0 ? Math.exp(-(t - burp.t0) / 0.1) : 0
    this.burp = bj
    for (const h of plan) {
      const key = h.bare ? 'bare' : `n${h.j % 2}`
      let pal = h.bare ? this.bare : this.pal
      if (!h.bare && h.inside) {
        // inside a head its structure dims so the four working parts read
        const dimU = clamp((7.6 - h.c.pos[0]) / 1.5) * 0.55
        pal = { ...pal, blue: mix(pal.blue, '#000000', dimU), blueMid: mix(pal.blueMid, '#000000', dimU), blueDim: mix(pal.blueDim, '#000000', dimU) }
        if (h.j === 0) for (const [slot, a] of Object.entries(flare)) if (a > 0.01) pal[slot] = mix(pal[slot], '#ffffff', a * 0.7)
      }
      const head = headFor(key, h.bare ? this.bare : this.pal)
      head.palette = pal
      // the tiny Larry glances at the two desks on "Except review"
      let rc = h.c
      if (h.j === 4 && !h.inside) {
        const g = 0.4 * clamp((t - 54.27) / 0.2) * (1 - clamp((t - 55.1) / 0.3))
        if (g > 0) rc = { ...h.c, pos: add(T, rotY(sub(h.c.pos, T), g)), tgt: add(T, rotY(sub(h.c.tgt, T), g)), up: rotY(h.c.up, g) }
      }
      h.rc = rc
      const apparent = rc.S * (DIST / Math.max(0.01, len(sub(rc.pos, T))))
      const lw = h.inside && inside(rc.pos) ? 1.35 : clamp(Math.sqrt(apparent / 330), 0.72, 1.35)
      aimFull(head, rc, lw)
      let nod = nod0
      // at the bottom the tract leans towards the lights on "look"
      if (h.bare) nod -= 0.2 * clamp((t - wordAt(show, 'turn-where', 2)) / 0.6) * (1 - clamp((t - 91.9) / 0.3))
      // the tiny Larry waves the camera through with his head
      if (h.j === 4) nod += 0.12 * Math.exp(-Math.abs(t - wordAt(show, 'review-early-way', 1) - 0.1) / 0.15)
      if (h.j === 0) nod += 0.06 * bj
      const op = openness(h.j, t)
      head.update(show.dt, show.dt, op > 0.5 ? null : tele, openArtic(art, op), nod, tilt0)
      h.head = head
    }
    this.plan = plan
  },

  drawBack(ctx, t, show) {
    const cam = this.cam, room = this.room
    this.earAt = null // where the ear is this frame (drawFront hangs its labels beside it)
    this.boxAt = null
    this.plates = []
    if (!cam) return
    if (room !== -1) {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)
    }
    for (const h of this.plan) {
      if (h.inside) paintHead(ctx, h.head, h.alpha ?? 1, room === 'bottom' ? 604 : null)
      else {
        let bottomY = h.j === 0 ? show.toScreen(0, 760)[1] : undefined
        const dproj = projector(h.c)
        const hasDesk = h.j > 0 && h.j < 5
        if (hasDesk) {
          const db = dproj([DESK.x1, DESK.y1 + 2, 0])
          if (db) bottomY = db[1]
        }
        paintPuppet(ctx, h.head, h.rc ?? h.c, this.look, {
          t, breathe: 0.5 + 0.5 * Math.sin((t * 2 * PI) / 4.4), bottomY, speaking: show.speaking('larry') ? 1 : 0,
          // the tiniest is hardly more than a head
          bottomCm: h.j === 5 ? 7 : undefined,
          dy: h.j === 0 ? -5 * this.burp : 0,
        })
        if (hasDesk) desk3(ctx, dproj, show.P.gold, DESK)
      }
    }
    // the throat and everything in it stands between us and the Larry at its far end
    if (typeof room === 'number' && room >= 0 && room < THROATS.length) this.drawThroat(ctx, t, show, room)
    if (room === 'bottom') this.drawBottom(ctx, t, show)
  },

  drawThroat(ctx, t, show, j) {
    const th = THROATS[j]
    const c = convCam(this.cam, j)
    const proj = projector(c, 0.05)
    const P = show.P
    const cy = c.pos[1]
    const ys = ribYs(j)
    // the walls: faint lines along it, widening out of the pharynx
    const yTop = 1.5, yBot = ys[ys.length - 1] - 1.5
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * PI * 2 + 0.3
      const pts = []
      for (let s = 0; s <= 24; s++) {
        const y = yTop + ((yBot - yTop) * s) / 24
        const rr = y > -1.5 ? 1.2 + (R - 1.2) * clamp((1.5 - y) / 3) : R
        pts.push([AX + rr * Math.cos(a), y, rr * Math.sin(a)])
      }
      polyline3(ctx, proj, pts, P.goldDim, 1, { alpha: 0.5 })
    }
    // plain ribs, brighter as the camera reaches them
    for (const y of ys) {
      const ahead = cy - y
      const lit = ahead < 3.2 * th.D && ahead > -1
      const al = clamp(1.2 - Math.max(0, ahead) / 70)
      polyline3(ctx, proj, ringPts([AX, y, 0], R), lit ? P.gold : P.goldDim, lit ? 2 : 1.4, { alpha: al * (lit ? 0.8 : 0.7), hot: lit })
    }
    if (th.kind === 'scenes') this.drawScenes(ctx, t, show, proj)
    if (th.kind === 'review' || th.kind === 'review2') this.drawReview(ctx, t, show, proj, j)
    if (th.kind === 'scripts') this.drawScripts(ctx, t, show, proj)
    if (th.kind === 'posts') this.drawPosts(ctx, t, show, proj)
  },

  drawScenes(ctx, t, show, proj) {
    const P = show.P
    // empty frames hanging from the ribs, like washing
    for (const f of this.frames) {
      polyline3(ctx, proj, [f.top, [f.c[0] - f.hx, f.c[1], f.c[2]]], P.goldMid, 1, { alpha: 0.7 })
      quad3(ctx, proj, rect3(f.c, f.hx, f.hz), P.white, 1.3, { alpha: 0.75 })
    }
    // the one with the drawing in it, on its string
    const top = [AX - R * 0.99, FRAME_Y, KFRAME[2]]
    polyline3(ctx, proj, [top, [KFRAME[0] - 0.9, FRAME_Y, KFRAME[2]]], P.goldMid, 1.2, { alpha: 0.8 })
    const kz = proj(KFRAME)
    if (kz) {
      const tRe = wordAt(show, 'l3-kazoo', 8)
      kazooDrawing(ctx, kz[0], kz[1], kz[3] * 1.45, clamp((t - tRe) / 0.6), { alpha: 1, color: P.gold })
    }
    // under it, the strip of the builder's report, its words lit as he reads them
    const sc = proj(STRIP_AT), l = proj(add(STRIP_AT, [0, 0, 2.1])), r = proj(add(STRIP_AT, [0, 0, -2.1]))
    if (sc && l && r) {
      const w = Math.hypot(r[0] - l[0], r[1] - l[1])
      const line = show.line('l3-kazoo')
      const sa = 1 - clamp((sc[1] + w / 33 - 585) / 25)
      if (sa > 0) strip(ctx, sc[0], sc[1], w, STRIP_WORDS, { greek: t < line.t0 - 0.2, lit: t >= line.t0 ? line.word : -1, alpha: sa, size: w / 33 })
    }
  },

  drawReview(ctx, t, show, proj, j) {
    const P = show.P
    const yD = RDESK_Y[j === 1 ? 0 : 1]
    // two desks back to back, nobody at them; the camera goes down between them
    for (const s of [1, -1]) this.desk(ctx, show, proj, { x: AX + 3.5, y: yD, z: s * 2.0 }, s)
    // the second time, behind the desks, a wall of shelves: blank spines, everything the show has done
    const second = j === 3
    const tStop = wordAt(show, 'review-early-seen', 9)
    if (second) {
      const spines = this.spines.map((s) => {
        const z = s.side * 3.55
        return [[s.x0, s.y0, z], [s.x1, s.y0, z], [s.x1, s.y1, z], [s.x0, s.y1, z]]
      })
      quads3(ctx, proj, spines, P.goldMid, 1, { alpha: 0.75, fill: 1 })
      // the spine a page matches lights red
      const m = this.spines[23]
      if (t > tStop) {
        const z = m.side * 3.55
        quad3(ctx, proj, [[m.x0, m.y0, z], [m.x1, m.y0, z], [m.x1, m.y1, z], [m.x0, m.y1, z]], P.red, 2, { hot: true, alpha: clamp((t - tStop) / 0.15) })
      }
    }
    // pages, the scripts, drifting up between the desks toward the mouth; some drop away
    const pages = []
    for (let k = 0; k < 16; k++) {
      const pg = page(k, t, yD - 10, yD, k % 3 === 1)
      if (pg.a <= 0.02) continue
      pages.push({ ...pg, k })
    }
    for (const pg of pages) {
      const a = pg.spin, hx = 0.32, hz = 0.24
      const cs = Math.cos(a), sn = Math.sin(a)
      const pts = [[-hx, -hz], [hx, -hz], [hx, hz], [-hx, hz]].map(([u, v]) => [pg.p[0] + u * cs - v * sn * 0.6, pg.p[1], pg.p[2] + u * sn * 0.6 + v * cs])
      quad3(ctx, proj, pts, P.white, 1.1, { alpha: pg.a * 0.85 })
    }
    // on "Nothing gets in twice" one page matches a spine and is stopped; the rest go on up
    if (second) {
      const tStart = tStop - 2.4
      if (t > tStart && t < 56) {
        const u = clamp((t - tStart) / 2.4)
        const p = [AX + 1.2, yD - 8 + u * 9.5, 0.3]
        const stopped = t >= tStop
        const pts = rect3(p, 0.32, 0.24)
        quad3(ctx, proj, pts, stopped ? P.red : P.white, stopped ? 2 : 1.1, { hot: stopped, alpha: clamp((t - tStart) / 0.3) * (1 - clamp((t - 54.6) / 0.5)) })
      }
    }
  },

  desk(ctx, show, proj, d, facing = 1) {
    const P = show.P
    const hw = 1.3, hd = 0.8, h = 1.7
    const floor = d.x, top = floor - h
    const Y0 = d.y + hd, Y1 = d.y - hd, Z0 = d.z - hw, Z1 = d.z + hw
    for (const z of [Z0 + 0.1, Z1 - 0.1]) polyline3(ctx, proj, [[top, Y1 + 0.1, z], [floor, Y1 + 0.1, z]], P.goldMid, 1.4, { alpha: 0.8 })
    quad3(ctx, proj, [[top, Y0, Z0], [top, Y0, Z1], [top, Y1, Z1], [top, Y1, Z0]], P.gold, 1.8, { hot: true })
    quad3(ctx, proj, [[top, Y0, Z0], [top, Y0, Z1], [top + 1.0, Y0, Z1], [top + 1.0, Y0, Z0]], P.gold, 1.6)
    for (const z of [Z0 + 0.1, Z1 - 0.1]) polyline3(ctx, proj, [[top + 1.0, Y0, z], [floor, Y0, z]], P.gold, 1.6)
    // its back: a panel on the side facing the other desk
    if (facing) {
      const zb = facing > 0 ? Z0 : Z1
      quad3(ctx, proj, [[top - 0.9, Y0, zb], [top - 0.9, Y1, zb], [floor, Y1, zb], [floor, Y0, zb]], P.goldMid, 1.3, { alpha: 0.9 })
    }
    // a page on it
    const px = top - 0.02
    quad3(ctx, proj, [[px, d.y + 0.4, d.z - 0.5], [px, d.y + 0.4, d.z + 0.35], [px, d.y - 0.45, d.z + 0.35], [px, d.y - 0.45, d.z - 0.5]], P.white, 1.2, { alpha: 0.9 })
  },

  drawScripts(ctx, t, show, proj) {
    const P = show.P
    // an empty desk, a page on it, nobody at it
    const d = DESK6
    const hw = 1.5, hd = 0.8, h = 1.7
    const floor = d.x, top = floor - h
    const Y0 = d.y + hd, Y1 = d.y - hd, Z0 = d.z - hw, Z1 = d.z + hw
    for (const z of [Z0 + 0.1, Z1 - 0.1]) polyline3(ctx, proj, [[top, Y1 + 0.1, z], [floor, Y1 + 0.1, z]], P.goldMid, 1.4, { alpha: 0.8 })
    quad3(ctx, proj, [[top, Y0, Z0], [top, Y0, Z1], [top, Y1, Z1], [top, Y1, Z0]], P.gold, 1.8, { hot: true })
    quad3(ctx, proj, [[top, Y0, Z0], [top, Y0, Z1], [top + 1.0, Y0, Z1], [top + 1.0, Y0, Z0]], P.gold, 1.6)
    for (const z of [Z0 + 0.1, Z1 - 0.1]) polyline3(ctx, proj, [[top + 1.0, Y0, z], [floor, Y0, z]], P.gold, 1.6)
    const px = top - 0.02
    quad3(ctx, proj, [[px, d.y + 0.45, d.z - 0.55], [px, d.y + 0.45, d.z + 0.4], [px, d.y - 0.5, d.z + 0.4], [px, d.y - 0.5, d.z - 0.55]], P.white, 1.3, { alpha: 0.95 })
    for (let k = 0; k < 5; k++) {
      const yy = d.y + 0.3 - k * 0.17
      polyline3(ctx, proj, [[px, yy, d.z + 0.28], [px, yy, d.z - (k === 4 ? 0.1 : 0.43)]], P.white, 0.9, { alpha: 0.5 })
    }
    // the shut door behind it; its plate, the guard's own description of itself, for a glance
    const pl = door3(ctx, proj, DOOR6, 1.8, 3.4, P.goldMid)
    if (pl) {
      const tA = show.at('writer-desk') + 0.6, tD = wordAt(show, 'l2-list', 3)
      const a = (1 - clamp((pl[1] - 560) / 40)) * Math.max(
        clamp((t - tA) / 0.25) * (1 - clamp((t - tA - 2.5) / 0.3)),
        clamp((t - tD) / 0.25) * (1 - clamp((t - tD - 1.0) / 0.25)))
      if (a > 0) this.plates.push(['"a guard, not a wall"', pl[0], pl[1], { size: clamp(pl[3] * 0.2, 12, 26), color: P.gold, frame: P.goldMid, weight: 'm', ls: 0.06, alpha: a }])
    }
    // the ear on its rib, beyond the desk
    const e = proj(EAR)
    if (e) {
      const lv = t > show.at('ear') && t < show.line('l1-heard').t0 ? wordPulse(show, show.lastLine('larry').id, t, 0.25) : 0
      ear(ctx, e[0], e[1], e[3] * 1.5, P.gold, { alpha: 1, level: lv })
      this.earAt = e
    }
  },

  drawPosts(ctx, t, show, proj) {
    // the walls tiled with posts: empty outlines, no words, no names, no pictures
    quads3(ctx, proj, this.tiles, show.P.sky, 1, { alpha: 0.55 })
  },

  drawBottom(ctx, t, show) {
    const P = show.P
    const c = convCam(this.cam, 5)
    const proj = projector(c)
    const off = 1 - clamp((t - 93.8) / 0.25)
    // the lights: 248, in the dark beyond the tract, from "community" until the way out
    const tOn = wordAt(show, 'bottom-community', 4)
    if (t > tOn - 0.05) {
      for (const L of this.lights) {
        const a = clamp((t - tOn - L.delay * 0.8) / 0.35) * off
        if (a <= 0) continue
        const s = proj(L.p)
        if (!s || s[1] > 600) continue
        show.draw.dot(ctx, s[0], s[1], clamp(s[3] * 0.55 * L.size, 1.1, 3.4), L.c, 0.85 * a)
      }
    }
    // the post box, among them (its words are drawn in front, in drawFront)
    const b = proj(BOX)
    const tOpen = show.at('typing')
    if (b && t > tOpen && off > 0) this.boxAt = { x: b[0], y: b[1], k: b[3], open: EASE.out(clamp((t - tOpen) / 0.45)), alpha: off }
  },

  drawFront(ctx, t, show) {
    const P = show.P
    const room = this.room
    // labels that sit on props in the throats are queued there and drawn here, in front of the heads
    for (const p of this.plates ?? []) plate(ctx, ...p)
    // inside Larry's head: each part takes its one-word label on its word
    if ((room === 0 || room === -1) && t > 4.2 && t < 9.3) {
      const c = convCam(this.cam, 0)
      const proj = projector(c)
      const parts = [['LIPS', 0, [7.0, 8.45, 0.4], P.pink], ['JAW', 1, [5.6, 6.3, 0.6], P.red], ['TONGUE', 2, [2.6, 9.05, 0.7], P.green], ['VELUM', 3, [-0.3, 9.75, 0.4], P.white]]
      parts.forEach(([name, w, p, color], i) => {
        const t0 = wordAt(show, 'l0-parts', w)
        const t1 = i < 3 ? wordAt(show, 'l0-parts', w + 1) + 0.25 : 9.0
        if (t < t0 - 0.05 || t > t1 + 0.3) return
        const s = proj(p)
        const x = clamp(s ? s[0] : 640, 160, 1060)
        const y = clamp(s ? s[1] - 30 : 140, 120, 520)
        plate(ctx, name, x, y, { size: 38, color, alpha: clamp((t - t0 + 0.05) / 0.12) * (1 - clamp((t - t1) / 0.3)), frame: color })
      })
    }
    // inside the head only, small at the foot of the frame: the maker's credit
    const tC0 = show.at('parts'), tC1 = show.at('throat-one')
    if (t > tC0 && t < tC1) plate(ctx, 'CHIMERA · jamesondh · open source', 640, 588, { size: 14, color: P.white, weight: 'm', ls: 0.08, protect: true, alpha: clamp((t - tC0) / 0.3) * (1 - clamp((t - tC1 + 0.3) / 0.3)) })
    // the ear's two labels: up for the whole of the line, each lit on its word
    if (room === 2 && this.earAt && this.earAt[0] > 560 && this.earAt[0] < 1240) {
      const l = show.line('scripts-kazoo')
      if (t > l.t0 - 0.15 && t < l.t1 + 0.5) {
        const a = clamp((t - l.t0 + 0.15) / 0.2) * (1 - clamp((t - l.t1 - 0.2) / 0.3))
        const e = this.earAt
        const x = Math.min(e[0] - e[3] * 1.0, 900)
        const tK = wordAt(show, 'scripts-kazoo', 3), tCl = wordAt(show, 'scripts-kazoo', 7)
        const k1 = t >= tK ? 1 : 0.55, k2 = t >= tCl ? 1 : 0.55
        const y1 = Math.max(160, Math.min(e[1] - 70, 330))
        label(ctx, show, 'WRITTEN', x, y1, 22, mix(P.amber, '#000000', 0.2), a * k1)
        label(ctx, show, 'kazoo', x, y1 + 58, 50, P.amber, a * k1, show.pulse(t, tK, 0.35))
        label(ctx, show, 'HEARD', x, y1 + 140, 22, mix(P.sky, '#000000', 0.2), a * k2)
        label(ctx, show, 'clue', x, y1 + 198, 50, P.sky, a * k2, show.pulse(t, tCl, 0.35))
      }
    }
    // the posts counter runs up as he says the number, and stops on it
    if (room === 4 || (room === 5 && t < 64)) {
      const l = show.line('posts-count')
      const t0 = wordAt(show, 'posts-count', 2), t1 = l.t1 - 0.1
      if (t > t0 - 0.05 && t < show.at('in-tiniest') + 0.4) {
        const n = Math.round(20825 * clamp((t - t0) / (t1 - t0)))
        plate(ctx, n.toLocaleString('en-US'), 640, 92, { size: 46, color: P.sky, frame: mix(P.sky, '#000000', 0.4), alpha: clamp((t - t0 + 0.05) / 0.15) * (1 - clamp((t - show.at('in-tiniest') - 0.1) / 0.3)) })
      }
    }
    // the post box: typed into, then the handle turns the colour of a mention, and stays
    if (this.boxAt) {
      const b = this.boxAt
      const wBox = clamp(b.k * 150, 520, 760), hBox = wBox * 0.3
      const tAt = wordAt(show, 'turn-point', 11)
      const th = show.line('turn-handle')
      const tType0 = th.t0 + 0.15, tType1 = th.t1 - 0.5
      let n = 0
      if (t >= tAt) n = 1
      if (t >= tType0) n = 1 + Math.min(HANDLE.length - 1, Math.floor(((t - tType0) / (tType1 - tType0)) * (HANDLE.length - 1)) + 1)
      const typed = HANDLE.slice(0, n)
      const done = n >= HANDLE.length
      const mention = done ? clamp((t - tType1) / 0.35) : 0
      const cursor = !done && Math.floor(t * 2.2) % 2 === 0
      postBox(ctx, clamp(b.x, wBox / 2 + 40, 1080 - wBox / 2), clamp(b.y, 90 + hBox / 2, 540 - hBox / 2), wBox, hBox, { open: b.open, alpha: b.alpha, typed, mention, cursor, size: clamp(wBox / 15, 34, 50) })
    }
    // the depth gauge
    this.drawGauge(ctx, t, show)
  },

  drawGauge(ctx, t, show) {
    const P = show.P
    const burp = show.line('burp')
    const gone = clamp((t - burp.t0) / 0.2)
    if (gone >= 1) return
    let cur = -1, curT = -Infinity
    const x = 1252, y0 = 150, dy = 46
    GAUGE.forEach(([word, said, lit], i) => {
      const tW = wordAt(show, ...said), tL = wordAt(show, ...lit)
      const at = Math.max(tW <= t ? tW : -Infinity, tL <= t ? tL : -Infinity)
      if (at > curT) {
        curT = at
        cur = i
      }
    })
    // the rail
    show.draw.seg(ctx, x + 10, y0 - 26, x + 10, y0 + dy * 6 + 8, P.goldDim, 1.2, { alpha: 0.8 * (1 - gone) })
    GAUGE.forEach(([word, said, lit], i) => {
      const tW = wordAt(show, ...said), tL = wordAt(show, ...lit)
      if (t < tW - 0.02) return
      const y = y0 + i * dy
      const a = clamp((t - tW + 0.02) / 0.15) * (1 - gone)
      const again = t >= tL - 0.02
      const hi = i === cur ? 1 : 0
      const color = again ? mix(P.gold, '#ffffff', 0.35) : hi ? P.gold : P.goldMid
      plate(ctx, word, x, y, { size: hi ? 20 : 17, color, align: 'right', alpha: a, frame: hi ? P.gold : undefined })
      show.draw.seg(ctx, x + 4, y - 6, x + 10, y - 6, color, 1.4, { alpha: a })
    })
  },
}

function rotY(v, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]
}

function label(ctx, show, text, x, y, size, color, alpha, glow = 0) {
  if (alpha <= 0) return
  const w = show.draw.labelWidth(ctx, text, { size, weight: 'm', ls: 0.06 })
  const p = new Path2D()
  p.rect(x - w - size * 0.4, y - size * 1.05, w + size * 0.8, size * 1.4)
  show.draw.occlude(ctx, p, '#000', Math.min(1, 3 * alpha))
  show.draw.label(ctx, text, x, y, { size, color: glow > 0.05 ? mix(color, '#ffffff', 0.5 * glow) : color, align: 'right', weight: 'm', ls: 0.06, alpha })
}
