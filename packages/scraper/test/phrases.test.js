import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spikedPhrases } from '../src/phrases.js'
import { tokenize, phrasesOf } from '../src/text.js'

const mk = (author, text, day = '2026-11-10') => ({ uri: `at://${author}/app.bsky.feed.post/${Math.random().toString(36).slice(2)}`, authorDid: author, text, time: `${day}T12:00:00.000Z`, tags: [] })

test('tokenize drops urls, mentions and numbers', () => {
  assert.deepEqual(tokenize("Check https://x.test/a @bob.test it's 2026 the Crow's crown!"), ['check', 'it', 'the', 'crow', 'crown'])
})

test('phrases never start or end with a stopword', () => {
  const p = phrasesOf('the website bot built it')
  assert.ok(p.has('website bot'))
  assert.ok(p.has('website bot built'))
  assert.ok(!p.has('the website'))
  assert.ok(!p.has('built it'))
})

test('a phrase many members start using this week spikes; an everyday word does not', () => {
  const win = []
  const base = []
  for (const a of ['a1', 'a2', 'a3', 'a4', 'a5']) {
    win.push(mk(a, 'press e to leave the simcluster documentary', ['2026-11-10', '2026-11-11', '2026-11-13'][a.charCodeAt(1) % 3]))
    win.push(mk(a, 'coffee is good'))
    for (const day of ['2026-10-20', '2026-10-27', '2026-11-03']) base.push(mk(a, 'coffee again', day))
  }
  const { hasBaseline, phrases } = spikedPhrases(win, base, 3, { minAuthors: 3, minRatio: 2 })
  assert.equal(hasBaseline, true)
  const terms = phrases.map((p) => p.term)
  assert.ok(terms.some((t) => t.includes('simcluster')), terms.join(','))
  assert.ok(!terms.includes('coffee'))
  // subsumed shorter grams are not listed separately
  assert.ok(!terms.includes('documentary'))
  assert.equal(terms.filter((t) => t.includes('simcluster')).length, 1, 'fragments of one catchphrase are folded into variants')
  const top = phrases[0]
  assert.equal(top.authors, 5)
  assert.equal(top.isNew, true)
  assert.ok(top.days >= 3)
})

test('one account repeating itself is not a trend', () => {
  const win = Array.from({ length: 20 }, () => mk('solo', 'buy my coin buy my coin'))
  const { phrases } = spikedPhrases(win, [], 0, { minAuthors: 3 })
  assert.equal(phrases.length, 0)
})

test('output is deterministic regardless of input order', () => {
  const win = []
  for (const a of ['a', 'b', 'c', 'd']) for (const t of ['crow of claims', 'top chicken tonight', 'agreed yes totally']) win.push({ ...mk(a, t), uri: `at://${a}/p/${t}` })
  const one = spikedPhrases(win, [], 0, {}).phrases.map((p) => p.term)
  const two = spikedPhrases([...win].reverse(), [], 0, {}).phrases.map((p) => p.term)
  assert.deepEqual(one, two)
})

test('"X week" declarations: named weeks, not ordinary ones', async () => {
  const { weekDeclarations } = await import('../src/phrases.js')
  const P = (a, text, time) => ({ uri: `at://${a}/p/${time}`, authorDid: a, text, time })
  const out = weekDeclarations([
    P('a', 'catoid week rolls smoothly into chimera vocal synth week', '2026-11-09T10:00:00Z'),
    P('b', 'still chimera-vocal-synth week over here', '2026-11-10T10:00:00Z'),
    P('c', 'what a week. this week was long. last week too', '2026-11-10T11:00:00Z'),
    P('d', 'crow week', '2026-11-11T10:00:00Z'),
    P('e', 'crow week continues', '2026-11-12T10:00:00Z'),
    P('f', 'my goblin week', '2026-11-12T11:00:00Z'),
  ])
  const terms = out.map((w) => w.term)
  assert.deepEqual(terms, ['chimera vocal synth week', 'crow week', 'catoid week'])
  const cv = out[0]
  assert.equal(cv.authors, 2)
  assert.equal(cv.first.authorDid, 'a')
  assert.equal(out.find((w) => w.term === 'crow week').declared, false)
})
