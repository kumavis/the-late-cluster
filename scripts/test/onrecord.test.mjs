// The gates on record (scripts/lib/onrecord.mjs) and the build's use of it: a published build is
// refused when a rundown segment has no script repetition verdicts from two reviewers on record, a
// line written at assembly has no verdicts of its own, or a real account airs that no passing consent
// refresh covered (episode 002: two segments joined after select and skipped both). A preview warns.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { onRecordFindings, onRecordReport, PREDATES_GATE_RECORDS } from '../lib/onrecord.mjs'
import { buildEpisode } from '../lib/build.mjs'
import { resolveEpisode } from '../lib/episodes.mjs'
import { tempRoot, addEpisode, fakeBundle } from './fixture.mjs'

const DID = 'did:plc:fixtureguest0000000000000'
const POST = `at://${DID}/app.bsky.feed.post/3fixturepost1`
const PARENT = `at://did:plc:fixturehost00000000000000/app.bsky.feed.post/3fixtureask01`
const TEXT = 'the plotter ran out of pen at reply eighty-eight'
const OPEN = 'Good evening, and welcome to the cluster.'
const lineVersion = (t) => createHash('sha256').update(String(t)).digest('hex').slice(0, 12)

const CAST = `export const CAST = {\n  guest: { name: 'Guest', handle: '@guest.bsky.social', guest: true },\n}\n`
const SCRIPT = (extra = '') => `export default {
  id: 'talk',
  beats: [${extra}
    { say: 'larry', id: 'ask', text: 'How did it go?' },
    { say: 'guest', id: 'answer', text: '${TEXT}' }, // verbatim: ${POST} · context: ${PARENT}
  ],
}
`
const SOURCES = {
  format: 'late-cluster-sources/1',
  week: '2026-W47',
  accounts: [{ handle: 'guest.bsky.social', did: DID, role: 'guest', cast: 'guest' }],
  posts: [{ uri: POST, author: 'guest.bsky.social', text: TEXT, use: 'line', segment: 'talk' }],
  lines: [{ segment: 'talk', line: 'answer', kind: 'verbatim', post: POST, context: PARENT, contextText: 'How did it go?', setup: { line: 'ask', who: 'larry', text: 'How did it go?' } }],
}
const verdicts = (id, reviewers, verdict = 'fresh', version = 'abc123abc123') => ({ id, version, verdicts: reviewers.map((reviewer) => ({ reviewer, round: 1, verdict })), verdict })
const BOTH = ['reviewer-1', 'reviewer-2']

/** a published episode whose one segment was a draft, with every record the gates leave */
function fixture({ id = '003-fixture', status = 'published', scriptReviewers = BOTH, scriptVerdict = 'fresh', covered = true, roundSelection = 'sel000000001', records = true, rundown = ['talk'] } = {}) {
  const fx = tempRoot()
  addEpisode(fx, id, { status, rundown })
  const at = (rel, data) => fx.put(`episodes/${id}/${rel}`, typeof data === 'string' ? data : JSON.stringify(data, null, 2))
  at('cast.js', CAST)
  at('segments/talk/script.js', SCRIPT())
  at('production/sources.json', SOURCES)
  if (records) {
    at('production/drafts/talk/script.js', SCRIPT())
    at('production/assemble/drafts.json', { talk: { ask: 'How did it go?', answer: TEXT } })
    at('production/review/repetition-scripts.json', { verdicts: { talk: verdicts('talk', scriptReviewers, scriptVerdict) }, pairs: [] })
    at('production/select/sources.json', { ...SOURCES, selection: 'sel000000001', accounts: covered ? SOURCES.accounts : [] })
    at('production/review/consent/r1.json', { selection: roundSelection, verdict: 'pass', out: [], notes: [], reason: 'fixture' })
  }
  return { fx, at }
}
const ep = (fx, id = '003-fixture') => resolveEpisode(id, { root: fx.root })
const messages = async (fx, id) => (await onRecordFindings(ep(fx, id))).findings.map((f) => f.message)

test('every gate on record: the published build goes ahead', async () => {
  const { fx } = fixture()
  try {
    assert.deepEqual(await messages(fx), [])
    const r = await buildEpisode(ep(fx), { bundle: fakeBundle })
    assert.ok(!r.warnings.some((w) => /on record/.test(w)), r.warnings.join('\n'))
    assert.ok(existsSync(join(fx.root, 'dist/episodes/003-fixture/index.html')))
  } finally {
    fx.cleanup()
  }
})

test("a rundown segment with one reviewer's script verdict refuses a published build, and a repeat on record does too", async () => {
  const { fx } = fixture({ scriptReviewers: ['reviewer-1'] })
  try {
    assert.deepEqual(await messages(fx), ['talk: the script repetition gate has verdicts from 1 reviewer on record (production/review/repetition-scripts.json); it needs 2'])
    await assert.rejects(buildEpisode(ep(fx), { bundle: fakeBundle }), /cannot build 003-fixture:\n {2}not on record: talk: the script repetition gate has verdicts from 1 reviewer/)
    assert.equal(existsSync(join(fx.root, 'dist/episodes/003-fixture/index.html')), false)
  } finally {
    fx.cleanup()
  }
  const repeat = fixture({ scriptVerdict: 'repeat' })
  try {
    assert.deepEqual(await messages(repeat.fx), ['talk: the script repetition gate\'s verdict on record is "repeat"'])
  } finally {
    repeat.fx.cleanup()
  }
  const none = fixture({ records: false })
  try {
    const m = await messages(none.fx)
    assert.ok(m.some((x) => /talk: the line ask \(the segment was written at assembly\) has verdicts from 0 reviewers/.test(x)), m.join('\n'))
    assert.ok(m.some((x) => /guest\.bsky\.social airs in it, and no consent refresh on record passed/.test(x)), m.join('\n'))
  } finally {
    none.fx.cleanup()
  }
})

test('a real account that airs and that the consent refresh did not cover refuses a published build', async () => {
  const { fx } = fixture({ covered: false })
  try {
    assert.deepEqual(await messages(fx), ['talk: guest.bsky.social airs in it, and no consent refresh on record covered it (production/review/consent/r1.json); an account first shown at assembly gets its own round there (assemble.consent-r<n>)'])
    await assert.rejects(buildEpisode(ep(fx), { bundle: fakeBundle }), /not on record: talk: guest\.bsky\.social airs in it/)
  } finally {
    fx.cleanup()
  }
  // a passing round for another selection covers nothing
  const other = fixture({ roundSelection: 'sel000000002' })
  try {
    assert.deepEqual(await messages(other.fx), ['talk: guest.bsky.social airs in it, and no consent refresh on record passed for the source list it was run on (production/review/consent/ with production/select/sources.json, or production/review/consent-assembly/ with production/assemble/consent-sources-r<n>.json)'])
  } finally {
    other.fx.cleanup()
  }
})

test('the open, the close and the joins: each line written at assembly needs its own two verdicts on its current words', async () => {
  const { fx, at } = fixture({ rundown: ['open', 'talk'] })
  try {
    at('segments/open/script.js', `export default { id: 'open', beats: [{ say: 'larry', id: 'hello', text: '${OPEN}' }] }\n`)
    at('segments/talk/script.js', SCRIPT(`\n    { say: 'sibyl', id: 'join', text: 'And now, a reply.' },`))
    let m = await messages(fx)
    assert.ok(m.includes('open: the line hello (the segment was written at assembly) has verdicts from 0 reviewers on its current words on record (production/review/repetition-assembly.json); it needs 2'), m.join('\n'))
    assert.ok(m.includes('talk: the line join added or changed at assembly has verdicts from 0 reviewers on its current words on record (production/review/repetition-assembly.json); it needs 2'), m.join('\n'))
    assert.ok(!m.some((x) => /^open: the script repetition gate/.test(x)), 'a segment written at assembly has no script verdict to give')
    at('production/review/repetition-assembly.json', { verdicts: { 'open:hello': verdicts('open:hello', BOTH, 'fresh', lineVersion(OPEN)), 'talk:join': verdicts('talk:join', BOTH, 'fresh', lineVersion('And now, a reply.')) } })
    assert.deepEqual(await messages(fx), [])
    // the words changed after the verdicts: not on record
    at('segments/open/script.js', `export default { id: 'open', beats: [{ say: 'larry', id: 'hello', text: 'Good evening.' }] }\n`)
    m = await messages(fx)
    assert.deepEqual(m, ['open: the line hello (the segment was written at assembly) has verdicts from 0 reviewers on its current words on record (production/review/repetition-assembly.json); it needs 2'])
  } finally {
    fx.cleanup()
  }
})

test('a preview build warns and carries on', async () => {
  const { fx } = fixture({ status: 'draft', scriptReviewers: ['reviewer-1'], covered: false })
  try {
    const r = await buildEpisode(ep(fx), { preview: true, bundle: fakeBundle })
    assert.ok(r.warnings.includes('not on record: talk: the script repetition gate has verdicts from 1 reviewer on record (production/review/repetition-scripts.json); it needs 2'), r.warnings.join('\n'))
    assert.ok(r.warnings.some((w) => /^not on record: talk: guest\.bsky\.social airs in it/.test(w)))
    assert.ok(existsSync(join(fx.root, 'preview/003-fixture/index.html')))
  } finally {
    fx.cleanup()
  }
})

test('the two episodes that aired before the rule are exempt by id, and the list is closed', async () => {
  const PILOT = ['001', 'pilot'].join('-')
  const TWO = ['002', '2026', 'w47'].join('-')
  assert.deepEqual([...PREDATES_GATE_RECORDS].sort(), [PILOT, TWO])
  for (const id of [PILOT, TWO]) {
    const { fx } = fixture({ id, records: false })
    try {
      const r = await buildEpisode(ep(fx, id), { bundle: fakeBundle })
      const skip = r.warnings.filter((w) => /gates-on-record/.test(w))
      assert.deepEqual(skip, [`gates-on-record check skipped: ${id} aired before it (PREDATES_GATE_RECORDS in scripts/lib/onrecord.mjs)`])
      assert.ok(existsSync(join(fx.root, 'dist/episodes', id, 'index.html')))
      // npm run on-record still reports, under a first line saying the build does not enforce it
      const rep = await onRecordReport(ep(fx, id))
      assert.match(rep.out[0], new RegExp(`^${id} aired before the gates were checked on record: the build does not enforce these findings`))
      assert.equal(rep.code, 1)
    } finally {
      fx.cleanup()
    }
  }
  // any other episode is checked
  const { fx } = fixture({ id: '004-later', records: false })
  try {
    await assert.rejects(buildEpisode(ep(fx, '004-later'), { bundle: fakeBundle }), /not on record/)
  } finally {
    fx.cleanup()
  }
})

test("an account first shown at assembly is covered by assembly's own consent round", async () => {
  const { fx, at } = fixture({ covered: false })
  try {
    assert.equal((await messages(fx)).length, 1)
    at('production/assemble/consent-sources-r1.json', { format: 'late-cluster-sources/1', selection: 'asm000000001', accounts: SOURCES.accounts, posts: SOURCES.posts })
    at('production/review/consent-assembly/r1.json', { selection: 'asm000000001', verdict: 'out', out: [{ account: 'guest.bsky.social', stop: 'asked the show' }] })
    assert.equal((await messages(fx)).length, 1, 'an out covers nothing')
    at('production/review/consent-assembly/r1.json', { selection: 'asm000000001', verdict: 'pass', out: [] })
    assert.deepEqual(await messages(fx), [])
    await buildEpisode(ep(fx), { bundle: fakeBundle })
  } finally {
    fx.cleanup()
  }
})
