# Stage the segment riemann-proof-that-fits

- **Role:** `builder`
- **Episode:** `episodes/002-commissions-w47/`, a commission of four separate segments. The owner wants one video per segment.
- **Write:** `episodes/002-commissions-w47/segments/riemann-proof-that-fits/index.js`, and helpers and props beside it in the same folder. Nothing else: not `looks.js`, `cast.js`, any script, `sources.json`, another segment, or anything in `packages/`.
- **Check:** `npm run check -- 002-commissions-w47` (the lines about your segment), and your own eyes on frames from `npm run shoot -- 002-commissions-w47 riemann-proof-that-fits <t>…`.

## Read

- `packages/show/README.md`: authoring a segment, props, the camera, captions, cards and labels
- `packages/show/templates/segment/index.js` and `packages/show/reference/`, a working example
- `docs/bible/08-direction.md`
- `episodes/002-commissions-w47/segments/riemann-proof-that-fits/script.js`: every cue carries a comment saying what the place is and what the camera does. That is your direction. And `episodes/002-commissions-w47/segments/riemann-proof-that-fits/cues.json`, the rendered timings.
- `episodes/002-commissions-w47/cast.js` and `episodes/002-commissions-w47/looks.js`, to read only
- `episodes/002-commissions-w47/production/sources.json`: the exact text, display name, handle, date and counts of every real post shown
- `episodes/002-commissions-w47/production/research/terms-riemann.md`: "Rules for the whole subject" at the end, and the section for the card `riemann-what-is-a-zeta-function`, for what may be shown

Do not read `production/review/`, `production/brainstorm/`, `docs/ledger/`, `docs/trials/`, earlier episodes, their builds or other branches.

## The segment

A demonstration of something a member made: a one-post proof, built on the desk slab by slab while Eppy calls each one. Two members' puppets speak; a third member's post rises on a card and Sibyl reads it.

## The task

Write `episodes/002-commissions-w47/segments/riemann-proof-that-fits/index.js` against the rendered `cues.json` ("Authoring a segment" in the studio's README). Helpers and props go in `segments/riemann-proof-that-fits/` and are imported as `@late-cluster/episode/segments/riemann-proof-that-fits/<file>.js`; studio code as `@late-cluster/show/<path>`. Never import from another segment or from `production/`.

Shoot a frame at every cue and in the middle of every long hold or camera move, look at each one, and fix what you see: anything unreadable, overlapping, under the captions, cut off, or showing through without a fill. Captions are on and carry every line, so keep graphics clear of the caption band or hide the caption for that moment as the README describes. When a move matters, shoot three frames across it.

Three other builders are staging the other three segments at the same time, each in its own folder. If the studio lacks something the script asks for, build the nearest thing inside your segment's folder and say so in your report.

## Rules

- A real post on screen shows its exact text, with display name, handle, date and counts, cut only with an ellipsis.
- A puppet of a real account wears the parody label, and the disclaimer runs at the first one, as the studio provides.
- Nothing longer than a glance is on screen unless it is spoken in the segment.
- Frames at every cue load with no page errors and no unknown cues.
- The script, the cues, the voices and what a real person is shown saying do not change.
- No git write commands, no network, never `.secrets`.

## Notes for the stager, from the audit of this script

- Every real post on a card is exact, with display name, handle, date and counts. The caller's card has a reply line that reads REPLY and carries no handle: one account's handle must appear nowhere in this segment, as the script's header says.
- The tag at the cue `tag-k` is exactly `… more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …`, both ellipses included.
- The proof's bars, brackets and slabs are the show's own drawing of her steps. Draw exactly the quantities her post states and nothing more: no extra claim, no verdict.
- Nothing on screen says or implies whether the larger proof in the news is right: no stamp, tick, QED or score lands on anything.
- If two blocks of unspoken text would be up together for more than a glance, say where in your report; do not change the script.

Reply in a short list: what you built, the times of the frames you looked at, anything the script asked for that you could not do, and anything an auditor of the frames should look at first.
