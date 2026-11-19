// Stage 9, stage: segments/*/index.js against the rendered cues. Gates: every segment has a module;
// frames at every cue and across every segment load with no page errors, console errors or unknown
// cues (one segment at a time with ctx.onlySegment, so builders can work in parallel); the first
// segment with a guest carries the parody disclaimer; every real post shown on screen is verbatim;
// nothing longer than a glance is on screen without being spoken; the end card credits the real
// accounts whose personas were played and says every voice is synthesized.
import { existsSync, readFileSync } from 'node:fs'
import { findPost, normHandle } from '../digest.mjs'
import { castHandle, isInvented } from '../context.mjs'
import { lex, scriptLines, verbatimMismatch, ELLIPSIS } from '../scan.mjs'
import { gate, read, rundown } from './common.mjs'

const segmentsOf = (ctx) => (ctx.onlySegment ? rundown(ctx).filter((s) => s === ctx.onlySegment) : rundown(ctx))

export async function directModules(ctx) {
  const g = gate('stage.modules')
  for (const seg of segmentsOf(ctx)) if (!existsSync(ctx.paths.segFile(seg, 'index.js'))) g.fail(`segments/${seg}/index.js is missing`)
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

/** parse `npm run shoot`: a line per saved frame, console lines indented under it, `<id> @ <t>: <error>` for a failed frame */
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
  const g = gate('stage.frames')
  for (const seg of segmentsOf(ctx)) {
    const cuesFile = ctx.paths.segFile(seg, 'cues.json')
    if (!existsSync(cuesFile) || !existsSync(ctx.paths.segFile(seg, 'index.js'))) continue
    const times = frameTimes(JSON.parse(readFileSync(cuesFile, 'utf8')), ctx.config.frames)
    const r = ctx.tools.npm('shoot', [ctx.id, seg, ...times.map(String)])
    const { frames, problems } = parseShoot(r.out)
    for (const p of problems.slice(0, 12)) g.fail(`${seg} @ ${p.t} s: ${p.kind}: ${p.msg.slice(0, 200)}`)
    if (problems.length > 12) g.fail(`${seg}: ${problems.length - 12} more problems (see the log)`)
    if (r.code !== 0 && !problems.length) g.fail(`npm run shoot -- ${ctx.id} ${seg} exited ${r.code}`)
    if (frames.length < times.length && !problems.some((p) => p.kind === 'failed')) g.fail(`${seg}: ${times.length - frames.length} of ${times.length} frames were not saved`)
    g.warn(`${seg}: ${frames.length} frames in shots/${ctx.id}/${seg}/ (every cue and line id, plus ${ctx.config.frames.across} spread across ${times.length ? `0–${times.at(-1)} s` : 'the segment'})${r.log ? `; log ${ctx.paths.rel(r.log)}` : ''}`)
  }
  return g.done()
}

/** the first segment in which a guest appears carries a `disclaimer` (constitution, Article 4) */
export async function directDisclaimer(ctx) {
  const g = gate('stage.disclaimer')
  const guests = ctx.castInfo.guests
  for (const seg of rundown(ctx)) {
    const src = read(ctx.paths.segFile(seg, 'script.js')) ?? ''
    const mod = read(ctx.paths.segFile(seg, 'index.js')) ?? ''
    const speaking = scriptLines(src).some((l) => l.who.some((w) => guests.has(w)))
    const { masked, tokens } = lex(mod)
    const listed = /\bguests\s*:\s*\[/.test(masked) && tokens.some((t) => t.kind === 'string' && guests.has(t.value) && /\bguests\s*:\s*\[[^\]]*$/.test(masked.slice(0, t.start)))
    if (!speaking && !listed) continue
    if (!/(^|[\s,{])disclaimer\s*:/.test(masked)) g.fail(`segments/${seg}/index.js: the first segment with a guest needs a disclaimer, e.g. disclaimer: { text: 'Guests are puppets playing posting personas. Parody.', from: '<cue>', dur: 6 }`)
    return g.done()
  }
  g.skip('no guest in the episode')
  return g.done()
}

/** every post sources.json shows (card, quote or thread) appears verbatim in a string of its segment */
export async function directCards(ctx) {
  const g = gate('stage.cards')
  const cards = (ctx.sources?.posts ?? []).filter((p) => ['card', 'quote', 'thread'].includes(p?.use) && (!ctx.onlySegment || !p.segment || p.segment === ctx.onlySegment))
  if (!cards.length) {
    g.skip('no post shown on screen in sources.json')
    return g.done()
  }
  const strings = []
  for (const seg of rundown(ctx)) for (const f of ['index.js', 'script.js']) {
    const src = read(ctx.paths.segFile(seg, f))
    if (src) for (const t of lex(src).tokens) if (t.kind !== 'comment') strings.push({ seg, value: t.value })
  }
  for (const c of cards) {
    const post = findPost(ctx.digest, c.uri)
    if (!post?.text) continue
    const where = c.segment ? strings.filter((s) => s.seg === c.segment) : strings
    if (!where.some((s) => s.value.trim() && !verbatimMismatch(s.value, post.text))) g.fail(`the ${c.use} for ${c.uri}${c.segment ? ` in ${c.segment}` : ''} does not show the post's text verbatim in any string of segments/${c.segment ?? '*'}/index.js or script.js (cut only with ${ELLIPSIS}, including a cut at the start)`)
  }
  return g.done()
}

const wordsOf = (s) => String(s ?? '').toLowerCase().replace(/https?:\/\/\S+/g, ' ').replace(/[^\p{L}\p{N}' ]+/gu, ' ').split(/\s+/).filter(Boolean)

/** how much of `text` is spoken, in order, in `spoken` (0..1) */
export function spokenShare(text, spoken) {
  const w = wordsOf(text)
  const s = wordsOf(spoken)
  if (!w.length) return 1
  let at = 0
  let hit = 0
  for (const x of w) {
    const k = s.indexOf(x, at)
    if (k >= 0) {
      hit++
      at = k + 1
    }
  }
  return hit / w.length
}

/**
 * Television (docs/WORKFLOW.md): nothing longer than a glance (`screen.glanceWords`) is on screen
 * unless it is spoken in that segment. Checked on every string literal in a segment's index.js
 * (not comments, not import paths, not the disclaimer, which the constitution requires) and on
 * every post sources.json shows in it.
 */
export async function directUnread(ctx) {
  const g = gate('stage.unread')
  const { glanceWords, spokenCoverage } = ctx.config.screen
  for (const seg of segmentsOf(ctx)) {
    const mod = read(ctx.paths.segFile(seg, 'index.js'))
    const cuesText = read(ctx.paths.segFile(seg, 'cues.json'))
    if (mod === null || cuesText === null) continue
    const spoken = JSON.parse(cuesText).lines.map((l) => l.text).join(' ')
    const { tokens, masked } = lex(mod)
    const shown = []
    for (const t of tokens) {
      if (t.kind === 'comment' || t.value.includes('${')) continue
      const before = masked.slice(Math.max(0, t.start - 400), t.start)
      if (/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)$/.test(before)) continue
      if (/disclaimer\s*:\s*(?:\{[^}]*)?$/.test(before.slice(-120))) continue
      if (wordsOf(t.value).length > glanceWords) shown.push({ text: t.value, line: mod.slice(0, t.start).split('\n').length })
    }
    for (const p of ctx.sources?.posts ?? []) {
      if (p?.segment !== seg || !['card', 'quote', 'thread'].includes(p.use)) continue
      const post = findPost(ctx.digest, p.uri)
      if (post?.text && wordsOf(post.text).length > glanceWords && !shown.some((x) => !verbatimMismatch(x.text, post.text))) shown.push({ text: post.text, line: null, uri: post.uri })
    }
    for (const x of shown) {
      const share = spokenShare(x.text, spoken)
      if (share < spokenCoverage) g.fail(`segments/${seg}/index.js${x.line ? `:${x.line}` : ''}: "${x.text.replace(/\s+/g, ' ').slice(0, 70)}${x.text.length > 70 ? '…' : ''}" (${wordsOf(x.text).length} words${x.uri ? `, ${x.uri}` : ''}) is on screen but only ${Math.round(share * 100)} % of it is spoken in the segment; read it aloud, or cut it to ${glanceWords} words or fewer`)
    }
  }
  return g.done()
}

/** the cast ids that appear in the episode, as the page computes them: everyone with a line, plus each segment's cast and guests */
export function appearing(ctx) {
  const who = new Set()
  for (const seg of rundown(ctx)) {
    const cues = read(ctx.paths.segFile(seg, 'cues.json'))
    if (cues) for (const l of JSON.parse(cues).lines ?? []) if (l.who) who.add(l.who)
    const mod = read(ctx.paths.segFile(seg, 'index.js'))
    if (mod) {
      const { masked, tokens } = lex(mod)
      for (const t of tokens) if (t.kind === 'string' && /\b(cast|guests)\s*:\s*\[[^\]]*$/.test(masked.slice(Math.max(0, t.start - 300), t.start))) who.add(t.value)
    }
  }
  return who
}

/**
 * The credits (constitution, Article 4; trial finding 52): the end card rolls the real accounts whose
 * personas were played, with their handles, and says every voice is synthesized. The roll's lines
 * come from the studio's own credits() for this episode's cast (bin/credits.mjs, under bun); the end
 * card is shot to check it renders.
 */
export async function directCredits(ctx) {
  const g = gate('stage.credits')
  if (!ctx.tools.has('bun')) {
    g.skip('bun is not installed: the credits were not computed (the reviewer must watch the end card)')
    return g.done()
  }
  const who = appearing(ctx)
  const r = ctx.tools.exec('credits', 'bun', ['packages/writers-room/bin/credits.mjs', ctx.root, ctx.id, [...who].join(',')])
  let lines
  try {
    lines = JSON.parse(r.stdout.trim().split('\n').pop())
  } catch {
    g.fail(`could not compute the credits (bun exited ${r.code}): ${r.out.trim().split('\n').slice(-2).join(' | ')}`)
    return g.done()
  }
  const flat = lines.map((l) => (Array.isArray(l) ? l.join(' ') : typeof l === 'string' ? l : l?.head ?? '')).join('\n')
  const { cast } = ctx.castInfo
  const real = [...who].filter((id) => cast[id]?.guest && !isInvented(cast[id]))
  for (const a of ctx.sources?.accounts ?? []) if (a?.role === 'guest' && a.cast && !real.includes(a.cast)) real.push(a.cast)
  if (real.length && !/posting personas of/i.test(flat)) g.fail('the end card does not say whose posting personas the puppets played')
  for (const id of real) {
    const h = castHandle(cast[id])
    if (!h) g.fail(`the cast entry ${id} plays a real account but has no handle, so the credits cannot name it`)
    else if (!flat.includes(`@${h}`)) g.fail(`the end card does not credit @${h}, whose persona ${id} played`)
  }
  if (!/every voice[\s\S]*synthesi[sz]ed/i.test(flat)) g.fail('the end card does not say that every voice is synthesized')
  const shot = ctx.tools.npm('shoot', [ctx.id, 'end', ...(ctx.config.frames.endTimes ?? [2, 8]).map(String)])
  const { problems } = parseShoot(shot.out)
  for (const p of problems.slice(0, 5)) g.fail(`end card @ ${p.t} s: ${p.kind}: ${p.msg.slice(0, 200)}`)
  if (shot.code !== 0 && !problems.length) g.fail(`npm run shoot -- ${ctx.id} end exited ${shot.code}`)
  g.warn(`credits: ${real.length ? real.map((id) => `@${castHandle(cast[id])}`).join(', ') : 'no real accounts'}; "${lines.filter((l) => typeof l === 'string' && /synthesi/i.test(l))[0] ?? ''}"`)
  return g.done()
}

export const DIRECT_GATES = [directModules, directDisclaimer, directCards, directUnread, directFrames]
