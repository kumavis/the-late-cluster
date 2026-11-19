#!/usr/bin/env node
// npm run build -- <ep> [--preview]
//
// Builds one episode into dist/episodes/<id>/ (a published episode) or, with --preview, into
// preview/<id>/ (gitignored; drafts can only be built this way). Refuses when a rundown segment
// lacks its script, module, cues or rendered audio and telemetry. The bundle is made in a temp
// folder and swapped in only when complete, carrying the current build's audio and telemetry
// forward when there is no fresh render in episodes/<id>/public/.
//
// Open Graph URLs are absolute only when show.config.json has a siteUrl (never from the environment).
// Output: one line, `built <id> <dir> segments=<n> public=<n> carried=<n> sourceHash=<hash>`.
// Exit codes: 0 built, 1 refused or failed, 2 bad arguments or unknown episode.
import { cli, resolveEpisode, EpisodeError } from './lib/episodes.mjs'
import { buildEpisode } from './lib/build.mjs'
import { readShowConfig } from './lib/showconfig.mjs'

cli(async () => {
  const args = process.argv.slice(2)
  const preview = args.includes('--preview')
  const rest = args.filter((a) => a !== '--preview')
  if (rest.length !== 1 || rest[0].startsWith('--')) throw new EpisodeError('usage: npm run build -- <ep> [--preview]')
  const ep = resolveEpisode(rest[0])
  readShowConfig(ep.root) // an invalid siteUrl stops the build before anything is bundled
  let vite, showConfig
  const bundle = async (outDir) => {
    try {
      vite = await import('vite')
      ;({ showConfig } = await import('../packages/show/vite/episode.js'))
    } catch (e) {
      throw new EpisodeError(`cannot load Vite (${e.message.split('\n')[0]}): run npm install first`, 1)
    }
    const config = showConfig(ep, { outDir })
    await vite.build({ ...config, logLevel: 'error', build: { ...config.build, outDir, emptyOutDir: true } })
  }
  const r = await buildEpisode(ep, { preview, bundle })
  for (const w of r.warnings) console.error(`warning: ${w}`)
  const fresh = r.assets.filter((a) => a.from === 'public').length
  console.log(`built ${ep.id} ${ep.rel(r.finalDir)} segments=${ep.rundown.length} public=${fresh} carried=${r.assets.length - fresh} sourceHash=${r.manifest.build.sourceHash}`)
  return 0
})
