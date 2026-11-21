// the deterministic combinations: ranking cards and the shortlist, the repetition gate (two reviewers, the
// strictest verdict, turned must say what and how, at most one carried forward), selection, and
// the people rules by DID against a fixture ledger
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { combineRepetition, rankCards, repetitionProblems, selectDrafts, shortlistCards } from '../src/combine.mjs'
import { keyOf, loadLedger, peopleRules } from '../src/ledger.mjs'
import { loadConfig } from '../src/pipeline.mjs'
import { REPO } from '../src/repo.mjs'
import { cleanup } from './helpers.mjs'

const { config } = loadConfig()

test('rank cards: reach and interest only; interview candidates ranked apart; numbers recorded, reasons not', () => {
  const cards = [{ id: 'big', title: 'Big', lane: 'talk', reach: 1000 }, { id: 'small', title: 'Small', lane: 'made', reach: 10 }, { id: 'odd', title: 'Odd', lane: 'talk', reach: 0 }, { id: 'quinn', title: 'Q', lane: 'interview', reach: 5 }, { id: 'rae', title: 'R', lane: 'interview', reach: 50 }]
  const reviews = [
    { reviewer: 'reviewer-1', cards: { big: { interest: 2, reason: 'loud, thin' }, small: { interest: 10, reason: 'a real turn' }, odd: { interest: 5 }, quinn: { interest: 9 }, rae: { interest: 3 } } },
    { reviewer: 'reviewer-2', cards: { big: { interest: 4 }, small: { interest: 10 }, quinn: { interest: 9 }, rae: { interest: 3 } } },
  ]
  const w = config.ranking.weights
  const rows = rankCards({ cards, reviews, weights: w, pool: 2, interviewPool: 1 })
  assert.deepEqual(rows.filter((r) => !r.interview).map((r) => r.card), ['small', 'big', 'odd'], 'interest outweighs reach')
  const big = rows.find((r) => r.card === 'big')
  assert.equal(big.reachNorm, 1)
  assert.equal(big.interest, 3)
  assert.equal(big.score, Math.round((w.reach + w.interest * 0.3) * 1000) / 1000)
  assert.deepEqual(rows.filter((r) => r.pool).map((r) => r.card).sort(), ['big', 'quinn', 'small'], 'a pool of two, plus the best interview candidate')
  assert.ok(!JSON.stringify(rows).includes('loud, thin'), 'reasons stay in the reviewers\' files')
})

test('shortlist: best joke, synergy and variety over the pool; interview candidates never take a place', () => {
  const pool = [{ card: 'a', score: 0.5, interview: false }, { card: 'b', score: 0.6, interview: false }, { card: 'c', score: 0.4, interview: false }, { card: 'q', score: 0.9, interview: true }]
  const reviews = [
    { reviewer: 'reviewer-1', cards: { a: { bestJoke: { idea: 'w1-1', score: 9 }, synergy: 2, variety: 2, ideas: ['w1-1', 'w2-1'] }, b: { bestJoke: { idea: 'w1-2', score: 3 }, synergy: 0, variety: 0 }, c: { bestJoke: { idea: 'w1-3', score: 6 }, synergy: 1, variety: 1 }, q: { bestJoke: { idea: 'w1-4', score: 10 }, synergy: 2, variety: 2 } } },
    { reviewer: 'reviewer-2', cards: { a: { bestJoke: { idea: 'w2-1', score: 7 }, synergy: 2, variety: 2 }, b: { bestJoke: { idea: 'w1-2', score: 3 } }, c: { bestJoke: { idea: 'w1-3', score: 6 } }, q: { bestJoke: { idea: 'w1-4', score: 10 } } } },
  ]
  const rows = shortlistCards({ pool, reviews, weights: config.shortlist.weights, size: 2 })
  assert.equal(rows[0].card, 'q', 'the candidate scores highest')
  assert.deepEqual(rows.filter((r) => r.shortlisted).map((r) => r.card), ['a', 'c'], 'but the shortlist is cards that are not interview candidates')
  assert.deepEqual(rows.find((r) => r.card === 'a').ideas, ['w1-1', 'w2-1'])
  assert.deepEqual(rows.find((r) => r.card === 'b').ideas, ['w1-2'], 'without a choice, the best-joke ideas carry')
})

const file = (reviewer, round, items) => ({ reviewer, round, items })
const fresh = (id, extra = {}) => ({ id, verdict: 'fresh', reason: 'new', ...extra })
const opts = { reviewers: 2, maxTurnedFromPrevious: 1, label: 'idea' }

test('repetition: two reviewers each, strictest verdict stands, any repeat blocks', () => {
  const items = [{ id: 'a' }, { id: 'b' }]
  const c = combineRepetition([file('r1', 1, [fresh('a'), fresh('b')]), file('r2', 1, [fresh('a'), { id: 'b', verdict: 'repeat', avoid: 'the pilot built a chain of BUILT posts', reason: 'same device' }])], items)
  assert.equal(c.a.verdict, 'fresh')
  assert.equal(c.b.verdict, 'repeat')
  const p = repetitionProblems(c, opts)
  assert.deepEqual(p.repeats, ['b'])
  assert.ok(p.failures.some((f) => /idea b is a repeat .* blocked \(rework it, or drop it with --exclude b\)/.test(f)))
  const one = repetitionProblems(combineRepetition([file('r1', 1, [fresh('a')])], [{ id: 'a' }]), opts)
  assert.ok(one.failures.some((f) => /idea a: verdicts from 1 reviewer; the gate needs 2/.test(f)))
  const bad = repetitionProblems(combineRepetition([file('r1', 1, [{ id: 'a', verdict: 'meh' }]), file('r2', 1, [{ id: 'a', verdict: 'repeat' }])], [{ id: 'a' }]), opts)
  assert.ok(bad.failures.some((f) => /gave "meh"/.test(f)))
  assert.ok(bad.failures.some((f) => /must give "avoid"/.test(f)))
})

test('repetition: a later round replaces a reviewer\'s earlier verdict; script verdicts must name the current version', () => {
  const c = combineRepetition([file('r1', 1, [{ id: 'a', verdict: 'repeat', avoid: 'x' }]), file('r1', 2, [fresh('a')]), file('r2', 1, [fresh('a')])], [{ id: 'a' }])
  assert.equal(c.a.verdict, 'fresh')
  const v = combineRepetition([file('r1', 1, [fresh('s', { version: 'old' })]), file('r2', 1, [fresh('s', { version: 'new' })])], [{ id: 's', version: 'new' }])
  assert.deepEqual(v.s.verdicts.map((x) => x.reviewer), ['r2'], 'a verdict on an older draft does not count')
  assert.ok(repetitionProblems(v, { ...opts, label: 'script' }).failures.some((f) => /on version new; the gate needs 2/.test(f)))
})

test('repetition: turned must say what and how; at most one turned item carried from the previous episode', () => {
  const turned = (id, fromPrevious) => ({ id, verdict: 'turned', fromPrevious, turned: { what: 'the throat', how: 'Larry is asked to sing with it' }, reason: 'turned' })
  ok(repetitionProblems(combineRepetition([file('r1', 1, [turned('a', true)]), file('r2', 1, [fresh('a')])], [{ id: 'a' }]), opts))
  const vague = repetitionProblems(combineRepetition([file('r1', 1, [{ id: 'a', verdict: 'turned', turned: { what: 'the throat' } }]), file('r2', 1, [fresh('a')])], [{ id: 'a' }]), opts)
  assert.ok(vague.failures.some((f) => /must say what is turned and how/.test(f)))
  const two = repetitionProblems(combineRepetition([file('r1', 1, [turned('a', true), turned('b', true)]), file('r2', 1, [fresh('a'), fresh('b')])], [{ id: 'a' }, { id: 'b' }]), opts)
  assert.ok(two.failures.some((f) => /2 turned items carry something forward .* at most 1 per episode/.test(f)))
})
const ok = (p) => assert.deepEqual(p.failures, [])

test('select: weighted scores, filled toward the target, never past the ceiling, exclusions recorded', () => {
  const drafts = [{ slug: 'a', seconds: 200 }, { slug: 'b', seconds: 250 }, { slug: 'c', seconds: 100 }, { slug: 'd', seconds: 90, standing: 'music' }]
  const s = (funny, interesting, television, variety) => ({ funny, interesting, television, variety, reason: 'r' })
  const reviews = [{ reviewer: 'r1', drafts: { a: s(9, 9, 9, 9), b: s(8, 8, 8, 8), c: s(2, 2, 2, 2), d: s(7, 7, 7, 7) } }, { reviewer: 'r2', drafts: { a: s(7, 7, 7, 7), b: s(8, 8, 8, 8), c: s(2, 2, 2, 2), d: s(5, 5, 5, 5) } }]
  const { rows, total } = selectDrafts({ drafts, reviews, weights: config.selection.weights, targetSeconds: 480, maxSeconds: 590 })
  assert.deepEqual(rows.map((r) => [r.slug, r.selected]), [['a', true], ['b', true], ['d', true], ['c', false]])
  assert.equal(total, 540)
  assert.equal(rows[0].score, 0.8)
  assert.match(rows[3].why, /already reached the 480 s target/)
  const tight = selectDrafts({ drafts, reviews, weights: config.selection.weights, targetSeconds: 480, maxSeconds: 500, excluded: ['a'] })
  assert.deepEqual(tight.rows.map((r) => [r.slug, r.selected]), [['a', false], ['b', true], ['d', true], ['c', true]])
  assert.equal(tight.rows[0].why, 'excluded by the project manager')
  const ceil = selectDrafts({ drafts, reviews, weights: config.selection.weights, targetSeconds: 590, maxSeconds: 500 })
  assert.match(ceil.rows.find((r) => r.slug === 'd').why, /past the 500 s ceiling/)
  // the caps, applied as the rundown fills: a blocked draft is passed over with the reason, and the next one fills
  const capped = selectDrafts({ drafts, reviews, weights: config.selection.weights, targetSeconds: 480, maxSeconds: 590, blocked: (slug, chosen) => (slug === 'b' && chosen.includes('a') ? 'an episode has 1 interview' : null) })
  assert.deepEqual(capped.rows.map((r) => [r.slug, r.selected]), [['a', true], ['b', false], ['d', true], ['c', true]])
  assert.equal(capped.rows[1].why, 'an episode has 1 interview')
})

function ledgerDir(entries, tracker = {}) {
  const d = mkdtempSync(join(tmpdir(), 'wr-ledger-'))
  for (const e of entries) writeFileSync(join(d, `${e.id}.json`), JSON.stringify(e))
  writeFileSync(join(d, 'featured.json'), JSON.stringify(tracker))
  writeFileSync(join(d, 'README.md'), '# the ledger\n')
  writeFileSync(join(d, 'register.json'), '{"not": "an episode"}')
  return d
}
const P = (n, h) => ({ did: `did:plc:${n}`, handle: h })
const E = (id, guests, featured) => ({ id, aired: true, guests, featured, formats: [], song: null, runners: [], catchphrases: [], devices: [] })

test('ledger: loads <id>.json and the tracker, skips other files, tolerates empty and bare-handle entries', () => {
  const d = ledgerDir([E('001-pilot', [P('ana', 'ana.test')], [P('ana', 'ana.test')]), { id: '002-x', guests: ['bo.test'] }])
  writeFileSync(join(d, '003-empty.json'), '')
  try {
    const l = loadLedger(d)
    assert.deepEqual(l.entries.map((e) => e.id), ['001-pilot', '002-x', '003-empty'])
    assert.deepEqual(l.entries[1].guests, [{ did: null, handle: 'bo.test' }])
    assert.deepEqual(l.entries[2].featured, [])
    assert.deepEqual(l.problems, [])
    assert.deepEqual(loadLedger(join(d, 'nowhere')).entries, [])
  } finally {
    cleanup(d)
  }
})

test('people rules by DID: a previous speaker may not speak (even under a new handle); featured mostly new; a frequency warning', () => {
  const d = ledgerDir([
    E('001-pilot', [P('ana', 'ana.test')], [P('ana', 'ana.test'), P('cy', 'cy.test'), P('dee', 'dee.test')]),
    E('002-two', [P('bo', 'bo.test')], [P('bo', 'bo.test'), P('cy', 'cy.test')]),
  ])
  try {
    const l = loadLedger(d)
    const cfg = { maxRepeatFeaturedShare: 0.5, recentEpisodes: 4, frequentShare: 0.5 }
    // bo spoke in 002 and has changed handle since: the DID still matches
    const r = peopleRules(l, 3, { speakers: [P('bo', 'bo-renamed.test')], featured: [P('bo', 'bo-renamed.test'), P('new1', 'n1.test'), P('new2', 'n2.test')] }, cfg)
    assert.ok(r.failures.some((f) => /@bo-renamed\.test spoke in the previous aired episode \(002-two\)/.test(f)))
    // ana spoke two episodes ago: she may speak now
    const a = peopleRules(l, 3, { speakers: [P('ana', 'ana.test')], featured: [P('ana', 'ana.test'), P('new1', 'n1.test'), P('new2', 'n2.test')] }, cfg)
    assert.deepEqual(a.failures, [])
    assert.match(a.warnings.join(' '), /featured before: @ana\.test \(1 of 3\)/)
    // mostly new: 2 of 3 featured before fails
    const m = peopleRules(l, 3, { featured: [P('ana', 'ana.test'), P('dee', 'dee.test'), P('new1', 'n1.test')] }, cfg)
    assert.ok(m.failures.some((f) => /2 of 3 accounts featured on screen were featured in the last 2 aired episodes .* at most 50 %/.test(f)))
    // cy was in both earlier episodes: would be in 3 of 3, a warning, not a failure
    const c = peopleRules(l, 3, { featured: [P('cy', 'cy.test'), P('new1', 'n1.test'), P('new2', 'n2.test')] }, cfg)
    assert.deepEqual(c.failures, [])
    assert.match(c.warnings.join(' '), /often featured: @cy\.test would be in 3 of the last 3 episodes; fresh people are preferred \(nobody is barred\)/)
    // a handle with no DID resolves through the digest
    const digest = { accounts: new Map([['bo-renamed.test', { did: 'did:plc:bo' }]]) }
    assert.equal(keyOf('bo-renamed.test', digest), 'did:plc:bo')
    assert.ok(peopleRules(l, 3, { speakers: ['bo-renamed.test'] }, cfg, digest).failures.length === 1)
    // no history: nothing to check
    assert.match(peopleRules(l, 1, { speakers: [P('bo', 'bo.test')] }, cfg).warnings[0], /no earlier aired episode in the ledger/)
  } finally {
    cleanup(d)
  }
})

test('people rules count only aired episodes: an unaired draft never blocks anyone; "mostly new" looks back a fixed window', () => {
  const draft = { ...E('002-draft', [P('yon', 'yon.test'), P('cy', 'cy.test')], [P('yon', 'yon.test'), P('cy', 'cy.test'), P('dee', 'dee.test')]), aired: false }
  const d = ledgerDir([E('001-pilot', [P('ana', 'ana.test')], [P('ana', 'ana.test'), P('bo', 'bo.test')]), draft])
  try {
    const l = loadLedger(d)
    const cfg = { maxRepeatFeaturedShare: 0.5, recentEpisodes: 4, frequentShare: 0.5 }
    // the draft's guests may speak, and do not count as featured before
    const r = peopleRules(l, 3, { speakers: [P('yon', 'yon.test'), P('cy', 'cy.test')], featured: [P('yon', 'yon.test'), P('cy', 'cy.test'), P('dee', 'dee.test')] }, cfg)
    assert.deepEqual(r.failures, [])
    assert.equal(r.repeatShare, 0)
    // "the previous episode" is the last aired one: the pilot
    assert.match(peopleRules(l, 3, { speakers: [P('ana', 'ana.test')] }, cfg).failures[0], /spoke in the previous aired episode \(001-pilot\)/)
  } finally {
    cleanup(d)
  }
  // a fixed window: someone featured five aired episodes ago is new again
  const many = Array.from({ length: 5 }, (_, k) => E(`00${k + 1}-ep`, [], k === 0 ? [P('old', 'old.test')] : [P(`x${k}`, `x${k}.test`)]))
  const d2 = ledgerDir(many)
  try {
    const r = peopleRules(loadLedger(d2), 6, { featured: [P('old', 'old.test'), P('new', 'new.test')] }, { maxRepeatFeaturedShare: 0.4, recentEpisodes: 4, frequentShare: 0.5 })
    assert.deepEqual(r.failures, [])
    assert.equal(r.repeatShare, 0)
  } finally {
    cleanup(d2)
  }
})

test('people rules with the configured limits: an appearance only in an unaired entry does not count; the last aired episode\'s speakers rest', () => {
  // the shape of the real ledger (a pilot, an aired episode, an unaired trial between them) without naming anyone real
  const trial = { ...E('002-trial', [P('tri', 'tri.test')], [P('tri', 'tri.test'), P('tri2', 'tri2.test')]), aired: false }
  const d = ledgerDir([E('001-pilot', [P('ana', 'ana.test')], [P('ana', 'ana.test')]), trial, E('003-aired', [P('bo', 'bo.test')], [P('bo', 'bo.test')])])
  try {
    const l = loadLedger(d)
    assert.deepEqual(l.problems, [])
    const fresh = [P('new1', 'n1.test'), P('new2', 'n2.test')]
    // the trial's guest is in no aired episode: he may speak, and is not featured before
    const r = peopleRules(l, 4, { speakers: [P('tri', 'tri.test')], featured: [P('tri', 'tri.test'), ...fresh] }, config.people)
    assert.deepEqual(r.failures, [])
    assert.equal(r.repeatShare, 0)
    // the most recent aired episode's speaker rests
    const b = peopleRules(l, 4, { speakers: [P('bo', 'bo.test')] }, config.people)
    assert.equal(b.failures.length, 1)
    assert.match(b.failures[0], /spoke in the previous aired episode \(003-aired\)/)
  } finally {
    cleanup(d)
  }
})

test('the real ledger loads with no problems (skipped outside the repository)', { skip: !existsSync(join(REPO, 'docs', 'ledger')) }, () => {
  assert.deepEqual(loadLedger(join(REPO, 'docs', 'ledger')).problems, [])
})
