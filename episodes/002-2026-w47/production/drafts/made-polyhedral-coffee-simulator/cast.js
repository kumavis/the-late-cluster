// Guests for the draft "made-polyhedral-coffee-simulator". Three puppets playing the posting
// personas of real accounts (guest: true puts PUPPET · PARODY on the chyron). Each says only its
// own posts, verbatim, in the thread they came from (bible 09, R3 and R4). Titles are true and plain.
//
// Voices are empty spots in (body, f0) space, not likenesses, and say nothing about the people.
// Measured against the house cast with the voices tool: dave median 88 Hz (nearest al 1.55,
// larry 1.77), amber 178 Hz (nearest eppy 1.50, dee 1.72), oszillate 231 Hz (nearest sibyl 1.78).
// Another segment's guests may want the same spots: measure them together at assembly and move
// these freely. If oszillate's voice moves, re-test its two lines; they hold the hardest words
// in the segment, and their respellings were chosen for this voice.
export const CAST = {
  // made the coffee simulator; sits beside Larry, so panned away from him
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
  // posted the pink mug
  amber: {
    name: 'Amber 🌸',
    handle: '@shimmermathlabs.com',
    title: 'Owner, one pink mug',
    guest: true,
    body: { female: 0.4, child: 0 },
    f0: 166, rate: 0.95, accent: 0.24,
    source: { tension: 0.55, brightness: 0.35 },
    pan: -0.5,
  },
  // looked at the back of it. A 75-follower account: this is its one moment in the episode, as its hero
  oszillate: {
    name: '*Pistäwəńćə',
    handle: '@oszillate.bsky.social',
    title: 'Looked at the back of the mug',
    guest: true,
    body: { female: 0.9, child: 0 },
    f0: 222, rate: 0.92, accent: 0.22,
    source: { tension: 0.55, brightness: 0.3 },
    pan: -0.1,
  },
}
