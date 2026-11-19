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
  ok(await run(writeGuestLines, { 'segments/chat/script.js': SCRIPT_CHAT.replace("text: 'concept: a talk show, but the host is a throat'", "text: 'concept: a talk show…'") }))
})

test('write.guest-lines: a guest may only speak their own posts', async () => {
  const src = chat(`  { say: 'bo', text: 'concept: a talk show, but the host is a throat' }, // verbatim: ${POSTS.anaClaim.uri}`)
  fails(await run(writeGuestLines, { 'segments/chat/script.js': src, 'production/plan.json': plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }] }) }), /bo \(bo\.test\) is given ana\.test's post/)
})

test('write.guest-lines: a verbatim thread out of order, or with a house character speaking a post, fails', async () => {
  const swapped = chat(`  { say: 'bo', text: 'claim.' }, // verbatim: ${POSTS.boReply.uri}\n  { say: 'ana', text: 'concept: a talk show, but the host is a throat' }, // verbatim: ${POSTS.anaClaim.uri}`)
  fails(await run(writeGuestLines, { 'segments/chat/script.js': swapped }), /perform \[.*b1, .*a1\] but plan\.json thread\.posts is/)
  const house = SCRIPT_CHAT.replace("{ say: 'bot', id: 'built', text: 'Built it.' },", `{ say: 'larry', text: 'what else is like this 🦜 https://thing.test' }, // verbatim: ${POSTS.anaAgain.uri}`)
  fails(await run(writeGuestLines, { 'segments/chat/script.js': house }), /larry \(house\) speaks a real post in the verbatim thread/)
})

test('write.guest-lines: catchphrase and pastiche are backed by sources and the digest', async () => {
  const p = plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }] })
  ok(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat("  { say: 'ana', text: 'What else is like this?' }, // catchphrase") }))
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat("  { say: 'ana', text: 'I love this show' }, // catchphrase") }), /not one of ana\.test's catchphrases/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat("  { say: 'bo', text: 'claim.' }, // catchphrase") }), /catchphrase is not backed/)
  const r = await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat("  { say: 'ana', text: 'concept: a show, but it is a museum' }, // pastiche of \"concept:\"") })
  ok(r)
  assert.match(r.warnings.join(' '), /pastiche lines for the reviewer/)
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': chat("  { say: 'bo', text: 'hot take: shows are bad' }, // pastiche of \"hot take:\"") }), /no post by bo\.test .* uses the format "hot take:"/)
  const many = chat(Array.from({ length: 3 }, (_, k) => `  { say: 'ana', text: 'concept: thing ${k}' }, // pastiche of "concept:"`).join('\n'))
  assert.match((await run(writeGuestLines, { 'production/plan.json': p, 'segments/chat/script.js': many })).warnings.join(' '), /3 pastiche lines.*a line or two per episode/)
})

test('write.guest-lines: // invented is for fictional guests only', async () => {
  const p = plan({ segments: [plan().segments[0], { id: 'chat', format: 'panel', seconds: 40 }], guests: [] })
  const cast = "export const CAST = { zed: { name: 'Zed', handle: '@zed.example', guest: true, body: { female: 0, child: 0 }, f0: 130 } }\n"
  ok(await run(writeGuestLines, { 'production/plan.json': p, 'cast.js': cast, 'segments/chat/script.js': chat("  { say: 'zed', text: 'hello' }, // invented") }))
  fails(await run(writeGuestLines, { 'production/plan.json': p, 'cast.js': cast, 'segments/chat/script.js': chat("  { say: 'zed', text: 'hello' },") }), /zed says "hello" with no source comment.*or \/\/ invented/)
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
  const long = chat(Array.from({ length: 60 }, (_, k) => `  { say: 'larry', text: 'one two three four five six seven eight nine ten' },`).join('\n'))
  fails(await run(writeLength, { 'segments/chat/script.js': long }), /604 spoken words .* ceiling is 520/)
  assert.equal(spokenWords({ beats: [{ say: 'a', text: 'one two' }, { sing: 'a', lyrics: 'la la la' }, { music: { tracks: [{ lyrics: 'oh oh' }, { shout: 'hey' }] } }] }), 7)
})
