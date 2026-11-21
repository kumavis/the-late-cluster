# Fit: music-alt ("Best We Can Doo-Wop"), the closing song with the take C lead

## For the owner

- Nothing kept is heard as crude, alarming or out of bounds (fit exit 0, `owner` empty). I declined two
  candidates the tool scored higher. `someone, built, a cat that sings` had one take heard "Some love is
  a cat let's eat". An earlier take of the plain line was heard "be hookers". The kept spelling,
  `someone, built a cat that sings`, is heard as "Some long paper cut let's see", "Some love is her cat
  that she loves" and "Someone pinch her cat let sing". Re-running the tool will propose the comma after
  "built" again. Don't `--apply` it.
- The sung name: "Samantha showed a morning mug" is heard as "Sherman's a folder morning mug", "I'm at the
  folder morning mark/muck" and "To mess up for the morning months". No spelling keeps the name's sounds:
  every one tried (`Suh-man-tha`, `Sa-mann-tha`, `Suh-mantha`, `Sammantha`, `Samanntha`, `Suh-man-thuh`)
  changes the final /ə/ or adds an h. With a comma after the name it did no better, so it is sung as
  written. The lyric on screen carries it. It is listed below.
- On its own, "wop" is also an ethnic slur in standard dictionaries. The script uses it alone twice, sung
  (Dee's answer and the lift's hit), and on the WOP card. It was never transcribed as the word, so the
  tool cannot flag it. It is the writer's word and I left it. The decision is yours.
- One heard text in hook-3 is Whisper's stock hallucination, "Thanks for watching, and I'll see you in
  the next video!". It is harmless, but you will see it in fit.json.

## Length

77.77 s rendered (the limit is 80 s). The long applause after "Good night, everybody." ends at 77.17 s.
The blocks are unchanged: doo-wop 33.5 beats, vamp 4, lift 10.5, tag 0.85, all at 66 bpm.

## The lead (take C, chosen by the owner)

- **Who:** every part Hy sang (the opening "doo", the seven lines of the song, the lift's "wop" hit and
  both lift hooks) is now `who: 'hy-bass'` (`sing: 'hy-bass'` for the opening "doo"), with
  `transpose: -12`. The writer's notes are unchanged. Hy's two spoken lines stay `hy`, in Hy's own
  voice. Al, Dee, Larry and Pete are exactly as written.
- **The voice:** one entry in `episodes/002-2026-w47/cast.js`, `'hy-bass'`. It is Al's voice without his
  fry: `body { female: 0, child: 0 }`, `f0: 84`, `rate: 0.95`, `accent: 0.14`,
  `source { tension: 0.45 }`, `pan: -0.5` (Hy's pan). It also carries `name: 'Hy Oid'` and
  `title: 'Bandleader, The Formants'`, so the caption and lyric display read Hy.
- **Whose puppet:** the studio has no per-line voice. A line's voice and the puppet its telemetry drives
  are both its cast id (`show.js` `_buildSpans`: `this._puppet(l.who)`). So the lead's telemetry drives
  the puppet `hy-bass`, not `hy`. To have the owner see Hy sing, the builder has two choices:
  - Stage `hy-bass` as Hy: place it at Hy's mark with `look: 'hy'`, while Hy's puppet is not drawn there.
    Hy speaks at 45.26 s and 51.88 s, and the lead sings from 9.85 s to 10.76 s and from 17.98 s to 62.95 s.
  - Add a studio alias, so that a cast entry can name the puppet it drives (for example `puppet: 'hy'`).
    Then `hy-bass` could drive Hy's own mouth. That is a builder's change to `packages/show`, not mine.
- The fit's voices row puts `hy-bass` 0.83 from Al. That is expected: it is his voice without fry, and it
  never speaks. Voice research records its words under `guest`, because the file only knows house ids.

## Pitch, measured

The lead is written 52–59 (E3–B3). Measured, every note is at its written pitch: worst 0.30 semitone
(one note in hook-3), mean within 0.06. The opening "doo" (G3) reads an octave low on autocorrelation, but a
spectrum check shows no energy at the octave below. It is a detector tie, not the voice. Al is 41–50,
worst 0.43 semitone on a short note, mean −0.11, his own line unchanged. Dee is 69–74, worst 0.24. Larry
is 50, measured 49.99.

Larry's note and the chord built on it are as written. His "doo" is D3 (49.99). The band's next sound is
the A7 hit (Al A2, the lead G3, Dee C♯5). It resolves half a beat later to D, built on his note: Al D3,
Larry D3, lead A3, Dee D5. The last chord is D with Al and Larry on D3 at the bottom, the lead on F♯3
and Dee on D5. Every note is inside its singer's range: Hy's lead voice 52–59 (measured), Al 41–50,
Dee 69–74, Larry 50.

## What I changed this time

- The lead, as above (`who`, `transpose`). The `hy-bass` cast entry.
- `coffee` ("someone built a simulator"): as written. No spelling beat it.
- `mug` ("Samantha showed a morning mug"): as written (above).
- `mug-too` ("simulator has it too"): `simulator has it, too`.
- `wheelie`: `loader popping wheelies, too` (the octave change altered what was heard).
- `cat`: `someone, built a cat that sings`, kept (above).
- `hook-3`: `best you can, do-wop, doo-wop`. `hook-4`: back to plain. Its `as` would have been identical
  to the lyric.
- `happy-week` ("Happy polyhedra week."): `Happy polly-hee-dra week.`, a spelling already recorded as
  working for Larry. It is heard "Happy party heat dry week!" ×2 (2/3 in every take). The tool's
  `Happy, polyhedra week.` scores the same ("Happy Pola after a week!") but puts a pause in a toast.
- `goodnight` ("Good night, everybody."): as written, 3/3 in every take.
- Kept from before: `posted` rate 0.9, `four-words` `best eye can do …`, the vamp `wait` −3.6,
  `only-host` rate 0.9, `button` `I, do what I cann.`.
- `--sounds`: no dictionary word sounds different. `polly-hee-dra` is a guess (polyhedra is not in the
  dictionary).

## "doo" and "wop", as heard

- **doo**, sung by Hy's bass voice: "Doo!" ×4. Larry: "Do" ×4 (the same sound).
- **wop**: never transcribed. Dee: "Clap!", "Flap!", "Slap!". The hit, in the bass voice: "Clap",
  "Clap and...", "Love you.". In "do-wop": "up", "laps", "do it".

## Heard differently, caption exact

- `mug` (a real person's name, sung): "Samantha" heard "Sherman's", "I'm at the", "To mess up". The caption
  and lyric display carry it.
- No real person's spoken words are heard differently. Dave's "best i can do" is heard exactly.
- House and lyric lines, best effort: `posted` "calf" for "coffee" · `only-host` "hoped" · `work-with` "with it"
  · `happy-week` "party heat dry" · `coffee` "Some long means for simulators" · `mug-too` "See me later,
  as it goes", "simulator has it to" · `wheelie` "Order popping, we need to…" · the hooks "do up to up".

## Voice research

`simulator` was recorded as unstable when sung. Already on file: `wop` (cannot), `host` (unstable), and
the patterns "A sung scat syllable" and "A sung lead line over a four-voice block".
`npm run voice-research -- 002-2026-w47 --draft music-alt` exits 0.
