// Do the committed builds match their sources? Node builtins only.
//
// Every published episode in episodes/ has a build in dist/episodes/<id>/ whose manifest
// sourceHash matches its source and in which every rundown segment's audio and telemetry exist
// (plus index.html and thumbnail.jpg). Every build in dist/episodes/ has a published source.
// Drafts are ignored. Returns { ok, results: [{ id, ok, problems }] }.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ID_RE, layout, listEpisodeIds, readEpisodeJson, EpisodeError, isFile } from './episodes.mjs'
import { sourceHash } from './hash.mjs'
import { segmentAssets } from './build.mjs'

export function verifyRepo(root) {
  const L = layout(root)
  const results = []
  const published = new Set()
  let drafts = 0
  for (const id of listEpisodeIds(root)) {
    const dir = join(L.episodes, id)
    const problems = []
    let meta
    try {
      meta = readEpisodeJson(join(dir, 'episode.json'))
    } catch (e) {
      if (!(e instanceof EpisodeError)) throw e
      results.push({ id, ok: false, problems: [e.message.replace(`${dir}/`, '')] })
      continue
    }
    if (meta.id !== id) problems.push(`episode.json id is ${JSON.stringify(meta.id)}`)
    if (meta.status === 'draft') {
      drafts++
      continue
    }
    published.add(id)
    const out = join(L.dist, id)
    const manFile = join(out, 'episode.json')
    if (!existsSync(manFile)) {
      results.push({ id, ok: false, problems: [...problems, `no build (dist/episodes/${id}/episode.json): npm run build -- ${id}`] })
      continue
    }
    let man
    try {
      man = JSON.parse(readFileSync(manFile, 'utf8'))
    } catch (e) {
      results.push({ id, ok: false, problems: [...problems, `dist/episodes/${id}/episode.json: ${e.message}`] })
      continue
    }
    const want = sourceHash(dir, meta.rundown)
    if (man?.build?.sourceHash !== want) problems.push(`stale build: sourceHash ${String(man?.build?.sourceHash).slice(0, 12)} != source ${want.slice(0, 12)}: npm run build -- ${id}`)
    for (const f of ['index.html', 'thumbnail.jpg', ...meta.rundown.flatMap(segmentAssets)]) if (!isFile(join(out, f))) problems.push(`missing dist/episodes/${id}/${f}`)
    results.push({ id, ok: !problems.length, problems })
  }
  if (existsSync(L.dist)) {
    for (const d of readdirSync(L.dist, { withFileTypes: true })) {
      if (d.name.startsWith('.') || published.has(d.name)) continue
      const why = ID_RE.test(d.name) && existsSync(join(L.episodes, d.name, 'episode.json')) ? 'its source is a draft' : 'no source in episodes/'
      results.push({ id: d.name, ok: false, problems: [`orphan build dist/episodes/${d.name}: ${why}`] })
    }
  }
  return { ok: results.every((r) => r.ok), results, published: published.size, drafts }
}
