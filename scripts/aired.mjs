#!/usr/bin/env node
// npm run aired -- <ep>
//
// Everything from a real account that airs in the episode (a tagged line, a post address, a post
// card, a real account's puppet or card) and has no record in its production/sources.json; see
// scripts/lib/aired.mjs. Reads the segments, not the digest, so it runs on any checkout. The build
// runs the same check (a published build fails on a finding, a preview warns).
// Output: one line per finding, then `aired <id> findings=<n> notes=<n>`; notes (stderr) are cards
// whose text it could not read.
// Exit codes: 0 nothing unrecorded, 1 findings, 2 bad arguments or unknown episode.
import { cli, resolveEpisode, EpisodeError } from './lib/episodes.mjs'
import { airedReport } from './lib/aired.mjs'

cli(async () => {
  const args = process.argv.slice(2)
  if (args.length !== 1 || args[0].startsWith('--')) throw new EpisodeError('usage: npm run aired -- <ep>')
  const ep = resolveEpisode(args[0])
  const r = await airedReport(ep)
  for (const l of r.out) console.log(l)
  for (const l of r.err) console.error(l)
  return r.code
})
