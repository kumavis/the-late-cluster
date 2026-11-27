# Audit: the final script's attributions and the out-of-bounds screen, round 1

Task `audit.final`, round 1, holiday special `002-holiday-2026`. Auditor, 27 November 2026.

Checked against: `production/owner-notes.md`, `production/special.md` ("What does not change",
and "Length" for item 9), `production/research/philosophy.md` (the cards),
`docs/bible/00-constitution.md`, `docs/bible/09-real-people.md` (R8, R10), and my earlier
`review/audit-drafts.md` (conditions C1 to C3). Read: `segments/walk/script.js`,
`segments/walk/notes.json`, `production/assembly.md`. No network was used. No script was changed.

## Verdict: changes

One item, and it is a count, not an attribution:

- **V1. The spoken word count is under the floor.** `special.md` ("Length") sets 400 to 470
  spoken words. The `say` beats total **397** words (396 without Dee's uncaptioned "Ha!"). The
  408 in `notes.json` and `assembly.md` is the count command's figure and includes the 11 sung
  "la" syllables of the busker, which are not spoken words. What must change: either the
  project manager rules that the sung syllables count toward the range (and then nothing in the
  script changes, and the 408 stands with that ruling noted), or the spoken words reach at
  least 400. Owner: the project manager for the ruling; the writer only if the ruling is that
  they do not count. The timing (243 seconds by arithmetic) is not in question.

Every attribution is `ok`, the one quotation is exact, every telling is marked as a telling, and
nothing is out of bounds. Nothing below is `fix` or `not on the shelf`.

---

## 1. Attributions

| line | card | marker | result | note |
|---|---|---|---|---|
| `old-books` | none | none | ok | "So I've been reading old books. Very old." Names nothing. |
| `what-helped` | none | none | ok | "People were rattled then, too. Some wrote down what helped." Credits no saying to anyone or to "the ancients"; it introduces what follows. |
| `cook-story` | zhuangzi | told | ok | "a story about a cook in an old Chinese book": the card's safe wording. |
| `zhuangzi-name` | zhuangzi | told | ok | Names the book, not the man; "I'm probably saying that wrong" is about Larry's pronunciation, not the book. |
| `cook-prince` | zhuangzi | told | ok | "The way I remember it, a prince admires his cook's knife work." Marked as a telling; as the card tells it. |
| `cook-blade` | zhuangzi | told | ok | "one blade nineteen years. Still sharp." The card's nineteen years and the edge "as if fresh from the whetstone". |
| `cook-hard-part` | zhuangzi | told | ok | "When he comes to a hard part, he slows down." Matches "I am all caution ... I stay my hand". |
| `cook-gently` | zhuangzi | told | ok | "Looks right at it. Goes gently." Matches "I fix my eye on it ... gently apply my blade". The carcass is kept out, as the card asks. |
| `tarfon-who` | avot | told | ok | "Nearly two thousand years ago there was a rabbi named Tarfon." The card's safe wording and date (1st to 2nd century CE). No story of his life; not "the Talmud", not "a Jewish proverb". |
| `tarfon-recorded` | avot | told | ok | "He is recorded as saying:" The card's wording. |
| `tarfon-1`, `tarfon-2` | avot | quoted | ok | See item 2. |
| `used-book` | none | none | ok | Larry's own fictional detail about himself, not about the source. |
| `guest-in-sentence` | avot | told | ok | "He meant the study of Torah." The card says the study and practice of Torah; "study" alone is narrower but not wrong. "I'm a guest in that sentence" defers to the tradition. |
| `borrow`, `dont-finish`, `dont-quit` | avot | told | ok | "Here's how I borrow it. We don't have to finish it. We just don't get to quit." Said as his reading, as the card calls the general reading a widening. The Shapiro paraphrase (the card's trap) is not used in any form. |
| `tamil-book` | kural-guests | told | ok | "an old Tamil book of couplets called the Tirukkural": safe wording. Tiruvalluvar is not named, so no religion is assigned to him. |
| `guest-1`, `guest-2` | kural-guests | told | ok | "As I remember it: even with the food of immortality on your table, you don't eat while a guest stands outside." Marked as a telling aloud. It says what couplet 82 and its prose say. "Food of immortality" is Pope's phrase (and the prose line's) used inside the telling with no quotation marks; it is not presented as a quotation, so the `told` marker is accurate. Couplet 84 (Lakshmi) is not used. |
| `rule`, `still-the-rule` | none | none | ok | Sibyl's house rule. It echoes the couplet but credits nothing to it. |

Every marker comment matches what its line does, and `notes.json` "ideas" matches the markers
line for line.

## 2. Quotations

| lines | card | result |
|---|---|---|
| `tarfon-1` + `tarfon-2` | avot (Gorfinkle) | **exact.** Card: "It is not thy duty to complete the work, but neither art thou free to desist from it". Caption: `"It is not thy duty to complete the work,` / `but neither art thou free to desist from it".` Split at the card's comma; nothing comes between the two beats (no cue, no sound beat, no line). |

Punctuation the caption adds: the opening and closing quotation marks, and the full stop after
the closing mark. The card's quotation has no closing stop, so the stop is caption punctuation.
The `as` fields carry the same words without the marks, with the stop. `notes.json` says the
source's sentence "runs on"; the card does not show that, and it does not matter here, because
the full stop outside the mark claims nothing about the source either way.

## 3. Tellings called tellings

- The cook: "The way I remember it". Nothing in the telling goes beyond the card.
- Tarfon's wider reading: "Here's how I borrow it", after "He meant the study of Torah. I'm a
  guest in that sentence." The script says plainly that the wider reading is his and what the
  original meant.
- The couplet: "As I remember it". Nothing beyond the card.

No telling says more than, or something other than, its card's source.

## 4. The credits list

One translation is quoted, Gorfinkle's, and it is listed (twice, once per beat, which is a format
matter). Nothing is listed that is not quoted. The told works (Giles's Zhuangzi, Pope's Kural)
are rightly not listed as quotations.

**The writer's question, the year.** The card gives "The Sayings of the Jewish Fathers, first
published 1913 (the e-text is the second edition, undated on the page)", and its heading says
"translation 1913". So the card supports 1913 as the year the translation was first published,
which is what a translation credit's year ordinarily means, and the credit as written
(`"year": 1913`) is supported as stated. No change to `notes.json`. What the card does not
support is 1913 as the date of the text the words were checked in: the checked e-text is the
undated second edition, and the card is "medium" on that edition's date. So when the build turns
this into on-screen text, the credit must not say or imply that the 1913 edition was the one
checked (for example "1913 edition"), and must not give the second edition a year. Owner: the
builder, at the end card.

**Article 4** (`special.md`, "The medium is honest"): the credits must say every voice is
synthesized. That is the stock end card's job, and `notes.json` says the stock title and end
cards are with the project manager because they would put the lit studio at either end. If the
stock end card is dropped or replaced, the statement that every voice is synthesized must still
appear in the credits. Owner: the project manager and the builder.

## 5. Invented and presented as fact

Nothing about any thinker, text or people. The only dates and numbers are "nearly two thousand
years ago" (Tarfon; the card's phrase) and "nineteen years" (the card). Larry's walk home, the
used book with the line underlined, the busker, and the house rule are the show's own fiction and
are not offered as facts about a source.

## 6. Out of bounds (R10)

- `fast-and-fair`: "Things move fast lately. And fair is hard to find." The owner's frame in
  plain terms. No event, person, party, country, law or side.
- `q-put-right` and what follows (condition C3): "What if none of it ever gets put right?" /
  "I don't know. I really don't." / Tarfon / `used-book` / `guest-in-sentence` / the borrowing.
  The two lines new to this exchange since the drafts (`used-book` from writer-1,
  `guest-in-sentence` from writer-3) are about where Larry found the line and what it meant; none
  turns the exchange toward a cause. "None of it" is never named. Within bounds.
- The crossing: waiting at DON'T WALK on an empty road ("No cars, I know. I wait anyway.") is a
  street habit, and the red-to-green signal is a traffic light. I considered whether either could
  be read as a stance on rules or as a colour of a side, and do not find that a reasonable
  reading.
- `how-have-you-been` / `yeah-me-too`, `q-does-it-help` / `some-nights`: a feeling, named by no
  topic. Not health.
- Religion: Torah is named only as what Tarfon meant, as the card asks; nothing is said about
  belief. "Chinese" and "Tamil" name where a book comes from, in the cards' safe wording. This is
  the use the special's premise and the cards allow.
- Jobs and money: `mail-it` ("They'd mail it.") refers to Larry's paycheck, which is not a
  finding. The owner's lines ("crazy mixed up world", "feel sane") are not findings.

## 7. Respect

No joke at any text's expense, no ranking, and Larry speaks for no tradition. The Tarfon line is
staged "plainly, not performing it", with a silence after. "So you see my position" makes a joke
of Larry's dilemma, not of the Kural. Nothing to change.

## 8. On screen

The only words on screen are OPEN (a small neon), DON'T WALK and WALK: each a glance. The
envelope is blank; the restaurant, the busker, the street and the building are unnamed, with no
number, sign or handle that could belong to a real business or person (R8). The busker is an
invented one-off and is unnamed.

## 9. The fixed points

- The holiday is never named; the food is "one big covered dish that nobody names", steam, a
  bowl. Nothing names a holiday food. ok.
- The viewer never speaks: three questions said back (`q-does-it-help`, `q-put-right`,
  `q-come-up`), one asked and answered in silence (`how-have-you-been`), one look answered
  (`no-cars`). The viewer's footsteps are a sound, not words. ok.
- No laugh, applause or sting: the effects are `whoosh`, `tick` and `murmur` only. Dee's "Ha!" is
  a character's voiced laugh, uncaptioned, not an audience. ok.
- Nothing is said after the owner's last line: `stay-warm` is the last beat. ok.
- The owner's lines are all present, tidied only in punctuation and capitals; the table line is
  one sentence taken as two beats at its full stop with nothing between them.
- Word count: **397 spoken** (396 without "Ha!"), 408 with the sung syllables. See V1.
