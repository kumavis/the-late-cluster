#!/usr/bin/env node
// node packages/writers-room/bin/end-to-end.mjs [--week 2099-W01] [--keep]
//
// The whole pipeline, all thirteen stages, with the real tools on this machine (scaffold, render,
// check, shoot, the credits helper, thumbnail, build --preview, verify, and the studio's fit and
// voices and the scraper's sources check once they are in package.json; until then a stand-in of
// the same shape, said so on the console) and the fixture runner standing in for the subagents
// (test/fixtures/workflow/tasks/). The fixture is built to be stopped: a repeat at the repetition
// gate on ideas (reworked, judged again), a turned verdict that passes, a line the fitting tool
// flags (a sound editor, then its writer), a repeat at the gate on scripts (redrafted, judged
// again), the consent refresh, a line added at assembly judged a repeat (reworked), a long unspoken
// label (the unread-text gate blocks until the builder is reworked), a change the stage auditor
// routes to the builder, and the cold-viewer test. The bible and the
// ledger it reads and writes are scratch copies; the episode is preview only. Afterwards every
// trace is removed (the episode, preview, frames, Whisper scratch, render-cache files it created,
// the scratch copies) unless --keep. Needs bun, ffmpeg, Playwright's Chromium and Whisper.
// (Not named *-test.mjs, so a bare `node --test` never starts it.)
// Exit code: 0 when every expected block happened and the run then finished.
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { produce } from '../src/pipeline.mjs'
import { findEpisodeForWeek, PKG, REPO } from '../src/repo.mjs'
import { hasScript } from '../src/scraper.mjs'
import { makeTools } from '../src/tools.mjs'
import { fakeFit, put } from '../test/helpers.mjs'

const argv = process.argv.slice(2)
const opt = (k, d) => (argv.includes(`--${k}`) ? argv[argv.indexOf(`--${k}`) + 1] : d)
const week = opt('week', '2099-W01')
const keep = argv.includes('--keep')
const FX = join(PKG, 'test', 'fixtures', 'workflow')

if (findEpisodeForWeek(REPO, week)) {
  console.error(`error: an episode already claims ${week}; remove it or pick another --week`)
  process.exit(1)
}
const scratch = mkdtempSync(join(tmpdir(), 'writers-room-end-to-end-'))
const bible = join(scratch, 'bible')
const ledger = join(scratch, 'ledger')
try {
  cpSync(join(REPO, 'docs', 'bible'), bible, { recursive: true })
  cpSync(join(FX, 'ledger'), ledger, { recursive: true })
} catch (e) {
  rmSync(scratch, { recursive: true, force: true })
  console.error(`error: could not prepare the scratch copies: ${e.message}`)
  process.exit(1)
}
const CACHE = join(REPO, 'packages', 'show', 'tools', '.cache')
const listCache = () => (existsSync(CACHE) ? new Set(readdirSync(CACHE)) : new Set())
const cacheBefore = listCache()
console.log(`end-to-end ${week}: fixture ${FX}; bible and ledger copies in ${scratch}`)

const lines = []
const print = (l) => {
  lines.push(l)
  console.log(l)
}
// the real tools, with a stand-in for each command another builder has not landed yet
const real = makeTools({ root: REPO })
const STAND_IN = {
  fit: (args) => fakeFit(REPO, args[0], args),
  voices: () => ({ code: 0, out: 'voices: stand-in\n', stdout: '' }),
  sources: (args) => {
    put(REPO, args[args.indexOf('--out') + 1], '# Sources (stand-in)\n\nNot checked: npm run sources is not in package.json yet.\n')
    return { code: 0, out: '{}\n', stdout: '{}\n' }
  },
}
// the sources check always uses the stand-in: the fixture's accounts are invented, and the end-to-end
// run stays off the network
const missing = Object.keys(STAND_IN).filter((n) => n === 'sources' || !hasScript(REPO, n))
for (const n of missing) console.log(`end-to-end: npm run ${n}: a stand-in of the same shape is used${n === 'sources' ? ' (no network)' : ' (not in package.json yet)'}`)
const tools = { ...real, hasScript: () => true, npm: (script, args, o) => (missing.includes(script) ? STAND_IN[script](args) : real.npm(script, args, o)) }
const run = (o = {}) => produce({ root: REPO, week, runner: 'fixture', fixture: join(FX, 'tasks'), digest: join(FX, 'digest'), settings: join(FX, 'settings.json'), bible, ledger, previewOnly: true, tools, ready: () => false, print, ...o })

const expect = []
const saw = (label, re) => expect.push({ label, ok: re.test(lines.join('\n')) })
let code = 1
try {
  const first = await run()
  saw('repeat blocks at the ideas gate, and the replacement idea is judged again', /fixture repetition-ideas\.rework-writer-1-3[\s\S]*fixture repetition-ideas\.reviewer-1-r2/)
  saw('a turned verdict passes', /warn turned: writer-2-3/)
  saw('every draft is fitted and heard as written (the studio\'s fitting tool)', /stage fit start[\s\S]*gate fit\.heard ok/)
  saw('repeat blocks at the scripts gate, and the redraft is judged again', /fixture select\.redraft-talk-ask[\s\S]*fixture select\.repetition-reviewer-2-r2/)
  saw('the consent refresh covers the selection', /fixture select\.consent-r1[\s\S]*gate select\.consent ok/)
  saw('a line added at assembly is judged a repeat and reworked', /fixture assemble\.rework[\s\S]*gate repetition\.assembly ok/)
  saw('the real render and the heard-text gate pass', /gate assemble\.render ok[\s\S]*gate render\.heard ok/)
  saw('a long label nobody reads blocks at stage.unread', /gate stage\.unread FAIL\n  FAIL segments\/talk-ask\/index\.js/)
  code = first === 1 ? await run({ rework: ['stage.talk-ask'] }) : -1
  saw('the credits are shot and checked', /gate stage\.credits ok/)
  saw('the stage auditor routes a change to the builder', /fixture stage\.fix-talk-ask-r1[\s\S]*gate stage\.audit ok/)
  saw('the preview build verifies', /gate build\.preview-verify ok/)
  saw('the cold viewer is shown frames', /fixture review\.viewer-1/)
  saw('the review writes the pull request text', /done; pull request text in/)
  const ep = findEpisodeForWeek(REPO, week)
  if (ep && existsSync(join(ledger, `${ep.id}.json`))) console.log(`end-to-end: ledger entry written to the scratch ledger: ${readFileSync(join(ledger, `${ep.id}.json`), 'utf8').slice(0, 200).replace(/\s+/g, ' ')}…`)
} finally {
  const ep = findEpisodeForWeek(REPO, week)
  if (ep && !keep) {
    const gone = []
    for (const p of [ep.dir, join(REPO, 'dist', 'episodes', ep.id), join(REPO, 'preview', ep.id), join(REPO, 'shots', ep.id), join(CACHE, 'whisper', ep.id)]) {
      if (existsSync(p)) {
        rmSync(p, { recursive: true, force: true })
        gone.push(p.slice(REPO.length + 1))
      }
    }
    const locks = join(CACHE, 'locks')
    if (existsSync(locks)) for (const f of readdirSync(locks)) if (f.startsWith(`${ep.id}--`)) rmSync(join(locks, f), { force: true })
    let clips = 0
    for (const f of listCache()) if (!cacheBefore.has(f)) {
      rmSync(join(CACHE, f), { recursive: true, force: true })
      clips++
    }
    for (const d of ['preview', 'shots']) if (existsSync(join(REPO, d)) && !readdirSync(join(REPO, d)).length) rmSync(join(REPO, d), { recursive: true })
    rmSync(scratch, { recursive: true, force: true })
    console.log(`end-to-end: removed ${gone.join(', ')}, ${clips} new render-cache file${clips === 1 ? '' : 's'}, and the scratch copies`)
  } else if (ep) console.log(`end-to-end: kept ${ep.id} and ${scratch} (--keep); remove episodes/${ep.id}, preview/${ep.id}, shots/${ep.id} by hand`)
}
console.log('')
for (const e of expect) console.log(`end-to-end ${e.ok ? 'ok  ' : 'MISS'} ${e.label}`)
const all = expect.every((e) => e.ok) && code === 0
console.log(`end-to-end ${week}: ${all ? 'ok' : 'FAILED'} (last run exit ${code})`)
process.exitCode = all ? 0 : 1
