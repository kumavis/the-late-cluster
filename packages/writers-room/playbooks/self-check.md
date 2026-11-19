# Self-check

The episode is built. Judge it as the reviewer will, write down the evidence, and record what it
added to the show's continuity. You are not fixing anything in this stage.

## Read first

1. `docs/bible/10-process.md`, "The scorecard" (Step 0, Part A, Part B, the approval rule) and
   "Stage 6: build".
2. `docs/bible/01-premise.md`, "The interesting test"; `docs/bible/09-real-people.md`, "What the
   reviewer checks".
3. `docs/bible/lore.md`, "How to append", the rotation log and the episode log.
4. The episode: `production/pitch.md`, `plan.json`, `sources.json`, every `script.js` and `index.js`,
   the frames in `shots/<id>/`, and `production/state.json` (the gate results and warnings so far; read
   only).

## Produce

**`episodes/<id>/production/scorecard.md`**, in this shape (rows copied from bible 10: every Part A and
Part B row the bible has, with the same ids):

```markdown
# Scorecard: episode NNN, <title>

## Step 0
- `cold-open`: <one-sentence retell> — <turn or feeling in five words>
- `<every segment, standing item and runner>`: …

## Part A
| # | result | evidence |
|---|---|---|
| A1 | pass | <one sentence: a line quoted, a timestamp, a URI> |

## Part B
| # | score | evidence |
|---|---|---|
| B1 | 2 | <one sentence> |

Total: <n> of <max>. <Approve | Send back>, because …
```

**The lore file** (the path is in "This run"), following "How to append": the episode log entry
`- **E-NNN <title>** (…)`; one row in the rotation log copied from `plan.json` (formats in rundown order,
song genre and theme, guests with how they appeared and their words by source type, runner, "Built
it." shapes, descriptor, sincere kind, Top Chicken); new show lore, running gags and community lore
with the next ids; the set state at the end of the episode. Never renumber or delete an entry.

## How to judge

- Step 0 first. Anything that fails the interesting test should have been cut: say so in its line.
- Part A is pass or fail. Fail anything you are not sure passes; the reviewer will decide.
- Score Part B as a stranger to this week would. A self-check that comes out "send back" stops the
  pipeline before the pull request, which is the right outcome when it is true. Inflating a score
  only moves the send-back to the reviewer.
- Quote, don't summarise: a caption, a timestamp, a URI.

## Check and finish

`npm run produce -- --week <week> --check self-check` checks: Step 0 lists every segment; every row of
the bible's scorecard is present with a result and a sentence of evidence; no Part A fail; Part B meets
the approval rule; the lore file has the episode log entry and the rotation log row (with the plan's
song genre) and lost no entry. You are finished when it prints no FAIL.

## Never

- Edit scripts, direction, audio or the build: if something must change, fail its row and say what.
- Add community lore you can't source to a post in the digest, or lore about anyone on the opt-out
  list.
