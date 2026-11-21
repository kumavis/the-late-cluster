# Brief: fit five segments of the draft episode again after the trim

- **Role:** `sound-editor` (.claude/agents/sound-editor.md; it changed on 21 November, read it)
- **Episode:** `episodes/002-2026-w47/`. Paths below are under it unless they start with `docs/`
  or `packages/`.
- **Segments, in this order:** `made-pen-plotter-replies`, `top-chicken`,
  `made-mobius-chess-ringmate`, `interview-yonderdavid`, `made-polyhedral-coffee-simulator`.
  Finish one before starting the next. Not `music`: leave the song exactly as it is, and do not
  render it.
- **Write:** in each of those segments' `script.js` only `as`, `gap`, `rate`, `vol`, `f0` and
  `wait` beats; `production/fit/<seg>.md`; the voice research file through
  `npm run voice-research`. Do not change `cast.js`: every guest's voice stays as it is.

## What has happened

These scripts were fitted by hand in an earlier version of the workflow, before the fitting
tool existed. A writer has now trimmed four of them on the owner's notes
(`production/owner-notes.md`, `production/trim.md`); no spoken line was added or changed. The
fifth, the coffee segment, is untouched but needs the same pass. Since then the owner has ruled
on two things:

- **Best effort is sufficient: the subtitles carry the line** (21 November 2026). Nothing goes
  back to a writer, and a real person's words are never cut for the voice.
- **A respelling keeps the word's sounds.** The owner heard "show" pronounced "shao": a spelling
  had been chosen because the transcription liked it, and the engine read it with another vowel.
  The tool now rejects such spellings. These five scripts hold about forty of them from the old
  hand fitting.

## Read

- `docs/voice-research.md`, especially "Heard by the transcription, not by a listener"
- `packages/show/tools/README.md`: "Fitting a script", including the part on sounds, and
  `npm run voice-research`
- `docs/bible/07-voices.md`: "Read what was heard"
- each segment's `script.js`

## The task, for each segment

1. `npm run fit -- 002-2026-w47 <seg> --sounds`: the list of every `as` that changes a
   dictionary word's sounds. Put the plain spelling back for each. A respelling stays only if it
   keeps the word's sounds; a name, a handle or an invented word is a guess and may keep its
   spelling.
2. `npm run fit -- 002-2026-w47 <seg> --json`, then `--apply --json`. Best effort on what is
   left, three or four tries a line: real people's lines first, then punch lines. Never keep a
   spelling heard as crude, alarming or out of bounds: find another, and if there is none put
   the line at the top of your note for the owner.
3. `npm run voice-research -- 002-2026-w47 <seg>`: harvest, add the hard words that are left,
   exit 0.
4. `npm run render -- 002-2026-w47 <seg>`, and read the rendered length. The segment's
   `cues.json` is rewritten by the render; that is expected.
5. `production/fit/<seg>.md`: the tool's last summary line; the rendered length; the words whose
   plain spelling you put back; and the list "heard differently, caption exact", real people's
   lines first.

Then run `npm run fit -- 002-2026-w47 <seg> --sounds` once more for all five: none may list a
dictionary word.

## Rules

- No line's `text` changes. Nothing is cut or added. Nothing outside the files named under
  **Write**. Guests' voices do not move, even if two are close.
- No network, no git, never `.secrets`.

Reply in a short table: per segment, the rendered length, how many spellings went back to plain,
how many lines are heard differently from their caption, and anything for the owner.
