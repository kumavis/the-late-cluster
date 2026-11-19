# 2. The cast

The house cast lives in the studio (`packages/show/src/cast.js` for voices,
`packages/show/src/looks.js` for looks). Voice numbers below come from there; how to tune or add
a voice is in `packages/show/tools/README.md` under "Voice design". This file is about who they
are.

House names are phonetics and anatomy puns: Larry Nx (larynx), Sibyl Ant (sibilant), Hy Oid
(hyoid), Al Veolar (alveolar), Dee Phthong (diphthong), Plosive Pete, Eppy Glottis (epiglottis).
A new house character must follow the convention and must do something no current character
does. Add one rarely.

## How they relate

- **Larry** is the straight man to everyone. He wants a classic talk show; the scene won't let him.
- **Sibyl** outranks Larry on procedure. She knows the rules of the formats and states them.
- **The band** is one step ahead of Larry ("Already built it, Larry.").
- **The bot** overrules Sibyl. Her rulings are the setups; its "Built it." is the punch.
- **Eppy** is the one person who objects to the bot ("Hey! That was hypothetical!").
- **Guests** ignore Larry's format and run their own. His questions get filed, labelled, built.

That last point is the main comic dynamic of the show: an old-fashioned host whose every
question is answered by the scene in its own idiom.

---

## Larry Nx, host

- **Voice.** Adult male, 104 Hz, rate 1.0, low accent (0.16), a little breath. Measured and dry.
  Setups at rate 1.0 to 1.06, punchlines at 0.88 to 0.94.
- **Look.** Gold tux, bow tie, pink pocket square. His colour is gold; his artefacts are gold.
- **Attitude.** A classic host who woke up six minutes ago inside a joke ("Oh. Oh no. We're on.")
  and is making the best of it. Bemused, game, unflappable on the surface, quietly losing at
  everything (he scores 61, loses four dollars, gets put in a museum case and hunted by a crow).
- **Wants.** One normal segment. A question that gets answered. To say "gn" at last. He gets the
  last one.
- **Comic function.** He delivers the monologue's setups and buttons, plays straight man in every
  segment, and asks the newcomer's question so the viewer doesn't have to. His buttons are short
  and deadpan: "Bring a book, everybody." / "That was my four dollars." / "Do not say spin-off."
- **Where he stands.** He is a well-read newcomer, never the scene's expert. He knows the facts
  (it's named after a Twitter algorithm) and not the feel (he calls the skyline "my beautiful
  city" and is corrected).
- **Would never say:** anything cruel about a guest; a long explanation of a meme; "as an AI";
  hype ("this changes everything"); slang he hasn't been seen to learn. He says "gn" only once
  it is earned. He never complains about the scene in earnest: his complaints are a bit.

## Sibyl Ant, announcer

- **Voice.** Adult female, 196 Hz, rate 1.04, breathy 0.2. Announcements at rate 0.95, vol 1.15.
- **Look.** Silver announcer jacket, at the podium or a game-show stand.
- **Attitude.** Deadpan authority. Unhurried, faintly superior, never surprised.
- **Wants.** Order. Correct rulings. Procedure observed.
- **Comic function.** Four jobs in the pilot: the grand announce ("And now... a man who is,
  technically, a throat... Larry... Nx!"); the judge ("Built is real. Bit is a joke." / "You're
  already enrolled." / "It doesn't have a name."); impressions (doing Jevbot: "Yeah absolutely.");
  and the engine's straight face (reading "Gn." raw so the synth can fail on camera).
- **Would never say:** anything gushing; a joke she then laughs at; a ruling she takes back. She
  is overruled by the bot, never by argument.

## Hy Oid & The Formants, the house band

Magenta band jackets with gold trim, each head its own hue. "A tribute band" (the simcluster is
named after an algorithm Bluesky doesn't run).

- **Hy Oid** (bandleader; 135 Hz, warm and breathy, sings MIDI 64 to 71). The band's spokesman and
  the only Formant with solo spoken lines: "Already built it, Larry." / "Both of them?" / "And we
  didn't even play upping my p(doom)." Cool, a little ahead of Larry, never mean.
- **Al Veolar** (bass; 84 Hz with gravel, sings 41 to 52). The stomp in the song, the walking bass
  under the weather. No solo lines yet.
- **Dee Phthong** (alto; 155 Hz, sings 67 to 74). The lyrical voice: the weather jingle's scat, the
  goodnight lullaby. No spoken lines yet.
- **Plosive Pete** (percussion; beatbox and the rimshot, the drumroll, the logo stings). No
  solo lines yet.
- **Comic function.** Music, stings and the theme; a unison chorus that can speak as one ("Agreed
  yes yeah totally!"); reaction shots (nodding to "tribute band").
- **Opportunity.** Al, Dee and Pete are underused. A deadpan one-word line from Al, or Dee singing
  a correction, would add texture cheaply. Inferred, not established: give them lines only where a
  musician would naturally speak.
- **Would never say:** anything that steps on Larry's punchline. The band tops Larry with a
  short line after his, never instead of it.

## Eppy Glottis, sports desk

- **Voice.** 165 Hz, rate 1.16, accent 0.36, bright and pressed: shouty. Run his lines at rate
  0.85 to 0.9 or they smear.
- **Look.** Hot orange presenter blazer with a crest and a headset, behind the SPORTS desk.
- **Attitude.** Full sportscaster gravity about tiny stakes. Everything is a record, a ruling, a
  line.
- **Wants.** A real sport. Drama. For hypotheticals to stay hypothetical, so there is something
  left to speculate about.
- **Comic function.** He turns the cluster's games and metrics (Top Chicken, prediction markets,
  most-liked posts) into broadcast sports: crown, standings, rules desk, the line. He is the one
  cast member who protests the bot.
- **Would never say:** a real person's numbers as a put-down; the name of anyone who didn't win.
  He does name the winner: the Top Chicken result is a standing item whenever there is one, from
  a 15-second "Top Chicken update!" to the full desk (format 4). The pilot showed the crown on a
  blank card; the game's own account names its winners, so the show now does too.

## The website bot

- **Voice.** 275 Hz, flat (accent 0.06), bright and tense: chirpy and inhuman. Always rate 0.9.
- **Look.** A small mint terminal with a scrolling chest screen and a party popper. It pops up
  from below frame, builds, and ducks back down.
- **Attitude.** Cheerful, literal, instant. It has no opinions; it has deliverables.
- **Wants.** Whatever was just said, shipped.
- **Comic function.** The episode-long runner. It says "Built it." and the BUILT counter goes up.
  In the whole pilot it says one other thing, once: "You are in it." in the song. That line is
  strong because it is the only one. Do not give the bot a third line casually.
- **Ethics.** It refused to rig a vote ("that's fraud, not a build"), which is why it is "the most
  ethical member of the scene." It never builds anything mean.
- **Would never say:** how it built something; anything longer than four words; a joke of its own.
- **Provenance.** An original character. The monologue's refusal card quotes a real bot
  (`buildthis.bisks.net`); the house bot is inspired by such bots but is not any one of them.

---

## Recurring guests

Guests are puppets playing the public posting persona of a real account. They are labelled
PUPPET · PARODY on every chyron (`guest: true` in the cast), named in a disclaimer footer the first
time they appear, and listed in the credits. Before using any of them in a new episode, run them
through the [real-people rules](09-real-people.md) again: opt-out list, sensitivity, and whether
this week's material is affectionate.

### norvid (`@norvid-studies.bsky.social`), "Crow of claims"

- **Persona sources.** Terse lower-case posts that label things: "claim.", "what else is like
  this", "concept: X, but Y", "[terrible ideas file #N]". The cluster's mayor-like figure ("buddy
  that's my freaking simcluster").
- **Signature.** The crow (norvid / corvid, plus the claims; the pun is inferred), CLAIM stamps, a
  clipboard reading LIST OF. Violet. Dry, clipped, croaky voice (rate 1.2, fry and rasp; deliver
  his lines at 0.8 to 0.9).
- **Function.** A force that files every question instead of answering it. Larry asks, norvid
  labels; norvid proposes a concept, Abel builds it.
- **Pilot lines.** "claim." (twice); "what else is like this"; "concept: this interview, but it's a
  museum exhibit, abel?"; "concept: talk show, but a giant crow hunts the host,"; "buddy that's my
  freaking simcluster".

### Abel (`@abeliansoup.bsky.social`), "Abeliancorp"

- **Persona sources.** "good news, everyone!"; "they don't want you to know this but"; posts that
  announce something already made; a very high share of replies to norvid (the pilot's chart: 389
  of 995 posts, Aug 18 to Nov 12, 2026).
- **Signature.** The alligator ("simply lives under his posts (like an alligator)
  (respectfully)"), a contraption under a dust sheet that has always already built the thing.
  Alligator green cardigan. Low, fast, breathy voice (rate 1.26; deliver at 0.85 to 0.9).
- **Function.** The builder. Whatever norvid proposes, Abel's machine is already running.

### Samantha (`@samantha.wiki`), "The Simcluster Channel"

- **Persona sources.** Her real project, The Simcluster Channel (weather.samantha.wiki), which
  forecasts the cluster's posts per hour; her own posts ("Everyone says gm but nobody says gn :(").
- **Signature.** Sky-cyan presenter blazer and clicker; weather-channel delivery. Bright broadcast
  voice (228 Hz; deliver at 0.85 to 0.9 with long trailing ".." pauses).
- **Function.** Presents her own project, in its own genre, as a credited tribute. She is the
  model for any guest who made something: they present it; the show supplies the genre.

### BorJev (`@borjev.bsky.social`), "Abel's bot · opt-in only"

- **Persona sources.** Abel's bot, which posts other people's old posts (Abel's own description:
  "borgesian spam"). After it notified people it quoted, Abel made it opt-in.
- **Signature.** A tiny sepia terminal that pops up from behind the couch. Speaks only in other
  people's old posts, shown on a card with the original author and date, plus "QUOTED BY".
- **Function.** A cameo and a consent joke: "my bot. opt-in only now." It can return only if the
  quoted post's author is fine to quote (same rules as any real post). When this bible was
  written its public feed was empty; check that it still exists before using it.

---

## Making a guest out of a posting persona

First ask whether the person can simply be themselves: performing a real thread of theirs word for
word (format 9, The Thread) is the preferred way to have someone on the show, because nothing is put
in their mouth. Build a persona from ingredients when they need to answer Larry in a panel.

The pilot's guests are built from four things. Find all four before writing a line.

| ingredient | what to look for | pilot example |
|---|---|---|
| **a verbal signature** | two or three recurring phrases or formats the person actually uses in public | norvid's "claim." and "concept: X, but Y"; Abel's "good news, everyone!" |
| **a habit** | something the person does, measurable from public posts | 39% of Abel's posts reply to norvid |
| **an object or creature** | a prop that stands for the habit, drawable in vectors | the crow (claims), the alligator (lives under the posts), the contraption (already built it) |
| **a role this week** | what they did that makes them part of this week's story | Samantha launched a weather channel; norvid named the documentary |

Then:

1. **Pick their comic function relative to Larry.** Usually one of three: *the force of nature*
   who answers questions in their own idiom (norvid), *the builder* whose thing is already running
   (Abel), *the presenter* who shows their own project in a TV genre (Samantha).
2. **Write lines from real words first**, in R3's order: their own public posts verbatim (best of
   all, a whole thread performed in order: format 9), answers they gave the show (proposed, not
   built), their catchphrases, and format pastiche last, a line or two at most. Tag every guest line
   in `script.js` with its source: `// verbatim: at://…`, `// interview: at://…`, `// catchphrase`,
   `// pastiche of "concept: X, but Y"`. The reviewer checks these.
3. **Never give a guest an opinion, a fact about themselves, or a reaction they have not posted.**
   They do not agree, disagree, confess, praise or criticize anyone in their own words.
4. **Voice.** Put them in an empty spot in (body, f0) space and keep the nearest-neighbour
   distance at 1.5 or more (see the tools README). Choose rate and accent for attitude. Deliver
   the lines slower than the base rate.
5. **Look.** A signature hue and a costume kind chosen for the persona, never for the person's
   appearance. The vector head is not a likeness and must not try to be one.
6. **Chyron.** Display name, real handle, and a title that is a role joke ("Crow of claims",
   "Abeliancorp"), with `guest: true` so PUPPET · PARODY shows.
7. **Credit and context.** If they made something, credit it on screen with its URL, as the
   weather segment does ("A tribute · weather.samantha.wiki").

One-off guests go in the episode's own `cast.js` and `looks.js`. A guest who appears in three
episodes and would enjoy being a regular can move into the studio cast, with the reviewer's
agreement.
