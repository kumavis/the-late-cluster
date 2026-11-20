// Who does a pending task. The tool never calls a model on its own account.
//
//   headless  (the default wherever the claude command is signed in) each brief to Claude Code
//             (`claude -p --agent <role>`) with the role's permission rules, up to headless.parallel
//             at a time. The run goes on by itself and stops only at a failure or a send-back.
//   manual    nothing: the run stops at each wave and lists the subagents to spawn from their briefs
//             (playbooks/project-manager.md).
//   fixture   copies prepared outputs into place: <fixture>/<task id>/ mirrors episodes/<id>/;
//             <task id>@<n>/ is used on the task's nth run; _ledger/ goes to the ledger folder and
//             _shots/ to shots/<id>/. In text files __ID__, __NUMBER__ and __WEEK__ are substituted.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { spawn as spawnAsync, spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { createHash } from 'node:crypto'
import { claudeArgs } from './writers/claude.mjs'
import { scorecardSpec } from './bible.mjs'
import { listEpisodes, rel } from './repo.mjs'
import { selectionHash } from './stage/drafts.mjs'
import { addedLines } from './stage/late.mjs'

export const RUNNERS = ['headless', 'manual', 'fixture']

/**
 * Can the headless runner work here: the claude command exists and is signed in (`claude auth
 * status` says loggedIn), or a model credential is in the environment (CI).
 */
export function headlessReady({ command = 'claude', env = process.env, spawn = spawnSync } = {}) {
  if (env.ANTHROPIC_API_KEY || env.CLAUDE_CODE_OAUTH_TOKEN) return spawn('sh', ['-c', `command -v ${command}`], { env, encoding: 'utf8' }).status === 0
  const r = spawn(command, ['auth', 'status'], { env, encoding: 'utf8', timeout: 20000 })
  if (r.error || r.status !== 0) return false
  try {
    return JSON.parse(r.stdout).loggedIn === true
  } catch {
    return false
  }
}

/** run one claude process; resolves { code, stdout, stderr, error } */
function runClaude(command, args, { cwd, input, env, timeoutMs }) {
  return new Promise((done) => {
    let out = ''
    let err = ''
    let child
    try {
      child = spawnAsync(command, args, { cwd, env, stdio: ['pipe', 'pipe', 'pipe'] })
    } catch (e) {
      done({ code: null, error: e })
      return
    }
    const timer = setTimeout(() => child.kill('SIGTERM'), timeoutMs)
    child.stdout.on('data', (d) => (out += d))
    child.stderr.on('data', (d) => (err += d))
    child.on('error', (e) => {
      clearTimeout(timer)
      done({ code: null, error: e, stdout: out, stderr: err })
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      done({ code, stdout: out, stderr: err })
    })
    child.stdin.end(input)
  })
}

export function makeRunner(name, { fixture, root, config, print, state, spawn, env = process.env }) {
  if (name === 'manual')
    return async (ctx, pending, { briefPath }) => {
      for (const t of pending) print(`  spawn ${t.role.padEnd(12)} ${t.id.padEnd(34)} brief ${ctx.paths.rel(briefPath(t))}`)
      return { status: 'waiting' }
    }
  if (name === 'fixture') {
    if (!fixture || !existsSync(fixture)) throw new Error(`the fixture runner needs --fixture <dir> (got ${fixture})`)
    return async (ctx, pending) => {
      const runs = (state.fixtureRuns ??= {})
      for (const t of pending) {
        runs[t.id] = (runs[t.id] ?? 0) + 1
        const layers = [join(fixture, t.id), ...Array.from({ length: runs[t.id] - 1 }, (_, k) => join(fixture, `${t.id}@${k + 2}`))].filter((d) => existsSync(d))
        if (!layers.length) return { status: 'failed', detail: `the fixture has no output for task ${t.id} (${rel(root, join(fixture, t.id))})` }
        let n = 0
        for (const layer of layers) for (const f of files(layer)) {
          const name = f.replaceAll('__ID__', ctx.id)
          const to = name.startsWith('_ledger/') ? join(ctx.ledgerDir, name.slice(8)) : name.startsWith('_shots/') ? join(ctx.root, 'shots', ctx.id, name.slice(7)) : join(ctx.paths.dir, name)
          mkdirSync(dirname(to), { recursive: true })
          if (/\.(js|mjs|json|jsonl|md|txt)$/.test(f)) writeFileSync(to, fixtureText(ctx, readFileSync(join(layer, f), 'utf8')))
          else cpSync(join(layer, f), to)
          n++
        }
        print(`  fixture ${t.id}: ${n} file${n === 1 ? '' : 's'}${layers.length > 1 ? ` (run ${runs[t.id]})` : ''}`)
      }
      return { status: 'done' }
    }
  }
  if (name === 'headless')
    return async (ctx, pending, { briefPath }) => {
      const c = config.headless
      const others = listEpisodes(root).map((e) => e.id).filter((x) => x !== ctx.id)
      const queue = [...pending]
      const failures = []
      const one = async (t) => {
        const prompt = readFileSync(briefPath(t), 'utf8')
        const args = claudeArgs({ role: t.role, task: t, id: ctx.id, week: ctx.week, others, bible: rel(root, ctx.bibleDir), ledger: rel(root, ctx.ledgerDir), constitution: config.constitution, maxTurns: c.maxTurns, maxBudgetUsd: c.maxBudgetUsd })
        const r = spawn ? spawn(c.command, args, { cwd: root, input: prompt, encoding: 'utf8', env }) : await runClaude(c.command, args, { cwd: root, input: prompt, env, timeoutMs: c.timeoutMinutes * 60 * 1000 })
        const code = r.status ?? r.code
        let out = null
        try {
          out = JSON.parse(r.stdout)
        } catch {}
        // the whole result goes to the run's log; the console gets one line
        const logDir = join(ctx.paths.work, 'logs', 'headless')
        mkdirSync(logDir, { recursive: true })
        writeFileSync(join(logDir, `${t.id}.json`), r.stdout || JSON.stringify({ stderr: r.stderr ?? '', error: r.error?.message ?? null }))
        if (r.error || code !== 0 || out?.is_error) {
          failures.push(`${t.id}: claude ${r.error ? `could not run (${r.error.message})` : `exited ${code}`}: ${String(out?.result ?? r.stderr ?? '').replace(/\s+/g, ' ').slice(0, 200)}`)
          print(`  claude ${t.id} FAIL`)
        } else print(`  claude ${t.id} ok (${t.role}${out?.num_turns ? `, ${out.num_turns} turns` : ''}${typeof out?.total_cost_usd === 'number' ? `, $${out.total_cost_usd.toFixed(2)}` : ''})`)
      }
      const workers = Array.from({ length: Math.max(1, Math.min(c.parallel ?? 1, queue.length)) }, async () => {
        while (queue.length) await one(queue.shift())
      })
      await Promise.all(workers)
      if (failures.length) return { status: 'failed', detail: failures.join('; ') }
      return { status: 'done' }
    }
  throw new Error(`unknown runner ${name} (${RUNNERS.join(', ')})`)
}

/**
 * Placeholders a fixture may use: __ID__, __NUMBER__, __WEEK__; __VERSION:<slug>__ (the current
 * version of drafts/<slug>/script.js, which a reviewer's verdict must name); __SELECTION__ (the current
 * selection's hash, which a consent refresh names); __LINEVERSION:<seg>:<line>__ (the version of a line
 * added at assembly); __SCORECARD_ROWS__ (a
 * passing row for every row of the bible's scorecard, so a fixture survives a change to its rows).
 */
function fixtureText(ctx, text) {
  let t = text.replaceAll('__ID__', ctx.id).replaceAll('__NUMBER__', String(ctx.paths.number).padStart(3, '0')).replaceAll('__WEEK__', ctx.week)
  t = t.replace(/__VERSION:([a-z0-9-]+)__/g, (_, slug) => {
    const f = join(ctx.paths.production, 'drafts', slug, 'script.js')
    return existsSync(f) ? createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 12) : 'none'
  })
  if (t.includes('__SELECTION__')) t = t.replaceAll('__SELECTION__', selectionHash(ctx))
  t = t.replace(/__LINEVERSION:([a-z0-9-]+:[a-z0-9#-]+)__/g, (_, id) => addedLines(ctx).find((x) => x.id === id)?.version ?? 'none')
  if (t.includes('__SCORECARD_ROWS__')) {
    const spec = scorecardSpec(ctx.bibleDir)
    const row = (id, r) => `| ${id} | ${r} | Fixture evidence for ${id}: checked on the trial episode's frames and scripts. |`
    const a = (spec.a ?? []).map((id) => row(id, 'pass')).join('\n')
    const b = (spec.b ?? []).map((id) => row(id, '2')).join('\n')
    t = t.replace('__SCORECARD_ROWS__', `## Part A\n\n| # | result | evidence |\n|---|---|---|\n${a}\n\n## Part B\n\n| # | score | evidence |\n|---|---|---|\n${b}`)
  }
  return t
}

function files(d, prefix = '') {
  const out = []
  for (const e of readdirSync(d).sort()) {
    const p = join(d, e)
    if (statSync(p).isDirectory()) out.push(...files(p, `${prefix}${e}/`))
    else out.push(`${prefix}${e}`)
  }
  return out
}
