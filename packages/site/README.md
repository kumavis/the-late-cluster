# @late-cluster/site

Generates the archive page of The Late Cluster from the committed episode manifests. Node 22,
Node builtins only, no dependencies, no client-side JavaScript.

```sh
npm run site                 # from the repo root: dist/episodes/*/episode.json -> dist/
npm run preview              # generate, then serve dist/ at http://127.0.0.1:4173/
npm test -w @late-cluster/site
```

Directly: `node packages/site/bin/build-site.mjs [inDir] [outDir]` (both default to the repo's
`dist/`, output defaults to the input) and `node packages/site/bin/serve.mjs [dir] [--port N]`.

## What it reads

Every `<inDir>/episodes/<id>/episode.json` (the format is in `docs/ARCHITECTURE.md`). An episode
is listed when `status` is `"published"`, `id` is `NNN-slug` and matches its folder, `number` is
a positive integer, `title` is non-empty, `airDate` is a real `YYYY-MM-DD` date, and the folder
has an `index.html`. `description` and `week` are optional. Drafts are skipped quietly; anything
else that is wrong is skipped with a warning on stderr, and the build still succeeds. A missing
`thumbnail.jpg` gets a placeholder card. Order is newest first: by `number`, then `airDate`.

## What it writes

Only these paths in the output directory (exported as `GENERATED_PATHS` from `src/paths.mjs`,
for `scripts/verify.mjs` and `.gitignore`). They are deleted and rewritten on every run, and
nothing under `episodes/` is ever written.

| path | |
|---|---|
| `index.html` | the archive: the newest episode featured, then the rest, or an empty state |
| `episodes.json` | the published episodes, newest first, with relative `path` and `thumbnail` |
| `latest/index.html` | redirects to the newest episode (to the archive when there is none) |
| `site-assets/` | `site.css` and the fonts with their licences, copied from `assets/` |

Every link is relative, so the site works at any base path and from a local server. Set
`SITE_URL` (for example `https://user.github.io/the-late-cluster/`) to add a canonical link,
`og:url`, `og:image` and absolute `url`s in `episodes.json`; without it they are left out.
The deploy workflow sets it from the Pages configuration.

The output is deterministic: no timestamps, no locale-dependent formatting, sorted inputs. The
same manifests always produce the same bytes.

## Fonts

`assets/fonts/` holds AVHershey Simplex Light and Medium (CC0 / WTFPL, see
`AVHERSHEY-LICENSE.txt`) for headings and labels, and Archivo (SIL OFL 1.1, see `OFL.txt`) for
running text, the same files the show uses.
