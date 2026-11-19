# 4. Segment formats

A shelf of repeatable segments. Pick one per story, and only if the story passes
[the first rule](00-constitution.md#1-only-include-it-if-its-interesting). Each card gives
the premise, the comic engine, a beat template, what the format needs from the digest, its length,
staging, the pilot example, and how it goes wrong. Formats 1 to 8 are established by the pilot
(each from one example: starting points, and the first candidates for experiments). Format 9, The Thread,
is established by the owner's decision and is the preferred way to put real people on the show.
Formats 10 to 14 are **proposals**; 14, The Interview, depends on bot work that does not exist yet.

How a format is used is logged per episode (see [fixed and fresh](03-episode-shape.md#fixed-and-fresh)):
the middle slot's format does not repeat two weeks running, and the song's genre changes every
episode.

Shot and prop names refer to `packages/show/README.md`. The pilot examples below are evidence,
quoted here; they are not source to copy. Earlier episodes' files are available only when the plan
inherits them ([evolving the show](03-episode-shape.md#evolving-the-show)). A prop a format needs that
the studio lacks is built in the episode; it moves into the studio only when a second episode needs
it.

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

The Top Chicken result is a **standing item whenever there is one**, sized by the first rule: often a
10 to 20 second hit, sometimes the full segment below.

**The hit.** Inside the monologue, or as an Eppy cut-in from the sports desk: "Top Chicken update!"
The winning post on a card with a crown dropping on it; the like count on a split-flap; one tag (the
all-time record, or a window statistic such as how many people posted). "Back to you, Larry." Use
the full segment only when the week's games have a story: a record broken, a rule change, a streak.

**Naming the winner.** The game's own account (`@topchicken.bsky.social`) names each winner
publicly ("New Top Chicken! @handle's post got 510 likes"), and winning is a hero moment, so the show
names the winner and shows the winning post verbatim, subject to R7, R10 and R11 in
[real people](09-real-people.md). If the winner or the post fails, report the numbers alone or skip
it. Window statistics ("254/754 people posted; 3003 posts overall") are aggregates and fine.

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
- **Needs.** The week's Top Chicken results as posted by `@topchicken.bsky.social` (winner,
  post URI, likes, the record, window statistics), and any other community games and numbers:
  prediction markets, streaks, records, rule changes. Exact figures and their sources.
- **Length.** 55 to 70 s.
- **Staging.** `sports` with a ticker (the ticker carries six more jokes for free), `podium3`,
  `limboBar`, split-flap numbers, a telestrator circle and arrow ("NUMBER GO UP"), a stamp FINAL.
- **Pilot.** `top-chicken`: the Grace Limit ("She founded the chicken. She cannot be the
  chicken." with the founder bonking the limbo bar); bot trader +$19,865.83, humans -$4.00, "All
  play money. Still sad." → "That was my four dollars."
- **Pitfalls.** Naming or ranking anyone who didn't win. Follower counts as status, unless it is the
  game's own rule. A board with no tag. An invented figure beside a real one, unlabelled (the pilot
  labels its -$4.00 *FAKE*). The pilot's crown sat on a blank card; show the real winner now.

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
  answer in their own idiom, and their idiom takes over the segment. Build the guests' side from
  real words first, in the order of R3 in [real people](09-real-people.md#r3-words-in-a-guests-mouth-real-words-first):
  their own posts and catchphrases, then (when it exists) interview answers, and format pastiche
  last, for a line or two at most. If a guest's material this week is all pastiche, use The Thread
  or skip the guest.
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
  weakness: give the guests one exchange of their own, ideally a real one from a thread). Lines
  longer than ten words in a guest's mouth. Any line a guest has not posted that expresses an
  opinion. Leaning on pastiche: the pilot's panel uses it for its two builds ("concept: …" and "they
  don't want you to know this but (it's already running)"). That is the most a panel should carry.

## 7. The Number (the weekly song)

A standing segment. Two firm rules from the owner: **the genre changes every episode**, and the
song **carries a meaningful theme from the week**. The genre shelf, with what each genre needs from
the engine, is in [voices](07-voices.md#the-genre-shelf).

- **Premise.** One joke about the week's theme, told as a song in a genre that fits the theme or
  pointedly doesn't. The pilot's: an earnest stomp-clap "someday" anthem in a scene where nothing
  stays hypothetical.
- **Engine.** The song's form is the joke's form. The pilot splits the music at stop bars so the bot
  can say "Built it." in the silences; each "someday" dream gets built a bar after it is sung. Each
  genre offers its own structural joke: the shanty's call and response, the round's pile-up, the
  motet's solemn entries, the barbershop tag that won't end.
- **What "carries a theme" means.**
  1. The theme is the episode's question or spine, felt rather than asked. Write it in the pitch as
     one sentence: *This song is about ___, and it feels ___.* The pilot's: about wanting a place to
     belong, in a scene that builds every want at once; it feels hopeful and slightly overrun.
  2. The structural joke turns on that theme, not on a side story.
  3. The verses name this week's specifics (the pilot's recap the night's builds: the weather
     channel, the museum, the podcast with no name).
  4. **The swap test:** put another week's stories in the verses. If the song still works unchanged,
     it isn't carrying this week's theme.
  5. The song may come close to sincere (the pilot's breakdown) and then turns it into a joke ("Built
     it." / "When?" / "You are in it."). It never answers the episode's question sincerely in the
     show's own words; goodnight does that, with the community's.
  6. Choose the genre for the theme's feeling (a sea shanty for something everyone hauled on
     together) or for a deliberate mismatch (a requiem motet for a feature that got deprecated).
- **Beats** (the pilot's anthem; other genres have their own forms, but keep the bones):
  1. Larry's intro: two lines that set the joke ("Folks, in the simcluster, a dream lasts about six
     minutes. / Then somebody ships it.") and a throw ("Better sing it fast.").
  2. The genre's opening (hook, verse); the first statement of the theme; the first punch.
  3. A second pass that escalates (a doubt from the band, ARE WE?; a second punch, "Both of them?").
  4. The turn: lights down, near-sincere.
  5. The reveal or last punch, then the genre's ending with one word changed.
  6. Button; band bow under applause.
- **Needs.** The episode's theme; three or four of the week's specifics for the verses; a genre not
  used in the last eight episodes (the rotation log in [lore](lore.md)).
- **Length.** 45 to 70 s (the pilot's is 95 s).
- **Staging.** `stage` shot, karaoke lyrics with a bouncing ball (caption bar hidden for sung lead
  lines), each verse's subject drawn as a small vignette, the genre's look in the set dressing and
  lights (a spotlight for a torch song, candles for a motet, a deck sway for a shanty). Bursts on the
  shouts, accents on the beat.
- **Pilot.** `song`, "Someday (Built It)": genre logged as *stomp-clap anthem*.
- **Pitfalls.** Lyrics that carry the jokes (sung words are the least intelligible thing the engine
  makes; put the jokes in the stops and on screen). A song with no structural joke. A genre the
  engine can't sell. A theme that is a topic ("this week: polyhedra") rather than a feeling. Setting a
  real person's posts to music without being sure they would be delighted.

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

## 9. The Thread (verbatim reconstruction)

The preferred way to have real people on the show: puppets perform a real public thread, word for
word, in order.

- **Premise.** "This week, some people had a conversation. We present it in full." The participants'
  puppets act it out; Larry introduces and reacts; the studio stages what the thread talks about.
- **Engine.** The words can't change, so the comedy comes from everything else:
  - **the cut:** where it starts and ends. The last post is the punch; start as late as the thread
    still makes sense.
  - **casting:** the persona puppets, their voices and their creatures (the crow arriving on "claim").
  - **staging:** the studio builds what the thread proposes as it proposes it; the bot says "Built
    it." after a post that wishes for something; screen tags around the posts.
  - **delivery:** timing, pauses, rate, a long silence before a one-word reply.
  - **Larry's reactions:** looks, a slow turn to camera, one framing line before and a button after.
- **Rules.**
  1. Every word a guest speaks is from the thread, from that guest's post, in thread order.
  2. Cuts are whole posts. A post trimmed inside is marked with an ellipsis in the caption and on the
     card, and only if the meaning is unchanged. Skipped posts are marked on screen ("· 3 POSTS
     LATER ·").
  3. The caption shows the exact text. `as` is for pronunciation only: word-for-word respelling,
     never substitution. Emoji, links and images are shown on the post card, not spoken; if `as` must
     leave a token out, accept the renderer's even-spread word timing.
  4. Each line carries its source URI (`// verbatim: at://…`). A gate checks that the caption equals
     the post's text and that the URIs run in thread order.
  5. House characters may frame and react, between posts, in lines that are clearly theirs. They
     never alter, summarise, paraphrase or add words that change what a post meant.
  6. One reaction sound per beat at most, and never a laugh *at* a participant. Laugh with the
     thread's own joke.
- **Which threads qualify.** Public, in the cluster, and one of: funny on its own terms, a good
  example of the week's question, or a small kindness. Short: up to about eight posts or 60 seconds.
  Every participant passes the opt-out rule (R11) and, in the writer's judgement from their public
  posts, would happily repost the clip (R6; nobody is asked); small
  accounts only where they come off well (R7). It has a shape: a build-up and a turn.
- **Which do not.** Arguments, corrections, callouts, dunks, anyone upset; anything touching R10
  topics; a thread where a post has been deleted or edited since the digest; any post under a reply
  restriction or with quoting disabled (treat those as "please don't amplify"); a thread that only
  makes sense with context the episode can't give.
- **Beats.** Larry's framing line ("This week, three people discussed the E key. We present it in
  full."). The posts, each with its post card on screen and the puppet speaking it, house reactions
  between. The studio builds what is proposed. Larry's button.
- **Needs.** The whole thread in order from the digest (root to the last post used, with authors,
  timestamps, text, embeds, reply and quote restrictions), and every participant's checks.
- **Length.** 30 to 70 s.
- **Staging.** `panel` or `guest` with the participants seated; or `remote2` for two monitors. The
  post card for each line slides in as it's spoken (the speaker's colour). A disclaimer footer:
  *Performed verbatim from a public thread, <date>. Puppets play posting personas.* Chyrons carry
  PUPPET · PARODY as for any guest.
- **Pilot.** Not in the pilot as a format. Its nearest moments are single posts in context: norvid's
  "buddy that's my freaking simcluster", and the Discords reply card.
- **Pitfalls.** Choosing a thread for its fame, not its shape. Performing it straight with nothing
  staged. Larry's reactions turning into commentary on a participant.

---

## 10. Proposal: The Changelog

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

## 11. Proposal: Live From the Build

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

## 12. Proposal: The Field Guide

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

## 13. Proposal: Corrections

- **Premise.** Ten to fifteen seconds in which Sibyl reads corrections to last week's episode.
- **Engine.** Pedantry. Also a real safety valve: if someone said the show got something wrong, it
  says so here, graciously.
- **Beats.** "Corrections." One real correction if there is one ("Last week we said ___. It was
  ___. We regret the error."), then one comic one (a hypothetical shape: "Last week we said nobody says
  gn. We have since been sent a post that says gn."). Larry: "Thank you, Sibyl."
- **Needs.** Replies or posts about last week's episode, from the digest; the lore log.
- **Length.** 10 to 15 s, at the top of the monologue or goodnight.
- **Risk.** Never re-litigate a complaint on air. A real correction is plain and short.

## 14. Proposal: The Interview (by the show's account)

**Not built.** It depends on bot work that does not exist yet, and on the interview design in
[real people](09-real-people.md#interviews-by-the-shows-account-proposal).

- **Premise.** During the week the show's account asks people who have opted in a question or two in
  public. On the show, Larry asks the same question at the desk and the person's puppet answers
  with their reply, verbatim.
- **Engine.** A real answer to a classic talk-show question, given in the person's own idiom; the
  studio stages the answer (and the bot builds whatever they mention wanting).
- **Beats.** Larry: "Earlier this week we asked ___." The question card (the show's real post). The
  puppet speaks the answer, its card beside it, with *ANSWERED FOR THE SHOW · <date>*. One reaction,
  one build, Larry's button. Two or three people answering the same question works well as a montage.
- **Needs.** The question post, the opted-in replies, verbatim, still live at air time.
- **Length.** 30 to 60 s.
- **Rules.** Those of The Thread, plus the interview rules in chapter 9. An unanswered question
  never holds up the episode. Larry speaks the question as
  it was posted.


## Retired

Formats removed from the shelf, one line each: name, episode, reason. None yet.
