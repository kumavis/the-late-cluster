# Stage the segment bluesky-account

- **Role:** `builder`
- **Episode:** `episodes/002-2026-w47/`.
- **Write:** `episodes/002-2026-w47/segments/bluesky-account/index.js`, and helpers beside it in
  the same folder. Nothing else: not `looks.js`, `cast.js`, any script, `sources.json`, another
  segment, or anything in `packages/`.
- **Check:** `npm run check -- 002-2026-w47` (the lines about your segment), and your own eyes on
  frames from `npm run shoot -- 002-2026-w47 bluesky-account <t>…`.

## Read

- `packages/show/README.md`: authoring a segment, the camera, captions, chyrons and labels
- `docs/bible/08-direction.md`
- `episodes/002-2026-w47/segments/bluesky-account/script.js`: three lines, about ten seconds. Every
  cue's comment says what the picture is and what is **not** in it. That is your direction. And
  `cues.json`, freshly rendered (9.8 s). Do not re-render.
- `episodes/002-2026-w47/production/owner-notes.md`, its last section, for why this bit exists

Do not read `production/review/`, `docs/ledger/`, `docs/trials/`, or any other episode's folder.

## The task

Write `index.js` against the rendered `cues.json`, starting from the template that is there.

- Larry at the desk, alone, an ordinary host's medium shot with his chyron as in any segment.
- On the word "handle" the handle comes on under his name, large, most of the width of the
  frame, the biggest writing on screen: exactly `@latecluster.simcluster.tv`, whole at once, in
  the studio's plain line colour and not in gold. It stays to the last frame.
- A thin gold underline runs under the handle from the `@` to the `v`, once during "I have read
  it twice." and once more, quicker, in the pause after it, and stops on nothing. On "not" it
  goes out and Larry looks up at the lens.
- What the script says is not in the picture stays out: no post box, cursor, typing or mention
  colour; no profile card, avatar, bio, counts, label or button; no other handle; nothing
  arriving in answer.

Shoot a frame at every cue, on the word "handle", through each run of the underline and at the
end, look at each one, and fix what you see. The handle must be fully legible and clear of the
caption band; captions are on.

## Rules

- The handle is exact, character for character, with nothing before or after it.
- Frames at every cue load with no page errors and no unknown cues.
- The script, the cues and the voice do not change.
- No git write commands, no network, never `.secrets`.

Reply in a short list: what you built, the times of the frames you looked at, and what an
auditor of the frames should look at first.
