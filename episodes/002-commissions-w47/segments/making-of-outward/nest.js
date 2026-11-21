// The nest: the geometry of one long pull-back through four rooms, each holding the one before it.
//
// Every room k (1 = the reviewers' room … 4 = the inside of the viewer's screen) is drawn in its
// own "settled" stage coordinates (1280×720: what the camera sees when it has stopped there) plus a
// depth Z for every point (Z = 1 is the reference distance; a point's settled screen position is
// 640 + X/Z, 360 + Y/Z). Each room has a pane of glass G (a rect in its settled coordinates, at
// depth Dg) through which the room before it is seen; that inner room's whole frame lies a little
// further back, at depth Di, so that only the part C of it is visible through G once the camera has
// stopped. Because the inner frame is further away than the glass, the edges of the glass come in
// from all four sides as the camera backs away: the room before becomes a picture in this one.
//
// Room 0 is the real studio, rendered by the studio itself at the desk camera below; its picture is
// placed by overriding the studio camera so the desk shot lands where room 1's glass shows it.
//
// A pull into room n runs u from 0 (the camera is right at room n's glass, the inner frame exactly
// filling the screen) to 1 (settled). Everything here is a pure function of (n, u, shake).

export const W = 1280, H = 720

/** the studio's framing that is "the picture" of room 0: the desk shot */
export const STUDIO = { x: 1750, y: 614, zoom: 1.85 }

/** G: the glass (settled rect in room k), C: the part of room k-1 seen through it, Dg/Di: depths */
export const ROOMS = {
  1: { G: { x: 480, y: 200, w: 320, h: 180 }, C: { x: 230, y: 62, w: 960, h: 540 }, Dg: 1.12, Di: 1.45 },
  2: { G: { x: 700, y: 140, w: 304, h: 171 }, C: { x: 260, y: 70, w: 880, h: 495 }, Dg: 1.0, Di: 1.3 },
  3: { G: { x: 440, y: 187.5, w: 400, h: 225 }, C: { x: 280, y: 40, w: 960, h: 540 }, Dg: 1.2, Di: 1.8 },
  4: { G: { x: 243.5, y: 133.4, w: 680, h: 382.5 }, C: { x: 80, y: 40, w: 960, h: 540 }, Dg: 1.0, Di: 2.2 },
}

for (const r of Object.values(ROOMS)) {
  r.s = r.G.w / r.C.w
  r.R = { x: r.G.x - r.C.x * r.s, y: r.G.y - r.C.y * r.s, w: W * r.s, h: H * r.s }
  r.c0 = r.Di * (1 - r.s)
}

export const SCREEN = { x: 0, y: 0, w: W, h: H }

export function intersect(a, b) {
  const x0 = Math.max(a.x, b.x), y0 = Math.max(a.y, b.y)
  const x1 = Math.min(a.x + a.w, b.x + b.w), y1 = Math.min(a.y + a.h, b.y + b.h)
  return { x: x0, y: y0, w: Math.max(0, x1 - x0), h: Math.max(0, y1 - y0) }
}

const applyT = (T, r) => ({ x: T.a * r.x + T.bx, y: T.a * r.y + T.by, w: T.a * r.w, h: T.a * r.h })

/**
 * The frame's geometry with the camera in room n at dolly u, the whole picture shaken by
 * shake = { x, y } (stage px). Returns
 *   n, u, c (how far forward of the settled spot the camera is, in Z units), ox, oy (its sideways offset)
 *   T[k]  (k < n) the similarity taking room k's settled coords to the screen: { a, bx, by }
 *   G[k]  (1 ≤ k ≤ n) room k's glass on screen
 *   V[k]  (0 ≤ k ≤ n) the part of the screen where room k can be seen
 */
export function nestAt(n, u, shake = { x: 0, y: 0 }) {
  const R = ROOMS[n]
  // the inner frame's scale on screen goes from 1/s to 1 log-linearly: a steady pull
  const scale = Math.pow(1 / R.s, 1 - u)
  const c = R.Di * (1 - 1 / scale)
  const f = R.c0 > 0 ? c / R.c0 : 0
  const ox = f * (R.R.x + R.R.w / 2 - 640) * R.Di
  const oy = f * (R.R.y + R.R.h / 2 - 360) * R.Di
  const sx = shake.x, sy = shake.y
  const cur = { c, ox, oy, sx, sy }
  const T = []
  {
    const d = R.Di - c
    T[n - 1] = { a: (R.s * R.Di) / d, bx: 640 + ((R.R.x - 640) * R.Di - ox) / d + sx, by: 360 + ((R.R.y - 360) * R.Di - oy) / d + sy }
  }
  for (let k = n - 1; k >= 1; k--) {
    const r = ROOMS[k], t = T[k]
    T[k - 1] = { a: t.a * r.s, bx: t.a * r.R.x + t.bx, by: t.a * r.R.y + t.by }
  }
  const G = []
  {
    const d = R.Dg - c
    const x0 = 640 + ((R.G.x - 640) * R.Dg - ox) / d + sx, y0 = 360 + ((R.G.y - 360) * R.Dg - oy) / d + sy
    const x1 = 640 + ((R.G.x + R.G.w - 640) * R.Dg - ox) / d + sx, y1 = 360 + ((R.G.y + R.G.h - 360) * R.Dg - oy) / d + sy
    G[n] = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
  }
  for (let k = n - 1; k >= 1; k--) G[k] = applyT(T[k], ROOMS[k].G)
  const V = []
  V[n] = SCREEN
  for (let k = n - 1; k >= 0; k--) V[k] = intersect(V[k + 1], G[k + 1])
  return { n, u, cur, T, G, V }
}

/**
 * A view of room k for its drawers: the camera's own perspective when the camera is in it, the flat
 * settled picture (through T[k]) when it is a picture inside another room.
 *   q(X, Y, Z) → [x, y, k] (k = screen px per settled px at that depth) or null behind the camera
 *   p(sx, sy, Z) the same for a point given by its settled screen position and depth
 *   near: the nearest Z that can be drawn; lw: a line-width factor; scale: the room's overall scale
 */
export function viewOf(L, k) {
  if (k === L.n) {
    const { c, ox, oy, sx, sy } = L.cur
    const near = c + 0.03
    const q = (X, Y, Z) => {
      const d = Z - c
      if (d < 0.03) return null
      return [640 + (X - ox) / d + sx, 360 + (Y - oy) / d + sy, Z / d]
    }
    return { k, cur: true, near, q, p: (x, y, Z) => q((x - 640) * Z, (y - 360) * Z, Z), lw: 1, scale: 1, c }
  }
  const T = L.T[k]
  const q = (X, Y, Z) => [T.a * (640 + X / Z) + T.bx, T.a * (360 + Y / Z) + T.by, T.a]
  return { k, cur: false, near: 0.01, q, p: (x, y) => [T.a * x + T.bx, T.a * y + T.by, T.a], lw: Math.max(0.3, Math.min(1, Math.sqrt(T.a) * 1.1)), scale: T.a, c: 0 }
}

/** settled screen position + depth → 3D */
export const S3 = (x, y, Z) => [(x - 640) * Z, (y - 360) * Z, Z]
