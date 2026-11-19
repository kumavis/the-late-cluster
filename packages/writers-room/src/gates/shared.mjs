// Gates run at more than one stage.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gate, allTextFiles } from './common.mjs'

/**
 * Rule R11: no account on the scraper's opt-out list (or flagged opted out in the digest) appears
 * anywhere in the episode's files, working papers included, by handle or DID. The failure message
 * never repeats the name: it is saved in state.json and shown in the pull request.
 */
export async function optOutGate(ctx, name = 'optout') {
  const g = gate(name)
  const needles = [...ctx.digest.optedOut].filter((x) => x.length >= 3)
  if (!needles.length) {
    g.skip('the opt-out list is empty')
    return g.done()
  }
  for (const f of allTextFiles(ctx)) {
    const text = readFileSync(join(ctx.paths.dir, f), 'utf8').toLowerCase()
    for (const [k, n] of needles.entries()) {
      for (let at = text.indexOf(n); at >= 0; at = text.indexOf(n, at + 1)) {
        // a whole name, not part of a longer one
        const before = text[at - 1] ?? ' '
        const after = text[at + n.length] ?? ' '
        if (/[a-z0-9.-]/.test(before)) continue
        if (/[a-z0-9-]/.test(after) || (after === '.' && /[a-z0-9]/.test(text[at + n.length + 1] ?? ''))) continue
        const line = text.slice(0, at).split('\n').length
        g.fail(`${f}:${line}: names an account on the opt-out list (rule R11; entry ${k + 1} of the list the gate read). Remove every mention, quote and description of it`)
        break
      }
    }
  }
  return g.done()
}
