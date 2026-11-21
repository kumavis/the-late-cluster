// made-polyhedral-coffee-simulator: "Larry Plays a Game". The direction (shots, puppets, graphics)
// for script.js as rendered in cues.json.
//
// Preview: npm run dev -- 002-2026-w47, then /?seg=made-polyhedral-coffee-simulator
// Frames:  npm run shoot -- 002-2026-w47 made-polyhedral-coffee-simulator 2 12 18 24 30
//
// What is drawn, and from what:
// - The simulator (Morning Coffee Simulator, polycoffee.9000ish.uk, by Dave) is the studio's
//   sketch, labelled STUDIO SKETCH with the address and the maker's credit for as long as it is up.
//   Drawn only from the title screen as the project manager saw it (MORNING COFFEE, a BEGIN
//   MORNING button, the control SPACE · SIP, the prompt E · REFILL COFFEE FROM KETTLE) and from a
//   member's photo of it running (a pale terrace with white railings, blossom trees built from
//   small polyhedra, a string of red diamonds at the left, a red frame with a dark kettle shape).
//   The prompt is plain legend text. Nothing in this segment is a key cap, nobody presses a key,
//   and no key or stamp prop from the studio's kit is used.
// - The pink mug is the studio's sketch from two alt texts and nothing else ("crudely drawn
//   polyhedron of 20 sides", then "nicer polyhedron of 20 sides"). At 'turn-it' the two squares
//   are drawn as the member's annotation: dashed, in the colour of that member's card, with a
//   leader from the word "squares" on the card. The show does not assert them.
// - The two reference solids are geometry: a regular icosahedron (20 triangles) and the
//   sphenomegacorona, Johnson solid J88 (16 triangles, 2 squares that share an edge), drawn on and
//   labelled with their names and face counts, which stay up.
// - Every real post on screen is one string literal below, exact (Dave's address on its own row,
//   as posted), cut only with … where the reading is cut, with its display name, handle, date and counts (production/sources.json).
//
// The stretch (cue 'stretch' to 'stretch-end', 12.5 s plus the laugh's lead) has no words: the
// picture changes on every step the script lists, and the only text is MORNING COFFEE, BEGIN
// MORNING, SPACE · SIP, the prompt, and the sketch's label and credit.

const STEP = 60 / 96 / 4 // one sixteenth at 96 bpm
const SIPS = [24, 32, 36, 39, 42, 44, 46, 47]
const TREES = [6, 8, 10, 12, 14]
const POURS = [64, 66, 68, 70]

// ---- the real posts shown, each exactly as published (cut only with …, where the reading is cut)
const DAVE_TEXT = 'best i can do\n\npolyhedral coffee simulator'
const DAVE_LINK = 'polycoffee.9000ish.uk'
const REVIEW_TEXT = 'very peaceful thank you'
const FORMS_TEXT = 'polyhedron week comes in many forms'
const ENHANCE_TEXT = 'computer, enhance'
const SQUARES_TEXT = "…Hold on ma'am, I believe those are squares in the back. I believe you have been sold a sphenomegacorona, one of the classic adulterated bootleg icosahedrons"
const MONEY_TEXT = 'i want my money back!'

const AMBER = { name: 'Amber 🌸', handle: 'shimmermathlabs.com', color: '#ff9fc0' }
const CARDS = {
  dave: { name: 'Dave', handle: 'dave.9000ish.uk', color: '#d99a5b', date: '17 Nov', text: DAVE_TEXT, link: DAVE_LINK, replies: 2, reposts: 4, likes: 20, lines: ['best'] },
  review: { name: '👩‍💻 tbd : Option<name>', handle: 'mokkenstorm.dev', color: '#5be381', date: '17 Nov', text: REVIEW_TEXT, replies: 0, reposts: 0, likes: 1, lines: ['review'], reply: true },
  forms: { ...AMBER, date: '18 Nov', text: FORMS_TEXT, replies: 2, reposts: 0, likes: 27, lines: ['forms'] },
  enhance: { ...AMBER, date: '18 Nov', text: ENHANCE_TEXT, replies: 1, reposts: 0, likes: 3, lines: [], reply: true },
  squares: { name: '*Pistäwəńćə', handle: 'oszillate.bsky.social', color: '#58f0e8', date: '18 Nov', text: SQUARES_TEXT, replies: 1, reposts: 0, likes: 1, lines: ['squares', 'sold'], reply: true },
  money: { ...AMBER, date: '19 Nov', text: MONEY_TEXT, replies: 0, reposts: 0, likes: 0, lines: ['money'], reply: true },
}

// ---- the sketch's words (each a glance)
const SKETCH = 'STUDIO SKETCH'
const CREDIT = 'POLYCOFFEE.9000ISH.UK · DAVE'
const PROMPT = 'E · REFILL COFFEE FROM KETTLE'

// ---- colours
const PINK = '#ff9fc0'
const BLOSSOM = '#ffb3d1'
const RED = '#ff5a5a'
const COFFEE = '#c98a4b'
const CREAM = '#f4ead8'
const KETTLE = '#8d97ab'
const CYAN = '#58f0e8'

// ---- where the graphics sit
const BOARD = { x: 34, y: 40, w: 496, h: 420 } // the board in the room shot (screen-left)
const LX = 1140 // Larry's head on screen in the room shot

// ---- solids
const PHI = (1 + Math.sqrt(5)) / 2
const ICO_V = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
]
// the sphenomegacorona (J88), edge 2, C2v-symmetric: the squares are 0-1-3-2 and 0-1-5-4 and share
// the edge 0-1. Solved numerically from its face graph (k = 0.5946333, the root the published
// construction uses) and checked: 12 vertices, 28 edges all 2 ± 1e-6, 18 faces (16 triangles, 2 squares)
const J88 = [
  [0, 1, 1.607994025], [0, -1, 1.607994025], [1.189266671, 1, 0], [1.189266671, -1, 0],
  [-1.189266671, 1, 0], [-1.189266671, -1, 0], [0, 2.566204678, 0.364208309], [0, -2.566204678, 0.364208309],
  [1, 0, -1.721678869], [-1, 0, -1.721678869], [0, 1.709486165, -1.44300872], [0, -1.709486165, -1.44300872],
]
const J88_SQUARES = [[0, 1, 3, 2], [0, 1, 5, 4]]

function edgesOf(V, len, tol = 1e-3) {
  const E = []
  for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) {
    const d = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2])
    if (Math.abs(d - len) < tol) E.push([i, j])
  }
  return E
}
function centred(V) {
  const c = [0, 1, 2].map((k) => V.reduce((s, v) => s + v[k], 0) / V.length)
  const r = Math.max(...V.map((v) => Math.hypot(v[0] - c[0], v[1] - c[1], v[2] - c[2])))
  return V.map((v) => [(v[0] - c[0]) / r, (v[1] - c[1]) / r, (v[2] - c[2]) / r])
}
/** rotate about y (yaw) then x (pitch), project orthographically */
function project(V, yaw, pitch, cx, cy, r) {
  const cy_ = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
  return V.map(([x, y, z]) => {
    const x1 = x * cy_ + z * sy, z1 = -x * sy + z * cy_
    const y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp
    return [cx + x1 * r, cy - y2 * r, z2]
  })
}

export default {
  guests: ['dave', 'amber'],
  defaultShot: 'desk',
  autoPanel: true,

  shots: [
    { at: 0, shot: 'desk' },
    { at: 'dave-in', shot: 'guest', guest: 'dave' },
    { at: 'dave-card', shot: 'pcsRoom' },
    { at: 'win', shot: 'ots', side: 'right' },
    { at: 'review-card', shot: 'podium', look: 'left' },
    { at: 'strategy', shot: 'ots', side: 'right', look: 'camera' },
    { at: 'mugs', shot: 'pcsRoom', amber: true },
    { at: 'hold-on', shot: 'ots', side: 'right' },
    { at: 'squares', shot: 'ots', side: 'right', who: 'sibyl', look: 'left' },
    { at: 'money-card', shot: 'pcsRoom', amber: true },
  ],

  setup(show) {
    const { MARKS } = show
    // Larry at the desk screen-right, Dave in the chair, Amber (when asked) on the couch, and the
    // board screen-left over the empty part of the room
    show.SHOTS.pcsRoom = (s, o = {}) => {
      const zoom = o.zoom ?? 1.0
      const cam = { x: MARKS.desk.x - (LX - 640) / zoom, y: 650, zoom }
      const place = {
        larry: { ...MARKS.desk, scale: 1, look: o.look ?? 'camera', z: 5, floor: null, seat: 760 },
        dave: { ...MARKS.chair, scale: 1, look: 'larry', z: 4, floor: null, seat: 800 },
      }
      if (o.amber) place.amber = { ...MARKS.couch[0], scale: 1, look: 'larry', z: 3.9, floor: null, seat: 790 }
      return { cam, place, audience: 0, panel: null }
    }
    const r = show.rng(47)
    // the blossom trees: a trunk, two branches and a canopy of small solids, built once
    this.trees = [70, 168, 268, 372, 604].map((x, i) => {
      const h = 108 + r.range(-10, 14)
      const blobs = []
      for (let k = 0; k < 11; k++) blobs.push({ dx: r.range(-40, 40), dy: r.range(-30, 22), s: r.range(8, 14), rot: r.range(0, 6.28), kind: r.int(2) })
      return { x, h, lean: r.range(-8, 8), blobs, i }
    })
    this.petals = Array.from({ length: 18 }, () => ({ x: r.range(10, 640), y: r.range(0, 330), sp: r.range(14, 26), ph: r.range(0, 6.28), sw: r.range(6, 16) }))
    // a hand-drawn wobble for the mug's crude polyhedron (static, seeded)
    this.wob = ICO_V.map(() => [r.range(-0.16, 0.16), r.range(-0.16, 0.16)])
    this.ico = centred(ICO_V)
    this.icoE = edgesOf(ICO_V, 2)
    // stood with its two squares on top (z up becomes y up)
    this.j88 = centred(J88.map(([x, y, z]) => [y, z, x]))
    this.j88E = edgesOf(J88, 2)
  },

  // ---------------------------------------------------------------- performance

  direct(t, show) {
    const larry = show.puppet('larry')
    const dave = show.puppet('dave')
    const amber = show.puppet('amber')
    const step = (n) => show.at('morning') + n * STEP
    // the ots panel stands where the chair and couch are: hide them for those shots (every frame)
    const ots = show.between('win', 'review-card') || show.between('strategy', 'mugs') || show.between('hold-on', 'money-card')
    show.set.chair = !ots
    show.set.couch = !ots

    // part 1
    if (t < show.at('dave-in')) {
      larry.lookAt(show.between(1.3, 2.5) ? 'left' : 'camera')
    } else if (t < show.at('dave-card')) {
      const w = show.line('guest').words
      larry.lookAt(t < w[4][0] ? 'camera' : 'dave')
      if (show.between('ought', 'ought.end')) larry.lookAt('camera')
    } else if (t < show.at('win')) {
      larry.lookAt(show.since('title-screen') > 0.3 ? 'left' : 'dave')
      dave.lookAt(show.since('title-screen') > 0.6 ? 'left' : 'larry')
    }
    // nothing to read in the stretch: the last line's caption does not linger into it
    if (show.between('stretch', 'stretch-end')) show.caption(null)
    show.chyron('dave', { from: show.line('guest').words[6][0], to: show.at('dave-card') })

    // 'win': to us, to the panel, to us
    if (show.between('win', 'stretch')) {
      const w = show.line('win').words
      larry.lookAt(t < w[2][0] ? 'camera' : t < w[4][0] ? 'left' : 'camera')
    }

    // the stretch: no words. Larry plays.
    if (show.between('stretch', 'review-card')) {
      let look = 'left'
      if (show.between('legend', show.at('legend') + 0.45)) look = 'left'
      else if (show.between(show.at('legend') + 0.2, step(24) - 0.05)) look = 'camera'
      if (show.between(step(28), step(30))) look = Math.PI - 0.15 // far left: anyone there?
      else if (show.between(step(30), step(32))) look = 0.45 // right: anyone?
      if (show.between('empty', 'prompt')) look = 'camera' // waiting for the prize
      if (show.between('full', show.at('full') + 0.55)) look = 'left'
      else if (t >= show.at('full') + 0.55) look = 'camera'
      larry.lookAt(look)
      // a small nod on each sip
      let nod = 0
      for (const s of SIPS) nod += -0.09 * show.window(t, step(s) - 0.02, step(s) + 0.16, 0.06)
      larry.nod(nod)
      // he grows a little through the fast sips, and settles back when the mug is down
      const sipped = SIPS.filter((s) => t >= step(s)).length
      const grow = 1 + 0.012 * Math.max(0, sipped - 1)
      const settle = show.tween(t, show.at('empty'), show.at('empty') + 0.6, grow, 1, show.ease.inOutCubic)
      larry.scaleTo(t < show.at('empty') ? grow : settle)
      if (show.between('empty', 'prompt')) larry.tilt(0.08 * show.smoothstep(0, 1, show.progress('empty', 0.8)))
    }

    // part 3: Sibyl reads the reply; Larry answers it
    if (show.between('review-card', 'strategy')) show.puppet('sibyl').lookAt(show.between('review', 'strategy') ? 'left' : 'camera')
    if (show.between('strategy', 'mugs')) larry.lookAt('camera')

    // part 4: the mug thread
    if (show.between('mugs', 'hold-on')) {
      larry.lookAt(show.since('mugs') < 1.4 ? 'camera' : 'amber')
      dave.lookAt('left')
      amber.lookAt(show.between('forms', 'enhance') ? 'camera' : 'left')
    }
    show.chyron('amber', { from: show.line('forms').t0, dur: 4.2 })
    if (show.between('hold-on', 'squares')) {
      const w = show.line('closer').words
      larry.lookAt(t < w[6][0] ? 'camera' : 'left')
    }
    if (show.since('money-card') >= 0) {
      amber.lookAt(show.between('money', 'money.end') ? 'camera' : show.since('kettle') > 0 ? 'left' : 'larry')
      dave.lookAt(show.since('kettle') > 0 ? 'left' : 'amber')
      larry.lookAt(show.between('kettle', show.at('kettle') + 1.6) ? 'left' : show.between('money', 'button') ? 'amber' : 'camera')
    }
  },

  // ---------------------------------------------------------------- graphics behind the puppets

  drawBack(ctx, t, show) {
    const { draw, P } = show
    // the studio's own solids, drifting over the desk while Larry describes the video
    if (t < show.at('dave-in')) {
      const a = show.clamp(show.progress('solids', 0.8)) * (1 - show.clamp(show.progress(show.at('dave-in') - 0.3, 0.3)))
      const sols = [
        { V: this.ico, E: this.icoE, x: 250, y: 170, r: 62, c: P.sky },
        { V: CUBE, E: CUBE_E, x: 440, y: 330, r: 46, c: P.violet },
        { V: OCTA, E: OCTA_E, x: 1110, y: 150, r: 52, c: P.cyan },
      ]
      sols.forEach((s, i) => {
        const u = t - show.at('solids')
        wire(ctx, draw, s.V, s.E, 0.4 * u + i * 1.7, 0.35 + 0.1 * i, s.x + 14 * Math.sin(0.5 * u + i), s.y - 8 * u * (i === 1 ? -1 : 1), s.r, s.c, a * 0.85)
      })
    }

    // the ots panel: the simulator, then the correction
    if (show.panel) {
      const pn = show.panel
      if (t < show.at('mugs')) {
        const R = { x: pn.x + 20, y: pn.y + 18, w: pn.w - 40, h: ((pn.w - 40) * 400) / 650 }
        this.drawSim(ctx, t, show, R, {})
        tags(ctx, draw, P, R, pn.y + pn.h - 16, 15)
      } else this.drawCorrection(ctx, t, show, pn)
    }
  },

  drawFront(ctx, t, show) {
    // the board in the room shot (in front of the chair and couch arms, clear of the puppets)
    if (show.since('dave-card') >= 0 && !show.panel && show.layout?.place?.dave) this.drawBoard(ctx, t, show)
    // the reply Sibyl reads, beside the podium
    if (show.between('review-card', 'strategy')) {
      const u = show.since('review-card')
      this.card(ctx, show, CARDS.review, { x: 50, y: 96, w: 470, size: 30, appear: u / 0.45 })
    }
  },

  // ---------------------------------------------------------------- the board (room shot)

  drawBoard(ctx, t, show) {
    const { draw, P } = show
    const B = BOARD
    draw.panel(ctx, B, { color: P.sky, appear: show.progress('dave-card', 0.35) })
    if (show.since('dave-card') < 0.25) return

    if (t < show.at('win')) {
      // Dave's post, then the title screen under it from the word "polyhedral"
      this.card(ctx, show, CARDS.dave, { x: B.x + 16, y: B.y + 16, w: B.w - 32, size: 21, appear: show.progress(show.at('dave-card') + 0.15, 0.4) })
      const a = show.clamp(show.progress('title-screen', 0.5))
      if (a > 0) {
        const w = 214
        const R = { x: B.x + (B.w - w) / 2, y: B.y + 262, w, h: (w * 400) / 650 }
        this.drawSim(ctx, t, show, R, { alpha: a })
        tags(ctx, draw, P, { x: B.x + 20, w: B.w - 40 }, B.y + B.h - 14, 12, a)
      }
      return
    }

    // part 4: the simulator shrinks to the board's corner; then the pink mug and its thread
    const full = { x: B.x + 20, y: B.y + 22, w: B.w - 40, h: ((B.w - 40) * 400) / 650 }
    const corner = { x: B.x + B.w - 170, y: B.y + 268, w: 152, h: (152 * 400) / 650 }
    const k = show.ease.inOutCubic(show.clamp(show.progress(show.at('mugs') + 0.3, 0.8)))
    const R = lerpRect(full, corner, k)
    this.drawSim(ctx, t, show, R, { kettleAway: show.since('kettle') > -0.05 })
    draw.label(ctx, SKETCH, R.x + R.w, R.y + R.h + 16, { size: 11, align: 'right', color: P.blueMid, ls: 0.2 })
    draw.label(ctx, CREDIT, R.x + R.w, R.y + R.h + 32, { size: 11, align: 'right', color: P.gold, ls: 0.12 })

    if (t >= show.at('pink-mug')) {
      const mx = B.x + 150, my = B.y + 328, size = 140
      this.drawMug(ctx, t, show, mx, my, size, { appear: show.progress('pink-mug', 0.5) })
      draw.label(ctx, SKETCH, mx - size / 2, my - size * 0.52 - 18, { size: 11, color: P.blueMid, ls: 0.2, alpha: show.clamp(show.progress('pink-mug', 0.5)) })
      if (show.since('kettle') > -0.05) this.drawKettlePour(ctx, t, show, R, mx, my, size)
      // the thread's cards, top of the board, one after another
      const cw = { x: B.x + 16, y: B.y + 16, w: B.w - 32, size: 22 }
      if (t < show.at('enhance')) this.card(ctx, show, CARDS.forms, { ...cw, appear: show.progress('pink-mug', 0.45) })
      else if (t < show.at('money-card')) this.card(ctx, show, CARDS.enhance, { ...cw, appear: show.progress('enhance', 0.3) })
      else this.card(ctx, show, CARDS.money, { ...cw, appear: show.progress('money-card', 0.3) })
    }
  },

  // ---------------------------------------------------------------- the correction (ots panel)

  drawCorrection(ctx, t, show, pn) {
    const { draw, P } = show
    const mx = pn.x + 128, my = pn.y + 350
    this.drawMug(ctx, t, show, mx, my, 150, { appear: 1 })
    draw.label(ctx, SKETCH, mx - 6, pn.y + pn.h - 14, { size: 12, align: 'center', color: P.blueMid, ls: 0.2 })
    // the two reference solids, drawn on, labels that stay up
    const u = show.since('two-solids')
    if (u > 0) {
      const drawOn = show.clamp(u / 1.3)
      const spin = 0.14 * u
      const y = pn.y + 360
      wire(ctx, draw, this.ico, this.icoE, 0.5 + spin, 0.32, pn.x + 372, y, 74, P.white, 0.9, drawOn)
      wire(ctx, draw, this.j88, this.j88E, -0.35 + spin, 0.62, pn.x + 572, y, 80, P.white, 0.9, drawOn)
      // its two squares, in the label colour (a fact about the solid, not about the mug)
      if (drawOn >= 1) {
        const pj = project(this.j88, -0.35 + spin, 0.62, pn.x + 572, y, 80)
        for (const q of J88_SQUARES) draw.beamPts(ctx, q.map((i) => [pj[i][0], pj[i][1]]), P.gold, 1.8, { close: true, alpha: 0.8 * show.clamp(u - 1.3) })
      }
      const la = show.clamp((u - 0.5) / 0.5)
      const lab = (name, faces, x) => {
        draw.label(ctx, name, x, pn.y + pn.h - 36, { size: 14, align: 'center', color: P.gold, ls: 0.12, alpha: la })
        draw.label(ctx, faces, x, pn.y + pn.h - 16, { size: 14, align: 'center', color: P.gold, ls: 0.12, alpha: la })
      }
      // on one line, low, clear of the icosahedron above it
      draw.label(ctx, 'ICOSAHEDRON · 20 FACES', pn.x + 372, pn.y + pn.h - 14, { size: 14, align: 'center', color: P.gold, ls: 0.12, alpha: la })
      lab('SPHENOMEGACORONA ·', '18 FACES', pn.x + 572)
    }
    // the reply's card, the biggest thing in the frame
    const c = this.card(ctx, show, CARDS.squares, { x: pn.x + 16, y: pn.y + 16, w: pn.w - 32, size: 23, appear: show.progress('hold-on', 0.5) })
    // a leader from the word "squares" on the card to the member's squares on the mug
    if (c && this.squaresAt) {
      const wd = c.words.find((w) => norm(w.text) === 'squares')
      if (wd) {
        const la = show.clamp((t - show.at('turn-it') - 1.1) / 0.5)
        draw.seg(ctx, wd.x, wd.y + 7, wd.x + wd.w, wd.y + 7, CYAN, 2, { hot: true, alpha: la })
        // down from the word to under the card, along it, and down to the squares
        const x0 = wd.x + wd.w / 2, y0 = c.y + c.h, yr = y0 + 12
        const [x1, y1] = this.squaresAt
        const path = [[x0, y0], [x0, yr], [x1, yr], [x1, y1 - 4]]
        const total = Math.abs(yr - y0) + Math.abs(x1 - x0) + Math.abs(y1 - 4 - yr)
        let left = total * la
        const pts = [path[0]]
        for (let i = 1; i < path.length && left > 0; i++) {
          const [ax, ay] = path[i - 1], [bx, by] = path[i]
          const d = Math.abs(bx - ax) + Math.abs(by - ay)
          const f = Math.min(1, left / Math.max(1e-6, d))
          pts.push([ax + (bx - ax) * f, ay + (by - ay) * f])
          left -= d
        }
        draw.beamPts(ctx, pts, CYAN, 1.4, { dash: [6, 5], alpha: 0.9 * la })
      }
    }
  },

  // ---------------------------------------------------------------- the simulator (studio sketch)

  /**
   * The simulator drawn in a 650 × 400 design space scaled into R. Its state is a function of t:
   * the title screen until BEGIN MORNING, then the terrace, the mug, eight sips, the wait, the
   * prompt, the pour.
   */
  drawSim(ctx, t, show, R, o = {}) {
    const { draw, P } = show
    const alpha = o.alpha ?? 1
    const k = R.w / 650
    const step = (n) => show.at('morning') + n * STEP
    const begin = show.at('begin')
    draw.box(ctx, R.x, R.y, R.w, R.h, { color: '#9fb8d8', width: 1.3, alpha: 0.9 * alpha, radius: 4 })
    ctx.save()
    ctx.beginPath()
    ctx.rect(R.x, R.y, R.w, R.h)
    ctx.clip()
    ctx.translate(R.x, R.y)
    ctx.scale(k, k)
    const L = (text, x, y, opt) => draw.label(ctx, text, x, y, { ...opt, alpha: (opt.alpha ?? 1) * alpha })

    // ---- the scene (drawn on after BEGIN MORNING)
    const on = show.clamp((t - begin) / 0.9)
    if (on > 0) {
      const a = alpha * on
      // sky and the valley's far line
      draw.beamPts(ctx, [[0, 176], [90, 160], [170, 172], [260, 150], [360, 168], [460, 146], [560, 166], [650, 152]], P.blueMid, 1, { alpha: 0.5 * a })
      // the terrace floor in perspective
      const vx = 325, vy = 176
      for (let i = -4; i <= 4; i++) draw.seg(ctx, vx + i * 30 * 0.45 + i * 18, 262, vx + i * 150, 400, '#cfd8e6', 1, { alpha: 0.35 * a })
      for (const y of [292, 330, 378]) draw.seg(ctx, 0, y, 650, y, '#cfd8e6', 1, { alpha: 0.28 * a })
      // the red frame with the kettle hanging in it
      const fa = a * show.clamp((t - begin - 0.2) / 0.5)
      draw.seg(ctx, 452, 236, 452, 70, RED, 2.2, { alpha: fa })
      draw.seg(ctx, 560, 236, 560, 70, RED, 2.2, { alpha: fa })
      draw.seg(ctx, 438, 72, 574, 72, RED, 2.6, { alpha: fa })
      draw.seg(ctx, 446, 88, 566, 88, RED, 1.6, { alpha: fa })
      // the trees, one per hat
      for (const tr of this.trees) {
        const t0 = step(TREES[tr.i])
        const u = show.clamp((t - t0) / 0.35)
        if (u <= 0) continue
        const s = show.ease.outBack(u)
        const bx = tr.x, by = 236, top = by - tr.h * s
        draw.beamPts(ctx, [[bx, by], [bx + tr.lean * 0.5 * s, by - tr.h * 0.5 * s], [bx + tr.lean * s, top]], '#d08a52', 2.2, { alpha: a })
        draw.seg(ctx, bx + tr.lean * 0.5 * s, by - tr.h * 0.55 * s, bx - 22 * s, top + 14 * s, '#d08a52', 1.4, { alpha: a })
        draw.seg(ctx, bx + tr.lean * 0.6 * s, by - tr.h * 0.62 * s, bx + 26 * s, top + 10 * s, '#d08a52', 1.4, { alpha: a })
        for (const b of tr.blobs) poly(ctx, draw, bx + tr.lean * s + b.dx * s, top + b.dy * s, b.s * s, b.rot + 0.2 * (t - t0), b.kind ? 6 : 5, BLOSSOM, a * 0.95)
      }
      // the railings, in front of the trees
      draw.seg(ctx, 0, 236, 650, 236, '#f2f6ff', 2, { alpha: a })
      draw.seg(ctx, 0, 262, 650, 262, '#f2f6ff', 1.4, { alpha: a })
      for (let x = 12; x < 650; x += 26) draw.seg(ctx, x, 236, x, 262, '#f2f6ff', 1.1, { alpha: 0.8 * a })
      // the string of red diamonds, top left
      const sag = (x) => 30 + 0.0018 * x * (300 - x) * 1.2
      const pts = []
      for (let x = 0; x <= 260; x += 10) pts.push([x, sag(x)])
      draw.beamPts(ctx, pts, '#d9c7c7', 0.9, { alpha: 0.7 * a })
      for (let i = 0; i < 7; i++) {
        const x = 18 + i * 36, y = sag(x), sw = 2 * Math.sin(t * 1.3 + i)
        draw.seg(ctx, x, y, x + sw, y + 12, '#d9c7c7', 0.8, { alpha: 0.7 * a })
        draw.beamPts(ctx, [[x + sw, y + 12], [x + sw + 7, y + 22], [x + sw, y + 32], [x + sw - 7, y + 22]], RED, 1.6, { alpha: a, close: true })
      }
      // petals, drifting
      if (t > step(TREES[0])) {
        const pa = a * show.clamp((t - step(TREES[0])) / 1)
        for (const p of this.petals) {
          const y = (p.y + t * p.sp) % 340
          draw.dot(ctx, p.x + p.sw * Math.sin(t * 0.9 + p.ph), y, 2.2, BLOSSOM, 0.8 * pa)
        }
      }
      // the mug, first person
      this.drawSimMug(ctx, t, show, a)
      // the kettle in its frame (or away pouring)
      this.drawSimKettle(ctx, t, show, a, o)
      // the legend: SPACE · SIP, lit when used
      const la = show.clamp((t - show.at('legend')) / 0.2)
      if (la > 0) {
        let hot = 0
        for (const s of SIPS) hot = Math.max(hot, 1 - show.clamp(Math.abs(t - step(s)) / 0.14))
        const dim = t > show.at('empty') ? 0.55 : 1
        const pop = 1 - show.clamp((t - show.at('legend')) / 0.4)
        L('SPACE · SIP', 22, 384, { size: 20 + 4 * pop, color: hot > 0.1 || pop > 0 ? P.white : '#cfd8e6', weight: hot > 0.3 ? 'm' : 'l', ls: 0.14, alpha: la * dim * (0.75 + 0.25 * Math.max(hot, pop)) })
      }
      // the simulator's own prompt, plain legend text
      const pr = show.clamp((t - show.at('prompt')) / 0.18) * (1 - show.clamp((t - show.at('full') - 0.3) / 0.4))
      if (pr > 0) {
        const pop = 1 - show.clamp((t - show.at('prompt')) / 0.35)
        draw.occlude(ctx, draw.roundPath(130, 180, 390, 44, 6), '#000', 0.88 * pr * alpha)
        L(PROMPT, 325, 210, { size: 22 + 3 * pop, align: 'center', color: P.white, ls: 0.12, alpha: pr, weight: 'm' })
      }
    }

    // ---- the title screen
    const ta = 1 - show.clamp((t - begin - 0.2) / 0.3)
    if (ta > 0) {
      const press = show.window(t, begin - 0.02, begin + 0.2, 0.04)
      L('MORNING COFFEE', 325, 150, { size: 46, align: 'center', color: '#fff3e0', ls: 0.12, weight: 'm', alpha: ta })
      draw.beamPts(ctx, [[215, 172], [435, 172]], PINK, 1, { alpha: 0.5 * ta * alpha })
      const bw = 270, bh = 54, bx = 325 - bw / 2, by = 214
      draw.box(ctx, bx, by, bw, bh, { color: press > 0.2 ? P.white : PINK, radius: 10, width: 1.6 + 1.6 * press, alpha: ta * alpha, hot: press > 0.2, fillAlpha: ta * alpha })
      L('BEGIN MORNING', 325, by + 35, { size: 22, align: 'center', color: press > 0.2 ? P.white : '#ffe3ee', ls: 0.14, alpha: ta, weight: press > 0.2 ? 'm' : 'l' })
      // the pointer comes to the button and clicks it
      const pu = show.clamp((t - (begin - 0.65)) / 0.6)
      if (pu > 0) {
        const e = show.ease.inOutCubic(pu)
        const px = 520 + (345 - 520) * e, py = 340 + (246 - 340) * e
        cursor(ctx, draw, px, py, 1 - 0.12 * press, ta * alpha)
      }
    }
    ctx.restore()
  },

  /** the coffee level 0..1 at t: eight sips down, the pour back up */
  level(t, show) {
    const step = (n) => show.at('morning') + n * STEP
    let lv = 1
    for (const s of SIPS) lv -= show.clamp((t - step(s) - 0.04) / 0.12) / SIPS.length
    for (const s of POURS) lv += show.clamp((t - step(s)) / 0.28) / POURS.length
    return show.clamp(lv)
  },

  drawSimMug(ctx, t, show, a) {
    const { draw, P } = show
    const step = (n) => show.at('morning') + n * STEP
    const up = show.ease.outBack(show.clamp((t - show.at('mug-up')) / 0.4))
    if (up <= 0) return
    // a sip tips the mug towards us and lifts it; setting it down drops it a little
    let tip = 0
    for (const s of SIPS) tip = Math.max(tip, show.window(t, step(s) - 0.03, step(s) + 0.13, 0.05))
    const down = show.window(t, show.at('empty') - 0.02, show.at('empty') + 0.18, 0.06)
    const cx = 325, w = 200, rimY = 312 - 26 * tip + 8 * down + (1 - up) * 160, rh = 60 - 16 * tip
    ctx.save()
    ctx.translate(cx, rimY)
    ctx.rotate(-0.05 * tip)
    // body (runs off the bottom of the view)
    const body = new Path2D()
    body.moveTo(-w / 2, 0)
    body.lineTo(-w / 2 + 8, 150)
    body.lineTo(w / 2 - 8, 150)
    body.lineTo(w / 2, 0)
    body.ellipse(0, 0, w / 2, rh / 2, 0, 0, Math.PI)
    draw.occlude(ctx, body, '#000', a)
    draw.beam(ctx, body, CREAM, 1.8, { alpha: a })
    // handle
    const h = new Path2D()
    h.moveTo(w / 2 - 2, 26)
    h.bezierCurveTo(w / 2 + 52, 22, w / 2 + 52, 96, w / 2 - 6, 100)
    draw.beam(ctx, h, CREAM, 2.2, { alpha: a })
    // inside: the far wall, the coffee, or the empty bottom
    const rim = new Path2D()
    rim.ellipse(0, 0, w / 2, rh / 2, 0, 0, Math.PI * 2)
    draw.occlude(ctx, rim, '#000', a)
    const lv = this.level(t, show)
    ctx.save()
    ctx.clip(rim)
    const depth = (1 - lv) * 46
    if (lv > 0.01) {
      const surf = new Path2D()
      surf.ellipse(0, 4 + depth, (w / 2) * (0.97 - 0.12 * (1 - lv)), (rh / 2) * (0.92 - 0.1 * (1 - lv)), 0, 0, Math.PI * 2)
      draw.occlude(ctx, surf, '#3b2412', a)
      draw.beam(ctx, surf, COFFEE, 1.6, { alpha: a })
      // a little crema swirl
      draw.beam(ctx, ellipsePath(-12, 2 + depth, 26 * lv + 6, 6 * lv + 2), '#e8b98a', 1, { alpha: 0.6 * a })
    } else {
      // the bottom of the mug, and nothing in it
      draw.beam(ctx, ellipsePath(0, 52, w * 0.36, rh * 0.32), '#8f8778', 1.2, { alpha: 0.8 * a })
    }
    ctx.restore()
    draw.beam(ctx, rim, CREAM, 2, { alpha: a, hot: tip > 0.3 })
    ctx.restore()
    // steam while there is coffee
    const lv2 = this.level(t, show)
    if (lv2 > 0.05) {
      for (let i = 0; i < 3; i++) {
        const pts = []
        for (let j = 0; j <= 10; j++) {
          const y = rimY - 18 - j * 9
          pts.push([cx - 40 + i * 40 + 8 * Math.sin(j * 0.8 + t * 3 + i * 2), y])
        }
        draw.beamPts(ctx, pts, '#e6eef8', 1, { alpha: 0.35 * a * lv2 })
      }
    }
  },

  /** where the kettle is: hanging in the frame, or carried over the mug to pour */
  kettlePose(t, show) {
    const home = { x: 506, y: 142, rot: 0 }
    const over = { x: 482, y: 268, rot: -0.75 }
    const go = show.ease.inOutCubic(show.clamp((t - show.at('prompt') - 0.2) / 0.42))
    const back = show.ease.inOutCubic(show.clamp((t - show.at('full') - 0.25) / 0.6))
    const tilt = show.clamp((t - show.at('pour') + 0.05) / 0.15) * (1 - show.clamp((t - show.at('full')) / 0.2))
    const u = go * (1 - back)
    return { x: home.x + (over.x - home.x) * u, y: home.y + (over.y - home.y) * u, s: 1 + 0.6 * u, rot: over.rot * tilt, pouring: tilt > 0.6 }
  },

  drawSimKettle(ctx, t, show, a, o) {
    const { draw } = show
    if (o.kettleAway) return
    const k = this.kettlePose(t, show)
    // the cord it hangs from, while it is home
    if (k.y < 150) draw.seg(ctx, 506, 88, 506, k.y - 24, '#d9c7c7', 0.9, { alpha: 0.7 * a })
    kettle(ctx, draw, k.x, k.y, k.s, k.rot, a)
    if (k.pouring) {
      // the spout's tip, turned with the kettle
      const [sx, sy] = turnPt(-40, -8, k.rot, k.s, k.x, k.y)
      const p = new Path2D()
      p.moveTo(sx, sy)
      p.quadraticCurveTo(sx - 40, sy - 6, 338, 318)
      draw.beam(ctx, p, COFFEE, 3, { alpha: a, hot: true })
    }
  },

  // ---------------------------------------------------------------- the pink mug (studio sketch)

  drawMug(ctx, t, show, cx, cy, size, o = {}) {
    const { draw, P } = show
    const ap = show.clamp(o.appear ?? 1)
    if (ap <= 0) return
    const w = size, h = size * 1.04
    const x0 = cx - w / 2, y0 = cy - h / 2
    // body, rim, handle
    const body = new Path2D()
    body.moveTo(x0, y0)
    body.lineTo(x0 + 4, y0 + h)
    body.quadraticCurveTo(cx, y0 + h + 16, x0 + w - 4, y0 + h)
    body.lineTo(x0 + w, y0)
    draw.occlude(ctx, body, '#000', ap)
    draw.beam(ctx, body, PINK, 2, { alpha: ap })
    const rim = ellipsePath(cx, y0, w / 2, 13)
    draw.occlude(ctx, rim, '#000', ap)
    // coffee in the pink mug, only once the kettle has filled it
    const fill = show.clamp((t - show.at('kettle') - 0.75) / 0.9)
    if (fill > 0) {
      draw.occlude(ctx, ellipsePath(cx, y0 + 2, (w / 2) * 0.9 * (0.7 + 0.3 * fill), 10 * (0.7 + 0.3 * fill)), '#3b2412', ap)
      draw.beam(ctx, ellipsePath(cx, y0 + 2, (w / 2) * 0.9 * (0.7 + 0.3 * fill), 10 * (0.7 + 0.3 * fill)), COFFEE, 1.4, { alpha: ap * fill })
    }
    draw.beam(ctx, rim, PINK, 2, { alpha: ap })
    const hp = new Path2D()
    hp.moveTo(x0 + w - 2, y0 + h * 0.2)
    hp.bezierCurveTo(x0 + w + w * 0.36, y0 + h * 0.16, x0 + w + w * 0.36, y0 + h * 0.74, x0 + w - 3, y0 + h * 0.7)
    draw.beam(ctx, hp, PINK, 2.4, { alpha: ap })

    // the polyhedron of 20 sides on it: crude first, redrawn nicer under the scan line at 'enhance'
    const scanT = show.at('enhance') + 0.1
    const scanU = show.clamp((t - scanT) / 0.8)
    const scanY = y0 + scanU * h
    const turn = show.ease.inOutCubic(show.clamp((t - show.at('turn-it')) / 1.3))
    const yaw = 0.35 + turn * 1.15
    const pv = project(this.ico, yaw, 0.42, cx - 4, cy + 6, size * 0.33)
    const crude = this.wob
    const pts = pv.map((p, i) => [p[0] + crude[i][0] * size * 0.33, p[1] + crude[i][1] * size * 0.33, p[2]])
    const segs = (clean) => {
      const out = new Path2D()
      for (const [i, j] of this.icoE) {
        const A = clean ? pv[i] : pts[i], B = clean ? pv[j] : pts[j]
        out.moveTo(A[0], A[1])
        if (clean) out.lineTo(B[0], B[1])
        else out.quadraticCurveTo((A[0] + B[0]) / 2 + (crude[i][1] - crude[j][0]) * 9, (A[1] + B[1]) / 2 + (crude[j][1] - crude[i][0]) * 9, B[0], B[1])
      }
      return out
    }
    const clip = (y1, y2, fn) => {
      ctx.save()
      ctx.beginPath()
      ctx.rect(x0 - 60, y1, w + 120, y2 - y1)
      ctx.clip()
      fn()
      ctx.restore()
    }
    if (scanU < 1) clip(scanY, y0 + h + 30, () => draw.beam(ctx, segs(false), '#b46cff', 1.6, { alpha: ap * 0.95 }))
    if (scanU > 0) clip(y0 - 30, scanY, () => draw.beam(ctx, segs(true), '#c58bff', 1.4, { alpha: ap }))
    if (scanU > 0 && scanU < 1) draw.seg(ctx, x0 - 24, scanY, x0 + w + 24, scanY, CYAN, 2, { hot: true, alpha: 0.9 })

    // the member's annotation: two faces at the back outlined as squares, in the card's colour
    const sq = show.clamp((t - show.at('turn-it') - 1.1) / 0.7)
    if (sq > 0) {
      const s = size * 0.25
      const ax = cx + size * 0.06, ay = cy - size * 0.12
      const quad = (x, y) => [[x, y], [x + s, y - s * 0.22], [x + s * 1.02, y + s * 0.8], [x + 0.02 * s, y + s]]
      for (const q of [quad(ax - s, ay), quad(ax + 0.0, ay - s * 0.22)]) {
        const pth = new Path2D()
        q.forEach(([a, b], i) => (i ? pth.lineTo(a, b) : pth.moveTo(a, b)))
        pth.closePath()
        draw.occlude(ctx, pth, '#03282a', 0.35 * sq * ap)
        draw.beamPts(ctx, q.slice(0, 1 + Math.ceil(sq * 4)), CYAN, 2.4, { alpha: ap, dash: [7, 4], close: sq >= 1, hot: true })
      }
      this.squaresAt = [ax, ay - s * 0.22]
    } else this.squaresAt = null
  },

  /** the button: the kettle from the simulator's corner tips over the pink mug and fills it */
  drawKettlePour(ctx, t, show, R, mx, my, size) {
    const { draw } = show
    const k = R.w / 650
    const u = show.since('kettle')
    const fly = show.ease.inOutCubic(show.clamp(u / 0.6))
    const tilt = show.clamp((u - 0.55) / 0.2)
    const from = { x: R.x + 506 * k, y: R.y + 142 * k, s: k }
    const to = { x: mx + 74, y: my - size * 0.52 - 54, s: 1.5 }
    const x = from.x + (to.x - from.x) * fly, y = from.y + (to.y - from.y) * fly, s = from.s + (to.s - from.s) * fly
    const rot = -0.8 * tilt * (1 - show.clamp((u - 2.3) / 0.4))
    kettle(ctx, draw, x, y, s, rot, 1)
    if (tilt > 0.7 && u < 2.35) {
      const [sx, sy] = turnPt(-40, -8, rot, s, x, y)
      const p = new Path2D()
      p.moveTo(sx, sy)
      p.quadraticCurveTo(sx - 20, sy + 6, mx - 4, my - size * 0.52 + 4)
      draw.beam(ctx, p, COFFEE, 3.4, { hot: true })
    }
  },

  // ---------------------------------------------------------------- post cards

  /**
   * A post card, its words lighting as they are said. c: one of CARDS. o: { x, y, w, size, appear }.
   * Returns { x, y, w, h, words: [{ text, x, y, w }] }.
   */
  card(ctx, show, c, o) {
    const { draw, P } = show
    const t = show.t
    const appear = show.clamp(o.appear ?? 1)
    if (appear <= 0) return null
    const e = show.ease.outCubic(appear)
    const size = o.size ?? 22
    const pad = 20
    const x = o.x, y = o.y + (1 - e) * 26, w = o.w
    const tx = x + pad + 62
    const textW = w - (tx - x) - pad
    const lo = { size, ls: 0.04 }
    // lay out the words, paragraph by paragraph
    const lines = []
    for (const para of c.text.split('\n')) {
      if (!para.trim()) { if (lines.length) lines.push([]); continue }
      let cur = []
      for (const word of para.split(/\s+/)) {
        const test = [...cur, word].join(' ')
        if (cur.length && draw.labelWidth(ctx, test, lo) > textW) { lines.push(cur); cur = [word] } else cur.push(word)
      }
      lines.push(cur)
    }
    const lh = size * 1.36
    const linkH = c.link ? lh : 0
    const h = pad + 44 + lines.length * lh + linkH + 46
    // when each word is said
    const spoken = []
    for (const id of c.lines) for (const wd of show.line(id).words ?? []) spoken.push({ t0: wd[0], w: norm(wd[2]) })
    let j = 0
    const timed = []
    for (const ln of lines) for (const word of ln) {
      const n = norm(word)
      let at = null
      for (let q = j; q < Math.min(spoken.length, j + 3); q++) if (spoken[q].w === n && n) { at = spoken[q].t0; j = q + 1; break }
      timed.push(at)
    }
    const reading = c.lines.length > 0
    const first = reading ? show.line(c.lines[0]).t0 : -Infinity
    const last = reading ? show.line(c.lines[c.lines.length - 1]).t1 : -Infinity
    const a = Math.min(1, appear * 2)
    draw.box(ctx, x, y, w, h, { color: c.color, radius: 14, width: 1.8, alpha: 0.95 * a, fillAlpha: a })
    // a real post's card: never under the caption bar
    if (a > 0.05) draw.protect(ctx, x, y, w, h)
    // the avatar: a ring with the name's first letter (no picture of anyone)
    const ax = x + pad + 24, ay = y + pad + 24
    draw.occlude(ctx, ellipsePath(ax, ay, 24, 24), '#000', a)
    draw.ring(ctx, ax, ay, 24, c.color, 2.2, { hot: true, alpha: a })
    draw.ring(ctx, ax, ay, 24 * 0.78, c.color, 0.9, { alpha: 0.4 * a })
    draw.label(ctx, initialOf(c.name), ax, ay + 24 * 0.32, { size: 20, align: 'center', color: P.white, weight: 'm', ls: 0.02, alpha: a })
    draw.label(ctx, c.name, tx, y + pad + 18, { size: 19, color: P.white, weight: 'm', ls: 0.03, alpha: a })
    draw.label(ctx, `@${c.handle} · ${c.date}`, tx, y + pad + 40, { size: 14, color: P.blueMid, ls: 0.05, alpha: a })
    if (c.reply) {
      const rw = draw.labelWidth(ctx, 'REPLY', { size: 11, ls: 0.24 }) + 16
      draw.box(ctx, x + w - pad - rw - 36, y + pad + 4, rw, 20, { color: c.color, cut: 4, width: 1, alpha: 0.8 * a })
      draw.label(ctx, 'REPLY', x + w - pad - rw - 28, y + pad + 18, { size: 11, color: c.color, ls: 0.24, alpha: a })
    }
    draw.butterfly(ctx, x + w - pad - 12, y + pad + 12, 22, c.color, { width: 1.2, hot: false, alpha: 0.7 * a })
    // the words
    const out = []
    let k = 0
    const space = draw.labelWidth(ctx, ' ', lo)
    lines.forEach((ln, li) => {
      let wx = tx
      const wy = y + pad + 44 + (li + 1) * lh - lh * 0.22
      for (const word of ln) {
        const at = timed[k++]
        const ww = draw.labelWidth(ctx, word, lo)
        let col = P.white, al = 1, wt = 'l', under = false
        if (reading && t < last + 0.2 && t > first - 1.5) {
          if (at === null) al = 0.5
          else if (t < at) al = 0.45
          else if (t < at + 0.32) { col = c.color; wt = 'm'; under = true }
        }
        draw.label(ctx, word, wx, wy, { ...lo, color: col, alpha: a * al, weight: wt })
        if (under) draw.seg(ctx, wx, wy + 6, wx + ww, wy + 6, col, 2, { hot: true, alpha: a })
        out.push({ text: word, x: wx, y: wy, w: ww })
        wx += ww + space
      }
    })
    if (c.link) draw.label(ctx, c.link, tx, y + pad + 44 + (lines.length + 1) * lh - lh * 0.22, { ...lo, color: P.sky, alpha: a * 0.9 })
    // footer: replies, reposts, likes
    const fy = y + h - 24
    const items = [['replies', c.replies], ['reposts', c.reposts], ['likes', c.likes]]
    items.forEach(([kind, n], i) => {
      const ix = tx + i * ((x + w - tx - pad) / 3)
      footIcon(ctx, draw, kind, ix, fy, P.blueMid, a)
      draw.label(ctx, String(n), ix + 22, fy + 5, { size: 15, color: P.blueMid, alpha: a })
    })
    return { x, y, w, h, words: out }
  },
}

// ---------------------------------------------------------------- small drawing helpers

const CUBE = centred([[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]])
const CUBE_E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
const OCTA = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
const OCTA_E = edgesOf(OCTA, Math.SQRT2)

/** a wireframe solid; `drawOn` 0..1 draws its edges on one after another */
function wire(ctx, draw, V, E, yaw, pitch, cx, cy, r, color, alpha = 1, drawOn = 1) {
  const p = project(V, yaw, pitch, cx, cy, r)
  const n = E.length * drawOn
  const front = new Path2D(), back = new Path2D()
  E.forEach(([i, j], q) => {
    if (q >= n) return
    const f = Math.min(1, n - q)
    const path = (p[i][2] + p[j][2]) / 2 < -0.05 ? back : front
    path.moveTo(p[i][0], p[i][1])
    path.lineTo(p[i][0] + (p[j][0] - p[i][0]) * f, p[i][1] + (p[j][1] - p[i][1]) * f)
  })
  draw.beam(ctx, back, color, 1, { alpha: alpha * 0.35 })
  draw.beam(ctx, front, color, 1.6, { alpha })
}

/** a small solid in a blossom canopy: a polygon with its spokes */
function poly(ctx, draw, x, y, r, rot, n, color, alpha) {
  const pts = []
  for (let i = 0; i < n; i++) pts.push([x + r * Math.cos(rot + (i * 2 * Math.PI) / n), y + r * Math.sin(rot + (i * 2 * Math.PI) / n)])
  draw.occlude(ctx, (() => { const p = new Path2D(); pts.forEach(([a, b], i) => (i ? p.lineTo(a, b) : p.moveTo(a, b))); p.closePath(); return p })(), '#000', alpha * 0.6)
  draw.beamPts(ctx, pts, color, 1.1, { alpha, close: true })
  const sp = new Path2D()
  for (let i = 0; i < n; i += 2) { sp.moveTo(x, y); sp.lineTo(pts[i][0], pts[i][1]) }
  draw.beam(ctx, sp, color, 0.7, { alpha: alpha * 0.6 })
}

/** the dark kettle shape from the photo: body, lid, spout, handle; (x, y) its centre */
function kettle(ctx, draw, x, y, s, rot, alpha) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.scale(s, s)
  const b = new Path2D()
  b.moveTo(-26, 20)
  b.quadraticCurveTo(-30, -8, -14, -16)
  b.lineTo(14, -16)
  b.quadraticCurveTo(30, -8, 26, 20)
  b.closePath()
  draw.occlude(ctx, b, '#05070b', alpha)
  draw.beam(ctx, b, KETTLE, 1.6, { alpha })
  const sp = new Path2D()
  sp.moveTo(-24, 6)
  sp.lineTo(-40, -6)
  sp.lineTo(-36, -10)
  sp.lineTo(-22, -2)
  draw.beam(ctx, sp, KETTLE, 1.4, { alpha })
  const hd = new Path2D()
  hd.moveTo(-12, -16)
  hd.quadraticCurveTo(0, -38, 12, -16)
  draw.beam(ctx, hd, KETTLE, 1.6, { alpha })
  draw.dot(ctx, 0, -18, 2.4, KETTLE, alpha)
  ctx.restore()
}

/** an arrow pointer */
function cursor(ctx, draw, x, y, s, alpha) {
  const pts = [[0, 0], [0, 26], [7, 20], [12, 31], [16, 29], [11, 18], [20, 18]].map(([a, b]) => [x + a * s, y + b * s])
  const p = new Path2D()
  pts.forEach(([a, b], i) => (i ? p.lineTo(a, b) : p.moveTo(a, b)))
  p.closePath()
  draw.occlude(ctx, p, '#000', alpha)
  draw.beam(ctx, p, '#ffffff', 1.4, { alpha })
}

/** the sketch's label and credit, along the bottom of the panel, from the left (clear of the desk) */
function tags(ctx, draw, P, R, y, size, alpha = 1) {
  draw.label(ctx, SKETCH, R.x, y, { size, color: P.blueMid, ls: 0.22, alpha })
  const x = R.x + draw.labelWidth(ctx, SKETCH, { size, ls: 0.22 }) + size * 2
  draw.label(ctx, CREDIT, x, y, { size: size + 1, color: P.gold, ls: 0.12, alpha })
}

function footIcon(ctx, draw, kind, x, y, color, alpha) {
  const p = new Path2D()
  if (kind === 'replies') {
    p.moveTo(x, y - 5); p.lineTo(x + 14, y - 5); p.lineTo(x + 14, y + 5); p.lineTo(x + 6, y + 5); p.lineTo(x + 2, y + 9); p.lineTo(x + 2, y + 5); p.lineTo(x, y + 5); p.closePath()
  } else if (kind === 'reposts') {
    p.moveTo(x, y + 2); p.lineTo(x, y - 4); p.lineTo(x + 11, y - 4); p.moveTo(x + 8, y - 7); p.lineTo(x + 11, y - 4); p.lineTo(x + 8, y - 1)
    p.moveTo(x + 14, y - 2); p.lineTo(x + 14, y + 4); p.lineTo(x + 3, y + 4); p.moveTo(x + 6, y + 1); p.lineTo(x + 3, y + 4); p.lineTo(x + 6, y + 7)
  } else {
    p.moveTo(x + 7, y + 8); p.bezierCurveTo(x - 6, y, x, y - 10, x + 7, y - 3); p.bezierCurveTo(x + 14, y - 10, x + 20, y, x + 7, y + 8)
  }
  draw.beam(ctx, p, color, 1.3, { alpha })
}

function ellipsePath(x, y, rx, ry) {
  const p = new Path2D()
  p.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, Math.PI * 2)
  return p
}

/** a point in a kettle's own frame, turned and scaled with it */
function turnPt(px, py, rot, s, x, y) {
  return [x + s * (px * Math.cos(rot) - py * Math.sin(rot)), y + s * (px * Math.sin(rot) + py * Math.cos(rot))]
}

function lerpRect(a, b, k) {
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, w: a.w + (b.w - a.w) * k, h: a.h + (b.h - a.h) * k }
}

const norm = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
const initialOf = (name) => (String(name).match(/\p{L}/u)?.[0] ?? '?').toUpperCase()
