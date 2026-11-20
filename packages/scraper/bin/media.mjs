#!/usr/bin/env node
// npm run media -- --dir <digest folder> --uri <at://...>
import { join } from 'node:path'
import { media } from '../src/media.js'
import { REPO_ROOT } from '../src/run.js'

media(process.argv.slice(2), { roots: [join(REPO_ROOT, 'data', 'weeks'), join(REPO_ROOT, 'data', 'ranges')] })
  .then((code) => { process.exitCode = code })
  .catch((err) => { process.stderr.write(`error: ${err.message}\n`); process.exitCode = 1 })
