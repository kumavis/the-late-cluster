// Content hashes for builds. Node builtins only: shared by `npm run build` (which writes them into
// the manifest) and `npm run verify` (which recomputes sourceHash on a checkout with no install).
//
// A tree hash is the sha256 of one line per file, sorted by path:
//   <sha256 of the file's bytes> <space> <path relative to the episode or studio folder, with />\n
// Paths, not just contents, are hashed, so renaming or moving a file changes the hash. Names that
// start with a dot (.DS_Store, editor droppings) are skipped everywhere.
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

export const sha256 = (data) => createHash('sha256').update(data).digest('hex')

/** every file under dir, as sorted relative paths with '/' (dot-names and skipped names excluded) */
export function listFiles(dir, { skip = [] } = {}) {
  const out = []
  const walk = (abs, rel) => {
    for (const d of readdirSync(abs, { withFileTypes: true })) {
      if (d.name.startsWith('.')) continue
      const r = rel ? `${rel}/${d.name}` : d.name
      if (skip.includes(r)) continue
      if (d.isDirectory()) walk(join(abs, d.name), r)
      else if (d.isFile()) out.push(r)
    }
  }
  if (existsSync(dir)) walk(dir, '')
  return out.sort()
}

/** the tree hash of the given relative paths under base (missing files are left out) */
export function treeHash(base, paths) {
  const lines = []
  for (const p of [...new Set(paths)].sort()) {
    const abs = join(base, ...p.split('/'))
    if (!existsSync(abs)) continue
    lines.push(`${sha256(readFileSync(abs))} ${p}\n`)
  }
  return sha256(lines.join(''))
}

/** the files sourceHash covers, relative to the episode folder */
export function sourceFiles(epDir, rundown) {
  const files = ['episode.json', 'cast.js', 'looks.js', 'thumbnail.jpg'].filter((f) => existsSync(join(epDir, f)))
  for (const seg of rundown) for (const f of listFiles(join(epDir, 'segments', seg))) files.push(`segments/${seg}/${f}`)
  return files
}

/**
 * sha256 of an episode's source inputs: episode.json, cast.js, looks.js, thumbnail.jpg and every
 * file in the rundown segments' folders. `rundown` defaults to the one in episode.json.
 */
export function sourceHash(epDir, rundown = JSON.parse(readFileSync(join(epDir, 'episode.json'), 'utf8')).rundown) {
  return treeHash(epDir, sourceFiles(epDir, rundown))
}

/** what the studio's bundle is built from (recorded in the manifest, never compared) */
export const STUDIO_INPUTS = ['index.html', 'package.json', 'vite.config.js', 'vite', 'src', 'chimera', 'public']

/** sha256 of the studio's source: the files the page bundle is built from */
export function studioHash(studioDir) {
  const files = []
  for (const top of STUDIO_INPUTS) {
    const abs = join(studioDir, top)
    if (!existsSync(abs)) continue
    if (statSync(abs).isDirectory()) files.push(...listFiles(abs).map((f) => `${top}/${f}`))
    else files.push(top)
  }
  return treeHash(studioDir, files)
}
