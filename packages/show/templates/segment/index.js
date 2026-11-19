// __SEGMENT__: the direction (shots, puppets, graphics). The module shape and the `show` API are
// documented in packages/show/README.md; the reference episode (npm run dev -- ref) shows them all.
// Preview: npm run dev -- __EPISODE__, then /?seg=__SEGMENT__   ·   frames: npm run shoot -- __EPISODE__ __SEGMENT__ 1 3
// Studio code is imported as '@late-cluster/show/<path under packages/show/src>'.
//
// This starting direction names no cue or line, so it keeps working while the script is rewritten:
// Larry at his desk with the first other speaker at a stand beside him (just the desk if Larry is
// alone), and a lower third for whoever speaks first. Replace it with real direction (shots on the
// script's own cues) once the script settles.

export default {
  defaultShot: 'desk',

  direct(t, show) {
    const other = show.lines.find((l) => typeof l.who === 'string' && l.who !== 'larry')?.who
    if (other) show.shot('deskWith', { with: other })
    const first = show.lines[0]
    if (typeof first?.who === 'string') show.chyron(first.who, { from: first.t0, dur: 3 })
  },
}
