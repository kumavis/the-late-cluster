// Loads config/*.json. The files are the documentation of record; see README "Config".

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const PACKAGE_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')
export const DEFAULT_CONFIG_DIR = join(PACKAGE_DIR, 'config')

const read = (dir, name) => JSON.parse(readFileSync(join(dir, name), 'utf8'))

export function loadConfig(dir = DEFAULT_CONFIG_DIR) {
  const config = {
    cluster: read(dir, 'cluster.json'),
    optOut: read(dir, 'optout.json'),
    scoring: read(dir, 'scoring.json'),
    client: read(dir, 'client.json'),
    safety: read(dir, 'safety.json'),
    show: read(dir, 'show.json'),
    games: read(dir, 'games.json'),
  }
  validate(config)
  return config
}

export function validate(c) {
  const need = (cond, msg) => { if (!cond) throw new Error(`config: ${msg}`) }
  need(Array.isArray(c.cluster.seeds) && c.cluster.seeds.length > 0, 'cluster.seeds must list at least one account')
  for (const s of c.cluster.seeds) need(typeof s === 'object' && (s.did || s.handle) && s.reason, `cluster.seeds: every seed needs a did (preferred) or handle, and a reason (${JSON.stringify(s)})`)
  for (const s of c.cluster.seeds) need(!s.did || String(s.did).startsWith('did:'), `cluster.seeds: ${s.did} is not a DID`)
  for (const r of c.cluster.rosters ?? []) need(r.id && r.account && r.reason, `cluster.rosters: every roster needs id, account and reason (${JSON.stringify(r)})`)
  need(Array.isArray(c.cluster.expansion?.rules), 'cluster.expansion.rules must be an array')
  need(c.cluster.expansion.weights, 'cluster.expansion.weights is required')
  need(c.cluster.collection, 'cluster.collection is required')
  need(Array.isArray(c.optOut.accounts), 'optout.accounts must be an array of handles or DIDs')
  for (const k of ['engagementWeights', 'postWeights', 'storyWeights']) need(c.scoring[k], `scoring.${k} is required`)
  need(Array.isArray(c.scoring.blockedLabels), 'scoring.blockedLabels must be an array')
  need(Number.isFinite(c.safety.smallAccountFollowers), 'safety.smallAccountFollowers must be a number')
  need(Array.isArray(c.safety.selfDeclaredOptOut?.patterns), 'safety.selfDeclaredOptOut.patterns must be an array')
  need(c.safety.sensitivity?.topics && typeof c.safety.sensitivity.topics === 'object', 'safety.sensitivity.topics is required')
  for (const comb of c.safety.sensitivity.combinations ?? []) for (const list of comb.all) for (const re of list) new RegExp(re, 'iu')
  for (const list of [c.safety.selfDeclaredOptOut.patterns, c.safety.showOptOutPatterns?.patterns ?? [], c.safety.showCorrectionPatterns ?? [], ...Object.values(c.safety.sensitivity.topics), c.show.phrases ?? [], c.show.linkPatterns ?? []]) {
    for (const re of list) {
      try { new RegExp(re, 'iu') } catch (e) { throw new Error(`config: bad pattern ${JSON.stringify(re)}: ${e.message}`) }
    }
  }
  need(Array.isArray(c.games.games), 'games.games must be an array')
  for (const g of c.games.games) {
    need(g.id && g.account && g.resultPattern, `games: every game needs id, account and resultPattern (${g.id ?? '?'})`)
    for (const re of [g.resultPattern, ...(g.fieldPatterns ?? []), ...(g.leaderboard ? [g.leaderboard.headerPattern, g.leaderboard.entryPattern] : [])]) {
      try { new RegExp(re, 'iu') } catch (e) { throw new Error(`config: bad pattern in game ${g.id}: ${e.message}`) }
    }
  }
  for (const re of c.show.performableThreads?.avoidPatterns ?? []) new RegExp(re, 'iu')
  for (const re of c.safety.excludedMentions?.aboutPatterns ?? []) {
    try { new RegExp(re, 'iu') } catch (e) { throw new Error(`config: bad pattern in safety.excludedMentions: ${e.message}`) }
  }
  need(!/the-late-cluster|late cluster|larry/i.test(c.client.userAgent ?? ''), 'client.userAgent must stay generic')
}
