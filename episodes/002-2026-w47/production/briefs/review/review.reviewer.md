# Review the episode, and write it into the ledger

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `review.reviewer`, stage review of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/scorecard.md`, `episodes/002-2026-w47/production/review.json`, `docs/ledger/002-2026-w47.json`, `docs/ledger/002-2026-w47.md`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check review`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

Fill in the scorecard from the bible (docs/bible, the scorecard) as production/scorecard.md, with one sentence of evidence per row.

Judge the experiment (production/experiment.md, proposed at the rank stage) in row B12: was it run on screen, and does its measure hold? Say so in dna-amendments.md's "## Experiment" section if you edit the DNA.

Write the episode into the ledger: docs/ledger/002-2026-w47.md (the prose record: every joke, runner, format, guest, account on a card, song genre and staging device) and docs/ledger/002-2026-w47.json ({ "id", "aired": false, "guests", "featured", "formats", "song", "runners", "catchphrases", "devices" }).

Write production/review.json: { "verdict": "approve" | "send-back", "route": "<the stage that can fix it>", "reasons": [] }. A send-back is a valid result; do not soften scores to avoid one.

If the episode earned a change to the craft bible, edit the chapter and list it in production/dna-amendments.md. Never edit the constitution.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
