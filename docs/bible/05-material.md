# 5. Choosing the week's material

The writer gets `data/weeks/<week>/digest.md` (and `digest.json`, with post URIs and engagement)
and this bible. This file is how to turn the first into a pitch. The pitch itself is described in
[process](10-process.md#stage-2-pitch).

## Read the digest twice

1. **First pass: read everything, decide nothing.** Note anything that made you want to tell
   someone about it.
2. **Second pass: make a candidate list**, one line per story: what happened, who, the post URIs,
   the numbers, and whether there is an artefact (a site, a chart, an image, an object, a post
   worth showing).

Expect 15 to 30 candidates. A five-minute episode uses 6 to 9.

## Score each candidate

| test | question | why it matters |
|---|---|---|
| **Safe** | Does it pass every [real-people](09-real-people.md) rule? | A fail removes the story. No exceptions, no "but it's funny". |
| **Interesting** | Does it have a turn? A gap between what was said and what happened, a thing built from a joke, a rule that defeats itself, a number that is absurd, a coinage that spread. | A turn is what a joke is made of. No turn, no joke. |
| **Stageable** | Is there something to draw or show? | In this show a joke is not finished until something is built on screen. |
| **Explicable** | Can a viewer who missed the week get the setup from one line and one card? | See "in-jokes" below. |
| **Meaningful** | Does it say something about how the people here treat each other, or why they are here? | Candidates for the episode's question and its sincere answer. |
| **Popular** | Was it widely liked or reposted inside the cluster? | A tiebreaker, not a reason. |

A story makes the show if it is **Safe, Interesting, Stageable and Explicable**. The episode's spine
is the best story that is also **Meaningful**.

### "Merely popular"

These score high on engagement and low on everything else. Leave them out, or use them only for
the cluster's reaction if the reaction has its own turn:

- General news, AI lab announcements, platform policy, outside celebrities.
- Outrage and dunks, including quote-posts piling on someone (pile-on risk, and not the show's tone).
- A viral post whose joke is complete in itself. The show can't improve it and should not restate it.
- Arguments, callouts, drama between members. Never take a side; usually skip entirely.
- Anything popular because it is sad, frightening or personal.

### What the cluster's own habits give you

The pilot found its stories in recurring community behaviours. Look for this week's instances:

| habit | pilot instance | format it suits |
|---|---|---|
| someone says "someone should", and someone does | the fantasy league; the membership checker; Simcluster Hamilton | Built or Bit?, The Ask, any "Built it." |
| "X week" declarations | catoid week rolling into chimera vocal synth week | monologue, Changelog |
| projects that imitate an institution | the weather channel, Simcluster University, the unnamed podcast | Simcluster Channel, Built or Bit? |
| games and metrics | Top Chicken, the Grace Limit, a play-money market | Top Chicken Tonight |
| bots and agents as members | Jevbot, BorJev, the website bot's refusal | monologue, panel cameo |
| arguments about membership and naming | the checker, the Discords, "my freaking simcluster" | the episode's question |
| coinages and creatures | catoids, claims, the crow | Field Guide, weather districts |

## How many stories

For a five-minute episode:

- **1 spine story** that carries the question. It appears in at least two segments.
- **4 to 6 monologue stories**, one joke each (a second joke only for the strongest).
- **1 feature story** (or the feature is built from 3 to 5 small items).
- **1 guest**, whose material may overlap the spine.
- **1 runner** from the week (gm/gn was the pilot's).

Recurrence is good. A story that appears in the monologue, the feature and goodnight is a spine,
not a repeat.

## Finding the angle

For each story you keep, answer these until one produces a line:

1. **What is the gap?** Between the plan and the result ("The book club said no to a Discord. ...
   So now there are four Discords."), the label and the thing ("named after a Twitter algorithm.
   Bluesky doesn't even use it."), the rule and its author ("She founded the chicken. She cannot be
   the chicken.").
2. **What is the smallest true number?** Twelve episodes. Four Discords. Twenty-nine posts an hour.
   Real small numbers are funnier than invented big ones. (The pilot's "humans are down four
   dollars" is invented, and the board labels it FAKE; an invented number must be labelled.)
3. **What genre would take this seriously?** Weather, sports, a museum, a game show, a nature
   documentary, release notes, a courtroom, a safety board ("DAYS SINCE A P(DOOM) SONG TRENDED").
4. **Who in the cast cares most?** Eppy cares about hypotheticals. Sibyl cares about rulings. Larry
   cares about having a normal show. Give the story to the character it bothers.
5. **What would the bot build?** If the story contains a wish, the bot is the punchline.
6. **What is the reframe?** One word that recasts the fact: "tribute band", "contract", "exhibit".

## The "so what"

Write one sentence per kept story:

> *This is funny because ___, and it matters because ___.*

If the first blank is empty, cut the story. If the second is empty, the story can still be a
monologue joke but not the spine. If the second blank is the most interesting thing you wrote,
that story might be the episode's question.

Pilot examples, reconstructed:

- The membership checker: funny because it tells you not to trust it and everyone posted their
  score anyway; matters because everyone wants to know if they're in.
- Top Chicken's Grace Limit: funny because the rule disqualifies its own founder; matters less
  (a monologue or sports joke, not a spine).
- The 2023 ingroup post: not funny on its own; matters because it answers the night's question.
  It goes at goodnight, after the jokes have asked.

## In-jokes and the viewer who missed the week

- **The one-line setup rule.** Every joke's setup is parseable from one spoken line plus what is
  on screen, within about five seconds. "The simcluster is named after a Twitter algorithm."
  carries its own context. "Catoid week!" does not.
- **Two-thirds rule.** At least two-thirds of an episode's jokes work for a newcomer. The rest may
  be insider, but each must be short and should be visual (the weather map's district names,
  ticker lines, chyron titles): insiders read the second layer, newcomers see a map.
- **Never build a punchline on an unexplained reference.** Hy's "And we didn't even play upping my
  p(doom)." asks the viewer to know a song the episode never mentions; the safety board flipping
  to 0 rescues it. Don't rely on the rescue.
- **If you do not understand a reference, do not use it.** You can't check it is harmless, and you
  can't write a turn on it. The digest may not explain everything; that is fine.

## Freshness

- Check [lore](lore.md) and the last two episodes' `production/sources.json`. Don't re-cover a story
  unless it developed.
- The show's own lore is for callbacks. The community's lore is for setups. Neither is a story by
  itself.
- A recurring guest needs new material each time, from this week's posts.

## Thin weeks

Some weeks are quiet. Do not invent news, inflate a small story into a scandal, or reach outside
the cluster. Instead:

- Lean on a recurring format (Changelog, Top Chicken) that turns small items into a list.
- Make the quiet the question ("Where did everybody go this week?"), answered with a real post.
- Go shorter. A tight four-minute episode beats a padded five.
