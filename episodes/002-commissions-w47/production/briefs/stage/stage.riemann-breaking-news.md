# Stage the segment riemann-breaking-news

- **Role:** `builder`
- **Episode:** `episodes/002-commissions-w47/`.
- **Write:** `episodes/002-commissions-w47/segments/riemann-breaking-news/index.js`, and helpers and
  props beside it in the same folder. Nothing else: not `looks.js`, `cast.js`, any script,
  `sources.json`, another segment, or anything in `packages/`.
- **Check:** `npm run check -- 002-commissions-w47` (the lines about your segment), and your own
  eyes on frames from `npm run shoot -- 002-commissions-w47 riemann-breaking-news <t>…`.

## Read

- `packages/show/README.md`: authoring a segment, props, the camera, captions, cards and labels
- `docs/bible/08-direction.md`
- `episodes/002-commissions-w47/segments/riemann-breaking-news/script.js`: every cue carries a
  comment saying what the picture is and what the camera does. That is your direction. And
  `cues.json`, the rendered timings (89.5 s, 15 lines, 18 cues). Do not re-render.
- `episodes/002-commissions-w47/production/sources.json`: the exact text, display name, handle,
  date and counts of every real post shown
- `episodes/002-commissions-w47/production/research/terms-riemann.md`: the section "The combined
  breaking-news segment (the owner's ruling, 21 November 2026)" and "Rules for the whole
  subject". They say what may be on screen.
- Two segments in this same episode that already draw most of what this one needs. Read them and
  **copy** what you use into your own folder; never import from another segment:
  - `segments/riemann-proof-that-fits/` (`index.js`, `postcard.js`, `props.js`): the members'
    post cards with word lighting, the account plate and follow spot, the hanging ζ, the bars,
    brackets, tag and slabs of the proof, the pile, the crane.
  - `segments/riemann-market-wrap/` (`index.js`, `post.js`, `graphics.js`, `chart.webp`): guest
    boxes with nameplates, post cards with a quoted post inside, the member's chart image.

Do not read `production/review/`, `production/brainstorm/`, `docs/ledger/`, `docs/trials/`, or
any other episode.

## The segment

The owner watched the two earlier Riemann segments and asked for one in their place, framed as
breaking news: a BREAKING banner and Larry as anchor; two members' jokes about a share chart,
said by their puppets with the chart inside the first one's card; a hard cut to Larry's own
question; a member's call into a follow spot; Sibyl's reading of the reply; the proof in a post,
built as bars and slabs until the pile passes Larry; and his button from behind it.

## The task

Write `index.js` against the rendered `cues.json`. Helpers and props go in your segment's folder
and are imported as `@late-cluster/episode/segments/riemann-breaking-news/<file>.js`; studio code
as `@late-cluster/show/<path>`.

Shoot a frame at every cue and in the middle of every long hold or camera move, look at each
one, and fix what you see: anything unreadable, overlapping, under the captions, cut off, or
showing through without a fill. Captions are on and carry every line.

## Rules

- A real post on screen shows its exact text, with display name, handle, date and counts, cut
  only with an ellipsis. Handles and counts are legible: at least 14 px.
- A puppet of a real account wears the PUPPET · PARODY label **from its first word**, and the
  disclaimer runs at the first puppet. The script sets no disclaimer in any beat, so you must.
- Nothing longer than a glance is on screen unless it is spoken in the segment.
- Frames at every cue load with no page errors and no unknown cues.
- The script, the cues, the voices and what a real person is shown saying do not change.
- No git write commands, no network, never `.secrets`.

## What the terms require of the pictures

- **The banner.** BREAKING and its lower third carry only what the terms allow: no verdict, no
  name, nothing about the checking, nothing about the market. The banner is **fully gone before
  the first frame of the chart card**, and is never on screen with the chart, a market joke card
  or her proof. Shoot the frames either side of `banner-off` and `card-chart` to prove it.
- **The chart.** The member's image, whole and unaltered, only inside that member's card and
  inside the card of the member who quotes it. Nothing the show draws gives a price, a
  percentage, a symbol, a company's name or anything showing a fall.
- **The proof.** Her card keeps its credit, PROOF AS POSTED BY @shimmermathlabs.com, and its
  label, ZETA AT 1 · NOT THE HYPOTHESIS. The bars, brackets and slabs draw exactly the
  quantities her post states. Nothing lands on the proof that reads as a verdict.
- **The call card** reads only REPLY in its reply line: the account she was replying to appears
  nowhere in the segment.
- **The tag** at `tag-k` is exactly `… more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …`.
- The mathematician is not named or pictured, and the announcement's address is not shown.

Reply in a short list: what you built, the times of the frames you looked at, anything the
script asked for that you could not do, and what an auditor of the frames should look at first.
