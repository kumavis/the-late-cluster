#!/usr/bin/env node
// npm run lookup -- --uri <address> | --text <words> | --author <handle> | --story <id> | --thread <address>
import { join } from 'node:path'
import { lookup } from '../src/lookup.js'
import { REPO_ROOT } from '../src/run.js'

try {
  process.exitCode = lookup(process.argv.slice(2), { roots: [join(REPO_ROOT, 'data', 'weeks'), join(REPO_ROOT, 'data', 'ranges')] })
} catch (err) {
  process.stderr.write(`lookup failed: ${err.message}\n`)
  process.exitCode = 2
}
