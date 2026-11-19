// The guest segment of the pipeline trial: Zed in the guest chair, labelled.
export default {
  guests: ['zed'],
  defaultShot: 'desk',
  disclaimer: { text: 'Zed is a puppet playing an invented persona. Parody.', from: 'zed-in', dur: 5 },
  built: { from: 1, bumps: [] },
  shots: [
    { at: 0, shot: 'desk' },
    { at: 'zed-in', shot: 'guest', guest: 'zed' },
    { at: 'button', shot: 'desk' },
  ],
  direct(t, show) {
    show.chyron('zed', { from: 'zed-in', dur: 4 })
  },
}
