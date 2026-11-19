#!/usr/bin/env node
// npm run verify
//
// The committed builds match their sources. Node builtins only: runs on a checkout with no
// node_modules (CI and deploy do exactly that). See scripts/lib/verify.mjs for the rules.
//
// Output: one line per episode or orphan build, `ok <id>` or `FAIL <id>: <problem>`, then
// `verify: <n> published, <n> drafts, <n> problems`. Exit 0 all good, 1 a problem, 2 an error.
import { REPO, EpisodeError } from './lib/episodes.mjs'
import { verifyRepo } from './lib/verify.mjs'

try {
  const root = process.argv[2] === '--root' ? process.argv[3] : REPO
  const r = verifyRepo(root)
  let n = 0
  for (const x of r.results) {
    if (x.ok) console.log(`ok ${x.id}`)
    for (const p of x.problems) console.log(`FAIL ${x.id}: ${p}`), n++
  }
  console.log(`verify: ${r.published} published, ${r.drafts} drafts, ${n} problems`)
  process.exitCode = r.ok ? 0 : 1
} catch (e) {
  console.error(`error: ${e instanceof EpisodeError ? e.message : e.stack}`)
  process.exitCode = 2
}
