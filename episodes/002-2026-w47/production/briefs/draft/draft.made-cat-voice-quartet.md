# Draft a segment from card made-cat-voice-quartet

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `draft.made-cat-voice-quartet`, stage draft of episode `002-2026-w47` (window `2026-W47`), segment `made-cat-voice-quartet`
- **Write:** `episodes/002-2026-w47/production/drafts/made-cat-voice-quartet/script.js`, `episodes/002-2026-w47/production/drafts/made-cat-voice-quartet/notes.json`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check draft`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

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

Draft one segment from card made-cat-voice-quartet using the shortlisted ideas writer-2-55, writer-2-52 (brainstorm/ideas.jsonl and brainstorm/rework/).

Write drafts/made-cat-voice-quartet/script.js in the script format of packages/show/tools/README.md, with `id: 'made-cat-voice-quartet'`. A real account's puppet says only what that account published, each line tagged with its source and context (bible chapter 9, R3 and R4); the show's own characters do the joking around it.

Write drafts/made-cat-voice-quartet/notes.json: { "slug": "made-cat-voice-quartet", "title", "format", "seconds": <your estimate>, "standing": null, "cards": ["made-cat-voice-quartet"], "ideas": ["writer-2-55", "writer-2-52"], "speakers": ["<handles of real accounts whose puppets speak>"], "featured": ["<handles of real accounts shown on screen>"] }.

If real accounts appear, write drafts/made-cat-voice-quartet/sources.json in the format of packages/writers-room/playbooks/sources.md (accounts, posts with displayName and counts, lines with each line's context and staged setup). If the segment needs a guest the studio's cast lacks, put the entry in drafts/made-cat-voice-quartet/cast.js.

Television: nothing on screen for the viewer to read in silence. A post that is shown is performed or read aloud, or is short enough to take in at a glance.

The episode's one experiment is in episodes/002-2026-w47/production/experiment.md. Where it touches your work, run it; it is judged at review against its measure.

Draft alone: do not read the other drafts. Do not score your own.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
