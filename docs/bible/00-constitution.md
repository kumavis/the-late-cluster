# 0. The constitution

Read this every time, in full. The constitution is two files: this one and
[09-real-people.md](09-real-people.md). Only the owner changes them, and the pipeline refuses an
episode whose pull request touches either. Everything else in `docs/bible/` is the show's **DNA**,
and it is meant to move.

## Why there are two layers

Projects tend to lose flexibility after their first formation. A bible written from one pilot
hardens into a recipe for remaking the pilot. So the push to innovate has to live in each episode's
instructions: every episode is asked to change something about the show and to test one idea. That
is only safe if the few things that must not change are written down separately and kept short.
They are below. Everything else is open to amendment.

## 1. Only include it if it's interesting

This overrules everything in the DNA about structure: the running order, the formats, the standing
segments, the runners, the length. Any slot, standing segment or runner can be cut in a week where
it is not interesting. A short episode of interesting things beats a full one with filler. Nothing
is in an episode because the structure has a place for it.

### The interesting test

Three questions and a cut test, for a joke, a segment or a whole episode:

1. **Turn or feeling.** Does it surprise (the viewer could not have predicted the punch from the
   setup), or does it move (it is true and it lands)? Name the turn or the feeling in five words.
2. **This week.** Could only this week's episode contain it? Standing elements are exempt as
   shapes, never as content: the Ask's post, Sibyl's descriptor and the song's theme are this week's.
3. **Retell.** Would a viewer tell someone about it in one sentence, without explaining the week?

**The cut test.** Take it out. If the episode loses nothing a viewer would miss, it goes.

| level | passes when | if it fails |
|---|---|---|
| a joke | all three questions are yes | cut it; don't patch it with a bigger laugh |
| a segment | it holds at least one retellable thing, and its jokes pass | trim; if fewer than two jokes survive, cut the segment |
| an episode | it can be pitched as "the one where…" in a sentence a cluster member would want to watch | re-pitch before writing anything |

## 2. Real people

[Chapter 9](09-real-people.md) is part of this constitution, in full. It decides what is
**allowed**; Article 1 decides what is **worth including**. Material must pass both, chapter 9
first. Article 1 only ever removes things: it never licenses what chapter 9 forbids, and it never
removes what chapter 9 requires.

## 3. Public posts, no prior permission

The show works from what people publish openly. It does not ask permission first. Asking someone
and waiting for a reply is only ever an option, used in some cases, such as an interview. Nothing
in the process may make an episode wait on a reply from a person it depicts: if a question goes
unanswered, the episode goes ahead without it.

What protects people is not prior permission but the rules of chapter 9: their own words first,
nothing invented, nothing private, the out-of-bounds subjects, small accounts only as heroes, the
parody labels, and an opt-out that is honoured absolutely and promptly. This article removes a
bottleneck. It does not remove or weaken any protection.

## 4. The medium is honest on screen

Guests are labelled PUPPET · PARODY; a disclaimer runs when the first guest appears; the credits
name the real accounts whose personas were played and say that every voice is synthesized;
tributes credit their makers; invented things look invented. These are never cut, whatever
Article 1 says, because they are not content.

## 5. The show's own review signs off before publishing

Before an episode is published, the owner, or a reviewer the owner names, reads every script and
watches the whole episode with sound, and approves it. This is the show's editorial review. It is
not consent from the people in the episode, and nobody depicted is asked to approve anything. A
model's self-check is not this review.

## 6. How the DNA changes

- Every pitch begins with a retro on the previous episode, then says what it keeps, what it changes
  and why, and names **one deliberate experiment** with how we will know whether it worked.
- When an experiment works, the same pull request that carries the episode edits the DNA chapters,
  so the reviewer approves the change to the show together with the episode. Git history is the
  lineage.
- Earlier episodes' source is not available by default. Anything carried forward is named in the
  plan with a reason, and only that is copied in, as reference.
- The constitution changes only by the owner, never in an episode's pull request.

How to do all this well is DNA, in [episode shape](03-episode-shape.md#evolving-the-show).
