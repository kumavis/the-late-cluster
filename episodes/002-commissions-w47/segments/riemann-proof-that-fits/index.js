// riemann-proof-that-fits: the direction. Larry asks; Amber calls zetaof1; Sibyl reads zetaof1's
// reply in a follow spot; Amber's one-post proof is built beside the desk, bar by bar, bracket by
// bracket, pressed into slabs that Eppy calls as they land on a pile; the pile leaves the frame.
//
// The proof's bars, brackets and slabs draw only the quantities her post states: the terms 1, ½,
// ⅓ … ⅛ as bars; her two brackets; the counts 1, 2, 4; a guide at half the last bar of the group
// before; each block cut at its guide and stacked into a slab of ½ (the bar for 1 stays as the
// measure). Nothing of the show's lands on the proof.
//
// Shots are this segment's own (prefixed rpf*): the studio's guest/panel layouts put the guests
// where the bars and the pile have to stand. Studio code is imported as @late-cluster/show/….
import { tokenize, timing, postCard } from '@late-cluster/episode/segments/riemann-proof-that-fits/postcard.js'
import { zetaSign, cardStand, followSpot, stageDoor, bracketSide, bracketPair, bar, ghost, slab, sportsDesk, FLOOR, VIOLET, DOOR } from '@late-cluster/episode/segments/riemann-proof-that-fits/props.js'
import { MARKS } from '@late-cluster/show/stage/shots.js'
import { clamp, ease, unlerp } from '@late-cluster/show/kit/ease.js'
import { chyron as drawChyron } from '@late-cluster/show/stage/chrome.js'

// ---------------------------------------------------------------- the posts, exactly as posted
const DATE = '20 Nov 2026'
const POSTS = {
  call: {
    key: 'amber-call',
    name: 'Amber 🌸', handle: 'shimmermathlabs.com', date: DATE, initials: 'A', color: VIOLET,
    // her call answered a question whose author is not in this segment: REPLY, and nobody named
    reply: 'REPLY',
    text: 'calling @zetaof1.bsky.social, your whole account was leading up to this day, now is your time to shine, you got this',
    counts: { replies: 1, reposts: 0, likes: 4 },
    lines: ['amber-call'],
  },
  zeta: {
    key: 'zetaof1',
    name: 'Zeta Of 1', handle: 'zetaof1.bsky.social', date: DATE, initials: 'Z', color: '#7cc4ff',
    reply: 'REPLY TO @shimmermathlabs.com',
    text: 'The Zeta function is too intricate to explain on BlueSky\nWhich is totally the zeta-functions fault and not mine so\nAlso zeta evaluated at 1 is just the sum of inverse natural numbers and that diverges to infinity which was my kind of way to express Whitman\'s "I am large. I contain multitudes."',
    counts: { replies: 1, reposts: 0, likes: 4 },
    lines: ['sibyl-zeta'],
  },
  proof: {
    key: 'amber-proof',
    name: 'Amber 🌸', handle: 'shimmermathlabs.com', date: DATE, initials: 'A', color: VIOLET,
    reply: 'REPLY TO @zetaof1.bsky.social',
    text: 'i was gonna joke proof won\'t fit, but it does actually.\n\nζ(1) = 1 + ½ + (⅓ + ¼) + (⅕ + ⋯ + ⅛) + ⋯\n\neach bracket has twice as many terms as the last, each at least half as large as its last term. more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, so every block adds ≥ ½. infinitely many halves → ∞. □',
    counts: { replies: 1, reposts: 0, likes: 8 },
    lines: ['amber-fits', 'amber-sum', 'amber-brackets', 'amber-adds', 'amber-infinity'],
  },
  dlowd: {
    key: 'dlowd',
    name: 'Daniel Lowd', handle: 'dlowd.com', date: DATE, initials: 'D', color: '#5be381',
    reply: 'REPLY TO @shimmermathlabs.com',
    text: "Oh, I love that proof, and I'm going to remember it! Thanks!",
    counts: { replies: 0, reposts: 0, likes: 4 },
    lines: ['dlowd-reply'],
  },
}
/** the clause cut from the voice, shown as posted on the brackets (`tag-k`) */
const TAG = '… more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …'
const CLAUSE = ['more', 'simply:', 'block', 'k', 'has', '2ᵏ', 'terms,', 'each', '≥', '1/2ᵏ⁺¹,']

// ---------------------------------------------------------------- the studio floor for this segment
const STAND_X = 990 // the card stand and its follow spot, on Sibyl's side of the stage
const ZETA = { x: 1610, y: 470, size: 200 }
const EPPY_X = 960
const PILE_X = 1540
const WALL = -140 // the studio's left wall
const H = 160 // the bar for 1
const BW = 40, PITCH = 45
const SW = 64 // a slab's width; its height is H/2
const SLAB_H = H / 2

const PLACE = {
  larry: (look = 'camera') => ({ ...MARKS.desk, scale: 1, look, z: 5, floor: null, seat: 760 }),
  sibyl: (look = 'camera') => ({ x: 690, y: 540, scale: 1, look, z: 4, floor: FLOOR, instrument: 'lectern' }),
  amber: (look = 'camera') => ({ x: 1330, y: 602, scale: 1, look, z: 4, floor: null, seat: 790 }),
  dlowd: (look = 'shimmermathlabs') => ({ x: 1218, y: 602, scale: 1, look, z: 3.9, floor: null, seat: 790 }),
  eppy: (look = 'camera') => ({ x: EPPY_X, y: 530, scale: 1, look, z: 4, floor: null, seat: 700 }),
}
function band(look = 'right') {
  const out = {}
  for (const id of ['hy', 'al', 'pete', 'dee']) {
    const m = MARKS.band[id]
    out[id] = { x: m.x, y: m.y, scale: 0.92, look, z: id === 'pete' ? 1 : 2, floor: m.floor, instrument: m.instrument }
  }
  return out
}

function defineShots(show) {
  const S = show.SHOTS
  // Larry at the desk, the window behind him with room for the zeta on his left
  S.rpfDesk = () => ({ cam: { x: 1720, y: 600, zoom: 1.45 }, place: { larry: PLACE.larry() }, audience: 0 })
  // the call: Sibyl at her lectern, the empty card stand, Amber on the couch, her card above her
  S.rpfCall = (s, o = {}) => ({ cam: { x: 1000, y: 590, zoom: o.zoom ?? 0.9 }, place: { sibyl: PLACE.sibyl('right'), shimmermathlabs: PLACE.amber('camera') }, audience: 0.3 })
  // the read: Sibyl screen-left, the card in the spot
  S.rpfRead = () => ({ cam: { x: 1000, y: 600, zoom: 1.15 }, place: { sibyl: PLACE.sibyl('right'), shimmermathlabs: PLACE.amber('left') }, audience: 0 })
  // the proof card: Amber screen-right, her card on the left
  S.rpfProof = () => ({ cam: { x: 1030, y: 640, zoom: 1.3 }, place: { shimmermathlabs: PLACE.amber('camera') }, audience: 0 })
  // the bars beside the desk, Amber above them, Larry at the desk
  S.rpfBars = (s, o = {}) => ({ cam: { x: o.x ?? 1340, y: o.y ?? 775, zoom: o.zoom ?? 1.0 }, place: { shimmermathlabs: PLACE.amber(o.amberLook ?? 'camera'), larry: PLACE.larry(o.larryLook ?? 'left') }, audience: 0 })
  // the stage door at the far left, the bars far right
  S.rpfDoor = () => ({ cam: { x: 560, y: 700, zoom: 0.85 }, place: { sibyl: PLACE.sibyl('left'), shimmermathlabs: PLACE.amber('left') }, audience: 0.6 })
  // the count: Eppy at his desk, Amber, the pile, Larry
  S.rpfCount = () => ({ cam: { x: 1240, y: 760, zoom: 1.0 }, place: { eppy: PLACE.eppy('camera'), shimmermathlabs: PLACE.amber('right'), larry: PLACE.larry('left') }, audience: 0 })
  // the whole room, the band and the door in it
  S.rpfWide = (s, o = {}) => ({
    cam: { x: 900, y: 577, zoom: 0.6 },
    place: { ...band('right'), sibyl: PLACE.sibyl('right'), eppy: PLACE.eppy('camera'), shimmermathlabs: PLACE.amber('right'), larry: PLACE.larry('left') },
    audience: 1,
  })
  // the crane: the room as rpfWide, the camera set in direct(); the audience drops out of frame
  S.rpfCrane = (s) => ({ ...S.rpfWide(s), audience: 1 - clamp((s.t - s.at('crane')) / 0.7) })
  // the reply: dlowd beside her on the couch, his card at the left
  S.rpfReply = () => ({ cam: { x: 1080, y: 640, zoom: 1.1 }, place: { shimmermathlabs: PLACE.amber('dlowd'), dlowd: PLACE.dlowd('camera') }, audience: 0 })
  // the button: the room, no host
  S.rpfEnd = () => ({
    cam: { x: 1000, y: 577, zoom: 0.64 },
    place: { ...band('camera'), sibyl: PLACE.sibyl('camera'), eppy: PLACE.eppy('right'), shimmermathlabs: PLACE.amber('camera'), dlowd: PLACE.dlowd('camera') },
    audience: 1,
  })
}

// ---------------------------------------------------------------- the proof, as a function of t

/** the word time of `text` (nth occurrence) in a line */
function wordAt(show, id, text, nth = 0) {
  const L = show.line(id)
  let k = 0
  for (const w of L?.words ?? []) if (w[2] === text && k++ === nth) return w[0]
  show._warn?.(`no word "${text}" in ${id}`)
  return Infinity
}

function buildProof(show) {
  const w = (id, text, nth) => wordAt(show, id, text, nth)
  const groups = []
  const one = { x0: 1080, h: H, land: w('amber-sum', '1') }
  // blocks 0..2: the groups on her card
  const g0 = { n: 1, x0: 1138, guide: H / 2, bars: [{ h: H / 2, land: w('amber-sum', '½') }] }
  const g1 = { n: 2, x0: 1196, guide: H / 4, bars: [{ h: H / 3, land: w('amber-sum', '(⅓') }, { h: H / 4, land: w('amber-sum', '¼)') }], open: w('amber-sum', '(⅓'), close: w('amber-sum', '¼)') }
  const dots = w('amber-sum', '⋯', 0)
  const g2 = {
    n: 4, x0: 1315, guide: H / 8,
    bars: [{ h: H / 5, land: w('amber-sum', '(⅕') }, { h: H / 6, land: dots }, { h: H / 7, land: dots + 0.42 }, { h: H / 8, land: w('amber-sum', '⅛)') }],
    open: w('amber-sum', '(⅕'), close: w('amber-sum', '⅛)'),
  }
  // on "twice as many terms" the counts tick: 1, 2, 4
  g0.count = w('amber-brackets', 'twice')
  g1.count = w('amber-brackets', 'many')
  g2.count = w('amber-brackets', 'terms')
  // on "at least half as large": the guides, one after another; above them dims on "large"
  const atW = w('amber-brackets', 'at')
  ;[g0, g1, g2].forEach((g, i) => (g.guideT = atW + i * 0.22))
  const dimT = w('amber-brackets', 'large')
  // on "adds": cut and stacked; the mark is her last two symbols
  const press = w('amber-adds', 'adds')
  const markA = w('amber-adds', '≥'), markB = w('amber-adds', '½.')
  ;[g0, g1, g2].forEach((g) => Object.assign(g, { press, pressDur: 0.55, form: press + 0.55, markA, markB }))
  groups.push(g0, g1, g2)
  // blocks 3..5: under her dots, each twice as wide, arriving
  const half = (id) => w(id, 'Half.')
  const terms = (id) => w(id, 'terms.')
  const mk = (n, x0, arrive) => {
    const bars = []
    for (let j = 0; j < n; j++) bars.push({ h: H / (n + 1 + j), land: -Infinity })
    return { n, x0, guide: H / (2 * n), bars, arrive, late: true }
  }
  const g3 = mk(8, 1135, { from: -420, t0: show.at('slab-3') + 0.45, t1: show.at('slab-4') + 0.2 })
  const g4 = mk(16, 1490 - (16 * PITCH - 5), { from: DOOR.x1 - (16 * PITCH - 5), t0: show.at('slab-5') + 0.05, t1: show.at('slab-5') + 0.8, clip: DOOR.x0 })
  const g5 = mk(32, 1490 - (32 * PITCH - 5), { from: WALL - (32 * PITCH - 5), t0: show.at('slab-6') + 0.05, speed: 800, clip: WALL })
  ;[[g3, 'eppy-half-4'], [g4, 'eppy-half-5'], [g5, 'eppy-half-6']].forEach(([g, id]) => Object.assign(g, { press: terms(id), pressDur: 0.32, form: terms(id) + 0.32, markA: terms(id) + 0.2, markB: terms(id) + 0.3 }))
  groups.push(g3, g4, g5)
  // every slab: k = 1..6 from the groups, then the ones nobody calls
  const ids = ['eppy-half-1', 'eppy-half-2', 'eppy-half-3', 'eppy-half-4', 'eppy-half-5', 'eppy-half-6']
  groups.forEach((g, i) => {
    g.cx0 = g.x0 + (g.n * PITCH - 5) / 2
    g.half = half(ids[i])
    g.land = g.half - 0.04
    g.lift = i < 3 ? show.at(`slab-${i + 1}`) : g.form + 0.04
  })
  const lands = groups.map((g) => g.land)
  const out = show.at('pile-out')
  for (let n = 0; n < 400; n++) lands.push(out + 0.1 + n * 0.19)
  return { one, groups, lands, dimT, tagT: show.at('tag-k'), tagEnd: show.at('slab-1') }
}

/** where group g stands at t (its left edge) */
function groupX0(g, t) {
  const a = g.arrive
  if (!a) return g.x0
  if (a.speed) return Math.min(g.x0, a.from + Math.max(0, t - a.t0) * a.speed)
  const u = ease.outCubic(clamp((t - a.t0) / (a.t1 - a.t0)))
  return a.from + (g.x0 - a.from) * u
}
/** landed slabs at t */
function pileCount(pr, t) {
  let n = 0
  while (n < pr.lands.length && pr.lands[n] <= t) n++
  return n
}
/** a smooth height of the pile's top (world y), for the crane to chase */
function pileTopSmooth(pr, t) {
  const n = pileCount(pr, t)
  let frac = 0
  if (n < pr.lands.length && n > 0) frac = clamp((t - pr.lands[n - 1]) / (pr.lands[n] - pr.lands[n - 1]))
  return FLOOR - SLAB_H * (n + frac)
}

// ---------------------------------------------------------------- the module
export default {
  title: 'It Fits in a Post',
  cast: ['eppy', 'hy', 'al', 'pete', 'dee'],
  guests: ['shimmermathlabs', 'dlowd'],
  set: { chair: false },
  defaultShot: 'rpfDesk',
  disclaimer: { text: 'Guests are puppets playing posting personas. Parody.', from: 'call-card', dur: 6 },

  shots: [
    { at: 0, shot: 'rpfDesk' },
    { at: 'call-card', shot: 'rpfCall' },
    { at: 'zeta-card', shot: 'rpfRead', push: 1.0 },
    { at: 'proof-card', shot: 'rpfProof' },
    { at: 'bars', shot: 'rpfBars' },
    { at: 'amber-sum', after: 8.78, shot: 'rpfDoor' }, // the "+" before her last dots: the room, the door
    { at: 'brackets', shot: 'rpfBars', x: 1310, y: 785, zoom: 1.1, amberLook: 'camera' },
    { at: 'slab-1', shot: 'rpfCount' },
    { at: 'slab-5', shot: 'rpfWide' },
    { at: 'crane', shot: 'rpfCrane' },
    { at: 'reply-card', shot: 'rpfReply' },
    { at: 'behind-the-pile', shot: 'rpfEnd' },
  ],

  setup(show) {
    defineShots(show)
    for (const p of Object.values(POSTS)) {
      p.tokens = tokenize(p.text)
      p.times = timing(p.tokens, show, p.lines)
    }
    // the cut clause: its tokens on her card
    const pt = POSTS.proof.tokens
    const start = pt.findIndex((tk, i) => CLAUSE.every((c, j) => pt[i + j]?.s === c))
    this.clause = new Set(CLAUSE.map((_, j) => start + j))
    this.square = pt.length - 1
    this.proof = buildProof(show)
    this.dropZeta = wordAt(show, 'larry-ask', 'zeta')
    this.handleT = wordAt(show, 'amber-call', '@zetaof1.bsky.social,')
    this.shineT = wordAt(show, 'amber-call', 'time')
    this.shrinkT = wordAt(show, 'amber-fits', 'it')
    this.doorT = wordAt(show, 'amber-sum', '⋯', 1)
    this.stopT = wordAt(show, 'amber-infinity', '∞.')
  },

  direct(t, show) {
    const pr = this.proof
    // the crane: after the top of the pile, chasing it; on "infinity" it stops, short
    if (t >= show.at('crane') && t < show.at('reply-card')) {
      const t0 = show.at('crane')
      const tc = Math.min(t, this.stopT)
      const u = ease.inOutCubic(clamp((tc - t0) / 0.9))
      const zoom = 0.6 + (0.82 - 0.6) * u
      const chase = pileTopSmooth(pr, tc - 0.5) + 150 / zoom
      const y = Math.min(577, 577 + (chase - 577) * clamp((tc - t0) / 0.6))
      show.camera({ x: 900 + (PILE_X - 160 - 900) * u, y, zoom })
    }

    // heads
    if (show.between('call-card', 'zeta-card')) show.puppet('sibyl').lookAt(t > this.handleT ? 'right' : 'camera')
    if (show.between('bars', 'slab-1')) {
      const watching = show.between('brackets', 'press') ? (t % 6 < 2.2 ? 'left' : 'camera') : 'camera'
      show.puppet('shimmermathlabs').lookAt(watching)
    }
    if (show.between('slab-1', 'reply-card')) {
      const n = pileCount(pr, t)
      show.puppet('larry').lookAt('left').nod(Math.min(0.32, Math.max(0, n - 2) * 0.07))
      show.puppet('shimmermathlabs').lookAt('right').nod(Math.min(0.2, Math.max(0, n - 3) * 0.05))
      // Eppy calls each result: a small nod on every "Half."
      const g = pr.groups.find((g) => t >= g.half - 0.1 && t < g.half + 0.5)
      show.puppet('eppy').lookAt('camera').nod(g ? -0.1 * Math.sin(Math.PI * clamp((t - g.half + 0.1) / 0.6)) : 0)
    }
    // Sibyl has read the label on every slab, and does not look up
    if (show.since('slab-5') >= 0) show.puppet('sibyl').lookAt('right').nod(-0.05)

    // lower thirds
    show.chyron('larry', { from: 0.5, dur: 4.4 })
    // Amber's lower third is drawn in drawFront for her whole first line, a little higher than the
    // studio's: the disclaimer footer lifts the caption into the studio chyron's space
    show.chyron('dlowd', { from: 'reply-card', to: show.at('dlowd-reply.end') + 0.3 })
  },

  drawBack(ctx, t, show) {
    const callEnd = show.at('proof-card')
    show.world(ctx, (c) => {
      // the zeta, hanging behind the desk from the moment Larry says it
      zetaSign(c, ZETA.x, ZETA.y, ZETA.size, (t - this.dropZeta) / 0.55, t)
      // the stand, its plate and the follow spot (gone when her answer comes)
      if (t < callEnd) {
        const snap = t >= this.handleT ? 0.62 : 0
        const shine = clamp((t - this.shineT) / 0.3)
        const flash = t >= this.handleT ? Math.max(0, 1 - (t - this.handleT) / 0.25) * 0.5 : 0
        followSpot(c, STAND_X, snap + (1 - 0.62) * shine * (snap > 0 ? 1 : 0) + flash)
        cardStand(c, STAND_X, clamp((t - this.handleT) / 0.15), t)
      }
      // the stage door, open from her last dots
      stageDoor(c, (t - this.doorT) / 0.7, t)
      // the studio's left wall, and the hole the thirty-two makes in it
      const g5 = this.proof.groups[5]
      const k = clamp((t - g5.arrive.t0) / 0.2)
      const hole = [[WALL, FLOOR], [WALL + 14 * k, FLOOR - 40 * k], [WALL - 6 * k, FLOOR - 70 * k], [WALL + 18 * k, FLOOR - 110 * k], [WALL, FLOOR - 130 * k]]
      const wall = new Path2D()
      wall.moveTo(WALL, 420)
      wall.lineTo(WALL, FLOOR - 130 * k)
      show.draw.beam(c, wall, show.P.sky, 2, { alpha: 0.8 })
      if (k > 0) {
        show.draw.beamPts(c, hole, show.P.sky, 1.8, { alpha: 0.9, hot: true })
        const r = show.rng(5)
        const p = new Path2D()
        for (let i = 0; i < 12; i++) {
          const a = r.range(-1.4, 1.4), y0 = FLOOR - r.range(10, 120) * k
          const d = r.range(20, 80) * clamp((t - g5.arrive.t0) / 0.5)
          p.moveTo(WALL + 20 + Math.cos(a) * d, y0 + Math.sin(a) * d)
          p.lineTo(WALL + 26 + Math.cos(a) * d, y0 + Math.sin(a) * d + 4)
        }
        show.draw.beam(c, p, show.P.sky, 1.4, { alpha: 0.8 * (1 - clamp((t - g5.arrive.t0 - 1.2) / 0.8)) })
      }
    })
  },

  drawFront(ctx, t, show) {
    // Amber's chyron, PUPPET · PARODY, from before her first word to the end of her first line
    {
      const from = show.at('call-card'), to = show.at('amber-call.end') + 0.3
      if (t >= from && t <= to) {
        const id = 'shimmermathlabs', c = show.CAST[id] ?? {}
        drawChyron(ctx, { name: c.name, title: c.title, handle: c.handle, color: show.puppet(id).color, parody: !!c.guest }, unlerp(from, from + 0.4, t), unlerp(to - 0.5, to, t), 462)
      }
    }
    const { draw, P } = show
    const pr = this.proof

    show.world(ctx, (c) => {
      // Eppy's desk, from his first call
      if (t >= show.at('slab-1') - 0.01) sportsDesk(c, EPPY_X, 640, t)
      this.drawProofPieces(c, t, show)
    })

    // ---- the tag: the clause cut from the voice, as posted, on the brackets
    const tagA = show.window(t, pr.tagT, pr.tagEnd, 0.2)
    if (tagA > 0) {
      const [sx, sy] = show.toScreen(1355, FLOOR - 80)
      const size = 19
      const tw = draw.labelWidth(ctx, TAG, { size, ls: 0.04 }) + 30
      const left = show.toScreen(1186, 0)[0]
      const x = Math.max(left, Math.min(1260 - tw, sx - tw / 2))
      const y = Math.min(560, sy) - 46
      draw.box(ctx, x, y, tw, 38, { color: P.amber, cut: 6, width: 1.4, alpha: tagA })
      draw.label(ctx, TAG, x + 15, y + 25, { size, color: P.amber, ls: 0.04, alpha: tagA })
    }

    // ---- the cards
    this.drawCards(ctx, t, show)
  },

  /** bars, brackets, guides, counts and slabs (world units) */
  drawProofPieces(c, t, show) {
    const { draw, P } = show
    const pr = this.proof
    // the bar for 1: it stays, the measure every slab is half of
    if (t >= pr.one.land) {
      const drop = (1 - clamp((t - pr.one.land) / 0.18)) * 140
      bar(c, pr.one.x0, BW, FLOOR - pr.one.h - drop, FLOOR - drop)
    }
    pr.groups.forEach((g, gi) => {
      const x0 = groupX0(g, t)
      const span = g.n * PITCH - 5
      const cx = x0 + span / 2
      // the thirty-two is still arriving when its slab goes: it is never stacked, it fades
      const pressU = gi === 5 ? 0 : ease.inOutCubic(clamp((t - g.press) / g.pressDur))
      const lateA = gi === 5 ? 1 - clamp((t - g.form - 1.1) / 0.4) : 1
      const widen = ease.outCubic(clamp((t - g.form) / 0.25))
      const formed = t >= g.form
      // a group arriving from beyond the room is drawn only inside it
      const clipX = g.arrive?.clip
      if (clipX !== undefined) {
        c.save()
        c.beginPath()
        c.rect(clipX, -5000, 10000, 10000)
        c.clip()
      }
      const visible = g.arrive ? t >= g.arrive.t0 : true
      // the bars, cut at the guide and stacked on "adds"
      if (visible && (!formed || (gi === 5 && lateA > 0))) {
        g.bars.forEach((b, j) => {
          if (t < b.land) return
          const drop = Number.isFinite(b.land) ? (1 - clamp((t - b.land) / 0.18)) * 120 : 0
          const bx = x0 + j * PITCH
          const dim = gi < 3 && t >= pr.dimT
          if (pressU <= 0) {
            if (dim) {
              bar(c, bx, BW, FLOOR - g.guide - drop, FLOOR - drop)
              ghost(c, bx, BW, FLOOR - b.h, FLOOR - g.guide, 1)
            } else bar(c, bx, BW, FLOOR - b.h - drop, FLOOR - drop, { width: g.n > 8 ? 1.1 : 1.6, alpha: lateA })
          } else {
            // the piece under the guide slides into the stack; the top stays where it stood
            const px = bx + (cx - BW / 2 - bx) * pressU
            const py = FLOOR - (FLOOR - (FLOOR - j * g.guide)) * pressU
            bar(c, px, BW, py - g.guide, py, { width: g.n > 8 ? 1 : 1.6 })
            if (gi < 3) ghost(c, bx, BW, FLOOR - b.h, FLOOR - g.guide, 1)
          }
        })
      }
      // the "at least": what stood above the guides stays, dim
      if (gi < 3 && formed) g.bars.forEach((b, j) => ghost(c, g.x0 + j * PITCH, BW, FLOOR - b.h, FLOOR - g.guide, 1))
      // her brackets
      if (g.open !== undefined) {
        const fade = 1 - clamp((t - g.form) / 0.4)
        if (t >= g.open) bracketSide(c, x0 - 8, -1, FLOOR, 72, VIOLET, fade * clamp((t - g.open) / 0.12))
        if (t >= g.close) bracketSide(c, x0 + span + 8, 1, FLOOR, 72, VIOLET, fade * clamp((t - g.close) / 0.12))
      } else if (g.late && visible) {
        bracketPair(c, x0 - 8, x0 + span + 8, FLOOR, 96, VIOLET, gi === 5 ? lateA : 1 - clamp((t - g.form) / 0.4), 2)
      }
      // the counts, 1 2 4, under each group in turn
      if (g.count !== undefined && t >= g.count && t < g.lift) {
        const pop = 1 + 0.5 * Math.max(0, 1 - (t - g.count) / 0.25)
        draw.label(c, String(g.n), cx, FLOOR + 30, { size: 26 * pop, color: P.amber, align: 'center', weight: 'm', ls: 0 })
      }
      // the guide: at half the last bar of the group before
      if (g.guideT !== undefined && t >= g.guideT && t < g.form + 0.3) {
        const u = clamp((t - g.guideT) / 0.3)
        const a = 1 - clamp((t - g.form) / 0.3)
        draw.seg(c, x0 - 14, FLOOR - g.guide, x0 - 14 + (span + 28) * u, FLOOR - g.guide, P.amber, 1.6, { alpha: a, dash: [6, 4] })
      }
      if (clipX !== undefined) c.restore()

      // the slab: formed where its group stood, lifted onto the pile, flashing on its call
      if (formed) {
        const k = gi + 1
        const target = FLOOR - SLAB_H * gi
        let sx = gi === 5 ? Math.max(200, Math.min(1300, groupX0(g, g.form) + span - 220)) : cx
        let sy = FLOOR
        const w = BW + (SW - BW) * widen
        if (t >= g.lift) {
          const u = clamp((t - g.lift) / (g.land - g.lift))
          const e = ease.inOutCubic(u)
          const arc = Math.sin(Math.PI * u) * (gi < 3 ? 120 + 40 * gi : 60)
          sx = sx + (PILE_X - sx) * e
          sy = sy + (target - sy) * e - arc
        }
        const mark = t >= g.markB ? 2 : t >= g.markA ? 1 : 0
        const flash = t >= g.half ? Math.max(0, 1 - (t - g.half) / 0.6) : 0
        const pop = gi === 5 ? ease.outBack(clamp((t - g.form) / 0.2)) : 1
        slab(c, sx, sy, w * pop, SLAB_H * pop, { pieces: g.n, mark, flash })
      }
    })
    // the slabs nobody calls: they fall from above onto the pile, and keep falling
    const viewTop = show.cam.y - 360 / show.cam.zoom - 100
    const viewBot = show.cam.y + 360 / show.cam.zoom + 100
    for (let i = 6; i < pr.lands.length; i++) {
      const land = pr.lands[i]
      if (t < land - 0.35) break
      const bottom = FLOOR - SLAB_H * i
      const fall = t < land ? Math.pow(clamp((land - t) / 0.35), 2) * 720 : 0
      const y = bottom - fall
      if (y < viewTop || y - SLAB_H > viewBot) continue
      slab(c, PILE_X, y, SW, SLAB_H, { pieces: 64, mark: 2, flash: t >= land ? Math.max(0, 1 - (t - land) / 0.3) * 0.6 : 0 })
    }
  },

  /** the post cards, in stage units */
  drawCards(ctx, t, show) {
    const { draw, P } = show
    // her call, above her on the couch
    if (show.between('call-card', 'zeta-card')) {
      const p = POSTS.call
      postCard(ctx, { ...p, x: 816, y: 20, w: 440, textSize: 18, t, appear: show.progress('call-card', 0.35) })
    }
    // zetaof1's reply rises from the stand into the spot
    if (show.between('zeta-card', 'proof-card')) {
      const p = POSTS.zeta
      const u = ease.inOutCubic(show.progress('zeta-card', 0.7))
      const [px, py] = show.toScreen(STAND_X, 640)
      const W = 480, final = { x: 410, y: 16 }
      const s = 0.18 + (1 - 0.18) * u
      const x = px - (W * s) / 2 + (final.x + W / 2 - px) * u
      const y = py - 60 * s + (final.y - py + 60 * s) * u
      postCard(ctx, { ...p, x, y, w: W, scale: s, textSize: 18, t, appear: show.progress('zeta-card', 0.25), speakColor: show.puppet('sibyl').color })
    }
    // her proof: full size, then small at the left edge to the end
    if (t >= show.at('proof-card')) {
      const p = POSTS.proof
      const W = 640
      const u = ease.inOutCubic(clamp((t - this.shrinkT) / 0.75))
      const big = { x: 40, y: 22, s: 1 }
      const small = { x: 10, y: 14, s: 0.36 }
      const x = big.x + (small.x - big.x) * u
      const y = big.y + (small.y - big.y) * u
      const s = big.s + (small.s - big.s) * u
      const tagUp = t >= show.at('tag-k')
      const tagNow = show.between('tag-k', 'slab-1')
      const sq = show.at('square')
      const card = postCard(ctx, {
        ...p, x, y, w: W, scale: s, textSize: 19, t, appear: show.progress('proof-card', 0.3),
        lit: (i) => (tagUp && this.clause.has(i) ? 1 : 0),
        forcedColor: tagNow ? P.amber : P.white,
        glow: (i) => (i === this.square && t >= sq ? 0.55 + 0.45 * Math.max(0, 1 - (t - sq) / 0.6) : 0),
      })
      // the credit, and the one glance label, with the small card
      const a = clamp((u - 0.6) / 0.4)
      if (a > 0) {
        const cy = y + card.h + 18
        // a black backing, so the set never shows through the credit
        draw.occlude(ctx, draw.rectPath(x, cy - 14, 236, t < show.at('dlowd-reply.end') + 0.4 ? 66 : 36), '#000', 0.9 * a)
        draw.label(ctx, 'PROOF AS POSTED BY', x + 4, cy, { size: 11, color: P.blueMid, ls: 0.16, alpha: a })
        draw.label(ctx, '@shimmermathlabs.com', x + 4, cy + 16, { size: 13, color: VIOLET, ls: 0.04, alpha: a })
        if (t < show.at('dlowd-reply.end') + 0.4) {
          const la = a * (1 - clamp((t - show.at('dlowd-reply.end')) / 0.4))
          const txt = 'ZETA AT 1 · NOT THE HYPOTHESIS'
          const lw = draw.labelWidth(ctx, txt, { size: 11, ls: 0.12 }) + 16
          draw.box(ctx, x + 2, cy + 26, lw, 22, { color: P.amber, cut: 4, width: 1.1, alpha: la })
          draw.label(ctx, txt, x + 10, cy + 41, { size: 11, color: P.amber, ls: 0.12, alpha: la })
        }
      }
    }
    // dlowd's reply, beside him
    // up while he says it, down before the APPLAUSE sign lights over its corner
    if (show.between('reply-card', show.at('dlowd-reply.end') + 0.1)) {
      const p = POSTS.dlowd
      postCard(ctx, { ...p, x: 270, y: 34, w: 390, textSize: 19, t, appear: Math.min(show.progress('reply-card', 0.3), 1 - show.progress(show.at('dlowd-reply.end') - 0.15, 0.25)) })
    }
  },
}
