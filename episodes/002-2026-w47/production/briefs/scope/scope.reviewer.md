# Is this the right community, widely enough?

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `scope.reviewer`, stage scope of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/scope/review.md`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check scope`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

Read the scraper's coverage report (data/weeks/2026-W47/coverage.md: membership, worries against thresholds, concentration, new and gone, the reference checker), the tool's figures in episodes/002-2026-w47/production/scope/coverage.md, the digest's window and overview, and the scraper's cluster configuration (packages/scraper/config/cluster.json).

Answer three questions in scope/review.md, each under its own heading: "## Is this the community the show is about?", "## Is it wide enough that the episode will not be about the same few people?", "## Is anything obviously missing?".

End with one line: "Verdict: proceed" or "Verdict: rescrape: <what to change in the configuration>". A rescrape is a valid result.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
