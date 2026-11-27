# Sound for "The Walk Home": the voice fit, and the places

- **Role:** sound editor (spawn the `sound-editor` subagent defined in .claude/agents/sound-editor.md)
- **Task:** `sound.walk`, episode `003-holiday-2026`, segment `walk`
- **Edit:** `episodes/003-holiday-2026/segments/walk/script.js`: `as` respellings, timing, and
  sound beats (below). No word of any line. `docs/voice-research.md` through
  `npm run voice-research`.
- **Write:** `episodes/003-holiday-2026/production/fit/sound-walk.md`, your report.
- **Render with:** `npm run render -- 003-holiday-2026 walk` (writes
  `episodes/003-holiday-2026/public/audio/walk.mp3` and `segments/walk/cues.json`). Fit with
  `npm run fit -- 003-holiday-2026 walk`.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/segments/walk/script.js` and `notes.json`. The comment under each
  cue says what the place sounds like.
- `episodes/003-holiday-2026/production/fit/pace-walk.md`: the pacing pass already done on
  this script, with its table of silences. Keep that pacing.
- `episodes/003-holiday-2026/production/research/staging.md`, the rows on sound
- `docs/bible/07-voices.md`; `packages/show/tools/README.md` ("Writing a segment script",
  "The audience and the band", "Fitting a script", "The voice research file")

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, any `production/review/`.
Builders are staging this segment at the same time, keyed to cue names: **do not rename,
remove or reorder any cue**, and keep the overall length within about five seconds of what it
is now (241.8 s).

## The task, in two parts

### 1. The places

The owner listened to a rough cut of this script and the street was dead air: the script's
comments ask for sounds the library does not have, so the outdoor holds are silence, the
longest ten seconds. Build the sound the comments describe, from what the engine has (every
sound in this show is a synthesized voice: beatbox, hums, breath, the `murmur`, `whoosh` and
`tick` effects, the creature calls).

- **Footsteps.** "Two sets of footsteps, his and ours, soft beatbox ticks a little out of
  step with each other. They stop whenever we stop. They are the only sound the viewer ever
  makes." From `street-start` to his door, in every stretch where the script says they are
  walking, and silent in every stretch where it says the street has stopped (at the
  restaurant window, at the busker, at the crossing, at the door). They go softer once it is
  snowing. They are quiet: under speech they should be felt more than heard, and in a hold
  they are what tells the listener that two people are still walking. They must never be
  heard as a drum beat or a clock.
- **The listening holds stay empty of anything but the steps.** Where Larry turns and holds
  before he says a question back, the steps may continue if they are walking, and nothing
  else sounds.
- **The crossing** is "the quietest place on the walk": no steps, nearly nothing.
- **The restaurant**: a full room heard through glass, as a bed under the whole scene and
  not four separate bursts. It arrives as the window does and leaves with it.
- **The table**: the burst of six people talking is cut off on a breath as the door opens;
  the room starts up again, warmer, once we sit; it runs as a bed under the meal and under
  the owner's last lines, low enough that they sit clear, and for about three seconds after
  the last word. A chair pulled across a wooden floor at `chair-in`, if the engine can make
  one that reads; if not, leave it out and say so.
- **The coin, the lamp, the sign and the latch** are all `tick` today. The coin must not
  sound like a footstep, nor like the note the tune was missing. Make them tell apart by
  level, pitch or which variant, as far as the library allows.
- **The busker** already has a voice of his own. Check he is heard before he is seen and
  that the tune can be heard to stop short.

You may add `sfx`, `call`, `music` and `wait` beats and change their values to do this. A
`music` block moves the cursor to its own end, so to lay one under speech you step back with
a negative `wait`; check in the printed timeline that it does what you meant, and listen with
the analysis tools you have (`bun packages/show/tools/analyze.ts mp3 003-holiday-2026 walk`)
for whether a bed is masking speech. If the footsteps cannot be made to work from parts, say
exactly what one new sound the shared library would need, and leave the stretch silent. Do
not add a sound to the shared library yourself.

No laugh, applause, cheer or sting anywhere: they would light the studio's sign.

### 2. The voice

Fit the script on a best effort (`npm run fit`), as for any episode: read what was heard for
every line, choose among the respellings, record hard words in the voice research file.
Nothing goes back to a writer for pronunciation, and no word changes.

Look hardest at these, and put what each was heard as at the top of your report for the
owner's ears: "rabbi", "Tarfon", "Torah", "Zhuangzi", "Tirukkural", the quotation in the
English of 1913 ("thy", "art thou", "desist"), Sibyl's "That is the rule." (its first word is
being swallowed), and Pete, who has not spoken a line alone before. One thing is never
accepted: a line heard as crude, alarming or out of bounds, and for this script that
includes any of those names heard as another word that would be an insult to the tradition
it comes from. Find another spelling; if there is none, put the line first in your report.

## The report

`production/fit/sound-walk.md`: the length before and after; what you built for each place
and how (the beats, in a line each); the heard text of every line that is still heard
differently from its caption; the lines for the owner's ears first; anything that needs a
builder or a new library sound; the path of the mp3.

## Always

- You change no words. The constitution is the owner's: never change it.
- No git commands. You work alone, from this brief and the files it names. When you finish,
  reply in three or four sentences: what the street sounds like now, what is still heard
  wrong, and anything the owner should listen for.
