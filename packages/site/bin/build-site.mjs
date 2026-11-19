#!/usr/bin/env node
// Generate the archive page into dist/ from the committed episode manifests.
//
//   node packages/site/bin/build-site.mjs [inDir] [outDir]
//
// inDir defaults to the repo's dist/, outDir to inDir. The site URL for absolute Open Graph URLs
// is SITE_URL if set, else siteUrl in the repo's show.config.json; empty leaves them out.

import { isAbsolute, relative, resolve } from 'node:path'
import { buildSite, DEFAULT_DIST, resolveSiteUrl } from '../src/build.mjs'

const args = process.argv.slice(2)
if (args.includes('-h') || args.includes('--help')) {
  console.log('usage: build-site.mjs [inDir] [outDir]   (default: the repo dist/; site URL: SITE_URL env, else show.config.json)')
  process.exit(0)
}
const [inDir = DEFAULT_DIST, outDir = inDir] = args

try {
  const { episodes, drafts, warnings, written } = await buildSite({ inDir, outDir, siteUrl: resolveSiteUrl({ env: process.env }) })
  for (const w of warnings) console.warn(`site: warning: ${w}`)
  const rel = relative(process.cwd(), resolve(outDir))
  const where = rel === '' ? '.' : rel.startsWith('..') || isAbsolute(rel) ? resolve(outDir) : rel
  const draftNote = drafts.length ? `, ${drafts.length} draft${drafts.length === 1 ? '' : 's'} not listed` : ''
  console.log(`site: ${episodes.length} published episode${episodes.length === 1 ? '' : 's'}${draftNote}; wrote ${written.length} files to ${where.replace(/\/$/, '')}/`)
} catch (e) {
  console.error(`site: ${e.message}`)
  process.exit(1)
}
