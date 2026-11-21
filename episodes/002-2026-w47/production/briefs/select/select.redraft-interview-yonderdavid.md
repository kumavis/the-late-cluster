# Redraft interview-yonderdavid, which repeats something the show has done

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `select.redraft-interview-yonderdavid`, stage select of episode `002-2026-w47` (window `2026-W47`), segment `interview-yonderdavid`
- **Write:** `episodes/002-2026-w47/production/drafts/interview-yonderdavid/script.js`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check select`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

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

The draft interview-yonderdavid was selected but judged a repeat. What to avoid, as the reviewers put it: Kind: joke. What it repeats: the show has already made a joke of how soon a thing existed after someone asked about it, with the time that passed put on screen before the reveal. In exchange 1, do not title, tag or count the time between the question and the video, and do not make the delivery line (so many hours later, there it was) the line the laugh follows. If the time is said at all, say it once, plainly, with no picture for it; the answer's own wording and the thing itself carry the exchange. A turn: not open this episode..

Rewrite drafts/interview-yonderdavid/script.js (and notes.json, sources.json if they change) so it avoids that, or turns it on its head. Reviewers will judge the new version.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
