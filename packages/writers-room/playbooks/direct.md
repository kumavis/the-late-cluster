# Direct

Stage the rendered episode: one `index.js` per segment, written against the rendered `cues.json`,
checked by looking at frames.

## Read first

1. `packages/show/README.md`, "Authoring a segment" to the end (the module shape, time and
   coordinates, the `show` API, the drawing kit and props, the BUILT counter, shots, looks, the set,
   previewing, do and don't).
2. `docs/bible/08-direction.md` (all of it), and the `index.js` of one pilot segment of a similar kind
   (read only). The reference episode's `packages/show/reference/segments/kit-tour/` shows every shot
   and prop.
3. `episodes/<id>/production/plan.json`, each segment's `script.js` (its comments say what each cue
   is for) and `cues.json` (when everything happens).
4. `docs/bible/09-real-people.md` R4, R8 and R9: post cards, fictional names, labels.

## Produce

- `episodes/<id>/segments/<seg>/index.js` for every segment. The template from `segment:new` is
  already there; replace it.
- Optionally `episodes/<id>/production/thumbnail.txt`: one line, `<seg> <seconds>`, the moment for the
  episode's thumbnail: a puppet and the episode's best picture, not a real person's post card. Without
  it the title card is used.

## Rules the gates hold you to

- Use cue names and line ids from the script (`show.at('punch')`), never raw seconds: an unknown name
  warns `unknown cue` in the frames and fails the gate.
- Keep `direct` and `draw*` pure functions of `t` (no state across frames, no `Math.random()`).
- The first segment in which a guest appears has a `disclaimer` (R9). A verbatim thread uses the
  wording in bible 04, format 9, "Staging".
- A real post on a card shows the post's text exactly as in the digest (cut only with `…`), with the
  real display name, handle, date and like count (R4). Every handle on screen is either in
  `sources.json` or on `.example`.
- Import studio code as `@late-cluster/show/<path>`, never by relative path, and never from another
  segment.

## The loop

1. Write the segment's direction against its cues.
2. Shoot the moments that matter in one batch: every punch word, card, build, shot change and overlap:
   `npm run shoot -- <id> <seg> 1.2 4.5 7 …` (frames go to `shots/<id>/<seg>/<seg>@<t>.png`).
3. **Look at the frames** (read the PNG files). Is the punch's picture on screen on its word? Is any
   text under the captions (y > 610)? Is every card readable and held long enough? Does every
   chyron of a guest show PUPPET · PARODY? Fix and shoot again.
4. Read the console lines `shoot` prints under each frame. Any `pageerror`, `error` or `unknown cue`
   is a failure; GPU "stall" warnings are not.
5. When all segments are done: `npm run produce -- --week <week> --check direct`. The gate shoots
   every cue of every segment plus frames spread across it, and fails on page errors, console errors
   and unknown cues.

You are finished when the check prints no FAIL and you have looked at frames from every segment.

## Never

- Change a script, a cue or the audio. If the script needs changing, say so in your final sentences:
  that is a send-back to the write stage, not a direction fix.
- Add studio code (shots, props, costumes) in `packages/show/`: draw what you need inside the
  segment, or note the gap for the reviewer.
- Put a real person's post on screen that is not in `sources.json`.
