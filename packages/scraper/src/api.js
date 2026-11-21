// Thin wrappers over the AppView methods this package reads, with pagination and caps.
// Every function takes the client first and returns plain JSON from the API.

import { BudgetExhausted, XrpcError, buildUrl } from './http.js'

/**
 * Profiles, 25 per request, in parallel through the client's concurrency limit. A batch that
 * fails (or runs out of budget) is skipped; the rest are still returned.
 */
export async function getProfiles(client, actors, { onError } = {}) {
  // Profiles are cached one per actor as well as per request, so a changed set of accounts
  // (which changes every batch's URL) does not refetch the ones already seen.
  const cached = []
  const todo = []
  for (const a of actors) {
    const hit = await client.readCache(profileKey(a))
    if (hit?.status === 200) { cached.push(hit.body); client.stats.cacheHits++ }
    else todo.push(a)
  }
  const batches = []
  for (let i = 0; i < todo.length; i += 25) batches.push(todo.slice(i, i + 25))
  const results = await Promise.all(batches.map(async (b) => {
    try {
      const got = (await client.get('app.bsky.actor.getProfiles', { actors: b })).profiles ?? []
      for (const p of got) {
        await client.writeCache(profileKey(p.did), 200, p)
        if (p.handle) await client.writeCache(profileKey(p.handle), 200, p)
      }
      return got
    } catch (err) {
      if (onError) onError(err)
      else if (batches.length === 1) throw err
      return []
    }
  }))
  return [...cached, ...results.flat()]
}

const profileKey = (actor) => `profile:${String(actor).toLowerCase()}`

async function paginate(client, nsid, params, key, { maxPages = 10, stop, fresh = false } = {}) {
  const items = []
  let cursor = params.cursor
  let pages = 0
  let complete = false
  while (pages < maxPages) {
    const res = await client.get(nsid, { ...params, cursor }, { fresh })
    pages++
    const batch = res[key] ?? []
    items.push(...batch)
    cursor = res.cursor
    if (!cursor || batch.length === 0 || (stop && stop(res, cursor))) {
      complete = true
      break
    }
  }
  return { items, pages, complete, cursor }
}

export async function getFollows(client, actor, { maxPages = 10, fresh = false } = {}) {
  return paginate(client, 'app.bsky.graph.getFollows', { actor, limit: 100 }, 'follows', { maxPages, fresh })
}

export async function getFollowers(client, actor, { maxPages = 10 } = {}) {
  return paginate(client, 'app.bsky.graph.getFollowers', { actor, limit: 100 }, 'followers', { maxPages })
}

export async function getList(client, list, { maxPages = 10 } = {}) {
  return paginate(client, 'app.bsky.graph.getList', { list, limit: 100 }, 'items', { maxPages })
}

export async function getStarterPack(client, starterPack) {
  return client.get('app.bsky.graph.getStarterPack', { starterPack })
}

export async function getFeed(client, feed, { maxPages = 3 } = {}) {
  return paginate(client, 'app.bsky.feed.getFeed', { feed, limit: 100 }, 'feed', { maxPages })
}

export async function getPostThread(client, uri, { depth = 4 } = {}) {
  const res = await client.get('app.bsky.feed.getPostThread', { uri, depth, parentHeight: 0 })
  return res.thread
}

/** Feed items sort time: the repost time for reposts, otherwise the post's indexedAt. */
export function feedItemTime(item) {
  const t = item?.reason?.indexedAt ?? item?.post?.indexedAt ?? item?.post?.record?.createdAt
  return t ? Date.parse(t) : NaN
}

/**
 * An actor's posts, replies and reposts between `since` and `until`, newest first.
 *
 * The AppView's author-feed cursor is a timestamp, so when `seek` is on the first request
 * starts at `until` instead of paging down from today. If a future AppView stops accepting
 * that, the time filter below still holds and the walk just costs more pages.
 *
 * Returns { items, pages, reachedSince } where reachedSince says the walk went back far
 * enough to cover the whole range.
 */
export async function getAuthorFeedRange(client, actor, { since, until, maxPages = 6, seek = true }) {
  const params = { actor, limit: 100, filter: 'posts_with_replies' }
  if (seek && until) params.cursor = new Date(until).toISOString()
  const res = await paginate(client, 'app.bsky.feed.getAuthorFeed', params, 'feed', {
    maxPages,
    stop: (page, cursor) => {
      const c = Date.parse(cursor)
      const last = feedItemTime(page.feed?.at(-1))
      const edge = Number.isFinite(c) ? c : last
      return Number.isFinite(edge) && edge < since
    },
  })
  const items = res.items.filter((it) => {
    const t = feedItemTime(it)
    return Number.isFinite(t) && t >= since && t < until
  })
  return { items, pages: res.pages, reachedSince: res.complete }
}

/**
 * How much of an author-feed walk the response cache already holds, without a request:
 * follows the cursor chain through cached pages. Returns { cached, complete }: `cached`
 * pages are free, and when `complete` the walk ends inside them, so more pages cost nothing.
 */
export async function cachedFeedPages(client, actor, { since, until, maxPages = 6, seek = true }) {
  if (!client.cacheDir) return { cached: 0, complete: false }
  const params = { actor, limit: 100, filter: 'posts_with_replies' }
  let cursor = seek && until ? new Date(until).toISOString() : undefined
  for (let i = 0; i < maxPages; i++) {
    const hit = await client.readCache(buildUrl(client.host, 'app.bsky.feed.getAuthorFeed', { ...params, cursor }))
    if (!hit) return { cached: i, complete: false }
    if (hit.status !== 200) return { cached: i + 1, complete: true }
    const batch = hit.body?.feed ?? []
    cursor = hit.body?.cursor
    const c = Date.parse(cursor)
    const edge = Number.isFinite(c) ? c : feedItemTime(batch.at(-1))
    if (!cursor || batch.length === 0 || (Number.isFinite(edge) && edge < since)) return { cached: i + 1, complete: true }
  }
  return { cached: maxPages, complete: false }
}

/**
 * How many pages of each actor's feed to walk, up to `max`, within `budget` requests,
 * counting a page the cache already holds as free (trial 002, finding 3). Every actor gets
 * its cached pages; the budget then buys the same depth `pages` for everyone it can.
 * Returns { pages, perActor: Map actor -> pages, cost }.
 */
export async function planPages(client, actors, { since, until, max, budget, seek = true }) {
  const held = await Promise.all(actors.map((a) => cachedFeedPages(client, a, { since, until, maxPages: max, seek })))
  const cost = (k) => held.reduce((s, h) => s + (h.complete ? 0 : Math.max(0, k - h.cached)), 0)
  let pages = 0
  for (let k = max; k > 0; k--) if (cost(k) <= budget) { pages = k; break }
  const perActor = new Map(actors.map((a, i) => [a, Math.min(max, held[i].complete ? held[i].cached : Math.max(pages, held[i].cached))]))
  const short = held.filter((h, i) => !h.complete && perActor.get(actors[i]) < max).length
  return { pages, perActor, cost: cost(pages), short }
}

/** searchPosts with a time range; returns posts, following cursors up to maxPages. */
export async function searchPosts(client, q, { since, until, maxPages = 3, host, params = {} } = {}) {
  const posts = []
  let cursor
  let pages = 0
  while (pages < maxPages) {
    const res = await client.get('app.bsky.feed.searchPosts', {
      q, ...params, limit: 100, sort: 'latest', since: new Date(since).toISOString(), until: new Date(until).toISOString(), cursor,
    }, { host })
    pages++
    posts.push(...(res.posts ?? []))
    cursor = res.cursor
    if (!cursor || !res.posts?.length) break
  }
  return { posts, pages }
}

/** Run `fn` and turn budget exhaustion or an API error into a recorded warning. */
export async function soft(warnings, label, fn) {
  try {
    return await fn()
  } catch (err) {
    if (err instanceof BudgetExhausted) {
      warnings.push(`${label}: skipped, request budget exhausted`)
      return null
    }
    if (err instanceof XrpcError) {
      warnings.push(`${label}: ${err.status} ${err.error ?? ''}`.trim())
      return null
    }
    warnings.push(`${label}: ${err.message}`)
    return null
  }
}
