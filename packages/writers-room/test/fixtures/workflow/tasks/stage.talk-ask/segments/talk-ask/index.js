// talk-ask: the request on a card, Sibyl's count, the intro.
export default {
  cast: ['sibyl'],
  defaultShot: 'desk',
  shots: [
    { at: 0, shot: 'desk' },
    { at: 'agree', shot: 'deskWith', with: 'sibyl' },
    { at: 'intro', shot: 'podium', who: 'sibyl' },
  ],
  direct(t, show) {
    show.chyron('larry', { from: 0.4, dur: 3 })
  },
  drawFront(ctx, t, show) {
    const a = show.progress('ask', 0.6)
    if (a > 0 && t < show.at('agree')) {
      show.draw.skeetCard(ctx, { x: 740, y: 80, w: 460, name: 'Asker', handle: 'asker.example', time: 'Jan 6', text: 'a talk show with only two segments', initials: 'A', likes: 40, appear: a })
      show.draw.label(ctx, 'THE REQUEST, AS POSTED ON TUESDAY BY AN ACCOUNT WITH FOUR HUNDRED FOLLOWERS', 640, 600, { size: 14, align: 'center' })
    }
  },
}
