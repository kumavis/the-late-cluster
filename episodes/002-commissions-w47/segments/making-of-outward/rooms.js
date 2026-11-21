// The four rooms behind the studio, drawn through a view from nest.js (the camera's perspective when
// it is in the room, the flat settled picture when the room is a picture inside another). Each room
// has a back layer (behind the puppets) and a front layer (in front of them). Nothing here carries
// any words: the rooms are not there to be read.
import { beam, beamPts, occlude, dot, ring, P } from '@late-cluster/show/kit/draw.js'
import { S3 } from '@late-cluster/episode/segments/making-of-outward/nest.js'

// ---------------------------------------------------------------- 3D helpers

/** a 3D segment, clipped at the camera's near plane */
export function line3(ctx, v, A, B, color, w, o = {}) {
  let a = A, b = B
  if (a[2] < v.near && b[2] < v.near) return
  if (a[2] < v.near || b[2] < v.near) {
    const u = (v.near - a[2]) / (b[2] - a[2])
    const m = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, v.near + 1e-4]
    if (a[2] < v.near) a = m
    else b = m
  }
  const p = v.q(...a), q = v.q(...b)
  if (!p || !q) return
  const path = new Path2D()
  path.moveTo(p[0], p[1])
  path.lineTo(q[0], q[1])
  beam(ctx, path, color, w * v.lw, o)
}

/** a polygon of 3D points → Path2D (null if any point is behind the camera) */
export function poly3(v, pts, close = true) {
  const path = new Path2D()
  for (let i = 0; i < pts.length; i++) {
    const p = v.q(...pts[i])
    if (!p) return null
    i ? path.lineTo(p[0], p[1]) : path.moveTo(p[0], p[1])
  }
  if (close) path.closePath()
  return path
}

/** fill black, then outline */
export function solid(ctx, v, pts, color, w, o = {}) {
  const path = poly3(v, pts)
  if (!path) return null
  occlude(ctx, path, '#000', o.fill ?? 1)
  beam(ctx, path, color, w * v.lw, o)
  return path
}

/** a settled rect at depth Z as 3D corners */
const rect3 = (r, Z) => [S3(r.x, r.y, Z), S3(r.x + r.w, r.y, Z), S3(r.x + r.w, r.y + r.h, Z), S3(r.x, r.y + r.h, Z)]

/** a room box: floor, ceiling, side walls from zNear to the back wall at zBack */
function roomBox(ctx, v, o) {
  const { X, top, floor, zNear, zBack, color, alpha = 0.5 } = o
  const c = [[-X, top], [X, top], [X, floor], [-X, floor]]
  for (const [x, y] of c) line3(ctx, v, [x, y, zNear], [x, y, zBack], color, 1.2, { alpha })
  const back = poly3(v, c.map(([x, y]) => [x, y, zBack]))
  if (back) beam(ctx, back, color, 1.2 * v.lw, { alpha })
  // a few floor boards towards the back wall, and one seam across
  for (const fx of o.boards ?? []) line3(ctx, v, [fx, floor, zNear], [fx, floor, zBack], color, 0.9, { alpha: alpha * 0.45 })
  for (const z of o.seams ?? []) line3(ctx, v, [-X, floor, z], [X, floor, z], color, 0.9, { alpha: alpha * 0.4 })
}

/** a stand (Sibyl's): a slanted top at her chest and a post to the floor; spot = settled { x, y, Z, size } */
export function stand(ctx, v, spot, color = P.white, alpha = 0.8) {
  const { x, y, Z, size } = spot
  const tw = size * 0.62, ty = y + size * 0.78
  const top = [S3(x - tw / 2, ty, Z - 0.01), S3(x + tw / 2, ty, Z - 0.01), S3(x + tw / 2 - 8, ty + size * 0.16, Z - 0.03), S3(x - tw / 2 + 8, ty + size * 0.16, Z - 0.03)]
  solid(ctx, v, top, color, 1.4, { alpha })
  const post = [S3(x - size * 0.05, ty + size * 0.16, Z - 0.03), S3(x + size * 0.05, ty + size * 0.16, Z - 0.03), S3(x + size * 0.05, 900, Z - 0.03), S3(x - size * 0.05, 900, Z - 0.03)]
  solid(ctx, v, post, color, 1.1, { alpha: alpha * 0.7 })
}

// ---------------------------------------------------------------- room 1 · the reviewers' room

const R1 = {
  floor: 300, table: 150, zf: 0.95, zb: 1.25, tx: 430,
  monitorZ: 1.12, glass: { x: 480, y: 200, w: 320, h: 180 },
}

export const room1 = {
  back(ctx, v, env) {
    roomBox(ctx, v, { X: 760, top: -430, floor: R1.floor, zNear: 0.3, zBack: 1.9, color: P.blueMid, alpha: 0.55, boards: [-480, -160, 160, 480], seams: [1.45] })
    // the monitor: bezel round the glass, a post down to the table
    const Z = R1.monitorZ, g = R1.glass, b = 14
    const outer = rect3({ x: g.x - b, y: g.y - b, w: g.w + 2 * b, h: g.h + 2 * b }, Z)
    solid(ctx, v, outer, P.sky, 1.6, { alpha: 0.9 })
    const inner = poly3(v, rect3(g, Z))
    if (inner) beam(ctx, inner, P.sky, 1 * v.lw, { alpha: 0.6 })
    const ty = 360 + R1.table / Z
    solid(ctx, v, [S3(628, g.y + g.h + b, Z), S3(652, g.y + g.h + b, Z), S3(652, ty, Z), S3(628, ty, Z)], P.sky, 1.2, { alpha: 0.7 })
    const base = poly3(v, [S3(590, ty, Z - 0.02), S3(690, ty, Z - 0.02), S3(690, ty, Z + 0.03), S3(590, ty, Z + 0.03)])
    if (base) beam(ctx, base, P.sky, 1.1 * v.lw, { alpha: 0.6 })
  },

  front(ctx, v, env) {
    const { floor, table: Y, zf, zb, tx } = R1
    // the table: top, modesty panel, legs
    solid(ctx, v, [[-tx, Y, zf], [tx, Y, zf], [tx, Y, zb], [-tx, Y, zb]], P.blue, 1.4, { alpha: 0.85 })
    solid(ctx, v, [[-tx, Y, zf], [tx, Y, zf], [tx, Y + 80, zf], [-tx, Y + 80, zf]], P.blue, 1.2, { alpha: 0.6 })
    for (const lx of [-tx + 10, tx - 10]) line3(ctx, v, [lx, Y + 80, zf], [lx, floor, zf], P.blue, 1.2, { alpha: 0.6 })

    // two sheets, each running in under the machine from its own side: neither sees the other's
    const sheet = (x0, x1) => solid(ctx, v, [[x0, Y - 0.5, 0.99], [x1, Y - 0.5, 0.99], [x1, Y - 0.5, 1.14], [x0, Y - 0.5, 1.14]], P.white, 1, { alpha: 0.55 })
    sheet(-400, -60)
    sheet(60, 400)
    // the marks so far (more as they mark; none added while stopped)
    const marks = Math.floor(env.mark * 1.6)
    for (const side of [-1, 1]) {
      for (let i = 0; i < Math.min(9, marks); i++) {
        const z = 1.02 + (i % 5) * 0.023, x = side * (370 - Math.floor(i / 5) * 70)
        line3(ctx, v, [x - side * 6, Y - 1, z], [x - side * 40, Y - 1, z], P.white, 0.9, { alpha: 0.45 })
      }
    }
    // the pens: on the paper while marking, lifted off it when they stop
    for (const side of [-1, 1]) {
      const ph = env.mark * 7 + (side > 0 ? 1.3 : 0)
      const lift = env.lift * 26
      const tipX = side * (330 + 22 * Math.sin(ph)), tipZ = 1.06 + 0.02 * Math.sin(ph * 0.5)
      const tip = [tipX, Y - 2 - lift, tipZ]
      const end = [tipX - side * 26, Y - 62 - lift, tipZ - 0.04]
      line3(ctx, v, tip, end, P.gold, 2.2, { hot: true })
    }

    // the adding machine: a box, a grid of keys, a roll, a lever. No face.
    const mz0 = 1.0, mz1 = 1.13, mx = 58
    solid(ctx, v, [[-mx, Y - 42, mz0], [mx, Y - 42, mz0], [mx, Y, mz0], [-mx, Y, mz0]], P.amber, 1.4, { alpha: 0.9 })
    solid(ctx, v, [[-mx, Y - 42, mz0], [mx, Y - 42, mz0], [mx - 6, Y - 54, mz1], [-mx + 6, Y - 54, mz1]], P.amber, 1.2, { alpha: 0.8 })
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 5; c++) {
        const kx = -40 + c * 20, kz = mz0 + 0.025 + r * 0.035, ky = Y - 44 - r * 3.5
        const k = v.q(kx, ky, kz)
        if (k) dot(ctx, k[0], k[1], Math.max(0.6, 2.6 * k[2] * v.scale), P.amber, 0.75)
      }
    // the roll at the back, the slot the tape comes out of
    const roll = v.q(0, Y - 64, mz1)
    if (roll) {
      const rr = 9 * roll[2] * v.scale
      const e = new Path2D()
      e.ellipse(roll[0], roll[1] + rr * 0.6, rr * 2.6, rr * 0.8, 0, 0, Math.PI * 2)
      occlude(ctx, e)
      beam(ctx, e, P.white, 1.1 * v.lw, { alpha: 0.7 })
    }
    // the lever on its right: it pulls once per entry, and keeps pulling while nobody marks
    const lv = env.lever
    line3(ctx, v, [mx, Y - 24, 1.06], [mx + 18 + 10 * Math.cos(lv), Y - 46 - 16 * Math.sin(lv), 1.06], P.amber, 1.8, { hot: true })

    // the tape: out of the slot, down the front, along the table towards us, then curling up on itself
    tape(ctx, v, env.tape, Y)
  },
}

/** the machine's tape, `len` long (in px at the reference depth) */
function tape(ctx, v, len, Y) {
  const pts = []
  const push = (x, y, z) => pts.push([x, y, z])
  // a path sampled finely: the slot → down the front → along the table → a curl
  const path = []
  path.push([0, Y - 50, 1.0])
  for (let i = 1; i <= 8; i++) path.push([0, Y - 50 + (50 * i) / 8, 0.998 - i * 0.0008])
  for (let i = 1; i <= 10; i++) path.push([i * 4, Y - 0.8, 0.992 - i * 0.003])
  // the curl: a spiral lying on the table
  const cx = 70, cz = 0.968
  for (let i = 1; i <= 90; i++) {
    const th = Math.PI + i * 0.2
    const r = Math.max(4, 30 - i * 0.28)
    path.push([cx + r * Math.cos(th) + 30 * (1 - Math.min(1, i / 8)) * 0, Y - 0.8 - Math.max(0, Math.sin(th)) * r * 0.25, cz + Math.sin(th) * r * 0.0011])
  }
  let left = len
  push(...path[0])
  for (let i = 1; i < path.length && left > 0; i++) {
    const a = path[i - 1], b = path[i]
    const d = Math.hypot(b[0] - a[0], b[1] - a[1], (b[2] - a[2]) * 1000)
    if (d <= left) {
      push(...b)
      left -= d
    } else {
      const u = left / d
      push(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u)
      left = 0
    }
  }
  const scr = []
  for (const p of pts) {
    const q = v.q(...p)
    if (!q) return
    scr.push([q[0], q[1]])
  }
  if (scr.length > 1) beamPts(ctx, scr, P.white, 2.2 * v.lw, { alpha: 0.85 })
}

// ---------------------------------------------------------------- room 2 · the cold viewer's room

const R2 = { floor: 300, top: -330, wallZ: 1.0, still: { x: 700, y: 140, w: 304, h: 171 } }
/** the older stills, left of the newest, along the same wall */
export const OLD_STILLS = [-328, 0, 352].map((dx) => ({ x: R2.still.x - 680 + dx, y: R2.still.y, w: R2.still.w, h: R2.still.h }))

export const room2 = {
  back(ctx, v, env) {
    roomBox(ctx, v, { X: 760, top: R2.top, floor: R2.floor, zNear: 0.3, zBack: R2.wallZ, color: P.blueMid, alpha: 0.5, boards: [-500, -250, 0, 250, 500], seams: [0.7] })
    // a strip: a line of tape the stills hang from
    line3(ctx, v, S3(-200, R2.still.y - 18, R2.wallZ), S3(R2.still.x + R2.still.w + 30, R2.still.y - 18, R2.wallZ), P.white, 1, { alpha: 0.35 })
    // the older stills: sketches of the same room, the reviewers mid-nod in every one
    OLD_STILLS.forEach((r, i) => {
      const f = solid(ctx, v, rect3({ x: r.x - 8, y: r.y - 8, w: r.w + 16, h: r.h + 16 }, R2.wallZ), P.white, 1.2, { alpha: 0.6 })
      if (!f) return
      env.sketch?.(ctx, v, r, i)
      for (const px of [r.x + 18, r.x + r.w - 18]) {
        const p = v.p(px, r.y - 4, R2.wallZ)
        if (p) dot(ctx, p[0], p[1], Math.max(0.8, 3 * p[2] * v.scale), P.coral, 0.9)
      }
    })
    // the newest still's frame (its picture is the reviewers' room itself, drawn by the nest)
    const s = R2.still
    solid(ctx, v, rect3({ x: s.x - 10, y: s.y - 10, w: s.w + 20, h: s.h + 20 }, R2.wallZ), P.white, 1.5, { alpha: 0.85 + 0.15 * env.flash })
    for (const px of [s.x + 18, s.x + s.w - 18]) {
      const p = v.p(px, s.y - 5, R2.wallZ)
      if (p) dot(ctx, p[0], p[1], Math.max(0.8, 3.4 * p[2] * v.scale), P.coral, 0.95)
    }
  },

  front(ctx, v, env) {
    // a new still is taken: the newest picture's edge flashes white for a moment
    if (env.flash > 0.02) {
      const s = R2.still
      const f = poly3(v, rect3(s, R2.wallZ))
      if (f) beam(ctx, f, P.white, 3 * v.lw, { alpha: env.flash, hot: true })
    }
  },
}

// ---------------------------------------------------------------- room 3 · the owner's room

const R3 = { floor: 260, top: -300, X: 620, back: 1.6, desk: 110, dz0: 1.0, dz1: 1.35, dx: 400, screenZ: 1.2, glass: { x: 440, y: 187.5, w: 400, h: 225 } }
export const CHAIR3 = { x0: 340, x1: 540, y0: 440, y1: 640, Z: 0.62 }

export const room3 = {
  back(ctx, v, env) {
    roomBox(ctx, v, { X: R3.X, top: R3.top, floor: R3.floor, zNear: 0.3, zBack: R3.back, color: P.blueMid, alpha: 0.28, boards: [-300, 0, 300], seams: [] })
    // the screen: the room's only light. A soft spill round it, then the bezel and its foot
    const Z = R3.screenZ, g = R3.glass, b = 12
    for (let i = 1; i <= 1; i++) {
      const sp = poly3(v, rect3({ x: g.x - b - i * 16, y: g.y - b - i * 12, w: g.w + 2 * (b + i * 16), h: g.h + 2 * (b + i * 12) }, Z + 0.001))
      if (sp) beam(ctx, sp, P.sky, 6 * v.lw, { alpha: 0.05 })
    }
    solid(ctx, v, rect3({ x: g.x - b, y: g.y - b, w: g.w + 2 * b, h: g.h + 2 * b }, Z), P.sky, 1.5, { alpha: 0.85 })
    const ty = 360 + R3.desk / Z
    solid(ctx, v, [S3(624, g.y + g.h + b, Z), S3(656, g.y + g.h + b, Z), S3(660, ty, Z), S3(620, ty, Z)], P.sky, 1.1, { alpha: 0.55 })
  },

  front(ctx, v, env) {
    const Y = R3.desk
    // the desk
    solid(ctx, v, [[-R3.dx, Y, R3.dz0], [R3.dx, Y, R3.dz0], [R3.dx, Y, R3.dz1], [-R3.dx, Y, R3.dz1]], P.blue, 1.3, { alpha: 0.5 })
    solid(ctx, v, [[-R3.dx, Y, R3.dz0], [R3.dx, Y, R3.dz0], [R3.dx, R3.floor, R3.dz0], [-R3.dx, R3.floor, R3.dz0]], P.blue, 1.1, { alpha: 0.32 })
    // the headphones, lying on the desk to the right of the screen: two cups and the band between, not worn
    const hz = 1.16, hx = 250
    const band = []
    for (let i = 0; i <= 16; i++) {
      const a = Math.PI * (i / 16)
      band.push([hx - 40 * Math.cos(a), Y - 14 - 30 * Math.sin(a), hz])
    }
    const bp = poly3(v, band, false)
    if (bp) beam(ctx, bp, P.white, 2.2 * v.lw, { alpha: 0.75 })
    for (const cx of [hx - 40, hx + 40]) {
      const cpt = v.q(cx, Y - 9, hz)
      if (!cpt) continue
      const e = new Path2D()
      e.ellipse(cpt[0], cpt[1], 11 * cpt[2] * v.scale, 9 * cpt[2] * v.scale, 0, 0, Math.PI * 2)
      occlude(ctx, e)
      beam(ctx, e, P.white, 1.5 * v.lw, { alpha: 0.8 })
    }
    // the empty chair, pushed back from the desk and turned a little: its back towards us, nobody in it
    const c = CHAIR3
    const z0 = c.Z, z1 = c.Z + 0.05, zm = (z0 + z1) / 2
    const backPts = []
    // a tall back with a rounded top
    const bx0 = c.x0, bx1 = c.x1, bt = c.y0, bb = c.y1 - 60
    for (let i = 0; i <= 12; i++) {
      const a = Math.PI * (1 - i / 12)
      const u = i / 12
      backPts.push(S3((bx0 + bx1) / 2 + Math.cos(a) * (bx1 - bx0) / 2, bt + 26 - Math.sin(a) * 26, z0 + (z1 - z0) * u))
    }
    backPts.push(S3(bx1 - 8, bb, z1), S3(bx0 + 8, bb, z0))
    solid(ctx, v, backPts, P.violet, 1.7, { alpha: 0.75 })
    const seat = [S3(bx0 - 22, bb + 14, z0 - 0.02), S3(bx1 + 22, bb + 14, z1 - 0.02), S3(bx1 + 16, bb + 30, z1 - 0.04), S3(bx0 - 16, bb + 30, z0 - 0.04)]
    solid(ctx, v, seat, P.violet, 1.4, { alpha: 0.6 })
    line3(ctx, v, S3((bx0 + bx1) / 2, bb, zm), S3((bx0 + bx1) / 2, bb + 14, zm), P.violet, 2, { alpha: 0.6 })
    line3(ctx, v, S3((bx0 + bx1) / 2, bb + 30, zm - 0.03), S3((bx0 + bx1) / 2, bb + 78, zm - 0.03), P.violet, 2, { alpha: 0.6 })
    for (const dx of [-70, 0, 70]) line3(ctx, v, S3((bx0 + bx1) / 2, bb + 78, zm - 0.03), S3((bx0 + bx1) / 2 + dx, bb + 92, zm - 0.03 + (dx === 0 ? -0.04 : 0)), P.violet, 1.5, { alpha: 0.5 })
  },
}

// ---------------------------------------------------------------- room 4 · the inside of the viewer's screen

export const room4 = {
  back(ctx, v, env) {
    // the tunnel's walls: the first pane's corners carried straight back towards us
    const g = env.G4, Z = 1.0
    const corners = [[g.x, g.y], [g.x + g.w, g.y], [g.x + g.w, g.y + g.h], [g.x, g.y + g.h]].map(([x, y]) => S3(x, y, Z))
    for (const [X, Y] of corners) line3(ctx, v, [X, Y, Z], [X, Y, 0.06], P.sky, 1.2, { alpha: 0.28 })
    for (const z of [0.72]) {
      const rib = poly3(v, corners.map(([X, Y]) => [X, Y, z]))
      if (rib) beam(ctx, rib, P.sky, 0.8 * v.lw, { alpha: 0.08 })
    }
  },
  front() {},
}

// ---------------------------------------------------------------- small props

/** a tally clicker: a round body, a button, a blank window (no number), a finger ring */
export function clicker(ctx, x, y, s, pressed, glow) {
  const body = new Path2D()
  body.arc(x, y, 22 * s, 0, Math.PI * 2)
  occlude(ctx, body)
  beam(ctx, body, P.white, 1.6, { alpha: 0.8 + 0.2 * glow, hot: glow > 0.3 })
  const win = new Path2D()
  win.rect(x - 13 * s, y - 6 * s, 26 * s, 12 * s)
  beam(ctx, win, P.white, 1, { alpha: 0.6 })
  const by = y - 22 * s - (6 - 4 * pressed) * s
  const btn = new Path2D()
  btn.rect(x + 4 * s, by - 6 * s, 10 * s, 6 * s + (6 - 4 * pressed) * s)
  occlude(ctx, btn)
  beam(ctx, btn, P.white, 1.3, { alpha: 0.85 })
  ring(ctx, x - 6 * s, y + 30 * s, 9 * s, P.white, 1.2, { alpha: 0.6 })
}

/** a point of light: halo, body, core */
export function glowPoint(ctx, x, y, r, color, a = 1) {
  if (a <= 0.01 || r <= 0) return
  dot(ctx, x, y, r * 3.2, color, 0.08 * a)
  dot(ctx, x, y, r * 1.8, color, 0.22 * a)
  dot(ctx, x, y, r, color, 0.85 * a)
  dot(ctx, x, y, r * 0.45, '#ffffff', 0.9 * a)
}
