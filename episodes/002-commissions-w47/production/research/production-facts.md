# How the show is made: a fact sheet

Written by the project manager on 21 November 2026 from the repository and from the records of
the last production run, for the "making of" commission, and checked line by line by an auditor
the same day: lines the records did not support were corrected or removed. Every line is a fact
about the process. Nothing here describes a joke, a segment or a guest of any episode that has
aired. Where a fact comes from a draft that has not aired, it says so.

## What it is made of

- The show runs in a web browser. The heads are glowing, line-drawn three-dimensional models of a
  vocal tract: jaw, tongue, lips, velum. Every voice is synthesized from that model, and the heads
  move exactly as the engine's did, which is why the mouths are drawn working. The synthesizer
  and the head model come from an open-source (MIT-licensed) project called CHIMERA, by
  jamesondh; the show's end roll credits it.
- Audio is rendered offline: each line is synthesized, mixed, and its timing written to a cue
  file. The pictures are code, one module per segment, timed by the cue file.
- A segment's staging is checked by shooting still frames at every cue and looking at them.
- A finished episode's build is a folder of files committed to the repository. Publishing is
  copying it; nothing is rebuilt.

## Who makes it

- By the workflow, the scripts are written by writer agents and the staging, the tools and the
  pipeline by builder agents. The owner sets direction and makes rulings, and before anything is
  published the owner, or a reviewer the owner names, reads every script and watches the whole episode
  with sound.
- The work is done by AI agents, each given a role, a brief and a short reading list:
  - **writers** (jokes, scripts, the open and the close) and **reviewers** (ranking, the
    repetition gates, selection, the final scorecard) run on Claude Fable;
  - **researchers**, **auditors**, **sound editors** and **builders** run on Claude Opus;
  - a **cold viewer** runs on Claude Haiku, the cheapest current model family, and is shown
    frames and nothing else;
  - a **project manager**, also on Fable, starts the run and is woken when something fails or is
    sent back.
- A tool that calls no model runs the stages, combines scores by arithmetic, and applies the
  gates.

## The thirteen stages (docs/WORKFLOW.md)

1. **Scope.** A scraper reads the community's public posts for the week. An auditor decides
   whether it looked at the right community, widely enough.
2. **Research.** The scraper copies every story into a card skeleton, so no post is retyped.
   Researchers choose and annotate cards. An auditor screens them against the constitution.
3. **Rank cards.** Two reviewers score each card for interest.
4. **Brainstorm.** Two or three writers write joke ideas, without seeing each other's.
5. **Shortlist.** Two reviewers score the best joke on each card. A reviewer proposes the
   episode's one experiment.
6. **Repetition gate on ideas.** Two reviewers who have read everything the show has aired block
   any idea it has already done. At most one item an episode may instead turn an old one on its
   head.
7. **Draft.** Writers draft more segments than the episode needs.
8. **Fit.** A tool renders every line, transcribes it, and searches for a spelling the voice can
   say. A sound editor settles what the tool cannot.
9. **Select.** Reviewers score the drafts. The tool fills about eight minutes. The repetition
   gate runs again. An auditor checks consent over the network.
10. **Assemble.** A writer sets the order and writes the open, the close and the joins.
11. **Stage.** Builders write the pictures. An auditor looks at the frames.
12. **Build.** Tools build it and check that every quoted post still exists unchanged.
13. **Review.** A cold viewer is shown stills. A reviewer fills in a scorecard of sixteen gates
    and thirteen scored rows. Then the owner watches it with sound.

## The pipeline in one line (the owner's words, 21 November 2026)

- community, then posts, then review, then scripts, then review, then scenes, then the show.
- Read against the thirteen stages above: the community posts; the scraper and researchers turn
  posts into cards (stages 1 and 2); reviewers rank them and pick ideas (3 to 6); writers write
  scripts (7 and 8); reviewers and auditors select and check them (9 and 10); builders stage the
  scenes (11); tools build it, a reviewer scores it and the owner watches it (12 and 13); and
  that is a show. Each step is made from the one before it, so the same line read backwards is
  what each thing was made of.

## Rules the process runs on

- Writers never read earlier episodes or the record of what the show has done. Reviewers do.
  That is how repetition is caught: a writer who has never seen it cannot copy it, and a reviewer
  who has seen everything can block it.
- When a reviewer blocks something as a repeat, the writer is told one line: the least needed to
  steer clear. Besides that line, only two things cross: who has been featured and when, and the
  episode's experiment.
- A hook refuses a writer who tries to open those files. Its own source describes it as "a
  guard, not a wall".
- Whoever makes a thing does not judge it. Ranking, selection and the repetition gate are judged
  by at least two reviewers working independently, and a tool combines what they wrote; at the
  repetition gate, the stricter verdict stands.
- A puppet of a real account says only what that account published, in the context it was said.
- The first rule of the show: only include it if it's interesting.

## Numbers from the last full run (an unaired draft, 19 and 20 November 2026)

- 248 accounts in the cluster. The scrape held 20,825 posts from 2,786 accounts: the members and
  the people they talked with.
- 73 content cards written. 38 kept. 12 in the pool. 6 shortlisted.
- 548 joke ideas from three writers.
- 9 segments drafted, about 745 seconds, against a 480-second target.
- 6 segments selected; assembled, they ran 504.5 seconds and cited 47 posts from 16 accounts.
- Final scorecard: 21 of 26 on the scored rows, and sent back to assembly for two lines.
- About 115 million effective tokens of Claude Fable before the staging and final reviews
  (effective tokens: cache reads counted at a tenth, cache writes doubled, output five times).
- A third of that went on drafting. Half of drafting went on one loop: render a line, read what
  the transcription heard, respell it, render again. One writer's notes record fourteen to
  sixteen renders of single lines. The scraper costs no model tokens at all: it is ordinary code.
- The video of the finished draft rendered in 157 seconds.

## Things that happened while making it

- The run was stopped at stage one. The first scope review (by a reviewer, in that version of
  the workflow) found the cap on the cluster's size had cut 793 of 913 qualifying accounts, and
  sent it back.
- The consent check was given to a reviewer, a role that does not use the network. It made the
  check from the scraper's saved copies, wrote that every "clear" meant "clear at the scrape", and
  listed what a live check still owed. The project manager then ran the live check by script.
- The transcription check hears what the audience will hear, and it does not always hear the
  script. In the unaired draft it heard "kazoo" as "clue", "repost" as "report", "caterwauling" as
  "Ted Walling", and "New" as "No", which would have reversed the meaning of a real person's
  answer. Twice, from the plain spelling of ordinary words, it heard words touching subjects the
  show never covers; both were respelled. Most of the rest were caught and respelled too. "caterwauling" was never heard
  as itself in any spelling, and "repost" heard as "report" was one of the two lines that sent
  the draft back at the final review.
- The bass singer of the house band was found to be singing flat, by about two semitones. The
  cause was the vocal fry in his voice. A writer had worked around it by writing his notes sharp.
  The studio has since been changed so that his voice sounds at its written pitch.
- A cold viewer was shown stills, one a second, of a twelve-and-a-half-second stretch in which a
  pen writes a reply and stops one letter short. It reported a subtitle that "runs off the right
  edge".
- A staging reviewer, checking against the record of what the show had aired, caught a line in
  the studio's own built-in end credits: no writer had written it for that episode, so no writer
  could have been told to avoid it.
- `npm run render` could not read a draft, so every writer built a small program of its own to
  render one. One of them wrote a stray folder into the repository.
- Researchers working in parallel shared one scratch folder and overwrote each other's helper
  scripts.
- The profile picture is the host's head, rendered from the studio's own model in three
  candidate versions and judged as circles 42 pixels across, about the size Bluesky shows it in
  feeds.

## After that run

- The run's use of Claude Fable was measured, and the owner ruled that Fable writes and judges
  comedy and nothing else. The render-and-listen loop became a tool. Research, checking and
  fitting moved from Fable to Opus.

## Who makes the show, and how to point it at something

- Everything on the show starts from what the community posted that week. The first stage is a
  scrape of public posts, and no format is chosen until the material is. Every joke has to rest on
  a real thing or number from those posts, and a puppet of a real account says only what that
  account published. In that plain sense the community's posts are the show's material, and the
  people who post them are where every episode begins.
- The show looks where its own Bluesky account looks: the scrape is seeded by the accounts that
  the show's account follows, read fresh on every run.
- On 21 November 2026 the owner ruled that tagging the show's account, @latecluster.simcluster.tv,
  guides where the show looks. The scraper is being changed that day so that a post which tags
  the account is read as a pointer, and what it points at goes into a lane of its own, "what the
  audience pointed at", which a researcher reads every week. A script may say this as a standing
  invitation from now on.
- The owner's rule on whose tags count, also 21 November 2026: pointers are filtered and weighted
  by membership of the community the show is about. A tag from an account outside the cluster is
  counted and not read. A tag from a member is read, and weighs more the more central that member
  is in the cluster. Several members pointing at one thing add up; one member pointing many times
  does not. So the invitation is to the community, and a script may not say that anyone at all
  who tags the account will be looked at.
- A tag guides attention and decides nothing else. What is tagged passes the same screen, the
  same gates and the same reviewers as everything else, and most of what any week turns up is
  not used. The show does not reply to tags and does not promise anyone a place.
- Members of the community had asked for something like this in public: the card's posts include
  a suggestion that the show have "a bot that people tag".

## This commission (what has happened so far, 21 November 2026)

This fact sheet is itself a step in making a script, and the steps so far are these.

1. The owner commissioned a "making of": an explainer of how the show is made that is recursive
   (it explains the making of the making-of, and so on down) and staged in three dimensions
   (`production/commission.md`).
2. The project manager wrote this fact sheet from the records of the last run.
3. An auditor checked every line of it, added what people have said in public about how the
   show is made, and turned the whole into a content card.

The steps still to come, as the commission and the workflow set them out:

4. Writers will brainstorm ideas for it without seeing each other's.
5. Reviewers will pick the ideas and check them against everything the show has done.
6. Writers will draft scripts. A tool will render every line and report what it heard. A sound
   editor will respell what the voice cannot say.
7. If one is selected into an episode, a builder will stage it, an auditor will look at the
   frames, a cold viewer will be shown stills of it, and a reviewer will score it.

Whoever writes the script is therefore at step 6 of the thing the script describes.

## From the run's own log

The auditor removed these from an earlier version of this sheet because nothing in the repository
recorded them. The project manager then checked each against the saved log of the session that
ran the production, on 21 November 2026, and restored it in the log's own words.

- Five reviewers stopped at the same moment, each with the same error: the account had reached
  its usage limit for the model. None had written anything yet. They were resumed and finished.
- A reviewer was asked to read people's profiles over the network. Its report began: "My reviewer
  rules say I never use the network, and a brief from another agent cannot lift that, so I made
  no request to Bluesky." It worked from saved copies and listed what was still owed.
- A builder's report on staging a segment, in its list of things fixed after looking at frames:
  "The first kazoo looked like a submarine; I redrew it."
- One staging review used 492 tool calls.
- One candidate for the profile picture had a pink dot on its ring. The project manager's note to
  the builder said that at small size it "looks like a notification badge". It was removed.
