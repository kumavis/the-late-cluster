// The tools' side of the episode seam: resolve <ep> through the repo's one resolver
// (scripts/lib/episodes.mjs) and apply that episode's roster (src/roster.js: the house cast, the
// legacy cast keyed to its id if any, its own cast.js / looks.js), exactly as the page does
// (src/episode.js), so render, check and analyze voice an episode's own guests and nobody else's.
// The studio modules are imported lazily: video.mjs runs under node and only needs resolveEpisode.
import { existsSync, statSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { resolveEpisode as resolveInRepo, requireSegment, EpisodeError, REPO } from '../../../scripts/lib/episodes.mjs'
import { DraftError, draftView, resolveDraft } from './draft.mjs'

export { requireSegment, EpisodeError, REPO }

/**
 * <ep> → an episode, through the repo's resolver. <ep> may also be the path of an episode folder
 * anywhere (…/episodes/<id>, with its episode.json): it is resolved with that folder's parent's
 * parent as the root, so a copy of an episode (a branch extracted to a scratch folder) can be fitted
 * or rendered without checking it out.
 */
export function resolveEpisode(arg, opts) {
  const a = String(arg ?? '')
  if (/[\\/]/.test(a) && existsSync(join(a, 'episode.json')) && statSync(a).isDirectory()) {
    const dir = resolve(a)
    if (basename(dirname(dir)) !== 'episodes') throw new EpisodeError(`${a}: an episode folder given by path must sit in a folder named episodes/`)
    return resolveInRepo(basename(dir), { root: dirname(dirname(dir)) })
  }
  return resolveInRepo(arg, opts)
}

/** resolve <ep> and apply its cast and looks; throws EpisodeError */
export async function loadEpisode(arg) {
  const ep = resolveEpisode(arg)
  const own = async (file, name) => (existsSync(join(ep.dir, file)) ? (await import(pathToFileURL(join(ep.dir, file)).href))[name] ?? {} : {})
  const [{ CAST }, { LOOKS, look, defineLook }, { applyRoster }] = await Promise.all([import('../src/cast.js'), import('../src/looks.js'), import('../src/roster.js')])
  applyRoster(ep.id, { cast: await own('cast.js', 'CAST'), looks: await own('looks.js', 'LOOKS') }, { CAST, LOOKS, look, defineLook })
  return ep
}

/**
 * A draft of a loaded episode (loadEpisode first): merge the draft's own cast.js over the cast, and
 * return { draft (its paths), view (an episode-shaped object whose one segment is the draft) }.
 * Throws DraftError for an unknown draft.
 */
export async function loadDraft(ep, slug) {
  const draft = resolveDraft(ep, slug)
  if (draft.cast) {
    const [{ CAST }, own] = await Promise.all([import('../src/cast.js'), import(pathToFileURL(draft.cast).href)])
    Object.assign(CAST, own.CAST ?? {})
  }
  return { draft, view: draftView(ep, draft) }
}

/** print `error: …` and exit with its code (2 bad input) for an EpisodeError; rethrow anything else */
export function exitOnEpisodeError(e) {
  if (e instanceof EpisodeError || e instanceof DraftError) {
    console.error(`error: ${e.message}`)
    process.exit(e.code ?? 2)
  }
  throw e
}
