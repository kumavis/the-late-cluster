// made-mobius-chess-ringmate: "Chess for Three". A performed exchange, then a demonstration.
// Card: made-mobius-chess-ringmate. Ideas: writer-2-162 (the condition), writer-1-63 (the board).
//
// The thing: ringmate, one-dimensional chess on a Möbius strip, by @mokkenstorm.dev,
// playable at mobius.mokkenstorm.dev. Nobody at the studio has seen the real board, its rules or a
// game in play (the picture did not load; the page was down). So:
//   - the board is the studio's own drawing, from the picture's alt text ("a circle of chess pieces
//     on a 1 dimensional mobius strip"), and it carries the label STUDIO SKETCH whenever it is up;
//   - the chess pieces never move, and nothing says or shows how they would. The only thing that
//     travels on the board is Larry's gold flag, which is the studio's, and is not a piece;
//   - the credit "ringmate · mobius.mokkenstorm.dev · by @mokkenstorm.dev" is up whenever the board is.
//
// Real lines (bible 09, R3 and R4): three posts, each performed by its author's puppet, each tagged
// with its source and its occasion, each recorded in sources.json with its staged setup.
// The question between the second and third was asked by a member whose puppet does not speak this
// episode, so Larry asks what was asked, in his own words. The exchange stops on the third post.
//
// THE EXPERIMENT (production/experiment.md): the wordless stretch is the music block `lap` and
// the 1.6 s after it, from the end of the line `gold` to the cue `stretch-end`: about 11.8 s with no
// spoken or sung word and no audience sound. The segment's turn happens inside it and the board
// does it. No line before it says what the board will do, and no line after it says what it did.
//
// Cues for the staging:
//   board-in     the studio sketch is in the studio: a single file of squares bent into a loop
//                with one half twist, a circle of chess pieces standing on it; STUDIO SKETCH; the credit
//   maker-in     the maker's puppet and chyron (the parody footer already ran, at the episode's first guest); the
//                idea post's card, its words lighting as they are spoken
//   picture      the sketch takes the frame
//   mm-in        Minor Mobius's puppet and chyron; the reply's card
//   lamps        three small lamps under Minor Mobius: LIKE, REPOST, LOVE, all dark. In the line
//                `policy`, LIKE lights on "like!", REPOST on "repost!", LOVE stays dark on "love"
//   table        cut to the board with three seats round it: Larry (gold), Sibyl (silver), Eppy
//                (orange), a small name flag at each seat; the lamps are gone; the address glows once
//   flag-off     Larry's gold flag (LARRY'S SIDE) is planted on the square in front of him and sets
//                off along the strip; every square it crosses turns gold
//   pass-1, pass-2    it runs past Sibyl's flag, then Eppy's, on their face of the strip
//   twist-1      it goes through the twist
//   under        it arrives back at Larry's seat on the other face: underneath, upside down. It keeps going
//   pass-3, pass-4    it passes beneath the two flags
//   twist-2      through the twist again
//   all-gold     it arrives where it started, right way up. Every square is gold, on both faces,
//                and all three flags stand on gold. The beat stops
//   stretch-end  the end of the wordless stretch (Larry has looked left, right, then at us)
//   flag-down    on "resign": Larry's lamps read LIKE, REPOST, RESIGN, and his flag tips over
//
// Assembly (episode 002-2026-w47). This is the eighth of nine segments; the song, `music-alt`,
// follows it and closes the episode. This segment ends on the button, "I resign.", its laugh and
// the sting, with no long applause. The ending is about the resignation and nothing else; it does
// not look back at the night. The music block and its cue were renamed `lap` and `flag-off`.
//
// Trim (the owner's notes, 21 November 2026; what was removed is kept in production/trim.md).
// Cut 4: the line `day` is out, and so are the four lines after the button and their cue `sign-off`.
// The board stays as the flag left it until the song begins.
export default {
  id: 'made-mobius-chess-ringmate',
  title: 'Chess for Three',
  gap: 0.3,
  beats: [
    // ---- 1. the thing. (Trim, cut 4: the line that said it was built, and in about a day, stood between
    // these two lines. The credit and its address, up with the board, still say that it exists.)
    { cue: 'board-in' },
    { say: 'larry', id: 'open', text: 'One more game before the song.' },
    { say: 'larry', id: 'one-post', text: 'It began as one post.' },
    { cue: 'maker-in', at: 0.1 },
    // the idea post, top-level, Tue 17 Nov 2026 19:03Z, 2 likes. Card up for the whole line.
    { say: 'mokkenstorm', id: 'idea', text: '3 player 1d chess on a Möbius strip wormed its way into my brain and now I need to build it', as: 'three player, one-dee chess, on a Mobius, strip, wormed its way into my brain, and now I need to build it', rate: 0.88, gap: 0.4 }, // verbatim: at://did:plc:r5bee2hexwjtmhkfmfu2tphx/app.bsky.feed.post/3n2jqaikml22p · context: at://did:plc:r5bee2hexwjtmhkfmfu2tphx/app.bsky.feed.post/3n2jqaikml22p
    { sfx: 'chuckle', at: 0.1, hold: 0, vol: 0.8 },

    // ---- 2. the condition. Minor Mobius was tagged under the maker's picture and replied.
    { cue: 'picture', at: 0.25 },
    { say: 'larry', id: 'tag', text: 'Then came a picture, and a tag under it. The tag said: Minor Mobius.', as: 'Then came uh picture, and a tag under it. The tag said: Minor Mobius.', gap: 0.55 },
    { cue: 'mm-in', at: 0.1 },
    // reply, Wed 18 Nov 2026 02:48Z, 9 likes, to a member's bare tag under the picture
    { say: 'minormobius', id: 'awesome', text: 'That’s awesome, I need a website tho', as: 'That’s awesome, I need a website though', rate: 0.94, accent: 0.34, gap: 0.4 }, // verbatim: at://did:plc:7zre4plmd5jllccww575j6sb/app.bsky.feed.post/3n2kkafekjs2p · context: at://did:plc:p572wxnsuoogcrhlfrlizlrb/app.bsky.feed.post/3n2kdulliuk7q
    // Larry asks what another member asked under that reply
    { say: 'larry', id: 'meaning', text: 'Meaning you only like posts that are also websites?', rate: 1.04 },
    { cue: 'lamps', at: 0.2 },
    // reply, Wed 18 Nov 2026 16:30Z, 5 likes, to that question
    { say: 'minormobius', id: 'policy', text: 'I like! I repost! But I’m not gonna love unless there’s a link', as: 'I like! I repost! But I’m not gonna love unless there’s a link', rate: 0.92, gap: 0.4 }, // verbatim: at://did:plc:7zre4plmd5jllccww575j6sb/app.bsky.feed.post/3n2ly5joc5c2y · context: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2ln7g7bm225
    { sfx: 'laugh', at: 0.15, hold: 0.8 },

    // ---- 3. the house sits down to play
    { cue: 'table', at: -0.3 },
    { say: 'eppy', id: 'players', text: 'Three players, and one strip!', rate: 0.88 },
    { say: 'sibyl', id: 'pick', text: 'Pick a side.', as: 'Pick a sighed.', rate: 0.9 },
    { say: 'larry', id: 'gold', text: "I'll take this side. In gold.", rate: 0.96 },

    // ---- 4. the wordless stretch: 16 beats at 96 bpm (10 s), then 1.6 s. Pete and Al only, no words.
    { music: { id: 'lap', bpm: 96, gap: 0.25, tracks: [
      { who: 'pete', id: 'lap-beat', beat: 'B . . t | . . t . | ! . . t | . . t . ', loops: 4, vol: 0.55 },
      // Al's hummed bass: eight beats for the first lap, eight for the second, climbing home
      { who: 'al', id: 'lap-bass', vol: 0.6, beat: 'm:41 . . . | . . . . | m:44 . . . | . . . . | m:46 . . . | . . . . | m:44 . . . | . . . . | m:43 . . . | . . . . | m:46 . . . | . . . . | m:48 . . . | m:50 . . . | m:51 . . . | m:53 . . . ' },
    ] } },
    { cue: 'flag-off', at: -10 },
    { cue: 'pass-1', at: -8.333 },
    { sfx: 'tick', at: -8.333, hold: 0 },
    { cue: 'pass-2', at: -6.667 },
    { sfx: 'tick', at: -6.667, hold: 0 },
    { cue: 'twist-1', at: -5.833 },
    { sfx: 'whoosh-1', at: -6.0, hold: 0, vol: 0.7 },
    { cue: 'under', at: -5 },
    { cue: 'pass-3', at: -3.333 },
    { sfx: 'tick', at: -3.333, hold: 0 },
    { cue: 'pass-4', at: -1.667 },
    { sfx: 'tick', at: -1.667, hold: 0 },
    { cue: 'twist-2', at: -0.833 },
    { sfx: 'whoosh-2', at: -1.0, hold: 0, vol: 0.7 },
    { cue: 'all-gold' },
    { sfx: 'ding', at: 0.02, hold: 0 },
    { wait: 1.6 },
    { cue: 'stretch-end' },

    // ---- 5. after. Nobody says what the board just did.
    { sfx: 'laugh', hold: 0.8 },
    { say: 'sibyl', id: 'move', text: 'Larry. Your move.', gap: 0.3 },
    { say: 'larry', id: 'like', text: 'I like. I repost.', as: 'I like. I ree-post.', rate: 0.85, gap: 0.5 },
    { say: 'larry', id: 'resign', text: 'I resign.', rate: 0.9, gap: 0.45 },
    { cue: 'flag-down', at: -0.3 },
    { sfx: 'laugh', at: 0.15, hold: 1 },

    // ---- 6. the button. (Trim, cut 4: four lines at the table stood here, before the sting.) The
    // song now follows and closes the episode, so the long applause that closed it here is gone
    // (21 November 2026): the segment ends on the laugh and the sting.
    { sfx: 'sting', at: 0.2 },
  ],
}
