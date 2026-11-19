// Stage 5, direct: segments/*/index.js against the rendered cues. Gates: every segment has a module;
// frames shot at every cue and across every segment load with no page errors, console errors or
// unknown cues; the first segment with a guest carries the parody disclaimer (R9); every real post
// shown as a card is on screen verbatim somewhere in the episode (A2, as far as text can tell).
import { existsSync, readFileSync } from 'node:fs'
import { findPost } from '../digest.mjs'
import { lex, scriptLines, verbatimMismatch, ELLIPSIS } from '../scan.mjs'
import { gate, read, rundown } from './common.mjs'

export async function directModules(ctx) {
  const g = gate('direct.modules')
  for (const seg of rundown(ctx)) if (!existsSync(ctx.paths.segFile(seg, 'index.js'))) g.fail(`segments/${seg}/index.js is missing`)
  return g.done()
}

/** the moments to shoot: every cue, line id and music start, plus evenly spaced frames */
export function frameTimes(cues, { across = 6, max = 40 } = {}) {
  const d = Number(cues.duration) || 0
  const ts = new Set()
  for (const t of Object.values(cues.cues ?? {})) if (Number.isFinite(t)) ts.add(t)
  for (const l of cues.lines ?? []) if (l.id && Number.isFinite(l.t0)) ts.add(l.t0 + Math.min(0.4, (l.t1 - l.t0) / 2))
  for (const m of cues.music ?? []) if (Number.isFinite(m.t0)) ts.add(m.t0 + 0.5)
  for (let k = 1; k <= across; k++) ts.add((d * k) / (across + 1))
  let out = [...ts].filter((t) => t >= 0 && t < d).map((t) => Math.round(t * 100) / 100)
  out = [...new Set(out)].sort((a, b) => a - b)
  if (out.length > max) out = out.filter((_, k) => k % Math.ceil(out.length / max) === 0)
  return out
}

/**
 * Parse `npm run shoot` output: a line per saved frame, the page's console warnings and errors
 * indented under it, and `<id> @ <t>: <error>` for a frame that failed.
 */
export function parseShoot(out) {
  const frames = []
  const problems = []
  let cur = null
  for (const line of out.split('\n')) {
    let m
    if ((m = /^(\S+\.png)\s+\(/.exec(line))) {
      cur = { file: m[1], t: /@([\d.]+)\.png$/.exec(m[1])?.[1] ?? '?' }
      frames.push(cur)
    } else if ((m = /^\s{3}(warning|error|pageerror): (.*)$/.exec(line))) {
      const [, kind, msg] = m
      if (kind === 'warning' && !/unknown cue/i.test(msg)) continue // GPU stalls and the like
      if (kind === 'error' && /GL Driver|WebGL|favicon/i.test(msg)) continue
      problems.push({ t: cur?.t ?? '?', kind, msg })
    } else if ((m = /^(\S+) @ ([\d.]+): (.*)$/.exec(line))) problems.push({ t: m[2], kind: 'failed', msg: m[3] })
  }
  return { frames, problems }
}

export async function directFrames(ctx) {
  const g = gate('direct.frames')
  const shot = {}
  for (const seg of rundown(ctx)) {
    const cuesFile = ctx.paths.segFile(seg, 'cues.json')
    if (!existsSync(cuesFile) || !existsSync(ctx.paths.segFile(seg, 'index.js'))) continue
    const times = frameTimes(JSON.parse(readFileSync(cuesFile, 'utf8')), ctx.config.frames)
    const r = ctx.tools.npm('shoot', [ctx.id, seg, ...times.map(String)])
    const { frames, problems } = parseShoot(r.out)
    shot[seg] = frames.length
    for (const p of problems.slice(0, 12)) g.fail(`${seg} @ ${p.t} s: ${p.kind}: ${p.msg.slice(0, 200)}`)
    if (problems.length > 12) g.fail(`${seg}: ${problems.length - 12} more problems (see the log)`)
    if (r.code !== 0 && !problems.length) g.fail(`npm run shoot -- ${ctx.id} ${seg} exited ${r.code}`)
    if (frames.length < times.length && !problems.some((p) => p.kind === 'failed')) g.fail(`${seg}: ${times.length - frames.length} of ${times.length} frames were not saved`)
  }
  g.warn(`frames in shots/${ctx.id}/: ${Object.entries(shot).map(([s, n]) => `${s} ${n}`).join(', ')}`)
  return g.done()
}

/** Rule R9: the first segment in which a guest appears carries a `disclaimer` */
export async function directDisclaimer(ctx) {
  const g = gate('direct.disclaimer')
  const guests = ctx.castInfo.guests
  for (const seg of rundown(ctx)) {
    const src = read(ctx.paths.segFile(seg, 'script.js')) ?? ''
    const mod = read(ctx.paths.segFile(seg, 'index.js')) ?? ''
    const speaking = scriptLines(src).some((l) => l.who.some((w) => guests.has(w)))
    const { masked, tokens } = lex(mod)
    const listed = /\bguests\s*:\s*\[/.test(masked) && tokens.some((t) => t.kind === 'string' && guests.has(t.value) && /\bguests\s*:\s*\[[^\]]*$/.test(masked.slice(0, t.start)))
    if (!speaking && !listed) continue
    if (!/(^|[\s,{])disclaimer\s*:/.test(masked)) g.fail(`segments/${seg}/index.js: the first segment with a guest needs a disclaimer, e.g. disclaimer: { text: 'Guests are puppets playing posting personas. Parody.', from: '<cue>', dur: 6 } (rule R9)`)
    return g.done()
  }
  g.skip('no guest in the episode')
  return g.done()
}

/** A2 as far as text can go: each sources.json post used as a card appears verbatim in a segment */
export async function directCards(ctx) {
  const g = gate('direct.cards')
  const cards = (ctx.sources?.posts ?? []).filter((p) => ['card', 'quote'].includes(p?.use))
  if (!cards.length) {
    g.skip('no post cards in sources.json')
    return g.done()
  }
  const strings = []
  for (const seg of rundown(ctx)) for (const f of ['index.js', 'script.js']) {
    const src = read(ctx.paths.segFile(seg, f))
    if (src) for (const t of lex(src).tokens) if (t.kind !== 'comment') strings.push({ seg, value: t.value })
  }
  for (const c of cards) {
    const post = findPost(ctx.digest, c.uri)
    if (!post?.text) continue // write.sources reports it
    const where = c.segment ? strings.filter((s) => s.seg === c.segment) : strings
    const hit = where.some((s) => s.value.trim() && !verbatimMismatch(s.value, post.text))
    if (!hit) g.fail(`the card for ${c.uri}${c.segment ? ` in ${c.segment}` : ''} does not show the post's text verbatim in any string (cut only with ${ELLIPSIS}); copy it exactly from the digest (rule R4)`)
  }
  return g.done()
}

export const DIRECT_GATES = [directModules, directDisclaimer, directCards, directFrames]
