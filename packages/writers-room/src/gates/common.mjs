// Shared by the gates. A gate is `async (ctx) => result`, where result is
// { name, ok, failures: [string], warnings: [string], skipped?: string }. Each failure says what is
// wrong, where, which rule it enforces, and what to do about it, because it is handed back to the
// writer verbatim.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { walk } from '../repo.mjs'

export function gate(name) {
  const r = { name, ok: true, failures: [], warnings: [] }
  r.fail = (msg) => {
    r.failures.push(msg)
    r.ok = false
  }
  r.warn = (msg) => r.warnings.push(msg)
  r.skip = (why) => {
    r.skipped = why
  }
  // a review's send-back: a valid end to a stage, routed to the stage that can fix it (trial finding 55)
  r.sendBack = (route, reason) => {
    r.sentBack = { route, reason }
  }
  r.done = () => ({ name: r.name, ok: r.ok, failures: r.failures, warnings: r.warnings, ...(r.skipped ? { skipped: r.skipped } : {}), ...(r.sentBack ? { sentBack: r.sentBack } : {}) })
  return r
}

export const read = (f) => (existsSync(f) ? readFileSync(f, 'utf8') : null)

/** the rundown the plan promises (segment ids), or [] */
export const planSegments = (ctx) => (Array.isArray(ctx.plan?.segments) ? ctx.plan.segments.filter((s) => s && typeof s.id === 'string') : [])

/** the episode's segments in rundown order (episode.json) */
export const rundown = (ctx) => (Array.isArray(ctx.meta?.rundown) ? ctx.meta.rundown : [])

/** text files that are part of the episode a viewer sees: the source the build bundles */
export function contentFiles(ctx) {
  const files = []
  for (const f of ['episode.json', 'cast.js', 'looks.js']) if (existsSync(join(ctx.paths.dir, f))) files.push(f)
  for (const seg of rundown(ctx)) for (const f of ['script.js', 'index.js']) if (existsSync(ctx.paths.segFile(seg, f))) files.push(`segments/${seg}/${f}`)
  return files
}

/** every text file in the episode folder, working papers included (not rendered audio or images) */
export const allTextFiles = (ctx) => walk(ctx.paths.dir, { skip: ['public'] }).filter((f) => /\.(js|mjs|json|md|txt)$/.test(f) && f !== 'production/state.json')

/** "a, b and 3 more" */
export const list = (xs, n = 5) => (xs.length <= n ? xs.join(', ') : `${xs.slice(0, n).join(', ')} and ${xs.length - n} more`)

/** the sources.json accounts by handle and posts by uri */
export function sourcesIndex(ctx) {
  const s = ctx.sources ?? {}
  const norm = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()
  const accounts = new Map((s.accounts ?? []).filter((a) => a?.handle).map((a) => [norm(a.handle), a]))
  const posts = new Map((s.posts ?? []).filter((p) => p?.uri).map((p) => [p.uri, p]))
  const links = (s.links ?? []).map((l) => (typeof l === 'string' ? { url: l } : l)).filter((l) => l?.url)
  return { accounts, posts, links }
}
