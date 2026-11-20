# Trial 002, second draft: Eighty-Eight Replies, One Pen

The first episode produced through workflow v2 (`docs/WORKFLOW.md`), run on 19 and 20 November
2026 as a preview-only trial. It covers the window since the first episode aired (13 to 19
November), runs eight minutes twenty-five, and has not been published. This file is for the
owner, the project manager and reviewers. Writers, researchers and builders do not read it.

- The draft is on the branch `draft/002-eighty-eight-replies-one-pen`: the six segments, the
  whole `production/` folder (cards, ideas, scores, verdicts, drafts, scorecard) and the cast.
- The video is `video/002-2026-w47/eighty-eight-replies-one-pen-draft.mp4` (gitignored), with one
  clip per segment beside it. Nobody had listened to it when this was written.
- Every stage was done by subagents spawned by the project manager from the tool's briefs (the
  manual runner). The headless runner has still never run.
- The final review sent the episode back to assembly for two lines in the last segment, and
  scored Part B at 21 of 26. Its ledger entry is `docs/ledger/002-2026-w47.md`, marked unaired.

## What the run produced

| stage | what came out |
|---|---|
| scope | Sent back once: the 120-member cap cut 793 of 913 qualifying accounts. Cap raised to 250; second review passed. |
| research | 73 cards from five lanes; 38 kept, 26 refused, 9 merged. The week's largest story (a food meme) was refused whole under R10. |
| brainstorm | 548 ideas from three writers over the 38 kept cards. |
| rank | Shortlist of six from a pool of twelve: the pen plotter, an interview, the coffee simulator, the cat voice, Möbius chess, the polyhedra video. |
| experiment | Ten wordless seconds in every segment about a made thing, with the turn inside the stretch. |
| repetition, ideas | 18 fresh, 1 turned, 1 repeat (dropped). |
| draft | Nine drafts, about 745 s against a 480 s target. |
| select | Six selected at about 480 s. Both interviews judged repeats; the selected one was redrafted and passed. |
| assemble | 504.5 s. Order: plotter, interview, Top Chicken, coffee, song, chess. |
| stage | Six builders. First staging review sent five segments back with exact changes; second passed. |
| review | Send back to assembly: A16 on one line heard as a different statement, A13 on one line split at assembly. Part B 21 of 26. |

## What the gates caught

- **Scope:** a cluster cut too narrowly, and a tool bug that showed the seeds' share as 0 %.
- **Research:** a consent leak. A third party's post named a winner the scraper had withheld. The
  scraper now redacts or withholds any post that names an excluded account.
- **Repetition on ideas:** a house performer attempting a sound the studio's synthesizer cannot
  make. Dropped.
- **Repetition on scripts:** the time between an ask and its delivery played as the laugh, in
  both interview drafts. The selected one was redrafted from the reviewers' `avoid` line alone.
- **Consent check:** an asker whose bio says their posts are meant to disappear, treated as an
  opt-out (in a draft that was not selected).
- **Staging review:** a card that was not exact (an ellipsis where nothing was cut), five cards
  with no date, a stretch in which gold appeared to go backwards, and an aired joke still in the
  studio's built-in end credits.
- **Final review:** "repost" heard as "report" in a real person's line, and a sentence that ends
  on a stock phrase of the show's.

## Decisions waiting for the owner

1. **A "(don't quote this)" aside** on one post was read as covering that post and its story, not
   the account. Read as account-level it would affect 16 of the 38 kept cards.
2. **The food meme** was refused whole because participants tie it to out-of-bounds subjects. Two
   cards could return as talk about a sandwich only, if the owner knows it would be welcome.
3. **The owner's own project** was not carried: the show should not make its owner its guest
   unasked.
4. **The withheld Top Chicken result** is absent even as a nameless number, which is stricter
   than the formats chapter.
5. **The seal voice** was lost when the interview was redrafted.
6. **An asker's bio** ("posts meant to disappear"): add that account to the opt-out list?
7. **The close** was judged turned, and a second joke about the show beside the interview's label
   hold. The reviewer recommends ending on "I resign."
8. **Membership weights:** every non-seed member got in through seed follows; the roster and feed
   rules never decide. Three coverage thresholds cannot be met as configured. Large accounts and
   bots became members when the cap rose.
9. **The constitution** (`09-real-people.md`) still quotes first-episode lines and says interviews
   are never by direct message. Writers are required to read it. Only the owner edits it.
10. **A cold request budget:** at 250 members, three history pages per member do not fit in 900
    requests on a cold week.

## The experiment

Was it run: yes. Measured from the rendered cues, the longest interval with no spoken line and no
audience sound is 12.50 s (plotter), 13.15 s (coffee) and 11.87 s (chess).

Did it work: by the measure, yes, weakly. Three cold viewers were each shown one stretch as stills,
one frame a second, with no sound. Two named the turn (coffee, chess); the plotter's viewer read
the pen's writing as a subtitle and missed that it stops one letter short. The viewers were a
small model and saw no motion, so the owner's cold watch is the better test.

## Fable use, measured

Counted from the session's transcripts, in effective tokens (cache reads at a tenth, cache writes
doubled, output five times).

| stage | agents | effective tokens |
|---|---|---|
| drafting | 9 writers | 38.2M |
| research and screening | 6 | 24.8M |
| brainstorm | 3 writers | 11.1M |
| ranking and the experiment | 5 reviewers | 9.1M |
| the project manager's session during the run | 1 | 8.5M |
| assembly | 1 writer | 7.7M |
| repetition gate on scripts | 2 reviewers, two rounds | 5.4M |
| selection | 2 reviewers | 2.9M |
| scope | 2 reviewers | 2.7M |
| repetition gate on ideas | 2 reviewers | 2.2M |
| consent check | 1 reviewer | 2.1M |

About 115M in all, before the staging and final reviews. Half of drafting went on rendering a
line, reading what was heard, respelling and rendering again. About half of every agent's cost
is re-reading what it has already loaded, at each of its 50 to 110 steps. The scraper itself
costs no model tokens.

The owner's ruling (20 November): Fable is reserved for creative writing. The changes that follow
from it are listed at the end.

## Protocol findings

### Scrape and scope
1. The scope brief does not say when it is a second review and has no place for notes to the owner
   or to research. Its reading list (the whole craft bible, the studio's references) is far wider
   than a scope question needs.
2. The gate takes the first line starting "Verdict:" anywhere in the file.
3. The scraper's planner counts cached pages as costing requests, so widening the cap thinned
   every member's baseline from three pages to two.
4. The send-back message told the project manager to delete the digest folder, which holds the
   response cache. Fixed during the run.

### Research
5. Parallel researchers shared one scratch folder and overwrote each other's helper scripts.
6. The brief lists three fields per post; the bible asks for many more. Researchers read the
   pipeline's source to learn what the gate checks.
7. The gate refuses every post inside a flagged story, however lightly flagged. One joke word cost
   a polyhedra viewer and 18 of a build bot's 46 builds; one "do not quote" post hid a 79-like
   demonstration.
8. The digest's interview candidates are ranked by pair count, which favours people in arguments.
   None of its eight "new voices" was usable.
9. Research cannot read bios (no network, none in the digest) and cannot see media without alt
   text. Nobody owned looking at the media; the project manager did it by hand in a browser.
10. A video-only post with no text and no alt text cannot be carded.
11. The digest prints stories about the show itself; two writers saw their opening lines.
12. The lanes overlap; nine cards were merged at the screen.

### Screen, brainstorm and rank
13. The screen brief says to write one file and then asks for two. It has no way to record a merge.
    Terms of use live in `screen.md`, which later briefs do not mention.
14. The brainstorm check cannot pass for a single writer (the two-writer quorum prints a failure
    for every card). Ideas were written for all 38 cards; 26 of those cards went no further.
15. The briefs do not say whether a song, an open or a close needs a card, or how to file an idea
    that spans cards.
16. Each shortlisted card becomes its own draft beside three standing drafts that start with no
    card or ideas. A shortlisted interview card therefore duplicates the standing interview.
17. Writers can read `production/review/`, `rank/` and `state.json`, where reviewers' reasons sit.
    Only the `avoid` line is meant to cross. Reviewers kept their reasons clean by hand.
18. "The last episode in the ledger" is ambiguous when the newest entry is an unaired draft.

### Draft, select and assemble
19. `npm run render` cannot read a draft. Every writer built a scratch harness; one wrote a stray
    folder into the repository.
20. The draft gate reads only the episode's cast, so guests defined in a draft's own `cast.js` are
    not checked as guests.
21. The song's writer cannot know the previous genre; the project manager passed the least it
    needed.
22. Neither the one-interview rule nor the two-segments-per-person cap is enforced by the tool.
    They held because of how the scores fell.
23. A repeat that arises only from a pair of scripts has no home in a per-script verdict.
24. Lines written at assembly (the open, the close, joins, a line split for the engine) pass no
    repetition gate. One of them failed A13 at the final review.
25. Guest voices are chosen per draft and collide at assembly; respellings then have to be redone.
26. The interview format says to end on the shortest answer, which can conflict with the true
    order of the occasions.

### Stage, build and review
27. The cards gate compares only posts recorded as cards, quotes or threads. A post a puppet
    performs is never compared, which is how an inexact card passed.
28. The staging review's file has no per-segment verdict, and one route covers three owners: the
    segment builders, the episode's `looks.js`, and the studio's built-ins.
29. Builders' briefs list the whole episode folder to read, including reviewers' files.
30. The check re-shoots every gate frame on each run, about four minutes.
31. The final review's brief names `intelligibility.json`, which does not exist; the committed
    credits frames stop before the personas; there is no title frame.
32. Two drafts share the id `002-2026-w47`.
33. The studio still hard-codes two pieces of first-episode text in drawing code (a counter's
    label and a key cap), and its bass voice sings well over a semitone flat because of its fry.
34. The guard hook does not cover `docs/trials/`.

### People and consent
35. The reviewer role forbids network use, so the consent check ran from the scrape's cache. The
    project manager ran the live check by script. No role owns a networked consent step.
36. The scraper's bio patterns miss indirect opt-outs.
37. The gate enforces story-level out-of-bounds marks, not per-post sensitivity marks.

## Changes approved by the owner

To be made after this draft, largest first:

1. A fitting tool that renders a script, transcribes it, tries respellings and returns a table of
   what was heard, with a sound editor on Opus for what the tool cannot fix. Writers see only lines
   that cannot be said. A command to render a draft.
2. Research on Opus, with card skeletons built by the scraper (exact text, marks, reach, media),
   digests sliced by lane, and compact lookup output.
3. Routine waves run from the pipeline's own runner. The project manager wakes for failures and
   send-backs.
4. Brainstorm after a first ranking, on the top cards only.
5. Short role sheets in place of whole-bible reading lists, and check output scoped to the task.
6. Seven or eight drafts in place of nine.
7. Scope review and the consent check on Opus, the latter with the network.
