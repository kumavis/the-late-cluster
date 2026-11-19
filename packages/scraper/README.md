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
npm run scrape                          # the most recent complete ISO week (UTC)
npm run scrape -- --week 2026-W46       # a given ISO week, Monday 00:00 to Monday 00:00 UTC
npm run scrape -- --days 7              # a rolling 7-day window ending now
npm run scrape -- --since 2026-11-13    # from 00:00 UTC on a date, to now
npm run scrape -- --since 2026-11-13T18:00Z --until 2026-11-16T12:00Z
npm run scrape -- --out /tmp/digest     # somewhere other than data/weeks/<week>/
npm run scrape -- --max-requests 300    # a tighter request budget for this run
npm run scrape -- --no-cache            # ignore the response cache
npm run scrape -- --prune-cache         # delete the week's response cache after a successful run
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
| `digest.json` | `format: late-cluster-digest/1`: window, run metadata, stats, overview, `sections` (`games`, `built`, `aboutShow`, `guests`, `performableThreads`), ranked `stories`, `appendices`, `members`, `authors` |
| `digest.md` | the same for a writer with ten minutes, in this order: the week at a glance; **Community games**; **Built this week**; **About the show**; **Recurring guests this week**; **Threads you could perform**; the top 15 stories with their best posts quoted and linked (out-of-bounds stories as marked headlines only); then appendices (A most active accounts, B links that circulated, C phrases that spiked, D "X week" declarations, E how it was made) |
| `.cache/http/` | raw API responses keyed by URL; see "The response cache" |

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
`title`), `imageAlts`, `hasImages`, `hasVideo`, `embedded` (a feed or list card), `tags`,
`labels`, `sources` (how we found it: `author`, `context`, `thread`, `quoted`, `search`,
`feed`), `member`, `memberReposts` where members reposted it, `authorFollowers` and
`smallAccount` (under `safety.smallAccountFollowers`, 300), `guest` for a recurring guest, and
`sensitive` (the out-of-bounds topics it matched). Story posts also carry `inReplyTo` (the
parent: handle, text, URL) and `quoted`. No avatars, images, video, profile descriptions, or
follower lists; follower *counts* only.

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
  "outOfBounds": null,             // or { "topics": ["health"], "counts": { "health": 3 } }
  "context": [],                   // the thread root, when it predates the window
  "posts": [ /* post records plus metrics: engagement, baseline, lift, score; and quoted */ ]
}
```

## Who is "the cluster"

Nobody keeps a list and membership is meant to be fuzzy, so membership is computed every
run from configured seeds, then capped. `src/cluster.js` is the rule, `src/collect.js` the
fetching.

1. **Seeds** (`cluster.json` `seeds`) are always members, unless opted out.
2. **Signals** are gathered for every account near the seeds:
   - `seedFollows`: how many seeds follow it (`app.bsky.graph.getFollows`, up to
     `maxFollowPagesPerSeed` pages each).
   - `interactions`: in the seeds' own feeds over the window and baseline weeks, each time a
     seed replied to it, joined its thread, quoted it, reposted it or mentioned it; plus each
     reply it made under a seed's busiest posts of the week (`getPostThread`).
   - `termPosts`: window posts matching a configured search term. **Search is off by
     default** (see "Search" below), so this signal is zero unless the owner turns it on.
   - `feedPosts`: posts in a configured community feed generator.
   - `listed`: on a configured list or starter pack.
3. **Rules** (`expansion.rules`): an account is a member if it satisfies any one rule; all
   conditions in a rule must hold. The shipped rules are, in order: followed by 2 seeds and
   at least 1 interaction; followed by 3 seeds; followed by 1 seed and 3 interactions;
   6 interactions; listed; 1 term post and followed by 1 seed; 2 term posts; 2 feed posts and
   followed by 1 seed.
4. **Cap** (`maxMembers`): members are ranked by
   `3·seedFollows + 1·min(interactions, 12) + 2·min(termPosts, 3) + 1·min(feedPosts, 3) + 10·listed`,
   ties broken by DID, and cut to the cap. Seeds are never cut.

Then each member's posts, replies and reposts in the window are fetched, a sample of the
baseline weeks after that, and the busiest conversations (`threadsToExpand`) are expanded
with `getPostThread` to pick up replies by members and outsider replies with at least
`threadOutsiderMinLikes` likes. Posts by outsiders that members replied to, quoted or
reposted are kept as context and marked `member: false`.

Before any member's posts are fetched, their profiles are read (`getProfiles`, 25 per
request): a description that opts out removes them there, so their feed is never requested.
After collection, the profiles of everyone who can appear in the output (authors since the
baseline start, and accounts they mention) are read the same way, for follower counts and
profile opt-outs.

On 2026-W46, with search off, this produced 120 members from 1,602 candidates (189
qualified; the cap cut 69). With search on it was the same 120 accounts: the 7 extra
accounts that qualified only through search ranked below the cap. Raising `maxMembers`
costs roughly 4 requests per extra member.

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

## What the writers get (design bible)

`docs/bible/README.md` ("What the bible assumes the digest provides") lists what the writer
needs. Where each item is:

| bible asks for | where |
|---|---|
| per post: URI, URL, verbatim text, handle, display name, date, counts, reply/quote of what, alt text, links | every post record; story posts add `inReplyTo` and `quoted` |
| per author: follower count, recurring guest | `authors`, `members`, and `authorFollowers` / `smallAccount` / `guest` on posts; `digest.md` writes "(**small account**, 43 followers)" next to every name |
| thread context for anything quotable | `inReplyTo` on story posts; the thread root as `context`; stories list the strongest replies |
| opt-outs applied, plus bios and posts asking not to be quoted, and posts to the show's account | see "Consent and safety"; requests to the show are listed in About the show |
| sensitivity flags | `outOfBounds` on stories, builds and phrases; `sensitive` on posts |
| things built this week | `sections.built`, "Built this week" |
| recurring phrases, "X week" declarations, first posts of anything that spread | `appendices.phrases` (with `first`), `appendices.weeks` |
| reactions to the show | `sections.aboutShow`, "About the show" |
| recurring guests' own posts | `sections.guests`, "Recurring guests this week" |
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
follows only its maintainer. 89 of this package's 120 W46 members are in it, and 772 roster
accounts are not members. It is **not** used to define the cluster; see the trade-offs in the
scraper's second-pass report.

### Threads you could perform

Candidate threads for performing word for word, chosen deterministically: rooted in the
window, `minPosts`-`maxPosts` posts (4-24), at least `minSpeakers` (3) speakers of whom
`minMemberSpeakers` (3) are members, at least `minTurns` (4) replies to someone else, every
post under `maxChars` (280) characters with words to say (not only a link or a mention), no
sensitivity flags, no hostile wording (`avoidPatterns`), no text changed by mention
redaction, no quote of an excluded post, and every post reachable from the root (nothing
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
own earlier posts in the same thread do not count). A link counts when it is on a member's
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

Posts that name the show (`show.json` `phrases`: "the late cluster", "Larry Nx", ...), link it
(`linkPatterns`), or mention its account (`handles`, empty until the bot account exists),
plus replies under and quotes of those posts. Each carries why it matched and a **possible
correction** flag (`safety.json` `showCorrectionPatterns`). A post in this set that matches
`showOptOutPatterns` ("leave me out", "please don't", "remove me", "not ok with", "without my
consent", "opt out", ...) is treated as a request to be left out: its author is excluded from
everything else in the digest, and the section lists them by handle and link only, for the
reviewer to add to `optout.json` (R11). Ordinary posts saying "don't quote me" are not
treated this way; it is too common an idiom outside the show.

### Recurring guests

For each account in `show.json` `guests` (default: the four seeds), the strongest
`postsPerGuest` posts of the week by post score, leaving out posts flagged out of bounds,
with follower count, alt text, links, quoted post and parent. A guest who did not make the
cluster still has their week fetched. A guest excluded by the consent rules is counted, not
named.

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
  by a hash rather than the URI. @-mentions of them in other people's text become
  `@[opted-out]`, and links to their profile are dropped. Their DID never reaches an output
  file.
- **`!no-unauthenticated`**: accounts carrying this self-label are treated exactly like
  opt-outs, even though the public AppView does return their posts (verified: 505 of the
  cached W46 responses contained such authors, with post text).
- **Self-declared opt-outs**: an account whose profile description asks not to be quoted,
  screenshotted, reposted, clipped or unrolled, or used by bots or AI (`safety.json`
  `selfDeclaredOptOut.patterns`: "no QTs", "do not screenshot", "No AI", "AI DNI", "do not
  consent", any "DNI", ...), is treated exactly like the opt-out list. The patterns err towards
  excluding: "Minors DNI" or "No AI" in an artist's bio also excludes the account. Members
  are checked before their posts are fetched; every other author and mentioned account is
  checked before the digest is written. The description itself is read and discarded, never
  stored. On W46: 47 accounts, 78 posts; none of them was a member.
- **Requests to the show**: see "About the show".
- **Content labels**: posts labelled `porn`, `sexual`, `nudity`, `graphic-media`, `gore`,
  `nsfl` or `sexual-figurative` (post or account level, `blockedLabels`) are dropped, and so
  is quoted content carrying them.
- **Sensitivity flags (R10)**: `safety.json` `sensitivity.topics` holds a keyword and phrase
  list per out-of-bounds topic (health, grief and disaster, identity, partisan politics, jobs
  and money trouble, legal trouble and harassment, minors, people leaving, interpersonal
  conflict), matched as whole words against a post's text, alt text, link titles and quoted
  text. A story is flagged when its lead or thread root matches, when at least `minShare`
  (20%) of its member posts match, or when `minPosts` (3) posts match one topic. Flagged
  stories are kept and ranked, so the writer knows the week's big story was one the show
  leaves alone, but `digest.md` shows them as **OUT OF BOUNDS (topic)** headlines with no
  quoted posts, and never in "The week at a glance". Flagged posts are left out of the guest
  sections, flagged builds out of Built this week, and flagged phrases show no example. **This
  is a coarse hint.** It misses things and flags innocent posts ("toxic solar panels" did,
  before "toxic" was removed); the writer and the reviewer still apply R10 themselves.
- **Counts, not content**: `stats.excluded` in `digest.json` and appendix E in `digest.md`
  record how many accounts and posts were excluded and why, and nothing else.
- **Data minimisation**: see the post record above. Members are listed by DID, handle and
  display name only; follow relationships are used to compute membership and are not written.
- **Privacy of requests**: the default User-Agent is `weekly-digest-scraper/0.1`. No request
  carries the project's name, the show's name, a person's name or contact details. Config
  validation refuses a User-Agent naming the show.

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
| `seeds` | handles or DIDs that define the cluster |
| `lists` | `at://` list URIs whose members are `listed` |
| `starterPacks` | `at://` starter pack URIs; their lists are read |
| `feeds` | `[{ uri, maxPages }]` feed generators whose authors get `feedPosts` |
| `search` | `{ enabled, host, terms, maxPagesPerTerm }`: `searchPosts` within the window |
| `expansion.maxFollowPagesPerSeed` | pages of 100 follows read per seed |
| `expansion.seedThreadsPerSeed` | busiest seed posts per seed whose repliers count as interactions |
| `expansion.rules` | any-of rules, each `{ seedFollows?, interactions?, termPosts?, feedPosts?, listed? }` |
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

Also in `scoring.json`: `builds` (`weights`, `max`) for Built this week, and
`weekDeclarations` (`maxN`, `top`).

`config/client.json`: `host`, `userAgent`, `concurrency`, `minIntervalMs`, `maxRequests`,
`maxRetries`, `backoffBaseMs`, `timeoutMs`, `pruneCacheAfterRun`.

`config/safety.json`: `smallAccountFollowers`, `selfDeclaredOptOut.patterns`,
`showOptOutPatterns.patterns`, `showCorrectionPatterns`, `sensitivity` (`minShare`,
`minPosts`, `topics`). Patterns are case-insensitive JavaScript regexes; sensitivity terms get
word boundaries added. Every pattern is compiled when the config loads, so a bad one fails
fast.

`config/show.json`: `handles` (the show's accounts), `phrases`, `linkPatterns`, `guests`,
`postsPerGuest`, `performableThreads` (`count`, `prefetch`, `minPosts`, `maxPosts`,
`minSpeakers`, `minMemberSpeakers`, `minTurns`, `maxChars`, `requireRootInWindow`,
`avoidPatterns`).

`config/games.json`: `games`, each `{ id, name, account, about, writerNote, resultPattern,
fieldPatterns, personFields, numberFields, winningPost, maxPages }`.

`config/optout.json`: `accounts`.

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
  default**; `search.host` points at `api.bsky.app` for an owner who decides to turn it on.
  The `from:` operator answers 400.
- `app.bsky.actor.searchActors` returns an empty list unauthenticated on both hosts.
- `app.bsky.feed.getActorLikes` answers 400 for other people's likes.
- Seeds publish no lists and only small or unrelated feeds; no curated simcluster list was found.

## Limits and next steps

- The baseline is a sample: 3 pages per member (about 300 items), so for the most prolific
  accounts it covers days, not weeks. Phrase rates are per post to compensate, and
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
- Performable threads are strict: a single reply that is only a mention ("@someone") rejects
  the whole thread, which cost W46 the golem-grocer thread.
- A build whose wish was posted before the window is found only if the wish was fetched
  (a member's baseline, or thread context).
- Next: an authenticated mode behind `SCRAPER_BSKY_SESSION` (search on the main host,
  bigger pages), opt-out requests read from the show's account (see the bot), and a
  `sources.json` writer so an episode can record which story ids it used.
