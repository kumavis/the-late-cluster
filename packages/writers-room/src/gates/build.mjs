// Stage 6, build (tools) and self-check (writer): the thumbnail, the build and verify; then
// production/scorecard.md (bible 10, the scorecard, with evidence in every row) and this episode's
// entry in the lore file.
import { existsSync, readFileSync } from 'node:fs'
import { gate, read } from './common.mjs'
import { rotationLog, scorecardSpec } from '../bible.mjs'

export async function buildThumbnail(ctx) {
  const g = gate('build.thumbnail')
  if (!existsSync(ctx.paths.thumbnail)) g.fail('episodes/<id>/thumbnail.jpg is missing (npm run thumbnail)')
  else {
    const b = readFileSync(ctx.paths.thumbnail)
    if (!(b[0] === 0xff && b[1] === 0xd8)) g.fail('thumbnail.jpg is not a JPEG')
    if (b.length > 1_000_000) g.fail(`thumbnail.jpg is ${b.length} bytes; the bot refuses over 1,000,000`)
  }
  return g.done()
}

/** the id lines in the lore file: SL-01, G-07, CL-12, E-001 … */
export const loreIds = (text) => [...new Set([...String(text).matchAll(/\*\*((?:SL|G|CL|E)-\d+)/g)].map((m) => m[1]))]

/**
 * production/scorecard.md: a Step 0 section, then Part A rows as `| A1 | pass | evidence |` and
 * Part B rows as `| B1 | 2 | evidence |`. The rows and the approval rule are read from
 * docs/bible/10-process.md (bible.mjs, scorecardSpec), not hard-coded. Every row has evidence (one
 * sentence: a line, a timestamp, a URI). A self-check that would send the episode back stops the run.
 */
export function parseScorecard(md) {
  const rows = new Map()
  for (const line of String(md).split('\n')) {
    const cells = line.split('|').map((c) => c.trim())
    if (cells.length < 4) continue
    const id = /^\**([AB]\d{1,2})\**$/.exec(cells[1])?.[1]
    if (!id) continue
    rows.set(id, { result: cells[2].replace(/\*/g, '').toLowerCase(), evidence: cells.slice(3).filter(Boolean).join(' | ') })
  }
  return rows
}

export async function selfCheckScorecard(ctx) {
  const g = gate('self-check.scorecard')
  const spec = scorecardSpec(ctx.bibleDir)
  if (spec.error) {
    g.fail(`${spec.error}; the self-check cannot be judged until the pipeline reads the bible's scorecard again`)
    return g.done()
  }
  const md = read(ctx.paths.scorecard)
  if (md === null) {
    g.fail('production/scorecard.md is missing (format: playbooks/self-check.md)')
    return g.done()
  }
  // Step 0: every segment listed with its retell and its turn or feeling
  if (spec.step0) {
    const step0 = /^#{2,3}\s+Step 0[^\n]*\n([\s\S]*?)(?=^#{2,3}\s)/im.exec(md + '\n## end')?.[1] ?? null
    if (step0 === null) g.fail('scorecard.md: no "## Step 0" section: list every segment, standing item and runner with its one-sentence retell and its turn or feeling in five words (bible 10)')
    else for (const seg of ctx.meta.rundown ?? []) if (!step0.includes(seg)) g.fail(`scorecard.md Step 0 does not list the segment ${seg}`)
  }
  const rows = parseScorecard(md)
  const known = new Set([...spec.a, ...spec.b])
  for (const id of rows.keys()) if (!known.has(id)) g.fail(`scorecard.md has a row ${id}, which the bible's scorecard does not (rows: ${[...known].join(' ')}); copy the rows from docs/bible/10-process.md`)
  for (const id of spec.a) {
    const a = rows.get(id)
    if (!a) g.fail(`scorecard.md: no row ${id}`)
    else {
      if (!['pass', 'fail'].includes(a.result)) g.fail(`scorecard.md ${id}: the result must be pass or fail, not ${JSON.stringify(a.result)}`)
      else if (a.result === 'fail') g.fail(`scorecard.md ${id} fails by the writer's own check: ${a.evidence || '(no evidence)'}. Fix it at the stage that made it (produce --from write or --from direct)`)
      if (a.evidence.replace(/[^a-z0-9]/gi, '').length < 12) g.fail(`scorecard.md ${id}: give one sentence of evidence (a line, a timestamp, a URI), not just a result`)
    }
  }
  let b = 0
  for (const id of spec.b) {
    const q = rows.get(id)
    if (!q) {
      g.fail(`scorecard.md: no row ${id}`)
      continue
    }
    const score = /^[012]$/.test(q.result) ? Number(q.result) : null
    if (score === null) g.fail(`scorecard.md ${id}: the score must be 0, 1 or 2, not ${JSON.stringify(q.result)}`)
    else {
      b += score
      if (score === 0 && spec.noZero.includes(id)) g.fail(`scorecard.md ${id} scores 0, which sends the episode back (bible 10); revise before review`)
    }
    if (q.evidence.replace(/[^a-z0-9]/gi, '').length < 12) g.fail(`scorecard.md ${id}: give one sentence of evidence, not just a score`)
  }
  if (spec.b.every((id) => rows.has(id)) && b < spec.approveAt) g.fail(`scorecard.md: Part B totals ${b} of ${spec.maxB}; approval needs ${spec.approveAt} (bible 10). Revise the weakest criteria first`)
  g.warn(`self-check: Part B ${b}/${spec.maxB} (approve at ${spec.approveAt}, no 0 in ${spec.noZero.join(', ')})`)
  return g.done()
}

export async function selfCheckLore(ctx) {
  const g = gate('self-check.lore')
  const text = read(ctx.loreFile)
  if (text === null) {
    g.fail(`the lore file ${ctx.loreFile} is missing`)
    return g.done()
  }
  const e = `E-${String(ctx.paths.number).padStart(3, '0')}`
  if (!new RegExp(`\\*\\*${e}\\b`).test(text)) g.fail(`the lore file has no episode log entry **${e} ...** for this episode (bible lore.md, how to append)`)
  const before = ctx.loreIdsBefore ?? []
  const now = new Set(loreIds(text))
  const lost = before.filter((id) => !now.has(id))
  if (lost.length) g.fail(`the lore file lost entries ${lost.join(', ')}; never renumber or delete, set a status instead (lore.md, how to append)`)
  const exp = /^##\s+Experiment log[^\n]*\n([\s\S]*?)(?=^##\s|$(?![\s\S]))/im.exec(text)?.[1]
  if (exp !== undefined && !new RegExp(`^\\|\\s*0*${ctx.paths.number}\\s*\\|`, 'm').test(exp)) g.fail(`the experiment log in the lore file has no row for ${String(ctx.paths.number).padStart(3, '0')}; add one from plan.json and dna-amendments.md (bible 10, stage 6)`)
  const log = rotationLog(text)
  if (log.error) g.fail(log.error)
  else if (!log.rows.some((r) => Number(r.ep) === ctx.paths.number)) g.fail(`the rotation log in the lore file has no row for ${String(ctx.paths.number).padStart(3, '0')}; add one, copied from plan.json (bible 03, the mechanism)`)
  else {
    const row = log.rows.find((r) => Number(r.ep) === ctx.paths.number)
    const song = (ctx.plan?.segments ?? []).find((s) => /^(song|the-number)$/i.test(s.format ?? ''))
    if (song?.genre && row.genre.toLowerCase().trim() !== String(song.genre).toLowerCase().trim()) g.fail(`the rotation log row for ${row.ep} gives the song genre "${row.genre}", but plan.json says "${song.genre}"`)
  }
  return g.done()
}

export const SELF_CHECK_GATES = [selfCheckScorecard, selfCheckLore]
