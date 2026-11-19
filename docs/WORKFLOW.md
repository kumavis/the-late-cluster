# Workflow: making an episode

How one episode goes from "what did the community post" to a build the owner can watch.
This is the contract for the pipeline in `packages/writers-room`, for the scraper's digest,
and for every agent that works on an episode. It replaces the first protocol, whose trial is
recorded in `docs/trials/002-the-joke-nobody-built.md`. If you change a stage, a file or a
rule named here, change this document in the same commit.

## What the first trial taught us

The first protocol forbade writers to read the pilot's source and still produced an episode
that repeated the pilot: the same runner, the same guests, the same closing shape. The
repetition did not travel through source files. It was written into the instructions: a
bible that described the pilot in detail and called its devices "the frame", gates that
required those devices, a scraper seeded with the pilot's guests, and a retro that opened
each pitch with what people had liked last time.

So this workflow is built on three ideas.

1. **Start from the community, not from the show.** The first stages are research: what
   happened, how far it travelled, who was involved. No format is chosen until the material is.
2. **Generate more than is needed, then select.** Many joke ideas per piece of content, more
   drafted segments than slots. Ranking and selection are done by reviewers who did not write
   the thing they judge.
3. **Writers do not see what the show has already done. Reviewers do.** A reviewer who can
   read every earlier script blocks repetition. A writer who has never read them cannot copy.

## Roles and models

Everything is done by subagents, driven by one project manager.

| role | model | does | never |
|---|---|---|---|
| **Project manager** | latest Fable | drives the stages, briefs subagents, checks each hand-off, decides when a stage is done | writes episode content, or reviews work it wrote the brief for without a reviewer |
| **Researcher** | latest Fable | finds and documents content from the community | proposes jokes |
| **Writer** | latest Fable | brainstorms jokes, drafts segments, assembles the scripts | reads earlier episodes or the ledger; scores or selects its own work |
| **Reviewer** | latest Fable | ranks, runs the review gates, scores, selects | rewrites what it reviews (it sends back with reasons) |
| **Builder** | latest Opus | stages segments in code, runs the tools, maintains the pipeline, scraper and studio | changes scripts or what a real person is shown saying |

"Latest" means the newest model in that family at the time of the run. As of November 2026
that is `claude-fable-5-2` and `claude-opus-5-5`. The subagent definitions in
`.claude/agents/` carry the model for each role, so a role is chosen by name and its model
follows.

A reviewer is always a different subagent from the one whose work it reviews, and judgements
that decide what goes forward (ranking, selection, the repetition gate) are made by at least
two reviewers working independently, then combined by a tool.

## Who may read what

| | constitution and craft bible | this episode's research and drafts | the ledger and earlier episodes |
|---|---|---|---|
| Researcher | yes | yes | no |
| Writer | yes | yes | **no** |
| Builder | yes | yes | no, except files the plan names to carry forward |
| Reviewer | yes | yes | **yes** |
| Project manager | yes | yes | yes |

**The ledger** (`docs/ledger/`) is the record of what the show has already done: every aired
or drafted joke, runner, format, guest, account shown on a card, song genre and staging
device, by episode. It includes **the tracker**, `docs/ledger/featured.json`: who was
featured when, keyed by DID with the handle as last seen, one entry per appearance giving
the episode, the date, and whether the person's puppet spoke or their post was shown. It is written by reviewers after each episode and read only by reviewers
and the project manager. The writer-facing bible must not catalogue it: craft is taught there
by principle and by examples that are not from the show's own episodes.

## Stages

Each stage reads the previous stage's files and writes its own under
`episodes/<id>/production/`, so a run can stop, be inspected, and resume. A stage marked
**blocks** cannot be passed by the tool until its condition holds.

| # | stage | done by | writes | blocks until |
|---|---|---|---|---|
| 1 | **scope** | tool, then 1 reviewer | the digest in `data/`; `scope/coverage.md`; `scope/review.md` | a reviewer agrees the scrape draws on the right community, widely enough |
| 2 | **research** | 3 to 5 researchers in parallel, one lane each; then 1 reviewer | `research/cards/*.json`, `research/longlist.json`, `research/screen.md` | every card is sourced and passes the constitution screen |
| 3 | **brainstorm** | 3 or more writers in parallel, independently | `brainstorm/ideas.jsonl` | every card on the longlist has ideas from at least two writers |
| 4 | **rank** | tool for reach; 2 or more reviewers for judgement; tool combines | `rank/scores.json`, `rank/shortlist.md` | scores exist from two reviewers for every card |
| 5 | **repetition gate (ideas)** | 2 reviewers with the ledger | `review/repetition-ideas.json` | no shortlisted idea is a repeat |
| 6 | **draft** | writers in parallel, one segment each | `drafts/<slug>/script.js` and notes | more drafted running time than the target, and every standing segment has a draft |
| 7 | **select** | 2 or more reviewers; tool combines; **repetition gate (scripts)** | `select/scores.json`, `review/repetition-scripts.json`, `plan.json` | no selected script repeats, and the rundown fits |
| 8 | **assemble** | 1 writer, then tools | final `segments/*/script.js`, `sources.json`, audio | scripts validate and render; the real-people, heard-text and unread-text gates pass |
| 9 | **stage** | builders in parallel, one segment each; then 1 reviewer on the frames | `segments/*/index.js`, frames | frames render clean and the reviewer finds nothing unreadable or unperformed |
| 10 | **build** | tools | thumbnail, preview or published build | the build and `verify` pass |
| 11 | **review** | 1 reviewer | `scorecard.md`, ledger entries, the pull request text | nothing; a send-back is a valid result and routes to the stage that can fix it |

Then the owner watches the whole episode with sound. Nothing is published without that.

### 1. Scope: are we looking at the right community, widely enough?

The scraper writes the digest for the window, which by default runs from the previous
episode's air date to now. Alongside it the tool writes a coverage report: how each account
came to be in the cluster, how concentrated the material is (the share of posts and of
candidate stories from the ten most active accounts, from the seed accounts, and from people
the show has featured before), who is new this window, how the cluster compares with
independent signs of the community such as the Top Chicken roster and community feeds, and
what was excluded and why, in counts.

A reviewer reads it and answers three questions in `scope/review.md`: is this the community
the show is about; is it wide enough that the episode will not be about the same few people;
is anything obviously missing. If not, the project manager changes the scraper's
configuration and runs it again.

**Seeds.** The community is carved out from seed accounts, and the seeds are whoever the
show's own Bluesky account follows, read fresh on every run, together with a small list kept
in the scraper's configuration. The owner widens or moves the area by following people from
the show's account. Seeds are recorded by DID, never by handle alone, because handles
change. People the show has featured may be seeds: being a seed decides where the show
looks, not who it puts on screen. What keeps the same people from appearing too often is
the tracker below and the repetition gate.

### 2. Research: what is there to work with?

Researchers work in parallel, one lane each, so the longlist is wide: things that got made
and shown; conversations and running bits; the community's games and numbers; new and
smaller voices; and interview candidates. Each writes **content cards**. A card says what
happened in neutral words, lists the posts with their addresses and exact text, names who
was involved with their follower counts, carries the tool's reach figures, and notes
anything sensitive. A card contains no jokes.

**Reach** stands in for "how many people saw it", which Bluesky does not publish. The tool
computes it from likes, reposts, quotes, replies and the number of distinct accounts that
took part, and says so wherever it is shown.

A reviewer then screens the longlist against the constitution: out-of-bounds subjects,
opted-out accounts, small accounts who would not come off well, anything that cannot be used
in its own context. Removed cards stay in the file with the reason.

### 3. Brainstorm: what is funny about it?

At least three writers work independently over the whole longlist and write joke ideas for
each card: the premise in a line or two, the turn, what lands on screen, which format might
carry it, and whose real words it would use. Quantity matters more than polish here, and
independence matters more than agreement: writers do not see each other's ideas.

### 4. Rank: what is worth an episode?

Three numbers per card, then a second pass.

- **Reach**, from the tool.
- **Interest**, from reviewers, by the constitution's interesting test.
- **Best joke**, from reviewers: the strength of the strongest idea for that card, named.

The tool combines them with weights kept in configuration and lists the top cards. Reviewers
then make a second pass over that list for what a single score cannot see: **synergy** (do
two cards make each other better, is there a through-line) and **variety** (different
people, different subjects, different kinds of comedy, and different from the last episode).
The result is a shortlist with the ideas chosen for each card.

### 5 and 7. The repetition gate

**A joke the show has already done is blocked.** Two reviewers, with the ledger and the
earlier scripts in front of them, give every shortlisted idea, and later every selected
script, one of three verdicts.

- **fresh**: not done before.
- **turned**: it takes something the show did and turns it on its head, by inverting the
  expectation it set up or by making fun of the joke itself. Allowed. The verdict says what
  is turned and how.
- **repeat**: the same joke, runner, catchphrase, device or shape as before. Blocked.

The gate covers jokes, runners and catchphrases, the shape of a segment, staging devices,
and people: a guest who spoke in the previous episode does not speak in this one, and the
accounts featured on screen must be mostly new. Beyond the previous episode, the tool reads
the tracker and warns when someone has been featured in more than a set share of recent
episodes, so that reviewers weigh it in the variety pass; fresh people are preferred, and
nobody is barred for having appeared before. At most one **turned** item per episode
carries anything forward from the previous one. When reviewers disagree, the stricter
verdict stands. A blocked item goes back to a writer with only as much description of the
earlier joke as is needed to avoid it or turn it.

### 6. Draft and select

Writers draft segments for the top picks, one writer per segment, and draft more than the
episode needs, so that selection is a real choice. Three segments are drafted every week:

- **The interview**: one community member, constructed for now from their public posts.
  Every answer is a real post, and every question recreates what that post was actually
  replying to, so nothing is made to answer a question it was not answering. Not someone who
  appeared in the previous episode.
- **Top Chicken**: the window's results with enough of the game around them to be a
  segment: the standings, the record and who is near it, streaks, and the show's own
  speculation about what happens next, plainly offered as speculation.
- **Music**: a genre the show has not just used, on a theme from the window.

Reviewers score every draft: is it funny, is it interesting, **does it work as television**,
does it add variety. The tool combines the scores, the repetition gate runs on the scripts,
and the selected drafts become the rundown. The target is about eight minutes and the
ceiling is ten. Standing segments are drafted every week but are still selected on merit:
the first rule of the show, only include it if it's interesting, applies to them too.

**Television** means nothing is put on screen for the viewer to read in silence. A post that
is shown is performed or read aloud, or it is short enough to take in at a glance.

### 8 to 11. Assemble, stage, build, review

One writer assembles the selected drafts into an episode: the order, the open and the
close, the joins. Tools render the audio, and three gates run on the result in addition to
the earlier ones: every line spoken by a real account's puppet is exact and in its own
context; nothing in what the transcription **heard** is offensive, alarming or says
something about a real person that the script does not; and no card carries more unspoken
text than a glance can take in.

Builders stage the segments in parallel and a reviewer looks at the frames. The tools build
a preview. A reviewer fills in the scorecard and writes the episode into the ledger. A
send-back at any review is a valid result: it names the stage that can fix it, and the run
returns there.

## What carries forward from one episode to the next

Deliberately little. The constitution. The house cast and the studio, kept for now by the
owner's choice. The craft bible, which an episode may amend. Everything else an episode did
goes into the ledger, which exists so that it is not done again.
