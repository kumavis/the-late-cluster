// Community games and metrics (config/games.json): an account that posts results, and
// patterns that read them. Results are the game's own posts; the people they name go
// through the same consent rules as everyone else.

import { didOfUri } from './normalize.js'
import { firstLine } from './text.js'

const norm = (h) => String(h ?? '').trim().replace(/^@/, '').replace(/\.$/, '').toLowerCase()

/** Parse one post against a game's patterns; null if it is not a result. */
export function parseResult(text, game) {
  const m = new RegExp(game.resultPattern, 'iu').exec(text ?? '')
  if (!m) return null
  const fields = { ...(m.groups ?? {}) }
  for (const re of game.fieldPatterns ?? []) Object.assign(fields, new RegExp(re, 'iu').exec(text)?.groups ?? {})
  for (const k of game.numberFields ?? []) if (fields[k] != null) fields[k] = Number(fields[k])
  for (const k of game.personFields ?? []) if (fields[k] != null) fields[k] = norm(fields[k])
  return fields
}

/** Handles named in a game's results, so their profiles can be checked before writing. */
export function personHandles(posts, game) {
  const out = new Set()
  for (const p of posts) {
    const f = parseResult(p._originalText ?? p.text, game)
    if (f) for (const k of game.personFields ?? []) if (f[k]) out.add(f[k])
  }
  return [...out].sort()
}

/**
 * @param {Array} posts kept window posts (filtered), any author
 * @param {object} game one entry of config/games.json
 * @param {object} ctx { consent, profileByHandle(handle) -> profile|null, small }
 */
export function gameResults(posts, game, { consent, profileByHandle = () => null, small = 300 }) {
  const account = norm(game.account)
  const mine = posts.filter((p) => norm(p.handle) === account).sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1))
  const results = []
  for (const p of mine) {
    // Parse the game's own words before any redaction; they are never written out when a
    // person they name is excluded.
    const f = parseResult(p._originalText ?? p.text, game)
    if (!f) continue
    const people = {}
    let anyExcluded = false
    for (const k of game.personFields ?? []) {
      const h = f[k]
      if (!h) continue
      const prof = profileByHandle(h)
      // The winner's DID: from the quoted winning post when the result names its author.
      const quotedDid = k === 'winner' && p.quote?.uri ? didOfUri(p.quote.uri) : null
      const did = prof?.did ?? (k === 'winner' ? quotedDid ?? p._mentions?.[0]?.did : null) ?? null
      const excluded = consent.skipHandle(h) || consent.excludedHandles.has(h) || (did && consent.excludedDid(did)) ||
        (k === 'winner' && p.quote?.state === 'removed')
      if (excluded) {
        people[k] = { excluded: true }
        anyExcluded = true
        continue
      }
      const f2 = prof?.followersCount
      people[k] = { handle: h, did, displayName: prof?.displayName ?? null, followers: Number.isFinite(f2) ? f2 : null, small: Number.isFinite(f2) && f2 < small, profileChecked: !!prof }
    }
    let winningPost = null
    if (game.winningPost === 'quote' && people.winner && !people.winner.excluded && p._quoted && norm(p._quoted.handle) === people.winner.handle) {
      const q = p._quoted
      winningPost = { uri: q.uri, url: q.url, text: q.text, time: q.time, counts: q.counts, imageAlts: q.imageAlts, links: q.links, hasImages: q.hasImages, hasVideo: q.hasVideo, sensitive: q.sensitive ?? null }
    }
    const numbers = {}
    for (const k of game.numberFields ?? []) if (f[k] != null) numbers[k] = f[k]
    results.push({
      game: game.id,
      time: p.time,
      resultPost: { uri: p.uri, url: p.url },
      ...people,
      ...numbers,
      winningPost,
      // The result's own words, only when nobody it names is excluded.
      text: anyExcluded ? null : p.text,
      excludedPeople: anyExcluded,
    })
  }
  return results
}

export const summarizeText = (t) => firstLine(t, 200)
