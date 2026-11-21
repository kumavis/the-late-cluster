# Brainstorm, writer 1 of 3

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `brainstorm.writer-1`, stage brainstorm of episode `002-2026-w47` (window `2026-W47`)
- **Write:** `episodes/002-2026-w47/production/brainstorm/writer-1.jsonl`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check brainstorm`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/ (this episode's research, ideas and drafts)
- packages/writers-room/playbooks/sources.md (how real accounts, posts and lines are recorded)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/

## Do not read

Writers, researchers and builders never see what the show has already done; reviewers do, which is how repetition is caught. Do not open:

- docs/ledger/ (the ledger)
- episodes/001-pilot/
- dist/episodes/ (every build)
- preview/ and shots/ of other episodes
- earlier episodes through git (git show, git log -p, other branches such as draft/*)
- reactions to earlier episodes ("About the show" in the digest): those are evidence for reviewers

## The task

Work over the whole screened longlist (research/longlist.json, cards with "kept": true) and write joke ideas for every card: as many as you can, quantity over polish.

One idea per line of brainstorm/writer-1.jsonl: { "card": "<card id>", "premise": "<a line or two>", "turn": "<the surprise>", "screen": "<what lands on screen>", "format": "<what might carry it>", "words": ["<at:// URIs whose real words it would use>"], "speakers": ["<handles of real accounts whose puppets would speak>"] }.

Work alone: do not read the other writers' files. Do not score or rank your ideas.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
