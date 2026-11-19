import { cp, mkdtemp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const FIXTURES = fileURLToPath(new URL('./fixtures/', import.meta.url))

export async function tempDir(t) {
  const dir = await mkdtemp(join(tmpdir(), 'late-cluster-site-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  return dir
}

/** copy a committed fixture into a temp dir so a build can write next to it */
export async function copyFixture(t, name) {
  const dir = await tempDir(t)
  await cp(join(FIXTURES, name), dir, { recursive: true })
  return dir
}

/** write n published episodes (numbered 1..n, weekly) into dir/episodes */
export async function makeEpisodes(dir, n, { thumbnails = true } = {}) {
  for (let i = 1; i <= n; i++) {
    const id = `${String(i).padStart(3, '0')}-week-${i}`
    const d = join(dir, 'episodes', id)
    await mkdir(d, { recursive: true })
    const airDate = new Date(Date.UTC(2026, 10, 13 + 7 * (i - 1))).toISOString().slice(0, 10)
    await writeFile(join(d, 'episode.json'), JSON.stringify({ id, number: i, slug: `week-${i}`, title: `Week ${i}`, description: `Episode ${i}.`, airDate, status: 'published' }))
    await writeFile(join(d, 'index.html'), '<!doctype html>')
    if (thumbnails) await writeFile(join(d, 'thumbnail.jpg'), 'jpg')
  }
}

/** { relativePath: contents } for every file under dir */
export async function snapshot(dir) {
  const out = {}
  for (const e of await readdir(dir, { recursive: true, withFileTypes: true })) {
    if (!e.isFile()) continue
    const abs = join(e.parentPath, e.name)
    out[abs.slice(dir.length + 1).split('\\').join('/')] = (await readFile(abs)).toString('base64')
  }
  return out
}

/** every href= and src= value in an HTML string */
export const links = (html) => [...html.matchAll(/\b(?:href|src)="([^"]*)"/g)].map((m) => m[1])
