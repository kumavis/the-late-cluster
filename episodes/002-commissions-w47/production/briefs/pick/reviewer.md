# Brief: pick ideas and run the repetition gate on them (commission, 21 November 2026)

You are one of two reviewers. Judge alone; a tool combines your file with the other's by
arithmetic, and at repetition the stricter verdict stands. Your reviewer number is in the message
that gave you this brief.

**What this is.** Not an episode. The owner commissioned draft scripts on two subjects; read
`episodes/002-commissions-w47/production/commission.md` first (it is short). Two writers
brainstormed 32 ideas each over four cards without seeing each other's. You score every idea and
give a repetition verdict to each idea you score 4 or 5.

**Read**
- `episodes/002-commissions-w47/production/commission.md`
- `episodes/002-commissions-w47/production/brainstorm/writer-1.jsonl` and `writer-2.jsonl`. One
  idea per line. Refer to an idea as writer and line number: `1:7` is writer 1, line 7.
- `docs/bible/06-jokes.md`. `docs/bible/04-formats.md` only if you need a format's definition.
- For repetition: `docs/ledger/README.md`, `docs/ledger/001-pilot.md`, `docs/ledger/register.md`,
  `docs/ledger/lore.md`. The only aired episode is `001-pilot`. The `002-*` entries are unaired
  drafts: they do not make anything a repeat. Where an idea overlaps one of them, say so in `why`.
- A kept card (`episodes/002-commissions-w47/production/research/kept/<card>.json`) only when an
  idea's worth depends on what a post actually says.
- Not the terms files. An auditor is checking use separately.

**Score** each idea 1 to 5 for how much the community this show is about would want to watch it
as a segment of two minutes or less: 5 it must be drafted, 4 worth a draft, 3 fine, 2 weak, 1 no.
The first rule of the show overrules structure: only include it if it's interesting. On the
making-of card the commission asks for three things: an explainer that is recursive, staged in
three dimensions, with Larry's turn to the audience. Score how well the idea would carry them,
not whether it mentions them.

**Verdict** on each idea you score 4 or 5: `fresh`, `turned` or `repeat`, as your role sheet sets
out.

**Write** `episodes/002-commissions-w47/production/review/pick-<your number>.jsonl`. 64 lines, one
per idea, keys in this order:
`idea` (such as `"1:7"`), `card`, `score`, `verdict` (null under 4), `turned` (what is turned and
how, or null), `avoid` (for a repeat, or null), `same_as` (the reference of the other writer's
idea when two are the same idea, or null), `why` (one sentence; writers never see this file).
Then one last line:
`{"summary": {"riemann": {"first": "...", "second": "..."}, "making-of": {"first": "...", "second": "..."}}}`
saying, for each subject, which idea or pair of ideas you would send to draft first and second,
and in a clause why. The three Riemann cards are one subject: two drafts in all, which may come
from one card or two.

**Check before you reply:** every line parses as JSON; 64 idea lines; every reference from `1:1`
to `2:32` appears once.

Reply in two or three sentences.
