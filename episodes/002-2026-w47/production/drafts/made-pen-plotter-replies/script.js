// made-pen-plotter-replies: "One Pen". A demonstration, at the desk and at the page.
// The thing: @samantha.wiki's pen plotter, which wrote the replies to one post on paper on
// Saturday 14 November (stream.place/samantha.wiki). The studio draws its own sketch of it and lets
// it write three real replies. Cards: made-pen-plotter-replies, voices-plotter-queue-small-accounts.
//
// Real people. Samantha (the maker) is shown and read aloud, never voiced. ver.ooo's puppet says one
// line, its own reply, to the reply it answered. Sophie's and austin's replies are read aloud as the
// posts they were. Every real post here is in sources.json.
//
// The experiment (ten seconds with no words): from the end of `near` to the start of `limit` nobody
// speaks and the audience makes no sound. The pen writes the end of austin's reply, and the turn is
// the pen's. Nothing before it gives the turn away; nothing after it describes it.
//
// Pete is the pen's motor throughout: every hum is a beat track, one sixteenth to a letter.
export default {
  id: 'made-pen-plotter-replies',
  title: 'One Pen',
  gap: 0.28,
  beats: [
    // ---- the thing, and the invitation
    { cue: 'plotter-in' },                                   // the studio's sketch draws itself: one pen over one blank sheet; the maker's credit comes on and stays
    { music: { id: 'pen-in', bpm: 120, gap: 0.1, tracks: [
      { who: 'pete', id: 'in-hum', beat: 'm:47 . . . m:52 . . .', vol: 0.8 },
    ] } },
    { say: 'larry', id: 'open', text: 'Saturday. One pen plotter, one sheet of paper. They belong to Samantha.',
      as: 'Saturday. One pen plotter, one sheet of paper. They belong to Sum-ann-thuh.' },
    { cue: 'invite-card', at: 0.15 },
    // read aloud, exact, cut at both ends: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cc5mbfqs22 (the invitation)
    { say: 'sibyl', id: 'invite', text: '… Reply to this post and my pen plotter will write it on paper …', rate: 0.92, vol: 1.1 },
    { cue: 'queue-in', at: 0.2 },                            // tag: 88 REPLIES · 1 PEN
    { say: 'larry', id: 'eighty-eight', text: 'Eighty-eight replies, under one post. There was one pen.' },
    { sfx: 'chuckle', at: 0.1 },

    // ---- one reply's turn comes (Saturday 20:18 UTC)
    { cue: 'ver-in', at: 0.2 },                              // the guest is in, watching the pen; the disclaimer runs from here
    { say: 'larry', id: 'queue', text: 'The replies got in line. One of them heard from Samantha.',
      as: 'The replies got in line. One of them heard from Sum-ann-thuh.' },
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
    { say: 'sibyl', id: 'meow', text: 'meowowowowowowowowowow MROW', as: 'meow-wow-wow-wow-wow-wow-wow-wow-wow-wow mrou.', rate: 0.8, gap: 0.4 },
    { cue: 'tally', at: 0.1 },                               // tag: OW × 10
    { say: 'larry', id: 'back', text: 'Back came a reply from Samantha.', as: 'Back came a reply from Sum-ann-thuh.', gap: 0.5 },
    // read aloud, exact, from its card: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cfssql422o
    { say: 'larry', id: 'nothing-less', text: 'I expected nothing less ❤️', rate: 0.92 },
    { sfx: 'laugh', at: 0.15, hold: 0.85 },

    // ---- an earlier reply (Saturday 20:05 UTC), and the ten seconds
    { cue: 'austin-card', at: 0.2 },
    { say: 'larry', id: 'austin', text: 'Earlier in the line: a reply from austin.' },
    { say: 'larry', id: 'film', text: 'The opening of a film script.' },
    // read aloud, exact, its first sentence, the cut marked: at://did:plc:gttrfs4hfmrclyxvwkwcgpj7/app.bsky.feed.post/3n2cccl2rbc2o
    { say: 'larry', id: 'bee', text: 'According to all known laws of aviation, there is no way a bee should be able to fly. …',
      as: 'According to all known laws of aviation, there is no way a bee shood be able to fly. …', rate: 0.92, gap: 0.4 },
    { sfx: 'chuckle', at: 0.1 },
    { say: 'larry', id: 'near', text: 'Here is the pen, near the end.' },

    { cue: 'pen-live', at: 0.3 },                            // the page and the pen fill the frame; no caption; heads at the edges, watching
    { music: { id: 'pen-run', bpm: 120, gap: 0.5, tracks: [
      { who: 'pete', id: 'run-return', beat: 'm:43 . . . . . . .', vol: 0.8 },                                             // the pen travels back to the left margin
      { who: 'pete', id: 'run-yb1', start: 2.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47 m:47 . .' },   // it writes: Yellow, black.
      { who: 'pete', id: 'run-yb2', start: 6.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47 m:47 . .' },   // Yellow, black.
      { who: 'pete', id: 'run-yb3', start: 10.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47 m:47 . .' },  // Yellow, black.
      { who: 'pete', id: 'run-cut', start: 14.5, beat: 'm:52 m:52 m:52 m:52 m:52 m:52 . m:47 m:47 m:47 m:47' },           // Yellow, blac
    ] } },
    { cue: 'pen-stops' },                                    // the reply has no more letters in it, and the hum has stopped with it
    { sfx: 'tick', at: 0.35, hold: 0 },                      // the pen lifts
    { wait: 1.3 },
    { music: { id: 'pen-nudge', bpm: 120, gap: 0, tracks: [  // it moves one letter's width to the right, and holds there
      { who: 'pete', id: 'nudge', beat: 'm:52', vol: 0.7 },
    ] } },
    { wait: 1.2 },                                           // Larry looks at Sibyl. Sibyl looks at the page

    { say: 'sibyl', id: 'limit', text: 'The limit is three hundred characters.', gap: 0.4 },
    { say: 'larry', id: 'how-long', text: 'How long is this one?' },
    { cue: 'count', at: 0.3 },                               // a counter beside the page runs up and lands on her word: 300 OF 300
    { say: 'sibyl', id: 'three-hundred', text: 'Three hundred.', rate: 0.9, gap: 0.45 },
    { cue: 'lmao', at: 0.3 },                                // Samantha's own reply to that reply, on its card, one word: at://did:plc:sna3qx44beg2mb5fao44gsxh/app.bsky.feed.post/3n2cceb5pvc2j
    { sfx: 'laugh', at: 0.15 },
    { sfx: 'sting', at: 0.1 },
    { sfx: 'applause', at: -0.6, hold: 0.25 },
  ],
}
