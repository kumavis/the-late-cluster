# Brief: an alternative song (a stretch goal, made in the background)

- **Role:** `writer` (.claude/agents/writer.md)
- **Episode:** `episodes/002-2026-w47/`. Paths below are under it unless they start with `docs/`,
  `packages/` or `data/`.
- **Write:** `production/drafts/music-alt/script.js`, `production/drafts/music-alt/notes.json`,
  and `production/drafts/music-alt/sources.json` if a real account appears. Nothing else. The
  present song, `segments/music/`, stays as it is; the owner will choose between the two.
- **Check before you stop:** the script loads:
  `node -e "import('./episodes/002-2026-w47/production/drafts/music-alt/script.js').then(m=>console.log(m.default.id, m.default.beats.length))"`.

## The owner's note

> i also am interested in a song alt. the first episode actually carried a really meaningful
> message dressed in its jokes and silly cheery nature. the new one is just "cat".

So the song the owner wants says something true and worth saying about the community this week,
and wears it lightly: the jokes and the tune carry it, and nobody preaches. You have not seen
the first episode and do not need to. Two lines are the least you need to steer clear of it:

- **Avoid:** the genre "stomp-clap anthem".
- **Avoid:** a song about wanting a place to belong.

Choose a genre that is also not the present song's (a folk lament).

## Read

- docs/bible/00-constitution.md, docs/bible/09-real-people.md
- docs/bible/04-formats.md (music), docs/bible/06-jokes.md, docs/bible/02-cast.md (the band)
- docs/bible/07-voices.md: the section "Songs", with "What the engine can render" and "The genre
  shelf". Write only what the engine can sing.
- `production/owner-notes.md`
- This week's material:
  - `production/research/cards/`: the researchers' cards, by lane
  - `production/research/screen.md`: which cards may be used, and on what terms
  - `data/weeks/2026-W47/lanes/`: the `.md` slices, for a wider view of the week; exact records
    by `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author <value>`
- The night the song sits in: the episode's scripts under `segments/` (each `script.js`), and the
  two new segments at `episodes/002-commissions-w47/production/drafts/making-of-inward/script.js`
  and `episodes/002-commissions-w47/production/drafts/riemann-breaking-news/script.js`
- `segments/music/script.js`: the present song. Yours is an alternative to it, not a second go
  at its idea.
- packages/show/tools/README.md: "Writing a segment script" (lines 80 to 226), for how music
  beats, tracks and sung lines are written
- packages/writers-room/playbooks/sources.md
- docs/voice-research.md: a one-minute scan. Sung words follow the same engine.

Do not read the ledger, `docs/trials/`, `production/review/`, `production/rank/`,
`production/scorecard.md`, `production/review.json`, earlier episodes, or anything else under
`episodes/002-commissions-w47/`.

## The task

Find what this week's posts, taken together, are really about, and write the song that says it.

- **The message is the week's.** It rests on real things from the window: what people made,
  asked for, said to each other. Name in `notes.json` the cards or posts it stands on. A message
  that could be sung any week is not it.
- **Dressed in jokes and cheer.** A structural joke the form carries, as the format chapter asks
  of a song, and a tune the band can sell. The message lands because the song is fun, not
  because a line explains it.
- **Real people.** If a real post is sung, shown or named, it is used on the terms in
  `production/research/screen.md`, exactly, in its own context; a puppet of a real account sings
  only that account's words. The band and the house cast can sing anything.
- **Length.** Eighty seconds at most, so the episode stays under ten minutes. Shorter is fine.
- **Format.** `script.js` in the studio's script format with `id: 'music-alt'`, every spoken or
  sung line with an id of its own, the music written as the README's beat tracks. Leave
  pronunciation fields empty; a sound editor fits it. Say in comments what the picture is at
  each cue.

`notes.json`: `{ "slug": "music-alt", "title", "format", "seconds": <your estimate>, "standing": "music", "cards": [...], "ideas": [], "speakers": [...], "featured": [...], "genre", "theme", "message": "<the message, in one plain sentence>", "whyThisWeek": "<the real things from the window it stands on>", "structuralJoke": "<what the form does>" }`.

Reply in a short list: the genre, the message in one sentence, what in the week it stands on, the
structural joke, and the lyric in full.
