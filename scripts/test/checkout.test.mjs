// Guards against a tracked file being lost to an over-broad ignore rule. In CI this runs on a
// clean checkout, so a file that exists only on someone's disk fails here. Node builtins only.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const REPO = fileURLToPath(new URL('../..', import.meta.url))

// Files the studio cannot work without and that no build step can regenerate.
const REQUIRED = [
  'packages/show/tools/data/cmudict.txt.gz', // pronunciation dictionary for the renderer
  'packages/show/tools/data/CMUDICT-LICENSE.txt',
  'packages/show/tools/data/heard-terms.json', // crude words the fitting tool flags in what was heard
  'packages/show/chimera/wasm/chimera.wasm', // the voice engine
  'packages/show/chimera/LICENSE',
  'packages/show/public/fonts/AVHersheySimplexLight.otf',
  'packages/show/public/fonts/AVHersheySimplexMedium.otf',
  'packages/show/reference/public/audio/demo.mp3', // the reference episode's committed render
  'packages/show/reference/public/tele/demo.bin',
  'show.config.json',
]

for (const path of REQUIRED) {
  test(`checkout has ${path}`, () => {
    const abs = join(REPO, path)
    assert.ok(existsSync(abs), `${path} is missing: is it tracked, or caught by a .gitignore rule?`)
    assert.ok(statSync(abs).size > 0, `${path} is empty`)
  })
}
