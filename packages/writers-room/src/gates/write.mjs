// Stage 3, write: segments/*/script.js and production/sources.json. Gates: the rundown matches the
// plan and the renderer accepts every script; sources.json lists only what the digest has; every
// guest line carries its source and verbatim lines match their post exactly; verbatim threads are
// performed in order; guest puppets are labelled; invented names are fiction; no opted-out
// account; the word count fits the budget.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { findPost, isOptedOut, normHandle, normUrl, parsePostUrl, postRefs } from '../digest.mjs'
import { castHandle, importFresh, isInvented } from '../context.mjs'
import { isExampleHost, jsText, namesIn, respellingMismatch, scriptLines, sourceTag, verbatimMismatch } from '../scan.mjs'
import { contentFiles, gate, list, planSegments, read, rundown, sourcesIndex } from './common.mjs'
import { optOutGate } from './shared.mjs'

export async function writeRundown(ctx) {
  const g = gate('write.rundown')
  const want = planSegments(ctx).map((s) => s.id)
  const have = rundown(ctx)
  if (!want.length) g.fail('plan.json has no segments; the pitch stage must be done first')
  else if (want.join(' ') !== have.join(' ')) g.fail(`episode.json rundown is [${have.join(', ')}] but plan.json plans [${want.join(', ')}]; make them agree (npm run segment:new -- ${ctx.id} <seg> adds a segment and appends it)`)
  if (!String(ctx.meta.title ?? '').trim() || /^week \d{4}-w\d{2}$/i.test(ctx.meta.title)) g.fail('episode.json: set "title" to the episode title from plan.json')
  if (!String(ctx.meta.description ?? '').trim()) g.fail('episode.json: "description" is empty: one or two sentences for the archive page and the link card')
  if (ctx.meta.status !== 'draft') g.fail(`episode.json: status must stay "draft" until the build stage (it is ${JSON.stringify(ctx.meta.status)})`)
  for (const seg of have) if (!existsSync(ctx.paths.segFile(seg, 'script.js'))) g.fail(`segments/${seg}/script.js is missing`)
  return g.done()
}

/** the renderer is the validator: render every rundown segment (cached clips make a re-run cheap) */
export async function writeRenders(ctx) {
  const g = gate('write.renders')
  const segs = rundown(ctx).filter((s) => existsSync(ctx.paths.segFile(s, 'script.js')))
  if (!segs.length) {
    g.fail('no script.js to render')
    return g.done()
  }
  const r = ctx.tools.npm('render', [ctx.id, ...segs])
  if (r.code !== 0) {
    const lines = r.out.split('\n').filter((l) => /✗|error|unknown|mismatch|expected|out of range/i.test(l)).slice(0, 20)
    g.fail(`npm run render -- ${ctx.id} ${segs.join(' ')} exited ${r.code}: ${lines.join(' | ') || 'see the log'}${r.log ? ` (log: ${ctx.paths.rel(r.log)})` : ''}`)
  }
  return g.done()
}

/** the cast id → handle of every guest, and which ids are guests */
function guestsOf(ctx) {
  const { cast, guests } = ctx.castInfo
  return { cast, guests }
}

export async function writeSources(ctx) {
  const g = gate('write.sources')
  const s = ctx.sources
  if (!s) {
    g.fail('production/sources.json is missing: list every real account, post and link the episode uses (format: playbooks/write.md)')
    return g.done()
  }
  if (s.format !== 'late-cluster-sources/1') g.fail('sources.json: "format" must be "late-cluster-sources/1"')
  if (s.week !== ctx.week) g.fail(`sources.json: "week" is ${JSON.stringify(s.week)}, this run is for ${ctx.week}`)
  const d = ctx.digest
  for (const [k, a] of (s.accounts ?? []).entries()) {
    const h = normHandle(a?.handle)
    if (!h) {
      g.fail(`sources.json accounts[${k}]: no "handle"`)
      continue
    }
    if (isExampleHost(h)) g.fail(`sources.json accounts[${k}]: ${h} is invented (.example); sources.json lists real accounts only`)
    else if (isOptedOut(d, h)) g.fail(`sources.json accounts[${k}]: an opted-out account (rule R11); remove it and everything it touches`)
    else if (!d.accounts.has(h)) g.fail(`sources.json accounts[${k}]: ${h} is not in the week's digest (rule R2: material comes from the digest)`)
    if (!['guest', 'quoted', 'credited', 'mentioned'].includes(a.role)) g.fail(`sources.json accounts[${k}] (${h}): "role" must be guest, quoted, credited or mentioned`)
    if (a.role === 'guest' && !a.cast) g.fail(`sources.json accounts[${k}] (${h}): a guest needs "cast", the cast id it is played as`)
  }
  const acc = new Set((s.accounts ?? []).map((a) => normHandle(a?.handle)))
  for (const [k, p] of (s.posts ?? []).entries()) {
    const post = findPost(d, p?.uri)
    if (!post) {
      g.fail(`sources.json posts[${k}]: ${p?.uri ?? '(no uri)'} is not in the week's digest`)
      continue
    }
    if (p.uri !== post.uri) g.fail(`sources.json posts[${k}]: give the at:// URI (${post.uri}), not the web URL`)
    if (normHandle(p.author) !== post.handle) g.fail(`sources.json posts[${k}]: "author" is ${JSON.stringify(p.author)}, but the digest says ${post.handle}`)
    if (!acc.has(post.handle)) g.fail(`sources.json posts[${k}]: its author ${post.handle} is not in "accounts"`)
    if (post.outOfBounds) g.fail(`sources.json posts[${k}]: ${post.uri} is in a story the digest marks out of bounds (rule R10)`)
    if (typeof p.text === 'string' && post.text !== null) {
      const why = verbatimMismatch(p.text, post.text)
      if (why) g.fail(`sources.json posts[${k}] (${post.uri}): "text" is not the post's text (rule R4): ${why}`)
    }
  }
  for (const [k, l] of (s.links ?? []).entries()) {
    const url = typeof l === 'string' ? l : l?.url
    if (!url) {
      g.fail(`sources.json links[${k}]: no "url"`)
      continue
    }
    const n = normUrl(url)
    const known = d.links.has(n) || [...d.posts.values()].some((p) => p.text && p.text.toLowerCase().includes(n))
    if (!known) g.fail(`sources.json links[${k}]: ${url} is not linked or named by any post in the digest`)
  }
  // every real guest in the rundown is a guest account in sources.json
  const { cast, guests } = guestsOf(ctx)
  for (const id of usedSpeakers(ctx)) {
    if (!guests.has(id) || isInvented(cast[id])) continue
    const h = castHandle(cast[id])
    const a = (s.accounts ?? []).find((x) => normHandle(x.handle) === h)
    if (!a) g.fail(`guest ${id} (${h}) speaks in the episode but is not in sources.json accounts`)
    else if (a.role !== 'guest') g.fail(`sources.json: ${h} speaks as ${id}, so its role is "guest"`)
  }
  return g.done()
}

/** cast ids with a line in any rundown script */
function usedSpeakers(ctx) {
  const ids = new Set()
  for (const seg of rundown(ctx)) {
    const src = read(ctx.paths.segFile(seg, 'script.js'))
    if (src) for (const l of scriptLines(src)) for (const w of l.who) ids.add(w)
  }
  return ids
}

const loose = (s) => String(s ?? '').toLowerCase().replace(/[\s.,!?;:'"“”‘’()…-]+/g, ' ').trim()

/**
 * Rule R3 and verbatim threads. Every line a guest speaks or sings carries a source comment:
 * `// verbatim: at://…` (its caption must equal the guest's own post exactly; see verbatimMismatch),
 * `// catchphrase` (the caption is one of the catchphrases sources.json lists for that account),
 * `// pastiche of "<format>"` (the format string appears in the guest's posts in the digest), or,
 * for an invented guest on .example only, `// invented`. In a segment the plan declares a verbatim
 * thread, the verbatim lines follow thread.posts in order and no house character speaks a real post.
 */
export async function writeGuestLines(ctx) {
  const g = gate('write.guest-lines')
  const { cast, guests } = guestsOf(ctx)
  const src = sourcesIndex(ctx)
  const d = ctx.digest
  const plan = new Map(planSegments(ctx).map((s) => [s.id, s]))
  const pastiche = []
  for (const seg of rundown(ctx)) {
    const file = `segments/${seg}/script.js`
    const text = read(ctx.paths.segFile(seg, 'script.js'))
    if (text === null) continue
    const thread = plan.get(seg)?.thread ?? (/^thread$/i.test(plan.get(seg)?.format ?? '') ? { posts: [] } : null)
    const performed = []
    for (const l of scriptLines(text)) {
      const at = `${file}:${l.line}${l.id ? ` (${l.id})` : ''}`
      const guestWho = l.who.filter((w) => guests.has(w))
      const tag = sourceTag(l.comments)
      if (!guestWho.length) {
        if (thread && (tag?.kind === 'verbatim' || tag?.kind === 'interview')) {
          const post = findPost(d, tag.ref)
          if (post && !isExampleHost(post.handle)) g.fail(`${at}: ${l.who.join(', ')} (house) speaks a real post in the verbatim thread; in a thread, a real post is performed by its author's puppet only`)
        }
        continue
      }
      if (!l.literal || l.text === null) {
        g.fail(`${at}: ${guestWho.join(', ')} has a line whose text is not a plain string literal; write guest lines as literal strings so their source can be checked`)
        continue
      }
      for (const who of guestWho) {
        const invented = isInvented(cast[who])
        if (!tag) {
          g.fail(`${at}: ${who} says "${l.text.slice(0, 50)}" with no source comment (rule R3). Tag it // verbatim: at://…, // interview: at://…, // catchphrase or // pastiche of "<format>"${invented ? ', or // invented (this guest is fictional)' : ''}`)
          continue
        }
        if (tag.kind === 'invented') {
          if (!invented) g.fail(`${at}: ${who} plays the real account ${castHandle(cast[who])}; "// invented" is only for fictional guests on .example (rule R3)`)
          continue
        }
        const h = castHandle(cast[who])
        if (tag.kind === 'verbatim' || tag.kind === 'interview') {
          const post = findPost(d, tag.ref)
          if (!post) {
            g.fail(`${at}: ${tag.ref} is not in the week's digest`)
            continue
          }
          if (post.handle !== h) g.fail(`${at}: ${who} (${h}) is given ${post.handle}'s post; a guest's words come from their own posts (rule R3)`)
          if (!src.posts.has(post.uri)) g.fail(`${at}: ${post.uri} is not listed in sources.json posts`)
          if (post.text === null) g.fail(`${at}: the digest has no text for ${post.uri}, so the line cannot be checked; use a post with text`)
          else {
            const why = verbatimMismatch(l.text, post.text)
            if (why) g.fail(`${at}: the caption is not ${post.uri} verbatim: ${why}. Respell for the engine in "as", never in "text"`)
            const res = respellingMismatch(l.text, l.as)
            if (res) g.fail(`${at}: ${res} (bible 07, the as respelling; format 9, rule 3)`)
          }
          performed.push(post.uri)
        } else if (tag.kind === 'catchphrase') {
          const phrases = (src.accounts.get(h)?.catchphrases ?? []).map(loose)
          if (!phrases.length) g.fail(`${at}: ${who}'s catchphrase is not backed: list it under "catchphrases" for ${h} in sources.json, with a post that shows it`)
          else if (!phrases.includes(loose(l.text))) g.fail(`${at}: "${l.text}" is not one of ${h}'s catchphrases in sources.json (${phrases.join(' / ')})`)
        } else if (tag.kind === 'pastiche') {
          pastiche.push(at)
          const fmt = tag.format.toLowerCase()
          const has = [...d.posts.values()].some((p) => p.handle === h && p.text && p.text.toLowerCase().includes(fmt))
          if (!has) g.fail(`${at}: no post by ${h} in the digest uses the format "${tag.format}"; pastiche must be of a format they actually use this week (rules R3, R14)`)
        }
      }
    }
    if (thread) {
      const want = (thread.posts ?? []).map((r) => findPost(d, r)?.uri ?? r)
      const got = performed.filter((u, k) => u !== performed[k - 1])
      if (want.join(' ') !== got.join(' ')) g.fail(`${file}: a verbatim thread: the verbatim guest lines perform [${list(got, 8) || 'nothing'}] but plan.json thread.posts is [${list(want, 8)}]; perform the listed posts, in order, each by its author's puppet (format 9, rules 1 and 4)`)
    }
  }
  const cap = ctx.config.freshness?.maxPastichePerEpisode ?? 2
  if (pastiche.length > cap) g.warn(`${pastiche.length} pastiche lines (${list(pastiche)}); rule R3 allows a line or two per episode, last and sparing. The reviewer looks at each`)
  else if (pastiche.length) g.warn(`pastiche lines for the reviewer: ${list(pastiche)}`)
  return g.done()
}

/** Rule R9: a puppet that stands for a real account is labelled `guest: true` (PUPPET · PARODY) */
export async function writeLabels(ctx) {
  const g = gate('write.labels')
  const { cast, episodeCast } = ctx.castInfo
  for (const [id, c] of Object.entries(episodeCast)) {
    if (c?.handle && !isInvented(c) && !c.guest) g.fail(`cast.js: ${id} has the real handle ${c.handle} but no guest: true; every puppet playing a real account shows PUPPET · PARODY (rule R9)`)
  }
  for (const a of ctx.sources?.accounts ?? []) {
    if (a?.role !== 'guest' || !a.cast) continue
    if (!cast[a.cast]) g.fail(`sources.json: guest ${a.handle} is played as ${a.cast}, which is not in the cast (packages/show/src/cast.js or cast.js)`)
    else if (!cast[a.cast].guest) g.fail(`cast: ${a.cast} plays ${a.handle} but has no guest: true (rule R9)`)
    else if (castHandle(cast[a.cast]) !== normHandle(a.handle)) g.fail(`cast: ${a.cast}'s handle is ${cast[a.cast].handle}, but sources.json says it plays ${a.handle}`)
  }
  return g.done()
}

const PLATFORM = new Set(['bsky.app', 'bsky.social', 'blueskyweb.xyz'])

/**
 * Rule R8 (and R4's "recorded in sources.json"): every handle, domain and URL in the episode's
 * strings and comments is a real one listed in sources.json, or invented on .example. Every at://
 * post in them is in sources.json. With ctx.network, every invented handle must fail to resolve.
 */
export async function writeNames(ctx) {
  const g = gate('write.names')
  const src = sourcesIndex(ctx)
  const linkHosts = new Set(src.links.map((l) => { try { return new URL(l.url).hostname.toLowerCase() } catch { return '' } }).filter(Boolean))
  const linkUrls = new Set(src.links.map((l) => normUrl(l.url)))
  const okName = (host) => isExampleHost(host) || src.accounts.has(host) || linkHosts.has(host) || PLATFORM.has(host)
  const invented = new Set()
  const seen = new Set()
  for (const f of contentFiles(ctx)) {
    const raw = readFileSync(join(ctx.paths.dir, f), 'utf8')
    const text = f.endsWith('.js') ? jsText(raw) : raw
    for (const ref of postRefs(text)) {
      const post = findPost(ctx.digest, ref)
      if (seen.has(`${f} ${ref}`)) continue
      seen.add(`${f} ${ref}`)
      if (!post) g.fail(`${f}: ${ref} is not in the week's digest (rules R2, R4)`)
      else if (!src.posts.has(post.uri)) g.fail(`${f}: ${ref} is not in sources.json posts (rule R4: every real post is recorded)`)
    }
    for (const n of namesIn(text)) {
      if (n.kind === 'url') {
        if (isExampleHost(n.host)) continue
        if (n.host === 'bsky.app') {
          const u = parsePostUrl(n.value)
          const prof = /bsky\.app\/profile\/([^/\s]+)/i.exec(n.value)?.[1]?.toLowerCase()
          if (u ? findPost(ctx.digest, n.value) && src.posts.has(findPost(ctx.digest, n.value).uri) : prof && src.accounts.has(prof)) continue
          if (!postRefs(n.value).length) g.fail(`${f}: ${n.value} is not an account in sources.json`)
          continue
        }
        if (linkUrls.has(normUrl(n.value)) || src.accounts.has(n.host) || linkHosts.has(n.host)) continue
        if (seen.has(`${f} ${n.value}`)) continue
        seen.add(`${f} ${n.value}`)
        g.fail(`${f}: the URL ${n.value} is neither in sources.json links nor on .example (rule R8: fiction must look like fiction)`)
      } else {
        if (isExampleHost(n.host)) {
          invented.add(n.host)
          continue
        }
        if (okName(n.host)) continue
        const key = `${f} ${n.value}`
        if (seen.has(key)) continue
        seen.add(key)
        g.fail(`${f}: ${n.kind === 'handle' ? '@' : ''}${n.value} is neither on .example nor in sources.json. If it is a real account or site, list it in sources.json; if it is invented, move it to .example, because a real top-level domain can be registered by anyone (rule R8)`)
      }
    }
  }
  if (ctx.network && invented.size) {
    for (const h of invented) {
      try {
        const r = await ctx.tools.fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(h)}`)
        if (r.ok) g.fail(`the invented handle ${h} resolves to a real account; pick another (rule R8)`)
      } catch (e) {
        g.warn(`could not check ${h} against the network (${e.message}); .example cannot be registered, so this is informational`)
      }
    }
  } else if (invented.size) g.warn(`invented handles not checked against the network (run with --network): ${list([...invented])}`)
  return g.done()
}

export const writeOptOut = (ctx) => optOutGate(ctx, 'write.optout')

/** spoken words in a script module: say lines, sung lines and sung music tracks (shouts excluded) */
export function spokenWords(script) {
  const words = (s) => (String(s ?? '').match(/[^\s—–-]+/g) ?? []).length
  let n = 0
  for (const b of script?.beats ?? []) {
    if (b.say) n += words(b.text)
    else if (b.sing) n += words(b.text ?? b.lyrics)
    else if (b.music) for (const t of b.music.tracks ?? []) if (t.lyrics) n += words(t.lyrics) * (Array.isArray(t.who) ? 1 : 1)
  }
  return n
}

/** the budget: words and the runtime they imply (bible 03, runtime arithmetic). Upper bounds only. */
export async function writeLength(ctx) {
  const g = gate('write.length')
  let total = 0
  const per = []
  for (const seg of rundown(ctx)) {
    const f = ctx.paths.segFile(seg, 'script.js')
    if (!existsSync(f)) continue
    try {
      const w = spokenWords((await importFresh(f)).default)
      per.push(`${seg} ${w}`)
      total += w
    } catch (e) {
      g.fail(`segments/${seg}/script.js does not load: ${e.message.split('\n')[0]}`)
    }
  }
  const { words, runtimeSeconds, wordsPerSecond } = ctx.limits
  if (words?.max && total > words.max) g.fail(`the scripts have ${total} spoken words (${per.join(', ')}); the ceiling is ${words.max} (bible 10, stage 3). Cut whatever is least interesting`)
  const fastest = total / (wordsPerSecond?.max ?? 2.2)
  if (runtimeSeconds?.max && fastest > runtimeSeconds.max) g.fail(`${total} words run at least ${Math.round(fastest)} s at ${wordsPerSecond?.max ?? 2.2} words a second, over the ${runtimeSeconds.max} s budget`)
  g.warn(`${total} spoken words (${per.join(', ')}), about ${Math.round(total / (wordsPerSecond?.max ?? 2.2))}–${Math.round(total / (wordsPerSecond?.min ?? 1.6))} s`)
  return g.done()
}

export const WRITE_GATES = [writeRundown, writeSources, writeGuestLines, writeLabels, writeNames, writeOptOut, writeLength, writeRenders]
