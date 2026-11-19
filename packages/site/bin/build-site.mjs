#!/usr/bin/env node
// Generate the archive page into dist/ from the committed episode manifests.
//
//   node packages/site/bin/build-site.mjs [inDir] [outDir]
//
// inDir defaults to the repo's dist/, outDir to inDir. Set SITE_URL (for example
// https://user.github.io/the-late-cluster/) to add absolute Open Graph URLs.

import { isAbsolute, relative, resolve } from 'node:path'
import { buildSite, DEFAULT_DIST } from '../src/build.mjs'

const args = process.argv.slice(2)
if (args.includes('-h') || args.includes('--help')) {
  console.log('usage: build-site.mjs [inDir] [outDir]   (default: the repo dist/; SITE_URL env for Open Graph URLs)')
  process.exit(0)
}
const [inDir = DEFAULT_DIST, outDir = inDir] = args

try {
  const { episodes, drafts, warnings, written } = await buildSite({ inDir, outDir, siteUrl: process.env.SITE_URL })
  for (const w of warnings) console.warn(`site: warning: ${w}`)
  const rel = relative(process.cwd(), resolve(outDir))
  const where = rel === '' ? '.' : rel.startsWith('..') || isAbsolute(rel) ? resolve(outDir) : rel
  const draftNote = drafts.length ? `, ${drafts.length} draft${drafts.length === 1 ? '' : 's'} not listed` : ''
  console.log(`site: ${episodes.length} published episode${episodes.length === 1 ? '' : 's'}${draftNote}; wrote ${written.length} files to ${where.replace(/\/$/, '')}/`)
} catch (e) {
  console.error(`site: ${e.message}`)
  process.exit(1)
}
