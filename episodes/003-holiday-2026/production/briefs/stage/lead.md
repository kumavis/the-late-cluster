# Stage "The Walk Home": the structure and the street

- **Role:** builder (spawn the `builder` subagent defined in .claude/agents/builder.md)
- **Task:** `stage.lead`, episode `003-holiday-2026`, segment `walk`
- **Write:** `episodes/003-holiday-2026/segments/walk/index.js`,
  `episodes/003-holiday-2026/segments/walk/street.js`, one stub file per scene (below), and
  `episodes/003-holiday-2026/production/stage/plan.md`. Nothing else: not the script, not
  `cues.json`, not `looks.js` or `cast.js`, nothing under `packages/`.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/segments/walk/script.js` (every `cue` and the comment under it is
  the direction), `notes.json` (the `builder` field) and `cues.json`
- `episodes/003-holiday-2026/production/research/staging.md`: a builder's read of what the
  kit can and cannot do for this special. Trust it, and test what it says is untested.
- `docs/bible/08-direction.md`
- `packages/show/README.md`, `packages/show/reference/`, `packages/show/templates/`,
  `packages/show/src/` (to read)

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, other episodes' `preview/`
or `shots/`, any `production/review/`, or git history.

## What this is

One segment, four minutes, that leaves the studio: a dark studio, a walk down a night street
past a restaurant, a busker and a crossing, a street door, and a table of friends. It is too
much for one builder, so it is staged by several, each in a file of their own. **You go first.
You lay out the structure the others build inside, and you build the street itself.** After
they finish you will be asked back to join the scenes and shoot the whole.

Three other things are being made at the same time as you work, by others: Larry's overcoat
and scarf and the crew's off-duty clothes (`episodes/003-holiday-2026/looks.js` and
`segments/walk/costumes.js`); a title and an end for this episode in place of the studio's
stock cards; and the sound (the script may gain sound beats and its timings may shift a
little, so **key everything to cue names, never to seconds**).

## The task

### 1. The structure: `index.js`

Write the segment module so that each scene lives in its own file and `index.js` only decides
which scene is on and hands it the frame. Decide the interface, keep it small, and write it at
the top of `index.js` and in `production/stage/plan.md`, because four builders will code
against it without being able to ask you anything. It must settle at least:

- what a scene file exports (for example `setup(show)`, `direct(t, show, ctx)`,
  `drawBack(ctx, t, show)`, `drawFront(ctx, t, show)`), and what `index.js` passes it;
- which cue each scene starts and ends on, taken from the script, as one table in one place;
- how a scene asks for the camera and places Larry and the other puppets, so two scenes never
  fight over a puppet, and how a hard cut and a fade to black are asked for;
- how everything stays a pure function of `t` (seeking and frozen frames must work);
- how a scene is shot on its own while the others are still stubs.

The scene files, each a stub from you that draws its name and its cue range so the whole
segment plays from the first day:

| file | scene | cues, first to last |
|---|---|---|
| `studio.js` | the studio switched off, the envelope, the scarf, the door, black | `dark-studio` to `out-the-door` |
| `street.js` | **yours**: the walking street and everything said on it between landmarks | `street-start` to `answers-ahead`; `walk-on`; `walk-past` and `tune-again`; `cross`, `last-block`, `glance` |
| `restaurant.js` | the lit window, the cook in the hatch | `pass-restaurant` to `watch-the-cook` |
| `busker.js` | the singer under a lamp, the coin | `busker-heard` to `coin` |
| `crossing.js` | the empty road and the red sign, to the change | `crossing-red` to `walk-sign` |
| `door.js` | his building, the warm window, the latch | `apartment-door` to `let-in` |
| `table.js` | the room, the table, the meal, goodnight, black | `table-wide` to the end |

The restaurant, the busker, the crossing and his building are **places on the street**: they
slide in as the walk reaches them and the walk stops in front of them. So their builders need
your street behind and around what they draw. Give them a way to put a landmark at a place
along the walk and have it arrive on its cue, and a way to keep drawing the street's layers
(and later the snow) from inside their own shots.

### 2. The street: `street.js`

The staging read's way: Larry from the chest up, side-on, walking screen-right with a small
bob and a puff of breath every few steps; the street sliding left behind him in layers at
different speeds (a far plain skyline, dark building fronts with a few lit windows, lamp
posts, the kerb); every lamp drawn again under itself, upside down and dimmer, in the wet
road. The camera is the viewer at his shoulder.

- The walk is one continuous distance as a function of `t`. It stops exactly when the script
  says the street stops (at the restaurant window, at the busker, at the crossing, at his
  door) and starts again when it says tracking resumes, easing in and out. Seeking to any `t`
  gives the same street.
- Building fronts are made once from a seed and never change between frames.
- Larry's head: he faces the way he walks, and turns to camera where a cue says he turns to
  us. At each `listen-` cue he turns and **holds, with nothing else happening, for the whole
  gap before the line**: that hold is the viewer speaking. At `turn-to-us` he asks and waits.
  At `eyes-front` and `answers-ahead` he looks back at the road. At `glance` he turns to us
  and away at once.
- From `cross` on it is snowing: a few flakes through the lamplight, then more, on every
  layer, and it keeps snowing to his door. Other scenes will need to draw your snow.
- `last-block`: a little closer than before, a row of lit apartment windows above him.
- The plain skyline here is not the studio's simcluster skyline played as a joke; it is just
  a city at night.
- Larry wears whatever the episode's `looks.js` gives him. Until the costume builder's work
  lands he will be in his tuxedo. Do not wait for it and do not draw a coat yourself.

### 3. Look at it

`npm run shoot -- 003-holiday-2026 walk <t>…` writes frames to `shots/003-holiday-2026/walk/`.
Shoot the street at a dozen moments (mid-stride, each head turn, each hold, a stop and a start,
the first snow, the last block) and look at every frame. Shoot one frame inside each stub to
show the dispatch works. Check the console lines `shoot` prints for unknown cues.

### 4. `production/stage/plan.md`

Two pages at most, for the four scene builders: the interface, the cue table, how to place a
landmark, how to draw the street and the snow from inside a scene, the units and where Larry
stands, how to shoot one scene, and what you found about the things the staging read marked
as not sure. Plain and exact; they will have nothing else.

## Rules

- Nothing on screen to read. The only words in the whole special are OPEN, DON'T WALK and
  WALK, and none of them are yours.
- No hands. Nothing is seen being picked up or put on.
- Do not change the script, the cues or the timings. If a cue cannot be staged as its comment
  says, stage the nearest honest thing and say so in the plan.
- Studio code is imported as `@late-cluster/show/...`; the segment's own files as
  `@late-cluster/episode/segments/walk/<file>.js`.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- No git commands. You work alone, from this brief and the files it names. When you finish,
  reply with three or four sentences: what you built, what you looked at, and what the scene
  builders most need to know.
