#!/usr/bin/env node
// npm run dev -- <ep> [--port 5173] [--host]
// The studio's dev server for one episode. Audio and telemetry come from episodes/<id>/public/
// (a fresh render) or, failing that, from the committed build in dist/episodes/<id>/.
import { cli, resolveEpisode, EpisodeError } from './lib/episodes.mjs'

cli(async () => {
  const argv = process.argv.slice(2)
  const opt = (name) => {
    const i = argv.indexOf(`--${name}`)
    if (i < 0) return undefined
    const v = argv[i + 1]
    argv.splice(i, 2)
    return v
  }
  const port = Number(opt('port') ?? 5173)
  const host = argv.includes('--host') ? (argv.splice(argv.indexOf('--host'), 1), true) : undefined
  if (argv.length !== 1) throw new EpisodeError('usage: npm run dev -- <ep> [--port 5173] [--host]')
  const ep = resolveEpisode(argv[0])
  const { createServer } = await import('vite')
  const { showConfig } = await import('../packages/show/vite/episode.js')
  const config = showConfig(ep)
  const server = await createServer({ ...config, server: { ...config.server, port, host } })
  await server.listen()
  console.log(`${ep.id}: ${server.resolvedUrls.local[0]}  (?seg=<id> to start at a segment)`)
  return new Promise(() => {}) // until Ctrl-C
})
