// The auditor's consent rulings under the owner's ruling of 27 November 2026 (bible R2, R11): an
// account is out for three stops only; a bio line or a general remark is a note, with the exact
// words, for the reviewer's repost test. A noted post is never refused.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CONSENT_STOPS, NOTE_RULE, REPORT_RULE, STOP_RULE, noteProblems, outProblems } from '../src/consent.mjs'
import { markOf, notesOf } from '../src/scraper.mjs'

test('an out names one of the three stops; a bio line or a general remark is not one', () => {
  assert.deepEqual(CONSENT_STOPS, ['opt-out list', '!no-unauthenticated', 'asked the show'])
  assert.deepEqual(outProblems([{ account: 'ana.test', stop: 'opt-out list' }, { account: 'bo.test', stop: '!no-unauthenticated' }, { account: 'cy.test', stop: 'asked the show', evidence: 'at://did:plc:cy/app.bsky.feed.post/1' }, { post: 'at://did:plc:x/app.bsky.feed.post/2', stop: 'gone' }], 'r1.json'), [])
  assert.match(outProblems([{ account: 'ana.test', stop: 'bio says no QTs' }], 'r1.json')[0], /an account is out only for a stop/)
  assert.match(outProblems([{ account: 'ana.test' }], 'r1.json')[0], /a bio line or a general remark is a note, not an out/)
  assert.match(outProblems([{ post: 'at://x', stop: 'asks not to be quoted' }], 'r1.json')[0], /"gone" or "changed"/)
  assert.match(outProblems([{}], 'r1.json')[0], /name an "account" or a "post"/)
})

test('a note has the exact words, where they were said and to whom', () => {
  assert.deepEqual(noteProblems(undefined, 'r1.json'), [])
  assert.deepEqual(noteProblems([{ account: 'ana.test', words: 'bots in my mentions uninvited is rude', where: 'at://did:plc:ana/app.bsky.feed.post/3', to: '@another-bot.test' }, { account: 'bo.test', words: 'no QTs', where: 'bio', to: 'everyone' }], 'r1.json'), [])
  const bad = noteProblems([{ account: 'ana.test', where: 'https://bsky.app/x', to: '' }], 'r1.json')
  assert.ok(bad.some((x) => /give "words"/.test(x)))
  assert.ok(bad.some((x) => /give "to"/.test(x)))
  assert.ok(bad.some((x) => /"where" is the post's at:\/\/ address, or "bio"/.test(x)))
  assert.match(noteProblems('rude', 'r1.json')[0], /"notes" is a list/)
})

test('the brief says what is out, what is a note, and that the auditor reports rather than rules on tagging', () => {
  for (const s of CONSENT_STOPS) assert.ok(STOP_RULE.includes(`"${s}"`), s)
  assert.match(NOTE_RULE, /bio addressed to everyone/)
  assert.match(NOTE_RULE, /how someone reacted to another account/)
  assert.match(NOTE_RULE, /excludes nobody and removes nothing/)
  assert.match(REPORT_RULE, /do not rule on whom the show's account may tag, mention or message/)
  assert.match(REPORT_RULE, /what was said, to whom, and where/)
})

test('a post with only a repost note is not refused, and the card shows the note', () => {
  assert.equal(markOf({ repostNotes: ['says "don\'t quote me" (asked not to be quoted)'] }), null)
  assert.deepEqual(notesOf({ repostNotes: ['says "no QTs"'] }), ['says "no QTs"'])
  // an older digest's "asks not to be quoted" reads as a note
  assert.equal(markOf({ consent: ['asks not to be quoted'] }), null)
  assert.deepEqual(notesOf({ consent: ['asks not to be quoted'] }), ['asks not to be quoted'])
  assert.equal(markOf({ consent: ['asks not to be quoted', 'redacted'] }), 'consent: redacted')
  assert.equal(notesOf({}), null)
})
