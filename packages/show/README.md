# THE LATE CLUSTER with Larry Nx

A late-night talk show about Bluesky's "simcluster" discourse, performed entirely by
[CHIMERA](https://github.com/jamesondh/chimera-vocal-synth) heads: physical-model voices rendered
offline, played back here on glowing vector-scope 3D heads whose tongues, jaws, lips and airflow
move exactly as the engine's did.

This package is the **studio**: everything reusable across episodes (the engine and heads, the
stage, shots, costumes, the drawing kit and props, the `show` API, the title and end cards, the
offline tools). It holds no episode content. Episodes live in `episodes/<id>/` at the repo root,
and the studio's own **reference episode** (`demo` and `kit-tour`) lives in `reference/`,
addressed as `ref`. The layout and the build contract are in
[`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md).

## Quick start

All from the repo root. `<ep>` is an episode number or id (`1`, `001`, the full `001-<slug>`) or `ref`.

```bash
npm install                                   # once
npm run dev -- 1                              # episode 1 → http://localhost:5173/
npm run dev -- ref                            # the reference episode (?seg=demo, ?seg=kit-tour)
npm run render -- ref demo                    # render a segment's audio + telemetry + cues
npm run shoot -- ref demo 3 14.5 31           # frozen frames → shots/ref/demo/demo@3.png …
npm run build -- 1                            # → dist/episodes/<id>/ (works from any sub-path)
```

The script format and the audio tools are documented in [`tools/README.md`](tools/README.md).

URL parameters: `?seg=<id>` (start at that segment), `?seg=<id>&t=<s>&freeze=1` (one exact frame,
no audio, sets `window.__ready`; `seg` may also be `title` or `end`), `?autostart=1&mute=1`
(skip the title card and run silent on the wall clock, for automated runs), `?captions=0`.
Keys: space play/pause · ←/→ seek 5 s · n/p next/previous segment · c captions · f fullscreen.

## Architecture

`src/main.js` boots the CHIMERA wasm engine and the Hershey font, then imports `src/app.js`, which
owns one `Transport` (an audible-playhead clock over one AudioContext, adapted from chimera's
`show/transport.ts`: output-latency aware, decoder-delay aware), one
`Stage` (the 1280×720 canvas) and the puppets. Each segment in the episode's rundown is loaded
lazily (`src/show/segments.js`: module + `cues.json` bundled, mp3 + telemetry fetched by relative
URL, the next one preloaded while the current one plays) into a `Show` (`src/show/show.js`) — the
object your segment directs. Every frame: `show.frame(t)` runs your `direct()`, resolves the shot
into a camera and puppet placements, samples each speaking puppet's telemetry at `t`
(`src/engine/tele.js` decodes the `LCT1` file and interpolates frames) and steps its head; then
`stage.draw(show)` paints set → your `drawBack` → puppets (costume, a dark silhouette, the 3D head
rendered by one shared WebGL renderer, the collar) → set front pieces → audience → your
`drawFront` → chyrons and captions → chimera's glow pass. Everything visual is a function of
`(segment, t)` plus a little eased state (head turns, face springs), so seeking just works.

**The episode seam.** The page never reads episode files by path. `vite/episode.js` is a Vite
plugin that generates the module `virtual:late-cluster/episode` for the episode the dev server
or build was started for: its `episode.json` fields, the segments' modules and cues as lazy
chunks (`import.meta.glob`: every segment folder in dev, the rundown's only in a build), and the
episode's optional `cast.js` / `looks.js`. `src/episode.js` hands those and the episode's id to
`src/roster.js`, the one resolver the page and the tools share, which merges them over the house
cast, and re-exports the rest. Two aliases go with it: `@late-cluster/show/<path>` is `src/<path>` (how
episodes import studio code) and `@late-cluster/episode/<path>` is the episode folder. The dev
server serves `audio/` and `tele/` from `episodes/<id>/public/` (a fresh render) and falls back
to the committed build `dist/episodes/<id>/`.

```
src/
  app.js            flow: title → segments → end card; keyboard; frame loop; ?freeze mode
  episode.js        the current episode (from vite/episode.js) + its cast/looks merged in
  cast.js           who's who, and how they sound: the house cast
  roster.js         the one resolver: house cast + an episode's legacy entries (001-pilot only) + its own cast.js/looks.js
  looks.js          how they look: colour, head palette, costume
  legacy/           the first episode's cast (its guests and its bot), keyed to 001-pilot and seen by no other episode
  show/show.js      the `show` API (below)          show/puppet.js   one cast member on stage
  show/segments.js  loading + caching               show/builtins.js title, in-production, end cards
  stage/stage.js    the renderer                    stage/shots.js   named camera setups, marks
  stage/set.js      the studio's set pieces         stage/costumes.js costumes
  stage/chrome.js   logo, chyron, captions
  engine/heads.js   CHIMERA heads + the shared WebGL renderer
  engine/tile.js    how far a head tile's clear reaches (past the tile, for the smoothed copy)
  engine/tele.js    telemetry decoder               engine/transport.js the clock
  engine/palette.js per-character head colour
  kit/draw.js       the drawing kit                 kit/ease.js      easing, tweens, seeded RNG
  kit/props.js      shared props (animals, key cap, stamp, weather, tvFrame, credits…)
vite/episode.js     the episode plugin and the Vite config for one episode
tools/              render, check, analyze, shoot, video (see tools/README.md)
templates/          what episode:new and segment:new start from
reference/          the reference episode: episode.json, segments/{demo,kit-tour}, public/ (committed)
chimera/            vendored CHIMERA modules (see chimera/README.md)
```

## Authoring a segment

A segment is a folder `episodes/<ep>/segments/<id>/` (`npm run segment:new -- <ep> <id>` makes
one that renders and plays as-is, and appends it to the rundown):

| file | who writes it |
|---|---|
| `script.js` | you — the dialogue, songs, sfx and named cues (format: `tools/README.md`) |
| `cues.json` (committed), `episodes/<ep>/public/audio/<id>.mp3`, `…/public/tele/<id>.bin` (gitignored) | generated by `npm run render -- <ep> <id>` |
| `index.js` | you — the direction: shots, puppets, graphics |

Studio code is imported by package name, never by relative path, so episodes keep working when
folders move: `import { EKEY } from '@late-cluster/show/stage/set.js'`.

The running order is the `rundown` in `episodes/<ep>/episode.json`, a list of segment ids (for
example `["open", "desk-piece", "interview", "close"]`). Segments play back-to-back and cut straight
into one another: there is no title card between them (a module's old `bumper` field is ignored;
the segment's title shows in the transport bar and its chapter list). An id whose folder doesn't exist
yet plays a short "SEGMENT 0n · IN PRODUCTION" card and is skipped; the chapter list marks it.
A segment whose audio isn't rendered yet still loads (silent, heads idle, `duration` from the
module or 30 s), so you can block shots first.

Two reference segments, in the reference episode (`npm run dev -- ref`, then `?seg=`):
`reference/segments/demo/` (a real rendered segment: dialogue, captions, music, the `ots` chart, a skeet
card) and `reference/segments/kit-tour/` (silent: every newer shot, prop, effect and the episode counter,
four seconds each, plus a line-up of the cast). The tour is a test card: its guests are invented
(`reference/cast.js`, `reference/looks.js`, handles under `.example`) and every word on screen names
the primitive it sits on. Read them alongside this section.

### The module

```js
export default {
  title: 'Cold Open',            // optional: defaults to cues.json's title
  cast: ['hy', 'al'],            // extra puppets for wide shots (speakers are cast automatically)
  guests: ['zed'],               // optional: guest order for guest/panel shots (default: non-house speakers)
  set: { window: false },        // optional: hide set pieces (see "The set")
  defaultShot: 'desk',           // when nothing else picks one
  drift: true,                   // the subtle idle camera drift
  autoPanel: true,               // draw the empty frame of the `ots` graphics panel for you
  built: { from: 0, bumps: ['tally-1', 'tally-2'], label: 'REPLIES READ' },   // optional: the episode counter (below)
  keyLabel: 'K',                 // optional: the letter on the desk's key cap (set.eKey); blank by default
  disclaimer: 'Guests are puppets playing posting personas.',  // or { text, from, dur }: a footer for a few seconds
  shots: [                       // declarative shots (below)
    { at: 0, shot: 'mono' },
    { at: 'chart-in', shot: 'ots' },
    { at: 'hello', after: 0.5, shot: 'closeup', who: 'larry', push: 1.5 },
  ],
  setup(show) {},                // once, after assets load (precompute, defineLook, …)
  direct(t, show) {},            // every frame, before drawing: choose shots, turn heads, chyrons
  drawBack(ctx, t, show) {},     // behind the puppets, stage units
  drawFront(ctx, t, show) {},    // in front of everything but the captions
}
```

`this` inside these functions is the module, so `setup` can stash things on `this`. Keep
`direct`/`draw*` **pure functions of `t`**: no counters, no "first time we saw this" flags, no
`Math.random()` (use `show.rng(seed)`). That's what makes seeking, `?freeze` and frame review work.

### Time and coordinates

- `t` is segment seconds on the mp3's clock. It runs from 0 (the first sample of the segment's
  audio, and the first frame after the cut from the previous segment) to `show.duration`.
- **Stage units**: every `ctx` you get is 1280 × 720, origin top-left, regardless of the window or
  DPR. Captions occupy roughly y 620–710; chyrons y 480–610 on the left.
- **World units**: the studio is a 2000 × 1125 floor plan (bandstand x 40–700, curtain 760–1180,
  window + couch + chair + desk 1220–1960, floor at y 960). Shots are cameras over it.
  `show.toScreen(x, y)` maps world → stage; `show.world(ctx, fn)` draws in world units (things
  that belong to the studio and move with the camera).

### The `show` API

**Timeline**

| | |
|---|---|
| `show.t`, `show.dt`, `show.duration`, `show.id`, `show.title` | |
| `show.at(name)` | seconds of a cue: a `cues` name, a line id (its t0), `'<line>.end'` (its t1), a music id, an sfx name (`'laugh-2'`, or `'laugh'` = the first), or a number. Unknown names warn once and return `Infinity`. |
| `show.since(name)` | `t − at(name)` (negative before) |
| `show.between(a, b)` | `at(a) ≤ t < at(b)` |
| `show.progress(a, b)` | 0..1 from `a` to `b`; a **number** `b` is a duration: `progress('chart-in', 1.5)`, `progress(12, 0.8)` |
| `show.line(id)` | `{ …line, active, progress, done, word }` — `word` is the index into `line.words` being said (−1 before) |
| `show.lines`, `show.active` | all lines; the lines being performed now |
| `show.speaking(who)`, `show.speaker` | is `who` mid-line; who has the floor (latest say/sing/shout) |
| `show.lastLine(who?)` | the last line that has started |
| `show.sfx(prefix)` | the active sfx entry starting with prefix → `{ name, t0, t1, progress }` or null |
| `show.laughing` | 0..1, the room's laugh/applause level (lights the APPLAUSE/LAUGH sign, bobs the audience) |
| `show.music` / `show.beat` | the music block playing now: `{ id, bpm, beat (float), n, phase 0..1, bar, pulse (1 on the beat, decaying), progress }`; `beat` is `{ phase, n, pulse, bar }` (n = −1 outside music). `show.musicState(id)` for a specific block. |

**Shots and puppets**

| | |
|---|---|
| `show.shot(name, opts)` | choose this frame's shot (overrides the declarative list). `opts.push` (s) eases from the previous shot instead of cutting; `opts.since` pins when the change happened. |
| `show.closeup(who, opts)` | `shot('closeup', { who, … })` |
| `show.camera({ x, y, zoom })` | override the camera this frame (world centre, world→stage scale) |
| `show.puppet(id)` | a handle (creates the puppet if needed): |
| `  .place({ x, y, scale, look, z, floor, seat })` | put it somewhere this frame (merged over the shot's placement; see Shots) |
| `  .lookAt(target)` | `'camera'` · `'left'` · `'right'` · a cast id · an azimuth in radians (0 = profile facing screen-right, π/2 = facing us, π = facing left). Turns are eased. |
| `  .nod(rad)`, `.tilt(rad)` | offsets this frame: chin up (+), tilt to its right shoulder (+) |
| `  .hide()`, `.show()` | this frame |
| `  .bob(false)` | stop it bobbing on the beat |
| `  .fx(kind, o)` | an effect this frame (see Puppet effects): `'hologram'`, `'monitor'`, `'none'` |
| `  .shake(px)`, `.scaleTo(k)` | jitter it / scale head and body by `k` this frame (tween `k` for grow and shrink gags) |
| `  .prop({ … })` | parameters for its look's prop this frame, e.g. `puppet(id).prop({ unveil: 0..1, run: 0..1 })` for a `contraption` (see Looks) |
| `  .dress({ color, costume, head, scale })` | change its look for good |
| `  .name`, `.color`, `.look`, `.speaking`, `.screen` | `screen` = `{ x, y, size }` of its head (stage units) |
| `show.headOf(id)` | `{ x, y, size, mouth: [x, y], crown: [x, y] }` in stage units, or null if off screen |
| `show.markOf(id)` | where a cast member normally stands/sits (world units) |
| `show.cast`, `show.guests`, `show.panel` | who's in it; guests in order; the `ots` panel rect (stage units) or null |

**Chrome**

| | |
|---|---|
| `show.chyron(who, { from, to \| dur })` | a lower third, sliding in at `from` (cue or seconds) and out at `to` (or `from + dur`, default 5). `who` is a cast id or `{ name, title, handle, color }`. Call it every frame (it's declarative). |
| `show.caption(text, who)` / `show.caption(null)` | replace / hide the caption this frame (captions otherwise follow lines with `caption: true`, with the current word lit) |
| `show.sign(text, level)` | light the APPLAUSE sign yourself this frame |
| `show.built` | the episode counter's current value (null when the segment has no `built`) |
| `show.set`, `show.nameplate`, `show.onAir` | toggle set pieces, the desk name plate's text, the ON AIR light |

**Helpers** — `show.ease` (`linear, inQuad, outQuad, inOutQuad, inCubic, outCubic, inOutCubic,
outBack, outElastic, inOutSine`), `show.tween(t, t0, t1, from, to, ease)`, `show.clamp`,
`show.lerp`, `show.unlerp`, `show.smoothstep`, `show.window(t, t0, t1, fade)` (1 inside, eased
edges), `show.pulse(t, at, tau)`, `show.noise(x, seed)` (smooth −1..1), `show.rng(seed)` (seeded:
`r()`, `r.range(a, b)`, `r.int(n)`, `r.pick(arr)`, `r.sign()`, `r.gauss()`), `show.P` (the
palette), `show.SHOTS`, `show.MARKS`, `show.CAST`, `show.defineLook(id, look)`.

**The drawing kit** — `show.draw`, everything in stage units, beams added like light:

| | |
|---|---|
| `beam(ctx, path2d, color, width, { alpha, hot, dash, close })`, `beamPts(ctx, [[x,y]…], …)`, `seg(ctx, x0, y0, x1, y1, …)`, `ring(ctx, x, y, r, …)`, `dot(ctx, x, y, r, color, alpha)`, `arrow(…)` | chimera's vector primitives. `hot` adds a whitish core. |
| `label(ctx, text, x, y, { size, color, align, baseline, weight: 'l'\|'m', ls, alpha })`, `labelWidth`, `wrapLabel`, `labelBlock`, `paragraph(ctx, text, x, y, maxW, o)`, `glowText` | Hershey text (capitals read best) |
| `occlude(ctx, path, color?, alpha?)` | fill black: hide what's behind (beams are additive!) |
| `box(ctx, x, y, w, h, { color, cut, radius, fill, corners, hot })`, `rectPath`, `roundPath` | framed boxes |
| `panel(ctx, rect, { title, color, appear, sub })` | a titled graphics panel |
| `barChart(ctx, rect, [{ label, value, color, note, hot }], { max, progress, horizontal, format })` | bars that grow |
| `lineChart(ctx, rect, [{ values, color, label }], { progress, min, max, xLabels, yFormat })` | a line that draws on |
| `typewriter(ctx, text, x, y, progress, { size, color, maxW, t })` | typed-on text with a cursor |
| `countUp(value, progress)`, `compact(n)` | 1,234 counting up; 1.2K |
| `skeetCard(ctx, { x, y, w, name, handle, time, text, initials, color, replies, reposts, likes, appear, reveal, likePulse, liked, scale })` | a Bluesky post card; returns its height |
| `avatar(ctx, x, y, r, { color, initials })`, `butterfly(ctx, x, y, size, color)` | |
| `makeCluster(seed, rect, opts)` + `drawGraph(ctx, graph, t, { highlight })` | a seeded node-and-edge cluster graph that twinkles |
| `P` | the palette: `blue blueMid blueDim white amber green red pink gold goldMid goldDim bsky sky cyan violet magenta lime coral onair` |

**Shared props** (`src/kit/props.js`, also on `show.draw`). Same glyph in every segment; animate
them only through their parameters (computed from `t`).

| | |
|---|---|
| `confetti(ctx, x, y, age, { seed, count, colors, spread })` | a burst of vector sparkles, `age` s after it fired (gone by ~1.4 s) |
| `crow(ctx, x, y, { scale, flap, facing, perched, color })` | a crow (scale 1 ≈ 60 long); `flap` = wing phase (e.g. `(t*2)%1`). On the set: `set: { crow: true \| 'circling' \| 'perched-desk' }` |
| `chicken(ctx, x, y, { scale, crown, bob, facing })`, `crown(ctx, x, y, scale)` | a chicken (≈ 90 tall; `crown: true` puts a crown on it) and the crown on its own |
| `keycap(ctx, x, y, { label, scale, pressed, glow })` | a big key cap showing `label` (≈ 80 wide; blank without one). On the desk: `set: { eKey: true }` (or a number = how pressed) puts one on the desk, showing the segment's `keyLabel` (blank by default); it sits on the desk's front-left corner at `EKEY` (`import { EKEY } from '@late-cluster/show/stage/set.js'`: world `{ x, y, scale }`) — use that to draw at/over it |
| `seal(ctx, x, y, { scale, ball, t, facing })`, `gator(ctx, x, y, { scale, jaw, facing })`, `elephant(ctx, x, y, { scale, trunk, facing })` | simple animal glyphs |
| `book(ctx, x, y, { scale, open, title, color })` | closed (with a title) or opening |
| `stamp(ctx, x, y, 'APPROVED', { age, rot, size, color })` | a rubber-stamp slam: drops in over the 0.15 s before `age` 0, ink spatter after |
| `speechBubble(ctx, x, y, text, { side, w, size, appear, think })` | tail at (x, y) — use `show.headOf(id).mouth` |
| `podium3(ctx, x, y, w, { labels, rise, color })` | 1-2-3 winners' podium; returns the top centres `[first, second, third]` to stand things on |
| `limboBar(ctx, x, y, { w, height, wobble })` | |
| `splitFlap(ctx, x, y, text, { age, size, cells })` | an airport board that flips into place |
| `ticker(ctx, y, text, t, { tag, speed, color })` | a full-width scrolling news crawl |
| `blobRegion(seed, rect)` → `region(ctx, reg)`, `front(ctx, pts, { kind: 'cold'\|'warm'\|fn, progress })`, `isobar(ctx, x, y, r, { label, seed })`, `sun`, `cloud`, `rain`, `storm`, `snow` | the weather map kit (build the region once in `setup`) |
| `tvFrame(ctx, x, y, w, h, { label, live, t })` then `tvFrame.glass(…same…)` | a monitor bezel: black screen first, scanlines/label/LIVE bug after what's inside |
| `creditsRoll(ctx, lines, t, { rect, speed, split })` | rolling credits: strings, `[role, name]` pairs, `{ head }` |
| `lectern(ctx, x, y, { w, h, label, color, lights })` | a lectern / game-show stand front |

### The episode counter

An optional tally that can run across an episode. Export `built: { from: <n>, bumps:
['cue-or-line-id', …] }` and a small box sits top-left showing a label and `n`, where
`n = from + bumps already passed` at time `t`. Each bump pops the number, flashes the box and
throws a little confetti. It's a pure function of `t` (seek-safe); segments without `built` don't
show it. To carry a total across segments, each segment's `from` is the previous segment's final
`n` (agree the numbers in the plan). `show.built` is the current value. The label is
`built.label`; without one it is a neutral `COUNT` (`src/stage/text.js`). The module field keeps
its old name, `built`, whatever the counter counts. (The first episode's label comes from its
legacy entry in `src/legacy/`, so that episode draws as it was built.)

### Puppet effects

`show.puppet(id).fx(kind, o)` this frame (a look's `fx` sets a default; `.fx('none')` clears it):

- `'hologram'` — archival hologram: translucent (no black fill, the set shows through), rolling
  scanlines, a wash towards `tint` (default pale blue), random flicker and the odd glitch where
  bands of the picture slip sideways. `o: { amount 0..1, flicker 0..1, scan 0..1, tint, glitch }` —
  tween `amount` to 0 and the head flickers out mid-sentence.
- `'monitor'` — slightly dimmed with scanlines; used automatically for heads inside a `tvFrame`
  (the `remote` shots and `pip`).
- `.shake(px)` jitters a puppet, `.scaleTo(k)` scales it (both per frame).

Placement can also carry `clip: { x, y, w, h }` (stage units): the puppet is drawn only inside it
(monitors, popping up from behind furniture).

### Shots

| name | what | options |
|---|---|---|
| `mono` | Larry standing centre in front of the curtain | `look`, `zoom` |
| `desk` | Larry at the desk, medium close | `look`, `zoom` |
| `guest` | one guest in the chair screen-left, Larry at the desk screen-right, facing each other | `guest`, `zoom` |
| `panel` | Larry + 2–3 guests (chair, couch), optionally a small puppet popping up from behind the couch | `guests`, `look`, `pop: '<id>'`, `popUp: 0..1` (animate it), `popScale` |
| `band` | Hy Oid & The Formants on the bandstand | `look`, `zoom`, `with` (e.g. `'sibyl'`) |
| `wide` | the whole studio, everyone cast in their spot | `larry: 'desk'\|'mono'`, `band: false`, `guests` |
| `ots` | news style: the presenter in one third, `show.panel` (default `{ x: 520, y: 64, w: 720, h: 470 }`) for your graphics. Larry sits at his desk; anyone else (`who`) stands in front of the window | `who`, `side: 'left'\|'right'` (the presenter's side), `pip: '<id>'` (a small monitor with that puppet in the panel's corner; `pipLabel`, `pipLive`), `panel`, `zoom` |
| `sports` | `ots` for the sports desk: `who` (default `eppy`) behind a SPORTS desk, a lower ticker lane | `ticker: 'text'`, `tickerTag`, `who`, `side`, `pip` |
| `remote` | Larry at the desk screen-right, a big studio monitor screen-left with a remote guest's head inside | `guest`, `label`, `live` (default true) |
| `remote2` | two monitors side by side for two remote guests, Larry screen-right | `guests: [a, b]`, `labels`, `live` |
| `podium` | Sibyl (or `who`) at the announcer's lectern, medium shot | `who`, `look`, `zoom` |
| `deskWith` | Larry at the desk plus one other character at a stand beside it (the stand shows their name) | `with: 'sibyl'\|'eppy'\|<any cast id>`, `stand: 'stand'\|'lectern'` |
| `stage` | the musical number: `lead` centre stage in front of the curtain, the band in a row behind, room above for lyrics | `lead`, `band: [...]`, `zoom` |
| `closeup` | one head, big | `who`, `size` (head px, default 520), `dx`, `look` |
| `title` | the title card framing | |

Placement fields (`shot` layouts and `puppet().place()`): `x, y` head centre (world), `scale`
(1 = adult head), `look`, `z` (draw order), `floor` (world y a standing puppet's legs reach, or
null), `seat` (world y where a seated body ends), `instrument` (`keys`, `bass`, `drums`, `mic`,
`lectern`, `stand`, `sportsdesk`), `clip` (stage rect), `fx`.
Numeric shot options (`popUp`, `zoom`, …) can change every frame without counting as a new shot.
That also means changing only a number never cuts or pushes: the new value applies at once, so
tween it yourself (`zoom: show.tween(t, a, b, 1.2, 1.6, show.ease.inOutCubic)`) to ease it.
Layouts may also return `set: { … }` overrides, `monitors: [...]` and `lane` (see `shots.js`; the
`monitor(L, who, rect, o)` helper puts a puppet in a tvFrame).
Add a shot: `show.SHOTS.myShot = (show, opts) => ({ cam: { x, y, zoom }, place: { … }, audience: 0..1, panel })`
from `setup` (shots are shared, so prefix your names).

Cuts are the default; `push` eases camera and puppets between shots. During a push the shot's
own `set` overrides are dropped (only camera and placements blend), so if a look depends on set
flags, assign `show.set.*` in `direct` every frame rather than relying on the shot's `set`. Heads turn smoothly on their
own when their `look` target changes, and snap on a cut or a seek.

### Looks and costumes

`src/looks.js` maps cast ids to a look (an episode's own `looks.js` adds or overrides entries,
each applied with `defineLook`): `color` (caption name, chyron), `head` (the 3D head's
palette — by default structure in `color`, articulators in chimera's tongue-green / jaw-red /
lip-pink), `costume`, `handle`, `bodyScale`, `prop`. Unknown ids get a signature hue and a hoodie.
Guests: add an entry in the episode's `looks.js` (one moves to `src/looks.js` only when a second
episode needs it), or from `setup`: `show.defineLook('zed', { color: '#58f0e8', costume: { kind: 'labcoat' } })`.

A look's `prop: 'contraption'` stands a machine under a dust sheet beside the puppet (150 world
units to its left; `propSide: 1` in the look, or `side` per frame, puts it on the right).
`show.puppet(id).prop({ unveil: 0..1, run: 0..1, side })` whips the sheet off and sets its gears
and lights going; it is hidden while the puppet is clipped (in a monitor).

Costume kinds (`src/stage/costumes.js`): `tux` (Larry: peaked lapels, bow tie, studs, pocket
square — `color shirt tie square`), `band` (`color trim monogram`), `announcer`, `suit` (`tie`),
`blazer` (a bright presenter blazer, open collar: `color shirt trim crest`), `hoodie` (`trim`,
`logo: false`), `cardigan` (`shirt`), `labcoat` (`shirt tie trim`), `turtleneck` (`pendant`),
`tee` (`print`: `'butterfly'` or short text), `featherCoat` (a dark coat with a feather ruff:
`color trim`), `terminal` (a boxy bot body for AI agents: `color`, `model`, `text: [...]` for its
scrolling chest screen). Any costume can `holds: 'clipboard' | 'clicker' | 'popper' | 'headset'`
(or an array; `clipText` labels the clipboard). New
kinds: add `COSTUMES.myKind = { back(ctx, a, c) {}, front(ctx, a, c) {} }` there (drawn in cm about
the neck base; see the file's header).

The house cast's looks: **larry** gold tux · **sibyl** silver announcer · **the Formants** magenta
band jackets, each head its own hue · **eppy** hot-orange sports blazer + headset. That is the
whole house: an episode that wants anyone else, a bot included, defines them in its own
`cast.js`/`looks.js`. (`src/legacy/` holds the first episode's cast, its guests and its website
bot, only so it still builds; `src/roster.js` merges it for `001-pilot` and no other episode.)

**Chyrons** read the cast (`src/cast.js` plus the episode's own `cast.js`): a `handle` shows after the title, and `guest: true` adds a
**PUPPET · PARODY** tag — these are puppets playing real accounts' posting personas, and the show
says so on screen. A segment's `disclaimer` shows a one-line footer along the bottom for a few
seconds (captions lift above it). Handles are only ever a real account's (the guests'), or an
invented one under `.example` (bible R8); the house characters are not accounts and have no
handle, so their chyrons show name and title only.

A cast entry may carry `plays: '<cast id>'`: it is another voice of that character (a singing
voice, say). Today this affects the credits only: the entry is not listed itself, and its lines count
as the character's, so the character is credited once. Puppets are still driven by each line's own
cast id. A `plays` that names no cast entry is ignored.

### The set

Back: `wall truss floor window` (the simcluster skyline) `curtain onair sign` (APPLAUSE/LAUGH,
lit by `cues.sfx` named `applause* laugh* biglaugh chuckle cheer`) `bandstand couch chair`.
Front: `desk` (mug, desk mic, name plate) and the chair/couch arms. Extras, off by default:
`crow: true | 'circling' | 'perched-desk'` (a crow on the window sill, circling the
skyline, or on the desk) and `eKey: true` (a big key cap on the desk's front-left corner, showing the module's `keyLabel`, blank by default; the mug
sits right of it). `'circling'` flies in whatever part of the window the current camera sees (a
desk shot only sees its lower half), below the episode counter, and hides in head close-ups
(zoom > 2.2). Set flags are module state: if `direct` changes `show.set.*`, assign it on every
frame (not only after a cue), or seeking backwards keeps the change. Hide any with
`set: { window: false }` in the module or `show.set.window = false` in `direct`. `set.dim`
(default 0.34) pushes the back pieces down so the heads stay brightest.

### Previewing and reviewing

- `npm run dev -- <ep>`, open `/?seg=<id>`, press START (or
  `/?seg=<id>&autostart=1&mute=1`).
- One exact frame: `/?seg=<id>&t=14.5&freeze=1`.
- Frames to disk: `npm run shoot -- <ep> <id> <t1> [t2 …] [--out dir] [--size 1280x720] [--crop x,y,w,h] [--url URL]`.
  It starts its own Vite dev server for the episode on a free port (or uses `--url`), opens each
  frozen frame in Playwright's Chromium (`CHROMIUM_PATH` to override the browser), saves
  `shots/<ep-id>/<id>/<id>@<t>.png` (or `<out>/…`) and prints the page's console warnings and
  errors under each frame — including `unknown cue "…"` from typos. Shoot the moments that
  matter (mid-word, overlaps, shot changes, music) and look at them.
- `shoot` is safe to run concurrently: each run picks its own free port, uses its own temporary
  Vite cache, writes to its own `shots/<ep-id>/<id>/`, and shuts its server down on exit, error
  or Ctrl-C. **Batch your timestamps into one invocation** (one server + one browser for all of
  them — much faster than one run per frame).

### When to build

Builds are committed: `dist/episodes/<id>/` is what the site serves, and `npm run verify` (in CI
and before every deploy) checks each published episode's build against its source. Nothing in
the authoring loop needs a build: `dev`, `shoot` and `check` read fresh renders from
`episodes/<id>/public/` and fall back to the committed build.

- **Build when an episode's source is final for a commit**: after you re-render or edit any
  segment of a published episode, `npm run build -- <ep>`, and commit the source and the build
  together. Otherwise `verify` fails (the build's `sourceHash` no longer matches).
- **Drafts are never built into `dist/`.** To watch one as it will ship, `npm run build -- <ep>
  --preview` builds into `preview/<id>/` (gitignored).
- **Rebuilding an old episode re-bundles it with today's studio.** Studio changes never make a
  build stale, so do it only on purpose.
- A build refuses to run while a rundown segment lacks its script, module, cues or rendered
  audio, and never loses audio: it builds in a temp folder and carries the committed audio and
  telemetry forward when there is no fresh render. Two builds of one episode at once are not
  supported; builds of different episodes are independent.
- `npm run thumbnail -- <ep>` shoots the title card into `episodes/<ep>/thumbnail.jpg` (needed
  for a published build; `--t <s>` picks the moment). `npm run thumbnail -- <ep> <seg> <t>`
  shoots that moment of a segment instead, for an episode's best picture; `--out <file>`
  writes elsewhere to compare candidates.
- The Open Graph tags in a build are relative until `siteUrl` is set in the repo root's
  `show.config.json`; then they are absolute. The environment never affects a build.

### Title, production and end cards

`src/show/builtins.js`. The title card's TONIGHT list reads the titles of the rundown segments
that exist (two numbered columns, each title cut at its first ':'; empty while none do), and a
line in the TONIGHT row names the episode, e.g. `NO. 012 · <TITLE> · 4 DEC 2026` (number, title and air
date from `episode.json`). A line too long for its place is set smaller, then broken at its ` · `
separators into stacked lines, so it stays clear of the host. After the last segment the end card plays the band out under the logo
with rolling credits built from the cast, listing only who appears in this episode (everyone
with a line, plus each segment's `cast` and `guests`), and a WATCH AGAIN button. As the
constitution (Article 4) and R9 require, the credits list the house cast under STARRING, then
every guest who appears, by display name and handle (from the cast entry, including the episode's
own `cast.js`), under PUPPETS PLAYED THE POSTING PERSONAS OF, and say that every voice is
synthesized by CHIMERA. So a guest's cast entry needs its real `name` and `handle`. Shoot them as
`title`, `end`, or any not-yet-made rundown id (`npm run shoot -- <ep> <id> 1` shows its "in
production" card).

### Do / don't

- **Do** keep an episode's work inside its folder (`episodes/<ep>/`). One-off guests and looks go
  in the episode's `cast.js` / `looks.js` (or `defineLook` in `setup`); recurring characters,
  shared drawables, shots or costume kinds go in the studio (`src/cast.js`, `src/looks.js`,
  `src/stage/`, `src/kit/`) — ask first, since every later build picks them up.
- **Don't** import from another segment, and don't edit `cues.json` by hand (re-render instead).
- **Don't** keep state across frames in `direct`/`draw*` — compute from `t`. Use `show.rng(seed)`.
- `closeup` frames a puppet where it was last placed (`show.markOf`), ignoring placements inside a
  monitor/PiP (clipped); for a guest seen only in an ots/PiP, give the closeup an explicit spot.
- **Fade with the `alpha` option, not the context.** Beams, labels and the other kit drawers set
  `ctx.globalAlpha` themselves, so wrapping them in `ctx.globalAlpha = a` does not fade them: pass
  `alpha` (or `appear`, where a drawer has it) to each call.
- **Do** `occlude()` behind any graphic that sits over the set; beams add light, so overlapping
  lines without a black fill get messy.
- **Don't** fight the captions: keep big graphics above y ≈ 610, or hide captions for that
  moment with `show.caption(null)`.
- **Do** batch frames: `npm run shoot -- <ep> <id> 1 4.5 9 12.2 …` in one go.
- **Do** use cue names from `script.js` (`{ cue: 'chart-in' }`) rather than raw seconds, so a
  re-render that shifts timing doesn't break your direction.
- Mind the budget: four heads plus graphics holds 60 fps on a laptop; heads are the expensive
  part, so prefer shots with few visible heads, and build heavy geometry once in `setup`.
