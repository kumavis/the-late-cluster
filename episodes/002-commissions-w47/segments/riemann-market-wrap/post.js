// The real posts of riemann-market-wrap, and a post card that lights its words as they are read.
//
// Every text here is the post's exact text (looked up by address in the week's scrape, never
// retyped from memory); softmacs' reply is cut once, at the end, with an ellipsis, as the script
// reads it. Times are the posts' own, in Eastern (EST, the chart's own clock). Counts are the
// counts at the scrape (production/sources.json).
import { label, labelWidth, box, occlude, rectPath, seg, avatar, P } from '@late-cluster/show/kit/draw.js'

const DATE = 'Nov 20, 2026'

export const POSTS = {
  chart: {
    uri: 'at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z',
    name: 'conputer dipshit',
    handle: 'davidcrespo.bsky.social',
    time: '10:35 AM',
    text: "isn't it beautiful that we now live in a world where we can say the market values the capability to solve the Riemann Hypothesis at negative 80 billion dollars",
    replies: 23, reposts: 144, likes: 889,
    lines: ['dc-chart'],
    color: '#7cc4ff',
    image: true,
  },
  attached: {
    uri: 'at://did:plc:vw4e7blkwzdokanwp24k3igr/app.bsky.feed.post/3n2r4auppc22r',
    name: '🍁 thankful frood 🦃',
    handle: 'huwupy.kawaii.social',
    time: '12:27 PM',
    text: 'wow the stock market was really attached to the riemann hypothesis being unsolved huh',
    replies: 1, reposts: 1, likes: 21,
    lines: ['hu-attached'],
    color: '#ff4d6a',
  },
  revenue: {
    uri: 'at://did:plc:h25avmes6g7fgcddc3xj7qmg/app.bsky.feed.post/3n2r4vqpsh22m',
    name: 'Ryan Moulton',
    handle: 'moultano.bsky.social',
    time: '12:38 PM',
    text: 'The market anticipates a sharp loss of revenue from all the mathematicians who had been working on the Reimann hypothesis.',
    replies: 3, reposts: 1, likes: 71,
    lines: ['mo-revenue'],
    color: '#ee7dff',
    quote: 'chart',
  },
  // norvid's own text only: the post it quoted is not shown (terms for the card)
  question: {
    uri: 'at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2ra5ljyu22n',
    name: 'norvid_studies',
    handle: 'norvid-studies.bsky.social',
    time: '1:36 PM',
    text: "this is kind of confusing to me as 'caused' by the riemann result. plausibly just unrelated? but I don't understand the stock market",
    replies: 10, reposts: 1, likes: 41,
    lines: ['question'],
    color: '#9fb4c8',
  },
  // cut once, at the end: what is cut repeats the conclusion the post opens with
  reply: {
    uri: 'at://did:plc:67pspyujjjy6zrzdlbbd4pjy/app.bsky.feed.post/3n2raopv4o226',
    name: 'softmacs',
    handle: 'softmacs.bsky.social',
    time: '1:46 PM',
    text: 'Probably mostly unrelated. The rest of tech stocks were down yesterday afaik and I doubt that most investors see the Riemann announcement as meaningfully different than all of the other math announcements earlier this year …',
    replies: 2, reposts: 0, likes: 5,
    lines: ['reply-1', 'reply-2', 'reply-3', 'reply-4'],
    color: '#9fb4c8',
    replyTo: 'norvid-studies.bsky.social',
  },
  answer: {
    uri: 'at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2razdrepc2l',
    name: 'norvid_studies',
    handle: 'norvid-studies.bsky.social',
    time: '1:52 PM',
    text: 'yeah probably just broader market sloshing',
    replies: 0, reposts: 0, likes: 0,
    lines: ['answer'],
    color: '#9fb4c8',
    replyTo: 'softmacs.bsky.social',
  },
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`
export const countsOf = (p) => `${plural(p.replies, 'reply', 'replies')}   ${plural(p.reposts, 'repost', 'reposts')}   ${plural(p.likes, 'like', 'likes')}`
export const stampOf = (p) => `@${p.handle} · ${DATE}, ${p.time} EST`

/** how many of the post's words have been said so far (Infinity when it is not read in this segment) */
export function wordsLit(show, post) {
  if (!post.lines?.length) return Infinity
  let n = 0
  for (const id of post.lines) {
    const L = show.line(id)
    if (!L) continue
    if (L.done) n += L.words.length
    else if (L.active && L.word >= 0) n += L.word + 1
  }
  return n
}

/** wrap text into lines of words: [[{ w, x }...]...] */
function wrapWords(ctx, text, maxW, o) {
  const space = labelWidth(ctx, ' ', o)
  const lines = []
  let cur = [], x = 0
  for (const w of text.split(/\s+/)) {
    const ww = labelWidth(ctx, w, o)
    if (cur.length && x + ww > maxW) {
      lines.push(cur)
      cur = []
      x = 0
    }
    cur.push({ w, x })
    x += ww + space
  }
  if (cur.length) lines.push(cur)
  return lines
}

/** the post text, word by word: the words said so far bright, the rest dim but legible */
function postText(ctx, lines, x, y, lh, size, lit, color) {
  let k = 0
  lines.forEach((ln, i) => {
    for (const { w, x: wx } of ln) {
      const on = k < lit
      label(ctx, w, x + wx, y + i * lh, { size, color: on ? P.white : color, alpha: on ? 1 : 0.62, ls: 0.04 })
      k++
    }
  })
}

/**
 * Lay out a post card. o: { w, size (text), compact (one header row with the counts on it, no
 * avatar), imgH (max image height), image (an HTMLImageElement or null), quote (a post, drawn
 * nested) }. Returns { h, … } for drawPost.
 */
export function layoutPost(ctx, post, o) {
  const size = o.size ?? 18
  const compact = !!o.compact
  const pad = compact ? 10 : 16
  const indent = compact ? 0 : 52
  const tw = o.w - pad * 2 - indent
  const tOpts = { size, ls: 0.04 }
  const lines = wrapWords(ctx, post.text, tw, tOpts)
  const lh = size * 1.36
  const headH = compact ? 26 : 40
  // compact: the counts sit on the header row when they fit there, else on a row of their own
  const meta = { size: o.metaSize ?? 14, ls: 0.04 }
  const nameW = labelWidth(ctx, post.name, { size: 15, weight: 'm', ls: 0.03 })
  const countsOwnRow = compact && nameW + 10 + labelWidth(ctx, stampOf(post), meta) + 24 + labelWidth(ctx, countsOf(post), meta) > o.w - pad * 2
  let h = pad + headH + lines.length * lh
  let img = null
  if (o.image && post.image) {
    const ar = 1160 / 1538
    let iw = tw, ih = iw * ar
    if (ih > o.imgH) {
      ih = o.imgH
      iw = ih / ar
    }
    img = { y: h + 6, w: iw, h: ih }
    h += ih + 12
  }
  let quote = null
  if (o.quote) {
    quote = { y: h + 6, L: layoutPost(ctx, o.quote, { w: tw, size: o.quoteSize ?? 14, compact: true, image: o.image, imgH: o.quoteImgH ?? 200 }) }
    h += quote.L.h + 12
  }
  h += compact ? pad * 0.6 + (countsOwnRow ? 20 : 0) : 34
  return { post, o, size, pad, indent, tw, lines, lh, headH, h, img, quote, compact, meta, countsOwnRow }
}

/**
 * Draw a laid-out post at (x, y). d: { lit (words said), reveal 0..1 (a wipe from the top), alpha,
 * headOnly (only the header row: the name and handle ahead of the body) }.
 */
export function drawPost(ctx, L, x, y, d = {}) {
  const { post, o, pad, indent, size, lh, headH, compact, meta, countsOwnRow } = L
  const reveal = d.reveal ?? 1
  if (reveal <= 0) return
  const h = d.headOnly ? pad + headH + 6 : L.h
  const color = o.color ?? post.color ?? P.sky
  ctx.save()
  ctx.beginPath()
  ctx.rect(x - 4, y - 4, o.w + 8, (h + 8) * reveal)
  ctx.clip()
  box(ctx, x, y, o.w, h, { color, radius: compact ? 8 : 12, width: compact ? 1.2 : 1.6, alpha: 0.95 * (d.alpha ?? 1) })
  const nx = x + pad + indent
  const hy = y + pad + (compact ? 12 : 16)
  if (!compact) avatar(ctx, x + pad + 22, y + pad + 22, 21, { color, initials: post.handle[0] })
  const nSize = compact ? 15 : 18
  label(ctx, post.name, nx, hy, { size: nSize, color: P.white, weight: 'm', ls: 0.03 })
  const nw = labelWidth(ctx, post.name, { size: nSize, weight: 'm', ls: 0.03 })
  label(ctx, stampOf(post), nx + nw + 10, hy, { size: compact ? meta.size : 14, color: P.sky, ls: 0.04 })
  if (compact && !countsOwnRow) label(ctx, countsOf(post), x + o.w - pad, hy, { ...meta, align: 'right', color: P.sky })
  else if (post.replyTo) label(ctx, `replying to @${post.replyTo}`, nx, hy + 20, { size: 12, color: P.blueMid, ls: 0.04 })
  if (!d.headOnly) {
    const ty = y + pad + headH + size * 0.95
    postText(ctx, L.lines, nx, ty, lh, size, d.lit ?? Infinity, P.sky)
    if (L.img) {
      const im = o.image
      const ix = nx, iy = y + L.img.y
      occlude(ctx, rectPath(ix, iy, L.img.w, L.img.h))
      if (im && im.complete && im.naturalWidth) {
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
        ctx.drawImage(im, ix, iy, L.img.w, L.img.h)
        ctx.restore()
      }
      box(ctx, ix, iy, L.img.w, L.img.h, { color: P.blueDim, radius: 6, width: 1, fill: null })
    }
    if (L.quote) drawPost(ctx, L.quote.L, nx, y + L.quote.y, { lit: Infinity })
    if (!compact) label(ctx, countsOf(post), nx, y + L.h - 14, { size: 15, color: P.sky, ls: 0.06 })
    else if (countsOwnRow) label(ctx, countsOf(post), x + o.w - pad, y + L.h - 10, { ...meta, align: 'right', color: P.sky })
  }
  ctx.restore()
}

/** a thread line from one card's avatar column down to the next */
export function threadLine(ctx, x, y0, y1, color, alpha = 1) {
  seg(ctx, x, y0, x, y1, color, 1.4, { alpha: 0.7 * alpha })
}
