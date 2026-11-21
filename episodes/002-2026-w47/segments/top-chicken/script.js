// top-chicken: the sports desk, week 2026-W47 (format: packages/show/tools/README.md).
// Eppy presents; Sibyl reads every real post aloud exactly, as the post it was, with its card up
// and its words lighting. No real account's puppet speaks. Staging notes are in notes.json.
//
// Names: only Saturday's winner is named. "cee" is said twice, both times by Sibyl, in the two
// places the lab heard it as itself; Eppy never says it (in his voice it comes out as a pronoun).
// On a read post `as` only respells, word for word: numbers as words, "cee.wtf" by its display
// name, and commas for breath.
// In house lines "record" is respelled rekkerd, or the engine stresses it as the verb. The
// ellipsis tokens stay in `as` so the card's words light on time.
//
// Assembly (episode 002-2026-w47). Sixth segment; Larry throws to the desk by name.
// Who keeps the score: the results come from @topchicken.bsky.social, an account that labels
// itself a bot, whose bio names the member who manages it and calls its rankings unofficial
// (production/review/consent-check.md). So it is never called the game's account or official:
// Eppy says a bot keeps the score, and its card carries the tag BOT · UNOFFICIAL RANKINGS.
// The manager is not named on air; the bio is the only source for it.
// A handle inside a post that is read aloud (line recordline): Sibyl says the account's display
// name, cee, where the post has the handle cee.wtf; the card shows the post exactly and lights
// the handle as she says the name. The ruling and its reason are in production/assembly.md.
//
// Trim (the owner's notes, 21 November 2026; what was removed is kept in production/trim.md).
// Cut 2: the guess is out (the one-word call, and the plant for it: "still" no longer stays lit).
// Cut 3: the play-money market block is out.
// With both, the segment ends on `smallest` and the sting.
export default {
  id: 'top-chicken',
  title: 'Top Chicken',
  gap: 0.28,
  beats: [
    { say: 'larry', id: 'throw', text: 'And now, the sports. Eppy?', as: 'And now, the sports. Ep-ee?' }, // Larry at his desk, one line, then the cut
    { sfx: 'whoosh', at: 0.1, hold: 1 },
    { cue: 'desk-in' }, // the sports desk; the board reads TOP CHICKEN (the title lives on the board, never on a punch)
    { say: 'eppy', id: 'open', rate: 0.88, text: "Sports desk. The game is Top Chicken.", as: "Sports desk. The game is Top, Chik-kun." },   // the comma is a breath: without it the name was heard, in some mixes, as an unkind word about the game
    { cue: 'scorer-tag', at: 0.2 }, // tag on the board, glance-sized: SCORED BY A BOT · UNOFFICIAL
    { say: 'eppy', id: 'scorer', rate: 0.88, text: 'The score is kept by a bot.' },

    // ---- the result. Figures from the bot's result post for Saturday: at://did:plc:bty3nc67lteylmmb7hvgxeu5/app.bsky.feed.post/3n2bo6xhuea2e
    { cue: 'counter-in' }, // a counter rolls from 2,648 down to 1, landing on "One winner". Tag, unspoken: 245 OF 760 PEOPLE POSTED
    { say: 'eppy', id: 'field', rate: 0.88, text: 'Saturday: 2,648 posts. One winner.', as: 'Saturday: two-thousand-six-hundred-forty-eight posts. One winner.' },
    { cue: 'winner-in', at: 0.2 }, // the board flips to CEE, with the handle @cee.wtf under it, on the last word of the line
    { say: 'sibyl', id: 'winner', rate: 0.9, vol: 1.15, text: "Saturday's winner: cee.", as: "Saturday's winner: C." },
    { sfx: 'woo', at: 0.1, hold: 0.65 },
    { say: 'eppy', id: 'score', rate: 0.88, text: '201 likes. The winning post:', as: 'Two-hundred-one likes. The winning post:' }, // the board adds 201 on the number. No reaction: it is played straight
    { cue: 'card-post-in' }, // post card: cee, @cee.wtf, Fri 13 Nov, 222 likes. Tag, unspoken: 201 AT THE RESULT
    // the winning post, read aloud exactly: at://did:plc:xb2urvqt5f4zzccjs46hysbf/app.bsky.feed.post/3n27n6oxsyk2l
    { say: 'sibyl', id: 'post', text: 'i love when people think their laptop somehow uses less power per task than a datacenter', as: 'i love when people think their laptop somehow yoo-zuz less power, per taskk, than a dayta-center' },
    { wait: 0.4 }, // dry. The show says nothing about what the post says; the next line is about the score
    { cue: 'card-post-out' },

    // ---- the record and the gap
    { cue: 'bars-in' }, // two bars to one scale: a sliver, 201, labelled CEE; a tall one, 6,186, labelled with a question mark; the bracket between them reads 5,985
    { say: 'eppy', id: 'gap', rate: 0.88, text: 'That score is 5,985 short of the record.', as: 'That score is five-thousand-nine-hundred-eighty-five, short of the rekkerd.' },
    { say: 'eppy', id: 'heldby', rate: 0.9, text: 'The record is held by?', as: 'The rekkerd is held by?' },
    { cue: 'card-record-in' }, // the result post's card: TopChicken 🤖, @topchicken.bsky.social, Sat 14 Nov, 2 likes, showing only the cut that is read. Tag on the card: BOT · UNOFFICIAL RANKINGS
    // the record line of that result post, read aloud exactly, the cut marked: at://did:plc:bty3nc67lteylmmb7hvgxeu5/app.bsky.feed.post/3n2bo6xhuea2e
    // on the word "cee.wtf" the tall bar's question mark flips to CEE
    { say: 'sibyl', id: 'recordline', rate: 0.9, text: '… All-time top chicken is still cee.wtf with a score of 6186 to beat. …', as: '… All-time topp, Chik-kun, is still see, with a score of six-thousand-one-eighty-six to beat. …' },
    { say: 'eppy', id: 'trails', rate: 0.84, gap: 0.5, text: 'The winner trails the winner.' },
    { sfx: 'laugh', at: 0.15 },
    { cue: 'share-tag', at: -0.3 }, // tag on the bars, unspoken: 201 ÷ 6,186 = 3.2 %
    { cue: 'titles-in' }, // the card goes. Three identical crowns: two carry a score and no name or day (440, 366), one is gold: CEE 201
    { say: 'eppy', id: 'smallest', rate: 0.88, text: 'The smallest win of the week. Same title.' },
    // (trim, cut 3: the market block stood here, after `smallest`)

    // ---- the end (trim, cut 2: the guess stood here, before the sting). The sting is the segment's own and stays
    { sfx: 'sting', at: 0.05 },
  ],
}
