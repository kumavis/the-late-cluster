// Who is in the cluster this week. Nobody keeps a list, so membership is computed from
// signals around configured seed accounts, then capped. Pure functions here; the network
// side is in collect.js.
//
// Signals per candidate account:
//   seedFollows   how many seeds follow it
//   interactions  how often seeds replied to it, quoted it, reposted it, or it replied in a
//                 seed's thread, in the window and the baseline weeks
//   termPosts     posts in the window matching a configured search term
//   feedPosts     posts in a configured community feed
//   listed        it is on a configured list or starter pack
//   roster        it is on a community's own public roster (config cluster.rosters), for
//                 example the Top Chicken game's contenders
// An account is a member if it is a seed, or if it satisfies any one rule in
// expansion.rules (all conditions in a rule must hold). Members beyond maxMembers are cut
// by score, ties broken by DID so the result is stable.

export class Candidates {
  constructor() {
    this.map = new Map()
  }

  get(did, actor) {
    let c = this.map.get(did)
    if (!c) {
      c = { did, handle: null, displayName: null, labels: [], seedFollows: new Set(), interactions: 0, interactionKinds: {}, termPosts: 0, feedPosts: 0, listed: false, rosters: new Set() }
      this.map.set(did, c)
    }
    if (actor) {
      if (actor.handle) c.handle = actor.handle
      if (actor.displayName) c.displayName = actor.displayName
      if (actor.labels) c.labels = actor.labels.map((l) => l?.val ?? l)
    }
    return c
  }

  follow(seedDid, actor) {
    this.get(actor.did, actor).seedFollows.add(seedDid)
  }

  interact(actor, kind, n = 1) {
    if (!actor?.did) return
    const c = this.get(actor.did, actor)
    c.interactions += n
    c.interactionKinds[kind] = (c.interactionKinds[kind] ?? 0) + n
  }
}

export function candidateScore(c, { weights, caps }) {
  const cap = (v, k) => Math.min(v, caps?.[k] ?? Infinity)
  return (
    weights.seedFollows * c.seedFollows.size +
    weights.interactions * cap(c.interactions, 'interactions') +
    weights.termPosts * cap(c.termPosts, 'termPosts') +
    weights.feedPosts * cap(c.feedPosts, 'feedPosts') +
    (c.listed ? weights.listed : 0) +
    (weights.roster ?? 0) * Math.min(c.rosters.size, caps?.rosters ?? 1)
  )
}

export function satisfies(c, rule) {
  if (rule.seedFollows != null && c.seedFollows.size < rule.seedFollows) return false
  if (rule.interactions != null && c.interactions < rule.interactions) return false
  if (rule.termPosts != null && c.termPosts < rule.termPosts) return false
  if (rule.feedPosts != null && c.feedPosts < rule.feedPosts) return false
  if (rule.listed && !c.listed) return false
  if (rule.roster && c.rosters.size === 0) return false
  return true
}

/**
 * @param {Candidates} cands
 * @param {Set<string>} seedDids
 * @param {object} expansion config.expansion
 * @param {(c) => boolean} excluded consent check
 * @returns {{ members: Array, considered: number, qualified: number, cut: number }}
 */
export function selectMembers(cands, seedDids, expansion, excluded = () => false) {
  const rows = []
  for (const c of cands.map.values()) {
    if (excluded(c)) continue
    const seed = seedDids.has(c.did)
    const rule = seed ? -1 : expansion.rules.findIndex((r) => satisfies(c, r))
    if (!seed && rule < 0) continue
    rows.push({ c, seed, rule, score: candidateScore(c, expansion) })
  }
  rows.sort((a, b) => Number(b.seed) - Number(a.seed) || b.score - a.score || (a.c.did < b.c.did ? -1 : 1))
  const max = expansion.maxMembers ?? 150
  const kept = rows.slice(0, Math.max(max, rows.filter((r) => r.seed).length))
  const shape = ({ c, seed, rule, score }) => ({
    did: c.did, handle: c.handle, displayName: c.displayName, seed, rule: seed ? 'seed' : rule, score: Math.round(score * 100) / 100,
    signals: { seedFollows: c.seedFollows.size, interactions: c.interactions, termPosts: c.termPosts, feedPosts: c.feedPosts, listed: c.listed, rosters: [...c.rosters].sort() },
  })
  return {
    considered: cands.map.size,
    qualified: rows.length,
    cut: rows.length - kept.length,
    cutRows: rows.slice(kept.length).map(shape),
    members: kept.map(({ c, seed, rule, score }) => ({
      did: c.did,
      handle: c.handle,
      displayName: c.displayName,
      seed,
      rule: seed ? 'seed' : rule,
      score: Math.round(score * 100) / 100,
      signals: {
        seedFollows: c.seedFollows.size,
        interactions: c.interactions,
        termPosts: c.termPosts,
        feedPosts: c.feedPosts,
        listed: c.listed,
        rosters: [...c.rosters].sort(),
      },
    })),
  }
}
