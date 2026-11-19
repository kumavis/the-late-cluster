#!/usr/bin/env node
// npm run produce -- --week 2026-W47 [options]
//
// Runs the weekly pipeline for one episode, stage by stage, resuming from
// episodes/<id>/production/state.json. See packages/writers-room/README.md.
//
//   --status                 where the week's run is, and stop
//   --stage <name>           run one stage (earlier stages must be done)
//   --from <name>            re-run from a stage (it and everything after are reset)
//   --check <stage>          run a stage's gates only (what a writer runs before it stops)
//   --writer claude|manual|fixture   who does the creative stages (default claude)
//   --model <id>             the claude writer's model (default from config: claude-fable-5-2)
//   --fixture <dir>          the fixture writer's prepared outputs
//   --digest <dir>           read the digest from here instead of data/weeks/<week>/
//   --limits <file>          JSON merged over the default limits (a trial run; the PR says so)
//   --lore <file>            the lore file the self-check appends to (default docs/bible/lore.md)
//   --network                check invented handles against the public Bluesky API
//   --max-attempts <n>       writer attempts per stage (default 3)
//
// Stages: scrape scaffold pitch write render direct build self-check pr.
// Exit codes: 0 done (or nothing to do), 1 refused, failed or waiting for a person, 2 bad arguments.
import { produce } from '../src/pipeline.mjs'
import { ProduceError, REPO } from '../src/repo.mjs'
import { STAGES } from '../src/state.mjs'
import { WRITERS } from '../src/writers/index.mjs'

const USAGE = 'usage: npm run produce -- --week 2026-W47 [--status | --stage <s> | --from <s> | --check <s>] [--writer claude|manual|fixture] [--model id] [--fixture dir] [--digest dir] [--limits file] [--lore file] [--network] [--max-attempts n]'
const VALUE = new Set(['week', 'stage', 'from', 'check', 'writer', 'model', 'fixture', 'digest', 'limits', 'lore', 'max-attempts', 'root'])
const FLAG = new Set(['status', 'network', 'help'])

export function parseArgs(argv) {
  const o = {}
  for (let i = 0; i < argv.length; i++) {
    const m = /^--([a-z-]+)(?:=(.*))?$/.exec(argv[i])
    if (!m) throw new ProduceError(`unexpected argument ${JSON.stringify(argv[i])}; ${USAGE}`, 2)
    const [, k, inline] = m
    if (FLAG.has(k)) o[k] = true
    else if (VALUE.has(k)) {
      const v = inline ?? argv[++i]
      if (v === undefined || v.startsWith('--')) throw new ProduceError(`--${k} needs a value; ${USAGE}`, 2)
      o[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v
    } else throw new ProduceError(`unknown option --${k}; ${USAGE}`, 2)
  }
  if (o.help) return o
  if (!o.week) throw new ProduceError(`--week is required; ${USAGE}`, 2)
  for (const k of ['stage', 'from']) if (o[k] && !STAGES.includes(o[k])) throw new ProduceError(`--${k} must be one of ${STAGES.join(', ')}`, 2)
  if ([o.status, o.stage, o.from, o.check].filter(Boolean).length > 1) throw new ProduceError('use one of --status, --stage, --from, --check', 2)
  if (o.writer && !WRITERS.includes(o.writer)) throw new ProduceError(`--writer must be one of ${WRITERS.join(', ')}`, 2)
  if (o.writer === 'fixture' && !o.fixture) throw new ProduceError('--writer fixture needs --fixture <dir>', 2)
  if (o.maxAttempts !== undefined && !(Number(o.maxAttempts) >= 1)) throw new ProduceError('--max-attempts must be 1 or more', 2)
  return o
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('/produce.mjs')) {
  try {
    const o = parseArgs(process.argv.slice(2))
    if (o.help) {
      console.log(USAGE)
      process.exitCode = 0
    } else process.exitCode = await produce({ ...o, root: o.root ?? REPO })
  } catch (e) {
    if (e instanceof ProduceError) {
      console.error(`error: ${e.message}`)
      process.exitCode = e.code
    } else {
      console.error(e)
      process.exitCode = 1
    }
  }
}
