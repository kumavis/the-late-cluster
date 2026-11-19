// A tiny static file server for previewing dist/ locally. Node builtins only.
// Serves index.html for directories, redirects "dir" to "dir/" so relative links resolve the
// same way they do on GitHub Pages, and answers single byte-range requests (audio seeking).

import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'

export const MIME = Object.freeze({
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.mp3': 'audio/mpeg',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.bin': 'application/octet-stream',
})

export const mimeType = (file) => MIME[extname(file).toLowerCase()] ?? 'application/octet-stream'

function send(res, code, body, headers = {}) {
  res.writeHead(code, { 'content-type': 'text/plain; charset=utf-8', 'content-length': Buffer.byteLength(body), ...headers })
  res.end(res.req.method === 'HEAD' ? undefined : body)
}

/** @param {string} rootDir directory to serve */
export function createStaticServer(rootDir) {
  const root = resolve(rootDir)
  return createServer(async (req, res) => {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'method not allowed\n', { allow: 'GET, HEAD' })
      const url = new URL(req.url, 'http://localhost')
      let path
      try {
        path = decodeURIComponent(url.pathname)
      } catch {
        return send(res, 400, 'bad request\n')
      }
      if (path.includes('\0')) return send(res, 400, 'bad request\n')
      let file = resolve(root, '.' + path)
      if (file !== root && !file.startsWith(root + sep)) return send(res, 403, 'forbidden\n')

      let st = await stat(file).catch(() => null)
      if (st?.isDirectory()) {
        if (!url.pathname.endsWith('/')) {
          return send(res, 301, 'moved\n', { location: url.pathname + '/' + url.search })
        }
        file = join(file, 'index.html')
        st = await stat(file).catch(() => null)
      }
      if (!st?.isFile()) return send(res, 404, `not found: ${path}\n`)

      const headers = {
        'content-type': mimeType(file),
        'cache-control': 'no-cache',
        'accept-ranges': 'bytes',
      }
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '')
      if (range && (range[1] || range[2])) {
        let start = range[1] ? Number(range[1]) : Math.max(0, st.size - Number(range[2]))
        let end = range[1] && range[2] ? Math.min(Number(range[2]), st.size - 1) : st.size - 1
        if (start > end || start >= st.size) {
          return send(res, 416, 'range not satisfiable\n', { 'content-range': `bytes */${st.size}` })
        }
        res.writeHead(206, { ...headers, 'content-range': `bytes ${start}-${end}/${st.size}`, 'content-length': end - start + 1 })
        if (req.method === 'HEAD') return res.end()
        return createReadStream(file, { start, end }).pipe(res)
      }
      res.writeHead(200, { ...headers, 'content-length': st.size })
      if (req.method === 'HEAD') return res.end()
      createReadStream(file).pipe(res)
    } catch (e) {
      if (!res.headersSent) send(res, 500, `error: ${e.message}\n`)
      else res.destroy(e)
    }
  })
}
