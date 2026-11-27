// "About the show": posts that mention or link the show, and replies and quotes reacting to
// them, so the writers see reactions, corrections and requests to be left out.

import { compileTopics, topicsOf } from './sensitivity.js'

/** Matcher for posts about the show, from config/show.json. */
export function showMatcher(show = {}) {
  const phrases = (show.phrases ?? []).map((p) => new RegExp(p, 'iu'))
  const links = (show.linkPatterns ?? []).map((p) => new RegExp(p, 'iu'))
  const handles = new Set((show.handles ?? []).map((h) => String(h).toLowerCase().replace(/^@/, '')))
  const dids = new Set([...(show.handles ?? []), ...(show.accountDids ?? [])].filter((h) => String(h).startsWith('did:')))
  return (p) => {
    const reasons = []
    const text = [p.text ?? '', ...(p.links ?? []).map((l) => l.title ?? ''), ...(p.imageAlts ?? [])].join('\n')
    if (phrases.some((re) => re.test(text))) reasons.push('names the show')
    if ((p.links ?? []).some((l) => links.some((re) => re.test(l.url)))) reasons.push('links the show')
    const mentioned = (p._mentions ?? []).some((m) => dids.has(m.did) || handles.has(String(m.text ?? '').toLowerCase().replace(/^@/, '')))
      || [...handles].some((h) => (p.text ?? '').toLowerCase().includes('@' + h))
    if (mentioned) reasons.push("mentions the show's account")
    if (handles.has(String(p.handle ?? '').toLowerCase()) || dids.has(p.authorDid)) reasons.push("the show's own account")
    return reasons
  }
}

/**
 * Find posts about the show in the raw window posts (before consent filtering), so a request
 * to be left out can exclude its author everywhere.
 * @returns {{ about: Map<uri, string[]>, requests: Array<{did, handle, url}> }}
 */
export function findShowPosts(rawWindowPosts, show, safety, tagged = {}) {
  const match = showMatcher(show)
  const about = new Map()
  // A pointer (README "The tagged lane") tags the show but is about something else: it is not a
  // post about the show. Replies under, and quotes of, a reply or quote pointer react to a post
  // addressed to the show, and are.
  const pointers = tagged.pointers ?? new Set()
  const addressed = tagged.addressed ?? new Set()
  for (const p of rawWindowPosts) {
    if (pointers.has(p.uri)) continue
    const r = match(p)
    if (r.length) about.set(p.uri, r)
  }
  for (const p of rawWindowPosts) {
    if (about.has(p.uri) || pointers.has(p.uri)) continue
    if ((p.reply?.parent && addressed.has(p.reply.parent)) || (p.quote?.uri && addressed.has(p.quote.uri))) about.set(p.uri, ['reacts to a post addressed to the show'])
  }
  // reactions: replies under, and quotes of, a post about the show, and so on down: a reply
  // under a quote of the show's post is about the show too (trial 002, finding 11)
  for (let changed = true; changed;) {
    changed = false
    for (const p of rawWindowPosts) {
      if (about.has(p.uri) || pointers.has(p.uri)) continue
      const why = p.reply?.parent && about.has(p.reply.parent) ? 'replies to a post about the show'
        : p.reply?.root && about.has(p.reply.root) ? 'in a thread about the show'
          : p.quote?.uri && about.has(p.quote.uri) ? 'quotes a post about the show' : null
      if (why) { about.set(p.uri, [why]); changed = true }
    }
  }
  // An ask addressed to the show (bible R11): a request to be left out, or, in a post about the
  // show, an ask not to be quoted (the consentTopics), which is said to the show.
  const optOut = (safety?.showOptOutPatterns?.patterns ?? []).map((x) => new RegExp(x, 'iu'))
  const consentTopics = new Set(safety?.sensitivity?.consentTopics ?? [])
  const askTopics = compileTopics(Object.fromEntries(Object.entries(safety?.sensitivity?.topics ?? {}).filter(([k]) => consentTopics.has(k))))
  const asks = (t) => optOut.some((re) => re.test(t)) || topicsOf(t, askTopics).length > 0
  const requests = []
  const byUri = new Map(rawWindowPosts.map((p) => [p.uri, p]))
  for (const uri of [...about.keys()].sort()) {
    const p = byUri.get(uri)
    if (p && asks(p.text ?? '')) requests.push({ did: p.authorDid, handle: p.handle, url: p.url, uri: p.uri })
  }
  return { about, requests }
}

export function correctionFlag(text, safety) {
  return (safety?.showCorrectionPatterns ?? []).some((x) => new RegExp(x, 'iu').test(text ?? ''))
}

/** Lines a post about the show quotes, which may be words the show put in someone's mouth. */
export function quotedLines(text, safety) {
  if (!safety?.showQuotePattern) return []
  return [...String(text ?? '').matchAll(new RegExp(safety.showQuotePattern, 'gu'))].map((m) => m[1].trim()).filter(Boolean)
}
