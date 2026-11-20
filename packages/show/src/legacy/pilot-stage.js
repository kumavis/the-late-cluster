// LEGACY: the first episode's words in the studio's drawing code, kept only so that episode still
// draws exactly as it was built. Merged into src/stage/text.js's STAGE_TEXT by src/roster.js for
// 001-pilot and for no other episode. Not an example to follow: a new episode sets its own text on
// its segment modules (`built: { label }`, `keyLabel`). Do not add to this file.
export const PILOT_STAGE = {
  counterLabel: 'BUILT DURING THIS EPISODE',
  keyLabel: 'E',
}
