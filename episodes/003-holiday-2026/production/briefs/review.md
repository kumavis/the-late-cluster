# Review episode three, and write it into the ledger

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `review.reviewer`, episode `003-holiday-2026`
- **Write:** `episodes/003-holiday-2026/production/scorecard.md`,
  `episodes/003-holiday-2026/production/review.json`,
  `docs/ledger/003-holiday-2026.md`, `docs/ledger/003-holiday-2026.json`, and the row for it
  in `docs/ledger/README.md`. You may also edit `docs/ledger/lore.md`,
  `docs/ledger/register.md`, `episodes/003-holiday-2026/production/dna-amendments.md` and a
  craft chapter of the bible if the episode earned a change. Never the constitution.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md`, `special.md` and `experiment.md`
- `episodes/003-holiday-2026/segments/walk/script.js`, `notes.json`, `cues.json`
- `episodes/003-holiday-2026/production/fit/sound-walk.md`: what every line was heard as, and
  what the places sound like. Nobody has heard the mix; this report is the evidence for the
  sound rows.
- `episodes/003-holiday-2026/production/stage/` (the builders' plan and integration notes) and
  `production/review/stage/` (the auditor's rounds on the frames)
- `episodes/003-holiday-2026/production/review/cold-viewers.md`: what viewers who were shown
  still frames and nothing else said had happened
- `episodes/003-holiday-2026/production/review/` (the select and final reviews, the audits,
  the repetition record) and `production/select.md`, `assembly.md`
- **The frames:** `shots/003-holiday-2026/_audit/` (one at every cue, between cues and in
  every line, at 640 by 360, with `index.txt`), and `shots/003-holiday-2026/end/` (the
  credits). Shoot any other moment yourself:
  `CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run shoot -- 003-holiday-2026 walk <t>… --out <a folder in your scratch>`
- `docs/bible/` (all of it; `10-process.md` holds the scorecard)
- `docs/ledger/` (the README, `lore.md`, `register.md`, the two aired records) and the aired
  episodes. The previous aired episode is `002-2026-w47`.

## The task

**1. The scorecard** (`docs/bible/10-process.md`), as `production/scorecard.md`, with a
sentence of evidence in every row: a line id, a cue, a frame's time.

This episode is a holiday special whose form the owner set: one piece of about four minutes,
no posts, no guests, no window, no standing segments, sincerity as the piece, no audience. The
scorecard was written for a weekly episode. So:

- Do Step 0 on the special as a whole and on each of its parts (the studio, each idea, each
  place on the street, the door, the table).
- Part A: judge every gate that can apply. Where a gate has nothing to judge because there
  are no real accounts or posts in it, write `nothing to judge` and why, and it passes. A13
  is on record in `production/review/repetition-assembly.json`. A6 was put to the owner for
  religion, and the owner's ruling is in `owner-notes.md`; judge everything else in A6
  yourself.
- Part B: score every row that can be scored. Where a row asks for something the owner set
  aside (jokes in every segment, material from the window, the standing segments), write
  `set aside by the owner` and score what the row is for in this episode instead, saying what
  you scored: for B2, whether it moves and whether its lightness lands; for B3, whether what
  it rests on is real and exact; for B11, write `not applicable` and leave it out of the
  total. State the total, what it is out of, and how the approval rule applies with the rows
  you left out.
- B12, the experiment: `experiment.md` says what is tried and gives the two reviewers'
  measures. Judge what can be judged before anyone has watched it with sound, with the cold
  viewers' answers in hand, and say plainly what only the owner's watch can settle.
- Say what you could not check. You have not heard it: list the rows that rest on the fit
  report and not on ears, and the lines the owner must listen to.

**2. The verdict**, as `production/review.json`:
`{ "verdict": "approve" | "send-back", "route": "<the stage that can fix it>", "reasons": [], "changes": ["<what the recipient must change, with nothing from the ledger in it>"], "forTheOwner": ["<what the owner should watch and listen for>"] }`.
A send-back is a valid result. Approval sends the episode to the owner; it is not the owner's
review.

**3. The ledger.** Write the episode into `docs/ledger/003-holiday-2026.md` and `.json`, in
the form of the earlier records: every line that works as a joke or a button, every device
and staging idea, the format, the shape of the open and the close, the sounds, the places,
what each house character does, and what it says to the viewer. It has not aired: the json
says `"aired": false` and the README's row says drafted, not aired. Nobody real appears, so
the tracker `featured.json` does not change. Add to `lore.md` and `register.md` only what
their own rules call for, marked as not yet aired.

**4. The DNA.** If the special earned a change to a craft chapter, make it and list it in
`production/dna-amendments.md` with the reason. It is one unaired episode; be slow to
generalise from it. If nothing is earned yet, say so in one line.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- You do not rewrite what you review. Fail what you are not sure passes.
- No network, no git writes, no builds. You work alone, from this brief and the files it
  names. When you finish, reply in three or four sentences: the verdict, the total, the
  weakest rows, and what the owner must watch for.
