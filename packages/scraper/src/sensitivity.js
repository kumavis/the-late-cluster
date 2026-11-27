// Coarse flags for the bible's out-of-bounds topics (R10). A hint for the writer and the
// reviewer, who still apply R10 themselves: keyword lists miss things and flag innocent
// posts, and both kinds of mistake are expected.

const wordsRe = (terms) => new RegExp(`(?<![\\p{L}\\p{N}])(?:${terms.join('|')})(?![\\p{L}\\p{N}])`, 'iu')

/**
 * Compile { topic: [terms] } into matchers. Each term is matched as a whole word or phrase.
 * `combinations` ([{ topic, all: [[terms], [terms]] }]) flag a topic when a text matches a
 * term from every list, for things no single word gives away (national pastiche).
 */
export function compileTopics(topics = {}, combinations = []) {
  const list = Object.entries(topics).map(([topic, terms]) => ({ topic, test: (t) => wordsRe(terms).test(t) }))
  const res = Object.fromEntries(Object.entries(topics).map(([topic, terms]) => [topic, wordsRe(terms)]))
  for (const l of list) { l.test = (t) => res[l.topic].test(t); l.match = (t) => res[l.topic].exec(t)?.[0] ?? null }
  for (const c of combinations) {
    const parts = c.all.map(wordsRe)
    list.push({ topic: c.topic, test: (t) => parts.every((re) => re.test(t)), match: (t) => (parts.every((re) => re.test(t)) ? parts.map((re) => re.exec(t)[0]).join(' … ') : null) })
  }
  return list
}

/** Topics a text touches, in config order, each once. */
export function topicsOf(text, compiled) {
  const t = String(text ?? '')
  if (!t) return []
  return [...new Set(compiled.filter((c) => c.test(t)).map((c) => c.topic))]
}

/** The words a text matched for each of these topics: [{ topic, matched }], in config order. */
export function topicMatches(text, compiled, only = null) {
  const t = String(text ?? '')
  if (!t) return []
  const out = []
  for (const c of compiled) {
    if (only && !only.has(c.topic)) continue
    const m = c.match?.(t)
    if (m && !out.some((x) => x.topic === c.topic)) out.push({ topic: c.topic, matched: m })
  }
  return out
}

/** Everything a post shows: its text, alt text, link titles and quoted text. */
export function postText(p) {
  return [p.text, ...(p.imageAlts ?? []), ...(p.links ?? []).map((l) => l.title ?? ''), p._quoted?.text ?? ''].filter(Boolean).join('\n')
}

/**
 * Decide whether a story is out of bounds.
 * @param {Array} posts story posts, each with `sensitive` (topics)
 * @param {Array} lead the posts that define the story (lead post, context root)
 * @returns {{ topics: string[], counts: object } | null}
 */
export function storySensitivity(posts, lead, { minShare = 0.2, minPosts = 3 } = {}) {
  const counts = {}
  for (const p of posts) for (const t of p.sensitive ?? []) counts[t] = (counts[t] ?? 0) + 1
  const members = posts.filter((p) => p.member)
  const memberCounts = {}
  for (const p of members) for (const t of p.sensitive ?? []) memberCounts[t] = (memberCounts[t] ?? 0) + 1
  const flagged = new Set()
  for (const p of lead) for (const t of p?.sensitive ?? []) flagged.add(t)
  for (const [t, n] of Object.entries(counts)) {
    if (n >= minPosts) flagged.add(t)
    if (members.length && (memberCounts[t] ?? 0) / members.length >= minShare) flagged.add(t)
  }
  if (!flagged.size) return null
  const topics = [...flagged].sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0) || (a < b ? -1 : 1))
  return { topics, counts: Object.fromEntries(topics.map((t) => [t, counts[t] ?? 0])) }
}

/**
 * Repost notes for a post's text (README "Marks"): what it says about being quoted, kept or
 * screenshotted, as the words matched. A general remark is not an ask to the show, so a note
 * excludes nothing and removes nothing (the owner's ruling, 27 November 2026; bible R2, R11);
 * it is evidence for the reviewer's repost test (R6).
 * @param {string} text
 * @param {object} o
 * @param {Array} o.compiled compileTopics() output
 * @param {Set} o.consentTopics safety.json sensitivity.consentTopics
 * @param {Array<RegExp>} o.indirect safety.json selfDeclaredOptOut.indirectPatterns, compiled
 * @returns {string[]}
 */
export function repostNotesOf(text, { compiled = [], consentTopics = new Set(), indirect = [] } = {}) {
  const t = String(text ?? '')
  if (!t) return []
  const out = topicMatches(t, compiled, consentTopics).map((m) => `says "${m.matched}" (${m.topic})`)
  for (const re of indirect) {
    const m = re.exec(t)
    if (m) { out.push(`says "${m[0].trim()}" (posts not meant to be kept or quoted)`); break }
  }
  return out
}
