#!/usr/bin/env node
// npm run scrape -- [--week 2026-W47 | --days 7] [--out <dir>]
import { run, USAGE } from '../src/run.js'

run().catch((err) => {
  process.stderr.write(`scrape failed: ${err.message}\n`)
  if (err.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION' || /ISO week|--days|--week/.test(err.message)) process.stderr.write('\n' + USAGE)
  process.exit(1)
})
