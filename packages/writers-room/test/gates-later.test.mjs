// render, direct, build and self-check gates, and the bible readers
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseWhisper, renderCheck, renderLengths, renderWhisper } from '../src/gates/render.mjs'
import { directCards, directDisclaimer, directFrames, directModules, frameTimes, parseShoot } from '../src/gates/direct.mjs'
import { buildThumbnail, parseScorecard, selfCheckLore, selfCheckScorecard } from '../src/gates/build.mjs'
import { pitchTemplateSections, reviewerChecklist, rotationLog, scorecardSpec } from '../src/bible.mjs'
import { REPO } from '../src/repo.mjs'
import { cleanup, ctxFor, fakeRepo, fakeTools, ID, LORE, makeEpisode, plan, POSTS, put, SCRIPT_CHAT, SCRIPT_COLD, SOURCES } from './helpers.mjs'

const files = () => ({
  'production/plan.json': plan(),
  'production/sources.json': SOURCES,
  'segments/cold-open/script.js': SCRIPT_COLD,
  'segments/chat/script.js': SCRIPT_CHAT,
  'segments/cold-open/cues.json': { id: 'cold-open', duration: 20.5, lines: [], cues: { a: 1 }, sfx: [], music: [] },
  'segments/chat/cues.json': { id: 'chat', duration: 41, lines: [], cues: {}, sfx: [], music: [] },
  'segments/cold-open/index.js': "export default { shots: [{ at: 0, shot: 'desk' }], drawFront(ctx, t, show) { show.draw.skeetCard(ctx, { text: 'built it: https://golem.cy.test' }) } }\n",
  'segments/chat/index.js': `export default { guests: ['ana', 'bo'], disclaimer: { text: 'Performed verbatim from a public thread. Puppets play posting personas.', from: 0, dur: 6 } }\n`,
})
async function run(gateFn, over = {}, { tools, drop = [], lore } = {}) {
  const root = fakeRepo()
  try {
    const all = { ...files(), ...over }
    for (const d of drop) delete all[d]
    makeEpisode(root, { files: all })
    if (lore !== undefined) put(root, 'docs/bible/lore.md', lore)
    const ctx = await ctxFor(root, { tools: tools?.(root) })
    ctx.loreIdsBefore = ['SL-01', 'SL-02', 'E-001']
    return await gateFn(ctx)
  } finally {
    cleanup(root)
  }
}
const ok = (r) => assert.equal(r.ok, true, r.failures.join('\n'))
const fails = (r, re) => {
  assert.equal(r.ok, false, `expected a failure matching ${re}`)
  assert.ok(r.failures.some((f) => re.test(f)), `no failure matching ${re}:\n${r.failures.join('\n')}`)
}

const WHISPER = `
chat: what Whisper (base.en) hears in each line, cut from the final mix  (3 s)
✓    0.5 larry    6/6  "This week, two people had a conversation."
                          heard: "This week, two people had a conversation."
~    2.0 ana      6/9  "concept: a talk show, but the host is a throat"
                          heard: "concept a talk show but the throat"
✗    4.1 bo       0/1  "claim."
                          heard: "flame"
✓    5.0 bot      2/2  "Built it."
                          heard: "Build it."

14/18 caption words heard (78%); weak lines: p2
`

test('parseWhisper reads rows, weak ids and the total', () => {
  const w = parseWhisper(WHISPER)
  assert.equal(w.lines.length, 4)
  assert.deepEqual(w.weak, ['p2'])
  assert.equal(w.heard, 14)
  assert.equal(w.lines[2].flag, '✗')
})

test('render.whisper: weak lines fail unless waived; "Built it." must be heard', async () => {
  const t = (out) => (root) => fakeTools(root, { whisper: true, whisperOut: { chat: out, 'cold-open': '' } })
  fails(await run(renderWhisper, {}, { tools: t(WHISPER) }), /chat p2: "claim\." was heard as "flame" \(0\/1\): Whisper heard under 60 %/)
  const waived = await run(renderWhisper, { 'production/intelligibility.json': { chat: { p2: 'claim. is the catchphrase; IPA /kleɪm/ is right' } } }, { tools: t(WHISPER) })
  ok(waived)
  assert.match(waived.warnings.join(' '), /waived: claim\./)
  fails(await run(renderWhisper, { 'production/intelligibility.json': { chat: { p2: 'x' } } }, { tools: t(WHISPER.replace('✓    5.0 bot      2/2', '~    5.0 bot      1/2')) }), /"Built it\." was not heard/)
  const skipped = await run(renderWhisper, {}, { tools: (root) => fakeTools(root, { whisper: false }) })
  assert.match(skipped.skipped, /not installed/)
})

test('render.lengths: within ten percent of the plan, under the ceiling', async () => {
  ok(await run(renderLengths))
  fails(await run(renderLengths, { 'segments/chat/cues.json': { id: 'chat', duration: 60 } }), /chat renders at 60\.0 s but the plan gives it 40 s/)
  fails(await run(renderLengths, { 'production/plan.json': plan({ segments: [{ id: 'cold-open', format: 'ask', seconds: 300 }, { id: 'chat', format: 'thread', seconds: 300 }] }), 'segments/cold-open/cues.json': { duration: 300 }, 'segments/chat/cues.json': { duration: 300 } }), /over the 330 s ceiling/)
})

test('render.check respects the exit code', async () => {
  ok(await run(renderCheck, {}, { tools: (root) => fakeTools(root) }))
  fails(await run(renderCheck, {}, { tools: (root) => ({ ...fakeTools(root), npm: () => ({ code: 1, out: 'FAIL chat  (no cues.json)' }) }) }), /FAIL chat/)
})

test('frameTimes: every cue, line id and music start, plus evenly spaced frames', () => {
  const t = frameTimes({ duration: 10, cues: { a: 1.234, b: 20 }, lines: [{ id: 'x', t0: 3, t1: 4 }], music: [{ t0: 5 }] }, { across: 3, max: 40 })
  assert.deepEqual(t, [1.23, 2.5, 3.4, 5, 5.5, 7.5])
})

test('parseShoot ignores GPU chatter and catches unknown cues, console errors and page errors', () => {
  const out = `/x/shots/e/s/s@1.png  (0.4 s)
   warning: [.WebGL-0x1]GL Driver Message (OpenGL, Performance): GPU stall due to ReadPixels
/x/shots/e/s/s@2.png  (0.4 s)
   warning: unknown cue "punch-in"
   pageerror: show.draw.nope is not a function
s @ 3: Timeout 90000ms exceeded`
  const r = parseShoot(out)
  assert.equal(r.frames.length, 2)
  assert.deepEqual(r.problems.map((p) => [p.t, p.kind]), [['2', 'warning'], ['2', 'pageerror'], ['3', 'failed']])
})

test('direct.frames fails an unknown cue and passes clean frames', async () => {
  ok(await run(directFrames, {}, { tools: (root) => fakeTools(root) }))
  fails(await run(directFrames, { 'segments/chat/index.js': files()['segments/chat/index.js'] + '// UNKNOWN_CUE\n' }, { tools: (root) => fakeTools(root) }), /chat @ .*: warning: unknown cue/)
})

test('direct.modules and direct.disclaimer (R9)', async () => {
  ok(await run(directModules))
  fails(await run(directModules, {}, { drop: ['segments/chat/index.js'] }), /chat\/index\.js is missing/)
  ok(await run(directDisclaimer))
  fails(await run(directDisclaimer, { 'segments/chat/index.js': "export default { guests: ['ana'] }\n" }), /first segment with a guest needs a disclaimer/)
  const none = await run(directDisclaimer, { 'segments/chat/script.js': SCRIPT_COLD.replace("'cold-open'", "'chat'"), 'segments/chat/index.js': 'export default {}\n' })
  assert.match(none.skipped, /no guest/)
})

test('direct.cards: a card shows its post verbatim (A2)', async () => {
  ok(await run(directCards))
  fails(await run(directCards, { 'segments/cold-open/index.js': "export default { f() { return 'Built it: https://golem.cy.test' } }\n" }), /card for .*c1 in cold-open does not show the post's text verbatim/)
})

test('build.thumbnail: a JPEG under a megabyte', async () => {
  fails(await run(buildThumbnail), /thumbnail\.jpg is missing/)
  ok(await run(buildThumbnail, { 'thumbnail.jpg': Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0]) }))
  fails(await run(buildThumbnail, { 'thumbnail.jpg': Buffer.from('PNG') }), /not a JPEG/)
})

const CARD = (over = {}) => {
  const rows = { A1: 'pass | No opted-out account appears anywhere; checked every file.', A2: 'pass | The golem card matches c1 word for word.', B1: '2 | Asked in the cold open and the thread, answered by a2.', B2: '1 | The thread lands; the cold open is flat.', B3: '2 | The song genre is new and the theme is the week.', ...over }
  return `# Scorecard\n\n## Step 0\n\n- cold-open: retell; turn\n- chat: retell; feeling\n\n## Part A\n\n| # | result | evidence |\n|---|---|---|\n${Object.entries(rows).filter(([k]) => k.startsWith('A')).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}\n\n## Part B\n\n| # | score | evidence |\n|---|---|---|\n${Object.entries(rows).filter(([k]) => k.startsWith('B')).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}\n`
}

test('self-check.scorecard reads its rows and approval rule from the bible', async () => {
  ok(await run(selfCheckScorecard, { 'production/scorecard.md': CARD() }))
  fails(await run(selfCheckScorecard), /scorecard\.md is missing/)
  fails(await run(selfCheckScorecard, { 'production/scorecard.md': CARD({ A2: 'fail | the card trims a word.' }) }), /A2 fails by the writer's own check/)
  fails(await run(selfCheckScorecard, { 'production/scorecard.md': CARD({ B3: '0 | the song is the same genre.' }) }), /B3 scores 0, which sends the episode back/)
  fails(await run(selfCheckScorecard, { 'production/scorecard.md': CARD({ B1: '1 | some point, not answered.', B2: '1 | flat in places, one laugh.', B3: '1 | one freshness warning unanswered.' }) }), /totals 3 of 6; approval needs 4/)
  fails(await run(selfCheckScorecard, { 'production/scorecard.md': CARD({ A2: 'pass | ok' }) }), /A2: give one sentence of evidence/)
  fails(await run(selfCheckScorecard, { 'production/scorecard.md': CARD({ B9: '2 | a row the bible does not have here.' }) }), /row B9, which the bible's scorecard does not/)
  fails(await run(selfCheckScorecard, { 'production/scorecard.md': CARD().replace('- chat: retell; feeling\n', '') }), /Step 0 does not list the segment chat/)
  assert.deepEqual([...parseScorecard('| **A1** | **Pass** | yes it is fine |').entries()], [['A1', { result: 'pass', evidence: 'yes it is fine' }]])
})

test('self-check.scorecard fails loudly when the bible\'s scorecard changes shape', async () => {
  const root = fakeRepo()
  try {
    makeEpisode(root, { files: { ...files(), 'production/scorecard.md': CARD() } })
    put(root, 'docs/bible/10-process.md', '# 10\n\n## The scorecard\n\nNo tables any more.\n')
    fails(await selfCheckScorecard(await ctxFor(root)), /changed shape/)
  } finally {
    cleanup(root)
  }
})

const LORE_002 = LORE.replace('| 001 | ask, monologue', '| 002 | ask, thread | — | — | Ana (thread; V), Bo (thread; V) | the throat | plain | "a man made of air" | credit | none |\n| 001 | ask, monologue') + '- **E-002 The Throat Show** (week 2026-W47).\n'

test('self-check.lore: the episode log entry and rotation log row are there, nothing deleted', async () => {
  ok(await run(selfCheckLore, {}, { lore: LORE_002 }))
  fails(await run(selfCheckLore, {}, { lore: LORE }), /no episode log entry \*\*E-002/)
  fails(await run(selfCheckLore, {}, { lore: LORE_002.replace('- **SL-02** Larry is a throat. (001)\n', '') }), /lost entries SL-02/)
  fails(await run(selfCheckLore, {}, { lore: LORE_002.replace(/\| 002 \|.*\n/, '') }), /rotation log .* has no row for 002/)
})

test('rotationLog parses the table into rows', () => {
  const r = rotationLog(LORE)
  assert.equal(r.rows.length, 1)
  assert.equal(r.rows[0].genre, 'stomp-clap anthem')
  assert.deepEqual(r.rows[0].guests, ['Ana'])
  assert.equal(r.rows[0].descriptor, 'a throat')
})

test('the bible readers understand the real bible (skipped outside the repository)', { skip: !existsSync(join(REPO, 'docs', 'bible', '10-process.md')) }, () => {
  const spec = scorecardSpec(REPO)
  assert.equal(spec.error, undefined, spec.error)
  assert.ok(spec.a.length >= 10 && spec.b.length >= 10 && spec.approveAt > 0 && spec.noZero.length)
  const tpl = pitchTemplateSections(REPO)
  assert.equal(tpl.error, undefined, tpl.error)
  assert.ok(tpl.sections.includes('Risks and open questions'))
  assert.ok(reviewerChecklist(REPO).items.length >= 5)
  const log = rotationLog(readFileSync(join(REPO, 'docs', 'bible', 'lore.md'), 'utf8'))
  assert.ok(log.rows.some((r) => r.ep === '001' && r.genre))
})
