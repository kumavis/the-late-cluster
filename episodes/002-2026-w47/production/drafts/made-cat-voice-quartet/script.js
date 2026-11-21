// made-cat-voice-quartet: "One Click". A demonstration, drafted for 002-2026-w47 from idea writer-2-55.
// Format: packages/show/tools/README.md. What the builder needs is in notes.json beside this file.
//
// What happened (card made-cat-voice-quartet): David, yonderdavid.bsky.social, made a voice
// synthesizer sing a folk song. A member asked whether it was now a pipeline to click on, and asked
// for a second song, "Factory Girl". David posted it, with an account of what the click had taken.
//
// No puppet of a real account speaks. David's two posts are read aloud, exactly, by Sibyl, each on
// its post card. The member who asked is not named, shown or voiced: Larry says what was asked in
// his own words. Nobody is given a pronoun.
//
// The episode's experiment is the music block "pipeline": 12.5 seconds with no spoken or sung word
// and no crowd sound, in which the studio's sketch of the pipeline is clicked and does the segment's
// turn itself. No line before it says what the click took, and no line after it says what was seen.
export default {
  id: 'made-cat-voice-quartet',
  title: 'One Click',
  gap: 0.3,
  beats: [
    // ---- The setup. Larry at the desk. He takes the question as good news.
    { say: 'larry', id: 'open', text: 'This week, a synthesizer sang folk songs. It was taught by David.' },
    // cue credit, on "David": the maker's credit comes up and stays up to the end of the segment
    // (DAVID, yonderdavid.bsky.social), and beside it a very small stage with its door shut.
    { cue: 'credit', at: -0.45 },
    { say: 'larry', id: 'ask', text: 'A member asked for one more. Factory Girl.' },
    // cue title, on "Factory Girl": the small stage's sign lights, FACTORY GIRL. The door stays shut.
    { cue: 'title', at: -0.9 },
    // What was asked, in Larry's words. The post is not shown:
    // at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2ckbmplk22v
    { say: 'larry', id: 'question', text: 'And one question. Is this a pipeline now?' },
    { say: 'larry', id: 'one-click', rate: 0.96, text: 'One click, and out comes a song?' },
    // cue button-in, on "click": one big button marked CLICK and one box marked 1 draw on, joined by
    // a short pipe to the small stage. The drawing is labelled STUDIO SKETCH, and that label is how
    // the viewer knows whose button this is: Larry does not say it.
    { cue: 'button-in', at: -1.95 },
    // cue pointer: a pointer arrow in Larry's gold slides to the button and waits.
    { cue: 'pointer', at: 0.1 },
    { say: 'larry', id: 'order', rate: 0.94, text: 'I would like a song.' },

    // ---- The wordless stretch (the experiment). Twenty beats at 100, 12 seconds. Nobody speaks or
    // sings a word; the audience is silent; Larry only watches. The band is the sound of the
    // machine: every box that joins is one more Formant humming, and the chord (G, D, B) is not
    // whole until the fourth.
    //   beat 0   click     the pointer clicks CLICK (Pete's lip pop). Box 1 lights.
    //   beat 1             nothing. The door of the small stage stays shut.
    //   beats 2, 3         two thin ticks from box 1. Larry looks at the door, then at us.
    //   beat 4   box-2     a second box rolls in and couples, pushing the stage away. Al hums.
    //   beat 8   box-3     a third. Dee hums. The camera has had to pull back.
    //   beat 12  box-4     a fourth, the biggest. Hy hums. The pipeline now crosses the studio.
    //   beat 16  door-open the door opens: two small heads, two fiddles and a cello, bows raised.
    //   beat 20            the sound stops. The stretch is over; the reaction comes after it.
    { music: { id: 'pipeline', bpm: 100, tracks: [
      { who: 'pete', vol: 0.9,
        beat: 'P! . . . | . . . . | t . . . | t . . . | B . t . | t . t . | t . t . | t . t . | B . t . | t . t . | B . t . | t . t . | B . t . | Pf . t . | B . t . | Pf . t . | kch . . . | B . Pf . | B . Pf . | B . . .' },
      { who: 'al', vol: 0.4, start: 4, loops: 4, beat: 'm:43 . . . | m:43 . . . | m:43 . . . | m:43 . . .' },
      { who: 'dee', vol: 0.32, start: 8, loops: 3, beat: 'm:62 . m:62 . | m:62 . m:62 . | m:62 . m:62 . | m:62 . m:62 .' },
      { who: 'hy', vol: 0.36, start: 12, loops: 2, beat: 'm:59 . . . | . . . . | m:59 . . . | . . . .' },
    ] } },
    // The block has just ended, so these offsets count back from beat 20 (0.6 s a beat).
    { cue: 'click', at: -12.0 },
    { cue: 'box-2', at: -9.6 },
    { cue: 'box-3', at: -7.2 },
    { cue: 'box-4', at: -4.8 },
    { cue: 'door-open', at: -2.4 },
    { sfx: 'ding', at: -2.4, hold: 0 },

    // ---- After it. The first crowd sound since the click.
    { sfx: 'applause', at: 0.3, hold: 0.45 },
    // The setup for the reply: the question again, in two words, with nothing between it and the post.
    { say: 'larry', id: 'setup-reply', text: 'One click? Here is the reply from David.' },
    // Read aloud by Sibyl as the post it was, card up from the first word to the last, words lighting.
    // The card shows what is read, cut marked. The sentence cut is the one the stretch drew.
    // read aloud, verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2fmuqiess24 · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2fmuoefz224
    { say: 'sibyl', id: 'reply-1', rate: 0.95, gap: 0.4,
      text: 'So there was a simple pipeline repetition version, but I could hardly inflict it on you or the innocent bystanders who might happen upon it. …' },
    // cue bystanders: Larry turns from the card to the audience.
    { cue: 'bystanders', at: 0.2 },
    { say: 'larry', id: 'bystanders-hello', rate: 0.92, gap: 0.45, text: 'Hello, innocent bystanders.' },
    { sfx: 'chuckle', at: 0.15 },
    // The next post of the same reply, read whole across two beats, split at its own sentence break
    // with no line between. The card shows the post whole. The two marks only tell the tools that
    // each beat is part of one post; nothing is cut.
    // read aloud, verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2fmuqiest24 · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2fmuqiess24
    { say: 'sibyl', id: 'reply-2a', rate: 0.9,
      text: 'By such applications of beeswax and string I obtained this version, which one might call distinguishable from a polished one. …',
      as: 'By such applications of bee-swax, and string, I obtained this version, which one might call distinguishable from a polished one. …' },
    // cue wax-string, on "beeswax and string": a blob of wax lands on every joint of the pipeline and
    // one loop of string goes round all four boxes. Neither was in the drawing before these words.
    { cue: 'wax-string', at: -6.95 },
    // read aloud, verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2fmuqiest24 · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2fmuqiess24
    { say: 'sibyl', id: 'reply-2b', rate: 0.92, gap: 0.45, text: '… But the bowing is improved.', as: '… But the bo-wing is improved.' },
    // cue bows, on "bowing": on the small stage the three bows draw one long stroke together.
    { cue: 'bows', at: -1.38 },
    { sfx: 'laugh', at: 0.15 },
    { say: 'larry', id: 'button', rate: 0.92, gap: 0.4, text: "I'd have opened with the bowing.", as: 'I-would have opened with the bowing.' },
    { sfx: 'sting', at: 0.1 },
  ],
}
