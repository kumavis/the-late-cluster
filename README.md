# The Late Cluster

A late-night talk show performed by synthesized puppet heads. The voices are rendered offline by
the CHIMERA physical-model vocal synth, and the browser plays them back on glowing vector-scope 3D
heads built with Vite and three.js.

The app lives in `packages/late-cluster`. Its own README covers the architecture, the script
format and the URL parameters, and `packages/late-cluster/tools/README.md` covers the offline
audio tools.

## Quick start

Requires Node 20 or newer (see `.nvmrc`). The audio tools also need `bun` and `ffmpeg`.

```bash
npm install          # once, at the repo root
npm run dev          # dev server at http://localhost:5173/
npm run build        # production build into packages/late-cluster/dist/

cd packages/late-cluster
bun tools/render.ts demo           # render a segment's audio, telemetry and cues
bun tools/check.ts demo            # verify those outputs
node tools/shoot.mjs demo 3 14.5   # frozen frames into ./shots/demo/
```

## Provenance

Imported from the `kumavis/vibe-dump` monorepo, path `packages/late-cluster`, at commit
`2bcd173b`. The root `vite.config.shared.js` is copied from that monorepo so the package's own
Vite config works unmodified.
