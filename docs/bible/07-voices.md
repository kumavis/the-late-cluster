# 7. Writing for synthetic voices

Every word in the show is spoken by a physical model of a vocal tract. It is expressive, odd and
limited. Write for it the way you would write for a performer with a strong accent and a lovely
timbre: play to what it does well, avoid what it can't do, and check every line.

The technical reference is `packages/show/tools/README.md`: the script format, the sound library,
voice parameters, the respelling table, and the list of sounds the engine makes weakly. Read it.
This file is how those limits shape the writing.

## What the engine does well and badly

**Well:** short declaratives; common words; clear vowels; question and statement contours from
punctuation; distinct characters (pitch, rate and breathiness separate the cast); shouts; scat;
crowd sounds; creature calls.

**Badly:**
- Overall, an automatic transcriber gets 71 to 86 percent of words per voice. Assume one word in
  five is soft. The caption is always on to cover it.
- Specific sounds, whatever the voice: /tʃ/ before /ɪ/ ("chicken" heard as "written"); /dʒ/ ("joke"
  as "broke"); initial /kl/ ("claim" as "flame"); final /ŋ/ after /p/ ("Pong"); /w/ onsets
  sometimes; the words "feed", "Tuesday", "had for", and a phrase-final "live".
- Sung words are the least intelligible thing it makes.
- It cannot laugh while speaking, whisper on cue, or do accents.

Consequences for the writer:

- **Put the punch on a word the engine can say.** If the punch has to be "chicken", make sure the
  caption and a graphic carry it too (the pilot's Top Chicken does both).
- **Rephrase rather than fight.** Slowing a line does not fix a weak consonant, and rate 0.7 is often
  worse.
- **Short lines.** At most 14 words and two sentences per `say` beat. Split anything longer into two
  beats; you get a natural pause for free.

## The `as` respelling

`text` is the caption; `as` is what gets pronounced.

- Give `as` **the same number of space-separated words** as `text`, so caption words light up on
  time. Join multi-word respellings with hyphens.
- **Watch the function-word trap:** each hyphen part is pronounced as its own word, and function words
  get their weak forms. `for-mints` comes out "fer-", `nor-vid` "ner-". Use parts that aren't
  function words.
- Read the IPA the renderer prints for every line, then run the Whisper check.
- **In verbatim lines** (a thread, an interview answer, a quoted post) `as` may only respell. Same
  words, same order. Never reword a real person's post to make it easier to say; if it can't be said,
  show it on the card instead.

House respellings established by the pilot (keep using them):

| caption | `as` | note |
|---|---|---|
| Bluesky | `blue-sky` | |
| simcluster | `sim-cluster` | |
| Larry Nx | `Larry En-Ex` | |
| Hy (as a name) | `High` | "Hy Oid" is `High Oid` / `High Oyd` |
| Eppy Glottis | `Ep-ee Glot-tiss` | |
| catoid | `cat-oid` | |
| chimera | `kai-meer-uh` | |
| Piranesi | `pier-ah-nay-see` | |
| Abelian / abelian | `a-bee-lee-an` | |
| gm / gn | `gee-em` / `gee-en` or `good-morning` / `good-night` | the letters, not the word |
| p(doom) | `pee-ee-doom` | |
| prerat | `pree-rat` | |
| E (the key) | `ee` | "Press ee to leave." |
| joke | `djoke` | works sometimes; don't put a punch on it |
| chicken | `chick-in` | still weak; caption carries it |
| AI | `ay-eye` | |
| that's / we're (stressed) | `that-is`, `wee-are` | when the contraction swallows the stress |

Numbers, symbols, handles:

- Write numbers as words in `as`: "one-seventy-seven", "twenty-nine", "one-hundred-percent". The `%`
  sign is dropped by the pronouncer; write "percent".
- Handles: `@jay.bsky.social` reads as three phrases. Respell as one hyphenated token
  (`jay-dot-blue-sky-dot-social`) or, better, say the display name and let the chyron show the handle.
- Don't put URLs in speech. Put them on screen.

## The caption can be funnier than the audio

Because `text` and `as` are separate, the caption can keep typography the voice can't say, as long
as the word count matches:

- "Gn is still rare :(" captioned, `as: 'Good-night is still rare, sadly.'` spoken.
- Lower-case for norvid's lines ("claim.", "what else is like this") reads as his posting voice.
- Two dots ".." at the end of Samantha's lines reads as her broadcast trail-off.

Do not rely on the caption for the punch itself; rely on it for texture.

## Pace and pauses

- **Setups a touch quick, punchlines a touch slow.** The monologue runs setups at rate 1.0 to 1.06
  and punches at 0.9 to 0.94. Keep that.
- **Per-character delivery rates in the pilot:** Larry 0.88 to 1.06; Sibyl 0.94 to 0.95 for
  announcements and rulings; Eppy 0.8 to 0.92 (his base rate smears); Samantha 0.82 to 0.9; norvid
  0.8 to 0.9; Abel 0.85 to 0.9; the bot always 0.9.
- **The pause before a punch** is a `gap` of 0.3 to 0.5 s on the punch line, or a `wait` of 0.2 to
  0.4 between setup beats. "Membership is supposed to be fuzzy." / `wait 0.3` / "So now there are
  four Discords."
- **A dramatic pause** is two beats with a `gap`, not an ellipsis: punctuation adds a fixed 0.35 s
  at most. Sibyl's "Larry..." / "Nx!" style works because the ellipsis falls at a phrase end.
- **Interruptions** use `overlap` (0.08 to 0.35 s): "Bit," / "Built it." overlaps by 0.08.
- **Unison lines** are the same text from several cast ids with `overlap` and `caption: false` on
  all but one, at lower volume.

## Laughs and sound effects

The crowd is synthesized and sits under the dialogue (it ducks about 9 dB under speech). Use it
like a sitcom mixer with taste.

| sound | use it for |
|---|---|
| `laugh` | an ordinary punchline |
| `biglaugh` | the three or four best jokes of the episode, no more |
| `chuckle` | a setup that's already funny, a quiet tag, a sight gag |
| `groan` | a deliberate groaner; it tells the viewer the show knows |
| `aww` | genuine sweetness, or mock sympathy ("Gn is still rare") |
| `ooh` | a reveal or a number |
| `gasp` | a shock (the bulb shatters) |
| `applause` / `applause-long` | entrances, the end of a segment, the gn post |
| `rimshot` | a cheap button that knows it's cheap; at most two per episode |
| `sting` | segment ends |
| `ding` / `buzzer` / `tada` / `drumroll` / `whoosh` | game-show and transition punctuation |
| `caw`, `cluck`, `seal`, `gator`, `trumpet` | creature punchlines; they cut through the mix |

Rules:

- **One reaction per joke, not per line.** The pilot puts a sound after nearly every line; in a
  weekly, leave some lines dry. A deadpan reply with no laugh ("That's... another question.") is
  funnier for the silence.
- **Size matches the joke.** A biglaugh on a mild line tells the viewer the show is nervous.
- **Nothing under "Built it."** Start any sfx 0.15 s after it, or give it `duck: 1`. A buzzer, gasp
  or creature call under the line breaks its intelligibility.
- **Leave room before a weak word.** Give a punch more `gap` from a loud sound, or lower the sound.
- **The sincere beat gets at most a soft `aww`** (the pilot uses 0.4 volume). No applause.

## The engine as a joke

The medium is a character. The pilot makes one joke of the engine failing: Sibyl reads "Gn." with no
respelling, the engine finds no vowel, and the screen labels it *PRONUNCIATION ENGINE · RAW OUTPUT ·
NO RESPELLING · DICTIONARY ONLY · INPUT gn · IPA /gn/ · VOWELS 0 · NOT A WORD*. Rules:

- **Label it on screen** as the engine, so it reads as deliberate.
- **Once per episode at most.**
- Self-aware jokes about the medium are welcome elsewhere when they are specific: "a man who is,
  technically, a throat"; *OUR MODEL: ONE LARYNX*; "made out of mouths".

## Songs

Constraints (details in the tools README):

- **One syllable per sounding note.** The renderer stops and prints its syllable split if they don't
  match. Unknown words can split oddly; prefer dictionary words and scat (`bah`, `dah`, `doo`, `wah`,
  `whoa`, `oh`).
- **Tested ranges** (MIDI): Larry 45 to 59, Al 41 to 52, Hy 64 to 71, Dee 67 to 74. Pete beatboxes.
  Shouts (`HEY!`, `ARE WE?`) use a harsh shout patch on purpose.
- Sung lead lines are captioned as karaoke on screen; the caption bar is hidden for them.

How to write one:

1. **Find the structural joke first.** A song is worth its cost only if its form is the joke. The
   pilot's: stop-time bars where the bot answers each "someday".
2. **Write the chorus as a short phrase with one long note per stressed syllable** ("Some-day!" on
   two notes; "We're in it!" on three). Hooks repeat; repetition is what makes sung words legible.
3. **Count syllables before writing notes.** "we'll build a simcluster where all of us belong" is 12
   syllables on 12 notes.
4. **Keep jokes out of the lyrics' fine print.** Put punchlines in the spoken stops and on screen.
5. **Avoid the weak sounds in sung lines**, especially on long notes.
6. **Change one word for the last chorus** ("we'll build" → "we built"; "Someday!" → "We're in it!").
   That's the payoff.
7. **Harmony is cheap**: Hy a diatonic sixth above and Dee an octave up, under the lead at about 0.4
   volume, is the pilot's recipe.

Short cues still matter around the song: the 2-bar Formants tag before the weather, Pete's logo
sting for sports, Dee's 4-bar lullaby under the credits, the 8 s theme hook.

### What the engine can render

Everything is a voice. There are no instruments, so every genre has to be made of these
(`packages/show/tools/README.md`, "Writing a segment script"):

- **Sung tracks** from any cast voice: notes from MIDI 28 to 96 in fractional beats (so triplets and
  odd metres are possible in melodies), rests, one syllable per note, `vibrato` in cents (0 gives the
  straight tone of early music), `transpose` for a key change. Tested ranges: Larry 45–59, Al 41–52,
  Hy 64–71, Dee 67–74. Nobody else has been tested singing; render a test phrase before casting
  Sibyl, Samantha, Eppy, the bot or a guest.
- **Beatbox tracks** on a sixteenth-note grid: kick `B`, hat `t`, open hat `tss`, snare `Pf`, rimshot
  `K`, inward snare `^K`, clap-click `!`, lip pop `P!`, crash `kch`, and pitched hum `m:<midi>`, which
  is how Al plays a bassline or a drone. `swing` from 0 to 0.5 gives shuffle and a 12/8 feel; the
  grid has no true triplets.
- **Shout tracks** (HEY!, ARE WE?) on chosen beats, deliberately harsh.
- **One tempo per music block.** Change tempo, or stop for a spoken line, by starting a new block,
  as the pilot's song does at every stop bar. Spoken lines can also lie over a block (the cold open
  rewinds the cursor and lays a groove under Sibyl).
- **Harmony** means stacking sung voices: four singers (Larry, Al, Hy, Dee) plus Pete's beat and hums.

### The genre shelf

The song's genre changes every episode and does not come back within eight. Log the choice in
`plan.json` and the rotation log in [lore](lore.md). Pick for the theme's feeling or a deliberate
mismatch.

| genre | what it needs from the engine | good for |
|---|---|---|
| **stomp-clap anthem** *(pilot, 001)* | Al's kick every beat, Pete's claps, gang shouts, lead with two harmonies, stop bars | a shared hope; a wish everybody has |
| **doo-wop** | swing about 0.33 for 12/8, Al on "dum" bass, Hy and Dee on "ooh" and "wah", Larry lead, soft hats, the I–vi–IV–V changes | a crush on a tool; devotion to something silly |
| **barbershop quartet** | four sung voices in close harmony, no percussion, a long tag on the last chord | nostalgia; a toast; something old-fashioned |
| **Renaissance motet** (Palestrina-style) | `vibrato: 0`, slow, long notes, few syllables, the same line entering in each voice with a `start` offset; no beat | solemnising the trivial; a requiem for something deprecated. The community just had a synth choir sing Palestrina, so the reference will land |
| **plainchant** | one voice or unison, many syllables on one reciting pitch with a cadence at each line end, `vibrato: 0`, no beat | reading a list, release notes or terms of service as liturgy. Possibly the most intelligible sung genre, since recitation is close to speech; untested |
| **round** | one melody, three or four voices entering in turn (`start` offsets) | something that spread person to person. The cheapest genre to write |
| **sea shanty** | Larry calls, the band answers; stomps on the strong beats in 6/8 (twelve sixteenths a bar); a "heave" shout | a collective build; everyone hauling on one project |
| **gospel** | lead plus answering "oh"s, claps on 2 and 4, shouts, a last chorus transposed up | testimony; praising something someone made; a newcomer's arrival |
| **boom-bap** | Pete at 85 to 95 bpm (`B . . . Pf . . .`), Al's hummed bass, verses spoken over the block or sung on a near-monotone | a brag: a streak, a Top Chicken champion. The show only ever disses itself. Test the flow's intelligibility |
| **lounge scat** | swing 0.2, a hummed walking bass, brushes on `t`, Dee scatting, Sibyl spoken over it | a slow week; a mood piece |
| **torch song** | slow, one lead (Dee or Larry), sustained pads, more vibrato, a spotlight | longing for a feature, a thing that broke; swap the song into the middle slot |
| **patter song** | fast syllables on repeated notes; the karaoke line carries it | a dense list of the week; risky, test before committing |
| **disco** | Al's kick every beat, open hats `tss` on the off-beats, octave hum bass, HEY!s | a launch party; everybody joined something |
| **polka** | Al's "oom" on the beat, Hy and Dee's "pah" off it, fast | a silly milestone |
| **show tune ("I want" song)** | Larry solo, building, a key change into the last verse | Larry's own wish, usually for a normal segment |
| **hymn or anthem** | slow four-part chords, everyone looks up | a founding, a milestone episode, a new "X week" |
| **beatbox showcase** | Pete alone with hums, no lyrics | a week whose story is a sound |

The goodnight lullaby (Dee, 80 bpm) is the frame's closing music. Proposal: it doesn't rotate and
isn't used as a weekly song genre.

## Voices for new guests

Put a new guest in an empty spot of (body, f0) space, set rate and accent for attitude, and check
nearest-neighbour distance and intelligibility with `analyze.ts voices`. The tools README lists the
open gaps (about 120 to 130 Hz with a neutral male body, about 200 Hz with body 0.3 to 0.5, 240 to
250 Hz breathy). Pan the guest away from whoever they talk to.
