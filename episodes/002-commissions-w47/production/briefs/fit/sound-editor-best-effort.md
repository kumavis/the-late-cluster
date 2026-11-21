# Brief: one best-effort fitting pass on the four commission drafts

- **Role:** `sound-editor` (.claude/agents/sound-editor.md; it has changed today, read it)
- **Episode:** `002-commissions-w47`, a commission. Paths below are under
  `episodes/002-commissions-w47/production/` unless they start with `docs/` or `packages/`.
- **Drafts, in this order:** `making-of-inward`, `making-of-outward`, `riemann-market-wrap`,
  `riemann-proof-that-fits`. Finish one before starting the next.
- **Write:** in each draft's `script.js` only `as`, `gap`, `rate`, `vol`, `f0` and `wait` beats;
  `fit/<slug>.md`; and the voice research file through `npm run voice-research` (never by
  editing the generated page). Each draft's `fit.json` is written by the tool.

## What changed

The owner ruled on 21 November 2026: "best effort on pronunciation is sufficient, as subtitles
carry the line. document hard to say words in a voice research file as part of the process."
The writers have put their lines back to what they first wrote, real people's words included.
Nothing goes back to a writer now, and no line's words change.

## Read

- `docs/voice-research.md`: what is already known. Start from spellings that worked.
- `packages/show/tools/README.md`: "Fitting a script" and the part on `npm run voice-research`.
- `docs/bible/07-voices.md`, the section "Read what was heard".
- each draft's `script.js`, and its existing `fit/<slug>.md` for what was tried before.

## The task, for each draft

1. `npm run fit -- 002-commissions-w47 --draft <slug> --json`, then `--apply --json`. The tool
   now tries known spellings first and stops on words known to be unsayable.
2. Make a best effort on what is left: respell by hand, adjust rate and small gaps. Spend it
   where it matters most: first, anything under `FOR THE OWNER` (heard as crude, alarming or out
   of bounds is never accepted: find another spelling); then a real person's line that is heard
   as a different statement; then punch lines. Three or four tries a line are enough. Do not
   repeat tries the notes or the research file already record as failed.
3. Never keep a spelling heard as crude, alarming or out of bounds. If a line has no spelling
   without that, put it at the top of your report for the owner and keep the least bad one that
   is not crude.
4. `npm run voice-research -- 002-commissions-w47 --draft <slug>`: harvest what worked, and add
   every hard word that is left with `--add` (the word, the line, the status, a one-line note).
   Add a pattern if you see one that is not there. The command must end with exit code 0.
5. `npm run render -- 002-commissions-w47 --draft <slug>` and read the rendered length from its
   output.
6. Rewrite `fit/<slug>.md` as the final note: the tool's last summary line; the rendered length;
   then a list headed "heard differently, caption exact" with each such line's id, its caption
   and what is heard, real people's lines first; then anything for the owner.

## Rules

- No line's `text` changes. Nothing is cut. Nothing outside the files named under **Write**.
- No network, no git, never `.secrets`. Do not run `npm run voices`: the voices are placed.

Reply in a short list: per draft, the rendered length, how many lines are heard differently from
their caption, and anything for the owner; then how many entries you added to the research file.
