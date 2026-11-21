# Score the drafts (reviewer-2)

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `select.reviewer-2`, stage select of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/select/reviews/reviewer-2.json`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check select`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

Score every draft in production/drafts/ (interview, interview-yonderdavid, made-cat-voice-quartet, made-mobius-chess-ringmate, made-pen-plotter-replies, made-polyhedra-instruments-sakura, made-polyhedral-coffee-simulator, music, top-chicken) from 0 to 10 on four things: funny, interesting, television (does it work on screen: nothing left for the viewer to read in silence), variety (does it add something different, from the other drafts and from the last episode).

Write select/reviews/reviewer-2.json: { "reviewer": "reviewer-2", "drafts": { "<slug>": { "funny", "interesting", "television", "variety", "reason": "…" } }, "inherit": [] }. Judge alone.

Usually "inherit" is empty. Only if a builder truly needs a file from an earlier episode as reference, name it: { "from": "<episode id>", "path": "segments/<seg>/index.js", "why": "…" }.

People: fresh people are preferred; nobody is barred for having appeared before, but the same few should not be in too often. The ledger's featured tracker shows who appeared when.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
