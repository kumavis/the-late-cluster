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
  for (const l of list) l.test = (t) => res[l.topic].test(t)
  for (const c of combinations) {
    const parts = c.all.map(wordsRe)
    list.push({ topic: c.topic, test: (t) => parts.every((re) => re.test(t)) })
  }
  return list
}

/** Topics a text touches, in config order, each once. */
export function topicsOf(text, compiled) {
  const t = String(text ?? '')
  if (!t) return []
  return [...new Set(compiled.filter((c) => c.test(t)).map((c) => c.topic))]
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
