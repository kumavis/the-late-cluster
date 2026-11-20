// The deterministic stages call the repo's own commands; this is the one place that runs them.
// Every command's full output goes to a log under shots/<id>/_production/logs/ and the caller gets
// { code, out } back. Tests pass a fake with the same shape.
import { spawnSync } from 'node:child_process'
import { appendFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { hasScript } from './scraper.mjs'

export function makeTools({ root, logDir = null, env = process.env } = {}) {
  let n = 0
  const log = (label, argv, r) => {
    if (!logDir) return
    mkdirSync(logDir, { recursive: true })
    const file = join(logDir, `${String(++n).padStart(3, '0')}-${label.replace(/[^a-z0-9-]+/gi, '-')}.log`)
    appendFileSync(file, `$ ${argv.join(' ')}\nexit ${r.status}\n\n${r.stdout ?? ''}${r.stderr ? `\n--- stderr\n${r.stderr}` : ''}`)
    return file
  }
  const exec = (label, cmd, args, { timeoutMs = 60 * 60 * 1000, input } = {}) => {
    const r = spawnSync(cmd, args, { cwd: root, env, encoding: 'utf8', input, maxBuffer: 256 * 1024 * 1024, timeout: timeoutMs })
    if (r.error && r.status === null) r.stderr = `${r.stderr ?? ''}\n${r.error.message}`
    const file = log(label, [cmd, ...args], r)
    return { code: r.status ?? 1, out: `${r.stdout ?? ''}${r.stderr ?? ''}`, stdout: r.stdout ?? '', log: file }
  }
  return {
    /** npm run <script> -- <args> */
    npm: (script, args = [], o) => exec(script, 'npm', ['run', '--silent', script, '--', ...args], o),
    /** bun <args> (the studio's analyze tool has no root command) */
    bun: (args, o) => exec(`bun-${args[1] ?? ''}`, 'bun', args, o),
    /** any program, for writers */
    exec,
    /** a root npm script exists (commands other builders add land separately) */
    hasScript: (name) => hasScript(root, name),
    has: (program) => spawnSync('sh', ['-c', `command -v ${program}`], { env, encoding: 'utf8' }).status === 0,
    fetch: (url, o) => fetch(url, o),
  }
}
