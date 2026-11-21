# Draft a segment: riemann-proof-that-fits

- **Role:** `writer` (.claude/agents/writer.md)
- **Task:** one draft for the owner's commission of 21 November 2026. It is not an episode; a draft may be selected into one later.
- **Write:** `production/drafts/riemann-proof-that-fits/script.js` and `production/drafts/riemann-proof-that-fits/notes.json`; you may also write `production/drafts/riemann-proof-that-fits/sources.json` and `production/drafts/riemann-proof-that-fits/cast.js`. Nothing else.
- **Scratch:** `shots/002-commissions-w47/_production/scratch/draft-riemann-proof-that-fits/`, yours alone; nothing there is kept.
- **Check:** `node episodes/002-commissions-w47/production/briefs/draft/check.mjs riemann-proof-that-fits` prints only your draft's lines. You are done when it ends `ok`.

Paths here are under `episodes/002-commissions-w47/` unless they start with `docs/` or `packages/`.

## Read

- docs/bible/00-constitution.md
- docs/bible/09-real-people.md
- docs/bible/06-jokes.md
- docs/bible/04-formats.md
- docs/bible/02-cast.md: who the house characters are and how each of them talks
- production/commission.md
- production/research/kept/riemann-what-is-a-zeta-function.json: the card, with every post's exact text and address
- production/research/terms-riemann.md: the top of the file, the section "riemann-what-is-a-zeta-function (with riemann-where-were-you)", and "Rules for the whole subject" at the end. The other cards' sections are not yours.
- production/research/outside-context.md: what happened outside the community, for your understanding only
- production/research/pronouns.md
- packages/show/tools/README.md, only the section "Writing a segment script" (lines 80 to 226)
- packages/writers-room/playbooks/sources.md

## The task

Draft one segment from the card `riemann-what-is-a-zeta-function`, on the idea two reviewers picked for it. Two writers reached this idea separately, and both versions are below. Take the idea and what is best in each; the script and its wording are yours. The reviewers found nothing in it the show has done before.

### Idea 1:17

- **premise:** shimmermathlabs was going to joke that the proof would not fit, and then wrote one that does: why zeta of 1 runs off to infinity, in a single post. The studio performs her proof as she wrote it, block by block, with halves you can count.
- **turn:** Proof fits. Sum does not.
- **screen:** Sibyl reads zetaof1's card; shimmermathlabs' puppet says the first line of her reply, with her post card up. Then her proof, credited to her, animated in the order she wrote it: a bar for 1, a bar for a half, then each of her brackets squeezing down into a slab marked "≥ ½" that drops onto a pile beside the desk. Eppy calls them from the sports desk: "Half." "Half." The brackets get wider, the slabs keep coming, the pile passes the desk, passes Larry, leaves the top of frame; the camera cranes up after it and gives up. Her small square at the end. dlowd's puppet, as the reply it was. Button, Larry, from behind the pile: "It fits in a post."
- **format:** a demonstration of something a member made
- **speakers:** shimmermathlabs.com, dlowd.com
- **words:** at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s, at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24, at://did:plc:svcjnfakqcoxlk6zityl23js/app.bsky.feed.post/3n2rfsuo6bk2j
- **notes:** The proof is her own made thing: animated in her steps and her order, credited, with no house re-explanation in other words. Her symbols are for the screen; the voice gets only her prose line and Eppy's count. This is an old proof about zeta at 1 and not the proof in the news: the staging must not blur the two, and a glance label can say so. The card marks her as shown in the previous episode: variety is the reviewer's call. zetaof1 is outside the cluster: read aloud only.

### Idea 2:17

- **premise:** shimmermathlabs 'was gonna joke proof won't fit, but it does actually', and put a whole proof in one post: why zeta at one runs off to infinity. The studio builds it block by block as her puppet says it, exactly as she wrote it.
- **turn:** The proof fits. The sum doesn't.
- **screen:** zetaof1's card is read first, as the post hers answered. Her post then stays small and complete on a card at the left edge all the way through. In the set: a bar for 1, a bar for a half, then her brackets as crates, the pair, then the four, each crate twice as long as the one before, each tagged with her own step. The camera has to back away for every crate. By the fourth it has left through the studio wall; by 'infinitely many halves' the row runs to the horizon and the studio is a lit box far behind. Her closing square lands on the card. dlowd's puppet, as his reply: 'Oh, I love that proof, and I'm going to remember it! Thanks!' Button, Larry, a dot in the distance: 'It fit.'
- **format:** a demonstration of something a member made, credited
- **speakers:** shimmermathlabs.com, dlowd.com
- **words:** at://did:plc:dhwhxgjyh4h2dd5vjgji67mo/app.bsky.feed.post/3n2r54p53es2s, at://did:plc:qwf4izoyeyesijdeyjlity7g/app.bsky.feed.post/3n2r5ogdxis24, at://did:plc:svcjnfakqcoxlk6zityl23js/app.bsky.feed.post/3n2rfsuo6bk2j
- **notes:** The proof is her made thing: its steps are hers as she wrote them, the house draws them and adds none, and it is credited to her on screen. Her post answers zetaof1's reply, so that card (outside the cluster, read aloud only) is its setup. Saying the notation aloud, the zeta, the fractions, the powers, is a fitting problem: it may be respelled, never reworded. This is a proof about zeta at one, not about the hypothesis: no house line connects it to the day's claim, and nothing sets its size against the size of the other proof. The card records that she was shown, not voiced, in an earlier episode.

**This subject.** What the community said and did about the news, on 20 November 2026. The mathematician is not named, and the show says nothing about whether the proof is right. The terms list which posts are usable and who may be voiced; a post not listed there as usable is not usable, even though it is on the card.

**Length.** Two minutes or less. Shorter is fine: only include it if it's interesting.

**Files.** `production/drafts/riemann-proof-that-fits/script.js` in the script format of the studio's README, with `id: 'riemann-proof-that-fits'`. `production/drafts/riemann-proof-that-fits/notes.json`: `{ "slug": "riemann-proof-that-fits", "title", "format", "seconds": <your estimate>, "standing": null, "cards": ["riemann-what-is-a-zeta-function"], "ideas": ["1:17", "2:17"], "turn": "<the turn, in five words>", "speakers": ["<handles of real accounts whose puppets speak>"], "featured": ["<handles of real accounts shown on screen>"] }`. If real accounts appear, `production/drafts/riemann-proof-that-fits/sources.json` as the sources playbook sets out. A guest's puppet goes in `production/drafts/riemann-proof-that-fits/cast.js` as `export const CAST = { <id>: { name, handle, title, guest: true } }`; give it no voice settings, a sound editor places the voice.

**Exact text.** Take every post's text from the kept card by its address. Never retype one. A post a house character reads aloud is exact too, with its address in a comment on the line.

**Pronouns.** Refer to a real person by name or handle. Use a pronoun only where `production/research/pronouns.md` states one, and then that one. Where none is stated, use the name, or "they". Never infer one. The ideas above may have got this wrong; do not copy them.

**Words only.** Do not render audio and do not chase what the engine hears: a fitting tool and a sound editor do that, and send back only a line that cannot be said.

**Television.** Nothing on screen for the viewer to read in silence. There is no episode experiment for a commission.

## What the check enforces

- `script.js` loads, has `id: 'riemann-proof-that-fits'` and beats, and every spoken line has an id of its own. `notes.json` has title, format, seconds and turn, and cards, ideas, speakers and featured as lists.
- Every line a real account's puppet speaks is that account's post from a kept card, character for character (a cut marked with `…`), tagged on its line `// verbatim: at://… · context: at://…`, recorded in `sources.json` "lines" with the staged line that sets it up, which comes before it. The puppet is a guest in your `cast.js`.
- A warning, not a failure, where a house line uses he or she: look at each one.

Reply in two or three sentences when you finish.
