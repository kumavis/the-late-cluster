// npm run media: fetch one post's pictures, or a video's thumbnail, from Bluesky's public CDN
// into <digest dir>/media/ (gitignored), so a researcher can look and describe (trial 002,
// finding 9). Only posts in the digest, and never one that is redacted, marked for consent,
// about the show, or inside a story the consent rules leave out.

import { readFileSync, existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { allRecords, findByAddress, newestDigestDir } from './lookup.js'
import { DEFAULT_USER_AGENT } from './http.js'

export const MEDIA_USAGE = `Usage: npm run media -- --dir <digest folder> --uri <at:// or bsky.app address> [--json]

Fetches the post's pictures (full size), or its video's thumbnail, from Bluesky's public CDN
into <digest folder>/media/, and prints each file's path with its alt text. A file already
there is not fetched again. Refused: a post not in the digest, a redacted post, a post marked
for consent, a post about the show, a post inside a story the consent rules leave out.
`

/** Hosts the media command will fetch from: Bluesky's public CDN, nothing else. */
export const MEDIA_HOSTS = new Set(['cdn.bsky.app', 'video.bsky.app', 'video.cdn.bsky.app'])

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' }

/** Why this post's media may not be fetched, or null. */
export function refusal(p, { skeleton = null } = {}) {
  if (!p) return 'not in the digest'
  if (p.redacted) return 'redacted: it names an account the consent rules exclude'
  if (p.consent?.length) return `marked for consent (${p.consent.join(', ')})`
  if (p.aboutShow) return 'about the show: for reviewers only'
  if (skeleton?.excluded) return 'inside a story the consent rules leave out'
  return null
}

/** What to fetch for a post: each picture's full-size address, or a video's thumbnail. */
export function mediaTargets(p) {
  const out = []
  for (const [i, m] of (p.media ?? []).entries()) {
    const url = m.kind === 'video' ? m.thumb : m.url ?? m.thumb
    if (url) out.push({ n: i + 1, of: p.media.length, kind: m.kind, what: m.kind === 'video' ? 'video thumbnail' : 'picture', url, alt: m.alt ?? null, hasAlt: !!m.hasAlt })
  }
  return out
}

const fileBase = (uri, n) => {
  const m = /^at:\/\/([^/]+)\/[^/]+\/([^/]+)$/.exec(uri)
  return `${(m?.[1] ?? 'post').replace(/[^a-z0-9]+/gi, '-')}-${m?.[2] ?? 'x'}-${n}`
}

async function fetchBytes(url, { fetchImpl, userAgent, retries = 3, sleep }) {
  const host = new URL(url).hostname
  if (!MEDIA_HOSTS.has(host)) throw new Error(`refused: ${host} is not Bluesky's public CDN`)
  for (let attempt = 0; ; attempt++) {
    let res
    try {
      res = await fetchImpl(url, { method: 'GET', headers: { 'user-agent': userAgent }, signal: AbortSignal.timeout(30_000) })
    } catch (err) {
      if (attempt >= retries) throw err
      await sleep(1000 * 2 ** attempt)
      continue
    }
    if ((res.status === 429 || res.status >= 500) && attempt < retries) { await res.arrayBuffer().catch(() => {}); await sleep(1000 * 2 ** attempt); continue }
    if (res.status !== 200) throw new Error(`${res.status} from ${host}`)
    return { bytes: Buffer.from(await res.arrayBuffer()), type: (res.headers.get('content-type') ?? '').split(';')[0].trim() }
  }
}

export async function media(argv, { roots = [], env = process.env, fetchImpl = globalThis.fetch, write = (s) => process.stdout.write(s), sleep = (ms) => new Promise((r) => setTimeout(r, ms)), userAgent } = {}) {
  const { values: a } = parseArgs({ args: argv, options: { dir: { type: 'string' }, uri: { type: 'string' }, url: { type: 'string' }, json: { type: 'boolean' }, help: { type: 'boolean', short: 'h' } }, strict: true })
  const addr = a.uri ?? a.url
  if (a.help || !addr) { write(MEDIA_USAGE); return a.help ? 0 : 2 }
  const dir = a.dir ? resolve(a.dir) : newestDigestDir(roots)
  if (!dir || !existsSync(join(dir, 'digest.json'))) { write(`error: no digest found${dir ? ` in ${dir}` : ''}\n`); return 2 }
  const digest = JSON.parse(readFileSync(join(dir, 'digest.json'), 'utf8'))
  const p = findByAddress(allRecords(dir, digest), addr)
  let skeleton = null
  try {
    const byPost = JSON.parse(readFileSync(join(dir, 'skeletons', 'by-post.json'), 'utf8'))
    const id = p && byPost[p.uri]
    if (id) skeleton = JSON.parse(readFileSync(join(dir, 'skeletons', `${id}.json`), 'utf8'))
  } catch { /* no skeletons: the post's own marks still apply */ }
  const why = refusal(p, { skeleton })
  if (why) { write(`refused: ${why}\n`); return 1 }
  const targets = mediaTargets(p)
  if (!targets.length) { write(`${p.uri}: no pictures or video${p.hasImages || p.hasVideo ? ' addresses in the digest (re-run the scrape to record them)' : ''}\n`); return 1 }
  const out = join(dir, 'media')
  await mkdir(out, { recursive: true })
  const ua = userAgent ?? env.SCRAPER_USER_AGENT ?? readUserAgent() ?? DEFAULT_USER_AGENT
  const rows = []
  for (const t of targets) {
    const base = fileBase(p.uri, t.n)
    const have = ['jpg', 'png', 'webp', 'gif', 'avif'].map((e) => join(out, `${base}.${e}`)).find((f) => existsSync(f))
    let path = have
    if (!have) {
      const { bytes, type } = await fetchBytes(t.url, { fetchImpl, userAgent: ua, sleep })
      path = join(out, `${base}.${EXT[type] ?? 'jpg'}`)
      await writeFile(path, bytes)
    }
    rows.push({ path, kind: t.kind, what: t.what, n: t.n, of: t.of, alt: t.alt, hasAlt: t.hasAlt, fetched: !have })
  }
  if (a.json) write(JSON.stringify({ uri: p.uri, url: p.url, files: rows }) + '\n')
  else for (const r of rows) write(`${r.path}\t${r.what} ${r.n} of ${r.of}\t${r.hasAlt ? `alt: ${JSON.stringify(r.alt)}` : 'no alt text'}\n`)
  return 0
}

function readUserAgent() {
  try { return JSON.parse(readFileSync(new URL('../config/client.json', import.meta.url), 'utf8')).userAgent ?? null } catch { return null }
}
