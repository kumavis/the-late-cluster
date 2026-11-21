// Music: "The Plan, With Caterwauling". The direction.
//
// Shape: Larry at the desk with the synth's board of animals beside him (four tiles and an empty
// frame, already there when the camera finds it); Sibyl in front of the window with the plan's card,
// its words lighting as she reads; the band on the stage in front of the curtain for both music
// blocks, the board small across the top, the sung lead lines drawn as lyrics as they are sung;
// then the second card, and the button back at the desk, where the empty frame fills on "five".
//
// The turn, as staged. Hy leads at centre, Dee and Al behind, Pete apart on the right in paper
// ears. On the lament the cat's trace is jagged and drooping and the cat's frame on the board
// flinches red. At band-stops every head turns to Pete. The angry verse is announced to camera and
// turned on Pete, and Hy grows into it. Then Pete's trace falls smoothly onto a ruled line, the cat's
// frame on the board stops flinching and goes steady gold (empty still: it is filled only on
// "five", by the maker's cat), the alto and the bass join under him, the lights warm, and Hy looks
// from Pete to the floor before singing the refrain alone. One shot, no cut-away, for the ending.
//
// No percussion is pictured: Pete has no drums (the custom stage shot below gives nobody an
// instrument), and there are no stomps, claps or hits drawn anywhere. The look is secular: a
// curtain, warm stage light, no halo, no candles, no stained glass.
//
// Real words on screen: the maker's two posts, each card's shown text one string literal below
// (PLAN_TEXT is the cut the script reads, with its ellipsis; VERDICT_TEXT is the whole post), with
// display name, handle, date and counts as in production/sources.json. Each word lights as Sibyl
// says it. Only the maker is shown.

import script from '@late-cluster/episode/segments/music/script.js'
import * as DRAW from '@late-cluster/show/kit/draw.js'

// ---- the two posts (production/sources.json), exactly as read
// at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crbcfzuk2z (cut at the start, marked)
const PLAN_TEXT = '… the new plan was an older melancholic folk song with caterwauling. The lead singer would end by expressing anger at the cat.'
// at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crcmiaxs2z (whole)
const VERDICT_TEXT = 'But then I ended up with yowls that fit well enough that the cat deserved no such anger.'

const MAKER = { name: 'David', handle: 'yonderdavid.bsky.social', date: '15 NOV 2026' }
const PLAN = { ...MAKER, text: PLAN_TEXT, tag: 'REPLY · UNDER THE QUARTET VIDEO', replies: 2, reposts: 1, likes: 4, lines: ['plan-1', 'plan-2'] }
const VERDICT = { ...MAKER, text: VERDICT_TEXT, tag: 'THE NEXT POST', replies: 0, reposts: 0, likes: 1, lines: ['verdict'] }

// ---- glance-sized labels
const SYNTH = 'chimera-vocal-synth'
const CREDIT = 'CAT VOICE AND QUARTET · David · @yonderdavid.bsky.social'
const SKETCH = 'STUDIO SKETCH'
const TUNE = "THE PLAN · THE BAND'S OWN TUNE"
const CAT_LABEL = 'THE CAT · PLAYED BY PETE'
const TILES = ['SONGBIRD', 'SEAL', 'ALLIGATOR', 'ELEPHANT']
const FIFTH = 'CAT · by David'

// the sung lead lines, drawn as lyrics while they are sung
const LYRICS = ['v1', 'v2', 'angry', 'last']

// the stage for this number: Hy at centre front, Dee and Al behind him, Pete on his own spot to the
// right (room above him for his trace); nobody holds an instrument
const STAGE_CAM = { x: 970, y: 452, zoom: 1.15 }
const SPOTS = {
  hy: { x: 880, y: 515, scale: 1.08, z: 6 },
  dee: { x: 745, y: 455, scale: 0.72, z: 2 },
  al: { x: 1030, y: 455, scale: 0.72, z: 2 },
  pete: { x: 1320, y: 480, scale: 0.8, z: 3 },
}

const clamp01 = (v) => Math.max(0, Math.min(1, v))

export default {
  cast: ['hy', 'al', 'dee', 'pete', 'sibyl'],
  autoPanel: false,
  defaultShot: 'desk',

  shots: [
    // whose cat, and the throw: Larry with the board, already there
    { at: 0, shot: 'ots' },
    // the plan, read by Sibyl from its card
    { at: 'plan-card', shot: 'ots', who: 'sibyl' },
    // "Hy, can you do that plan?"
    { at: 'plan-card-out', shot: 'desk', look: 'left', zoom: 2.0 },
    // the band; the casting; the lament
    { at: 'band-in', shot: 'musicStage' },
    // yowl 2 runs over the top: push in on the stage, keep everyone in it for the turn of heads
    { at: 'yowl-2', shot: 'musicStage', tight: 1, push: 1.2 },
    // alone: Pete, then the lone meow to camera
    { at: 'band-stops', after: 1.3, shot: 'closeup', who: 'pete', size: 400, dx: 60 },
    // one cut to Larry watching, through the laugh
    { at: 'laugh-2', after: 0.15, shot: 'desk', look: 'left', zoom: 2.0 },
    // the announcement and the ending: one shot, no cut-away
    { at: 'windup', after: -0.15, shot: 'musicStage' },
    { at: 'ending', shot: 'musicStage', tight: 1, push: 9 },
    // "Never mind."
    { at: 'never-mind', after: -0.35, shot: 'closeup', who: 'hy', size: 440 },
    // the next post: Larry names it, Sibyl reads it
    { at: 'verdict-card', shot: 'ots' },
    { at: 'verdict', after: -0.05, shot: 'ots', who: 'sibyl' },
    // the button, back with the board
    { at: 'fifth-tile', after: -0.25, shot: 'ots' },
    { at: 'sting', shot: 'ots', zoom: 1.9, push: 3 },
  ],

  setup(show) {
    // the stage shot for this number (shots are shared, so the name is prefixed)
    show.SHOTS.musicStage = (s, o = {}) => {
      const k = o.tight ?? 0
      const cam = { x: STAGE_CAM.x + 40 * k, y: STAGE_CAM.y + 6 * k, zoom: STAGE_CAM.zoom * (1 + 0.1 * k) }
      const place = {}
      for (const [id, p] of Object.entries(SPOTS)) place[id] = { ...p, look: 'camera', floor: 960 }
      return { cam, place, audience: 1 - 0.4 * k, set: { chair: false, couch: false, window: false } }
    }

    // Pete's sung notes, as times, from the script's own music blocks
    const spb = 60 / 132
    const phrases = []
    for (const [block, track] of [['lament', 'yowls'], ['ending', 'meow-in-tune']]) {
      const m = script.beats.find((b) => b.music?.id === block).music
      const tr = m.tracks.find((x) => x.id === track)
      const t0 = show.at(block)
      let beat = tr.start ?? 0
      let cur = null
      for (const [midi, len] of tr.notes) {
        const a = t0 + beat * spb, b = t0 + (beat + len) * spb
        if (midi > 0) {
          if (!cur) phrases.push((cur = { block, notes: [], vib: tr.vibrato ?? 30 }))
          cur.notes.push({ a, b, midi })
        } else cur = null
        beat += len
      }
    }
    for (const p of phrases) {
      p.t0 = p.notes[0].a
      p.t1 = p.notes.at(-1).b
    }
    this.phrases = phrases
  },

  direct(t, show) {
    const ease = show.ease

    // ---------------------------------------------------------------- the desk and the cards
    // Larry presents the board, then throws to Sibyl
    if (t < show.at('plan-card')) {
      const L = show.line('built')
      const glance = L.words.length ? t >= L.words[2][0] && t < L.words[5][0] + 0.3 : false
      show.puppet('larry').lookAt(show.since('to-sibyl') > 2.5 ? 'left' : glance ? 'right' : 'camera')
    }
    // Sibyl reads from the card; a glance to camera on the last word of each card
    if (show.between('plan-card', 'plan-card-out')) {
      const end = show.since('plan-2.end') > 0.05
      show.puppet('sibyl').lookAt(end ? 'camera' : 'right')
    }
    if (show.between('plan-card-out', 'band-in')) show.puppet('larry').lookAt('left')
    if (show.between('laugh-2', 'windup')) show.puppet('larry').lookAt('left').tilt(0.08 * show.smoothstep(0, 0.8, show.since('laugh-2')))
    if (show.between('verdict-card', 'verdict')) {
      // Larry glances at the card on "next post", then to camera
      show.puppet('larry').lookAt(show.since('next-post') > 0.1 && show.since('next-post') < 1.2 ? 'right' : 'camera')
    }
    if (show.between('verdict', 'fifth-tile')) show.puppet('sibyl').lookAt(show.since('verdict.end') > 0.1 ? 'camera' : 'right')
    if (show.since('fifth-tile') > -0.3) {
      const B = show.line('button')
      const five = B.words[5]?.[0] ?? show.at('fifth-tile')
      const toBoard = t >= five - 0.15 && t < five + 0.9
      show.puppet('larry').lookAt(toBoard ? 'right' : 'camera')
      if (show.since('sting') > 0) show.puppet('larry').nod(-0.06 * show.window(t, show.at('sting'), show.at('sting') + 0.8, 0.3))
    }

    // ---------------------------------------------------------------- the band
    // set flags are module state: assign them every frame. From the band to "Never mind." the
    // studio's furniture is out of the way (Pete's spot and the close-ups would show the couch)
    const band = show.between('plan-card-out', 'verdict-card')
    for (const k of ['chair', 'couch']) {
      if (band) show.set[k] = false
      else delete show.set[k]
    }
    const watching = show.between(show.at('laugh-2') + 0.15, show.at('windup') - 0.15)
    if (band && show.since('band-in') >= 0 && !watching) show.set.window = false
    else delete show.set.window
    const onStage = show.between(show.at('band-in'), show.at('never-mind') - 0.35)
    if (onStage) {
      const hy = show.puppet('hy'), dee = show.puppet('dee'), al = show.puppet('al'), pete = show.puppet('pete')
      // nobody bobs on the beat: a lament, not a dance
      for (const p of [hy, dee, al, pete]) p.bob(false)

      // the casting: Hy turns to Pete on "Pete." and back to camera after "cat."
      const casting = show.between('casting', show.at('casting.end') + 0.6)
      if (casting) {
        hy.lookAt('pete')
        dee.lookAt('pete')
        al.lookAt('pete')
      }
      // Pete looks to Hy when named, then to camera, ears on, a sheepish tilt
      if (show.between('casting', 'ears')) pete.lookAt('hy')
      if (show.between('ears', 'lament')) pete.lookAt('camera').tilt(0.12 * show.smoothstep(0, 0.5, show.since('ears')))

      // the lament. Dee and Al watch Hy until the trouble starts
      if (show.between('lament', 'yowl-1')) {
        dee.lookAt('hy')
        al.lookAt('hy')
      }
      // yowl 1: a sour flinch. Hy's eyes flick to Pete and back; the backing singers look round
      const y1 = show.since('yowl-1')
      if (y1 >= 0 && y1 < 1.6) {
        hy.lookAt(y1 < 1.1 ? 'pete' : 'camera')
        dee.lookAt('pete')
        al.lookAt('pete')
        if (y1 < 0.5) hy.shake(2)
      }
      if (show.between(show.at('yowl-1') + 1.6, 'yowl-2')) {
        dee.lookAt('hy')
        al.lookAt('hy')
        // "the high part": Hy lifts his chin on it
        const V2 = show.line('v2')
        if (V2.words[5] && t >= V2.words[5][0] && t < V2.words[7][0]) hy.nod(0.08)
      }
      // yowl 2 answers the question; at band-stops every head turns to Pete
      if (show.between('yowl-2', 'band-stops')) {
        hy.lookAt(show.since('yowl-2') > 0.4 ? 'pete' : 'camera')
        dee.lookAt('pete')
        al.lookAt('pete')
      }
      if (show.between('band-stops', 'windup')) {
        hy.lookAt('pete')
        dee.lookAt('pete')
        al.lookAt('pete')
        pete.lookAt(show.since('lone-meow') > -0.3 ? 'camera' : 'left')
      }
      if (show.between('yowl-1', 'band-stops')) pete.lookAt('camera')

      // the announcement: "Last verse." to camera, "Now I get angry at the cat." to Pete, growing
      const W = show.line('windup')
      if (show.between(show.at('windup') - 0.2, 'ending')) {
        const now = W.words[2]?.[0] ?? W.t0
        hy.lookAt(t < now ? 'camera' : 'pete')
        dee.lookAt('hy')
        al.lookAt('hy')
        pete.lookAt('hy')
      }
      // Hy grows through the wind-up and the stern note, and gives it back at the chord
      const grow = show.tween(t, show.at('windup') + 1.2, show.at('in-tune'), 1, 1.12, ease.inOutSine)
      const give = show.tween(t, show.at('chord'), show.at('chord') + 1.2, 0, 1, ease.inOutCubic)
      if (t >= show.at('windup')) hy.scaleTo(grow + (1 - grow) * give)

      // the ending: the stern note at Pete; Pete answers in tune, looking back at him
      if (show.between('ending', 'in-tune')) {
        hy.lookAt('pete').nod(-0.07)
        dee.lookAt('hy')
        al.lookAt('hy')
        pete.lookAt('hy')
      }
      if (show.between('in-tune', 'chord')) {
        hy.lookAt('pete').nod(-0.04)
        dee.lookAt('pete')
        al.lookAt('pete')
        pete.lookAt('hy')
      }
      // the chord: Hy looks from Pete to the floor, then sings the refrain alone, a little sheepish
      if (show.between('chord', 'last-chord')) {
        const down = show.smoothstep(0.5, 1.1, show.since('chord'))
        hy.lookAt(down > 0.5 ? 'camera' : 'pete').nod(-0.2 * down * (1 - show.smoothstep(0, 0.6, show.since('last'))) - 0.03).tilt(0.1 * show.smoothstep(0, 0.6, show.since('last')))
        dee.lookAt(show.since('last') > 0 ? 'hy' : 'pete')
        al.lookAt(show.since('last') > 0 ? 'hy' : 'pete')
        pete.lookAt(show.since('last') > 0.4 ? 'hy' : 'camera')
      }
      // the last chord: all four to camera
      if (show.since('last-chord') >= 0) {
        for (const p of [hy, dee, al, pete]) p.lookAt('camera')
        hy.tilt(0.06)
      }
    }
    // "Never mind.": Hy to camera, a small tilt
    if (show.since('never-mind') > -0.4 && show.since('verdict-card') < 0) {
      show.puppet('hy').lookAt('camera').tilt(0.14 * show.smoothstep(-0.1, 0.5, show.since('never-mind')))
    }

    // ---------------------------------------------------------------- captions
    // the cards light the words being read, and the lyrics are drawn as they are sung
    const reading = ['plan-1', 'plan-2', 'verdict'].some((id) => {
      const l = show.line(id)
      return t >= l.t0 - 0.1 && t < l.t1 + 0.7
    })
    const singing = LYRICS.some((id) => {
      const l = show.line(id)
      return t >= l.t0 - 0.1 && t < l.t1 + 0.7
    })
    if (reading || singing) show.caption(null)
  },

  drawBack(ctx, t, show) {
    // warm stage light from the chord to the end of the ending
    const w = show.window(t, show.at('chord'), show.at('never-mind') - 0.35, 1.2)
    if (w > 0 && show.layout && show.place.pete && show.place.hy) {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createRadialGradient(640, 300, 40, 640, 330, 720)
      g.addColorStop(0, `rgba(255, 170, 70, ${0.12 * w})`)
      g.addColorStop(0.6, `rgba(255, 120, 40, ${0.05 * w})`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 1280, 720)
      ctx.restore()
    }
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    const atDesk = show.panel && show.layout?.place?.larry && !show.place.sibyl
    const sibylCard = show.panel && show.place.sibyl
    const onStage = !!(show.place.hy && show.place.pete && show.layout?.place?.dee)

    // ---------------------------------------------------------------- the board
    const board = boardState(t, show)
    if (atDesk) {
      const pn = show.panel
      drawBoard(ctx, show, pn.x + 26, pn.y + 92, (pn.w - 52) / 700, board, { title: true })
      // the credit, glance-sized
      const cr = show.smoothstep(0, 0.5, show.since('credit'))
      if (cr > 0) draw.label(ctx, CREDIT, pn.x + pn.w / 2, pn.y + pn.h - 26 + (1 - cr) * 12, { size: 15, align: 'center', color: P.sky, alpha: cr, ls: 0.08 })
    }
    if (onStage) {
      drawBoard(ctx, show, 40, 22, 0.62, board, { title: false })
      draw.label(ctx, CREDIT, 40, 22 + 0.62 * 230 + 4, { size: 12, color: P.blueMid, alpha: 0.95, ls: 0.08 })
    }

    // ---------------------------------------------------------------- the cards
    if (sibylCard || (atDesk && show.between('verdict-card', 'fifth-tile'))) {
      const card = t < show.at('plan-card-out') + 0.5 ? PLAN : VERDICT
      const from = card === PLAN ? show.at('plan-card') : show.at('verdict-card')
      const to = card === PLAN ? show.at('plan-card-out') : show.at('fifth-tile') - 0.25
      const appear = show.clamp((t - from) / 0.45) * (1 - show.clamp((t - to) / 0.3))
      if (appear > 0) {
        if (atDesk) occludePanel(ctx, show)
        postCard(ctx, show, card, { x: 540, y: 150, w: 690, appear })
      }
    }

    // ---------------------------------------------------------------- the stage
    if (onStage) {
      // the paper ears, landing on "cat"
      drawEars(ctx, t, show)
      // THE CAT · PLAYED BY PETE, for a glance after the ears land
      const h = show.headOf('pete')
      const la = show.window(t, show.at('ears') + 0.3, show.at('lament') + 3.5, 0.4)
      if (h && la > 0) draw.label(ctx, CAT_LABEL, h.x, h.crown[1] - h.size * 0.36, { size: 15, align: 'center', color: P.amber, alpha: la, ls: 0.12 })
      // THE PLAN · THE BAND'S OWN TUNE, small, while either block plays
      const m = show.music
      if (m?.active) {
        const a = show.window(t, m.t0, m.t1, 0.6)
        // top right, clear of the audience row and the caption band, above Pete's trace box
        draw.label(ctx, TUNE, 1240, 50, { size: 16, align: 'right', color: P.magenta, weight: 'm', alpha: a, ls: 0.12 })
      }
      // the lyrics, as they are sung
      drawLyrics(ctx, t, show)
    }

    // Pete's trace, wherever his head is (the stage, or his close-up)
    drawTrace(ctx, t, show, this.phrases)
    if (show.place.pete && !onStage) drawEars(ctx, t, show)
  },
}

// =================================================================== the board

/** what each part of the board is doing at t */
function boardState(t, show) {
  const V1 = show.line('v1')
  const wordAt = (k) => V1.words[k]?.[0] ?? Infinity
  const lit = [
    show.window(t, wordAt(1) - 0.05, wordAt(1) + 1.6, 0.25), // "bird"
    show.window(t, wordAt(5) - 0.05, wordAt(5) + 1.6, 0.25), // "seal"
    0,
    0,
  ]
  // the empty frame: pulses on "no cat"; flinches on the sour yowls; steady from the in-tune meow
  const noCat = wordAt(11)
  const pulse = show.window(t, noCat - 0.05, noCat + 2.2, 0.3) * (0.6 + 0.4 * Math.sin((t - noCat) * 9))
  let flinch = 0
  for (const id of ['yowl-1', 'yowl-2']) {
    const s = t - show.at(id)
    const len = id === 'yowl-1' ? 0.95 : 3.5
    if (s >= 0 && s < len + 0.3) flinch = Math.max(flinch, 1 - Math.max(0, s - len) / 0.3)
  }
  if (show.between('band-stops', show.at('lone-meow') + 0.8)) flinch = Math.max(flinch, 0.5 * show.window(t, show.at('band-stops'), show.at('lone-meow') + 0.8, 0.2))
  const steady = show.smoothstep(show.at('in-tune') + 0.25, show.at('in-tune') + 0.9, t)
  // filled on "five"
  const B = show.line('button')
  const five = B.words[5]?.[0] ?? show.at('fifth-tile')
  const fill = show.clamp((t - five + 0.05) / 0.5)
  return { lit, pulse, flinch: flinch * (1 - steady), steady, fill, t }
}

/** five tiles in a row: 700 × 250 design units at (x, y), scaled by k */
function drawBoard(ctx, show, x, y, k, st, o = {}) {
  const { draw, P } = show
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(k, k)
  const tw = 128, gap = 15, ty = o.title ? 34 : 0, th = 170
  const frame = draw.roundPath(-8, ty - 12, 5 * tw + 4 * gap + 16, th + 60, 12)
  draw.occlude(ctx, frame, '#000', 0.92)
  if (o.title) {
    draw.label(ctx, SYNTH, 0, 14, { size: 22, color: P.white, weight: 'm', ls: 0.04 })
  }
  draw.label(ctx, SKETCH, 5 * tw + 4 * gap, o.title ? 14 : ty + th + 40, { size: o.title ? 12 : 16, align: 'right', color: P.blueMid, ls: 0.2 })
  const glyphs = [songbird, (c, gx, gy, s, a) => draw.seal(c, gx + 4, gy + 8, { scale: s * 0.95, color: a }), (c, gx, gy, s, a) => draw.gator(c, gx + 10, gy + 10, { scale: s * 0.6, color: a }), (c, gx, gy, s, a) => draw.elephant(c, gx - 6, gy + 34, { scale: s * 0.8, color: a })]
  const colors = [P.lime, P.sky, P.green ?? P.lime, P.blueMid]
  for (let i = 0; i < 5; i++) {
    const bx = i * (tw + gap), by = ty
    if (i < 4) {
      const L = st.lit[i]
      draw.box(ctx, bx, by, tw, th, { color: L > 0 ? P.gold : P.sky, radius: 8, width: 1.4 + 1.6 * L, alpha: 0.75 + 0.25 * L, hot: L > 0.5 })
      glyphs[i](ctx, bx + tw / 2, by + 70, 1, L > 0.3 ? P.gold : colors[i])
      draw.label(ctx, TILES[i], bx + tw / 2, by + th - 18, { size: 14, align: 'center', color: L > 0.3 ? P.gold : P.white, ls: 0.12 })
    } else {
      // the empty frame: dashed while empty, flinching red on the yowls, steady gold in tune
      const jx = st.flinch > 0 ? show.noise(st.t * 40, 3) * 5 * st.flinch : 0
      const jy = st.flinch > 0 ? show.noise(st.t * 43, 4) * 4 * st.flinch : 0
      const col = st.flinch > 0.2 ? P.red : st.steady > 0.5 || st.fill > 0 ? P.gold : st.pulse > 0 ? P.white : P.blueMid
      const solid = st.steady > 0.5 || st.fill > 0
      const path = draw.roundPath(bx + jx, by + jy, tw, th, 8)
      draw.beam(ctx, path, col, 1.4 + 2 * Math.max(st.pulse, st.flinch, st.steady * 0.6), { dash: solid ? undefined : [8, 7], alpha: 0.7 + 0.3 * Math.max(st.pulse, st.steady), hot: st.pulse > 0.5 || st.steady > 0.5 })
      if (st.fill > 0) {
        catGlyph(ctx, show, bx + tw / 2, by + 70, st.fill)
        draw.label(ctx, FIFTH, bx + tw / 2, by + th - 18, { size: 14, align: 'center', color: P.gold, alpha: show.clamp(st.fill * 2 - 0.6), ls: 0.06 })
      }
    }
  }
  ctx.restore()
}

/** a small songbird, singing (the kit has none), in the tile's design units */
function songbird(ctx, x, y, s, color) {
  const { beam, dot, seg } = DRAW
  const p = new Path2D()
  p.ellipse(x - 4, y + 6, 26, 17, -0.25, 0, Math.PI * 2)
  const head = new Path2D()
  head.arc(x + 20, y - 14, 11, 0, Math.PI * 2)
  DRAW.occlude(ctx, p)
  beam(ctx, p, color, 1.6)
  DRAW.occlude(ctx, head)
  beam(ctx, head, color, 1.6)
  // beak, open
  seg(ctx, x + 30, y - 16, x + 42, y - 19, color, 1.6)
  seg(ctx, x + 30, y - 12, x + 41, y - 9, color, 1.6)
  dot(ctx, x + 23, y - 17, 1.8, '#ffffff')
  // wing and tail
  const w = new Path2D()
  w.moveTo(x - 18, y + 2)
  w.quadraticCurveTo(x - 2, y - 6, x + 10, y + 8)
  beam(ctx, w, color, 1.3, { alpha: 0.8 })
  const tail = new Path2D()
  tail.moveTo(x - 28, y + 12)
  tail.lineTo(x - 46, y + 4)
  tail.lineTo(x - 44, y + 18)
  tail.closePath()
  beam(ctx, tail, color, 1.4)
  // legs
  seg(ctx, x - 6, y + 22, x - 8, y + 34, color, 1.2)
  seg(ctx, x + 4, y + 22, x + 4, y + 34, color, 1.2)
}

/** the maker's cat, drawn in as the frame fills (0..1) */
function catGlyph(ctx, show, x, y, u) {
  const { beam, dot, seg } = show.draw
  const P = show.P
  const a = show.clamp(u)
  const s = 0.6 + 0.4 * show.ease.outBack(a)
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(s, s)
  const body = new Path2D()
  body.moveTo(-22, 40)
  body.bezierCurveTo(-30, 10, -20, -4, 0, -4)
  body.bezierCurveTo(20, -4, 30, 10, 22, 40)
  body.closePath()
  show.draw.occlude(ctx, body)
  beam(ctx, body, P.gold, 1.6, { alpha: a })
  const tail = new Path2D()
  tail.moveTo(20, 36)
  tail.bezierCurveTo(44, 34, 46, 10, 34, 2)
  beam(ctx, tail, P.gold, 1.6, { alpha: a })
  const head = new Path2D()
  head.moveTo(-18, -14)
  head.lineTo(-20, -40)
  head.lineTo(-8, -30)
  head.lineTo(8, -30)
  head.lineTo(20, -40)
  head.lineTo(18, -14)
  head.bezierCurveTo(14, -2, -14, -2, -18, -14)
  head.closePath()
  show.draw.occlude(ctx, head)
  beam(ctx, head, P.gold, 1.8, { alpha: a, hot: true })
  dot(ctx, -7, -20, 2, P.white, a)
  dot(ctx, 7, -20, 2, P.white, a)
  for (const k of [-1, 1]) {
    seg(ctx, k * 6, -12, k * 22, -14, P.gold, 1, { alpha: 0.7 * a })
    seg(ctx, k * 6, -10, k * 21, -7, P.gold, 1, { alpha: 0.7 * a })
  }
  ctx.restore()
}

// =================================================================== the cards

function occludePanel(ctx, show) {
  const pn = show.panel
  show.draw.occlude(ctx, show.draw.roundPath(pn.x, pn.y, pn.w, pn.h, 12))
}

/** a post card whose words light as they are read (lines in order) */
function postCard(ctx, show, card, o) {
  const { draw, P } = show
  const t = show.t
  const words = card.text.split(' ')
  // when each card word is said: the lines' words, in order (the cards show exactly what is read)
  const times = card.lines.flatMap((id) => show.line(id).words.map((w) => w[0]))
  const e = show.ease.outBack(show.clamp(o.appear))
  ctx.save()
  ctx.translate(0, (1 - e) * 30)
  const { x, y, w } = o
  const size = 29, lh = size * 1.4, pad = 24
  const tx = x + pad + 70, tw = w - pad * 2 - 70
  // lay out the words
  const space = size * 0.36
  const rows = [[]]
  let cx = 0
  const widths = words.map((s) => draw.labelWidth(ctx, s, { size, ls: 0.03 }))
  words.forEach((s, i) => {
    if (cx > 0 && cx + widths[i] > tw) {
      rows.push([])
      cx = 0
    }
    rows.at(-1).push({ s, i, x: cx })
    cx += widths[i] + space
  })
  const h = pad + 34 + rows.length * lh + 58
  const alpha = Math.min(1, o.appear * 2)
  // the provenance tag above it
  draw.label(ctx, card.tag, x + 4, y - 14, { size: 14, color: P.sky, ls: 0.18, alpha })
  draw.occlude(ctx, draw.roundPath(x, y, w, h, 14))
  draw.box(ctx, x, y, w, h, { color: P.bsky, radius: 14, width: 1.8, alpha: 0.95 * alpha })
  draw.avatar(ctx, x + pad + 26, y + pad + 24, 26, { color: P.bsky, initials: 'D' })
  draw.label(ctx, card.name, tx, y + pad + 18, { size: 20, color: P.white, weight: 'm', ls: 0.04, alpha })
  const nw = draw.labelWidth(ctx, card.name, { size: 20, weight: 'm', ls: 0.04 })
  draw.label(ctx, `@${card.handle} · ${card.date}`, tx + nw + 12, y + pad + 18, { size: 15, color: P.blueMid, ls: 0.05, alpha })
  draw.butterfly(ctx, x + w - pad - 12, y + pad + 10, 24, P.bsky, { width: 1.2, hot: false, alpha: 0.7 })
  rows.forEach((row, r) => {
    const ry = y + pad + 34 + (r + 1) * lh - lh * 0.22
    for (const wd of row) {
      const said = t >= (times[wd.i] ?? Infinity) - 0.02
      const now = said && (wd.i + 1 >= times.length || t < times[wd.i + 1])
      draw.label(ctx, wd.s, tx + wd.x, ry, { size, ls: 0.03, color: said ? (now ? P.gold : P.white) : P.blueMid, alpha: alpha * (said ? 1 : 0.85) })
    }
  })
  // footer: replies, reposts, likes, as numbers with their words (glance-sized)
  const fy = y + h - 22
  const foot = [`${card.replies} REPLIES`, `${card.reposts} REPOSTS`, `${card.likes} LIKES`].map((s) => s.replace(/^1 (\w+)S$/, '1 $1'))
  foot.forEach((s, i) => draw.label(ctx, s, tx + i * (tw / 3), fy, { size: 14, color: P.blueMid, ls: 0.12, alpha }))
  ctx.restore()
}

// =================================================================== the stage

/** the current sung lead line, drawn with its words lit as they are sung */
function drawLyrics(ctx, t, show) {
  const { draw, P } = show
  for (const id of LYRICS) {
    const l = show.line(id)
    if (t < l.t0 - 0.15 || t > l.t1 + 0.6) continue
    const a = Math.min(show.clamp((t - l.t0 + 0.15) / 0.2), 1 - show.clamp((t - l.t1 - 0.3) / 0.3))
    const words = l.text.split(' ')
    const size = id === 'angry' ? 30 : 26
    const ls = 0.06
    const space = size * 0.4
    const widths = words.map((s) => draw.labelWidth(ctx, s.toUpperCase(), { size, ls, weight: 'm' }))
    const total = widths.reduce((s, x) => s + x, 0) + space * (words.length - 1)
    const cx = 470
    let x = cx - total / 2
    const y = 216
    words.forEach((s, i) => {
      const w0 = l.words[i]?.[0] ?? Infinity
      const sung = t >= w0 - 0.02
      // a word is on screen only once it is being sung
      const now = sung && (i + 1 >= words.length || t < (l.words[i + 1]?.[0] ?? Infinity))
      const col = id === 'angry' ? P.red : now ? P.magenta : P.white
      if (sung) draw.label(ctx, s.toUpperCase(), x, y, { size, ls, weight: 'm', color: col, alpha: a })
      x += widths[i] + space
    })
  }
}

/** two paper ears on Pete, dropping in on "cat" and staying to the end */
function drawEars(ctx, t, show) {
  const s = t - show.at('ears')
  if (s < -0.25) return
  const h = show.headOf('pete')
  if (!h) return
  const { draw, P } = show
  const drop = s < 0.05 ? (1 - show.ease.outQuad(show.clamp((s + 0.25) / 0.3))) : 0
  const bounce = s >= 0.05 && s < 0.45 ? Math.sin(((s - 0.05) / 0.4) * Math.PI) * 0.05 : 0
  const k = (h.size / 180) * 0.82
  const [cx, cy] = h.crown
  for (const side of [-1, 1]) {
    const ex = cx + side * 34 * k
    const ey = cy + 16 * k - drop * 160 * k - bounce * 60 * k
    const p = new Path2D()
    p.moveTo(ex - 20 * k, ey)
    p.lineTo(ex + side * 6 * k, ey - 44 * k)
    p.lineTo(ex + 20 * k, ey)
    p.closePath()
    draw.occlude(ctx, p)
    draw.beam(ctx, p, P.amber, 1.8 * Math.max(0.8, k), { hot: true })
    const q = new Path2D()
    q.moveTo(ex - 10 * k, ey - 4 * k)
    q.lineTo(ex + side * 4 * k, ey - 30 * k)
    q.lineTo(ex + 10 * k, ey - 4 * k)
    draw.beam(ctx, q, P.coral, 1.2 * Math.max(0.8, k), { alpha: 0.8 })
  }
}

/**
 * Pete's pitch trace, drawn only while he sings: jagged and drooping on the yowls (the second runs
 * off the top of its box), a short smooth fall onto a ruled line in tune, then the chord's lines.
 */
function drawTrace(ctx, t, show, phrases) {
  const { draw, P } = show
  const h = show.headOf('pete')
  if (!h || !phrases) return
  const ending = show.musicState('ending')
  const inEnding = t >= show.at('in-tune') - 0.05 && t < ending.t1 + 0.9
  // the latest phrase that has started (a new one replaces the last one's fade)
  const ph = phrases.filter((p) => p.block === 'lament' && t >= p.t0 - 0.05 && t < p.t1 + 0.6).at(-1)
  if (!ph && !inEnding) return
  // the box: above his head on the stage, beside it in his close-up
  const big = h.size > 300
  const bw = big ? 300 : 230, bh = big ? 150 : 104
  const bx = big ? h.x + h.size * 0.42 : h.x - bw / 2
  const by = big ? h.y - bh * 0.9 : h.crown[1] - 70 - bh
  const fadeOut = inEnding ? 1 - show.clamp((t - ending.t1 - 0.3) / 0.6) : 1 - show.clamp((t - ph.t1 - 0.2) / 0.4)
  const a = fadeOut * show.clamp((t - (inEnding ? show.at('in-tune') - 0.05 : ph.t0 - 0.05)) / 0.15)
  if (a <= 0) return
  draw.occlude(ctx, draw.rectPath(bx, by, bw, bh, 6), '#000', 0.85)
  draw.box(ctx, bx, by, bw, bh, { color: P.amber, cut: 6, width: 1.2, alpha: 0.6 * a })

  if (!inEnding) {
    // the yowls: map MIDI 70..85 onto the box; anything higher runs off the top
    const lo = 70, hi = 85
    const yOf = (m) => by + bh - ((m - lo) / (hi - lo)) * bh * 0.86 - bh * 0.07
    const tEnd = Math.min(t, ph.t1)
    const span = Math.max(0.9, ph.t1 - ph.t0)
    const pts = []
    for (let u = ph.t0; u <= tEnd; u += 0.012) {
      const n = ph.notes.find((q) => u >= q.a && u < q.b) ?? ph.notes.at(-1)
      const prev = ph.notes[ph.notes.indexOf(n) - 1]
      let m = n.midi
      if (prev && u - n.a < 0.07) m = prev.midi + (n.midi - prev.midi) * ((u - n.a) / 0.07)
      // drooping within each note, wide vibrato, and a ragged edge
      m -= 0.9 * ((u - n.a) / Math.max(0.2, n.b - n.a))
      m += (ph.vib / 100) * Math.sin((u - ph.t0) * 2 * Math.PI * 5.6)
      m += 0.45 * show.noise(u * 23, 7)
      pts.push([bx + 10 + ((u - ph.t0) / span) * (bw - 20), yOf(m)])
    }
    if (pts.length > 1) draw.beamPts(ctx, pts, P.coral, 2, { alpha: a, hot: true })
    return
  }

  // the ending: four evenly spaced ruled lines; Pete's in-tune fall lands on the second, the
  // alto and the bass bring in two under it at the chord, and the last chord puts his on top
  const rows = [0.2, 0.42, 0.64, 0.86].map((f) => by + bh * f)
  const lineA = (i) => {
    if (i === 1) return show.smoothstep(show.at('in-tune') + 0.2, show.at('in-tune') + 0.55, t)
    if (i === 2 || i === 3) return show.smoothstep(show.at('chord'), show.at('chord') + 0.35, t)
    return show.smoothstep(show.at('last-chord') - 0.1, show.at('last-chord') + 0.25, t)
  }
  const warm = show.smoothstep(show.at('chord'), show.at('chord') + 1, t)
  rows.forEach((ry, i) => {
    const la = lineA(i)
    if (la > 0) draw.seg(ctx, bx + 10, ry, bx + bw - 10, ry, warm > 0.5 ? P.gold : P.white, 1.3, { alpha: a * la * 0.85, hot: i <= 1 && la > 0.9 })
  })
  // Pete's two in-tune phrases
  const tune = phrases.filter((p) => p.block === 'ending')
  // the in-tune fall across the left half, the last chord's note across the right
  const xOf = (u, p) => {
    const [f0, f1] = p === tune[0] ? [0.05, 0.55] : [0.62, 0.95]
    return bx + bw * (f0 + (f1 - f0) * ((u - p.t0) / (p.t1 - p.t0)))
  }
  const y76 = rows[0], y73 = rows[1]
  for (const p of tune) {
    if (t < p.t0) continue
    const pts = []
    for (let u = p.t0; u <= Math.min(t, p.t1); u += 0.015) {
      const n = p.notes.find((q) => u >= q.a && u < q.b) ?? p.notes.at(-1)
      const prev = p.notes[p.notes.indexOf(n) - 1]
      let yy = n.midi >= 76 ? y76 : y73
      if (prev && u - n.a < 0.2) {
        const y0 = prev.midi >= 76 ? y76 : y73
        yy = y0 + (yy - y0) * show.ease.inOutSine((u - n.a) / 0.2)
      }
      // the first phrase starts on the top line and falls: from y76 to y73 smoothly
      pts.push([xOf(u, p), yy + 0.6 * Math.sin(u * 30)])
    }
    if (pts.length > 1) draw.beamPts(ctx, pts, P.amber, 2.4, { alpha: a, hot: true })
    // where it lands, a dot
    const last = pts.at(-1)
    if (last) draw.dot(ctx, last[0], last[1], 3, P.gold, a)
  }
}
