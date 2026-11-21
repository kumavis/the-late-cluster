// made-polyhedral-coffee-simulator: "Larry Plays a Game" (draft, episode 002-2026-w47).
// A demonstration, then a real thread performed in order. Card: made-polyhedral-coffee-simulator.
//
// The thing: "Morning Coffee Simulator — Polyhedra Sakura", polycoffee.9000ish.uk, made by
// Dave (@dave.9000ish.uk). It is shown in use, as the studio's own sketch, in one stretch of
// about thirteen seconds with no spoken or sung word and no audience sound (cue 'stretch' to
// cue 'stretch-end'). The segment's turn is inside that stretch and the simulator does it.
// Nothing before the stretch gives it away and nothing after it describes it.
//
// Real lines: every `// verbatim` line is its author's post, word for word, in the thread it came
// from; `as` only respells and places pauses. The one post split over two beats is split at its own
// sentence break, each piece marked with …. Every post that is shown is named below with its address.
export default {
  id: 'made-polyhedral-coffee-simulator',
  title: 'Larry Plays a Game',
  gap: 0.28,
  beats: [
    // ---- 1. the occasion, and the maker's own reply to it
    { cue: 'solids', at: 0.6 },      // a few plain wireframe solids drift over the desk: the studio's own, nobody's video
    { say: 'larry', id: 'video', text: 'A member posted a video. A landscape made of polyhedra.',
      as: 'A member posted a video. A landscape made of polly-hee-dra.', rate: 1.02 },
    { cue: 'dave-in', at: 0.3 },     // the guest chair comes into frame; the chyron on the word "Dave"
    { say: 'larry', id: 'guest', text: 'Another member is here. This is Dave.' },
    // Larry makes the remark Dave's post replied to (a member's reply under that video: "sort of needs to be a game now")
    { say: 'larry', id: 'ought', text: 'My first thought: it should be a game.', rate: 1.02 },
    { cue: 'dave-card', at: 0.2 },   // Dave's post card, whole, its words lighting as the puppet says them; the address stays on the card
    { say: 'dave', id: 'best', text: 'best i can do polyhedral coffee simulator…',
      as: 'best i can do. polly-hee-drull caw-fee simulator.' }, // verbatim: at://did:plc:hovt6k22s64dq63jjmoyibk3/app.bsky.feed.post/3n2jrgrxtss2w · context: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2jnbmrlx22j
    { cue: 'title-screen', at: -2.2 }, // on "polyhedral": the simulator's title screen on the panel: MORNING COFFEE, a BEGIN MORNING button, the credit
    { sfx: 'chuckle', at: 0.15, hold: 0.6 },
    { say: 'larry', id: 'win', text: 'A game! Stand back. I play to win.', rate: 0.96 },

    // ---- 2. the stretch: the simulator in use, no words, no audience (the episode's experiment)
    // Beat 0 of the block is 0.5 s after Larry's last word. One step is a sixteenth at 96 bpm
    // (0.15625 s); the block is 80 steps, 12.5 s. Step numbers for the staging:
    //    0  BEGIN MORNING is pressed (click)            6–14  the blossom trees pop in, one per hat
    //   16  the mug rises into view                      20  the legend lights: SPACE · SIP
    //   24  the first sip (lip pop)                   28, 30  Larry looks left, then right, for an opponent
    //   32, 36, 39, 42, 44, 46, 47  seven more sips, faster and faster: the mug is empty at 47
    //   48  the empty mug is set down (thud)          49–59  nothing comes. Larry waits for his prize
    //   60  the simulator's own prompt appears: E · REFILL COFFEE FROM KETTLE
    //   64–70  the kettle pours (four hisses, four rising hums)   72  the mug is full again (ding)
    //   73–79  Larry looks at the mug, then at us
    { cue: 'stretch', at: 0 },
    { cue: 'begin', at: 0.5 },
    { cue: 'trees', at: 1.44 },
    { cue: 'mug-up', at: 3.0 },
    { cue: 'legend', at: 3.63 },
    { cue: 'sip', at: 4.25 },
    { cue: 'chug', at: 5.5 },
    { cue: 'empty', at: 8.0 },
    { cue: 'prompt', at: 9.88 },
    { cue: 'pour', at: 10.5 },
    { cue: 'full', at: 11.75 },
    { cue: 'stretch-end', at: 13.0 },
    { music: { id: 'morning', bpm: 96, gap: 0.5, tracks: [
      // each sound has its own track, so each is levelled on its own (a track is normalised to its loudest hit)
      { who: 'pete', id: 'clicks', vol: 0.5, beat:
        '! . . . | . . . . | . . . . | . . . . | ' +   // 0: BEGIN MORNING
        '. . . . | K . . . | . . . . | . . . . | ' +   // 20: the legend
        '. . . . | . . . . | . . . . | . . . . | ' +
        '. . . . | . . . . | . . . . | ! . . . | ' +   // 60: the prompt
        '. . . . | . . . . | . . . . | . . . . ' },
      { who: 'pete', id: 'trees', vol: 0.4, beat:
        '. . . . | . . t . | t . t . | t . t . | ' +   // 6–14: a tree per hat
        't . . . | . . . . | . . . . | t . t . ' },    // 16: the mug; 28, 30: Larry looks left, right
      { who: 'pete', id: 'sips', vol: 0.8, start: 6, beat:
        'P! . . . | . . . . | ' +                      // 24: the first sip
        'P! . . . | P! . . P! | . . P! . | P! . P! P! ' },   // 32, 36, 39, 42, 44, 46, 47
      { who: 'al', id: 'thud', vol: 0.6, start: 12, beat: 'B . . . ' },                    // 48: the empty mug
      { who: 'pete', id: 'pour', vol: 0.5, start: 16, beat: 'tss . tss . | tss . tss . ' },  // 64–70: the kettle
      { who: 'hy', id: 'pour-hum', vol: 0.4, start: 16, beat: 'm:52 . m:55 . | m:59 . m:64 . ' },
    ] } },
    { sfx: 'ding', at: -1.25, hold: 0, vol: 0.7 },   // on 'full'; a studio one-shot, not the audience
    { sfx: 'laugh', at: 0.15, hold: 0.7 },            // the audience comes back only now

    // ---- 3. one real reply to Dave's post, read aloud exactly, its card up:
    // at://did:plc:r5bee2hexwjtmhkfmfu2tphx/app.bsky.feed.post/3n2k2aul6y22h (by @mokkenstorm.dev; the card names the author)
    { cue: 'review-card', at: 0.25 },
    { say: 'sibyl', id: 'reply', text: 'Somebody wrote back. Every word:', rate: 0.97 },
    { say: 'sibyl', id: 'review', text: 'very peaceful thank you', rate: 0.94, gap: 0.4 },
    { say: 'larry', id: 'strategy', text: 'Different strategy.', rate: 0.9, gap: 0.5 },
    { sfx: 'chuckle', at: 0.15, hold: 0.5 },

    // ---- 4. the mug thread: four posts in order, three of them performed, one shown at a glance
    { cue: 'mugs', at: 0.2 },        // the simulator shrinks to a corner of the panel; Amber is on the couch
    { say: 'larry', id: 'mugs-line', text: 'Next day, members held up real coffee mugs.' },
    { cue: 'pink-mug', at: 0.2 },    // a pink mug with a hand-drawn polyhedron of 20 sides (the picture's alt text); the post's card
    { say: 'amber', id: 'forms', text: 'polyhedron week comes in many forms', as: 'polyhedron week comes, in many forms', rate: 0.94 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2lynnfhpc24 · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2lynnfhpc24

    // Amber's own reply to that post is shown and not spoken: two words, a glance. "computer, enhance",
    // at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2lzaolgds24. Its card comes up, a scan
    // line crosses the mug, and the polyhedron is redrawn "nicer" (the second picture's alt text).
    // It is not spoken because no voice can say "enhance": every one tried is heard as "and hench".
    { cue: 'enhance', at: 0.35 },
    { sfx: 'whoosh', at: 0.45, hold: 0, vol: 0.8 },
    { wait: 1.5 },

    { cue: 'hold-on', at: 0.1 },     // oszillate leans in from the edge of the frame, full size; the reply's card
    { say: 'oszillate', id: 'squares', text: "…Hold on ma'am, I believe those are squares in the back.…",
      as: "Hold on, ma'am. I believe those are squares, in the back.", rate: 0.94 }, // verbatim: at://did:plc:gnwxm4rvtrjc33icqmyvzhst/app.bsky.feed.post/3n2mmmdtois2s · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2lzaolgds24
    { cue: 'turn-it', at: -1.55 },   // on "squares": the sketch turns; two faces at the back are outlined as squares, in oszillate's colour
    { cue: 'two-solids', at: 2.15 }, // on "sphenomegacorona": two plain reference solids, drawn on, with fact labels that stay up: ICOSAHEDRON · 20 FACES and SPHENOMEGACORONA · 18 FACES
    { say: 'oszillate', id: 'sold', text: '…I believe you have been sold a sphenomegacorona, one of the classic adulterated bootleg icosahedrons',
      as: 'I believe you have been sold a sfee-no-mega-corona, one of the classic a-dull-ter-ay-ted boot-leg, eye-koh-sa-heed-rons', rate: 0.96, gap: 0.35 }, // verbatim: at://did:plc:gnwxm4rvtrjc33icqmyvzhst/app.bsky.feed.post/3n2mmmdtois2s · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2lzaolgds24
    { sfx: 'laugh', at: 0.15, hold: 0.8 },
    { cue: 'money-card', at: 0.1 },
    { say: 'amber', id: 'money', text: 'i want my money back!', rate: 0.94, gap: 0.2 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2nlmbq5ss2m · context: at://did:plc:gnwxm4rvtrjc33icqmyvzhst/app.bsky.feed.post/3n2mmmdtois2s
    { sfx: 'laugh', at: 0.15, hold: 0.75 },

    // ---- 5. the button: the picture is the punch (the kettle from the sketch tips over the pink mug and fills it)
    { say: 'larry', id: 'button', text: 'The best we can do.', rate: 0.9, gap: 0.3 },
    { cue: 'kettle', at: -0.3 },     // on "do"
    { sfx: 'sting', at: 0.2 },
    { sfx: 'applause', at: -0.5, hold: 0.25 },
  ],
}
