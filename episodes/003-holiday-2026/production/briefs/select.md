# Select: score the three drafts of the holiday special

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `select.<your reviewer id>`, for the holiday special `003-holiday-2026`. Your
  reviewer id (`reviewer-1` or `reviewer-2`) is given to you when you are spawned.
- **Write:** `episodes/003-holiday-2026/production/review/select/<your reviewer id>.json`.
  Nothing else.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md`: the owner's outline. It is the brief
  the drafts were written to, and the standard you judge them against.
- `episodes/003-holiday-2026/production/special.md`: what the owner's outline sets aside for
  this special, and what does not change. Do not mark a draft down for what the owner set
  aside: no posts, no guests, no standing segments, sincerity as the piece, no audience.
- `episodes/003-holiday-2026/production/research/philosophy.md` and `research/staging.md`
- `episodes/003-holiday-2026/production/drafts/writer-1/`, `writer-2/`, `writer-3/`: each a
  `script.js` and a `notes.json`
- `docs/bible/00-constitution.md`, `docs/bible/02-cast.md`, `docs/bible/01-premise.md`,
  `docs/bible/07-voices.md`, `docs/bible/08-direction.md`, `docs/bible/10-process.md`
- `docs/ledger/` (start with `README.md`, "Giving a verdict" and "What counts as the same",
  then `lore.md` and the two aired episodes' records) and the aired scripts under
  `episodes/001-pilot/` and `episodes/002-2026-w47/`. The aired episodes are `001-pilot` and
  `002-2026-w47`; the previous aired episode is `002-2026-w47`.

Another reviewer is judging the same drafts alone. Do not read `review/select/` for their file.

## The task

Read each draft as a viewer would meet it: four minutes, once, with sound, on a phone.

**1. Score each draft, 0 to 5 on each of five questions.** Give the evidence: a line id, a cue.

- `moves`: is it true and does it land? Is the feeling earned by what happens, or asked for?
  Mark down a speech, a line that tells the viewer how to feel, a summing-up, a swell. Where
  it is light, is the lightness Larry's and is it in the right place?
- `interesting`: the constitution's test. Name the turn or the feeling in five words. Could
  only this special contain it? Would a viewer tell someone about it in one sentence? Apply
  the cut test to every idea and every street scene, and list what would not be missed.
- `television`: is there something to watch at every moment? Do the street and the words
  meet, or is it a voice over scenery? Could a builder stage each cue in the show's look
  (`research/staging.md`)? Is anything put on screen to be read in silence?
- `larry`: is this the man in the cast chapter with the show switched off: dry, a well-read
  newcomer and never the expert, kind? Does the device of repeating the viewer's question
  sound like conversation? Are the crew at the table themselves?
- `ideas`: do the ideas offer an answer a person could use tonight, or are they displayed?
  Is each one clear on one hearing in a synthetic voice? Are they from different cultures
  without becoming a list? (An auditor checks the attributions separately; if you see one
  that looks wrong, say so.)

Also check each draft against the outline's fixed points: the five owner's lines in their
places, the viewer never speaking, the holiday never named, about four minutes (400 to 470
spoken words), the last words being the owner's.

**2. The repetition gate.** With the ledger and the aired scripts in front of you, give each
draft one verdict: `fresh`, `turned` (it takes something the show did and turns it on its
head; say what and how) or `repeat` (the same joke, runner, catchphrase, device or shape as
an aired episode). The special's format is new by the owner's choice; judge its lines,
devices, images and how it opens and closes. If part of a draft repeats and the rest is
fresh, give the verdict `repeat`, and say in `avoid` the least a writer needs in order to
steer clear, with no earlier script, title, line or reaction in it.

**3. Pick one draft** to go forward, and say why in a few sentences.

**4. What the pick still needs.** List the reasons you would send it back with, each naming
the line ids or cues it is about. Reasons, not rewrites: say what is wrong and why, never
what to write instead. Then, under `fromOthers`, name any moment in a draft you did not pick
that does something the pick fails to do, by draft and line id, and say what it does.

**5. The measure.** The special is the show's experiment this time: four earnest minutes in
Larry's own words. Write one sentence saying how someone else could check, from the finished
special, whether it worked.

## The file

```json
{
  "reviewer": "<your reviewer id>",
  "drafts": [
    {
      "id": "writer-1",
      "scores": { "moves": 0, "interesting": 0, "television": 0, "larry": 0, "ideas": 0 },
      "feeling": "<the feeling in five words, or 'none'>",
      "retell": "<one sentence, or 'none'>",
      "evidence": "<the lines and cues your scores rest on>",
      "wouldNotBeMissed": ["<line id or cue>: <why>"],
      "fixedPoints": "<ok, or what is missing>",
      "verdict": "fresh | turned | repeat",
      "turned": { "what": "", "how": "" },
      "avoid": "",
      "reason": "<for the verdict>"
    }
  ],
  "pick": "writer-1 | writer-2 | writer-3",
  "why": "",
  "sendBack": ["<a reason, naming line ids or cues>"],
  "fromOthers": [{ "draft": "writer-2", "lines": ["<line id>"], "what": "" }],
  "measure": ""
}
```

Check it parses: `node -e 'JSON.parse(require("fs").readFileSync("episodes/003-holiday-2026/production/review/select/<your reviewer id>.json","utf8"));console.log("ok")'`

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- Fail what you are not sure passes. If none of the three is good enough to go forward, say so
  in `why` and still name the least bad as `pick`.
- You do not rewrite what you review. You work alone, from this brief and the files it names.
  When you finish, reply in two or three sentences: your pick and the main reason.
