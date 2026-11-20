// The one place that knows the studio's fitting and rendering commands (packages/show), so a
// rename there is one edit here.
//
//   npm run fit -- <ep> --draft <slug> --json   writes production/drafts/<slug>/fit.json
//   npm run fit -- <ep> <seg> --json            writes segments/<seg>/fit.json
//   npm run render -- <ep> --draft <slug>       a draft's audio, for a sound editor
//   npm run voices -- <ep> [--drafts]           the voices in use, so guests can be told apart
//
// fit.json: { segment, lines: [{ id, who, kind, text, as, heard: [{ text, count }], score: { heard, of },
//   status: 'ok'|'weak'|'flagged'|'unsayable', flags: [], tried: [] }], voices: {…} }. The command exits
//   0 only when no line is flagged or unsayable.
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

/** the lines of a fit that block (flagged or unsayable) and those that are only weak */
export function fitProblems(fit, blocking = ['flagged', 'unsayable']) {
  const lines = fit?.lines ?? []
  return { blocking: lines.filter((l) => blocking.includes(l.status)), weak: lines.filter((l) => l.status === 'weak') }
}

/** one line of a fit, short: what it says and what was heard most often */
export const heardLine = (l) => `${l.id ?? '?'} (${l.who}, ${l.status}${l.flags?.length ? `: ${l.flags.join(', ')}` : ''}): "${l.text}" heard as "${l.heard?.[0]?.text ?? '?'}"${l.score ? ` (${l.score.heard}/${l.score.of})` : ''}`
