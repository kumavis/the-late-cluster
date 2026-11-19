// The claude writer: Claude Code in print (headless) mode, in the repository, with the stage's
// prompt on stdin and permissions cut down to what the stage needs. Every flag below is from the
// Claude Code documentation (code.claude.com/docs/en/…), as listed in this package's README:
//
//   -p                              headless.md: run non-interactively and exit
//   --model <id>                    model-config.md: an alias or a full model name
//   --output-format json            headless.md: one JSON result (result, session_id, total_cost_usd)
//   --permission-mode dontAsk       permission-modes.md: anything not allowed is denied, never prompted
//   --tools <list>                  cli-reference.md: the built-in tools that exist at all
//   --allowedTools <rules…>         permissions.md: rules that are allowed without asking
//   --disallowedTools <rules…>      permissions.md: deny rules, which win over allow rules
//   --setting-sources project       cli-reference.md: ignore user and local settings (their allow rules)
//   --strict-mcp-config             cli-reference.md: no MCP servers unless given with --mcp-config
//   --disable-slash-commands        cli-reference.md: no skills or custom commands
//   --no-session-persistence        cli-reference.md: nothing saved to resume (print mode only)
//   --max-turns <n>                 cli-reference.md: a turn limit (print mode only)
//   --max-budget-usd <usd>          cli-reference.md: stop at an estimated spend (print mode only)
//
// Authentication comes from the environment: ANTHROPIC_API_KEY (or CLAUDE_CODE_OAUTH_TOKEN from
// `claude setup-token`), authentication.md. Extra flags can be passed in PRODUCE_CLAUDE_ARGS.
import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

/** the permission rules for a stage: what the headless writer may edit and run */
export function permissions({ stage, id, week, lore = 'docs/bible/lore.md' }) {
  const ep = `episodes/${id}`
  const edit = (p) => [`Edit(${p})`, `Write(${p})`]
  const check = `Bash(npm run produce -- --week ${week} --check ${stage})`
  const allow = ['Read', 'Glob', 'Grep', check]
  if (stage === 'pitch') allow.push(...edit(`${ep}/production/pitch.md`), ...edit(`${ep}/production/plan.json`), ...edit(`${ep}/episode.json`))
  if (stage === 'write') {
    allow.push(...edit(`${ep}/segments/**/script.js`), ...edit(`${ep}/cast.js`), ...edit(`${ep}/looks.js`), ...edit(`${ep}/episode.json`), ...edit(`${ep}/production/sources.json`), ...edit(`${ep}/production/intelligibility.json`), ...edit(`${ep}/production/pitch.md`), ...edit(`${ep}/production/plan.json`))
    allow.push(`Bash(npm run segment:new -- ${id} *)`, `Bash(npm run render -- ${id} *)`, `Bash(npm run check -- ${id} *)`, `Bash(npm run check -- ${id})`, `Bash(bun packages/show/tools/analyze.ts whisper ${id} *)`)
  }
  if (stage === 'direct') {
    allow.push(...edit(`${ep}/segments/**/index.js`), ...edit(`${ep}/looks.js`), ...edit(`${ep}/production/thumbnail.txt`))
    allow.push(`Bash(npm run shoot -- ${id} *)`, `Bash(npm run check -- ${id} *)`, `Bash(npm run check -- ${id})`)
  }
  if (stage === 'self-check') allow.push(...edit(`${ep}/production/scorecard.md`), ...edit(lore), `Bash(npm run check -- ${id})`, `Bash(npm run verify)`)
  const deny = [
    'WebFetch',
    'WebSearch',
    'Bash(git *)',
    'Bash(gh *)',
    'Bash(curl *)',
    'Bash(wget *)',
    'Bash(npm install *)',
    'Bash(npm ci *)',
    'Bash(npm publish *)',
    'Bash(npm run bot *)',
    'Bash(npm run build *)',
    'Bash(npm run scrape *)',
    'Bash(node packages/bot/*)',
    ...edit(`${ep}/production/state.json`),
    ...edit(`${ep}/segments/**/cues.json`),
    ...edit('episodes/001-pilot/**'),
    ...edit('dist/**'),
    ...edit('packages/**'),
    ...edit('scripts/**'),
    ...edit('.github/**'),
    ...edit('.claude/**'),
  ]
  return { allow, deny }
}

/** the claude command line for a stage (the prompt goes on stdin) */
export function claudeArgs({ stage, id, week, model, maxTurns, maxBudgetUsd, lore, extra = [] }) {
  const { allow, deny } = permissions({ stage, id, week, lore })
  return [
    '-p',
    '--model', model,
    '--output-format', 'json',
    '--permission-mode', 'dontAsk',
    '--setting-sources', 'project',
    '--strict-mcp-config',
    '--disable-slash-commands',
    '--no-session-persistence',
    '--tools', 'Read,Glob,Grep,Edit,Write,Bash',
    ...(maxTurns ? ['--max-turns', String(maxTurns)] : []),
    ...(maxBudgetUsd ? ['--max-budget-usd', String(maxBudgetUsd)] : []),
    ...extra,
    // variadic lists last, so nothing after them is read as a rule
    '--allowedTools', ...allow,
    '--disallowedTools', ...deny,
  ]
}

export function claudeWriter({ config, model, print = console.log, spawn = spawnSync, env = process.env } = {}) {
  const c = config.claude
  const chosen = model ?? env.PRODUCE_MODEL ?? c.model
  const extra = (env.PRODUCE_CLAUDE_ARGS ?? '').split(/\s+/).filter(Boolean)
  return {
    name: 'claude',
    model: chosen,
    async run({ stage, prompt, root, id, week, paths, loreRel }) {
      const s = c.stages[stage] ?? {}
      const args = claudeArgs({ stage, id, week, model: chosen, maxTurns: s.maxTurns, maxBudgetUsd: s.maxBudgetUsd, lore: loreRel, extra })
      mkdirSync(join(paths.work, 'prompts'), { recursive: true })
      writeFileSync(join(paths.work, 'prompts', `${stage}.md`), prompt)
      print(`claude ${stage}: ${c.command} -p --model ${chosen} (turns ${s.maxTurns ?? '-'}, budget $${s.maxBudgetUsd ?? '-'}); prompt ${paths.rel(join(paths.work, 'prompts', `${stage}.md`))}`)
      const r = spawn(c.command, args, { cwd: root, input: prompt, encoding: 'utf8', env, maxBuffer: 64 * 1024 * 1024, timeout: (c.timeoutMinutes ?? 60) * 60 * 1000 })
      mkdirSync(join(paths.work, 'logs'), { recursive: true })
      writeFileSync(join(paths.work, 'logs', `claude-${stage}.json`), r.stdout ?? '')
      if (r.stderr) writeFileSync(join(paths.work, 'logs', `claude-${stage}.stderr`), r.stderr)
      if (r.error) return { status: 'failed', detail: `could not run ${c.command}: ${r.error.message}` }
      let out = null
      try {
        out = JSON.parse(r.stdout)
      } catch {}
      if (out) {
        appendFileSync(join(paths.work, 'costs.jsonl'), JSON.stringify({ stage, model: chosen, cost: out.total_cost_usd ?? null, turns: out.num_turns ?? null, subtype: out.subtype ?? null }) + '\n')
        print(`claude ${stage}: ${out.subtype ?? (out.is_error ? 'error' : 'finished')}${out.num_turns ? `, ${out.num_turns} turns` : ''}${out.total_cost_usd !== undefined ? `, $${Number(out.total_cost_usd).toFixed(2)}` : ''}`)
      }
      if (r.status !== 0 || out?.is_error) return { status: 'failed', detail: `claude exited ${r.status}${out?.subtype ? ` (${out.subtype})` : ''}: ${String(out?.result ?? r.stderr ?? '').slice(0, 300)}` }
      return { status: 'done' }
    },
  }
}
