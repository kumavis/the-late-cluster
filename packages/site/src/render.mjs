// Pure rendering: episode list in, file contents out. No I/O, no clock, no locale, so the same
// manifests always produce byte-identical files.

import { ASSET_DIR } from './paths.mjs'

export const SHOW = Object.freeze({
  name: 'The Late Cluster with Larry Nx',
  shortName: 'The Late Cluster',
  premise: "A weekly late-night talk show about Bluesky's simcluster, performed by synthesized puppet heads in your browser.",
})

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/** Escape text for HTML element content and double- or single-quoted attribute values. */
export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** "2026-11-13" -> "13 NOV 2026", without touching the runtime's locale or time zone. */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

/** 3 -> "003" */
export const pad3 = (n) => String(n).padStart(3, '0')

/** Episode folder, relative to the site root, always with a trailing slash. */
export const episodePath = (ep) => `episodes/${encodeURIComponent(ep.id)}/`
const thumbPath = (ep) => `${episodePath(ep)}thumbnail.jpg`

/** Normalize SITE_URL to an absolute http(s) URL ending in "/", or undefined when unset. */
export function normalizeSiteUrl(raw) {
  if (raw === undefined || raw === null || String(raw).trim() === '') return undefined
  let u
  try {
    u = new URL(String(raw).trim())
  } catch {
    throw new Error(`SITE_URL is not a URL: ${JSON.stringify(raw)}`)
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error(`SITE_URL must be http(s): ${JSON.stringify(raw)}`)
  u.search = ''
  u.hash = ''
  if (!u.pathname.endsWith('/')) u.pathname += '/'
  return u.href
}

// ------------------------------------------------------------------ pieces

function thumb(ep, { eager = false } = {}) {
  if (!ep.hasThumbnail) {
    return `<span class="thumb thumb-empty"><span>EP ${pad3(ep.number)}</span></span>`
  }
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"'
  return `<span class="thumb"><img src="${esc(thumbPath(ep))}" alt="" width="1280" height="800" decoding="async" ${loading}></span>`
}

function dateEl(ep) {
  return `<time datetime="${esc(ep.airDate)}">${esc(formatDate(ep.airDate))}</time>`
}

function featured(ep) {
  const href = esc(episodePath(ep))
  return `
    <section class="latest" aria-labelledby="latest-h">
      <h2 class="label" id="latest-h">Latest episode</h2>
      <article class="feature">
        <a class="feature-thumb" href="${href}" tabindex="-1" aria-hidden="true">${thumb(ep, { eager: true })}</a>
        <div class="feature-text">
          <p class="epno">Episode ${pad3(ep.number)}</p>
          <h3 class="feature-title">${esc(ep.title)}</h3>
          <p class="airdate">Aired ${dateEl(ep)}</p>${ep.description ? `
          <p class="desc">${esc(ep.description)}</p>` : ''}
          <p class="watch-row"><a class="watch" href="${href}">Watch<span class="vh"> episode ${pad3(ep.number)}, ${esc(ep.title)}</span></a></p>
        </div>
      </article>
    </section>`
}

function card(ep) {
  return `
        <li class="card">
          ${thumb(ep)}
          <p class="card-meta"><span class="card-no">EP ${pad3(ep.number)}</span> ${dateEl(ep)}</p>
          <h3 class="card-title"><a href="${esc(episodePath(ep))}">${esc(ep.title)}</a></h3>${ep.description ? `
          <p class="card-desc">${esc(ep.description)}</p>` : ''}
        </li>`
}

function archive(rest) {
  if (rest.length === 0) return ''
  const count = rest.length === 1 ? '1 earlier episode' : `${rest.length} earlier episodes`
  return `
    <section class="archive" aria-labelledby="archive-h">
      <h2 class="label" id="archive-h">The archive <span class="count">${count}</span></h2>
      <ol class="grid" role="list">${rest.map(card).join('')}
      </ol>
    </section>`
}

function emptyState() {
  return `
    <section class="empty" aria-labelledby="empty-h">
      <h2 class="empty-title" id="empty-h">No episodes yet</h2>
      <p>The Formants are still tuning. The first episode airs soon.</p>
    </section>`
}

function head({ episodes, siteUrl }) {
  const latest = episodes[0]
  const lines = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<meta name="color-scheme" content="dark">`,
    `<title>${esc(SHOW.name)}</title>`,
    `<meta name="description" content="${esc(SHOW.premise)}">`,
    `<link rel="icon" href="data:,">`,
    `<link rel="preload" href="${ASSET_DIR}/fonts/AVHersheySimplexMedium.otf" as="font" type="font/otf" crossorigin>`,
    `<link rel="stylesheet" href="${ASSET_DIR}/site.css">`,
    `<link rel="alternate" type="application/json" href="episodes.json" title="Episode list">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(SHOW.name)}">`,
    `<meta property="og:title" content="${esc(SHOW.name)}">`,
    `<meta property="og:description" content="${esc(SHOW.premise)}">`,
  ]
  if (siteUrl) {
    lines.push(`<link rel="canonical" href="${esc(siteUrl)}">`)
    lines.push(`<meta property="og:url" content="${esc(siteUrl)}">`)
    if (latest?.hasThumbnail) {
      lines.push(`<meta property="og:image" content="${esc(new URL(thumbPath(latest), siteUrl).href)}">`)
      lines.push(`<meta property="og:image:width" content="1280">`)
      lines.push(`<meta property="og:image:height" content="800">`)
      lines.push(`<meta property="og:image:alt" content="${esc(`Title card of episode ${pad3(latest.number)}: ${latest.title}`)}">`)
      lines.push(`<meta name="twitter:card" content="summary_large_image">`)
    }
  }
  return lines.map((l) => `  ${l}`).join('\n')
}

// ------------------------------------------------------------------ pages

/** The archive page, dist/index.html. `episodes` must already be sorted newest first. */
export function renderIndex(episodes, { siteUrl } = {}) {
  const [latest, ...rest] = episodes
  const main = latest ? featured(latest) + archive(rest) : emptyState()
  return `<!doctype html>
<html lang="en">
<head>
${head({ episodes, siteUrl })}
</head>
<body>
  <header class="masthead">
    <h1 class="wordmark"><span class="wm-the">The Late</span> <span class="wm-cluster">Cluster</span> <span class="wm-with">with Larry Nx</span></h1>
    <p class="premise">${esc(SHOW.premise)}</p>
  </header>
  <main>${main}
  </main>
  <footer class="foot">
    <p>A new episode every week.${latest ? ` <a href="latest/">Latest episode</a>.` : ''} <a href="episodes.json">Episode list as JSON</a>.</p>
    <p class="credits">Set in AVHershey Simplex and Archivo.</p>
  </footer>
</body>
</html>
`
}

/** dist/latest/index.html: a redirect to the newest episode, or back to the archive if none. */
export function renderLatest(episodes) {
  const latest = episodes[0]
  const target = latest ? `../${episodePath(latest)}` : '../'
  const label = latest ? `Episode ${pad3(latest.number)}: ${latest.title}` : 'the archive'
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="robots" content="noindex">
  <title>Latest episode · ${esc(SHOW.shortName)}</title>
  <meta http-equiv="refresh" content="0; url=${esc(target)}">
  <link rel="icon" href="data:,">
  <style>body{margin:0;padding:24px;background:#000;color:#eef6f8;font:16px/1.5 system-ui,sans-serif}a{color:#ffc861}</style>
</head>
<body>
  <p>Taking you to <a href="${esc(target)}">${esc(label)}</a>.</p>
</body>
</html>
`
}

/** dist/episodes.json: the published episodes, newest first, for scripts and the bot. */
export function renderEpisodesJson(episodes, { siteUrl } = {}) {
  const list = episodes.map((ep) => {
    const out = {
      id: ep.id,
      number: ep.number,
      title: ep.title,
      description: ep.description,
      airDate: ep.airDate,
      ...(ep.week ? { week: ep.week } : {}),
      path: episodePath(ep),
      thumbnail: ep.hasThumbnail ? thumbPath(ep) : null,
    }
    if (siteUrl) out.url = new URL(episodePath(ep), siteUrl).href
    return out
  })
  const doc = {
    show: { name: SHOW.name, premise: SHOW.premise },
    ...(siteUrl ? { siteUrl } : {}),
    latest: episodes[0]?.id ?? null,
    episodes: list,
  }
  return JSON.stringify(doc, null, 2) + '\n'
}
