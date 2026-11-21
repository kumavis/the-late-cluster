// The one place that knows the studio's fitting and rendering commands (packages/show), so a
// rename there is one edit here.
//
//   npm run fit -- <ep> --draft <slug> --json   writes production/drafts/<slug>/fit.json
//   npm run fit -- <ep> <seg> --json            writes segments/<seg>/fit.json
//   npm run render -- <ep> --draft <slug>       a draft's audio, for a sound editor
//   npm run voices -- <ep> [--drafts]           the voices in use, so guests can be told apart
//   npm run voice-research -- <ep> --draft <slug>   record a draft's hard words in the voice research file
//
// fit.json: { segment, lines: [{ id, who, kind, text, as, heard: [{ text, count }], score: { heard, of },
//   status: 'ok'|'weak'|'flagged'|'unsayable', flags: [], real, missed: [{ word, count }], tried: [] }],
//   owner: [], heardDifferently: [], voices: {…} }. The statuses describe (the owner's ruling of
//   21 November 2026: best effort is sufficient, subtitles carry the line); the command exits 1 only
//   when a line is heard as something alarming, out of bounds or crude.
//
// The voice research file is packages/show/tools/data/voice-research.json (its page
// docs/voice-research.md). `hardLines` and `isRecorded` below mirror the studio's
// packages/show/tools/voice-research-lib.mjs, which the pipeline does not import (its tests run
// in a fake repository).
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { canRun } from './scraper.mjs'
import { writeJson } from './repo.mjs'

const hashOf = (files) => {
  const h = createHash('sha256')
  for (const f of files) h.update(existsSync(f) ? readFileSync(f) : `none:${f}`)
  return h.digest('hex').slice(0, 12)
}

export const fitCommand = (id, { draft, seg }) => (draft ? `npm run fit -- ${id} --draft ${draft} --json` : `npm run fit -- ${id} ${seg} --json`)
export const renderDraftCommand = (id, slug) => `npm run render -- ${id} --draft ${slug}`
export const voicesCommand = (id) => `npm run voices -- ${id} --drafts`
export const researchCommand = (id, { draft, seg }) => (draft ? `npm run voice-research -- ${id} --draft ${draft}` : `npm run voice-research -- ${id} ${seg}`)
export const RESEARCH_FILE = 'packages/show/tools/data/voice-research.json'
export const RESEARCH_PAGE = 'docs/voice-research.md'

/** where fit.json is for a draft or a segment, and the files whose change makes it stale */
function target(ctx, { draft, seg }) {
  if (draft) {
    const dir = join(ctx.paths.production, 'drafts', draft)
    return { dir, fit: join(dir, 'fit.json'), inputs: [join(dir, 'script.js'), join(dir, 'cast.js')] }
  }
  const dir = ctx.paths.segDir(seg)
  return { dir, fit: join(dir, 'fit.json'), inputs: [join(dir, 'script.js'), ctx.paths.castJs] }
}

export function readFit(ctx, which) {
  const t = target(ctx, which)
  if (!existsSync(t.fit)) return null
  try {
    return JSON.parse(readFileSync(t.fit, 'utf8'))
  } catch {
    return null
  }
}

/**
 * Fit a draft or a segment if its script (or cast) changed since the last fit. The hashes the fits
 * were made from are kept in production/fit/hashes.json. → { ran, code, fit, problems: [line] }
 */
export function ensureFit(ctx, which) {
  const t = target(ctx, which)
  const key = which.draft ? `draft:${which.draft}` : `segment:${which.seg}`
  const hf = join(ctx.paths.production, 'fit', 'hashes.json')
  const hashes = existsSync(hf) ? JSON.parse(readFileSync(hf, 'utf8')) : {}
  const now = hashOf(t.inputs)
  if (hashes[key] === now && existsSync(t.fit)) return { ran: false, fit: readFit(ctx, which), code: 0 }
  if (!canRun(ctx, 'fit')) return { ran: false, missing: true, fit: readFit(ctx, which), code: null }
  const args = which.draft ? [ctx.id, '--draft', which.draft, '--json'] : [ctx.id, which.seg, '--json']
  const r = ctx.tools.npm('fit', args)
  const fit = readFit(ctx, which)
  if (fit) writeJson(hf, { ...hashes, [key]: now })
  return { ran: true, code: r.code, out: r.out, fit }
}

/** the flag kinds that are never accepted (config/pipeline.json `fit.blocking`) */
export const BLOCKING = ['alarming', 'out of bounds', 'crude']
const kindOf = (f) => String(f).split(':')[0].trim()

/**
 * A fit's lines, sorted by what happens to them (the owner's ruling of 21 November 2026):
 * - blocking: heard as something never accepted (a flag of a `blocking` kind: alarming, out of
 *   bounds, crude), unless `waivers` (production/heard-waivers.json for this draft or segment)
 *   quotes the line's heard text for an out-of-bounds subject, with a judgement;
 * - hard: the best effort left it unsayable, or flagged for something other than a real name
 *   (a statement heard differently): recorded in the voice research file, then accepted;
 * - weak: heard in most takes, not all;
 * - different: a real person's line heard differently (the caption carries the exact words).
 */
export function fitProblems(fit, blocking = BLOCKING, { waivers = {} } = {}) {
  const lines = fit?.lines ?? []
  const waived = (l, f) => {
    if (kindOf(f) !== 'out of bounds') return false
    const w = waivers?.[l.id]
    return !!w && (l.heard ?? []).some((h) => h.text === w.heard) && String(w.judgement ?? '').trim().length >= 10
  }
  const blocks = (l) => (l.flags ?? []).some((f) => blocking.includes(kindOf(f)) && !waived(l, f))
  const nameWords = (l) => new Set((l.flags ?? []).filter((f) => f.startsWith('name: ')).flatMap((f) => words(f.slice(6))))
  const hard = (l) => {
    if (blocks(l) || (l.flags ?? []).some((f) => blocking.includes(kindOf(f)))) return false
    if (l.status === 'unsayable') return !Array.isArray(l.missed) || l.missed.some((m) => !nameWords(l).has(m.word ?? m))
    return l.status === 'flagged' && (l.flags ?? []).some((f) => !f.startsWith('name: '))
  }
  const real = (l) => l.real === true || (l.flags ?? []).some((f) => f.startsWith('name: ') || f.startsWith('statement: '))
  return {
    blocking: lines.filter(blocks),
    hard: lines.filter(hard),
    weak: lines.filter((l) => l.status === 'weak' && !blocks(l)),
    different: lines.filter((l) => real(l) && (l.status !== 'ok' || (l.flags ?? []).length) && !blocks(l)),
  }
}

const words = (s) => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean)
const hasPhrase = (text, phrase) => ` ${words(text).join(' ')} `.includes(` ${words(phrase).join(' ')} `)

/** the voice research file, or an empty one */
export function readResearch(ctx) {
  const f = join(ctx.root, RESEARCH_FILE)
  try {
    const r = JSON.parse(readFileSync(f, 'utf8'))
    return { words: r.words ?? [], patterns: r.patterns ?? [] }
  } catch {
    return { words: [], patterns: [] }
  }
}

/** the source id the research file records a draft or segment under: "<episode id>/<slug>" */
export const researchSource = (ctx, { draft, seg }) => `${ctx.id}/${draft ?? seg}`

/** a hard line is recorded when a hard word (cannot, unstable) or a pattern seen in this source covers a word of its caption */
export function isRecorded(research, line, source) {
  const at = (e) => (e.seen ?? []).includes(source)
  if ((research.words ?? []).some((e) => at(e) && e.status !== 'works' && hasPhrase(line.text, e.word))) return true
  return (research.patterns ?? []).some((p) => at(p) && (p.words ?? []).some((w) => hasPhrase(line.text, w)))
}

/** one line of a fit, short: what it says and what was heard most often */
export const heardLine = (l) => `${l.id ?? '?'} (${l.who}, ${l.status}${l.flags?.length ? `: ${l.flags.join(', ')}` : ''}): "${l.text}" heard as "${l.heard?.[0]?.text ?? '?'}"${l.score ? ` (${l.score.heard}/${l.score.of})` : ''}`
