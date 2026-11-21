# 7. Writing for synthetic voices

Every word in the show is spoken by a physical model of a vocal tract. It is expressive, odd and
limited. Write for it as you would for a performer with a strong accent and a lovely timbre: play to
what it does well, avoid what it cannot do, and check every line.

The technical reference is `packages/show/tools/README.md`: the script format, the sound library,
voice parameters, the respelling table and the list of sounds the engine makes weakly. Read it. This
chapter is how those limits shape the writing.

## What the engine does well and badly

**Well:** short declaratives; common words; clear vowels; question and statement contours from
punctuation; distinct characters; shouts; scat; audience sounds; creature calls.

**Badly:**

- An automatic transcriber gets 71 to 86 percent of words, depending on the voice. Assume one word
  in five is soft. The caption is always on to cover it.
- Particular sounds, in any voice: /tʃ/ before /ɪ/ ("chicken" heard as "written"); /dʒ/ at the start
  of a word ("joke" heard as "broke"); initial /kl/; final /ŋ/ after /p/; some /w/ onsets; /s/ before
  a long /iː/; a possessive 's on a name; a phrase-final "live".
- Sung words are the least intelligible thing it makes.
- It cannot laugh while speaking, whisper on cue, or do accents.

So:

- **Put the punch on a word the engine can say.** If the punch has to be a weak word, the caption and
  a picture carry it too.
- **Rephrase instead of fighting.** Slowing a line does not fix a weak consonant, and rate 0.7 is
  often worse.
- **Short lines.** At most 14 words and two sentences per `say` beat. Split anything longer into two
  beats; the pause comes free.

## Read what was heard

The fitting tool (`npm run fit`) renders every line in its voice, transcribes it several times and
prints, for every line, each text it heard. The sound editor reads all of it, every line, every time,
and so does a reviewer at the final review. The score only counts how many words matched. A line can score well while the words
that did not match say something offensive, alarming or untrue. Only reading finds that.

**Best effort is sufficient, because the subtitles carry the line** (the owner's ruling,
21 November 2026). Captions are on by default and light each word as it is spoken, so the viewer
always sees the exact words. The sound editor fixes what can be fixed without changing a word (a
respelling, a pause, another voice, below), fits again and reads again. What still cannot be said
stays as it was written. Nothing goes back to a writer for pronunciation, and a real person's
words are never cut or reworded because the voice stumbles on them.

Every hard word is written down in the voice research file, `docs/voice-research.md`: what it was
heard as, the spellings tried, and the one that works if one does. Read it before writing if you
like. A hard word may still be used.

Two things are different from a stumble, and are never accepted. A spelling fails, whatever its
score, if what was heard:

- contains anything offensive or alarming;
- touches a subject chapter 9 puts out of bounds.

The sound editor finds another spelling, and if there is none the line goes to the owner. A line
whose best effort is still heard as something else about a real person, including their name
turned into another word, is listed in the fit report under "heard differently, caption exact",
so the owner hears every such line when watching.

## Names

A real person's name, spoken by any character, has to be heard as that name, **in the voice that
says it**. Voices differ: a name that is clear from one character can come out as a different word
from another. A name can also come out as a word nobody would want attached to a person, or as a
pronoun the script never used for them.

- **Test every real name in the voice that will say it,** in the sentence it will be in, before the
  line is settled.
- **Position matters more than respelling.** A name is clearest at the end of a phrase, after a short
  pause, with nothing running into it. It is weakest at the start of a clause, straight after a
  small word such as "our" or "the", or with a possessive 's. Move the name before you try to
  respell it.
- **Give a difficult name a line of its own,** short, with the name last.
- **Let the screen carry it as well.** The chyron or the card shows the name and handle whenever it
  is spoken. That helps the viewer; it does not excuse a mishearing.
- If a name cannot be made to sound like itself in a given voice, have another character say it.

## Real words in a synthetic voice

A real person's post cannot be reworded to suit the engine. Therefore:

- **Render it before you choose it.** Before a post is given to a puppet, render it in that puppet's
  voice and read what was heard. Choose among candidate posts with that in hand.
- **`as` may only respell.** Same words, same order.
- **A long post may be split** across consecutive beats at its own sentence or line breaks, with no
  other line between them. The words and their order do not change, and the card shows the post
  whole.
- **Keep the card up for the whole line,** with the words lighting as they are spoken.
- **If it still cannot be heard,** give it to a clearer voice as a post read aloud, or use a
  different post. Never air a real person's words as noise.

## The `as` respelling

`text` is the caption; `as` is what gets pronounced.

- Give `as` **the same number of space-separated words** as `text`, so caption words light on time.
  Join multi-word respellings with hyphens.
- **The function-word trap:** each hyphenated part is pronounced as its own word, and function words
  get their weak forms. A part spelled "for" comes out "fer". Use parts that are not function words.
- Read the IPA the renderer prints for every line, then read the heard text.
- **A respelling keeps the word's vowels and consonants.** The transcription's approval is not a
  listener's: `showw` was transcribed "show" and is said "shao".

House respellings:

| caption | `as` | note |
|---|---|---|
| Bluesky | `blue-sky` | |
| simcluster | `sim-cluster` | |
| Larry Nx | `Larry En-Ex` | |
| Hy (as a name) | `High` | "Hy Oid" is `High Oid` or `High Oyd` |
| Eppy Glottis | `Ep-ee Glot-tiss` | |
| chimera | `kai-meer-uh` | |
| AI | `ay-eye` | |
| joke | `djoke` | works sometimes; keep it off the punch |
| chicken | `chick-in` | still weak; the caption carries it |
| that's / we're (stressed) | `that-is`, `wee-are` | when the contraction swallows the stress |

Respellings for a window's own words are worked out per episode and live with that episode.

Numbers, symbols, handles:

- Write numbers as words in `as`. The `%` sign is dropped by the pronouncer; write "percent".
- A handle reads as several phrases. Say the display name and let the chyron show the handle.
- Do not put addresses in speech. Put them on screen.

The caption may keep typography the voice cannot say, as long as the word count matches: caption
"back soon (probably)", spoken `back soon, probably.` Use that for texture, never for the punch.

## Pace and pauses

- **Setups a touch quick, punchlines a touch slow:** setups at rate 1.0 to 1.06, punches at 0.88 to
  0.94.
- **The pause before a punch** is a `gap` of 0.3 to 0.5 s on the punch line, or a `wait` of 0.2 to
  0.4 between beats.
- **A dramatic pause** is two beats with a `gap`, not an ellipsis: punctuation adds 0.35 s at most.
- **Interruptions** use `overlap` (0.08 to 0.35 s).
- **Unison lines** are the same text from several cast ids with `overlap`, and `caption: false` on
  all but one, at lower volume.

## Reactions and sound effects

The audience is synthesized and sits under the dialogue. Use it like a sitcom mixer with taste.

| sound | use it for |
|---|---|
| `laugh` | an ordinary punchline |
| `biglaugh` | the three or four best jokes of the episode, no more |
| `chuckle` | a setup that is already funny, a quiet tag, a sight gag |
| `groan` | a deliberate groaner; it tells the viewer the show knows |
| `aww` | real sweetness, or mock sympathy |
| `ooh`, `gasp` | a reveal, a number, a shock |
| `applause`, `applause-long` | entrances and the ends of segments |
| `rimshot` | a cheap button that knows it is cheap; at most two per episode |
| `sting` | segment ends |
| `ding`, `buzzer`, `tada`, `drumroll`, `whoosh` | game and transition punctuation |
| creature calls | punctuation that cuts through the mix; the tools README lists them |

- **One reaction per joke, not per line,** and leave some lines dry. A deadpan reply with no laugh is
  funnier for the silence.
- **Size matches the joke.** A big laugh on a mild line tells the viewer the show is nervous.
- **Nothing loud under a short line that carries a punch.** Start the sound 0.15 s after it, or give
  it `duck: 1`.
- **Leave room before a weak word.**
- **A sincere moment gets a soft reaction at most.** No applause.

## Songs

Constraints (details in the tools README):

- **One syllable per sounding note.** The renderer stops and prints its syllable split if they do not
  match. Prefer dictionary words and scat (`bah`, `dah`, `doo`, `wah`, `whoa`, `oh`).
- **Tested ranges** (MIDI): Larry 45 to 59, Al 41 to 52, Hy 64 to 71, Dee 67 to 74. Pete beatboxes.
  Nobody else has been tested singing; render a test phrase before casting anyone else.
- Sung lead lines are shown as lyrics on screen as they are sung; the caption bar is hidden for them.

How to write one:

1. **Find the structural joke first** ([music](04-formats.md#music)).
2. **Write the hook as a short phrase with one long note per stressed syllable.** Hooks repeat, and
   repetition is what makes sung words legible.
3. **Count syllables before writing notes.**
4. **Keep jokes out of the lyric's fine print.** Put punchlines in spoken stops and on screen.
5. **Keep weak sounds off long notes.**
6. **Change something the last time round:** a word, a key, who is singing.
7. **Harmony is cheap:** a second voice a diatonic sixth above and a third an octave up, under the
   lead at about 0.4 volume.

A two-bar tag or a sting costs almost nothing and changes the texture between segments.

### What the engine can render

Everything is a voice. There are no instruments, so every genre is made of these:

- **Sung tracks** from any cast voice: notes from MIDI 28 to 96 in fractional beats (so triplets and
  odd metres are possible in melodies), rests, one syllable per note, `vibrato` in cents (0 gives a
  straight tone), `transpose` for a key change.
- **Beatbox tracks** on a sixteenth-note grid: kick `B`, hat `t`, open hat `tss`, snare `Pf`, rimshot
  `K`, inward snare `^K`, clap-click `!`, lip pop `P!`, crash `kch`, and pitched hum `m:<midi>`, which
  is how a bassline or a drone is played. `swing` from 0 to 0.5 gives a shuffle; the grid has no true
  triplets.
- **Shout tracks** on chosen beats, deliberately harsh.
- **One tempo per music block.** Change tempo, or stop for a spoken line, by starting a new block.
  Spoken lines can sit in the gaps between blocks or lie over a block.
- **Harmony** means stacking sung voices: four singers plus a beat and hums.

### The genre shelf

A starting list, not a boundary. Choose for the theme's feeling or for a deliberate mismatch, and
offer a second choice: a reviewer strikes any genre the show has used recently. The last column is
the comic work the form itself can do.

| genre | what it needs from the engine | what its form offers |
|---|---|---|
| **doo-wop** | swing about 0.33, a "dum" bass, "ooh" and "wah" backing, a lead, soft hats | devotion sung to something that does not deserve it; the spoken bridge |
| **barbershop quartet** | four voices in close harmony, no percussion | a final chord that will not end |
| **madrigal or part-song** | `vibrato: 0`, slow, the same line entering in each voice with a `start` offset, no beat | solemn counterpoint about something small; entries that keep arriving |
| **round** | one melody, voices entering in turn | a pile-up; everyone singing different words at once and meaning it |
| **sea shanty** | a caller and a crew answering, stomps on strong beats in 6/8 | call and response; the crew answering something the caller did not ask |
| **work song** | a lead and answering voices, claps on 2 and 4, a last chorus transposed up | call and reply; the lift on the last chorus |
| **boom-bap** | a beat at 85 to 95 bpm, a hummed bass, verses spoken over the block | the brag. The show only ever boasts about someone else or mocks itself. Test the flow for intelligibility |
| **lounge scat** | swing 0.2, a hummed walking bass, brushes, scat, speech over it | the patter between phrases; the scat that says more than the words |
| **torch song** | slow, one lead, sustained pads, more vibrato | longing for something trivial; the held note |
| **patter song** | fast syllables on repeated notes; the lyric display carries it | a list at speed; the breath that runs out. Risky: test first |
| **disco** | a kick on every beat, open hats off the beat, an octave hum bass | the build and the drop; a launch party for something small |
| **polka** | an "oom" on the beat, a "pah" off it, fast | relentless cheer about a modest milestone |
| **show tune** | one soloist, building, a key change into the last verse | the "I want" song; the modulation as a punchline |
| **stomp-and-clap anthem** | a kick on every beat, claps, gang shouts, a lead with harmonies | the chorus everyone is meant to shout; earnestness at volume |
| **beatbox showcase** | percussion alone with hums, no lyric | a window whose story is a sound |

Sacred styles are not on the shelf: religion is out of bounds as a reference (R10).

## Voices for new guests

Put a new guest in an empty spot of (body, f0) space, set rate and accent for attitude, and check
the nearest-neighbour distance and intelligibility with the voices tool in the tools README. Pan the
guest away from whoever they talk to. Then test their real lines
([above](#real-words-in-a-synthetic-voice)).
