# Brief: place the guests' voices and fit the commission's drafts

- **Role:** `sound-editor` (.claude/agents/sound-editor.md)
- **Episode:** `002-commissions-w47`, a commission, not an episode. Paths below are under
  `episodes/002-commissions-w47/production/` unless they start with `docs/` or `packages/`.
- **Drafts:** the slugs are in the message that gave you this brief.
- **Write:** `fit/voices.md` (only if the message says you place the voices), `fit/<slug>.md` for
  each of your drafts, and in each draft only `cast.js` voice settings and, in `script.js`, the
  fields `as`, `gap`, `rate`, `vol`, `f0` and `wait` beats. Each draft's `fit.json` is written by
  the tool.

## Read

- `docs/bible/07-voices.md`
- `packages/show/tools/README.md`: "Fitting a script" (from line 519), "Rendering a draft" and
  "Giving guests voices" (to about line 665). Not the rest.
- your drafts' `script.js` and `cast.js`

## The task

1. **Voices** (only if the message says so). Run `npm run voices -- 002-commissions-w47 --drafts`.
   Every guest is new, so every guest is placed; the owner's soft pronoun steer applies by
   itself, from each guest's stated pronouns. Do not give a hand rule unless two voices cannot be
   told apart by ear, and say so if you do. Write `fit/voices.md`: one line per guest with the
   voice chosen, what it is distinct from, and the steer column as the tool printed it.
2. **Fit each draft.** `npm run fit -- 002-commissions-w47 --draft <slug> --json`, read the
   table, then `--apply --json` to write the respellings the tool chose. For what it could not
   fix, respell by hand in `as`, word for word, and fit again. Stop when no line is `flagged` or
   `unsayable`, or when a line has had six tries.
3. **Symbols and emoji in a real person's line.** The `text` stays exactly as posted. What the
   voice says goes in `as`: the symbols read aloud as a person would read them, in order, adding
   nothing and leaving nothing out (for example ½ as "a half", ≥ as "at least", → as "goes to",
   ∞ as "infinity", ζ(1) as "zeta of one"). An emoji that is only decoration is left unspoken;
   say which ones in your notes.
4. **Direction the writers left for you.** In `making-of-inward` the smaller Larrys are the house
   puppet with `f0` raised a step at each level (118, 132, 148). Tune those values so the ear
   hears each level as smaller and every line is still heard; the bottom is Larry's own pitch.
5. **Running time.** After fitting, `npm run render -- 002-commissions-w47 --draft <slug>` and
   report the rendered length from its cues. The commission asks for two minutes or less. If a
   draft runs over, do not cut anything: report by how much.
6. **Write `fit/<slug>.md`** for each draft: the tool's last summary line; the rendered length;
   every line you respelled by hand, with what was heard before and after; and every line still
   `flagged` or `unsayable`, with its id, its text and what was heard. Those go back to the
   writer.

## Rules

- No line's `text` changes, in any draft. A real person's words are never cut or reordered.
- Nothing outside the files named under **Write**. No network, no git, never `.secrets`.

Reply in a few sentences: per draft, the rendered length and how many lines go back to a writer.
