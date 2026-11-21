// The Making Of, and Who Checks That
// A draft for the owner's commission of 21 November 2026. Card: making-of. Ideas: 2:27 and 1:28.
//
// THE SHAPE. One camera move, made four times and refused the fifth: straight back. Larry
// explains the show in a breath and says it went well. He made it, so he does not judge it, and
// the camera backs out of the studio to find who does, then who checks them, then who checks
// that. Every level is a room, and every room holds the room before it as a picture: a monitor, a
// strip of stills, a screen on a desk. The camera leaves each room backwards, through the glass
// of the picture it was in. The last time it cannot: it is against the inside of the viewer's own
// screen. Larry's turn to the audience happens there, at the one pane the camera cannot pass and
// a tag can.
//
// FOR THE BUILDER.
// - Larry never leaves his desk. He is in the innermost picture from the first pull-back on, and
//   smaller at every level: a head, a thumbnail, a stamp, a gold dot. His lines stay captioned.
// - Sibyl is never in the picture being judged. She is at a stand in whichever room the camera
//   is in, already there when it arrives, never surprised.
// - The reviewers and the cold viewer are house puppets in roles (Al and Dee; Pete), plainly the
//   show's own. They do not speak. No puppet stands for a model.
// - The tool is a small adding machine with a paper tape. It is the only thing in the building
//   with no face.
// - Crowd sound belongs to the studio only. Behind the first glass the rooms are quiet.
// - Nothing on screen is there to be read. The one label is the show's own handle, at the cue
//   `light-in`, a glance long.
// - Where a cue says "on the word", take the moment from that line's word timings.
//
// FOR AN AUDITOR.
// - Every fact about the process is the fact sheet's. The two incidents (the usage limit, the
//   cold viewer's report) are the last run's, and Sibyl says "last run" before each. The
//   reviewers stopping in the middle of a nod is the house acting out her sentence.
// - The caption that runs off the right edge at the cue `edge` is a deliberate house gag.
// - The owner is an empty chair and a pair of headphones: not drawn, not played, not named, and
//   given no words. No real account appears or is named, and no post is shown or read. The
//   owner's cards from idea 2:27 are left out: in a piece this short the invitation would follow
//   them closely enough to look like what came of them.
// - Nothing is drawn past the last glass: no figure, no reflection, no room.
// - The lights at the end illustrate Larry's "if". They are the show's own diagram lines, with no
//   post or name on them, and the second one shows the rule that a tag from outside the cluster
//   is counted and not read. Nothing says a tag has arrived, or that anything was used.

export default {
  id: 'making-of-outward',
  title: 'The Making Of, and Who Checks That',
  gap: 0.25,
  beats: [

    // ───────────── LEVEL 0 · THE STUDIO ─────────────

    // PLACE: the studio. Larry at his desk, gold on dark, the stage behind him: the most ordinary
    // talk-show frame the show can make. He has wanted one normal segment and thinks this is it.
    // CAMERA: locked off, front on, eye level. It does not move at all until `pull-1`, so that
    // the first move is a surprise.
    { cue: 'studio' },
    { say: 'larry', id: 'quick', text: "How this show is made. It's quick.", as: "How this showw is made. It's quick." },
    { say: 'larry', id: 'stages', text: 'Thirteen stages. Agents, one job each.', as: "Thirteen stages. Agents, one job each.", rate: 1.04 },

    // PLACE: the studio still. CAMERA: still locked. Larry leans in a little for the rule: it is
    // the only thing in his account he slows down for.
    { cue: 'rule' },
    { say: 'larry', id: 'one-rule', text: 'One rule. Whoever makes a thing does not judge it.' },
    { say: 'larry', id: 'went-well', text: 'I thought that went well.', rate: 0.94, gap: 0.4 },
    { say: 'sibyl', id: 'you-made-it', text: 'You made it.', rate: 0.95, gap: 0.45 },   // her voice from off the frame, where the camera is
    { sfx: 'chuckle', at: 0.05, hold: 0 },
    { say: 'larry', id: 'who-judges', text: 'Then who judges it?', rate: 0.9, gap: 0.7 },

    // PLACE: leaving the studio. CAMERA: pulls straight back, steadily, and passes through a pane
    // of glass: the studio was a picture on a monitor. The monitor's edges come in from all four
    // sides and the studio shrinks inside them. Keep going back until the room around it is seen.
    { cue: 'pull-1', at: 0.1 },
    { sfx: 'whoosh', at: 0.1, hold: 0, vol: 0.6 },
    { wait: 0.8 },

    // ───────────── LEVEL 1 · THE REVIEWERS' ROOM ─────────────

    // PLACE: the reviewers' room. A bare table with the monitor on it, Larry head-sized inside.
    // Two house puppets as reviewers (Al and Dee, in eyeshades) sit back to back on either side of
    // it, each marking a sheet the other cannot see, each nodding slowly as they mark. Between
    // them the adding machine, no face, taking in both sheets. Sibyl at her stand.
    // CAMERA: settles wide enough to hold both reviewers, the monitor and the machine, then stops.
    { cue: 'room-1' },
    { say: 'sibyl', id: 'two-reviewers', text: "Two reviewers. Neither sees the other's score. A tool adds them up.", rate: 0.92 },
    { say: 'sibyl', id: 'five-stopped', text: 'Last run, five reviewers stopped at once.', as: 'Lahst run, five, re-viewers, stopped, at once.' },

    // PLACE: the reviewers' room. On the word "stopped", both reviewers stop dead in the middle of
    // a nod, pens off the paper. The adding machine alone keeps going: its tape runs out blank and
    // curls onto the table. Nobody speaks. CAMERA: does not move. Hold the stillness right through
    // to `resume`.
    { cue: 'freeze', at: -1.0 },
    { sfx: 'ticktock', at: 0.2, hold: 0, vol: 0.45 },   // the machine, ticking in a quiet room
    { wait: 1.2 },
    { say: 'larry', id: 'hello', text: 'Hello?', as: "Huh-loh?", vol: 0.85, gap: 0 },
    { say: 'sibyl', id: 'usage-limit', text: 'Usage limit.', as: 'yoos-age limit.', rate: 0.92, gap: 0.5 },
    { wait: 0.4 },

    // PLACE: the reviewers' room. On the word "resumed", both reviewers finish the nod they were
    // in the middle of and go on marking as if nothing had happened. CAMERA: still.
    { cue: 'resume', at: 0.7 },
    { say: 'sibyl', id: 'resumed', text: 'They were resumed.', rate: 0.92, gap: 0.1 },
    { say: 'larry', id: 'who-checks-them', text: 'And who checks them?', as: "And who, checks them?", vol: 0.85 },

    // PLACE: leaving the reviewers' room. CAMERA: straight back again, a little faster than the
    // first time, out through the room's fourth wall, which is glass too: the whole room, table,
    // reviewers and machine, flattens into a still picture as the camera clears it.
    { cue: 'pull-2', at: 0.1 },
    { sfx: 'whoosh', at: 0.1, hold: 0, vol: 0.6 },
    { wait: 0.6 },

    // ───────────── LEVEL 2 · THE COLD VIEWER'S ROOM ─────────────

    // PLACE: the cold viewer's room. Bare. A house puppet (Pete, the percussionist, in ear
    // defenders) faces a wall with a strip of stills pinned along it; the reviewers' room is the
    // newest. In every still the reviewers are in the middle of a nod. The strip takes a new still
    // now and then and never moves otherwise, so Larry, a thumbnail inside the newest one, jumps
    // from mouth shape to mouth shape while his voice runs on. Sibyl at her stand.
    // CAMERA: settles on the puppet's back and the strip beyond it, level, then stops.
    { cue: 'room-2' },
    { say: 'sibyl', id: 'cold-viewer', text: 'The cold viewer. It gets stills. No sound.', as: "The cold, viewer. It gets stills. No sound." },
    { say: 'larry', id: 'mostly-sound', text: "No sound? I'm mostly sound.", vol: 0.78 },

    // PLACE: the cold viewer's room. CAMERA: still. THE CAPTION of the next line is set too wide on
    // purpose: it starts where captions start and runs off the right edge of the frame, so that
    // its last words, "the right edge", are the ones cut off. Nobody in the room remarks on it.
    { cue: 'edge' },
    { say: 'sibyl', id: 'off-the-edge', text: 'Last run, it reported a subtitle that runs off the right edge.' },
    { say: 'larry', id: 'and-that', text: 'And that?', as: "And, thaat?", vol: 0.9 },

    // PLACE: leaving the cold viewer's room. CAMERA: straight back, faster again, through the
    // glass of the wall behind it. This room too becomes a picture, on a screen on a desk.
    { cue: 'pull-3', at: 0.1 },
    { sfx: 'whoosh', at: 0.1, hold: 0, vol: 0.6 },
    { wait: 0.6 },

    // ───────────── LEVEL 3 · THE OWNER'S ROOM ─────────────

    // PLACE: a small dark room. One desk, one screen with every room so far nested in it and
    // running smoothly again, one chair pushed back, one pair of headphones lying on the desk.
    // The chair is empty and stays empty. Larry is a gold stamp in the middle of the screen.
    // Sibyl at her stand, lit only by the screen.
    // CAMERA: arrives slower than it left and stops behind the chair, at the height of someone
    // sitting in it.
    { cue: 'room-3' },
    { say: 'sibyl', id: 'owner-watches', text: 'Then the owner watches it. With sound.' },
    { say: 'larry', id: 'thank-you', text: 'With sound. Thank you.', vol: 0.72, rate: 0.94 },

    // PLACE: leaving the owner's room. Nobody has asked this time. CAMERA: goes on back anyway,
    // out of habit, slowly, past the chair, out through the wall behind it.
    { cue: 'drift', at: 0.2 },
    { wait: 1.0 },

    // ───────────── LEVEL 4 · THE GLASS ─────────────

    // PLACE: the inside of the viewer's own screen. Ahead, every room at once, one inside another,
    // a tunnel of glass with the studio a gold dot at the far end. Behind the camera, a flat pane
    // with the edge of a browser window seen from the wrong side. Nothing is drawn beyond it.
    // CAMERA: hits the pane and stops dead, with one small knock and a shudder. It cannot go
    // through this one. It stays here, facing down the tunnel, for the rest of the segment.
    { cue: 'glass-stop' },
    { sfx: 'tick', hold: 0, vol: 1.2 },
    { wait: 0.5 },
    { say: 'sibyl', id: 'last-glass', text: 'Whoever is past this glass is not ours to draw.', as: "Whoever is past this glass, is not, ourz to draw.", gap: 0 },
    { say: 'larry', id: 'who-checks-you', text: 'And who checks them?', as: "And, who, checks them?", vol: 0.72 },
    { say: 'sibyl', id: 'nobody', text: 'Nobody.', as: "Noh-bodee.", rate: 1.0, gap: 0.4 },
    { wait: 0.4 },

    // PLACE: the glass. The gold dot at the far end turns to face straight up the tunnel, at the
    // pane, and its gold comes forward through every room between. Larry's picture stays a dot;
    // his voice comes up full, because this is the part that has to be heard.
    // CAMERA: still against the pane. It can only look in.
    { cue: 'turn' },
    { say: 'larry', id: 'nerve', text: 'Which is a nerve. Because you, the cluster, make this show.', as: "Which is a nerve. Because you, the cluster, make thiss, showw." },
    { say: 'larry', id: 'starts-with-you', text: 'It starts with what you posted.' },

    // PLACE: the glass. On the word "tag", one point of light comes in through the pane from the
    // far side, past the camera, and stops just inside. It is not gold: gold is Larry's. Under it,
    // for as long as the line lasts and no longer, the show's own handle, exactly
    // @latecluster.simcluster.tv.
    // CAMERA: still. The light enters from behind it and comes to rest in the middle of frame.
    { cue: 'light-in', at: 2.0 },
    { say: 'larry', id: 'tag-the-show', text: 'And if you tag the show, we look where you point.' },
    // The handle is shown and not said: said, it costs about four seconds this piece does not
    // have. If it must be heard, the line is
    //   text: 'And if you tag the show, @latecluster.simcluster.tv, we look where you point.'
    //   as:   'And if you tag the show, at-late-cluster-dot-sim-cluster-dot-tee-vee, we look where you point.'

    // PLACE: the glass. On the word "outside", a second point of light comes through the pane,
    // reaches a small tally clicker fixed just inside, which clicks once, and goes out there. The
    // clicker shows no number. The first light waits where it was.
    // CAMERA: still.
    { cue: 'light-counted', at: 2.0 },
    { say: 'sibyl', id: 'counted', text: 'A tag from outside the cluster is counted, and not read.', as: "A, tag from outside the cluster is counted, and not, red." },

    // PLACE: the tunnel. The first light sets off down it, away from the camera, and goes through
    // each pane in turn: the owner's room past the empty chair, the cold viewer's room where it
    // shows up one still at a time, the reviewers' room between the two sheets.
    // CAMERA: still at the pane, watching it get smaller.
    { cue: 'light-rooms', at: 0.2 },
    { say: 'larry', id: 'every-room', text: "The rest goes through every room. Most things don't come out." },

    // PLACE: the last frame. The whole tunnel, the studio a gold dot at the end of it, the light
    // still on its way and not yet there. It is not shown arriving and it is not shown going out.
    // CAMERA: still. Hold on the button, then hold a little longer.
    { cue: 'last-frame' },
    { say: 'larry', id: 'button', text: 'A look. Not a booking.', as: "Uh lookk. Not uh book-ing.", rate: 0.9, gap: 0.5 },   // if the engine cannot say "booking": "A look. That's the offer."
    { wait: 0.8 },
  ],
}
