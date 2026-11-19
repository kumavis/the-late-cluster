// The seam between the studio and an episode. The studio's page never reads episode files by
// path: it imports `virtual:late-cluster/episode`, which this plugin generates from the episode
// the dev server or build was started for. Two aliases complete it:
//
//   @late-cluster/show/<path>     → packages/show/src/<path>   (episodes import studio code this way)
//   @late-cluster/episode/<path>  → the current episode's folder
//
// The virtual module exports
//   episode   the episode.json fields the page uses (id, number, title, airDate, …, rundown)
//   modules   { <seg>: () => import(index.js) }     lazy chunks via import.meta.glob
//   cues      { <seg>: () => import(cues.json) }    lazy chunks via import.meta.glob
//   cast      the episode's cast.js CAST (or {}): merged over the studio's house cast
//   looks     the episode's looks.js LOOKS (or {}): applied with defineLook
//
// In dev every segment folder is loadable (?seg=<id>); a build bundles the rundown's segments only.
// The dev server serves audio/ and tele/ from the episode's public/ (a fresh render) and falls
// back to its committed build in dist/episodes/<id>/.
import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readEpisodeJson } from '../../../scripts/lib/episodes.mjs'

export const STUDIO = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]$/, '')
const VIRTUAL = 'virtual:late-cluster/episode'
const RESOLVED = '\0' + VIRTUAL
const SHOW_NAME = 'The Late Cluster with Larry Nx'

/** the Vite config for one episode (dev server or build); `ep` comes from resolveEpisode() */
export function showConfig(ep, { outDir } = {}) {
  return {
    configFile: false,
    root: STUDIO,
    base: './',
    publicDir: join(STUDIO, 'public'),
    resolve: {
      alias: [
        { find: /^@late-cluster\/show\//, replacement: join(STUDIO, 'src') + '/' },
        { find: /^@late-cluster\/episode\//, replacement: ep.dir + '/' },
      ],
    },
    server: { fs: { allow: [ep.root] } },
    build: { outDir: outDir ?? join(STUDIO, 'dist'), emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 4096 },
    plugins: [episodePlugin(ep)],
  }
}

/** the fields of episode.json the page sees */
const PAGE_FIELDS = ['id', 'number', 'slug', 'title', 'description', 'airDate', 'week', 'status', 'rundown']

export function episodePlugin(ep) {
  let command = 'serve'
  const meta = () => readEpisodeJson(join(ep.dir, 'episode.json'))
  return {
    name: 'late-cluster:episode',
    config(_, env) {
      command = env.command
    },
    resolveId(id) {
      if (id === VIRTUAL) return RESOLVED
    },
    load(id) {
      if (id !== RESOLVED) return
      this.addWatchFile(join(ep.dir, 'episode.json'))
      const m = meta()
      const page = Object.fromEntries(PAGE_FIELDS.filter((k) => k in m).map((k) => [k, m[k]]))
      const globs = (file) => JSON.stringify(command === 'build' ? m.rundown.map((s) => `@late-cluster/episode/segments/${s}/${file}`) : [`@late-cluster/episode/segments/*/${file}`])
      const optional = (file, name, as) => (existsSync(join(ep.dir, file)) ? `export { ${name} as ${as} } from '@late-cluster/episode/${file}'` : `export const ${as} = {}`)
      return [
        `export const episode = ${JSON.stringify(page)}`,
        // keys are the segment ids (the folder name before the file)
        `const bySeg = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k.split('/').at(-2), v]))`,
        `export const modules = bySeg(import.meta.glob(${globs('index.js')}))`,
        `export const cues = bySeg(import.meta.glob(${globs('cues.json')}, { import: 'default' }))`,
        optional('cast.js', 'CAST', 'cast'),
        optional('looks.js', 'LOOKS', 'looks'),
        '',
      ].join('\n')
    },
    configureServer(server) {
      // rendered assets: the episode's public/ first, then its committed build
      server.middlewares.use((req, res, next) => {
        const path = decodeURIComponent((req.url ?? '').split('?')[0]).replace(/^\//, '')
        if (!/^(audio|tele)\/[a-z0-9-]+\.(mp3|bin)$/.test(path)) return next()
        const file = ep.asset(path)
        if (!file) {
          res.statusCode = 404
          return res.end(`not rendered: ${path} (looked in ${ep.rel(ep.publicDir)}/ and ${ep.distDir ? ep.rel(ep.distDir) + '/' : '-'})`)
        }
        res.setHeader('Content-Type', path.endsWith('.mp3') ? 'audio/mpeg' : 'application/octet-stream')
        res.setHeader('Cache-Control', 'no-cache')
        createReadStream(file).pipe(res)
      })
    },
    transformIndexHtml(html) {
      return episodeHtml(html, meta(), ep, process.env.SITE_URL)
    },
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** the page title for an episode */
export function pageTitle(m) {
  return `${m.title} · ${SHOW_NAME}${typeof m.number === 'number' && m.number > 0 ? ` · Episode ${m.number}` : ''}`
}

/** per-episode <title>, description and Open Graph tags (og:image absolute only with SITE_URL) */
export function episodeHtml(html, m, ep, siteUrl) {
  const title = pageTitle(m)
  const desc = m.description || 'A late-night talk show performed by synthesized puppet heads.'
  const base = siteUrl ? siteUrl.replace(/\/+$/, '') + `/episodes/${ep.id}/` : null
  const og = [
    ['og:type', 'video.episode'],
    ['og:site_name', 'The Late Cluster'],
    ['og:title', title],
    ['og:description', desc],
    ['og:image', base ? base + 'thumbnail.jpg' : 'thumbnail.jpg'],
    ...(base ? [['og:url', base]] : []),
  ]
  const tags = [
    ...og.map(([k, v]) => `    <meta property="${k}" content="${esc(v)}" />`),
    `    <meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n')
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(desc)}" />\n${tags}`)
}
