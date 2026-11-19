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
5. **Taste is written down.** The design bible in `docs/bible/` says what a good episode is, so
   that a writer who has never seen the show, human or model, can make one.

## Layout

```
the-late-cluster/
  package.json               npm workspaces (packages/*), root commands
  show.config.json           show-wide settings: the public site URL, the show's Bluesky account
  .secrets                   local secrets, gitignored (.secrets.example is the template)
  terraform/                 Cloudflare DNS for the show's domain
  CLAUDE.md                  working rules for agents in this repo
  docs/
    ARCHITECTURE.md          this file
    bible/                   the design bible
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

The studio owns the **house cast** (`src/cast.js`, `src/looks.js`): Larry, Sibyl, the Formants,
Eppy, the website bot, and recurring guests. An episode can add one-off guests of its own.

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
  production/                the pipeline's working papers: pitch.md, sources.json,
                             scorecard.md, state.json (see "The weekly pipeline")
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
| `npm run build -- <ep> [--preview]` | build into `dist/episodes/<id>/`, or a draft into `preview/<id>/` |
| `npm run verify` | committed builds match their sources (Node builtins only) |
| `npm run site` | generate the archive index into `dist/` (ignored, never committed) |
| `npm run preview` | generate the index, then serve `dist/` locally |
| `npm run scrape -- [--week 2026-W47]` | write the weekly Bluesky digest into `data/` |
| `npm run bot -- announce <ep> [--live]` | compose the announcement post; dry run unless `--live` |
| `npm run produce -- --week 2026-W47` | run the weekly pipeline for one episode, stage by stage |
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

Reads public Bluesky through the public AppView API and writes a weekly digest: what the
cluster talked about, what got built, what was popular, and who said it. No dependencies and
no credentials by default.

- Input: `packages/scraper/config/` names the seed accounts, feeds, lists and search terms that
  define the cluster, and an opt-out list of accounts that must never appear.
- Output: `data/weeks/<week>/posts.jsonl` (normalized posts), `digest.json` (ranked stories
  with post URIs, authors and engagement) and `digest.md` (the same, written for a writer).
- `data/` is gitignored. What an episode actually used is recorded in
  `episodes/<id>/production/sources.json`.

## The bot: `packages/bot`

The show's Bluesky account. Its first job is to announce a published episode with a link card.
It is dry-run by default and posts only with `--live` and credentials in the environment
(`BSKY_HANDLE`, `BSKY_APP_PASSWORD`). Later jobs, such as handling opt-out requests sent to the
account, are on the roadmap.

## The weekly pipeline: `packages/writers-room`

A week's episode moves through fixed stages. Each stage reads the previous stage's files and
writes its own, so a run can stop, be inspected, and resume.

| stage | made by | output |
|---|---|---|
| 1. scrape | scraper | `data/weeks/<week>/digest.{json,md}`, then the episode folder is scaffolded as a draft |
| 2. pitch | writer (model) | `production/pitch.md` and `production/plan.json`: stories, angles, rundown, formats, the song's genre and theme, guests, the runner |
| 3. write | writer (model) | `segments/*/script.js`, validated by the renderer |
| 4. render | tools | audio, telemetry, `cues.json`; `check` and the Whisper intelligibility pass |
| 5. direct | director (model) | `segments/*/index.js`, reviewed against shot frames |
| 6. build | tools, writer | `thumbnail.jpg`, `dist/episodes/<id>/`, `verify`; then `production/scorecard.md` and the episode's entry in `docs/bible/lore.md` |
| 7. review | **a person** | a pull request: read the scripts, watch the preview, merge or send back |
| 8. publish | deploy + bot | Pages deploy on merge, then the announcement |

The pipeline's own stage names are `scrape`, `scaffold`, `pitch`, `write`, `render`, `direct`,
`build`, `self-check` and `pr`. The last one writes `production/pr-title.txt` and
`production/pr-body.md` for the workflow to open the pull request with; the pipeline itself
never commits, pushes, deploys or announces. `plan.json` is the machine-readable plan that
the freshness checks compare with earlier episodes: the song's genre must differ from the
previous episode's, and other repeats are warnings a writer can answer with a reason.

The creative stages are done by Claude Code running headless with the playbooks in
`packages/writers-room/playbooks/` and the design bible. The deterministic stages are plain
commands, and between stages the pipeline runs gates that do not depend on a model's
judgement: scripts validate, guest lines carry their source, invented handles cannot resolve,
no opted-out account appears, frames render without errors. `production/state.json` records
where a run is, so it can stop and resume. `production/sources.json` records every real
account and post the episode used.

`weekly-episode.yml` runs stages 1 to 6 and opens the pull request. It is manual-dispatch
only until a few runs have produced episodes worth airing; then the cron schedule in the file
can be switched on. Announcing is a separate, manually dispatched workflow.

Stage 7 is not optional. The show puts words in the mouths of puppets that stand for real
accounts. Nothing airs without a person having read it.

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
- **The model writes; a person approves.** See stage 7.

## Roadmap

1. Reusable segment formats: lift the direction patterns of the pilot's monologue, desk piece
   and panel into parametrized directors so a routine segment needs little or no new code.
2. Size: decide episode length and encoding against the budget above.
3. Consent tooling: opt-out by replying to the bot, and a public page saying how the show
   sources material and how to be left out.
4. A feed (RSS or Atom) and per-episode video cuts for posting natively to Bluesky.
5. Turn on the weekly schedule.
