import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { XrpcClient, BudgetExhausted, XrpcError, buildUrl, retryDelayFromHeaders, DEFAULT_USER_AGENT, authFromEnv } from '../src/http.js'
import { loadConfig } from '../src/config.js'

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })

function fakeFetch(responses) {
  const calls = []
  const fn = async (url, init) => {
    calls.push({ url, init })
    const r = responses.shift()
    if (r instanceof Error) throw r
    return typeof r === 'function' ? r(url) : r
  }
  fn.calls = calls
  return fn
}

const noSleep = { sleep: async () => {}, minIntervalMs: 0 }

test('the default User-Agent is generic and the shipped config keeps it so', () => {
  assert.equal(DEFAULT_USER_AGENT, 'weekly-digest-scraper/0.1')
  const ua = loadConfig().client.userAgent
  assert.doesNotMatch(ua, /late|cluster|larry|@|mailto|https?:/i)
})

test('requests are GETs with only a user-agent and accept header', async () => {
  const f = fakeFetch([json({ ok: 1 })])
  const c = new XrpcClient({ fetchImpl: f, ...noSleep, userAgent: 'ua-test/1' })
  await c.get('app.bsky.actor.getProfile', { actor: 'x.test' })
  assert.equal(f.calls[0].init.method, 'GET')
  assert.deepEqual(Object.keys(f.calls[0].init.headers).sort(), ['accept', 'user-agent'])
  assert.equal(f.calls[0].init.headers['user-agent'], 'ua-test/1')
  assert.equal(f.calls[0].url, 'https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=x.test')
})

test('array params repeat and keys are sorted, so cache keys are stable', () => {
  assert.equal(buildUrl('https://h.test', 'm', { b: 2, a: ['x', 'y'], c: undefined }), 'https://h.test/xrpc/m?a=x&a=y&b=2')
})

test('429 and 5xx are retried, honouring retry-after', async () => {
  const waits = []
  const f = fakeFetch([json({}, 429, { 'retry-after': '3' }), json({}, 503), json({ ok: true })])
  const c = new XrpcClient({ fetchImpl: f, minIntervalMs: 0, sleep: async (ms) => waits.push(ms), backoffBaseMs: 100 })
  assert.deepEqual(await c.get('m', {}), { ok: true })
  assert.equal(f.calls.length, 3)
  assert.equal(c.stats.retries, 2)
  assert.equal(c.stats.rateLimited, 1)
  assert.ok(waits.some((w) => w >= 2900 && w <= 3000), `waited ${waits}`)
})

test('ratelimit-reset is honoured when nothing remains', () => {
  const now = 1_700_000_000_000
  assert.equal(retryDelayFromHeaders({ 'ratelimit-remaining': '0', 'ratelimit-reset': String(now / 1000 + 10) }, now), 10_000)
  assert.equal(retryDelayFromHeaders({ 'ratelimit-remaining': '5', 'ratelimit-reset': String(now / 1000 + 10) }, now), null)
  assert.equal(retryDelayFromHeaders({ 'retry-after': 'Thu, 01 Jan 2099 00:00:00 GMT' }, now) > 0, true)
})

test('network errors are retried, then surface', async () => {
  const f = fakeFetch([new Error('ECONNRESET'), new Error('ECONNRESET'), new Error('ECONNRESET')])
  const c = new XrpcClient({ fetchImpl: f, ...noSleep, maxRetries: 2 })
  await assert.rejects(c.get('m'), /ECONNRESET/)
  assert.equal(f.calls.length, 3)
})

test('the request budget is a hard stop', async () => {
  const f = fakeFetch([json({ a: 1 }), json({ a: 2 }), json({ a: 3 })])
  const c = new XrpcClient({ fetchImpl: f, ...noSleep, maxRequests: 2 })
  await c.get('m', { n: 1 })
  await c.get('m', { n: 2 })
  await assert.rejects(c.get('m', { n: 3 }), BudgetExhausted)
  assert.equal(c.budgetHit, true)
  assert.equal(f.calls.length, 2)
})

test('the disk cache answers repeats, including definite 4xx, without spending budget', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'scraper-cache-'))
  try {
    const f = fakeFetch([json({ v: 1 }), json({ error: 'InvalidRequest', message: 'Profile not found' }, 400)])
    const c = new XrpcClient({ fetchImpl: f, ...noSleep, cacheDir: dir })
    await c.get('m', { a: 1 })
    await assert.rejects(c.get('m', { a: 2 }), XrpcError)
    const c2 = new XrpcClient({ fetchImpl: fakeFetch([]), ...noSleep, cacheDir: dir, maxRequests: 0 })
    assert.deepEqual(await c2.get('m', { a: 1 }), { v: 1 })
    await assert.rejects(c2.get('m', { a: 2 }), (e) => e instanceof XrpcError && e.status === 400)
    assert.equal(c2.stats.requests, 0)
    assert.equal(c2.stats.cacheHits, 2)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('concurrency is bounded', async () => {
  let live = 0
  let peak = 0
  const slow = async () => {
    live++
    peak = Math.max(peak, live)
    await new Promise((r) => setTimeout(r, 5))
    live--
    return json({})
  }
  const c = new XrpcClient({ fetchImpl: slow, ...noSleep, concurrency: 3 })
  await Promise.all(Array.from({ length: 12 }, (_, i) => c.get('m', { i })))
  assert.ok(peak <= 3, `peak ${peak}`)
})

test('authenticated mode is a reserved seam that does nothing today', () => {
  const warnings = []
  assert.equal(authFromEnv({ SCRAPER_BSKY_SESSION: 'x' }, (m) => warnings.push(m)), null)
  assert.equal(warnings.length, 1)
  assert.equal(authFromEnv({}), null)
})
