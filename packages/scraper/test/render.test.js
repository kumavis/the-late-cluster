import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderMarkdown, renderStory, mdText } from '../src/render-md.js'

const story = {
  id: 's-0123456789', rank: 1, kind: 'built', headline: 'I built the *thing* <script>',
  reason: ['2 posts link to thing.example.test, a domain not seen in the baseline', '3 cluster members took part'],
  scores: { total: 3.21, engagement: { raw: 4, norm: 1, weight: 1 }, built: { raw: 3, norm: 1, weight: 1.3 }, breadth: { raw: 1, norm: 0.5, weight: 1.6 } },
  stats: { posts: 6, authors: 3, members: 3, engagement: 120, memberReposts: 0, quotePosts: 1, days: ['2026-11-10', '2026-11-12'] },
  links: [{ url: 'https://thing.example.test', title: 'Thing', domain: 'thing.example.test', members: 2, posts: 2, isNewDomain: true }],
  phrases: ['the thing'],
  context: [],
  posts: [
    { uri: 'at://did:plc:a/app.bsky.feed.post/1', url: 'https://bsky.app/profile/a.example.test/post/1', handle: 'a.example.test', displayName: 'A', text: 'line one\n# not a heading\n> not a quote', time: '2026-11-10T10:00:00Z', counts: { likes: 10, reposts: 1, replies: 2, quotes: 0 }, member: true, metrics: { lift: 2 }, imageAlts: ['a drawing'], links: [] },
    { uri: 'at://did:plc:b/app.bsky.feed.post/2', url: 'https://bsky.app/profile/b.example.test/post/2', handle: 'b.example.test', displayName: null, text: 'reply', time: '2026-11-10T11:00:00Z', counts: { likes: 1, reposts: 0, replies: 0, quotes: 0 }, member: false, metrics: { lift: 0 }, quoted: { handle: 'c.example.test', text: 'the quoted bit' }, links: [] },
  ],
}

test('markdown escaping keeps post text literal', () => {
  assert.equal(mdText('a *b* [c](d) <e> #f |g'), 'a \\*b\\* \\[c\\](d) \\<e\\> \\#f \\|g')
})

test('a story renders headline, reasons, quotes, counts and links', () => {
  const md = renderStory(story, { postsPerStory: 4 })
  assert.match(md, /^### 1\. I built the \\\*thing\\\* \\<script\\>/)
  assert.match(md, /`built` · 6 posts · 3 members · 2026-11-10 → 2026-11-12 · score 3\.21/)
  assert.match(md, /\*Why these are together:\* 2 posts link to thing\.example\.test/)
  assert.match(md, /> line one\n> \\# not a heading\n> \\> not a quote/)
  assert.match(md, /\*\[image: a drawing\]\*/)
  assert.match(md, /— \*\*A\*\* @a\.example\.test · Tue 10:00Z · 10 likes · 1 repost · 2 replies · 4x the author's usual · \[open\]\(https:\/\/bsky\.app\/profile\/a\.example\.test\/post\/1\)/)
  assert.match(md, /@b\.example\.test \(outside the cluster\)/)
  assert.match(md, /> > quoting @c\.example\.test: the quoted bit/)
  assert.match(md, /\*4 more posts in digest\.json under `s-0123456789`\.\*/)
})

test('the full digest renders overview, stories and every appendix', () => {
  const digest = {
    window: { label: '2026-W46', start: '2026-11-09T00:00:00.000Z', end: '2026-11-16T00:00:00.000Z', baselineWeeks: 3, hasBaseline: true },
    run: { generatedAt: '2026-11-19T08:00:00.000Z', requests: 321, cacheHits: 0, retries: 1, rateLimited: 0, runtimeSeconds: 42, warnings: [] },
    stats: { cluster: { members: 80, seeds: 4, candidates: 900, cutByCap: 10 }, posts: { window: 500, baseline: 900, priorFiles: 0 }, excluded: { optedOutAccountsSeen: 1, noUnauthenticatedAccounts: 0, postsDroppedOptOut: 2, postsDroppedNoUnauthenticated: 0, postsDroppedLabel: { porn: 1 }, quotesStripped: 1, replyLinksHidden: 1, mentionsRedacted: 0 } },
    overview: { posts: 500, memberPosts: 450, activeMembers: 70, clusterSize: 80, postsByDay: { '2026-11-10': 100 }, spiking: ['the thing'], built: [{ title: 'Thing', url: 'https://thing.example.test', builtBy: 'a.example.test', wishBy: 'w.example.test' }], weeks: ['thing week'], outOfBounds: [], biggestPost: null, breakoutPost: null },
    authors: { 'did:plc:a': { followers: 120, small: true } },
    sections: {
      built: [{
        kind: 'built', title: 'Thing', links: [{ url: 'https://thing.example.test', domain: 'thing.example.test', title: 'Thing', story: 1 }], builtAt: '2026-11-10T10:00:00Z',
        builtBy: { handle: 'a.example.test', displayName: 'A', text: 'built it', url: 'https://bsky.app/b', time: '2026-11-10T10:00:00Z', counts: { likes: 3, reposts: 0, replies: 1, quotes: 0 }, authorFollowers: 120, smallAccount: true },
        wish: { handle: 'w.example.test', displayName: null, text: 'someone should build a thing', url: 'https://bsky.app/w', time: '2026-11-10T09:00:00Z', counts: { likes: 9, reposts: 0, replies: 2, quotes: 0 }, member: true, authorFollowers: 2000 },
        sharedBy: [{ handle: 's.example.test', url: 'https://bsky.app/s' }],
      }],
      aboutShow: { posts: [{ handle: 'r.example.test', text: 'loved the crow', time: '2026-11-11T10:00:00Z', counts: { likes: 1, reposts: 0, replies: 0, quotes: 0 }, url: 'https://bsky.app/r', why: ['names the show'], correction: true }], optOutRequests: [{ handle: 'o.example.test', url: 'https://bsky.app/o' }] },
      newVoices: [{ handle: 'g.example.test', displayName: 'G', followers: 120, small: true, postsInWindow: 7, top: [{ handle: 'g.example.test', text: 'gm', time: '2026-11-12T10:00:00Z', counts: { likes: 5, reposts: 0, replies: 0, quotes: 0 }, url: 'https://bsky.app/g', authorFollowers: 120, smallAccount: true, reach: { score: 10, participants: 1, interactions: 5 } }] }],
      interview: { rule: 'A parent is a question if ...', candidates: [{ handle: 'i.example.test', displayName: 'I', followers: 900, small: false, featuredEarlier: null, pairCount: 3, questions: 2, questioners: 2, pairs: [
        { kind: 'question', question: { kind: 'question', handle: 'q.example.test', text: 'what is the crow for?', url: 'https://bsky.app/q' }, answer: { text: 'the crow is for everyone', url: 'https://bsky.app/a' } },
      ] }] },
    },
    stories: [story],
    appendices: {
      activeAccounts: [{ did: 'did:plc:a', handle: 'a.example.test', displayName: 'A', posts: 30, repliesToMembers: 12, engagement: 400, best: { url: 'https://bsky.app/x', text: 'best' } }],
      built: [{ url: 'https://thing.example.test', title: 'Thing', members: 2, posts: 2, storyRank: 1, firstPost: { handle: 'a.example.test', url: 'https://bsky.app/x' } }],
      links: [{ url: 'https://thing.example.test', title: 'Thing', members: 2, posts: 2, newDomain: true, firstPost: { handle: 'a.example.test', url: 'https://bsky.app/x' } }],
      phrases: [{ term: 'the thing', authors: 5, per1k: 12.5, baselinePer1k: 0, ratio: 6, days: 4, isNew: true, first: { handle: 'a.example.test', url: 'https://bsky.app/x', text: 'the thing', time: '2026-11-09T08:00:00Z' } }],
      weeks: [{ term: 'thing week', authors: 2, posts: 3, declared: true, first: { handle: 'a.example.test', url: 'https://bsky.app/wk', text: "it's thing week", time: '2026-11-09T07:00:00Z' } }],
      runningBits: [{ term: 'the thing', days: 4, authors: 5 }],
    },
    settings: { storiesInMarkdown: 15, postsPerStory: 2 },
  }
  const md = renderMarkdown(digest)
  assert.match(md, /^# Cluster digest: 2026-W46\n\nMon 9 Nov 2026 to Sun 15 Nov 2026 \(UTC\)\. 450 posts from 70 active accounts in a cluster of 80/)
  assert.match(md, /1\. \*\*I built the \\\*thing\\\* \\<script\\>\*\* \(built, 3 members, 6 posts\)/)
  assert.match(md, /\*\*Running bits \(3\+ days\):\*\* "the thing" \(4 days, 5 people\)/)
  assert.match(md, /\| \*\*A\*\* @a\.example\.test \| 120 \(small\) \| 30 \| 12 \| 400 \|/)
  assert.match(md, /\*\*Got built:\*\* \[Thing\]\(https:\/\/thing\.example\.test\) by @a\.example\.test, wished for by @w\.example\.test/)
  assert.match(md, /\*\*Weeks declared:\*\* "thing week"/)
  // built this week, near the top
  assert.ok(md.indexOf('## Built this week') < md.indexOf('## Stories'))
  assert.match(md, /\*\*1\. \[Thing\]\(https:\/\/thing\.example\.test\)\*\* · story 1/)
  assert.match(md, /The wish: @w\.example\.test \(2,000 followers\), Tue 09:00Z[\s\S]*> someone should build a thing/)
  assert.match(md, /Built by \*\*A\*\* @a\.example\.test \(\*\*small account\*\*, 120 followers\)/)
  assert.match(md, /Shared by \[@s\.example\.test\]/)
  // about the show
  assert.match(md, /Requests to be left out \(1\)[\s\S]*- @o\.example\.test: \[the post\]\(https:\/\/bsky\.app\/o\)/)
  assert.match(md, /@r\.example\.test, Wed 10:00Z · names the show · \*\*possible correction\*\*: "loved the crow"/)
  // new voices and interview material
  assert.match(md, /## New voices[\s\S]*### \*\*G\*\* @g\.example\.test \(\*\*small account\*\*, 120 followers\)\n\n7 posts this week\. Strongest:/)
  assert.match(md, /reach 10 \(1 participant\)/)
  assert.match(md, /Reach is not views/)
  assert.match(md, /## Interview material[\s\S]*### \*\*I\*\* @i\.example\.test \(900 followers\)\n\n3 pairs \(2 direct questions\), from 2 different askers\.\n\n- \*\*Q\*\* \(question, @q\.example\.test\): what is the crow for\? \[open\]\(https:\/\/bsky\.app\/q\)\n  \*\*A\*\*: the crow is for everyone \[open\]/)
  assert.ok(!md.includes('Recurring guests'))
  // phrases and weeks
  assert.match(md, /\| "the thing" \(new\) \| 5 \| 12\.5 \| 0 \| 6 \| 4 \| \[@a\.example\.test, Mon 08:00Z: the thing\]/)
  assert.match(md, /## Appendix D: "X week" declarations[\s\S]*\| "thing week" \| 2 \| 3 \| yes \|/)
  assert.match(md, /Requests: 321 made/)
  assert.match(md, /1 porn by content label/)

  // a --since window describes its real ends, not a week
  const r = renderMarkdown({ ...digest, window: { ...digest.window, kind: 'range', label: '2026-11-13T0000Z_2026-11-19T0831Z', start: '2026-11-13T00:00:00.000Z', end: '2026-11-19T08:31:00.000Z' } })
  assert.match(r, /^# Cluster digest: Fri 13 Nov 2026 to Thu 19 Nov 2026\n\nFri 13 Nov 00:00Z to Thu 19 Nov 08:31Z \(UTC, 6\.4 days\)\./)
  assert.match(r, /## The window at a glance/)
  assert.match(r, /## Built in this window/)
  assert.match(r, /Busiest day:\*\* Tue 10 Nov 2026 \(100 posts\); the first and last days of the window may be partial/)
  assert.deepEqual(r.split('\n').filter((l) => /this week/.test(l)), [], 'no "this week" wording in a range digest')
})

test('an out-of-bounds story renders as a marked headline with no posts', () => {
  const md = renderStory({ ...story, outOfBounds: { topics: ['health'], counts: { health: 3 } } })
  assert.match(md, /^### 1\. \*\*OUT OF BOUNDS \(health\)\*\*: I built the/)
  assert.match(md, /Not for the show \(bible R10\)\. 6 posts, 3 members; flagged posts by topic: health 3/)
  assert.ok(!md.includes('line one'))
  assert.ok(!/^> /m.test(md))
})

test('a performable thread renders as indented dialogue with removal markers', async () => {
  const { renderThread, renderGames } = await import('../src/render-md.js')
  const t = {
    url: 'https://bsky.app/t', speakers: 3, memberSpeakers: 3, turns: 2, complete: true, removedPosts: 1,
    posts: [
      { handle: 'a.example.test', displayName: 'A', text: 'what if *crows*', depth: 0 },
      { handle: 'b.example.test', displayName: null, text: 'line one\nline two', depth: 1, smallAccount: true },
      { removed: true, count: 1, inReplyTo: 'at://x', depth: 2 },
      { handle: 'c.example.test', displayName: 'C', text: 'yes', depth: 1 },
    ],
  }
  const md = renderThread(t, 0)
  assert.match(md, /^### Thread 1: what if \\\*crows\\\*/)
  assert.match(md, /3 posts · 3 speakers \(3 in the cluster\) · 2 turns · complete thread · 1 post removed/)
  assert.match(md, /- \*\*A\*\* \(@a\.example\.test\): what if \\\*crows\\\*\n  - \*\*b\.example\.test\*\* \(@b\.example\.test, small account\): line one\n    line two\n    - \*\(a reply here not included\)\*\n  - \*\*C\*\* \(@c\.example\.test\): yes/)
  const g = renderGames([{ name: 'Game', account: 'g.example.test', about: 'daily', writerNote: 'keep winners anonymous', results: [] }])
  assert.match(g, /### Game \(@g\.example\.test\)\n\n\*daily\*\n\n\*\*For the writer:\*\* keep winners anonymous\n\nNo results posted in the window\./)
})

test('a story with a post asking not to be quoted withholds even its headline', () => {
  const md = renderStory({ ...story, outOfBounds: { topics: ['asked not to be quoted'], counts: { 'asked not to be quoted': 1 } } })
  assert.match(md, /^### 1\. \*\*OUT OF BOUNDS \(asked not to be quoted\)\*\*: \*\(headline withheld: a post here asks not to be quoted\)\*/)
  assert.ok(!md.includes('I built the'))
})
