#!/usr/bin/env node
// npm run avatar -- [--variant a|b|c] [--out file] [--candidates]
// The show's Bluesky profile picture, rendered from the studio's own host puppet: writes
// brand/avatar.png (1000×1000 sRGB PNG, under 900 KB), or --out somewhere else. --candidates
// renders all three compositions into preview/_avatar/ (candidate-a.png …) with sheet.png, each at
// 400, 96 and 42 px in Bluesky's circle on its dark background and on white. Deterministic: the
// pose, face and time are fixed and the renderer's randomness is seeded.
//
// Serves the private page scripts/avatar/ with Vite on a free localhost port and drives it in
// Playwright's Chromium, the way packages/show/tools/shoot.mjs shoots frames; both are shut down on
// exit. Episodes are not involved. Exit codes: 0 written, 1 the render failed, 2 bad arguments.
import { mkdir, writeFile, mkdtemp, rm } from 'node:fs/promises'
import { dirname, join, resolve, relative } from 'node:path'
import { tmpdir } from 'node:os'
import { cli, EpisodeError, REPO } from './lib/episodes.mjs'
import { launchChromium } from './lib/chromium.mjs'
import { parseAvatarArgs, AVATAR, VARIANTS, SIZE, encodePng, avatarProblems, pngInfo } from './lib/avatar.mjs'

const SS = 3 // supersampling: drawn at 3000 px, downsampled to 1000
const PREVIEW = join(REPO, 'preview/_avatar')

const png = (dataUrl) => Buffer.from(dataUrl.split(',')[1], 'base64')
const rgbPng = (b64) => encodePng(SIZE, SIZE, Buffer.from(b64, 'base64'))
const show = (f) => (f.startsWith(REPO + '/') ? relative(REPO, f) : f)

cli(async () => {
  const o = parseAvatarArgs(process.argv.slice(2))
  const variants = o.candidates ? Object.keys(VARIANTS) : [o.variant]

  const { chromium } = await import('playwright')
  const { createServer } = await import('vite')
  let browser, server, cacheDir
  const cleanup = async () => {
    await browser?.close().catch(() => {})
    await server?.close().catch(() => {})
    if (cacheDir) await rm(cacheDir, { recursive: true, force: true }).catch(() => {})
  }
  for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => cleanup().then(() => process.exit(130)))
  try {
    cacheDir = await mkdtemp(join(tmpdir(), 'late-cluster-avatar-'))
    const studio = join(REPO, 'packages/show')
    server = await createServer({
      configFile: false,
      root: join(REPO, 'scripts/avatar'),
      logLevel: 'error',
      cacheDir,
      clearScreen: false,
      resolve: {
        alias: [
          { find: /^@late-cluster\/show\//, replacement: join(studio, 'src') + '/' },
          { find: /^@late-cluster\/chimera\//, replacement: join(studio, 'chimera') + '/' },
        ],
      },
      server: { host: '127.0.0.1', port: 0, strictPort: false, hmr: false, watch: null, fs: { allow: [REPO] } },
    })
    await server.listen()
    const url = server.resolvedUrls.local[0]
    browser = await launchChromium(chromium)
    const page = await browser.newPage({ viewport: { width: 400, height: 300 }, deviceScaleFactor: 1 })
    const logs = []
    page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && logs.push(`${m.type()}: ${m.text()}`))
    page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`))
    let out
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 60000 })
      await page.waitForFunction(() => window.__avatarReady === true, null, { timeout: 90000 })
      out = await page.evaluate((opts) => window.renderAvatar(opts), { variants, size: SIZE, ss: SS, sheet: o.candidates })
    } catch (e) {
      for (const l of logs) console.error(`   ${l}`)
      throw new EpisodeError(`the render failed: ${e.message.split('\n')[0]}`, 1)
    }

    if (o.candidates) {
      await mkdir(PREVIEW, { recursive: true })
      for (const v of variants) {
        const f = join(PREVIEW, `candidate-${v}.png`)
        const buf = rgbPng(out.pictures[v])
        await writeFile(f, buf)
        console.log(`candidate ${v} ${show(f)}  ${buf.length} bytes${avatarProblems(buf).length ? `  (${avatarProblems(buf).join('; ')})` : ''}`)
      }
      const f = join(PREVIEW, 'sheet.png')
      await writeFile(f, png(out.sheet))
      console.log(`sheet ${show(f)}`)
      return 0
    }
    const buf = rgbPng(out.pictures[o.variant])
    const problems = avatarProblems(buf)
    if (problems.length) throw new EpisodeError(`variant ${o.variant}: ${problems.join('; ')}`, 1)
    const file = o.out === AVATAR ? join(REPO, AVATAR) : resolve(o.out)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, buf)
    const i = pngInfo(buf)
    console.log(`avatar ${show(file)}  variant ${o.variant}, ${i.width}×${i.height}, ${buf.length} bytes`)
    return 0
  } finally {
    await cleanup()
  }
})
