// How each character looks on stage, keyed by cast id (src/cast.js holds who they are and how they
// sound; this file holds only visuals). Any id not listed gets lookFor()'s default: a signature
// hue picked from GUEST_HUES by the id's hash and a hoodie.
//
// A look:
//   color     the character's signature colour (caption name, chyron, costume trim)
//   head      overrides for the 3D head's palette (see engine/palette.js headPalette); by default the
//             head's structure is drawn in `color`, the articulators in chimera's slot colours
//   costume   { kind, color, trim, … } — kinds: tux, band, announcer, suit, hoodie, cardigan,
//             labcoat, turtleneck, tee, terminal (an AI agent's boxy bot body). See stage/costumes.js.
//   scale     head size multiplier (1 = adult)
//   handle    shown on chyrons (cast.js's `handle` wins). Only a real account's handle, or an invented one
//             under .example (bible R8). The house characters are not accounts and have none: their
//             chyrons show name and title.
//   fx        a default puppet effect: 'hologram' | 'monitor' (see show.puppet(id).fx)
//   prop      a prop that stands beside them: 'contraption', a machine under a dust sheet (see
//             stage/set.js drawProp; animate it with show.puppet(id).prop({ unveil, run }))
//
// Segment authors: a guest's look goes in the episode's own looks.js (or pass a look to
// show.puppet(id).dress({...}) at runtime); this file holds the house cast's.
//
// An episode's own looks.js, and for the first episode only its legacy looks (legacy/), are applied
// over this by src/roster.js.
import { headPalette } from './engine/palette.js'
import { hashSeed } from './kit/ease.js'

/** a look from (color, costume, extra): how src/roster.js builds legacy looks too */
export const look = (color, costume, extra = {}) => ({ color, head: headPalette(extra.headColor ?? color, extra.headOver), costume, scale: 1, ...extra })

export const LOOKS = {
  larry: look('#ffc861', { kind: 'tux', color: '#ffd27a', shirt: '#fff3d6', tie: '#ffb340', square: '#ff73cf' }, {
    headOver: { blueMid: '#e4ab50', blueDim: '#a3762f', frame: '#4a3514' },
  }),
  sibyl: look('#c9d8ff', { kind: 'announcer', color: '#9fb7ff', trim: '#eef6f8' }),
  // Hy Oid & The Formants: matching bandstand jackets in magenta with gold trim, each head its own hue
  hy: look('#ff73cf', { kind: 'band', color: '#ff5fd2', trim: '#ffc861', monogram: 'F' }),
  al: look('#58f0e8', { kind: 'band', color: '#ff5fd2', trim: '#ffc861', monogram: 'F' }),
  dee: look('#b6ff5c', { kind: 'band', color: '#ff5fd2', trim: '#ffc861', monogram: 'F' }),
  pete: look('#ff9a5c', { kind: 'band', color: '#ff5fd2', trim: '#ffc861', monogram: 'F' }),

  // ---- the correspondent
  eppy: look('#ff7a2e', { kind: 'blazer', color: '#ff7a2e', trim: '#ffc861', crest: true, holds: 'headset' }),
}

/** signature hues handed to guests nobody has styled yet */
export const GUEST_HUES = ['#58f0e8', '#a98bff', '#b6ff5c', '#ff7a5c', '#ff5fd2', '#7cc4ff', '#5be381', '#f08cff']

/** costume kinds a guest can wear (see stage/costumes.js for the parameters each takes) */
export const COSTUME_KINDS = ['tux', 'band', 'announcer', 'suit', 'blazer', 'hoodie', 'cardigan', 'labcoat', 'turtleneck', 'tee', 'featherCoat', 'terminal']

/** the look for any cast id (unknown ids get a deterministic default) */
export function lookFor(id) {
  if (LOOKS[id]) return LOOKS[id]
  const h = hashSeed(id)
  const color = GUEST_HUES[h % GUEST_HUES.length]
  const l = look(color, { kind: 'hoodie', color })
  LOOKS[id] = l
  return l
}

/** register or replace a look at runtime (segments may call this from setup) */
export function defineLook(id, spec) {
  const color = spec.color ?? lookFor(id).color
  LOOKS[id] = { ...look(color, { kind: 'hoodie', color }, { headColor: spec.headColor, headOver: spec.headOver }), ...spec, head: spec.head ?? headPalette(spec.headColor ?? color, spec.headOver) }
  return LOOKS[id]
}
