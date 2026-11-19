// Interview material: a constructed interview where every answer is a real post and every
// question recreates what that post was replying to. For each member, their posts in the
// window that answer something, with the parent's exact text, author and address.
//
// A parent counts as a question or prompt when (config show.json interview):
//   question  it contains a question mark in its last `questionTailChars` characters (after
//             trailing links and emoji are set aside), or starts with an interrogative word
//             and is short; or
//   prompt    it is at most `promptMaxChars` long and matches one of `promptPatterns`
//             ("thoughts?", "name a", "favourite", "hot take", "concept:", "tell me", ...).
// Both sides must pass every consent and sensitivity rule; the answer must be speakable.

import { engagement } from './normalize.js'
import { tokenize } from './text.js'

const INTERROGATIVE = /^(what|why|how|who|whom|whose|when|where|which|would|should|could|can|do|does|did|is|are|was|were|will|have|has|anyone|any)\b/i

/** Decide whether a parent post asks something. Returns 'question', 'prompt' or null. */
export function askKind(text, cfg = {}) {
  const t = String(text ?? '').trim()
  if (!t) return null
  const tail = t.replace(/(\s*(https?:\/\/\S+|\S+\.\S+\/\S*|[\p{Extended_Pictographic}️‍]+))+\s*$/u, '').trim()
  const tailChars = cfg.questionTailChars ?? 80
  if (tail.slice(-tailChars).includes('?')) return 'question'
  if (INTERROGATIVE.test(tail) && [...tail].length <= (cfg.promptMaxChars ?? 140)) return 'question'
  if ([...t].length <= (cfg.promptMaxChars ?? 140) && (cfg.promptPatterns ?? []).some((p) => new RegExp(p, 'iu').test(t))) return 'prompt'
  return null
}

const speakable = (t, max) => !!String(t ?? '').trim() && tokenize(t).length > 0 && [...t].length <= max

/**
 * @param {object} a
 * @param {Array} a.posts kept window posts (annotated: member, sensitive, featured, ...)
 * @param {(uri) => object|null} a.lookup any kept post (window or context)
 * @param {(did) => { previous, earlier, episodes }} a.featuredOf
 * @param {(p) => object} a.reachOf
 * @param {object} a.cfg show.json interview
 */
export function interviewCandidates({ posts, lookup, featuredOf, reachOf = () => null, profiles = new Map(), small = 300, cfg = {} }) {
  const C = { candidates: 5, pairsEach: 8, minPairs: 3, maxChars: 280, maxQuestionChars: 400, ...cfg }
  const exact = (p) => ({
    uri: p.uri, url: p.url, authorDid: p.authorDid, handle: p.handle, displayName: p.displayName, text: p.text, time: p.time,
    counts: p.counts, member: !!p.member, authorFollowers: p.authorFollowers ?? null, smallAccount: !!p.smallAccount,
    ...(p.imageAlts?.length ? { imageAlts: p.imageAlts } : {}), ...(p.links?.length ? { links: p.links } : {}),
  })
  const by = new Map()
  for (const a of posts) {
    if (!a.member || !a.reply?.parent || a.reply.hidden) continue
    if (a.sensitive?.length || a._redacted || a.redacted || a.quote?.state === 'removed') continue
    if (!speakable(a.text, C.maxChars)) continue
    const q = lookup(a.reply.parent)
    if (!q || q.authorDid === a.authorDid) continue
    if (q.sensitive?.length || q._redacted || q.redacted || q.reply?.hidden) continue
    if (!String(q.text ?? '').trim() || [...q.text].length > C.maxQuestionChars) continue
    const kind = askKind(q.text, C)
    if (!kind) continue
    const score = (kind === 'question' ? 2 : 1) + Math.log1p(engagement(a.counts)) + ([...a.text].length <= 200 ? 0.5 : 0)
    if (!by.has(a.authorDid)) by.set(a.authorDid, [])
    by.get(a.authorDid).push({ kind, score: Math.round(score * 1000) / 1000, question: { ...exact(q), kind }, answer: { ...exact(a), reach: reachOf(a) } })
  }
  const rows = []
  for (const [did, pairs] of by) {
    const f = featuredOf(did, pairs[0].answer.handle)
    if (f.previous) continue // not someone who appeared in the previous episode
    pairs.sort((x, y) => y.score - x.score || (x.answer.uri < y.answer.uri ? -1 : 1))
    if (pairs.length < C.minPairs) continue
    const prof = profiles.get(did)
    rows.push({
      did, handle: pairs[0].answer.handle, displayName: pairs[0].answer.displayName,
      followers: prof?.followersCount ?? null, small: Number.isFinite(prof?.followersCount) && prof.followersCount < small,
      featuredEarlier: f.earlier,
      pairCount: pairs.length,
      questioners: new Set(pairs.map((x) => x.question.authorDid)).size,
      questions: pairs.filter((x) => x.kind === 'question').length,
      pairs: pairs.slice(0, C.pairsEach),
    })
  }
  // Most good pairs first; never-featured before featured-earlier; then variety of askers.
  rows.sort((a, b) => Number(!!a.featuredEarlier) - Number(!!b.featuredEarlier) || b.pairCount - a.pairCount || b.questioners - a.questioners || (a.did < b.did ? -1 : 1))
  return {
    rule: 'A parent is a question if a question mark falls in its last ' + (C.questionTailChars ?? 80) + ' characters (trailing links and emoji set aside), or it opens with an interrogative word and is at most ' + (C.promptMaxChars ?? 140) + ' characters; a prompt if it is at most ' + (C.promptMaxChars ?? 140) + ' characters and matches a configured prompt pattern.',
    considered: by.size,
    candidates: rows.slice(0, C.candidates),
  }
}
