// Cold open of the pipeline trial: an invented post asks for a two-segment show; the bot builds it.
export default {
  id: 'cold-open',
  title: 'The Ask',
  gap: 0.28,
  beats: [
    { cue: 'ask', at: 0 },
    { say: 'larry', id: 'ask', text: 'Somebody asked for a show with only two segments.' },
    { say: 'bot', id: 'built', text: 'Built it.', rate: 0.9 },
    { cue: 'bump', at: 0.15 },
    { sfx: 'applause', at: 0.15, hold: 0.3 },
    { say: 'sibyl', id: 'intro', text: 'And now... Larry Nx!', as: 'And now... Larry En-Ex!' },
    { sfx: 'applause', at: 0.1, hold: 0.5 },
  ],
}
