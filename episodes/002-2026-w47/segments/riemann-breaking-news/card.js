// A real post on a card, lit word by word as it is spoken or read. Copied from
// riemann-proof-that-fits' postcard.js and grown for this segment: an image inside the card
// (davidcrespo's own chart, unaltered), a quoted post set inside a card (moultano's quote of the
// chart post), and a small layout that keeps the handle, date and counts at 14 px when the whole
// post has to sit at the left edge.
//
//   tokenize(text)                     → the post's words, paragraphs kept
//   timing(tokens, show, [lineId, …])  → per token: when it lights and how long it stays the word
//   layoutCard(ctx, post, o)           → a fixed layout (measure once, in setup)
//   drawCard(ctx, L, x, y, d)          → draws it at (x, y) top-left; returns { h, w, at(i) }
//
// The post's text is shown exactly as posted: paragraphs kept, nothing reworded.
import { label, labelWidth, box, avatar, beam, seg, occlude, rectPath, compact, protect, P } from '@late-cluster/show/kit/draw.js'
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
 * matched in order; a token the voice skips is left unlit (the caller lights a cut piece itself).
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
        show._warn?.(`card: "${w[2]}" of ${id} not found on its card`)
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

const META = 14 // handles, dates, reply lines and counts: never smaller than this

/**
 * Lay out a card. post: { name, handle, date, reply, text, counts, color, initials, tokens }.
 * o: { w, textSize, small (no avatar column: name, then handle and date on a row of their own,
 * the text full width), image: { img, ar (h/w), maxH }, quote: { post, o } (a card set inside) }
 */
export function layoutCard(ctx, post, o) {
  const small = !!o.small
  const size = o.textSize ?? 19
  const w = o.w
  const pad = small ? 12 : 16
  const ar = small ? 13 : 21
  const hx = pad + ar * 2 + 12 // the header's x
  const nameSize = small ? 15 : 17
  const nameO = { size: nameSize, weight: 'm', ls: 0.04 }
  const metaO = { size: META, ls: 0.04 }
  const stamp = `@${post.handle} · ${post.date}`
  const nameW = labelWidth(ctx, post.name, nameO)
  const inline = !small && hx + nameW + 10 + labelWidth(ctx, stamp, metaO) <= w - pad
  const nameY = pad + 17
  const stampY = inline ? nameY : nameY + 20
  let y = Math.max(stampY, pad + ar * 2) + 6
  const replyY = post.reply ? y + 14 : null
  if (post.reply) y += 22
  // the text: full width on a small card, beside the avatar column otherwise
  const tx = small ? pad : hx
  const textW = w - tx - pad
  const tO = { size, ls: 0.04 }
  const space = labelWidth(ctx, ' ', tO)
  const lh = size * 1.38
  const pos = []
  let x = 0, row = 0
  post.tokens.forEach((tk, i) => {
    const tw = labelWidth(ctx, tk.s, tO)
    if (i > 0 && tk.breakBefore) {
      row += 1 + (tk.gapBefore ? 0.55 : 0)
      x = 0
    } else if (x > 0 && x + space + tw > textW) {
      row += 1
      x = 0
    }
    if (x > 0) x += space
    pos.push({ x, row, w: tw })
    x += tw
  })
  const rows = (pos.length ? pos[pos.length - 1].row : 0) + 1
  const textTop = y + 4
  y = textTop + rows * lh + 4
  let img = null
  if (o.image) {
    let iw = textW, ih = iw * o.image.ar
    if (ih > o.image.maxH) {
      ih = o.image.maxH
      iw = ih / o.image.ar
    }
    img = { x: tx, y: y + 4, w: iw, h: ih }
    y += ih + 12
  }
  let quote = null
  if (o.quote) {
    const Lq = layoutCard(ctx, o.quote.post, { ...o.quote.o, w: textW })
    quote = { x: tx, y: y + 4, L: Lq }
    y += Lq.h + 12
  }
  const countsY = y + 18
  const h = y + 34
  return { post, o, small, size, w, h, pad, ar, hx, nameY, stampY, inline, nameO, metaO, stamp, nameW, replyY, tx, textTop, lh, pos, img, quote, countsY }
}

/**
 * Draw a laid-out card at (x, y). d: { t, appear 0..1, scale, allLit (a quoted post: every word
 * up), times ([{t0,t1}] per token), lit ((i) → 0..1 forced light), forcedColor, glow ((i) → 0..1),
 * speakColor, image (the HTMLImageElement), alpha }
 */
export function drawCard(ctx, L, x, y, d = {}) {
  const s = d.scale ?? 1
  const appear = clamp(d.appear ?? 1)
  if (appear <= 0 || s <= 0) return { h: 0, w: 0, at: () => null }
  const { post, w, h, pad, ar, hx, size, lh } = L
  const color = post.color ?? P.bsky
  const e = ease.outCubic(appear)
  const a = Math.min(1, appear * 1.6) * (d.alpha ?? 1)
  ctx.save()
  ctx.translate(x, y + (1 - e) * 24 * s)
  ctx.scale(s, s)
  box(ctx, 0, 0, w, h, { color, radius: L.small ? 10 : 14, width: 1.6, alpha: 0.95 * a, fillAlpha: a })
  // a real post's card, counts row included: never under the caption bar
  if (a > 0.05) protect(ctx, 0, 0, w, h)
  if (a > 0.6) avatar(ctx, pad + ar, pad + ar, ar, { color, initials: post.initials ?? (post.name ?? '?').slice(0, 1) })
  label(ctx, post.name, hx, L.nameY, { ...L.nameO, color: P.white, alpha: a })
  label(ctx, L.stamp, L.inline ? hx + L.nameW + 10 : hx, L.stampY, { ...L.metaO, color: P.blueMid, alpha: a })
  if (post.reply) label(ctx, post.reply, L.small ? pad : hx, L.replyY, { size: META, color: P.blueMid, ls: 0.08, alpha: a })

  // the text: every word dim until it is said, the word being said in the speaker's colour
  const t = d.t ?? 0
  const lit = d.lit ?? (() => 0)
  const ty = (row) => L.textTop + (row + 1) * lh - lh * 0.28
  post.tokens.forEach((tk, i) => {
    const p = L.pos[i]
    const tm = d.allLit ? { t0: -Infinity, t1: -Infinity } : d.times?.[i] ?? { t0: Infinity, t1: Infinity }
    const forced = clamp(lit(i))
    const said = t >= tm.t0 || forced > 0
    const now = t >= tm.t0 && t < tm.t1
    const col = now ? d.speakColor ?? color : forced > 0 && !(t >= tm.t0) ? d.forcedColor ?? P.amber : P.white
    const tx = L.tx + p.x, yy = ty(p.row)
    label(ctx, tk.s, tx, yy, { size, color: col, ls: 0.04, weight: now ? 'm' : 'l', alpha: a * (said ? 1 : 0.38) })
    if (now) seg(ctx, tx, yy + 5, tx + p.w, yy + 5, col, 2, { hot: true, alpha: a })
    const g = clamp(d.glow?.(i) ?? 0)
    if (g > 0) {
      const p2 = new Path2D()
      p2.rect(tx - 4, yy - size * 0.95, p.w + 8, size * 1.3)
      beam(ctx, p2, d.speakColor ?? color, 2, { hot: true, alpha: g })
    }
  })

  // the member's own image, whole and unaltered, inside the card
  if (L.img && a > 0.02) {
    const r = L.img
    occlude(ctx, rectPath(r.x, r.y, r.w, r.h), '#000', a)
    const im = d.image
    if (im && im.complete && im.naturalWidth) {
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = a
      ctx.drawImage(im, r.x, r.y, r.w, r.h)
      ctx.restore()
    }
    box(ctx, r.x, r.y, r.w, r.h, { color: P.blueDim, radius: 4, width: 1, fill: null, alpha: a })
  }
  // the post it quoted, set inside
  if (L.quote) drawCard(ctx, L.quote.L, L.quote.x, L.quote.y, { allLit: true, image: d.image, appear: d.appear, alpha: d.alpha })

  // footer: replies, reposts, likes (the counts at the scrape)
  const c = post.counts ?? {}
  const fy = L.countsY
  const step = Math.min(110, (w - L.tx - pad) / 3)
  ;[[replyIcon, c.replies], [repostIcon, c.reposts], [heartIcon, c.likes]].forEach(([fn, n], i) => {
    const ix = L.tx + i * step + 8
    beam(ctx, fn(ix, fy - 5, 14), P.blueMid, 1.4, { alpha: a })
    label(ctx, compact(n ?? 0), ix + 16, fy, { size: META, color: P.blueMid, alpha: a })
  })
  ctx.restore()
  return {
    h: h * s,
    w: w * s,
    at(i) {
      const p = L.pos[i]
      if (!p) return null
      return [x + (L.tx + p.x) * s, y + ty(p.row) * s, p.w * s]
    },
  }
}
