# Pitch

Decide what this week's episode is, and what it changes about the show, before a word of script. A
pitch is cheap to fix; a rendered episode is not.

## Read first

1. `docs/bible/00-constitution.md` and `docs/bible/09-real-people.md`, in full.
2. `docs/bible/README.md` (the show on one page), `03-episode-shape.md` (the running order as it
   stands, defaults and cuts, the BUILT counter, **fixed and fresh**, **evolving the show**),
   `05-material.md` (reading the digest), `10-process.md` "Stage 2: pitch" (the template you fill in).
3. `04-formats.md` for the shelf, `07-voices.md` "Songs" and "The genre shelf", `lore.md` (the
   experiment log, the rotation log, the episode log, the set state, show and community lore).
4. The digest: `digest.md` first, then `digest.json` for anything you will cite. Read its "About the
   show" section (reactions to the last episode), the out-of-bounds and small-account flags, the
   candidate threads with their exact text, the Top Chicken result (a standing item whenever there is
   one; bible 04), and the recurring guests' posts.

You cannot read earlier episodes. What you know about them comes from the lore file, the rotation
and experiment logs, and the digest's reactions. The check command reports how your plan compares
with earlier plans (freshness, experiments).

## Order of work

1. **Retro.** Look back at the previous published episode: what worked, what didn't, what the
   community said about it (cite those posts from "About the show"; if there are none, say so and
   why), and the after-air verdict on its experiment. Check the one-page version in the bible's README
   against it.
2. **Keep, change, experiment.** What this episode keeps; what it changes and why (at most two, each
   motivated by the retro or the week); and **one** experiment: one variable, sized to one episode,
   stated before writing, with a success measure someone other than you could check. It must be new:
   not a restatement of an earlier episode's experiment. Bible 03, "Evolving the show", says what a
   good experiment is and how the show drifts or ossifies; aim against ossifying.
3. **Inheritance.** Decide whether anything from an earlier episode is worth carrying forward as
   reference. **Carrying nothing forward is the default, and a good one.** If you do inherit a file,
   name it with its reason; the pipeline copies exactly that file to `production/inherited/`. A file
   inherited two weeks running probably belongs in the studio: say so in the risks instead.
4. Then the stories, the rundown, the song, the guests, and the rest of the template.

## Produce

**`episodes/<id>/production/pitch.md`**: the template from bible 10, every `##` heading kept, in that
order (Retro, Keep, Change, Experiment, Inherit first). A heading that doesn't apply this week stays,
with one line saying why. The first line is exactly `# Episode NNN pitch: <title>  (week YYYY-Www)`.
Every numbered story cites at least one post. Every guest entry ends with
`real-people check: R1–R15 passed` or the notes that qualify it; that check is yours, made from public
posts, the bio and the opt-out list, never a question put to the person.

**`episodes/<id>/production/plan.json`**: the same plan, machine-readable. A superset of the fields
bible 10 relies on:

```json
{
  "format": "late-cluster-plan/1",
  "id": "<id>",
  "week": "<week>",
  "title": "The episode title",
  "description": "One or two sentences for the archive page and the link card.",
  "retro": { "episode": "<previous id>", "worked": ["…"], "didnt": ["…"], "reactions": ["at://…"], "reactionsNote": "only when reactions is empty: why" },
  "dna": {
    "keep": ["…"],
    "change": [{ "what": "…", "why": "…" }],
    "experiment": { "what": "one variable", "why": "…", "success": "how someone else will know" }
  },
  "inherit": [],
  "question": "The question of the week",
  "segments": [
    { "id": "cold-open", "format": "ask", "seconds": 25, "built": [0, 1], "ask": "at://…" },
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

- `retro` is `null` only when there is no earlier published episode.
- An `inherit` entry is `{ "from": "<episode id>", "path": "segments/<seg>/index.js", "why": "…" }`: a
  source file of an earlier episode (not `public/` or `production/`).
- `segments` is the rundown in order; their ids become the segment folders. `seconds` is the planned
  length; `built` is the BUILT counter `[from, to]` and the chain must join up from 0. A song has
  `genre` and `theme`. A verbatim thread (format 9) has `thread.posts`: the URIs performed, in thread
  order (cuts are whole posts).
- `guests[].cast` is the cast id the guest is played as (`packages/show/src/cast.js`, or a new id the
  write stage adds in the episode's `cast.js`). `handle` without `@`.
- `title` and `description` are copied into `episode.json` when the pitch passes.

## Freshness

The gate compares `plan.json` with earlier episodes (their plans, or the rotation log). **One check
fails the pitch: the song's genre must differ from the previous episode's.** The rest of bible 03's
list are warnings: genre within eight episodes, the middle format from last week, a guest two weeks
running, a reused runner, descriptor, Ask post or thread, a repeated "Built it." shape, the same
sincere kind as last week, more than two callbacks, an experiment close to an earlier one. Answer each:
change the plan, or give the reason in `overrides` under the code the warning names (a guest's reason
goes in its `repeatReason`). The reviewer sees every warning with your answer.

## Check and finish

`npm run produce -- --week <week> --check pitch` checks: the template's sections and heading; every
cited post is in the digest; `plan.json` is well formed and under the runtime ceiling, with no
out-of-bounds or opted-out material and guests from this week's digest; a thread is in thread order;
the retro (when one is due), the DNA notes, a new experiment with a success measure, and every
inherited file exists in an earlier episode with a reason; freshness; no opted-out account anywhere;
the constitution untouched. It cannot check that anything is interesting, fair or funny.

You are finished when the check prints no FAIL and every freshness warning is answered. When the
pitch passes, the pipeline copies the inherited files.

## Never

- Pitch a story the digest marks out of bounds, or an R10 topic it missed.
- Book a real guest whose material this week isn't their own words: perform a thread or a post shown
  as itself, or skip them.
- Name a Top Chicken loser or runner-up.
- Keep a segment because the slot exists, or inherit a file because it is there.
- Plan an experiment that relaxes the constitution or chapter 9, including the show's own review.
