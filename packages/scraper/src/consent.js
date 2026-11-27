// Consent and safety rules, applied in code rather than left to the reader.
//
// 1. Opt-out (config/optout.json, handles or DIDs): never fetched, never written. Their posts
//    are dropped. A post by someone else that quotes them keeps its own text but loses the
//    quoted content; a reply to them keeps its own text but loses the link to their post.
//    @-mentions of them in other people's text are replaced with "@[opted-out]".
// 2. Accounts self-labelled `!no-unauthenticated` are treated exactly like opt-outs (the
//    show's archive is open to logged-out viewers).
// 3. Accounts whose post about the show, or addressed to its account, asks to be left out
//    are treated exactly like opt-outs (bible R11: an explicit ask to the show).
//    A profile description that asks not to be quoted, screenshotted or used by bots or AI
//    (config/safety.json selfDeclaredOptOut, bioReview) is a line addressed to everyone, not
//    an ask to the show (the owner's ruling, 27 November 2026; bible R2, R11). It excludes
//    nobody: it is kept as a note on the account (`bioNotes`, private/bio-review.md), evidence
//    for the reviewer's repost test (R6).
// 4. Posts carrying an adult or graphic-content label (post or account level) are dropped.
//    The same applies to quoted content.
// 5. Naming an excluded account (README "Consent and safety", "Naming an excluded account"):
//    an excluded account is matched by DID, and by every handle and display name the run has
//    seen for that DID. In someone else's post a reference to it (an @-mention, a link to its
//    profile or posts, its handle or DID or display name in plain text, a list entry cut off
//    inside its name) is replaced with "[opted-out]" and the post is marked `redacted`, so no
//    role quotes it as verbatim. A post mainly about the account is withheld whole. Alt text,
//    link titles, feed and list cards are redacted the same way; a quoted post that names it
//    is removed from the quoting post.
// Every exclusion is counted (never described) in the digest's stats.

import { didOfUri, shortHash } from './normalize.js'
import { STOPWORDS } from './text.js'

export const NO_UNAUTH = '!no-unauthenticated'

/** What replaces a reference to an excluded account. An @-mention keeps its "@". */
export const MARKER = '[opted-out]'

/**
 * A redacted post's flags. `outOfBounds` is what the writers' room gates already refuse as a
 * source; `redacted` says why.
 */
export const redactedFlags = () => ({ redacted: true, outOfBounds: { topics: ['redacted'], rule: 'R11', note: 'names an account the consent rules exclude; the text is altered, so it is not quotable or performable' } })

/**
 * Consent reasons that digests written before 27 November 2026 used for a general remark ("don't
 * quote me"). Under the owner's ruling of that day (bible R2, R11) they are repost notes, not
 * reasons to refuse a post; `exclusionReasons` drops them so an older digest reads the same.
 */
export const LEGACY_NOTE_REASONS = new Set(['asks not to be quoted', 'its author asked not to be quoted in this story'])

/** A post's `consent` reasons that still refuse it (README "Marks"). */
export const exclusionReasons = (p) => (p?.consent ?? []).filter((r) => !LEGACY_NOTE_REASONS.has(r))

/** The flags to copy onto any summary of a post (a brief, a quoted post, a thread entry). */
export const consentFlags = (p) => (p?.redacted || p?._redacted ? redactedFlags() : {})

const DID_RE = /did:(?:plc|web):[a-z0-9._:%-]+/gi
// A handle-like token: two or more dot-separated labels, not inside a longer token.
const HANDLE_RE = /(?<![\p{L}\p{N}_.-])(@?)([a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+)/giu
const PROFILE_URL_RE = /(?:https?:\/\/)?(?:www\.)?bsky\.app\/profile\/([^\s/?#)\]>"]+)[^\s)\]>"]*/gi
const URL_RE = /\bhttps?:\/\/\S+|\bwww\.\S+/gi
const WORD_RE = /[\p{L}\p{N}]+/gu
const LIST_ENTRY_RE = /^\s*(?:\d{1,3}[.)]|[-–—•*·])\s+\S/u
const LAST_ENTRY_RE = /^(\s*(?:\d{1,3}[.)]|[-–—•*·])\s+)(@?)([\p{L}\p{N}._-]+?)(?:…|\.\.\.)?$/u
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const isWordChar = (ch) => !!ch && /[\p{L}\p{N}]/u.test(ch)

/** The forms of a display name worth matching in text: lowercased, trimmed of decoration. */
export function nameForms(name, { minChars = 3 } = {}) {
  const base = String(name ?? '').normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase()
  const core = base.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
  const out = new Set()
  for (const f of [base, core]) {
    const letters = (f.match(/[\p{L}\p{N}]/gu) ?? []).length
    if (letters < minChars || !/^[\p{L}\p{N}]/u.test(f)) continue
    if (!/\s/.test(f) && STOPWORDS.has(f)) continue
    out.add(f)
  }
  return [...out]
}

function mergeSpans(spans) {
  const s = [...spans].filter((x) => Number.isInteger(x.start) && x.end > x.start).sort((a, b) => a.start - b.start || b.end - a.end)
  const out = []
  for (const x of s) {
    const last = out.at(-1)
    const kinds = x.kinds ?? [x.kind]
    if (last && x.start < last.end) { last.end = Math.max(last.end, x.end); for (const k of kinds) last.kinds.add(k) }
    else out.push({ start: x.start, end: x.end, kinds: new Set(kinds) })
  }
  return out
}

/** Replace each span with the marker (keeping an @-mention's "@"). */
export function applySpans(text, spans) {
  let t = text
  for (const s of [...spans].sort((a, b) => b.start - a.start)) {
    const mark = t[s.start] === '@' ? '@' + MARKER : MARKER
    t = t.slice(0, s.start) + mark + t.slice(s.end)
  }
  return t
}

export const normHandle = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()

export class Consent {
  /**
   * @param {object} o
   * @param {Array} o.optOut config/optout.json accounts
   * @param {Array} o.blockedLabels
   * @param {Array} o.selfDeclaredPatterns
   * @param {object} o.naming safety.json excludedMentions: { minOwnWords, aboutPatterns, minNameChars }
   */
  constructor({ optOut = [], blockedLabels = [], selfDeclaredPatterns = [], indirectPatterns = [], reviewPatterns = [], naming = {} } = {}) {
    this.dids = new Set()
    this.handles = new Set()
    for (const entry of optOut) {
      const v = String(entry?.did ?? entry?.handle ?? entry).trim()
      if (!v) continue
      if (v.startsWith('did:')) this.dids.add(v)
      else this.handles.add(normHandle(v))
    }
    this.noUnauth = new Set()
    this.showRequests = new Set()
    // did -> { kind: 'direct' | 'indirect' | 'review', phrase, matched, pattern }: a bio line
    // for the repost test. Never an exclusion.
    this.bioNotes = new Map()
    this.excludedHandles = new Set()
    // What a bio says about quoting, keeping or bots, said directly ("no QTs"), another way
    // ("posts meant to disappear") or in words worth a look ("ephemeral"): notes, all three.
    this.selfDeclaredRes = selfDeclaredPatterns.map((x) => new RegExp(x, 'iu'))
    this.indirectRes = indirectPatterns.map((x) => new RegExp(x, 'iu'))
    this.reviewRes = reviewPatterns.map((x) => new RegExp(x, 'iu'))
    this.blockedLabels = new Set(blockedLabels)
    this.naming = {
      minOwnWords: naming.minOwnWords ?? 4,
      minNameChars: naming.minNameChars ?? 3,
      commonNameAuthors: naming.commonNameAuthors ?? 3,
      minLooseNameChars: naming.minLooseNameChars ?? 5,
      aboutRes: (naming.aboutPatterns ?? []).map((x) => new RegExp(x, 'iu')),
    }
    // Every handle and display name seen for every DID, so an excluded account is matched by
    // all of them, whenever it was excluded.
    this.identities = new Map()
    this._index = null
    // Name forms that are ordinary words in this run's posts (see calibrateNames).
    this.commonNames = new Set()
    this.stats = {
      optedOutAccountsSeen: 0,
      noUnauthenticatedAccounts: 0,
      postsDroppedOptOut: 0,
      postsDroppedNoUnauthenticated: 0,
      bioNoteAccounts: 0,
      showOptOutRequests: 0,
      postsDroppedShowRequest: 0,
      postsDroppedLabel: {},
      quotesStripped: 0,
      replyLinksHidden: 0,
      mentionsRedacted: 0,
      postsWithheldNamingExcluded: 0,
      quotesStrippedNamingExcluded: 0,
      references: { mention: 0, link: 0, did: 0, handle: 0, name: 0, fragment: 0, altText: 0, linkTitle: 0, card: 0, displayName: 0 },
      withheldBecause: { conversation: 0, fewOwnWords: 0, opensWithIt: 0, aboutIt: 0, possessive: 0, image: 0 },
      outputScrubbed: 0,
    }
    this._seen = new Set()
  }

  /** Remember a handle and display name for a DID. */
  see(did, handle, displayName) {
    if (!did || !String(did).startsWith('did:')) return
    let e = this.identities.get(did)
    if (!e) this.identities.set(did, (e = { handles: new Set(), names: new Set() }))
    const h = normHandle(handle)
    if (h && h !== 'handle.invalid' && !e.handles.has(h)) {
      e.handles.add(h)
      if (this.handles.has(h)) this._exclude(this.dids, did)
      else if (this.excludedDid(did)) this._index = null
    }
    const n = String(displayName ?? '').trim()
    if (n && !e.names.has(n)) {
      e.names.add(n)
      if (this.excludedDid(did)) this._index = null
    }
  }

  _exclude(set, did) {
    if (!did || set.has(did)) return
    set.add(did)
    this._index = null
  }

  /** Should this handle be skipped before we even ask the API about it? */
  skipHandle(handle) {
    return this.handles.has(normHandle(handle))
  }

  /** Is this handle one an excluded account has used, or a configured opt-out? */
  excludedHandle(handle) {
    const h = normHandle(handle).replace(/\.$/, '')
    return !!h && (this.handles.has(h) || this.excludedHandles.has(h) || this.index().handles.has(h))
  }

  /**
   * Learn from a profile or author view. Returns true if the account must be excluded.
   * A configured handle teaches us its DID, so a later handle change does not leak it.
   */
  check(actor) {
    if (!actor) return false
    const did = actor.did
    const handle = normHandle(actor.handle)
    this.see(did, actor.handle, actor.displayName)
    if (handle && this.handles.has(handle) && did) this._exclude(this.dids, did)
    if (did && this.dids.has(did)) {
      this.countAccount('opt', did)
      return true
    }
    if (did && this.showRequests.has(did)) return true
    const labels = (actor.labels ?? []).map((l) => l?.val ?? l)
    if (labels.includes(NO_UNAUTH)) {
      if (did) this._exclude(this.noUnauth, did)
      this.countAccount('nu', did)
      return true
    }
    return false
  }

  countAccount(kind, did) {
    const key = kind + did
    if (this._seen.has(key)) return
    this._seen.add(key)
    if (kind === 'opt') this.stats.optedOutAccountsSeen++
    else this.stats.noUnauthenticatedAccounts++
  }

  excludedDid(did) {
    return !!did && (this.dids.has(did) || this.noUnauth.has(did) || this.showRequests.has(did))
  }

  reasonFor(did) {
    if (this.dids.has(did)) return 'optOut'
    if (this.noUnauth.has(did)) return 'noUnauthenticated'
    if (this.showRequests.has(did)) return 'showRequest'
    return null
  }

  /**
   * Which of the bio lists a text matches: 'direct' (selfDeclaredOptOut.patterns), 'indirect'
   * (indirectPatterns), 'review' (bioReview.patterns) or null. A label for a note, never an
   * exclusion.
   */
  bioKind(description) {
    return this.bioReview(description)?.kind ?? null
  }

  /**
   * What a description says about quoting, keeping, screenshots or bots, as a note for the
   * repost test: { kind, phrase, matched, pattern } (the matched words with a little of the
   * sentence around them), or null. Bio text is private: the phrase goes only to private/.
   */
  bioReview(description) {
    const d = String(description ?? '')
    if (!d) return null
    for (const [kind, list] of [['direct', this.selfDeclaredRes], ['indirect', this.indirectRes], ['review', this.reviewRes]]) {
      for (const re of list) {
        const m = re.exec(d)
        if (!m) continue
        const a = Math.max(0, d.lastIndexOf(' ', Math.max(0, m.index - 25)))
        const b = d.indexOf(' ', Math.min(d.length, m.index + m[0].length + 25))
        return { kind, phrase: d.slice(a, b < 0 ? d.length : b).trim(), matched: m[0], pattern: re.source }
      }
    }
    return null
  }

  /**
   * Learn from a full profile (with description). Returns true if the account is excluded:
   * by the opt-out list, the logged-out label, or an ask to the show. A bio never excludes;
   * what it says is kept as a note (`bioNotes`).
   */
  checkProfile(profile) {
    if (!profile?.did) return false
    if (this.check(profile)) return true
    const r = this.bioReview(profile.description)
    if (r && !this.bioNotes.has(profile.did)) { this.bioNotes.set(profile.did, r); this.stats.bioNoteAccounts++ }
    return false
  }

  /** A post about the show asked to be left out: exclude its author from now on. */
  declareShowRequest(did, handle) {
    if (!did || this.excludedDid(did)) return
    this._exclude(this.showRequests, did)
    this.stats.showOptOutRequests++
    if (handle) this.excludedHandles.add(normHandle(handle))
  }

  /** Adult or graphic label on the post or its author, or null. */
  blockedLabel(post) {
    for (const l of [...(post.labels ?? []), ...(post._authorLabels ?? [])]) if (this.blockedLabels.has(l)) return l
    return null
  }

  /** Learn from every author the post carries before deciding anything. */
  learnFromPost(post) {
    if (!post) return
    this.check({ did: post.authorDid, handle: post.handle, displayName: post.displayName, labels: post._authorLabels })
    for (const m of post._mentions ?? []) this.see(m.did, m.text)
    if (post._quoted) this.learnFromPost(post._quoted)
  }

  /**
   * Everything an excluded account is known by, rebuilt only when exclusions or the names
   * seen for an excluded DID change.
   */
  index() {
    if (this._index) return this._index
    const dids = new Set([...this.dids, ...this.noUnauth, ...this.showRequests])
    const handles = new Map()
    for (const h of [...this.handles, ...this.excludedHandles]) handles.set(h, null)
    const names = new Map() // first word -> [{ form, did, re }]
    const prefixes = new Set()
    for (const did of dids) {
      const e = this.identities.get(did)
      if (!e) continue
      for (const h of e.handles) handles.set(h, did)
      for (const n of e.names) {
        for (const form of nameForms(n, { minChars: this.naming.minNameChars })) {
          const first = form.match(/^[\p{L}\p{N}]+/u)[0]
          if (!names.has(first)) names.set(first, [])
          const list = names.get(first)
          // A one-word name this short is matched only in conversation with its account.
          const loose = /\s/.test(form) || (form.match(/[\p{L}\p{N}]/gu) ?? []).length >= this.naming.minLooseNameChars
          if (!list.some((x) => x.form === form)) list.push({ form, did, loose, re: new RegExp(esc(form).replace(/ /g, '\\s+'), 'iuy') })
          prefixes.add(form)
        }
      }
    }
    for (const h of handles.keys()) prefixes.add(h)
    // Custom-domain handles: a link to that domain is a link to the account.
    const domains = new Set([...handles.keys()].filter((h) => !h.endsWith('.bsky.social')))
    this._index = { dids, handles, names, prefixes: [...prefixes], domains }
    return this._index
  }

  /** Does this handle-or-DID name an excluded account? */
  actorExcluded(actor) {
    const a = normHandle(actor)
    if (!a) return false
    return this.excludedDid(a) || this.index().dids.has(a) || this.excludedHandle(a)
  }

  /** Does a URL or at:// URI point at an excluded account, its posts or its own domain? */
  uriExcluded(url) {
    const u = String(url ?? '')
    if (u.startsWith('at://')) return this.excludedDid(didOfUri(u) ?? u.slice(5).split('/')[0])
    const m = /bsky\.app\/profile\/([^/?#\s]+)/i.exec(u)
    if (m) {
      let who = m[1]
      try { who = decodeURIComponent(who) } catch { /* keep as is */ }
      if (this.actorExcluded(who)) return true
    }
    let host = null
    try { host = new URL(/^[a-z]+:\/\//i.test(u) ? u : 'https://' + u).hostname.toLowerCase().replace(/^www\./, '') } catch { return false }
    const { domains } = this.index()
    const parts = host.split('.')
    for (let i = 0; i < parts.length - 1; i++) if (domains.has(parts.slice(i).join('.'))) return true
    return false
  }

  /** Kept for callers of the old name. */
  linkMentionsExcluded(url) {
    return this.uriExcluded(url)
  }

  /**
   * Where a text names an excluded account: [{ start, end, kind, did }]. `facets` are spans
   * already found from the post's own mention and link facets.
   */
  refsIn(text, { facets = [], names = true, contact = null } = {}) {
    const t = String(text ?? '')
    if (!t) return []
    const ix = this.index()
    const spans = [...facets]
    if (!ix.dids.size && !ix.handles.size) return spans
    for (const m of t.matchAll(PROFILE_URL_RE)) {
      let who = m[1]
      try { who = decodeURIComponent(who) } catch { /* keep */ }
      if (this.actorExcluded(who)) spans.push({ start: m.index, end: m.index + m[0].length, kind: 'link' })
    }
    for (const m of t.matchAll(DID_RE)) if (ix.dids.has(m[0])) spans.push({ start: m.index, end: m.index + m[0].length, kind: 'did' })
    for (const m of t.matchAll(HANDLE_RE)) {
      const h = m[2].toLowerCase()
      if (!ix.handles.has(h)) continue
      let start = m.index
      let end = m.index + m[0].length
      // A link to the account's own domain goes whole: scheme and path too.
      if (!m[1]) {
        const before = /(?:https?:\/\/)?(?:www\.)?$/i.exec(t.slice(Math.max(0, start - 12), start))
        if (before?.[0]) start -= before[0].length
        const after = /^\/\S*/.exec(t.slice(end))
        if (after) end += after[0].length
      }
      spans.push({ start, end, kind: 'handle', did: ix.handles.get(h) })
    }
    if (names && ix.names.size) {
      for (const m of t.matchAll(WORD_RE)) {
        const cands = ix.names.get(m[0].toLowerCase())
        if (!cands) continue
        for (const c of cands) {
          c.re.lastIndex = m.index
          const hit = c.re.exec(t)
          if (!hit || isWordChar(t[m.index + hit[0].length])) continue
          // A name that is an ordinary word here counts only in conversation with its account.
          if (contact && (!c.loose || this.commonNames.has(c.form)) && !contact.has(c.did)) continue
          spans.push({ start: m.index, end: m.index + hit[0].length, kind: 'name', did: c.did })
        }
      }
    }
    return spans
  }

  /**
   * The excluded accounts a post is in conversation with: what it replies to (parent or root),
   * quotes, mentions or links, and the thread it sits in.
   */
  contactOf(post) {
    const out = new Set()
    const add = (did) => { if (did && this.excludedDid(did)) out.add(did) }
    add(didOfUri(post.reply?.root))
    add(didOfUri(post.reply?.parent))
    add(didOfUri(post.quote?.uri))
    add(post._quoted?.authorDid)
    add(didOfUri(post._threadKey))
    for (const m of post._mentions ?? []) add(m.did)
    for (const l of post._linkFacets ?? []) add(didOfUri(l.uri))
    return out
  }

  /**
   * Display names are not unique, and many are ordinary words ("moon", "chaos"). Before
   * filtering, find the name forms of excluded accounts that `commonNameAuthors` or more
   * different people write outside any conversation with that account: those are words, and
   * are matched only inside such a conversation. Every other name form is matched anywhere.
   */
  calibrateNames(posts) {
    const ix = this.index()
    if (!ix.names.size) return this.commonNames
    const authors = new Map()
    for (const p of posts) {
      if (!p || this.excludedDid(p.authorDid)) continue
      const contact = this.contactOf(p)
      for (const t of [p.text, ...(p.imageAlts ?? []), ...(p.links ?? []).map((l) => l.title)]) {
        if (!t) continue
        for (const sp of this.refsIn(t)) {
          if (sp.kind !== 'name' || contact.has(sp.did)) continue
          const form = t.slice(sp.start, sp.end).toLowerCase().replace(/\s+/g, ' ')
          if (!authors.has(form)) authors.set(form, new Set())
          authors.get(form).add(p.authorDid)
        }
      }
    }
    this.commonNames = new Set([...authors].filter(([, a]) => a.size >= this.naming.commonNameAuthors).map(([f]) => f))
    return this.commonNames
  }

  /**
   * A list post cut off inside its last entry ("9. a"), where what is left could be the start
   * of an excluded account's handle or name: the fragment's span, or null. We cannot tell whose
   * name it is, so a fragment that could be theirs is treated as theirs.
   */
  trailingFragment(text) {
    const t = String(text ?? '')
    if (!t || /\s$/.test(t)) return null
    const lines = t.split('\n')
    const last = lines.at(-1)
    const m = LAST_ENTRY_RE.exec(last)
    if (!m) return null
    const entries = lines.slice(0, -1).filter((l) => LIST_ENTRY_RE.test(l))
    if (entries.length < 2) return null
    const tokens = (l) => l.trim().split(/\s+/).length
    if (tokens(last) >= Math.min(...entries.map(tokens))) return null
    const frag = m[3].toLowerCase()
    if (!this.index().prefixes.some((x) => x.startsWith(frag))) return null
    const start = t.length - last.length + m[1].length
    return { start, end: t.length, kind: 'fragment' }
  }

  /** Why a post that names an excluded account is mainly about it, or null. */
  withholdReason(text, spans, { conversation = false } = {}) {
    if (!spans.length) return null
    if (conversation) return 'conversation'
    const rest = applySpans(text, spans).split(MARKER).join(' ').replace(URL_RE, ' ').replace(/@[\w.-]+/g, ' ').replace(/#[\p{L}\p{N}_]+/gu, ' ')
    const words = (rest.match(/[\p{L}\p{N}]+/gu) ?? []).length
    if (words < this.naming.minOwnWords) return 'fewOwnWords'
    if (!/[\p{L}\p{N}]/u.test(text.slice(0, spans[0].start))) return 'opensWithIt'
    for (const s of spans) if (/^['’]s\b/u.test(text.slice(s.end))) return 'possessive'
    if (this.naming.aboutRes.length) {
      for (const s of spans) {
        // the sentence (or line) holding the reference
        const starts = [0]
        const nl = text.lastIndexOf('\n', s.start - 1)
        if (nl >= 0 && nl < s.start) starts.push(nl + 1)
        for (const p of ['. ', '! ', '? ']) { const i = text.lastIndexOf(p, s.start - 1); if (i >= 0 && i < s.start) starts.push(i + 2) }
        const a = Math.max(...starts)
        const ends = ['\n', '. ', '! ', '? '].map((p) => text.indexOf(p, s.end)).filter((x) => x >= 0)
        const sentence = text.slice(a, ends.length ? Math.min(...ends) + 1 : text.length)
        if (this.naming.aboutRes.some((re) => re.test(sentence))) return 'aboutIt'
      }
    }
    return null
  }

  /**
   * Apply the rules to one normalized post. Returns the (possibly redacted) post, or null if
   * the post must be dropped or withheld. Counts go to `this.stats` unless `count` is false.
   * With `keepWithheld`, a post withheld for naming an excluded account comes back redacted
   * and marked `_withheld` (the game section reads results from it; nothing else may).
   */
  filterPost(post, { count = true, keepWithheld = false } = {}) {
    const bump = (k) => { if (count) this.stats[k]++ }
    const reason = this.reasonFor(post.authorDid)
    if (reason === 'optOut') { bump('postsDroppedOptOut'); return null }
    if (reason === 'noUnauthenticated') { bump('postsDroppedNoUnauthenticated'); return null }
    if (reason === 'showRequest') { bump('postsDroppedShowRequest'); return null }
    const label = this.blockedLabel(post)
    if (label) {
      if (count) this.stats.postsDroppedLabel[label] = (this.stats.postsDroppedLabel[label] ?? 0) + 1
      return null
    }

    const out = { ...post }
    // Is this post in conversation with an excluded account (replying to it, quoting it)?
    let conversation = false
    const contact = this.contactOf(post)

    // Quotes: keep the quoting post, drop the quoted content if it is excluded, labelled, or
    // names an excluded account (a quoted post is never shown with holes in it).
    if (out.quote) {
      const qDid = didOfUri(out.quote.uri)
      const q = out._quoted
      const byExcluded = this.excludedDid(qDid) || (q && this.excludedDid(q.authorDid))
      const names = !byExcluded && q && !this.blockedLabel(q) && !!this.redact(q, { count: false, contact: this.contactOf(q) })?.redacted
      if (byExcluded || names || (q && this.blockedLabel(q))) {
        out.quote = { uri: null, state: 'removed' }
        out._quoted = null
        bump('quotesStripped')
        if (names) bump('quotesStrippedNamingExcluded')
        if (byExcluded) conversation = true
      }
    }

    // Replies: keep the reply, hide the pointer to an excluded parent or root.
    if (out.reply) {
      const r = { ...out.reply }
      let hidden = false
      for (const k of ['root', 'parent']) {
        if (r[k] && this.excludedDid(didOfUri(r[k]))) {
          r[k] = null
          hidden = true
        }
      }
      if (hidden) {
        r.hidden = true
        conversation = true
        // Keep grouping replies to the same hidden thread, without carrying its URI.
        if (out._threadKey && this.excludedDid(didOfUri(out._threadKey))) out._threadKey = 'hidden:' + shortHash(out._threadKey, 16)
        bump('replyLinksHidden')
      }
      out.reply = r
    }

    return this.redact(out, { count, conversation, keepWithheld, contact })
  }

  /**
   * Redact every reference to an excluded account in a post: text, alt text, link titles and
   * URLs, a feed or list card, the author's own display name. Returns the post unchanged when
   * there is none, a redacted copy, or (when it is mainly about the account) null.
   */
  redact(post, { count = true, conversation = false, keepWithheld = true, contact = this.contactOf(post) } = {}) {
    const refs = (k, n = 1) => { if (count) this.stats.references[k] += n }
    const text = post.text ?? ''
    const facetSpans = []
    for (const m of post._mentions ?? []) {
      if (!this.excludedDid(m.did)) continue
      if (Number.isInteger(m.start) && text.slice(m.start, m.end) === m.text) facetSpans.push({ start: m.start, end: m.end, kind: 'mention' })
      else if (m.text) for (let i = text.indexOf(m.text); i >= 0; i = text.indexOf(m.text, i + 1)) facetSpans.push({ start: i, end: i + m.text.length, kind: 'mention' })
    }
    for (const l of post._linkFacets ?? []) {
      if (Number.isInteger(l.start) && this.uriExcluded(l.uri)) facetSpans.push({ start: l.start, end: l.end, kind: 'link' })
    }
    const ownSpans = mergeSpans(this.refsIn(text, { facets: facetSpans, contact }))
    const frag = this.trailingFragment(text)
    const textSpans = frag ? mergeSpans([...ownSpans, frag]) : ownSpans

    let changed = textSpans.length > 0
    let altNamed = false
    const alts = (post.imageAlts ?? []).map((a) => {
      const sp = mergeSpans(this.refsIn(a, { contact }))
      if (sp.length) { changed = true; altNamed = true; refs('altText') }
      return sp.length ? applySpans(a, sp) : a
    })
    const media = (post.media ?? []).map((m) => {
      if (!m.alt) return m
      const sp = mergeSpans(this.refsIn(m.alt, { contact }))
      if (sp.length) { changed = true; altNamed = true }
      return sp.length ? { ...m, alt: applySpans(m.alt, sp) } : m
    })
    const linksBefore = post.links ?? []
    const links = linksBefore.filter((l) => !this.uriExcluded(l.url)).map((l) => {
      const sp = l.title ? mergeSpans(this.refsIn(l.title, { contact })) : []
      if (sp.length) { changed = true; refs('linkTitle') }
      return sp.length ? { ...l, title: applySpans(l.title, sp) } : l
    })
    if (links.length !== linksBefore.length) refs('link', linksBefore.length - links.length)
    let embedded = post.embedded ?? null
    if (embedded) {
      if (this.uriExcluded(embedded.uri)) { embedded = null; changed = true; refs('card') }
      else if (embedded.name) {
        const sp = mergeSpans(this.refsIn(embedded.name, { contact }))
        if (sp.length) { embedded = { ...embedded, name: applySpans(embedded.name, sp) }; changed = true; refs('card') }
      }
    }
    let displayName = post.displayName ?? null
    if (displayName) {
      // Identifiers only: display names are not unique, and an author's own name must not
      // be taken for someone else's.
      const sp = mergeSpans(this.refsIn(displayName, { names: false }))
      if (sp.length) { displayName = applySpans(displayName, sp); changed = true; refs('displayName') }
    }
    const mentions = (post._mentions ?? []).filter((m) => !this.excludedDid(m.did))
    if (!changed) {
      // Links dropped silently (a profile link with no text of its own) still change nothing quotable.
      return links.length === linksBefore.length ? post : { ...post, links, _mentions: mentions }
    }
    for (const s of textSpans) for (const k of s.kinds) refs(k)

    // An image whose alt text names the account is a picture of it or of its post (a
    // screenshot, a quote card): it cannot be redacted, so the post goes whole.
    const why = altNamed ? 'image' : this.withholdReason(text, ownSpans, { conversation })
    const redacted = {
      ...post,
      text: applySpans(text, textSpans),
      imageAlts: alts,
      ...(post.media ? { media } : {}),
      links,
      embedded,
      displayName,
      ...redactedFlags(),
      _redacted: true,
      _originalText: post._originalText ?? post.text,
      _mentions: mentions,
    }
    if (why) {
      if (count) { this.stats.postsWithheldNamingExcluded++; this.stats.withheldBecause[why]++ }
      return keepWithheld ? { ...redacted, _withheld: why } : null
    }
    if (count) this.stats.mentionsRedacted++
    return redacted
  }

  /** Kept for callers of the old name: redact, never withhold. */
  redactMentions(post, count = true) {
    const r = this.redact(post, { count, keepWithheld: true })
    if (!r?._withheld) return r
    const { _withheld, ...rest } = r
    return rest
  }

  /**
   * The last line of defence, run over everything about to be written: any string still
   * holding an excluded account's DID, handle or profile link is redacted, and a post record
   * holding it is marked. Display names are not matched here (they are not unique); the
   * post filter handles them in context. Object keys that are excluded DIDs are dropped.
   * Returns how many strings were changed.
   */
  scrub(value) {
    const ix = this.index()
    if (!ix.dids.size && !ix.handles.size) return 0
    let changed = 0
    const fix = (s) => {
      if (typeof s !== 'string' || s.length < 4) return s
      const spans = []
      for (const m of s.matchAll(PROFILE_URL_RE)) {
        let who = m[1]
        try { who = decodeURIComponent(who) } catch { /* keep */ }
        if (this.actorExcluded(who)) spans.push({ start: m.index, end: m.index + m[0].length, kind: 'link' })
      }
      for (const m of s.matchAll(DID_RE)) if (ix.dids.has(m[0])) spans.push({ start: m.index, end: m.index + m[0].length, kind: 'did' })
      for (const m of s.matchAll(HANDLE_RE)) if (ix.handles.has(m[2].toLowerCase())) spans.push({ start: m.index, end: m.index + m[0].length, kind: 'handle' })
      if (!spans.length) return s
      changed++
      return applySpans(s, mergeSpans(spans))
    }
    const walk = (node) => {
      if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
          if (typeof node[i] === 'string') node[i] = fix(node[i])
          else if (node[i] && typeof node[i] === 'object') walk(node[i])
        }
        return
      }
      if (!node || typeof node !== 'object') return
      let marked = false
      for (const k of Object.keys(node)) {
        if (ix.dids.has(k)) { delete node[k]; changed++; continue }
        const v = node[k]
        if (typeof v === 'string') {
          const nv = fix(v)
          if (nv !== v) { node[k] = nv; marked = true }
        } else if (v && typeof v === 'object') walk(v)
      }
      if (marked && typeof node.uri === 'string' && 'text' in node) Object.assign(node, redactedFlags())
    }
    walk(value)
    if (changed) this.stats.outputScrubbed += changed
    return changed
  }
}
