// The cold-viewer test (docs/WORKFLOW.md, stage 13). For each stretch the experiment names, or the
// longest interval with no spoken line and no audience sound found from the rendered cues, the tool
// shoots one frame a second, copies the frames under neutral names into shots/<id>/_cold/set-<k>/,
// and gives each set to a `viewer` who sees nothing else. review/cold-viewers.md then sets what each
// viewer said beside the writer's own words for the turn (notes.json "turn").
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { coldStretches } from './experiment.mjs'
import { parseShoot } from './gates/direct.mjs'
import { writeJson } from './repo.mjs'

/** the longest interval in a segment with no spoken line and no audience sound → { t0, t1 } */
export function longestSilence(cues, audience = /laugh|applause|audience|cheer|groan|aww|ooh|chuckle/i) {
  const busy = []
  for (const l of cues.lines ?? []) if (Number.isFinite(l.t0) && Number.isFinite(l.t1)) busy.push([l.t0, l.t1])
  for (const s of cues.sfx ?? []) if (audience.test(String(s.name ?? s.sfx ?? '')) && Number.isFinite(s.t0)) busy.push([s.t0, Number.isFinite(s.t1) ? s.t1 : s.t0 + 1])
  busy.sort((a, b) => a[0] - b[0])
  const end = Number(cues.duration) || 0
  let best = { t0: 0, t1: 0 }
  let at = 0
  for (const [a, b] of busy) {
    if (a > at && a - at > best.t1 - best.t0) best = { t0: at, t1: a }
    at = Math.max(at, b)
  }
  if (end > at && end - at > best.t1 - best.t0) best = { t0: at, t1: end }
  return { t0: Math.round(best.t0 * 100) / 100, t1: Math.round(best.t1 * 100) / 100 }
}

export const coldDir = (ctx) => join(ctx.root, 'shots', ctx.id, '_cold')
const setsFile = (ctx) => join(ctx.paths.production, 'review', 'cold', 'sets.json')

/** which segments a stretch's target names: a segment id, a card id (through plan.json), or every segment */
function segmentsFor(ctx, target) {
  const rundown = ctx.meta.rundown ?? []
  if (target === 'every segment') return rundown
  if (rundown.includes(target)) return [target]
  return (ctx.plan?.segments ?? []).filter((s) => (s.cards ?? []).includes(target)).map((s) => s.id).filter((s) => rundown.includes(s))
}

/** build the sets once: shoot, copy under neutral names, record which set is which (for the tool only) */
export function prepareCold(ctx) {
  if (existsSync(setsFile(ctx))) return JSON.parse(readFileSync(setsFile(ctx), 'utf8'))
  const md = existsSync(join(ctx.paths.production, 'experiment.md')) ? readFileSync(join(ctx.paths.production, 'experiment.md'), 'utf8') : ''
  const { stretches, absent } = coldStretches(md)
  const cfg = ctx.config.cold
  const audience = new RegExp(cfg.audience, 'i')
  const sets = []
  const notes = []
  rmSync(coldDir(ctx), { recursive: true, force: true })
  for (const st of stretches) {
    for (const seg of segmentsFor(ctx, st.target)) {
      const cf = ctx.paths.segFile(seg, 'cues.json')
      if (!existsSync(cf)) continue
      const cues = JSON.parse(readFileSync(cf, 'utf8'))
      const span = st.longest ? longestSilence(cues, audience) : { t0: st.t0, t1: Math.min(st.t1, Number(cues.duration) || st.t1) }
      if (span.t1 - span.t0 < cfg.minSeconds) {
        notes.push(`${seg}: the longest such stretch is ${(span.t1 - span.t0).toFixed(2)} s, under ${cfg.minSeconds} s; not shown`)
        continue
      }
      const times = []
      for (let t = span.t0 + cfg.every / 2; t < span.t1 && times.length < cfg.maxFrames; t += cfg.every) times.push(Math.round(t * 100) / 100)
      const r = ctx.tools.npm('shoot', [ctx.id, seg, ...times.map(String)])
      const { frames } = parseShoot(r.out)
      const k = sets.length + 1
      const dir = join(coldDir(ctx), `set-${k}`)
      mkdirSync(dir, { recursive: true })
      const names = []
      frames.forEach((f, n) => {
        const to = join(dir, `${String(n + 1).padStart(2, '0')}.png`)
        if (existsSync(f.file)) copyFileSync(f.file, to)
        if (existsSync(to)) names.push(to)
      })
      const turn = (ctx.plan?.segments ?? []).find((s) => s.id === seg)?.turn ?? null
      sets.push({ set: k, segment: seg, t0: span.t0, t1: span.t1, frames: names.length, turn })
    }
  }
  if (absent) notes.push('the experiment names no stretch for a cold viewer')
  const out = { sets, notes }
  writeJson(setsFile(ctx), out)
  return out
}

/** review/cold-viewers.md: the viewers' words beside the writers' own words for each turn */
export function writeColdReport(ctx) {
  const { sets, notes } = JSON.parse(readFileSync(setsFile(ctx), 'utf8'))
  const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
  const L = ['# Cold viewers', '', 'Each viewer was shown one stretch as stills, one a second, under neutral names, with no sound and nothing else, and asked what the thing is and what happened. The viewers are a small model and saw no motion: the owner\'s cold watch is the better test.', '']
  if (sets.length) {
    L.push('| set | segment | stretch | the writer\'s words for the turn | what the viewer said |', '|---|---|---|---|---|')
    for (const s of sets) {
      const f = join(coldDir(ctx), `set-${s.set}`, 'answer.md')
      L.push(`| ${s.set} | ${s.segment} | ${s.t0}–${s.t1} s (${(s.t1 - s.t0).toFixed(2)} s, ${s.frames} frames) | ${cell(s.turn ?? 'not given')} | ${cell(existsSync(f) ? readFileSync(f, 'utf8') : 'no answer')} |`)
    }
    L.push('', 'Whether each answer names the turn is for the reviewer to judge, in scorecard row B12.')
  }
  if (notes.length) L.push('', ...notes.map((n) => `- ${n}`))
  writeFileSync(join(ctx.paths.production, 'review', 'cold-viewers.md'), L.join('\n') + '\n')
}

export const VIEWER_BRIEF = (k, n) => [
  `These are ${n} still frames, one second apart, from a television show in which nobody speaks during this stretch. There is no sound. Look at them in order (01.png first).`,
  'Then write, in one or two sentences, what the thing on screen is and what happened, and on a last line "Confidence: <1-5>". Nothing else.',
]
