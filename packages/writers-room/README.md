# @late-cluster/writers-room

The weekly production pipeline. It implements [`docs/WORKFLOW.md`](../../docs/WORKFLOW.md): eleven
stages from "what did the community post" to a preview the owner can watch and a pull request for
a person to approve. The work is done by subagents (researchers, writers, reviewers, builders)
driven by one project manager; this package is the deterministic backbone between them. **It never
calls a model.** It writes one brief per subagent task, waits for their files, combines what
several subagents wrote independently (rankings, verdicts, selections) with recorded arithmetic,
and runs the gates.

Node 22, ESM, Node builtins only, no dependencies. The tests need no install, bun, ffmpeg or browser.

```sh
npm run produce -- --week 2026-W48                       # run or resume; stops when subagents are needed
npm run produce -- --week 2026-W48 --status              # where it is, and exactly whom to spawn next
npm run produce -- --week 2026-W48 --check draft         # one stage's gates on what is there now
npm run produce -- --week 2026-W48 --check stage --segment interview   # one segment (builders in parallel)
npm run produce -- --week 2026-W48 --find "pen plotter"  # a post as the gates see it
npm run produce -- --week 2026-W48 --rework draft.interview            # brief a task again with its failures
npm run produce -- --week 2026-W48 --exclude writer-2-4  # drop an idea (or a draft at select), recorded
npm run produce -- --week 2026-W48 --from select         # reset a stage and everything after it
node packages/writers-room/bin/end-to-end.mjs            # all eleven stages with the real tools, then clean up
npm test                                                 # includes packages/writers-room/test
```

The project manager's loop is in [`playbooks/project-manager.md`](playbooks/project-manager.md).

## Design

A run is a sequence of stages; a stage is a sequence of waves; a wave is a set of independent
tasks, each done by one subagent of one role, each writing its own file. A task is done when its
files exist, so a run can stop anywhere and resume, and the state in
`episodes/<id>/production/state.json` (no timestamps) records only statuses, gate results and the
run's choices. After a wave the tool combines the files (`src/combine.mjs`: rank, repetition
verdicts, selection), then runs the wave's gates. Some waves create tasks as they go: a repeat at
the repetition gate creates a rework task for a writer and then fresh verdict tasks on the new
version, until every item passes or is excluded. A reviewer's send-back is a valid end of a
stage, not a failure to retry: it names the stage that can fix it, and the tool resets from there.

Who does a task is the **runner** (remembered in `state.json`; a run never falls back to another):

| runner | who | used by |
|---|---|---|
| `manual` (default) | the project manager spawns the subagents listed by `--status` | normal runs |
| `headless` | each brief to `claude -p --agent <role>` with that role's permission rules (`src/writers/claude.mjs`) | `.github/workflows/weekly-episode.yml` |
| `fixture` | copies prepared outputs (`<task id>/`, `<task id>@<n>/` for the nth run) | tests, `bin/end-to-end.mjs` |

## Stages, files and briefs

Everything lands under `episodes/<id>/production/`. Briefs are `briefs/<stage>/<task id>.md`.

| # | stage | tasks (role) | the tool | files | blocks until |
|---|---|---|---|---|---|
| 1 | scope | `scope.reviewer` (reviewer) | scrapes if there is no digest (the scraper's default window: since the previous aired episode); writes its own figures | `scope/coverage.md`, `scope/coverage.json`, `scope/review.md` | three answers and `Verdict: proceed` (`rescrape` sends back to scope) |
| 2 | research | `research.<lane>` per lane (researcher), then `research.screen` (reviewer) | reach per card from the scraper's figures; the longlist | `research/cards/<lane>/*.json`, `research/screen.json`, `research/screen.md`, `research/longlist.json` | every card sourced with exact text, no jokes, a screening decision for each |
| 3 | brainstorm | `brainstorm.writer-1..3` (writer) | merges | `brainstorm/writer-<k>.jsonl`, `brainstorm/ideas.jsonl` | every kept card has ideas from 2 writers |
| 4 | rank | `rank.reviewer-1..2`, then `rank.second-reviewer-1..2`, then `rank.experiment` (reviewer) | first pass, second pass, shortlist | `rank/reviews/`, `rank/second/`, `rank/first.json`, `rank/scores.json`, `rank/shortlist.json`, `rank/shortlist.md`, `experiment.md` | scores from 2 reviewers for every card; the experiment stated with a measure |
| 5 | repetition (ideas) | `repetition-ideas.reviewer-<k>-r<n>` (reviewer); `repetition-ideas.rework-<idea>` (writer) | strictest verdict per idea; people rules | `review/repetition-ideas/`, `review/repetition-ideas.json`, `brainstorm/rework/` | no repeat; at most one turned item from the previous aired episode |
| 6 | draft | `draft.<slug>` per shortlisted card and per standing segment (writer) | | `drafts/<slug>/script.js`, `notes.json`, `sources.json` | drafted time over the target; interview, Top Chicken, music drafted; real lines sourced |
| 7 | select | `select.reviewer-1..2`, `select.repetition-reviewer-<k>-r<n>` (reviewer); `select.redraft-<slug>` (writer) | selection to the target, under the ceiling; `plan.json`; inheritance copy | `select/reviews/`, `select/scores.json`, `review/repetition-scripts/`, `review/repetition-scripts.json`, `plan.json`, `inherited/` | no selected script repeats (verdicts name the draft's version) |
| 8 | assemble | `assemble.writer` (writer) | copies the selected drafts into `segments/`, sets the rundown, merges sources; renders; Whisper | `assembly.md`, `sources.json`, `intelligibility.json`, `heard-waivers.json`, `segments/*/script.js` | every write, render, Whisper and heard-text gate |
| 9 | stage | `stage.<seg>` per segment (builder), then `stage.reviewer` (reviewer) | | `segments/*/index.js`, `stage/review.json` | frames, cards, unread text, credits, imports; the reviewer's pass |
| 10 | build | nobody | thumbnail, build (`--preview` for a trial), verify | `dist/episodes/<id>/` or `preview/<id>/` | the build verifies |
| 11 | review | `review.reviewer` (reviewer) | the pull request text | `scorecard.md`, `review.json`, the ledger entry and tracker, `dna-amendments.md` if the DNA changed, `pr-title.txt`, `pr-body.md` | scorecard complete, verdict follows it, ledger agrees with the screen |

Every brief says: the role (which subagent to spawn), the task, the lane or segment, the one place
to write, the command that checks it, what to read, what not to read (for every role but the
reviewer), the task itself, and, on a rework, the failures under "Sent back to you".

## Roles and who may read what

The role definitions are in [`.claude/agents/`](../../.claude/agents/): `researcher`, `writer` and
`reviewer` on `model: fable` (the alias for the latest Fable), `builder` on `model: opus` (the latest
Opus). Their standing rules come from WORKFLOW.md's role and visibility tables. Format and fields
follow the Claude Code documentation: code.claude.com/docs/en/sub-agents (frontmatter `name`,
`description`, `tools`, `model`, `hooks`), /model-config (aliases), /hooks (PreToolUse, exit code 2).

**Writers, researchers and builders never get the ledger or earlier episodes; reviewers do.** For
subagents the project manager spawns, this is enforced by the brief (which points only at what the
role may read and names what it must not) and caught by the repetition gate (two reviewers with the
ledger block anything that repeats). It is not a hard block. The three guarded roles also carry a
PreToolUse hook, [`bin/guard.mjs`](bin/guard.mjs), that refuses reads of `docs/ledger/`, other
episodes' folders, builds, frames and previews, git history, and searches started above them; it
reads paths and command text, so a determined shell command can get round it. The headless runner
adds Claude Code permission rules (`--disallowedTools` Read denies, no Glob or Grep, shell readers
denied by name), which are harder, but Claude Code documents its Grep and Glob deny matching as best
effort.

## Gates

`--check <stage>` runs a stage's gates. A FAIL blocks; a warn is shown to the reviewer and in the
pull request.

| stage | gate | enforces |
|---|---|---|
| scope | `scope.review` | the three questions answered; a verdict; rescrape routes back to scope |
| research | `research.cards` | id, lane, title, summary, sensitive; posts in the digest with exact text; nothing out of bounds or opted out; people with follower counts; no joke fields |
| research | `research.screen` | a keep decision with a reason for every card; nothing out of bounds kept |
| brainstorm | `brainstorm.ideas` | complete ideas for kept cards; every card has ideas from `minWritersPerCard` writers |
| rank | `rank.first`, `rank.second` | two reviewers' scores in range for every card; best joke names a real idea for that card; second pass on the pool |
| rank | `rank.experiment` | `experiment.md` has What we try, Why and Measure, and says nothing about earlier episodes (it goes to writers and builders, whose draft, assemble and stage briefs point at it) |
| repetition | `repetition.ideas`, `repetition.scripts` | two reviewers per item; verdict fresh, turned or repeat; turned says what and how; repeat says what to avoid; any repeat blocks; at most `maxTurnedFromPrevious` turned from the previous aired episode; script verdicts name the current draft version |
| repetition | `repetition.people-ideas`, `repetition.people-scripts`, `assemble.people` | by DID: nobody who spoke in the previous aired episode speaks; at most `maxRepeatFeaturedShare` of the accounts on screen were featured in the last `recentEpisodes` aired episodes; a warning when someone would be in more than `frequentShare` of them |
| draft | `draft.files` | a draft per slug, ids match, drafted time over the target |
| draft | `draft.lines` | every real line in a draft: verbatim or catchphrase, context, setup (as at assembly) |
| draft | `draft.standing` | interview (one member), Top Chicken (at least `topChickenMinResults` of the window's results), music (genre and theme; not the previous aired episode's genre, a warning within `genreWarnWindow`) |
| select | `select.scores`, `select.fits`, `select.inherit` | two reviewers' scores; the selection fits the ceiling; inheritance names existing files with reasons |
| assemble | `write.rundown`, `write.sources`, `write.guest-lines`, `write.labels`, `write.names`, `write.opt-out`, `write.length` | rundown is the plan; sources with DIDs, display names and counts, image-only posts allowed; every guest line's source, context and staged setup (finding 57: the setup is the named line that prompts it, not the previous line); real-account puppets labelled; handles and URLs real and sourced or `.example`; no opted-out account; words under the ceiling |
| assemble | `render.check`, `render.whisper`, `render.lengths` | every script renders; weak lines fail, waivable only for a name the caption contains (finding 56); runtime under the ceiling |
| assemble | `render.heard` | **heard text:** an alarming term heard fails, whatever the score, with no waiver; an out-of-bounds subject heard, or a real person's name in the caption heard as something else, fails until `heard-waivers.json` quotes the exact heard text with a judgement |
| stage | `stage.modules`, `stage.disclaimer`, `stage.cards` | every segment staged; the disclaimer; every card, quote and thread post shown verbatim (finding 40) |
| stage | `stage.unread` | **unread text:** any on-screen string longer than `screen.glanceWords` words, or a long post shown on a card, is at least `spokenCoverage` spoken in its segment |
| stage | `stage.frames` | frames at every cue load with no page errors or unknown cues; `--segment` shoots one (finding 29) |
| stage | `stage.credits` | **credits:** the end card is shot; it credits every real guest's persona with the handle and says every voice is synthesized |
| stage | `stage.imports`, `stage.inherit`, `*.constitution` | studio imports only, nothing across segments (finding 38); the inherited copy is what the plan names; the constitution unchanged since the run began |
| build | `build.thumbnail`, `build.preview-verify` | a thumbnail; a preview build matches the source hash (finding 54) |
| review | `review.scorecard` | every row of the bible's scorecard with evidence; the verdict follows the card; a send-back is valid (finding 55) |
| review | `review.ledger` | the ledger entry's schema, DIDs, guests and featured equal to who is on screen; the tracker has this episode's appearances and nobody else's |
| review | `review.dna` | `experiment.md` present and well formed (judged in scorecard row B12); DNA edits listed in `dna-amendments.md`, which is optional when the DNA is untouched |

## The ledger and the people rules

`docs/ledger/` is read by reviewers and by `src/ledger.mjs`, never by the other roles. The tool
reads every `<episode-id>.json` (`{ id, aired, guests, featured, formats, song, runners,
catchphrases, devices }`, people as `{ did, handle }` or bare handles) and `featured.json`, and
ignores the prose and the other files. Missing or empty files are tolerated. **Only aired episodes
count:** "the previous episode" is the most recent aired one, and an unaired draft never blocks a
person or a joke (the owner's ruling; `docs/ledger/README.md`, "Aired and drafted"). People are
matched by DID; a handle without a DID is resolved through the digest. Scraper seeds play no part.

## The digest

The scraper's digest (`packages/scraper/README.md`) is read by `src/digest.mjs`: posts with exact
text, display names, counts and the scraper's reach; authors with `featuredPrevious`,
`featuredEarlier`, `timesFeatured`; the sections (games with Top Chicken standings, built, about
the show, new voices, interview question-and-answer pairs, performable threads); opt-outs. Reach has
one source: each post's `reach.score` from the scraper, its weights in
`packages/scraper/config/scoring.json` (`config/pipeline.json` `reach.weightsFrom`). Briefs send
subagents to `npm run lookup` for exact records (digest.json is too big to read whole).

## Configuration

`config/pipeline.json`, every key commented: limits (ceiling 590 s, target 480 s), parallelism
(lanes, writers, reviewers), ranking and selection weights, standing segments, repetition, people,
music, guest-line kinds, screen (glance length), heard-text terms, frames, headless budgets.
`--settings <file>` merges a trial's settings over it (remembered; the pull request says so).

## Workflows

`.github/workflows/weekly-episode.yml` (manual dispatch only; the schedule stays commented out):
installs the tools, scrapes with the scraper's default window, runs `produce --runner headless`
(preview only by default), uploads frames and `production/`, and on success commits the episode,
`docs/bible/` and `docs/ledger/` to `episode/<id>` and opens the pull request. It never deploys or
announces. Models come from `.claude/agents/`, not from the workflow.

## What is and is not exercised

Exercised: every gate with passing and failing fixtures; the combination of scores (both ranking
passes, selection, repetition verdicts including rounds and versions); the two-reviewer rule; the
people rules against fixture ledgers (DID matching, a renamed handle, the previous aired episode, an
unaired draft that blocks nobody, the fixed window, the frequency warning) and against the real
ledger; the real bible's scorecard (Step 0, A1 to A16, B1 to B13, 18 of 26); the guard hook; the
headless command line and permissions; the orchestrator end to end with fake tools; and
`bin/end-to-end.mjs`, which runs all eleven stages with the real tools on this machine (render,
check, Whisper, shoot, credits, thumbnail, preview build, verify) and the fixture runner: a repeat
blocks at the ideas gate and at the scripts gate and is reworked, a turned verdict passes, Whisper
really hears "bomb" in a line and `render.heard` blocks until the assembler is reworked, an unread
label blocks until the builder is reworked, then the run finishes and removes every trace.

Not exercised: a real subagent doing any task; the headless runner against the live CLI; the guard
hook inside a real Claude Code session; the workflow on GitHub; `--network`; a real week through
all stages.
