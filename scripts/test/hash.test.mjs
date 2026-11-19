import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renameSync } from 'node:fs'
import { join } from 'node:path'
import { sourceHash, sourceFiles, studioHash, treeHash, sha256 } from '../lib/hash.mjs'
import { tempRoot, addEpisode } from './fixture.mjs'

test('sourceHash is stable and covers exactly the source inputs', () => {
  const fx = tempRoot()
  try {
    addEpisode(fx, '001-pilot', { rundown: ['intro', 'outro'] })
    const dir = join(fx.root, 'episodes/001-pilot')
    const h = sourceHash(dir)
    assert.match(h, /^[0-9a-f]{64}$/)
    assert.equal(sourceHash(dir), h)
    assert.deepEqual(sourceFiles(dir, ['intro', 'outro']), ['episode.json', 'thumbnail.jpg', 'segments/intro/cues.json', 'segments/intro/index.js', 'segments/intro/script.js', 'segments/outro/cues.json', 'segments/outro/index.js', 'segments/outro/script.js'])

    // not covered: rendered assets, dot files, segments outside the rundown, production notes
    fx.put('episodes/001-pilot/public/audio/intro.mp3', 'new render')
    fx.put('episodes/001-pilot/segments/intro/.DS_Store', 'x')
    fx.put('episodes/001-pilot/segments/unused/script.js', 'x')
    fx.put('episodes/001-pilot/production/pitch.md', 'x')
    assert.equal(sourceHash(dir), h)

    // covered: any byte of a segment file, cast.js / looks.js, new files in a segment folder
    fx.put('episodes/001-pilot/segments/intro/script.js', "export default { id: 'intro', beats: [ ] }\n")
    const h2 = sourceHash(dir)
    assert.notEqual(h2, h)
    fx.put('episodes/001-pilot/cast.js', 'export const CAST = {}\n')
    const h3 = sourceHash(dir)
    assert.notEqual(h3, h2)
    fx.put('episodes/001-pilot/segments/outro/notes.txt', 'x')
    assert.notEqual(sourceHash(dir), h3)
  } finally {
    fx.cleanup()
  }
})

test('a tree hash includes paths, so a rename changes it', () => {
  const fx = tempRoot()
  try {
    fx.put('t/a.txt', 'same')
    const before = treeHash(join(fx.root, 't'), ['a.txt'])
    assert.equal(before, sha256(`${sha256('same')} a.txt\n`))
    renameSync(join(fx.root, 't/a.txt'), join(fx.root, 't/b.txt'))
    assert.notEqual(treeHash(join(fx.root, 't'), ['b.txt']), before)
  } finally {
    fx.cleanup()
  }
})

test('studioHash reads the bundle inputs only', () => {
  const fx = tempRoot()
  try {
    fx.put('packages/show/src/app.js', 'a')
    fx.put('packages/show/index.html', 'h')
    const s = join(fx.root, 'packages/show')
    const h = studioHash(s)
    fx.put('packages/show/tools/render.ts', 'not bundled')
    fx.put('packages/show/reference/segments/demo/script.js', 'not bundled')
    assert.equal(studioHash(s), h)
    fx.put('packages/show/src/app.js', 'b')
    assert.notEqual(studioHash(s), h)
  } finally {
    fx.cleanup()
  }
})
