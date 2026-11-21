// riemann-breaking-news: the direction. A news channel breaks in, drawn in studio lines.
//
//   news    Larry at the desk as the anchor; BREAKING and a strap that carries his sentence as he
//           says it, then THE CLUSTER REACTS. Both drop out of the frame on "chart", and are gone
//           before the first frame of the chart card.
//   chart   guest boxes, the way a channel brings in correspondents: Larry's, davidcrespo's, then
//           moultano's. davidcrespo's card holds his own chart image; moultano's holds his card.
//   ask     a hard cut: Larry alone, closer; the zeta drops in over his shoulder on "zeta".
//   call    boxes again: Larry, Amber, and an empty box that lights with zetaof1's account plate
//           under a follow spot. zetaof1's card rises into that box and Sibyl reads it.
//   proof   the lit box opens out into the whole studio. Her proof, full size, then small at the
//           left edge with its credit and label to the end. Bars, brackets, slabs; the pile climbs
//           in front of the desk, past Larry, out of the top of the frame.
//
// Nothing the show draws carries a verdict, the mathematician, the checking or the market; the
// only market picture is davidcrespo's own image (chart.webp, copied unaltered), inside his card
// and inside moultano's card as the post it quoted. The proof's bars, brackets and slabs draw only
// the quantities her post states. Props: props.js; post cards: card.js.
import chartSrc from '@late-cluster/episode/segments/riemann-breaking-news/chart.webp?inline'
import { tokenize, timing, layoutCard, drawCard } from '@late-cluster/episode/segments/riemann-breaking-news/card.js'
import {
  banner, strapFrame, layoutHeadline, headline, reacts, guestBox, guestGlass, plate, boxSpot, accountPlate,
  zetaSign, stageDoor, bracketPair, bracketSide, bar, ghost, slab, FLOOR, VIOLET, DOOR,
} from '@late-cluster/episode/segments/riemann-breaking-news/props.js'
import { MARKS, TILE } from '@late-cluster/show/stage/shots.js'
import { clamp, ease, lerp } from '@late-cluster/show/kit/ease.js'

const chartImg = typeof Image !== 'undefined' ? Object.assign(new Image(), { src: chartSrc }) : null

// ---------------------------------------------------------------- the posts, exactly as posted
const DATE = '20 Nov 2026'
const POSTS = {
  chart: {
    name: 'conputer dipshit', handle: 'davidcrespo.bsky.social', date: DATE, initials: 'c', color: '#7cc4ff',
    text: "isn't it beautiful that we now live in a world where we can say the market values the capability to solve the Riemann Hypothesis at negative 80 billion dollars",
    counts: { replies: 23, reposts: 144, likes: 889 },
    lines: ['dc-chart'],
  },
  revenue: {
    name: 'Ryan Moulton', handle: 'moultano.bsky.social', date: DATE, initials: 'R', color: '#ee7dff',
    text: 'The market anticipates a sharp loss of revenue from all the mathematicians who had been working on the Reimann hypothesis.',
    counts: { replies: 3, reposts: 1, likes: 71 },
    lines: ['mo-revenue'],
  },
  call: {
    name: 'Amber 🌸', handle: 'shimmermathlabs.com', date: DATE, initials: 'A', color: VIOLET,
    // her call answered a question whose author is not in this segment: REPLY, and nobody named
    reply: 'REPLY',
    text: 'calling @zetaof1.bsky.social, your whole account was leading up to this day, now is your time to shine, you got this',
    counts: { replies: 1, reposts: 0, likes: 4 },
    lines: ['amber-call'],
  },
  zeta: {
    name: 'Zeta Of 1', handle: 'zetaof1.bsky.social', date: DATE, initials: 'Z', color: '#8fd8ff',
    reply: 'REPLY TO @shimmermathlabs.com',
    text: 'The Zeta function is too intricate to explain on BlueSky\nWhich is totally the zeta-functions fault and not mine so\nAlso zeta evaluated at 1 is just the sum of inverse natural numbers and that diverges to infinity which was my kind of way to express Whitman\'s "I am large. I contain multitudes."',
    counts: { replies: 1, reposts: 0, likes: 4 },
    lines: ['sibyl-zeta-1', 'sibyl-zeta-2'],
  },
  proof: {
    name: 'Amber 🌸', handle: 'shimmermathlabs.com', date: DATE, initials: 'A', color: VIOLET,
    reply: 'REPLY TO @zetaof1.bsky.social',
    text: 'i was gonna joke proof won\'t fit, but it does actually.\n\nζ(1) = 1 + ½ + (⅓ + ¼) + (⅕ + ⋯ + ⅛) + ⋯\n\neach bracket has twice as many terms as the last, each at least half as large as its last term. more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, so every block adds ≥ ½. infinitely many halves → ∞. □',
    counts: { replies: 1, reposts: 0, likes: 8 },
    lines: ['amber-fits', 'amber-brackets', 'amber-adds', 'amber-infinity'],
  },
}
/** the clause cut from the voice, shown as posted on the brackets (`tag-k`) */
const TAG = '… more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …'
const CLAUSE = ['more', 'simply:', 'block', 'k', 'has', '2ᵏ', 'terms,', 'each', '≥', '1/2ᵏ⁺¹,']
const SYMBOLS = ['ζ(1)', '=', '1', '+', '½', '+', '(⅓', '+', '¼)', '+', '(⅕', '+', '⋯', '+', '⅛)', '+', '⋯']

// ---------------------------------------------------------------- the channel's boxes (stage units)
const BOXCAM = { x: 1000, y: 560, zoom: 1 }
const R = (x, y, w, h) => ({ x, y, w, h })
const lerpR = (a, b, u) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), w: lerp(a.w, b.w, u), h: lerp(a.h, b.h, u) })
const BOX = {
  chart: { larry: R(28, 62, 290, 290), davidcrespo: R(336, 62, 290, 290) },
  quote: { larry: R(20, 62, 200, 170), davidcrespo: R(228, 62, 200, 170), moultano: R(436, 62, 200, 170) },
  call: { larry: R(150, 40, 300, 196), amber: R(490, 40, 300, 196), zeta: R(830, 40, 300, 196) },
  read: { larry: R(24, 40, 240, 156), amber: R(24, 300, 240, 156), zeta: R(290, 24, 966, 530) },
}
const CARD = {
  chart: { x: 656, y: 62, w: 600 },
  quote: { x: 656, y: 56, w: 600 },
  call: { x: 340, y: 352, w: 600 },
  zeta: { x: 333, w: 880 },
}

/** place a puppet so its head fills a stage rect, clipped to it */
function inBox(r, look = 'camera') {
  const z = BOXCAM.zoom
  const scale = (r.h * 0.8) / (TILE * z)
  const sx = r.x + r.w / 2, sy = r.y + r.h * 0.46
  return { x: BOXCAM.x + (sx - 640) / z, y: BOXCAM.y + (sy - 360) / z, scale, look, z: 8, floor: null, clip: r, fx: { kind: 'monitor' } }
}

// ---------------------------------------------------------------- the studio floor (world units)
const ZETA = { x: 1622, y: 500, size: 100 }
const PILE_X = 1775 // in front of the desk, where the anchor sits
const WALL = -140
const H = 160 // the bar for 1
const BW = 40, PITCH = 45
const SW = 200 // a slab's width on the pile; its height is H/2
const SLAB_H = H / 2

const PLACE = {
  larry: (look = 'camera') => ({ ...MARKS.desk, scale: 1, look, z: 5, floor: null, seat: 760 }),
  amber: (look = 'camera') => ({ x: 1330, y: 602, scale: 1, look, z: 4, floor: null, seat: 790 }),
}
function band(look = 'right') {
  const out = {}
  for (const id of ['hy', 'al', 'pete', 'dee']) {
    const m = MARKS.band[id]
    out[id] = { x: m.x, y: m.y, scale: 0.92, look, z: id === 'pete' ? 1 : 2, floor: m.floor, instrument: m.instrument }
  }
  return out
}

/** the word time of `text` (nth occurrence) in a line */
function wordAt(show, id, text, nth = 0) {
  const L = show.line(id)
  let k = 0
  for (const w of L?.words ?? []) if (w[2] === text && k++ === nth) return w[0]
  show._warn?.(`no word "${text}" in ${id}`)
  return Infinity
}

// ---------------------------------------------------------------- the proof, as a function of t
function buildProof(show) {
  const w = (id, text, nth) => wordAt(show, id, text, nth)
  const ticks = (a, b) => show.sfxList.filter((s) => s.name.startsWith('tick') && s.t0 >= a && s.t0 < b).map((s) => s.t0)
  // one tick per term, as the bars land: 1, ½, ⅓, ¼, ⅕, two over her dots, ⅛
  const T = ticks(show.at('bars'), show.at('brackets'))
  if (T.length !== 8) show._warn?.(`bars: ${T.length} ticks, expected 8`)
  const one = { x0: 1080, h: H, land: T[0], term: '1' }
  const g0 = { n: 1, x0: 1138, guide: H / 2, bars: [{ h: H / 2, land: T[1], term: '½' }] }
  const g1 = { n: 2, x0: 1196, guide: H / 4, bars: [{ h: H / 3, land: T[2], term: '⅓' }, { h: H / 4, land: T[3], term: '¼' }], open: T[2], close: T[3] }
  const g2 = {
    n: 4, x0: 1315, guide: H / 8,
    // her dots stay dots: one ⋯ under the two bars that stand over them
    bars: [{ h: H / 5, land: T[4], term: '⅕' }, { h: H / 6, land: T[5], term: '⋯', span: 2 }, { h: H / 7, land: T[6] }, { h: H / 8, land: T[7], term: '⅛' }],
    open: T[4], close: T[7],
  }
  const door = T[7] + 0.25
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

  // the pile: every slab lands on a tick, and the ticks get closer together
  const S = ticks(show.at('slabs'), Infinity)
  if (S.length < 6) show._warn?.(`slabs: ${S.length} ticks`)
  const slabs = show.at('slabs')
  const mk = (n, x0, arrive) => {
    const bars = []
    for (let j = 0; j < n; j++) bars.push({ h: H / (n + 1 + j), land: -Infinity })
    return { n, x0, guide: H / (2 * n), bars, arrive, late: true }
  }
  // as wide as the desk; in through the stage door, past the band; through the wall
  const g3 = mk(8, 1135, { from: 560, t0: slabs + 0.12, t1: slabs + 0.5 })
  const g4 = mk(16, 1490 - (16 * PITCH - 5), { from: DOOR.x1 - (16 * PITCH - 5), t0: S[1] - 0.05, t1: S[3] - 0.15, clip: DOOR.x0 })
  const g5 = mk(32, 1490 - (32 * PITCH - 5), { from: WALL - (32 * PITCH - 5), t0: S[2], speed: 1500, clip: WALL })
  Object.assign(g3, { press: S[3] - 0.5, pressDur: 0.24 })
  Object.assign(g4, { press: S[4] - 0.36, pressDur: 0.16 })
  Object.assign(g5, { press: S[5] - 0.26, pressDur: 0 })
  for (const g of [g3, g4, g5]) Object.assign(g, { form: g.press + g.pressDur, markA: g.press + g.pressDur + 0.03, markB: g.press + g.pressDur + 0.06 })
  const groups = [g0, g1, g2, g3, g4, g5]
  groups.forEach((g, i) => {
    g.cx0 = g.x0 + (g.n * PITCH - 5) / 2
    g.land = S[i]
    g.lift = i === 0 ? slabs - 0.1 : Math.max(g.form + 0.02, S[i] - (i < 3 ? 0.3 : 0.2))
  })
  // then the slabs nobody counts: one on every tick left, then on and on, as fast as the last
  const lands = groups.map((g) => g.land)
  for (let i = 6; i < S.length; i++) lands.push(S[i])
  const last = lands[lands.length - 1]
  for (let n = 1; n < 400; n++) lands.push(last + n * 0.15)
  return { one, groups, lands, dimT, door, T, tagT: show.at('tag-k'), tagEnd: S[0] }
}

/** where group g stands at t (its left edge) */
function groupX0(g, t) {
  const a = g.arrive
  if (!a) return g.x0
  if (a.speed) return Math.min(g.x0, a.from + Math.max(0, t - a.t0) * a.speed)
  const u = ease.outCubic(clamp((t - a.t0) / (a.t1 - a.t0)))
  return a.from + (g.x0 - a.from) * u
}
function pileCount(pr, t) {
  let n = 0
  while (n < pr.lands.length && pr.lands[n] <= t) n++
  return n
}
function pileTopSmooth(pr, t) {
  const n = pileCount(pr, t)
  let frac = 0
  if (n < pr.lands.length && n > 0) frac = clamp((t - pr.lands[n - 1]) / (pr.lands[n] - pr.lands[n - 1]))
  return FLOOR - SLAB_H * (n + frac)
}

// ---------------------------------------------------------------- the module
export default {
  title: 'Breaking News',
  cast: ['hy', 'al', 'pete', 'dee'],
  guests: ['davidcrespo', 'moultano', 'amber'],
  set: { chair: false },
  drift: false,
  defaultShot: 'bnNews',
  // from davidcrespo's first frame to the end
  disclaimer: { text: 'Guests are puppets playing posting personas. Parody.', from: 'card-chart', dur: 90 },

  setup(show) {
    const ctx = document.createElement('canvas').getContext('2d')
    for (const p of Object.values(POSTS)) {
      p.tokens = tokenize(p.text)
      p.times = timing(p.tokens, show, p.lines)
    }
    // her line of symbols lights term by term as the bars land; her last dots when the door opens
    this.proof = buildProof(show)
    const pt = POSTS.proof.tokens
    const s0 = pt.findIndex((tk, i) => SYMBOLS.every((c, j) => pt[i + j]?.s === c))
    if (s0 < 0) show._warn?.('the line of symbols is not on her card')
    const T = this.proof.T
    const when = [T[0], T[0], T[0], T[1], T[1], T[2], T[2], T[3], T[3], T[4], T[4], T[5], T[5], T[7], T[7], this.proof.door, this.proof.door]
    when.forEach((t0, j) => (POSTS.proof.times[s0 + j] = { t0, t1: t0 + 0.25 }))
    const c0 = pt.findIndex((tk, i) => CLAUSE.every((c, j) => pt[i + j]?.s === c))
    if (c0 < 0) show._warn?.('the cut clause is not on her card')
    this.clause = new Set(CLAUSE.map((_, j) => c0 + j))
    this.square = pt.length - 1

    // cards, laid out once
    const img = { ar: 1160 / 1538 }
    this.cards = {
      chart: layoutCard(ctx, POSTS.chart, { w: CARD.chart.w, textSize: 19, image: { ...img, maxH: 270 } }),
      revenue: layoutCard(ctx, POSTS.revenue, { w: CARD.quote.w, textSize: 19, quote: { post: POSTS.chart, o: { small: true, textSize: 14, image: { ...img, maxH: 130 } } } }),
      call: layoutCard(ctx, POSTS.call, { w: CARD.call.w, textSize: 19 }),
      zeta: layoutCard(ctx, POSTS.zeta, { w: CARD.zeta.w, textSize: 20 }),
      proof: layoutCard(ctx, POSTS.proof, { w: 640, textSize: 19 }),
      proofSmall: layoutCard(ctx, POSTS.proof, { w: 324, textSize: 12, small: true }),
    }
    this.headline = layoutHeadline(ctx, show.line('larry-news').words)

    this.dropZeta = wordAt(show, 'larry-ask', 'zeta')
    this.handleT = wordAt(show, 'amber-call', '@zetaof1.bsky.social,')
    this.shineT = wordAt(show, 'amber-call', 'time')
    this.gotT = wordAt(show, 'amber-call', 'you')
    this.shrinkT = wordAt(show, 'amber-fits', 'it')
    this.stopT = wordAt(show, 'amber-infinity', '∞.')

    const S = show.SHOTS
    // the news: wide as the sting starts, pushing in to a medium on Larry by his first word
    S.bnNews = (s) => {
      const t = s.t
      const u = ease.inOutCubic(clamp((t - s.at('breaking-in')) / (s.at('larry-news') + 0.05 - s.at('breaking-in'))))
      const v = ease.inOutCubic(clamp((t - (s.at('banner-off') - 0.3)) / 0.75))
      const cam = { x: lerp(1000, 1712, u) - 110 * v, y: lerp(585, 648, u), zoom: lerp(0.64, 1.5, u) }
      return { cam, place: { larry: PLACE.larry('camera'), ...(u < 1 ? band('camera') : {}) }, audience: 1 - u }
    }
    // the channel's boxes: the camera never moves; who is in which box is set per frame
    S.bnBoxes = (s) => ({ cam: BOXCAM, place: this.boxPlace(s), audience: 0 })
    // Larry alone at the desk, closer than the news was
    S.bnSingle = () => ({ cam: { x: 1700, y: 600, zoom: 1.75 }, place: { larry: PLACE.larry('camera') }, audience: 0 })
    // the studio: the camera is set in direct()
    S.bnStudio = (s) => ({ cam: this.studioCam(s), place: { ...band('right'), amber: PLACE.amber('camera'), larry: PLACE.larry('camera') }, audience: this.studioAudience(s) })
  },

  /** which part of the segment t is in */
  phase(show, t) {
    if (t < show.at('card-chart')) return 'news'
    if (t < show.at('card-moultano')) return 'chart'
    if (t < show.at('clear')) return 'quote'
    if (t < show.at('call-card')) return 'ask'
    if (t < show.at('zeta-card')) return 'call'
    if (t < show.at('proof-card')) return 'read'
    return 'studio'
  },

  /** the boxes on screen at t: { id: { r, on } } */
  boxes(show, t) {
    const ph = this.phase(show, t)
    const out = {}
    const on = (cue) => clamp((t - show.at(cue)) / 0.3)
    if (ph === 'chart') {
      out.larry = { r: BOX.chart.larry, on: 1 }
      out.davidcrespo = { r: BOX.chart.davidcrespo, on: on('card-chart') }
    } else if (ph === 'quote') {
      const u = ease.inOutCubic(clamp((t - show.at('card-moultano')) / 0.4))
      out.larry = { r: lerpR(BOX.chart.larry, BOX.quote.larry, u), on: 1 }
      out.davidcrespo = { r: lerpR(BOX.chart.davidcrespo, BOX.quote.davidcrespo, u), on: 1 }
      out.moultano = { r: BOX.quote.moultano, on: clamp((t - show.at('card-moultano') - 0.4) / 0.3) }
    } else if (ph === 'call' || ph === 'read') {
      const u = ph === 'read' ? ease.inOutCubic(clamp((t - show.at('zeta-card')) / 0.7)) : 0
      out.larry = { r: lerpR(BOX.call.larry, BOX.read.larry, u), on: 1 }
      out.amber = { r: lerpR(BOX.call.amber, BOX.read.amber, u), on: on('call-card') }
      // the empty box: on "you got this" a slow push on it
      const push = ph === 'call' ? 1 + 0.08 * ease.inOutSine(clamp((t - this.gotT) / (show.at('zeta-card') - this.gotT))) : 1.08
      const c = BOX.call.zeta
      const grown = R(c.x, c.y, c.w * push, c.h * push)
      out.zeta = { r: lerpR(grown, BOX.read.zeta, u), on: clamp((t - this.handleT) / 0.15), empty: true }
    }
    return out
  },

  boxPlace(show) {
    const t = show.t
    const place = {}
    const B = this.boxes(show, t)
    const look = {
      larry: show.speaking('larry') ? 'camera' : this.phase(show, t) === 'chart' || this.phase(show, t) === 'call' ? 'right' : this.phase(show, t) === 'read' ? 'right' : 'camera',
      davidcrespo: 'camera', moultano: 'camera',
      amber: this.phase(show, t) === 'read' ? 'right' : 'camera',
    }
    for (const [id, b] of Object.entries(B)) if (!b.empty && b.on > 0) place[id] = inBox(b.r, look[id])
    return place
  },

  studioCam(show) {
    const t = show.t
    const pr = this.proof
    const at = (c) => show.at(c)
    const E = ease.inOutCubic
    const A = { x: 1170, y: 690, zoom: 1.25 } // on the card, Amber on the couch beside it
    const B = { x: 1330, y: 830, zoom: 0.95 } // a wide of the studio: the desk, the couch, the floor
    const C = { x: 1300, y: 838, zoom: 0.95 } // wide on the bars
    const D = { x: 1330, y: 862, zoom: 1.08 } // pushed toward the slabs
    const W = { x: 880, y: 640, zoom: 0.62 } // locked wide: the door, the band, the bars, the desk
    const END = { x: 1000, y: 577, zoom: 0.64 }
    const mixC = (a, b, u) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), zoom: lerp(a.zoom, b.zoom, u) })
    const trackEnd = pr.T[7] + 0.08
    const doorAt = trackEnd + 0.5
    const backToBars = at('amber-brackets') + 0.7
    if (t < at('bars')) return mixC(A, B, E(clamp((t - this.shrinkT) / 0.9)))
    if (t < trackEnd) return { x: lerp(1200, 1420, E(clamp((t - at('bars') - 0.1) / (trackEnd - at('bars') - 0.1)))), y: 830, zoom: 1.0 }
    if (t < backToBars) return mixC({ x: 1420, y: 830, zoom: 1.0 }, { x: 170, y: 780, zoom: 0.95 }, E(clamp((t - trackEnd) / (doorAt - trackEnd))))
    if (t < at('press')) return C
    if (t < at('slabs')) return mixC(C, D, ease.inOutSine(clamp((t - at('press')) / (at('slabs') - at('press')))))
    if (t < at('crane')) return W
    if (t < at('behind-the-pile')) {
      // the crane: after the top of the pile; on "infinity" it stops, short, and the pile goes on
      const t0 = at('crane')
      const tc = Math.min(t, this.stopT)
      const u = E(clamp((tc - t0) / 0.9))
      const zoom = lerp(W.zoom, 0.82, u)
      const chase = pileTopSmooth(pr, tc - 0.5) + 150 / zoom
      const y = Math.min(W.y, W.y + (chase - W.y) * clamp((tc - t0) / 0.6))
      return { x: lerp(W.x, PILE_X - 200, u), y, zoom }
    }
    return END
  },
  studioAudience(show) {
    const t = show.t
    if (t >= show.at('behind-the-pile')) return 1
    if (show.between('slabs', 'crane')) return 1
    if (show.between('crane', 'behind-the-pile')) return 1 - clamp((t - show.at('crane')) / 0.7)
    return 0
  },

  direct(t, show) {
    const ph = this.phase(show, t)
    const boxed = ph === 'chart' || ph === 'quote' || ph === 'call' || ph === 'read'
    if (ph === 'news') show.shot('bnNews')
    else if (boxed) show.shot('bnBoxes')
    else if (ph === 'ask') show.shot('bnSingle')
    else show.shot('bnStudio')
    // set flags are module state: assign every frame
    show.set.desk = !boxed
    show.set.couch = !boxed
    show.set.window = !boxed
    show.set.chair = false

    // the strap carries Larry's headline as its caption, lit word by word
    if (show.between('larry-news', 'cluster-reacts')) show.caption(null)

    const L = show.puppet('larry')
    const A = show.puppet('amber')
    if (ph === 'news') {
      L.lookAt('camera')
      // he watches the banner and the strap go
      if (show.since('banner-off') > 0) L.lookAt(0.5 * Math.PI).nod(-0.12 * clamp(show.since('banner-off') / 0.3))
    }
    if (ph === 'studio') {
      const pr = this.proof
      if (t < show.at('bars')) {
        L.lookAt(t > this.shrinkT ? 'amber' : 'camera')
        A.lookAt('camera')
      } else if (t < show.at('slabs')) {
        // both watch the floor between them
        L.lookAt('left').nod(-0.06)
        A.lookAt(show.speaking('amber') ? (t % 6 < 2.4 ? 'camera' : 'right') : 'right').nod(-0.08)
      } else {
        // the pile climbs past the desk top, the bow tie, and him; he watches it go
        const n = pileCount(pr, t)
        L.lookAt(2.0).nod(Math.min(0.4, Math.max(0, n - 2) * 0.08))
        A.lookAt('right').nod(Math.min(0.3, Math.max(0, n - 3) * 0.06))
      }
      for (const id of ['hy', 'al', 'pete', 'dee']) if (show.since('slabs') > 0) show.puppet(id).lookAt(show.since('slabs') > 1.2 ? 'right' : 'camera')
    }
  },

  drawBack(ctx, t, show) {
    const { draw, P } = show
    const ph = this.phase(show, t)
    if (ph === 'chart' || ph === 'quote' || ph === 'call' || ph === 'read') {
      backdrop(ctx, draw, P)
      const B = this.boxes(show, t)
      for (const [id, b] of Object.entries(B)) {
        if (b.on <= 0 && !b.empty) continue
        guestBox(ctx, b.r, b.on)
        if (b.empty) this.emptyBox(ctx, t, show, b)
        // the zeta hangs over Larry's shoulder in his box, from the moment he said it
        if (id === 'larry' && t >= this.dropZeta) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(b.r.x, b.r.y, b.r.w, b.r.h)
          ctx.clip()
          zetaSign(ctx, b.r.x + b.r.w * 0.17, b.r.y + b.r.h * 0.34, b.r.h * 0.38, 1, t)
          ctx.restore()
        }
      }
      return
    }
    if (ph === 'ask') {
      show.world(ctx, (c) => zetaSign(c, ZETA.x, ZETA.y, ZETA.size, (t - this.dropZeta) / 0.55, t))
      return
    }
    if (ph === 'studio') {
      show.world(ctx, (c) => {
        stageDoor(c, (t - this.proof.door) / 0.7, t)
        // the studio's left wall, and the hole the thirty-two makes in it
        const g5 = this.proof.groups[5]
        const k = clamp((t - g5.arrive.t0) / 0.2)
        const hole = [[WALL, FLOOR], [WALL + 14 * k, FLOOR - 40 * k], [WALL - 6 * k, FLOOR - 70 * k], [WALL + 18 * k, FLOOR - 110 * k], [WALL, FLOOR - 130 * k]]
        const wall = new Path2D()
        wall.moveTo(WALL, 420)
        wall.lineTo(WALL, FLOOR - 130 * k)
        draw.beam(c, wall, P.sky, 2, { alpha: 0.8 })
        if (k > 0) {
          draw.beamPts(c, hole, P.sky, 1.8, { alpha: 0.9, hot: true })
          const r = show.rng(5)
          const p = new Path2D()
          for (let i = 0; i < 12; i++) {
            const a = r.range(-1.4, 1.4), y0 = FLOOR - r.range(10, 120) * k
            const d = r.range(20, 80) * clamp((t - g5.arrive.t0) / 0.5)
            p.moveTo(WALL + 20 + Math.cos(a) * d, y0 + Math.sin(a) * d)
            p.lineTo(WALL + 26 + Math.cos(a) * d, y0 + Math.sin(a) * d + 4)
          }
          draw.beam(c, p, P.sky, 1.4, { alpha: 0.8 * (1 - clamp((t - g5.arrive.t0 - 1.2) / 0.8)) })
        }
      })
    }
  },

  /** the empty third box: dark until her handle, then the account plate under a follow spot */
  emptyBox(ctx, t, show, b) {
    const r = b.r
    const ph = this.phase(show, t)
    const lit = b.on
    if (lit <= 0) return
    const snap = 0.62
    const shine = clamp((t - this.shineT) / 0.3)
    const flash = Math.max(0, 1 - (t - this.handleT) / 0.25) * 0.5
    boxSpot(ctx, r, snap + (1 - snap) * shine + flash)
    // the plate stands in the spot until zetaof1's own card rises into the box
    const plateA = ph === 'read' ? 1 - clamp((t - show.at('zeta-card')) / 0.45) : 1
    if (plateA > 0) {
      ctx.save()
      ctx.globalAlpha = 1
      accountPlate(ctx, r.x + r.w / 2, r.y + r.h * 0.62, lit * plateA)
      ctx.restore()
    }
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    const ph = this.phase(show, t)

    // ---- the news frame: BREAKING and the strap, dropping out of the bottom on "chart"
    if (ph === 'news') {
      const inU = ease.outCubic(clamp((t - show.at('breaking-in')) / 0.35))
      const drop = ease.inCubic(clamp((t - show.at('banner-off')) / 0.32))
      const gone = drop >= 1
      if (!gone && inU > 0) {
        ctx.save()
        ctx.translate(-(1 - inU) * 1300, drop * 320)
        banner(ctx, 1, t)
        strapFrame(ctx, 1)
        // his sentence, then a wipe to THE CLUSTER REACTS
        const wipeT = show.at('cluster-reacts')
        const wx = 40 + 1200 * ease.inOutCubic(clamp((t - wipeT) / 0.4))
        ctx.save()
        ctx.beginPath()
        ctx.rect(wx, 0, 1400, 720)
        ctx.clip()
        headline(ctx, this.headline, t, show.puppet('larry').color, 1)
        ctx.restore()
        if (t >= wipeT) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(0, 0, wx, 720)
          ctx.clip()
          reacts(ctx, 1)
          ctx.restore()
          if (wx < 1240) draw.seg(ctx, wx, 502, wx, 584, P.white, 2, { hot: true })
        }
        ctx.restore()
      }
      return
    }

    // ---- the boxes: glass over the heads, the nameplates, the cards
    if (ph === 'chart' || ph === 'quote' || ph === 'call' || ph === 'read') {
      const B = this.boxes(show, t)
      for (const [id, b] of Object.entries(B)) {
        if (b.on <= 0 && !b.empty) continue
        if (!b.empty) guestGlass(ctx, b.r, b.on)
        else if (b.on <= 0) guestGlass(ctx, b.r, 1)
        if (b.empty) continue
        const c = show.CAST[id] ?? {}
        const color = show.puppet(id).color
        const pa = clamp(b.on * 1.4)
        plate(ctx, b.r.x - 6, b.r.y + b.r.h + 12, b.r.w + 12, { name: c.name ?? id, handle: c.guest ? c.handle : null, color, parody: !!c.guest }, pa)
      }
      this.drawBoxCards(ctx, t, show, B)
      return
    }

    // ---- the studio
    if (ph === 'studio') {
      show.world(ctx, (c) => this.drawProofPieces(c, t, show))
      // the tag: the clause cut from the voice, as posted, on the brackets
      const pr = this.proof
      const tagA = show.window(t, pr.tagT, pr.tagEnd, 0.2)
      if (tagA > 0) {
        const [sx] = show.toScreen(1300, 0)
        const [, sy] = show.toScreen(0, FLOOR - H - 40)
        const size = 20
        const tw = draw.labelWidth(ctx, TAG, { size, ls: 0.04 }) + 30
        const x = Math.max(350, Math.min(1260 - tw, sx - tw / 2))
        const y = sy - 40
        draw.box(ctx, x, y, tw, 40, { color: P.amber, cut: 6, width: 1.4, alpha: tagA, fillAlpha: 0.94 * tagA })
        draw.label(ctx, TAG, x + 15, y + 27, { size, color: P.amber, ls: 0.04, alpha: tagA })
      }
      this.openOut(ctx, t, show)
      const below = this.drawProofCard(ctx, t, show)
      // her nameplate in the studio, under her card's credit, through her first lines here
      const pa = show.window(t, show.at('proof-card') + 0.2, show.at('tag-k'), 0.3)
      if (pa > 0) {
        const c = show.CAST.amber
        plate(ctx, 12, below, 300, { name: c.name, handle: c.handle, color: VIOLET, parody: true }, pa)
      }
    }
  },

  /** the post cards in the boxes' layouts */
  drawBoxCards(ctx, t, show, B) {
    const ph = this.phase(show, t)
    const C = this.cards
    // davidcrespo's chart card, with a slow push while he says it
    if (ph === 'chart' || (ph === 'quote' && t < show.at('card-moultano') + 0.3)) {
      const out = ph === 'quote' ? clamp((t - show.at('card-moultano')) / 0.15) : 0
      const push = 1 + 0.035 * ease.inOutSine(clamp((t - show.at('dc-chart')) / (show.at('dc-chart.end') - show.at('dc-chart'))))
      const k = CARD.chart
      const L = C.chart
      drawCard(ctx, L, k.x + (L.w * (1 - push)) / 2, k.y + (L.h * (1 - push)) / 2, { t, times: POSTS.chart.times, appear: show.progress('card-chart', 0.4), alpha: 1 - out, scale: push, image: chartImg })
    }
    // moultano's card, davidcrespo's card set inside it as the post it quoted
    if (ph === 'quote') {
      const push = 1 + 0.03 * ease.inOutSine(clamp((t - show.at('mo-revenue')) / (show.at('mo-revenue.end') - show.at('mo-revenue'))))
      const k = CARD.quote
      const L = C.revenue
      drawCard(ctx, L, k.x + (L.w * (1 - push)) / 2, k.y + (L.h * (1 - push)) / 2, { t, times: POSTS.revenue.times, appear: show.progress(show.at('card-moultano') + 0.3, 0.4), scale: push, image: chartImg })
    }
    // her call, under her box
    if (ph === 'call' || (ph === 'read' && t < show.at('zeta-card') + 0.35)) {
      const out = ph === 'read' ? clamp((t - show.at('zeta-card')) / 0.35) : 0
      const k = CARD.call
      drawCard(ctx, C.call, k.x, k.y, { t, times: POSTS.call.times, appear: show.progress(show.at('call-card') + 0.1, 0.35), alpha: 1 - out })
    }
    // zetaof1's reply rises into the lit box
    if (ph === 'read') {
      const zb = B.zeta.r
      const u = ease.inOutCubic(show.progress('zeta-card', 0.8))
      const L = C.zeta
      const fx = CARD.zeta.x, fy = zb.y + (zb.h - L.h) / 2 + 6
      const s = lerp(0.2, 1, u)
      const px = zb.x + zb.w / 2, py = zb.y + zb.h * 0.8
      const x = lerp(px - (L.w * s) / 2, fx, u)
      const y = lerp(py - L.h * s, fy, u)
      drawCard(ctx, L, x, y, { t, times: POSTS.zeta.times, scale: s, appear: show.progress('zeta-card', 0.25), speakColor: show.puppet('sibyl').color })
    }
  },

  /** the lit box opening out into the whole studio */
  openOut(ctx, t, show) {
    const u = ease.inOutCubic(clamp((t - show.at('proof-card')) / 0.45))
    if (u >= 1) return
    const { draw, P } = show
    const hole = lerpR(BOX.read.zeta, R(-12, -12, 1304, 744), u)
    const bg = '#02050a'
    draw.occlude(ctx, draw.rectPath(0, 0, 1280, Math.max(0, hole.y)), bg)
    draw.occlude(ctx, draw.rectPath(0, hole.y + hole.h, 1280, 720), bg)
    draw.occlude(ctx, draw.rectPath(0, hole.y, Math.max(0, hole.x), hole.h), bg)
    draw.occlude(ctx, draw.rectPath(hole.x + hole.w, hole.y, 1280, hole.h), bg)
    draw.box(ctx, hole.x - 6, hole.y - 6, hole.w + 12, hole.h + 12, { color: P.blueMid, radius: 8, width: 1.6, fill: null })
    // the other two boxes slide out to the left, empty
    for (const r of [BOX.read.larry, BOX.read.amber]) {
      const rr = { ...r, x: r.x - 320 * u }
      guestBox(ctx, rr, 0)
    }
  },

  /** her proof: full size, then small at the left edge to the end, with its credit and label */
  drawProofCard(ctx, t, show) {
    const { draw, P } = show
    const C = this.cards
    const big = C.proof, small = C.proofSmall
    const u = ease.inOutCubic(clamp((t - this.shrinkT) / 0.75))
    const tagUp = t >= show.at('tag-k')
    const tagNow = t >= show.at('tag-k') && t < this.proof.tagEnd
    const sq = show.at('square')
    const d = {
      t,
      times: POSTS.proof.times,
      lit: (i) => (tagUp && this.clause.has(i) ? 1 : 0),
      forcedColor: tagNow ? P.amber : P.white,
      glow: (i) => (i === this.square && t >= sq ? 0.55 + 0.45 * Math.max(0, 1 - (t - sq) / 0.6) : 0),
    }
    const appear = show.progress('proof-card', 0.3)
    const B = { x: 40, y: 40 }
    const Sx = 12, Sy = 12
    let rect
    if (u < 1) {
      // the full-size card shrinking toward the small card's place; the small one fades in over it
      const s = lerp(1, small.w / big.w, u)
      const x = lerp(B.x, Sx, u), y = lerp(B.y, Sy, u)
      const outA = 1 - clamp((u - 0.35) / 0.3), inA = clamp((u - 0.62) / 0.33)
      if (outA > 0) drawCard(ctx, big, x, y, { ...d, appear, scale: s, alpha: outA })
      if (inA > 0) drawCard(ctx, small, Sx, Sy, { ...d, alpha: inA })
      rect = { x, y, w: big.w * s, h: lerp(big.h * s, small.h, clamp((u - 0.35) / 0.6)) }
    } else {
      // "cut to her card": on her square, the card fills the left of the frame for a moment
      const close = show.between('square', 'behind-the-pile')
      const s = close ? 1.85 : 1
      drawCard(ctx, small, Sx + (close ? 12 : 0), Sy, { ...d, scale: s })
      rect = { x: Sx + (close ? 12 : 0), y: Sy, w: small.w * s, h: small.h * s }
    }
    // the credit, and the one glance label, under the card wherever it is
    const a = appear
    const cy = rect.y + rect.h + 8
    draw.occlude(ctx, draw.rectPath(rect.x, cy, 300, 66), '#000', 0.92 * a)
    // the credit names an account: never under the caption bar
    if (a > 0.05) draw.protect(ctx, rect.x, cy, 300, 66)
    draw.label(ctx, 'PROOF AS POSTED BY', rect.x + 6, cy + 15, { size: 12, color: P.blueMid, ls: 0.16, alpha: a })
    draw.label(ctx, '@shimmermathlabs.com', rect.x + 6, cy + 33, { size: 15, color: VIOLET, ls: 0.04, alpha: a })
    const txt = 'ZETA AT 1 · NOT THE HYPOTHESIS'
    const lw = draw.labelWidth(ctx, txt, { size: 12, ls: 0.12 }) + 16
    draw.box(ctx, rect.x + 4, cy + 41, lw, 22, { color: P.amber, cut: 4, width: 1.1, alpha: a })
    draw.label(ctx, txt, rect.x + 12, cy + 56, { size: 12, color: P.amber, ls: 0.12, alpha: a })
    return cy + 70
  },

  /** bars, brackets, guides, counts, terms and slabs (world units) */
  drawProofPieces(c, t, show) {
    const { draw, P } = show
    const pr = this.proof
    const termO = { size: 24, color: mix2(VIOLET), align: 'center', weight: 'm', ls: 0 }
    // the bar for 1: it stays, the measure every slab is half of
    if (t >= pr.one.land) {
      const drop = (1 - clamp((t - pr.one.land) / 0.18)) * 140
      bar(c, pr.one.x0, BW, FLOOR - pr.one.h - drop, FLOOR - drop)
      if (t < show.at('slabs')) draw.label(c, '1', pr.one.x0 + BW / 2, FLOOR + 30, termO)
    }
    pr.groups.forEach((g, gi) => {
      const x0 = groupX0(g, t)
      const span = g.n * PITCH - 5
      const cx = x0 + span / 2
      const pressU = gi === 5 || !(g.pressDur > 0) ? (t >= g.press && gi !== 5 ? 1 : 0) : ease.inOutCubic(clamp((t - g.press) / g.pressDur))
      const lateA = gi === 5 ? 1 - clamp((t - g.form - 1.1) / 0.4) : 1
      const widenF = ease.outCubic(clamp((t - g.form) / 0.25))
      const widen = ease.outCubic(clamp((t - g.lift) / 0.2))
      const formed = t >= g.form
      const clipX = g.arrive?.clip
      if (clipX !== undefined) {
        c.save()
        c.beginPath()
        c.rect(clipX, -5000, 10000, 10000)
        c.clip()
      }
      const visible = g.arrive ? t >= g.arrive.t0 : true
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
            const px = bx + (cx - BW / 2 - bx) * pressU
            const py = FLOOR - j * g.guide * pressU
            bar(c, px, BW, py - g.guide, py, { width: g.n > 8 ? 1 : 1.6 })
            if (gi < 3) ghost(c, bx, BW, FLOOR - b.h, FLOOR - g.guide, 1)
          }
        })
      }
      // the "at least": what stood above the guides stays, dim
      if (gi < 3 && formed) g.bars.forEach((b, j) => ghost(c, g.x0 + j * PITCH, BW, FLOOR - b.h, FLOOR - g.guide, 1))
      // the terms, under their bars as she wrote them, until the group is pressed
      if (gi < 3 && t < g.form) {
        g.bars.forEach((b, j) => {
          if (!b.term || t < b.land) return
          const bx = x0 + j * PITCH + ((b.span ?? 1) * PITCH - 5) / 2
          draw.label(c, b.term, bx, FLOOR + 30, termO)
        })
      }
      // her brackets
      if (g.open !== undefined) {
        const fade = 1 - clamp((t - g.form) / 0.4)
        if (t >= g.open) bracketSide(c, x0 - 8, -1, FLOOR, 72, VIOLET, fade * clamp((t - g.open) / 0.12))
        if (t >= g.close) bracketSide(c, x0 + span + 8, 1, FLOOR, 72, VIOLET, fade * clamp((t - g.close) / 0.12))
      } else if (g.late && visible) {
        bracketPair(c, x0 - 8, x0 + span + 8, FLOOR, 96, VIOLET, gi === 5 ? lateA : 1 - clamp((t - g.form) / 0.4), 2)
      }
      // the counts, 1 2 4, under each group in turn
      if (g.count !== undefined && t >= g.count && t < Math.min(g.lift, show.at('slabs'))) {
        const pop = 1 + 0.5 * Math.max(0, 1 - (t - g.count) / 0.25)
        draw.label(c, String(g.n), cx, FLOOR + 66, { size: 26 * pop, color: P.amber, align: 'center', weight: 'm', ls: 0 })
      }
      // the guide: at half the last bar of the group before
      if (g.guideT !== undefined && t >= g.guideT && t < g.form + 0.3) {
        const u = clamp((t - g.guideT) / 0.3)
        const a = 1 - clamp((t - g.form) / 0.3)
        draw.seg(c, x0 - 14, FLOOR - g.guide, x0 - 14 + (span + 28) * u, FLOOR - g.guide, P.amber, 1.6, { alpha: a, dash: [6, 4] })
      }
      if (clipX !== undefined) c.restore()

      // the slab: formed where its group stood, lifted onto the pile, flashing as it lands
      if (formed) {
        const target = FLOOR - SLAB_H * gi
        let sx = gi === 5 ? Math.max(200, Math.min(1300, groupX0(g, g.form) + span - 220)) : cx
        let sy = FLOOR
        const w = BW + (64 - BW) * widenF + (SW - 64) * widen
        if (t >= g.lift) {
          const u = clamp((t - g.lift) / (g.land - g.lift))
          const e = ease.inOutCubic(u)
          const arc = Math.sin(Math.PI * u) * (gi < 3 ? 120 + 40 * gi : 60)
          sx = sx + (PILE_X - sx) * e
          sy = sy + (target - sy) * e - arc
        }
        const mark = t >= g.markB ? 2 : t >= g.markA ? 1 : 0
        const flash = t >= g.land ? Math.max(0, 1 - (t - g.land) / 0.5) : 0
        const pop = gi === 5 ? ease.outBack(clamp((t - g.form) / 0.15)) : 1
        slab(c, sx, sy, w * pop, SLAB_H * pop, { pieces: g.n, mark, flash })
      }
    })
    // the slabs nobody counts: they fall from above onto the pile, and keep falling
    const viewTop = show.cam.y - 360 / show.cam.zoom - 100
    const viewBot = show.cam.y + 360 / show.cam.zoom + 100
    for (let i = 6; i < pr.lands.length; i++) {
      const land = pr.lands[i]
      if (t < land - 0.3) break
      const bottom = FLOOR - SLAB_H * i
      const fall = t < land ? Math.pow(clamp((land - t) / 0.3), 2) * 720 : 0
      const y = bottom - fall
      if (y < viewTop || y - SLAB_H > viewBot) continue
      slab(c, PILE_X, y, SW, SLAB_H, { pieces: 64, mark: 2, flash: t >= land ? Math.max(0, 1 - (t - land) / 0.3) * 0.6 : 0 })
    }
  },
}

/** the channel's dark backdrop and its faint grid, over the whole frame */
function backdrop(ctx, draw, P) {
  draw.occlude(ctx, draw.rectPath(0, 0, 1280, 720), '#02050a')
  for (let x = 20; x < 1280; x += 40) draw.seg(ctx, x, 0, x, 720, P.blueDim, 0.6, { alpha: 0.12 })
  for (let y = 20; y < 720; y += 40) draw.seg(ctx, 0, y, 1280, y, P.blueDim, 0.6, { alpha: 0.12 })
}
/** her colour, lightened for the terms under the bars */
function mix2(c) {
  return c === VIOLET ? '#d4c6ff' : c
}
