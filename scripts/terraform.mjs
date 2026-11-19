#!/usr/bin/env node
// npm run terraform -- <args>
// Runs `terraform -chdir=terraform <args>` from the repo root, with stdio and the exit code passed
// through. The root npm script starts Node with --env-file-if-exists=.secrets, so local secrets
// (CLOUDFLARE_API_TOKEN) reach Terraform without being exported; variables already in the
// environment (CI) win over the file. This script never prints the environment.
// Exit codes: Terraform's own; 127 when terraform is not installed; 128+n if it was killed by signal n.
import { spawnSync } from 'node:child_process'
import { constants } from 'node:os'
import { REPO } from './lib/episodes.mjs'

const r = spawnSync('terraform', ['-chdir=terraform', ...process.argv.slice(2)], { cwd: REPO, stdio: 'inherit' })
if (r.error) {
  if (r.error.code === 'ENOENT') {
    console.error('error: terraform is not installed or not on PATH (https://developer.hashicorp.com/terraform/install)')
    process.exit(127)
  }
  console.error(`error: could not run terraform: ${r.error.message}`)
  process.exit(1)
}
process.exit(r.status ?? 128 + (constants.signals[r.signal] ?? 0))
