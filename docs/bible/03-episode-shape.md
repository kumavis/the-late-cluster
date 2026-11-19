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

Every slot below is subject to [the first rule](00-constitution.md#1-only-include-it-if-its-interesting):
only include it if it's interesting. The owner's ceiling is **under ten minutes**. There is no
minimum: an episode is as long as its interesting material, and padding fails. Spoken words follow
from the length ([runtime arithmetic](#runtime-arithmetic)).

The five slots below are the default order. The pilot ran about ten minutes in eight segments, so an
episode may extend the order, usually with more middle segments, when more material passes the
first rule. The slot lengths are ranges from a short episode to a long one, guessed from the pilot.

| slot | length | format shelf ([formats](04-formats.md)) | must do |
|---|---|---|---|
| 1. Cold open | 15–55 s, including the theme (an 8 s hook, or the full theme and announce as in the pilot's 55 s) | The Ask | a real post from the week asks for something; "Built it."; counter 0 → 1; Sibyl's intro |
| 2. Monologue | 50–90 s | The Monologue | 3–6 of the week's stories, one joke each; the Top Chicken result as a quick hit when there is one; plant the episode runner |
| 3. Middle | 50–80 s each; one or more | the week's best of: The Thread, The Panel, Top Chicken Tonight (full), Simcluster Channel, Built or Bit?, Changelog, Field Guide, Live From the Build, The Interview (proposed) | the week's second-biggest story, ideally with real people in their own words |
| 4. Song | 45–95 s | The Number | a **new genre every episode**, carrying **the week's theme** |
| 5. Goodnight | 30–70 s | Goodnight | runner payoff; the tally; the question answered with the community's words; "gn, simcluster."; "Press E to leave." |

Five slots at their short ends make about three minutes; at their long ends, about six and a
half. Each extra middle segment adds about a minute. Add one only when it passes the
interesting test, never to reach a length, and stay under ten minutes. In a short episode, the theme
can shrink to a 2 s sting.

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
  cold open hides the counter until that bump, so it arrives with the first build.
- **At most about one and a half bumps a minute** (the pilot's rate: 15 in about ten minutes; a
  guess from one episode), and fewer whenever the week's builds aren't interesting: a bump that
  exists only to move the count is filler. Put the last one in goodnight, after Larry reads the tally, so the tally is immediately
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

Plant it in the first third (the monologue or the first middle segment), escalate once in the
middle (twice in a long episode; the song is a good place), pay off in goodnight. A short episode
with few segments may not have room for three appearances; then use a callback instead. A week
with no runner worth running has none. A runner that only appears twice is a callback; three times is a runner. Choose
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
- So an episode's spoken words are its running time in seconds times 1.6 to 2.2: about 380 to 530
  for four minutes, about 860 to 1,190 for nine. The pilot as a whole carried about 900 in 9:51 (1.5
  a second, with its long theme and song). These rates come from the pilot alone.
- An episode is about 12 MB per ten minutes once built; longer episodes spend the architecture
  document's size budget faster.

## Fixed and fresh

The owner names this as the central challenge of a weekly show: what stays the same so it is
recognisably the same show, and what changes so it isn't the same episode. All of it is DNA: a
**proposal for the owner to adjust**, and amendable by episodes as described in
[evolving the show](#evolving-the-show). The constitution's first rule sits above it, the frame
included.

### The frame (stays, as a default, for now)

The things a viewer should be able to count on. Each is kept unless it isn't interesting this
week; even then, its *shape* stays and its *content* is new. The frame is DNA, not law. **Larry
Nx, the Formants and the studio are kept for now, by the owner's choice, because people liked
them.** An episode may experiment with how they are used; retiring any of them is the owner's call.

- The name, the studio, the vector look, Larry hosting, the house cast and their attitudes.
- The cold open's shape: an Ask from this week, "Built it.", the theme hook, "And now... [new
  descriptor]... Larry... Nx!"
- The BUILT counter, starting at 0.
- A monologue.
- A song, in a new genre.
- Goodnight's shape: the tally, the question answered in the community's words, "gn,
  simcluster.", "Press E to leave.", the CRT power-down, credits over the skyline with Dee's
  lullaby (proposal: the lullaby is the frame's closing music and does not rotate).
- The constitution's labels and credits (Article 4: these are not DNA and never rotate).

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

1. **The pitch writes `episodes/<id>/production/plan.json`** alongside `pitch.md`. The pipeline
   owns the schema; the example and the fields the bible relies on are in
   [process](10-process.md#stage-2-pitch).
2. **`lore.md` keeps a rotation log**: one row per episode with formats, song genre and theme,
   guests and how they appeared, runner, "Built it." shapes, descriptor and sincere kind.
3. **The pipeline checks `plan.json` against the log.** A repeated song genre against the previous
   episode is refused; the other repeats print warnings: a genre used in the last eight episodes, a
   middle format used last week, a guest booked last week without a `repeatReason`, a reused runner,
   descriptor or thread, a repeated shape within the episode, the same sincere kind as last week,
   more than two callbacks. The writer may answer a warning with a reason in the pitch; the reviewer
   sees both.

Numbers such as "eight episodes" are starting points. Adjust them once the shelf and the archive
are bigger.

## Evolving the show

The constitution says *that* every episode amends the DNA. This is *how* to do it well.

### The retro, and keep / change / experiment

Every pitch starts by looking back: the previous episode's `plan.json` and
`production/dna-amendments.md`, its scorecard, the reviewer's notes if the pipeline carries them,
and the digest's "About the show" section for how the community reacted. Then it writes down what
it **keeps**, what it **changes** and why (each change motivated by the retro or the week, at most
two), and **one experiment**. The previous episode's experiment gets its after-air verdict in the
[experiment log](lore.md#experiment-log).

### A good experiment

- **One variable.** Change one thing and hold the rest, or you can't tell what worked.
- **Sized to an episode.** One segment, one element, one habit; reversible next week.
- **Stated in advance,** in `plan.json`, with a success measure someone other than the writer could
  check: "people quote the Thread's last line back in replies", not "it's funnier".
- **Judged honestly.** "Didn't work" and "can't tell" are results. Record them.
- **Never constitutional.** An experiment can't relax any article of the constitution or chapter 9, including the show's own review.

Good: "No monologue; Sibyl reads the week as release notes instead. Success: the reviewer scores B2
at 2 and the next digest's reactions mention the changelog." Bad: "Make the panel better" (no
measure). Bad: "New format, new character and no BUILT counter" (three variables).

### Evidence

In order of weight: what the community said in the next digest's "About the show" (replies,
quotes, lines repeated back, requests, complaints; silence is weak evidence either way); the
reviewer's notes; the scorecard rows the experiment touched. Engagement numbers are a tiebreaker:
popular is not interesting. One good reaction means "try it again"; the same signal twice is a
pattern.

### When a result changes the DNA

- **Change the DNA** when an experiment worked and would work in another week, when it worked twice,
  or when it showed a rule was wrong. Edit the chapter where the rule lives, in this episode's pull
  request, and list the edits in `production/dna-amendments.md`. Keep the edit small: a sentence, a
  row, a format card.
- **Keep it a one-off** when it worked because of this week's story, or the evidence is thin. Note it
  in the experiment log so a later week can try it again.

### Retiring things

Delete the text from the DNA in the episode's pull request and record what, when and why in
[lore](lore.md); git history keeps the original. Specifically:

- **a format:** delete the card and add one line under "Retired" at the end of the formats chapter,
  so nobody reinvents it by accident;
- **a runner or gag:** set its lore status to retired, with the episode; one callback later is fine;
- **a recurring guest:** stop booking them and mark the lore entry. Never announce on air that a real
  person's persona is retired;
- **a DNA rule:** delete it and say in `dna-amendments.md` what it was protecting, and check that the
  constitution still covers that;
- **the house cast and the studio** are kept by the owner's choice; an episode may propose retiring
  something, and the owner decides.

### Two ways to fail

- **Drift: becoming a different show by accident.** Signs: changes with no stated reason, more than
  two a week, the frame changed without an experiment, the one-page version in the
  [README](README.md) no longer describes the episode. Guard: every retro checks the one-page version
  against the last episode; if they disagree, either the episode or the README is wrong, and the pull
  request says which.
- **Ossifying: remaking the pilot.** Signs: cosmetic experiments, three episodes without a DNA edit, a
  growing inheritance list, every format from the pilot's shelf, jokes that rhyme with the pilot's.
  Guard: one real experiment every episode, and at least one experiment in every four aimed at the
  register below.

### Inheritance

By default the writer cannot read earlier episodes' source. To carry something forward (a segment's
direction, a prop, a script structure), name it in `plan.json` under `inherit` with a reason; the
pipeline copies exactly those files to `production/inherited/<from>/<path>` as read-only reference.
Adapt, don't paste. Usually the list is empty. A file inherited by two episodes in a row probably
belongs in the studio.

### The studio earns its contents

A prop, shot or helper goes into the shared studio only once a second episode needs it; until then
it lives in the episode that made it. The pilot's single-use props (the limbo bar, the podium, the
weather map kit and others) are in the studio today: a known exception to tidy later, not precedent.

### Rules that rest only on the pilot

These were inferred from one episode and are the first candidates for challenge. When an experiment
tests one, mark it here ("held in NNN" or "changed in NNN") in that episode's pull request.

| rule | where | status |
|---|---|---|
| five slots in this order; the song before goodnight | this chapter | untested |
| the Ask with "Built it." as the cold open | 04, format 1 | untested |
| Sibyl's "Larry... Nx!" intro and the theme hook | this chapter | untested |
| at most about 1.5 BUILT bumps a minute; one segment rests | this chapter | untested |
| slot lengths (cold open 15–55 s, monologue 50–90 s, middle 50–80 s, song 45–95 s, goodnight 30–70 s) | this chapter | untested |
| 1.6–2.2 spoken words per second of running time | this chapter | untested |
| about one to one and a half stories per minute | 05 | untested |
| fact, turn, punch, picture; every graphic carries a tag | 06 | untested |
| buttons of six words or fewer, mostly Larry's | this chapter, 06 | untested |
| one reaction sound per joke; three or four big laughs | 07 | untested |
| setups quick, punches slow (rate 1.0–1.06 / 0.88–0.94) | 07 | untested |
| stamps as the house punctuation, about one per 20 s | 08 | untested |
| the sincere beat at goodnight, from real posts, under ~20 s | 01 | untested |
| "gn, simcluster." and "Press E to leave." as the close | 04, format 8 | untested |
| a guest built from four ingredients | 02 | untested |
| Larry as the loser; Sibyl overruled only by the bot | 02 | untested |
| the monologue's over-the-shoulder artefact framing | 04, 08 | untested |

Rules from the owner (the song standing and rotating, real words first, Top Chicken reported) are
not on this list: they are decisions, not inferences. The owner can still change them.

