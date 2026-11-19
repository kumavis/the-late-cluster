// The cast of THE LATE CLUSTER. Every voice is a CHIMERA body: `body` blends the engine's
// male / female / child anatomy (which also shapes the 3D head), `f0` is the speaking pitch (Hz),
// `rate` the speaking-rate multiplier, `accent` the pitch excursion on stressed syllables, and
// `source` a patch on the engine's voice source (breathiness, tension, fry, roughness,
// vibratoDepth, vibratoRate, drift, brightness, pressure). `pan` (-1..1) places the voice in the mix.
//
// A guest is a puppet playing the posting persona of a real Bluesky account: `name` and `handle`
// are the account's (the credits and chyrons show them), and `guest: true` puts PUPPET · PARODY
// on the chyron. A real account's puppet says only what that account published, the way they said
// it, in its original context; never words the show wrote for them (bible: constitution Article 3,
// R3). A guest is defined by the episode that books them, in episodes/<ep>/cast.js; one moves
// here only when a second episode needs them. This file holds the house cast.
//
// Read by the offline renderer (tools/render.ts) and by the page. Looks live in src/looks.js.
//
// legacy/pilot-guests.js is merged in at the end so the first episode still builds. It is not a
// guest list; see its header.
import { PILOT_CAST, PILOT_BOT } from './legacy/pilot-guests.js'

export const CAST = {
  // ---- the house
  larry: {
    name: 'Larry Nx',
    title: 'Your host',
    body: { female: 0, child: 0 },
    f0: 104, rate: 1.0, accent: 0.16,
    source: { breathiness: 0.12, tension: 0.5 },
    pan: 0.12,
  },
  sibyl: {
    name: 'Sibyl Ant',
    title: 'Announcer',
    body: { female: 1, child: 0 },
    f0: 196, rate: 1.04, accent: 0.2,
    source: { breathiness: 0.2 },
    pan: -0.3,
  },

  // ---- the house band: Hy Oid & The Formants
  hy: {
    name: 'Hy Oid',
    title: 'Bandleader, The Formants',
    body: { female: 0.35, child: 0 },
    f0: 135, rate: 0.95, accent: 0.2,
    source: { breathiness: 0.3, tension: 0.42, brightness: 0.12 },
    pan: -0.5,
  },
  al: {
    name: 'Al Veolar',
    title: 'Bass, The Formants',
    body: { female: 0, child: 0 },
    f0: 84, rate: 0.95, accent: 0.14,
    source: { tension: 0.45, fry: 0.2 },
    pan: -0.7,
  },
  dee: {
    name: 'Dee Phthong',
    title: 'Alto, The Formants',
    body: { female: 0.9, child: 0.1 },
    f0: 155, rate: 1.0, accent: 0.18,
    source: { breathiness: 0.18, tension: 0.45, brightness: 0.25 },
    pan: -0.4,
  },
  pete: {
    name: 'Plosive Pete',
    title: 'Percussion, The Formants',
    body: { female: 0.65, child: 0.4 },
    f0: 115, rate: 1.05, accent: 0.18,
    source: { tension: 0.55, brightness: 0.4 },
    pan: -0.6,
  },

  // ---- correspondents and studio voices (original characters)
  eppy: {
    name: 'Eppy Glottis',
    title: 'Sports desk',
    body: { female: 0.15, child: 0.2 },
    f0: 165, rate: 1.16, accent: 0.36,
    source: { tension: 0.68, brightness: 0.55 },
    pan: 0.25,
  },
  bot: {
    name: 'A website bot',
    title: 'House bot',
    body: { female: 0.5, child: 0.4 },
    f0: 275, rate: 1.0, accent: 0.06,
    source: { tension: 0.7, brightness: 0.6, breathiness: 0.02 },
    pan: 0.45,
    // the first episode's chyron title, kept so nothing renders differently (legacy/pilot-guests.js)
    ...PILOT_BOT.cast,
  },

  // ---- legacy: the first episode's guests, last, as before (not a guest list)
  ...PILOT_CAST,
}
