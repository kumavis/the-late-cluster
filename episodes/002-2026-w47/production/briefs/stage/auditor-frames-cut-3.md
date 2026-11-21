# Brief: look at the frames of the closing song, the chess ending and the end roll

- **Role:** `auditor`
- **Episode:** `episodes/002-2026-w47/`. The owner has chosen a new song, `music-alt`, to close the
  episode in place of the old one, kept its original ending, chose a lower lead voice, and asked
  for a goodnight. Everything else in the episode passed its frame audit in
  `production/review/stage/cut-2-r1.json` and its fixes. Paths below are under the episode unless
  they start with `docs/` or `packages/`.
- **Write:** `production/review/stage/cut-3-r1.json`. Nothing else; change no segment.

## Read

- `docs/bible/08-direction.md`; `docs/bible/09-real-people.md` for what must be on screen
- `packages/show/tools/README.md`, only how to use `npm run shoot` and `npm run check`
- `production/owner-notes.md`: the sections on the song and on the close
- `segments/music-alt/script.js` (every cue's comment is its direction) and `cues.json`
- `segments/made-mobius-chess-ringmate/script.js` and `cues.json`
- `production/sources.json`
- `production/review/audit-song-alt.md`: what the script's audit settled, and its notes
- `production/research/screen.md`: the terms of the cards the song stands on

## The task

Shoot a frame at every cue and inside every long hold (`npm run shoot -- 002-2026-w47 <seg> <t>…`),
look at every one, and run `npm run check -- 002-2026-w47`.

**`music-alt`, the closing song (77.8 s).** Look first at:
1. The one real post, at `dave-card`: exact text, display name, handle, date and counts against
   `production/sources.json`; the words Larry reads are lit as he reads them.
2. The four credit tiles (`tile-cat`, `tile-coffee`, `tile-wheelie`, `tile-mug`): each a plain
   glyph and an exact credit; nothing is drawn of a video, a game or a photo nobody at the show
   has seen. The coffee tile reuses the studio's own sketch from the coffee segment; say whether
   that is the show's drawing or could be taken for the member's work. The credits are small
   (about 11 to 12 px): rule on whether a real person's credit is legible.
3. The tag `+ MUG · ADDED BY DAVE` at `mug-in`, against the terms.
4. No puppet of a real account appears. The lyric names one member ("Samantha"); the lyric drawn
   on screen must read exactly as the script's line.
5. One singer, two voices: the lead is sung by a cast entry that stands at Hy's mark with Hy's
   look, and the ordinary Hy is swapped in for his two spoken lines (changeovers at about
   45.03 s and 53.11 s). Shoot either side of each: there must be one Hy and no jump.
6. The cards DOO and WOP: the owner has heard and seen them and is content. Check only that
   they are drawn as the script says.
7. The ending the owner chose: the spot, the wide with Larry, his DOO card, the bulbs at the key
   change, the label changing to BEST YOU CAN DO.
8. The goodnight: `toast` and `last-picture`. The last picture holds to the last frame; nothing
   unreadable or overlapping; captions clear.
9. Anything longer than a glance on screen that is neither sung nor spoken.

**`made-mobius-chess-ringmate` (61.2 s).** It is no longer the close. Its first line changed to
"One more game before the song." and its long closing applause was removed. Check the first
frames, and that the ending after "I resign." holds properly through the laugh and the sting to
the last frame, with nothing left of a longer close.

**The end roll.** Shoot it where the cast and the members are named. Each house character once
(the lead singer has two cast entries: "Hy Oid" must appear once), each real account whose
puppet spoke once with its exact display name and handle, nobody who left the episode. The old
song is out of the running order: nothing of it may be credited.

**People.** From `production/sources.json`, list which real accounts are now in two segments, and
confirm nobody is in three, counting a bot's post toward its operator only where the operator is
named, shown or voiced (the owner's ruling, in `docs/WORKFLOW.md`).

You do not judge whether anything is funny, and you change nothing.

**Write** `production/review/stage/cut-3-r1.json`:
`{ "segments": { "music-alt": { "verdict": "pass" | "change", "changes": [{ "must": true | false, "at": "<cue or time>", "change": "<exactly what to change>" }] }, "made-mobius-chess-ringmate": { ... } }, "endRoll": { ... }, "people": "<two or three sentences>" }`.

Reply in a short list: the verdicts, and each `must` in a line.
