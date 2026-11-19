// __SEGMENT__: the direction (shots, puppets, graphics). The module shape and the `show` API are
// documented in packages/show/README.md; the reference episode (npm run dev -- ref) shows them all.
// Preview: npm run dev -- __EPISODE__, then /?seg=__SEGMENT__   ·   frames: npm run shoot -- __EPISODE__ __SEGMENT__ 1 3
// Studio code is imported as '@late-cluster/show/<path under packages/show/src>'.

export default {
  defaultShot: 'desk',
  shots: [
    { at: 0, shot: 'desk' },
    { at: 'reply', shot: 'deskWith', with: 'sibyl' },
  ],

  direct(t, show) {
    show.chyron('larry', { from: 0.4, dur: 3 })
  },
}
