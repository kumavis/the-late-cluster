# @late-cluster/bot

> **"The bot" is a command line, not an always-on bot.** In the owner's words: "the scope of
> "the bot" at present is just a cli, not an always on bot that responds". Every command here
> is run by a person, once, and then exits. Nothing listens, schedules or replies by itself.

The command line for the Bluesky account of *The Late Cluster with Larry Nx*. Its jobs:
announce a published episode (one post with a link card); post the episode's video; reply under
one of the show's own posts, tagging the episode's accounts; set the account's profile picture
and bio; repost a post by an account the owner has allowed; and interview someone by direct
message, then read the answer.

- Node 22, ESM, no npm dependencies, Node builtins only (see `docs/ARCHITECTURE.md`).
  `post` uses `ffprobe`, if it is on the PATH, to read the video's size and length.
- **Dry run is the default.** Nothing is sent without `--live`.
- **It mentions nobody, except in `reply --episode`**, and there only the accounts in that
  episode's `sources.json`. See [No mentions](#no-mentions).

```sh
npm run bot -- announce 1                 # dry run: print exactly what would be sent
npm run bot -- announce 001-pilot --live  # post it (needs BSKY_APP_PASSWORD, from .secrets)
npm run bot -- post 2 --video ep2.mp4 --text-file post.txt --alt-file alt.txt --captions ep2.vtt   # dry run
npm run bot -- reply https://bsky.app/profile/latecluster.simcluster.tv/post/<rkey> --text-file thanks.txt --episode 2   # dry run
npm run bot -- profile                    # dry run: check brand/avatar.png, compare the bio with the live one
npm run bot -- repost https://bsky.app/profile/kumavis.me/post/<rkey>   # dry run: read the post, print the record
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
   `avatar` and `description` (see [`profile`](#profile)); set the label once
   from the app if it offers the option, or with a one-off script as in that tutorial. Also say in the bio that the account is automated, that it is a comedy show
   played by labelled puppets, who runs it, and how to ask to be left out.
3. **Create an app password** (in the app: Settings, Privacy and security, App passwords).
   Tick "Allow access to your direct messages" only if the account will use `dm`: without it
   `dm send` and `dm read` are refused by the server, and the other commands work
   either way. Posting a video (`post`) also needs the account's **email to be verified**,
   and Bluesky limits how many videos an account may upload each day. Never use the account's real password here: the bot
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
   | `BSKY_APPVIEW` | no | the public AppView `repost` reads posts from without logging in; overrides `appView` in `bot.config.json` (default `https://public.api.bsky.app`) |
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
{
  "siteUrl": "", "service": "https://bsky.social", "appView": "https://public.api.bsky.app",
  "langs": ["en"], "avatar": "brand/avatar.png",
  "video": { "service": "https://video.bsky.app", "did": "did:web:video.bsky.app", "jobTimeoutMinutes": 20, "pollSeconds": 3, "stallSeconds": 120 }
}
```

Environment variables win over the file. The site URL is looked up as `SITE_URL`, then this
file's `siteUrl`, then `siteUrl` in the repo root's `show.config.json` (the show-wide setting
the episode builds use), so normally it is set once, there. `langs` is the post's language tags (at most 3).
`avatar` is the picture `profile` sets, relative to the repo root (default `brand/avatar.png`).
`appView` is where `repost` and `reply` read a post (author, text, counts) without logging in.
`video` is the video service `post` uploads to: its host and DID (configuration, not code),
how long to wait for a processing job (`jobTimeoutMinutes`, default 20), how often to ask
(`pollSeconds`), and how long the upload may go without writing a byte before it is given up
(`stallSeconds`, default 120). `service` must be https; plain http is accepted only for a
loopback host (the tests' local server). The file holds no secrets and can be committed.

### `bluesky` in `show.config.json`

The show-wide account settings, committed at the repo root:

```json
"bluesky": {
  "handle": "latecluster.simcluster.tv",
  "did": "did:plc:zdobmviiuyfkc6xyylmpm2sf",
  "$comment": "why repostAuthors exists",
  "repostAuthors": ["did:plc:zdobmviiuyfkc6xyylmpm2sf", "did:plc:c2x5i7fneh7xbvpvw2r3omes"],
  "profile": {
    "$comment": "what the bio and credited are",
    "description": "The Late Cluster, with Larry Nx\nthe simcluster's own late night talk show",
    "credited": ["kumavis.me"]
  }
}
```

- `repostAuthors`: the only authors `repost` will repost, by DID (handles change). Seeded
  with the show's own account and the owner's (`kumavis.me`). Adding a DID here, in a commit,
  is how the owner allows an account; nothing else does.
- `profile.description`: the bio `profile` writes, exactly (lines joined by `\n`). It was
  seeded with the bio as it was live on 21 November 2026, so a dry run then reported no change.
- `profile.credited`: the only handles the bio may name as `@handle` (seed: `kumavis.me`, the
  owner). See [No mentions](#no-mentions).

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

## `post`

```
post <ep> --video <file.mp4> --text-file <file> [--alt-file <file>] [--captions <file.vtt>]
     [--lang en] [--aspect <w>:<h>] [--upload-only] [--live]
```

Posts the episode's video as a top-level post. `<ep>` is `2`, `002` or the full id; the episode
must exist, and if its built manifest is not `published` the command warns (in both modes) and
goes on, since the owner approves a post by running it. The text and alt text come from files,
with line endings normalised and blank space at either end trimmed. `--lang` may be given up to
three times (default: `langs` in `bot.config.json`); the captions' `lang` is the first one.

**Checked before anything is sent**, each with its own refusal:

- the text: not empty, at most 300 graphemes and 3000 UTF-8 bytes, and **no mention and no
  link** (the tagged reply is the only place a mention may go);
- the video: exists, is an MP4 by its bytes (an `ftyp` box that is not QuickTime's), at most
  300,000,000 bytes. Its width, height and duration are read with `ffprobe` when it is on the
  PATH, and the duration must be at most 600 s. Without `ffprobe`, `--aspect <w>:<h>` is
  required (the pixel size, e.g. `1920:1080`) and a warning says the duration was not checked.
  With `ffprobe`, the file's own size is used, and an `--aspect` that disagrees gets a warning;
- the captions: WebVTT by their first line (`WEBVTT`, after an optional byte-order mark), at
  most 20,000 bytes;
- the alt text, when given: not empty.

**Dry run (default)** makes no request at all. It prints the episode, the video's size, length
and aspect ratio, its SHA-256 and whether an upload of it is already stored, the captions, the
text and alt text with their lengths, the record exactly as it would be created (blobs as
placeholders, unless a stored upload's blob is known), and the calls a live run would make, in
order.

The record has the shape of episode one's video post, which the owner's own app created and the
server accepted: `{ $type, createdAt, embed, langs, text }`, with `embed` as
`{ $type: 'app.bsky.embed.video', aspectRatio: { height, width }, presentation: 'default', video }`,
where `video` is the blob exactly as the job returned it (`$type`, `ref.$link`, `mimeType`,
`size`), passed through untouched, and `aspectRatio` is the file's own pixel size. Ours adds
`captions: [{ lang, file }]` and `alt`, as the lexicon allows.

**`--live`**, stopping at the first failure. **Nothing is posted unless every step before the
post succeeded**: a failed upload or a failed job ends the command with the reason and no post.

1. `createSession`; stop unless the session's DID is `bluesky.did`;
2. the file's SHA-256, read as a stream. If `data/bot/video-uploads/<sha256>.json` holds a
   blob, it is reused and steps 3 to 6 are skipped; if it holds a pending job, step 6 picks it up;
3. a service auth token (`com.atproto.server.getServiceAuth` on the PDS, `aud` the video
   service's DID, `lxm` `app.bsky.video.getUploadLimits`), then `getUploadLimits` on the video
   service. It prints the videos and bytes left today, and stops unless `canUpload` (or if
   fewer bytes are left than the file has);
4. a second token, `aud` `did:web:<the PDS host>` (from the session's DID document), `lxm`
   `com.atproto.repo.uploadBlob`, `exp` 30 minutes from now in whole seconds;
5. `POST <video service>/xrpc/app.bsky.video.uploadVideo?did=…&name=…` with the file
   **streamed from disk** (never read into memory), `Authorization: Bearer <that token>`,
   `Content-Type: video/mp4` and an explicit `Content-Length` of the file's size (not chunked).
   This one request goes by **`node:https`, not `fetch`**: Node's fetch has a fixed 300 s
   headers timeout that fires while a slow upload is still being written, and it cannot be
   changed without the `undici` package, which this package does not install. So there is no
   overall time limit, only a stall limit: if no bytes are written for `stallSeconds` (default
   120), the request is destroyed and the error says how many bytes had been sent. Progress is
   printed about every 10 percent. The token is never printed or put in an error.
   The answer is a job status **at the top level** (`{ did, jobId, state, error, blob }`);
   `getJobStatus` wraps it as `{ jobStatus }`; both shapes are read, everywhere, and an empty
   `jobId` means no job. If the service answers `already_exists`, the blob it returns is used,
   or, if it gives only a job id, that job is polled. A refusal names the service's error (its
   bodies carry `error` and often no `message`). The job is saved as pending at once;
6. `app.bsky.video.getJobStatus` (without a token) every `pollSeconds`, printing each change of
   state and progress, until the job has a blob. An unknown state means "still in process". A
   `JOB_STATE_FAILED` state, a `failureCode`, or a 400 answer (the service does not know the
   job) ends the command and forgets the job, so the next run uploads again. Any other failed
   poll keeps it saved. After `jobTimeoutMinutes` (default 20) it stops, naming the job id; the
   job stays saved, and running the same command again picks it up;
7. the blob is saved in `data/bot/video-uploads/<sha256>.json`. With `--upload-only` the
   command stops here: no post. A later `post --live` of the same file reuses the blob;
8. the captions, if any, through the PDS (`com.atproto.repo.uploadBlob`, `text/vtt`);
9. `listRecords` on the account's last 100 posts: if one already carries this video's blob,
   stop;
10. `createRecord` with `createdAt` set at that moment; print the post's `at://` address and its
    bsky.app URL, and append a line to `data/bot/posts.jsonl` (gitignored): time, episode,
    address, URL, the video's SHA-256 and blob CID.

A stored blob that is never put in a post may be cleaned up by the PDS after a while. If a
post with a reused blob fails, the error says so: remove the stored file and run again (the
video service will answer `already_exists`, or upload afresh).

## `reply`

```
reply <post> --text-file <file> --episode <ep> [--live]
```

Replies under one of the **show's own posts**, and is the one command that may tag anyone. It
carries out the owner's ruling of 21 November 2026: "The bot tags only the accounts that appear
in the episode a post is about".

- `<post>` is a bsky.app address or an `at://` address. Its author must be the show's account:
  a DID or handle that is not the show's is refused before any request, and so is a post the
  AppView says is someone else's.
- Every `@handle` in the text must be an account in `episodes/<ep>/production/sources.json`
  (`accounts[]`, matched by handle, case aside). The mention's DID is the one **on record
  there**. Each handle is resolved again at run time, in the dry run and again live, and
  refused if it no longer points at that DID (handles change). Each is checked against the
  opt-out list, by handle and DID. An account on record without a DID cannot be tagged.
- Any other `@handle`, an `@did:...`, and any link are refused. The text is at most 300
  graphemes and 3000 bytes.
- An account on record that is a bot may be tagged like any other; whom to name is the text
  file's choice.
- The facets cover the `@` and the handle as written, in UTF-8 byte offsets, start inclusive
  and end exclusive (`app.bsky.richtext.facet#mention`, `did`).
- `reply.root` is the parent's own root when the parent is itself a reply, otherwise the
  parent; `reply.parent` is the parent. Both `uri` and `cid` are read from the network at run
  time (`app.bsky.feed.getPosts` on the public AppView).

**Dry run (default)** reads without logging in (`resolveHandle` for each handle and the parent,
`getPosts` for the parent) and writes nothing. It prints the text, each mention with its DID,
where it came from and its byte range, and the exact record. **`--live`** logs in, stops unless
the session is the show's, repeats every check, creates the record, prints its address and
bsky.app URL, and appends a line to `data/bot/replies.jsonl` (gitignored).

## `profile`

```
profile [--only avatar|description] [--avatar <file>] [--live] [--no-backup]
```

Sets the account's profile picture and its bio (`description`), and nothing else. The picture
is `avatar` in `bot.config.json` (relative to the repo root), or `--avatar <file>` (relative to
where you run it). The bio is `bluesky.profile.description` in `show.config.json`. By default
both are handled; `--only avatar` or `--only description` handles just one and leaves the other
field exactly as it is (`--avatar` with `--only description` is a usage error).

**Dry run is the default**: no login, and nothing is written. For the avatar it makes no request
at all: it checks the file and prints its path, type, byte size and pixel size. For the bio it
makes one public read, `com.atproto.repo.getRecord` for `app.bsky.actor.profile/self` without
the token, and prints the configured bio and the live one line by line, then whether `--live`
would change it (when it would, both are printed again as JSON, so a trailing space or a
missing newline shows). If that read fails, the dry run says so and goes on. It also prints the
account (handle and DID) and the steps `--live` would take.

Checked in both modes, before any request:

- the picture: it exists; it is PNG or JPEG **by its bytes**, not its name; it is at most
  1,000,000 bytes (the `app.bsky.actor.profile` lexicon's `avatar` limit); its header can be
  read. A picture that is not square, or is under 400 px on a side, gets a warning but is not
  refused;
- the bio: it is set and not blank; it is at most 256 graphemes and 2560 UTF-8 bytes (the
  lexicon's `description` limits); every `@handle` (or `@did:...`) in it is listed in
  `bluesky.profile.credited`. Anything else is refused, naming the handle and the list.

`--live`, in order:

1. `createSession` with the handle and app password;
2. stop unless the session's DID is `bluesky.did` in `show.config.json`;
3. `com.atproto.repo.getRecord` for `app.bsky.actor.profile/self` (no record yet: one is created);
4. avatar: `uploadBlob` with the picture; if its CID is already the avatar's, the avatar is left
   alone. Bio: compared with the record's `description`, exactly. If neither changes, stop,
   writing nothing;
5. unless `--no-backup`, save what is about to be replaced, in `data/bot/` (gitignored): the
   current avatar (`com.atproto.sync.getBlob`, unauthenticated, from the PDS named in the
   session's DID document) as `avatar-previous-<cid>.<ext>` when the avatar changes, and the
   whole profile record as `profile-previous-<record cid>.json` when the bio changes. If either
   fails, nothing is written;
6. `com.atproto.repo.putRecord` with `swapRecord` set to the CID read in step 3 (`null` when
   there was no record), so a change made elsewhere in the meantime is refused, not
   overwritten. Every other field (display name, banner, labels, pinned post, starter pack,
   `createdAt`, and anything unrecognised) is kept exactly as read; only the fields that
   changed, `avatar` and/or `description`, are replaced, in one write;
7. print the previous avatar's CID, the new one, whether the bio changed, and where the backups went.

## `repost <post> [--live] [--undo]`

Reposts one post. `<post>` is a `https://bsky.app/profile/<handle-or-did>/post/<rkey>` address
or an `at://<handle-or-did>/app.bsky.feed.post/<rkey>` URI.

It reposts only posts whose **author's DID is in `bluesky.repostAuthors`** in `show.config.json`
(seeded with the show's own account and the owner's). Any other author is refused, with a
message saying that the list is how the owner allows one. The scraper's **opt-out list** is
checked too, as `dm` checks it: by handle as typed, by DID once resolved, and by the post
author's handle as the AppView gives it. An author given as a DID who is not on the list, or a
handle on the opt-out list, is refused before any request.

**Dry run is the default.** It may read, unauthenticated, and writes nothing: it resolves a
handle with `com.atproto.identity.resolveHandle`, fetches the post from the public AppView
(`app.bsky.feed.getPosts` on `appView`, default `https://public.api.bsky.app`; the token never
goes there), and prints the author, date, text, reply, repost, quote and like counts, whether it
has a video, and the exact `app.bsky.feed.repost` record `--live` would create: `subject` with
the post's `uri` and `cid`, and `createdAt`. It also looks through the account's own reposts
(`com.atproto.repo.listRecords`, unauthenticated) and says if this post is already reposted; if
that read fails it says so and `--live` checks again after logging in.

`--live`: `createSession`; stop unless the session is `bluesky.did`; the same resolve, read and
checks; `listRecords` on the account's `app.bsky.feed.repost` collection (up to 10 pages of 100),
and if any record's `subject.uri` is this post, say so and stop, writing nothing; otherwise
`com.atproto.repo.createRecord`, print the repost's `at://` address, and append one JSON line to
`data/bot/reposts.jsonl` (gitignored): time, `action`, the subject, and the repost's address.

`--undo` takes the account's repost of that post back: it finds it the same way and deletes it
with `com.atproto.repo.deleteRecord` (with `swapRecord` set to the repost record's CID), logging
an `undo` line. A dry run prints the record it would delete. Undoing needs no permission and
skips the repost list and the opt-out list, since it only removes; if there is no repost it
says so and writes nothing.

A repost carries no text and no facets, so the no-mentions rule is not touched; a repost does
notify the author it reposts, which is why only listed authors can be reposted. `--text`,
`--quote` and `--mention` are rejected with an explanation: this command never makes a quote post.

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

The show parodies real accounts. A mention facet sends that person a notification, so
**mentions are refused everywhere except in `reply --episode`**, and there only on these terms
(the owner's ruling, 21 November 2026: "The bot tags only the accounts that appear in the
episode a post is about"):

- the reply is under one of the show's own posts;
- every `@handle` is an account in that episode's `production/sources.json`, and the
  mention's DID is the one recorded there;
- each handle still resolves to that DID when the command runs, dry run and live;
- nobody on the opt-out list is tagged;
- the text names whom to tag; nothing tags automatically. A person writes the text file and
  runs the command.

Everywhere else:

- `announce`: the composer only ever produces link facets, `assertNoMentions` rejects anything
  else, and post text that looks like a handle is refused, so it cannot even look like a tag;
- `post`: any `@handle` in the text is refused, and so is any link;
- `dm`: plain text only, no mention, no link, no facet;
- `--mention` and `--tag` are rejected with an explanation by `announce`, `post` and `dm`.

### What is and is not a mention

- **A mention** is a `app.bsky.richtext.facet#mention` facet in a post: it links a DID and
  notifies that account. Only `reply --episode` creates one, on the terms above.
- **A repost** (`repost`) is an `app.bsky.feed.repost` record holding only a reference to the
  post and a time. It has no text and no facets, so it mentions nobody. It does notify the
  post's author, as any repost does, which is why it is limited to `bluesky.repostAuthors`.
- **A handle in the bio** (`profile`) is plain text: the profile record's `description` has no
  facets, and the apps' turning `@name` into a link there notifies nobody. In the spirit of the
  rule all the same, the bio may name an account as `@handle` only if it is listed in
  `bluesky.profile.credited` (seed: `kumavis.me`, the owner, credited at the owner's request);
  any other `@handle` or `@did:...` in the configured text is refused before anything is sent.
- **Direct messages** never carry a mention, a link or a facet (see `dm send`).

## Code layout

```
bin/bot.mjs             entry point (root: "bot": "node packages/bot/bin/bot.mjs")
src/cli.mjs             argument parsing and dispatch; everything injectable for tests
src/commands/index.mjs  the command registry
src/commands/announce.mjs
src/commands/post.mjs   the episode's video post
src/commands/reply.mjs  the tagged reply
src/commands/profile.mjs
src/commands/repost.mjs
src/commands/dm.mjs
src/atproto.mjs         XRPC client over an injectable fetch: createSession, uploadBlob,
                        createRecord, listRecords, getRecord, putRecord, deleteRecord, getBlob,
                        resolveHandle, getPosts (public AppView, no token), getServiceAuth,
                        the video service (getUploadLimits, a streamed uploadVideo, getJobStatus),
                        and proxied chat calls (getConvoForMembers,
                        listConvos, getMessages, sendMessage)
src/video.mjs           MP4 by its bytes, ffprobe, captions, the streamed checksum, the video embed
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
gets `positionals`, `values`, `env`, `fetch`, `out`, `err`, `root`, `cwd`, `now`, `sleep` and
`probe` (ffprobe; tests pass a fake, so they never need it installed). New XRPC
calls go in `src/atproto.mjs`. Keep the dry-run-by-default rule for anything that writes.

## Roadmap sketch: the opt-out inbox (not implemented)

Goal: anyone can ask to be left out of the show by replying to or mentioning the bot.

- **Command** `npm run bot -- optouts [--live]`, run by a person. (Running it on a schedule
  would make the bot always-on, which is outside its present scope: it is a command line.)
  Dry run prints what it would record and reply.
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
reaches the output. For `profile`: a dry run of the avatar makes no request, every other profile field
(including unknown ones) is kept, a missing record is created, `swapRecord` is sent, the same
CID is a no-op, the DID check comes before any upload, the backup is written before the write
and a failed backup stops it, `--no-backup`, and type, size and fake-PNG refusals; for the bio,
the committed seed, a dry run's single unauthenticated read and its "unchanged" and "would
change" reports, a changed bio written alone with `swapRecord` after the record is saved, both
fields in one write, `--only` either way, the 256-grapheme and 2560-byte limits (exactly 256
allowed), and uncredited `@handle` and `@did:` refusals. For `repost`: address parsing, a dry
run that only reads (no login, no token, nothing written), the exact record created live, the
log line, an author not on the list or on the opt-out list refused, the AppView's author
checked, an existing repost detected (with paging), `--undo` in both modes, and the DID check.
For `post`: every limit at and just past its edge (300 graphemes, 3000 bytes, 3 langs,
300,000,000 bytes with sparse files, 600 s, 20,000-byte captions, 20 captions, an aspect of at
least 1), the embed against episode one's accepted record, a dry run with no request, the
refusals (mention, link, not an MP4, too long, no ffprobe without `--aspect`, empty alt, not
WebVTT), the live order, and the upload **on a real loopback server** (`node:http` on
127.0.0.1, since a mocked fetch cannot see a `node:https` request): `content-length` equal to
the file and no `transfer-encoding`, the type, the Bearer token, `did` and `name`, the body's
SHA-256 over a few random MB, progress about every 10 percent, a top-level and a wrapped
answer, `already_exists` with a blob and with only a job id, the three error bodies observed
from the real service, and a server that stops reading (the stall limit, made short). Also the
service tokens' `aud`, `lxm` and `exp`, the job's states (an unknown one waits, completed
with a blob, failed with a code), `canUpload: false`, a failed upload with no
post, `--upload-only` then reuse, the timeout and picking the job up, and an already-posted
video. For `reply`: the facet's byte offsets after a non-ASCII character, the root when the
parent is itself a reply, a dry run that only reads, the live record and log, a mention not in
the episode, a handle that now resolves elsewhere, the opt-out list, links, a parent by someone
else, and the DID check. For `dm`:
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

Added on 2026-11-21 for `repost` and the bio, from the same lexicons as known then (not
re-fetched for this change; check them before relying on a limit at its edge):

- `app.bsky.actor.profile`: `description` maxGraphemes 256, maxLength 2560 (UTF-8 bytes); it has no facets.
- `app.bsky.feed.repost`: `subject` (a `com.atproto.repo.strongRef`, `uri` and `cid`) and
  `createdAt`, both required.
- `com.atproto.repo.deleteRecord`: `repo`, `collection`, `rkey`, optional `swapRecord`.
- `app.bsky.feed.getPosts`: `uris` (at most 25), served without a token by the public AppView
  `public.api.bsky.app`; each post view has `uri`, `cid`, `author`, `record`, `embed` and the counts.
- `chat.bsky.convo.defs#messageInput`: `text` maxGraphemes 1000, maxLength 10000; `getMessages`
  and `listConvos` limit max 100; chat is reached with `atproto-proxy: did:web:api.bsky.chat#bsky_chat`.
- The `bot` profile self-label and the "only interact when tagged" guidance: atproto.com,
  "Build an Agent" tutorial.

Added on 2026-11-21 for `post` and `reply`. Which facts come from where:

- **Read that day from Bluesky's lexicons** (by the coordinator, and treated as the server's
  stated limits; each is in the tests):
  - `app.bsky.feed.post`: `text` maxGraphemes 300, maxLength 3000 bytes; `langs` at most 3;
    `reply` is `{ root, parent }`; `embed` may be `app.bsky.embed.video`.
  - `app.bsky.embed.video`: `video` required, a blob accepting `video/mp4`, maxSize 300,000,000;
    `captions` at most 20, each `{ lang, file }` with `file` a blob accepting `text/vtt`,
    maxSize 20,000; `alt` a string with no limit; `aspectRatio` `{ width, height }`, integers,
    minimum 1; `presentation` known values `default` and `gif`.
  - `app.bsky.richtext.facet`: `index` is `{ byteStart, byteEnd }` over the text's UTF-8 bytes,
    start inclusive, end exclusive; a mention is `{ $type: 'app.bsky.richtext.facet#mention', did }`.
  - `app.bsky.video.getUploadLimits` (output `canUpload` required, `remainingDailyVideos`,
    `remainingDailyBytes`, `message`, `error`), `uploadVideo` (output described as
    `{ jobStatus }`; but see "observed" below: the real service answers at the top level) and
    `getJobStatus` (`jobId`, `did`, `state`, `progress` 0 to 100, `blob`, `error`, `failureCode`,
    `message`); the job states and failure codes in `src/video.mjs`.
- **From Bluesky's video upload tutorial**, not a lexicon: the two service auth tokens (their
  `aud`, `lxm` and the upload token's 30-minute `exp`), the upload request's URL, headers and
  host `video.bsky.app`, polling until `blob` is set, the `already_exists` answer carrying the
  earlier blob, the need for a verified email, the daily limits, and the app's 10-minute limit
  on a video's length.
- **Not read that day; from the tutorial and from what `repost` already does**: the
  `com.atproto.server.getServiceAuth` parameters (`aud`, `lxm`, `exp`) and its `{ token }`
  output, and the strong ref (`com.atproto.repo.strongRef`: `uri` and `cid`) used for
  `reply.root` and `reply.parent`.
- **Observed 21 November 2026**, from unauthenticated probes of `https://video.bsky.app` (by
  the coordinator; distinct from what the lexicon and the tutorial say). Each body is in
  `test/post.test.mjs`, verbatim:
  - `POST /xrpc/app.bsky.video.uploadVideo` with no token: HTTP 401,
    `{"did":"","error":"missing token","jobId":"","state":""}`;
  - `GET /xrpc/app.bsky.video.getJobStatus?jobId=<unknown>` with no token: HTTP 400,
    `{"did":"","error":"invalid jobId","jobId":"","state":""}` (it answers without a token, so
    polling without one is right);
  - `GET /xrpc/app.bsky.video.getUploadLimits` with no token: HTTP 401,
    `{"canUpload":false,"error":"missing_token"}`.

  So the upload's answer is a job status at the top level (`did`, `jobId`, `state`, `error`,
  and by the tutorial `blob` when done), not wrapped in `jobStatus`; error bodies carry `error`
  and often no `message`; an absent job id is the empty string. The tutorial reads the upload's
  answer the same way: `jobId` and `blob` straight off its JSON.
- **The transport**: Node's built-in fetch has a fixed 300 s headers timeout that fires while a
  slow upload is still being written; it cannot be changed without the `undici` package. So
  the upload goes by `node:https` (see `src/atproto.mjs`).
- **Not built, for whoever meets a refusal next**: the Bluesky app's own source has moved to a
  multipart upload (`app.bsky.video.startUpload`, parts, `finishUpload`, `getUploadStatus`,
  `abortUpload`). The single-request `uploadVideo` still answers and is what the tutorial
  documents, so this package stays on it; if a real run is refused, look there first.
- **The reference record**: episode one's video post, as the owner's app created it and the
  server accepted it, from the scraper's copy (in `test/post.test.mjs`, with the member's link
  and the text cut). It is why the embed carries `presentation: "default"` and passes the job's
  blob through untouched.
