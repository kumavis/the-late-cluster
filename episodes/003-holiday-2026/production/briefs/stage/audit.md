# Audit the staged frames of "The Walk Home"

- **Role:** auditor (spawn the `auditor` subagent defined in .claude/agents/auditor.md)
- **Task:** `stage.audit`, round `<round>`, episode `003-holiday-2026`. The round is given to
  you when you are spawned.
- **Write:** `episodes/003-holiday-2026/production/review/stage/r<round>.json`. Nothing else.

## Read

- `episodes/003-holiday-2026/production/owner-notes.md` and `special.md`
- `episodes/003-holiday-2026/segments/walk/script.js`: every cue and the comment under it is
  what the picture was asked to do. `notes.json`, the `builder` field. `cues.json` for times.
- `episodes/003-holiday-2026/production/stage/plan.md`, `costumes.md` and `integration.md`:
  what the builders built and what they could not stage as written
- `episodes/003-holiday-2026/production/briefs/stage/scene.md`: what each scene's builder was
  asked for, including the things that must not happen
- `episodes/003-holiday-2026/production/review/final/`: the two final reviewers' files. Each
  has a `forTheOwner` list with a part on what "rests on staging". Those are things to check.
- `docs/bible/00-constitution.md` (Article 4), `docs/bible/09-real-people.md` (R8, R10),
  `docs/bible/08-direction.md`
- **The frames.** `shots/003-holiday-2026/_audit/` holds one frame at every cue, at the middle
  of every stretch between cues and in the middle of every spoken line, at 640 by 360, which
  is the size most viewers will see. Each is named by its time; `index.txt` there lists each
  frame's time with the cue or line it belongs to. `shots/003-holiday-2026/end/` holds the
  credits. For any frame you want larger, or any moment not covered, shoot it yourself:
  `CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run shoot -- 003-holiday-2026 walk <t>… --out <a folder in your scratch>`
  (add `--caption-scale 1.4` to see the caption bar as the phone cut draws it). You need no
  network.

## The task

Look at every frame in order, with the script open beside it. You are checking fact and
rule, never whether it is good. Report, with the frame's time for each finding:

1. **What the cue asked for and the picture does not do.** For each cue, is what its comment
   describes on screen? Where a builder said they staged the nearest honest thing instead
   (`integration.md`), say whether it reads.
2. **Unreadable or lost.** Anything a line depends on that cannot be made out at this size,
   that sits under the caption bar (check at `--caption-scale 1.4` where it is close), or
   that is gone before it could be seen. In particular: the cook slowing while the room
   hurries; DON'T WALK and WALK; the figure in the top window, and that it has gone before
   the door opens; the chair kept for Larry and the second chair; the bowl passing him.
3. **Text on screen.** The only words allowed are OPEN, DON'T WALK and WALK, the caption
   bar, and the credits. Any other word, letter, number or name anywhere is a finding,
   including anything left over from the studio's own set.
4. **Hands, and things that should not happen.** No hand is seen doing anything. The scarf
   is never seen drawing itself on. Nobody raises or taps a glass. No light changes when
   the six heads turn to us (`they-look`) or while Larry says the last lines (`goodnight`).
   The sign does not change on a word, and nobody looks up at it or reacts when it does. The
   coin comes from Larry's side. No laugh sign, applause sign or ON AIR light is ever lit.
5. **The listening holds.** In each (the wait after `how-have-you-been`, `listen-help`,
   `listen-put-right`, `listen-door`, the pause before "Good."), Larry is turned to the
   camera and nothing else changes in the picture beyond the walk and the snow.
6. **Continuity.** The coat, the scarf and the envelope from shot to shot and scene to scene;
   the cardigan at the table; the snow from the crossing to the door and in the room's
   windows; the six at the table staying six, in the same seats, across every cut; nobody
   appearing in two places.
7. **The puppets.** A collar, a scarf or a prop covering a mouth while it speaks; a head
   turned so far that it reads as facing the wrong way; a body where a head is missing; more
   than four full heads in any shot but `table-wide` and `they-look`; anyone who is not on
   the street shown or lit there.
8. **Out of bounds and invented things** (R8, R10): any sign, shopfront or name that could
   belong to a real business or person; anything on screen that touches an R10 subject
   beyond what the script itself says aloud.
9. **The credits** (`shots/003-holiday-2026/end/`): read every line. They name the house cast
   who appear, say every voice is synthesized, list the busker as what he is and never under
   a heading for real accounts' personas, and carry the QUOTED and TOLD FROM lines. The
   QUOTED line gives 1913 as the year the translation was first published and names no
   edition.
10. **The first and last frames.** The special opens on the dark studio with no title card,
    and its last frame before the credits is black.

## The file

```json
{
  "round": 1,
  "segments": {
    "walk": {
      "verdict": "pass | change",
      "changes": [
        { "owner": "segment | episode | studio | script", "file": "<the file>", "scene": "<studio | street | restaurant | busker | crossing | door | table | credits>", "at": "<time or cue>", "change": "<exactly what to change>" }
      ]
    }
  },
  "looksRight": ["<the things you checked hardest that pass, a line each>"],
  "forTheOwner": ["<anything only a person watching with sound can judge>"]
}
```

`owner`: `segment` for anything in `segments/walk/`, `episode` for `looks.js`, `cast.js` or
`episode.json`, `studio` for the credits roll or the caption bar, `script` for anything that
could only be fixed by changing a word or a cue. Say exactly what must change and never how
to draw it.

Check it parses: `node -e 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));console.log("ok")' <your file>`

## Always

- You change no file but your own. The constitution is the owner's: never change it.
- You work alone, from this brief and the files it names. When you finish, reply in two or
  three sentences: the verdict, how many changes, and the most serious one.
