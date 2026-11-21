#!/usr/bin/env node
// npm run banner -- [--variant a|b|c] [--out file.png] [--candidates]
// The show's Bluesky profile banner: the title card's THE LATE / CLUSTER / with Larry Nx over the
// set's simcluster skyline, no host (he is the profile picture). Writes brand/banner.png (3000×1000
// sRGB PNG, or 1500×500 when the larger is over Bluesky's 1,000,000 bytes), or --out somewhere else. --candidates renders all three
// compositions into brand/candidates/ (banner-a.png …) with banner-sheet.png, each shown as the
// profile shows it on a desktop (600 points) and a phone (390), the profile picture and the
// phone's buttons drawn over it. Deterministic: the skyline is the set's seeded one, frozen at one
// time.
//
// The file is refused (exit 1, nothing written) when it is not 3000×1000, has no sRGB chunk, is
// over the byte limit, or when the title is under the profile picture or a phone button or too
// small to read on a phone (scripts/lib/banner.mjs).
//
// Serves the private page scripts/banner/ with Vite on a free localhost port and drives it in
// Playwright's Chromium, as scripts/avatar.mjs does; both are shut down on exit. Exit codes: 0
// written, 1 the render or a check failed, 2 bad arguments.
import { mkdir, writeFile, readFile, mkdtemp, rm } from 'node:fs/promises'
import { dirname, join, resolve, relative } from 'node:path'
import { tmpdir } from 'node:os'
import { cli, EpisodeError, REPO } from './lib/episodes.mjs'
import { launchChromium } from './lib/chromium.mjs'
import { encodePng, pngInfo } from './lib/avatar.mjs'
import { parseBannerArgs, BANNER, CANDIDATES, VARIANTS, WIDTH, pickBanner, titleProblems } from './lib/banner.mjs'

const SS = 2 // supersampling: drawn at 6000 px, downsampled to 3000
const AVATAR = join(REPO, 'brand/avatar.png') // drawn in the sheet's profile-picture circle

const show = (f) => (f.startsWith(REPO + '/') ? relative(REPO, f) : f)

/** the finished PNG (3000 × 1000 if it is under the byte limit, else 1500 × 500) and everything wrong with it */
function finish(pic) {
  const { buf, problems } = pickBanner(pic.sizes.map((s) => encodePng(s.width, s.height, Buffer.from(s.rgb, 'base64'))))
  return { buf, problems: [...problems, ...titleProblems(pic.box)] }
}

cli(async () => {
  const o = parseBannerArgs(process.argv.slice(2))
  const variants = o.candidates ? Object.keys(VARIANTS) : [o.variant]
  const avatar = o.candidates ? `data:image/png;base64,${(await readFile(AVATAR)).toString('base64')}` : null

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
    cacheDir = await mkdtemp(join(tmpdir(), 'late-cluster-banner-'))
    const studio = join(REPO, 'packages/show')
    server = await createServer({
      configFile: false,
      root: join(REPO, 'scripts/banner'),
      publicDir: join(studio, 'public'), // the fonts, at /fonts/
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
      await page.waitForFunction(() => window.__bannerReady === true, null, { timeout: 90000 })
      out = await page.evaluate((opts) => window.renderBanner(opts), { variants, width: WIDTH, ss: SS, sheet: o.candidates, avatar })
    } catch (e) {
      for (const l of logs) console.error(`   ${l}`)
      throw new EpisodeError(`the render failed: ${e.message.split('\n')[0]}`, 1)
    }

    if (o.candidates) {
      const dir = join(REPO, CANDIDATES)
      await mkdir(dir, { recursive: true })
      let bad = 0
      for (const v of variants) {
        const { buf, problems } = finish(out.pictures[v])
        const f = join(dir, `banner-${v}.png`)
        await writeFile(f, buf)
        if (problems.length) bad++
        console.log(`candidate ${v} ${show(f)}  ${pngInfo(buf).width}×${pngInfo(buf).height}, ${buf.length} bytes${problems.length ? `  REFUSED as the banner: ${problems.join('; ')}` : ''}`)
      }
      const f = join(dir, 'banner-sheet.png')
      await writeFile(f, Buffer.from(out.sheet.split(',')[1], 'base64'))
      console.log(`sheet ${show(f)}`)
      return bad ? 1 : 0
    }
    const { buf, problems } = finish(out.pictures[o.variant])
    if (problems.length) throw new EpisodeError(`variant ${o.variant}: ${problems.join('; ')}`, 1)
    const file = o.out === BANNER ? join(REPO, BANNER) : resolve(o.out)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, buf)
    const i = pngInfo(buf)
    console.log(`banner ${show(file)}  variant ${o.variant}, ${i.width}×${i.height}, ${buf.length} bytes`)
    return 0
  } finally {
    await cleanup()
  }
})
