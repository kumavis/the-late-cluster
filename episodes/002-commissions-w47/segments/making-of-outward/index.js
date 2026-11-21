// making-of-outward: "The Making Of, and Who Checks That". One long pull-back that never cuts.
//
// The camera starts on Larry at the desk and backs out through a pane of glass into the room that
// holds the studio as a picture, then out of that room into the next, four times: the reviewers'
// room (the studio on a monitor), the cold viewer's room (that room as the newest of a strip of
// stills), the owner's room (all of it on a screen on a desk), and the inside of the viewer's own
// screen, where it stops against the glass and looks back down the tunnel.
//
// How it is built (nest.js has the geometry, rooms.js the rooms):
// - The studio is the real studio, rendered by the stage at the desk camera; this module overrides
//   the camera so the desk shot lands exactly where the next room's glass shows it, and blacks out
//   everything outside that picture (drawBack). The desk is drawn here, clipped to the picture.
// - Each room is drawn in 3D while the camera is in it (perspective, parallax: the glass's edges
//   come in from all four sides as it backs away) and as a flat picture once it is inside another.
// - The other puppets (Al and Dee as reviewers, Pete as the cold viewer, Sibyl at her stand) are
//   placed by projecting their spot in their room to the screen and back into studio world units,
//   clipped to the part of the screen their room is seen in.
// Everything is a pure function of t; the only cache is of this frame's geometry.
import { buildSet, drawSetFront } from '@late-cluster/show/stage/set.js'
import { TILE } from '@late-cluster/show/stage/shots.js'
import { label, labelWidth, box, occlude, rectPath, beam, seg, dot, ring, P } from '@late-cluster/show/kit/draw.js'
import { ease, clamp, smoothstep, pulse, window01, lerp } from '@late-cluster/show/kit/ease.js'
import { nestAt, viewOf, ROOMS, STUDIO } from '@late-cluster/episode/segments/making-of-outward/nest.js'
import { room1, room2, room3, room4, stand, clicker, glowPoint, poly3 } from '@late-cluster/episode/segments/making-of-outward/rooms.js'

const ROOM = { 1: room1, 2: room2, 3: room3, 4: room4 }

// where people are, in their room's settled coordinates (x, y head centre; Z depth; size head px)
const SIBYL = {
  // each one stands about as deep as that room's glass, so she is in sight from the moment the glass
  // edge passes her: already there when the camera arrives, never swept past it
  1: { x: 150, y: 330, Z: 1.08, size: 150, floor: [360 + 300 / 1.08, 1.08] },
  2: { x: 140, y: 340, Z: 0.96, size: 160, floor: [360 + 300 / 0.96, 0.96] },
  3: { x: 1130, y: 330, Z: 1.15, size: 140, floor: [360 + 260 / 1.15, 1.15] },
  4: { x: 150, y: 350, Z: 0.95, size: 170 },
}
const AL = { x: 360, y: 336, Z: 1.08, size: 160, seat: [518, 0.95] }
const DEE = { x: 920, y: 336, Z: 1.08, size: 160, seat: [518, 0.95] }
const PETE = { x: 560, y: 470, Z: 0.75, size: 240 }
/** Larry's head in the desk shot (stage units), for the gold point he becomes */
const LARRY0 = { x: (1790 - STUDIO.x) * STUDIO.zoom + 640, y: (548 - STUDIO.y) * STUDIO.zoom + 360, size: TILE * STUDIO.zoom }

const HANDLE = '@latecluster.simcluster.tv'
const REST = { x: 600, y: 430 } // where the first light comes to rest (room 4 = the screen once stopped)
const CLICK = { x: 1105, y: 440 } // the tally clicker, fixed just inside the pane
const STILL_STEP = 0.55 // how often the cold viewer's strip takes a new still

export default {
  title: 'The Making Of, and Who Checks That',
  cast: ['al', 'dee', 'pete'],
  defaultShot: 'desk',
  drift: false, // locked off: the only camera move is the pull-back, and it is computed here
  set: { desk: false, chair: false, couch: false },

  setup(show) {
    this.S = buildSet()
    const at = (n) => show.at(n)
    const words = (id) => show.line(id).words
    const tm = (this.tm = {
      rule: at('rule'),
      wentWell: at('went-well'),
      p1: at('pull-1'),
      p2: at('pull-2'),
      p3: at('pull-3'),
      drift: at('drift'),
      stop: at('glass-stop'),
      turn: at('turn'),
      stopped: words('five-stopped')[4][0], // "stopped"
      resumed: words('resumed')[2][0], // "resumed"
      tag: words('tag-the-show')[3][0], // "tag"
      tagEnd: show.line('tag-the-show').t1,
      counted: show.line('counted').t0,
      outside: words('counted')[3][0], // "outside"
      rooms: at('light-rooms') + 0.05,
      hello: at('hello'),
      edge: show.line('off-the-edge'),
    })
    // the pulls: into room n, from a to b
    this.pulls = [
      { n: 1, a: tm.p1, b: tm.p1 + 0.95, e: ease.inOutSine }, // steadily
      { n: 2, a: tm.p2, b: tm.p2 + 0.66, e: ease.inOutQuad }, // a little faster
      { n: 3, a: tm.p3, b: tm.p3 + 1.7, e: ease.outCubic }, // faster again, and arrives slower than it left
      { n: 4, a: tm.drift, b: tm.stop, e: (p) => 0.35 * p * p + 0.65 * p }, // a slow drift that stops dead
    ]
    // The cold viewer gets stills: while the camera is in that room, Larry's telemetry is read at
    // the moment of the newest still, so his mouth jumps from shape to shape while his voice runs on.
    // Done by wrapping this segment's own span blocks (nothing outside this segment is touched).
    const larry = show.puppets.get('larry')
    const a = tm.p2, b = tm.p3
    const q = (t) => (t >= a && t < b ? a + Math.floor((t - a) / STILL_STEP) * STILL_STEP : t)
    if (larry) {
      larry.spans = larry.spans.map((s) => {
        const blk = Object.create(s.block)
        blk.frameAt = (dt) => s.block.frameAt(Math.max(0, q(s.start + dt) - s.start))
        return { ...s, block: blk }
      })
    }
  },

  // ---------------------------------------------------------------- this frame's geometry

  geo(t, show) {
    if (this._geoT === t && this._geo) return this._geo
    let n = 1, u = 0
    for (const p of this.pulls) if (t >= p.a) (n = p.n), (u = p.e(clamp((t - p.a) / (p.b - p.a))))
    // the knock against the last pane: one small shudder
    const ds = t - this.tm.stop
    const amp = ds >= 0 && ds < 0.7 ? 9 * Math.exp(-ds / 0.11) : 0
    const shake = { x: amp * Math.sin(ds * 2 * Math.PI * 17), y: amp * 0.6 * Math.sin(ds * 2 * Math.PI * 23 + 1) }
    const L = nestAt(n, u, shake)
    // the studio camera that puts the desk shot where T[0] says
    const T0 = L.T[0]
    const zoom = T0.a * STUDIO.zoom
    const Kx = T0.a * (640 - STUDIO.x * STUDIO.zoom) + T0.bx, Ky = T0.a * (360 - STUDIO.y * STUDIO.zoom) + T0.by
    L.cam = { x: (640 - Kx) / zoom, y: (360 - Ky) / zoom, zoom }
    L.toWorld = (x, y) => [L.cam.x + (x - 640) / zoom, L.cam.y + (y - 360) / zoom]
    L.start = n === 1 && u === 0 // still in the studio: no room is in sight yet
    this._geoT = t
    this._geo = L
    return L
  },

  /** the time the reviewers' room is at: it stops between "stopped" and "resumed", and is a still once the camera has left it */
  tau1(t) {
    const { stopped: f, resumed: r, p2 } = this.tm
    const tt = Math.min(t, p2)
    return tt < f ? tt : tt < r ? f : tt - (r - f)
  },

  env(k, t, show, L) {
    const tm = this.tm
    if (k === 1) {
      const still = t >= tm.p2
      const tt = still ? tm.p2 : t
      const tau = this.tau1(t)
      const f = tm.stopped, r = tm.resumed
      // the tape: a little per entry, then running out blank while nobody marks
      const len = 30 + 2.2 * (Math.min(tt, f) - 14) + 260 * smoothstep(f + 0.1, f + 4.6, tt) + 2.2 * Math.max(0, tt - r)
      const ticking = tt >= f && tt < r + 0.3
      return {
        mark: Math.max(0, tau - 14.5),
        lift: smoothstep(f, f + 0.12, tt) * (1 - smoothstep(r, r + 0.18, tt)),
        lever: ticking ? 0.6 + 0.45 * Math.sin(tt * 2 * Math.PI * 2) : 0.6 + 0.25 * Math.max(0, Math.sin(tt * 4.2)),
        tape: len,
      }
    }
    if (k === 2) {
      let flash = 0
      if (L.n === 2 && t >= tm.p2 + 0.66) {
        const last = tm.p2 + Math.floor((t - tm.p2) / STILL_STEP) * STILL_STEP
        flash = 0.7 * pulse(t, last, 0.09)
      }
      return { flash, sketch: (ctx, v, r, i) => this.sketch(ctx, v, r, i) }
    }
    if (k === 4) return { G4: ROOMS[4].G }
    return {}
  },

  /** an older still on the cold viewer's wall: the reviewers' room again, drawn small, the two mid-nod */
  sketch(ctx, v, r, i) {
    const C = ROOMS[2].C, s = r.w / C.w
    const map = (x, y) => v.p(r.x + (x - C.x) * s, r.y + (y - C.y) * s, 1.0)
    const k0 = map(0, 0), k1 = map(1, 0)
    const a = k1[0] - k0[0]
    const sub = {
      cur: false, near: 0.01, lw: Math.max(0.3, Math.sqrt(a) * 1.1), scale: a,
      q: (X, Y, Z) => [...map(640 + X / Z, 360 + Y / Z).slice(0, 2), a],
      p: (x, y) => [...map(x, y).slice(0, 2), a],
    }
    const clip = poly3(v, [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]].map(([x, y]) => [(x - 640), (y - 360), 1.0]))
    if (!clip) return
    ctx.save()
    ctx.clip(clip)
    const env = { mark: 2 + i * 1.3, lift: 0, lever: 0.6, tape: 30 + i * 4 }
    room1.back(ctx, sub, env)
    // the studio in its monitor, a gold point
    const g = map(641, 259)
    dot(ctx, g[0], g[1], Math.max(0.8, 16 * a), P.gold, 0.9)
    // the two reviewers as outlines, chins down, mid-nod
    for (const [hx, dir] of [[AL.x, -1], [DEE.x, 1]]) {
      const h = map(hx, AL.y)
      const hr = 52 * a
      const head = new Path2D()
      head.ellipse(h[0], h[1], hr * 0.78, hr, dir * 0.35, 0, Math.PI * 2)
      occlude(ctx, head)
      beam(ctx, head, dir < 0 ? '#8affc1' : '#ffb3f0', 1.2 * sub.lw, { alpha: 0.8 })
      const vis = new Path2D()
      vis.moveTo(h[0] - dir * hr * 0.2, h[1] - hr * 0.55)
      vis.lineTo(h[0] + dir * hr * 1.1, h[1] - hr * 0.15)
      beam(ctx, vis, P.lime, 1.4 * sub.lw, { alpha: 0.8 })
    }
    room1.front(ctx, sub, env)
    ctx.restore()
  },

  // ---------------------------------------------------------------- direction

  direct(t, show) {
    const tm = this.tm
    const L = this.geo(t, show)
    show.shot('desk')
    show.camera(L.cam)

    // ---- Larry: at his desk the whole time, inside every picture
    const larry = show.puppet('larry')
    larry.place({ clip: L.V[0] })
    if (t >= tm.p1) larry.fx('monitor', { scan: 0.3 })
    // he leans in for the rule, the only thing he slows down for
    const lean = window01(t, tm.rule + 0.1, tm.wentWell, 0.45)
    if (lean > 0) larry.scaleTo(1 + 0.05 * lean).nod(-0.07 * lean)
    // "Hello?": in his monitor, a look one way and the other
    const h = t - tm.hello
    if (h > -0.2 && h < 0.9) larry.lookAt(h < 0.25 ? 'left' : h < 0.6 ? 'right' : 'camera')
    // at the glass: in profile at the far end, then turned square on, up the tunnel, at the pane
    if (t >= tm.stop && t < tm.turn) larry.lookAt('left')
    if (t >= tm.turn) larry.lookAt(Math.PI / 2)

    // ---- the house in the other rooms
    if (L.start) {
      for (const id of ['sibyl', 'al', 'dee', 'pete']) show.puppet(id).hide()
    } else {
      // the reviewers, back to back, each nodding slowly over a sheet the other cannot see
      const nodNow = (phase) => {
        const P_ = 2.286
        const tau = t >= tm.p2 ? this.tau1(tm.p2) : this.tau1(t)
        return -0.1 - 0.12 * (0.5 - 0.5 * Math.cos((2 * Math.PI * (tau - tm.stopped)) / P_ + Math.PI / 2 + phase))
      }
      this.placeIn(show, L, 'al', 1, AL, { look: Math.PI * 0.98 }) && show.puppet('al').nod(nodNow(0))
      this.placeIn(show, L, 'dee', 1, DEE, { look: Math.PI * 0.02 }) && show.puppet('dee').nod(nodNow(0.45))
      // the cold viewer, back to us, facing the strip
      // (three-quarters from behind: a wireframe head seen square from the back shows its face through)
      if (L.n >= 2) this.placeIn(show, L, 'pete', 2, PETE, { look: -0.5 }) && show.puppet('pete').nod(0.12)
      else show.puppet('pete').hide()
      // Sibyl: at her stand in whichever room the camera is in, already there when it arrives
      this.placeSibyl(t, show, L)
    }

    // ---- the caption that runs off the right edge is drawn by drawFront (see captionOffEdge)
    const e = tm.edge
    if (t >= e.t0 - 0.05 && t < e.t1 + 0.7) show.caption(null)
  },

  /** place a puppet at its spot in room k; false (and hidden) if it cannot be seen there */
  placeIn(show, L, id, k, spot, o = {}) {
    const p = show.puppet(id)
    if (k > L.n) return p.hide(), false
    const v = viewOf(L, k)
    const s = v.p(spot.x, spot.y, spot.Z)
    if (!s) return p.hide(), false
    const size = spot.size * s[2]
    const clip = v.cur ? null : L.V[k]
    if (size > 950 || size < 2 || (clip && (clip.w < 1 || clip.h < 1))) return p.hide(), false
    const r = size * 0.5
    const box = clip ?? { x: 0, y: 0, w: 1280, h: 720 }
    if (s[0] + r < box.x || s[0] - r > box.x + box.w || s[1] + r < box.y || s[1] - r > box.y + box.h) return p.hide(), false
    const [wx, wy] = L.toWorld(s[0], s[1])
    const pl = { x: wx, y: wy, scale: size / (TILE * L.cam.zoom), look: o.look ?? 'camera', z: 6, instrument: null, floor: null, seat: undefined, clip }
    if (spot.floor) {
      const fs = v.p(spot.x, spot.floor[0], spot.floor[1])
      if (fs) pl.floor = L.toWorld(0, fs[1])[1]
    }
    if (spot.seat) {
      const ss = v.p(spot.x, spot.seat[0], spot.seat[1])
      if (ss) pl.seat = L.toWorld(0, ss[1])[1]
    }
    p.show().place(pl)
    return true
  },

  /**
   * Sibyl's spot in room k at t. She is never in the picture being judged: as the camera starts to
   * leave a room she steps out of its frame, stand and all, before the glass has closed on it.
   */
  sibylSpot(k, t, L) {
    const spot = SIBYL[k]
    if (k >= L.n) return spot
    const away = ease.inCubic(clamp((t - this.pulls[k].a + 0.25) / 0.3))
    return { ...spot, x: spot.x + (k === 3 ? 340 : -340) * away }
  },

  placeSibyl(t, show, L) {
    const n = L.n
    const tm = this.tm
    // where she looks: at us while she speaks; at the picture when Larry has the floor
    const larryTalking = show.speaking('larry')
    const look = { 1: larryTalking ? 'right' : 'camera', 2: larryTalking ? 'right' : 'camera', 3: larryTalking ? 'left' : 'camera', 4: 'camera' }
    const tryRoom = (k) => this.placeIn(show, L, 'sibyl', k, this.sibylSpot(k, t, L), { look: look[k] })
    // the room the camera is in first; failing that the one it is leaving (she is in its margin,
    // which the glass covers before she is needed here)
    if (tryRoom(n)) this.sibylRoom = n
    else if (n > 1 && tryRoom(n - 1)) this.sibylRoom = n - 1
    else (this.sibylRoom = 0), show.puppet('sibyl').hide()
    const sib = show.puppet('sibyl')
    // in the owner's room she is lit only by the screen
    if (this.sibylRoom === 3) sib.fx('monitor', { amount: 0.62, scan: 0.12, tint: '#a9cfff' })
  },

  // ---------------------------------------------------------------- drawing

  drawBack(ctx, t, show) {
    const L = this.geo(t, show)
    if (L.start) return
    // the studio is only a picture now: black out everything of it outside its glass
    const V0 = L.V[0]
    const out = new Path2D()
    out.rect(-20, -20, 1320, 760)
    out.rect(V0.x, V0.y, V0.w, V0.h)
    ctx.save()
    ctx.fillStyle = '#000'
    ctx.fill(out, 'evenodd')
    ctx.restore()
    // each room around the picture of the one before it, outermost first
    for (let k = L.n; k >= 1; k--) {
      const V = L.V[k], G = L.G[k]
      if (V.w < 1 || V.h < 1) continue
      ctx.save()
      ctx.beginPath()
      ctx.rect(V.x, V.y, V.w, V.h)
      ctx.clip()
      const hole = new Path2D()
      hole.rect(-20, -20, 1320, 760)
      hole.rect(G.x, G.y, G.w, G.h)
      ctx.clip(hole, 'evenodd')
      occlude(ctx, rectPath(V.x, V.y, V.w, V.h))
      ROOM[k].back(ctx, viewOf(L, k), this.env(k, t, show, L))
      ctx.restore()
    }
  },

  drawFront(ctx, t, show) {
    const L = this.geo(t, show)
    const tm = this.tm
    // the desk, in front of Larry, inside the studio's picture only
    const V0 = L.V[0]
    if (V0.w > 0 && V0.h > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.rect(V0.x, V0.y, V0.w, V0.h)
      ctx.clip()
      const S = this.S
      const fake = { setNow: { desk: true, chair: false, couch: false, eKey: false, crow: false }, set: {}, nameplate: show.nameplate, wall: show.wall, keyLabel: show.keyLabel }
      show.world(ctx, (c) => drawSetFront(c, S, fake))
      ctx.restore()
    }
    if (!L.start) {
      // the rooms' front pieces, innermost first, each inside the part of the screen it is seen in
      for (let k = 1; k <= L.n; k++) {
        const V = L.V[k]
        if (V.w < 1 || V.h < 1) continue
        ctx.save()
        ctx.beginPath()
        ctx.rect(V.x, V.y, V.w, V.h)
        ctx.clip()
        const v = viewOf(L, k)
        ROOM[k].front(ctx, v, this.env(k, t, show, L))
        if (k === 1) this.visors(ctx, show)
        if (k === 2 && L.n >= 2) this.peteBack(ctx, show, v)
        stand(ctx, v, this.sibylSpot(k, t, L), P.white, k === 3 ? 0.45 : 0.75)
        ctx.restore()
      }
      // the pane the camera is passing: a sheen across it while it goes by
      const pull = this.pulls.find((p) => p.n === L.n)
      if (pull && L.u > 0 && L.u < 1) this.sheen(ctx, L.G[L.n], L.u)
    }
    // Larry, once he is too small to make out: a gold point
    const T0 = L.T[0]
    if (T0.a < 0.075) {
      const x = T0.a * LARRY0.x + T0.bx, y = T0.a * LARRY0.y + T0.by
      const g = t >= tm.turn ? 1 + 1.2 * pulse(t, tm.turn, 0.6) + 0.35 : 1
      glowPoint(ctx, x, y, Math.max(3, LARRY0.size * T0.a * 0.14) * g, P.gold, clamp((0.075 - T0.a) / 0.03))
    }
    if (L.n === 4) this.glass(ctx, t, show, L)
    this.captionOffEdge(ctx, t, show)
  },

  /** Al's and Dee's eyeshades: a band and a green bill over the brow, the way each is facing */
  visors(ctx, show) {
    for (const [id, dir] of [['al', -1], ['dee', 1]]) {
      const h = show.headOf(id)
      if (!h || h.size < 6) continue
      const s = h.size, [cx, cy] = h.crown
      const by = cy + s * 0.2
      const bill = new Path2D()
      bill.moveTo(cx - dir * s * 0.12, by)
      bill.lineTo(cx + dir * s * 0.2, by + s * 0.02)
      bill.lineTo(cx + dir * s * 0.38, by + s * 0.11)
      bill.lineTo(cx + dir * s * 0.12, by + s * 0.1)
      bill.closePath()
      occlude(ctx, bill, '#000', 0.6)
      beam(ctx, bill, P.lime, Math.max(0.6, s / 110), { alpha: 0.9, hot: s > 60 })
      const band = new Path2D()
      band.moveTo(cx - dir * s * 0.24, by - s * 0.02)
      band.quadraticCurveTo(cx, by - s * 0.05, cx + dir * s * 0.14, by + s * 0.05)
      beam(ctx, band, P.lime, Math.max(0.5, s / 160), { alpha: 0.7 })
    }
  },

  /** Pete's ear defenders, seen three-quarters from behind: the near cup over his ear, the band over his crown */
  peteBack(ctx, show, v) {
    const h = show.headOf('pete')
    if (!h || h.size < 6) return
    const s = h.size, x = h.x, y = h.y
    const [cx, cy] = h.crown
    const ex = x - s * 0.06, ey = y + s * 0.02
    const band = new Path2D()
    band.moveTo(ex, ey - s * 0.1)
    band.bezierCurveTo(ex - s * 0.02, cy - s * 0.02, cx + s * 0.1, cy - s * 0.04, x + s * 0.2, y - s * 0.12)
    beam(ctx, band, P.coral, Math.max(0.8, s / 70), { alpha: 0.9, hot: true })
    const cup = new Path2D()
    cup.ellipse(ex, ey, s * 0.085, s * 0.13, 0, 0, Math.PI * 2)
    occlude(ctx, cup)
    beam(ctx, cup, P.coral, Math.max(0.8, s / 90), { alpha: 0.95, hot: true })
    const pad = new Path2D()
    pad.ellipse(ex, ey, s * 0.05, s * 0.085, 0, 0, Math.PI * 2)
    beam(ctx, pad, P.coral, Math.max(0.5, s / 160), { alpha: 0.5 })
  },

  /** a pane of glass going by: a diagonal glint and its edge */
  sheen(ctx, G, u) {
    const a = Math.sin(Math.PI * u) * 0.5
    if (a < 0.02) return
    ctx.save()
    ctx.beginPath()
    ctx.rect(G.x, G.y, G.w, G.h)
    ctx.clip()
    const x = G.x + G.w * (0.15 + 0.7 * u)
    for (const [dx, w, al] of [[0, 3, 1], [G.w * 0.06, 1.2, 0.6]]) seg(ctx, x + dx, G.y, x + dx - G.h * 0.55, G.y + G.h, P.white, w, { alpha: a * al * 0.5 })
    ctx.restore()
    box(ctx, G.x, G.y, G.w, G.h, { color: P.white, width: 1.2, fill: null, alpha: a * 0.6 })
  },

  // ---------------------------------------------------------------- the glass: the tunnel, the gold, the lights

  glass(ctx, t, show, L) {
    const tm = this.tm
    // the panes: every room's glass, one inside another, and the edges joining them into a tunnel
    const panes = [L.G[1], L.G[2], L.G[3], L.G[4], { x: 3, y: 3, w: 1274, h: 714 }]
    for (let i = 0; i < 3; i++) {
      const a = panes[i], b = panes[i + 1]
      for (const [fx, fy] of [[0, 0], [1, 0], [1, 1], [0, 1]]) seg(ctx, a.x + a.w * fx, a.y + a.h * fy, b.x + b.w * fx, b.y + b.h * fy, P.sky, 0.8, { alpha: 0.13 })
    }
    panes.slice(0, 4).forEach((g) => box(ctx, g.x, g.y, g.w, g.h, { color: P.sky, width: 1, fill: null, alpha: 0.22 }))
    // the turn: Larry's gold comes forward through every pane between him and the glass
    if (t >= tm.turn) {
      panes.forEach((g, i) => {
        const ti = tm.turn + 0.2 + 0.32 * i
        if (t < ti) return
        const g1 = pulse(t, ti, 0.55), a = Math.min(1, 0.9 * g1 + 0.22)
        box(ctx, g.x, g.y, g.w, g.h, { color: P.gold, width: 1.2 + 2.2 * g1, fill: null, alpha: a, hot: g1 > 0.4 })
      })
    }
    // the pane the camera has stopped against, from the wrong side: the edge of a browser window,
    // mirrored, its tabs and buttons on the far side. No text.
    if (t >= tm.stop) {
      const a = 0.32 * smoothstep(tm.stop, tm.stop + 0.12, t)
      const col = P.blueMid
      const strip = new Path2D()
      strip.moveTo(0, 30)
      strip.lineTo(1280, 30)
      beam(ctx, strip, col, 1.2, { alpha: a })
      for (let i = 0; i < 3; i++) {
        const x1 = 1180 - i * 190, x0 = x1 - 170
        const tab = new Path2D()
        tab.moveTo(x0, 30)
        tab.lineTo(x0 + 12, 6)
        tab.lineTo(x1 - 12, 6)
        tab.lineTo(x1, 30)
        beam(ctx, tab, col, 1.1, { alpha: a * (i === 0 ? 1 : 0.6) })
      }
      for (let i = 0; i < 3; i++) ring(ctx, 1258 - i * 20, 18, 5, col, 1, { alpha: a })
      box(ctx, 150, 40, 960, 20, { color: col, width: 1, fill: null, radius: 10, alpha: a * 0.8 })
      seg(ctx, 2, 30, 2, 720, col, 1.4, { alpha: a * 0.8 })
      seg(ctx, 1278, 30, 1278, 720, col, 1.4, { alpha: a * 0.8 })
    }
    this.lights(ctx, t, show, L)
  },

  lights(ctx, t, show, L) {
    const tm = this.tm
    const LIGHT = P.sky
    // ---- the second light: in through the pane on "outside", to the clicker, which clicks once; it goes out there
    const ta = tm.outside + 0.7
    if (t >= tm.counted - 0.1) clicker(ctx, CLICK.x, CLICK.y, 1, window01(t, ta, ta + 0.16, 0.04), pulse(t, ta, 0.3))
    if (t >= tm.outside && t < ta + 0.3) {
      const u = ease.outCubic(clamp((t - tm.outside) / 0.7))
      const x = lerp(-160, CLICK.x - 34, u), y = lerp(840, CLICK.y - 2, u)
      const r = lerp(64, 6, u) * (t > ta ? 1 - clamp((t - ta) / 0.25) : 1)
      glowPoint(ctx, x, y, r, LIGHT, 1)
    }
    // ---- the first light: in on "tag", to rest in the middle; the handle under it for the line
    if (t < tm.tag) return
    const arrive = ease.outCubic(clamp((t - tm.tag) / 0.9))
    let x = lerp(1440, REST.x, arrive), y = lerp(880, REST.y, arrive), r = lerp(80, 7, arrive)
    if (t >= tm.rooms) [x, y, r] = this.lightPath(t, L)
    else r *= 1 + 0.08 * Math.sin(t * 5)
    glowPoint(ctx, x, y, r, LIGHT, 1)
    const la = window01(t, tm.tag + 0.55, tm.tagEnd, 0.15)
    if (la > 0.01) {
      const o = { size: 21, ls: 0.04 }
      const w = labelWidth(ctx, HANDLE, o) + 28
      occlude(ctx, rectPath(REST.x - w / 2, REST.y + 22, w, 34, 5), '#000', 0.88 * la)
      label(ctx, HANDLE, REST.x, REST.y + 46, { ...o, align: 'center', color: P.white, alpha: la })
    }
  },

  /** the first light's way down the tunnel: past the empty chair, a still at a time, between the sheets; it never arrives */
  lightPath(t, L) {
    const T = L.T
    const at = (k, x, y) => [T[k].a * x + T[k].bx, T[k].a * y + T[k].by, Math.max(k === 1 ? 2.4 : 3.4, 7 * Math.pow(T[k].a, 0.45))]
    const W = [
      [REST.x, REST.y, 7],
      at(3, 600, 462), // past the chair
      at(3, 640, 300), // into the owner's screen
      at(2, 930, 420), // in the cold viewer's room
      at(2, 852, 226), // into the newest still
      at(1, 640, 528), // between the two sheets, in front of the machine
      at(1, 640, 300), // the monitor: where it is going, not where it gets
    ]
    const legs = [0.9, 0.8, 0.6, 0.9, 0.8]
    let t0 = this.tm.rooms
    for (let i = 0; i < legs.length; i++) {
      const t1 = t0 + legs[i]
      if (t < t1) {
        let u = ease.inOutSine((t - t0) / legs[i])
        if (i === 2 || i === 3) u = Math.floor(u * 3 + 1e-6) / 3 // in the cold viewer's room it shows up one still at a time
        return mixP(W[i], W[i + 1], u)
      }
      t0 = t1
    }
    // the last leg, slower and slower, and never all the way
    const u = 0.12 * (1 - Math.exp(-(t - t0) / 1.6))
    return mixP(W[5], W[6], u)
  },

  // ---------------------------------------------------------------- the caption that runs off the edge

  captionOffEdge(ctx, t, show) {
    // THE GAG (the script's, and the auditor's note): this caption is set too wide on purpose. It
    // starts where captions start and runs off the right edge of the frame, so that its last words,
    // "the right edge", are the ones cut off. It is intended; if a check reports overflowing or
    // cut-off text here, that is this, and it stays.
    const l = this.tm.edge
    if (t < l.t0 - 0.05 || t >= l.t1 + 0.7) return
    const a = Math.min(smoothstep(l.t0 - 0.05, l.t0 + 0.1, t), 1 - smoothstep(l.t1 + 0.4, l.t1 + 0.7, t))
    const color = show.puppet('sibyl').color
    const toks = l.words.map((w) => w[2])
    // one line, set large enough that "the" (token 9) starts just past the right edge
    const x0 = 140
    const base = { size: 25, ls: 0.06 }
    const w25 = toks.slice(0, 9).reduce((s, tok) => s + labelWidth(ctx, tok, base), 0) + 9 * labelWidth(ctx, ' ', base)
    const o = { size: (25 * (1290 - x0)) / w25, ls: 0.06 }
    const ws = toks.map((s) => labelWidth(ctx, s, o))
    const gap = labelWidth(ctx, ' ', o)
    const by = 676 - 73 + 30
    box(ctx, x0 - 28, by, 1400, 73, { color, cut: 8, width: 1.2, alpha: 0.6 * a, fillAlpha: 0.92 * a })
    const name = String(show.puppet('sibyl').name ?? '').toUpperCase()
    const nw = labelWidth(ctx, name, { size: 14, weight: 'm', ls: 0.2 })
    occlude(ctx, rectPath(x0 - 10, by - 9, nw + 20, 18), '#000', a)
    label(ctx, name, x0, by + 5, { size: 14, weight: 'm', color, ls: 0.2, alpha: a })
    let wi = -1
    for (let i = 0; i < l.words.length; i++) if (t >= l.words[i][0]) wi = i
    const done = t >= l.t1
    let x = x0
    const y = by + 30 + Math.min(o.size, 34) * 0.55
    toks.forEach((tok, i) => {
      const said = i <= wi
      const now = i === wi && !done
      const col = now ? color : P.white
      label(ctx, tok, x, y, { ...o, color: col, alpha: a * (said ? 1 : 0.5), weight: now ? 'm' : 'l' })
      if (now) seg(ctx, x, y + 7, x + ws[i], y + 7, col, 2, { hot: true, alpha: a })
      x += ws[i] + gap
    })
  },
}

const mixP = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), Math.exp(lerp(Math.log(a[2]), Math.log(b[2]), u))]

