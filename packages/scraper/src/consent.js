// Consent and safety rules, applied in code rather than left to the reader.
//
// 1. Opt-out (config/optout.json, handles or DIDs): never fetched, never written. Their posts
//    are dropped. A post by someone else that quotes them keeps its own text but loses the
//    quoted content; a reply to them keeps its own text but loses the link to their post.
//    @-mentions of them in other people's text are replaced with "@[opted-out]".
// 2. Accounts self-labelled `!no-unauthenticated` are treated exactly like opt-outs.
// 3. Accounts whose profile description asks not to be quoted, screenshotted, reposted,
//    clipped or used by bots or AI (config/safety.json selfDeclaredOptOut) are treated
//    exactly like opt-outs. So are accounts whose post about the show asks to be left out.
// 4. Posts carrying an adult or graphic-content label (post or account level) are dropped.
//    The same applies to quoted content.
// Every exclusion is counted (never described) in the digest's stats.

import { didOfUri, shortHash } from './normalize.js'

export const NO_UNAUTH = '!no-unauthenticated'

export const normHandle = (h) => String(h ?? '').trim().replace(/^@/, '').toLowerCase()

export class Consent {
  constructor({ optOut = [], blockedLabels = [], selfDeclaredPatterns = [] } = {}) {
    this.dids = new Set()
    this.handles = new Set()
    for (const entry of optOut) {
      const v = String(entry?.did ?? entry?.handle ?? entry).trim()
      if (!v) continue
      if (v.startsWith('did:')) this.dids.add(v)
      else this.handles.add(normHandle(v))
    }
    this.noUnauth = new Set()
    this.selfDeclared = new Set()
    this.showRequests = new Set()
    this.excludedHandles = new Set()
    this.selfDeclaredRes = selfDeclaredPatterns.map((x) => new RegExp(x, 'iu'))
    this.blockedLabels = new Set(blockedLabels)
    this.stats = {
      optedOutAccountsSeen: 0,
      noUnauthenticatedAccounts: 0,
      postsDroppedOptOut: 0,
      postsDroppedNoUnauthenticated: 0,
      selfDeclaredAccounts: 0,
      postsDroppedSelfDeclared: 0,
      showOptOutRequests: 0,
      postsDroppedShowRequest: 0,
      postsDroppedLabel: {},
      quotesStripped: 0,
      replyLinksHidden: 0,
      mentionsRedacted: 0,
    }
    this._seen = new Set()
  }

  /** Should this handle be skipped before we even ask the API about it? */
  skipHandle(handle) {
    return this.handles.has(normHandle(handle))
  }

  /**
   * Learn from a profile or author view. Returns true if the account must be excluded.
   * A configured handle teaches us its DID, so a later handle change does not leak it.
   */
  check(actor) {
    if (!actor) return false
    const did = actor.did
    const handle = normHandle(actor.handle)
    if (handle && this.handles.has(handle) && did) this.dids.add(did)
    if (did && this.dids.has(did)) {
      this.countAccount('opt', did)
      return true
    }
    if (did && (this.selfDeclared.has(did) || this.showRequests.has(did))) return true
    const labels = (actor.labels ?? []).map((l) => l?.val ?? l)
    if (labels.includes(NO_UNAUTH)) {
      if (did) this.noUnauth.add(did)
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
    return !!did && (this.dids.has(did) || this.noUnauth.has(did) || this.selfDeclared.has(did) || this.showRequests.has(did))
  }

  reasonFor(did) {
    if (this.dids.has(did)) return 'optOut'
    if (this.noUnauth.has(did)) return 'noUnauthenticated'
    if (this.selfDeclared.has(did)) return 'selfDeclared'
    if (this.showRequests.has(did)) return 'showRequest'
    return null
  }

  /** Does a profile description ask not to be quoted, clipped, reposted or used by AI? */
  descriptionOptsOut(description) {
    const d = String(description ?? '')
    return !!d && this.selfDeclaredRes.some((re) => re.test(d))
  }

  /**
   * Learn from a full profile (with description). Returns true if the account is excluded,
   * by the opt-out list, the logged-out label, or its own description.
   */
  checkProfile(profile) {
    if (!profile?.did) return false
    if (this.check(profile)) return true
    if (this.descriptionOptsOut(profile.description)) {
      if (!this.selfDeclared.has(profile.did)) this.stats.selfDeclaredAccounts++
      this.selfDeclared.add(profile.did)
      if (profile.handle) this.excludedHandles.add(normHandle(profile.handle))
      return true
    }
    return false
  }

  /** A post about the show asked to be left out: exclude its author from now on. */
  declareShowRequest(did, handle) {
    if (!did || this.excludedDid(did)) return
    this.showRequests.add(did)
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
    this.check({ did: post.authorDid, handle: post.handle, labels: post._authorLabels })
    if (post._quoted) this.learnFromPost(post._quoted)
  }

  /**
   * Apply the rules to one normalized post. Returns the (possibly redacted) post, or null if
   * the post itself must be dropped. Counts go to `this.stats` unless `count` is false.
   */
  filterPost(post, { count = true } = {}) {
    const bump = (k) => { if (count) this.stats[k]++ }
    const reason = this.reasonFor(post.authorDid)
    if (reason === 'optOut') { bump('postsDroppedOptOut'); return null }
    if (reason === 'noUnauthenticated') { bump('postsDroppedNoUnauthenticated'); return null }
    if (reason === 'selfDeclared') { bump('postsDroppedSelfDeclared'); return null }
    if (reason === 'showRequest') { bump('postsDroppedShowRequest'); return null }
    const label = this.blockedLabel(post)
    if (label) {
      if (count) this.stats.postsDroppedLabel[label] = (this.stats.postsDroppedLabel[label] ?? 0) + 1
      return null
    }

    const out = { ...post }

    // Quotes: keep the quoting post, drop the quoted content if it is excluded.
    if (out.quote) {
      const qDid = didOfUri(out.quote.uri)
      const q = out._quoted
      const qBlocked = this.excludedDid(qDid) || (q && (this.excludedDid(q.authorDid) || this.blockedLabel(q)))
      if (qBlocked) {
        out.quote = { uri: null, state: 'removed' }
        out._quoted = null
        bump('quotesStripped')
      } else if (q) {
        out._quoted = this.redactMentions({ ...q }, count)
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
        // Keep grouping replies to the same hidden thread, without carrying its URI.
        if (out._threadKey && this.excludedDid(didOfUri(out._threadKey))) out._threadKey = 'hidden:' + shortHash(out._threadKey, 16)
        bump('replyLinksHidden')
      }
      out.reply = r
    }

    // Links straight to an excluded account's profile or posts.
    out.links = (out.links ?? []).filter((l) => !this.linkMentionsExcluded(l.url))

    return this.redactMentions(out, count)
  }

  linkMentionsExcluded(url) {
    const m = /bsky\.app\/profile\/([^/?#]+)/.exec(url ?? '')
    if (!m) return false
    const who = decodeURIComponent(m[1]).toLowerCase()
    return this.excludedDid(who) || this.handles.has(who) || this.excludedHandles.has(who)
  }

  redactMentions(post, count = true) {
    let text = post.text ?? ''
    let changed = false
    for (const m of post._mentions ?? []) {
      if (this.excludedDid(m.did) && m.text && text.includes(m.text)) {
        text = text.split(m.text).join('@[opted-out]')
        changed = true
      }
    }
    for (const h of new Set([...this.handles, ...this.excludedHandles])) {
      const re = new RegExp(`@${h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (re.test(text)) {
        text = text.replace(re, '@[opted-out]')
        changed = true
      }
    }
    if (changed && count) this.stats.mentionsRedacted++
    return changed ? { ...post, text, _redacted: true, _originalText: post._originalText ?? post.text, _mentions: (post._mentions ?? []).filter((m) => !this.excludedDid(m.did)) } : post
  }
}
