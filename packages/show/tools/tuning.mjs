// Sung notes at their written pitch.
//
// The engine's `fry` (source patch) pulls the sounding pitch toward a creak floor: with fry f, a
// commanded f0 F sounds at (1 − f)·F + f·FRY_FLOOR. Measured on the engine for every body, MIDI
// 40–64 and fry 0.05–0.4, the floor is 48 Hz to within half a hertz. So Al (fry 0.2) sang a written
// MIDI 45 at 97.6 Hz instead of 110, about two semitones flat. Speech keeps the pull (the house
// voices were tuned by their measured pitch), but a sung note is what is written: clips.ts commands
// each note of a voice with fry at the pitch that sounds as written.
//
// Pure, Node builtins only: `node --test` loads it.

/** the creak floor the engine's fry pulls toward (Hz) */
export const FRY_FLOOR = 48

const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12)

/** what a commanded MIDI note sounds at with this much fry (Hz) */
export const frySounds = (midi, fry = 0) => (1 - fry) * hz(midi) + fry * FRY_FLOOR

/** the (fractional) MIDI note to command so that `midi` sounds at its pitch with this much fry */
export function frySung(midi, fry = 0) {
  if (!(fry > 0) || fry >= 1) return midi
  const cmd = (hz(midi) - fry * FRY_FLOOR) / (1 - fry)
  return cmd > 0 ? 69 + 12 * Math.log2(cmd / 440) : midi
}
