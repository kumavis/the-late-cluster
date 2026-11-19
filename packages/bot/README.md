# @late-cluster/bot

The Bluesky account for *The Late Cluster with Larry Nx*. Its one job today is to
announce a published episode: one post with a line in the show's voice, the episode
number and title, the episode URL, and a link card with the episode's thumbnail.

- Node 22, ESM, no npm dependencies, Node builtins only (see `docs/ARCHITECTURE.md`).
- **Dry run is the default.** Nothing is sent without `--live`.
- **It never mentions or tags anyone.** See [No mentions](#no-mentions).

```sh
npm run bot -- announce 1                 # dry run: print exactly what would be sent
npm run bot -- announce 001-pilot --live  # post it (needs credentials)
npm run bot -- help
```

## First-time setup (account owner)

The bot cannot do any of this for you. Do it once, by hand.

1. **Create the account** in the Bluesky app, with its own email address. Use a handle
   that says what it is; a custom domain handle for the show's site is a good option.
2. **Make it recognisably automated.** Bluesky's bot tutorial (atproto.com, "Build an
   Agent", part 3) asks bot accounts to identify themselves with a `bot` self-label on
   their profile (`labels: { $type: 'com.atproto.label.defs#selfLabels', values: [{ val: 'bot' }] }`
   on the `app.bsky.actor.profile` record). This package does not write the profile; set
   it once from the app if it offers the option, or with a one-off script as in that
   tutorial. Also say in the bio that the account is automated, that it is a comedy show
   played by labelled puppets, who runs it, and how to ask to be left out.
3. **Create an app password** (in the app: Settings, Privacy and security, App passwords).
   Do not tick direct-message access. Never use the account's real password here: the bot
   only ever needs an app password, and one can be revoked without touching the account.
4. **Set the environment** where the bot runs:

   | variable | required | meaning |
   |---|---|---|
   | `SITE_URL` | yes (or `siteUrl` in `bot.config.json`) | the Pages site root, e.g. `https://<owner>.github.io/the-late-cluster/` |
   | `BSKY_HANDLE` | for `--live` | the bot account's handle |
   | `BSKY_APP_PASSWORD` | for `--live` | the app password from step 3 |
   | `BSKY_PDS` | no | PDS host, default `https://bsky.social` |
   | `BOT_USER_AGENT` | no | the `User-Agent` header; the default is generic and names neither the show nor its owner |

   In GitHub Actions, store `BSKY_HANDLE` and `BSKY_APP_PASSWORD` as **repository secrets**
   (Settings, Secrets and variables, Actions) and `SITE_URL` as a repository variable, then
   pass them as `env:` to the step that runs `npm run bot -- announce <ep> --live`. Run that
   step only after the Pages deploy has finished, so the link card can be fetched.
5. **Dry-run first**, read the output, then post with `--live`.

There is deliberately no default site URL: the bot will not guess a hostname. Credentials
are read only from the environment. They are never read from a file, written to disk or
printed; the session token lives in memory for one run.

### `bot.config.json`

```json
{ "siteUrl": "", "service": "https://bsky.social", "langs": ["en"] }
```

Environment variables win over the file. `langs` is the post's language tags (at most 3).
The file holds no secrets and can be committed.

## `announce <ep> [--live] [--force]`

`<ep>` is `1`, `001` or `001-pilot`. The bot reads `dist/episodes/<id>/episode.json` (the
build manifest) and refuses, with a one-line reason, when:

- the episode does not exist in `episodes/` or `dist/episodes/`;
- it is unbuilt: no `dist/episodes/<id>/episode.json`, or a manifest with no `build.sourceHash`;
- the manifest is invalid (`id` must match the folder, `number` must match the id, `title`
  and `description` must be non-empty);
- `status` is not `published`;
- `thumbnail.jpg` is missing, is not a JPEG or PNG, or is over 1,000,000 bytes;
- the post text is over 300 graphemes or 3000 UTF-8 bytes;
- the post text contains something that reads as tagging an account (`@name.domain`, `@did:...`).

All of these are checked before any network request.

### What gets posted

The wording lives in **`src/voice.mjs`**: a few taglines (picked by episode number, so a dry
run and the live post agree), the post template, and the link-card title. Edit freely, but
keep `{url}` in the post template.

The record is an `app.bsky.feed.post` with:

- `text`: tagline, blank line, `The Late Cluster with Larry Nx, episode N: Title`, the URL;
- `facets`: one `app.bsky.richtext.facet#link` over the URL, with UTF-8 **byte** offsets;
- `langs`, `createdAt` (set at posting time);
- `embed`: `app.bsky.embed.external` with the episode URL, `"<show> #N: <title>"`, the
  manifest description, and `thumb` set to the blob returned by `uploadBlob`.

### Dry run (default)

Prints the episode, the URL, the target account (`BSKY_HANDLE` if set), the thumbnail path
and size, the text length, the four requests live mode would make, and the record JSON.
In the dry run the thumbnail's `ref` is a placeholder and `createdAt` is the current time;
live mode fills both in. A dry run makes no network request at all, so it cannot check for
an earlier announcement.

### Live

`--live` without both `BSKY_HANDLE` and `BSKY_APP_PASSWORD` is an error. With them:

1. `com.atproto.server.createSession` with the handle and app password;
2. `com.atproto.repo.listRecords` on the account's own `app.bsky.feed.post` collection, up
   to 5 pages of 100. If any post links the episode URL (link card, link facet, or the URL
   in the text) the bot stops and prints that post's URI. `--force` posts anyway.
3. `com.atproto.repo.uploadBlob` with the thumbnail;
4. `com.atproto.repo.createRecord`, then prints the `at://` URI and the bsky.app link.

The duplicate check reads the PDS directly rather than the AppView, so a post made a
moment ago is seen. It only looks back 500 posts.

## No mentions

The show parodies real accounts. A mention facet sends that person a notification they did
not ask for, so an announcement never carries one, and there is no automatic tagging of
the accounts an episode features. Concretely:

- the composer only ever produces link facets, and `assertNoMentions` rejects anything else;
- post text that looks like a handle is refused, so it cannot even look like a tag;
- `--mention` and `--tag` are rejected with an explanation.

An opt-in `--mention <handle>` flag was considered and **not built**. If a guest ever asks
to be tagged, the rule for adding it is: it accepts only handles typed explicitly on the
command line for that one run, never handles read from an episode, a manifest, the
scraper's data or a cast file; it resolves each to a DID and shows them in the dry run; and
it is never on by default.

## Code layout

```
bin/bot.mjs             entry point (root: "bot": "node packages/bot/bin/bot.mjs")
src/cli.mjs             argument parsing and dispatch; everything injectable for tests
src/commands/index.mjs  the command registry
src/commands/announce.mjs
src/atproto.mjs         XRPC client over an injectable fetch: createSession, uploadBlob,
                        createRecord, listRecords
src/compose.mjs         builds and checks the post record
src/episodes.mjs        finds and validates built episodes
src/richtext.mjs        UTF-8 byte offsets, grapheme counting
src/voice.mjs           all of the bot's wording
src/limits.mjs          Bluesky limits, with their lexicon sources
src/config.mjs          environment and bot.config.json
```

Adding a job: write `src/commands/<name>.mjs` exporting `{ name, summary, usage, options, run }`
(`options` in `node:util` `parseArgs` form) and add it to `src/commands/index.mjs`. `run(ctx)`
gets `positionals`, `values`, `env`, `fetch`, `out`, `err`, `root`, `cwd`, `now`. New XRPC
calls go in `src/atproto.mjs`. Keep the dry-run-by-default rule for anything that writes.

## Roadmap sketch: the opt-out inbox (not implemented)

Goal: anyone can ask to be left out of the show by replying to or mentioning the bot.

- **Command** `npm run bot -- optouts [--live]`, run on a schedule. Dry run prints what it
  would record and reply.
- **Read**: `app.bsky.notification.listNotifications` (authenticated, reasons `mention` and
  `reply`), paging from a stored cursor; `app.bsky.notification.updateSeen` afterwards in
  live mode.
- **Recognise**: a short, forgiving phrase list in its own editable file (e.g. "opt out",
  "leave me out", "don't use my posts", "remove me"). Only the author of the post can opt
  themselves out; the bot records the **DID** of the post's author (handles change), plus
  handle, time and the request's post URI. Anything ambiguous goes to a human, never in or
  out automatically.
- **Record**: append to the opt-out list in `packages/scraper/config/` that the scraper
  already reads (exact file name and format to be agreed with the scraper package). In CI
  this lands as a commit or pull request, so the list stays reviewable and versioned.
- **Acknowledge**: one reply to the requester only, which is fine because they tagged the
  bot first (Bluesky's guidance: interact only when the user has tagged the bot). The
  writers' room should also check new opt-outs against episodes in production.
- Opting out stops future use; it does not unpublish frozen episodes. That decision, and
  the public "how to be left out" page, belong to the show's people, not the bot.

## Tests

```sh
npm test -w @late-cluster/bot     # or: cd packages/bot && npm test
```

No network: every request goes to an injected fake `fetch`. Covered: byte offsets with
non-ASCII text, the grapheme and byte limits, manifest validation and refusals, the dry-run
output, the live call order and request bodies, the duplicate check (with paging) and
`--force`, the thumbnail size limit, credential errors, and that no password or token ever
reaches the output. Fixtures are in `test/fixtures/repo/`.

## Sources

Checked on 2026-11-19 against the published lexicons (`com.atproto.lexicon.schema` records
of the `app.bsky` lexicon authority, and `bluesky-social/atproto` `lexicons/com/atproto/`):

- `app.bsky.feed.post`: `text` maxGraphemes 300, maxLength 3000; `langs` max 3; `createdAt` required.
- `app.bsky.richtext.facet`: `byteSlice` is zero-indexed UTF-8 bytes, end exclusive; `#link` has `uri`.
- `app.bsky.embed.external#external`: `uri`, `title`, `description` required; `thumb` is a
  blob, `image/*`, maxSize 1,000,000.
- `com.atproto.server.createSession`, `com.atproto.repo.uploadBlob`, `createRecord`,
  `listRecords` (limit max 100).
- The `bot` profile self-label and the "only interact when tagged" guidance: atproto.com,
  "Build an Agent" tutorial.
