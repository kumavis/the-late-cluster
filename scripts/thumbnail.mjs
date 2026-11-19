#!/usr/bin/env node
// npm run thumbnail -- <ep> [--t 2]
// Shoots the episode's title card (a frozen frame at t seconds, default 2) into
// episodes/<id>/thumbnail.jpg, through the studio's frame shooter. Prints `thumbnail <path>`.
// Exit codes: 0 written, 1 the shot failed, 2 bad arguments or unknown episode.
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { cli, resolveEpisode, EpisodeError, REPO } from './lib/episodes.mjs'

cli(() => {
  const argv = process.argv.slice(2)
  const ti = argv.indexOf('--t')
  const t = ti >= 0 ? argv.splice(ti, 2)[1] : '2'
  if (argv.length !== 1 || !Number.isFinite(Number(t))) throw new EpisodeError('usage: npm run thumbnail -- <ep> [--t 2]')
  const ep = resolveEpisode(argv[0])
  if (ep.ref) throw new EpisodeError('the reference episode has no thumbnail')
  const file = join(ep.dir, 'thumbnail.jpg')
  const r = spawnSync(process.execPath, [join(REPO, 'packages/show/tools/shoot.mjs'), ep.id, 'title', String(t), '--jpeg', file, '--quiet'], { stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' })
  if (r.status !== 0) {
    process.stdout.write(r.stdout ?? '')
    throw new EpisodeError(`could not shoot the title card (shoot exited ${r.status})`, 1)
  }
  console.log(`thumbnail ${ep.rel(file)}`)
  return 0
})
