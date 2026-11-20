// The one place that knows the scraper's files and commands (packages/scraper), so a rename there
// is one edit here. What the pipeline uses:
//
//   data/weeks/<week>/skeletons/index.json and <id>.json   a card skeleton per story: the posts with
//                                                           exact text, people, reach, replies and quotes,
//                                                           alt text, media addresses and a sensitivity
//                                                           mark per post
//   data/weeks/<week>/lanes/<lane>.json and .md             the digest sliced for one research lane
//   npm run media -- --dir <digest dir> --uri <at://…>      fetch a post's pictures and video to look at
//   npm run sources -- check <sources.json> [--dir d] [--out f.md] [--json]
//                                                           consent and live sources: exit 0 clean, 1 needs a person
//   npm run lookup -- --uri|--url|--text|… <value> [--fields a,b] (compact)
//
// Until the scraper writes skeletons, they are derived here from the digest's stories, with the same
// shape, so the stages can run on any digest.
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { findPost } from './digest.mjs'

const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'))

export const LANES = ['made', 'talk', 'games', 'voices', 'interview']

/**
 * Why a post is refused, or null: the scraper's keyword mark (`sensitive`) or its consent reasons
 * (`consent`: asks not to be quoted, redacted, replies to an excluded account). A marked post is
 * refused; the rest of its story stays usable.
 */
export function markOf(p) {
  if (Array.isArray(p?.consent) && p.consent.length) return `consent: ${p.consent.join('; ')}`
  const s = p?.sensitive ?? p?.sensitivity ?? p?.mark ?? null
  if (!s) return p?.redacted ? 'redacted' : null
  return typeof s === 'string' ? s : `sensitive${s.topics ? `: ${[].concat(s.topics).join(', ')}` : ''}`
}

/** a skeleton's post, normalised: exact text and everything a card needs, never retyped */
function skeletonPost(d, p) {
  const ref = typeof p === 'string' ? { uri: p } : p
  const g = findPost(d, ref.uri) ?? {}
  const au = ref.author ?? {}
  const acc = d.accounts.get(ref.handle ?? au.handle ?? g.handle) ?? {}
  return {
    uri: ref.uri,
    url: ref.url ?? g.url ?? null,
    handle: ref.handle ?? au.handle ?? g.handle ?? null,
    did: au.did ?? ref.did ?? ref.authorDid ?? g.did ?? null,
    displayName: au.displayName ?? ref.displayName ?? g.displayName ?? null,
    text: typeof ref.text === 'string' ? ref.text : g.text ?? '',
    followers: au.followers ?? ref.followers ?? ref.authorFollowers ?? acc.followers ?? null,
    featured: { previous: au.featuredPrevious ?? ref.featuredPrevious ?? acc.featuredPrevious ?? null, earlier: au.featuredEarlier ?? ref.featuredEarlier ?? acc.featuredEarlier ?? null, times: au.timesFeatured ?? ref.timesFeatured ?? acc.timesFeatured ?? 0 },
    bioReview: au.bioReview ?? null,
    reach: ref.reach?.score ?? (typeof ref.reach === 'number' ? ref.reach : g.reach?.score ?? null),
    replyTo: ref.replyTo ?? ref.reply?.parent ?? g.parent ?? null,
    quotes: ref.quoted ?? ref.quotes ?? ref.quote ?? null,
    alt: ref.alt ?? ref.imageAlts ?? (ref.media ?? []).map((m) => m.alt).filter(Boolean),
    media: ref.media ?? [],
    sensitive: markOf(ref) ?? markOf(g) ?? (g.outOfBounds ? 'out of bounds (consent)' : null),
  }
}

/**
 * The week's skeletons: { source: 'scraper' | 'digest', list: [{ id, lane, title, reach, posts }] }.
 * From the scraper's skeletons/ when present, else one per digest story.
 */
const CACHE = new Map()
export function loadSkeletons(digestDir, d) {
  const dir = join(digestDir, 'skeletons')
  const index = join(dir, 'index.json')
  if (existsSync(index)) {
    // the index is read once per digest; a skeleton's posts only when something asks for them (a
    // real week has thousands of skeletons)
    const key = `${index}:${statSync(index).mtimeMs}`
    if (CACHE.has(key)) return CACHE.get(key)
    const j = readJson(index)
    const rows = Array.isArray(j) ? j : j.skeletons ?? []
    const list = rows.map((r) => {
      let posts = null
      const f = join(digestDir, r.file ?? join('skeletons', `${r.id}.json`))
      const sk = { id: r.id, lane: r.lane ?? r.lanes?.[0] ?? null, lanes: r.lanes ?? null, title: r.headline ?? r.title ?? null, reach: r.reach?.score ?? r.reach ?? null, excluded: r.excluded === true }
      Object.defineProperty(sk, 'posts', { enumerable: true, get: () => (posts ??= existsSync(f) ? (readJson(f).posts ?? []).map((p) => skeletonPost(d, p)) : (r.posts && Array.isArray(r.posts) ? r.posts.map((p) => skeletonPost(d, p)) : [])) })
      return sk
    })
    const out = { source: 'scraper', list }
    CACHE.set(key, out)
    return out
  }
  const stories = d.raw?.stories ?? []
  return { source: 'digest', list: stories.filter((s) => s?.id && Array.isArray(s.posts)).map((s) => ({ id: s.id, lane: s.lane ?? null, lanes: null, title: s.title ?? null, reach: null, posts: s.posts.map((p) => skeletonPost(d, p)) })) }
}

/** the files of one lane's slice of the digest, those that exist (paths relative to digestDir) */
export function laneFiles(digestDir, lane) {
  return ['json', 'md'].map((x) => join(digestDir, 'lanes', `${lane}.${x}`)).filter((f) => existsSync(f))
}

/** the skeleton ids in a lane, from the lane file when the scraper wrote one, else by the skeleton's own lane */
export function laneSkeletons(digestDir, skeletons, lane) {
  const f = join(digestDir, 'lanes', `${lane}.json`)
  if (existsSync(f)) {
    const j = readJson(f)
    const ids = (Array.isArray(j) ? j : j.skeletons ?? j.stories ?? []).map((x) => (typeof x === 'string' ? x : x?.id)).filter(Boolean)
    if (ids.length) return ids
  }
  return skeletons.list.filter((s) => s.lane === lane || s.lanes?.includes(lane)).map((s) => s.id)
}

export const mediaCommand = (dir, uri = '<at://…>') => `npm run media -- --dir ${dir} --uri ${uri}`
export const lookupCommand = (dir) => `npm run lookup -- --dir ${dir} --uri|--url|--text|--author|--story|--thread <value> [--fields text,handle,did,followers]`
export const sourcesCommand = (file, dir, out) => `npm run sources -- check ${file} --dir ${dir} --out ${out}`

/** whether the repository has a root command yet (the scraper's and the studio's new ones land separately) */
export function hasScript(root, name) {
  try {
    return Boolean(readJson(join(root, 'package.json')).scripts?.[name])
  } catch {
    return false
  }
}
export const canRun = (ctx, name) => (ctx.tools.hasScript ? ctx.tools.hasScript(name) : hasScript(ctx.root, name))

/**
 * Check sources (consent and that cited posts still exist unchanged) with the scraper's command.
 * → { code, out, json, missing }. code 0 clean, 1 needs a person.
 */
export function checkSources(ctx, { file, out }) {
  if (!canRun(ctx, 'sources')) return { code: null, missing: true, out: 'npm run sources is not in package.json yet' }
  const r = ctx.tools.npm('sources', ['check', file, '--dir', ctx.paths.rel(ctx.digestDir), '--out', out, '--json'])
  let json = null
  try {
    json = JSON.parse(r.stdout.trim().split('\n').filter(Boolean).pop() ?? 'null')
  } catch {}
  return { code: r.code, out: r.out, json, missing: false }
}
