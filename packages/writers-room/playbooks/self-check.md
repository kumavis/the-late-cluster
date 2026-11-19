# Self-check

The episode is built. Judge it as the reviewer will, judge the experiment honestly before air, write
down the evidence, record what the episode added to the show's continuity, and amend the DNA if, and
only if, the episode earned it. You are not fixing anything in the episode in this stage.

## Read first

1. `docs/bible/00-constitution.md` and `09-real-people.md` (including "What the reviewer checks").
2. `docs/bible/10-process.md`, "Stage 6: build" (the self-check, `dna-amendments.md`) and "The
   scorecard" (Step 0, Part A, Part B, the approval rule).
3. `docs/bible/03-episode-shape.md`, "Evolving the show" (when a result changes the DNA, retiring
   things, drift and ossifying).
4. `docs/bible/lore.md`, "How to append", and its rotation, experiment and episode logs.
5. The episode: `production/pitch.md`, `plan.json`, `sources.json`, every `script.js` and `index.js`,
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

**`episodes/<id>/production/dna-amendments.md`**, in the shape bible 10 gives it:

```markdown
# DNA amendments: episode NNN

## Experiment
<what it was; the success measure; your judgement before air: worked / didn't / can't tell yet, and why>

## Edits to the DNA in this pull request
- `<file>` (<section>): <the change, one line> — because <evidence>
(or "none", with the reason)
```

**The lore file** (the path is in "This run"), following "How to append": the episode log entry
`- **E-NNN <title>** (…)`; one row in the rotation log and one in the experiment log, copied from
`plan.json` and `dna-amendments.md`; new show lore, running gags and community lore with the next
ids; the set state at the end of the episode. Never renumber or delete an entry.

**DNA edits**, only when they are earned: in the chapter where the rule lives, small (a sentence, a
row, a format card), each listed in `dna-amendments.md`.

## How to judge

- Step 0 first (constitution, Article 1). Anything that fails the interesting test should have been
  cut: say so in its line.
- Part A is pass or fail. Fail anything you are not sure passes; the reviewer will decide.
- Score Part B as a stranger to this week would. A self-check that comes out "send back" stops the
  pipeline before the pull request, which is the right outcome when it is true.
- **The experiment, honestly.** Judge it against the success measure the plan stated, not a new one.
  Before air you usually can't tell how the community will take it: "can't tell yet" is a result, and
  so is "didn't". Quote what you can see (a frame, a line, a timestamp).
- **Amend the DNA only for a change you would defend to the owner**: the experiment worked and would
  work in another week, or it showed a rule was wrong. A change that worked because of this week's
  story is a one-off: note it in the experiment log and edit nothing. When unsure, edit nothing and
  say why in `dna-amendments.md`.
- Never edit the constitution, even to fix a typo. If you think it is wrong, say so in your final
  sentences; the owner decides.

## Check and finish

`npm run produce -- --week <week> --check self-check` checks: Step 0 lists every segment; every row of
the bible's scorecard has a result and a sentence of evidence; no Part A fail; Part B meets the
approval rule; the lore file has the episode log entry and the rotation and experiment log rows, and
lost no entry; `dna-amendments.md` gives the experiment's verdict and lists exactly the DNA files that
changed (or "none" with the reason); the constitution is byte-identical to when the run started. You
are finished when it prints no FAIL.

## Never

- Edit scripts, direction, audio or the build: if something must change, fail its row and say what.
- Add community lore you can't source to a post in the digest, or lore about anyone on the opt-out
  list.
