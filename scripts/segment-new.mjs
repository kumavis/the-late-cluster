#!/usr/bin/env node
// npm run segment:new -- <ep> <seg> [--force]
// Adds a segment skeleton (a couple of lines and a default shot) to an episode and appends it to
// the rundown. Prints `created <ep-id> <seg> <dir>`. --force is needed for a published episode.
// Exit codes: 0 created, 1 refused (exists, published), 2 bad arguments or unknown episode.
import { cli, EpisodeError } from './lib/episodes.mjs'
import { newSegment } from './lib/scaffold.mjs'

cli(() => {
  const argv = process.argv.slice(2)
  const force = argv.includes('--force')
  const rest = argv.filter((a) => a !== '--force')
  if (rest.length !== 2 || rest.some((a) => a.startsWith('--'))) throw new EpisodeError('usage: npm run segment:new -- <ep> <seg> [--force]')
  const { ep, seg, dir } = newSegment({ episode: rest[0], seg: rest[1], force })
  console.log(`created ${ep.id} ${seg} ${ep.rel(dir)}`)
  console.log(`next: npm run render -- ${ep.id} ${seg} && npm run dev -- ${ep.id}  (then /?seg=${seg})`)
  return 0
})
