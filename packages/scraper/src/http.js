// A polite, read-only XRPC client for the public Bluesky AppView.
//
// - GET only. There is no code path that writes to the network.
// - Bounded concurrency, a minimum gap between request starts, and a hard request budget.
// - Retries 429, 5xx and network errors with exponential backoff, honouring `retry-after`
//   and the `ratelimit-*` headers, and pausing early when `ratelimit-remaining` runs low.
// - An on-disk response cache keyed by URL, so a re-run or a resumed run does not refetch.
// - Authentication is a seam, not a feature: `auth` is an object with `headers()` that the
//   client would merge into each request. Nothing in this package constructs one.

import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import { join } from 'node:path'

export const DEFAULT_USER_AGENT = 'weekly-digest-scraper/0.1'

export class BudgetExhausted extends Error {
  constructor(max) {
    super(`request budget of ${max} exhausted`)
    this.name = 'BudgetExhausted'
  }
}

export class XrpcError extends Error {
  constructor(status, body, url) {
    super(`${status} ${body?.error ?? ''} ${body?.message ?? ''}`.trim())
    this.name = 'XrpcError'
    this.status = status
    this.error = body?.error
    this.url = url
  }
}

export function buildUrl(host, nsid, params = {}) {
  const u = new URL(`/xrpc/${nsid}`, host)
  const keys = Object.keys(params).sort()
  for (const k of keys) {
    const v = params[k]
    if (v === undefined || v === null || v === '') continue
    for (const item of Array.isArray(v) ? v : [v]) u.searchParams.append(k, String(item))
  }
  return u.toString()
}

/** Milliseconds to wait before retrying, from response headers, or null if they say nothing. */
export function retryDelayFromHeaders(headers, now = Date.now()) {
  const get = (k) => (typeof headers?.get === 'function' ? headers.get(k) : headers?.[k])
  const ra = get('retry-after')
  if (ra != null && ra !== '') {
    const secs = Number(ra)
    if (Number.isFinite(secs)) return Math.max(0, secs * 1000)
    const at = Date.parse(ra)
    if (Number.isFinite(at)) return Math.max(0, at - now)
  }
  const reset = Number(get('ratelimit-reset'))
  const remaining = get('ratelimit-remaining')
  if (Number.isFinite(reset) && reset > 0 && remaining != null && Number(remaining) <= 0) {
    // ratelimit-reset is an epoch in seconds on Bluesky services.
    const ms = reset > 1e12 ? reset : reset * 1000
    return Math.max(0, ms - now)
  }
  return null
}

const sleepReal = (ms) => new Promise((r) => setTimeout(r, ms))

export class XrpcClient {
  constructor({
    host = 'https://public.api.bsky.app',
    userAgent = DEFAULT_USER_AGENT,
    concurrency = 4,
    minIntervalMs = 120,
    maxRequests = 1000,
    maxRetries = 5,
    backoffBaseMs = 1000,
    backoffMaxMs = 60_000,
    timeoutMs = 20_000,
    cacheDir = null,
    auth = null,
    fetchImpl = globalThis.fetch,
    sleep = sleepReal,
    log = () => {},
  } = {}) {
    Object.assign(this, { host, userAgent, concurrency, minIntervalMs, maxRequests, maxRetries,
      backoffBaseMs, backoffMaxMs, timeoutMs, cacheDir, auth, fetchImpl, sleep, log })
    this.stats = { requests: 0, cacheHits: 0, retries: 0, errors: 0, rateLimited: 0, byEndpoint: {} }
    this.active = 0
    this.queue = []
    this.nextStart = 0
    this.pauseUntil = 0
    this.budgetHit = false
    this.tmpSeq = 0
  }

  remaining() {
    return Math.max(0, this.maxRequests - this.stats.requests)
  }

  cachePath(url) {
    return join(this.cacheDir, createHash('sha256').update(url).digest('hex').slice(0, 40) + '.json')
  }

  async readCache(url) {
    if (!this.cacheDir) return null
    try {
      const hit = JSON.parse(await readFile(this.cachePath(url), 'utf8'))
      return hit.url === url ? hit : null
    } catch {
      return null
    }
  }

  async writeCache(url, status, body) {
    if (!this.cacheDir) return
    await mkdir(this.cacheDir, { recursive: true })
    const path = this.cachePath(url)
    const tmp = `${path}.${process.pid}.${++this.tmpSeq}.tmp` // unique: two writers may race
    await writeFile(tmp, JSON.stringify({ url, status, body }))
    await rename(tmp, path)
  }

  async slot() {
    if (this.active >= this.concurrency) await new Promise((r) => this.queue.push(r))
    this.active++
  }

  release() {
    this.active--
    const next = this.queue.shift()
    if (next) next()
  }

  /** GET an XRPC method. Resolves to the JSON body; rejects with XrpcError or BudgetExhausted. */
  async get(nsid, params = {}, { host } = {}) {
    const url = buildUrl(host ?? this.host, nsid, params)
    const cached = await this.readCache(url)
    if (cached) {
      this.stats.cacheHits++
      if (cached.status !== 200) throw new XrpcError(cached.status, cached.body, url)
      return cached.body
    }
    await this.slot()
    try {
      return await this.fetchWithRetry(url, nsid)
    } finally {
      this.release()
    }
  }

  async fetchWithRetry(url, nsid) {
    for (let attempt = 0; ; attempt++) {
      if (this.stats.requests >= this.maxRequests) {
        this.budgetHit = true
        throw new BudgetExhausted(this.maxRequests)
      }
      // Pace request starts and respect any pause a rate-limit response asked for.
      const now = Date.now()
      const startAt = Math.max(now, this.nextStart, this.pauseUntil)
      this.nextStart = startAt + this.minIntervalMs
      if (startAt > now) await this.sleep(startAt - now)

      this.stats.requests++
      this.stats.byEndpoint[nsid] = (this.stats.byEndpoint[nsid] ?? 0) + 1
      const headers = { 'user-agent': this.userAgent, accept: 'application/json' }
      if (this.auth) Object.assign(headers, await this.auth.headers())

      let res
      try {
        res = await this.fetchImpl(url, { method: 'GET', headers, signal: AbortSignal.timeout(this.timeoutMs) })
      } catch (err) {
        if (attempt >= this.maxRetries) {
          this.stats.errors++
          throw err
        }
        this.stats.retries++
        await this.sleep(this.backoff(attempt))
        continue
      }

      const remaining = res.headers.get('ratelimit-remaining')
      if (remaining != null && Number(remaining) <= 2) {
        const wait = retryDelayFromHeaders({ 'ratelimit-remaining': '0', 'ratelimit-reset': res.headers.get('ratelimit-reset') })
        if (wait) this.pauseUntil = Math.max(this.pauseUntil, Date.now() + Math.min(wait, this.backoffMaxMs * 5))
      }

      if (res.status === 429 || res.status >= 500) {
        if (res.status === 429) this.stats.rateLimited++
        await res.arrayBuffer().catch(() => {})
        if (attempt >= this.maxRetries) {
          this.stats.errors++
          throw new XrpcError(res.status, null, url)
        }
        this.stats.retries++
        const hinted = retryDelayFromHeaders(res.headers)
        const wait = Math.min(hinted ?? this.backoff(attempt), this.backoffMaxMs * 5)
        this.log(`  ${res.status} on ${nsid}, waiting ${Math.round(wait / 1000)}s (attempt ${attempt + 1})`)
        this.pauseUntil = Math.max(this.pauseUntil, Date.now() + wait)
        continue
      }

      const text = await res.text()
      let body = null
      try {
        body = text ? JSON.parse(text) : null
      } catch {
        body = { error: 'NotJson', message: text.slice(0, 120) }
      }
      if (res.status === 200) {
        await this.writeCache(url, 200, body)
        return body
      }
      // A definite client error (400 not found, 403): remember it so a re-run does not ask again.
      this.stats.errors++
      if (res.status >= 400 && res.status < 500) await this.writeCache(url, res.status, body)
      throw new XrpcError(res.status, body, url)
    }
  }

  backoff(attempt) {
    // Deterministic exponential backoff; jitter is unnecessary at this concurrency.
    return Math.min(this.backoffMaxMs, this.backoffBaseMs * 2 ** attempt)
  }
}

/**
 * Reserved for a later authenticated mode. Returns null today: unauthenticated is the only
 * mode, and setting the variable only produces a warning.
 */
export function authFromEnv(env = process.env, warn = () => {}) {
  if (env.SCRAPER_BSKY_SESSION) warn('SCRAPER_BSKY_SESSION is set, but authenticated mode is not implemented; ignoring it.')
  return null
}
