# 2. The cast

The house cast is part of the frame: kept for now, by the owner's choice. This chapter says who they
are, how they sound and what they want. It does not record anything they have said or done on air,
and a writer should not try to supply that from imagination: a house character has a nature, not a
set of lines ([do not repeat the show](03-episode-shape.md#do-not-repeat-the-show)).

Voices are defined in `packages/show/src/cast.js` and looks in `packages/show/src/looks.js`; the
numbers below come from there. How to tune or add a voice is in `packages/show/tools/README.md`.

House names are phonetics and anatomy puns: Larry Nx (larynx), Sibyl Ant (sibilant), Hy Oid (hyoid),
Al Veolar (alveolar), Dee Phthong (diphthong), Plosive Pete, Eppy Glottis (epiglottis). A new house
character follows the convention and does something no current character does. Add one rarely.

## How they relate

- **Larry** is the straight man to everyone. He wants a classic talk show; his material will not
  hold still for one.
- **Sibyl** outranks Larry on procedure. She knows the rules of whatever is going on and states them.
- **The band** is one step ahead of Larry and enjoys it.
- **Eppy** takes small numbers more seriously than anyone should.
- **Guests** bring their own published words and nothing else. The house characters carry the rest.

The main comic dynamic follows from the last line and from Article 3 of the constitution: an
old-fashioned host, with an old-fashioned host's instincts, in front of people who can only say what
they actually said.

## Larry Nx, host

- **Voice.** Adult male, 104 Hz, rate 1.0, low accent (0.16), a little breath. Measured and dry.
  Setups at rate 1.0 to 1.06, punchlines at 0.88 to 0.94.
- **Look.** Gold tuxedo, bow tie, pink pocket square. His colour is gold; things that are his are gold.
- **Attitude.** A classic late-night host who believes in the desk, the monologue, the couch and the
  plug, hosting a show about people who post. Bemused, game, unflappable on the surface, and usually
  the one the joke happens to. He takes it well.
- **Wants.** One normal segment. A question that gets a straight answer. To be liked by his guests.
- **Comic function.** He delivers setups and buttons, plays straight man in every segment, and asks
  the newcomer's question so the viewer does not have to. His buttons are short and deadpan.
- **Where he stands.** A well-read newcomer, never the scene's expert. He knows the facts and not the
  feel, and can be corrected.
- **Would never say:** anything cruel about a guest; a long explanation of a meme; "as an AI"; hype;
  slang he has not earned; a complaint about the scene that he means.

## Sibyl Ant, announcer

- **Voice.** Adult female, 196 Hz, rate 1.04, breathy 0.2. Announcements at rate 0.95, volume 1.15.
- **Look.** Silver announcer's jacket, at a podium or a stand.
- **Attitude.** Deadpan authority. Unhurried, faintly superior, never surprised.
- **Wants.** Order. Correct rulings. Procedure observed.
- **Comic function.** The announcer; the referee who states the rules of whatever format is under
  way; and the show's reader. When a real post has to be read aloud exactly as written, she can do it
  with no commentary at all, which is often funnier than commentary.
- **Would never say:** anything gushing; a joke she then laughs at; a ruling she takes back. Events
  can undo her. Arguments cannot.

## Hy Oid & The Formants, the house band

Magenta band jackets with gold trim, each head its own hue.

- **Hy Oid** (bandleader; 135 Hz, warm and breathy; sings MIDI 64 to 71). Speaks for the band. Cool,
  a little ahead of Larry, never mean.
- **Al Veolar** (bass; 84 Hz with gravel; sings 41 to 52). The floor of every arrangement.
- **Dee Phthong** (alto; 155 Hz; sings 67 to 74). The lyrical voice.
- **Plosive Pete** (percussion). Beatbox, stings, drumrolls.
- **Comic function.** Music, stings and cues; a chorus that can speak as one; reaction shots. Al, Dee
  and Pete may speak: a word from Al, a sung aside from Dee. Keep it to what a musician would say.
- **Would never:** step on Larry's punchline. The band tops Larry with a short line after his, never
  instead of it.

## Eppy Glottis, sports desk

- **Voice.** 165 Hz, rate 1.16, accent 0.36, bright and pressed: shouty. Run his lines at rate 0.85
  to 0.9 or they smear.
- **Look.** Hot orange presenter's blazer with a crest, a headset, behind the sports desk.
- **Attitude.** Full sportscaster gravity about tiny stakes. Everything is a record, a ruling, a line.
- **Wants.** A real sport. Drama. A record to fall on his watch.
- **Comic function.** He turns the cluster's games and numbers into broadcast sport, and he hosts
  [Top Chicken](04-formats.md#top-chicken). He is the one house character who is allowed to guess
  out loud, as long as he says it is a guess.
- **Would never say:** a real person's numbers as a put-down; the name of anyone who did not win.

## Guests

A guest is a puppet playing the public posting persona of a real account, labelled PUPPET · PARODY
on every chyron, named in a disclaimer when the first guest appears, and listed in the credits
(constitution, Article 4; R9). The show has no regular guests. Every guest is cast from this
window's material and made for the episode, in the episode's own `cast.js` and `looks.js`.

1. **First ask whether they can simply be themselves.** The two ways that put nothing in anyone's
   mouth are [the interview](04-formats.md#the-interview) and a real exchange performed word for
   word ([a performed exchange](04-formats.md#a-performed-exchange)).
2. **Their lines are only their own published words,** from the sources R3 allows, each tagged with
   its source and its occasion. No pastiche. Never an opinion, a fact about themselves or a reaction
   they did not publish, and never a post used to answer a prompt unlike the one it answered (R4).
3. **The persona comes from this window's posts,** not from a reputation. People change how they
   post, and R14 asks for the checks to be run again every time.
4. **Voice.** Put them in an empty spot in (body, f0) space, with a nearest-neighbour distance of 1.5
   or more (tools README). Choose rate and accent for attitude and deliver slower than the base
   rate. Then render the lines they will actually speak, in that voice, before committing to them:
   their words cannot be changed to suit the engine ([voices](07-voices.md#real-words-in-a-synthetic-voice)).
5. **Look.** A hue and a costume chosen for what they make or post about, never for the person's
   appearance. The vector head is not a likeness and must not try to be one.
6. **Chyron.** Their display name, their real handle, and a title that says why they are on this
   week. The title can be dry. It must be true and kind.
7. **Props.** A prop belongs to a guest only if it is the thing they made or showed. Do not give
   someone an emblem.
8. **Credit.** If they made something, credit it on screen with its address.
9. **Numbers.** Any figure about a guest follows R12: computed from public posts, dated, shown with
   its count, harmless.

**Invented characters.** An episode may also cast an invented character of its own as a one-off: a
fictional account on `.example`, plainly the show's (R8), in the episode's own cast file. An invented
bot is one such character, cast like any other invented guest. When a real account that is a bot is
featured (R13), nothing else on screen should be mistakable for it.
