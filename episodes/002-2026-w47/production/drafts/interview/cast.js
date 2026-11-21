// The guest the interview draft needs: a puppet playing the posting persona of a real account.
// It says only that account's own posts, verbatim (bible 09, R3). `guest: true` puts
// PUPPET · PARODY on the chyron (R9). To be merged into episodes/002-2026-w47/cast.js if the
// draft is selected.
//
// Voice: an open spot between Dee and Eppy, measured in a scratch copy of the studio with the
// method of `analyze.ts voices`: median f0 178 Hz; nearest house voices dee 1.54, eppy 1.79,
// sibyl 1.90 (all at or above the 1.5 floor); Whisper 18 of 21 words on the two test sentences.
// Chosen after rendering the candidate answers in five variants: this one carried the long
// timezone answer best. It has not been measured against the other drafts' guests.
// The title is why they are on: true, and kind. No likeness is intended (bible 02, guests).
export const CAST = {
  cee: {
    name: 'cee',
    handle: '@cee.wtf',
    title: 'Built a wheelie game by request',
    guest: true,
    body: { female: 0.5, child: 0 },
    f0: 164, rate: 1.04, accent: 0.26,
    source: { breathiness: 0.08, tension: 0.5, brightness: 0.3 },
    pan: -0.4,
  },
}
