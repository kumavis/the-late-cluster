// The gates on record: nothing reaches air without the gates every segment passes at select and at
// assembly (the owner's decision of 27 November 2026, "Yes, same gates"). Episode 002 aired two
// segments that joined after select: nobody gave their finished scripts the script repetition gate,
// and the consent refresh for one segment's accounts was only done after it aired. This check reads
// what the pipeline recorded, needs no digest and no network, and runs inside the build.
//
//   onRecordFindings(ep, { aired }) → { findings: [{ seg, what, ref, message }] }
//
// For each segment in the rundown:
//   - a segment drafted before select (production/drafts/<seg>/, or the assembly snapshot) has
//     script repetition verdicts from two reviewers in production/review/repetition-scripts.json,
//     and the verdict on record is not "repeat";
//   - every line written or changed at assembly (the open, the close, the joins; a segment that was
//     never a draft is all such lines) has verdicts from two reviewers on its current words in
//     production/review/repetition-assembly.json, and none is "repeat";
//   - every real account that airs in it (./aired.mjs: its puppet speaks or appears, or its card is
//     shown) is in the source list a passing consent refresh was run on: production/select/sources.json,
//     whose "selection" a production/review/consent/r<n>.json with "verdict": "pass" names, or, for
//     what assembly added, production/assemble/consent-sources-r<n>.json and its passing
//     production/review/consent-assembly/r<n>.json (consentCoverage in the writers' room).
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { episodePaths, PKG } from '../../packages/writers-room/src/repo.mjs'
import { normHandle } from '../../packages/writers-room/src/digest.mjs'
import { addedLines, consentCoverage } from '../../packages/writers-room/src/stage/late.mjs'
import { airedFindings } from './aired.mjs'

/**
 * Episodes that aired before this check existed, built without the records it reads. Episode 002's
 * two late segments cannot pass it and its build must stay reproducible, so both are exempt by id.
 * Closed: nothing is ever added to this list; every later episode is made with these records.
 */
export const PREDATES_GATE_RECORDS = new Set(['001-pilot', '002-2026-w47'])

const VERDICTS = new Set(['fresh', 'turned', 'repeat'])
const readJson = (f) => {
  if (!existsSync(f)) return null
  try {
    return JSON.parse(readFileSync(f, 'utf8'))
  } catch {
    return null
  }
}
const reviewersOf = (v) => new Set((v?.verdicts ?? []).filter((x) => VERDICTS.has(x?.verdict)).map((x) => x.reviewer)).size
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`

/** how many reviewers each repetition gate needs (the writers' room's configuration) */
export function reviewersNeeded() {
  return readJson(join(PKG, 'config', 'pipeline.json'))?.repetition?.reviewers ?? 2
}

export async function onRecordFindings(ep, { aired } = {}) {
  const findings = []
  if (ep.ref) return { findings }
  const paths = episodePaths(ep.root, ep.id)
  const need = reviewersNeeded()
  const add = (seg, what, ref, message) => findings.push({ seg, what, ref, message: `${seg}: ${message}` })
  const scripts = readJson(join(paths.production, 'review', 'repetition-scripts.json'))
  const assembly = readJson(join(paths.production, 'review', 'repetition-assembly.json'))
  const snapshot = readJson(join(paths.production, 'assemble', 'drafts.json')) ?? {}
  const drafted = (seg) => existsSync(join(paths.production, 'drafts', seg, 'script.js')) || Object.hasOwn(snapshot, seg)

  // the script repetition gate, on every segment that was a draft
  for (const seg of ep.rundown) {
    if (!drafted(seg)) continue
    const v = scripts?.verdicts?.[seg]
    const n = reviewersOf(v)
    if (n < need) add(seg, 'repetition-scripts', seg, `the script repetition gate has verdicts from ${plural(n, 'reviewer')} on record (production/review/repetition-scripts.json); it needs ${need}`)
    else if (v.verdict === 'repeat') add(seg, 'repetition-scripts', seg, 'the script repetition gate\'s verdict on record is "repeat"')
  }
  // the lines written at assembly: the open, the close and the joins, and a segment that was never a draft
  let lines = []
  try {
    lines = addedLines({ paths }).filter((l) => ep.rundown.includes(l.seg))
  } catch {}
  for (const l of lines) {
    const v = assembly?.verdicts?.[l.id]
    const current = v && (!v.version || v.version === l.version) ? v : null
    const n = reviewersOf(current)
    const what = drafted(l.seg) ? `the line ${l.line} added or changed at assembly` : `the line ${l.line} (the segment was written at assembly)`
    if (n < need) add(l.seg, 'repetition-assembly', l.id, `${what} has verdicts from ${plural(n, 'reviewer')} on its current words on record (production/review/repetition-assembly.json); it needs ${need}`)
    else if (current.verdict === 'repeat') add(l.seg, 'repetition-assembly', l.id, `${what}: the verdict on record is "repeat"`)
  }
  // the consent refresh, on every real account that airs
  const { airing } = aired ?? (await airedFindings(ep))
  const covered = consentCoverage(paths.production)
  const sources = readJson(paths.sources)
  const didOf = new Map((sources?.accounts ?? []).filter((a) => a?.handle && a.did).map((a) => [normHandle(a.handle), a.did]))
  for (const seg of ep.rundown)
    for (const h of airing?.[seg] ?? []) {
      if (covered.handles.has(normHandle(h)) || covered.dids.has(didOf.get(normHandle(h)))) continue
      add(seg, 'consent', h, covered.rounds.length ? `${h} airs in it, and no consent refresh on record covered it (${covered.rounds.join(', ')}); an account first shown at assembly gets its own round there (assemble.consent-r<n>)` : `${h} airs in it, and no consent refresh on record passed for the source list it was run on (production/review/consent/ with production/select/sources.json, or production/review/consent-assembly/ with production/assemble/consent-sources-r<n>.json)`)
    }
  return { findings }
}

/** what `npm run on-record` prints: { out: [lines], code } (1 on a finding) */
export async function onRecordReport(ep) {
  const out = []
  if (PREDATES_GATE_RECORDS.has(ep.id)) out.push(`${ep.id} aired before the gates were checked on record: the build does not enforce these findings for it (PREDATES_GATE_RECORDS in scripts/lib/onrecord.mjs)`)
  const { findings } = await onRecordFindings(ep)
  for (const f of findings) out.push(`✗ ${f.message}`)
  out.push(`on-record ${ep.id} findings=${findings.length}`)
  return { out, code: findings.length ? 1 : 0 }
}
