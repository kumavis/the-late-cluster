import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lex, namesIn, respellingMismatch, scriptLines, sourceTag, verbatimMismatch } from '../src/scan.mjs'

test('lex blanks strings, comments and regexes but keeps their text', () => {
  const src = "const a = 'x{y}' // a {comment}\nconst r = /}{/g; const b = { k: \"q\" }\n"
  const { tokens, masked } = lex(src)
  assert.equal(masked.length, src.length)
  assert.ok(!masked.includes('x{y}') && !masked.includes('comment'))
  assert.deepEqual(tokens.filter((t) => t.kind === 'string').map((t) => t.value), ['x{y}', 'q'])
  assert.equal(tokens.find((t) => t.kind === 'comment').value, ' a {comment}')
})

test('scriptLines finds say, sing and sung music tracks with their comments', () => {
  const src = `export default { beats: [
  // verbatim: at://did:plc:x/app.bsky.feed.post/1
  { say: 'ana', id: 'a', text: "it's here", as: 'its here' },
  { say: 'bo', text: 'claim.' }, // catchphrase
  { say: 'larry',
    text: 'two lines' },
  { sfx: 'laugh' },
  { sing: 'larry', lyrics: 'la la', notes: [[60, 1], [62, 1]] },
  { music: { id: 'm', bpm: 100, tracks: [
    { who: ['hy', 'dee'], lyrics: 'oh oh' },
    { who: 'pete', beat: 'B . . .' },
    { who: 'al', shout: 'hey', beats: [1] },
  ] } },
] }`
  const L = scriptLines(src)
  assert.deepEqual(L.map((l) => [l.who.join('+'), l.kind, l.text]), [
    ['ana', 'say', "it's here"],
    ['bo', 'say', 'claim.'],
    ['larry', 'say', 'two lines'],
    ['larry', 'sing', 'la la'],
    ['hy+dee', 'lyrics', 'oh oh'],
    ['al', 'shout', 'hey'],
  ])
  assert.equal(L[0].as, 'its here')
  assert.deepEqual(L[0].comments, ['verbatim: at://did:plc:x/app.bsky.feed.post/1'])
  assert.deepEqual(L[1].comments, ['catchphrase'])
  assert.deepEqual(L[2].comments, [])
})

test('scriptLines marks a guest line whose text is not a literal', () => {
  const L = scriptLines("const T = 'x'\nexport default { beats: [ { say: 'ana', text: T }, { say: 'bo', text: `a ${'$'}{T}` } ] }")
  assert.equal(L[0].literal, false)
  assert.equal(L[1].literal, false)
})

test('sourceTag recognises the four kinds of rule R3 and invented', () => {
  assert.deepEqual(sourceTag(['verbatim: at://did:plc:x/app.bsky.feed.post/1']), { kind: 'verbatim', ref: 'at://did:plc:x/app.bsky.feed.post/1' })
  assert.deepEqual(sourceTag(['interview: at://did:plc:x/app.bsky.feed.post/2']), { kind: 'interview', ref: 'at://did:plc:x/app.bsky.feed.post/2' })
  assert.equal(sourceTag(['catchphrase']).kind, 'catchphrase')
  assert.deepEqual(sourceTag(['pastiche of "concept:"']), { kind: 'pastiche', format: 'concept:' })
  assert.equal(sourceTag(['invented']).kind, 'invented')
  assert.equal(sourceTag(['---- the panel']), null)
})

test('verbatimMismatch: exact apart from whitespace, cuts only with …', () => {
  const post = 'concept: a talk show,\nbut the host is a throat'
  assert.equal(verbatimMismatch('concept: a talk show, but the host is a throat', post), null)
  assert.equal(verbatimMismatch('  concept: a talk show,   but the host is a throat ', post), null)
  assert.equal(verbatimMismatch('concept: a talk show…', post), null)
  assert.equal(verbatimMismatch('… but the host is a throat', post), null)
  assert.equal(verbatimMismatch('concept: … is a throat', post), null)
  assert.match(verbatimMismatch('Concept: a talk show, but the host is a throat', post), /differs/)
  assert.match(verbatimMismatch('concept: a talk show', post), /stops before the post ends/)
  assert.match(verbatimMismatch('a talk show, but the host is a throat', post), /differs|starts mid-post/)
  assert.match(verbatimMismatch('concept: a talk show...', post), /differs|stops/, 'three dots are not a cut mark')
  assert.match(verbatimMismatch('… is a throat … concept:', post), /not in the post/)
  assert.match(verbatimMismatch('concept: a talk show, but the host is a throat!', post), /differs/)
})

test('respellingMismatch: as may respell and drop unspoken tokens, never add words', () => {
  assert.equal(respellingMismatch('what else is like this 🦜 https://thing.test', 'what else is like this'), null)
  assert.equal(respellingMismatch('Bluesky is fine', 'blue-sky is fine'), null)
  assert.match(respellingMismatch('claim.', 'I claim it.'), /adds words/)
  assert.match(respellingMismatch('a b c d', 'a b'), /drops words/)
  assert.equal(respellingMismatch('a b', null), null)
})

test('namesIn finds URLs, handles and real-TLD domains, not code or file names', () => {
  const n = namesIn("see https://golem.cy.test/x and @ana.test, zed.example, weather.samantha.wiki, made.a.website; not script.js, stage/set.js, 2.5, e.g. or show.draw")
  assert.deepEqual(n.map((x) => [x.kind, x.value]), [
    ['url', 'https://golem.cy.test/x'],
    ['handle', 'ana.test'],
    ['domain', 'zed.example'],
    ['domain', 'weather.samantha.wiki'],
    ['domain', 'made.a.website'],
  ])
})
