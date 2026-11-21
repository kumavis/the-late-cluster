// The tagged lane (README "The tagged lane") on synthetic data with invented accounts. No network.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadConfig } from '../src/config.js'
import { Consent } from '../src/consent.js'
import { normalizePost } from '../src/normalize.js'
import { showMatcher, findShowPosts } from '../src/show.js'
import { findTags, tagSets, classifyTag, centralityOf, buildTaggedLane, taggedLine } from '../src/tagged.js'
import { renderLane } from '../src/skeletons.js'
import { analyze } from '../src/digest.js'

const cfg = loadConfig()
const T = cfg.lanes.tagged
const D = (n) => `did:plc:tagtest${String(n).padStart(18, '0')}`
const SHOW = D(0)
const H = (n) => `p${n}.example.test`
const U = (n, r) => `at://${D(n)}/app.bsky.feed.post/${r}`
const WINDOW = { label: 'test', start: Date.parse('2026-11-09T00:00:00Z'), end: Date.parse('2026-11-16T00:00:00Z') }
const dids = new Set([SHOW])
const matcher = showMatcher({ ...cfg.show, accountDids: [SHOW] })

/** A normalized post. o: text, at, reply {root,parent}, quote (normalized post), tag (mention the show), link, image, author n */
function P(n, r, o = {}) {
  const text = o.text ?? ''
  const tagText = '@show.example.test'
  const full = o.tag ? `${text} ${tagText}`.trim() : text
  const view = {
    uri: U(n, r), cid: 'c', author: { did: D(n), handle: H(n), displayName: `Person ${n}`, labels: o.labels ?? [] },
    record: { $type: 'app.bsky.feed.post', text: full, createdAt: o.at ?? '2026-11-10T12:00:00.000Z', ...(o.reply ? { reply: { root: { uri: o.reply.root }, parent: { uri: o.reply.parent ?? o.reply.root } } } : {}) },
    indexedAt: o.at ?? '2026-11-10T12:00:00.000Z', likeCount: o.likes ?? 0, repostCount: 0, replyCount: 0, quoteCount: 0,
  }
  if (o.tag) {
    const start = Buffer.byteLength(full.slice(0, full.indexOf(tagText)))
    view.record.facets = [{ index: { byteStart: start, byteEnd: start + Buffer.byteLength(tagText) }, features: [{ $type: 'app.bsky.richtext.facet#mention', did: SHOW }] }]
  }
  if (o.link) view.embed = { $type: 'app.bsky.embed.external#view', external: { uri: o.link, title: 'a thing', description: '' } }
  if (o.image) view.embed = { $type: 'app.bsky.embed.images#view', images: [{ alt: 'a drawing', thumb: 't', fullsize: 'f' }] }
  if (o.quote) view.embed = { $type: 'app.bsky.embed.record#view', record: { $type: 'app.bsky.embed.record#viewRecord', uri: o.quote.uri, cid: 'c', author: { did: o.quote.authorDid, handle: o.quote.handle }, value: { $type: 'app.bsky.feed.post', text: o.quote.text, createdAt: o.quote.createdAt }, indexedAt: o.quote.indexedAt } }
  return normalizePost(view)
}
const lookupOf = (posts) => { const m = new Map(posts.map((p) => [p.uri, p])); return (u) => m.get(u) ?? null }
const cls = (p, posts) => classifyTag(p, { lookup: lookupOf(posts), dids, matcher, cfg: T })

test('tagged: a pointer by reply, by quote and by a top-level post; tags only about the show are not', () => {
  const art = P(2, 'art', { text: 'drew the cluster as a lighthouse', image: true })
  const byReply = P(1, 'r', { text: 'look at this', tag: true, reply: { root: art.uri } })
  const byQuote = P(1, 'q', { text: 'this one', tag: true, quote: art })
  const byLink = P(1, 'l', { text: 'a site', tag: true, link: 'https://thing.example.test/' })
  const byOwn = P(1, 'o', { text: 'everyone in the cluster baked a pie today and ranked them', tag: true })
  const posts = [art, byReply, byQuote, byLink, byOwn]
  assert.deepEqual([cls(byReply, posts).kind, cls(byReply, posts).target], ['reply', art.uri])
  assert.deepEqual([cls(byQuote, posts).kind, cls(byQuote, posts).target], ['quote', art.uri])
  assert.deepEqual([cls(byLink, posts).kind, cls(byLink, posts).link], ['link', 'https://thing.example.test'])
  assert.equal(cls(byOwn, posts).kind, 'post')

  const show = P(0, 'ep', { text: 'episode two is up' })
  const praise = P(1, 'praise', { text: 'loved the episode', tag: true })
  const underShow = P(1, 'u', { text: 'this was great', tag: true, reply: { root: show.uri } })
  const bare = P(1, 'b', { text: 'hi', tag: true })
  const naming = P(3, 'n', { text: 'the late cluster put my bit in' })
  const underNaming = P(1, 'un', { text: 'ha', tag: true, reply: { root: naming.uri } })
  const all = [show, praise, underShow, bare, naming, underNaming]
  assert.equal(cls(praise, all).pointer, false)
  assert.equal(cls(underShow, all).why, "under the show's own post")
  assert.equal(cls(bare, all).why, 'only the tag')
  assert.equal(cls(underNaming, all).why, 'in a thread about the show')
  assert.deepEqual(cls(show, all), { own: true })

  // A pointer is not a post about the show; a tag about the show still is, and so is a reply to a reply pointer.
  const tags = findTags([...posts, ...all], { lookup: lookupOf([...posts, ...all]), dids, matcher, cfg: T, window: WINDOW })
  const sets = tagSets(tags)
  const reaction = P(4, 'x', { text: 'good call', reply: { root: art.uri, parent: byReply.uri } })
  const found = findShowPosts([...posts, ...all, reaction], { ...cfg.show, accountDids: [SHOW] }, cfg.safety, sets)
  for (const p of [byReply, byQuote, byLink, byOwn, art]) assert.ok(!found.about.has(p.uri), p.uri)
  for (const p of [praise, underShow, bare]) assert.ok(found.about.has(p.uri), p.uri)
  assert.ok(found.about.has(reaction.uri))
})

test('tagged: a reply pointer stays out of the stories, their scores and reach', () => {
  const art = P(2, 'art', { text: 'drew the cluster as a lighthouse', image: true, likes: 3 })
  const ptr = P(1, 'r', { text: 'look at this', tag: true, reply: { root: art.uri } })
  const posts = [art, ptr]
  const tags = findTags(posts, { lookup: lookupOf(posts), dids, matcher, cfg: T, window: WINDOW })
  const consent = new Consent({})
  const args = (tagged) => ({ posts: posts.map((p) => ({ ...p })), memberDids: new Set([D(1), D(2)]), window: WINDOW, baselineStart: WINDOW.start - 1, baselineWeeks: 0, consent, scoring: cfg.scoring, safety: cfg.safety, show: { ...cfg.show, accountDids: [SHOW], performableThreads: { count: 0 } }, games: {}, tagged })
  const d = analyze(args(tagSets(tags)))
  const st = d.stories.find((s) => (s._posts ?? s.posts).some((p) => p.uri === art.uri))
  assert.equal((st._posts ?? st.posts).length, 1, 'the pointer is not in the story')
  assert.equal(st.reach.participants, 1)
  assert.ok(d.addressedByUri.get(ptr.uri)?.addressedToShow)
  assert.ok(d.posts.some((p) => p.uri === ptr.uri && p.addressedToShow), 'written to posts.jsonl, marked')
})

// The lane over hand-made skeletons.
function laneWorld(extra = {}) {
  const consent = new Consent({ optOut: [D(9)] })
  const members = [
    { did: D(1), score: 30, seed: false, signals: { seedFollows: 6, interactions: 12, rosters: [], feedPosts: 0, termPosts: 0, listed: false } },
    { did: D(2), score: 6, seed: false, signals: { seedFollows: 2, interactions: 0, rosters: [], feedPosts: 0, termPosts: 0, listed: false } },
    { did: D(3), score: 12, seed: false, signals: { seedFollows: 4, interactions: 0, rosters: [], feedPosts: 0, termPosts: 0, listed: false } },
    { did: D(7), score: 20, seed: false, signals: {} }, // a bot
  ]
  const memberDids = new Set(members.map((m) => m.did))
  const things = [1, 2, 3, 4, 5, 6, 7, 8].map((k) => P(5, `t${k}`, { text: `thing ${k}`, at: '2026-11-10T00:00:00Z' }))
  const excludedThing = P(9, 'gone', { text: 'an excluded account post' })
  const files = new Map(things.map((t, i) => [`s-${i + 1}`, { id: `s-${i + 1}`, lanes: [], marks: {}, headline: t.text, reach: { score: 10 * (i + 1) }, posts: [{ uri: t.uri, url: t.url, handle: t.handle, time: t.time, text: t.text, hasText: true, author: { did: t.authorDid, member: false }, media: [] }] }]))
  const storyOfPost = new Map(things.map((t, i) => [t.uri, `s-${i + 1}`]))
  return { consent, members, memberDids, things, excludedThing, files, storyOfPost, ...extra }
}
function lane(w, pointers) {
  const posts = [...w.things, w.excludedThing, ...pointers]
  const tags = findTags(posts, { lookup: lookupOf(posts), dids, matcher, cfg: T, window: WINDOW })
  const byUri = new Map(posts.map((p) => [p.uri, p]))
  return buildTaggedLane({
    tags, consent: w.consent, isBot: (did) => did === D(7), memberDids: w.memberDids, centrality: centralityOf(w.members, cfg.cluster.expansion, T),
    postOf: (u) => byUri.get(u) ?? null, storyOfPost: w.storyOfPost, files: w.files, authorOf: (did, handle) => ({ did, handle, followers: 100 }), window: WINDOW, cfg: T,
  })
}
const tagAt = (n, r, target, at = '2026-11-11T00:00:00Z') => P(n, r, { text: 'look', tag: true, reply: { root: target.uri }, at })

test('tagged: only members count; a central member outranks a peripheral one; weights and reasons are recorded', () => {
  const w = laneWorld()
  const out = lane(w, [tagAt(2, 'a', w.things[0]), tagAt(1, 'b', w.things[1]), tagAt(8, 'c', w.things[2])])
  assert.equal(out.counts.ignored.notMember, 1, "a non-member's tag is counted")
  assert.ok(!out.entries.some((e) => e.taggers.some((t) => t.did === D(8))), 'and not listed')
  assert.deepEqual(out.entries.map((e) => e.id), ['s-2', 's-1'])
  const top = out.entries[0].taggers[0]
  assert.equal(top.weight, 1)
  assert.equal(top.centrality.raw, 30)
  assert.equal(top.centrality.max, 30)
  assert.deepEqual(Object.keys(top.centrality.components).sort(), ['interactions', 'seedFollows'])
  assert.equal(out.entries[1].weight, 0.2)
  assert.equal(out.entries[0].target.member, false)
  assert.ok(top.addressedToShow)
  assert.match(taggedLine(out.counts), /2 counted, from 2 members/)
  assert.match(renderLane(out), /outside the cluster are not listed/)
})

test('tagged: two members on one target sum; one member twice counts once; later pointers diminish; the cap', () => {
  const w = laneWorld()
  const out = lane(w, [
    tagAt(2, 'a', w.things[0]), tagAt(3, 'b', w.things[0]), tagAt(3, 'b2', w.things[0], '2026-11-12T00:00:00Z'),
  ])
  assert.equal(out.entries.length, 1)
  assert.equal(out.entries[0].people, 2)
  assert.equal(out.entries[0].weight, 0.6, '0.2 + 0.4')
  assert.equal(out.counts.ignored.repeat, 1)

  const many = lane(laneWorld(), w.things.map((t, i) => tagAt(1, `m${i}`, t, `2026-11-1${Math.min(i, 5)}T0${i}:00:00Z`)))
  const ws = many.entries.map((e) => e.taggers[0].weight)
  assert.deepEqual(ws.slice(0, 3), [1, 0.5, 0.25], 'each later pointer counts half the one before')
  assert.equal(many.entries.length, T.perTaggerCap)
  assert.equal(many.counts.ignored.overCap, w.things.length - T.perTaggerCap)
})

test('tagged: bots, excluded taggers and excluded targets are counted and nothing else; the empty lane', () => {
  const w = laneWorld()
  w.memberDids.add(D(9))
  const out = lane(w, [tagAt(7, 'bot', w.things[0]), tagAt(9, 'ex', w.things[0]), tagAt(1, 'x', w.excludedThing)])
  assert.equal(out.counts.ignored.bot, 1)
  assert.equal(out.counts.ignored.excludedTagger, 1)
  assert.equal(out.counts.ignored.excludedTarget, 1)
  assert.equal(out.entries.length, 0)
  assert.ok(!JSON.stringify(out).includes(D(9)), 'the excluded account is never named')
  assert.match(renderLane(out), /Nothing in this window/)
  const empty = lane(laneWorld(), [])
  assert.equal(empty.entries.length, 0)
  assert.match(taggedLine(empty.counts), /^Tags of the show's account: 0 pointers/)
})
