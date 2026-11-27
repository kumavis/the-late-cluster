# Pace pass: writer-3, "The Long Way"

Sound editor, 27 November 2026. Timing only: no words, `as`, notes or beats were changed.

## 1. Length

| | seconds | words per minute (412 spoken words) |
|---|---|---|
| before | 214.12 | 115.4 |
| after | 242.38 | 102.0 |

Three renders. `npm run check -- 002-holiday-2026 --draft writer-3` passes.

## 2. Silences of 0.8 s or more in the final render

Times are the end of the line before the silence. "Silent" means no line is running. The script has
no footsteps or room-tone beat, so most of these are real digital quiet (see section 4).

| between | at | length | what it is for |
|---|---|---|---|
| start → no-show | 0.30 | 3.20 | the dark studio, silent, then his head comes up (sees-us) |
| mail-it → walk-with-me | 12.60 | 1.20 | he turns to ask, and means it |
| walk-with-me → how-have-you-been | 15.37 | 8.80 | scarf (2.6), door and black (1.6), first look at the street (3.8), his head turns (0.8) |
| how-have-you-been → yeah-me-too | 25.87 | 2.60 | he waits for our answer (listening) |
| yeah-me-too → fast-lately | 29.90 | 2.46 | the bus: whoosh at 30.20 to 30.75, then the street |
| no-fix → what-do-i-do | 39.73 | 1.50 | the viewer asks "What do I do about it?" (listening, real silence) |
| what-helped → analects | 50.76 | 1.60 | the lit lobby slides in: looking |
| gatekeeper → meant-kindly | 65.97 | 1.20 | the gatekeeper's line lands; the lobby is level with him |
| meant-kindly → same-worries | 71.54 | 3.40 | the restaurant window arrives: two murmurs layered (71.54 to 76.96) |
| dessert-anyway → supposed-to-do | 79.50 | 3.50 | the window slides off (1.6), then the viewer asks the hard question (1.9, real silence) |
| supposed-to-do → busker-1 | 84.57 | 1.20 | he has no answer; the street gives one |
| busker-3 → that-for-one | 98.13 | 2.60 | silence where the last note should be |
| what-hes-got → tarfon | 111.27 | 2.20 | the coin (tick at 111.27), then the cut to the close-up |
| tarfon-2 → guest | 124.69 | 2.76 | the quotation sits |
| guest → carry-it | 131.69 | 1.00 | he turns and walks on |
| finish-quit → busker-4 | 137.86 | 1.00 | the busker starts again behind them |
| busker-4 → no-last-line | 141.93 | 1.00 | his head turns back to the sound and comes forward |
| what-youve-got → does-it-help | 149.30 | 7.20 | the crossing (2.6), snow (2.6), then the viewer asks "Does it help?" (1.6 plus the default gap): the longest wordless stretch |
| comes-out → a-cue | 162.81 | 2.30 | after "I don't know": he looks both ways |
| a-cue → this-block | 168.21 | 2.50 | the signal changes (tick on "cue"), he steps off |
| this-block → norse | 174.06 | 0.80 | a new thought |
| norse-road → comrade-line | 184.67 | 0.90 | before the quoted line |
| comrade-line → poem-talking | 188.21 | 2.36 | footsteps, the glance, sheepish |
| poem-talking → this-is-me | 192.94 | 3.80 | the door, the full room behind it (murmurs 193.34 to 197.36) |
| this-is-me → record | 197.37 | 1.96 | the door opens, every head turns (the murmur ends as it does) |
| company → saved-a-seat | 216.41 | 2.30 | all six heads turn to camera, Al's nod |
| sit → mixed-up-world | 226.66 | 2.56 | room before the owner's lines |
| keep-close → stay-warm | 234.79 | 1.20 | before the last line |
| stay-warm → end | 238.78 | 3.60 | the hold in the doorway after "Goodnight." (3.0 wait plus the 0.6 tail) |

## 3. What I changed

Old values in brackets; a line with no `gap` had the default 0.42.

| beat | field | old | new | why |
|---|---|---|---|---|
| script | `gap` | 0.42 | 0.36 | lines inside a thought sit closer; each new thought now carries its own gap |
| no-show | `gap` | (0, first line) | 0.8 | his head comes up before he speaks |
| mail-it | `gap` | (0.42) | 0.5 | a small turn of thought |
| walk-with-me | `gap` | 0.9 | 1.2 | he turns to ask the real question |
| wait after street-start | `wait` | 3.2 | 3.8 | the first look at the street |
| how-have-you-been | `gap` | (0.42) | 0.8 | his head turns to us first |
| wait after how-have-you-been | `wait` | 2.2 | 2.6 | he waits for an answer to a real question |
| wait after the bus | `wait` | 1.4 | 1.8 | the bus passes, the street settles |
| no-fix | `gap` | (0.42) | 0.5 | a beat before the dry line |
| what-do-i-do | `gap` | (0.42) | 1.5 | the listening hold: the viewer's question |
| old-books | `gap` | (0.42) | 0.6 | after "I read." |
| analects | `gap` | (0.42) | 1.6 | the lobby slides in: looking |
| gatekeeper | `gap` | (0.42) | 0.6 | before the told saying |
| meant-kindly | `gap` | (0.42) | 1.2 | the saying lands |
| wait between the restaurant murmurs | `wait` | 2.8 | 2.4 | the two murmurs overlap so the room swells instead of dipping |
| same-worries | `gap` | (0.42) | 1.0 | he looks in before speaking |
| dessert | `at` | (0) | 1.13 | the cue now falls on the word "dessert" (79.83) |
| dessert-anyway | `gap` | (0.42) | 0.5 | |
| wait after dessert-anyway | `wait` | 1.0 | 1.6 | the window slides off |
| supposed-to-do | `gap` | (0.42) | 1.9 | the listening hold, the hard question |
| busker-1 | `gap` | 0.5 | 1.2 | he has no answer: let that be heard before the voice |
| wait after song-stops | `wait` | 0.9 | 2.0 | silence where the missing note should be |
| that-for-one | `gap` | (0.42) | 0.6 | he turns to us |
| wait after the coin | `wait` | 0.8 | 1.4 | the coin, the nod, the cut |
| tarfon | `gap` | (0.42) | 0.8 | close-up, standing still |
| tarfon-1 | `gap` | 0.6 | 0.8 | room before the quotation |
| wait after tarfon-2 | `wait` | 1.4 | 2.4 | the quotation sits |
| carry-it | `gap` | (0.42) | 1.0 | he turns and walks on |
| finish-quit | `gap` | (0.42) | 0.6 | the line to take home |
| busker-4 | `gap` | 0.5 | 1.0 | the song comes back from behind |
| no-last-line | `gap` | (0.42) | 1.0 | his head turns back, holds, comes forward |
| wait after crossing-red | `wait` | 2.0 | 2.6 | the longest wordless stretch |
| wait after snow-starts | `wait` | 2.4 | 2.6 | snow |
| does-it-help | `gap` | (0.42) | 1.6 | the listening hold |
| comes-out | `gap` | (0.42) | 0.8 | after "Some nights." |
| wait after both-ways | `wait` | 1.0 | 1.8 | after "I don't know": quiet, he looks both ways |
| a-cue | `gap` | (0.42) | 0.5 | |
| crossing-walk | `at` | (0) | -0.4 | the signal changes on the word "cue" (169.51; the word is 169.50) |
| tick (signal) | `at` | (0) | -0.25 | the click lands inside "cue", after its /k/ |
| wait after crossing-walk | `wait` | 1.2 | 1.6 | he steps off |
| this-block | `gap` | (0.42) | 0.9 | a new block, a new thought |
| norse | `gap` | (0.42) | 0.8 | a new thought |
| comrade-line | `gap` | 0.6 | 0.9 | before the quoted line |
| wait after glance | `wait` | 1.6 | 2.0 | footsteps, the glance |
| murmurs at the door | `at` | (0, 0) | 0.4, 0.4 | the street stops first, then the room is heard |
| wait between the door murmurs | `wait` | 1.2 | 0.6 | the murmurs layer, and the second ends as the door opens |
| this-is-me | `gap` | (0.42) | 2.4 | the full room heard through the door before he speaks |
| wait after table-wide | `wait` | 1.2 | 1.6 | the heads turn |
| counted-in | `gap` | (0.42) | 0.5 | |
| house-rule | `gap` | (0.42) | 0.6 | a new shot |
| long-way | `gap` | (0.42) | 0.6 | a new shot |
| company | `gap` | (0.42) | 0.5 | |
| wait after they-look | `wait` | 1.4 | 1.8 | six heads turn to us, Al's slow nod |
| saved-a-seat | `gap` | 0.3 | 0.5 | |
| that-song | `gap` | (0.42) | 0.5 | his head snaps round |
| sit | `gap` | 0.2 | 0.7 | nobody answers him, and that should be heard before "Sit." |
| wait after goodnight cue | `wait` | 1.2 | 2.2 | room before the owner's lines |
| keep-close | `gap` | (0.42) | 0.5 | |
| stay-warm | `gap` | 0.9 | 1.2 | room before the last line |
| after stay-warm | `wait` | (none) | 3.0, added | the hold on him after "Goodnight." (the render runs to the cursor) |

No rate was changed. Nothing is above 1.0.

## 4. What pauses could not fix

- **There is no bed under the walk.** The footsteps and the street are described in comments and
  not written as beats, and the apartment has no room sound after the door murmurs end at 197.36.
  In an audio-only cut, the long silences (8.8 s before "So. How have you been?", 7.2 s at the
  crossing, the 3.6 s after "Goodnight.") are digital silence. The brief says the end should be
  "nothing but the room", and with no bed there is no room. This needs a builder (a footstep
  bed of beatbox ticks that stops with Larry, and a low room tone for the table and the end) or a
  writer to put those sounds in as beats. Until then, the owner may hear the long walking holds
  as gaps rather than walking.
- **The restaurant murmur ends at 76.96, before "dessert".** Two 3-second murmurs cannot cover the
  window from its arrival to its departure. A longer or looped murmur is a builder matter.
- **The doorman's nod** is meant to fall on "I decided he did" (64.85 to 65.97 here), but its cue
  `doorman-nods` also marks the lobby drawing level, so I left it at the start of the line. Staging
  should time the nod from the word timings in cues.json.
- **"What do I do about it? I read."** is one line, so his answer comes straight after the
  question with only punctuation between. A split would need a writer; it is not needed.

## 5. Tricks

The script has no negative `wait` and no negative `at`. Nothing to replace. The two cues I moved
with `at` (`dessert`, `crossing-walk`) land within 5 ms of their words in the final render.

## 6. The three words said worst

- "Analects": /eɪneɪlɛkts/ (wanted /ænəlɛkts/)
- "Hávamál" (respelled "Hah-vah-mahl"): /hɑvæhmɑɫ/, a breathy h left in the middle
- "Yeah": /jæ/

`docs/voice-research.md` has no entry for either name, so `as` is unchanged.

## 7. The mp3

`/Users/xyz/Development/the-late-cluster/packages/show/tools/.cache/drafts/002-holiday-2026/writer-3/audio/writer-3.mp3`
