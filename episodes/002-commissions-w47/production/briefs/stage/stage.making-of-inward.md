# Stage the segment making-of-inward

- **Role:** `builder`
- **Episode:** `episodes/002-commissions-w47/`, a commission of four separate segments. The owner wants one video per segment.
- **Write:** `episodes/002-commissions-w47/segments/making-of-inward/index.js`, and helpers and props beside it in the same folder. Nothing else: not `looks.js`, `cast.js`, any script, `sources.json`, another segment, or anything in `packages/`.
- **Check:** `npm run check -- 002-commissions-w47` (the lines about your segment), and your own eyes on frames from `npm run shoot -- 002-commissions-w47 making-of-inward <t>…`.

## Read

- `packages/show/README.md`: authoring a segment, props, the camera, captions, cards and labels
- `packages/show/templates/segment/index.js` and `packages/show/reference/`, a working example
- `docs/bible/08-direction.md`
- `episodes/002-commissions-w47/segments/making-of-inward/script.js`: every cue carries a comment saying what the place is and what the camera does. That is your direction. And `episodes/002-commissions-w47/segments/making-of-inward/cues.json`, the rendered timings.
- `episodes/002-commissions-w47/cast.js` and `episodes/002-commissions-w47/looks.js`, to read only
- `episodes/002-commissions-w47/production/research/terms-making-of.md`: the sections "The turn to the audience" and "Required on screen"
- `episodes/002-commissions-w47/production/research/production-facts.md`: only to check a number you draw (13 stages, 7 steps, 248 accounts)

Do not read `production/review/`, `production/brainstorm/`, `docs/ledger/`, `docs/trials/`, earlier episodes, their builds or other branches.

## The segment

An explainer of how the show is made, as **one continuous shot** that never cuts. The camera goes into Larry's mouth, and every level down is a place it travels into: the inside of his head, a throat that is a tunnel of thirteen rings with a smaller Larry at the end, a shorter tunnel inside that Larry, a stub inside the next, and at the bottom the bare vocal tract. It is staged in three dimensions: the owner asked for each level of the recursion to be a place the camera can travel into. Use the studio's own head model (lips, jaw, tongue, velum) for the inside of the head and for the bare tract at the bottom, moving with the line's telemetry as every head does. The smaller Larrys are the house puppet, smaller.

## The task

Write `episodes/002-commissions-w47/segments/making-of-inward/index.js` against the rendered `cues.json` ("Authoring a segment" in the studio's README). Helpers and props go in `segments/making-of-inward/` and are imported as `@late-cluster/episode/segments/making-of-inward/<file>.js`; studio code as `@late-cluster/show/<path>`. Never import from another segment or from `production/`.

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

- The credit CHIMERA · jamesondh · open source comes down at the cue `credit-out`, before the cue `cluster`. It is never on screen together with the cluster's lights or with the show's handle, and it does not come back.
- The handle is shown exactly as `@latecluster.simcluster.tv`. Nothing lights up in answer to it, nothing is pointed at, nothing comes back: a picture must not imply that a tag is answered or that anyone at all who tags is looked at.
- The ear's two labels, WRITTEN kazoo and HEARD clue, are up for the whole of the line `l1-kazoo` and are exactly those words. They are never changed to match what the voice sounds like.
- The cluster is 248 small lights, with no label and no names.

Reply in a short list: what you built, the times of the frames you looked at, anything the script asked for that you could not do, and anything an auditor of the frames should look at first.
