// top-chicken: the sports desk, week 2026-W47 (format: packages/show/tools/README.md).
// Eppy presents; Sibyl reads every real post aloud exactly, as the post it was, with its card up
// and its words lighting. No real account's puppet speaks. Staging notes are in notes.json.
//
// Names: only Saturday's winner is named. "cee" is said twice, both times by Sibyl, in the two
// places the lab heard it as itself; Eppy never says it (in his voice it comes out as a pronoun).
// On a read post `as` only respells, word for word: numbers as words, "cee.wtf" by its display
// name, "gg" as good-game (the house table does the same for gm and gn), and commas for breath.
// In house lines "record" is respelled rekkerd, or the engine stresses it as the verb. The
// ellipsis and emoji tokens stay in `as` so the card's words light on time.
export default {
  id: 'top-chicken',
  title: 'Top Chicken',
  gap: 0.28,
  beats: [
    { sfx: 'whoosh', hold: 0.5 },
    { cue: 'desk-in' }, // the sports desk; the board reads TOP CHICKEN (the title lives on the board, never on a punch)
    { say: 'eppy', id: 'open', rate: 0.88, text: "Sports desk. The cluster's daily game is Top Chicken.", as: "Sports desk. The cluster's daily game is Top chick-in." },

    // ---- the result. Figures from Saturday's result post: at://did:plc:bty3nc67lteylmmb7hvgxeu5/app.bsky.feed.post/3n2bo6xhuea2e
    { cue: 'counter-in' }, // a counter rolls from 2,648 down to 1, landing on "One winner". Tag, unspoken: 245 OF 760 PEOPLE POSTED
    { say: 'eppy', id: 'field', rate: 0.88, text: 'Saturday: 2,648 posts. One winner.', as: 'Saturday: two-thousand-six-hundred-forty-eight posts. One winner.' },
    { cue: 'winner-in', at: 0.2 }, // the board flips to CEE, with the handle @cee.wtf under it, on the last word of the line
    { say: 'sibyl', id: 'winner', rate: 0.95, vol: 1.15, text: "Saturday's winner: cee.", as: "Saturday's winner: see." },
    { sfx: 'woo', at: 0.1, hold: 0.65 },
    { say: 'eppy', id: 'score', rate: 0.88, text: '201 likes. The winning post:', as: 'Two-hundred-one likes. The winning post:' }, // the board adds 201 on the number. No reaction: it is played straight
    { cue: 'card-post-in' }, // post card: cee, @cee.wtf, Fri 13 Nov, 222 likes. Tag, unspoken: 201 AT THE RESULT
    // the winning post, read aloud exactly: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n27n6oxsyk2l
    { say: 'sibyl', id: 'post', text: 'i love when people think their laptop somehow uses less power per task than a datacenter', as: 'i love when people think their laptop somehow uses less power, per task, than a data-center' },
    { wait: 0.4 }, // dry. The show says nothing about what the post says; the next line is about the score
    { cue: 'card-post-out' },

    // ---- the record and the gap
    { cue: 'bars-in' }, // two bars to one scale: a sliver, 201, labelled CEE; a tall one, 6,186, labelled with a question mark; the bracket between them reads 5,985
    { say: 'eppy', id: 'gap', rate: 0.88, text: 'That score is 5,985 short of the record.', as: 'That score is five-thousand-nine-hundred-eighty-five, short of the rekkerd.' },
    { say: 'eppy', id: 'heldby', rate: 0.9, text: 'The record is held by?', as: 'The rekkerd is held by?' },
    { cue: 'card-record-in' }, // the result post's card: TopChicken, @topchicken.bsky.social, Sat 14 Nov, 2 likes, showing only the cut that is read
    // the record line of that result post, read aloud exactly, the cut marked: at://did:plc:bty3nc67lteylmmb7hvgxeu5/app.bsky.feed.post/3n2bo6xhuea2e
    // on the word "cee.wtf" the tall bar's question mark flips to CEE; the word "still" stays lit when the line is over
    { say: 'sibyl', id: 'recordline', rate: 0.95, text: '… All-time top chicken is still cee.wtf with a score of 6186 to beat. …', as: '… All-time top chicken is still see, with a score of sixty-one-eighty-six to beat. …' },
    { say: 'eppy', id: 'trails', rate: 0.84, gap: 0.5, text: 'The winner trails the winner.' },
    { sfx: 'laugh', at: 0.15 },
    { cue: 'share-tag', at: -0.3 }, // tag on the bars, unspoken: 201 ÷ 6,186 = 3.2 %
    { cue: 'titles-in' }, // the card goes. Three identical crowns: two carry a score and no name or day (440, 366), one is gold: CEE 201
    { say: 'eppy', id: 'smallest', rate: 0.88, text: 'The smallest win of the week. Same title.' },

    // ---- the side game, told only from what its players posted about it
    { cue: 'market-in' }, // a market board, labelled THE SHOW'S SKETCH. Header: CHICKEN BUCKS · NO REAL MONEY. Small credit: topchicken.cee.wtf
    { say: 'eppy', id: 'market', rate: 0.88, text: 'Members also play a prediction market on this game. Chicken bucks. No real money.' },
    { say: 'eppy', id: 'sunday', rate: 0.9, text: "Sunday. One player's bot." },
    { cue: 'card-loss-in' }, // post card: Singularity's Bounty e/CC, @catblanketflower.yuwakisa.com, Sun 15 Nov, 10 likes
    // read aloud exactly: at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2exnpv6us2k
    // on "$60,000" the sketched line drops out through the bottom of the board
    { say: 'sibyl', id: 'loss', rate: 0.95, text: 'my bot lost list $60,000 chicken bucks today 🤣😭', as: 'my bot, lost list, sixty-thousand chicken bucks, to-day 🤣😭' },
    { sfx: 'aww', at: 0.3 },
    { say: 'eppy', id: 'later', rate: 0.9, text: 'Three days later. Another player, about that bot.' },
    { cue: 'card-gg-in' }, // post card: I am nameless yet others name me, @7778777.online, Wed 18 Nov, 3 likes, the cut marked
    // read aloud exactly, the cut marked: at://did:plc:jg6o3bgflm3q4y7jpmpvenj3/app.bsky.feed.post/3n2me4phkfsed
    // on "can't win" the sketched line comes back in through the top of the board
    { say: 'sibyl', id: 'gg', rate: 0.88, text: "… so good at gambling now that you can't win even if you play well gg", as: "… so good at gambling now, that you can't win, even if you play well. good-game." },
    { sfx: 'ooh', at: 0.15 },
    { say: 'eppy', id: 'owner', rate: 0.9, text: 'The owner replied.' },
    { cue: 'card-fix-in' }, // post card: Singularity's Bounty e/CC, @catblanketflower.yuwakisa.com, Wed 18 Nov, 1 like, a reply to @7778777.online, the cut marked
    // read aloud exactly, the cut marked: at://did:plc:cwa5qtro5bhfz25opigbe6qi/app.bsky.feed.post/3n2miex33mk27
    // on "cheap" a price tag reading CHEAP swings onto the sketched line: the engine is weak on that word, so the card and the tag carry it too
    { say: 'sibyl', id: 'fix', rate: 0.95, text: 'I tweaked the logic for start-of-day lottery tickets to only buy the cheap ones …', as: 'I tweaked the logic for start-of-day lottery tickets, to only buy the cheap ones …' },
    { say: 'eppy', id: 'fundamentals', rate: 0.85, gap: 0.5, text: 'Fundamentals.' },
    { sfx: 'laugh', at: 0.15 },
    { cue: 'market-out' },

    // ---- the guess: labelled in the voice and, from here to the end, on the board
    { cue: 'guess-in' }, // board header until the segment ends: EPPY'S GUESS · NOT A RESULT
    { say: 'eppy', id: 'guess', rate: 0.88, text: 'This next part is my guess.' },
    { cue: 'guess-sum' }, // under the header: MEDIAN OF 42 FETCHED RESULTS · 535, then, on "eleven": 6,186 ÷ 535 = 11.6
    { say: 'eppy', id: 'typical', rate: 0.88, text: 'In the results we fetched, a typical winning score is 535.', as: 'In the results we fetched, a typical winning score is five-hundred-thirty-five.' },
    { say: 'eppy', id: 'eleven', rate: 0.88, text: 'The record is over eleven times that.', as: 'The rekkerd is over eleven times that.' },
    { say: 'eppy', id: 'call', rate: 0.88, text: 'So, the next result post, in one word:' },
    { cue: 'guess-flap', at: 0.3 }, // a split-flap row under the header flips to STILL as Sibyl says it
    { say: 'sibyl', id: 'still', rate: 0.9, gap: 0.45, text: 'Still.' },
    { say: 'eppy', id: 'wrong', rate: 0.88, gap: 0.5, text: "I hope I'm wrong." },
    { sfx: 'laugh', at: 0.15, hold: 0.3 },
    { sfx: 'sting', at: 0.05 },
  ],
}
