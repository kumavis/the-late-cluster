// Playwright's Chromium for the brand scripts (scripts/avatar.mjs, scripts/banner.mjs): CHROMIUM_PATH
// if set, else Playwright's own, else any Chromium or headless shell in Playwright's caches, newest
// first. Software WebGL (SwiftShader) is allowed, so a machine without a GPU renders the same.
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { EpisodeError } from './episodes.mjs'

const BINARIES = ['chrome-headless-shell-mac-arm64/chrome-headless-shell', 'chrome-headless-shell-mac-x64/chrome-headless-shell', 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome', 'chrome-linux64/chrome', 'chrome-headless-shell-linux64/chrome-headless-shell']

export async function launchChromium(chromium) {
  const args = ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
  const tries = [process.env.CHROMIUM_PATH || undefined]
  for (const r of [join(homedir(), 'Library/Caches/ms-playwright'), join(homedir(), '.cache/ms-playwright'), '/opt/pw-browsers']) {
    if (!existsSync(r)) continue
    for (const d of (await readdir(r)).sort().reverse()) {
      if (!/^chromium(_headless_shell)?-\d+/.test(d)) continue
      for (const rel of BINARIES) if (existsSync(join(r, d, rel))) tries.push(join(r, d, rel))
    }
  }
  let first
  for (const executablePath of tries) {
    try {
      return await chromium.launch({ executablePath, args })
    } catch (e) {
      first ??= e
    }
  }
  throw new EpisodeError(`could not launch Chromium: ${first?.message}\nset CHROMIUM_PATH to a Chromium/Chrome binary`, 1)
}
