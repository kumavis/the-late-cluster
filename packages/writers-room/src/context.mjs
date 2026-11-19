// Everything a gate reads, loaded once per gate run: the episode, its plan and sources, the
// week's digest, the cast (studio roster merged with the episode's own cast.js) and the history of
// earlier published episodes' plans.
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { emptyDigest, loadDigest, normHandle } from './digest.mjs'
import { episodePaths, listEpisodes, readJson } from './repo.mjs'
import { isExampleHost as exampleHost } from './scan.mjs'
import { planFromLogRow, rotationLog } from './bible.mjs'

/** import a plain data module freshly (its mtime busts Node's module cache) */
export async function importFresh(file) {
  const v = statSync(file).mtimeMs
  return import(`${pathToFileURL(file).href}?v=${v}`)
}

export async function loadCast(root, paths) {
  const cast = {}
  const studio = join(root, 'packages', 'show', 'src', 'cast.js')
  if (existsSync(studio)) Object.assign(cast, structuredClone((await importFresh(studio)).CAST ?? {}))
  const houseIds = new Set(Object.entries(cast).filter(([, c]) => !c.guest).map(([id]) => id))
  let episodeCast = {}
  if (paths && existsSync(paths.castJs)) episodeCast = (await importFresh(paths.castJs)).CAST ?? {}
  Object.assign(cast, structuredClone(episodeCast))
  const guests = new Set(Object.entries(cast).filter(([, c]) => c?.guest).map(([id]) => id))
  return { cast, guests, house: houseIds, episodeCast }
}

export const castHandle = (entry) => normHandle(entry?.handle ?? '')
/** a cast entry that stands for nobody real: no handle, or a handle on .example */
export const isInvented = (entry) => !entry?.handle || exampleHost(castHandle(entry))

/**
 * ctx for the gates. `digestDir` defaults to data/weeks/<week>/. The digest is loaded lazily and
 * cached on the returned object.
 */
export async function loadContext({ root, id, week, digestDir, config, limits, tools, network = false, loreFile }) {
  const paths = episodePaths(root, id)
  const meta = readJson(paths.episodeJson)
  const ctx = {
    root,
    id,
    week,
    paths,
    meta,
    config,
    limits: limits ?? config.limits,
    tools,
    network,
    loreFile: loreFile ?? join(root, 'docs', 'bible', 'lore.md'),
    digestDir: digestDir ?? join(root, 'data', 'weeks', week),
    optOutFile: join(root, 'packages', 'scraper', 'config', 'optout.json'),
  }
  let digest = null
  Object.defineProperty(ctx, 'digest', {
    get() {
      if (!digest) digest = existsSync(join(ctx.digestDir, 'digest.json')) ? loadDigest(ctx.digestDir, { optOutFile: ctx.optOutFile }) : Object.assign(emptyDigest(), { missing: true })
      return digest
    },
  })
  ctx.plan = existsSync(paths.plan) ? readJson(paths.plan) : null
  ctx.sources = existsSync(paths.sources) ? readJson(paths.sources) : null
  ctx.castInfo = await loadCast(root, paths)
  // history for the freshness checks: each earlier published episode's plan.json, or else its row
  // in the lore file's rotation log
  const log = existsSync(ctx.loreFile) ? rotationLog(readFileSync(ctx.loreFile, 'utf8')) : { rows: [] }
  ctx.history = listEpisodes(root)
    .filter((e) => e.id !== id && e.number < paths.number && e.meta.status === 'published')
    .map((e) => {
      const f = join(e.dir, 'production', 'plan.json')
      const row = log.rows.find((r) => Number(r.ep) === e.number)
      const plan = existsSync(f) ? safeJson(f) : row ? planFromLogRow(row) : null
      return { id: e.id, number: e.number, plan, source: existsSync(f) ? 'plan.json' : row ? 'rotation log' : null }
    })
  return ctx
}

function safeJson(f) {
  try {
    return JSON.parse(readFileSync(f, 'utf8'))
  } catch {
    return null
  }
}

