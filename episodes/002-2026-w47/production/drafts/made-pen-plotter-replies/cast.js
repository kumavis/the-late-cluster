// The one guest in the pen plotter segment (drafts/made-pen-plotter-replies). A puppet playing the
// posting persona of a real account: it says one line, that account's own reply, as the reply it was.
// The voice sits in the open range above the house voices (median about 242 Hz; nearest house voice
// sibyl at 2.05); it was chosen for distance from the house cast and is not a likeness of anyone.
export const CAST = {
  verooo: {
    name: 'ver.ooo 🗿',
    handle: '@ver.ooo',
    title: 'In line for the pen',
    guest: true,
    body: { female: 0.7, child: 0 },
    f0: 228, rate: 0.98, accent: 0.22,
    source: { breathiness: 0.15, tension: 0.5 },
    pan: -0.25,
  },
}
