// The episode this page was built for. The episode files themselves come in through the
// `virtual:late-cluster/episode` module (vite/episode.js); this module merges the episode's own
// cast and looks over the studio's house cast before anything else reads them, through the one
// resolver (src/roster.js), keyed by the episode's id.
import { episode, modules, cues, cast, looks } from 'virtual:late-cluster/episode'
import { CAST } from './cast.js'
import { LOOKS, look, defineLook } from './looks.js'
import { HOUSE_IDS } from './stage/shots.js'
import { applyRoster } from './roster.js'

applyRoster(episode.id, { cast, looks }, { CAST, LOOKS, look, defineLook, HOUSE_IDS })

export { episode, modules, cues }
