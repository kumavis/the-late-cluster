// The manual writer: writes the exact prompt to shots/<id>/_production/prompts/<stage>.md, prints
// it with the files the stage must produce, and stops. A person or an interactive Claude Code
// session does the stage; `npm run produce -- --week <week>` again runs the gates and continues.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export const EXPECTED = {
  pitch: ['production/pitch.md', 'production/plan.json', 'episode.json (title, description)'],
  write: ['segments/<seg>/script.js for every plan segment (npm run segment:new)', 'production/sources.json', 'cast.js and looks.js if the episode has its own guests', 'production/intelligibility.json for waived names, if any'],
  direct: ['segments/<seg>/index.js for every segment', 'production/thumbnail.txt ("<seg> <t>", optional)'],
  'self-check': ['production/scorecard.md', 'docs/bible/lore.md (episode log entry, rotation log row, new lore)'],
}

export function manualWriter({ print = console.log } = {}) {
  return {
    name: 'manual',
    async run({ stage, prompt, paths, id, week }) {
      const dir = join(paths.work, 'prompts')
      mkdirSync(dir, { recursive: true })
      const file = join(dir, `${stage}.md`)
      writeFileSync(file, prompt)
      print(`manual ${stage}: the prompt is in ${paths.rel(file)}; it follows in full`)
      print('-----8<-----')
      print(prompt)
      print('----->8-----')
      print(`manual ${stage}: produce these in episodes/${id}/: ${EXPECTED[stage].join('; ')}`)
      print(`manual ${stage}: check with: npm run produce -- --week ${week} --check ${stage}`)
      print(`manual ${stage}: then continue with: npm run produce -- --week ${week}`)
      return { status: 'waiting', detail: `the ${stage} stage is with a person (manual writer)` }
    },
  }
}
