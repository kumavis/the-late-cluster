// What a complete pipeline run writes is what the build's checks read: the workflow fixture run to the
// end (and the same run with a segment the owner asked for joining after it), then the gates-on-record
// check and the sources check (scripts/lib/onrecord.mjs, scripts/lib/aired.mjs) on the episode folder it
// produced, as a published build calls them. A finding here means a reader and a writer disagree on a
// path or a field, which would otherwise first show as a refused build at stage 12 of a real episode.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, readFileSync, renameSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { produce } from '../src/pipeline.mjs'
import { findEpisodeForWeek, PKG, REPO } from '../src/repo.mjs'
import { cleanup, fakeRepo, fakeTools, put } from './helpers.mjs'

const { onRecordFindings } = await import(join(REPO, 'scripts/lib/onrecord.mjs'))
const { airedFindings } = await import(join(REPO, 'scripts/lib/aired.mjs'))
const { resolveEpisode } = await import(join(REPO, 'scripts/lib/episodes.mjs'))

const FX = join(PKG, 'test', 'fixtures', 'workflow')
const WEEK = '2099-W01'
const SLUG = 'owner-bit'

function fixtureCopy() {
  const fx = mkdtempSync(join(tmpdir(), 'wr-rec-'))
  cpSync(join(FX, 'tasks'), fx, { recursive: true })
  cpSync(join(fx, 'stage.talk-ask@2'), join(fx, 'stage.talk-ask'), { recursive: true })
  return fx
}

function setup(fx) {
  const root = fakeRepo({ fullScorecard: true, ledger: false })
  const L = ['led', 'ger'].join('')
  cpSync(join(FX, L), join(root, 'docs', L), { recursive: true })
  const tools = fakeTools(root, { whisper: true, fitHeard: { 'Relax. This show is not a bum.': 'Relax. This show is not a bomb.' } })
  const lines = []
  const run = (o = {}) => produce({ root, week: WEEK, runner: 'fixture', fixture: fx, digest: join(FX, 'digest'), settings: join(FX, 'settings.json'), tools, ready: () => false, print: (l) => lines.push(l), ...o })
  return { root, lines, run }
}

/** both checks, on the episode the run produced, as a published build calls them */
async function checks(root) {
  const ep = resolveEpisode(findEpisodeForWeek(root, WEEK).id, { root })
  assert.equal(ep.meta.status, 'published', 'the run ended in a published build')
  const aired = await airedFindings(ep)
  const onRecord = await onRecordFindings(ep, { aired })
  return { ep, aired: aired.findings.map((f) => f.message), onRecord: onRecord.findings.map((f) => f.message), airing: aired.airing }
}

test('a complete pipeline run leaves the records the build checks read: no findings', async () => {
  const fx = fixtureCopy()
  const { root, lines, run } = setup(fx)
  try {
    assert.equal(await run(), 0, lines.join('\n'))
    const r = await checks(root)
    assert.deepEqual(r.aired, [])
    assert.deepEqual(r.onRecord, [])
    assert.ok(r.ep.rundown.length >= 2, 'the checks had segments to read')
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})

test('the same run with a requested segment joining after it: still no findings', async () => {
  const fx = fixtureCopy()
  const SCRIPT = `export default {\n  id: '${SLUG}',\n  title: 'The running bit, by request',\n  beats: [\n    { say: 'larry', id: 'open', text: 'By request: the bit that keeps running.' },\n    { say: 'sibyl', id: 'close', text: 'It is still running.' },\n  ],\n}\n`
  const SCORES = { funny: 3, interesting: 3, television: 3, variety: 3, reason: 'fixture reason' }
  put(fx, `draft.${SLUG}/production/drafts/${SLUG}/script.js`, SCRIPT)
  put(fx, `draft.${SLUG}/production/drafts/${SLUG}/notes.json`, { slug: SLUG, title: 'The running bit, by request', format: 'desk piece', seconds: 8, standing: null, cards: ['talk-bit'], ideas: [], turn: 'the bit outlives the desk', speakers: [], featured: [] })
  for (const r of ['reviewer-1', 'reviewer-2']) {
    put(fx, join(`select.${r}-r2`, 'production', 'review', 'select', `${r}-r2.json`), { reviewer: r, drafts: { [SLUG]: SCORES }, inherit: [] })
    put(fx, join(`select.repetition-${r}-r3`, 'production', 'review', 'repetition-scripts', `${r}-r3.json`), { reviewer: r, round: 3, items: [{ id: SLUG, version: `__VERSION:${SLUG}__`, verdict: 'fresh', reason: 'fixture reason' }] })
  }
  cpSync(join(fx, 'select.consent-r1'), join(fx, 'select.consent-r2'), { recursive: true })
  const cdir = join(fx, 'select.consent-r2', 'production', 'review')
  renameSync(join(cdir, 'consent', 'r1.json'), join(cdir, 'consent', 'r2.json'))
  for (const f of readdirSync(cdir)) if (f === 'consent-r1.md') renameSync(join(cdir, f), join(cdir, 'consent-r2.md'))
  const epJson = JSON.parse(readFileSync(join(fx, 'assemble.writer', 'episode.json'), 'utf8'))
  put(fx, 'assemble.writer@2/episode.json', { ...epJson, rundown: ['talk-ask', 'interview', SLUG] })
  put(fx, `stage.${SLUG}/segments/${SLUG}/index.js`, "// the running bit, at the desk\nexport default {\n  defaultShot: 'desk',\n  shots: [{ at: 0, shot: 'desk' }],\n}\n")
  put(fx, join('stage.auditor-r3', 'production', 'review', 'stage', 'r3.json'), { segments: Object.fromEntries(['talk-ask', 'interview', SLUG].map((s) => [s, { verdict: 'pass', changes: [] }])) })
  const { root, lines, run } = setup(fx)
  try {
    assert.equal(await run(), 0, lines.join('\n'))
    const prod = join(findEpisodeForWeek(root, WEEK).dir, 'production')
    writeFileSync(join(prod, 'owner-requests.json'), JSON.stringify({ format: 'late-cluster-requests/1', segments: [{ slug: SLUG, title: 'The running bit, by request', asked: { words: 'do a segment on the running bit', date: '2099-01-02' }, cards: ['talk-bit'], exceptions: [] }] }))
    lines.length = 0
    // the run is published at stage 12; it then stops at review only because the reviewer's earlier
    // scorecard (unchanged on a rerun of its task) does not list the new segment: --rework review.reviewer
    assert.equal(await run(), 1)
    const o = lines.join('\n')
    assert.match(o, /stage build done/, o)
    assert.match(o, /decide: review stopped with 1 failure[\s\S]*review\.scorecard: scorecard\.md Step 0 does not list the segment owner-bit/, o)
    const r = await checks(root)
    assert.ok(r.ep.rundown.includes(SLUG))
    assert.deepEqual(r.aired, [])
    assert.deepEqual(r.onRecord, [])
  } finally {
    cleanup(root)
    cleanup(fx)
  }
})
