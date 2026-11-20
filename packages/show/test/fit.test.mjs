// The fitting tool's pure parts (tools/heard.mjs, respell.mjs, source-edit.mjs, draft.mjs,
// tuning.mjs): scoring, flags and statuses, candidate generation, script edits, draft paths, the
// bass tuning. Node builtins only: no engine, no Whisper.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { wordScore, missedWords, flagsFor, summarise, lineStatus, better, hasTerm, negations, realNames, isRealLine, GATE } from '../tools/heard.mjs'
import { syllabify, respellPhones, wordCandidates, lineCandidates, combine, targetTokens, editDistance, splitToken, KNOWN } from '../tools/respell.mjs'
import { parseLiteral, prop, applyAs, setProp, quote } from '../tools/source-edit.mjs'
import { resolveDraft, draftView, takeDraftArg, DraftError, draftCast } from '../tools/draft.mjs'
import { frySung, frySounds, FRY_FLOOR } from '../tools/tuning.mjs'

const DICT = new Map([
  ['samantha', 'S AH0 M AE1 N TH AH0'.split(' ')],
  ['suspense', 'S AH0 S P EH1 N S'.split(' ')],
  ['should', 'SH UH1 D'.split(' ')],
  ['joke', 'JH OW1 K'.split(' ')],
  ['that', 'DH AE1 T'.split(' ')],
  ['vibe', 'V AY1 B'.split(' ')],
  ['coded', 'K OW1 D IH0 D'.split(' ')],
  ['new', 'N UW1'.split(' ')],
  ['part', 'P AA1 R T'.split(' ')],
  ['port', 'P AO1 R T'.split(' ')],
  ['mobius', 'M OW1 B IY0 AH0 S'.split(' ')],
])

// ---- scoring

test('word scores: digits and percent spelled out, compounds count, build is built', () => {
  assert.deepEqual(wordScore('Ninety percent posting', 'the 90% posting'), [3, 3])
  assert.deepEqual(wordScore('The simcluster is trending', 'The sim cluster is trending'), [4, 4])
  assert.deepEqual(wordScore('I build it', 'I built it'), [3, 3])
  assert.deepEqual(wordScore('That’s awesome', "That's awesome"), [2, 2])
  assert.deepEqual(missedWords('They belong to Samantha', 'They belong to Schmanzer'), ['samantha'])
})

test('flags: alarming, out of bounds and crude words heard, with plurals; names; statements about real people', () => {
  const terms = { alarming: ['bomb'], outOfBounds: ['election'], crude: ['bitch'], loaded: ['report'] }
  assert.deepEqual(flagsFor('beeswax and string', 'these elections', { terms }), ['out of bounds: election'])
  assert.deepEqual(flagsFor('a bee should be able', 'a bitch should be able', { terms }), ['crude: bitch'])
  assert.deepEqual(flagsFor('the bomb squad', 'the bomb squad', { terms }), [], 'a term in the caption is not a mishearing')
  assert.deepEqual(flagsFor('Back came a reply from Samantha', 'Back came a reply from Schmanzer', { names: ['Samantha'] }), ['name: Samantha'])
  assert.deepEqual(flagsFor('New, second draft', 'No, second draft', { real: true }), ['statement: negation'])
  assert.deepEqual(flagsFor('I like! I repost!', 'I like, I report', { terms, real: true }), ['statement: report'])
  assert.deepEqual(flagsFor('I like! I repost!', 'I like, I report', { terms, real: false }), [], 'only on a real person’s line')
  assert.equal(hasTerm('they were laid off', 'laid off'), true)
  assert.equal(negations("I don't know, not now"), 2)
})

test('real names and real lines', () => {
  const cast = { verooo: { name: 'ver.ooo 🗿', handle: '@ver.ooo', guest: true }, zed: { name: 'Zed', handle: '@zed.example', guest: true }, larry: { name: 'Larry Nx' } }
  const sources = { accounts: [{ handle: 'samantha.wiki', displayName: 'Samantha' }], posts: [{ text: 'Reply to this post and my pen plotter will write it on paper, watch it live!' }] }
  const names = realNames(cast, sources)
  assert.ok(names.includes('Samantha') && names.includes('ver.ooo') && !names.includes('Zed') && !names.includes('Larry Nx'))
  assert.equal(isRealLine({ who: 'verooo', text: 'anything' }, { cast, sources, names }), true)
  assert.equal(isRealLine({ who: 'zed', text: 'anything' }, { cast, sources, names }), false, 'an invented guest')
  assert.equal(isRealLine({ who: 'sibyl', text: '… Reply to this post and my pen plotter will write it on paper …' }, { cast, sources, names }), true, 'a real post read aloud')
  assert.equal(isRealLine({ who: 'larry', text: 'Back came a reply from Samantha.' }, { cast, sources, names }), true)
  assert.equal(isRealLine({ who: 'larry', text: 'How long is this one?' }, { cast, sources, names }), false)
})

const take = (heard, ok, of, flags = []) => ({ heard, score: [ok, of], flags })

test('summary and status: ok, weak (unstable), flagged, unsayable', () => {
  const ok = summarise([take('a b c', 3, 3), take('a b c', 3, 3), take('a b', 2, 3), take('a b c', 3, 3)])
  assert.deepEqual(ok.heard, [{ text: 'a b c', count: 3 }, { text: 'a b', count: 1 }])
  assert.deepEqual(ok.score, { heard: 3, of: 3, min: 2 })
  assert.equal(lineStatus(ok), 'ok')
  const unstable = summarise([take('a b c d e', 5, 5), take('a b c', 3, 5), take('a', 1, 5), take('a b c d', 4, 5)])
  assert.equal(unstable.pass, false)
  assert.equal(lineStatus(unstable), 'weak')
  const low = summarise([take('a', 1, 5), take('', 0, 5), take('a', 1, 5)])
  assert.equal(lineStatus(low, { searched: true, anyOver: false }), 'unsayable')
  assert.equal(lineStatus(low, { searched: false }), 'weak', 'not searched: weak, not unsayable')
  const flagged = summarise([take('a b c', 3, 3), take('a bitch c', 2, 3, ['crude: bitch'])])
  assert.deepEqual(flagged.flags, ['crude: bitch'])
  assert.equal(lineStatus(flagged), 'flagged')
  assert.equal(GATE, 0.6)
})

test('candidates are ordered: unflagged, passing, heard, worst take, fewest edits', () => {
  const s = (ok, min, flags = [], edits = 0) => ({ score: { heard: ok, of: 10, min }, flags, pass: min >= 6, edits })
  const list = [s(10, 10, ['crude: x']), s(7, 5), s(8, 6, [], 1), s(8, 6, [], 0), s(9, 4)]
  assert.deepEqual(list.sort(better).map((x) => [x.score.heard, x.score.min, x.edits, x.flags.length]), [[8, 6, 0, 0], [8, 6, 1, 0], [9, 4, 0, 0], [7, 5, 0, 0], [10, 10, 0, 1]])
})

// ---- candidates

test('syllables and respellings from the dictionary', () => {
  assert.deepEqual(syllabify(DICT.get('samantha')).map((s) => s.vowel), ['AH0', 'AE1', 'AH0'])
  assert.deepEqual(respellPhones(DICT.get('samantha')), ['suh-man-thuh', 'sum-man-thuh'])
  assert.deepEqual(respellPhones(DICT.get('suspense')), ['suh-spens', 'sus-pens'])
  assert.deepEqual(respellPhones(DICT.get('should')), ['shood'])
})

test('word candidates: the README table, weak sounds, compounds, strong forms; the case kept', () => {
  assert.deepEqual(wordCandidates('Bluesky').slice(0, 1), ['Blue-sky'])
  assert.ok(wordCandidates('joke', { dict: DICT }).includes('djoke'), 'initial /dʒ/ gets an extra closure')
  assert.ok(wordCandidates('vibecoded', { dict: DICT }).includes('vibe-coded'))
  assert.ok(wordCandidates('Samantha', { dict: DICT }).includes('Suh-man-thuh'))
  assert.ok(wordCandidates('should', { dict: DICT }).includes('shood'))
  assert.ok(wordCandidates('that', { dict: DICT }).includes('thatt'))
  assert.deepEqual(wordCandidates('Samantha', { dict: DICT, learned: { samantha: ['Sum-ann-thuh'] } })[0], 'Sum-ann-thuh', 'what fixed it before comes first')
  assert.deepEqual(wordCandidates('300', { dict: DICT }), [], 'numbers are left alone')
  assert.equal(wordCandidates('Möbius', { dict: DICT })[0], 'Mobius', 'marked letters are read as noise: plain letters first')
  assert.equal(wordCandidates('New', { dict: DICT })[0], 'Nee-oo', 'the glide spelled out, so "New" is not heard as "No"')
  assert.ok(!wordCandidates('part', { dict: DICT }).includes('port'), 'never another word said another way')
  assert.ok(wordCandidates('part', { dict: DICT }).includes('pahrt'))
  for (const parts of Object.values(KNOWN)) for (const p of parts) assert.ok(!/\s/.test(p), p)
})

test('line candidates keep the caption’s word count and its punctuation', () => {
  const text = 'One of them heard from Samantha.'
  const cs = lineCandidates(text, undefined, ['samantha', 'samantha'], { dict: DICT })
  assert.ok(cs.length >= 3)
  for (const c of cs) assert.equal(c.as.split(' ').length, text.split(' ').length, c.as)
  assert.ok(cs.some((c) => c.as === 'One of them heard from Suh-man-thuh.'))
  assert.ok(cs.some((c) => c.as === 'One of them heard from, Samantha.' && c.why === 'comma before Samantha'))
  // a respelling in use can be taken out again
  const back = lineCandidates(text, 'One of them heard from Sum-ann-thuh.', ['samantha'], { dict: DICT })
  assert.ok(back.some((c) => c.as === text && c.why === 'as written'))
  assert.ok(!back.some((c) => c.as === 'One of them heard from Sum-ann-thuh.'), 'the line as it stands is not a candidate')
  assert.deepEqual(targetTokens('a b, c b', ['b', 'b', 'c']), [1, 3, 2])
})

test('combining two single fixes; edit distance; token split', () => {
  assert.equal(combine('a b c', 'x b c', 'a b y'), 'x b y')
  assert.equal(combine('a b c', 'x b c', 'z b c'), null)
  assert.equal(editDistance(['s', 'ʌ', 'm'], ['s', 'ʌ', 'n']), 1)
  assert.deepEqual(splitToken('“Hello,”'), { lead: '“', core: 'Hello', trail: ',”' })
})

// ---- script edits

const SCRIPT = `// a comment that stays
export default {
  id: 'x',
  beats: [
    { say: 'larry', id: 'a', text: 'They belong to Samantha.' }, // verbatim
    { say: "sibyl", text: "It's late", as: "Its late", rate: 0.9 },
    { music: { id: 'm', bpm: 100, tracks: [
      { who: 'larry', lyrics: 'la la', notes: [[50, 1], [52, 1]], caption: true },
      { who: 'pete', beat: 'B . . . ' +   // a joined string
        '! . . .' },
    ] } },
  ],
}
`

test('applyAs inserts or replaces `as` and leaves everything else byte for byte', async () => {
  const out = applyAs(SCRIPT, [{ beat: 0, as: 'They belong to Suh-man-thuh.' }, { beat: 1, as: "It's, late" }, { beat: 2, track: 0, as: 'lah lah' }])
  assert.match(out, /text: 'They belong to Samantha\.', as: 'They belong to Suh-man-thuh\.' \}, \/\/ verbatim/)
  assert.match(out, /as: "It's, late", rate: 0\.9/)
  assert.match(out, /lyrics: 'la la', as: 'lah lah', notes/)
  assert.ok(out.startsWith('// a comment that stays\n'))
  assert.equal(out.replace(", as: 'They belong to Suh-man-thuh.'", '').replace('"It\'s, late"', '"Its late"').replace(", as: 'lah lah'", ''), SCRIPT)
  const root = parseLiteral(out)
  assert.equal(prop(prop(root, 'beats').value.items[2], 'music').value.props.length, 3)
  assert.equal(quote("it's"), "'it\\'s'")
})

test('parseLiteral reads joined strings, comments, and `export const CAST`; setProp edits a cast entry', () => {
  const root = parseLiteral(SCRIPT)
  const beat = prop(prop(prop(root, 'beats').value.items[2], 'music').value, 'tracks').value.items[1]
  assert.equal(prop(beat, 'beat').value.value, 'B . . . ! . . .')
  const cast = "export const CAST = {\n  zed: { name: 'Zed', body: { female: 0.3, child: 0 }, f0: 140, rate: 1, accent: 0.2 },\n}\n"
  const entry = prop(parseLiteral(cast, { name: 'CAST' }), 'zed').value
  let out = setProp(cast, entry, 'f0', '228')
  out = setProp(out, prop(parseLiteral(out, { name: 'CAST' }), 'zed').value, 'source', '{ tension: 0.62 }', { after: 'accent' })
  assert.equal(out, "export const CAST = {\n  zed: { name: 'Zed', body: { female: 0.3, child: 0 }, f0: 228, rate: 1, accent: 0.2, source: { tension: 0.62 } },\n}\n")
  assert.throws(() => parseLiteral('export default { a: `x${1}` }'), /template/)
})

// ---- drafts

test('a draft resolves to its script and cast and renders into the studio’s scratch, never the episode', () => {
  const root = mkdtempSync(join(tmpdir(), 'lc-draft-'))
  const dir = join(root, 'episodes', '002-x')
  mkdirSync(join(dir, 'production', 'drafts', 'pen'), { recursive: true })
  writeFileSync(join(dir, 'production', 'drafts', 'pen', 'script.js'), 'export default { id: "pen", beats: [] }\n')
  const ep = { id: '002-x', dir, root, rel: (p) => p }
  const d = resolveDraft(ep, 'pen', { scratch: join(root, 'scratch') })
  assert.equal(d.script, join(dir, 'production', 'drafts', 'pen', 'script.js'))
  assert.equal(d.cast, null)
  const v = draftView(ep, d)
  assert.equal(v.segFile('pen', 'script.js'), d.script)
  assert.equal(v.segFile('pen', 'cues.json'), join(root, 'scratch', '002-x', 'pen', 'cues.json'))
  assert.equal(v.renderPath('audio/pen.mp3'), join(root, 'scratch', '002-x', 'pen', 'audio', 'pen.mp3'))
  for (const p of [v.segFile('pen', 'cues.json'), v.renderPath('audio/pen.mp3'), v.renderPath('tele/pen.bin')]) {
    assert.ok(!p.startsWith(join(dir, 'public')) && !p.startsWith(join(dir, 'segments')), p)
  }
  assert.equal(v.asset('audio/pen.mp3'), null)
  assert.notEqual(v.lockId, ep.id)
  assert.throws(() => resolveDraft(ep, 'nope'), DraftError)
  assert.throws(() => resolveDraft(ep, '../x'), DraftError)
  assert.deepEqual(takeDraftArg(['2', '--draft', 'pen', '--json']), { slug: 'pen', rest: ['2', '--json'] })
  assert.deepEqual(takeDraftArg(['2', 'seg']), { slug: null, rest: ['2', 'seg'] })
  assert.throws(() => takeDraftArg(['2', '--draft']), DraftError)
  assert.deepEqual(draftCast({ a: 1, b: 2 }, { b: 3 }), { a: 1, b: 3 })
})

// ---- the bass

test('a voice with fry is commanded so that a written note sounds at its pitch', () => {
  // as measured on the engine before the fix: Al (fry 0.2) sang a written 45 at 97.6 Hz
  assert.ok(Math.abs(frySounds(45, 0.2) - 97.6) < 0.5)
  for (const fry of [0.05, 0.2, 0.4]) for (const midi of [40, 45, 52, 64]) {
    const sounds = frySounds(frySung(midi, fry), fry)
    assert.ok(Math.abs(sounds - 440 * 2 ** ((midi - 69) / 12)) < 1e-9, `${midi} at fry ${fry}`)
  }
  assert.equal(frySung(45, 0), 45, 'no fry, no change: every other voice sings as before')
  assert.equal(frySung(45), 45)
  assert.equal(FRY_FLOOR, 48)
})
