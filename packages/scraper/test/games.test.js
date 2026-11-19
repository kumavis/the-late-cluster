import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseResult, gameResults, personHandles } from '../src/games.js'
import { Consent } from '../src/consent.js'
import { normalizePost } from '../src/normalize.js'
import { loadConfig } from '../src/config.js'
import { post, profile, ACCOUNTS, chickenText } from './fixtures/synthetic.js'

const game = { ...loadConfig().games.games[0], account: 'chicken.example.test' }
const profs = new Map(['alpha', 'bravo', 'echo', 'ghost'].map((k) => [ACCOUNTS[k].handle, { ...profile(k) }]))

test('the shipped Top Chicken patterns read a real-format result', () => {
  const f = parseResult(chickenText('tbabb.example.test', 510, 'cee.example.test', 6186, 254, 754, 3003), loadConfig().games.games[0])
  assert.deepEqual({ ...f }, { winner: 'tbabb.example.test', likes: 510, recordHolder: 'cee.example.test', recordScore: 6186, posted: 254, eligible: 754, windowPosts: 3003 })
  assert.equal(parseResult('🏆 All-time Top Chicken leaderboard:\n1. a — 5 likes', game), null)
})

test('a result names the winner, resolves the winning post from the quote, and keeps the stats', () => {
  const win = post('alpha', 'w', { text: 'the winning bit', likes: 77, at: '2026-11-10T08:00:00Z' })
  const r = normalizePost(post('chicken', 'r1', { text: chickenText('alpha.example.test', 77), quote: win, at: '2026-11-10T14:05:00Z' }))
  const [res] = gameResults([r], game, { consent: new Consent(), profileByHandle: (h) => profs.get(h) })
  assert.equal(res.winner.handle, 'alpha.example.test')
  assert.equal(res.winner.followers, 1000)
  assert.equal(res.likes, 77)
  assert.equal(res.winningPost.text, 'the winning bit')
  assert.equal(res.winningPost.uri, win.uri)
  assert.deepEqual([res.recordHolder.handle, res.recordScore, res.posted, res.eligible, res.windowPosts], ['echo.example.test', 999, 12, 40, 300])
  assert.equal(res.recordHolder.small, true)
  assert.equal(res.text, r.text)
})

test('an excluded winner is left out but the result is still reported', () => {
  const consent = new Consent({ optOut: ['ghost.example.test'] })
  const win = post('ghost', 'w', { text: 'GHOST WIN' })
  let r = normalizePost(post('chicken', 'r2', { text: chickenText('ghost.example.test', 300), quote: win, mentions: [{ key: 'ghost', text: '@ghost.example.test' }] }))
  // the result post is mainly about the winner, so it is withheld from the digest; the game
  // section still reads it to report the day as "not included"
  assert.equal(consent.filterPost(r, { count: false }), null)
  r = consent.filterPost(r, { keepWithheld: true })
  assert.equal(r._withheld, 'possessive')
  const [res] = gameResults([r], game, { consent, profileByHandle: (h) => profs.get(h) })
  assert.deepEqual(res.winner, { excluded: true })
  assert.equal(res.winningPost, null)
  assert.equal(res.text, null, 'the result text names them, so it is not kept')
  assert.equal(res.likes, 300)
  assert.ok(!JSON.stringify(res).includes('ghost'))
  assert.ok(!JSON.stringify(res).includes(ACCOUNTS.ghost.did))
})

test('an excluded record holder is left out the same way', () => {
  const consent = new Consent({ optOut: [ACCOUNTS.echo.did] })
  consent.checkProfile(profile('echo'))
  const r = normalizePost(post('chicken', 'r3', { text: chickenText('alpha.example.test', 10, 'echo.example.test') }))
  const [res] = gameResults([r], game, { consent, profileByHandle: (h) => profs.get(h) })
  assert.deepEqual(res.recordHolder, { excluded: true })
  assert.equal(res.winner.handle, 'alpha.example.test')
  assert.equal(res.winningPost, null, 'no quote, nothing to resolve')
})

test('only the game account counts, and named people are collected for profile checks', () => {
  const fake = normalizePost(post('bravo', 'x', { text: chickenText('bravo.example.test', 9999) }))
  const real = normalizePost(post('chicken', 'r4', { text: chickenText('alpha.example.test', 5, 'Echo.Example.Test') }))
  assert.equal(gameResults([fake, real], game, { consent: new Consent(), profileByHandle: (h) => profs.get(h) }).length, 1)
  assert.deepEqual(personHandles([real], game), ['alpha.example.test', 'echo.example.test'])
})
