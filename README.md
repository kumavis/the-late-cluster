# The Late Cluster

A weekly late-night talk show performed by synthesized puppet heads. The voices are rendered
offline by the CHIMERA physical-model vocal synth, and the browser plays them back on glowing
vector-scope 3D heads built with Vite and three.js.

How the repository fits together (the studio, one folder per episode, committed builds, the
scraper, the bot and the weekly pipeline) is in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

```
packages/show/        the studio: page runtime, offline tools, reference episode (packages/show/README.md)
episodes/<id>/        one folder per episode: episode.json, segments/, thumbnail.jpg
dist/episodes/<id>/   each published episode's committed build
scripts/              repo commands (Node builtins only)
show.config.json      show-wide settings: the public site URL (siteUrl)
```

## Quick start

Requires Node 22 (see `.nvmrc`). Rendering audio also needs `bun` and `ffmpeg`; shooting frames
needs Playwright's Chromium (`npx playwright install chromium`).

```bash
npm install                                     # once
npm run dev -- 1                                # the pilot at http://localhost:5173/
npm run episode:new -- --title "Second Show"    # the next episode, as a draft
npm run segment:new -- 2 cold-open              # a segment skeleton, added to the rundown
npm run render -- 2 cold-open                   # its audio, telemetry and cues
npm run shoot -- 2 cold-open 1 3                # frozen frames into shots/
npm run build -- 2 --preview                    # a draft's preview build (preview/, gitignored)
npm run build -- 1                              # a published episode's build into dist/episodes/
npm run verify                                  # committed builds match their sources
npm test
```

**Configuration and secrets are kept apart.** Settings that are not secret (the site URL, the
show's Bluesky handle and DID) are committed, in `show.config.json` and the packages' own config
files. Secrets (the Bluesky app password, the Cloudflare API token) come only from the
environment: locally from `.secrets` at the repo root (gitignored; copy `.secrets.example`),
which `npm run bot` and `npm run terraform` load themselves, and in CI from repository secrets.

Every command is listed in the Commands table of `docs/ARCHITECTURE.md`. Writing segments is
covered in `packages/show/README.md` (the module and the `show` API) and
`packages/show/tools/README.md` (the script format and the audio tools).

## Provenance

The studio and the pilot were imported from the `kumavis/vibe-dump` monorepo, path
`packages/late-cluster`, at commit `2bcd173b`.
