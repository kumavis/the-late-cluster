// Guests for the draft made-mobius-chess-ringmate: two real accounts, each a puppet playing the
// account's public posting persona (guest: true puts PUPPET · PARODY on the chyron). Each says
// only its own posts, verbatim, as tagged in script.js and recorded in sources.json.
//
// Voices: measured with the studio's voices tool against the house cast. `mokkenstorm` has a
// median f0 of 176 Hz (nearest: dee 1.52, eppy 1.74, sibyl 1.92); `minormobius` 239 Hz (nearest:
// sibyl 2.10, eppy 2.96); 3.5 from each other. Neither voice, body or pitch is a likeness or a
// guess about the person: they are the two open spots in the house's range, chosen by which
// voice the real lines were heard best in.
//
// The maker's display name is given exactly as the account shows it. If the vector font cannot
// draw the emoji or the angle brackets, the builder shows the handle and says so; do not swap in
// a different name.
export const CAST = {
  mokkenstorm: {
    name: '👩‍💻 tbd : Option<name>',
    handle: '@mokkenstorm.dev',
    title: 'Made ringmate',
    guest: true,
    body: { female: 0.45, child: 0.2 },
    f0: 164, rate: 0.98, accent: 0.24,
    source: { breathiness: 0.1, tension: 0.55, brightness: 0.35 },
    pan: -0.55,
  },
  minormobius: {
    name: 'Minor Mobius',
    handle: '@minormobius.bsky.social',
    title: 'Asked for a link',
    guest: true,
    body: { female: 0.85, child: 0.1 },
    f0: 228, rate: 1.0, accent: 0.26,
    source: { breathiness: 0.12, tension: 0.5, brightness: 0.3 },
    pan: -0.35,
  },
}
