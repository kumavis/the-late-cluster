# Brief: audit the alternative song against the constitution and the week's terms

Paths are under `episodes/002-2026-w47/` unless they start with `docs/`.

**Read**
- `production/owner-notes.md` (its last section)
- `docs/bible/00-constitution.md`, `docs/bible/09-real-people.md`
- `production/research/screen.md`: which of the week's cards may be used, and on what terms
- `production/research/cards/`: the cards the song stands on (`notes.json` names them)
- `production/drafts/music-alt/script.js`, `notes.json`, `sources.json`
- `production/sources.json`, for how the same people are already used in this episode
- `production/assembly-2.md`, for the running order

**Check**
1. **Every real thing the song names, shows or credits** (a member's cat voice, simulator, game
   and mug; the phrase read from a post; any tile or credit a cue describes) is from a card the
   screen allows, used on that card's terms, and stated as the card states it. Text read aloud
   or shown is exact, a cut marked. Look up posts with
   `npm run lookup -- --dir data/weeks/2026-W47 --uri <address>`.
2. **Nobody's puppet speaks or sings**, and no line puts words in a real person's mouth or says
   what they meant. "Someone" in the lyric refers each time to a real member: check that each
   line is true of what that member posted, and that no pronoun is used for anyone.
3. **The people rules.** With this song in place of the present one, which real accounts are in
   two segments, and does anyone exceed the caps (two segments a person; one interview)? Is
   anyone named who is on the opt-out list or was withheld by the scraper?
4. **Pictures.** The writer says nobody has seen the video, the game or the photo, so their tiles
   are a plain glyph and a credit. Check that no cue asks for a picture of something nobody has
   looked at, or redraws someone's work as if it were theirs.
5. **On screen.** Nothing longer than a glance is on screen unless it is sung or spoken; each
   credit is exact.
6. **The show about itself.** "I only host." and the song's ending are about the host. The
   episode already has two pieces about the show itself by the owner's choice (the making-of and
   the account bit). Say, as a note for the owner, whether this makes a third.

You do not judge whether anything is funny, and you do not rewrite.

**Write** `production/review/audit-song-alt.md`: `pass` or `change`, then findings marked `must`
or `note`, each with the line's id. Change nothing else. `npm run lookup` reads the saved digest
and needs no network.

Reply in a few sentences: the verdict and each `must` in a line.
