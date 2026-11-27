# Stage "The Walk Home": the clothes

- **Role:** builder (spawn the `builder` subagent defined in .claude/agents/builder.md)
- **Task:** `stage.costumes`, episode `003-holiday-2026`, segment `walk`
- **Write:** `episodes/003-holiday-2026/looks.js`,
  `episodes/003-holiday-2026/segments/walk/costumes.js`, and
  `episodes/003-holiday-2026/production/stage/costumes.md` (a short note for the other
  builders). You may add a look for the busker's cast entry but do not otherwise change
  `episodes/003-holiday-2026/cast.js`. Nothing else: not `index.js`, not the script, nothing
  under `packages/`.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/segments/walk/script.js` (the cue comments say what everyone
  wears and when) and `notes.json` (the `builder` field)
- `episodes/003-holiday-2026/production/research/staging.md`
- `docs/bible/02-cast.md` (who each of them is and what colour is theirs) and
  `docs/bible/08-direction.md`
- `packages/show/README.md` ("Looks and costumes"), `packages/show/src/stage/costumes.js`,
  `packages/show/src/looks.js`, `packages/show/reference/`

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, any `production/review/`,
or git history. Another builder is writing `segments/walk/index.js` and the street at the same
time as you; do not edit their files.

## The task

Everybody in this special is out of their show clothes. Make what they wear instead, kept with
the episode, in the show's vector look.

1. **Larry's overcoat.** The owner: "hes dressed a bit like colombo but not exactly, hes
   dressed for cold weather". A long, rumpled overcoat with the collar up, in a muted colour.
   No tuxedo, no bow tie. Seen chest-up for three minutes, so the collar, the lapels and the
   shoulders are what matter. It should read at once as the same man in his own coat.
2. **The scarf.** Gold, his colour, and the one thing of the show he takes outside. It must
   be able to draw itself round his collar over about two seconds, by an amount from 0 to 1
   that the scene's builder sets on each frame (no hand is ever seen). Once on, it stays on to
   the end.
3. **Larry at the table.** Coat gone, a cardigan, the scarf still on.
4. **A pay envelope showing at his coat pocket**, blank, from the cue `ask` until the coat
   comes off. Small.
5. **The crew at the table**, off duty and themselves: Sibyl, Hy, Al, Dee, Pete and Eppy in
   their own clothes. No silver jacket, no band jackets, Eppy without the headset. Each keeps
   their own hue so they are known at a glance. Only chests and shoulders show above the
   table.
6. **The busker**: an invented one-off, `busker` in the episode's `cast.js`. A man in a coat
   and hat under a street lamp. Not a likeness of anyone, and not to be taken for a member of
   the house band.

How the costume changes with time (overcoat on the street, cardigan at the table; the scarf's
amount; the envelope) has to be something the scene builders can set per frame from `t` with
one call, and it must be a pure function of what they pass: no state kept between frames.
The staging read says an episode cannot reach the drawing helpers inside the studio's
`costumes.js`; find the honest way to add a costume kind from the episode (the README names
`defineLook` and the `COSTUMES` table), and if there is none without changing the studio,
stop and say exactly what one-line change the studio would need. Do not make it yourself.

## Look at it

Shoot frames (`npm run shoot -- 003-holiday-2026 walk <t>…`, frames in
`shots/003-holiday-2026/walk/`) once the other builder's `index.js` exists; until then use the
reference episode or a scratch page of your own under your scratch folder to look at each
costume on its puppet: Larry in the coat with the scarf at 0, 0.5 and 1; Larry in the
cardigan; each of the six; the busker. Look at each from the front and in profile, and at the
size they will be seen.

## The note

`production/stage/costumes.md`, half a page: the exact calls a scene builder makes to dress
Larry for the studio, the street and the table, to set the scarf's amount, to show the
envelope, and to dress the six and the busker; and anything that looks wrong at an angle.

## Always

- No words on any costume. No hands. The constitution is the owner's: never change it.
- No git commands. You work alone, from this brief and the files it names. When you finish,
  reply with two or three sentences: what you made, what you looked at, and anything a scene
  builder must know.
