// Music: "Best We Can Doo-Wop". A doo-wop, and the last segment of the episode: the song, its
// button, and the goodnight. By estimate the last word ends at about 73 s and the night's
// applause rings on to about 78 s. Not rendered by the writer.
// It takes the place of the earlier song. Second-choice genre, had doo-wop been struck: a
// barbershop quartet, where "do" is the last chord and will not end.
//
// THE MESSAGE, which no line says: whatever you have is worth handing over. This week a whole
// simulator was posted under the words "best i can do", a photo of a mug ended up inside it, and
// nothing anyone offered was too small for somebody to work with.
//
// THE JOKE IS THE FORM. The week's phrase ends on the one syllable a doo-wop group is made of.
// Larry asks the band for the best it can do, and the band has "doo" and, when pressed, "wop".
// The form then does what the week did: the bass takes the two syllables up, the harmony joins,
// and the filler is the whole hook. The lead sings what members made, biggest first, down to a
// mug; the band's own entry is smaller than the mug. Then the question goes back to Larry. He
// has one low note, and it is not the one the chord was waiting for. Nobody tells him: the song
// changes key so that his note is its home note, and the last hook is sung to him, then to the
// lens. (The chord was waiting for C, which is "do". The band makes his note the new "do".
// That is for whoever hears it; nothing on screen says it.)
//
// THE ENDING is the one first written, by the owner's choice (production/owner-notes.md, "The
// owner's choices for the song"): the vamp, the question to Larry, his one note, the lift. It is
// taken back from segments/music-alt/script.js with the sound editor's fields on every line.
//
// REAL WORDS. One real post is read aloud: the first line of Dave's post (@dave.9000ish.uk),
// exactly, by Larry, from its card, as the post it was. Nobody's puppet speaks or sings.
// Everything sung is the band's own words and the band's own tune. "Best we can do" is the
// band talking about itself; it is never put in anyone else's mouth. Four members are credited
// on tiles for what they made or posted (David, Dave, cee, Samantha): display name, handle or
// address, the thing, and nothing about them. All four are in sources.json. The lyric names
// Samantha, so that the mug is plainly hers from the song alone; everyone else is "someone" in
// the lyric. No pronouns are sung. Nothing here says or shows how long anything took.
//
// PICTURES NOBODY HAS SEEN. David's video, cee's game and Samantha's photo have not been seen
// at the studio, so none is shown or redrawn: their tiles carry a plain glyph (cat ears, two
// wheels, a mug outline with nothing on it) and the credit. The simulator's tile is the coffee
// segment's own small sketch.
//
// WHERE IT SITS. Last. The chess segment comes before it, and its first line now says a song is
// coming ("One more game before the song."). The opening here states its own fact and reads its
// own card, so it leans on no other segment. After the song's button and tag Larry says
// goodnight: two lines, the last words of the episode, and then the night's applause. If the
// chess segment still carries the long applause it had as the close, one of the two should go.
//
// MUSIC, FOR THE BUILDER AND THE SOUND EDITOR. Four blocks, all at bpm 66 with swing 0.33.
// One block beat is TWO beats of the song (the song is felt at 132), so that the beatbox
// grid's sixteenths are the song's swung eighths. If the engine's swing does not delay the
// off-sixteenths, set swing to 0: nothing else depends on it. One turnaround is four block
// beats: C, A minor, F, G, a block beat each (D, B minor, G, A after the key change).
//   doo-wop  33.5 beats. Al alone for two beats ("doo, wop" on each root); Pete's brushes and
//            Dee's "ooh" from beat 2; the lead from beat 4, one line to a turnaround:
//            4 cat · 8 simulator · 12 wheelie · 16 hook · 20 mug · 24 mug in the simulator ·
//            28 hook, and the chord on beat 32.
//   vamp     4 beats, bass and "ooh" only, stopping on G: the chord that wants one more note.
//            Hy and Larry speak over it; the timing is by estimate (see the note at the block).
//   lift     10.5 beats in D, the key of Larry's note. Beat 0 is one "wop" on A7 from the
//            band, answering his "doo". Hook from 0.5, again from 4.5, last chord at 8.5. Larry
//            has one note (D3). He sings it on the three chords it fits (D, B minor, G) and
//            waits through the fourth (A).
//   tag      one beat: "doo" from Al, "wop" from Dee. It is the song's sting.
// Al's notes are written at pitch (the studio now tunes a voice with fry). Ranges: Hy 64 to 71,
// Dee 69 to 74, Al 41 to 50, Larry 50. No shouts, no kick, no claps. The lead is to be sung an
// octave down by a bass voice (the owner's choice): that is the sound editor's, and the note
// names here are as written.
// Cues after a block are placed by beat, counted back from the block's end (0.909 s a beat).
//
// Pronunciation and timing fields are the sound editor's. Five lines carry none, being new
// text: `coffee`, `mug` and `mug-too` in the song, and `happy-week` and `goodnight` at the end.
// "Samantha" is sung, in the lead: it wants hearing.
export default {
  id: 'music-alt',
  title: 'Music: Best We Can Doo-Wop',
  gap: 0.28,
  beats: [
    // ---- the fact, and the throw
    // Picture: Larry at the desk. Beside him Dave's post as a card, whole: Dave · @dave.9000ish.uk ·
    // 17 Nov 2026 · 20 likes · REPLY. Three short lines: best i can do / polyhedral coffee simulator /
    // polycoffee.9000ish.uk. The address stays on the card; it is the credit.
    { cue: 'dave-card', at: 0.3 },
    { say: 'larry', id: 'posted', text: 'This week a whole coffee simulator was posted by Dave. Above it:', rate: 0.9 },
    // read aloud, exact, cut after its first line (the card shows the post whole and lights these four words):
    // at://did:plc:hovt6k22s64dq63jjmoyibk3/app.bsky.feed.post/3n2jrgrxtss2w
    // occasion: Dave's reply to a member's remark under a video, at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2jnbmrlx22j
    { say: 'larry', id: 'four-words', text: 'best i can do …', as: 'best eye can do …', rate: 0.92, gap: 0.3 },
    // Picture: the card slides to the edge of the frame and stays, small. The band's corner: Hy
    // nearest the desk, an empty music stand in front of the band.
    { cue: 'band-in', at: 0.2 },
    { say: 'larry', id: 'ask-band', text: 'Hy. What is the best the band can do?' },
    // Picture: on Hy's note a plain card lands on the band's stand: DOO. Hy sings it straight,
    // one note, no expression, as an answer.
    { cue: 'card-doo', at: 0.45 },
    { sing: 'hy-bass', id: 'doo', bpm: 66, lyrics: 'doo', notes: [[67,1]], transpose: -12, vibrato: 0, gap: 0.45 },
    { say: 'larry', id: 'anything-else', text: 'Is there anything else?', gap: 0.5 },
    // Picture: on Dee's note a second card beside the first: WOP. Over the two cards, a small
    // label, a glance: BEST WE CAN DO.
    { cue: 'card-wop', at: 0.3 },
    { sing: 'dee', id: 'wop', bpm: 66, lyrics: 'wop', notes: [[72,.4]], vibrato: 0, gap: 0.3 },
    { sfx: 'laugh', at: 0.15, hold: 0.5 },

    // ---- the song. Picture at beat 0: the lights drop to one warm spot on Al, alone, singing the
    // two cards over and over as if that were plenty.
    { cue: 'spot-al', at: 0.25 },
    { music: { id: 'doo-wop', bpm: 66, swing: 0.33, tracks: [
      // the lead: one line to a turnaround, a syllable to a beat of the song, the last one held
      { who: 'hy-bass', id: 'cat', caption: true, transpose: -12, start: 4, vibrato: 20,
        lyrics: 'someone built a cat that sings', as: 'someone, built a cat that sings',
        notes: [[67,.5],[67,.5],[69,.5],[67,.5],[69,.5],[69,.5],[71,.75]] },
      // the member's own word for the thing: eight syllables, the last one short
      { who: 'hy-bass', id: 'coffee', caption: true, transpose: -12, start: 8, vibrato: 20,
        lyrics: 'someone built a simulator',
        notes: [[67,.5],[67,.5],[69,.5],[67,.5],[69,.5],[65,.5],[67,.5],[67,.25]] },
      { who: 'hy-bass', id: 'wheelie', caption: true, transpose: -12, start: 12, vibrato: 20,
        lyrics: 'loader popping wheelies too', as: 'loader popping wheelies, too',
        notes: [[67,.5],[64,.5],[69,.5],[67,.5],[69,.5],[65,.5],[67,.75]] },
      // the hook: "do" is held across the change, and the band's "wop" lands on it
      { who: 'hy-bass', id: 'hook-1', caption: true, transpose: -12, start: 16, vibrato: 20,
        lyrics: 'best we can do-wop, doo-wop',
        notes: [[67,.5],[69,.5],[67,.5],[69,1],[65,.35],[0,.15],[71,.5],[67,.3]] },
      // whose mug it is, in the lyric: the name's three syllables share the first beat, swung
      { who: 'hy-bass', id: 'mug', caption: true, transpose: -12, start: 20, vibrato: 20,
        lyrics: 'Samantha showed a morning mug',
        notes: [[67,.33],[69,.42],[67,.25],[69,.5],[67,.5],[69,.5],[69,.5],[71,.75]] },
      { who: 'hy-bass', id: 'mug-too', caption: true, transpose: -12, start: 24, vibrato: 20,
        lyrics: 'simulator has it too', as: 'simulator has it, too',
        notes: [[67,.5],[64,.5],[69,.5],[67,.5],[69,.5],[65,.5],[67,.75]] },
      { who: 'hy-bass', id: 'hook-2', caption: true, transpose: -12, start: 28, vibrato: 20,
        lyrics: 'best we can do-wop, doo-wop, doo',
        notes: [[67,.5],[69,.5],[67,.5],[69,1],[65,.35],[0,.15],[71,.5],[67,.35],[0,.15],[64,1.5]] },
      // the alto: "ooh" on every chord from beat 2; the tail of the first hook a third above the
      // lead; the whole of the second hook a third above
      { who: 'dee', id: 'pads', start: 2, vibrato: 12, vol: 0.45,
        lyrics: 'ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh ooh wop doo wop ooh ooh ooh ooh ooh ooh ooh ooh best we can do wop doo wop doo',
        notes: [[72,1],[71,1],
                [72,1],[72,1],[72,1],[71,1],[72,1],[72,1],[72,1],[71,1],[72,1],[72,1],[72,1],[71,1],
                [72,1],[72,1.5],[69,.35],[0,.15],[74,.5],[71,.35],[0,.15],
                [72,1],[72,1],[72,1],[71,1],[72,1],[72,1],[72,1],[71,1],
                [71,.5],[72,.5],[71,.5],[72,1],[69,.35],[0,.15],[74,.5],[71,.35],[0,.15],[72,1.5]] },
      // the bass: the band's two syllables on every root, eight turnarounds, then the chord
      { who: 'al', id: 'bass', vibrato: 8, vol: 0.55,
        lyrics: 'doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo',
        notes: [[48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2],
                [48,1.5]] },
      // brushes: a hat on each beat of the song, a soft rim on two and four, a swung hat after it
      { who: 'pete', id: 'brushes', start: 2, beat: 't . K t ', loops: 30, vol: 0.4 },
    ] } },
    // The block is 33.5 beats. These land on beats 2, 4, 8, 12, 16, 20, 26.5, 28 and 32.
    // sway: the spot widens to the whole band in a line, swaying side to side together; a string
    //   of round bulbs behind them; the camera drifts slowly sideways. The genre is in the lights.
    { cue: 'sway', at: -28.636 },
    // tile-cat: above the band a row begins. Tile one: plain cat ears. CAT VOICE · David ·
    //   @yonderdavid.bsky.social, and under it, small: with a chimera-vocal-synth quartet.
    { cue: 'tile-cat', at: -26.818 },
    // tile-coffee: tile two, the coffee segment's own small sketch of the simulator.
    //   POLYHEDRAL COFFEE SIMULATOR · Dave · polycoffee.9000ish.uk
    { cue: 'tile-coffee', at: -23.182 },
    // tile-wheelie: tile three: two plain wheels, one of them off the ground.
    //   WHEELIE GAME · cee · yard-shift.cee.wtf
    { cue: 'tile-wheelie', at: -19.545 },
    // ours: the camera comes down from the row of three tiles to the band's stand and its two
    //   cards under BEST WE CAN DO. Each card hops on its own syllable.
    { cue: 'ours', at: -15.909 },
    // tile-mug: a fourth tile, smaller than the other three: a mug in outline, nothing drawn on it.
    //   MUG · Samantha · @samantha.wiki
    { cue: 'tile-mug', at: -12.273 },
    // mug-in, on the sung word "it": the mug hops out of Samantha's tile and lands inside the
    //   simulator's tile, beside the kettle. A tag on that tile, a glance: + MUG · ADDED BY DAVE.
    //   (Dave's reply to the mug post: at://did:plc:hovt6k22s64dq63jjmoyibk3/app.bsky.feed.post/3n2lmuj26k22w)
    { cue: 'mug-in', at: -6.364 },
    { sfx: 'aww', at: -6.0, hold: 0, vol: 0.5 },
    // ours-again: the two cards again, and now the four tiles and the two cards share one frame,
    //   all drawn the same size.
    { cue: 'ours-again', at: -5 },
    // chord: the band holds the chord and looks pleased with it.
    { cue: 'chord', at: -1.364 },

    // ---- the bridge: the question goes back where it came from.
    // Picture: the bulbs dim to one spot. Hy turns to the desk. Larry stays at the desk for the
    // rest of the song; an empty music stand has been put in front of him.
    { cue: 'to-desk', at: 0.15 },
    { music: { id: 'vamp', bpm: 66, gap: 0.15, tracks: [
      { who: 'al', id: 'vamp-bass', vibrato: 8, vol: 0.4,
        lyrics: 'doo wop doo wop doo wop doo wop',
        notes: [[48,.5],[48,.3],[0,.2],[45,.5],[45,.3],[0,.2],[41,.5],[41,.3],[0,.2],[43,.5],[47,.3],[0,.2]] },
      { who: 'dee', id: 'vamp-pads', vibrato: 12, vol: 0.3,
        lyrics: 'ooh ooh ooh ooh',
        notes: [[72,1],[72,1],[72,1],[71,1]] },
    ] } },
    // The vamp is 3.6 s and the two lines below are spoken over it: the cursor goes back to just
    // after its first beat. By estimate "I only host." ends as the vamp does. If the lines run
    // short the vamp simply finishes under the silence; nothing after this can start before it ends.
    { wait: -3.6 },
    { say: 'hy', id: 'your-best', text: 'Larry. Best you can do?' },
    { say: 'larry', id: 'only-host', text: 'I only host.', rate: 0.9 },
    // waiting: the vamp has stopped on the chord that wants one more note, and nobody sings it.
    //   Every head in the band is turned to the desk. Nothing moves. No audience sound.
    { cue: 'waiting', at: 0.2 },
    // larry-card, on his note: a card lands on the stand in front of him: DOO.
    { cue: 'larry-card', at: 1.3 },
    // One low note, straight, a little unsure. It is a D, and the chord was waiting for a C.
    { sing: 'larry', id: 'larry-doo', bpm: 66, lyrics: 'doo', notes: [[50,1.3]], vibrato: 0, gap: 1.3 },
    { wait: 0.5 },
    { say: 'hy', id: 'work-with', text: 'We can work with that.', rate: 0.94 },
    { sfx: 'laugh', at: 0.1, hold: 0 },

    // ---- the lift: the song moves to the key of his note.
    { music: { id: 'lift', bpm: 66, swing: 0.33, gap: 0.2, tracks: [
      // beat 0: the band's "wop" to his "doo", on the chord that leads to his note
      { who: 'hy-bass', id: 'wop-hit', caption: true, transpose: -12, vibrato: 10, vol: 1.1,
        lyrics: 'wop',
        notes: [[67,.5]] },
      // the hook's own tune, in D, with "we" changed to "you"
      { who: 'hy-bass', id: 'hook-3', caption: true, transpose: -12, start: 0.5, vibrato: 20,
        lyrics: 'best you can do-wop, doo-wop', as: 'best you can, do-wop, doo-wop',
        notes: [[69,.5],[71,.5],[69,.5],[71,1],[67,.35],[0,.15],[64,.5],[69,.3]] },
      { who: 'hy-bass', id: 'hook-4', caption: true, transpose: -12, start: 4.5, vibrato: 20,
        lyrics: 'best you can do-wop, doo-wop, doo',
        notes: [[69,.5],[71,.5],[69,.5],[71,1],[67,.35],[0,.15],[64,.5],[69,.35],[0,.15],[66,2]] },
      // the alto on top: the hit, both hooks above the lead, the top of the last chord
      { who: 'dee', id: 'lift-top', vibrato: 14, vol: 0.5,
        lyrics: 'wop best you can do wop doo wop best you can do wop doo wop doo',
        notes: [[73,.5],
                [74,.5],[74,.5],[74,.5],[74,1],[71,.35],[0,.15],[73,.5],[73,.35],[0,.15],
                [74,.5],[74,.5],[74,.5],[74,1],[71,.35],[0,.15],[73,.5],[73,.35],[0,.15],
                [74,2]] },
      // the bass: the hit on A, two turnarounds in D, the last chord
      { who: 'al', id: 'lift-bass', vibrato: 8, vol: 0.55,
        lyrics: 'wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo wop doo',
        notes: [[45,.5],
                [50,.5],[50,.3],[0,.2],[47,.5],[47,.3],[0,.2],[43,.5],[43,.3],[0,.2],[45,.5],[49,.3],[0,.2],
                [50,.5],[50,.3],[0,.2],[47,.5],[47,.3],[0,.2],[43,.5],[43,.3],[0,.2],[45,.5],[49,.3],[0,.2],
                [50,2]] },
      // Larry: his one note on the first three chords of each turnaround, a wait through the
      // fourth, then held under the last chord
      { who: 'larry', id: 'lift-larry', start: 0.5, vibrato: 0, vol: 0.7,
        lyrics: 'doo doo doo doo doo doo doo',
        notes: [[50,.5],[0,.5],[50,.5],[0,.5],[50,.5],[0,1.5],[50,.5],[0,.5],[50,.5],[0,.5],[50,.5],[0,1.5],[50,2]] },
      { who: 'pete', id: 'lift-brushes', start: 0.5, beat: 't . K t ', loops: 8, vol: 0.45 },
    ] } },
    // The block is 10.5 beats. These land on beats 0, 0.5, 4.5 and 8.5.
    // key-change: every bulb comes on at once. A tag, a glance: NEW KEY · LARRY'S NOTE.
    { cue: 'key-change', at: -9.545 },
    { sfx: 'woo', at: -9.0, hold: 0, vol: 0.6 },
    // to-larry: the band sings the hook at the desk. The label over the band's cards now reads
    //   BEST YOU CAN DO. Larry sings his note on each chord it fits and sits out the one it does not.
    { cue: 'to-larry', at: -9.091 },
    // to-camera, on the second "you": the band turns from the desk to the lens and sings it at
    //   the viewer. Larry's card DOO has joined the row, the same size as the tiles.
    { cue: 'to-camera', at: -5.455 },
    // last-chord: four voices, and Larry's note is the bottom of it.
    { cue: 'last-chord', at: -1.818 },
    { sfx: 'applause', at: -0.9, hold: 0.3 },

    // ---- button. Picture: Larry at the desk, the card DOO propped in front of him like a nameplate.
    { cue: 'desk', at: 0.3 },
    { say: 'larry', id: 'button', text: 'I do what I can.', as: 'I, do what I cann.', rate: 0.9, gap: 0.45 },
    // two-heads: Al and Dee lean into the edge of the frame for one syllable each.
    { cue: 'two-heads', at: 0.15 },
    { music: { id: 'tag', bpm: 66, gap: 0.15, tracks: [
      { who: 'al', id: 'tag-doo', vibrato: 8, vol: 0.6,
        lyrics: 'doo',
        notes: [[50,.5]] },
      { who: 'dee', id: 'tag-wop', start: 0.5, vibrato: 0, vol: 0.5,
        lyrics: 'wop',
        notes: [[74,.35]] },
    ] } },
    { sfx: 'laugh', at: 0.1, hold: 0.5 },

    // ---- the goodnight: two lines, Larry's, the last words of the episode.
    // toast: Larry at the desk, as for the button, the card DOO still propped in front of him. On
    //   the word "week" the card tips toward the lens, the way a glass is raised, and sits back.
    { cue: 'toast', at: 0.5 },
    { say: 'larry', id: 'happy-week', text: 'Happy polyhedra week.', as: 'Happy polly-hee-dra week.', gap: 0.5 },
    // last-picture, on "Good night": the widest shot of the night, and the last picture of the
    //   episode. Larry at the desk with his card; the band in its line with its two cards on the
    //   stand; the row of four credited tiles above them; every bulb on. Nothing goes dark and
    //   nothing moves but the band, still swaying a little. It holds under the applause, and the
    //   credits come up over it.
    { cue: 'last-picture', at: 0.4 },
    { say: 'larry', id: 'goodnight', text: 'Good night, everybody.', gap: 0.4 },
    { sfx: 'applause-long', at: 0.3, hold: 0.3 },
  ],
}
