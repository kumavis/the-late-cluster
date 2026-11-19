// The tools' side of the episode seam: resolve <ep> through the repo's one resolver
// (scripts/lib/episodes.mjs) and merge the episode's own cast.js / looks.js over the studio's
// house cast, exactly as the page does (src/episode.js), so render, check and analyze voice an
// episode's one-off guests.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { resolveEpisode, requireSegment, EpisodeError, REPO } from '../../../scripts/lib/episodes.mjs'

export { resolveEpisode, requireSegment, EpisodeError, REPO }

/** resolve <ep> and apply its cast and looks; throws EpisodeError */
export async function loadEpisode(arg) {
  const ep = resolveEpisode(arg)
  const { CAST } = await import('../src/cast.js')
  const castFile = join(ep.dir, 'cast.js')
  if (existsSync(castFile)) Object.assign(CAST, (await import(pathToFileURL(castFile).href)).CAST ?? {})
  const looksFile = join(ep.dir, 'looks.js')
  if (existsSync(looksFile)) {
    const { defineLook } = await import('../src/looks.js')
    for (const [id, spec] of Object.entries((await import(pathToFileURL(looksFile).href)).LOOKS ?? {})) defineLook(id, spec)
  }
  return ep
}

/** print `error: …` and exit with its code (2 bad input) for an EpisodeError; rethrow anything else */
export function exitOnEpisodeError(e) {
  if (e instanceof EpisodeError) {
    console.error(`error: ${e.message}`)
    process.exit(e.code ?? 2)
  }
  throw e
}
