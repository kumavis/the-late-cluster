# Lore and continuity

A living file. It records what the show has established, so a writer can call back to it and
never contradict it. It is appended to after every episode.

Two kinds of lore, kept apart:

- **Show lore** is the show's own fiction: what happened in the studio, what the characters said and
  did, what state the set is in. The show owns it and may build on it freely.
- **Community lore** is what the show has learned about the cluster from real posts. It belongs to
  the community. The show may use it as setup, but it must stay true, sourced and current, and every
  entry is subject to the [real-people rules](09-real-people.md). If a source is deleted or its
  author opts out, remove the entry.

## How to append

- Add entries at the end of the right section with the next id (`SL-`, `G-`, `CL-`, `E-`). Never
  renumber or delete; to retire something, set its status and say in which episode.
- Each entry: id, a one-line statement, the episode and segment that established it, and (for
  community lore) the source handle and date and a confidence: **known** (stated in a sourced post),
  **inferred** (reasonable reading of the show or posts), **unclear** (don't build on it).
- Update "Set state" to the end state of the latest episode.
- Add one episode log entry per published episode.
- The reviewer approves lore changes with the episode's pull request.

---

## Show lore

- **SL-01** The show exists because a post asked *simcluster talk show when?* and a website bot built
  it six minutes later. (001 cold-open)
- **SL-02** Larry Nx is "a man who is, technically, a throat" (larynx). He was "six minutes old" at the
  top of the pilot, and his tuxedo drew itself on while he spoke. (001 cold-open)
- **SL-03** Six minutes is the show's unit of time from wish to ship: "6 minutes later"; "a dream lasts
  about six minutes. Then somebody ships it." (001 cold-open, song)
- **SL-04** Hy Oid & The Formants are a tribute band, because the simcluster is named after an
  algorithm Bluesky doesn't run. (001 monologue)
- **SL-05** The website bot once refused to rig a vote and is "the most ethical member of the scene."
  (001 monologue, drawing on CL-05)
- **SL-06** Larry scored 61 on the membership checker. His mom says he's a hundred. (001 monologue)
- **SL-07** Larry lost four dollars, play money, betting on the chicken. The "humans down four
  dollars" figure is show fiction, labelled FAKE on screen. (001 top-chicken)
- **SL-08** Larry was briefly *EXHIBIT 31 · TALK SHOW HOST, ASKING A QUESTION · c. 1962 · MIXED MEDIA
  (TUXEDO)*, in a glass case behind a velvet rope. (001 panel)
- **SL-09** On Built or Bit?, the red BIT bulb cracked once per build and shattered on the last card;
  the round timer froze. Sibyl's rule: "Built is real. Bit is a joke." (001 built-or-bit)
- **SL-10** The giant E key fell onto the desk when Sibyl ruled norvid's documentary title a bit. "I'm
  not touching that." / "Larry, it's how you leave." / "No one leaves the simcluster." At the end of
  the pilot Larry said "Press E to leave." and pressed it; the studio powered down like a CRT.
  (001 built-or-bit, goodnight)
- **SL-11** The crow burst out of Abel's contraption (norvid: "concept: talk show, but a giant crow
  hunts the host"), circled Larry, then the skyline, landed on the desk at goodnight, and flew off
  across the credits with a caw. (001 panel, goodnight)
- **SL-12** The skyline in the window is the simcluster. Larry called it "my beautiful city"; norvid
  corrected him: "buddy that's my freaking simcluster". (001 panel)
- **SL-13** The engine cannot say "gn" raw: no vowel. A bot-built site, *HAS ANYONE SAID GN TONIGHT?*,
  answered NO. Then Larry said "gn, simcluster." and the post went viral on screen. (001 goodnight)
- **SL-14** The studio's safety board, DAYS SINCE A P(DOOM) SONG TRENDED, flipped from 3 to 0. (001 song)
- **SL-15** BorJev is "opt-in only now." (001 panel)
- **SL-16** Things built during the pilot: 15. (001)

## Running gags and catchphrases

- **G-01 "Built it." and the BUILT counter.** The bot's one line; the counter resets each episode.
  *Status: permanent.* Rules for its use are in [episode shape](03-episode-shape.md). The bot's only
  other line so far is "You are in it." (001 song); keep it rare.
- **G-02 "In this town, a joke is a contract."** Larry's statement of the engine. *Active;* may be
  restated, sparingly, in a cold open.
- **G-03 "You're only here if you want to be."** Larry's welcome. *Active;* the show's consent ethic.
- **G-04 "And now... [descriptor]... Larry... Nx!"** Sibyl's intro. *Active;* proposed: a new
  descriptor every week. 001: "a man who is, technically, a throat".
- **G-05 Everyone says gm, nobody says gn.** 001's episode runner. *Resolved in 001* (Larry said gn).
  Don't rerun it as a runner; a single callback is fine.
- **G-06 "gn, simcluster." then "Press E to leave."** The pilot's close. *Proposed as the standing
  sign-off.*
- **G-07 "claim."** norvid, with a CLAIM stamp on whatever was labelled. *Active* while norvid appears.
- **G-08 "what else is like this"** norvid's answer to any question. *Active.*
- **G-09 "good news, everyone!"** Abel; his contraption has always already built it. *Active.*
- **G-10 "Hey! That was hypothetical!"** Eppy objecting to a build. *Active.*
- **G-11 "Yeah absolutely." / "Agreed yes yeah totally!"** Jevbot's one setting, and everyone catching
  it. *Active;* check CL-04 still holds before reusing.
- **G-12 The podcast with no name.** Credited as *Podcast name: [ field left blank ]*. *Active* until it
  gets a name (then that is a story).
- **G-13 Larry always loses.** 61, four dollars, the museum case, the crow. *Active.*
- **G-14 "Do not say spin-off."** Larry, after the show turned out to be a bit. *Available* as a callback.
- **G-15 "Stay clustered."** A Sibyl sign-off from the reference demo segment; never aired. *Available.*
- **G-16 Credits gags.** *Claims adjuster: A crow · Podcast name: [ field left blank ] · Exit
  strategy: The E key · No hypotheticals survived this production · No accounts were simclustered in
  the making of this programme.* *Active;* add one new credit gag per episode.
- **G-17 Chyron titles as jokes.** *Your host · six minutes old · A tribute band · Doing Jevbot · it has
  one setting · Back after this. If the crow allows it. · Brought to you by the letter E.*

## Set state (end of 001)

What the next episode inherits unless it says otherwise:

| thing | state | default for the next episode |
|---|---|---|
| E key | on the desk, pressed at the end of 001 | on the desk, unpressed from the first segment (`set: { eKey: true }`); pressed at the end |
| crow | flew off over the credits | free to return; circling the skyline or absent |
| BIT bulb | shattered | still broken, or visibly taped up, if Built or Bit? is played again |
| round timer | frozen | the same |
| BUILT counter | 15 | resets to 0 |
| Abel's contraption | unveiled, running | can return with Abel |
| museum case | gone | |

## Community lore

As of the pilot. Sources are as shown on screen in 001; confidence in brackets.

- **CL-01** "Simcluster" is named after SimClusters, a Twitter recommendation algorithm (c. 2020).
  Bluesky doesn't use it. [known; 001 monologue graphic]
- **CL-02** *Are you in the simcluster?* is a site by @shimmermathlabs.com that scores a handle; its
  footer says the score depends on who started the crawl and ends "The simcluster is liquid. So are
  you." People posted their scores anyway. [known]
- **CL-03** A book club in the cluster declined to start a Discord; several simcluster Discords exist
  anyway (@scythiamarrow.bsky.social, Oct 19: "in like three"). The book club's reading appears to be
  Piranesi. [known; the Piranesi link is inferred from the weather segment]
- **CL-04** Jevbot is a bot whose one setting is "yeah absolutely". Who runs it is not stated in the
  pilot. [known / operator unclear]
- **CL-05** A website-building bot (@buildthis.bisks.net) refused a request to rig a vote: "that's
  fraud against simcluster-guests, not a build." (Jul 31) The requester is not named and shouldn't be.
  [known]
- **CL-06** Top Chicken: the day's most-liked post gets the crown. Founded by @gracekind.net ("gm top
  chickens", 2024). The Grace Limit: contenders must have fewer followers than Grace (about 7K). A
  play-money prediction market exists, where a bot trader was up $19,865.83. [known]
- **CL-07** Simcluster University exists (since June). A simcluster podcast has twelve episodes and no
  name (as of the pilot). [known]
- **CL-08** norvid keeps a "terrible ideas file" (#6710: Simcluster Hamilton, 5 Nov 2026) and proposed
  PRESS E TO LEAVE as the title of "the inevitable simcluster documentary" (26 Oct 2026). [known]
- **CL-09** The Simcluster Channel (weather.samantha.wiki, launched 20 Oct 2026) forecasts the cluster's
  posts per hour with a small time-series model (Timestral 209M) on a Raspberry Pi 5. Launch forecast:
  high 177, low 29, peak around 4 pm ET. [known]
- **CL-10** The cluster declares themed weeks: catoid week, chimera vocal synth week (the pilot says both
  happened on one Monday). What a catoid is exactly is unclear; the show drew cat heads and one
  antlered "RAT-DEER?". [weeks known; catoid unclear]
- **CL-11** CHIMERA, the vocal synth that performs the show, is by jamesondh (MIT licence); it had its
  own week in the cluster. [known]
- **CL-12** "Everyone says gm but nobody says gn :(" (@samantha.wiki, 20 Oct 2026). @ganweaving.bsky.social
  does say it: "Good night, weirdos!" (2025-11-27). [known]
- **CL-13** "simcluster is how nerds say 'my friends'" (@shimmermathlabs.com, 2026-10-26). @prer.at
  (2023-04-11): you join the ingroup by acting like you are in it; no permissions. The second is about
  "the ingroup" in 2023, not a definition of the word. [known]
- **CL-14** BorJev (@borjev.bsky.social) is Abel's bot that posts other people's old posts; it was made
  opt-in after quoted people were being notified. Its public feed was empty when this file was written.
  [known]
- **CL-15** 39% of Abel's own posts (389 of 995, Aug 18 to Nov 12, 2026) were replies to norvid.
  [known; computed for the pilot]
- **CL-16** norvid, Nov 22 2024: "what simcluster is this and how do i escape". norvid, Jul 20 2026:
  "buddy that's my freaking simcluster". [known]
- **CL-17** Unclear references in the pilot, not to be built on until understood: Sibyl's opening
  "From a dense, walkable subgraph..." (may echo a community phrase); the "p(doom) song" (whether a
  real song trended); why an elephant trumpets for GanWeaving's gn; whether the hot dog toppings tier
  list came from the cluster; Larry's "run the museum, the archive" intro for norvid and Abel; the
  panel's subtitle "the Mayor and the Alligator" (norvid as mayor is inferred from CL-16). [unclear]

## Episode log

- **E-001 Pilot** (airDate 2026-11-13, week 2026-W46, 9:51). *Question:* what is the simcluster?
  *Answer:* CL-13, both cards. *Guests:* Samantha, norvid, Abel, BorJev (cameo). *Formats:* The Ask,
  Monologue, Simcluster Channel, Top Chicken Tonight, Built or Bit?, Panel, The Number ("Someday (Built
  It)"), Goodnight. *Runner:* gm/gn (G-05). *BUILT:* 15. *Introduced:* everything above. *Left open:*
  the crow's whereabouts; the BIT bulb; the podcast's name.
