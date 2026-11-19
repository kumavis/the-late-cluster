// interview: Quinn, an invented member, answers in Quinn's own replies; each question recreates the post it answered.
export default {
  id: 'interview',
  title: 'The Interview',
  gap: 0.3,
  beats: [
    { say: 'larry', id: 'welcome', text: 'Please welcome my guest tonight, Quinn.' },
    { say: 'larry', id: 'q1', text: 'What is your favourite tool?' },
    { say: 'quinn', id: 'a1', text: 'a spoon, honestly' }, // verbatim: at://did:plc:trialquinn/app.bsky.feed.post/q1 · context: at://did:plc:trialhost/app.bsky.feed.post/q0
    { sfx: 'laugh', at: 0.05 },
    { say: 'larry', id: 'q2', text: 'Do you ever sleep?' },
    { say: 'quinn', id: 'a2', text: 'no, never' }, // verbatim: at://did:plc:trialquinn/app.bsky.feed.post/q3 · context: at://did:plc:trialfan2/app.bsky.feed.post/q2
    { say: 'larry', id: 'button', text: 'Quinn, everybody!' },
    { sfx: 'sting', at: 0.1, hold: 0.8 },
  ],
}
