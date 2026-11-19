// The writer interface. A writer does one creative stage:
//
//   await writer.run({ stage, prompt, root, id, week, paths, attempt, feedback, loreFile })
//     → { status: 'done' }                  it worked on the files; the pipeline now runs the gates
//     | { status: 'waiting', detail }       a person (or an interactive session) has the stage
//     | { status: 'failed', detail }        the writer itself failed (not a gate failure)
//
// Three implementations: claude (Claude Code, headless), manual (print the prompt and stop) and
// fixture (copy prepared outputs into place, for tests and the self-test).
import { claudeWriter } from './claude.mjs'
import { fixtureWriter } from './fixture.mjs'
import { manualWriter } from './manual.mjs'

export const WRITERS = ['claude', 'manual', 'fixture']

export function makeWriter(name, opts) {
  if (name === 'claude') return claudeWriter(opts)
  if (name === 'manual') return manualWriter(opts)
  if (name === 'fixture') return fixtureWriter(opts)
  throw new Error(`unknown writer ${name} (${WRITERS.join(', ')})`)
}
