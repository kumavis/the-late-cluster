#!/usr/bin/env node
// npm run thumbnail -- <ep> [<seg> <t>] [--t 2] [--out file]
// Shoots a frozen frame into episodes/<id>/thumbnail.jpg, through the studio's frame shooter:
// the title card at --t seconds (default 2), or, given a segment and a time, that moment of the
// segment. --out writes somewhere else instead. Prints `thumbnail <path>`.
// Exit codes: 0 written, 1 the shot failed, 2 bad arguments, unknown episode or segment.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { cli, resolveEpisode, requireSegment, EpisodeError, REPO } from './lib/episodes.mjs'

const USAGE = 'usage: npm run thumbnail -- <ep> [<seg> <t>] [--t 2] [--out file]'

cli(() => {
  const argv = process.argv.slice(2)
  const take = (name) => {
    const i = argv.indexOf(`--${name}`)
    if (i < 0) return undefined
    if (argv[i + 1] === undefined) throw new EpisodeError(USAGE)
    return argv.splice(i, 2)[1]
  }
  const titleT = take('t')
  const out = take('out')
  if (argv.some((a) => a.startsWith('--')) || (argv.length !== 1 && argv.length !== 3)) throw new EpisodeError(USAGE)
  const [epArg, seg, segT] = argv
  if (seg && titleT !== undefined) throw new EpisodeError(`--t is for the title card; for a segment give its time: ${USAGE}`)
  const id = seg ?? 'title'
  const t = seg ? segT : titleT ?? '2'
  if (!Number.isFinite(Number(t)) || Number(t) < 0) throw new EpisodeError(`not a time (seconds): ${JSON.stringify(t)}`)
  const ep = resolveEpisode(epArg)
  if (ep.ref) throw new EpisodeError('the reference episode has no thumbnail')
  if (seg) {
    requireSegment(ep, seg)
    if (!existsSync(ep.segFile(seg, 'index.js'))) throw new EpisodeError(`${seg} has no index.js to shoot`)
  }
  const file = out ? resolve(out) : join(ep.dir, 'thumbnail.jpg')
  const r = spawnSync(process.execPath, [join(REPO, 'packages/show/tools/shoot.mjs'), ep.id, id, String(t), '--jpeg', file, '--quiet'], { stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' })
  if (r.status !== 0) {
    process.stdout.write(r.stdout ?? '')
    throw new EpisodeError(`could not shoot ${id} at ${t} s (shoot exited ${r.status})`, 1)
  }
  console.log(`thumbnail ${file.startsWith(REPO + '/') ? ep.rel(file) : file}`)
  return 0
})
