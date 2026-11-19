#!/usr/bin/env bun
// bun packages/writers-room/bin/credits.mjs <repo root> <episode id> <cast id,cast id,…>
//
// Prints, as JSON, the credits the studio's end card rolls for an episode: the studio's own
// credits() (packages/show/src/show/builtins.js), with the episode's cast.js merged over the house
// cast as the page does, for the cast ids that appear. Run with bun: the studio's modules import
// TypeScript that Node does not strip. Used by the credits gate (stage 9).
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const [root, id, whoArg = ''] = process.argv.slice(2)
const { CAST } = await import(pathToFileURL(join(root, 'packages/show/src/cast.js')).href)
const episodeCast = join(root, 'episodes', id, 'cast.js')
if (existsSync(episodeCast)) Object.assign(CAST, (await import(pathToFileURL(episodeCast).href)).CAST ?? {})
const { credits } = await import(pathToFileURL(join(root, 'packages/show/src/show/builtins.js')).href)
const who = new Set(whoArg.split(',').filter(Boolean))
console.log(JSON.stringify(credits(who)))
