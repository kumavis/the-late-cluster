// interview-yonderdavid: Larry interviews a puppet of David (@yonderdavid.bsky.social).
// An interview constructed from public posts. Every line David's puppet speaks is one of David's
// own posts, word for word (cuts marked with the ellipsis character), and the line spoken just
// before it asks what the post it replied to asked. Three occasions, in the order they happened:
// Sat 14 Nov (the cat), Sun 15 Nov (the failures), Sun 15 Nov (the same thread: the question
// about covers).
// The members who asked are not voiced, named or shown: Larry says "a member asked" and asks it.
// Script format: packages/show/tools/README.md. Staging notes for the builder: notes.json.
//
// Trim (the owner's notes, 21 November 2026; what was removed is kept in production/trim.md).
// Cut 5: the fourth occasion (Tue 17 Nov: the koto, and the request that followed it) and the plug
// are out. The segment ends on `parody`, the held chyron and the big laugh.
//
// Assembly (episode 002-2026-w47). This is the episode's third segment, and the one place where
// the fact "the synth comes with four animals and none is a cat" is told (line `four`). The song
// that aired, `music-alt`, is six segments later and does not use the "four animals" fact.
// Two things in the draft's notes are withdrawn: there is no sketch of the cat video in exchange 1
// (the picture is David and his card), and the band does not perform a yowl after `kazoo`. No cat
// is performed anywhere in the aired cut: in `music-alt` the cat is a sung line and a tile. On the word "kazoo" a small drawn kazoo beside the
// card is the punch's picture; it is the studio's drawing of a kazoo, of nothing David made.
export default {
  id: 'interview-yonderdavid',
  title: 'The Interview: David',
  gap: 0.3,
  beats: [
    { say: 'larry', id: 'intro', text: 'My guest makes music with singers and instruments that are not real.', rate: 1.03 },
    { cue: 'guest-in' },
    { say: 'larry', id: 'welcome', text: 'Please welcome David.', gap: 0.25 },
    { sfx: 'applause', at: 0.1, hold: 0.32 },

    // ---- 1 · the cat (Sat 14 Nov). No board, no count of the time it took, no reveal, no sketch
    // of the video: the answer says what was made, and the picture is David with the card.
    { say: 'larry', id: 'four', text: 'The synthesizer you use comes with four animals.', as: 'The synthesizer you yooz comes, with four animals.', rate: 1.04 },
    { say: 'larry', id: 'ask-cat', text: 'A member asked: how did the cat not make the top four?', rate: 1.03 },
    { say: 'david', id: 'very-well', text: 'Very well, … so I can fix that. The cat voice sim joins a quartet and instruments that get their sound from physical models.', as: 'Very well, … so I can fix that. The cat voice, sim, joins, a quartet, and instruments that get their sound from physical models.', gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cffuxxv22n · context: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2a65lsdec26
    { say: 'larry', id: 'good-question', text: 'Me, I just say, good question.', rate: 0.94, gap: 0.5 },
    { sfx: 'laugh', at: 0.15, hold: 0.55 },

    // ---- 2 · the failures (Sun 15 Nov, under the cat video)
    { cue: 'under-the-video' },
    { say: 'larry', id: 'under', text: 'Under the video, a member asked:', rate: 1.04 },
    { say: 'larry', id: 'ask-failures', text: 'Was there a stack of failures we never saw?', gap: 0.15 },
    { say: 'david', id: 'kazoo', text: '… The meow and yowl took some work and iteration against reference recordings. The original yowl sounded like a kazoo.', as: '… The meow and yowl took some work, and iteration, against reference recordings. Thee original yowl, sounded like uh kazoo.', gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cqbcwvqc2z · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cq3hrnic2z
    { cue: 'kazoo-pic', at: -0.6 },   // on the word "kazoo": a small drawn kazoo beside the card
    // dry for half a second, then the laugh. Nobody performs the yowl.
    { wait: 0.5 },
    { sfx: 'laugh', at: 0, hold: 0.65 },

    // ---- 3 · the same thread, minutes later (Sun 15 Nov). Larry reads from David's own post,
    // exactly, with its card up (the cuts at both ends are marked): at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2crbcfzuk2z
    // Then the question a member asked about it, and David's reply to that question.
    { cue: 'same-thread' },
    { say: 'larry', id: 'you-posted', text: 'Your first choice was another song. You posted:', rate: 1.04 },
    { say: 'larry', id: 'read-copyright', text: "… it turns out that's still under copyright and covers aren't fair use. …", gap: 0.3 },
    { say: 'larry', id: 'and-asked', text: 'And a member asked:', gap: 0.35 },
    { say: 'larry', id: 'ask-al', text: "Covers aren't fair use? Then how does Weird Al work?", as: "Covers aren't fair use? Then how does, Weird Al, work?", gap: 0.15 },
    { say: 'david', id: 'parody', text: 'I believe parody is considered transformative in the relevant sense.', as: 'I believe, parody, is considered transformative in the relevant sense.', gap: 0.5 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cro6iyc22z · context: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2crnbhi5k2t
    // nobody speaks: the picture is the guest's own chyron
    { cue: 'label-hold' },
    { wait: 1.3 },
    { sfx: 'biglaugh', hold: 0.65 },
    // ---- the end (trim, cut 5: the segment stops on the answer about parody, the held chyron and the big laugh)
  ],
}
