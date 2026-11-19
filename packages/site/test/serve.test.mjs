import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import { createStaticServer, mimeType } from '../src/serve.mjs'
import { tempDir } from './helpers.mjs'

async function serve(t) {
  const root = await tempDir(t)
  await mkdir(join(root, 'episodes', '001-pilot'), { recursive: true })
  await writeFile(join(root, 'index.html'), '<!doctype html>home')
  await writeFile(join(root, 'episodes', '001-pilot', 'index.html'), '<!doctype html>pilot')
  await writeFile(join(root, 'episodes', '001-pilot', 'a.mp3'), Buffer.from('0123456789'))
  const server = createStaticServer(root)
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  t.after(() => new Promise((r) => server.close(r)))
  return `http://127.0.0.1:${server.address().port}`
}

test('MIME types for the files a site ships', () => {
  const expect = {
    'a.html': 'text/html', 'a.css': 'text/css', 'a.js': 'text/javascript', 'a.json': 'application/json',
    'a.wasm': 'application/wasm', 'a.mp3': 'audio/mpeg', 'a.jpg': 'image/jpeg', 'a.png': 'image/png',
    'a.otf': 'font/otf', 'a.woff2': 'font/woff2', 'a.unknown': 'application/octet-stream', 'A.JPG': 'image/jpeg',
  }
  for (const [f, m] of Object.entries(expect)) assert.equal(mimeType(f).split(';')[0], m, f)
})

test('serves index.html for directories and redirects to the trailing slash', async (t) => {
  const base = await serve(t)
  const home = await fetch(`${base}/`)
  assert.equal(home.status, 200)
  assert.match(home.headers.get('content-type'), /text\/html/)
  assert.equal(await home.text(), '<!doctype html>home')

  const bare = await fetch(`${base}/episodes/001-pilot`, { redirect: 'manual' })
  assert.equal(bare.status, 301)
  assert.equal(bare.headers.get('location'), '/episodes/001-pilot/')
  assert.equal(await (await fetch(`${base}/episodes/001-pilot/`)).text(), '<!doctype html>pilot')
})

test('404s, refuses traversal, answers HEAD and byte ranges', async (t) => {
  const base = await serve(t)
  assert.equal((await fetch(`${base}/nope.html`)).status, 404)
  assert.equal((await fetch(`${base}/episodes/`)).status, 404, 'no directory listings')
  for (const p of ['/..%2f..%2fetc%2fpasswd', '/%2e%2e/%2e%2e/etc/passwd']) {
    assert.ok([403, 404].includes((await fetch(base + p)).status), p)
  }
  const head = await fetch(`${base}/episodes/001-pilot/a.mp3`, { method: 'HEAD' })
  assert.equal(head.status, 200)
  assert.equal(head.headers.get('content-length'), '10')
  assert.equal(head.headers.get('content-type'), 'audio/mpeg')

  const part = await fetch(`${base}/episodes/001-pilot/a.mp3`, { headers: { range: 'bytes=2-5' } })
  assert.equal(part.status, 206)
  assert.equal(part.headers.get('content-range'), 'bytes 2-5/10')
  assert.equal(await part.text(), '2345')
  const tail = await fetch(`${base}/episodes/001-pilot/a.mp3`, { headers: { range: 'bytes=-3' } })
  assert.equal(await tail.text(), '789')
  assert.equal((await fetch(`${base}/episodes/001-pilot/a.mp3`, { headers: { range: 'bytes=20-' } })).status, 416)
})
