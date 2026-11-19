# 3. The shape of an episode

## The pilot's running order

| # | segment | length | job | energy | BUILT |
|---|---|---|---|---|---|
| 1 | Cold Open: Built It | 55 s | state the engine; birth the host; theme and announce | silence to explosion | 0 → 1 |
| 2 | The Monologue | 85 s | the week's stories, one joke each, artefacts over the shoulder | high, quick | 1 → 2 |
| 3 | The Simcluster Channel | 70 s | a guest presents her own project; the week as weather | cool, smooth jazz | 2 → 3 |
| 4 | Top Chicken Tonight | 69 s | the cluster's games as sports | loud, fast | 3 → 4 |
| 5 | Built or Bit? | 70 s | game show; the runner at full speed; introduces the E key | escalating to a shatter and blackout | 4 → 8 |
| 6 | The Panel | 78 s | two guests overrun Larry's format | chaotic | 8 → 10 |
| 7 | Someday (Built It) | 95 s | one joke as a song; recaps the night's builds | peak, tender breakdown, peak | 10 → 14 |
| 8 | Goodnight | 69 s | every runner pays off; the question answered; gn; Press E | warm, quiet, applause, lullaby | 14 → 15 |

Total 9:51 and about 900 spoken words. That is a pilot: it introduces every character and format
once. A weekly episode does not need to.

## The weekly running order

Every slot below is subject to [the first rule](01-premise.md#the-first-rule-only-include-it-if-its-interesting):
only include it if it's interesting. Target **about five minutes; shorter is fine, padding is
not**. Five segments, about 420 to 520 spoken words.

| slot | length | format shelf ([formats](04-formats.md)) | must do |
|---|---|---|---|
| 1. Cold open | 15–25 s, plus the 8 s theme hook | The Ask | a real post from the week asks for something; "Built it."; counter 0 → 1; Sibyl's intro |
| 2. Monologue | 50–70 s | The Monologue | 3–5 of the week's stories, one joke each; the Top Chicken result as a quick hit when there is one; plant the episode runner |
| 3. Middle | 50–75 s | the week's best of: The Thread, The Panel, Top Chicken Tonight (full), Simcluster Channel, Built or Bit?, Changelog, Field Guide, Live From the Build, The Interview (proposed) | the week's second-biggest story, ideally with real people in their own words |
| 4. Song | 45–70 s | The Number | a **new genre every episode**, carrying **the week's theme** |
| 5. Goodnight | 30–45 s | Goodnight | runner payoff; the tally; the question answered with the community's words; "gn, simcluster."; "Press E to leave." |

That adds to about 3:30 to 5:00. A second middle segment (a feature and a guest, say) is allowed
when both pass the interesting test and the episode stays near five minutes; never add one to
reach a length.

**What gave way to the song.** The earlier order had a feature *and* a guest as standing slots
and no song. Now they share one middle slot; the monologue lost ten seconds and a story; the song
is capped at 70 s (the pilot's ran 95); the theme hook can shrink to a 2 s sting in a week when
the song is long.

The song usually sits in slot 4, as the episode's peak before the come-down. If this week's genre
is quiet (a motet, a lullaby, a torch song), swap it with the middle slot so two quiet segments
don't sit together before goodnight.

### Defaults, and how they get cut

Under the first rule nothing is load-bearing by right. These are the **defaults**: keep them unless
they aren't interesting this week, and record a cut with its reason in the pitch and `plan.json`
so the reviewer sees it.

- **The Ask and the build** in the cold open. It restates the show's engine for a new viewer in
  ten seconds and starts the counter. Its content must be this week's.
- **Sibyl's "Larry... Nx!"**, a five-second identity beat. Proposal: keep "And now..." and
  "Larry... Nx!" fixed and change the descriptor between them every week, the way the pilot's
  "a man who is, technically, a throat" did. The descriptor is a free joke slot about the week.
- **The monologue**, because that is where the week's stories get covered.
- **The song**, standing by the owner's decision. Cut it only when nothing in the week will carry
  a song, and say why.
- **Real people in their own words** in the middle slot. Without someone from the cluster on stage,
  it is a show about the cluster, not of it. But a thin persona is worse than none.
- **The question and its answer** at goodnight, then gn and Press E: the ritual close.

When you are long, cut whatever fails the interesting test first. Then, in this order: the
theme's full length (keep a sting); a second middle segment; graphics-only tags nobody can read in
time; the weakest monologue story.

## Energy across the episode

The pilot's curve is: black silence, a spike (lights, theme, applause), sustained high (monologue),
a change of texture (cool weather), loud (sports), building chaos (game, panel), the peak (song),
then down to warmth (goodnight) and a final small lift (gn post, applause) before the lullaby.

For the weekly order:

```
cold open   ▁▂▇   quiet ask, then the build and the theme spike
monologue   ▆▇▆▇  quick, steady laughs
middle      ▅▆█   a different texture: a thread performed, a panel's chaos, a game's escalation
song        ▆█▅█  the peak, in this week's genre, with a turn in the middle
goodnight   ▅▃▂▄  payoffs, then quiet for the answer, then gn lifts it, then out
```

Rules that follow from it:

- **Adjacent segments differ in texture.** Never two desk-graphics segments in a row in the same
  register. The pilot goes monologue (stand-up) → weather (smooth, presenter) → sports (loud) →
  game (escalation) → panel (chaos).
- **The biggest laugh is in the back half,** in the middle segment or the song, not the cold open.
- **The quietest moment is the answer at goodnight.** Everything before it should be louder.

## The BUILT counter, the standing runner

*BUILT DURING THIS EPISODE · n* sits top-left. Each "Built it." pops it and throws confetti.
Mechanics are in `packages/show/README.md` ("The BUILT counter"). Each segment's `from` is the
previous segment's final value; agree the chain in the pitch.

- **It starts at 0 every episode** and its first bump is the cold open's "Built it." The pilot's
  cold open hides the counter until that bump; keep doing that.
- **Up to about 9 bumps** in a five-minute episode (the pilot ran 15 in ten minutes, the same
  rate), and fewer whenever the week's builds aren't interesting: a bump that exists only to move
  the count is filler. Put the last one in goodnight, after Larry reads the tally, so the tally is immediately
  wrong ("fourteen things built" → the bot builds the gn checker → 15).
- **At least one segment has no bump.** The runner needs rests to stay funny. The pilot's song
  stacks four because the song's form is built on them; that is a reason, not a precedent.
- **Every bump needs a hypothetical before it.** "Somebody should...", "someday", "concept:", a
  card read aloud, a sentence that implies a wish. A bump with no wish in front of it is noise.
- **Vary the shape.** The pilot never does the same "Built it." twice. See the variation table in
  [joke craft](06-jokes.md#the-runner-built-it).
- **Record the episode total in the lore** ([lore](lore.md)). Goodnight may mention the all-time
  total once a series has one ("fifteen last week, nine tonight; we're slowing down").

## The episode runner

Each episode also has one runner of its own, drawn from the week. The pilot's is gm/gn:

| step | where | what |
|---|---|---|
| plant | weather | Samantha's real post, "Everyone says gm but nobody says gn :(", as the outlook: *Chance of gm: 100%. Gn is still rare.* |
| escalate | goodnight | Larry: "Now somebody should finally say gn." Sibyl tries it raw; the engine has no vowel (PRONUNCIATION ENGINE · RAW OUTPUT, NOT A WORD). The bot builds a site that checks: *HAS ANYONE SAID GN TONIGHT? NO.* |
| pay off | goodnight | "Everyone says gm. Nobody says gn." An elephant trumpets; GanWeaving's real *Good night, weirdos!* appears. "See? Somebody always says gn." / "So. gn, simcluster." The gn post goes viral on screen. |

In a five-minute episode: plant in the monologue or the middle segment, escalate once anywhere
(the song is a good place), pay off in goodnight. A week with no runner worth running has none. A runner that only appears twice is a callback; three times is a runner. Choose
something from the week that can be **said or shown in five words** each time.

## Callbacks

- **Within an episode.** "Humans are down four dollars" → Larry: "That was my four dollars." The
  song's verses recap the night's builds (the weather channel, the museum, the podcast with no
  name), which makes the song a musical callback reel. Plant a fact early that can be paid off by
  a different character later.
- **Across episodes.** Use the show's own lore ([lore](lore.md)): the E key on the desk, the
  crow, the shattered BIT bulb, Larry's 61, the podcast with no name. A cross-episode callback
  must parse for a first-time viewer. A taped-up BIT bulb works with no explanation. "As I said
  last week..." does not.
- **Not callbacks:** referring to community lore the episode never set up. That is an in-joke;
  see [choosing material](05-material.md#in-jokes-and-the-viewer-who-missed-the-week).

## Throws, buttons and cuts

Segments cut straight into one another. So:

- **Every segment ends on a button**: one short line, usually Larry's, at most six words, then a
  sting, rimshot or applause. "Thank you, Samantha. Bring a book, everybody." / "Do not say
  spin-off." / "norvid and Abel, everybody!"
- **Every segment hands off by name** when it changes presenter: "Samantha, take it away!" /
  "Here's Eppy Glottis, at the sports desk!" / "Back to you, Larry."
- **The first line of a segment tells a new viewer what it is**: "It's time for our game show,
  Built or Bit!" / "The simcluster has a weather channel now."

## Runtime arithmetic

- Speech runs about 2.5 to 2.8 words per second while someone is talking.
- Including laughs, music and builds, a segment carries about **1.6 to 2.2 spoken words per
  second** of running time (the pilot's monologue: 189 words in 85 s; the panel: 146 in 78 s).
- So a 70-second segment is about 110 to 150 words. Write to that, then render; the renderer's
  timeline tells you the truth.
- Music is expensive: the pilot's song carries 48 spoken words in 95 seconds.
- An episode is about 12 MB per ten minutes once built (see the architecture document's size
  budget). Five minutes is also the right length for the archive.

## Fixed and fresh

The owner names this as the central challenge of a weekly show: what stays the same so it is
recognisably the same show, and what changes so it isn't the same episode. What follows is a
**proposal for the owner to adjust**. The first rule sits above all of it, the frame included.

### The frame (stays, as a default)

The things a viewer should be able to count on. Each is kept unless it isn't interesting this
week; even then, its *shape* stays and its *content* is new.

- The name, the studio, the vector look, Larry hosting, the house cast and their attitudes.
- The cold open's shape: an Ask from this week, "Built it.", the theme hook, "And now... [new
  descriptor]... Larry... Nx!"
- The BUILT counter, starting at 0.
- A monologue.
- A song, in a new genre.
- Goodnight's shape: the tally, the question answered in the community's words, "gn,
  simcluster.", "Press E to leave.", the CRT power-down, credits over the skyline with Dee's
  lullaby (proposal: the lullaby is the frame's closing music and does not rotate).
- Chapter 9's labels and credits (these are not subject to the first rule at all).

### What rotates (must be new each week)

- The middle segment's format, and any second segment's.
- The song's genre and theme.
- Sibyl's descriptor, the cold open's Ask, the episode runner, the sincere beat's source.
- Guests, and how they appear (a thread, a panel, an interview).
- The "Built it." shapes (see [joke craft](06-jokes.md#the-runner-built-it)).
- One new credits gag and new chyron titles.

### What must not repeat

- A joke, or a reveal ("Wait. It's this show." happened once).
- An episode runner (a retired one may come back once, as a callback).
- A thread performed, an Ask post, a Sibyl descriptor.
- A song genre within eight episodes.
- The same middle format two weeks running.
- A guest two weeks running, unless the week's story is about them.
- The same "Built it." shape twice in one episode.
- The same kind of sincere beat (belonging, admiration, credit, welcome, kindness) two weeks running.
- More than two cross-episode callbacks in one episode: callbacks are frame-ish, and too many make
  the show insular.

### The mechanism

1. **The pitch writes `episodes/<id>/production/plan.json`** alongside `pitch.md`. The file is owned by
   the pipeline (`packages/writers-room`); the bible needs at least these fields:

   ```json
   {
     "id": "002-example",
     "week": "2026-W47",
     "question": "…",
     "segments": [
       { "id": "cold-open", "format": "ask", "seconds": 25, "built": [0, 1] },
       { "id": "monologue", "format": "monologue", "seconds": 60, "built": [1, 2], "topChicken": "hit" },
       { "id": "middle", "format": "thread", "seconds": 65, "built": [2, 3] },
       { "id": "song", "format": "song", "genre": "sea shanty", "theme": "…", "seconds": 60, "built": [3, 5] },
       { "id": "goodnight", "format": "goodnight", "seconds": 40, "built": [5, 6] }
     ],
     "guests": [{ "handle": "…", "source": "thread", "segment": "middle", "repeatReason": null }],
     "runner": "…",
     "builtShapes": ["plain", "interrupting", "physical"],
     "descriptor": "…",
     "sincere": { "kind": "admiration", "source": "at://…" },
     "callbacks": ["SL-10"],
     "cut": [{ "what": "Changelog", "why": "only two of the five items had a turn" }]
   }
   ```

2. **`lore.md` keeps a rotation log**: one row per episode with formats, song genre and theme,
   guests and how they appeared, runner, "Built it." shapes, descriptor and sincere kind. The
   pilot's row is there.
3. **The pipeline checks `plan.json` against the log** and prints warnings: a genre used in the last
   eight episodes; a middle format used last week; a guest booked last week without a
   `repeatReason`; a reused runner, descriptor or thread; a repeated shape within the episode; the
   same sincere kind as last week; more than two callbacks. A warning is not a gate. The writer may
   override it with a reason in the pitch, and the reviewer sees both.

   One check is a gate, because it is the owner's rule and not a rule of thumb: **the song's genre
   must differ from the previous episode's.** The pipeline stops the pitch until it does.

Numbers such as "eight episodes" are starting points. Adjust them once the shelf and the archive
are bigger.

