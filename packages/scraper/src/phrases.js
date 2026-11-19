// Phrases and coinages that spiked this week against the baseline weeks.
//
// Two numbers per phrase:
//   people  distinct cluster members who used it this week (a trend needs several people,
//           so one account repeating itself never counts)
//   ratio   how much more often it appears per post this week than in the baseline sample.
//           Rates are per post, not per week, because the baseline is a sample: prolific
//           accounts are fetched only a few pages back. Each author contributes at most
//           `perAuthorCap` posts to a phrase's count.
// A phrase spikes when people >= minAuthors and ratio >= minRatio.

import { phrasesOf, tokenize, STOPWORDS } from './text.js'
import { utcDay } from './window.js'

export function spikedPhrases(windowPosts, baselinePosts, baselineWeeks, cfg = {}) {
  const { maxN = 3, minAuthors = 3, minRatio = 3, top = 25, extraStopwords = [], smoothing = 1, perAuthorCap = 3 } = cfg
  const extraStop = new Set(extraStopwords.map((s) => s.toLowerCase()))
  const index = (posts) => {
    const m = new Map()
    for (const p of posts) {
      const grams = phrasesOf(p.text, { maxN, extraStop })
      for (const t of p.tags ?? []) if (!extraStop.has(t)) grams.add('#' + t)
      for (const g of grams) {
        let e = m.get(g)
        if (!e) m.set(g, (e = { authors: new Map(), posts: [], days: new Set() }))
        e.authors.set(p.authorDid, (e.authors.get(p.authorDid) ?? 0) + 1)
        e.posts.push(p)
        if (p.time) e.days.add(utcDay(Date.parse(p.time)))
      }
    }
    return m
  }
  const capped = (e) => { let n = 0; for (const c of e.authors.values()) n += Math.min(c, perAuthorCap); return n }
  const w = index(windowPosts)
  const b = index(baselinePosts)
  const Nw = Math.max(1, windowPosts.length)
  const Nb = baselinePosts.length
  const hasBaseline = baselineWeeks > 0 && Nb > 0

  const cands = []
  for (const [term, e] of w) {
    const authors = e.authors.size
    if (authors < minAuthors) continue
    const cw = capped(e)
    const be = b.get(term)
    const cb = be ? capped(be) : 0
    const rate = cw / Nw
    const baseRate = hasBaseline ? (cb + smoothing) / Nb : 0
    const ratio = hasBaseline ? rate / baseRate : 0
    if (hasBaseline && ratio < minRatio) continue
    const n = term.split(' ').length
    // Longer phrases are rarer, so the same number of people means more.
    const score = authors * Math.log2(1 + (hasBaseline ? ratio : 1)) * (1 + 0.5 * (n - 1))
    cands.push({
      term, n, authors, posts: e.posts.length, days: e.days.size,
      per1k: round(1000 * rate), baselinePer1k: hasBaseline ? round((1000 * cb) / Nb) : null, baselineAuthors: be?.authors.size ?? 0,
      ratio: round(ratio), score: round(score), isNew: hasBaseline && cb === 0, variants: [],
      _posts: e.posts, _authors: new Set(e.authors.keys()),
    })
  }

  // One entry per catchphrase: prefer the longer phrase when it carries most of a shorter
  // one's people, and fold fragments used by exactly the same people into `variants`.
  cands.sort(byScore)
  const kept = []
  for (const c of cands) {
    if (kept.some((k) => k.n > c.n && containsGram(k.term, c.term) && k.authors >= 0.6 * c.authors)) continue
    if (cands.some((o) => o.n > c.n && containsGram(o.term, c.term) && o.authors >= 0.8 * c.authors)) continue
    const dup = kept.find((k) => sameSet(k._authors, c._authors) && shareWord(k.term, c.term))
    if (dup) { dup.variants.push(c.term); continue }
    kept.push(c)
    if (kept.length >= top) break
  }
  return { hasBaseline, phrases: kept }
}

const round = (x) => Math.round(x * 100) / 100
const byScore = (a, b) => b.score - a.score || b.authors - a.authors || (a.term < b.term ? -1 : 1)
const containsGram = (long, short) => (' ' + long + ' ').includes(' ' + short + ' ')
const shareWord = (a, b) => a.split(' ').some((x) => b.split(' ').includes(x))
function sameSet(a, b) {
  if (a.size !== b.size) return false
  for (const x of a) if (!b.has(x)) return false
  return true
}

// ---- "X week" declarations: the community names its weeks ("catoid week", "chimera vocal
// synth week"). One to three words right before "week", none of them a stopword or an
// ordinary week word. Kept if two or more people used it, or one person declared it.

const WEEK_STOP = new Set(`this last next a an per the every one two three four whole long busy good bad great rough hard
weird crazy big full work same entire few couple second first third another each that which what of for in on
by from to at after before during within into my your our their his her its some any all no rest following
previous coming past few several fashion business holy half`.split(/\s+/).filter(Boolean))

const CUE = /\b(it'?s|its|is now|now|officially|welcome to|happy|declare|declaring|declared|rolls?( smoothly)? into|kicks off|begins|starts|begun|presents?|this is)\b/i


export function weekDeclarations(posts, { maxN = 3, top = 15 } = {}) {
  const found = new Map()
  for (const p of posts) {
    const text = String(p.text ?? '')
    const re = /((?:[\p{L}\p{N}][\p{L}\p{N}'’_-]*\s+){1,3})week\b/giu
    for (const m of text.matchAll(re)) {
      const toks = tokenize(m[1].replace(/[-_]+/g, ' '))
      for (let n = 1; n <= Math.min(maxN, toks.length); n++) {
        const gram = toks.slice(-n)
        if (gram.some((t) => WEEK_STOP.has(t) || STOPWORDS.has(t))) break
        const term = gram.join(' ') + ' week'
        const before = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 30)
        let e = found.get(term)
        if (!e) found.set(term, (e = { term, authors: new Set(), posts: [], cued: false }))
        if (!e.posts.includes(p)) e.posts.push(p)
        e.authors.add(p.authorDid)
        if (CUE.test(before)) e.cued = true
      }
    }
  }
  let list = [...found.values()].filter((e) => e.authors.size >= 2 || e.cued)
  // prefer the longest form carried by the same posts
  list = list.filter((e) => !list.some((o) => o !== e && o.term.endsWith(' ' + e.term) && o.posts.length >= e.posts.length))
  return list
    .map((e) => {
      const first = [...e.posts].sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.uri < b.uri ? -1 : 1))[0]
      return { term: e.term, authors: e.authors.size, posts: e.posts.length, declared: e.cued, first, _posts: e.posts }
    })
    .sort((a, b) => b.authors - a.authors || b.posts - a.posts || (a.term < b.term ? -1 : 1))
    .slice(0, top)
}
