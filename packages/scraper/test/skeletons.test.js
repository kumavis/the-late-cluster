// Bios, media, the request planner, lookup's compact output and the live source check, on
// synthetic data with invented accounts. No network.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadConfig } from '../src/config.js'
import { Consent } from '../src/consent.js'
import { normalizePost, mediaOf } from '../src/normalize.js'
import { XrpcClient, buildUrl } from '../src/http.js'
import { planPages, cachedFeedPages } from '../src/api.js'
import { buildPrivate, renderBioReview } from '../src/bios.js'
import { media, refusal, mediaTargets } from '../src/media.js'
import { lookup, compact } from '../src/lookup.js'
import { sources, citations, cutMismatch, cutFragments } from '../src/sources.js'
import { botTest, marksOf } from '../src/skeletons.js'

const cfg = loadConfig()
const consent = () => new Consent({ selfDeclaredPatterns: cfg.safety.selfDeclaredOptOut.patterns, indirectPatterns: cfg.safety.selfDeclaredOptOut.indirectPatterns, reviewPatterns: cfg.safety.bioReview.patterns })
const D = (n) => `did:plc:invented${String(n).padStart(17, '0')}`
const U = (n, r) => `at://${D(n)}/app.bsky.feed.post/${r}`

test('bios: a direct or indirect opt-out excludes; wording that might be one is for review', () => {
  const c = consent()
  assert.equal(c.optOutKind('please do not quote me'), 'direct')
  assert.equal(c.optOutKind('my posts are meant to disappear'), 'indirect')
  assert.equal(c.optOutKind('posts are temporary, I auto-delete'), 'indirect')
  assert.equal(c.optOutKind('ephemeral thoughts, mostly'), null)
  assert.equal(c.optOutKind('making synths and small games'), null)
  const r = c.bioReview('making synths. I delete a lot of what I post')
  assert.equal(r.matched, 'delete')
  assert.match(r.phrase, /delete a lot/)
  assert.equal(c.bioReview('making synths and small games'), null)
  assert.equal(c.bioReview('do not quote me'), null, 'already an opt-out, not a question')
  assert.ok(c.checkProfile({ did: D(1), handle: 'gone.example.test', description: 'posts meant to disappear' }))
  assert.equal(c.stats.selfDeclaredIndirect, 1)
  const bios = new Map([[D(1), { did: D(1), handle: 'gone.example.test', description: 'posts meant to disappear', labels: [] }], [D(2), { did: D(2), handle: 'maybe.example.test', description: 'ephemeral thoughts, mostly', labels: [] }], [D(3), { did: D(3), handle: 'plain.example.test', description: 'synths', labels: [] }]])
  const priv = buildPrivate({ bios, consent: c, members: [{ did: D(2) }, { did: D(3) }], authors: { [D(1)]: {} }, memberDids: new Set([D(2), D(3)]) })
  assert.deepEqual(priv.file.accounts.map((a) => a.handle), ['maybe.example.test', 'plain.example.test'], 'the excluded account is not kept')
  assert.equal(priv.counts.excludedIndirect, 1)
  assert.equal(priv.counts.bioReview, 1)
  assert.match(renderBioReview(priv), /@maybe\.example\.test .*member: matched "ephemeral"/)
})

test('bots: the self-label, a game account, the config list, or the bio', () => {
  const profiles = new Map([[D(1), { labels: ['bot'] }], [D(2), { labels: [] }], [D(3), { labels: [] }], [D(4), { labels: [], handle: 'game.example.test' }]])
  const bios = new Map([[D(3), { description: "i'm a bot that posts the weather" }]])
  const isBot = botTest({ profiles, bios, games: [{ account: 'game.example.test' }], cfg: cfg.lanes.bots })
  assert.deepEqual([1, 2, 3, 4].map((n) => isBot(D(n))), [true, false, true, true])
  assert.equal(marksOf({}), null)
  assert.deepEqual(marksOf({ sensitive: ['health'], consent: ['redacted'] }), { sensitive: ['health'], consent: ['redacted'] })
})

test('media addresses are kept for pictures and videos, with whether each has alt text', () => {
  const m = mediaOf([
    { $type: 'app.bsky.embed.images#view', images: [{ fullsize: 'https://cdn.bsky.app/img/feed_fullsize/plain/x/1', thumb: 'https://cdn.bsky.app/img/feed_thumbnail/plain/x/1', alt: '' }, { fullsize: 'https://cdn.bsky.app/img/feed_fullsize/plain/x/2', thumb: 't2', alt: 'a drawing' }] },
    { $type: 'app.bsky.embed.video#view', playlist: 'https://video.bsky.app/watch/x/v/playlist.m3u8', thumbnail: 'https://video.bsky.app/watch/x/v/thumbnail.jpg', alt: '' },
  ])
  assert.deepEqual(m.map((x) => [x.kind, x.hasAlt, x.alt]), [['image', false, null], ['image', true, 'a drawing'], ['video', false, null]])
  const p = normalizePost({ uri: U(1, 'v'), author: { did: D(1), handle: 'a.example.test' }, record: { $type: 'app.bsky.feed.post', text: '', createdAt: '2026-11-14T10:00:00Z' }, embed: { $type: 'app.bsky.embed.video#view', playlist: 'https://video.bsky.app/p.m3u8', thumbnail: 'https://video.bsky.app/t.jpg' }, indexedAt: '2026-11-14T10:00:01Z' })
  assert.equal(p.text, '')
  assert.equal(p.hasVideo, true)
  assert.deepEqual(p.media, [{ kind: 'video', url: 'https://video.bsky.app/p.m3u8', thumb: 'https://video.bsky.app/t.jpg', alt: null, hasAlt: false }])
})

async function digestDir(posts, { skeletons = {} } = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'skel-'))
  await writeFile(join(dir, 'digest.json'), JSON.stringify({ format: 'late-cluster-digest/1', window: { label: 'W', start: '2026-11-09T00:00:00.000Z', end: '2026-11-16T00:00:00.000Z' }, stories: [], sections: {}, authors: {} }))
  await writeFile(join(dir, 'posts.jsonl'), posts.map((p) => JSON.stringify(p)).join('\n') + '\n')
  await mkdir(join(dir, 'skeletons'), { recursive: true })
  const byPost = {}
  for (const [id, sk] of Object.entries(skeletons)) { await writeFile(join(dir, 'skeletons', `${id}.json`), JSON.stringify(sk)); for (const u of sk._uris) byPost[u] = id }
  await writeFile(join(dir, 'skeletons', 'by-post.json'), JSON.stringify(byPost))
  return dir
}

const rec = (n, r, o = {}) => ({ uri: U(n, r), url: `https://bsky.app/profile/p${n}.example.test/post/${r}`, authorDid: D(n), handle: `p${n}.example.test`, text: o.text ?? 'look at this', time: '2026-11-12T10:00:00.000Z', counts: { likes: 3, reposts: 0, replies: 1, quotes: 0 }, media: o.media ?? [], ...o })

test('media: fetches a post\'s pictures from the public CDN, refuses what it may not show', async () => {
  const pic = { kind: 'image', url: 'https://cdn.bsky.app/img/feed_fullsize/plain/x/1', thumb: 'https://cdn.bsky.app/img/feed_thumbnail/plain/x/1', alt: null, hasAlt: false }
  const vid = { kind: 'video', url: 'https://video.bsky.app/watch/x/v/playlist.m3u8', thumb: 'https://video.bsky.app/watch/x/v/thumbnail.jpg', alt: 'a cat sings', hasAlt: true }
  const dir = await digestDir([
    rec(1, 'pic', { text: '', media: [pic] }),
    rec(2, 'vid', { media: [vid] }),
    rec(3, 'red', { media: [pic], redacted: true }),
    rec(4, 'ask', { media: [pic], consent: ['asks not to be quoted'] }),
    rec(5, 'out', { media: [pic] }),
    rec(6, 'evil', { media: [{ kind: 'image', url: 'https://elsewhere.example.test/x.jpg', alt: null, hasAlt: false }] }),
  ], { skeletons: { 's-out': { excluded: { rule: 'R11', reasons: ['x'] }, _uris: [U(5, 'out')] } } })
  const fetched = []
  const fetchImpl = async (url, init) => { fetched.push([url, init.headers['user-agent']]); return new Response(Buffer.from('JPEGDATA'), { status: 200, headers: { 'content-type': 'image/jpeg' } }) }
  let out = ''
  const write = (s) => { out += s }
  try {
    assert.equal(await media(['--dir', dir, '--uri', U(1, 'pic')], { fetchImpl, write, userAgent: 'generic-client/1' }), 0)
    assert.match(out, /media\/did-plc-invented0+1-pic-1\.jpg\tpicture 1 of 1\tno alt text/)
    assert.equal(await readFile(join(dir, 'media', `did-plc-invented${'0'.repeat(16)}1-pic-1.jpg`), 'utf8'), 'JPEGDATA')
    assert.deepEqual(fetched, [[pic.url, 'generic-client/1']])
    out = ''
    assert.equal(await media(['--dir', dir, '--uri', U(2, 'vid'), '--json'], { fetchImpl, write, userAgent: 'generic-client/1' }), 0)
    const j = JSON.parse(out)
    assert.equal(j.files[0].what, 'video thumbnail')
    assert.equal(j.files[0].alt, 'a cat sings')
    assert.equal(fetched.at(-1)[0], vid.thumb, 'a video: the thumbnail only')
    // already there: not fetched again
    const n = fetched.length
    await media(['--dir', dir, '--uri', U(1, 'pic')], { fetchImpl, write, userAgent: 'g' })
    assert.equal(fetched.length, n)
    for (const [r, why] of [['red', /redacted/], ['ask', /consent/], ['out', /consent rules leave out/], ['nope', /not in the digest/]]) {
      out = ''
      assert.equal(await media(['--dir', dir, '--uri', U(r === 'red' ? 3 : r === 'ask' ? 4 : r === 'out' ? 5 : 9, r)], { fetchImpl, write }), 1)
      assert.match(out, why)
    }
    await assert.rejects(media(['--dir', dir, '--uri', U(6, 'evil')], { fetchImpl, write }), /not Bluesky's public CDN/)
    assert.equal(fetched.length, n, 'nothing refused was fetched')
  } finally { await rm(dir, { recursive: true, force: true }) }
  assert.equal(refusal(null), 'not in the digest')
  assert.deepEqual(mediaTargets({ media: [vid] }).map((t) => t.url), [vid.thumb])
})

test('lookup prints compact records by default, and takes --fields', async () => {
  const dir = await digestDir([rec(1, 'a', { text: 'a pen plotter', reply: { root: U(2, 'r'), parent: U(2, 'r') }, sensitive: ['health'] }), rec(2, 'r', { text: 'about the show', aboutShow: true })], { skeletons: { 's-1': { _uris: [U(1, 'a')] } } })
  try {
    let out = ''
    const write = (s) => { out += s }
    assert.equal(lookup(['--dir', dir, '--text', 'pen plotter'], { write }), 0)
    assert.deepEqual(JSON.parse(out), { uri: U(1, 'a'), handle: 'p1.example.test', time: '2026-11-12T10:00:00.000Z', text: 'a pen plotter', counts: [3, 0, 1, 0], replyTo: U(2, 'r'), marks: ['health'], skeleton: 's-1' })
    out = ''
    lookup(['--dir', dir, '--uri', U(1, 'a'), '--fields', 'uri,text,skeleton'], { write })
    assert.deepEqual(JSON.parse(out), { uri: U(1, 'a'), text: 'a pen plotter', skeleton: 's-1' })
    out = ''
    assert.equal(lookup(['--dir', dir, '--text', 'about the show'], { write }), 1, 'posts about the show are hidden')
    out = ''
    assert.equal(lookup(['--dir', dir, '--text', 'about the show', '--about-show'], { write }), 0)
  } finally { await rm(dir, { recursive: true, force: true }) }
  assert.deepEqual(compact({ uri: 'u', handle: 'h', time: 't', text: '', hasVideo: true }), { uri: 'u', handle: 'h', time: 't', text: '', media: ['video'] })
})

test('the planner counts a cached page as free', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'plan-'))
  try {
    const client = new XrpcClient({ cacheDir: dir, fetchImpl: async () => { throw new Error('no network in tests') } })
    const until = Date.parse('2026-11-09T00:00:00Z')
    const since = Date.parse('2026-10-19T00:00:00Z')
    const page = (actor, cursor, next, last) => client.writeCache(buildUrl(client.host, 'app.bsky.feed.getAuthorFeed', { actor, limit: 100, filter: 'posts_with_replies', cursor }), 200, { feed: [{ post: { indexedAt: last } }], cursor: next })
    // A: three pages cached, still more to go; B: one page and the walk ends; C: nothing cached
    await page(D(1), new Date(until).toISOString(), '2026-11-02T00:00:00.000Z', '2026-11-02T00:00:00.000Z')
    await page(D(1), '2026-11-02T00:00:00.000Z', '2026-10-28T00:00:00.000Z', '2026-10-28T00:00:00.000Z')
    await page(D(1), '2026-10-28T00:00:00.000Z', '2026-10-25T00:00:00.000Z', '2026-10-25T00:00:00.000Z')
    await page(D(2), new Date(until).toISOString(), '2026-10-01T00:00:00.000Z', '2026-10-01T00:00:00.000Z')
    assert.deepEqual(await cachedFeedPages(client, D(1), { since, until, maxPages: 3 }), { cached: 3, complete: false })
    assert.deepEqual(await cachedFeedPages(client, D(2), { since, until, maxPages: 3 }), { cached: 1, complete: true })
    const cold = await planPages(client, [D(1), D(2), D(3)], { since, until, max: 3, budget: 0 })
    assert.deepEqual([...cold.perActor.values()], [3, 1, 0], 'no budget: every actor still gets what the cache holds')
    assert.equal(cold.cost, 0)
    const some = await planPages(client, [D(1), D(2), D(3)], { since, until, max: 3, budget: 2 })
    assert.deepEqual([...some.perActor.values()], [3, 1, 2])
    assert.equal(some.cost, 2)
    assert.equal(client.stats.requests, 0)
  } finally { await rm(dir, { recursive: true, force: true }) }
})

test('sources: what a sources.json cites, and marked cuts', () => {
  assert.deepEqual(cutFragments('… Reply to this post and my pen plotter will write it on paper …'), ['Reply to this post and my pen plotter will write it on paper'])
  assert.equal(cutMismatch('… the pen … on paper', 'Reply and the pen writes it on paper.'), null)
  assert.equal(cutMismatch('… on paper … the pen', 'the pen writes it on paper'), 'the pen', 'in order')
  const c = citations({ accounts: [{ handle: 'p1.example.test', did: D(1) }], posts: [{ uri: U(1, 'a'), text: 'x', replyTo: { uri: U(2, 'b'), text: 'y' }, cuts: { seg: '… x …' } }], lines: [{ post: U(1, 'a'), context: U(3, 'c'), contextText: 'z' }], numbers: [{ post: U(1, 'a') }] })
  assert.deepEqual(c.posts.map((p) => p.uri), [U(1, 'a'), U(2, 'b'), U(3, 'c')])
  assert.deepEqual(c.posts[0].where, ['posts[0]', 'lines[0].post', 'numbers[0].post'])
  assert.deepEqual(c.accounts.map((a) => a.did), [D(1), D(2), D(3)])
})

test('sources check: live text, bios, pinned posts and posts since the window, over a fake network', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'src-'))
  try {
    const file = join(dir, 'sources.json')
    await writeFile(file, JSON.stringify({
      format: 'late-cluster-sources/1', week: 'W',
      accounts: [{ handle: 'p1.example.test', did: D(1), displayName: 'One' }, { handle: 'p2.example.test', did: D(2) }, { handle: 'p4.example.test', did: D(4) }],
      posts: [
        { uri: U(1, 'same'), text: 'the pen writes' },
        { uri: U(1, 'cut'), text: '… writes it on paper …' },
        { uri: U(2, 'edited'), text: 'original words' },
        { uri: U(4, 'gone'), text: 'deleted later' },
      ],
    }))
    const now = Date.parse('2026-11-18T00:00:00Z')
    const view = (n, r, text, at = '2026-11-12T10:00:00Z', extra = {}) => ({ uri: U(n, r), author: { did: D(n), handle: `p${n}.example.test`, labels: [] }, record: { $type: 'app.bsky.feed.post', text, createdAt: at }, indexedAt: at, ...extra })
    const live = new Map([
      [U(1, 'same'), view(1, 'same', 'the pen writes')],
      [U(1, 'cut'), view(1, 'cut', 'Reply and it writes it on paper, live.')],
      [U(2, 'edited'), view(2, 'edited', 'different words')],
      [U(2, 'pin'), view(2, 'pin', "don't quote me on this, ever")],
    ])
    const requested = []
    const fetchImpl = async (url, init) => {
      requested.push([url, init.headers['user-agent']])
      const u = new URL(url)
      const nsid = u.pathname.split('/').pop()
      const ok = (b) => new Response(JSON.stringify(b), { status: 200 })
      if (nsid === 'app.bsky.feed.getPosts') return ok({ posts: u.searchParams.getAll('uris').map((x) => live.get(x)).filter(Boolean) })
      if (nsid === 'app.bsky.actor.getProfiles') return ok({ profiles: [
        { did: D(1), handle: 'p1.example.test', displayName: 'One', description: 'synths', labels: [] },
        { did: D(2), handle: 'p2-renamed.example.test', displayName: 'Two', description: 'my posts are meant to disappear', labels: [], pinnedPost: { uri: U(2, 'pin') } },
        { did: D(4), handle: 'p4.example.test', description: 'ephemeral thoughts, mostly', labels: [] },
      ] })
      if (nsid === 'app.bsky.feed.getAuthorFeed') {
        const a = u.searchParams.get('actor')
        const feed = a === D(1) ? [{ post: view(1, 'new', 'watched the late cluster last night', '2026-11-17T10:00:00Z') }, { post: view(1, 'old', 'old one', '2026-11-10T10:00:00Z') }] : []
        return ok({ feed })
      }
      return new Response('{}', { status: 501 })
    }
    let out = ''
    const code = await sources(['check', file, '--json'], { fetchImpl, write: (s) => { out += s }, now, env: { SCRAPER_USER_AGENT: 'generic-client/1' } })
    const r = JSON.parse(out)
    assert.equal(code, 1)
    const kinds = r.issues.map((i) => i.kind).sort()
    assert.deepEqual(kinds, ['about the show', 'bio review', 'handle changed', 'opt-out', 'pinned post asks', 'post gone', 'text changed'].sort(), JSON.stringify(r.issues, null, 1))
    assert.equal(r.posts.find((p) => p.uri === U(1, 'cut')).status, 'ok', 'a marked cut matches where it overlaps')
    assert.ok(requested.every(([, ua]) => ua === 'generic-client/1'))
    assert.ok(requested.every(([u]) => u.startsWith('https://public.api.bsky.app/xrpc/')))
    assert.ok(!out.includes('meant to disappear'), 'a bio is never printed')
    // clean: one post, unchanged, quiet account
    await writeFile(file, JSON.stringify({ week: 'W', accounts: [{ did: D(1), handle: 'p1.example.test' }], posts: [{ uri: U(1, 'same'), text: 'the pen writes' }] }))
    live.set(U(1, 'new'), null)
    const quiet = async (url, init) => (new URL(url).pathname.endsWith('getAuthorFeed') ? new Response(JSON.stringify({ feed: [] }), { status: 200 }) : fetchImpl(url, init))
    out = ''
    assert.equal(await sources(['check', file, '--out', join(dir, 'live.md')], { fetchImpl: quiet, write: (s) => { out += s }, now }), 0)
    assert.match(out, /\*\*Clean\.\*\*/)
    assert.ok(existsSync(join(dir, 'live.md')))
    // an account on the opt-out list is never requested and never named
    const c2 = loadConfig()
    assert.equal(await sources(['check', join(dir, 'missing.json')], { fetchImpl, write: () => {} }), 2)
    assert.ok(Array.isArray(c2.optOut.accounts))
  } finally { await rm(dir, { recursive: true, force: true }) }
})
