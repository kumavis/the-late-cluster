// The holiday special, drafted by writer-1: the dark studio, the walk, the table.
//
// How to read it
// - Every picture is a `cue`. The comment under it says what is seen, then what the place
//   sounds like. There is no audience anywhere: no laugh, no applause, no sting.
// - The viewer walks beside Larry and never speaks. Where he says a question back, the line's
//   id starts with `q-`, and the cue before it leaves a held second where the question would be.
// - A line that carries an old idea ends with `// card: <id>, quoted` or `// card: <id>, told`.
//   The cards are in production/research/philosophy.md. A quoted line is exact to the word. A
//   quotation too long for one line is split at its own comma, with nothing between the halves.
// - The owner's lines are marked `// owner's line`. Only punctuation and capitals were tidied.
// - Larry is off the air: a touch slower than on a show night, and nothing is pushed.
export default {
  id: 'writer-1',   // the draft's folder name, so the draft renderer finds it (it was 'walk' when the reviewers read it)
  title: 'No Show Tonight',
  gap: 0.38,
  beats: [
    // ── 1. The studio, switched off ────────────────────────────────────────────────────────

    { cue: 'dark-studio' },
    // Wide. The studio with everything off: curtain, sign, couch and bandstand are faint
    // outlines, ON AIR is unlit, the window is dark. One bare work lamp on a stand makes a small
    // pool of light by the desk. Larry stands in it, side-on, in a long rumpled overcoat with
    // the collar up. No tux, no bow tie. He is looking down at the desk.
    // Sound: an empty room. One tick from the lamp, then nothing.
    { sfx: 'tick', vol: 0.5, hold: 0 },
    { wait: 2.2 },

    { cue: 'larry-sees-us' },
    // His head turns from the desk to camera, unhurried. He has noticed us in the doorway.
    { wait: 1.0 },
    { say: 'larry', id: 'no-show', text: 'Oh, no show tonight, folks. Holidays and all.' }, // owner's line

    { cue: 'envelope' },
    // Close on the desk in the lamp's pool: one envelope with L. NX on it, and nothing else. His
    // head tips down to it.
    { say: 'larry', id: 'paycheck', text: 'Just here picking up my paycheck.', gap: 0.7 }, // owner's line
    { wait: 1.4 },

    { cue: 'empty-seats' },
    // Medium on Larry. The corner of the envelope now shows at his coat pocket. He looks over at
    // the dark bandstand, then the empty couch, then back to us. He had not expected company.
    { say: 'larry', id: 'came-down', text: 'And you came all the way down here.', gap: 1.8 },
    { say: 'larry', id: 'walk-with-me', text: 'Would you walk with me a bit?', gap: 1.0 }, // owner's line

    { cue: 'scarf-on' },
    // He looks down. A scarf draws itself round his collar over two seconds. It is gold: the one
    // gold thing he is wearing tonight. He looks up when it settles.
    { wait: 2.6 },

    { cue: 'out-the-door' },
    // The exit door swings open on the dark outside. The work lamp goes out with a tick. Black
    // for half a second.
    { sfx: 'tick', vol: 0.5, hold: 0 },
    { wait: 1.2 },

    // ── 2. The walk ────────────────────────────────────────────────────────────────────────

    { cue: 'street-start' },
    // Tracking, chest up. Larry side-on, walking screen-right with a small bob, a puff of breath
    // every few steps. Behind him, in layers that slide left at different speeds: a far plain
    // skyline, dark building fronts with a few lit windows, lamp posts, the kerb. The camera is
    // the viewer, keeping pace at his shoulder.
    // Sound, from here to his door, one unbroken street: two sets of footsteps as soft ticks,
    // his and ours, never quite in step. A car far off now and then, as a low whoosh. Cold air.
    { sfx: 'whoosh', vol: 0.25, hold: 0 },
    { wait: 3.5 },
    { say: 'larry', id: 'cold', text: "It's cold. Cold, I understand." },

    { cue: 'listen-how' },
    // His head turns to camera and holds for a second, as if we had just said something. Then
    // he says it back. He stays turned to us while he answers. The walk keeps going.
    { say: 'larry', id: 'q-how', text: 'How am I doing?', gap: 1.6, rate: 0.94 },
    { say: 'larry', id: 'rattled', text: 'Honestly? A little rattled.', gap: 0.8 },
    { say: 'larry', id: 'same-as-you', text: "Same as you, I'd guess." },
    { say: 'larry', id: 'fast', text: 'Things change so fast now. And fair is hard to find.', gap: 0.8 },
    { say: 'larry', id: 'cant-fix', text: "I can't fix any of it. I can walk you somewhere warm.", gap: 0.6 },

    { cue: 'eyes-front' },
    // He faces the way he is walking again. Two lamp posts go by before he speaks.
    { wait: 1.8 },
    { say: 'larry', id: 'old-books', text: "When I'm rattled, I read old books. Somebody was always rattled first." },

    { cue: 'pass-shutters' },
    // Two shopfronts slide in behind him. The first has its shutter down and a TO LET board. In
    // the second, a new neon sign flickers twice and comes on: OPEN. He nods his head at the
    // shuttered one as it passes.
    // Sound: the neon buzzes on, faint.
    { say: 'larry', id: 'shoe-shop', text: 'That was a shoe shop. Before that, a bank.', gap: 1.0 },
    { say: 'larry', id: 'wasnt-here', text: "Before that, I wasn't here.", gap: 0.5 },

    { say: 'larry', id: 'poet', text: 'There was a Japanese poet. Kamo no Chōmei.',
      as: 'There was a Japanese poet. Kah-mo noh Cho-may.', gap: 1.3 }, // card: hojoki, told
    { say: 'larry', id: 'opened', text: 'More than eight hundred years ago, he opened a book like this:' }, // card: hojoki, told

    { cue: 'gutter-stream' },
    // The camera tips down to the kerb beside his feet: meltwater running in the gutter, the
    // other way from the walk, carrying a lamp's reflection that breaks up and comes back.
    // A small source line sits low in the frame while he quotes: HŌJŌKI, 1212 · TR. ASTON, 1899.
    // Sound: the water, as a thin steady hiss under the steps.
    { say: 'larry', id: 'stream-1', text: 'The current of a running stream flows on unceasingly,', rate: 0.94, gap: 0.8 }, // card: hojoki, quoted
    { say: 'larry', id: 'stream-2', text: 'but the water is not the same.', rate: 0.94, gap: 0.3 }, // card: hojoki, quoted
    // W. G. Aston's translation, 1899. The card's quotation ends at "same"; the full stop is the caption's.
    { wait: 2.2 },

    { cue: 'back-to-larry' },
    // Back up to Larry, chest up, walking. Lit and dark windows pass behind him.
    { say: 'larry', id: 'he-meant', text: 'He meant a city. The houses, and the people in them.' }, // card: hojoki, told
    { say: 'larry', id: 'hut', text: 'His answer was to live alone, in a tiny hut.' }, // card: hojoki, told
    { say: 'larry', id: 'weekend', text: "I'd last a weekend.", gap: 0.8 },
    { wait: 0.6 },

    { cue: 'pass-restaurant' },
    // A restaurant window slides in, wide and warm, and the walk slows to a stop in front of
    // it. Hanging lamps, steam at the corners of the glass, eight or nine head-and-shoulder
    // silhouettes packed round tables. One of them bobs on its own, talking with its whole body.
    // The others hold still. Then they all rock at once. Larry watches in profile. We are
    // outside the glass, in the cold, looking in.
    // Sound: a full room through a window. Muffled chatter, and one burst of everybody at once.
    { sfx: 'murmur', vol: 0.9, hold: 1 },
    { sfx: 'murmur', vol: 0.9, hold: 0.3 },
    { sfx: 'murmur', vol: 0.7, hold: 0 },
    { say: 'larry', id: 'story', text: "Somebody in there is telling a story badly. And they're letting him." },
    { wait: 1.2 },

    { cue: 'pass-laundromat' },
    // The walk starts again. A laundromat, bright as a fish tank: a row of round drums, three of
    // them turning, one small silhouette folding at a table with a pile that is not getting
    // smaller.
    // Sound: a low tumbling hum, and a zip going round in a drum.
    { sfx: 'ticktock', vol: 0.3, hold: 0.5 },
    { say: 'larry', id: 'laundry', text: 'Nobody has ever finished the laundry. You just stop for the night.' },

    { cue: 'the-look' },
    // His head turns to camera and stops. We have given him a look. He answers the look; he
    // does not say this one back.
    { say: 'larry', id: 'better-one', text: "And no, laundry isn't my big idea. I borrowed a better one.", gap: 1.5 },
    { say: 'larry', id: 'tarfon', text: 'A rabbi named Tarfon, nearly two thousand years ago, is recorded as saying:',
      as: 'A rabbi named Tar-fon, nearly two thousand years ago, is recorded as saying:' }, // card: avot, told

    { cue: 'pass-scaffold' },
    // A half-built building slides in behind him, wrapped in scaffolding: ladders, planks, a
    // tarpaulin moving a little. Nobody is on it. One bare work lamp has been left on, three
    // floors up. It is the same lamp as the one in the studio.
    // A small source line sits low in the frame while he quotes: PIRKEI AVOT · TR. GORFINKLE, 1913.
    // Sound: the tarpaulin, as one slow breath of wind.
    { say: 'larry', id: 'work-1', text: 'It is not thy duty to complete the work,', rate: 0.92, gap: 0.8 }, // card: avot, quoted
    { say: 'larry', id: 'work-2', text: 'but neither art thou free to desist from it.', rate: 0.92, gap: 0.3 }, // card: avot, quoted
    // Joseph I. Gorfinkle's translation, 1913.
    { wait: 3.0 },
    // Nobody talks. Steps. The lamp on the scaffold goes by and out of frame.

    { say: 'larry', id: 'used-book', text: 'I found it in a used book. Somebody had already underlined it.' },
    { say: 'larry', id: 'torah', text: 'He meant the study of Torah, and living by it.' }, // card: avot, told
    { say: 'larry', id: 'stretched', text: "I've stretched it. I hope it's allowed." },

    { cue: 'reading-to-us' },
    // He turns to us for this, and slows a little.
    { say: 'larry', id: 'my-reading', text: "The way I read it: you don't have to finish.", gap: 1.1 }, // card: avot, told
    { say: 'larry', id: 'no-quit', text: "You don't get to quit, either.", gap: 0.6 }, // card: avot, told
    { say: 'larry', id: 'assignment', text: "You make your part of it. It's the whole assignment.", gap: 0.6 }, // card: avot, told

    { cue: 'busker-in' },
    // A corner. Under a lamp, a busker: an invented puppet, small because he is further off, in
    // a hat and a big scarf, an open case on the pavement in front of him. He is singing to an
    // empty street. Larry stops. The street stops with him. Larry listens, in profile.
    // Sound: one unaccompanied voice with the cold in it. The footsteps have stopped.
    { sing: 'hy', id: 'busker-song', bpm: 84, vol: 0.85, pan: 0.5, gap: 1.6,
      lyrics: 'One more song, then I go home',
      notes: [[67, 1], [67, 0.5], [69, 1.5], [71, 0.5], [69, 0.5], [67, 1], [64, 2]] },
    // `hy` is a stand-in for the count and the render. The busker should have a voice of his own.

    { cue: 'listen-busker' },
    // Larry's head turns to camera and holds, as if we had asked. Then he says it back.
    { say: 'larry', id: 'q-good', text: 'Is he any good?', gap: 1.6, rate: 0.94 },
    { say: 'larry', id: 'out-here', text: "He's out here. That's most of it.", gap: 0.7 },

    { cue: 'coin' },
    // A coin lands in the case from just out of frame. The busker's head dips: thanks. Larry
    // nods back and walks on. The busker slides away to the left and gets smaller.
    // Sound: one bright tick. Then two sets of footsteps again.
    { sfx: 'tick', vol: 0.8, hold: 0 },
    { wait: 1.4 },

    { cue: 'song-again' },
    // Behind us he starts the same line again, from the top. Larry keeps walking and does not
    // look back. No words from Larry until the line is done.
    { sing: 'hy', id: 'busker-again', bpm: 84, vol: 0.45, pan: -0.7,
      lyrics: 'One more song, then I go home',
      notes: [[67, 1], [67, 0.5], [69, 1.5], [71, 0.5], [69, 0.5], [67, 1], [64, 2]] },
    { say: 'larry', id: 'this-morning', text: 'He was singing that one this morning.', gap: 1.0 },

    { cue: 'crossing-red' },
    // Wide. A crossing. The signal says DON'T WALK in red. The road is empty in both directions
    // as far as the lines go. Larry stops at the kerb anyway. The street stops moving.
    // Sound: the signal ticking over, slow. No cars.
    { sfx: 'ticktock', vol: 0.35, hold: 1 },
    { say: 'larry', id: 'nothing-coming', text: "Nothing's coming, I know. I wait anyway." },
    { say: 'larry', id: 'sibyl-would', text: 'Sibyl would find out.', gap: 0.7 },

    { cue: 'snow-starts' },
    // One flake comes down past the red light. Then a few. Then it is snowing. Larry's head
    // tilts up to it and stays there. Hold on that with nobody talking.
    // Sound: the street goes quieter, the way it does.
    { wait: 4.0 },
    { say: 'larry', id: 'first-snow', text: 'First snow. I always forget I like it.' },

    { cue: 'crossing-walk' },
    // The signal changes to WALK, in green. He steps off the kerb and the street moves again,
    // with snow across every layer of it.
    // Sound: one tick as it changes. Footsteps, softer now.
    { sfx: 'tick', vol: 0.6, hold: 0 },
    { wait: 2.2 },

    // ── 3. His door ────────────────────────────────────────────────────────────────────────

    { cue: 'apartment-door' },
    // Wide on a brick front in the snow: a street door with a lit pane over it, and three floors
    // of windows. One window on the top floor is warm and crowded, with small figures moving in
    // it. It is the restaurant window again, and we are outside it again. Larry stops at the
    // door.
    // Sound: a room full of people, two floors up and behind glass.
    { sfx: 'murmur', vol: 0.5, hold: 0.8 },
    { say: 'larry', id: 'this-is-me', text: 'This is me.' },

    { cue: 'listen-door' },
    // He turns back to us. We have stayed on the pavement. He holds a second, then says it back.
    { say: 'larry', id: 'q-come-up', text: 'Should you come up?', gap: 1.8, rate: 0.94 },
    { say: 'larry', id: 'tamil-book', text: "There's an old Tamil book of couplets called the Tirukkural.",
      as: "There's an old Tamil book of couplets called the Tih-roo-koo-rul.", gap: 1.0 }, // card: kural-guests, told
    { say: 'larry', id: 'guest-1', text: 'As I remember it: even with the food of immortality on your table,' }, // card: kural-guests, told
    { say: 'larry', id: 'guest-2', text: "you don't eat while a guest stands outside.", gap: 0.3 }, // card: kural-guests, told
    // Larry's telling of couplet 82, not a quotation. A small label while he tells it:
    // TIRUKKURAL, CH. 9 · LARRY'S TELLING.
    { say: 'larry', id: 'position', text: 'So you see my position.', gap: 0.9 },
    { wait: 0.5 },

    { cue: 'buzzed-in' },
    // Before he can turn to the door, it buzzes and swings in on its own. Warm light falls
    // across the snow and across him. Up in the window, one small figure has been watching the
    // street. Somebody saw him coming.
    // Sound: a door buzzer, short and low in the mix, then the latch. `buzzer` is the nearest
    // sound in the library. If it is heard as a wrong answer, use two ticks for the latch instead.
    { sfx: 'buzzer', vol: 0.35, hold: 0.6 },
    { say: 'larry', id: 'come-up', text: 'Come on up.' },
    { wait: 0.8 },

    // ── 4. The table ───────────────────────────────────────────────────────────────────────

    { cue: 'table-wide' },
    // Cut to the room, wide and brief. A lamp, a window with snow going past it, and a long
    // table across the frame: candles, glasses, a big covered dish in the middle, every plate
    // clean. Six heads above the table edge, in their own clothes: Sibyl, Hy, Al, Dee, Pete,
    // Eppy with no headset. All six turn to the door at once. Two places are empty.
    // Sound: six people talking over each other, cut off on one breath as the door opens.
    { sfx: 'murmur', vol: 0.9, hold: 1 },

    { cue: 'sibyl-and-larry' },
    // Two-shot: Sibyl at the head of the table, facing Larry, who is now in the first empty
    // place with his coat gone and the gold scarf still on.
    { say: 'sibyl', id: 'late', text: "You're late. Nobody has started.", gap: 0.6 },
    { say: 'larry', id: 'brought', text: 'I brought someone.', gap: 0.7 },

    { cue: 'heads-to-us' },
    // From the second empty place, which is ours: the table edge along the bottom of the frame,
    // and four of them across it, Hy, Al, Pete and Eppy, turning to look straight at us. They
    // hold it for a full second. Nobody is sure what the others will do.
    { wait: 1.5 },
    { say: 'al', id: 'chair', text: 'Chair.' },

    { cue: 'chair-in' },
    // A plate, a glass and a fork slide into place at the bottom of the frame, in front of us.
    // The heads go back to each other, and the room starts up again, warmer than before.
    // Sound: a chair pulled in across a wooden floor. The talk comes back.
    { sfx: 'murmur', vol: 0.8, hold: 0 },
    { say: 'sibyl', id: 'rule', text: 'The guest is served first. That is the rule.' },

    { cue: 'hy-and-pete' },
    // Two-shot: Pete and Hy. Pete looks at us and plays a short fill with his mouth, on the
    // beat, pleased with it. Hy does not turn his head. He translates.
    { music: { id: 'pete-hello', bpm: 96, gap: 0.3, tracks: [
      { who: 'pete', beat: 'B t Pf t | B B Pf .', loops: 1, vol: 0.7 },
    ] } },
    { say: 'hy', id: 'pete-says', text: 'Pete says hi.', gap: 0.3 },

    { cue: 'eppy-counts' },
    // Eppy alone, sitting up very straight, head going down the table from face to face as he
    // counts. He lands on us last.
    { say: 'eppy', id: 'record', text: 'That makes eight at a table for six. House record.',
      as: 'That makes eight at a table for six. House rekkerd.', rate: 0.88 },

    { cue: 'dee-sings' },
    // Dee, looking from Larry to us. She does not say it. She sings it.
    { sing: 'dee', id: 'sit-down', bpm: 92, lyrics: 'Sit down, you two',
      notes: [[69, 0.5], [72, 1], [69, 0.5], [67, 1.5]] },

    { cue: 'lid-off' },
    // The lid lifts off the big dish and steam goes up past the candles. Every head leans in.
    // Sound: all of them at once, no words to be made out.
    { sfx: 'murmur', vol: 1, hold: 0.9 },

    { cue: 'larry-to-us' },
    // Larry, close, in the next seat, turned to camera. The table is soft behind him and still
    // going: heads turning, somebody leaning across somebody.
    { sfx: 'murmur', vol: 0.6, hold: 0 },
    { say: 'larry', id: 'crazy-world', text: "It's a crazy mixed up world out there.", gap: 1.0 }, // owner's line

    { cue: 'glance-back' },
    // Behind him Pete starts tapping a roll on two glasses, Eppy rises in his seat to call it,
    // and Sibyl's head turns to the pair of them. Pete stops. Larry glances back at all that,
    // then returns to us with a small nod. This is not a gag on the line. It is who he means.
    // Sound: a tick or two on glass, then the room.
    { sfx: 'tick', vol: 0.5, hold: 0 },
    { say: 'larry', id: 'keep-close', text: 'Keep the ones that make you feel sane close.', gap: 2.0 }, // owner's line

    { cue: 'goodnight' },
    // A slow push in on Larry. After the last word he turns back to the table, into profile,
    // and the room carries on for a second without us. Then black. Nothing is said after this.
    { sfx: 'murmur', vol: 0.6, at: 2.4, hold: 0 },
    { wait: -2.4 },
    // The room starts under the last words and carries on after them: the murmur is placed 2.4 s on, and the cursor brought back.
    { say: 'larry', id: 'goodnight', text: 'Stay warm, folks. Goodnight.', gap: 1.4 }, // owner's line
  ],
}
