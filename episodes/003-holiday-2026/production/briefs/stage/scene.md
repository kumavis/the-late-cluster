# Stage "The Walk Home": one scene

- **Role:** builder (spawn the `builder` subagent defined in .claude/agents/builder.md)
- **Task:** `stage.<your scene>`, episode `003-holiday-2026`, segment `walk`. Your scene is
  given to you when you are spawned: `studio`, `restaurant-busker`, `crossing-door` or `table`.
- **Write:** only your scene's files in `episodes/003-holiday-2026/segments/walk/` (named in
  your section below; helpers you add are named after your scene, for example
  `table-props.js`). Nothing else: not `index.js`, not `street.js`, not another scene's file,
  not `looks.js`, `costumes.js`, the script or `cues.json`, nothing under `packages/`.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/production/stage/plan.md`: **the lead builder's plan. It is the
  interface you code against**: what your file exports, your cue range, how to ask for the
  camera, place puppets, put a landmark on the street, draw the street and the snow, and how
  to shoot your scene alone.
- `episodes/003-holiday-2026/production/stage/costumes.md`: the calls that dress everyone.
- `episodes/003-holiday-2026/segments/walk/script.js`: your cues and the comment under each
  one are the direction. Read the whole script once so you know what comes before and after
  you. `notes.json`, the `builder` field. `cues.json` for the timings.
- `episodes/003-holiday-2026/segments/walk/index.js`, `street.js` and your stub
- `episodes/003-holiday-2026/production/research/staging.md`
- `docs/bible/08-direction.md`, `docs/bible/02-cast.md`
- `packages/show/README.md`, `packages/show/reference/`, `packages/show/src/` (to read)

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, other episodes' `preview/`
or `shots/`, any `production/review/`, or git history. Three other builders are staging the
other scenes now, each in their own files. The sound is being reworked too, so timings may
shift a little: **key everything to cue names and line ids, never to seconds.**

## What holds for every scene

- **The look.** Glowing lines on black. Solid things are filled black behind their lines.
  Warm places (a lit window, the room) are warm by colour and brightness; there are no light
  sources or shadows, a lit thing is drawn brighter.
- **Nothing to read.** The only words in the special are OPEN, DON'T WALK and WALK. No signs,
  no names, nothing on the envelope, no source lines.
- **No hands.** Nothing is seen being picked up, put on, opened or passed by a hand. Things
  are already in place, or arrive from a frame edge, or are different after a cut.
- **The viewer is the camera.** We are never seen. When Larry turns to us he turns to the
  lens. At each `listen-` cue he turns to us and holds through the whole gap before the line,
  and **nothing else moves or changes in that hold**: it is the viewer speaking.
- **It will be watched on a phone, mostly at 640 by 360.** Whatever a line depends on (a cook
  slowing down, a figure in a window, a chair that is kept empty) must read at that size.
  Shoot at 1280 by 720 and also look at your key frames scaled down to 640 by 360.
- **Captions** sit at the bottom, about y 620 to 710, and larger on the phone cut, up to
  about y 560. Keep what matters above that.
- **Heads are the expensive thing.** Four at once at full smoothness. Crowds, diners and
  far figures are silhouettes or small glyphs, never real heads.
- **Pure functions of `t`.** No counters, no state between frames, `show.rng(seed)` for
  anything random. Seeking and frozen frames must give the same picture.
- **Do not change the script, the cues or the timings.** If a cue cannot be staged as its
  comment says, stage the nearest honest thing and say so in your reply.

## Your scene

### `studio` (file `studio.js`; cues `dark-studio` to `out-the-door`)

The studio switched off, as the cue comments describe: set pieces barely there, ON AIR dark,
the sign unlit, one bare work lamp on a stand making a small pool of light by the desk, the
city in the window the only other light. Larry in his overcoat, no tuxedo. A blank pay
envelope leaning against the mug in the close shot, and showing at his coat pocket from the
cue `ask`. He notices us in the doorway. He waits for our yes before "Good."

- **The scarf.** At `scarf-on`, cut to his collar as the scarf settles: the scarf is not seen
  drawing itself on. One shot he has no scarf and is looking down; the next is close on the
  collar with the scarf arriving the last of the way and coming to rest; then he looks up.
- The exit door swings open on the dark, the work lamp goes out on the tick, and it is black
  for half a second before the street.
- Nothing in this scene is the show on the air: no glow on the sign, no band, no audience.

### `restaurant-busker` (files `restaurant.js` and `busker.js`; cues `pass-restaurant` to `watch-the-cook`, and `busker-heard` to `coin`)

Two places on the street; use the lead's way of putting a landmark on the walk.

- **The restaurant.** A big warm front window, every table taken, head-and-shoulder
  silhouettes bobbing as they talk, two hanging lamps, a small neon OPEN. Larry stops at the
  glass in profile, the warm light on him. We are outside, in the cold, looking in at people
  who are warm: this picture comes back at his door, and that builder will want to echo it,
  so say in your reply how you drew the window.
- **The cook is the idea.** A lit kitchen hatch at the back of the room with one cook's
  silhouette working fast. The push in to the hatch, the cut back to Larry at the glass, the
  hatch again closer; then at the cue `cook-slows`, which lands on the words "slows down",
  the cook stops, leans in close over the board, and moves again slowly while the dining room
  goes on bobbing at full speed in front of him. Then `watch-the-cook`: wide enough for both,
  Larry watching in profile, the cook slow, the room quick, held with nobody speaking. The
  difference between the cook's pace and the room's must be unmistakable at 640 by 360: make
  the hatch large in its shots, and the cook's movement big and simple.
- **The busker.** Heard before he is seen. He slides in from the right two notes into his
  tune (the cue `busker-in` is placed for that) and the street stops. A man under a lamp in a
  coat and hat, an open case at his feet with nothing in it, an empty pavement both ways.
  Larry in profile, listening, not moving. He is an invented one-off with a puppet of his
  own (`busker` in the episode's cast): he sings, so his head shows the voice working. At
  `tune-stops` his head tilts as if looking for the next note. At `coin` one coin lands in
  the case from just out of frame and Larry's head dips to it. If a viewer with the sound
  off needs a sign that he is singing, draw it on him as a small glyph, never as words.

### `crossing-door` (files `crossing.js` and `door.js`; cues `crossing-red` to `walk-sign`, and `apartment-door` to `let-in`)

- **The crossing** is the centre of the special: about fifty seconds at one kerb, and the
  shot changes are what keep it from being a lecture. Follow the cue comments shot by shot:
  the wide with DON'T WALK in red on the far post and an empty road as far as the picture
  goes; his glance at us (`our-look`); close on Larry with the red of the sign on him, his
  head turning to us slowly and staying (`listen-put-right`, the longest listening hold);
  he looks away across the road at the red (`looks-at-red`); closer still for the quotation,
  Larry and the red light and nothing else (`tarfon-close`); a looser medium
  (`where-he-found-it`); the wide again (`two-at-the-kerb`).
- **Then nothing happens** (`still-red`). The sign stays red and the road stays empty. He
  looks at the sign, then at us, with a small tilt of the head, and goes on waiting. It has
  to read as the street being honest and not as a frozen picture: his breath, a slight
  drift, the red steady. At `walk-sign` the sign changes to WALK in green in its own time.
  **Do not move the change onto a word, and add no look up at it, no flash and no reaction.**
  He steps off the kerb. The lead's street takes over for the crossing in the snow.
- **His door.** Wide on a brick front in the snow: a street door with a lit pane over it and
  three floors of windows. One window on the top floor is warm and crowded with small moving
  figures: it is the restaurant window again, smaller, and we are outside it again. Larry at
  the door, head tipped up to it. He turns to go in and stops because we have not moved
  (`listen-door`), turns back to us and holds. He says the couplet up at the warm window,
  not at us (`looks-up`), then looks at us (`back-to-us`).
- **Somebody saw us coming.** At `let-in` the latch goes and the door swings in on its own,
  and warm light falls across the snow and across him. This reads only if the viewer has
  seen why: one small figure in the top window, standing still and facing the street while
  the others move, there from `apartment-door` on, and gone from the window a moment before
  the latch. Make that figure plain at 640 by 360. Without it the door opens by itself.
- It is snowing throughout the door scene: use the lead's snow.

### `table` (file `table.js`; cues `table-wide` to the end)

A warm room, a lamp, a window with the snow going past it, and one long table drawn in front
of the puppets so that it hides them below the chest. Candles, glasses, one big covered dish,
and every plate clean in the first wide. Sibyl at the head, then Eppy, Al, Dee, Hy and Pete,
in their own clothes. Follow the cue comments shot by shot.

- **Seven heads only twice**, both short and both from the door with Larry at the frame's
  edge: `table-wide` and `they-look`. Every other shot holds four heads or fewer.
- **The gold chair** on the near side, its back to us, empty, is Larry's place, kept for
  him: it must read as his (gold is his colour) and as waited-for. **The second chair** that
  slides in from the right edge at `chair-in` is ours. Then the camera goes to it and settles
  at table height: we are sitting. Larry is beside us in the gold chair, coat gone, a
  cardigan, the scarf still on. A plate, a glass and a fork slide into place along the
  bottom of the frame in front of us.
- **`they-look`**: all six heads turn from Larry to the camera together and hold. Nothing
  else changes: **no change of light, no dimming, no stillness laid over the room** beyond
  the heads themselves.
- **`served`**: the dish has lost its lid at the cut (it is never seen to move). A bowl comes
  along the table from Dee's end, in from the left edge behind the candles, passes Larry and
  stops at our plate. His head follows it all the way. That look is what makes his next
  line, "It's my house.", fond: he is losing an argument about a rule he has just quoted to
  us, and he knows it. Sibyl does not look up from her plate.
- **The meal** (`the-meal`): from our chair, nobody looking at us, everyone talking at once,
  bowls going along the table in both directions, heads turned to one another. Our plate has
  something on it now. Let it run.
- **Nobody raises or taps a glass, at any point.** Glasses stay on the table.
- **`goodnight`**: Larry in the next chair turns from the table to camera and the push in is
  slow. While he says the owner's lines **nothing behind him asks to be looked at**: the
  table is soft and warm, heads turned to one another. After the last word he stays on us a
  moment, nods, and his head goes back to the table. Hold about three seconds from our
  chair with the room still going and our plate in the frame, then fade to black. Black is
  the last frame; the credits that follow are not yours.
- Dee's laugh is a voiced line; nothing lights up for it.

## Look at it

`npm run shoot -- 003-holiday-2026 walk <t>…` (frames in `shots/003-holiday-2026/walk/`; batch
the timestamps into one run). Take each time from `cues.json` by cue name. Shoot every cue in
your scene, the middle of every hold, every shot change, and a frame mid-word for each line
spoken in your scene. Look at every frame. Read the console lines `shoot` prints and fix any
unknown cue. Then look at your key frames at 640 by 360.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- No git commands. You work alone, from this brief and the files it names. When you finish,
  reply with three or four sentences: what you built, the frames you looked at, anything
  that could not be staged as written, and anything left for the auditor.
