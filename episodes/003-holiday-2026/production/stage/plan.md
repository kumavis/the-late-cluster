# Staging "The Walk Home": the plan for the scene builders

One segment, `walk`, staged in one file per scene in `episodes/003-holiday-2026/segments/walk/`.
`index.js` only picks the scene that is on and hands it the frame; its header repeats this
contract. Your file is a stub that already plays (a card with its name and cue range, and the
street where it belongs): replace all of it, card included. Edit only your own file.

## The interface

```js
export default {
  name: 'busker',                      // required
  set: { … },                          // studio set pieces to turn ON; every piece is off, dim 0
  setup(show, seg) {},                 // once: build geometry from show.rng('…')
  direct(t, show, seg) {},             // every frame while you are on: camera, puppets
  drawBack(ctx, t, show, seg) {},      // behind the puppets, stage units 1280 × 720
  drawFront(ctx, t, show, seg) {},     // in front of the puppets, under the captions
  landmark: { … },                     // a place on the street (below); street scenes only
}
```

- **Shots and cuts.** `seg.shot('name')` names this frame's shot. Changing the name is a hard cut
  (heads snap to their new look); the same name every frame is one shot. Moving between scenes
  is always a cut. Set the camera every frame with `show.camera({ x, y, zoom })`; it starts each
  frame at the street's VIEW `{ 640, 360, 1 }`. There is no `push`: tween the camera from `t`.
- **Puppets.** `seg.place(id, { x, y, scale, look, z, floor, seat, clip, fx })` every frame;
  unset fields are filled (look `'camera'`, z 5, nothing else). A puppet nobody places is not
  drawn, and only the scene that is on is directed, so nobody fights over a puppet. Then
  `show.puppet(id).lookAt/nod/tilt`. Azimuths: 0 profile facing right, π/2 to us, π profile
  facing left. **Stay in 0..π**: past profile the see-through head reads as facing us (tested).
- **Black.** `seg.fade(a)` puts black over the whole picture this frame (0..1; captions stay on
  top). The studio stub fades at `out-the-door`; the table stub at the end. The audio runs only
  about 3.5 s past "Goodnight", so the table's hold and fade must fit in that.
- **Clothes.** `index.js` calls `dressWalk(show, t)` from `costumes.js` first, every frame. Do not
  dress anyone yourself.
- **Pure in t.** No flags, counters or `Math.random()`. Key to cue names and line ids
  (`show.at`, `show.since`, `show.progress`, `show.line(id).words`), seconds only as offsets from
  a cue. The sound is being reworked; the seconds below will move.
- `seg.hold('listen-door')` gives `{ t0, t1, line }`: the cue to the next line's start. That gap
  is the viewer speaking; nothing new may happen in the picture during it.

## The cue table (`SCENES` in index.js)

| file | on from | last cue inside | now (s) |
|---|---|---|---|
| `studio.js` | 0 (`dark-studio` is at 0.3) | `out-the-door` | 0 – 22.4 |
| `street.js` | `street-start` | `answers-ahead` | 22.4 – 54.2 |
| `restaurant.js` | `pass-restaurant` | `watch-the-cook` | 54.2 – 88.3 |
| `street.js` | `walk-on` | `walk-on` | 88.3 – 90.3 |
| `busker.js` | `busker-heard` | `coin` | 90.3 – 102.3 |
| `street.js` | `walk-past` | `tune-again` | 102.3 – 112.4 |
| `crossing.js` | `crossing-red` | `walk-sign` | 112.4 – 162.3 |
| `street.js` | `cross` | `glance` | 162.3 – 173.6 |
| `door.js` | `apartment-door` | `let-in` | 173.6 – 198.2 |
| `table.js` | `table-wide` | to the end | 198.2 – 241.8 |

## The street: units, layers, Larry

- **Units.** The street has its own world: at VIEW one street unit is one stage pixel. The studio
  and the table may use any world they like (the studio's is 2000 × 1125, `set.js`).
- **Layers** slide at different speeds (`LAYERS`): sky 0.08, fronts 1 (building fronts across the
  road, base y 432), lamps 1.2 (far kerb y 450), road reflections 1.2, centre line 1.7 (y 528),
  our kerb 2.3 (y 606–616), our pavement 2.5, Larry's own depth 2.6.
- **Larry walking** (`street.placeLarry(t, show, seg, { look })`): head centre x 430, y 318,
  scale 1.6, profile `AZ.ahead` (0.14), a 5-unit bob per step, breath every 2.9 s (never in a
  listen hold). Override with `seg.place('larry', …)` or `lookAt` after calling it.
- **The walk** is `street.walk(t)`, in fronts pixels, one continuous distance (`MOVES`): it eases
  to a stop at each place and eases off again. Today it stops at `stop-at-window` + 0.3,
  `busker-in` + 2.8, `crossing-red` + 1.4 and `apartment-door` + 1.2, and starts at `walk-on`
  + 0.2, `walk-past` + 0.3 and `walk-sign` + 0.4 (across the side street at 1.3 × pace).
  `street.moving(t)` is 0..1.
- **Snow** begins `cross` + 2.4, a few flakes, more from `last-block`, all of it by
  `apartment-door`, and never stops (`street.snowAmount(t)`).

## How to place a landmark

```js
landmark: {
  stop: 'busker',               // restaurant | busker | crossing | door
  layer: 'larry', span: [820, 1100],     // its layer and its street-x extent at the stop (culling)
  clear: { fronts: [x0, x1], lamps: […], centre: […], kerb: […], pavement: […] },
  direct(t, show, seg, at) {},           // its puppets: called whenever an outdoor scene is on
  back(ctx, t, show, seg, at) {},        // drawn right after the building fronts
  front(ctx, t, show, seg, at) {},       // after our kerb, still behind the puppets
  over(ctx, t, show, seg, at) {},        // in front of the puppets
}
```

`at(x, layer = 'fronts')` is where a thing that stands at street x `x` when the walk is stopped
at your stop is now: at the stop `at(x) === x`, before it the thing is to the right, after it to
the left. Hooks draw in street units, already under the camera. `clear` ranges are street x at
the stop; the street then builds no building, lamp, centre dash or kerb there, so your place fills
the gap. Your landmark is drawn by the street scenes before and after you too, so it arrives and
leaves on its own (the busker sliding away at `walk-past` is the busker file's `direct` and
`front`, called from the street).

**What the arithmetic allows** (fronts pixels; multiply by your layer's factor):

| place | at the cue, still to walk | between stops |
|---|---|---|
| restaurant | `listen-help` 590 · `pass-restaurant` 94 | restaurant → busker 501 |
| busker | `busker-heard` 384 · `busker-in` 177 | busker → crossing 1065 |
| crossing | `crossing-red` 35 | crossing → door 1679 |
| door | `last-block` 984 · `glance` 291 · `apartment-door` 40 | |

So a place on the **fronts** layer is in frame for six seconds or more before its stop, and the
restaurant would still be behind the busker. The stubs therefore put the restaurant and the
busker on **our side of the street, at Larry's depth** (`'larry'`, 2.6): the restaurant then
enters at the right edge near `pass-restaurant` if it starts at x ≈ 760 at the stop, and the
busker enters near `busker-in` from x ≈ 960. A number works as a layer too (`at(x, 1.8)`).
The crossing stub's gaps (fronts 520–850, kerb 470–1230) are sized so the side street is behind
us by `last-block`; keep the fronts gap about that wide. The last block's lit flats begin
1000 fronts pixels past the crossing stop, so at the kerb one lit block shows at the right edge,
across the side street; a closer crossing shot leaves it out.

## The street and the snow from inside your scene

```js
direct(t, show, seg) { seg.street.placeLarry(t, show, seg, { look: … }); seg.street.directLandmarks(t, show, seg) }
drawBack(ctx, t, show, seg) { seg.street.drawBack(ctx, t, show) }     // o: { landmarks: false, snow: 0..1, bright }
drawFront(ctx, t, show, seg) { seg.street.drawFront(ctx, t, show) }   // near snow + breath; o: { breath: false }
```

Move the camera and the street follows. For snow anywhere else (the table's window), clip to
the glass yourself and call `seg.street.snow(ctx, t, show, { layer: 'far' | 'mid' | 'near',
walk: 0, rect: { x, y, w, h }, amount })`; `walk: 0` keeps it from sliding. `seg.street.breath(ctx, t, show,
'larry')` draws his breath in stage units, from `drawFront`.

## How to shoot your scene alone

The other scenes are stubs and cannot get in your way: only the scene whose span contains `t`
runs. Look up your cues' seconds in `cues.json` (they move after a re-render) and batch them:

```bash
CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  npm run shoot -- 003-holiday-2026 walk 93 95.5 98.5 100.2
```

Playwright's own browser is not installed on this machine; the system Chrome works. Read the
console lines under each frame: `unknown cue`, and `<scene>.direct() threw` (index.js catches
your errors so the rest still plays). Shoot the first frame after your first cue and the last
before the next scene's, to see the cuts in and out.

## What I found about the staging read's open questions

- **Past profile** (asked for the table): a head at azimuth −0.5 shows a little of the back, but
  at −1.1 and −1.57 it reads as a face turned to us, because the wireframe is see-through.
  Nobody can be seen from behind; turn heads within 0..π.
- **The busker in the credits**: the stock end card lists him under STARRING as "The busker, On
  the corner", with the house cast. Whoever makes the special's own end should decide that.
- **Full-length walking**: not tried. The walk is chest up; the coat's hem never shows.
- **A sung beat under speech** (`never-ends` over `busker-behind`): sound, not tested here.
- **What I could not stage exactly**: "Two lamp posts go by with nobody talking" in 1.6 s
  needs two lamps about 160 units apart there, so they stand closer than elsewhere. During each
  listen hold no lamp passes Larry's head and no breath starts, but the street keeps sliding at
  `listen-help`, because the script has the walk keep going.
- Seeking is exact: the same frame shot twice is byte-identical.
