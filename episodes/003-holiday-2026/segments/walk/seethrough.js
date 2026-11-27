// See-through heads, for the walk only.
//
// The studio paints a black silhouette under every head before the head's lines (stage.js
// paintPuppet: the convex hull of the head's shell, filled at 0.94). Seen from the side it is a
// head's shape; seen from the front, skull and neck together make a tombstone that reaches from
// the crown down to the collar. On a show night it sits on a dim set. On the walk Larry stands in
// front of lit things (the studio window and the work lamp, the restaurant glass, the light from
// his door) and the silhouette reads as a black block behind his see-through head.
//
// So, with nothing in packages/ changed: index.js keeps a copy of the picture as it stands after
// drawBack (everything behind the puppets), and after the puppets are drawn this puts back what
// each head's silhouette hid, inside the hull only, except where something stands in front:
//   - the puppet's own costume front (collar, scarf, lapels) and anything of a puppet drawn after it
//     keep what the stage drew;
//   - the puppet's own costume back (the coat behind the neck) is opaque, so the background is not
//     put back there; its lines, hidden by the silhouette, are drawn again instead;
//   - a puppet drawn before it (behind it) is not in the copy, so where one is, nothing is put back.
// Everything is computed from this frame's puppets; nothing is kept between frames but scratch
// canvases.
import { drawCostume } from '@late-cluster/show/stage/costumes.js'

const W = 1280, H = 720
const canvases = new Map()
function scratch(name, w, h) {
  let c = canvases.get(name)
  if (!c) canvases.set(name, (c = document.createElement('canvas')))
  if (c.width < w || c.height < h) {
    c.width = Math.max(c.width, w)
    c.height = Math.max(c.height, h)
  }
  const x = c.getContext('2d')
  x.setTransform(1, 0, 0, 1, 0, 0)
  x.globalAlpha = 1
  x.globalCompositeOperation = 'source-over'
  x.filter = 'none'
  x.clearRect(0, 0, c.width, c.height)
  return [c, x]
}

/** the picture behind the puppets, copied at the end of drawBack (device pixels) */
export function snapshot(ctx) {
  const src = ctx.canvas
  const [c, x] = scratch('snap', src.width, src.height)
  x.drawImage(src, 0, 0)
  return c
}

/** the stage's own draw order for puppets */
function drawOrder(show) {
  const ps = [...show.puppets.values()].filter((p) => p.visible && p.screen && p.head && p.place)
  ps.sort((a, b) => (a.place.z ?? 0) - (b.place.z ?? 0) || a.screen.y - b.screen.y)
  return ps
}

/** the silhouette path the stage fills (stage units) */
function hullPath(p) {
  const { x, y, size } = p.screen
  const hull = p.head.hull()
  const ox = x - size / 2, oy = y - size / 2, cx = size / 2
  const path = new Path2D()
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (let i = 0; i < hull.length; i += 2) {
    const hx = ox + cx + (hull[i] - cx) * 1.02, hy = oy + cx + (hull[i + 1] - cx) * 1.02
    i ? path.lineTo(hx, hy) : path.moveTo(hx, hy)
    x0 = Math.min(x0, hx), y0 = Math.min(y0, hy), x1 = Math.max(x1, hx), y1 = Math.max(y1, hy)
  }
  path.closePath()
  return { path, box: [x0, y0, x1, y1], ok: hull.length >= 6 }
}

/** the costume anchor exactly as the stage builds it (stage.js paintPuppet) */
function anchorOf(show, p, noFill = false) {
  const { x, y, size } = p.screen
  const nk = p.head.neck()
  const u = nk.cm * (p.look.bodyScale ?? 0.66)
  const ny = y - size / 2 + nk.y
  const floorY = p.place.floor != null ? show.toScreen(0, p.place.floor)[1] : null
  return {
    x: x - size / 2 + nk.x,
    y: ny,
    u,
    turn: Math.cos(p.az) * 0.75,
    sway: p.tilt * 0.6,
    breathe: p.breathe,
    t: show.t,
    bottom: ((p.place.seat != null ? Math.min(H + 40, show.toScreen(0, p.place.seat)[1]) : H + 40) - ny) / u,
    floor: floorY != null ? (floorY - ny) / u : null,
    speaking: p.speaking,
    look: p.look,
    noFill,
  }
}

/**
 * Put back what the head silhouettes hid. Call from drawFront before anything else is drawn, with
 * the snapshot taken at the end of drawBack. o.only: a list of cast ids (default: every puppet).
 */
export function seeThrough(ctx, show, snap, o = {}) {
  if (!snap) return
  const k = ctx.getTransform().a
  const ps = drawOrder(show)
  ps.forEach((p, i) => {
    if (o.only && !o.only.includes(p.id)) return
    if (p.place.clip || p.fx) return
    const h = hullPath(p)
    if (!h.ok) return
    // the box, in device pixels, clamped to the canvas
    const bx = Math.max(0, Math.floor(h.box[0] * k) - 2), by = Math.max(0, Math.floor(h.box[1] * k) - 2)
    const bw = Math.min(ctx.canvas.width, Math.ceil(h.box[2] * k) + 2) - bx
    const bh = Math.min(ctx.canvas.height, Math.ceil(h.box[3] * k) + 2) - by
    if (bw <= 0 || bh <= 0) return
    const toBox = (x) => x.setTransform(k, 0, 0, k, -bx, -by)

    // what stands in front, inside this box: the puppet's own costume front, and every puppet
    // drawn after it (its costume, silhouette and all)
    const [front, fx] = scratch('front', bw, bh)
    toBox(fx)
    drawCostume(fx, 'front', anchorOf(show, p), p.look.costume)
    for (const q of ps.slice(i + 1)) {
      if (!q.screen) continue
      toBox(fx)
      const a = anchorOf(show, q)
      drawCostume(fx, 'back', a, q.look.costume)
      fx.fillStyle = '#000'
      fx.fill(hullPath(q).path)
      drawCostume(fx, 'front', a, q.look.costume)
    }
    // the puppet's own coat behind the neck: opaque, so no background there; and any puppet drawn
    // before it (someone across the table behind his head): the snapshot has no puppets in it, so
    // where one is, the silhouette stays as the stage drew it rather than showing the wall through
    const [back, bkx] = scratch('back', bw, bh)
    toBox(bkx)
    drawCostume(bkx, 'back', anchorOf(show, p), p.look.costume)
    for (const q of ps.slice(0, i)) {
      toBox(bkx)
      const a = anchorOf(show, q)
      drawCostume(bkx, 'back', a, q.look.costume)
      bkx.fillStyle = '#000'
      bkx.fill(hullPath(q).path)
      drawCostume(bkx, 'front', a, q.look.costume)
    }

    // the background to put back: the snapshot, inside the hull, minus all of the above
    const [img, ix] = scratch('img', bw, bh)
    ix.drawImage(snap, bx, by, bw, bh, 0, 0, bw, bh)
    ix.globalCompositeOperation = 'destination-in'
    toBox(ix)
    ix.fillStyle = '#fff'
    ix.fill(h.path)
    ix.setTransform(1, 0, 0, 1, 0, 0)
    ix.globalCompositeOperation = 'destination-out'
    ix.drawImage(front, 0, 0, bw, bh, 0, 0, bw, bh)
    ix.drawImage(back, 0, 0, bw, bh, 0, 0, bw, bh)

    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalCompositeOperation = 'lighter'
    ctx.globalAlpha = 0.94
    ctx.drawImage(img, 0, 0, bw, bh, bx, by, bw, bh)
    ctx.restore()

    // the coat's lines behind the neck, which the silhouette hid: inside the hull, outside
    // whatever stands in front
    const [lines, lx] = scratch('lines', bw, bh)
    toBox(lx)
    drawCostume(lx, 'back', anchorOf(show, p, true), p.look.costume)
    lx.globalCompositeOperation = 'destination-in'
    lx.fillStyle = '#fff'
    lx.fill(h.path)
    lx.setTransform(1, 0, 0, 1, 0, 0)
    lx.globalCompositeOperation = 'destination-out'
    lx.drawImage(front, 0, 0, bw, bh, 0, 0, bw, bh)
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalCompositeOperation = 'lighter'
    ctx.drawImage(lines, 0, 0, bw, bh, bx, by, bw, bh)
    ctx.restore()
  })
}

export { W, H }
