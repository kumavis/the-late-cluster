// kit-tour: a silent tour of the shared kit for segment authors, the reference episode's second
// segment. Open /?seg=kit-tour&autostart=1&mute=1, or shoot it: npm run shoot -- ref kit-tour 2 6 10 …
// Every 4 seconds a new shot or prop; read the code for how each is called.
//
// It is a test card, not an example of material. The guests are invented test figures (Test Unit
// and Guest A to Guest D, in ../../cast.js and ../../looks.js), and every word on screen names the primitive it
// sits on. Nothing here is a joke, a format or a running gag to copy.

const T = (n) => n * 4 // the tour's beats

export default {
  title: 'Kit tour',
  duration: 60,
  bumper: false,
  cast: ['guest-c', 'guest-a', 'guest-b', 'guest-d', 'eppy', 'unit', 'sibyl', 'hy', 'al', 'dee', 'pete'],
  guests: ['guest-a', 'guest-b', 'guest-c', 'guest-d'],
  disclaimer: { text: 'Disclaimer: a one-line footer for a few seconds', from: 0, dur: 5 },
  // the episode counter: n = from + bumps passed (its label is fixed in the studio)
  built: { from: 10, bumps: [T(1) + 1, T(5) + 1, T(7) + 2] },
  // the set's crow, circling the skyline; direct() switches it to the desk and the sill below
  set: { crow: 'circling' },

  shots: [
    { at: 0, shot: 'ots', who: 'guest-c', pip: 'larry' },
    { at: T(1), shot: 'remote', guest: 'guest-c', label: 'Monitor label' },
    { at: T(2), shot: 'remote2', guests: ['guest-a', 'guest-b'] },
    { at: T(3), shot: 'podium' },
    { at: T(4), shot: 'deskWith', with: 'unit' },
    { at: T(5), shot: 'sports', ticker: 'Ticker lane · scrolling text · row one · row two', tickerTag: 'Ticker' },
    { at: T(6), shot: 'stage' },
    { at: T(7), shot: 'panel', guests: ['guest-a', 'guest-b'], pop: 'guest-d' },
    { at: T(8), shot: 'guest', guest: 'guest-a' },
    { at: T(9), shot: 'desk' },
    { at: T(11), shot: 'wide' },
    { at: T(12), shot: 'closeup', who: 'guest-b' },
  ],

  setup(show) {
    const { draw } = show
    this.map = draw.blobRegion('weather-land', { x: 620, y: 110, w: 520, h: 360 })
  },

  direct(t, show) {
    // panel: a small puppet pops up from behind the couch; a look's contraption prop is unveiled
    if (t >= T(7) && t < T(8)) {
      show.shot('panel', { guests: ['guest-a', 'guest-b'], pop: 'guest-d', popUp: show.tween(t, T(7) + 0.5, T(7) + 1.2, 0, 1, 'outBack') })
      show.puppet('guest-b').prop({ unveil: show.progress(T(7) + 1.5, 1.2) })
    }
    // the hologram effect, its amount tweened to 0 so the head flickers out
    if (t >= T(8) && t < T(9)) show.puppet('guest-a').fx('hologram', { amount: show.tween(t, T(8) + 2.6, T(8) + 3.4, 1, 0), flicker: 0.8 })
    // set extras on the desk shot (the key cap and the crow perched on the desk), then shake and scale
    if (t >= T(9) && t < T(11)) {
      show.set.eKey = true
      show.set.crow = 'perched-desk'
      if (t > T(10) + 2) show.puppet('larry').shake(5).scaleTo(show.tween(t, T(10) + 2, T(10) + 3, 1, 1.15, 'outBack'))
    }
    // the crow on the window sill
    if (t >= T(11) && t < T(12)) show.set.crow = true
    // the line-up: free placement with show.camera + puppet().place (head sizes side by side)
    if (t >= T(13)) {
      const ids = ['larry', 'eppy', 'unit', 'guest-c', 'guest-a', 'guest-d', 'guest-b']
      show.shot('wide', { band: false }).camera({ x: 1000, y: 640, zoom: 0.92 })
      ids.forEach((id, i) => show.puppet(id).place({ x: 580 + i * 140, y: 600, scale: 1, look: 'camera', floor: 960, z: 5, seat: null, instrument: null, clip: null, fx: null }))
      // Guest B stands last, its contraption on its right (side: 1) and unveiled, clear of the others
      show.puppet('guest-b').prop({ side: 1, unveil: 1, run: 1 })
      show.puppet('sibyl').hide()
      show.set.desk = show.set.chair = show.set.couch = false
    }
    // chyrons: a cast id, a title override, and a house character; guests get PUPPET · PARODY automatically
    show.chyron('guest-c', { from: 0.6, dur: 3 })
    show.chyron({ id: 'guest-c', title: 'Chyron · title override' }, { from: T(1) + 0.4, dur: 3 })
    show.chyron('guest-a', { from: T(8) + 0.3, dur: 3 })
    show.chyron('eppy', { from: T(5) + 0.4, dur: 3 })
  },

  drawBack(ctx, t, show) {
    const { draw, P } = show
    const pn = show.panel
    if (t < T(1) && pn) {
      // the weather map kit
      draw.region(ctx, this.map, { color: P.sky })
      draw.isobar(ctx, 860, 290, 120, { label: '1012', seed: 2 })
      draw.isobar(ctx, 860, 290, 70, { seed: 5 })
      draw.front(ctx, [[660, 200], [760, 250], [860, 230], [980, 300], [1100, 280]], { kind: 'cold', progress: show.progress(0.5, 2) })
      draw.front(ctx, [[700, 420], [820, 380], [940, 400], [1080, 360]], { kind: 'warm', progress: show.progress(1, 2) })
      draw.sun(ctx, 720, 150, 22, t)
      draw.rain(ctx, 1000, 180, 1, t)
      draw.storm(ctx, 1100, 420, 0.9, t)
      draw.snow(ctx, 760, 330, 0.8, t)
    }
    if (t >= T(5) && t < T(6) && pn) {
      // a board: the podium (rings mark the top centres it returns), the animal glyphs, a split-flap
      draw.label(ctx, 'BOARD', pn.x + 30, pn.y + 44, { size: 18, color: P.coral, ls: 0.2 })
      draw.splitFlap(ctx, pn.x + pn.w - 200, pn.y + 110, 'FLAP', { age: show.since(T(5)), size: 30 })
      const tops = draw.podium3(ctx, pn.x + 190, pn.y + pn.h - 40, 300, { labels: ['1', '2', '3'], rise: show.progress(T(5) + 0.3, 1) })
      for (const [x, y] of tops) draw.ring(ctx, x, y - 12, 8, P.white, 1.2)
      const ay = pn.y + pn.h - 70
      draw.chicken(ctx, pn.x + 440, ay - 40, { scale: 0.7, bob: t * 2 })
      draw.seal(ctx, pn.x + 545, ay - 14, { scale: 0.6, ball: true, t })
      draw.gator(ctx, pn.x + 650, ay - 4, { scale: 0.45, jaw: 0.5 + 0.5 * Math.sin(t * 3) })
      for (const [x, s] of [[440, 'CHICKEN'], [545, 'SEAL'], [650, 'GATOR']]) draw.label(ctx, s, pn.x + x, pn.y + pn.h - 26, { size: 12, align: 'center', color: P.sky, ls: 0.2 })
    }
  },

  drawFront(ctx, t, show) {
    const { draw, P } = show
    if (t >= T(6) && t < T(7)) draw.glowText(ctx, 'GLOW TEXT', 640, 110, { size: 42, align: 'center', color: P.magenta, weight: 'm', ls: 0.1 })
    if (t >= T(2) && t < T(3)) draw.stamp(ctx, 640, 470, 'STAMP', { age: show.since(T(2) + 1.2), rot: -0.15 })
    if (t >= T(3) && t < T(4)) {
      const h = show.headOf('sibyl')
      if (h) draw.speechBubble(ctx, h.mouth[0] + 10, h.mouth[1] - 20, 'Speech\nbubble', { appear: show.progress(T(3) + 0.5, 0.4), side: 1 })
    }
    if (t >= T(9) && t < T(11)) {
      // a props board: each glyph with its name under it
      const u = show.since(T(9))
      draw.box(ctx, 40, 40, 560, 380, { color: P.blueMid, cut: 10, fillAlpha: 0.85 })
      const name = (s, x, y) => draw.label(ctx, s, x, y, { size: 11, align: 'center', color: P.cyan, ls: 0.2 })
      draw.keycap(ctx, 110, 110, { label: 'K', pressed: (Math.sin(t * 4) + 1) / 2, glow: 0.6 })
      name('KEYCAP', 110, 170)
      draw.crow(ctx, 470, 110, { scale: 1, flap: (t * 2) % 1 })
      name('CROW', 470, 170)
      draw.crown(ctx, 290, 110, 1)
      name('CROWN', 290, 170)
      draw.elephant(ctx, 120, 290, { scale: 0.8, trunk: Math.sin(t * 2) })
      name('ELEPHANT', 120, 345)
      draw.book(ctx, 270, 270, { scale: 0.9, open: (Math.sin(t) + 1) / 2, title: 'BOOK' })
      name('BOOK', 270, 345)
      draw.limboBar(ctx, 470, 370, { w: 180, height: 70 + 30 * Math.sin(t), wobble: Math.sin(t * 6) })
      draw.confetti(ctx, 470, 250, u % 1.6, { seed: Math.floor(u / 1.6) })
      name('CONFETTI', 470, 210)
      name('LIMBO BAR', 470, 395)
      draw.ticker(ctx, 440, 'Ticker · a full-width crawl · row one · row two', t, { tag: 'Ticker' })
    }
    if (t >= T(11) && t < T(12)) draw.creditsRoll(ctx, ['Credits roll', ['Role', 'Name'], ['Row two', 'Guest C'], { head: 'Head' }], show.since(T(11)), { rect: { x: 400, y: 120, w: 480, h: 200 }, speed: 60 })
  },
}
