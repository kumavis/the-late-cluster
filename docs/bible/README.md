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

**The first rule: only include it if it's interesting.** It overrules everything else here about
structure, formats, running order and length: any slot, standing segment or runner can be cut in a
week where it isn't interesting, and a short episode of interesting things beats a full one with
filler. Test anything, from one joke to the whole episode: is there a turn or a feeling you can name
in five words, could only this week contain it, would a viewer retell it ([premise](01-premise.md#the-interesting-test))?
The [real-people rules](09-real-people.md) decide what is *allowed*; this rule decides what is
*worth including*; material must pass both. This rule only ever removes things.

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

**An episode** (about five minutes or less, about 420 to 520 spoken words; every slot a default,
not a requirement):

1. **Cold open** (15–25 s + theme hook): a real post asks for something; "Built it."; "Larry... Nx!"
2. **Monologue** (50–70 s): three to five of the week's stories, one joke each, each with an
   artefact; the Top Chicken result as a quick hit when there is one.
3. **Middle** (50–75 s): the week's best of a performed thread (real people word for word, the
   preferred way to have them on), a panel, a feature in a TV genre.
4. **Song** (45–70 s): standing; a **new genre every episode**, carrying **the week's theme**.
5. **Goodnight** (30–45 s): runners pay off; the week's question answered with a real post; "gn,
   simcluster."; "Press E to leave."

**Fixed and fresh** ([episode shape](03-episode-shape.md#fixed-and-fresh), a proposal): the frame
(the studio, the cast, the Ask, the counter, a monologue, a song, goodnight's ritual) stays as a
default; the middle format, the song's genre and theme, guests, runner and Sibyl's descriptor
rotate; jokes, reveals, runners and threads never repeat. `plan.json` and the rotation log in
[lore](lore.md) let the pipeline check it.

**Never break these** ([real people](09-real-people.md)):

- Persona, not person. Public posts in the cluster only. Nothing private, offline or personal.
- Real words first: a guest's own posts (best, a whole thread performed word for word), then
  answers they gave the show (proposed), then catchphrases; format pastiche last and sparing. Never
  an opinion they haven't posted.
- Real posts on screen are verbatim, credited, sourced and in context. Invented ones use `.example`.
- The repost test: every real person in a joke would happily repost it. Small accounts only as heroes.
  Winners may be named (Top Chicken); losers and runners-up never.
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
| [01-premise.md](01-premise.md) | the first rule and the interesting test; what the show is, who it's for, the thesis and its evidence, what gives an episode a point, earning the sincere moment |
| [02-cast.md](02-cast.md) | every house character and recurring guest; how to turn a posting persona into a puppet |
| [03-episode-shape.md](03-episode-shape.md) | the pilot's and the weekly running order, defaults and cuts, energy, the BUILT counter, runners, callbacks, runtime, fixed and fresh |
| [04-formats.md](04-formats.md) | the shelf: eight formats from the pilot, The Thread (verbatim reconstruction), and five proposals including bot interviews, each with a beat template |
| [05-material.md](05-material.md) | reading the digest: what is interesting, meaningful or merely popular; angles; in-jokes |
| [06-jokes.md](06-jokes.md) | joke craft for this show; the pilot's best and weakest jokes; anti-patterns |
| [07-voices.md](07-voices.md) | writing for the synth: word choice, `as` respellings, pace, captions, laughs, songs, and the genre shelf |
| [08-direction.md](08-direction.md) | staging principles, the visual vocabulary, puppet acting, the vector look |
| [09-real-people.md](09-real-people.md) | the rules for parodying real accounts, with reasons, and the reviewer's checks |
| [10-process.md](10-process.md) | the pipeline stage by stage (with a proposed mid-week interview stage), the pitch template, and the review scorecard |
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
- **Top Chicken results** as posted by `@topchicken.bsky.social`: winner handle, the winning post's
  URI and text, likes, the all-time record, the window statistics, and the R10/R11 checks on winner
  and post.
- **Whole threads in order**, suitable for verbatim performance: every post from root to leaf with
  author, timestamp, exact text, embeds and alt text, reply and quote restrictions, deleted or edited
  markers, and each participant's follower count and opt-out status.
- **Other community games and metrics** if they are public: the Simcluster Channel's forecasts,
  prediction-market numbers.
- **Interview replies** to the show's account, once that exists (proposed): the approved question,
  each opted-in reply, and a re-check that it is still live before the build.
- **Reactions to the show** (replies to and posts about last week's episode), for corrections and
  opt-outs.
- **The recurring guests' own posts this week,** so their personas come from current material.
