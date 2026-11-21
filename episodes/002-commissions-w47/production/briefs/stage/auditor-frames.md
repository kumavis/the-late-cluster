# Brief: look at the staged frames of the four commission segments

- **Role:** `auditor`
- **Episode:** `episodes/002-commissions-w47/`. Four separate segments, one video each:
  `making-of-inward`, `making-of-outward`, `riemann-proof-that-fits`, `riemann-market-wrap`.
- **Write:** `episodes/002-commissions-w47/production/review/stage/r<round>.json` (the round is in
  the message that gave you this brief). Nothing else; change no segment.

## Read

- `docs/bible/08-direction.md`, and `docs/bible/09-real-people.md` for what must be on screen
- `packages/show/tools/README.md`, only how to use `npm run shoot` and `npm run check`
- each segment's `script.js` (every cue's comment is the direction it was staged from) and
  `cues.json`
- `production/sources.json`, `production/research/terms-riemann.md`,
  `production/research/terms-making-of.md`
- your colleagues' notes on these scripts: `production/review/audit-drafts.md`,
  `audit-drafts-2.md`, `audit-drafts-3.md`, only the lines marked for the stager

## The task

For each segment, shoot a frame at every cue and inside every long hold or camera move
(`npm run shoot -- 002-commissions-w47 <seg> <t>…`, times from `cues.json`), and look at every
one. Run `npm run check -- 002-commissions-w47` and read its lines.

Check, segment by segment:
1. **Real posts.** Every post on a card, tag or label is exact against `production/sources.json`:
   text, display name, handle, date and counts; a cut only with an ellipsis. A member's image
   appears only inside that member's card, whole and unaltered.
2. **Puppets of real accounts** wear the parody label, and the disclaimer runs at the first one.
3. **Unread text.** Nothing longer than a glance is on screen unless it is spoken. Nothing is
   unreadable, overlapping, cut off, under the captions, or showing through without a fill.
   One exception is intended: in `making-of-outward` the caption at the cue `edge` runs off the
   right edge on purpose.
4. **The direction was followed.** What the script's comment says the place is and the camera
   does is what the frame shows. In the two making-of segments: one continuous shot with no cut,
   and each level of the recursion is a place the camera travels into.
5. **The terms on pictures.**
   - Making-of: the show's handle is exactly `@latecluster.simcluster.tv`; no picture implies
     that a tag is answered or that a tag from anyone at all is read; in `making-of-inward` the
     CHIMERA credit is gone before the cluster's lights and the handle appear; the ear's labels
     read WRITTEN kazoo and HEARD clue; every number drawn is the fact sheet's.
   - Riemann: nothing says or implies whether the proof is right (no stamp, tick or QED); the
     mathematician is not named or pictured and the announcement's address is not shown; in the
     market wrap the only real chart, price or symbol is inside the member's card, and nothing
     takes a view on why a price moved; in the proof segment one account's handle appears
     nowhere and the tag at `tag-k` is exact.
6. **It can be watched.** Say plainly where a frame is empty, muddled or dull for a long hold:
   that is a `note`, not a failure, and it is the builder's to improve if it is cheap.

You do not judge whether anything is funny, and you change nothing.

**Write** `production/review/stage/r<round>.json`:
`{ "segments": { "<seg>": { "verdict": "pass" | "change", "changes": [{ "must": true | false, "at": "<cue or time>", "change": "<exactly what to change>" }] } } }`,
one entry for each of the four. A `must` is a broken rule above; anything else is `must: false`.

Reply in a short list: the four verdicts, and each `must` in a line.
