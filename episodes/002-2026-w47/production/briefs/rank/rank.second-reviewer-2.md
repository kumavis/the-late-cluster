# Rank, second pass: synergy and variety (reviewer-2)

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `rank.second-reviewer-2`, stage rank of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/rank/second/reviewer-2.json`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check rank`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

The top 12 cards after the first pass are: made-pen-plotter-replies, interview-yonderdavid, made-cat-voice-quartet, interview-cee-wtf, made-vocal-synth-choir, made-yard-shift-wheelie, made-polyhedra-instruments-sakura, made-polyhedral-coffee-simulator, voices-plotter-queue-small-accounts, made-speak-and-spell, made-mobius-chess-ringmate, made-also-liked-feed (rank/first.json).

For each, score synergy (0-2: does it make another card better, is there a through-line) and variety (0-2: different people, subjects and kinds of comedy, and different from the last episode in the ledger), and choose the idea ids that should go forward for it.

Write rank/second/reviewer-2.json: { "reviewer": "reviewer-2", "cards": { "<card id>": { "synergy": 0-2, "variety": 0-2, "ideas": ["<idea id>"], "with": ["<card ids it combines with>"], "reason": "…" } } }.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
