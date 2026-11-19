#!/usr/bin/env node
// Entry point: `npm run bot -- <command> [args]`. All logic lives in src/.
import { main } from '../src/cli.mjs';

process.exitCode = await main(process.argv.slice(2), {
  env: process.env,
  stdout: process.stdout,
  stderr: process.stderr,
  fetch: globalThis.fetch,
});
