# Brief: bring the two new segments into the episode and set the new running order

- **Role:** `builder`
- **Episode:** `episodes/002-2026-w47/`. The two new segments were made in
  `episodes/002-commissions-w47/` and are finished there: scripted, fitted, rendered, staged.
- **Write:** in `episodes/002-2026-w47/`: `segments/making-of-inward/` and
  `segments/riemann-breaking-news/` (new folders, copied), `cast.js`, `looks.js`, `episode.json`,
  `production/sources.json`, and the rendered audio and telemetry of the two new segments.
  Nothing in any existing segment folder, and nothing in `packages/`.

## Read

- `packages/show/README.md` (the episode's files; cast and looks) and
  `packages/show/tools/README.md` only for `render`, `check` and `shoot`
- `episodes/002-2026-w47/production/assembly-2.md`: the running order, with reasons
- `episodes/002-2026-w47/cast.js`, `looks.js`, `episode.json`, `production/sources.json`
- `episodes/002-commissions-w47/cast.js`, `looks.js`, `production/sources.json`, and the two
  segment folders `segments/making-of-inward/` and `segments/riemann-breaking-news/`
- `packages/writers-room/src/stage/late.mjs` around the assemble stage, for how the pipeline's
  tool merges sources and guests

Do not read `production/review/`, `docs/ledger/`, `docs/trials/`, `episodes/001-pilot/`, or the
other folders under `episodes/002-commissions-w47/segments/`.

## The task

1. **Copy the two segments** into `episodes/002-2026-w47/segments/`, every file exactly (`cmp`
   them). Their imports are written as `@late-cluster/episode/segments/<slug>/…`, so they resolve
   in the new episode without change; if any import names the old episode, say so and fix only
   that.
2. **Guests.** `riemann-breaking-news` has three guests: davidcrespo, moultano and
   shimmermathlabs. Add their entries to `episodes/002-2026-w47/cast.js` exactly as they stand in
   the commission's `cast.js`, voices included, and their looks to `looks.js` exactly as in the
   commission's `looks.js`. Check that no cast id collides with one already in this episode. If a
   look's colour is too close to a guest already in this episode, say so in your report and
   change nothing: the two are never on screen together.
3. **Sources.** Merge the two segments' records from the commission's
   `production/sources.json` into this episode's, each record carrying its segment, as the
   pipeline's tool would. `making-of-inward` has one credit link and no real account.
4. **Running order.** Set `episode.json` `rundown` to the order in `production/assembly-2.md`:
   `made-pen-plotter-replies`, `bluesky-account`, `interview-yonderdavid`,
   `riemann-breaking-news`, `making-of-inward`, `top-chicken`,
   `made-polyhedral-coffee-simulator`, `music`, `made-mobius-chess-ringmate`. Keep the title and
   `status: draft`. Update the description only if it names something that was cut.
5. **Audio.** Render the two copied segments in this episode
   (`npm run render -- 002-2026-w47 <slug>`) and confirm each rendered length matches the
   commission's (103.4 s and 89.5 s) and that `cues.json` is identical to the copy, so the
   staging still fits. Do not render any other segment, and never `music`.
6. **Check.** `npm run check -- 002-2026-w47`. Another builder is staging `bluesky-account` at
   the same time, so a line about that segment not being staged yet is expected. Shoot one frame
   from the middle of each of the two copied segments and look at it, to confirm they draw in
   this episode as they did in the other.
7. **Credits.** The episode's end roll names the real accounts whose personas were played. Three
   accounts left the episode with the trim and three joined with the news segment. Say in your
   report where the end roll takes its names from, and whether it is now right without a change.

## Rules

- No script's words, no `as`, no voice and no staging changes. This is carrying, not editing.
- No git write commands, no network, never `.secrets`.

Reply in a short list: what you copied and merged, the two rendered lengths, what `check` says,
the total of all nine segments' lengths from their `cues.json`, and the answer on the credits.
