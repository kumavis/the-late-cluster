# The ledger

The record of what *The Late Cluster* has already done: every aired or drafted joke, runner,
catchphrase, format, guest, account shown on screen, song genre and staging device, by episode. It
exists so that those things are not done again.

## Who reads it

| | reads the ledger |
|---|---|
| Reviewer | yes. It is the reviewer's instrument |
| Project manager | yes |
| Writer | **never** |
| Researcher | never |
| Builder | never |

A writer who has read the ledger can no longer be trusted to be writing from this window's
material, and a builder who has read it will restage what it describes. If you are a writer, a
researcher or a builder and you have opened this folder by mistake, close it and tell the project
manager.

Nothing in this folder is copied, quoted or summarised into `docs/bible/`, into a brief, or into a
prompt for a writer, a researcher or a builder. What the show said and did stays here. Three things
cross, and each is built to carry no joke, line or device:

- **Who has been featured.** The scraper reads the tracker and marks every author in the digest with
  `featuredPrevious` and `featuredEarlier` (`"spoke"`, `"shown"` or null) and `timesFeatured`.
  Researchers and writers see those marks, so that research and drafting lean toward fresh people.
  The marks are facts about whether and how often someone appeared. They say nothing of what anyone
  said or did on the show.
- **A reviewer's send-back** on a blocked item, which carries as little as possible (see "What goes
  back to the writer").
- **The episode's experiment,** which a reviewer writes for the writers' briefs without describing
  any earlier episode.

`docs/WORKFLOW.md` is the contract this folder serves ("Who may read what", "The repetition gate").

## What is in it

| file | what |
|---|---|
| `<episode-id>.md` | the prose record of one episode, segment by segment |
| `<episode-id>.json` | the same episode, machine-readable; tools read it |
| `featured.json` | **the tracker**: who was featured when, keyed by DID |
| `lore.md` | the continuity file of the aired episodes: the show's fiction, its gags, the set's state, what it has said about the community, and the cross-episode logs |
| `register.md` | the rules the first bible drew from the pilot and what became of each; experiments and what they tested |

Episodes so far:

| id | status | record |
|---|---|---|
| `001-pilot` | aired 2026-11-13 | [001-pilot.md](001-pilot.md), [001-pilot.json](001-pilot.json) |
| `002-the-joke-nobody-built` | drafted 2026-11-19, never aired | [002-the-joke-nobody-built.md](002-the-joke-nobody-built.md), [002-the-joke-nobody-built.json](002-the-joke-nobody-built.json) |
| `002-2026-w47` | aired 2026-11-21; the last weekly episode, and the last one with real people in it | [002-2026-w47.md](002-2026-w47.md), [002-2026-w47.json](002-2026-w47.json) |
| `003-holiday-2026` | aired 2026-11-28; a holiday special with no posts and no people; **the previous aired episode for the next run** | [003-holiday-2026.md](003-holiday-2026.md), [003-holiday-2026.json](003-holiday-2026.json) |

Because the previous aired episode is a special that featured nobody and used no window, two
things about the next run are not as usual. The people rules find no speakers in the previous
episode, so the tool bars nobody; the eight who spoke in `002-2026-w47` were last on screen one
aired episode ago. And the scraper's default window starts when the special aired, though
nothing the community posted since `002-2026-w47`'s window has been on the show. Both are in
the special's record under "How to use this entry"; put them to the project manager.

## Giving a verdict: fresh, turned or repeat

At the repetition gate two reviewers work independently, each with the ledger and the earlier
scripts open, on every shortlisted idea (stage 5) and later on every selected script (stage 7). Each
item gets one verdict. When the two disagree, the stricter stands (repeat over turned, turned over
fresh).

- **fresh**: the show has not done it.
- **turned**: it takes something the show did and turns it on its head, by inverting the expectation
  the earlier thing set up, or by making fun of the earlier joke itself. Allowed, at most once per
  episode. The verdict records what is turned and how.
- **repeat**: the same joke, runner, catchphrase, device or shape as before. Blocked.

### How to look

1. Read the idea or the script first, without the ledger, and write down in one line each: its
   premise, its turn, what lands on screen, and anything in it that recurs.
2. Then search the ledger. Start with the `.json` files (runners, catchphrases, devices), then the
   prose record of the previous aired episode in full, then earlier ones.
3. Decide by mechanism, not by subject or wording. The questions below say what "the same" means
   for each kind of thing.

### What counts as the same

| kind | it is a repeat when | it is not a repeat when |
|---|---|---|
| **joke** | the premise and the turn are both the same, even with new nouns. Test: one sentence describes both jokes without naming their subjects | the subject returns with a different turn; the same kind of fact (a number, a rule) is used for a different surprise |
| **runner** | the same engine recurs: what keeps happening and why that is funny. A new count, a new "shape" for it, or a smaller dose is still the same runner | an episode builds a runner of its own from its window; a house character behaves in character (the host being the one things happen to is who he is; the particular things that happened to him are done) |
| **catchphrase** | the phrase, or a variant a viewer would recognise as it, is said by anyone or shown on screen | a real person's own phrase appears inside their own post, performed verbatim in its own context. That is their words. The show's staging of it (a stamp, a sound) is a device and is judged as one |
| **device** | the same staging idea does the same job: a fixture, a prop with a meaning, a ritual way to open or close, a set piece | a drawing primitive is used again (a post card, a chart, a board of numbers, a cut to the band). Primitives are the studio; a primitive used so often that it reads as a tic is a note for the scorecard, not a repeat |
| **segment shape** | the order of moves inside a segment is the same as last time: how it opens, how it escalates, how it ends. Two of those three the same is a repeat | a standing format returns (the interview, Top Chicken, music). Those recur by the owner's decision; what must be new is how each is built |
| **episode shape** | the episode opens the same way and closes the same way as the previous aired episode, or runs its formats in the same order | one of the two matches for a reason that comes from the material |
| **song** | the genre is the previous aired episode's, or the song makes its joke with the same structure as an earlier song | the genre was used some episodes ago (the tool warns inside a configured window) and the reviewers agree the audience will not hear it as a return |
| **person** | see "People and the tracker" below | |

The show's own history as a subject is a repeat by itself: a callback to an earlier episode, a
returning prop, "last week", "as always", a tag pointing at an earlier episode. The only exceptions
are the episode's one turned item, and a correction the project manager has ordered.

### Calibration: the trial

The clearest example of a repeat is [002](002-the-joke-nobody-built.md), whose record has a table of
what it took from the pilot. Two things in it are worth knowing before you judge anything else.

- **A new shape is not a turn.** The draft never did "Built it." the same way twice, exactly as the
  first bible asked, and the owner's verdict was that the joke had been done to death.
- **An inversion that needs the old machinery all night is not a turn.** The draft's premise was the
  pilot's premise upside down: a wish for one thing nobody builds. It was offered as a change. But it
  kept the bot, the line, the counter and the tally on screen in four of five segments, so what the
  viewer saw was the same runner again. A turn is one item at one moment. If the idea only works
  with the earlier episode's apparatus rebuilt around it, the verdict is repeat.

### When turned is the right verdict

All four must hold.

1. You can name the expectation the earlier item left in a viewer: "when X happens, Y follows."
2. The new item defeats that expectation or makes the earlier joke itself the target. It does not
   merely vary it, shrink it, or acknowledge it with a wink.
3. It is a complete joke for someone who never saw the original.
4. No other item in the episode has the verdict turned.

Record in the verdict file: the earlier item (episode, segment, one line), the expectation, and how
the new item turns it.

### Aired and drafted

Each episode's `.json` says `"aired": true` or `false`, and a draft's appearances in the tracker
carry `"aired": false`. The difference matters because the audience has only seen what aired.

- **Verdicts are given against aired episodes.** "The previous episode" means the previous aired one.
- **A draft's material is free.** The posts and events an unaired draft drew on have not been on the
  show.
- **A draft's people have not been featured by it.** They do not count against anyone in the people
  rules below.
- **A draft's jokes are on the record but do not block by themselves.** If a new idea matches
  something that only ever appeared in an unaired draft, the verdict is fresh, with a note that says
  so. Look harder at it all the same: two independent runs arriving at the same joke often means it
  is the obvious joke.
- **What a draft repeated from an aired episode stays a repeat.** A draft does not launder anything.

This reading is the ledger's own and the owner has not ruled on it; if the owner rules otherwise,
change this section.

## People and the tracker

`featured.json` is how the show keeps the same few people from appearing too often. It lists every
real account the show has featured, by DID, with one entry for each appearance: the episode, the
date, and whether the person's puppet **spoke** or their post was only **shown**.

The owner's view is that excluding past guests outright is too strong, but that they should not be in
too often. So:

- **Nobody is barred for having appeared before.** The tracker is not a blocklist.
- **Fresh people are preferred.** Between two pieces of material of equal strength, take the one
  whose people the show has not featured.
- **One rest after speaking.** An account whose puppet spoke in the previous aired episode does not
  speak in this one. It may be shown.
- **Mostly new on screen.** At most half of the real accounts featured in an episode have been
  featured before.
- **Not too often over time.** The tool reads the tracker and warns when someone would be featured in
  more than a set share of recent episodes. A warning is weighed in the variety pass at ranking and
  again at the gate; it is not a block. When you let it stand, say why the material could not have
  come from anyone else.

The shares and the number of recent episodes are configuration (`people` in
`packages/writers-room/config/pipeline.json`), and the tool applies "one rest after speaking" and
"mostly new on screen" itself. If the tool and this page disagree, tell the project manager; do not
pick one.

Things to know when counting:

- The winner of Top Chicken is the game's choice, not the show's. Naming them is never blocked. They
  still count as featured, so the rest of the episode has to supply the variety.
- An account credited on screen for something it made counts as shown, whether or not a post of
  theirs is on a card.
- A bot counts as its own account (R13: the operator is who the rules protect).
- Handles change. Match on the DID. The `handle` field is the handle as last seen.
- The tracker is also what the digest's `featuredPrevious`, `featuredEarlier` and `timesFeatured`
  marks are computed from, so an appearance left out of it misleads the next episode's research.
- These rules are about variety. Whether someone may appear at all is decided first, by the
  constitution: the opt-out list, the out-of-bounds subjects, the repost test.

## What goes back to the writer

A blocked item returns to its writer through the project manager with the least that will let the
writer avoid the earlier thing or turn it. Writers cannot see the ledger, so the note is all they
will ever know about what was done. Write it in this form:

```
Item: <the writer's own idea or line, by its id>
Verdict: repeat
Kind: joke | runner | catchphrase | device | segment shape | episode shape | song | person
What it repeats: <one line describing the mechanism, in neutral words>
A turn: open | not open this episode
```

Rules for the one line:

- Describe the mechanism, not the performance. "The show has had a character announce a count that
  is then made wrong" and not the lines that did it.
- Never quote an earlier script, name an earlier segment's title, or name who was in it.
- Never say what the audience liked. Praise for a past joke is an instruction to write it again.
- For a person: "not available to speak this episode" or "featured recently; prefer someone else".
  The digest's marks already tell the writer whether and how often the person was featured. Add
  nothing about what they said or did.
- For a song genre: the genre's name is enough.
- If the same writer is blocked twice on the same thing, the brief is at fault, not the writer. Tell
  the project manager.

**When a turn is open** and the writer takes it, the writer answers with the expectation they are
turning and how. The two reviewers judge that answer like any other item. If either says it is
still a repeat, it is replaced, not revised a third time.

## Writing an entry after an episode

The reviewer at the last stage writes the entry, whether the episode is approved or sent back for
good. An abandoned draft gets an entry too, marked as never aired.

### The prose record, `<episode-id>.md`

Follow the order of [001-pilot.md](001-pilot.md).

1. **Header.** Aired or drafted, the date, the window, the running time, where the source is.
2. **Runners and catchphrases, with counts.** Everything that recurred inside the episode: what it
   is, where, how often, including variants on screen.
3. **Segment by segment.** For each: its shape (the order of its moves) in two or three lines; who
   spoke; whose posts were shown, with dates and like counts, and whether each was performed, read
   aloud or only shown; every joke as premise, turn, punch and picture; the staging.
4. **People.** One row per real account: how they appeared and what their puppet said by source.
5. **The song.** Genre, theme, structural joke, lyric.
6. **The standing segments.** For the interview: the subject, how many exchanges, how the questions
   recreated their occasions. For Top Chicken: which results, which boards, what speculation.
7. **The experiment** and its measure. The result is added after air.
8. **Anything that broke a rule,** found at review or later.
9. **Reactions after air,** added when the next window's research is in. Evidence, not a to-do list.

The test of a record: a second reviewer, given a new idea in two lines, can tell from the record
alone whether the show has done it.

### The machine-readable record, `<episode-id>.json`

Exactly these keys, no others. Two tools read these files.

```json
{
  "id": "003-example",
  "aired": true,
  "guests": [{ "did": "did:plc:…", "handle": "someone.example" }],
  "featured": [{ "did": "did:plc:…", "handle": "someone.example" }],
  "formats": ["interview", "top-chicken", "music"],
  "song": { "genre": "…", "theme": "…" },
  "runners": ["…"],
  "catchphrases": ["…"],
  "devices": ["…"]
}
```

- `id` is the file's name without the extension.
- `guests`: the real accounts whose puppets spoke.
- `featured`: every real account shown on screen in any way: a puppet, a post card, a handle in a
  label, a credit. It includes everyone in `guests`.
- `did` comes from the episode's research or sources record. If an account can no longer be resolved,
  write `"did": null` and keep the handle.
- `formats`: one short slug per segment kind, in running order.
- `runners`, `catchphrases`, `devices`: one plain line each, written so that a search for the idea
  finds it. House characters and invented accounts are not people and are not listed.

### The tracker, `featured.json`

Add one appearance for each account in the episode's `featured` list.

```json
{
  "did:plc:…": {
    "handle": "someone.example",
    "appearances": [
      { "episode": "003-example", "date": "2026-11-27", "role": "spoke" }
    ]
  }
}
```

- The key is the DID. `handle` is the handle as last seen; update it when it changes.
- `role` is `"spoke"` if the account's puppet said anything in the episode, otherwise `"shown"`.
- `date` is the air date. For a draft that never aired it is the date the draft was produced, and the
  appearance carries the extra field `"aired": false`. If the draft later airs under the same id,
  remove the field and correct the date.

### The continuity file and the register

For an aired episode, append to [lore.md](lore.md) (what it established, the set's end state, one row
in each log) and note in [register.md](register.md) any rule its experiment tested.

## Opt-outs

Chapter 9's R11 says that after an opt-out the account is removed "from lore". Lore now lives here,
so this is where it is done, by a reviewer, promptly:

- In every prose record and in `lore.md`, replace the account's name and handle with "an account that
  has since opted out" and remove their words. Keep the description of the joke's mechanism, so the
  gate still works.
- Remove them from each episode's `guests` and `featured` lists and delete their key from
  `featured.json`. An opted-out account can never appear again, so the tracker has no use for them.
- Tell the reviewer the owner has named, who decides whether a published episode needs re-cutting.

## When the bible changes because of an episode

Evidence about episodes lives here. When a result should change `docs/bible/`, the change is written
there as a principle, with a constructed example if it needs one, and never as an account of what an
episode did. Before approving an amendment, read it as a writer would and ask whether it would let
them reproduce the episode it came from. If it would, it belongs in this folder instead.
