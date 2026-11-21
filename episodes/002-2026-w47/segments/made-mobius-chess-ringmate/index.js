// made-mobius-chess-ringmate: "Chess for Three". The direction: shots, the studio's sketch of the
// board, the three post cards, the lamps, the house at the table, the wordless lap and the close.
// The ending (trim, cut 4): "I resign." is this segment's last line, not the episode's ("Good night,
// everybody." in `music-alt` is). The picture the button leaves (the flag tipped over, Larry's lamps
// at LIKE, REPOST, RESIGN) holds through the laugh and the sting, with a slow push in from the sting;
// there is no long applause, and the song follows, not the end card.
// Preview: npm run dev -- 002-2026-w47, then /?seg=made-mobius-chess-ringmate
// Frames:  npm run shoot -- 002-2026-w47 made-mobius-chess-ringmate 1 8 15 20 27 33 43 48 54 56 62 65.5
//
// Nobody at the studio has seen the real board, its rules or a game in play (production/research/
// media-notes.md). So the board is the studio's own drawing, from the picture's alt text ("a circle
// of chess pieces on a 1 dimensional mobius strip"): one file of squares bent into a loop with one
// half twist, a circle of identical plain pieces standing on it. It is labelled STUDIO SKETCH, and
// the credit and address are up, whenever it is on screen. The pieces never move; nothing shows a
// rule. The only thing that travels is Larry's gold flag, the studio's own prop and not a piece.
//
// The board is drawn here in 3D and projected by hand (stage units). The strip lies flat except for
// one short half twist at the front, between Eppy's seat and Larry's, so a cold viewer sees a flat
// ring with one place where it turns over. Each square has two faces: the face the camera sees is
// drawn solid, the other dashed. A face turns gold when the flag passes over it. On the first lap
// the flag rides on top, goes through the twist and arrives under Larry's own square, hanging
// upside down; the camera dips under the board to see it, and the second lap gilds the underside;
// through the twist again it comes home on top, and every square is gold on both faces.

const SKETCH = 'STUDIO SKETCH'
const CREDIT = 'ringmate · mobius.mokkenstorm.dev · by @mokkenstorm.dev'
const DISCLAIMER = 'Guests are puppets playing posting personas. Parody.'

// the three real posts, each shown exactly as posted (production/sources.json), words lit as spoken
const CARDS = {
  idea: {
    who: 'mokkenstorm',
    name: '👩‍💻 tbd : Option<name>',
    handle: 'mokkenstorm.dev',
    time: '17 Nov 2026',
    initials: 'T',
    text: '3 player 1d chess on a Möbius strip wormed its way into my brain and now I need to build it',
    replies: 0, reposts: 0, likes: 2,
    tag: null,
  },
  awesome: {
    who: 'minormobius',
    name: 'Minor Mobius',
    handle: 'minormobius.bsky.social',
    time: '18 Nov 2026',
    initials: 'M',
    text: 'That’s awesome, I need a website tho',
    replies: 4, reposts: 0, likes: 9,
    tag: 'REPLY UNDER THE PICTURE',
  },
  policy: {
    who: 'minormobius',
    name: 'Minor Mobius',
    handle: 'minormobius.bsky.social',
    time: '18 Nov 2026',
    initials: 'M',
    text: 'I like! I repost! But I’m not gonna love unless there’s a link',
    replies: 1, reposts: 0, likes: 5,
    tag: 'REPLY TO A QUESTION',
  },
}

// ------------------------------------------------------------------------------------- the board

const N = 24 // squares in the single file
const TW0 = 18 / N, TW1 = 23 / N // the half twist: squares 18 to 22 (front centre)
const SEATS = [
  { who: 'larry', cell: 0, name: 'LARRY', color: '#ffc861' },
  { who: 'sibyl', cell: 8, name: 'SIBYL', color: '#d8e2ea' },
  { who: 'eppy', cell: 16, name: 'EPPY', color: '#ff8a3c' },
]
const PIECES = [2, 4, 6, 10, 12, 14, 23]
const PHI0 = (-150 * Math.PI) / 180 // Larry's seat: front left. The flag runs Larry → Sibyl (back) → Eppy (front right) → twist (front) → Larry.
const W = 0.34 // strip width (R = 1)
const TAU = 0.045 // strip thickness
const OPEN_GAP = 0.24 // how far the two faces part when the board opens
const GOLD = '#ffc861'

const sstep = (a, b, x) => {
  const u = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return u * u * u * (u * (u * 6 - 15) + 10)
}
const theta = (c) => Math.PI * sstep(TW0, TW1, c)

/** a point on the strip's mid-surface at centreline parameter c (0..1 laps from Larry) and across v (-1..1) */
function frameAt(c) {
  const phi = PHI0 - 2 * Math.PI * c
  const r = [Math.cos(phi), Math.sin(phi), 0]
  const th = theta(c)
  const d = [Math.cos(th) * r[0], Math.cos(th) * r[1], Math.sin(th)] // across the strip
  const n = [-Math.sin(th) * r[0], -Math.sin(th) * r[1], Math.cos(th)] // the normal of side σ = c
  const tg = [Math.sin(phi), -Math.cos(phi), 0] // direction of travel (dφ/dc < 0)
  return { r, d, n, tg }
}
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]
function pointAt(c, v, side = 0, tau = TAU) {
  const f = frameAt(c)
  let p = add(f.r, f.d, (v * W) / 2)
  if (side) p = add(p, f.n, (side * tau) / 2)
  return p
}

/** the camera: { cx, cy, k, el, yaw } → project world [x,y,z] to [sx, sy, depth] */
function projector(view) {
  const ce = Math.cos(view.el), se = Math.sin(view.el), cy = Math.cos(view.yaw), sy = Math.sin(view.yaw)
  const P = (p) => {
    const x = p[0] * cy - p[1] * sy, y = p[0] * sy + p[1] * cy, z = p[2]
    return [view.cx + view.k * x, view.cy - view.k * (z * ce + y * se), y * ce - z * se]
  }
  /** does a normal face the camera? */
  P.facing = (n) => {
    const y = n[0] * sy + n[1] * cy
    return -y * ce + n[2] * se
  }
  return P
}

const poly = (pts) => {
  const p = new Path2D()
  pts.forEach((q, i) => (i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])))
  p.closePath()
  return p
}

/** a plain piece, identical everywhere: base, body, ball. Local units, base at 0, up = -y, height 1 */
const PIECE = [[-0.34, 0], [0.34, 0], [0.32, -0.1], [0.17, -0.16], [0.1, -0.56], [0.2, -0.6], [0.2, -0.66], [-0.2, -0.66], [-0.2, -0.6], [-0.1, -0.56], [-0.17, -0.16], [-0.32, -0.1]]

/**
 * Draw the board. state: { s: flag progress in laps 0..2 (null: no flag), plant 0..1, fall 0..1,
 * seats: bool, flash: t for the gold pulse, t }
 */
function drawBoard(ctx, show, view, state = {}) {
  const { draw, P } = show
  const pr = projector(view)
  const k = view.k
  const s = state.s
  const pos = s == null ? null : s + 0.5 / N // the flag's place on the double cover σ ∈ [0, 2)
  const goldAt = (sigma) => (pos != null && pos >= sigma ? 1 : 0)
  const items = []
  // the board opens for the second lap: its two faces part, so both can be seen at once
  const O = state.open ?? 0
  const tau = TAU + OPEN_GAP * O
  const ga = 1

  // the table's glow under the board
  if (view.table !== false) {
    const tp = []
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2
      tp.push(pr([Math.cos(a) * 1.32, Math.sin(a) * 1.32, -0.42]))
    }
    const path = poly(tp)
    draw.occlude(ctx, path, '#000', 0.92)
    draw.beam(ctx, path, P.blueMid, 1.2, { alpha: 0.45 })
  }

  for (let i = 0; i < N; i++) {
    const c0 = i / N, c1 = (i + 1) / N, cm = (i + 0.5) / N
    const f = frameAt(cm)
    const up = pr.facing(f.n) >= 0 ? 1 : -1 // which side of this square the camera sees
    const inset = 0.05 / N
    const M = 6 // samples along each edge, so a square inside the twist is drawn twisted
    const edge = (side, v) => {
      const pts = []
      for (let j = 0; j <= M; j++) pts.push(pr(pointAt(c0 + inset + ((c1 - c0 - 2 * inset) * j) / M, v, side, tau)))
      return pts
    }
    const face = (side) => [...edge(side, -0.9), ...edge(side, 0.9).reverse()]
    const longEdge = (side, v) => {
      const pts = []
      for (let j = 0; j <= M; j++) pts.push(pr(pointAt(c0 + ((c1 - c0) * j) / M, v, side, tau)))
      return pts
    }
    const near = { side: up, path: poly(face(up)), sigma: up > 0 ? cm : cm + 1, A: edge(up, -0.9), B: edge(up, 0.9) }
    const far = { side: -up, path: poly(face(-up)), sigma: up > 0 ? cm + 1 : cm, A: edge(-up, -0.9), B: edge(-up, 0.9) }
    const depth = pr(pointAt(cm, 0))[2]
    items.push({
      depth,
      draw() {
        // a face, solid: gold once the flag has passed over it, and it stays gold in every view
        const solid = (sd, w, cover) => {
          if (w <= 0) return
          const g = goldAt(sd.sigma)
          draw.occlude(ctx, sd.path, '#000', cover * w)
          const age = g ? (pos - sd.sigma) / 0.04 : 9
          if (g) {
            draw.occlude(ctx, sd.path, GOLD, w * (0.3 + 0.4 * Math.exp(-age)))
            draw.beam(ctx, sd.path, GOLD, 1.8, { hot: true, alpha: w })
          } else {
            draw.occlude(ctx, sd.path, '#0d2234', 0.9 * w * cover)
            draw.beam(ctx, sd.path, P.sky, 1.4, { alpha: 0.85 * w })
          }
          // the strip's two edges, unbroken from square to square, so the loop and its twist read as one band
          for (const v of [-1, 1]) draw.beamPts(ctx, longEdge(sd.side, v), P.white, 1.1, { alpha: 0.55 * w })
        }
        // the face beneath: dashed while the board is shut, solid when it opens
        const gf = goldAt(far.sigma)
        if (O < 1) draw.beam(ctx, far.path, gf ? GOLD : P.blueMid, 1.1, { alpha: (1 - O) * (gf ? 0.8 : 0.45), dash: [4, 4] })
        solid(far, O, 1)
        // the edges between the two faces (see-through while the board is open)
        for (const [na, fa] of [[near.A, far.A], [near.B, far.B]]) {
          const w = poly([...na, ...fa.slice().reverse()])
          draw.occlude(ctx, w, '#000', 0.9 * (1 - O))
          draw.beam(ctx, w, P.blueMid, 0.8, { alpha: 0.35 * (1 - 0.5 * O) })
        }
        // the face towards us
        solid(near, 1, 1 - 0.45 * O)
      },
    })
  }

  // the pieces: identical, standing on the upper side of their squares; they never move
  for (const cell of PIECES) {
    const cm = (cell + 0.5) / N
    const f = frameAt(cm)
    const side = f.n[2] >= 0 ? 1 : -1
    const nrm = [f.n[0] * side, f.n[1] * side, f.n[2] * side]
    const base = pointAt(cm, 0.1, side, tau)
    const h = 0.17
    items.push({
      depth: pr(add(base, nrm, h / 2))[2] - 0.001,
      draw() {
        const b = pr(base), top = pr(add(base, nrm, h))
        const ux = top[0] - b[0], uy = top[1] - b[1] // screen vector of "up" (length = height)
        const L = Math.hypot(ux, uy) || 1
        const wx = (-uy / L) * h * k * 0.62, wy = (ux / L) * h * k * 0.62 // across, constant width
        const pts = PIECE.map(([px, py]) => [b[0] + px * wx - py * ux, b[1] + px * wy - py * uy])
        const body = poly(pts)
        const hc = [b[0] + 0.82 * ux, b[1] + 0.82 * uy]
        const ball = new Path2D()
        ball.arc(hc[0], hc[1], h * k * 0.13, 0, Math.PI * 2)
        draw.occlude(ctx, body, '#000', ga)
        draw.occlude(ctx, ball, '#000', ga)
        draw.beam(ctx, body, P.white, 1.3, { alpha: 0.85 * ga })
        draw.beam(ctx, ball, P.white, 1.3, { alpha: 0.85 * ga })
      },
    })
  }

  // flags: the three name flags at the seats, and Larry's travelling flag
  const flag = (c, v, sideSign, o) => {
    const f = frameAt(c)
    const nrm = [f.n[0] * sideSign, f.n[1] * sideSign, f.n[2] * sideSign]
    const base = pointAt(c, v, sideSign, tau)
    // tipping over: the pole swings from the normal down onto the strip, forwards along the travel
    const fall = o.fall ?? 0
    const ang = (fall * Math.PI) / 2 * 0.92
    const pole = add([nrm[0] * Math.cos(ang), nrm[1] * Math.cos(ang), nrm[2] * Math.cos(ang)], f.tg, Math.sin(ang))
    const h = o.h * (o.grow ?? 1)
    const top = add(base, pole, h)
    items.push({
      depth: pr(add(base, pole, h / 2))[2] - 0.002 - (o.bias ?? 0),
      draw() {
        const g = o.grow ?? 1
        if (g <= 0.01) return
        const oa = o.alpha ?? 1
        const B = pr(base), T = pr(top)
        draw.seg(ctx, B[0], B[1], T[0], T[1], o.color, 1.8, { hot: true, alpha: oa })
        // the cloth faces the camera and hangs from the top of the pole, so its words turn with
        // the pole: upright on top of the strip, upside down beneath it
        const px = T[0] - B[0], py = T[1] - B[1], pl = Math.hypot(px, py) || 1
        const dx = -px / pl, dy = -py / pl // towards the base
        const rx = dy, ry = -dx // the text's right
        const w = o.w * k * g, ch = o.ch * k * g
        const C = [[T[0], T[1]], [T[0] + rx * w, T[1] + ry * w], [T[0] + rx * w + dx * ch, T[1] + ry * w + dy * ch], [T[0] + dx * ch, T[1] + dy * ch]]
        const cloth = poly(C)
        draw.occlude(ctx, cloth, '#000', oa)
        draw.occlude(ctx, cloth, o.color, 0.22 * oa)
        draw.beam(ctx, cloth, o.color, 1.5, { hot: o.hot, alpha: oa })
        if (o.text && g > 0.6) {
          ctx.save()
          ctx.translate(T[0] + (rx * w + dx * ch) / 2, T[1] + (ry * w + dy * ch) / 2)
          ctx.transform(rx, ry, dx, dy, 0, 0)
          draw.label(ctx, o.text, 0, o.size * 0.36, { size: o.size, color: o.textColor ?? P.white, align: 'center', weight: 'm', ls: 0.06, alpha: oa })
          ctx.restore()
        }
      },
    })
  }
  if (state.seats) {
    for (const st of SEATS) {
      const c = (st.cell + 0.5) / N
      const f = frameAt(c)
      flag(c, 0.62, f.n[2] >= 0 ? 1 : -1, { h: 0.24, w: 0.3, ch: 0.1, color: st.color, text: st.name, size: 11, alpha: st.who === 'larry' ? 1 - (state.nameOff ?? 0) : 1 })
    }
  }
  if (pos != null) {
    const lap = pos >= 1 && pos < 2 ? 1 : 0
    const c = pos % 1
    flag(c, -0.42, lap ? -1 : 1, { h: 0.36, w: 0.46, ch: 0.14, color: GOLD, text: "LARRY'S SIDE", size: 12, hot: true, bias: lap ? 3 : 0, grow: state.plant ?? 1, fall: state.fall ?? 0, textColor: '#fff4dc' })
  }

  items.sort((a, b) => b.depth - a.depth)
  for (const it of items) it.draw()
}

/** STUDIO SKETCH and the credit, wherever the board is */
function sketchLabels(ctx, show, { x, y, creditX, creditY, align = 'left', glow = 0, alpha = 1 }) {
  const { draw, P } = show
  const w = draw.labelWidth(ctx, SKETCH, { size: 13, weight: 'm', ls: 0.22 })
  draw.box(ctx, x - 8, y - 17, w + 16, 24, { color: P.amber, radius: 3, width: 1.2, alpha })
  draw.label(ctx, SKETCH, x, y, { size: 13, color: P.amber, weight: 'm', ls: 0.22, alpha })
  const cw = draw.labelWidth(ctx, CREDIT, { size: 15, ls: 0.06 })
  const cx = align === 'center' ? creditX - cw / 2 : creditX
  draw.occlude(ctx, draw.rectPath(cx - 10, creditY - 18, cw + 20, 26), '#000', 0.7)
  // the credit names an account and a site: never under the caption bar
  if (alpha > 0.05) draw.protect(ctx, cx - 10, creditY - 18, cw + 20, 26)
  if (glow > 0) draw.glowText(ctx, CREDIT, cx, creditY, { size: 15, color: P.white, ls: 0.06, glow: glow, alpha: Math.min(1, alpha * (0.6 + glow)) })
  draw.label(ctx, CREDIT, cx, creditY, { size: 15, color: P.sky, ls: 0.06, alpha })
}

// ------------------------------------------------------------------------------- cards and lamps

/** a post card with its words lit as they are spoken */
function postCard(ctx, show, card, line, o) {
  const { draw, P } = show
  const t = show.t
  const appear = show.clamp((t - o.from) / 0.45)
  if (appear <= 0) return
  const color = show.puppet(card.who).color
  if (card.tag) {
    draw.label(ctx, card.tag, o.x + 4, o.y - 14, { size: 13, color, weight: 'm', ls: 0.2, alpha: appear })
  }
  const L = show.line(line)
  const opts = { x: o.x, y: o.y, w: o.w, name: card.name, handle: card.handle, time: card.time, text: card.text, initials: card.initials, color, replies: card.replies, reposts: card.reposts, likes: card.likes, appear, textColor: '#35506a', textSize: o.size }
  const h = draw.skeetCard(ctx, opts)
  // light the words: same layout as skeetCard's text (pad 18, name row 26, line height 1.38)
  if (appear < 1 || !L || L.word < 0) return h
  const words = card.text.split(' ')
  const size = o.size, pad = 18, nx = pad + 58, lh = size * 1.38
  const lines = draw.wrapLabel(ctx, card.text, o.w - pad * 2 - 58, { size, ls: 0.04 })
  let wi = 0
  lines.forEach((ln, i) => {
    let x = o.x + nx
    const y = o.y + pad + 26 + (i + 1) * lh - lh * 0.25
    for (const wd of ln.split(' ')) {
      if (wi <= L.word && wd === words[wi]) draw.label(ctx, wd, x, y, { size, color: P.white, ls: 0.04 })
      x += draw.labelWidth(ctx, wd + ' ', { size, ls: 0.04 })
      wi++
    }
  })
  return h
}

/** three lamps in a row: [{ text, on (0..1) }] */
function lamps(ctx, show, x, y, items, color, alpha = 1, gap = 104, plate = false) {
  const { draw, P } = show
  // a black plate behind the row, so nothing behind it (a jacket, a lapel) runs through the words
  const half = ((items.length - 1) / 2) * gap + gap / 2
  if (plate) draw.occlude(ctx, draw.roundPath(x - half, y - 26, half * 2, 76, 10), '#000', 0.92 * alpha)
  items.forEach((it, i) => {
    const lx = x + (i - (items.length - 1) / 2) * gap
    const p = new Path2D()
    p.arc(lx, y, 15, 0, Math.PI * 2)
    draw.occlude(ctx, p)
    if (it.on > 0) {
      draw.dot(ctx, lx, y, 24, color, 0.18 * it.on * alpha)
      draw.occlude(ctx, p, color, 0.75 * it.on * alpha)
    }
    draw.ring(ctx, lx, y, 15, it.on > 0 ? color : P.blueMid, 1.6, { hot: it.on > 0, alpha: alpha * (it.on > 0 ? 1 : 0.6) })
    draw.label(ctx, it.text, lx, y + 38, { size: 14, color: it.on > 0 ? color : P.blueMid, align: 'center', weight: 'm', ls: 0.16, alpha })
  })
}

// --------------------------------------------------------------------------------- the module

// the table: Larry front left, Sibyl behind the board, Eppy front right (stage positions → world)
const TABLE = { cam: { x: 970, y: 560, zoom: 1.15 }, larry: [245, 345], sibyl: [640, 165], eppy: [1035, 345] }
const toWorld = (sx, sy, cam) => ({ x: cam.x + (sx - 640) / cam.zoom, y: cam.y + (sy - 360) / cam.zoom })
const BOARD_AT = toWorld(640, 455, TABLE.cam) // the board's centre in the studio

export default {
  cast: ['larry', 'sibyl', 'eppy'],
  guests: ['mokkenstorm', 'minormobius'],
  disclaimer: { text: DISCLAIMER, from: 'maker-in', dur: 6 },
  drift: true,

  shots: [
    { at: 0, shot: 'ots' },
    { at: 'maker-in', shot: 'ots', who: 'mokkenstorm', look: 'right' },
    { at: 'picture', shot: 'chessPicture' },
    { at: 'mm-in', shot: 'ots', who: 'minormobius', side: 'right', look: 'left' },
    { at: 'meaning', shot: 'desk' },
    { at: 'lamps', shot: 'ots', who: 'minormobius', side: 'right', look: 'camera' },
    { at: 'table', shot: 'chessTable' },
  ],

  setup(show) {
    const seat = (sx, sy, scale, extra = {}) => ({ ...toWorld(sx, sy, TABLE.cam), scale, z: 4, floor: null, seat: TABLE.cam.y + 380 / TABLE.cam.zoom, ...extra })
    show.SHOTS.chessTable = (sh, o = {}) => {
      const zoom = TABLE.cam.zoom * (o.zoomIn ?? 1)
      return {
        cam: { ...TABLE.cam, zoom, y: TABLE.cam.y - (o.lift ?? 0) },
        place: {
          larry: seat(...TABLE.larry, 1, { look: 0.5, z: 5 }),
          sibyl: seat(...TABLE.sibyl, 0.8, { look: Math.PI / 2, z: 3, seat: TABLE.cam.y + 200 / TABLE.cam.zoom }),
          eppy: seat(...TABLE.eppy, 1, { look: Math.PI - 0.5, z: 5 }),
        },
        audience: 0,
        set: { chair: false, couch: false, desk: false, bandstand: false },
      }
    }
    show.SHOTS.chessPicture = () => ({ cam: { x: 970, y: 520, zoom: 1.2 }, place: {}, audience: 0, set: { chair: false, couch: false, desk: false } })
  },

  /** the flag's progress in laps (0..2) */
  laps(show) {
    const b = (show.t - show.at('flag-off')) * (96 / 60)
    return show.clamp(b / 8, 0, 2)
  },

  /** the camera on the board at the table: above it, dipping under it for the second lap, a last turn */
  tableView(show) {
    const t = show.t
    const top = 0.56, low = 0.4
    const u0 = show.at('under'), home = show.at('all-gold'), end = show.at('stretch-end')
    // from just before the flag arrives under Larry's seat, the board opens and the camera lowers a
    // little: both faces are in view for the second lap, the homecoming and the hold on all gold. It
    // shuts again only after the stretch, under the laugh, when every face is gold.
    const open = show.smoothstep(u0 - 0.75, u0 - 0.1, t) * (1 - show.smoothstep(end + 0.4, end + 1.4, t))
    const el = top - (top - low) * open
    // once home, the gold loop turns a little while it holds
    const yaw = -0.3 * Math.sin(Math.PI * show.clamp((t - home - 0.1) / (end + 1.4 - home - 0.1)))
    // the board belongs to the studio: it moves with the camera (drift, and the push at the close)
    const cam = show.cam ?? TABLE.cam
    const [cx, cy] = show.toScreen(BOARD_AT.x, BOARD_AT.y)
    return { cx, cy, k: 250 * (cam.zoom / TABLE.cam.zoom), el, yaw, open }
  },

  /** Larry's name flag steps aside while his own flag hangs beneath his seat */
  nameOff(show) {
    return show.window(show.t, show.at('under') - 0.45, show.at('under') + 1.25, 0.3)
  },

  direct(t, show) {
    const P = show.P
    // the guests are off screen from the table on (a guest watching Larry lose would be a reaction nobody posted)
    if (show.since('table') >= 0) {
      show.puppet('mokkenstorm').hide()
      show.puppet('minormobius').hide()
    }

    // lower thirds: the chyron carries each guest's display name, handle and PUPPET · PARODY
    show.chyron('mokkenstorm', { from: show.at('maker-in') + 0.3, to: show.at('picture') - 0.2 })
    show.chyron('minormobius', { from: show.at('mm-in') + 0.3, to: show.at('meaning') })
    show.chyron('minormobius', { from: show.at('lamps') + 0.2, to: show.at('table') - 0.3 })

    // the wordless stretch: no caption bar, not even the last line's fading out
    if (show.between(show.at('gold.end') + 0.1, 'stretch-end')) show.caption(null)

    // the cards carry the guests' words, lit as spoken: no caption bar over them
    for (const id of ['idea', 'awesome', 'policy']) {
      const L = show.line(id)
      const next = show.lines.filter((l) => l.kind === 'say' && l.t0 > (L?.t0 ?? Infinity)).reduce((m, l) => Math.min(m, l.t0), Infinity)
      if (L && t >= L.t0 - 0.1 && t < Math.min(L.t1 + 0.8, next)) show.caption(null)
    }

    // Larry at the desk at the top: looks at the sketch, then at us
    if (show.since('maker-in') < 0) show.puppet('larry').lookAt(show.between('one-post', 'maker-in') || t < 1.2 ? 'camera' : 'right')
    if (show.between('meaning', 'lamps')) show.puppet('larry').lookAt('camera')

    if (show.since('table') < 0) return

    // ---- at the table
    for (const id of ['larry', 'sibyl', 'eppy']) show.puppet(id).bob(false)
    // the close: the last picture holds, and the camera pushes in slowly from the sting to the end
    const push = [show.at('sting'), show.duration]
    show.shot('chessTable', { zoomIn: show.tween(t, ...push, 1, 1.05, 'inOutSine'), lift: show.tween(t, ...push, 0, 18, 'inOutSine') })

    const view = this.tableView(show)
    const pr = projector(view)
    const s = this.laps(show)
    const pos = s + 0.5 / N
    const lap = pos >= 1 && pos < 2 ? -1 : 1
    const fp = pr(pointAt(pos % 1, -0.42, lap, TAU + OPEN_GAP * view.open))
    const L = show.headOf('larry'), E = show.headOf('eppy')
    const azTo = (h, x, y) => {
      if (!h) return Math.PI / 2
      const dx = x - h.x
      return show.clamp(Math.PI / 2 - 1.25 * Math.atan(dx / 260), 0.12, Math.PI - 0.12)
    }
    const nodTo = (h, y) => (h ? show.clamp(-(y - h.y) / 900, -0.32, 0.1) : -0.1)

    const inStretch = show.between('flag-off', 'stretch-end')
    const larry = show.puppet('larry'), eppy = show.puppet('eppy'), sibyl = show.puppet('sibyl')
    // before the lap: they look at whoever speaks, or at the board
    if (show.since('flag-off') < 0) {
      eppy.lookAt(show.line('players').active ? 'camera' : 'larry')
      sibyl.lookAt(show.between('pick', 'gold.end') ? 'larry' : Math.PI / 2 - 0.15).nod(-0.08)
      larry.lookAt(show.between('gold', 'flag-off') ? 0.55 : 'sibyl')
      if (show.between('gold', 'flag-off')) larry.nod(-0.18)
    } else if (inStretch && show.since('all-gold') < 0) {
      // the lap: Larry and Eppy follow the flag; Sibyl does not move at all
      larry.lookAt(azTo(L, fp[0], fp[1])).nod(nodTo(L, fp[1]))
      eppy.lookAt(azTo(E, fp[0], fp[1])).nod(nodTo(E, fp[1]))
      // Larry leans to look under the board while his flag is beneath it
      const lean = show.window(t, show.at('under') - 0.5, show.at('twist-2') + 0.2, 0.5)
      if (lean > 0) larry.place({ ...toWorld(TABLE.larry[0] + 22 * lean, TABLE.larry[1] + 34 * lean, TABLE.cam) }).nod(nodTo(L, fp[1]) - 0.2 * lean).tilt(-0.22 * lean)
    } else if (inStretch) {
      // home: Larry looks left, right, then at us; Eppy looks at his own flag, standing on gold
      const u = show.since('all-gold')
      larry.lookAt(u < 0.5 ? Math.PI - 0.25 : u < 1.0 ? 0.25 : 'camera')
      const ef = pr(pointAt((SEATS[2].cell + 0.5) / N, 0.62, 1))
      eppy.lookAt(azTo(E, ef[0], ef[1])).nod(-0.22)
    } else {
      // after: the procedure, and the hold to the end. Larry answers us; the other two watch him
      eppy.lookAt(show.since('move') >= 0 ? 'larry' : 'camera')
      larry.lookAt(show.between('move', 'like') ? 'sibyl' : 'camera')
      sibyl.lookAt('larry')
    }
    if (inStretch) sibyl.lookAt(Math.PI / 2 - 0.15).nod(-0.08)
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show

    // ---- the top: the sketch in the panel beside Larry
    if (show.since('maker-in') < 0 && show.panel) {
      const pn = show.panel
      const u = show.progress('board-in', 1.2)
      const yaw = -0.5 + 0.35 * show.ease.inOutSine(show.progress('board-in', 'maker-in'))
      drawBoard(ctx, show, { cx: pn.x + pn.w / 2, cy: pn.y + pn.h / 2 + 30, k: 205 * (0.85 + 0.15 * u), el: 0.62, yaw, table: false })
      sketchLabels(ctx, show, { x: pn.x + 24, y: pn.y + 36, creditX: pn.x + pn.w / 2, creditY: pn.y + pn.h - 22, align: 'center' })
    }

    // ---- the idea post, beside its maker
    if (show.between('maker-in', 'picture')) {
      const pn = show.panel
      if (pn) postCard(ctx, show, CARDS.idea, 'idea', { x: pn.x + 36, y: pn.y + 120, w: pn.w - 72, size: 30, from: show.at('maker-in') + 0.1 })
    }

    // ---- the picture: the sketch takes the frame
    if (show.between('picture', 'mm-in')) {
      draw.occlude(ctx, draw.rectPath(0, 0, 1280, 720), '#000', 1)
      const u = show.since('picture')
      drawBoard(ctx, show, { cx: 640, cy: 350, k: 330, el: 0.5 + 0.12 * Math.sin(u * 0.5), yaw: -0.7 + 0.16 * u, table: false })
      sketchLabels(ctx, show, { x: 48, y: 58, creditX: 640, creditY: 586, align: 'center' })
    }

    // ---- Minor Mobius's replies, and the three lamps
    if (show.between('mm-in', 'meaning')) {
      const pn = show.panel
      if (pn) postCard(ctx, show, CARDS.awesome, 'awesome', { x: pn.x + 36, y: pn.y + 130, w: pn.w - 72, size: 32, from: show.at('mm-in') + 0.1 })
    }
    if (show.between('lamps', 'table')) {
      const pn = show.panel
      if (pn) postCard(ctx, show, CARDS.policy, 'policy', { x: pn.x + 36, y: pn.y + 110, w: pn.w - 72, size: 32, from: show.at('lamps') })
      const h = show.headOf('minormobius')
      const W = show.line('policy')
      const at = (k) => W?.words?.[k]?.[0] ?? Infinity
      const on = (k) => show.clamp((t - at(k)) / 0.12)
      if (h) lamps(ctx, show, h.x, Math.min(600, h.y + h.size * 0.86), [{ text: 'LIKE', on: on(1) }, { text: 'REPOST', on: on(3) }, { text: 'LOVE', on: 0 }], P.sky, show.progress('lamps', 0.4))
    }

    // ---- the table
    if (show.since('table') >= 0) {
      const view = this.tableView(show)
      const s = show.since('flag-off') >= 0 ? this.laps(show) : show.since('gold') > 0 ? 0 : null
      const plant = show.clamp((t - (show.at('gold.end') - 0.35)) / 0.45)
      const fall = show.ease.outBack(show.clamp((t - show.at('flag-down')) / 0.6)) * 0.98
      drawBoard(ctx, show, view, { s: show.since('gold.end') > -0.35 ? s ?? 0 : null, plant, fall: show.since('flag-down') > 0 ? fall : 0, seats: true, open: view.open, nameOff: this.nameOff(show) })
      // the address glows once as they sit down
      const glow = show.window(t, show.at('table') + 0.4, show.at('table') + 1.8, 0.5)
      sketchLabels(ctx, show, { x: 36, y: 46, creditX: 1244 - draw.labelWidth(ctx, CREDIT, { size: 15, ls: 0.06 }), creditY: 46, glow })

      // the button: Larry's own lamps, in gold
      if (show.since('like') >= 0) {
        const W = show.line('like'), R = show.line('resign')
        const wAt = (Lx, k) => Lx?.words?.[k]?.[0] ?? Infinity
        const on = (x) => show.clamp((t - x) / 0.12)
        const resign = on(wAt(R, 1))
        const h = show.headOf('larry')
        const lx = h ? h.x - 25 : 220
        lamps(ctx, show, lx, 548, [{ text: 'LIKE', on: on(wAt(W, 1)) }, { text: 'REPOST', on: on(wAt(W, 3)) }, { text: resign > 0 ? 'RESIGN' : 'LOVE', on: resign }], GOLD, show.progress('like', 0.35), 92, true)
      }
    }
  },
}
