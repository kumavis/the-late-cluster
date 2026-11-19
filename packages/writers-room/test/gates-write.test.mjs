import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spokenWords, writeGuestLines, writeLabels, writeLength, writeNames, writeOptOut, writeRenders, writeRundown, writeSources } from '../src/gates/write.mjs'
import { cleanup, ctxFor, fakeRepo, fakeTools, makeEpisode, plan, POSTS, SCRIPT_CHAT, SCRIPT_COLD, SOURCES } from './helpers.mjs'

const base = () => ({
  'production/plan.json': plan(),
  'production/sources.json': SOURCES,
  'segments/cold-open/script.js': SCRIPT_COLD,
  'segments/chat/script.js': SCRIPT_CHAT,
})
async function run(gateFn, files = {}, { tools, network, drop = [], meta } = {}) {
  const root = fakeRepo()
  try {
    const all = { ...base(), ...files }
    for (const d of drop) delete all[d]
    makeEpisode(root, { files: all, meta })
    return await gateFn(await ctxFor(root, { tools: tools?.(root), network }))
  } finally {
    cleanup(root)
  }
}
const ok = (r) => assert.equal(r.ok, true, r.failures.join('\n'))
const fails = (r, re) => {
  assert.equal(r.ok, false, `expected a failure matching ${re}`)
  assert.ok(r.failures.some((f) => re.test(f)), `no failure matching ${re}:\n${r.failures.join('\n')}`)
}
const chat = (beats) => `export default { id: 'chat', title: 'T', beats: [\n${beats}\n] }\n`

test('write.rundown: the rundown matches the plan; title, description, draft', async () => {
  ok(await run(writeRundown))
  fails(await run(writeRundown, {}, { meta: { rundown: ['cold-open'] } }), /plan\.json plans \[cold-open, chat\]/)
  fails(await run(writeRundown, {}, { meta: { title: 'Week 2026-W47' } }), /set "title"/)
  fails(await run(writeRundown, {}, { meta: { status: 'published' } }), /must stay "draft"/)
  fails(await run(writeRundown, {}, { drop: ['segments/chat/script.js'] }), /chat\/script\.js is missing/)
})

test('write.renders: the renderer is the validator', async () => {
  ok(await run(writeRenders, {}, { tools: (r) => fakeTools(r) }))
  fails(await run(writeRenders, {}, { tools: (r) => fakeTools(r, { renderFail: true }) }), /exited 1: ✗ chat: unknown cast id/)
})

test('write.sources: accounts, posts and links come from the digest; quoted text is exact', async () => {
  ok(await run(writeSources))
  fails(await run(writeSources, {}, { drop: ['production/sources.json'] }), /sources\.json is missing/)
  const s = (over) => ({ 'production/sources.json': { ...SOURCES, ...over } })
  fails(await run(writeSources, s({ accounts: [...SOURCES.accounts, { handle: 'stranger.test', role: 'quoted' }] })), /stranger\.test is not in the week's digest/)
  fails(await run(writeSources, s({ accounts: [...SOURCES.accounts, { handle: 'zed.example', role: 'quoted' }] })), /invented \(\.example\)/)
  fails(await run(writeSources, s({ posts: [{ ...SOURCES.posts[1], text: 'Claim.' }] })), /not the post's text \(rule R4\)/)
  fails(await run(writeSources, s({ posts: [...SOURCES.posts, { uri: POSTS.oob.uri, author: 'dee.test', use: 'card' }], accounts: [...SOURCES.accounts, { handle: 'dee.test', role: 'quoted' }] })), /out of bounds \(rule R10\)/)
  fails(await run(writeSources, s({ links: [{ url: 'https://elsewhere.test' }] })), /not linked or named by any post/)
  fails(await run(writeSources, s({ accounts: SOURCES.accounts.filter((a) => a.handle !== 'bo.test') })), /guest bo \(bo\.test\) speaks .* not in sources\.json|author bo\.test is not in "accounts"/)
})

test('write.guest-lines: a verbatim thread performed exactly and in order passes', async () => ok(await run(writeGuestLines)))

test('write.guest-lines: a guest line with no source comment fails (R3)', async () => {
  fails(await run(writeGuestLines, { 'segments/chat/script.js': SCRIPT_CHAT.replace(` // verbatim: ${POSTS.boReply.uri}`, '') }), /bo says "claim\." with no source comment \(rule R3\)/)
})

test('write.guest-lines: verbatim caption must equal the post; respell only in as', async () => {
  fails(await run(writeGuestLines, { 'segments/chat/script.js': SCRIPT_CHAT.replace("text: 'claim.'", "text: 'Claim!'") }), /not .* verbatim: differs/)
  ok(await run(writeGuestLines, { 'segments/chat/script.js': SCRIPT_CHAT.replace("text: 'claim.'", "text: 'claim.', as: 'klaym.'") }))
  fails(await run(writeGuestLines, { 'segments/chat/script.js': SCRIPT_CHAT.replace("text: 'claim.'", "text: 'claim.', as: 'I claim it.'") }), /adds words/)
  const cut = { ...SOURCES, lines: SOURCES.lines.map((r) => (r.line === 'p2' ? { ...r, setup: { line: 'p1', who: 'ana', text: 'concept: a talk show…' } } : r)) }
  ok(await run(writeGuestLines, { 'segments/chat/script.js': SCRIPT_CHAT.replace("text: 'concept: a talk show, but the host is a throat'", "text: 'concept: a talk show…'"), 'production/sources.json': cut }))
})

test('write.guest-lines: a guest may only speak their own posts', async () => {
  const src = chat(`  { say: 'bo', text: 'concept: a talk show, but the host is a throat' }, // verbatim: ${POSTS.anaClaim.uri}`)
  fails(await run(writeGuestLines, { 'segments/chat/script.js': src, 'production/plan.json': plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }] }) }), /bo \(bo\.test\) is given ana\.test's post/)
})

test('write.guest-lines: a verbatim thread out of order, or with a house character speaking a post, fails', async () => {
  const swapped = chat(`  { say: 'bo', text: 'claim.' }, // verbatim: ${POSTS.boReply.uri}\n  { say: 'ana', text: 'concept: a talk show, but the host is a throat' }, // verbatim: ${POSTS.anaClaim.uri}`)
  fails(await run(writeGuestLines, { 'segments/chat/script.js': swapped }), /perform \[.*b1, .*a1\] but thread\.posts is/)
  const house = SCRIPT_CHAT.replace("{ say: 'bot', id: 'built', text: 'Built it.' },", `{ say: 'larry', text: 'what else is like this 🦜 https://thing.test' }, // verbatim: ${POSTS.anaAgain.uri}`)
  fails(await run(writeGuestLines, { 'segments/chat/script.js': house }), /larry \(house\) speaks a real post in the verbatim thread/)
})

const SETUP = "  { say: 'larry', id: 'q', text: 'And Ana?' },"
const cpRecord = (context = POSTS.anaAgain.uri) => ({ segment: 'chat', line: 'cp', kind: 'catchphrase', phrase: 'what else is like this', context, contextText: POSTS.anaAgain.text, setup: { line: 'q', who: 'larry', text: 'And Ana?' } })
const withLines = (lines, accounts = SOURCES.accounts) => ({ ...SOURCES, accounts, lines })

test('write.guest-lines: a catchphrase cites the author\'s own use; pastiche of a real account fails', async () => {
  const p = plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }] })
  const cpLine = (text = 'What else is like this?', ctxUri = POSTS.anaAgain.uri) => chat(`${SETUP}\n  { say: 'ana', id: 'cp', text: '${text}' }, // catchphrase: "what else is like this" · context: ${ctxUri}`)
  ok(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': cpLine(), 'production/sources.json': withLines([cpRecord()]) }))
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': cpLine('I love this show'), 'production/sources.json': withLines([cpRecord()]) }), /not one of ana\.test's catchphrases/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat(`${SETUP}\n  { say: 'ana', id: 'cp', text: 'What else is like this?' }, // catchphrase`), 'production/sources.json': withLines([cpRecord()]) }), /the catchphrase tag has no occasion/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat(`${SETUP}\n  { say: 'bo', id: 'cp', text: 'claim.' }, // catchphrase: "claim." · context: ${POSTS.boReply.uri}`) }), /catchphrase is not backed/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': cpLine('What else is like this?', POSTS.boReply.uri), 'production/sources.json': withLines([cpRecord(POSTS.boReply.uri)]) }), /a post by bo\.test, not by ana\.test/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': cpLine('What else is like this?', POSTS.anaClaim.uri), 'production/sources.json': withLines([cpRecord(POSTS.anaClaim.uri)]) }), /which does not use it/)
  const noPosts = SOURCES.accounts.map((a) => (a.handle === 'ana.test' ? { ...a, catchphrases: ['what else is like this'] } : a))
  ok(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': cpLine(), 'production/sources.json': withLines([cpRecord()], noPosts) }))
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat(`${SETUP}\n  { say: 'ana', id: 'x', text: 'concept: a show, but it is a museum' }, // pastiche of \"concept:\"`) }), /ana plays the real account ana\.test, and pastiche is not a permitted source for a real account/)
})

test('write.guest-lines: every real line carries its occasion, checked against the digest and sources.json', async () => {
  const p = plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }] })
  const line = (tail) => chat(`  { say: 'larry', id: 'q', text: 'Is Bo here?' },\n  { say: 'bo', id: 'r', text: 'claim.' }, // verbatim: ${POSTS.boReply.uri}${tail}`)
  const rec = (over = {}) => withLines([{ segment: 'chat', line: 'r', kind: 'verbatim', post: POSTS.boReply.uri, context: POSTS.anaClaim.uri, contextText: POSTS.anaClaim.text, setup: { line: 'q', who: 'larry', text: 'Is Bo here?' }, ...over }])
  const go = (tail, sources = rec()) => run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': line(tail), 'production/sources.json': sources })
  ok(await go(` · context: ${POSTS.anaClaim.uri}`))
  fails(await go(''), /the verbatim tag has no occasion: add `· context: at:\/\/…` \(the post it replied to/)
  fails(await go(` · context: ${POSTS.build.uri}`, rec({ context: POSTS.build.uri })), /according to the digest .*b1 replied to .*a1/)
  fails(await go(` · context: ${POSTS.boReply.uri}`, rec({ context: POSTS.boReply.uri })), /according to the digest .*b1 replied to .*a1/)
  fails(await go(' · context: at://did:plc:zz/app.bsky.feed.post/zz'), /the context at:\/\/did:plc:zz.* is not in the week's digest/)
  fails(await go(` · context: ${POSTS.anaClaim.uri}`, withLines([])), /sources\.json "lines" has no record for this line/)
  fails(await go(` · context: ${POSTS.anaClaim.uri}`, rec({ contextText: 'concept: a talk show' })), /"contextText" is not the text of/)
  fails(await go(` · context: ${POSTS.anaClaim.uri}`, rec({ setup: { line: 'q', who: 'larry', text: 'Something else.' } })), /"setup" must repeat the staged prompt exactly: \{ "line": "q", "who": "larry", "text": "Is Bo here\?" \}/)
  // a top-level post: its own URI is the context, and the record gives the situation
  const top = (rec2) => run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat(`  { say: 'larry', id: 'q', text: 'Ana?' },\n  { say: 'ana', id: 't', text: 'concept: a talk show, but the host is a throat' }, // verbatim: ${POSTS.anaClaim.uri} · context: ${POSTS.anaClaim.uri}`), 'production/sources.json': withLines([{ segment: 'chat', line: 't', kind: 'verbatim', post: POSTS.anaClaim.uri, context: POSTS.anaClaim.uri, setup: { line: 'q', who: 'larry', text: 'Ana?' }, ...rec2 }]) })
  ok(await top({ situation: 'a morning post proposing a show' }))
  fails(await top({}), /needs "situation"/)
})

test('write.guest-lines: // invented is for fictional guests only, and they are free of the real-account rules', async () => {
  const p = plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }], guests: [] })
  const cast = "export const CAST = { zed: { name: 'Zed', handle: '@zed.example', guest: true, body: { female: 0, child: 0 }, f0: 130 } }\n"
  ok(await run(writeGuestLines, { 'production/plan.json': p, 'cast.js': cast, 'segments/chat/script.js': chat("  { say: 'zed', text: 'hello' }, // invented") }))
  ok(await run(writeGuestLines, { 'production/plan.json': p, 'cast.js': cast, 'segments/chat/script.js': chat("  { say: 'zed', text: 'concept: hello' }, // pastiche of \"concept:\"") }))
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'cast.js': cast, 'segments/chat/script.js': chat("  { say: 'zed', text: 'hello' },") }), /zed says "hello" with no source comment.*\/\/ invented/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat("  { say: 'ana', text: 'hello' }, // invented") }), /only for fictional guests/)
})

test('write.labels: a puppet for a real account has guest: true (R9)', async () => {
  ok(await run(writeLabels))
  fails(await run(writeLabels, { 'cast.js': "export const CAST = { eve: { name: 'Eve', handle: '@eve.test', body: { female: 1, child: 0 }, f0: 200 } }\n" }), /eve has the real handle @eve\.test but no guest: true/)
  fails(await run(writeLabels, { 'cast.js': "export const CAST = { bo: { name: 'Bo', handle: '@bo.test', body: { female: 0, child: 0 }, f0: 120 } }\n" }), /bo has the real handle @bo\.test but no guest: true|bo plays bo\.test but has no guest: true/)
})

test('write.names: names in sources or on .example pass; real TLDs and unlisted posts fail (R8, R4)', async () => {
  ok(await run(writeNames))
  const idx = (s) => ({ 'segments/chat/index.js': `export default { direct(t, show) { show.chyron({ name: 'X', handle: '${s}' }) } }\n` })
  ok(await run(writeNames, idx('@zed.example')))
  ok(await run(writeNames, idx('@cy.test')))
  fails(await run(writeNames, idx('@made.a.website')), /@made\.a\.website is neither on \.example nor in sources\.json/)
  fails(await run(writeNames, idx('https://real-site.com/x')), /the URL https:\/\/real-site\.com\/x/)
  fails(await run(writeNames, { 'segments/chat/index.js': `// card: ${POSTS.anaAgain.uri}\nexport default {}\n` }), /not in sources\.json posts \(rule R4/)
})

test('write.names --network: an invented handle that resolves fails', async () => {
  const idx = { 'segments/chat/index.js': "export default { d() { return '@zed.example' } }\n" }
  const resolves = (root) => ({ ...fakeTools(root), fetch: async () => ({ ok: true }) })
  fails(await run(writeNames, idx, { network: true, tools: resolves }), /resolves to a real account/)
  ok(await run(writeNames, idx, { network: true, tools: (root) => fakeTools(root) }))
  assert.match((await run(writeNames, idx)).warnings.join(' '), /not checked against the network/)
})

test('write.optout: an opted-out handle anywhere fails (R11)', async () => {
  ok(await run(writeOptOut))
  fails(await run(writeOptOut, { 'segments/chat/index.js': "export default { t: 'thanks @nope.test' }\n" }), /segments\/chat\/index\.js:1: names an account on the opt-out list/)
})

test('write.length: a ceiling on words, no minimum', async () => {
  ok(await run(writeLength))
  const long = chat(Array.from({ length: 110 }, (_, k) => `  { say: 'larry', text: 'one two three four five six seven eight nine ten' },`).join('\n'))
  fails(await run(writeLength, { 'segments/chat/script.js': long }), /1104 spoken words .* ceiling is 1020/)
  assert.equal(spokenWords({ beats: [{ say: 'a', text: 'one two' }, { sing: 'a', lyrics: 'la la la' }, { music: { tracks: [{ lyrics: 'oh oh' }, { shout: 'hey' }] } }] }), 7)
})

test('the pull request shows each real line beside its staged setup and its original occasion', async () => {
  const { prBody } = await import('../src/pr.mjs')
  const { newState } = await import('../src/state.mjs')
  const p = plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }], retro: null, dna: { keep: [], change: [], experiment: { what: 'x', why: 'y', success: 'z' } }, inherit: [] })
  const script = chat([
    "  { say: 'larry', id: 'hi', text: 'Bo, any thoughts on the show?' },",
    `  { say: 'bo', id: 'r', text: 'claim.' }, // verbatim: ${POSTS.boReply.uri} · context: ${POSTS.anaClaim.uri}`,
    "  { say: 'larry', id: 'q', text: 'And Ana?' },",
    `  { say: 'ana', id: 'cp', text: 'What else is like this?' }, // catchphrase: "what else is like this" · context: ${POSTS.anaAgain.uri}`,
  ].join('\n'))
  const body = await run((ctx) => prBody({ ctx, state: newState({ week: ctx.week, episode: ctx.id, limits: 'default' }), branch: 'b' }), { 'production/plan.json': p, 'segments/chat/script.js': script })
  assert.match(body, /## Real people's lines, as staged and as said/)
  assert.match(body, /\*\*`segments\/chat\/script\.js:3 \(r\)`\*\* \(verbatim, \[post\]\(https:\/\/bsky\.app\/profile\/bo\.test\/post\/b1\)\)\n\n> \*\*staged setup, larry:\*\* Bo, any thoughts on the show\?\n>\n> \*\*bo \(@bo\.test\):\*\* claim\.\n>\n> \*\*original, it replied to, @ana\.test:\*\* concept: a talk show,/)
  assert.match(body, /> \*\*staged setup, larry:\*\* And Ana\?\n>\n> \*\*ana \(@ana\.test\):\*\* What else is like this\?\n>\n> \*\*original, their own use, @ana\.test:\*\* what else is like this 🦜/)
})
