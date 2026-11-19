// "About the show": posts that mention or link the show, and replies and quotes reacting to
// them, so the writers see reactions, corrections and requests to be left out.

/** Matcher for posts about the show, from config/show.json. */
export function showMatcher(show = {}) {
  const phrases = (show.phrases ?? []).map((p) => new RegExp(p, 'iu'))
  const links = (show.linkPatterns ?? []).map((p) => new RegExp(p, 'iu'))
  const handles = new Set((show.handles ?? []).map((h) => String(h).toLowerCase().replace(/^@/, '')))
  const dids = new Set((show.handles ?? []).filter((h) => String(h).startsWith('did:')))
  return (p) => {
    const reasons = []
    const text = [p.text ?? '', ...(p.links ?? []).map((l) => l.title ?? ''), ...(p.imageAlts ?? [])].join('\n')
    if (phrases.some((re) => re.test(text))) reasons.push('names the show')
    if ((p.links ?? []).some((l) => links.some((re) => re.test(l.url)))) reasons.push('links the show')
    const mentioned = (p._mentions ?? []).some((m) => dids.has(m.did) || handles.has(String(m.text ?? '').toLowerCase().replace(/^@/, '')))
      || [...handles].some((h) => (p.text ?? '').toLowerCase().includes('@' + h))
    if (mentioned) reasons.push("mentions the show's account")
    if (handles.has(String(p.handle ?? '').toLowerCase())) reasons.push("the show's own account")
    return reasons
  }
}

/**
 * Find posts about the show in the raw window posts (before consent filtering), so a request
 * to be left out can exclude its author everywhere.
 * @returns {{ about: Map<uri, string[]>, requests: Array<{did, handle, url}> }}
 */
export function findShowPosts(rawWindowPosts, show, safety) {
  const match = showMatcher(show)
  const about = new Map()
  for (const p of rawWindowPosts) {
    const r = match(p)
    if (r.length) about.set(p.uri, r)
  }
  // reactions: replies under, and quotes of, a post about the show
  const anchors = new Set(about.keys())
  for (const p of rawWindowPosts) {
    if (about.has(p.uri)) continue
    if (p.reply?.parent && anchors.has(p.reply.parent)) about.set(p.uri, ['replies to a post about the show'])
    else if (p.reply?.root && anchors.has(p.reply.root)) about.set(p.uri, ['in a thread about the show'])
    else if (p.quote?.uri && anchors.has(p.quote.uri)) about.set(p.uri, ['quotes a post about the show'])
  }
  const optOut = (safety?.showOptOutPatterns?.patterns ?? []).map((x) => new RegExp(x, 'iu'))
  const requests = []
  const byUri = new Map(rawWindowPosts.map((p) => [p.uri, p]))
  for (const uri of [...about.keys()].sort()) {
    const p = byUri.get(uri)
    if (p && optOut.some((re) => re.test(p.text ?? ''))) requests.push({ did: p.authorDid, handle: p.handle, url: p.url, uri: p.uri })
  }
  return { about, requests }
}

export function correctionFlag(text, safety) {
  return (safety?.showCorrectionPatterns ?? []).some((x) => new RegExp(x, 'iu').test(text ?? ''))
}
