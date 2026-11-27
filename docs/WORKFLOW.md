# Workflow: making an episode

How one episode goes from "what did the community post" to a build the owner can watch.
This is the contract for the pipeline in `packages/writers-room`, for the scraper's digest,
for the studio's fitting tools, and for every agent that works on an episode. It is the third
version. The trials that shaped it are recorded in `docs/trials/`. If you change a stage, a
file or a rule named here, change this document in the same commit.

## What the trials taught us

The first protocol forbade writers to read the pilot's source and still produced an episode
that repeated the pilot. The repetition did not travel through source files. It was written
into the instructions: a bible that described the pilot, gates that required its devices, a
scraper seeded with its guests.

The second protocol fixed that and produced a fresh episode, with its repeats caught at the
gates. It also spent most of its strongest model on work that was not writing: rendering a line
and reading what was heard, copying posts into cards, checking rules, and re-reading long
documents at every step.

So this workflow is built on four ideas.

1. **Start from the community, not from the show.** The first stages are research: what
   happened, how far it travelled, who was involved. No format is chosen until the material is.
2. **Generate more than is needed, then select.** Many joke ideas per piece of content, more
   drafted segments than slots. Ranking and selection are done by reviewers who did not write
   the thing they judge.
3. **Writers do not see what the show has already done. Reviewers do.** A reviewer who can
   read every earlier script blocks repetition. A writer who has never read them cannot copy.
4. **Fable writes and judges comedy; nothing else.** What a script can do is done by a tool.
   What is checking, documenting or fitting is done on Opus. An agent is given a short list of
   what to read, never "the whole bible".

## Roles and models

| role | model | does | never |
|---|---|---|---|
| **Project manager** | latest Fable | starts a run, handles failures and send-backs, reports to the owner | writes episode content; wakes for routine waves, which the runner drives |
| **Writer** | latest Fable | brainstorms jokes, writes segment scripts, writes the open, the close and the joins | reads earlier episodes or the ledger; scores its own work; renders audio or chases what the engine heard |
| **Reviewer** | latest Fable | judges comedy and repetition: ranks, runs the repetition gates, selects, fills in the scorecard | rewrites what it reviews (it sends back with reasons) |
| **Researcher** | latest Opus | chooses and annotates content cards from the scraper's skeletons, and describes what pictures and videos show | proposes jokes; retypes a post |
| **Auditor** | latest Opus | checks work against rules and facts: the scope of the scrape, the constitution screen, consent (with the network), the staged frames | judges whether something is funny; rewrites what it checks |
| **Sound editor** | latest Opus | fits scripts to the voice engine with the fitting tool on a best effort, gives guests distinct voices, records hard words in the voice research file | changes what a line means; cuts a real person's words |
| **Builder** | latest Opus | stages segments in code, runs the tools, maintains the pipeline, scraper and studio | changes scripts or what a real person is shown saying |

"Latest" means the newest model in that family at the time of the run. As of November 2026
that is `claude-fable-5-2` and `claude-opus-5-5`. The subagent definitions in
`.claude/agents/` carry the model and the standing rules for each role, so a role is chosen
by name and its model follows.

Whoever makes a thing does not judge it. Judgements that decide what goes forward (ranking,
selection, the repetition gate) are made by at least two reviewers working independently,
then combined by a tool.

## Who may read what

| | constitution | craft bible | this episode's research and drafts | reviewers' files | the ledger, trials and earlier episodes |
|---|---|---|---|---|---|
| Writer | yes | the chapters its brief names | yes | **no** | **no** |
| Researcher | yes | the chapter on material | yes | no | no |
| Sound editor | yes | the chapter on voices | the scripts it fits | no | no |
| Builder | yes | the chapter on direction | its segment, and the notes for it | no | no |
| Reviewer | yes | yes | yes | yes | **yes** |
| Auditor | yes | what its brief names | yes | yes | yes |
| Project manager | yes | yes | yes | yes | yes |

**The ledger** (`docs/ledger/`) is the record of what the show has already done: every aired
or drafted joke, runner, format, guest, account shown on a card, song genre and staging
device, by episode. It includes **the tracker**, `docs/ledger/featured.json`: who was
featured when, keyed by DID with the handle as last seen, one entry per appearance. It is
written by reviewers after each episode.

Three things cross from the ledger to the people who may not read it, and nothing else does:

- **Who has been featured and when.** The digest marks each account (`featuredPrevious`,
  `featuredEarlier`, `timesFeatured`), so research and drafting lean toward fresh people. The
  marks never say what anyone said or did on the show.
- **An `avoid` line.** When a reviewer or an auditor sends something back as a repeat, the tool
  passes on one line: the least the recipient needs in order to steer clear, with no earlier
  script, title, line or reaction in it. The tool also gives the song's writer the last genre
  used, in that form, before drafting.
- **The experiment**, which says what to try and never describes an earlier episode.

Reviewers' and auditors' files live under `production/review/` and are fenced from every other
role by the brief, the role's standing rules and the guard hook. So are `docs/ledger/`,
`docs/trials/`, earlier episodes and their builds. The guard is a tripwire, not a wall; what
catches a slip is the repetition gate.

## Stages

Each stage reads the previous stage's files and writes its own under
`episodes/<id>/production/`, so a run can stop, be inspected, and resume. A stage marked
**blocks** cannot be passed by the tool until its condition holds.

**The runner** decides who does a task. `headless` runs each brief through Claude Code as the
role's subagent, waves in parallel, and stops only at a failure or a send-back; it is the
default wherever the `claude` command is signed in, and it is how CI runs. `manual` prints the
briefs for the project manager to spawn by hand. `fixture` is for tests. The tool itself never
calls a model.

**Briefs** are written by the tool, one per task. A brief names the role, the one place to
write, the check command for that task alone, and a short reading list: the constitution, the
bible chapters that task needs, and the files it works from. It states the gate's rules for
the task, so nobody has to read the pipeline's source. Each task gets a scratch folder of its
own.

| # | stage | done by | writes | blocks until |
|---|---|---|---|---|
| 1 | **scope** | tool, then 1 auditor | the digest in `data/`; `scope/coverage.md`; `review/scope.md` | the auditor agrees the scrape draws on the right community, widely enough |
| 2 | **research** | tool builds card skeletons; researchers in parallel, one lane each; then 1 auditor screens | `research/cards/*.json`, `research/longlist.json`, `review/screen.json`, `research/terms.md` | every card is sourced, its media described, and it passes the constitution screen |
| 3 | **rank cards** | tool for reach; 2 reviewers for interest; tool combines | `rank/cards.json`, `rank/pool.md` | two reviewers have scored every kept card |
| 4 | **brainstorm** | 2 or 3 writers in parallel, independently, on the pool only | `brainstorm/ideas.jsonl` | every pool card has ideas from at least two writers |
| 5 | **shortlist** | 2 reviewers for best joke, synergy and variety; tool combines; then 1 reviewer proposes the experiment | `rank/scores.json`, `rank/shortlist.md`, `experiment.md` | the shortlist exists and the experiment has a measure |
| 6 | **repetition gate (ideas)** | 2 reviewers with the ledger | `review/repetition-ideas.json` | no shortlisted idea is a repeat |
| 7 | **draft** | writers in parallel, one segment each | `drafts/<slug>/script.js`, notes and sources | every standing segment has a draft, and seven or eight drafts exist |
| 8 | **fit** | the fitting tool, then sound editors | `drafts/<slug>/fit.json`, respellings in the script, entries in the voice research file | every draft is fitted on a best effort and its hard words are recorded; nothing heard is crude, alarming or out of bounds |
| 9 | **select** | 2 reviewers score; tool combines and applies the caps; **repetition gate (scripts)** by 2 reviewers; 1 auditor refreshes consent over the network | `select/scores.json`, `review/repetition-scripts.json`, `review/consent-r<n>.md`, `plan.json` | no selected script repeats, no cap is broken, every selected account and post passes the consent refresh, and the rundown fits |
| 10 | **assemble** | 1 writer for the order, open, close and joins; 2 reviewers on the lines the writer added; 1 sound editor; tools | final `segments/*/script.js`, `sources.json`, `assembly.md`, audio | scripts validate and render; the added lines pass the repetition gate; the real-people and heard-text gates pass |
| 11 | **stage** | builders in parallel, one segment each; then 1 auditor on the frames | `segments/*/index.js`, frames, `review/stage.json` | frames render clean; the cards, unread-text and credits gates pass; the auditor passes every segment |
| 12 | **build** | tools | thumbnail, preview or published build, `review/sources-live.md` | the build and `verify` pass, everything from a real account that airs has a record in `sources.json` (`npm run aired`, run by the build: a finding refuses a published build, a preview only warns), and every cited post still exists unchanged |
| 13 | **review** | tool runs the cold-viewer test; then 1 reviewer | `review/cold-viewers.md` (the viewers' frames and answers stay outside `production/`, under `shots/<id>/_cold/`), `scorecard.md`, ledger entries, the pull request text | nothing; a send-back is a valid result and routes to the stage that can fix it |

Then the owner watches the whole episode with sound. Nothing is published without that. What
happens after, publishing and posting, is in "After review: publishing and posting" below.

### 1. Scope: are we looking at the right community, widely enough?

The scraper writes the digest for the window, which by default runs from the previous
aired episode's air date to now. Alongside it the tool writes a coverage report: how each
account came to be in the cluster, how concentrated the material is, who is new this window,
how the cluster compares with independent signs of the community such as the Top Chicken
roster and community feeds, and what was excluded and why, in counts.

An auditor reads it and answers three questions: is this the community the show is about; is
it wide enough that the episode will not be about the same few people; is anything obviously
missing. The review has a place for notes to the owner and to research. If the answer is no,
it names one change to the scraper's configuration that fits the request budget. The tool stops
there: the project manager has a builder make the change and scrape again, and the run returns
here.

**Seeds.** The community is carved out from seed accounts, and the seeds are whoever the
show's own Bluesky account follows, read fresh on every run, together with a small list kept
in the scraper's configuration. The owner widens or moves the area by following people from
the show's account. Seeds are recorded by DID, never by handle alone. People the show has
featured may be seeds: being a seed decides where the show looks, not who it puts on screen.

### 2. Research: what is there to work with?

The scraper does the copying. For every story in the window it writes a **card skeleton**:
the posts with their addresses and exact text, who was involved with their follower counts and
featured marks, reach, what each post replied to or quoted, alt text, the address of every
picture and video, and any sensitivity mark, post by post. A skeleton is never retyped.

Researchers work in parallel, one lane each, from a slice of the digest cut for that lane:
things that got made and shown; conversations and running bits; the community's games and
numbers; new and smaller voices; interview candidates, chosen for having made something
and been asked about it; and **what the audience pointed at**. A post that tags the show's own
account is read as a pointer when a member of the cluster posted it, and what it points at goes
into that lane. Pointers are filtered and weighted by membership: a tag from outside the cluster
is counted and not listed, and a member's pointer weighs as much as that member is central, so
the lane is ordered by who pointed and not by how often. A tag guides where the show looks and
decides nothing else: what is tagged passes the same screen and gates as the rest, and the show
promises nobody a place. A researcher chooses skeletons, merges those that are one story,
and adds what a tool cannot: what happened in neutral words, what a picture or video shows
(fetched by the tool for the researcher to look at), what could be shown working, what is not
understood. A card contains no jokes. A video with no words can be a card.

**Reach** stands in for "how many people saw it", which Bluesky does not publish. The scraper
computes it per post and says so wherever it is shown.

An auditor then screens the longlist against the constitution: out-of-bounds subjects,
opted-out accounts and bios, small accounts who would not come off well, anything that cannot
be used in its own context. A story is screened post by post: one flagged post removes that
post, and removes the story only if the story cannot stand without it. Removed cards stay in
the file with the reason, and merged cards point at the card that carries them. The terms on
which a kept card may be used go into `research/terms.md`, which every later brief for that
card includes.

### 3 to 5. Rank, brainstorm, shortlist

Cards are ranked before anyone writes a joke, so that ideas are written only where they can
be used. Two reviewers score each kept card for **interest**, by the constitution's
interesting test, without weighing repetition or people, which have their own gates. The tool
adds **reach** and lists a pool of about fifteen.

Two or three writers then work independently over the pool and write joke ideas for each
card: the premise in a line or two, the turn, what lands on screen, which format might carry
it, and whose real words it would use. An idea for a song, an open or a close is filed under
the card whose material it uses; an idea that spans cards names them all. Writers do not see
each other's ideas.

Two reviewers then score each pool card for its **best joke**, named, and make a pass for
what a single score cannot see: **synergy** and **variety**. The tool combines the scores
into a shortlist of four or five cards with the ideas chosen for each. Interview candidates
are ranked among themselves, for the standing interview, and do not take shortlist places.

**The experiment.** With the shortlist in hand, one reviewer, who can see what the show has
already tried, proposes the episode's one experiment in `experiment.md`: what to try that the
show has not done, why, and a measure someone else can check. The file goes to the writers
and builders, so it says only what to try and never describes an earlier episode. The final
review judges it in scorecard row B12, with the cold-viewer test in hand.

### 6, 9 and 10. The repetition gate

**A joke the show has already done is blocked.** Two reviewers, with the ledger and the
earlier scripts in front of them, give every shortlisted idea, every selected script, and
every line added at assembly one of three verdicts.

- **fresh**: not done before.
- **turned**: it takes something the show did and turns it on its head, by inverting the
  expectation it set up or by making fun of the joke itself. Allowed. The verdict says what
  is turned and how.
- **repeat**: the same joke, runner, catchphrase, device or shape as before. Blocked.

The gate covers jokes, runners and catchphrases, the shape of a segment, staging devices,
and people. A verdict may be on a pair of scripts when the repeat exists only between them.
Only aired episodes count: "the previous episode" is the previous aired one, and an unaired
draft blocks no one. At most one **turned** item per episode. When reviewers disagree, the
stricter verdict stands. A blocked item goes back with an `avoid` line and nothing more.

**People** are counted by the tool, by DID. Someone whose puppet spoke in the previous aired
episode does not speak in this one. Most accounts featured on screen are new, measured over a
set number of recent aired episodes. Nobody is in more than two segments of an episode (a post by a bot counts toward the
person who runs it only where that person makes an appearance: is named, shown or voiced; the
owner's ruling, 21 November 2026), and
an episode has one interview. The tool warns when someone would be featured in too large a
share of recent episodes; fresh people are preferred, and nobody is barred for having
appeared before.

### 7 and 8. Draft and fit

Writers draft segments, one writer per segment, and more is drafted than the episode needs so
that selection is a real choice: the shortlist's four or five, and three standing segments
drafted every week. A standing segment's writer is given the card and the ideas ranked for it.

- **The interview**: one community member, constructed for now from their public posts.
  Every answer is a real post, and every question recreates what that post was actually
  replying to: a house character asks what was asked, or reads aloud what was said, with its
  source. Not someone who spoke in the previous aired episode.
- **Top Chicken**: the window's results with enough of the game around them to be a
  segment: the record and the gap, the window's numbers, and the show's own guess about what
  happens next, labelled as a guess in the voice and on screen.
- **Music**: a genre the show has not just used, on a theme from the window.

A writer writes words. A writer does not render audio. **Fitting** is the sound editor's job,
with a tool that does the search: it renders each line in its voice, transcribes it several
times, tries respellings from the pronunciation dictionary, and reports what was heard for
every line, with anything alarming, out of bounds or about a real person marked. The sound
editor chooses among what the tool found, gives the guests of all drafts voices that are
distinct from each other and from the house, and settles every line that can be settled
without changing its words.

**Best effort on pronunciation is sufficient, because the subtitles carry the line** (the
owner's ruling, 21 November 2026). Captions are on by default and light each word as it is
spoken, so the viewer always sees the exact words. A line the voice cannot say stays as it was
written, and nothing goes back to a writer for pronunciation: no rewrite, no cut of a real
person's words, no waiver for a name. The sound editor records every hard word in the **voice
research file** (`docs/voice-research.md`, kept by `npm run voice-research`): what it was heard
as, the spellings tried, and the one that works if one does. The tool tries a known spelling
first, and writers may read the file, and may still use a hard word. A line whose best effort is
still heard differently from its caption is listed in the fit report for the owner's watch. One
thing is never accepted: a spelling heard as crude, alarming or out of bounds. The sound editor
finds another, and if there is none the line goes to the owner.

### 9. Select

Reviewers score every fitted draft: is it funny, is it interesting, **does it work as
television**, does it add variety. The tool combines the scores and fills the rundown toward
about eight minutes, never past ten, applying the people caps as it goes. The repetition gate
runs on the selected scripts. Standing segments are drafted every week but are still selected
on merit: the first rule of the show, only include it if it's interesting, applies to them
too.

An auditor then refreshes consent over the network for every account and post in the
selection: the bio and labels as they are now, the pinned post, posts since the scrape, any
post about the show, and that each cited post still exists unchanged. The owner's ruling of 27
November 2026 (bible R2, R11): "anything said in public is fair game unless they explicitly
asked this account to not do that". An account is out only when it is on the opt-out list,
carries the `!no-unauthenticated` label, or asked the show itself (a reply or tag to the show's
account, a direct message to it, or a post about the show saying they do not want to be in it);
a cited post is out when it is gone or changed. Only then does the run return to selection. A
flagged bio or a general remark about bots, quoting or screenshots is recorded as a note, with
the exact words and the post's address, for the reviewer's repost test (R6); it removes
nothing. The auditor does not infer an ask from how someone reacted to another account, and does
not rule on whom the show's account may tag or message: it reports what was said, to whom, and
where.

**Television** means nothing is put on screen for the viewer to read in silence. A post that
is shown is performed or read aloud, or it is short enough to take in at a glance.

### 10 to 13. Assemble, stage, build, review

One writer assembles the selected drafts into an episode: the order, the open and the close,
the joins. The lines that writer adds or changes go through the repetition gate. The sound
editor fits the assembled scripts again. Tools render the audio, and the gates run on the
result: every line spoken by a real account's puppet is exact and in its own context; nothing
in what the transcription **heard** is offensive, alarming or out of bounds. A line heard
differently from its caption is a warning, listed for the owner's watch: the subtitles carry
the line.

Builders stage the segments in parallel. Three gates run on the staging, where on-screen text
first exists: every shown post is exact, whether it is on a card or performed by a puppet; no
card or label carries more unspoken text than a glance can take in; and the credits name the
real accounts whose personas were played and say every voice is synthesized. An auditor looks
at the frames and gives a verdict per segment, each change routed to whoever owns the file.

The tools build a preview and check every cited post against the network once more. The
tool then shows each wordless or pictorial stretch the experiment names to a cold viewer, as
frames and nothing else, and records what the viewer says happened. A reviewer fills in the
scorecard and writes the episode into the ledger. A send-back at any review is a valid
result: it names the stage that can fix it, and the run returns there.

## After review: publishing and posting

**These are not pipeline stages.** The pipeline never deploys and never announces: what goes
out under the show's name goes out because a person decided it should. The project manager
does each step below by hand, each on the owner's word, and one approval covers one thing. An
approval of the cut is not an approval to post it, and a yes to the post is not a yes to the
reply.

**The air slot.** When a run starts, the owner names the air slot, a date and a local time, and
it is written at the top of the episode's `production/owner-notes.md`. Everything below counts
back from it. Episode two had no slot written down, its posting materials were still being
fixed on the night, and it missed its window and went out the next morning.

**Publishing is merging.** An episode is made on its own branch, `episode/<id>`, the branch
the pipeline pushes and opens its pull request from. Since 27 November 2026 the repository is
public on GitHub, and `deploy.yml` deploys `dist/` on every push to `main`, so a push to `main`
that carries a published build puts the episode on the site. That is why an episode stays on
its branch until it is approved. The owner first watches the whole episode with sound from the
preview build (the constitution, Article 5). Then, on the owner's word: the episode's status
becomes `published`, the build is made and committed on the branch, the branch is merged into
`main`, and `main` is pushed. Episode two was committed straight to `main` while the repository
was still private; that no longer works, because a commit on `main` is now a deploy.

**The posting cut, made the day before the slot.** The video for Bluesky is cut with the phone
settings from "For phones" in `packages/show/tools/README.md`: `--bluesky --soften box
--caption-scale 1.4 --poster <the title's time> --preview-360 --preview-720`. No captions file
is attached to the post, because the picture already carries captions and the web player would
switch a second set on over them. The settings come from episode two: Bluesky serves phones a
360p stream, and the first cut was unreadable there; and the poster is the video's first frame,
which was a blank sheet. An auditor looks at frames of the 360p preview, because that is what
most viewers get: every card, credit and name tag is readable and uncovered.

**Approval, the day before the slot, as one set.** The owner watches the 360p and 720p previews
and reads the post text, the alt text and the tagged reply together, because they go out
together and are judged together. The reply tags only accounts in that episode's
`production/sources.json`. Two checks are clean at this point: the live source check (`npm run
sources -- check`) and the source-record check (`npm run aired -- <ep>`), which finds anything
that airs from a real account with no record in `sources.json`, so the live check cannot miss
it. On approval the set is frozen, and the cut's
sha256 and the paths of the three texts are written into `owner-notes.md`, so that what goes out
can be shown to be what was approved.

**Go.** On the owner's word to post: run the live source check once more, then `post` with
`--live`, then `reply` with `--live` when the owner says so. After approval nothing in the set
is edited or re-rendered: the owner's ruling of 22 November 2026, "we prepped so we only needed
to press go for live. we are past editing the video". If the last check reports something that
needs a person (someone has opted out or asked the show to leave them out, or a cited post is
gone or edited), the post does not go out, and the owner is told in two lines what it is and
what the choices are. Only the owner reopens the set. A note (a changed display name or handle,
a bio line) does not hold the post; it is reported after.

**The show's account never goes into someone else's thread.** The tagged reply goes under the
show's own post. The owner's ruling of 22 November 2026: "we're not crashing the middle of
someone elses thread - thats the important distinction".

**After posting.** The addresses of the post and the reply go into `owner-notes.md`, so the
episode's record says where it went out. A test post is made only when the owner asks for one,
and `post --undo` deletes one of the show's own posts.

**Close-out.** The reviewer's final scorecard and ledger entry, then the publishing steps above
if the site has not been updated yet.

## What carries forward from one episode to the next

Deliberately little. The constitution. The house cast and the studio, kept for now by the
owner's choice. The craft bible, which an episode may amend. Everything else an episode did
goes into the ledger, which exists so that it is not done again.
