// Stage 2, pitch: production/pitch.md (prose, the bible's template) and production/plan.json (the
// same plan, machine-readable; schema in playbooks/pitch.md, a superset of the example in bible 03,
// "Fixed and fresh"). Gates: the template's sections; every cited post exists in the week's digest;
// the plan is well formed and under the runtime ceiling; nothing out of bounds or opted out; the
// song's genre differs from the previous episode's. Every other freshness check is a warning the
// plan may answer with a reason.
import { findPost, isOptedOut, normHandle, postRefs } from '../digest.mjs'
import { SEG_RE } from '../repo.mjs'
import { isInvented } from '../context.mjs'
import { pitchTemplateSections } from '../bible.mjs'
import { gate, list, read } from './common.mjs'
import { optOutGate } from './shared.mjs'

/** the `## ` sections of a Markdown file: Map<lower-cased heading, body> */
export function sections(md) {
  const out = new Map()
  let cur = null
  let fence = false
  for (const line of md.split('\n')) {
    if (/^```/.test(line)) fence = !fence
    const m = !fence && /^##\s+(.+?)\s*$/.exec(line)
    if (m) {
      cur = m[1].toLowerCase()
      out.set(cur, '')
    } else if (cur !== null) out.set(cur, out.get(cur) + line + '\n')
  }
  return out
}
const findSection = (secs, name) => {
  const n = name.toLowerCase()
  for (const [k, v] of secs) if (k === n || k.startsWith(n)) return v
  return null
}
const PLACEHOLDER = /<(?!https?:|at:)[a-z][a-z0-9 ()/,.'’+–-]{2,}>/i

export async function pitchDocument(ctx) {
  const g = gate('pitch.document')
  const md = read(ctx.paths.pitch)
  if (md === null) {
    g.fail(`production/pitch.md is missing: write it from the template in docs/bible/10-process.md (stage 2)`)
    return g.done()
  }
  const head = /^#\s+Episode\s+(\d{1,3})\s+pitch:\s*(.+?)\s*\(week\s+(\d{4}-W\d{2})\)\s*$/im.exec(md)
  if (!head) g.fail(`pitch.md: the first heading must read "# Episode ${String(ctx.paths.number).padStart(3, '0')} pitch: <title>  (week ${ctx.week})"`)
  else {
    if (Number(head[1]) !== ctx.paths.number) g.fail(`pitch.md: the heading says episode ${head[1]}, but this is episode ${String(ctx.paths.number).padStart(3, '0')}`)
    if (head[3] !== ctx.week) g.fail(`pitch.md: the heading says week ${head[3]}, but this run is for ${ctx.week}`)
  }
  const tpl = pitchTemplateSections(ctx.bibleDir)
  if (tpl.error) g.warn(`${tpl.error}; checking the fallback section list in config/pipeline.json instead`)
  const want = tpl.sections ?? ctx.config.pitchSections.fallback
  const secs = sections(md)
  for (const name of want) {
    const body = findSection(secs, name)
    if (body === null) g.fail(`pitch.md: no "## ${name}" section (template: docs/bible/10-process.md, stage 2). If it does not apply this week, keep the heading and say why in a line`)
    else if (!body.trim()) g.fail(`pitch.md: "## ${name}" is empty; if there is nothing this week, say so in a line`)
    else if (PLACEHOLDER.test(body)) g.fail(`pitch.md: "## ${name}" still has a template placeholder (${PLACEHOLDER.exec(body)[0]}); replace it`)
  }
  // stories: each numbered item cites a post (send back if "a story without a source URI")
  const stories = findSection(secs, 'Stories (ranked)')
  if (stories) {
    const items = stories.split('\n').filter((l) => /^\s*\d+\.\s/.test(l))
    items.forEach((l, k) => {
      if (!postRefs(l).length) g.fail(`pitch.md: story ${k + 1} cites no post; give its at:// URI or bsky.app URL from the digest ("${l.trim().slice(0, 60)}")`)
    })
    const { min, max } = ctx.limits.stories ?? {}
    if (items.length && ((min && items.length < min) || (max && items.length > max))) g.warn(`pitch.md ranks ${items.length} stories (a usual week has ${min} to ${max}); fine if that is what was interesting`)
  }
  // every real guest has a real-people check (send back if "a guest without a real-people check")
  const guests = findSection(secs, 'Guests') ?? ''
  for (const gst of ctx.plan?.guests ?? []) {
    if (isInvented({ handle: gst.handle })) continue
    const h = normHandle(gst.handle)
    const block = guests.split(/\n(?=\S)/).find((l) => l.toLowerCase().includes(h))
    if (!block) g.fail(`pitch.md: "## Guests" does not name ${gst.handle}, a guest in plan.json`)
    else if (!/real-people check/i.test(block)) g.fail(`pitch.md: the guest entry for ${gst.handle} has no "real-people check: R1–R15 ..." (rule R14: re-check every guest every week)`)
  }
  for (const r of [...new Set(postRefs(md))].filter((r) => !findPost(ctx.digest, r))) g.fail(`pitch.md cites ${r}, which is not in the week's digest (${ctx.digestDir}); cite only posts from the digest (rule R2)`)
  return g.done()
}

export const isSong = (s) => /^(song|the-number|number)$/i.test(String(s?.format ?? '').trim()) || Boolean(s?.genre && s?.theme)
export const songOf = (s) => ({ genre: s?.genre ?? s?.song?.genre, theme: s?.theme ?? s?.song?.theme })
const isThread = (s) => /^thread$/i.test(String(s?.format ?? '').trim()) || Boolean(s?.thread)
export const questionText = (p) => (typeof p?.question === 'string' ? p.question : p?.question?.text) ?? ''

export async function pitchPlan(ctx) {
  const g = gate('pitch.plan')
  const p = ctx.plan
  if (!p) {
    g.fail('production/plan.json is missing: write it in the format in packages/writers-room/playbooks/pitch.md')
    return g.done()
  }
  if (p.format !== 'late-cluster-plan/1') g.fail(`plan.json: "format" must be "late-cluster-plan/1"`)
  if (p.id !== ctx.id) g.fail(`plan.json: "id" is ${JSON.stringify(p.id)}, this episode is ${ctx.id}`)
  if (p.week !== ctx.week) g.fail(`plan.json: "week" is ${JSON.stringify(p.week)}, this run is for ${ctx.week}`)
  if (!String(p.title ?? '').trim()) g.fail('plan.json: "title" is empty (it becomes the episode title)')
  if (!questionText(p).trim()) g.fail('plan.json: "question" is empty: the question of the week (bible 01)')
  const segs = Array.isArray(p.segments) ? p.segments : []
  if (!segs.length) g.fail('plan.json: "segments" is empty: an episode needs at least one segment')
  const ids = new Set()
  let total = 0
  let lastBuilt = null
  for (const [k, s] of segs.entries()) {
    const where = `plan.json segments[${k}]${s?.id ? ` (${s.id})` : ''}`
    if (!s || typeof s.id !== 'string' || !SEG_RE.test(s.id) || ['title', 'end'].includes(s.id)) {
      g.fail(`${where}: "id" must be a segment id such as cold-open (lower case, digits, dashes)`)
      continue
    }
    if (ids.has(s.id)) g.fail(`${where}: the id ${s.id} is used twice`)
    ids.add(s.id)
    if (!String(s.format ?? '').trim()) g.fail(`${where}: "format" is empty: name the format it uses (bible 04)`)
    if (!(Number(s.seconds) > 0)) g.fail(`${where}: "seconds" must be the planned length in seconds`)
    else total += Number(s.seconds)
    if (s.built !== undefined) {
      const ok = Array.isArray(s.built) && s.built.length === 2 && s.built.every((n) => Number.isInteger(n) && n >= 0) && s.built[1] >= s.built[0]
      if (!ok) g.fail(`${where}: "built" must be [from, to], whole numbers, to >= from`)
      else {
        if (lastBuilt !== null && s.built[0] !== lastBuilt) g.fail(`${where}: the BUILT chain breaks: it starts at ${s.built[0]}, the segment before ended at ${lastBuilt} (bible 03, the BUILT counter)`)
        lastBuilt = s.built[1]
      }
    }
    if (isSong(s)) {
      const { genre, theme } = songOf(s)
      if (!String(genre ?? '').trim()) g.fail(`${where}: a song needs "genre" (bible 07, the genre shelf)`)
      if (!String(theme ?? '').trim()) g.fail(`${where}: a song needs "theme", from the week`)
    }
    if (isThread(s)) threadChecks(ctx, g, where, s.thread)
  }
  if (segs.length && segs[0].built && segs[0].built[0] !== 0) g.fail('plan.json: the BUILT counter starts at 0 every episode (bible 03)')
  const max = ctx.limits.runtimeSeconds?.max
  if (max && total > max) g.fail(`plan.json: the segments add up to ${total} s, over the ${max} s ceiling (the owner's: under ten minutes; there is no minimum); cut what is least interesting`)
  for (const [k, gst] of (p.guests ?? []).entries()) {
    const where = `plan.json guests[${k}]`
    if (!gst?.cast) g.fail(`${where}: "cast" must be the cast id the guest is played as`)
    if (!gst?.handle) g.fail(`${where}: "handle" is missing`)
    if (gst?.segment && !ids.has(gst.segment)) g.fail(`${where}: "segment" ${gst.segment} is not in the rundown`)
    if (isInvented({ handle: gst?.handle })) continue
    const h = normHandle(gst.handle)
    if (isOptedOut(ctx.digest, h)) g.fail(`${where}: ${gst.handle} is opted out (rule R11): remove them from the episode entirely`)
    else if (!ctx.digest.accounts.has(h)) g.fail(`${where}: ${gst.handle} is not in the week's digest; a guest's persona comes from this week's posts (rule R14)`)
  }
  if (p.cut !== undefined && !(Array.isArray(p.cut) && p.cut.every((c) => c?.what && c?.why))) g.fail('plan.json: "cut" must be a list of { "what", "why" } (bible 03: record every cut with its reason)')
  for (const ref of new Set(postRefs(JSON.stringify(p)))) {
    const post = findPost(ctx.digest, ref)
    if (!post) g.fail(`plan.json cites ${ref}, which is not in the week's digest`)
    else if (post.outOfBounds) g.fail(`plan.json uses ${ref}, from a story the digest marks out of bounds (rule R10); drop it`)
    else if (isOptedOut(ctx.digest, post.handle)) g.fail(`plan.json uses ${ref} by an opted-out account (rule R11)`)
  }
  return g.done()
}

/** a verbatim thread (format 9): every post in the digest with its text, in thread order */
function threadChecks(ctx, g, where, thread) {
  const posts = Array.isArray(thread?.posts) ? thread.posts : []
  if (!posts.length) return g.fail(`${where}: a thread segment needs "thread": { "posts": [...] }, the post URIs performed, in thread order`)
  const found = posts.map((r) => findPost(ctx.digest, r))
  posts.forEach((r, k) => !found[k] && g.fail(`${where}: thread post ${r} is not in the digest`))
  if (found.some((x) => !x)) return
  if (found.some((x) => x.text === null)) g.fail(`${where}: the digest has no text for ${list(found.filter((x) => x.text === null).map((x) => x.uri))}; a verbatim thread needs exact text`)
  const uris = found.map((x) => x.uri)
  if (new Set(uris).size !== uris.length) g.fail(`${where}: a post is listed twice in thread.posts`)
  const candidate = ctx.digest.threads.find((t) => uris.every((u) => t.posts.includes(u)))
  if (candidate) {
    const idx = uris.map((u) => candidate.posts.indexOf(u))
    if (idx.some((v, k) => k && v < idx[k - 1])) g.fail(`${where}: thread.posts are not in the thread's order (the digest's thread rooted at ${candidate.root}); cuts are whole posts, the order never changes (format 9, rule 1)`)
    return
  }
  const root = thread.root ?? found[0].root ?? found[0].uri
  for (const [k, x] of found.entries()) {
    if (k && x.root && root && x.root !== root && x.uri !== root) g.fail(`${where}: ${x.uri} belongs to another thread (root ${x.root})`)
    const pi = x.parent ? uris.indexOf(x.parent) : -1
    if (pi > k) g.fail(`${where}: ${x.uri} replies to ${x.parent}, which is listed after it`)
    if (k && x.time && found[k - 1].time && x.time < found[k - 1].time && pi < 0) g.fail(`${where}: ${x.uri} was posted before the post listed ahead of it; list the thread in order`)
  }
}

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/**
 * Fixed and fresh (bible 03). The gate: the song's genre differs from the previous episode's.
 * Warnings (each answerable in plan.json "overrides": { "<code>": "reason" }, or a guest's
 * "repeatReason"): genre within the window, middle format from last week, guest two weeks
 * running, reused runner / descriptor / thread / Ask post, a repeated "Built it." shape, the same
 * sincere kind as last week, too many callbacks.
 */
export async function pitchFreshness(ctx) {
  const g = gate('pitch.freshness')
  const p = ctx.plan
  if (!p) {
    g.skip('no plan.json')
    return g.done()
  }
  const f = ctx.config.freshness
  const over = p.overrides ?? {}
  const warn = (code, msg) => (over[code] ? g.warn(`${msg} [answered: ${over[code]}]`) : g.warn(`${msg} [unanswered: add "overrides": { "${code}": "<reason>" } to plan.json, or change it]`))
  const past = ctx.history.filter((h) => h.plan).sort((a, b) => b.number - a.number)
  const missing = ctx.history.filter((h) => !h.plan).map((h) => h.id)
  if (missing.length) g.warn(`no plan.json or rotation log row for ${list(missing)}; freshness is checked against the rest`)
  const prev = past[0]
  const songs = (p.segments ?? []).filter(isSong)
  for (const s of songs) {
    const genre = norm(songOf(s).genre)
    if (!genre) continue
    if (prev && (prev.plan.segments ?? []).filter(isSong).some((x) => norm(songOf(x).genre) === genre)) g.fail(`plan.json: the song's genre "${songOf(s).genre}" is the previous episode's (${prev.id}); the owner's rule is a new genre every episode (bible 03). Pick another from the shelf in bible 07`)
    for (const h of past.slice(1, f.genreWarnWindow)) if ((h.plan.segments ?? []).filter(isSong).some((x) => norm(songOf(x).genre) === genre)) warn('genre-window', `the song's genre "${songOf(s).genre}" was used by ${h.id}, within ${f.genreWarnWindow} episodes`)
  }
  if (prev) {
    const standing = new Set(f.standingFormats.map(norm))
    const lastMiddle = new Set((prev.plan.segments ?? []).filter((s) => !isSong(s)).map((s) => norm(s.format)).filter((x) => x && !standing.has(x)))
    for (const s of p.segments ?? []) if (!isSong(s) && !standing.has(norm(s.format)) && lastMiddle.has(norm(s.format))) warn('middle-format', `the middle format "${s.format}" (${s.id}) was also in ${prev.id}`)
    const lastGuests = new Set((prev.plan.guests ?? []).flatMap((x) => [normHandle(x.handle), norm(x.name), x.cast]).filter(Boolean))
    for (const x of p.guests ?? []) {
      if (!(lastGuests.has(normHandle(x.handle)) || lastGuests.has(x.cast) || lastGuests.has(norm(x.cast)))) continue
      if (x.repeatReason) g.warn(`guest ${x.handle ?? x.cast} was also in ${prev.id} [answered: ${x.repeatReason}]`)
      else g.warn(`guest ${x.handle ?? x.cast} was also in ${prev.id} [unanswered: give the guest a "repeatReason", e.g. the week's story is about them]`)
    }
    const kind = norm(p.sincere?.kind)
    if (kind && kind === norm(prev.plan.sincere?.kind)) warn('sincere-kind', `the sincere beat is "${p.sincere.kind}" again, as in ${prev.id}`)
  }
  const reused = (field, label, code) => {
    const v = norm(p[field])
    if (!v) return
    for (const h of past) if (norm(h.plan[field]) === v) return warn(code, `the ${label} "${p[field]}" was used in ${h.id}`)
  }
  reused('runner', 'episode runner', 'runner')
  reused('descriptor', 'Sibyl descriptor', 'descriptor')
  reused('ask', 'Ask post', 'ask')
  const threadPosts = new Set((p.segments ?? []).flatMap((s) => s.thread?.posts ?? []))
  for (const h of past) for (const s of h.plan.segments ?? []) for (const u of s.thread?.posts ?? []) if (threadPosts.has(u)) warn('thread', `thread post ${u} was performed in ${h.id}`)
  const shapes = (p.builtShapes ?? []).map(norm)
  const dup = shapes.filter((x, k) => shapes.indexOf(x) !== k)
  if (dup.length) warn('built-shapes', `"Built it." shape repeated within the episode: ${[...new Set(dup)].join(', ')}`)
  if ((p.callbacks ?? []).length > f.maxCallbacks) warn('callbacks', `${p.callbacks.length} cross-episode callbacks (more than ${f.maxCallbacks} makes the show insular)`)
  return g.done()
}

export const pitchOptOut = (ctx) => optOutGate(ctx, 'pitch.optout')

export const PITCH_GATES = [pitchDocument, pitchPlan, pitchFreshness, pitchOptOut]
