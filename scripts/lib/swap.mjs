// Replace a build directory without ever losing the old one. Node builtins only.
//
// The new build is produced in a sibling temp folder (.<name>.new-<pid>), which the producer may
// fill by reading from the current build (the committed audio and telemetry are carried forward
// that way). Only when it is complete is the old folder renamed aside (.<name>.old-<pid>), the new
// one renamed into place, and the old one deleted. A failed or interrupted producer leaves the
// current build untouched; an interruption between the two renames is repaired by the next run
// (recover), which puts the old folder back.
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

const alive = (pid) => {
  if (pid === process.pid) return true
  try {
    process.kill(pid, 0)
    return true
  } catch (e) {
    return e.code === 'EPERM'
  }
}

/** leftovers of earlier runs next to finalDir: [{ name, kind: 'new' | 'old', pid }] */
function leftovers(finalDir) {
  const parent = dirname(finalDir)
  const name = basename(finalDir)
  if (!existsSync(parent)) return []
  const re = new RegExp(`^\\.${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.(new|old)-(\\d+)$`)
  return readdirSync(parent)
    .map((n) => [n, re.exec(n)])
    .filter(([, m]) => m)
    .map(([n, m]) => ({ name: n, path: join(parent, n), kind: m[1], pid: Number(m[2]) }))
}

/** repair an interrupted swap and clear dead runs' temp folders; returns what it did */
export function recover(finalDir) {
  const done = []
  const dead = leftovers(finalDir).filter((l) => !alive(l.pid))
  if (!existsSync(finalDir)) {
    const old = dead.filter((l) => l.kind === 'old').sort((a, b) => b.pid - a.pid)[0]
    if (old) {
      renameSync(old.path, finalDir)
      done.push(`restored ${old.name}`)
    }
  }
  for (const l of dead) {
    if (!existsSync(l.path)) continue
    rmSync(l.path, { recursive: true, force: true })
    done.push(`removed ${l.name}`)
  }
  return done
}

/**
 * Build into a temp folder with `produce(tmpDir)`, then swap it in for finalDir. If produce
 * throws, finalDir is untouched and the temp folder is removed.
 */
export async function replaceDir(finalDir, produce) {
  const parent = dirname(finalDir)
  const name = basename(finalDir)
  mkdirSync(parent, { recursive: true })
  recover(finalDir)
  const tmp = join(parent, `.${name}.new-${process.pid}`)
  const old = join(parent, `.${name}.old-${process.pid}`)
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp)
  try {
    await produce(tmp)
  } catch (e) {
    rmSync(tmp, { recursive: true, force: true })
    throw e
  }
  const had = existsSync(finalDir)
  if (had) renameSync(finalDir, old)
  try {
    renameSync(tmp, finalDir)
  } catch (e) {
    if (had && !existsSync(finalDir)) renameSync(old, finalDir)
    rmSync(tmp, { recursive: true, force: true })
    throw e
  }
  if (had) rmSync(old, { recursive: true, force: true })
}
