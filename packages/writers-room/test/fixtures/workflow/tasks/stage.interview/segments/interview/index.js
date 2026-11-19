// interview: Quinn in the guest chair, labelled.
export default {
  guests: ['quinn'],
  defaultShot: 'desk',
  disclaimer: { text: 'Quinn is a puppet playing an invented persona. Parody.', from: 'q1', dur: 5 },
  shots: [
    { at: 0, shot: 'desk' },
    { at: 'q1', shot: 'guest', guest: 'quinn' },
    { at: 'button', shot: 'desk' },
  ],
  direct(t, show) {
    show.chyron('quinn', { from: 'q1', dur: 4 })
  },
}
