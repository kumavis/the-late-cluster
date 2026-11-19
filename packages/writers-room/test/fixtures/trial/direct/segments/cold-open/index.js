// Cold open of the pipeline trial: the Ask on a card, "Built it.", Sibyl's intro.
export default {
  cast: ['sibyl', 'bot'],
  defaultShot: 'desk',
  built: { from: 0, bumps: ['built.end'] },
  set: { eKey: true },
  shots: [
    { at: 0, shot: 'desk' },
    { at: 'built', shot: 'deskWith', with: 'bot' },
    { at: 'intro', shot: 'podium', who: 'sibyl' },
  ],
  direct(t, show) {
    show.chyron('larry', { from: 0.4, dur: 3 })
  },
  drawFront(ctx, t, show) {
    const a = show.progress('ask', 0.6)
    if (a > 0 && t < show.at('built')) {
      show.draw.skeetCard(ctx, { x: 740, y: 80, w: 460, name: 'Asker', handle: 'asker.example', time: 'Jan 6', text: 'somebody should make a talk show with only two segments', initials: 'A', likes: 3, appear: a })
    }
  },
}
