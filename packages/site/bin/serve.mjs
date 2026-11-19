#!/usr/bin/env node
// Serve a directory over HTTP for local preview (default: the repo's dist/).
//
//   node packages/site/bin/serve.mjs [dir] [--port 4173] [--host 127.0.0.1]

import { relative } from 'node:path'
import { DEFAULT_DIST } from '../src/build.mjs'
import { createStaticServer } from '../src/serve.mjs'

const args = process.argv.slice(2)
let dir = DEFAULT_DIST
let port = Number(process.env.PORT) || 4173
let host = '127.0.0.1'
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--port' || a === '-p') port = Number(args[++i])
  else if (a === '--host') host = args[++i]
  else if (a === '-h' || a === '--help') {
    console.log('usage: serve.mjs [dir] [--port 4173] [--host 127.0.0.1]')
    process.exit(0)
  } else dir = a
}
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  console.error(`serve: bad port ${port}`)
  process.exit(1)
}

const server = createStaticServer(dir)
server.on('error', (e) => {
  console.error(`serve: ${e.code === 'EADDRINUSE' ? `port ${port} is in use; try --port` : e.message}`)
  process.exit(1)
})
server.listen(port, host, () => {
  const { port: actual } = server.address()
  console.log(`serving ${relative(process.cwd(), dir) || '.'}/ at http://${host === '0.0.0.0' ? 'localhost' : host}:${actual}/  (ctrl-c to stop)`)
})
