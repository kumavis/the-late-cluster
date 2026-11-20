// After rendering (stage 8): `npm run check` passes; the intelligibility pass; what the
// transcription heard carries nothing offensive, alarming or out of bounds, and no real person's
// name was heard as something else; the rendered lengths agree with the plan.
import { existsSync, readFileSync } from 'node:fs'
import { normHandle } from '../digest.mjs'
import { castHandle, isInvented } from '../context.mjs'
import { gate, planSegments, read, rundown, sourcesIndex } from './common.mjs'

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
 * `✓|~|✗ <t0> <who> ok/all "caption"` then `heard: "…"`, and `…; weak lines: id, #3`.
 */
export function parseWhisper(out) {
  const lines = []
  for (const m of out.matchAll(/^([✓~✗])\s+([\d.]+)\s+(\S+)\s+(\d+)\/(\d+)\s+"(.*)"\s*\n\s*heard: "(.*)"\s*$/gm)) lines.push({ flag: m[1], t0: Number(m[2]), who: m[3], ok: Number(m[4]), all: Number(m[5]), text: m[6], heard: m[7] })
  const weak = /weak lines: (.+)$/m.exec(out)?.[1]?.split(',').map((s) => s.trim()).filter(Boolean) ?? []
  const total = /^(\d+)\/(\d+) caption words heard/m.exec(out)
  return { lines, weak, heard: total ? Number(total[1]) : null, words: total ? Number(total[2]) : null }
}

/**
 * What was heard in every rendered segment, each row tied to its cues.json line (id, who): from the
 * fitting tool's segments/<seg>/fit.json when there is one (the sound editor's last fit), else from
 * the Whisper pass. ok → ✓, weak → ~, flagged or unsayable → ✗.
 */
function transcripts(ctx) {
  if (ctx._transcripts) return ctx._transcripts
  const out = {}
  const FLAG = { ok: '✓', weak: '~', flagged: '✗', unsayable: '✗' }
  for (const seg of rundown(ctx)) {
    if (!existsSync(ctx.paths.segFile(seg, 'cues.json'))) continue
    const fitFile = ctx.paths.segFile(seg, 'fit.json')
    if (existsSync(fitFile)) {
      const fit = JSON.parse(readFileSync(fitFile, 'utf8'))
      const lines = (fit.lines ?? []).map((l) => ({ flag: FLAG[l.status] ?? '~', t0: l.t0 ?? 0, who: l.who, ok: l.score?.heard ?? 0, all: l.score?.of ?? 0, text: l.text, heard: l.heard?.[0]?.text ?? '', id: l.id }))
      out[seg] = { code: 0, source: 'fit', lines, weak: lines.filter((l) => l.flag !== '✓').map((l) => l.id), heard: null, words: null }
      continue
    }
    if (!ctx.tools.has('whisper')) continue
    const r = ctx.tools.bun(['packages/show/tools/analyze.ts', 'whisper', ctx.id, seg])
    const w = parseWhisper(r.out)
    // the analyzer transcribes the say lines and the captioned sung lines, in cues order
    let lines = []
    try {
      lines = JSON.parse(readFileSync(ctx.paths.segFile(seg, 'cues.json'), 'utf8')).lines.filter((l) => l.kind === 'say' || (l.kind === 'sing' && l.caption))
    } catch {}
    w.lines.forEach((row, k) => (row.id = lines[k]?.id ?? `#${lines[k]?.i ?? k}`))
    out[seg] = { code: r.code, source: 'whisper', ...w }
  }
  return (ctx._transcripts = out)
}

const anyFit = (ctx) => rundown(ctx).some((seg) => existsSync(ctx.paths.segFile(seg, 'fit.json')))

/** the names Whisper cannot be expected to know: the cast's names and handles, sources.json's accounts */
function knownNames(ctx) {
  const names = new Set()
  const add = (s) => String(s ?? '').split(/[\s@._-]+/).filter((w) => w.length > 1).forEach((w) => names.add(w.toLowerCase()))
  for (const c of Object.values(ctx.castInfo.cast)) {
    add(c?.name)
    add(castHandle(c).split('.')[0])
  }
  for (const a of ctx.sources?.accounts ?? []) {
    add(a.displayName)
    add(normHandle(a.handle).split('.')[0])
  }
  return names
}

/** the real people's names that can appear in captions: real guests in the cast and sources.json's accounts */
function realNames(ctx) {
  const out = []
  for (const c of Object.values(ctx.castInfo.cast)) if (c?.guest && !isInvented(c)) out.push(c.name, castHandle(c).split('.')[0])
  for (const a of ctx.sources?.accounts ?? []) out.push(a.displayName, normHandle(a.handle).split('.')[0])
  return [...new Set(out.filter((n) => n && String(n).length > 2).map((n) => String(n)))]
}

const words = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean)
const hasPhrase = (text, phrase) => ` ${words(text).join(' ')} `.includes(` ${words(phrase).join(' ')} `)

/**
 * The intelligibility pass (stage 8). A line under 60 % fails unless it is waived in
 * production/intelligibility.json, and a waiver is accepted only for what it is meant for: a line
 * whose caption contains a name Whisper cannot know (trial finding 56).
 */
export async function renderWhisper(ctx) {
  const g = gate('render.whisper')
  if (!ctx.tools.has('whisper') && !anyFit(ctx)) {
    g.skip('whisper is not installed: neither the intelligibility pass nor the heard-text gate ran (the reviewer must listen for both)')
    return g.done()
  }
  const waivers = existsSync(ctx.paths.intelligibility) ? JSON.parse(readFileSync(ctx.paths.intelligibility, 'utf8')) : {}
  const names = knownNames(ctx)
  for (const [seg, w] of Object.entries(transcripts(ctx))) {
    if (w.code !== 0) {
      g.fail(`the Whisper pass on ${seg} exited ${w.code}`)
      continue
    }
    for (const l of w.lines.filter((x) => x.flag === '✗')) {
      const why = waivers?.[seg]?.[l.id]
      const isName = words(l.text).some((x) => names.has(x))
      if (why && isName) g.warn(`${seg} ${l.id}: weak in Whisper, waived as a name: ${why}`)
      else if (why) g.fail(`${seg} ${l.id}: "${l.text}" is waived in intelligibility.json, but waivers are only for names Whisper cannot know, and this caption has none; rewrite or respell the line`)
      else g.fail(`${seg} ${l.id}: "${l.text}" was heard as "${l.heard}" (${l.ok}/${l.all}). Respell in "as", rephrase, add gap from a loud sound or lower its vol; if the miss is only a name Whisper can't know, waive it in production/intelligibility.json`)
    }
    for (const [id] of Object.entries(waivers?.[seg] ?? {})) if (!w.lines.some((l) => l.id === id && l.flag === '✗')) g.warn(`${seg} ${id}: a waiver for a line that is not weak (stale; remove it)`)
    if (w.words) g.warn(`${seg}: ${w.heard}/${w.words} caption words heard`)
  }
  return g.done()
}

/**
 * The heard-text gate (trial finding 51: "Last week, our Samantha puppet said" was heard as
 * "Last week, Auschwitz said" and passed at 7/11). Line by line, whatever the score:
 * - any alarming term in what was heard fails, with no waiver;
 * - an out-of-bounds subject heard fails unless production/heard-waivers.json quotes that exact
 *   heard text with a writer's judgement that it is harmless;
 * - a real person's name in the caption that was not heard fails until such a waiver exists.
 * heard-waivers.json: { "<seg>": { "<line id>": { "heard": "<exact heard text>", "judgement": "…" } } }
 */
export async function renderHeard(ctx) {
  const g = gate('render.heard')
  if (!ctx.tools.has('whisper') && !anyFit(ctx)) {
    g.skip('whisper is not installed: what an audience would hear was not checked')
    return g.done()
  }
  const cfg = ctx.config.heard
  const waiverFile = `${ctx.paths.production}/heard-waivers.json`
  const waivers = existsSync(waiverFile) ? JSON.parse(readFileSync(waiverFile, 'utf8')) : {}
  const people = realNames(ctx)
  for (const [seg, w] of Object.entries(transcripts(ctx))) {
    for (const l of w.lines) {
      const at = `${seg} ${l.id} (${l.who}, ${l.t0} s)`
      const waiver = waivers?.[seg]?.[l.id]
      const waived = waiver && waiver.heard === l.heard && String(waiver.judgement ?? '').trim().length >= 10
      if (waiver && waiver.heard !== l.heard) g.warn(`${at}: heard-waivers.json quotes "${waiver.heard}" but the line is now heard as "${l.heard}"; the waiver no longer applies`)
      for (const t of cfg.alarming) if (hasPhrase(l.heard, t)) g.fail(`${at}: heard "${l.heard}", which contains "${t}". No waiver: rewrite or respell the line so it cannot be heard that way`)
      for (const t of cfg.outOfBounds) {
        if (!hasPhrase(l.heard, t)) continue
        if (waived) g.warn(`${at}: heard "${l.heard}" ("${t}"), judged harmless: ${waiver.judgement}`)
        else g.fail(`${at}: heard "${l.heard}", which touches an out-of-bounds subject ("${t}"). Rewrite it, or, if a writer judges the heard text harmless, record that in production/heard-waivers.json quoting it exactly`)
      }
      for (const n of people) {
        if (!hasPhrase(l.text, n) || hasPhrase(l.heard, n)) continue
        if (waived) g.warn(`${at}: "${n}" was heard as "${l.heard}", judged harmless: ${waiver.judgement}`)
        else g.fail(`${at}: the caption names ${n}, but the transcription heard "${l.heard}". Until a writer has judged what was heard instead harmless, in production/heard-waivers.json quoting it exactly, this fails; better, respell the name for this voice`)
      }
    }
  }
  return g.done()
}

/** rendered lengths: each segment near the plan; the total under the ceiling */
export async function renderLengths(ctx) {
  const g = gate('render.lengths')
  const tol = ctx.limits.segmentTolerance ?? 0.15
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
    if (want && Math.abs(dur - want) > want * tol) g.warn(`${seg} renders at ${dur.toFixed(1)} s; the draft estimated ${want} s`)
  }
  const max = ctx.limits.runtimeSeconds?.max
  if (max && total > max) g.fail(`the episode renders at ${total.toFixed(1)} s, over the ${max} s ceiling; cut what is least interesting (there is no minimum)`)
  g.warn(`rendered ${total.toFixed(1)} s: ${per.join(', ')}`)
  return g.done()
}

export const RENDER_GATES = [renderCheck, renderWhisper, renderHeard, renderLengths]
