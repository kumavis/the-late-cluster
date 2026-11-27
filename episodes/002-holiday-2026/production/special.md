# The holiday special, 2026

The owner outlined a special on 27 November 2026. Their words are in
[`owner-notes.md`](owner-notes.md) and are the brief; read them first. This file says what the
special changes about the show for this one piece, what does not change, and how it is made.
It is not episode three, and the next weekly episode returns to the usual workflow.

## What it is, in the owner's outline

The studio is dark and switched off. Larry is there, off the air, dressed for the cold, picking
up his paycheck. He asks the viewer to walk with him. Most of the special is the walk through
cold, dark city streets, past lively restaurants, buskers and other street scenes. He talks as
if in conversation. The viewer never speaks: Larry repeats the viewer's question aloud and then
answers it. He says that with all the uncertainty in the world we still have to keep moving
forward and keep making things, and he explains what thinkers from different cultures, long ago,
had to say about that, to offer answers and comfort and never to show off. They arrive at his
apartment, where the regular crew are sharing a big meal. The holiday is never named. He says to
keep close the ones who make you feel sane, says to stay warm, and says goodnight.

About four minutes.

## What the owner's outline sets aside, for this special only

These are the show's DNA, and the owner has set them aside here by asking for the special:

- **No posts, no guests, no window.** Nothing from the community's week is used, so there is no
  scrape, no research cards, no consent refresh and no `sources.json` of accounts. The standing
  segments (the interview, Top Chicken, the music) are not drafted.
- **Sincerity is the piece.** The bible keeps sincerity to one short moment in the community's
  own words (premise, "Sincerity"). Here Larry is earnest for four minutes, in his own words.
  That is the experiment. What the bible says makes sincerity fail still describes how this can
  fail: a speech, telling people how to feel, a swell of music, the words "special" or "what
  it's all about".
- **Larry off the air.** He is slower to joke and more personal than the host in the cast
  chapter. He is still the same man: dry, a well-read newcomer and never the expert, kind, and
  able to be wrong. Lightness is welcome where it is his.
- **Outside the studio.** New places and a new costume, built for this special and kept with it.
- **No studio audience.** Nobody laughs or claps on a street. Sound is the place: the city, a
  busker, a room full of friends.

## What does not change

- **Only include it if it's interesting** (constitution, Article 1), at every level: each idea
  Larry offers, each thing the walk passes, the whole. Name the turn or the feeling in five
  words. One idea that lands beats four that are listed.
- **Nobody is given words they did not write.** The thinkers Larry speaks of were real people,
  or are real texts. A quotation is exact, short, and from a named published translation. When
  Larry tells an idea in his own words he says it is his telling ("the way I read it"), credits
  whose idea it is only as far as the record supports, and invents no quotation, no anecdote and
  no detail of anyone's life. Much "ancient wisdom" in circulation is misattributed or made up;
  none of that is used. `research/philosophy.md` holds the checked sources, and nothing is
  attributed that is not in it. An auditor checks every attribution against it.
- **Out of bounds stays out** (chapter 9, R10): health, grief, identity, politics, jobs,
  conflict. The owner's context is that the world is changing fast, justice seems rare, and
  people are unsettled. Larry speaks to that feeling in plain human terms. He names no event,
  person, party, country, law or side, and nothing in the special can be read as taking one.
- **Living traditions are treated with respect.** Several of these texts are scripture to
  people alive now. Larry does not joke at their expense, rank them, or claim to speak for them.
- **The house cast keep their natures** (cast chapter). At the table they are themselves, off
  duty. They are friends, and nobody says so.
- **Do not repeat the show.** Writers write from the outline and from the characters, and do
  not reach for anything that feels like a signature. Two reviewers with the record of what
  has aired give the script a verdict.
- **Television.** There is something to watch at every moment, and nothing is put on screen to
  be read in silence. A walk is a string of things seen; what Larry says and what the street
  shows should meet.
- **Write for the engine** (voices chapter): short lines, common words, names it can say. Best
  effort on pronunciation is sufficient because the captions carry the line.
- **The medium is honest** (Article 4): the credits say every voice is synthesized.
- **The owner's review** (Article 5): the owner reads the script and watches the whole thing
  before anything is published.

## A reading of the constitution that the owner is asked to confirm

Article 3 ends: the show's own characters never "restate, paraphrase or summarise a real
person's view in words that person did not use". That sentence, and chapter 9, were written
about accounts in the community the show covers. This special depicts none of them. Its real
people are thinkers long dead, and the owner's outline asks Larry to explain their thinking. So
the special is being made on this reading: Article 3 and chapter 9 govern how the show treats
the people it covers, and for historical thinkers the rule is the accuracy rule above. This is
the project manager's reading, not a ruling, and it is put to the owner with the script.

## How it is made

By hand, through the workflow's roles (`docs/WORKFLOW.md`), because the pipeline tool runs
whole weeks from a scrape. Whoever makes a thing does not judge it, and writers do not see what
the show has already done.

| step | done by | writes |
|---|---|---|
| research | one researcher with the network, on Opus | `research/philosophy.md`: ideas from different cultures, each with a checked source, an exact short quotation where one was verified, and the traps around it |
| staging read | one builder | `research/staging.md`: what the studio can already show and what would be new |
| drafts | three writers, independently | `drafts/<writer>/script.js` and `notes.json` |
| select | two reviewers, independently, with the record of what has aired | `review/select/<reviewer>.json`: scores, a repetition verdict and reasons for each draft |
| audit | one auditor | `review/audit-drafts.md`: every attribution against the research, and the out-of-bounds screen |
| final script | one writer, from the selected draft and the reasons sent back (`select.md`) | `segments/walk/script.js`, `segments/walk/notes.json`, `assembly.md` |
| review | two reviewers, independently, on repetition and on whether it is ready; one auditor on the final attributions | `review/final/<reviewer>.json`, `review/audit-final.md` |

It stops there, at a reviewed script, for the owner. Fitting to the voice, staging, the build,
the cold-viewer test and the scorecard, which is filled in once a thing is staged, come after
the owner has read it.

## Length

Four minutes is 240 seconds. In the aired episodes Larry speaks at about 159 words a minute
while he is speaking, and talk-heavy segments run at 120 to 133 words a minute overall. A walk
needs room to look at things, so the script is 400 to 470 spoken words in all.

## Numbering

The folder is `002-holiday-2026` because the tools want a numbered id and the special is not
episode three: it sorts after the second episode and leaves the number three for the next
weekly one. How the archive lists a special is not settled and is a question for the build.
