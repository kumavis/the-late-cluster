// The scope stage's coverage figures (docs/WORKFLOW.md, stage 1): taken from the scraper's own
// coverage block wherever it has one, so the two reports cannot disagree.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { normHandle } from './digest.mjs'
import { earlier } from './ledger.mjs'

const R = (ctx, abs) => ctx.paths.rel(abs)

/**
 * The coverage figures for the scope review. Every figure the scraper computes (digest.json
 * `coverage`) is taken from it, so this report and the scraper's coverage.md cannot disagree.
 * The tool computes only what the scraper does not: how many active members are neither seeds
 * nor featured before. For a digest without a coverage block it computes the shares itself, the
 * way the scraper does: over members' posts in the window, the top stories by lead author and the
 * builds by builder.
 */
export function coverage(ctx) {
  const d = ctx.digest
  const cv = d.raw?.coverage ?? null
  const pct = (x) => (typeof x === 'number' && Number.isFinite(x) ? Math.round(100 * x) : null)
  // people are counted by DID, as the scraper does: a handle can change inside the window
  const accounts = [...d.accounts.values()]
  const keysOf = (xs) => new Set(xs.flatMap((a) => [a.did, normHandle(a.handle)]).filter(Boolean))
  const isMember = keysOf(accounts.filter((a) => a.member || a.seed))
  const seedSet = keysOf(accounts.filter((a) => a.seed))
  const past = earlier(ctx.ledger, ctx.paths.number)
  const featuredSet = keysOf([...past.flatMap((e) => [...e.featured, ...e.guests]), ...accounts.filter((a) => a.featuredBefore)])
  const handleOf = new Map(accounts.filter((a) => a.did).map((a) => [a.did, a.handle]))
  const seeds = { has: (k) => seedSet.has(k) || seedSet.has(handleOf.get(k)) }
  const featured = { has: (k) => featuredSet.has(k) || featuredSet.has(handleOf.get(k)) }
  const keyOf = (x) => x?.authorDid ?? x?.did ?? normHandle(x?.handle) ?? null
  // members' posts in the window: what the scraper's concentration is measured over
  const start = Date.parse(d.window?.start ?? '')
  const end = Date.parse(d.window?.end ?? '')
  const inWindow = (p) => {
    const t = Date.parse(p.time ?? '')
    return !Number.isFinite(t) || ((!Number.isFinite(start) || t >= start) && (!Number.isFinite(end) || t < end))
  }
  const posts = [...d.posts.values()]
  const memberPosts = posts.filter((p) => keyOf(p) && (typeof p.member === 'boolean' ? p.member : isMember.has(keyOf(p)) || isMember.has(p.handle)) && inWindow(p))
  const byAuthor = new Map()
  for (const p of memberPosts) byAuthor.set(keyOf(p), (byAuthor.get(keyOf(p)) ?? 0) + 1)
  const ranked = [...byAuthor.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))

  const ours = () => {
    const top10 = ranked.slice(0, 10)
    const top = new Set(top10.map(([h]) => h))
    const share = (xs, f) => (xs.length ? xs.filter(f).length / xs.length : null)
    const leads = (d.raw?.stories ?? []).slice(0, 30).map((s) => keyOf(s.posts?.[0])).filter(Boolean)
    const builders = (d.sections?.built ?? []).map((b) => keyOf(b.builtBy))
    const three = (f) => ({ posts: share(memberPosts, (p) => f(keyOf(p))), topStories: share(leads, f), built: share(builders, f) })
    return {
      memberPosts: memberPosts.length,
      topStoriesConsidered: leads.length,
      builds: builders.length,
      top10: { ...three((h) => top.has(h)), accounts: top10.map(([k, n]) => ({ handle: handleOf.get(k) ?? k, posts: n })) },
      seeds: three((h) => seeds.has(h)),
      featuredBefore: three((h) => featured.has(h)),
    }
  }
  const conc = cv?.concentration ?? ours()
  const scraperReport = d.dir && existsSync(join(d.dir, 'coverage.md')) ? R(ctx, join(d.dir, 'coverage.md')) : null
  return {
    window: d.window,
    source: cv ? 'scraper' : 'tool',
    scraperReport,
    posts: posts.length,
    accounts: new Set(posts.map((p) => p.handle).filter(Boolean)).size,
    members: cv?.size?.members ?? isMember.size,
    activeMembers: cv?.size?.active ?? byAuthor.size,
    memberPosts: conc.memberPosts,
    top10: conc.top10.accounts,
    shareTop10: pct(conc.top10.posts),
    shareSeeds: pct(conc.seeds.posts),
    shareFeaturedBefore: pct(conc.featuredBefore.posts),
    topStories: conc.topStoriesConsidered,
    storyLeadsTop10: pct(conc.top10.topStories),
    storyLeadsSeeds: pct(conc.seeds.topStories),
    storyLeadsFeaturedBefore: pct(conc.featuredBefore.topStories),
    builds: conc.builds,
    buildsTop10: pct(conc.top10.built),
    buildsSeeds: pct(conc.seeds.built),
    buildsFeaturedBefore: pct(conc.featuredBefore.built),
    // the one figure the scraper does not compute
    newVoices: ranked.filter(([h]) => !featured.has(h) && !seeds.has(h)).length,
    games: (d.sections?.games ?? []).map((g) => ({ id: g.id, results: (g.results ?? []).length })),
    worries: cv?.worries ?? null,
    excluded: cv?.excluded ?? d.raw?.stats?.excluded ?? null,
  }
}

export function coverageMd(c) {
  const v = (x) => (x === null || x === undefined ? 'n/a' : `${x} %`)
  const from = c.source === 'scraper' ? `The shares are the scraper's own (${c.scraperReport ?? 'digest.json coverage'}); the count of active members neither seeds nor featured is the tool's.` : 'The digest has no coverage block, so the tool computed these shares itself, over members\' posts in the window.'
  const L = [`# Coverage of the window`, '', `Window: ${c.window?.label ?? '?'} (${c.window?.kind ?? '?'}). ${c.members} members, ${c.activeMembers} of whom posted in the window: ${c.memberPosts} member posts. The digest holds ${c.posts} posts from ${c.accounts} accounts, members and the people they talked with.`, '', from, '']
  L.push('| measure | value |', '|---|---|')
  L.push(`| share of member posts from the ten most active members | ${v(c.shareTop10)} |`, `| share of member posts from the seeds | ${v(c.shareSeeds)} |`, `| share of member posts from accounts the show has featured before | ${v(c.shareFeaturedBefore)} |`)
  if (c.topStories) L.push(`| top ${c.topStories} stories led by the ten most active | ${v(c.storyLeadsTop10)} |`, `| top ${c.topStories} stories led by a seed | ${v(c.storyLeadsSeeds)} |`, `| top ${c.topStories} stories led by accounts featured before | ${v(c.storyLeadsFeaturedBefore)} |`)
  if (c.builds) L.push(`| builds (${c.builds}) by the ten most active | ${v(c.buildsTop10)} |`, `| builds by a seed | ${v(c.buildsSeeds)} |`, `| builds by accounts featured before | ${v(c.buildsFeaturedBefore)} |`)
  L.push(`| active members neither seeds nor featured before | ${c.newVoices} of ${c.activeMembers} |`, '')
  L.push('The ten most active members: ' + c.top10.map((t) => `@${t.handle} (${t.posts})`).join(', '), '')
  if (c.games.length) L.push('Community games in the digest: ' + c.games.map((g) => `${g.id} (${g.results} results)`).join(', '), '')
  if (c.worries) L.push("The scraper's worries:", '', ...(c.worries.length ? c.worries.map((w) => `- ${w}`) : ['- none crossed a threshold']), '')
  if (c.excluded) L.push('Excluded, in counts: `' + JSON.stringify(c.excluded) + '`', '')
  L.push('Reach and concentration are measured from what the scrape collected; they are signs, not a census of the community.')
  return L.join('\n') + '\n'
}

