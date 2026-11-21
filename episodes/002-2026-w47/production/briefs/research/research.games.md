# Research lane: the community's games and numbers (Top Chicken, forecasts, markets)

- **Role:** researcher (spawn the `researcher` subagent defined in .claude/agents/researcher.md)
- **Task:** `research.games`, stage research of episode `002-2026-w47` (window `2026-W47`), lane `games`
- **Write:** `episodes/002-2026-w47/production/research/cards/games/`. Nothing else.
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

Find what in the window belongs to your lane, "the community's games and numbers (Top Chicken, forecasts, markets)", and write one content card per thing, as research/cards/games/<card-id>.json. Card ids are lower case words and dashes, unique, and start with "games-".

A card says what happened in neutral words, lists the posts with their at:// addresses and exact text (copied from `npm run lookup`, never retyped), names who was involved with their follower counts, and notes anything sensitive. A card contains no jokes. Reach is computed by the tool from the scraper's figures; you need not add it.

Card format: { "id", "lane", "title", "summary", "posts": [{ "uri", "text", "handle" }], "people": [{ "handle", "followers" }], "sensitive": "<notes or none>" }. Image-only posts have "text": "" and an "alt".

Top Chicken: the digest's Community games section (sections.games, "Top Chicken as a segment"): the window's standings day by day (winner, likes, the winning post, its share of the record), repeat winners and streaks, whether the record moved, recent history and the all-time leaderboard. Winners only by name; never rank or name a non-winner (the digest says who came close is not known).

Do not propose jokes. Do not read earlier episodes or the ledger.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
