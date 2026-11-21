# Restage the trimmed segment made-pen-plotter-replies

- **Role:** `builder`
- **Episode:** `episodes/002-2026-w47/`, a draft episode trimmed on the owner's notes.
- **Write:** `episodes/002-2026-w47/segments/made-pen-plotter-replies/index.js`, and helpers and props beside it in the same folder. Nothing else: not `looks.js`, `cast.js`, any script, `sources.json`, another segment, or anything in `packages/`.
- **Check:** `npm run check -- 002-2026-w47` (the lines about your segment), and your own eyes on frames from `npm run shoot -- 002-2026-w47 made-pen-plotter-replies <t>…`.

## Read

- `packages/show/README.md`: authoring a segment, props, the camera, captions, cards and labels
- `docs/bible/08-direction.md`
- `episodes/002-2026-w47/segments/made-pen-plotter-replies/script.js`, as it now is, with its cue comments; `cues.json`, freshly rendered; and the existing `index.js`, which staged the longer script. Do not re-render.
- `episodes/002-2026-w47/production/trim.md`: the beats and cues removed from this segment
- `episodes/002-2026-w47/production/owner-notes.md`: why
- `episodes/002-2026-w47/production/sources.json`: the exact text and counts of every real post still shown

Do not read `production/review/`, `production/scorecard.md`, `production/review.json`, `docs/ledger/`, `docs/trials/`, or any other episode's folder.

## What changed

The owner asked for the episode to be shortened. A writer cut this script without adding or changing a spoken line, and a sound editor then fitted and rendered it again, so every time in the segment has moved.

It now ends on the maker's reply "I expected nothing less ❤️" and the laugh after it. The third reply, the film-script card, the silent pen run and the three-hundred exchange are gone, with their tags and cards.

## The task

Make `index.js` stage the script as it now is.

- Remove the staging of every cue, card, prop, tag and credit that belonged only to the cut part. Nothing of the cut part may remain on screen, including a credit or a card for an account that is no longer in the segment.
- Anything keyed to a cue's name or to a line's word times follows the new `cues.json` by itself. Anything written as a number of seconds has to be re-timed, or better, keyed to a cue.
- The ending holds properly through whatever closes the segment.
- **The opening is new.** The owner asked that the pen plotter in the opening draw the show's title. During the pen's hum `in-hum` (it now runs from 0.4 to about 2.4 s) the pen writes `The Late Cluster` on the sheet, a letter to each sixteenth of the hum, so the title is whole on the paper before Sibyl's line "This is The Late Cluster, with Larry Nx." begins, and stays through it. Follow the script's cue comments for when the sheet is blank again.
- The title is the show's own writing. While the pen writes it, the maker's credit for the plotter must not be on screen: her plotter never wrote that. The credit comes up when the segment proper begins, where the script puts it.
- The tag 300 OF 300 and anything else that counted characters is gone. The tag 88 REPLIES · 1 PEN stays if the script still calls for it.

Shoot a frame at every cue and in the middle of every hold or move, look at each one, and fix what you see: anything unreadable, overlapping, under the captions, cut off, or left over from the cut. Captions are on and carry every line.

## Rules

- A real post on screen shows its exact text, with display name, handle, date and counts, cut only with an ellipsis.
- A puppet of a real account wears the PUPPET · PARODY label from its first word, and the disclaimer runs at the first puppet.
- Nothing longer than a glance is on screen unless it is spoken in the segment.
- Frames at every cue load with no page errors and no unknown cues.
- The script, the cues, the voices and what a real person is shown saying do not change.
- No git write commands, no network, never `.secrets`.

Reply in a short list: what you removed, what you re-timed, the times of the frames you looked at, and what an auditor of the frames should look at first.
