// Draft, commission of 21 November 2026: riemann-market-wrap, from the card riemann-learned-from-the-chart.
//
// A finance channel's market wrap in studio lines. The panel is three members, each saying the one
// post they published about the market on Friday 20 November 2026. Larry throws to them by the clock
// and orders a graphic after each. Then norvid's question, softmacs' reply and norvid's answer are
// read from their cards, and the plain reply costs Larry his graphics one at a time.
//
// What the staging has to keep (the terms for this card):
// - The running order is the order of posting, and every card shows its own time: 10:35 AM, 12:27,
//   12:38, 1:36, 1:46 and 1:52 PM Eastern (the chart's own clock is EST). The three panel posts are
//   three separate occasions and are never drawn as one conversation. The last three were one
//   exchange and are read in order.
// - No house line and no studio graphic says or implies that the announcement moved the price, by
//   how much, or why. The studio's graphics are furniture: a ticker made of arrows, a globe, more
//   arrows, a second ticker, a bell, a DEVELOPING banner, the session clock. None carries a number,
//   a company's name, a reason, or a word about the proof.
// - The chart is on screen only inside davidcrespo's card, drawn as his image shows it. His figure
//   is heard only in his voice.
// - softmacs and norvid are read aloud by Sibyl from their cards and have no puppet. norvid's first
//   card shows norvid's own text without the post it quoted. No caption or lower third repeats
//   softmacs' or norvid's words as the show's: their cards are simply the last things lit.
// - softmacs' post is cut once, at the end, with an ellipsis. What is cut repeats the conclusion the
//   post opens with.
// - Left out for length, and to keep the true order: davidcrespo's follow-up, lucresnooker's pair
//   and asa.engineer's reply (the last two were posted after softmacs had answered).
export default {
  id: 'riemann-market-wrap',
  title: 'Market Wrap',
  gap: 0.28,
  beats: [
    { cue: 'wrap-in' },                  // the desk is a business channel: MARKET WRAP, a session clock, a wall of dark analyst boxes
    { sfx: 'ding', hold: 0.7 },          // the opening bell

    // 10:35 AM. A top-level post with his own screenshot of the chart, unprompted.
    { say: 'larry', id: 'open', text: 'Markets. Friday, ten thirty-five Eastern. davidcrespo posts a chart.', as: "Mar-kits. Friday, ten, thirty-five Eastern. Day-vid-Krespo, poasts a chart." },
    { cue: 'card-chart', at: -0.6 },     // davidcrespo's card, the chart inside it as his image shows it; his box lights, PUPPET · PARODY
    { cue: 'disclaimer-in' },            // footer from the first guest: "Guests are puppets playing posting personas. Parody."
    { say: 'davidcrespo', id: 'dc-chart', text: "isn't it beautiful that we now live in a world where we can say the market values the capability to solve the Riemann Hypothesis at negative 80 billion dollars", as: "isn't it, beautiful that we now live in a world where we can say, the market, val-yooz, the capability to sawlv the Ree-mun Hypothesis at negative eight-ee billion dollars", rate: 0.95 }, // verbatim: at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z · context: at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z
    { sfx: 'laugh', at: 0.1, hold: 0.4 },
    { say: 'larry', id: 'ticker', text: 'Start the ticker.', rate: 0.94 },
    { cue: 'ticker-on', at: -0.25 },     // on "ticker": a ticker of arrows starts along the bottom. Arrows only

    // 12:27 PM. Top-level, no quote and no reply.
    { cue: 'box-huwupy', at: 0.45 },     // as Larry starts: a second box lights with huwupy's card as its lower third; the clock reads 12:27. The card and the caption carry the handle exactly for the whole line
    { say: 'larry', id: 'throw-huwupy', text: 'Twelve twenty-seven. huwupy. Unprompted.', as: 'Twelve twenty-seven. Hoo-woo-pee. Un-promp-tid.', gap: 0.45 }, // three separate stamps. The full stop after the handle is deliberate: the name and "Unprompted." should not run together into one phrase
    { say: 'huwupy', id: 'hu-attached', text: "wow the stock market was really attached to the riemann hypothesis being unsolved huh", as: "wow, the stawk mar-kit was really uh-tatched to the Ree-mun hypothesis being un-sawlvd, huh." }, // verbatim: at://did:plc:vw4e7blkwzdokanwp24k3igr/app.bsky.feed.post/3n2r4auppc22r · context: at://did:plc:vw4e7blkwzdokanwp24k3igr/app.bsky.feed.post/3n2r4auppc22r
    { sfx: 'chuckle', at: 0.1, hold: 0.4 },
    { say: 'larry', id: 'globe', text: 'Get me the globe.', rate: 0.92 },
    { cue: 'globe-on', at: -0.25 },      // on "globe": a globe spins up behind the desk. It shows nothing
    { sfx: 'laugh', at: 0.1, hold: 0.3 },

    // 12:38 PM. A quote of davidcrespo's chart post, which is still on screen.
    { cue: 'box-moultano', at: 0.45 },   // as Larry starts: a third box lights with moultano's card, the chart card set inside it as the quote it was; the clock reads 12:38. The card and the caption carry the handle exactly for the whole line
    { say: 'larry', id: 'throw-moultano', text: 'Twelve thirty-eight. moultano, quoting the chart.', as: 'Twelve thirty-eight. Mohl-tah-noh, kwoat-ing the chart.', gap: 0.45 },
    { say: 'moultano', id: 'mo-revenue', text: "The market anticipates a sharp loss of revenue from all the mathematicians who had been working on the Reimann hypothesis.", as: "The mar-kit anticipates a sharp, lawss of revenue from all the mathematicians who had been working on thee, Ree-mon hypothesis.", rate: 0.94 }, // verbatim: at://did:plc:h25avmes6g7fgcddc3xj7qmg/app.bsky.feed.post/3n2r4vqpsh22m · context: at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z
    { sfx: 'laugh', at: 0.1, hold: 0.4 },
    { say: 'larry', id: 'everything', text: 'Give me everything.', as: "Give me, everything.", rate: 0.92 },
    { cue: 'everything-on', at: -0.2 },  // on "everything": a second ticker running the other way, arrows up and down pointing at nothing, DEVELOPING, a bell. The set is mostly graphics
    { sfx: 'ding', at: 0.05, hold: 0.3 },
    { sfx: 'ding', at: 0, hold: 0.4 },

    // 1:36 PM. norvid's question, read as the post it was, with everything still flashing.
    { say: 'sibyl', id: 'question-intro', text: 'A question. norvid, one thirty-six.', as: 'A question. Nor-vid, one thirtysix.', rate: 0.95 },
    { cue: 'card-question', at: -0.7 },  // norvid's card, norvid's own text only; the clock reads 1:36
    { say: 'sibyl', id: 'question', text: "this is kind of confusing to me as 'caused' by the riemann result. plausibly just unrelated? but I don't understand the stock market", as: "this is kind of confusing to me as cawzd by the Ree-mun result. plaw-zib-lee just unrelated? but I don't understand the stawk mar-kit" }, // read aloud, exact: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2ra5ljyu22n

    // 1:46 PM. softmacs' reply to that question, read slowly. A graphic goes dark after each phrase.
    { cue: 'card-reply', at: 0.6 },      // as Sibyl starts: softmacs' card under norvid's, as the reply it was; the clock reads 1:46. The caption carries the handle exactly on this line, and the card from here to the end
    { say: 'sibyl', id: 'reply-intro', text: 'A reply. softmacs, one forty-six.', as: 'A ree-ply. Sawft-max, one forty-six.', rate: 0.95, gap: 0.6 },
    { say: 'sibyl', id: 'reply-1', text: "Probably mostly unrelated.", rate: 0.93, gap: 0.5 }, // read aloud, exact, part 1 of 4: at://did:plc:67pspyujjjy6zrzdlbbd4pjy/app.bsky.feed.post/3n2raopv4o226
    { cue: 'off-bell' },                 // the bell and DEVELOPING go dark
    { sfx: 'tick', hold: 0 },
    { say: 'sibyl', id: 'reply-2', text: "The rest of tech stocks were down yesterday afaik", as: "The rest of tek, stocks were down yesterday as-far-as-eye-know", rate: 0.93, gap: 0.5 }, // part 2 of 4: at://did:plc:67pspyujjjy6zrzdlbbd4pjy/app.bsky.feed.post/3n2raopv4o226
    { cue: 'off-arrows' },               // the arrows go dark
    { sfx: 'tick', hold: 0 },
    { say: 'sibyl', id: 'reply-3', text: "and I doubt that most investors see the Riemann announcement as meaningfully different", as: "and I doubt that most investors see the Reemahn announcement azz meeningfully different", rate: 0.93, gap: 0.5 }, // part 3 of 4: at://did:plc:67pspyujjjy6zrzdlbbd4pjy/app.bsky.feed.post/3n2raopv4o226
    { cue: 'off-ticker-two' },           // the second ticker goes dark
    { sfx: 'tick', hold: 0 },
    { say: 'sibyl', id: 'reply-4', text: "than all of the other math announcements earlier this year …", as: "thann, all of the other mathh, announcements, ur-lee-er this year …", rate: 0.93, gap: 0.4 }, // part 4 of 4, cut at the end: at://did:plc:67pspyujjjy6zrzdlbbd4pjy/app.bsky.feed.post/3n2raopv4o226
    { cue: 'off-wall' },                 // the analyst wall dims to outlines
    { sfx: 'tick', hold: 0 },

    // 1:52 PM. norvid's reply to softmacs.
    { say: 'sibyl', id: 'answer-intro', text: 'norvid, one fifty-two.', as: "Nawr-vihd, one fifty-two.", rate: 0.95, gap: 0.6 },
    { cue: 'card-answer', at: -0.5 },    // norvid's reply under softmacs' card; the clock reads 1:52
    { say: 'sibyl', id: 'answer', text: "yeah probably just broader market sloshing", as: "yeah probably just braw-der mar-kit slaw-shing", rate: 0.93 }, // read aloud, exact: at://did:plc:mssgex5rqek4wc66wgvzztbc/app.bsky.feed.post/3n2razdrepc2l
    { cue: 'off-ticker-one', at: -0.2 }, // on the last word the first ticker stops where it is. Bare lines, three cards, and the globe, still turning
    { sfx: 'tick', hold: 0 },
    { wait: 1.0 },                       // nothing. Larry looks at the globe

    { say: 'larry', id: 'keep', text: 'Can I keep the globe?', rate: 0.94 },
    { say: 'sibyl', id: 'button', text: 'You may not.', rate: 0.9, gap: 0.5 },
    { cue: 'globe-off', at: -0.15 },     // on "not": the globe goes dark
    { sfx: 'laugh', at: 0.15, hold: 0.4 },
  ],
}
