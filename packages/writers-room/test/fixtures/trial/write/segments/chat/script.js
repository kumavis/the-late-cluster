// The guest segment of the pipeline trial. Zed is invented (@zed.example).
export default {
  id: 'chat',
  title: 'The Guest',
  gap: 0.3,
  beats: [
    { say: 'larry', id: 'welcome', text: 'My guest tonight is Zed, who is not a real person.' },
    { cue: 'zed-in', at: 0 },
    { say: 'zed', id: 'hello', text: 'Hello, Larry. I am a test.' }, // invented
    { sfx: 'laugh', at: 0.05 },
    { say: 'larry', id: 'button', text: 'Zed, everybody!' },
    { sfx: 'sting', at: 0.1, hold: 0.8 },
  ],
}
