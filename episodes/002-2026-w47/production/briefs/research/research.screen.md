# Screen the longlist against the constitution

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `research.screen`, stage research of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/research/screen.json`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check research`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

Read every card in research/longlist.json against the constitution and chapter 9: out-of-bounds subjects, opted-out accounts, small accounts who would not come off well, anything that cannot be used in its own context.

Write research/screen.json: { "cards": { "<card id>": { "keep": true|false, "reason": "<one sentence>" } } } with every card. Removed cards stay in the longlist with the reason. Also write research/screen.md with anything the writers should know.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
