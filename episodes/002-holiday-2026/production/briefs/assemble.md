# Write the final script of the holiday special

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `assemble.writer`, for the holiday special `002-holiday-2026`
- **Write:** `episodes/002-holiday-2026/segments/walk/script.js`,
  `episodes/002-holiday-2026/segments/walk/notes.json` and
  `episodes/002-holiday-2026/production/assembly.md`. Nothing else.
- **Check before you stop:** the count command at the end of this brief.

## Read

- `episodes/002-holiday-2026/production/owner-notes.md`: the owner's outline. It is the brief.
- `episodes/002-holiday-2026/production/special.md`: what the special changes and what it
  does not.
- `episodes/002-holiday-2026/production/select.md`: what two reviewers and an auditor decided
  about the three drafts. **This is the heart of your task.** It names the base, what was
  stopped at the repetition gate, the reasons sent back, and what the other drafts do that the
  base does not.
- `episodes/002-holiday-2026/production/drafts/writer-2/` (the base), `writer-1/` and
  `writer-3/`: each a `script.js` and a `notes.json`.
- `episodes/002-holiday-2026/production/research/philosophy.md` and `research/staging.md`
- `docs/bible/00-constitution.md`, Article 1; `docs/bible/02-cast.md`;
  `docs/bible/01-premise.md`, "Sincerity"; `docs/bible/07-voices.md` (skip "Songs" unless you
  write music); `docs/bible/08-direction.md`, "Television" and "Principles"
- `packages/show/tools/README.md`, "Writing a segment script" and "The audience and the band"

## Do not read

`docs/ledger/`, `docs/trials/`, any other folder under `episodes/`, `dist/`, `preview/`,
`shots/`, `video/`, any `production/review/`, git history. What crosses from the reviewers is
in `select.md` and nowhere else.

## The task

Three writers each drafted the whole special. Reviewers chose one as the base and said, with
reasons, what it still needs and what the other two do better. Write the one script that goes
to the owner.

It is one piece by one writer, not a collage. Start from the base and answer the reasons. Where
another draft does something the base fails to do, you may take the moment, its lines and its
cues, and you may rewrite either to make them one voice. Where nothing in the three drafts
answers a reason, write new. You are not obliged to use anything the reviewers praised: four
minutes will not hold all of it, and a script that tries will have the fault the reviewers
found most often, a stop every fifteen seconds and no room to look. Choose.

Things that are settled:

- **The five owner's lines**, in their places, only punctuation and capitals tidied; the last
  words of the special are "Stay warm, folks. Goodnight." and nothing follows them. Run the
  owner's table line, "It's a crazy mixed up world out there. Keep the ones that make you feel
  sane close.", so that nothing reads as a joke on it.
- **The viewer never speaks.** When Larry says a question back, stage it as listening: he
  turns, there is a held moment where the question would be, and then he says it. A few times,
  and at least once for a question that is hard.
- **The five items stopped at the repetition gate** do not come back in any form.
- **The ideas**: three at most, and two if two land harder. Each one is something a person
  could use tonight, each is met by something the street does, and no two arrive the same
  way. Attribute only in the wording the card calls safe; quote only a card's verified
  quotation, exact; mark each line `// card: <id>, quoted` or `// card: <id>, told`. When
  Larry tells an idea in his own words, he says it is his telling.
- **Nothing on screen to read** beyond a glance. No source lines during the walk. Put the
  translations you quote in `notes.json` under `credits`, for the end credits.
- **It ends at a table where a meal is shared and we are at it.** Coming in is something that
  happens to us. The friends are themselves and talk to each other, not in turn to camera.
- **Larry is personal tonight**, and slower to joke. Count his tags: a quip at every stop is
  the host at work.
- **Out of bounds stays out**, the holiday and its food are not named, no laugh, applause or
  sting, and nothing refers to the show's earlier episodes.
- **Hands do not exist** (`research/staging.md`). Things are already in place, or happen just
  out of frame.

**Length.** 400 to 470 spoken words in all, counting the `text` of every `say` beat and the
lyrics of anything sung. Leave real silences. Four minutes.

## notes.json

The same shape as the drafts' `notes.json`, with `"writer": "assemble"`, and one more field:

```json
"credits": [{ "work": "", "translator": "", "year": 0, "line": "<the say beat's id>" }]
```

## assembly.md

Short and plain, for the reviewers and the owner:

1. **What it is**: the title, the retell in one sentence, the feeling in five words.
2. **Where each part came from**: a table of every `say` and `sing` beat by id, with one of
   `base` (unchanged from writer-2, give its id there), `writer-1` or `writer-3` (taken, give
   its id there, and say `changed` if you altered a word), or `new`.
3. **The reasons, answered**: each reason in `select.md` under "The reasons sent back with
   the base", and what you did about it, in a line each. If you chose not to act on one, say
   why.
4. **What you left out** that the reviewers praised, and why, in a line each.
5. **For the owner**: any choice you made that the owner might want to make differently, as a
   plain either-or.

## The count

```bash
node -e 'import(process.cwd()+"/episodes/002-holiday-2026/segments/walk/script.js").then(m=>{const s=m.default;const n=t=>String(t||"").trim().split(/\s+/).filter(Boolean).length;let w=0,l=0;const ids=new Set();for(const b of s.beats){if(b.say){l++;w+=n(b.text);if(b.as&&n(b.as)!==n(b.text))console.log("as/text word counts differ:",b.id||b.text)}if(b.sing)w+=n(b.lyrics);if(b.music)for(const t of b.music.tracks||[])if(t.lyrics)w+=n(t.lyrics);for(const k of ["id","cue"]){const v=typeof b[k]==="string"&&(k==="cue"||b.say||b.sing)?k+":"+b[k]:null;if(v){if(ids.has(v))console.log("duplicate",v);ids.add(v)}}}console.log(s.id,l,"spoken lines,",w,"words")})'
```

It must load without an error, print `walk`, and report 400 to 470 words.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- You work alone, from this brief and the files it names. Nobody will answer questions. Do not
  score your own script. When you finish, reply with two or three sentences: what you wrote,
  and anything the next stage should know.
