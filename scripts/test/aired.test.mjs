// The sources check (scripts/lib/aired.mjs) and the build's use of it: anything from a real account
// that airs needs a record in production/sources.json (episode 002's close-out: two performed posts
// had been dropped from sources.json while their lines stayed in the script).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { airedFindings, airedReport, cardsIn, PREDATES_SOURCES } from '../lib/aired.mjs'
import { buildEpisode } from '../lib/build.mjs'
import { resolveEpisode } from '../lib/episodes.mjs'
import { tempRoot, addEpisode, fakeBundle } from './fixture.mjs'

const DID = 'did:plc:fixtureguest0000000000000'
const POST = `at://${DID}/app.bsky.feed.post/3fixturepost1`
const PARENT = `at://did:plc:fixturehost00000000000000/app.bsky.feed.post/3fixtureask01`
const TEXT = 'the plotter ran out of pen at reply eighty-eight'

const CAST = `export const CAST = {\n  guest: { name: 'Guest', handle: '@guest.bsky.social', guest: true },\n}\n`
const SCRIPT = `export default {
  id: 'talk',
  beats: [
    { say: 'larry', id: 'ask', text: 'How did it go?' },
    { say: 'guest', id: 'answer', text: '${TEXT}' }, // verbatim: ${POST} · context: ${PARENT}
  ],
}
`
const INDEX = `const CARD = { name: 'Guest', handle: 'guest.bsky.social', date: '14 Nov', text: '${TEXT}', replies: 1, reposts: 0, likes: 4 }
export default { guests: ['guest'] }
`
const SOURCES = (withRecords) => JSON.stringify({
  format: 'late-cluster-sources/1',
  week: '2026-W47',
  accounts: [{ handle: 'guest.bsky.social', did: DID, role: 'guest', cast: 'guest' }],
  posts: withRecords ? [{ uri: POST, author: 'guest.bsky.social', text: TEXT, use: 'line', segment: 'talk' }] : [],
  lines: withRecords ? [{ segment: 'talk', line: 'answer', kind: 'verbatim', post: POST, context: PARENT, contextText: 'How did it go?', setup: { line: 'ask', who: 'larry', text: 'How did it go?' } }] : [],
}, null, 2)

function fixture({ status = 'published', records = false, id = '003-fixture', sources = true } = {}) {
  const fx = tempRoot()
  addEpisode(fx, id, { status, rundown: ['talk'] })
  fx.put(`episodes/${id}/cast.js`, CAST)
  fx.put(`episodes/${id}/segments/talk/script.js`, SCRIPT)
  fx.put(`episodes/${id}/segments/talk/index.js`, INDEX)
  if (sources) fx.put(`episodes/${id}/production/sources.json`, SOURCES(records))
  return fx
}
const ep = (fx, id = '003-fixture') => resolveEpisode(id, { root: fx.root })
const PILOT = ['001', 'pilot'].join('-')

test('a tagged line whose post has no record is a finding that names the segment, file, line and post', async () => {
  const fx = fixture()
  try {
    const { findings } = await airedFindings(ep(fx))
    const line = findings.find((f) => f.what === 'line' && f.ref === POST)
    assert.ok(line, findings.map((f) => f.message).join('\n'))
    assert.equal(line.seg, 'talk')
    assert.equal(line.file, 'script.js')
    assert.equal(line.line, 5)
    assert.match(line.message, /^segments\/talk\/script\.js:5: .*3fixturepost1.*not in sources\.json "posts"/)
    // the guest's line has no "lines" record, and its card shows a post with no record
    assert.ok(findings.some((f) => f.what === 'line' && /"lines" has no record for segment talk, line answer/.test(f.message)))
    assert.ok(findings.some((f) => f.what === 'card' && f.file === 'index.js' && f.line === 1 && f.ref === 'guest.bsky.social'))
  } finally {
    fx.cleanup()
  }
})

test('the same episode with its records passes', async () => {
  const fx = fixture({ records: true })
  try {
    const { findings, notes } = await airedFindings(ep(fx))
    assert.deepEqual(findings, [])
    assert.deepEqual(notes, [])
  } finally {
    fx.cleanup()
  }
})

test('a real account that speaks or appears with no "accounts" entry is a finding', async () => {
  const fx = fixture({ records: true })
  try {
    const s = JSON.parse(SOURCES(true))
    s.accounts = []
    fx.put('episodes/003-fixture/production/sources.json', JSON.stringify(s))
    const { findings } = await airedFindings(ep(fx))
    const acc = findings.filter((f) => f.what === 'account')
    assert.equal(acc.length, 1)
    assert.match(acc[0].message, /^segments\/talk\/script\.js:5: guest\.bsky\.social airs \(guest speaks\)/)
  } finally {
    fx.cleanup()
  }
})

test('a published build refuses on a finding and leaves no build behind', async () => {
  const fx = fixture()
  try {
    await assert.rejects(buildEpisode(ep(fx), { bundle: fakeBundle }), /no record in sources\.json: segments\/talk\/script\.js:5/)
    assert.equal(existsSync(join(fx.root, 'dist/episodes/003-fixture/index.html')), false)
  } finally {
    fx.cleanup()
  }
})

test('a preview build warns on a finding and carries on', async () => {
  const fx = fixture({ status: 'draft' })
  try {
    const r = await buildEpisode(ep(fx), { preview: true, bundle: fakeBundle })
    assert.ok(r.warnings.some((w) => /^no record in sources\.json: segments\/talk\/script\.js:5: .*3fixturepost1/.test(w)), r.warnings.join('\n'))
    assert.equal(existsSync(join(fx.root, 'preview/003-fixture/index.html')), true)
  } finally {
    fx.cleanup()
  }
})

test('cards: literals, top-level consts, spreads and a link row are read; draw calls are not cards', () => {
  const src = `const T = 'hello there'
const WHO = { name: 'A', handle: 'a.bsky.social' }
const CARDS = {
  one: { ...WHO, text: T, link: 'a.example', likes: 1 },
  two: { handle: 'b.bsky.social', text: 'plain', counts: { likes: 2 } },
  three: { handle: 'c.bsky.social', text: \`made \${n} things\`, likes: 3 },
}
draw(ctx, { handle: c.handle, text: c.text, likes: c.likes })
const caption = { text: 'not a card' }
`
  const cards = cardsIn(src)
  assert.deepEqual(cards.map((c) => [c.handle, c.text ?? null, Boolean(c.unreadable)]), [
    ['a.bsky.social', 'hello there\n\na.example', false],
    ['b.bsky.social', 'plain', false],
    ['c.bsky.social', null, true],
  ])
})

test('the pilot predates sources.json: its build skips the check and says so in one line', async () => {
  assert.deepEqual([...PREDATES_SOURCES], [PILOT])
  const fx = fixture({ id: PILOT, sources: false })
  try {
    const r = await buildEpisode(ep(fx, PILOT), { bundle: fakeBundle })
    const lines = r.warnings.filter((w) => /sources/.test(w))
    assert.equal(lines.length, 1)
    assert.match(lines[0], new RegExp(`^sources check skipped: ${PILOT} predates production/sources\\.json`))
    assert.equal(existsSync(join(fx.root, 'dist', 'episodes', PILOT, 'index.html')), true)
  } finally {
    fx.cleanup()
  }
})

test('npm run aired on the pilot still reports its findings, after a line saying the build does not enforce them', async () => {
  const fx = fixture({ id: PILOT, sources: false })
  const other = fixture()
  try {
    const r = await airedReport(ep(fx, PILOT))
    assert.match(r.out[0], new RegExp(`^${PILOT} predates production/sources\\.json: the build does not enforce these findings`))
    assert.ok(r.out.some((l) => /^✗ segments\/talk\/script\.js:5: .*3fixturepost1/.test(l)), r.out.join('\n'))
    assert.equal(r.code, 1)
    // any other episode gets no such line
    assert.match((await airedReport(ep(other))).out[0], /^✗ /)
  } finally {
    fx.cleanup()
    other.cleanup()
  }
})

test("an invented guest's (.example) performed posts are fiction, as its cards are; a house character's tagged line is not", async () => {
  const fx = fixture({ records: true })
  try {
    const FAKE = 'at://did:plc:inventedfan000000000000000/app.bsky.feed.post/3fakepost1'
    fx.put('episodes/003-fixture/cast.js', `export const CAST = {\n  guest: { name: 'Guest', handle: '@guest.bsky.social', guest: true },\n  quinn: { name: 'Quinn', handle: '@quinn.example', guest: true },\n}\n`)
    fx.put('episodes/003-fixture/segments/talk/script.js', SCRIPT.replace("  ],\n}", `    { say: 'quinn', id: 'fic', text: 'a spoon, honestly' }, // verbatim: ${FAKE} · context: ${FAKE}\n  ],\n}`))
    assert.deepEqual((await airedFindings(ep(fx))).findings, [])
    // the same address on a house character's line still needs its record
    fx.put('episodes/003-fixture/segments/talk/script.js', SCRIPT.replace("  ],\n}", `    { say: 'larry', id: 'read', text: 'a spoon, honestly' }, // verbatim: ${FAKE} · context: ${FAKE}\n  ],\n}`))
    assert.ok((await airedFindings(ep(fx))).findings.some((f) => f.ref === FAKE))
  } finally {
    fx.cleanup()
  }
})
