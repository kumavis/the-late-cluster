# Research lane: interview candidates: one member whose public posts answer real prompts

- **Role:** researcher (spawn the `researcher` subagent defined in .claude/agents/researcher.md)
- **Task:** `research.interview`, stage research of episode `002-2026-w47` (window `2026-W47`), lane `interview`
- **Write:** `episodes/002-2026-w47/production/research/cards/interview/`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check research`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- data/weeks/2026-W47/digest.md, and exact records looked up with `npm run lookup -- --dir data/weeks/2026-W47 --uri|--url|--text|--author|--story|--thread <value>` or `npm run produce -- --week 2026-W47 --find "<at:// URI, bsky.app URL or text>"` (digest.json is several megabytes: never read it whole)
- episodes/002-2026-w47/production/scope/
- episodes/002-2026-w47/production/research/

## Do not read

Writers, researchers and builders never see what the show has already done; reviewers do, which is how repetition is caught. Do not open:

- docs/ledger/ (the ledger)
- episodes/001-pilot/
- dist/episodes/ (every build)
- preview/ and shots/ of other episodes
- earlier episodes through git (git show, git log -p, other branches such as draft/*)
- reactions to earlier episodes ("About the show" in the digest): those are evidence for reviewers

## The task

Find what in the window belongs to your lane, "interview candidates: one member whose public posts answer real prompts", and write one content card per thing, as research/cards/interview/<card-id>.json. Card ids are lower case words and dashes, unique, and start with "interview-".

A card says what happened in neutral words, lists the posts with their at:// addresses and exact text (copied from `npm run lookup`, never retyped), names who was involved with their follower counts, and notes anything sensitive. A card contains no jokes. Reach is computed by the tool from the scraper's figures; you need not add it.

Card format: { "id", "lane", "title", "summary", "posts": [{ "uri", "text", "handle" }], "people": [{ "handle", "followers" }], "sensitive": "<notes or none>" }. Image-only posts have "text": "" and an "alt".

Interview candidates: start from the digest's Interview material (sections.interview: per member, question-and-answer pairs, each answer their real post replying to someone else's question or prompt, both with exact text). One card per candidate listing the pairs worth using, each post with what it replied to. Someone who appeared in the previous aired episode is never a candidate (the digest leaves them out; the ledger check runs again later).

Do not propose jokes. Do not read earlier episodes or the ledger.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
