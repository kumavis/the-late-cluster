# Trim: five cuts on the owner's notes, 21 November 2026

Made from `production/owner-notes.md`, by the trim brief. Four scripts and `production/sources.json`
changed; nothing else did. Nothing is rendered: the seconds below are worked out from the cue times
of the 8:25 draft (I read times and ids only from the four segments' `cues.json`) by the renderer's
own rules for the cursor, and a new render is the truth.

## Lines added or changed (for the repetition check)

- **No spoken or sung line was added.** No segment needed a new ending.
- **No remaining line was changed:** every `id`, `text`, `as` and timing field that is still in the
  four scripts is as it was.
- **One beat without words was changed:** the pen's hum in the plotter's opening, track `in-hum` of
  the music block `pen-in`.
  - was: `'m:47 . . . m:52 . . .'` (8 sixteenths, 1.0 s)
  - is: `'m:52 m:52 m:52 . m:47 m:47 m:47 m:47 . m:52 m:52 m:52 m:52 m:52 m:52 m:52'` (16 sixteenths, 2.0 s)
- **One thing is new on screen, and it is staging, not speech:** during that hum the pen writes the
  show's title on the sheet. Its full text: `The Late Cluster`.
- Comments were changed where they described something that is gone; each is listed under its cut.

## The five cuts

| cut | segment | removes | segment before | segment after | saved |
|---|---|---|---|---|---|
| 1 | `made-pen-plotter-replies` | austin's reply, the wordless pen run, the three-hundred exchange | 83.8 s | 46.7 s (47.7 s with the title) | 37.1 s |
| 2 | `top-chicken` | the guess | 95.2 s | | 16.0 s |
| 3 | `top-chicken` | the play-money market block | | 46.4 s with both | 32.9 s |
| 4 | `made-mobius-chess-ringmate` | the line `day`; the four lines after "I resign." | 76.3 s | 66.3 s | 10.0 s |
| 5 | `interview-yonderdavid` | the koto exchange, the request after it, the plug | 93.2 s | 65.1 s | 28.1 s |

Together 124.0 s. The title costs 1.0 s of it back: **123.0 s net**. The owner's notes planned on
about 127 s, so by their arithmetic the six segments come to about 6:22, not 6:17, and the episode to
about 9:40, not 9:35. Almost all of the difference is in cut 4 (see "Left for the owner", 1).

Each cut is a separate block in its script and a separate set of records in `sources.json`. None
shares a line with another. The last section of this file holds exactly what each one took out, so
any one can be put back alone.

### Cut 1. Plotter: everything from "Earlier in the line: a reply from austin." to the end

Removed, in order: cue `austin-card`; lines `austin`, `film`, `bee`; the chuckle after `bee`; line
`near`; cue `pen-live`; music block `pen-run` (tracks `run-return`, `run-yb1`, `run-yb2`, `run-yb3`,
`run-cut`); cue `pen-stops`; the tick after it; a wait of 1.3 s; music block `pen-nudge` (track
`nudge`); a wait of 1.2 s; lines `limit`, `how-long`; cue `count`; line `three-hundred`; cue `lmao`;
the big laugh, the sting and the applause that closed the segment.

The ending now: `back` ("Back came this, from Samantha."), `nothing-less` ("I expected nothing less
❤️", the maker's reply, read by Larry from its card) and the laugh that was already there. It works
as the last line; nothing was added. Sibyl's meow reading and the maker's reply to it are untouched.

Comments changed in the script: the header no longer says "three real replies", no longer names
austin's reply, and no longer has the paragraph "The experiment"; a paragraph "Trim" says what went.

`sources.json`: removed the account `aparker.io` (austin), who is no longer in the episode; the
posts `…3n2cccl2rbc2o` (austin's reply) and `…3n2cceb5pvc2j` (the maker's "LMAO" to it, which was
shown on a card at the end and nowhere else); the number 300. Changed one note: the maker's account note said "Four of the maker's
posts are shown and read aloud"; it says "Three" now. ver.ooo's line `suspense`, its record and its
setup are unchanged.

Saved: 37.1 s (83.8 to 46.7 s), before the opening's extra second.

### The opening (not a cut): the pen writes the show's title

The words stay: "This is The Late Cluster, with Larry Nx." is untouched, and so is its timing.

- **What the pen writes:** `The Late Cluster`, on the top line of the sheet. 14 letters and 2 spaces.
- **When:** during the hum `in-hum`, one sixteenth to a letter and a silent sixteenth for each space,
  as everywhere else in the segment. The pen touches down at 0.4 s. `The` is written from 0.400 to
  0.775 s, `Late` from 0.900 to 1.400 s, `Cluster` from 1.525 to 2.400 s. The pen lifts at 2.4 s.
  Sibyl's line starts at 2.5 s and ends at about 5.1 s, so the whole title is on the paper before
  she names it, while she names it and as the line ends.
- **The hum is 1.0 s longer:** 16 sixteenths where it was 8. That is the least that gives each letter
  its sixteenth. Every beat after it moves 1.0 s later, and the segment and the episode are 1.0 s
  longer.
- The cue comments in the script say all of this beside the block, and say two more things for the
  builder: the paper is the only title on screen (cue `title-in` no longer brings a title card), and
  at cue `host` the sheet beside Larry is blank again.

### Cut 2. Top Chicken: the guess

Removed, in order: cue `guess-in`; line `guess`; cue `guess-sum`; lines `typical`, `eleven`, `call`;
cue `guess-flap`; lines `still`, `wrong`; the laugh after `wrong`.

Kept: the segment's last beat, the sting (`{ sfx: 'sting', at: 0.05 }`), unchanged.

One comment changed: the staging note above `recordline` ended "; the word "still" stays lit when the
line is over". That was the plant for the one-word call, so it went with it. The line `recordline`
itself, which is a real post read aloud, is untouched.

`sources.json`: removed the numbers 535 and "over eleven times (11.6)".

Saved: 16.0 s on its own.

### Cut 3. Top Chicken: the play-money market block

Removed, in order: cue `market-in`; lines `market`, `one-bot`; cue `card-loss-in`; line `loss`; the
aww after it; line `later`; cue `card-gg-in`; lines `gg`, `owner`; cue `card-fix-in`; lines `fix`,
`fundamentals`; the laugh after `fundamentals`; cue `market-out`.

All three real posts in the block went together with the house lines that set them up, so no real
line is left answering something else.

Comments changed in the header: the paragraph that began "The market block names no weekday" is
gone; the list of respellings no longer mentions "gg"; "ellipsis and emoji tokens" is "ellipsis
tokens" (the only emoji were in `loss`).

`sources.json`: removed the accounts `catblanketflower.yuwakisa.com` and `7778777.online`, who are
no longer in the episode; the posts `…3n2exnpv6us2k` (`loss`), `…3n2me4phkfsed` (`gg`),
`…3n2miex33mk27` (`fix`) and `…3n2glpqfbsk2u` (the unshown source of the market's words and
address); the link `https://topchicken.cee.wtf`, which was the credit on the market board and
nowhere else; the number "three days".

Saved: 32.9 s on its own.

**With cuts 2 and 3 both made** the segment ends on `smallest` ("The smallest win of the week. Same
title.") and the sting: 46.4 s, 48.8 s shorter. The line works as the last one; nothing was added.
With cut 3 put back and cut 2 kept, it ends on "Fundamentals.", its laugh and the sting. With cut 2
put back and cut 3 kept, it ends as the draft did.

### Cut 4. Chess: it ends on "I resign."; the line `day` goes

Removed: line `day` ("A member of the cluster built it. It took about a day."); cue `sign-off`;
lines `accepted`, `i-will`, `the-game`, `good-night`.

Kept, unchanged: `resign`, the cue `flag-down`, its laugh, then the sting and the long applause that
close the episode. The episode's last words are "I resign." Nothing was added.

Without `day` the top reads: "One more game before we go." / "It began as one post." The second is
the recorded setup of the maker's line `idea`, and it is untouched.

Comments changed: the header's cue list no longer has `sign-off`; the "Assembly" paragraph describes
the close as it is now; the comment over section 1 no longer says the thing's existence is "said
once, plainly"; a paragraph "Trim" says what went.

`sources.json`: removed the number for `day` (25 h 26 min). No post or account changed.

Saved: 10.0 s (3.5 s for `day`, 6.5 s for the four lines).

### Cut 5. Interview: it ends on the answer about parody

Removed, in order: cue `polyhedra`; line `two-days`; cue `koto-pluck`; the tick; a wait of 0.3 s;
lines `ask-koto`, `new`; cue `dry`; a wait of 0.8 s; lines `ask-details`, `free`; cue `plug`; lines
`plug-line`, `button`; the sting and the applause that closed the segment.

The ending now: David's `parody`, the cue `label-hold`, the 1.3 s on his chyron and the big laugh.
Nothing was added, and nothing was added for a real person. The two real lines that went (`new`,
`free`) went with the questions that set them up; the three that stay (`very-well`, `kazoo`,
`parody`) have the same words and the same setups.

Comment changed: the header says "Three occasions" and no longer lists Tuesday's.

`sources.json`: removed the posts `…3n2jnh3e6hc2t` (`new`) and `…3n2jq4x7qys2t` (`free`), the two
questions they answered (`…3n2jmvm74dc2r`, `…3n2jnnda4es2y`), the two `lines` records, and the link
`https://pastebin.com/cxLPkJby`. Changed two notes: David's says the puppet speaks "three" of his
posts, where it said "five"; Amber's no longer has the sentence about her two questions in the
interview. Left in place: the polyhedra video, `…3n2jfwtubf22r` (see "Left for the owner", 5).

Saved: 28.1 s.

## What the cuts broke

Cut 1 takes out the plotter's ten seconds with no words, and no cut can give them back: by the
measure in `production/experiment.md` every segment drafted from a `made` card needs such a stretch,
the plotter is one, and its longest stretch without a word is now the 2.5 s before Sibyl's first
line, so the experiment reads "partly run" at best (the chess stretch is untouched). The staging no
longer matches four scripts, and that is a builder's job, not a cut: each `index.js` may still look
for cues that are gone (`austin-card`, `pen-live`, `pen-stops`, `count`, `lmao`; `market-in` to
`market-out`, `guess-in`, `guess-sum`, `guess-flap`; `sign-off`; `polyhedra`, `koto-pluck`, `dry`,
`plug`), three of them still hold cards for things that are no longer in `sources.json` (austin's
reply, the two market players' posts, the pastebin link), the word "still" must stop staying lit,
and the title has to be drawn by the pen during `pen-in` in place of whatever `title-in` showed. The
credits, and any post that tags the people in the episode, must drop austin and the two market
players. Top Chicken is now about 46 s, under the bible's usual 60 to 90, and ends on a sting with
no laugh after its last line. `production/assembly.md`, `plan.json`, `heard-waivers.json` and the
scorecard still describe the 8:25 draft; I did not open or change them.

## Left for the owner

1. **The curtain after "I resign."** I kept the sting and the long applause, because they close the
   episode and not the four lines. They run 7.7 s. Dropping those two beats cuts straight from the
   laugh to the credits and makes cut 4 worth 17.7 s. The notes' "about 15" lies between the two.
2. **Top Chicken's sting.** Kept for the same reason: it is the segment's own, and without it the
   segment stops on a bare line. It is 2.3 s.
3. **How much of the name the pen writes.** It writes `The Late Cluster`. "with Larry Nx" is said by
   Sibyl and shown on Larry's chyron a moment later. Writing the whole name would take 14 more
   sixteenths, 1.75 s. The other way to do it, the pen writing under Sibyl's line so that the last
   letter lands on her last word, adds no time but puts a hum under the one line that tells a new
   viewer what the show is; I did not do it, and it is a sound editor's question.
4. **The title on a sketch of someone's plotter.** The sketch carries the maker's credit from the
   first frame, and for two seconds it writes something her plotter never wrote. I think it reads as
   the show's own title sequence, and the script asks for a blank sheet at `host`, before Larry calls
   the sheet hers. An auditor should look at the staged frame.
5. **One record I left in `sources.json`:** David's polyhedra video (`…3n2jfwtubf22r`, a reference).
   The interview no longer uses it, but the coffee segment's line `video` ("A member posted a video.
   A landscape made of polyhedra.") looks like a description of the same video, so it may still be
   a source. I read only that one line of the coffee script and did not confirm it. The record's
   `segment` and `why` fields still name the interview: an auditor should retag it or remove it.
6. **Running time.** 123 s net, not 127. If the two new segments come in at their estimates the
   episode is about 9:40.

## To put a cut back

The episode folder is untracked, so this section is the record of what was taken out: the
exact text of every removed beat, every comment as it was, and every record removed from
`production/sources.json`. Each cut stands alone: put one back and leave the others. In
`sources.json` the order of records inside an array does not matter. After putting a cut back,
take its line out of the "Trim" paragraph in the script's header.

### Cut 1 back (plotter)

**Script.** In `segments/made-pen-plotter-replies/script.js`, replace the comment line that begins
`// ---- the end (trim, cut 1:`, after the last laugh, with this block:

```js

    // ---- an earlier reply (Saturday 20:05 UTC), and the ten seconds
    { cue: 'austin-card', at: 0.2 },
    { say: 'larry', id: 'austin', text: 'Earlier in the line: a reply from austin.' },
    { say: 'larry', id: 'film', text: 'The opening of a film script.' },
    // read aloud, exact, its first sentence, the cut marked: at://did:plc:gttrfs4hfmrclyxvwkwcgpj7/app.bsky.feed.post/3n2cccl2rbc2o
    { say: 'larry', id: 'bee', text: 'According to all known laws of aviation, there is no way a bee should be able to fly. …',
      as: 'According to all known laws of aviation, there is no way a bee, shood be able to fly. …', rate: 0.92, gap: 0.4 },  // the comma after "bee" is a breath that keeps "bee" and "should" apart: run together they were heard, once, as an offensive word
    { sfx: 'chuckle', at: 0.1 },
    { say: 'larry', id: 'near', text: 'Here is the pen, near the end.' },

    { cue: 'pen-live', at: 0.3 },                            // the page and the pen fill the frame; no caption; heads at the edges, watching
    { music: { id: 'pen-run', bpm: 120, gap: 0.5, tracks: [
      { who: 'pete', id: 'run-return', beat: 'm:43 . . . . . . .', vol: 0.8 },                                             // the pen travels back to the left margin
      { who: 'pete', id: 'run-yb1', start: 2.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47 m:47 . .' },   // it writes: Yellow, black.
      { who: 'pete', id: 'run-yb2', start: 6.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47 m:47 . .' },   // Yellow, black.
      { who: 'pete', id: 'run-yb3', start: 10.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47 m:47 . .' },  // Yellow, black.
      { who: 'pete', id: 'run-cut', start: 14.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47' },           // Yellow, blac
    ] } },
    { cue: 'pen-stops' },                                    // the reply has no more letters in it, and the hum has stopped with it
    { sfx: 'tick', at: 0.35, hold: 0 },                      // the pen lifts
    { wait: 1.3 },
    { music: { id: 'pen-nudge', bpm: 120, gap: 0, tracks: [  // it moves one letter's width to the right, and holds there
      { who: 'pete', id: 'nudge', beat: 'm:52', vol: 0.7 },
    ] } },
    { wait: 1.2 },                                           // Larry looks at Sibyl. Sibyl looks at the page

    { say: 'sibyl', id: 'limit', text: 'The limit is three hundred characters.', gap: 0.4 },
    { say: 'larry', id: 'how-long', text: 'How long is this one?' },
    { cue: 'count', at: 0.3 },                               // a counter beside the page runs up and lands on her word: 300 OF 300
    { say: 'sibyl', id: 'three-hundred', text: 'Three hundred.', rate: 0.9, gap: 0.45 },
    { cue: 'lmao', at: 0.3 },                                // Samantha's own reply to that reply, on its card, one word: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cceb5pvc2j
    { sfx: 'biglaugh', at: 0.15 },                           // the segment's biggest laugh, and one of the episode's three big ones
    { sfx: 'sting', at: 0.1 },
    { sfx: 'applause', at: -0.6, hold: 0.25 },
```

**Header.** The header's lines from "// Saturday 14 November" down to the blank comment line above
"// Pete is the pen's motor throughout" were these. If the pen still writes the title, keep the
"Trim" paragraph's line about the opening:

```js
// Saturday 14 November (stream.place/samantha.wiki). The studio draws its own sketch of it and lets
// it write three real replies. Cards: made-pen-plotter-replies, voices-plotter-queue-small-accounts.
//
// Real people. Samantha (the maker) is shown and read aloud, never voiced. ver.ooo's puppet says one
// line, its own reply, to the reply it answered. Sophie's and austin's replies are read aloud as the
// posts they were. Every real post here is in sources.json.
//
// The experiment (ten seconds with no words): from the end of `near` to the start of `limit` nobody
// speaks and the audience makes no sound. The pen writes the end of austin's reply, and the turn is
// the pen's. Nothing before it gives the turn away; nothing after it describes it.
//
```

**sources.json.** Back into `accounts`:

```json
{
  "handle": "aparker.io",
  "did": "did:plc:gttrfs4hfmrclyxvwkwcgpj7",
  "displayName": "austin",
  "role": "quoted",
  "followers": 9763,
  "clusterMember": true,
  "note": "A cluster member, new to the show. The reply is read aloud in part and written by the pen in part."
}
```

Back into `posts`:

```json
{
  "uri": "at://did:plc:gttrfs4hfmrclyxvwkwcgpj7/app.bsky.feed.post/3n2cccl2rbc2o",
  "author": "aparker.io",
  "displayName": "austin",
  "time": "2026-11-14T20:05:30.658Z",
  "text": "According to all known laws of aviation, there is no way a bee should be able to fly.\nIts wings are too small to get its fat little body off the ground.\nThe bee, of course, flies anyway because bees don't care what humans think is impossible.\nYellow, black. Yellow, black. Yellow, black. Yellow, blac",
  "likes": 14,
  "reposts": 0,
  "replies": 1,
  "replyTo": "at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cc5mbfqs22",
  "use": "card",
  "segment": "made-pen-plotter-replies",
  "note": "Its first sentence is read aloud by Larry from a card that shows that sentence and the cut (\"According to all known laws of aviation, there is no way a bee should be able to fly. …\"). Its last eight words are what the pen writes in the wordless stretch (\"… Yellow, black. Yellow, black. Yellow, black. Yellow, blac\"), a glance. Nothing else of it is on screen."
},
{
  "uri": "at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cceb5pvc2j",
  "author": "samantha.wiki",
  "displayName": "Samantha",
  "time": "2026-11-14T20:06:27.377Z",
  "text": "LMAO",
  "likes": 6,
  "reposts": 0,
  "replies": 0,
  "replyTo": "at://did:plc:gttrfs4hfmrclyxvwkwcgpj7/app.bsky.feed.post/3n2cccl2rbc2o",
  "use": "card",
  "segment": "made-pen-plotter-replies",
  "note": "The maker's reply to austin's reply: one word, on its card at the end. A glance; not spoken."
}
```

Back into `numbers`:

```json
{
  "segment": "made-pen-plotter-replies",
  "value": 300,
  "said": "The limit is three hundred characters. / Three hundred.",
  "what": "characters in austin's reply, which is also the most a post can hold",
  "post": "at://did:plc:gttrfs4hfmrclyxvwkwcgpj7/app.bsky.feed.post/3n2cccl2rbc2o",
  "method": "the length of the post's text as the digest has it, each line break counted as one character: 300"
}
```

And in the account note for `samantha.wiki`, "Three of the maker's posts" goes back to "Four of the
maker's posts".

### The opening as it was (plotter)

Not one of the five cuts, and independent of cut 1. In the same script, the lines from the cue
`plotter-in` down to the comment line above the cue `title-in` were:

```js
    { cue: 'plotter-in' },                                   // the studio's sketch draws itself: one pen over one blank sheet; the maker's credit comes on and stays
    { music: { id: 'pen-in', bpm: 120, gap: 0.1, tracks: [
      { who: 'pete', id: 'in-hum', beat: 'm:47 . . . m:52 . . .', vol: 0.8 },
    ] } },
    // ---- the open: the title and the host, said over the pen (cue 'title-in': Sibyl's voice, the show's name on screen)
```

### Cut 2 back (Top Chicken, the guess)

**Script.** In `segments/top-chicken/script.js`, replace the comment line that begins
`// ---- the end (trim, cut 2:` with this block. It goes immediately before the last beat, the
sting, which is still there:

```js
    // ---- the guess: labelled in the voice and, from here to the end, on the board
    { cue: 'guess-in' }, // board header until the segment ends: EPPY'S GUESS · NOT A RESULT
    { say: 'eppy', id: 'guess', rate: 0.88, text: 'This next part is my guess.' },
    { cue: 'guess-sum' }, // under the header: MEDIAN OF 42 FETCHED RESULTS · 535, then, on "eleven": 6,186 ÷ 535 = 11.6
    { say: 'eppy', id: 'typical', rate: 0.88, text: 'In the results we fetched, a typical winning score is 535.', as: 'In the results we fetched, a typical winning score is five-hundred-thirty-five.' },
    { say: 'eppy', id: 'eleven', rate: 0.88, text: 'The record is more than eleven times that.', as: 'The rekkerd is more than eleven times that.' },
    { say: 'eppy', id: 'call', rate: 0.88, text: 'So, the next result post, in one word:' },
    { cue: 'guess-flap', at: 0.3 }, // a split-flap row under the header flips to STILL as Sibyl says it
    { say: 'sibyl', id: 'still', rate: 0.9, gap: 0.45, text: 'Still.' },
    { say: 'eppy', id: 'wrong', rate: 0.88, gap: 0.5, text: "I hope I'm wrong." },
    { sfx: 'laugh', at: 0.15, hold: 0.3 },
```

**Comment.** The staging note above the line `recordline` was:

```js
    // on the word "cee.wtf" the tall bar's question mark flips to CEE; the word "still" stays lit when the line is over
```

**sources.json.** Back into `numbers`:

```json
{
  "segment": "top-chicken",
  "value": "535",
  "method": "the digest's median winning score over the 42 results in the fetched history, 2 Oct to 12 Nov 2026",
  "posts": []
},
{
  "segment": "top-chicken",
  "value": "over eleven times (11.6)",
  "method": "6,186 ÷ 535 = 11.56",
  "posts": [
    "at://did:plc:bty3nc67lteylmmb7hvgxeu5/app.bsky.feed.post/3n2bo6xhuea2e"
  ]
}
```

### Cut 3 back (Top Chicken, the market block)

**Script.** In `segments/top-chicken/script.js`, replace the comment line that begins
`// (trim, cut 3:` with this block. It goes
immediately after the line `smallest`, with one blank line before it:

```js
    // ---- the side game, told only from what its players posted about it
    { cue: 'market-in' }, // a market board, labelled THE SHOW'S SKETCH. Header: CHICKEN BUCKS · NO REAL MONEY. Small credit: topchicken.cee.wtf
    { say: 'eppy', id: 'market', rate: 0.88, text: 'Members also play a prediction market on this game. Chicken bucks. No real money.' },
    { say: 'eppy', id: 'one-bot', rate: 0.9, text: "One player's bot." }, // no weekday is spoken in this block
    { cue: 'card-loss-in' }, // post card: Singularity's Bounty e/CC, @catblanketflower.yuwakisa.com, Sun 15 Nov, 10 likes (the date is on the card, small, as on every card)
    // read aloud exactly: at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2exnpv6us2k
    // on "$60,000" the sketched line drops out through the bottom of the board
    { say: 'sibyl', id: 'loss', rate: 0.9, text: 'my bot lost list $60,000 chicken bucks today 🤣😭', as: 'my bot, lost list, sixty-thousand chicken bucks, to-day 🤣😭' },
    { sfx: 'aww', at: 0.3, hold: 0.85 },   // the next line waits for the room: under it, it was heard as other words
    { say: 'eppy', id: 'later', rate: 0.9, text: 'Three days later, another player posted about that bot.' },
    { cue: 'card-gg-in' }, // post card: I am nameless yet others name me, @7778777.online, Wed 18 Nov, 3 likes, the cut marked
    // read aloud exactly, the cut marked: at://did:plc:jg6o3bgflm3q4y7jpmpvenj3/app.bsky.feed.post/3n2me4phkfsed
    // on "can't win" the sketched line comes back in through the top of the board
    { say: 'sibyl', id: 'gg', rate: 0.88, text: "… so good at gambling now that you can't win even if you play well gg", as: "… so good at gambling now, that you can't win, even if you play well. good-game." },
    // dry: no reaction here, and clean air for the next two lines
    { say: 'eppy', id: 'owner', rate: 0.9, gap: 0.5, text: 'The reply, from the first player:' },
    { cue: 'card-fix-in' }, // post card: Singularity's Bounty e/CC, @catblanketflower.yuwakisa.com, Wed 18 Nov, 1 like, a reply to @7778777.online, the cut marked
    // read aloud exactly, the cut marked: at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2miex33mk27
    // on "cheap" a price tag reading CHEAP swings onto the sketched line: the engine is weak on that word, so the card and the tag carry it too
    { say: 'sibyl', id: 'fix', rate: 0.95, text: 'I tweaked the logic for start-of-day lottery tickets to only buy the cheap ones …', as: 'I tweaked the logic for start-of-day, lottery tickets, to only buy the cheap ones …' },
    { say: 'eppy', id: 'fundamentals', rate: 0.85, gap: 0.5, text: 'Fundamentals.' },
    { sfx: 'laugh', at: 0.15 },
    { cue: 'market-out' },
```

**Header.** The paragraph about respellings was:

```js
// On a read post `as` only respells, word for word: numbers as words, "cee.wtf" by its display
// name, "gg" as good-game (the house table does the same for gm and gn), and commas for breath.
// In house lines "record" is respelled rekkerd, or the engine stresses it as the verb. The
// ellipsis and emoji tokens stay in `as` so the card's words light on time.
```

and these three lines stood between "// The manager is not named on air; the bio is the only source
for it." and "// A handle inside a post that is read aloud":

```js
// The market block names no weekday: that day's result sits in a story the show leaves alone,
// and the market's gambling words must not be heard beside it (screen ruling 8). The cards keep
// their dates, as every card does. No SUN or WED marker on the board; the bracket 3 DAYS stays.
```

**sources.json.** Back into `accounts`:

```json
{
  "handle": "catblanketflower.yuwakisa.com",
  "did": "did:plc:cwa5qtro5bhfz25opigbe6qi",
  "role": "quoted",
  "note": "plays the market; owner of the bot in the story",
  "displayName": "Singularity's Bounty e/CC"
},
{
  "handle": "7778777.online",
  "did": "did:plc:jg6o3bgflm3q4y7jpmpvenj3",
  "role": "quoted",
  "note": "plays the market",
  "displayName": "I am nameless yet others name me"
}
```

Back into `posts`:

```json
{
  "uri": "at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2exnpv6us2k",
  "author": "catblanketflower.yuwakisa.com",
  "displayName": "Singularity's Bounty e/CC",
  "likes": 10,
  "reposts": 0,
  "replies": 2,
  "use": "card",
  "segment": "top-chicken",
  "text": "my bot lost list $60,000 chicken bucks today 🤣😭",
  "note": "A top-level post, Sun 15 Nov. Read aloud exactly (line loss)."
},
{
  "uri": "at://did:plc:jg6o3bgflm3q4y7jpmpvenj3/app.bsky.feed.post/3n2me4phkfsed",
  "author": "7778777.online",
  "displayName": "I am nameless yet others name me",
  "likes": 3,
  "reposts": 0,
  "replies": 1,
  "use": "card",
  "segment": "top-chicken",
  "text": "… so good at gambling now that you can't win even if you play well gg",
  "note": "A top-level post, Wed 18 Nov. Read aloud exactly, cut at the start (line gg): the cut drops the opening word, the owner's handle and \"'s bot is\"; the line before it says whose bot."
},
{
  "uri": "at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2miex33mk27",
  "author": "catblanketflower.yuwakisa.com",
  "displayName": "Singularity's Bounty e/CC",
  "likes": 1,
  "reposts": 0,
  "replies": 1,
  "use": "card",
  "segment": "top-chicken",
  "text": "I tweaked the logic for start-of-day lottery tickets to only buy the cheap ones …",
  "note": "Wed 18 Nov, a reply in the thread under the post above: its parent is that player's own follow-up, one minute after it, which is not shown. Read aloud exactly, cut at the end (line fix): the cut drops the bot's name."
},
{
  "uri": "at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2glpqfbsk2u",
  "author": "catblanketflower.yuwakisa.com",
  "displayName": "Singularity's Bounty e/CC",
  "likes": 3,
  "reposts": 1,
  "replies": 1,
  "use": "reference",
  "segment": "top-chicken",
  "note": "Not shown. The source of \"prediction market\", \"chicken bucks\", \"no real money\" and the market's address."
}
```

Back into `links`:

```json
{
  "url": "https://topchicken.cee.wtf",
  "use": "credit",
  "segment": "top-chicken"
}
```

Back into `numbers`:

```json
{
  "segment": "top-chicken",
  "value": "three days",
  "method": "Sun 15 Nov to Wed 18 Nov",
  "posts": [
    "at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2exnpv6us2k",
    "at://did:plc:jg6o3bgflm3q4y7jpmpvenj3/app.bsky.feed.post/3n2me4phkfsed"
  ]
}
```

### Cut 4 back (chess)

**Script.** In `segments/made-mobius-chess-ringmate/script.js`, the top of the beats was:

```js
    // ---- 1. the thing. It exists and can be played: said once, plainly, at the top.
    { cue: 'board-in' },
    { say: 'larry', id: 'open', text: 'One more game before we go.' },
    { say: 'larry', id: 'day', text: 'A member of the cluster built it. It took about a day.' },
    { say: 'larry', id: 'one-post', text: 'It began as one post.' },
```

and the close, from the comment over section 6 down to the line before the sting, was (the sting
and the long applause are still there, after it):

```js
    // ---- 6. the close. Sibyl, who keeps the procedure, takes the resignation as given.
    { cue: 'sign-off', at: 0 },
    { say: 'sibyl', id: 'accepted', text: 'The resignation is accepted.', rate: 0.95, vol: 1.15, gap: 0.45 },
    { say: 'sibyl', id: 'i-will', text: 'I will say good night.', rate: 0.95, gap: 0.35 },
    { say: 'larry', id: 'the-game', text: 'I meant the game.', rate: 0.98, gap: 0.3 },
    { say: 'sibyl', id: 'good-night', text: 'Good night.', rate: 0.92, vol: 1.1, gap: 0.5 },
```

**Header.** The cue list ended with these two entries, and the "Assembly" paragraph was:

```js
//   flag-down    on "resign": Larry's lamps read LIKE, REPOST, RESIGN, and his flag tips over
//   sign-off     the close: Sibyl turns from the board to the camera. The board stays as it was left
//
// Assembly (episode 002-2026-w47). This is the last segment, and it carries the episode's close:
// four short lines after the button, at the same table, and then the credits. There is no separate
// close segment. The close is about the resignation and nothing else; it does not look back at
// the night. The music block and its cue were renamed `lap` and `flag-off`.
```

**sources.json.** Back into `numbers`:

```json
{
  "segment": "made-mobius-chess-ringmate",
  "line": "day",
  "said": "It took about a day.",
  "value": "25 h 26 min",
  "method": "From the maker's first post about the idea (2026-11-17T19:03:31Z, at://did:plc:r5bee2hexwjtmhkfmfu2tphx/app.bsky.feed.post/3n2jqaikml22p) to the maker's post of the playable address (2026-11-18T20:29:41Z, at://did:plc:r5bee2hexwjtmhkfmfu2tphx/app.bsky.feed.post/3n2mfjip65k2g). About a project, not a person; said once, plainly."
}
```

### Cut 5 back (interview)

**Script.** In `segments/interview-yonderdavid/script.js`, replace the comment line that begins
`// ---- the end (trim, cut 5:`, after the big laugh, with this block:

```js

    // ---- 4 · the koto (Tue 17 Nov, under the polyhedra video), and the request that followed
    { cue: 'polyhedra' },
    { say: 'larry', id: 'two-days', text: 'Two days later: a video of instruments made from polyhedra.', as: 'Two days later: a video of instruments made from polly-hee-druh.', rate: 1.04, gap: 0.5 },
    { cue: 'koto-pluck', at: 0.2 },
    { sfx: 'tick-1', at: 0.2, hold: 1 },
    { wait: 0.3 },
    { say: 'larry', id: 'ask-koto', text: 'A member asked about the koto: an existing physical model, or a new thing?', as: 'A member asked about the koh-toe: an existing physical model, or a new thing?', rate: 1.03, gap: 0 },
    { say: 'david', id: 'new', text: 'New. Second draft, mostly vibed.', as: 'Nee-oo. Second draft, most-lee vibed.', rate: 1.07, gap: 0.5 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jnh3e6hc2t · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jmvm74dc2r
    // dry: no reaction sound
    { cue: 'dry' },
    { wait: 0.8 },
    { say: 'larry', id: 'ask-details', text: 'The same member asked: can you share any details?', rate: 1.03, gap: 0 },
    { say: 'david', id: 'free', text: 'Koto information wants to be free. …', as: 'Koh-toe information, wants to be free. …', gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jq4x7qys2t · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jnnda4es2y
    { cue: 'plug', at: 0.3 },
    { say: 'larry', id: 'plug-line', text: 'Finally, something to plug.', gap: 0.45 },
    { say: 'larry', id: 'button', text: 'Out now, wherever code is pasted.', rate: 0.92, gap: 0.25 },
    { sfx: 'sting', at: 0.1, hold: 0 },
    { sfx: 'applause', at: 0.2, hold: 0.3 },
```

**Header.** Lines 4 to 6 of the header were:

```js
// before it asks what the post it replied to asked. Four occasions, in the order they happened:
// Sat 14 Nov (the cat), Sun 15 Nov (the failures), Sun 15 Nov (the same thread: the question
// about covers), Tue 17 Nov (the koto, and the request that followed it).
```

**sources.json.** Back into `posts`:

```json
{
  "uri": "at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jnh3e6hc2t",
  "author": "yonderdavid.bsky.social",
  "displayName": "David",
  "date": "2026-11-17T18:13:31.290Z",
  "likes": 1,
  "reposts": 0,
  "replies": 1,
  "text": "New. Second draft, mostly vibed.",
  "use": "line",
  "segment": "interview-yonderdavid",
  "why": "Answer 4, spoken whole with its card up."
},
{
  "uri": "at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jq4x7qys2t",
  "author": "yonderdavid.bsky.social",
  "displayName": "David",
  "date": "2026-11-17T19:01:32.632Z",
  "likes": 2,
  "reposts": 0,
  "replies": 1,
  "text": "Koto information wants to be free. \npastebin.com/cxLPkJby",
  "use": "line",
  "segment": "interview-yonderdavid",
  "why": "Answer 5, spoken with its card up. The sentence is spoken; the link that follows it is cut from the speech (marked) and shown as the plug."
},
{
  "uri": "at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jmvm74dc2r",
  "author": "shimmermathlabs.com",
  "displayName": "Amber 🌸",
  "date": "2026-11-17T18:03:44.970Z",
  "likes": 2,
  "reposts": 0,
  "replies": 1,
  "text": "love the sound of the kotos!\nis this an existing physical model or a new thing?",
  "use": "reference",
  "segment": "interview-yonderdavid",
  "why": "Context only, not shown or voiced: the question answer 4 replied to. Larry says a member asked, and asks it in his own words."
},
{
  "uri": "at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jnnda4es2y",
  "author": "shimmermathlabs.com",
  "displayName": "Amber 🌸",
  "date": "2026-11-17T18:17:00.872Z",
  "likes": 1,
  "reposts": 0,
  "replies": 1,
  "text": "any details or anything you can share would be appreciated, i want more kotos",
  "use": "reference",
  "segment": "interview-yonderdavid",
  "why": "Context only, not shown or voiced: the request answer 5 replied to. Larry says the same member asked, and asks it in his own words."
}
```

Back into `lines`:

```json
{
  "segment": "interview-yonderdavid",
  "line": "new",
  "kind": "verbatim",
  "post": "at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jnh3e6hc2t",
  "context": "at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jmvm74dc2r",
  "contextText": "love the sound of the kotos!\nis this an existing physical model or a new thing?",
  "setup": {
    "line": "ask-koto",
    "who": "larry",
    "text": "A member asked about the koto: an existing physical model, or a new thing?"
  },
  "note": "The setup is attributed to a member and keeps the question's own terms (\"an existing physical model\", \"a new thing\")."
},
{
  "segment": "interview-yonderdavid",
  "line": "free",
  "kind": "verbatim",
  "post": "at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jq4x7qys2t",
  "context": "at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jnnda4es2y",
  "contextText": "any details or anything you can share would be appreciated, i want more kotos",
  "setup": {
    "line": "ask-details",
    "who": "larry",
    "text": "The same member asked: can you share any details?"
  },
  "note": "The request was a reply to answer 4, from the same member, so these two exchanges really followed one another. The link that ends the post is cut from the speech and shown on screen."
}
```

Back into `links`:

```json
{
  "url": "https://pastebin.com/cxLPkJby",
  "use": "card",
  "segment": "interview-yonderdavid",
  "why": "The link that ends answer 5: shown on its card and on the plug card."
}
```

And two account notes go back to what they were. For `yonderdavid.bsky.social`, "the puppet speaks
three of David's posts" goes back to "the puppet speaks five of David's posts". For
`shimmermathlabs.com`, this sentence goes back on the end of the note, after "The puppet speaks in
the coffee segment only.":

```text
In the interview two of this account's questions are the recorded occasions of David's answers; there it is not named, shown or voiced (Larry says a member asked).
```
