// The headless runner's command line: Claude Code in print mode, one brief per call, as the role's
// subagent (`--agent <role>`, .claude/agents/<role>.md, which carries the model), with permissions
// cut down to the task. Every flag is from the Claude Code documentation (code.claude.com/docs/en/…):
//
//   -p, --output-format json        headless.md: run non-interactively, one JSON result
//   --agent <name>                  cli-reference.md / sub-agents.md: run as that subagent (its model, tools, hooks)
//   --permission-mode dontAsk       permission-modes.md: anything not allowed is denied, never prompted
//   --allowedTools / --disallowedTools   permissions.md: allow rules; deny rules, which win
//   --setting-sources project       cli-reference.md: ignore user and local settings (their allow rules)
//   --strict-mcp-config, --disable-slash-commands, --no-session-persistence, --max-turns, --max-budget-usd
//
// Read deny rules cover the Read tool, the file commands Claude Code recognises in Bash (cat, head,
// tail, sed, tee) and redirections; for Grep and Glob only as a best effort, and not for a search
// started above the denied folder (permissions.md, "What Read and Edit rules cover"). So roles that
// may not read earlier episodes get no Glob or Grep here, and shell readers are denied by name.

/** Bash commands that print or search file contents, denied so the Read deny rules cannot be routed around */
export const READ_COMMANDS = ['cat', 'head', 'tail', 'less', 'more', 'grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'find', 'tree', 'du', 'diff', 'cmp', 'od', 'xxd', 'hexdump', 'strings', 'awk', 'sed', 'sort', 'uniq', 'cut', 'nl', 'wc', 'jq', 'file', 'stat', 'xargs']

/**
 * The permission rules for one task. `role` decides what may be read (docs/WORKFLOW.md, "Who may
 * read what"); `task.writes` decides what may be edited. `others` are the other episodes' ids,
 * `ledger` the ledger folder, `bible` the bible folder and `constitution` its constitution files.
 */
export function permissions({ role, task, id, week, others = [], bible = 'docs/bible', ledger = 'docs/ledger', constitution = ['00-constitution.md', '09-real-people.md'] }) {
  const ep = `episodes/${id}`
  const edit = (p) => `Edit(${p.endsWith('/') ? `${p}**` : p})`
  const allow = ['Read', 'Bash(ls)', 'Bash(ls *)', `Bash(npm run produce -- --week ${week} --check *)`, `Bash(npm run produce -- --week ${week} --find *)`, 'Bash(npm run lookup -- *)', ...(task?.writes ?? []).map(edit)]
  if (role === 'writer') allow.push(`Bash(npm run render -- ${id} *)`, `Bash(npm run check -- ${id} *)`, `Bash(npm run check -- ${id})`, `Bash(bun packages/show/tools/analyze.ts whisper ${id} *)`, `Bash(bun packages/show/tools/analyze.ts voices *)`)
  if (role === 'writer' && task?.id === 'assemble.writer') allow.push(edit(`${ep}/segments/`), edit(`${ep}/episode.json`), edit(`${ep}/cast.js`), edit(`${ep}/looks.js`), edit(`${ep}/production/sources.json`), edit(`${ep}/production/plan.json`), edit(`${ep}/production/intelligibility.json`), edit(`${ep}/production/heard-waivers.json`))
  if (role === 'builder') allow.push(edit(`${ep}/segments/${task?.segment ?? '*'}/`), `Bash(npm run shoot -- ${id} *)`, `Bash(npm run check -- ${id} *)`, `Bash(npm run thumbnail -- ${id} *)`)
  if (role === 'builder') allow.push(edit(`${ep}/production/thumbnail.txt`))
  if (role === 'reviewer' && task?.id === 'review.reviewer') allow.push(edit(`${bible}/`), edit(`${ep}/production/dna-amendments.md`), edit(`${ledger}/featured.json`))
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
    'Read(.secrets)',
    'Read(.env*)',
    ...constitution.map((f) => `Edit(${bible}/${f})`),
    `Edit(${ep}/production/state.json)`,
    `Edit(${ep}/production/briefs/**)`,
    `Edit(${ep}/production/inherited/**)`,
    `Edit(${ep}/segments/**/cues.json)`,
    ...(role === 'builder' ? [`Edit(${ep}/segments/**/script.js)`] : []),
    'Edit(dist/**)',
    'Edit(packages/**)',
    'Edit(scripts/**)',
    'Edit(.github/**)',
    'Edit(.claude/**)',
  ]
  if (role !== 'reviewer') {
    // writers, researchers and builders never see what the show has already done
    deny.push(`Read(${ledger}/**)`, `Edit(${ledger}/**)`, ...others.flatMap((o) => [`Read(episodes/${o}/**)`, `Edit(episodes/${o}/**)`, `Read(shots/${o}/**)`, `Read(preview/${o}/**)`]), 'Read(dist/episodes/**)', 'Read(video/**)', ...READ_COMMANDS.flatMap((c) => [`Bash(${c})`, `Bash(${c} *)`]), 'Bash(ls -*R*)')
  }
  return { allow, deny }
}

/** the claude command line for one task (the brief goes on stdin) */
export function claudeArgs({ role, task, id, week, others, bible, ledger, constitution, maxTurns, maxBudgetUsd, extra = [] }) {
  const { allow, deny } = permissions({ role, task, id, week, others, bible, ledger, constitution })
  return [
    '-p',
    '--agent', role,
    '--output-format', 'json',
    '--permission-mode', 'dontAsk',
    '--setting-sources', 'project',
    '--strict-mcp-config',
    '--disable-slash-commands',
    '--no-session-persistence',
    '--tools', role === 'reviewer' ? 'Read,Glob,Grep,Edit,Write,Bash' : 'Read,Edit,Write,Bash',
    ...(maxTurns ? ['--max-turns', String(maxTurns)] : []),
    ...(maxBudgetUsd ? ['--max-budget-usd', String(maxBudgetUsd)] : []),
    ...extra,
    // variadic lists last, so nothing after them is read as a rule
    '--allowedTools', ...allow,
    '--disallowedTools', ...deny,
  ]
}
