# Stage the segment made-mobius-chess-ringmate

- **Role:** builder (spawn the `builder` subagent defined in .claude/agents/builder.md)
- **Task:** `stage.made-mobius-chess-ringmate`, stage stage of episode `002-2026-w47` (window `2026-W47`), segment `made-mobius-chess-ringmate`
- **Write:** `episodes/002-2026-w47/segments/made-mobius-chess-ringmate/index.js`. Nothing else.
- **Checked by:** `npm run produce -- --week 2026-W47 --check stage --segment made-mobius-chess-ringmate`, which runs the gates on what you wrote. You are done when it prints no FAIL lines that concern your files.

## Read

- docs/bible/ (the constitution, 00-constitution.md and 09-real-people.md, and the craft bible)
- episodes/002-2026-w47/
- episodes/002-2026-w47/production/inherited/ (only what the plan carries forward)
- packages/show/README.md, packages/show/tools/README.md, packages/show/reference/ (a working example of a segment), packages/show/templates/
- packages/show/src/ (the studio, to read)

## Do not read

Writers, researchers and builders never see what the show has already done; reviewers do, which is how repetition is caught. Do not open:

- docs/ledger/ (the ledger)
- episodes/001-pilot/
- dist/episodes/ (every build)
- preview/ and shots/ of other episodes
- earlier episodes through git (git show, git log -p, other branches such as draft/*)
- reactions to earlier episodes ("About the show" in the digest): those are evidence for reviewers

## The task

Write episodes/002-2026-w47/segments/made-mobius-chess-ringmate/index.js against the rendered cues.json (packages/show/README.md, "Authoring a segment"). Start from packages/show/templates/segment/index.js.

Helpers and props for this segment go in segments/made-mobius-chess-ringmate/ and are imported as @late-cluster/episode/segments/made-mobius-chess-ringmate/<file>.js; studio code as @late-cluster/show/<path>. Never import from another segment or from production/.

A real post on screen shows its exact text (production/sources.json) with display name, handle, date and counts. Nothing longer than a glance is on screen unless it is spoken in the segment.

Shoot and look at your frames: `npm run shoot -- 002-2026-w47 made-mobius-chess-ringmate <t>…`. Check only your segment: `npm run produce -- --week 2026-W47 --check stage --segment made-mobius-chess-ringmate`.

The episode's one experiment is in episodes/002-2026-w47/production/experiment.md. Where it touches your work, run it; it is judged at review against its measure.

Do not change the script, the cues or what a real person is shown saying.

## Sent back to you

The previous output failed these checks. Fix every one, editing your file in place:

- sent back from stage: made-pen-plotter-replies: put the date on the five reply cards. They show a time only ("20:18 UTC"); every real card carries its date. Write "14 Nov" with the time, as the invitation's and austin's cards do.; made-pen-plotter-replies: give the line above each reply card (REPLYING TO @…, date and time) a black fill, or move it inside the card. Over the bare set it cannot be read.; made-pen-plotter-replies: redraw "88 REPLIES · 1 PEN" as a level tag in the segment's own count style (the box used for OW × n), not with the kit's stamp, and bring "1 PEN" on with Larry's word "pen" (21.1 s) instead of with the cue. It is a count and not a verdict, but it is a stamp carrying the line's punch words, and it shows them 3.7 s before he says them. One stamp is not a repeat; it is a mark the show has leaned on before, and this picture does not need it.; made-pen-plotter-replies: move "300 OF 300" out of the top-left corner and set it beside the row it counts, as the script's comment has it ("beside the page"). It is not a repeat: it counts once and is no tally. But the show has kept a running count in that corner before, and this one should not sit there. The number itself, and its landing on "hundred", stay.; made-pen-plotter-replies: move the STUDIO SKETCH tag off the page's first handle in the room shot with the guest (22.1 to 34.2 s).; top-chicken: "201 ÷ 6,186 = 3.2 %" is up for half a second. Hold it for two seconds or more (it can stay over the crowns), or leave it out.; top-chicken: bring "RESULTS FROM 2 OCT – 12 NOV" up to the weight of the line above it, or fold the dates into that line. Without it "42 FETCHED RESULTS" can be taken for this week's results, which the screen's ruling keeps off the screen.; top-chicken: while the counter rolls from 2,648 to 1 (12.7 to 13.5 s), draw no unit under it; POSTS under a moving number makes every frame a false count, one of them 201. The label returns as WINNER when it lands.; made-polyhedral-coffee-simulator: Dave's card must show the post as posted: "best i can do", "polyhedral coffee simulator", and the address on its row, with no ellipsis. The caption keeps the script's ellipsis, which marks what is spoken; the card shows the whole post, so it marks nothing.; made-polyhedral-coffee-simulator: Amber's collar must not cover the puppet's mouth while it speaks. The costume is in the episode's looks.js, which a segment builder's brief does not let them write: the project manager either lets this builder change that one entry (same pink, a costume whose collar sits below the chin) or sends it to assembly. A change of pose in index.js that clears the mouth would also do.; made-polyhedral-coffee-simulator: move the label ICOSAHEDRON · 20 FACES clear of the solid above it.; music: make "THE PLAN · THE BAND'S OWN TUNE" readable: out of the audience row and the caption band, at the weight of the other labels on the stage.; made-mobius-chess-ringmate: in the stretch the gold must never appear to go backwards. It does twice: at 46.0 s, when the view turns see-through and the first lap's gold drops to a dashed outline over blue; and at 50.6 s, when the view comes back above the board and the squares between the twist and Larry's seat, gold a moment before, are blue until the flag crosses them. Gold that has been laid must stay plainly gold in both views, and the picture of both faces gold must hold long enough to take in before the laugh; it is in full for a third of a second.; made-mobius-chess-ringmate: while the flag hangs under Larry's seat (46.4 to 47.4 s), take his name flag out of the way; the two overlap.; made-mobius-chess-ringmate: give Larry's three lamps a black fill or move them off his jacket; REPOST loses its last letter in the lapel on the episode's final picture.; made-mobius-chess-ringmate: end the caption hold for the line "awesome" when Larry starts "Meaning you only like…", so his question is captioned from its first word.; End card (the studio's built-in roll, packages/show/src/show/builtins.js; no segment builder's file): take out the two lines that begin "No accounts were…". Kind: joke. What it repeats: a line of the credits the show has already aired, word for word. A turn: not open this episode. Everything the constitution requires of the roll is there and stays.; For the final review. Sound: nobody has heard any of it, the three stretches and Sibyl's intoned meow included. The interview's hold on the label is the episode's one joke about the show: watch it in motion with sound, and weigh the close's four lines beside it. The experiment's second question: give each stretch to a cold viewer; the plotter and the coffee should hold, the chess only after its change. The plotter: how much of one account it carries (four cards, three read aloud, the name said three times), and three counts in one segment. Top Chicken: the row of three crowns can be taken for the week's whole field, though nothing says so; "Saturday" over a post dated 13 Nov; the card "Reply to @7778777.online" answers that account's second post in the thread, one minute after the one read before it; the spoken "cee" for the written "cee.wtf"; the sports desk and the crowned emblem that opens the segment come from the studio's kit, and the final review judges whether the segment reads as newly built. The coffee and chess segments: names and emoji are drawn by the viewer's own fonts, so look on a second device; the maker's display name looks provisional and must be read again from the profile at build. The title card (built-in): its episode line runs under Larry's mug and jacket and the date is crossed. The live pass the consent check still owes: every post still there and unchanged, and the counts at build.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: read it, never change it.
- Real people: their own words, in their own context; nothing invented; the opt-out list is absolute. When in doubt, leave it out and say so.
- You work alone, from this brief and the files it names. Nobody will answer questions. When you finish, reply with two or three sentences: what you wrote, and anything the next stage should know.
