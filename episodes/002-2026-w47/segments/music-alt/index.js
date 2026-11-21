// Music (alternative): "Best We Can Doo-Wop". The direction, for script.js as rendered in cues.json.
//
// Preview: npm run dev -- 002-2026-w47, then /?seg=music-alt
// Frames:  npm run shoot -- 002-2026-w47 music-alt 3 8 10.2 13 15 ...
//
// Shape: Larry at the desk with Dave's post as a card beside him; the card slides small into the
// corner and the band stands in a line in front of the curtain, Hy nearest the desk, an empty
// music stand in front of them. DOO lands on the stand on Hy's note, WOP beside it on Dee's, with
// BEST WE CAN DO over them. The lights drop to one warm spot on Al, then widen to the band, swaying
// under a string of round bulbs while the camera drifts. Above them a row of tiles fills, one to a
// lead line: cat ears, the simulator's studio sketch, two wheels, a mug in outline (each a plain
// glyph and a credit; nothing is drawn of anyone's video, game or photo). On the hooks the camera
// comes down to the stand, and each card hops on its own syllable. The mug hops into the
// simulator's tile. On "ours-again" the cards grow to the tiles' size, all in one frame.
// The ending (to-desk to last-chord), staged plainly as written: a spot on Hy as he turns to the
// desk; a wide of the band and Larry, his own empty stand on the desk; DOO lands on it on his note;
// every bulb on at the key change; the hook sung to him, then to the lens, his DOO in the row. The
// button at the desk with DOO propped in front of him; Al and Dee lean in for the tag.
//
// Real words on screen: Dave's post (DAVE_TEXT and DAVE_LINK, exactly as posted, with display name,
// handle, date and counts; the record that went out is in production/sources.json), its four read words lit
// as Larry reads them. The four credits are string literals in ROW, exactly as the script gives
// them (each set on two lines under its tile). Nobody's puppet appears.

import { MARKS } from '@late-cluster/show/stage/shots.js'

// ---- the one real post, exactly as posted (at://did:plc:hovt6k22s64dq63jjmoyibk3/app.bsky.feed.post/3n2jrgrxtss2w)
const DAVE_TEXT = 'best i can do\n\npolyhedral coffee simulator'
const DAVE_LINK = 'polycoffee.9000ish.uk'
const DAVE = { name: 'Dave', handle: 'dave.9000ish.uk', color: '#d99a5b', date: '17 Nov 2026', text: DAVE_TEXT, link: DAVE_LINK, replies: 2, reposts: 4, likes: 20, lines: ['four-words'], reply: true }

// ---- the row of tiles: a plain glyph and the credit, exactly as the script gives it
const ROW = [
  { id: 'cat', cue: 'tile-cat', title: 'CAT VOICE', who: 'David · @yonderdavid.bsky.social', sub: 'with a chimera-vocal-synth quartet' },
  { id: 'coffee', cue: 'tile-coffee', title: 'POLYHEDRAL COFFEE SIMULATOR', who: 'Dave · polycoffee.9000ish.uk' },
  { id: 'wheelie', cue: 'tile-wheelie', title: 'WHEELIE GAME', who: 'cee · yard-shift.cee.wtf' },
  { id: 'mug', cue: 'tile-mug', title: 'MUG', who: 'Samantha · @samantha.wiki' },
]
const MUG_TAG = '+ MUG · ADDED BY DAVE'
const LABEL_WE = 'BEST WE CAN DO'
const LABEL_YOU = 'BEST YOU CAN DO'
const KEY_TAG = "NEW KEY · LARRY'S NOTE"

// the sung lead lines, drawn as lyrics while they are sung
const LYRICS = ['cat', 'coffee', 'wheelie', 'hook-1', 'mug', 'mug-too', 'hook-2', 'wop-hit', 'hook-3', 'hook-4']
// one-syllable sung lines whose card is their lyric (the caption bar is hidden for these too)
const CARD_SUNG = ['doo', 'wop', 'larry-doo']

// ---- geometry
const T = 124 // a tile, row units
const PITCH = 214 // tile centre to tile centre
const ROW_W = { x: 970, y: 175 } // the row's centre-top in world units (stage shots)
const STAND = { x: 970, y: 685 } // the band's music stand: the ledge's centre (world)
const LSTAND = { x: 1668, y: 700 } // Larry's stand on the desk (world)
const LINE = { pete: 790, dee: 910, al: 1030, hy: 1150 } // the band in a line, Hy nearest the desk
const HEAD_Y = 505

// colours
const WARM = '#ffcf7a'
const CREAM = '#f4ead8'
const RED = '#ff5a5a'
const BLOSSOM = '#ffb3d1'
const KETTLE = '#8d97ab'
const CARD_INK = '#fff3e0'

const clamp01 = (v) => Math.max(0, Math.min(1, v))

export default {
  cast: ['hy', 'dee', 'al', 'pete'],
  autoPanel: false,
  defaultShot: 'desk',
  set: { chair: false, couch: false },

  shots: [
    { at: 0, shot: 'ots' },
    { at: 'band-in', shot: 'altStage' },
    { at: 'only-host', after: -0.15, shot: 'altWide' },
    { at: 'desk', shot: 'desk', look: 'camera' },
    // the goodnight's last picture: the widest shot of the night, held under the applause
    { at: 'last-picture', shot: 'altLast' },
  ],

  setup(show) {
    // One Hy. Hy sings in a voice of its own (the cast id `hy-bass`, the owner's choice) and speaks
    // as `hy`; the studio drives a puppet by the line's cast id. So `hy-bass` wears Hy's look, both
    // stand on Hy's mark in every shot, and one of them is clipped to nothing (still placed, so its
    // head keeps turning with the other's and nothing jumps when they change over).
    show.defineLook('hy-bass', { ...show.puppet('hy').look })
    // the stage for this number: the band in a line in front of the curtain. The camera's moves
    // (down to the stand on the hooks, the sideways drift while they sway) are tweened from t here.
    show.SHOTS.altStage = (s) => {
      const t = s.t
      const down = s.smoothstep(s.at('ours'), s.at('ours') + 1.3, t) * (1 - s.smoothstep(s.at('tile-mug') - 0.9, s.at('tile-mug') + 0.1, t))
      const back = s.smoothstep(s.at('ours-again') - 0.1, s.at('ours-again') + 0.9, t)
      const drift = s.window(t, s.at('sway'), s.at('to-desk'), 1.5) * 26 * Math.sin((t - s.at('sway')) * 0.32)
      const cam = {
        x: 970 + drift,
        y: 470 + 150 * down + 14 * back,
        zoom: 1.15 + 0.4 * down - 0.08 * back,
      }
      const place = {}
      const sway = s.window(t, s.at('sway'), s.at('chord'), 0.8)
      const ph = s.musicState('doo-wop')
      for (const [id, x] of Object.entries(LINE)) {
        // all four sway together, a block beat (two beats of the song) each way
        const dx = sway * 9 * Math.sin(Math.PI * (ph?.beat ?? 0))
        place[id] = { x: x + dx, y: HEAD_Y, scale: 0.78, look: 'camera', z: 2, floor: 960 }
      }
      oneHy(s, place)
      return { cam, place, audience: 0.6, set: { chair: false, couch: false, window: false } }
    }
    // the ending, plainly: the band in its line and Larry at the desk, one frame
    show.SHOTS.altWide = () => {
      const place = {}
      for (const [id, x] of Object.entries(LINE)) place[id] = { x, y: HEAD_Y, scale: 0.78, look: 'larry', z: 2, floor: 960 }
      place.larry = { ...MARKS.desk, scale: 1, look: 'hy', z: 5, floor: null, seat: 760 }
      oneHy(show, place)
      return { cam: { x: 1310, y: 470, zoom: 0.86 }, place, audience: 0.5, set: { chair: false, couch: false } }
    }
    // the last picture: wider than the wide, everything in it, the band still swaying a little
    show.SHOTS.altLast = (s) => {
      const place = {}
      const u = Math.sin((s.t - s.at('last-picture')) * 1.6)
      for (const [id, x] of Object.entries(LINE)) place[id] = { x: x + 6 * u, y: HEAD_Y, scale: 0.78, look: 'camera', z: 2, floor: 960 }
      place.larry = { ...MARKS.desk, scale: 1, look: 'camera', z: 5, floor: null, seat: 760 }
      oneHy(s, place)
      return { cam: { x: 1330, y: 452, zoom: 0.78 }, place, audience: 0.7, set: { chair: false, couch: false } }
    }
  },

  direct(t, show) {
    const larry = show.puppet('larry')
    // Hy is two puppets on one mark (see setup): every direction to Hy goes to both
    const hys = [show.puppet('hy'), show.puppet('hy-bass')]
    const hy = { lookAt: (x) => (hys.forEach((p) => p.lookAt(x)), hy), nod: (x) => (hys.forEach((p) => p.nod(x)), hy), tilt: (x) => (hys.forEach((p) => p.tilt(x)), hy), bob: (x) => (hys.forEach((p) => p.bob(x)), hy) }
    const dee = show.puppet('dee'), al = show.puppet('al'), pete = show.puppet('pete')
    const band = [hy, dee, al, pete]

    // ---- the post: Larry glances at the card on its four words
    if (t < show.at('band-in')) {
      const F = show.line('four-words')
      larry.lookAt(t >= F.t0 - 0.25 && t < F.t1 + 0.15 ? 'right' : 'camera')
    }

    // ---- the ask, and the two syllables
    if (show.between('band-in', 'spot-al')) {
      for (const p of band) p.bob(false)
      // Larry speaks from the desk, off to the right: they listen that way
      const toDesk = show.between('band-in', 'card-doo') || show.between('anything-else', 'card-wop')
      hy.lookAt(toDesk ? 'right' : 'camera')
      dee.lookAt(show.since('card-wop') > -0.2 ? 'camera' : show.between('card-doo', 'anything-else') ? 'hy' : 'right')
      al.lookAt(show.between('card-doo', 'card-wop') ? 'hy' : show.since('card-wop') > 0 ? 'dee' : 'right')
      pete.lookAt(show.since('card-wop') > 0 ? 'dee' : 'right')
      if (show.since('card-wop') > 0.9) for (const p of [hy, al, pete]) p.lookAt('camera')
    }
    // ---- the song
    if (show.between('spot-al', 'chord')) for (const p of band) p.lookAt('camera')
    // the chord: held, and pleased with it
    if (show.between('chord', 'to-desk')) {
      const u = show.smoothstep(0, 0.6, show.since('chord'))
      band.forEach((p, i) => p.lookAt('camera').nod(0.08 * u).tilt((i % 2 ? -0.08 : 0.08) * u))
    }

    // ---- the ending: the question goes back to the desk
    if (show.between('to-desk', 'only-host')) {
      for (const p of band) p.bob(false)
      const turn = show.since('to-desk') > 0.2
      hy.lookAt(turn ? 'right' : 'camera')
      for (const p of [dee, al, pete]) p.lookAt(show.since('your-best') > 0.3 ? 'right' : 'camera')
    }
    if (show.between(show.at('only-host') - 0.2, 'key-change')) {
      // every head in the band turned to the desk; nothing moves
      for (const p of band) p.lookAt('larry').bob(false)
      larry.lookAt(show.between('only-host', 'only-host.end') ? 'camera' : 'hy')
      if (show.since('larry-doo') > 0) larry.nod(-0.05 * show.window(t, show.at('larry-doo'), show.at('larry-doo.end'), 0.2))
      if (show.between('work-with', 'work-with.end')) hy.nod(0.05)
    }
    if (show.between('key-change', 'desk')) {
      const toCam = show.since('to-camera') > -0.1
      for (const p of band) p.lookAt(toCam ? 'camera' : 'larry')
      larry.lookAt(show.since('last-chord') > 0 ? 'camera' : 'hy')
    }
    // ---- the button, and the tag
    if (show.since('desk') >= 0 && show.since('last-picture') < 0) {
      larry.lookAt('camera')
      const B = show.line('button')
      if (show.since('button.end') > 0) larry.nod(0.04 * show.window(t, B.t1, B.t1 + 0.9, 0.3))
      // Al from the left edge for "doo", Dee from the right for "wop"
      const aIn = show.window(t, show.at('tag-doo') - 0.2, show.at('tag-doo.end') + 0.35, 0.18)
      const dIn = show.window(t, show.at('tag-wop') - 0.2, show.at('tag-wop.end') + 0.4, 0.18)
      const c = show.cam
      const half = 640 / c.zoom
      if (aIn > 0) al.place({ x: c.x - half - 90 + 160 * aIn, y: 600, scale: 0.72, look: 'camera', z: 9, floor: null, seat: 820 }).tilt(0.3 * aIn).lookAt('larry')
      else al.hide()
      if (dIn > 0) dee.place({ x: c.x + half + 90 - 160 * dIn, y: 600, scale: 0.72, look: 'camera', z: 9, floor: null, seat: 820 }).tilt(-0.3 * dIn).lookAt('larry')
      else dee.hide()
    }

    // ---- the last picture: everyone to the lens; Larry says good night
    if (show.since('last-picture') >= 0) {
      for (const p of band) p.lookAt('camera')
      larry.lookAt('camera')
      const G = show.line('goodnight')
      larry.nod(-0.05 * show.window(t, G.t0, G.t1 + 0.6, 0.3))
    }

    // ---- the set: in the wide the row runs across the top, where ON AIR hangs (the APPLAUSE
    // sign's own overlay, at the top edge, is left clear: the row starts under it)
    if (show.between(show.at('only-host') - 0.15, 'desk') || show.since('last-picture') >= 0) show.set.onair = false
    else delete show.set.onair
    // in the last picture the sign would hang behind the row: the studio's small one at the top
    // edge shows the applause instead, clear of the row
    if (show.since('last-picture') >= 0) show.set.sign = false
    else delete show.set.sign

    // ---- captions: off while a lead line is drawn as a lyric, or a card is the sung syllable
    // (a card's syllable stays uncaptioned a little longer, until the next spoken line takes over)
    const talking = show.lines.some((l) => l.kind === 'say' && t >= l.t0 - 0.1 && t < l.t1 + 0.4)
    const sung = LYRICS.some((id) => {
      const l = show.line(id)
      return t >= l.t0 - 0.1 && t < l.t1 + 0.4
    }) || (!talking && CARD_SUNG.some((id) => {
      const l = show.line(id)
      return t >= l.t0 - 0.1 && t < l.t1 + 1.6
    }))
    if (sung) show.caption(null)
  },

  drawBack(ctx, t, show) {
    const { draw } = show
    // the string of round bulbs behind the band (only where the band stands)
    const onStage = show.layout && show.place.al && show.place.pete && !show.panel
    if (!onStage || (show.since('desk') >= 0 && show.since('last-picture') < 0)) return
    const lit = bulbs(t, show)
    if (lit <= 0.001) return
    show.world(ctx, (c) => {
      const x0 = 730, x1 = 1210, y0 = 392, sag = 46
      const yOf = (x) => y0 + sag * (1 - ((2 * (x - x0)) / (x1 - x0) - 1) ** 2)
      const pts = []
      for (let x = x0; x <= x1; x += 12) pts.push([x, yOf(x)])
      draw.beamPts(c, pts, '#b9a98c', 1.2, { alpha: 0.35 + 0.35 * lit })
      for (let i = 0; i < 11; i++) {
        const x = x0 + 22 + i * ((x1 - x0 - 44) / 10), y = yOf(x) + 12
        const flick = 0.85 + 0.15 * show.noise(t * 3 + i * 7, 5)
        draw.seg(c, x, yOf(x), x, y - 8, '#b9a98c', 1, { alpha: 0.5 })
        draw.ring(c, x, y, 8, WARM, 1.6, { alpha: 0.25 + 0.75 * lit, hot: lit > 0.6 })
        draw.dot(c, x, y, 4.5, WARM, lit * flick)
      }
    })
    // warm light on the band while the bulbs are up
    if (lit > 0.05) {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const [cx, cy] = show.toScreen(970, 470)
      const g = ctx.createRadialGradient(cx, cy, 30, cx, cy, 620)
      g.addColorStop(0, `rgba(255, 180, 90, ${0.1 * lit})`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 1280, 720)
      ctx.restore()
    }
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    const onStage = !!(show.layout && show.place.pete && show.place.al && !show.place.larry)
    const wide = !!(show.place.pete && show.place.larry)
    const last = wide && show.since('last-picture') >= 0
    const atDesk = !!(show.place.larry && !show.place.pete && !show.panel)

    // ---- the lights: one spot on Al; later one on Hy; a dim wait; everything up at the key change
    darkness(ctx, t, show)

    // ---- Dave's post: beside Larry, then small in the corner of the band's shot
    if (show.panel) {
      const appear = show.clamp((t - show.at('dave-card')) / 0.45)
      if (appear > 0) card(ctx, show, DAVE, { x: 560, y: 132, w: 640, appear, size: 30 })
    } else if (onStage && t < show.at('spot-al') + 0.4) {
      const go = show.ease.inOutCubic(show.clamp((t - show.at('band-in')) / 0.55))
      const out = show.clamp((t - show.at('spot-al')) / 0.35)
      const k = 1 - 0.58 * go
      ctx.save()
      ctx.translate(560 + (958 - 560) * go, 132 + (22 - 132) * go - out * 220)
      ctx.scale(k, k)
      card(ctx, show, DAVE, { x: 0, y: 0, w: 640, appear: 1, size: 30 })
      ctx.restore()
    }

    // ---- the band's stand, its cards, the row
    if (onStage || wide) {
      const k = show.cam.zoom
      const [sx, sy] = show.toScreen(STAND.x, STAND.y)
      drawStand(ctx, t, show, sx, sy, k * 1.0)
      // the row: in the stage shots it hangs above the band; in the wide it is set across the top
      const rowN = wide && !last ? 5 : 4
      const [rx, ry] = last ? [640, 58] : wide ? [640, 64] : show.toScreen(ROW_W.x, ROW_W.y)
      const rk = last ? 0.96 : wide ? 0.9 : k
      const bottom = drawRow(ctx, t, show, rx, ry, rk, rowN, { wide })
      // the lyrics, under the row (or high in the frame when the row is out of it)
      const ly = Math.max(84, bottom + 52)
      drawLyrics(ctx, t, show, ly)
      // NEW KEY · LARRY'S NOTE, a glance at the key change, over the desk
      const kt = show.window(t, show.at('key-change'), show.at('key-change') + 2.8, 0.25)
      if (wide && kt > 0) {
        const h = show.headOf('larry')
        if (h) {
          const w = draw.labelWidth(ctx, KEY_TAG, { size: 17, ls: 0.14, weight: 'm' }) + 26
          const y = h.crown[1] - 14
          draw.box(ctx, h.x - w / 2, y - 22, w, 32, { color: P.gold, cut: 5, width: 1.4, alpha: kt })
          draw.label(ctx, KEY_TAG, h.x, y, { size: 17, align: 'center', color: P.gold, weight: 'm', ls: 0.14, alpha: kt })
        }
      }
    }
    // ---- Larry's stand on the desk (from the wide) and his card
    if (wide && !last) {
      const [sx, sy] = show.toScreen(LSTAND.x, LSTAND.y)
      drawLarryStand(ctx, t, show, sx, sy, show.cam.zoom)
    }
    // ---- the last picture: his DOO propped on the desk, as at the button
    if (last) {
      const [sx, sy] = show.toScreen(LSTAND.x - 44, DESK_TOP + 6)
      syllableCard(ctx, show, sx, sy, 120 * show.cam.zoom * 0.62, 'DOO', { rot: -0.06 })
    }
    // ---- the button: DOO propped in front of him like a nameplate
    if (atDesk && show.since('desk') >= -0.05) {
      const [sx, sy] = show.toScreen(LSTAND.x - 44, DESK_TOP + 6)
      // the toast: on "week" the card tips toward the lens, the way a glass is raised, and sits back
      const W = show.line('happy-week')
      const wk = W.words?.[2]?.[0] ?? show.at('toast')
      const up = Math.sin(Math.PI * clamp01((t - wk + 0.12) / 0.9))
      const s = show.cam.zoom * 0.55 * (1 + 0.16 * up)
      syllableCard(ctx, show, sx, sy - 26 * up, 120 * s, 'DOO', { rot: -0.06 - 0.12 * up, alpha: 1, hot: up > 0.4 })
    }
  },
}

const DESK_TOP = 728

/** the window, round each of Hy's spoken lines, in which `hy` stands on the mark instead of `hy-bass` */
function hySpeaks(show, t) {
  for (const id of ['your-best', 'work-with']) {
    const l = show.line(id)
    // from the moment the last sung note has let go, to the moment the next sung line's breath begins
    const prev = show.lines.filter((x) => x.who === 'hy-bass' && x.t1 <= l.t0).at(-1)
    const next = show.lines.find((x) => x.who === 'hy-bass' && x.t0 >= l.t1)
    const a = prev ? (prev.t1 + l.t0) / 2 : l.t0 - 0.3
    const b = next ? Math.min(next.teleT0 ?? next.t0, (l.t1 + next.t0) / 2) : l.t1 + 0.3
    if (t >= a && t < b) return true
  }
  return false
}

/** put `hy` and `hy-bass` on Hy's mark in a shot's placements, one of them clipped to nothing */
function oneHy(show, place) {
  const spot = place.hy
  if (!spot) return
  const none = { x: -10, y: -10, w: 0, h: 0 }
  const speaking = hySpeaks(show, show.t)
  place.hy = { ...spot, ...(speaking ? {} : { clip: none }) }
  place['hy-bass'] = { ...spot, ...(speaking ? { clip: none } : {}) }
}

// =================================================================== the lights

/** how lit the bulbs are, 0..1 */
function bulbs(t, show) {
  const on = show.smoothstep(show.at('sway'), show.at('sway') + 0.8, t)
  const dim = show.smoothstep(show.at('to-desk'), show.at('to-desk') + 0.6, t)
  const all = show.smoothstep(show.at('key-change') - 0.03, show.at('key-change') + 0.08, t)
  return on * (1 - 0.85 * dim) + all * 0.85 * dim
}

/** the dark outside the spot: drawn over the set and the band, under the graphics */
function darkness(ctx, t, show) {
  let d = 0, who = null, r = 0
  // one warm spot on Al, widening on "sway"
  if (show.between('spot-al', show.at('sway') + 1.2)) {
    d = 0.93 * show.smoothstep(show.at('spot-al'), show.at('spot-al') + 0.3, t) * (1 - show.smoothstep(show.at('sway'), show.at('sway') + 1.2, t))
    who = 'al'
    r = 85 + 760 * show.smoothstep(show.at('sway'), show.at('sway') + 1.2, t)
  }
  // the bulbs dim to one spot: Hy, turning to the desk
  if (show.between('to-desk', 'key-change') && show.place.al && !show.place.larry) {
    d = 0.7 * show.smoothstep(show.at('to-desk'), show.at('to-desk') + 0.5, t)
    who = 'hy'
    r = 150
  }
  // the wait, in the wide: low light, no spot
  if (show.between(show.at('only-host') - 0.15, 'key-change') && show.place.larry && show.place.al) {
    d = 0.42 * (1 - show.smoothstep(show.at('key-change') - 0.03, show.at('key-change') + 0.08, t))
    who = null
  }
  if (d <= 0.001) return
  ctx.save()
  if (who) {
    const h = show.headOf(who) ?? (who === 'hy' ? show.headOf('hy-bass') : null)
    const [cx, cy] = h ? [h.x, h.y + h.size * 0.4] : [640, 360]
    const g = ctx.createRadialGradient(cx, cy, r * 0.75, cx, cy, r * 1.45 + 40)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, `rgba(0,0,0,${d})`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 1280, 720)
    // the warm pool of the spot
    ctx.globalCompositeOperation = 'lighter'
    const w = ctx.createRadialGradient(cx, cy, 10, cx, cy, r * 1.2)
    w.addColorStop(0, `rgba(255, 175, 80, ${0.16 * d})`)
    w.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = w
    ctx.fillRect(0, 0, 1280, 720)
  } else {
    ctx.fillStyle = `rgba(0,0,0,${d})`
    ctx.fillRect(0, 0, 1280, 720)
  }
  ctx.restore()
}

// =================================================================== the stand and its cards

/** the times a syllable is sung by the bass (or the lift's bass), for the cards' hops */
function hop(t, show, syl) {
  let best = 0
  for (const id of ['bass', 'lift-bass']) {
    const l = show.line(id)
    if (!l.words || t < l.t0 - 0.1 || t > l.t1 + 0.3) continue
    for (const w of l.words) {
      if (w[2] !== syl) continue
      const s = t - w[0]
      if (s >= 0 && s < 0.26) best = Math.max(best, Math.sin((s / 0.26) * Math.PI))
    }
  }
  return best
}

/** the band's music stand at stage (x, y) (the ledge's centre), with DOO and WOP and the label */
function drawStand(ctx, t, show, x, y, k) {
  const { draw, P } = show
  // the stand: a ledge, a tilted desk, a pole and three feet
  const deskW = 330 * k, deskH = 34 * k
  const pole = new Path2D()
  pole.moveTo(x, y + 6 * k)
  pole.lineTo(x, y + 260 * k)
  pole.moveTo(x, y + 250 * k)
  pole.lineTo(x - 60 * k, y + 310 * k)
  pole.moveTo(x, y + 250 * k)
  pole.lineTo(x + 60 * k, y + 310 * k)
  draw.beam(ctx, pole, '#9aa6bb', 1.6, { alpha: 0.85 })
  const desk = new Path2D()
  desk.moveTo(x - deskW / 2, y)
  desk.lineTo(x + deskW / 2, y)
  desk.lineTo(x + deskW / 2 - 10 * k, y - deskH)
  desk.lineTo(x - deskW / 2 + 10 * k, y - deskH)
  desk.closePath()
  draw.occlude(ctx, desk, '#000', 0.95)
  draw.beam(ctx, desk, '#9aa6bb', 1.6, { alpha: 0.9 })
  draw.seg(ctx, x - deskW / 2 - 4 * k, y + 4 * k, x + deskW / 2 + 4 * k, y + 4 * k, '#c9d3e4', 2.2, { alpha: 0.9 })

  // the cards: 80 wide, growing to the tiles' size on "ours-again"
  const grow = show.smoothstep(show.at('ours-again') - 0.1, show.at('ours-again') + 0.7, t)
  const cw = (82 + (T - 82) * grow) * k
  const gap = 14 * k
  const sylls = [
    { text: 'DOO', cue: 'card-doo', dx: -(cw + gap) / 2 },
    { text: 'WOP', cue: 'card-wop', dx: (cw + gap) / 2 },
  ]
  // hops on their own syllables from "ours" (the bass sings them on every root)
  const hopping = t >= show.at('ours') - 0.05
  for (const c of sylls) {
    const s = t - show.at(c.cue)
    if (s < -0.3) continue
    // lands from above
    const land = s < 0 ? show.ease.inQuad(clamp01((s + 0.3) / 0.3)) : 1
    const bounce = s >= 0 && s < 0.3 ? Math.sin((s / 0.3) * Math.PI) * 0.08 : 0
    const hp = hopping ? hop(t, show, c.text.toLowerCase()) : 0
    const cy = y - (1 - land) * 260 * k - bounce * 40 * k - hp * 22 * k
    syllableCard(ctx, show, x + c.dx, cy, cw, c.text, { alpha: land, hot: s >= 0 && s < 0.5 })
  }
  // the label over the two cards, a glance: BEST WE CAN DO, and later BEST YOU CAN DO
  const la = show.clamp((t - show.at('card-wop') - 0.25) / 0.4)
  if (la > 0) {
    const you = show.smoothstep(show.at('to-larry') - 0.1, show.at('to-larry') + 0.2, t)
    const text = you > 0.5 ? LABEL_YOU : LABEL_WE
    const size = Math.max(12, 16 * k)
    const ly = y - cw * 0.74 - 30 * k // clear of the cards' hops
    const w = draw.labelWidth(ctx, text, { size, ls: 0.16, weight: 'm' }) + 22
    draw.box(ctx, x - w / 2, ly - size - 6, w, size + 14, { color: P.magenta, cut: 4, width: 1.2, alpha: 0.85 * la })
    draw.label(ctx, text, x, ly, { size, align: 'center', color: you > 0.5 ? P.gold : P.white, weight: 'm', ls: 0.16, alpha: la })
  }
}

/** a plain card with one syllable on it, standing with its bottom edge at (x, y) */
function syllableCard(ctx, show, x, y, w, text, o = {}) {
  const { draw, P } = show
  const h = w * 0.74
  const a = o.alpha ?? 1
  ctx.save()
  ctx.translate(x, y)
  if (o.rot) ctx.rotate(o.rot)
  const path = draw.roundPath(-w / 2, -h, w, h, Math.max(3, w * 0.05))
  draw.occlude(ctx, path, '#0b0a08', a)
  draw.beam(ctx, path, CARD_INK, 1.8, { alpha: a, hot: o.hot })
  draw.label(ctx, text, 0, -h * 0.28, { size: w * 0.34, align: 'center', color: o.color ?? P.white, weight: 'm', ls: 0.08, alpha: a })
  ctx.restore()
  return h
}

/** Larry's stand on the desk: empty, then DOO on his note; the card goes up to the row on "to-camera" */
function drawLarryStand(ctx, t, show, x, y, k) {
  const { draw } = show
  const w = 150 * k
  const desk = new Path2D()
  desk.moveTo(x - w / 2, y)
  desk.lineTo(x + w / 2, y)
  desk.lineTo(x + w / 2 - 6 * k, y - 18 * k)
  desk.lineTo(x - w / 2 + 6 * k, y - 18 * k)
  desk.closePath()
  draw.seg(ctx, x, y, x, y + (DESK_TOP - LSTAND.y) * k, '#9aa6bb', 1.4, { alpha: 0.85 })
  draw.occlude(ctx, desk, '#000', 0.95)
  draw.beam(ctx, desk, '#9aa6bb', 1.4, { alpha: 0.9 })
  draw.seg(ctx, x - w / 2 - 3 * k, y + 3 * k, x + w / 2 + 3 * k, y + 3 * k, '#c9d3e4', 2, { alpha: 0.9 })
  const s = t - show.at('larry-card')
  if (s < -0.3) return
  // the card leaves for the row on "to-camera"
  const up = show.smoothstep(show.at('to-camera') - 0.1, show.at('to-camera') + 0.6, t)
  if (up >= 1) return
  const land = s < 0 ? show.ease.inQuad(clamp01((s + 0.3) / 0.3)) : 1
  const cw = 100 * k
  const cy = y - (1 - land) * 200 * k - up * 120
  syllableCard(ctx, show, x, cy, cw, 'DOO', { alpha: land * (1 - up), hot: s >= 0 && s < 0.6 })
}

// =================================================================== the row of tiles

/**
 * The row at stage (cx, top), scaled k, with n slots (the fifth is Larry's DOO in the wide).
 * Returns the stage y of the bottom of what is drawn (the credits), or top when nothing is.
 */
function drawRow(ctx, t, show, cx, top, k, n, o = {}) {
  const { draw, P } = show
  let bottom = top
  // the credits' type: in the stage shots it scales with the camera; in the wides (held long, the
  // last one the episode's final frame) it is set at a fixed, readable size, and the tiles are
  // spaced to fit the widest credit line
  const TT = { ls: 0.1, weight: 'm' }, TW = { ls: 0.03 }
  const sz = o.wide ? { title: 15, who: 14, sub: 12, gap: 19, sub2: 36 } : { title: 13.5 * k, who: 12.5 * k, sub: 10.5 * k, gap: 18 * k, sub2: 34 * k }
  let pitch = PITCH * k
  if (o.wide) {
    let widest = 0
    for (const r of ROW) {
      widest = Math.max(widest, draw.labelWidth(ctx, r.title, { size: sz.title, ...TT }), draw.labelWidth(ctx, r.who, { size: sz.who, ...TW }))
      if (r.sub) widest = Math.max(widest, draw.labelWidth(ctx, r.sub, { size: sz.sub, ...TW }))
    }
    pitch = Math.max(pitch, widest + 18)
  }
  const xs = (i) => cx + (i - (n - 1) / 2) * pitch
  const same = show.smoothstep(show.at('ours-again') - 0.1, show.at('ours-again') + 0.7, t)
  // where the mug copy is (it hops out of its tile into the simulator's)
  const mugGo = clamp01((t - show.at('mug-in') + 0.05) / 0.5)
  for (let i = 0; i < ROW.length; i++) {
    const r = ROW[i]
    const s = t - show.at(r.cue)
    if (s < 0) continue
    const pop = show.ease.outBack(clamp01(s / 0.4))
    const size = (r.id === 'mug' ? 0.66 + 0.34 * same : 1) * T * k
    const x = xs(i), y = top + (T * k - size) // smaller tiles sit on the row's baseline
    const tw = size * pop
    if (tw < 2) continue
    const bx = x - tw / 2, by = y + (size - tw)
    draw.box(ctx, bx, by, tw, tw, { color: P.sky, radius: 8 * k, width: 1.5, alpha: 0.9 })
    ctx.save()
    ctx.translate(bx, by)
    ctx.scale(tw / T, tw / T)
    glyph(ctx, show, r.id, t, { mugIn: r.id === 'coffee' ? mugGo : 0 })
    ctx.restore()
    // the credit: the thing on one line, the maker on the next (and the cat's small line)
    const ca = clamp01((s - 0.15) / 0.3)
    const maxW = pitch - 10
    const fit = (text, size, lo) => Math.min(size, (size * maxW) / Math.max(1, draw.labelWidth(ctx, text, { size, ...lo })))
    const ty = top + T * k + (o.wide ? 22 : 20 * k)
    const lastY = r.sub ? sz.sub2 : sz.gap
    // a solid black fill under the credit, so nothing behind shows through it
    draw.occlude(ctx, draw.roundPath(x - pitch / 2 + 4, ty - sz.title - 4, pitch - 8, lastY + sz.title + 10, 5), '#000', ca)
    draw.label(ctx, r.title, x, ty, { size: fit(r.title, sz.title, TT), align: 'center', color: P.white, weight: 'm', ls: 0.1, alpha: ca })
    draw.label(ctx, r.who, x, ty + sz.gap, { size: fit(r.who, sz.who, TW), align: 'center', color: P.sky, ls: 0.03, alpha: ca })
    if (r.sub) draw.label(ctx, r.sub, x, ty + sz.sub2, { size: fit(r.sub, sz.sub, TW), align: 'center', color: P.blueMid, ls: 0.03, alpha: ca })
    const b = ty + lastY + 6
    bottom = Math.max(bottom, b)
  }
  // the mug's hop, between the two tiles
  if (mugGo > 0 && mugGo < 1) {
    const x0 = xs(3), x1 = xs(1) - 12 * k
    const y0 = top + T * k * 0.62, y1 = top + T * k * 0.58
    const u = show.ease.inOutSine(mugGo)
    const mx = x0 + (x1 - x0) * u, my = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 62 * k
    ctx.save()
    ctx.translate(mx, my)
    ctx.scale(k * 0.62, k * 0.62)
    mugGlyph(ctx, show, 0, 0, 1)
    ctx.restore()
  }
  // the tag on the simulator's tile, a glance
  const tg = show.window(t, show.at('mug-in') + 0.3, show.at('mug-in') + 3.2, 0.25)
  if (tg > 0 && t >= show.at('tile-coffee')) {
    // inside the tile, along its top, clear of its frame
    const x = xs(1), y = top + 7 * k
    const tsz = 11 * k
    const w = Math.min(T * k - 10 * k, draw.labelWidth(ctx, MUG_TAG, { size: tsz, ls: 0.06, weight: 'm' }) + 10 * k)
    draw.box(ctx, x - w / 2, y, w, tsz * 1.6, { color: P.gold, cut: 3, width: 1.2, alpha: tg })
    draw.label(ctx, MUG_TAG, x, y + tsz * 1.2, { size: Math.min(tsz, (tsz * (w - 8 * k)) / draw.labelWidth(ctx, MUG_TAG, { size: tsz, ls: 0.06, weight: 'm' })), align: 'center', color: P.gold, weight: 'm', ls: 0.06, alpha: tg })
  }
  // Larry's DOO, joining the row on "to-camera" (wide only)
  if (n === 5) {
    const u = show.smoothstep(show.at('to-camera') - 0.1, show.at('to-camera') + 0.6, t)
    if (u > 0) {
      const x = xs(4)
      const [lx, ly] = show.toScreen(LSTAND.x, LSTAND.y)
      const e = show.ease.inOutCubic(u)
      const cx2 = lx + (x - lx) * e
      const by = ly + (top + T * k * 0.87 - ly) * e - Math.sin(e * Math.PI) * 60
      const w = (100 * show.cam.zoom) + (T * k - 100 * show.cam.zoom) * e
      syllableCard(ctx, show, cx2, by, w, 'DOO', { hot: u < 1 })
      if (u >= 1) {
        // it sits in the row the size of a tile, its label where a credit goes
        bottom = Math.max(bottom, top + T * k + 22 * k)
      }
    }
  }
  return bottom
}

/** a tile's glyph, in tile units (T × T) */
function glyph(ctx, show, id, t, o) {
  const { draw, P } = show
  if (id === 'cat') {
    // plain cat ears: two triangles on the curve of a head
    const p = new Path2D()
    p.moveTo(24, 92)
    p.quadraticCurveTo(26, 62, 34, 52)
    p.lineTo(32, 22)
    p.lineTo(52, 42)
    p.quadraticCurveTo(62, 39, 72, 42)
    p.lineTo(92, 22)
    p.lineTo(90, 52)
    p.quadraticCurveTo(98, 62, 100, 92)
    draw.beam(ctx, p, P.lime, 2.2, { hot: true })
    const inner = new Path2D()
    inner.moveTo(37, 45); inner.lineTo(36, 31); inner.lineTo(47, 42)
    inner.moveTo(87, 45); inner.lineTo(88, 31); inner.lineTo(77, 42)
    draw.beam(ctx, inner, P.lime, 1.2, { alpha: 0.6 })
  } else if (id === 'coffee') {
    simSketch(ctx, show, t, o.mugIn ?? 0)
  } else if (id === 'wheelie') {
    // two plain wheels, the front one off the ground
    draw.seg(ctx, 12, 96, 112, 96, '#cfd8e6', 1.4, { alpha: 0.7 })
    wheel(ctx, draw, 38, 80, 16, '#ffb35a', t * 3)
    wheel(ctx, draw, 86, 58, 16, '#ffb35a', t * 3)
  } else if (id === 'mug') {
    mugGlyph(ctx, show, 62, 64, 1)
  }
}

function wheel(ctx, draw, x, y, r, color, rot) {
  draw.ring(ctx, x, y, r, color, 2.2, { hot: true })
  draw.ring(ctx, x, y, r * 0.35, color, 1.2, { alpha: 0.7 })
  const p = new Path2D()
  for (let i = 0; i < 3; i++) {
    const a = rot + (i * Math.PI * 2) / 3
    p.moveTo(x + Math.cos(a) * r * 0.35, y + Math.sin(a) * r * 0.35)
    p.lineTo(x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9)
  }
  draw.beam(ctx, p, color, 1, { alpha: 0.7 })
}

/** a mug in outline, nothing on it, centred at (x, y) in tile units */
function mugGlyph(ctx, show, x, y, a) {
  const { draw } = show
  const b = new Path2D()
  b.moveTo(x - 24, y - 26)
  b.lineTo(x - 21, y + 26)
  b.lineTo(x + 21, y + 26)
  b.lineTo(x + 24, y - 26)
  b.closePath()
  draw.occlude(ctx, b, '#000', a)
  draw.beam(ctx, b, CREAM, 2, { alpha: a, hot: true })
  const h = new Path2D()
  h.moveTo(x + 23, y - 14)
  h.bezierCurveTo(x + 44, y - 16, x + 44, y + 14, x + 21, y + 14)
  draw.beam(ctx, h, CREAM, 2, { alpha: a })
}

/**
 * The simulator's studio sketch, small (the coffee segment's picture: a pale terrace with white
 * railings, blossom trees of small polyhedra, a string of red diamonds, a red frame with a dark
 * kettle shape). `mugIn` 0..1: the mug has landed beside the kettle.
 */
function simSketch(ctx, show, t, mugIn) {
  const { draw } = show
  // the far line of the valley
  draw.beamPts(ctx, [[8, 50], [30, 44], [54, 48], [80, 40], [116, 46]], '#7f94b8', 1, { alpha: 0.6 })
  // the string of red diamonds, top left
  const pts = []
  for (let x = 6; x <= 58; x += 4) pts.push([x, 14 + 0.012 * (x - 6) * (58 - x)])
  draw.beamPts(ctx, pts, '#d9c7c7', 0.8, { alpha: 0.7 })
  for (let i = 0; i < 4; i++) {
    const x = 12 + i * 13, y = 14 + 0.012 * (x - 6) * (58 - x) + 4
    draw.beamPts(ctx, [[x, y], [x + 3, y + 5], [x, y + 10], [x - 3, y + 5]], RED, 1.2, { close: true })
  }
  // two blossom trees
  for (const [bx, h] of [[24, 40], [46, 32]]) {
    draw.seg(ctx, bx, 78, bx + 2, 78 - h, '#d08a52', 1.8)
    for (const [dx, dy, r] of [[-7, -2, 6], [6, -4, 5], [0, -10, 6], [-4, 5, 4], [8, 5, 4]]) poly(ctx, draw, bx + 2 + dx, 78 - h + dy, r, 0.3 + 0.2 * Math.sin(t * 0.5 + dx), 5, BLOSSOM, 0.95)
  }
  // the red frame with the kettle hanging in it
  draw.seg(ctx, 80, 78, 80, 28, RED, 1.8)
  draw.seg(ctx, 112, 78, 112, 28, RED, 1.8)
  draw.seg(ctx, 76, 29, 116, 29, RED, 2)
  draw.seg(ctx, 96, 30, 96, 42, '#d9c7c7', 0.8, { alpha: 0.7 })
  kettle(ctx, draw, 96, 52, 0.34, 0, 1)
  // the railings, in front
  draw.seg(ctx, 4, 78, 120, 78, '#f2f6ff', 1.6)
  draw.seg(ctx, 4, 88, 120, 88, '#f2f6ff', 1.1)
  for (let x = 8; x < 120; x += 9) draw.seg(ctx, x, 78, x, 88, '#f2f6ff', 0.9, { alpha: 0.8 })
  // it is the studio's drawing, not the member's work, and says so for as long as it is up
  draw.label(ctx, 'STUDIO SKETCH', 62, 112, { size: 14, align: 'center', color: '#9fb8d8', weight: 'm', ls: 0.1 })
  // the mug, beside the kettle, once it has landed
  if (mugIn >= 1) {
    ctx.save()
    ctx.translate(66, 70)
    ctx.scale(0.42, 0.42)
    const land = show.ease.outBack(clamp01((t - show.at('mug-in') - 0.45) / 0.25))
    ctx.scale(0.8 + 0.2 * land, 0.8 + 0.2 * land)
    mugGlyph(ctx, show, 0, 0, 1)
    ctx.restore()
  }
}

/** a small polygon with spokes: a polyhedron in a blossom canopy */
function poly(ctx, draw, x, y, r, rot, n, color, alpha) {
  const pts = []
  for (let i = 0; i < n; i++) pts.push([x + r * Math.cos(rot + (i * 2 * Math.PI) / n), y + r * Math.sin(rot + (i * 2 * Math.PI) / n)])
  draw.beamPts(ctx, pts, color, 1, { alpha, close: true })
}

/** the dark kettle shape: body, lid, spout, handle; (x, y) its centre */
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
  draw.beam(ctx, b, KETTLE, 3.2, { alpha })
  const sp = new Path2D()
  sp.moveTo(-24, 6)
  sp.lineTo(-40, -6)
  sp.lineTo(-36, -10)
  sp.lineTo(-22, -2)
  draw.beam(ctx, sp, KETTLE, 2.8, { alpha })
  const hd = new Path2D()
  hd.moveTo(-12, -16)
  hd.quadraticCurveTo(0, -38, 12, -16)
  draw.beam(ctx, hd, KETTLE, 3, { alpha })
  ctx.restore()
}

// =================================================================== the lyrics

/** the current sung lead line, centred at y, each word on screen once it is being sung */
function drawLyrics(ctx, t, show, y) {
  const { draw, P } = show
  for (let n = 0; n < LYRICS.length; n++) {
    const l = show.line(LYRICS[n])
    if (!l.words?.length) continue
    const next = n + 1 < LYRICS.length ? show.line(LYRICS[n + 1]) : null
    const end = Math.min(l.t1 + 0.6, next ? next.t0 - 0.03 : Infinity)
    if (t < l.t0 - 0.05 || t > end) continue
    const a = Math.min(clamp01((t - l.t0 + 0.05) / 0.12), 1 - clamp01((t - (end - 0.25)) / 0.25))
    const words = l.words.map((w) => w[2].toUpperCase())
    const size = 32, ls = 0.06
    const space = size * 0.42
    const widths = words.map((s) => draw.labelWidth(ctx, s, { size, ls, weight: 'm' }))
    const total = widths.reduce((s, x) => s + x, 0) + space * (words.length - 1)
    // a black band behind, so the band's string of bulbs never shows through the words
    draw.occlude(ctx, draw.roundPath(640 - total / 2 - 18, y - size - 8, total + 36, size + 22, 10), '#000', 0.9 * a)
    let x = 640 - total / 2
    words.forEach((s, i) => {
      const w0 = l.words[i][0]
      const sung = t >= w0 - 0.02
      const now = sung && (i + 1 >= words.length || t < l.words[i + 1][0])
      if (sung) draw.label(ctx, s, x, y, { size, ls, weight: 'm', color: now ? P.magenta : P.white, alpha: a, hot: now })
      x += widths[i] + space
    })
  }
}

// =================================================================== the post card

/** a post card whose words light as they are read (from the coffee segment's card, copied) */
function card(ctx, show, c, o) {
  const { draw, P } = show
  const t = show.t
  const appear = show.clamp(o.appear ?? 1)
  if (appear <= 0) return null
  const e = show.ease.outCubic(appear)
  const size = o.size ?? 22
  const pad = 22
  const x = o.x, y = o.y + (1 - e) * 26, w = o.w
  const tx = x + pad + 64
  const textW = w - (tx - x) - pad
  const lo = { size, ls: 0.04 }
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
  const h = pad + 48 + lines.length * lh + linkH + 50
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
  draw.label(ctx, initialOf(c.name), ax, ay + 24 * 0.32, { size: 20, align: 'center', color: P.white, weight: 'm', ls: 0.02, alpha: a })
  draw.label(ctx, c.name, tx, y + pad + 18, { size: 21, color: P.white, weight: 'm', ls: 0.03, alpha: a })
  draw.label(ctx, `@${c.handle} · ${c.date}`, tx, y + pad + 42, { size: 16, color: P.blueMid, ls: 0.05, alpha: a })
  if (c.reply) {
    const rw = draw.labelWidth(ctx, 'REPLY', { size: 12, ls: 0.24 }) + 16
    draw.box(ctx, x + w - pad - rw - 38, y + pad + 4, rw, 22, { color: c.color, cut: 4, width: 1, alpha: 0.8 * a })
    draw.label(ctx, 'REPLY', x + w - pad - rw - 30, y + pad + 20, { size: 12, color: c.color, ls: 0.24, alpha: a })
  }
  draw.butterfly(ctx, x + w - pad - 12, y + pad + 12, 22, c.color, { width: 1.2, hot: false, alpha: 0.7 * a })
  let k = 0
  const space = draw.labelWidth(ctx, ' ', lo)
  lines.forEach((ln, li) => {
    let wx = tx
    const wy = y + pad + 48 + (li + 1) * lh - lh * 0.22
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
      wx += ww + space
    }
  })
  if (c.link) draw.label(ctx, c.link, tx, y + pad + 48 + (lines.length + 1) * lh - lh * 0.22, { ...lo, color: P.sky, alpha: a * 0.9 })
  // footer: replies, reposts, likes
  const fy = y + h - 26
  const items = [['replies', c.replies], ['reposts', c.reposts], ['likes', c.likes]]
  items.forEach(([kind, n], i) => {
    const ix = tx + i * ((x + w - tx - pad) / 3)
    footIcon(ctx, draw, kind, ix, fy, P.blueMid, a)
    draw.label(ctx, String(n), ix + 22, fy + 5, { size: 16, color: P.blueMid, alpha: a })
  })
  return { x, y, w, h }
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

const norm = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
const initialOf = (name) => (String(name).match(/\p{L}/u)?.[0] ?? '?').toUpperCase()
