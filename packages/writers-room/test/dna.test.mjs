// The evolving DNA: inheritance (copy, consistency), the import gate, the constitution gate and the
// DNA amendments gate at review.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { appendFileSync, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { constitutionUnchanged, episodeImports, importsOf, inheritConsistent, selfCheckDna } from '../src/gates/dna.mjs'
import { bibleChanges, bibleSnapshot, parseAmendments } from '../src/dna.mjs'
import { experimentProblems } from '../src/experiment.mjs'
import { copyInherited, inheritedFiles, inheritProblems, removeInherited } from '../src/inherit.mjs'
import { loadConfig } from '../src/pipeline.mjs'
import { cleanup, ctxFor, fakeRepo, makeEpisode, plan, put, SCRIPT_CHAT, SCRIPT_COLD } from './helpers.mjs'

const { config } = loadConfig()
const EXPERIMENT = '# Experiment\n\n## What we try\n\nEnd one segment on a real post held in silence, with no button.\n\n## Why\n\nThe bible asks for a button everywhere; silence may land harder.\n\n## Measure\n\nThe built segment ends on the card with no line after it, and the reviewer scores the ending.\n'
const ok = (r) => assert.equal(r.ok, true, r.failures.join('\n'))
const fails = (r, re) => {
  assert.equal(r.ok, false, `expected a failure matching ${re}`)
  assert.ok(r.failures.some((f) => re.test(f)), `no failure matching ${re}:\n${r.failures.join('\n')}`)
}

async function run(gateFn, { planOver = {}, files = {}, setup } = {}) {
  const root = fakeRepo()
  try {
    makeEpisode(root, { files: { 'production/plan.json': plan({ inherit: [], ...planOver }), 'segments/cold-open/script.js': SCRIPT_COLD, 'segments/chat/script.js': SCRIPT_CHAT, 'production/experiment.md': EXPERIMENT, ...files } })
    const ctx = await ctxFor(root)
    ctx.bibleSnapshot = bibleSnapshot(ctx.bibleDir, config.constitution)
    if (setup) await setup(root, ctx)
    return await gateFn(ctx)
  } finally {
    cleanup(root)
  }
}

test('inheritance: copies exactly the named files, read-only, and the consistency gate holds it', async () => {
  const entry = { from: '001-pilot', path: 'segments/cold-open/script.js', why: 'the Ask timing' }
  await run(async (ctx) => {
    const record = copyInherited(ctx.root, ctx.paths.dir, { inherit: [entry] })
    assert.equal(record.length, 1)
    assert.match(record[0].sha256, /^[0-9a-f]{64}$/)
    const copy = join(ctx.paths.dir, 'production/inherited/001-pilot/segments/cold-open/script.js')
    assert.equal(readFileSync(copy, 'utf8'), readFileSync(join(ctx.root, 'episodes/001-pilot/segments/cold-open/script.js'), 'utf8'))
    assert.equal(statSync(copy).mode & 0o222, 0, 'read-only')
    ctx.plan.inherit = [entry]
    ok(await inheritConsistent(ctx))
    ctx.plan.inherit = []
    fails(await inheritConsistent(ctx), /holds \[001-pilot\/segments\/cold-open\/script\.js\] but plan\.json inherits \[nothing\]/)
    // a new copy replaces the old one entirely
    copyInherited(ctx.root, ctx.paths.dir, { inherit: [] })
    assert.deepEqual(inheritedFiles(ctx.paths.dir), [])
    ok(await inheritConsistent(ctx))
    removeInherited(ctx.paths.dir)
    return { ok: true, failures: [] }
  })
})

test('importsOf finds static, re-export and dynamic imports', () => {
  assert.deepEqual(importsOf("import a from '@late-cluster/show/x.js'\nimport { b } from './b.js'\nexport { c } from \"../c.js\"\nconst d = await import('./d.js')\nconst s = 'from nowhere'"), ['@late-cluster/show/x.js', './b.js', '../c.js', './d.js'])
})

test('imports: studio, packages and covered episode files only; never production/, outside, or uncovered', async () => {
  const idx = (src) => ({ 'segments/chat/index.js': src })
  ok(await run((c) => episodeImports(c), { files: idx("import { EKEY } from '@late-cluster/show/stage/set.js'\nimport * as THREE from 'three'\nexport default {}\n") }))
  ok(await run((c) => episodeImports(c), { files: { ...idx("import { prop } from './props.js'\nimport { q } from '@late-cluster/episode/segments/chat/props.js'\nexport default {}\n"), 'segments/chat/props.js': 'export const prop = 1, q = 2\n' } }))
  fails(await run((c) => episodeImports(c), { files: idx("import x from '@late-cluster/episode/production/inherited/001-pilot/segments/cold-open/index.js'\n") }), /from production\/ \(working papers and inherited reference are never part of a build\)/)
  fails(await run((c) => episodeImports(c), { files: idx("import x from '../../../001-pilot/segments/cold-open/index.js'\n") }), /outside the episode/)
  fails(await run((c) => episodeImports(c), { files: idx("import x from '../../../../packages/show/src/kit/draw.js'\n") }), /outside the episode/)
  fails(await run((c) => episodeImports(c), { files: { ...idx("import h from '@late-cluster/episode/lib/helpers.js'\n"), 'lib/helpers.js': 'export default 1\n' } }), /sourceHash does not cover/)
  fails(await run((c) => episodeImports(c), { files: idx("import x from '@late-cluster/site/x.js'\n") }), /episodes import only/)
})

test('imports: one segment importing another segment\'s file fails', async () => {
  fails(await run((c) => episodeImports(c), { files: { 'segments/chat/index.js': "import { p } from '@late-cluster/episode/segments/cold-open/props.js'\nexport default {}\n", 'segments/cold-open/props.js': 'export const p = 1\n' } }), /segment|cold-open/)
})

test('constitution: any change to a constitution file since the snapshot fails, whatever the permissions', async () => {
  ok(await run((c) => constitutionUnchanged(c)))
  fails(await run((c) => constitutionUnchanged(c), { setup: (root) => appendFileSync(join(root, 'docs/bible/00-constitution.md'), 'one more rule\n') }), /00-constitution\.md is part of the constitution and has changed/)
  fails(await run((c) => constitutionUnchanged(c), { setup: (root) => writeFileSync(join(root, 'docs/bible/09-real-people.md'), '# changed\n') }), /09-real-people\.md is part of the constitution/)
  // created after the snapshot counts as a change too
  const root = fakeRepo()
  try {
    makeEpisode(root, {})
    const snap = bibleSnapshot(join(root, 'docs/bible'), ['00-constitution.md', 'zz-new.md'])
    put(root, 'docs/bible/zz-new.md', 'x')
    assert.deepEqual(bibleChanges(snap, join(root, 'docs/bible'), ['00-constitution.md', 'zz-new.md']).constitutionChanged, ['zz-new.md'])
  } finally {
    cleanup(root)
  }
})

const AMEND = (edits) => `# DNA amendments: episode 002\n\n## Experiment\n\nA whole thread verbatim; success: replies quote its last line. Before air: can't tell yet, it is judged after air.\n\n## Edits to the DNA in this pull request\n\n${edits}\n`

test('review.dna: optional when the bible is untouched; every DNA edit listed, nothing listed that did not change, "none" needs a reason', async () => {
  const amend = (root) => appendFileSync(join(root, 'docs/bible/03-episode-shape.md'), '\nA new rule.\n')
  ok(await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('none: the experiment is judged after air') } }))
  ok(await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('- `03-episode-shape.md` (end): adds a rule about threads — because the thread worked') }, setup: amend }))
  const quiet = await run(selfCheckDna)
  ok(quiet)
  assert.match(quiet.warnings.join(' '), /no edit to the craft bible/)
  fails(await run(selfCheckDna, { files: { 'production/experiment.md': null } }), /experiment\.md is missing/)
  fails(await run(selfCheckDna, { setup: amend }), /03-episode-shape\.md\) but production\/dna-amendments\.md is missing/)
  fails(await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('none: nothing to change') }, setup: amend }), /does not list 03-episode-shape\.md, which this run modified/)
  fails(await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('- `04-formats.md`: a new format card — because it worked') } }), /lists 04-formats\.md, which has not changed in this run/)
  fails(await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('') } }), /say "none" and the reason/)
  fails(await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('none').replace("Before air: can't tell yet, it is judged after air.", 'It was a thing we tried on the show this week.') } }), /must give the verdict before air/)
  const warned = await run(selfCheckDna, { files: { 'production/dna-amendments.md': AMEND('- `03-episode-shape.md`: adds a rule about threads') }, setup: amend })
  assert.match(warned.warnings.join(' '), /DNA edited although the experiment's verdict is "can't tell"/)
})

test('parseAmendments reads the bible\'s shape', () => {
  const a = parseAmendments(AMEND('- `docs/bible/03-episode-shape.md` (Evolving the show): one line — because evidence'))
  assert.equal(a.verdict, "can't tell")
  assert.deepEqual(a.files, [{ file: '03-episode-shape.md', summary: 'one line — because evidence' }])
  assert.equal(parseAmendments(AMEND('"none", because it is a one-off')).none, 'because it is a one-off')
})

test('the experiment: three sections, and nothing about earlier episodes, because it goes to writers', () => {
  assert.deepEqual(experimentProblems(EXPERIMENT), [])
  assert.match(experimentProblems(null)[0], /is missing/)
  assert.match(experimentProblems(EXPERIMENT.replace('## Measure', '## Notes')).join(' '), /no "## Measure" section/)
  assert.match(experimentProblems(EXPERIMENT.replace('with no button', 'unlike the pilot, with no button')).join(' '), /refers to what the show has done \("pilot"\)/)
  assert.match(experimentProblems(EXPERIMENT.replace('with no button', 'not the counter again')).join(' '), /"again"/)
})
