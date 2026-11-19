import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Consent } from '../src/consent.js'
import { loadConfig } from '../src/config.js'
import { compileTopics, topicsOf, storySensitivity } from '../src/sensitivity.js'
import { findShowPosts, correctionFlag, showMatcher } from '../src/show.js'
import { normalizePost } from '../src/normalize.js'
import { pruneCache, collapse } from '../src/run.js'
import { post, profile, ACCOUNTS, uriOf } from './fixtures/synthetic.js'

const cfg = loadConfig()
const consent = () => new Consent({ selfDeclaredPatterns: cfg.safety.selfDeclaredOptOut.patterns })

test('profile descriptions that opt out are matched, and ordinary ones are not', () => {
  const c = consent()
  const yes = [
    'no quotes, no screenshots', 'Please do not screenshot my posts', "don't QT me", 'No AI.', 'AI bots DNI',
    'I do not consent to my posts being used for AI training', 'Minors DNI', "don't use my art for AI", 'please do not repost',
  ]
  const no = ['I build synthesizers and post about them', 'quote of the day enthusiast', 'I dont use this account much', 'ex-AI researcher', 'clips from my stream']
  for (const d of yes) assert.equal(c.descriptionOptsOut(d), true, d)
  for (const d of no) assert.equal(c.descriptionOptsOut(d), false, d)
})

test('a self-declared opt-out is excluded exactly like the opt-out list, and counted', () => {
  const c = consent()
  assert.equal(c.checkProfile(profile('quiet')), true)
  assert.equal(c.checkProfile(profile('alpha')), false)
  assert.equal(c.excludedDid(ACCOUNTS.quiet.did), true)
  assert.equal(c.stats.selfDeclaredAccounts, 1)
  assert.equal(c.filterPost(normalizePost(post('quiet', 'q1', { text: 'synths' }))), null)
  assert.equal(c.stats.postsDroppedSelfDeclared, 1)
  const quoting = c.filterPost(normalizePost(post('alpha', 'a1', { text: 'this is the best synth patch of the year', quote: post('quiet', 'q2') })))
  assert.equal(quoting.quote.state, 'removed')
  assert.equal(quoting.text, 'this is the best synth patch of the year')
  // quoting them and naming them: in conversation with an excluded account, withheld whole
  const naming = c.filterPost(normalizePost(post('alpha', 'a2', { text: 'lol @quiet.example.test', quote: post('quiet', 'q3'), mentions: [{ key: 'quiet', text: '@quiet.example.test' }] })))
  assert.equal(naming, null)
  assert.equal(c.stats.postsWithheldNamingExcluded, 1)
})

test('a request to the show is an opt-out from then on', () => {
  const c = consent()
  c.declareShowRequest(ACCOUNTS.echo.did, 'echo.example.test')
  c.declareShowRequest(ACCOUNTS.echo.did, 'echo.example.test')
  assert.equal(c.stats.showOptOutRequests, 1)
  assert.equal(c.filterPost(normalizePost(post('echo', 'e1'))), null)
  assert.equal(c.stats.postsDroppedShowRequest, 1)
})

test('sensitivity terms match whole words only', () => {
  const t = compileTopics(cfg.safety.sensitivity.topics)
  assert.deepEqual(topicsOf('the election is rigged', t), ['partisan politics'])
  assert.deepEqual(topicsOf('my son made this', t), ['minors'])
  assert.deepEqual(topicsOf('he studies bodies of water', t), [])
  assert.deepEqual(topicsOf('I will still be here', t), [])
  assert.deepEqual(topicsOf('trans-pacific cable', t), [])
  assert.deepEqual(topicsOf('a threat model for the bot', t), [])
  assert.deepEqual(topicsOf('', t), [])
})

test('a story is out of bounds by its lead, by share, or by count', () => {
  const P = (sensitive, member = true) => ({ sensitive, member })
  assert.deepEqual(storySensitivity([P(['health']), P([])], [P(['health'])])?.topics, ['health'])
  assert.equal(storySensitivity([P([]), P([]), P([]), P([]), P([]), P(['grief and disaster'])], [P([])]), null)
  assert.deepEqual(storySensitivity([P([]), P(['minors']), P([]), P([])], [P([])], { minShare: 0.2 })?.topics, ['minors'])
  const many = [...Array(20)].map(() => P([], true)).concat([P(['identity'], false), P(['identity'], false), P(['identity'], false)])
  assert.deepEqual(storySensitivity(many, [P([])], { minShare: 0.2, minPosts: 3 })?.counts, { identity: 3 })
})

test('posts about the show: names, links, replies and quotes; requests and corrections', () => {
  const show = { handles: ['show.example.test'], phrases: ['\\bthe late cluster\\b', '\\blarry nx\\b'], linkPatterns: ['/the-late-cluster\\b'] }
  const P = (k, r, o) => normalizePost(post(k, r, o))
  const posts = [
    P('alpha', 's1', { text: 'new Larry Nx episode is out' }),
    P('bravo', 's2', { text: 'watch', external: { uri: 'https://pages.example.test/the-late-cluster/episodes/002/', title: 'Episode 2' } }),
    P('charlie', 'r1', { text: 'please leave me out of this', reply: { root: uriOf('alpha', 's1') } }),
    P('delta', 'q1', { text: 'actually that was my bot, not me', quote: post('alpha', 's1', { text: 'new Larry Nx episode is out' }) }),
    P('echo', 'm1', { text: 'hey @show.example.test love it' }),
    P('foxtrot', 'x', { text: 'unrelated cluster talk' }),
  ]
  const { about, requests } = findShowPosts(posts, show, cfg.safety)
  assert.deepEqual(about.get(uriOf('alpha', 's1')), ['names the show'])
  assert.deepEqual(about.get(uriOf('bravo', 's2')), ['links the show'])
  assert.deepEqual(about.get(uriOf('charlie', 'r1')), ['replies to a post about the show'])
  assert.deepEqual(about.get(uriOf('delta', 'q1')), ['quotes a post about the show'])
  assert.deepEqual(about.get(uriOf('echo', 'm1')), ["mentions the show's account"])
  assert.equal(about.has(uriOf('foxtrot', 'x')), false)
  assert.deepEqual(requests.map((r) => r.handle), ['charlie.example.test'])
  assert.equal(correctionFlag('that was my bot, it wasn\'t me', cfg.safety), true)
  assert.equal(correctionFlag("i never said that", cfg.safety), true)
  assert.equal(correctionFlag('my favorite bit in the whole thing (i didnt write the jokes)', cfg.safety), false, 'praise is not a correction')
  assert.equal(correctionFlag('actually this rules', cfg.safety), false)
  assert.equal(correctionFlag('loved it', cfg.safety), false)
  assert.deepEqual(showMatcher({})(posts[0]), [])
})

test('the response cache can be pruned without touching the outputs', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'scraper-prune-'))
  try {
    await mkdir(join(dir, '.cache', 'http'), { recursive: true })
    await writeFile(join(dir, '.cache', 'http', 'x.json'), '{}')
    await writeFile(join(dir, 'digest.md'), '# hi')
    await pruneCache(dir)
    assert.deepEqual(await readdir(dir), ['digest.md'])
    await pruneCache(dir) // idempotent
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('repeated warnings are collapsed with a count', () => {
  assert.deepEqual(collapse(['a', 'b', 'a', 'a']), ['a (3 times)', 'b'])
})

test('the CLI accepts --since/--until and defaults a range to data/ranges/<label>', async () => {
  const { parseCli, defaultOut } = await import('../src/run.js')
  const a = parseCli(['--since', '2026-11-13', '--until', '2026-11-16T12:00Z', '--out', 'data/weeks/2026-W47'])
  assert.deepEqual([a.since, a.until, a.out], ['2026-11-13', '2026-11-16T12:00Z', 'data/weeks/2026-W47'])
  assert.throws(() => parseCli(['--from', '2026-11-13']), /Unknown option/)
  assert.equal(defaultOut({ kind: 'range', label: '2026-11-13T0000Z_2026-11-19T0831Z' }, '/repo'), '/repo/data/ranges/2026-11-13T0000Z_2026-11-19T0831Z')
  assert.equal(defaultOut({ kind: 'week', label: '2026-W46' }, '/repo'), '/repo/data/weeks/2026-W46')
})
