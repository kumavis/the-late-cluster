// Inheritance is a decision. By default the writer cannot read earlier episodes. The pitch names
// what it carries forward in plan.json "inherit": [{ from, path, why }], and after the pitch passes
// the pipeline copies exactly those files to production/inherited/<from>/<path> as read-only
// reference. production/ is not covered by the build's sourceHash and is never a segment folder,
// so the copies cannot reach a build; the import gate stops a segment importing them.
import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join, normalize, sep } from 'node:path'
import { ID_RE, isFile, walk } from './repo.mjs'

export const INHERITED = 'production/inherited'

/** problems with one inherit entry (empty when it is sound) */
export function inheritProblems(root, id, entry) {
  const out = []
  const number = Number(id.slice(0, 3))
  if (!entry || typeof entry !== 'object') return ['must be { "from", "path", "why" }']
  const { from, path, why } = entry
  if (typeof from !== 'string' || !ID_RE.test(from)) out.push(`"from" must be an episode id such as 001-pilot`)
  else if (Number(from.slice(0, 3)) >= number) out.push(`"from" ${from} is not an earlier episode`)
  else if (!existsSync(join(root, 'episodes', from))) out.push(`there is no episode ${from}`)
  if (typeof path !== 'string' || !path || path.startsWith('/') || normalize(path).split(sep).includes('..')) out.push(`"path" must be a file path inside the episode folder, such as segments/panel/index.js`)
  else if (/^(public|production)\//.test(path)) out.push(`"path" ${path} is rendered output or working papers; inherit source files`)
  else if (typeof from === 'string' && ID_RE.test(from) && !isFile(join(root, 'episodes', from, path))) out.push(`episodes/${from}/${path} does not exist`)
  if (!String(why ?? '').trim()) out.push(`"why" is empty: say what this file gives the episode that building fresh would not`)
  return out
}

const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex')

/**
 * Replace production/inherited/ with exactly the plan's files, read-only. Returns the record kept
 * in state.json: [{ from, path, sha256 }].
 */
export function copyInherited(root, epDir, plan) {
  const dir = join(epDir, INHERITED)
  rmSync(dir, { recursive: true, force: true })
  const record = []
  for (const e of plan?.inherit ?? []) {
    const src = join(root, 'episodes', e.from, e.path)
    const dst = join(dir, e.from, e.path)
    mkdirSync(dirname(dst), { recursive: true })
    copyFileSync(src, dst)
    chmodSync(dst, 0o444)
    record.push({ from: e.from, path: e.path, sha256: sha(dst) })
  }
  return record
}

/** the files under production/inherited/, as "<from>/<path>" */
export const inheritedFiles = (epDir) => walk(join(epDir, INHERITED))

export function removeInherited(epDir) {
  const dir = join(epDir, INHERITED)
  if (!existsSync(dir)) return
  for (const f of walk(dir)) chmodSync(join(dir, f), 0o644)
  rmSync(dir, { recursive: true, force: true })
}
