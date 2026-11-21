# Brief: look at the frames of the new cut of the episode

- **Role:** `auditor`
- **Episode:** `episodes/002-2026-w47/`, nine segments, 9 minutes 47. The owner had the draft
  trimmed, two new segments added and one short bit written. Paths below are under the episode
  unless they start with `docs/`, `packages/` or `episodes/`.
- **Write:** `production/review/stage/cut-2-r<round>.json` (the round is in the message that gave
  you this brief). Nothing else; change no segment.

## Read

- `docs/bible/08-direction.md`, and `docs/bible/09-real-people.md` for what must be on screen
- `packages/show/tools/README.md`, only how to use `npm run shoot` and `npm run check`
- `production/owner-notes.md`, `production/trim.md`, `production/assembly-2.md`
- each segment's `script.js` (every cue's comment is its direction) and `cues.json`
- `production/sources.json`
- for the two new segments, their terms:
  `episodes/002-commissions-w47/production/research/terms-riemann.md` (the section "The combined
  breaking-news segment" and "Rules for the whole subject") and
  `episodes/002-commissions-w47/production/research/terms-making-of.md` ("The turn to the
  audience", "Required on screen")

## The task

For each segment, shoot a frame at every cue and inside every long hold or move
(`npm run shoot -- 002-2026-w47 <seg> <t>…`, times from `cues.json`), and look at every one.
Run `npm run check -- 002-2026-w47`.

**Segments, in running order, and what to look at first in each**

1. `made-pen-plotter-replies` (restaged after a cut). The pen writes `The Late Cluster` from 0.4
   to 2.4 s and the title is whole through Sibyl's line to 6.13 s. The maker's credit must be
   absent while the title is written, and comes in at `host` over a blank sheet. Nothing of the
   cut part remains: no third reply, no film-script card, no character counter. In the room shot
   (about 35 s to the end) a STUDIO SKETCH tag sits over scribble rows and one row is clipped at
   the panel's edge. One guest's voice changed; nothing on screen should have.
2. `bluesky-account` (new, 9.8 s). The handle is exactly `@latecluster.simcluster.tv`, whole at
   once at 3.42 s, in the plain line colour with no gold in it once the underline is out (from
   6.9 s). No post box, cursor, typing, mention colour, profile card or other handle. The black
   band behind the handle covers the desk's name plate from 3.42 s; the chyron is drawn higher
   than usual and shows his name with no title under it.
3. `interview-yonderdavid` (restaged after a cut). It ends on the parody answer with the guest's
   enlarged PUPPET · PARODY chyron held to the last frame; the room's laughter caption shows
   under it. Nothing of the cut exchanges remains. The guest's chyron is up from 4.3 to 10.4 s
   and again at the end, and not during his first two answers (14.3 s and 33 s): rule on that
   against the label rule and the studio's convention of one lower third at a guest's first
   appearance.
4. `riemann-breaking-news` (new; the owner has approved it as rendered; never audited). The
   BREAKING banner and its strap are fully gone before the chart card's first frame: look at
   13.97, 14.3, 14.424 and 14.45 s. The chart image is only inside the first member's card and
   inside the second member's card as the quoted post. No house graphic gives a price, a
   percentage, a symbol or a company's name. Every card is exact against `sources.json`. Each
   puppet wears its label from its first word, and the disclaimer runs from the first puppet.
   The call card's reply line reads only REPLY. The tag at `tag-k` (about 73 s) is exactly
   `… more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …`. Her card keeps its credit and its
   label ZETA AT 1 · NOT THE HYPOTHESIS. A handle is briefly under 14 px while a card scales
   (from about 64.1 s, and from 49.76 s). The speaker id of one guest was renamed after staging;
   her look should be the same violet in this segment and in segment 7.
5. `making-of-inward` (copied unchanged from a version that passed its frame audit). A spot check
   only: three frames, one of them the handle at about 84 s.
6. `top-chicken` (restaged after a cut). No market board, bot card, guess or split-flap remains.
   It ends on the crowns and the SCORED BY A BOT · UNOFFICIAL tag through the sting. At 25.9 s
   bars start growing behind a monitor for a moment.
7. `made-polyhedral-coffee-simulator` (not restaged; rendered again because one guest's voice and
   look changed). Check that the staging still fits its cues, and that her chyron reads
   AMBER 🌸 · OWNER, ONE PINK MUG · @shimmermathlabs.com with the label.
8. `music` (untouched). A spot check: three frames.
9. `made-mobius-chess-ringmate` (restaged after a cut; one guest's voice changed). It ends on
   "I resign." with the last picture held through the laugh, the sting and the applause. Nothing
   of the old sign-off remains. Two guest chyrons come up at their first words while Larry's
   caption is still fading.

**The end roll.** Shoot it (`npm run shoot -- 002-2026-w47 end <t>…` if the tool takes it, or as
the README says) and check that each real account whose puppet spoke is named once, with its
exact display name and handle, and that no account that left the episode with the trim is named.

**The rules, for every segment**
- Every real post on a card, tag or label is exact against `production/sources.json`: text,
  display name, handle, date and counts; a cut only with an ellipsis.
- A puppet of a real account wears the PUPPET · PARODY label, and the disclaimer runs at the
  first puppet of a segment.
- Nothing longer than a glance is on screen unless it is spoken. Nothing is unreadable,
  overlapping, cut off, under the captions, or showing through without a fill.
- Nothing left over from a cut.

You do not judge whether anything is funny, and you change nothing.

**Write** `production/review/stage/cut-2-r<round>.json`:
`{ "segments": { "<seg>": { "verdict": "pass" | "change", "changes": [{ "must": true | false, "at": "<cue or time>", "change": "<exactly what to change>" }] } }, "endRoll": { "verdict": "pass" | "change", "changes": [...] } }`,
one entry for each of the nine. A `must` is a broken rule above; anything else is `must: false`.

Reply in a short list: the verdicts, and each `must` in a line.
