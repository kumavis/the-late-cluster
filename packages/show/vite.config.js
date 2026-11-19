// The studio's Vite config for one episode. The root commands (`npm run dev -- <ep>`,
// `npm run build -- <ep>`, the shoot and video tools) call showConfig() directly; this file is for
// running Vite by hand inside packages/show: LC_EPISODE=1 npx vite
import { resolveEpisode } from '../../scripts/lib/episodes.mjs'
import { showConfig } from './vite/episode.js'

if (!process.env.LC_EPISODE) throw new Error('set LC_EPISODE to an episode (1, 001-pilot or ref), or run `npm run dev -- <ep>` from the repo root')
const { configFile, ...config } = showConfig(resolveEpisode(process.env.LC_EPISODE))
export default config
