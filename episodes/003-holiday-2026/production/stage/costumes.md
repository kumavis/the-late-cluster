# The walk's clothes: how to dress everyone

Everything is in `segments/walk/costumes.js`; the colours and specs are `OFF_DUTY` and `LOOKS`
in `looks.js`. Importing `costumes.js` adds the kinds to the studio's exported `COSTUMES` table
(`walkOvercoat`, `walkShawlCardigan`, `walkCollaredKnit`, `walkJumper`, `walkOpenShirt`,
`walkQuarterZip`, `walkBuskerCoat`). Nothing in `packages/` changed. Every call is a pure function
of what you pass it. Call them on every frame, not once.

**Everyone, from the cues (the usual call).** First thing in `direct(t, show)`:
`dressWalk(show, t)`. Larry wears the overcoat until `chair-in` and the cardigan from then on.
The scarf draws on from `scarf-on` over 2 s and stays on. The envelope shows from `ask` until
`chair-in`. The six are dressed off duty. To move a change, pass cue names or seconds:
`dressWalk(show, t, { scarfOn, scarfDur, envelope, coatOff })`.

**By hand.**
- Larry, studio and street: `show.puppet('larry').dress(larryLook({ garment: 'overcoat', scarf, envelope }))`.
  `scarf` runs 0 to 1, and `scarfAt(t, from, dur = 2)` gives the eased amount. `envelope: true`
  stands a small blank envelope in the coat's breast pocket.
- Larry at the table: `larryLook({ garment: 'cardigan', scarf: 1 })`. The cardigan never shows the envelope.
- The six: `show.puppet(id).dress(crewLook(id))` for each id in `CREW`
  (`sibyl hy al dee pete eppy`). Sibyl wears a pale blue knit with a white collar and a pendant.
  Hy wears a pink open shirt. Al wears a cyan cable jumper. Dee wears a lime cardigan. Pete wears
  an orange hoodie with no logo. Eppy wears an orange quarter-zip, with no crest and no headset.
- The busker's coat is his look in `looks.js` (applied by the roster), so it needs no call. **His
  hat does:** in `drawFront`, call `drawBuskerHat(ctx, show, { tilt, nod })`. A costume hangs
  from the neck and cannot see the head, so the hat sits on `show.headOf('busker').crown` and
  follows his turn. It cannot see a nod or a tilt, so pass the same `tilt`/`nod` you give
  `show.puppet('busker')` that frame (at `tune-stops` his head tilts). If he is drawn through a
  `clip`, pass `clip` too. Without the call he is bareheaded.

**What looks wrong at an angle.**
- Bodies are flat and do not turn. In profile the head swings off the body's centre, and the
  scarf's knot stays on the body. At 3/4 and full profile the wrap's upper end sits just under the
  jaw on the far side. Chest-up it reads as a scarf pulled up. I have not looked at it closer
  than a head-and-shoulders shot.
- While the scarf is drawing on, the first ~0.1 of the amount shows only the end of the wrap,
  a short gold stub at the left of the collar with a bright leading edge. That is meant: it is
  the scarf starting to draw. If you cut to the collar instead, cut at an amount of about 0.3.
- `dress()` persists after the segment ends, so the studio's stock end card would show Larry in
  the cardigan. The stock cards are with the project manager.
- Larry's coat reaches about knee length when standing (`floor` set). Seen full length, his legs
  are the studio's stiff pair. The busker's coat is shorter (mid-thigh) and double-breasted, in
  muted violet, so the two men in long coats read apart.
- The hat's black fill hides the top of the busker's head. At a nod above about 0.2 the brim
  reaches his eyebrows.
