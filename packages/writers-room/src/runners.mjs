// Who does a pending task. The tool never calls a model on its own account.
//
//   manual    (default) nothing: the run stops, and `produce --status` lists the subagents to spawn
//             from their briefs. The project manager spawns them (playbooks/project-manager.md).
//   fixture   copies prepared outputs into place: <fixture>/<task id>/ mirrors episodes/<id>/;
//             <task id>@<n>/ is used on the task's nth run; _ledger/ goes to the ledger folder.
//             In text files __ID__, __NUMBER__ and __WEEK__ are substituted. Tests and bin/end-to-end.mjs.
//   headless  each brief to Claude Code (`claude -p --agent <role>`) with the role's deny rules.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { createHash } from 'node:crypto'
import { claudeArgs } from './writers/claude.mjs'
import { scorecardSpec } from './bible.mjs'
import { listEpisodes, rel } from './repo.mjs'

export const RUNNERS = ['manual', 'fixture', 'headless']

export function makeRunner(name, { fixture, root, config, print, state, spawn = spawnSync, env = process.env }) {
  if (name === 'manual')
    return async (ctx, pending, { briefPath }) => {
      for (const t of pending) print(`  spawn ${t.role.padEnd(10)} ${t.id.padEnd(34)} brief ${ctx.paths.rel(briefPath(t))}`)
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
          const to = name.startsWith('_ledger/') ? join(ctx.ledgerDir, name.slice(8)) : join(ctx.paths.dir, name)
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
      for (const t of pending) {
        const prompt = readFileSync(briefPath(t), 'utf8')
        const args = claudeArgs({ role: t.role, task: t, id: ctx.id, week: ctx.week, others, bible: rel(root, ctx.bibleDir), ledger: rel(root, ctx.ledgerDir), constitution: config.constitution, maxTurns: c.maxTurns, maxBudgetUsd: c.maxBudgetUsd })
        print(`  claude ${t.id} (--agent ${t.role})`)
        const r = spawn(c.command, args, { cwd: root, input: prompt, encoding: 'utf8', env, maxBuffer: 64 * 1024 * 1024, timeout: c.timeoutMinutes * 60 * 1000 })
        if (r.error) return { status: 'failed', detail: `could not run ${c.command}: ${r.error.message}` }
        let out = null
        try {
          out = JSON.parse(r.stdout)
        } catch {}
        if (r.status !== 0 || out?.is_error) return { status: 'failed', detail: `claude exited ${r.status} on ${t.id}: ${String(out?.result ?? r.stderr ?? '').slice(0, 300)}` }
      }
      return { status: 'done' }
    }
  throw new Error(`unknown runner ${name} (${RUNNERS.join(', ')})`)
}

/**
 * Placeholders a fixture may use: __ID__, __NUMBER__, __WEEK__; __VERSION:<slug>__ (the current
 * version of drafts/<slug>/script.js, which a reviewer's verdict must name); __SCORECARD_ROWS__ (a
 * passing row for every row of the bible's scorecard, so a fixture survives a change to its rows).
 */
function fixtureText(ctx, text) {
  let t = text.replaceAll('__ID__', ctx.id).replaceAll('__NUMBER__', String(ctx.paths.number).padStart(3, '0')).replaceAll('__WEEK__', ctx.week)
  t = t.replace(/__VERSION:([a-z0-9-]+)__/g, (_, slug) => {
    const f = join(ctx.paths.production, 'drafts', slug, 'script.js')
    return existsSync(f) ? createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 12) : 'none'
  })
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
