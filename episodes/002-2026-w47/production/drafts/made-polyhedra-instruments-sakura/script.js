// made-polyhedra-instruments-sakura: "Notes for a Landscape". A demonstration (format: packages/show/tools/README.md).
//
// The thing: David's video of 17 Nov 2026 (at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jfwtubf22r),
// posted with no text: instruments built from polyhedra play a tune in a landscape of polyhedra.
// The same evening David posted, as a thread under it, how it was made, change request by change request.
//
// What happens: the studio has a sketch of the landscape and follows two of David's posted notes on it,
// performed by David's puppet from that thread, in the order they were posted. Then the sketch is set
// going: the episode's experiment, twelve seconds with no words, the thing in use, the turn inside.
// Then the last line of David's last post.
//
// Real lines: every `david` line is a cut from one of David's own posts in that thread, tagged with the
// post and the post it replied to; sources.json has each one's occasion and its staged setup.
// House lines say what was posted and react. They never say what David thinks.
// People: only David appears. Nobody else on the card is shown, named or voiced.
//
// The wordless stretch runs from the end of `roll` to the `chuckle` after the music block `valley`:
// no say, sing or shout line and no crowd sound inside it. Do not add any. Its sound is the sketch's
// own: one hummed line, a low hum struck once a bar, and a lip pop for each blossom that lands on the river.
export default {
  id: 'made-polyhedra-instruments-sakura',
  title: 'Notes for a Landscape',
  gap: 0.3,
  beats: [
    // ---- 1. what it is. The post card is real and has no text on it: that blank is the picture for "No caption. No words."
    { cue: 'post-card', at: 0 },
    { say: 'larry', id: 'intro', text: 'A video, by David. No caption. No words.', gap: 0.2 },

    // the studio's sketch draws on beside the card, labelled as the studio's: big plain solids, not yet piles
    { cue: 'sketch-on', at: 0.4 },
    { say: 'larry', id: 'sketch', text: 'This is our sketch of it.', rate: 0.96, gap: 0.45 },
    { say: 'larry', id: 'what', text: 'Instruments, all built from polyhedra, in a landscape of yet more polyhedra.',
      as: 'Instruments, all built from polly-heedra, in a landscape of yet more polly-heedra.', gap: 0.35 },

    // ---- 2. two of the posted notes, in the order David posted them; the sketch is redrawn after each
    { say: 'larry', id: 'ask-first', text: 'It was made by sending notes to a machine. This was the first.', rate: 1.03, gap: 0.45 },
    { say: 'david', id: 'note-first', text: '… everything is a cloud/sea of regular polyhedra, piling up or clustering together as necessary. …',
      as: '… everything is a cloud-sea of regular polly-heedra, piling up or clustering together as necessary. …',
      rate: 0.9, gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jx6tq44k2p · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jx2rb2kk2p
    { cue: 'still-sea', at: -3.15 },     // on "piling up": every outline in the sketch gives way to heaps of small regular solids
    { say: 'larry', id: 'one-note', text: 'That was one note.', rate: 0.92, gap: 0.7 },
    { sfx: 'chuckle', at: 0.15 },

    { say: 'larry', id: 'ask-another', text: 'And another note.', gap: 0.35 },
    { say: 'david', id: 'note-legs', text: '… the legs of the pavilion look too warty. …',
      rate: 0.92, gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jxjfkdu22p · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jxddunok2p
    { cue: 'still-legs', at: 0.4 },      // a beat of nothing, then the pavilion's lumpy legs are neat stacks of solids
    { say: 'larry', id: 'mine', text: 'A director once said that about my legs.', rate: 0.92, gap: 1.0 },
    { sfx: 'laugh', at: 0.15 },

    { say: 'larry', id: 'roll', text: 'Notes taken. Roll it.', gap: 0.4 },

    // ---- 3. THE WORDLESS STRETCH (the experiment). Twelve seconds: the sketch plays.
    // Beat 0 of `valley` falls 0.25 s after `roll` ends; a beat is 0.75 s, a bar is 3 s.
    { cue: 'valley-play', at: 0.25 },    // bar 1: the still starts to move. A chime swings on each hummed note; the bell swings once a bar
    { cue: 'valley-drift', at: 3.25 },   // bar 2: the sketch's camera drifts along the landscape; strings and drums go; blossoms come off the trees and tumble on the ground
    { cue: 'valley-river', at: 6.25 },   // bar 3: the camera reaches the river under the bridge. Its lines do not move at all. A blossom lands on it on each note, with a pop, and stays where it landed
    { cue: 'valley-pile', at: 9.25 },    // bar 4: four more land. The pile on the water is as high as the bridge. Everything else is still swinging
    { cue: 'valley-look', at: 10.75 },   // the long last note: Larry's head comes round to the river, then to the camera
    { music: { id: 'valley', bpm: 80, tracks: [
      { who: 'dee', vol: 0.8,
        beat: 'm:69 . . . m:69 . . . m:71 . . . . . . . | m:69 . . . m:69 . . . m:71 . . . . . . . | m:69 . . . m:71 . . . m:72 . . . m:71 . . . | m:69 . . . m:71 . m:69 . m:65 . . . . . . .' },
      { who: 'al', vol: 0.35, loops: 4,
        beat: 'm:45 . . . . . . . . . . . . . . .' },
      { who: ['pete', 'al'], vol: 1.0, start: 8,
        beat: 'P! . . . P! . . . P! . . . P! . . . | P! . . . P! . P! . P! . . . . . . .' },
    ] } },
    { cue: 'valley-hold', at: 0 },       // the hum stops. The river has not moved. Hold on the pile
    { sfx: 'chuckle', at: 0.3 },

    // ---- 4. the last line of the last post in the thread
    { say: 'larry', id: 'ask-last', text: 'And this is the end of the last post.', gap: 0.7 },
    { say: 'david', id: 'river', text: '… Oh, and I had to tell it to make the river move.',
      as: '… Oh, and I had to tell itt to make the river, move.',
      rate: 0.9, gap: 0.5 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jxvvh2xs2p · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jxsla2g22p
    { cue: 'river-moves', at: -0.6 },    // on the word "move": the river's lines flow, and the pile sails off under the bridge
    { sfx: 'laugh', at: 0.3, hold: 0 },
    { music: { id: 'downstream', bpm: 80, gap: 0.1, tracks: [
      { who: 'dee', vol: 0.7,
        beat: 'm:64 . . . m:65 . . . m:71 . m:69 . m:65 . . . | m:64 . . . . . . .' },
      { who: 'al', vol: 0.3,
        beat: 'm:45 . . . . . . . . . . . . . . . | m:40 . . . . . . .' },
      { who: 'pete', vol: 0.2,
        beat: 't . t . t . t . t . t . t . t . | t . t . t . . .' },
    ] } },

    // ---- button
    { say: 'larry', id: 'button', text: 'Good note.', rate: 0.9, gap: 0.35 },
    { sfx: 'applause', at: 0.2 },
  ],
}
