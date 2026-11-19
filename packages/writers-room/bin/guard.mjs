#!/usr/bin/env node
// A PreToolUse hook for the researcher, writer and builder subagents (.claude/agents/*.md): it
// refuses a tool call that would read what the show has already done (docs/WORKFLOW.md, "Who may
// read what"): the ledger, earlier episodes, their builds, frames and previews, and git history.
// Reviewers are not guarded. The secrets file is refused for every role.
//
//   node packages/writers-room/bin/guard.mjs <role>     (hook input as JSON on stdin)
//
// Claude Code hooks (code.claude.com/docs/en/hooks): the input carries tool_name and tool_input;
// exit code 2 blocks the call and stderr goes back to the model. Anything else exits 0.
//
// This is a guard, not a wall: it reads paths and command text, so a determined shell command can
// route around it. The real enforcement is the brief (which never points at those files) and the
// repetition gate (two reviewers with the ledger block anything that repeats).
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { isAbsolute, join, relative, resolve } from 'node:path'

const EP = /^\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/

/** episodes in production: production/state.json with a stage not done (or LATE_CLUSTER_EPISODE) */
export function currentEpisodes(root, env = process.env) {
  if (env.LATE_CLUSTER_EPISODE) return env.LATE_CLUSTER_EPISODE.split(',').map((s) => s.trim()).filter(Boolean)
  const dir = join(root, 'episodes')
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((id) => {
    const f = join(dir, id, 'production', 'state.json')
    if (!EP.test(id) || !existsSync(f)) return false
    try {
      const s = JSON.parse(readFileSync(f, 'utf8'))
      return Object.values(s.stages ?? {}).some((st) => st?.status !== 'done')
    } catch {
      return false
    }
  })
}

/** why a role may not touch this path (relative to the root), or null */
function pathProblem(rel, role, current) {
  const p = rel.replace(/^\.\//, '').replace(/\/+$/, '')
  if (p === '.secrets' || p.startsWith('.secrets/') || /(^|\/)\.env(\.|$)/.test(p)) return 'secrets come only from the environment; never read .secrets'
  if (role === 'reviewer') return null
  if (p === 'docs/ledger' || p.startsWith('docs/ledger/')) return 'the ledger is for reviewers and the project manager'
  if (p === 'dist/episodes' || p.startsWith('dist/episodes/') || p === 'video' || p.startsWith('video/')) return 'built episodes are what the show has already done'
  const m = p.match(/^(episodes|shots|preview)\/([^/]+)/)
  if (m && EP.test(m[2]) && !current.includes(m[2])) return `${m[1]}/${m[2]} is an earlier episode; work only in ${current.length ? current.map((c) => `episodes/${c}/`).join(', ') : "this episode's folder"} (files carried forward are copied into production/inherited/)`
  return null
}

/** a search started above the folders it must not see would walk into them */
function searchRoot(rel) {
  const p = rel.replace(/^\.\//, '').replace(/\/+$/, '')
  return ['', '.', 'docs', 'episodes', 'dist', 'shots', 'preview'].includes(p)
}

export function check(input, { role, root, current }) {
  const t = input?.tool_name
  const x = input?.tool_input ?? {}
  const rel = (p) => (isAbsolute(p) ? relative(root, p) : relative(root, resolve(root, p)))
  const outside = (r) => r.startsWith('..')
  const paths = []
  if (t === 'Read' || t === 'Edit' || t === 'Write' || t === 'NotebookEdit') paths.push(x.file_path ?? x.notebook_path)
  if (t === 'Glob' || t === 'Grep') {
    const r = rel(x.path ?? '.')
    if (role !== 'reviewer' && searchRoot(r)) return `start the search inside a folder you may read (this episode, docs/bible, a package), not ${r || 'the repository root'}: a search from here walks into earlier episodes and the ledger`
    paths.push(x.path ?? '.')
  }
  for (const p of paths.filter(Boolean)) {
    const r = rel(p)
    if (outside(r)) continue
    const why = pathProblem(r, role, current)
    if (why) return `${r}: ${why}`
  }
  if (t === 'Bash') {
    const cmd = String(x.command ?? '')
    if (/(^|[\s'"=/])\.secrets\b/.test(cmd)) return 'secrets come only from the environment; never read .secrets'
    if (role === 'reviewer') return null
    if (/docs\/ledger/.test(cmd)) return 'the ledger is for reviewers and the project manager'
    if (/dist\/episodes|(^|[\s'"])video\//.test(cmd)) return 'built episodes are what the show has already done'
    for (const m of cmd.matchAll(/(?:^|[\s'"=(/])(?:episodes|shots|preview)\/(\d{3}-[a-z0-9-]+)/g)) if (!current.includes(m[1])) return `${m[1]} is an earlier episode; work only in this episode's folder`
    if (/\bgit\s+(show|log\b[^|;&]*(-p\b|--patch)|grep|blame|diff\b[^|;&]*\b(HEAD|origin|main)\b|checkout|restore|stash)/.test(cmd)) return "git history holds earlier episodes; it is not for this role"
    const recursive = /\b(grep|egrep|fgrep)\b[^|;&]*\s-[a-zA-Z]*[rR]/.test(cmd) || /\b(rg|ag|ack|find|tree|du)\b/.test(cmd) || /\bls\b[^|;&]*\s-[a-zA-Z]*R/.test(cmd)
    const scoped = current.some((c) => cmd.includes(`episodes/${c}`)) || /(^|[\s'"])(\.\/)?(packages|docs\/bible|scripts|data)\//.test(cmd)
    if (recursive && !scoped) return 'a recursive search from here walks into earlier episodes and the ledger; name the folder to search (this episode, docs/bible, a package)'
  }
  return null
}

async function main() {
  const role = process.argv[2] ?? 'writer'
  let text = ''
  for await (const c of process.stdin) text += c
  let input = {}
  try {
    input = JSON.parse(text || '{}')
  } catch {
    process.exit(0)
  }
  const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()
  const why = check(input, { role, root, current: currentEpisodes(root) })
  if (why) {
    process.stderr.write(`Refused for the ${role} role (docs/WORKFLOW.md, "Who may read what"): ${why}.\n`)
    process.exit(2)
  }
  process.exit(0)
}

if (import.meta.url === `file://${process.argv[1]}`) main()
