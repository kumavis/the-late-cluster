# Draft a segment: riemann-breaking-news

- **Role:** `writer` (.claude/agents/writer.md)
- **Task:** one segment made from two that the owner watched and did not think were good enough
  apart. Yours replaces both.
- **Write:** `production/drafts/riemann-breaking-news/script.js`, `notes.json`, `sources.json` and
  `cast.js`. Nothing else.
- **Scratch:** `shots/002-commissions-w47/_production/scratch/draft-riemann-breaking-news/`, yours
  alone; nothing there is kept.
- **Check:** `node episodes/002-commissions-w47/production/briefs/draft/check.mjs riemann-breaking-news`
  prints only your draft's lines. You are done when it ends `ok`.

Paths here are under `episodes/002-commissions-w47/` unless they start with `docs/` or `packages/`.

## Read

- docs/bible/00-constitution.md
- docs/bible/09-real-people.md
- docs/bible/06-jokes.md
- docs/bible/04-formats.md
- docs/bible/02-cast.md: who the house characters are and how each of them talks
- production/commission.md: the whole of it is short; its last section is the owner's notes on
  the two segments, word for word
- production/research/terms-riemann.md: the top of the file, the section "The combined
  breaking-news segment (the owner's ruling, 21 November 2026)", and "Rules for the whole
  subject" at the end. That section's table says which posts and people you may use and how.
- production/research/kept/riemann-what-is-a-zeta-function.json and
  production/research/kept/riemann-learned-from-the-chart.json: the cards, with every post's
  exact text and address
- production/research/pronouns.md
- production/drafts/riemann-proof-that-fits/script.js and
  production/drafts/riemann-market-wrap/script.js: the two segments the owner watched. Here you
  are assembling, so you read them. Take what is best; the new script is yours.
- docs/voice-research.md: a one-minute scan of words the voice finds hard. You may still use any
  of them: the subtitles carry the line.
- packages/show/tools/README.md, only the section "Writing a segment script" (lines 80 to 226)
- packages/writers-room/playbooks/sources.md

## The task

The owner's notes, in the owner's words:

> both Riemann segments weren't super great. since it just happened and its big news, lets frame
> it as a breaking news segment. lets combine the best bits of the two into one segment. the
> heres your chance to shine + proof in a post was good, but tighten it up a bit for time. add
> the market reaction jokes but drop the "probably unrelated" bit. also drop the quoting of the
> post times, super boring

So:
- **One segment, framed as breaking news.** It just happened and it is big news, and the show
  treats it that way. The terms say exactly what the news frame may and may not state: the show
  says nothing about whether the proof is right and does not name the mathematician.
- **Keep** the call ("your time to shine") and the proof in a post. The owner liked them.
  **Tighten** them.
- **Add** the members' market-reaction jokes. **Drop** the "probably unrelated" exchange
  altogether. The terms' new section says what keeps the jokes the members' own.
- **Nobody reads a post's time aloud.** Cards still carry their dates on screen.
- What made each of the two segments slow or flat is for you to find and leave out.

**Length.** About a minute and a half; two minutes at most. Only include it if it's interesting.

**Files.** `script.js` in the script format of the studio's README, with
`id: 'riemann-breaking-news'`. `notes.json`:
`{ "slug": "riemann-breaking-news", "title", "format", "seconds": <your estimate>, "standing": null, "cards": ["riemann-what-is-a-zeta-function", "riemann-learned-from-the-chart"], "ideas": ["1:17", "2:17", "2:3", "1:3"], "turn": "<the turn, in five words>", "speakers": [...], "featured": [...] }`.
`sources.json` as the sources playbook sets out. `cast.js`: copy each guest's entry you use from
the two drafts' `cast.js` files exactly as it stands, voice settings included, so nobody's voice
changes.

**Exact text.** Take every post's text from the kept card by its address. Never retype one. A
real person's words are spoken whole where you can; a cut is marked with an ellipsis and keeps
the meaning. Do not cut or reword anyone's line because the voice finds it hard.

**Pronouns.** Refer to a real person by name or handle. Use a pronoun only where
`production/research/pronouns.md` states one, and then that one. Where none is stated, use the
name, or "they". Never infer one.

**Words only.** Leave `as` and every pronunciation field empty: a sound editor fits the script
afterwards, with a corrected tool.

**For the stager.** On every cue, a comment saying what the picture is and what the camera does.
The two earlier segments were staged, so the studio can already draw the members' post cards,
the bars, brackets and slabs of the proof, a wall of analyst boxes and a news channel's
graphics; ask for what serves this segment. Nothing on screen for the viewer to read in silence
beyond a glance.

## What the check enforces

- `script.js` loads, has `id: 'riemann-breaking-news'` and beats, and every spoken line has an id
  of its own. `notes.json` has title, format, seconds and turn, and cards, ideas, speakers and
  featured as lists.
- Every line a real account's puppet speaks is that account's post from a kept card, character
  for character (a cut marked with `…`), tagged on its line
  `// verbatim: at://… · context: at://…`, recorded in `sources.json` "lines" with the staged
  line that sets it up, which comes before it. The puppet is a guest in your `cast.js`.
- A warning, not a failure, where a house line uses he or she: look at each one.

Reply in a short list: the shape beat by beat, what you kept from each of the two, what you left
out, and the running time you expect.
