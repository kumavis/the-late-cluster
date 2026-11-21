// making-of-inward: the 3D rig. One camera travels through nested Larrys; every Larry is the
// studio's own head model (engine/heads.js `Head`), drawn full-screen from that camera by a WebGL
// renderer of the segment's own, with the house tuxedo hung under it by the studio's costume code.
//
// Coordinates are a head's own body centimetres (x forward out of the face, y up, z out of the
// head's right side, glottis at the origin), as the vendored renderer uses them. "Level j" is head
// j's frame: Larry at the desk is head 0; the small Larry at the end of his throat is head 1, and
// so on down to head 3. Each smaller Larry stands in his parent's throat by one similarity
// (centre C_j, scale SIGMA, rotation M), the same at every level, so the camera can be expressed in
// whichever level it is passing through and every head is drawn from the one true camera.
//
// A camera is { pos, tgt, up, S, cx, cy, L }: position, look-at point, up (level-L coords), and the
// projection: a 24° square frustum (the puppets' own) spanning S stage px centred at (cx, cy) on the
// 1280 x 720 stage. A small S is a wide lens; S = 200 x zoom at (head x, head y) is exactly how the
// studio draws a puppet, which is what lets the first and last frames be the studio's desk shot.
import { Head, GLHeads, REST_ARTIC } from '@late-cluster/show/engine/heads.js'
import { drawCostume } from '@late-cluster/show/stage/costumes.js'
import { occlude } from '@late-cluster/show/kit/draw.js'

export const W = 1280, H = 720
export const TAN12 = Math.tan((12 * Math.PI) / 180)
export const DIST = (1.1 * 15.2) / TAN12

// ---------------------------------------------------------------- vectors
export const v3 = (x, y, z) => [x, y, z]
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s]
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
export const len = (a) => Math.hypot(a[0], a[1], a[2])
export const norm = (a) => mul(a, 1 / (len(a) || 1))
export const mix3 = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u]
/** a direction from azimuth/elevation, as Head.aim places its camera (az π/2 = facing us) */
export const dirAz = (az, el) => [Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)]

// ---------------------------------------------------------------- the head's landmarks (male body, k = 1)
export const T = [0.3, 9.27, 0] // the head's centre (Head.target), read in setup
export const MOUTH = [7.15, 7.75, 0]
export const AXIS_X = -0.3 // the throat's centre line, x (the pharynx between tongue root and back wall)

// ---------------------------------------------------------------- the nesting
export const SIGMA = 0.1
/** how a small Larry is turned in his parent's throat: the camera coming down the throat sees him as
 *  the studio camera sees Larry at his desk, from this azimuth and elevation */
export const NEST_AZ = Math.PI / 2 + 0.38, NEST_EL = 0.13
// B maps parent directions to child directions: down-the-throat camera (+y in the parent) → the
// child's view direction d; the parent's tunnel up (−x) → the child's up
const d0 = dirAz(NEST_AZ, NEST_EL)
const u0 = norm(sub([0, 1, 0], mul(d0, d0[1])))
const c0 = cross(d0, u0)
// columns of B: B·e_x = −u0, B·e_y = d0, B·e_z = d0 × u0
const Bm = [
  [-u0[0], d0[0], c0[0]],
  [-u0[1], d0[1], c0[1]],
  [-u0[2], d0[2], c0[2]],
]
const mv = (m, v) => [m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2], m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2], m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]]
const mtv = (m, v) => [m[0][0] * v[0] + m[1][0] * v[1] + m[2][0] * v[2], m[0][1] * v[0] + m[1][1] * v[1] + m[2][1] * v[2], m[0][2] * v[0] + m[1][2] * v[1] + m[2][2] * v[2]]

/** where each small Larry's head centre stands in his parent's frame (set by index.js) */
export const NEST = { centre: [] }
const anchor = (j) => sub(NEST.centre[j], mul(mtv(Bm, T), SIGMA)) // A_j = C_j − σ M T, M = Bᵀ

/** a point of level j → level j+1 */
export const childP = (j, p) => mul(mv(Bm, sub(p, anchor(j))), 1 / SIGMA)
/** a point of level j+1 → level j */
export const parentP = (j, p) => add(anchor(j), mul(mtv(Bm, p), SIGMA))
export const childD = (v) => mv(Bm, v)
export const parentD = (v) => mtv(Bm, v)

/** a point given in level `from` expressed in level `to` */
export function convP(p, from, to) {
  let q = p
  for (let j = from; j < to; j++) q = childP(j, q)
  for (let j = from; j > to; j--) q = parentP(j - 1, q)
  return q
}
export function convD(v, from, to) {
  let q = v
  for (let j = from; j < to; j++) q = childD(q)
  for (let j = from; j > to; j--) q = parentD(q)
  return q
}
/** a camera expressed in level `to` */
export function convCam(c, to) {
  if (c.L === to) return c
  return { ...c, pos: convP(c.pos, c.L, to), tgt: convP(c.tgt, c.L, to), up: convD(c.up, c.L, to), L: to }
}

// ---------------------------------------------------------------- projection
/** the camera's axes, as three.js's lookAt builds them for a camera */
export function basis(c) {
  const z = norm(sub(c.pos, c.tgt))
  let x = cross(c.up, z)
  if (len(x) < 1e-6) x = cross([0, 0, 1], z)
  x = norm(x)
  return { x, y: cross(z, x), z }
}
/** a projector for a camera: point → [sx, sy, depth, px per unit] or null behind the near plane */
export function projector(c, near = 0.02) {
  const b = basis(c)
  const f = c.S / 2 / TAN12
  const fn = (p) => {
    const v = sub(p, c.pos)
    const d = -dot(v, b.z)
    if (d < near) return null
    return [c.cx + (dot(v, b.x) / d) * f, c.cy - (dot(v, b.y) / d) * f, d, f / d]
  }
  fn.basis = b
  fn.f = f
  fn.cam = c
  return fn
}

// ---------------------------------------------------------------- the heads
let GL = null
/** the segment's own WebGL renderer (one per page) */
export function gl() {
  if (!GL) GL = new GLHeads()
  return GL
}

const HEADS = new Map()
/** a Head in a palette, kept per key for the page's life (they hold GPU buffers) */
export function headFor(key, palette) {
  let h = HEADS.get(key)
  if (!h) {
    h = new Head({ female: 0, child: 0 }, palette)
    HEADS.set(key, h)
  }
  return h
}

/** aim a head's own camera at a full-stage view from camera c (c in that head's own frame) */
export function aimFull(head, c, lw = 1.2) {
  const r = head.r, cam = r.camera
  r.w = W
  r.h = H
  head.tile = -1 // a studio aim() after this re-sizes
  r.beams.setResolution(W / lw, H / lw)
  cam.fov = 24
  cam.aspect = 1
  cam.near = 0.03
  cam.far = 4000
  cam.setViewOffset(c.S, c.S, -(c.cx - c.S / 2), -(c.cy - c.S / 2), W, H)
  cam.updateProjectionMatrix()
  cam.position.set(c.pos[0], c.pos[1], c.pos[2])
  cam.up.set(c.up[0], c.up[1], c.up[2])
  cam.lookAt(c.tgt[0], c.tgt[1], c.tgt[2])
  cam.updateMatrixWorld()
}

/** render an aimed head over the whole stage, additively, at `alpha` */
export function paintHead(ctx, head, alpha = 1, clipY = null) {
  const g = gl()
  if (!g.ok || alpha <= 0.002) return
  const cw = ctx.canvas.width, ch = ctx.canvas.height
  const r = g.gl
  if (g.canvas.width !== cw || g.canvas.height !== ch) r.setSize(cw, ch, false)
  r.setViewport(0, 0, cw, ch)
  r.setScissor(0, 0, cw, ch)
  r.setScissorTest(true)
  r.clear()
  r.render(head.r.scene, head.r.camera)
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = Math.min(1, alpha)
  if (clipY != null) {
    // keep the picture out of the caption band
    const ky = clipY * (ch / H)
    ctx.drawImage(g.canvas, 0, 0, cw, ky, 0, 0, cw, ky)
  } else ctx.drawImage(g.canvas, 0, 0, cw, ch, 0, 0, cw, ch)
  ctx.restore()
}

/** the head's silhouette as a stage path (only meaningful with the camera outside the head) */
export function hullPath(head) {
  const hull = head.hull()
  if (hull.length < 6) return null
  let cx = 0, cy = 0
  for (let i = 0; i < hull.length; i += 2) {
    cx += hull[i]
    cy += hull[i + 1]
  }
  cx /= hull.length / 2
  cy /= hull.length / 2
  const p = new Path2D()
  for (let i = 0; i < hull.length; i += 2) {
    const x = cx + (hull[i] - cx) * 1.02, y = cy + (hull[i + 1] - cy) * 1.02
    i ? p.lineTo(x, y) : p.moveTo(x, y)
  }
  p.closePath()
  return p
}

/** the costume anchor for a head aimed full-stage (as the stage builds it for a puppet) */
export function costumeAnchor(head, c, o) {
  const nk = head.neck()
  const u = nk.cm * (o.bodyScale ?? 0.66)
  const dv = norm(sub(c.pos, T))
  const az = Math.atan2(dv[0], dv[2])
  return {
    x: nk.x,
    y: nk.y + (o.dy ?? 0),
    u,
    turn: Math.cos(az) * 0.75,
    sway: o.sway ?? 0,
    breathe: o.breathe ?? 0.5,
    t: o.t ?? 0,
    bottom: o.bottomCm ?? (Math.min(H + 40, o.bottomY ?? H + 40) - nk.y) / u,
    floor: null,
    speaking: o.speaking ?? 0,
    look: o.look,
    noFill: false,
  }
}

/** a whole Larry seen from outside: costume back, the dark silhouette, the head, costume front */
export function paintPuppet(ctx, head, c, look, o = {}) {
  const a = costumeAnchor(head, c, o)
  if (o.costume !== false) drawCostume(ctx, 'back', a, look.costume)
  const hp = hullPath(head)
  if (hp) occlude(ctx, hp, '#000', 0.94)
  paintHead(ctx, head, o.alpha ?? 1)
  if (o.costume !== false) drawCostume(ctx, 'front', a, look.costume)
  return a
}

export { REST_ARTIC }
