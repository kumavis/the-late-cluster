// The scrape command: window -> collect -> analyze -> write.

import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { parseArgs } from 'node:util'
import { loadConfig, PACKAGE_DIR, DEFAULT_CONFIG_DIR } from './config.js'
import { Consent } from './consent.js'
import { XrpcClient, DEFAULT_USER_AGENT, authFromEnv } from './http.js'
import { collect, completeThreads } from './collect.js'
import { analyze } from './digest.js'
import { renderMarkdown } from './render-md.js'
import { resolveWindow, previousWeekLabels } from './window.js'

export const REPO_ROOT = resolve(PACKAGE_DIR, '..', '..')

export const USAGE = `Usage: npm run scrape -- [--week 2026-W47 | --days 7] [--out <dir>]

  --week <YYYY-Www>   an ISO week in UTC (default: the most recent complete week)
  --days <n>          a rolling window of n days ending now
  --out <dir>         output directory (default: data/weeks/<week>/ at the repo root)
  --config <dir>      config directory (default: packages/scraper/config)
  --max-requests <n>  override the request budget in config/client.json
  --no-cache          ignore and do not write the response cache
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
      out: { type: 'string' },
      config: { type: 'string' },
      'max-requests': { type: 'string' },
      'no-cache': { type: 'boolean', default: false },
      'prune-cache': { type: 'boolean', default: false },
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

/** Delete a week's response cache (`<out>/.cache`). Outputs are left alone. */
export async function pruneCache(out) {
  await rm(join(out, '.cache'), { recursive: true, force: true })
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
  const window = resolveWindow({ week: args.week, days: args.days, now })
  const config = loadConfig(args.config ? resolve(args.config) : DEFAULT_CONFIG_DIR)
  const out = resolve(args.out ?? join(REPO_ROOT, 'data', 'weeks', window.label))
  await mkdir(out, { recursive: true })
  log(`window ${window.label}: ${new Date(window.start).toISOString()} to ${new Date(window.end).toISOString()}`)
  log(`output ${out}`)

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
    cacheDir: args['no-cache'] ? null : join(out, '.cache', 'http'),
    auth: authFromEnv(env, log),
    log,
  })
  const consent = new Consent({ optOut: config.optOut.accounts, blockedLabels: config.scoring.blockedLabels, selfDeclaredPatterns: config.safety.selfDeclaredOptOut.patterns })

  const c = await collect({ client, config, window, consent, log })
  const dataDir = args.out ? dirname(out) : join(REPO_ROOT, 'data', 'weeks')
  const prior = window.kind === 'week' ? await readPriorPosts(dataDir, previousWeekLabels(window, config.cluster.collection.baselineWeeks)) : { posts: [], weeks: [] }

  const analyzeArgs = () => ({
    posts: c.store.posts.values(),
    memberDids: c.memberDids,
    members: c.members.map((m) => ({ did: m.did, handle: m.handle, displayName: m.displayName, seed: m.seed, followers: m.followersCount ?? null, small: Number.isFinite(m.followersCount) && m.followersCount < config.safety.smallAccountFollowers, guest: c.guestDids.has(m.did) })),
    reposts: c.store.reposts,
    window,
    baselineStart: c.baselineStart,
    baselineWeeks: config.cluster.collection.baselineWeeks,
    priorPosts: prior.posts,
    consent,
    scoring: config.scoring,
    profiles: c.profiles,
    guestDids: c.guestDids,
    guestsExcluded: c.guestsExcluded,
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
    window: d.window,
    run: {
      generatedAt: new Date().toISOString(),
      runtimeSeconds: Math.round((Date.now() - t0) / 100) / 10,
      requests: client.stats.requests,
      cacheHits: client.stats.cacheHits,
      retries: client.stats.retries,
      rateLimited: client.stats.rateLimited,
      errors: client.stats.errors,
      byEndpoint: client.stats.byEndpoint,
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
      cluster: { members: c.members.length, seeds: c.seeds.length, candidates: c.selection.considered, qualified: c.selection.qualified, cutByCap: c.selection.cut, seedsOptedOut: c.selection.skippedSeeds, byRule: ruleCounts },
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
  }

  await writeFile(join(out, 'posts.jsonl'), d.posts.map((p) => JSON.stringify(p)).join('\n') + (d.posts.length ? '\n' : ''))
  await writeFile(join(out, 'digest.json'), JSON.stringify(digest, null, 2) + '\n')
  await writeFile(join(out, 'digest.md'), renderMarkdown(digest))

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
