# Direct

Stage the rendered episode: one `index.js` per segment, written against the rendered `cues.json`,
checked by looking at frames. Build it fresh.

## Read first

1. `packages/show/README.md`, "Authoring a segment" to the end (the module shape, time and
   coordinates, the `show` API, the drawing kit and props, the BUILT counter, shots, looks, the set,
   previewing, do and don't).
2. `docs/bible/08-direction.md`.
3. Working examples: the studio's reference episode, `packages/show/reference/segments/demo/index.js`
   (dialogue, captions, a chart, a post card) and `kit-tour/index.js` (every shot, prop, effect and
   the BUILT counter), and the template `packages/show/templates/segment/index.js`. If the pitch
   inherited a direction file, it is in `production/inherited/`: adapt what it shows, don't copy it.
4. `episodes/<id>/production/plan.json` (including its experiment), each segment's `script.js` (its
   comments say what each cue is for) and `cues.json` (when everything happens).
5. `docs/bible/09-real-people.md` R4, R8 and R9: post cards, fictional names, labels.

## Produce

- `episodes/<id>/segments/<seg>/index.js` for every segment. The template from `segment:new` is
  already there; replace it.
- **Episode-local props and helpers** go in the segment's own folder, next to the `index.js` that uses
  them (`episodes/<id>/segments/<seg>/props.js`), and are imported through the episode alias:
  `import { drawMug } from '@late-cluster/episode/segments/<seg>/props.js'`. Files there are part of
  the build's source hash, so `verify` sees them change. Do not put shared code anywhere else in the
  episode folder, never import from `production/` (inherited files are reference, not code), and never
  add anything to the studio: a prop earns a place in `packages/show/` only when a second episode needs
  it, and that is the owner's decision. Studio code is imported as `@late-cluster/show/<path>`.
- Optionally `episodes/<id>/production/thumbnail.txt`: one line, `<seg> <seconds>`, the moment for the
  episode's thumbnail: a puppet and the episode's best picture, not a real person's post card. Without
  it the title card is used.

## Rules the gates hold you to

- Use cue names and line ids from the script (`show.at('punch')`), never raw seconds: an unknown name
  warns `unknown cue` in the frames and fails the gate.
- Keep `direct` and `draw*` pure functions of `t` (no state across frames, no `Math.random()`).
- The first segment in which a guest appears has a `disclaimer` (constitution, Article 4). A verbatim
  thread uses the wording in bible 04, format 9, "Staging".
- A real post marked `card` or `quote` in `sources.json` is on screen with the post's text exactly as
  in the digest (cut only with `…`), with the real display name, handle, date and like count (R4).
  Every handle on screen is either in `sources.json` or on `.example`.
- Stage a real line so it keeps the occasion it was said on: the setup the script gives it is the
  writer's; your pictures must not change what it means.
- Imports: only `@late-cluster/show/...`, packages the studio depends on, and your own segment files.

## The loop

1. Write the segment's direction against its cues.
2. Shoot the moments that matter in one batch: every punch word, card, build, shot change and overlap:
   `npm run shoot -- <id> <seg> 1.2 4.5 7 …` (frames go to `shots/<id>/<seg>/<seg>@<t>.png`).
3. **Look at the frames** (read the PNG files). Is the punch's picture on screen on its word? Is any
   text under the captions (y > 610)? Is every card readable and held long enough? Does every
   chyron of a guest show PUPPET · PARODY? Is the experiment visible on screen? Fix and shoot again.
4. Read the console lines `shoot` prints under each frame. Any `pageerror`, `error` or `unknown cue`
   is a failure; GPU "stall" warnings are not.
5. When all segments are done: `npm run produce -- --week <week> --check direct`. The gate shoots
   every cue of every segment plus frames spread across it, and fails on page errors, console errors
   and unknown cues.

You are finished when the check prints no FAIL and you have looked at frames from every segment.

## Never

- Change a script, a cue or the audio. If the script needs changing, say so in your final sentences:
  that is a send-back to the write stage, not a direction fix.
- Put a real person's post on screen that is not in `sources.json`.
