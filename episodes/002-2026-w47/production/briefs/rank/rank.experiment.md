# Propose the episode's one experiment

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `rank.experiment`, stage rank of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/experiment.md`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check rank`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/
- docs/ledger/ (the ledger: what the show has already done)
- episodes/<earlier ids>/ and dist/episodes/ (earlier scripts and builds)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## The task

With the shortlist (rank/shortlist.md), the craft bible and the ledger in front of you, propose the one deliberate experiment this episode runs: something it tries that the show has not done (bible 03, "One experiment per episode"). You can see what the show has tried; the writers cannot.

Write production/experiment.md with three sections: "## What we try" (in a sentence or two, as an instruction), "## Why" (what the bible or this window's material suggests it could do), "## Measure" (how someone else can check, after the episode is built, whether it was run and whether it worked).

This file goes to the writers and builders, so it states only what to try. Never describe an earlier episode, its jokes, people or devices, and never name one; no "last time", "again" or "this time".

Never constitutional: an experiment cannot relax any article of the constitution or chapter 9.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
