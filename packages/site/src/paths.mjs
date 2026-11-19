// The files the site generator owns inside the output directory (normally the repo's dist/).
// This is the single source of truth: the generator deletes and rewrites exactly these paths,
// scripts/verify.mjs and the .gitignore rules should match them, and nothing else under dist/
// (in particular dist/episodes/) is ever touched. A trailing slash marks a directory.

/** Subdirectory that holds the archive page's stylesheet and fonts. */
export const ASSET_DIR = 'site-assets'

/** Every path the generator writes, relative to the output directory. */
export const GENERATED_PATHS = Object.freeze([
  'index.html',
  'episodes.json',
  'latest/',
  `${ASSET_DIR}/`,
])

/** The directory the generator must never write into, relative to the output directory. */
export const EPISODES_DIR = 'episodes'

/** The same paths as root-anchored .gitignore lines for a given output directory, e.g. "dist". */
export function gitignoreLines(outDirFromRepoRoot = 'dist') {
  const base = outDirFromRepoRoot.replace(/^\/+|\/+$/g, '')
  return GENERATED_PATHS.map((p) => `/${base}/${p}`)
}
