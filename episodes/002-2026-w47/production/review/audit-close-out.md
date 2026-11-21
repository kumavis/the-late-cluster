# Audit: close-out of 002-2026-w47's records against what aired

Verdict: fix before commit

An auditor's check, 22 November 2026, of the episode's records against the cut that was posted on
21 November 2026 at 22:55 UTC: the nine segments in `episode.json`'s rundown, in that order. Read
only: `episode.json`, `cast.js`, the nine aired segments' `script.js` and `index.js`,
`production/sources.json`, `production/sources-music-set-aside.json`, `production/owner-notes.md`,
`production/trim.md`, `production/assembly-2.md`, `production/review/consent-check.md`. No network,
no frames. Nothing was changed but this file. Each correction below is for whoever owns the file
(the records: the project manager or a researcher; scripts' comments: the writer, or the builder
for `index.js`; `episode.json`'s description: the writer already briefed).

**wrong**: states something false about what aired, or leaves out something that aired.
**stale**: describes an earlier draft.

## 1. `production/sources.json` against the aired scripts and staging

Every account and post it lists is in an aired segment (performed, read, shown, credited, or the
recorded occasion of an aired line). Nothing in it belongs to `music` or to a cut block. The
findings are omissions and notes written for earlier drafts.

| # | class | where | what it says now | what is true | smallest correction |
|---|---|---|---|---|---|
| 1.1 | wrong | `posts` | (missing) David's post `at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crbcfzuk2z` | Larry reads its cut "… it turns out that's still under copyright and covers aren't fair use. …" aloud in `interview-yonderdavid` (line `read-copyright`), with the card up (`index.js` CARDS, 4 likes, 1 repost, 2 replies). The only record is in `sources-music-set-aside.json`, tagged `segment: "music"`. | Move the record into `sources.json` with `segment: "interview-yonderdavid"`, `use: "card"`, the interview cut only, and drop its `music` cut and lines `plan-1`, `plan-2`. |
| 1.2 | wrong | `posts` | (missing) David's readme post `…/3n27zewdpe223` | It is the source for "The synthesizer you use comes with four animals." (line `four`), which aired in the interview. Its only record is in the set-aside file, tagged `music`. | Move it into `sources.json` as a `reference` for `interview-yonderdavid`, its note naming the line `four`. |
| 1.3 | wrong | `accounts`, `posts` | (missing) the account `did:plc:f6n22z62adionrvb5s6n6vfk` and its post `…/3n2qz6ywwrc2b` ("ok I'll bite, what's a zeta function") | It is the occasion of Amber's `amber-call` in `riemann-breaking-news`, recreated by Larry's `larry-ask`. It appears only as `context` in `lines`. Every other occasion account (norvid-studies, gracekind) has an account record and a `reference` post. | Add the account as `role: "mentioned"` (not named, shown or played) and the post as a `reference` for `riemann-breaking-news`. |
| 1.3 (withdrawn, 22 November 2026) | none | as above | The commission's terms (`episodes/002-commissions-w47/production/research/terms-riemann.md`, the table for `riemann-breaking-news`, row `bisks.net`) require this account to be "not in this segment", including `sources.json` "accounts". Its post is to be "recorded only as the context of the call", which is what `lines` already does. The record is right as it stands. | Do not add the account or the post. Only the owner of the terms can change that. |
| 1.4 | wrong | `samantha.wiki` note | "The maker of the plotter, and the hero of the segment. Three of the maker's posts are shown and read aloud … Also credited on screen, with the stream address, for the whole segment." | (a) She is also in `music-alt`: named in the sung lyric ("Samantha showed a morning mug") and credited on a tile, MUG · Samantha · @samantha.wiki; her mug post `…/3n2lmdzdw6s2n` is already recorded for it. That is two segments. (b) The plotter's credit is not up for the whole segment: `index.js` puts it on screen from `host`, after the title open. | Add the `music-alt` lyric and tile, and say "two segments"; say the credit is up "from `host` to the end". |
| 1.5 | wrong | `cee.wtf` note | "Saturday's winner and the record holder; named as the game names its winner" | cee is also credited in `music-alt` (tile WHEELIE GAME · cee · yard-shift.cee.wtf; post `…/3n2kacrswx22q` and the link are already recorded). Two segments. | Add the `music-alt` tile credit and "two segments". |
| 1.6 | wrong | `dave.9000ish.uk` note | "…the bot's result post is read in the Top Chicken segment, which makes two segments for this account, the limit." | The owner ruled the bot's post counts only if the member appears ("only if they make an appearance"; `owner-notes.md`), and Dave does not appear in `top-chicken`. His two segments are the coffee segment (puppet speaks `best`) and `music-alt` (his post on a card, four words read by Larry, his tile and "+ MUG · ADDED BY DAVE"). The note does not mention `music-alt` at all. | Replace the sentence: two segments, coffee (performed) and `music-alt` (card read by Larry, credited); the Top Chicken bot's post does not count (owner's ruling, 21 November 2026). |
| 1.7 | stale | `yonderdavid.bsky.social` note | "In the song, two more of David's posts are read aloud by Sibyl from their cards and the quartet video is credited; the puppet is not in that segment." | That was `music`. In `music-alt` no post of David's is read or shown; the quartet video is credited on a tile only (CAT VOICE · David · @yonderdavid.bsky.social / with a chimera-vocal-synth quartet). | "In the song, `music-alt`, the quartet video is credited on a tile; no post of his is read or shown and the puppet is not in it." |
| 1.8 | stale | post `…/3n2cffuxxv22n`, first record, note | "Music: this is the quartet video that is credited on screen (CAT VOICE AND QUARTET · David · the handle)" | The aired tile reads CAT VOICE · David · @yonderdavid.bsky.social, with "with a chimera-vocal-synth quartet" under it, in `music-alt`. | Name `music-alt` and quote the tile as staged. |
| 1.9 | wrong | post `…/3n2cffuxxv22n`, two records | `replies: 7` (interview record) and `replies: 8` (`music-alt` record) | One post, two counts. The interview card shows 7. | Make the two records agree on one count, with its time. |
| 1.10 | stale | post `…/3n2cfrthxl22s` (Sophie) note | "Read aloud by Sibyl, whole, while the pen writes it." | Sibyl intones it on one note in a music block (`meow-read`), syllable by syllable ("meow wow wow … mrou"), with the caption bar off; the card and the page carry the exact text. The script says it is not a spoken line. | "Intoned by Sibyl in time with the pen (music block `meow-read`); the card carries the exact text." |
| 1.11 | stale | `mokkenstorm.dev` note | "The show's own account must never reply to, tag or mention this account (consent check)." | Superseded by the owner's ruling: see check 3. | Annotate as in check 3. |

Not findings, for whoever closes out:
- `zetaof1.bsky.social`, `davidcrespo.bsky.social` and `moultano.bsky.social` have no `note`, so
  nothing says how each aired (zetaof1: card read by Sibyl and an account plate, no puppet;
  davidcrespo and moultano: puppets, one line each, in `riemann-breaking-news`).
- The show's own handle, `@latecluster.simcluster.tv`, is on screen in `bluesky-account` and typed
  and read in `making-of-inward`, and is not in `sources.json`. It is the show's account, not a
  member's; whether it belongs there is the project manager's call.

## 2. `production/review/consent-check.md`

| # | class | what | what is true | smallest correction |
|---|---|---|---|---|
| 2.1 | wrong | `davidcrespo.bsky.social` has no row or addendum | Puppet speaks his chart post in `riemann-breaking-news`. | Add a row, or an addendum pointing to wherever the news segment's consent was checked. |
| 2.2 | wrong | `moultano.bsky.social` has no row or addendum | Puppet speaks his quote post in `riemann-breaking-news`. | As 2.1. |
| 2.3 | wrong | `zetaof1.bsky.social` has no row or addendum | Card read aloud by Sibyl, named in Amber's line, shown on an account plate, in `riemann-breaking-news`. | As 2.1. |
| 2.4 | wrong | the occasion account of Amber's call (`did:plc:f6n22z62adionrvb5s6n6vfk`) is not in "Accounts that never appear" | Its question is the occasion of `amber-call`, recreated by Larry. | Add it to that table. |
| 2.5 | wrong | the check's own scope: "That is the state at 2026-11-19 09:55 UTC" | All four accounts above, and every riemann post, are from 20 November, after that moment. The check could not have covered them, and the file does not say so. | Say in the addendum that `riemann-breaking-news` is outside this check and where its check is. |
| 2.6 | stale | "how it is used" column, several rows | yonderdavid: "made-polyhedra-instruments-sakura; cards (made-cat-voice-quartet, music)" (none aired; aired: interview, and a tile in `music-alt`). cee.wtf: "puppet speaks (interview)" (did not air; aired: top-chicken, and a tile in `music-alt`). shimmermathlabs.com: "read aloud (interview)" (did not air; aired: coffee and riemann, puppet speaks). samantha.wiki and dave.9000ish.uk: `music-alt` is not listed. | One addendum line per account giving the aired uses; the verdicts are unaffected (Dave's `music-alt` use is the simulator post and the post the 21 November addendum cleared). |
| 2.7 | stale | mokkenstorm.dev row: "The show's own account must never reply to, tag or mention this account." | Superseded: see check 3. | Annotate as in check 3. |

Accounts that aired and are covered: yonderdavid.bsky.social, cee.wtf, shimmermathlabs.com,
dave.9000ish.uk, oszillate.bsky.social, mokkenstorm.dev, minormobius.bsky.social, ver.ooo,
samantha.wiki, sophie.engineering, topchicken.bsky.social; and, as unnamed occasions,
norvid-studies.bsky.social (the asker of exchange 1) and gracekind.net (the tag under the picture).

Accounts it covers that did not air (no action): aparker.io, catblanketflower.yuwakisa.com,
7778777.online, the asker of exchange 3 in `interview` (the "do not use" account; its post is in
no aired segment), and the asker of exchange 4 in `interview`.

## 3. The note on @mokkenstorm.dev the owner has since ruled on

The ruling (in the owner's words): "we're not crashing the middle of someone elses thread - thats
the important distinction. ok to tag". These sentences stand against it:

| # | class | file | the sentence | smallest correction |
|---|---|---|---|---|
| 3.1 | stale | `production/review/consent-check.md`, row `mokkenstorm.dev`, evidence column | "The show's own account must never reply to, tag or mention this account." | Annotate in place: superseded by the owner's ruling; a tag in the show's own thread is allowed; the show's account does not turn up in this account's threads (or anyone else's). |
| 3.2 | stale | `production/sources.json`, account `mokkenstorm.dev`, `note` | "The show's own account must never reply to, tag or mention this account (consent check)." | The same annotation, in the note. |
| 3.3 | stale | `production/owner-notes.md`, "22 November 2026: posting", third bullet | "The consent check says the show's account must never reply to, tag or mention @mokkenstorm.dev. The tagged reply drafted on 21 November included that handle; it was not sent. The reply text was redrafted without it (`data/bot/posts/002-2026-w47.reply-2.txt`)." | The next bullet records the ruling and the sent reply, but read alone this one says the handle was left out and points to a redraft that was not what went out. Add "(superseded by the next bullet: the reply that was sent included the handle)". |

Two things the records do not settle, for the project manager:
- **The date.** My brief dates the ruling 22 November 2026. `owner-notes.md` puts it before the
  reply, which it says was sent "on 21 November 2026, about 23:00 UTC", under a heading dated
  22 November. One of the two dates is wrong; an annotation should carry the right one.
- **"all 13 handles".** By `sources.json`, fourteen accounts are shown, voiced or credited in the
  aired cut (samantha.wiki, ver.ooo, sophie.engineering, dave.9000ish.uk, shimmermathlabs.com,
  oszillate.bsky.social, mokkenstorm.dev, minormobius.bsky.social, yonderdavid.bsky.social,
  cee.wtf, topchicken.bsky.social, zetaof1.bsky.social, davidcrespo.bsky.social,
  moultano.bsky.social). I did not read the reply text, so which one was left out, and whether
  that was by choice, is not checked here.

## 4. Comments in the aired segments' headers that are no longer true

| # | class | file:line | the stale text | what is true |
|---|---|---|---|---|
| 4.1 | stale | `segments/interview-yonderdavid/script.js:14` | "This is the episode's second segment" | Third. |
| 4.2 | stale | `segments/interview-yonderdavid/script.js:15-16` | "The song, three segments later, relies on it and does not tell it again." | The song that aired, `music-alt`, is six segments later and does not use the "four animals" fact. |
| 4.3 | stale | `segments/interview-yonderdavid/script.js:18-19` | "(the episode's one performed cat is in the song)" | No cat is performed in `music-alt`: the cat is a sung line ("someone built a cat that sings") and a tile with cat ears. No cat is performed anywhere in the cut. |
| 4.4 | stale | `segments/top-chicken/script.js:12` | "Third segment" | Sixth. |
| 4.5 | stale | `segments/made-polyhedral-coffee-simulator/script.js:1` | "(draft, episode 002-2026-w47)" | Aired. |
| 4.6 | stale | `segments/made-polyhedral-coffee-simulator/script.js:14` | "Fourth segment." | Seventh. |
| 4.7 | stale | `segments/made-mobius-chess-ringmate/script.js:46-48` | "This is the last segment, and it carries the episode's close: the button, "I resign.", its laugh, the sting and the long applause, and then the credits. There is no separate close segment." | Eighth of nine. The song closes the episode; this segment ends on the laugh and the sting, and the long applause is gone (as the comment at lines 121-123 already says). |
| 4.8 | stale | `segments/made-mobius-chess-ringmate/script.js:53` | "The board stays as the flag left it until the credits." | Until the song begins. |
| 4.9 | stale | `segments/made-mobius-chess-ringmate/index.js:3-5` | "The close (trim, cut 4): "I resign." is the episode's last line. The picture the button leaves … holds through the laugh, the sting and the long applause, with a slow push in from the sting, and the studio's end card follows." | "I resign." is not the episode's last line ("Good night, everybody." in `music-alt` is); the script has no long applause; the song follows, not the end card. |
| 4.10 | stale | `segments/music-alt/script.js:42-43` | "If the chess segment still carries the long applause it had as the close, one of the two should go." | Settled: the chess segment no longer carries it. |
| 4.11 | stale | `segments/music-alt/script.js:67-68` | "Five lines carry none, being new text: `coffee`, `mug` and `mug-too` in the song, and `happy-week` and `goodnight` at the end." | `mug-too` and `happy-week` now carry `as`; three carry none (`coffee`, `mug`, `goodnight`). |
| 4.12 | stale | `segments/music-alt/index.js:20-21` | "with display name, handle, date and counts from production/drafts/music-alt/sources.json" | The record that went out is in `production/sources.json`. |
| 4.13 | stale | `segments/bluesky-account/script.js:22` | "No `as` and no pronunciation here: a sound editor fits the script." | All three lines carry `as`: it has been fitted. |
| 4.14 | stale | `segments/riemann-breaking-news/script.js:50` | "No `as` here and no pronunciation: a sound editor fits the script." | Most of its lines carry `as`: it has been fitted. |
| 4.15 | stale | `segments/making-of-inward/script.js:40-42` | "Levels four and five are new: 209 and 249 continue the same step and are direction, to be tuned or capped." | Level five is `f0: 240` (lines `posts-title`, `posts-count`, `up-posts`): it was capped. |

Outside the headers, for the same owners (comments only, and out of the brief's scope):
- `segments/made-polyhedral-coffee-simulator/script.js:124`: "one of the episode's three big laughs".
  Two `biglaugh` sounds are in the aired cut (here and the interview's); the plotter's went with cut 1.
- `segments/made-pen-plotter-replies/script.js:32`: at `plotter-in`, "the maker's credit comes on
  and stays". `index.js` (lines 16-17, 29) keeps the credit off until `host`.

## 5. `episode.json`

| # | class | field | what it says | what is true |
|---|---|---|---|---|
| 5.1 | wrong | `airDate` | "2026-11-20" | Aired 2026-11-21 (posted 22:55 UTC). |
| 5.2 | wrong | `description` | "the house band gives a new cat voice its first song" | That was `music`, which did not air. The aired song, "Best We Can Doo-Wop", is about "best i can do" and the things members made that week; no cat voice sings in it. |
| 5.3 | wrong | `description` | leaves out three of the nine segments | Nothing in it mentions the breaking news (`riemann-breaking-news`), the making-of (`making-of-inward`) or the account bit (`bluesky-account`). |
| 5.4 | stale | `description` | "A pen plotter writes out the replies to one post" | Since cut 1 the pen writes two replies (ver.ooo's line, Sophie's) and the show's title; it does not write the post's replies out. Borderline: the writer may keep the framing, but it now says more than the segment shows. |

Not asked, noted: `status` is still "draft" for an episode that has aired.

## Counts

| check | wrong | stale | total |
|---|---|---|---|
| 1. sources.json | 6 (1.1, 1.2, 1.4 to 1.6, 1.9; 1.3 withdrawn) | 4 (1.7, 1.8, 1.10, 1.11) | 10 |
| 2. consent check | 5 (2.1 to 2.5) | 2 (2.6, 2.7) | 7 |
| 3. the mokkenstorm note | 0 | 3 | 3 |
| 4. header comments | 0 | 15 | 15 |
| 5. episode.json | 3 (5.1 to 5.3) | 1 (5.4) | 4 |
