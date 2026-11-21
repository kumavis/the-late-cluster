# Brief: the alternative song, against what has aired and against the present song

You are one of two reviewers. Judge alone; the stricter verdict stands. Your reviewer number is
in the message that gave you this brief. Paths are under `episodes/002-2026-w47/` unless they
start with `docs/`.

**What happened.** The owner said of this draft: "i also am interested in a song alt. the first
episode actually carried a really meaningful message dressed in its jokes and silly cheery
nature. the new one is just "cat"." A writer who has not seen the first episode drafted an
alternative, with two lines to steer by: not the aired song's genre, and not a song about
wanting a place to belong. The owner will choose between the two songs. You judge first.

**Read**
- `production/owner-notes.md` (its last section)
- `production/drafts/music-alt/script.js` and `notes.json`: the alternative
- `segments/music/script.js`: the present song
- `segments/made-polyhedral-coffee-simulator/script.js`: the alternative picks up a phrase from
  it, and the present order puts the song straight after it
- `production/assembly-2.md`: the running order
- `docs/bible/04-formats.md` (music), `docs/bible/06-jokes.md`
- For repetition: `docs/ledger/README.md`, `docs/ledger/001-pilot.md`, `docs/ledger/register.md`,
  `docs/ledger/lore.md`. The only aired episode is `001-pilot`.

**Judge**
1. **Repetition, the alternative against what has aired:** `fresh`, `turned` or `repeat`, as your
   role sheet sets out. Look at the genre, the message, the structural joke, the device of a
   hook that comes back with a word changed, and above all the ending, where the host is asked
   what he can do and the song makes room for his one note: the writer says this is the one
   place to hold against the aired song's subject.
2. **Does it do what the owner asked?** A real message about this week, worn lightly. Say in two
   sentences what the song would leave a viewer with, and whether that is the week's or could be
   sung any week.
3. **Against the present song.** Score both on the same four rows the selection used, 1 to 10:
   `funny`, `interesting`, `television`, `variety` (variety within this episode as it now runs).
   Then say which you would air, in one sentence.
4. **Inside the episode.** The coffee segment's button is "The best we can do." and the song's
   hook is the same phrase. Callback or repeat? And the alternative would put four members in
   two segments each: say whether that leans too hard on the same people.

You do not rewrite anything.

**Write** `production/review/song-alt-<your number>.json`:
`{ "repetition": { "verdict": "fresh" | "turned" | "repeat", "turned": <or null>, "avoid": <for a repeat: the least a writer needs, with nothing from the aired episode in it; else null>, "why": "<writers never see this>" }, "message": "<two sentences>", "scores": { "music-alt": { "funny": n, "interesting": n, "television": n, "variety": n }, "music": { ... } }, "air": "music-alt" | "music", "airWhy": "<one sentence>", "inside": "<two or three sentences>" }`

Reply in two or three sentences.
