// The tools' side of the episode seam: resolve <ep> through the repo's one resolver
// (scripts/lib/episodes.mjs) and apply that episode's roster (src/roster.js: the house cast, the
// legacy cast keyed to its id if any, its own cast.js / looks.js), exactly as the page does
// (src/episode.js), so render, check and analyze voice an episode's own guests and nobody else's.
// The studio modules are imported lazily: video.mjs runs under node and only needs resolveEpisode.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { resolveEpisode, requireSegment, EpisodeError, REPO } from '../../../scripts/lib/episodes.mjs'

export { resolveEpisode, requireSegment, EpisodeError, REPO }

/** resolve <ep> and apply its cast and looks; throws EpisodeError */
export async function loadEpisode(arg) {
  const ep = resolveEpisode(arg)
  const own = async (file, name) => (existsSync(join(ep.dir, file)) ? (await import(pathToFileURL(join(ep.dir, file)).href))[name] ?? {} : {})
  const [{ CAST }, { LOOKS, look, defineLook }, { applyRoster }] = await Promise.all([import('../src/cast.js'), import('../src/looks.js'), import('../src/roster.js')])
  applyRoster(ep.id, { cast: await own('cast.js', 'CAST'), looks: await own('looks.js', 'LOOKS') }, { CAST, LOOKS, look, defineLook })
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
