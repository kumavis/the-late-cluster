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
  brand/                     the show's Bluesky avatar and banner (avatar.png, banner.png, from npm run avatar and npm run banner)
  CLAUDE.md                  working rules for agents in this repo
  .claude/agents/            the subagent roles: researcher, writer, reviewer, builder
  docs/
    ARCHITECTURE.md          this file
    WORKFLOW.md              how an episode is made, stage by stage, and who may read what
    voice-research.md        words the voices find hard (generated from packages/show/tools/data/voice-research.json)
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
`check.ts`, `analyze.ts`, `fit.ts`, `sounds.ts`, `voice-research.mjs`, `voices.ts`, `shoot.mjs`, `video.mjs`), with the
data they cannot regenerate in `tools/data/` (the pronunciation dictionary, the heard-word lists, the
voice research file).

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
website bot) and the two pieces of its text the drawing code once hard-coded (the counter's label,
the key cap's letter; neutral by default in `src/stage/text.js`) keyed to `001-pilot`, only because that episode has no `cast.js` of its own and its
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
| `npm run render -- <ep> --draft <slug>` | render a draft (`production/drafts/<slug>/`, its `cast.js` over the episode's) into `packages/show/tools/.cache/drafts/` (gitignored), never into the episode; `check` and `analyze.ts whisper` take `--draft` too |
| `npm run check -- <ep> [<seg>...]` | verify rendered outputs against the contract |
| `npm run fit -- <ep> <seg> \| --draft <slug> [--json] [--apply] [--sounds]` | the fitting tool: render and transcribe every line several times, search respellings without changing words (a spelling the voice research file says works in that voice first; for a dictionary word only one whose phonemes, by the engine's G2P, keep the vowels and consonants of one of its readings, `packages/show/config/sounds.json`), report per line (`ok`, `weak`, `flagged`, `unsayable`: descriptions), the lines for the owner first and real people's lines heard differently last; `--json` writes `fit.json` beside the script, `--apply` writes only `as` fields; a script's own `as` that changes a dictionary word's sounds is listed, not blocked; `--sounds` runs only that check, with no rendering or Whisper, lists the words with two readings apart, and exits 0; exit 1 only if a line is heard as something alarming, out of bounds or crude |
| `npm run voice-research -- <ep> --draft <slug> \| --drafts \| <seg> [--add <word> --line <id> --status … --note "…" \| --pattern "…"] [--dry-run]`, `-- --page` | the voice research file (`packages/show/tools/data/voice-research.json`, committed): harvest working spellings from `fit.json`, list the lines still hard, record a hard word or a pattern by hand (never a name), and regenerate `docs/voice-research.md`; `-- --sounds` (bun) marks every working spelling whose sounds are not the word's as `misleads` (the transcription accepts it, a listener does not); exit 1 while a hard line is unrecorded (node, nothing installed) |
| `npm run voices -- <ep> [--drafts] [--rule <id>:<rule>] [--dry-run] [--json]` | give every guest (of the episode, and with `--drafts` of every draft together) a voice at least 1.5 from the house and each other, and write the cast entries |
| `npm run shoot -- <ep> <seg> <t>... [--caption-scale <n>]` | frozen frames to PNG for review (Playwright); `--caption-scale` draws the caption bar larger, as the phone cut does (`?capscale=` on the page; frames named `…@<t>-cs<n>.png`) |
| `npm run thumbnail -- <ep> [<seg> <t>]` | shoot a frame into `thumbnail.jpg`: the title card, or a moment of a segment |
| `npm run avatar [-- --variant a\|b\|c] [--out file] [--candidates]` | render `brand/avatar.png`, the show's Bluesky profile picture, from the host puppet (Playwright); `--candidates` writes all three to `preview/_avatar/` with a contact sheet |
| `npm run banner [-- --variant a\|b\|c] [--out file.png] [--candidates]` | render `brand/banner.png`, the account's banner: the title over the set's skyline, no host (Playwright); 3000×1000 PNG, or 1500×500 when the larger is over Bluesky's 1,000,000 bytes; refused if the title is under the profile picture or a phone button or under 140 points wide on a phone; `--candidates` writes all three to `brand/candidates/` with `banner-sheet.png` (each as a desktop and a phone profile) |
| `npm run build -- <ep> [--preview]` | build into `dist/episodes/<id>/`, or a draft into `preview/<id>/` |
| `npm run verify` | committed builds match their sources (Node builtins only) |
| `npm run site` | generate the archive index into `dist/` (ignored, never committed) |
| `npm run preview` | generate the index, then serve `dist/` locally |
| `npm run scrape -- [--week 2026-W47 \| --days 7 \| --since <date> [--until <date>]] [--out <dir>]` | write the Bluesky digest into `data/`; no window flag means since the previous aired episode |
| `npm run lookup -- --uri\|--url\|--text\|--author\|--story\|--thread <value> [--dir <digest>] [--fields a,b \| --full]` | print compact exact post records from the newest (or a given) digest |
| `npm run media -- --dir <digest> --uri <at://…>` | fetch a post's pictures, or a video's thumbnail, from Bluesky's public CDN into `<digest>/media/` and print paths and alt text |
| `npm run sources -- check <sources.json> [--dir <digest>] [--out <file.md>] [--json]` | the live source check: cited posts unchanged, accounts' bios, labels, pinned and recent posts; exit 1 when something needs a person |
| `npm run bot -- announce <ep> [--live]` | compose the announcement post; dry run unless `--live` |
| `npm run bot -- post <ep> --video <file.mp4> --text-file <file> [--alt-file <file>] [--captions <file.vtt>] [--lang en] [--aspect <w>:<h>] [--upload-only] [--live]` | post the episode's video (no mention, no link), uploaded as a stream to the video service; `--upload-only` uploads and keeps the blob for a later post; dry run unless `--live` |
| `npm run bot -- post --undo <post> [--live]` | delete one of the show's own posts (another account's is refused before any request); the dry run shows what goes with it; dry run unless `--live` |
| `npm run bot -- reply <post> --text-file <file> --episode <ep> [--live]` | reply under one of the show's own posts, tagging only accounts in `episodes/<ep>/production/sources.json`; dry run unless `--live` |
| `npm run bot -- profile [--only avatar\|banner\|description] [--avatar <file>] [--banner <file>] [--live] [--no-backup]` | set the account's profile picture (`avatar` in `bot.config.json`), banner (`banner` there, only if the file exists unless `--only banner`) and bio (`bluesky.profile.description` in `show.config.json`); the dry run compares the bio and the banner with the live ones; dry run unless `--live` |
| `npm run bot -- repost <post> [--live] [--undo]` | repost a post whose author is in `bluesky.repostAuthors`, or take the repost back; the dry run reads the post and prints the record; dry run unless `--live` |
| `npm run bot -- dm send <handle-or-did> --file <path> [--live]` | send interview questions by direct message; dry run unless `--live` |
| `npm run bot -- dm read <handle-or-did> [--limit 50] [--json]` | read that conversation; logs in, changes nothing |
| `npm run produce -- --week 2026-W47 [--status \| --check <stage> [--task <id> \| --segment <seg>] \| --find "…" \| --from <stage> \| --rework <task> \| --exclude <id>] [--runner headless\|manual\|fixture] [--preview-only]` | drive one episode through the thirteen stages; headless (the default where `claude` is signed in) stops only at a failure or a send-back; `--check … --task` prints one task's lines; `--preview-only` never publishes |
| `node packages/writers-room/bin/end-to-end.mjs` | all thirteen stages with the real tools and prepared subagent outputs, then remove every trace |
| `npm run terraform -- <args>` | run Terraform in `terraform/` with the token loaded from `.secrets` |
| `npm test` | every package's tests (Node builtins only: no install, no browser) |

Exit codes are the same everywhere: `0` done, `1` refused or failed (a missing render, a stale
build, a draft built into `dist/`), `2` bad arguments or an unknown episode or segment. Errors
print as `error: ...`. `build` prints one line,
`built <id> <dir> segments= public= carried= sourceHash=`, and `verify` prints `ok <id>` or
`FAIL <id>: ...` per episode and then a summary.

Two studio tools have no root command and are run directly: `bun packages/show/tools/analyze.ts`
(loudness, voices, the Whisper intelligibility pass) and `node packages/show/tools/video.mjs`
(video exports into `video/<id>/`; for the cut Bluesky serves to phones, `--soften box` filters
the posting cut in its own encode against Bluesky's unfiltered 3:1 downscale, `--caption-scale <n>`
scales the caption bar, `--poster <s>` puts that frame first as the poster, and `--preview-360` and
`--preview-720`, also on an existing file, write the streams a phone and a desktop get;
`packages/show/tools/README.md`, "For phones"). Review frames from `shoot` go to `shots/<id>/<seg>/`.
The sound editor's tools are `fit`, `voice-research` and `voices` (`packages/show/tools/README.md`,
"Fitting a script", "The voice research file" and "Giving guests voices"). Fitting is best effort
(the owner's ruling of 21 November 2026: subtitles carry the line): what the voice cannot say is
recorded in the voice research file and the line stays as written; only something heard that is
alarming, out of bounds or crude is never accepted. `voices` prints each guest's stated pronouns and applies the
owner's soft pronoun steer (`packages/show/config/voices.json`): a preference after distinctness,
off under a hand `--rule`; nothing reads a voice back as a statement about a person. `fit` caches every render and every transcription in
`packages/show/tools/.cache/`, so a re-run of an unchanged script takes seconds; it writes nothing
outside the script's own folder (`fit.json`, and `as` fields with `--apply`), and for a published
episode keeps `fit.json` in the cache. A studio tool given the path of an episode folder
(`…/episodes/<id>`) in place of `<ep>` works on that copy, so an episode on another branch can be
fitted from an extracted copy.

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
  label and self-declared opt-outs, direct or indirect (posts meant to disappear, "not to be
  quoted"), are applied in the code path: such accounts never reach an output file. Bios are
  kept only in the run's private data (`private/`, for the auditor), and wording that might be
  an opt-out marks the account `bioReview`.
- **Marks** are post by post: a keyword marks the post it is in (`sensitive`), and a consent
  matter marks it `consent`. A story is left out whole only for consent: an excluded account's
  thread, or a lead post that asks not to be quoted or is redacted.
- **Output** in `data/weeks/<week>/` (gitignored) or `--out`: `posts.jsonl`; `digest.json`
  (ranked stories, sections, members, authors, the ledger it read, coverage); `digest.md` for a
  writer with ten minutes; `coverage.md` for the scope review (worries against thresholds,
  how members qualified, concentration, new and gone, the cluster against the roster, the feed
  and the community's own checker, suggested seeds); `skeletons/`, a card skeleton per story
  with every post's exact text, author, counts, reply and quote, alt text, media addresses and
  marks; `lanes/`, the skeleton ids for each research lane (`made`, `talk`, `games`, `voices`,
  `interview`, `tagged`), ranked; `reviewers/`, what was said about the show, for reviewers only. The
  shapes are in the package README, "Skeletons and lanes".
- **The tagged lane** (package README, "The tagged lane"): a post by a member of the window's
  cluster that tags the show's account (a mention facet with its DID) and points at something that
  is not the show is a pointer, weighted by the tagger's membership score (normalised to 0..1, with
  a diminishing return per member; weights in `config/lanes.json` `tagged`). Tags from outside the
  cluster are counted, never listed; a tag only about the show stays with reviewers. Found in what
  was collected and by `searchPosts` with the `mentions` parameter on `api.bsky.app`; a pointed-at
  thread outside the digest is fetched (one request each, capped) and analysed apart, so a tag
  changes no story, score, rank or reach. Nothing replies to, likes or acknowledges a tag.
- **Pronouns** (package README, "Pronouns"): every account's stated pronouns, `{ text, forms,
  source }` from the profile's built-in field or an explicit bio statement, or `null` (none
  stated); a conflicting bio is none, marked for the auditor. Only the phrase crosses to other
  roles: authors, skeleton posts, lane entries, `npm run lookup`; `npm run sources` flags a change.
- **Reach** stands in for views: per post and story, the separate counts, participants, and
  a score with weights in `config/scoring.json`. The pipeline uses the same score.
- **Sections:** community games (Top Chicken standings with streaks, the record and history),
  built this week, about the show (moved to `reviewers/`), new voices (never featured), interview material
  (question-and-answer pairs, each answer a member's real reply), performable threads.
- **The ledger** (`docs/ledger/`) marks each author `featuredPrevious`, `featuredEarlier` and
  `timesFeatured`, by DID, counting aired episodes only. It never ranks anyone up.
- **Media:** `npm run media` fetches one digest post's pictures or video thumbnail from the
  public CDN for a researcher to look at; never a redacted, consent-marked or about-the-show post.
- **The live source check:** `npm run sources -- check` re-reads every post and account an
  episode's `sources.json` cites, over the network, and exits 1 when something needs a person.
- **Lookup:** `npm run lookup` prints compact exact records (by URI, URL, text, author, story or
  thread), so agents never read `digest.json` whole.
- What an episode actually used is recorded in `episodes/<id>/production/sources.json`.

## The bot: `packages/bot`

The command line for the show's Bluesky account. **It is a CLI, not an always-on bot**: a person
runs each command; nothing listens, schedules or replies by itself (the owner: "the scope of
"the bot" at present is just a cli, not an always on bot that responds"). Every command that
writes is a dry run by default and writes only with `--live` and credentials in the environment
(`BSKY_HANDLE`, `BSKY_APP_PASSWORD`). Handling opt-out requests sent to the account is on the
roadmap, as a command a person runs.

`announce` posts a published episode with a link card. `post` posts the episode's video: the
text carries no mention and no link; the file is checked (MP4 by its bytes, 300,000,000 bytes,
600 s and pixel size by `ffprobe` when it is on the PATH, else `--aspect`), streamed to the video
service (host and DID in `bot.config.json`) with service auth tokens from the PDS, and polled
until processed; nothing is posted unless every step before succeeded. The upload is the one
request that does not use `fetch`: Node's fetch has a fixed 300 s headers timeout that would
kill a slow upload mid-write, and changing it needs the `undici` package, which is not
installed. It goes by `node:https` with an explicit `Content-Length`, no overall time limit,
and a stall limit (`video.stallSeconds`, default 120 s without a byte written). The service's
upload answer is a job status at the top level; `getJobStatus` wraps it; both are read.
`post --undo` deletes one of the show's own posts with `deleteRecord`, logs it to
`data/bot/posts.jsonl`, and leaves the stored upload alone. A processed blob is kept
in the gitignored `data/bot/video-uploads/<sha256>.json`, so `--upload-only` and a later post, or
a run after a timeout, do not upload again. `reply` is the only command that mentions anyone, on
the owner's ruling of 21 November 2026 ("The bot tags only the accounts that appear in the
episode a post is about"): only under the show's own posts, only accounts in that episode's
`production/sources.json` with the DID on record there, each handle re-resolved at run time and
refused if it moved, nobody on the opt-out list, and no links. Posts and replies are logged to
`data/bot/posts.jsonl` and `data/bot/replies.jsonl`.

`profile` sets the account's avatar, banner and bio (`description`) and nothing else (`--only`
picks one; the banner is skipped, with one line saying so, while its file does not exist): it
keeps every other field of the profile record, writes with `swapRecord` so a
concurrent change is refused, and first saves what it replaces (the picture, or the whole
record when the bio changes) to `data/bot/` (gitignored). The bio is committed, in
`bluesky.profile` in `show.config.json`; it is held to the lexicon's 256 graphemes and 2560
bytes, and may name an account as `@handle` only if that handle is in
`bluesky.profile.credited`. Its dry run reads the live record, unauthenticated, to show
whether the bio would change. `repost` reposts only posts whose author's DID is in
`bluesky.repostAuthors` (the committed list is how the owner allows an account) and who is
not on the scraper's opt-out list; its dry run reads the post from the public AppView
without logging in, live it refuses to repost twice, `--undo` deletes the repost, and every
live change is logged to `data/bot/reposts.jsonl`. A repost has no text, so it mentions
nobody. `dm send` and `dm read` interview one
person by direct message through the chat service (`atproto-proxy: did:web:api.bsky.chat#bsky_chat`);
they need an app password with direct-message access, refuse anyone on the scraper's opt-out
list, and send plain text only, never a mention or link. Message text is private: it lives
only in the terminal and the gitignored `data/bot/dm/`, never in anything committed. `dm read`
never marks a conversation read and never creates one. Both live commands refuse unless the
session's DID is `bluesky.did` in `show.config.json`.

## The weekly pipeline: `packages/writers-room`

`docs/WORKFLOW.md` (v3) is the contract for how an episode is made; this package implements it.
Subagents in seven roles do the work; the tool is the deterministic backbone between them and
**never calls a model**: it writes one brief per task, has the runner do the tasks, combines what
several subagents wrote independently with recorded arithmetic, applies the caps, and runs the gates.

| # | stage | subagents (role), in waves | the tool |
|---|---|---|---|
| 1 | scope | 1 auditor | scrapes if there is no digest; coverage figures |
| 2 | research | 1 researcher per lane, from the scraper's skeletons and lane slices; then 1 auditor screens | exact posts from the skeletons; the longlist, one file per kept card, `research/terms.md` |
| 3 | rank | 2 reviewers, interest only | reach and interest weighted; a pool of about fifteen, interview candidates ranked apart |
| 4 | brainstorm | 2 or 3 writers, on the pool only | merges the ideas |
| 5 | shortlist | 2 reviewers (best joke, synergy, variety); 1 reviewer proposes the experiment | the shortlist of four or five; the interview candidates in order |
| 6 | repetition (ideas) | 2 reviewers with the ledger; a writer per repeat | strictest verdict; people rules |
| 7 | draft | 1 writer per shortlisted card and per standing segment, each given its card and ideas | the previous aired genre as an `avoid` line |
| 8 | fit | sound editors (voices, then each draft with lines to settle, best effort, recording hard words with `npm run voice-research`); a writer only when the owner asks for a rewrite | `npm run fit` on every changed draft |
| 9 | select | 2 reviewers score; 2 judge repetition on the selection (verdicts may be on a pair); a writer per repeat; 1 auditor refreshes consent | the selection with the caps; `plan.json` |
| 10 | assemble | 1 writer; 2 reviewers on the lines it added; 1 sound editor | copies drafts in, merges sources and casts; fits; renders |
| 11 | stage | 1 builder per segment; then 1 auditor, a verdict per segment and a route per change | re-shoots only changed segments |
| 12 | build | none | thumbnail, build (`--preview` for a trial), `verify`, every cited post checked live |
| 13 | review | a `viewer` per cold-viewer stretch; then 1 reviewer | title and credits frames; `review/cold-viewers.md`; the pull request text |

Everything a production writes is under `episodes/<id>/production/`, reviewers' and auditors'
files under `production/review/`, so a run can stop, be inspected and resume; `state.json` records
statuses and gate results, never timestamps and never a reviewer's prose. Briefs are
`production/briefs/<stage>/<task>.md`: the role, the one place to write, a scratch folder, the check
for that task alone (`--check <stage> --task <id>`), a short reading list (the constitution, the
chapters `config/pipeline.json` `reading` names for that kind of task, the files it works from), the
gate's rules, the card's terms of use and, on a later round, what the earlier round asked. A
send-back names the stage that can fix it; only its `changes` reach that stage's briefs. The
pipeline reaches the scraper and the studio through one module each (`src/scraper.mjs`,
`src/studio.mjs`).

**Runners.** `headless` (the default where `claude auth status` says signed in, and in CI): each
brief goes to `claude -p --agent <role>` with that role's permission rules, a wave in parallel, and
the run stops only at a failure or a send-back, printing what the project manager must decide.
`manual`: the run stops at each wave and `--status` lists the subagents to spawn
(`playbooks/project-manager.md`). `fixture`: prepared outputs, for tests and `bin/end-to-end.mjs`.
The runner is remembered per run.

**Roles.** `.claude/agents/`: `writer` and `reviewer` on the latest Fable; `researcher`, `auditor`,
`sound-editor` and `builder` on the latest Opus; `viewer` on the cheapest current model, given
frames and nothing else. A guard hook on every role (`packages/writers-room/bin/guard.mjs`, a
tripwire, not a wall) fences the ledger, `docs/trials/`, `production/review/` and earlier episodes
from writers, researchers, builders, sound editors and viewers, a digest's `private/` from all but
auditors and its `reviewers/` from all but reviewers and auditors, and keeps the auditor's network
to `npm run sources` and `npm run media`. The repetition gate catches what slips through.

**Gates** do not depend on a model's judgement. Among them: cards built from the scraper's skeletons,
with every picture described and no marked post (a `tagged` card records who pointed and proposes
nothing; an empty lane gets no task); **stated pronouns** on every card, the terms file and every
brief that names people, and a pronoun gate on house lines and on-screen text (a warning at draft,
blocking at assembly; real people's verbatim lines exempt); every judgement from two reviewers; the
**repetition gate** on ideas, selected scripts (including pairs) and lines added at assembly; the
**caps**, applied by the tool as it selects (one interview, nobody in more than two segments, nobody
who spoke in the previous aired episode, the accounts on screen mostly new); every draft **fitted,
best effort** (`fit.json`: nothing heard alarming, out of bounds or crude, which is listed for the
owner; every hard line recorded in the voice research file), with sound editors never changing a
word; at render, a line under the intelligibility mark or a real name not heard is a warning for the
owner's watch, and an alarming or out-of-bounds word heard still fails; every
real line verbatim, in its own context; **consent** refreshed over the network for the selection and
every cited post checked live at the build; every post shown or performed **exact** on screen;
**unread text**; **credits**; studio imports only; the constitution unchanged; the scorecard complete
and the verdict following it; the ledger agreeing with who is on screen.

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
reviewable and the same for everyone: `show.config.json` (the site URL; the show's Bluesky
handle and DID, the authors the bot may repost, and the account's bio with the handles it may
credit), each package's own `config/` folder (the scraper's cluster, scoring, safety
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
