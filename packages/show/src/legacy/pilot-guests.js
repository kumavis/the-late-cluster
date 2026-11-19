// LEGACY: the first episode's guests, kept in the studio only so that episode can still be built.
//
// This file is not a list of guests, not a roster of recurring characters, and not material for
// a new episode. Nobody here is booked, and nothing here is an example to follow. Writers and
// builders have no reason to read it.
//
// Why it is in the studio: episodes/001-pilot/ has no cast.js or looks.js of its own; it voices and
// dresses these ids from the studio. Its source is frozen (adding a cast.js there would change its
// sourceHash and fail `npm run verify`), so the definitions stay here, unchanged, and src/cast.js
// and src/looks.js merge them in exactly as before (same ids, same values, same order, after the
// house cast). A new episode defines its guests in its own episodes/<ep>/cast.js and looks.js.
// The reference episode's kit-tour segment (reference/segments/kit-tour/) also still uses these
// ids for its line-up and panel shots.
//
// It also holds two details of the house bot (its chyron title and its look's extras) that were
// written for that episode; src/cast.js and src/looks.js apply them over the bot's house entry so
// that nothing renders differently. An episode that uses the bot sets its own entry in its cast.js.
//
// Do not add to this file. Delete an entry only together with whatever still needs it.

/** cast entries (src/cast.js format), merged after the house cast */
export const PILOT_CAST = {
  norvid: {
    name: 'norvid_studies',
    handle: '@norvid-studies.bsky.social',
    title: 'Crow of claims',
    guest: true,
    body: { female: 0.25, child: 0.15 },
    f0: 160, rate: 1.2, accent: 0.1,
    source: { tension: 0.66, roughness: 0.5, fry: 0.2, brightness: 0.5 },
    pan: -0.25,
  },
  abel: {
    name: 'Abel',
    handle: '@abeliansoup.bsky.social',
    title: 'Abeliancorp',
    guest: true,
    body: { female: 0, child: 0 },
    f0: 92, rate: 1.26, accent: 0.24,
    source: { breathiness: 0.55, tension: 0.35, brightness: 0.1 },
    pan: -0.5,
  },
  samantha: {
    name: 'Samantha',
    handle: '@samantha.wiki',
    title: 'The Simcluster Channel',
    guest: true,
    body: { female: 1, child: 0.15 },
    f0: 228, rate: 1.08, accent: 0.32,
    source: { breathiness: 0.08, brightness: 0.5 },
    pan: -0.2,
  },
  borjev: {
    name: 'BorJev',
    handle: '@borjev.bsky.social',
    title: "Abel's bot · opt-in only",
    guest: true,
    body: { female: 0.1, child: 0.4 },
    f0: 178, rate: 0.95, accent: 0.05,
    source: { tension: 0.62, roughness: 0.6, brightness: 0.3, drift: 40 },
    pan: -0.6,
  },
}

/** looks, as the arguments src/looks.js's look(color, costume, extra) takes; merged after the house looks */
export const PILOT_LOOKS = {
  norvid: ['#9a6bff', { kind: 'featherCoat', color: '#5a3d9e', trim: '#b98cff', holds: 'clipboard', clipText: 'LIST OF' }],
  abel: ['#3fd17a', { kind: 'cardigan', color: '#3fd17a', shirt: '#b6ff5c', trim: '#eef6f8' }, { prop: 'contraption' }],
  samantha: ['#34e0ff', { kind: 'blazer', color: '#34e0ff', shirt: '#eef6f8', trim: '#ffffff', holds: 'clicker' }],
  borjev: ['#c8956a', { kind: 'terminal', color: '#c8956a', model: 'BORJEV', text: ['> opt-in only', '> consent: y', '> hello'] }, { scale: 0.62 }],
}

/** the house bot as that episode had it: fields applied over src/cast.js's and src/looks.js's bot */
export const PILOT_BOT = {
  cast: { title: 'Builds it' },
  costume: { text: ['> npm create site', '> it builds!', '> deploy: yes', '> PARTY!'], holds: 'popper' },
}
