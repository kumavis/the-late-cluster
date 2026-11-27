// Someone else's post that names an excluded account (bible R11: "appears in no form").
// Invented accounts only (fixtures/synthetic.js). See README "Naming an excluded account".
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, readFile, readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Consent, MARKER } from '../src/consent.js'
import { normalizePost, publicPost } from '../src/normalize.js'
import { analyze } from '../src/digest.js'
import { renderMarkdown } from '../src/render-md.js'
import { writeOutputs } from '../src/run.js'
import { lookup } from '../src/lookup.js'
import { loadConfig } from '../src/config.js'
import { isoWeekWindow } from '../src/window.js'
import { post, uriOf, ACCOUNTS, actor, profile, chickenText } from './fixtures/synthetic.js'

const cfg = loadConfig()
const naming = cfg.safety.excludedMentions
const G = ACCOUNTS.ghost // on the opt-out list by handle
const L = ACCOUNTS.lantern // self-labelled !no-unauthenticated

/** A consent filter that has seen the excluded accounts the way a run would. */
function consent() {
  const c = new Consent({ optOut: [G.handle], blockedLabels: cfg.scoring.blockedLabels, selfDeclaredPatterns: cfg.safety.selfDeclaredOptOut.patterns, naming })
  c.check(actor('ghost'))
  c.check(actor('lantern'))
  // quiet's bio asks not to be quoted, which excludes nobody (bible R11); it is excluded here
  // because it asked the show itself
  c.checkProfile(profile('quiet'))
  c.declareShowRequest(ACCOUNTS.quiet.did, ACCOUNTS.quiet.handle)
  return c
}
const filter = (c, key, rkey, o) => c.filterPost(normalizePost(post(key, rkey, o)))
/** Every identifier the excluded accounts are known by. */
const IDS = [G.did, G.handle, G.displayName, L.did, L.handle, L.displayName, ACCOUNTS.quiet.did, ACCOUNTS.quiet.handle, 'spectre.example.test', 'Ghostly Renamed']
const leaks = (value) => { const s = typeof value === 'string' ? value : JSON.stringify(value); return IDS.filter((x) => s.toLowerCase().includes(x.toLowerCase())) }
const isRedacted = (p) => { assert.equal(p.redacted, true); assert.deepEqual(p.outOfBounds.topics, ['redacted']); assert.equal(p.outOfBounds.rule, 'R11') }

test('a handle in plain text, with or without @, is replaced and the post marked redacted', () => {
  const c = consent()
  const a = filter(c, 'alpha', 'h1', { text: 'I keep seeing ghost.example.test in my feed and the synth crowd loves it' })
  assert.equal(a.text, `I keep seeing ${MARKER} in my feed and the synth crowd loves it`)
  isRedacted(a)
  const b = filter(c, 'alpha', 'h2', { text: 'the synth thread with @lantern.example.test is still going this morning' })
  assert.equal(b.text, `the synth thread with @${MARKER} is still going this morning`)
  isRedacted(b)
  assert.deepEqual(leaks(publicPost(a)), [])
  assert.equal(c.stats.mentionsRedacted, 2)
  assert.equal(c.stats.references.handle, 2)
})

test('a DID in text is replaced', () => {
  const c = consent()
  const p = filter(c, 'alpha', 'd1', { text: `the record at ${L.did} keeps coming back in the firehose today` })
  assert.equal(p.text, `the record at ${MARKER} keeps coming back in the firehose today`)
  isRedacted(p)
})

test('a display name: replaced in a longer post, withheld when the post opens with it', () => {
  const c = consent()
  const p = filter(c, 'alpha', 'n1', { text: 'honestly the synth patches from Marigold Lantern this week are something else' })
  assert.equal(p.text, `honestly the synth patches from ${MARKER} this week are something else`)
  isRedacted(p)
  assert.equal(filter(c, 'alpha', 'n2', { text: 'Marigold Lantern has the best synth patches this week, honestly' }), null)
  assert.equal(c.stats.withheldBecause.opensWithIt, 1)
})

test('mention facets and link facets are replaced by their spans; the mention is dropped', () => {
  const c = consent()
  const raw = normalizePost(post('alpha', 'f1', {
    text: 'two good ones today: @ghost.example.test and also bsky.app/profile/lante... for the drums',
    mentions: [{ key: 'ghost', text: '@ghost.example.test' }],
    linkFacets: [{ text: 'bsky.app/profile/lante...', uri: `https://bsky.app/profile/${L.handle}/post/3abc` }],
  }))
  const p = c.filterPost(raw)
  assert.equal(p.text, `two good ones today: @${MARKER} and also ${MARKER} for the drums`)
  assert.deepEqual(p._mentions, [])
  isRedacted(p)
  assert.deepEqual(leaks(publicPost(p)), [])
})

test("links to the account's profile, posts or own domain are dropped and their text replaced", () => {
  const c = consent()
  const p = filter(c, 'alpha', 'l1', {
    text: 'the full patch notes are up at https://ghost.example.test/patches if you want them (and here)',
    external: { uri: 'https://ghost.example.test/patches', title: 'Patches' },
    linkFacets: [{ text: 'here', uri: `https://bsky.app/profile/${L.did}` }],
  })
  assert.equal(p.text, `the full patch notes are up at ${MARKER} if you want them (and ${MARKER})`)
  assert.deepEqual(p.links, [])
  isRedacted(p)
})

test('a quoted record by the account is removed; so is a quoted record that names it', () => {
  const c = consent()
  const byIt = filter(c, 'alpha', 'q1', { text: 'this is the best synth patch of the year', quote: post('lantern', 'x1', { text: 'LANTERN WORDS' }) })
  assert.deepEqual(byIt.quote, { uri: null, state: 'removed' })
  assert.equal(byIt.text, 'this is the best synth patch of the year')
  const naming = filter(c, 'alpha', 'q2', { text: 'this is the best synth patch of the year', quote: post('bravo', 'b1', { text: 'stole this patch from ghost.example.test and I regret nothing at all' }) })
  assert.deepEqual(naming.quote, { uri: null, state: 'removed' })
  assert.equal(naming._quoted, null)
  assert.equal(c.stats.quotesStrippedNamingExcluded, 1)
  assert.deepEqual(leaks(publicPost(naming)), [])
})

test('a reply to the account keeps its text when it does not name it, and is withheld when it does', () => {
  const c = consent()
  const plain = filter(c, 'alpha', 'r1', { text: 'agreed, the drums are the best part', reply: { root: uriOf('lantern', 'x2') } })
  assert.equal(plain.reply.hidden, true)
  assert.equal(plain.text, 'agreed, the drums are the best part')
  assert.equal(plain.redacted, undefined)
  // addressed to them by name: a conversation with an excluded account
  assert.equal(filter(c, 'alpha', 'r2', { text: 'Marigold Lantern; hello to you too;', reply: { root: uriOf('lantern', 'x2') } }), null)
  assert.equal(c.stats.withheldBecause.conversation, 1)
})

test('alt text naming the account withholds the post: a screenshot cannot be redacted', () => {
  const c = consent()
  assert.equal(filter(c, 'alpha', 'i1', { text: 'this made my whole day, look at it', images: ['Generated quote card. User: Marigold Lantern Content: LANTERN WORDS'] }), null)
  assert.equal(c.stats.withheldBecause.image, 1)
})

test('link titles and list cards are redacted; a card by the account is dropped', () => {
  const c = consent()
  const t = filter(c, 'alpha', 't1', { text: 'a good read on patch design this week', external: { uri: 'https://blog.example.test/x', title: 'Interview with Marigold Lantern on patches' } })
  assert.equal(t.links[0].title, `Interview with ${MARKER} on patches`)
  isRedacted(t)
  const card = filter(c, 'alpha', 'k1', { text: 'a list of synth people worth following here', card: { uri: `at://${L.did}/app.bsky.graph.list/abc`, name: 'synths' } })
  assert.equal(card.embedded, null)
  const named = filter(c, 'alpha', 'k2', { text: 'a list of synth people worth following here', card: { uri: `at://${ACCOUNTS.bravo.did}/app.bsky.graph.list/abc`, name: 'friends of ghost.example.test' } })
  assert.equal(named.embedded.name, `friends of ${MARKER}`)
})

test('matched by DID first, then by every handle and display name seen for it', () => {
  const c = consent()
  // the same DID seen later under a new handle and display name
  c.check({ did: G.did, handle: 'spectre.example.test', displayName: 'Ghostly Renamed' })
  assert.equal(filter(c, 'alpha', 'm1', { text: 'did you see what spectre.example.test posted about synths this week' }).text, `did you see what ${MARKER} posted about synths this week`)
  assert.equal(filter(c, 'alpha', 'm2', { text: 'did you see what ghost.example.test posted about synths this week' }).text, `did you see what ${MARKER} posted about synths this week`)
  assert.equal(filter(c, 'alpha', 'm3', { text: 'did you see what Ghostly Renamed posted about synths this week' }).text, `did you see what ${MARKER} posted about synths this week`)
  // excluded by its profile, and named by its handle
  assert.equal(filter(c, 'alpha', 'm4', { text: 'did you see what quiet.example.test posted about synths this week' }).text, `did you see what ${MARKER} posted about synths this week`)
})

test('a display name that is an ordinary word counts only in conversation with its account', () => {
  const c = new Consent({ naming })
  c.check({ did: 'did:plc:moon00000000000000000099', handle: 'moon.example.test', displayName: 'Moon', labels: [{ val: '!no-unauthenticated' }] })
  c.check({ did: 'did:plc:thunder00000000000000098', handle: 'thunder.example.test', displayName: 'Thunder', labels: [{ val: '!no-unauthenticated' }] })
  // "Thunder" is written by three people who are not talking to that account: a word here
  const words = ['alpha', 'bravo', 'charlie'].map((k, i) => normalizePost(post(k, 'w' + i, { text: 'thunder over the lake again tonight' })))
  c.calibrateNames(words)
  assert.ok(c.commonNames.has('thunder'))
  assert.equal(c.filterPost(words[0]).text, 'thunder over the lake again tonight')
  assert.equal(filter(c, 'delta', 'w4', { text: 'the moon is huge over the lake tonight' }).text, 'the moon is huge over the lake tonight', 'too short to match outside a conversation')
  // in a reply to the account, the same words are its name
  const reply = (key, rkey, text, did) => c.filterPost(normalizePost(post(key, rkey, { text, reply: { root: `at://${did}/app.bsky.feed.post/x` } })))
  assert.equal(reply('delta', 'w5', 'you know what, Moon, the synth patch is great', 'did:plc:moon00000000000000000099'), null)
  assert.equal(reply('delta', 'w6', 'the lake was loud last night and the synth patch from Thunder is great', 'did:plc:thunder00000000000000098'), null)
})

test('a list cut off inside an entry that could be an excluded name is redacted, otherwise left alone', () => {
  const c = consent()
  const board = (last) => `All-time Top Chicken leaderboard\n1. alpha.example.test — 900 likes\n2. bravo.example.test — 800 likes\n3. ${last}`
  const cut = filter(c, 'chicken', 'lb1', { text: board('lan') })
  assert.equal(cut.text, board(MARKER))
  isRedacted(cut)
  assert.equal(c.stats.references.fragment, 1)
  assert.equal(filter(c, 'chicken', 'lb2', { text: board('zz') }).text, board('zz'), 'no excluded handle or name starts that way')
  const whole = 'my top three\n1. alpha.example.test — 900 likes\n2. bravo.example.test — 800 likes\n3. charlie.example.test — 700 likes'
  assert.equal(filter(c, 'alpha', 'lb3', { text: whole }).text, whole, 'a complete list is not a fragment')
})

test('the final check redacts any DID or handle a rule missed, and marks the post', () => {
  const c = consent()
  const digest = { coverage: { leftSample: [L.handle, 'alpha.example.test'] }, authors: { [L.did]: { handle: 'x' } }, sections: { x: [{ uri: uriOf('alpha', 's'), text: `hello ${G.handle}` }] } }
  const n = c.scrub(digest)
  assert.equal(n, 3)
  assert.deepEqual(digest.coverage.leftSample, [MARKER, 'alpha.example.test'])
  assert.equal(digest.authors[L.did], undefined)
  assert.equal(digest.sections.x[0].text, `hello ${MARKER}`)
  isRedacted(digest.sections.x[0])
  assert.equal(c.stats.outputScrubbed, 3)
})

// ---- the regression: a third party's post naming an excluded winner, and a cut-off list

const W = isoWeekWindow('2026-W47') // 16-23 Nov 2026
const at = (d) => `2026-11-${d}T14:05:00.000Z`

function week() {
  const win = post('lantern', 'win', { text: 'LANTERN WINNING POST', at: at(16), likes: 57 })
  const board = (ninth) => `All-time Top Chicken leaderboard\n1. echo.example.test — 999 likes\n2. alpha.example.test — 300 likes\n3. bravo.example.test — 200 likes\n4. ${ninth}`
  return [
    post('alpha', 'hello', { text: 'a perfectly ordinary post about synth patches and drums', at: at(16), likes: 5 }),
    post('chicken', 'res', { text: chickenText(L.handle, 57), quote: win, mentions: [{ key: 'lantern', text: '@' + L.handle }], at: at(17) }),
    post('chicken', 'lb-mon', { text: board('c'), at: at(16) }),
    post('chicken', 'lb-tue', { text: board('l'), at: at(17) }),
    post('market', 'void', { text: `⚠️ Round 2026-11-16 VOIDED — the announced winner (${L.handle}) wasn't in our tracked field, so every position was refunded at cost.\n\nNobody loses a cent on a race we couldn't score.`, at: at(17), likes: 1 }),
    post('market', 'open', { text: 'Fresh round is open, place your bets on tomorrow', at: at(18), likes: 1 }),
    post('bravo', 'reply', { text: 'Marigold Lantern; hello to you too;', reply: { root: win.uri }, at: at(18) }),
    post('charlie', 'qt', { text: '“Replies disabled” lol', quote: win, linkFacets: [], at: at(18) }),
  ]
}

async function runWeek() {
  const c = new Consent({ blockedLabels: cfg.scoring.blockedLabels, selfDeclaredPatterns: cfg.safety.selfDeclaredOptOut.patterns, naming })
  const games = structuredClone(cfg.games)
  games.games[0].account = ACCOUNTS.chicken.did
  const posts = week().map((v) => normalizePost(v, { source: 'author' }))
  const members = new Set(['alpha', 'bravo', 'charlie', 'echo', 'chicken'].map((k) => ACCOUNTS[k].did))
  const d = analyze({ posts, memberDids: members, window: W, baselineStart: W.start - 21 * 86_400_000, baselineWeeks: 3, consent: c, scoring: cfg.scoring, safety: cfg.safety, show: cfg.show, games })
  const digest = { format: 'late-cluster-digest/1', window: d.window, run: { generatedAt: '2026-11-20T00:00:00Z', warnings: [] }, settings: { storiesInMarkdown: 15, postsPerStory: 4 }, stats: { cluster: {}, posts: {}, excluded: c.stats }, overview: d.overview, sections: d.sections, stories: d.stories, appendices: d.appendices, members: [], authors: d.authors, ledger: {} }
  const scrubbed = c.scrub(digest) + c.scrub(d.posts)
  const dir = await mkdtemp(join(tmpdir(), 'naming-'))
  await writeOutputs(dir, {
    'posts.jsonl': d.posts.map((p) => JSON.stringify(p)).join('\n') + '\n',
    'digest.json': JSON.stringify(digest, null, 2) + '\n',
    'digest.md': renderMarkdown(digest),
  })
  return { c, d, digest, dir, scrubbed }
}

test('regression: an excluded winner is not identifiable from any other post in the digest', async () => {
  const { d, dir, scrubbed, c } = await runWeek()
  try {
    const files = Object.fromEntries(await Promise.all(['posts.jsonl', 'digest.json', 'digest.md'].map(async (f) => [f, await readFile(join(dir, f), 'utf8')])))
    for (const [f, text] of Object.entries(files)) assert.deepEqual(leaks(text), [], `${f} names the excluded account`)
    assert.equal(scrubbed, 0, 'the filter caught everything; the final check had nothing left')
    assert.deepEqual((await readdir(dir)).sort(), ['digest.json', 'digest.md', 'posts.jsonl'], 'no temporary files left behind')
    // the voided-round post is about the winner: withheld whole
    assert.ok(!d.posts.some((p) => p.uri === uriOf('market', 'void')))
    assert.ok(d.posts.some((p) => p.uri === uriOf('market', 'open')), "the account's other posts are kept")
    // so are the greeting addressed to them and the quote of their post
    assert.ok(!d.posts.some((p) => p.uri === uriOf('bravo', 'reply')))
    // the result is still reported, as "not included", without its text
    const day = d.sections.games[0].segment.standings.find((s) => s.time.startsWith('2026-11-17'))
    assert.deepEqual(day.winner, { excluded: true })
    assert.ok(!d.posts.some((p) => p.uri === uriOf('chicken', 'res')))
    // the leaderboard posts: the cut-off entry that could be them is replaced, the other left alone
    const tue = d.posts.find((p) => p.uri === uriOf('chicken', 'lb-tue'))
    assert.ok(tue.text.endsWith(`4. ${MARKER}`))
    assert.equal(tue.redacted, true)
    const mon = d.posts.find((p) => p.uri === uriOf('chicken', 'lb-mon'))
    assert.ok(mon.text.endsWith('4. c'))
    assert.equal(mon.redacted, undefined)
    assert.ok(files['digest.md'].includes('redacted: names an account that is not included') || !files['digest.md'].includes(MARKER), 'redacted text is labelled where it is shown')
    assert.ok(c.stats.postsWithheldNamingExcluded >= 3)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('lookup: no query finds the excluded account, and a redacted record says so', async () => {
  const { dir } = await runWeek()
  try {
    const ask = (...argv) => { let out = ''; const code = lookup([...argv, '--dir', dir], { write: (s) => { out += s } }); return { code, out } }
    for (const q of [['--text', L.handle], ['--text', 'Marigold Lantern'], ['--text', 'VOIDED'], ['--author', L.handle], ['--author', L.did], ['--uri', uriOf('market', 'void')], ['--uri', uriOf('lantern', 'win')]]) {
      const r = ask(...q)
      assert.notEqual(r.code, 0, `${q.join(' ')} found something: ${r.out}`)
      assert.deepEqual(leaks(r.out), [])
    }
    const tue = ask('--uri', uriOf('chicken', 'lb-tue'), '--full')
    assert.equal(tue.code, 0)
    const rec = JSON.parse(tue.out)
    assert.equal(rec.redacted, true)
    assert.deepEqual(rec.outOfBounds.topics, ['redacted'])
    assert.deepEqual(leaks(ask('--author', 'chicken.example.test', '--limit', '50').out), [])
    assert.deepEqual(leaks(ask('--thread', uriOf('chicken', 'lb-tue')).out), [])
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
