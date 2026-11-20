// digest.json -> digest.md, for a writer with ten minutes.

// Fixed English names, so output does not depend on the machine's locale data.
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = (isoStr) => {
  const d = new Date(isoStr)
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

const n = (x) => String(Math.round(x ?? 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const plural = (k, one, many = one + 's') => `${n(k)} ${k === 1 ? one : many}`

/** Escape text so it renders literally inside a Markdown blockquote or table. */
export function mdText(s) {
  return String(s ?? '')
    .replace(/\r/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/([*_`[\]<>#|])/g, '\\$1')
}

const quoteBlock = (s) => mdText(s).split('\n').map((l) => '> ' + l).join('\n')

function who(p) {
  const name = p.displayName && p.displayName !== p.handle ? `**${mdText(p.displayName)}** ` : ''
  return `${name}@${p.handle ?? 'unknown'}`
}

/** Follower count, and the small-account marker the bible's R7 needs. */
function followers(p) {
  const f = p.authorFollowers ?? p.followers
  if (f == null) return ''
  return p.smallAccount || p.small ? ` (**small account**, ${plural(f, 'follower')})` : ` (${plural(f, 'follower')})`
}

const whoF = (p) => who(p) + followers(p)
const LEFT_OUT = '**LEFT OUT (consent)**'
/** A post whose text the consent rules altered: shown to the writer, never quotable. */
const REDACTED_NOTE = '*(redacted: names an account that is not included; not quotable)*'
const red = (p) => (p?.redacted ? ' ' + REDACTED_NOTE : '')
/** A headline, unless the lead post is marked: then only the mark. */
const headlineOf = (s) => (s.sensitivity?.leadMarked ? `*(lead post marked: ${s.sensitivity.topics.join(', ')})*` : mdText(s.headline))
/** A marked post is listed, never quoted (README "Marks"). */
const markedNote = (p) => {
  const m = [...(p.sensitive ?? []), ...(p.consent ?? [])]
  return m.length ? `*(marked: ${m.join(', ')}; not quoted here)*` : null
}

function countsLine(c = {}) {
  const parts = [plural(c.likes, 'like'), plural(c.reposts, 'repost'), plural(c.replies, 'reply', 'replies')]
  if (c.quotes) parts.push(plural(c.quotes, 'quote'))
  return parts.join(' · ')
}

function shortTime(t) {
  if (!t) return ''
  const d = new Date(t)
  return DAYS[d.getUTCDay()] + ' ' + d.toISOString().slice(11, 16) + 'Z'
}

const clip = (s, max) => (s.length > max ? s.slice(0, max).replace(/\s+\S*$/, '') + ' …' : s)

function renderPost(p, { maxChars = 600 } = {}) {
  const lines = []
  const marked = markedNote(p)
  if (marked) return `> ${marked}\n— ${whoF(p)} · ${shortTime(p.time)} · ${countsLine(p.counts)} · [open](${p.url})`
  let body = clip(p.text || '', maxChars)
  if (!body && p.imageAlts?.length) body = ''
  lines.push(body ? quoteBlock(body) : p.hasImages || p.hasVideo || p.quoted ? '>' : '> *(no text)*')
  if (p.hasVideo) lines.push('> *[video]*')
  else if (p.hasImages && !p.imageAlts?.length) lines.push('> *[image, no alt text]*')
  for (const alt of (p.imageAlts ?? []).slice(0, 2)) lines.push(`> *[image: ${mdText(clip(alt.replace(/\s+/g, ' '), 200))}]*`)
  for (const l of (p.links ?? []).slice(0, 2)) lines.push(`> *[link: ${l.title ? mdText(l.title) + ' — ' : ''}${l.url}]*`)
  if (p.redacted) lines.push(`> ${REDACTED_NOTE}`)
  if (p.quoted) lines.push(`>`, `> > quoting ${whoF(p.quoted)}: ${mdText(clip((p.quoted.text || '').replace(/\s+/g, ' '), 240))}${red(p.quoted)}`)
  if (p.inReplyTo) lines.push(`>`, `> > replying to ${whoF(p.inReplyTo)}: ${mdText(clip((p.inReplyTo.text || '').replace(/\s+/g, ' '), 200))}${red(p.inReplyTo)}`)
  if (p.quote?.state === 'removed') lines.push('> *(quoted post removed: author not included)*')
  if (p.reply?.hidden) lines.push('> *(reply to a post that is not included)*')
  const lift = p.metrics?.lift >= 1 ? ` · ${times(p.metrics.lift)} the author's usual` : ''
  const reach = p.reach ? ` · reach ${n(p.reach.score)} (${plural(p.reach.participants, 'participant')})` : ''
  const rp = p.memberReposts ? ` · reposted by ${plural(p.memberReposts, 'member')}` : ''
  const flag = ''
  lines.push(`— ${whoF(p)}${p.guest ? ' · recurring guest' : ''}${p.member === false ? ' (outside the cluster)' : ''}${flag} · ${shortTime(p.time)} · ${countsLine(p.counts)}${reach}${lift}${rp} · [open](${p.url})`)
  return lines.join('\n')
}

function topComponents(scores, k = 3) {
  return Object.entries(scores)
    .filter(([key, v]) => key !== 'total' && v.norm > 0 && v.weight > 0)
    .sort((a, b) => b[1].weight * b[1].norm - a[1].weight * a[1].norm || (a[0] < b[0] ? -1 : 1))
    .slice(0, k)
    .map(([key, v]) => `${key} ${v.norm.toFixed(2)}`)
    .join(', ')
}

const times = (lift) => (lift >= 7 ? 'over 100x' : `${Math.round(2 ** lift * 10) / 10}x`)

/** Bluesky publishes no views; say what "reach" is wherever it is shown. */
const reachNote = (d) => `*Reach is not views (Bluesky does not publish them): ${mdText(d.overview?.reachFormula ?? '')}, where participants are the distinct accounts that replied, quoted or (members) reposted, from the data the digest holds.*`

const KIND = { thread: 'conversation', 'quote-chain': 'quote chain', link: 'shared link', built: 'built', phrase: 'phrase', post: 'single post' }

export function renderStory(s, { postsPerStory = 4 } = {}) {
  const out = []
  const st = s.stats
  if (s.outOfBounds) {
    out.push(`### ${s.rank}. ${LEFT_OUT}`)
    out.push('')
    out.push(`Not for the show (bible R11): ${s.outOfBounds.reasons.map(mdText).join('; ')}. ${plural(st.posts, 'post')}, ${plural(st.members, 'member')}. No headline and no posts. id \`${s.id}\``)
    out.push('')
    return out.join('\n')
  }
  out.push(`### ${s.rank}. ${headlineOf(s)}`)
  out.push('')
  out.push(`\`${KIND[s.kind] ?? s.kind}\` · ${plural(st.posts, 'post')} · ${plural(st.members, 'member')} · ${st.days.length > 1 ? `${st.days[0]} → ${st.days.at(-1)}` : st.days[0] ?? ''} · ${s.reach ? `reach ${n(s.reach.score)} (${n(s.reach.interactions)} interactions, ${plural(s.reach.participants, 'participant')}) · ` : ''}score ${s.scores.total.toFixed(2)} (${topComponents(s.scores)}) · id \`${s.id}\``)
  out.push('')
  out.push(`*Why these are together:* ${s.reason.map(mdText).join('; ')}.`)
  if (s.sensitivity?.postsMarked) out.push(`*Marked:* ${plural(s.sensitivity.postsMarked, 'post')} of ${n(st.posts)} (${Object.entries(s.sensitivity.counts).map(([t, k]) => `${t} ${k}`).join(', ')}): a keyword hint on those posts only; the rest of the story is usable.`)
  if (s.phrases?.length) out.push(`*Spiked phrases here:* ${s.phrases.slice(0, 5).map((t) => '"' + mdText(t) + '"').join(', ')}`)
  const built = s.links.filter((l) => l.isNewDomain || l.buildHost).slice(0, 3)
  if (built.length) out.push(`*Links:* ${built.map((l) => `[${mdText(l.title || l.domain)}](${l.url})${l.members > 1 ? ` (${l.members} members)` : ''}`).join(' · ')}`)
  out.push('')
  for (const c of s.context ?? []) {
    out.push(`Started from (before the window): ${whoF(c)}, ${shortTime(c.time)}`)
    out.push(quoteBlock(clip(c.text || '', 400)))
    out.push(`— [open](${c.url})${red(c)}`)
    out.push('')
  }
  const shown = s.posts.slice(0, postsPerStory)
  for (const p of shown) {
    out.push(renderPost(p))
    out.push('')
  }
  if (s.stats.posts > shown.length) out.push(`*${plural(s.stats.posts - shown.length, 'more post')} in digest.json under \`${s.id}\`.*`, '')
  return out.join('\n')
}

export function renderMarkdown(d) {
  const thisP = d.window?.kind && d.window.kind !== 'week' ? 'in this window' : 'this week'
  const unit = d.window?.kind && d.window.kind !== 'week' ? 'window' : 'week'
  const o = d.overview
  const out = []
  const isWeek = !d.window.kind || d.window.kind === 'week'
  const span = isWeek
    ? `${fmtDate(d.window.start)} to ${fmtDate(new Date(Date.parse(d.window.end) - 1).toISOString())} (UTC)`
    : `${dayTime(d.window.start)} to ${dayTime(d.window.end)} (UTC, ${daysLong(d.window)})`
  out.push(isWeek ? `# Cluster digest: ${d.window.label}` : `# Cluster digest: ${fmtDate(d.window.start)} to ${fmtDate(d.window.end)}`)
  out.push('')
  out.push(`${span}. ${plural(o.memberPosts, 'post')} from ${plural(o.activeMembers, 'active account')} in a cluster of ${n(o.clusterSize)}, plus ${n(o.posts - o.memberPosts)} posts from outside it that they replied to, quoted or reposted. Generated ${d.run?.generatedAt?.slice(0, 16).replace('T', ' ') ?? ''}Z, no language model involved.`)
  out.push('')
  out.push(`## The ${unit} at a glance`)
  out.push('')
  for (const s of d.stories.filter((x) => !x.outOfBounds && !x.aboutShow && !x.sensitivity?.leadMarked).slice(0, 5)) out.push(`${s.rank}. **${mdText(s.headline)}** (${KIND[s.kind] ?? s.kind}, ${plural(s.stats.members, 'member')}, ${plural(s.stats.posts, 'post')})`)
  out.push('')
  const oobList = o.outOfBounds ?? []
  if (oobList.length) out.push(`- **Left out (consent):** ${plural(oobList.length, 'story', 'stories')} in the top ${o.outOfBoundsWithin ?? 30}; the highest is story ${oobList[0].rank}. Listed under Stories without headlines.`)
  const sensList = o.sensitive ?? []
  if (sensList.length) out.push(`- **Marked posts:** ${plural(sensList.length, 'story', 'stories')} in the top ${o.outOfBoundsWithin ?? 30} hold posts marked for subjects the show leaves alone (${[...new Set(sensList.flatMap((x) => x.topics))].join(', ')}); the marks are on those posts, not their stories.`)
  if (o.spiking.length) out.push(`- **Phrases that spiked:** ${o.spiking.map((t) => '"' + mdText(t) + '"').join(', ')}${d.window.hasBaseline ? '' : ' (no baseline: raw counts)'}`)
  if (o.built.length) out.push(`- **Got built:** ${o.built.map((b) => `[${mdText(clip(b.title || b.url.replace(/^https:\/\//, ''), 60))}](${b.url}) by @${b.builtBy}${b.wishBy && b.wishBy !== b.builtBy ? `, wished for by @${b.wishBy}` : ''}`).join('; ')}`)
  if (o.weeks?.length) out.push(`- **Weeks declared:** ${o.weeks.map((w) => '"' + mdText(w) + '"').join(', ')}`)
  const running = d.appendices.runningBits.slice(0, 5)
  if (running.length) out.push(`- **Running bits (3+ days):** ${running.map((r) => `"${mdText(r.term)}" (${r.days} days, ${r.authors} people)`).join(', ')}`)
  if (o.biggestPost) out.push(`- **Biggest post:** ${whoF(o.biggestPost)}: "${mdText(o.biggestPost.text)}" (${countsLine(o.biggestPost.counts)}) [open](${o.biggestPost.url})${red(o.biggestPost)}`)
  if (o.breakoutPost) out.push(`- **Breakout (best against the author's own usual):** ${whoF(o.breakoutPost)}: "${mdText(o.breakoutPost.text)}" (${times(o.breakoutPost.metrics.lift)} usual) [open](${o.breakoutPost.url})${red(o.breakoutPost)}`)
  const busiest = Object.entries(o.postsByDay).sort((a, b) => b[1] - a[1])[0]
  if (busiest) out.push(`- **Busiest day:** ${fmtDate(busiest[0] + 'T00:00:00Z')} (${plural(busiest[1], 'post')})${isWeek ? '' : '; the first and last days of the window may be partial'}`)
  out.push('')

  out.push(renderSections(d))

  const listed = d.stories.filter((x) => !x.aboutShow)
  const shown = listed.slice(0, d.settings?.storiesInMarkdown ?? 15)
  out.push(`## Stories`)
  out.push('')
  out.push(`Ranked by the score in README "Scoring". Each story is a group of related posts; the lead post comes first, then the strongest replies and quotes.`)
  if (d.overview?.reachFormula) out.push('', reachNote(d))
  out.push('')
  for (const s of shown) {
    out.push(renderStory(s, { postsPerStory: d.settings?.postsPerStory ?? 4 }))
    out.push('---')
    out.push('')
  }
  const rest = listed.slice(shown.length, shown.length + 15)
  if (rest.length) {
    out.push('### Also ran')
    out.push('')
    for (const s of rest) {
      if (s.outOfBounds) out.push(`- ${s.rank}. ${LEFT_OUT}`)
      else out.push(`- ${s.rank}. ${headlineOf(s)} (${KIND[s.kind] ?? s.kind}, ${plural(s.stats.posts, 'post')}) [open](${s.posts[0]?.url ?? ''})`)
    }
    out.push('')
  }

  out.push('## Appendix A: most active accounts')
  out.push('')
  out.push('| account | followers | posts | replies to members | engagement | best post |')
  out.push('|---|---:|---:|---:|---:|---|')
  for (const a of d.appendices.activeAccounts) {
    const f = d.authors?.[a.did]
    out.push(`| ${who(a)} | ${f?.followers == null ? '' : n(f.followers) + (f.small ? ' (small)' : '')} | ${a.posts} | ${a.repliesToMembers} | ${n(a.engagement)} | [${mdText(clip(a.best?.text ?? '', 70)) || 'open'}](${a.best?.url ?? ''})${a.best?.redacted ? ' (redacted)' : ''} |`)
  }
  out.push('')
  out.push('## Appendix B: links that circulated')
  out.push('')
  out.push('| link | members | posts | new domain | first shared by |')
  out.push('|---|---:|---:|:---:|---|')
  for (const l of d.appendices.links) {
    out.push(`| [${mdText(clip(l.title || l.url, 80))}](${l.url}) | ${l.members} | ${l.posts} | ${l.newDomain ? 'yes' : ''} | [@${l.firstPost.handle}](${l.firstPost.url}) |`)
  }
  out.push('')
  out.push('## Appendix C: phrases that spiked')
  out.push('')
  if (!d.appendices.phrases.length) out.push(`Nothing cleared the bar ${thisP}.`)
  else {
    out.push(`People: distinct cluster members using it ${thisP}. Rates are uses per 1,000 cluster posts, ${thisP} against a sample of the ${d.window.baselineWeeks} weeks before.`)
    out.push('')
    out.push('| phrase | people | per 1k now | per 1k before | ratio | days | first used |')
    out.push('|---|---:|---:|---:|---:|---:|---|')
    for (const p of d.appendices.phrases) {
      const first = p.outOfBounds ? `out of bounds (${p.outOfBounds.topics.join(', ')})` : p.first ? `[@${p.first.handle}, ${shortTime(p.first.time)}: ${p.first.sensitive || p.first.consent ? '(marked, not quoted)' : mdText(clip(p.first.text, 60))}](${p.first.url})${p.first.redacted ? ' (redacted)' : ''}` : ''
      out.push(`| "${mdText(p.term)}"${p.isNew ? ' (new)' : ''} | ${p.authors} | ${p.per1k} | ${p.baselinePer1k ?? '–'} | ${p.ratio || '–'} | ${p.days} | ${first} |`)
    }
  }
  out.push('')
  out.push('## Appendix D: "X week" declarations')
  out.push('')
  const wk = d.appendices.weeks ?? []
  if (!wk.length) out.push(`None ${thisP}.`)
  else {
    out.push('The community names its weeks. "declared" means someone wrote it as a declaration ("it\'s X week", "X week rolls into ..."); otherwise two or more people used it.')
    out.push('')
    out.push('| week | people | posts | declared | first used |')
    out.push('|---|---:|---:|:---:|---|')
    for (const w of wk) {
      const first = w.outOfBounds ? `out of bounds (${w.outOfBounds.topics.join(', ')})` : w.first ? `[@${w.first.handle}, ${shortTime(w.first.time)}: ${w.first.sensitive || w.first.consent ? '(marked, not quoted)' : mdText(clip(w.first.text, 70))}](${w.first.url})${w.first.redacted ? ' (redacted)' : ''}` : ''
      out.push(`| "${mdText(w.term)}" | ${w.authors} | ${w.posts} | ${w.declared ? 'yes' : ''} | ${first} |`)
    }
  }
  out.push('')
  out.push('## Appendix E: how this was made')
  out.push('')
  const r = d.run ?? {}
  const st = d.stats ?? {}
  out.push(`- Cluster: ${plural(st.cluster?.members ?? 0, 'account')} (${st.cluster?.seeds ?? 0} seeds; ${n(st.cluster?.candidates)} candidates considered, ${n(st.cluster?.cutByCap)} cut by the cap).`)
  out.push(`- Posts: ${n(st.posts?.window)} in the window, ${n(st.posts?.baseline)} in the baseline weeks, ${n(st.posts?.priorFiles)} read from earlier digests.`)
  out.push(`- Requests: ${n(r.requests)} made, ${n(r.cacheHits)} served from cache, ${n(r.retries)} retries, ${n(r.rateLimited)} rate-limited. Runtime ${r.runtimeSeconds ?? '?'}s.`)
  const ex = st.excluded ?? {}
  const labels = Object.entries(ex.postsDroppedLabel ?? {}).map(([k, v]) => `${v} ${k}`).join(', ')
  out.push(`- Excluded: ${n(ex.optedOutAccountsSeen)} opted-out, ${n(ex.noUnauthenticatedAccounts)} logged-out-hidden, ${n(ex.selfDeclaredAccounts)} opted out in their profile and ${n(ex.showOptOutRequests)} asked the show to leave them out; posts dropped: ${n(ex.postsDroppedOptOut)} opt-out, ${n(ex.postsDroppedNoUnauthenticated)} logged-out-hidden, ${n(ex.postsDroppedSelfDeclared)} profile opt-out, ${n(ex.postsDroppedShowRequest)} show request, ${labels || '0'} by content label; ${n(ex.quotesStripped)} quoted posts and ${n(ex.replyLinksHidden)} reply links removed from others' posts; ${n(ex.mentionsRedacted)} posts by others had an excluded account's name redacted (marked, not quotable) and ${n(ex.postsWithheldNamingExcluded)} were withheld as mainly about one${ex.outputScrubbed ? `; **${n(ex.outputScrubbed)} strings were caught only by the final check**` : ''}.`)
  if (st.profiles) out.push(`- Profiles: ${n(st.profiles.checked)} read for follower counts and profile opt-outs; ${n(st.profiles.missing)} authors without one (deleted, or not fetched). Small account: under ${n(st.profiles.smallThreshold)} followers.`)
  out.push('- Sensitivity flags are keyword matches against config/safety.json: a coarse hint. The writer and reviewer still apply R10 themselves.')
  if (r.warnings?.length) out.push(`- Warnings: ${r.warnings.slice(0, 8).map(mdText).join('; ')}${r.warnings.length > 8 ? ` (and ${r.warnings.length - 8} more in digest.json)` : ''}`)
  out.push('')
  return out.join('\n')
}

function renderBuild(b, i) {
  const out = []
  const main = b.links[0]
  const others = b.links.slice(1).map((l) => `[${mdText(l.title || l.domain)}](${l.url})`)
  out.push(`**${i + 1}. [${mdText(clip(b.title || main.url, 80))}](${main.url})**${others.length ? ` (also ${others.join(', ')})` : ''}${main.story ? ` · story ${main.story}` : ''}`)
  out.push('')
  if (b.wish) {
    out.push(`The wish: ${whoF(b.wish)}${b.wish.member ? '' : ' (outside the cluster)'}, ${shortTime(b.wish.time)}, ${countsLine(b.wish.counts)}`)
    out.push(quoteBlock(clip(b.wish.text || '', 300)))
    out.push(`— [open](${b.wish.url})${red(b.wish)}`)
    out.push('')
  }
  if (!b.wish && b.inReplyTo) {
    out.push(`In reply to (not a wish): ${whoF(b.inReplyTo)}, ${shortTime(b.inReplyTo.time)}: ${mdText(clip((b.inReplyTo.text || '').replace(/\s+/g, ' '), 160))} [open](${b.inReplyTo.url})${red(b.inReplyTo)}`)
    out.push('')
  }
  const bb = b.builtBy
  out.push(`${b.kind === 'built' ? 'Built by' : 'First shared by'} ${whoF(bb)}, ${shortTime(b.builtAt)}, ${countsLine(bb.counts)}`)
  out.push(quoteBlock(clip(bb.text || '', 300)))
  out.push(`— [open](${bb.url})${red(bb)}`)
  if (b.sharedBy.length) out.push('', `Shared by ${b.sharedBy.slice(0, 6).map((x) => `[@${x.handle}](${x.url})${x.smallAccount ? ' (small)' : ''}`).join(', ')}${b.sharedBy.length > 6 ? ` and ${b.sharedBy.length - 6} more` : ''}`)
  out.push('')
  return out.join('\n')
}

const daysLong = (w) => {
  const days = (Date.parse(w.end) - Date.parse(w.start)) / 86_400_000
  return `${Math.round(days * 10) / 10} days`
}

const dayTime = (t) => {
  const d = new Date(t)
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.toISOString().slice(11, 16)}Z`
}

const personMd = (x) => (!x ? '?' : x.excluded ? '(not included)' : `@${x.handle}${x.small ? ' (small account)' : ''}`)

export function renderGames(games = []) {
  const out = []
  if (!games.length) return ''
  out.push('## Community games')
  out.push('')
  for (const g of games) {
    out.push(`### ${mdText(g.name)} (@${g.label ?? g.account})`)
    out.push('')
    if (g.about) out.push(`*${mdText(g.about)}*`, '')
    if (g.writerNote) out.push(`**For the writer:** ${mdText(g.writerNote)}`, '')
    if (g.accountExcluded) { out.push('The game account is excluded by the consent rules.', ''); continue }
    if (!g.results.length) { out.push('No results posted in the window.', ''); continue }
    const sg = g.segment
    out.push('Facts from the game\'s own posts; the show writes its own speculation.')
    out.push('')
    out.push('**Standings**')
    out.push('')
    out.push('| day | winner | likes | of the record | rank in history | the post |')
    out.push('|---|---|---:|---:|---:|---|')
    for (const r of sg?.standings ?? []) {
      let post = ''
      if (r.winner?.excluded) post = '(not included)'
      else if (!r.winningPost) post = 'not resolved'
      else if (r.winningPost.sensitive || r.winningPost.consent) post = `marked (${[...(r.winningPost.sensitive ?? []), ...(r.winningPost.consent ?? [])].join(', ')}), not quoted: [open](${r.winningPost.url})`
      else post = `${r.winningPost.text?.trim() ? '"' + mdText(clip(r.winningPost.text.replace(/\s+/g, ' '), 120)) + '"' : r.winningPost.imageAlts?.length ? '*[image: ' + mdText(clip(r.winningPost.imageAlts[0], 80)) + ']*' : '*(image or video)*'} [open](${r.winningPost.url})${red(r.winningPost)}`
      out.push(`| ${dayTime(r.time)} | ${personMd(r.winner)}${r.winner?.followers != null ? ` (${n(r.winner.followers)} followers)` : ''} | ${n(r.likes)} | ${r.ofRecord != null ? Math.round(r.ofRecord * 100) + '%' : ''} | ${r.rankInHistory ?? ''} of ${r.ofResults} | ${post} |`)
    }
    out.push('')
    if (sg?.record) out.push(`- **Record:** ${n(sg.record.score)} likes, held by ${personMd(sg.record.holder)}; ${sg.record.changedInWindow ? 'it changed in the window' : 'unchanged through the window'}.`)
    out.push(`- **Repeat winners in the window:** ${sg?.repeatWinners?.length ? sg.repeatWinners.map((x) => `@${x.handle} (${x.wins})`).join(', ') : 'none'}.`)
    out.push(`- **Streaks (consecutive results):** ${sg?.streaks?.length ? sg.streaks.map((x) => `@${x.handle}, ${x.length} in a row to ${dayTime(x.to)}`).join('; ') : 'none'}.`)
    if (sg?.history?.results) out.push(`- **Recent history** (${mdText(sg.history.note)}, ${dayTime(sg.history.from)} to ${dayTime(sg.history.to)}): median winning score ${n(sg.history.medianWinningLikes)}, highest ${n(sg.history.highest)}, lowest ${n(sg.history.lowest)}, ${plural(sg.history.winners, 'different winner')}.`)
    if (sg?.participation) {
      const pt = sg.participation
      out.push(`- **Participation:** ${pt.days.map((x) => `${DAYS[new Date(x.time).getUTCDay()]} ${x.posted}/${x.eligible}`).join(', ')} people posted (share ${Math.round(pt.lowestShare * 100)}% to ${Math.round(pt.highestShare * 100)}%); the eligible pool went from ${n(pt.eligibleFrom)} to ${n(pt.eligibleTo)}.`)
    }
    if (sg?.leaderboard) out.push(`- **Near the record** (all-time leaderboard, ${dayTime(sg.leaderboard.time)}): ${sg.leaderboard.entries.slice(0, 6).map((e) => `${e.rank}. ${e.excluded ? '(not included)' : '@' + e.handle} ${n(e.score)}${e.behindRecord ? ` (${n(e.behindRecord)} behind)` : ''}`).join('; ')} [open](${sg.leaderboard.url})`)
    if (sg?.cameClose && !sg.cameClose.known) out.push(`- **Who came close on the day:** not known; ${mdText(sg.cameClose.note)}.`)
    out.push('')
  }
  return out.join('\n')
}

/** Dialogue as nested list items: one speaker per line, replies indented under what they answer. */
export function renderThread(t, i) {
  const out = []
  const lead = t.posts[0]
  out.push(`### Thread ${i + 1}: ${mdText(clip((lead.text || '').replace(/\s+/g, ' '), 90))}`)
  out.push('')
  out.push(`${plural(t.posts.filter((p) => !p.removed).length, 'post')} · ${t.speakers} speakers (${t.memberSpeakers} in the cluster) · ${plural(t.turns, 'turn')} · ${t.complete ? 'complete thread' : 'assembled from members\' feeds, may miss replies'}${t.removedPosts ? ` · ${plural(t.removedPosts, 'post')} removed` : ''} · [open](${t.url})`)
  out.push('')
  for (const p of t.posts) {
    const pad = '  '.repeat(Math.min(p.depth, 8))
    if (p.removed) { out.push(`${pad}- *(${p.count === 1 ? 'a reply' : `${p.count} replies`} here not included)*`); continue }
    const lines = mdText(p.text).split('\n')
    const name = `**${mdText(p.displayName || p.handle)}** (@${p.handle}${p.smallAccount ? ', small account' : ''})`
    out.push(`${pad}- ${name}: ${lines[0]}`)
    for (const l of lines.slice(1)) out.push(`${pad}  ${l}`)
  }
  out.push('')
  return out.join('\n')
}

export function renderSections(d) {
  const thisP = d.window?.kind && d.window.kind !== 'week' ? 'in this window' : 'this week'
  const unit = d.window?.kind && d.window.kind !== 'week' ? 'window' : 'week'
  const sec = d.sections ?? {}
  const out = []
  const g = renderGames(sec.games)
  if (g) out.push(g)
  const builds = (sec.built ?? []).filter((b) => !b.outOfBounds)
  out.push(`## Built ${thisP}`)
  out.push('')
  if (!builds.length) out.push(`Nothing detected ${thisP}.`, '')
  else {
    out.push("Someone wished for a thing, and it got built. Links on a member's own domain, on a build host, or on a new domain someone said they built; the wish is the post the build replied to or quoted. Ordered by how good a story it is: a wish by someone else, members sharing it, reactions, then engagement.")
    out.push('')
    for (const [i, b] of builds.slice(0, d.settings?.builds ?? 12).entries()) out.push(renderBuild(b, i))
    const skipped = (sec.built ?? []).length - builds.length
    if (skipped) out.push(`*${plural(skipped, 'build')} left out: flagged out of bounds.*`, '')
  }

  // Posts about the show are for reviewers only (reviewers/about-show.md); writers who saw
  // them wrote to them (trial 002, finding 11). Not even a count is printed here.

  // Voices the show has never featured
  const nv = sec.newVoices ?? []
  out.push('## New voices')
  out.push('')
  if (!nv.length) out.push(d.ledger?.found === false ? 'No ledger was given, so the digest cannot tell who is new to the show.' : `No strong new voices ${thisP}.`, '')
  else {
    out.push(`Members the show has never featured (per the ledger), with the strongest ${unit}: the sum of their three best post scores, out-of-bounds posts left out. ${reachNote(d)}`)
    out.push('')
    for (const v of nv) {
      out.push(`### ${who(v)}${followers({ followers: v.followers, small: v.small })}`)
      out.push('')
      out.push(`${plural(v.postsInWindow, 'post')} ${thisP}. Strongest:`)
      out.push('')
      for (const p of v.top) { out.push(renderPost(p, { maxChars: 400 })); out.push('') }
    }
  }

  // Interview material
  const iv = sec.interview
  out.push('## Interview material')
  out.push('')
  if (!iv?.candidates?.length) out.push(`No member had enough question-and-answer pairs ${thisP}.`, '')
  else {
    out.push(`For a constructed interview: every answer is a member's real post, every question is what that post was replying to, exact text in digest.json under \`sections.interview\`. ${mdText(iv.rule)} Both sides pass the consent and sensitivity rules. Nobody who appeared in the previous episode; people the show featured earlier are listed after those it never has.`)
    out.push('')
    for (const c of iv.candidates) {
      out.push(`### ${who(c)}${followers({ followers: c.followers, small: c.small })}${c.featuredEarlier ? ` (featured in an earlier episode: ${c.featuredEarlier})` : ''}`)
      out.push('')
      out.push(`${plural(c.pairCount, 'pair')} (${c.questions} direct questions), from ${plural(c.questioners, 'different asker')}.`)
      out.push('')
      for (const x of c.pairs.slice(0, d.settings?.interviewPairs ?? 4)) {
        out.push(`- **Q** (${x.question.kind}, @${x.question.handle}${x.question.smallAccount ? ', small account' : ''}): ${mdText(clip(x.question.text.replace(/\s+/g, ' '), 200))} [open](${x.question.url})`)
        out.push(`  **A**: ${mdText(x.answer.text.replace(/\s+/g, ' '))} [open](${x.answer.url})`)
      }
      out.push('')
    }
  }
  // Threads a writer could perform word for word
  const perf = sec.performableThreads
  if (perf) {
    out.push('## Threads you could perform')
    out.push('')
    if (!perf.threads.length) out.push(`No thread passed the checks ${thisP}.`, '')
    else {
      out.push(`Real back-and-forth between cluster members, every post short enough to speak, no sensitivity flags, nobody excluded in the middle. Chosen from ${perf.considered} qualifying threads. **The exact text is in digest.json under \`sections.performableThreads\`** (or \`npm run lookup -- --thread <address>\`); a performed line must match it character for character. Markdown here is escaped for display only.`)
      out.push('')
      for (const [i, t] of perf.threads.entries()) out.push(renderThread(t, i))
    }
  }
  return out.join('\n')
}

/** reviewers/about-show.md: posts and stories about the show itself, for reviewers only. */
export function renderAboutShow(about, stories = [], window = {}) {
  const out = [`# About the show: ${window.label ?? ''}`, '', 'For reviewers and auditors only. Writers, researchers and builders do not read this file: what people said about the show stays out of the digest, the skeletons and the lane slices (trial 002, finding 11).', '']
  if (about.optOutRequests?.length) {
    out.push(`## Requests to be left out (${about.optOutRequests.length})`, '', 'These accounts posted something about the show that reads as a request not to be included. They are excluded from everything else. Read the post, and if it is a request, add the account to `packages/scraper/config/optout.json` (R11).', '')
    for (const r of about.optOutRequests) out.push(`- @${r.handle}: [the post](${r.url})`)
    out.push('')
  }
  out.push(`## Posts (${about.posts?.length ?? 0})`, '')
  if (!about.posts?.length) out.push('No posts mention or link the show in this window.', '')
  for (const p of about.posts ?? []) {
    const tags = [p.why.join(', '), p.correction ? '**possible correction**' : null, p.quotesLines?.length ? `**quotes ${p.quotesLines.map((q) => '"' + mdText(clip(q, 60)) + '"').join(', ')}: check against what was posted**` : null, p.sensitive ? `marked: ${p.sensitive.join(', ')}` : null].filter(Boolean).join(' · ')
    out.push(`- ${whoF(p)}, ${shortTime(p.time)} · ${tags}: "${mdText((p.text || '').replace(/\s+/g, ' '))}" (${countsLine(p.counts)}) [open](${p.url})${red(p)}`)
  }
  out.push('')
  if (stories.length) {
    out.push(`## Stories about the show (${stories.length})`, '')
    for (const s of stories) out.push(`- ${s.rank}. ${mdText(s.headline)} (${plural(s.stats.posts, 'post')}, ${plural(s.stats.members, 'member')}) id \`${s.id}\``)
    out.push('')
  }
  return out.join('\n')
}
