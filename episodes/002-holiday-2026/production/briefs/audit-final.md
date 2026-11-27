# Audit: the final script's attributions, and the out-of-bounds screen

- **Role:** auditor (spawn the `auditor` subagent defined in .claude/agents/auditor.md)
- **Task:** `audit.final`, round `<round>`, for the holiday special `002-holiday-2026`. The
  round is given to you when you are spawned.
- **Write:** `episodes/002-holiday-2026/production/review/audit-final-r<round>.md`. Nothing else.

## Read

- `episodes/002-holiday-2026/production/owner-notes.md` and `special.md` ("What does not
  change" is the rule you check against)
- `episodes/002-holiday-2026/production/research/philosophy.md`: the checked sources, and for
  this audit the record of what may be attributed to whom and in what wording
- `episodes/002-holiday-2026/segments/walk/script.js` and `notes.json`: the final script
- `episodes/002-holiday-2026/production/assembly.md`
- `episodes/002-holiday-2026/production/review/audit-drafts.md`: your earlier audit of the
  three drafts, which asked for two things to be rechecked in the final
- `docs/bible/00-constitution.md` and `docs/bible/09-real-people.md` (R8 and R10)

No network is needed and none is used.

## The task

Go through every spoken and sung line and every cue comment of the final script and report:

1. **Every attribution**: each place Larry names, or plainly points at, a thinker, a text, a
   tradition or a people. The line id, the card it rests on, and `ok`, `fix` (say exactly
   what is wrong) or `not on the shelf`. Check the marker comments (`// card: <id>, quoted`
   or `told`) against what the line actually does.
2. **Every quotation**, letter for letter against the card's verified quotation: `exact`, or
   show the difference. A quotation split across two beats must be continuous, with nothing
   of the writer's between its halves. Note any punctuation the caption adds.
3. **A telling that is called a telling**: where Larry gives an idea in his own words, does
   the script make it plain that the words are his? Does any telling say more, or something
   other, than the card's source says?
4. **The credits list** in `notes.json`: is every translation that is quoted named there with
   its translator and year as on the card, and is nothing listed that is not quoted?
5. **Anything invented and presented as fact**: an anecdote, a date, a number, a saying
   credited to "the ancients" or to a people at large.
6. **Out of bounds** (R10): health, grief, identity, politics, jobs, conflict; any named or
   hinted event, person, party, country, law or side. Quote the line. Look hardest at the
   lines where Larry speaks to the state of the world and where he says the viewer's question
   back. The owner's own lines, and Larry's paycheck, are not findings.
7. **Respect**: anything a community that holds one of these texts would reasonably mind.
8. **On screen**: from the cue comments, any text the viewer would have to read beyond a
   glance; any shop, sign or name that could belong to a real business or person (R8).
9. **The fixed points**: the holiday or its food named; the viewer given a voice; a laugh,
   applause or sting; anything said after the owner's last line; the spoken word count
   against 400 to 470.

Give one verdict: `pass`, or `changes` with the list. Say exactly what must change and never
how to rewrite it. You do not judge whether the script is good.

## Always

- The constitution is the owner's: never change it. You change no script.
- You work alone, from this brief and the files it names. When you finish, reply in two or
  three sentences: the verdict and the most serious finding.
