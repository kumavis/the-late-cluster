#!/usr/bin/env node
// npm run episode:new -- --title "..." [--week 2026-W47] [--date 2026-11-20] [--slug name]
// Scaffolds the next numbered episode as a draft. Prints `created <id> <dir>`.
// Exit codes: 0 created, 1 refused (already exists), 2 bad arguments.
import { cli, EpisodeError } from './lib/episodes.mjs'
import { newEpisode } from './lib/scaffold.mjs'

cli(() => {
  const argv = process.argv.slice(2)
  const o = {}
  for (let i = 0; i < argv.length; i++) {
    const m = /^--(title|week|date|slug)$/.exec(argv[i])
    if (!m || argv[i + 1] === undefined) throw new EpisodeError(`unexpected argument ${JSON.stringify(argv[i])}; usage: npm run episode:new -- --title "..." [--week 2026-W47] [--date 2026-11-20] [--slug name]`)
    o[m[1]] = argv[++i]
  }
  const { id, dir } = newEpisode(o)
  console.log(`created ${id} episodes/${id}`)
  console.log(`next: npm run segment:new -- ${Number(id.slice(0, 3))} <seg>`)
  return 0
})
