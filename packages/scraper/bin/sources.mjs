#!/usr/bin/env node
// npm run sources -- check <path/to/sources.json> [--dir <digest folder>] [--out <file.md>] [--json]
import { sources } from '../src/sources.js'
import { REPO_ROOT } from '../src/run.js'

sources(process.argv.slice(2), { repoRoot: REPO_ROOT })
  .then((code) => { process.exitCode = code })
  .catch((err) => { process.stderr.write(`error: ${err.message}\n`); process.exitCode = 1 })
