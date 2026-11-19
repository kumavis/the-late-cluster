import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { buildSite } from '../src/build.mjs'
import { GENERATED_PATHS, gitignoreLines } from '../src/paths.mjs'
import { esc } from '../src/render.mjs'
import { FIXTURES, copyFixture, links, makeEpisodes, snapshot, tempDir } from './helpers.mjs'

const read = (dir, rel) => readFile(join(dir, rel), 'utf8')
const BIN = fileURLToPath(new URL('../bin/build-site.mjs', import.meta.url))

test('esc covers the five HTML metacharacters', () => {
  assert.equal(esc(`<a href="x" title='y'>&</a>`), '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;')
})

test('writes exactly the generated paths and nothing under episodes/', async (t) => {
  const dir = await copyFixture(t, 'mixed')
  const before = await snapshot(join(dir, 'episodes'))
  const { written } = await buildSite({ inDir: dir })
  assert.deepEqual(await snapshot(join(dir, 'episodes')), before)
  for (const rel of written) {
    assert.ok(GENERATED_PATHS.some((g) => (g.endsWith('/') ? rel.startsWith(g) : rel === g)), rel)
    assert.ok(!rel.startsWith('episodes/'), rel)
  }
  const all = Object.keys(await snapshot(dir)).filter((p) => !p.startsWith('episodes/')).sort()
  assert.deepEqual(all, [...written].sort(), 'no stray files outside the generated paths')
  assert.ok(written.includes('site-assets/fonts/OFL.txt') && written.includes('site-assets/fonts/AVHERSHEY-LICENSE.txt'))
})

test('the fixtures themselves are left untouched when output goes elsewhere', async (t) => {
  const before = await snapshot(join(FIXTURES, 'mixed'))
  await buildSite({ inDir: join(FIXTURES, 'mixed'), outDir: await tempDir(t) })
  assert.deepEqual(await snapshot(join(FIXTURES, 'mixed')), before)
})

test('refuses to write the site inside an episodes directory', async (t) => {
  const dir = await copyFixture(t, 'one')
  await assert.rejects(buildSite({ inDir: dir, outDir: join(dir, 'episodes') }), /episodes directory/)
  await assert.rejects(buildSite({ inDir: dir, outDir: join(dir, 'episodes', '001-pilot') }), /episodes directory/)
})

test('manifest strings are escaped everywhere they reach HTML', async (t) => {
  const out = await tempDir(t)
  await buildSite({ inDir: join(FIXTURES, 'mixed'), outDir: out })
  const html = await read(out, 'index.html')
  assert.ok(!html.includes('<script'), 'no raw script tag')
  assert.ok(!html.includes('<b>'), 'no raw markup from the description')
  assert.ok(html.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; Friends'))
  assert.ok(html.includes('Quotes &quot; and &#39; and &lt;b&gt;tags&lt;/b&gt; &amp; ampersands.'))
  const json = JSON.parse(await read(out, 'episodes.json'))
  assert.equal(json.episodes[1].title, '<script>alert("x")</script> & Friends', 'JSON keeps the raw string')
})

test('every link is relative and resolves inside the site', async (t) => {
  for (const fixture of ['one', 'mixed']) {
    const dir = await copyFixture(t, fixture)
    await buildSite({ inDir: dir })
    for (const page of ['index.html', 'latest/index.html']) {
      const html = await read(dir, page)
      for (const href of links(html)) {
        if (href.startsWith('data:')) continue
        assert.doesNotMatch(href, /^\/|^[a-z]+:/i, `${page}: ${href} must be relative`)
        const target = new URL(href, `file:///site/${page}`).pathname.slice('/site/'.length)
        await access(join(dir, target.endsWith('/') || target === '' ? `${target}index.html` : target))
      }
    }
    const css = await read(dir, 'site-assets/site.css')
    for (const [, u] of css.matchAll(/url\('([^']+)'\)/g)) await access(join(dir, 'site-assets', u))
  }
})

test('the archive features the newest episode and lists the rest', async (t) => {
  const dir = await tempDir(t)
  await makeEpisodes(dir, 12)
  await buildSite({ inDir: dir })
  const html = await read(dir, 'index.html')
  assert.match(html, /Episode 012<\/p>\s*<h3 class="feature-title">Week 12<\/h3>/)
  assert.match(html, /class="watch" href="episodes\/012-week-12\/"/)
  assert.match(html, /11 earlier episodes/)
  const order = [...html.matchAll(/class="card-title"><a href="episodes\/(\d+)-/g)].map((m) => Number(m[1]))
  assert.deepEqual(order, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  assert.ok(!/<script/i.test(html), 'no client-side JavaScript')
})

test('one episode: featured, no archive section', async (t) => {
  const out = await tempDir(t)
  await buildSite({ inDir: join(FIXTURES, 'one'), outDir: out })
  const html = await read(out, 'index.html')
  assert.match(html, /Episode 001/)
  assert.match(html, /<time datetime="2026-11-13">13 NOV 2026<\/time>/)
  assert.ok(!html.includes('class="archive"'))
  assert.ok(!html.includes('No episodes yet'))
})

test('latest/ redirects to the newest episode', async (t) => {
  const out = await tempDir(t)
  await buildSite({ inDir: join(FIXTURES, 'mixed'), outDir: out })
  const html = await read(out, 'latest/index.html')
  assert.match(html, /<meta http-equiv="refresh" content="0; url=\.\.\/episodes\/010-ten\/">/)
  assert.match(html, /<a href="\.\.\/episodes\/010-ten\/">Episode 010: Ten<\/a>/)
})

test('empty state: zero published episodes', async (t) => {
  const dir = await tempDir(t)
  await mkdir(join(dir, 'episodes', '001-draft'), { recursive: true })
  await writeFile(join(dir, 'episodes', '001-draft', 'episode.json'), JSON.stringify({ id: '001-draft', number: 1, title: 'Draft', status: 'draft' }))
  const { episodes } = await buildSite({ inDir: dir })
  assert.equal(episodes.length, 0)
  const html = await read(dir, 'index.html')
  assert.match(html, /No episodes yet/)
  assert.ok(!html.includes('class="watch"'))
  assert.ok(!html.includes('href="latest/"'))
  assert.match(await read(dir, 'latest/index.html'), /url=\.\.\/"/)
  assert.deepEqual(JSON.parse(await read(dir, 'episodes.json')).episodes, [])
})

test('output is byte-identical across runs, and stale generated files are cleared', async (t) => {
  const dir = await tempDir(t)
  await makeEpisodes(dir, 5)
  await buildSite({ inDir: dir })
  const first = await snapshot(dir)
  await writeFile(join(dir, 'site-assets', 'stale.css'), 'old')
  await buildSite({ inDir: dir })
  assert.deepEqual(await snapshot(dir), first)
})

test('SITE_URL adds absolute Open Graph URLs; without it they are omitted', async (t) => {
  const plain = await tempDir(t)
  await buildSite({ inDir: join(FIXTURES, 'one'), outDir: plain })
  const a = await read(plain, 'index.html')
  assert.match(a, /<meta property="og:title"/)
  assert.ok(!a.includes('og:url') && !a.includes('og:image') && !a.includes('rel="canonical"'))

  const withUrl = await tempDir(t)
  await buildSite({ inDir: join(FIXTURES, 'one'), outDir: withUrl, siteUrl: 'https://user.github.io/the-late-cluster' })
  const b = await read(withUrl, 'index.html')
  assert.match(b, /<meta property="og:url" content="https:\/\/user\.github\.io\/the-late-cluster\/">/)
  assert.match(b, /<meta property="og:image" content="https:\/\/user\.github\.io\/the-late-cluster\/episodes\/001-pilot\/thumbnail\.jpg">/)
  const json = JSON.parse(await read(withUrl, 'episodes.json'))
  assert.equal(json.episodes[0].url, 'https://user.github.io/the-late-cluster/episodes/001-pilot/')

  await assert.rejects(buildSite({ inDir: join(FIXTURES, 'one'), outDir: withUrl, siteUrl: 'not a url' }), /SITE_URL/)
})

test('episodes.json is machine-readable with relative paths', async (t) => {
  const out = await tempDir(t)
  await buildSite({ inDir: join(FIXTURES, 'mixed'), outDir: out })
  const json = JSON.parse(await read(out, 'episodes.json'))
  assert.equal(json.latest, '010-ten')
  assert.deepEqual(json.episodes[0], {
    id: '010-ten', number: 10, title: 'Ten', description: 'Sorts after nine numerically, not as text.', airDate: '2027-01-15',
    path: 'episodes/010-ten/', thumbnail: 'episodes/010-ten/thumbnail.jpg',
  })
  assert.equal(json.episodes[2].thumbnail, null)
})

test('gitignore lines are derived from the generated paths', () => {
  assert.deepEqual(gitignoreLines('dist'), ['/dist/index.html', '/dist/episodes.json', '/dist/latest/', '/dist/site-assets/'])
})

test('the CLI warns about broken manifests and still succeeds', async (t) => {
  const out = await tempDir(t)
  const { stdout, stderr } = await promisify(execFile)(process.execPath, [BIN, join(FIXTURES, 'mixed'), out], { env: { ...process.env, SITE_URL: '' } })
  assert.match(stdout, /3 published episodes, 1 draft not listed/)
  assert.match(stderr, /warning: episodes\/004-broken: skipped/)
})
