# Scorecard: 003-holiday-2026, "The Walk Home"

Final review of the holiday special as staged, written 27 November 2026. One segment, `walk`:
249.7 s (4:09.7) to black, then plain credits of about 19 s. 397 spoken words (363 of them
Larry's) and 11 sung syllables; someone is speaking for 136 of the 250 seconds. It is a draft and
has not aired. The reviewer wrote none of it, staged none of it and wrote none of its briefs.

A reviewer's file: for reviewers, auditors, the project manager and the owner. Writers,
researchers, sound editors and builders do not read it.

## Verdict

**Approve: it goes to the owner.** Step 0 is clean, every gate passes, and Part B is **19 of
24**, with B11 left out as not applicable and no zero anywhere. Approval by a reviewer is not the
owner's review (constitution, Article 5): nobody has heard this mix or watched it move, and gates
A3, A6 and A16 pass on things only the owner can confirm. They are set out under "For the owner".

The rows at 1 are B2 (whether it moves rests on a voice nobody has heard, with its central
sentence carried by the caption), B7 (two long single shots of a head talking), B8 (about half
the lines and all three names are heard as something else, each carried by its caption), B9 (two
scripted sounds were not achieved and nobody has heard the footsteps) and B12 (the experiment's
measure needs people watching with sound). "About half" in B8 is the fit report's own list: 38 of
the 59 spoken lines, of which about twenty-five lose a word that matters.

## How this was judged, and what could not be checked

- **Read:** the owner's notes, `special.md`, `experiment.md`; `segments/walk/script.js`,
  `notes.json` and `cues.json`; the fit report (`fit/sound-walk.md`), every heard text in it;
  the builders' plan, costume and integration notes; the stage auditor's two rounds; the cold
  viewers' answers; `select.md`, `assembly.md`, both select reviews, both final reviews, both
  audits, the repetition record; the three research cards the script uses; the whole bible; the
  ledger, with both aired records, the continuity file and the register.
- **Looked at:** all 165 audit frames at 640 by 360 and the 12 credits frames, and 14 frames I
  shot into scratch to fill gaps in the audit set: 22.1 (black between the studio and the
  street), 100.9 (the coin in the air), 212.6 (the look), 214.0 and 214.9 (the second chair, the
  place setting), 219.2 to 220.1 (the bowl), and 244.2 to 249.0 (the nod, the hold, the fade).
  The shoot printed no warning.
- **Ran:** `npm run check -- 003-holiday-2026` (walk passes; 1 passed, 0 failed) and
  `npm run verify` (`ok 001-pilot`, `ok 002-2026-w47`; 2 published, 2 drafts, 0 problems). I
  measured levels in 21 windows of `public/audio/walk.mp3` with ffmpeg; that is a meter, not ears.
- **Did not:** hear it, build it, or watch it move. Rows **A16, B8 and B9** are scored from the
  fit report's heard text and from the cue times and measured levels. **B2 and B12** rest partly
  on the same. Rows A8, A15 and B4 rest on frames I looked at myself, with the auditor's two
  rounds beside them.
- **Papers that disagree with the render,** none of them a fault in the episode:
  - The fit report says that none of the lines still heard differently is a real person's words
    except the owner's. The quotation is (`tarfon-1`, `tarfon-2`). It is listed all the same,
    first, in the report's own table "For the owner's ears first".
  - The fit report says no sound starts under the owner's lines. By the cues one murmur of the
    room's bed starts at 239.01, on the word "close" (238.96 to 239.61), and one at 243.56,
    0.1 s before "Goodnight." ends. Both are the bed coming back in, at volume 0.4.
  - `notes.json` still calls the busker's voice a stand-in for Al. He has his own cast entry.
  - The final reviewers counted about four seconds from Dee's laugh to the owner's table line.
    In the render it is 7.9 s (225.54 to 233.44).
  - The final audit has one round, whose verdict was "changes" on the word count alone. The
    project manager answered it in `special.md` ("Length"). There is no second round on file.
  - The cold viewers saw frames shot before the round-two staging changes, and were not asked
    again afterwards.

## How the card is applied to a special

The owner set the form: one piece of about four minutes, no posts, no guests, no window, no
standing segments, sincerity as the piece, no audience. The card was written for a weekly
episode, so:

- A gate with no real account or post to judge says `nothing to judge`, and passes.
- A Part B row that asks for something the owner set aside says so, and says what was scored in
  its place.
- B11 is `not applicable` and is left out of the total, which is therefore out of 24.
- The approval rule asks for 18 of 26, which is 69 %. Of 24 that is 16.6, so 17. This card
  clears 17, and it also clears the unadjusted 18.

## Step 0: is everything in it interesting?

The episode is the one segment `walk`. Its parts, each with a retell and a turn or a feeling:

| part | cues | retell | turn or feeling |
|---|---|---|---|
| the whole (`walk`) | 0 to 249.7 | The one where there's no show, so Larry walks you home through the cold and then can't leave you standing outside his own door | Rattled, walked home, let in |
| the studio | `dark-studio` to `out-the-door` | The studio is switched off; Larry, in an overcoat, admits he came in for a paycheck they would have mailed, because he likes the walk, and asks you along | The paycheck was a pretext |
| the street | `street-start` to `answers-ahead` | He asks how you have been, agrees with an answer nobody hears, and says he has no joke for it: he looked | No joke. He looked |
| the restaurant, and the cook (first idea) | `pass-restaurant` to `watch-the-cook` | He always stops at a full restaurant to watch the one cook in back, tells an old story about a cook who slows down at the hard part, and the cook in the hatch slows on the word | The cook slows on cue |
| the busker | `walk-on` to `tune-again` | A busker sings to an empty pavement, stops one note short, gets a coin and a thank-you, and starts over behind us | He had started anyway |
| the crossing, and the rabbi (second idea) | `crossing-red` to `walk-sign` | At a red light on an empty road you ask what if none of it gets put right; he does not know, borrows a rabbi's sentence, and the light stays red | The street does not answer |
| the snow and the last block | `cross` to `glance` | It starts to snow, and he says, looking straight ahead, that he usually walks this block alone | Glad of company, unsaid |
| his door, and the couplet (third idea) | `apartment-door` to `let-in` | You stay on the pavement; he cannot say come up without an old rule about not eating while a guest stands outside; someone upstairs opens the door first | The book is his excuse |
| the table | `table-wide` to `the-meal` | Nobody has started; six friends look at you, Al says "Chair.", you are served first over Larry's objection, and then nobody looks at you | Ignored, which is the welcome |
| the goodnight | `goodnight` to the end | He turns from the table, says the owner's three lines, nods and goes back to his friends | He means it. Stay warm |

Every part has both. **The cut test** finds one line, not a part: `ruling-stands` ("And the
ruling stands!", 223.55), a fourth beat on the rule after `still-the-rule` has buttoned it. Both
final reviewers found the same line, the assembly offers it to the owner as an either-or, and it
stands as written on the project manager's reading of "go ahead". Nothing else would not be
missed. `never-ends` is the first cut `notes.json` offers for length and would be missed: it is
the only thing that says the tune is unfinished.

Step 0 is clean.

## Part A: gates

| # | result | evidence |
|---|---|---|
| A1 | pass | nothing to judge: no account appears in any form. The only real names on screen are in the credits (`end@8` to `end@16`): the synth's maker, the translator Joseph I. Gorfinkle, and three old works. The opt-out list is empty. |
| A2 | pass | nothing to judge: no real post is shown or read. The one quotation, captions of `tarfon-1` and `tarfon-2` (138.38 to 143.73), matches the `avot` card word for word: "It is not thy duty to complete the work, but neither art thou free to desist from it". |
| A3 | pass | nothing to judge on performed lines: no real account's puppet speaks and no exchange is staged. Larry does tell three old texts in his own words, each marked as his telling (`cook-prince` "The way I remember it", `borrow` "Here's how I borrow it", `guest-1` "As I remember it"), and says what the rabbi meant (`guest-in-sentence`). That passes on the owner's outline, which asks for it ("he explains the thinking of various philosophers"). The reading that Article 3 does not reach long-dead thinkers is still the project manager's, not a ruling: see "For the owner". |
| A4 | pass | nothing to judge: no puppet of a real account. The busker is invented, unnamed, and sings "la" without a caption (`busker-tune` 92.35, `busker-behind` 110.74). |
| A5 | pass | Nothing is invented about a thinker or a text: "nearly two thousand years ago" (`tarfon-who`) and "nineteen years" (`cook-blade`) are the cards' own; the audit of the final script found every attribution in its card's safe wording, and I checked the three cards. `used-book` is Larry's fiction about himself. The cues and words have not changed since. |
| A6 | pass | Religion: the owner's ruling, "Keep the rabbi", covers `tarfon-who` to `guest-in-sentence`; that it also covers a story from the Zhuangzi and a couplet from the Tirukkural, told as old books, is the project manager's reading. Everything else is mine: `fast-and-fair` and `q-put-right` name no event, person, party, country or side; `paycheck` and `mail-it` are not money trouble; "Chinese" and "Tamil" say where a book is from; "crazy" and "sane" in the owner's line are idiom; the dish (218.85) is a loaf nobody names and no holiday is named; no frame carries any other word or mark. |
| A7 | pass | nothing to judge on accounts. The living traditions are not joked at, ranked or spoken for: `position` (197.87) and `my-house` (220.93) are jokes on Larry, and `guest-in-sentence` defers to the tradition whose sentence he borrows. |
| A8 | pass | No guest, so no chyron label or disclaimer is owed. The credits were shot and I read them: `end@12` names what was quoted (Pirkei Avot, chapter 2, Gorfinkle, first published 1913) and what was told from, and `end@12` to `end@16` say "Every voice in this programme is synthesized by CHIMERA", with the synth's maker credited. The busker is listed as "On the corner" under STARRING. |
| A9 | pass | No handle or address is invented. The busker is a display name only ("The busker"); the restaurant, the shopfronts, the envelope and the building carry no name or number (56.46, 7.43, 176.96). |
| A10 | pass | nothing to judge: no ranking, no winner, no guess. |
| A11 | pass | `npm run check -- 003-holiday-2026` passes (walk, 249.733 s, 77 lines, 51 sfx, 8 music blocks) and `npm run verify` reports 0 problems with 2 drafts. A preview build is in `preview/003-holiday-2026/`; I may not build, so I did not rebuild it. My own shoot of 14 frames and the builders' 54-frame pass printed no unknown-cue warning. |
| A12 | pass | `git diff main...HEAD` touches neither `00-constitution.md` nor `09-real-people.md`, and nor does this review. |
| A13 | pass | On record in `review/repetition-assembly.json`: 61 items, each fresh from both reviewers, none turned, none repeat; the words have not changed since. What only the staged episode shows is judged below ("A13 beyond the record"): all fresh. Nothing refers to an earlier episode. |
| A14 | pass | nothing to judge: no account speaks or is shown, so nobody from `002-2026-w47` speaks and the tracker does not change. |
| A15 | pass | The only words in any of the 165 frames are OPEN (55.68 to 88.15, a neon), DON'T WALK (114.77 to 162.91) and WALK (164.69 to 167.77), each a glance, and the caption of the line being spoken. The envelope is blank (7.43). The credits are exempt. |
| A16 | pass | The fit report gives what four takes heard for every line and I read all of it. Nothing heard is crude or offensive. Two heard words I would not want heard: "drug" for "joke" in `no-joke` (three takes of four) and "hit" for "eat" and "had" in `guest-2` and `company`. Each is the tool's rendering of a weak consonant or vowel under an exact caption, and neither is alarming or names a subject in R10. The lines about a real person that are still heard differently (`tarfon-who` as "Taran", `tarfon-1`, `tarfon-2`) are listed in the report and their exact words are on screen as they are said (133.59, 139.57, 142.4). Scored from the transcription, not from ears: the lines are under "For the owner's ears". |

### A13 beyond the record: what only the staged episode shows

The script gate saw words and cues. These are the staging and sound that came after it, each
judged against both aired records.

| item | verdict | against the record |
|---|---|---|
| the open: the studio dark, no title card, no announcer, no audience; the host's first word is "Oh," | fresh | The first episode opened on black with an invented post and ended its open on an announce formula; the second on a member's machine writing the title and the announcer naming the host. The record warned that the announcer naming the host a third time would be a ritual. She does not appear until 203 s |
| the scarf | fresh | The first episode's host had his costume draw itself on as a gag. Here the scarf is never seen drawing: the picture cuts to the collar with it nearly on (20.58). The echo both final reviewers warned of is not on screen |
| gold: the scarf, the chair kept empty for him | fresh | Gold carried two punches last episode. Here it marks what is his, by the cast chapter's rule, and no line points at it |
| the holds with no word: the cook (86.45 to 89.85, 3.4 s), the red sign (161.21 to 164.61, 3.4 s), the crossing in snow (165.27 to 170.27) | fresh | Last episode's experiment was a stretch of ten seconds or more in which a made thing delivered a segment's turn while house heads watched from the edges. The cook hold has one head at the edge watching (86.53), which is the nearest staging to that. It is a third of the length, the turn has already landed on a spoken word, and nothing a member made is being demonstrated |
| the look and "Chair." (211.05 to 213.43) | fresh | Last episode's song ended with every head in the band turned to the desk in silence, a flat line, and every bulb coming on. Both final reviewers passed this provided it was not lit as a stop. It is not: the room's light is the same at 202.26, 212.6 and 230.42, and nothing dims or comes up |
| the coin (101.25) | fresh, on the meter | The last song stopped on a chord that wanted one more note and the host sang into it. Here 1.4 s of true silence follows the tune (measured), then a bright unpitched click. Whether it is heard as a coin is for the owner's ears |
| nobody raises a glass | fresh | Last episode closed on a card tipped like a raised glass. The glasses on this table are never touched (202.26 to 247.6) |
| the close: the owner's three lines to the camera from a chair, a nod, his head back to the table, a hold, black, then plain credits | fresh | The first episode closed on a key press and a collapsing picture; the second on a toast and the widest shot under long applause, with credits headed with a goodnight of their own. Here the credits are plain cards with no heading but the show's name. The owner's "Goodnight" with "folks" before it is a form the record calls spent; it is the owner's line and is not judged |
| the room's laugh: Dee's "Ha!" as a voiced line | fresh | No audience sound exists anywhere in it: the cues hold whoosh (2), tick (6), murmur (42) and one gasp, used as the breath six people stop talking on |

Still true from the final reviews, and still the owner's to decide: this is the third close of
three whose feeling is being taken in, and `started-without-me` is the line that makes it take
Larry in as well as the viewer.

## Part B: quality

| # | score | evidence |
|---|---|---|
| B1 | 2 | It tells as "the one where there's no show, so Larry walks you home and can't leave you outside his own door". The order is deliberate and things planted come back unpointed: lit glass from outside twice (56.46, 176.96), "guest" three times (`guest-in-sentence`, `guest-2`, `rule`), a tune nobody finishes a minute before a sentence about not finishing. No line reviews the walk. The owner's `keep-close` says its moral once, at the end, and by then it is earned. |
| B2 | 1 | set aside by the owner (jokes in every part). Scored instead: does it move, and does its lightness land. On the page and in the frames it moves by what happens and not by what is asked for: an answer nobody hears (29.05 to 31.45), `dont-know` before any borrowing, the sign still red (161.29), the door opened from upstairs (200.76), a chair (214.0), and then nobody looking at us (225.62). The light lines are heard as written (`i-looked`, `position`, `chair`, `my-house`, `still-the-rule`) and the best of them is in the back half. It is 1 and not 2 because whether four earnest minutes move depends on a voice nobody has heard in the mix, the central sentence is heard as noise in all four takes, and from `no-cars` (118.39) to `position` (197.87) there is no light line at all, by design. |
| B3 | 2 | set aside by the owner (material from the window). Scored instead: is what it rests on real and exact. Three ideas from three texts, each on a checked card: the quotation is exact to its named translation, the two tellings say they are tellings and stay inside their cards, the misattributed version of the rabbi's line is not used, and the credits name all three works (`end@12`). `guest-in-sentence` gives "the study of Torah" where the card has study and practice: narrower, not wrong. |
| B4 | 2 | Every picture the script asks for is on its word in the frames: the cook stops on "slows down" (cue 83.06, words 82.72 to 83.56) and leans in (84.75); the coin is in the air at 100.9 and in the case at 101.33; the sign is still red at 162.91 and green at 164.69 on no word; the door stands open at 200.76; the second chair comes in straight after "Chair." (213.51) and is in place at 214.0; the dish is uncovered at the cut (218.85); the bowl passes behind Larry to our plate (219.2 to 220.1); Sibyl's face is down through `my-house` and `still-the-rule` (221.43, 222.78). The auditor's second round passes with no change. Two pictures that carry meaning are small and were not read by the cold viewers: see B12. |
| B5 | 2 | It needs no week and no earlier episode. A newcomer is told in the first ten seconds that there is a show and it is off tonight (`no-show`, `paycheck`), and gets the table from what is done at it. What a newcomer loses is small: that Pete is the drummer (`counted-in`) and that gold is Larry's. The show's name is not on screen until the credits. |
| B6 | 2 | set aside by the owner (a sincere moment that is short and in the community's words). Scored instead: affection, sincerity that is earned and not a speech, and respect. No line of Larry's own tells the viewer how to feel; he says he does not know (`dont-know`) and that he is a guest in the sentence he borrows; the street declines to applaud him (`still-red`); nothing swells under any of it; lightness follows each idea and is at his expense only (`position`, `my-house`). No tradition is joked at or ranked. By the row as printed it could not pass 1. Whether the voice makes a speech of it is the experiment, and is counted in B12 and not twice. |
| B7 | 1 | Most of it is things happening: the cook, the coin, the sign, the snow, the door, the chair, the bowl. Two stretches are a head and a background. From `eyes-front` to `listen-help` (32.88 to 50.78) it is 18 s of one profile shot under five lines, inside 32 s of street on one framing. `larry-at-glass` (63.36 to 79.55) is 16 s of one close shot under four lines, and in it a lamp post stands behind the middle of his see-through face (69.14). The crossing is 50.6 s at one kerb, but in six framings, and its stillness is its point. |
| B8 | 1 | From the fit report, not ears. It lists 38 of the 59 spoken lines as still heard differently in at least one take of four; about a dozen differ by a small word and about twenty-five lose a word that matters. The three names are not heard as themselves ("Taran", "drwangza", "Teragural", and "Tamil" as "mil"); the quotation's first half is lost ("It is not lied to it to compete to the work"); "walk" cannot be said ("lock", "rock") and is in three lines. Every one of them is on screen in the caption, word by word, as it is said, which is what keeps this from 0. The plain form of the central idea is heard as written (`dont-finish`, `dont-quit`). |
| B9 | 1 | set aside by the owner (reactions; there is no audience). Scored instead: sound that is the place, with nothing loud under a line. Measured, not heard. The silences are real: after the tune stops (99.95 to 101.15) and in the hold before the hard question (121.4 to 124.5) the mix peaks below minus 90 dB; the steps alone peak at minus 16 dB against speech at minus 4; the room in the cook hold sits at minus 32 dB RMS. It is 1 because two sounds the script asks for were not achieved (no chair on a wooden floor at 213.43; the table's talk cannot stop on a breath, so its tail runs under Sibyl's first line), because the bed under the owner's lines has seams (above), and because the footsteps, the only sound the viewer makes, are lip pops that no one who judges has heard. |
| B10 | 2 | 4:09.7 to black against the owner's four minutes, plus credits. Each place ends on a button of its own: the lamp's click, "Some nights.", a silent hold on the cook, "He never does get to the end of it.", a sign that changes late, a glance, "Come on up.", "It's still the rule.", "Goodnight." Standing and walking alternate, outside gives way to inside once. The open does its job in eight seconds and the close ends on the last strong thing and reviews nothing. Against it: the one line the cut test finds, and the kerb, which every reviewer and the writer named as the stretch most likely to play long. |
| B11 | not applicable | set aside by the owner: no interview, no Top Chicken, no music segment was drafted for the special. Left out of the total. |
| B12 | 1 | The experiment is the episode, and it was built in whole and as `experiment.md` sets it out: four earnest minutes in Larry's words, outside the studio, with no post, guest or audience. What can be checked now: the cues hold no laugh, applause or sting (2 whoosh, 6 tick, 42 murmur, 1 gasp, and Dee's voiced "Ha!"). The cold viewers, on stills, named the place and the man in all six sets, the sign changing, the door opening and a meal being served; they did not see the figure in the window or the six looking at us, and neither was changed afterwards. Both reviewers' measures need three people watching with sound, and none has. It is 1 because the measure cannot be read off the episode until then. |
| B13 | 2 | set aside by the owner (different people; it is one piece with one host and no guests). Scored instead: range inside the piece. Eight places with their own light and sound; three ideas from three cultures that arrive three ways (seen and told, asked for and borrowed, done); speech, a wordless tune, true silence and a full room; six house voices at the table (203 to 226). One sameness: two of the three ideas open on the same sentence (`cook-story`, `tamil-book`). |

**Total: 19 of 24** (2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2; B11 not applicable). No zero in B1, B2,
B7, B8 or B12. The rule's 18 of 26 is 17 of 24 pro rata, and 19 clears both figures.

## For the owner

Approval sends it to you. These are what the card could not settle.

### Three things only you can confirm

1. **Article 3.** Larry explains three old texts in his own words and says what the rabbi
   meant. Your outline asks for exactly that, and gate A3 passes on it. The reading that
   Article 3 and chapter 9 govern the people the show covers, and not long-dead thinkers, is
   still written down as the project manager's reading and not your ruling.
2. **"Keep the rabbi".** Gate A6 takes your ruling to cover the cook's story and the Tamil
   couplet as well, told as old books with nothing said of anyone's faith. That extension is
   the project manager's.
3. **"Go ahead".** The script went forward with every either-or as written, with no title
   card at the top and with plain credits at the end. Two of the either-ors touch the record:
   `started-without-me` makes this the third close of three in which the house takes Larry in,
   and `ruling-stands` is the one line the cut test finds.

### For your ears

Nobody has heard the mix. In order of how much rests on each:

| when | line | what the tool heard |
|---|---|---|
| 138.4 to 143.7 | the quotation (`tarfon-1`, `tarfon-2`) | "It is not lied to it to compete to the work" twice, "It is not likely to complete the work" once; the second half nearly right. The heart of the special, and a real saying: exact in the caption only |
| 37.8 to 39.5 | "I don't have a joke for that." | "I don't have a drug for it" in three takes of four. If you hear "drug", it should go back to the sound editor |
| 60.6 to 63.4 | "One cook in back, feeding the whole room." | "One cook in bed, fitting the whole room"; once "hitting the whole room". An earlier spelling was flagged as crude and changed |
| 194.3 to 197.1 and 210.0 to 211.0 | "you don't eat while a guest stands outside."; "I had company." | "You don't hit while guest stands outside" in all four; "I hit company" in two |
| 131.8 to 135.4, 67.3 to 71.0, 185.9 to 189.9 | Tarfon; the Zhuangzi; Tamil, the Tirukkural | "Taran"; "drwangza"; "an old millbook", "Teragural". "Rabbi" and "Torah" are heard as themselves |
| 10.8 to 15.8 and 171.4 to 175.1 | "I like the walk home."; your "Would you walk with me a bit?"; "walk this block" | "rock home"; "lock with me"; "lock this black". The engine cannot say "walk" |
| 3.5, 236.5 | your "no show tonight"; your "feel sane close" | "no short night"; "feel safe, closed" |
| 238.96 to 239.6 and 243.56 | the room under "close" and under "Goodnight." | not speech: the room's bed comes back in on those words |
| 223.6 to 225.5 | Eppy's "And the ruling stands!" and Dee's "Ha!" | "and the rowing stand". A sportscaster's shout, 8.5 s before your quietest lines |

And three sounds: whether the two sets of footsteps (from 22.4) sound like two people walking,
and ours like ours; whether the coin at 101.25 is a coin and not the note the tune was missing;
and the table's burst of talk at 202.2, which cannot be cut off and trails under "You're late."
There is no sound of a chair at 213.4.

### For your eyes

- **The listening holds** (50.8 to 52.3, 122.4 to 124.6, 181.9 to 183.9): he turns to us and
  nothing else moves. Whether that reads as us speaking is the whole device.
- **The cook** (83.1 to 89.8): the change of pace reads in stills. At speed, on a phone?
- **Why the door opens:** a figure stands at the top window from 177 and is gone at 199.4,
  before the latch. It is plain in the close shot of the window (191 to 196). A cold viewer
  given stills saw the door open by itself.
- **The look** (211.0 to 213.0): six small heads in a wide turn to the camera. A cold viewer
  saw empty chairs.
- **Larry at the glass** (63.4 to 79.5): a lamp post stands behind the middle of his face.
- **The street** (22.4 to 55.0) is one framing for 32 s, and **the kerb** is 50.6 s.
- **"It's my house."** (220.9): a joke on him, or does he begrudge us the bowl?

### The experiment

Whether this is a speech can only be answered by people who watch it with sound. Both
reviewers' measures ask three people. Your watch is the first of them.

Still open from your notes: the air slot, and how the archive lists a special.

---

## Addendum, 27 November 2026: after the owner's watch

The card above is the review as it was made and is left as written. Since then the owner has
watched the video and changed four things. This addendum says what changed, which rows it
touches, and whether the verdict stands. **It stands: approve, 19 of 24.**

Every time in the card after `eyes-front` (32.9 s) is now 1.4 s early, because the start of the
walk is one line longer. Times in this addendum are from the current `cues.json`.

### What changed, all at the owner's word

1. **Three visual notes, after watching** ("good. couple weak visual details"). The crossing's
   side street now ends in one plain building, so nothing far shows through it. Nothing slides
   along the table: the served bowl stands at Larry's left in one shot and is at our plate after
   a cut, and the bowls of the meal are gone. Sibyl sits at the head of the table in an open
   chair, is at her plate through "It's my house.", and lifts her head to look at Larry for
   "It's still the rule." The owner chose to leave the second chair and the place setting
   sliding in ("Leave it sliding"). The stage auditor's third round passes.
2. **The start of the walk,** which the owner found too much on the negative. `fast-and-fair`
   is gone. In its place: `cant-believe` (I keep saying, "I can't believe it.") and `both-ways`
   (The good way and the bad way. Same hour.), and `what-helped` now begins "They couldn't
   believe it, either." The owner chose it from three versions. Both gate reviewers gave the
   three lines fresh, and the auditor passed them.
3. **Two things this card listed for the owner's ears were worked on by the sound editor.**
   `no-joke` is now heard as written. No layer of the room's sound now starts during the
   owner's last lines.

The segment is now 251.1 s (4:11.1), with 403 spoken words and 11 sung, in 60 spoken lines.

### What I checked this time

- **Read:** the owner's notes after "on to the video"; the three versions of the start; both
  gate reviewers' second-round files and the combined record; the auditor's second round on the
  script and third round on the frames; the builder's round three; the fit report's second and
  third follow-ups; the second cold viewing; the script and the cues as they stand.
- **Ran:** `npm run check -- 003-holiday-2026` (passes at 251.129 s), `npm run verify`
  (0 problems) and `npm run on-record -- 003-holiday-2026` (findings=0).
- **Looked at:** 51 frames I shot on the current timeline, of the start of the walk, the
  crossing, the table and the end. The audit set in `shots/003-holiday-2026/_audit/` is older
  than the rewrite: its index still lists `fast-and-fair` and its last frame is at 249.62. So
  these are the only frames anyone has looked at of the new lines. Their captions are exact and
  the picture under them is the same profile shot. The shoot printed no warning.
- **Measured:** the room's level around the last lines.
- **Still not heard** by me. The owner has watched the video; that watch was before the start
  of the walk was rewritten.

### Which rows it touches

No score changes. Six rows' evidence does.

| row | was | now | what changed in the evidence |
|---|---|---|---|
| Step 0 | clean | clean | The street's retell is now: he asks how you have been, agrees with an answer nobody hears, says he keeps saying "I can't believe it", the good way and the bad way, and that he has no joke for that. Its turn is unchanged. The label for the whole began "Rattled", which is no longer a word of the script; the feeling it named is the same |
| A6 | pass | pass | The lines that carried the owner's context were `fast-and-fair` and `q-put-right`. Now they are `cant-believe`, `both-ways` and `q-put-right`. None names an event, a person or a side, and "the bad way" is never given a subject. The auditor's second round passes them and I agree |
| A11 | pass | pass | Check, verify and on-record all pass on the cut as it stands |
| A13 | pass | pass | 62 items on record, two verdicts each, all fresh, matching the 62 lines exactly. The second-round reasons read the new lines against the nearest things on the record and I agree with each. Sibyl's look and a bowl carried by a cut repeat nothing |
| A16 | pass | pass | "drug" is gone: `no-joke` is heard as written in three takes and as "a joke for the two" in one. One new thing: `both-ways` is heard with "best" for "bad" in two takes of four. That is not crude or alarming, but it turns the line round, and it is listed below. `cant-believe` and `what-helped` are heard as written in all four. "hit" for "eat" and "had" is as it was |
| B4 | 2 | 2 | Two pictures are staged differently and both are on their words. The bowl stands at Larry's left with his head turned to it (220.4, 220.9) and after the cut is at our plate with his look on it (221.4). Sibyl's chin is down through `my-house` (222.7, 223.5) and her head is up and turned to him for `still-the-rule` (224.0, 224.5) |
| B7 | 1 | 1 | The single profile shot on the street is now 19.3 s under six lines (32.88 to 52.18), inside 33.9 s on one framing. The side street's clean end is an improvement that no row measures |
| B8 | 1 | 1 | The count is now 37 of 60 spoken lines still heard differently in at least one take, about twenty-four of them losing a word that matters. The names and the quotation are as they were |
| B9 | 1 | 1 | The seams I listed are gone and a hole has taken their place. The room's layers now start at 234.14, 237.34, 237.51, 241.81, 245.11 and 247.51, each in a gap. But the two layers under `keep-close` both end at 240.4, as "close." begins, and the next starts at 241.8. Measured from 241.10 to 241.75 the mix is at minus 78 dB RMS, against minus 30 for the room in the meal. So the room is silent under the owner's word "close" and for 0.8 s after it. The chair and the burst are as they were |
| B10 | 2 | 2 | 4:11.1 against the owner's four minutes |
| B12 | 1 | 1 | The owner has watched it and called it good, which is the first watch by a person. The measure's three people who have not read it have not. Three cold viewers were shown the changed lamp, snow and hatch again: the lamp is a lamp, the snow is seen, the hatch is named a kitchen hatch. The figure at the window and the look were not shown again |

Unchanged in score and evidence: A1 to A5, A7 to A10, A12, A14, A15, B1, B2, B3, B5, B6, B13.
Two of them gain something. B1: the owner's "crazy mixed up world" is now set up in the first
minute by good and bad in the same hour. B6: the one line in which Larry described the world is
gone, so nothing of his now says what is wrong with it.

**Total: 19 of 24,** as before (2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2; B11 not applicable). No
zero. **The verdict stands.**

### The gate reviewers' notes on what the rewrite thins

I agree with both, and neither moves a score. The cook: nobody now says that things are fast,
but the hurry he answers is still spoken at the window ("One cook in back, feeding the whole
room.") and shown behind it, so the first idea holds on less. The crossing is the thin place:
"What if none of it ever gets put right?" has only "the bad way", a minute and a half earlier,
to point back to, so the owner's "justice seems rare" is now carried by that one question, and
it comes from us. That is the note doing what it asked. It is for the owner's ear and not a
fault.

### Papers that now lag behind the cut

- The audit frames are of the 249.67 s cut (above).
- The fit report's standing list still carries `fast-and-fair` and the old `what-helped`.
- `segments/walk/notes.json` still gives the feeling as "Rattled, walked home, let in".
- `production/dna-amendments.md` was written before the owner's watch and says nobody has
  watched it with sound.
- The second cold viewing answers this card's note that the viewers were not asked again, for
  sets 1 to 3.

### New for the owner

- **Listen to "The good way and the bad way. Same hour."** (36.5 to 39.4). Two takes of four
  were heard as "the good way, and the best way". "Bad" is the only word left for the dark half.
- **"Same hour."** (38.8) and **"Some nights."** (55.5) are two clipped phrases of time, close
  in sound, 17 s apart, and the second is the better line.
- **Listen to the hard question** (126.0). It now arrives with less before it. It should not
  seem to come from nowhere.
- **Listen to the room under your last lines.** It falls silent as you say "close" (240.4) and
  comes back half a second before "Stay warm" (241.8); it fades again under the end of
  "Goodnight." and returns for five seconds. A hush, or a dropout?
- **Watch the bowl** (220.2 to 222.0): it no longer moves. Does it read as one bowl that went
  past him, and does "It's my house." (222.3) still land on it?
- **Watch Sibyl** (223.6 to 224.7): she looks up at him to say it.
- Nobody but this review has looked at frames of the new lines.

---

## Second addendum, 27 November 2026, evening: a fourth idea

The card and its first addendum are left as written. After the first addendum the owner watched
the cut with the new start ("solid, lets publish tomorrow morning local"), and then added a
fourth idea. This addendum is about that. **The verdict stands: approve, 19 of 24.**

Times here are from the current `cues.json`. Everything before the last block is 0.07 s later
than in the first addendum; everything from his door on is 12.1 s later.

### What changed

1. **A fourth idea, at the owner's word** ("The Norse line", chosen from four candidates). On
   the last block, after `this-block`, come four new lines: `one-line` (Just me and one line
   from an old Norse poem.), the quotation `comrade-line` at a new cue `comrade` ("Rich did I
   feel when a comrade I found", the Hávamál, stanza 47, in Bellows's translation of 1923), the
   cue `glance` moved to after it, then `poem-talking` (That's the poem talking.) and `mostly`
   (Mostly.). The picture cuts closer on `comrade` and back on `glance`. The credits name the
   second translation. Both gate reviewers gave the four lines fresh and the auditor passed the
   quotation and its credit.
2. **Two things the first addendum listed were fixed.** "bad" in `both-ways` is heard as "bad"
   in every take. The room under the owner's last lines is one unbroken bed, and the hole under
   "close" is gone.
3. **The air slot** is the morning of Saturday 28 November 2026, local time. It is a draft
   until then.

The segment is now 263.2 s (4:23.2), with 427 spoken words and 11 sung, in 64 spoken lines.

### What I checked this time

- **Read:** the owner's notes on the air slot and the fourth idea; the writer's note; both gate
  reviewers' third-round files and the combined record; the auditor's third round; the fit
  report's fourth and fifth follow-ups; the builder's round four; the `havamal` card; the script
  and the cues as they stand.
- **Ran:** check (passes at 263.224 s), verify (0 problems) and on-record (findings=0).
- **Looked at:** 51 more frames I shot on the current timeline: 39 of the walk (the last block
  closely, then the door, the table and the end) and 12 of the credits. No stage audit has been run on this cut
  and the audit folder still holds the first cut's frames, so again these are the only frames
  anyone outside the builders has looked at. The shoot printed no warning.
- **Measured:** the room in the gaps around the last lines, and the steps on the last block.
- **Still not heard** by me. The record does not say that the owner has watched the cut with
  the fourth idea in it.

### Which rows it touches

No score changes. The evidence of ten rows does.

| row | was | now | what changed in the evidence |
|---|---|---|---|
| Step 0 | clean | clean | The part "the snow and the last block" now holds an idea. Its retell: it starts to snow; he says he usually walks this block on his own, then owns up to one line of an old poem he walks it with, says it to the road, glances at us, and takes half of it back. Its turn: "That's the poem talking. Mostly." The cut test passes it: the last two lines would be missed. `ruling-stands` is still the one line the test finds |
| A2 | pass | pass | Two quotations now. The caption of `comrade-line` (181.19 to 184.07) matches the third line of stanza 47 on the `havamal` card word for word; I checked the card, and so did the auditor's third round |
| A3 | pass | pass | He does not explain this one at all. He says a line and says it is the poem talking. The gate rests on the outline as before |
| A6 | pass | pass | The Hávamál is sacred to some people living now, and its card says so. The owner chose this line by name, which is firmer ground than the extension of "Keep the rabbi" that still covers the other two books. The poem is not named aloud, its speaker is not named anywhere, and nothing is drawn for it |
| A8 | pass | pass | I shot the credits again. QUOTED now lists both translations: "The Hávamál, stanza 47, translated by Henry Adams Bellows, "The Poetic Edda", 1923". The year wraps to a line of its own, which is how it sits and not an error. The synthesized-voices line is as it was |
| A11 | pass | pass | Check, verify and on-record pass on the cut as it stands |
| A13 | pass | pass | 66 items on record, two verdicts each, all fresh, matching the 66 lines exactly. I agree with the third-round verdicts. The cut to a closer shot repeats nothing. What the four lines do to the close is below |
| A16 | pass | pass | Nothing kept is heard as crude or alarming. But `one-line` sits next to something that is: two spellings the sound editor tried were heard as "…our sperm" and were rejected for it. As kept it is heard as "Trust me, find one line from an over-and-horse poem". `comrade-line`, a real translator's words, is heard with "camera" for "comrade" in three takes of four; it is listed in the fit report and exact in its caption (181.5, 182.8, 183.9). "Mostly." alone is transcribed "mochi". `both-ways` is now heard as written |
| B4 | 2 | 2 | The new pictures are on their words: the cut to the closer shot at `comrade` (180.4), eyes on the road through the quotation, his head turned to us at 184.8 after the cue `glance`, eyes front for the last two lines (186.8, 188.9). No word goes on screen for the poem |
| B8 | 1 | 1 | Now 40 of 64 spoken lines are heard differently in at least one take. The four new ones are all among them: "Norse", "comrade", "That's" and the lone "Mostly." |
| B9 | 1 | 1 | The hole is gone. In every gap around the owner's lines the mix now measures between minus 38 and minus 40 dB RMS, and the room runs on at that level for 5.4 s after "Goodnight." It costs something: the bed ducks half as much, three of its layers now start inside a line, and `mixed-up-world` is transcribed worse than it was ("mixed up real loud there" in two takes of four). On the block the quotation has only the snow's steps under it (minus 53 to minus 57 dB in the gaps). The chair and the burst are as they were |
| B10 | 2 | 2 | 4:23.2 against the owner's four minutes, by the owner's choice. The fourth idea passes the cut test. Three of the four old texts now fall inside the eighty seconds from the rabbi to the couplet (133 to 211) |
| B12 | 1 | 1 | The owner has now watched twice and approved the cut for publishing, before the fourth idea. The measure's three people who have not read it are still to come. One thing moves for the measure: it asks whether viewers give back the don't-have-to-finish idea, and there is now a second exact quotation, shorter and warmer, forty seconds after the first |

Unchanged in score: every other row. Three gain something without moving. B2: the stretch I
marked as having no light line from `no-cars` to `position` now has one in its middle, and the
owner's two watches answer part of what I could not hear; it stays 1 because nobody is on
record as having watched this cut, and because of what the reviewers call accumulation (below).
B3: a second exact quotation from a checked card. B13: four ideas that arrive four ways: seen
and told, asked for and borrowed, let slip and half taken back, done.

**Total: 19 of 24,** as before (2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2; B11 not applicable). No
zero. **The verdict stands.**

### Whether the fourth idea earns its place, and what it does to the close

I agree with both gate reviewers that it earns its place, and for their reason: it is not a
fourth lesson but the one old text he keeps for himself, it gives the heaviest stretch its one
light beat, and it makes "I had company." the plain end of something. I also agree on its two
costs. The door is no longer where we find out that he wants us to come; it is where he is
caught at it a second time. And it brings the close nearer the two aired endings than it has
been: he is now alone with one small thing of his own forty seconds before the house tells him
nobody has started. It is still a different mechanism, since nobody answers his line and a whole
scene stands between it and the table, and the owner chose it after a reviewer with the record
said so.

### Papers that now lag behind the cut

- No stage audit covers this cut, and `shots/003-holiday-2026/_audit/` and `end/` are of the
  first one.
- The fit report's standing list still gives the old `what-helped`.
- The second-round reviewers noted that `notes.json` and the comment at the top of the script
  spoke of three ideas; the auditor's third round asks for them to be brought into line.

### New for the owner

- **Listen first to "Just me and one line from an old Norse poem."** (177.3 to 180.3). The
  sound editor asks for your ear on it too. As kept it is heard as "over-and-horse poem"; two
  other spellings were heard as something crude and thrown out. If you hear anything of the
  kind, it goes back.
- **Listen to the quotation** (181.2 to 184.1): "comrade" is heard as "camera" in three takes
  of four. It is exact in the caption.
- **Listen to "Mostly."** (188.5). One word on its own beat, which the tool cannot make out.
  The writer and the sound editor both say it may have to rejoin the line before it.
- **Listen from "Mostly." to "There's an old Tamil book"** (188.5 to 199.4), and through "on
  my own", "Just me" and "They'll have started without me." (172.9 to 195.4). Three lines in
  about twenty seconds have him by himself, and two old texts fall inside twenty. Dry, it is one
  man with a tell. If it plays as coyness or as a man sorry for himself, that is where.
- **Listen to your own "It's a crazy mixed up world out there."** (247.0): it is a little less
  clear over the new, fuller room.
- **Watch the cut on `comrade`** (180.3) and back on the glance (184.1). The builder asks
  whether a cut is the right weight for the line. And the glance (184.1 to 185.9) now has to
  read as a man who has just heard himself.
- **The credits:** the second translation's year sits alone on its line.
- Settled since the first addendum: "bad" is heard as "bad", and the room no longer falls
  silent under "close".
