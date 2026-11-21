// made-pen-plotter-replies, "One Pen": the direction. It opens the episode.
//
// The picture is the studio's own sketch of @samantha.wiki's pen plotter, seen from above: one sheet
// on a gridded bed, a gantry across it, one pen in a holder, small blue lettering in full-width rows,
// replies run together with // between them, an empty ruled box at the foot (production/research/
// media-notes.md). It is labelled STUDIO SKETCH. Of the replies on it only the two this segment
// reads are legible (ver.ooo's handle, Sophie's handle and her reply); everything else on the page is
// a pen scribble that cannot be read: ver.ooo's own reply (song lyrics) is never on screen.
//
// The open (the owner's note, 21 November 2026): during Pete's hum `in-hum` the pen writes the show's
// title, The Late Cluster, on the top line of the blank sheet, one letter to each sixteenth of the
// hum and the pen up for each space. Then (the owner's second note) the pen is carried away and the
// handwriting becomes the show's official title, the studio's own logo (stage/chrome.js `logo`), on
// Sibyl's line: the words travel to the logo's places, a bright line runs along them and leaves the
// official lettering behind it, and "with Larry Nx" is drawn the same way on her "with Larry"
// (drawTitleMorph). The title is the show's own writing on the studio's sketch, so the maker's credit
// is not on screen until `host`; at `host` the sheet is blank again.
//
// The pen's pace is one letter a sixteenth at 120 bpm (0.125 s), timed from Pete's beat lines in
// cues.json. The page is a pure function of t: what is written and where the pen is come from the
// line timings, never from state.
//
// The shots (chosen in shotAt() by cue):
//   0 → host            the sheet fills the frame; the pen writes the title; Sibyl says it off screen
//   host → ver-in       Larry at the desk, the blank sketch in the panel; the invitation's card; 88 REPLIES · 1 PEN
//   ver-in → meow-card  ver.ooo in the chair, Larry at the desk, the page above them; two cards on the left
//   meow-card → end     Sibyl at the stand, Larry at the desk, the pen writes the meow; OW × n; the maker's reply
//
// The credit (PEN PLOTTER BY @samantha.wiki, stream.place/samantha.wiki) is on every frame from `host`.

import { logo } from '@late-cluster/show/stage/chrome.js'
import { mix } from '@late-cluster/show/kit/draw.js'

const INK = '#5f93ff'      // the pen's blue
const RAIL = '#8fa7c4'     // the machine
const SHEET = '#0b1622'    // the sheet: dark, so the additive ink reads on it

// ---- the page, in page units (a landscape sheet, 297 × 210)
const PG = { w: 297, h: 210, ml: 16, mr: 281, top: 22, rh: 6.6, ts: 5.2, ls: 0.06 }
const rowY = (r) => PG.top + r * PG.rh

// ---- the show's title, as the pen writes it in the open (the show's own words)
const TITLE = 'The Late Cluster'
const TT = { size: 22, y: 44, ls: 0.06 }     // letter size and baseline, page units

// ---- the words that are ever legible on the page (each a single string, as shown)
const MEOW = 'meowowowowowowowowowow MROW'                                    // Sophie's reply, whole
const H_VER = '@ver.ooo'
const H_SOPHIE = '@sophie.engineering'
const SEP = '//'

// ---- the cards (each card's shown text is one string literal, exactly the post or its marked cut)
const CARDS = {
  invite: {
    name: 'Samantha', handle: 'samantha.wiki', time: '14 Nov, 20:02 UTC', initials: 'S',
    text: '… Reply to this post and my pen plotter will write it on paper …',
    replies: 88, reposts: 10, likes: 83,
  },
  youreUp: {
    name: 'Samantha', handle: 'samantha.wiki', time: '14 Nov, 20:18 UTC', initials: 'S',
    reply: 'REPLYING TO @ver.ooo',
    text: "you're up 👀",
    replies: 1, reposts: 0, likes: 2,
  },
  suspense: {
    name: 'ver.ooo 🗿', handle: 'ver.ooo', time: '14 Nov, 20:21 UTC', initials: 'V', color: '#6f9bff',
    reply: 'REPLYING TO @samantha.wiki',
    text: '😬 the suspense while it tracks back to the left side',
    replies: 0, reposts: 0, likes: 2,
  },
  meow: {
    name: 'Sophie', handle: 'sophie.engineering', time: '14 Nov, 21:07 UTC', initials: 'S', color: '#b48cff',
    reply: 'REPLYING TO @samantha.wiki',
    text: 'meowowowowowowowowowow MROW',
    replies: 1, reposts: 0, likes: 3,
  },
  nothingLess: {
    name: 'Samantha', handle: 'samantha.wiki', time: '14 Nov, 21:08 UTC', initials: 'S',
    reply: 'REPLYING TO @sophie.engineering',
    text: 'I expected nothing less ❤️',
    replies: 0, reposts: 0, likes: 2,
  },
}

// ---- where things are on screen
const PANEL_ROOM = { x: 404, y: 72, w: 852, h: 206 }   // the page above Larry and his guest
const COL = { x: 18, w: 372 }                           // the cards' column in the room shots
const SHEET_FULL = { x: 0, y: 0, w: 1280, h: 720 }

// the room shot: Larry at his desk screen-right, the chair (guest) or the stand (Sibyl) screen-left
const ROOM_CAM = { x: 1507, y: 522, zoom: 1.25 }
const ROOM = {
  larry: { x: 1790, y: 548, scale: 1, z: 5, floor: null, seat: 760 },
  verooo: { x: 1475, y: 588, scale: 1, z: 4, floor: null, seat: 800 },
  sibyl: { x: 1470, y: 545, scale: 1, z: 4, floor: 960, instrument: 'stand' },
}
// the sheet shot: the page fills the frame
const SHEET_CAM = { x: 1000, y: 560, zoom: 1 }
const screenOf = (cam, p) => [(p.x - cam.x) * cam.zoom + 640, (p.y - cam.y) * cam.zoom + 360]

const clamp01 = (v) => Math.max(0, Math.min(1, v))
const lerp = (a, b, u) => a + (b - a) * u
const smooth = (u) => { u = clamp01(u); return u * u * (3 - 2 * u) }
const STEP = 0.125

export default {
  title: 'One Pen',
  guests: ['verooo'],
  defaultShot: 'pp-sheet',
  disclaimer: { text: 'Guests are puppets playing posting personas. Parody.', from: 'ver-in', dur: 6 },

  setup(show) {
    const { draw } = show
    const mc = document.createElement('canvas').getContext('2d')
    const W = (s) => draw.labelWidth(mc, s, { size: PG.ts * 10, ls: PG.ls }) / 10
    this.W = W
    const WT = (s) => draw.labelWidth(mc, s, { size: TT.size * 10, ls: TT.ls }) / 10
    this.WT = WT
    // the title sits centred on the sheet's top line
    this.titleX = (PG.w - WT(TITLE)) / 2

    // ---- the shots
    show.SHOTS['pp-sheet'] = () => ({
      cam: { ...SHEET_CAM },
      place: {},
      audience: 0,
      set: { desk: false, chair: false, couch: false, sign: false, crow: false, eKey: false },
    })
    show.SHOTS['pp-room'] = (s, o = {}) => {
      const left = o.left ?? 'sibyl'
      return {
        cam: { ...ROOM_CAM },
        place: { larry: { ...ROOM.larry, look: left }, [left]: { ...ROOM[left], look: 'larry' } },
        audience: 0,
        set: { couch: false, chair: left !== 'sibyl', dim: 0.52 },
      }
    }

    // ---- the page's rows, laid out once: a row is a list of pieces { g: [x0, x1] } (scribble) or { s, x } (legible)
    const rnd = show.rng('pp-scribble')
    const scribble = (x0, x1) => {
      // words of pen marks that cannot be read: a wavy trace per word, gaps between words
      const words = []
      let x = x0
      while (x < x1 - 2) {
        const len = Math.min(x1 - x, 4 + rnd() * 15)
        const pts = []
        const ph = rnd() * 6, amp = 0.8 + rnd() * 0.6
        for (let u = 0; u <= len; u += 0.85) pts.push([x + u, -PG.ts * 0.3 + Math.sin(u * 2.3 + ph) * amp + Math.sin(u * 5.1 + ph * 2) * 0.45])
        words.push({ x0: x, x1: x + len, pts })
        x += len + 2.4
      }
      return words
    }
    const gap = 2.4
    const row = (pieces) => {
      let x = PG.ml
      const out = []
      for (const p of pieces) {
        if (p.s !== undefined) {
          out.push({ s: p.s, x })
          x += W(p.s) + gap
        } else {
          const x1 = p.g === 'fill' ? PG.mr : Math.min(PG.mr, x + p.g)
          out.push({ g: [x, x1], words: scribble(x, x1) })
          x = x1 + gap
        }
      }
      return { pieces: out, end: x - gap }
    }
    const R = []
    for (let r = 0; r <= 4; r++) R[r] = row([{ g: 'fill' }])
    R[5] = row([{ g: 128 }, { s: SEP }, { s: H_VER }, { g: 'fill' }])   // earlier replies, as scribble; then ver.ooo's reply
    for (let r = 6; r <= 10; r++) R[r] = row([{ g: 'fill' }])
    R[11] = row([{ g: 34 }, { s: SEP }, { s: H_SOPHIE }])
    this.meowX = R[11].end + gap
    this.rows = R

    // the meow: one letter a step from the first syllable
    this.meowT0 = show.line('meow').t0
    // the title: one letter a step from the hum's first beat
    this.titleT0 = show.line('in-hum').t0
    this.titleT1 = show.line('in-hum').t1

    // ---- the handwriting becomes the show's official title (the owner's note): the studio's own
    // logo (stage/chrome.js), set where the written words go. Timed on Sibyl's words:
    //   glide  from just after she starts to "Late": the two written words travel and resize to the
    //          places of THE LATE and CLUSTER in the logo
    //   sweep  "Late" to the end of "Cluster,": a bright line runs along the words, left to right,
    //          and behind it the handwriting is the official lettering
    //   sub    "with" to the end of "Larry": with Larry Nx is drawn in the same way under CLUSTER
    // The title is whole and still from there to `host`.
    const words = show.line('title').words ?? []
    const wt = (re, k = 0, d) => words.find((w) => re.test(w[2]))?.[k] ?? d
    const tt0 = show.at('title')
    this.morph = {
      g0: tt0 + 0.05,
      g1: wt(/^Late/, 0, tt0 + 0.55) + 0.15,
      s1: wt(/^Cluster/, 1, tt0 + 1.3),
      w0: wt(/^with/, 0, tt0 + 1.6),
      w1: wt(/^Larry/, 1, tt0 + 2.1),
    }
    // the logo's own geometry, as chrome.js lays it out (centred, CLUSTER's baseline at yC)
    const ls = 1.3, cxL = 640, yC = 330
    const big = 104 * ls
    const wC = draw.labelWidth(mc, 'CLUSTER', { size: big, weight: 'm', ls: 0.06 })
    const x0 = cxL - wC / 2
    const subR = x0 + wC - 4 * ls
    const wSub = draw.labelWidth(mc, 'with Larry Nx', { size: 40 * ls, ls: 0.06 })
    this.LG = {
      s: ls, cx: cxL, yC, x0, x1: x0 + wC + 8,
      top: yC - big * 1.06 - 30 * ls * 1.2,
      cut: yC + 30 * ls,                                   // between the scan lines and with Larry Nx
      subL: subR - wSub - 12, subR: subR + 14, subB: yC + 86 * ls,
      the: { x: x0 + 4 * ls, y: yC - big * 0.92, size: 34 * ls, w: draw.labelWidth(mc, 'THE LATE', { size: 34 * ls, weight: 'm', ls: 0.62 }), color: show.P.sky },
      clu: { x: x0, y: yC, size: big, w: wC, color: show.P.gold },
    }
  },

  // ======================================================================= the timeline

  shotAt(t, show) {
    if (t < show.at('host')) return { name: 'pp-sheet', opts: {} }
    if (t < show.at('ver-in')) return { name: 'ots', opts: {} }
    if (t < show.at('meow-card')) return { name: 'pp-room', opts: { left: 'verooo' } }
    return { name: 'pp-room', opts: { left: 'sibyl' } }
  },

  /** which page: 'title' (the open), 'blank' (the invitation), 'ver' (20:18), 'meow' (21:07) */
  pageAt(t, show) {
    if (t < show.at('host')) return 'title'
    if (t < show.at('ver-in')) return 'blank'
    if (t < show.at('meow-card')) return 'ver'
    return 'meow'
  },

  /** the title's letters written at t (fractional: the pen inside a letter) */
  titleF(t) {
    return Math.max(0, Math.min(TITLE.length, (t - this.titleT0) / STEP))
  },

  /** the pen: { x, y } in page units, down 0..1, ts the letter size it writes */
  pen(t, show) {
    const page = this.pageAt(t, show)
    const W = this.W
    if (page === 'title') {
      // over the sheet from the first frame, at the T; down on the hum's first beat; up for each space; up at the end
      const WT = this.WT
      const F = this.titleF(t)
      const k = Math.min(TITLE.length, Math.floor(F)), f = F - k
      const x = this.titleX + WT(TITLE.slice(0, k)) + (k < TITLE.length ? f * (WT(TITLE.slice(0, k + 1)) - WT(TITLE.slice(0, k))) : 0)
      let down = smooth((t - (this.titleT0 - 0.12)) / 0.12)
      if (k < TITLE.length && TITLE[k] === ' ') down = Math.min(down, 1 - Math.sin(Math.PI * f))
      if (t >= this.titleT1) down = 1 - smooth((t - this.titleT1) / 0.12)
      // the title written, the pen lifts and the gantry carries it away off the top of the sheet
      const away = smooth((t - this.titleT1 - 0.12) / 0.6)
      return { x, y: lerp(TT.y, -60, away), down, ts: TT.size }
    }
    if (page === 'blank') {
      // Samantha's sheet, blank, the pen waiting at its top-left corner
      return { x: PG.ml, y: rowY(0), down: 0 }
    }
    if (page === 'ver') {
      // ver.ooo's reply: the pen runs out to the end of a line on the hum, lifts, and tracks back to the left
      const w0 = show.line('ver-write').t0, w1 = show.line('ver-write').t1
      const lift = show.at('ver-lift'), land = show.at('tick-1')
      const x9 = (f) => PG.ml + f * (PG.mr - PG.ml)
      if (t < w0) return { x: x9(0.7), y: rowY(9), down: 1 }
      if (t < lift) return { x: x9(lerp(0.7, 1, (t - w0) / (w1 - w0))), y: rowY(9), down: 1 }
      const u = clamp01((t - lift) / (land - lift))
      const e = show.ease.inOutSine(u)
      return { x: lerp(PG.mr, PG.ml, e), y: lerp(rowY(9), rowY(10), smooth((u - 0.8) / 0.2)), down: 1 - smooth((t - lift) / 0.12) }
    }
    // the meow
    const i = (t - this.meowT0) / STEP
    const n = MEOW.length
    if (i < 0) return { x: this.meowX, y: rowY(11), down: smooth((t - (this.meowT0 - 0.25)) / 0.2) }
    const k = Math.min(n, Math.floor(i)), f = Math.min(1, i - k)
    const x = this.meowX + W(MEOW.slice(0, k)) + (k < n ? f * (W(MEOW.slice(0, k + 1)) - W(MEOW.slice(0, k))) : 0)
    return { x, y: rowY(11), down: 1 - smooth((t - (show.line('meow').t1 + 0.25)) / 0.15) }
  },

  /** the page's viewport (stage rect) and view ({ cx, cy, s }: page point at its centre, px per unit) */
  viewAt(t, show) {
    const shot = this.shotAt(t, show)
    if (shot.name === 'pp-sheet') {
      // the open: the whole sheet, pushing in slowly towards the title as it is written
      // (the push is over when the last letter is down, so the sheet is still while the title changes)
      const u = smooth(t / this.titleT1)
      return { R: SHEET_FULL, cx: 148.5, cy: lerp(108, 92, u), s: lerp(3.0, 3.3, u) }
    }
    if (shot.name === 'ots') return { R: { x: 532, y: 76, w: 696, h: 446 }, cx: 148.5, cy: 100, s: 1.95 }
    // the room: the page above
    const page = this.pageAt(t, show)
    const R = PANEL_ROOM
    const fit = (x0, x1, y, smax) => ({ R, cx: (x0 + x1) / 2, cy: y, s: Math.min(smax, (R.w - 36) / (x1 - x0)) })
    if (page === 'ver') return { R, cx: 148.5, cy: 55, s: 2.6 }
    // the meow: close on the row as the pen writes it, the handle included
    const u = smooth((t - show.at('meow-card')) / 2)
    const sep = this.rows[11].pieces.find((p) => p.s === SEP).x
    const to = fit(sep - 4, this.meowX + this.W(MEOW) + 6, rowY(11) - 12, 3.6)
    return { R, cx: lerp(148.5, to.cx, u), cy: lerp(55, to.cy, u), s: lerp(2.6, to.s, u) }
  },

  // ======================================================================= direction

  direct(t, show) {
    const shot = this.shotAt(t, show)
    show.shot(shot.name, shot.opts)
    const V = this.viewAt(t, show)
    const pen = this.pen(t, show)
    const ox = V.R.x + V.R.w / 2 - V.cx * V.s, oy = V.R.y + V.R.h / 2 - V.cy * V.s
    const penS = [ox + pen.x * V.s, oy + pen.y * V.s]

    // a head looking at a stage point: an azimuth (0 = facing screen-right, π = facing left) and chin up
    const aim = (id, head, at, gain = 1, spread = Math.PI / 2 - 0.3) => {
      const az = Math.PI / 2 - Math.atan2((at[0] - head[0]) * gain, 320)
      show.puppet(id).lookAt(Math.max(Math.PI / 2 - spread, Math.min(Math.PI / 2 + spread, az))).nod(Math.max(0, Math.min(0.32, (head[1] - at[1]) / 800)))
    }
    const card = [COL.x + COL.w / 2, 200]

    if (shot.name === 'ots') {
      // Larry and the panel: he reads the card while it is being read, and talks to us otherwise
      show.puppet('larry').lookAt(show.between('invite-card', 'eighty-eight') ? 'right' : 'camera')
    }

    if (shot.name === 'pp-room') {
      const L = screenOf(ROOM_CAM, ROOM.larry)
      const left = shot.opts.left
      const G = screenOf(ROOM_CAM, ROOM[left])
      if (left === 'verooo') {
        // the guest is in, watching the pen; Larry reads from the card; when the pen runs and tracks back, every head follows it
        const penOn = show.since('ver-write') > -0.1
        if (penOn) {
          aim('verooo', G, penS)
          aim('larry', L, penS)
        } else {
          aim('verooo', G, penS, 0.6)
          if (show.between('youre-up-card', 'ver-write')) aim('larry', L, card)
          else show.puppet('larry').lookAt('verooo')
        }
        if (show.since('ver-lands') > 0.5) {
          show.puppet('larry').lookAt('verooo')
          show.puppet('verooo').lookAt('larry')
        }
      } else {
        // Sibyl at the stand: told to take it, she reads it in time with the pen; Larry reads the maker's
        // answer from its card; on the laugh that ends the segment they look out at us
        if (t < show.at('hand.end') + 0.2) {
          show.puppet('larry').lookAt('sibyl')
          show.puppet('sibyl').lookAt('larry')
        } else if (t < show.at('meow.end') + 0.3) {
          aim('sibyl', G, penS)
          aim('larry', L, penS)
        } else if (show.between('nothing-less-card', 'nothing-less.end')) {
          aim('larry', L, [card[0], 330])
          aim('sibyl', G, [card[0], 330])
        } else if (t < show.at('laugh-2') + 0.3) {
          show.puppet('larry').lookAt('sibyl')
          show.puppet('sibyl').lookAt('larry')
        } else {
          show.puppet('larry').lookAt('camera')
          show.puppet('sibyl').lookAt('camera')
        }
      }
    }

    // ---- lower thirds
    show.chyron('larry', { from: show.at('host') + 0.35, dur: 4.4 })
    show.chyron('verooo', { from: show.at('ver-in') + 0.4, to: 'youre-up-card' })
    show.chyron('verooo', { from: show.at('suspense') - 0.1, to: show.at('ver-lands') + 0.6 })
    show.chyron('sibyl', { from: show.at('hand') + 0.2, to: show.at('meow') - 0.1 })
  },

  // ======================================================================= drawing

  drawBack(ctx, t, show) {
    const shot = this.shotAt(t, show)
    const { draw } = show
    if (shot.name === 'pp-sheet') draw.occlude(ctx, draw.rectPath(0, 0, 1280, 720))
    this.drawPage(ctx, t, show)
  },

  drawPage(ctx, t, show) {
    const { draw, P } = show
    const V = this.viewAt(t, show)
    const { R, s } = V
    const ox = R.x + R.w / 2 - V.cx * s, oy = R.y + R.h / 2 - V.cy * s
    const X = (x) => ox + x * s, Y = (y) => oy + y * s
    const page = this.pageAt(t, show)
    const pen = this.pen(t, show)
    const full = R === SHEET_FULL

    if (!full) draw.occlude(ctx, draw.rectPath(R.x, R.y, R.w, R.h))
    ctx.save()
    ctx.beginPath()
    ctx.rect(R.x, R.y, R.w, R.h)
    ctx.clip()

    // the bed: a grid under and around the sheet
    const grid = new Path2D()
    for (let gx = -30; gx <= PG.w + 30; gx += 10) { grid.moveTo(X(gx), Y(-24)); grid.lineTo(X(gx), Y(PG.h + 24)) }
    for (let gy = -20; gy <= PG.h + 20; gy += 10) { grid.moveTo(X(-34), Y(gy)); grid.lineTo(X(PG.w + 34), Y(gy)) }
    draw.beam(ctx, grid, P.blueDim, 0.8, { alpha: 0.35 })
    // the sheet, held at its corners
    const sheet = draw.rectPath(X(0), Y(0), PG.w * s, PG.h * s)
    draw.occlude(ctx, sheet, SHEET)
    draw.beam(ctx, sheet, '#c8d6ea', 1.3, { alpha: 0.55 })
    for (const [cx, cy] of [[0, 0], [PG.w, 0], [0, PG.h], [PG.w, PG.h]]) {
      draw.box(ctx, X(cx - 5), Y(cy - 5), 10 * s, 10 * s, { color: RAIL, width: 1.1, alpha: 0.6, fill: '#05090e' })
    }
    // the empty ruled box at the foot of the page
    draw.box(ctx, X(PG.ml), Y(172), (PG.mr - PG.ml) * s, 26 * s, { color: '#c8d6ea', width: 1, alpha: 0.35, fill: null })
    for (let k = 1; k <= 3; k++) draw.seg(ctx, X(PG.ml + 4), Y(172 + k * 6.5), X(PG.mr - 4), Y(172 + k * 6.5), '#c8d6ea', 0.7, { alpha: 0.18 })

    // the ink
    const size = PG.ts * s
    const inkW = Math.max(0.8, s * 0.32)
    const text = (str, x, y, o = {}) => draw.label(ctx, str, X(x), Y(y), { size, color: o.color ?? INK, ls: PG.ls, alpha: o.alpha ?? 0.95 })
    const scrib = (piece, y, upTo = Infinity) => {
      for (const w of piece.words) {
        if (w.x0 >= upTo) break
        const pts = []
        for (const [px, py] of w.pts) { if (px > upTo) break; pts.push([X(px), Y(y + py)]) }
        if (pts.length > 1) draw.beamPts(ctx, pts, INK, inkW, { alpha: 0.7 })
      }
    }
    const drawRow = (r, upTo = Infinity) => {
      for (const p of this.rows[r].pieces) {
        if (p.s !== undefined) { if (p.x < upTo) text(p.s, p.x, rowY(r)) }
        else scrib(p, rowY(r), upTo)
      }
    }
    if (page === 'title') {
      // the show's title, a letter as the pen reaches the middle of it
      const n = Math.min(TITLE.length, Math.floor(this.titleF(t) + 0.5))
      // from the glide on, the handwriting is drawn by drawFront (it travels into the official title)
      if (n > 0 && t < this.morph.g0) draw.label(ctx, TITLE.slice(0, n), X(this.titleX), Y(TT.y), { size: TT.size * s, color: INK, ls: TT.ls, alpha: 0.95 })
    } else if (page === 'ver') {
      for (let r = 0; r <= 8; r++) drawRow(r)
      drawRow(9, pen.x)
    } else if (page === 'meow') {
      // in the room the panel shows only whole rows, and keeps a clear band at its top for the STUDIO
      // SKETCH tag: a row whose top would reach into that band is not drawn (no handle is ever cut off)
      const band = R === PANEL_ROOM ? R.y + 40 : -Infinity
      for (let r = 0; r <= 11; r++) if (Y(rowY(r) - PG.ts - 0.6) >= band) drawRow(r)
      const n = Math.max(0, Math.min(MEOW.length, Math.floor((t - this.meowT0) / STEP + 0.45)))
      if (n > 0) text(MEOW.slice(0, n), this.meowX, rowY(11))
    }

    // the machine: side rails, the gantry across at the pen, the carriage and the pen in its holder
    const pts = pen.ts ?? PG.ts
    const gy = pen.y - pts - 9
    draw.seg(ctx, X(-16), Y(-24), X(-16), Y(PG.h + 24), RAIL, 1.6, { alpha: 0.7 })
    draw.seg(ctx, X(PG.w + 16), Y(-24), X(PG.w + 16), Y(PG.h + 24), RAIL, 1.6, { alpha: 0.7 })
    const gantry = draw.rectPath(X(-22), Y(gy - 4), (PG.w + 44) * s, 6 * s)
    draw.occlude(ctx, gantry, '#05090e', 0.92)
    draw.beam(ctx, gantry, RAIL, 1.4, { alpha: 0.85 })
    draw.seg(ctx, X(-22), Y(gy - 1), X(PG.w + 22), Y(gy - 1), RAIL, 0.8, { alpha: 0.4 })
    const lift = 1 - pen.down
    const cw = 13, ch = 10
    const carriage = draw.rectPath(X(pen.x - cw / 2), Y(gy - 6), cw * s, ch * s)
    draw.occlude(ctx, carriage, '#05090e')
    draw.beam(ctx, carriage, P.bsky, 1.5, { alpha: 0.95, hot: true })
    // the holder and the pen's body down to its tip (up: a little off the paper, drawn larger and fainter)
    const tipX = pen.x + lift * 1.2, tipY = pen.y - pts * 0.3 - lift * 1.6
    draw.seg(ctx, X(pen.x - 2.2), Y(gy + 4), X(tipX - 0.6), Y(tipY - 1.2), P.bsky, 1.4, { alpha: 0.9 })
    draw.seg(ctx, X(pen.x + 2.2), Y(gy + 4), X(tipX + 0.6), Y(tipY - 1.2), P.bsky, 1.4, { alpha: 0.9 })
    draw.ring(ctx, X(tipX), Y(tipY), (1.3 + lift * 1.4) * s, P.bsky, 1.2, { alpha: 0.85 - lift * 0.3 })
    if (pen.down > 0.5) draw.dot(ctx, X(pen.x), Y(pen.y - pts * 0.3), Math.max(1.6, 0.55 * s), '#cfe0ff', 1)
    ctx.restore()

    // the frame and the label: this is the studio's sketch
    if (!full) draw.box(ctx, R.x, R.y, R.w, R.h, { color: P.sky, width: 1.3, alpha: 0.7, fill: null, corners: 18 })
    // in the room with the guest the page's legible handle is near the top, so the tag sits bottom-left there
    const low = R === PANEL_ROOM && page === 'ver'
    const tx = R.x + (full ? 24 : 12), ty = low ? R.y + R.h - 34 : R.y + (full ? 22 : 12)
    draw.box(ctx, tx, ty, 132, 22, { color: P.amber, cut: 4, width: 1.1, fillAlpha: 0.85 })
    draw.label(ctx, 'STUDIO SKETCH', tx + 10, ty + 16, { size: 12, color: P.amber, ls: 0.22 })
  },

  /** the written words travel into the logo's places, then a bright line runs along them and turns them into the logo */
  drawTitleMorph(ctx, t, show) {
    const { draw, P } = show
    const M = this.morph, LG = this.LG
    const V = this.viewAt(t, show)
    const ox = V.R.x + V.R.w / 2 - V.cx * V.s, oy = V.R.y + V.R.h / 2 - V.cy * V.s
    const srcSize = TT.size * V.s
    const src = [
      { s: 'The Late', x: ox + this.titleX * V.s, w: this.WT('The Late') * V.s, to: LG.the },
      { s: 'Cluster', x: ox + (this.titleX + this.WT('The Late ')) * V.s, w: this.WT('Cluster') * V.s, to: LG.clu },
    ]
    const srcY = oy + TT.y * V.s
    const u = show.ease.inOutCubic(clamp01((t - M.g0) / (M.g1 - M.g0)))
    // the sweep: left of xs is the official title, right of it the handwriting
    const sw = clamp01((t - M.g1) / (M.s1 - M.g1))
    const xs = lerp(LG.x0 - 12, LG.x1 + 12, sw)
    const sub = clamp01((t - M.w0) / (M.w1 - M.w0))
    const xsub = lerp(LG.subL, LG.subR, sub)

    // the handwriting, where it has not been swept yet
    if (sw < 1) {
      for (const w of src) {
        ctx.save()
        if (sw > 0) {
          ctx.beginPath()
          ctx.rect(xs, 0, 1280 - xs, 720)
          ctx.clip()
        }
        // down first, then across, so the two words never cross
        const uy = show.ease.inOutCubic(clamp01((t - M.g0) / ((M.g1 - M.g0) * 0.6)))
        const ux = show.ease.inOutCubic(clamp01((t - M.g0 - (M.g1 - M.g0) * 0.3) / ((M.g1 - M.g0) * 0.7)))
        ctx.translate(lerp(w.x, w.to.x, ux), lerp(srcY, w.to.y, uy))
        ctx.scale(lerp(1, w.to.w / w.w, u), lerp(1, w.to.size / srcSize, u))
        draw.label(ctx, w.s, 0, 0, { size: srcSize, color: mix(INK, w.to.color, u * 0.6), ls: TT.ls, alpha: 0.95 })
        ctx.restore()
      }
    }
    // the official title, where it has been swept (with Larry Nx by its own sweep)
    if (sw > 0) {
      ctx.save()
      const clip = new Path2D()
      clip.rect(0, 0, xs, LG.cut)
      if (sub > 0) clip.rect(0, LG.cut, xsub, 720 - LG.cut)
      ctx.clip(clip)
      logo(ctx, LG.cx, LG.yC, LG.s, { t, align: 'center' })
      ctx.restore()
    }
    // the bright line that does it
    if (sw > 0 && sw < 1) draw.seg(ctx, xs, LG.top, xs, LG.cut - 4, P.gold, 1.6, { hot: true, alpha: 0.9 })
    if (sub > 0 && sub < 1) draw.seg(ctx, xsub, LG.cut + 4, xsub, LG.subB, P.white, 1.4, { hot: true, alpha: 0.85 })
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    const shot = this.shotAt(t, show)

    // ---- the open: the handwritten title becomes the official one
    if (shot.name === 'pp-sheet' && t >= this.morph.g0) this.drawTitleMorph(ctx, t, show)

    // ---- cards
    const cardAt = (c, x, y, w, appear, o = {}) => {
      if (appear <= 0) return 0
      let top = y
      if (c.reply) {
        // a reply: what it replies to, and its date and time, on a black strip above the card
        const a = clamp01(appear * 2)
        draw.box(ctx, x, y - 2, w, 22, { color: c.color ?? P.bsky, cut: 4, width: 1, alpha: 0.5 * a, fillAlpha: 0.92 * a })
        draw.label(ctx, c.reply, x + 8, y + 13, { size: 11, color: P.sky, ls: 0.1, alpha: a })
        draw.label(ctx, c.time, x + w - 8, y + 13, { size: 11, color: P.sky, ls: 0.06, align: 'right', alpha: a })
        top += 24
      }
      return (top - y) + draw.skeetCard(ctx, {
        x, y: top, w, name: c.name, handle: c.handle, time: c.reply ? undefined : c.time, text: c.text, initials: c.initials,
        color: c.color ?? P.bsky, replies: c.replies, reposts: c.reposts, likes: c.likes, appear, textSize: o.textSize,
      })
    }
    const ap = (from) => clamp01((t - show.at(from)) / 0.45)

    if (shot.name === 'ots') {
      // the invitation, read from its card; then the count above it
      cardAt(CARDS.invite, 556, 330, 648, ap('invite-card'), { textSize: 20 })
      const q = show.since('queue-in')
      if (q > 0) {
        // a level tag in the count style: 88 REPLIES with the cue, 1 PEN with Larry's word "pen"
        const pen = show.line('eighty-eight').words?.find((w) => /^pen/i.test(w[2]))?.[0] ?? show.at('eighty-eight.end')
        const full = t >= pen
        const pop = show.pulse(t, full ? pen : show.at('queue-in'), 0.35)
        const a = clamp01(q / 0.3)
        const x = 916, y = 96, w = 296
        draw.box(ctx, x, y, w, 44, { color: P.gold, cut: 6, width: 1.4 + pop, hot: pop > 0.3, alpha: a, fillAlpha: a })
        draw.label(ctx, full ? '88 REPLIES · 1 PEN' : '88 REPLIES', x + 18, y + 31, { size: 24, color: P.gold, weight: 'm', ls: 0.12, alpha: a })
      }
    }
    if (shot.name === 'pp-room' && t < show.at('meow-card')) {
      const h = cardAt(CARDS.youreUp, COL.x, 72, COL.w, ap('youre-up-card'))
      cardAt(CARDS.suspense, COL.x, 72 + Math.max(h, 132) + 14, COL.w, ap('ver-lift'))
    }
    if (shot.name === 'pp-room' && t >= show.at('meow-card')) {
      // Sophie's reply and the maker's answer to it stay up to the end of the segment
      const h = cardAt(CARDS.meow, COL.x, 72, COL.w, ap('meow-card'))
      cardAt(CARDS.nothingLess, COL.x, 72 + Math.max(h, 132) + 14, COL.w, ap('nothing-less-card'))
      // OW × n: one on each ow, landing on ten
      const L = show.line('meow')
      const w = L.words ?? []
      let n = 0
      if (w.length) {
        if (t >= w[0][0] + (w[0][1] - w[0][0]) / 2) n++
        for (let k = 1; k <= 9 && k < w.length; k++) if (t >= w[k][0]) n++
      }
      if (n > 0) {
        const pop = show.pulse(t, show.at('tally'), 0.35)
        const x = PANEL_ROOM.x + PANEL_ROOM.w - 170, y = PANEL_ROOM.y + PANEL_ROOM.h - 58
        draw.box(ctx, x, y, 152, 44, { color: P.gold, cut: 6, width: 1.4 + pop, hot: pop > 0.3 })
        draw.label(ctx, `OW × ${n}`, x + 76, y + 31, { size: 24 + 4 * pop, align: 'center', color: P.gold, weight: 'm', ls: 0.12 })
      }
    }

    // ---- the credit, from `host` to the end: it slides in from the right edge (never while the pen writes the title)
    const cu = show.since('host')
    if (cu >= 0) {
      const slide = 360 * (1 - show.ease.outCubic(clamp01(cu / 0.4)))
      const cw = 330, cx = 1256 - cw + slide
      draw.box(ctx, cx, 12, cw, 46, { color: P.blueMid, cut: 5, width: 1, alpha: 0.55, fillAlpha: 0.82 })
      draw.label(ctx, 'PEN PLOTTER BY @samantha.wiki', 1244 + slide, 31, { size: 13, align: 'right', color: P.white, ls: 0.14 })
      draw.label(ctx, 'stream.place/samantha.wiki', 1244 + slide, 50, { size: 12, align: 'right', color: P.sky, ls: 0.08 })
    }
  },
}
