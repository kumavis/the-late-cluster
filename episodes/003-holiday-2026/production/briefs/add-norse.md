# Add the fourth idea: the Norse line on the last block

- **Role:** writer (spawn the `writer` subagent defined in .claude/agents/writer.md)
- **Task:** `rewrite.norse`, episode `003-holiday-2026`, segment `walk`
- **Edit:** `episodes/003-holiday-2026/segments/walk/script.js`, only between the cue
  `last-block` and the cue `apartment-door`, and only `say` and `cue` beats and their comments
  (the `wait` and `music` beats there are the sound editor's footsteps: leave them exactly as
  they are, in place, and the sound editor will re-lay them). Also
  `episodes/003-holiday-2026/segments/walk/notes.json`: the `ideas`, `credits`, `scenes` and
  `words` fields.
- **Write:** `episodes/003-holiday-2026/production/rewrite/norse-line.md`, half a page: the
  lines you added, word for word, and why they arrive as they do.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md`, all of it, and the last section, "a
  fourth idea". The owner chose this line.
- `episodes/003-holiday-2026/production/special.md`
- `episodes/003-holiday-2026/segments/walk/script.js`: the whole script as it stands. It is
  fitted, staged, audited and rendered; everything outside the last block is settled.
- `episodes/003-holiday-2026/production/research/philosophy.md`, the card `havamal`: the
  verified quotation, the safe wording for who said it, the traps, and what to stay away from.
- `episodes/003-holiday-2026/production/drafts/writer-3/script.js`, the beats `this-block` to
  `poem-talking` with the cues `comrade` and `glance`: the earlier draft of this moment, which
  both reviewers at select called the most personal and the truest in the three drafts. It was
  cut only to keep the special at three ideas.
- `episodes/003-holiday-2026/production/select.md`, for what the reviewers said of that moment
- `docs/bible/02-cast.md` (Larry), `docs/bible/07-voices.md` ("Pace and pauses")

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, any `production/review/`,
or git history.

## The task

On the last block before his door, Larry now says "Nearly there. I usually walk this block on
my own.", walks a beat, glances at us and away, and arrives. Put the Norse line back into that
moment, so that he tells us he is glad of the company in words that are not his, looking
straight ahead while he says it, and half takes it back.

What is settled:

- **The quoted line, exactly:** `Rich did I feel when a comrade I found.` It is the third line
  of stanza 47 of the Hávamál in Henry Adams Bellows's translation (The Poetic Edda, 1923), and
  it is on the card as verified. In the source the line ends in a comma, because the stanza
  runs on; the caption may end it with a full stop, as the script does for its other quotation.
  Mark it `// card: havamal, quoted`.
- **Who said it, in the card's safe wording:** "an old Norse poem", with or without its name.
  Not "the Vikings", not "Odin said", no author. The card says it can be told without the
  name; the name is hard for the voice, and the credits will carry it. Your choice.
- **`this-block` stays**, word for word, and stays first. The glance stays: after the quoted
  line, a beat of footsteps, his head turns to us and away again at once. Keep the cue name
  `glance` for it, moved to where it now belongs.
- **He half takes it back.** The earlier draft's "That's the poem talking. Mostly." did that,
  and both reviewers singled it out. Keep it or better it.
- **He says the line to the road, not to us.** It is not advice and he does not explain it.
  Nothing tells the viewer what it means.

What to solve:

- **How it arrives.** The script already has "There's a story about a cook in an old Chinese
  book." at the restaurant and, twenty seconds after this moment, "There's an old Tamil book
  of couplets called the Tirukkural." at his door. A reviewer noted that those two open on the
  same frame. This one must not be a third "There's an old…". It comes out of `this-block`:
  it is something he says to himself on this stretch of pavement.
- **Short.** Add no more than about 30 spoken words in all, the quoted line's nine included,
  in two to four lines: about thirteen seconds. The whole special is 4:11 and the owner's aim
  was four minutes.
- **It must still hand over to the door.** What follows is unchanged: his building, "This is
  me.", "They'll have started without me.", our staying on the pavement, "Should you come
  up?", and the Tamil couplet about a guest left outside. Read on from your lines to `position`
  and make sure the two moments do not say the same thing twice: this one is that he is glad
  we came; the door is that he cannot leave us outside.
- **A cue for each picture.** Add a cue where he begins the quoted line (he looks straight
  ahead, the lit windows going by above him) with a comment for the builder, and keep
  `glance`. Do not rename or remove any other cue.

In `notes.json`: add the idea to `ideas` (card `havamal`, `quoted`, the line's id), add the
translation to `credits` (`{ "work": "The Hávamál, stanza 47, in The Poetic Edda", "translator":
"Henry Adams Bellows", "year": 1923, "line": "<the id>" }`), touch `scenes` where the last
block is described, and set `words` to the new count (spoken words plus the busker's eleven
sung syllables).

## Check

```bash
node -e 'import(process.cwd()+"/episodes/003-holiday-2026/segments/walk/script.js").then(m=>{const s=m.default;const n=t=>String(t||"").trim().split(/\s+/).filter(Boolean).length;const ids=new Set();let w=0;for(const b of s.beats){if(b.say){w+=n(b.text);if(b.as&&n(b.as)!==n(b.text))console.log("as/text word counts differ:",b.id)}for(const k of ["id","cue"]){const v=typeof b[k]==="string"&&(k==="cue"||b.say||b.sing)?k+":"+b[k]:null;if(v){if(ids.has(v))console.log("duplicate",v);ids.add(v)}}}console.log(s.id,w,"spoken words")})'
```

It must load, print `walk`, and report no duplicate. It was 403 spoken words before you began.

## Always

- The constitution (`00-constitution.md`, `09-real-people.md`) is the owner's: never change it.
- You work alone, from this brief and the files it names. Do not render audio. When you finish,
  reply with two or three sentences: the lines you added, word for word, and the new count.
