// A draft as the tools see it: episodes/<ep>/production/drafts/<slug>/script.js (and its own
// cast.js, merged over the episode's), rendered into a scratch folder the studio owns,
// packages/show/tools/.cache/drafts/<ep-id>/<slug>/ (gitignored), never into the episode's
// public/ or segments/. `draftView` gives render, check and analyze an episode-shaped object whose
// one segment is the draft, so they need no second code path.
//
// Pure, Node builtins only (the draft's cast.js is imported by the caller): `node --test` loads it.
import { existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/** a draft slug: the folder name under production/drafts/ */
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** where drafts are rendered: packages/show/tools/.cache/drafts/ */
export const DRAFT_SCRATCH = fileURLToPath(new URL('./.cache/drafts/', import.meta.url))

/** a refusal with an exit code (2: bad arguments or an unknown draft) */
export class DraftError extends Error {
  constructor(message, code = 2) {
    super(message)
    this.code = code
  }
}

/** the draft folders of an episode, sorted */
export function draftSlugs(ep, { readdirSync }) {
  const dir = join(ep.dir, 'production', 'drafts')
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory() && SLUG_RE.test(d.name) && existsSync(join(dir, d.name, 'script.js'))).map((d) => d.name).sort()
}

/** a draft's paths; throws DraftError for a bad slug or a draft with no script.js */
export function resolveDraft(ep, slug, { scratch = DRAFT_SCRATCH } = {}) {
  if (!SLUG_RE.test(String(slug ?? ''))) throw new DraftError(`not a draft slug: ${JSON.stringify(slug)}`)
  const dir = join(ep.dir, 'production', 'drafts', slug)
  const script = join(dir, 'script.js')
  if (!existsSync(script)) throw new DraftError(`no draft ${slug} in ${ep.id} (no ${relative(ep.root ?? ep.dir, script).split(sep).join('/')})`)
  const cast = join(dir, 'cast.js')
  return { slug, dir, script, cast: existsSync(cast) ? cast : null, sources: join(dir, 'sources.json'), out: join(scratch, ep.id, slug) }
}

/**
 * An episode-shaped view whose only segment is the draft: segFile(slug, 'script.js') is the
 * draft's script; cues.json, audio and telemetry live in the draft's scratch folder.
 * `lockId` and `cacheId` keep its lock and Whisper scratch apart from a segment of the same name.
 */
export function draftView(ep, d) {
  const view = {
    ...ep,
    draft: d.slug,
    draftDir: d.dir,
    lockId: `${ep.id}--draft`,
    cacheId: `${ep.id}/drafts`,
    rundown: [d.slug],
    segmentsDir: d.out,
    publicDir: d.out,
    distDir: null,
    segments: () => [d.slug],
    segDir: (seg) => (seg === d.slug ? d.out : join(d.out, '..', seg)),
    segFile: (seg, f) => (f === 'script.js' ? (seg === d.slug ? d.script : join(ep.dir, 'production', 'drafts', seg, 'script.js')) : join(d.out, f)),
    renderPath: (rel) => join(d.out, rel),
    findAsset: (rel) => {
      if (!/^(audio|tele)\/[a-z0-9-]+\.(mp3|bin)$/.test(rel)) return null
      const p = join(d.out, rel)
      return existsSync(p) ? { path: p, from: 'draft' } : null
    },
  }
  view.asset = (rel) => view.findAsset(rel)?.path ?? null
  return view
}

/** the cast a draft sees: the episode's (already merged over the house), then the draft's own */
export function draftCast(episodeCast, own = {}) {
  return { ...episodeCast, ...own }
}

/** pull `--draft <slug>` out of an argument list: { slug, rest } (slug null when absent) */
export function takeDraftArg(args) {
  const i = args.indexOf('--draft')
  if (i < 0) return { slug: null, rest: args.slice() }
  const slug = args[i + 1]
  if (!slug || slug.startsWith('--')) throw new DraftError('--draft needs a slug (a folder under production/drafts/)')
  return { slug, rest: [...args.slice(0, i), ...args.slice(i + 2)] }
}
