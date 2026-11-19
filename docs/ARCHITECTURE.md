# Architecture

The Late Cluster started as one package in another monorepo that held exactly one episode.
This document describes the structure that turns it into a weekly show: a reusable studio,
one folder per episode, committed builds, and the supporting machinery around them.

It is the contract between the parts. If you change a path, a command or a file format named
here, change this document in the same commit.

## Goals

1. **A new episode is content, not plumbing.** Making episode N means adding one folder under
   `episodes/`. Nothing in the studio changes unless the episode needs a new prop or shot.
2. **Published episodes are frozen.** Each episode's build is committed. Deploying never
   rebuilds anything, and the studio can keep changing without breaking last month's show.
3. **One repo for the whole operation.** The studio, the episodes, the Bluesky scraper, the
   Bluesky bot and the weekly production pipeline live side by side and share conventions.
4. **A weekly cadence that a human can trust.** The pipeline does the labour. A person approves
   what airs, because the show jokes about real people.
5. **Taste is written down, and allowed to change.** The design bible in `docs/bible/` says what
   a good episode is, so that a writer who has never seen the show, human or model, can make
   one. It has a short constitution that only the owner changes, and DNA that each episode may
   amend.

## Layout

```
the-late-cluster/
  package.json               npm workspaces (packages/*), root commands
  show.config.json           show-wide settings: the public site URL, the show's Bluesky account
  .secrets                   local secrets, gitignored (.secrets.example is the template)
  terraform/                 Cloudflare DNS for the show's domain
  brand/                     the show's Bluesky avatar (avatar.png, from npm run avatar)
  CLAUDE.md                  working rules for agents in this repo
  .claude/agents/            the subagent roles: researcher, writer, reviewer, builder
  docs/
    ARCHITECTURE.md          this file
    WORKFLOW.md              how an episode is made, stage by stage, and who may read what
    bible/                   the design bible
    ledger/                  what the show has done, by episode, and the featured tracker (reviewers only)
  reports/                   research reports that informed decisions here
  research_notes/            the sourced notes behind each report
  packages/
    show/                    @late-cluster/show: the studio (runtime + offline tools)
    site/                    @late-cluster/site: the archive index page generator
    scraper/                 @late-cluster/scraper: weekly Bluesky digest
    bot/                     @late-cluster/bot: the show's Bluesky account
    writers-room/            @late-cluster/writers-room: the weekly production pipeline
  episodes/
    001-pilot/               one folder per episode (source)
  dist/
    episodes/001-pilot/      one folder per published episode (committed build)
  data/                      scraper output (gitignored)
  preview/, shots/, video/   draft preview builds, review frames, video exports (gitignored)
  scripts/                   repo-level commands, Node builtins only
  .github/workflows/         ci.yml, deploy.yml, weekly-episode.yml
```

## The studio: `packages/show`

Everything reusable across episodes: the CHIMERA engine and heads, the stage and set, shots,
costumes, the drawing kit and shared props, the `show` API, the transport bar, the title and
end cards, the vendored `chimera/` modules, the fonts, and the offline tools (`tools/render.ts`,
`check.ts`, `analyze.ts`, `shoot.mjs`, `video.mjs`).

It also keeps the two reference segments, `demo` and `kit-tour`, as a small **reference
episode** at `packages/show/reference/`, addressed as `ref` wherever a command takes an
episode. It has the same shape as a real episode, its rendered audio is committed, and it is
never built into `dist/`. Its `episode.json` has `number: 0` and `status: "draft"`. It is the
fixture the tools are tested against and the place to try a new prop or shot.

The studio owns the **house cast** (`src/cast.js`, `src/looks.js`): Larry, Sibyl, Hy Oid and
the Formants, and Eppy. Anyone else, guests and bots alike, is defined by the episode that uses
them, in its own `cast.js` and `looks.js`. One resolver, `src/roster.js`, gives the page and every
tool the cast and looks for an episode id: the house, then any legacy entry keyed to that id, then
the episode's own files. `src/legacy/` holds the first episode's cast (its four guests and its
website bot) keyed to `001-pilot`, only because that episode has no `cast.js` of its own and its
source is frozen; no other episode sees those ids.

The studio must not contain episode content: no rundown, no episode segments, no episode audio.

**The seam.** The page never reads episode files by path. A Vite plugin
(`packages/show/vite/episode.js`) generates the module `virtual:late-cluster/episode` for the
episode the dev server or build was started for: the `episode.json` fields, one lazy chunk per
segment, and the episode's optional cast and looks. Two import aliases complete it:

- `@late-cluster/show/<path>` is `packages/show/src/<path>`. Episodes import studio code this
  way, never by relative path.
- `@late-cluster/episode/<path>` is the current episode's folder.

Every command and tool resolves an episode's paths through one module,
`scripts/lib/episodes.mjs`. Rendered clips are cached in `packages/show/tools/.cache/`
(gitignored), shared by all episodes because the cache keys are content hashes.

The end-card credits list who appears in the episode: every character with a line, plus each
segment's `cast` and `guests`.

## An episode: `episodes/<id>/`

The id is `NNN-slug`: a zero-padded number and a short slug, for example `001-pilot`.
Commands accept `1`, `001` or the full id.

```
episodes/001-pilot/
  episode.json               metadata and the running order
  segments/<seg>/script.js   written: dialogue, songs, sfx, named cues
  segments/<seg>/index.js    written: direction (shots, puppets, graphics)
  segments/<seg>/cues.json   generated by render; committed (the build bundles it)
  cast.js, looks.js          optional: guests and looks only this episode uses
  thumbnail.jpg              the card image for the archive page and link previews
  production/                the pipeline's working papers: briefs, cards, ideas, scores,
                             verdicts, drafts, plan.json, sources.json, scorecard.md,
                             state.json (see "The weekly pipeline")
  public/audio/<seg>.mp3     generated by render; gitignored
  public/tele/<seg>.bin      generated by render; gitignored
```

`episode.json`:

```json
{
  "id": "001-pilot",
  "number": 1,
  "slug": "pilot",
  "title": "Pilot",
  "description": "One or two sentences for the archive page and link previews.",
  "airDate": "2026-11-13",
  "week": "2026-W46",
  "status": "published",
  "rundown": ["cold-open", "monologue", "weather", "top-chicken", "built-or-bit", "panel", "song", "goodnight"]
}
```

`status` is `draft` or `published`. A draft is in production: it does not need a build and is
not listed on the site. `week` is the ISO week the episode covers and may be omitted.

Segment authoring is unchanged from the original package: the script format, the module
shape and the `show` API are documented in `packages/show/README.md` and
`packages/show/tools/README.md`.

## Builds are committed: `dist/episodes/<id>/`

`npm run build -- <id>` produces a self-contained static site for one episode: the bundled
studio as it was at build time, the episode's segments, its audio and telemetry, the fonts,
`thumbnail.jpg`, and a manifest `episode.json`.

The manifest is the source `episode.json` plus a `build` object:

```json
{ "build": { "sourceHash": "sha256 of the episode's source inputs", "studioHash": "sha256 of the studio's source" } }
```

`sourceHash` covers `episode.json`, `cast.js`, `looks.js`, `thumbnail.jpg` and every file in
the rundown segments' folders, skipping names that start with a dot. It does not cover
`production/`. It lets `npm run verify` detect, with Node builtins only, a
build that no longer matches its source. `studioHash` records which studio the episode was
built with and is never compared: studio changes do not make a build stale. That is the
point. A published episode keeps the studio it was built with. The manifest carries no
timestamps, so the same inputs always produce the same build.

**The rendered audio and telemetry are committed once, in `dist/`.** They are about 12 MB per
ten-minute episode, and committing them in both source and build would double the repo's
growth. `episodes/<id>/public/` is therefore gitignored. The dev server serves audio and
telemetry from `episodes/<id>/public/` when a fresh render is there, and falls back to
`dist/episodes/<id>/` otherwise, so a clean checkout can play and edit any published episode
without re-rendering.

A build never deletes the audio it depends on: it is made in a temporary sibling folder,
the existing audio and telemetry are carried into it when there is no fresh render, and it is
swapped into place only when complete.

Only a `published` episode can be built into `dist/`, and it needs a `thumbnail.jpg`. A draft
is built with `npm run build -- <ep> --preview` into `preview/<id>/`, which is gitignored.

Absolute URLs in a build (the Open Graph image and page URL) come from `siteUrl` in
`show.config.json`, never from the environment, so a committed build does not depend on who
built it. While `siteUrl` is empty those tags are relative.

Consequences to keep in mind:

- After re-rendering a segment, rebuild before committing. Otherwise the committed
  `cues.json` and the committed audio disagree. `npm run verify` catches this through
  `sourceHash`.
- Rebuilding an old episode re-bundles it with today's studio. Do that only on purpose.

### Size budget

GitHub Pages sites are limited to about 1 GB and repositories are expected to stay near that.
At 12 MB an episode, a weekly show reaches the limit in roughly a year and a half. Options,
in the order we would reach for them: shorter weekly episodes (five minutes is a better
length for a weekly anyway), a lower mp3 bitrate, coarser telemetry, and moving finished
seasons to an archive repository with its own Pages site. This is not solved yet. See the
roadmap.

## Commands

All from the repo root. `<ep>` is an episode number or id, or `ref` for the studio's reference
episode. `<seg>` is a segment id.

| command | what it does |
|---|---|
| `npm run episode:new -- --title "..." [--week 2026-W47]` | scaffold the next episode as a draft, from templates |
| `npm run segment:new -- <ep> <seg>` | add a segment skeleton to an episode and its rundown |
| `npm run dev -- <ep>` | dev server for one episode |
| `npm run render -- <ep> <seg>...` | render audio, telemetry and cues (bun + ffmpeg) |
| `npm run check -- <ep> [<seg>...]` | verify rendered outputs against the contract |
| `npm run shoot -- <ep> <seg> <t>...` | frozen frames to PNG for review (Playwright) |
| `npm run thumbnail -- <ep> [<seg> <t>]` | shoot a frame into `thumbnail.jpg`: the title card, or a moment of a segment |
| `npm run avatar [-- --variant a\|b\|c] [--out file] [--candidates]` | render `brand/avatar.png`, the show's Bluesky profile picture, from the host puppet (Playwright); `--candidates` writes all three to `preview/_avatar/` with a contact sheet |
| `npm run build -- <ep> [--preview]` | build into `dist/episodes/<id>/`, or a draft into `preview/<id>/` |
| `npm run verify` | committed builds match their sources (Node builtins only) |
| `npm run site` | generate the archive index into `dist/` (ignored, never committed) |
| `npm run preview` | generate the index, then serve `dist/` locally |
| `npm run scrape -- [--week 2026-W47 \| --days 7 \| --since <date> [--until <date>]] [--out <dir>]` | write the Bluesky digest into `data/`; no window flag means since the previous aired episode |
| `npm run lookup -- --uri\|--url\|--text\|--author\|--story\|--thread <value> [--dir <digest>]` | print exact post records from the newest (or a given) digest |
| `npm run bot -- announce <ep> [--live]` | compose the announcement post; dry run unless `--live` |
| `npm run bot -- profile [--avatar <file>] [--live] [--no-backup]` | set the account's profile picture (`avatar` in `bot.config.json`); dry run unless `--live` |
| `npm run bot -- dm send <handle-or-did> --file <path> [--live]` | send interview questions by direct message; dry run unless `--live` |
| `npm run bot -- dm read <handle-or-did> [--limit 50] [--json]` | read that conversation; logs in, changes nothing |
| `npm run produce -- --week 2026-W47 [--status \| --check <stage> [--segment <seg>] \| --find "…" \| --from <stage> \| --rework <task> \| --exclude <id>] [--runner manual\|headless\|fixture] [--preview-only]` | drive one episode through the eleven stages; `--status` lists the subagents to spawn; `--preview-only` never publishes |
| `node packages/writers-room/bin/end-to-end.mjs` | all eleven stages with the real tools and prepared subagent outputs, then remove every trace |
| `npm run terraform -- <args>` | run Terraform in `terraform/` with the token loaded from `.secrets` |
| `npm test` | every package's tests (Node builtins only: no install, no browser) |

Exit codes are the same everywhere: `0` done, `1` refused or failed (a missing render, a stale
build, a draft built into `dist/`), `2` bad arguments or an unknown episode or segment. Errors
print as `error: ...`. `build` prints one line,
`built <id> <dir> segments= public= carried= sourceHash=`, and `verify` prints `ok <id>` or
`FAIL <id>: ...` per episode and then a summary.

Two studio tools have no root command and are run directly: `bun packages/show/tools/analyze.ts`
(loudness, voices, the Whisper intelligibility pass) and `node packages/show/tools/video.mjs`
(video exports into `video/<id>/`). Review frames from `shoot` go to `shots/<id>/<seg>/`.

## The site and deployment

The Pages site is the `dist/` directory:

```
/                          the archive: every published episode, newest first
/episodes/001-pilot/       an episode
```

`packages/site` generates the archive from the manifests in `dist/episodes/*/episode.json`:
`dist/index.html`, `dist/episodes.json`, `dist/latest/` (a redirect to the newest episode)
and `dist/site-assets/`. Those four paths are gitignored and are the only things it writes. `deploy.yml` runs on every
push to `main`: `npm run verify`, `npm run site`, upload `dist/`. No dependency install, no
episode build, no browser. `ci.yml` runs the same checks and the tests on pull requests.

## The scraper: `packages/scraper`

Reads public Bluesky through the public AppView API and writes a digest of one window: what
the cluster talked about, what got built, what was popular, and who said it. No dependencies
and no credentials by default. `packages/scraper/README.md` has the detail.

- **Window.** By default, from the previous aired episode's air date (read from the ledger and
  the episode's `airDate`) to now; else the last complete ISO week. `--week`, `--days` and
  `--since`/`--until` choose another.
- **Who the cluster is.** Seeds, by DID: whoever the show's Bluesky account follows, read fresh
  every run, plus the bootstrap list in `config/cluster.json`, each with its reason. Accounts
  near the seeds qualify on signals that do not depend on the seeds alone: seed follows,
  interactions, a community's public roster (Top Chicken's), the community feed, lists. The
  show's history plays no part in who is a seed.
- **Consent.** The opt-out list (`config/optout.json`, prefer DIDs), the `!no-unauthenticated`
  label and self-declared opt-outs are applied in the code path: such accounts never reach an
  output file.
- **Output** in `data/weeks/<week>/` (gitignored) or `--out`: `posts.jsonl`; `digest.json`
  (ranked stories, sections, members, authors, the ledger it read, coverage); `digest.md` for a
  writer with ten minutes; `coverage.md` for the scope review (worries against thresholds,
  how members qualified, concentration, new and gone, the cluster against the roster, the feed
  and the community's own checker, suggested seeds).
- **Reach** stands in for views: per post and story, the separate counts, participants, and
  a score with weights in `config/scoring.json`. The pipeline uses the same score.
- **Sections:** community games (Top Chicken standings with streaks, the record and history),
  built this week, about the show, new voices (never featured), interview material
  (question-and-answer pairs, each answer a member's real reply), performable threads.
- **The ledger** (`docs/ledger/`) marks each author `featuredPrevious`, `featuredEarlier` and
  `timesFeatured`, by DID, counting aired episodes only. It never ranks anyone up.
- **Lookup:** `npm run lookup` prints exact records (by URI, URL, text, author, story or
  thread), so agents never read `digest.json` whole.
- What an episode actually used is recorded in `episodes/<id>/production/sources.json`.

## The bot: `packages/bot`

The show's Bluesky account. Its first job is to announce a published episode with a link card.
It is dry-run by default and posts only with `--live` and credentials in the environment
(`BSKY_HANDLE`, `BSKY_APP_PASSWORD`). Later jobs, such as handling opt-out requests sent to the
account, are on the roadmap.

`profile` sets the account's avatar and nothing else: it keeps every other field of the
profile record, writes with `swapRecord` so a concurrent change is refused, and first saves
the picture it replaces to `data/bot/` (gitignored). `dm send` and `dm read` interview one
person by direct message through the chat service (`atproto-proxy: did:web:api.bsky.chat#bsky_chat`);
they need an app password with direct-message access, refuse anyone on the scraper's opt-out
list, and send plain text only, never a mention or link. Message text is private: it lives
only in the terminal and the gitignored `data/bot/dm/`, never in anything committed. `dm read`
never marks a conversation read and never creates one. Both live commands refuse unless the
session's DID is `bluesky.did` in `show.config.json`.

## The weekly pipeline: `packages/writers-room`

`docs/WORKFLOW.md` is the contract for how an episode is made; this package implements it.
The work is done by subagents driven by one project manager. The tool is the deterministic
backbone between them and **never calls a model**: it writes one brief per subagent task,
waits for the task's files, combines what several subagents wrote independently with recorded
arithmetic, and runs the gates.

| # | stage | subagents (role), in waves | the tool |
|---|---|---|---|
| 1 | scope | 1 reviewer | scrapes if there is no digest; coverage figures |
| 2 | research | 1 researcher per lane; then 1 reviewer screens | reach per card; the longlist |
| 3 | brainstorm | 3 writers, independently | merges the ideas |
| 4 | rank | 2 reviewers; 2 reviewers for synergy and variety; 1 reviewer proposes the experiment | weighted scores; the shortlist |
| 5 | repetition (ideas) | 2 reviewers with the ledger; a writer per repeat | strictest verdict; people rules |
| 6 | draft | 1 writer per shortlisted card and per standing segment (interview, Top Chicken, music) | |
| 7 | select | 2 reviewers score; 2 judge repetition; a writer per repeat | the selection, `plan.json`, the inheritance copy |
| 8 | assemble | 1 writer | copies the drafts in; render, `check`, Whisper |
| 9 | stage | 1 builder per segment; then 1 reviewer on the frames | |
| 10 | build | none | thumbnail, build (`--preview` for a trial), `verify` |
| 11 | review | 1 reviewer | the pull request text |

Everything an episode's production writes is under `episodes/<id>/production/`, so a run can
stop, be inspected and resume; `state.json` records statuses and gate results, never
timestamps. Briefs are `production/briefs/<stage>/<task>.md`: the role, the task, the one
place to write, what to read and not to read, and the command that checks it. A repeat at the
repetition gate creates a rework task and then fresh verdicts on the new version. A
reviewer's send-back is a valid end of a stage: it names the stage that can fix it, and the
run returns there.

**Runners.** `manual` (the default): the run stops and `produce --status` lists the subagents
to spawn, each from its brief (`playbooks/project-manager.md`). `headless`: each brief goes to
`claude -p --agent <role>` with that role's permission rules; the weekly workflow uses it.
`fixture`: prepared outputs, for tests and `bin/end-to-end.mjs`, which runs all eleven stages
with the real tools. The runner is remembered per run.

**Roles.** `.claude/agents/` defines `researcher`, `writer` and `reviewer` on the latest Fable
and `builder` on the latest Opus, with the standing rules of WORKFLOW's role and visibility
tables. Writers, researchers and builders never see the ledger or earlier episodes; reviewers
do. That is enforced by the briefs, by a guard hook on the three roles
(`packages/writers-room/bin/guard.mjs`, a tripwire, not a wall), and by the repetition gate,
which catches what slips through.

**Gates** do not depend on a model's judgement. Among them: cards quote posts exactly and carry
no jokes; every card has ideas from two writers; every judgement has two reviewers; the
**repetition gate** (fresh, turned or repeat; any repeat blocks; at most one turned item from
the previous episode); the **people rules**, by DID against aired episodes only (nobody who
spoke in the previous aired episode speaks; the accounts on screen are mostly new over the
last few aired episodes; a warning, not a block, for anyone featured too often); the standing
segments; every real line verbatim, in its own context, after a staged setup that recreates
it; **heard text** (an alarming word in Whisper's transcript fails whatever the score; an
out-of-bounds word or a misheard real name fails until a waiver quotes it); **unread text**
(nothing longer than a glance on screen unless it is spoken); **credits** (the end card names
the real accounts whose personas were played and says every voice is synthesized); studio
imports only; the constitution unchanged; the scorecard complete and the verdict following
it; the ledger entry and the tracker agreeing with who is on screen.

The review stage writes `production/pr-title.txt` and `production/pr-body.md`. The pipeline
never commits, pushes, deploys or announces. `weekly-episode.yml` runs it with the headless
runner, preview only by default, and opens the pull request with the episode, `docs/bible/`
and `docs/ledger/`. It is manual-dispatch only until a few runs have produced episodes worth
airing. Announcing is a separate, manually dispatched workflow.

Then a person watches the whole episode with sound. The show puts words in the mouths of
puppets that stand for real accounts. Nothing airs without a person having read it.

## Configuration and secrets

The two are kept apart.

**Configuration is committed.** Anything that is not secret lives in a file in git, so it is
reviewable and the same for everyone: `show.config.json` (the site URL and the show's Bluesky
handle and DID), each package's own `config/` folder (the scraper's cluster, scoring, safety
and opt-out lists; the bot's wording), and `terraform/terraform.tfvars` (the zone and its
records).

**Secrets come only from the environment** and are never written to a tracked file, a log
or a build. There are three: `CLOUDFLARE_API_TOKEN` (Terraform), `BSKY_APP_PASSWORD` (the
bot, live mode only) and the model credential the weekly pipeline's writer uses. Locally
they live in `.secrets` at the repo root, which is gitignored, and the root commands that
need one load that file themselves (`npm run terraform`, `npm run bot`, `npm run produce`).
In GitHub Actions the same names are repository secrets.

A value belongs in `.secrets` only if leaking it would let someone act as the show. A handle,
a domain, a zone id and a DID are all public facts and are configuration.

## Infrastructure: `terraform/`

The show's domain is `simcluster.tv`, with DNS on Cloudflare, managed by the Terraform
configuration in `terraform/` (see its README). It manages records in an existing zone: the
site's hostname, GitHub's domain verification record, one verification record per Bluesky
handle, redirects from a hostname to a URL, and any other record through a general variable. The zone's real values are committed
in `terraform/terraform.tfvars`.

- Run it with `npm run terraform -- plan` and `npm run terraform -- apply`, which load the
  token from `.secrets`.
- State is local for now (`terraform/terraform.tfstate`, gitignored). Moving it to Cloudflare
  R2 is the next step and is documented there.
- `terraform.yml` checks format, validity and the mocked-provider tests on pull requests that
  touch `terraform/`. It never plans or applies.
- The site's host is a seam in the configuration, so the site can move from GitHub Pages to
  Cloudflare Pages without rewriting the records. That is one way out of the size budget
  above for the published site, though not for the repository's own growth.

## How the show stays able to change

Projects lose flexibility after their first formation, and a bible written from one pilot
hardens into a recipe for remaking it. Three mechanisms push the other way.

- **Two layers.** The constitution is `docs/bible/00-constitution.md` and
  `docs/bible/09-real-people.md`: only include it if it's interesting; use people's words in
  their own context and never put words in their mouths; be honest on screen about what the
  show is; the show's own review signs off before publishing. Only the owner changes it, and
  the pipeline fails any run in which either file changed. Everything else in the bible is
  DNA.
- **Every episode runs one experiment.** A reviewer, who can see what the show has tried,
  proposes it at the rank stage in `production/experiment.md` with a measure someone else can
  check; the file says only what to try. The final review judges it, and when it works the
  same pull request edits the DNA chapters, so the change to the show is approved together
  with the episode. Git history is the lineage.
- **Writers start from the community, not from the show.** Writers, researchers and builders
  cannot read the ledger or earlier episodes; reviewers can, and block repeats. Anything
  carried forward is named by the select reviewers with a reason, and the pipeline copies
  exactly those files into `production/inherited/` as reference. Earlier source stays in the
  repo so builds remain verifiable; it is hidden from those roles, not deleted.

The studio follows the same idea: a prop, shot or helper enters `packages/show` only once a
second episode needs it. Until then it lives with the episode that made it. The pilot's
single-use props are a known exception. The house cast and the studio are kept for now by the
owner's choice, which is recorded in the DNA, not the constitution.

## Decisions

- **Episodes are folders of content, not packages.** One command surface for every episode
  beats a `package.json` and Vite config per episode.
- **A build freezes the studio.** Simpler and safer than a versioned shared runtime. The cost
  is about 2 MB of repeated engine per episode.
- **Rendered assets live only in `dist/`.** See the size budget.
- **Site, scraper, bot and verify use Node builtins only.** CI and deploy need no install,
  and the supporting packages cannot break each other through a shared lockfile.
- **The site URL is committed configuration, not environment.** Otherwise two people
  building the same episode would commit different pages and `verify` could not tell.
- **Subagents make the episode; a person approves it.** See "The weekly pipeline".

## Roadmap

1. Reusable segment formats: lift the direction patterns of the pilot's monologue, desk piece
   and panel into parametrized directors so a routine segment needs little or no new code.
2. Size: decide episode length and encoding against the budget above.
3. Consent tooling: opt-out by replying to the bot, and a public page saying how the show
   sources material and how to be left out.
4. A feed (RSS or Atom) and per-episode video cuts for posting natively to Bluesky.
5. Turn on the weekly schedule.
