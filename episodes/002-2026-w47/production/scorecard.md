# Scorecard: 002-2026-w47, as it aired

Final review of the episode as it aired, written 22 November 2026. The episode aired on
21 November 2026 at 22:55 UTC as a video post from the show's Bluesky account, after the owner had
watched and approved the whole cut (constitution, Article 5). Nine segments, 9:39.6, 987 spoken
words. This card is therefore a record and not a gate. It is scored as it would have been before
air. The reviewer wrote none of the episode, staged none of it and wrote none of its briefs.

A reviewer's file: for reviewers, auditors and the project manager. Writers, researchers, sound
editors and builders do not read it.

**The earlier scorecard under this name** (20 November 2026) was of a six-segment draft, 8:25,
that never aired. Its verdict was send back to assembly, on two lines of its last segment: a
guest's "I repost" heard as "I report" (A16), and a line split at assembly that ended a sentence
on a stock phrase of the show's (A13). Part B was 21 of 26. Neither line is a fault in what aired:
the second was cut, and the first is now heard as written in three takes of four. What that draft
held and this cut does not is in the ledger (`docs/ledger/002-2026-w47.md`, "What did not air").

## Verdict

**Send back, by the card. It cannot be acted on, and the owner's approval stands.** One gate does
not pass. Part B is **19 of 26**, with no zero.

- **A13, repetition, on two counts.**
  1. *The song's ending, kept on purpose.* Both gate reviewers judged the ending of the song a
     repeat of how the first episode's song ended, and I agree with them. The gate worked: the
     writer wrote another ending, and both reviewers passed it. The owner, with both verdicts in
     hand, kept the original: "i like the song's interaction with the host." That is the owner's
     to decide and it is recorded as deliberate. It is not a miss by anyone. It is still a repeat
     on the record, which is what the next gate needs to know.
  2. *Two scripts that never met the script gate.* The Riemann segment and the making-of had two
     reviewers' verdicts on their ideas and none on their scripts as aired. My own verdict on
     both is fresh (ruling 1), which is one verdict where the gate asks for two.

Everything else passes. Three rows pass on rulings the owner made during this episode, and they
are set out under "Rulings". Without the first count, which no stage could have fixed, the card
would have sent two scripts to the repetition gate and then approved.

## How this was judged, and what could not be checked

- Read: the nine scripts and their staging code, `cast.js`, `sources.json` (17 line records,
  46 post records for 44 posts, 16 accounts), the owner's notes, the trim and assembly papers, the
  commission's history and audits, both frame audits, every repetition verdict, the consent check
  with its two addenda, both live source checks, the close-out audit, the fit reports, and the
  ledger with the first episode's record.
- Ran: `npm run check -- 002-2026-w47` (9 passed, 0 failed) and `npm run verify` (`ok
  002-2026-w47`; 2 published, 1 draft, 0 problems). Timings are from each segment's `cues.json`.
- The records moved while this review was being written: the close-out audit's corrections, the
  build and the commit of the episode (`a298ef9`) all landed on 22 November. The card describes
  the state after them.
- **I have not watched or heard it.** Rows A16, B8 and B9 are scored from the transcription (every
  heard text of every line, read in full: `fit.json` for six segments, and the drafts' `fit.json`
  for the Riemann segment, the making-of and the song) and from the mix settings in the cues. The
  owner has watched and listened to the whole cut.
- **I looked at no frame myself.** Shooting frames writes files this review may not write. Rows
  A2, A8, A15 and B4 rest on the auditors' frames (`review/stage/cut-2-r1.json`,
  `cut-3-r1.json`, and the 289 frames of `audit-posting-cut-captions.md`) and on the staging code.
  Those two audits asked for six changes they marked as required. The three I could check without
  frames were made: the guest's label is up for each of his answers in the interview, the
  simulator's tile in the song is labelled STUDIO SKETCH, and the news segment's source records
  are complete. I found no second-round frame audit that confirms the other three on frames: the
  clipped row and the sketch tag in the plotter's room shot, and the size of the tile credits in
  the song's two wide shots. The staging files were changed after the audits, and the owner's
  watch came after that.
- Not scored, as the brief says: the larger captions and the softening of the video that was
  posted. They changed no word and no staging decision.

## Step 0: is everything in it interesting?

| segment | retell, in one sentence | turn or feeling, in five words |
|---|---|---|
| `made-pen-plotter-replies` (One Pen; carries the open) | A pen plotter wrote out the replies to one post, and when one reply is a typed meow the announcer intones it letter by letter while the pen writes it. | A meow, read with ceremony |
| `bluesky-account` (The Handle) | Larry finally has a Bluesky account, reads the handle twice, and his name is not in it. | His own handle omits him |
| `interview-yonderdavid` (The Interview: David) | Asked how Weird Al gets away with it, a puppet labelled PARODY answers that parody is transformative, and the camera finds the label. | His own label answers back |
| `riemann-breaking-news` (Breaking News) | The cluster reacts to a claimed proof of the Riemann hypothesis, and one member's proof about zeta at 1 fits in a single post and buries the anchor. | Post-sized proof fills the studio |
| `making-of-inward` (The Making Of, All the Way Down) | Larry starts to explain how the show is made and the camera goes down his throat, through smaller and smaller Larrys, to the community at the bottom. | At the bottom: the cluster |
| `top-chicken` (Top Chicken) | Saturday's winner won with 201 likes, which is 5,985 short of a record the same account holds. | The winner trails the winner |
| `made-polyhedral-coffee-simulator` (Larry Plays a Game) | Larry sits down to win a game that is only having a coffee, and a member's mug turns out to carry a bootleg icosahedron. | The emptied mug gets refilled |
| `made-mobius-chess-ringmate` (Chess for Three) | Larry takes one side of a chess board on a Möbius strip and finds that his side is every side. | Larry's side is every side |
| `music-alt` (Best We Can Doo-Wop; carries the close) | A member posted a whole simulator under "best i can do", so the band's best is "doo" and "wop", and when the host has only one wrong note the song changes key to make it right. | The key moves to him |

Inside the episode: one runner, the phrase "best i can do" (performed in the coffee segment,
returned as its button, then the song's premise and hook); and four callbacks (the handle, shown
at 0:51 and typed at 4:52; the kazoo, in the interview at 1:38 and in the making-of at 3:49 and
4:13; "polyhedron week", said by a guest at 6:47 and toasted at 9:29; gold as Larry's colour,
absent from the handle and covering the board). Larry making himself small is the button or the
turn of three segments. Nothing lacks a retell or a turn, and nothing is cut at this step.

## Part A: gates

| # | result | evidence |
|---|---|---|
| A1 | pass | The opt-out list is empty, and the live check of 21 November at 22:48 UTC, seven minutes before the post, found every cited post unchanged and read the profile, pinned post and newest posts of all 17 accounts for opt-out wording, with one thing for a person: a display name had changed (ruling 3); the news segment's accounts had no fuller consent check until after air, and it found all of them clear (ruling 8). |
| A2 | pass | The frame audits found every card exact against `sources.json` and the kept research (for example the chart post: 23 replies, 144 reposts, 889 likes, 20 Nov 2026), with cuts marked by an ellipsis; one display name is the one the account had when it posted and not the one it had at air, by the owner's ruling (ruling 3). |
| A3 | pass | All 17 performed lines were set beside the prompt recorded in `sources.json` and each staged setup is the same kind of prompt with the same job (for example `larry-ask`, "what is a zeta function?", for "ok I'll bite, what's a zeta function"), and no house line sums up what a guest thinks. |
| A4 | pass | Seventeen puppet lines from 14 posts, each tagged `// verbatim: … · context: …` and identical to its post, cuts marked; the one post said in four lines is said in its own order, with the two pieces cut from the voice shown exactly as posted. |
| A5 | pass | Every number traces to a post, the digest or the production fact sheet (88 replies; 201, 6,186, 5,985 and 2,648 from the result post; 20,825 posts and 248 accounts from the last run), the news is given in one sentence that claims only an announcement, and no guess is left in the episode. |
| A6 | pass | No R10 subject in any script, card, label or heard line: the two market jokes are members' own posts on their own cards with no house line about a price, and the winning post is read with no comment. |
| A7 | pass | Larry is the butt throughout (left out of his handle at 0:54, buried at 3:27, refilled at 6:34, resigning at 8:16); the 282-follower and 75-follower accounts are each the hero of one moment, and the account called on in the news segment is read exactly, with no remark, and its claim is then proved for it. |
| A8 | pass | PUPPET · PARODY is on all eight guest chyrons from each puppet's first word, the disclaimer runs from the first guest (0:23), and the end roll, shot from 0 to 60 s and read by the auditor, names the eight accounts once each with their handles and says every voice is synthesized by CHIMERA; the plotter, the simulator, the board, the proof, the synth and the song's four tiles are credited on screen. |
| A9 | pass | There is no invented account, handle or address in the episode: `@latecluster.simcluster.tv` is the show's own real account, and every other handle and address is recorded in `sources.json`. |
| A10 | pass | Only Saturday's winner is named (CEE, `@cee.wtf`, 5:30); two other winning scores stand on crowns with no name and no day (5:58), and the guess was cut. |
| A11 | pass | `npm run check -- 002-2026-w47`, run at this review, passes for all nine segments, and `npm run verify` reports `ok 002-2026-w47` for the build committed with the episode in `a298ef9`; that build was made at the close-out, after the video had been posted (ruling 8). |
| A12 | pass | `git status` shows `00-constitution.md` and `09-real-people.md` unmodified, and this review edited neither. |
| A13 | **fail** | Seven of the nine scripts have two reviewers' verdicts and the two commissioned scripts have them on their ideas only; the song's ending was judged a repeat by both (segment shape, with its lighting) and was kept by the owner on purpose; no item is turned and nothing refers to an earlier episode (ruling 1). |
| A14 | pass | None of the four accounts whose puppets spoke in the first episode speaks in this one, 12 of the 14 accounts on screen are new, and the tool's two warnings are answered in ruling 4. |
| A15 | pass | Every card is performed or read aloud and what is unspoken is a glance or a credit; the one card that stays whole while it is read with two cuts (2:54 to 3:05) is being read for all of that time. |
| A16 | pass | The heard text of every line was read and nothing kept is crude, alarming or out of bounds; the lines heard differently about a real person, three names among them, are listed in the fit reports with their exact words on screen, which is the pass the owner's ruling of 21 November sets (ruling 2). |

## Part B: quality

| # | score | evidence |
|---|---|---|
| B1 | 2 | It can be told: the one where the camera goes down Larry's throat to find the cluster at the bottom, and the band then makes a song out of the little he has; the order is argued place by place in `assembly-2.md`, and the goodnight (9:29) does not say what the night was about. |
| B2 | 1 | Most segments have two jokes that land on the page, but the account bit is one joke by design, Top Chicken after its trims has two mild ones ("The winner trails the winner.", "Same title."), and the best single joke, the held label, still lands at 2:00 of 9:40. |
| B3 | 2 | Every joke rests on a real post, thing or number (a typed meow; 201 against 6,186; a proof in one post; a mug with squares in the back), and six of the nine segments are about something a member made; the Riemann posts are a day past the window and the making-of's facts are the show's own, both by the owner's commission. |
| B4 | 2 | Pictures land on their words: the handle on "handle" (0:51), a drawn kazoo on "kazoo" (1:38), the news banner dropping on "chart" (2:18), the sketch turning on "squares" (6:59), the flag tipping on "resign" (8:17), a card landing on Larry's one note (9:12). |
| B5 | 2 | Each setup is carried by one spoken line and a picture ("The score is kept by a bot."; "what is a zeta function?"; the gauge that names each level of the making-of as it is said); the two market jokes are the only ones that lean on knowing the day's news. |
| B6 | 1 | Affectionate throughout, and the member's own sweet line is short and read aloud ("I expected nothing less ❤️", 0:44); but the episode's sincere moment is the invitation in the making-of, 27 seconds in the show's own words (4:38 to 5:05), and the song then sings its hook at the viewer (9:19). |
| B7 | 1 | The interview is still heads and cards: nothing its guest made is shown or heard working, because nobody at the studio has seen or heard the videos; the other eight pieces give something to watch happen, down to the underline that reads the handle twice. |
| B8 | 1 | Scored from the transcription: no punchline is lost on screen, but about a dozen lines are soft and rest on caption, card or gauge ("I'm a mouth." heard "mouse" in every take; "review" never heard as itself; most of the proof), and three names are not transcribed as themselves in the voice that says them (ruling 2). |
| B9 | 2 | Scored from the mix settings: one reaction a joke, two big laughs (2:00 and 7:11), no rimshot, every reaction after its line, and the whole making-of (1:43), the winning post and the held label left dry. |
| B10 | 1 | 9:39.6 is over nine minutes and twenty seconds under the ceiling; adjacent segments differ, every segment ends on a button, the open names the show and the host by 0:05 and reaches the material at 0:06, and the close ends on the song and two lines. |
| B11 | 2 | The interview has three exchanges on three occasions and shows how one maker answers; Top Chicken has a named result with its post read, the record, the gap, the day's numbers and two more scores, at 47 s the floor of what the format asks; the song's form is its joke, its theme is this window's and its genre is new. |
| B12 | 1 | Run on screen in two of the three segments it covers, at 13.15 s (6:22) and 11.87 s (7:58) by the cues, with no word and no crowd sound; the third stretch was cut in the owner's trim, so by its own measure it was partly run, and the measure holds for the two that aired (ruling 5). |
| B13 | 1 | Fourteen accounts, twelve of them new, nine different pictures and nobody in more than two segments; but the show itself is the subject of three pieces (the account bit, the making-of and the last third of the song, about 2:15 of 9:40), and one unseen account's questions set up five of the seventeen puppet lines. |

**Part B total: 19 of 26.** No zero in B1, B2, B7, B8, B11 or B12.

## Rulings

**1. Repetition (A13).** The record of what the show has done stays in the ledger. Verdicts here
are the final reviewer's, on what the finished episode shows.

| item | verdict | why |
|---|---|---|
| the song's ending, from the bulbs dimming (9:07) to the last chord (9:23) | **repeat**; kept by the owner | Kind: segment shape, with its lighting. Both gate reviewers gave this verdict (`review/song-alt-1.json`, `song-alt-2.json`) and I agree: one sentence describes how both aired songs end without naming their subjects. The replacement ending was judged fresh by both and was not used. The owner's choice, made with the verdicts in hand (`owner-notes.md`, "The owner's choices for the song"). |
| the song up to the bridge | fresh, two reviewers | Genre, structural joke and message are new. Half its verse goes back over things the episode has already shown, with a picture each; the reviewers weighed that and passed it. |
| `riemann-breaking-news`, the script | fresh, one verdict (mine) | A news frame of fourteen seconds that drops out of the picture, members' own posts performed, and a proof staged until it buries the host: no aired segment has this premise, turn or build. The first episode dressed a member's project as a broadcast and put house patter in its maker's mouth; this has neither. |
| `making-of-inward`, the script | fresh, one verdict (mine) | Nothing aired has this premise, shape or picture. It rests on the same fact about the host that an aired line once named, and it has the show's own process as its subject, which is here by the owner's commission. It names, shows and needs no earlier episode. |
| the open as aired: the pen writes the title, which becomes the logo | fresh, one verdict (mine) | New since the script gate. No aired open has a member's machine, as the studio's sketch, write the title. |
| `bluesky-account`; the join "One more game before the song."; the two lines of goodnight | fresh, two reviewers each | `review/repetition-assembly-2-*.json`, `repetition-goodnight-*.json`. |
| the running order | not a repeat | It opens differently. It closes as the first episode did, on the song and then the host's goodnight; that is the owner's choice and the owner's ruling that a goodnight is frame. |
| the word "built" | counted, as a gate reviewer asked | Sung twice in the lead as the plain verb of a list and shown as lyrics; once inside a member's own post; "Builders" twice in the making-of as a job. It never ends a sentence, and no character, count or reaction is attached to it. |
| a time from asking to having | none | None is said or shown anywhere in what aired. |
| turned items | none | The draft's turned close was cut. |

**2. Heard text and intelligibility (A16, B8).** The owner ruled on 21 November 2026 that best
effort on pronunciation is sufficient, because the subtitles carry the line. The voices chapter
and the workflow say so; the scorecard's rows still said that a name heard as another word fails.
I have brought the rows into line (`dna-amendments.md`) and scored against the ruling. By the row
as it was printed, A16 would fail on these, and B8 would be 0:

- three names not transcribed as themselves in the voice that says them: "cee" inside the read
  record line (5:49; the line before it, "Saturday's winner: cee.", is heard as the name),
  "davidcrespo" (2:16) and "moultano" (2:28) in Larry's voice, and "Samantha" sung in the song
  (8:54; spoken three times in the plotter it is heard as itself every time);
- "I like! I repost!" (7:45) heard as "I report" in one take of four, and as written in three;
- the handle in the member's call (2:43), the chess maker's one line (7:25) and most of the
  proof's four lines (3:05 to 3:26), heard as harmless nonsense.

Each is listed in a fit report under "heard differently, caption exact", and each has its card,
chyron, lyric or caption on screen. Nothing kept was heard as crude, alarming or out of bounds;
the sound editors dropped about ten spellings and settings for what they were heard as (a crude
word, a lost or gained negation, a changed figure). One word the owner ruled on by ear: the
syllable "wop", sung alone twice and shown alone on a card, is also a slur in dictionaries; it
was never transcribed as the word, and the owner's ruling is that it stays.

**3. The display name (A2).** The live check found that the chess maker's display name had
changed since the scrape. The owner ruled that the approved cut is not edited for it: the chyron,
the cards and the credits show the name the account had when it posted. The handle is unchanged.

**4. People (A14, B13).**

- *The maker of the plotter* spoke in the first episode. Here three of her posts are read aloud by
  house voices, her name is said three times and sung once, and she is credited in two segments.
  She is never voiced. It is as close as a rested account should come.
- *The tool's two warnings.* `@samantha.wiki` and `@shimmermathlabs.com` have now been on screen in
  both aired episodes. Both were let stand because the things were theirs and nobody else's: the
  plotter; the mug thread and the proof. The second speaks seven of the seventeen puppet lines.
  Both should rest in the next episode.
- *The account behind the questions* spoke in the first episode. It is never named, shown or
  voiced, and its questions are the staged setups of five puppet lines in three segments, and of
  the post the song reads. Within the rule. The episode leans on one familiar account more than
  the screen shows.
- *A bot and its operator.* The owner ruled that a bot's post counts toward the member who runs it
  only where that member appears. The operator is not named in Top Chicken, so that member is in
  two segments, not three.
- Six accounts are in two segments each. Nobody is in three.

**5. The experiment (B12).** *Was it run:* partly. Three stretches were built and two aired; the
plotter's was cut by the owner ("too much time was given to the plotter, 300/300 is not that
interesting"), and its longest gap without a word is now 2.5 s. *Does the measure hold:* yes for
the two that aired. Each has an interval of more than ten seconds in its `cues.json` with no
spoken or sung line and no crowd sound, and a cold viewer named the writer's turn for each
(`review/cold-viewers.md`). The limits are the ones the first review gave: the viewers were a
small model, on stills, with no sound. Since then one person has watched cold, the owner, who
kept the two stretches the viewers could name and cut the one they could not. That is enough to
write down what the two had in common, and I have (`06-jokes.md`). What the audience made of
them is for the next window's research.

**6. Three pieces about the show itself (B13).** The joke chapter allows one. The commission
lifted the limit for the making-of, and the owner asked for the account bit as "a second thing
about the show itself". With the held label that is three, and the song's last third makes its
subject the host. Each is the owner's choice. The cost is in B13 and B6, not in a gate.

**7. Rulings from the first review that still stand.** The hold on the guest's label after his
real line about parody (the owner has since read it and called the joke good); Sibyl saying a
winner's display name where the post she reads has the handle; two other days' scores on crowns
with no names; a member's remark made as the host's own ("My first thought: it should be a
game.").

**8. What was closed after air (A1, A11).** Neither changes what aired, and both rows pass on the
state of the records now. They are here because a card written at the moment of posting would
have failed both.

- *Consent for the news segment.* The consent check was made from the scrape of 19 November. The
  news segment was made on 21 November from posts of 20 November, and its three accounts on
  screen, with the unseen asker, had no row in it. Before air they were covered by the live
  source check of 22:48 UTC, which reads the profile, the pinned post and the newest posts for
  opt-out wording and cannot judge a hard week. The auditor's addendum of 22 November, written
  after air, read each account's week and found all four clear.
- *The build.* What was posted was the video cut. No web build of the nine segments existed
  then; the preview was still the six-segment draft, and `episode.json` said draft, with the
  wrong date. The build, the corrected `episode.json` and the corrected source records were
  committed together at the close-out.

## What would have fixed it, and where

- **A13, at select.** The two commissioned scripts go to the two repetition reviewers like any
  selected script. The commission ran the gate on ideas and stopped there, and both scripts
  changed a great deal after that. For the song's ending there is nothing to fix: the gate's fix
  was made and the owner chose the original.
- **B7, at research.** Somebody who can open the guest's videos describes them, so the interview
  can show or sound what it is about.
- **B8, at draft and fit.** Keep handles out of house voices where a display name can be said,
  and keep a segment's key word off the sounds the engine cannot make: "review" is the making-of's
  spine and is never heard.
- **B2, B10 and B13, at select.** Nine pieces in under ten minutes left Top Chicken at 47 seconds
  and put the best joke at 2:00.

## For the next episode's run

- **Eight accounts may not speak:** the eight whose puppets spoke here (the ledger and the tracker
  have them). Two more have been on screen in both aired episodes and should rest.
- **The song.** Doo-wop is used. Two aired songs of two now end by stopping for the host and taking
  him in, change a word in the last hook, and go back over earlier segments in the verse. A third
  song that does any of these is a signature. Two aired episodes of two end on the song and then
  the goodnight; a third makes it a home position.
- **The goodnight.** "Happy <the week's name> week." and "Good night, everybody." are spent. A new
  noun in either is the same line.
- **The top of the show.** The announcer has named the host in the first seconds of both aired
  episodes.
- **The host.** Three segments here turn on Larry being small or left out. That is the character;
  the particular lines are done, and a night of it is one joke told three ways.
- **The invitation is on the record.** The show has told the cluster on air that it looks where
  they point the account's handle, and promised nothing else. The next run has to look.
- **The experiment's stagings are done; the technique is craft now.** One wordless punch an
  episode, where the thing visibly does something.
- **A segment made outside a run still owes the run's checks.** The two commissioned segments
  joined after the script gate and after the consent check, and missed both (rulings 1 and 8).
