#!/usr/bin/env node
// npm run produce -- --week 2026-W47 [options]
//
// Drives one episode through the thirteen stages of docs/WORKFLOW.md, resuming from
// episodes/<id>/production/state.json. The tool never calls a model: it writes a brief per subagent
// task, and the runner does the tasks (see playbooks/project-manager.md).
//
//   --status                 where the run is, and exactly which subagents to spawn next
//   --check <stage>          run a stage's gates only
//   --task <id>              with --check: that task's lines only (what a subagent runs before it stops)
//   --segment <seg>          with --check stage: one segment's frames and checks (builders in parallel)
//   --find "<uri|url|text>"  look a post up in the digest (exact text, counts, what it replied to)
//   --stage <name>           run one stage (earlier stages must be done)
//   --from <name>            re-run from a stage (it and everything after are reset)
//   --rework <task id,…>     set a task's output aside and brief it again with the failures
//   --exclude <id,…>         drop an idea (repetition gate) or a draft (select), recorded with the run
//   --runner headless|manual|fixture   who does the tasks (default headless where claude is signed in,
//                            else manual; remembered)
//   --fixture <dir>          the fixture runner's prepared outputs
//   --digest <dir>           the digest folder (default data/weeks/<week>/)
//   --bible <dir> --ledger <dir>   copies to read and write (trial runs)
//   --limits <file>          JSON merged over the default limits
//   --settings <file>        JSON merged over the whole config (trial runs; remembered, and the PR says so)
//   --preview-only           build a draft into preview/<id>/ and never publish (remembered)
//   --network                check invented handles against the public Bluesky API
//
// Stages: scope research rank brainstorm shortlist repetition-ideas draft fit select assemble stage build review.
// Exit codes: 0 done, 1 waiting for subagents, failed or sent back, 2 bad arguments.
import { produce } from '../src/pipeline.mjs'
import { ProduceError, REPO } from '../src/repo.mjs'
import { STAGES } from '../src/state.mjs'
import { RUNNERS } from '../src/runners.mjs'

const USAGE = 'usage: npm run produce -- --week 2026-W47 [--status | --check <stage> [--task id | --segment s] | --find "…" | --stage <s> | --from <s> | --rework <task> | --exclude <id>] [--runner headless|manual|fixture] [--fixture dir] [--digest dir] [--bible dir] [--ledger dir] [--limits file] [--preview-only] [--network]'
const VALUE = new Set(['week', 'stage', 'from', 'check', 'task', 'segment', 'find', 'rework', 'exclude', 'runner', 'fixture', 'digest', 'limits', 'settings', 'bible', 'ledger', 'root'])
const FLAG = new Set(['status', 'network', 'help', 'preview-only'])

export function parseArgs(argv) {
  const o = {}
  for (let i = 0; i < argv.length; i++) {
    const m = /^--([a-z-]+)(?:=(.*))?$/.exec(argv[i])
    if (!m) throw new ProduceError(`unexpected argument ${JSON.stringify(argv[i])}; ${USAGE}`, 2)
    const [, k, inline] = m
    if (FLAG.has(k)) o[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = true
    else if (VALUE.has(k)) {
      const v = inline ?? argv[++i]
      if (v === undefined || v.startsWith('--')) throw new ProduceError(`--${k} needs a value; ${USAGE}`, 2)
      o[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v
    } else throw new ProduceError(`unknown option --${k}; ${USAGE}`, 2)
  }
  if (o.help) return o
  if (!o.week) throw new ProduceError(`--week is required; ${USAGE}`, 2)
  for (const k of ['stage', 'from']) if (o[k] && !STAGES.includes(o[k])) throw new ProduceError(`--${k} must be one of ${STAGES.join(', ')}`, 2)
  if ([o.status, o.stage, o.from, o.check, o.find].filter(Boolean).length > 1) throw new ProduceError('use one of --status, --stage, --from, --check, --find', 2)
  if (o.runner && !RUNNERS.includes(o.runner)) throw new ProduceError(`--runner must be one of ${RUNNERS.join(', ')}`, 2)
  if (o.runner === 'fixture' && !o.fixture) throw new ProduceError('--runner fixture needs --fixture <dir>', 2)
  if (o.segment && o.check !== 'stage') throw new ProduceError('--segment goes with --check stage', 2)
  if (o.task && !o.check) throw new ProduceError('--task goes with --check <stage>', 2)
  for (const k of ['rework', 'exclude']) if (o[k]) o[k] = o[k].split(',').map((x) => x.trim()).filter(Boolean)
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
