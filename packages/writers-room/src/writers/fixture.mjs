// The fixture writer: copies prepared outputs into place, so the whole pipeline runs with no model.
//
// A fixture folder has one subfolder per creative stage (pitch/, write/, direct/, self-check/),
// each mirroring episodes/<id>/. `<stage>@<n>/` overlays it on attempt n (to exercise the retry
// loop). In text files, __ID__, __NUMBER__ (001), __WEEK__ and __TITLE__ are substituted. Two
// names are special: `episode.patch.json` is merged into episode.json, and `lore.append.md` is
// appended to the lore file (once: not when the episode's E-NNN entry is already there), and its
// lines starting with `| NNN |` are inserted into the rotation log table instead.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { formatEpisodeJson } from '../repo.mjs'

const TEXT = /\.(js|mjs|json|md|txt)$/

export function fixtureWriter({ dir, print = () => {} } = {}) {
  if (!dir || !existsSync(dir)) throw new Error(`the fixture writer needs --fixture <dir> (got ${dir})`)
  return {
    name: 'fixture',
    async run({ stage, paths, id, week, attempt = 1, loreFile }) {
      const number = String(paths.number).padStart(3, '0')
      const meta = JSON.parse(readFileSync(paths.episodeJson, 'utf8'))
      const sub = (s) => s.replaceAll('__ID__', id).replaceAll('__NUMBER__', number).replaceAll('__WEEK__', week).replaceAll('__TITLE__', meta.title ?? '')
      const layers = [join(dir, stage), ...Array.from({ length: attempt - 1 }, (_, k) => join(dir, `${stage}@${k + 2}`))].filter((d) => existsSync(d))
      if (!layers.length) return { status: 'failed', detail: `no fixture for ${stage} in ${dir}` }
      let n = 0
      for (const layer of layers) {
        for (const rel of files(layer)) {
          const from = join(layer, rel)
          if (rel === 'episode.patch.json') {
            const cur = JSON.parse(readFileSync(paths.episodeJson, 'utf8'))
            writeFileSync(paths.episodeJson, formatEpisodeJson({ ...cur, ...JSON.parse(sub(readFileSync(from, 'utf8'))) }))
          } else if (rel === 'lore.append.md') {
            appendLore(loreFile, sub(readFileSync(from, 'utf8')), number)
          } else {
            const to = join(paths.dir, rel)
            mkdirSync(dirname(to), { recursive: true })
            if (TEXT.test(rel)) writeFileSync(to, sub(readFileSync(from, 'utf8')))
            else cpSync(from, to)
          }
          n++
        }
      }
      print(`fixture ${stage}: ${n} files from ${layers.map((l) => l.split('/').slice(-1)[0]).join(' + ')}`)
      return { status: 'done' }
    },
  }
}

function files(d, prefix = '') {
  const out = []
  for (const e of readdirSync(d)) {
    const p = join(d, e)
    if (statSync(p).isDirectory()) out.push(...files(p, `${prefix}${e}/`))
    else out.push(`${prefix}${e}`)
  }
  return out.sort()
}

function appendLore(file, text, number) {
  const cur = readFileSync(file, 'utf8')
  if (new RegExp(`\\*\\*E-${number}\\b`).test(cur)) return
  const rows = text.split('\n').filter((l) => new RegExp(`^\\|\\s*${number}\\s*\\|`).test(l))
  const rest = text.split('\n').filter((l) => !rows.includes(l)).join('\n')
  let out = cur
  if (rows.length) {
    const lines = out.split('\n')
    const h = lines.findIndex((l) => /^##\s+Rotation log/i.test(l))
    let k = h + 1
    while (k < lines.length && !/^\|/.test(lines[k])) k++
    while (k < lines.length && /^\|/.test(lines[k])) k++
    lines.splice(k, 0, ...rows)
    out = lines.join('\n')
  }
  writeFileSync(file, out.replace(/\n*$/, '\n') + rest.replace(/^\n*/, '\n'))
}
