// The making-of, going in. Redraft on the owner's notes of 21 November 2026
// (production/commission.md, last section). Card: making-of. Ideas 2:25 and 1:25.
//
// ONE CONTINUOUS SHOT, AS BEFORE. Larry starts to explain how the show is made, and the camera
// stops listening and goes into his mouth to see for itself. What has changed is what it finds.
// Each level down is now what the level above was made from, so the dive is the owner's
// pipeline read backwards, one place to a word:
//
//     SHOW  <  SCENES  <  REVIEW  <  SCRIPTS  <  REVIEW  <  POSTS  <  COMMUNITY
//
// The studio is the show. Then five throats, each with a smaller Larry at the far end who says
// what came before the place above ("Before the show: scenes."). The bottom is the community,
// and the turn to the audience is simply the last step of the dive. Then the camera comes back
// up and the line is said forwards, a word a level, which is the orderly account Larry was
// trying to give when it went in.
//
// FOR THE BUILDER WHO STAGED THE FIRST VERSION.
//   Kept: the studio; the inside of the head; throats with a smaller Larry at the end of each
//     (five now, each shorter than the one before); the strip of text and the kazoo that is a
//     submarine (now in the first throat); the empty desk and the shut door, and the ear with
//     its two labels (now together in the third throat); the bare vocal tract and the 248
//     lights at the bottom; the ride back out.
//   Gone: the thirteen named rings, the seven steps, the fact-sheet rings, the growing title,
//     the credit under the tract, Pete's lip pops. Rings are now plain ribs: no labels on them
//     and no count to honour.
//   New: the gauge; two more throats (the second REVIEW, and POSTS); the drawn post being typed
//     at the bottom; a word from each Larry on the way out; the burp.
//
// THE GAUGE. A depth gauge at the edge of frame, the seven words of the line stacked with SHOW
// at the top and COMMUNITY at the bottom. A word is written onto it only when it is first
// said, so it fills downwards during the dive and is never read ahead of the voice. On the way
// out each word lights again as it is said, bottom to top. It is the only writing that stays.
//
// FACTS. Every fact about the process is from production/research/production-facts.md and is
// said as the sheet says it; the pipeline is its section "The pipeline in one line". The nesting
// (a throat inside a throat) is staging and nothing else. The misheard word is named with what
// was heard and no source, as the terms require.
//
// EVERY LARRY IS THE HOUSE PUPPET. The smaller ones are the same cast id with `f0` raised a step
// at each level. Levels one to three use the sound editor's pitches (124, 148, 176). Levels
// four and five are new: 209 and 249 continue the same step and are direction, to be tuned or
// capped. At the bottom, and at the desk, the voice is Larry's own, unraised.
//
// LINES CARRIED OVER. A line whose text is unchanged keeps its id, `as` and `rate` from the
// fitted first version, even where it has moved (the number in an old id is its old level).
// Three of them have moved level and so changed `f0` to the new level's pitch: `l3-kazoo` (176
// to 124), `l2-list` (148 to 176) and `l1-heard` (124 to 176). They want hearing again. Two
// changed lines carry the editor's respelling of the words they still share with the old line
// (`scripts-writer`, `scripts-kazoo`); the handle's `as` is only how Larry reads it out.
//
// THE RUNNER. Larry is a host being entered by his own camera, and he keeps his manners:
// "Do come in." / "This way." / "Go on." / a mouth held open / "You know the way." / a mouth
// held open / and, at the desk again, "Excuse me."
//
// ON SCREEN. Nothing is there to be read in silence. A word on screen is said aloud as it
// lands, or is a glance. No real account speaks or is shown, and no real post is drawn: every
// post in the picture is an empty outline in the show's own lines. The one real name on screen
// is the credit the sheet gives, CHIMERA · jamesondh · open source, and it is up only inside
// the head (from `parts` to `throat-one`), a minute before the invitation and never near it.
//
// CUES. Each cue's comment says what the place is and what the camera does there. A cue placed
// before a line with `at: 0.28` lands on that line's first word; where a comment names a word,
// take the moment from the line's word timings.

export default {
  id: 'making-of-inward',
  title: 'The Making Of, All the Way Down',
  gap: 0.28,
  beats: [
    // ───────── THE SHOW · THE STUDIO ─────────

    // PLACE: the studio. Larry at the desk in the gold tuxedo, a host's medium shot.
    // CAMERA: still for the first sentence, the only ordinary framing in the piece. On "First"
    // it has already started for his mouth. He is about to give an orderly account, and the
    // line is cut off: it must not land like a finished sentence.
    // GAUGE: its first word, SHOW, is written on "show".
    { cue: 'studio', at: 0 },
    { say: 'larry', id: 'l0-how', text: 'This is how the show is made. First —' },

    // PLACE: the studio, then the inside of Larry's head.
    // CAMERA: goes between his lips. It does not wait to be told.
    { cue: 'in-larry', at: -0.15 },
    { wait: 0.3 },
    { say: 'larry', id: 'l0-come-in', text: 'Do come in.', rate: 0.92 },

    // PLACE: inside the head, drawn as a cave in the studio's glowing lines. It holds exactly the
    // four parts the head model has, and each one lights and takes its one-word label on its
    // word: the LIPS are the gate closing behind us, the JAW a drawbridge below, the TONGUE the
    // floor, moving under the camera, the VELUM a curtain at the back. All four keep working as
    // he speaks, because the heads move exactly as the engine's did. At the foot of the frame,
    // small, for as long as we are inside the head and no longer, the maker's credit, a glance:
    // CHIMERA · jamesondh · open source.
    // CAMERA: travels straight back, lips to velum, one part to a word.
    { cue: 'parts', at: 0.28 },
    { say: 'larry', id: 'l0-parts', text: 'Lips. Jaw. Tongue. Velum.', as: 'Lips. Djaw. Tongue. Vee-lum.' },
    // CAMERA: reaches the curtain on "head". There is nothing else in here, and that is the joke.
    { say: 'larry', id: 'l0-head', text: "That's everything in my head.", rate: 0.9 },

    // ───────── ONE DOWN · LARRY'S THROAT · SCENES ─────────

    // PLACE: past the velum, Larry's throat: a tunnel of plain ribs. Still frames hang from the
    // ribs like washing, empty outlines, because a scene is checked by shooting frames of it and
    // looking at them. A small Larry stands at the far end, desk and all. The credit is gone.
    // CAMERA: through the curtain and down the tunnel without slowing.
    // GAUGE: SCENES is written on "scenes".
    { cue: 'throat-one', at: 0.1 },
    { wait: 0.2 },
    { say: 'larry', id: 'scenes-title', text: 'Before the show: scenes.', f0: 124 },
    { say: 'larry', id: 'scenes-builders', text: "Builders draw them. From one builder's report:", as: "Builders draw them. Frum one builder's, report:", f0: 124 },

    // PLACE: one of the hanging frames, and under it a strip of the builder's report, its words
    // lit as he reads them. It is the sheet's quotation, exact. In the frame, the drawing in
    // question: a kazoo that is plainly a submarine, redrawn into a kazoo on "redrew". (This is
    // the strip and the kazoo from the first version's last throat, moved up to here.)
    // CAMERA: close on the strip, then on the kazoo.
    { cue: 'log-line', at: 0.28 },
    { say: 'larry', id: 'l3-kazoo', text: '"The first kazoo looked like a submarine; I redrew it."', as: '"The first kazoo looked like a submarine; I ree-drew it."', f0: 124, rate: 0.92 },

    // PLACE: the far end of the tunnel, the small Larry's desk.
    // CAMERA: does not stop at a polite distance. He sees where it is going and opens up.
    { cue: 'in-small', at: 0.2 },
    { say: 'larry', id: 'l1-this-way', text: 'This way.', as: 'This, way.', f0: 124, rate: 0.95 },

    // ───────── TWO DOWN · THE SMALL LARRY'S THROAT · REVIEW ─────────

    // PLACE: a shorter tunnel. Two reviewers' desks stand in it back to back, drawn in lines,
    // nobody at them: two who judge without seeing each other's work. Pages, the scripts, drift
    // up the tunnel between the desks toward the mouth we came in by. Some go on up. Some drop
    // away. No label and no count here: nothing is written in this tunnel but the gauge. A
    // smaller Larry at the far end.
    // CAMERA: in through the small Larry's mouth and down between the two desks, against the
    // drift of the pages.
    // GAUGE: REVIEW is written on "review".
    { cue: 'throat-two', at: 0.1 },
    { wait: 0.2 },
    { say: 'larry', id: 'review-late-title', text: 'Before the scenes: review.', f0: 148 },
    { say: 'larry', id: 'review-late-rule', text: 'Reviewers choose. Whoever makes a thing does not judge it.', f0: 148 },
    // CAMERA: has reached him. He says this to the lens, as a man who is in the thing.
    { say: 'larry', id: 'review-late-me', text: "So don't ask me how this is going.", f0: 148, rate: 0.92, as: "So don't, ask me how this is going." },

    // PLACE: the far end of the tunnel, the smaller Larry.
    // CAMERA: straight at him. His mouth is already open.
    { cue: 'in-smaller', at: 0.2 },
    { say: 'larry', id: 'l2-go-on', text: 'Go on.', as: 'Go onn.', f0: 148 },

    // ───────── THREE DOWN · THE SMALLER LARRY'S THROAT · SCRIPTS ─────────

    // PLACE: a shorter tunnel again, and the one this script was written in. A very small Larry
    // at the far end.
    // CAMERA: in through the smaller Larry's mouth.
    // GAUGE: SCRIPTS is written on "scripts".
    { cue: 'throat-three', at: 0.1 },
    { wait: 0.2 },
    { say: 'larry', id: 'scripts-title', text: 'Before review: scripts.', f0: 176 },

    // PLACE: an empty desk drawn in lines, a page on it, and nobody at it. Behind the desk a shut
    // door whose plate is the guard hook's own description of itself, a glance: "a guard, not a
    // wall". (The desk and door from the first version's ring six.)
    // CAMERA: stops at the desk, where whoever wrote this was.
    { cue: 'writer-desk', at: 0.28 },
    { say: 'larry', id: 'scripts-writer', text: 'The writer stood here: an AI agent with a short reading list.', as: 'The writer, stood here: an ay-eye agent, with uh short reed-ing list.', f0: 176 },
    // CAMERA: a look at the shut door on "not on it".
    { say: 'larry', id: 'l2-list', text: 'The show is not on it. By rule.', f0: 176, rate: 0.92 },

    // PLACE: beyond the desk, a line-drawn ear mounted on a rib, and it writes down what it
    // hears. (The ear from the first version's ring eight.)
    // CAMERA: on from the desk to the ear, and holds.
    // On "kazoo" the ear's first label: WRITTEN kazoo. On "clue" its second: HEARD clue.
    // THE WORDS STAND WHATEVER THE VOICE DOES WITH THEM. In the first version the voice's "clue"
    // was heard as another word. The labels and the caption are the record, exactly as the fact
    // sheet states it, and the next line is about precisely this. The labels must be on screen
    // while the line is said, and they are never changed to match what the voice seems to say.
    { cue: 'ear', at: 0.28 },
    { say: 'larry', id: 'scripts-kazoo', text: 'The script said kazoo. The tool heard clue.', f0: 176, rate: 0.92 },
    // CAMERA: leaves the ear and closes on the very small Larry, who says this to the lens.
    { say: 'larry', id: 'l1-heard', text: "I can't tell you what you just heard.", f0: 176, rate: 0.94 },

    // PLACE: the far end of the tunnel, the very small Larry. He says nothing. He is holding his
    // mouth open before the camera gets there.
    // CAMERA: in through it.
    { cue: 'in-smallest', at: 0.2 },
    { wait: 0.4 },

    // ───────── FOUR DOWN · THE VERY SMALL LARRY'S THROAT · REVIEW, AGAIN ─────────

    // PLACE: the review tunnel again, smaller, and recognisably the same place: the same two
    // desks back to back. That it is the same place is the joke, and the gauge shows it, the
    // word REVIEW now on it twice. One thing is different: behind these desks a wall of shelves,
    // blank spines, everything the show has done. A tiny Larry at the far end.
    // CAMERA: in through the very small Larry's mouth. It knows this room and does not slow.
    // GAUGE: the second REVIEW is written on "review".
    { cue: 'throat-four', at: 0.1 },
    { wait: 0.2 },
    { say: 'larry', id: 'review-early-title', text: 'Before the scripts: review. Again.', f0: 209, as: 'Before the scripts: Rreev-yoo. Again.' },
    // On "Nothing gets in twice" a page drifting up toward the desks matches a spine on the
    // shelves and is stopped; the rest go on up.
    { say: 'larry', id: 'review-early-seen', text: 'These reviewers have seen everything the show has done. Nothing gets in twice.', f0: 209 },
    // CAMERA: on him for this. A glance from him at the two desks.
    { say: 'larry', id: 'review-early-except', text: 'Except review.', f0: 209, rate: 0.9 },

    // PLACE: the far end of the tunnel, the tiny Larry.
    // CAMERA: is already going. He waves it through.
    { cue: 'in-tiny', at: 0.2 },
    { say: 'larry', id: 'review-early-way', text: 'You know the way.', f0: 209 },

    // ───────── FIVE DOWN · THE TINY LARRY'S THROAT · POSTS ─────────

    // PLACE: the shortest tunnel. Its walls are tiled with posts, thousands of small empty
    // outlines in the show's own lines: no words in them, no names, no pictures, never a real
    // post. A counter runs up as he says the number and stops on it: 20,825, what the scrape
    // held in the last full run. The tiniest Larry at the far end, hardly more than a head.
    // CAMERA: in through the tiny Larry's mouth and down the tiled tunnel, fast.
    // GAUGE: POSTS is written on "posts".
    { cue: 'throat-five', at: 0.1 },
    { wait: 0.2 },
    { say: 'larry', id: 'posts-title', text: 'Before review: posts.', f0: 240, as: 'Before review: poasstss.' },
    { say: 'larry', id: 'posts-count', text: 'Last run: twenty thousand, eight hundred and twenty-five.', f0: 240 },

    // PLACE: the far end of the tunnel, the tiniest Larry. He says nothing and opens.
    // CAMERA: in through it. It only just fits.
    { cue: 'in-tiniest', at: 0.2 },
    { wait: 0.6 },

    // ───────── THE BOTTOM · THE COMMUNITY ─────────

    // PLACE: no tunnel, no ribs, no Larry. Dark. One bare vocal tract, jaw, tongue, lips and
    // velum and nothing else, no face and no jacket: what is left of Larry this far down. No
    // credit under it this time, and nothing written anywhere but the gauge.
    // CAMERA: comes to rest behind the tract's shoulder. For the first time there is no mouth
    // held open for it. A held silence before anything speaks.
    { cue: 'bottom', at: 0 },
    { wait: 0.7 },

    // THE TURN TO THE AUDIENCE STARTS HERE and runs to "I'm a mouth". It is Larry's, said as the
    // show's standing invitation, and it is said to the community the show is about: he names
    // them, and every "you" after is them.
    // PLACE: the bottom. On "the community" the dark beyond the tract fills with small lights
    // drawn as a cluster, 248 of them (the sheet's count of accounts in the cluster), with no
    // label. The tract faces the lights, and everything in the turn is said to them. It speaks
    // in Larry's own voice at his own pitch, and moves exactly as the engine does.
    // CAMERA: holds, looking past the tract at the lights.
    // GAUGE: its last word, COMMUNITY, is written on "community". The line is complete.
    { cue: 'cluster', at: 0.28 },
    { say: 'larry', id: 'bottom-community', text: 'Before the posts: the community.', rate: 0.94 },
    { say: 'larry', id: 'turn-you', text: "That's you, simcluster. You make this show. I open and shut.", rate: 0.94 },

    // THE ACT OF TAGGING, SHOWN. This is the show's own drawing of how it is done, a diagram and
    // nobody's post.
    // PLACE: the bottom. Among the lights, so that it plainly belongs to the cluster, an empty
    // post box opens, large, drawn in the show's lines: no name on it, no picture (an empty
    // ring), no words, a cursor blinking. On "an at sign" one character is typed into it, big: @
    // CAMERA: eases in until the post box and the tract share the frame.
    { cue: 'typing', at: 0.28 },
    { say: 'larry', id: 'turn-point', text: "From now on, you can point. In a post, type an at sign, then the show's name:", as: "From now on, you can point. In uh post, type an att sign, then the show's name:" },

    // PLACE: the same. The rest of the handle is typed after the @, a character at a time
    // across this line, exactly `@latecluster.simcluster.tv` and nothing after it: no full stop,
    // in the post box or in the caption, because this is the one place the viewer is being told
    // exactly what to type. That is why the line's text ends without one. As the last character
    // lands the whole handle turns the colour a mention turns: that change is the act, and it
    // is the biggest thing on screen. The handle stays up, featured, to the end of the turn.
    // Nothing else is ever written in the post. Nothing appears under it, now or later: no
    // reply, no like, no count, no notification. Larry reads the address out the way a host
    // reads one, and it lands as a statement.
    // CAMERA: holds on the handle.
    { cue: 'handle', at: 0.28 },
    { say: 'larry', id: 'turn-handle', text: '@latecluster.simcluster.tv', as: 'aat,-layt,-cluster,-dot,-sim-cluster,-dot,-tee-vee', intonation: 'statement', rate: 0.92 },
    // A host's afterthought, on a caption of its own so that its stop is nowhere near the handle.
    { say: 'larry', id: 'turn-spaces', text: 'No spaces.', gap: 0.3, as: 'Noh, spaces.' },

    // PLACE: the same. On "look" the tract leans toward the lights, not toward the post box.
    // Nothing is pointed at, nothing lights up in answer, and nothing comes back.
    // CAMERA: holds.
    { cue: 'look', at: 0.28 },
    { say: 'larry', id: 'turn-where', text: 'Then we look where you point.' },
    { say: 'larry', id: 'turn-look', text: "That's all. No reply. No promise.", rate: 0.94 },
    { say: 'larry', id: 'turn-mouth', text: "I'm a mouth.", as: "I'm Uh mouth.", rate: 0.9 },

    // ───────── THE WAY OUT · THE LINE, FORWARDS ─────────

    // PLACE: the bottom, then all of it backwards. The post box and the lights go out as the
    // camera leaves. This is the orderly account he was starting on when the camera went in,
    // and he gets to give it: the pipeline in order, a word a level.
    // CAMERA: on "Community" it starts back the way it came, and does not stop until the desk.
    // It backs out through each small Larry's mouth in turn. Each of them says his own place as
    // the camera leaves his mouth, in his own pitch, and shuts it on the word: the tiniest, the
    // tiny, the very small, the smaller, the small. The voices step down as we come up.
    // GAUGE: each word lights again as it is said, bottom to top.
    { cue: 'out', at: 0.28 },
    { say: 'larry', id: 'up-community', text: 'Now, from the bottom. Community.' },
    { say: 'larry', id: 'up-posts', text: 'Posts.', f0: 240, gap: 0.12, as: 'Poasstss.', rate: 0.9 },
    { say: 'larry', id: 'up-review-early', text: 'Review.', f0: 209, gap: 0.12 },
    { say: 'larry', id: 'up-scripts', text: 'Scripts.', f0: 176, gap: 0.12 },
    { say: 'larry', id: 'up-review-late', text: 'Review.', f0: 148, gap: 0.12 },
    { say: 'larry', id: 'up-scenes', text: 'Scenes.', f0: 124, gap: 0.12 },

    // PLACE: the studio, the first framing exactly.
    // CAMERA: out through the head and between the lips of the Larry at the desk, and still, at
    // last. He closes his mouth, straightens, and signs off like a host: the last word of the
    // line, in his own voice.
    // GAUGE: SHOW lights on "show". All seven are lit, top to bottom, for the length of the
    // pause, and the gauge is gone before "Excuse me." (it goes out on the burp, if there is one).
    { cue: 'desk', at: 0.1 },
    { wait: 0.3 },
    { say: 'larry', id: 'up-show', text: "And that's the show.", as: "And that's the, show.", rate: 0.92 },

    // THE BURP. The owner's note: "maybe throw in a burp or hiccup if you can pull it off". A
    // burp, because the camera has just come all the way up his throat.
    // THE SOUND: one small burp, a third of a second at most, low, with his mouth shut: the kind
    // a man in a tuxedo almost keeps in. It comes after the sign-off, not with the camera, so
    // that he has his dignity back for one beat before it goes. Nothing shows it but a small
    // jump of the jaw and the bow tie. No caption.
    // FOR THE SOUND EDITOR: this `say` is only a handle for the sound, in Larry's voice if the
    // voice can do it. Replace it with whatever makes it (a respelling, a sung note, a call) or,
    // if nothing convincing can be made, delete this beat and the wait after it. The ending is
    // written to work without: the sign-off, his look at the lens, "Excuse me."
    { wait: 0.5 },
    { say: 'larry', id: 'burp', text: 'Urp.', caption: false, f0: 55, rate: 1.05, accent: 0, intonation: 'flat', vol: 0.6, gap: 0 },
    { wait: 0.5 },

    // PLACE: the studio. He does not move. He looks at the lens.
    // CAMERA: still.
    { cue: 'excuse', at: 0.28 },
    { say: 'larry', id: 'button', text: 'Excuse me.', rate: 0.9 },
  ],
}
