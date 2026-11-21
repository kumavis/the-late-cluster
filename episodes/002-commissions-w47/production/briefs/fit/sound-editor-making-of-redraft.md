# Brief: fit the redrafted making-of-inward

- **Role:** `sound-editor` (.claude/agents/sound-editor.md)
- **Episode:** `002-commissions-w47`. Paths below are under
  `episodes/002-commissions-w47/production/` unless they start with `docs/` or `packages/`.
- **Draft:** `making-of-inward`, redrafted on the owner's notes. One draft only.
- **Write:** in `drafts/making-of-inward/script.js` only `as`, `gap`, `rate`, `vol`, `f0` and
  `wait` beats, and the one beat named `burp` as set out below; `fit/making-of-inward.md`; the
  voice research file through `npm run voice-research`. `fit.json` is the tool's.

## What has changed since this script was last fitted

1. **The owner heard "show" pronounced "shao".** The fitting tool had chosen `showw`, which the
   engine reads with the vowel of "cow"; the transcription wrote "show" for it anyway. The tool
   is now corrected: a respelling of a dictionary word must keep its vowels and consonants.
   Read "Fitting a script" in `packages/show/tools/README.md` again; it has a new part on
   sounds. `npm run fit -- 002-commissions-w47 --draft making-of-inward --sounds` lists every
   `as` in the script that changes a word's sounds, with both phoneme strings, and renders
   nothing.
2. **The rule for you:** put the plain spelling back for every word on that list. A respelling
   stays only if it keeps the word's sounds. The transcription's approval is not a listener's.
   Where the plain word is then misheard by the transcription, that is acceptable: best effort
   is sufficient and the subtitles carry the line. "show" is plain everywhere.
3. **The script is redrafted.** Lines the writer kept still carry your earlier `as`, `f0` and
   `rate`; new lines have none. The levels are now seven, so there are more small Larrys.

## Read

- `docs/voice-research.md`, especially "Heard by the transcription, not by a listener"
- `packages/show/tools/README.md`: "Fitting a script" and `npm run voice-research`
- `docs/bible/07-voices.md`: "Read what was heard" and the section on voices
- `drafts/making-of-inward/script.js`, with the writer's comments for you, and the old
  `fit/making-of-inward.md`

## The task

1. Run the `--sounds` audit and put the plain spelling back for everything it lists.
2. Fit: `npm run fit -- 002-commissions-w47 --draft making-of-inward --json`, then
   `--apply --json`. Make a best effort on what is left, three or four tries a line, punch
   lines and the turn to the audience first. Nothing heard as crude, alarming or out of bounds
   is ever kept.
3. **The smaller Larrys.** Each level down is the house puppet at a higher pitch. The writer
   set 124, 148, 176 for levels the script already had and 209 and 249 as direction for the two
   new ones. Tune all of them so each level is heard as smaller than the last and every line
   still comes through, and keep within what the engine can voice safely; say what you chose.
4. **The handle.** Larry says the show's handle aloud once (`turn-handle`). Its text is exactly
   `@latecluster.simcluster.tv`. In `as`, write how a host would read it out: "at late cluster,
   dot, simcluster, dot, tee vee", or the reading that comes through best. It is the one line
   the owner most wants understood.
5. **The burp.** The owner asked for a burp before "Excuse me." if the voice can do it. The
   beat `burp` is a captionless line for you to make into the sound. Try what the engine
   offers: a very low pitch with fry, a short vowel with a stopped onset, a slow rate, the
   bass singer's settings if a house voice does it better than Larry's. Render three different
   candidates as separate short clips into
   `packages/show/tools/.cache/drafts/002-commissions-w47/making-of-inward/burp/` (a, b and c;
   use a scratch copy of the draft to make them), say in your note how each was made, and leave
   the one you think most likely in the script. You cannot hear them; the owner will choose. If
   none can be made at all, delete the beat and say so: the ending works without it.
6. `npm run voice-research -- 002-commissions-w47 --draft making-of-inward`: harvest, add the
   hard words that are left, exit 0.
7. `npm run render -- 002-commissions-w47 --draft making-of-inward` and read the length.
8. Rewrite `fit/making-of-inward.md`: the last summary line, the rendered length, the pitches,
   how the handle is read, the three burps, and the list "heard differently, caption exact".

## Rules

- No line's `text` changes. Nothing is cut. Nothing outside the files named under **Write**.
- No network, no git, never `.secrets`.

Reply in a short list: the rendered length, the pitches, how the handle and "show" now sound by
their phonemes, the three burps, and how many lines are heard differently from their caption.
