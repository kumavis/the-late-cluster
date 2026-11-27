// The holiday special's own cast entries, merged over the studio's house cast.
//
// The busker is an invented one-off for the walk: a man under a lamp singing to an empty
// pavement. He is not a real account, so he has no handle and no `guest` flag, and he is not
// house cast. He only sings (two uncaptioned `sing` beats in segments/walk); his voice was placed
// by `npm run voices -- 003-holiday-2026` to be distinct from the house and from Al, who speaks
// at the table soon after.
export const CAST = {
  busker: {
    name: 'The busker',
    title: 'On the corner',
    body: { female: 0.25, child: 0.1 },
    f0: 140, rate: 0.95, accent: 0.18,
    source: { tension: 0.62, brightness: 0.5 },
    pan: 0.5,
  },
}
