# @late-cluster/writers-room

The weekly production pipeline. It implements [`docs/WORKFLOW.md`](../../docs/WORKFLOW.md) (workflow
v3): thirteen stages from "what did the community post" to a preview the owner can watch and a pull
request for a person to approve. The work is done by subagents in seven roles; this package is the
deterministic backbone between them. **It never calls a model.** It writes one brief per task, has
the runner do the tasks, combines what several subagents wrote independently with recorded
arithmetic, applies the caps, and runs the gates.

Node 22, ESM, Node builtins only, no dependencies. The tests need no install, bun, ffmpeg or browser.

```sh
npm run produce -- --week 2026-W48                                   # run or resume
npm run produce -- --week 2026-W48 --status                          # where it is; whom to spawn (manual runner)
npm run produce -- --week 2026-W48 --check draft --task draft.music  # one task's lines only (what a subagent runs)
npm run produce -- --week 2026-W48 --check stage --segment interview # one segment's staging gates
npm run produce -- --week 2026-W48 --find "pen plotter"              # a post as the gates see it
npm run produce -- --week 2026-W48 --rework stage.interview          # brief a task again with its own failures
npm run produce -- --week 2026-W48 --exclude writer-2-4              # drop an idea (or a draft at select), recorded
npm run produce -- --week 2026-W48 --from select                     # reset a stage and everything after it
node packages/writers-room/bin/end-to-end.mjs                        # all thirteen stages with the real tools, then clean up
```

The project manager's part is in [`playbooks/project-manager.md`](playbooks/project-manager.md):
start the run, and decide at a stop.

## Design

A run is a sequence of stages; a stage is a sequence of waves; a wave is a set of independent tasks,
each done by one subagent of one role, each writing its own file. A wave may have a tool step it
runs every round (`before`: fit what changed, re-shoot what changed) and may create tasks as it goes:
a repeat creates a rework and fresh verdicts on the new version, a rewrite the owner asked for a
writer's task, a staging change a fix. A task is done when its files exist (or its own test holds), so a
run can stop anywhere and resume. `production/state.json` (no timestamps, and no reviewer's or
auditor's prose) records statuses, gate results and the run's choices. A send-back is a valid end of
a stage: it names the stage that can fix it, its verdict file is set aside, and only the file's
`changes` reach the briefs there.

The stage definitions are `src/stage/early.mjs` (1 to 6), `src/stage/drafts.mjs` (7 to 9) and
`src/stage/late.mjs` (10 to 13). Everything the pipeline knows about other packages sits behind one
module each: `src/scraper.mjs` (skeletons, lanes, marks, `npm run media`, `npm run sources`,
`npm run lookup`) and `src/studio.mjs` (`npm run fit`, `npm run render -- <ep> --draft`,
`npm run voices`, `npm run voice-research`), so a rename there is one edit here.

## Fitting: best effort

The owner's ruling of 21 November 2026: "best effort on pronunciation is sufficient, as subtitles
carry the line. document hard to say words in a voice research file as part of the process." The
fitting tool's statuses (`ok`, `weak`, `flagged`, `unsayable`) describe; they no longer decide.

- **Stage 8.** A sound editor gets one task per draft with lines to settle: best effort with `as`,
  pauses and the guest's voice, then `npm run voice-research -- <ep> --draft <slug>` to record what
  stayed hard (`packages/show/tools/data/voice-research.json`, page `docs/voice-research.md`), and
  no hand-back. `fit.heard` (and `select.fitted`) pass when every draft has a `fit.json` and every
  hard line (unsayable, or flagged for a statement heard differently) is covered by a `cannot` or
  `unstable` word or a pattern seen in that draft. Weak lines, a real name not heard (no waiver is
  needed) and every real person's line heard differently ("heard differently, caption exact") are
  warnings, for the owner's watch.
- **The one thing that blocks:** something heard that is alarming, out of bounds or crude
  (`config/pipeline.json` `fit.blocking`, the kinds of the tool's flags). It is never accepted: the
  sound editor tries another spelling, and if none avoids it the gate fails with the line first,
  `for the owner: …`. An out-of-bounds subject heard may still be waived in the draft's
  `heard-waivers.json`, quoting the heard text with a judgement (what waivers were first for).
- **A rewrite only when the owner asks:** `production/fit/owner-rewrites.json`,
  `{ "drafts": { "<slug>": ["<line id>"] }, "segments": { "<seg>": ["<line id>"] } }` (an empty list:
  every line). The task (`fit.rewrite-<slug>`, `assemble.rewrite-<seg>`, kind `rewrite`) is done
  once the script changes.
- **Assembly** works the same way (`assemble.sound`, best effort, once); `assemble.fitted` fails
  only on what is never accepted. The render gates: `render.whisper` lists a line under the
  intelligibility mark as a warning (`production/intelligibility.json` is no longer read);
  `render.heard` still fails on an alarming term heard and on an out-of-bounds subject without a
  waiver, and lists a real name not heard as a warning.

**Runners** (remembered in `state.json`):

| runner | who does a task | when |
|---|---|---|
| `headless` | each brief to `claude -p --agent <role>` with the role's permission rules (`src/writers/claude.mjs`), `headless.parallel` at a time; the run goes on by itself and stops only at a failure or a send-back, printing a `decide:` block | the default where `claude auth status` says signed in, or a credential is in the environment (CI) |
| `manual` | the project manager spawns what `--status` lists, from the briefs | the default otherwise |
| `fixture` | prepared outputs (`<task id>/`, `<task id>@<n>/` for the nth run) | tests, `bin/end-to-end.mjs` |

## Stages

Everything lands under `episodes/<id>/production/`; reviewers' and auditors' files under
`production/review/`. Briefs are `briefs/<stage>/<task id>.md`.

| # | stage | tasks (role) | the tool | blocks until |
|---|---|---|---|---|
| 1 | scope | `scope.auditor` | scrapes if there is no digest; coverage figures | `review/scope.md` has every section and its `## Verdict` says `proceed` (`rescrape: …` sends back to scope) |
| 2 | research | `research.<lane>` (researcher), then `research.screen` (auditor) | cards' exact posts from the skeletons; `research/longlist.json`, `research/kept/<card>.json`, `research/terms.md` from `review/screen.json` | every card from real skeletons, media described, no marked post; a screen decision, merge, drops and terms for every card; each note (a bio line or a general remark, `src/consent.mjs`) has the exact words, where and to whom |
| 3 | rank | `rank.reviewer-<k>` | interest and reach weighted; a pool of `ranking.pool`, interview candidates apart | two reviewers' interest for every kept card |
| 4 | brainstorm | `brainstorm.writer-<k>` (writer) | merges ideas | every pool card has ideas from two writers |
| 5 | shortlist | `shortlist.reviewer-<k>`, then `shortlist.experiment` (reviewer) | best joke, synergy, variety; `rank/shortlist.json` with `interview` ranked apart | scores for every pool card; `experiment.md` with a measure |
| 6 | repetition-ideas | `repetition-ideas.reviewer-<k>-r<n>`; `repetition-ideas.rework-<idea>` (writer) | strictest verdict; people rules | nothing going to drafting is a repeat |
| 7 | draft | `draft.<slug>` (writer): the shortlist and the three standing segments, each with its card and ideas | the previous aired genre as an `avoid` line for music | a draft for every planned slug; real lines sourced, with the draft's own cast |
| 8 | fit | `fit.voices`, `fit.<slug>` (sound-editor, best effort); `fit.rewrite-<slug>` (writer) only when the owner asks | `npm run fit` on every changed draft | every draft fitted; nothing heard crude, alarming or out of bounds (listed first, for the owner); every hard line recorded in the voice research file; sound editors changed no words |
| 9 | select | `select.reviewer-<k>`; `select.repetition-<r>-r<n>`; `select.redraft-<slug>` (writer); `select.consent-r<n>` (auditor) | fills toward the target applying the caps (one interview, two segments a person, no previous speaker, a pair verdict keeps the better script, consent outs: only an out that names a stop, the opt-out list, `!no-unauthenticated` or an ask to the show, or a post gone or changed, drops a draft; a bio line or a general remark is a note); `plan.json` | scores, no repeat among the selected, caps, a consent refresh of this selection with every out naming its stop, every selected draft heard |
| 10 | assemble | `assemble.writer`; `assemble.repetition-<r>-r<n>`; `assemble.rework` (writer); `assemble.sound` (sound-editor) | copies the drafts in, merges sources and casts; finds the lines added or changed; fits segments; renders | the added lines pass the gate; every write, render and heard-text gate |
| 11 | stage | `stage.<seg>` (builder), then `stage.auditor-r<n>`; `stage.fix-<seg>-r<n>`, `stage.fix-episode-r<n>` (builder) | re-shoots only changed segments (`stage/frames.json`) | frames, cards (every post shown or performed), unread text, credits, imports; a pass for every segment |
| 12 | build | none | thumbnail, build (`--preview`), `verify`, `npm run sources` on every cited post | the build verifies and every cited post is live and unchanged (the check's notes do not fail it) |
| 13 | review | `review.viewer-<k>` (viewer), then `review.reviewer` | title and credits frames; the cold-viewer sets; `review/cold-viewers.md`; the pull request text | scorecard, ledger and verdict; a send-back is valid |

## Briefs

One per task (`src/briefs.mjs`): the role; the one place to write (and what else it may edit); a
scratch folder of its own (`shots/<id>/_production/scratch/<task>/`); the check command for that task
alone (`--check <stage> --task <id>`, which prints only the lines that concern its files); a short
reading list, which is the constitution, the chapters `config/pipeline.json` `reading.kinds` names for
that kind of task, and the files it works from (never the whole bible); the gate's rules for the task;
the terms of use of its cards from `research/terms.md`; on a later round, what the earlier round asked
for; on a rework, its own failures. A brief that would name a missing file stops the run. A viewer's
brief says only that these are stills and where to write.

## The tagged lane

`parallel.researchLanes` includes `tagged`, "what the audience pointed at": the scraper's
`lanes/tagged.json`, the things members of the cluster pointed at by tagging the show's account,
each with its taggers and their weights. The researcher cards what was pointed at like any other
story and records on the card who pointed (`"pointedBy": ["<at:// uri of each tagger's post>"]`,
checked against the lane file); a tagged card proposes nothing (no `proposal`, `recommend`,
`pitch`, `priority`, `promise` fields). A lane marked `skipWhenEmpty` gets no task when its slice is
empty, and the research gate says so in one line (`lane tagged (…): nothing in this window's
slice, so no task`). A tag guides where the show looks and decides nothing else.

## Pronouns

The scraper records each person's stated pronouns (its README, "Pronouns"); the pipeline carries
them. `research/longlist.json` and `research/kept/<card>.json` list each person with `pronouns`
(the phrase as written, or "none stated") and `pronounForms`; `research/terms.md` adds a "People
(stated pronouns)" line per kept card. Every brief but a viewer's carries the standing rule
(`src/pronouns.mjs` `PRONOUN_RULE`: refer to a real person by name or handle; use a pronoun only
when one is stated, and then that one; otherwise the name, or "they"; never infer from a name, a
picture, a voice or how someone writes), and a brief that names people (its cards; for assemble,
stage and review, the plan's cards) lists them with their pronouns. The pronoun gate reads he, him,
his, she, her, hers (and -self) in lines spoken by house characters and in on-screen text (other
string literals in `script.js` and `index.js`); for each it lists the segment's people (house
characters who speak, with their forms from `config/pipeline.json` `pronouns.house`, taken from
`docs/bible/02-cast.md`; guests; the accounts its sources cite) and fails when nobody there has
stated that form, or warns naming who it could refer to. At the draft stage it is a warning
(`draft.lines`), at assembly blocking (`write.pronouns`). Verbatim, interview and catchphrase lines
and a guest's own lines are exempt, and so is on-screen text that is a cited post's text.

## Roles and who may read what

`.claude/agents/`: `writer`, `reviewer` on Fable; `researcher`, `auditor`, `sound-editor`, `builder` on
Opus; `viewer` on the cheapest model. Each carries the guard hook,
[`bin/guard.mjs`](bin/guard.mjs). It fences the ledger, `docs/trials/`, every episode's
`production/review/`, earlier episodes, builds and git history from writers, researchers, builders,
sound editors and viewers; a digest's `private/` (bios) from everyone but auditors and its
`reviewers/` from all but reviewers and auditors; it keeps a viewer to its own frames with no shell,
and the auditor's network to `npm run sources` and `npm run media`. It reads paths and command text:
a tripwire, not a wall. The headless runner adds Claude Code permission rules to the same effect.
What catches a slip is the repetition gate.

## Configuration

`config/pipeline.json`, every key commented: limits, parallelism and lanes, ranking, shortlist,
selection weights and caps, standing segments and their cards, repetition, people, music, guest
lines, the reading table, fitting, screen, heard text, frames, the cold-viewer test, headless,
scratch. `--settings <file>` merges a trial's settings over it (remembered; the pull request says so).

## Workflows

`.github/workflows/weekly-episode.yml` (manual dispatch only; the schedule stays commented out)
scrapes, runs `produce --runner headless --preview-only`, uploads frames and `production/`, and on
success commits the episode, `docs/bible/` and `docs/ledger/` to `episode/<id>` and opens the pull
request. It never deploys or announces.

## What is and is not exercised

Exercised: every gate with passing and failing fixtures; the combinations (rank, shortlist,
repetition with rounds, versions and pairs, selection with the caps); the reader against the real
regenerated digest of 2026-W47; the guard and the permission rules for every role; the headless
runner's command line, parallel waves and readiness check; the orchestrator through all thirteen
stages on fixtures with fake tools (`test/pipeline.test.mjs`); and `bin/end-to-end.mjs`, which runs
the thirteen stages with the real tools (the studio's fit, render, check, shoot, credits, thumbnail,
preview build, verify, and the scraper's sources check) and the fixture runner.

Not exercised: the headless runner against the live CLI on a real task (it was not signed in when
this was built); a real week through all stages.
