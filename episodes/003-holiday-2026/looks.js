// The holiday special's own looks. Everybody is out of their show clothes.
//
// LOOKS is what the roster applies (through defineLook) for the whole episode: only the busker,
// the special's one invented figure. The house cast keep their studio looks in LOOKS on purpose,
// because the studio's stock cards and the tools see this file too, and the off-duty kinds are
// drawn by segments/walk/costumes.js, which only the walk loads. The walk dresses the house cast
// itself, frame by frame, from OFF_DUTY below (see production/stage/costumes.md).
//
// Pure data, no imports: render and check load this file outside the page.
//
// Each house character keeps their own hue (cast chapter, direction chapter "Keep to each house
// character's colour"), so they are known at a glance with nothing of the show on them: no
// silver jacket, no band jackets, no crest, no headset.

/** costume specs, by cast id; `kind` names a kind registered by segments/walk/costumes.js or the studio's own */
export const OFF_DUTY = {
  // Larry in the cold: a long rumpled overcoat, collar up, in a muted taupe, with a dark knit and
  // an open shirt collar under it. No tuxedo, no bow tie. The scarf is his gold.
  larryCoat: { kind: 'walkOvercoat', color: '#8c7f68', under: '#5d5446', shirt: '#d9ccb0', button: '#c9b48a', scarfColor: '#ffc861' },
  // Larry at his own table: the coat gone, a shawl-collar cardigan in oatmeal, the scarf still on.
  larryCardigan: { kind: 'walkShawlCardigan', color: '#b9a98a', shirt: '#dfe6ee', button: '#8a6a3e', scarfColor: '#ffc861' },

  // the crew at the table, in their own clothes and their own hues (only chests and shoulders show)
  sibyl: { kind: 'walkCollaredKnit', color: '#9fb7ff', trim: '#eef6f8' },
  hy: { kind: 'walkOpenShirt', color: '#ff73cf', under: '#3a1d33', button: '#ffd0ee' },
  al: { kind: 'walkJumper', color: '#58f0e8' },
  dee: { kind: 'cardigan', color: '#b6ff5c', shirt: '#eef6f8', trim: '#eef6f8' },
  pete: { kind: 'hoodie', color: '#ff9a5c', trim: '#ffe2cc', logo: false },
  eppy: { kind: 'walkQuarterZip', color: '#ff7a2e', zip: '#ffe2cc' },
}

export const LOOKS = {
  // The busker: invented, a one-off, not a likeness of anyone. A man in a short heavy coat with the
  // collar up and a brimmed hat. Muted violet, which is no house hue, and nothing of the band on him:
  // no magenta, no gold trim, no monogram, no instrument.
  busker: {
    color: '#a98bff',
    costume: { kind: 'walkBuskerCoat', color: '#8a7ab4', hat: '#7a6aa0', band: '#c9bcff', under: '#2e2840' },
  },
}
