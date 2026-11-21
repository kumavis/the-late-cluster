# Brief: second look at the four commission drafts, changed lines only

All paths are under `episodes/002-commissions-w47/production/` unless they start with `docs/`.

Your first audit is `review/audit-drafts.md`. Since then the drafts were fitted to the voice
engine, and writers rewrote the lines the voice could not say. A sound editor changed only
pronunciation fields (`as`, `rate`, `gap`, `f0`), which are not yours to check. This look is at
what the writers changed, against the same terms.

**Read**
- `review/audit-drafts.md`, and the brief it was made from, `briefs/screen/auditor-drafts.md`
- `research/terms-riemann.md`, `research/terms-making-of.md`, `research/pronouns.md`,
  `research/production-facts.md`, and the kept cards the drafts cite
- the four drafts under `drafts/`, each with its `script.js`, `notes.json`, `sources.json`
- `heard-waivers.json`, and each draft's `fit.json` only for the "heard" text of a real person's
  line

**What changed**
- `riemann-proof-that-fits`: the tag at `tag-k` (your one `must`); the call card no longer shows
  bisks' handle; `eppy-half-1` to `eppy-half-6` reworded; `amber-call` is now a marked cut that
  drops the handle from the voice; `amber-infinity` is now "… → ∞. □" with the cut words shown
  as a marked label; Sibyl's reading of zetaof1's post is whole again.
- `riemann-market-wrap`: `throw-huwupy`, `throw-moultano` and `reply-intro` no longer say the
  handle, and their cues bring the exact name up at the start of the line; `open` keeps the
  handle under a waiver.
- `making-of-inward`: the credit comes down before the invitation (cue `credit-out`);
  `turn-mouth` is now "I'm the part that talks."; `l3-sheet` reworded.
- `making-of-outward`: `one-rule`, `who-judges`, `two-reviewers` and `usage-limit` reworded.

**Check**
1. Your `must` is resolved, and each note you raised that a writer acted on is resolved.
2. Every changed line still keeps the terms: exact text and marked cuts that keep the meaning for
   real people's lines; each real line's setup still does the job of what the post replied to;
   process facts as the fact sheet states them; the rules on the turn to the audience.
3. **What is heard.** For every line a real person's puppet speaks, and every post a house
   character reads aloud, read the "heard" texts in `fit.json`. A mishearing that is harmless
   nonsense is a `note`. One that changes what the person said, makes a statement about a person,
   or is crude or out of bounds is a `must`.
4. The waiver in `heard-waivers.json` is for a name the check cannot spell, quotes what was
   heard, and is not covering a statement about the person.

**Write** `review/audit-drafts-2.md`: per draft `pass` or `change`, then findings marked `must`
or `note`, each with the line's id. Change nothing else. No network is needed. You do not judge
whether anything is funny, and you do not rewrite.

Reply in a few sentences: the four verdicts and each `must` in a line.
