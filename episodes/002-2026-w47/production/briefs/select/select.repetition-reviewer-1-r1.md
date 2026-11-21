# Repetition gate on scripts, round 1 (reviewer-1)

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `select.repetition-reviewer-1-r1`, stage select of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/review/repetition-scripts/reviewer-1-r1.json`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check select`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

With the ledger and the earlier scripts in front of you, give each draft one verdict: fresh, turned (turns something the show did on its head; say what and how) or repeat (the same joke, runner, catchphrase, device or shape).

Judge against aired episodes (docs/ledger/README.md, "What counts as the same" and "Aired and drafted"): material only an unaired draft used is fresh; "fromPrevious" means the previous aired episode. A standing segment (interview, Top Chicken, music) recurs by the owner's decision; what must be new is how it is built.

Drafts and the version each verdict must name: interview (version 1c665d1134ea), interview-yonderdavid (version 2eb0372c907f), made-cat-voice-quartet (version 39b45b4e313c), made-mobius-chess-ringmate (version c162e7220b65), made-pen-plotter-replies (version 2162fdb83fc2), made-polyhedra-instruments-sakura (version 8051ab02ecae), made-polyhedral-coffee-simulator (version 5a990772e8ba), music (version d81a3d4bc2b0), top-chicken (version 7f61e0ca30d1)

Write review/repetition-scripts/reviewer-1-r1.json: { "reviewer": "reviewer-1", "round": 1, "items": [{ "id": "<slug>", "version": "<version>", "verdict": "fresh|turned|repeat", "turned": { "what", "how" }, "fromPrevious": true|false, "avoid": "…", "reason": "…" }] }. Judge alone.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
