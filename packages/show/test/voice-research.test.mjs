// The voice research file (tools/voice-research-lib.mjs): the harvest from fit.json, recording a
// hard word by hand, the generated page, and what the fitting tool takes from it (a known spelling
// tried first, a known hard word not searched past its known tries). Node builtins only.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { BLOCKING, blockingFlags } from '../tools/heard.mjs'
import { lineCandidates } from '../tools/respell.mjs'
import { RESEARCH_FILE, PAGE_FILE, addPattern, addWord, emptyResearch, hardLines, harvest, isRecorded, knownFor, loadResearch, mergeWorks, renderPage, tokenHeard, validate } from '../tools/voice-research-lib.mjs'

const HOUSE = new Set(['larry', 'sibyl', 'eppy'])
const SRC = '009-test-week/talk'
const L = (o) => ({ id: 'x', who: 'larry', kind: 'say', text: '', as: null, heard: [], score: { heard: 0, of: 0, min: 0 }, status: 'ok', flags: [], tried: [], ...o })
const FIT = {
  segment: 'talk',
  lines: [
    // a respelling that worked: every take hears "that"
    L({ id: 'part', text: "I'm the part that talks.", as: "I'm the part thatt talks.", heard: [{ text: "I'm the part that talks", count: 4 }],
        tried: [{ as: "I'm the part that talks.", score: {}, heard: [{ text: "I'm the part of the talks", count: 3 }, { text: "I'm the part of the talk ship", count: 1 }] }, { as: "I'm the part thatt talks.", score: {}, heard: [{ text: "I'm the part that talks", count: 4 }] }] }),
    // a respelling heard in only some takes: not a working spelling
    L({ id: 'look', text: 'A look.', as: 'A lookk.', heard: [{ text: 'A look.', count: 2 }, { text: 'A rook.', count: 2 }] }),
    // a respelling never heard, and a symbol said as words: nothing to record
    L({ id: 'velum', text: 'Lips, jaw, velum. ½', as: 'Lips, jaw, Vee-lum. a-half', heard: [{ text: 'Lips, jaw, heelum. a half', count: 4 }] }),
    // a real name respelled: never recorded
    L({ id: 'name', who: 'sibyl', text: 'Ana posted it.', as: 'Ah-nuh posted it.', heard: [{ text: 'Ana posted it.', count: 4 }] }),
    // a line still unsayable, in a guest's voice
    L({ id: 'usage', who: 'anaguest', text: 'Usage limit.', heard: [{ text: 'Are you late, limit?', count: 3 }, { text: 'Be your lead, limit.', count: 1 }], status: 'unsayable', score: { heard: 1, of: 2, min: 1 },
        tried: [{ as: 'Yoos-age limit.', score: {}, heard: [{ text: 'Are you extremely, limit?', count: 2 }] }] }),
  ],
}

test('tokenHeard: what one caption word was heard as, by alignment', () => {
  assert.deepEqual(tokenHeard("I'm the part that talks.", "I'm the part of the talks", 3), { heard: false, as: 'of the' })
  assert.deepEqual(tokenHeard("I'm the part that talks.", "I'm the part that talks", 3), { heard: true, as: 'that' })
  assert.deepEqual(tokenHeard('The script said clue.', 'The script said glue.', 3), { heard: false, as: 'glue' })
  assert.deepEqual(tokenHeard('Usage limit.', 'limit', 0), { heard: false, as: '' })
})

test('harvest: a working respelling goes in as works; a failing line is listed; nothing is invented', () => {
  const h = harvest(FIT, { house: HOUSE, names: ['Ana'] })
  assert.deepEqual(h.works.map((w) => [w.word, w.as, w.voice]), [['that', 'thatt', 'larry']])
  assert.deepEqual(h.works[0].heard, [{ as: 'that', count: 4 }])
  assert.deepEqual(h.works[0].asWritten, [{ as: 'of the', count: 3 }, { as: 'of the talk', count: 1 }])
  assert.deepEqual(h.listed.map((l) => [l.id, l.status, l.voice]), [['usage', 'unsayable', 'guest']])
  assert.deepEqual(h.listed[0].heard.map((x) => x.text), ['Are you late, limit?', 'Be your lead, limit.'])
  assert.deepEqual(h.listed[0].missed, [{ word: 'usage', count: 4 }])
  assert.ok(h.skipped.some((s) => s.word === 'look'), 'heard in some takes only: not recorded')
  assert.ok(h.skipped.some((s) => s.word === '(a name)'), 'a name is never recorded')

  const m = mergeWorks(emptyResearch(), h.works, { source: SRC })
  assert.deepEqual(m.added, ['that'])
  assert.deepEqual(m.research.words.map((e) => e.word), ['that'], 'velum, look, ½ and the name were not recorded')
  const e = m.research.words[0]
  assert.equal(e.status, 'works')
  assert.deepEqual(e.works, [{ as: 'thatt', voices: ['larry'] }])
  assert.deepEqual(e.heard, [{ as: 'of the', count: 3 }, { as: 'of the talk', count: 1 }])
  assert.deepEqual(e.seen, [SRC])
  assert.deepEqual(validate(m.research), [])
  // a second harvest of the same source counts nothing twice
  const again = mergeWorks(m.research, h.works, { source: SRC })
  assert.deepEqual(again.research, m.research)
  assert.deepEqual(again.unchanged, ['that'])
  // a word recorded as cannot keeps its status when a spelling works once: the sound editor judges
  const hard = { ...emptyResearch(), words: [{ word: 'that', status: 'cannot', voices: ['sibyl'], heard: [], spellings: [], works: [], note: 'n', seen: ['009-test-week/other'] }] }
  const kept = mergeWorks(hard, h.works, { source: SRC }).research.words[0]
  assert.equal(kept.status, 'cannot')
  assert.deepEqual(kept.works, [{ as: 'thatt', voices: ['larry'] }])
})

test('addWord: the word that failed, from one line; only a word in the caption, never a name', () => {
  const ctx = { fit: FIT, source: SRC, house: HOUSE, names: ['Ana'] }
  const { research, entry } = addWord(emptyResearch(), { ...ctx, lineId: 'usage', word: 'usage', status: 'cannot', note: 'Never heard in a two-word line.' })
  assert.equal(entry.status, 'cannot')
  assert.deepEqual(entry.voices, ['guest'])
  assert.deepEqual(entry.heard, [{ as: 'are you late', count: 3 }, { as: 'be your lead', count: 1 }])
  assert.deepEqual(entry.spellings, [{ as: 'Yoos-age', voices: ['guest'], heard: [{ as: 'are you extremely', count: 2 }] }])
  assert.deepEqual(entry.seen, [SRC])
  assert.deepEqual(validate(research), [])
  assert.throws(() => addWord(emptyResearch(), { ...ctx, lineId: 'usage', word: 'quota', status: 'cannot', note: 'n' }), /not in the caption/)
  assert.throws(() => addWord(emptyResearch(), { ...ctx, lineId: 'name', word: 'Ana', status: 'cannot', note: 'n' }), /real person's name/)
  assert.throws(() => addWord(emptyResearch(), { ...ctx, lineId: 'nope', word: 'usage', status: 'cannot', note: 'n' }), /no line nope/)
  assert.throws(() => addWord(emptyResearch(), { ...ctx, lineId: 'usage', word: 'usage', status: 'works', note: 'n' }), /needs --as/)
  const p = addPattern(research, { pattern: 'A line of one or two words', note: 'Easily lost.', words: ['usage'], source: SRC })
  assert.deepEqual(p.research.patterns, [{ pattern: 'A line of one or two words', note: 'Easily lost.', words: ['usage'], seen: [SRC] }])
  assert.throws(() => addPattern(research, { pattern: 'x', note: 'y', words: ['ana'], source: SRC, names: ['Ana'] }), /name/)
})

test('hardLines and isRecorded: what the stage 8 gate asks to be recorded', () => {
  const lines = [
    L({ id: 'u', text: 'Usage limit.', status: 'unsayable', missed: [{ word: 'usage', count: 4 }] }),
    L({ id: 'n', text: 'Ana.', status: 'unsayable', flags: ['name: Ana'], missed: [{ word: 'ana', count: 4 }] }),
    L({ id: 's', text: 'It is not.', status: 'flagged', flags: ['statement: negation'] }),
    L({ id: 'a', text: 'A bum.', status: 'flagged', flags: ['alarming: bomb'] }),
    L({ id: 'w', text: 'Wobbly.', status: 'weak' }),
  ]
  assert.deepEqual(hardLines({ lines }).map((l) => l.id), ['u', 's'])
  const r = addWord(emptyResearch(), { fit: FIT, lineId: 'usage', word: 'usage', status: 'cannot', note: 'n', source: SRC, house: HOUSE }).research
  assert.equal(isRecorded(r, lines[0], SRC), true)
  assert.equal(isRecorded(r, lines[0], '009-test-week/elsewhere'), false)
  assert.deepEqual(blockingFlags(['name: Ana', 'crude: shit', 'alarming: bomb', 'out of bounds: funeral', 'statement: negation']), ['crude: shit', 'alarming: bomb', 'out of bounds: funeral'])
  assert.deepEqual(BLOCKING, ['alarming', 'out of bounds', 'crude'])
})

test('the page: the ruling first, then cannot, unstable, patterns, spellings that work; no sources on it', () => {
  const r = {
    ...emptyResearch(),
    words: [
      { word: 'that', status: 'works', voices: ['larry'], heard: [{ as: 'of the', count: 3 }], spellings: [{ as: 'thatt', voices: ['larry'], heard: [{ as: 'that', count: 4 }] }], works: [{ as: 'thatt', voices: ['larry'] }], note: 'Stressed "that" is swallowed.', seen: [SRC] },
      { word: 'clue', status: 'cannot', voices: ['larry'], heard: [{ as: 'glue', count: 4 }], spellings: [], works: [], note: 'Comes out "glue".', seen: [SRC] },
      { word: 'half', status: 'unstable', voices: ['guest'], heard: [{ as: 'head' }], spellings: [{ as: 'one-half', voices: ['guest'], heard: [{ as: 'hit', count: 8 }] }], works: [], note: 'Lost at a line end.', seen: [SRC] },
    ],
    patterns: [{ pattern: 'A word beginning "cl"', note: 'Voiced to "gl".', seen: [SRC] }],
  }
  const page = renderPage(r)
  assert.match(page, /best effort on pronunciation is sufficient, as subtitles\ncarry the line\.\*\* A writer may still use a hard word\./)
  const at = (s) => page.indexOf(s)
  assert.ok(at('## Cannot be said') < at('## Unstable') && at('## Unstable') < at('## Patterns') && at('## Patterns') < at('## Spellings that work'))
  assert.match(page, /\| \*\*clue\*\* \| larry \| "glue" ×4 \| — \| Comes out "glue"\. \|/)
  assert.match(page, /\| \*\*half\*\* \| guest \| "head" \| `one-half` → "hit" ×8 \| Lost at a line end\. \|/)
  assert.match(page, /\| that \| `thatt` \| larry \|/)
  assert.ok(!page.includes(SRC) && !page.includes('009-test-week'), 'where a word was seen stays in the JSON: a writer never reads earlier episodes')
  assert.match(renderPage(emptyResearch()), /## Cannot be said\n\nNo spelling tried was heard as the word\.\n\nNothing recorded yet\./)
})

test('validate: statuses, one-line notes, and sources that are ids, never names', () => {
  const bad = { words: [{ word: 'Usage', status: 'hard', voices: [], heard: [{ as: 'x', count: 0 }], spellings: [], works: [], note: 'two\nlines', seen: ['@ana.bsky.social'] }], patterns: [{ pattern: 'p', note: 'n', seen: ['Ana Example'] }] }
  const p = validate(bad).join('\n')
  for (const re of [/"word" is one lower-case word/, /"status" is works, unstable, cannot/, /"voices" lists/, /positive count/, /"note" is one line/, /"seen" has "@ana\.bsky\.social"/, /patterns\[0\]: "seen" has "Ana Example"/]) assert.match(p, re)
})

test('the fitting tool: a spelling that works in this voice first; a known hard word only its known tries', () => {
  const r = {
    ...emptyResearch(),
    words: [
      { word: 'that', status: 'works', voices: ['larry'], heard: [], spellings: [], works: [{ as: 'thatt', voices: ['larry'] }], note: 'n', seen: [SRC] },
      { word: 'clue', status: 'cannot', voices: ['larry'], heard: [], spellings: [{ as: 'kloo', voices: ['larry'], heard: [] }, { as: 'cloo', voices: ['larry'], heard: [] }], works: [], note: 'n', seen: [SRC] },
      { word: 'usage', status: 'cannot', voices: ['sibyl'], heard: [], spellings: [], works: [], note: 'n', seen: [SRC] },
    ],
  }
  const larry = knownFor(r, 'larry')
  assert.deepEqual(larry.first, { that: ['thatt'] })
  assert.deepEqual(larry.hard, { clue: ['kloo', 'cloo'], usage: [] })
  assert.deepEqual(knownFor(r, 'sibyl').first, {}, 'a spelling that works for Larry is not tried first for Sibyl')
  const dict = new Map([['that', 'DH AE1 T'.split(' ')], ['clue', 'K L UW1'.split(' ')]])
  const first = lineCandidates("I'm the part that talks.", null, ['that'], { dict, learned: larry.first })
  assert.equal(first[0].as, "I'm the part thatt talks.", 'the known spelling is the first candidate')
  const hard = lineCandidates('It heard clue.', null, ['clue'], { dict, hard: larry.hard })
  assert.deepEqual(hard.map((c) => c.as), ['It heard kloo.', 'It heard cloo.'], 'no new search and no commas for a known hard word')
  assert.match(hard[0].why, /\(known\)/)
  // a hard word with no recorded tries is searched as usual
  assert.ok(lineCandidates('Usage limit.', null, ['usage'], { dict: new Map([['usage', 'Y UW1 S IH0 JH'.split(' ')]]), hard: { usage: [] } }).length > 2)
})

test('the committed research file is well formed and its page is up to date', () => {
  const r = loadResearch(RESEARCH_FILE)
  assert.deepEqual(validate(r), [])
  assert.ok(r.words.length > 0 && r.patterns.length > 0)
  for (const e of r.words) for (const v of [...e.voices, ...e.works.flatMap((w) => w.voices)]) assert.ok(['larry', 'sibyl', 'hy', 'al', 'dee', 'pete', 'eppy', 'guest'].includes(v), `${e.word}: voice "${v}" is a house id or "guest"`)
  assert.equal(readFileSync(PAGE_FILE, 'utf8'), renderPage(r), 'docs/voice-research.md is stale: npm run voice-research -- --page')
})
