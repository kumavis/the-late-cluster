// interview: the standing interview, drafted on the card interview-cee-wtf.
//
// One guest: cee (@cee.wtf), played by a puppet (cast id `cee`, in this draft's cast.js).
// Every line the puppet speaks is one of that account's own posts, word for word, tagged with the
// post and with the post it replied to. The line spoken immediately before each one is its staged
// setup, recorded in sources.json. Four exchanges on four occasions, in the order they happened.
// Larry reacts; he never restates what the guest said.
//
// Posts of other accounts: one post by Amber (@shimmermathlabs.com) is read aloud exactly by Sibyl,
// as the post it was, with its card; Amber is also credited on screen for suggesting the game. The
// three other askers are not named, shown or voiced; Larry asks what they asked in his own words.
//
// Cues are for the builder; what each one should show is in notes.json ("builder").
// Format: packages/show/tools/README.md.
export default {
  id: 'interview',
  title: 'The Interview: cee',
  gap: 0.28,
  beats: [
    // ---- arrival. Sibyl states the format once, plainly. The disclaimer footer runs from guest-in.
    { say: 'sibyl', id: 'rule', text: 'Next, the interview. The guest is a puppet. Every word the guest says is a real post.', rate: 0.95 },
    { cue: 'guest-in', at: 0.15 },
    // the name is one syllable and the engine is weak on s before a long ee: it sits last, after a
    // pause, respelled with a t to sharpen it, and the applause waits until it is over
    { say: 'larry', id: 'welcome', text: 'Please welcome, cee.', as: 'Please welcome, Tsee.', rate: 0.95 },
    { sfx: 'applause', at: 0.3, hold: 0.5 },

    // ---- exchange 1 · 15 Nov. A member asked everyone a question; cee replied to it.
    // Larry asks what was asked, with a host's full warmth (he slides a box of tissues across).
    { cue: 'date-15' },
    { say: 'larry', id: 'scene-usage', text: "On the fifteenth, a member put a question to everyone. I'll put it to you.", rate: 1.02 },
    { cue: 'tissues-out', at: -0.9 },
    { say: 'larry', id: 'ask-usage', text: 'How do you want your Bluesky usage to be different from how you actually use it now?', as: 'How do you want your blue-sky usage to be different from how you actually use it now?', rate: 0.94 },
    { cue: 'card-usage', at: 0.2 },
    { say: 'cee', id: 'usage', text: 'I want several thousand more followers appended to my Bluesky usage', as: 'I want several thousand more followers appended to my blue-sky usage', rate: 0.94, gap: 0.45 }, // verbatim: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n2cuqozd6s2q · context: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2ctuaohos2n
    { wait: 0.8 },
    { say: 'larry', id: 'feeling', text: 'I was hoping for a feeling.', rate: 0.9, gap: 0 },
    { cue: 'tissues-back', at: -0.5 },
    { sfx: 'laugh', at: 0.15, hold: 0.45 },

    // ---- exchange 2 · 17 to 18 Nov. The game. First the thing itself, shown working.
    { cue: 'date-17' },
    { say: 'larry', id: 'scene-game', text: 'Two days later, a member gave you an idea for a game.', rate: 1.02 },
    // a credit label, not a post card: the idea was a reply by Amber (@shimmermathlabs.com),
    // at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2jws52ar22h. Its text is not shown or read.
    { cue: 'credit-suggestion', at: -0.4 },
    { say: 'larry', id: 'under-three', text: 'In under three hours, there was a game.', rate: 0.94, gap: 0.5 },
    { cue: 'game-in', at: -0.45 },
    { sfx: 'ooh', at: 0.1, hold: 0 },
    { wait: 2.2 },

    // the same member's next reply, read aloud exactly by Sibyl as the post it was, with its card;
    // the answer follows as the reply it was, with nothing in between
    { say: 'larry', id: 'same-member', text: 'And then, from the same member:', rate: 1.0, gap: 0 },
    { cue: 'card-wishes', at: 0.1 },
    // read aloud exactly: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2kbfb35d22y
    { say: 'sibyl', id: 'wishes', text: 'yeah!!! i want skid marks on the ground i want to be a driver inside that can hang off edge or jump out during tricks for extra points i want a button for hoots and woots', as: 'yeah. i want skid marks on the ground. i want to be a driver inside that can hang off edge, or jump out during tricks, for extra points. i want a button for hoots, and woots.', rate: 0.95 },
    { cue: 'card-done', at: 0.3 },
    { say: 'cee', id: 'done', text: 'done', rate: 0.9, gap: 0.55 }, // verbatim: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n2kcl2qub225 · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2kbfb35d22y
    { cue: 'done-lands', at: -0.25 },
    { wait: 0.9 },
    { sfx: 'laugh', hold: 0.85 },
    { say: 'larry', id: 'elapsed', text: 'Time elapsed: twenty-one minutes.', rate: 0.9 },
    { cue: 'tag-21', at: -1.0 },
    { say: 'hy', id: 'woot', text: 'Woot.', rate: 0.95, gap: 0.4 },
    { sfx: 'chuckle', at: 0.15, hold: 0.4 },

    // ---- exchange 3 · 18 Nov, later. Under cee's own post about a video game, someone asked a
    // question. Larry asks it with all the gravity he has.
    { cue: 'date-18' },
    { say: 'larry', id: 'scene-gta', text: 'The same day, you posted about Grand Theft Auto Six.', rate: 1.0 },
    // a glance card, four words: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n2lvie3be22j
    { cue: 'card-gta-day', at: -1.6 },
    { say: 'larry', id: 'ask-playing', text: 'Someone asked: are you playing it yourself, or is this a stream?', rate: 0.9, gap: 0.4 },
    { cue: 'card-gaming', at: 0.2 },
    { say: 'cee', id: 'gaming', text: 'I’m GAMING BABY', as: "I'm GAMING BABY", rate: 0.9, vol: 1.25, gap: 0.4 }, // verbatim: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n2lvrms4cs2j · context: at://did:plc:stznz7qsokto2345qtdzogjb/app.bsky.feed.post/3n2lvm2mn2c2z
    { cue: 'blowback', at: -0.9 },
    { sfx: 'biglaugh', at: 0.15, hold: 0.5 },
    { say: 'larry', id: 'thanks', text: 'Thank you.', rate: 0.9 },

    // ---- exchange 4 · 18 Nov, 21:41 UTC. Under cee's first-hour review, a member asked this.
    { cue: 'time-2141' },
    { say: 'larry', id: 'ask-tomorrow', text: "Still the same day. A member asked: doesn't it come out tomorrow?", rate: 0.96, gap: 0.5 },
    { cue: 'card-timezone', at: 0.2 },
    { say: 'cee', id: 'timezone', text: 'Xbox lets you change your timezone easily. afaik it doesn’t work for ps5 tho', as: "Eks-box lets you change your time-zone easily. as-far-as-I-know it doesn't work for pee-ess-five though", rate: 0.85, gap: 0.4 }, // verbatim: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n2mjkggwvc2h · context: at://did:plc:zgufzyadu3gghypxz4hp5psp/app.bsky.feed.post/3n2mjhwfruc2m
    { wait: 0.7 },

    // ---- the house tries it. Larry turns his desk clock forward a day and calls the show over.
    { cue: 'larry-eyes-clock', at: -0.5 },
    { say: 'larry', id: 'excuse', text: 'Excuse me.', rate: 0.95, gap: 0 },
    { cue: 'clock-wind', at: 0.1 },
    { sfx: 'ticktock', at: 0.1, hold: 0.75, vol: 0.9 },
    { cue: 'clock-tomorrow' },
    { say: 'larry', id: 'finished', text: "It's tomorrow. We're finished.", rate: 0.95, gap: 0.1 },
    { sfx: 'applause', at: 0.05, hold: 0.22, vol: 0.6 },
    { say: 'sibyl', id: 'ruling', text: 'Larry. Put the clock back.', rate: 0.95, gap: 0 },
    { cue: 'clock-back', at: 0.25 },
    { sfx: 'whoosh', at: 0.25, hold: 1 },
    { sfx: 'laugh', at: 0, hold: 0.4 },
    { say: 'larry', id: 'button', text: "Doesn't work on desks.", rate: 0.9 },
    { sfx: 'sting', at: 0.2, hold: 0.6 },
    { sfx: 'applause', at: -0.3, hold: 0.3 },
  ],
}
