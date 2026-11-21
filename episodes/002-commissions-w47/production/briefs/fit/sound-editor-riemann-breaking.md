# Brief: fit riemann-breaking-news

- **Role:** `sound-editor` (.claude/agents/sound-editor.md)
- **Episode:** `002-commissions-w47`. Paths below are under
  `episodes/002-commissions-w47/production/` unless they start with `docs/` or `packages/`.
- **Draft:** `riemann-breaking-news`, a new script that replaces two earlier ones. Every
  pronunciation field in it is empty.
- **Write:** in `drafts/riemann-breaking-news/script.js` only `as`, `gap`, `rate`, `vol`, `f0`
  and `wait` beats; `fit/riemann-breaking-news.md`; the voice research file through
  `npm run voice-research`. `fit.json` is the tool's. Do not change `cast.js`: the guests'
  voices are placed and stay as they are.

## Read

- `docs/voice-research.md`, especially "Heard by the transcription, not by a listener"
- `packages/show/tools/README.md`: "Fitting a script", including the part on sounds, and
  `npm run voice-research`
- `docs/bible/07-voices.md`: "Read what was heard"
- `drafts/riemann-breaking-news/script.js`, with the writer's notes for you at the top
- `fit/riemann-proof-that-fits.md` and `fit/riemann-market-wrap.md`: what was tried on the lines
  this script shares with the two earlier ones. Do not repeat tries they record as failed, and
  do not reuse a spelling the research page lists as misleading.

## The rules that matter here

- **Best effort is sufficient: the subtitles carry the line** (the owner's ruling, 21 November
  2026). Nothing goes back to a writer, and a real person's words are never cut for the voice.
- **A respelling keeps the word's sounds.** The tool now rejects one that does not. The plain
  spelling stays where nothing better keeps the sounds, even if the transcription then mishears
  it. Run `npm run fit -- 002-commissions-w47 --draft riemann-breaking-news --sounds` at the end:
  it must list no dictionary word.
- **Never kept:** a spelling heard as crude, alarming or out of bounds. Find another; if there is
  none, put the line at the top of your note for the owner.
- **Symbols in a real person's line.** The `text` stays exactly as posted. In `as`, read the
  symbols aloud as a person would, in order, adding and omitting nothing (≥ "at least",
  ½ "a half", → "goes to", ∞ "infinity", ζ(1) "zeta of one"). A closing □ and a decorative
  emoji stay unspoken; say which.
- **Handles** read aloud are a guess for the engine; make them as clear as you can, and move on.

## The task

1. `npm run fit -- 002-commissions-w47 --draft riemann-breaking-news --json`, then
   `--apply --json`. Best effort on what is left, three or four tries a line: real people's
   lines first, then the news frame's two sentences, then the button.
2. The writer notes that two guests' voices sit close in pitch and now share a segment
   (about 270 and 250 Hz). Do not move either voice. If a line of one could be taken for the
   other, a small `rate` difference is yours to use; say what you did.
3. `npm run voice-research -- 002-commissions-w47 --draft riemann-breaking-news`: harvest, add
   the hard words that are left, exit 0.
4. `npm run render -- 002-commissions-w47 --draft riemann-breaking-news` and read the length.
5. Write `fit/riemann-breaking-news.md`: the last summary line, the rendered length, how each
   symbol and handle is read, and the list "heard differently, caption exact", real people's
   lines first.

No line's `text` changes. Nothing is cut. No network, no git, never `.secrets`.

Reply in a short list: the rendered length, how many lines are heard differently from their
caption, anything for the owner, and what you added to the research file.
