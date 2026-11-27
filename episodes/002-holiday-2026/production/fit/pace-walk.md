# Pace: `walk` (the final script)

Sound editor, 27 November 2026. Three renders. No words, beats or order changed. `npm run check -- 002-holiday-2026 walk` passes.

## 1. Length

- Before: **231.61 s**. After: **241.80 s** (the target was 235 to 250).
- 397 spoken words, so **98.5 words per minute** overall. That is slow on purpose, and most of it is held silence for the pictures.

## 2. Silences of 0.8 s or more (final render)

| between | seconds | what it is for |
|---|---|---|
| (start) → no-show | 3.50 | the empty studio, then one car far off (the whoosh now comes 1.2 s in, after "nothing") |
| paycheck → mail-it | 0.80 | the cut back to Larry, before the confession |
| mail-it → walk-with-me | 0.90 | before the owner's question |
| walk-with-me → scarf | 1.40 | our yes, given in silence |
| scarf → how-have-you-been | 7.42 | the scarf, the door and the lamp tick, black, then the street with nobody talking and a car |
| how-have-you-been → yeah-me-too | 2.40 | we answer and nobody hears it |
| yeah-me-too → fast-and-fair | 1.00 | a lamp post goes by, and a new thought starts |
| i-looked → old-books | 1.00 | between thoughts |
| what-helped → q-does-it-help | 3.10 | two lamp posts, then the listening hold (1.5 s): question 1 |
| q-does-it-help → some-nights | 1.00 | he looks back at the road before he answers |
| some-nights → always-stop | 3.36 | the restaurant slides in and he stops at the glass |
| always-stop → one-cook | 0.80 | the push in to the hatch |
| cook-gently → busker-tune | 5.90 | the cook going slowly while the room hurries (hold), then the darker street |
| busker-tune → good-one | 1.96 | the missing last note, then the coin |
| good-one → started-anyway | 1.96 | the busker nods, and they walk on |
| never-ends → no-cars | 3.70 | the red crossing, the quietest place on the walk, then our look up the road |
| no-cars → q-put-right | 3.40 | the turn to camera and the long listening hold (2.2 s): question 2, the hard one |
| q-put-right → dont-know | 1.20 | he looks away at the red |
| dont-know → tarfon-who | 1.40 | "I don't know" lands |
| tarfon-2 → used-book | 2.56 | the quotation's silence |
| guest-in-sentence → borrow | 1.00 | the cut wide, and he turns to us |
| dont-quit → this-block | 10.19 | still red (3.4 s held), the WALK tick, the crossing in the first snow (5.0 s), the last block |
| this-block → this-is-me | 3.76 | his glance at us, then his door and the warm window (murmur) |
| started-without-me → q-come-up | 2.00 | he turns to the door, stops, turns back and holds: question 3 |
| q-come-up → tamil-book | 1.00 | he does not answer straight, and looks up at the window |
| guest-2 → position | 0.80 | the look back at us |
| position → come-up | 1.41 | the latch, two ticks |
| come-up → late | 1.87 | the cut to the room, the burst of talk |
| company → chair | 1.96 | six heads turn to us, and nobody is sure |
| chair → rule | 1.76 | the chair slides in and we sit |
| rule → my-house | 2.16 | the bowl goes past Larry to us |
| dee-laughs → mixed-up-world | 7.90 | the meal running (4.8 s), then he turns to us (3.1 s), the room under it |
| mixed-up-world → keep-close | 0.80 | the breath inside the owner's line |
| keep-close → stay-warm | 1.30 | room before the last line |
| stay-warm → (end) | 3.52 | the room only, about three seconds, then black |

Every listening hold (`how-have-you-been` wait, `q-does-it-help`, `q-put-right`, `q-come-up`, the yes before `scarf`) is true silence in the timeline, with no line or sound running through it.

## 3. What I changed

| beat | field | old | new | why |
|---|---|---|---|---|
| first whoosh (dark-studio) | at | (none) | 1.2 | "Nothing, then one car": it started on the first frame |
| paycheck | gap | default 0.36 | 0.8 | the cut to the envelope and his head tipping down |
| mail-it | gap | 0.6 | 0.8 | a new shot and a small confession |
| scarf | gap | 1.0 | 1.4 | the silence is our yes, so it needs to read as an answer |
| street-start waits | wait | 1.8 / 1.6 | 2.2 / 2.0 | "Nobody talks yet: look" |
| wait after how-have-you-been | wait | 2.2 | 2.4 | the unheard answer |
| fast-and-fair | gap | 0.8 | 1.0 | lamp post first, and a new thought |
| old-books | gap | 0.8 | 1.0 | between thoughts |
| wait before listen-help | wait | 0.9 | 1.6 | two lamp posts with nobody talking |
| q-does-it-help | gap | 1.2 | 1.5 | the listening hold, so it is heard as someone speaking |
| some-nights | gap | 0.8 | 1.0 | he looks back at the road first |
| cook-blade | gap | default | 0.5 | a breath in the story before the punch of "Still sharp" |
| cook-hard-part | gap | default | 0.7 | the cut to the hatch before the key line |
| watch-the-cook wait | wait | 2.4 | 3.4 | "Hold it." |
| walk-on wait | wait | 1.6 | 2.0 | the darker street before the tune |
| busker-tune, busker-behind | sing (cast id) | al | busker | his own voice (below) |
| busker-in | at | -5.8 | -6.25 | it fell four notes in. Now it falls at the third note's onset, "two notes in" |
| tune-stops wait | wait | 1.1 | 1.4 | the missing note has to be felt |
| crossing-red wait | wait | 2.0 | 2.8 | the quietest place on the walk |
| no-cars | gap | default | 0.9 | our look up the road and back comes before his answer |
| q-put-right | gap | 1.6 | 2.2 | the hard question, and "it takes us a while" |
| dont-know | gap | 1.0 | 1.2 | he looks away at the red |
| tarfon-who | gap | 0.9 | 1.4 | let "I don't know" land |
| wait after tarfon-2 | wait | 1.6 | 2.2 | the quotation's silence |
| borrow | gap | 0.7 | 1.0 | the cut wide, and he turns to us |
| still-red wait | wait | 2.6 | 3.4 | "Hold all of it." |
| apartment-door wait | wait | 0.8 | 1.6 | the street stops, and he looks up at the window |
| q-come-up | gap | 1.5 | 2.0 | turn, stop, turn back, hold |
| tamil-book | gap | 0.8 | 1.0 | he looks up at the window instead of answering |
| they-look wait | wait | 1.3 | 1.6 | "for a second nobody is sure" |
| served wait | wait | 1.0 | 1.8 | the bowl travels all the way, his head following it |
| the-meal waits | wait | 1.6 / 1.6 | 2.4 / 2.4 | "Let it run." |
| goodnight murmurs 2 and 3 | at | 2.8 / 5.6 | 2.4 / 3.2 | see section 5 |
| new wait after them | wait | (none) | -2.8 | see section 5 |
| mixed-up-world | gap | 0.8 | 0.3 | his line now starts 3.1 s after the cue (see section 5) |
| keep-close | gap | 0.7 | 0.8 | the third murmur now starts inside this breath and not on a word |
| murmurs before stay-warm | at | 0 / 2.6 | 0.8 / 3.15 | the room after the last word (see section 5) |
| new wait after them | wait | (none) | -3.15 | see section 5 |
| stay-warm | gap | 1.2 | 0.5 | with the wait above it is 1.3 s after "close" |

The other rates and gaps stay as the writer marked them.

**The busker's voice.** I created `episodes/002-holiday-2026/cast.js` with one entry, `busker`: name "The busker", title "On the corner", no handle and no `guest` flag, because he is invented and not a real account. It has `rate 0.95`, `accent 0.18` and `pan 0.5`. `npm run voices -- 002-holiday-2026` placed him at `body { female: 0.25, child: 0.1 }`, `f0 140`, `source { tension: 0.62, brightness: 0.5 }`, measured median 145 Hz. His nearest voice is Dee at 1.88, which clears the 1.5 minimum, so he is distinct from Al and from the rest of the house. He only sings "la", so he has no respellings to refit. Both `sing` beats now point at `busker`. The house cast is untouched.

## 4. What pauses could not fix

- **The footsteps do not exist.** The script asks for two sets of footsteps from the street to his door, stopping when we stop and going soft in the snow, and for a chair dragged across a wooden floor. The library has neither, so on audio alone the street stretches are plain silence. The longest is 10.2 s, from "quit" through still-red, the crossing and the snow to "Nearly there". A builder should add a footsteps sound (and the chair). Without footsteps, the owner hears that stretch as dead air.
- **The restaurant bed has holes.** The comment wants the murmur "as a bed under the whole scene", but the scene has only four murmur beats, about 3 s each. There is no murmur at all from 62.05 to 77.95, under the whole Zhuangzi story at the glass. That needs more murmur beats from a writer, or a looping bed sound from a builder.
- **The room cannot be "cut off on one breath"** at table-wide. A sound can be placed but not cut short, so the murmur runs about 2 s under Sibyl's "You're late" (ducked). This needs a builder: a cut-off variant, or a length on sfx beats.
- **The busker has no look.** `cast.js` gives him a voice only. The builder still has to draw him (`looks.js`), and has to decide whether an invented non-guest belongs in the credits.

## 5. Tricks

- **The goodnight murmurs did not work.** On an sfx, a positive `at` with `hold: 0` moves the cursor forward to where the sound starts (`render.ts`: `cursor = max(cursor, t0 + hold·len)`). The tools README does not say so. The writer's `at: 2.8` and `at: 5.6` therefore stacked: 8.4 s of murmur passed before "It's a crazy mixed up world", a new murmur started 0.8 s before that line, and another started on top of "Stay warm". After "Goodnight" there was nothing, not the three seconds of room the comment asks for. In its place: the three murmurs before the lines now start 0, 2.4 and 5.6 s after the cue. One added `wait: -2.8` brings the cursor back, so his first line starts at 3.1 s, 0.7 s after the second murmur begins, and the third begins in the breath between his two lines. The two murmurs before `stay-warm` are now laid ahead (`at` 0.8 and 3.15) with an added `wait: -3.15`. One starts 0.5 s before the last line. The other starts as "Goodnight" ends, so the room runs 3.5 s after the last word (including the renderer's 0.6 s tail).
- **The busker-behind `wait: -1.8` works:** "He never does get to the end of it" starts at 110.44, under the tune's last long note (110.1 to 111.84), as the comment asks.
- **The cook-slows `at: -0.5` works:** the cue lands at 81.46, inside "slows" (81.12 to 81.54).
- **busker-in `at: -5.8` missed** (it fell four notes in) and is corrected to -6.25 (section 3).

## 6. The three words said worst (from the IPA)

- "Tirukkural" → /tɪhɹukuɹʌɫ/
- "Zhuangzi" → /dʒwæhŋdzʌh/
- Sibyl's "That is the rule" → /ðəɾɪzðəɹuɫ/: "That" is swallowed into "the-tiz"

`docs/voice-research.md` holds no spelling for these, so their `as` is unchanged.

## 7. The mp3

`/Users/xyz/Development/the-late-cluster/episodes/002-holiday-2026/public/audio/walk.mp3` (cues in `episodes/002-holiday-2026/segments/walk/cues.json`)
