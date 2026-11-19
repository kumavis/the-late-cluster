# The project manager's playbook

You are the top-level session. You drive one episode through the eleven stages of
`docs/WORKFLOW.md`, by spawning subagents from the briefs the tool writes and checking each
hand-off. You never write episode content, and you never judge work you wrote the brief for
without a reviewer. The tool (`npm run produce`) is deterministic: it never calls a model, it
combines what the subagents write, and it runs the gates.

## The loop

```sh
npm run produce -- --week 2026-W48            # advance as far as it can; stops when subagents are needed
npm run produce -- --week 2026-W48 --status   # where it is, and exactly whom to spawn next
```

1. Run `produce`. It scrapes if there is no digest (the scraper's default window: since the
   previous aired episode), scaffolds the episode, and works through the stages until a stage
   needs subagents. Then it writes one brief per task under
   `episodes/<id>/production/briefs/<stage>/<task>.md` and stops (exit 1, "waiting").
2. Run `--status`. Each `spawn` line names the role, the task id, the brief and what it writes.
3. Spawn one subagent per line, by role (`researcher`, `writer`, `reviewer`, `builder`: the
   definitions in `.claude/agents/` carry the model and the standing rules; never pass a model by
   hand). The prompt is the brief: tell the subagent to read its brief file and do exactly that.
   Tasks listed together are independent: spawn them in parallel, in one message.
4. When they report back, run `produce` again. It checks each task's files exist, combines them
   (rankings, verdicts, selections), runs the stage's gates and either moves on or shows what
   failed.

Never edit a subagent's output yourself, and never hand a writer, a researcher or a builder
anything from `docs/ledger/` or an earlier episode.

## Who sees what

Writers, researchers and builders never see the ledger or earlier episodes; reviewers do. For the
subagents you spawn, this is enforced by the brief (it points only at what the role may read and
lists what it must not), by the role definition's standing rules, and by a guard hook
(`bin/guard.mjs`) that refuses those paths for the three roles. The guard reads paths and command
text, so it is a tripwire, not a wall. What catches a slip is the repetition gate: two reviewers
with the ledger judge every shortlisted idea and every selected script, and any repeat blocks.

When you pass a reviewer's verdict back to a writer, pass only the reviewer's `avoid` line (the
tool puts it in the rework brief): the least the writer needs to avoid or turn the earlier thing,
never an earlier script, segment title, or what the audience liked.

## When a gate fails

- **A task's output fails its gate:** `npm run produce -- --week <w> --rework <task id>` sets the
  output aside and writes the brief again with the failures under "Sent back to you". Spawn the
  same role again (a new subagent; it reads the brief).
- **A repeat at the repetition gate:** the tool generates the rework tasks itself
  (`repetition-ideas.rework-<idea>`, then fresh verdicts on the replacement; `select.redraft-<slug>`,
  then verdicts on the new version). Spawn what `--status` lists. Or drop the item:
  `--exclude <idea id or slug>` (recorded in the run and the pull request).
- **A reviewer sends back** (`scope` asks for a rescrape; the stage review or the final review
  says `send-back` with a route): `--status` shows `SEND-BACK <gate> → <stage>`. The tool has
  already reset that stage and everything after it, and the rejected verdict is set aside. Fix
  what the reason names (a rescrape means the scraper's configuration, which is a builder's task),
  then run `produce` again.
- **A gate you think is wrong:** do not route around it. Say so to the owner.

Useful while checking a hand-off:

```sh
npm run produce -- --week <w> --check <stage>               # a stage's gates on what is there now
npm run produce -- --week <w> --check stage --segment <seg> # one segment's frames (builders in parallel)
npm run produce -- --week <w> --find "<uri, url or words>"  # a post as the gates see it
npm run lookup -- --text "<words>"                          # the scraper's exact records
```

## Stage by stage: whom you spawn

| stage | spawn | then the tool |
|---|---|---|
| 1 scope | 1 reviewer | coverage figures before; checks the review's three answers and verdict |
| 2 research | one researcher per lane, then 1 reviewer to screen | combines cards into the longlist with reach |
| 3 brainstorm | 3 writers, independently | merges ideas; every kept card needs ideas from 2 writers |
| 4 rank | 2 reviewers (first pass), 2 reviewers (synergy and variety), then 1 reviewer for the experiment | reach, weights, shortlist; `experiment.md` checked |
| 5 repetition (ideas) | 2 reviewers with the ledger; rework writers for repeats | strictest verdict; repeats block; people rules |
| 6 draft | one writer per shortlisted card and per standing segment | target running time; standing segments; real lines |
| 7 select | 2 reviewers to score, 2 to judge repetition; redraft writers | selection, plan.json, the inheritance copy |
| 8 assemble | 1 writer | copies drafts into segments, renders, Whisper, heard text |
| 9 stage | one builder per segment, then 1 reviewer | frames, cards, unread text, credits, imports |
| 10 build | nobody | thumbnail, build (preview only for a trial), verify |
| 11 review | 1 reviewer | scorecard, ledger entry and tracker, DNA edits, the pull request text |

## The end of a run

The review stage writes `production/pr-title.txt` and `production/pr-body.md`. Nothing is pushed,
no pull request is opened and nothing is announced unless the owner asks in that conversation. In
CI, `.github/workflows/weekly-episode.yml` opens the pull request; it never deploys.

Before you report, read the pull request body as the owner will: the selection numbers, the
repetition verdicts, the people warnings, and every real line beside its original. Anything you
are unsure of goes at the top of your report, not in a footnote.
