// The guest this draft needs: a puppet playing the posting persona of a real account (bible R9:
// guest: true puts PUPPET · PARODY on the chyron). Name and handle are the account's own.
// Voice: an empty spot between Dee and Eppy, measured with the method of analyze.ts voices
// (median f0 173 Hz; nearest house voices dee 1.62, eppy 1.66, sibyl 2.00). Slow and flat on
// purpose: the answers are exact and dry. Re-measure against the episode's other guests.
export const CAST = {
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
}
