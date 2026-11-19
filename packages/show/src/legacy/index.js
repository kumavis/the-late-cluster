// The legacy casts, keyed by the episode id that uses them. Read only through src/roster.js.
//
// An entry exists only for an episode whose source is frozen and that has no cast.js / looks.js
// of its own. A new episode never gets one: it defines its cast in its own folder.
import { PILOT_CAST, PILOT_LOOKS, PILOT_HOUSE } from './pilot-guests.js'

export const LEGACY = {
  '001-pilot': { cast: PILOT_CAST, looks: PILOT_LOOKS, house: PILOT_HOUSE },
}
