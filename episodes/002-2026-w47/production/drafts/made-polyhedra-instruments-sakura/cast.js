// The guest this draft needs: a puppet playing the posting persona of a real account.
// For the episode's cast.js at assembly. If another selected draft also casts this account,
// keep one entry: one account, one puppet, one voice.
//
// Voice: an open spot, far from Larry, whom this puppet shares the frame with. Measured as
// `analyze.ts voices` measures (median f0 229 Hz; nearest house voices sibyl 1.73, eppy 2.56;
// larry is more than an octave below). A middle body, chosen for the gap and for nothing else:
// the head is not a likeness and the voice is not an impression.
// The three real lines were rendered in this voice and what was heard was read (notes.json, "heard").
// The title is on the chyron from this puppet's first line, before the wordless stretch, so it
// must not mention the river.
export const CAST = {
  david: {
    name: 'David',
    handle: '@yonderdavid.bsky.social',
    title: 'Made the polyhedra video',
    guest: true,
    body: { female: 0.45, child: 0 },
    f0: 222, rate: 0.96, accent: 0.2,
    source: { breathiness: 0.12, tension: 0.5, brightness: 0.28 },
    pan: -0.3,
  },
}
