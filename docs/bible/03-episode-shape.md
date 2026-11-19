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

Target **4:30 to 5:30**, five segments, about 450 to 550 spoken words.

| slot | length | format shelf ([formats](04-formats.md)) | must do |
|---|---|---|---|
| 1. Cold open | 15–30 s, plus an 8 s theme hook | The Ask | a real post from the week asks for something; "Built it."; counter 0 → 1; Sibyl's intro |
| 2. Monologue | 60–80 s | The Monologue | 4–6 of the week's stories, one joke each; plant the episode runner; one "Built it." at most |
| 3. Feature | 50–75 s | one of: Simcluster Channel, Top Chicken Tonight, Built or Bit?, Changelog, Field Guide, Live From the Build | the week's second-biggest story in a TV genre; a contrast of texture with the monologue |
| 4. Guest | 60–80 s | The Panel, or a one-on-one / remote | one or two real personas; their idiom overruns Larry's |
| 5. Goodnight | 35–50 s | Goodnight | runner payoff; the tally; the question answered with the community's words; "gn, simcluster."; "Press E to leave." |

A **song** replaces the feature or the guest when the week has a song-shaped story (a dream, a
list, an anthem, a thing everybody did at once). Budget 45 to 70 seconds. At most one episode in
three.

### What is load-bearing, what to cut

Load-bearing every week:

- **The Ask and the build** in the cold open. It restates the show's engine for a new viewer in
  ten seconds and starts the counter.
- **Sibyl's "Larry... Nx!"**, a five-second identity beat. Proposal: keep "And now..." and
  "Larry... Nx!" fixed and change the descriptor between them every week, the way the pilot's
  "a man who is, technically, a throat" did. The descriptor is a free joke slot about the week.
- **The monologue**, because that is where the week's stories get covered.
- **One real guest.** Without a persona from the cluster on stage, it is a show about the
  cluster, not of it.
- **The question and its answer** at goodnight, then gn and Press E. This is the ritual close.

Cut, in this order, when you are long:

1. The theme's full length and the guest-list announce (keep the 8 s hook, or a 2 s Formants sting).
2. A second guest. One well-used persona beats two thin ones.
3. Graphics-only tags you can't read in time.
4. The feature, if the monologue and guest already carry the week.
5. Never cut goodnight below the question, the answer card and gn.

## Energy across the episode

The pilot's curve is: black silence, a spike (lights, theme, applause), sustained high (monologue),
a change of texture (cool weather), loud (sports), building chaos (game, panel), the peak (song),
then down to warmth (goodnight) and a final small lift (gn post, applause) before the lullaby.

For five segments:

```
cold open   ▁▂▇   quiet ask, then the build and the theme spike
monologue   ▆▇▆▇  quick, steady laughs
feature     ▅▆▅   a different texture: cool, or loud, or game-show escalation
guest       ▆▇█   chaos rising to the episode's biggest laugh
goodnight   ▅▃▂▄  payoffs, then quiet for the answer, then gn lifts it, then out
```

Rules that follow from it:

- **Adjacent segments differ in texture.** Never two desk-graphics segments in a row in the same
  register. The pilot goes monologue (stand-up) → weather (smooth, presenter) → sports (loud) →
  game (escalation) → panel (chaos).
- **The biggest laugh is in the back half,** in the guest segment or the song, not the cold open.
- **The quietest moment is the answer at goodnight.** Everything before it should be louder.

## The BUILT counter, the permanent runner

*BUILT DURING THIS EPISODE · n* sits top-left. Each "Built it." pops it and throws confetti.
Mechanics are in `packages/show/README.md` ("The BUILT counter"). Each segment's `from` is the
previous segment's final value; agree the chain in the pitch.

- **It starts at 0 every episode** and its first bump is the cold open's "Built it." The pilot's
  cold open hides the counter until that bump; keep doing that.
- **Budget 5 to 9 bumps** in a five-minute episode (the pilot ran 15 in ten minutes, the same
  rate). Put the last one in goodnight, after Larry reads the tally, so the tally is immediately
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

In a five-minute episode: plant in the monologue or the feature, escalate once anywhere, pay off
in goodnight. A runner that only appears twice is a callback; three times is a runner. Choose
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
