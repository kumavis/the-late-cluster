# The studio: an episode may open and close without the stock cards

- **Role:** builder (spawn the `builder` subagent defined in .claude/agents/builder.md)
- **Task:** `studio.cards`, for episode `003-holiday-2026`
- **Write:** the studio (`packages/show/src/`, its README and tests), `docs/ARCHITECTURE.md`
  where it describes the cards, the video tool only if it must change to respect the option,
  and `episodes/003-holiday-2026/episode.json` to switch the option on. Nothing in
  `episodes/003-holiday-2026/segments/`, which other builders are writing now.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/segments/walk/script.js`: the first cue (`dark-studio`) and the
  last (`goodnight`), and `notes.json` (`builder`, "THE END", and `credits`)
- `episodes/003-holiday-2026/production/review/audit-final-r1.md` is not for you; what it
  decided about the credit is given below
- `docs/bible/00-constitution.md`, Article 4
- `packages/show/README.md` ("Title, production and end cards"),
  `packages/show/src/show/builtins.js`, how `episode.json` is read
  (`scripts/lib/episodes.mjs`, `packages/show/src/episode.js`), `packages/show/tools/video.mjs`
  and its README section, `docs/ARCHITECTURE.md`

Do not read `docs/ledger/`, `docs/trials/`, any `production/review/`, or git history. Do not
rebuild or re-render any other episode.

## Why

Episode three is a holiday special. It opens on the studio dark and switched off, and its last
words are "Stay warm, folks. Goodnight." at a table of friends, then a hold on the room and a
fade to black. The stock title card plays the lit studio before the first segment, and the
stock end card cuts to the lit studio with the band playing and its own heading after the
last. Either one breaks this episode. The owner has said to go ahead through to the video;
that this episode may open and close in its own way is the project manager's reading of that,
and the owner can reverse it, so it must be a switch and not a rewrite.

## The task

1. **An option an episode sets for itself**, in `episode.json`, off by default, so that the
   pilot and episode two build and play exactly as they do now. Name it plainly and document
   it. With it on:
   - **no title card**: the episode starts on its first segment's first frame, on the page
     and in the video;
   - **a plain end**: after the last segment's last frame (which this episode has already
     faded to black), the credits roll over black. No studio, no band, no music, no heading
     that says good night. The page still offers to watch again.
2. **The credits keep everything the constitution requires** (Article 4): the house cast who
   appear, and that every voice is synthesized by CHIMERA. This episode has no guests, so
   there is no personas list. Find out how the roll lists `busker`, an invented one-off in
   the episode's `cast.js` who only sings: he should be credited as what he is (for example
   "THE BUSKER", under the cast), never under the heading for real accounts' personas.
3. **Credits an episode supplies.** An episode can give extra credit lines in its
   `episode.json`, shown in the roll under a heading it names. For this episode, add:
   - under **QUOTED**: `Pirkei Avot, chapter 2 · translated by Joseph I. Gorfinkle, "The
     Sayings of the Jewish Fathers", first published 1913`
   - under **TOLD FROM**: `The Zhuangzi: the cook who carved the ox` and `The Tirukkural,
     chapter 9`
   The auditor's instruction on the first: the credit gives 1913 as the year the translation
   was first published and must not say or imply which edition's text was checked.
4. **The poster and thumbnail.** With no title card, find what `npm run thumbnail` and the
   video's poster frame would use, and make sure neither falls back to a card that no longer
   plays. If a choice is needed, leave it as an option with a sensible default and say so.
5. **Tests and the contract.** `npm test` and `npm run verify` pass, on a checkout with
   nothing installed. Add tests for the option (default off; on: no title, plain end, extra
   credits). Change `docs/ARCHITECTURE.md` and `packages/show/README.md` in the same change.
   If a mocked test cannot know something a real run does, shoot it.
6. **Look at it.** `npm run shoot -- 003-holiday-2026 title 1` and `end <t>…` (the README says
   how the cards are shot): shoot the end roll at several moments and read every line. Shoot
   the pilot's or episode two's title and end once to see they are unchanged. The segment
   `walk` may still be half-built by others; that is expected.

## Rules

- Off by default, and no change in what an episode without the option shows. Do not rebuild
  an old episode to prove it: shoot it.
- Credits are the one place unspoken text is allowed. Keep the roll to what is needed.
- No git commands. Lockfiles are not touched.

## Always

- The constitution is the owner's: never change it.
- You work alone, from this brief and the files it names. When you finish, reply with three
  or four sentences: the option's name and what it does, what you shot and read, and anything
  the project manager must decide.
