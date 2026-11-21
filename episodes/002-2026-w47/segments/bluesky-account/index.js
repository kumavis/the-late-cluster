// bluesky-account: "The Handle". The direction (packages/show/README.md has the API).
//
// One shot: Larry at the desk, alone, the ordinary host's medium shot, with his chyron (his name,
// nothing under it). On the word "handle" the account's handle comes on under his name, whole at
// once, large, in the studio's plain line colour (not gold: gold is Larry's), and stays to the end.
// A thin gold underline, his eye, runs under it from the @ to the v twice (once during "I have read
// it twice.", once quicker in the pause after) and stops on nothing; on "not" it goes out and he
// looks up at the lens.
//
// The chyron is the studio's own chyron drawn a little higher than the stage would put it, so the
// handle can sit under the name at full size and still clear the caption band. Nothing else is in
// the picture: no post box, cursor, typing, mention colour, profile card, other handle or reply.

import { chyron } from '@late-cluster/show/stage/chrome.js'

const HANDLE = '@latecluster.simcluster.tv'
const CHYRON_Y = 398          // top of the chyron box (the stage's own is 478 with captions on)
const H = { x: 92, base: 588, size: 80, ls: 0.04 }   // the handle: left edge under the name, baseline
const UNDER_Y = H.base + 16   // the underline, clear of the @'s tail (the handle has no descenders)
const BAND = { top: 500, bottom: 614 }   // black behind the handle: covers the desk's name plate whole

export default {
  defaultShot: 'desk',
  drift: true,

  setup(show) {
    const w = (id, i) => show.lines.find((l) => l.id === id)?.words?.[i]
    // the moments, from the line's own word timings
    this.tHandle = w('account', 9)?.[0] ?? show.at('handle-in')   // "handle."
    const twice = show.lines.find((l) => l.id === 'twice')
    this.run1 = [twice?.words?.[0]?.[0] ?? show.at('read-twice'), twice?.t1 ?? show.at('twice.end')]
    const not = w('not-in-it', 1)                                   // "not"
    this.tNot = not?.[0] ?? show.at('left-out')
    // the second read: quicker, inside the pause between "twice." and "I'm"
    const gapEnd = show.at('not-in-it')
    this.run2 = [this.run1[1] + 0.14, this.run1[1] + 0.14 + Math.min(0.5, (gapEnd - this.run1[1]) * 0.55)]
  },

  direct(t, show) {
    show.shot('desk')
    const larry = show.puppet('larry')
    const reading = t >= this.run1[0] - 0.15 && t < this.tNot
    if (reading) {
      // eyes down on the handle, following the underline's head across it, left to right
      const u = sweep(t, this.run1, this.run2)
      larry.lookAt(Math.PI / 2 + show.lerp(0.42, -0.36, u))
      larry.nod(-0.34)
    } else if (t >= this.tHandle && t < this.run1[0] - 0.15) {
      // the handle lands: a glance down at it
      larry.lookAt(Math.PI / 2 + 0.12)
      larry.nod(-0.12)
    } else {
      larry.lookAt('camera')
      // he takes it well: a small late nod into the laugh
      const n = show.window(t, this.tNot + 0.55, this.tNot + 1.25, 0.25)
      larry.nod(0.06 * n)
    }
  },

  drawFront(ctx, t, show) {
    const { label, labelWidth, occlude, rectPath, seg, dot, P } = show.draw
    const name = show.puppet('larry').name
    const color = show.puppet('larry').color

    // Larry's chyron: his name, nothing under it
    const from = show.at('desk')
    chyron(ctx, { name, title: '', color }, show.unlerp(from, from + 0.6, t), 0, CHYRON_Y)

    if (t < this.tHandle) return
    // the handle, whole at once, under the name
    const o = { size: H.size, ls: H.ls, color: P.blue }
    const w = labelWidth(ctx, HANDLE, o)
    occlude(ctx, rectPath(H.x - 26, BAND.top, w + 52, BAND.bottom - BAND.top, 10))
    label(ctx, HANDLE, H.x, H.base, o)

    // the underline: his eye, gold, from the @ to the v; out on "not"
    if (t >= this.run1[0] && t < this.tNot + 0.12) {
      const u = sweep(t, this.run1, this.run2)
      const out = 1 - show.unlerp(this.tNot, this.tNot + 0.12, t)
      const x1 = H.x + w * u
      seg(ctx, H.x, UNDER_Y, x1, UNDER_Y, P.gold, 2.2, { alpha: out })
      if (u < 1) dot(ctx, x1, UNDER_Y, 3, P.gold, out)
    }
  },
}

/** where the underline's head is, 0 (the @) .. 1 (the v): two runs, then it rests at the v */
function sweep(t, run1, run2) {
  const k = (a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)))
  if (t < run1[1]) return k(run1[0], run1[1])
  if (t < run2[0]) return 1
  return k(run2[0], run2[1])
}
