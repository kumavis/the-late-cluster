# Rank, first pass (reviewer-2)

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `rank.reviewer-2`, stage rank of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/rank/reviews/reviewer-2.json`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check rank`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

For every kept card in research/longlist.json, score two things from 0 to 10, with the ideas in brainstorm/ideas.jsonl in front of you:

- interest, by the constitution's interesting test (turn or feeling, this week, retell);

- best joke: the strength of the strongest idea for that card, naming the idea's id.

Write rank/reviews/reviewer-2.json: { "reviewer": "reviewer-2", "cards": { "<card id>": { "interest": 0-10, "bestJoke": { "idea": "<idea id>", "score": 0-10 }, "reason": "<one sentence>" } } }.

Reach is computed by the tool. Judge alone: do not read the other reviewers' files.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
