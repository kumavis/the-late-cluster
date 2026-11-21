# Brief: set the commission up as an episode that can be rendered and staged

- **Role:** `builder`
- **Episode:** `episodes/002-commissions-w47/`, a commission of four separate segments. It is not
  an episode that will air as one: the owner wants one video per segment. There is no open, no
  close and no join to write.
- **Segments, and the rundown order:** `making-of-inward`, `making-of-outward`,
  `riemann-proof-that-fits`, `riemann-market-wrap`.

## Read

- `packages/show/README.md` (authoring a segment, cast and looks, the episode's files) and
  `packages/show/tools/README.md` only for `render`, `check` and `shoot`
- `docs/bible/08-direction.md`, and from `docs/bible/09-real-people.md` what it requires of a
  puppet of a real account (the parody label, the disclaimer, that a puppet is not a likeness)
- `packages/writers-room/src/stage/late.mjs` around the assemble stage, to see what the pipeline's
  tool does when it copies selected drafts into segments; do the same by hand here
- each draft under `episodes/002-commissions-w47/production/drafts/<slug>/`: `script.js`,
  `notes.json`, and where they exist `cast.js` and `sources.json`

Do not read `production/review/`, `docs/ledger/`, `docs/trials/`, earlier episodes or other
branches.

## The task

1. For each of the four drafts, make `episodes/002-commissions-w47/segments/<slug>/` with the
   draft's `script.js` copied exactly (start from `npm run segment:new -- 002-commissions-w47
   <slug>` if that is the studio's way). The drafts stay where they are, unchanged.
2. `episodes/002-commissions-w47/cast.js`: the guests of the two Riemann drafts, with the voice
   settings their draft `cast.js` files already carry, exactly. Five guests: davidcrespo, huwupy,
   moultano, shimmermathlabs, dlowd. Change no voice.
3. `episodes/002-commissions-w47/production/sources.json`: the drafts' `sources.json` merged, each
   record carrying its segment, as the pipeline's tool would.
4. `episodes/002-commissions-w47/looks.js`: a look for each of the five guests, so the four
   staging builders who come after you never edit this file. A puppet is a head in the studio's
   style and is not a likeness of anyone: choose looks that tell the five apart from each other
   and from the house cast at a glance, from colour and shape only. Take nothing from anyone's
   profile picture, name or pronouns.
5. `episode.json`: the rundown in the order above, a plain description, `status` stays `draft`.
6. Render the audio of each segment (`npm run render -- 002-commissions-w47 <slug>`), so each has
   its `cues.json`. Then give each segment the studio's template `index.js` if it has none, so the
   episode loads, and run `npm run check -- 002-commissions-w47`. Report what it says. Failures
   that only say a segment is not staged yet are expected; anything else, fix if it is yours or
   report it.
7. Shoot one frame of each guest's puppet with its label (`npm run shoot`), look at them, and say
   in your report that the five can be told apart.

## Rules

- No script's words change, no `as`, no voice. Nothing a real person is shown saying changes.
- Nothing in `packages/` changes. If the studio lacks something the scripts need, say so in your
  report; do not add it.
- No git write commands, no network, never `.secrets`.

Reply in a short list: what you created, each segment's rendered length, what `check` says, and
anything the staging builders need to know.
