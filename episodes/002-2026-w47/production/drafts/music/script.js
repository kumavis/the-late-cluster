// Music: "The Plan, With Caterwauling". A folk lament, 83 s as rendered.
//
// The joke is the song's form. A maker posted the plan for a song: a melancholic folk song with
// caterwauling, whose lead singer "would end by expressing anger at the cat". The band performs
// that plan in a tune of its own. The caterwauling gets worse, the angry last verse is announced,
// and then the cat comes in dead in tune and the verse is called off. The maker's next post, read
// aloud, turns out to say the same thing happened to the maker.
//
// Real words: two posts by David (@yonderdavid.bsky.social), read aloud by Sibyl as the posts they
// were, each with its card up and its words lighting as she says them. Nobody's puppet speaks.
// Everything sung is the band's own words and the band's own tune. The maker's song is not sung,
// quoted or named, and neither is any other real piece of music.
//
// The cat is Plosive Pete. The lament has no percussion at all, so the percussionist is free, and
// the house has no cat voice of its own. His yowls are sung notes inside the music blocks, over
// the bars the band is holding. He never speaks.
//
// Music, for the builder (two blocks, both 3/4 at 132, one syllable per note):
//   lament  A minor. Beats 0 to 2 are the bass alone. The lead enters on beat 3. The bass holds
//           the floor all the way and the alto only sings on the held chords.
//           yowl 1   beat 24, 2 beats, sour, after "no cat"
//           yowl 2   beat 39, 7.5 beats, the highest and longest, answering the question;
//                    the alto and the bass drop out at beat 42 and leave him alone
//           beat 47.5 one small rising meow into the silence
//   ending  The lead starts the angry verse alone on one stern note (beats 0 to 5). Pete answers
//           at beat 7 with a small falling meow that is exactly in tune. The alto and the bass
//           come in under it at beat 9 and it is a major chord, the first in the song. The lead
//           gives up and sings the refrain's own tune, alone, with one word changed (beats 12 to
//           20). Last chord at beat 21: bass, lead, alto, and the cat on the high part.
// The cues after each block are placed by beat, counted back from the block's end.
export default {
  id: 'music',
  title: 'Music: The Plan, With Caterwauling',
  gap: 0.28,
  beats: [
    // ---- Larry sets it up: the fact, then who fixed it
    // Four tiles on a board, drawn as the studio's sketch: SONGBIRD, SEAL, ALLIGATOR, ELEPHANT,
    // and a fifth frame left empty. The list is the bestiary in the synth's readme, as shown in
    // the screenshot David posted (its alt text):
    // at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n27zewdpe223
    { cue: 'bestiary', at: 0.6 },
    { say: 'larry', id: 'four', text: 'The vocal synth can sing like four animals. Not one of them is a cat.' },
    // Credit, glance-sized, kept up until the band starts: the synth by its name
    // (chimera-vocal-synth), and CAT VOICE AND QUARTET · David · @yonderdavid.bsky.social.
    // The video is credited, never shown or redrawn: nobody on the show has seen it.
    // at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cffuxxv22n
    { cue: 'credit', at: 0.3 },
    { say: 'larry', id: 'built', text: 'This week, one was built by David.' },
    { say: 'larry', id: 'to-sibyl', text: 'Here is the plan for its first song. Sibyl?' },

    // ---- the plan, read aloud exactly, as the post it was (one post, cut at the start with an
    // ellipsis, split at its own sentence break into two beats with nothing between them).
    // read aloud, verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crbcfzuk2z
    // occasion: a reply by the maker in the thread under the maker's own quartet video, to a
    // member who had imagined a version with worse cat noises; the parent is recorded in this
    // draft's sources. The card shows exactly the two sentences spoken, with the ellipsis.
    { cue: 'plan-card', at: 0.1 },
    { say: 'sibyl', id: 'plan-1', text: '… the new plan was an older melancholic folk song with caterwauling.',
      as: '… the new plan was ann older melancholic folk song with cat-a-walling.', rate: 0.94 },
    // the same post, its last sentence
    { say: 'sibyl', id: 'plan-2', text: 'The lead singer would end by expressing anger at the cat.', gap: 0.2 },
    { sfx: 'chuckle', at: 0.15, hold: 0.9 },
    { cue: 'plan-card-out', at: 0.1 },

    // ---- the throw, and the casting
    { say: 'larry', id: 'to-band', text: 'Hy, can you do that plan?', as: 'High, can you do that plan?', gap: 0.35 },
    { cue: 'band-in', at: 0.1 },
    { say: 'hy', id: 'casting', text: 'Pete. You are the cat.' },
    // two paper ears land on Pete on the word "cat"
    { cue: 'ears', at: -0.5 },
    { sfx: 'laugh', at: 0.15 },

    // ---- the lament. Label while it plays, glance-sized: THE PLAN · THE BAND'S OWN TUNE.
    // The bird tile and the seal tile light on their words; the empty fifth frame on "no cat".
    { music: { id: 'lament', bpm: 132, tracks: [
      { who: 'hy', id: 'v1', caption: true, start: 3, vibrato: 18,
        lyrics: 'the bird can sing, the seal can sing, but there is no cat',
        notes: [[64,1],[69,2],[71,1],[71,2],[69,1],[67,2],[69,1],[67,2],[64,1],[71,2],[69,1],[67,3],[69,2]] },
      { who: 'hy', id: 'v2', caption: true, start: 27, vibrato: 18,
        lyrics: 'and who can take the high part now',
        notes: [[64,1],[69,2],[71,1],[71,2],[69,1],[71,2],[69,1],[71,2]] },
      // the alto: only on the two held chords, under the yowls
      { who: 'dee', vibrato: 14, vol: 0.4,
        lyrics: 'ooh ooh',
        notes: [[0,22],[72,4],[0,11],[74,5]] },
      // the bass: the drone and the changes (A minor, C, G, A minor; then A minor, E minor, G).
      // Al's notes are written sharp on purpose. Measured in this studio, his voice sings flat by
      // about two semitones, more as he goes up (it is the fry in his voice: without it he is in
      // tune). So 47.3 sounds A2, 45.1 sounds G2, 50.55 sounds C3 and 41.75 sounds E2. If the
      // studio ever corrects his pitch, these go back to 45, 43, 48 and 40.
      { who: 'al', vibrato: 8, vol: 0.5,
        lyrics: 'oh oh oh oh oh oh oh oh',
        notes: [[47.3,3],[47.3,7],[50.55,6],[45.1,6],[47.3,5],[47.3,7],[41.75,3],[45.1,5],[0,8]] },
      // the cat: wide vibrato, notes that droop by semitones and belong to no chord in the song
      { who: 'pete', id: 'yowls', vibrato: 90, vol: 0.7,
        lyrics: 'meow ~ meow ~ ~ ~ ~ meow',
        notes: [[0,24],[77,0.5],[82,1],[81,0.5],
                [0,13],[81,0.5],[88,2.5],[87,1],[86,1],[85,1],[84,1.5],
                [0,1],[76,0.5],[79,1]] },
    ] } },
    // the block is 50 beats; these land on beats 24, 39, 42 and 47.5
    { cue: 'yowl-1', at: -11.818 },
    { cue: 'yowl-2', at: -5 },
    { cue: 'band-stops', at: -3.636 },
    { cue: 'lone-meow', at: -1.136 },
    { sfx: 'laugh', at: 0.1, hold: 0.85 },

    // ---- the stop: the ending the plan asked for is announced
    { say: 'hy', id: 'windup', text: 'Last verse. Now I get angry at the cat.', gap: 0.35 },

    // ---- the ending. No crowd sound until the last chord has rung.
    { music: { id: 'ending', bpm: 132, tracks: [
      { who: 'hy', id: 'angry', caption: true, vibrato: 10, vol: 1.1,
        lyrics: 'now hear me, cat',
        notes: [[64,1],[64,2],[64,1],[64,2]] },
      // the refrain's own tune, with "no" changed to "a"
      { who: 'hy', id: 'last', caption: true, start: 12, vibrato: 18,
        lyrics: 'and there is a cat',
        notes: [[64,1],[71,2],[69,1],[67,3],[69,2]] },
      { who: 'hy', id: 'last-hold', start: 21, vibrato: 18, vol: 0.8,
        lyrics: 'oh',
        notes: [[69,6]] },
      // the cat, straight tone: a falling third onto the major third, then the top of the last chord
      { who: 'pete', id: 'meow-in-tune', vibrato: 12, vol: 0.6,
        lyrics: 'meow meow',
        notes: [[0,7],[76,1],[73,3],[0,10],[76,0.5],[76,5.5]] },
      { who: 'dee', vibrato: 14, vol: 0.5,
        lyrics: 'ooh ooh',
        notes: [[0,9],[69,2],[0,10],[73,6]] },
      // the bass, written sharp as above: A2 under the first chord, silent under the refrain
      // (the lead sings it alone), A2 under the last chord
      { who: 'al', vibrato: 8, vol: 0.6,
        lyrics: 'oh oh',
        notes: [[0,9],[47.3,2],[0,10],[47.3,6],[0,1]] },
    ] } },
    // the block is 28 beats; these land on beats 7, 9 and 21
    { cue: 'in-tune', at: -9.545 },
    { cue: 'chord', at: -8.636 },
    { cue: 'last-chord', at: -3.182 },
    { sfx: 'aww', at: -1.0, hold: 0, vol: 0.6 },

    // ---- the turn, in two words
    { say: 'hy', id: 'never-mind', text: 'Never mind.', rate: 0.92, gap: 0.5 },
    { sfx: 'laugh', at: 0.15, hold: 0.9 },

    // ---- what the maker posted next, read aloud exactly and whole, as the post it was.
    // read aloud, verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crcmiaxs2z
    // occasion: the maker's own next post, 44 seconds after the plan and in reply to it:
    // at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crbcfzuk2z
    { cue: 'verdict-card', at: 0.1 },
    { say: 'sibyl', id: 'next-post', text: 'The next post from David.', gap: 0.35 },
    { say: 'sibyl', id: 'verdict', text: 'But then I ended up with yowls that fit well enough that the cat deserved no such anger.',
      as: 'But then I ended up with yowls that fit well enough that the cat deezerved no such anger.', rate: 0.95 },

    // ---- button: the number from Larry's first line. The fifth frame fills on "five":
    // CAT · by David. It is the maker's cat that is counted, not Pete.
    { cue: 'fifth-tile', at: 0.45 },
    { say: 'larry', id: 'button', text: 'Now it can sing like five animals.', rate: 0.92, gap: 0.45 },
    { sfx: 'sting', at: 0.3 },
    { sfx: 'applause', at: -1.2, hold: 0.2 },
  ],
}
