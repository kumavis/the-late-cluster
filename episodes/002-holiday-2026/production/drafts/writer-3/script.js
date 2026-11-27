// The holiday special, draft by writer-3: "The Long Way".
//
// One script: the dark studio, the walk, the table. About four minutes.
//
// How to read it:
// - Every picture is a `cue`, and its comment says what is seen and what the place sounds like.
// - There is no audience anywhere in this script: no laugh, no applause, no sting.
// - The viewer walks beside Larry and never speaks. Three times he says the viewer's question
//   back (ids `what-do-i-do`, `supposed-to-do`, `does-it-help`). The second one he cannot
//   answer, and the street answers it for him.
// - Three ideas, three cultures. Each line that carries one is marked `// card: <id>, quoted`
//   or `// card: <id>, told`, against production/research/philosophy.md.
// - The busker is an invented one-off, not a house character. His tune is written in Al's
//   voice only because a draft has to use a voice that exists. See notes.json, "builder".
// - Larry is slower tonight. Rates are marked only where a line wants air; the rest is the
//   sound editor's.

export default {
  id: 'writer-3',   // the draft's folder name, so the draft renderer finds it (it was 'walk' when the reviewers read it)
  title: 'The Long Way',
  gap: 0.42,                       // a walking pace between lines
  beats: [

    // ───────────────────────── THE DARK STUDIO ─────────────────────────

    { cue: 'dark-studio' },        // wide: the studio switched off. Desk, couch and bandstand are dim outlines, ON AIR is dark, the sign is unlit.
                                   // The skyline in the window and one bare work lamp on a stand are the only light. Larry stands in the lamp's pool
                                   // by the desk: a long rumpled overcoat, collar up, no bow tie. Head down at the desk. He has not seen us.
                                   // Sound: nothing at all. No audience, no band. Let the room be silent for two seconds.
    { wait: 2.4 },
    { cue: 'sees-us' },            // his head comes up and round to camera. A small tilt: caught.
    { say: 'larry', id: 'no-show', text: 'Oh, no show tonight, folks. Holidays and all.' },
    { cue: 'envelope' },           // close on the desk in the lamp light: a pay envelope, glance-sized, "L. NX". It lifts out of frame (no hands) as he speaks.
    { say: 'larry', id: 'paycheck', text: 'Just here picking up my paycheck.' },
    { say: 'larry', id: 'mail-it', text: "They'd mail it. I like the walk home." },
    { cue: 'ask' },                // medium on Larry, facing us, the dark set behind him. He means the question.
    { say: 'larry', id: 'walk-with-me', text: 'Would you walk with me a bit?', gap: 0.9, rate: 0.94 },
    { cue: 'scarf-on' },           // same shot: he looks down, and a scarf draws round his collar over two seconds. The scarf is gold, the one thing of his he took.
    { wait: 2.6 },
    { cue: 'out-the-door' },       // the exit door swings open on dark blue. The work lamp stays lit behind him. Cut to black for half a second.
    { wait: 1.6 },

    // ───────────────────────── THE STREET ─────────────────────────

    { cue: 'street-start' },       // tracking, chest up: Larry side-on, walking screen-right with a gentle bob, close enough that we are plainly beside him.
                                   // Dark building fronts slide left: a few lit windows, shutters, a fire escape. Lamp posts pass nearest. Steam lifts from a grate.
                                   // Sound: his footsteps, soft beatbox ticks at a walking pace, and ours are not heard. Far off, almost nothing. No words yet: look.
    { wait: 3.2 },
    { cue: 'turn-to-us' },         // his head turns to camera. The walk keeps going.
    { say: 'larry', id: 'how-have-you-been', text: 'So. How have you been?' },
    { wait: 2.2 },                 // he waits for the answer, still looking at us. Footsteps. We do not hear what we said.
    { cue: 'me-too' },             // one small nod, late. Then he faces the street again.
    { say: 'larry', id: 'yeah-me-too', text: 'Yeah. Me too.', gap: 0, rate: 0.92 },
    { cue: 'bus' },                // a bus crosses behind him, a row of lit windows with nobody much in them, and its lamps run upside down in the wet road.
    { sfx: 'whoosh', at: 0.3, hold: 0, vol: 0.5 },   // the bus is one breathy sweep, then the footsteps again
    { wait: 1.4 },
    { say: 'larry', id: 'fast-lately', text: 'It all moves so fast lately. And fair is hard to find.' },
    { say: 'larry', id: 'no-fix', text: "I don't have a fix. I host a talk show." },
    { cue: 'question-one' },       // he turns to us to say our question back, then looks ahead to answer it. This is how every repeated question is played.
    { say: 'larry', id: 'what-do-i-do', text: 'What do I do about it? I read.' },
    { say: 'larry', id: 'old-books', text: 'Old books. Turns out people have been unsettled for a very long time.' },
    { say: 'larry', id: 'what-helped', text: 'Some of them wrote down what helped.' },

    // The first idea, lightly: China. Told, not quoted, and he says so.
    { cue: 'lobby-ahead' },        // ahead of him a lit glass lobby door slides into the frame: the brightest thing on the street so far. Inside, one
                                   // silhouette at a desk. A night doorman. Sound: footsteps only.
    { say: 'larry', id: 'analects', text: "One's called the Analects. A record of what Confucius and his students said." },   // card: analects, told
    { say: 'larry', id: 'gatekeeper-says', text: "In it, a gatekeeper describes him. I'll say it my way." },                  // card: analects, told
    { say: 'larry', id: 'gatekeeper', text: "The one who knows the times won't let it work, and does it anyway.", rate: 0.94 },   // card: analects, told
    { cue: 'doorman-nods' },       // the lobby is level with him now. On "I decided he did" the silhouette at the desk dips its head to Larry through the glass.
                                   // Larry nods back, and the lobby slides away behind. The street has answered him, and he does not remark on it.
    { say: 'larry', id: 'meant-kindly', text: "I can't tell if the gatekeeper meant it kindly. I decided he did." },

    // The restaurant. Mostly looking.
    { cue: 'pass-restaurant' },    // a long warm window slides in and fills the frame behind him: hanging lamps, head-and-shoulder silhouettes at tables,
                                   // bobbing as if laughing, a neon OPEN that flickers. Larry's head turns to look in, and the walk slows.
                                   // Sound: a room full of people through glass. Murmur swells as the window arrives and thins as it leaves. Never a laugh track.
    { sfx: 'murmur', hold: 0, vol: 0.7 },
    { wait: 2.8 },
    { sfx: 'murmur', hold: 0, vol: 0.8 },
    { say: 'larry', id: 'same-worries', text: 'Look at them. Same worries as you and me.' },
    { cue: 'dessert' },            // at the window table two silhouettes lean in over one plate. It lands on the word "dessert".
    { say: 'larry', id: 'dessert-anyway', text: 'They ordered dessert anyway.', rate: 0.94 },
    { wait: 1.0 },                 // the window slides off. Dark fronts again, the murmur gone, footsteps.

    // The busker. The viewer asks the real question, and the street answers before Larry can.
    { say: 'larry', id: 'supposed-to-do', text: 'What are you supposed to do?' },
    { cue: 'busker-heard' },       // a voice from ahead, off screen right, before anyone is seen. Larry has no answer ready, and his head lifts toward the voice
                                   // instead of giving one. He listens. The answer to the question is whatever the street does next.
                                   // Sound: one unaccompanied voice singing in the cold, a little far, getting nearer. No instrument: everything here is a voice.
    { sing: 'al', id: 'busker-1', bpm: 88, gap: 0.5, vol: 0.7, pan: 0.5, vibrato: 18,   // THE BUSKER, an invented one-off (not Al)
      lyrics: 'cold hands, warm light,',
      notes: [[50,1],[50,1],[47,1],[43,1.5]] },
    { cue: 'busker-in' },          // the busker slides in from the right under a street lamp: one new puppet, small, in a hoodie, an upturned hat on the pavement
                                   // with two coins in it. Nobody else has stopped. Larry slows and stops; the street stops moving. Two-shot, the busker further off.
    { sing: 'al', id: 'busker-2', bpm: 88, gap: 0.3, vol: 0.85, pan: 0.4, vibrato: 18,
      lyrics: "somebody's cooking tonight,",
      notes: [[45,0.5],[45,0.5],[47,0.5],[48,1],[47,0.5],[45,0.5],[50,1.5]] },
    { sing: 'al', id: 'busker-3', bpm: 88, gap: 0.3, vol: 0.85, pan: 0.4, vibrato: 18,   // the words run out on "I". He carries the tune on without them
      lyrics: 'and I, doo doo doo',                                                      // and stops one note short of home (on A; the tune wants G).
      notes: [[47,0.5],[50,2],[0,0.75],[48,1],[47,1],[45,2.5]] },
    { cue: 'song-stops' },         // the busker's head tilts, as if looking for it. Silence where the last note should be. Larry watches him, then turns to us.
    { wait: 0.9 },
    { say: 'larry', id: 'that-for-one', text: 'That, for one. A man making a song.' },
    { say: 'larry', id: 'since-spring', text: "He's had that much since the spring. He can't find the next line." },
    { say: 'larry', id: 'what-hes-got', text: "He's out here every week, singing what he's got." },
    { cue: 'coin' },               // Larry's head dips toward the hat. A third small circle joins the two in it (the coin falls from out of frame). The busker nods.
    { sfx: 'tick', hold: 0, vol: 0.5 },              // the coin
    { wait: 0.8 },

    // The second idea, the one to take home: quoted exactly, in two breaths at its comma.
    { cue: 'quote' },              // close on Larry, to camera, the lamp and the busker soft and small behind him. Nothing is put on screen to read:
                                   // the caption carries the words. He is standing still for this. Sound: the street, very quiet.
    { say: 'larry', id: 'tarfon', text: 'A rabbi named Tarfon, nearly two thousand years ago, is recorded as saying:' },   // card: avot, told (the card's safe wording)
    { say: 'larry', id: 'tarfon-1', text: 'It is not thy duty to complete the work,', gap: 0.6, rate: 0.9 },              // card: avot, quoted
    { say: 'larry', id: 'tarfon-2', text: 'but neither art thou free to desist from it.', gap: 0.25, rate: 0.9 },         // card: avot, quoted (the same sentence, continued)
    { wait: 1.4 },                 // he lets it sit. A look down, then back to us.
    { say: 'larry', id: 'guest', text: "He meant study, in his own tradition. I'm a guest in that sentence." },           // card: avot, told
    { cue: 'walk-on' },            // tracking again: he turns and walks, the street slides, the busker and his lamp fall away to the left.
    { say: 'larry', id: 'carry-it', text: "Here's how I carry it." },
    { say: 'larry', id: 'finish-quit', text: "I don't have to finish. I don't get to quit.", rate: 0.92 },                // card: avot, told (his own reading, and he has just said so)
    { cue: 'busker-again' },       // behind us now, off screen left, the busker starts again from the top. Larry's head turns back toward the sound,
                                   // holds a moment, and comes forward again. He says nothing about it.
    { sing: 'al', id: 'busker-4', bpm: 88, gap: 0.5, vol: 0.35, pan: -0.6, vibrato: 18,   // THE BUSKER again, far behind
      lyrics: 'cold hands, warm light,',
      notes: [[50,1],[50,1],[47,1],[43,1.5]] },
    { say: 'larry', id: 'no-last-line', text: "You've got one too, I'd bet. A thing with no last line." },
    { say: 'larry', id: 'what-youve-got', text: "I'd like to hear what you've got." },

    // The crossing. The longest stretch with no words.
    { cue: 'crossing-red' },       // wide: the kerb, a crossing signal showing DON'T WALK in red, an empty road with no cars in either direction. Larry stops,
                                   // small in the frame, and waits. The street stops moving. Sound: the footsteps stop. Nearly nothing.
    { wait: 2.0 },
    { cue: 'snow-starts' },        // a few flakes fall through the lamp light, then more. Larry's head tips up to them. Snow makes no sound.
    { wait: 2.4 },
    { say: 'larry', id: 'does-it-help', text: 'Does it help? Some nights.' },
    { say: 'larry', id: 'comes-out', text: "I don't know how any of it comes out. No one ever has." },
    { cue: 'both-ways' },          // he looks left down the empty road, then right. Nothing is coming. He stays where he is.
    { wait: 1.0 },
    { say: 'larry', id: 'a-cue', text: "The road's empty, I know. I like a cue." },
    { cue: 'crossing-walk' },      // the signal changes to WALK, in green, right on the word "cue". He looks at it, then at us, and steps off the kerb.
    { sfx: 'tick', hold: 0, vol: 0.5 },              // the signal changing
    { wait: 1.2 },

    // The last block. The third idea, and what he does with it.
    { cue: 'last-block' },         // tracking, a little closer than before: snow across the frame, a row of lit apartment windows sliding by above him,
                                   // one with a small figure in it. Nobody else on the pavement. Sound: footsteps again, softer now.
    { say: 'larry', id: 'this-block', text: 'Nearly there. I usually walk this block on my own.' },
    { say: 'larry', id: 'norse', text: "There's one I say to myself here. An old Norse poem called the Hávamál.",
      as: "There's one I say to myself here. An old Norse poem called the Hah-vah-mahl." },                              // card: havamal, told (the card's safe wording)
    { say: 'larry', id: 'norse-road', text: 'The speaker remembers being young, walking alone, not knowing the road.' },  // card: havamal, told
    { cue: 'comrade' },            // he says the line looking straight ahead, not at us.
    { say: 'larry', id: 'comrade-line', text: 'Rich did I feel when a comrade I found.', gap: 0.6, rate: 0.9 },           // card: havamal, quoted
    { cue: 'glance' },             // a beat of footsteps. Then his head turns to us, and away again at once. A tilt: sheepish.
    { wait: 1.6 },
    { say: 'larry', id: 'poem-talking', text: "That's the poem talking. Mostly." },

    // ───────────────────────── THE TABLE ─────────────────────────

    { cue: 'apartment-door' },     // the street stops. Wide on a doorway with warm light round its edges, snow on the step. Larry side-on at the door.
                                   // Sound: a full room behind a door. Layered murmur, voices over each other with no words to catch, a chair scraping.
    { sfx: 'murmur', hold: 0, vol: 0.8 },
    { wait: 1.2 },
    { sfx: 'murmur', hold: 0, vol: 0.9 },
    { say: 'larry', id: 'this-is-me', text: 'This is me.' },
    { cue: 'table-wide' },         // the door swings in. Establishing wide, kept short: a long table drawn in front of all six, so it hides them below the chest.
                                   // Plates, glasses, candles, a covered dish, nothing touched. Sibyl, Hy, Al, Dee, Pete and Eppy in their own clothes, Eppy
                                   // without the headset. One empty chair at the near end, nearest us, drawn in gold. Every head turns to the door.
                                   // Sound: the murmur stops as the heads turn. A warm, close room. No laugh, no applause.
    { wait: 1.2 },
    { cue: 'eppy-clock' },         // two-shot: Eppy and Pete at the far end. Eppy calls it the way he calls everything.
    { say: 'eppy', id: 'record', text: "Forty-one minutes and not one fork lifted! I believe that's a record.", rate: 0.88 },
    { say: 'pete', id: 'counted-in', text: 'I counted you in twice.' },
    { cue: 'sibyl-rule' },         // Sibyl at the head of the table, facing the door, unhurried. Larry in the doorway at the frame's edge, coat and scarf still on.
    { say: 'sibyl', id: 'house-rule', text: 'Nobody starts until everyone is seated. House rule.' },
    { say: 'larry', id: 'my-house', text: "It's my house." },
    { say: 'sibyl', id: 'still-the-rule', text: "It's still the rule.", gap: 0.3 },
    { cue: 'hy-knows' },           // two-shot: Hy and Larry. Hy does not need to be told where he has been.
    { say: 'hy', id: 'long-way', text: 'You took the long way.' },
    { say: 'larry', id: 'company', text: 'I had company.' },
    { cue: 'they-look' },          // the wide again, short: all six heads turn from Larry to the camera. To us, in the doorway. Al gives one slow nod.
    { wait: 1.4 },
    { cue: 'dee-sings' },          // three-shot: Dee, Al and the gold chair. Dee sings it lightly, to the chair. It is the busker's tune, two octaves up,
                                   // from the place where he stops, and it lands on the note he cannot find. Larry's head snaps round to her.
    { sing: 'dee', id: 'saved-a-seat', bpm: 88, gap: 0.3, vol: 0.9, vibrato: 18,
      lyrics: 'and I saved you a seat',
      notes: [[71,0.5],[74,1.5],[72,1],[71,0.5],[69,0.5],[67,3]] },
    { say: 'larry', id: 'that-song', text: 'Where did you hear that song?' },
    { say: 'al', id: 'sit', text: 'Sit.', gap: 0.2 },   // nobody answers him. This is the answer.

    // The owner's lines, and nothing after them. (The first is one line of the owner's, taken in two breaths at its full stop.)
    { cue: 'goodnight' },          // Larry in the doorway turns back to us. The table is soft and warm behind him, six heads and the gold chair. Push in slowly
                                   // through all three lines. Snow in the foreground. Sound: the room, low, behind his voice. Hold on him after the last word.
    { wait: 1.2 },
    { say: 'larry', id: 'mixed-up-world', text: "It's a crazy mixed up world out there.", rate: 0.94 },
    { say: 'larry', id: 'keep-close', text: 'Keep the ones that make you feel sane close.', rate: 0.92 },
    { say: 'larry', id: 'stay-warm', text: 'Stay warm, folks. Goodnight.', gap: 0.9, rate: 0.92 },
  ],
}
