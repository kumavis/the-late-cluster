# A rough audio cut: pacing and pauses

- **Role:** sound editor (spawn the `sound-editor` subagent defined in .claude/agents/sound-editor.md)
- **Task:** `pace.<target>`, for the holiday special `003-holiday-2026`. Your target is given
  to you when you are spawned: one of the drafts `writer-1`, `writer-2`, `writer-3`, or the
  final script `walk`.
- **Edit:** your target's `script.js` only, and only its timing (below).
  - a draft: `episodes/003-holiday-2026/production/drafts/<target>/script.js`
  - the final: `episodes/003-holiday-2026/segments/walk/script.js`
- **Write:** `episodes/003-holiday-2026/production/fit/pace-<target>.md`, your report.
- **Render with:**
  - a draft: `npm run render -- 003-holiday-2026 --draft <target>`, which writes
    `packages/show/tools/.cache/drafts/003-holiday-2026/<target>/audio/<target>.mp3`
  - the final: `npm run render -- 003-holiday-2026 walk`, which writes
    `episodes/003-holiday-2026/public/audio/walk.mp3` and `segments/walk/cues.json`

## Why

The owner asked on 27 November 2026 for "a rough audio cut of the drafts. i dont need
prounciation to be perfect, but a pass at pacing + timing (pauses) would be nice". The owner
will listen to it, without pictures, to judge the script. So this is a pass on **when things
are said and how much quiet is around them**, not on how words are pronounced.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md`: the owner's outline
- `episodes/003-holiday-2026/production/special.md`: what the special is. Larry is off the
  air, slower than on a show night, walking a friend home on a cold night. There is no
  audience.
- your target's `script.js` and `notes.json`. The comment under each `cue` says what the
  picture does and how long the writer wants a moment held.
- `docs/bible/07-voices.md`, "Pace and pauses" and "Reactions and sound effects"
- `packages/show/tools/README.md`: "Writing a segment script" (how `gap`, `wait`, `overlap`,
  `at` and `hold` move the cursor) and "The audience and the band"
- `docs/voice-research.md` if you want it

Do not read `docs/ledger/`, `docs/trials/`, other episodes, `dist/`, any `production/review/`,
or the other targets' scripts and reports. Other sound editors are pacing those alone.

## The task

Render it, read the timeline the renderer prints (every line and sound with its start, end
and length), and make the timing do what the script says it wants. Then render again and
check. Up to three passes.

**What you may change:** the values of `gap`, `wait`, `rate`, `overlap`, `at`, `hold`, `vol`
and `pan` on existing beats, and the script's default `gap`; you may add or remove a `wait`
beat. **What you may not change:** any `text`, `lyrics` or `notes`; the order of beats; which
beats exist (no `say`, `sing`, `music`, `sfx`, `call` or `cue` added or removed); any comment's
meaning. Leave `as` alone unless `docs/voice-research.md` already holds a spelling that works
for a word the timeline's IPA shows plainly mangled; do not run the fitting search.

**What good pacing is here:**

1. **About four minutes.** Aim for 235 to 250 seconds in all. If it is long, shorten silences
   that are doing no job before any that are, and never the quiet after the quotation or
   before the last line. If it is short, give the time to looking: the places where a comment
   says hold, nobody talks, let it run.
2. **A walk, not a monologue.** He is slower tonight. Thoughts come in clusters with air
   between them, the way a person talks while walking. Lines inside a thought sit close;
   between thoughts there is a real pause. Check that the default gap is not making every
   line equally spaced.
3. **The listening device.** The viewer never speaks. Where Larry says a question back, the
   comment before the line says he turns and holds as if the viewer had spoken. That hold is
   the silence in which the question is asked: it must be long enough to be felt as someone
   speaking (about 1.2 to 1.8 seconds, longer for a hard question) and it must be real
   silence in the timeline, with no line or loud sound running through it. The same for a
   place where he asks the viewer something and waits for an answer.
4. **Let the important line land.** After a quotation, after "I don't know", after a thing
   that is seen happening on a word: quiet before the next line. Before the owner's lines at
   the end: room. After the last word: nothing but the room.
5. **Rates.** Keep the rates the writer marked unless one is plainly wrong in the render. A
   quoted line may go a little slower than his own speech. Do not speed anything above 1.0
   to save time.
6. **Sounds under speech.** A sound laid under a line should not start on top of its first
   word or cover a short line; move it with `at` or lower it. No laugh, applause or sting is
   in the script and none is added.
7. **Tricks.** Where the script uses a negative `wait` or a negative `at` to put speech under
   the end of a tune, or to land a cue partway through a sound, check in the timeline that it
   does what the comment says. If it does not, replace it with the plain order and say so.

**Only if your target is the final script (`walk`):** the busker's two sung beats use `al` as
a stand-in voice, and Al speaks at the table soon after. If you can give the busker a voice
of his own without touching the house cast (an invented one-off in the episode's own
`episodes/003-holiday-2026/cast.js`, placed with `npm run voices -- 003-holiday-2026`, and the
two `sing` beats pointed at it), do so, and say exactly what you added. This is the one place
you may create a file besides your report and change a `sing` beat's cast id. If it cannot be
done cleanly, leave `al` and say why.

## The report

`production/fit/pace-<target>.md`, short:

1. The length before and after, in seconds, and words per minute overall.
2. A table of every silence of 0.8 seconds or more in the final render: where (between which
   beat ids), how long, and what it is for.
3. What you changed: beat id, field, old value, new value, why, a line each.
4. What pauses could not fix: anything about pace that needs a writer or a builder.
5. Any trick that did not work and what you put instead.
6. The three words the engine said worst, from the printed IPA, for the record. Nothing more
   on pronunciation.
7. The path of the mp3.

## Always

- You change no words. The constitution is the owner's: never change it.
- You work alone, from this brief and the files it names. When you finish, reply in two or
  three sentences: the final length, the main thing you changed, and anything the owner
  should listen for.
