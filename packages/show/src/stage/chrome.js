// Broadcast chrome drawn on the stage (stage units): the show logo, lower-third chyrons, the
// caption bar.
import { STAGE_TEXT } from './text.js'
import { CAP, LAUGH, breakLines, pageStart, wrapWidth, captionBox, laughBox, barRect, laughRect } from './caption-layout.js'
import { beam, seg, ring, dot, label, labelWidth, wrapLabel, box, occlude, rectPath, butterfly, glowText, P, mix } from '../kit/draw.js'
import { clamp, ease, smoothstep, rng } from '../kit/ease.js'
import { confetti } from '../kit/props.js'

// ---------------------------------------------------------------- the logo

const EMBLEM = (() => {
  const r = rng('emblem')
  const nodes = []
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + r.range(-0.2, 0.2)
    const d = i === 0 ? 0 : r.range(0.45, 0.95)
    nodes.push([Math.cos(a) * d, Math.sin(a) * d])
  }
  const edges = []
  for (let i = 1; i < 9; i++) {
    edges.push([0, i])
    edges.push([i, i === 8 ? 1 : i + 1])
  }
  edges.push([2, 6], [3, 7])
  return { nodes, edges }
})()

/** the cluster emblem: a ring of linked nodes (a moon, a network, a mic grille — take your pick) */
export function emblem(ctx, x, y, r, t = 0, color = P.gold, o = {}) {
  ring(ctx, x, y, r, color, 1.8, { hot: true, alpha: o.alpha })
  ring(ctx, x, y, r * 1.12, color, 0.9, { alpha: 0.4 * (o.alpha ?? 1) })
  const p = new Path2D()
  for (const [a, b] of EMBLEM.edges) {
    const A = EMBLEM.nodes[a], B = EMBLEM.nodes[b]
    p.moveTo(x + A[0] * r * 0.82, y + A[1] * r * 0.82)
    p.lineTo(x + B[0] * r * 0.82, y + B[1] * r * 0.82)
  }
  beam(ctx, p, color, 1, { alpha: 0.55 * (o.alpha ?? 1) })
  EMBLEM.nodes.forEach(([nx, ny], i) => dot(ctx, x + nx * r * 0.82, y + ny * r * 0.82, r * (i === 0 ? 0.09 : 0.06), i % 3 === 0 ? P.sky : color, (0.6 + 0.4 * Math.sin(t * 2 + i * 1.7)) * (o.alpha ?? 1)))
}

/**
 * THE LATE CLUSTER / with Larry Nx. (x, y) = left end of the CLUSTER baseline; s = scale (1 ≈ 600
 * stage units wide). o: { alpha, t, sub (false to omit "with Larry Nx"), align: 'left'|'center' }
 */
export function logo(ctx, x, y, s = 1, o = {}) {
  const t = o.t ?? 0
  const a = o.alpha ?? 1
  if (a <= 0) return
  const big = 104 * s
  const w = labelWidth(ctx, 'CLUSTER', { size: big, weight: 'm', ls: 0.06 })
  if (o.align === 'center') x -= w / 2
  ctx.save()
  ctx.globalAlpha = a
  // THE LATE, letter-spaced over the left of CLUSTER
  glowText(ctx, 'THE LATE', x + 4 * s, y - big * 0.92, { size: 34 * s, color: P.sky, ls: 0.62, weight: 'm', alpha: a, glow: 0.5 })
  // the emblem sits on the right of THE LATE
  emblem(ctx, x + w - 44 * s, y - big * 1.06, 30 * s, t, P.gold, { alpha: a })
  glowText(ctx, 'CLUSTER', x, y, { size: big, weight: 'm', color: P.gold, ls: 0.06, alpha: a, glow: 0.9 })
  // a scan line under it
  const sw = w * clamp(o.sweep ?? 1)
  seg(ctx, x, y + 16 * s, x + sw, y + 16 * s, P.gold, 2 * s, { hot: true, alpha: a })
  seg(ctx, x, y + 24 * s, x + sw * 0.7, y + 24 * s, P.goldMid, 1 * s, { alpha: 0.6 * a })
  if (o.sub !== false) {
    ctx.save()
    ctx.translate(x + w - 4 * s, y + 66 * s)
    ctx.transform(1, 0, -0.22, 1, 0, 0)
    glowText(ctx, 'with Larry Nx', 0, 0, { size: 40 * s, color: P.white, align: 'right', ls: 0.06, alpha: a, glow: 0.4 })
    ctx.restore()
  }
  ctx.restore()
}

// ---------------------------------------------------------------- lower thirds

/**
 * A chyron: name + title/handle, slides in from the left. c = { name, title, handle, color }, u
 * from the show: { inU (0..1 in), outU (0..1 out) }; y = top of the bar.
 */
export function chyron(ctx, c, inU, outU, y = 520) {
  const a = ease.outCubic(clamp(inU)) * (1 - ease.inCubic(clamp(outU)))
  if (a <= 0.001) return
  const color = c.color ?? P.sky
  const name = String(c.name ?? '').toUpperCase()
  const sub = String(c.title ?? '').toUpperCase()
  const handle = c.handle ?? ''
  const nw = labelWidth(ctx, name, { size: 34, weight: 'm', ls: 0.1 })
  const sw = labelWidth(ctx, sub + (handle ? '   ' + handle : ''), { size: 15, ls: 0.18 })
  const w = Math.max(nw + (c.parody ? labelWidth(ctx, 'PUPPET · PARODY', { size: 11, ls: 0.22 }) + 40 : 0), sw) + 120
  const x = 56 - (1 - a) * (w + 80)
  box(ctx, x, y, w, 88, { color, cut: 12, width: 1.6, alpha: 0.95 })
  // accent stripe and the butterfly
  seg(ctx, x + 14, y + 14, x + 14, y + 74, color, 4, { hot: true })
  butterfly(ctx, x + w - 34, y + 30, 26, color, { width: 1.3 })
  label(ctx, name, x + 34, y + 44, { size: 34, weight: 'm', color: P.white, ls: 0.1 })
  label(ctx, sub, x + 36, y + 72, { size: 15, color, ls: 0.18 })
  if (c.parody) {
    // these are puppets playing real accounts' posting personas, and the show says so
    const tx = x + 34 + nw + 18, tw = labelWidth(ctx, 'PUPPET · PARODY', { size: 11, ls: 0.22 }) + 16
    box(ctx, tx, y + 23, tw, 22, { color: P.amber, cut: 4, width: 1.1 })
    label(ctx, 'PUPPET · PARODY', tx + 8, y + 38, { size: 11, color: P.amber, ls: 0.22 })
  }
  if (handle) label(ctx, handle, x + 36 + labelWidth(ctx, sub + '   ', { size: 15, ls: 0.18 }), y + 72, { size: 15, color: mix(color, '#ffffff', 0.4), ls: 0.06 })
}

// ---------------------------------------------------------------- captions

/**
 * The caption bar: speaker's name in their colour, then the line with the word being said lit.
 * cap = show.captionNow; lift raises it (above a ticker lane or the disclaimer); s scales the whole
 * bar about its bottom edge (stage/caption-layout.js: 1 is the show's own size).
 */
export function caption(ctx, cap, lift = 0, s = 1) {
  const lay = captionLayout(ctx, cap, lift, s)
  if (lay) drawCaption(ctx, cap, lay)
}

/**
 * Where the caption bar goes and what it shows, without drawing it (null when it is not drawn):
 * { L (captionBox), area (barRect), shown, widths, space, o, tagO, name, wi, s }. `widths` caches
 * token widths by scale across calls (pass the same Map for the same line).
 */
export function captionLayout(ctx, cap, lift = 0, s = 1, widths = null) {
  if (!cap || cap.alpha <= 0.01) return null
  const tokens = cap.words?.length ? cap.words.map((w) => w[2]) : String(cap.text).split(/\s+/)
  const o = { size: CAP.size * s, ls: 0.06 }
  // break into lines (the wrap width is in stage units whatever the scale)
  let m = widths?.get(s)
  if (!m) {
    m = { space: labelWidth(ctx, ' ', o), tw: tokens.map((tok) => labelWidth(ctx, tok, o)) }
    widths?.set(s, m)
  }
  const { space, tw } = m
  const lines = breakLines(tw, space, wrapWidth(s)).map((l) => l.map((i) => ({ tok: tokens[i], i, w: tw[i] })))
  // show two lines at a time: the pair holding the current word
  const wi = cap.word < 0 ? 0 : cap.word
  const first = pageStart(lines.map((l) => l.map((x) => x.i)), wi, cap.done)
  const shown = lines.slice(first, first + 2)
  const lw = shown.map((l) => l.reduce((sum, x, k) => sum + x.w + (k ? space : 0), 0))
  const maxw = Math.max(...lw)
  const name = String(cap.name ?? '').toUpperCase()
  const tagO = { size: 14 * s, weight: 'm', ls: 0.2 }
  const nameW = name ? labelWidth(ctx, name, tagO) : 0
  const L = captionBox(shown.length, maxw, nameW, lift, s)
  return { L, area: barRect(L, s), shown, widths: lw, space, o, tagO, name, wi, s }
}

/** draw a caption bar laid out by captionLayout() */
export function drawCaption(ctx, cap, lay) {
  const a = cap.alpha
  const { L, shown, widths, space, o, tagO, name, wi } = lay
  const { bx, by, bw, bh } = L
  box(ctx, bx, by, bw, bh, { color: cap.color ?? P.blue, cut: L.frame.cut, width: L.frame.width, alpha: 0.6 * a, fillAlpha: 0.92 * a })
  if (name) {
    occlude(ctx, rectPath(L.tag.x, L.tag.y, L.tag.w, L.tag.h), '#000', a)
    label(ctx, name, L.tag.tx, L.tag.ty, { ...tagO, color: cap.color ?? P.blue, alpha: a })
  }
  shown.forEach((l, k) => {
    let x = 640 - widths[k] / 2
    const y = L.row(k)
    for (const it of l) {
      const said = cap.words ? it.i < wi || (it.i === wi && cap.word >= 0) : true
      const now = cap.words && it.i === wi && cap.word >= 0 && !cap.done
      const col = now ? cap.color ?? P.amber : P.white
      label(ctx, it.tok, x, y, { ...o, color: col, alpha: a * (said ? 1 : 0.5), weight: now ? 'm' : 'l' })
      if (now) seg(ctx, x, y + L.underline.dy, x + it.w, y + L.underline.dy, col, L.underline.width, { hot: true, alpha: a })
      x += it.w + space
    }
  })
}

/** "[ LAUGHTER ]" in the caption bar when the room is laughing and nobody's talking (s as caption()) */
export function laughCaption(ctx, text, a, lift = 0, s = 1) {
  const lay = laughLayout(ctx, text, a, lift, s)
  if (lay) drawLaugh(ctx, lay, a, lift)
}

/** where the laughter box goes (null when it is not drawn): { B (laughBox), area, str, o } */
export function laughLayout(ctx, text, a, lift = 0, s = 1) {
  if (a <= 0.02) return null
  const str = `[ ${text} ]`
  const o = { size: LAUGH.size * s, ls: 0.3 }
  const B = laughBox(labelWidth(ctx, str, o), s)
  return { B, area: laughRect(B, lift), str, o }
}

/** draw a laughter box laid out by laughLayout() */
export function drawLaugh(ctx, lay, a, lift = 0) {
  const { B, str, o } = lay
  ctx.save()
  ctx.translate(0, -lift)
  box(ctx, B.x, B.y, B.w, B.h, { color: P.amber, cut: B.cut, width: B.width, alpha: 0.6 * a, fillAlpha: 0.75 * a })
  label(ctx, str, 640, B.ty, { ...o, align: 'center', color: P.amber, alpha: a })
  ctx.restore()
}

/** a chyron's box across the frame once it is in: { x, w, h } (for clearing the caption area) */
export function chyronExtent(ctx, c) {
  const name = String(c.name ?? '').toUpperCase()
  const sub = String(c.title ?? '').toUpperCase()
  const handle = c.handle ?? ''
  const nw = labelWidth(ctx, name, { size: 34, weight: 'm', ls: 0.1 })
  const sw = labelWidth(ctx, sub + (handle ? '   ' + handle : ''), { size: 15, ls: 0.18 })
  const w = Math.max(nw + (c.parody ? labelWidth(ctx, 'PUPPET · PARODY', { size: 11, ls: 0.22 }) + 40 : 0), sw) + 120
  return { x: 56, w, h: 88 }
}

// ---------------------------------------------------------------- the episode counter, the disclaimer

/**
 * An episode-long counter, top-left: a label and the number n. b = show.builtNow
 * ({ n, age: seconds since the last bump, seed, label? }); a bump pops the number, flashes, and
 * throws confetti. The label is the segment's (`built: { label }`), else STAGE_TEXT.counterLabel
 * (stage/text.js: a neutral default, or the legacy entry's for 001-pilot).
 */
export function builtCounter(ctx, b, t) {
  const x = 26, y = 24
  const pop = b.age >= 0 && b.age < 0.6 ? Math.sin(Math.PI * Math.min(1, b.age / 0.6)) : 0
  const flash = b.age >= 0 && b.age < 0.9 ? 1 - b.age / 0.9 : 0
  const head = String(b.label ?? STAGE_TEXT.counterLabel)
  const hw = labelWidth(ctx, head, { size: 12, ls: 0.24 })
  const w = hw + 70
  box(ctx, x, y, w, 34, { color: flash > 0 ? mix(P.lime, '#ffffff', flash * 0.5) : P.lime, cut: 6, width: 1.2 + flash * 1.4, alpha: 0.75 + 0.25 * flash, hot: flash > 0.3, fillAlpha: 0.8 })
  label(ctx, head, x + 12, y + 22, { size: 12, color: P.lime, ls: 0.24, alpha: 0.9 })
  const nx = x + 12 + hw + 30
  ctx.save()
  ctx.translate(nx, y + 17)
  ctx.scale(1 + 0.6 * pop, 1 + 0.6 * pop)
  label(ctx, String(b.n), 0, 8, { size: 22, align: 'center', color: flash > 0.2 ? P.white : P.lime, weight: 'm', ls: 0 })
  ctx.restore()
  if (b.age >= 0 && b.age < 1.5) confetti(ctx, nx, y + 14, b.age, { seed: b.seed, count: 18, spread: 0.55 })
}

/** a one-line footer (segment `disclaimer`) along the bottom edge; captions lift above it */
export function disclaimer(ctx, text, a) {
  const s = String(text)
  const w = labelWidth(ctx, s, { size: 13, ls: 0.12 }) + 36
  box(ctx, 640 - w / 2, 686, w, 26, { color: P.blueMid, cut: 5, width: 1, alpha: 0.6 * a, fillAlpha: 0.8 * a })
  label(ctx, s, 640, 704, { size: 13, align: 'center', color: P.white, ls: 0.12, alpha: 0.85 * a })
}
