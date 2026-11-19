// The reference episode's own looks (each entry goes through defineLook). Between them the kit
// tour's invented figures wear every costume kind and held prop the house cast does not:
// featherCoat + clipboard, cardigan + the contraption prop, blazer + clicker, a terminal at the
// usual size, and a small terminal + popper. Screen and clipboard text names the primitive, nothing more.
export const LOOKS = {
  unit: { color: '#5effc8', costume: { kind: 'terminal', color: '#5effc8', model: 'TEST-UNIT', text: ['> SCREEN', '> LINE TWO', '> LINE THREE'] }, scale: 0.85 },

  'guest-a': { color: '#58f0e8', costume: { kind: 'featherCoat', color: '#2e6f8a', trim: '#7cf0ff', holds: 'clipboard', clipText: 'CLIPBOARD' } },
  'guest-b': { color: '#ff9a5c', costume: { kind: 'cardigan', color: '#ff9a5c', shirt: '#ffd27a', trim: '#eef6f8' }, prop: 'contraption' },
  'guest-c': { color: '#ff5fd2', costume: { kind: 'blazer', color: '#ff5fd2', shirt: '#eef6f8', trim: '#ffffff', holds: 'clicker' } },
  'guest-d': { color: '#7cc4ff', costume: { kind: 'terminal', color: '#7cc4ff', model: 'DEMO-4', text: ['> LINE ONE', '> LINE TWO', '> LINE THREE'], holds: 'popper' }, scale: 0.62 },
}
