// interview-yonderdavid: the direction. Larry interviews a puppet of David (@yonderdavid.bsky.social).
// Every answer is one of David's posts, spoken by his puppet with its card up for exactly that line.
// Each card's text below is one string literal, identical to what is spoken (cuts marked with …),
// with David's display name, handle, the post's date (UTC) and its counts as recorded in
// production/sources.json. The members who asked are never named, shown or credited.
//
// The moments that need care:
// - guest-in: a cut to the two-shot. David is simply in the chair; his chyron (with PUPPET · PARODY)
//   and the episode's interview disclaimer come up at his first appearance. Nothing arrives.
//   The chyron stays up through the end of his first answer, and is up again for his second.
// - exchange 1: no board, no list of animals, no empty place, no sketch of the video. The picture
//   is David and his card. The synth's credit is a small tag while Larry says "four animals".
// - kazoo-pic: on the word "kazoo", a small drawn kazoo beside card 2, labelled ARTIST'S IMPRESSION
//   (it is the studio's drawing of a kazoo, of nothing David made).
// - parody / label-hold: cut to David on his first word, with card 3 (a REPLY) and his own chyron,
//   so the line is plainly his answer to the question Larry just asked. When the line ends, the
//   card goes and the camera pushes in once on his chyron's PUPPET · PARODY tag and holds there,
//   through the big laugh, to the segment's last frame (the segment ends here since the trim).
//   No caption, stamp, arrow, sting or reaction from anyone on screen.
//
// Every time below is keyed to a cue or a line of cues.json; the only numbers are short offsets.
//
// Preview: npm run dev -- 002-2026-w47, then /?seg=interview-yonderdavid
// Frames:  npm run shoot -- 002-2026-w47 interview-yonderdavid 5 15 41 48 58 62.5 64.5 66.3

import { chyron as drawChyron } from '@late-cluster/show/stage/chrome.js'
import { MARKS } from '@late-cluster/show/stage/shots.js'

const HANDLE = 'yonderdavid.bsky.social'

// The cards. `text` is exactly what is spoken in the line `line`, ellipses included. A card is up
// for its line and taken down by the next cut (`until`); card 2 stays up with the kazoo through the laugh.
const CARDS = [
  { line: 'very-well', until: 'good-question', tag: 'REPLY', date: 'SAT 14 NOV', replies: 7, reposts: 7, likes: 65,
    text: 'Very well, … so I can fix that. The cat voice sim joins a quartet and instruments that get their sound from physical models.' },
  { line: 'kazoo', until: 'same-thread', tag: 'REPLY', date: 'SUN 15 NOV', replies: 3, reposts: 0, likes: 11,
    text: '… The meow and yowl took some work and iteration against reference recordings. The original yowl sounded like a kazoo.' },
  // the post Larry reads from (read-copyright); it is not an answer, so it carries no REPLY tag
  { line: 'read-copyright', from: 'you-posted', fromWord: 6, panel: true, date: 'SUN 15 NOV', replies: 2, reposts: 1, likes: 4,
    text: "… it turns out that's still under copyright and covers aren't fair use. …" },
  { line: 'parody', until: 'label-hold', tag: 'REPLY', date: 'SUN 15 NOV', replies: 0, reposts: 0, likes: 1,
    text: 'I believe parody is considered transformative in the relevant sense.' },
]

// David framed on the left third of the picture, room for his card on the right
const DAVID_X = 360
const DAVID_ZOOM = 1.95
// the push on the label: seconds, and how much the label grows. At 2.6 the whole chyron
// (name, PUPPET · PARODY, title and handle) still fits across the frame and sits above the
// caption line, so the room's [LAUGHTER] caption never lands on it.
const PUSH = 1.0
const LABEL_K = 2.6

export default {
  guests: ['david'],
  defaultShot: 'desk',
  disclaimer: { text: 'An interview built from public posts. Every answer is a real post. David is a puppet playing a posting persona. Parody.', from: 'guest-in', dur: 7.5 },

  shots: [
    { at: 0, shot: 'desk' },
    { at: 'guest-in', shot: 'guest' },
    { at: 'very-well', shot: 'iyDavid' },
    { at: 'good-question', shot: 'desk' },
    { at: 'under-the-video', shot: 'guest' },
    { at: 'kazoo', shot: 'iyDavid' },
    { at: 'same-thread', shot: 'ots', who: 'larry', side: 'right' },
    { at: 'and-asked', shot: 'desk' },
    { at: 'parody', shot: 'iyDavid' },
  ],

  setup(show) {
    show.SHOTS.iyDavid = () => {
      const seat = { ...MARKS.chair, scale: 1, look: 'right', z: 4, floor: null, seat: 800 }
      return {
        cam: { x: seat.x + (640 - DAVID_X) / DAVID_ZOOM, y: seat.y + 64, zoom: DAVID_ZOOM },
        place: { david: seat },
        audience: 0,
        set: { desk: false },
      }
    }
    this.cards = CARDS
  },

  direct(t, show) {
    const larry = show.puppet('larry')
    const david = show.puppet('david')

    // the chyron (the cast entry adds PUPPET · PARODY): up at the guest's first appearance and
    // held through the whole of his first answer, so a clip of that answer says it is a parody;
    // up again for his second answer. (The third answer has its own drawn chyron, below.)
    if (t < show.at('under-the-video')) {
      // (it slides out over the 0.5 s before `to`: from the answer's last word to the cut)
      show.chyron('david', { from: 'guest-in', to: Math.max(show.at('very-well.end') + 0.5, show.at('good-question')) })
    } else {
      show.chyron('david', { from: show.at('kazoo') - 0.1, to: show.at('same-thread') })
    }

    // Larry: to camera for the intro and the dry line; to David when asking
    if (show.between('guest-in', 'very-well') || show.between('under-the-video', 'kazoo')) larry.lookAt('david')
    if (show.between('good-question', 'under-the-video')) larry.lookAt('camera').nod(-0.04)
    // reading from the card in the panel (screen-left of him), then back to the camera
    if (show.between('same-thread', 'and-asked')) larry.lookAt(show.between('read-copyright', 'read-copyright.end') ? 'left' : 'camera')
    // asking David, who is off to his left
    if (show.between('and-asked', 'parody')) larry.lookAt('left')

    // Larry's solo shots and the panel shots do not show an empty guest chair
    const solo = show.between(0, 'guest-in') || show.between('good-question', 'under-the-video') || show.between('same-thread', 'parody')
    show.set.chair = !solo
    show.set.couch = !solo

    // while a card shows the line being spoken, the card carries it (its words light as said)
    // (and for the caption's linger after it, unless someone else has started speaking)
    const last = show.lastLine()
    for (const c of CARDS) {
      const L = show.line(c.line)
      if (last?.id === c.line && t < L.t1 + 0.7) show.caption(null)
    }

    // the hold on the label: a push from the medium shot of David to the label, once, then held
    // to the segment's last frame
    if (show.since('label-hold') >= 0) {
      const u = show.ease.inOutCubic(show.progress('label-hold', PUSH))
      const z0 = DAVID_ZOOM, z1 = 2.2
      const zoom = Math.exp(show.lerp(Math.log(z0), Math.log(z1), u))
      const x0 = MARKS.chair.x + (640 - DAVID_X) / z0, x1 = MARKS.chair.x + (640 - 560) / z1
      const y0 = MARKS.chair.y + 64, y1 = MARKS.chair.y + (360 - 256) / z1
      show.camera({ x: show.lerp(x0, x1, u), y: show.lerp(y0, y1, u), zoom })
      show.caption(null)
    }
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    const color = show.puppet('david').color

    // the synth's credit while Larry says it comes with four animals (another developer's project)
    {
      const a = show.window(t, show.at('four'), show.at('four.end') + 0.6, 0.25)
      if (a > 0) {
        draw.occlude(ctx, draw.rectPath(880, 26, 360, 54), '#000', 0.8 * a)
        draw.box(ctx, 880, 26, 360, 54, { color: P.blueMid, cut: 6, width: 1, alpha: 0.7 * a })
        draw.label(ctx, 'CHIMERA VOCAL SYNTH', 896, 48, { size: 14, color: P.sky, ls: 0.18, alpha: a })
        draw.label(ctx, 'github.com/jamesondh/chimera-vocal-synth', 896, 68, { size: 12, color: P.blueMid, ls: 0.05, alpha: a })
      }
    }

    // the answer cards, each up for exactly its line
    for (const c of this.cards) {
      const L = show.line(c.line)
      const t0 = c.from ? show.line(c.from).words[c.fromWord][0] : L.t0 - 0.1
      // up for its line; `until` ends it on a cut (or, for the kazoo, holds it through the laugh)
      const t1 = c.until ? (c.line === 'kazoo' ? show.at(c.until) : Math.min(L.t1 + 0.35, show.at(c.until))) : L.t1 + 0.35
      if (t < t0 || t >= t1) continue
      const u = (t - t0) / 0.35
      let x = 640, y = 150, w = 600
      if (c.panel && show.panel) {
        w = show.panel.w - 70
        x = show.panel.x + 35
        y = show.panel.y + 140
      }
      if (c.tag) {
        draw.label(ctx, c.tag, x + 4, y - 14, { size: 13, color, ls: 0.3, alpha: show.clamp(u) })
      }
      const textSize = 24
      draw.skeetCard(ctx, {
        x, y, w,
        name: 'David', handle: HANDLE, time: c.date, initials: 'D', color,
        text: c.text, textSize, textColor: '#8a9bb0',
        replies: c.replies, reposts: c.reposts, likes: c.likes,
        appear: u,
      })
      if (u >= 1) lightWords(ctx, show, c.text, L, x, y, w, textSize)
    }

    // kazoo-pic: a small drawn kazoo beside card 2, on the word
    if (show.between('kazoo-pic', 'same-thread')) drawKazoo(ctx, show, 940, 470, show.since('kazoo-pic'))

    // parody → the hold: David's own chyron, drawn here so the camera can push in on it; it stays
    // up to the segment's last frame
    if (show.since('parody') >= 0) {
      const spec = { name: show.puppet('david').name, title: show.CAST.david.title, handle: show.CAST.david.handle, color, parody: true }
      const y = 478
      const inU = show.unlerp(show.at('parody') + 0.15, show.at('parody') + 0.75, t)
      const u = show.ease.inOutCubic(show.progress('label-hold', PUSH))
      // scale about the chyron's top-left corner (56, y in chrome.js), which travels to (-40, 382)
      const px = 56, py = y
      const K = 1 + (LABEL_K - 1) * u
      const qx = show.lerp(px, -40, u), qy = show.lerp(py, 382, u)
      ctx.save()
      ctx.translate(qx, qy)
      ctx.scale(K, K)
      ctx.translate(-px, -py)
      drawChyron(ctx, spec, inU, 0, y)
      ctx.restore()
    }

  },
}

/**
 * Light the card's words as they are said: the same wrap and positions as skeetCard (scale 1,
 * fully in), drawn white over the card's dimmer text. The card text's words match the line's words.
 */
function lightWords(ctx, show, text, L, x, y, w, size) {
  const { draw, P } = show
  const n = L.done ? Infinity : L.word + 1
  if (n <= 0) return
  const pad = 18, lh = size * 1.38
  const lines = text.split('\n').flatMap((para) => draw.wrapLabel(ctx, para, w - pad * 2 - 58, { size, ls: 0.04 }))
  let left = n
  lines.forEach((ln, i) => {
    if (left <= 0) return
    const toks = ln.split(' ')
    const part = toks.slice(0, left).join(' ')
    left -= toks.length
    draw.label(ctx, part, x + pad + 58, y + pad + 26 + (i + 1) * lh - lh * 0.25, { size, color: P.white, ls: 0.04 })
  })
}

/** a kazoo, drawn by the studio: a tube, a round turret on top; it pops in on the word */
function drawKazoo(ctx, show, cx, cy, age) {
  const { draw, P } = show
  const k = show.ease.outBack(show.clamp(age / 0.25))
  if (k <= 0) return
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(k, k)
  ctx.rotate(-0.12)
  const c = P.gold
  // body: a tube tapering from the wide open end (left) to the mouthpiece (right)
  const body = new Path2D()
  body.moveTo(-80, -24)
  body.lineTo(70, -11)
  body.quadraticCurveTo(84, -10, 86, 0)
  body.quadraticCurveTo(84, 10, 70, 11)
  body.lineTo(-80, 24)
  body.closePath()
  draw.occlude(ctx, body, '#000', 0.9)
  draw.beam(ctx, body, c, 2, { hot: true })
  const rim = new Path2D()
  rim.moveTo(-80, -24)
  rim.quadraticCurveTo(-92, 0, -80, 24)
  draw.beam(ctx, rim, c, 1.6)
  // the turret on top, with its round membrane cap seen from a little above
  const walls = new Path2D()
  walls.moveTo(-34, -20)
  walls.lineTo(-34, -40)
  walls.moveTo(0, -17)
  walls.lineTo(0, -40)
  draw.beam(ctx, walls, c, 1.8)
  const cap = new Path2D()
  cap.ellipse(-17, -40, 17, 6, 0, 0, Math.PI * 2)
  draw.beam(ctx, cap, c, 1.6, { hot: true })
  ctx.restore()
  draw.label(ctx, "ARTIST'S IMPRESSION", cx, cy + 58, { size: 12, align: 'center', color: P.blueMid, ls: 0.25, alpha: show.clamp(age / 0.3) })
}
