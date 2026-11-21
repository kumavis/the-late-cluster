Verdict: pass

(Round 2 verdict, after commit df5c77f. Round 1, below, was "send back".)

# Posting cut, caption scale 1.4: what the larger captions cover

Episode `002-2026-w47`, all nine segments in the rundown, shot with `npm run shoot -- 002-2026-w47 <seg> <t>... --caption-scale 1.4`. Each overlap was shot again without the flag (scale 1) for comparison. Times are seconds into the segment. Rules: `docs/bible/09-real-people.md` R4 (a card shows the real display name, handle, date and like count), R9 (PUPPET · PARODY, disclaimer, tribute credit with URL and maker), and the classes in the brief.

## Findings

| segment | time in segment | what is covered at 1.4 | class | scale 1 |
|---|---|---|---|---|
| interview-yonderdavid | about 5.7 to 6.9 (applause-1, before line `four` starts at 6.95); shot at 6.22 | The `[ APPLAUSE ]` box, lifted above the disclaimer, covers the end of David's chyron handle: `@yonderdavid.bsk` is visible and `y.social` is under the box. PUPPET · PARODY and the name are clear. | **Must fix** (real account's handle on a chyron) | Already overlapping, but less: the narrower box covered only the last letter of `.social`. 1.4 makes it worse. |
| made-mobius-chess-ringmate | 13.2 to 18.0 (line 3, Larry "Then came a picture, and a tag under it. The tag said: Minor Mobius."); shot at 13.27, 13.38, 16.32 | The line wraps to two lines at 1.4, and the taller bar covers the tribute credit under the board, `ringmate · mobius.mokkenstorm.dev · by @mokkenstorm.dev`, for the whole shot. | **Must fix** (a real account's handle and the project URL, R9 tribute credit) | No. At scale 1 the line fits on one line, the bar sits below the credit, and the credit can be read. New at 1.4. |
| interview-yonderdavid | about 41.8 to 43.1 (laugh-2); shot at 42.4, 42.55 | The `[ LAUGHTER ]` box overlaps the lower right corner of David's chyron frame. The handle `@yonderdavid.bsky.social` and PUPPET · PARODY stay fully visible. | Should fix (two boxes overlap) | The box touched the corner. 1.4 makes it worse. |
| riemann-breaking-news | 26.9 to 34.1 (line 5, moultano's post, both pages); shot at 27.02, 29.95, 32.47, 34.08 | The bar covers the bottom row of Ryan Moulton's quote card, the reply, repost and like counts (3 · 1 · 71). The name, handle, date and post text are clear. The caption is not carrying the counts. | Should fix (card text the caption is not carrying; R4 lists like count among what a card shows) | No, the counts were visible. New at 1.4. |
| riemann-breaking-news | 39.3 to 49.3 (line 7, Amber's reply, both pages); shot at 39.46, 44.36, 47.42, 49.21 | Same pattern on Amber's reply card: the counts row (1 · 0 · 4) is under the bar. The name, handle, date and post text are clear. | Should fix (as above) | No, visible. New at 1.4. |
| riemann-breaking-news | 35.0 to 39.0 (line 6, Larry "For viewers just joining us…"); shot at 35.12 | The two-line bar covers all of the LARRY NX desk plate. | Should fix (studio name plate) | The one-line bar already covered the lower half of the plate. 1.4 makes it worse. |
| made-pen-plotter-replies | 6.4 to 12.8 (line 2); shot at 6.77, 9.98 | The raised LARRY NX host chyron covers the left of the desk plate, and the bar covers its lower half. | Should fix (studio name plate) | The chyron already covered "LAR". 1.4 makes it worse. |
| made-pen-plotter-replies | 23.2 to 27.4 (line 5); shot at 23.32, 26.6 | The two-line bar, lifted above the disclaimer, covers the LARRY NX desk plate. | Should fix (studio name plate) | No, the plate was clear. New at 1.4. |
| made-pen-plotter-replies | 29.9 to 33.4 (line 8, ver.000's reply); shot at 29.96, 33.14 | The bar covers the lower half of the LARRY NX desk plate. The ver.000 chyron (name, PUPPET · PARODY, `@ver.ooo`) is clear. | Should fix (studio name plate) | No. New at 1.4. |
| top-chicken | whole sports-desk shot: lines 1, 6 and 9 at two lines; 7, 8, 10 and 11 at one line; shot at 3.82, 19.73, 22.34, 26.31, 31.0, 32.53, 35.85, 39.34, 41.88 | The bar covers the desk sign's "THE LATE CLUSTER" line, and the two-line bars at 19.6 to 25.5 and 32.4 to 38.7 also cover the lower half of "SPORTS". TopChicken's card (handle, date, BOT · UNOFFICIAL RANKINGS, counts) is clear throughout. | Should fix (studio name plate) | Partly: the scale-1 bar already overlapped the right end of "THE LATE CLUSTER". 1.4 makes it worse. |
| riemann-breaking-news | 12.4 to 24.3 (lines 2, 3); shot at 14.76, 17.17, 19.91, 22.38, 24.17 | The bar's top edge lies on the bottom border of computer dipshit's card. The counts 23 · 144 · 889 are just clear. | Cosmetic | Near miss before too. |
| riemann-breaking-news | 52.5 (Sibyl's line); shot at 52.51 | The bar's name tag comes up to the lower right corner of Amber's name box. `@shimmermathlabs.com` is clear. | Cosmetic | Clear. |
| made-pen-plotter-replies | 35.27, 41.28 | The bar's top edge touches the bottom of the desk plate. The text is clear. | Cosmetic | Clear. |
| top-chicken | 41.31, 41.52 (laugh-1) | The `[ LAUGHTER ]` box touches the end of "CLUSTER" on the desk sign. | Cosmetic | Clear. |
| bluesky-account | 6.68 | The bar's name tag sits on the underline of the `@latecluster.simcluster.tv` sign (the show's own account). The text is clear. | Cosmetic | Clear. |

Nothing found in making-of-inward, made-polyhedral-coffee-simulator or music-alt. In particular, Dave's and Amber's chyrons in the coffee segment, the minormobius and mokkenstorm chyrons, the disclaimer lines, and the LAUGH/APPLAUSE signs are clear at 1.4.

No frame showed the bar or box over a face or mouth. No PUPPET · PARODY tag or disclaimer line was covered. I found no captioned line that is never fully shown: every line that pages at 1.4 (for example top-chicken 6 and 9, riemann 5 and 7, coffee "…I believe you have been sold a sphenomegacorona…", mobius 3) shows each of its pairs while that pair is being said. The song's sung lines in music-alt have no caption bar, since the lyrics run at the top, so they are not affected.

## Smallest change that would clear each must-fix (not made)

- **interview-yonderdavid, applause at about 5.6 to 6.95.** The chyron moves up only by the laughter box's growth (`captionRise(s, true)`). When a disclaimer lifts the box, the chyron does not move up by that lift as well, so the box still reaches into the chyron's handle row. Scale 1 already clipped one letter here. Smallest fix: during this cue, raise David's chyron until its bottom is above the lifted box's top. At 1.4 that box top is about y 588, so the chyron moves up about 42 stage units. Two other options: keep the laughter box at scale 1 while a disclaimer is up, or end the applause caption before David's chyron finishes animating in. Owner: builder (studio chrome, or this segment's staging). It does not touch the script or audio.
- **made-mobius-chess-ringmate, line 3, 13.2 to 18.0.** The line needs about 1.15 times its scale-1 width, so it fits on one line only up to a scale of about 1.2. Smallest fix, pick one: lift the bar at this cue, or move the credit line `ringmate · mobius.mokkenstorm.dev · by @mokkenstorm.dev` above the top of a two-line 1.4 bar (about y 524 with no disclaimer). Posting the whole cut at a caption scale of 1.2 or less would also clear it. Owner: builder (this segment's staging). The script and audio stay as they are.

The should-fix rows on the post cards (Ryan Moulton's and Amber's like counts) would also clear if the cards' count rows ended above the two-line bar's top, or if the bar were lifted at those cues. R4 says a card shows the like count. The brief does not list counts as must-fix, so I classed them as should fix. The project manager may want them treated as blocking.

## What was checked

- Read: `docs/bible/09-real-people.md` (R4, R9 and the check list), `packages/show/tools/README.md` (`shoot`, "For phones"), `episodes/002-2026-w47/episode.json`, each rundown segment's `segments/<seg>/cues.json`, and the caption layout and chrome code. The code shows how the bar grows, how chyrons rise, that the laughter box shows only when no line is captioned, and that a disclaimer lifts both the bar and the box.
- Times: 144 captioned lines. For each line I shot one frame just after its first word. For long lines I shot one frame about every 45 characters of text and one near the end, so every page at 1.4 got at least one frame. For every laughter, chuckle and applause cue I shot two frames, at 0.6 s in and at the midpoint. No segment raises the sign from its staging, so those cues are the only source of the laughter and applause boxes.
- Frames looked at: 261 at `--caption-scale 1.4` (made-pen-plotter-replies 23, bluesky-account 5, interview-yonderdavid 33, riemann-breaking-news 50, making-of-inward 46, top-chicken 16, made-polyhedral-coffee-simulator 31, made-mobius-chess-ringmate 25, music-alt 32). I looked at all of them as three-frame strips of the lower 460 rows, then at full frames or zoomed crops wherever something overlapped. I also looked at 28 frames at scale 1 at the same times for comparison, 289 frames in all.
- Limits: the page breaks were placed by character count, not measured from the font. The laughter boxes were sampled at two moments per cue. A shot or chyron that appears only between sampled moments was not seen.

## Round 2

Checked against commit df5c77f ("Studio: larger captions never cover a card, a credit or a name tag"). With that commit, chyrons clear the caption area, the caption scale is a ceiling for each line, and post cards and credits are marked with `draw.protect`. Same method as round 1: `npm run shoot` with `--caption-scale 1.4`, plus scale-1 frames where the scale-1 look changed.

Verdict: **pass**. Both must-fix findings are cleared. No new must-fix finding. The should-fix rows that remain are all set plates and desk signs, which the builder left unprotected on purpose. Whether to post with them is the project manager's call.

### Round 1 rows, again at 1.4

| round 1 row | round 2 |
|---|---|
| interview-yonderdavid, applause about 5.7 to 6.9, handle under the box (must fix) | **Clear.** At 6.22 and 6.34 David's chyron sits above the `[ APPLAUSE ]` box, and `@yonderdavid.bsky.social`, PUPPET · PARODY and the name are whole. The raised chyron covers only the chair's arm and the lower torso. |
| made-mobius-chess-ringmate, line `tag` 13.2 to 18.0, credit under the bar (must fix) | **Clear.** Drawn at 1.2 on one line. `ringmate · mobius.mokkenstorm.dev · by @mokkenstorm.dev` is whole above the bar in every frame from 13.15 to 18.0 (11 frames). The line is fully shown. |
| interview-yonderdavid, about 41.8 to 43.1, laughter box overlaps the chyron corner (should fix) | **Clear.** At 41.25 to 42.55 the chyron sits above the `[ LAUGHTER ]` box and they no longer overlap. The handle is whole. The raised chyron covers the chair and David's lower torso, not his face. |
| riemann-breaking-news, `mo-revenue` 26.9 to 34.1, Ryan Moulton's counts row (should fix) | **Clear.** Drawn at 1. The counts 3 · 1 · 71, and the quoted card's 23 · 144 · 889, are whole in all 12 frames. Both caption lines are shown. |
| riemann-breaking-news, `amber-call` 39.3 to 49.3, Amber's counts row (should fix) | **Clear.** Drawn at 1. The counts 1 · 0 · 4 are whole in all 15 frames. The line shows on two lines throughout. |
| riemann-breaking-news, 35.0 to 39.0, LARRY NX desk plate (should fix) | **Still open.** At 35.12 and 37.99 the two-line bar covers the plate, as in round 1. The plate is not protected, by design. |
| made-pen-plotter-replies, 6.4 to 12.8, desk plate under the host chyron and bar (should fix) | **Still open.** As in round 1: the host chyron covers "LAR" and the bar covers the plate's lower edge. |
| made-pen-plotter-replies, 23.2 to 27.4 and 29.9 to 33.4, desk plate (should fix) | **Still open.** As in round 1. |
| top-chicken, sports-desk sign (should fix) | **Still open.** As in round 1. Eppy's chyron sits in the same place at both scales over the top of "SPORTS", so it was not moved. |
| Cosmetic rows | Unchanged. |

### The four scale-1 changes, shot at scale 1

| moment | shot at | result |
|---|---|---|
| interview-yonderdavid 6.23 to 6.87 (chyron rises 46) | 6.3, 6.55, 6.8 | **Clear.** The handle is whole; round 1 had clipped its last letter. The raised chyron covers the chair and David's lower torso; his face and mouth are clear. |
| interview-yonderdavid 41.63 to 42.77 (12) | 41.8, 42.2, 42.6 | **Clear.** The chyron sits above the laughter box. The handle and PUPPET · PARODY are whole. It covers no face, card or sign. |
| made-mobius-chess-ringmate 12.53 to 12.70 (up to 8) | 12.55, 12.62, 12.68 | **Clear.** This is the cut out of mokkenstorm's shot as the chyron slides off. It covers no face, card or label. |
| made-mobius-chess-ringmate 30.00 to 30.83 (12) | 30.1, 30.4, 30.75 | **Clear.** Minor Mobius's chyron sits above the laughter box. It covers neither the reply card nor the like, repost and love buttons, and the handle is whole. |

### Every chyron with a caption bar or a laughter or applause box, at 1.4

I shot every 0.75 s through each chyron's time on screen. These are the guest chyrons from `show.chyron` in interview-yonderdavid, made-mobius-chess-ringmate, made-pen-plotter-replies and made-polyhedral-coffee-simulator, and the host chyron in top-chicken. Riemann's small labels under the guest boxes are not chyrons, and the bar never reaches them.

- interview-yonderdavid, 4.0 to 24.2 and 32.9 to 42.8: clear. The raised chyron sits over the chair and torso. It never covers a face, the CHIMERA VOCAL SYNTH credit (top right), David's cards or the LAUGH sign.
- made-mobius-chess-ringmate, 4.4 to 12.7, 18.4 to 21.4 and 24.8 to 30.9: clear. Captions are switched off while a guest's own card carries the words, so no bar is drawn there. The chyron's ordinary position is unchanged, and the post cards are whole.
- made-pen-plotter-replies, 6.5 to 10.9, 23.5 to 25.8, 29.8 to 34.2 and 35.3 to 37.1: the raised host chyron covers the left of the LARRY NX plate (the existing should-fix row). The ver.ooo and Sibyl chyrons are clear of faces and of the reply cards at top left. The `PEN PLOTTER BY @samantha.wiki` credit at top right is never reached.
- made-polyhedral-coffee-simulator, 6.5 to 9.6 (Dave) and 43.1 to 47.3 (Amber): clear. At 45.46 Amber's raised chyron stops just under the mug panel's `POLYCOFFEE.9000ISH.UK · DAVE` line, with the same gap as at scale 1 (checked side by side).
- top-chicken, 3.8 to 7.4: Eppy's chyron is in the same place at both scales (the existing sign row).

### The six lines drawn smaller

| line | asked 1.4, drawn | protected item | line shown |
|---|---|---|---|
| riemann `dc-chart` 14.6 to 23.5 | 1.1 | computer dipshit's card, counts 23 · 144 · 889: whole in all 15 frames | Yes. Three lines, paged; "dollars" shows on the second page (22.95 to 23.42). |
| riemann `larry-moultano` 24.3 to 26.6 | 1.2 | the cards: whole as Ryan Moulton's card comes in | Yes, one line |
| riemann `mo-revenue` 26.9 to 34.1 | 1 | Ryan Moulton's card: whole | Yes, two lines |
| riemann `amber-call` 39.3 to 49.3 | 1 | Amber's reply card: whole | Yes, two lines |
| riemann `sibyl-zeta-1` 50.0 to 56.7 | 1 | Zeta Of 1's card, counts 1 · 0 · 4: whole in all 12 frames | Yes, two lines |
| mobius `tag` 13.2 to 18.0 | 1.2 | the ringmate credit: whole | Yes, one line |

### Protected items still covered, and things that should have been protected

- I found no protected item covered anywhere at 1.4.
- making-of-inward, 4.4 to 9.5 (`parts` to `throat-one`): **should fix.** The maker's credit `CHIMERA · jamesondh · open source` (segment `index.js`, plate at y 588) is not marked with `draw.protect`, but it names an account and a project. In 11 frames the 1.4 bar's name tag sits a few units below it without covering it, a near miss. It is clear today only because it happens to be. Owner: builder. Fix: protect that plate.
- interview-yonderdavid, the CHIMERA VOCAL SYNTH credit at top right, and the pen-plotter credit at top right: not protected, and nothing reaches them. This agrees with the builder.
- riemann, the small name labels under the three guest boxes (handles, PUPPET · PARODY): not protected, and nothing reaches them at the top of the frame.
- bluesky-account, the show's own handle sign: not protected. The bar's name tag sits on its underline, cosmetic as in round 1.

### Segments clean in round 1

I shot all the round 1 times again at 1.4 for bluesky-account, making-of-inward, made-polyhedral-coffee-simulator and music-alt, and looked at every frame. **They are still clean.** making-of-inward has the near miss above. Lines are fully shown, laughter and applause boxes cover nothing, and faces are clear.

### What was checked in round 2

- Read the commit's changes to `caption-layout.js`, `stage.js`, `caption-plan.js` and `draw.js`, and every `draw.protect` call in the episode's segments.
- Frames at 1.4: 425, covering all round 1 times plus dense samples through every chyron window and the six smaller lines (pen-plotter 41, bluesky-account 5, interview 73, riemann 98, making-of-inward 56, top-chicken 21, coffee 42, mobius 56, music-alt 33).
- Frames at scale 1: 15, covering the four changes (12) and comparisons in top-chicken, making-of-inward and coffee (3).
- Total: 440 frames, all looked at as lower-frame strips and, around every chyron, credit and smaller line, as full frames.
- Limits: as in round 1. Shoot computes each line's plan from the frames around the time asked for. The full cut's plan is made by `video.mjs` in a pass before rendering, and I did not inspect that cut.
