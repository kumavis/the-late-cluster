# Pitch

Decide what this week's episode is, before a word of script. A pitch is cheap to fix; a rendered
episode is not.

## Read first

1. `docs/bible/README.md` (the show on one page), then `01-premise.md` (the first rule and the
   interesting test), `03-episode-shape.md` (the weekly running order, defaults and cuts, the BUILT
   counter, **fixed and fresh**), `05-material.md` (reading the digest), `09-real-people.md` (all of it).
2. `04-formats.md` for the shelf, `07-voices.md` "Songs" and "The genre shelf", `lore.md` (the rotation
   log, the episode log, the set state, show and community lore).
3. `docs/bible/10-process.md`, "Stage 2: pitch": the template you fill in.
4. The digest: `digest.md` first, then `digest.json` for anything you will cite. Read the out-of-bounds
   flags, the small-account flags, the candidate threads with their exact text, the Top Chicken
   result (a standing item whenever there is one; bible 04), the recurring guests' posts and any
   reactions to the show.
5. Earlier episodes' `episodes/*/production/plan.json`, for what was done recently.

## Produce

**`episodes/<id>/production/pitch.md`**: the template from bible 10, every `##` heading kept, in that
order. A heading that doesn't apply this week stays, with one line saying why ("No song: nothing this
week would carry one" is a cut, and goes in `cut` too). The first line is exactly
`# Episode NNN pitch: <title>  (week YYYY-Www)`. Every numbered story cites at least one post.
Every guest entry ends with `real-people check: R1–R15 passed` or the notes that qualify it.

**`episodes/<id>/production/plan.json`**: the same plan, machine-readable. A superset of the example
in bible 03, "The mechanism":

```json
{
  "format": "late-cluster-plan/1",
  "id": "<id>",
  "week": "<week>",
  "title": "The episode title",
  "description": "One or two sentences for the archive page and the link card.",
  "question": "The question of the week",
  "segments": [
    { "id": "cold-open", "format": "ask", "seconds": 25, "built": [0, 1], "ask": "at://… (the Ask post)" },
    { "id": "monologue", "format": "monologue", "seconds": 60, "built": [1, 2], "topChicken": "hit" },
    { "id": "thread", "format": "thread", "seconds": 60, "built": [2, 3], "thread": { "root": "at://…", "posts": ["at://…", "at://…"] } },
    { "id": "song", "format": "song", "genre": "sea shanty", "theme": "…", "seconds": 60, "built": [3, 5] },
    { "id": "goodnight", "format": "goodnight", "seconds": 40, "built": [5, 6] }
  ],
  "guests": [{ "cast": "norvid", "handle": "norvid-studies.bsky.social", "source": "thread", "segment": "thread", "repeatReason": null }],
  "runner": "…",
  "builtShapes": ["plain", "interrupting", "physical"],
  "descriptor": "Sibyl's descriptor this week",
  "ask": "at://… (the cold open's Ask post)",
  "sincere": { "kind": "admiration", "source": "at://…" },
  "callbacks": ["SL-10"],
  "cut": [{ "what": "Changelog", "why": "only two of the five items had a turn" }],
  "overrides": { "middle-format": "reason a freshness warning does not apply this week" }
}
```

- `segments` is the rundown in order; their ids become the segment folders. Lower case, digits and
  dashes. `seconds` is the planned length; `built` is the BUILT counter `[from, to]` and the chain must
  join up from 0. A song has `genre` and `theme`. A verbatim thread (format 9) has `thread.posts`: the
  URIs performed, in thread order (cuts are whole posts).
- `guests[].cast` is the cast id the guest is played as (`packages/show/src/cast.js`, or a new id the
  write stage adds in the episode's `cast.js`). `handle` without `@`. `source` is how they appear
  (thread, panel, interview, presenter, cameo, remote).
- `title` and `description` are copied into `episode.json` when the pitch passes.
- Keep `plan.json` and `pitch.md` saying the same thing.

## Freshness

The gate checks `plan.json` against earlier episodes (their `plan.json`, or the rotation log in the
lore file). **One check fails the pitch: the song's genre must differ from the previous episode's.**
Every other check in bible 03's list is a warning: genre within eight episodes, the middle format
from last week, a guest two weeks running, a reused runner, descriptor, Ask post or thread, a repeated
"Built it." shape, the same sincere kind as last week, more than two callbacks. Answer each warning:
change the plan, or give the reason in `overrides` under the code the warning names (a guest's reason
goes in its `repeatReason`). The reviewer sees every warning with your answer.

## Check and finish

`npm run produce -- --week <week> --check pitch` checks: the template's sections and heading; every
cited post is in the digest; `plan.json` is well formed, under the runtime ceiling, with no
out-of-bounds or opted-out material and guests from this week's digest; a verbatim thread is in
thread order; freshness; no opted-out account anywhere. It cannot check that anything is interesting,
fair or funny. That is your job and then the reviewer's.

You are finished when the check prints no FAIL and every freshness warning is answered.

## Never

- Pitch a story the digest marks out of bounds, or an R10 topic it missed. Leave it out; it may go in
  the "unused but considered" list with the reason "unsafe".
- Book a guest whose material this week would be mostly pastiche (R3): use a thread, or skip them.
- Name a Top Chicken loser or runner-up (bible 09, scorecard A10).
- Keep a segment because the slot exists.
