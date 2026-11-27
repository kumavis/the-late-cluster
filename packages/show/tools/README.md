# The Late Cluster: offline audio tools

Every sound in the show comes from CHIMERA, a physical-modelling voice synth (`chimera/wasm`):
speech, singing, beatbox, audience laughter and applause. Nothing is sampled. The audio is
rendered offline by these tools. Each segment ships as one mixed mp3 plus compact telemetry
that the page replays on the 3D heads.

Every command runs from the repo root and takes an episode first: `<ep>` is `1`, `001`,
the full id (`001-<slug>`), or `ref` for the studio's reference episode (`packages/show/reference/`, where the
`demo` segment below lives). Paths are resolved by one resolver (`scripts/lib/episodes.mjs`).

```sh
npm run render -- ref demo            # render one segment (or several ids, or --all)
npm run render -- --warm              # once per checkout: pre-render every sfx and creature call (about 80 s cold)
npm run render -- ref demo --whisper  # render, then check every captioned line is intelligible
npm run check -- ref demo             # verify the three outputs against the contract (no ids: the whole rundown)
npm run fit -- <ep> <seg> [--json] [--apply]          # fit a segment's lines to the engine (below: "Fitting a script")
npm run fit -- <ep> --draft <slug> [--json] [--apply] # the same for a draft in production/drafts/
npm run fit -- <ep> --draft <slug> --sounds           # no rendering: every `as` that changes a dictionary word's sounds
npm run render -- <ep> --draft <slug>  # render a draft into the studio's scratch (check and analyze whisper take --draft too)
npm run voices -- <ep> [--drafts]      # give every guest a voice distinct from the house and each other
bun packages/show/tools/analyze.ts whisper ref demo   # just the intelligibility check on the last render
bun packages/show/tools/analyze.ts mp3 ref demo       # loudness/brightness per 5 s of a rendered segment
bun packages/show/tools/analyze.ts sfx [names]        # stats for the audience/band library
bun packages/show/tools/analyze.ts voices [--ep <ep>] [ids]   # each cast voice saying two test sentences (--wav dir --whisper)
```

Exit codes, for scripts and the weekly pipeline: 0 success, 1 a render or check failed, 2 bad
arguments, an unknown episode or an unknown segment (printed as `error: …`).

**Where the outputs go.** A render writes `episodes/<ep>/public/audio/<id>.mp3` and
`episodes/<ep>/public/tele/<id>.bin` (gitignored) and `episodes/<ep>/segments/<id>/cues.json`
(committed). The audio and telemetry are committed once, in the episode's build
(`dist/episodes/<ep>/`), so `check`, `analyze`, `video` and the dev server read them from
`public/` when there is a fresh render and fall back to the build otherwise: a clean checkout
can check and play any published episode without re-rendering. After a re-render, rebuild
(`npm run build -- <ep>`) before committing, or the committed `cues.json` and the committed
audio disagree (`npm run verify` catches it). The reference episode keeps its rendered files
in `packages/show/reference/public/`, committed, and is never built.

Every clip render (a line, a sung phrase, a beat, a crowd voice) is cached on disk in
`packages/show/tools/.cache/` (gitignored), shared by every episode: the key is the content,
not the episode. The cache key is everything that shapes the sound. Edit one line
and only that line re-renders: a cached segment re-mixes in about a second. A cold render
runs at roughly 4× real time, so a 45 s segment takes about 20 s. To drop every cached render,
bump `CACHE_VERSION` in `clips.ts`.

**Several renders at once.** A render takes a lock on its episode and segment
(`tools/.cache/locks/<ep>--<id>.lock`), so a second render of the same segment stops with a
message. Renders of different segments run in parallel safely:
- They write disjoint files (`public/audio/<id>.mp3`, `public/tele/<id>.bin`,
  `segments/<id>/cues.json` in their episode), each through a temp file and an atomic rename.
- They share `tools/.cache`. Cache entries are also written through a unique temp file and a
  rename.
- A truncated or corrupt entry is detected and re-rendered.

Run `--warm` once after a fresh checkout, or after bumping `CACHE_VERSION`, so the crowd, the
band stings and the creatures are rendered once rather than by every author. These were
tested by running two `--warm`s and the demo render concurrently on a cold cache: no temp
files were left behind, the entries were byte-identical to a serial run, and a concurrent
second `demo` render was refused.

| file | what it does |
|---|---|
| `engine.ts` | loads the wasm under bun, does G2P (CMUdict), and provides `Voice` (one engine instance per voice; `renderTracked` snapshots telemetry every 1536 samples) |
| `clips.ts` | cached clip renderers: `sayClip`, `singClip`, `beatClip`, `hitClip`, `vocalClip` (explicit segments + pitch contour, used for crowd noises), `creatureClip` (bestiary calls or gated, pitch-glided notes) |
| `sfx.ts` | the audience and band library (below) |
| `render.ts` | script → timeline → mix → `public/audio/<id>.mp3`, `public/tele/<id>.bin`, `segments/<id>/cues.json` (in the episode) |
| `telebin.ts` | the tele bin encoder/decoder |
| `check.ts`, `analyze.ts` | verification (`analyze.ts` also measures voices: `measureVoice`) |
| `fit.ts` | the fitting tool (`npm run fit`): render, transcribe, search for respellings, report, `--apply` |
| `voices.ts` | guest voices (`npm run voices`): measure, assign, write the cast entries |
| `heard.mjs`, `respell.mjs`, `source-edit.mjs`, `voices-lib.mjs`, `draft.mjs`, `tuning.mjs` | the pure parts, tested with Node builtins (`packages/show/test/`): scoring, flags and statuses; candidate respellings; exact edits to a script or cast file; voice distance and assignment; a draft's paths; sung pitch with fry |
| `whisper-worker.py` | a Whisper that stays loaded, for `fit` (run with the Python of the `whisper` command) |
| `data/heard-terms.json` | the fitting tool's own word lists for what was heard (crude words; words that change a statement about a real person), beside the pipeline's |
| `episode.mjs` | `<ep>` → paths (through `scripts/lib/episodes.mjs`), and the episode's own `cast.js` / `looks.js` merged over the house cast |
| `shoot.mjs`, `video.mjs` | frozen frames and mp4s, through a Vite dev server for the episode |

---

## Writing a segment script

A segment is `episodes/<ep>/segments/<id>/script.js`. It holds a default export of plain data
and no code. `<id>` must match the directory name. Render it with `npm run render -- <ep> <id>`. The tool prints
a timeline: every line's start and end time, its duration and the IPA that was actually
pronounced. Read it. A mangled name shows up in the IPA right away.

### Complete example

```js
// packages/show/reference/segments/demo/script.js
export default {
  id: 'demo',
  title: 'Demo: Cold Open',
  gap: 0.28,                       // default pause before each spoken/sung line (s)
  beats: [
    { sfx: 'applause-long', hold: 0.18 },               // start with an ovation; talk over its tail

    // say: who (a cast id: packages/show/src/cast.js, or the episode's own cast.js) + text (the caption)
    { say: 'larry', id: 'hello', text: 'Good evening, Bluesky! Welcome to The Late Cluster.',
      as: 'Good evening, blue-sky! Welcome to the late cluster.' },   // `as`: what is pronounced
    { say: 'larry', text: "I'm your host, Larry Nx.", as: "I'm your host, Larry En-Ex." },
    { say: 'sibyl', id: 'interrupt', text: 'Larry, the simcluster is trending again.', overlap: 0.35 },
    { say: 'larry', text: "Again? It's been trending since Tuesday!" },
    { sfx: 'laugh' },                                    // next laugh variant, at the cursor
    { cue: 'chart-in', at: -0.2 },                       // a named visual marker
    { say: 'sibyl', text: 'Your feed says you are ninety percent posting, and ten percent vibes.',
      rate: 1.05, f0: 205, accent: 0.3, intonation: 'statement', vol: 1.0, pan: -0.2 },
    { say: 'larry', text: 'Finally, an algorithm that understands me.' },
    { sfx: 'rimshot', at: 0.1 },
    { sfx: 'chuckle', at: -0.4, hold: 0 },               // overlaps the rimshot, doesn't move the cursor
    { call: 'seal', name: 'zap', at: -0.2, hold: 0, vol: 0.7 },   // a creature call as a punchline
    { wait: 0.3 },

    // sing: one lyric syllable per sounding note; notes are [midi, beats], midi <= 0 is a rest
    { sing: 'larry', id: 'ditty', bpm: 112, lyrics: 'sim cluster, sim cluster, what is in my feed',
      notes: [[52,.5],[55,.5],[57,1],[52,.5],[55,.5],[57,1],[59,.5],[57,.5],[55,.5],[52,.5],[50,1.5]] },
    { sfx: 'aww', at: 0.1 },
    { say: 'larry', text: 'Hit it, Formants!' },

    // music: tracks share one clock. Beat 0 is the block's t0 for every track.
    { music: { id: 'stomp', bpm: 100, tracks: [
      { who: 'larry', id: 'stomp-lead', caption: true,
        lyrics: "we post into the void, and the void posts back",
        notes: [[45,.5],[48,.5],[48,.5],[50,.5],[52,.5],[52,.5],[0,1],
                [52,.5],[50,.5],[48,.5],[50,.5],[45,1],[0,1]] },
      { who: 'pete', beat: 'B . . . | ! . . . ', loops: 4, vol: 0.9 },           // stomp / clap
      { who: ['hy', 'al', 'dee'], shout: 'hey', beats: [3, 7], vol: 0.9 },       // on beats 3 and 7
    ] } },
    { sfx: 'sting', at: 0.05 },
    { sfx: 'applause', at: -0.4, hold: 0.2 },
    { say: 'sibyl', text: 'Stay clustered. We will be right back!', gap: 0.1 },
  ],
}
```

### Beat kinds

A cursor walks the beats in order. It starts 0.3 s into the segment.

**`say`**: a spoken line.

| key | meaning |
|---|---|
| `say` | cast id (required) |
| `text` | the caption shown on screen (required) |
| `as` | what is actually pronounced (a respelling). The caption stays `text`. Give `as` the **same number of space-separated words** as `text` so word timings map back onto the caption words, and join multi-word respellings with hyphens (`blue-sky`, `En-Ex`). Otherwise caption words are spread evenly over the line, and the tool prints a note. |
| `id` | optional line id (unique within the segment), copied to cues.json |
| `gap` | pause before the line (s). Defaults to the script's `gap`, and to 0 for the first line. |
| `overlap` | start this much earlier, over the previous line (an interruption) |
| `rate`, `f0`, `accent` | per-line overrides of the cast voice. `rate` multiplies the cast rate. |
| `intonation` | `statement` \| `question` \| `flat`: overrides the punctuation-derived contour of every phrase in the line |
| `vol` | gain multiplier (default 1) |
| `pan` | −1..1 (default: the cast member's pan) |
| `caption` | `false` to hide the caption |

The line starts at `cursor + gap − overlap`. The cursor then moves to where the speech ends
(the clip's silent tail is ignored).

**`sing`**: a sung phrase by one voice. Keys: `sing` (cast id), `bpm`, `lyrics`, `notes`
(`[[midi, beats], …]`; `midi <= 0` is a rest), plus optional `id`, `gap`, `overlap`, `vibrato`
(cents, default 30), `transpose` (semitones), `vol`, `pan`, `caption`, `text` (a caption
that differs from the lyrics) and `as` (what is sung, when the lyrics need a respelling: it must
split into as many syllables as there are sounding notes; the caption stays `text` or `lyrics`). It is laid out like `say`. The line ends with the last sung note.

**`sfx`**: an audience or band sound from the library below. `{ sfx: 'laugh' }` picks the next
variant round-robin. `{ sfx: 'laugh-2' }` picks variant 2. The sound starts at `cursor + at`, and
`at` may be negative. Optional `pan` (a balance shift, −1..1) and `duck` (0..1, below). The cursor then advances by `hold × (sound length)`. `hold` runs 0..1 and
defaults per sfx (about 0.3–0.55 for crowd sounds, 1 for rimshot and sting). `hold: 0` lays a
sound under what follows without waiting. `vol` scales it. While anyone says a line or sings a
captioned line, sfx automatically duck by about 9 dB, so dialogue reads through laughs and
applause.

Every sfx has a duck depth. Crowd sounds duck fully. Studio one-shots (ding, buzzer, tick, tada,
drumroll) duck partly, and creature calls barely duck (they are punchlines and should cut
through). `duck: 0..1` on the beat overrides it. `pan: −1..1` on an sfx beat is a balance shift.

**`call`**: a specific creature call, used as a punchline:
`{ call: 'seal', name: 'zap', pitch: 4000, vol: 0.8, pan: 0.3, at: -0.1, hold: 0.5, duck: 0.15 }`.
`call` is a creature id and `name` is one of its call ids (default: the creature's first call).
`pitch` (Hz) re-pitches calls that have a reference pitch. It works on every call except the
alligator's `hiss` and the elephant's `trumpet` and `squeak`, which ignore it. It is laid out
like an sfx: `at`, `hold` (default 0.8), `vol`, `pan`, `duck` (default 0.15). In cues.json it
appears under `sfx` as `call:seal/zap`. The ready-made creature sfx below (`caw`, `cluck`,
`seal`, `gator`, `trumpet`) are tuned designs and are usually what you want.

| creature | calls (id: length, reference pitch) |
|---|---|
| `songbird` | `flute` 1.3 s 2600 Hz · `trill` 1.2 s 3000 Hz · `chirps` 0.7 s 4500 Hz · `buzz` 0.7 s 1200 Hz |
| `seal` (Weddell) | `trill` 3.8 s 3600 Hz (a long descending sci-fi trill) · `zap` 0.2 s 6000 Hz (laser chirp) · `whistle` 0.8 s 1700 Hz · `chug` 0.9 s 90 Hz (quiet) |
| `alligator` | `bellow` 2.0 s 28 Hz · `growl` 0.6 s 45 Hz · `hiss` 1.4 s · `dance` 1.8 s 18 Hz |
| `elephant` | `rumble` 3.2 s 14 Hz · `trumpet` 1.3 s · `squeak` 0.6 s |

**`wait`**: `{ wait: 0.6 }` moves the cursor that many seconds. Negative values are allowed.

**`cue`**: `{ cue: 'chart-in', at: -0.2 }` names a moment for the page (cursor + `at`).
Names must be unique.

**`music`**: `{ music: { id, bpm, tracks: [...], gap?, swing? } }`. Beat 0 falls `gap` (default
0.25 s) after the cursor. Every track counts beats (quarter notes, 0-based) from that one
sample, so melodies, beatbox and shouts are sample-aligned. The cursor moves to the end of the
longest track. Each track has exactly one of:

| track kind | keys |
|---|---|
| sung melody | `who`, `lyrics`, `notes`, optional `caption` (default **false** in music; set `true` for the lead), `vibrato`, `transpose`, `id`, `as` (a respelling of the lyrics, as on `sing`) |
| beatbox | `who`, `beat` (CHIMERA beat text, below), `loops` (default 1), `swing` (0..0.5) |
| shouts | `who`, `shout` (text), `beats: [3, 7, 11, 15]` (the shout's first vowel lands on each beat), optional `as`, `f0` (default 1.3 × the cast f0; shouted with the shout patch, below) |

All tracks also take `vol`, `pan` and `start` (a beat offset for the whole track). `who` may be
an array: each member renders separately with their own voice and pan.

Beat text: steps are sixteenths, `.` is a rest, and `|` is only visual. Sounds: `B` kick, `t`
hat, `tss` open hat, `Pf` snare, `K` rimshot, `^K` inward snare, `!` tongue click (a clap),
`P!` lip pop, `kch` crash, `m` hum (`m:43` hums MIDI 43). So `B . . . | ! . . .` is two beats
of stomp, clap. Loop it 8 times for four bars of 4/4.

### Validation

The renderer stops with a pointed message when the script has:
- an unknown cast id (it lists the cast), an unknown sfx (it lists the library), or an unknown key on a beat;
- a syllable/note mismatch (it prints the syllables it found, e.g. `sim- clus- ter what is …`);
- a bad note (`[midi, beats]`, MIDI 28..96), a beat pattern with no sounds, or a duplicate cue or line id;
- a number out of range (rate 0.5–2, f0 50–500, pan −1..1, …).

---

## Outputs (the contract with the page)

Paths are relative to the episode folder; the page fetches the mp3 and telemetry by the
relative paths in `cues.json` (`audio/<id>.mp3`, `tele/<id>.bin`), which is why a build works
under any base path.

1. **`public/audio/<id>.mp3`**: stereo, 48 kHz, libmp3lame 96 kbps. 0.3 s of lead-in, about
   0.6 s after the last sound. Equal-power pan, then a 10 Hz DC guard.
   - **Loudness:** the whole mix gets one gain so that the dialogue (all `say` lines, gated
     BS.1770 loudness) sits at **−17 LUFS** in every segment. Back-to-back segments then match
     in speech level, and music and sfx keep their balance against the dialogue.
   - **Limiter:** a look-ahead limiter on the **4×-oversampled true peak**, with a −1.5 dBTP
     ceiling (`tools/loudness.ts`).
   - **Decoded-peak check:** the mp3 is encoded, decoded and measured, and the whole mix is
     trimmed and re-encoded if the decoded peak is above 0.97 (mp3 adds its own overshoot).
   - The render prints the integrated loudness, the dialogue gain and the decoded peak.
2. **`public/tele/<id>.bin`**: gzip of `LCT1` + u32 LE jsonLen + a JSON header (space-padded
   to a multiple of 4) + a data area. Header:
   `{ fs:48000, hop:1536, scalars:[phLen, orLen, velumPort, f0, voicing, pLung, outRms, noiseLevel, noiseNode, gate], nArtic:17, scope:8, blocks:[{frames, channels, nPh, nOr, body:{female,child}, offset}] }`.
   A block is `Float32LE[channels×2]` (min, step) followed by `Uint16LE[channels×frames]`,
   channel-major. Each channel is delta-coded mod 65536, with the first value absolute. Each
   block is padded to 4 bytes. Channels per frame: 10 scalars, 17 artic, phAreas(nPh),
   orAreas(nOr), pressureRms(nPh+nOr), flow(nPh+nOr), 8 glottal-area points. Lines that reuse
   the same clip (repeated shouts) share a block.
3. **`segments/<id>/cues.json`**: `{ id, title, duration, audio, tele, lines, cues, sfx, music }`.
   Each line is `{ i, id?, who, kind: say|sing|beat|shout, text, caption, t0, t1, words: [[t0,t1,word]…], tele, teleT0 }`.
   All times are segment seconds (the mp3's clock), rounded to ms. Frame *k* of block `tele`
   is at `teleT0 + k·hop/fs`. `sfx` entries are `{ name: 'laugh-1', t0, t1 }`, and `music`
   entries are `{ id, t0, bpm, beats }`.

`npm run check -- <ep> <id>` re-reads all three outputs and checks them against this contract.

---

## The audience and the band (`sfx.ts`)

All sfx are made from CHIMERA voices, seeded so they come out the same on every render. The
crowd sits in a small synthetic room (a Schroeder reverb) and is mixed well under dialogue
level.

| name | variants | length | made of |
|---|---|---|---|
| `laugh` | 3 | ~1.6 s | 12 crowd voices (random body, pitch, rate, breathiness), each 3–6 "h+vowel" pulses falling in pitch, staggered and panned wide |
| `biglaugh` | 2 | ~2.0–2.5 s | 22 voices with longer laughs, plus two woos |
| `chuckle` | 2 | ~1.0 s | 3–4 soft, breathy "heh heh" voices |
| `groan` | 2 | ~1.7 s | 9 voices holding "oh", pitch falling to about 70 % |
| `ooh` | 2 | ~1.6 s | 9 voices on "ooh", rising about 40 % then settling |
| `aww` | 2 | ~1.5 s | 9 voices on "ah", high and falling |
| `woo` | 2 | ~1.35 s | 3 rising "woo"s |
| `applause` | 2 | ~3.3 s | ~450 tongue clicks, hats, snares and lip pops from 4 bodies, high-passed and cut short like claps, with random gain, pan and pitch, plus a swell-and-decay density envelope |
| `applause-long` | 1 | ~5.8 s | the same, longer, with three woos |
| `rimshot` | 1 | ~1.6 s | Pete: snare, kick, crash (ba-dum-tss) |
| `sting` | 2 | ~2.1 s | the Formants (Dee, Hy, Al) scat a four-note figure in three-part harmony, with Pete on kick and crash |

Studio one-shots, all from mouths:

| name | variants | length | made of |
|---|---|---|---|
| `ding` | 2 | ~0.8 s | game-show correct: two bright voices sing "ding" a sixth apart (MIDI 84+76; v2 81+72), with a bell-like exponential decay on the ŋ hum. Centroid 2.5–3.5 kHz |
| `buzzer` | 2 | ~0.9 / 0.7 s | wrong answer: two pressed, rough, saturated voices a tritone apart (92 and 130 Hz) on a flat "ehhh" |
| `tick` | 3 | 0.05 s | one clock tick: a tongue click (male or female body) or a rimshot click, high-passed |
| `ticktock` | 1 | ~2.6 s | six alternating tick/tock clicks at 2 per second |
| `whoosh` | 2 | ~0.6 / 0.75 s | voiceless ʃ, f and h layered, swelling and swept left→right (v2 right→left). Centroid about 6.7 kHz |
| `tada` | 2 | ~1.15 s | Dee, Hy and Al sing "ta-dah!" (pickup into a held major chord) |
| `drumroll` | 2 | ~2 s | Pete's snare re-struck 16 times a second with a crescendo, then crash + kick (v2 alternates snare and hat) |
| `gasp` | 2 | ~0.8 s | 12 crowd voices at once: a breathy "hah!" (v1) or "oh!" (v2), pitch jumping up |
| `hey` | 2 | ~0.7 s | 12 crowd voices shout HEY! together |
| `murmur` | 2 | ~2.9–3 s | 14 crowd voices chatting quietly, low-passed so no words come through. A bed: `hold` 0.2 by default |
| `silence-cough` | 1 | ~1 s | one lonely "ahem" from the back right |

Creature punchlines (barely ducked):

| name | variants | length | made of |
|---|---|---|---|
| `caw` | 2 | ~1.0 / 0.6 s | crow-ish: the songbird overdriven, low purity, pitched down to 900→600 Hz with a falling glide. v1 is "caw caw", v2 a single caw |
| `cluck` | 2 | ~1.1 / 0.75 s | the songbird short and low (~600 Hz): v1 "buk buk buk-BAAK", v2 four clucks |
| `seal` | 2 | ~0.9 / 1.1 s | the Weddell seal pulsed at 20–25 Hz around 300 Hz: two (v2: three) barks |
| `gator` | 2 | ~0.8 / 2.1 s | the alligator's `growl` (v1) or `bellow` (v2) |
| `trumpet` | 2 | ~1.3 / 1.65 s | the elephant's `trumpet`, its opening spike soft-clipped. v2 is resampled 0.8× (lower and longer), because the call ignores `pitch` |

To add one, write a maker in `SFX` (see `laughMix`, `glideMix` and `applauseMix`), then run
`bun packages/show/tools/analyze.ts sfx <name> --wav /tmp/x` and look at the numbers. Applause should show a
centroid around 4 kHz with 0 % voiced. Laughs show a few hundred Hz with partial voicing. Every
sound needs a plausible envelope sparkline with no NaN or DC.

---

## Voice design

**Where cast entries live.** `packages/show/src/cast.js` is the house cast: Larry, Sibyl, Hy Oid
& The Formants, and Eppy. A guest, or a bot, goes in
the episode's own `episodes/<ep>/cast.js` (and its look in `episodes/<ep>/looks.js`), and moves
into the studio only when a second episode needs them. Both files are optional and are merged
over the studio's entries by one resolver (`src/roster.js`) that the renderer, the checker, the
analyzer and the page all use, so an episode can also override a house entry (a whole entry: the
merge replaces it, it does not patch fields). (`src/legacy/` holds the first episode's cast, its
guests and its website bot, only so that episode still builds; the resolver merges it for
`001-pilot` and for no other episode.)

```js
// episodes/<ep>/cast.js
export const CAST = {
  zed: { name: 'Zed', handle: '@zed.example', title: 'One-off guest', guest: true, body: { female: 0.3, child: 0 }, f0: 140, rate: 1.0, accent: 0.2, source: { breathiness: 0.2 }, pan: -0.3 },
}
// episodes/<ep>/looks.js: each entry goes through defineLook (see packages/show/README.md)
export const LOOKS = {
  zed: { color: '#ff5c5c', costume: { kind: 'labcoat', color: '#ff5c5c' } },
}
```

A writer's draft gives a guest no voice settings, only `{ name, handle, title, guest: true }`: a
sound editor places the voice with `npm run voices` ("Giving guests voices"), which writes `body`,
`f0` and `source` into the entry. A cast entry sets `body`, `f0`, `rate`, `accent`, `source` and `pan`. The numbers
below come from a sweep: one sentence per setting, checked for NaN, level, voicing and a Whisper
(base.en) transcription. No setting produced NaN or silence. The failure modes are saturation
and lost intelligibility. Every clip is peak-normalized afterwards, so loudness is not a voice
parameter: use `vol` in the script for that.

| param | what it does | safe | breaks |
|---|---|---|---|
| `body.female` | anatomy from adult male (0) to adult female (1). It sets formants and vocal-tract length, and it shapes the 3D head | 0–1 | — |
| `body.child` | adult (0) to child (1): a smaller tract | 0–0.4 | ≥ 0.5 loses intelligibility quickly (Whisper got 1–2 of 8 words at child 1) |
| `f0` | speaking pitch, Hz | men 85–150, women 165–260 | < 85: voicing falls apart (creaky and unvoiced). > 280: the engine output saturates (it pins at 0.75 raw) and words smear |
| `rate` | speaking-rate multiplier | 0.8–1.3 | 1.6 smears, 2.0 is unintelligible |
| `accent` | pitch excursion on stressed syllables | 0.1–0.4 (0 is flat and robotic, 0.3+ is animated) | 1.0 saturates |
| `source.breathiness` | aspiration noise | 0–0.5 | 1.0 is nearly a whisper (−7 dB, noisy) but still intelligible |
| `source.tension` | vocal-fold tension: pressed and bright vs lax and soft | 0.3–0.7 (default 0.5) | 1.0 saturates |
| `source.fry` | creak, vocal fry | 0–0.2 | 0.5 cuts voicing to about 30 % and hurts intelligibility |
| `source.roughness` | cycle-to-cycle irregularity, rasp | 0–0.6 | subtle even at 1 |
| `source.brightness` | spectral tilt (default 0.25) | 0–0.6 | 1.0 saturates |
| `source.pressure` | lung pressure, i.e. effort (default 8) | 6–10 | ≥ 11 saturates |
| `source.drift` | slow pitch wander, cents | 0–60 | harmless |
| `vibratoDepth/Rate`, `glide` | no audible effect on speech (the planner drives pitch). Sung lines use `vibrato` | — | — |

**Shouts** (music `shout` tracks and the `hey` sfx) use a shout source patch: pressure 11.5,
tension 0.8, brightness 0.55, breathiness 0.1. They are pitched to 1.3× the cast f0 with accent
0.45. Compared with a plain spoken "hey", the shouted one has a spectral centroid 3–4× higher
(hy 470 → 1760 Hz, dee 580 → 2450 Hz) and a 5 ms attack instead of 20–90 ms. The patch saturates
on purpose: a harsh shout is the goal.

"Saturates" means the raw output hits the engine's ceiling and the waveform squares off: a
harsher timbre, not a level problem. `bun packages/show/tools/analyze.ts voices` renders each cast voice so
you can check a new entry.

**Making a new guest distinct.** Put the guest somewhere empty in (body, f0) space first. These
two carry most of a voice's identity. `bun packages/show/tools/analyze.ts voices` prints each voice's median
f0, its spectral centroid and its three nearest neighbours. Distance combines pitch (semitones
÷ 2) and the long-term average spectrum (rms dB difference ÷ 2.5). Below about 1.5, two voices
are easy to confuse. Among the house voices every nearest neighbour is at least 1.5 away. The
house cast as tuned (median f0 is measured, so accent raises it above the set f0; `nearest` is
among these seven, from `analyze.ts voices larry sibyl hy al dee pete eppy`):

| id | role | body f/c | f0 (median) | rate | accent | source | nearest |
|---|---|---|---|---|---|---|---|
| al | bass | 0 / 0 | 84 (79) | 0.95 | 0.14 | tension 0.45, fry 0.2 (gravel) | larry 2.85 |
| larry | host | 0 / 0 | 104 (107) | 1.0 | 0.16 | breath 0.12, tension 0.5 | pete 1.54 |
| pete | percussion | 0.65 / 0.4 | 115 (119) | 1.05 | 0.18 | tension 0.55, bright 0.4 | larry 1.54 |
| hy | bandleader | 0.35 / 0 | 135 (143) | 0.95 | 0.2 | breath 0.3, tension 0.42, bright 0.12 (warm) | dee 1.79 |
| dee | alto | 0.9 / 0.1 | 155 (159) | 1.0 | 0.18 | breath 0.18, tension 0.45, bright 0.25 | hy 1.79 |
| eppy | shouty sports | 0.15 / 0.2 | 165 (189) | 1.16 | 0.36 | tension 0.68, bright 0.55 | sibyl 2.07 |
| sibyl | announcer | 1 / 0 | 196 (207) | 1.04 | 0.2 | breath 0.2 | eppy 2.07 |

Rate and accent separate voices too: the table's distance doesn't measure them, so two voices
at nearly the same pitch can still sound very different if one is faster or more animated.

Whisper (base.en) on the two test sentences: every voice gets "Good evening, and welcome back
to the show." 8/8. The harder "…the feed knows what I had for breakfast?" scores 7–10 of 13
for every voice, the host included, so that is the G2P and engine rather than any one voice.
Overall scores are 76–86 % per house voice: al 86, hy 81, eppy 81, larry 76, sibyl 76, dee 76,
pete 76.

To add a guest, find an open spot. The gaps are in measured median f0 (what `analyze.ts voices`
prints, the number in brackets above), not the `f0` you set: a typical `accent` (0.15–0.35)
raises the median about 6–12 Hz above the set `f0`, so set `f0` that much lower than the gap.
Among the house voices (medians 79, 107, 119, 143, 159, 189, 207 Hz) the widest open
ranges are roughly 85–100 Hz, 165–180 Hz and everything above 215 Hz (keep the set `f0` under
280, where the engine saturates); an episode's other guests take room
too, so measure them together (`--ep <ep>` and their ids). Then set the attitude: `rate` (0.9
deliberate, 1.2 hurried), `accent` (0.05 robotic, 0.35 excitable), breathiness 0.3+ (intimate),
fry or roughness (croaky), and brightness with tension (brassy). Run
`bun packages/show/tools/analyze.ts voices [--ep <ep>] <id> --wav /tmp/v --whisper`: keep the nearest distance at 1.5 or
more and the Whisper score near the others. Pan guests away from whoever they talk to.

**Respelling with `as`.** Unknown words go through letter-to-sound rules, which are often
wrong. Watch the IPA in the timeline, then check with `--whisper`. Join multi-word respellings
with hyphens so the caption's word timings still map. Watch out: **each hyphen part is G2P'd as
its own word, and function words get their weak form**. `for-mints` comes out /fəɹ/ and `at-proto`
/ət/. Spell those parts so they aren't function words (`four`, `att`). For a word the dictionary
knows, read the IPA of the respelling against the word's: a respelling must keep its vowels and
consonants ("A respelling keeps the word's sounds", below). `showw` was transcribed "show" and is
said /ʃaʊw/, "shao".

These were tested on Larry in "Next up, X, live.", with the IPA and what Whisper heard:

| caption | best `as` | IPA | notes |
|---|---|---|---|
| Bluesky | `blue-sky` | bluskaɪ | as-is gives /blʌɛski/ ("Bloskey") |
| simcluster | `sim-cluster` | sɪmklʌstɚ | the same IPA as-is, but the hyphenated form was the one Whisper got right ("Simcluster") |
| Formants | as-is | fɔɹmənts | Whisper: "formants". Avoid `for-mints` (reduced /fəɹ/) |
| vibecoded | `vibe-coded` | vaɪbkoʊɾɪd | as-is gives /vaɪbɛkoʊdd/ |
| bsky | `bee-sky` | biskaɪ | as-is gives /bski/. Say `blue-sky` if you mean the site |
| gm | `gee-em` (or `good-morning`) | dʒiɛm | the letters are read out anyway. Whisper doesn't parse bare letters |
| gn | `gee-en` (or `good-night`) | dʒiɛn | as-is gives /gn/, which is unpronounceable |
| atproto | `att-pro-toe` | ættpɹoʊtoʊ | as-is gives /ætpɹoʊɾɑ/ ("Ask Prada"). `at-proto` reduces to /ət/ |
| Nx | `En-Ex` | ɛnɛks | as-is gives /nks/ |
| AI | `ay-eye` | eɪaɪ | as-is gives "eye" |
| skeet | as-is | skit | in the dictionary |

**Checking a segment's intelligibility.** `npm run render -- <ep> <id> --whisper` (or
`bun packages/show/tools/analyze.ts whisper <ep> <id>` after a render) cuts every captioned line out of the
*final mix* (0.12 s before to 0.18 s after the line), so whatever is under it counts. Each cut
is padded with 0.6 s of digital silence, because Whisper hallucinates ("Thank you.",
"Cheers!") on sub-second clips that touch the clip edge. All cuts are transcribed in one local
Whisper (base.en) run. It prints caption vs heard per line with a word score: ✓ ≥ 85 %, ~ ≥ 60 %,
✗ below. Digits and % are normalized ("90 %" counts as "ninety percent") and compounds count
("Simcluster" covers "sim cluster"). "build" and "built" count as the same word: before a vowel
the t is flapped and the two are indistinguishable. Whisper doesn't know invented names, so judge those by
the IPA. The demo scores 62/82 caption words (76 %), and the sung music lead is the weakest.
Fix a weak line by respelling it, slowing it down (`rate: 0.9`), giving it more `gap` from a
loud sfx, or lowering the sfx's `vol`.

**Sounds the engine makes weakly, whatever the voice.** These come from a lab pass on every
voice: isolated and in-context renders, several noise levels, Whisper base.en. They are
articulation limits in the engine, and no respelling or voice setting fixed them:
- **/tʃ/ before /ɪ/** ("chicken" → "written", "returned"). The affricate comes out as a noisy
  burst with almost no vowel after it. More than a dozen spellings failed (chick-in, chikkin,
  chih-kin, chiggin, …). The only one Whisper took as "chicken" was `shicken` (2/3), and a person
  would hear "shicken", so it is not used. Caption the word and accept it.
- **/dʒ/** ("joke" → "broke", "drug"). `djoke` (an extra closure) worked 3/3 in one line and
  0/3 in others.
- **Initial /k/ + /l/** ("claim" → "flame", "lame"). Nothing helped, including `klame`, `kleym`
  and pressure 10–11.5.
- **Final /ŋ/ after /p/** ("Pong" → "on", "pun"). Nothing robust.
- **/w/ onsets** sometimes heard as /l/ or /b/ ("week" → "leap", "Even" → "Being").
- **"Acknowledged"** comes out as "ignorate". Dropping the final d (`as: 'Acknowledge.'`) gives
  2/3.
- **"heuristic"**: `hew-ristic` at rate 0.95–1.05 works. At rate 0.8 it doesn't.

Slowing a line down doesn't fix a weak consonant (rate 0.7 was often *worse*). A presence boost
(+4 or +8 dB high shelf at 2 kHz, on all 234 lines) changed Whisper's score by 0.1 %.

**Short lines against sfx.** A two-word line at an effective rate of 0.9 was tested in isolation
(40/40 variants heard right) and against a laugh starting at the line's end (211/240 across
voices and spellings; every failure was a hyphenated spelling of the two words, so don't
hyphenate them). What breaks a short line in a mix is an sfx *under* it: a buzzer or gasp
overlapping the line, or a creature call with its low duck depth. Start sfx 0.15 s after it, or
give them `duck: 1`.

**The Whisper score is noisy.** Unchanged lines change their transcription when anything else
in the mix shifts, even a 1 dB global gain change. Segment totals move ±3–5 % run to run for
that reason alone. Compare individual lines, not segment percentages, and re-check a fix in
the lab (isolated, padded) before believing it.

**How the G2P handles text** (CMUdict plus letter-to-sound):
- Numbers are read out: `2025` → "two thousand twenty five", `90%` → "ninety" (**the % sign is
  dropped**, so write "percent"), `$3.50` → "three fifty" (no "dollars"), `3:30` → "three
  thirty", `2.5` → "two. five". Ordinals break: `1st` → "one street". Write words.
- Abbreviations: `Dr.` → "drive", `AI` → "eye", `LOL` → "lol" (rhymes with "doll"), `e.g.` →
  "e. g." Respell them (`as: 'doctor'`, `'ay-eye'`).
- Handles and URLs: `@jay.bsky.social` → "jay. bsky. social". Each `.` ends a phrase (a 0.35 s
  pause) and `bsky` is mangled. Respell as `jay-dot-blue-sky-dot-social` (one caption word,
  one hyphenated token). `#` and `@` are silent.
- Words the engine says poorly whatever the voice: "feed" (heard as "kid" or "hit"), "had for"
  (heard as "heard through"), "Tuesday" (heard as "two days" or "2D"), and a phrase-final
  "live". If a punchline depends on one of these, rephrase it.
- Hyphenated words are one word (`mm-hmm`, `blue-sky`). Em dashes, quotes and parentheses are
  ignored and add no pause, so use a comma.

**Punctuation shapes prosody.** Each `,` `;` `:` ends a phrase with a short pause (0.18 s).
`.` `!` `...` end one with a longer pause (0.35 s) and a falling statement contour. `?` gives
that phrase a rising question contour, and `?!` counts as a question. The beat's `intonation`
overrides every phrase in the line (`flat` sounds robotic). For a dramatic pause, split the
line into two beats and set `gap`.

**Singing.** Use one syllable per sounding note. The error message prints how the lyrics were
split. Unknown words can become several syllables or a melisma (`~`), so prefer dictionary
spellings (scat: `bah`, `dah`, `doo`, `wah`). Tested so far: Larry
(male) MIDI 45–59, Al 41–52, Hy 64–71, Dee 67–74.

**A written note sounds at its pitch, fry or not.** The engine's `fry` pulls the sounding pitch
toward a creak floor of 48 Hz: with fry *f*, a commanded f0 *F* sounds at (1 − *f*)·*F* + *f*·48
(measured for every body, MIDI 40–64, fry 0.05–0.4). Al's fry of 0.2 made a written MIDI 45 sound at
97.6 Hz, not 110, about two semitones flat, and the first song written for him compensated with
fractional note numbers. Since November 2026 `singClip` commands each note of a voice with fry at
the pitch that sounds as written (`tuning.mjs`), so write the notes you mean and never compensate.
Only sung notes of voices with fry change: speech keeps the pull (the house voices were tuned by
their measured pitch), and every other voice renders exactly as before, from the same cache
entries. The Formants' `sting` and `tada` change with it, because Al sings in them: their bass
notes are now in tune. The first episode's audio lives only in its build and is never re-rendered;
the reference episode's committed render is unchanged until someone re-renders it.

**Intelligibility check** (optional): `bun packages/show/tools/analyze.ts voices --wav /tmp/v --whisper` runs
a local `whisper` if one is installed. In the full demo mix, Whisper base.en recovers nearly
every line, including the sung ones under the band, and the closing line under applause.

---

## Fitting a script (`npm run fit`)

The fitting tool does the render-and-listen loop so nobody does it by hand. It never changes a
line's words, only how they are said: a respelling in `as`, a comma in `as`, and (as a suggestion
it never writes) a slower `rate`.

**Best effort is sufficient** (the owner's ruling of 21 November 2026: "best effort on
pronunciation is sufficient, as subtitles carry the line. document hard to say words in a voice
research file as part of the process."). Captions are on by default and follow every spoken line
with the current word lit, so a viewer always reads the exact words. A line the voice cannot say
well is fitted as well as it can be, its hard word goes into the voice research file
([`docs/voice-research.md`](../../../docs/voice-research.md), below), and the line stays as written.
Nothing goes back to a writer for how a line is heard, and a real person's words are never taken
out of their puppet's voice for it. **The one exception:** something heard that is crude,
alarming or out of bounds (the word lists below) is never accepted. The sound editor chooses
another spelling; if none avoids it, the line is listed first in the fit report, for the owner.

```sh
npm run fit -- <ep> --draft <slug>            # a draft: production/drafts/<slug>/script.js, its cast.js over the episode's
npm run fit -- <ep> <seg>                     # an assembled segment
npm run fit -- <ep> --draft <slug> --json     # also write fit.json beside the script
npm run fit -- <ep> --draft <slug> --apply    # write the chosen respellings into the script's `as` fields
npm run fit -- <ep> <seg> --lines bee,queue   # only these line ids; --takes 2 for a quicker pass; --no-search to only listen
npm run fit -- <ep> --draft <slug> --sounds   # the sounds audit only: no rendering, no Whisper, exit 0 (also <ep> <seg>)
```

What it does, per line (every `say` and every captioned sung line):

1. Lays the script out exactly as `render` does and renders the line in its voice.
2. Cuts it out of the segment's mix, with whatever is under it, four times: as mixed, with the
   bed 3 dB louder and a looser cut, quieter and tighter, and the line alone. These are the
   *takes*. Each is padded with silence and transcribed by Whisper (base.en, beam 5, temperature 0,
   so the same audio always gives the same text).
3. Scores each take as the hearing gate does (words heard of words; digits spelled out; compounds
   count) and flags what was heard: an alarming or out-of-bounds word (the pipeline's lists in
   `packages/writers-room/config/pipeline.json`), a crude word (`data/heard-terms.json`), a real
   person's name in the caption that was not heard (names from the real guests in the cast and the
   accounts in `sources.json`), and, on a real person's line, a negation gained or lost or a loaded
   word heard that is not in the caption ("repost" heard as "report").
4. If any take is under 60 % or anything was flagged, it searches: for the most-missed words,
   respellings from the pronunciation dictionary (one hyphenated part per syllable, function-word
   parts given strong spellings), the tested table and weak sounds above, what fixed that word
   before (remembered in `.cache/fit/learned.json`), and commas that set a word apart or let it
   run on. A respelling must keep the dictionary word's sounds (below): one that does not is
   rejected before it is rendered. Each candidate is screened on two takes; the best three are heard on all four,
   with the best two put together; if nothing passes, the best is tried slower.
5. Keeps the best candidate, in this order: nothing flagged, every take over the gate, the
   median take, the worst take, fewest changes. The line as written wins a tie.

**A respelling keeps the word's sounds.** The transcription is a proxy: it guesses real words
from near sounds, so a spelling can score well and be wrong. `showw` was transcribed "show" in
every take, and the engine says it /ʃ aʊ w/: a listener hears "shao". Best effort must never make
a word sound worse than its plain spelling. So, for a word the pronunciation dictionary knows, a
candidate is acceptable only if its phonemes (the engine's own G2P, `g2p.toPhrases`, the IPA the
renderer prints) keep the word's vowels, in order, and turn no consonant into another. It may:

- double or hold a consonant (`belll`, `hadd`: repeats count once), or put a closure before an
  affricate (`djoke`: d before dʒ);
- add a break between syllables (a hyphen) or a pause (a comma);
- shift stress: any stress of the dictionary's vowel at that place, so a function word may take
  its strong vowel (`onn` for "on", /ən/ → /ɑnn/; `thee` for "the");
- swap a vowel for a near-identical one. In this engine there are two pairs, one dictionary vowel
  unstressed and stressed: ə–ʌ (AH; `uh` for "a", `Frum` for "from") and ɚ–ɝ (ER). Vowels that are
  merely close are not near-identical: ɛ–æ are close in the male body's formants and bet is not
  bat; ɑ–ɔ are one vowel only where cot and caught merge, so `stawk` is "stalk" to everyone else.
  The list is `config/sounds.json` (`nearVowels`, with the allophones the G2P picks by context:
  dark l, the flap for t and d); change it by ear, never because the transcription liked a spelling.

Everything else is rejected before it is rendered (so it also saves renders): another vowel
(`showw` /ʃaʊw/, `shoh` /ʃɑh/, `kah-zoo` /kɑzu/ for /kəzu/), another consonant (`thiss` /θɪss/ for
/ðɪs/: th in a spelling the dictionary does not know is always θ), an added one (`sshow` /sʃoʊ/,
`mathh` /mæθh/, the h of an open `-uh` part: `thuh` is /θʌh/), or one lost. A word the dictionary
does not know (a name, a handle, an invented word, shorthand read as it is meant: `ay-eye` for AI)
has no reference: any spelling is a guess, unconstrained, and its sounds are shown. When no
acceptable candidate beats the plain spelling, the plain spelling stays, and a line may stay
misheard by the transcription: that is the best-effort ruling working as intended.

**A word with two readings** (record, the noun and the verb; read, live, present, …): a respelling
is acceptable if it keeps the sounds of **any** reading the dictionary gives, under the same
allowances. The engine says the plain spelling one way (the verb, /ɹ ə k ɔ ɹ d/, for "record"),
so in a line that means the noun the plain spelling is the wrong one and `rekkerd` (/ɹ ɛ k k ɝ d/,
the noun's /ɹ ɛ k ɚ d/) is right. The committed dictionary keeps one reading per word; the others
are listed in `config/sounds.json` `readings` (ARPAbet), and any alternate line in the dictionary
is used too. `fit.json`'s `sounds` gives the `reading` a spelling keeps when it is not the plain
one; a rejected spelling lists the word's `readings`.

A respelling already in the script (a sound editor's, by hand) goes through the same check every
time the tool runs: a line whose `as` changes a dictionary word's vowels or consonants is listed
under `sounds different from the word`, with both phoneme strings. That list does not block; it is
for the sound editor and the owner. `--sounds` prints only that check, for a draft or a segment,
with no rendering and no Whisper, the guesses apart, and, on a list of its own, every word of the
script with two readings (respelled or not), with the reading the engine gives the plain spelling
and the alternates. That list never blocks: the sound editor knows which reading the line means.

```
sounds 002-commissions-w47 --draft making-of-inward: 11 lines with `as` · 7 words sound different from the word · 4 guesses
sounds different from the word (the word's sounds → the spelling's):
  l2-list (larry) show → showw: /ʃ oʊ/ → /ʃ aʊ w/ (vowel oʊ → aʊ)
  l2-list (larry) on → awn: /ə n/ → /ɔ n/ (vowel ə → ɔ)
guesses (not in the dictionary: no reference, sounds shown only):
  l0-parts (larry) Velum → Vee-lum: /v i l ʌ m/
```

It reads the voice research file (`data/voice-research.json`) for the line's voice (a house id,
or `guest` for any guest): a spelling that has worked for a word in that voice is tried before
anything else (never one marked `misleads`, which is not tried at all), and a word marked `cannot` with no working spelling in that voice is not searched
past its recorded tries (a `cannot` word with none recorded is searched as usual); the row says
`known hard word: <word>`.

The report is one screen per segment:

```
fit 002-2026-w47 --draft made-pen-plotter-replies: 17 lines × 4 takes · ok 16 · weak 0 · flagged 0 · unsayable 1 · 43 s (170 heard, 0 cached)
open          larry    11/12     ok        fix: Samantha → Suh-man-thuh (was 10/12)
eighty-eight  larry    9/10 (7)  ok
meow          sibyl    0/2       unsayable "Malalalalalala Malalalalalala"×2 "Malalalalalalalalalalalalalalalala"×2
bee           larry    17/18     ok        fix: comma before known + should → shood (was 16/18)
voices: larry 107 Hz ~pete 1.54 · sibyl 207 Hz ~mokkenstorm 1.9 · verooo 242 Hz ~mokkenstorm 1.34
```

The score is the median take's words heard, with the worst take in brackets when it differs. A
line heard as something never accepted is listed above the table (`FOR THE OWNER: …`), and every
real person's line still heard differently below it (`heard differently, caption exact:`), so the
owner sees each such line in one place. The statuses describe; they do not decide:

| status | meaning | what the sound editor does |
|---|---|---|
| `ok` | every take at 60 % or more, nothing flagged | nothing (`--apply` writes the fix, if there is one) |
| `weak` | the median take passes but one does not: unstable | try the suggestion, more `gap` from a loud sound, a lower sfx `vol`; or accept it and say so (record the word if it matters) |
| `flagged` | something heard is alarming, out of bounds, crude, changes a statement about a real person, or a real name was not heard | **alarming, out of bounds or crude: never accepted**: another spelling, or the line goes to the owner. A real name not heard needs nothing (no waiver: the caption carries it). A statement heard differently: best effort, record the word that failed, and list the line under "heard differently, caption exact" |
| `unsayable` | no candidate got the line over the gate | best effort, then record the word that failed (`npm run voice-research -- … --add`) and move on |

`fit.json` (with `--json`) is written beside the script, for a draft in its draft folder (never
into the episode's `public/` or `segments/`). For a published episode's segment it goes into
`.cache/fit/<ep>/<seg>/` instead, so the committed build's `sourceHash` is not disturbed.

```json
{ "segment": "made-pen-plotter-replies", "draft": "made-pen-plotter-replies", "episode": "002-2026-w47", "takes": 4, "gate": 0.6,
  "lines": [{ "id": "open", "who": "larry", "kind": "say", "text": "… They belong to Samantha.", "as": "… They belong to Suh-man-thuh.",
              "was": null, "fix": "Samantha → Suh-man-thuh",
              "heard": [{ "text": "Saturday, one pen plotter, …, they belong to Samantha.", "count": 3 }, { "text": "…", "count": 1 }],
              "score": { "heard": 11, "of": 12, "min": 10 }, "status": "ok", "flags": [],
              "suggest": { "rate": 0.9, "as": "…", "score": {} },
              "tried": [{ "as": "…", "score": { "heard": 10, "of": 12, "min": 9 } }, { "as": "…", "score": {}, "takes": 2, "flags": ["name: Samantha"] }] }],
  "voices": { "larry": { "f0": 107, "nearest": "pete", "distance": 1.54 } } }
```

`as` is the respelling the tool chose (null when the caption is said as written). `sounds` lists,
for the chosen `as` and for each entry of `tried`, every respelled word with the sounds of the word
and of the spelling: `{ i, word, as, plain, ipa, keeps }` (`keeps` true or false for a dictionary
word, null for a guess, with `why` when false); for a chosen respelling the table prints both
(`fix: on → onn (was 1/2) · on /ə n/ → onn /ɑ n n/`). `rejected` lists the spellings refused before
rendering, with both sounds and why; `soundsDifferent` (top level) the script's own respellings
that change a word. `was` and `fix`
appear only when it proposes a change; `suggest` only when a slower rate did better (never applied);
`tried` lists every candidate heard, with what it was heard as, `takes: 2` marking those only
screened. `real` marks a real person's line; `missed` the caption words the chosen candidate's
takes missed, with counts; `known` the words the voice research file marks hard in this voice.
`owner` lists the lines heard as something never accepted, `heardDifferently` the real people's
lines not heard as written. `voices` gives each speaker's measured pitch and nearest voice in the
whole cast (house, episode and draft). The command exits 1 only when `owner` is not empty.

**The sound editor's pass, step by step:**

1. `npm run voices -- <ep> --drafts` first, so every guest's voice is final before fitting (a
   respelling is chosen for one voice).
2. `npm run fit -- <ep> --draft <slug> --json` for each draft. Read the one-screen table.
3. Read every heard text the table shows for a line that is not `ok`, and the flags. A crude or
   alarming word is never accepted.
4. `npm run fit -- <ep> --draft <slug> --apply --json` to write the respellings (only `as`
   changes; the diff is the review).
5. For a `weak` or `unsayable` line, try what the table suggests by hand (`rate`, `gap`, an
   sfx's `vol` or `at`, a few spellings of your own), then fit again. A few tries are enough:
   best effort is sufficient. A `flagged` name needs nothing.
6. Record what stayed hard: `npm run voice-research -- <ep> --draft <slug>` (below). It ends 0
   when every hard line is recorded.
7. Fit again until the exit code is 0 (nothing heard is crude, alarming or out of bounds). If no
   spelling avoids such a word, put the line first in the fit notes, under "For the owner", with
   every heard text. A re-run of an unchanged script takes seconds: every render and every
   transcription is cached.

It takes about 40 to 90 s per segment the first time on an M-series Mac (four loaded Whisper
workers), a few seconds after that. It needs `whisper` (openai-whisper) on the PATH; if the
command's Python cannot be found it falls back to running the command, which is slower.

**What it cannot do.** It cannot judge a mishearing's meaning beyond its word lists, so read the
heard texts of every flagged and weak line yourself. Whisper does not know invented names or
handles: a name it cannot spell is flagged, as a description (no waiver is needed; the waivers in
`production/heard-waivers.json` are only for an out-of-bounds subject heard). It does not change
words, cut lines or re-place sfx; those are the writer's and the builder's.

### The voice research file (`npm run voice-research`)

`data/voice-research.json` is the one source of truth for the words and patterns the voices find
hard; [`docs/voice-research.md`](../../../docs/voice-research.md) is generated from it, for a
writer to scan in a minute (what cannot be said, what is unstable, patterns, spellings that work,
spellings that only the transcription accepts;
where each was seen stays out of the page). Both are committed; the studio cannot regenerate the
file (`scripts/test/checkout.test.mjs` guards it), and a test fails when the page is stale.

```sh
npm run voice-research -- <ep> --draft <slug>      # harvest a draft's fit.json (--drafts: every draft; <ep> <seg>: a segment)
npm run voice-research -- <ep> --draft <slug> --add usage --line usage-limit --status cannot --note "Never heard in a two-word line."
npm run voice-research -- <ep> --draft <slug> --add kazoo --line l1-kazoo --status works --as kah-zoo --note "Heard as Kazu."
npm run voice-research -- <ep> --draft <slug> --pattern "A word beginning \"cl\"" --words clue --note "Voiced to gl."
npm run voice-research -- --page                   # regenerate the page only; --dry-run writes nothing
npm run voice-research -- --sounds                 # the sounds check over every working spelling (bun); --dry-run writes nothing
```

The harvest records, as `works`, each caption word respelled in the chosen `as` and heard in every
take and whose sounds are the word's (a spelling heard as the word whose sounds are not, by
fit.json's `sounds`, goes in under `misleads` instead) (with what it was heard as, and the other spellings tried, from `tried`), and lists every line
still `weak`, `flagged` or `unsayable` with its heard texts and missed words. It never makes an
entry it cannot attribute to a word: a respelling heard in only some takes, a symbol said as words
and anything never heard are printed, not recorded. `--add` records the word that failed, from one
line of `fit.json`: the word must be in that line's caption; what it was heard as, and what each
spelling tried was heard as, come from the file. A word already recorded keeps its status when a
spelling works once (you judge); counts from a source already seen are not added twice, so a harvest
can be re-run. A hand edit of the JSON is fine too, in the same shape, followed by `--page`.

An entry: `word` (lower case; a short phrase is allowed), `status` (`works`, `unstable`, `cannot`,
`misleads`),
`voices` (house ids, or `guest`: a guest's cast id can be a handle, so it is never recorded),
`heard` (what the word as written was heard as, with counts), `spellings` (each tried, its voices
and what it was heard as), `works` (the spellings heard as the word, and in which voices),
`misleads` (spellings the transcription heard as the word whose sounds are not the word's: `{ as,
voices, ipa, why? }`), `ipa` (the word's own sounds, beside `misleads`), `note`
(one line) and `seen` (episode or draft ids only, `<episode id>/<slug>`: never a person, a handle or
which post a word came from). A pattern: `pattern`, `note`, `seen`, and optionally `words`, the
words of a line it covers. **Names are never recorded**: a real person's name or handle is refused,
and a line whose only missed words are a name needs no entry.

**`misleads`: the transcription accepts it, a listener does not.** `--sounds` runs the sounds check
(above) over every working spelling in the file with the engine's G2P (under bun): one that changes
the word moves from `works` to `misleads`, with its sounds and the word's, and its evidence
(`spellings`, `heard`) stays. An entry left with no working spelling is marked `misleads`; another
status is kept. A spelling marked `misleads` that keeps another reading of the word (`rekkerd`, the
noun "record") moves back to `works`, with that `reading` recorded, and the page shows it. The fitting tool never tries a misleading spelling, first or otherwise, and the page lists
them apart from the spellings that work, with both phoneme strings. Plain "show" is right (the
owner, by ear): `showw` and `sshoww` are pronounced "shao". `--add <word> --status misleads --as
<spelling>` records one by hand; `--sounds` fills in its sounds.

A hard line (unsayable, or flagged for a statement heard differently) counts as recorded when a
`cannot`, `unstable` or `misleads` word, or a pattern with `words`, seen in that draft, covers a word of its
caption. The command exits 0 when every hard line is recorded, 1 when one is not or a line is heard
as something never accepted, 2 for bad arguments. It runs with node, with nothing installed.

## Rendering a draft (`--draft`)

`npm run render -- <ep> --draft <slug>` renders `episodes/<ep>/production/drafts/<slug>/script.js`
with the draft's own `cast.js` merged over the episode's, into
`packages/show/tools/.cache/drafts/<ep-id>/<slug>/` (gitignored: `audio/<slug>.mp3`,
`tele/<slug>.bin`, `cues.json`). Nothing is written into the episode. `npm run check -- <ep> --draft
<slug>` and `bun packages/show/tools/analyze.ts whisper <ep> --draft <slug>` read that render. The
draft's `script.js` must have `id` equal to its folder name. Every command that takes `<ep>` also
takes the path of an episode folder (`…/episodes/<id>`), so a copy extracted from a branch can be
rendered and fitted without checking it out.

## Giving guests voices (`npm run voices`)

```sh
npm run voices -- <ep>                         # the episode's own cast.js
npm run voices -- <ep> --drafts                # and every draft's cast.js, placed together
npm run voices -- <ep> --drafts --rule amber:not-lowest --rule dave:below:120 --dry-run
```

Each voice is measured as `analyze.ts voices` measures it (median f0 and long-term spectrum of the
two test sentences; distance = semitones ÷ 2 and spectrum dB ÷ 2.5). Guests are placed one by one
against the house and everyone placed before them. A guest whose voice is already 1.5 or more from
all of them keeps it, so its respellings stay good. Any other guest gets a slot (a body, a pitch in
the engine's safe range and a timbre: plain, bright, soft, dark, pressed) that clears 1.5, the one
nearest its old pitch; if none clears it, the most distant. A guest whose entry is
`{ name, handle, title, guest: true }` with no `body` (how a writer leaves it) has no voice yet and is
placed fresh the same way, steer and all; with no old pitch to stay near, it gets the slot that clears
1.5 with the most room (farthest from the house and everyone placed before it), so fresh guests
spread across the range, and its row says `new (no voice yet)`. An entry with neither `body` nor
`guest: true` is not a guest and is skipped, as are house ids. The same cast id in several drafts is
one guest with one voice, written into every file that defines it; if those files disagreed, it
gets a new one. Only `body`, `f0` and `source` are written, each replaced where it is or inserted
when the entry lacks it (body after `title`, then f0, then source), on one line or several, with
every other key and comment left as it was: `rate`, `accent` and `pan` stay.

Rules per guest: `not-lowest`, `not-highest`, `below:<Hz>`, `above:<Hz>` (on the measured median),
`keep` (keep its voice even if too close), `new` (move it even if distinct). `--dry-run` writes
nothing; `--json` also writes `production/voices.json`. It prints one row per guest: measured pitch,
nearest voice and distance, kept or the new voice, and the files it is in, then which drafts to fit
again. Exit 1 if a voice is still under 1.5 from its nearest neighbour. The first run measures
a hundred slots (two or three minutes); after that every measurement comes from the cache.

**Pronouns and the soft steer** (the owner's ruling of 21 November 2026; `packages/show/config/voices.json`
`pronounSteer`). Each guest's stated pronouns come from the record the pipeline carries: the guest's
account in the episode's or a draft's `production/sources.json` (`role: guest` with its `cast` id,
by DID, then handle), looked up in the week's digest `authors` (`data/weeks/<week>/digest.json`), or
a `pronouns` field on that sources account; never from the cast entry's name or look. A guest with
no source record gets no steer. A guest whose stated forms include "she" and not "he" is kept out of
the lowest band (`above:<lowestBandBelowHz>`, 120 Hz); one whose forms include "he" and not "she"
out of the highest (`below:<highestBandAboveHz>`, 220 Hz); mixed forms, any pronouns, they alone,
neopronouns and none stated are placed freely, and nobody is pushed towards a band. These are the
`above:`/`below:` rules applied as a preference: among slots that clear 1.5, one that meets it comes
first; distinctness from the house and the other guests always comes first, and when the two
conflict the voice is placed anyway and the table says `NOT MET`, naming the guest. A `--rule` given
by hand for a guest switches the steer off for that guest (`steer off: a hand rule`). Each row ends
`pronouns <as stated | none stated | no source record>; steer <none | above:120: met | NOT MET>`.
`enabled: false` switches it off. The steer runs one way only: nothing in the studio, the pipeline
or a brief ever reads a voice back as a statement about a person.

---

## Rendering video (`video.mjs`)

Renders an episode to mp4 for posting: frame-exact and offline, never a screen recording. Run
it with node (not bun), from the repo root, with the episode first. Output goes to
`video/<ep-id>/`, which is gitignored. The scene list and the clip numbers (`01-…`) come from the
episode's rundown (`episode.json`) at run time. Re-render
only the segments that changed, then rebuild the full files with `--full --bluesky`. Rename
clips by hand if the order changed.

```sh
node packages/show/tools/video.mjs 1 --all --bluesky    # every clip + late-cluster-full.mp4 + late-cluster-bluesky.mp4
node packages/show/tools/video.mjs 1 --all              # every clip (01-…, numbered by the rundown) + late-cluster-full.mp4
node packages/show/tools/video.mjs 1 <seg>              # one clip (or several ids)
node packages/show/tools/video.mjs 1 --full             # rebuild late-cluster-full.mp4 from the clips already in video/<ep-id>/
node packages/show/tools/video.mjs 1 --bluesky          # rebuild only the posting cut, from the clips (second generation)
node packages/show/tools/video.mjs 1 <seg> --frames 90  # a 3 s test → video/<ep-id>/test-<nn>-<seg>.mp4
```

Options: `--jobs 3` (segments in parallel, each in its own browser), `--scale 1.5` (stage backing
store: 1.5 gives 1920×1080, 1 gives 1280×720), `--crf 16`, `--preset slow`, `--out dir`. Temp
files go to `$TMPDIR`. On an M3 Max, `--all --jobs 4` takes about 8 minutes. The browser is
Playwright's Chromium, or `CHROMIUM_PATH` if set (as for `shoot`).

**The credits** (`--credits`, off by default). The page ends on its end card; the video, whose
scenes are the rundown, does not, unless the run says `--credits`. Then the end card is one more
scene, `credits`, after the rundown (clip `<n>-credits.mp4`), with silence under it, in every
whole-episode file the run writes: the full cut, the posting cut, the YouTube cut, and the
previews of each. It is the page's own end card, made the same way (`app.js` `makeEnd`): the
stock card, or for an episode with `plainCards` the plain roll over black
(`packages/show/README.md`, "Title, production and end cards"). It runs one complete roll: the
plain roll is 20 s (600 frames; longer only if an episode's credits are too long for every line
to stay up 4 s), the stock card a second of logo and then one loop of its roll.

```sh
node packages/show/tools/video.mjs 3 --all --bluesky --credits --soften box --preview-360   # every scene, the credits too, and the posting cut
node packages/show/tools/video.mjs 3 credits --credits                                       # the credits clip alone (20 s)
node packages/show/tools/video.mjs 3 --full --bluesky --credits                              # rebuild from clips, credits clip included
```

- The credits count against `--max-seconds` like any scene: the posting cut's length is the
  rundown, the credits and any poster frames.
- `--poster <s>` is a moment of the finished cut, so it can fall in the credits; the poster goes in
  front as before.
- The subtitles (`.srt`, `.vtt`) are unchanged: the credits come after the last caption and have
  none of their own, and a poster still moves every cue by its length.
- `--caption-scale` does not touch the roll (there are no captions on it). Read the roll at 360p
  with `--soften box`: the plain roll's type is a third larger than the stock roll's, and with the
  soften filter every line of episode three's roll, the smallest (a cast role) included, reads in
  the 360p preview. Without it, point sampling breaks letters in the roll's thinner lines.
- `--credits` with only single segments to render is refused; `credits` as a scene needs `--credits`.

**The posting cut** (`--bluesky`; tune it with `--max-mb 280 --max-seconds 600 --out-name
late-cluster-bluesky.mp4`) is the whole episode for Bluesky, which allows 10 minutes and
300 MB. The CRF-16 master is too big for that. The cut is a two-pass x264 encode at the video
bitrate that fits the size limit: the limit less 2 % for the container, less 192 kb/s for the
AAC. If the result comes out over the limit, pass 2 is re-run at a lower bitrate. It refuses an
episode at or over `--max-seconds`.

With `--all --bluesky`, each segment also writes a lossless (x264 `-qp 0`) copy of the same
yuv420p frames to the temp folder. The posting cut is encoded from those, so it is a first
generation like the master. That takes about 1 GB per minute of temp space while it runs. A
`--bluesky` without `--all` re-encodes the CRF-16 clips instead, and says so.

**For phones.** When the posting cut is made and approved is in `docs/WORKFLOW.md`, "After
review: publishing and posting". Bluesky re-encodes every video to two streams, and phones mostly get the low one:
640×360, H.264 Main 3.0, about 0.95 Mbit/s. From a 1920×1080 upload it keeps the centre pixel of
every 3×3 block (pixel 3x+1, 3y+1) and drops the other eight, unfiltered, in luma and chroma
alike, so thin strokes and small text break up everywhere on screen, not only in the captions.
Desktops get 1280×720 at about 3.2 Mbit/s, scaled with something bicubic-like. Four options deal
with that:

```sh
node packages/show/tools/video.mjs 2 --all --bluesky --max-mb 280 --soften box --caption-scale 1.4 --poster 215 --preview-360 --preview-720
node packages/show/tools/video.mjs --preview-360 --preview-720 video/<ep-id>/late-cluster-bluesky.mp4   # an existing file
npm run shoot -- 2 top-chicken 22 --caption-scale 1.4   # a frame to look at: …/top-chicken@22-cs1.4.png
```

- `--soften box` (posting cut only, off by default; `tent` is a gentler 1-2-1 kernel) averages
  each 3×3 block about its centre in the same two-pass encode that makes the cut, so the pixel
  Bluesky keeps is the mean of its block and the phone gets a properly filtered picture. Against
  an ideal downscale the phone picture goes from 30 to 39 dB, and post cards, chyrons, handles,
  `PUPPET · PARODY`, the disclaimer and song credits become readable; the desktop picture keeps
  97 % of its edge detail (a slight softening of the smallest text).
- `--caption-scale <n>` (0.5 to 3, default 1) scales the whole caption bar: the line, the name
  tag, the box, its padding and the underline, and the `[ LAUGHTER ]` box. The bar stays centred,
  keeps its bottom edge (so it grows upward) and still lifts above a disclaimer or ticker. The wrap
  width stays 1000 stage units, so larger text wraps into more lines and pages through more pairs
  of them, still following the word being said. The page reads it as `?capscale=<n>`
  (`Stage.captionScale`). With `--soften box`, 1.4 reads cleanly on a phone; without it, 1.6.
  - **It is a ceiling.** The bar grows only into free space. What must never be under it is
    *protected*: every real post's card (all of it, counts row included) and every credit line
    that names an account or a site. `skeetCard` protects itself; a segment marks anything else it
    draws with one call, `draw.protect(ctx, x, y, w, h)`, in its drawing coordinates (any
    transform), every frame the thing is up. The set's own plates and signs are not protected.
    Each line gets one scale for all of its pages: the largest, up to the asked one, that clears
    everything protected at every frame of the line, never below 1. The video tool finds these in
    a pass of its own before rendering each segment (no heads drawn; about 4 minutes for all of
    episode two, measured in software-rendered Chromium) and
    prints the lines it drew smaller; `shoot` plans the line on screen. The laughter box is fitted
    frame by frame. At scale 1 none of this runs.
  - **Chyrons clear it.** A chyron that would overlap whatever is in the caption area (the bar or
    the `[ LAUGHTER ]` / `[ APPLAUSE ]` box, lift included) sits just above it, 4 stage units
    clear, at every scale; it moves as the box fades in, so it never jumps.
- `--poster <seconds> [--poster-frames 2]` puts that frame of the finished cut (the credits
  included, with `--credits`) in front of every
  whole-episode file the run writes (full, posting and YouTube cuts), held for two frames with
  silence under it, so the file's first frame (Bluesky's poster) is that picture. The `.srt` and
  `.vtt` it writes move later by the same amount: pass the same `--poster` to a `--subs` run whose
  captions go with such a cut. The full cut copies the clips, so the poster is encoded with this
  run's `--crf` and `--preset`; if the clips were made with others, it stops and says which.
- `--preview-360` and `--preview-720` write `<name>-360p-preview.mp4` and `<name>-720p-preview.mp4`
  beside every mp4 the run writes (or beside the file given): the phone stream (640×360 point
  sampled, Main 3.0, 950 kb/s average, 1.8 Mbit/s cap) and the desktop stream (1280×720 bicubic,
  3.2 Mbit/s; its profile and peak are assumed). Against frames Bluesky served for episode two,
  the 360p preview matches at SSIM 0.988 to 0.994 and the 720p scaler at about 41.5 dB. Watch
  both before posting.

Checked against the real thing on 21 November 2026: a cut made with `--soften box
--caption-scale 1.4 --poster 5.9` was posted as a test, both streams were downloaded and the post
deleted. Over the whole episode the served 360p stream matches the local preview at SSIM 0.990 and
the served 720p at 0.996; small text is whole at 360p; and the poster Bluesky shows is the
`--poster` frame. A deleted post's streams stop being served within minutes, so the previews are
the way to check a cut without posting it.

**The YouTube build** is for platforms that show their own subtitles.

```sh
node packages/show/tools/video.mjs 1 --youtube          # late-cluster-youtube.mp4 (+ .srt, .vtt): no burned-in captions
node packages/show/tools/video.mjs 1 --subs             # only late-cluster-youtube.srt / .vtt (about 10 s, no pictures)
node packages/show/tools/video.mjs 1 <seg> --no-captions # a clip without captions → video/<ep-id>/<nn>-<seg>-nocaps.mp4
```

`--youtube` re-renders every segment with the stage's caption system off, using
`stage.draw(show, { captions: false })`, the same switch as the app's CC button. It then
assembles the full episode like the master: CRF 16, the same audio, the same per-clip frame
counts. The normal clips and full files are untouched, and still have captions. Turning
captions off removes two things:
- the caption bar: the speaker tag and the line with its lit word;
- the `[ LAUGHTER ]` / `[ APPLAUSE ]` box that replaces it when nobody is talking.

Everything a segment draws itself stays: chyrons, post cards, the APPLAUSE/LAUGH sign, the
episode counter, the disclaimer footer and any on-stage lyric lines. With the caption bar
gone, a chyron sits at its lower position (y 560 rather than 478), as it does in the app with
captions off.

The subtitles come from the caption system itself, not from `cues.json` alone. While each
segment is stepped, the tool records what the caption bar would show on every frame:
- the line, with the speaker's display name and kind;
- the laugh caption.

That way segments' own overrides are included, such as a segment hiding the bar for its sung
lyrics. Runs of identical frames become cues. A line counts as shown while the bar is more than
half faded in, which is roughly t0 to t1 + 0.55 s. The full-file times use the rendered frame
counts, so nothing drifts. The conventions:
- **Speakers:** `NAME:` (cast display name) at a segment's first line, whenever the speaker
  changes, and after more than 5 s without a line.
- **Song:** `♪ … ♪` for sung lines.
- **Sounds:** `[LAUGHTER]` / `[APPLAUSE]`. Back-to-back sound captions merge into
  `[APPLAUSE AND LAUGHTER]`.
- **Layout:** at most 2 lines of 42 characters. A longer line is split into several cues at its
  word timings.
- **Timing:** cues don't overlap, and last at least 0.7 s unless the next cue starts first. A
  line too short to read that runs straight into the next shares a two-line cue with it.
- **Format:** UTF-8, SRT and VTT.

Output: H.264 High, yuv420p, tagged bt709, 30 fps CFR, AAC-LC stereo 48 kHz 192 kb/s,
`+faststart`. Only the stage is rendered (captions on): no title card, end card or transport bar.

How it works:
- **Stepping.** The show is stateful: eased head turns, face springs, blinks, glances, airflow
  particles and shot pushes. Seeking with `?freeze` is not the same as playing through. So each
  segment is stepped continuously from t = 0. The page boots in `?seg=title&freeze=1` mode,
  which runs no frame loop and seeds `Math.random`, so renders are reproducible. Then the tool
  builds the segment's `Show` from the app's own modules and calls what `app.js`'s `tick()`
  calls: `setup`, `resetMotion()` at the cut, then `show.frame(n/30, 1/30)` and
  `stage.draw(show)` for every frame. It needs no hooks in the app.
- **Pixels.** `getImageData` per frame is POSTed to the tool's Vite dev server as a Blob (a typed
  array body is about 100× slower), then piped into ffmpeg/libx264.
- **Audio.** The shipped mp3 is decoded with ffmpeg, which honours the LAME gapless header, so
  sample 0 is t = 0. This is the same alignment the page gets from `audioLead()`.
- **Length.** Each segment is `round(duration·30)` frames, so every clip is within half a frame
  of its `cues.json` duration. The count doesn't depend on the other segments, so a clip stays
  valid when another segment changes. Only its `01-…` number can change, if the rundown order
  does. Each clip's audio is trimmed or padded to that length at the tail, by less than a frame.
  The full episode concatenates the clips' video streams and encodes one continuous audio
  stream, the segments' PCM back to back. Audio and video cut together and there is no AAC
  priming or padding at the cuts, so nothing drifts.

---

## Known limits

- The sounds check knows a word's other readings only from `config/sounds.json` `readings` (the
  committed dictionary keeps one per word): add a heteronym there when you meet one. Whisper's
  approval of a spelling is never a listener's: read the phonemes, and listen.
- Some words cannot be said, or are unstable, in some voices: they are recorded in
  [`docs/voice-research.md`](../../../docs/voice-research.md). A writer may still use them; the
  captions carry the line.
- Laughs are synthesized "h+vowel" pulses. They read as a crowd laughing, but up close they
  are clearly synthetic. Real laughter has inhaled gasps, which the engine can't do in speech
  mode.
- The mp3 relies on the LAME header for encoder-delay trimming. Browsers that ignore it play
  everything about 25 ms late, which is negligible for lip-sync.
- Cold renders are single-threaded (about 4× real time).
- Some creature calls (elephant `trumpet`/`squeak`, alligator `hiss`) ignore `pitch`. The
  elephant's sustained "mode" can't be gated into a trumpet (it only gives transients), so the
  trumpet comes from the built-in call.
- There is no seal *bark* call in the bestiary. `seal` is designed from the gated seal with
  pulse and roughness, and reads as a pulsed honk-bark.
