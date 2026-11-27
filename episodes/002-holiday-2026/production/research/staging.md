# Staging read: what the studio can show for the holiday special

A builder's read of `packages/show` as it stands, for the three writers. It describes; it does
not choose scenes. "Not sure" means nobody has tried it yet, and the note says what would have
to be tried.

## 1. What the kit already does

- **Everything is a glowing line on black.** Beams add light, so anything solid must be filled
  black behind its lines. Capitals read best. Plain cuts and fades to black are easy. A
  cross-dissolve from one scene to another is not, because lines ignore the usual fade.
- **The set** is one studio, drawn as separate pieces: wall, lighting truss, floor, a big window
  onto a glowing city skyline (the simcluster towers), the curtain, the ON AIR light, the
  APPLAUSE/LAUGH sign, the bandstand, the couch, the guest chair and Larry's desk with its mug.
  Any piece can be switched off for a whole segment or for one moment. A dimmer (`dim`) darkens
  everything behind the puppets, all the way to black. The ON AIR light can be turned off; dark,
  it still shows faintly. So **"the studio switched off" is already possible**: pieces off, the
  dimmer high, ON AIR dark, the skyline in the window as the only light, if you want it.
- **The camera** sits over a 2000-wide floor plan. It can cut (the default), push in or out
  smoothly between two framings, sit anywhere at any zoom set frame by frame (so it can track
  sideways), and drift slightly at rest. There are named framings for the studio (desk,
  monologue, wide, close-up, two-shots, monitors), and a segment can add its own.
- **Puppets** are 3D heads that show the voice working (tongue, jaw, lips, airflow), each with a
  flat 2D costume body hanging from the neck. **A body is a torso with sleeve lines, plus, if
  the puppet is standing, a fixed pair of trousers and shoes down to the floor.** There are no
  separate arms or hands, the legs have no joints, and nothing can walk. A puppet can be put
  anywhere at any size (smaller reads as further away), cut off at the waist as if seated or
  behind furniture, drawn only inside a rectangle (as if seen through a window), hidden, shaken,
  grown or shrunk. Heads turn smoothly from profile to facing us to the other profile, and nod
  and tilt. When the head turns the body narrows a little, but it does not turn. Heads bob on
  the beat while music plays (this can be stopped). The heads breathe and sway when idle.
- **Costumes** are defined by a kind and its colours: tux (Larry's), band jacket, announcer,
  suit, presenter blazer, hoodie, cardigan, lab coat, turtleneck, T-shirt, a long dark coat
  with a feather ruff, and a boxy robot body. Any costume can carry a clipboard, a clicker, a
  party popper or a headset. A segment can change any puppet's costume.
- **How many puppets at once:** a shot can hold all seven of the house cast. But the frame
  budget is four heads at full smoothness on a laptop. Above that, the page lowers its
  sharpness and glow by itself.
- **Props** (all line drawings): confetti, a crow, a chicken, a crown, a seal, an alligator, an
  elephant, a key cap, a book that opens, a rubber stamp, speech bubbles, a winners' podium, a
  limbo bar, a split-flap board, a news ticker, weather glyphs (sun, cloud, rain, storm, snow
  falling from a small cloud), a TV monitor frame, rolling credits, a lectern, charts, post
  cards, a node-and-edge cluster graph. The skyline can be drawn anywhere, without the window.
- **Lighting** is brightness: the dimmer, a glow kept for one thing at a time, a spotlight
  ellipse on the studio floor. There are no light sources and no shadows. A lit thing is drawn
  brighter.
- **Sound.** Every sound is made by synthesized voices. There are no recordings and no
  instruments. Besides the audience and the band stings, the library has `ding`, `buzzer`,
  `tick`, `ticktock`, `whoosh` (a breathy sweep left to right or right to left), `tada`,
  `drumroll`, `gasp`, `hey`, `murmur` (about 3 s of quiet, muffled crowd chatter with no
  words) and `silence-cough`, plus animal calls (songbird, seal, alligator, elephant, crow,
  chicken). Music is sung melody, beatbox (kick, hat, snare, claps, a hummed bass) and shouts,
  all from the cast's voices. Sound effects drop under speech by themselves.

## 2. What would be new, and roughly how big

| outline asks for | simplest honest way in this look | size |
|---|---|---|
| The studio at night, everything off | Existing switches: pieces off or dim, ON AIR dark, the sign unlit. New: one bare work lamp on a stand making a pool of light, and the exit door. | small |
| Larry out of costume | A new costume kind: a long overcoat, belted or not, collar up, in a muted colour. It has to be drawn new, because the drawing helpers inside `costumes.js` are not available to an episode. | medium |
| Putting on a scarf on camera | Larry has no hands. The scarf can be drawn on: it rises and wraps around the collar over a second or two, timed to a cue, while he looks down. Or cut to his collar as it settles. A hand doing it is not possible. | small, after the coat |
| Walking down a street, about three minutes | Frame Larry from the chest up, side-on or three-quarters, with a gentle walking bob, while the street slides past behind him. Several layers moving at different speeds give depth: a far skyline, building fronts, lamp posts and the kerb nearest. Seen in full, his legs would stand still, so a full-length walk needs a new leg cycle on the coat. Nobody has tried one, so treat it as large. | medium (chest up); large (full length) |
| The street going by | Building fronts are repeatable line drawings: lit and dark windows, doors, a fire escape, shop shutters. Made once from a seed, they stay the same every time you seek. | medium |
| A restaurant seen through its window | A lit window frame in the street. Inside are head-and-shoulder silhouettes at tables, which cost nothing, unlike real heads, and can bob as if laughing. Add warm colour, a hanging lamp or two, and `murmur` under it. | small to medium |
| A busker | One new invented puppet (a cast entry with a voice and a look) on the pavement, singing, humming or beatboxing. What you hear has to be a voice, so a drawn guitar or sax would sound wrong. Not sure how the credits list an invented character who is neither house cast nor guest: render one and check. | medium |
| Other street scenes the look carries well | A laundromat with drums turning. Steam from a grate. A crossing signal changing between WALK and DON'T WALK, in red and green. Snow falling past the lamps. Wet street reflections (a lamp drawn upside down, dimmer, under itself). A bus going by, then a `whoosh`. A row of lit apartment windows, one with a small figure in it. Neon signs that flicker. These are all lines, circles and brightness, which the look does best. Each is small. | small each |
| The viewer as the companion | Use the camera, not a body. Larry walks beside us, mostly side-on, and turns to camera when he speaks to us, or when he says the viewer's question back. The question is in his line and its caption only. Puppets turn already; this needs nothing new. | none |
| Arriving at the apartment | A door, a warm room with a lamp and a window. A long table drawn in front of the puppets, so it hides their bodies below the chest: a long tabletop with plates, glasses, candles and a big dish. Everyone is "seated" by being cut off at the table. | medium |
| The whole house cast round the table, off duty | Seven heads is over the budget of four. One establishing wide of everyone is fine, if it is short. The rest goes better as shots of two to four people. For off-duty clothes, the existing kinds (cardigan, turtleneck, hoodie, T-shirt, a suit with no tie) cost one line of setup each. Eppy's headset comes off by leaving it out. Nobody can be seen facing away: test whether a head can be turned past profile. | medium (table); small (clothes) |
| Street sound | There is no outdoor bed. What exists: `murmur` (muffled, repeatable), `whoosh` (a car or a gust), a lone `songbird`, footsteps made as soft beatbox ticks. A wind or traffic bed would be a new sound in the studio's sound library, which every episode shares: ask first. | small (from parts); medium (new sound) |
| A busker's music | A music block with the busker's voice. The block moves the script on to its own end, so to talk over it you step back (`wait` with a negative value). Not sure that music drops under speech the way sound effects do: render a test and listen. | small |
| A room full of friends | `murmur` layered, plus short lines from the cast talking over each other (`overlap`), with `caption: false` on background chatter. But see the laughter warning below. | small |

## 3. What to avoid asking for, and the nearest thing instead

- **Audience laughter outside the studio.** `laugh`, `biglaugh`, `chuckle`, `applause` and
  `cheer` turn on the studio's laugh sign (as a small box at the top in close shots) and put a
  LAUGHTER box in the caption band. A segment cannot turn this off. At the table, have the cast
  laugh as voiced lines ("ha!") with `caption: false`, or use `murmur`.
- **Hands doing things**: picking up the paycheck, opening a door, passing a dish, raising a
  glass. Instead, have it already in hand (a new prop held like the clipboard), have it happen
  just out of frame, or show the thing itself (the envelope on the desk, the door swinging).
- **Full-length walking, sitting down, standing up, hugging.** Instead: chest-up walking shots,
  cutting from standing to already seated, and heads turning to each other.
- **Anyone seen from behind.** Instead: side-on profiles, or drawn silhouettes.
- **Faces with expressions.** The heads show speech, not smiles. Feeling comes from turns, nods,
  tilts, timing and the words.
- **A continuous sound across segments.** Each segment is its own audio file. Segments cut
  straight into one another, and any sound bed stops at the cut. A long walk with one unbroken
  street sound has to be one segment.
- **Crowds of real heads.** Passers-by, diners and the busker's listeners should be silhouettes
  or small glyphs. Each real head counts against the budget.
- **Text to read.** Shop signs, menus and the paycheck are glance-sized (eight words or fewer).
  Use invented names that cannot belong to a real business or person.
- **The stock title and end cards.** Before the first segment the title card plays in the lit
  studio. After the last, the end card is a studio wide with the band bobbing and credits
  rolling. So the last thing seen after "goodnight" is the studio, not the apartment. Changing
  that is a studio change: raise it with the project manager rather than writing around it.
- **The show's own signatures** (the crow, the simcluster skyline as a gag, the key cap). They
  are available, but they belong to the show on the air.

## 4. A vocabulary for cues

A cue names a moment; its comment says what the picture does from then on. Write one at every
change of place, shot or thing seen, and at the word a picture should land on. Name the shot
(wide, two-shot, close-up, tracking), who is in it, which way heads face, and the one new thing.

```js
{ cue: 'dark-studio' },        // wide: studio dark, one work lamp, Larry small beside the desk, facing camera
{ cue: 'envelope' },           // close on the desk: a paycheck envelope; Larry's head turns down to it
{ cue: 'scarf-on' },           // medium on Larry: the scarf draws round his collar over two seconds
{ cue: 'out-the-door' },       // the door opens on the dark; cut to black for half a second
{ cue: 'street-start' },       // tracking, chest up: Larry side-on walking screen-right, the street sliding left
{ cue: 'turn-to-us' },         // Larry's head turns to camera on his line; the walk keeps going
{ cue: 'pass-restaurant' },    // a lit restaurant window slides in behind him; silhouettes at tables; murmur
{ cue: 'busker-in' },          // the busker enters from the right edge, singing; Larry glances over
{ cue: 'crossing-red' },       // wide: they stop at a crossing; DON'T WALK in red; the street stops moving
{ cue: 'snow-starts' },        // a few flakes past the lamps, then more
{ cue: 'apartment-door' },     // wide on a lit doorway; murmur and voices from inside
{ cue: 'table-wide' },         // establishing wide: the long table, all seven, heads turning to the door
{ cue: 'table-two' },          // two-shot across the table: Hy and Dee, facing each other
{ cue: 'goodnight' },          // Larry to camera, the table soft behind him; push in slowly
```
