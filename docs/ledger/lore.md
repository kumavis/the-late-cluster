# Lore and continuity

For reviewers and the project manager only. Writers, researchers and builders do not read this file.

This is the continuity file that used to be `docs/bible/lore.md`. It moved here on 19 November 2026,
when the workflow changed so that writers no longer see what the show has done. It records what the
aired episodes established: the show's own fiction, its running gags, the state the set was left in,
what the show learned about the community, and the cross-episode logs.

**How its purpose changed.** Under the first protocol a writer read this file to call back to it and
to keep continuity. Under the present workflow nothing here is material: the show does not lean on
its own history, and every entry is something the show has already done. A reviewer reads it to
recognise a callback, a returning gag or a returning prop in a new idea, which is a repeat unless it
is the episode's one turned item (see the [README](README.md)). Statuses such as "standing",
"active" and "available" below are kept as they were written, as a record of what the first
protocol told writers; they no longer license anything.

Two kinds of lore, kept apart:

- **Show lore** is the show's own fiction: what happened in the studio, what the characters said and
  did, what state the set is in.
- **Community lore** is what the show learned about the cluster from real posts. It belongs to the
  community. It must stay true, sourced and current, and every entry is subject to the
  [real-people rules](../bible/09-real-people.md). If a source is deleted or its author opts out,
  remove the entry (R11). It is a record of what the show has said about the community, not a source
  for new episodes: a new episode's facts come from that episode's research.

## How to append

- Only aired episodes add entries here. A draft that never aired keeps its entries in its own ledger
  file.
- Add entries at the end of the right section with the next id (`SL-`, `G-`, `CL-`, `E-`). Never
  renumber or delete, except for an opt-out; to mark something as turned or retired, say so and name
  the episode.
- Each entry: id, a one-line statement, the episode and segment that established it, and (for
  community lore) the source handle and date and a confidence: **known** (stated in a sourced post),
  **inferred** (a reasonable reading of the show or posts), **unclear** (not understood).
- Update "Set state" to the end state of the latest aired episode.
- Add one row to each log per aired episode. The rotation log is kept for the record; the tools now
  read each episode's `.json` file and the tracker instead.
- **A gap in the ids.** The ids SL-17 to SL-24, G-18 to G-20 and CL-18 to CL-25 were used by the
  self-check of an unaired draft and are listed, as never established, in
  [002-the-joke-nobody-built.md](002-the-joke-nobody-built.md). They are left unused here so that
  an id means one thing. The second aired episode's entries start at SL-25, G-21 and CL-26.

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

From the second aired episode (002-2026-w47, aired 21 November 2026):

- **SL-25** The show has a Bluesky account, `@latecluster.simcluster.tv`. Larry "finally got" it,
  read the handle twice, and found he is not in it. (002 bluesky-account)
- **SL-26** How the show is made, as the show told it on air: community, posts, review, scripts,
  review, scenes, show. This is the true account. It does not mention the pilot's fiction (SL-01)
  and does not contradict it out loud. (002 making-of-inward)
- **SL-27** Inside Larry's head there are lips, a jaw, a tongue and a velum: "That's everything in
  my head." Below it are five throats, each with a smaller, higher-voiced Larry at the far end,
  and at the bottom a bare vocal tract. "I open and shut." "I'm a mouth." When the camera came
  back up he burped: "Excuse me." (002 making-of-inward; compare SL-02)
- **SL-28** The standing invitation. Larry told the cluster: "You make this show", and "From now
  on, you can point": type the show's handle in a post. "Then we look where you point. That's
  all. No reply. No promise." (002 making-of-inward)
- **SL-29** What the show has said on air about its own making: builders draw the scenes ("The
  first kazoo looked like a submarine; I redrew it."); "Reviewers choose. Whoever makes a thing
  does not judge it."; the writer is "an AI agent with a short reading list" and "The show is not
  on it. By rule."; a tool heard "kazoo" as "clue"; the earlier reviewers "have seen everything
  the show has done. Nothing gets in twice." / "Except review."; the last run held 20,825 posts.
  (002 making-of-inward)
- **SL-30** A member's proof that fits in one post buried Larry's desk under a pile of half-slabs.
  From behind it: "It fits in a post." (002 riemann-breaking-news)
- **SL-31** Larry sat down to win a coffee simulator and was offered a refill. He took "this side.
  In gold." of a chess board on a Möbius strip, found it was every side, and resigned: "I like. I
  repost. I resign." (002 coffee, chess)
- **SL-32** Asked for the best it can do, the band has "doo" (Hy) and "wop" (Dee). Larry: "I only
  host." He has one note, a low D, and the band changed key to make it home. "I do what I can."
  (In the pilot he sang lead through a whole song.) Hy's lead was sung an octave down by a bass
  voice. (002 music-alt)
- **SL-33** The show's title was written by a pen plotter at the top of the episode, and Sibyl
  said only "This is The Late Cluster, with Larry Nx." (002 plotter)
- **SL-34** The episode ended on two lines: "Happy polyhedra week." / "Good night, everybody." The
  owner has ruled that ending on a few lines and a goodnight is frame; the words are new each
  week. (002 music-alt)

From the third aired episode (003-holiday-2026, a holiday special, aired 28 November 2026). It
is one segment, `walk`; the place is given with each entry.

- **SL-35** On a night with no show, the show's logo flickered like a sign whose power had been
  cut and went out, and the studio was switched off. Larry, off the air: "Oh, no show tonight,
  folks. Holidays and all." Nobody announced anything. (003 walk, the opening)
- **SL-36** Larry came in for his paycheck, which they would have mailed, because he likes the
  walk home. Off the air he wears a long taupe overcoat with the collar up and a gold scarf, no
  tuxedo and no bow tie. He asked the viewer to walk with him and took the pause for a yes.
  (003 walk, the studio)
- **SL-37** He keeps saying "I can't believe it", "The good way and the bad way. Same hour.",
  and has no joke for that: "I looked." So he has been reading old books, very old: "They
  couldn't believe it, either. Some wrote down what helped." Does it help? "Some nights."
  (003 walk, the street)
- **SL-38** His walk home: a full restaurant where he always stops to watch the one cook in
  back; a busker under a lamp who had started with nobody there and "never does get to the end
  of it"; a red sign on an empty road, where he waits anyway. (003 walk, the restaurant, the
  busker, the crossing)
- **SL-39** What he took from the old books. A story in the Zhuangzi, as he remembers it: a
  cook who has had one blade nineteen years and slows down at the hard part. A sentence of
  Rabbi Tarfon's, quoted exactly, which he found in a used book where somebody had already
  underlined it; "He meant the study of Torah. I'm a guest in that sentence."; he borrows it
  as "We don't have to finish it. We just don't get to quit." Asked what if none of it ever
  gets put right: "I don't know. I really don't." (003 walk, the restaurant, the crossing)
- **SL-40** He usually walks the last block on his own, with one line from an old Norse poem:
  "Rich did I feel when a comrade I found." Then: "That's the poem talking." / "Mostly."
  (003 walk, the last block)
- **SL-41** He lives on the top floor of a brick building and expected they would have started
  without him. At his door he told a Tamil couplet, as he remembers it: even with the food of
  immortality on your table, you don't eat while a guest stands outside. "So you see my
  position." The door was opened from upstairs. (003 walk, his door)
- **SL-42** The whole house cast eats at his table, off duty and in their own clothes, Sibyl at
  its head; his chair is gold and is kept for him; nobody had started. Pete spoke alone for the
  first time ("I counted you in twice."); Hy: "You took the long way."; Larry: "I had
  company."; Al: "Chair."; Sibyl: "The guest is served first. That is the rule." / "It's my
  house." / "It's still the rule."; Eppy: "And the ruling stands!"; Dee laughed. The viewer
  was given a chair and served first. The episode ended on the owner's lines: "It's a crazy
  mixed up world out there. Keep the ones that make you feel sane close." / "Stay warm, folks.
  Goodnight." (003 walk, the table)

## Running gags and catchphrases

Statuses are as written under the first protocol. Today every one of these is done.

- **G-01 "Built it." and the BUILT counter.** The bot's one line; the counter resets each episode.
  *Status: standing* (part of the frame, but like everything subject to the first rule). The bot's only
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
- **G-07 "claim."** norvid, with a CLAIM stamp on whatever was labelled. *Changed after 001:* the CLAIM
  stamp is the show's own prop and stays; norvid's puppet says "claim." only the way he uses it (R3),
  never as a reply to Larry.
- **G-08 "what else is like this"** norvid's catchphrase. *Retired as an answer to Larry's questions*
  (R4's occasion test); may be performed the way he uses it, asking for more things like something.
- **G-09 "good news, everyone!"** Abel opening an announcement; his contraption has always already
  built it. *Changed after 001:* only before his own real announcements, never as a reply.
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

From the second aired episode. No statuses: each belongs to that episode and is done.

- **G-21 "best i can do".** A member's phrase, performed; "The best we can do." as a button; then
  the song: "best we can do-wop", and "best you can do-wop" sung at the host and the viewer.
- **G-22 Larry left out, or small.** "I'm not in it." / "That's everything in my head." / "I open
  and shut." / "I'm a mouth." / "I only host." / "I do what I can." Three segments turn on it.
  With G-13 this is the character; the lines are done.
- **G-23 The host's manners.** Entered by his own camera: "Do come in." / "This way." / "Go on." /
  "You know the way." / "Excuse me."
- **G-24 The kazoo.** A guest's yowl that "sounded like a kazoo"; a builder's first kazoo that
  "looked like a submarine"; a tool that heard "kazoo" as "clue".
- **G-25 Review, twice.** "Nothing gets in twice." / "Except review."
- **G-26 "A member asked".** The host asks an unnamed member's real question as the setup of a real
  answer, or makes a member's remark as his own.
- **G-27 Gold is Larry's colour.** No gold in the handle; every square of the board gold.
- **G-28 The toast.** "Happy polyhedra week." The form fits any week the cluster names, so it is
  spent as a form.

From the third aired episode, the holiday special. No statuses: each belongs to that episode
and is done.

- **G-29 The logo going out.** The show's own logo, lit and alone on black from the first frame,
  flickering and dying. The episode's one turned item: in both earlier episodes the logo came
  up in the first seconds and the show began. It has now been at the top of all three.
- **G-30 The say-back.** The viewer never speaks; Larry turns, waits, and says our question
  aloud: "Does it help?" / "What if none of it ever gets put right?" / "Should you come up?"
  Also a yes taken in a pause, an unheard answer agreed with ("Yeah. Me too."), and a look
  answered ("No cars, I know. I wait anyway.").
- **G-31 The lit window.** A warm crowded room seen from the cold through glass: the
  restaurant, then the top window over his own door. Then we are let in.
- **G-32 An old text, then a dry line to get out from under it.** "That's the poem talking." /
  "Mostly."; "So you see my position."; "I'm probably saying that wrong."; "I'm a guest in
  that sentence."
- **G-33 "guest".** "I'm a guest in that sentence." / "you don't eat while a guest stands
  outside." / "The guest is served first."
- **G-34 Not finishing.** The busker's tune that stops one note short; "He never does get to
  the end of it."; "It is not thy duty to complete the work"; "We don't have to finish it."
- **G-35 Larry by himself, then counted in.** "I usually walk this block on my own." / "Just
  me" / "They'll have started without me.", answered by "Nobody has started." With G-13 and
  G-22 this is the character; these lines are done. It is the third ending in three episodes
  in which he is taken in, and the first in which the viewer is.
- **G-36 Two sets of footsteps.** His and ours, a little out of step, stopping whenever we
  stop.

## Set state (end of 001)

As written under the first protocol ("what the next episode inherits unless it says otherwise").
Today the next episode inherits none of it: the studio starts clean, and a prop from this table on
screen is a returning device.

| thing | state | default for the next episode |
|---|---|---|
| E key | on the desk, pressed at the end of 001 | on the desk, unpressed from the first segment (`set: { eKey: true }`); pressed at the end |
| crow | flew off over the credits | free to return; circling the skyline or absent |
| BIT bulb | shattered | still broken, or visibly taped up, if Built or Bit? is played again |
| round timer | frozen | the same |
| BUILT counter | 15 | resets to 0 |
| Abel's contraption | unveiled, running | can return with Abel |
| museum case | gone | |

## Set state (end of 002-2026-w47)

Nothing from the pilot's table was on screen: no key, crow, bulb, counter or contraption. The
studio started clean and the next episode starts clean again. This is where things stood on the
last frame, for a reviewer who needs to recognise a returning prop.

| thing | state at the end |
|---|---|
| Larry's desk | a card reading DOO propped in front of him like a nameplate, tipped once as a toast |
| the band's stand | two cards, DOO and WOP, under a label that ended as BEST YOU CAN DO |
| a row of tiles above the band | four credited tiles (a cat voice, a coffee simulator, a wheelie game, a mug) and Larry's DOO |
| the lights | a string of round bulbs, all on |
| earlier in the night, and gone by the end | a pen plotter's sheet with the show's title on it; a pile of half-slabs through the top of the frame; a depth gauge of seven words; a Möbius board, every square gold, with Larry's flag tipped over; three lamps reading LIKE, REPOST, RESIGN |
| the show's account | exists; its handle has been shown and read out on air |

## Set state (end of 003-holiday-2026)

The special left the studio in its first twenty-six seconds and never came back to it. Nothing
from either earlier table was on screen. This is where things stood, for a reviewer who needs
to recognise a returning prop or an episode that answers this one.

| thing | state at the end |
|---|---|
| the logo | lit at the first frame, flickered, out by three seconds, not drawn again |
| the studio | switched off: the set barely there, the sign and ON AIR dark and blank, one work lamp on a stand by the desk, which Larry clicked off as he left by the exit door |
| Larry's desk | a mug; a blank pay envelope leaned on it and left in his coat pocket |
| Larry | at his own table, top floor of a brick building, in a cardigan and a gold scarf, in a gold chair, turned back to his friends |
| the house cast | at that table, off duty: Sibyl at its head, then Eppy, Al, Dee, Hy, Pete |
| the viewer | in a second chair beside Larry's, served first, a plate with food on it |
| outside | snow, falling since the crossing; a busker still on his corner; a pedestrian sign showing WALK |
| the credits | plain cards on black, with no logo, no studio and no goodnight heading |

A later episode that opens by switching the studio or the logo back on is answering this one,
which is a callback.

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
  `@topchicken.bsky.social` posts each new result publicly ("New Top Chicken! @handle's post got 510
  likes"), with the all-time record and window statistics ("254/754 people posted; 3003 posts
  overall"); the show reports results from there. How often a new result is posted is to be
  confirmed. [known; supplied by the production, after the pilot]
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

From the second aired episode. Sources are as shown on screen in 002-2026-w47; the posts'
addresses are in that episode's `production/sources.json`.

- **CL-26** @samantha.wiki ran a live pen plotter on Saturday 14 Nov 2026 that wrote the replies
  to one post on paper (stream.place/samantha.wiki); the post had 88 replies at the scrape.
  @ver.ooo, waiting: "😬 the suspense while it tracks back to the left side". A reply from
  @sophie.engineering was a typed meow, and the maker answered "I expected nothing less ❤️".
  [known]
- **CL-27** The synth the show runs on comes with four animal voices, none a cat (as the show said
  it). @yonderdavid.bsky.social made a cat voice that joins a quartet (14 Nov 2026): "The original
  yowl sounded like a kazoo." His first choice of song was under copyright; asked how Weird Al
  works: "I believe parody is considered transformative in the relevant sense." (15 Nov) [known]
- **CL-28** On Friday 20 Nov 2026 a mathematician announced a believed proof of the Riemann
  hypothesis, and the cluster posted about it all day. The show gave the news in one sentence,
  named nobody, and said nothing of its own about the proof, the market or a cause.
  @davidcrespo.bsky.social posted a share-price chart with a line about "negative 80 billion
  dollars"; @moultano.bsky.social quoted it. Asked what a zeta function is, @shimmermathlabs.com
  called on @zetaof1.bsky.social, which replied that the function is too intricate to explain on
  Bluesky and that zeta at 1 diverges; she then proved that in one post. [known]
- **CL-29** Top Chicken, the result posted on Saturday 14 Nov 2026: cee (@cee.wtf), 201 likes; the
  all-time record, also cee's, 6,186; 2,648 posts that day, and 245 of 760 people posted. Two
  other winning scores that week were 440 and 366; the show named nobody for them. The window had
  six results. The scores come from @topchicken.bsky.social, which is a bot: its bio names a
  member as its manager and calls its rankings unofficial. The show says "The score is kept by a
  bot." and does not name the manager. This corrects CL-06, which treats that account as the
  game's own. [known]
- **CL-30** The cluster called the week of 16 Nov 2026 polyhedra week (who named it was not on
  air). @dave.9000ish.uk posted a polyhedral coffee simulator (17 Nov, polycoffee.9000ish.uk)
  under the words "best i can do"; @mokkenstorm.dev replied "very peaceful thank you".
  @shimmermathlabs.com posted a pink mug with a hand-drawn polyhedron ("polyhedron week comes in
  many forms", 18 Nov); @oszillate.bsky.social looked closer ("I believe you have been sold a
  sphenomegacorona, one of the classic adulterated bootleg icosahedrons"); "i want my money back!"
  (19 Nov). @samantha.wiki showed a mug as well, and Dave added a mug to the simulator. @cee.wtf
  made a wheelie game (yard-shift.cee.wtf). The last three were credited in the song and not
  shown. [known]
- **CL-31** @mokkenstorm.dev made ringmate, three-player one-dimensional chess on a Möbius strip
  (mobius.mokkenstorm.dev; the idea posted 17 Nov 2026). @minormobius.bsky.social, tagged under a
  picture of it: "That's awesome, I need a website tho", then "I like! I repost! But I'm not gonna
  love unless there's a link" (18 Nov). [known]
- **CL-32** Figures about the cluster that the show gave on air, from the production's fact sheet:
  248 accounts (drawn as lights, with no label) and 20,825 posts in the last scrape. [known]
- **CL-33** Unseen or unclear in the second episode, not to be built on: nobody at the studio has
  seen or heard David's videos, the real ringmate board or a game on it, or the simulator beyond
  its title screen and one photo; the plotter's page and the mugs are the studio's sketches from
  descriptions; what company the chart showed and why its price moved, which the show never said;
  whether the scoring bot's manager says so from their own account. [unclear]

From the third aired episode, the holiday special: nothing. It used no posts and said nothing
about the community, so the next id is still CL-34. Nothing the community posted after the
second episode's window has been on the show.

## Rotation log

One row per aired episode. Formats in rundown order. Guests with how they appeared; words by source
type (V verbatim, I interview, C catchphrase, P pastiche; P is no longer allowed, see R3).

| ep | formats | song genre | song theme | guests | runner | "Built it." shapes | Sibyl descriptor | sincere kind | Top Chicken |
|---|---|---|---|---|---|---|---|---|---|
| 001 | ask, monologue, simcluster-channel, top-chicken (full), built-or-bit, panel, song, goodnight | stomp-clap anthem | wanting a place to belong, in a scene that builds every want at once | Samantha (presenter; V, C), norvid (panel; V, C, P), Abel (panel; C, P), BorJev (cameo; V) | gm/gn | all eleven in the joke-craft table | "a man who is, technically, a throat" | belonging | rules only; crown on a blank card |
| 002 | demonstration (the open), desk bit, interview, breaking news, making-of, top-chicken, demonstration and thread, performed exchange and demonstration, music (with the goodnight) | doo-wop | handing over the little you have without knowing whether it is enough, and somebody working with it | ver.ooo (V), David (interview; V), davidcrespo (V), moultano (V), Amber (two segments; V), Dave (V), mokkenstorm (V), Minor Mobius (V). Read aloud with no puppet: Samantha, Sophie, cee, the scoring bot, zetaof1, oszillate | "best i can do" | none: the line, the bot and the counter did not appear | none; the announcer said only the title and the host's name | the invitation, in the show's own words: you make this show | one named result with its post read, the record and the gap, two nameless scores; no guess |
| 003 | one walk (a holiday special: the dark studio, the street, a restaurant, a busker, a crossing, his door, a table); no standing segment | none; a busker's wordless tune that stops one note short | none | none: nobody real appears. Four old texts instead: a rabbi's sentence and a line of a Norse poem quoted exactly, a Chinese story and a Tamil couplet told | none named; the viewer's question said back, three times | none | none; the announcer announced nothing, and the logo opened it by going out | the whole piece, in the show's own words and four old texts: keep going, and keep close the ones who make you feel sane | none |

## Experiment log

One row per aired episode: the experiment, its measure, and the verdict after air, written by a
reviewer from the reactions and the scorecard. A draft's experiment stays in its own ledger file.

| ep | experiment | success measure | before air (writer) | after air (retro: reactions, reviewer) | DNA change |
|---|---|---|---|---|---|
| 001 | the show itself (the formation) | that people want another | — | people seemed to like Larry Nx and the Formants (the owner's report); the trial's retro counted 48 posts about it in the first week and no opt-out requests, and found that its most-quoted guest line was invented words; the owner later judged its runner "done to death" | the DNA as first written; the house cast and the studio kept for now; on 19 Nov 2026 everything else the pilot did was removed from the frame |
| 002 | ten seconds with no words: in each segment made from a made thing, the thing is shown in use and delivers the segment's turn itself | the stretch is in the cues (10 s or more, no word, no crowd sound), and a cold viewer given only the stretch names the turn the writer named | (a reviewer, on the draft) built in three segments; cold viewers on stills, with no sound, named the turn in two of the three | partly run on air: two stretches aired (13.15 s and 11.87 s) and the third was cut in the owner's trim; the owner, watching cold, kept the two the viewers could name. Reactions from the audience: to be added from the next window | the joke chapter: a thing shown working may take the punch itself with no word said, when the turn is something it visibly does; once in an episode |
| 003 | four earnest minutes in the host's own words, outside the studio, with no posts, no guests and no audience; the owner set the form | shown once with sound to three people who have not read it: at least two give back the don't-have-to-finish, don't-get-to-quit idea and what happened when he got home, at least two name something that happens and not something they were told to feel, none calls it a speech, a lesson or a list; and its cues hold no laugh, applause or sting | (a reviewer, at the final review) built in whole; the cues hold no laugh, applause or sting; the three people were not asked. The owner watched three cuts and approved the last. Cold viewers on stills named the places and what was done in them and missed two pictures that carry meaning | ran on air in whole, 28 Nov 2026. Verdict so far: can't tell. The measure has not been run; reactions from the audience are to be added from the next window | none |

## Episode log

- **E-001 Pilot** (airDate 2026-11-13, week 2026-W46, 9:51). *Question:* what is the simcluster?
  *Answer:* CL-13, both cards. *Guests:* Samantha, norvid, Abel, BorJev (cameo). *Formats:* The Ask,
  Monologue, Simcluster Channel, Top Chicken Tonight, Built or Bit?, Panel, The Number ("Someday (Built
  It)"), Goodnight. *Runner:* gm/gn (G-05). *BUILT:* 15. *Introduced:* everything above. *Left open:*
  the crow's whereabouts; the BIT bulb; the podcast's name.
- **E-002 Eighty-Eight Replies, One Pen** (airDate 2026-11-21, week 2026-W47, 9:39.6; a video post
  from the show's account). *Question:* none. *Guests:* ver.ooo, David (the interview),
  davidcrespo, moultano, Amber, Dave, mokkenstorm, Minor Mobius. *Formats:* One Pen (a
  demonstration, with the open), The Handle, The Interview, Breaking News, The Making Of, Top
  Chicken, Larry Plays a Game, Chess for Three, Music ("Best We Can Doo-Wop", with the
  goodnight). *Runner:* "best i can do" (G-21). *BUILT:* no counter. *Introduced:* SL-25 to SL-34,
  G-21 to G-28, CL-26 to CL-33; the show's account and the standing invitation (SL-28).
  *Left open:* whether anyone points, and what the show does when they do; what the audience made
  of the two wordless stretches; the words of the next goodnight. *Nothing from E-001 returned:*
  no key, crow, bulb, counter, bot or stock line.
- **E-003 The Walk Home** (airDate 2026-11-28, a holiday special with no window, 4:26.7; a video
  post from the show's account, 27 November 2026 at 23:49 UTC). *Question:* none asked by the
  show; three asked by the viewer and said back. *Guests:* none; nobody real appears. *Formats:*
  one walk, no standing segment. *Runner:* none. *BUILT:* no counter. *Introduced:* SL-35 to
  SL-42, G-29 to G-36; no community lore. *Turned:* one item, the opening (G-29). *Left open:*
  whether the experiment's three viewers are ever asked; whether a special with nobody in it
  counts as the rest for those who spoke in E-002; the community's posts since E-002's window,
  which no episode has covered; how the archive lists a special; the Article 3 reading for
  long-dead thinkers, which the owner has not ruled on in so many words. *Returned from
  earlier episodes:* only the logo at the top, as the turned item. No guest, post, song,
  counter, key, crow, bot, handle or stock line.
