# @late-cluster/writers-room

The weekly production pipeline: it takes one week's digest of Bluesky posts and drives it, stage by
stage, to a finished episode in a pull request for a person to approve. The stages and their outputs
are the contract in [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md), "The weekly pipeline";
what good looks like at each is [`docs/bible/10-process.md`](../../docs/bible/10-process.md).

Node 22, ESM, Node builtins only, no dependencies. The tests need no install, bun, ffmpeg or browser.

```sh
npm run produce -- --week 2026-W47                     # run, or resume, the week's episode
npm run produce -- --week 2026-W47 --status            # where it is
npm run produce -- --week 2026-W47 --check write       # one stage's gates, nothing else
npm run produce -- --week 2026-W47 --from direct       # redo direct and everything after it
npm run produce -- --week 2026-W47 --stage pitch       # one stage (earlier ones must be done)
npm run produce -- --week 2026-W47 --writer manual     # print each creative stage's prompt and stop
node packages/writers-room/bin/self-test.mjs           # the whole pipeline on a trial fixture, then clean up
npm test                                               # includes packages/writers-room/test
```

Options: `--writer claude|manual|fixture` (default claude), `--model <id>` (default
`claude-fable-5-2`; `claude-opus-5-5` is the documented alternative; or `PRODUCE_MODEL`),
`--fixture <dir>`, `--digest <dir>` (instead of `data/weeks/<week>/`), `--limits <file>` (JSON merged
over the default limits: a trial run, and the pull request says so), `--lore <file>` (instead of
`docs/bible/lore.md`), `--network` (check invented handles against the public API),
`--max-attempts <n>` (writer attempts per stage, default 3). `--digest`, `--limits` and `--lore` are
remembered in `state.json`, so a resume needs only `--week`.

Output is one line per event (`stage …`, `gate <name> ok|FAIL|skip`, indented `FAIL` and `warn`
lines) and the repo's exit codes: **0** done (or nothing to do), **1** refused, failed, or waiting
for a person, **2** bad arguments.

## How a weekly run works

| # | stage | done by | reads | writes |
|---|---|---|---|---|
| 1 | scrape | `npm run scrape -- --week W`, skipped when `digest.json` exists | the network | `data/weeks/W/digest.{json,md}` |
| 2 | scaffold | `npm run episode:new -- --title "Week W" --week W --slug yyyy-wNN` | | `episodes/NNN-yyyy-wNN/` (draft) and `production/state.json` |
| 3 | pitch | writer + gates | digest, bible, earlier plans | `production/pitch.md`, `production/plan.json`; title and description copied into `episode.json` |
| 4 | write | writer + gates | plan | `segments/*/script.js` (via `segment:new`), `cast.js`, `looks.js`, `production/sources.json` |
| 5 | render | `npm run render`, `npm run check`, `bun …/analyze.ts whisper` + gates; failures go back to the write writer | scripts | audio, telemetry, `cues.json` |
| 6 | direct | writer + gates (the gate shoots the frames) | cues | `segments/*/index.js`, `production/thumbnail.txt`; frames in `shots/<id>/` |
| 7 | build | `npm run thumbnail`, status → `published`, `npm run build`, `npm run verify` | | `thumbnail.jpg`, `dist/episodes/<id>/` |
| 8 | self-check | writer + gates | everything | `production/scorecard.md`, the lore entry and rotation-log row |
| 9 | pr | the pipeline | everything | `production/pr-title.txt`, `production/pr-body.md` |

Stages 2 and 9 are this package's: the contract's table starts the episode folder in the pitch
stage and ends with "a pull request", so scaffolding and writing the pull request text are steps
of their own here. Stage 8 is the second half of the contract's stage 6.

**Week to episode.** The episode for a week is the one whose `episode.json` has that `week`. A new one
is scaffolded only when none does, so starting a week again resumes it; two episodes claiming one week
is an error for a person to resolve. The slug is the week (`002-2026-w47`): the title is not known
until the pitch, and the id cannot change once a build exists.

**Resuming.** `production/state.json` records each stage's status (`pending`, `running`, `waiting`,
`failed`, `done`), its writer attempts and its last gate results, with no timestamps. A run starts at
the first stage that is not done. A failed stage is retried from its current files, with the
failures in the prompt. `--from` resets a stage and everything after it (and sets the episode back
to draft). Logs, prompts and the writer's costs go to `shots/<id>/_production/` (gitignored, uploaded
with the frames).

**Draft until review.** The episode stays `draft` until the build stage, which sets `published`,
builds into `dist/`, verifies and stops. Nothing here deploys, announces, commits or pushes;
merging the pull request is what publishes.

**Where a mid-week interview stage would attach.** *Proposal only, not built.* Bible 10, "Stage 0:
ask", describes interviews conducted by the show's account during the week. It would run before
`scrape` as a stage of its own (`ask`: the writer drafts questions from the week so far, a person
approves them, the bot posts them to people who opted in), and the scrape would collect the replies.
The pipeline already accepts `// interview: at://…` source comments and checks them like verbatim
lines (the post must be in the digest, by that guest, word for word), so nothing downstream would
change. It needs bot work and the consent design in bible 09 first.

## The writers

One interface (`src/writers/index.mjs`): `run({ stage, prompt, … })` returns `done`, `waiting` or
`failed`; the pipeline then runs the gates and, on failure, calls the writer again with the failures,
up to `--max-attempts`.

- **claude**: Claude Code in print mode, in the repo, with the prompt on stdin. The prompt
  (`src/prompt.mjs`) is the run's values (episode, week, digest path, limits, attempt), what the stage
  may change and run, the check command, the previous attempt's failures, then
  [`playbooks/README.md`](playbooks/README.md) and the stage's playbook. The command line
  (`src/writers/claude.mjs`):

  ```sh
  claude -p --model claude-fable-5-2 --output-format json --permission-mode dontAsk \
    --setting-sources project --strict-mcp-config --disable-slash-commands --no-session-persistence \
    --tools Read,Glob,Grep,Edit,Write,Bash --max-turns 200 --max-budget-usd 25 \
    --allowedTools Read Glob Grep "Bash(npm run produce -- --week W --check write)" \
      "Edit(episodes/<id>/segments/**/script.js)" "Write(…)" … "Bash(npm run render -- <id> *)" … \
    --disallowedTools WebFetch WebSearch "Bash(git *)" "Bash(gh *)" "Bash(curl *)" \
      "Bash(npm run bot *)" "Bash(npm run build *)" "Edit(episodes/<id>/production/state.json)" \
      "Edit(episodes/001-pilot/**)" "Edit(packages/**)" "Edit(scripts/**)" "Edit(.github/**)" …
  ```

  Where each flag comes from in the Claude Code documentation (code.claude.com/docs/en/…):
  `-p`, `--output-format json` and prompts on stdin: *headless.md*. `--permission-mode dontAsk`
  (anything not allowed is denied, never prompted): *permission-modes.md*. `--allowedTools` /
  `--disallowedTools` rules, the `Bash(cmd *)` prefix form, path rules relative to the working
  directory and "deny, then ask, then allow": *permissions.md*. `--tools`, `--setting-sources`,
  `--strict-mcp-config`, `--disable-slash-commands`, `--no-session-persistence`, `--max-turns`,
  `--max-budget-usd`, `--model`: *cli-reference.md*. Model names: *model-config.md*. Credentials:
  `ANTHROPIC_API_KEY`, or `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token` (*authentication.md*).
  Locally, the contract has `npm run produce` load `.secrets`. Each stage's allow list is in
  `permissions()`: pitch edits only its two papers and `episode.json`; write edits scripts, cast,
  looks and sources and runs `segment:new`, `render`, `check` and the Whisper pass; direct edits
  `index.js` and runs `shoot`; self-check edits the scorecard and the lore file. User and local
  settings are ignored so their allow rules cannot widen this. Extra flags: `PRODUCE_CLAUDE_ARGS`.
  Turn and dollar budgets per stage are in `config/pipeline.json`.
- **manual**: writes the prompt to `shots/<id>/_production/prompts/<stage>.md`, prints it with the
  files expected and the check command, and stops (exit 1, `waiting`). A person, or an interactive
  Claude Code session given that prompt, does the stage; the next `npm run produce` runs the gates
  first and continues if they pass.
- **fixture**: copies prepared outputs into place (`--fixture <dir>`, one folder per stage mirroring
  `episodes/<id>/`, `<stage>@<n>/` overlays for attempt n). Used by the tests and the self-test;
  [`test/fixtures/trial/`](test/fixtures/trial/README.md) is a two-segment episode with house
  characters and one invented `.example` guest.

## The gates and the rules they enforce

Each gate is a small function in `src/gates/` that returns precise failures written for the writer
(what, where, which rule, what to do). None judges taste.

| stage | gate | checks | rule |
|---|---|---|---|
| pitch | `pitch.document` | `pitch.md` heading (number, week); every `##` section of the template in bible 10 (read from the bible), none empty or with a placeholder; every numbered story cites a post; every real guest has a "real-people check"; every cited post is in the digest | bible 10 stage 2; R2, R14 |
| pitch | `pitch.plan` | `plan.json` schema (below); segment ids; `seconds` add up under the ceiling (no minimum); the BUILT chain starts at 0 and joins up; a song has genre and theme; a thread's posts are in the digest, with text, in thread order; guests are in this week's digest and not opted out; no cited post from an out-of-bounds story; cuts have reasons | bible 03; R10, R11, R14; format 9 rules 1–2 |
| pitch | `pitch.freshness` | **fails** when the song's genre equals the previous published episode's; **warns** (answerable in `overrides` or a guest's `repeatReason`) on a genre within 8 episodes, the middle format from last week, a guest two weeks running, a reused runner, descriptor, Ask post or thread post, a repeated "Built it." shape, the same sincere kind as last week, more than 2 callbacks | bible 03, fixed and fresh |
| pitch, write | `*.optout` | no handle or DID from `packages/scraper/config/optout.json` (or flagged opted out in the digest) in any file of the episode, papers included; the message never repeats the name | R11, A1 |
| write | `write.rundown` | `episode.json` rundown equals the plan; title and description set; still a draft; every `script.js` exists | |
| write | `write.sources` | `sources.json`: every account, post and link is in the digest; real accounts only; post `text` is the post's exact text; nothing out of bounds; every real guest who speaks is listed as a guest | R2, R4, R10, R12 (record) |
| write | `write.guest-lines` | every line a guest speaks or sings has a source comment: verbatim / interview (the caption equals that guest's own post exactly; `as` only respells), catchphrase (listed for the account in `sources.json`), pastiche (the format string appears in the guest's posts this week), invented (fictional guests only); in a thread segment the verbatim lines follow `thread.posts` and no house character speaks a real post; more than 2 pastiche lines warn | R3, A4; format 9 rules 1–4 |
| write | `write.labels` | a cast entry with a real handle has `guest: true`; every guest in `sources.json` is played by such an entry | R9, A8 |
| write | `write.names` | every handle, domain and URL in the episode's strings and comments is in `sources.json` or on `.example`; every at:// or bsky.app post in them is in `sources.json`; with `--network`, invented handles must not resolve | R8, R4, A9 |
| write | `write.length` | spoken words and the runtime they imply are under the ceiling | bible 03, 10 stage 3 |
| write | `write.renders` | `npm run render` accepts every script | bible 10 stage 3 |
| render | `render.check` | `npm run check` passes | A11 |
| render | `render.whisper` | with Whisper installed: no line under 60 % unless waived in `production/intelligibility.json` (a name Whisper can't know); "Built it." heard every time | bible 10 stage 4 |
| render | `render.lengths` | each segment within 10 % of the plan; the total under the ceiling | bible 10 stage 4 |
| direct | `direct.modules` | every segment has `index.js` | |
| direct | `direct.disclaimer` | the first segment with a guest has a `disclaimer` | R9, A8 |
| direct | `direct.cards` | every post `sources.json` marks as a card appears verbatim in a segment's strings | R4, A2 |
| direct | `direct.frames` | frames at every cue, line id and music start plus six across each segment: no page errors, console errors or unknown cues | bible 10 stage 5, A11 |
| build | `build.thumbnail`, `build.build`, `build.verify` | the thumbnail is a JPEG under 1 MB; build and verify exit 0 | A11 |
| self-check | `self-check.scorecard` | Step 0 lists every segment; every Part A and B row of the bible's scorecard (read from bible 10, not hard-coded; fails loudly if its shape changes) has a result and a sentence of evidence; no Part A fail; Part B meets the approval rule (today 15 of 22, no 0 in B1, B2, B8, B11) | bible 10 scorecard |
| self-check | `self-check.lore` | the lore file has `E-NNN`, a rotation-log row for the episode (with the plan's song genre), and lost no entry id | bible lore.md |

**What is not gated, and is the reviewer's alone** (the pull request says so): whether anything is
interesting (the first rule; Step 0 and B1–B11 are the writer's self-assessment); R1 persona not
person; R3's "never an opinion" inside catchphrase and pastiche lines (the gate checks the source
exists, not what the line implies); R4 context and framing (A3); R5 no invented scandal (A5); R6 the
repost test and R7 small accounts only as heroes (A7; the pull request flags small accounts); R10
topics the digest did not flag (A6); A10 rankings; R12 that a number is benign; R13 bots; R15 unclear
references; the self-declared opt-outs in posts or bios that the scraper's patterns missed; the
quality of the direction (the frames are an artifact for a person to look at); and the B scores.

## Files

`plan.json` (owned here; a superset of the example in bible 03, "The mechanism"; when that example
gains a field, add it to the schema in `playbooks/pitch.md` and to `pitchPlan` in
`src/gates/pitch.mjs` in the same change). Required: `format: "late-cluster-plan/1"`, `id`, `week`,
`title`, `question`, `segments[]` (`id`, `format`, `seconds`, optional `built: [from, to]`, a song's
`genre` and `theme`, a thread's `thread.posts`, `topChicken`, `ask`), `guests[]` (`cast`, `handle`,
`source`, `segment`, `repeatReason`). Optional: `description`, `runner`, `builtShapes`,
`descriptor`, `ask`, `sincere: { kind, source }`, `callbacks`, `cut: [{ what, why }]`,
`overrides: { <warning code>: <reason> }`. The pilot's is `episodes/001-pilot/production/plan.json`,
written after the fact so the history starts somewhere.

**History for freshness:** each earlier published episode's `plan.json`; for an episode without one,
its row in the rotation log in the lore file. The plan is preferred because it has more fields.

`sources.json` (format `late-cluster-sources/1`), `intelligibility.json`, `thumbnail.txt`,
`scorecard.md` and `state.json` are described in the playbooks and above. The bible readers
(`src/bible.mjs`) take the pitch template, the scorecard's rows and approval rule, the reviewer's
checklist and the rotation log from the bible at run time, so the pipeline follows the bible's edits;
a test checks they still parse the real chapters.

## The workflows

- **`.github/workflows/weekly-episode.yml`** (manual dispatch; the weekly cron is in the file,
  commented out): checkout, Node 22, bun, ffmpeg, `npm ci`, Playwright's Chromium, optionally
  Whisper (CPU torch), Claude Code pinned with `npm install -g @anthropic-ai/claude-code@<version>`,
  then `npm run scrape` and `npm run produce -- --week W --model M --network`; uploads
  `shots/<id>/` and `production/` as an artifact (also on failure); on success commits
  `episodes/<id>`, `dist/episodes/<id>` and `docs/bible/lore.md` to `episode/<id>` and opens the pull
  request with `gh pr create --body-file production/pr-body.md`. Permissions `contents: write` and
  `pull-requests: write` only; a concurrency group per week; a 4-hour timeout. It never deploys or
  announces.
  **Configure:** the repository secret `ANTHROPIC_API_KEY` (or `CLAUDE_CODE_OAUTH_TOKEN`); "Allow
  GitHub Actions to create and approve pull requests" (Settings → Actions → General); optionally a
  `PR_TOKEN` secret, because pull requests opened with the default token do not trigger `ci.yml`.
  Pages needs nothing new: `deploy.yml` publishes on merge as before.
- **`.github/workflows/announce.yml`** (manual dispatch): input the episode, and `live` (default off:
  a dry run). Needs the secret `BSKY_APP_PASSWORD`; `BSKY_HANDLE` (secret) and `SITE_URL` (variable)
  are optional overrides of `show.config.json`. `contents: read` only.

## What a run costs, roughly

An estimate from the sizes involved, not a measurement: no model run has produced an episode yet.
Each creative stage reads the bible (163 KB, about 40k tokens), the studio READMEs (70 KB, 18k), the
digest's Markdown (about 75 KB, 19k) and parts of `digest.json`, then works for tens to hundreds of
turns with that context cached. With Claude Fable 5.2 ($8 / $40 per million input / output tokens,
$0.20 cached reads): pitch about $2–4, write about $8–15 (many render and Whisper loops), direct about
$10–20 (frames are images, about 1.2k tokens each, and it reads dozens), self-check about $2–4: **roughly
$20–45 per run**, more with retries. Claude Opus 5.5 ($4 / $20, same cached-read price) roughly halves
the uncached part: perhaps $12–30. The per-stage `--max-budget-usd` caps in `config/pipeline.json`
(8, 25, 30, 8 dollars per writer call) bound a runaway stage. GitHub Actions minutes: the install
steps take about 10 minutes, rendering a five-minute episode about 2 minutes warm and 5 cold, Whisper
a few minutes, the model stages most of the rest: a run should fit well inside the 4-hour timeout.

## What has and has not been exercised

Exercised: every gate against passing and failing fixtures (`test/`, 69 tests, Node builtins only);
the orchestrator end to end with fake tools (state, resume, `--status`, `--stage`, `--from`, `--check`,
the manual writer, retries, render failures returned to the writer, the pull request text); and the
whole pipeline with the real tools on this machine via `bin/self-test.mjs` (scaffold, render, check,
Whisper, shoot, thumbnail, build, verify), including a planted violation stopping the run and a
resume after the fix. The read-only gates were also run against the pilot (it predates them: its
guest lines carry no source comments and it uses `@made.a.website`-style names on real TLDs).

Not exercised: the claude writer producing anything (its command line and permissions are unit
tested; one trivial call reached the CLI but this machine's login had expired); either workflow on
GitHub; a real week's scrape through to a pitch; `--network` against the live API; the verbatim-thread
gate against the scraper's real thread section, which is still being added (the digest reader looks
for any object with a root and an ordered posts list).
