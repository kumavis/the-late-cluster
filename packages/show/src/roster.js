// The one resolver for who is in an episode: the cast and looks every part of the studio sees for
// a given episode id. The page (src/episode.js, fed by vite/episode.js) and the offline tools
// (tools/episode.mjs: render, check, analyze; shoot, video and thumbnails go through the page)
// all call applyRoster(); nothing else merges casts.
//
// The order is: the house cast (src/cast.js, src/looks.js), then the legacy entries keyed to this
// episode id (src/legacy/index.js: only 001-pilot has one), then the episode's own cast.js and
// looks.js. An episode's own entry replaces a whole entry; it does not patch fields.
//
// Pure: no imports beyond the legacy table, so `node --test` can load it with nothing installed.
// The studio's singletons are passed in, not imported (src/looks.js pulls in TypeScript).
import { LEGACY } from './legacy/index.js'

const NONE = Object.freeze({ cast: Object.freeze({}), looks: Object.freeze({}), house: Object.freeze([]), stage: Object.freeze({}) })

/** the legacy entry for an episode id: { cast, looks (look() argument lists), house (ids), stage (drawn text) }; empty for any other id */
export function legacyFor(id) {
  return Object.hasOwn(LEGACY, String(id)) ? LEGACY[id] : NONE
}

/** the cast an episode sees, as a new object: house, then its legacy entries, then its own cast.js */
export function rosterCast(id, house, own = {}) {
  return { ...house, ...legacyFor(id).cast, ...own }
}

/** the studio's drawn text for an episode, as a new object: the defaults, then its legacy `stage` */
export function rosterStage(id, defaults) {
  return { ...defaults, ...(legacyFor(id).stage ?? {}) }
}

/**
 * Apply an episode's roster to the studio's singletons, in place, once per process or page:
 * `own` is the episode's { cast, looks } (its cast.js CAST and looks.js LOOKS, either may be {}),
 * `studio` is { CAST, LOOKS, look, defineLook, HOUSE_IDS?, STAGE_TEXT? } from src/cast.js, src/looks.js,
 * stage/shots.js and stage/text.js. Legacy looks are built with look(); the episode's own go through defineLook().
 */
export function applyRoster(id, own, studio) {
  const { cast = {}, looks = {} } = own ?? {}
  const { CAST, LOOKS, look, defineLook, HOUSE_IDS, STAGE_TEXT } = studio
  const legacy = legacyFor(id)
  Object.assign(CAST, rosterCast(id, CAST, cast))
  for (const [k, args] of Object.entries(legacy.looks)) LOOKS[k] = look(...args)
  for (const [k, spec] of Object.entries(looks)) defineLook(k, spec)
  if (HOUSE_IDS) for (const k of legacy.house) if (!HOUSE_IDS.includes(k)) HOUSE_IDS.push(k)
  if (STAGE_TEXT) Object.assign(STAGE_TEXT, legacy.stage ?? {})
}
