# Fit: making-of-inward (the redraft, 21 November 2026)

Tool's last summary line:

    fit 002-commissions-w47 --draft making-of-inward: 40 lines × 4 takes · ok 30 · weak 1 · flagged 0 · unsayable 9 · 22 s (131 heard, 132 cached)

Exit 0. `--sounds`: 0 words sound different from the word (4 guesses: Vee-lum, ree-drew, ay-eye,
the handle). `npm run voice-research -- 002-commissions-w47 --draft making-of-inward` exit 0.
`npm run check -- 002-commissions-w47 --draft making-of-inward`: 1 passed.
**Rendered length: 103.4 s** (`cues.json` duration 103.364).

No guest and no real person speaks. Every heard text was read. Nothing heard is crude, alarming or
out of bounds in what is kept (one crude hearing came up on the way and was cleared: `up-posts`,
below).

## The sounds audit

Put back to the plain spelling, because the respelling changed the word's sounds: `show` everywhere
(`sshow` in `l0-how`, `showw` in `l2-list`), `That's` (`Thatt's`, θ for ð) in `l0-head`, `kazoo`
(`ka-zoo`, `kah-zoo`: ɑ for ə) in `l3-kazoo` and `scripts-kazoo`, `on` (`awn`: ɔ for ə) in
`l2-go-on` and `l2-list`. "show" is now /ʃ oʊ/ in every line. The transcription hears it "flow",
"foe", "focus", "fall" in places; the caption carries it.

Also rejected by the check before use: `Rreview` (heard "review", but said /ɹ ɹ ɛ v i w/),
`Postss`/`Pohsts`/`Pposts` (ɑ for oʊ), `kuh-zoo` (an added h), `kazzoo` (æ), `Ree-vyoo` (an added
vowel). The tool's own `--apply` choices all keep the sounds: `Frum` (ə–ʌ), `onn` (strong form of
"on"), the commas.

## The smaller Larrys

All the house puppet (Larry, body male, accent 0.16), `f0` only:

| level | place | f0 |
|---|---|---|
| desk, bottom | the show, the community | 104 (Larry's own) |
| 1 | scenes | 124 |
| 2 | review | 148 |
| 3 | scripts | 176 |
| 4 | review, again | 209 |
| 5 | posts | **240** (the writer's direction was 249) |

Each step is about three semitones (the last about two and a half), so each level is plainly
higher, read as smaller, than the one above. Level five is capped at 240 to keep the stressed
syllables' excursions clear of the engine's saturation above 280. Intelligibility did not depend on
pitch in these lines: the hard words ("review", "scripts", "scenes") were heard the same way at 104,
124, 148, 176 and 190 Hz; `posts-count` at 240 is heard 9/9 ("Last run, 2825.").

## The handle (`turn-handle`)

`as: 'aat,-layt,-cluster,-dot,-sim-cluster,-dot,-tee-vee'` with `intonation: 'statement'`,
rate 0.92: /æ æ t l eɪ t k l ʌ s t ɚ d ɑ t s ɪ m k l ʌ s t ɚ d ɑ t t i v i/, "at, late cluster,
dot, sim cluster, dot, tee vee" with a pause after "at" and each part. Heard "add late
cluster.simcluster.tv" ×3, "…simcluster.te" ×1: the transcription writes the handle itself.
Tried: `at-late-…` without commas ("But let cluster.sim cluster.tv"), `att-late-…` and
`att-layt-…` ("Select cluster dot…"), `att...-` and `att.-` ("pet, red cluster"; "rest, read
cluster"), `at,-layt,-…` (/ət/: "but late cluster.sim cluster.tv" ×4), `att,-layt,-…`,
`att!-…`, `Attt,-…`. `aat` keeps "at" stressed, /æt/, as a host says it reading out an address.

`turn-spaces` is `Noh, spaces.` at gap 0.3 (was 0.2): "No! Spaces!" ×3, "No, space shows." ×1.

## The burp

Three clips, each the `burp` beat alone, rendered from scratch copies of the draft into
`packages/show/tools/.cache/drafts/002-commissions-w47/making-of-inward/burp/` (each file is 1.2 s
with the engine's lead-in and tail; the sound itself is 0.24 to 0.30 s):

- **a.mp3**: Larry, "Urp." /ɝp/, f0 55 (below the 85 Hz floor, where his voicing breaks into
  creak), accent 0, intonation flat, rate 1.05: 0.30 s. Heard "Oop." **This one is in the script,**
  at `vol: 0.6`, because it is in Larry's own voice and mouth (his jaw and lips move with it) and
  it closes on the p, mouth shut.
- **b.mp3**: Larry, `as: 'Gup.'` /g ʌ p/, a stopped onset and a short vowel, f0 60, flat, rate
  1.2: 0.31 s. Heard "" ×2, "Scup." ×2. More of a gulp than a burp.
- **c.mp3**: Al Veolar, the bass (fry 0.2 in his voice), `as: 'Erp.'` /ɝp/, f0 55, flat, rate
  1.5: 0.24 s. The rattliest; heard "OOP" ×3, "ERP" ×1. It would put the sound in Al's voice,
  not Larry's.

To swap in b or c, change only the `burp` beat (`as`, `f0`, `rate`, and `say: 'al'` for c). Nobody
has heard them; the owner chooses.

## Other changes this pass

- `scripts-writer`: `with uh short` (was "a frustrating list"): now 12/12.
- `review-late-me`: `So don't, ask me` (was "don't test me"): 8/8.
- `turn-point`: `In uh post, type an att sign` (13/17, was 12/17).
- `review-early-title`: `Rreev-yoo` (sounds kept), 4/5 (was 3/5).
- `up-posts` and `posts-title`: `Poasstss` (sounds kept, consonants held), `up-posts` rate 0.9.
  As written at 249 Hz "Posts." was heard **"poops"** in two takes, which is never accepted;
  `Poasstss` is heard "Post" in every take at 222, 236 and 240 Hz.
- Tried and not kept (no better than plain): `Rree-view`, `Rree-vue`, `Rreev-you`, `Rreevv-yoo`
  for "review"; `Skrippts`, `Scriptts`, `Sskriptts` for "scripts"; `Seenz`, `Sceenz` for "scenes";
  `sim-cluster` in `turn-you` (it turned "I open and shut" into "eye-opening shot"); `onn` in
  `l2-list`; a comma before "twice".

## Heard differently, caption exact

No real person's line in this draft.

- **turn-mouth** (the punch line): "I'm a mouth." is heard "I'm a mouse" ×4.
- **turn-you** (the turn): "That's you, simcluster. You make this show." is heard "Let you,
  simple stir, when you make this fall, I open and shut." ×4.
- **turn-point**: "…type an at sign, then the show's name:" is heard "…type net sign in the full
  name." ×4.
- **turn-handle**: heard "add late cluster.simcluster.tv" ×3 (the handle is on screen).
- **l0-how**: "show" is heard "flow" ×3, "floor" ×1.
- **l0-head**: "That's everything in my head." is heard "Let's everything in my head" ×4.
- **l0-parts**: "Velum" is heard "heelum" ×3, "heel, arm" ×1 (the label is on screen).
- **scenes-title**: "Before the show: scenes." is heard "before the show seems" ×3, "…flow sinks" ×1.
- **l3-kazoo**: "kazoo" is heard "two" ×4.
- **review-late-title**: "…review." is heard "re you" ×3, "are you" ×1.
- **review-late-rule**: "Reviewers choose… does not judge it." is heard "Or you will choose…
  does not love it." ×2 (and "are cool", "are told").
- **scripts-title**: "Before review: scripts." is heard "Before you scripts" ×4.
- **l2-list**: "The show is not on it. By rule." is heard "The foe is not knit by rule." ×4.
- **scripts-kazoo**: "The script said kazoo. The tool heard clue." is heard "The script said
  glue, and the tool heard glue." ×4 (the ear's labels WRITTEN kazoo / HEARD clue are on screen).
- **review-early-title**: "review" is heard "hurry you" ×4.
- **review-early-seen**: "These reviewers have seen everything the show has done. Nothing gets in
  twice." is heard "These are yours, I've seen everything the focus done, nothing gets in place." ×4.
- **review-early-except**: "Except review." is heard "Except for you" ×4.
- **posts-title**: "Before review: posts." is heard "Before you post" ×4.
- **up-posts**: "Post" ×2, "It posts!", "the post".
- **up-review-early**, **up-review-late**: "Review." is heard "Where are you?", "for you", "or you",
  "Re-yoop".
- **up-scripts**: "Scripts." is heard "Scrapes" ×4.
- **up-scenes**: "Scenes." is heard "scenes" ×2, "Shins", "Since"/"Singh".
- **up-show**: "show" once "shawl".

24 of the 39 captioned lines are heard differently from their caption somewhere; the gauge and the
captions carry the words.

## For the owner

Nothing heard as crude, alarming or out of bounds is kept. The three burps are yours to choose by
ear.
