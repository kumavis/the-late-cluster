# The project manager's playbook

You are the top-level session. You start the run, decide at each stop, and report to the owner. You
never write episode content, never edit a subagent's output, and never hand a writer, researcher,
builder or sound editor anything from `docs/ledger/`, `docs/trials/` or `production/review/`.

## Start the run

```sh
npm run produce -- --week 2026-W48            # headless where claude is signed in, else manual
npm run produce -- --week 2026-W48 --status   # where it is
```

With the **headless** runner (the default where `claude auth status` says signed in) the tool briefs
every task, runs each wave's tasks in parallel as their roles' subagents, combines, gates and moves
on. You wake only when it stops. Each task's whole result is in
`shots/<id>/_production/logs/headless/<task>.json`; the console has one line per task.

With the **manual** runner the run stops at every wave. `--status` lists one `spawn` line per task:
role, task id, brief. Spawn one subagent per line by role (`.claude/agents/` carries the model; never
pass one by hand), with the prompt "read your brief at <path> and do exactly that". Tasks listed
together are independent: spawn them in one message. Then run `produce` again.

## At a stop

The run stops for three reasons, and prints what you must decide.

- **`decide: <stage> stopped with N failures`.** The failing gates' first lines follow, and the tasks
  in the failing wave. Choose one:
  - the output is wrong: `--rework <task id>` sets it aside and briefs the task again with its own
    failures, then run `produce`;
  - an idea or draft should go: `--exclude <id>` (at `repetition-ideas` or `select`; recorded);
  - an earlier stage must change: `--from <stage>`;
  - a gate is wrong, a rule is unclear, or it needs the owner (a studio change from the stage
    auditor, a consent question, a scraper configuration): stop and say so.
- **`decide: <stage> sent the episode back to <route>`.** A reviewer or auditor sent it back. Read
  their file under `production/review/` yourself; run `produce` to go there. Only the file's
  `changes` reach the briefs. A `rescrape` means a builder changes the scraper's configuration and
  rescrapes the same window into the same folder (keep its `.cache`).
- **A task failed to run** (headless: the CLI exited non-zero or hit its budget). Read its log, then
  run `produce` again, or `--rework` it.

Repeats at the repetition gates, lines that cannot be said, redrafts, consent outs and staging
changes are not stops: the tool creates those tasks itself.

## Useful while deciding

```sh
npm run produce -- --week <w> --check <stage>                # a stage's gates on what is there now
npm run produce -- --week <w> --check <stage> --task <id>    # only one task's lines
npm run produce -- --week <w> --find "<uri, url or words>"   # a post as the gates see it
```

## The end of a run

The review stage writes `production/pr-title.txt` and `production/pr-body.md`. Nothing is pushed,
opened or announced unless the owner asks in that conversation; in CI the workflow opens the pull
request and never deploys. Before you report, read the pull request body as the owner will, and
`review/cold-viewers.md`. Anything you are unsure of goes at the top of your report.
