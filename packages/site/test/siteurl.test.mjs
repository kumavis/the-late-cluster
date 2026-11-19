import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { resolveSiteUrl, SHOW_CONFIG } from '../src/build.mjs'

async function showConfig(t, content) {
  const dir = await mkdtemp(join(tmpdir(), 'late-cluster-site-config-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const path = join(dir, 'show.config.json')
  if (content !== undefined) await writeFile(path, typeof content === 'string' ? content : JSON.stringify(content))
  return path
}

test('site URL: SITE_URL wins over show.config.json', async (t) => {
  const showConfigPath = await showConfig(t, { siteUrl: 'https://show.example.test/' })
  assert.equal(resolveSiteUrl({ env: { SITE_URL: 'https://env.example.test/' }, showConfigPath }), 'https://env.example.test/')
})

test('site URL falls back to siteUrl in show.config.json', async (t) => {
  const showConfigPath = await showConfig(t, { siteUrl: 'https://show.example.test/the-late-cluster' })
  assert.equal(resolveSiteUrl({ env: {}, showConfigPath }), 'https://show.example.test/the-late-cluster')
  assert.equal(resolveSiteUrl({ env: { SITE_URL: '' }, showConfigPath }), 'https://show.example.test/the-late-cluster')
})

test('no site URL: empty setting or no show.config.json', async (t) => {
  assert.equal(resolveSiteUrl({ env: {}, showConfigPath: await showConfig(t, { siteUrl: '' }) }), '')
  assert.equal(resolveSiteUrl({ env: {}, showConfigPath: await showConfig(t) }), '')
  await assert.rejects(async () => resolveSiteUrl({ env: {}, showConfigPath: await showConfig(t, '{ nope') }), /not valid JSON/)
})

test('the default is the repo root show.config.json', () => {
  assert.match(SHOW_CONFIG, /show\.config\.json$/)
  assert.doesNotMatch(SHOW_CONFIG, /packages/)
})
