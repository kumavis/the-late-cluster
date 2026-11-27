// The owner's ruling of 27 November 2026 (bible R2, R11): "anything said in public is fair game
// unless they explicitly asked this account to not do that". A general remark about quoting is
// a repost note that travels with the post; an ask addressed to the show still excludes.
// Synthetic data with invented accounts. No network.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadConfig } from '../src/config.js'
import { Consent, exclusionReasons } from '../src/consent.js'
import { normalizePost } from '../src/normalize.js'
import { analyze } from '../src/digest.js'
import { buildSkeletons, renderLane } from '../src/skeletons.js'
import { renderStory } from '../src/render-md.js'
import { refusal } from '../src/media.js'
import { compact } from '../src/lookup.js'
import { post, uriOf, ACCOUNTS } from './fixtures/synthetic.js'

const cfg = loadConfig()
const W = { label: '2026-W46', kind: 'week', start: Date.parse('2026-11-09T00:00:00Z'), end: Date.parse('2026-11-16T00:00:00Z') }
const MEMBERS = new Set(['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'].map((k) => ACCOUNTS[k].did))

function run(raw) {
  const consent = new Consent({ blockedLabels: cfg.scoring.blockedLabels, selfDeclaredPatterns: cfg.safety.selfDeclaredOptOut.patterns, indirectPatterns: cfg.safety.selfDeclaredOptOut.indirectPatterns, reviewPatterns: cfg.safety.bioReview.patterns, naming: cfg.safety.excludedMentions })
  const posts = raw.map((v) => normalizePost(v, { source: 'author' }))
  const d = analyze({ posts, memberDids: MEMBERS, window: W, baselineStart: W.start - 21 * 86_400_000, baselineWeeks: 3, consent, scoring: cfg.scoring, safety: cfg.safety, show: { ...cfg.show, performableThreads: { count: 0 } }, games: {} })
  return { consent, d }
}

const thread = () => {
  const root = post('alpha', 'root', { text: "don't quote me on this, but the synth league is real and I built the scoreboard", at: '2026-11-10T10:00:00Z', likes: 20, replies: 3 })
  return [
    root,
    post('bravo', 'r1', { text: 'the scoreboard rules', reply: { root: root.uri }, at: '2026-11-10T11:00:00Z', likes: 8 }),
    post('charlie', 'r2', { text: 'fantasy synth league when', reply: { root: root.uri }, at: '2026-11-10T12:00:00Z', likes: 5 }),
    post('alpha', 'r3', { text: 'next week: playoffs', reply: { root: root.uri, parent: uriOf('charlie', 'r2') }, at: '2026-11-10T13:00:00Z', likes: 4 }),
  ]
}

test('a "don\'t quote me" post is a repost note: no consent mark, and its story stays in', () => {
  const { d, consent } = run(thread())
  const story = d.stories.find((s) => s.posts[0].uri === uriOf('alpha', 'root'))
  assert.ok(story, 'the story is there')
  assert.equal(story.outOfBounds, null, 'not left out')
  assert.equal(story.consentMarked, 0)
  assert.equal(story.repostNoted, 2)
  const lead = story.posts[0]
  assert.equal(lead.consent, undefined, 'no exclusion-grade mark')
  assert.equal(lead.sensitive, undefined)
  assert.deepEqual(lead.repostNotes, ['says "don\'t quote me" (asked not to be quoted)'])
  assert.equal(lead.text, "don't quote me on this, but the synth league is real and I built the scoreboard", 'the text is kept as written')
  // the author's other post in the story carries a note too, and is still usable
  const other = story.posts.find((p) => p.uri === uriOf('alpha', 'r3'))
  assert.equal(other.consent, undefined)
  assert.match(other.repostNotes[0], /said something about being quoted elsewhere in this story/)
  assert.equal(consent.excludedDid(ACCOUNTS.alpha.did), false, 'a general remark excludes nobody')
  assert.equal(d.reviewers.aboutShow.optOutRequests.length, 0)
  // the note shows in digest.md, the skeleton, the lanes and lookup, and media does not refuse it
  assert.match(renderStory(story), /repost note, for the repost test: says "don't quote me"/)
  assert.match(renderStory(story), /> don't quote me on this/, 'the post is quoted in digest.md, not hidden as marked')
  const sk = buildSkeletons({ d, window: d.window, memberDids: MEMBERS, config: cfg })
  const f = sk.files.get(story.id)
  assert.equal(f.excluded, null)
  assert.equal(f.marks.repostNoted, 2)
  assert.deepEqual(f.posts.find((p) => p.uri === uriOf('alpha', 'root')).repostNotes, lead.repostNotes)
  assert.ok(sk.index.skeletons.find((x) => x.id === story.id).repostNoted)
  for (const l of ['talk', 'made']) for (const e of sk.lanes[l].entries.filter((x) => x.id === story.id)) assert.match(e.line, /with a repost note/)
  assert.ok(renderLane(sk.lanes.talk))
  assert.deepEqual(compact(d.postsByUri.get(uriOf('alpha', 'root'))).repostNotes, lead.repostNotes)
  assert.equal(refusal(d.postsByUri.get(uriOf('alpha', 'root'))), null, 'media fetches a post that only has a note')
})

test('an older digest\'s "asks not to be quoted" reads as a note; a real consent reason still refuses', () => {
  assert.deepEqual(exclusionReasons({ consent: ['asks not to be quoted', 'its author asked not to be quoted in this story'] }), [])
  assert.equal(refusal({ uri: 'u', consent: ['asks not to be quoted'] }), null)
  assert.match(refusal({ uri: 'u', consent: ['replies to an excluded account'] }), /marked for consent/)
})

test('an ask addressed to the show still excludes: a post about the show that says not to quote them', () => {
  const show = post('delta', 'show', { text: 'watched The Late Cluster last night, the crow bit got me', at: '2026-11-14T10:00:00Z', likes: 5, replies: 2 })
  const { d, consent } = run([
    ...thread(),
    show,
    post('foxtrot', 'ask', { text: "please don't quote me on the show", reply: { root: show.uri }, at: '2026-11-14T11:00:00Z', likes: 1 }),
    post('echo', 'ask2', { text: "don't quote me, late cluster", at: '2026-11-14T12:00:00Z', likes: 1 }),
    post('foxtrot', 'other', { text: 'my synth patch of the week, very warm', at: '2026-11-12T10:00:00Z', likes: 9 }),
    post('echo', 'other', { text: 'a new drum machine arrived today', at: '2026-11-12T11:00:00Z', likes: 9 }),
  ])
  assert.equal(consent.excludedDid(ACCOUNTS.foxtrot.did), true, 'a reply in a thread about the show')
  assert.equal(consent.excludedDid(ACCOUNTS.echo.did), true, 'a post that names the show and asks not to be quoted')
  assert.equal(consent.excludedDid(ACCOUNTS.alpha.did), false, 'the general remark elsewhere still excludes nobody')
  assert.deepEqual(d.reviewers.aboutShow.optOutRequests.map((r) => r.handle).sort(), ['echo.example.test', 'foxtrot.example.test'])
  const out = JSON.stringify(d.stories) + JSON.stringify(d.posts)
  assert.ok(!out.includes('my synth patch of the week'), "the asker's other posts are gone")
  assert.ok(!out.includes('a new drum machine'))
})
