// Synthetic AppView responses with invented accounts. No real people, no real posts.

export const ACCOUNTS = {
  alpha: { did: 'did:plc:alpha0000000000000000001', handle: 'alpha.example.test', displayName: 'Alpha Tester' },
  bravo: { did: 'did:plc:bravo0000000000000000002', handle: 'bravo.example.test', displayName: 'Bravo' },
  charlie: { did: 'did:plc:charlie00000000000000003', handle: 'charlie.example.test', displayName: 'Charlie C' },
  delta: { did: 'did:plc:delta0000000000000000004', handle: 'delta.example.test', displayName: 'Delta' },
  echo: { did: 'did:plc:echo00000000000000000005', handle: 'echo.example.test', displayName: 'Echo' },
  foxtrot: { did: 'did:plc:foxtrot00000000000000006', handle: 'foxtrot.example.test', displayName: 'Foxtrot' },
  ghost: { did: 'did:plc:ghost0000000000000000007', handle: 'ghost.example.test', displayName: 'Opted Out Person' },
  hidden: { did: 'did:plc:hidden000000000000000008', handle: 'hidden.example.test', displayName: 'Logged Out Only', labels: [{ val: '!no-unauthenticated' }] },
  bigacct: { did: 'did:plc:bigacct00000000000000009', handle: 'big.example.test', displayName: 'Very Big Account' },
  quiet: { did: 'did:plc:quiet0000000000000000010', handle: 'quiet.example.test', displayName: 'Quiet', description: 'I post about synths. Please do not quote or screenshot me. No AI.' },
  bot: { did: 'did:plc:bot000000000000000000011', handle: 'builder.alpha.example.test', displayName: 'Builder Bot' },
  chicken: { did: 'did:plc:chicken00000000000000012', handle: 'chicken.example.test', displayName: 'Game Bot', labels: [{ val: 'bot' }] },
  // a logged-out-hidden account that wins the game, and a third party that posts about rounds
  lantern: { did: 'did:plc:lantern00000000000000013', handle: 'lantern.example.test', displayName: 'Marigold Lantern', labels: [{ val: '!no-unauthenticated' }] },
  market: { did: 'did:plc:market000000000000000014', handle: 'market.example.test', displayName: 'Round Market' },
}

/** A Top Chicken style result post. */
export const chickenText = (winner, likes, record = 'echo.example.test', score = 999, posted = 12, eligible = 40, total = 300) =>
  `🐔 New Top Chicken! @${winner}'s post got ${likes} likes. #topchicken\n\nAll-time top chicken is still ${record} with a score of ${score} to beat.\n\nWindow stats: ${posted}/${eligible} people posted; ${total} posts overall.`

/** Follower counts for profiles; anything not listed has 1,000. */
export const FOLLOWERS = { echo: 120, bot: 90, bigacct: 250000 }

/** A full profile view (getProfiles), with description and follower count. */
export const profile = (key) => ({ ...actor(key), description: ACCOUNTS[key].description ?? 'posting', followersCount: FOLLOWERS[key] ?? 1000, followsCount: 5 })

export const actor = (key) => {
  const a = ACCOUNTS[key]
  return { did: a.did, handle: a.handle, displayName: a.displayName, labels: a.labels ?? [] }
}

export const uriOf = (key, rkey) => `at://${ACCOUNTS[key].did}/app.bsky.feed.post/${rkey}`

/**
 * A PostView. Options: text, at (ISO time), likes, reposts, replies, quotes,
 * reply: { root, parent } (URIs), quote: a PostView to embed, external: { uri, title },
 * images: [alt...], labels: [vals], links: [uri] (as facets), mentions: [{ key, text }],
 * linkFacets: [{ text, uri }] (a link facet over that text), card: { uri, name } (a list card)
 */
export function post(key, rkey, o = {}) {
  const a = actor(key)
  const record = { $type: 'app.bsky.feed.post', text: o.text ?? '', createdAt: o.at ?? '2026-11-10T12:00:00.000Z', langs: ['en'] }
  if (o.reply) record.reply = { root: { uri: o.reply.root, cid: 'c' }, parent: { uri: o.reply.parent ?? o.reply.root, cid: 'c' } }
  const facets = []
  const bytes = (s) => Buffer.byteLength(s, 'utf8')
  for (const l of o.links ?? []) facets.push({ index: { byteStart: 0, byteEnd: 1 }, features: [{ $type: 'app.bsky.richtext.facet#link', uri: l }] })
  for (const m of o.mentions ?? []) {
    const start = bytes(record.text.slice(0, record.text.indexOf(m.text)))
    facets.push({ index: { byteStart: start, byteEnd: start + bytes(m.text) }, features: [{ $type: 'app.bsky.richtext.facet#mention', did: ACCOUNTS[m.key].did }] })
  }
  for (const l of o.linkFacets ?? []) {
    const start = bytes(record.text.slice(0, record.text.indexOf(l.text)))
    facets.push({ index: { byteStart: start, byteEnd: start + bytes(l.text) }, features: [{ $type: 'app.bsky.richtext.facet#link', uri: l.uri }] })
  }
  if (facets.length) record.facets = facets
  let embed
  const media = o.images ? { $type: 'app.bsky.embed.images#view', images: o.images.map((alt) => ({ alt, thumb: 'x', fullsize: 'y' })) } : o.external ? { $type: 'app.bsky.embed.external#view', external: { uri: o.external.uri, title: o.external.title ?? '', description: '' } } : null
  if (o.quote) {
    const q = o.quote
    const rec = { $type: 'app.bsky.embed.record#viewRecord', uri: q.uri, cid: 'c', author: q.author, value: q.record, labels: q.labels ?? [], likeCount: q.likeCount, indexedAt: q.indexedAt }
    embed = media ? { $type: 'app.bsky.embed.recordWithMedia#view', media, record: { record: rec } } : { $type: 'app.bsky.embed.record#view', record: rec }
  } else if (o.card) embed = { $type: 'app.bsky.embed.record#view', record: { $type: 'app.bsky.graph.defs#listView', uri: o.card.uri, name: o.card.name } }
  else if (media) embed = media
  return {
    uri: uriOf(key, rkey),
    cid: 'cid-' + rkey,
    author: a,
    record,
    embed,
    likeCount: o.likes ?? 0,
    repostCount: o.reposts ?? 0,
    replyCount: o.replies ?? 0,
    quoteCount: o.quotes ?? 0,
    indexedAt: o.indexedAt ?? o.at ?? '2026-11-10T12:00:01.000Z',
    labels: (o.labels ?? []).map((val) => ({ val, src: a.did })),
  }
}

/** Default scoring config for tests: the shipped one. */
export async function scoringConfig() {
  const { loadConfig } = await import('../../src/config.js')
  return loadConfig().scoring
}
