# Stage the segment music-alt

- **Role:** `builder`
- **Episode:** `episodes/002-2026-w47/`. `music-alt` is an alternative song, "Best We Can
  Doo-Wop", made for the owner to compare with the present song. It is set up as a segment but is
  **not in the running order**; leave `episode.json` alone.
- **Write:** `episodes/002-2026-w47/segments/music-alt/index.js`, and helpers and props beside it
  in the same folder. Nothing else: not `looks.js`, `cast.js`, any script, `sources.json`,
  another segment, or anything in `packages/`.
- **Check:** your own eyes on frames from `npm run shoot -- 002-2026-w47 music-alt <t>…`.
  `npm run check -- 002-2026-w47` covers the running order and may not list this segment; if it
  does not, say so, and make sure every frame you shoot loads with no page errors and no unknown
  cues.

## Read

- `packages/show/README.md`: authoring a segment, the stage shot for the band, captions and
  lyrics, cards and labels
- `docs/bible/08-direction.md`
- `episodes/002-2026-w47/segments/music-alt/script.js`: every cue carries a comment saying what
  the picture is. That is your direction. And `cues.json`, freshly rendered (68.4 s, 32 lines,
  23 cues). Do not re-render.
- `episodes/002-2026-w47/production/drafts/music-alt/sources.json` and `notes.json`: the exact
  text, display name, handle, date and counts of the one post shown, and the credits on the
  tiles
- `episodes/002-2026-w47/segments/music/index.js`: the present song's staging in this same
  episode, as a working example of the band on the stage, sung lines drawn as lyrics from their
  word timings, and tiles. Read it and **copy** what you use into your own folder; never import
  from another segment.

Do not read `production/review/`, `docs/ledger/`, `docs/trials/`, or any other episode's folder.

## The task

Write `index.js` against the rendered `cues.json`. The owner has heard the song and wants to see
it, as written.

- The band on the stage, with the singers the script names. Sung lead lines are drawn as lyrics
  on their word timings, as the present song does, with the caption bar hidden for those lines;
  spoken lines keep their captions.
- The one real post, at `dave-card`, is shown as a card: exact text, display name, handle, date
  and counts from the draft's `sources.json`, with the words Larry reads lit as he reads them.
- The tiles (`tile-cat`, `tile-coffee`, `tile-wheelie`, `tile-mug`) are a plain glyph and a
  credit each, exactly as the script's comments give them. Nobody at the show has seen the
  video, the game or the photo, so nothing is drawn of them: no imitation of anyone's work.
- The cards `card-doo` and `card-wop` and everything else on screen are as the script says. The
  owner has heard the syllables sung as written and is content with them.
- The ending (from the cue `to-desk` to `last-chord`) is being rewritten by its writer and will
  be restaged later. Stage it now as written, plainly, so the owner can see the song whole; do
  not spend long on it.

Shoot a frame at every cue and in the middle of every long hold, look at each one, and fix what
you see: anything unreadable, overlapping, under the captions, cut off, or showing through
without a fill. Lyrics must be readable while they are sung.

## Rules

- A real post on screen shows its exact text, with display name, handle, date and counts, cut
  only with an ellipsis. Each credit is exact.
- No puppet of a real account appears in this segment.
- Nothing longer than a glance is on screen unless it is sung or spoken.
- The script, the cues and the voices do not change.
- No git write commands, no network, never `.secrets`.

Reply in a short list: what you built, the times of the frames you looked at, anything the
script asked for that you could not do, and what an auditor of the frames should look at first.
