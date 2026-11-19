// Reach: Bluesky publishes no view counts, so "how many people saw it" is approximated by
// what people did with it. Kept as separate numbers plus one combined figure:
//
//   interactions  likes + reposts + quotes + replies, as the API counts them
//   participants  distinct accounts that took part in the data we hold: for a post, who
//                 replied to it, quoted it or (members only) reposted it; for a story, who
//                 posted in it plus members who reposted any of its posts
//   score         sum of weight x value over likes, reposts, quotes, replies, participants,
//                 weights in config/scoring.json reach.weights
//
// Not included: the audience of reposters. getRepostedBy gives who reposted (one request
// per post per 100 reposters) but not their follower counts, which need getProfiles too; and
// summing followers double-counts overlapping audiences and still is not views. The one
// part we already hold, the followers of members who reposted, is reported separately as
// memberRepostAudience, never mixed into the score.

export const DEFAULT_REACH = { likes: 1, reposts: 2, quotes: 3, replies: 1.5, participants: 5 }

export function reachFormula(w = DEFAULT_REACH) {
  return `reach = ${w.likes}×likes + ${w.reposts}×reposts + ${w.quotes}×quotes + ${w.replies}×replies + ${w.participants}×participants`
}

const score = (r, w) => Math.round((w.likes * r.likes + w.reposts * r.reposts + w.quotes * r.quotes + w.replies * r.replies + w.participants * r.participants) * 10) / 10

/**
 * @param {Array} posts every kept post (window and context)
 * @param {Map} reposts uri -> Set of reposter DIDs (members only, from their feeds)
 * @param {(did) => number|null} followersOf
 */
export function makeReach(posts, reposts = new Map(), followersOf = () => null, weights = DEFAULT_REACH) {
  const w = { ...DEFAULT_REACH, ...weights }
  const takers = new Map() // uri -> Set of DIDs who replied to or quoted it
  const add = (uri, did) => { if (!uri || !did) return; if (!takers.has(uri)) takers.set(uri, new Set()); takers.get(uri).add(did) }
  for (const p of posts) {
    if (p.reply?.parent) add(p.reply.parent, p.authorDid)
    if (p.quote?.uri) add(p.quote.uri, p.authorDid)
  }
  const reposters = (uri) => reposts.get(uri) ?? new Set()
  const audience = (dids) => {
    let n = 0
    for (const d of dids) { const f = followersOf(d); if (Number.isFinite(f)) n += f }
    return n
  }
  const post = (p) => {
    if (!p) return null
    const people = new Set([...(takers.get(p.uri) ?? []), ...reposters(p.uri)])
    people.delete(p.authorDid)
    const c = p.counts ?? {}
    const r = { likes: c.likes ?? 0, reposts: c.reposts ?? 0, quotes: c.quotes ?? 0, replies: c.replies ?? 0, participants: people.size }
    return { ...r, interactions: r.likes + r.reposts + r.quotes + r.replies, score: score(r, w), memberRepostAudience: audience(reposters(p.uri)) }
  }
  const story = (ps) => {
    const r = { likes: 0, reposts: 0, quotes: 0, replies: 0, participants: 0 }
    const people = new Set()
    const rp = new Set()
    for (const p of ps) {
      for (const k of ['likes', 'reposts', 'quotes', 'replies']) r[k] += p.counts?.[k] ?? 0
      people.add(p.authorDid)
      for (const d of reposters(p.uri)) { people.add(d); rp.add(d) }
    }
    r.participants = people.size
    return { ...r, interactions: r.likes + r.reposts + r.quotes + r.replies, score: score(r, w), memberRepostAudience: audience(rp) }
  }
  return { post, story, formula: reachFormula(w) }
}
