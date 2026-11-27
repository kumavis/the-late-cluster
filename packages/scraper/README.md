# @late-cluster/scraper

Reads public Bluesky through the public AppView and writes a weekly dossier of what one
community talked about, built and laughed at. Stage 1 of the weekly pipeline
(`docs/ARCHITECTURE.md`, "The scraper").

- Node 22, ESM, no dependencies, no install step. Builtin `fetch`, `node:test`, `node:fs`.
- Read-only and unauthenticated. GET requests to public XRPC methods, nothing else.
- Deterministic: no language model, no randomness. The same cached responses give the same
  stories, ids, scores and order.

## Run it

```sh
npm run scrape                          # since the previous episode aired (from the ledger),
                                        # else the most recent complete ISO week (UTC)
npm run scrape -- --week 2026-W46       # a given ISO week, Monday 00:00 to Monday 00:00 UTC
npm run scrape -- --days 7              # a rolling 7-day window ending now
npm run scrape -- --since 2026-11-13    # from 00:00 UTC on a date, to now
npm run scrape -- --since 2026-11-13T18:00Z --until 2026-11-16T12:00Z
npm run scrape -- --out /tmp/digest     # somewhere other than data/weeks/<week>/
npm run scrape -- --max-requests 300    # a tighter request budget for this run
npm run scrape -- --no-cache            # ignore the response cache
npm run scrape -- --prune-cache         # delete the week's response cache after a successful run
npm run scrape -- --ledger docs/ledger  # where the ledger is (default docs/ledger)
npm run scrape -- --seeds did:plc:a,did:plc:b   # these seeds only, for a comparison
npm run scrape -- --membership-only     # the cluster only: membership.json, no posts
npm run lookup -- --text "pen plotter"  # find exact records in the newest digest (compact)
npm run media -- --dir data/weeks/2026-W47 --uri at://...   # fetch a post's pictures to look at
npm run sources -- check episodes/<id>/production/sources.json [--json]   # the live source check
npm test                                # unit and pipeline tests, no network
```

From inside the package: `node bin/scrape.mjs ...` and `npm test`.

### Choosing the window

Exactly one of `--week`, `--days` or `--since` (none means the most recent complete ISO
week). Windows are UTC, start inclusive, end exclusive.

- `--week 2026-W47`: Monday 00:00 to the next Monday 00:00.
- `--days 7`: the 7 days ending now (to the second).
- `--since <date or date-time>`: a bare date is 00:00 UTC that day; a date-time without an
  offset is UTC; `Z` or `±hh:mm` is honoured. `--until` (same formats) ends it and defaults
  to now; it needs `--since`, must be after it, cannot be in the future, and the window can
  be at most 60 days long. Its label is its two ends, `2026-11-13T0000Z_2026-11-19T0831Z`.

Default output folder: `data/weeks/<week>/` for a week; `data/ranges/<label>/` for `--days`
and `--since`, since such a window has no week name. Pass `--out` to put it anywhere else,
for example where the pipeline expects a week: `--since 2026-11-13 --out data/weeks/2026-W47`.
The digest's title, window metadata (`window.kind` is `week`, `rolling` or `range`, with
exact `start` and `end`), headings ("The window at a glance") and "busiest day" describe the
real window; a partial first or last day is noted. The phrase baseline is the
`baselineWeeks` weeks before the window's start, whatever its kind, and `posts.jsonl` from
earlier weekly folders that overlap that baseline are added to it (only posts inside the
baseline period count).

Environment: `SCRAPER_USER_AGENT` overrides the User-Agent. Keep it generic.
`SCRAPER_BSKY_SESSION` is reserved for a later authenticated mode; today it only prints a
warning and is ignored.

## Outputs

Written to `data/weeks/<week>/` at the repo root (gitignored), or to `--out`:

| file | what |
|---|---|
| `posts.jsonl` | every kept post in the window, one JSON object per line, oldest first |
| `digest.json` | `format: late-cluster-digest/1`: window (with its `source`), run metadata, stats, overview, `sections` (`games`, `built`, `aboutShow`, `newVoices`, `interview`, `performableThreads`), ranked `stories`, `appendices`, `members`, `authors`, `ledger`, `coverage` |
| `coverage.md` | the coverage report for the scope review; see "Coverage" |
| `digest.md` | the same for a writer with ten minutes, in this order: the week at a glance; **Community games** (Top Chicken as a segment); **Built this week**; **New voices**; **Interview material**; **Threads you could perform**; the top 15 stories with their best unmarked posts quoted and linked (stories left out for consent without headlines; marked posts listed, not quoted); then appendices (A most active accounts, B links that circulated, C phrases that spiked, D "X week" declarations, E how it was made) |
| `skeletons/` | a card skeleton per story (`<id>.json`), `index.json`, and `by-post.json` (post address to skeleton id); see "Skeletons and lanes" |
| `lanes/` | `<lane>.json` and `<lane>.md` for `made`, `talk`, `games`, `voices`, `interview`, `tagged`: the skeleton ids each research lane should look at, ranked |
| `reviewers/` | `about-show.json` and `.md`: posts and stories about the show itself, for reviewers and auditors only (trial 002, finding 11) |
| `private/` | `profiles.json` (every kept account's profile description and labels as read) and `bio-review.md`: for the auditor only; see "Bios" |
| `media/` | pictures and video thumbnails fetched by `npm run media`, on request only |
| `.cache/http/` | raw API responses keyed by URL; see "The response cache" |

Each author in `authors` carries `followers`, `small`, `member`, `bot`, `pronouns` (see "Pronouns"), `pronounsReview` and `bioReview` (when set: the bio says something about quoting or bots, a note for the repost test; see "Bios"),
and from the ledger `featuredPrevious` / `featuredEarlier` (`"spoke"`, `"shown"` or null) and
`timesFeatured`; posts carry `featured` when either is set, and `reach` (see "Reach").

`digest.md` has no "About the show" section, and stories about the show are listed in
`digest.json` only as `{ id, rank, aboutShow: true, movedTo }`: what people said about the
show is in `reviewers/` (finding 11). `sections.aboutShow` is a pointer with counts.

### Looking things up

`digest.json` is several megabytes. Agents should not read it whole; they ask for records:

```sh
npm run lookup -- --uri at://did:plc:.../app.bsky.feed.post/...   # or --url https://bsky.app/profile/.../post/...
npm run lookup -- --text "pen plotter"            # posts containing the words
npm run lookup -- --author cee.wtf                # an account's posts, oldest first
npm run lookup -- --story s-4781333501            # a story's header and posts (from its skeleton)
npm run lookup -- --thread https://bsky.app/...   # a thread from its root, in reply order
npm run lookup -- --dir data/weeks/2026-W47 ...   # a given digest (default: the newest)
npm run lookup -- --text plotter --fields uri,text,skeleton   # only these fields
npm run lookup -- --uri at://... --full           # the whole stored record
```

It reads `posts.jsonl`, `digest.json` and `skeletons/`, writes nothing, and prints one
**compact** JSON record per line, because a long line is paid for at every later step of the
agent that read it:

```jsonc
{"uri":"at://...","handle":"samantha.wiki","time":"2026-11-14T20:02:44.143Z","text":"exact text",
 "counts":[83,10,88,7],            // likes, reposts, replies, quotes
 "replyTo":"at://...",             // the parent's address, or "hidden"
 "quote":"at://...",               // the quoted post's address, or "removed"
 "pronouns":"she/they",            // the author's stated pronouns as written; absent: none stated
 "media":["image (no alt)"],       // each picture or video, and whether it has alt text
 "marks":["health"],               // sensitive topics and consent reasons, when any
 "repostNotes":["says \"no QTs\" (...)"], // what it says about being quoted: a note, refuses nothing
 "redacted":true,                  // when the consent rules altered the text
 "skeleton":"s-4781333501"}        // the story it is in
```

`--fields a,b,c` prints just those fields of the full record (plus `skeleton`); `--full` prints
the stored record. Posts about the show are not printed (`--about-show` prints them, for
reviewers). Text is exact as stored. A record with `redacted: true` had an excluded account's name
replaced with `[opted-out]` (see "Naming an excluded account"): it is not the post's verbatim
text and is never quotable. A post withheld for being about an excluded account is in neither
file, so no query finds it. A thread that is one of the performable threads prints that complete
thread; any other is assembled from the posts the digest holds and says so.

### The response cache

Every response is cached under `<out>/.cache/http/`, keyed by URL (profiles also one per
account, so a changed set of authors does not refetch the ones already seen), so a re-run or a resumed
run makes no requests and gives the same digest. It is large (about 280 MB for W46, mostly
author feeds and profiles) and only useful while iterating on scoring or grouping for that
week. Drop it with `--prune-cache` (after a successful run; a failed run keeps it so it can
resume), set `"pruneCacheAfterRun": true` in `config/client.json` to do that on every run,
or delete `data/weeks/<week>/.cache` by hand. Outputs are never touched.

The cache belongs to its output folder and is never shared between folders. A different
window asks different questions (author feeds are paged from the window's end), and the
few that look the same, profiles and follow lists, are deliberately fetched fresh for each
window: a profile is where an account says not to be quoted, and that must be current.
Collection keeps `collection.profileReserve` (250) requests back from the baseline sample so
the profile checks at the end always fit the budget.

A post record holds: `uri`, `url` (bsky.app), `authorDid`, `handle`, `displayName`, `text`,
`createdAt`, `indexedAt`, `time` (effective time: `createdAt` unless it disagrees with
`indexedAt` by more than a day), `langs`, `counts` (likes, reposts, replies, quotes),
`reply` (`root`, `parent`, `hidden`), `quote` (`uri`, `state`), `links` (`url`, `domain`,
`title`), `imageAlts`, `hasImages`, `hasVideo`, `media` (each picture or video: `kind`
`image` or `video`, `url` (the full-size picture or the video's playlist on Bluesky's public
CDN), `thumb`, `alt`, `hasAlt`), `embedded` (a feed or list card), `tags`,
`labels`, `sources` (how we found it: `author`, `context`, `thread`, `quoted`, `search`,
`feed`), `member`, `memberReposts` where members reposted it, `authorFollowers` and
`smallAccount` (under `safety.smallAccountFollowers`, 300), `guest` for a recurring guest,
`sensitive` (the out-of-bounds topics it matched), `consent` (consent reasons, see "Marks"),
`repostNotes` (what it says about being quoted, kept or screenshotted: a note, see "Marks"),
`aboutShow` (for reviewers only), and, when the consent rules changed its text, `redacted: true` with `outOfBounds: { topics: ["redacted"], rule: "R11" }` (the field the
writers' room gates refuse as a source). Every summary of such a post elsewhere in the digest
(a brief, a quoted post, a reply's parent, a winning post) carries the same two fields. Story posts also carry `inReplyTo` (the
parent: handle, text, URL) and `quoted`. No avatars, images, video, profile descriptions, or
follower lists; follower *counts* only. Pictures and videos are kept as addresses; the scrape
never downloads them.

`authors` in `digest.json` maps every author who appears to `{ handle, displayName,
followers, small, member, guest }`; `members` lists the cluster with the same fields.

A story in `digest.json`:

```jsonc
{
  "id": "s-d360adbbff",            // sha256 of the anchor key: stable across re-runs
  "rank": 1,
  "kind": "quote-chain",           // thread | quote-chain | link | built | phrase | post
  "headline": "first line of the lead post",
  "anchor": { "kind": "thread", "value": "at://..." },   // what the group hangs on
  "reason": ["9 replies in one thread", "26 quote posts", "28 cluster members took part"],
  "scores": { "total": 5.62, "breadth": { "raw": 4.8, "norm": 1, "weight": 1.6 }, ... },
  "stats": { "posts": 104, "authors": 31, "members": 28, "engagement": 2300, "memberReposts": 12, "quotePosts": 26, "days": ["2026-11-09", ...] },
  "links": [{ "url": "...", "title": "...", "members": 4, "isNewDomain": false, "buildHost": true, "ownDomain": false, "built": true }],
  "phrases": ["chimera"],
  "outOfBounds": null,             // consent only: { "rule": "R11", "reasons": [...] }; see "Marks"
  "sensitivity": { "topics": ["health"], "counts": { "health": 3 }, "postsMarked": 3, "leadMarked": false, "hint": [] },
  "consentMarked": 0,              // posts in the story with a consent mark
  "repostNoted": 0,                // posts in the story with a repost note (when any)
  "context": [],                   // the thread root, when it predates the window
  "posts": [ /* post records plus metrics: engagement, baseline, lift, score; and quoted */ ]
}
```

## Skeletons and lanes

Workflow v3, stage 2: the scraper does the copying (trial 002, findings 7, 8, 10, 11, 12).
Every story in the window gets a **card skeleton**, and each research lane gets a **slice**: the
skeleton ids it should look at, ranked, one line each. A researcher chooses skeletons, merges
those that are one story, and adds prose; nobody retypes a post. A story is written once,
however many lanes it suits. `src/skeletons.js`; config `config/lanes.json`. These shapes are
what the pipeline reads; a change to one is a change to this section.

**`skeletons/index.json`** (`late-cluster-skeletons/1`), one skeleton per line:

```jsonc
{ "format": "late-cluster-skeletons/1", "window": { "label", "start", "end" },
  "counts": { "stories", "written", "excluded", "noMember", "aboutShowForReviewers", "posts", "postsMarked", "byLane": {} },
  "lanes": ["lanes/made.json", "..."],
  "skeletons": [
    { "id": "s-4781333501", "rank": 1, "kind": "thread", "headline": "first line of the lead post",
      "posts": 148, "members": 30, "authors": 49, "reach": 1518, "lanes": ["made", "talk"],
      "postsMarked": 2, "leadMarked": false, "consentMarked": 7, "repostNoted": 1, "excluded": false, "media": 11,
      "file": "skeletons/s-4781333501.json" } ] }
```

**`skeletons/<id>.json`** (`late-cluster-skeleton/1`), the header indented and one post per line:

```jsonc
{ "format": "late-cluster-skeleton/1", "id", "rank", "window", "kind",
  "headline": "...",                         // null when the story is excluded
  "lanes": [{ "lane": "made", "why": "a video by @someone" }],
  "makers": [{ "did", "handle", "evidence": ["a video"], "posts": ["at://..."] }],   // made stories only
  "reason": [], "stats": { "posts", "authors", "members", "days", "quotePosts", "memberReposts" },
  "reach": { "score", "likes", "reposts", "quotes", "replies", "participants", "formula", "note" },
  "marks": { "postsMarked", "leadMarked", "topics": { "health": 2 }, "consentMarked", "leadConsent", "repostNoted", "hint": [] },
  "excluded": null,                          // or { "rule": "R11", "reasons": [] }: then posts is []
  "links": [{ "url", "title", "domain", "members", "built" }], "phrases": [],
  "omitted": { "aboutShow": 3 },             // when posts about the show were taken out
  "context": [],                             // the thread root, when it predates the window
  "posts": [] }                              // oldest first, each as below
```

A **post** in a skeleton (the same fields `posts.jsonl` uses for marks):

```jsonc
{ "uri", "url", "handle", "time", "text": "exact", "hasText": true,
  "author": { "did", "handle", "displayName", "followers", "member", "small", "bot",
              "featuredPrevious", "featuredEarlier", "timesFeatured", "bioReview": true },
  "counts": { "likes", "reposts", "replies", "quotes" }, "reach": { "score", "participants" },
  "replyTo": { "uri", "handle", "inStory": true },           // the parent is in this skeleton
          // or { "uri", "url", "handle", "displayName", "text", "time", "inStory": false, "author", "media", "sensitive", "consent" }
          // or { "hidden": true, "note" }, or null
  "root": "at://...",                                         // when the root is not the parent
  "quoted": null,                                             // as replyTo with "state": "ok", or { "state": "removed", "note" }
  "links": [], "media": [{ "kind": "image", "url", "thumb", "alt": null, "hasAlt": false }],
  "embedded": {}, "redacted": true,
  "sensitive": ["health"], "consent": ["redacted"],                  // only when marked
  "repostNotes": ["says \"don't quote me\" (asked not to be quoted)"] } // only when noted; refuses nothing
```

Optional fields are left out when empty. A post with a picture or video and no text is a valid
skeleton post (`hasText: false`, finding 10); `npm run media` fetches what it shows.
`skeletons/by-post.json` maps every post address in a skeleton to its skeleton id, for tools.

**Lane hints.** `made`: a member made something and showed it: their own build in Built this
week, a link to their own site, a built link they say they made, a video, or a picture or link
they say they made (`lanes.json` `made.patterns`); sharing someone else's repository is not
making it. `talk`: at least 4 posts from at least 3 members, or a spiked phrase. `games`: a game
account's posts, a winning post, or talk of scores, records and bets. `tagged`: a member of the
cluster pointed at it by tagging the show's account. Stories the consent rules leave out are in no
lane.

**`lanes/<lane>.json`** (`late-cluster-lane/1`) and a short `lanes/<lane>.md`:

```jsonc
{ "format": "late-cluster-lane/1", "lane": "made", "window", "rule": "how this lane is ranked",
  "skeletons": ["s-..."],                   // every skeleton id the lane points at, ranked, once each
  "entries": [{ "rank": 1, "id": "s-...", "line": "headline — why; 75 posts, 16 members, reach 801", "score": 3.2 }] }
```

- `made`, `talk`, `games`: one entry per skeleton.
- `games` adds `games`: per game the `standings` (each `{ time, likes, winner, mayName, why,
  winningPost: { uri, url, skeleton, mayQuote, marks, repostNotes }, resultPost }` (a repost note does not change `mayQuote`); an excluded winner is
  `{ excluded: true }` with no post), the `record` (`mayName`), the `leaderboard` (an entry has
  `mayName` only for the record holder and the window's winners: R7 names the winner of the
  moment), history, participation and streaks.
- `voices`: one entry per person, `{ rank, did, handle, displayName, followers, small,
  postsInWindow, strength, line, posts: [{ id, uri, score, line, repostNotes }] }`. Members the show has never
  featured; each unmarked post scores `ln(1 + engagement) + 1.2 × lift − 1.5 × log10(followers +
  10)`, so a small account's good day can lead. Left out: bots, accounts over 3,000 followers,
  marked posts, and anything in a story the consent rules leave out.
- `tagged`: one entry per thing a member pointed at; see "The tagged lane".
- `interview`: one entry per candidate, `{ rank, did, handle, displayName, followers, small,
  featuredEarlier, timesFeatured, line, made: [{ id, asked, line }], pairs: [{ skeleton,
  aboutMade, kind, question: { uri, url, handle, displayName, text, time, member, followers,
  small, repostNotes }, answer: { uri, url, text, time, counts, repostNotes } }] }`. A repost note
  never keeps a pair out. Ranked by having made something and
  been asked about it in public (finding 8): pairs whose question replies to, quotes or sits
  under the post that shows the made thing, then how many such pairs, from how many people,
  about how many things; then members with at least three usable pairs of any kind. Inside a
  made story, a reply to the maker that the maker answered counts as asking (`kind: "reply to
  the maker"`). **Every** usable pair is given, oldest first. Nobody who appeared in the
  previous aired episode; no bots.

## The tagged lane

What the audience pointed at (WORKFLOW stage 2). `src/tagged.js`; config `config/lanes.json`
`tagged`. A tag guides where the show looks and decides nothing else.

**A tag** is a post whose own mention facets carry one of the show's DIDs (`show.config.json`
`bluesky.did`, `cluster.json` `showAccount`, and any DID in `show.json` `handles`). Tags are found
in everything collected, and by `app.bsky.feed.searchPosts` on `api.bsky.app` with the `mentions`
parameter (the `mentions:` operator in `q` answers 400 unauthenticated; so does `from:`), then the
handle as text; every hit is checked for the facet. The search's results and any thread fetched for
a pointer go to a store of their own, never into the digest's stories.

**A pointer**, told from a tag about the show, in this order:

- the show's own posts are not taggers (counted as `own`);
- a tag that links the show, or whose own text or alt text reacts to it (`aboutShowPatterns`:
  "loved the episode", "when's the next", "my puppet", ...) is about the show;
- a quote: a pointer at the quoted post, unless that post is the show's or about the show (names or
  links it). A quote of another tag follows it to what that one points at;
- a reply: a pointer at the parent, unless the parent or the thread root is the show's own post or
  about the show (a tag in a thread under an episode is a reaction to it). A reply to another tag
  follows it;
- a top-level post: a pointer at itself when it carries a link (the link is the thing), a picture or
  video, or at least `minOwnWords` (6) words besides mentions; otherwise "only the tag".

Naming the show in a reply or quote ("this belongs on the late cluster") does not stop it pointing.
A tag that is not a pointer stays where posts about the show go (`reviewers/`). A reply or quote
pointer is the audience addressing the show about someone else's post: it is written to
`posts.jsonl` marked `addressedToShow: true` and kept out of every story, score, section and reach
figure, so tagging never raises a story's rank in another lane or its reach. Replies under, and
quotes of, such a pointer are about the show. A top-level pointer is the thing itself and stays in
its story, marked `addressedToShow`.

**Who counts.** Only a member of the window's cluster (the membership the scope stage audits):
a tag from anyone else is counted (`notMember`) and never listed. Bots and accounts excluded on
consent grounds are not taggers. An excluded account's post is never shown or named because
someone pointed at it, and neither is a story the consent rules leave out: the pointer is counted
(`excludedTarget`) and nothing else. Every sensitivity and consent mark applies to the pointed-at
post as everywhere else, and to the tagger's own.

**Weight.** Each counted pointer weighs the tagger's centrality: the membership score the cluster
already computes (`3·seedFollows + min(interactions, 12) + 4·roster + ...`, `cluster.json`
`expansion.weights` and `caps`) divided by the window's highest member score, at least
`weight.floor` (0.05). Each tagger carries `centrality: { raw, max, normalised, weight, seed,
components }`, so an auditor can see why a pointer ranked where it did. A seed's score counts only
what other seeds give it (seeds are not ranked against the cap), so a seed can weigh less than its
place suggests. One member pointing at the same thing twice counts once (`repeat`); a member's nth
distinct thing in the window counts `weight.repeatDecay`^(n-1) (0.5) and at most `perTaggerCap` (5)
count (`overCap`). An entry's weight is the sum over its taggers; the lane is ordered by weight, then
by people, then by the story's reach.

**Outside the cluster.** When the thing pointed at is not in the digest, its thread is fetched (one
`getPostThread` of its root, `threadDepth` 6, at most `maxThreads` (20) a run) and analysed apart
from the digest, so it changes no other story's score or rank. Its skeleton has the id `x-…`,
`rank: null`, `outsideCluster: true`, and no lane but `tagged`.

**`lanes/tagged.json`**: the lane shape plus `counts` (`tags`, `pointers`, `counted`, `taggers`,
`entries`, `aboutShow`, `ignored: { own, notMember, bot, excludedTagger, overCap, repeat,
excludedTarget, notFound }`) and `aboutShowWhy`. An entry:

```jsonc
{ "rank": 1, "id": "s-…", "kind": "reply",            // reply | quote | link | post
  "target": { "uri", "url", "handle", "did", "time", "text", "member": true, "pronouns", "media": 1, "sensitive"?, "consent"?, "redacted"? },
  "link"?: "https://…", "outsideCluster": false,
  "taggers": [{ "uri", "url", "handle", "did", "displayName", "time", "text", "kind", "addressedToShow": true,
                "member": true, "followers", "small", "pronouns", "weight": 0.6, "nth": 1,
                "centrality": { "raw": 18, "max": 30, "normalised": 0.6, "weight": 0.6, "seed": false, "components": {} } }],
  "weight": 0.6, "people": 1, "reach": 120, "line": "…", "score": 0.6 }
```

The pointed-at skeleton gets the lane hint `tagged` and nothing else changes. The coverage report
gains one line: pointers, counted, taggers, things, ignored and why, tags only about the show, in
counts. `lanes/tagged.md` opens with the rule, including that a tag from outside the cluster was
never there to see. `digest.json` `run.tagged` records the searches and threads fetched.

## Pronouns

Each account's stated pronouns (`src/pronouns.js`), with no extra requests: the profiles the run
already reads carry Bluesky's built-in `pronouns` field.

- `pronouns: { text, forms, source }`: `text` exactly as the person wrote it; `forms` the subject
  forms it names (`she`, `he`, `they`, `it`, `xe`, `ze`, `ey`, `fae`, `ve`, `per`, `any`, or
  `name` for "no pronouns"); `source` `profile` for the built-in field, else `bio` for an explicit
  statement in the bio: a slash set ("she/her", "he/they", "xe/xem"), "any pronouns", "no
  pronouns", or "pronouns: …". Never a lone word, never a guess from anything else.
- A bio that states two different sets records none and marks `pronounsReview` (listed with the
  statements in `private/bio-review.md`, "Pronouns to judge", for the auditor).
- `pronouns: null` means none stated.

The phrase goes wherever an author record goes to other roles: `authors` and `members` in
`digest.json`, every skeleton post's `author` and its `replyTo`/`quoted` `author`, lane entries per
person (voices, interview answers and questions, game winners, tagged taggers and targets), and
`npm run lookup`'s compact record. The bio stays in `private/`. `npm run sources -- check` reports
each account's pronouns as they are now and raises `pronouns changed` against the digest's record.

## Marks

Findings 7 and 37: a keyword marks the post it is in, not its story.

- **`sensitive`** on a post: the R10 topics its text, alt text, link titles or quoted text
  matched. The story carries `sensitivity` (topics with counts, `postsMarked`, `leadMarked`, and
  the old story-level `hint`), and the rest of the story stays usable. A marked post is listed in
  `digest.md`, never quoted, and a story whose lead is marked is listed by its mark.
- **`consent`** on a post: `redacted` (it names an excluded account), `replies to an excluded
  account`. These refuse the post.
- **`repostNotes`** on a post: what it says about being quoted, kept or screenshotted, with the
  words matched (`says "don't quote me" (asked not to be quoted)`, from `sensitivity.consentTopics`
  and `selfDeclaredOptOut.indirectPatterns`), and `its author said something about being quoted
  elsewhere in this story` on that author's other posts in the story. The owner's ruling of 27
  November 2026 (bible R2, R11): "anything said in public is fair game unless they explicitly
  asked this account to not do that". A general remark is not an ask to the show, so a note
  refuses nothing, removes no story and excludes nobody; it travels with the post into the
  skeletons, the lanes, `digest.md` and `npm run lookup`, as evidence for the reviewer's repost
  test (R6). The same words in a post about the show are an ask to the show (see "About the
  show"). A digest written before the ruling carries `consent: ["asks not to be quoted"]`
  instead; `npm run media` and the writers' room read that as a note.
- **A story is left out whole only for consent** (`outOfBounds: { rule: "R11", reasons }`): its
  thread starts with an excluded account's post, or its lead post or thread root carries a
  consent mark (a redacted lead). Its skeleton keeps the counts and no posts or headline;
  `digest.md` lists it as **LEFT OUT (consent)**.
- `overview.outOfBounds` lists the consent exclusions in the top 30; `overview.sensitive` the
  stories with marked posts.

## Media

`npm run media -- --dir <digest folder> --uri <at:// or bsky.app address> [--json]` fetches the
post's pictures at full size, or its video's thumbnail, from Bluesky's public CDN
(`cdn.bsky.app`, `video.bsky.app`; no other host) into `<digest folder>/media/` (gitignored,
under `/data/`), and prints each file's path with its alt text or "no alt text" (finding 9).
A file already there is not fetched again. It fetches only posts that are in the digest, and
refuses a redacted post, a post with a consent mark, a post about the show, and a post inside
a story the consent rules leave out (exit 1). A post with only a repost note is fetched. The User-Agent is the scraper's generic one.

## The live source check

`npm run sources -- check <path/to/sources.json> [--dir <digest folder>] [--out <file.md>] [--json]`
(workflow stages 9 and 12; finding 35). Over the network, with the scraper's generic client
name and no cache, it reads what an episode's `sources.json` cites: `posts[].uri` with `text`
and `cuts`, `posts[].replyTo` and `quoted`, `lines[].post` and `context` with `contextText`,
`numbers[].post`, and `accounts[]` plus the author of every cited post. Then:

- every cited post still exists (`getPosts`), with the same text as stored in `sources.json`
  and in the digest; a stored text or cut with an ellipsis is a **marked cut** and must match
  the live text where it overlaps, its parts in order;
- every account as it is now (`getProfiles`): handle and display name against what was stored,
  labels (`!no-unauthenticated` is an opt-out), and the bio read for what it says about quoting,
  keeping or bots (a bio is never printed; for the wording an auditor should look at, only the
  matched words);
- its pinned post, and its posts since the digest's window ended (two pages of its feed), read
  for posts about the show or addressed to its account (naming, linking or mentioning it, or
  replying to or quoting the show's own post), with any ask to be left out or not to be quoted,
  kept, used or tagged, and for general remarks about being quoted (`consentTopics` and the
  indirect patterns);
- an account on the opt-out list is never requested and never named: it is reported by its
  place in the file.

Findings come at two levels (the owner's ruling, 27 November 2026; bible R2, R11). **Needs a
person** (`issues`): `opt-out` (the list, or `!no-unauthenticated` on the account or a cited
post's author), `post gone`, `account gone`, `text changed`, `cut does not match`, `pronouns
changed`, `about the show` (any new post about the show: a person reads it, since it may be an
ask) and `asks the show` (a post or pinned post about or addressed to the show that asks to be
left out, or not to be quoted, kept, used or tagged). **Notes** (`notes`), reported and stopping
nothing: `bio says` (the bio matches `selfDeclaredOptOut`), `bio review` (wording from
`bioReview.patterns`), `pinned post asks` and `post asks` (a general remark not addressed to the
show), `handle changed`, `display name changed` (the owner ruled on 22 November 2026 that a
changed display name does not reopen an approved episode). The Markdown report has a "Notes"
section after the findings that need a person.

Exit 0 when nothing needs a person, notes or not; 1 when something does; 2 for bad arguments.
`--json` prints one line, `late-cluster-sources-check/1`: `{ checkedAt, since, clean, counts:
{ posts, accounts, issues, notes, requests }, issues: [{ kind, where, what }], notes: [{ kind,
where, what }], posts: [{ uri, where, status }], accounts: [{ did, handle, where, status, checks
}], remarks }` (`remarks`: how the check ran, such as "no digest window"). An account row's
`status` is `ok`, `noted`, `opt-out` or `gone`. Each account row carries `pronouns` as read now.
For the trial's `sources.json` (48 posts, 16 accounts) it made 21 requests.

## Who is "the cluster"

The simcluster is amorphous and changes as its participants change. As the community's own
"are you in the simcluster?" checker does, the cluster is carved out from seed accounts, then
widened by signals that do not depend on the seeds. `src/cluster.js` is the rule,
`src/collect.js` the fetching, `src/seeds.js` the seed choice.

**Seeds**, by DID (handles are only labels, refreshed from the profile):

- whoever the show's own Bluesky account follows, read fresh on every run (never from the
  cache). The account's DID comes from `show.config.json` at the repo root (`bluesky.did`);
  `cluster.json` `showAccount.did` overrides it. The owner moves or widens the area by
  following people from that account;
- plus the bootstrap list in `cluster.json` `seeds`, each with its reason.

Every consent rule applies to seeds: an opted-out seed is never requested, and is counted, not
named. A self-labelled bot is skipped (bots follow no one). Being featured by the show does not
disqualify a seed: a seed decides where the show looks, not who it puts on screen. The tracker
and the repetition gate keep the same people from appearing too often.

`seedSelection.mode`: `show-follows` (default) as above; `fixed` uses the bootstrap list only;
`drift` (optional, off) takes each window's seeds from the previous run's most connected
members (distinct members who replied to or quoted them, or whom they replied to or quoted),
keeping a seed while it stays in the top `keepWithinTop` and changing at most `maxTurnover`
per run. The show's history plays no part in it. `--seeds a,b,...` replaces the seeds for one
run, for comparisons.

**Signals** for every account near the seeds:

- `seedFollows`: how many seeds follow it.
- `interactions`: in the seeds' own feeds over the window and baseline weeks, each time a seed
  replied to it, joined its thread, quoted, reposted or mentioned it; plus each reply it made
  under a seed's busiest posts of the week.
- `rosters`: on a community's own public roster (`cluster.json` `rosters`). Top Chicken's
  pinned post defines its contenders as the people its maintainer follows plus his followers;
  that graph is public, about 860 accounts, about 11 requests.
- `feedPosts`: posts in the community "SimCluster" feed.
- `listed`: on a configured list or starter pack. `termPosts`: search hits (search is off).

**Rules** (`expansion.rules`, named in `expansion.ruleNames`): a member satisfies any one rule.
Shipped: followed by 2 seeds and talked with one; followed by 3 seeds; followed by a seed and
3 interactions; 6 interactions; on a list; **on a roster and followed by a seed; on a roster
and talked with a seed; on a roster and in the community feed**; search rules; twice in the
feed and followed by a seed.

**The request planner** counts a page the response cache already holds as free (trial 002,
finding 3): every member's baseline walks as deep as the cache goes, and the budget then buys
the same extra depth for everyone it can (`api.planPages`). Widening the cluster on a warm
cache no longer thins every member's history; `run.pagesPerMember` records the plan.

**Cap** (`maxMembers`, 250): members are ranked by
`3·seedFollows + 1·min(interactions, 12) + 4·roster + 2·min(termPosts, 3) + 1·min(feedPosts, 3) + 10·listed`,
ties by DID. Seeds are never cut. The coverage report says how many qualified accounts the
cap cut, who the strongest of them are, and what including them would cost.

Before any member's posts are fetched, their profiles are read: a description that opts out
removes them there. After collection, everyone who can appear in the output is checked the
same way.

**The checker, compared.** The community's "Are you in the simcluster?" page
(shimmermathlabs.com/simcluster.html) publishes its method in its page script: 14 seeds and
14 hubs, and a score out of 100 from seeds the account follows (30), seeds that follow it
(30), mutual seed follows (20) and hubs it follows (20). Its footer says the score is "a
function of who started the crawl". Its lists are in `cluster.json` `references`, used only
to compare against in the coverage report; nothing is ever submitted to it.

### Search

`app.bsky.feed.searchPosts` is refused unauthenticated on `public.api.bsky.app`, on
purpose, and answers on `api.bsky.app`. Routing around the refusal is not a default this
package ships: `search.enabled` is `false`. **Turning it on is the owner's decision**; the
code, the `search.host` setting and the tests for it stay in place.

## Scoring

All weights live in `config/scoring.json`.

**Post engagement** `E = likes + 2·reposts + 3·quotes + 1.5·replies` (`engagementWeights`).
Quotes and reposts weigh more than likes because they spread a post.

**Author baseline and lift.** Each author's median `E` is computed from everything fetched
for them (window and baseline sample), separately for top-level posts and replies, because
replies get far less attention. `lift = log2((E + 1) / (baseline + 1))`: a post that did
eight times its author's usual has lift 3. Lift is 0 for authors with fewer than
`baselineMinPosts` posts, since we cannot say what their usual is. This is the main defence
against raw likes favouring the biggest accounts.

**Post score** (orders posts inside a story) =
`1·ln(1+E) + 1.2·max(0, lift) + 0.5 if a member` (`postWeights`). Members are listed before
outsiders in every story.

**Grouping** (union-find, deterministic, `src/stories.js`):

| key | rule |
|---|---|
| thread | every reply joins its thread root |
| quote | a top-level quote post joins the quoted post's story, so quote chains become one story. A reply that quotes something stays in its own thread. |
| link | top-level posts by two or more authors sharing the same normalized URL |
| domain | top-level posts by two or more members linking to the same domain, when the domain is new this week (not seen in the baseline) and not generic |
| phrase | posts still on their own that share a spiked phrase |

Cross-thread merges (quote, link, domain, phrase) are refused once a story would exceed
`grouping.maxMergedPosts` (150) posts, so one hub post cannot swallow the week. Each story
records the keys it was grouped by in `reason`, and its `id` is a hash of its anchor key.

**Story score** = Σ `weight × component / week's max of that component`:

| component | raw value | weight |
|---|---|---:|
| `breadth` | log2 of distinct cluster members in the story: conversations many members joined | 1.6 |
| `built` | 2 per link on a member's own domain, a build host (`buildHosts`) or a new domain announced with "I built ..." (`builtPatterns`), up to 3; 0.5 per merely new domain, up to 2; +2 if such a link was shared by 2+ members; +0.75 per member saying they built or shipped something, up to 3 | 1.3 |
| `engagement` | ln(1 + Σ E), outsiders' engagement counted at `outsiderEngagementFactor` (0.25) | 1.0 |
| `lift` | 0.7 × best member lift + 0.3 × second best | 1.0 |
| `burst` | strongest spiked phrase in the story, relative to the week's strongest | 0.8 |
| `quotes` | ln(1 + quote posts in the story) | 0.7 |
| `amplification` | ln(1 + reposts by members) | 0.6 |
| `runningBit` | distinct UTC days the story spans, minus one | 0.5 |

A story with no member posts is multiplied by `nonMemberFactor` (0.5), a single-post story by
`singletonFactor` (0.85). Ties break by id.

**Spiked phrases** (`src/phrases.js`): 1- to 3-word phrases (not starting or ending with a
stopword; unigrams at least four letters) and hashtags, from members' posts only. A phrase
spikes when at least `minAuthors` (3) distinct members used it this week and its rate per
post is at least `minRatio` (3) times its rate in the baseline sample, each author counting
for at most `perAuthorCap` posts. Rates are per post rather than per week because the
baseline is a sample: prolific accounts are fetched only a few pages back. Score =
`people × log2(1 + ratio) × (1 + 0.5·(words − 1))`. Fragments of one catchphrase used by
exactly the same people are folded into `variants`. If `data/weeks/<previous weeks>/posts.jsonl`
exist they are added to the baseline.

**Running bits** are spiked phrases used on 3 or more days.

## Coverage: is this the right community, widely enough?

Every run writes `coverage.md` and `digest.json` `coverage`, for the scope review (WORKFLOW
stage 1). It holds:

- **worries** in plain words, each against a threshold in `cluster.json` `coverage.thresholds`;
- **seeds**: each with its DID and reason, the show account's follow count, seeds not used and
  why (an excluded one counted, not named), and **suggested additional seeds** for the owner
  to follow from the show's account: members ranked by members they talked with in the window,
  plus half the accounts outside the cluster they talked with (how much they would widen it),
  plus 3 if on a roster;
- **how members qualified**: counts by rule, the signals among members, and how many
  qualified only through the seeds;
- **concentration**: the share of member posts, of the top 30 stories (by lead author) and of
  the builds that come from the ten most active accounts, from the seeds, and from accounts
  the show has featured before (from the ledger);
- **featured before**: from the tracker, how many aired episodes each featured account has
  appeared in;
- **new and gone** since the previous run, in counts with a sample;
- **independent signals**: the cluster against each roster and the community feed (members in
  it, members not in it, and its accounts that are not members but are active in the
  window's data, with samples), and how many of the checker's accounts are members;
- **the cap**: qualified, cut, the share cut, requests per member and the cost of including
  every qualified account, the strongest cuts;
- **excluded**, in counts only.

## The ledger

`--ledger <dir>` or `cluster.json` `ledger.dir` (default `docs/ledger`):
`featured.json` (the tracker: keyed by DID, the handle as last seen, appearances with
`episode`, `date`, `role` `spoke` or `shown`) and `<episode-id>.json` files whose `guests`
and `featured` are handles or `{ did, handle }`. Matching is by DID, then by handle. Only
aired episodes count (an episode with `aired: false` is a draft); an episode's date comes
from the file or from `episodes/<id>/episode.json` `airDate`. A missing or empty directory
means no featured marks and a worry in the coverage report. The ledger marks authors and
feeds the concentration figures; it never ranks anyone up and plays no part in seeds. The
default window starts at the latest aired episode's date.

## Reach

Bluesky publishes no view counts, so "how many people saw it" is approximated, per post and
per story, by what people did with it, kept as separate numbers plus one figure:

- `likes`, `reposts`, `quotes`, `replies` as the API counts them, and `interactions`, their sum;
- `participants`: distinct accounts that took part, in the data the digest holds: for a post,
  who replied to it, quoted it or (members) reposted it; for a story, who posted in it plus
  members who reposted any of it;
- `score` = `1×likes + 2×reposts + 3×quotes + 1.5×replies + 5×participants`
  (`scoring.json` `reach.weights`). The formula is printed wherever reach is shown.

The reposters' audience is left out. `getRepostedBy` gives who reposted (one request per
post per 100 reposters) but not their follower counts, which need `getProfiles` as well, and
summing followers double-counts overlapping audiences and is still not views. The part
already in hand, the followers of members who reposted, is reported as
`memberRepostAudience`, never in the score.

## What the writers get (design bible)

`docs/bible/README.md` ("What the bible assumes the digest provides") lists what the writer
needs. Where each item is:

| bible asks for | where |
|---|---|
| per post: URI, URL, verbatim text, handle, display name, date, counts, reply/quote of what, alt text, links | every post record; story posts add `inReplyTo` and `quoted` |
| per author: follower count, featured before | `authors`, `members`, and `authorFollowers` / `smallAccount` / `featured` on posts; `digest.md` writes "(**small account**, 43 followers)" next to every name |
| thread context for anything quotable | `inReplyTo` on story posts; the thread root as `context`; stories list the strongest replies |
| opt-outs applied (the list, `!no-unauthenticated`, asks to the show); bios and posts that say something about being quoted, as notes | see "Consent and safety" and "Marks"; requests to the show are listed in About the show |
| sensitivity flags | `sensitive` and `consent` on posts, and `repostNotes` (a note, not a flag); `sensitivity` (a hint) and `outOfBounds` (consent only) on stories; `outOfBounds` on builds and phrases; see "Marks" |
| things built this week | `sections.built`, "Built this week" |
| recurring phrases, "X week" declarations, first posts of anything that spread | `appendices.phrases` (with `first`), `appendices.weeks` |
| reactions to the show | `reviewers/about-show.json`, for reviewers only |
| new voices, interview candidates | `lanes/voices.json`, `lanes/interview.json`; also `sections.newVoices`, `sections.interview` |
| community games and metrics | `sections.games`, "Community games": Top Chicken is configured; the Simcluster Channel's forecasts and prediction markets have no known public account yet, and are one entry each in `config/games.json` once they do |

### Community games

`config/games.json` lists games whose results an account posts publicly: the account, a
`resultPattern` that recognises a result, `fieldPatterns` whose named groups become fields,
which fields are people (`personFields`) and numbers (`numberFields`), and how to find the
winning post (`winningPost: "quote"`). Adding a game is a config entry, no code. The game
account's posts in the window are fetched (one or two requests) and every result is
reported: when, the winner (with follower count), the winning post with its text and link
(from the post the result quotes), the like count, the all-time record and its holder, and
the window statistics. Winners and record holders go through the consent rules: an excluded
person is replaced by "not included", the result is still reported, and the result's own
text (which names them) is not kept. A winning post flagged by the sensitivity lists is
linked, not quoted. The section carries the bible's R7 note: the winner may be named on air, subject to the opt-out
rules, and nobody who did not win is named or ranked.

Top Chicken's roster, for the record: its pinned post says contenders are the people its
maintainer follows plus his followers, under the Grace Limit (fewer than 7k followers). That
graph is public (`getFollows` and `getFollowers` of the maintainer: 260 + 769, 861 distinct
accounts, 13 requests); the game account itself publishes no list, feed or starter pack and
follows only its maintainer. 89 of this package's 120 W46 members (under the cap as it then was) are in it, and 772 roster
accounts are not members. It is **not** used to define the cluster; see the trade-offs in the
scraper's second-pass report.

### Threads you could perform

Candidate threads for performing word for word, chosen deterministically: rooted in the
window, `minPosts`-`maxPosts` posts (4-24), at least `minSpeakers` (3) speakers of whom
`minMemberSpeakers` (3) are members, at least `minTurns` (4) replies to someone else, every
post under `maxChars` (280) characters with words to say (not only a link or a mention), no
sensitivity flags, no hostile wording (`avoidPatterns`), no text redacted by the
consent rules, no quote of an excluded post, and every post reachable from the root (nothing
excluded or missing in the middle). Ranked by `2·member speakers + 1.5·turns + ln(1 +
engagement) − mean length / 100`, with a small penalty past 12 posts.

The leading candidates are fetched whole with `getPostThread` and the analysis runs again,
so the threads offered are complete (`complete: true`). In `digest.json` each thread is
every post in depth-first order (replies by time), with URI, author, follower count, **the
exact post text**, depth and `inReplyTo`; a removed reply (excluded by the consent rules, or
deleted) appears as `{ removed: true, count, inReplyTo }`, with no URI or author of its own.
`digest.md` renders them as indented dialogue; its Markdown escaping is for display, and
digest.json is the source a character-for-character check should compare against.

### Built this week

For each build: the link and title, who built it and when, who else shared it, and **the
wish**: the post the build replied to or quoted, with its author and text (the builder's
own earlier posts in the same thread do not count), **and only if it reads as asking for
something**: it matches `scoring.json` `wishPatterns` ("someone should", "can you", "I want",
"what if", "concept:", ...), mentions the builder, or ends in a question mark. Otherwise it is
listed as what the build replied to, "in reply to (not a wish)". A link counts when it is on a member's
own domain (their handle is a domain and the link is on it or a subdomain), on a build host
(`buildHosts`, not a host's front page), or on a domain not seen in the baseline that the
post says it built (`builtPatterns`). The builder is whoever announced it, else whoever owns
the domain, else the first to post it; a link nobody announced or owns is marked `shared`
rather than `built`, and its parent is labelled "in reply to", not "the wish". At least one
member has to be involved.

Order is by how good a story it is (`scoring.json` `builds.weights`):
`3·wish + 1·wish by someone else + 1.5·log2(1 + members who shared it) + 0.75·ln(1 + replies
and quotes) + 1·announced + 1·own domain + 0.5·ln(1 + engagement of build and wish)`. A wish
answered counts for more than likes.

### About the show

For reviewers only (trial 002, finding 11): written to `reviewers/about-show.json` and `.md`,
never to `digest.md`, the skeletons or the lane slices. Posts that name the show (`show.json` `phrases`: "the late cluster", "Larry Nx", ...), link it
(`linkPatterns`), or mention its account (`handles`, empty until the bot account exists),
plus replies under and quotes of those posts, and replies under those, all the way down. A story
whose lead or root is about the show, or half of whose posts are, is a story about the show;
other threads joined to it by quotes or links are still written as a skeleton, without the
show's posts. Each carries why it matched, a **possible
correction** flag (`safety.json` `showCorrectionPatterns`: "that's not what I said", "never
said that", "wasn't me", "misquoted", ... and no longer "actually" or "I didn't write", which
fired on praise), and **the lines it quotes** (`showQuotePattern`), so a viewer quoting
something the show put in a real person's mouth is listed for the writer to check. A post in this set that matches
`showOptOutPatterns` ("leave me out", "please don't", "remove me", "not ok with", "without my
consent", "opt out", ...) or a `consentTopics` term ("don't quote me") is an explicit ask to the
show, treated as a request to be left out: its author is excluded from everything else in the
digest, and the section lists them by handle and link only, for the reviewer to add to
`optout.json` (R11). The same words in an ordinary post, not about the show, are a general
remark: a repost note (see "Marks"), never an exclusion.

### New voices

Members the ledger says the show has never featured, with at least three posts in the window,
ranked by the sum of their three best post scores, out-of-bounds posts left out; the eight
strongest with their three best posts. This replaces the old "recurring guests" section: the
digest no longer promotes anyone the show has featured.

### Interview material

For the constructed interview: every answer is a real post, every question recreates what
that post was replying to. For each member, their window posts that reply to someone else's
post that asks something. A parent is a **question** if a question mark falls in its last
80 characters (trailing links and emoji set aside), or it opens with an interrogative word
(what, why, how, who, ... would, should, can, do, is, anyone) and is at most 140 characters;
a **prompt** if it is at most 140 characters and matches a configured pattern ("thoughts",
"name a", "favourite", "hot take", "concept:", "tell me", "what's your", ...). Both sides must
pass every consent and sensitivity rule (no flag, no redaction, nobody excluded), the answer
must be speakable (at most 280 characters, words to say) and the question at most 400.
Candidates need three good pairs; someone who appeared in the previous episode is never a
candidate, and people featured earlier come after people never featured. Each pair carries
both posts' exact text, author and address. Config: `show.json` `interview`.

### Top Chicken as a segment

The game account's posts are read back `historyDays` (42) before the window. From them, as
facts only: the window's standings (day, winner, likes, the winning post, its share of the
record, its rank among every result fetched), repeat winners and streaks, the record and
whether it moved, recent history (median, highest and lowest winning score, how many
different winners), participation each day (people who posted against those eligible, and how
the eligible pool moved), and the latest all-time leaderboard with each entry's distance from
the record. The game's posts name only the winner, so who came close on a day is not known,
and the digest says so. Every person named goes through the consent rules. A winning post
inside an out-of-bounds story carries that story's flag.

### Phrases and weeks

Each spiked phrase carries `first`, the earliest post in the window that used it. "X week"
declarations are listed separately: one to three words right before "week", none of them a
stopword or an ordinary week word ("this", "last", "long", "half", ...), kept when two or more
people used it or one person declared it ("it's X week", "X week rolls into ...").

## Consent and safety

Built into the code path, not left to the reader (`src/consent.js`):

- **Opt-out** (`config/optout.json`, handles or DIDs; prefer DIDs). An opted-out handle is
  never sent to the API as a seed or member; seeing the account anywhere teaches us its DID.
  Their posts are dropped. Someone else's post that quotes them keeps its own text and loses
  the quoted content (`quote.state: "removed"`). A reply to them keeps its own text and loses
  the pointer (`reply.hidden: true`); replies to the same hidden thread are still grouped,
  by a hash rather than the URI. Anything else that names them follows "Naming an excluded
  account" below. Their DID never reaches an output file.
- **`!no-unauthenticated`**: accounts carrying this self-label are treated exactly like
  opt-outs, even though the public AppView does return their posts (verified: 505 of the
  cached W46 responses contained such authors, with post text). The owner kept this stop
  when narrowing the rule on 27 November 2026, because the show's archive is open to
  logged-out viewers.
- **Requests to the show**: an explicit ask addressed to the show (bible R11) excludes its author
  exactly like the opt-out list; see "About the show".
- **Not an opt-out: bios and general remarks.** The owner's ruling of 27 November 2026 (bible R2,
  R11): "anything said in public is fair game unless they explicitly asked this account to not
  do that". A profile description that asks not to be quoted, screenshotted, reposted, clipped
  or used by bots or AI (`selfDeclaredOptOut.patterns`: "no QTs", "AI DNI", ...; said another
  way, `indirectPatterns`: posts meant to disappear, "ask before you screenshot"; or wording
  from `bioReview.patterns`) is a line addressed to everyone. It excludes nobody, redacts nobody
  else's post and leaves no story out: the account is marked `bioReview`, a note for the
  reviewer's repost test (R6), with the words in `private/` only (see "Bios"), counted in
  `stats.excluded.bioNoteAccounts`. A post saying the same is a repost note (see "Marks").
  These remarks are still read, because they are evidence for the repost test.
- **Naming an excluded account**: see below. Applies to every kind of exclusion above (the
  opt-out list, `!no-unauthenticated`, a request to the show).
- **Content labels**: posts labelled `porn`, `sexual`, `nudity`, `graphic-media`, `gore`,
  `nsfl` or `sexual-figurative` (post or account level, `blockedLabels`) are dropped, and so
  is quoted content carrying them.
- **Sensitivity flags (R10)**: `safety.json` `sensitivity.topics` holds a keyword and phrase
  list per out-of-bounds topic (health, grief and disaster, identity, partisan politics, jobs
  and money trouble, legal trouble and harassment, minors, people leaving, interpersonal
  conflict), matched as whole words against a post's text, alt text, link titles and quoted
  text. `combinations` catch what no single word gives away: a post that asks for or makes a
  pastiche, stereotype, caricature or accent **and** names a nation, region or people is
  `identity` (the trial missed a request for "a pastiche of clips celebrating the newfie
  lifestyle"); "Nick Land" and neoreaction terms are `partisan politics`. A match marks **the
  post** (`sensitive`), and the mark stays on that post: the rest of its story is usable (see
  "Marks"). A story carries a `sensitivity` hint when its lead or thread root matches, when at
  least `minShare` (20%) of its member posts match, or when `minPosts` (3) posts match one topic;
  the hint never takes the story's other posts with it. `digest.md` lists a marked post without
  quoting it, lists a story whose lead is marked by its mark, and keeps such stories out of "The
  week at a glance". Marked posts are left out of the guest sections, the voices and interview
  slices, and performable threads; marked builds are left out of Built this week, and marked
  phrases show no example. **This is a coarse hint.** It misses things and flags innocent
  posts ("toxic solar panels" did, before "toxic" was removed); the auditor still applies R10
  post by post.
- **Counts, not content**: `stats.excluded` in `digest.json` and appendix E in `digest.md`
  record how many accounts and posts were excluded and why, and nothing else.
- **Data minimisation**: see the post record above. Members are listed by DID, handle and
  display name only; follow relationships are used to compute membership and are not written.
- **Privacy of requests**: the default User-Agent is `weekly-digest-scraper/0.1`. No request
  carries the project's name, the show's name, a person's name or contact details. Config
  validation refuses a User-Agent naming the show.

### Bios

Trial 002, findings 9 and 36. Every profile description and set of labels the run reads is kept
in the run's private data, `private/profiles.json` (`late-cluster-private-profiles/1`: `{ counts,
accounts: [{ did, handle, displayName, member, description, labels, pinnedPost, bioReview }] }`,
for members and every author in the output, never for an excluded account). It is for the
auditor only: no description is copied into a file another role reads. The bio pass reads each
for what it says about quoting, screenshots, keeping posts or bots: said directly
(`selfDeclaredOptOut.patterns`, kind `direct`), another way (`indirectPatterns`, `indirect`), or
in wording worth a look (`bioReview.patterns`: temporary, delete, consent, permission, "no ...
screenshots", ..., `review`). None of it excludes the account (bible R11: a bio is addressed to
everyone, not to the show). A match marks the account `bioReview` in `authors` and on its
skeleton posts, a note for the reviewer's repost test (R6), with the kind and the phrase that
matched in `private/profiles.json` and `private/bio-review.md`; the auditor records the ones
that bear on the material as notes, with the exact words. Counts are in `stats.bios`
(`bioReview`, `bioReviewByKind`, `bioReviewMembers`). Before the ruling of 27 November 2026 the
direct and indirect kinds excluded the account: on the trial window, 59 and 2 accounts.

### Naming an excluded account

An excluded account (any of the four kinds above) appears in no form, so other people's posts
that name it are handled too (`src/consent.js`). The account is matched **by DID first, and by
every handle and display name the run has seen for that DID**, whenever it was excluded: a
handle change or a new display name does not let it back in.

What counts as naming it, in someone else's post:

- an @-mention (its facet), a link facet to its profile, posts or own domain, and a
  `bsky.app/profile/<its handle or DID>` URL in the text;
- its handle in plain text, with or without `@`, and its DID;
- its display name in plain text, by whole words (case-insensitive, decoration such as emoji
  trimmed). Display names are not unique and many are ordinary words, so a name is matched
  anywhere only if it is distinctive in this run: at least `minLooseNameChars` (5) letters or
  more than one word, and written by fewer than `commonNameAuthors` (3) people outside any
  conversation with the account. Otherwise (and for any name of `minNameChars`, 3, letters or
  more) it is matched only in a post *in conversation with* the account: one that replies to it
  (parent or root), quotes, mentions or links it, or sits in its thread. Single stopwords are
  never matched;
- a list post cut off inside its last entry ("8. someone — 12 likes\n9. a"): if what is left
  could be the start of an excluded account's handle or name, it is treated as theirs, because
  nobody can show it is not. (With a large exclusion list nearly every one-letter fragment
  matches.)

What happens:

- **A post mainly about the account is withheld whole**: written nowhere, counted in
  `stats.excluded.postsWithheldNamingExcluded` with the reason in `withheldBecause`. Mainly
  about it means any of: it replies to or quotes the account and names it (`conversation`);
  fewer than `minOwnWords` (4) words of its own remain once the reference is gone
  (`fewOwnWords`); it opens with the reference (`opensWithIt`); the reference is possessive,
  "X's post" (`possessive`); the sentence holding it matches `aboutPatterns` ("winner", "won",
  "congrats", "thanks", "made by", ..., `aboutIt`); or an image's alt text names it (`image`: a
  screenshot or quote card of the account's post cannot be redacted). A game result withheld
  this way is still reported by the game section as "not included", without its text.
- **Otherwise the reference is replaced** with `[opted-out]` (an @-mention keeps its `@`:
  `@[opted-out]`) and the post is marked `redacted` (above), so no role can quote or perform it
  as verbatim: performable threads and interview pairs skip it, and the gates refuse it. The
  same applies to link titles and feed or list card names; a link or card pointing at the
  account is dropped.
- **A quoted post that names the account** is removed from the quoting post (`quote.state:
  "removed"`, counted in `quotesStrippedNamingExcluded`): a quote is never shown with holes in it.
- **Reposts and likes**: the digest keeps no lists of who reposted or liked anything, only
  counts of members who reposted, from which excluded accounts are left out.
- **The final check**: before anything is written, every string in `digest.json` and
  `posts.jsonl` is searched for an excluded account's DID, handle or profile link (display
  names are not unique, so not here). A hit is redacted, its post marked, the count kept in
  `stats.excluded.outputScrubbed` and a warning added to `run.warnings`: a hit means a rule
  above missed something, and should be reported.

The counts by kind of reference are in `stats.excluded.references`. The tests in
`test/naming.test.js` cover each case with invented accounts.

All four outputs are written beside their final names and then renamed together, so a reader
of the folder sees the old files or the new ones, never a run half written. The response
cache keeps raw API responses, names included: it is the scraper's private input, never
an output.

## Politeness

`src/http.js`: at most `concurrency` (4) requests in flight, at least `minIntervalMs` (150)
between request starts, a hard `maxRequests` budget per run (900), retries on 429, 5xx and
network errors (up to 5, exponential from 1 s), honouring `retry-after` and
`ratelimit-reset`, and pausing early when `ratelimit-remaining` is nearly zero. Definite 4xx
answers are cached like successes so a re-run does not ask again. When the budget runs low
the baseline sample shrinks first; if it runs out, the run finishes with what it has and
lists what it skipped under `run.warnings`. An authenticated session would plug in as
`auth.headers()` on the client; nothing constructs one today.

## Config reference

`config/cluster.json`

| key | meaning |
|---|---|
| `seeds` | the bootstrap seeds, `[{ did, label, reason }]`; DIDs preferred, a reason required |
| `showAccount` | `{ did }` overrides the show account's DID (normally read from `show.config.json`) |
| `seedSelection` | `mode` (`show-follows`, `fixed`, `drift`), and for `drift` `count`, `maxTurnover`, `keepWithinTop` |
| `rosters` | `[{ id, account, label, follows, followers, maxPages, reason }]`: public rosters whose accounts get the `roster` signal |
| `references` | other published definitions (the checker's seeds and hubs), compared in the coverage report only |
| `ledger` | `{ dir }`, default `docs/ledger` |
| `coverage.thresholds` | the coverage report's worry thresholds |
| `lists` | `at://` list URIs whose members are `listed` |
| `starterPacks` | `at://` starter pack URIs; their lists are read |
| `feeds` | `[{ uri, maxPages }]` feed generators whose authors get `feedPosts` |
| `search` | `{ enabled, host, terms, maxPagesPerTerm }`: `searchPosts` within the window |
| `expansion.maxFollowPagesPerSeed` | pages of 100 follows read per seed |
| `expansion.seedThreadsPerSeed` | busiest seed posts per seed whose repliers count as interactions |
| `expansion.rules`, `ruleNames` | any-of rules, each `{ seedFollows?, interactions?, termPosts?, feedPosts?, listed?, roster? }`, and a plain name for each |
| `expansion.weights`, `expansion.caps` | the member ranking score |
| `expansion.maxMembers` | the cap |
| `collection.baselineWeeks` | weeks before the window used as the baseline |
| `collection.maxWindowPagesPerAuthor` | pages of 100 feed items per member for the window (25 covers the busiest seed, about 1,800 items a week) |
| `collection.maxBaselinePagesPerAuthor` | pages per member for the baseline sample |
| `collection.seekCursor` | start author feeds at the window's end (see API findings) |
| `collection.threadsToExpand`, `threadDepth`, `threadOutsiderMinLikes` | conversation expansion |

`config/scoring.json`: `engagementWeights`, `baselineMinPosts`, `postWeights`,
`storyWeights`, `nonMemberFactor`, `outsiderEngagementFactor`, `singletonFactor`,
`breakoutMinEngagement`, `maxPostsPerStory`, `grouping`, `phrases`, `blockedLabels`,
`genericDomains` (never grouped by domain, never "new"), `buildHosts` (links there count as
built; `*.` matches subdomains), `builtPatterns` (case-insensitive regexes), `digest` (how many
stories, posts per story and appendix rows to write).

Also in `scoring.json`: `builds` (`weights`, `max`) for Built this week, `wishPatterns` (what
makes a parent a wish), `reach.weights`, and `weekDeclarations` (`maxN`, `top`).

`config/client.json`: `host`, `userAgent`, `concurrency`, `minIntervalMs`, `maxRequests`,
`maxRetries`, `backoffBaseMs`, `timeoutMs`, `pruneCacheAfterRun`.

`config/lanes.json`: `made.patterns` and `limit`; `talk` (`minPosts`, `minMembers`, `limit`);
`games` (`patterns`, `limit`); `voices` (`maxFollowers`, `audienceWeight`, `minPosts`,
`postsEach`, `limit`); `interview` (`minPairs`, `limit`); `tagged` (`enabled`, `minOwnWords`,
`aboutShowPatterns`, `perTaggerCap`, `weight.floor`, `weight.repeatDecay`, `search` (`enabled`,
`host`, `queries`, `maxPages`), `maxThreads`, `threadDepth`, `limit`; see "The tagged lane");
`bots` (`accounts`, `bioPatterns`); `lineChars`. See "Skeletons and lanes".

`config/safety.json`: `smallAccountFollowers`, `selfDeclaredOptOut.patterns` and
`indirectPatterns` and `bioReview.patterns` (bio notes, never exclusions), `sensitivity.consentTopics` (repost notes; an ask in a post about the show),
`showOptOutPatterns.patterns`, `showCorrectionPatterns`, `sensitivity` (`minShare`,
`minPosts`, `topics`, `combinations`), `showQuotePattern`, `excludedMentions` (`minOwnWords`,
`minNameChars`, `minLooseNameChars`, `commonNameAuthors`, `aboutPatterns`; see "Naming an
excluded account"). Patterns are case-insensitive JavaScript regexes; sensitivity terms get
word boundaries added. Every pattern is compiled when the config loads, so a bad one fails
fast.

`config/show.json`: `handles` (the show's accounts, DIDs preferred), `phrases`, `linkPatterns`,
`newVoices` (`count`, `postsEach`, `minPosts`), `interview` (`candidates`, `pairsEach`,
`minPairs`, `maxChars`, `maxQuestionChars`, `questionTailChars`, `promptMaxChars`,
`promptPatterns`), `performableThreads` (`count`, `prefetch`, `minPosts`, `maxPosts`,
`minSpeakers`, `minMemberSpeakers`, `minTurns`, `maxChars`, `requireRootInWindow`,
`avoidPatterns`).

`config/games.json`: `games`, each `{ id, name, account (DID preferred), label, about,
writerNote, resultPattern, fieldPatterns, personFields, numberFields, winningPost, maxPages,
historyDays, leaderboard: { headerPattern, entryPattern } }`.

`config/optout.json`: `accounts`, handles or DIDs (prefer DIDs: handles change).

## Public API findings (unauthenticated, November 2026)

Works on `https://public.api.bsky.app/xrpc/`:

- `app.bsky.actor.getProfile`, `getProfiles` (25 per call).
- `app.bsky.feed.getAuthorFeed` with `filter=posts_with_replies`; items carry hydrated
  `reply.root` / `reply.parent` post views and `reason` for reposts. **The cursor is an ISO
  timestamp and accepts any timestamp**, so `cursor=<window end>` seeks straight to the
  window instead of paging down from today. Undocumented; `seekCursor: false` turns it off.
- `app.bsky.graph.getFollows`, `getFollowers`, `getLists`, `getList`,
  `getActorStarterPacks`, `getStarterPack`, `getSuggestedFollowsByActor`.
- `app.bsky.feed.getPostThread`, `getPosts`, `getQuotes`, `getLikes`, `getRepostedBy`,
  `getActorFeeds`, `getFeed`, `getFeedGenerator`.
- `app.bsky.unspecced.getPopularFeedGenerators?query=` (found a community "SimCluster"
  feed, now in config), `app.bsky.unspecced.getTrendingTopics`,
  `app.bsky.graph.searchStarterPacks` (no results for "simcluster").
- Responses carry `cache-control: public, max-age=30` from a CDN and no `ratelimit-*`
  headers on success; none of ~550 requests per run was rate limited.

Does not work:

- `app.bsky.feed.searchPosts` on `public.api.bsky.app` answers **403** (an HTML page from the
  CDN). The same call on `https://api.bsky.app` works unauthenticated, including
  `since`/`until`. The refusal on the public host is deliberate, so search is **off by
  default**; `search.host` points at `api.bsky.app` for an owner who decides to turn it on. The
tagged lane's own search (`lanes.json` `tagged.search`, on by the owner's ruling that tagging the
show's account guides where it looks) asks only for mentions of the show, with the `mentions`
parameter; `mentions:` in `q` answers 400.
  The `from:` operator answers 400.
- `app.bsky.actor.searchActors` returns an empty list unauthenticated on both hosts.
- `app.bsky.feed.getActorLikes` answers 400 for other people's likes.
- Seeds publish no lists and only small or unrelated feeds; no curated simcluster list was found.

## Limits and next steps

- The baseline is a sample: 3 pages per member (about 300 items), so for the most prolific
  accounts it covers days, not weeks. Pages already in the cache are free, so only new members
  cost requests on a re-run. Phrase rates are per post to compensate, and
  `posts.jsonl` from earlier weeks is used when present. Running weekly makes this better on
  its own.
- Engagement counts are as of the scrape, not the end of the week.
- A story can be a broad AI-discourse thread that many members joined rather than a
  cluster bit. Breadth is weighted highest on purpose; the writers decide.
- Headlines are the lead post's first line. A video- or image-only lead has a weak headline;
  the alt text and links follow underneath.
- Phrase detection is lexical: "banh mi" and "bahn mi" are two phrases.
- Membership depends on the seeds' follows; an account the seeds do not follow needs several
  interactions to count. Adding seeds or a curated list is the lever.
- An account removed by its profile after selection is not replaced from below the cap.
- Sensitivity and opt-out detection are keyword lists, in English. See their caveats above.
- The cap is the binding limit once the show's account follows a dozen or more people: on
  the trial window 913 accounts qualified and the cap, then 120, cut 793. The coverage report gives
  the cost of raising it (about 3.7 author-feed requests per member with a cold cache).
- The digest's `sections.interview` still ranks by how many good pairs a member has, which
  favours prolific posters in arguments; the interview lane slice ranks by having made something
  and been asked about it instead. A video posted inside an argument still counts as made.
- "Who came close" on a Top Chicken day is not knowable: the game's posts name only the
  winner. The all-time leaderboard is the only list of near-winners.
- The checker's comparison counts only whether the accounts it names are members; scoring our
  members by its method would need every member's follows (several hundred requests) and is
  not done.
- Performable threads are strict: a single reply that is only a mention ("@someone") rejects
  the whole thread, which cost W46 the golem-grocer thread.
- A build whose wish was posted before the window is found only if the wish was fetched
  (a member's baseline, or thread context).
- Skeletons hold what the digest holds: a post the scrape never fetched (an outsider's reply
  outside the expanded threads, a member who left the cluster since) is in no skeleton.
- The media command fetches a video's thumbnail only, not frames.
- Next: an authenticated mode behind `SCRAPER_BSKY_SESSION` (search on the main host,
  bigger pages), opt-out requests read from the show's account (see the bot), and a
  `sources.json` writer so an episode can record which story ids it used.
