#!/usr/bin/env node
// Entry point: `npm run bot -- <command> [args]`. All logic lives in src/.
// "The bot" is this command line and nothing more: a person runs each command. Nothing listens,
// schedules or replies by itself.
//
//   announce <ep> [--live] [--force]                 post a published episode with a link card
//   post <ep> --video <file.mp4> --text-file <file> [--alt-file <file>] [--captions <file.vtt>]
//        [--lang en] [--aspect <w>:<h>] [--upload-only] [--live]
//                                                    post the episode's video; no mention, no link
//   reply <post> --text-file <file> --episode <ep> [--live]
//                                                    reply under the show's own post, tagging only
//                                                    accounts in that episode's sources.json
//   profile [--only avatar|description] [--avatar <file>] [--live] [--no-backup]
//                                                    set the avatar and the bio (bluesky.profile in show.config.json)
//   repost <post> [--live] [--undo]                  repost a post by an author in bluesky.repostAuthors, or take it back
//   dm send <handle-or-did> --file <path> [--live]   send interview questions by direct message
//   dm read <handle-or-did> [--limit 50] [--json]    read that conversation; changes nothing
//   help
//
// Every command that writes is a dry run unless --live. `npm run bot -- help` prints the same list.
import { main } from '../src/cli.mjs';

process.exitCode = await main(process.argv.slice(2), {
  env: process.env,
  stdout: process.stdout,
  stderr: process.stderr,
  fetch: globalThis.fetch,
});
