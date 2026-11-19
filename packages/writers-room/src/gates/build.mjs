// Stage 10, build (tools), and stage 11, review (a reviewer): the thumbnail; a preview build that
// matches its source; the scorecard filled in from the bible's; the episode written into the ledger
// and the tracker of who was featured when; and the reviewer's verdict, where a send-back is a valid
// end that routes to the stage that can fix it.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { gate, read } from './common.mjs'
import { scorecardSpec } from '../bible.mjs'
import { normHandle } from '../digest.mjs'
import { keyOf, person } from '../ledger.mjs'
import { STAGES } from '../stages.mjs'

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

/**
 * `npm run verify` checks published builds only, so it says nothing about a draft (trial finding 54).
 * A preview build is verified here the same way: its manifest's sourceHash equals the source's,
 * computed by scripts/lib/hash.mjs, the module verify uses.
 */
export async function buildPreviewVerify(ctx) {
  const g = gate('build.preview-verify')
  const manifest = join(ctx.paths.preview, 'episode.json')
  if (!existsSync(manifest)) {
    g.fail(`preview/${ctx.id}/episode.json is missing: the preview build did not finish`)
    return g.done()
  }
  const lib = join(ctx.root, 'scripts', 'lib', 'hash.mjs')
  if (!existsSync(lib)) {
    g.skip('scripts/lib/hash.mjs is not here: the preview could not be compared with its source')
    return g.done()
  }
  const { sourceHash } = await import(pathToFileURL(lib).href)
  const want = sourceHash(ctx.paths.dir)
  const got = JSON.parse(readFileSync(manifest, 'utf8')).build?.sourceHash
  if (got !== want) g.fail(`preview/${ctx.id} was built from other sources (manifest ${String(got).slice(0, 12)}, source ${want.slice(0, 12)}): rebuild it`)
  const meta = JSON.parse(readFileSync(ctx.paths.episodeJson, 'utf8'))
  if (meta.status !== 'draft') g.fail(`a preview-only episode must stay a draft (it is ${meta.status})`)
  if (existsSync(ctx.paths.dist)) g.fail(`a preview-only episode was built into dist/episodes/${ctx.id}/`)
  return g.done()
}

/**
 * production/scorecard.md: a Step 0 section, then Part A rows as `| A1 | pass | evidence |` and
 * Part B rows as `| B1 | 2 | evidence |`. The rows are read from the bible's scorecard
 * (docs/bible/10-process.md), not hard-coded, and the gate fails loudly when its shape changes.
 * The gate checks the card is complete and agrees with the verdict; a failing card with a send-back
 * verdict is a valid result, never a reason to rework the card (trial finding 55).
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

const verdictFile = (ctx) => join(ctx.paths.production, 'review.json')
const verdictOf = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null)

export async function reviewScorecard(ctx) {
  const g = gate('review.scorecard')
  const spec = scorecardSpec(ctx.bibleDir)
  if (spec.error) {
    g.fail(`${spec.error}; the review cannot be checked until the pipeline reads the bible's scorecard again`)
    return g.done()
  }
  const md = read(ctx.paths.scorecard)
  if (md === null) {
    g.fail('production/scorecard.md is missing (rows: the bible\'s scorecard)')
    return g.done()
  }
  if (spec.step0) {
    const step0 = /^#{2,3}\s+Step 0[^\n]*\n([\s\S]*?)(?=^#{2,3}\s)/im.exec(md + '\n## end')?.[1] ?? null
    if (step0 === null) g.fail('scorecard.md: no "## Step 0" section')
    else for (const seg of ctx.meta.rundown ?? []) if (!step0.includes(seg)) g.fail(`scorecard.md Step 0 does not list the segment ${seg}`)
  }
  const rows = parseScorecard(md)
  const known = new Set([...spec.a, ...spec.b])
  for (const id of rows.keys()) if (!known.has(id)) g.fail(`scorecard.md has a row ${id}, which the bible's scorecard does not (rows: ${[...known].join(' ')})`)
  let failsA = []
  for (const id of spec.a) {
    const a = rows.get(id)
    if (!a) g.fail(`scorecard.md: no row ${id}`)
    else {
      if (!['pass', 'fail'].includes(a.result)) g.fail(`scorecard.md ${id}: the result must be pass or fail, not ${JSON.stringify(a.result)}`)
      if (a.result === 'fail') failsA.push(id)
      if (a.evidence.replace(/[^a-z0-9]/gi, '').length < 12) g.fail(`scorecard.md ${id}: give one sentence of evidence (a line, a timestamp, a URI)`)
    }
  }
  let b = 0
  const zeros = []
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
      if (score === 0 && spec.noZero.includes(id)) zeros.push(id)
    }
    if (q.evidence.replace(/[^a-z0-9]/gi, '').length < 12) g.fail(`scorecard.md ${id}: give one sentence of evidence`)
  }
  const approvable = !failsA.length && !zeros.length && b >= spec.approveAt
  const v = verdictOf(verdictFile(ctx))
  if (v?.verdict === 'approve' && !approvable) g.fail(`review.json approves, but the scorecard does not (${[failsA.length ? `Part A fails: ${failsA.join(', ')}` : '', zeros.length ? `0 in ${zeros.join(', ')}` : '', b < spec.approveAt ? `Part B ${b} of ${spec.maxB}, under ${spec.approveAt}` : ''].filter(Boolean).join('; ')}): the verdict follows the card`)
  g.warn(`scorecard: Part B ${b}/${spec.maxB} (approve at ${spec.approveAt}, no 0 in ${spec.noZero.join(', ')})${failsA.length ? `; Part A fails ${failsA.join(', ')}` : ''}`)
  return g.done()
}

/**
 * The episode in the ledger (docs/ledger/<id>.json) and the tracker (docs/ledger/featured.json)
 * agree with what is on screen, by DID: guests are sources.json's accounts with role "guest";
 * featured are those and every account whose post is shown or performed.
 */
export async function reviewLedger(ctx) {
  const g = gate('review.ledger')
  const file = join(ctx.ledgerDir, `${ctx.id}.json`)
  if (!existsSync(file)) {
    g.fail(`${ctx.paths.rel(file)} is missing: write the episode into the ledger`)
    return g.done()
  }
  if (!existsSync(join(ctx.ledgerDir, `${ctx.id}.md`))) g.fail(`${ctx.paths.rel(join(ctx.ledgerDir, ctx.id + '.md'))} is missing: the prose record a reviewer reads`)
  let j
  try {
    j = JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    g.fail(`${ctx.paths.rel(file)}: ${e.message}`)
    return g.done()
  }
  if (j.id !== ctx.id) g.fail(`${ctx.paths.rel(file)}: "id" must be ${ctx.id}`)
  for (const k of ['formats', 'runners', 'catchphrases', 'devices']) if (!Array.isArray(j[k])) g.fail(`${ctx.paths.rel(file)}: "${k}" must be a list`)
  for (const k of ['guests', 'featured']) {
    if (!Array.isArray(j[k])) g.fail(`${ctx.paths.rel(file)}: "${k}" must be a list of { "did", "handle" }`)
    else for (const p of j[k]) if (!p?.did || !String(p.did).startsWith('did:')) g.fail(`${ctx.paths.rel(file)}: every entry in "${k}" needs its "did" (handles change)`)
  }
  const d = ctx.digest
  const s = ctx.sources ?? {}
  const accounts = new Map((s.accounts ?? []).map((a) => [normHandle(a.handle), a]))
  const didOf = (h) => accounts.get(normHandle(h))?.did ?? keyOf(h, d)
  const spoke = new Set((s.accounts ?? []).filter((a) => a.role === 'guest').map((a) => a.did ?? keyOf(a.handle, d)))
  const shown = new Set([...spoke, ...(s.posts ?? []).filter((p) => ['card', 'quote', 'thread', 'line'].includes(p.use)).map((p) => didOf(p.author))])
  const has = (list, k) => (list ?? []).some((p) => keyOf(p, d) === k)
  for (const k of spoke) if (!has(j.guests, k)) g.fail(`${ctx.paths.rel(file)}: "guests" is missing ${k}, whose puppet speaks in the episode`)
  for (const p of j.guests ?? []) if (!spoke.has(keyOf(p, d))) g.fail(`${ctx.paths.rel(file)}: "guests" lists ${person(p).handle ?? keyOf(p, d)}, who does not speak in the episode`)
  for (const k of shown) if (!has(j.featured, k)) g.fail(`${ctx.paths.rel(file)}: "featured" is missing ${k}, who is shown on screen`)
  const music = (ctx.plan?.segments ?? []).find((x) => x.genre)
  if (music && String(j.song?.genre ?? '').toLowerCase().trim() !== String(music.genre).toLowerCase().trim()) g.fail(`${ctx.paths.rel(file)}: "song.genre" is ${JSON.stringify(j.song?.genre)}, the episode's song is ${JSON.stringify(music.genre)}`)
  // the tracker of who was featured when
  const tracker = ctx.ledger.tracker ?? {}
  if (!existsSync(join(ctx.ledgerDir, 'featured.json'))) g.fail(`${ctx.paths.rel(join(ctx.ledgerDir, 'featured.json'))} is missing: add this episode's appearances to the tracker`)
  for (const k of shown) {
    const t = tracker[k]
    const role = spoke.has(k) ? 'spoke' : 'shown'
    if (!t?.appearances?.some((a) => a.episode === ctx.id && a.role === role)) g.fail(`the tracker (featured.json) has no appearance { "episode": "${ctx.id}", "role": "${role}" } for ${k}`)
  }
  for (const [k, t] of Object.entries(tracker)) for (const a of t?.appearances ?? []) if (a.episode === ctx.id && !shown.has(k)) g.fail(`the tracker lists ${t.handle ?? k} in ${ctx.id}, who is not on screen`)
  return g.done()
}

/**
 * A review's verdict file: production/review.json (stage 11) or production/stage/review.json
 * (stage 9). "approve"/"pass" passes; "send-back" is a valid end that names the stage that can fix it.
 */
export async function reviewVerdict(ctx, name = 'review.verdict') {
  const g = gate(name)
  const file = name.startsWith('stage') ? join(ctx.paths.production, 'stage', 'review.json') : verdictFile(ctx)
  const v = verdictOf(file)
  if (!v) {
    g.fail(`${ctx.paths.rel(file)} is missing`)
    return g.done()
  }
  if (['approve', 'pass'].includes(v.verdict)) return g.done()
  if (v.verdict !== 'send-back') {
    g.fail(`${ctx.paths.rel(file)}: "verdict" must be ${name.startsWith('stage') ? '"pass"' : '"approve"'} or "send-back"`)
    return g.done()
  }
  if (!STAGES.includes(v.route)) g.fail(`${ctx.paths.rel(file)}: a send-back names the stage that can fix it in "route" (${STAGES.join(', ')})`)
  else g.sendBack(v.route, (v.reasons ?? []).join('; ') || 'no reason given')
  return g.done()
}
