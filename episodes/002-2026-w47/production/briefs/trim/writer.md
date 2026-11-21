# Brief: trim four segments of the draft episode on the owner's notes

- **Role:** `writer` (.claude/agents/writer.md). This is assembly work: you read the episode's
  scripts because you are cutting them.
- **Episode:** `episodes/002-2026-w47/`. Paths below are under it unless they start with `docs/`
  or `packages/`.
- **Write:** `segments/made-pen-plotter-replies/script.js`, `segments/top-chicken/script.js`,
  `segments/made-mobius-chess-ringmate/script.js`, `segments/interview-yonderdavid/script.js`,
  `production/sources.json` where a cut removes a recorded line or post, and
  `production/trim.md`. Nothing else: not the coffee segment, not the song, no `index.js`.
- **Check:** `npm run check -- 002-2026-w47` will fail on the four segments until they are
  rendered again; that is expected. Before you stop, make sure each of the four scripts still
  loads: `node -e "import('./episodes/002-2026-w47/segments/<seg>/script.js').then(m=>console.log(m.default.id, m.default.beats.length))"`.

## Read

- `production/owner-notes.md`: the owner's words and the five cuts, with their times. This is
  the task.
- docs/bible/00-constitution.md, docs/bible/09-real-people.md
- docs/bible/03-episode-shape.md, docs/bible/02-cast.md
- the four scripts named above, and `production/sources.json`
- packages/writers-room/playbooks/sources.md

Do not read the ledger, `docs/trials/`, `production/review/`, `production/scorecard.md`,
`production/review.json`, other episodes, or anything in `episodes/002-commissions-w47/`.

## The task

Make the five cuts in `production/owner-notes.md`, each as its own change, so that any one of
them can be put back without touching the others. You are cutting, not rewriting.

- **Cut cleanly.** Remove the beats of the cut and anything that only served them (a cue, a
  music or sound beat, a setup line whose only job was the cut part). Keep every remaining
  line's `id`, `text`, `as` and timing fields exactly as they are.
- **Endings.** Each of the four segments must still end. Where the cut leaves a line that
  already works as the last one, change nothing. Write a new line only if a segment would
  otherwise stop without an ending, keep it to one short line in the speaker's voice, and never
  add a line for a real person.
- **The plotter's opening.** The owner wants the pen plotter in the opening to draw the show's
  title. The words stay ("This is The Late Cluster, with Larry Nx."). Say in the cue comments
  what the pen writes and when, so that the title is on the paper as the line that names it
  ends. If the pen needs longer to write it, lengthen the pen's hum by the least that works and
  say how much.
- **Real people.** A cut never changes what a remaining real line says or what it answers. If a
  cut removes the setup of a real line that stays, the line goes too, or the setup stays. When a
  post is no longer used anywhere, remove its record from `production/sources.json`; when it is
  still shown on a card, leave it.
- **The chess segment carries the episode's close.** After the cut the episode's last words are
  "I resign." Leave it there.

**Write `production/trim.md`:** for each of the five cuts, the ids of the beats removed, any
line you added or changed with its full text (those go to a repetition check, so list every
one), and your estimate of the seconds saved. Then one paragraph: anything a cut broke that you
could not mend by cutting.

Reply in a short list: the five cuts as made, every added or changed line, and anything left for
the owner.
