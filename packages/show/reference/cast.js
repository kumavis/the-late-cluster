// The reference episode's own cast entries, merged over the studio's house cast like any
// episode's cast.js. Test Unit and Guest A to Guest D are invented test figures for the kit tour:
// plainly fictional names, handles under .example or none (bible R8), and titles that say which
// costume or prop each one demonstrates. They are not characters, not a guest list and not material.
export const CAST = {
  // an invented character with no account and no handle: it stands beside the desk in the
  // deskWith shot and wears the terminal costume at its usual size
  unit: {
    name: 'Test Unit',
    title: 'Terminal · stand',
    body: { female: 0.5, child: 0.3 },
    f0: 200, rate: 1.0, accent: 0.1,
    source: { tension: 0.6, brightness: 0.4 },
    pan: 0.45,
  },

  'guest-a': {
    name: 'Guest A',
    handle: '@guest-a.example',
    title: 'Feather coat · clipboard',
    guest: true,
    body: { female: 0.6, child: 0 },
    f0: 180, rate: 1.0, accent: 0.2,
    source: { breathiness: 0.15 },
    pan: -0.3,
  },
  'guest-b': {
    name: 'Guest B',
    handle: '@guest-b.example',
    title: 'Cardigan · contraption',
    guest: true,
    body: { female: 0, child: 0 },
    f0: 120, rate: 1.0, accent: 0.2,
    source: { tension: 0.45 },
    pan: -0.5,
  },
  'guest-c': {
    name: 'Guest C',
    handle: '@guest-c.example',
    title: 'Blazer · clicker',
    guest: true,
    body: { female: 1, child: 0 },
    f0: 210, rate: 1.0, accent: 0.24,
    source: { brightness: 0.3 },
    pan: -0.2,
  },
  'guest-d': {
    name: 'Guest D',
    handle: '@guest-d.example',
    title: 'Terminal · small scale',
    guest: true,
    body: { female: 0.3, child: 0.3 },
    f0: 170, rate: 1.0, accent: 0.1,
    source: { tension: 0.6, brightness: 0.3 },
    pan: -0.6,
  },
}
