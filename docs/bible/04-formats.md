# 4. Segment formats

A shelf of repeatable segments. Pick one per story. Each card gives the premise, the comic
engine, a beat template, what the format needs from the digest, its length, staging, the pilot
example, and how it goes wrong. Formats 1 to 8 are established by the pilot (each from one
example, so treat the templates as strong defaults, not law). Formats 9 to 12 are **proposals**.

Shot and prop names refer to `packages/show/README.md`. The pilot's segments are in
`episodes/001-pilot/segments/<id>/`; read the matching one before writing a format for the first
time.

---

## 1. The Ask (cold open)

- **Premise.** A post from the week asks for something. Time passes. A bot replies "Built it."
  Lights up on the studio.
- **Engine.** The show's thesis in ten seconds: a wish becomes a thing.
- **Beats.**
  1. Black screen. A post card types on (the ask). A clock or a timestamp jumps ("6 minutes
     later").
  2. The reply card: "built it." Bot says "Built it." Counter appears, 0 → 1, confetti.
  3. Lights. Larry reacts to whatever was built, in one or two lines.
  4. 8 s theme hook (or a sting). Sibyl: "And now... [this week's descriptor]... Larry... Nx!"
- **Needs.** A real post from the week that asks for or proposes something (ideally something
  that did get built, or that this episode will be). Fallback: an obviously fictional asker
  (handle under `.example`; see [real people](09-real-people.md)).
- **Length.** 15 to 30 s before the theme.
- **Staging.** Full-black overlay with `skeetCard`s and a clock; a flash when the lights come up;
  push in on Larry. The pilot draws his tuxedo on piece by piece while he talks: a joke that is
  only visual (he is being built too).
- **Pilot.** `cold-open`: *simcluster talk show when?* → "Built it." → "Oh. Oh no. We're on." /
  "Somebody asked for this show. As a joke." / "In this town, a joke is a contract."
- **Pitfalls.** Re-doing the pilot's meta ask ("talk show when?"). The ask should be this week's.
  An ask nobody would want built (a complaint) curdles the engine.

## 2. The Monologue

- **Premise.** Larry, standing, does four to six jokes on the week's stories. When a joke has a
  real artefact, the camera slides him to the left third and the artefact builds over his right
  shoulder.
- **Engine.** Fact, turn, punch, picture. The picture usually adds a second joke in text.
- **Beats.**
  1. Applause tail. Welcome line (one joke about the room or the week: "You're only here if you
     want to be.").
  2. Story jokes, each 2 to 4 lines: setup (fact, quick), turn (a reframing), punch (slow), then the
     artefact lands on the punch word and a stamp or split-flap tags it.
  3. One cutaway joke to Sibyl or the band (an impression, a unison line, a nod).
  4. One "Built it." at most (pop-up from below frame).
  5. A topper on the strongest story, then the throw: "We have a great show tonight. Stick around!"
- **Needs.** 4 to 6 stories, each with one concrete artefact: a number, a site, a post, a chart, a
  name. Verbatim post text for anything shown on a card.
- **Length.** 60 to 80 s.
- **Staging.** `mono` for setups, a slid-camera variant for artefacts (the pilot's `mono-side`),
  a push close for the punch, cuts to `band` or `podium` for cutaways. Larry glances at each
  graphic as it lands, then back to camera.
- **Pilot.** `monologue`: "Both weeks were on Monday." (split-flap CATOID WEEK struck through,
  then CHIMERA VOCAL SYNTH WEEK, stamp TOTAL DURATION: 1 DAY); "So we're a tribute band." (cut to
  the band nodding); the membership checker with its real footer; four Discords with a real reply
  card; Jevbot's one setting; the bot that refused to rig a vote.
- **Pitfalls.** A joke without an artefact (fill the shoulder with something real or don't use the
  framing). Setups longer than two lines. More than six stories.

## 3. The Simcluster Channel (a guest presents their own project)

- **Premise.** A guest who made something presents it in the TV genre it imitates, as a credited
  tribute. Larry reacts from a picture-in-picture.
- **Engine.** Genre vocabulary applied to community content: "two to three inches of assigned
  reading", "a Claims Advisory in Corvid Woods", "scattered catoids through the weekend".
- **Beats.**
  1. Larry's throw (two lines naming the project and its absurdity: "Naturally, it only forecasts
     itself.").
  2. Jingle (a 2-bar Formants tag, nothing said over it).
  3. The guest's real opener, verbatim, on a card as they say it.
  4. 3 to 5 genre items, each one week story translated into the genre, each drawn on the map.
  5. One exchange with Larry that triggers a build ("any chance of a website by morning?" /
     "Hundred percent." / "It shipped during that sentence.." / "Built it.").
  6. The real fact behind the project ("This forecast runs on a Raspberry Pi.."), "Back to you,
     Larry", Larry's button.
- **Needs.** A project from the week with a genre (a forecast, a leaderboard, a radio show, a
  museum, a zine), its real numbers, its maker's opener line, and the week's 3 to 5 stories to map
  onto it. If The Simcluster Channel itself is still running, the digest should carry its numbers
  for the week.
- **Length.** 60 to 75 s.
- **Staging.** `ots` with the guest in front of the window, `pip: 'larry'`. A header strip, a
  title card for the jingle, then the map or board does the work: districts named after community
  lore, fronts, advisories, a 5-day outlook. A credit line along the panel foot for the whole
  segment.
- **Pilot.** `weather`, a tribute to weather.samantha.wiki: high 177, low 29 posts per hour (real),
  the Piranesi front, catoids, "Chance of gm: 100%. Gn is still rare."
- **Pitfalls.** Parodying the project instead of celebrating it. Inventing numbers for it. Forgetting
  the credit. Giving the guest lines that aren't theirs or obvious genre pastiche.

## 4. Top Chicken Tonight (the sports desk)

- **Premise.** Eppy treats the cluster's games and metrics as a sports broadcast.
- **Engine.** Sports gravitas for tiny stakes, plus Eppy's protest when the bot ruins a
  hypothetical.
- **Beats.**
  1. Larry: "Some communities have sports. This one has a chicken." Throw.
  2. Logo sting (whoosh, Pete's beat, a cluck).
  3. 3 or 4 boards, each one item: TONIGHT'S CROWN, STANDINGS, RULES DESK, THE LINE. Each board:
     Eppy states it, a graphic lands, one tag line.
  4. One "Built it." on a hypothetical Eppy floats ("Somebody should start a fantasy league." /
     "Built it." / "Hey! That was hypothetical!").
  5. "That's sports! Back to you, Larry!" Larry's button calls back a number.
- **Needs.** The week's community games and numbers: Top Chicken results, prediction markets,
  streaks, records, rule changes. Exact figures and their sources.
- **Length.** 55 to 70 s.
- **Staging.** `sports` with a ticker (the ticker carries six more jokes for free), `podium3`,
  `limboBar`, split-flap numbers, a telestrator circle and arrow ("NUMBER GO UP"), a stamp FINAL.
- **Pilot.** `top-chicken`: the Grace Limit ("She founded the chicken. She cannot be the
  chicken." with the founder bonking the limbo bar); bot trader +$19,865.83, humans -$4.00, "All
  play money. Still sad." → "That was my four dollars."
- **Pitfalls.** Naming an ordinary account as a loser. Using follower counts as status unless it
  is the game's own published rule. A board with no tag.

## 5. Built or Bit? (the game show)

- **Premise.** Larry reads idea cards from the week; Sibyl rules BUILT (it's real) or BIT (it's a
  joke); every BIT gets built by the bot before the red bulb finishes lighting.
- **Engine.** Pattern, then escalation of the pattern's break. The audience learns the rule and then
  enjoys it being broken faster and bigger.
- **Beats.**
  1. "It's time for our game show, Built or Bit!" A gag about the set ("Somebody already built the
     buzzer." / buzzer). Rules in two lines.
  2. Two genuinely real things, ruled BUILT, each with a dry tag from Sibyl ("You're already
     enrolled." / "It doesn't have a name.").
  3. Three BITs that get built, each faster or bigger: after the ruling ("That took four
     seconds!"), during the ruling ("Bit," / "Built it." / "She didn't even finish!"), as a physical
     object (the E key falls on the desk).
  4. The last card turns on the show or the room. Button.
- **Needs.** Six ideas from the week: two real projects (with a fact each), three or four joke
  posts that proposed something (verbatim, with author and date if shown as a post card), one
  that can turn into a physical prop or a reveal.
- **Length.** 60 to 70 s.
- **Staging.** A wide game shot with Larry, Sibyl at a stand, the bot at the desk end, a scoreboard
  tower with BUILT/BIT bulbs, cards flipping in at the top to show what got built on the back.
  Camera shake on the big moments. The pilot's BIT bulb cracks once per build and shatters on the
  last.
- **Pilot.** `built-or-bit`, ending "Wait. It's this show." / "Do not say spin-off." then blackout
  on the glowing E key.
- **Pitfalls.** The meta ending ("it's this show") was the pilot's; do not repeat it. Cards that
  are not from the week. More than six cards.

## 6. The Panel

- **Premise.** Larry interviews one or two guests with old-school talk-show questions. The guests
  answer in their own idiom, and their idiom takes over the segment.
- **Engine.** A collision of formats: the classic interview versus the posting persona. Every
  question gets filed, labelled, turned into a concept and built.
- **Beats.**
  1. Intro at the desk; entrance with applause and each guest's creature call.
  2. A greeting that gets a catchphrase as its answer ("norvid! Thank you for coming." / "claim.").
  3. A data fact about a guest, shown as a chart (the habit), answered by their own line.
  4. The big question ("In your own words, what is the simcluster?"), answered with a catchphrase
     that dodges it ("what else is like this"). Larry: "That's... another question."
  5. Two builds: guest A proposes, guest B's machine already made it, the bot confirms. Each build
     is staged on Larry (in a museum case; hunted by a crow).
  6. A cameo (a pop-up from behind the couch).
  7. The money line: a real post that lands perfectly in context ("Ah, look at that skyline. My
     beautiful city." / "buddy that's my freaking simcluster").
  8. "norvid and Abel, everybody!" and a final catchphrase.
- **Needs.** One or two guests who passed the real-people check, each with a verbal signature, a
  habit with a number, a creature or object, and one real post that can answer a question Larry
  might ask. Their posts from the week.
- **Length.** 60 to 80 s.
- **Staging.** `panel` for two-shots, a seat-framed close-up for each catchphrase, `ots` with
  `pip` for the data chart, a pulled-back camera so a build and Larry share the frame, stamps
  slammed on whatever was labelled.
- **Pilot.** `panel`: "claim." stamped on Larry's chest; the 39% pie with the alligator under the
  slice; Exhibit 31 (*TALK SHOW HOST, ASKING A QUESTION · c. 1962 · MIXED MEDIA (TUXEDO)*); the
  crow released from the contraption.
- **Pitfalls.** Guests who only answer Larry and never interact with each other (the pilot's main
  weakness: give the guests one exchange of their own). Lines longer than ten words in a guest's
  mouth. Any line a guest has not posted that expresses an opinion.

## 7. The Number (a song)

- **Premise.** One joke told as a song, in a genre that suits it. The pilot's: an earnest "someday"
  anthem in a scene where nothing stays hypothetical.
- **Engine.** The song's form is the joke's form. The pilot splits the music at stop bars so the bot
  can say "Built it." in the silences; each "someday" dream gets built a bar after it is sung.
- **Beats.**
  1. Larry's intro: two lines that set the joke ("Folks, in the simcluster, a dream lasts about six
     minutes. / Then somebody ships it.") and a throw ("Better sing it fast.").
  2. Hook, verse, chorus; a stop; the punch in the silence.
  3. Second verse, chorus, a doubt from the band (ARE WE?), a stop; a second punch ("Both of them?").
  4. Breakdown, lights down: the near-sincere turn ("Someday, maybe, someone will write us a song /
     made out of mouths, and we all sing along").
  5. The reveal in a stop ("Built it." / "When?" / "You are in it.").
  6. Last chorus with the lyric changed to the past tense; a solo tag that sets up one last punch.
  7. Button; band bow under applause.
- **Needs.** A story that is a list (things people wished for, built, said) or an anthem the
  cluster is already living. The verses should recap the week's stories and this episode's builds.
- **Length.** 45 to 70 s in a weekly (the pilot's is 95 s).
- **Staging.** `stage` shot, karaoke lyrics with a bouncing ball (caption bar hidden for sung lead
  lines), each verse's subject drawn as a small vignette and stamped BUILT IT, HEY! bursts on the
  shouts, stomp rings on Al, clap sparks on Pete, a spotlight for the breakdown.
- **Pilot.** `song`, "Someday (Built It)".
- **Pitfalls.** Lyrics that carry the jokes (sung words are the least intelligible thing the engine
  makes; put the jokes in the stops and on screen). A song with no structural joke. More than one
  song in three episodes. See [voices](07-voices.md#songs).

## 8. Goodnight

- **Premise.** Every runner pays off, the question gets its answer, Larry says gn, and leaves.
- **Engine.** Payoff. Almost nothing new is introduced here except the answer.
- **Beats.**
  1. "Well, folks, that's almost our show." A small visual payoff (the crow lands on the desk).
  2. The tally: "And the final count: n things built during this episode." Then the runner's last
     escalation and the episode's last "Built it.", which makes the tally wrong.
  3. The heart line: "We spent all night asking ___." The answer card(s), verbatim, held to read.
     One framing line. "Goodnight, friends." (or this week's equivalent).
  4. A gentle laugh: the episode runner's payoff.
  5. "So. gn, simcluster." The gn post with likes climbing; applause; a beat of quiet.
  6. "Press E to leave." The key goes down; the CRT powers off; credits over the skyline; Dee's
     lullaby; the crow caws out.
- **Needs.** The answer: one or two real posts from the week (or the archive, clearly dated) that
  answer the episode's question, verbatim with handle, date and likes. Their context checked.
- **Length.** 35 to 50 s, plus credits.
- **Staging.** `desk`, `deskWith` for Sibyl or the bot, `ots` for the answer cards, a close-up
  for "Goodnight, friends.", a push into the E key, the CRT effect. The credits name the puppets'
  real accounts under "Puppets played the posting personas of".
- **Pilot.** `goodnight`.
- **Pitfalls.** A speech. A new joke in place of the payoff. A sincere card followed by a joke at its
  author's expense. Skipping the credits' persona list.

---

## 9. Proposal: The Changelog

- **Premise.** Sibyl reads the week's release notes for the simcluster, as if it were software.
- **Engine.** Deadpan versioning of social life. Fast, list-shaped, good for small stories that
  don't merit a monologue joke.
- **Beats.** "The Simcluster, version [week]. Release notes." Then 5 or 6 lines, each a split-flap
  row with a tag (ADDED, FIXED, DEPRECATED, KNOWN ISSUE): "Added: catoids." / "Fixed: nobody."
  / "Known issue: gn still rare." One item gets "Built it." Larry's button.
- **Needs.** 5 or 6 small items from the week, each statable in five words.
- **Length.** 30 to 45 s. A good feature for a thin week, or a second feature in a long one.
- **Staging.** `podium` or `ots` with Sibyl; a terminal-style panel; split-flap rows.
- **Risk.** It can become a list of references without jokes. Every row needs a turn in its tag.

## 10. Proposal: Live From the Build

- **Premise.** A remote interview with a guest "on location" at something they built this week.
  The remote link misbehaves.
- **Engine.** The guest's project is the location; the remote shot's conventions (delay, signal
  loss) collide with the thing being built around them.
- **Beats.** Larry: "We go live to..." Monitor up (`remote`, LIVE bug). Two or three questions,
  answered in the guest's idiom. The project grows behind them. The feed glitches (hologram
  flicker) at the punchline. "We seem to have lost..." Button.
- **Needs.** A guest who shipped something drawable this week, and their posts about it.
- **Length.** 45 to 60 s.
- **Staging.** `remote` or `remote2` (both unused in the pilot), `fx('hologram')` tweened for
  signal loss, the project drawn inside the monitor.
- **Risk.** Monitors shrink heads; keep the guest's lines short and caption-led.

## 11. Proposal: The Field Guide

- **Premise.** A nature documentary about a creature or coinage that spread through the cluster
  this week. Sibyl narrates in documentary hush.
- **Engine.** Natural-history gravity applied to a meme: habitat, diet, mating display, first
  sighting (the first post, credited).
- **Beats.** Title plate (a museum or bestiary card). Three observations, each a drawn specimen and
  a creature call. The first-sighting card, verbatim. One sighting "in the wild" in the studio (the
  creature appears behind Larry). Button.
- **Needs.** A coinage or recurring image with a traceable first post and its spread; its meaning
  confirmed (if the meaning is unclear, don't use it).
- **Length.** 40 to 55 s.
- **Staging.** `ots` with Sibyl; the shared animal glyphs or a new one; `seal`, `caw`, `gator`,
  `trumpet` calls as punctuation.
- **Risk.** Explaining the meme. The documentary voice should describe behaviour, not meaning.

## 12. Proposal: Corrections

- **Premise.** Ten to fifteen seconds in which Sibyl reads corrections to last week's episode.
- **Engine.** Pedantry. Also a real safety valve: if someone said the show got something wrong, it
  says so here, graciously.
- **Beats.** "Corrections." One real correction if there is one ("Last week we said ___. It was
  ___. We regret the error."), then one comic one (a hypothetical shape: "Last week we said nobody says
  gn. We have since been sent a post that says gn."). Larry: "Thank you, Sibyl."
- **Needs.** Replies or posts about last week's episode, from the digest; the lore log.
- **Length.** 10 to 15 s, at the top of the monologue or goodnight.
- **Risk.** Never re-litigate a complaint on air. A real correction is plain and short.
