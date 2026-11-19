#!/usr/bin/env node
// node packages/writers-room/bin/self-test.mjs [--week 2099-W01] [--keep] [--fixture dir]
//
// Runs the whole pipeline end to end with the fixture writer and the real tools on this machine
// (scaffold, render, check, Whisper if installed, shoot, thumbnail, build, verify): a two-segment
// trial episode from an invented digest, with trial limits, appending to a scratch copy of the lore
// file. Then removes every trace (the episode, its build, preview, frames and Whisper scratch)
// unless --keep. Needs bun, ffmpeg and Playwright's Chromium. Exit code: the pipeline's.
import { copyFileSync, existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { produce } from '../src/pipeline.mjs'
import { findEpisodeForWeek, PKG, REPO } from '../src/repo.mjs'

const argv = process.argv.slice(2)
const opt = (k, d) => (argv.includes(`--${k}`) ? argv[argv.indexOf(`--${k}`) + 1] : d)
const week = opt('week', '2099-W01')
const keep = argv.includes('--keep')
const fixture = opt('fixture', join(PKG, 'test', 'fixtures', 'trial'))
const extra = argv.includes('--from') ? { from: opt('from') } : {}

if (findEpisodeForWeek(REPO, week) && !extra.from && !argv.includes('--resume')) {
  console.error(`error: an episode already claims ${week}; pass --resume to continue it, or pick another --week`)
  process.exit(1)
}
const scratch = mkdtempSync(join(tmpdir(), 'writers-room-self-test-'))
const lore = join(scratch, 'lore.md')
copyFileSync(join(REPO, 'docs', 'bible', 'lore.md'), lore)
console.log(`self-test ${week}: fixture ${fixture}; lore copy ${lore}`)

let code = 1
try {
  code = await produce({ root: REPO, week, writer: 'fixture', fixture, digest: join(fixture, 'digest'), limits: join(fixture, 'limits.json'), lore, ...extra })
} finally {
  const ep = findEpisodeForWeek(REPO, week)
  if (ep && !keep) {
    const gone = []
    for (const p of [ep.dir, join(REPO, 'dist', 'episodes', ep.id), join(REPO, 'preview', ep.id), join(REPO, 'shots', ep.id), join(REPO, 'packages', 'show', 'tools', '.cache', 'whisper', ep.id)]) {
      if (existsSync(p)) {
        rmSync(p, { recursive: true, force: true })
        gone.push(p.slice(REPO.length + 1))
      }
    }
    const locks = join(REPO, 'packages', 'show', 'tools', '.cache', 'locks')
    if (existsSync(locks)) for (const f of readdirSync(locks)) if (f.startsWith(`${ep.id}--`)) rmSync(join(locks, f), { force: true })
    for (const d of ['preview', 'shots']) if (existsSync(join(REPO, d)) && !readdirSync(join(REPO, d)).length) rmSync(join(REPO, d), { recursive: true })
    rmSync(scratch, { recursive: true, force: true })
    console.log(`self-test: removed ${gone.join(', ')}`)
  } else if (ep) console.log(`self-test: kept ${ep.id} (--keep); remove episodes/${ep.id}, dist/episodes/${ep.id}, preview/${ep.id}, shots/${ep.id} by hand`)
}
console.log(`self-test ${week}: exit ${code}`)
process.exitCode = code
