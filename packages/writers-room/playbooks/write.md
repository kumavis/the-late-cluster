# Write

Turn the pitch into one `script.js` per segment: the dialogue, songs, sound effects and the named
cues the director will hang pictures on. Build it fresh. The renderer is your validator and Whisper
your listener.

## Read first

1. `docs/bible/09-real-people.md` R3 to R9, again.
2. `episodes/<id>/production/pitch.md` and `plan.json`: the plan you are writing, including its
   experiment. Change them only to record a cut or a fix the scripts forced, and keep them in step.
3. `packages/show/tools/README.md`, "Writing a segment script" and "Voice design" (the script format,
   beat kinds, validation, `as` respellings, what the engine says badly, singing, music tracks).
4. `docs/bible/06-jokes.md`, `07-voices.md` (writing for the synth, `as`, pace, laughs, **Songs** and
   **the genre shelf**), `02-cast.md` (who says what), and the formats your plan uses in `04-formats.md`
   (format 9, The Thread, if the plan has one).
5. A working example: the studio's reference segment `packages/show/reference/segments/demo/script.js`
   and the template `packages/show/templates/segment/script.js`. If the pitch inherited a script, it is
   in `production/inherited/`: adapt what it shows, don't copy it.

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
  "accounts": [{ "handle": "norvid-studies.bsky.social", "role": "guest", "cast": "norvid", "catchphrases": [{ "phrase": "claim.", "posts": ["at://…"] }] }],
  "posts": [{ "uri": "at://…", "author": "norvid-studies.bsky.social", "use": "line", "segment": "panel", "text": "the exact text", "occasion": { "replyTo": "at://…", "text": "the exact text of the post it replied to" } }],
  "links": [{ "url": "https://…", "use": "credit", "segment": "monologue" }],
  "numbers": [{ "statement": "39% of …", "computed": "389 of 995 own posts, Aug 18 – Nov 12, 2026" }]
}
```

  `role` is guest, quoted, credited or mentioned. Every post's `author` is in `accounts`. `use` is
  `card` (on screen as a post card), `quote` (its text on screen), `line` (spoken by its author's
  puppet), `thread` (performed in a verbatim thread) or `reference`. A spoken post records its
  `occasion` (below). A catchphrase a guest says must be in that account's `catchphrases`, with the
  posts that show its use. Numbers about people follow R12.
- `episodes/<id>/production/intelligibility.json`, only if a line is weak in Whisper because it is a
  name Whisper cannot know: `{ "<seg>": { "<line id>": "why, with the IPA" } }`.

## Real accounts say only what they published, the way they said it

A puppet that stands for a real account says **only what that account published**, and the show
stays faithful to **how they said it**. **The show's own characters do the joking around real
posts**: Larry's setup, Sibyl's ruling, the bot's build, the staging. The guest's puppet says the post.

A real line may be performed in an exchange the show stages, as long as that exchange recreates the
occasion it was actually said on: the same kind of prompt, the same meaning. If it was a reply,
read what it replied to, and give the setup line the same job. Never use it to answer a question it
wasn't answering (bible 09, R3 and R4).

Every line a guest speaks or sings carries its source, on the line (a trailing comment) or in the
comment lines directly above it, with its context:

```js
{ say: 'larry', text: 'Ah, look at that skyline. My beautiful city.' },
{ say: 'norvid', id: 'buddy', text: 'buddy that\'s my freaking simcluster', as: 'buddy that\'s my freaking sim-cluster' }, // verbatim: at://did:plc:…/app.bsky.feed.post/… · context: at://<the post it replied to>
{ say: 'norvid', text: 'claim.' }, // catchphrase: "claim." · context: at://<a post where norvid uses it this way>
```

- `// verbatim: at://…`: the guest's own post. `text` (the caption) is the post's text character for
  character; runs of whitespace and line breaks may become single spaces, nothing else changes: not
  case, not punctuation, not quotes, not emoji. A cut inside a post is marked with the ellipsis
  character `…` (not three dots) and must not change the meaning. Pronunciation goes in `as`, word for
  word, same order; `as` may leave out emoji and links, never add, drop or swap words.
- **The original occasion is recorded.** Outside a verbatim thread, when the post was a reply, name
  what it replied to: `· context: at://<that post>` on the tag, or in its `sources.json` entry
  `"occasion": { "replyTo": "at://…", "text": "<its exact text>" }`. For a top-level post, write
  `"occasion": "top-level"`. The pull request shows the reviewer your setup line, the guest's line and
  the original side by side.
- `// catchphrase`: one of the account's own recurring phrases, used the way they use it (same
  function, same kind of occasion). List it in `sources.json` under the account's `catchphrases` as
  `{ "phrase": "claim.", "posts": ["at://…"] }`, citing at least one of their own posts that uses it.
- `// interview: at://…` is accepted for answers to the show's account, with the question as its
  context, but nothing produces those yet.
- No pastiche: inventing words in a real person's format is putting words in their mouth. Only an
  invented `.example` guest may say invented words (tag them `// invented`).

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
and nothing out of bounds; every guest line's source (R3): for a real account only verbatim, interview
or catchphrase; verbatim lines exact, `as` only respelling, a thread in order, a reply spoken outside
its thread with its original occasion recorded, catchphrases backed by `sources.json` with posts that
show their use; real-account puppets have `guest: true`
(R9); every handle, domain and URL is in `sources.json` or on `.example`, and every at:// is in
`sources.json` (R8, R4); no opted-out account (R11); spoken words and runtime under the ceiling; every
script renders; `production/inherited/` is what the plan named; episode code imports only the studio
and its own covered files; the constitution untouched. After this stage the render stage runs `check`
and Whisper, and its failures come back to you.

You are finished when the check prints no FAIL.

## Never

- Put a word in a real person's mouth that isn't theirs (R3), or a fact, opinion or reaction.
- "Fix" a real post's wording, even a typo; cut with `…` or show it on a card instead.
- Write a line to hit a length. Short is fine.
- Edit `cues.json` by hand, or any file outside `episodes/<id>/`.
