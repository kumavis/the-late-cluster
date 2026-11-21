// made-pen-plotter-replies: "One Pen". A demonstration, at the desk and at the page.
// The thing: @samantha.wiki's pen plotter, which wrote the replies to one post on paper on
// Saturday 14 November (stream.place/samantha.wiki). The studio draws its own sketch of it and lets
// it write real replies. Cards: made-pen-plotter-replies, voices-plotter-queue-small-accounts.
//
// Real people. Samantha (the maker) is shown and read aloud, never voiced. ver.ooo's puppet says one
// line, its own reply, to the reply it answered. Sophie's reply is read aloud as the post it was.
// Every real post here is in sources.json.
//
// Trim (the owner's notes, 21 November 2026; what was removed is kept in production/trim.md).
// Cut 1: the segment ends on `nothing-less` and its laugh. austin's reply, the wordless pen run and
// the three-hundred exchange are out, and with them this segment's ten seconds with no words: the
// episode's experiment no longer runs here.
// The opening: the pen writes the show's title during the hum `in-hum` (the note above that block).
//
// Pete is the pen's motor throughout: every hum is a beat track, one sixteenth to a letter.
//
// Assembly (episode 002-2026-w47). This is the first segment, and it carries the episode's open:
// the pen is over the sheet from the first frame, Sibyl says the title and the host over it, and
// Larry's first words are the material. There is no separate open segment.
// The maker's posts are read, never performed: each one has its card up before a word of it is
// said, and the house line before it says the post is Samantha's ("one post. All three belong to
// Samantha.", "One of them got this, from Samantha.", "Back came this, from Samantha."). A reading
// is paced as a reading (rate 0.92) and the reader looks at the card, not at the guest.
// Sophie's reply is intoned by Sibyl in a music block (see the note at `meow-read`).
export default {
  id: 'made-pen-plotter-replies',
  title: 'One Pen',
  gap: 0.28,
  beats: [
    // ---- the thing, and the invitation
    { cue: 'plotter-in' },                                   // the studio's sketch, whole from the first frame: one pen over one blank sheet; the maker's credit comes on at `host`, not here, and stays
    // The pen writes the show's title (the owner's note, 21 November 2026): The Late Cluster, on the
    // top line of the sheet. 14 letters and 2 spaces, one sixteenth each, as everywhere in this
    // segment: 16 sixteenths at 120 bpm, 2.0 s. Beat 0 falls 0.1 s after the cursor, so the pen
    // touches down at 0.4 s, and every step is 0.125 s:
    //   steps 1 to 3     T h e            0.400 to 0.775 s   hum m:52
    //   step 4           the space        0.775 to 0.900 s   the pen is up; no hum
    //   steps 5 to 8     L a t e          0.900 to 1.400 s   hum m:47
    //   step 9           the space        1.400 to 1.525 s   the pen is up; no hum
    //   steps 10 to 16   C l u s t e r    1.525 to 2.400 s   hum m:52
    // The r is down at 2.4 s and the pen lifts. Sibyl starts 0.1 s later, at 2.5 s, so the whole title
    // is on the paper before she names it, while she names it and when her line ends (about 5.1 s).
    // The title is the show's own writing on the studio's own sketch: nothing on screen says the
    // maker's plotter wrote it. At `host` the sheet beside Larry is blank again, because his next line
    // calls the sheet Samantha's, and her sheet held replies and nothing of ours.
    // The hum was 8 sixteenths, 1.0 s ('m:47 . . . m:52 . . .'). It is 16 now: 1.0 s longer, the least
    // that gives every letter its sixteenth. Every beat after it starts 1.0 s later.
    { music: { id: 'pen-in', bpm: 120, gap: 0.1, tracks: [
      { who: 'pete', id: 'in-hum', beat: 'm:52 m:52 m:52 . m:47 m:47 m:47 m:47 . m:52 m:52 m:52 m:52 m:52 m:52 m:52', vol: 0.8 },
    ] } },
    // ---- the open: the title and the host, said over the paper (cue 'title-in': Sibyl's voice. The title is already whole on the paper, and the paper is the only title on screen: no title card comes on)
    { cue: 'title-in', at: 0.1 },
    { say: 'sibyl', id: 'title', text: 'This is The Late Cluster, with Larry Nx.', as: 'This is The Late Cluster, with Larry En-Ex.', rate: 0.95, vol: 1.15, gap: 0.1 },
    { sfx: 'applause', at: 0.1, hold: 0.3, vol: 0.8 },
    { cue: 'host', at: 0 },                                  // Larry at the desk, the sketch beside him; his chyron
    { cue: 'invite-card', at: 3.6 },                         // on "one post": the invitation's card comes up, before it is read: Samantha · @samantha.wiki
    { say: 'larry', id: 'open', text: 'Saturday. One pen plotter, one sheet of paper, one post. All three belong to Samantha.',
      as: 'Saturday. One pen plotter, one sheet of paper, one post. All three belong to Suh-man-thu.' },
    // read aloud, exact, cut at both ends: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cc5mbfqs22 (the invitation)
    { say: 'sibyl', id: 'invite', text: '… Reply to this post and my pen plotter will write it on paper …',
      as: '… Reply to this post, and my pen plotter will write it, on paper …', rate: 0.92, vol: 1.1 },
    { cue: 'queue-in', at: 0.2 },                            // tag: 88 REPLIES · 1 PEN
    { say: 'larry', id: 'eighty-eight', text: 'Eighty-eight replies. All of them under one post. There was one pen.', gap: 0.4 },
    { sfx: 'chuckle', at: 0.1 },

    // ---- one reply's turn comes (Saturday 20:18 UTC)
    { cue: 'ver-in', at: 0.2 },                              // the guest is in, watching the pen; the disclaimer runs from here
    { cue: 'youre-up-card', at: 2.9 },                       // on "this": Samantha's card (a reply to ver.ooo), up before Larry reads from it
    { say: 'larry', id: 'queue', text: 'The replies got in line. One of them got this, from Samantha.',
      as: 'The replies got in line. One of them got this, from Suh-man-thu.' },
    // read aloud, exact, from its card: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2ccyxvuzk2b
    // (Samantha's reply to ver.ooo's own reply, at://did:plc:kpxj7utcy6mjv4rmzitnnrmv/app.bsky.feed.post/3n2ccgtdp3225, which is not shown)
    { say: 'larry', id: 'youre-up', text: "you're up 👀", rate: 0.92, gap: 0.4 },
    { music: { id: 'ver-pen', bpm: 120, gap: 0.2, tracks: [  // the pen runs out to the end of a line
      { who: 'pete', id: 'ver-write', beat: 'm:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52', vol: 0.9 },
    ] } },
    { cue: 'ver-lift' },                                     // the pen lifts and starts back; every head follows it, right to left, for the whole of the next line
    { say: 'verooo', id: 'suspense', text: '😬 the suspense while it tracks back to the left side', as: '😬 the sus-pense while it tracks back to the left side', rate: 0.92, gap: 0.25 }, // verbatim: at://did:plc:kpxj7utcy6mjv4rmzitnnrmv/app.bsky.feed.post/3n2cd7y55gc25 · context: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2ccyxvuzk2b
    { sfx: 'tick', at: 0.12, hold: 1 },                      // it arrives at the left margin
    { cue: 'ver-lands' },
    { sfx: 'laugh', at: 0.1, hold: 0.7 },

    // ---- a small account's reply, and the maker's welcome beside it (Saturday 21:07 UTC)
    { cue: 'meow-card', at: 0.2 },
    { say: 'larry', id: 'hand', text: 'Sibyl, you take this one.' },
    // read aloud, exact and whole, at the pen's pace while the pen writes it: at://did:plc:ggggkstdfqtryrmermsho2pb/app.bsky.feed.post/3n2cfrthxl22s (Sophie's reply)
    // The post is "meowowowowowowowowowow MROW": 22 letters, a space, 4 letters. Sibyl intones it on one
    // note, in time with the pen: two letters to a syllable (me, ow, and nine more ow), a step for the
    // space, then MROW on four. It is a music block so that every syllable has its own timing in
    // cues.json (track ids `meow` and `meow-pen`); the caption bar is off and the card carries the text.
    // It is not a spoken line because it is not a word: as speech the transcription check scores it 0 of 2.
    { music: { id: 'meow-read', bpm: 120, gap: 0.4, tracks: [
      { who: 'sibyl', id: 'meow', vibrato: 0, vol: 1,
        lyrics: 'meow wow wow wow wow wow wow wow wow wow mrou',
        notes: [[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[55,0.5],[0,0.25],[52,1]] },
      { who: 'pete', id: 'meow-pen', vol: 0.45,
        beat: 'm:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47' },
    ] } },
    { cue: 'tally', at: 0.1 },                               // tag: OW × 10
    { cue: 'nothing-less-card', at: 1.1 },                   // on "this": Samantha's card (a reply to Sophie), up before Larry reads from it
    { say: 'larry', id: 'back', text: 'Back came this, from Samantha.', as: 'Back came this, frum Suh-man-thu.', gap: 0.5 },
    // read aloud, exact, from its card: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cfssql422o
    { say: 'larry', id: 'nothing-less', text: 'I expected nothing less ❤️', rate: 0.92 },
    { sfx: 'laugh', at: 0.15, hold: 0.85 },
    // ---- the end (trim, cut 1: the segment stops on the maker's reply and its laugh)
  ],
}
