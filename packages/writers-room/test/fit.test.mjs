// Stage 8 after the owner's ruling of 21 November 2026 ("best effort on pronunciation is sufficient,
// as subtitles carry the line"): an unsayable, weak or flagged line no longer fails once its hard
// word is in the voice research file; something heard that is alarming, out of bounds or crude still
// does; a real name not heard needs no waiver; a real person's line heard differently is listed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fittedProblems } from '../src/stage/drafts.mjs'
import { fitProblems, isRecorded } from '../src/studio.mjs'
import { cleanup, ctxFor, fakeRepo, ID, makeEpisode, put } from './helpers.mjs'

const line = (id, status, { text = 'The usage limit was reached.', heard = 'Are you late, limit?', flags = [], real = false, missed = [] } = {}) => ({ id, who: 'sibyl', kind: 'say', text, as: null, heard: [{ text: heard, count: 4 }], score: { heard: 1, of: 5, min: 1 }, status, flags, real, missed, tried: [] })
const RESEARCH = 'packages/show/tools/data/voice-research.json'
const research = (words = [], patterns = []) => ({ words, patterns })
const word = (w, status, seen) => ({ word: w, status, voices: ['sibyl'], heard: [], spellings: [], works: status === 'works' ? [{ as: 'x', voices: ['sibyl'] }] : [], note: 'a note', seen })

async function check(lines, { files = {}, root: setup } = {}) {
  const root = fakeRepo()
  try {
    makeEpisode(root, { files: { 'production/drafts/talk/fit.json': { segment: 'talk', draft: 'talk', lines }, ...files } })
    setup?.(root)
    const ctx = await ctxFor(root, {})
    return fittedProblems(ctx, ['talk'])
  } finally {
    cleanup(root)
  }
}

test('fit: an unsayable line passes once its hard word is recorded for this draft, and fails until then', async () => {
  const lines = [line('limit', 'unsayable', { missed: [{ word: 'usage', count: 4 }] })]
  const before = await check(lines)
  assert.equal(before.failures.length, 1)
  assert.match(before.failures[0], /talk limit \(sibyl, unsayable\): .*its hard word is not recorded in packages\/show\/tools\/data\/voice-research\.json: npm run voice-research -- 002-2026-w47 --draft talk --add <word> --line limit/)
  const after = await check(lines, { root: (r) => put(r, RESEARCH, research([word('usage', 'cannot', [`${ID}/talk`])])) })
  assert.deepEqual(after.failures, [])
  assert.match(after.warnings.join('\n'), /talk: best effort, recorded \(for the owner's watch\): limit/)
  // recorded for another draft, or only as a spelling that works, is not recorded for this one
  assert.equal((await check(lines, { root: (r) => put(r, RESEARCH, research([word('usage', 'cannot', [`${ID}/other`])])) })).failures.length, 1)
  assert.equal((await check(lines, { root: (r) => put(r, RESEARCH, research([word('usage', 'works', [`${ID}/talk`])])) })).failures.length, 1)
  // a pattern with words covers it too
  const pattern = { pattern: 'A line of one or two words', note: 'a note', words: ['usage'], seen: [`${ID}/talk`] }
  assert.deepEqual((await check(lines, { root: (r) => put(r, RESEARCH, research([], [pattern])) })).failures, [])
})

test('fit: weak lines and a real name not heard are warnings; no waiver is needed for the name', async () => {
  const lines = [
    line('wobble', 'weak'),
    line('open', 'flagged', { text: 'Ana posts a chart.', heard: 'Anna posts a chart.', flags: ['name: Ana'], real: true, missed: [{ word: 'ana', count: 4 }] }),
    line('quiet', 'unsayable', { text: 'Ana.', heard: 'Anna.', flags: ['name: Ana'], real: true, missed: [{ word: 'ana', count: 4 }] }),
  ]
  const r = await check(lines)
  assert.deepEqual(r.failures, [])
  const w = r.warnings.join('\n')
  assert.match(w, /talk: 1 weak line \(wobble\)/)
  assert.match(w, /heard differently, caption exact: talk open \(sibyl, flagged: name: Ana\): "Ana posts a chart\." heard as "Anna posts a chart\."/)
  assert.match(w, /heard differently, caption exact: talk quiet/)
})

test('fit: a statement heard differently on a real person\'s line is a hard line, recorded, then listed', async () => {
  const lines = [line('claim', 'flagged', { text: 'It is not hard at least.', heard: 'It is not hard, at least, won\'t.', flags: ['statement: negation'], real: true })]
  assert.equal((await check(lines)).failures.length, 1)
  const r = await check(lines, { root: (root) => put(root, RESEARCH, research([], [{ pattern: "A comma inside a real person's line", note: 'a note', words: ['at least'], seen: [`${ID}/talk`] }])) })
  assert.deepEqual(r.failures, [])
  assert.match(r.warnings.join('\n'), /heard differently, caption exact: talk claim/)
})

test('fit: something heard that is alarming or crude still fails, recorded or not, listed first for the owner', async () => {
  const lines = [
    line('usage', 'unsayable', { missed: [{ word: 'usage', count: 4 }] }),
    line('calm', 'flagged', { text: 'This show is not a bum.', heard: 'This show is not a bomb.', flags: ['alarming: bomb'] }),
    line('sheet', 'flagged', { text: "Neither sees the other's sheet.", heard: 'Neither sees the other shit.', flags: ['crude: shit'] }),
  ]
  const r = await check(lines, { root: (root) => put(root, RESEARCH, research([word('bum', 'cannot', [`${ID}/talk`]), word('sheet', 'unstable', [`${ID}/talk`])])) })
  assert.equal(r.failures.length, 3)
  assert.match(r.failures[0], /^for the owner: talk calm \(sibyl, flagged: alarming: bomb\).*never accepted/)
  assert.match(r.failures[1], /^for the owner: talk sheet/)
  assert.match(r.failures[2], /talk usage .*not recorded/)
})

test('fit: an out-of-bounds subject heard blocks unless the draft\'s heard-waivers.json quotes it with a judgement', async () => {
  const lines = [line('wake', 'flagged', { text: 'Two people had a conversation.', heard: 'Two people had a funeral.', flags: ['out of bounds: funeral'] })]
  assert.match((await check(lines)).failures[0], /for the owner: talk wake/)
  const waiver = { talk: { wake: { heard: 'Two people had a funeral.', judgement: 'a mishearing of conversation, harmless' } } }
  assert.deepEqual((await check(lines, { files: { 'production/drafts/talk/heard-waivers.json': waiver } })).failures, [])
  const short = { talk: { wake: { heard: 'Two people had a funeral.', judgement: 'fine' } } }
  assert.equal((await check(lines, { files: { 'production/drafts/talk/heard-waivers.json': short } })).failures.length, 1)
})

test('fitProblems sorts lines by what happens to them; isRecorded matches whole words', () => {
  const fit = { lines: [line('a', 'ok'), line('b', 'weak'), line('c', 'unsayable', { missed: [{ word: 'usage', count: 4 }] }), line('d', 'flagged', { flags: ['crude: shit'] }), line('e', 'flagged', { flags: ['name: Bo'], real: true })] }
  const p = fitProblems(fit)
  assert.deepEqual(p.blocking.map((l) => l.id), ['d'])
  assert.deepEqual(p.hard.map((l) => l.id), ['c'])
  assert.deepEqual(p.weak.map((l) => l.id), ['b'])
  assert.deepEqual(p.different.map((l) => l.id), ['e'])
  const r = research([word('limit', 'cannot', ['002-x/talk'])])
  assert.equal(isRecorded(r, { text: 'The limit.' }, '002-x/talk'), true)
  assert.equal(isRecorded(r, { text: 'The limits.' }, '002-x/talk'), false)
})
