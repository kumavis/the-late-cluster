// riemann-breaking-news: one segment in place of riemann-proof-that-fits and riemann-market-wrap
// (the owner's notes of 21 November 2026). A news channel breaks in, drawn in studio lines.
//
// Larry, as the anchor, reads the one sentence of news. Then two things the cluster posted on
// Friday 20 November 2026, kept apart:
//   1. The chart. davidcrespo's puppet says his chart post. moultano's puppet says moultano's
//      quote of it.
//   2. The question. Larry asks what a zeta function is. Amber (@shimmermathlabs.com) calls
//      @zetaof1.bsky.social. Sibyl reads the reply. Amber answers it with a whole proof in one
//      post, and the studio builds it while her puppet says it: her steps, her order, no step of
//      the house's. The post fits on a small card. What it proves does not fit in the studio.
//
// WHAT THE STAGING HAS TO KEEP (production/research/terms-riemann.md, the combined segment)
// - News graphics are at the top only, and there are two: a banner with the one word BREAKING,
//   and a strap under it. The strap carries Larry's headline as its caption, the sentence
//   exactly as he says it and never a shorter one, and then three words: THE CLUSTER REACTS.
//   No other headline, crawl, clock, stamp, check mark or bug with words, anywhere in the segment.
// - On Larry's word "chart" the banner and the strap drop out of the frame, before any member's
//   card is up, and they do not come back. No frame has a news graphic in it together with the
//   chart, a post about the market, or her proof.
// - The show draws nothing of its own about the market: no ticker, arrow, globe, bell or line.
//   The chart is on screen only as davidcrespo's image inside his card, and inside moultano's
//   card as the post it quoted. It is never lifted out of a card, enlarged past it or marked
//   up. No house line says what a price did, or why.
// - The chart and the question are two occasions. `clear` is a hard cut: every card and guest
//   box from the first is gone before Larry asks. No line says one came after the other.
// - Every post card has its author's display name and handle, its date (20 Nov 2026) and its
//   like count, and lights word by word as it is spoken or read. Nobody says a post's time.
// - What each card says it answered: moultano's has davidcrespo's chart card set inside it,
//   as the quote it was. zetaof1's says it replied to her call, and her proof
//   says it replied to zetaof1. Her call card is marked REPLY and names nobody: the account
//   whose question she was answering is not in this segment, on a card or anywhere else. Larry
//   has just asked that question himself.
// - Three guests, PUPPET · PARODY on each chyron, and the disclaimer footer from davidcrespo's
//   first frame to the end. zetaof1 has no puppet and no voice: Sibyl reads the card, exactly,
//   with no remark and no look.
// - From `proof-card` to the end: her post, small and complete, at the left edge. Under it,
//   PROOF AS POSTED BY @shimmermathlabs.com. One glance label beside it: ZETA AT 1 · NOT THE
//   HYPOTHESIS. This is her proof about zeta at 1. No line, label or prop ties it to the news,
//   or sets its size beside anything but the pile. Nothing of the show's lands on it: no stamp,
//   no check mark, no verdict. Her own square is the last character of her post and lights on her
//   card when she gets there.
//
// TEXT. Every post's text is taken from the kept card by its address. A cut is marked with an
// ellipsis. zetaof1's reply is read with two cuts, and its card keeps the whole post. Her proof
// is said in four lines, in her order. Two pieces of it are cut from the voice, marked, and
// shown instead exactly as posted: her line of symbols, which the bars are (`bars`), and one
// clause (`tag-k`). The four lines and the two pieces, put together, are her whole post.
//
// The script has been fitted by a sound editor; its lines carry `as`. Captions are on and light
// each word as it is said, and so do the cards, so the exact words are always on screen.
export default {
  id: 'riemann-breaking-news',
  title: 'Breaking News',
  gap: 0.28,
  beats: [
    // ---- the news
    // Picture: the studio as a news channel. Larry at his desk, as the anchor. Across the lower
    // third a banner with one word, BREAKING, and an empty strap under it. Camera: wide on the
    // set as the sting starts, pushing in fast, at a medium on Larry by his first word.
    { cue: 'breaking-in' },
    { sfx: 'sting' },
    // The strap is where this line's caption runs, lit word by word: the sentence as he says
    // it is the headline, and there is no shorter one. If the caption cannot sit there, the
    // strap stays empty.
    { say: 'larry', id: 'larry-news', text: 'Breaking news. A mathematician has announced they believe they have found a proof of the Riemann hypothesis.', as: "Breaking news. Uh mathematician has announced they believe they have found uh proof of the Ree-mun hypothesis." },

    // Picture: the strap wipes to three words, THE CLUSTER REACTS. Camera: holds on Larry.
    { cue: 'cluster-reacts', at: 0.25 },
    { say: 'larry', id: 'larry-cluster', text: 'The cluster spent Friday posting about it.' },
    // A beat, and then all the bulletin has. Same face, same gravity.
    { say: 'larry', id: 'larry-chart', text: 'davidcrespo posted a chart.', rate: 0.94, gap: 0.5 },
    // Picture: on "chart" the banner and the strap drop out of the bottom of the frame. Larry
    // watches them go. They are gone before the next cue. Camera: holds on him, then eases
    // left to make room beside him.
    { cue: 'banner-off', at: -0.35 },

    // ---- the chart. A top-level post with his own screenshot, unprompted.
    // Picture: a guest box opens beside Larry's, the way a news channel brings in a
    // correspondent: davidcrespo's puppet, PUPPET · PARODY on the chyron. His post card is up
    // with the chart inside it, drawn as his image shows it. The disclaimer footer comes in
    // here. Camera: the two boxes side by side, and a slow push on the card as he says it.
    { cue: 'card-chart', at: 0.1 },
    { say: 'davidcrespo', id: 'dc-chart', text: "isn't it beautiful that we now live in a world where we can say the market values the capability to solve the Riemann Hypothesis at negative 80 billion dollars" }, // verbatim: at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z · context: at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z
    { sfx: 'laugh', at: 0.1, hold: 0.3 },

    // moultano's quote of the chart post.
    // Picture: a second guest box opens: moultano's puppet, PUPPET · PARODY on the chyron. The
    // post card has davidcrespo's chart card set inside it, as the post it quoted. Camera:
    // three boxes in a row, and a slow push on moultano's as the line is said.
    { cue: 'card-moultano', at: 0.15 },
    { say: 'larry', id: 'larry-moultano', text: 'moultano, quoting the chart.', as: "Mole-tonn-oh, kwoat-ing the chart." },
    { say: 'moultano', id: 'mo-revenue', text: "The market anticipates a sharp loss of revenue from all the mathematicians who had been working on the Reimann hypothesis.", as: "Thee market anticipates a sharp loss of revenue from all the mathematicians who had been working on the Reimann high-poth-uh-suss." }, // verbatim: at://did:plc:h25avmes6g7fgcddc3xj7qmg/app.bsky.feed.post/3n2r4vqpsh22m · context: at://did:plc:ctphcgyhnllfluywokibtrgb/app.bsky.feed.post/3n2qvzbb7dk2z
    { sfx: 'laugh', at: 0.1, hold: 0.3 },

    // ---- the question. A different occasion, and nothing from the chart carries over.
    // Picture: a hard cut. Every card and guest box is gone. Larry alone at the desk, and no
    // word on any graphic. Camera: a single on Larry, closer than the news was.
    { cue: 'clear', at: 0.1 },
    { say: 'larry', id: 'larry-ask', text: 'For viewers just joining us, and for me: what is a zeta function?', as: "For viewers just joining us, and for me: what is uh zeta function?" },
    // Picture: on "zeta", over his shoulder, where a news channel hangs its picture: one
    // letter, a zeta, and nothing with it. A glance, not a caption. Camera: holds.
    { cue: 'zeta-sign', at: -0.85 },

    // ---- the call. Her reply to that question.
    // Picture: a guest box opens beside Larry's: Amber's puppet, PUPPET · PARODY on the chyron.
    // Her post card is up as she says it; its reply line reads REPLY and carries no handle (see
    // the top of the file). As she says zetaof1's handle it lights on her card, and a third box
    // lights beside hers with nobody in it: an account plate, Zeta Of 1 · @zetaof1.bsky.social,
    // under a follow spot. On "time to shine" the spot gets brighter. Camera: on "you got this"
    // a slow push on the lit box. It waits. So does everybody.
    { cue: 'call-card', at: 0.1 },
    { say: 'amber', id: 'amber-call', text: "calling @zetaof1.bsky.social, your whole account was leading up to this day, now is your time to shine, you got this", as: "calling zay-tuh-of-one-dot-bee-sky-dot-social, your whole account was leading up to this day, now is your time to shine, you got this", rate: 0.82 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r4vvxhok24 · context: at://did:plc:f6n22z62adionrvb5s6n6vfk/app.bsky.feed.post/3n2qz6ywwrc2b
    { wait: 0.5 },

    // ---- the reply. zetaof1 has no puppet. Sibyl reads the card, exactly as posted, in two
    // breaths, and the break between them is the post's own line break. Two cuts, both marked.
    // Picture: zetaof1's post card rises into the lit box: the whole post, with its line
    // breaks. Each word lights as she reaches it. The words she passes over stay on the card,
    // unlit, and the caption marks each cut. Camera: holds on the card. No cutaway, no look,
    // and nothing in the studio answers it.
    { cue: 'zeta-card' },
    { say: 'sibyl', id: 'sibyl-zeta-1', text: "The Zeta function is too intricate to explain on BlueSky Which is totally the zeta-functions fault and not mine so", as: "The Zeta function is too intricate to explain on blue-sky Which is totally the zeta-functions fault, and not mine so", gap: 0.2 }, // read aloud, exact: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r4vvxhok24
    { sfx: 'laugh', at: 0.1, hold: 0.3 },
    { say: 'sibyl', id: 'sibyl-zeta-2', text: "Also zeta evaluated at 1 … diverges to infinity …", as: "Also zeta, evaluated att one … diverges to infinity …" }, // read aloud, exact, cut twice: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r4vvxhok24

    // ---- the proof. Nothing comes between the reply and her answer to it.
    // Picture: the boxes open out into the whole studio, and the zeta and the account plate
    // go. Her post card comes up full size, marked as her reply to zetaof1. On "it does
    // actually" it shrinks to a small card at the left edge, whole, and stays there to the
    // end; the credit and the glance label come up with it. Camera: on the card, then pulling
    // back as it shrinks to a wide of the studio: Larry at the desk, Amber on the couch, and
    // an empty floor between them.
    { cue: 'proof-card', at: 0.15 },
    { say: 'amber', id: 'amber-fits', text: "i was gonna joke proof won't fit, but it does actually. …", as: "i was gonna, joke proof won't fit, but itt does, actually. …" }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // Her line of symbols is cut from the voice, marked on the lines either side. It is shown
    // instead, exactly as posted, and it is the picture:
    //   ζ(1) = 1 + ½ + (⅓ + ¼) + (⅕ + ⋯ + ⅛) + ⋯
    // Picture: beside the desk, in her colour, one upright bar lands for each term, on a tick.
    // The term stands under its bar as she wrote it, and lights on her card as it lands: a bar
    // for 1; a bar half as tall; her first bracket opens and takes a third and a quarter; her
    // second takes a fifth, two bars over her dots, which stay dots, and an eighth. Nothing is
    // written under a bar that she did not write. On her last dots the stage door swings open:
    // more brackets are waiting in a line down the corridor, each wider than the last. Camera:
    // tracks along the bars as they land, and stops on the door.
    { cue: 'bars', at: 0.15 },
    { sfx: 'chuckle', at: 0.1, hold: 0 },
    { wait: 0.3 },
    { sfx: 'tick', hold: 0 }, { wait: 0.25 }, { sfx: 'tick', hold: 0 }, { wait: 0.25 },
    { sfx: 'tick', hold: 0 }, { wait: 0.25 }, { sfx: 'tick', hold: 0 }, { wait: 0.25 },
    { sfx: 'tick', hold: 0 }, { wait: 0.25 }, { sfx: 'tick', hold: 0 }, { wait: 0.25 },
    { sfx: 'tick', hold: 0 }, { wait: 0.25 }, { sfx: 'tick', hold: 0 }, { wait: 0.25 },

    // Picture: on "twice as many terms" a count ticks under each group in turn: 1, 2, 4. On
    // "at least half as large" a guide line is drawn across each bracket at half the height of
    // the last bar of the group before, and every bar in the bracket reaches it. What stands
    // above the line dims. It is not thrown away: it is the "at least". Camera: holds wide on
    // the bars.
    { cue: 'brackets', at: 0.1 },
    { say: 'amber', id: 'amber-brackets', text: "… each bracket has twice as many terms as the last, each at least half as large as its last term. …", as: "… eech brak-it has twice as many terms as the last, each at least half as large as its last term. …" }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // One clause of her post is cut from the voice here, marked on the lines either side. It
    // goes up instead as a tag on the brackets, exactly as she posted it, with both ends
    // marked as the cuts they are:
    //   … more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …
    // Picture: the tag goes up as she reaches "its last term", stays on the brackets through
    // her next line, and comes down when the first slab drops (`slabs`). The same clause lights
    // on her card. It is a label, not a line, and nothing waits for it to be read. Camera:
    // holds.
    { cue: 'tag-k', at: -0.9 },

    // Picture: on "adds" the bars of each group, cut at the guide line, stack. Every stack
    // comes to the same height, half the bar for 1, and becomes one slab marked ≥ ½, the last
    // two symbols of the line she is saying. Camera: a slow push toward the slabs.
    { cue: 'press', at: 0.1 },
    { say: 'amber', id: 'amber-adds', text: "… so every block adds ≥ ½. …", as: "… so, eh-ver-ee block adds at-least, a-half. …" }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // ---- the pile. Nobody speaks, and nobody counts. Each slab lands on a tick, and the ticks
    // get closer together.
    // Picture: the three slabs drop, one at a time, onto a pile beside Larry's desk, and each
    // one's mark flashes as it lands. Then the brackets under her dots keep coming, each twice
    // as wide as the last by her own rule, their bars down to slivers: one as wide as the desk;
    // one in through the stage door, past the band; one through the wall, still arriving when
    // its slab drops. Every slab is the same size. The pile passes the desk top, then Larry's
    // bow tie, then Larry, who watches it go by. Camera: locked wide, so the pile climbs the
    // frame and goes out through the top of it.
    { cue: 'slabs', at: 0.3 },
    { wait: 0.4 },
    { sfx: 'tick', hold: 0 }, { wait: 0.4 }, { sfx: 'tick', hold: 0 }, { wait: 0.34 }, { sfx: 'tick', hold: 0 }, { wait: 0.28 },
    { sfx: 'tick', hold: 0 }, { wait: 0.22 }, { sfx: 'tick', hold: 0 }, { wait: 0.18 }, { sfx: 'tick', hold: 0 }, { wait: 0.15 },

    // Picture and camera: the slabs are still landing, under her voice. The camera cranes up
    // after the top of the pile as she says the last line of her post. On her infinity sign it
    // stops, short, and the pile goes on without it. The ticks run on under her first words
    // and are gone before she gets there.
    { cue: 'crane', at: 0.1 },
    // Twelve ticks, 0.15 seconds apart, carrying straight on from the run above. A sound's `at`
    // moves the cursor to where the sound starts, so each one counts from the tick before:
    // eleven steps, 1.65 seconds. The wait then takes the cursor back the same 1.65 seconds,
    // and her line starts where it would with no ticks at all.
    { sfx: 'tick', hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 },
    { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 },
    { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 }, { sfx: 'tick', at: 0.15, hold: 0 },
    { wait: -1.65 },
    { say: 'amber', id: 'amber-infinity', text: "… infinitely many halves → ∞. □", as: "… inn-fun-nut-lee, many halves, goze-too infinity. □" }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s
    // Picture: her square, the last character on her card, lights. That is all. Camera: cut to
    // her card at the left edge.
    { cue: 'square' },
    { wait: 0.5 },

    // ---- button.
    // Picture: her post, small, at the left, with its credit and its label; the pile, out
    // through the top of the frame; slabs where the anchor was. Camera: the wide shot, and it
    // does not move. Larry's voice comes from behind the pile.
    { cue: 'behind-the-pile' },
    { say: 'larry', id: 'larry-button', text: 'It fits in a post.', as: "It fits in uh post.", rate: 0.9, gap: 0.4 },
    { sfx: 'laugh', at: 0.15, hold: 0 },
    { sfx: 'applause', at: 0.5 },
  ],
}
