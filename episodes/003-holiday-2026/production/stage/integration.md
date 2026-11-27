# "The Walk Home": the integration pass

The lead builder, after the four scene builders, the costume builder and the sound editor. It is
checked against the current `cues.json` (duration 249.73 s). The only files changed are in
`segments/walk/`. `looks.js`, `script.js`, `cues.json` and `packages/` are untouched.

## What changed, where, and why

| # | file (whose) | change | why |
|---|---|---|---|
| 1 | `index.js` (lead) | Every frame, after dressing, `show.puppet(id).bob(false)` for every puppet. | The eight `steps-*` music blocks made every visible head nod on the footsteps' beat. |
| 1 | `street.js` (lead) | A listen hold now ends at the next **spoken** line. Before, it ended at any line, and the footsteps are `beat` lines. | Without this, the `listen-help` hold ended at a footsteps block, not at "Does it help?". |
| 2 | new `seethrough.js` (lead); `index.js` | Larry's head no longer shows a black block. `index.js` copies the picture behind the puppets at the end of `drawBack`. In `drawFront`, `seeThrough()` puts back, inside each head's silhouette only, what the stage's black head fill had hidden. Three things stay as the stage drew them: the head's own costume front, any puppet drawn in front of it, and the coat or any puppet behind it. The coat's lines behind the neck are drawn again. | The block is the studio's own head occlusion (`stage.js` `paintPuppet` fills the convex hull of the shell at 0.94, and from the front that hull runs from crown to collar). It is not the collar: drawing the collar as an outline changed nothing (tested, then reverted). This works with nothing changed in `packages/`. Checked at `ask` against the window, at the restaurant glass (`larry-at-glass`) and in the light of his door (`let-in`). |
| 3 | `costumes.js` (costume builder); `studio.js` (studio builder) | One schedule for the scarf, `SCARF` and `scarfOnAt()` in `costumes.js`, applied by `dressWalk` for the whole segment. There is no scarf while he looks down. At `scarf-on` + 0.6 the studio cuts to the collar, with the scarf already 0.84 on, and it comes to rest over 0.4 s and stays on to the end. `studio.js` no longer dresses Larry; it cuts on the same numbers. A scarf piece that is not yet whole now ends in a plain edge; the hot "drawing" tip is gone. `dressWalk` lost its `scarfDur` option. | Before, the scarf had two masters, and the settling scarf still showed the bright tip. |
| 4 | `busker.js` (busker builder) | The coin now rises from just below the frame **in front of Larry** (x = `LARRY.x + 90`), not from our side. His dip to it is unchanged. | The script means Larry gave it. |
| 5 | `street.js` (lead) | The restaurant move runs at pace 1.25 with a 0.7 s ease-out, ending at `stop-at-window` + 0.6, so the glass enters at the right edge just after `pass-restaurant` and not during "Some nights.". **`walk-on` is now an elliptical cut**: the walk is 400 fronts px further on in the new shot, so the window is only a warm sliver at the left edge and gone by 91.8 s, before `busker-heard`. The dark stretch now starts 450 px past the restaurant (it was 700), and its lit-window chance is 1.5 % (it was 4 %). | The window used to fill the frame through `walk-on` and `busker-heard`. Now the tune is heard on a dark street. The busker still arrives just after `busker-in`. |
| 5 | `street.js` (lead) | Each step's length comes from the move's pace, not the cadence, so the bob keeps the footsteps' rhythm at any pace. Breath drift ignores jumps. | So the faster stretches do not make him bob faster than the footsteps. |
| 6 | `street.js` (lead) | **`apartment-door` is an elliptical cut**: the walk is 560 px further on there. Until then the last block shows only the lit flats, and his building is in place in the door's wide. | The building used to slide in over the flats in the second or two before `glance`. The script has the street stop at `apartment-door`, so the jump hides in that cut. |
| 7 | `table.js` (table builder) | The 25 % `soft` dimming at `goodnight` is removed, everywhere it was applied (windows, cloth, plates, candles, dish, glasses). | There is no change of light anywhere at the table. `they-look` had no light change. |
| 8 | `table.js` | Black is complete at `min(stay-warm.end + 4.9, duration − 0.3)`, after a 1 s fade. His nod ends about 0.85 s after "Goodnight", so this holds about 3 s from our chair before the fade. | It is keyed to the line and the duration, so a longer tail keeps the same picture, and black always comes before the audio ends. |
| 9 | `table.js` | The `HIDDEN` list is gone: a seat behind Larry's head is filled, its head drawn behind his. `seethrough.js` keeps that head (not the wall) behind Larry's see-through head. | Dee (`sit`, `goodnight`), Eppy and Al (`house`) and Pete (the door `larry` shot) vanished and reappeared across cuts. Six stay six. |
| 10 | — | Checked, nothing to change. The studio scene turns on only wall, truss, floor, curtain and bandstand, none of which carries a word. ON AIR, the sign, the desk name plate and LC are not drawn (`studio-props.js` draws them blank). The only words in the special are OPEN (restaurant), DON'T WALK and WALK (crossing), and the caption bar. | |

## How it was checked

- **128 frames:** every cue and the middle of every stretch from the current `cues.json`, plus both sides of every seam. Shot as 3 × 3 contact sheets and looked at. The console printed no warnings in any batch. `npm run check -- 003-holiday-2026` passes.
- **Continuity:**
  - The coat is on from the first frame. The envelope is at his pocket from `ask` to `chair-in`, and the desk's envelope is gone from `ask`.
  - The scarf is on from the collar shot to the last frame.
  - The cardigan is on from our chair onwards.
  - Snow runs from `cross` + 2.4 to his door and is in both table windows.
- **Listen holds:** the wait after `how-have-you-been`, `listen-help`, `listen-put-right`, `listen-door` and the pause before "Good.". In each he is turned to us. Only the walk (at `listen-help`) and the snow move.
- **Phone size (640 × 360):**
  - `cook-slows` ± 0.5 s: he works, then leans in and stops.
  - `watch-the-cook`.
  - DON'T WALK and WALK: both read.
  - The watcher, in the top window and then gone.
  - The gold chair, alone and then with ours beside it.
  - The bowl: it passes behind Larry, his head following it, and comes to our plate.
- **Heads:** seven only in `table-wide` and `they-look`. Elsewhere there are at most four full heads, plus Larry with one head partly behind his.

## Not settled; for the auditor and the project manager

- **Elliptical cuts.** The cuts at `walk-on` and `apartment-door` are elliptical edits: the street is a few seconds further on after the cut. Nothing in the picture contradicts that, but it is a choice the script did not spell out.
- **The busker's lamp.** At `walk-on` the street behind the busker's stop has no lamp of its own, so his lamp is the only one in his stretch. This was intended.
- **`seethrough.js` costs.** It makes an extra full-canvas copy and a few small composites per head each frame. Frame time at full speed on a laptop has not been measured. If it is too slow, `seeThrough(…, { only: ['larry'] })` limits it to him.
- **`plan.md` and `costumes.md` are out of date.** `plan.md`'s distances and stop times and `costumes.md`'s mention of `scarfDur` predate this pass. This file wins.
- **The sound tail.** The table's black follows the tail automatically when the sound editor's longer tail lands. Shoot `stay-warm.end` + 1 to + 5.5 again after that render.

## Round two: the frame audit and the cold viewers

The scene builders' files changed, under `segments/walk/`. `looks.js` is untouched: Pete's new
hoodie is applied in `crewLook`.

| # | file | change | why |
|---|---|---|---|
| 1 | `costumes.js` | New kind `walkHoodie`: the hood lies down on his shoulders, below the neck base, with the drawstrings and pocket as before. `crewLook('pete')` dresses him in it. | The studio's hoodie bunches the hood up to jaw height, and through his see-through head its rim crossed his lips and chin. I shot every table shot he is in: `table-wide`, `band-end`, `larry-at-door`, `they-look`, `chair-in` and `the-meal`. Nothing crosses his mouth in any of them. |
| 2 | `table.js` | In `larry-and-sibyl` Sibyl faces her plate, nearly towards us (azimuth 1.8; before, she was turned to Larry), with her chin well down (nod −0.62, was −0.3). | At 640 × 360 her head read as level and talking to him. Now the crown is foremost and the face down at the plate through both lines. |
| 3 | `restaurant.js` | The OPEN neon is drawn only while all of it is inside the frame. | The push at `cook-in-back` cut it to "PEN", then "EN". It is now whole up to the moment the edge reaches it, then gone. |
| 4 | `busker.js` | Over the three seconds after `walk-past`, he, his lamp and his case shrink together about his feet to 0.55, and his feet rise 70 units towards the far kerb. | He slid away at one size. |
| 5 | `table.js` | `goodnight` is reframed: base camera x 1084, zoom 1.15, Larry at stage x 350. He now sits in the gap between Dee and Al. | Dee's head was half behind his through the owner's last lines. No one leaves a seat. The shot holds Dee, Larry, Al and Eppy (four), Sibyl being out of frame, as she was before at the end of the push. |
| 6 | `studio-props.js` | The work lamp's bulb is raised from mouth height to above his head (y 418, was 588). It hangs in a metal reflector pointing down at the floor, and a faint cone of light runs from the reflector to the pool by the desk. The wire cage is gone. | A cold viewer read it as a microphone. |
| 7 | `street.js` | Snow begins at `cross` + 0.8, reaches 0.45 by `cross` + 3.4 and all of it by `apartment-door`. Flakes are larger (far 1.6, mid 2.6, near 4.2) and a little brighter everywhere, not only in lamplight. | The crossing's viewer saw no snow. At 640 × 360 flakes now read from about `cross` + 2 s, and it is still flakes, not a blizzard, through the last block, the door and the table window. |
| 8 | `restaurant.js` | A plate on the pass under the hatch, with two wisps of steam rising past the hatch's frame. | "A chef on a screen": the steam breaking the frame and the plate waiting say it is an opening into a kitchen. |

**Looked at:** each change at full size and at 640 × 360: the push frame by frame, the busker over four frames, the snow over eight, the goodnight push from start to fade, and the studio wide and the desk shot. One frame at every cue (54 frames) printed no console warnings, and `npm run check -- 003-holiday-2026` passes.

**Left alone, as asked:** the scarf, the cook slowing, the figure in the window, both chairs, the bowl, the light, the listening holds, and the first and last frames.

## Round three: the owner's notes

| # | file | change | why |
|---|---|---|---|
| 1 | `crossing.js` | The side street now has a clean end. Its two rows of buildings recede, with roof lines, to one plain building across the far end (a door and two windows, one lit), which closes the view. Everything below those roofs is filled black before anything of the street is drawn. The street's lamps still get smaller, and the line marking "another junction" is gone. | The distant skyline's outlines showed straight through the street, down to the road. Above the roofs the far city may still show, as it does over any roof. |
| 1 | — | Checked the rest of the walk, nothing to change. The street builds the building fronts edge to edge, and the side street is the only gap in them; no other place clears the fronts. Checked at `crossing-red` + 1.5, every crossing cue, the walk-in, `cross` and the start of the last block. | |
| 2 | `table.js` | `the-meal`: the two bowls that went along the table in opposite directions are gone. `goodnight`: so is the one drifting bowl. | Nothing slides along the table. |
| 2 | `table.js` | `served` is now two shots, and the bowl does not move in either. In `served` it stands just handed along at Larry's left, nearer us than the dish. He looks at it, and as the shot ends his head comes round toward us. At the cut (`served` + 1.05, the new shot `served-at`, a little closer) it is at our plate and he is looking down at it there. | Larry's look carries the bowl past him to us. |
| 2 | `table.js` | Draw order from our chair is now far to near: the far side's glasses, then the candles, then the dish. The door view is reordered the same way. | In `the-meal` a sliding bowl had a glass drawn through it. That bowl is gone, and nothing on the table now overlaps out of depth order in any table shot. |
| 3 | `table.js` | Sibyl from our chair sits at the head: the right end of the far side, just inside the table's corner, as in the door shots. Her chair is an open wooden back whose top rail shows at her shoulders, in both views. In `larry-and-sibyl` she is at her plate (chin down, gently) through "It's my house.". From just before "It's still the rule." she lifts her head and turns to Larry over 0.8 s, unhurried, and stays level on him. | She sat small under a tall black chair back that read as a picture on the wall, with her head tipped hard down. |

**Left alone on purpose:** the second chair at `chair-in`, and the plate, fork and glass that slide into place along the bottom of the frame as we sit. They were not in the owner's note. Now that nothing else on the table moves by itself, the place setting sliding in is the one remaining slide, and it may read as out of keeping. That is for the owner.

**Looked at:** every change at full size and at 640 × 360. One frame at every crossing and table cue printed no console warnings, and `npm run check -- 003-holiday-2026` passes. The cues have moved slightly since the last pass, and the shots were taken against the current `cues.json`.
