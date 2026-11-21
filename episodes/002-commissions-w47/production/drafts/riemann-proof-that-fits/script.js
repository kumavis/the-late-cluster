// riemann-proof-that-fits: a demonstration of something a member made, credited.
//
// Friday 20 November 2026. Larry asks what a zeta function is. Amber (@shimmermathlabs.com) calls
// @zetaof1.bsky.social. Sibyl reads the reply. Amber answers it with a whole proof in one post.
// The studio builds her proof while her puppet says it: her steps, her order, no step of the
// house's. The post fits on a small card. What it proves does not fit in the studio.
//
// ON SCREEN THROUGHOUT
// - From Amber's first line: the disclaimer footer. Both guests' chyrons carry PUPPET · PARODY.
// - Every post card has its author's display name and handle, its date (20 Nov 2026) and its
//   like count, and lights word by word as it is spoken. No card is left to be read in silence.
// - Three cards say whose post they replied to: zetaof1's (her call), her proof (zetaof1) and
//   dlowd's (her proof). Her call card does not. It is marked REPLY and names nobody: the
//   account whose question she was answering is not in this segment, on a card or anywhere
//   else. Larry has just asked that question himself.
// - From `proof-card` to the end: her post, small and complete, at the left edge. Under it,
//   PROOF AS POSTED BY @shimmermathlabs.com. One glance label beside it, up through dlowd's line:
//   ZETA AT 1 · NOT THE HYPOTHESIS. This is her proof about zeta at 1. No house line, label or
//   prop ties it to the day's news or sets its size beside anything but the pile.
// - Nothing of the show's lands on the proof: no stamp, no tick, no verdict. Her own square is
//   the last character of her post and lights on her card when she gets there.
//
// TEXT. Every post's text is taken from the kept card by its address. `as` respells, word for
// word, and never rewords. A cut is marked with an ellipsis. Her call and zetaof1's reply are
// said whole. Her proof is said in five lines, in her order, whole but for one clause, which is
// cut from the voice, marked, and shown instead exactly as posted (`tag-k`).
//
// THE VOICE. Captions are on and light each word as it is said, and so do the cards, so the
// exact words are always on screen. Where the voice does not quite reach a word, they carry it
// (the owner's ruling, 21 November 2026). Nothing here is cut or reworded for the voice.
export default {
  id: 'riemann-proof-that-fits',
  title: 'It Fits in a Post',
  gap: 0.28,
  beats: [
    // ---- the question
    // Larry at the desk. On "zeta" a letter zeta the size of the desk comes down on two wires
    // behind him and hangs there. A glance, not a caption.
    { cue: 'zeta-sign' },
    { say: 'larry', id: 'larry-ask', text: "Friday, the cluster had a question. So do I. What is a zeta function?", as: "Friday, the cluster had a question. So do I. What is a zee-tuh function?" },

    // ---- the call. Amber's puppet, on the couch. Her post card is up as she says it. Its
    // reply line reads REPLY and carries no handle (see the top of the file).
    // As she says zetaof1's handle, it lights on her card, a follow spot snaps onto the empty
    // card stand at Sibyl's podium, and an account plate lights in it: Zeta Of 1 ·
    // @zetaof1.bsky.social. On "time to shine" the spot gets brighter. On "you got this" it
    // waits. So does everybody.
    { cue: 'call-card', at: 0.1 },
    { say: 'shimmermathlabs', id: 'amber-call', text: "calling @zetaof1.bsky.social, your whole account was leading up to this day, now is your time to shine, you got this", as: "kaw-ling at-zee-tuh-of-one, your whole account was leading up to this day, now is your time to shine, you got this", rate: 0.82 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r4vvxhok24 · context: at://did:plc:f6n22z62adionrvb5s6n6vfk/app.bsky.feed.post/3n2qz6ywwrc2b

    // ---- the reply. zetaof1 has no puppet: the card rises into the spot and Sibyl reads it
    // whole, exactly as posted, with no commentary and no look. The spot does not move, least of
    // all on the last line, which is zetaof1's own account of the handle. The poet's name in it
    // is the hardest word here for the voice: the card and the caption must light it, and the
    // quotation marks after it, exactly as she reaches them, so the line is seen to be a
    // quotation while it is heard. Nothing in the studio answers it yet. The pile will.
    { cue: 'zeta-card', at: 0.25 },
    { say: 'sibyl', id: 'sibyl-zeta', text: "The Zeta function is too intricate to explain on BlueSky Which is totally the zeta-functions fault and not mine so Also zeta evaluated at 1 is just the sum of inverse natural numbers and that diverges to infinity which was my kind of way to express Whitman's \"I am large. I contain multitudes.\"", as: "The Zeta, function is too intricate to explain on Blue-Sky. Which is totally the zeta-functions fawlt, and not mine, so. Also zeta evaluated at one is just the sum of inn-verse natural numbers and that diverges to infinity which was my kind of way to express, Hwit-munz: \"I am large. I contain, mul-tee-toodz.\"" }, // read aloud: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r4vvxhok24

    // ---- the proof. Nothing comes between the reply and her answer to it.
    // Her post card comes up full size. On "it does actually" it shrinks to a small card at the
    // left edge, whole, and stays there to the end. The credit and the glance label come up with it.
    { cue: 'proof-card', at: 0.15 },
    { say: 'shimmermathlabs', id: 'amber-fits', text: "i was gonna joke proof won't fit, but it does actually. …", as: "i was gonna jowk proof won't fit, but itt does actually. …" }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // Beside the desk, in her colour, one upright bar lands for each term as she says it: a bar
    // for 1; a bar half as tall; her first bracket opens and takes a third and a quarter; her
    // second takes a fifth, two bars for the dots, and an eighth. On her last dots the stage door
    // swings open: more brackets are waiting in a line down the corridor, each wider than the last.
    { cue: 'bars', at: 0.1 },
    { say: 'shimmermathlabs', id: 'amber-sum', text: "… ζ(1) = 1 + ½ + (⅓ + ¼) + (⅕ + ⋯ + ⅛) + ⋯ …", as: "… zee-tuh-of-one equals one plus a-half, plus a-third, plus a-quarter, plus a-fifth, plus dot-dot-dot, plus one-eighth, plus, dot-dot-dot …", rate: 0.94 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // On "twice as many terms": a count ticks under each group in turn, 1, 2, 4. On "at least
    // half as large": a guide line is drawn across each bracket at half the height of the last bar
    // of the group before. Every bar in the bracket reaches it. What stands above the line dims;
    // it is not thrown away, it is the "at least".
    { cue: 'brackets', at: 0.1 },
    { say: 'shimmermathlabs', id: 'amber-brackets', text: "… each bracket has twice as many terms as the last, each at least half as large as its last term. …", as: "… eech brak-it has twice as many terms as the last, each, at least half as large as its last term. …" }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // One clause of her post is cut from the voice here, and the cut is marked on the lines
    // either side. It goes up instead as a tag on the brackets, exactly as she posted it, with
    // both ends marked as the cuts they are:
    //   … more simply: block k has 2ᵏ terms, each ≥ 1/2ᵏ⁺¹, …
    // The tag is a label, not a line, and nothing waits for it to be read. It says again, in her
    // symbols, the sentence she is saying: it goes up as she reaches "its last term", stays on
    // the brackets through her next line, and comes down when the first slab drops (`slab-1`).
    // The same clause lights on her card with it.
    { cue: 'tag-k', at: -0.9 },

    // On "adds": the bars of each group, cut at the guide line, stack. Every stack comes to the
    // same height, half the bar for 1, and becomes one slab marked ≥ ½, the last two symbols of
    // the line she is saying.
    { cue: 'press', at: 0.1 },
    { say: 'shimmermathlabs', id: 'amber-adds', text: "… so every block adds ≥ ½. …", as: "… sew every block adds, at-least one-half. …", rate: 0.9 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s

    // ---- the count. Eppy, at the sports desk, headset on, calls each slab as it drops onto a
    // pile beside Larry's desk. He plays every one as a result, and the result is the mark on
    // the slab, which flashes as he calls it: her last word, one slab at a time. It does not
    // change. The first three are the groups on her card. The next three are the brackets under
    // her dots, each twice as wide as the last by her own rule, their bars down to slivers: the
    // eight is as wide as the desk; the sixteen comes in through the stage door, past the band;
    // the thirty-two comes through the wall and is still arriving when its slab drops. Every
    // slab is the same size. The pile passes the desk top, then Larry's bow tie, then Larry.
    // Larry watches it go by. His call is one short word and the voice may make little of it:
    // the caption, the slab and the drop carry it, so each call has to land with its slab.
    { cue: 'slab-1', at: 0.3 },
    { say: 'eppy', id: 'eppy-half-1', text: 'Half.', rate: 0.88, gap: 0.5 },
    { cue: 'slab-2', at: 0.3 },
    { say: 'eppy', id: 'eppy-half-2', text: 'Half.', rate: 0.88, gap: 0.5 },
    { cue: 'slab-3', at: 0.3 },
    { say: 'eppy', id: 'eppy-half-3', text: 'Half.', rate: 0.88, gap: 0.5 },
    { cue: 'slab-4', at: 0.3 },
    { say: 'eppy', id: 'eppy-half-4', text: 'Eight terms. Half.', as: 'Eight, terms. Half.', rate: 0.88, gap: 0.55 },
    { cue: 'slab-5', at: 0.3 },
    { say: 'eppy', id: 'eppy-half-5', text: 'Sixteen terms. Half.', as: 'Sik-steen terms. Half.', rate: 0.88, gap: 0.55 },
    { cue: 'slab-6', at: 0.3 },
    { say: 'eppy', id: 'eppy-half-6', text: 'Thirty-two terms. Half.', rate: 0.88, gap: 0.55 },

    // The slabs keep dropping with nobody calling them. The pile leaves the top of the frame.
    // Sibyl, who has read the label on every slab, does not look up.
    { cue: 'pile-out', at: 0.2 },
    { say: 'sibyl', id: 'sibyl-at-least', text: 'At least.', gap: 0.6 },

    // The camera cranes up after the top of the pile as she says the last line of her post. On
    // "infinity" it stops, short, and the pile goes on without it. On her square, the last
    // character on her card lights. That is all.
    { cue: 'crane', at: 0.1 },
    { say: 'shimmermathlabs', id: 'amber-infinity', text: "… infinitely many halves → ∞. □", as: "… infinitely, many, halves go-to infinity. …", rate: 0.9 }, // verbatim: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24 · context: at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s
    { cue: 'square' },
    { wait: 0.6 },

    // ---- the reply to the proof. dlowd's puppet, on the couch beside her; his card is up as
    // he says it. Her card and its label are still at the left edge.
    { cue: 'reply-card' },
    { say: 'dlowd', id: 'dlowd-reply', text: "Oh, I love that proof, and I'm going to remember it! Thanks!", as: "Oh, I love thatt proof, and I'm going to remember it! Thanks!" }, // verbatim: at://did:plc:svcjnfakqcoxlk6zityl23js/app.bsky.feed.post/3n2rfsuo6bk2j · context: at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24
    { sfx: 'applause', at: 0.1, hold: 0.2 },

    // ---- button. The wide shot: her post, small, at the left; the pile, out through the top of
    // the frame; no host. Larry's voice comes from behind the pile.
    { cue: 'behind-the-pile' },
    { say: 'larry', id: 'larry-button', text: 'It fits in a post.', rate: 0.9, gap: 0.5 },
    { sfx: 'laugh', at: 0.15, hold: 0 },
    { sfx: 'applause', at: 0.5 },
  ],
}
