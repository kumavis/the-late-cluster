// npm run sources -- check <sources.json>: the live source check (workflow v3, stages 9 and
// 12). Over the network, with the scraper's generic client name, it confirms that every cited
// post still exists with the same text (a stored marked cut must match the live text where
// it overlaps), and reads every account as it is now: handle, display name, labels and bio,
// its pinned post, and its posts since the digest's window ended.
//
// Two levels (the owner's ruling, 27 November 2026; bible R2, R11: "anything said in public is
// fair game unless they explicitly asked this account to not do that"):
//   need  stops the episode until a person reads it: an opt-out (the list, !no-unauthenticated),
//         a cited post gone or changed, an account gone, pronouns changed, any new post about
//         the show (it may be an ask), and any post about or addressed to the show that asks
//         not to be quoted, kept, used or tagged.
//   note  reported for the reviewer's repost test (R6), changes nothing: a bio line addressed to
//         everyone, a general remark not addressed to the show, a changed handle or display
//         name (the owner's ruling, 22 November 2026: a display name does not reopen an
//         approved episode).
// Exit 0 when nothing needs a person (notes or not), 1 when something does, 2 for bad arguments.
//
// A description is never printed: only the phrase that matched. An account on the opt-out
// list is never requested and never named; it is reported by its place in the file.

import { readFileSync, existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { XrpcClient, DEFAULT_USER_AGENT } from './http.js'
import { loadConfig, DEFAULT_CONFIG_DIR } from './config.js'
import { Consent, NO_UNAUTH } from './consent.js'
import { normalizePost, didOfUri } from './normalize.js'
import { showMatcher } from './show.js'
import { showDids } from './tagged.js'
import { pronounsOf } from './pronouns.js'
import { compileTopics, topicsOf } from './sensitivity.js'
import { feedItemTime } from './api.js'

export const SOURCES_USAGE = `Usage: npm run sources -- check <path/to/sources.json> [--dir <digest folder>] [--out <file.md>] [--json]

Checks every post and account sources.json cites against the network, now:
  posts      still there, with the same text; a marked cut (… for what is left out) must
             match the live text where it overlaps
  accounts   handle, display name and labels as now; the bio read for what it says about
             quoting or bots (a note); the pinned post; posts since the digest's window ended,
             read for posts about or addressed to the show and for remarks about being quoted
--dir      the digest folder (default: data/weeks/<sources.week>); its window end is where
           "posts since" starts
--out      also write the report as Markdown
--json     print the result as JSON instead of the report
Findings are "needs a person" (an opt-out, a post gone or changed, anything about or
addressed to the show) or notes (a bio line, a general remark, a changed handle or display
name: evidence for the repost test, nothing to stop for).
Exit: 0 nothing needs a person (notes or not), 1 something does, 2 bad arguments.
`

const ELLIPSIS = /…|\.\.\./

/** The parts of a marked cut that must appear in the live text, in order. */
export function cutFragments(cut) {
  return String(cut ?? '').split(ELLIPSIS).map((f) => f.trim().replace(/^["“”']+|["“”']+$/g, '').trim()).filter((f) => f.length >= 3)
}

/** Does every fragment of a cut appear in the text, in order? Returns the first that does not, or null. */
export function cutMismatch(cut, text) {
  let at = 0
  const t = String(text ?? '')
  for (const f of cutFragments(cut)) {
    const i = t.indexOf(f, at)
    if (i < 0) return f
    at = i + f.length
  }
  return null
}

/** Every post and account sources.json cites, with where each is cited and what was stored. */
export function citations(src) {
  const posts = new Map()
  const add = (uri, where, stored = {}) => {
    if (typeof uri !== 'string' || !uri.startsWith('at://')) return
    if (!posts.has(uri)) posts.set(uri, { uri, where: [], texts: [], cuts: [] })
    const e = posts.get(uri)
    e.where.push(where)
    if (typeof stored.text === 'string') e.texts.push({ where, text: stored.text })
    for (const c of stored.cuts ?? []) e.cuts.push({ where, cut: c })
  }
  for (const [i, p] of (src.posts ?? []).entries()) {
    const cuts = [...(p.cuts && typeof p.cuts === 'object' ? Object.values(p.cuts) : [])].filter((x) => typeof x === 'string')
    add(p.uri, `posts[${i}]`, { text: p.text, cuts })
    if (p.replyTo?.uri) add(p.replyTo.uri, `posts[${i}].replyTo`, { text: p.replyTo.text })
    if (p.quoted?.uri) add(p.quoted.uri, `posts[${i}].quoted`, { text: p.quoted.text })
  }
  for (const [i, l] of (src.lines ?? []).entries()) {
    add(l.post, `lines[${i}].post`, { cuts: typeof l.cut === 'string' && ELLIPSIS.test(l.cut) ? [l.cut] : [] })
    add(l.context, `lines[${i}].context`, { text: l.contextText })
  }
  for (const [i, n] of (src.numbers ?? []).entries()) add(n.post, `numbers[${i}].post`)
  const accounts = new Map()
  const addAccount = (did, handle, where, stored = {}) => {
    const key = did ?? (handle ? String(handle).toLowerCase() : null)
    if (!key) return
    if (!accounts.has(key)) accounts.set(key, { did: did ?? null, handle: handle ?? null, where: [], stored: {} })
    const e = accounts.get(key)
    e.where.push(where)
    if (!e.did && did) e.did = did
    if (!e.handle && handle) e.handle = handle
    Object.assign(e.stored, Object.fromEntries(Object.entries(stored).filter(([, v]) => v != null)))
  }
  for (const [i, a] of (src.accounts ?? []).entries()) addAccount(a.did ?? null, a.handle ?? null, `accounts[${i}]`, { handle: a.handle, displayName: a.displayName })
  for (const p of posts.values()) {
    const did = didOfUri(p.uri)
    if (did && ![...accounts.values()].some((a) => a.did === did)) addAccount(did, null, `the author of ${p.where[0]}`)
  }
  return { posts: [...posts.values()], accounts: [...accounts.values()] }
}

/**
 * @param {object} o
 * @param {object} o.sources the parsed sources.json
 * @param {object|null} o.digest the parsed digest.json (window end, stored texts, handles)
 * @param {XrpcClient} o.client
 * @param {object} o.config
 * @param {number} [o.now]
 */
export async function checkSources({ sources, digest = null, digestPosts = new Map(), client, config, now = Date.now(), feedPages = 2 }) {
  const consent = new Consent({ optOut: config.optOut.accounts, selfDeclaredPatterns: config.safety.selfDeclaredOptOut.patterns, indirectPatterns: config.safety.selfDeclaredOptOut.indirectPatterns ?? [], reviewPatterns: config.safety.bioReview?.patterns ?? [] })
  const { posts, accounts } = citations(sources)
  const issues = []
  const notes = []
  const need = (kind, where, what) => issues.push({ kind, where, what })
  const note = (kind, where, what) => notes.push({ kind, where, what })
  // How the check itself ran (not findings about anyone)
  const remarks = []
  const windowEnd = digest?.window?.end ? Date.parse(digest.window.end) : null
  const since = windowEnd ?? now - 7 * 86_400_000
  if (!windowEnd) remarks.push('no digest window: posts since are read from seven days ago')

  // Accounts on the opt-out list are never requested and never named.
  const optedOut = (a) => (a.did && consent.dids.has(a.did)) || (a.handle && consent.skipHandle(a.handle))
  for (const a of accounts) if (optedOut(a)) need('opt-out', a.where.join(', '), 'an account on the opt-out list is cited; remove it')
  const live = accounts.filter((a) => !optedOut(a))
  const optedOutDids = new Set(accounts.filter(optedOut).map((a) => a.did).filter(Boolean))

  // ---- posts: getPosts, 25 at a time
  const liveCited = posts.filter((p) => !optedOutDids.has(didOfUri(p.uri)))
  const views = new Map()
  for (let i = 0; i < liveCited.length; i += 25) {
    const batch = liveCited.slice(i, i + 25).map((p) => p.uri)
    const res = await client.get('app.bsky.feed.getPosts', { uris: batch })
    for (const v of res.posts ?? []) views.set(v.uri, v)
  }
  const postRows = []
  for (const p of liveCited) {
    const v = views.get(p.uri)
    const row = { uri: p.uri, where: p.where, status: 'ok' }
    if (!v) {
      row.status = 'gone'
      need('post gone', p.where.join(', '), `${p.uri} no longer exists, or is hidden from logged-out readers`)
      postRows.push(row)
      continue
    }
    const text = v.record?.text ?? ''
    const stored = [...p.texts, ...(digestPosts.has(p.uri) ? [{ where: 'the digest', text: digestPosts.get(p.uri).text }] : [])]
    for (const s of stored) {
      if (digestPosts.get(p.uri)?.redacted && s.where === 'the digest') continue
      if (s.text === text) continue
      // A stored text with an ellipsis is a marked cut: it must match where it overlaps.
      if (s.where !== 'the digest' && ELLIPSIS.test(s.text)) {
        const miss = cutMismatch(s.text, text)
        if (miss) { row.status = 'changed'; need('cut does not match', `${s.where} (${p.uri})`, `the marked cut's part "${miss.slice(0, 60)}" is not in the live text`) }
        continue
      }
      row.status = 'changed'
      need('text changed', `${s.where} (${p.uri})`, 'stored text no longer matches the live post')
    }
    for (const c of p.cuts) {
      const miss = cutMismatch(c.cut, text)
      if (miss) { row.status = 'changed'; need('cut does not match', `${c.where} (${p.uri})`, `the marked cut's part "${miss.slice(0, 60)}" is not in the live text`) }
    }
    const authorLabels = (v.author?.labels ?? []).map((l) => l.val)
    if (authorLabels.includes(NO_UNAUTH)) need('opt-out', p.where.join(', '), "the post's author now hides from logged-out readers")
    postRows.push(row)
  }

  // ---- accounts: profiles, then pinned posts and recent posts
  const profiles = new Map()
  const actors = live.map((a) => a.did ?? a.handle)
  for (let i = 0; i < actors.length; i += 25) {
    const res = await client.get('app.bsky.actor.getProfiles', { actors: actors.slice(i, i + 25) })
    for (const pr of res.profiles ?? []) { profiles.set(pr.did, pr); if (pr.handle) profiles.set(String(pr.handle).toLowerCase(), pr) }
  }
  const pinned = new Map()
  const pinUris = [...new Set(live.map((a) => profiles.get(a.did ?? String(a.handle).toLowerCase())?.pinnedPost?.uri).filter(Boolean))]
  for (let i = 0; i < pinUris.length; i += 25) {
    const res = await client.get('app.bsky.feed.getPosts', { uris: pinUris.slice(i, i + 25) })
    for (const v of res.posts ?? []) pinned.set(v.uri, v)
  }
  const topics = compileTopics(config.safety.sensitivity.topics, config.safety.sensitivity.combinations)
  const consentTopics = new Set(config.safety.sensitivity.consentTopics ?? ['asked not to be quoted'])
  const showOptOut = (config.safety.showOptOutPatterns?.patterns ?? []).map((x) => new RegExp(x, 'iu'))
  const showAccounts = showDids(config)
  const aboutShowText = showMatcher({ ...config.show, accountDids: [...showAccounts] })
  // About the show, or addressed to its account: it names, links or mentions the show, or
  // replies to or quotes the show's own post.
  const aboutShow = (np) => {
    const r = aboutShowText(np)
    for (const u of [np.reply?.parent, np.reply?.root, np.quote?.uri]) if (u && showAccounts.has(didOfUri(u)) && !r.includes("addressed to the show's account")) r.push("addressed to the show's account")
    return r
  }
  // A post asks when it says not to quote it ("don't quote this") or describes posts as
  // temporary or not to be kept; a bio's direct patterns ("no AI") are for bios, where they
  // are about the account, not for posts, where they are usually about something else.
  const indirect = (config.safety.selfDeclaredOptOut.indirectPatterns ?? []).map((x) => new RegExp(x, 'iu'))
  const asksNot = (text) => topicsOf(text, topics).some((t) => consentTopics.has(t)) || indirect.some((re) => re.test(text))
  // Said to the show: a request to be left out, or an ask not to be quoted, kept or used.
  const asksShow = (text) => showOptOut.some((re) => re.test(text)) || asksNot(text)
  const digestAuthors = digest?.authors ?? {}
  const accountRows = []
  for (const a of live) {
    const pr = profiles.get(a.did ?? String(a.handle).toLowerCase())
    const where = a.where.join(', ')
    const row = { did: a.did ?? pr?.did ?? null, handle: pr?.handle ?? a.handle, where: a.where, status: 'ok', checks: [] }
    if (!pr) { row.status = 'gone'; need('account gone', where, `${a.handle ?? a.did} could not be read: deleted, suspended, or hidden from logged-out readers`); accountRows.push(row); continue }
    const labels = (pr.labels ?? []).map((l) => l.val)
    if (labels.includes(NO_UNAUTH)) { row.status = 'opt-out'; need('opt-out', where, `@${pr.handle} now hides from logged-out readers (${NO_UNAUTH})`) }
    // A bio is addressed to everyone, not to the show: a note, never an opt-out (bible R11).
    const r = consent.bioReview(pr.description)
    if (r) {
      if (row.status === 'ok') row.status = 'noted'
      if (r.kind === 'review') note('bio review', where, `@${pr.handle}'s bio has wording about quoting, keeping or bots: matched "${r.matched}"`)
      else note('bio says', where, `@${pr.handle}'s bio, addressed to everyone, says something about being quoted or used (said ${r.kind === 'direct' ? 'directly' : 'another way'}; this report never prints a bio)`)
    }
    const storedHandle = a.stored.handle ?? digestAuthors[pr.did]?.handle
    if (storedHandle && String(storedHandle).toLowerCase() !== String(pr.handle).toLowerCase()) note('handle changed', where, `was @${storedHandle}, now @${pr.handle}`)
    const storedName = a.stored.displayName ?? digestAuthors[pr.did]?.displayName
    if (storedName != null && (pr.displayName ?? '').trim() !== String(storedName).trim()) note('display name changed', where, `@${pr.handle}: was ${JSON.stringify(storedName)}, now ${JSON.stringify(pr.displayName ?? '')}`)
    // Stated pronouns as they are now (README "Pronouns"), and a change since the scrape.
    const prNow = pronounsOf(pr)
    row.pronouns = prNow.pronouns
    if (prNow.review) row.pronounsReview = true
    const stored = a.stored.pronouns !== undefined ? a.stored.pronouns : digestAuthors[pr.did]?.pronouns
    if (stored !== undefined && (stored?.text ?? null) !== (prNow.pronouns?.text ?? null)) need('pronouns changed', where, `@${pr.handle}: was ${stored?.text ? JSON.stringify(stored.text) : 'none stated'}, now ${prNow.pronouns?.text ? JSON.stringify(prNow.pronouns.text) : prNow.review ? 'none recorded (the bio states more than one set)' : 'none stated'}`)
    row.checks.push(`pronouns ${prNow.pronouns?.text ?? 'none stated'}`)
    row.checks.push('profile')
    const pin = pr.pinnedPost?.uri ? pinned.get(pr.pinnedPost.uri) : null
    if (pin) {
      row.checks.push('pinned post')
      const t = pin.record?.text ?? ''
      const about = aboutShow(normalizePost(pin) ?? {})
      if (about.length && asksShow(t)) need('asks the show', where, `@${pr.handle}'s pinned post is about or addressed to the show and asks not to be quoted, kept, used or tagged: ${pin.uri}`)
      else if (about.length) need('about the show', where, `@${pr.handle}'s pinned post is about the show: ${pin.uri}`)
      else if (asksNot(t)) { if (row.status === 'ok') row.status = 'noted'; note('pinned post asks', where, `@${pr.handle}'s pinned post, a general remark not addressed to the show, says something about being quoted, kept or used: ${pin.uri}`) }
    }
    // posts since the window ended
    let cursor
    let seen = 0
    for (let page = 0; page < feedPages; page++) {
      const res = await client.get('app.bsky.feed.getAuthorFeed', { actor: pr.did, limit: 100, filter: 'posts_with_replies', cursor })
      let older = false
      for (const it of res.feed ?? []) {
        if (it.reason || it.post?.author?.did !== pr.did) continue
        const tm = feedItemTime(it)
        if (!(tm >= since)) { older = true; continue }
        seen++
        const np = normalizePost(it.post)
        const t = np?.text ?? ''
        const about = np ? aboutShow(np) : []
        if (about.length) {
          const req = asksShow(t)
          need(req ? 'asks the show' : 'about the show', where, `@${pr.handle} posted about or to the show${req ? ' and it reads as an ask to be left out, or not to be quoted, kept, used or tagged' : ''}: ${it.post.uri}`)
        } else if (asksNot(t)) { if (row.status === 'ok') row.status = 'noted'; note('post asks', where, `@${pr.handle} posted a general remark, not addressed to the show, about being quoted, kept or used: ${it.post.uri}`) }
      }
      cursor = res.cursor
      if (older || !cursor || !(res.feed ?? []).length) break
    }
    row.checks.push(`${seen} posts since ${new Date(since).toISOString().slice(0, 16)}Z`)
    accountRows.push(row)
  }
  return { format: 'late-cluster-sources-check/1', checkedAt: new Date(now).toISOString(), since: new Date(since).toISOString(), clean: issues.length === 0, counts: { posts: posts.length, accounts: accounts.length, issues: issues.length, notes: notes.length, requests: client.stats.requests }, issues, notes, posts: postRows, accounts: accountRows, remarks }
}

export function renderSourcesCheck(r, { file = '' } = {}) {
  const out = [`# Live source check${file ? `: ${file}` : ''}`, '', `Checked ${r.checkedAt.slice(0, 16)}Z over the network: ${r.counts.posts} posts and ${r.counts.accounts} accounts, posts since ${r.since.slice(0, 16)}Z, ${r.counts.requests} requests.`, '']
  const findings = (list) => { out.push('| what | where | detail |', '|---|---|---|'); for (const i of list) out.push(`| ${i.kind} | ${i.where.replace(/\|/g, '\\|')} | ${i.what.replace(/\|/g, '\\|')} |`); out.push('') }
  const noted = r.notes.length ? ` ${r.notes.length} ${r.notes.length === 1 ? 'note' : 'notes'} below; a note needs nobody.` : ''
  out.push(r.clean ? `**Clean.** Every cited post exists with the same text; no account is on the opt-out list or hidden from logged-out readers, nobody has asked the show to leave them out or not to quote them, and nothing new is about the show.${noted}` : `**Needs a person: ${r.issues.length}.**${noted}`, '')
  if (r.issues.length) findings(r.issues)
  if (r.notes.length) {
    out.push('## Notes', '', 'Reported, not stopping anything (bible R2, R11): a bio line or a general remark is addressed to everyone, not to the show, and is evidence for the reviewer\'s repost test (R6); a changed handle or display name is for the record.', '')
    findings(r.notes)
  }
  out.push('## Posts', '')
  for (const p of r.posts) out.push(`- ${p.status}: ${p.uri} (${p.where.join(', ')})`)
  out.push('', '## Accounts', '')
  for (const a of r.accounts) out.push(`- ${a.status}: @${a.handle ?? a.did} (${a.checks.join('; ') || 'not read'})`)
  for (const n of r.remarks ?? []) out.push('', `*${n}*`)
  return out.join('\n') + '\n'
}

export async function sources(argv, { repoRoot, env = process.env, fetchImpl = globalThis.fetch, write = (s) => process.stdout.write(s), now = Date.now(), sleep } = {}) {
  const { values: a, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { dir: { type: 'string' }, out: { type: 'string' }, json: { type: 'boolean' }, config: { type: 'string' }, 'max-requests': { type: 'string' }, help: { type: 'boolean', short: 'h' } }, strict: true })
  const [cmd, file] = positionals
  if (a.help) { write(SOURCES_USAGE); return 0 }
  if (cmd !== 'check' || !file) { write(SOURCES_USAGE); return 2 }
  if (!existsSync(file)) { write(`error: no such file ${file}\n`); return 2 }
  let src
  try { src = JSON.parse(readFileSync(file, 'utf8')) } catch (e) { write(`error: ${file} is not JSON: ${e.message}\n`); return 2 }
  const config = loadConfig(a.config ? resolve(a.config) : DEFAULT_CONFIG_DIR)
  const dir = a.dir ? resolve(a.dir) : src.week && repoRoot ? join(repoRoot, 'data', 'weeks', src.week) : null
  let digest = null
  const digestPosts = new Map()
  if (dir && existsSync(join(dir, 'digest.json'))) {
    digest = JSON.parse(readFileSync(join(dir, 'digest.json'), 'utf8'))
    const f = join(dir, 'posts.jsonl')
    if (existsSync(f)) for (const l of readFileSync(f, 'utf8').split('\n')) { if (!l) continue; try { const p = JSON.parse(l); digestPosts.set(p.uri, { text: p.text, redacted: !!p.redacted }) } catch { /* skip */ } }
  }
  const cc = config.client
  const client = new XrpcClient({ host: cc.host, userAgent: env.SCRAPER_USER_AGENT || cc.userAgent || DEFAULT_USER_AGENT, concurrency: cc.concurrency, minIntervalMs: cc.minIntervalMs, maxRequests: a['max-requests'] ? Number(a['max-requests']) : 400, maxRetries: cc.maxRetries, backoffBaseMs: cc.backoffBaseMs, timeoutMs: cc.timeoutMs, cacheDir: null, fetchImpl, ...(sleep ? { sleep } : {}) })
  const r = await checkSources({ sources: src, digest, digestPosts, client, config, now })
  const md = renderSourcesCheck(r, { file })
  if (a.out) await writeFile(a.out, md)
  // --json is one line, so a caller can take the last line of the output
  write(a.json ? JSON.stringify(r) + '\n' : md)
  return r.clean ? 0 : 1
}
