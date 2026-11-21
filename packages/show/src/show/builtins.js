// Built-in "segments" with no audio: the title card (what the gallery screenshot captures), the
// "in production" card for rundown entries that don't exist yet, and the end card with credits.
// They run through the same Show/Stage machinery as real segments.
import { logo } from '../stage/chrome.js'
import { label, labelWidth, seg, box, P, creditsRoll, crow } from '../kit/draw.js'
import { noise1, clamp, unlerp, ease } from '../kit/ease.js'
import { CAST } from '../cast.js'
import { creditLines } from './credits.js'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/** the title card's episode line, e.g. NO. 012 · <TITLE> · 4 DEC 2026 (parts that are missing are left out) */
export function episodeLine(ep) {
  if (!ep) return ''
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ep.airDate ?? '')
  return [
    typeof ep.number === 'number' ? `NO. ${String(ep.number).padStart(3, '0')}` : '',
    ep.title ? String(ep.title).toUpperCase() : '',
    d ? `${Number(d[3])} ${MONTHS[Number(d[2]) - 1]} ${d[1]}` : '',
  ].filter(Boolean).join(' · ')
}

// the episode line sits at x 388 and must end before the mug on Larry's desk (the title shot is fixed)
const EP_X = 388, EP_Y = 478, EP_MAX_W = 352

/**
 * Draw the episode line. A line that fits is drawn exactly as it always was; a longer one (a long
 * title) is set smaller and tighter, and if it still does not fit it breaks at its ' · ' separators
 * into lines stacked upwards from the TONIGHT row, so it never runs under the desk.
 */
export function episodeLineLabel(ctx, ep, epLine) {
  const base = { size: 13, color: P.gold, ls: 0.3, alpha: 0.85 }
  if (labelWidth(ctx, epLine, base) <= EP_MAX_W) return label(ctx, epLine, EP_X, EP_Y, base)
  for (const [size, ls] of [[12, 0.22], [11, 0.16]]) {
    const o = { ...base, size, ls }
    if (labelWidth(ctx, epLine, o) <= EP_MAX_W) return label(ctx, epLine, EP_X, EP_Y, o)
  }
  const o = { ...base, size: 12, ls: 0.2 }
  const parts = epLine.split(' · ')
  const lines = []
  for (const part of parts) {
    const last = lines[lines.length - 1]
    if (last !== undefined && labelWidth(ctx, `${last} · ${part}`, o) <= EP_MAX_W) lines[lines.length - 1] = `${last} · ${part}`
    else lines.push(part)
  }
  lines.forEach((ln, i) => label(ctx, ln, EP_X, EP_Y - (lines.length - 1 - i) * 18, o))
}

export function titleModule(titles = [], ep = null) {
  const epLine = episodeLine(ep)
  return {
    id: 'title',
    title: 'The Late Cluster',
    duration: 1e9,
    cast: ['larry'],
    direct(t, show) {
      show.onAir = false
      show.set.chair = show.set.couch = false
      show.shot('title')
      // Larry idles: mostly to camera, now and then a glance out of the window or down at his cards
      const g = noise1(t * 0.13, 77)
      const L = show.puppet('larry')
      if (g > 0.45) L.lookAt('left')
      else if (g < -0.55) L.lookAt(Math.PI / 2 + 0.55).nod(-0.12)
    },
    drawFront(ctx, t, show) {
      logo(ctx, 92, 262, 0.98, { t })
      // which episode this is, in the TONIGHT header's row, over the second column
      if (epLine) episodeLineLabel(ctx, ep, epLine)
      if (titles.length) {
        label(ctx, 'TONIGHT', 98, 478, { size: 17, color: P.sky, ls: 0.5, weight: 'm' })
        seg(ctx, 98, 490, 330, 490, P.sky, 1.2, { alpha: 0.6 })
        // the whole rundown (eight segments) in two numbered columns, four and four, short titles
        // (before any ':'), ending above the START button (y 632); room for ten at most
        const short = titles.slice(0, 10).map((tt) => String(tt).split(':')[0].trim().toUpperCase())
        const rows = Math.ceil(short.length / 2)
        short.forEach((tt, i) => {
          const col = short.length > 5 ? Math.floor(i / rows) : 0, row = short.length > 5 ? i % rows : i
          const x = 98 + col * 290, y = 514 + row * 22
          label(ctx, String(i + 1).padStart(2, '0'), x, y, { size: 12, color: P.gold, ls: 0.1, alpha: 0.8 })
          label(ctx, tt, x + 28, y, { size: 14, color: P.white, ls: 0.12, alpha: 0.9 })
        })
      }
    },
  }
}

/** a rundown entry with no segment yet */
export function productionModule(title, n) {
  return {
    id: 'production',
    title,
    duration: 2.6,
    cast: [],
    drift: true,
    direct(t, show) {
      show.shot('wide', { band: false })
      show.set.dim = 0.7
      show.onAir = false
    },
    drawFront(ctx, t, show) {
      const a = Math.min(ease.outCubic(clamp(t / 0.4)), 1 - clamp((t - 2.2) / 0.4))
      ctx.save()
      ctx.globalAlpha = 0.88 * a
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, 1280, 720)
      ctx.restore()
      box(ctx, 360, 250, 560, 200, { color: P.amber, cut: 12, width: 1.6, alpha: a })
      label(ctx, `SEGMENT ${String(n).padStart(2, '0')}`, 640, 300, { size: 14, align: 'center', color: P.sky, ls: 0.5, alpha: a })
      label(ctx, String(title).toUpperCase(), 640, 350, { size: 30, align: 'center', color: P.white, ls: 0.2, weight: 'm', alpha: a })
      label(ctx, 'IN PRODUCTION', 640, 400, { size: 16, align: 'center', color: P.amber, ls: 0.45, alpha: a * (0.6 + 0.4 * Math.sin(t * 5)) })
      crow(ctx, 880, 262, { scale: 0.5, perched: true, facing: -1, alpha: a })
    },
  }
}

/**
 * The credits (Article 4, R9): the house cast who appear; the real accounts whose posting personas
 * guest puppets played, by display name and handle (from the cast, including an episode's own
 * cast.js); that every voice is synthesized; the CHIMERA project. `who`: the ids that appear (all
 * if null). Lines are kept short enough for the roll's column (see endModule).
 */
export function credits(who = null) {
  // A cast entry with `plays: '<cast id>'` is another voice of that character: it is not listed
  // itself, and its lines count as the character's (a `plays` naming an id not in the cast is
  // ignored, and the entry is credited normally). See show/credits.js.
  return creditLines(CAST, who)
}

export function endModule(who = null) {
  const lines = credits(who)
  return {
    id: 'end',
    title: 'Good night',
    duration: 1e9,
    cast: ['larry', 'hy', 'al', 'pete', 'dee'],
    direct(t, show) {
      show.shot('wide')
      show.onAir = false
      show.set.dim = 0.55
      // the band plays us out
      show.music = { active: true, beat: t * 2, n: Math.floor(t * 2), phase: (t * 2) % 1, pulse: Math.exp(-((t * 2) % 1) * 4.5), bar: Math.floor(t / 2) }
      show.puppet('larry').nod(0.05 * Math.sin(t * 2))
    },
    drawFront(ctx, t, show) {
      const a = ease.outCubic(clamp(unlerp(0.2, 1.4, t)))
      logo(ctx, 640, 200, 0.62, { t, align: 'center', alpha: a })
      // the credits roll in a column under the logo (and loop)
      // wide enough for a guest's handle in the right-hand column (split 0.44), clear of the band and the desk
      const rect = { x: 370, y: 300, w: 560, h: 270 }
      ctx.save()
      ctx.globalAlpha = 0.75 * a
      ctx.fillStyle = '#000'
      ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
      ctx.restore()
      const speed = 34
      // one loop: the lines' height (creditsRoll: 34 per line, 1.5× for a heading) plus the window
      const total = lines.reduce((h, l) => h + (l?.head ? 51 : 34), 0) + rect.h
      creditsRoll(ctx, lines, (Math.max(0, t - 1) * speed % total) / speed, { rect, speed, split: 0.44 })
    },
  }
}
