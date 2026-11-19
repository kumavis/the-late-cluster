# Write

Turn the pitch into one `script.js` per segment: the dialogue, songs, sound effects and the named
cues the director will hang pictures on. The renderer is your validator and Whisper your listener.

## Read first

1. `episodes/<id>/production/pitch.md` and `plan.json`: the plan you are writing. Change them only to
   record a cut or a fix the scripts forced, and keep them in step.
2. `packages/show/tools/README.md`, "Writing a segment script" and "Voice design" (the script format,
   beat kinds, validation, `as` respellings, what the engine says badly, singing, music tracks).
3. `docs/bible/06-jokes.md`, `07-voices.md` (all of it: writing for the synth, `as`, pace, laughs,
   **Songs** and **the genre shelf**), `02-cast.md` (who says what), `09-real-people.md` R3 to R9.
4. `docs/bible/04-formats.md` for the formats in your plan, including format 9 (The Thread) if the
   plan has one.
5. One pilot segment of a similar kind in `episodes/001-pilot/segments/` (read only).

## Produce

- `episodes/<id>/segments/<seg>/script.js` for every segment in `plan.json`, in plan order. Make each
  with `npm run segment:new -- <id> <seg>`: it creates the folder from the template and appends the
  segment to the `rundown` in `episode.json`, which must end up equal to the plan's segment ids.
- `episodes/<id>/cast.js` and `looks.js` only for a guest the studio roster lacks. A puppet for a real
  account has its real `handle` and `guest: true`; an invented one has a `.example` handle.
- `episodes/<id>/production/sources.json`: every real account, post and link the episode uses.

```json
{
  "format": "late-cluster-sources/1",
  "week": "<week>",
  "accounts": [{ "handle": "norvid-studies.bsky.social", "role": "guest", "cast": "norvid", "catchphrases": ["claim."] }],
  "posts": [{ "uri": "at://…", "author": "norvid-studies.bsky.social", "use": "thread", "segment": "thread", "text": "the exact text, if shown or spoken" }],
  "links": [{ "url": "https://…", "use": "credit", "segment": "monologue" }],
  "numbers": [{ "statement": "39% of …", "computed": "389 of 995 own posts, Aug 18 – Nov 12, 2026" }]
}
```

  `role` is guest, quoted, credited or mentioned. Every post's `author` is in `accounts`. `use` is card,
  thread, line, answer or reference. A catchphrase a guest says must be in that account's
  `catchphrases`. Numbers about people follow R12.
- `episodes/<id>/production/intelligibility.json`, only if a line is weak in Whisper because it is a
  name Whisper cannot know: `{ "<seg>": { "<line id>": "why, with the IPA" } }`.

## Every guest line carries its source

On the line itself (a trailing comment) or the comment lines directly above it, one of rule R3's
kinds, in its order of preference:

```js
{ say: 'norvid', id: 'p3', text: 'buddy that\'s my freaking simcluster', as: 'buddy that\'s my freaking sim-cluster' }, // verbatim: at://did:plc:…/app.bsky.feed.post/…
{ say: 'norvid', text: 'claim.' }, // catchphrase
{ say: 'norvid', text: 'concept: talk show, but a giant crow hunts the host,' }, // pastiche of "concept:"
```

`// interview: at://…` is accepted for answers to the show's account, but nothing produces those yet.
An invented `.example` guest's lines are tagged `// invented`. Write guest lines as plain string
literals.

**Verbatim means exact.** `text` (the caption) is the post's text character for character; runs of
whitespace and line breaks may become single spaces, nothing else changes: not case, not
punctuation, not quotes, not emoji. A cut inside a post is marked with the ellipsis character `…`
(not three dots) and must not change the meaning. Pronunciation goes in `as`, word for word, same
order; `as` may leave out emoji and links, never add, drop or swap words. The post must be the
speaking guest's own.

**A verbatim thread** (format 9) is performed in the order of `plan.json` `thread.posts`, each post by
its author's puppet. House characters frame and react between posts in lines that are clearly theirs
and never speak a participant's post.

## Songs

The song's genre and theme are in the plan. Write it to the genre's recipe in bible 07 "The genre
shelf", under the renderer's constraints (tools/README.md, `sing` and `music`): one syllable per
sounding note (the renderer prints how it split the lyrics when they don't match), MIDI in the tested
ranges, one tempo per `music` block, a new block for every stop or tempo change, spoken lines in the
stops. Put the jokes in the stops and on screen; caption the lead. Sung words are the least
intelligible: keep the lyric that carries the joke short and on long notes, and check it in Whisper.

## The loop

1. Write a segment. Put a `{ cue: '…' }` at every moment the director will need: each punch picture,
   each card, each build.
2. `npm run render -- <id> <seg>`. Fix every validation error it prints. Read the timeline: every
   line's timing and the IPA actually pronounced. Respell mangled names with `as`.
3. `bun packages/show/tools/analyze.ts whisper <id> <seg>`. Fix lines marked ✗ (respell, rephrase, add
   `gap` from a loud sound, lower the sound's `vol`; never slow below rate 0.8). "Built it." must be
   heard every time. Compare lines, not percentages: the score moves a few percent on its own.
4. `npm run check -- <id> <seg>`, then the next segment.
5. When all are written: `npm run produce -- --week <week> --check write`.

## Gates

`--check write` checks: the rundown equals the plan; `episode.json` has a title and description and
is still a draft; `sources.json` lists only accounts, posts and links in the digest, with exact text
and nothing out of bounds; every guest line's source (R3), verbatim lines exact, `as` only respelling,
a thread in order, catchphrases backed by `sources.json`, pastiche of a format the guest really uses
this week (more than two pastiche lines is a warning); real-account puppets have `guest: true` (R9);
every handle, domain and URL in the episode is in `sources.json` or on `.example`, and every at:// in
it is in `sources.json` (R8, R4); no opted-out account (R11); spoken words and runtime under the
ceiling; every script renders. After this stage the render stage runs `check` and Whisper, and its
failures come back to you.

You are finished when the check prints no FAIL.

## Never

- Put a word in a real person's mouth that isn't theirs (R3), or a fact, opinion or reaction.
- "Fix" a real post's wording, even a typo; cut with `…` or show it on a card instead.
- Write a line to hit a length. Short is fine.
- Edit `cues.json` by hand, or any file outside `episodes/<id>/`.
