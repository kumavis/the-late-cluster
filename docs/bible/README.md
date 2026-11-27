# The Late Cluster: design bible

What a good episode of *The Late Cluster with Larry Nx* is, written for whoever researches, writes,
stages or reviews one. Read all of it at the start of every run. How an episode is made, stage by
stage, is in [`docs/WORKFLOW.md`](../WORKFLOW.md). The technical references are
`packages/show/README.md` (segments, the `show` API, shots, the kit) and
`packages/show/tools/README.md` (the script format, sounds, voices, pronunciation).

**Two layers.** [00-constitution.md](00-constitution.md) and [09-real-people.md](09-real-people.md)
are the constitution: short, fixed, changed only by the owner. Everything else is the show's DNA,
which is meant to move.

**This bible does not contain the show's past.** It teaches craft by principle and by constructed
examples, which are set in an invented allotment society so that nothing in them can be reused. It
says nothing about what earlier episodes did, and writers, researchers and builders do not look
that up. Reviewers hold that record and block what repeats.

---

## The show on one page

**The first rule: only include it if it's interesting** ([constitution](00-constitution.md), Article
1). It overrules everything here about structure, formats, order and length, the standing segments
included. Test anything, from one joke to the whole episode: is there a turn or a feeling you can
name in five words, could only this window contain it, would a viewer retell it? Chapter 9 decides
what is *allowed*; this rule decides what is *worth including*; material must pass both.

**What it is.** A weekly late-night talk show of about eight minutes about the Bluesky "simcluster":
tech, AI and builder posters who make things for each other in public. Every voice, song, laugh and
clap is synthesized; the performers are glowing vector heads on puppet bodies. Guests are puppets
playing real accounts' posting personas, labelled PUPPET · PARODY. A person approves every episode
before it is published.

**What it is about.** The community, not itself: what people in the cluster made, said and did since
the last episode. It is inside the thing it jokes about, and it is fond of it.

**The frame,** kept for now by the owner's choice: the name; the house cast; the studio; its vector
look. Nothing else is standing structure.

| | who | in one line |
|---|---|---|
| **Larry Nx** | host | a classic host who wants one normal segment and rarely gets it |
| **Sibyl Ant** | announcer | deadpan authority; states the rules; reads anything aloud exactly |
| **Hy Oid & The Formants** | house band | Hy, Al, Dee, Pete; a band made of voices, one step ahead of Larry |
| **Eppy Glottis** | sports desk | sportscaster gravity for tiny stakes |
| **guests** | real personas | cast fresh each week; speak only their own published words, in their own context |

**Standing segments,** drafted every week and selected on merit:

1. **The interview:** one community member, constructed for now from their public posts. Every answer
   is a real post; every question recreates what that post was replying to.
2. **Top Chicken:** the game's results in the window with the game around them: the board of
   winners, the record, streaks, the numbers, and the show's own guesses, labelled as guesses.
3. **Music:** a song whose form is its joke, on a theme from the window, in a genre the show has not
   just used.

The rest of an episode is the window's best material in whatever shape carries it. **Length:** aim
for about eight minutes; the ceiling is ten; there is no minimum.

**Four rules of the house** (DNA, with their reasons where they are written out):

- **Do not repeat the show.** A joke, runner, catchphrase, staging device, segment shape or guest
  from the previous episode is not used again, and the show does not lean on its own history. Write
  from this window's material and from the characters; do not reach for anything that feels like a
  signature; expect a reviewer to send back what turns out to have been done. One exception: a joke
  turned on its head, which only starts with a reviewer
  ([episode shape](03-episode-shape.md#do-not-repeat-the-show)).
- **Variety in people.** The show is about a community, not about its own regulars. Fresh people are
  preferred; nobody is barred for having appeared before; the same few should not be in too often.
  Someone who spoke in the previous episode does not speak in this one
  ([episode shape](03-episode-shape.md#variety-in-people)).
- **Television.** Nothing is put on screen for the viewer to read in silence. A post that is shown
  is performed or read aloud, or is short enough to take in at a glance
  ([direction](08-direction.md#television)).
- **Good material is made, shown and watchable.** Prefer things people made and showed, that the
  viewer can watch working, and that touch what the show itself is made of
  ([choosing material](05-material.md#what-good-material-looks-like)).

**Never break these** ([constitution](00-constitution.md), [real people](09-real-people.md)):

- Their words, in their context. A puppet of a real account says only that account's published
  words. No pastiche. A line may be staged only in an exchange that recreates the occasion it was
  said on; never made to answer what it was not answering, never stitched from unrelated
  conversations. House characters never paraphrase a real person's view.
- Persona, not person. Public posts in the cluster only. Nothing offline or personal. What is said
  in public is fair game unless they explicitly asked the show's account not to; a direct message
  is used only after its sender's yes.
- Real posts are exact, credited and sourced. Invented things use `.example` and look invented.
- The repost test: every real person in a joke would happily repost it. Small accounts only as
  heroes. Winners may be named; nobody else in a ranking ever is.
- The opt-out list is absolute. Nothing waits on a reply from anyone depicted. Health, grief,
  identity, politics, jobs, conflict: out of bounds.
- PUPPET · PARODY on every guest; a disclaimer at the first guest; personas in the credits.

**Craft in six lines:**

- Fact, turn, punch, picture. A joke is not finished until something lands on screen on its word.
- The voice says the setup and the punch; the screen shows the evidence and glance-sized extras.
- Real and specific beats invented and general. Small true numbers are the funniest.
- Show the thing working. Demonstrate, don't describe.
- Write for the engine: short lines, common words, names tested in the voice that says them, and the
  heard text of every line read.
- Sincerity, if the window offers it: once, short, quiet, in their words, spoken.

---

## The files

| file | for | covers |
|---|---|---|
| [00-constitution.md](00-constitution.md) | everyone | **constitution:** the first rule and its test; real people; their words in their context; honesty on screen; the owner's review; how the DNA changes |
| [01-premise.md](01-premise.md) | everyone | what the show is, who it is for, its point of view, what gives an episode a point, sincerity |
| [02-cast.md](02-cast.md) | writers, builders | the house cast: who they are, how they sound, what they want; casting a guest |
| [03-episode-shape.md](03-episode-shape.md) | writers, reviewers | the frame; the standing segments; length; building the rundown; do not repeat the show; variety in people; experiments and amending the DNA |
| [04-formats.md](04-formats.md) | writers, researchers, reviewers | the interview, Top Chicken and music in full; the shelf of other shapes |
| [05-material.md](05-material.md) | researchers, writers | what good material looks like; a content card; tests; finding the angle; in-jokes; thin windows |
| [06-jokes.md](06-jokes.md) | writers | joke craft: shape, voice and screen, specificity, escalation, anti-patterns, a checklist |
| [07-voices.md](07-voices.md) | writers | writing for the synth: reading what was heard, names, real words, respelling, pace, reactions, songs and the genre shelf |
| [08-direction.md](08-direction.md) | builders, writers | television; staging principles; the kit as a vocabulary; the vector look; reviewing frames |
| [09-real-people.md](09-real-people.md) | everyone | **constitution:** the rules for parodying real accounts, with reasons, and the reviewer's checks |
| [10-process.md](10-process.md) | everyone | what good looks like in research, brainstorming, drafting, assembling, staging and reviewing; the scorecard |

The constitution was written before the workflow changed, and it uses a few earlier lines of the
show's as its own worked examples of the real-people rules. Read those as examples of the rules.
They are not material, and nothing in them is to be used again.

---

## What the craft needs from the research

The rules in these chapters can only be followed if the research supplies:

- **per post:** address, exact text, author handle and display name, date, counts, whether it is a
  reply or a quote and of what, a description of any image or video;
- **per person:** follower count; whether and how often the show has featured them
  (`featuredPrevious`, `featuredEarlier`, `timesFeatured`); and the opt-out, bio and sensitivity
  checks on this window's posts;
- **the occasion of any post that might be performed:** the exact text, author and address of what it
  replied to or quoted, or one neutral line on the situation of a top-level post;
- **whole exchanges in order,** with restrictions and deleted or edited markers;
- **things made in the window:** what each is, its address, and what could be shown working;
- **interview candidates and Top Chicken,** as set out in [formats](04-formats.md);
- **new and smaller voices,** looked for on purpose;
- **reach figures** from the tool, labelled as an estimate;
- **flags, not silence:** anything out of bounds, asking not to be quoted, or not understood.
