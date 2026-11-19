# @late-cluster/bot

The Bluesky account for *The Late Cluster with Larry Nx*. Its jobs: announce a published
episode (one post with a line in the show's voice, the episode number and title, the episode
URL, and a link card with the episode's thumbnail); set the account's profile picture; and
interview someone by direct message, then read the answer.

- Node 22, ESM, no npm dependencies, Node builtins only (see `docs/ARCHITECTURE.md`).
- **Dry run is the default.** Nothing is sent without `--live`.
- **It never mentions or tags anyone.** See [No mentions](#no-mentions).

```sh
npm run bot -- announce 1                 # dry run: print exactly what would be sent
npm run bot -- announce 001-pilot --live  # post it (needs BSKY_APP_PASSWORD, from .secrets)
npm run bot -- profile                    # dry run: check brand/avatar.png, print what would change
npm run bot -- dm send guest.bsky.social --file questions.txt   # dry run: print the messages
npm run bot -- dm read guest.bsky.social  # log in and print the conversation; changes nothing
npm run bot -- help
```

## First-time setup (account owner)

The bot cannot do any of this for you. Do it once, by hand.

1. **Create the account** in the Bluesky app, with its own email address. Use a handle
   that says what it is; a custom domain handle for the show's site is a good option.
   (Done: the show's account is `latecluster.simcluster.tv`, and its handle and DID are
   configuration, in `bluesky` in the repo root's `show.config.json`.)
2. **Make it recognisably automated.** Bluesky's bot tutorial (atproto.com, "Build an
   Agent", part 3) asks bot accounts to identify themselves with a `bot` self-label on
   their profile (`labels: { $type: 'com.atproto.label.defs#selfLabels', values: [{ val: 'bot' }] }`
   on the `app.bsky.actor.profile` record). This package writes only the profile's
   `avatar` (see [`profile`](#profile---avatar-file---live---no-backup)); set the label once
   from the app if it offers the option, or with a one-off script as in that tutorial. Also say in the bio that the account is automated, that it is a comedy show
   played by labelled puppets, who runs it, and how to ask to be left out.
3. **Create an app password** (in the app: Settings, Privacy and security, App passwords).
   Tick "Allow access to your direct messages" only if the account will use `dm`: without it
   `dm send` and `dm read` are refused by the server, and `announce` and `profile` work
   either way. Never use the account's real password here: the bot
   only ever needs an app password, and one can be revoked without touching the account.
4. **Put the secret in `.secrets`.** Configuration and secrets are kept apart: the handle
   is already in `show.config.json` (committed), and the only secret, the app password, goes
   in `.secrets` at the repo root (gitignored; copy `.secrets.example`). `npm run bot` loads
   `.secrets` itself (`node --env-file-if-exists=.secrets`), so nothing needs exporting, and
   variables already in the environment win over the file. The bot reads:

   | variable | required | meaning |
   |---|---|---|
   | `BSKY_APP_PASSWORD` | for `--live` | the app password from step 3; the only value that must come from the environment |
   | `SITE_URL` | no, if set in a config file | the site root, e.g. `https://simcluster.tv/`; falls back to `siteUrl` in `bot.config.json`, then to `siteUrl` in the repo's `show.config.json` |
   | `BSKY_HANDLE` | no | overrides `bluesky.handle` in `show.config.json` (for testing with another account) |
   | `BSKY_PDS` | no | PDS host, default `https://bsky.social` |
   | `BOT_USER_AGENT` | no | the `User-Agent` header; the default is generic and names neither the show nor its owner |

   In GitHub Actions there is no `.secrets`: store `BSKY_APP_PASSWORD` as a **repository
   secret** (Settings, Secrets and variables, Actions) and pass it as `env:` to the step
   that runs `npm run bot -- announce <ep> --live`. Run that step only after the Pages
   deploy has finished, so the link card can be fetched.
5. **Dry-run first**, read the output, then post with `--live`.

There is deliberately no default site URL: the bot will not guess a hostname. The app
password is read only from the environment (which `npm run bot` fills from `.secrets`); this
package never reads it from a file, writes it to disk or prints it, and the session token lives
in memory for one run.

The bot logs in with the handle. `createSession`'s lexicon describes `identifier` as "Handle
or other identifier supported by the server", and the reference PDS accepts a handle, an
email or the account's DID there, so the DID in `show.config.json`
(`did:plc:zdobmviiuyfkc6xyylmpm2sf`) would keep working even if the handle changed. If the
handle ever stops resolving, setting `BSKY_HANDLE` to the DID is the quick fix.

### `bot.config.json`

```json
{ "siteUrl": "", "service": "https://bsky.social", "langs": ["en"], "avatar": "brand/avatar.png" }
```

Environment variables win over the file. The site URL is looked up as `SITE_URL`, then this
file's `siteUrl`, then `siteUrl` in the repo root's `show.config.json` (the show-wide setting
the episode builds use), so normally it is set once, there. `langs` is the post's language tags (at most 3).
`avatar` is the picture `profile` sets, relative to the repo root (default `brand/avatar.png`).
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

Prints the episode, the URL, the target account (and where its handle came from:
`show.config.json` or `BSKY_HANDLE`), the thumbnail path
and size, the text length, the four requests live mode would make, and the record JSON.
In the dry run the thumbnail's `ref` is a placeholder and `createdAt` is the current time;
live mode fills both in. A dry run makes no network request at all, so it cannot check for
an earlier announcement.

### Live

`--live` without a handle (`bluesky.handle` in `show.config.json`, or `BSKY_HANDLE`) or
without `BSKY_APP_PASSWORD` is an error that names what is missing. With them:

1. `com.atproto.server.createSession` with the handle and app password;
2. `com.atproto.repo.listRecords` on the account's own `app.bsky.feed.post` collection, up
   to 5 pages of 100. If any post links the episode URL (link card, link facet, or the URL
   in the text) the bot stops and prints that post's URI. `--force` posts anyway.
3. `com.atproto.repo.uploadBlob` with the thumbnail;
4. `com.atproto.repo.createRecord`, then prints the `at://` URI and the bsky.app link.

The duplicate check reads the PDS directly rather than the AppView, so a post made a
moment ago is seen. It only looks back 500 posts.

## `profile [--avatar <file>] [--live] [--no-backup]`

Sets the account's profile picture, and nothing else. The picture is `avatar` in
`bot.config.json` (relative to the repo root), or `--avatar <file>` (relative to where you
run it).

**Dry run is the default**: no login and no request of any kind. It checks the file and
prints its path, type, byte size and pixel size, the account (handle and DID) it would
change, and the steps `--live` would take.

Checked in both modes, before any request: the file exists; it is PNG or JPEG **by its
bytes**, not its name; it is at most 1,000,000 bytes (the `app.bsky.actor.profile` lexicon's
`avatar` limit); its header can be read. A picture that is not square, or is under 400 px on
a side, gets a warning but is not refused.

`--live`, in order:

1. `createSession` with the handle and app password;
2. stop unless the session's DID is `bluesky.did` in `show.config.json`;
3. `com.atproto.repo.getRecord` for `app.bsky.actor.profile/self` (no record yet: one is created);
4. `uploadBlob` with the picture; if its CID is already the avatar's, stop, writing nothing;
5. unless `--no-backup`, fetch the current avatar (`com.atproto.sync.getBlob`, unauthenticated,
   from the PDS named in the session's DID document) and save it as
   `data/bot/avatar-previous-<cid>.<ext>` (gitignored). If that fails, nothing is written;
6. `com.atproto.repo.putRecord` with `swapRecord` set to the CID read in step 3 (`null` when
   there was no record), so a change made elsewhere in the meantime is refused, not
   overwritten. Every other field (display name, description, banner, labels, pinned post,
   starter pack, `createdAt`, and anything unrecognised) is kept exactly as read; only `avatar`
   changes;
7. print the previous avatar's CID, the new one, and where the backup went.

## `dm send <handle-or-did> --file <path> [--live]`

Sends one or more messages to one person, in order, for an interview. The file holds the
messages separated by a line containing only `---`; each is sent exactly as written, trimmed
of blank lines at its start and end (Windows line endings become `\n`).

**Dry run is the default**: no login, no request. It prints the recipient as given and each
message with its grapheme and byte counts.

Refused in both modes, before any request: no messages, or an empty one; a message over 1000
graphemes or 10000 bytes (`chat.bsky.convo.defs#messageInput`); a message containing an
`@mention` or a link (the error names the message and the text); a recipient on the
**opt-out list** (`packages/scraper/config/optout.json`, matched by DID and by handle). The
opt-out list is absolute: if it cannot be read, the bot refuses rather than assume it is
empty. Messages are plain text: no facets are ever sent.

`--live`: `createSession`; stop unless the session is `bluesky.did`; resolve a handle with
`com.atproto.identity.resolveHandle` and check the opt-out list again by DID;
`chat.bsky.convo.getConvoForMembers` (which opens the conversation if there is none, and
whose member handles are checked against the opt-out list too); then
`chat.bsky.convo.sendMessage` for each message, stopping at the first failure and saying how
many were sent. Each sent message's id and `sentAt` are printed.

Chat calls go to the account's PDS (from the session's DID document, else `BSKY_PDS`) with the
header `atproto-proxy: did:web:api.bsky.chat#bsky_chat`; no other call carries it. If the
server refuses a chat call, the error names its error name and both common causes, since it
does not reliably say which: the app password lacks direct-message access, or the recipient
does not accept messages from this account.

## `dm read <handle-or-did> [--limit 50] [--json]`

Prints a conversation, oldest first: time, who (`show` or `them`), text; deleted messages are
shown as `(deleted)`. `--json` prints one JSON object per line instead. It logs in, because
the conversation is private, but changes nothing, so it takes no `--live`: it never marks the
conversation read (`updateRead` is never called) and never accepts, leaves or mutes anything.
Same DID and opt-out checks as `send`.

`getConvoForMembers` would *create* a conversation if none exists, so `read` does not use it.
It finds the conversation by paging through `chat.bsky.convo.listConvos` (up to 2000
conversations), then pages `chat.bsky.convo.getMessages` up to `--limit` (at most 1000). No
conversation found means it says so and creates nothing.

### Message text is private

Direct messages are not public. Their text is printed to your terminal and appended to a
local log, `data/bot/dm/<recipient-did>/sent.jsonl` (one JSON line per sent message: time,
recipient, conversation and message ids, text; never a token). `data/` is gitignored at the
root. Never copy message text, a reply, or that log into anything committed: not an episode,
not a test fixture, not a commit message. A guest's reply is theirs; the show uses it only
the way the bible's real-people rules allow.

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
src/commands/profile.mjs
src/commands/dm.mjs
src/atproto.mjs         XRPC client over an injectable fetch: createSession, uploadBlob,
                        createRecord, listRecords, getRecord, putRecord, getBlob,
                        resolveHandle, and proxied chat calls (getConvoForMembers,
                        listConvos, getMessages, sendMessage)
src/image.mjs           PNG/JPEG type and pixel size from the file's bytes
src/optout.mjs          reads the scraper's opt-out list
src/compose.mjs         builds and checks the post record
src/episodes.mjs        finds and validates built episodes
src/richtext.mjs        UTF-8 byte offsets, grapheme counting
src/voice.mjs           all of the bot's wording
src/limits.mjs          Bluesky limits, with their lexicon sources
src/config.mjs          environment, bot.config.json and the root show.config.json
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
reaches the output. For `profile`: a dry run makes no request, every other profile field
(including unknown ones) is kept, a missing record is created, `swapRecord` is sent, the same
CID is a no-op, the DID check comes before any upload, the backup is written before the write
and a failed backup stops it, `--no-backup`, and type, size and fake-PNG refusals. For `dm`:
zero requests in a dry run, the proxy header on chat calls only, order and stop-at-first-failure,
limit, empty, mention and link refusals, the opt-out list, the DID check, `read` making no
write and never calling `updateRead`, the sent log, and the plain-words chat errors. Fixtures
are in `test/fixtures/repo/`, or are generated in temporary directories; every message in
them is invented.

## Sources

Checked on 2026-11-19 against the published lexicons (`com.atproto.lexicon.schema` records
of the `app.bsky` lexicon authority, and `bluesky-social/atproto` `lexicons/com/atproto/`):

- `app.bsky.feed.post`: `text` maxGraphemes 300, maxLength 3000; `langs` max 3; `createdAt` required.
- `app.bsky.richtext.facet`: `byteSlice` is zero-indexed UTF-8 bytes, end exclusive; `#link` has `uri`.
- `app.bsky.embed.external#external`: `uri`, `title`, `description` required; `thumb` is a
  blob, `image/*`, maxSize 1,000,000.
- `com.atproto.server.createSession`, `com.atproto.repo.uploadBlob`, `createRecord`,
  `listRecords` (limit max 100), `getRecord`, `putRecord` (`swapRecord` nullable: `null`
  means the record must not exist yet), `com.atproto.sync.getBlob`, `com.atproto.identity.resolveHandle`.
- `app.bsky.actor.profile`: `avatar` is a blob, accept `image/png`, `image/jpeg`, maxSize 1,000,000.
- `chat.bsky.convo.defs#messageInput`: `text` maxGraphemes 1000, maxLength 10000; `getMessages`
  and `listConvos` limit max 100; chat is reached with `atproto-proxy: did:web:api.bsky.chat#bsky_chat`.
- The `bot` profile self-label and the "only interact when tagged" guidance: atproto.com,
  "Build an Agent" tutorial.
