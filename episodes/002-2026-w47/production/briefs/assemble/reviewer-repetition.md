# Brief: the repetition gate on what was added at assembly

You are one of two reviewers. Judge alone; the stricter verdict stands. Your reviewer number is
in the message that gave you this brief. Paths are under `episodes/002-2026-w47/` unless they
start with `docs/` or `episodes/`.

**What happened.** The owner had this draft episode trimmed and two new segments added, and
asked for one new bit: "a quick "finally got a bluesky account" bit somewhere where larry shows
his account handle." A writer wrote it and set a new running order. Lines written at assembly
pass the repetition gate before they are staged.

**Read**
- `production/owner-notes.md` (its last section) and `production/assembly-2.md`
- `segments/bluesky-account/script.js`: the new bit, three lines and its picture
- For repetition: `docs/ledger/README.md`, `docs/ledger/001-pilot.md`, `docs/ledger/register.md`,
  `docs/ledger/lore.md`. The only aired episode is `001-pilot`.
- For echoes inside this episode: the other eight scripts, `segments/<seg>/script.js` for
  `made-pen-plotter-replies`, `interview-yonderdavid`, `top-chicken`,
  `made-polyhedral-coffee-simulator`, `music`, `made-mobius-chess-ringmate`, and
  `episodes/002-commissions-w47/segments/making-of-inward/script.js` and
  `episodes/002-commissions-w47/segments/riemann-breaking-news/script.js`

**Judge**
1. **The bit against what the show has aired:** `fresh`, `turned` or `repeat`, as your role sheet
   sets out. The owner asked for the bit, so a `repeat` here is about how it is done (its joke,
   its picture, its wording), not whether there is one.
2. **Echoes inside the episode.** The writer flags that "I'm not in it." is built like a line in
   the making-of, "The show is not on it. By rule." Say whether that, or anything else in the
   three lines, reads as the same joke or a stock phrase used twice in one night. Say whether the
   bit and the making-of's turn to the audience, three segments later, tread on each other.
3. **The order.** Not a repetition verdict: one or two sentences if the running order repeats the
   aired episode's shape in a way a viewer would feel, or puts two things side by side that
   should not touch.

You do not rewrite anything.

**Write** `production/review/repetition-assembly-2-<your number>.json`:
`{ "bit": { "verdict": "fresh" | "turned" | "repeat", "turned": <what is turned and how, or null>, "avoid": <for a repeat: the least a writer needs to steer clear, with nothing from the aired episode in it; else null>, "why": "<one or two sentences; writers never see this>" }, "echoes": [ { "line": "<id>", "with": "<segment and line id>", "matters": true | false, "why": "..." } ], "order": "<one or two sentences, or 'no remark'>" }`

Reply in two or three sentences.
