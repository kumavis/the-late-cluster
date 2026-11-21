// A respelling keeps the word's sounds (tools/sounds.mjs, config/sounds.json): the rule, the audit
// of a script's `as` fields, and what the fitting tool stops offering. Node builtins only: the
// engine's G2P is stood in for by a table of what it gives (measured with g2p.toPhrases), except in
// the last test, which asks the engine itself through bun and is skipped where bun is not installed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { auditSounds, dictPhones, keepsSounds, lineSounds, loadSoundsConfig, scriptLines, soundsRow, SOUNDS_CONFIG, spellingSounds, wordSounds } from '../tools/sounds.mjs'
import { lineCandidates } from '../tools/respell.mjs'

// what the engine's G2P gives (packages/show/tools/engine.ts, g2p.toPhrases(word), segments' .ipa)
const G2P = {
  show: 'ʃ oʊ', showw: 'ʃ aʊ w', sshow: 's ʃ oʊ', sshoww: 's ʃ aʊ w', shoh: 'ʃ ɑ h',
  this: 'ð ɪ s', thiss: 'θ ɪ s s', that: 'ð ə t', thatt: 'θ æ t t',
  bell: 'b ɛ ɫ', belll: 'b ɛ ɫ ɫ ɫ', better: 'b ɛ ɾ ɚ', 'bett-er': 'b ɛ ɾ ɚ',
  samantha: 's ə m æ n θ ə', sammantha: 's æ m m æ n θ æ', 'sum-man-thuh': 's ʌ m m æ n θ ʌ h',
  joke: 'dʒ oʊ k', djoke: 'd dʒ oʊ k', a: 'ə', uh: 'ʌ', the: 'ð ə', thee: 'ð i', on: 'ə n', awn: 'ɔ n',
  velum: 'v ɛ l ə m', 'vee-lum': 'v i l ʌ m', ai: 'aɪ', 'ay-eye': 'eɪ aɪ',
}
const ipa = (w) => (G2P[String(w).toLowerCase()] ?? '').split(' ').filter(Boolean)
const DICT = new Map([
  ['show', ['SH', 'OW1']], ['this', ['DH', 'IH1', 'S']], ['that', ['DH', 'AE1', 'T']], ['bell', ['B', 'EH1', 'L']], ['better', ['B', 'EH1', 'T', 'ER0']],
  ['samantha', 'S AH0 M AE1 N TH AH0'.split(' ')], ['joke', ['JH', 'OW1', 'K']], ['a', ['AH0']], ['the', ['DH', 'AH0']], ['on', ['AA1', 'N']], ['ai', ['AY1']],
])
const opts = { ipa, dict: DICT }

test('showw is rejected for "show": the transcription wrote "show", the engine says "shao"', () => {
  const r = wordSounds('show', 'showw', opts)
  assert.deepEqual(r, { word: 'show', as: 'showw', plain: 'ʃ oʊ', ipa: 'ʃ aʊ w', keeps: false, why: 'vowel oʊ → aʊ' })
  assert.equal(wordSounds('show', 'sshoww', opts).keeps, false)
  assert.equal(wordSounds('show', 'sshow', opts).keeps, false, 'an s before it is another consonant')
  assert.equal(wordSounds('show', 'shoh', opts).keeps, false)
  assert.equal(wordSounds('this', 'thiss', opts).why, 'consonants before the first vowel: ð → θ')
  assert.equal(wordSounds('Show', 'show', opts), null, 'the word itself is not a respelling')
})

test('a consonant doubled or held, a break, a flap, a closure and a stress shift are accepted', () => {
  assert.equal(wordSounds('bell', 'belll', opts).keeps, true, 'a held l')
  assert.equal(wordSounds('better', 'bett-er', opts).keeps, true, 'a break between syllables')
  assert.equal(wordSounds('joke', 'djoke', opts).keeps, true, 'a closure before the affricate')
  assert.equal(wordSounds('a', 'uh', opts).keeps, true, 'ə and ʌ: one vowel, unstressed and stressed')
  assert.equal(wordSounds('the', 'thee', opts).keeps, true, 'the strong form of "the"')
  assert.equal(wordSounds('Samantha', 'Sammantha', opts).keeps, false, 'doubling that changes the vowels is not doubling')
  assert.equal(wordSounds('Samantha', 'Sum-man-thuh', opts).why, 'consonants after the last vowel: (none) → h')
  assert.equal(wordSounds('on', 'awn', opts).why, 'vowel ə → ɔ', 'ɑ and ɔ are not near-identical')
  assert.deepEqual(keepsSounds(['t', 'æ', 't'], ['t', 'æ', 'ɾ']), { ok: true }, 'a flap is t')
})

test('a word the dictionary does not know is unconstrained, but its sounds are shown', () => {
  assert.equal(dictPhones('Velum', DICT), null)
  assert.deepEqual(wordSounds('Velum', 'Vee-lum', opts), { word: 'Velum', as: 'Vee-lum', plain: 'v ɛ l ə m', ipa: 'v i l ʌ m', keeps: null })
  assert.equal(wordSounds('AI', 'ay-eye', opts).keeps, null, 'shorthand read as it is meant has no reference')
  assert.equal(dictPhones('show-bell', DICT).join(' '), 'SH OW1 B EH1 L', 'a hyphenated word of dictionary words is known')
})

test('the near-identical vowels are a short list in configuration, with a $comment', () => {
  const raw = JSON.parse(readFileSync(SOUNDS_CONFIG, 'utf8'))
  assert.ok(raw.$comment.length > 100)
  const c = loadSoundsConfig()
  assert.ok(c.nearVowels.length <= 4)
  assert.deepEqual(c.nearVowels, [['ə', 'ʌ'], ['ɚ', 'ɝ']])
})

const SCRIPT = {
  id: 'x',
  beats: [
    { say: 'larry', id: 'l-list', text: 'The show is not on it.', as: 'The showw is not awn it.' },
    { say: 'larry', id: 'l-bell', text: 'A bell.', as: 'A belll.' },
    { say: 'sibyl', text: 'Velum.', as: 'Vee-lum.' },
    { say: 'sibyl', id: 'l-short', text: 'This show.', as: 'Thiss-show' },
    { sfx: 'laugh' },
    { music: { id: 'm', bpm: 100, tracks: [{ who: 'larry', id: 'sung', lyrics: 'the show', as: 'the sshoww', notes: [] }, { who: 'pete', beat: 'B . .' }] } },
  ],
}

test('the audit lists every word whose `as` changes the word, with the line, the spelling and both sounds', () => {
  const lines = scriptLines(SCRIPT)
  assert.deepEqual(lines.map((l) => [l.id, l.kind]), [['l-list', 'say'], ['l-bell', 'say'], ['#2', 'say'], ['l-short', 'say'], ['sung', 'sing']])
  const a = auditSounds(lines, opts)
  assert.equal(a.lines, 5)
  assert.deepEqual(a.different.map((r) => [r.id, r.word, r.as, r.plain, r.ipa]), [
    ['l-list', 'show', 'showw', 'ʃ oʊ', 'ʃ aʊ w'],
    ['l-list', 'on', 'awn', 'ə n', 'ɔ n'],
    ['sung', 'show', 'sshoww', 'ʃ oʊ', 's ʃ aʊ w'],
  ])
  assert.equal(soundsRow(a.different[0]), 'l-list (larry) show → showw: /ʃ oʊ/ → /ʃ aʊ w/ (vowel oʊ → aʊ)')
  assert.deepEqual(a.guesses.map((r) => [r.id, r.word, r.ipa]), [['#2', 'Velum', 'v i l ʌ m']])
  assert.deepEqual(a.unaligned, [{ id: 'l-short', who: 'sibyl' }], 'an `as` with fewer words cannot be paired')
  assert.deepEqual(lineSounds('The show.', undefined, opts), { aligned: true, words: [] })
  assert.equal(spellingSounds('at that', 'att thatt', { ipa, dict: DICT }).keeps, false)
})

test('the fitting tool never offers a spelling that changes the word, nor one the research file says misleads', () => {
  const accept = (w, s) => wordSounds(w, s, opts)?.keeps !== false
  // what fixed it before (learned.json, or the research file's working spellings) came first
  const before = lineCandidates('The show is made.', null, ['show'], { dict: DICT, learned: { show: ['showw', 'sshow'] } })
  assert.equal(before[0].as, 'The showw is made.', 'without the rule, showw was tried first')
  const now = lineCandidates('The show is made.', null, ['show'], { dict: DICT, learned: { show: ['showw', 'sshow'] }, accept })
  assert.ok(!now.some((c) => /showw|sshow|shoh/.test(c.as)), now.map((c) => c.as).join(' | '))
  assert.ok(now.some((c) => c.why === 'comma before show'), 'commas are still tried')
  const avoided = lineCandidates('The show is made.', null, ['show'], { dict: DICT, learned: { show: ['showw'] }, avoid: { show: ['showw'] } })
  assert.ok(!avoided.some((c) => c.as.includes('showw')))
  // a hand respelling that misleads can still be taken back out
  const back = lineCandidates('The show is made.', 'The showw is made.', ['show'], { dict: DICT, accept })
  assert.equal(back[0].as, 'The show is made.')
  assert.equal(back[0].why, 'as written')
  // a doubling that keeps the word is still offered
  assert.ok(lineCandidates('A bell rang.', null, ['bell'], { dict: DICT, learned: { bell: ['belll'] }, accept })[0].as === 'A belll rang.')
})

const HAS_BUN = spawnSync('bun', ['--version']).status === 0

test('the engine itself: show is ʃ oʊ, showw is ʃ aʊ w, and the rule says so (bun; skipped without it)', { skip: !HAS_BUN && 'bun is not installed' }, () => {
  const tools = fileURLToPath(new URL('../tools/sounds.ts', import.meta.url))
  const code = `
    const { soundsTools } = await import(${JSON.stringify(tools)});
    const { wordSounds } = await import(${JSON.stringify(fileURLToPath(new URL('../tools/sounds.mjs', import.meta.url)))});
    const t = await soundsTools();
    const out = {};
    for (const [w, s] of [['show', 'showw'], ['show', 'sshoww'], ['show', 'sshow'], ['this', 'thiss'], ['bell', 'belll'], ['Velum', 'Vee-lum']]) out[w + '/' + s] = wordSounds(w, s, t);
    console.log(JSON.stringify(out));`
  const r = spawnSync('bun', ['-e', code], { encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  const out = JSON.parse(r.stdout.trim().split('\n').pop())
  assert.deepEqual([out['show/showw'].plain, out['show/showw'].ipa, out['show/showw'].keeps], ['ʃ oʊ', 'ʃ aʊ w', false])
  assert.deepEqual([out['show/sshoww'].ipa, out['show/sshoww'].keeps], ['s ʃ aʊ w', false])
  assert.equal(out['show/sshow'].keeps, false)
  assert.deepEqual([out['this/thiss'].plain, out['this/thiss'].ipa, out['this/thiss'].keeps], ['ð ɪ s', 'θ ɪ s s', false])
  assert.equal(out['bell/belll'].keeps, true)
  assert.equal(out['Velum/Vee-lum'].keeps, null)
})
