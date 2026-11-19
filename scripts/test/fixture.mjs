// A throwaway repository tree for the scripts' tests (Node builtins only).
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { formatEpisodeJson } from '../lib/scaffold.mjs'

export function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'late-cluster-test-'))
  const put = (rel, data) => {
    const f = join(root, rel)
    mkdirSync(dirname(f), { recursive: true })
    writeFileSync(f, data)
    return f
  }
  put('packages/show/reference/episode.json', formatEpisodeJson({ id: 'ref', number: 0, slug: 'reference', title: 'Reference', status: 'draft', rundown: ['demo'] }))
  return { root, put, cleanup: () => rmSync(root, { recursive: true, force: true }) }
}

/** an episode with rendered segments; `dist: true` also writes a matching-looking build (no manifest) */
export function addEpisode(fx, id, { status = 'published', rundown = ['intro', 'outro'], render = 'public', thumbnail = true } = {}) {
  const [num, ...slug] = id.split('-')
  fx.put(`episodes/${id}/episode.json`, formatEpisodeJson({ id, number: Number(num), slug: slug.join('-'), title: slug.join(' '), description: 'A test.', airDate: '2026-11-20', status, rundown }))
  if (thumbnail) fx.put(`episodes/${id}/thumbnail.jpg`, `jpeg of ${id}`)
  for (const seg of rundown) {
    fx.put(`episodes/${id}/segments/${seg}/script.js`, `export default { id: '${seg}', beats: [] }\n`)
    fx.put(`episodes/${id}/segments/${seg}/index.js`, 'export default {}\n')
    fx.put(`episodes/${id}/segments/${seg}/cues.json`, JSON.stringify({ id: seg, audio: `audio/${seg}.mp3`, tele: `tele/${seg}.bin` }))
    const base = render === 'dist' ? `dist/episodes/${id}` : `episodes/${id}/public`
    if (render) {
      fx.put(`${base}/audio/${seg}.mp3`, `mp3 ${seg} from ${render}`)
      fx.put(`${base}/tele/${seg}.bin`, `tele ${seg} from ${render}`)
    }
  }
}

/** a stand-in for Vite: writes an index.html and one asset */
export const fakeBundle = async (out) => {
  mkdirSync(join(out, 'assets'), { recursive: true })
  writeFileSync(join(out, 'index.html'), '<!doctype html><title>test</title>\n')
  writeFileSync(join(out, 'assets', 'app.js'), 'console.log(1)\n')
}
