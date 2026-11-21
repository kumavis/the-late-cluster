# Brief: fit the alternative song

- **Role:** `sound-editor` (.claude/agents/sound-editor.md)
- **Episode:** `episodes/002-2026-w47/`. Paths below are under it unless they start with `docs/`
  or `packages/`.
- **Draft:** `production/drafts/music-alt/`: a doo-wop, "Best We Can Doo-Wop", about 70 seconds
  by the writer's estimate. The owner has read the lyric and asked for it to be built, to compare
  with the present song. Nothing in it has been rendered.
- **Write:** in `production/drafts/music-alt/script.js` only pronunciation and timing fields:
  `as`, `gap`, `rate`, `vol`, `f0`, `wait` beats, and in the music blocks `bpm`, `swing`, `gap`,
  a track's `vol`, and the `at` of a line spoken over the music. Not a note, not a word.
  Also `production/fit/music-alt.md`, and the voice research file through
  `npm run voice-research`. `fit.json` is the tool's.

## Read

- `docs/bible/07-voices.md`: "Songs", with "What the engine can render" and "The genre shelf",
  and "Read what was heard"
- `packages/show/tools/README.md`: how music beats, tracks and sung lines are written; "Fitting a
  script", including the part on sounds; rendering a draft; `npm run voice-research`
- `docs/voice-research.md`
- `production/drafts/music-alt/script.js`, with the writer's notes for you, and `notes.json`
- `segments/music/script.js`: the present song, as a working example of what this engine sings

## The rules

- **Best effort is sufficient: the subtitles and the lyric on screen carry the line** (the
  owner's ruling, 21 November 2026). Nothing goes back to the writer for pronunciation.
- **A respelling keeps the word's sounds**, and a word with two readings takes the one the line
  means. Run `--sounds` at the end; it must list no dictionary word.
- **Never kept:** a spelling heard as crude, alarming or out of bounds. Find another; if there is
  none, put it at the top of your note for the owner.
- **The notes are the writer's.** If a note is outside what a voice can sing, or a singer is
  asked for something the engine cannot render, do not rewrite it: say exactly which note, which
  voice and why, at the top of your note.

## The task

1. Render the draft (`npm run render -- 002-2026-w47 --draft music-alt`) and read what the
   render reports: every sung line's notes against each singer's range, the length of each music
   block, and whether the spoken lines fall where the script's comments say they should.
2. The writer left three things to you; settle each and say what you chose:
   - **Swing.** The blocks are written at bpm 66 with one block beat as two beats of the song,
     so that the grid gives swung eighths. That assumes the engine's swing delays the
     off-sixteenths. If it does not, set swing to 0 and change nothing else.
   - **The lines spoken over the vamp** ("Larry. Best you can do?" and "I only host.") are
     placed by estimate. Place them so each is clear of sung words and the silence after
     "I only host." is a real silence before Larry's one note.
   - **Larry's note.** The song turns on his single sung "doo" being a different note from the
     one the chord was waiting for, and on the key change that makes it the home note. Check
     that the pitch he actually sings is the one written, as the engine measures it, and that
     the band's next chord is built on it. The bass singer's fry once made him sing flat; the
     studio corrects that now, but measure.
3. Fit the spoken and sung words: `npm run fit -- 002-2026-w47 --draft music-alt --json`, then
   `--apply --json`; best effort on what is left, three or four tries a line. "doo" and "wop" are
   the whole hook: get them as close to themselves as the voices allow, in every voice that
   sings them, and say plainly what each is heard as.
4. `npm run voice-research -- 002-2026-w47 --draft music-alt`: harvest, add what is left, exit 0.
5. Render once more and read the length. The limit is 80 seconds.
6. Write `production/fit/music-alt.md`: the rendered length; your three settlements; each
   singer's highest and lowest note against their range; what "doo" and "wop" are heard as in
   each voice; and the list "heard differently, caption exact".

No network, no git, never `.secrets`.

Reply in a short list: the rendered length, the three settlements, anything the engine cannot
sing as written, and how "doo" and "wop" come out.
