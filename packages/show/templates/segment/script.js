// __SEGMENT__: the dialogue, songs, sfx and named cues (format: packages/show/tools/README.md).
// Render: npm run render -- __EPISODE__ __SEGMENT__   ·   verify: npm run check -- __EPISODE__ __SEGMENT__
export default {
  id: '__SEGMENT__',
  title: '__TITLE__',
  beats: [
    { say: 'larry', id: 'hello', text: 'Good evening, and welcome to the show.' },
    { say: 'sibyl', id: 'reply', text: 'This segment is brand new, Larry.' },
  ],
}
