// Building an episode, minus the bundler. Node builtins only, so the parts that can lose data
// (choosing where each rendered asset comes from, the swap) are testable without Vite.
//
//   planBuild(ep, { preview })        → { finalDir, assets, problems, warnings }
//   buildEpisode(ep, { preview, bundle(outDir) })   bundle the page into outDir, then add the
//                                     audio, telemetry, thumbnail and manifest; swap into place
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { EpisodeError, isFile } from './episodes.mjs'
import { sourceHash, studioHash } from './hash.mjs'
import { replaceDir } from './swap.mjs'

/** the rendered files every rundown segment needs */
export const segmentAssets = (seg) => [`audio/${seg}.mp3`, `tele/${seg}.bin`]

/**
 * Where everything comes from. A rendered asset is taken from the episode's public/ (a fresh
 * render) or else carried forward from the build being replaced (for a preview, also from the
 * committed build). Nothing is read yet; problems are reasons to refuse.
 */
export function planBuild(ep, { preview = false } = {}) {
  const problems = []
  const warnings = []
  if (ep.ref) throw new EpisodeError('ref (the reference episode) is never built; use npm run dev -- ref')
  if (ep.meta.status === 'draft' && !preview) throw new EpisodeError(`${ep.id} is a draft and drafts are not built into dist/; preview it with: npm run build -- ${ep.id} --preview (into ${ep.rel(ep.previewDir)}/, gitignored)`, 1)
  const finalDir = preview ? ep.previewDir : ep.distDir
  if (!ep.rundown.length) problems.push('the rundown is empty')
  const from = [['public', ep.publicDir], ['current build', finalDir], ...(preview ? [['dist', ep.distDir]] : [])]
  const assets = []
  for (const seg of ep.rundown) {
    for (const f of ['script.js', 'index.js', 'cues.json']) if (!isFile(ep.segFile(seg, f))) problems.push(`${seg}: no ${ep.rel(ep.segFile(seg, f))}`)
    for (const rel of segmentAssets(seg)) {
      const hit = from.find(([, dir]) => isFile(join(dir, rel)))
      if (hit) assets.push({ rel, src: join(hit[1], rel), from: hit[0] })
      else problems.push(`${seg}: not rendered (no ${rel} in ${ep.rel(ep.publicDir)}/ or ${ep.rel(finalDir)}/): npm run render -- ${ep.id} ${seg}`)
    }
  }
  if (!isFile(join(ep.dir, 'thumbnail.jpg'))) {
    if (preview) warnings.push(`no thumbnail.jpg yet (npm run thumbnail -- ${ep.id})`)
    else problems.push(`no ${ep.rel(join(ep.dir, 'thumbnail.jpg'))}: npm run thumbnail -- ${ep.id}`)
  }
  return { finalDir, assets, problems, warnings }
}

/** the manifest: the source episode.json plus { build: { sourceHash, studioHash } } */
export function manifest(ep) {
  const { build, ...meta } = ep.meta
  return { ...meta, build: { sourceHash: sourceHash(ep.dir, ep.rundown), studioHash: studioHash(ep.studio) } }
}

/**
 * Build an episode: `bundle(outDir)` writes the page (index.html, assets/, fonts/) into a fresh
 * temp folder; this adds the rendered assets, thumbnail and manifest and swaps the result in.
 */
export async function buildEpisode(ep, { preview = false, bundle }) {
  const plan = planBuild(ep, { preview })
  if (plan.problems.length) throw new EpisodeError(`cannot build ${ep.id}:\n  ${plan.problems.join('\n  ')}`, 1)
  const man = manifest(ep)
  await replaceDir(plan.finalDir, async (tmp) => {
    await bundle(tmp)
    for (const a of plan.assets) {
      const dest = join(tmp, a.rel)
      mkdirSync(dirname(dest), { recursive: true })
      copyFileSync(a.src, dest)
    }
    if (isFile(join(ep.dir, 'thumbnail.jpg'))) copyFileSync(join(ep.dir, 'thumbnail.jpg'), join(tmp, 'thumbnail.jpg'))
    writeFileSync(join(tmp, 'episode.json'), JSON.stringify(man, null, 2) + '\n')
    if (!existsSync(join(tmp, 'index.html'))) throw new Error('the bundler wrote no index.html')
  })
  return { ...plan, manifest: man }
}
