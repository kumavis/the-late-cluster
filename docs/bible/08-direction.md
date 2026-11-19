# 8. Direction and visual comedy

A segment's `index.js` is its direction: shots, puppet acting, graphics. The API, shot list, props
and costumes are in `packages/show/README.md`. This file is the principles. Read a pilot segment's
`index.js` beside it; the comments say why each choice was made.

## Principles

### 1. A joke is not finished until something is built or staged

The pilot has a picture for nearly every punch: a stamp, a split-flap, a card, a prop, a puppet
doing something. When the bot says "Built it.", the thing it built appears: a site in a browser
window, a stamp FANTASY LEAGUE: LIVE, the E key falling on the desk, the crow bursting out of the
contraption. Write the picture into the script as a `cue` at the punch, and draw it in `index.js`.

### 2. Land the picture on the word

Sync to the word, not the line. The pilot reads word timings from `show.line(id).words`:

- the three extra Discords pop on the word "four";
- the alligator surfaces on "alligator" (word 7 of Abel's line);
- the guest nodes over the skyline light on each name as Sibyl says it;
- the weather's 177 and 29 split-flap on the numbers, the books stack on "inches";
- the sports board stamps FINAL on "sports!".

A picture that arrives half a second late reads as decoration. On time, it is the punch.

### 3. Frame for the artefact

Each format has a framing that leaves room for its graphics:

- **Monologue:** Larry centred for setups; the camera slides so he sits in the left third when an
  artefact builds over his right shoulder; the graphics fade as the camera leaves that framing.
- **Desk features:** `ots` (presenter in one third, panel in the rest), `sports` (desk plus a ticker
  lane).
- **Builds:** pull back so the build and Larry share the frame (the panel widens for both builds
  so Abel's machine on the floor and Larry at the desk are both visible).
- **Reveals:** cut to a wide or a push on the thing revealed.

### 4. Cut on the turn, push on the punch, widen for the build

- Cut to a reaction or cutaway on the turn: to the band for "tribute band", to Sibyl for Jevbot.
- Push in on a punch: the push to Larry's close-up on "My mom says I'm a hundred" and "This
  monologue was a joke an hour ago".
- Widen when something is built: the bot pops up, the camera makes room.
- Cut freely: the monologue changes shot every 4 to 6 seconds. A static talking head for more than
  8 seconds is a problem unless the words are the point (the goodnight answer).

### 5. Reactions are jokes

Heads turn and nod; use that.

| acting | meaning | pilot |
|---|---|---|
| `lookAt('camera')` | talking to us | Larry's setups |
| `lookAt(speaker)` | listening | everyone in the panel |
| `lookAt` the graphic, then back | presenting | Larry glances at each monologue graphic as it lands |
| looking down at himself | surprise at existing | Larry under the lights in the cold open |
| `nod(-0.05)` late in a line | selling the punch | the monologue's punchlines |
| `tilt` | wistful or sheepish | Samantha on "Gn is still rare"; Larry on "my mom" |
| `shake` | flinch | Larry as the crow circles; Sibyl at the shatter |
| looking away and leaning back | refusal | Larry eyeing the E key: "I'm not touching that." |
| left, right, camera in quick succession | realisation | "Wait. It's this show." |
| `scaleTo` growing | a wind-up | the bot inhaling before the blackout |
| pop-up from below frame or behind furniture | an arrival | the bot; BorJev behind the couch |
| `fx('hologram')` / monitor | remote, archival, fading | (available; unused in the pilot) |

Who looks at whom carries the dynamics: Sibyl watches Larry and turns to the bot when it builds;
Larry turns to whoever is ruling; guests look at each other when one assigns the other a task
("abel?").

### 6. One focal point at a time, and time to read it

The eye goes to motion and brightness. Introduce one new thing at a time. When text matters, give
it time: about **one second per four words of card text, plus half a second**, and keep the voice
quiet or slow while it reads. The pilot gives the *simcluster is how nerds say "my friends"* card a
1.8 s wait of its own before the next line.

### 7. Real things look real; invented things look invented

- **Real posts** go on a `skeetCard` with the real display name, handle, date and like count, and
  the verbatim text (trimmed only with an ellipsis that keeps the meaning). Add a provenance label
  where it helps: *EXCERPT · THE WEBSITE BOT, ASKED TO RIG A VOTE*; *FOOTER OF "ARE YOU IN THE
  SIMCLUSTER?" BY @SHIMMERMATHLABS.COM*; *REAL · PLAY MONEY*; *(REAL)*; *QUOTED BY @BORJEV.BSKY.SOCIAL*.
- **Invented posts and sites** use handles and URLs that can't belong to anyone (see
  [real people](09-real-people.md#r8-fiction-must-look-like-fiction)): `websitebymorning.example`
  in the pilot is right; the pilot's `did-anyone-say-gn.website` and `@made.a.website` use a real
  top-level domain and could exist, so prefer `.example`. A display name like *somebody* is fine.
- **When real and invented numbers share a board, label each.** The sports desk's line shows the
  bot trader's real +$19,865.83 as *REAL · PLAY MONEY* and the humans' invented -$4.00 as *FAKE ·
  ALSO PLAY MONEY*. The label is itself a joke and keeps the board honest.
- Never put invented words on a card with a real person's handle. Ever.

### 8. The screen is denser than the voice

The voice carries setup and punch; the screen carries tags, numbers and provenance (see
[joke craft](06-jokes.md#why-the-screen-carries-the-density)). Chyron titles are a joke channel too:
*Your host · six minutes old*; *Doing Jevbot · it has one setting*; *Back after this. If the crow
allows it.*; *Brought to you by the letter E*. The name and handle on a chyron must be accurate; the
title can be a joke.

### 9. Continuity is set state

Things that persist across segments are set flags, assigned every frame: the E key on the desk
from Built or Bit? onwards (`set: { eKey: true }`); the crow circling the skyline after the panel
(`crow: 'circling'`). Record their end state in [lore](lore.md) so the next episode starts from it.

### 10. Mind the frame budget

Four heads plus graphics holds 60 fps on a laptop. Heads are expensive: prefer shots with few
visible heads, and build heavy geometry (maps, graphs) once in `setup`.

## The house visual vocabulary

Use these consistently, so viewers learn them. Most are shared props in `packages/show/src/kit/`.

| device | means | pilot uses |
|---|---|---|
| **stamp** | a verdict or label | CLAIM, NOT INSTALLED, TOTAL DURATION: 1 DAY, NO, MOST ETHICAL MEMBER, FANTASY LEAGUE: LIVE, FINAL, LOST, BUILT, OPT-IN ONLY, NOT A WORD, BUILT IT |
| **split-flap** | a number or a title arriving | CATOID WEEK, 177, IMMEASURABLE, +$19,865.83, the p(doom) board 3 → 0 |
| **confetti** | something got built | every bump |
| **skeet card** | a real post (or a clearly fictional one) | the ask, footers, replies, the answer cards, gn |
| **browser window** | a website exists now | the checker; *WEBSITE BY MORNING*; *HAS ANYONE SAID GN TONIGHT?* |
| **typewriter** | a request being typed | "> build me a fan page" / "> now rig the voting" |
| **podium, limbo bar, scoreboard, bulbs** | a contest | Top Chicken, Built or Bit? |
| **creature** | a persona's habit, as an animal | the crow, the alligator, the chicken, the elephant |
| **the BUILT counter** | the runner | top-left, every segment |
| **the E key** | the exit | on the desk; pressed at the end |

**Stamps are the house punctuation, and the easiest thing to overuse.** The pilot has about fifteen.
In a weekly keep it to one every 20 seconds or so, and vary the reveal: a card flip, a split-flap, a
prop, a puppet action.

## Colour

Each character has a signature colour, and their artefacts use it: Larry gold (the tux, his bet
slip, his gn post), norvid violet (his cards, the crow's pie slice), Abel green, Samantha sky-cyan,
the bot mint, Eppy orange. Verdicts are red (NO, LOST, NOT A WORD) or lime (BUILT, FANTASY LEAGUE:
LIVE). Keep to the palette.

## The vector look

- Everything is light on black. Lines add, so fill black behind any graphic over the set
  (`occlude`), or overlaps turn to mush.
- Hershey capitals read best. Lower case is for posts and handles.
- At most three blocks of text on screen at once, including the caption.
- Keep big graphics above y ≈ 610; the captions live below it. Or hide the caption for the moment.
- Glow (`hot`, `glowText`) is for the one thing you want looked at.

## Staging patterns from the pilot

- **The over-the-shoulder artefact** (monologue): frame, title, the artefact builds in steps synced to
  the lines, a stamp on the punch, a real post card as the topper.
- **The build reveal:** wish line → bot pops up → "Built it." → confetti → the built thing appears
  where it would live (a browser window over the map, a stamp on the board, an object on the desk).
- **The card flip** (Built or Bit?): the idea card flips edge-on and shows what got built on the back.
- **The labelling stamp** (panel): the label slams onto the puppet who was labelled.
- **The world prop** (panel, Built or Bit?): something drawn in world units around Larry, so it moves
  with the camera: the museum case and velvet rope, the falling key.
- **The lights-down** (song, goodnight): dim the set, a spotlight cone on one head, others hidden.
- **The power-down** (goodnight): the CRT squeeze to a line, a dot, black, credits over the skyline.

## Direction anti-patterns

- Graphics that print the line just spoken. Add a tag or show the evidence instead.
- Text in the caption band.
- A card shown for less time than it takes to read.
- Invented text on a real-looking card.
- Frame-to-frame state in `direct` or `draw*` (counters, "first time" flags, `Math.random()`). Compute
  everything from `t`, so seeking and frozen frames work.
- A segment where nothing is built or drawn for twenty seconds.

## Review your frames

Shoot frames at every punch word, every cue, every shot change and every overlap, in one batch
(`npm run shoot -- <ep> <seg> <t>...`). Look at each: is the punch picture on screen at the punch?
Is any text under the captions? Is anything unreadable, overlapping, or showing through without a
black fill?
