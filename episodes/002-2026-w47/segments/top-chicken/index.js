// top-chicken: the direction. Eppy at the sports desk with one board beside him (the `sports`
// shot's panel); Larry throws to him from his own desk at the top. Sibyl reads every real post:
// whenever she speaks, a small monitor in a corner of the board shows her, and the card's words
// light as she says them.
//
// What the board may show (production/research/screen.md, ruling 8, and the script's comments):
// - only Saturday's winner is named (CEE, @cee.wtf); two other scores (440, 366) sit on crowns with
//   no name and no day; nothing counts the week's results or lays them out as a table; the result
//   the screen keeps out is in no form here; the leaderboard below the record line is not drawn;
// - the bot's figures carry SCORED BY A BOT · UNOFFICIAL, its card BOT · UNOFFICIAL RANKINGS.
// Trim (21 November 2026): the play-money market and the guess are cut, and with them their
// board, cards and header; the segment ends on `smallest` and the sting, and the three crowns hold
// on the board, headed TOP CHICKEN, to the last frame.
// Every card's text is one string literal below, the post's exact text (cuts marked with …), and
// it is read aloud in full by the line named beside it. Emoji are drawn as small vector glyphs,
// since the Hershey face has none; the strings keep them.
// Preview: npm run dev -- 002-2026-w47, then /?seg=top-chicken · frames: npm run shoot -- 002-2026-w47 top-chicken 10 20
import { monitor } from '@late-cluster/show/stage/shots.js'

// ---------------------------------------------------------------- the posts on screen

const POSTS = {
  // at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n27n6oxsyk2l · read by line `post`
  win: {
    line: 'post',
    name: 'cee', handle: 'cee.wtf', date: '13 Nov 2026', likes: 222, reposts: 12, replies: 15,
    text: 'i love when people think their laptop somehow uses less power per task than a datacenter',
  },
  // at://did:plc:bty3nc67lteylmmb7hvgxeu5/app.bsky.feed.post/3n2bo6xhuea2e · read by line `recordline`
  record: {
    line: 'recordline',
    name: 'TopChicken 🤖', handle: 'topchicken.bsky.social', date: '14 Nov 2026', likes: 2, reposts: 0, replies: 1,
    text: '… All-time top chicken is still cee.wtf with a score of 6186 to beat. …',
  },
}

// ---------------------------------------------------------------- the board's geometry (stage units)

const PANEL = { x: 520, y: 66, w: 720, h: 418 }
// Sibyl's monitor: bottom-right of the board, or top-left while the bars fill the right
const PIP_BR = { x: 1012, y: 334, w: 206, h: 132 }
const PIP_TL = { x: 548, y: 84, w: 206, h: 132 }

// Sibyl's lines, and the monitor she is in for each
const READS = [
  ['winner', PIP_BR],
  ['post', PIP_BR],
  ['recordline', PIP_TL],
]

// ---------------------------------------------------------------- small helpers

/** the time a line's k-th caption word starts (k < 0 counts from the end) */
function wordT(show, id, k) {
  const w = show.line(id).words
  const i = k < 0 ? w.length + k : k
  return w[i]?.[0] ?? show.at(id)
}

/** the time of the first caption word of a line that starts with `prefix` */
function wordOf(show, id, prefix) {
  const L = show.line(id)
  const w = L.words.find((x) => x[2].toLowerCase().startsWith(prefix.toLowerCase()))
  return w ? w[0] : L.t0
}

const isEmoji = (ch) => /\p{Extended_Pictographic}/u.test(ch)

/** a small vector emoji (the font has none): the robot in the bot's display name */
function emoji(ctx, show, ch, x, y, s, alpha = 1) {
  const { draw, P } = show
  const r = s * 0.5
  const cx = x + s * 0.62, cy = y - s * 0.38
  if (ch === '🤖') {
    const p = draw.rectPath(cx - r, cy - r * 0.8, r * 2, r * 1.75, r * 0.3)
    draw.occlude(ctx, p)
    draw.beam(ctx, p, P.sky, 1.3, { alpha })
    draw.seg(ctx, cx, cy - r * 0.8, cx, cy - r * 1.25, P.sky, 1.2, { alpha })
    draw.dot(ctx, cx, cy - r * 1.3, r * 0.16, P.coral, alpha)
    draw.ring(ctx, cx - r * 0.42, cy - r * 0.05, r * 0.2, P.cyan, 1.2, { alpha })
    draw.ring(ctx, cx + r * 0.42, cy - r * 0.05, r * 0.2, P.cyan, 1.2, { alpha })
    draw.seg(ctx, cx - r * 0.45, cy + r * 0.5, cx + r * 0.45, cy + r * 0.5, P.sky, 1.2, { alpha })
  }
}

/** width of a token as tokenText draws it */
function tokenWidth(ctx, show, tok, o) {
  let w = 0
  for (const part of splitEmoji(tok)) w += part.emoji ? o.size * 1.3 : show.draw.labelWidth(ctx, part.text, o)
  return w
}

function splitEmoji(tok) {
  const out = []
  for (const ch of Array.from(tok)) {
    if (isEmoji(ch)) out.push({ emoji: true, text: ch })
    else if (/[‍️]/.test(ch)) continue
    else if (out.length && !out[out.length - 1].emoji) out[out.length - 1].text += ch
    else out.push({ emoji: false, text: ch })
  }
  return out
}

/** one token, its letters in the Hershey face and its emoji as glyphs */
function tokenText(ctx, show, tok, x, y, o) {
  let cx = x
  for (const part of splitEmoji(tok)) {
    if (part.emoji) {
      emoji(ctx, show, part.text, cx, y, o.size, o.alpha ?? 1)
      cx += o.size * 1.3
    } else {
      show.draw.label(ctx, part.text, cx, y, o)
      cx += show.draw.labelWidth(ctx, part.text, o)
    }
  }
}

function heart(x, y, s) {
  const p = new Path2D()
  p.moveTo(x, y + s * 0.35)
  p.bezierCurveTo(x - s * 0.9, y - s * 0.2, x - s * 0.35, y - s * 0.75, x, y - s * 0.3)
  p.bezierCurveTo(x + s * 0.35, y - s * 0.75, x + s * 0.9, y - s * 0.2, x, y + s * 0.35)
  return p
}
function bubble(x, y, s) {
  const p = new Path2D()
  p.moveTo(x - s * 0.55, y + s * 0.45)
  p.lineTo(x - s * 0.55, y - s * 0.4)
  p.lineTo(x + s * 0.6, y - s * 0.4)
  p.lineTo(x + s * 0.6, y + s * 0.25)
  p.lineTo(x - s * 0.2, y + s * 0.25)
  p.closePath()
  return p
}
function reposts(x, y, s) {
  const p = new Path2D()
  const w = s * 0.7, h = s * 0.32
  p.moveTo(x - w, y + h * 0.2); p.lineTo(x - w, y - h); p.lineTo(x + w * 0.7, y - h)
  p.moveTo(x + w * 0.45, y - h - s * 0.2); p.lineTo(x + w * 0.7, y - h); p.lineTo(x + w * 0.45, y - h + s * 0.2)
  p.moveTo(x + w, y - h * 0.2); p.lineTo(x + w, y + h); p.lineTo(x - w * 0.7, y + h)
  p.moveTo(x - w * 0.45, y + h - s * 0.2); p.lineTo(x - w * 0.7, y + h); p.lineTo(x - w * 0.45, y + h + s * 0.2)
  return p
}

/**
 * A real post's card: display name, handle, date and counts, the exact text, its words lighting as
 * the line that reads it reaches them. c: a POSTS entry + { x, y, w, appear, size, tag, likeTag, keep }
 * (`tag`: a provenance tag top-right; `likeTag`: a tag beside the like count; `keep`: words that stay
 * lit after the reading). Returns the card's height.
 */
function postCard(ctx, show, c) {
  const { draw, P } = show
  const a = show.clamp(c.appear ?? 1)
  if (a <= 0) return 0
  const alpha = Math.min(1, a * 1.6)
  const x = c.x, y = c.y + (1 - show.ease.outCubic(a)) * 36, w = c.w
  const size = c.size ?? 20
  const lh = size * 1.45
  const pad = 18
  const tx = x + pad + 58
  const tw = x + w - pad - tx
  const to = { size, ls: 0.04 }
  const space = size * 0.34
  // lay the words out
  const toks = c.text.split(' ')
  const rows = [[]]
  let cx = 0
  toks.forEach((tok, k) => {
    const ww = tokenWidth(ctx, show, tok, to)
    if (cx > 0 && cx + ww > tw) {
      rows.push([])
      cx = 0
    }
    rows[rows.length - 1].push({ tok, k, dx: cx })
    cx += ww + space
  })
  const head = c.replyTo || c.tag ? 80 : 58
  const h = pad + head + rows.length * lh + 34
  draw.box(ctx, x, y, w, h, { color: P.bsky, radius: 14, width: 1.6, alpha: 0.95 * alpha })
  // a real post's card (and the tag under its likes): never under the caption bar
  draw.protect(ctx, x, y, w, h + (c.likeTag ? 40 : 0))
  draw.avatar(ctx, x + pad + 22, y + pad + 22, 22, { color: P.bsky, initials: c.name.slice(0, 1) })
  // name (emoji drawn), handle · date, and what it replies to
  tokenText(ctx, show, c.name, tx, y + pad + 15, { size: 17, color: P.white, weight: 'm', ls: 0.04, alpha })
  draw.label(ctx, `@${c.handle} · ${c.date}`, tx, y + pad + 36, { size: 13, color: P.blueMid, ls: 0.05, alpha })
  if (c.replyTo) draw.label(ctx, `↳ Reply to @${c.replyTo}`, tx, y + pad + 55, { size: 12, color: P.blueMid, ls: 0.05, alpha })
  draw.butterfly(ctx, x + w - pad - 10, y + pad + 10, 22, P.bsky, { width: 1.2, hot: false, alpha: 0.7 * alpha })
  if (c.tag) tag(ctx, show, c.tag, tx, y + pad + 62, { size: 12, alpha })
  // the words: dim until read, white once said, gold on the word being said
  const L = show.line(c.line)
  rows.forEach((row, i) => {
    const ly = y + pad + head + (i + 1) * lh - lh * 0.3
    for (const { tok, k, dx } of row) {
      let color = P.white
      let wa = alpha * 0.55
      if (L.active) {
        if (k < L.word) wa = alpha
        else if (k === L.word) (color = P.gold), (wa = alpha)
      } else if (L.done) {
        wa = alpha
        if (c.keep?.includes(k)) color = P.gold
      }
      tokenText(ctx, show, tok, tx + dx, ly, { ...to, color, alpha: wa })
    }
  })
  // footer: replies, reposts, likes
  const fy = y + h - 22
  const items = [[bubble, c.replies], [reposts, c.reposts], [heart, c.likes]]
  const step = (x + w - pad - tx) / 3
  items.forEach(([fn, n], i) => {
    const ix = tx + i * step + 8
    draw.beam(ctx, fn(ix, fy, 14), P.blueMid, 1.4, { alpha })
    draw.label(ctx, String(n), ix + 16, fy + 5, { size: 14, color: P.blueMid, alpha })
  })
  // a tag under the like count, outside the card
  if (c.likeTag) {
    const hx = tx + 2 * step + 8
    draw.seg(ctx, hx, y + h + 2, hx, y + h + 12, P.gold, 1.2, { alpha })
    tag(ctx, show, c.likeTag, hx + 30, y + h + 34, { size: 13, color: P.gold, alpha, align: 'right' })
  }
  return h
}

/** a small framed tag: a glance, never a sentence */
function tag(ctx, show, text, x, y, o = {}) {
  const { draw, P } = show
  const size = o.size ?? 13
  const color = o.color ?? P.amber
  const tw = draw.labelWidth(ctx, text, { size, ls: 0.2 }) + 20
  const bx = o.align === 'right' ? x - tw : o.align === 'center' ? x - tw / 2 : x
  draw.box(ctx, bx, y - size - 6, tw, size + 14, { color, cut: 5, width: 1.2, alpha: o.alpha })
  draw.label(ctx, text, bx + 10, y + 1, { size, color, ls: 0.2, alpha: o.alpha })
}

/** how far a card has come in (0..1); it leaves over the 0.3 s before `out`, so it is gone by then */
function cardIn(show, from, out) {
  const t = show.t
  if (t < show.at(from) || t >= show.at(out)) return 0
  return Math.min(show.progress(from, 0.45), 1 - show.progress(show.at(out) - 0.3, 0.3))
}

// ---------------------------------------------------------------- the module

export default {
  defaultShot: 'desk',
  autoPanel: false,

  setup(show) {
    // the sports desk with Sibyl's monitor in a corner of the board while she reads
    show.SHOTS['tc-desk'] = (s, o = {}) => {
      const L = s.SHOTS.sports(s, { ...o, reader: undefined })
      if (o.reader) monitor(L, 'sibyl', o.reader, { label: 'Sibyl', live: false, noStand: true, look: 'camera' })
      return L
    }
  },

  direct(t, show) {
    // Larry at his desk for the throw; the whoosh, then the sports desk for the rest
    if (t < show.at('desk-in')) {
      show.shot('desk')
      if (show.since(wordT(show, 'throw', -1)) > -0.2) show.puppet('larry').lookAt('left')
      return
    }
    const read = READS.find(([id]) => show.between(show.at(id) - 0.45, show.at(`${id}.end`) + 0.45))
    // the card of a post stays up through its reading, so the monitor does too
    const card = show.between('card-post-in', 'card-post-out') ? PIP_BR : null
    show.shot('tc-desk', { reader: read?.[1] ?? card ?? undefined })

    // Eppy: to us when he talks, at the board when something lands on it or Sibyl reads
    const eppy = show.puppet('eppy')
    const glance = [
      [wordT(show, 'field', 1), 0.9],
      [wordT(show, 'winner', -1), 1.2],
      [wordT(show, 'gap', 3), 0.9],
      [wordOf(show, 'recordline', 'cee.wtf'), 0.9],
    ].some(([at, d]) => t >= at && t < at + d)
    const sibylReads = READS.some(([id]) => show.line(id).active)
    eppy.lookAt(glance || sibylReads ? 'right' : 'camera')
    // the punch: a small nod late in the line
    if (show.line('trails').active && show.line('trails').progress > 0.6) eppy.nod(-0.06)
    // "Same title.": a small nod on the last words, held through the sting
    if (t >= wordOf(show, 'smallest', 'Same')) eppy.nod(-0.05 * show.ease.inOutCubic(show.progress(wordOf(show, 'smallest', 'Same'), 0.4)))

    show.chyron('eppy', { from: show.at('desk-in') + 0.4, dur: 3.6 })
  },

  drawBack(ctx, t, show) {
    const { draw, P } = show
    if (t < show.at('desk-in')) return
    const orange = show.puppet('eppy').color
    // the board, with its one header
    const header = 'TOP CHICKEN'
    const hcolor = orange
    const appear = show.progress('desk-in', 0.35)
    draw.panel(ctx, PANEL, { color: hcolor, appear })
    // the header tab sits at the right end, clear of the studio's LAUGH sign over the left
    if (appear > 0.6) {
      const tw = draw.labelWidth(ctx, header, { size: 16, ls: 0.2 }) + 30
      const hx = PANEL.x + PANEL.w - 20 - tw
      draw.box(ctx, hx, PANEL.y - 14, tw, 28, { color: hcolor, cut: 6, width: 1.5 })
      draw.label(ctx, header, hx + 15, PANEL.y + 6, { size: 16, ls: 0.2, color: P.white, weight: 'm' })
    }

    this.results(ctx, t, show)
  },

  /** the results board: the chicken, the counter, the winner, the bars, the crowns */
  results(ctx, t, show) {
    const { draw, P } = show
    const cardUp = show.between('card-post-in', show.at('card-post-out') + 0.3) || show.between('card-record-in', show.at('titles-in') + 0.3)

    // the game's chicken, crowned, until the numbers come
    if (t < show.at('counter-in')) draw.chicken(ctx, 880, 330, { scale: 2.1, crown: true, bob: t * 0.6 })

    // the scorer's tag, on the bot's figures whenever no card is up
    if (t >= show.at('scorer-tag') && !cardUp) tag(ctx, show, 'SCORED BY A BOT · UNOFFICIAL', PANEL.x + 28, PANEL.y + PANEL.h - 34, { size: 14, alpha: show.progress('scorer-tag', 0.3) })

    // Saturday: the counter, and the winner
    if (show.between('counter-in', 'card-post-in')) {
      const x = 560
      draw.label(ctx, 'SATURDAY', x, 132, { size: 18, color: P.sky, ls: 0.25, alpha: show.progress('counter-in', 0.3) })
      const tPosts = wordT(show, 'field', 1)
      const tOne = wordT(show, 'field', 3)
      const tWinner = wordT(show, 'field', 4)
      if (t >= tPosts - 0.1) {
        // the one roll: 2,648 posts down to 1 winner, landing on "winner"
        const u = show.ease.inOutCubic(show.clamp(show.unlerp(tOne, tWinner + 0.15, t)))
        const n = Math.max(1, Math.round(2648 + (1 - 2648) * u))
        draw.glowText(ctx, n.toLocaleString('en-US'), x, 218, { size: 66, color: P.white, weight: 'm', ls: 0.06, glow: 0.4 })
        // no unit while the number moves: every frame in between would be a false count
        if (u <= 0 || u >= 1) draw.label(ctx, u >= 1 ? 'WINNER' : 'POSTS', x + 2, 252, { size: 20, color: u >= 1 ? P.gold : P.sky, ls: 0.25 })
      }
      if (t >= wordT(show, 'field', 2)) draw.label(ctx, '245 OF 760 PEOPLE POSTED', x + 2, 300, { size: 15, color: P.sky, ls: 0.2 })
      // the winner: blank cells from the cue, the name lands on the word
      if (t >= show.at('winner-in')) {
        const land = wordT(show, 'winner', -1) - 0.3
        draw.splitFlap(ctx, 880, 236, 'CEE', { age: t - land, size: 60 })
        if (t >= land + 0.4) draw.label(ctx, '@cee.wtf', 882, 270, { size: 20, color: P.white, ls: 0.06 })
        const tScore = wordT(show, 'score', 0)
        if (t >= tScore - 0.05) draw.glowText(ctx, '201 LIKES', 882, 322, { size: 30, color: P.gold, weight: 'm', ls: 0.12, glow: 0.3 * show.window(t, tScore, tScore + 1.2, 0.3) + 0.1 })
      }
    }

    // the record and the gap: two bars to one scale
    if (show.between('bars-in', show.at('titles-in') + 0.5)) {
      const base = 440, H = 300
      // centred, then aside for the record's card
      const dx = show.tween(t, show.at('card-record-in') - 0.1, show.at('card-record-in') + 0.5, -110, 0, show.ease.inOutCubic)
      const collapse = 1 - show.progress(show.at('titles-in'), 0.45)
      const grow = show.ease.outCubic(show.progress('bars-in', 0.9)) * collapse
      const bw = 62
      const xa = 1012 + dx, xb = 1128 + dx
      const ha = Math.max(2, H * (201 / 6186) * grow), hb = H * grow
      draw.box(ctx, xa, base - ha, bw, ha, { color: P.gold, width: 1.6, hot: true })
      draw.box(ctx, xb, base - hb, bw, hb, { color: P.sky, width: 1.6 })
      for (let k = 7; k < hb - 2; k += 7) draw.seg(ctx, xb + 4, base - k, xb + bw - 4, base - k, P.sky, 0.8, { alpha: 0.22 })
      draw.seg(ctx, xa - 26, base, xb + bw + 20, base, P.blueMid, 1.2)
      if (collapse > 0.5) {
        draw.label(ctx, '201', xa + bw / 2, base - ha - 10, { size: 20, align: 'center', color: P.gold })
        draw.label(ctx, '6,186', xb + bw / 2, base - hb - 12, { size: 22, align: 'center', color: P.sky })
        draw.label(ctx, 'CEE', xa + bw / 2, base + 26, { size: 18, align: 'center', color: P.gold, ls: 0.2 })
        // the tall bar's holder: a question mark until the reading says the name
        const named = wordOf(show, 'recordline', 'cee.wtf')
        draw.splitFlap(ctx, xb + bw / 2 - (t >= named - 0.25 ? 37 : 12), base + 34, t >= named - 0.25 ? 'CEE' : '?', { age: t >= named - 0.25 ? t - (named - 0.25) : 10, size: 18, color: t >= named - 0.25 ? P.gold : P.sky })
        // the gap, on "5,985"
        const tGap = wordT(show, 'gap', 3)
        if (t >= tGap - 0.1) {
          const u = show.ease.outCubic(show.progress(tGap - 0.1, 0.5))
          const top = base - hb, bot = base - ha - 32
          const gx = xa + bw / 2
          draw.seg(ctx, gx - 10, top, xb, top, P.coral, 1, { dash: [5, 5], alpha: 0.8 })
          draw.seg(ctx, gx, top, gx, top + (bot - top) * u, P.coral, 1.6, { hot: true })
          draw.seg(ctx, gx - 8, top, gx + 8, top, P.coral, 1.6)
          if (u > 0.95) draw.seg(ctx, gx - 8, bot, gx + 8, bot, P.coral, 1.6)
          const gone = show.progress(show.at('card-record-in') - 0.2, 0.3)
          if (gone < 1) draw.label(ctx, '5,985', gx - 16, (top + bot) / 2 + 8, { size: 24, align: 'right', color: P.coral, weight: 'm', alpha: u * (1 - gone) })
        }
      }
    }

    // during the laugh, unspoken: the share, held 2.4 s (it stays over the crowns)
    if (show.between('share-tag', show.at('share-tag') + 2.4)) tag(ctx, show, '201 ÷ 6,186 = 3.2 %', 562, 170, { color: P.gold, size: 18, alpha: show.progress('share-tag', 0.3) })

    // the crowns: identical, two with a score and nothing else, one gold with the name
    if (t >= show.at('titles-in') + 0.35) {
      const crowns = [
        { x: 690, text: '440', color: P.sky },
        { x: 880, text: 'CEE 201', color: P.gold },
        { x: 1070, text: '366', color: P.sky },
      ]
      crowns.forEach((c, i) => {
        const u = show.progress(show.at('titles-in') + 0.4 + i * 0.22, 0.45)
        if (u <= 0) return
        const e = show.ease.outBack(u)
        draw.crown(ctx, c.x, 260 + (1 - e) * 30, 2.6, { color: c.color, alpha: Math.min(1, u * 2) })
        draw.label(ctx, c.text, c.x, 350, { size: 26, align: 'center', color: c.color, weight: 'm', ls: 0.12, alpha: Math.min(1, u * 2) })
      })
    }
  },

  drawFront(ctx, t, show) {
    if (t < show.at('desk-in')) return
    const big = { x: 548, y: 96, w: 446, size: 22 }
    // Saturday's winning post
    postCard(ctx, show, { ...POSTS.win, ...big, appear: cardIn(show, 'card-post-in', 'card-post-out'), likeTag: '201 AT THE RESULT' })
    // the result post's record line, beside the bars
    postCard(ctx, show, { ...POSTS.record, x: 548, y: 236, w: 420, size: 20, appear: cardIn(show, 'card-record-in', 'titles-in'), tag: 'BOT · UNOFFICIAL RANKINGS' })
  },
}
