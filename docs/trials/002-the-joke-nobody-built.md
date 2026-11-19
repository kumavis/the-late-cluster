# Trial 002: The Joke Nobody Built

The first episode produced through the pipeline, run on 19 November 2026 as a trial of the
protocol. It covered 13 to 19 November, ran four minutes twenty-two, and was never published.
The owner watched a video render and chose to revise the protocol instead of editing the
episode.

- The draft is on the branch `draft/002-the-joke-nobody-built`: pitch, plan, sources,
  scorecard, DNA notes, the five segments, and the lore entries its self-check wrote.
- The creative stages were done by subagents working from the pipeline's printed prompts (the
  manual writer). The headless writer has still never run.
- The self-check sent the episode back. Its most serious finding is note 51 below.

## The owner's notes on the episode

Verbatim:

> * pen plotter / game demo / cat and seal voice was an example of good content
> * the built-it joke was done to death in the last episode. generally we need to NOT do jokes we just did in the previous episode. you could maybe sneak in one but in a way that doesn't
> * similarly, the featured guests were primarily from the last episode
> * top chicken needed a bit more content or speculation.
> * in the closer it showed two posts that were a lot of text that wasnt read. doesnt make for good tv
> * i think we can aim for 8 mins. i think the interview with a real community member (for now just constructed from someones posts) should be a weekly stable.
>
> rather than edit this episode, i want to edit the protocol and workflow for creating episodes.

Each of these traces to something the protocol told the writer to do:

- **"Built it" again.** The bible lists the cold open's "Ask, then Built it." and the BUILT
  counter as part of the frame that stays every week, and budgets the runner per minute. The
  writer did what the frame said.
- **Last week's guests again.** The scraper's cluster is seeded with the pilot's four guests
  and its digest has a "Recurring guests" section that promotes them. A guest repeating two
  weeks running was only a warning, answered with a reason. Cards are not counted as
  featuring someone at all.
- **Thin Top Chicken.** The digest had six daily results; the pitch used one, as a "hit".
- **Unread walls of text.** Nothing limits how much text a card may carry without being
  spoken, and the goodnight format asks for the week's answer "in the community's words" on
  cards.
- **Length and the interview.** The default order sums to three to six and a half minutes
  and has one middle slot. No format is an interview built from a member's posts.

## Protocol findings, collected stage by stage


## Pitch stage (writer subagent)
1. Guest-entry gate disagrees with the playbook: the gate reads only the line containing the handle, the playbook says the entry "ends with" the real-people check. Workaround: a final "Summary:" line holding both.
2. The shell-reading ban in the prompt is not enforced for a manual writer, and digest.json (4.8 MB) is too big for the Read tool. Needs a supported lookup by URI or text, or a split digest.
3. The retro cannot use the inputs the bible names (previous plan.json, dna-amendments, scorecard, reviewer notes; last two episodes' sources.json) because reading the previous episode is forbidden. Pipeline should copy those in, or the bible should change.
4. Prompt wording "this episode carries nothing forward" reads as already decided.
5. Guest bios cannot be checked (R11, R14): the digest carries no bios, only its opt-out filter.
6. Digest misses: NL story not flagged (identity/politics origin, national pastiche); Wednesday's Top Chicken post unflagged in games but in a flagged story; "possible correction" flags misfire while the real correction signal (a viewer quoting an invented line) is not flagged; a "wish" that is not a wish.
7. The best thread was only a candidate, not one of the six expanded threads; text taken from stories data.
8. posts.jsonl sits in the digest folder but the prompt does not say whether it counts as the digest.
9. Genre shelf offers motet, plainchant, hymn, gospel while R10 bans religion: no line drawn.
10. Freshness override codes are only learned by running the check.
11. Prompt file lives under shots/.../_production/ while the prompt describes shots/ as frames.
Worked well: About the show section; exact thread text; Top Chicken section with consent handling; Built in this window; R4's worked examples; experiment guidance; clear fast gate output.

## Between pitch and write (project manager)
12. `--preview-only` is remembered in state.json but the writer is not: running `produce` without `--writer manual` silently fell back to the headless writer, which made a real call (failed on an expired login, cost nothing) and used up one write attempt. The writer should be remembered per run, or the default should be manual when no credential is present.
13. Config warning is a false positive: it says guestLines.realAccount differs from the tags R3 names because R3 also mentions `// invented`, which the bible reserves for `.example` characters.

## Write stage (writer subagent)
14. sources.json schema in the write playbook has no `lines` array, but the gate requires one per spoken guest line. The gate's FAIL message printed the template, which saved it.
15. Three vocabularies for a top-level post's occasion: R3 says context = the post's own URI; the playbook says `"occasion": "top-level"`; the gate wants `situation`.
16. An image-only post cannot be listed in sources.json (gate fails an empty caption) although every post used must be listed.
17. `analyze.ts voices` is required by the tools README and bible 07 for a new guest but is not in the stage's allowed commands. Same for a sanctioned "lab" command to test one line in isolation.
18. Tools README voice gaps are stale (accent raises the median 6 to 12 Hz); bot rate listed as 1.18 in the README and 1.0 in cast.js.
19. Stale comment in packages/show/src/cast.js says guests speak "catchphrases or obvious pastiche", contradicting the constitution.
20. A long verbatim post (29 words) exceeds bible 07's 14 words per beat; rules do not say whether a post may be split across beats.
21. No waiver path for verbatim lines that cannot be reworded and still fail intelligibility; intelligibility.json is names-only. Whisper cannot be told an expected homophone ("cee").
22. Word-count gate counts every round voice's sung words; unclear whether plan seconds should follow renders.
23. New weak sounds found: /s/ before /i/ near /sh/ (seal, receipt, cee); "synth"; possessive "Samantha's"; "just", "joins"; "That's"; "plotter"; "wheelie".
24. segment:new also creates index.js (the director's file); undocumented in the write playbook.
Worked well: precise gate messages; the render's IPA timeline; the clip cache (re-render in about a second); the nearest-neighbour voice tool; the pitch was detailed enough to write from almost unchanged.

## Direct stage, director A (cold-open, monologue, goodnight)
25. sources.json holds only likes: no display names, no reply or repost counts, though R4 and the cards gate want the real display name. Director had to extract them from the 4.8 MB digest. The write stage should record displayName, replies, reposts and likes.
26. The prompt's tool rules do not match reality (shell reading is described as refused but is not, for a manual writer).
27. The cards gate is opaque: it does not say which files it scans, and it treats an unmarked cut at the start of a post as a failure (correct, but undocumented).
28. The segment template fails the frames gate as shipped (it references an unknown cue), which hides real failures in the baseline run.
29. The gate shoots frames for every segment, writing into the other director's folders, and its summary is episode-wide. A per-segment option would let directors work in parallel.
30. House chyron handles (@larry.nx, @sibyl.ant in the studio's looks.js) are neither in sources.json nor on .example, breaking the on-screen handle rule. Director suppressed them.
31. R8's network handle check cannot run in this stage; moot for .example names.
32. Bible 03 says to hide the counter until the first bump, but the API has no way to hide it.
33. Bible 08 lists a browser window and a CRT power-down as house vocabulary; the studio has neither, so each episode redraws them. Two segments needed the same browser helper and had to duplicate it, because segments may not import from each other.
34. The script relies on the bot's chest screen, which is too small to read and takes no per-frame text. Director drew a separate readout.
35. Numeric shot options cannot trigger a push; worth a line in the README.
36. No rule for numbers that changed since a result (201 likes when crowned, 222 now).
37. Some cues say what lands only in prose (the corrections stamp's text).
Worked well: script comments plus cues.json are excellent to direct from; word timings make on-the-word staging easy; shoot is fast, batches cleanly and ran safely in parallel; gate messages are specific.

## Direct stage, director B (thread, song)
38. The import rule is not enforced: README, playbook and brief forbid importing from another segment, but direct.imports accepted it (tested and reverted). The cat helper is duplicated byte for byte in two segment folders.
39. Two disclaimer wordings (R9 and format 9); the footer is 13 px and 6 s by default, small for a constitutional requirement.
40. Thread posts are `use: "thread"` in sources.json, so the cards gate does not cover the thread's cards.
41. The frames gate prints a warn line with counts and no explanation of what it covered.
42. Studio gotcha: beam and label ignore the context's alpha, so fades by ctx.globalAlpha do nothing and skeetCard's fade-out mostly fails. Not in the README; cost a round.
43. A push drops a shot's set overrides, so hidden set pieces flash back; workaround is assigning show.set every frame.
44. No API to hide the "[ APPLAUSE ]" caption alone; it overlapped the round's lyric sheet.
45. skeetCard's name line does not wrap or truncate on narrow cards.
46. House band handles are on .band, a real top-level domain (R8).
47. The direct stage has nowhere to record open questions: the preamble points at the pitch's risks section, which this stage may not edit.
48. No way to check the frame budget from frozen frames.
49. `npm run thumbnail` is not allowed in the direct stage, so the chosen thumbnail moment cannot be previewed as rendered.
50. Parallel directors share one scratch area.
Worked well: word timings in cues.json; shoot's speed and parallel safety; the README's API reference and kit-tour; the bible's direction chapter.

## Self-check stage (reviewer subagent) -- result: SEND BACK
51. SERIOUS: no gate scans the transcription's heard text. Whisper heard Sibyl's "Last week, our Samantha puppet said" as "Last week, Auschwitz said", and "Samantha never posted that" as "Schman's never posted it". The line passed render.whisper at 7/11 words because the gate only counts matches. Every earlier stage saw that log. Needs a gate on heard text (out-of-bounds and alarming words), and the writer should respell names per voice.
52. The credits are never shot or checked. Article 4 and R9 require the credits to name the real accounts whose personas were played and to say every voice is synthesized; the studio's automatic end card has neither the heading, the handles, nor that line. No stage shoots the end card.
53. Stale logs mislead the reviewer: the production log folder kept shoot logs from the baseline run (template direction still in place) full of `unknown cue "reply"`, and the reviewer failed A11 on them. Fresh frames have no warnings. Logs need rotating or labelling by run.
54. `npm run verify` skips drafts, so "verify passes" says nothing about a preview-only episode.
55. Contradiction: "fail anything you are not sure passes" and "a send-back is right when true" sit beside "finished when no FAIL", with a retry counter that pushes a reviewer to soften scores. A correct send-back should end the stage and route to the stage that can fix it.
56. Out-of-scope waivers accepted: intelligibility.json is names-only but held waivers for verbatim lines, and the gate accepted them.
57. The occasion record stores the previous spoken line as a verbatim line's setup (Larry's "Hi, cousin." for a post that actually answered "Here's a sample."), which is what the reviewer's occasion test reads.
58. The experiment's success measure names the reviewer's scores, which the self-check also fills in: self-grading.
59. Rubric gaps: no level for "met on paper, needs ears"; B8 does not say how many weak punchlines make a 1 or a 0; one unstaged button drops B4.
60. The pilot-only rules table cannot record a pre-air result, and craft lessons from production have no route into the DNA except lore.
61. Frame counts in state.json do not match the folders; many frames appear in no log.
Reviewer's real-people items to look at twice: norvid's "or just make stuff up" card beside the praised refusal; only one of the pilot's invented lines is corrected; the house bot's tag sits right before the real build bot's card and newcomers may conflate them; "one post" slightly overstates the Bee Movie reply; "Saturday's winner" is a Friday post.
Worked well: Whisper logs showing heard text were the single most useful evidence; sources.json made card checks exact; the experiment had a checkable measure; the pitch's risks list pointed at the right places.
