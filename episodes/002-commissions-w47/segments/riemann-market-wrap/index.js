// riemann-market-wrap: the direction. A finance channel's market wrap: MARKET WRAP, a session
// clock, a wall of analyst boxes beside Larry's desk. Each member's box lights as Larry throws to
// them by the clock, then the camera cuts to the box and the post it was. Larry orders graphics
// (a ticker of arrows, a globe, then everything); Sibyl reads norvid's question, softmacs' reply and
// norvid's answer from their cards in the wall's well, and the graphics go dark one by one.
//
// Two layouts, both custom shots defined in setup():
//   rmwWall      Larry at the desk screen-right, the analyst wall and the card well screen-left
//   rmwFeature   one analyst's box large on the left, the post it was on the right
// The graphics are the show's fiction (graphics.js): no number, symbol, company or reason on any
// of them. The only real chart is davidcrespo's own image, inside his card (chart.webp, the post's
// one picture, copied unaltered from the week's scrape).
//
// Preview: npm run dev -- 002-commissions-w47, then /?seg=riemann-market-wrap
// Frames:  npm run shoot -- 002-commissions-w47 riemann-market-wrap 3 7 12 …
import { TILE } from '@late-cluster/show/stage/shots.js'
import chartSrc from '@late-cluster/episode/segments/riemann-market-wrap/chart.webp?inline'
import { POSTS, layoutPost, drawPost, wordsLit, threadLine } from '@late-cluster/episode/segments/riemann-market-wrap/post.js'
import { lit, arrowTicker, globe, globeSpin, bell, developing, header, analystBox, analystGlass, parodyTag, plate, tri, UP, DOWN } from '@late-cluster/episode/segments/riemann-market-wrap/graphics.js'

// the chart image starts decoding as soon as the module loads (an inline data URL: no request)
const chartImg = typeof Image !== 'undefined' ? Object.assign(new Image(), { src: chartSrc }) : null

const DESK = { x: 1790, y: 548 }
const WALL_ZOOM = 1.45
const WALL_CAM = { x: DESK.x - (1075 - 640) / WALL_ZOOM, y: DESK.y - (254 - 360) / WALL_ZOOM, zoom: WALL_ZOOM }

// the analyst wall (stage units): three boxes, a nameplate under each, the well below
const GUESTS = ['davidcrespo', 'huwupy', 'moultano']
const BOX = GUESTS.map((_, i) => ({ x: 28 + i * 259, y: 64, w: 240, h: 128 }))
const PLATE_Y = 200
const WELL = { x: 28, y: 254, w: 836, h: 256 }
// the feature layout
const FBOX = { x: 28, y: 66, w: 360, h: 262 }
const FPLATE_Y = 340
const CARD = { x: 408, y: 62, w: 846 }
// the tickers
const T2 = { y: 518, h: 28 }
const T1 = { y: 552, h: 30 }
// Larry's furniture
const GLOBE = { x: 1196, y: 136, r: 70 }
const BELL = { x: 892, y: 118, s: 40 }

// whose box, which post, when it lights, from when the nameplate (with the handle) is up
const ANALYST = {
  davidcrespo: { post: 'chart', on: 'card-chart', plate: 'open' },
  huwupy: { post: 'attached', on: 'box-huwupy', plate: 'box-huwupy' },
  moultano: { post: 'revenue', on: 'box-moultano', plate: 'box-moultano' },
}

/** place a puppet so its head fills a stage rect, clipped to it (as the studio's monitor() does) */
function inBox(cam, r) {
  const z = cam.zoom
  const scale = (r.h * 0.8) / (TILE * z)
  const sx = r.x + r.w / 2, sy = r.y + r.h * 0.44
  return { x: cam.x + (sx - 640) / z, y: cam.y + (sy - 360) / z, scale, look: 'camera', z: 8, floor: null, clip: r, fx: { kind: 'monitor' } }
}

const cast = (id) => ({ ...POSTS[ANALYST[id].post], color: POSTS[ANALYST[id].post].color })

export default {
  defaultShot: 'rmwWall',
  drift: false,
  guests: GUESTS,
  disclaimer: { text: 'Guests are puppets playing posting personas. Parody.', from: 'disclaimer-in', dur: 6 },

  shots: [
    { at: 0, shot: 'rmwWall' },
    { at: 'card-chart', shot: 'rmwFeature', who: 'davidcrespo' },
    { at: 'ticker', shot: 'rmwWall' },
    { at: 'hu-attached', shot: 'rmwFeature', who: 'huwupy' },
    { at: 'globe', shot: 'rmwWall' },
    { at: 'mo-revenue', shot: 'rmwFeature', who: 'moultano' },
    { at: 'everything', shot: 'rmwWall' },
  ],

  setup(show) {
    show.SHOTS.rmwWall = (s) => {
      const place = { larry: { ...DESK, scale: 1, look: 'camera', z: 5, floor: null, seat: 760 } }
      if (s.t < s.at('off-wall') + 0.35) {
        GUESTS.forEach((id, i) => {
          if (s.t >= s.at(ANALYST[id].on)) place[id] = inBox(WALL_CAM, BOX[i])
        })
      }
      return { cam: WALL_CAM, place, audience: 0, set: { chair: false, couch: false, window: false } }
    }
    show.SHOTS.rmwFeature = (s, o = {}) => ({ cam: WALL_CAM, place: { [o.who]: inBox(WALL_CAM, FBOX) }, audience: 0, set: { desk: false, chair: false, couch: false, window: false } })
    // layouts of the cards are fixed: measure them once, on a scratch context
    const ctx = document.createElement('canvas').getContext('2d')
    this.cards = {
      chart: layoutPost(ctx, POSTS.chart, { w: CARD.w, size: 19, image: chartImg, imgH: 300 }),
      attached: layoutPost(ctx, POSTS.attached, { w: CARD.w, size: 26 }),
      revenue: layoutPost(ctx, POSTS.revenue, { w: CARD.w, size: 19, quote: POSTS.chart, image: chartImg, quoteImgH: 196, quoteSize: 14 }),
      question: layoutPost(ctx, POSTS.question, { w: WELL.w, size: 15, compact: true }),
      reply: layoutPost(ctx, POSTS.reply, { w: WELL.w - 24, size: 15, compact: true }),
      answer: layoutPost(ctx, POSTS.answer, { w: WELL.w - 48, size: 15, compact: true }),
    }
  },

  direct(t, show) {
    // set flags are module state: assign every frame
    const feature = !!featured(show, t)
    show.set.desk = !feature
    show.set.chair = false
    show.set.couch = false
    show.set.window = false

    const L = show.puppet('larry')
    if (feature) return
    // Larry: to camera when he talks to us, to the wall when he throws, to the globe when he wants it
    let look = 'camera'
    if (show.between('box-huwupy', 'hu-attached') || show.between('box-moultano', 'mo-revenue')) look = 'left'
    if (show.since('globe-on') > 0.2 && show.since('globe-on') < 1.2) look = 'right'
    if (show.since('question-intro') > 0.4 && t < show.at('off-ticker-one')) look = 'left'
    if (show.since('off-ticker-one') > 0.1 && t < show.at('button')) look = 'right'
    if (show.since('button') > 0.1) look = 'camera'
    L.lookAt(look)
    if (look === 'right' && show.since('off-ticker-one') > 0.1) L.nod(0.14)
    // he flinches as each graphic goes dark
    for (const c of ['off-bell', 'off-arrows', 'off-ticker-two', 'off-wall', 'off-ticker-one', 'globe-off']) {
      const u = show.since(c)
      if (u > 0 && u < 0.35) L.shake(3 * (1 - u / 0.35))
    }
    if (show.since('everything-on') > 0 && show.since('everything-on') < 0.6) L.nod(-0.08)
    if (show.since('globe-off') > 0.3) L.tilt(0.1)
  },

  drawBack(ctx, t, show) {
    const { draw, P } = show
    const feature = !!featured(show, t)
    // the channel's backdrop over the studio
    if (feature) {
      draw.occlude(ctx, draw.rectPath(0, 0, 1280, 720), '#02050a')
      grid(ctx, draw, P, 0, 0, 1280, 720)
    } else {
      const g = ctx.createLinearGradient(780, 0, 900, 0)
      g.addColorStop(0, 'rgba(2,5,10,1)')
      g.addColorStop(1, 'rgba(2,5,10,0)')
      ctx.save()
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 900, 720)
      ctx.restore()
      grid(ctx, draw, P, 0, 0, 800, 720)
    }

    if (feature) {
      analystBox(ctx, FBOX, t, { on: 1 })
      return
    }

    // the globe, behind the desk
    const ga = lit(t, show.at('globe-on'), show.at('globe-off'))
    globe(ctx, GLOBE.x, GLOBE.y, GLOBE.r * (0.6 + 0.4 * Math.min(1, show.since('globe-on') / 0.4)), globeSpin(t, show.at('globe-on')), ga)

    // the wall
    const wallOff = t >= show.at('off-wall')
    const wallFade = wallOff ? lit(t, -1, show.at('off-wall')) : 1
    GUESTS.forEach((id, i) => {
      const on = Math.min(1, Math.max(0, show.since(ANALYST[id].on) / 0.3))
      analystBox(ctx, BOX[i], t, wallOff && wallFade <= 0 ? { outline: true } : { on })
    })

    // everything: arrows pointing at nothing, a bell
    const ea = lit(t, show.at('everything-on'), show.at('off-arrows'))
    if (ea > 0) floatingArrows(ctx, t, show, ea)
    const ba = lit(t, show.at('everything-on'), show.at('off-bell'))
    if (ba > 0) {
      const rings = [show.at('ding-2'), show.at('everything-on') + 0.5]
      let r01 = 0
      for (const r of rings) if (t >= r) r01 = Math.max(r01, Math.exp(-(t - r) * 2.5))
      const swing = 0.28 * r01 * Math.sin((t - rings[0]) * 14) + 0.04 * Math.sin(t * 2.2)
      bell(ctx, BELL.x, BELL.y, BELL.s * (0.7 + 0.3 * ea), swing, ba, r01)
    }
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    const who = featured(show, t)
    const feature = !!who

    if (feature) {
      const c = cast(who)
      analystGlass(ctx, FBOX, t, 1)
      plate(ctx, FBOX.x, FPLATE_Y, FBOX.w, c, { big: true })
      const key = ANALYST[who].post
      const Lc = this.cards[key]
      const from = who === 'davidcrespo' ? show.at('card-chart') : show.at(POSTS[key].lines[0]) - 0.0
      drawPost(ctx, Lc, CARD.x, CARD.y, { lit: wordsLit(show, POSTS[key]), reveal: Math.min(1, (t - from + 0.001) / 0.45) })
    } else {
      // the wall's glass and nameplates
      const wallOff = t >= show.at('off-wall')
      const dimmed = wallOff && lit(t, -1, show.at('off-wall')) <= 0
      GUESTS.forEach((id, i) => {
        const on = Math.min(1, Math.max(0, show.since(ANALYST[id].on) / 0.3))
        if (on > 0 && !dimmed) {
          analystGlass(ctx, BOX[i], t, on)
          parodyTag(ctx, BOX[i].x + 6, BOX[i].y + 6, 9)
        }
        const pa = Math.min(1, Math.max(0, show.since(ANALYST[id].plate) / 0.3))
        if (pa > 0) plate(ctx, BOX[i].x, PLATE_Y, BOX[i].w, cast(id), { alpha: dimmed ? 1 : pa, dim: dimmed })
      })
      this.exchange(ctx, t, show)
    }

    // the tickers
    const t1on = show.at('ticker-on')
    if (t >= t1on) {
      const stop = show.at('off-ticker-one')
      arrowTicker(ctx, T1.y, t - t1on, { h: T1.h, speed: 95, seed: 11, alpha: Math.min(1, (t - t1on) / 0.3), stop: stop - t1on, bare: t >= stop + 0.35 })
      if (t >= stop && t < stop + 0.35) arrowTicker(ctx, T1.y, t - t1on, { h: T1.h, speed: 95, seed: 11, alpha: lit(t, 0, stop), stop: stop - t1on })
    }
    const a2 = lit(t, show.at('everything-on'), show.at('off-ticker-two'))
    if (a2 > 0) arrowTicker(ctx, T2.y, t - show.at('everything-on'), { h: T2.h, speed: -120, seed: 23, alpha: a2 })

    // the header
    const clock = clockAt(show, t)
    header(ctx, t, clock.text, t - clock.at)
    const da = lit(t, show.at('everything-on'), show.at('off-bell'))
    if (da > 0) developing(ctx, 288, 10, 220, 36, t, da)
  },

  /** the exchange in the well: norvid's question, softmacs' reply, norvid's answer */
  exchange(ctx, t, show) {
    const C = this.cards
    const qx = WELL.x, qy = WELL.y
    const ry = qy + C.question.h + 6
    const ay = ry + C.reply.h + 6
    // norvid's name and handle arrive with the line that names them; the text at the cue
    const qHead = show.at('question-intro'), qBody = show.at('card-question')
    if (t >= qHead) {
      const body = t >= qBody
      drawPost(ctx, C.question, qx, qy, { lit: wordsLit(show, POSTS.question), headOnly: !body, reveal: body ? Math.min(1, 0.3 + (t - qBody) / 0.4) : Math.min(1, (t - qHead) / 0.3) })
    }
    const rOn = show.at('card-reply')
    if (t >= rOn) {
      threadLine(ctx, qx + 12, qy + C.question.h, ry + 14, '#9fb4c8')
      drawPost(ctx, C.reply, qx + 24, ry, { lit: wordsLit(show, POSTS.reply), reveal: Math.min(1, (t - rOn) / 0.45) })
    }
    const aHead = show.at('answer-intro'), aBody = show.at('card-answer')
    if (t >= aHead) {
      const body = t >= aBody
      threadLine(ctx, qx + 36, ry + C.reply.h, ay + 14, '#9fb4c8')
      drawPost(ctx, C.answer, qx + 48, ay, { lit: wordsLit(show, POSTS.answer), headOnly: !body, reveal: body ? Math.min(1, 0.3 + (t - aBody) / 0.4) : Math.min(1, (t - aHead) / 0.3) })
    }
  },
}

/** who is featured at t (the rmwFeature shots in the list above), or null for the wall */
function featured(show, t) {
  if (show.between('card-chart', 'ticker')) return 'davidcrespo'
  if (show.between('hu-attached', 'globe')) return 'huwupy'
  if (show.between('mo-revenue', 'everything')) return 'moultano'
  return null
}

/** the session clock: the posting time of whatever is up */
function clockAt(show, t) {
  const marks = [
    [0, '10:35 AM'],
    ['box-huwupy', '12:27 PM'],
    ['box-moultano', '12:38 PM'],
    ['card-question', ' 1:36 PM'],
    ['card-reply', ' 1:46 PM'],
    ['card-answer', ' 1:52 PM'],
  ]
  let cur = { at: -10, text: marks[0][1] }
  for (const [c, text] of marks) {
    const at = show.at(c)
    if (t >= at) cur = { at: c === 0 ? -10 : at, text }
  }
  return cur
}

/** the channel's faint backdrop grid */
function grid(ctx, draw, P, x0, y0, x1, y1) {
  for (let x = x0 + 20; x < x1; x += 40) draw.seg(ctx, x, y0, x, y1, P.blueDim, 0.6, { alpha: 0.12 })
  for (let y = y0 + 20; y < y1; y += 40) draw.seg(ctx, x0, y, x1, y, P.blueDim, 0.6, { alpha: 0.12 })
}

/** Larry's "everything": big arrows, up and down, pointing at nothing */
function floatingArrows(ctx, t, show, a) {
  const r = show.rng(91)
  const spots = [
    [120, 320], [300, 410], [470, 330], [640, 440], [740, 320], [210, 470], [560, 480],
    [850, 260], [905, 400], [835, 470],
  ]
  for (const [x, y] of spots) {
    const dir = r() < 0.5 ? 1 : -1
    const s = r.range(16, 30)
    const ph = r.range(0, 6)
    const bob = Math.sin(t * 3.1 + ph) * 8 * dir
    tri(ctx, x, y - bob, s, dir, dir > 0 ? UP : DOWN, { alpha: a * (0.75 + 0.25 * Math.sin(t * 7 + ph)), width: 2.2, hot: true })
    show.draw.seg(ctx, x, y - bob + dir * s * 0.6, x, y - bob + dir * s * 1.8, dir > 0 ? UP : DOWN, 2, { alpha: a * 0.8 })
  }
}
