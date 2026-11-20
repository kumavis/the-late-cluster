// Helpers shared by the stage definitions (src/stage/*.mjs).
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { filesIn, readJsonFile } from '../combine.mjs'
import { earlier } from '../ledger.mjs'

/** a production path, absolute */
export const P = (ctx, rel) => join(ctx.paths.production, rel)
/** a production path, relative to the repository root (what a brief names) */
export const W = (ctx, rel) => `episodes/${ctx.id}/production/${rel}`
export const R = (ctx, abs) => ctx.paths.rel(abs)
export const has = (f) => existsSync(f)
export const json = (f, fallback = null) => (existsSync(f) ? readJsonFile(f) : fallback)
export const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 12)
export const shaText = (s) => createHash('sha256').update(String(s)).digest('hex').slice(0, 12)
/** name a gate that is shared between stages */
export const as = (fn, name) => Object.defineProperty((ctx) => fn(ctx, name), 'name', { value: name })

export const reviewerIds = (ctx) => Array.from({ length: ctx.config.parallel.reviewers }, (_, k) => `reviewer-${k + 1}`)

/** the previous aired episode's ledger entry (an unaired draft is never "the previous episode") */
export const previousAired = (ctx) => earlier(ctx.ledger, ctx.paths.number)[0] ?? null
export const previousLabel = (ctx) => {
  const p = previousAired(ctx)
  return p ? `the previous aired episode (${p.id})` : 'no earlier aired episode'
}

/**
 * A task as a brief describes it. `writes` are paths relative to the episode's production folder
 * unless they start with episodes/, docs/ or shots/. `kind` picks the reading list (config reading.kinds).
 * `reads` are the files it works from, relative to the root (a trailing ? marks one that may not exist yet). `rules` are the
 * gate's rules for this task, stated so nobody needs to read the pipeline. `keys` pick out this
 * task's lines from a gate's output for --check --task.
 */
export function task(ctx, stage, t) {
  const abs = (p) => (/^(episodes|docs|shots|data|packages|\.\.)\//.test(p) || p.startsWith('/') ? p : W(ctx, p))
  const writes = t.writes.map(abs)
  const keys = t.keys ?? [...new Set([...writes.map((w) => w.replace(`episodes/${ctx.id}/production/`, '').replace(`episodes/${ctx.id}/`, '')), t.segment, t.lane].filter(Boolean))]
  return { stage, kind: stage, rules: [], reads: [], cards: [], ...t, writes, keys, check: `npm run produce -- --week ${ctx.week} --check ${stage} --task ${t.id}` }
}

/** reviewers' verdict files of one gate: <dir>/<reviewer>-r<n>.json */
export function repetitionFiles(dir) {
  return filesIn(dir, '.json').map((f) => {
    const m = /([a-z0-9-]+?)-r(\d+)\.json$/.exec(f.split('/').pop())
    const j = readJsonFile(f)
    return { ...j, reviewer: j.reviewer ?? m?.[1] ?? f, round: Number(j.round ?? m?.[2] ?? 1), file: f }
  })
}

/** what each reviewer still has to judge (an item changes version when it is reworked) */
export function pendingRepetition(files, items, reviewers) {
  const out = {}
  for (const r of reviewers) {
    const mine = files.filter((f) => f.reviewer === r)
    const missing = items.filter((it) => !mine.some((f) => (f.items ?? []).some((x) => x.id === it.id && (!it.version || x.version === it.version))))
    if (missing.length) out[r] = { round: Math.max(0, ...mine.map((f) => f.round)) + 1, items: missing }
  }
  return out
}

export const excludedOf = (ctx, stage) => ctx.state?.stages?.[stage]?.data?.excluded ?? []

/** subfolders of a folder (none when missing) */
export const dirsIn = (dir) => (existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort() : [])

/** the repetition gate's rules, stated in every brief that gives a verdict */
export const REPETITION_RULES = (ctx) => [
  'Each item gets exactly one verdict in the field "verdict": "fresh" (not done before), "turned" (takes something the show did and turns it on its head, by inverting the expectation it set up or by making fun of the joke itself) or "repeat" (the same joke, runner, catchphrase, device or shape as before).',
  'A "turned" verdict gives "turned": { "what", "how" } and "fromPrevious": true when what it turns is from the previous aired episode. At most one turned item per episode.',
  'A "repeat" gives "avoid": one line, the least the writer needs in order to steer clear, with no earlier script, title, line or reaction in it. It is the only thing the writer will see.',
  `Only aired episodes count. "The previous episode" means ${previousLabel(ctx)}; something only an unaired draft used is fresh (say so in "reason").`,
  'Two reviewers judge every item independently; the stricter verdict stands; any repeat blocks.',
]
