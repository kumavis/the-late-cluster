# The post that carries the video, and its alt text

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `post.text`, episode `003-holiday-2026`
- **Write:** `episodes/003-holiday-2026/production/post.md`. Nothing else.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/segments/walk/script.js` and `notes.json`
- `episodes/003-holiday-2026/episode.json` (the title and description as they stand)
- `docs/bible/01-premise.md` ("Who it is for", "Sincerity") and `docs/bible/02-cast.md` (Larry)

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, `data/`, any
`production/review/`, or git history.

## The task

Episode three, "The Walk Home", goes out tomorrow morning as a video posted from the show's
own Bluesky account. The post is the video, a line or two of text above it, and alt text for
people who cannot see the video. Write both.

**The post text: three candidates.** Each:

- at most 300 characters, and better well under 200: it sits above a video and should not
  compete with it;
- plain text. No mention, no link, no hashtag, no emoji: the tool refuses a mention or a link,
  and the show does not use the others;
- says it is The Late Cluster and that this is episode three, a holiday special, so a
  follower knows it is not a usual episode: there is no show tonight, and Larry walks you
  home;
- in the show's voice at its plainest: dry, warm, short. It does not say what the special
  means, does not tell anyone how to feel, does not name the holiday, and promises nothing
  the four minutes do not do. It gives away neither the door nor the table;
- reads on its own for someone who has never seen the show.

Make the three different in approach, give each its character count, and do not rank them.

**The description for the page**, one or two sentences under 300 characters, for
`episode.json`: the same rules, written for the archive, where it sits beside the first two
episodes' descriptions and will still be read in a year. Offer one, or keep the present one
and say why.

**The alt text: one.** For a person using a screen reader or with the video not loading. Say
what kind of thing it is and how long, what is seen (line-drawn puppet heads on black, the
places in order, without telling the ending's surprise in detail), that every voice is
synthesized, and that captions are on screen throughout. Plain description, no selling.
About 300 to 500 characters.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- You work alone, from this brief and the files it names. When you finish, reply with two
  sentences: the three approaches in a phrase each.
