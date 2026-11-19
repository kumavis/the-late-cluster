# The Late Cluster: design bible

What a good episode of *The Late Cluster with Larry Nx* is, written for a writer who has never
seen the show, human or model, and for the person who approves each episode. Read all of it at the
start of every weekly run. The technical references stay where they are:
`packages/show/README.md` (segments, the `show` API, shots, props) and
`packages/show/tools/README.md` (the script format, sounds, voices, pronunciation). The pilot, the
one episode that exists, is `episodes/001-pilot/`; this bible quotes it throughout.

Everything here is inferred from one ten-minute episode. Where a rule rests on a single example,
the text says so. When a weekly episode teaches us something, change the bible.

---

## The show on one page

**What it is.** A weekly late-night talk show, about five minutes long, about the Bluesky
"simcluster": tech, AI and builder posters who make things for each other in public. Every voice,
song, laugh and clap is synthesized by CHIMERA, a physical-model vocal synth; the performers are
glowing vector heads on puppet bodies. Guests are puppets playing real accounts' posting personas,
labelled PUPPET · PARODY. A model writes it from the week's digest; a person approves it.

**What it believes.** *In the simcluster, saying a thing and making it have collapsed into the same
act, and that is how these people tell each other they belong. The show laughs at the collapse and
means the belonging. It is its own evidence: somebody asked for it as a joke, and it got built.*

**The engine.** "In this town, a joke is a contract." Any wish said aloud gets built, usually before
the sentence ends. A website bot says "Built it." and the counter *BUILT DURING THIS EPISODE* goes
up.

**Who it's for.** The cluster first (they will see their own posts), then anyone who missed the
week, then the archive.

**The cast.**

| | who | in one line |
|---|---|---|
| **Larry Nx** | host | a classic host, six minutes old, who wants one normal segment and always loses |
| **Sibyl Ant** | announcer, judge | deadpan authority; her rulings get overruled by the bot |
| **Hy Oid & The Formants** | house band | Hy, Al, Dee, Pete; a tribute band, one step ahead of Larry |
| **Eppy Glottis** | sports desk | sportscaster gravity for tiny stakes; objects to hypotheticals being built |
| **the website bot** | builds it | says "Built it." and almost nothing else |
| **guests** | real personas | norvid, Abel, Samantha, BorJev so far; answer Larry in their own idiom |

**An episode** (4:30 to 5:30, about 500 spoken words):

1. **Cold open** (15–30 s + theme hook): a real post asks for something; "Built it."; "Larry... Nx!"
2. **Monologue** (60–80 s): four to six of the week's stories, one joke each, each with an artefact.
3. **Feature** (50–75 s): a story in a TV genre: weather, sports, game show, changelog, field guide.
4. **Guest** (60–80 s): one or two personas overrun Larry's format.
5. **Goodnight** (35–50 s): runners pay off; the week's question answered with a real post; "gn,
   simcluster."; "Press E to leave."

**Never break these** ([real people](09-real-people.md)):

- Persona, not person. Public posts in the cluster only. Nothing private, offline or personal.
- Guests say only their own posts, their catchphrases, or obvious pastiche of a format they use. Never
  an opinion they haven't posted.
- Real posts on screen are verbatim, credited, sourced and in context. Invented ones use `.example`.
- The repost test: every real person in a joke would happily repost it. Small accounts only as heroes.
- The opt-out list is absolute. Health, grief, identity, politics, jobs, conflict: out of bounds.
- PUPPET · PARODY on every guest; a disclaimer at the first guest; personas in the credits.

**Craft in six lines:**

- One question per week, asked in jokes in two or more segments, answered at goodnight in the
  community's own words ([premise](01-premise.md)).
- Fact, turn, punch, picture. A joke isn't finished until something lands on screen on its word
  ([jokes](06-jokes.md), [direction](08-direction.md)).
- The voice says the setup and the punch; the screen carries the tags, the numbers and the proof.
- Real and specific beats invented and general. Small true numbers are the funniest.
- Write for the engine: short lines, common words, no punch on a word it can't say ([voices](07-voices.md)).
- Sincerity once, short, quiet, sourced, then a gentle laugh.

---

## The files

| file | covers |
|---|---|
| [01-premise.md](01-premise.md) | what the show is, who it's for, the thesis and its evidence, what gives an episode a point, earning the sincere moment |
| [02-cast.md](02-cast.md) | every house character and recurring guest; how to turn a posting persona into a puppet |
| [03-episode-shape.md](03-episode-shape.md) | the pilot's and the weekly running order, what to cut, energy, the BUILT counter, runners, callbacks, runtime |
| [04-formats.md](04-formats.md) | the shelf: eight established formats and four proposals, each with a beat template |
| [05-material.md](05-material.md) | reading the digest: what is interesting, meaningful or merely popular; angles; in-jokes |
| [06-jokes.md](06-jokes.md) | joke craft for this show; the pilot's best and weakest jokes; anti-patterns |
| [07-voices.md](07-voices.md) | writing for the synth: word choice, `as` respellings, pace, captions, laughs, songs |
| [08-direction.md](08-direction.md) | staging principles, the visual vocabulary, puppet acting, the vector look |
| [09-real-people.md](09-real-people.md) | the rules for parodying real accounts, with reasons, and the reviewer's checks |
| [10-process.md](10-process.md) | the pipeline stage by stage, the pitch template, and the review scorecard |
| [lore.md](lore.md) | the living continuity file: show lore, running gags, set state, community lore, episode log |

---

## What the bible assumes the digest provides

The writer has the digest and this bible, nothing else. The bible's rules need these from
`data/weeks/<week>/digest.{md,json}`:

- **Per post:** URI and web URL, verbatim text, author handle and display name, date, like, repost,
  reply and quote counts, whether it is a reply or quote and of what, image alt text, and links.
- **Per author:** follower count (for the small-account rule) and whether the author is a recurring
  guest.
- **Thread context** for any post likely to be quoted: its parent and a few replies.
- **The opt-out list already applied,** plus flags for posts or bios that ask not to be quoted or
  clipped, and posts addressed to the show's account.
- **Sensitivity flags** for the out-of-bounds topics, so the writer doesn't have to find them alone.
- **Things built this week:** posts that link a new site, repo, tool, bot or project, with the link.
- **Recurring phrases and coinages,** "X week" declarations, and first posts of anything that spread.
- **Community games and metrics** if they are public: Top Chicken results, the Simcluster Channel's
  forecasts, prediction-market numbers.
- **Reactions to the show** (replies to and posts about last week's episode), for corrections and
  opt-outs.
- **The recurring guests' own posts this week,** so their personas come from current material.
