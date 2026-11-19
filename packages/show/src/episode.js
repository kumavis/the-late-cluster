// The episode this page was built for. The episode files themselves come in through the
// `virtual:late-cluster/episode` module (vite/episode.js); this module merges the episode's own
// cast and looks over the studio's house cast before anything else reads them.
import { episode, modules, cues, cast, looks } from 'virtual:late-cluster/episode'
import { CAST } from './cast.js'
import { defineLook } from './looks.js'

Object.assign(CAST, cast)
for (const [id, spec] of Object.entries(looks)) defineLook(id, spec)

export { episode, modules, cues }
