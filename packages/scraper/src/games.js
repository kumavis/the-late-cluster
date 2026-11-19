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
    for (const e of parseLeaderboard(p._originalText ?? p.text, game) ?? []) out.add(e.person)
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
  const mine = posts.filter((p) => p.authorDid === game.account || norm(p.handle) === account).sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1))
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

/** A leaderboard post (game.leaderboard: headerPattern, entryPattern with rank/person/score). */
export function parseLeaderboard(text, game) {
  const lb = game.leaderboard
  if (!lb || !new RegExp(lb.headerPattern, 'iu').test(text ?? '')) return null
  const entries = []
  for (const m of String(text).matchAll(new RegExp(lb.entryPattern, 'gimu'))) {
    entries.push({ rank: Number(m.groups.rank), person: norm(m.groups.person), score: Number(m.groups.score) })
  }
  return entries.length ? entries : null
}

/**
 * Everything the game's own posts say, as a segment's worth of facts: the window's
 * standings, repeat winners and streaks, scores against the record and the recent history
 * the account's posts cover, participation over the window, and who is near the record on
 * the latest leaderboard. Facts only; no speculation.
 *
 * @param {Array} results gameResults over the window and the history before it
 * @param {Array} posts the game account's posts (for leaderboards)
 * @param {object} ctx { window, game, personView(handle) -> person or { excluded: true } }
 */
export function gameSegment(results, posts, { window, game, personView }) {
  const inWin = (r) => { const t = Date.parse(r.time); return t >= window.start && t < window.end }
  const all = [...results].sort((a, b) => (a.time < b.time ? -1 : 1))
  const win = all.filter(inWin)
  const hist = all.filter((r) => Date.parse(r.time) < window.start)
  const who = (r) => (r.winner?.excluded ? null : r.winner?.handle ?? null)

  // repeat winners in the window, and streaks across history + window
  const wins = new Map()
  for (const r of win) { const h = who(r); if (h) wins.set(h, (wins.get(h) ?? 0) + 1) }
  const repeatWinners = [...wins.entries()].filter(([, n]) => n > 1).map(([handle, n]) => ({ handle, wins: n })).sort((a, b) => b.wins - a.wins || (a.handle < b.handle ? -1 : 1))
  const streaks = []
  let run = null
  for (const r of all) {
    const h = who(r)
    if (h && run?.handle === h) { run.length++; run.to = r.time }
    else { if (run?.length > 1) streaks.push(run); run = h ? { handle: h, length: 1, from: r.time, to: r.time } : null }
  }
  if (run?.length > 1) streaks.push(run)
  const windowStreaks = streaks.filter((s) => Date.parse(s.to) >= window.start)

  // scores against the record and history
  const scores = all.map((r) => r.likes).filter(Number.isFinite)
  const histScores = hist.map((r) => r.likes).filter(Number.isFinite).sort((a, b) => a - b)
  const median = (xs) => (xs.length ? (xs.length % 2 ? xs[xs.length >> 1] : (xs[xs.length / 2 - 1] + xs[xs.length / 2]) / 2) : null)
  const latest = all.at(-1)
  const record = latest?.recordScore ?? null
  const standings = win.map((r) => ({
    time: r.time, winner: r.winner, likes: r.likes, winningPost: r.winningPost, resultPost: r.resultPost,
    ofRecord: record && Number.isFinite(r.likes) ? Math.round((r.likes / record) * 1000) / 1000 : null,
    rankInHistory: Number.isFinite(r.likes) ? 1 + scores.filter((x) => x > r.likes).length : null,
    ofResults: scores.length,
  }))

  // participation
  const part = win.filter((r) => Number.isFinite(r.posted) && Number.isFinite(r.eligible)).map((r) => ({ time: r.time, posted: r.posted, eligible: r.eligible, share: Math.round((r.posted / r.eligible) * 1000) / 1000, windowPosts: r.windowPosts ?? null }))
  const shares = part.map((p) => p.share)

  // the latest leaderboard in or before the window's end
  let leaderboard = null
  for (const p of [...posts].sort((a, b) => (a.time < b.time ? 1 : -1))) {
    if (Date.parse(p.time) >= window.end) continue
    const entries = parseLeaderboard(p._originalText ?? p.text, game)
    if (!entries) continue
    const top = entries[0]?.score ?? null
    leaderboard = {
      time: p.time, url: p.url,
      entries: entries.map((e) => ({ rank: e.rank, ...(personView(e.person)?.excluded ? { excluded: true } : { handle: e.person }), score: e.score, behindRecord: top != null ? top - e.score : null })),
    }
    break
  }

  return {
    window: { results: win.length, first: win[0]?.time ?? null, last: win.at(-1)?.time ?? null },
    standings,
    repeatWinners,
    streaks: windowStreaks,
    record: latest ? { score: record, holder: latest.recordHolder ?? null, changedInWindow: new Set(win.map((r) => r.recordScore)).size > 1 } : null,
    history: {
      results: hist.length,
      from: hist[0]?.time ?? null,
      to: hist.at(-1)?.time ?? null,
      medianWinningLikes: median(histScores),
      highest: histScores.at(-1) ?? null,
      lowest: histScores[0] ?? null,
      winners: new Set(hist.map(who).filter(Boolean)).size,
      note: `as far as the account's own posts in the fetched history show it (${hist.length} results)`,
    },
    participation: part.length ? {
      days: part, lowestShare: Math.min(...shares), highestShare: Math.max(...shares),
      eligibleFrom: part[0].eligible, eligibleTo: part.at(-1).eligible,
    } : null,
    leaderboard,
    cameClose: game.runnerUpPattern ? null : { known: false, note: "the game's posts name only the winner, so who came close on a given day is not known; the all-time leaderboard shows who is near the record" },
  }
}
