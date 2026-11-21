// interview-yonderdavid: Larry interviews a puppet of David (@yonderdavid.bsky.social).
// An interview constructed from public posts. Every line David's puppet speaks is one of David's
// own posts, word for word (cuts marked with the ellipsis character), and the line spoken just
// before it asks what the post it replied to asked. Four occasions, in the order they happened:
// Sat 14 Nov (the cat), Sun 15 Nov (the failures), Sun 15 Nov (the same thread: the question
// about covers), Tue 17 Nov (the koto, and the request that followed it).
// The members who asked are not voiced, named or shown: Larry says "a member asked" and asks it.
// Script format: packages/show/tools/README.md. Staging notes for the builder: notes.json.
export default {
  id: 'interview-yonderdavid',
  title: 'The Interview: David',
  gap: 0.3,
  beats: [
    { say: 'larry', id: 'intro', text: 'My guest makes music with singers and instruments that are not real.', rate: 1.03 },
    { cue: 'guest-in' },
    { say: 'larry', id: 'welcome', text: 'Please welcome David.', gap: 0.25 },
    { sfx: 'applause', at: 0.1, hold: 0.32 },

    // ---- 1 · the cat (Sat 14 Nov). No board, no count of the time it took, no reveal:
    // the answer says what was made, and the studio's sketch of the video is up while it does.
    { say: 'larry', id: 'four', text: 'The synthesizer you use comes with four animals.', rate: 1.04 },
    { say: 'larry', id: 'ask-cat', text: 'A member asked: how did the cat not make the top four?', rate: 1.03 },
    { say: 'david', id: 'very-well', text: 'Very well, … so I can fix that. The cat voice sim joins a quartet and instruments that get their sound from physical models.', as: 'Very well, … so I can fix thatt. The cat voice sim joins a quartet, and instruments that get their sound from physical mod-els.', gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cffuxxv22n · context: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2a65lsdec26
    { say: 'larry', id: 'good-question', text: 'Me, I just say, good question.', rate: 0.94, gap: 0.5 },
    { sfx: 'laugh', at: 0.15, hold: 0.55 },

    // ---- 2 · the failures (Sun 15 Nov, under the cat video)
    { cue: 'under-the-video' },
    { say: 'larry', id: 'under', text: 'Under the video, a member asked:', rate: 1.04 },
    { say: 'larry', id: 'ask-failures', text: 'Was there a stack of failures we never saw?', gap: 0.15 },
    { say: 'david', id: 'kazoo', text: '… The meow and yowl took some work and iteration against reference recordings. The original yowl sounded like a kazoo.', as: '… The meow and yowl took some work, and iteration, against reference recordings. Thee original yowl sounded like a kazoo.', gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cqbcwvqc2z · context: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2cq3hrnic2z
    { wait: 0.5 },
    // the band's own impression of a kazoo yowl: Pete hums it. Not David's audio, and labelled so.
    { cue: 'band-kazoo' },
    { music: { id: 'kazoo-yowl', bpm: 104, gap: 0.05, tracks: [
      { who: 'pete', id: 'pete-kazoo', beat: 'm:67 m:71 m:74 m:74 | m:74 m:72 m:69 m:66 | m:62 .', vol: 1 },
    ] } },
    { sfx: 'laugh', at: 0.1, hold: 0.65 },

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

    // ---- 4 · the koto (Tue 17 Nov, under the polyhedra video), and the request that followed
    { cue: 'polyhedra' },
    { say: 'larry', id: 'two-days', text: 'Two days later: a video of instruments made from polyhedra.', as: 'Two days later: a video of instruments made from polly-hee-druh.', rate: 1.04, gap: 0.5 },
    { cue: 'koto-pluck', at: 0.2 },
    { sfx: 'tick-1', at: 0.2, hold: 1 },
    { wait: 0.3 },
    { say: 'larry', id: 'ask-koto', text: 'A member asked about the koto: an existing physical model, or a new thing?', as: 'A member asked about the koh-toe: an existing physical model, or a new thing?', rate: 1.03, gap: 0 },
    { say: 'david', id: 'new', text: 'New. Second draft, mostly vibed.', as: 'Nee-oo. Second draft, most-lee vibed.', rate: 1.07, gap: 0.5 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jnh3e6hc2t · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jmvm74dc2r
    // dry: no reaction sound
    { cue: 'dry' },
    { wait: 0.8 },
    { say: 'larry', id: 'ask-details', text: 'The same member asked: can you share any details?', rate: 1.03, gap: 0 },
    { say: 'david', id: 'free', text: 'Koto information wants to be free. …', as: 'Koh-toe information, wants to be free. …', gap: 0.45 }, // verbatim: at://did:plc:nqu76ue2hgr44emaxyvgbzsq/app.bsky.feed.post/3n2jq4x7qys2t · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jnnda4es2y
    { cue: 'plug', at: 0.3 },
    { say: 'larry', id: 'plug-line', text: 'Finally, something to plug.', gap: 0.45 },
    { say: 'larry', id: 'button', text: 'Out now, wherever code is pasted.', rate: 0.92, gap: 0.25 },
    { sfx: 'sting', at: 0.1, hold: 0 },
    { sfx: 'applause', at: 0.2, hold: 0.3 },
  ],
}
