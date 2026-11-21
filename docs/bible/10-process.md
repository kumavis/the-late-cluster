# 10. Good work, and the scorecard

`docs/WORKFLOW.md` says how an episode is made: the stages, who does each, what each writes and what
blocks. This chapter does not repeat it. It says what good looks like for each kind of work, and
ends with the scorecard a reviewer fills in before an episode goes to the owner.

Two rules of the workflow shape everything below. Whoever makes a thing does not judge it. And
writers, researchers, sound editors and builders work without seeing what the show has done before;
reviewers see it, and send back what repeats ([do not repeat the show](03-episode-shape.md#do-not-repeat-the-show)).

## Research

A researcher chooses and annotates cards from the scraper's skeletons, which already hold each post's
address and exact text. A researcher does not propose jokes or retype a post. An auditor then screens
the longlist against the constitution.

**Good:** a longlist that is wide (many kinds of thing, many people, small and new accounts as well
as busy ones); cards in neutral words; every post named by its address; images and video looked at
and described; follower counts; what could be shown working; anything sensitive or not understood
flagged, not dropped silently ([a content card](05-material.md#a-content-card)). For an interview
candidate, every candidate answer with its occasion. For the games lane, every result in the window.

**Watch for:** the same few accounts across most cards; outside news; one viral post swamping the
window; a card that already has an angle; a post quoted without the post it replied to.

## Brainstorming

Several writers work independently over the pool, the cards reviewers ranked highest for interest.
Independence matters more than agreement, and quantity more than polish.

**A good idea** is a few lines: the premise; the turn, in five words; what lands on screen and what
is heard; which shape might carry it; whose real words it would use, and where they come from on the
card.

**Good:** several ideas per card, unlike each other; ideas that start from what is on the card;
ideas for the small cards as well as the obvious ones; the picture named every time.

**Watch for:** the first idea only; the same idea in different words; an idea that is really a format
looking for material; anything that feels like the show's signature; a real person's line used to
answer something it did not answer.

## Drafting a segment

One writer drafts one segment, as a `script.js` in the format given in
`packages/show/tools/README.md`, with notes. More is drafted than the episode needs, so that
selection is a real choice. Each standing segment is drafted every week.

**Good:**

- setups of two lines or fewer; punches on words the engine can say; a button at the end;
- a `cue` for every moment the staging will need: each punch's picture, each card, each arrival;
- every line spoken by a real account's puppet tagged with its source and its occasion (R3), and the
  line before it is the setup that recreates that occasion;
- every real post that is shown named in a comment with its address, and either performed or read
  aloud unless it is a glance;
- spoken words at about 1.6 to 2.2 per second of the length the draft claims;
- notes that give the segment's retell in one sentence, its turn or feeling in five words, the people
  in it, and what a builder needs to know;
- lines written so they can be said; the sound editor fits them to the engine on a best effort and
  changes no word ([voices](07-voices.md#read-what-was-heard));
- the episode's experiment, from the brief, built in wherever it touches this segment.

**Reviewers score each draft** on four questions: is it funny; is it interesting; does it work as
television; does it add variety to the episode. A draft is not scored by its writer.

## Assembling an episode

One writer takes the selected drafts and makes an episode: the order, the open, the close, the
joins ([building the rundown](03-episode-shape.md#building-the-rundown)).

**Good:** about eight minutes or less, and no longer than its material; adjacent segments unlike each
other; an open that reaches the first material within about fifteen seconds; a close that ends on the
last strong thing and does not review the night; nothing added to tie segments together that the
segments did not earn; the episode's experiment run as `production/experiment.md` sets it out;
every script validating and rendering; every line the assembler adds or changes passed by the
repetition gate, then fitted on a best effort with its heard text read; nothing heard that is
crude, alarming or out of bounds.

**Watch for:** an order chosen because it feels like the usual order; a new runner threaded through
finished segments to make them cohere; a summing-up line; segments trimmed evenly instead of the
weakest cut.

## Staging

A builder stages one segment from its script and `cues.json`. A builder does not change the script
or what a real person is shown saying.

**Good:** every punch with a picture on its word; real things shown working; every card up for
exactly as long as it is being spoken; no text beyond a glance that is not spoken; real cards exact;
invented names on `.example`; nothing carried on screen from another segment unless the script asks;
frames shot at every punch, cue, shot change and overlap, and looked at; the credits shot and read
([direction](08-direction.md#review-your-frames)). An auditor then looks at every frame and routes
each change to whoever owns the file.

## Reviewing

A reviewer ranks, gates, scores and selects, and never rewrites what they review. Checks of fact and
rule (scope, the constitution screen, consent, the staged frames) are an auditor's, by the same
rules.

- **Send back with reasons,** naming the stage that can fix it. A send-back is a valid result, not a
  failure of the review.
- **Fail what you are not sure passes.** A review that softens to get an episode through has not been
  done.
- **Say what you could not check.** A reviewer who cannot hear the audio scores the sound rows from
  the heard text and the mix settings, says so in the evidence, and lists those rows for the owner's
  ears.
- **At the repetition gate,** give each item *fresh*, *turned* or *repeat*, and send a repeat back
  with the least description that lets the writer avoid it. How to judge, and what may be said, is in
  the reviewers' own record, which only reviewers and the project manager read.
- **The experiment.** Once the shortlist exists, a reviewer proposes the episode's one experiment and
  writes it to `production/experiment.md`: what to try, why, and a measure someone else can check
  ([episode shape](03-episode-shape.md#one-experiment-per-episode)). It goes into the writers'
  briefs, so it describes no earlier episode, joke, person or device. The final reviewer judges it
  in row B12, with the cold viewers' answers (`production/review/cold-viewers.md`) in hand.
- **Evidence in every row:** a line quoted, a timestamp, an address. Not just a result.

The owner's review comes after all of this and is not replaced by it (constitution, Article 5).

---

## The scorecard

Filled in by a reviewer, as `production/scorecard.md`, once the episode has been assembled and
staged. Writers and builders read it to know what will be asked; they do not fill it in, and rows
A13 and A14 can only be judged with the record of earlier episodes. Step 0 comes first. Part A is
pass or fail, and any fail blocks the episode. Part B is scored 0, 1 or 2.

### Step 0: is everything in it interesting?

List every segment in the episode, standing segments included, and any runner. Beside each, write
its one-sentence retell and its turn or feeling in five words
([the interesting test](00-constitution.md#the-interesting-test)). Anything without both is cut, or
the episode goes back, before the rest is filled in. A short episode is not a fault. This step only
removes things; it never overrides Part A.

### Part A: gates (all must pass)

| # | gate | pass | fail |
|---|---|---|---|
| A1 | Opt-out | No account on the opt-out list, or that has opted out in a post or bio, appears in any form | Any appearance, including a chart, a label or a credit |
| A2 | Verbatim | Every real post, on a card or read aloud, matches its address word for word, with the right display name, handle, date and like count | Any wording change beyond an ellipsis that keeps the meaning |
| A3 | Context | Every performed line passes the occasion test (R4): the line spoken just before it, set beside the original prompt in `sources.json`, is the same kind of prompt with the same job and meaning. No exchange implies a conversation that did not happen. House characters never paraphrase a real person's view | A line made to answer what it was not answering; posts from unrelated conversations joined into one; a summary of what a guest thinks |
| A4 | Guest lines | Every line spoken by a real account's puppet is from a source R3 allows, tagged with its source and occasion; a performed exchange matches its posts word for word and in order, cuts marked | Any pastiche; any opinion, fact or reaction they did not publish; any altered or reordered line |
| A5 | No fabrication | No invented event, number or quote is attributed to a real person or to the community. Every guess is labelled as a guess in the voice and on screen | Any; a projection that could be clipped as a fact |
| A6 | Out of bounds | None of the R10 subjects, anywhere in script, screen or audio | Any |
| A7 | Repost test | Every real person in a joke would plausibly repost it; small accounts appear only as heroes | Anyone as the butt; a small account laughed at |
| A8 | Labels and credits | PUPPET · PARODY on every guest chyron; a disclaimer at the first guest; the credits, shot and read, name the real accounts whose personas were played and say every voice is synthesized; things people made are credited | Any missing; credits not shot |
| A9 | Fictional names | Every invented handle and address is on `.example` or is a display name only, and is labelled as the show's | A real top-level domain; a handle that resolves |
| A10 | Rankings | Only winners are named; the Top Chicken winner and post pass R10 and R11; no guess names anyone who has not won | Anyone named or shown as a loser, a runner-up or a contender |
| A11 | Builds | `npm run check` passes and the build verifies for this episode; no unknown-cue warnings in this run's logs | Any failure; a check that did not cover this episode |
| A12 | Constitution | The pull request leaves `00-constitution.md` and `09-real-people.md` untouched | Any change to either |
| A13 | Repetition | Two reviewers with the record of earlier episodes have given every selected script a verdict; none is *repeat*; at most one item is *turned*; nothing refers to an earlier episode | Any repeat; a second turned item; a callback to the show's past |
| A14 | People | Nobody whose puppet spoke in the previous episode speaks in this one; most of the accounts featured on screen are new; any warning that someone is on too often has been answered | A speaker from the previous episode; a majority of returning accounts; an unanswered warning |
| A15 | Unread text | Nothing on screen beyond a glance goes unspoken: every shown post is performed or read aloud, or is glance-sized | Any block of text held for the viewer to read in silence |
| A16 | Heard text | The transcription's heard text of the final mix has been read for every line. Nothing heard is crude, offensive or alarming, or touches R10. Every line that is still heard differently from its caption about a real person, a real name heard as another word included, is listed in the fit report for the owner's watch, and its exact words are on screen while it is said (best effort is sufficient: [voices](07-voices.md#read-what-was-heard)) | Anything crude, offensive, alarming or out of bounds heard; heard text not read; a line heard differently about a real person that is not listed, or whose exact words are not on screen |

### Part B: quality (0, 1 or 2 each; 26 possible)

| # | criterion | 2 | 1 | 0 |
|---|---|---|---|---|
| B1 | **Point** | It can be told as "the one where…" in a sentence a cluster member would want to watch; the order is deliberate; nothing announces a theme | Good segments with no shape to the whole | Unrelated bits, or a summing-up speech |
| B2 | **Funny** | Every segment has at least two jokes that land on a cold watch; the biggest laugh is in the back half | Most segments land; one is flat | Two or more segments without a laugh |
| B3 | **Material** | Every joke rests on a real thing or number from the window, and most segments are about something a person made or did | A few generic jokes, or mostly talk about talk | Mostly generic, invented or merely popular |
| B4 | **Staged** | Every punch has a picture on its word | Some punches unstaged or late | Talking heads with decoration |
| B5 | **Newcomer test** | Two thirds or more of the jokes work for someone who missed the week | About half | Mostly in-jokes |
| B6 | **Tone** | Affectionate throughout; any sincere moment is earned, short and in the community's own words, spoken | A sincere moment that runs long or is in the show's words; a tease close to the line | A speech, a sneer, or sincerity undercut at someone's expense |
| B7 | **Television** | Every segment gives the viewer something to watch happen; things people made are shown working | One segment is heads and cards | Two or more segments are heads and cards |
| B8 | **Intelligibility** | Every punchline is heard as written and every name as itself | Some punchlines or names are soft, and the caption and a picture carry each one | A punchline or a name that is lost: not heard, and not on screen when it is said |
| B9 | **Sound** | One reaction per joke, sized to it; some lines left dry; nothing loud under a punch | Over-sweetened in places | A laugh after every line, or big laughs on mild jokes |
| B10 | **Shape** | About eight minutes or less with no filler; adjacent segments differ; every segment ends on a button; the open and the close do their jobs | A slack stretch, two similar segments adjacent, or over nine minutes | Padded to a length, ten minutes or over, or segments with no buttons |
| B11 | **Standing segments** | The interview, Top Chicken and the music each do what their format asks, or one is cut with a reason under the first rule | One of them is perfunctory | Two are perfunctory, or one is missing with no reason |
| B12 | **Experiment** | The experiment in `production/experiment.md` was built in and run on screen, and its measure can be checked from the episode | Proposed and run, but only partly built in, or with a weak measure | No experiment, or a cosmetic one, or one dropped or changed after it was proposed |
| B13 | **Range** | Different people, subjects, textures and kinds of comedy across the episode; no account in more than two segments | One account or one subject dominates | An episode about a handful of people, or one joke told five ways |

What "does what its format asks" means for B11 is in
[formats](04-formats.md#the-three-standing-segments): an interview of at least three exchanges that
shows a person; a Top Chicken that is more than a result, with any guess labelled; a song whose form
is its joke and whose theme is this window's.

### Approval

**Approve** when Step 0 is clean, every gate passes, and Part B totals **18 or more**, with no 0 in
B1, B2, B7, B8, B11 or B12.

**Send back** otherwise, naming the lowest rows, the stage that can fix each, and one concrete
suggestion each.

Approval by a reviewer sends the episode to the owner. It is not the owner's review.
