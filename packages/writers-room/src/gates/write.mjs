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
import { r3Tags } from '../bible.mjs'
import { pronounGateLines, pronounProblems } from '../pronouns.mjs'

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
    g.fail('production/sources.json is missing: list every real account, post and link the episode uses (format: packages/writers-room/playbooks/sources.md)')
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
    // people are tracked by DID, because handles change (the ledger's tracker)
    const acc = d.accounts.get(h)
    if (!a.did) g.fail(`sources.json accounts[${k}] (${h}): add "did"${acc?.did ? ` (the digest has ${acc.did})` : ''}`)
    else if (acc?.did && a.did !== acc.did) g.fail(`sources.json accounts[${k}] (${h}): "did" is ${a.did}, the digest has ${acc.did}`)
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
    if (post.imageOnly && !String(post.text ?? '').trim()) {
      if (p.text) g.fail(`sources.json posts[${k}] (${post.uri}) is an image-only post: leave "text" out and describe it in "alt"`)
    } else if (typeof p.text === 'string' && post.text !== null) {
      const why = verbatimMismatch(p.text, post.text)
      if (why) g.fail(`sources.json posts[${k}] (${post.uri}): "text" is not the post's text (rule R4): ${why}`)
    }
    // what a card shows: the real display name and the counts (trial findings 14, 25)
    if (!('displayName' in p)) g.fail(`sources.json posts[${k}] (${post.uri}): add "displayName"${post.displayName != null ? ` (the digest has ${JSON.stringify(post.displayName)})` : ''}`)
    else if (post.displayName != null && p.displayName !== post.displayName) g.fail(`sources.json posts[${k}] (${post.uri}): "displayName" is ${JSON.stringify(p.displayName)}, the digest has ${JSON.stringify(post.displayName)}`)
    for (const c of ['likes', 'reposts', 'replies']) {
      if (typeof p[c] !== 'number') g.fail(`sources.json posts[${k}] (${post.uri}): add "${c}"${post.counts ? ` (the digest has ${post.counts[c]})` : ''}`)
      else if (post.counts && p[c] !== post.counts[c]) g.warn(`sources.json posts[${k}] (${post.uri}): "${c}" is ${p[c]}, the digest has ${post.counts[c]}; a card shows the number as of the digest, and says so if it changed`)
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

/** an account's catchphrases in sources.json: [{ phrase, posts }] ("claim." alone has no posts) */
export const catchphrasesOf = (account) => (account?.catchphrases ?? []).map((c) => (typeof c === 'string' ? { phrase: c, posts: [] } : { phrase: String(c?.phrase ?? ''), posts: Array.isArray(c?.posts) ? c.posts : [] }))

const loose = (s) => String(s ?? '').toLowerCase().replace(/[\s.,!?;:'"“”‘’()…-]+/g, ' ').trim()

/**
 * Rule R3 and verbatim threads. Every line a guest speaks or sings carries a source comment, and a
 * puppet that stands for a real account may use only the kinds in config `guestLines.realAccount`
 * (today: verbatim, interview, catchphrase; pastiche of a real account is not a permitted source):
 *   `// verbatim: at://…` / `// interview: at://…`: the caption equals the guest's own post exactly
 *     (see verbatimMismatch), and `as` only respells. Outside a declared thread, the line records
 *     its original occasion (see occasion()): a line may be performed in an exchange the show
 *     stages when that exchange recreates how it was said, which only the reviewer can judge, so
 *     the gate makes sure the reviewer has the original to compare with.
 *   `// catchphrase`: one of the catchphrases sources.json lists for the account, with at least one
 *     of the author's own posts that uses it (or `· context: at://…` on the tag).
 * An invented guest on .example may use `// invented` (or any kind in `guestLines.invented`). In a
 * segment the plan declares a verbatim thread, the verbatim lines follow `thread.posts` in order and
 * no house character speaks a real post.
 */
export async function writeGuestLines(ctx) {
  const g = gate('write.guest-lines')
  const plan = new Map(planSegments(ctx).map((s) => [s.id, s]))
  for (const w of r3Drift(ctx)) g.warn(w)
  for (const seg of rundown(ctx)) {
    const text = read(ctx.paths.segFile(seg, 'script.js'))
    if (text === null) continue
    const thread = plan.get(seg)?.thread ?? (/^thread$/i.test(plan.get(seg)?.format ?? '') ? { posts: [] } : null)
    const r = checkGuestLines(ctx, { seg, file: `segments/${seg}/script.js`, text, thread })
    r.failures.forEach((f) => g.fail(f))
    r.warnings.forEach((w) => g.warn(w))
  }
  return g.done()
}

/** a warning when the config's allowed kinds differ from the kinds R3 names (`invented` is fiction's, not a real account's) */
export function r3Drift(ctx) {
  const rules = ctx.config.guestLines
  const drift = r3Tags(ctx.bibleDir)
  if (drift.error) return []
  const named = drift.tags.filter((k) => !['invented', 'pastiche'].includes(k))
  const missing = rules.realAccount.filter((k) => !named.includes(k))
  const extra = named.filter((k) => !rules.realAccount.includes(k))
  return missing.length || extra.length ? [`config guestLines.realAccount [${rules.realAccount.join(', ')}] differs from the kinds R3 names in 09-real-people.md [${named.join(', ')}]; update packages/writers-room/config/pipeline.json to follow the bible`] : []
}

/**
 * The guest-line rules for one script (a segment, or a draft at stage 6). `ctx.sources` is the
 * sources.json the lines are checked against (a draft passes its own). Returns { failures, warnings }.
 */
export function checkGuestLines(ctx, { seg, file, text, thread = null }) {
  const failures = []
  const warnings = []
  const fail = (m) => failures.push(m)
  const { cast, guests } = guestsOf(ctx)
  const src = sourcesIndex(ctx)
  const d = ctx.digest
  const rules = ctx.config.guestLines
  const tags = (kinds) => kinds.map((k) => (k === 'verbatim' || k === 'interview' ? `// ${k}: at://… · context: at://…` : k === 'catchphrase' ? '// catchphrase: "<phrase>" · context: at://…' : k === 'pastiche' ? '// pastiche of "<format>"' : `// ${k}`)).join(', ')
  const performed = []
  const all = scriptLines(text)
  for (const l of all) {
    const at = `${file}:${l.line}${l.id ? ` (${l.id})` : ''}`
    const guestWho = l.who.filter((w) => guests.has(w))
    const tag = sourceTag(l.comments)
    if (!guestWho.length) {
      if (thread && (tag?.kind === 'verbatim' || tag?.kind === 'interview')) {
        const post = findPost(d, tag.ref)
        if (post && !isExampleHost(post.handle)) fail(`${at}: ${l.who.join(', ')} (house) speaks a real post in the verbatim thread; in a thread, a real post is performed by its author's puppet only`)
      }
      continue
    }
    if (!l.literal || l.text === null) {
      fail(`${at}: ${guestWho.join(', ')} has a line whose text is not a plain string literal; write guest lines as literal strings so their source can be checked`)
      continue
    }
    for (const who of guestWho) {
      const invented = isInvented(cast[who])
      const allowed = invented ? rules.invented : rules.realAccount
      if (!tag) {
        fail(`${at}: ${who} says "${l.text.slice(0, 50)}" with no source comment (rule R3). Tag it ${tags(allowed)}`)
        continue
      }
      if (!allowed.includes(tag.kind)) {
        if (tag.kind === 'invented') fail(`${at}: ${who} plays the real account ${castHandle(cast[who])}; "// invented" is only for fictional guests on .example (rule R3)`)
        else if (tag.kind === 'pastiche') fail(`${at}: ${who} plays the real account ${castHandle(cast[who])}, and pastiche is not a permitted source for a real account: a puppet says only what the person posted (rule R3). Use their post verbatim or a catchphrase, and let the show's own characters do the joking around it`)
        else fail(`${at}: "// ${tag.kind}" is not a permitted source for ${who} (allowed: ${tags(allowed)})`)
        continue
      }
      if (invented) continue
      const h = castHandle(cast[who])
      for (const f of occasionChecks(ctx, { seg, line: l, all, tag, handle: h })) fail(`${at}: ${f}`)
      if (tag.kind === 'verbatim' || tag.kind === 'interview') {
        const post = findPost(d, tag.ref)
        if (!post) {
          fail(`${at}: ${tag.ref} is not in the window's digest`)
          continue
        }
        if (post.handle !== h) fail(`${at}: ${who} (${h}) is given ${post.handle}'s post; a guest's words come from their own posts (rule R3)`)
        if (!src.posts.get(post.uri)) fail(`${at}: ${post.uri} is not listed in sources.json posts`)
        if (post.text === null) fail(`${at}: the digest has no text for ${post.uri}, so the line cannot be checked; use a post with text`)
        else {
          const why = verbatimMismatch(l.text, post.text)
          if (why) fail(`${at}: the caption is not ${post.uri} verbatim: ${why}. Respell for the engine in "as", never in "text"`)
          const res = respellingMismatch(l.text, l.as)
          if (res) fail(`${at}: ${res} (the as respelling only respells)`)
        }
        performed.push(post.uri)
      } else if (tag.kind === 'catchphrase') {
        const listed = catchphrasesOf(src.accounts.get(h))
        const entry = listed.find((c) => loose(c.phrase) === loose(l.text))
        if (!listed.length) fail(`${at}: ${who}'s catchphrase is not backed: list it under "catchphrases" for ${h} in sources.json as { "phrase", "posts": ["at://…"] }, citing their own posts that use it`)
        else if (!entry) fail(`${at}: "${l.text}" is not one of ${h}'s catchphrases in sources.json (${listed.map((c) => c.phrase).join(' / ')})`)
        else {
          // the owner's rule: catchphrases are fine if used the way they use them. A gate can only
          // check that the usage is cited; whether this use matches it is the reviewer's call.
          const uses = [...new Set([...(entry.posts ?? []), ...(tag.context ? [tag.context] : [])])]
          const cited = uses.map((u) => findPost(d, u))
          if (!cited.length) fail(`${at}: the catchphrase "${entry.phrase}" cites none of ${h}'s posts; add "posts": ["at://…"] with at least one of their own posts that uses it, so the reviewer can compare the usage`)
          for (const [k, post] of cited.entries()) {
            const u = uses[k]
            if (!post) fail(`${at}: the catchphrase "${entry.phrase}" cites ${u}, which is not in the window's digest`)
            else if (post.handle !== h) fail(`${at}: the catchphrase "${entry.phrase}" cites ${u}, a post by ${post.handle}, not by ${h}`)
            else if (post.text !== null && !loose(post.text).includes(loose(entry.phrase))) fail(`${at}: the catchphrase "${entry.phrase}" cites ${u}, which does not use it`)
          }
        }
      }
    }
  }
  if (thread) {
    const want = (thread.posts ?? []).map((r) => findPost(d, r)?.uri ?? r)
    const got = performed.filter((u, k) => u !== performed[k - 1])
    if (want.join(' ') !== got.join(' ')) fail(`${file}: a verbatim thread: the verbatim guest lines perform [${list(got, 8) || 'nothing'}] but thread.posts is [${list(want, 8)}]; perform the listed posts, in order, each by its author's puppet`)
  }
  return { failures, warnings }
}

/**
 * Bible 09, R3 and R4: every line a real account's puppet speaks carries its occasion, and
 * sources.json records it for the reviewer's occasion test.
 *
 * On the tag: `· context: at://…`, required. For verbatim it is the post's parent according to the
 * digest (or, for a top-level post, the post's own URI); for interview, the show's question; for a
 * catchphrase, a post where the author uses it (that check is in writeGuestLines).
 *
 * In sources.json "lines": one record per such line,
 *   { "segment", "line": "<line id>", "kind", "post": "at://…" (verbatim, interview), "phrase" (catchphrase),
 *     "context": "at://…", "contextText": "<the context post's exact text>",
 *     "situation": "<one line, for a top-level post>", "setup": { "line": "<line id>", "who": "larry", "text": "…" } }
 * The setup is the staged prompt the line answers: a line of the same script, before it, named by its
 * id, whose speaker and text the record repeats (trial finding 57: not just the previous line).
 * Whether the setup recreates the occasion is the reviewer's judgement (A3), not a gate.
 */
export function occasionChecks(ctx, { seg, line, all = [], tag, handle }) {
  const out = []
  const d = ctx.digest
  const ex = `· context: at://…`
  if (!tag.context) {
    const hint = tag.kind === 'verbatim' ? 'the post it replied to, or its own URI if it was a top-level post' : tag.kind === 'interview' ? "the show's question" : 'a post where the author uses it this way'
    out.push(`the ${tag.kind} tag has no occasion: add \`${ex}\` (${hint}) to it (bible 09, R3)`)
    return out
  }
  const ctxPost = findPost(d, tag.context)
  if (!ctxPost) out.push(`the context ${tag.context} is not in the week's digest`)
  if (tag.kind === 'verbatim') {
    const post = findPost(d, tag.ref)
    if (post && ctxPost) {
      if (post.parent && ctxPost.uri !== post.parent) out.push(`the context is ${ctxPost.uri}, but according to the digest ${post.uri} replied to ${post.parent}`)
      if (!post.parent && ctxPost.uri !== post.uri) out.push(`the context is ${ctxPost.uri}, but the digest shows ${post.uri} as a top-level post: its context is its own URI, and sources.json records the situation it was said in`)
    }
  }
  const recs = (ctx.sources?.lines ?? []).filter((r) => r && r.segment === seg && (line.id ? r.line === line.id : true) && (tag.kind === 'catchphrase' ? true : findPost(d, r.post)?.uri === findPost(d, tag.ref)?.uri))
  if (!line.id) out.push(`give the line an id, so sources.json "lines" can record its occasion`)
  if (!recs.length) {
    out.push(`sources.json "lines" has no record for this line: { "segment": "${seg}", "line": "${line.id ?? '<id>'}", "kind": "${tag.kind}", ${tag.kind === 'catchphrase' ? '"phrase": "…"' : `"post": "${tag.ref}"`}, "context": "${tag.context}", ${ctxPost && tag.kind === 'verbatim' && ctxPost.uri === findPost(d, tag.ref)?.uri ? '"situation": "<one line on the situation it was said in>"' : '"contextText": "<the context post\'s exact text>"'}, "setup": { "line": "<the staged prompt's id>", "who": "…", "text": "…" } } (bible 09, R3)`)
    return out
  }
  const r = recs[0]
  if (r.kind !== tag.kind) out.push(`sources.json lines record says kind ${JSON.stringify(r.kind)}, the tag says ${tag.kind}`)
  if (findPost(d, r.context)?.uri !== (ctxPost?.uri ?? tag.context)) out.push(`sources.json lines record gives the context ${r.context}; the tag gives ${tag.context}`)
  const topLevel = tag.kind === 'verbatim' && ctxPost && ctxPost.uri === findPost(d, tag.ref)?.uri
  if (topLevel) {
    if (!String(r.situation ?? '').trim()) out.push(`a top-level post: sources.json lines record needs "situation", one line on the situation it was said in`)
  } else if (typeof r.contextText !== 'string' || !r.contextText.trim()) out.push(`sources.json lines record needs "contextText", the exact text of ${tag.context}`)
  else if (ctxPost?.text != null && verbatimMismatch(r.contextText, ctxPost.text)) out.push(`sources.json lines record "contextText" is not the text of ${tag.context}: ${verbatimMismatch(r.contextText, ctxPost.text)}`)
  const idx = all.indexOf(line)
  const staged = r.setup?.line ? all.find((x) => x.id === r.setup.line) : null
  if (!r.setup?.line) out.push(`sources.json lines record "setup" must name the staged prompt this line answers: { "line": "<its id>", "who": "…", "text": "…" }`)
  else if (!staged) out.push(`sources.json lines record "setup.line" is ${JSON.stringify(r.setup.line)}, which is not a line id in ${seg}`)
  else if (all.indexOf(staged) >= idx) out.push(`the staged prompt ${r.setup.line} comes after the line it is meant to set up`)
  else if (r.setup.text !== staged.text || (r.setup.who && !staged.who.includes(r.setup.who))) out.push(`sources.json lines record "setup" must repeat the staged prompt exactly: { "line": "${staged.id}", "who": "${staged.who.join('+')}", "text": ${JSON.stringify(staged.text)} }`)
  return out
}

/** every line performed by a real account's puppet, with the line before it and its original occasion (for the reviewer) */
export function realLines(ctx) {
  const { cast, guests } = ctx.castInfo
  const src = sourcesIndex(ctx)
  const d = ctx.digest
  const out = []
  for (const seg of rundown(ctx)) {
    const text = read(ctx.paths.segFile(seg, 'script.js'))
    if (text === null) continue
    const lines = scriptLines(text)
    lines.forEach((l, k) => {
      const tag = sourceTag(l.comments)
      if (!tag || !['verbatim', 'interview', 'catchphrase'].includes(tag.kind)) return
      for (const who of l.who.filter((w) => guests.has(w) && !isInvented(cast[w]))) {
        const h = castHandle(cast[who])
        const rec0 = (ctx.sources?.lines ?? []).find((r) => r?.segment === seg && r.line === l.id)
        const staged = rec0?.setup?.line ? lines.find((x) => x.id === rec0.setup.line) : lines[k - 1]
        const block = { at: `segments/${seg}/script.js:${l.line}${l.id ? ` (${l.id})` : ''}`, kind: tag.kind, who, handle: h, text: l.text, setup: staged ? { who: staged.who.join('+'), text: staged.text } : null, original: [] }
        if (tag.kind === 'catchphrase') {
          const entry = catchphrasesOf(src.accounts.get(h)).find((c) => loose(c.phrase) === loose(l.text))
          for (const u of [...new Set([...(entry?.posts ?? []), ...(tag.context ? [tag.context] : [])])]) block.original.push({ label: 'their own use', post: findPost(d, u) ?? { uri: u, text: null } })
        } else {
          const post = findPost(d, tag.ref)
          block.source = post
          const rec = (ctx.sources?.lines ?? []).find((r) => r?.segment === seg && (!l.id || r.line === l.id))
          const parent = post?.parent ? findPost(d, post.parent) ?? { uri: post.parent, text: rec?.contextText ?? null } : null
          if (tag.kind === 'interview') block.original.push({ label: "the show's question", post: findPost(d, tag.context ?? '') ?? (tag.context ? { uri: tag.context, text: rec?.contextText ?? null } : null) })
          else if (parent) block.original.push({ label: 'it replied to', post: parent })
          else block.original.push({ label: 'a top-level post', post: null, situation: rec?.situation ?? null })
        }
        out.push(block)
      }
    })
  }
  return out
}

/** Rule R9: a puppet that stands for a real account is labelled `guest: true` (PUPPET · PARODY) */
/** stated pronouns (README "Pronouns"): blocking at assembly; the draft stage runs the same check as a warning */
export async function writePronouns(ctx) {
  const g = gate('write.pronouns')
  for (const seg of rundown(ctx)) {
    const text = read(ctx.paths.segFile(seg, 'script.js'))
    if (text === null) continue
    const mod = read(ctx.paths.segFile(seg, 'index.js'))
    const r = pronounGateLines(pronounProblems(ctx, { seg, file: `segments/${seg}/script.js`, text, screen: mod === null ? [] : [{ file: `segments/${seg}/index.js`, text: mod }] }))
    r.failures.forEach((f) => g.fail(f))
    r.warnings.forEach((w) => g.warn(w))
  }
  return g.done()
}

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
      if (post && isExampleHost(post.handle)) continue // an invented account's post: fiction, not a source
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
