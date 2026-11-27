// The holiday special, a draft by writer-2: "One Extra Chair".
//
// One script and one unbroken walk: the dark studio, the street, the table.
// There is no studio audience anywhere in it: no laugh, no applause, no sting. Sound is the
// place. Where the place wants a sound the library does not have (footsteps, a street bed),
// the cue's comment describes it for the builder and the sound editor.
//
// Three ideas, each said only in the wording its card in research/philosophy.md calls safe:
//   marcus    Roman    told, then a short exact quotation (Long, 1862)
//   zhuangzi  Chinese  told, as Larry's own remembering of the story
//   avot      Jewish   the exact quotation (Gorfinkle, 1913), then Larry's borrowing, named as his
//
// The busker's tune is seven notes that stop one note short of home. Larry carries it up the
// stairs wrong, and Dee finishes it at the table. Nobody remarks on that.
export default {
  id: 'writer-2',   // the draft's folder name, so the draft renderer finds it (it was 'walk' when the reviewers read it)
  title: 'One Extra Chair',
  gap: 0.32,
  beats: [

    // ── THE DARK STUDIO ─────────────────────────────────────────────────────────────────────

    { cue: 'dark-studio' },
    // Wide. The studio switched off: truss, curtain, couch and bandstand barely there, ON AIR
    // dark, the sign unlit. One bare work lamp on a stand makes a small pool of light by the
    // desk, and Larry stands in it, side-on, in a long rumpled overcoat with the collar up. No
    // tuxedo. He is looking down at the desk. The city in the window is the only other light.
    // Sound: an empty room. Nothing, then one car passing somewhere outside.
    { sfx: 'whoosh', vol: 0.25, hold: 0 },
    { wait: 2.4 },

    { cue: 'sees-us' },
    // His head comes up and turns to camera. He has noticed us standing in the doorway.
    { say: 'larry', id: 'no-show', text: 'Oh, no show tonight, folks. Holidays and all.' },      // the owner's line

    { cue: 'envelope' },
    // Close on the desk: a pay envelope leaning against the mug. His head tips down to it.
    { say: 'larry', id: 'paycheck', text: 'Just here picking up my paycheck.' },                  // the owner's line

    { cue: 'look-around', at: 0.4 },
    // Wide again. He looks up and round the dark room, left, then right. Nothing lights for him.
    { say: 'larry', id: 'lights-off', text: 'Funny room with the lights off.', gap: 1.0 },
    { say: 'larry', id: 'mostly-lights', text: 'Turns out most of it was the lights.', rate: 0.92, gap: 0.5 },

    { cue: 'ask' },
    // Medium on Larry, facing us, the lamp behind his shoulder.
    { say: 'larry', id: 'headed-home', text: "I'm headed home. It's not far.", gap: 0.9 },
    { say: 'larry', id: 'walk-with-me', text: 'Would you walk with me a bit?', gap: 0.5 },                  // the owner's line
    { say: 'larry', id: 'scarf', text: 'Good. Let me get my scarf.', gap: 1.4 },                  // the pause before it is our yes

    { cue: 'scarf-on' },
    // He looks down. A gold scarf draws itself round his collar over two seconds. Gold is his
    // colour, and it is the only thing of the show he takes outside.
    { wait: 2.2 },

    { cue: 'out-the-door' },
    // The exit door swings open on the dark. The work lamp clicks off. Black for half a second.
    { sfx: 'tick' },
    { wait: 0.8 },

    // ── THE STREET ──────────────────────────────────────────────────────────────────────────

    { cue: 'street-start' },
    // Tracking, chest up: Larry side-on, walking screen-right with a small bob, the street
    // sliding left behind him in layers: far skyline, dark building fronts with a few lit
    // windows, lamp posts, the kerb. Every lamp is drawn again under itself, upside down and
    // dimmer, in the wet road.
    // Sound: two sets of footsteps, his and ours, soft beatbox ticks a little out of step with
    // each other. They run under the whole walk and stop whenever we stop. They are the only
    // sound the viewer ever makes. A car goes by.
    { wait: 2.2 },
    { sfx: 'whoosh', vol: 0.5, hold: 0 },
    { wait: 2.2 },

    { cue: 'asked-all-right' },
    // His head turns to camera as he walks. He has been asked something.
    { say: 'larry', id: 'q-all-right', text: 'Am I all right? I think so.', gap: 1.5 },                     // question 1, said back
    { say: 'larry', id: 'rattled', text: 'A little rattled. Most people I know are.' },
    { cue: 'eyes-front' },
    // His head goes back to the road ahead: profile. Easier to say the next part not looking at us.
    { say: 'larry', id: 'fast-and-fair', text: 'Things move fast lately. And fair is hard to find.', gap: 0.7 },
    { say: 'larry', id: 'no-joke', text: "I don't have a joke for that.", as: "I don't have a djoke for that." },
    { say: 'larry', id: 'i-looked', text: 'I looked.', rate: 0.9, gap: 0.7 },
    { say: 'larry', id: 'old-books', text: "So I've been reading old books. Very old.", gap: 1.1 },
    { say: 'larry', id: 'what-helped', text: 'People were rattled then, too. Some wrote down what helped.' },

    { cue: 'windows' },
    // The fronts sliding by are apartments now: rows of dark windows, and one lit, high up, with
    // a small figure standing in it. It travels across the frame behind him as he talks.
    { say: 'larry', id: 'marcus-who', text: 'One was a Roman emperor. Marcus Aurelius.', gap: 1.3 },       // card: marcus, told
    { say: 'larry', id: 'marcus-notebook', text: 'He kept a private notebook, just for himself.' },        // card: marcus, told
    { say: 'larry', id: 'marcus-mornings', text: 'One note is for mornings he does not want to get up.' }, // card: marcus, told
    { cue: 'emperor-look' },
    // Head to camera, deadpan, still walking.
    { say: 'larry', id: 'emperor-of-rome', text: 'This is the emperor of Rome.', rate: 0.9, gap: 0.6 },
    { say: 'larry', id: 'marcus-quote',                                                                    // card: marcus, quoted
      text: 'He tells himself, "I am rising to the work of a human being."',
      as: 'He tells himself, I am rising to the work of a human being.', rate: 0.94, gap: 0.5 },
    { wait: 0.7 },
    { cue: 'window-dark' },
    // The one lit window, with its small figure, goes dark. Somebody up there has gone to bed.
    // Larry's head tips up to it, holds, comes back to us.
    { wait: 1.5 },
    { say: 'larry', id: 'tomorrow-then', text: 'Fine. Tomorrow, then.', rate: 0.9 },

    // ── THE RESTAURANT ──────────────────────────────────────────────────────────────────────

    { cue: 'pass-restaurant' },
    // Warm light slides in from the right: a restaurant's big front window, every table taken,
    // head-and-shoulder silhouettes bobbing as they laugh, two hanging lamps, a small neon OPEN.
    // Sound: a full room heard through glass. Murmur, low, rising as we come level; repeat it
    // as a bed under the whole scene.
    { sfx: 'murmur', vol: 0.6, hold: 0 },
    { wait: 1.4 },
    { cue: 'stop-at-window' },
    // The street stops sliding and both sets of footsteps stop. He has stopped to look in, head
    // in profile toward the glass, the warm light on him.
    { wait: 1.6 },
    { say: 'larry', id: 'full-house', text: 'Look at that. Full house.' },
    { cue: 'cook-in-back' },
    // Push in past the tables to a lit kitchen hatch at the back of the room: one cook's
    // silhouette, head down, working fast, a quick steady movement of the shoulders.
    { say: 'larry', id: 'one-cook', text: 'And one cook in back, feeding all of it.', gap: 0.5 },
    { sfx: 'murmur', vol: 0.5, hold: 0 },
    { cue: 'larry-at-glass' },
    // Back to Larry, close, in profile at the window; the room's shapes move in the glass
    // beside his face. He turns to us to tell it.
    { say: 'larry', id: 'cook-story', text: "There's a story about a cook in an old Chinese book.", gap: 1.0 },  // card: zhuangzi, told
    { say: 'larry', id: 'zhuangzi-name', text: "The Zhuangzi. I'm probably saying that wrong.",          // card: zhuangzi, told
      as: "The Jwahng-dzuh. I'm probably saying that wrong." },
    { say: 'larry', id: 'cook-prince', text: "The way I remember it, a prince admires his cook's knife work.", gap: 0.5 },  // card: zhuangzi, told
    { say: 'larry', id: 'cook-blade', text: "The cook says he's had one blade nineteen years. Still sharp." },    // card: zhuangzi, told
    { cue: 'hatch-again' },
    // The kitchen hatch, closer. The cook in the window is still going fast.
    { sfx: 'murmur', vol: 0.5, hold: 0 },
    { say: 'larry', id: 'cook-hard-part', text: 'When he comes to a hard part, he slows down.', rate: 0.94, gap: 0.6 },    // card: zhuangzi, told
    { cue: 'cook-slows', at: -0.8 },
    // On "slows down" the cook in the hatch stops. Leans in close over the board. Then moves
    // again, slowly. The dining room goes on bobbing at full speed in front of him.
    { say: 'larry', id: 'cook-gently', text: 'Looks right at it. Goes gently.', rate: 0.92, gap: 0.9 },          // card: zhuangzi, told
    { wait: 1.0 },
    { cue: 'larry-keeps-it' },
    // Larry at the glass, facing us.
    { say: 'larry', id: 'cook-keep', text: 'Things speed up, and the cook slows down. I keep that one.', gap: 0.5 },

    // ── THE BUSKER ──────────────────────────────────────────────────────────────────────────

    { cue: 'walk-on' },
    // Tracking again. The window slides off to the left and its murmur goes with it. Footsteps,
    // both sets. Steam lifts from a grate and drifts across him. The street is darker here.
    { wait: 3.2 },

    { cue: 'busker-heard' },
    // Sound before picture: one voice somewhere ahead, small and far to the right, no words.
    // Larry's head lifts toward it.
    { sing: 'al', id: 'busker-far', bpm: 72, lyrics: 'la la la la',
      notes: [[47, 1], [45, 0.5], [43, 0.5], [45, 2]], vol: 0.3, pan: 0.7, caption: false },

    { cue: 'busker-in' },
    // The singer slides in from the right edge and the street stops; so do the footsteps. A
    // man under a lamp in a coat and hat, an open case at his feet with nothing in it. No
    // listeners: an empty pavement both ways. Larry in profile, listening, not moving.
    // The busker is an invented one-off, not house cast. `al` is a stand-in voice only: nobody
    // should take this for Al, who is already at the table.
    { sing: 'al', id: 'busker-near', bpm: 72, lyrics: 'la la la la la la la',
      notes: [[47, 1], [45, 0.5], [43, 0.5], [45, 1], [47, 1], [50, 2], [45, 3]], gap: 0.7 },
    // The tune climbs and then stops on a note that is not home. It does not finish.
    { wait: 1.5 },

    { cue: 'coin' },
    // Just out of frame one coin lands in the case. Larry's head dips toward it and comes up.
    { sfx: 'tick' },
    { say: 'larry', id: 'good-one', text: "That's a good one. Thank you.", gap: 0.5 },

    { cue: 'walk-past' },
    // The busker nods. Tracking resumes; the singer slides away to the left, starting the tune
    // over, smaller and quieter behind us. Sound editor: the same phrase once more, low and
    // panned left, under the next three lines, never reaching its last note.
    { wait: 1.8 },
    { cue: 'asked-singing' },
    // Head to camera. He has been asked something.
    { say: 'larry', id: 'q-singing-to', text: "Who's he singing to?", gap: 1.5 },                           // question 2, said back
    { say: 'larry', id: 'started-anyway', text: "Nobody, till we came by. He'd started anyway.", gap: 0.7 },
    { say: 'larry', id: 'waited-for-crowd', text: "Me, I'd have waited for a crowd.", rate: 0.92, gap: 0.6 },

    // ── THE CROSSING ────────────────────────────────────────────────────────────────────────

    { cue: 'crossing-red' },
    // Wide. They come to a crossing and stop; the street stops moving and the footsteps stop.
    // DON'T WALK, in red, on the far post. The road is empty in both directions for as far as
    // the picture goes. He waits for the sign. Silence: the quietest place on the walk.
    { wait: 3.0 },
    { say: 'larry', id: 'no-cars', text: 'No cars, I know. I wait anyway.' },
    { wait: 1.2 },

    { cue: 'asked-put-right' },
    // Close on Larry, the red of the sign on him. His head turns to camera, slowly this time.
    { say: 'larry', id: 'q-put-right', text: 'What if none of it ever gets put right?', rate: 0.94, gap: 2.0 },   // question 3, said back
    { cue: 'looks-at-red' },
    // He looks away from us, across the road, at the red sign.
    { say: 'larry', id: 'dont-know', text: "I don't know. I really don't.", gap: 1.2 },
    { say: 'larry', id: 'tarfon-who', text: 'Nearly two thousand years ago there was a rabbi named Tarfon.', gap: 1.6 },  // card: avot, told
    { say: 'larry', id: 'tarfon-recorded', text: 'He is recorded as saying:' },                                           // card: avot, told
    { cue: 'tarfon-close' },
    // Closer still: Larry and the red light, nothing else. He says it to us, plainly, not
    // performing it.
    { say: 'larry', id: 'tarfon-1', text: '"It is not thy duty to complete the work,',                    // card: avot, quoted
      as: 'It is not thy duty to complete the work,', rate: 0.92, gap: 0.8 },
    { say: 'larry', id: 'tarfon-2', text: 'but neither art thou free to desist from it".',                // card: avot, quoted
      as: 'but neither art thou free to desist from it.', rate: 0.92, gap: 0.3 },
    { say: 'larry', id: 'tarfon-borrow', text: "He meant the study of Torah. Here's how I borrow it.", gap: 1.6 },  // card: avot, told
    { cue: 'two-at-the-kerb' },
    // Wide again: Larry at the kerb, the red sign across the empty road.
    // The next two lines are Larry's borrowing, said as his: the card calls the wider reading a widening.
    { say: 'larry', id: 'dont-finish', text: "We don't have to finish it.", gap: 0.6 },                   // card: avot, told
    { say: 'larry', id: 'dont-quit', text: "We just don't get to quit.", rate: 0.9, gap: 0.5 },           // card: avot, told
    { wait: 0.9 },

    { cue: 'walk-sign' },
    // The sign changes: WALK, in green. The crossing chirps. Larry's head tips up to it, holds,
    // and comes round to us.
    { call: 'songbird', name: 'chirps', vol: 0.5, hold: 0 },
    { wait: 1.4 },
    { say: 'larry', id: 'didnt-arrange', text: "I didn't arrange that.", rate: 0.9 },

    { cue: 'cross' },
    // They cross. Tracking, the green sign sliding past behind him, the footsteps back. Halfway
    // over, snow starts: a few flakes through the lamplight, then more. No words. He walks with
    // his head a little down, and the footsteps go soft as the snow settles.
    { call: 'songbird', name: 'chirps', vol: 0.35, hold: 0 },
    { wait: 6.0 },

    // ── HOME ────────────────────────────────────────────────────────────────────────────────

    { cue: 'home-street' },
    // A quiet side street in the snow. The tracking slows and stops under a row of house
    // fronts; one window on the second floor is warm and full of moving shapes. He looks up at
    // it, then at us.
    { say: 'larry', id: 'this-is-me', text: "This is me. Come on up, it's warm.", gap: 0.5 },

    { cue: 'stairs' },
    // Cut: the top of a stair, a door standing ajar, warm light round its edges and shapes
    // crossing the gap. Larry at the left edge of frame, chest up, climbing with the same small
    // bob. Sound: several voices behind the door, all at once, no words. He hums what he
    // remembers of the tune. His last note is a semitone under.
    { sfx: 'murmur', vol: 0.5, hold: 0 },
    { sing: 'larry', id: 'larry-hums', bpm: 72, lyrics: 'la la la la',
      notes: [[52, 1], [50, 0.5], [48, 0.5], [49, 2]], vol: 0.8, gap: 0.6 },

    { cue: 'table-wide' },
    // The door swings in on his last note. Establishing wide, kept short: a warm room, a lamp,
    // a window with the snow in it, and one long table drawn in front of all six so that it
    // hides them below the chest. Candles, plates, glasses, one big covered dish that nobody
    // names. Sibyl, Hy, Al, Dee, Pete and Eppy in their own clothes: no silver jacket, no band
    // jackets, Eppy without the headset. Every head turns to the door.
    { say: 'hy', id: 'hy-flat', text: 'Nearly, Larry. Flat, but nearly.', gap: 0.5 },

    { cue: 'band-corner' },
    // Three-shot at the band's end of the table: Dee, with Pete and Al beside her. Hy's nod, at
    // the edge of frame, counts her in. Dee sings it properly, facing Larry. Two notes in, Pete
    // is tapping the table and Al has put one low note under her. Off duty, they cannot help it.
    { music: { id: 'table-tune', bpm: 72, gap: 0.5, tracks: [
      { who: 'dee', id: 'dee-finishes', caption: true, lyrics: 'la la la la la la la',
        notes: [[71, 1], [69, 0.5], [67, 0.5], [69, 1], [71, 1], [74, 2], [67, 3]] },
      { who: 'pete', beat: 'K . . . | ! . K . ', loops: 3, start: 2, vol: 0.35 },   // fingers on the table edge
      { who: 'al', beat: 'm:43 . . . | . . . . ', loops: 3, start: 2, vol: 0.5 },
    ] } },
    // Her last note is home, the note the street never reached. A second of quiet in the room.
    { wait: 1.2 },

    { cue: 'sibyl-and-eppy' },
    // Two-shot: Sibyl and Eppy, side by side. Sibyl has not looked up from her plate.
    { say: 'sibyl', id: 'late', text: 'You are also eleven minutes late.', rate: 0.95, gap: 0.5 },
    { say: 'eppy', id: 'house-record', text: "Eleven! That's a house record!",
      as: "Eleven! That's a house rekkerd!", rate: 0.88, gap: 0.2 },
    { say: 'dee', id: 'dee-laughs', text: 'Ha!', caption: false, vol: 0.6, overlap: 0.15 },

    { cue: 'larry-at-door' },
    // Larry in the doorway, snow on his shoulders. He turns his head to us, beside him.
    { say: 'larry', id: 'company', text: 'I walked. I had company.', gap: 0.8 },

    { cue: 'they-look' },
    // The wide again, short: all six heads turn from Larry to the camera, together. They look
    // at us. Nobody speaks.
    { wait: 1.8 },

    { cue: 'sibyl-rules' },
    // Sibyl alone, facing us. A ruling.
    { say: 'sibyl', id: 'house-rule', text: 'House rule. There is always one extra chair.', rate: 0.95 },

    { cue: 'chair' },
    // The near side of the table: one empty chair with a place already set in front of it,
    // drawn a little brighter than everything round it.
    { say: 'al', id: 'sit-eat', text: 'Sit. Eat.', gap: 0.6 },

    { cue: 'sit' },
    // The camera goes to the chair and settles at table height. We are sitting. Hy, Dee and Al
    // across from us over the candles. Everyone goes back to talking at once: the room's own
    // murmur, layered, a voiced laugh or two with no caption. Keep it as a bed to the end.
    { sfx: 'murmur', vol: 0.6, hold: 0 },
    { wait: 3.0 },

    { cue: 'goodnight' },
    // Larry, seated at our corner of the table, coat off, in a cardigan, the scarf still on, turns to camera.
    // The table soft and warm behind him, the others turned to one another. Push in slowly.
    // After his last word hold on him for three seconds with the room still talking, then fade
    // to black. Nothing is said after it.
    { sfx: 'murmur', vol: 0.4, hold: 0, at: 9.9 },   // moved to the end: the room still talking after his last word
    { wait: -9.9 },   // the sfx above moved the cursor to where it starts; this brings it back
    { say: 'larry', id: 'mixed-up-world', text: "It's a crazy mixed up world out there.", rate: 0.95, gap: 1.2 },   // the owner's line
    { say: 'larry', id: 'keep-close', text: 'Keep the ones that make you feel sane close.', rate: 0.92, gap: 0.7 }, // the owner's line
    { say: 'larry', id: 'stay-warm', text: 'Stay warm, folks. Goodnight.', rate: 0.94, gap: 1.2 },                  // the owner's line, and the last
    { wait: 3.0 },   // three seconds on him with the room still talking, then black
  ],
}
