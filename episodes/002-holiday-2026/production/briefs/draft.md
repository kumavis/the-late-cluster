# Draft the holiday special

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `draft.<your writer id>`, for the holiday special `002-holiday-2026`. Your writer id
  (`writer-1`, `writer-2` or `writer-3`) is given to you when you are spawned.
- **Write:** `episodes/002-holiday-2026/production/drafts/<your writer id>/script.js` and
  `episodes/002-holiday-2026/production/drafts/<your writer id>/notes.json`. Nothing else.
- **Check before you stop:** the count command at the end of this brief.

## Read

- `episodes/002-holiday-2026/production/owner-notes.md`: the owner's outline. This is the brief.
- `episodes/002-holiday-2026/production/special.md`: what the special changes about the show
  and what it does not.
- `episodes/002-holiday-2026/production/research/philosophy.md`: the shelf of ideas, each with
  a checked source, a verified quotation where there is one, the safe wording for who said it,
  and the traps.
- `episodes/002-holiday-2026/production/research/staging.md`: what the studio can show and
  what a cue can ask for.
- `docs/bible/00-constitution.md`, Article 1 (the interesting test).
- `docs/bible/02-cast.md`: who Larry, Sibyl, Hy, Al, Dee, Pete and Eppy are.
- `docs/bible/01-premise.md`, "Sincerity": what makes it work and what going soft looks like.
- `docs/bible/07-voices.md`: writing for the voice engine. Skip "Songs" unless you write music.
- `docs/bible/08-direction.md`, "Television" and "Principles".
- `packages/show/tools/README.md`, "Writing a segment script" (the format) and "The audience
  and the band" (the sounds that exist).
- `docs/voice-research.md` if you want to know which words the voice finds hard.

## Do not read

Writers never see what the show has already done; reviewers do, which is how repetition is
caught. Do not open `docs/ledger/`, `docs/trials/`, any other folder under `episodes/`,
`dist/`, `preview/`, `shots/`, `video/`, any `production/review/`, git history, or another
writer's folder under `drafts/`. Two other writers are drafting the same special alone, as you
are. Reviewers choose between the three.

## The task

Write the whole special as one script, `id: 'walk'`, in the script format: the dark studio, the
walk, the table. Four minutes.

**The owner's lines.** The outline gives five lines in quotation marks. They are the owner's
and they stay, in these places, with only punctuation and capitals tidied:

- "Oh, no show tonight, folks. Holidays and all." and "Just here picking up my paycheck." in
  the dark studio
- "Would you walk with me a bit?" before he puts on the scarf
- "It's a crazy mixed up world out there. Keep the ones that make you feel sane close." at the
  table
- "Stay warm, folks. Goodnight." as the last words of the special

Everything else is yours.

**The viewer walks beside him and never speaks.** Larry hears a question and says it back
before he answers, the way a person does on a walk. Use that when a question would really be
asked. It is a device, so it wears: a few times, not every beat.

**The ideas.** Larry offers what people long ago, in different parts of the world, worked out
about carrying on. Choose from `research/philosophy.md`, from different cultures. Three or four
at most, and fewer if fewer land harder: one idea that a viewer takes home beats four that are
listed. He is not teaching a course. He is a man who read some things that helped, telling a
friend on a cold night. He can say where he met an idea, get to the point of it in a breath,
and admit what he does not know.

- Attribute only in the wording the card calls safe. If a card says a person is legendary, or
  that a book records what a teacher is said to have taught, Larry says it that way.
- A quotation is used only if its card has a verified one, exact to the word, and short. Mark
  the line with a comment naming the card: `// card: <id>, quoted` or `// card: <id>, told`.
- When he tells an idea in his own words he makes it plain that it is his telling.
- Nothing from the "Traps" or "Left out" lists. No saying credited to a people or a continent
  at large. No detail of anyone's life that the card does not give.
- These are scripture to some people now. Nothing at their expense, no ranking them, and Larry
  does not speak for them.

**What stays out.** No event, person, party, country, law or side is named or hinted at. Larry
speaks to the feeling the owner describes (things changing fast, fairness hard to find, people
unsettled) in plain human terms. The holiday is not named, and neither is its food. Nothing
about the show's earlier episodes, and nothing that feels like a catchphrase.

**The street.** The walk passes things: the owner names lively restaurants and buskers, and
you choose the rest from what `research/staging.md` says the look can carry. Write a `cue` beat
for every picture, with a comment saying what is seen. What Larry says and what the street
shows should meet: the place is part of the telling, and sometimes it answers him. Leave room
to look. A stretch with no words is allowed and is often the best part.

**The table.** Sibyl, Hy, Al, Dee, Pete and Eppy are there, off duty and themselves. They may
speak, a little. Nobody says what the evening means. The feeling is a room of people who are
glad he came, and it is shown, not announced.

**Sound.** There is no studio audience outside the studio: no laugh, applause or sting.
Describe the sound of each place in the cue's comment for the builder and the sound editor.
If a busker makes music, it can be written as a `sing` or `music` beat in a house voice, or
left as a described sound.

**Tone.** Earnest without being a speech. Short lines. He is slower to joke tonight, and when
something is funny it is small and his. Do not sum up. Do not tell the viewer how to feel. End
on the owner's two lines and nothing after them.

**Length.** 400 to 470 spoken words in all, counted from the `text` of every `say` beat (and
the lyrics of anything sung). The pace is a walk.

## notes.json

```json
{
  "writer": "<your writer id>",
  "title": "<your title for the special>",
  "retell": "<one sentence: the one where…>",
  "feeling": "<the feeling, in five words>",
  "seconds": 240,
  "words": 0,
  "ideas": [{ "card": "<id>", "use": "quoted | told", "line": "<the say beat's id>" }],
  "scenes": ["<each place, in order, a few words each>"],
  "questions": ["<each question Larry repeats back>"],
  "crew": { "sibyl": "<what she does or says at the table>", "hy": "", "al": "", "dee": "", "pete": "", "eppy": "" },
  "builder": "<what a builder needs to know>",
  "worry": "<the one thing you are least sure of>"
}
```

## The count

```bash
node -e 'import(process.cwd()+"/episodes/002-holiday-2026/production/drafts/"+process.argv[1]+"/script.js").then(m=>{const s=m.default;const n=t=>String(t||"").trim().split(/\s+/).filter(Boolean).length;let w=0,l=0;const ids=new Set();for(const b of s.beats){if(b.say){l++;w+=n(b.text);if(b.as&&n(b.as)!==n(b.text))console.log("as/text word counts differ:",b.id||b.text)}if(b.sing)w+=n(b.lyrics);for(const k of ["id","cue"]){const v=typeof b[k]==="string"&&(k==="cue"||b.say||b.sing)?k+":"+b[k]:null;if(v){if(ids.has(v))console.log("duplicate",v);ids.add(v)}}}console.log(s.id,l,"spoken lines,",w,"words")})' <your writer id>
```

It must load without an error, print `walk`, and report 400 to 470 words.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- You work alone, from this brief and the files it names. Nobody will answer questions. Do not
  score your own draft. When you finish, reply with two or three sentences: what you wrote, and
  anything the next stage should know.
