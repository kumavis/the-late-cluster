// Stage 4, render: audio, telemetry and cues.json for every rundown segment. Gates: `npm run check`
// passes; when Whisper is installed, the intelligibility thresholds of bible stage 4; the rendered
// lengths agree with the plan. Failures go back to the write stage's writer.
import { existsSync, readFileSync } from 'node:fs'
import { gate, planSegments, read, rundown } from './common.mjs'

export async function renderCheck(ctx) {
  const g = gate('render.check')
  const r = ctx.tools.npm('check', [ctx.id])
  if (r.code !== 0) {
    const bad = r.out.split('\n').filter((l) => /^\s*FAIL\b/.test(l)).slice(0, 15)
    g.fail(`npm run check -- ${ctx.id} exited ${r.code}: ${bad.join(' | ') || 'see the log'}`)
  }
  return g.done()
}

/**
 * Parse `bun packages/show/tools/analyze.ts whisper <ep> <seg>`: one row per captioned line,
 * `✓|~|✗ <t0> <who> ok/all "caption"`, then `…; weak lines: id, #3`.
 */
export function parseWhisper(out) {
  const lines = []
  for (const m of out.matchAll(/^([✓~✗])\s+([\d.]+)\s+(\S+)\s+(\d+)\/(\d+)\s+"(.*)"\s*\n\s*heard: "(.*)"\s*$/gm)) lines.push({ flag: m[1], t0: Number(m[2]), who: m[3], ok: Number(m[4]), all: Number(m[5]), text: m[6], heard: m[7] })
  const weak = /weak lines: (.+)$/m.exec(out)?.[1]?.split(',').map((s) => s.trim()).filter(Boolean) ?? []
  const total = /^(\d+)\/(\d+) caption words heard/m.exec(out)
  return { lines, weak, heard: total ? Number(total[1]) : null, words: total ? Number(total[2]) : null }
}

/**
 * Bible stage 4: no line below ~ (60 %) unless it is a name the transcriber can't know, and
 * "Built it." heard every time. A weak line that is a name is waived in
 * production/intelligibility.json: { "<seg>": { "<line id or #i>": "why" } }.
 * Whether a *punchline* scores ✓ needs knowing which lines are punchlines: the reviewer's (B8).
 */
export async function renderWhisper(ctx) {
  const g = gate('render.whisper')
  if (!ctx.tools.has('whisper')) {
    g.skip('whisper is not installed; the intelligibility pass was not run (the reviewer should listen for it)')
    return g.done()
  }
  const waivers = existsSync(ctx.paths.intelligibility) ? JSON.parse(readFileSync(ctx.paths.intelligibility, 'utf8')) : {}
  for (const seg of rundown(ctx)) {
    if (!existsSync(ctx.paths.segFile(seg, 'script.js'))) continue
    const r = ctx.tools.bun(['packages/show/tools/analyze.ts', 'whisper', ctx.id, seg])
    if (r.code !== 0) {
      g.fail(`the Whisper pass on ${seg} exited ${r.code}`)
      continue
    }
    const w = parseWhisper(r.out)
    if (!w.lines.length) g.warn(`${seg}: the Whisper pass printed no lines`)
    const bad = w.lines.filter((l) => l.flag === '✗')
    w.weak.forEach((id, k) => {
      const why = waivers?.[seg]?.[id]
      const l = bad[k]
      const said = l ? ` "${l.text}" was heard as "${l.heard}" (${l.ok}/${l.all})` : ''
      if (why) g.warn(`${seg} ${id}: weak in Whisper, waived: ${why}`)
      else g.fail(`${seg} ${id}:${said}: Whisper heard under 60 % of the line (✗). Respell in "as", rephrase, add gap from a loud sound or lower its vol; if it is only a name Whisper can't know, waive it in production/intelligibility.json with the IPA that shows it is right`)
    })
    for (const l of w.lines) if (/^built it\.?$/i.test(l.text.trim()) && l.flag !== '✓') g.fail(`${seg} at ${l.t0} s: "Built it." was not heard as "built it" (${l.ok}/${l.all}); start any sfx 0.15 s after it, or give it duck: 1 (tools/README.md)`)
    if (w.words) g.warn(`${seg}: ${w.heard}/${w.words} caption words heard`)
  }
  return g.done()
}

/** rendered lengths: each segment within the tolerance of the plan; the total inside the budget */
export async function renderLengths(ctx) {
  const g = gate('render.lengths')
  const tol = ctx.limits.segmentTolerance ?? 0.1
  const plan = new Map(planSegments(ctx).map((s) => [s.id, Number(s.seconds)]))
  let total = 0
  const per = []
  for (const seg of rundown(ctx)) {
    const cues = read(ctx.paths.segFile(seg, 'cues.json'))
    if (!cues) {
      g.fail(`segments/${seg}/cues.json is missing: render it`)
      continue
    }
    const dur = JSON.parse(cues).duration
    total += dur
    per.push(`${seg} ${dur.toFixed(1)} s`)
    const want = plan.get(seg)
    if (want && Math.abs(dur - want) > want * tol) g.fail(`${seg} renders at ${dur.toFixed(1)} s but the plan gives it ${want} s (more than ${Math.round(tol * 100)} % off); cut or tighten, or change plan.json and pitch.md if the plan was wrong`)
  }
  const max = ctx.limits.runtimeSeconds?.max
  if (max && total > max) g.fail(`the episode renders at ${total.toFixed(1)} s, over the ${max} s ceiling; cut what is least interesting (there is no minimum)`)
  g.warn(`rendered ${total.toFixed(1)} s: ${per.join(', ')}`)
  return g.done()
}

export const RENDER_GATES = [renderCheck, renderWhisper, renderLengths]
