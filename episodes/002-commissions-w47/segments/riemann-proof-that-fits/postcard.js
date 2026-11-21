// A real post on a card, lit word by word as it is spoken. The studio's skeetCard types text on by
// characters and has no reply line or date; this segment needs every word lit on its own time,
// a reply line (or a bare REPLY), the date, and the counts, so the card lives here.
//
//   timing(post, show, [lineId, …])   → per token of the post: when it lights and its span
//   postCard(ctx, o)                  → draws the card at (o.x, o.y) top-left, o.scale; returns
//                                       { h, at(i) → [x, y, w] of token i in stage units }
//
// The post's text is shown exactly as posted: paragraphs kept, nothing reworded.
import { label, labelWidth, box, avatar, butterfly, beam, seg, occlude, rectPath, compact, P } from '@late-cluster/show/kit/draw.js'
import { clamp, ease } from '@late-cluster/show/kit/ease.js'

/** the post's tokens, in order, with the paragraph each starts (blank lines kept as gaps) */
export function tokenize(text) {
  const paras = String(text).split('\n')
  const out = []
  let gap = 0
  paras.forEach((p, pi) => {
    const words = p.split(/\s+/).filter(Boolean)
    if (!words.length) {
      gap++
      return
    }
    words.forEach((w, wi) => out.push({ s: w, para: pi, breakBefore: wi === 0 && out.length > 0, gapBefore: wi === 0 ? gap : 0 }))
    gap = 0
  })
  return out
}

/**
 * Map the spoken lines onto the post's tokens: each line's words (its cut marks "…" left out) are
 * matched in order; a token the voice skips is left unlit (the caller lights a cut clause itself).
 * Returns [{ t0, t1 }] per token (Infinity when never spoken).
 */
export function timing(tokens, show, lineIds) {
  const T = tokens.map(() => ({ t0: Infinity, t1: Infinity }))
  let k = 0
  for (const id of lineIds) {
    const L = show.line(id)
    if (!L?.words) continue
    const words = L.words.filter((w) => w[2] !== '…')
    for (let j = 0; j < words.length; j++) {
      const w = words[j]
      let m = k
      while (m < tokens.length && tokens[m].s !== w[2]) m++
      if (m >= tokens.length) {
        show._warn?.(`postcard: "${w[2]}" of ${id} not found on its card`)
        continue
      }
      const next = words[j + 1]
      T[m] = { t0: w[0], t1: Math.max(w[1], next ? next[0] : w[1]) }
      k = m + 1
    }
  }
  return T
}

function replyIcon(x, y, s) {
  const p = new Path2D()
  p.moveTo(x - s * 0.55, y + s * 0.45)
  p.lineTo(x - s * 0.55, y - s * 0.4)
  p.lineTo(x + s * 0.6, y - s * 0.4)
  p.lineTo(x + s * 0.6, y + s * 0.25)
  p.lineTo(x - s * 0.2, y + s * 0.25)
  p.closePath()
  return p
}
function repostIcon(x, y, s) {
  const p = new Path2D()
  const w = s * 0.7, h = s * 0.32
  p.moveTo(x - w, y + h * 0.2)
  p.lineTo(x - w, y - h)
  p.lineTo(x + w * 0.7, y - h)
  p.moveTo(x + w * 0.45, y - h - s * 0.2)
  p.lineTo(x + w * 0.7, y - h)
  p.lineTo(x + w * 0.45, y - h + s * 0.2)
  p.moveTo(x + w, y - h * 0.2)
  p.lineTo(x + w, y + h)
  p.lineTo(x - w * 0.7, y + h)
  p.moveTo(x - w * 0.45, y + h - s * 0.2)
  p.lineTo(x - w * 0.7, y + h)
  p.lineTo(x - w * 0.45, y + h + s * 0.2)
  return p
}
function heartIcon(x, y, s) {
  const p = new Path2D()
  const r = s * 0.3
  p.moveTo(x, y + s * 0.45)
  p.bezierCurveTo(x - s * 0.9, y - s * 0.1, x - r * 1.6, y - s * 0.75, x, y - s * 0.25)
  p.bezierCurveTo(x + r * 1.6, y - s * 0.75, x + s * 0.9, y - s * 0.1, x, y + s * 0.45)
  return p
}

const layoutCache = new Map()

/** wrap the tokens to the text width (cached per card: the measure never changes) */
function layout(ctx, key, tokens, textW, size) {
  const k = `${key}:${textW}:${size}`
  if (layoutCache.has(k)) return layoutCache.get(k)
  const o = { size, ls: 0.04 }
  const space = labelWidth(ctx, ' ', o)
  const lh = size * 1.38
  const pos = []
  let x = 0, row = 0
  tokens.forEach((tk, i) => {
    const w = labelWidth(ctx, tk.s, o)
    if (i > 0 && tk.breakBefore) {
      row += 1 + (tk.gapBefore ? 0.55 : 0)
      x = 0
    } else if (x > 0 && x + space + w > textW) {
      row += 1
      x = 0
    }
    if (x > 0) x += space
    pos.push({ x, row, w })
    x += w
  })
  const out = { pos, rows: (pos.length ? pos[pos.length - 1].row : 0) + 1, lh }
  layoutCache.set(k, out)
  return out
}

/**
 * Draw a post card. o: { key, x, y, w, scale, appear (0..1), name, handle, date, reply (string or
 * null: 'REPLY' or 'REPLY TO @…'), tokens, times ([{t0,t1}] per token), t, color, initials,
 * counts: { replies, reposts, likes }, textSize, lit (extra: (i) → 0..1 forced light), glow (i) }
 */
export function postCard(ctx, o) {
  const s = o.scale ?? 1
  const appear = clamp(o.appear ?? 1)
  if (appear <= 0 || s <= 0) return { h: 0, at: () => null }
  const w = o.w ?? 560
  const pad = 18
  const size = o.textSize ?? 19
  const nx = pad + 58
  const textW = w - nx - pad
  const L = layout(ctx, o.key ?? o.handle, o.tokens, textW, size)
  const replyH = o.reply ? 24 : 0
  const top = pad + 30 + replyH
  const h = top + L.rows * L.lh + 50
  const color = o.color ?? P.bsky
  const e = ease.outCubic(appear)
  ctx.save()
  ctx.translate(o.x, o.y + (1 - e) * 24 * s)
  ctx.scale(s, s)
  const a = Math.min(1, appear * 1.6)
  box(ctx, 0, 0, w, h, { color, radius: 14, width: 1.6, alpha: 0.95 * a, fillAlpha: a })
  avatar(ctx, pad + 22, pad + 22, 22, { color, initials: o.initials ?? (o.name ?? '?').slice(0, 1) })
  label(ctx, o.name, nx, pad + 16, { size: 17, color: P.white, weight: 'm', ls: 0.04, alpha: a })
  const nw = labelWidth(ctx, o.name, { size: 17, weight: 'm', ls: 0.04 })
  label(ctx, `@${o.handle} · ${o.date}`, nx + nw + 10, pad + 16, { size: 13, color: P.blueMid, ls: 0.05, alpha: a })
  if (o.reply) label(ctx, o.reply, nx, pad + 38, { size: 12, color: P.blueMid, ls: 0.12, alpha: a })

  // the text: every word dim until it is said, the word being said in the speaker's colour
  const t = o.t ?? 0
  const lit = o.lit ?? (() => 0)
  const ty = (row) => top + (row + 1) * L.lh - L.lh * 0.28
  o.tokens.forEach((tk, i) => {
    const p = L.pos[i]
    const tm = o.times?.[i] ?? { t0: Infinity, t1: Infinity }
    const forced = clamp(lit(i))
    const said = t >= tm.t0 || forced > 0
    const now = t >= tm.t0 && t < tm.t1
    const col = now ? o.speakColor ?? color : forced > 0 && !(t >= tm.t0) ? o.forcedColor ?? P.amber : P.white
    const x = nx + p.x, y = ty(p.row)
    label(ctx, tk.s, x, y, { size, color: col, ls: 0.04, weight: now ? 'm' : 'l', alpha: a * (said ? 1 : 0.38) })
    if (now) seg(ctx, x, y + 5, x + p.w, y + 5, col, 2, { hot: true, alpha: a })
    const g = clamp(o.glow?.(i) ?? 0)
    if (g > 0) {
      const p2 = new Path2D()
      p2.rect(x - 4, y - size * 0.95, p.w + 8, size * 1.3)
      beam(ctx, p2, o.speakColor ?? color, 2, { hot: true, alpha: g })
    }
  })

  // footer: replies, reposts, likes (the counts at the scrape)
  const fy = h - 22
  const c = o.counts ?? {}
  ;[[replyIcon, c.replies], [repostIcon, c.reposts], [heartIcon, c.likes]].forEach(([fn, n], i) => {
    const ix = nx + i * ((w - nx - pad) / 3) + 8
    beam(ctx, fn(ix, fy, 14), P.blueMid, 1.4, { alpha: a })
    label(ctx, compact(n ?? 0), ix + 16, fy + 5, { size: 14, color: P.blueMid, alpha: a })
  })
  ctx.restore()
  return {
    h: h * s,
    w: w * s,
    at(i) {
      const p = L.pos[i]
      if (!p) return null
      return [o.x + (nx + p.x) * s, o.y + ty(p.row) * s, p.w * s]
    },
  }
}

/** measure a card's height without drawing it */
export function postCardHeight(ctx, o) {
  const w = o.w ?? 560, pad = 18, size = o.textSize ?? 19
  const L = layout(ctx, o.key ?? o.handle, o.tokens, w - (pad + 58) - pad, size)
  return (pad + 30 + (o.reply ? 24 : 0) + L.rows * L.lh + 50) * (o.scale ?? 1)
}

export { occlude, rectPath }
