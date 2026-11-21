// the gates after the scripts: render (intelligibility, heard text, lengths), stage (frames per
// segment, disclaimer, cards, unread text, credits), build and review (scorecard, ledger, verdict),
// and the bible readers
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { parseWhisper, renderCheck, renderHeard, renderLengths, renderWhisper } from '../src/gates/render.mjs'
import { directCards, directCredits, directDisclaimer, directFrames, directModules, directUnread, frameTimes, parseShoot, spokenShare } from '../src/gates/direct.mjs'
import { buildPreviewVerify, buildThumbnail, parseScorecard, reviewLedger, reviewScorecard, reviewVerdict } from '../src/gates/build.mjs'
import { reviewerChecklist, scorecardSpec, r3Tags } from '../src/bible.mjs'
import { REPO } from '../src/repo.mjs'
import { cleanup, ctxFor, fakeRepo, fakeTools, ID, makeEpisode, plan, POSTS, put, SCRIPT_CHAT, SCRIPT_COLD, SOURCES } from './helpers.mjs'

const cues = (id, duration, lines = []) => ({ id, duration, lines, cues: { a: 1 }, sfx: [], music: [] })
const L = (i, id, who, text) => ({ i, id, who, kind: 'say', caption: true, text, t0: i, t1: i + 0.8 })
const files = () => ({
  'production/plan.json': plan(),
  'production/sources.json': SOURCES,
  'segments/cold-open/script.js': SCRIPT_COLD,
  'segments/chat/script.js': SCRIPT_CHAT,
  'segments/cold-open/cues.json': cues('cold-open', 20.5, [L(0, 'hello', 'larry', 'Good evening.'), L(1, 'built', 'bot', 'built it: https://golem.cy.test')]),
  'segments/chat/cues.json': cues('chat', 41, [L(0, 'intro', 'larry', 'This week, two people had a conversation.'), L(1, 'p1', 'ana', 'concept: a talk show, but the host is a throat'), L(2, 'p2', 'bo', 'claim.')]),
  'segments/cold-open/index.js': "export default { shots: [{ at: 0, shot: 'desk' }], drawFront(ctx, t, show) { show.draw.skeetCard(ctx, { text: 'built it: https://golem.cy.test' }) } }\n",
  'segments/chat/index.js': `export default { guests: ['ana', 'bo'], disclaimer: { text: 'Performed verbatim from a public thread. Puppets play posting personas.', from: 0, dur: 6 }, drawFront(ctx, t, show) { show.draw.skeetCard(ctx, { text: 'concept: a talk show, but the host is a throat' }) } }\n`,
})
async function run(gateFn, over = {}, { tools, drop = [], onlySegment, setup } = {}) {
  const root = fakeRepo({ fullScorecard: true })
  try {
    const all = { ...files(), ...over }
    for (const d of drop) delete all[d]
    makeEpisode(root, { files: all })
    if (setup) setup(root)
    const ctx = await ctxFor(root, { tools: tools?.(root), onlySegment })
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
const whisperTools = (heard, extra = {}) => (root) => fakeTools(root, { whisper: true, heard, ...extra })

// ---------------------------------------------------------------- render

const WHISPER = `
chat: what Whisper (base.en) hears in each line, cut from the final mix  (3 s)
✓    0.5 larry    6/6  "This week, two people had a conversation."
                          heard: "This week, two people had a conversation."
~    2.0 ana      6/9  "concept: a talk show, but the host is a throat"
                          heard: "concept a talk show but the throat"
✗    4.1 bo       0/1  "claim."
                          heard: "flame"

12/16 caption words heard (75%); weak lines: p2
`

test('parseWhisper reads rows with what was heard, weak ids and the total', () => {
  const w = parseWhisper(WHISPER)
  assert.equal(w.lines.length, 3)
  assert.equal(w.lines[2].heard, 'flame')
  assert.deepEqual(w.weak, ['p2'])
  assert.equal(w.heard, 12)
})

test('render.whisper: a line under the mark is a warning for the owner\'s watch, never a failure (the ruling of 21 November 2026)', async () => {
  const t = (extra) => (root) => fakeTools(root, { whisper: true, whisperOut: { chat: WHISPER, 'cold-open': '' }, ...extra })
  const w = await run(renderWhisper, {}, { tools: t() })
  ok(w)
  assert.match(w.warnings.join('\n'), /for the owner's watch: chat p2 \(bo\): "claim\." was heard as "flame" \(0\/1\); the caption carries it/)
  // no waiver is needed, and an old one changes nothing
  ok(await run(renderWhisper, { 'production/intelligibility.json': { chat: { p2: 'it is fine' } } }, { tools: t() }))
  fails(await run(renderWhisper, {}, { tools: (root) => ({ ...fakeTools(root, { whisper: true }), bun: () => ({ code: 3, out: '' }) }) }), /the Whisper pass on chat exited 3/)
  assert.match((await run(renderWhisper, {}, { tools: (root) => fakeTools(root, { whisper: false }) })).skipped, /not installed/)
})

test('render.heard: an alarming term heard fails with no waiver, whatever the score (finding 51)', async () => {
  fails(await run(renderHeard, {}, { tools: whisperTools({ chat: { intro: 'Last week, Auschwitz said' } }) }), /chat intro \(larry, [\d.]+ s\): heard "Last week, Auschwitz said", which contains "auschwitz"\. No waiver/)
  ok(await run(renderHeard, {}, { tools: whisperTools({}) }))
  fails(await run(renderHeard, { 'production/heard-waivers.json': { chat: { intro: { heard: 'Last week, Auschwitz said', judgement: 'surely fine, says the writer' } } } }, { tools: whisperTools({ chat: { intro: 'Last week, Auschwitz said' } }) }), /No waiver/)
})

test('render.heard: an out-of-bounds subject heard fails until a waiver quotes the heard text exactly', async () => {
  const heard = { chat: { intro: 'This week, two people had a funeral.' } }
  fails(await run(renderHeard, {}, { tools: whisperTools(heard) }), /touches an out-of-bounds subject \("funeral"\)/)
  ok(await run(renderHeard, { 'production/heard-waivers.json': { chat: { intro: { heard: 'This week, two people had a funeral.', judgement: 'a mishearing of conversation, plainly harmless in context' } } } }, { tools: whisperTools(heard) }))
  const stale = await run(renderHeard, { 'production/heard-waivers.json': { chat: { intro: { heard: 'something else', judgement: 'an older mishearing, judged harmless' } } } }, { tools: whisperTools(heard) })
  fails(stale, /out-of-bounds/)
  assert.match(stale.warnings.join(' '), /the waiver no longer applies/)
})

test('render.heard: a real name in the caption heard as something else is a warning, with no waiver needed', async () => {
  const over = { 'segments/chat/cues.json': cues('chat', 41, [L(0, 'intro', 'larry', 'Ana posted this on Tuesday.')]) }
  const r = await run(renderHeard, over, { tools: whisperTools({ chat: { intro: 'Anna posted this on Tuesday.' } }) })
  ok(r)
  assert.match(r.warnings.join('\n'), /for the owner's watch: chat intro \(larry, [\d.]+ s\): the caption names ana, heard as "Anna posted this on Tuesday\."; the caption carries it/)
  // the alarming check still fails on the same line
  fails(await run(renderHeard, over, { tools: whisperTools({ chat: { intro: 'Anna posted about a genocide.' } }) }), /contains "genocide"\. No waiver/)
})

test('render.lengths: under the ceiling (a segment off its estimate is only a warning)', async () => {
  const r = await run(renderLengths, { 'segments/chat/cues.json': cues('chat', 60) })
  ok(r)
  assert.match(r.warnings.join(' '), /chat renders at 60\.0 s; the draft estimated 40 s/)
  fails(await run(renderLengths, { 'segments/cold-open/cues.json': cues('cold-open', 300), 'segments/chat/cues.json': cues('chat', 300) }), /over the 590 s ceiling/)
})

test('render.check respects the exit code', async () => {
  ok(await run(renderCheck, {}, { tools: (root) => fakeTools(root) }))
  fails(await run(renderCheck, {}, { tools: (root) => ({ ...fakeTools(root), npm: () => ({ code: 1, out: 'FAIL chat  (no cues.json)' }) }) }), /FAIL chat/)
})

// ---------------------------------------------------------------- stage

test('frameTimes and parseShoot', () => {
  assert.deepEqual(frameTimes({ duration: 10, cues: { a: 1.234, b: 20 }, lines: [{ id: 'x', t0: 3, t1: 4 }], music: [{ t0: 5 }] }, { across: 3, max: 40 }), [1.23, 2.5, 3.4, 5, 5.5, 7.5])
  const r = parseShoot('/x/s@1.png  (0.4 s)\n   warning: [.WebGL-0x1]GL Driver Message: GPU stall\n/x/s@2.png  (0.4 s)\n   warning: unknown cue "punch-in"\n   pageerror: boom\ns @ 3: Timeout')
  assert.deepEqual(r.problems.map((p) => [p.t, p.kind]), [['2', 'warning'], ['2', 'pageerror'], ['3', 'failed']])
})

test('stage.frames: clean frames pass; an unknown cue fails; --segment shoots one segment only (finding 29)', async () => {
  ok(await run(directFrames, {}, { tools: (root) => fakeTools(root) }))
  fails(await run(directFrames, { 'segments/chat/index.js': files()['segments/chat/index.js'] + '// UNKNOWN_CUE\n' }, { tools: (root) => fakeTools(root) }), /chat @ .*: warning: unknown cue/)
  let calls
  await run(directFrames, {}, { tools: (root) => { const t = fakeTools(root); calls = t.calls; return t }, onlySegment: 'chat' })
  assert.deepEqual(calls.filter((c) => c[0] === 'shoot').map((c) => c[2]), ['chat'])
})

test('stage.modules and stage.disclaimer', async () => {
  ok(await run(directModules))
  fails(await run(directModules, {}, { drop: ['segments/chat/index.js'] }), /chat\/index\.js is missing/)
  ok(await run(directDisclaimer))
  fails(await run(directDisclaimer, { 'segments/chat/index.js': "export default { guests: ['ana'] }\n" }), /first segment with a guest needs a disclaimer/)
})

test('stage.cards: every post shown or performed is exact, on a card or in a puppet\'s mouth (findings 40 and 27)', async () => {
  ok(await run(directCards))
  fails(await run(directCards, { 'segments/cold-open/index.js': "export default { f() { return 'Built it: https://golem.cy.test' } }\n" }), /the card post .*c1 in cold-open is not shown with its exact text/)
  fails(await run(directCards, { 'segments/chat/index.js': `export default { guests: ['ana'], disclaimer: 'x' }\n`, 'segments/chat/script.js': SCRIPT_CHAT.replaceAll('the host is a throat', 'the host is a neck') }), /the thread post .* in chat is not shown with its exact text/)
  // a performed post whose card on screen is not exact fails, though the puppet says it exactly
  fails(await run(directCards, { 'segments/chat/index.js': "export default { guests: ['ana'], disclaimer: 'x', card: 'concept: a talk show … but the host is a throat' }\n" }), /segments\/chat\/index\.js:1: "concept: a talk show … but the host is a throat" shows .*a1 but not exactly/)
})

test('stage.unread: on-screen text longer than a glance must be spoken; the disclaimer is exempt', async () => {
  assert.equal(spokenShare('the host is a throat', 'concept: a talk show, but the host is a throat'), 1)
  assert.ok(spokenShare('one two three', 'three') < 0.5)
  ok(await run(directUnread))
  fails(await run(directUnread, { 'segments/chat/index.js': `export default { guests: ['ana'], disclaimer: { text: 'Performed verbatim from a public thread. Puppets play posting personas.' }, drawFront(ctx, t, show) { show.draw.label(ctx, 'AND HERE IS A LONG PARAGRAPH NOBODY ON THE SHOW EVER READS ALOUD', 0, 0) } }\n` }), /segments\/chat\/index\.js:1: "AND HERE IS A LONG PARAGRAPH NOBODY ON THE SHOW EVER READS ALOUD" \(13 words\) is on screen but only 15 % of it is spoken in the segment/)
  ok(await run(directUnread, { 'segments/chat/index.js': `export default { drawFront(ctx, t, show) { show.draw.label(ctx, 'SHORT TAG', 0, 0) } }\n` }))
})

test('stage.credits: the end card names the personas played, with handles, and says every voice is synthesized (finding 52)', async () => {
  const r = await run(directCredits, {}, { tools: (root) => fakeTools(root) })
  ok(r)
  assert.match(r.warnings.join(' '), /credits: @ana\.test, @bo\.test/)
  const noLine = (root) => ({ ...fakeTools(root), exec: () => ({ code: 0, out: '', stdout: JSON.stringify([{ head: 'Puppets played the' }, { head: 'posting personas of' }, ['ana', '@ana.test'], ['bo', '@bo.test']]) }) })
  fails(await run(directCredits, {}, { tools: noLine }), /does not say that every voice is synthesized/)
  const noBo = (root) => ({ ...fakeTools(root), exec: () => ({ code: 0, out: '', stdout: JSON.stringify([{ head: 'posting personas of' }, ['ana', '@ana.test'], 'Every voice in this programme', 'is synthesized by CHIMERA.']) }) })
  fails(await run(directCredits, {}, { tools: noBo }), /does not credit @bo\.test, whose persona bo played/)
  let calls
  await run(directCredits, {}, { tools: (root) => { const t = fakeTools(root); calls = t.calls; return t } })
  assert.ok(calls.some((c) => c[0] === 'shoot' && c[2] === 'end'), 'the end card is shot')
})

// ---------------------------------------------------------------- build and review

test('build.thumbnail and build.preview-verify', async () => {
  fails(await run(buildThumbnail), /thumbnail\.jpg is missing/)
  ok(await run(buildThumbnail, { 'thumbnail.jpg': Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0]) }))
  fails(await run(buildPreviewVerify), /preview\/002-2026-w47\/episode\.json is missing/)
  const r = await run(buildPreviewVerify, {}, { setup: (root) => put(root, `preview/${ID}/episode.json`, { build: { sourceHash: 'x' } }) })
  assert.match(r.skipped ?? '', /hash\.mjs is not here/)
})

const CARD = (over = {}) => {
  const rows = { ...Object.fromEntries(Array.from({ length: 12 }, (_, k) => [`A${k + 1}`, 'pass | Fixture evidence: checked every frame and line.'])), ...Object.fromEntries(Array.from({ length: 12 }, (_, k) => [`B${k + 1}`, '2 | Fixture evidence: checked every frame and line.'])), ...over }
  return `# Scorecard\n\n## Step 0\n\n- cold-open: retell\n- chat: retell\n\n## Part A\n\n| # | result | evidence |\n|---|---|---|\n${Object.entries(rows).filter(([k]) => k.startsWith('A')).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}\n\n## Part B\n\n| # | score | evidence |\n|---|---|---|\n${Object.entries(rows).filter(([k]) => k.startsWith('B')).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}\n`
}

test('review.scorecard: complete, and the verdict follows the card; a send-back with a failing card is valid (finding 55)', async () => {
  ok(await run(reviewScorecard, { 'production/scorecard.md': CARD(), 'production/review.json': { verdict: 'approve' } }))
  fails(await run(reviewScorecard, { 'production/scorecard.md': CARD({ A2: 'fail | the card trims a word that changes it.' }), 'production/review.json': { verdict: 'approve' } }), /review\.json approves, but the scorecard does not \(Part A fails: A2\)/)
  ok(await run(reviewScorecard, { 'production/scorecard.md': CARD({ A2: 'fail | the card trims a word that changes it.' }), 'production/review.json': { verdict: 'send-back', route: 'stage' } }))
  fails(await run(reviewScorecard, { 'production/scorecard.md': CARD({ B9: undefined }).replace('| B9 | undefined |\n', ''), 'production/review.json': { verdict: 'send-back' } }), /no row B9/)
  fails(await run(reviewScorecard, { 'production/scorecard.md': CARD().replace('- chat: retell\n', '') }), /Step 0 does not list the segment chat/)
  assert.deepEqual([...parseScorecard('| **A1** | **Pass** | yes it is fine |').entries()], [['A1', { result: 'pass', evidence: 'yes it is fine' }]])
})

test('review.verdict: approve passes; send-back routes; an unknown route fails', async () => {
  ok(await run((c) => reviewVerdict(c), { 'production/review.json': { verdict: 'approve' } }))
  const r = await run((c) => reviewVerdict(c), { 'production/review.json': { verdict: 'send-back', route: 'assemble', reasons: ['a reviewer\'s reason'], changes: ['talk-ask calm: say it so "repost" cannot be heard as "report"'] } })
  assert.equal(r.sentBack.route, 'assemble')
  assert.match(r.sentBack.file, /production\/review\.json$/)
  assert.ok(!r.sentBack.reason.includes("a reviewer's reason"), 'state.json carries no reviewer prose')
  fails(await run((c) => reviewVerdict(c), { 'production/review.json': { verdict: 'send-back', route: 'pitch', changes: ['x'] } }), /names the stage that can fix it/)
  fails(await run((c) => reviewVerdict(c), { 'production/review.json': { verdict: 'send-back', route: 'assemble' } }), /lists in "changes"/)
})

const LEDGER = { id: ID, aired: false, guests: [{ did: 'did:plc:ana', handle: 'ana.test' }, { did: 'did:plc:bo', handle: 'bo.test' }], featured: [{ did: 'did:plc:ana', handle: 'ana.test' }, { did: 'did:plc:bo', handle: 'bo.test' }, { did: 'did:plc:cy', handle: 'cy.test' }], formats: ['thread'], song: null, runners: [], catchphrases: [], devices: [] }
const TRACKER = { 'did:plc:ana': { handle: 'ana.test', appearances: [{ episode: ID, date: '2026-11-20', role: 'spoke' }] }, 'did:plc:bo': { handle: 'bo.test', appearances: [{ episode: '001-pilot', date: '2026-11-13', role: 'spoke' }, { episode: ID, date: '2026-11-20', role: 'spoke' }] }, 'did:plc:cy': { handle: 'cy.test', appearances: [{ episode: ID, date: '2026-11-20', role: 'shown' }] } }
const withLedger = (ledger, tracker) => (root) => {
  if (ledger) put(root, `docs/ledger/${ID}.json`, ledger)
  put(root, `docs/ledger/${ID}.md`, '# 002\n')
  if (tracker) put(root, 'docs/ledger/featured.json', tracker)
}

test('review.ledger: the ledger entry and the tracker agree with the screen, by DID', async () => {
  ok(await run(reviewLedger, {}, { setup: withLedger(LEDGER, TRACKER) }))
  fails(await run(reviewLedger, {}, { setup: withLedger(null, TRACKER) }), /002-2026-w47\.json is missing/)
  fails(await run(reviewLedger, {}, { setup: withLedger({ ...LEDGER, guests: LEDGER.guests.slice(0, 1) }, TRACKER) }), /"guests" is missing did:plc:bo/)
  fails(await run(reviewLedger, {}, { setup: withLedger({ ...LEDGER, guests: ['ana.test', 'bo.test'] }, TRACKER) }), /every entry in "guests" needs its "did"/)
  fails(await run(reviewLedger, {}, { setup: withLedger({ ...LEDGER, featured: LEDGER.featured.slice(0, 2) }, TRACKER) }), /"featured" is missing did:plc:cy/)
  const noCy = { ...TRACKER, 'did:plc:cy': { handle: 'cy.test', appearances: [] } }
  fails(await run(reviewLedger, {}, { setup: withLedger(LEDGER, noCy) }), /tracker \(featured\.json\) has no appearance \{ "episode": "002-2026-w47", "role": "shown" \} for did:plc:cy/)
  const extra = { ...TRACKER, 'did:plc:zz': { handle: 'zz.test', appearances: [{ episode: ID, role: 'shown' }] } }
  fails(await run(reviewLedger, {}, { setup: withLedger(LEDGER, extra) }), /lists zz\.test in 002-2026-w47, who is not on screen/)
})

// ---------------------------------------------------------------- the bible

test('the bible readers understand the real bible (skipped outside the repository)', { skip: !existsSync(join(REPO, 'docs', 'bible', '10-process.md')) }, () => {
  const BIBLE = join(REPO, 'docs', 'bible')
  const spec = scorecardSpec(BIBLE)
  assert.equal(spec.error, undefined, spec.error)
  // chapter 10 today: Step 0, gates A1 to A16, rows B1 to B13 (26 possible), approve at 18 with no 0 in six rows
  assert.equal(spec.step0, true)
  assert.deepEqual(spec.a, Array.from({ length: 16 }, (_, k) => `A${k + 1}`))
  assert.deepEqual(spec.b, Array.from({ length: 13 }, (_, k) => `B${k + 1}`))
  assert.equal(spec.maxB, 26)
  assert.equal(spec.approveAt, 18)
  assert.deepEqual(spec.noZero, ['B1', 'B2', 'B7', 'B8', 'B11', 'B12'])
  assert.ok(reviewerChecklist(BIBLE).items.length >= 5)
  assert.ok(r3Tags(BIBLE).tags.includes('verbatim'))
})
