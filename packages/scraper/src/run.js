// The scrape command: window -> collect -> analyze -> write.

import { mkdir, readFile, writeFile, rm, rename } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { parseArgs } from 'node:util'
import { loadConfig, PACKAGE_DIR, DEFAULT_CONFIG_DIR } from './config.js'
import { Consent } from './consent.js'
import { XrpcClient, DEFAULT_USER_AGENT, authFromEnv } from './http.js'
import { collect, completeThreads } from './collect.js'
import { analyze } from './digest.js'
import { renderMarkdown } from './render-md.js'
import { resolveWindow, baselineWeekLabels, rangeWindow } from './window.js'
import { loadLedger, previousEpisode, featuredLookup, frequentlyFeatured } from './ledger.js'
import { findPreviousRun, readRun, chooseSeeds } from './seeds.js'
import { buildCoverage, renderCoverage } from './coverage.js'

export const REPO_ROOT = resolve(PACKAGE_DIR, '..', '..')

export const USAGE = `Usage: npm run scrape -- [--week 2026-W47 | --days 7 | --since 2026-11-13 [--until <date-time>]] [--out <dir>]

  --week <YYYY-Www>   an ISO week in UTC (default: the most recent complete week)
  --days <n>          a rolling window of n days ending now
  --since <date>      from a date (00:00 UTC) or an ISO date-time, to --until or now
  --until <date-time> end of a --since window (default: now); needs --since
  --out <dir>         output directory (default: data/weeks/<week>/ at the repo root;
                      for --days and --since, data/ranges/<start>_<end>/)
  --config <dir>      config directory (default: packages/scraper/config)
  --max-requests <n>  override the request budget in config/client.json
  --no-cache          ignore and do not write the response cache
  --ledger <dir>      the show's ledger (default: docs/ledger); sets the default window
                      and marks who the show has featured
  --seeds <a,b,...>   seed accounts for this run instead of the drifting choice
  --previous <dir>    the previous run to learn seeds and changes from (default: found)
  --membership-only   compute the cluster and write membership.json, nothing else
  --cache-dir <dir>   response cache location (share only between runs of the same window)
  --prune-cache       delete this week's response cache after a successful run
                      (config/client.json pruneCacheAfterRun does the same every run)
  --quiet             only print the final summary

Environment:
  SCRAPER_USER_AGENT  override the User-Agent (keep it generic)
`

export function parseCli(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      week: { type: 'string' },
      days: { type: 'string' },
      since: { type: 'string' },
      until: { type: 'string' },
      out: { type: 'string' },
      config: { type: 'string' },
      'max-requests': { type: 'string' },
      'no-cache': { type: 'boolean', default: false },
      'prune-cache': { type: 'boolean', default: false },
      ledger: { type: 'string' },
      seeds: { type: 'string' },
      'membership-only': { type: 'boolean', default: false },
      'cache-dir': { type: 'string' },
      previous: { type: 'string' },
      now: { type: 'string' },
      quiet: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: true,
  })
  return values
}

async function readPriorPosts(dir, labels) {
  const out = []
  const used = []
  for (const label of labels) {
    const f = join(dir, label, 'posts.jsonl')
    if (!existsSync(f)) continue
    const lines = (await readFile(f, 'utf8')).split('\n').filter(Boolean)
    for (const l of lines) {
      try { out.push(JSON.parse(l)) } catch { /* skip a damaged line */ }
    }
    used.push(label)
  }
  return { posts: out, weeks: used }
}

/** The show's Bluesky DID from the repo's show.config.json, or null. */
export function readShowDid(root = REPO_ROOT) {
  try {
    return JSON.parse(readFileSync(join(root, 'show.config.json'), 'utf8')).bluesky?.did ?? null
  } catch {
    return null
  }
}

/** Where a run writes when --out is not given. */
export function defaultOut(window, root = REPO_ROOT) {
  return window.kind === 'week' ? join(root, 'data', 'weeks', window.label) : join(root, 'data', 'ranges', window.label)
}

/** Delete a week's response cache (`<out>/.cache`). Outputs are left alone. */
export async function pruneCache(out) {
  await rm(join(out, '.cache'), { recursive: true, force: true })
}

/**
 * Write every output beside its final name first, then rename them all, so a reader of the
 * folder sees the old files or the new ones and never a run half written.
 */
export async function writeOutputs(out, files) {
  const tmp = Object.keys(files).map((name) => [join(out, `.${name}.tmp`), join(out, name)])
  for (const [i, [t]] of tmp.entries()) await writeFile(t, Object.values(files)[i])
  for (const [t, f] of tmp) await rename(t, f)
}

/** Identical warnings once each, with a count. */
export function collapse(list) {
  const counts = new Map()
  for (const w of list) counts.set(w, (counts.get(w) ?? 0) + 1)
  return [...counts].map(([w, n]) => (n > 1 ? `${w} (${n} times)` : w))
}

export async function run(argv = process.argv.slice(2), env = process.env) {
  const args = parseCli(argv)
  if (args.help) { process.stdout.write(USAGE); return null }
  const log = args.quiet ? () => {} : (m) => process.stderr.write(m + '\n')
  const t0 = Date.now()
  const now = args.now ? Date.parse(args.now) : Date.now()
  const config = loadConfig(args.config ? resolve(args.config) : DEFAULT_CONFIG_DIR)
  // The ledger: who the show has featured, and when the previous episode aired.
  const ledgerDir = args.ledger ? resolve(args.ledger) : config.cluster.ledger?.dir ? resolve(REPO_ROOT, config.cluster.ledger.dir) : null
  const ledger = loadLedger(ledgerDir, { repoRoot: REPO_ROOT })
  const prevEpisode = previousEpisode(ledger, now)
  // Default window: since the previous episode aired, when the ledger knows; otherwise the
  // most recent complete ISO week.
  const explicit = args.week || args.days || args.since
  const window = explicit || !prevEpisode
    ? resolveWindow({ week: args.week, days: args.days, since: args.since, until: args.until, now })
    : rangeWindow(new Date(prevEpisode.airedMs).toISOString(), args.until, now)
  const windowSource = explicit ? 'command line' : prevEpisode ? `since ${prevEpisode.id} aired (${prevEpisode.date})` : 'most recent complete week'
  const out = resolve(args.out ?? defaultOut(window))
  await mkdir(out, { recursive: true })
  log(`window ${window.label}: ${new Date(window.start).toISOString()} to ${new Date(window.end).toISOString()}`)
  log(`output ${out}`)
  for (const pr of ledger.problems) log(`ledger: ${pr}`)

  // Seeds: drift from the previous run's most connected members, or bootstrap on a cold start.
  const dataRoots = [join(REPO_ROOT, 'data', 'weeks'), join(REPO_ROOT, 'data', 'ranges'), dirname(out)]
  const prevRun = args.previous ? { dir: resolve(args.previous), label: null } : findPreviousRun([...new Set(dataRoots)], window, out)
  let previous = null
  if (prevRun) {
    try {
      const r = readRun(prevRun.dir)
      previous = { dir: prevRun.dir, label: r.digest.window?.label ?? prevRun.label, members: r.digest.members ?? [], posts: r.posts, digest: r.digest }
    } catch (err) { log(`previous run unreadable: ${err.message}`) }
  }
  // The show's account (its follows are seeds): show.config.json at the repo root, unless
  // config/cluster.json overrides it.
  config.cluster.showAccount = { ...(config.cluster.showAccount ?? {}), did: config.cluster.showAccount?.did ?? readShowDid() }
  const mode = config.cluster.seedSelection?.mode ?? 'show-follows'
  const seedPlan = args.seeds
    ? { mode: 'command line', seeds: args.seeds.split(',').map((h) => h.trim().replace(/^@/, '')).map((h) => (h.startsWith('did:') ? { did: h, reason: 'given on the command line' } : { handle: h, reason: 'given on the command line' })), previousSeeds: [], ranking: [] }
    : mode === 'drift'
      ? chooseSeeds({ bootstrap: config.cluster.seeds, cfg: config.cluster.seedSelection, previous })
      : { mode, seeds: config.cluster.seeds, previousSeeds: [], ranking: [] }
  if (args.seeds) config.cluster.seedSelection = { ...(config.cluster.seedSelection ?? {}), mode: 'fixed' }
  config.cluster.seeds = seedPlan.seeds
  config.cluster.seedReserves = seedPlan.ranking.map((r) => ({ handle: r.handle, did: r.did, reason: `new (replacing an ineligible seed): ${r.rank}th most connected in ${previous?.label}` })).filter((r) => !seedPlan.seeds.some((s) => s.did === r.did))
  log(`seeds (${seedPlan.mode}): ${seedPlan.seeds.map((s) => s.label ?? s.handle ?? s.did).join(' ')}${mode === 'show-follows' && !args.seeds ? ` + the follows of ${config.cluster.showAccount.did ?? '(no show account configured)'}` : ''}`)

  const cc = config.client
  const client = new XrpcClient({
    host: cc.host,
    userAgent: env.SCRAPER_USER_AGENT || cc.userAgent || DEFAULT_USER_AGENT,
    concurrency: cc.concurrency,
    minIntervalMs: cc.minIntervalMs,
    maxRequests: args['max-requests'] ? Number(args['max-requests']) : cc.maxRequests,
    maxRetries: cc.maxRetries,
    backoffBaseMs: cc.backoffBaseMs,
    timeoutMs: cc.timeoutMs,
    cacheDir: args['no-cache'] ? null : args['cache-dir'] ? resolve(args['cache-dir']) : join(out, '.cache', 'http'),
    auth: authFromEnv(env, log),
    log,
  })
  const consent = new Consent({ optOut: config.optOut.accounts, blockedLabels: config.scoring.blockedLabels, selfDeclaredPatterns: config.safety.selfDeclaredOptOut.patterns, naming: config.safety.excludedMentions })

  const c = await collect({ client, config, window, consent, log, membershipOnly: args['membership-only'] })
  if (c.membershipOnly) {
    const m = {
      format: 'late-cluster-membership/1', window: { label: window.label, start: new Date(window.start).toISOString(), end: new Date(window.end).toISOString() },
      seeds: config.cluster.seeds.map((s) => ({ did: s.did, handle: s.handle, reason: s.reason })),
      seedsSkipped: config.cluster.seedsSkipped ?? [],
      showFollows: config.cluster.showFollows ?? null,
      selection: { considered: c.selection.considered, qualified: c.selection.qualified, cut: c.selection.cut },
      members: c.members.map((x) => ({ did: x.did, handle: x.handle, rule: x.rule, score: x.score, signals: x.signals })),
      cut: c.selection.cutRows.map((x) => ({ did: x.did, handle: x.handle, rule: x.rule, score: x.score })),
      requests: client.stats.requests,
    }
    await writeFile(join(out, 'membership.json'), JSON.stringify(m, null, 2) + '\n')
    process.stdout.write(`membership: ${m.members.length} members, ${m.selection.qualified} qualified, ${m.selection.cut} cut; ${client.stats.requests} requests (${client.stats.cacheHits} cached) -> ${join(out, 'membership.json')}\n`)
    return { membership: m, out }
  }
  // Earlier weekly runs' posts.jsonl that overlap the baseline add to it (analyze keeps only
  // posts inside the baseline period, so overlapping weeks are safe).
  const dataDir = window.kind === 'week' && args.out ? dirname(out) : join(REPO_ROOT, 'data', 'weeks')
  const priorLabels = baselineWeekLabels(window, config.cluster.collection.baselineWeeks).filter((l) => resolve(dataDir, l) !== out)
  const prior = await readPriorPosts(dataDir, priorLabels)

  const analyzeArgs = () => ({
    posts: c.store.posts.values(),
    memberDids: c.memberDids,
    members: c.members.map((m) => ({ did: m.did, handle: m.handle, displayName: m.displayName, seed: m.seed, followers: m.followersCount ?? null, small: Number.isFinite(m.followersCount) && m.followersCount < config.safety.smallAccountFollowers, rule: m.rule })),
    reposts: c.store.reposts,
    window,
    baselineStart: c.baselineStart,
    baselineWeeks: config.cluster.collection.baselineWeeks,
    priorPosts: prior.posts,
    consent,
    scoring: config.scoring,
    profiles: c.profiles,
    featured: featuredLookup(ledger, window.end),
    safety: config.safety,
    show: config.show,
    games: config.games,
    completeThreads: c.completeThreads,
    gaps: c.store.gaps,
  })
  // Analyse, fetch the candidate performable threads whole, then analyse again so the
  // threads offered are complete. Consent counters are restored so nothing counts twice.
  const counters = structuredClone(consent.stats)
  let d = analyze(analyzeArgs())
  const roots = d.sections.performableThreads.candidates ?? []
  if (roots.length) {
    await completeThreads({ client, store: c.store, consent, roots, complete: c.completeThreads, warnings: c.warnings, profiles: c.profiles })
    consent.stats = structuredClone(counters)
    d = analyze(analyzeArgs())
  }
  // Opted-out accounts can never be members, but be certain none reach the file.
  d.members = d.members.filter((m) => !consent.excludedDid(m.did))

  const ruleCounts = {}
  for (const m of c.members) ruleCounts[m.rule] = (ruleCounts[m.rule] ?? 0) + 1
  const digest = {
    format: 'late-cluster-digest/1',
    window: { ...d.window, source: windowSource, previousEpisode: prevEpisode ? { id: prevEpisode.id, aired: prevEpisode.date } : null },
    run: {
      generatedAt: new Date().toISOString(),
      runtimeSeconds: Math.round((Date.now() - t0) / 100) / 10,
      requests: client.stats.requests,
      cacheHits: client.stats.cacheHits,
      retries: client.stats.retries,
      rateLimited: client.stats.rateLimited,
      errors: client.stats.errors,
      byEndpoint: client.stats.byEndpoint,
      callsByEndpoint: client.stats.callsByEndpoint,
      budget: client.maxRequests,
      budgetExhausted: client.budgetHit,
      search: c.searchWorked,
      pagesPerMember: c.pagesPerMember,
      threadsExpanded: c.threadsExpanded,
      priorWeeksRead: prior.weeks,
      warnings: collapse(c.warnings),
    },
    settings: { storiesInMarkdown: config.scoring.digest?.storiesInMarkdown ?? 15, postsPerStory: config.scoring.digest?.postsPerStory ?? 4, builds: config.scoring.digest?.builds ?? 12, aboutShowPosts: config.scoring.digest?.aboutShowPosts ?? 20 },
    stats: {
      cluster: { members: c.members.length, seeds: c.seeds.length, seedMode: seedPlan.mode, seedList: config.cluster.seeds.map((x) => ({ did: x.did, handle: x.handle, reason: x.reason })), seedsSkipped: config.cluster.seedsSkipped ?? [], showAccount: config.cluster.showAccount?.did ?? null, showFollows: config.cluster.showFollows ?? null, previousRun: previous?.label ?? null, candidates: c.selection.considered, qualified: c.selection.qualified, cutByCap: c.selection.cut, seedsOptedOut: c.selection.skippedSeeds, byRule: ruleCounts },
      posts: { window: d.counts.windowPosts, baseline: d.counts.baselinePosts, context: d.counts.contextPosts, priorFiles: d.counts.priorPostsUsed, members: d.overview.memberPosts },
      coverage: c.coverage,
      profiles: { checked: c.profiles.size, missing: Object.values(d.authors).filter((a) => a.followers == null).length, smallThreshold: config.safety.smallAccountFollowers },
      stories: d.stories.length,
      excluded: consent.stats,
    },
    overview: d.overview,
    sections: d.sections,
    stories: d.stories.slice(0, config.scoring.digest?.storiesInJson ?? 60),
    appendices: d.appendices,
    members: d.members,
    authors: d.authors,
    ledger: { dir: ledger.dir, found: ledger.found, episodes: ledger.episodes.map((e) => e.id), problems: ledger.problems },
  }
  digest.coverage = buildCoverage({ collected: c, digest: { ...d, sections: d.sections }, config, seedPlan, previous, run: digest.run, consentStats: consent.stats, ledger, frequent: frequentlyFeatured(ledger, { min: 1, atMs: window.end }).slice(0, 15) })

  // The last line of defence: nothing written may still hold an excluded account's DID,
  // handle or profile link, whichever section it reached (README "Naming an excluded account").
  const scrubbed = consent.scrub(digest) + consent.scrub(d.posts)
  if (scrubbed) digest.run.warnings.push(`consent: ${scrubbed} strings still named an excluded account after filtering and were redacted at the end; a rule missed them, so report it`)

  await writeOutputs(out, {
    'posts.jsonl': d.posts.map((p) => JSON.stringify(p)).join('\n') + (d.posts.length ? '\n' : ''),
    'digest.json': JSON.stringify(digest, null, 2) + '\n',
    'digest.md': renderMarkdown(digest),
    'coverage.md': renderCoverage(digest.coverage, digest.window),
  })

  // The cache is only removed once every output is written.
  let pruned = false
  if (args['prune-cache'] || cc.pruneCacheAfterRun) {
    await pruneCache(out)
    pruned = true
  }

  const summary = `${window.label}: ${digest.stats.cluster.members} accounts, ${d.counts.windowPosts} posts, ${d.stories.length} stories; ${client.stats.requests} requests (${client.stats.cacheHits} cached) in ${digest.run.runtimeSeconds}s -> ${out}${pruned ? ' (cache pruned)' : ''}`
  process.stdout.write(summary + '\n')
  return { digest, out }
}
