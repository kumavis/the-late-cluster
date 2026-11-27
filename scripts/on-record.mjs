#!/usr/bin/env node
// npm run on-record -- <ep>
//
// The gates on record (scripts/lib/onrecord.mjs): every rundown segment that was a draft has script
// repetition verdicts from two reviewers, every line written at assembly has its own two, and every
// real account that airs was covered by a passing consent refresh. Reads production/, needs no digest
// and no network. The build runs the same check (a published build fails on a finding, a preview warns).
// Output: one line per finding, then `on-record <id> findings=<n>`.
// Exit codes: 0 everything on record, 1 findings, 2 bad arguments or unknown episode.
import { cli, resolveEpisode, EpisodeError } from './lib/episodes.mjs'
import { onRecordReport } from './lib/onrecord.mjs'

cli(async () => {
  const args = process.argv.slice(2)
  if (args.length !== 1 || args[0].startsWith('--')) throw new EpisodeError('usage: npm run on-record -- <ep>')
  const r = await onRecordReport(resolveEpisode(args[0]))
  for (const l of r.out) console.log(l)
  return r.code
})
