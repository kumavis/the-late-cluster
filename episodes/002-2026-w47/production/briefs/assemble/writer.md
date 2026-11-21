# Brief: set the running order, and write the Bluesky account bit

- **Role:** `writer` (.claude/agents/writer.md). This is assembly: you read the episode's scripts.
- **Episode:** `episodes/002-2026-w47/`. Paths below are under it unless they start with `docs/`,
  `packages/` or `episodes/`.
- **Write:** `segments/bluesky-account/script.js` (a skeleton is there; replace it),
  `production/assembly-2.md`, and, only if the new order needs it, the first or last spoken line
  of a segment in `segments/<seg>/script.js`. Nothing else.
- **Check before you stop:** each script you touched still loads:
  `node -e "import('./episodes/002-2026-w47/segments/<seg>/script.js').then(m=>console.log(m.default.id, m.default.beats.length))"`.

## Read

- `production/owner-notes.md`: the owner's words. The last section is this task.
- docs/bible/00-constitution.md, docs/bible/09-real-people.md
- docs/bible/03-episode-shape.md, docs/bible/02-cast.md, docs/bible/06-jokes.md
- the six scripts of this episode, as trimmed: `segments/made-pen-plotter-replies/`,
  `interview-yonderdavid/`, `top-chicken/`, `made-polyhedral-coffee-simulator/`, `music/`,
  `made-mobius-chess-ringmate/` (each `script.js`)
- the two new segments that join it, still in their own folder:
  `episodes/002-commissions-w47/production/drafts/making-of-inward/script.js` and
  `episodes/002-commissions-w47/production/drafts/riemann-breaking-news/script.js`
- `episodes/002-commissions-w47/production/research/terms-making-of.md`: only the section "The
  turn to the audience". The making-of already tells the cluster how to tag the show's account,
  and those terms bind anything this episode says about tagging.
- packages/show/tools/README.md, only "Writing a segment script" (lines 80 to 226)
- docs/voice-research.md: a one-minute scan. You may use any word on it.

Do not read the ledger, `docs/trials/`, `production/review/`, `production/scorecard.md`,
`production/review.json`, or any other folder under `episodes/002-commissions-w47/`.

## The task

**1. The running order.** Eight segments and the new bit. Measured lengths:

| segment | length | what it is |
|---|---|---|
| `made-pen-plotter-replies` | 0:48 | carries the show's title line; the pen writes the title |
| `interview-yonderdavid` | 1:06 | ends on the parody answer |
| `top-chicken` | 0:47 | the sports desk |
| `made-polyhedral-coffee-simulator` | 1:17 | Larry plays a game |
| `music` | 1:20 | the song |
| `made-mobius-chess-ringmate` | 1:06 | ends "I resign.", the episode's last words |
| `making-of-inward` | 1:43 | the dive; ends "Excuse me." |
| `riemann-breaking-news` | 1:30 | breaking news; ends "It fits in a post." |

The plotter opens and the chess segment closes; those two are fixed. Set the order of the rest,
with the new bit placed. Give a reason for each placement in `production/assembly-2.md`:
what follows what and why, where the energy rises and rests, and which neighbours must not
touch (two segments on one maker, two that end on the same kind of button, the making-of's
invitation and the account bit saying the same thing twice).

**2. The Bluesky account bit.** The owner: "a quick "finally got a bluesky account" bit
somewhere where larry shows his account handle." Write it as its own short segment,
`bluesky-account`, so it can be moved or dropped without touching another script.

- Quick: about ten seconds, fifteen at most. Larry's, in his voice. One joke.
- He shows the handle: `@latecluster.simcluster.tv`, exact, on screen. Say in a cue comment what
  the picture is.
- Everything it states about the account is as `production/owner-notes.md` gives it. Nothing
  else about the account is invented: no follower count, no first post, no reply from anyone.
- It may not promise anything the making-of's terms forbid: no promise of a place, a reply or a
  follow back; nothing that says a tag from anyone at all is read. If it mentions tagging at
  all, it leaves the how and the terms to the making-of. Decide whether it should come before
  the making-of, so the handle is already familiar there, or after it; say why.
- No real account is named or shown except the show's own.
- Use the script format of the studio's README, `id: 'bluesky-account'`, every spoken line with
  an id of its own, and leave all pronunciation fields empty.

**3. Joins.** Change a segment's first or last spoken line only where the new order makes the
present one wrong (a line that names what came before or what comes next). Prefer no change.

## Write `production/assembly-2.md`

- The order, one line per segment, with the reason for each placement.
- **Every line you added or changed, with its full text and its id.** These go to a repetition
  check, so the list must be complete; say "none" for joins if you changed none.
- The total running time by your sum, with your estimate for the new bit.
- Anything left for the owner.

Reply in a short list: the order, the account bit word for word, and any join you changed.
