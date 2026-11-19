// The deterministic part of judgement: reading the files independent subagents wrote, checking
// them, and combining them. Every number and every reason is kept, so the owner can see why
// something was picked (docs/WORKFLOW.md, stages 2 to 7). Nothing here calls a model.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { findPost, isOptedOut, normHandle } from './digest.mjs'
import { verbatimMismatch } from './scan.mjs'

export const readJsonFile = (f) => JSON.parse(readFileSync(f, 'utf8'))
const jsonl = (f) =>
  readFileSync(f, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l, k) => {
      try {
        return JSON.parse(l)
      } catch (e) {
        throw new Error(`${f}:${k + 1}: ${e.message}`)
      }
    })
/** the files in a folder with an extension, sorted (missing folder: none) */
export const filesIn = (dir, ext) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).sort().map((f) => join(dir, f)) : [])

// ---------------------------------------------------------------- research: cards and reach

const CARD_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const JOKE_FIELDS = ['jokes', 'ideas', 'premise', 'turn', 'punchline', 'gag']

/** the scraper's reach weights (packages/scraper/config/scoring.json reach.weights), the one source */
export const SCRAPER_REACH = { likes: 1, reposts: 2, quotes: 3, replies: 1.5, participants: 5 }
export function reachWeights(root, config) {
  const f = config?.reach?.weightsFrom && join(root, config.reach.weightsFrom)
  try {
    return { ...SCRAPER_REACH, ...(f && existsSync(f) ? readJsonFile(f).reach?.weights ?? {} : {}) }
  } catch {
    return { ...SCRAPER_REACH }
  }
}

/**
 * Reach of a card: the sum of its posts' reach as the scraper scored it (post reach.score); a post
 * without the scraper's figure is scored from its counts and participants with the same weights.
 */
export function reachOf(d, posts, w = SCRAPER_REACH) {
  let r = 0
  for (const ref of posts) {
    const p = findPost(d, ref?.uri ?? ref)
    if (!p) continue
    if (typeof p.reach?.score === 'number') {
      r += p.reach.score
      continue
    }
    const c = { ...(p.counts ?? {}), ...(p.reach ?? {}) }
    r += (c.likes ?? 0) * w.likes + (c.reposts ?? 0) * w.reposts + (c.quotes ?? 0) * w.quotes + (c.replies ?? 0) * w.replies + (c.participants ?? 0) * w.participants
  }
  return Math.round(r)
}

/** validate one content card; returns failures (strings) */
export function cardProblems(d, card, { lanes, file }) {
  const out = []
  const at = file
  if (!card || typeof card !== 'object') return [`${at}: not a JSON object`]
  if (!CARD_ID.test(String(card.id ?? ''))) out.push(`${at}: "id" must be lower case words and dashes`)
  if (!lanes.includes(card.lane)) out.push(`${at}: "lane" must be one of ${lanes.join(', ')}`)
  if (!String(card.title ?? '').trim()) out.push(`${at}: "title" is empty`)
  if (!String(card.summary ?? '').trim()) out.push(`${at}: "summary" is empty: say what happened, in neutral words`)
  if (typeof card.sensitive !== 'string') out.push(`${at}: "sensitive" must say what is sensitive, or "none"`)
  for (const k of JOKE_FIELDS) if (k in card) out.push(`${at}: a card carries no jokes ("${k}"); ideas come at the brainstorm`)
  if (!Array.isArray(card.posts) || !card.posts.length) out.push(`${at}: "posts" must list at least one post`)
  for (const [k, ref] of (card.posts ?? []).entries()) {
    const p = findPost(d, ref?.uri)
    if (!p) {
      out.push(`${at}: posts[${k}] ${ref?.uri ?? '(no uri)'} is not in the window's digest (look posts up with npm run produce -- --week <week> --find "<uri or text>")`)
      continue
    }
    if (p.text !== null && !p.imageOnly) {
      const why = verbatimMismatch(String(ref.text ?? ''), p.text)
      if (why) out.push(`${at}: posts[${k}] "text" is not the post's exact text: ${why}`)
    }
    if (p.outOfBounds) out.push(`${at}: posts[${k}] is in a story the digest marks out of bounds`)
    if (isOptedOut(d, p.handle)) out.push(`${at}: posts[${k}] is by an opted-out account`)
  }
  if (!Array.isArray(card.people)) out.push(`${at}: "people" must list who was involved, with follower counts`)
  for (const [k, who] of (card.people ?? []).entries()) {
    const h = normHandle(who?.handle)
    if (!h || !d.accounts.has(h)) out.push(`${at}: people[${k}] ${who?.handle ?? '(no handle)'} is not in the digest`)
    else if (typeof who.followers !== 'number') out.push(`${at}: people[${k}] needs "followers" (the digest has ${d.accounts.get(h).followers ?? 'none'})`)
    if (h && isOptedOut(d, h)) out.push(`${at}: people[${k}] is opted out`)
  }
  return out
}

/** every card in research/cards/<lane>/*.json, with its file */
export function readCards(prod) {
  const dir = join(prod, 'research', 'cards')
  const out = []
  if (!existsSync(dir)) return out
  for (const lane of readdirSync(dir).sort()) for (const f of filesIn(join(dir, lane), '.json')) out.push({ file: f, lane, card: readJsonFile(f) })
  return out
}

// ---------------------------------------------------------------- brainstorm: ideas

const IDEA_FIELDS = ['card', 'premise', 'turn', 'screen', 'format']

/** ideas from brainstorm/<writer>.jsonl and brainstorm/rework/*.jsonl, each with a stable id */
export function readIdeas(prod) {
  const out = []
  for (const f of filesIn(join(prod, 'brainstorm'), '.jsonl')) {
    const writer = f.split('/').pop().replace(/\.jsonl$/, '')
    if (writer === 'ideas') continue
    jsonl(f).forEach((idea, k) => out.push({ ...idea, id: idea.id ?? `${writer}-${k + 1}`, writer, file: f }))
  }
  for (const f of filesIn(join(prod, 'brainstorm', 'rework'), '.jsonl')) {
    const name = f.split('/').pop().replace(/\.jsonl$/, '')
    jsonl(f).forEach((idea, k) => out.push({ ...idea, id: idea.id ?? `${name}-r${k + 1}`, writer: idea.writer ?? name, file: f, rework: true }))
  }
  return out
}

export function ideaProblems(idea, cardIds) {
  const out = []
  for (const k of IDEA_FIELDS) if (!String(idea[k] ?? '').trim()) out.push(`${idea.file}: idea ${idea.id} has no "${k}"`)
  if (idea.card && !cardIds.has(idea.card)) out.push(`${idea.file}: idea ${idea.id} is for card ${idea.card}, which is not on the screened longlist`)
  if (idea.words !== undefined && !Array.isArray(idea.words)) out.push(`${idea.file}: idea ${idea.id}: "words" must list the post URIs whose real words it would use`)
  if (idea.speakers !== undefined && !Array.isArray(idea.speakers)) out.push(`${idea.file}: idea ${idea.id}: "speakers" must list the handles of real accounts whose puppets would speak`)
  return out
}

// ---------------------------------------------------------------- rank: two passes, combined

const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)
const round3 = (x) => Math.round(x * 1000) / 1000

/**
 * Combine the first pass: reach (tool) and each reviewer's interest and best-joke scores (0-10).
 * reviews: [{ reviewer, cards: { <id>: { interest, bestJoke: { idea, score }, reason } } }]
 */
export function rankFirstPass({ cards, reviews, reach, weights }) {
  const maxReach = Math.max(1, ...cards.map((c) => reach[c.id] ?? 0))
  const rows = cards.map((c) => {
    const per = reviews.map((r) => ({ reviewer: r.reviewer, ...(r.cards?.[c.id] ?? {}) })).filter((x) => typeof x.interest === 'number')
    const reachNorm = Math.log1p(reach[c.id] ?? 0) / Math.log1p(maxReach)
    const interest = avg(per.map((x) => x.interest))
    const bestJoke = avg(per.map((x) => x.bestJoke?.score ?? 0))
    const score = weights.reach * reachNorm + weights.interest * (interest / 10) + weights.bestJoke * (bestJoke / 10)
    return {
      card: c.id,
      title: c.title,
      reach: reach[c.id] ?? 0,
      reachNorm: round3(reachNorm),
      interest: round3(interest),
      bestJoke: round3(bestJoke),
      bestIdeas: [...new Set(per.map((x) => x.bestJoke?.idea).filter(Boolean))],
      reviewers: per.map((x) => ({ reviewer: x.reviewer, interest: x.interest, bestJoke: x.bestJoke ?? null, reason: x.reason ?? '' })),
      first: round3(score),
    }
  })
  return rows.sort((a, b) => b.first - a.first || a.card.localeCompare(b.card))
}

/** the second pass: synergy and variety (0-2 each) for the pool, and the ideas each reviewer chose */
export function rankSecondPass({ first, second, weights, pool, shortlist }) {
  const top = first.slice(0, pool)
  const rows = top.map((row) => {
    const per = second.map((r) => ({ reviewer: r.reviewer, ...(r.cards?.[row.card] ?? {}) })).filter((x) => typeof x.synergy === 'number')
    const synergy = avg(per.map((x) => x.synergy))
    const variety = avg(per.map((x) => x.variety ?? 0))
    const final = row.first + weights.synergy * (synergy / 2) + weights.variety * (variety / 2)
    const ideas = [...new Set(per.flatMap((x) => (Array.isArray(x.ideas) ? x.ideas : [])))]
    return { ...row, synergy: round3(synergy), variety: round3(variety), secondPass: per.map((x) => ({ reviewer: x.reviewer, synergy: x.synergy, variety: x.variety ?? 0, ideas: x.ideas ?? [], with: x.with ?? [], reason: x.reason ?? '' })), final: round3(final), ideas: ideas.length ? ideas : row.bestIdeas }
  })
  rows.sort((a, b) => b.final - a.final || a.card.localeCompare(b.card))
  rows.forEach((r, k) => (r.shortlisted = k < shortlist))
  return rows
}

// ---------------------------------------------------------------- the repetition gate

const ORDER = { fresh: 0, turned: 1, repeat: 2 }

/**
 * Combine repetition verdicts. files: [{ reviewer, round, items: [{ id, version?, verdict, turned?: { what, how },
 * fromPrevious?, avoid?, reason }] }]. For each item, each reviewer's latest round counts (and only
 * verdicts on the item's current version); the strictest verdict stands.
 */
export function combineRepetition(files, items) {
  const out = {}
  for (const { id, version } of items) {
    const latest = new Map()
    for (const f of [...files].sort((a, b) => a.round - b.round)) {
      const v = (f.items ?? []).find((x) => x.id === id)
      if (!v) continue
      if (version && v.version !== version) continue
      latest.set(f.reviewer, { reviewer: f.reviewer, round: f.round, verdict: v.verdict, turned: v.turned ?? null, fromPrevious: v.fromPrevious === true, avoid: v.avoid ?? '', reason: v.reason ?? '' })
    }
    const verdicts = [...latest.values()]
    const valid = verdicts.filter((v) => v.verdict in ORDER)
    const strict = valid.reduce((s, v) => (ORDER[v.verdict] > ORDER[s] ? v.verdict : s), 'fresh')
    out[id] = { id, version: version ?? null, verdicts, verdict: valid.length ? strict : null, fromPrevious: verdicts.some((v) => v.fromPrevious && v.verdict === 'turned') }
  }
  return out
}

/** the gate on combined verdicts: two reviewers each, turned says what and how, no repeat, at most N turned from the previous episode */
export function repetitionProblems(combined, { reviewers, maxTurnedFromPrevious, label }) {
  const failures = []
  const repeats = []
  for (const c of Object.values(combined)) {
    const n = new Set(c.verdicts.filter((v) => v.verdict in ORDER).map((v) => v.reviewer)).size
    if (n < reviewers) failures.push(`${label} ${c.id}: verdicts from ${n} reviewer${n === 1 ? '' : 's'}${c.version ? ` on version ${c.version}` : ''}; the gate needs ${reviewers}`)
    for (const v of c.verdicts) {
      if (!(v.verdict in ORDER)) failures.push(`${label} ${c.id}: ${v.reviewer} gave ${JSON.stringify(v.verdict)}; the verdict is fresh, turned or repeat`)
      if (v.verdict === 'turned' && (!String(v.turned?.what ?? '').trim() || !String(v.turned?.how ?? '').trim())) failures.push(`${label} ${c.id}: ${v.reviewer}'s "turned" must say what is turned and how ({ "turned": { "what", "how" } })`)
      if (v.verdict === 'repeat' && !String(v.avoid ?? '').trim()) failures.push(`${label} ${c.id}: ${v.reviewer}'s "repeat" must give "avoid": only as much of the earlier joke as a writer needs to avoid or turn it`)
    }
    if (c.verdict === 'repeat') repeats.push(c.id)
  }
  for (const id of repeats) failures.push(`${label} ${id} is a repeat of something the show has done: blocked (rework it, or drop it with --exclude ${id})`)
  const carried = Object.values(combined).filter((c) => c.verdict === 'turned' && c.fromPrevious).map((c) => c.id)
  if (carried.length > maxTurnedFromPrevious) failures.push(`${carried.length} turned items carry something forward from the previous episode (${carried.join(', ')}); at most ${maxTurnedFromPrevious} per episode`)
  return { failures, repeats, carried }
}

// ---------------------------------------------------------------- select: drafts scored, rundown filled

/**
 * reviews: [{ reviewer, drafts: { <slug>: { funny, interesting, television, variety, reason } } }]
 * drafts: [{ slug, seconds, standing }]. Fills toward targetSeconds by score, never past the ceiling.
 */
export function selectDrafts({ drafts, reviews, weights, targetSeconds, maxSeconds, excluded = [] }) {
  const rows = drafts.map((dr) => {
    const per = reviews.map((r) => ({ reviewer: r.reviewer, ...(r.drafts?.[dr.slug] ?? {}) })).filter((x) => typeof x.funny === 'number')
    const crit = Object.fromEntries(Object.keys(weights).map((k) => [k, round3(avg(per.map((x) => Number(x[k]) || 0)))]))
    const score = Object.entries(weights).reduce((s, [k, w]) => s + w * (crit[k] / 10), 0)
    return { slug: dr.slug, title: dr.title ?? dr.slug, standing: dr.standing ?? null, seconds: dr.seconds, ...crit, score: round3(score), reviewers: per.map((x) => ({ reviewer: x.reviewer, ...Object.fromEntries(Object.keys(weights).map((k) => [k, x[k]])), reason: x.reason ?? '' })) }
  })
  rows.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
  let total = 0
  for (const r of rows) {
    if (excluded.includes(r.slug)) {
      r.selected = false
      r.why = 'excluded by the project manager'
      continue
    }
    if (total >= targetSeconds) {
      r.selected = false
      r.why = `the rundown already reached the ${targetSeconds} s target`
    } else if (total + r.seconds > maxSeconds) {
      r.selected = false
      r.why = `would take the episode past the ${maxSeconds} s ceiling`
    } else {
      r.selected = true
      total += r.seconds
      r.why = `score ${r.score}, rank ${rows.indexOf(r) + 1}`
    }
  }
  return { rows, total }
}
