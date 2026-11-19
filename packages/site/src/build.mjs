// Generate the archive into an output directory (normally the repo's dist/) from the committed
// manifests in an input directory (normally the same dist/). Writes only GENERATED_PATHS.

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readEpisodes } from './manifests.mjs'
import { normalizeSiteUrl, renderEpisodesJson, renderIndex, renderLatest } from './render.mjs'
import { ASSET_DIR, EPISODES_DIR, GENERATED_PATHS } from './paths.mjs'

const here = dirname(fileURLToPath(import.meta.url))
export const PACKAGE_DIR = resolve(here, '..')
export const ASSETS_SRC = join(PACKAGE_DIR, 'assets')
export const DEFAULT_DIST = resolve(PACKAGE_DIR, '..', '..', 'dist')

export { GENERATED_PATHS, ASSET_DIR } from './paths.mjs'
export { readEpisodes } from './manifests.mjs'
export { renderIndex, renderLatest, renderEpisodesJson, SHOW } from './render.mjs'

const inside = (child, parent) => {
  const r = relative(parent, child)
  return r === '' || (!r.startsWith('..') && !isAbsolute(r))
}

/** every file under dir, as sorted paths relative to dir */
async function listFiles(dir, prefix = '') {
  const out = []
  const entries = (await readdir(dir, { withFileTypes: true })).sort((a, b) => (a.name < b.name ? -1 : 1))
  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    const rel = prefix ? `${prefix}/${e.name}` : e.name
    if (e.isDirectory()) out.push(...(await listFiles(join(dir, e.name), rel)))
    else if (e.isFile()) out.push(rel)
  }
  return out
}

/**
 * @param {object} [opts]
 * @param {string} [opts.inDir]   directory containing episodes/<id>/episode.json (default: repo dist/)
 * @param {string} [opts.outDir]  where to write the archive (default: inDir)
 * @param {string} [opts.siteUrl] absolute base URL for Open Graph tags; omitted tags when unset
 * @returns {Promise<{ episodes: object[], drafts: string[], warnings: string[], written: string[] }>}
 */
export async function buildSite({ inDir = DEFAULT_DIST, outDir, siteUrl } = {}) {
  inDir = resolve(inDir)
  outDir = resolve(outDir ?? inDir)
  const base = normalizeSiteUrl(siteUrl)
  const forbidden = [resolve(inDir, EPISODES_DIR), resolve(outDir, EPISODES_DIR)]
  if (forbidden.some((f) => inside(outDir, f))) {
    throw new Error(`refusing to write the site inside an episodes directory: ${outDir}`)
  }

  const { episodes, drafts, warnings } = await readEpisodes(inDir)

  const files = new Map()
  files.set('index.html', renderIndex(episodes, { siteUrl: base }))
  files.set('episodes.json', renderEpisodesJson(episodes, { siteUrl: base }))
  files.set('latest/index.html', renderLatest(episodes))
  for (const rel of await listFiles(ASSETS_SRC)) {
    files.set(`${ASSET_DIR}/${rel}`, await readFile(join(ASSETS_SRC, rel)))
  }

  // Every target must fall under a declared generated path and outside episodes/.
  for (const rel of files.keys()) {
    const owned = GENERATED_PATHS.some((g) => (g.endsWith('/') ? rel.startsWith(g) : rel === g))
    const abs = resolve(outDir, rel)
    if (!owned || !inside(abs, outDir) || forbidden.some((f) => inside(abs, f))) {
      throw new Error(`internal error: ${rel} is not a generated path`)
    }
  }

  // Clear the previous generation (only our own paths), so removed assets do not linger.
  for (const g of GENERATED_PATHS) await rm(join(outDir, g), { recursive: true, force: true })

  const written = []
  for (const [rel, content] of files) {
    const abs = join(outDir, ...rel.split('/'))
    await mkdir(dirname(abs), { recursive: true })
    await writeFile(abs, content)
    written.push(rel)
  }
  return { episodes, drafts, warnings, written }
}

