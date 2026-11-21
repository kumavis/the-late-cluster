// Stated pronouns in the pipeline (README "Pronouns"), on invented accounts: the phrase reaching a
// card, the terms file and a brief; the script gate's fail, warn and verbatim exemption.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { STAGE_DEFS } from '../src/stages.mjs'
import { renderBrief } from '../src/briefs.mjs'
import { task } from '../src/stage/common.mjs'
import { PRONOUN_RULE, pronounGateLines, pronounProblems } from '../src/pronouns.mjs'
import { cleanup, ctxFor, fakeRepo, makeEpisode, POSTS, put, WEEK, ID } from './helpers.mjs'

test('pronouns: the phrase reaches a kept card, the terms file and a brief; "none stated" otherwise', async () => {
  const root = fakeRepo()
  try {
    makeEpisode(root, {
      files: {
        'production/research/cards/made/made-golem.json': { id: 'made-golem', lane: 'made', title: 'Golem', skeletons: ['k-1'], summary: 'a golem', media: {}, showable: 'none', unknown: 'none', sensitive: 'none' },
        'production/review/screen.json': { cards: { 'made-golem': { keep: true, reason: 'fine', terms: 'none' } } },
      },
    })
    put(root, `data/weeks/${WEEK}/skeletons/index.json`, { skeletons: [{ id: 'k-1', lane: 'made' }] })
    put(root, `data/weeks/${WEEK}/skeletons/k-1.json`, { id: 'k-1', posts: [
      { uri: POSTS.build.uri, text: POSTS.build.text, handle: 'cy.test', author: { did: 'did:plc:cy', handle: 'cy.test', pronouns: { text: 'xe/xem', forms: ['xe'], source: 'profile' } } },
      { uri: POSTS.boReply.uri, text: POSTS.boReply.text, handle: 'bo.test', author: { did: 'did:plc:bo', handle: 'bo.test', pronouns: null } },
    ] })
    const ctx = await ctxFor(root)
    STAGE_DEFS.research.waves[1].after(ctx)
    const kept = JSON.parse(readFileSync(join(root, `episodes/${ID}/production/research/kept/made-golem.json`), 'utf8'))
    assert.deepEqual(kept.people.map((p) => [p.handle, p.pronouns]), [['cy.test', 'xe/xem'], ['bo.test', 'none stated']])
    assert.match(readFileSync(join(root, `episodes/${ID}/production/research/terms.md`), 'utf8'), /@cy\.test: xe\/xem; @bo\.test: none stated/)
    const t = task(ctx, 'brainstorm', { id: 'brainstorm.writer-1', role: 'writer', title: 'Brainstorm', writes: ['ideas/writer-1.json'], cards: ['made-golem'], instructions: ['go'] })
    const { text } = renderBrief(ctx, t)
    assert.ok(text.includes(PRONOUN_RULE))
    assert.match(text, /- @cy\.test: xe\/xem\n- @bo\.test: none stated/)
  } finally { cleanup(root) }
})

const ctxOf = (accounts = {}, sources = null) => ({
  config: { pronouns: { house: { larry: { text: 'he/him', forms: ['he'] }, sibyl: { text: 'she/her', forms: ['she'] }, hy: null } } },
  digest: { posts: new Map(), accounts: new Map(Object.entries(accounts)) },
  castInfo: { cast: { larry: {}, sibyl: {}, hy: {}, g1: { guest: true, handle: 'they.example.test' } }, guests: new Set(['g1']) },
  sources,
})
const script = (beats) => `export default { id: 'seg', beats: [\n${beats.join(',\n')}\n] }\n`

test('pronouns gate: fails when nobody in the segment stated the form, warns naming who could be meant, exempts verbatim lines', () => {
  const ctx = ctxOf({ 'they.example.test': { did: 'did:plc:t', pronouns: { text: 'they/them', forms: ['they'] } } })
  const fail = pronounProblems(ctx, { seg: 'seg', file: 'f.js', text: script([`{ say: 'hy', text: 'Our guest says she built it herself.' }`, `{ say: 'g1', text: 'I did build it.' } // verbatim: at://did:plc:t/app.bsky.feed.post/1`]) })
  const lines = pronounGateLines(fail)
  assert.equal(lines.failures.length, 2, 'she and herself: nobody here is she')
  assert.match(lines.failures[0], /nobody in this segment has stated "she".*@they\.example\.test \(guest g1\): they\/them/)
  assert.equal(pronounGateLines(fail, { blocking: false }).failures.length, 0, 'a warning at the draft stage')
  assert.equal(pronounGateLines(fail, { blocking: false }).warnings.length, 2)

  const warn = pronounGateLines(pronounProblems(ctx, { seg: 'seg', file: 'f.js', text: script([`{ say: 'sibyl', text: 'Larry, his card, please.' }`, `{ say: 'larry', text: 'Thank you.' }`]) }))
  assert.equal(warn.failures.length, 0)
  assert.match(warn.warnings[0], /"his" .* could refer to larry/)

  // a real person's verbatim line keeps its words, even read by a house character; their own lines too
  const exempt = pronounProblems(ctx, { seg: 'seg', file: 'f.js', text: script([`{ say: 'hy', text: 'she said yes to the golem' } // verbatim: at://did:plc:t/app.bsky.feed.post/2`, `{ say: 'g1', text: 'he left the golem on' } // verbatim: at://did:plc:t/app.bsky.feed.post/3`]) })
  assert.equal(exempt.problems.length, 0)

  // on-screen text is read too
  const screen = pronounProblems(ctx, { seg: 'seg', file: 'f.js', text: script([`{ say: 'hy', text: 'Look.' }`]), screen: [{ file: 'index.js', text: "export const chyron = 'SHE MADE A GOLEM'\n" }] })
  assert.equal(pronounGateLines(screen).failures.length, 1)
})
