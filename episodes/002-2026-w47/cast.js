// Guests of episode 002-2026-w47, merged over the house cast (packages/show/src/cast.js).
// Each is a puppet playing the public posting persona of a real account (guest: true puts
// PUPPET · PARODY on the chyron) and says only that account's own posts, verbatim, as tagged in
// the segment scripts and recorded in production/sources.json.
//
// Voices. Six guests and seven house voices were measured together with
// `bun packages/show/tools/analyze.ts voices --ep 002-2026-w47` and placed so that every voice's
// nearest neighbour is 1.5 or more away (the tool's distance: pitch and long-term spectrum).
// Median f0 and nearest neighbour as measured:
//   dave         88 Hz   al 1.55, larry 1.77        (the open spot under the host)
//   david       173 Hz   dee 1.62, eppy 1.66        (the open spot between the alto and the sports desk)
//   minormobius 222 Hz   sibyl 2.10, eppy 2.17      (bright)
//   mokkenstorm 237 Hz   verooo 1.89, sibyl 1.90    (soft)
//   amber       (measured at 270 Hz before it took the news segment's voice: f0 250, not re-measured)
//   verooo      276 Hz   mokkenstorm 1.89           (dark and breathy)
// Four of the six sit above the announcer because that is where the room is: one voice fits under
// Larry and one between Dee and Eppy, and nothing else in the house's range clears 1.5. The four
// are kept apart from one another by timbre as much as by pitch (bright, soft, bright, dark), and
// the two who share a scene (mokkenstorm and minormobius, 2.66 apart) differ in both.
// A body, a pitch and a timbre are slots in that space. None is a likeness of anyone or a guess
// about a person. One caution from the coffee draft is kept: Amber's puppet is addressed inside a
// real post that is read aloud, so it does not have the lowest voice.
// If a voice here moves, every real line it speaks must be rendered and its heard text read again:
// the respellings in the scripts were chosen for these voices.
export const CAST = {
  verooo: {
    name: 'ver.ooo 🗿',
    handle: '@ver.ooo',
    title: 'In line for the pen',
    guest: true,
    body: { female: 0, child: 0 },
    f0: 96, rate: 0.96, accent: 0.2,
    source: { breathiness: 0.4, tension: 0.4, brightness: 0.05 },
    pan: -0.25,
  },
  dave: {
    name: 'Dave',
    handle: '@dave.9000ish.uk',
    title: 'Made the coffee simulator',
    guest: true,
    body: { female: 0.1, child: 0 },
    f0: 86, rate: 0.94, accent: 0.16,
    source: { tension: 0.6, brightness: 0.45 },
    pan: -0.4,
  },
  amber: {
    name: 'Amber 🌸',
    handle: '@shimmermathlabs.com',
    title: 'Owner, one pink mug',
    guest: true,
    body: { female: 1, child: 0 },
    f0: 250,
    source: { breathiness: 0.25, tension: 0.35, brightness: 0 },
  },
  mokkenstorm: {
    name: '👩‍💻 tbd : Option<name>',
    handle: '@mokkenstorm.dev',
    title: 'Made ringmate',
    guest: true,
    body: { female: 0.8, child: 0.25 },
    f0: 262, rate: 0.96, accent: 0.2,
    source: { tension: 0.5 },
    pan: -0.55,
  },
  minormobius: {
    name: 'Minor Mobius',
    handle: '@minormobius.bsky.social',
    title: 'Asked for a link',
    guest: true,
    body: { female: 0.5, child: 0 },
    f0: 215, rate: 0.96, accent: 0.2,
    source: { tension: 0.62, brightness: 0.5 },
    pan: -0.35,
  },
  david: {
    name: 'David',
    handle: '@yonderdavid.bsky.social',
    title: 'Supplied the missing cat',
    guest: true,
    body: { female: 0, child: 0 },
    f0: 172, rate: 0.94, accent: 0.12,
    source: { tension: 0.55, brightness: 0.4 },
    pan: -0.25,
  },
  // riemann-breaking-news. Carried from episodes/002-commissions-w47/cast.js, voices exactly as
  // that commission placed them; not measured against this episode's guests above. Amber
  // (@shimmermathlabs.com) speaks there too, as `amber` above.
  davidcrespo: {
    name: 'conputer dipshit',
    handle: '@davidcrespo.bsky.social',
    title: 'Posted the chart',
    body: { female: 0.25, child: 0.1 },
    f0: 140,
    source: { tension: 0.62, brightness: 0.5 },
    guest: true,
  },
  moultano: {
    name: 'Ryan Moulton',
    handle: '@moultano.bsky.social',
    title: 'Quoted the chart',
    body: { female: 1, child: 0 },
    f0: 270,
    source: { tension: 0.62, brightness: 0.5 },
    guest: true,
  },
  // music-alt ("Best We Can Doo-Wop"): Hy's singing voice for this song only, chosen by the owner
  // by ear (take C, 21 November 2026). It is Al's voice without his fry (the same body, tension and
  // pitch), so the lead sits an octave under Hy's own and sings at its written pitch. Hy speaks in
  // his own voice (`hy`). The studio has no per-line voice, so this is a cast id of its own: its
  // telemetry drives the puppet `hy-bass`, which carries Hy's name and is staged as Hy.
  'hy-bass': {
    plays: 'hy',
    name: 'Hy Oid',
    title: 'Bandleader, The Formants',
    body: { female: 0, child: 0 },
    f0: 84, rate: 0.95, accent: 0.14,
    source: { tension: 0.45 },
    pan: -0.5,
  },
}
