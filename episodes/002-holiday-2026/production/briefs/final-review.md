# Final review: the repetition gate, and is it ready for the owner

- **Role:** reviewer (spawn the `reviewer` subagent defined in .claude/agents/reviewer.md)
- **Task:** `final.<your reviewer id>`, round `<round>`, for the holiday special
  `002-holiday-2026`. Your reviewer id and the round are given to you when you are spawned.
- **Write:** `episodes/002-holiday-2026/production/review/final/<your reviewer id>-r<round>.json`.
  Nothing else.

## Read

- `episodes/002-holiday-2026/production/owner-notes.md`: the owner's outline, the standard.
- `episodes/002-holiday-2026/production/special.md`: what the owner set aside for this special
  and what does not change. Do not mark the script down for what the owner set aside.
- `episodes/002-holiday-2026/segments/walk/script.js` and `notes.json`: the final script.
- `episodes/002-holiday-2026/production/assembly.md`: where each part came from, and how the
  writer says each reason sent back was answered.
- `episodes/002-holiday-2026/production/select.md`: what was decided about the three drafts,
  the five items stopped at the repetition gate, and the reasons sent back.
- `episodes/002-holiday-2026/production/review/select/` and, if this is a later round,
  `review/final/` from earlier rounds: the reviewers' own files. The three drafts are under
  `production/drafts/`.
- `episodes/002-holiday-2026/production/research/philosophy.md` and `research/staging.md`
- `docs/bible/` (the constitution, the cast, premise, voices, direction and process chapters)
- `docs/ledger/` (`README.md` for how to judge, `lore.md`, and the two aired records) and the
  aired scripts under `episodes/001-pilot/` and `episodes/002-2026-w47/`. The previous aired
  episode is `002-2026-w47`.

Another reviewer is judging the same script alone. Do not read their file for this round.

## The task

Read it as a viewer would meet it: four minutes, once, with sound, on a phone. Then judge.

**1. The repetition gate.** Give the script one verdict: `fresh`, `turned` or `repeat`. Judge
every line, device, image, sound and the way it opens and closes against the aired episodes.
Check each of the five items stopped at select: it must not have come back in any form. If
anything repeats, the verdict is `repeat`, and for each item give the line id or cue, and an
`avoid` line: the least a writer needs to steer clear, with no earlier script, title, line or
reaction in it. Say what you looked at hard and passed.

**2. Score it**, 0 to 5 on the same five questions as at select (`moves`, `interesting`,
`television`, `larry`, `ideas`), with the line ids and cues your scores rest on. Name the
feeling in five words and give the one-sentence retell.

**3. The fixed points.** The five owner's lines in their places and unbroken by anything that
reads as a joke on them; the viewer never speaking; the question device staged as listening;
the holiday and its food unnamed; no laugh, applause or sting; nothing on screen to read
beyond a glance; a meal shared with us at the table; 400 to 470 words; the owner's goodnight
last.

**4. The reasons.** For each reason in `select.md` under "The reasons sent back with the
base", say whether the final script answers it: `yes`, `partly` or `no`, in a line. You are
judging the script, not the writer's account of it in `assembly.md`.

**5. Is it one piece?** It was made from a base and from moments of two other drafts. Say
where a join shows: a change of voice, an idea that no longer follows, a set-up whose payoff
was cut, a payoff whose set-up was cut.

**6. Ready or not.** `ready: true` means you would put this in front of the owner as it is,
and what you list under `sendBack` is small. `ready: false` means it goes back to the writer
first; say which reasons are the ones that hold it. A `repeat` verdict or a broken fixed point
is always `ready: false`. Fail what you are not sure passes.

**7. For the owner.** The owner will read this script and then talk it through. List what the
owner should know or decide: a choice in the script that could reasonably go the other way, a
line near a limit, anything that rests on how it will be staged or heard.

## The file

```json
{
  "reviewer": "<your reviewer id>",
  "round": 1,
  "version": "<first 12 characters of the script's sha256: shasum -a 256 episodes/002-holiday-2026/segments/walk/script.js>",
  "verdict": "fresh | turned | repeat",
  "turned": { "what": "", "how": "" },
  "repeats": [{ "item": "<line id or cue>", "avoid": "", "reason": "" }],
  "stoppedItems": "<ok: none has come back, or where one has>",
  "lookedAtAndPassed": "",
  "reason": "<for the verdict>",
  "scores": { "moves": 0, "interesting": 0, "television": 0, "larry": 0, "ideas": 0 },
  "feeling": "",
  "retell": "",
  "evidence": "",
  "fixedPoints": "<ok, or what is broken>",
  "reasons": [{ "reason": "<a few words>", "answered": "yes | partly | no", "note": "" }],
  "joins": ["<where a join shows, with line ids>"],
  "wouldNotBeMissed": ["<line id or cue>: <why>"],
  "sendBack": ["<a reason, naming line ids or cues>"],
  "ready": true,
  "holds": ["<if not ready: the reasons that hold it>"],
  "forTheOwner": [""]
}
```

Check it parses: `node -e 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));console.log("ok")' <your file>`

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- Reasons, not rewrites: say what is wrong and why, never what to write instead.
- You work alone, from this brief and the files it names. When you finish, reply in two or
  three sentences: your verdict, whether it is ready, and the main reason.
