// The holiday special, the script that goes to the owner: "The Walk Home".
//
// One script and one unbroken walk: the dark studio, the street, his door, the table.
//
// How to read it
// - Every picture is a `cue`. The comment under it says what is seen, then what the place
//   sounds like. There is no audience anywhere in it: no laugh, no applause, no sting. Sound is
//   the place. Where the place wants a sound the library does not have (footsteps, a chair on a
//   wooden floor), the comment describes it for the builder and the sound editor.
// - The viewer walks beside Larry and never speaks. Three times he says our question back (ids
//   starting `q-`). Each has a `listen-` cue before it: he turns to us and holds, and the line's
//   `gap` is the moment where the question would be. Once, early, he asks us something and we
//   answer in a silence nobody hears. Once he answers a look.
// - Four ideas, each said only in the wording its card in research/philosophy.md calls safe,
//   and no two arriving the same way:
//     zhuangzi      Chinese  he sees a cook, and tells the story as he remembers it; the cook slows on the word
//     avot          Jewish   we ask, he does not know, and he borrows: the exact quotation (Gorfinkle, 1913),
//                            then his own reading, named as his. The street does not answer on cue
//     havamal       Norse    one line he says to himself on the last block (Bellows, 1923), said to the
//                            road and half taken back. The owner's fourth idea, added 27 November 2026
//     kural-guests  Tamil    told as he remembers it, as the reason he cannot leave us on the pavement
// - The owner's five lines are marked. Only punctuation and capitals were tidied.
// - The only words on screen are OPEN, DON'T WALK and WALK. The two translations quoted are named
//   in the credits (notes.json, "credits"), not during the walk.
// - Nobody has hands. Things are already in place, or arrive from just out of frame.
// - Larry is off the air: slower than on a show night, and nothing is pushed. Rates are marked
//   only where a line wants air.
export default {
  id: 'walk',
  title: 'The Walk Home',
  gap: 0.36,
  beats: [

    // ── THE DARK STUDIO ─────────────────────────────────────────────────────────────────────

    { cue: 'dark-studio' },
    // Wide. The studio switched off: truss, curtain, couch and bandstand barely there, ON AIR
    // dark, the sign unlit. One bare work lamp on a stand makes a small pool of light by the
    // desk, and Larry stands in it, side-on, in a long rumpled overcoat with the collar up. No
    // tuxedo, no bow tie. He is looking down at the desk. The city in the window is the only
    // other light.
    // Sound: an empty room. Nothing, then one car passing somewhere outside.
    { sfx: 'whoosh', vol: 0.25, hold: 0, at: 1.2 },
    { wait: 2.0 },

    { cue: 'sees-us' },
    // His head comes up and turns to camera, unhurried. He has noticed us standing in the doorway.
    { say: 'larry', id: 'no-show', text: 'Oh, no show tonight, folks. Holidays and all.' },      // the owner's line

    { cue: 'envelope' },
    // Close on the desk in the lamp's pool: a pay envelope leaning against the mug, nothing
    // written on it. His head tips down to it.
    { say: 'larry', id: 'paycheck', text: 'Just here picking up my paycheck.', gap: 0.8 },                  // the owner's line

    { cue: 'ask' },
    // Medium on Larry, facing us, the lamp behind his shoulder. The corner of the envelope now
    // shows at his coat pocket. The first line is a small confession, and he knows it.
    { say: 'larry', id: 'mail-it', text: "They'd mail it. I like the walk home.", gap: 0.8 },
    { say: 'larry', id: 'walk-with-me', text: 'Would you walk with me a bit?', gap: 0.9, rate: 0.94 },   // the owner's line
    // He waits on us. A small nod when he has his answer.
    { say: 'larry', id: 'scarf', text: 'Good. Let me get my scarf.', gap: 1.4 },                  // the pause before it is our yes

    { cue: 'scarf-on' },
    // He looks down. A gold scarf draws itself round his collar over two seconds. Gold is his
    // colour, and it is the only thing of the show he takes outside. (The builder may cut to the
    // collar as it settles instead. Either way, no hand.)
    { wait: 2.0 },

    { cue: 'out-the-door' },
    // The exit door swings open on the dark. The work lamp clicks off. Black for half a second.
    { sfx: 'tick-1', vol: 0.8 },                   // (sound editor) the lamp: a voiced tongue click
    { wait: 0.8 },

    // ── THE STREET ──────────────────────────────────────────────────────────────────────────

    { cue: 'street-start' },
    // Tracking, chest up: Larry side-on, walking screen-right with a small bob and a puff of
    // breath every few steps, the street sliding left behind him in layers: far skyline, dark
    // building fronts with a few lit windows, lamp posts, the kerb. Every lamp is drawn again
    // under itself, upside down and dimmer, in the wet road. The camera is us, at his shoulder.
    // Sound, from here to his door: two sets of footsteps, his and ours, soft beatbox ticks a
    // little out of step with each other. They stop whenever we stop. They are the only sound
    // the viewer ever makes. A car goes by. Nobody talks yet: look.
    // (sound editor) The footsteps are music blocks of lip pops, laid under everything and then
    // stepped back over: his ('P!' on every beat, Al's body, a little right) and ours (Pete's body,
    // an uneven four-or-five-sixteenth stride, so the two drift in and out of step). 102 bpm puts a
    // beat on each of his steps, so any puppet that bobs to music bobs once a step. Each stretch
    // ends on a block laid back from the cue where the street stops, so the steps stop on it.
    { music: { id: 'steps-street-1', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 16, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! .', vol: 0.18, pan: -0.05 },
      ] } },
    { music: { id: 'steps-street-2', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 16, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! .', vol: 0.18, pan: -0.05 },
      ] } },
    { music: { id: 'steps-street-3', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 16, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! .', vol: 0.18, pan: -0.05 },
      ] } },
    { wait: -10 },
    { wait: -10 },
    { wait: -8.2354 },
    { wait: 2.2 },
    { sfx: 'whoosh', vol: 0.5, hold: 0 },
    { wait: 2.0 },

    { cue: 'turn-to-us' },
    // His head turns to camera. The walk keeps going.
    { say: 'larry', id: 'how-have-you-been', text: 'So. How have you been?', as: 'So. How, have you been?' },
    { wait: 2.4 },
    // He waits for the answer, still looking at us. Footsteps. We answer, and nobody hears it.
    { cue: 'me-too' },
    // One small nod, late. Then he faces the street again.
    { say: 'larry', id: 'yeah-me-too', text: 'Yeah. Me too.', gap: 0, rate: 0.92 },

    { cue: 'eyes-front' },
    // Profile. A lamp post goes by first. Easier to say the next part not looking at us.
    // The owner's note, 27 November 2026: the start of the walk dwelt on the negative, when what
    // unsettles people is how much is happening, the terrible and the wonderful together. The
    // owner chose version C of production/rewrite/start-of-walk.md: he tells it on himself. The
    // two lines below replace `fast-and-fair`, and `what-helped` has a new first sentence.
    { say: 'larry', id: 'cant-believe', text: 'I keep saying, "I can\'t believe it."', gap: 1.0 },
    { say: 'larry', id: 'both-ways', text: 'The good way and the bad way. Same hour.', as: 'The good way, and the bad wway. Same hour.' },
    { say: 'larry', id: 'no-joke', text: "I don't have a joke for that.", as: "I don't have a joke four that." },
    { say: 'larry', id: 'i-looked', text: 'I looked.', rate: 0.9, gap: 0.7 },
    { say: 'larry', id: 'old-books', text: "So I've been reading old books. Very old.", gap: 1.0 },
    { say: 'larry', id: 'what-helped', text: "They couldn't believe it, either. Some wrote down what helped." },

    // Two lamp posts go by with nobody talking.
    { wait: 1.6 },
    { cue: 'listen-help' },
    // His head turns to camera and holds there, as if we had just said something. We have.
    // Then he says it back.
    { say: 'larry', id: 'q-does-it-help', text: 'Does it help?', gap: 1.5, rate: 0.94 },          // question 1, said back
    { cue: 'answers-ahead' },
    // He looks back at the road to answer. It is all he can honestly promise.
    { say: 'larry', id: 'some-nights', text: 'Some nights.', gap: 1.0, rate: 0.92 },

    // ── THE RESTAURANT ──────────────────────────────────────────────────────────────────────

    { cue: 'pass-restaurant' },
    // Warm light slides in from the right: a restaurant's big front window, every table taken,
    // head-and-shoulder silhouettes bobbing as they laugh, two hanging lamps, a small neon OPEN.
    // Sound: a full room heard through glass. Murmur, low, rising as we come level; repeat it
    // as a bed under the whole scene.
    { sfx: 'murmur', vol: 0.3, pan: 0.4, hold: 0 },   // (sound editor) the room through glass, from the right, rising
    { wait: 1.4 },
    // (sound editor) 12 beats laid back from the stop: his first step here falls about one stride
    // after his last in steps-street-3, and both stop on the cue.
    { wait: -7.058824 },
    { music: { id: 'steps-street-4', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 12, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . .', vol: 0.18, pan: -0.05 },
      ] } },
    { cue: 'stop-at-window' },
    // The street stops sliding and both sets of footsteps stop. He has stopped to look in, head
    // in profile toward the glass, the warm light on him. We are outside the glass, in the
    // cold, looking in at people who are warm. Remember the picture: it comes back at his door.
    { sfx: 'murmur', vol: 0.45, pan: 0.2, at: 0, hold: 0 },   // (sound editor) level with the glass
    { wait: 1.6 },
    { say: 'larry', id: 'always-stop', text: 'I always stop here.' },
    { cue: 'cook-in-back' },
    // Push in past the tables to a lit kitchen hatch at the back of the room: one cook's
    // silhouette, head down, working fast, a quick steady movement of the shoulders. This is
    // what he stops for.
    { sfx: 'murmur', vol: 0.35, hold: 0 },
    { say: 'larry', id: 'one-cook', text: 'One cook in back, feeding the whole room.', as: 'One cook, in back, feeding the whole room.', gap: 0.8 },
    { cue: 'larry-at-glass' },
    // Back to Larry, close, in profile at the window; the room's shapes move in the glass
    // beside his face. He turns to us to tell it.
    { say: 'larry', id: 'cook-story', text: "There's a story about a cook in an old Chinese book.", gap: 0.7 },  // card: zhuangzi, told
    { say: 'larry', id: 'zhuangzi-name', text: "The Zhuangzi. I'm probably saying that wrong.",          // card: zhuangzi, told
      as: "The, Jwong-dzuh. I'm probably saying that, wrong." },
    { say: 'larry', id: 'cook-prince', text: "The way I remember it, a prince admires his cook's knife work." },  // card: zhuangzi, told
    { say: 'larry', id: 'cook-blade', text: "The cook says he's had one blade nineteen years. Still sharp.", gap: 0.5 },    // card: zhuangzi, told
    { cue: 'hatch-again' },
    // The kitchen hatch, closer. The cook in the window is still going fast.
    { sfx: 'murmur', vol: 0.35, hold: 0 },
    { say: 'larry', id: 'cook-hard-part', text: 'When he comes to a hard part, he slows down.', rate: 0.94, gap: 0.7 },    // card: zhuangzi, told
    { cue: 'cook-slows', at: -0.5 },
    // On "slows down" the cook in the hatch stops. Leans in close over the board. Then moves
    // again, slowly. The dining room goes on bobbing at full speed in front of him.
    { say: 'larry', id: 'cook-gently', text: 'Looks right at it. Goes gently.', rate: 0.92, gap: 0.6 },          // card: zhuangzi, told
    { cue: 'watch-the-cook' },
    // Nobody says what it means. Wide enough for both: Larry at the glass in profile, watching,
    // and past him the cook going slowly while the room hurries. Hold it.
    { sfx: 'murmur', vol: 0.35, hold: 0 },
    { wait: 3.4 },

    // ── THE BUSKER ──────────────────────────────────────────────────────────────────────────

    { cue: 'walk-on' },
    // Tracking again. The window slides off to the left and its murmur goes with it. Footsteps,
    // both sets. The street is darker here.
    // (sound editor) The bed under the whole window scene, laid back from here so that it runs to
    // this cue however the lines above it move: one murmur every 2.4 s, overlapping at the fades.
    { sfx: 'murmur', vol: 0.5, pan: 0.3, at: -28.8, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.1, at: -26.4, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.3, at: -24, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.1, at: -21.6, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.3, at: -19.2, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.1, at: -16.8, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.3, at: -14.4, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.1, at: -12, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.3, at: -9.6, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.1, at: -7.2, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.3, at: -4.8, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.1, at: -2.4, hold: 0 },
    { sfx: 'murmur', vol: 0.3, pan: -0.6, at: 0, hold: 0 },   // the window slides off left and takes the room with it
    { music: { id: 'steps-walk-on', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 6, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . . P! . . . P! . . . P!', vol: 0.18, pan: -0.05 },
      ] } },
    { wait: -3.5294 },
    { wait: 2.0 },

    { cue: 'busker-heard' },
    // Sound before picture: one voice somewhere ahead, off to the right, no words. Larry's head
    // lifts toward it. Nothing goes on the caption line: it is a tune, not a sentence.
    { sing: 'busker', id: 'busker-tune', bpm: 72, lyrics: 'la la la la la la la',
      notes: [[47, 1], [45, 0.5], [43, 0.5], [45, 1], [47, 1], [50, 2], [45, 3]], pan: 0.5, caption: false, gap: 0.5 },
    { cue: 'busker-in', at: -6.25 },
    // Two notes in, the singer slides in from the right edge and the street stops; so do the
    // footsteps. A man under a lamp in a coat and hat, an open case at his feet with nothing in
    // it. No listeners: an empty pavement both ways. Larry in profile, listening, not moving.
    // The busker is an invented one-off, not house cast. `al` is a stand-in voice only: nobody
    // should take this for Al, who is at the table in two minutes.
    { cue: 'tune-stops' },
    // The tune climbs and then stops on a note that is not home. The busker's head tilts, as if
    // looking for the one after it. Silence where it should be.
    { wait: 1.4 },

    { cue: 'coin' },
    // Just out of frame one coin lands in the case. Larry's head dips toward it and comes up.
    // He says this to the busker, not to us.
    { sfx: 'tick-3', vol: 0.7, pan: 0.4, hold: 0 },          // (sound editor) the coin: the bright click, from the busker's side
    { sfx: 'tick-3', vol: 0.25, pan: 0.45, at: 0.06, hold: 0 }, // and its bounce
    { say: 'larry', id: 'good-one', text: "That's a good one. Thank you.", gap: 0.5 },

    { cue: 'walk-past' },
    // The busker nods. Tracking resumes; he slides away to the left and gets smaller. Larry
    // says the next line to us, walking.
    { wait: 1.6 },
    { say: 'larry', id: 'started-anyway', text: "Nobody there till we came by. He'd started anyway.", as: "Nobody there, till we came by. He'd started, anyway." },
    { cue: 'tune-again' },
    // Behind us he starts the tune over from the top, small and far to the left. Larry keeps
    // walking and does not look back. It is four notes in when we lose it.
    { sing: 'busker', id: 'busker-behind', bpm: 72, lyrics: 'la la la la',
      notes: [[47, 1], [45, 0.5], [43, 0.5], [45, 2]], vol: 0.3, pan: -0.7, caption: false, gap: 0.6 },
    // Step back so that his line starts under the last long note, far behind us. Said fondly,
    // to the road ahead. He does not make anything of it, here or later.
    { wait: -1.8 },
    { say: 'larry', id: 'never-ends', text: 'He never does get to the end of it.', as: 'Hee never duz get to the end of it.', rate: 0.94, gap: 0.4 },

    // ── THE CROSSING ────────────────────────────────────────────────────────────────────────

    { wait: -10 },
    { music: { id: 'steps-past-busker', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 17, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! .', vol: 0.18, pan: -0.05 },
      ] } },
    { cue: 'crossing-red' },
    // Wide. They come to a crossing and stop; the street stops moving and the footsteps stop.
    // DON'T WALK, in red, on the far post. The road is empty in both directions for as far as
    // the picture goes. He waits for the sign. Silence: the quietest place on the walk.
    { wait: 2.8 },
    { cue: 'our-look' },
    // He glances at us. We have looked up the empty road and back at him, and he answers the
    // look. This one he does not say back.
    { say: 'larry', id: 'no-cars', text: 'No cars, I know. I wait anyway.', gap: 0.9 },
    { wait: 1.2 },

    { cue: 'listen-put-right' },
    // Close on Larry, the red of the sign on him. His head turns to camera, slowly this time,
    // and stays. We are asking, and it takes us a while. He does not hurry us and he does not
    // look away. Then he says it back, plainly, so that it has been said.
    { say: 'larry', id: 'q-put-right', text: 'What if none of it ever gets put right?', gap: 2.2, rate: 0.94 },   // question 2, said back: the hard one
    { cue: 'looks-at-red' },
    // He looks away from us, across the road, at the red sign.
    { say: 'larry', id: 'dont-know', text: "I don't know. I really don't.", gap: 1.2 },
    { say: 'larry', id: 'tarfon-who', text: 'Nearly two thousand years ago there was a rabbi named Tarfon.', gap: 1.4 },  // card: avot, told
    { say: 'larry', id: 'tarfon-recorded', text: 'He is recorded as saying:', as: 'Hee is recorded, as say-ing:', rate: 0.9 },                                           // card: avot, told
    { cue: 'tarfon-close' },
    // Closer still: Larry and the red light, nothing else. He says it to us, plainly, not
    // performing it. One sentence, taken in two breaths at its comma; nothing comes between.
    { say: 'larry', id: 'tarfon-1', text: '"It is not thy duty to complete the work,',                    // card: avot, quoted
      as: 'It is not thy duty to complete the work,', rate: 0.92, gap: 0.6 },
    { say: 'larry', id: 'tarfon-2', text: 'but neither art thou free to desist from it".',                // card: avot, quoted
      as: 'but neither art thou free to desist from it.', rate: 0.92, gap: 0.3 },
    // It gets its silence. He looks down, then across at the red.
    { wait: 2.2 },
    { cue: 'where-he-found-it' },
    // Medium, a little looser. He is telling us about himself now, and it is easier.
    { say: 'larry', id: 'used-book', text: 'I found it in a used book. Somebody had already underlined it.' },
    { say: 'larry', id: 'guest-in-sentence', text: "He meant the study of Torah. I'm a guest in that sentence.", as: "He meant thee study of Torah. I'm a guest in that sentence.", gap: 0.6 },   // card: avot, told
    { cue: 'two-at-the-kerb' },
    // Wide again: Larry at the kerb, the red sign across the empty road. He turns to us.
    // The next three lines are Larry's borrowing, said as his: the card calls the wider reading a widening.
    { say: 'larry', id: 'borrow', text: "Here's how I borrow it.", gap: 1.0 },                            // card: avot, told
    { say: 'larry', id: 'dont-finish', text: "We don't have to finish it.", gap: 0.6 },                   // card: avot, told
    { say: 'larry', id: 'dont-quit', text: "We just don't get to quit.", rate: 0.9, gap: 0.5 },           // card: avot, told

    { cue: 'still-red' },
    // Nothing happens. The sign stays red and the road stays empty. Nothing in the street has
    // heard him. He looks at the sign, then at us, with a small tilt of the head, and goes on
    // waiting. Hold all of it.
    { wait: 3.4 },
    { cue: 'walk-sign' },
    // The sign changes to WALK, in green, in its own time: one plain tick. No chirp, no look up
    // at it, and nobody remarks on it. He steps off the kerb.
    { sfx: 'tick-2', vol: 0.5 },                   // (sound editor) the sign: the plain unvoiced click, quieter than the lamp
    { wait: 0.6 },

    { cue: 'cross' },
    // They cross. Tracking, the green sign sliding past behind him, the footsteps back. Halfway
    // over, snow starts: a few flakes through the lamplight, then more. No words. He walks with
    // his head a little down, and the footsteps go soft as the snow settles.
    // (sound editor) Four beats of steps off the kerb at full level, then the snow's softer steps
    // (laid back from apartment-door, below).
    { music: { id: 'steps-cross', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 4, vol: 0.14, pan: 0.25 },
        { who: 'pete', beat: '. . P! . . . P! . . . P! . . . . P!', vol: 0.18, pan: -0.05 },
      ] } },
    { wait: -2.3529 },
    { wait: 5.0 },

    // ── HIS DOOR ────────────────────────────────────────────────────────────────────────────

    { cue: 'last-block' },
    // Tracking, a little closer than before: snow across the frame, a row of lit apartment
    // windows sliding by above him. Nobody else on the pavement. He says both lines looking
    // straight ahead, not at us. The second mends the first, a step later and drier: he is not
    // quite on his own here, he has one line that he walks this block with.
    { wait: 0.8 },
    { say: 'larry', id: 'this-block', text: 'Nearly there. I usually walk this block on my own.', as: 'Nearly, there. I usually walk this block on my own.' },
    // The owner's fourth idea, 27 November 2026: the Norse line, on this block. It does not
    // arrive as the cook's story and the Tamil couplet do ("There's ..."). Nothing is introduced:
    // it comes out of the line above as the thing he has with him here every night, and then he
    // says it. The poem is named only as far as its card calls safe, and its name is left to
    // the credits.
    { say: 'larry', id: 'one-line', text: 'Just me and one line from an old Norse poem.', as: 'Just me, and one line from an old Norse poem.', gap: 0.7 },   // card: havamal, told
    { cue: 'comrade' },
    // (builder) Closer on him, still in profile and still walking: eyes on the road ahead, chin
    // up a little, the lit windows going by above him and the snow across him. His head does
    // not turn. He says it to the road, by heart and not performed, the way he says it on the
    // nights when nobody is beside him. It is not advice and he does not explain it; nothing in
    // the picture explains it for him either, and no words go on screen.
    // Sound: the two sets of footsteps in the snow, and nothing else under the line.
    { say: 'larry', id: 'comrade-line', text: '"Rich did I feel when a comrade I found".',              // card: havamal, quoted
      as: 'Rich, did I feel when a comrade I found.', rate: 0.92, gap: 0.9 },
    { cue: 'glance' },
    // A beat of footsteps. Then his head turns to us, and away again at once. A tilt. He has
    // just heard what he said, and who was walking beside him when he said it.
    { wait: 1.8 },
    // Eyes front again, and they stay there for both of these. The first takes it back. The
    // second, a step or two later, gives half of it back. He does not look at us for either,
    // and he says nothing else about it. The glance was the only time his head turned.
    // (sound editor) "Mostly." is its own beat so that its caption arrives when he says it and
    // not with the line before. If the one word will not stand alone, the two may be one beat
    // again. The block is now about twelve seconds longer than the steps below were laid for.
    // It wants a step or two of footsteps after "Mostly." before the street stops, and no more.
    { say: 'larry', id: 'poem-talking', text: "That's the poem talking." },                             // card: havamal, told
    { say: 'larry', id: 'mostly', text: 'Mostly.', rate: 0.92, gap: 0.9 },
    { wait: 1.2 },   // (sound editor) a step or two more, then the street stops at his door

    // (sound editor) The snow's steps: 36 beats laid back from apartment-door, soft, so they run
    // from halfway over the crossing through the whole block, under the Norse line with nothing
    // else, and stop on the cue.
    { wait: -10 },
    { wait: -10 },
    { wait: -1.176471 },
    { music: { id: 'steps-snow', bpm: 102, gap: 0, swing: 0.08, tracks: [
        { who: 'al', beat: 'P! . . . ', loops: 36, vol: 0.08, pan: 0.25 },
        { who: 'pete', beat: '. . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . . P! . . . P! . . . P! . . . P! . . . .', vol: 0.1, pan: -0.05 },
      ] } },
    { cue: 'apartment-door' },
    // The street stops. Wide on a brick front in the snow: a street door with a lit pane over
    // it, and three floors of windows. One window on the top floor is warm and crowded, small
    // figures moving in it. It is the restaurant window again, and we are outside it again.
    // Larry at the door, head tipped up to the window.
    // Sound: a room full of people, two floors up and behind glass.
    { sfx: 'murmur', vol: 0.45, hold: 0 },
    { wait: 1.6 },
    { say: 'larry', id: 'this-is-me', text: 'This is me.' },
    { say: 'larry', id: 'started-without-me', text: "They'll have started without me.", as: "They'll hav started without me.", gap: 0.6 },

    { sfx: 'murmur', vol: 0.4, pan: 0.1, at: -3.3, hold: 0 },   // (sound editor) the room upstairs, ending before the hold
    { cue: 'listen-door' },
    // He turns to the door, and stops, because we have not moved. He turns back. We have stayed
    // on the pavement. He holds, and then he says it back.
    { say: 'larry', id: 'q-come-up', text: 'Should you come up?', gap: 2.0, rate: 0.94 },         // question 3, said back
    { cue: 'looks-up' },
    // He does not answer it straight. He says the next three lines up at the warm window, not at us.
    { sfx: 'murmur', vol: 0.3, pan: 0.1, at: 0, hold: 0 },   // (sound editor) the room upstairs again, low
    { say: 'larry', id: 'tamil-book', text: "There's an old Tamil book of couplets called the Tirukkural.",    // card: kural-guests, told
      as: "There's ann old Tamil book of couplets called the, Tee-rook-koo-rul.", gap: 1.0 },
    { say: 'larry', id: 'guest-1', text: 'As I remember it: even with the food of immortality on your table,' },   // card: kural-guests, told
    { say: 'larry', id: 'guest-2', text: "you don't eat while a guest stands outside.", gap: 0.3 },                 // card: kural-guests, told
    { cue: 'back-to-us' },
    // Now he looks at us. A tilt: he has been caught wanting us to come.
    { say: 'larry', id: 'position', text: 'So you see my position.', gap: 0.8 },

    { cue: 'let-in' },
    // Before he can turn to the door, its latch goes and it swings in on its own. Warm light
    // falls across the snow and across him. Up in the window one small figure has been watching
    // the street. Somebody saw us coming.
    // Sound: two ticks of a latch. No buzzer.
    // (sound editor) The room upstairs under the Tirukkural lines, laid back from here; then the door
    // is open and the room is a little nearer. The latch is the voiced click, then the unvoiced one.
    { sfx: 'murmur', vol: 0.3, pan: 0.1, at: -12, hold: 0 },
    { sfx: 'murmur', vol: 0.3, pan: -0.1, at: -9.6, hold: 0 },
    { sfx: 'murmur', vol: 0.3, pan: 0.1, at: -7.2, hold: 0 },
    { sfx: 'murmur', vol: 0.3, pan: -0.1, at: -4.8, hold: 0 },
    { sfx: 'murmur', vol: 0.3, pan: 0.1, at: -2.4, hold: 0 },
    { sfx: 'murmur', vol: 0.45, pan: 0, at: 0, hold: 0 },
    { sfx: 'tick-1', vol: 0.7, hold: 0 },
    { wait: 0.25 },
    { sfx: 'tick-2', vol: 0.55, hold: 0 },
    { wait: 0.8 },
    { say: 'larry', id: 'come-up', text: 'Come on up.', as: 'Come onn up.' },
    { wait: 0.6 },

    // ── THE TABLE ───────────────────────────────────────────────────────────────────────────

    { cue: 'table-wide' },
    // Cut to the room, from its door, wide and brief. A lamp, a window with the snow going past
    // it, and one long table across the frame, drawn in front of all six so that it hides them
    // below the chest. Candles, glasses, one big covered dish that nobody names, and every
    // plate clean. Sibyl at the head, then Eppy, Al, Dee, Hy and Pete, in their own clothes: no
    // silver jacket, no band jackets, Eppy without the headset. On the near side one empty
    // chair with its back to us, drawn in gold. All six heads turn to the door at once.
    // Sound: six people talking over each other, cut off on one breath as the door opens.
    { sfx: 'murmur', vol: 0.9, hold: 0.3 },
    { sfx: 'gasp-1', vol: 0.35, at: -0.3, hold: 0 },   // (sound editor) the breath the talk stops on, 0.6 s in

    { cue: 'sibyl-first' },
    // Sibyl at the head of the table, with Eppy beside her. She has not raised her voice.
    { say: 'sibyl', id: 'late', text: "You're late. Nobody has started.", rate: 0.95 },
    { cue: 'band-end' },
    // Three-shot at the band's end of the table: Pete, Hy and Dee. They talk to Larry, over
    // each other, the way people do to someone they have been waiting for.
    { say: 'pete', id: 'counted-in', text: 'I counted you in twice.', as: 'I kown-tid you in twice.', rate: 0.88, gap: 0.2 },
    { say: 'hy', id: 'long-way', text: 'You took the long way.', gap: 0.2 },

    { cue: 'larry-at-door' },
    // Larry in the doorway, snow on his shoulders. He turns his head to us, beside him.
    { say: 'larry', id: 'company', text: 'I had company.', gap: 0.6 },

    { cue: 'they-look' },
    // The wide again, short: all six heads turn from Larry to the camera, together. They look
    // at us. Nobody speaks, and for a second nobody is sure what the others will do.
    { wait: 1.6 },
    { say: 'al', id: 'chair', text: 'Chair.' },

    { cue: 'chair-in' },
    // A second chair slides in from the right edge and stops beside the gold one: the sound of
    // it pulled across a wooden floor. The camera goes to it and settles at table height. We
    // are sitting. Larry is in the gold chair beside us, coat gone, a cardigan, the scarf still
    // on. A plate, a glass and a fork slide into place along the bottom of the frame, in front
    // of us. The heads go back to each other and the room starts up again, warmer than before.
    { sfx: 'murmur', vol: 0.7, hold: 0 },
    { wait: 1.4 },
    { say: 'sibyl', id: 'rule', text: 'The guest is served first. That is the rule.', as: 'The guest is, served first. That, is the rule.', rate: 0.9 },

    { cue: 'served' },
    // From our chair. The big dish has lost its lid while nobody was looking, and steam goes up
    // past the candles. A bowl stands at Larry's left, just handed along, and he is looking at
    // it. After a cut it is at our plate, and his head has followed it there: it went past him
    // to get to us. Nothing is seen to slide along the table (the owner's note, 27 November
    // 2026: "the small bowls are sliding").
    { wait: 1.8 },
    { cue: 'larry-and-sibyl' },
    // Larry, close beside us in profile, and Sibyl at the head of the table past him. He says
    // it to her. She is at her plate while he says it, and to answer she lifts her head and
    // looks at him, unhurried and level (the owner's note, 27 November 2026: she had been
    // "looking down" for her line).
    { say: 'larry', id: 'my-house', text: "It's my house." },
    { say: 'sibyl', id: 'still-the-rule', text: "It's still the rule.", gap: 0.3 },
    { cue: 'eppy-calls-it' },
    // Eppy, sitting up very straight, to the table at large. Dee, two along, laughs: a friend's
    // laugh, one voice, not an audience.
    { say: 'eppy', id: 'ruling-stands', text: 'And the ruling stands!', rate: 0.88, gap: 0.2 },
    { say: 'dee', id: 'dee-laughs', text: 'Ha!', caption: false, vol: 0.6, overlap: 0.15 },

    { cue: 'the-meal' },
    // From our chair, and nobody is looking at us any more, which is the welcome. Everyone
    // talks at once. Nothing moves along the table; the life is in the heads. Hy leans across to Dee;
    // Pete's head is down over his plate; Al nods at something Sibyl has said. Our plate, at
    // the bottom of the frame, has something on it now. Let it run.
    // Sound: the room's own murmur, layered, a voiced laugh or two with no caption. Keep it as
    // a bed to the end.
    // (sound editor) The room from chair-in to here, laid back from this cue, under the rule and the bowl.
    { sfx: 'murmur', vol: 0.5, pan: -0.15, at: -9.6, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.15, at: -7.2, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: -0.15, at: -4.8, hold: 0 },
    { sfx: 'murmur', vol: 0.5, pan: 0.15, at: -2.4, hold: 0 },
    { sfx: 'murmur', vol: 0.8, hold: 0 },
    { wait: 2.4 },
    { sfx: 'murmur', vol: 0.7, hold: 0 },
    { wait: 2.4 },

    { cue: 'goodnight' },
    // Larry, in the next chair, turns from the table to camera. The table is soft and warm
    // behind him and nobody at it is looking our way: heads turned to one another. While he
    // says the next two lines nothing behind him asks to be looked at and no
    // sound is cued against them. He means them. Push in slowly.
    // After his last word he stays on us a moment, nods, and his head goes back to the table.
    // Hold three seconds from our chair, the room still talking, our plate in the frame. Then
    // fade to black. Nothing is said after it.
    // (sound editor) One unbroken bed from here until it dies away after "Goodnight.": a murmur
    // every 1.75 to 2.15 s, so each clip's fade-in overlaps the last one and the room never
    // drops. Starts fall in the breaths between lines where there is one, and otherwise inside a
    // line, away from its first and last words, or in the comma of "Stay warm, folks".
    // `duck: 0.5` halves the ducking (about 4.5 dB, not 9), so the room dips only a little under
    // his lines and still sits well below them. The waits lay the clips ahead of the cursor, and
    // the steps back return it to 2.8 s after the cue, so his first line still starts 3.1 s in.
    { sfx: 'murmur', vol: 0.25, pan: 0, hold: 0, duck: 0.5 },
    { wait: 1.75 },
    { sfx: 'murmur', vol: 0.25, pan: 0.15, hold: 0, duck: 0.5 },
    { wait: 1.75 },
    { sfx: 'murmur', vol: 0.25, pan: -0.15, hold: 0, duck: 0.5 },
    { wait: 2.1 },
    { sfx: 'murmur', vol: 0.25, pan: 0.1, hold: 0, duck: 0.5 },
    { wait: 2.1 },
    { sfx: 'murmur', vol: 0.25, pan: -0.1, hold: 0, duck: 0.5 },
    { wait: 1.95 },
    { sfx: 'murmur', vol: 0.25, pan: 0.15, hold: 0, duck: 0.5 },
    { wait: 1.95 },
    { sfx: 'murmur', vol: 0.25, pan: -0.15, hold: 0, duck: 0.5 },
    { wait: 2.0 },
    { sfx: 'murmur', vol: 0.25, pan: 0.1, hold: 0, duck: 0.5 },
    { wait: 2.15 },
    { sfx: 'murmur', vol: 0.25, pan: 0, hold: 0, duck: 0.5 },
    { wait: -10 },
    { wait: -2.95 },
    { say: 'larry', id: 'mixed-up-world', text: "It's a crazy mixed up world out there.", rate: 0.95, gap: 0.3 },   // the owner's line
    { say: 'larry', id: 'keep-close', text: 'Keep the ones that make you feel sane close.', as: 'Keep the ones that make you feel sane, close.', rate: 0.92, gap: 0.8 }, // the owner's line, its second breath
    { wait: 0.8 },   // (sound editor) with the gap below, 1.3 s after "close", as before
    { say: 'larry', id: 'stay-warm', text: 'Stay warm, folks. Goodnight.', rate: 0.94, gap: 0.5 },                  // the owner's line, and the last
  ],
}
