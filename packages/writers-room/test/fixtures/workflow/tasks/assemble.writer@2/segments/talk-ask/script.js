// talk-ask: the cold open. Someone asked for a talk show with only two segments; the show obliges.
export default {
  id: 'talk-ask',
  title: 'The Request',
  gap: 0.28,
  beats: [
    { cue: 'ask', at: 0 },
    { say: 'larry', id: 'ask', text: 'Somebody asked for a show with only two segments.' },
    { say: 'sibyl', id: 'agree', text: 'This is segment one. There is no third.' },
    { sfx: 'laugh', at: 0.05 },
    { say: 'larry', id: 'calm', text: 'Relax. This will be short.' },
    { say: 'sibyl', id: 'intro', text: 'And now... Larry Nx!', as: 'And now... Larry En-Ex!' },
    { sfx: 'applause', at: 0.1, hold: 0.5 },
  ],
}
