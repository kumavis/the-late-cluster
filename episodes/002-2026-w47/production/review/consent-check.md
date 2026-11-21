# Consent check: 002-2026-w47

A reviewer's check of every real account in the nine drafts against R11 (opt-outs), R13 (bots)
and R14 (a bad week), with R7 where an account is small. Made 2026-11-19, about 23:00 UTC.

## What this is, and what it is not

**No live request was made.** A reviewer does not use the network, so this check was made from
what the scraper itself fetched for this window and still holds on disk: each account's profile
(bio, display name, labels, handle), its posts up to the window's end, the digest's flags, and the
digest's list of posts about the show. That is the state at **2026-11-19 09:55 UTC**. Nothing
after that moment has been looked at. Until the live pass under "Not checked" is done, read every
"clear" below as "clear at the scrape".

For all eighteen accounts, at the scrape:

- none is on the opt-out list, and none carries `!no-unauthenticated`;
- no bio asks not to be quoted, screenshotted, reposted, or used by bots or AI;
- every handle and display name is the one the drafts use (101 records compared, no difference);
- none has asked the show for anything. Of the fourteen accounts that appear, only samantha.wiki
  has posted about the show: three warm posts on 13 Nov.

## Accounts that appear

| account | how it is used | verdict | evidence |
|---|---|---|---|
| yonderdavid.bsky.social | puppet speaks (interview-yonderdavid, made-polyhedra-instruments-sakura); cards (made-cat-voice-quartet, music) | clear | Bio and labels clear. Newest posts are all about the work. Pinned post not read. |
| cee.wtf | puppet speaks (interview); named and read aloud (top-chicken) | clear | Bio, labels and pinned post clear. Newest posts are about a video game. The flagged posts in its window are in no draft. |
| shimmermathlabs.com | puppet speaks (made-polyhedral-coffee-simulator); read aloud (interview) | clear | Bio and labels clear. The bio and the pinned post hold personal details; none is in a draft, and none goes in. |
| dave.9000ish.uk | puppet speaks (made-polyhedral-coffee-simulator) | clear with a note | Bio and labels clear. In the window this account commented, as a bystander, on an argument the digest marks out of bounds. Use the simulator post and nothing else of its week. It also runs the Top Chicken bot (below). Pinned post not read. |
| oszillate.bsky.social | puppet speaks (made-polyhedral-coffee-simulator) | clear with a note | 75 followers, and the bio calls it a backup account. Allowed only as the hero of this one reply (R7), which it is: the reply is right, and the account it corrected answered in kind. A speaking puppet with a chyron and a credit is the most exposure a draft gives anyone, on the smallest account here: selection should weigh that. Its other posts are personal or out of bounds; none is for the show. No pinned post. |
| mokkenstorm.dev | puppet speaks (made-mobius-chess-ringmate); card read aloud (made-polyhedral-coffee-simulator) | clear with a note | Bio and labels clear. Twice in the window, in the chess thread itself, this account told a bot that turned up uninvited that it was rude. Both were advertising bots; it is not an objection to being quoted. The show's own account must never reply to, tag or mention this account. The display name reads as provisional: take it from the profile at build. No pinned post. |
| minormobius.bsky.social | puppet speaks (made-mobius-chess-ringmate) | clear | Bio, labels and pinned post clear. Newest posts are cheerful and about its own projects. |
| ver.ooo | puppet speaks (made-pen-plotter-replies) | clear | Bio, labels and pinned post clear. Nothing in the newest posts against being quoted, and no sign of a hard week. |
| samantha.wiki | shown, named and read aloud (made-pen-plotter-replies) | clear | Bio and labels clear. Posted warmly about the show on 13 Nov, and says more plotter projects are coming. Pinned post not read. |
| sophie.engineering | shown and read aloud (made-pen-plotter-replies) | clear with a note | 282 followers, not a cluster member. Bio and labels clear. The reply answered an open invitation to be written out in public, and the maker welcomed it: a hero moment (R7). Only this one post is held, so the account's other posts have not been read at all. It needs the live pass before air. No pinned post. |
| aparker.io | shown, named and read aloud (made-pen-plotter-replies) | clear with a note | Bio and labels clear. One post in the window is on an out-of-bounds subject (R10). Keep the house lines around this card to the reply itself, as the draft does now. Pinned post not read. |
| topchicken.bsky.social | shown and read aloud (top-chicken) | clear with a note | A bot: it labels itself one, and its bio names its manager, dave.9000ish.uk, who is checked above (R13). The draft's sources say the operator is not stated; the bio states it. The bio calls its rankings unofficial: do not present it as the game's official account. The line read aloud names cee.wtf, checked above. Its pinned post, which explains the game, was not read. |
| catblanketflower.yuwakisa.com | shown and read aloud (top-chicken) | clear | Bio and labels clear. Newest posts easy-going. The bot in the story is a separate account that labels itself a bot and names this account as its operator (R13: the operator is the one checked here); the draft neither names nor shows it. The exchange with 7778777.online is friendly on both sides. Pinned post not read. |
| 7778777.online | shown and read aloud (top-chicken) | clear with a note | Bio, labels and pinned post clear. The health-flagged post is one line of dark humour in reply to someone else, put generally and not about the author; nothing else in the window points to a hard week. The market post is unaffected and can be shown. Show that post only: the rest of this account's week is not the show's material. |

## Accounts that never appear (their post is the occasion of someone else's line)

Identified by their place in the drafts, since none of them is shown or named.

| account | verdict | evidence |
|---|---|---|
| the asker of exchange 1 in `interview` (also the occasion of lines in interview-yonderdavid, made-cat-voice-quartet, made-mobius-chess-ringmate, made-polyhedral-coffee-simulator and music) | clear | Bio and labels clear. One post in its window has an aside asking that a word in it not be quoted; that post is in no draft. |
| the asker of exchange 3 in `interview` | **do not use** | The bio says this account's posts are meant to disappear. The show would become the lasting copy of one: staging the exchange keeps the post's text and address in `sources.json` (R3 requires it) and has a house character ask it again on air for good. Treated as an opt-out (R11); when unclear, leave it out. |
| the asker of exchange 4 in `interview` | clear | A small account that is never shown. Bio and labels clear. |
| the account whose tag is the occasion of line `awesome` in `made-mobius-chess-ringmate` (missing from the list this check was given) | clear | Bio and labels clear. |

## What blocks a draft

- **`interview`, exchange 3.** The question that is the occasion of the line `gaming` comes from the
  account marked "do not use". Without it the line has no occasion (R4), so the exchange cannot run
  as drafted: the setup `ask-playing`, the line `gaming` and the cue `card-gaming`. The draft's own
  records of that post (its entry in `sources.json` and the address in the `script.js` comment) go
  too. The other three exchanges are untouched.

Nothing else is blocked.

## Posts gone or changed

None found at the scrape. All 71 posts the drafts cite (40 performed, read aloud or shown; 31 kept
only as the occasion or a reference) were present, and every one matches the drafts word for word,
cuts included, with the like counts the drafts give.

This is **not** the live check. Whether each post still exists now, unchanged, is not known.

## Not checked: needs a live pass before selection is final

By someone whose role allows the network, with a generic client name:

1. That each of the 40 performed, read or shown posts still exists and is unchanged now, and the
   like counts at build. A deleted or edited post cannot be used.
2. Every account's posts since 2026-11-19 09:54 UTC, and any new post about the show.
3. Any handle, display name, bio or label changed since the scrape.
4. The pinned posts of yonderdavid.bsky.social, dave.9000ish.uk, samantha.wiki, aparker.io,
   topchicken.bsky.social and catblanketflower.yuwakisa.com: they are older than anything held.
5. sophie.engineering's recent posts: none are held.
6. That the manager named in the Top Chicken bot's bio says so from their own account. The bio is
   the only source.

## Addendum, 21 November 2026

An auditor's ruling on one post, made from the saved digest (`npm run lookup -- --dir
data/weeks/2026-W47`, the post, its thread and its story). No network was used.

**The term widened.** The term for `dave.9000ish.uk` ("Use the simulator post and nothing else of
its week") now also covers one more post, and only that one:
`at://did:plc:hovt6k22s64dq63jjmoyibk3/app.bsky.feed.post/3n2lmuj26k22w`. It reads
"polycoffee.9000ish.uk?mug=wolfram / let's blur the lines between reality and simulation even
further". It may be used in the same way and on the same conditions as the simulator post. The
card's term still holds: do not say what the mug shows. Nothing else from this account's week is
cleared.

**Why.**

- **It belongs to the simulator's own story.** It is in the same story as the simulator post
  (`s-a75298af13`, the polyhedra video's thread). It replies directly to samantha.wiki's mug post
  (`…/3n2lmdzdw6s2n`), and that post quotes the simulator post itself. The thread is rooted at the
  mug post. In it, this post's only two replies are both held in the digest: two light posts by
  norvid-studies.bsky.social ("DON'T TALK TO ME UNTIL I'VE HAD MY RULIADS" and "looking forward to
  this gradually growing…").
- **Nothing in it is out of bounds.** Neither the post nor its parent, nor anything they answer,
  touches the argument this term was written for, or any R10 subject. That argument sits in other
  stories of this account's week.
- **It carries no mark.** The post has no marks, no labels and no redaction, and its parent has
  none either. The story's four consent marks ("replies to an excluded account") fall on other
  branches of the video's thread, not on this one. Its counts at the scrape were 7 likes, 1 repost
  and 2 replies.
- **The same live pass is owed.** "Clear at the scrape" applies to it as to everything above:
  item 1 of the live pass now includes this post.

## Addendum, 22 November 2026: the aired cut

An auditor's addendum, written after air. The episode was posted on 21 November 2026 at 22:55
UTC. Nothing above this heading has been changed. Where something above no longer holds, it is
annotated here.

### Needs the owner

Nothing. None of the four accounts checked below has an opt-out, a request not to be quoted, or a
post showing distress about being quoted or about the show.

### What this check covered, and what it did not

- **The original check (above) shows the state at 2026-11-19 09:55 UTC.** Nothing after that
  moment went into it.
- **`riemann-breaking-news` was outside it.** The segment was made on 21 November 2026 in
  `episodes/002-commissions-w47/`, from posts of Friday 20 November. Its four accounts
  (davidcrespo.bsky.social, moultano.bsky.social, zetaof1.bsky.social, and the account that asked
  the question behind Amber's call) were not checked here before air.
- **What the commission's audit covered** (`episodes/002-commissions-w47/production/review/audit-riemann-breaking-news.md`).
  It checked a draft of the segment against its terms of use
  (`episodes/002-commissions-w47/production/research/terms-riemann.md`):
  - every voiced or read text against its post, by address, and found every one exact;
  - every account and post against the terms' table;
  - like counts against the cards;
  - occasions;
  - the news frame and the market rules;
  - pronouns;
  - the opt-out list (`packages/scraper/config/optout.json`, empty).

  Its verdict was "change": two musts, a house line (`larry-banner`) and a third card
  (norvid's). Neither is in the aired script.
- **What the commission's audit did not cover.** It read no bio, label or pinned post. It did not
  read any account's other posts for a request not to be quoted or for a hard week (R11, R14). It
  is an audit of use and exactness, not a consent check.
- **What the live source checks covered.** They read, over the network, every account in
  `episodes/002-2026-w47/production/sources.json` as it then was: handle, display name, labels, the
  bio for opt-out wording, the pinned post, and the posts since the scrape's window ended. They
  read those for requests not to be quoted and for posts about the show.
  - Only the 22:48 UTC report of 21 November 2026 is kept on disk
    (`production/review/sources-live-check.md`). It read 17 accounts and 43 posts, including
    davidcrespo.bsky.social, moultano.bsky.social, zetaof1.bsky.social, the asker's account and
    the asker's post (as `lines[12].context`).
  - It came back clean except for one thing: @mokkenstorm.dev's display name had changed.
  - The 08:13 and 08:41 UTC checks of the same day are not kept on disk, so I cannot confirm
    from a file what they read.
  - None of these checks judges a hard week. They match wording only.

### How the four accounts were checked now

On 21 November 2026 at 23:25 UTC, after air, I re-ran the live check on the four accounts and
their four posts (`npm run sources -- check`, reading only). It looks at posts since 2026-11-21
00:24 UTC, the end of the saved digest's window. I also read, from the saved digest
(`data/weeks/2026-W47`, window 13 November 00:00 to 21 November 00:24 UTC), each account's stored
profile and every post of its window. These rows were written after air.

### Accounts that appear (riemann-breaking-news)

| account | how it is used | verdict | evidence |
|---|---|---|---|
| davidcrespo.bsky.social | puppet speaks (riemann-breaking-news): the chart post, his own image inside his card | clear | **Written after air.** Bio and labels clear, with no opt-out wording; pronouns he/him. The pinned post exists and the live check found no request in it; I did not read it. The used post is live and unchanged. 201 posts in the window and 58 since. He spent the week arguing about AI and the market, at length, in good spirits: he wrote "I am responding to every bearish QT with the revenue chart. sorry!" No request not to be quoted. No sign of a hard week. One post of 16 November ("to the guy who blocked me: yeah very unfair to represent AI skeptics by quoting them") is sarcasm about an argument he was in, not a request about his own posts. |
| moultano.bsky.social | puppet speaks (riemann-breaking-news): his quote of the chart post, with the chart card inside it | clear | **Written after air.** Bio and labels clear; no pronouns stated. The pinned post exists and the live check found no request in it; I did not read it. The used post is live and unchanged. 110 posts in the window and 7 since. On 18–19 November his street flooded in a storm, and by his own posts the next day "it turned out fine". It was over before the post the show used. Nothing else points to a hard week. No request not to be quoted. |
| zetaof1.bsky.social | card read aloud by Sibyl, named in Amber's line and shown on an account plate (riemann-breaking-news); no puppet | clear with a note | **Written after air.** Not a cluster member; 1,442 followers. Bio and labels clear, with no opt-out wording; no pronouns stated. The bio holds a personal detail; none of it is in the episode, and none goes in. The pinned post exists and the live check found no request in it; I did not read it. The used post is live and unchanged. Five posts in the window, all light, and 13 since. No request not to be quoted, and no sign of a hard week. |

### Accounts that never appear

| account | verdict | evidence |
|---|---|---|
| `did:plc:f6n22z62adionrvb5s6n6vfk`: the asker of "ok I'll bite, what's a zeta function" (`…/3n2qz6ywwrc2b`, a top-level post of 20 November and the root of the zeta thread), the occasion of Amber's `amber-call`. Larry asks the question in his own words. The account is not named, shown or credited. | clear | **Written after air.** By the terms (`terms-riemann.md`), this account is "not in this segment": its handle appears nowhere, including `sources.json` "accounts", and its post is recorded only as the context of the call. So it had no row in any consent record before air. Before air it was read only by the 22:48 UTC live source check (account and post, clean), which matches wording only. Checked now: bio and labels clear, with no opt-out wording; no pinned post. The post is live and unchanged. 104 posts in the window and 26 since. In the window it posted warmly about the show several times, and suggested the show have a bot that people tag. No request not to be quoted, and no sign of a hard week. |

### The aired uses, where the column above describes an earlier draft

The rows above are unchanged. Their verdicts stand. These are the uses that aired:

- **yonderdavid.bsky.social:** the puppet speaks three posts in `interview-yonderdavid`, and Larry
  reads one more from its card there. The quartet video is credited on a tile in `music-alt`.
  Nothing aired from made-polyhedra-instruments-sakura, made-cat-voice-quartet or `music`.
- **cee.wtf:** named and read aloud in `top-chicken`, and credited on a tile in `music-alt`
  (WHEELIE GAME · cee · yard-shift.cee.wtf). The `interview` puppet did not air.
- **shimmermathlabs.com:** the puppet speaks in `made-polyhedral-coffee-simulator` and in
  `riemann-breaking-news`. Nothing of hers was read in an interview.
- **dave.9000ish.uk:** the puppet speaks in `made-polyhedral-coffee-simulator`. In `music-alt`,
  Larry reads the simulator post's first line from its card, a tile credits the simulator, and a
  tag reads "+ MUG · ADDED BY DAVE". That tag draws on `…/3n2lmuj26k22w`, cleared in the addendum
  of 21 November. Both uses are inside this account's terms.
- **samantha.wiki:** shown, named and read aloud in `made-pen-plotter-replies`. In `music-alt` she
  is named in the sung lyric ("Samantha showed a morning mug") and credited on a tile
  (MUG · Samantha · @samantha.wiki). Her mug photo is not shown or redrawn.
- **sophie.engineering:** her reply is intoned by Sibyl in time with the pen in
  `made-pen-plotter-replies`, and the card carries the exact text. Her name is on the card and
  is not spoken.
- **mokkenstorm.dev, topchicken.bsky.social, ver.ooo, oszillate.bsky.social,
  minormobius.bsky.social:** as in their rows, in the aired segments named there.

### Annotation: the row for mokkenstorm.dev

The sentence "The show's own account must never reply to, tag or mention this account." is
**superseded**. On 22 November 2026 local time (21 November UTC), the owner ruled: "we're not
crashing the middle of someone elses thread - thats the important distinction. ok to tag".

So a tag in the show's own thread is allowed. What stands is the distinction the owner drew: the
show's account never turns up in this account's threads, or anyone else's. The tagged reply under
the show's own post, sent about 23:00 UTC on 21 November 2026, included this handle. It tagged
thirteen of the fourteen accounts in the aired cut. topchicken.bsky.social, a bot, was not tagged;
its operator, dave.9000ish.uk, was.

### Accounts this check covers that did not air

No action is needed for any of these:

- aparker.io (cut 1, the plotter);
- catblanketflower.yuwakisa.com and 7778777.online (cut 3, the Top Chicken market block);
- the asker of exchange 3 in `interview`, the "do not use" account (the draft `interview` did not
  air, and none of its posts is in an aired segment);
- the asker of exchange 4 in `interview`.
