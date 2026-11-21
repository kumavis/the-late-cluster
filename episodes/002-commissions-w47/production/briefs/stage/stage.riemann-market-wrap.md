# Stage the segment riemann-market-wrap

- **Role:** `builder`
- **Episode:** `episodes/002-commissions-w47/`, a commission of four separate segments. The owner wants one video per segment.
- **Write:** `episodes/002-commissions-w47/segments/riemann-market-wrap/index.js`, and helpers and props beside it in the same folder. Nothing else: not `looks.js`, `cast.js`, any script, `sources.json`, another segment, or anything in `packages/`.
- **Check:** `npm run check -- 002-commissions-w47` (the lines about your segment), and your own eyes on frames from `npm run shoot -- 002-commissions-w47 riemann-market-wrap <t>…`.

## Read

- `packages/show/README.md`: authoring a segment, props, the camera, captions, cards and labels
- `packages/show/templates/segment/index.js` and `packages/show/reference/`, a working example
- `docs/bible/08-direction.md`
- `episodes/002-commissions-w47/segments/riemann-market-wrap/script.js`: every cue carries a comment saying what the place is and what the camera does. That is your direction. And `episodes/002-commissions-w47/segments/riemann-market-wrap/cues.json`, the rendered timings.
- `episodes/002-commissions-w47/cast.js` and `episodes/002-commissions-w47/looks.js`, to read only
- `episodes/002-commissions-w47/production/sources.json`: the exact text, display name, handle, date and counts of every real post shown
- `episodes/002-commissions-w47/production/research/terms-riemann.md`: "Rules for the whole subject" at the end, and the section for the card `riemann-learned-from-the-chart`, including its part "The share price", for what may be shown

Do not read `production/review/`, `production/brainstorm/`, `docs/ledger/`, `docs/trials/`, earlier episodes, their builds or other branches.

## The segment

A finance channel's market wrap that collapses. Three members' puppets give their own lines as analysts while Larry orders up more graphics; then Sibyl reads a plain exchange from cards and Larry's graphics go dark.

## The task

Write `episodes/002-commissions-w47/segments/riemann-market-wrap/index.js` against the rendered `cues.json` ("Authoring a segment" in the studio's README). Helpers and props go in `segments/riemann-market-wrap/` and are imported as `@late-cluster/episode/segments/riemann-market-wrap/<file>.js`; studio code as `@late-cluster/show/<path>`. Never import from another segment or from `production/`.

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

- Every real post on a card is exact, with display name, handle, date and counts. Each speaker's card or lower third is up from the first word of the line that names them, as the script's cue timings set, so the exact handle is on screen when it is said.
- A member's own chart image may be shown inside that member's card. The scraper has fetched it: `data/weeks/2026-W47/media/did-plc-ctphcgyhnllfluywokibtrgb-3n2qvzbb7dk2z-1.webp`, the one picture on the chart post (`…/3n2qvzbb7dk2z`). That folder is not part of the episode, so copy the file into your segment's folder the way the studio's README says a segment carries an asset, and show it inside that member's card, whole and unaltered. It is the only real chart, price or symbol that appears anywhere in the segment. Never redraw or imitate someone's image as if it were theirs.
- The finance-channel graphics (ticker, globe, charts of Larry's own) are the show's fiction and must look like it: no real ticker symbol, no real price, no company's logo. Nothing on screen takes a view on why any price moved, and nothing says or implies whether the proof is right.
- The mathematician is not named or pictured, and the announcement's address is not shown.

Reply in a short list: what you built, the times of the frames you looked at, anything the script asked for that you could not do, and anything an auditor of the frames should look at first.
