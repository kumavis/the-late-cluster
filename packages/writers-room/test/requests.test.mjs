// Segments the owner asks for by name (src/requests.mjs; the owner's decision of 27 November 2026,
// "Yes, same gates"): the record's shape; a requested segment drafted, fitted, scored and judged like
// any other draft on the fixture runner; holding its place at select, with a broken cap stopping the
// run for the owner; an unscreened card refused at draft; one added after select reopening it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { produce } from '../src/pipeline.mjs'
import { findEpisodeForWeek, PKG } from '../src/repo.mjs'
import { loadState } from '../src/state.mjs'
import { selectDrafts } from '../src/combine.mjs'
import { REQUESTS_FORMAT, requestRunProblems, requestShapeProblems } from '../src/requests.mjs'
import { cleanup, fakeRepo, fakeTools, put } from './helpers.mjs'

const FX = join(PKG, 'test', 'fixtures', 'workflow')
const WEEK = '2099-W01'
const SLUG = 'owner-bit'
const out = (lines) => lines.join('\n')

const entry = (over = {}) => ({
  slug: SLUG,
  title: 'The running bit, by request',
  asked: { words: 'do a segment on the running bit, it deserves one', date: '2099-01-02' },
  cards: ['talk-bit'],
  exceptions: ["The bible's limit of one joke about the show per episode does not apply to this segment."],
  ...over,
})
const record = (...segments) => ({ format: REQUESTS_FORMAT, segments })

const SCRIPT = `export default {
  id: '${SLUG}',
  title: 'The running bit, by request',
  beats: [
    { say: 'larry', id: 'open', text: 'By request: the bit that keeps running.' },
    { say: 'sibyl', id: 'close', text: 'It is still running.' },
  ],
}
`
const NOTES = (seconds) => ({ slug: SLUG, title: 'The running bit, by request', format: 'desk piece', seconds, standing: null, cards: ['talk-bit'], ideas: [], turn: 'the bit outlives the desk', speakers: [], featured: [] })
const SCORES = { funny: 3, interesting: 3, television: 3, variety: 3, reason: 'fixture reason' }
const patchJson = (f, fn) => {
  const j = JSON.parse(readFileSync(f, 'utf8'))
  fn(j)
  writeFileSync(f, JSON.stringify(j, null, 2) + '\n')
}

/** the workflow fixture, plus the requested segment's draft and the reviewers' verdicts and scores on it */
function fixture({ seconds = 8, judged = true } = {}) {
  const fx = mkdtempSync(join(tmpdir(), 'wr-req-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  cpSync(join(fx, 'stage.talk-ask@2'), join(fx, 'stage.talk-ask'), { recursive: true })
  put(fx, `draft.${SLUG}/production/drafts/${SLUG}/script.js`, SCRIPT)
  put(fx, `draft.${SLUG}/production/drafts/${SLUG}/notes.json`, NOTES(seconds))
  if (judged)
    for (const r of ['reviewer-1', 'reviewer-2']) {
      patchJson(join(fx, `select.${r}`, 'production', 'review', 'select', `${r}.json`), (j) => (j.drafts[SLUG] = SCORES))
      patchJson(join(fx, `select.repetition-${r}-r1`, 'production', 'review', 'repetition-scripts', `${r}-r1.json`), (j) => j.items.push({ id: SLUG, version: `__VERSION:${SLUG}__`, verdict: 'fresh', reason: 'fixture reason' }))
    }
  return fx
}

function setup(fx) {
  const root = fakeRepo({ fullScorecard: true, ledger: false })
  const L = ['led', 'ger'].join('')
  cpSync(join(FX, L), join(root, 'docs', L), { recursive: true })
  const tools = fakeTools(root, { whisper: true, fitHeard: { 'Relax. This show is not a bum.': 'Relax. This show is not a bomb.' } })
  const lines = []
  const run = (o = {}) => produce({ root, week: WEEK, runner: 'fixture', fixture: fx, digest: join(FX, 'digest'), settings: join(FX, 'settings.json'), tools, ready: () => false, print: (l) => lines.push(l), ...o })
  const prod = () => join(findEpisodeForWeek(root, WEEK).dir, 'production')
  const request = (j) => writeFileSync(join(prod(), 'owner-requests.json'), JSON.stringify(j, null, 2) + '\n')
  return { root, lines, run, prod, request }
}

test('the record: its shape, one plain sentence per exception, never the constitution', () => {
  assert.deepEqual(requestShapeProblems(null), [])
  assert.deepEqual(requestShapeProblems(record(entry())), [])
  const p = (j) => requestShapeProblems(j).join('\n')
  assert.match(p({ segments: [entry()] }), /"format" is "late-cluster-requests\/1"/)
  assert.match(p(record(entry({ slug: 'Owner Bit' }))), /"slug" is a segment id/)
  assert.match(p(record(entry({ asked: { words: 'yes' } }))), /"asked\.date" is the date the owner asked, YYYY-MM-DD/)
  assert.match(p(record(entry({ asked: { date: '2099-01-02' } }))), /"asked\.words" is the owner's words, verbatim/)
  assert.deepEqual(requestShapeProblems(record(entry({ cards: [] }))), [], 'a request may draw on no card')
  assert.match(p(record(entry({ cards: 'talk-bit' }))), /"cards" lists the card ids it draws on \(empty for none\)/)
  assert.match(p(record(entry({ exceptions: ['No limit on jokes about the show. And the window does not apply.'] }))), /one plain sentence.*its own entry/)
  assert.match(p(record(entry({ exceptions: ['no full stop'] }))), /one plain sentence/)
  assert.match(p(record(entry({ exceptions: ['The constitution does not apply to this segment.'] }))), /nothing in the constitution is ever an exception/)
  assert.match(p(record(entry({ exceptions: ['Rule R3 is waived for this segment.'] }))), /nothing in the constitution is ever an exception/)
  assert.match(p(record(entry(), entry())), /the slug owner-bit is requested twice/)
  // the run's checks: a free slug, every card in the longlist and kept by the screen
  const longlist = { cards: [{ id: 'talk-bit', kept: true }, { id: 'made-zed', kept: false }, { id: 'talk-dup', kept: false, mergedInto: 'talk-bit' }] }
  const run = (e, planned = []) => requestRunProblems(e, { planned, standing: ['interview', 'music', 'top-chicken'], longlist }).join('\n')
  assert.equal(run(entry()), '')
  assert.equal(requestRunProblems(entry({ cards: [] }), { planned: [], standing: [], longlist: null }).join('\n'), '', 'no card, no longlist needed')
  assert.match(run(entry({ slug: 'music' })), /a standing segment's/)
  assert.match(run(entry(), [SLUG]), /collides with a planned draft/)
  assert.match(run(entry({ cards: ['made-zed'] })), /card made-zed did not pass the constitution screen/)
  assert.match(run(entry({ cards: ['made-nothing'] })), /card made-nothing is not in the run's longlist/)
  assert.match(run(entry({ cards: ['talk-dup'] })), /merged into talk-bit at the screen; name talk-bit/)
})

test('selectDrafts: a requested draft is selected on the owner\'s word; the rest fill around it; a cap it breaks is recorded, never applied', () => {
  const weights = { funny: 1, interesting: 1, television: 1, variety: 1 }
  const s = (n) => ({ funny: n, interesting: n, television: n, variety: n })
  const drafts = [{ slug: 'a', seconds: 10 }, { slug: 'b', seconds: 10 }, { slug: 'req', seconds: 10 }]
  const reviews = [{ reviewer: 'r1', drafts: { a: s(9), b: s(8), req: s(1) } }]
  const sel = selectDrafts({ drafts, reviews, weights, targetSeconds: 20, maxSeconds: 40, required: ['req'] })
  const row = Object.fromEntries(sel.rows.map((r) => [r.slug, r]))
  assert.equal(row.req.selected, true)
  assert.equal(row.req.why, 'requested by the owner')
  assert.equal(row.a.selected, true)
  assert.equal(row.b.selected, false, 'the target is reached with the requested segment counted')
  assert.equal(sel.requiredSeconds, 10)
  const capped = selectDrafts({ drafts, reviews, weights, targetSeconds: 20, maxSeconds: 40, required: ['a', 'req'], blocked: (slug, chosen) => (slug === 'req' && chosen.includes('a') ? 'someone in it is already in 2 selected segments (ana.test: a, x)' : null) })
  const req = capped.rows.find((r) => r.slug === 'req')
  assert.equal(req.selected, true)
  assert.match(req.conflict, /already in 2 selected segments \(ana\.test: a, x\)/)
})

test('a requested segment through draft, fit and select on the fixture runner, with every gate', async () => {
  const fx = fixture()
  const { root, lines, run, prod, request } = setup(fx)
  try {
    assert.equal(await run({ stage: 'scope' }), 0, out(lines))
    request(record(entry()))
    lines.length = 0
    await run()
    const o = out(lines)
    for (const s of ['draft', 'fit', 'select']) assert.match(o, new RegExp(`stage ${s} done`), o)
    assert.match(o, /gate draft\.requested ok/)
    assert.match(o, new RegExp(`fixture draft\\.${SLUG}: 2 files`))
    assert.match(o, new RegExp(`warn requested by the owner, in the selection on the owner's word: ${SLUG}`))
    // the writer's brief carries the owner's words, the exceptions, and that the constitution is never one
    const b = readFileSync(join(prod(), `briefs/draft/draft.${SLUG}.md`), 'utf8')
    assert.match(b, /The owner asked for this segment \("The running bit, by request"\) on 2099-01-02, in these words: "do a segment on the running bit, it deserves one"/)
    assert.match(b, /- The bible's limit of one joke about the show per episode does not apply to this segment\./)
    assert.match(b, /Nothing in the constitution is ever among them/)
    assert.match(b, /^- episodes\/002-2099-w01\/production\/research\/kept\/talk-bit\.json$/m)
    // fitted like every draft; scored; in the selection, which the gate and the consent refresh then cover
    assert.ok(existsSync(join(prod(), `drafts/${SLUG}/fit.json`)))
    const plan = JSON.parse(readFileSync(join(prod(), 'plan.json'), 'utf8'))
    const seg = plan.segments.find((s) => s.id === SLUG)
    assert.equal(seg?.requested, true, JSON.stringify(plan.segments))
    assert.ok(plan.segments.some((s) => s.id === 'talk-ask'), 'the rest is selected around it')
    const scores = JSON.parse(readFileSync(join(prod(), 'select/scores.json'), 'utf8')).drafts.find((r) => r.slug === SLUG)
    assert.ok(scores.score < 0.5 && scores.selected, 'selected on the owner\'s word, not its score')
    assert.ok(JSON.parse(readFileSync(join(prod(), 'select/sources.json'), 'utf8')).selection, 'the source list the consent refresh is run on')
    assert.equal(loadState(join(prod(), 'state.json')).stages.select.status, 'done')
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a requested segment that breaks a cap stops select for the owner, naming the cap and the segment', async () => {
  const fx = fixture({ seconds: 70 })
  const { root, lines, run, request } = setup(fx)
  try {
    await run({ stage: 'scope' })
    request(record(entry()))
    lines.length = 0
    assert.equal(await run(), 1)
    const o = out(lines)
    assert.match(o, /stage fit done/)
    assert.match(o, /gate select\.requested FAIL\n  FAIL the owner asked for owner-bit, and keeping it breaks a cap: the running time; it runs 70 s, over the 60 s ceiling\. The owner decides \(production\/owner-requests\.json\): the tool neither drops a requested segment nor ignores a cap/)
    assert.match(o, /decide: select stopped/)
    assert.ok(!/fixture select\.reviewer-1/.test(o), 'nothing more is briefed until the owner decides')
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a requested segment naming an unscreened card fails at draft and says what is missing; a record out of shape stops the run', async () => {
  const fx = fixture()
  const { root, lines, run, request } = setup(fx)
  try {
    await run({ stage: 'scope' })
    request(record(entry({ cards: ['made-zed', 'made-nothing'] })))
    lines.length = 0
    assert.equal(await run(), 1)
    let o = out(lines)
    assert.match(o, /gate draft\.requested FAIL/)
    assert.match(o, /FAIL production\/owner-requests\.json owner-bit: card made-zed did not pass the constitution screen/)
    assert.match(o, /FAIL production\/owner-requests\.json owner-bit: card made-nothing is not in the run's longlist/)
    assert.ok(!new RegExp(`fixture draft\\.${SLUG}`).test(o), 'it is not briefed')
    request({ segments: [entry({ asked: 'yes' })] })
    lines.length = 0
    assert.equal(await run(), 1)
    o = out(lines)
    assert.match(o, /production\/owner-requests\.json is not in shape; fix it and run again/)
    assert.ok(!/stage draft start/.test(o))
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a requested segment added after select reopens draft, fit and select, and joins the rundown', async () => {
  const fx = fixture({ judged: false })
  // what the reviewers and the auditor write when it joins: a later round of scores, verdicts and consent
  for (const r of ['reviewer-1', 'reviewer-2']) {
    put(fx, `select.${r}-r2/production/review/select/${r}-r2.json`, { reviewer: r, drafts: { [SLUG]: SCORES }, inherit: [] })
    put(fx, `select.repetition-${r}-r3/production/review/repetition-scripts/${r}-r3.json`, { reviewer: r, round: 3, items: [{ id: SLUG, version: `__VERSION:${SLUG}__`, verdict: 'fresh', reason: 'fixture reason' }] })
  }
  // the new draft brings a guest of its own; the assembler, briefed again, places it; a builder stages it; the stage auditor looks again
  put(fx, `draft.${SLUG}/production/drafts/${SLUG}/cast.js`, "export const CAST = { zed2: { name: 'Zed Two', handle: '@zed2.example', title: 'Guest', guest: true } }\n")
  const epJson = JSON.parse(readFileSync(join(fx, 'assemble.writer', 'episode.json'), 'utf8'))
  put(fx, 'assemble.writer@2/episode.json', { ...epJson, rundown: ['talk-ask', 'interview', SLUG] })
  put(fx, `stage.${SLUG}/segments/${SLUG}/index.js`, "// the running bit, at the desk\nexport default {\n  defaultShot: 'desk',\n  shots: [{ at: 0, shot: 'desk' }],\n}\n")
  put(fx, join('stage.auditor-r3', 'production', 'review', 'stage', 'r3.json'), { segments: Object.fromEntries(['talk-ask', 'interview', SLUG].map((s) => [s, { verdict: 'pass', changes: [] }])) })
  cpSync(join(fx, 'select.consent-r1'), join(fx, 'select.consent-r2'), { recursive: true })
  const cdir = join(fx, 'select.consent-r2', 'production', 'review')
  renameSync(join(cdir, 'consent', 'r1.json'), join(cdir, 'consent', 'r2.json'))
  for (const f of readdirSync(cdir)) if (f === 'consent-r1.md') renameSync(join(cdir, f), join(cdir, 'consent-r2.md'))
  const { root, lines, run, prod, request } = setup(fx)
  try {
    assert.equal(await run(), 0, 'the whole run, to review')
    assert.equal(loadState(join(prod(), 'state.json')).stages.select.status, 'done')
    // a request that cannot be drafted reopens nothing
    request(record(entry({ cards: ['made-zed'] })))
    lines.length = 0
    assert.equal(await run(), 1)
    assert.match(out(lines), /the requested owner-bit cannot join yet; nothing was reopened/)
    assert.equal(loadState(join(prod(), 'state.json')).stages.select.status, 'done')
    // one that can reopens draft, fit and select, as --from draft
    request(record(entry()))
    lines.length = 0
    await run()
    const o = out(lines)
    assert.match(o, /requested by the owner after the draft stage: owner-bit; draft, fit and select reopen for it \(as --from draft\)/)
    assert.match(o, new RegExp(`stage draft start[\\s\\S]*fixture draft\\.${SLUG}[\\s\\S]*stage fit done[\\s\\S]*fixture select\\.reviewer-1-r2[\\s\\S]*fixture select\\.repetition-reviewer-1-r3[\\s\\S]*fixture select\\.consent-r2[\\s\\S]*stage select done`), o)
    assert.ok(JSON.parse(readFileSync(join(prod(), 'plan.json'), 'utf8')).segments.some((s) => s.id === SLUG && s.requested))
    // assembly reopens: the segment is copied in, its guest merged, and the assembler briefed again to place it
    assert.match(o, /assembly had begun: assembly\.md is set aside and assemble\.writer is briefed again to place owner-bit/)
    assert.match(o, /fixture assemble\.writer: \d+ files \(run 2\)[\s\S]*stage assemble done/, o)
    assert.ok(existsSync(join(prod(), 'assembly.md.rejected-1')))
    assert.match(readFileSync(join(prod(), 'briefs/assemble/assemble.writer.md'), 'utf8'), /## Sent back to you[\s\S]*owner-bit: a segment the owner asked for joined after assembly began/)
    const ep = findEpisodeForWeek(root, WEEK)
    assert.deepEqual(ep.meta.rundown, ['talk-ask', 'interview', SLUG])
    assert.ok(existsSync(join(ep.dir, 'segments', SLUG, 'script.js')))
    const cast = readFileSync(join(ep.dir, 'cast.js'), 'utf8')
    assert.match(cast, /\/\/ Added by the pipeline: the guests of owner-bit, which joined after assembly began\.\nObject\.assign\(CAST, \{\n {2}"zed2"/)
    // staged by its builder, and the stage auditor looks again at every segment
    assert.match(o, /fixture stage\.owner-bit[\s\S]*fixture stage\.auditor-r3[\s\S]*gate stage\.audit ok[\s\S]*stage stage done/, o)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a request on no card is drafted for the house cast; the real-people gates still refuse a real person in it', async () => {
  const fx = fixture()
  put(fx, `draft.${SLUG}/production/drafts/${SLUG}/notes.json`, { ...NOTES(8), cards: [] })
  const { root, lines, run, prod, request } = setup(fx)
  try {
    await run({ stage: 'scope' })
    request(record(entry({ cards: [] })))
    lines.length = 0
    await run()
    assert.match(out(lines), /stage select done/, out(lines))
    const b = readFileSync(join(prod(), `briefs/draft/draft.${SLUG}.md`), 'utf8')
    assert.match(b, /It draws on no card: write it for the house cast\. A real person's line or post needs a card and a source record, so it has none\./)
    assert.ok(!b.includes('production/rank/pool.md'), 'no pool to draw on')
    // a real person's line with no source record is refused at draft, as for any draft
    writeFileSync(join(prod(), `drafts/${SLUG}/script.js`), SCRIPT.replace("{ say: 'sibyl', id: 'close', text: 'It is still running.' },", "{ say: 'ana', id: 'close', text: 'it is still running' },"))
    lines.length = 0
    assert.equal(await run({ check: 'draft' }), 1)
    assert.match(out(lines), /ana says "it is still running" with no source comment \(rule R3\)/)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('a request made before research reaches every research brief as a pointer, with the owner\'s words', async () => {
  const fx = fixture()
  const { root, lines, run, prod, request } = setup(fx)
  try {
    await run({ stage: 'scope' })
    request(record(entry({ cards: [] })))
    lines.length = 0
    await run({ stage: 'research' })
    for (const lane of ['made', 'talk', 'interview']) {
      const b = readFileSync(join(prod(), `briefs/research/research.${lane}.md`), 'utf8')
      assert.match(b, /The owner asked for a segment \(owner-bit\) in these words: "do a segment on the running bit, it deserves one"\. If your lane holds material on it, card that material exactly like any other story\. The request is a pointer and decides nothing: the screen applies as always/, lane)
    }
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('an account or post first brought in at assembly gets its own consent round: the run stops at assemble with the task, never at the build', async () => {
  const fx = fixture({ judged: false })
  const { root, lines, run, prod } = setup(fx)
  try {
    assert.equal(await run(), 0, out(lines))
    // the open now shows a real account the selection never had, and one of its posts
    const NEW = { handle: 'newguest.bsky.social', did: 'did:plc:newguest', role: 'credited' }
    const POST = 'at://did:plc:newguest/app.bsky.feed.post/3newpost'
    patchJson(join(prod(), 'sources.json'), (j) => {
      j.accounts.push(NEW)
      j.posts.push({ uri: POST, author: NEW.handle, text: 'a new post', use: 'card', segment: 'talk-ask' })
    })
    lines.length = 0
    assert.equal(await run({ from: 'assemble', runner: 'manual' }), 1)
    let o = out(lines)
    assert.match(o, /spawn auditor\s+assemble\.consent-r1\s+brief episodes\/002-2099-w01\/production\/briefs\/assemble\/assemble\.consent-r1\.md/)
    assert.match(o, /waiting at assemble for 1 subagent/)
    const list = JSON.parse(readFileSync(join(prod(), 'assemble/consent-sources-r1.json'), 'utf8'))
    assert.deepEqual([list.accounts.map((a) => a.handle), list.posts.map((p) => p.uri)], [[NEW.handle], [POST]], 'the additions only')
    const b = readFileSync(join(prod(), 'briefs/assemble/assemble.consent-r1.md'), 'utf8')
    assert.match(b, /An account is out only for one of three stops/)
    assert.match(b, /npm run sources -- check episodes\/002-2099-w01\/production\/assemble\/consent-sources-r1\.json/)
    // the gate holds the stage until the round exists
    lines.length = 0
    assert.equal(await run({ check: 'assemble' }), 1)
    assert.match(out(lines), /FAIL assembly added accounts or posts that no consent refresh covered \(newguest\.bsky\.social, at:\/\/did:plc:newguest\/app\.bsky\.feed\.post\/3newpost\): an auditor refreshes consent for them \(task assemble\.consent-r1/)
    // an out goes back to the assembler, with the command
    const round = (verdict, outs = []) => put(prod(), 'review/consent-assembly/r1.json', { selection: list.selection, verdict, out: outs, notes: [], reason: 'fixture' })
    round('out', [{ account: NEW.handle, stop: 'asked the show', evidence: POST }])
    lines.length = 0
    assert.equal(await run({ check: 'assemble' }), 1)
    assert.match(out(lines), /the consent refresh puts out newguest\.bsky\.social; the assembler takes them out .*--rework assemble\.writer/)
    // a pass lets assembly through to the waves after it (the fixture's digest holds only invented
    // accounts, so write.sources then refuses this made-up one under R2: a different gate, rightly)
    round('pass')
    lines.length = 0
    await run({ runner: 'manual' })
    o = out(lines)
    assert.match(o, /gate assemble\.consent ok[\s\S]*gate render\.check/, o)
    assert.ok(!/FAIL.*consent/.test(o), o)
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})
