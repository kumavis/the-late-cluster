// Threads that could be performed: real back-and-forth between several cluster members,
// complete and in order, with exact text, so puppets can perform them word for word.
// Deterministic: same posts and config, same threads.

import { engagement } from './normalize.js'
import { tokenize } from './text.js'

const byTime = (a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1)

/** Group posts by visible thread root. Returns Map rootUri -> posts. */
function threadsOf(posts) {
  const m = new Map()
  for (const p of posts) {
    const k = p._threadKey
    if (!k?.startsWith('at://')) continue
    if (!m.has(k)) m.set(k, [])
    m.get(k).push(p)
  }
  return m
}

const turnsOf = (ps, byUri) => ps.filter((p) => p.reply?.parent && byUri.get(p.reply.parent) && byUri.get(p.reply.parent).authorDid !== p.authorDid).length

/**
 * @param {object} a
 * @param {Array} a.posts kept window and context posts (filtered and annotated)
 * @param {Array} a.removed posts dropped by the consent rules or missing from the API:
 *   [{ threadKey, parent }] (no content, no URI of their own)
 * @param {Set} a.complete root URIs fetched whole with getPostThread
 * @param {object} a.window
 * @param {object} a.cfg show.performableThreads
 */
export function performableThreads({ posts, removed = [], complete = new Set(), window, cfg = {} }) {
  const C = { count: 6, minPosts: 4, maxPosts: 24, minSpeakers: 3, minMemberSpeakers: 3, minTurns: 4, maxChars: 280, requireRootInWindow: true, ...cfg }
  const avoid = (C.avoidPatterns ?? []).map((x) => new RegExp(x, 'iu'))
  const removedBy = new Map()
  for (const r of removed) {
    if (!removedBy.has(r.threadKey)) removedBy.set(r.threadKey, [])
    removedBy.get(r.threadKey).push(r)
  }
  const inWin = (p) => { const t = Date.parse(p.time); return t >= window.start && t < window.end }
  const out = []
  const rejected = {}
  const reject = (why) => { rejected[why] = (rejected[why] ?? 0) + 1 }

  const toComplete = []
  for (const [root, raw] of threadsOf(posts)) {
    const ps = [...raw].sort(byTime)
    const byUri = new Map(ps.map((p) => [p.uri, p]))
    const rootPost = byUri.get(root)
    const inWindow = rootPost ? inWin(rootPost) : ps.some(inWin)
    // Worth fetching whole: several members talking, in the window, not fetched yet.
    if (!complete.has(root) && inWindow && new Set(ps.filter((p) => p.member).map((p) => p.authorDid)).size >= C.minMemberSpeakers && ps.length <= C.maxPosts * 2) {
      toComplete.push({ root, members: new Set(ps.filter((p) => p.member).map((p) => p.authorDid)).size, turns: turnsOf(ps, byUri), n: ps.length })
    }
    if (!rootPost) { reject('root not available'); continue }
    if (C.requireRootInWindow && !inWin(rootPost)) { reject('root before the window'); continue }
    if (ps.length < C.minPosts) continue
    if (ps.length > C.maxPosts) { reject('too long'); continue }
    const speakers = new Set(ps.map((p) => p.authorDid))
    const members = new Set(ps.filter((p) => p.member).map((p) => p.authorDid))
    if (speakers.size < C.minSpeakers || members.size < C.minMemberSpeakers) continue
    const turns = turnsOf(ps, byUri)
    if (turns < C.minTurns) { reject('not enough back-and-forth'); continue }
    // Every post must be reachable from the root through posts we hold.
    const orphan = ps.find((p) => p.uri !== root && !(p.reply?.parent && byUri.has(p.reply.parent)))
    if (orphan) { reject(orphan.reply?.hidden ? 'an excluded post in the middle' : 'a gap in the thread'); continue }
    // An excluded or missing post with replies under it breaks the conversation.
    const gaps = removedBy.get(root) ?? []
    if (ps.some((p) => p.reply?.hidden)) { reject('an excluded post in the middle'); continue }
    if (ps.some((p) => p.sensitive?.length)) { reject('a sensitivity flag'); continue }
    if (ps.some((p) => p._redacted)) { reject('text redacted by the consent rules'); continue }
    if (ps.some((p) => p.quote?.state === 'removed')) { reject('quotes an excluded post'); continue }
    if (ps.some((p) => !String(p.text ?? '').trim())) { reject('a post with no text to speak'); continue }
    if (ps.some((p) => tokenize(p.text).length === 0)) { reject('a post that is only a link or a mention'); continue }
    if (ps.some((p) => [...p.text].length > C.maxChars)) { reject('a post too long to speak'); continue }
    if (ps.some((p) => avoid.some((re) => re.test(p.text)))) { reject('hostile wording'); continue }

    // Complete and in order: depth-first from the root, replies by time.
    const kids = new Map()
    for (const p of ps) if (p.uri !== root) {
      if (!kids.has(p.reply.parent)) kids.set(p.reply.parent, [])
      kids.get(p.reply.parent).push(p)
    }
    const gapAt = new Map()
    for (const g of gaps) if (g.parent && byUri.has(g.parent)) gapAt.set(g.parent, (gapAt.get(g.parent) ?? 0) + 1)
    const order = []
    const walk = (p, depth) => {
      order.push({ p, depth })
      if (gapAt.has(p.uri)) order.push({ removed: gapAt.get(p.uri), parent: p.uri, depth: depth + 1 })
      for (const k of (kids.get(p.uri) ?? []).sort(byTime)) walk(k, depth + 1)
    }
    walk(rootPost, 0)

    const totalE = ps.reduce((s, p) => s + engagement(p.counts), 0)
    const meanChars = ps.reduce((s, p) => s + [...p.text].length, 0) / ps.length
    // Prefer many speakers, many turns, short lines, and a thread people liked.
    const score = 2 * members.size + 1.5 * turns + Math.log1p(totalE) - meanChars / 100 - (ps.length > 12 ? (ps.length - 12) * 0.25 : 0)
    out.push({
      root,
      url: rootPost.url,
      complete: complete.has(root),
      speakers: speakers.size,
      memberSpeakers: members.size,
      turns,
      score: Math.round(score * 1000) / 1000,
      removedPosts: gaps.length,
      posts: order.map((x) => (x.removed
        ? { removed: true, count: x.removed, inReplyTo: x.parent, depth: x.depth }
        : {
            uri: x.p.uri, url: x.p.url, authorDid: x.p.authorDid, handle: x.p.handle, displayName: x.p.displayName,
            text: x.p.text, time: x.p.time, depth: x.depth, inReplyTo: x.p.uri === root ? null : x.p.reply.parent,
            counts: x.p.counts, member: !!x.p.member, authorFollowers: x.p.authorFollowers ?? null, smallAccount: !!x.p.smallAccount,
            ...(x.p.guest ? { guest: true } : {}),
            ...(x.p.imageAlts?.length ? { imageAlts: x.p.imageAlts } : {}),
            ...(x.p.links?.length ? { links: x.p.links } : {}),
            ...(x.p.quote?.uri ? { quotes: x.p.quote.uri } : {}),
          })),
    })
  }
  out.sort((a, b) => b.score - a.score || (a.root < b.root ? -1 : 1))
  // Threads to fetch whole before the final pick: the leading incomplete ones first, then
  // the busiest conversations that failed only because we hold part of them.
  const leading = out.filter((t) => !t.complete).slice(0, C.count * 2).map((t) => t.root)
  const rest = toComplete.sort((a, b) => b.members - a.members || b.turns - a.turns || b.n - a.n || (a.root < b.root ? -1 : 1)).map((x) => x.root)
  const candidates = [...new Set([...leading, ...rest])].slice(0, C.prefetch ?? 15)
  return { threads: out.slice(0, C.count), considered: out.length, rejected, candidates }
}
