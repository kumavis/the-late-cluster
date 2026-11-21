// What the audience pointed at (workflow stage 2, the `tagged` lane; README "The tagged lane").
//
// A post that tags the show's account (a mention facet carrying one of the show's DIDs) is read
// as a pointer when it points at something that is not the show: the post it replies to or
// quotes, a link it carries, or its own content when it is a top-level post showing or
// describing a thing. Only a tag from a member of the cluster, as the scraper computed it for
// the window, counts; each counts with a weight from the tagger's membership score.
//
// A tag guides where the show looks and decides nothing else: nothing here replies to,
// likes, reposts or acknowledges a tag, a pointer never enters a story's posts, scores or
// reach, and a tagged story gains only the lane hint `tagged`.
//
// Pure given its inputs.

import { didOfUri } from './normalize.js'
import { marksOf } from './skeletons.js'

const WORD_RE = /[\p{L}\p{N}]+/gu
const round = (x) => Math.round(x * 1000) / 1000
const clip = (s, n) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim()
  return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + ' …' : t
}
const byTime = (a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1)

/** The show's DIDs: show.config.json's, cluster.json showAccount's, and any DID in show.json handles. */
export function showDids(config, extra = []) {
  return new Set([...extra, config.cluster?.showAccount?.did, ...(config.show?.handles ?? []).filter((h) => String(h).startsWith('did:'))].filter((d) => typeof d === 'string' && d.startsWith('did:')))
}

/** Does this post's own text tag the show (a mention facet with one of its DIDs)? */
export const tagsShow = (p, dids) => (p?._mentions ?? []).some((m) => dids.has(m.did))

const COMPILED = new WeakMap()
const compiledAbout = (cfg) => {
  if (!COMPILED.has(cfg)) COMPILED.set(cfg, (cfg.aboutShowPatterns ?? []).map((x) => new RegExp(x, 'iu')))
  return COMPILED.get(cfg)
}

/** The post's own words, with its mentions taken out. */
function ownWords(p) {
  let t = String(p.text ?? '')
  for (const m of [...(p._mentions ?? [])].filter((x) => Number.isInteger(x.start)).sort((a, b) => b.start - a.start)) t = t.slice(0, m.start) + ' ' + t.slice(m.end)
  t = t.replace(/@[\w.-]+/g, ' ').replace(/https?:\/\/\S+/g, ' ')
  return (t.match(WORD_RE) ?? []).length
}

/**
 * Classify one post that tags the show.
 * @returns {{ own: true } | { pointer: false, why } | { pointer: true, kind: 'reply'|'quote'|'link'|'post', target, root, link? }}
 */
export function classifyTag(p, { lookup = () => null, dids, matcher, cfg = {} }, depth = 0) {
  if (dids.has(p.authorDid)) return { own: true }
  const aboutRes = compiledAbout(cfg)
  // A post about the show by its content: the show's own, or one that names or links it.
  const aboutShow = (q) => !!q && (dids.has(q.authorDid) || (matcher ? matcher(q) : []).some((r) => r !== "mentions the show's account"))
  // The tag's own words: a link to the show, or words that react to the show.
  const ownText = [p.text ?? '', ...(p.imageAlts ?? [])].join('\n')
  if ((matcher ? matcher(p) : []).includes('links the show')) return { pointer: false, why: 'links the show' }
  if (aboutRes.some((re) => re.test(ownText))) return { pointer: false, why: 'talks about the show' }

  if (p.quote?.uri) {
    const q = lookup(p.quote.uri) ?? p._quoted
    if (dids.has(didOfUri(p.quote.uri))) return { pointer: false, why: "quotes the show's own post" }
    if (aboutShow(q)) return { pointer: false, why: 'quotes a post about the show' }
    if (q && tagsShow(q, dids) && depth < 4) {
      const c = classifyTag(q, { lookup, dids, matcher, cfg }, depth + 1)
      if (!c.pointer) return { pointer: false, why: 'quotes a tag about the show' }
      return { ...c, kind: 'quote', via: q.uri }
    }
    return { pointer: true, kind: 'quote', target: p.quote.uri, root: q?.reply?.root ?? p.quote.uri }
  }
  if (p.reply) {
    const { parent, root } = p.reply
    if (dids.has(didOfUri(parent)) || dids.has(didOfUri(root))) return { pointer: false, why: "under the show's own post" }
    const par = lookup(parent)
    if (aboutShow(par) || aboutShow(lookup(root))) return { pointer: false, why: 'in a thread about the show' }
    if (par && tagsShow(par, dids) && depth < 4) {
      const c = classifyTag(par, { lookup, dids, matcher, cfg }, depth + 1)
      if (!c.pointer) return { pointer: false, why: 'replies to a tag about the show' }
      return { ...c, kind: 'reply', via: par.uri }
    }
    if (!parent) return { pointer: false, why: 'replies to a post that is not known' }
    return { pointer: true, kind: 'reply', target: parent, root: root ?? parent }
  }
  // A top-level post: a link, a picture or video, or words of its own describing a thing.
  const links = (p.links ?? []).filter((l) => !/(^|\.)bsky\.app$/.test(l.domain ?? ''))
  if (links.length) return { pointer: true, kind: 'link', target: p.uri, root: p.uri, link: links[0].url }
  if (p.media?.length || p.hasImages || p.hasVideo) return { pointer: true, kind: 'post', target: p.uri, root: p.uri }
  if (ownWords(p) >= (cfg.minOwnWords ?? 6)) return { pointer: true, kind: 'post', target: p.uri, root: p.uri }
  return { pointer: false, why: 'only the tag' }
}

/** Every post in the window that tags the show, classified, oldest first. */
export function findTags(posts, { lookup, dids, matcher, cfg = {}, window }) {
  const out = []
  const seen = new Set()
  for (const p of posts) {
    if (seen.has(p.uri) || !tagsShow(p, dids)) continue
    seen.add(p.uri)
    const t = Date.parse(p.time)
    if (window && !(t >= window.start && t < window.end)) continue
    out.push({ post: p, cls: classifyTag(p, { lookup, dids, matcher, cfg }) })
  }
  return out.sort((a, b) => byTime(a.post, b.post))
}

/** The sets analyze() needs: pointers kept out of the about-show set; reply and quote pointers kept out of the stories. */
export function tagSets(tags) {
  return {
    tags: new Set(tags.map((t) => t.post.uri)),
    pointers: new Set(tags.filter((t) => t.cls.pointer).map((t) => t.post.uri)),
    addressed: new Set(tags.filter((t) => t.cls.pointer && (t.cls.kind === 'reply' || t.cls.kind === 'quote')).map((t) => t.post.uri)),
  }
}

/**
 * Centrality from the membership score the scraper already computes (cluster.js
 * candidateScore), normalised to 0..1 against the window's highest-scoring member, with what it
 * is made of. Seeds are scored the same way (only other seeds' follows count for them).
 */
export function centralityOf(members, expansion = {}, cfg = {}) {
  const max = Math.max(0, ...members.map((m) => m.score ?? 0))
  const w = expansion.weights ?? {}
  const caps = expansion.caps ?? {}
  const floor = cfg.weight?.floor ?? 0.05
  const out = new Map()
  for (const m of members) {
    const s = m.signals ?? {}
    const cap = (v, k) => Math.min(v ?? 0, caps[k] ?? Infinity)
    const components = {
      seedFollows: { value: s.seedFollows ?? 0, weight: w.seedFollows ?? 0 },
      interactions: { value: s.interactions ?? 0, capped: cap(s.interactions, 'interactions'), weight: w.interactions ?? 0 },
      roster: { value: (s.rosters ?? []).length, capped: Math.min((s.rosters ?? []).length, caps.rosters ?? 1), weight: w.roster ?? 0 },
      feedPosts: { value: s.feedPosts ?? 0, capped: cap(s.feedPosts, 'feedPosts'), weight: w.feedPosts ?? 0 },
      termPosts: { value: s.termPosts ?? 0, capped: cap(s.termPosts, 'termPosts'), weight: w.termPosts ?? 0 },
      listed: { value: s.listed ? 1 : 0, weight: w.listed ?? 0 },
    }
    for (const k of Object.keys(components)) if (!components[k].value) delete components[k]
    const raw = m.score ?? 0
    const normalised = max > 0 ? raw / max : 0
    out.set(m.did, { raw, max, normalised: round(normalised), weight: round(Math.max(floor, normalised)), seed: !!m.seed, components })
  }
  return out
}

/**
 * The lane. Inputs are what run.js has after analysis and skeletons.
 * @param {object} a
 * @param {Array} a.tags findTags() over every post collected (raw, before consent)
 * @param {object} a.consent
 * @param {Function} a.isBot (did, labels) -> boolean
 * @param {Set} a.memberDids
 * @param {Map} a.centrality did -> centralityOf() row
 * @param {Function} a.postOf uri -> the consent-filtered, annotated post (or null)
 * @param {Map} a.storyOfPost uri -> skeleton id
 * @param {Map} a.files skeleton id -> skeleton
 * @param {Function} a.authorOf (did, handle, displayName) -> skeleton author record
 * @param {object} a.window
 * @param {object} a.cfg config.lanes.tagged
 */
export function buildTaggedLane({ tags, consent, isBot = () => false, memberDids = new Set(), centrality = new Map(), postOf = () => null, storyOfPost = new Map(), files = new Map(), authorOf = (did, handle) => ({ did, handle }), window, cfg = {} }) {
  const cap = cfg.perTaggerCap ?? 5
  const decay = cfg.weight?.repeatDecay ?? 0.5
  const lineChars = cfg.lineChars ?? 90
  const counts = { tags: tags.length, pointers: 0, counted: 0, taggers: 0, entries: 0, aboutShow: 0, ignored: { own: 0, notMember: 0, bot: 0, excludedTagger: 0, overCap: 0, repeat: 0, excludedTarget: 0, notFound: 0 } }
  const aboutShowWhy = {}
  const perTagger = new Map() // did -> [thing keys], in time order
  const entries = new Map()
  // A skeleton post (or context post) by its address.
  const skPostOf = (id, uri) => {
    const f = files.get(id)
    return f ? [...(f.context ?? []), ...(f.posts ?? [])].find((x) => x.uri === uri) ?? null : null
  }
  const storyOf = (uri) => {
    if (storyOfPost.has(uri)) return storyOfPost.get(uri)
    for (const [id, f] of files) if ((f.context ?? []).some((x) => x.uri === uri)) return id
    return null
  }
  for (const { post: raw, cls } of tags) {
    if (cls.own) { counts.ignored.own++; continue }
    if (!cls.pointer) { counts.aboutShow++; aboutShowWhy[cls.why] = (aboutShowWhy[cls.why] ?? 0) + 1; continue }
    counts.pointers++
    const did = raw.authorDid
    if (consent.excludedDid(did) || consent.check({ did, handle: raw.handle, labels: raw._authorLabels })) { counts.ignored.excludedTagger++; continue }
    if (!memberDids.has(did)) { counts.ignored.notMember++; continue }
    if (isBot(did, raw._authorLabels)) { counts.ignored.bot++; continue }
    const mine = postOf(raw.uri)
    // The thing pointed at: an excluded account's post is counted and nothing else.
    if (!mine || consent.excludedDid(didOfUri(cls.target)) || consent.excludedDid(didOfUri(cls.root)) || mine.reply?.hidden || (cls.kind === 'quote' && mine.quote?.state === 'removed')) { counts.ignored.excludedTarget++; continue }
    const id = storyOf(cls.target)
    const sk = id ? files.get(id) : null
    if (sk?.excluded) { counts.ignored.excludedTarget++; continue }
    if (!sk) { counts.ignored.notFound++; continue }
    const key = cls.link ? `link:${cls.link}` : cls.target
    const list = perTagger.get(did) ?? []
    if (list.includes(key)) { counts.ignored.repeat++; continue }
    if (list.length >= cap) { counts.ignored.overCap++; continue }
    list.push(key)
    perTagger.set(did, list)
    counts.counted++
    const c = centrality.get(did) ?? { raw: 0, max: 0, normalised: 0, weight: cfg.weight?.floor ?? 0.05, components: {} }
    const nth = list.length
    const weight = round(c.weight * Math.pow(decay, nth - 1))
    const a = authorOf(did, mine.handle, mine.displayName)
    if (!entries.has(key)) {
      const tp = skPostOf(id, cls.target)
      const tAuthor = tp?.author ?? {}
      entries.set(key, {
        id, kind: cls.kind, key,
        target: tp ? {
          uri: tp.uri, url: tp.url, handle: tp.handle, did: tAuthor.did ?? didOfUri(tp.uri), time: tp.time, text: tp.text, hasText: tp.hasText,
          member: !!tAuthor.member, ...(tAuthor.pronouns !== undefined ? { pronouns: tAuthor.pronouns } : {}), media: (tp.media ?? []).length,
          ...(tp.redacted ? { redacted: true } : {}), ...(marksOf(tp) ?? {}),
        } : { uri: cls.target, note: 'not in the skeleton' },
        ...(cls.link ? { link: cls.link } : {}),
        outsideCluster: !!sk.outsideCluster,
        taggers: [],
      })
    }
    const e = entries.get(key)
    e.taggers.push({
      uri: mine.uri, url: mine.url, handle: mine.handle, did, displayName: mine.displayName ?? null, time: mine.time, text: mine.text ?? '',
      kind: cls.kind, addressedToShow: true, member: true, followers: a.followers ?? null, small: !!a.small, ...(a.pronouns !== undefined ? { pronouns: a.pronouns } : {}),
      weight, nth, centrality: c,
      ...(mine.redacted ? { redacted: true } : {}), ...(marksOf(mine) ?? {}),
    })
  }
  counts.taggers = perTagger.size
  const rows = [...entries.values()].map((e) => {
    const sk = files.get(e.id)
    const reach = sk?.reach?.score ?? 0
    const weight = round(e.taggers.reduce((t, x) => t + x.weight, 0))
    return { ...e, weight, people: e.taggers.length, reach }
  }).sort((x, y) => y.weight - x.weight || y.people - x.people || y.reach - x.reach || (x.key < y.key ? -1 : 1))
  const limited = rows.slice(0, cfg.limit ?? 40)
  counts.entries = limited.length
  const entriesOut = limited.map((e, i) => {
    const sk = files.get(e.id)
    const what = sk.marks?.leadMarked ? `(lead post marked: ${Object.keys(sk.marks.topics ?? {}).join(', ')})` : clip(e.target.text || sk.headline || '(no text)', lineChars)
    const thing = e.kind === 'link' ? `the link ${e.link}` : e.kind === 'post' ? 'their own post' : e.kind === 'quote' ? 'a quoted post' : 'the post they replied to'
    const line = `${what} — weight ${e.weight} from ${e.people} member${e.people === 1 ? '' : 's'} (${e.taggers.map((t) => `@${t.handle} ${t.weight}`).join(', ')}); ${thing}${e.target.member ? ', by a member' : ', not by a member'}${e.outsideCluster ? ', outside the cluster' : ''}; reach ${e.reach}`
    const { key, ...rest } = e
    return { rank: i + 1, ...rest, line, score: e.weight }
  })
  return {
    format: 'late-cluster-lane/1', lane: 'tagged', window: window.label,
    rule: `What the audience pointed at: a post by a member of this window's cluster that tags the show's account and points at something that is not the show (the post it replies to or quotes, a link, or its own top-level post showing or describing a thing). Tags from accounts outside the cluster are not listed here, only counted. Each tagger counts once per thing, weighted by their membership score in the cluster (normalised to 0..1 against the window's most central member, at least ${cfg.weight?.floor ?? 0.05}); a member's later pointers in the window count ${decay} times the one before, and at most ${cap} count. Ranked by the sum of the weights. A tag guides where the show looks and decides nothing else; the show promises nobody a place.`,
    counts, aboutShowWhy,
    entries: entriesOut,
  }
}

/** The coverage report's one line about tags. */
export function taggedLine(counts) {
  if (!counts) return null
  const i = counts.ignored
  const why = [['from outside the cluster', i.notMember], ['by bots', i.bot], ['by excluded accounts', i.excludedTagger], ['over the per-member cap', i.overCap], ['repeats of the same thing', i.repeat], ['at an excluded account or story', i.excludedTarget], ['at something not found', i.notFound]].filter(([, n]) => n).map(([w, n]) => `${n} ${w}`)
  const ignored = Object.values(i).reduce((a, b) => a + b, 0) - i.own
  return `Tags of the show's account: ${counts.pointers} pointer${counts.pointers === 1 ? '' : 's'} (${counts.counted} counted, from ${counts.taggers} member${counts.taggers === 1 ? '' : 's'}, ${counts.entries} thing${counts.entries === 1 ? '' : 's'} pointed at); ${ignored} ignored${why.length ? ` (${why.join(', ')})` : ''}; ${counts.aboutShow} only about the show (for reviewers); ${i.own} by the show itself.`
}
