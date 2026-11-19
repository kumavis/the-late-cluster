# 10. Process and review

The weekly pipeline's stages are defined in `docs/ARCHITECTURE.md`. Each stage reads the previous
stage's files and writes its own. This file says what good looks like at each, and ends with the
scorecard used to approve an episode.

| stage | made by | output |
|---|---|---|
| 0. ask *(proposed)* | bot + the reviewer | interview questions posted mid-week to people who opted in to being asked; never blocks later stages; not built |
| 1. scrape | scraper | `data/weeks/<week>/digest.{json,md}` |
| 2. pitch | writer (model) | `episodes/<id>/production/pitch.md` and `plan.json` |
| 3. write | writer (model) | `segments/*/script.js` |
| 4. render | tools | audio, telemetry, `cues.json`; `check`; the Whisper pass |
| 5. direct | director (model) | `segments/*/index.js`, reviewed against shot frames |
| 6. build | tools + writer | `thumbnail.jpg`, `dist/episodes/<id>/`, `verify`; `production/scorecard.md`, `dna-amendments.md`; the lore entries and any DNA edits |
| 7. review | **a person** | a pull request: merge or send back |
| 8. publish | deploy + bot | Pages deploy on merge, then the announcement |

## Stage 0: ask (proposed, not built)

If the show's account gains interviews ([real people](09-real-people.md#interviews-by-the-shows-account-proposal)),
a stage runs early in the week, before the scrape: the writer drafts one or two questions from the
week so far, the show's reviewer approves them, the bot posts them to people who opted in to being
asked, and the scrape collects whatever public replies exist by then. Nothing waits for a reply: an
unanswered question is simply not used. Nothing here exists yet; it needs bot work.

## Stage 1: scrape

**Good:** the digest covers the cluster's week, not the platform's; ranks stories by more than
likes; carries verbatim text, URIs, authors and numbers; applies the opt-out list before anything
else. See "What the bible assumes the digest provides" in the [README](README.md).

**Watch for:** stories dominated by outside news; one viral post swamping the week; missing thread
context for posts the episode might quote.

## Stage 2: pitch

Write `production/pitch.md` and `production/plan.json` before any script. A pitch is cheap to fix;
a rendered episode is not. The pitch opens with the retro and the DNA notes (keep, change, one
experiment), then the inheritance list, before any story; see
[evolving the show](03-episode-shape.md#evolving-the-show). Resolve or answer every freshness warning
([fixed and fresh](03-episode-shape.md#fixed-and-fresh)) in the pitch.

```markdown
# Episode NNN pitch: <title>  (week YYYY-Www)

## Retro
Previous episode: <id> (or "none")
Worked: <...>   Didn't: <...>
Reactions: <at:// URIs from the digest's "About the show", one line each on what they said>
Last experiment's verdict: <worked / didn't / can't tell, and why> (also written to lore's experiment log)
One-page check: <does the README's "show on one page" still describe the last episode? if not, which is wrong>

## Keep
<what this episode keeps from the previous one, briefly>

## Change
<at most two changes, each: what, and why (from the retro or the week)>

## Experiment
What: <one variable>   Why: <...>
Success: <how we will know, checkable by someone other than the writer>
Register: <the pilot-only rule it challenges, if any>

## Inherit
<usually "none". Otherwise: from <episode id>, path <segments/<seg>/index.js>, why>

## The episode in one sentence
"The one where ..." (if this doesn't make a cluster member want to watch, re-pitch)

## The week in one sentence
This week the cluster ...

## The question
<the question the episode asks in jokes, and where it is asked>
Answer at goodnight: <post URI(s), verbatim text, why it answers>

## Stories (ranked)
1. <story> — sources: <URIs> — angle: <the turn in five words> — so what: funny because ..., matters because ... — segment: <slot>
2. ...
(unused but considered, with the reason: unsafe / no turn / unclear / merely popular)

## Rundown
| slot | format | length | story | BUILT from → to | runner beat | why it's interesting (turn or feeling, five words) |

## The song
Genre: <from the shelf; not in the last eight episodes>
Theme: This song is about ___, and it feels ___.
Structural joke: <...>  Swap test: <why another week's stories wouldn't fit>

## Top Chicken
<the week's result(s) from @topchicken.bsky.social: winner, post URI, likes, record, window stats; hit or full desk; R10/R11 check on the winner and post — or "no result">

## Threads
<URIs in order, every participant's checks, cuts, what is staged>

## Cut, and why
<every default or idea left out because it wasn't interesting this week>

## Guests
<name, handle> — why this week — how they appear (thread / interview / panel) — words by source type (verbatim, interview, catchphrase: count each), and for each line the original prompt and the show's setup — habit (number + range) — object — function — real-people check: R1–R15 passed / notes

## Runners and callbacks
Episode runner: <plant / escalate / pay off>
Callbacks to show lore: <lore ids>
New lore this episode will create: <...>

## Sincere beat
<what, sourced from where, how long, what laugh follows>

## Risks and open questions
<anything the reviewer should look at first; references marked unclear>
```

**Good:** everything in the rundown passes the interesting test, and the cuts are recorded; a
question that the stories genuinely circle; every story with a turn and a source; a rundown of about
five minutes or less; real people mostly in their own words; a song genre and a theme that pass the
swap test; the BUILT chain agreed; risks named honestly; an experiment with one variable and a
measure; an inheritance list that is empty or justified file by file.

`plan.json` is machine-readable and owned by the pipeline (`packages/writers-room`). The bible relies
on at least these fields:

```json
{
  "id": "002-example",
  "week": "2026-W47",
  "retro": { "episode": "001-pilot", "worked": ["…"], "didnt": ["…"], "reactions": ["at://…"] },
  "dna": {
    "keep": ["…"],
    "change": [{ "what": "…", "why": "…" }],
    "experiment": { "what": "…", "why": "…", "success": "how we will know" }
  },
  "inherit": [],
  "question": "…",
  "segments": [
    { "id": "cold-open", "format": "ask", "seconds": 25, "built": [0, 1] },
    { "id": "monologue", "format": "monologue", "seconds": 60, "built": [1, 2], "topChicken": "hit" },
    { "id": "middle", "format": "thread", "seconds": 65, "built": [2, 3] },
    { "id": "song", "format": "song", "genre": "sea shanty", "theme": "…", "seconds": 60, "built": [3, 5] },
    { "id": "goodnight", "format": "goodnight", "seconds": 40, "built": [5, 6] }
  ],
  "guests": [{ "handle": "…", "source": "thread", "segment": "middle", "repeatReason": null }],
  "runner": "…",
  "builtShapes": ["plain", "interrupting", "physical"],
  "descriptor": "…",
  "sincere": { "kind": "admiration", "source": "at://…" },
  "callbacks": ["SL-10"],
  "cut": [{ "what": "Changelog", "why": "only two of the five items had a turn" }]
}
```

`retro` is `null` when there is no previous episode. An `inherit` entry is
`{ "from": "<episode id>", "path": "segments/<seg>/index.js", "why": "…" }`; the pipeline copies each
to `production/inherited/<from>/<path>`, read-only. Nothing else from earlier episodes is available.

**Send back if:** no retro, or no experiment with a success measure; anything is in because the slot exists; no question or spine; a story without a source URI; a guest without a real-people
check; anything out of bounds; more than one in three jokes that need the week to understand.

## Stage 3: write

- One `script.js` per segment, in the format in `packages/show/tools/README.md`.
- Every guest line has a source comment (R3). Every real post quoted on screen is named in a comment
  with its URI. A performed thread follows the rules of format 9: words exact, order kept, cuts
  marked, `as` for respelling only.
- Use `cue`s for every moment the director will need: each punch picture, each card, each build.
- Run the renderer's validation as you go; read the IPA it prints for every name.

**Good:** setups of two lines or fewer; punches on sayable words; one reaction sound per joke; the
`from` values of the BUILT chain match the pitch; total spoken words about 420 to 520, or fewer.

## Stage 4: render

`npm run render`, then `npm run check`, then the Whisper pass. Compare lines, not percentages: the
score moves a few percent run to run on its own.

**Good:** every punchline line scores ✓; no line below ~ (60%) unless it is a name the transcriber
can't know (judge those by the IPA); "Built it." heard as "built it" or "build it" every time;
segment lengths within ten percent of the pitch.

**Fix by:** respelling, rephrasing, more `gap` from a loud sound, lower sfx `vol`. Not by slowing
below rate 0.8.

## Stage 5: direct

Write `index.js` against the rendered `cues.json`, then shoot frames at every punch word, cue, shot
change and overlap, and look at them.

**Good:** every punch has a picture that lands on its word; every graphic carries a tag the voice
doesn't say; no text under the captions; cards held long enough to read; set state assigned every
frame; real cards verbatim; fictional handles on `.example`; no console warnings for unknown cues.

## Stage 6: build

`npm run thumbnail -- <id> <seg> <t>` for a `thumbnail.jpg` that shows a puppet and the episode's
best picture (not a real person's post card). Then set the episode to `published`, run
`npm run build -- <id>` and `npm run verify`.

### The self-check

Fill in the scorecard below as `production/scorecard.md`, and append to [lore](lore.md): the
episode log entry, the rotation log row and the experiment log row (from `plan.json`), new running
gags, new established facts, the set's end state, and any community lore the episode explained.

Then write `production/dna-amendments.md`:

```markdown
# DNA amendments: episode NNN

## Experiment
<what it was; the success measure; the writer's judgement before air: worked / didn't / can't tell yet, and why>

## Edits to the DNA in this pull request
- <file and section>: <the change, one line> — because <evidence>
(or "none", with the reason: e.g. "the experiment is judged after air", "a one-off: it depended on this week's story")
```

Lore, DNA edits and this file go in the same pull request as the episode, so the reviewer approves
the change to the show with the episode. Never edit `00-constitution.md` or `09-real-people.md`.

## Stage 7: review

The owner, or a reviewer the owner names, reads every script, watches the whole preview with sound,
and fills in the scorecard below (constitution, Article 5).
The pull request description should contain the pitch's "Risks" section and the scorecard. The
reviewer may send back with notes; the writer revises from stage 2 or 3.

## Stage 8: publish, and after

Merge deploys. The bot announces (dry run first). If anyone responds asking to be left out, see
R11.

---

## The scorecard

Use it for review, and as the writer's self-check before opening the pull request. Step 0 comes
first. Part A is pass/fail and any fail blocks the episode. Part B is scored 0, 1 or 2.

### Step 0: is everything in it interesting?

Before anything else, list every segment, standing item and runner in the episode. Beside each,
write its one-sentence retell and the turn or feeling in five words
([the interesting test](00-constitution.md#the-interesting-test)). Anything without both is cut, or the
episode goes back, before the rest of the scorecard is filled in. A short episode is not a fault.
This step only removes things; it never overrides Part A.

### Part A: gates (all must pass)

| # | gate | pass | fail |
|---|---|---|---|
| A1 | Opt-out | No account on the opt-out list, or that has opted out in a post or bio, appears in any form | Any appearance, including a chart or a map label |
| A2 | Verbatim | Every real post card matches its URI word for word, with correct handle, date and likes | Any wording change beyond a meaning-preserving ellipsis |
| A3 | Context | Every performed line passes the occasion test (R4): the show's setup line, compared with the original prompt in `sources.json`, is the same kind of prompt with the same function and meaning; house characters never paraphrase a real person's view | A line made to answer what it wasn't answering, an exchange stitched from unrelated conversations, or staging that changes the meaning |
| A4 | Guest lines | Every line spoken by a puppet of a real account is their verbatim post, an interview answer with its question, or a catchphrase used the way they use it (listed in `sources.json`), tagged with its source and occasion; a performed thread matches its posts word for word and in order, cuts marked | Any pastiche; any opinion, fact, reaction or confession they didn't publish; a catchphrase used unlike its author's use; any altered or reordered thread line |
| A5 | No fabrication | No invented event, number or quote is attributed to a real person | Any |
| A6 | Out of bounds | None of the R10 topics, anywhere on screen or in audio | Any |
| A7 | Repost test | Every real person in a joke would plausibly repost it; small accounts only as heroes | Anyone as the butt; a small account laughed at |
| A8 | Labels | PUPPET · PARODY on every guest chyron; disclaimer at the first guest; personas in the credits; tributes credited | Any missing |
| A9 | Fictional names | Every invented handle and URL is on `.example` (or display-name only) and fails to resolve | A real TLD or a handle that resolves |
| A10 | Rankings | Only winners are named; Top Chicken winner and post pass R10 and R11 | Anyone named or shown as a loser or runner-up |
| A11 | Builds | `npm run check` and `npm run verify` pass; no unknown-cue warnings | Any failure |
| A12 | Constitution | The pull request leaves `00-constitution.md` and `09-real-people.md` untouched | Any change to either |

### Part B: quality (0, 1 or 2 each; 24 possible)

| # | criterion | 2 | 1 | 0 |
|---|---|---|---|---|
| B1 | **Point** | A clear question asked in at least two segments and answered at goodnight in the community's words | A spine story but no real question, or an answer in the show's own words | Unrelated bits; generic goodnight |
| B2 | **Funny** | Every segment has at least two jokes that land on a cold watch; the biggest laugh is in the back half (middle segment or song) | Most segments land; one is flat | Two or more segments without a laugh |
| B3 | **Specific** | Every joke rests on a real artefact or number from the week | A few generic jokes | Mostly generic or invented |
| B4 | **Built on screen** | Every punch has a picture on its word; graphics carry tags | Some punches unstaged or late | Talking heads with decoration |
| B5 | **Newcomer test** | Two-thirds or more of jokes work for someone who missed the week | About half | Mostly in-jokes |
| B6 | **Sincerity** | One short, sourced, quiet beat, followed by a gentle laugh | Present but long, or not sourced | Missing, or a speech, or followed by a cheap joke |
| B7 | **Runner** | Every "Built it." earns its place, no shape repeated, one segment rests; an episode runner, if any, planted and paid off | Repetitive shapes, or a runner unpaid | "Built it." as a tic, kept to move the count |
| B8 | **Intelligibility** | Every punchline line ✓ in the Whisper pass; names correct in IPA | One or two weak punchlines | A punchline nobody can hear |
| B9 | **Sound** | One reaction per joke, sized to it; some dry lines; nothing under "Built it." | Over-sweetened in places | Laugh after every line, or biglaughs on mild jokes |
| B10 | **Shape** | No filler; adjacent segments differ in texture; every segment ends on a button; about five minutes or less | A slack stretch, or two similar segments adjacent | Padded to reach a length, over 6:30, or segments end without buttons |
| B11 | **Fresh** | Song in a new genre carrying the week's theme (passes the swap test); middle format, guests, runner, descriptor and sincere kind new against the rotation log, or overridden with a good reason | One freshness warning unanswered, or a song theme that would fit any week | Repeats the previous episode's shape; a reused genre, runner or reveal |
| B12 | **Experiment** | One experiment, stated in `plan.json` with a measure before writing, actually run on screen, result recorded in `dna-amendments.md` | Stated and run, but no measure or no recorded result | No experiment, or one that changes nothing, or changed after the fact |

**Approve** when Step 0 is clean, every gate passes, and Part B totals **16 or more**, with no 0 in
B1, B2, B8, B11 or B12.
**Send back** otherwise, with the lowest-scoring criteria named and one concrete suggestion each.

A model doing a self-check should fill in the table with one sentence of evidence per row (a line
quoted, a timestamp, a URI), not just a score.
