# Audit: `music-alt` ("Best We Can Doo-Wop") against the constitution and the week's terms

Auditor, 21 November 2026. Read: `production/owner-notes.md` (last section), `00-constitution.md`,
`09-real-people.md`, `research/screen.md`, the cards in `drafts/music-alt/notes.json` (the four the
song uses in full: `made-polyhedral-coffee-simulator`, `made-cat-voice-quartet`,
`made-yard-shift-wheelie`, and the screen's lines on `talk-polyhedra-week`), the draft's
`script.js`, `notes.json`, `sources.json`, the episode's `production/sources.json`,
`production/assembly-2.md`, and for context `research/media-notes.md` and
`review/consent-check.md`. All six posts the draft cites were looked up in the saved digest
(`npm run lookup -- --dir data/weeks/2026-W47`). Nothing was fetched from the network.

## Verdict: `change`

One `must` is open: the people cap. If this song replaces the present one, Dave is in three
segments. The second `must`, about the consent check's term, is resolved by the addendum of
21 November 2026. Everything else passes: the words, the quotes, the pictures and the credits.
The rest are notes.

## Findings

### must

1. **`dave-card`, `posted`, `four-words`, `tile-coffee`, `mug-in`, `mug-too`: Dave would be in
   three segments.** The episode's `production/sources.json` (account `dave.9000ish.uk`) already
   counts Dave in two segments, which it calls the limit: `made-polyhedral-coffee-simulator`, where
   Dave's puppet speaks, and `top-chicken`, where the post of the bot Dave runs is read aloud. Under
   R13 a bot's posts are its operator's persona. The present `music` has no Dave in it. This song
   names him, shows his post card, reads his post aloud and credits him on a tile, which makes a
   third segment. The screen's rule is "no account in more than two segments". What has to change,
   and who does it:
   - **owner or reviewer:** rule on whether reading the bot's post, with its manager never named on
     air, counts toward Dave's cap. If the ruling is that it does not count, whoever keeps
     `production/sources.json` corrects Dave's note when the song is merged. The song can then stand
     as it is.
   - If the bot's post does count, the song cannot use Dave. Its fact, its hook and the mug verse all
     rest on him, so **the owner** chooses between this song and the present one on that basis. It
     cannot be patched.
2. **`mug-too`, `mug-in` (and the tag `+ MUG · ADDED BY DAVE`): resolved.** These beats rest on a
   second post by Dave, `at://did:plc:hovt6k22s64dq63jjmoyibk3/app.bsky.feed.post/3n2lmuj26k22w`
   (the `?mug=wolfram` reply). As first written, the consent check's term for `dave.9000ish.uk`
   ("Use the simulator post and nothing else of its week") did not cover it. The consent check
   belongs to the auditor, and on the digest's evidence the term is now widened to that one post:
   see "Addendum, 21 November 2026" in `review/consent-check.md`. It is in the simulator's own
   story. It replies to samantha.wiki's mug post, which quotes the simulator post. It carries no
   mark, and it touches no out-of-bounds subject. Its use in the song is within the term, so
   nothing in the song has to change. What remains is the live pass, which now includes this post.
   The verdict stays `change` because of must 1.

### note

3. **`four-words`: passes.** The read is "best i can do …", the post's first line exactly, with the
   cut marked. The digest has the post as Dave's, 17 Nov 2026 19:24Z, 20 likes, a reply. The card in
   `dave-card` (Dave · @dave.9000ish.uk · 17 Nov 2026 · 20 likes · REPLY, and the three lines) matches
   it. Larry reads it as Dave's post ("posted by Dave. Above it:"). He does not make it answer
   anything new, and the card's REPLY label is honest about the occasion. The occasion
   (`…/3n2jnbmrlx22j`, norvid_studies) is not named or shown, which is correct (screen ruling 1).
   When the song is merged, **whoever keeps `production/sources.json`** should add `music-alt` to
   norvid_studies' "mentioned" note as the occasion of this read, as that note already does for the
   coffee segment's line `best`.
4. **The lyric's "someone" lines are each true of what the member posted, and no pronoun is
   used.**
   - `cat` = David: the post says "The cat voice sim joins a quartet", and the alt text says the
     feline voice sings.
   - `coffee` = Dave: he built the simulator.
   - `mug` = Samantha: "my mug this morning has polyhedra on it", with a photo.
   - `mug-too` = Dave's `?mug=wolfram` reply. The card states it as "the mug appearing as an option
     in the simulator".
   - `wheelie` (cee's game) has no "someone" and states only what the card states: a wheelie game in
     a skid steer loader.

   No line says what anyone meant. "best we can do" and "best you can do" are the band talking about
   itself and to Larry. Neither is put in Dave's mouth, and nobody's puppet speaks or sings: the
   speakers are `larry`, `hy`, `dee`, `al` and `pete`, all house cast.
5. **`coffee`, `mug-too`: "game" is the house's word.** Dave called it a "polyhedral coffee
   simulator". "Game" comes from the prompt it answered ("sort of needs to be a game now") and from
   the coffee segment's Larry ("A game!"). The tile `tile-coffee` uses Dave's own words, so nothing
   on screen misnames it. This is not a false claim. It is noted because the brief asks for things
   to be "stated as the card states it".
6. **`cat`: "built a cat that sings".** The card's thing is a cat *voice*, and the tile says CAT
   VOICE. A singing cat is a fair lyric shorthand for a simulated feline voice singing with a
   quartet. It is not a claim that a cat is drawn in the video, which nobody has seen.
7. **People, with this song in place of `music` (check 3).** Running order from `assembly-2.md`.
   - Dave: three segments. See must 1.
   - yonderdavid.bsky.social: interview (3) and the song (8). Two, the same as now. One interview,
     the only one.
   - cee.wtf: `top-chicken` (6) and the song. Two. The screen allows "one more at most" beyond Top
     Chicken.
   - samantha.wiki: the plotter (1) and the song. Two, shown and credited only, never voiced. This
     account is marked `featuredPrevious: spoke`, and the song complies.
   - None of these four is in `packages/scraper/config/optout.json`. None of the six posts cited is
     redacted or withheld in the digest, and all six match the draft's text and counts.
   - The consent check's live pass is still owed for these accounts' pinned posts (Dave, Samantha,
     yonderdavid) and for anything posted after the scrape. That pass is owed for the whole episode,
     not for this song alone.
8. **Pictures (check 4): pass.** The cat-ears glyph, the two wheels and the empty mug outline are
   symbols with credits. They are not drawings of the video, the game or the photo. One correction
   to the writer's premise: Samantha's mug photo *has* been looked at. `research/media-notes.md`
   records that the project manager opened it on 19 Nov. The card's term ("Do not say what the mug
   shows") still governs, and the bare outline in `tile-mug` keeps to it. Nothing drawn on that mug
   may change (no star, no WOLFRAM). The simulator tile reuses the coffee segment's own sketch,
   which is drawn from the title screen and the prompt "E Refill Coffee from Kettle" that the project
   manager saw. So "beside the kettle" in `mug-in` is the studio's sketch and nothing new. The 3D
   scene itself has never been seen, so the tile should stay the studio's sketch (**builder**). It
   must not be detailed into a likeness of the scene.
9. **On screen (check 5): pass, with two things to watch at staging.**
   - Every credit is exact against the digest and the cards:
     - CAT VOICE · David · @yonderdavid.bsky.social / with a chimera-vocal-synth quartet. This names
       the synth by its own name and does not present it as David's or the show's.
     - POLYHEDRAL COFFEE SIMULATOR · Dave · polycoffee.9000ish.uk
     - WHEELIE GAME · cee · yard-shift.cee.wtf
     - MUG · Samantha · @samantha.wiki
   - The labels and tags are glances: DOO, WOP, BEST WE CAN DO, + MUG · ADDED BY DAVE, NEW KEY ·
     LARRY'S NOTE, BEST YOU CAN DO.
   - Watch 1 (**builder**): the cat tile, read with its second line, is at the eight-word glance
     limit.
   - Watch 2 (**builder**): in `ours-again` and `to-camera`, four credit tiles, two cards, a label
     and Dave's card (parked small at the edge since `band-in`) are all up at once while the hook is
     sung. Each piece is a credit or a glance, but together they are a lot of unsung text. Keep
     Dave's parked card small enough that it reads as a credit and not as a post to read again.
10. **The show about itself (check 6), for the owner.** Yes: in part, this makes a third piece about
    the show itself. From `to-desk` to the tag (about 25 s, roughly a third of the song), the subject
    is the host's own contribution: `your-best`, `only-host`, `larry-doo`, `work-with`, the lift sung
    "to him, then to the lens", `button` "I do what I can." And "I only host." is word for word the
    last sentence of the show's own account bio, which the owner wrote. In an episode that already
    has the making-of and the account bit, viewers who have seen the account will hear it as a third
    callback to the show's own account. The first two-thirds, the members' list, is not about the
    show. The screen's general rule 9 ("The show is not its own subject") was set before the owner
    chose the two show pieces, so this is the owner's call and not a breach. If the owner wants only
    two, the line to look at is `only-host`, the one that ties the bridge to the account
    (**writer**).

## Second look, 21 November 2026

This looks at the redraft: the new ending `last-verse`, Samantha named in `mug`, and "simulator"
in `coffee` and `mug-too`. I read the draft's `script.js`, `notes.json` and `sources.json` again.
The new post, its thread and its story were looked up in the saved digest, and the account's
profile was read from the scrape's private profile data. Nothing was fetched from the network.

Two rulings made since the first look:
- **First-look must 1 is resolved.** The owner ruled that a bot's post counts toward the person
  who runs it only where that person appears, and Dave is not named in `top-chicken`.
- **First-look must 2 is resolved** by the consent-check addendum.

### Verdict: `change`

One `must`: the banner. Everything else in the redraft passes. The new post is clean, exact and
on an allowed card. The lyric's claim about the week is borne out by the digest. Samantha's name
is hers and the line is true. Nobody is in three segments.

### must

S1. **`banner`, `row`, `last-chord`, `desk`: the banner may only be on screen with its credited
    card in the same frame, whole and exact.** This is my ruling on the banner. A copy of a real
    post hung over the stage is allowed here, on three conditions:
    - The words keep their meaning. The post declares a polyhedra week, and the banner declares
      the same week.
    - The text is exact: `it's polyhedra week`, lower case, with the post's apostrophe and nothing
      added.
    - The card it came from, with its display name, handle, date and likes, is in the same frame
      whenever the banner is.

    Where the banner is seen without the card, or only in part, it stops being the post shown as
    the post it was. It becomes the show's own slogan in a member's words: an uncredited,
    unmarked cut of a real post (R4: "Whenever a real post appears … a card shows the real display
    name, handle, date and like count"). As drafted, two shots break this:
    - **`desk`:** "the end of the banner in the corner of his frame". This is a fragment of the
      post, with no card, under Larry's "I do what I can."
    - **`row`:** the camera comes "down to the band's stand" while the banner hangs "over the whole
      stage". This puts the banner in frame and the tile row, with the card, out of it.

    What must change:
    - **writer**, in the cue comments: the banner is not in the `desk` frame at all, and in `row`
      either the banner leaves the frame or the card stays in it.
    - **builder**, when staging: hold to the same rule.

    `banner` itself, with the card whole in its tile in the same shot, and `last-chord`, where
    everything is in one wide frame, are fine.

### note

S2. **The new post and account (`tile-words`): clear, on the terms below.**
    - **The post:** `at://did:plc:ncwcsl2uejt5ci5qgn7spgis/app.bsky.feed.post/3n2h67hytac25`, by
      @oscillatory.net (display name "a hangry mouse"), Mon 16 Nov 2026 18:35Z. The text is "it's
      polyhedra week". At the scrape it had 15 likes, 2 reposts and 3 replies. It is a quote post
      with no labels, no marks and no redaction.
    - **The card:** the cue describes it as "a hangry mouse · @oscillatory.net · 16 Nov 2026 · 15
      likes · QUOTE POST". That matches the digest. The post sits on `talk-polyhedra-week`, which
      the screen keeps, and the merged `voices-polyhedra-week-named` is used through it as ruling
      10 says.
    - **Its story** (`s-48d2057395`) has no marks, no topic flags and no consent marks.
    - **The account:** it is not in `optout.json` and nothing of it was withheld. Its bio as
      scraped ("with loss of generality") and its labels (none) are clear. It is not among the
      descriptions the scrape set aside as possible opt-outs, and none of its posts is about the
      show. Its pinned post is older than the window and was not read. Its other threads this
      week sit outside this story, and the song uses none of them.
    - **What it quoted:** a link bot outside the cluster (hn100.bsky.social), "Smallest possible
      nopert polyhedra: the Septopert / Discussion". Leaving that out does not change what the
      three words mean. The post declares the week on the occasion of a polyhedron in the news,
      and seen alone it is still that declaration. The card's QUOTE POST label is honest that
      something was quoted.
    - **Live pass:** this account and post are not in `review/consent-check.md` yet. If this song
      is selected, the auditor adds them there with the same "clear at the scrape" standing, and
      the live pass includes them.
S3. **The small account (274 followers): the rules are met, but the running order matters.**
    - R7 and screen ruling 9 allow this account once, in one segment, as the hero of one of three
      moments, and "the naming of the week" is one of them. It appears nowhere else in the episode
      (no other segment or draft names it). It is the hero here, credited for the declaration and
      for nothing else.
    - Ruling 9 also says it is never "confused, paired or joked about" with
      @oszillate.bsky.social (75 followers). That account's correction is read aloud, on its card,
      in the coffee segment. In `assembly-2.md` the coffee segment comes directly before the song,
      so the two small accounts with near-identical handles, both about polyhedra, would appear a
      minute or so apart. Under the same declaration in the digest, the two accounts also
      exchanged three posts; the song shows none of them, which is correct.
    - The draft now says it can sit anywhere. **For whoever orders the episode:** put at least one
      segment between the coffee segment and this song. Each account stays in its own segment
      either way, but that gap is what keeps them from being read as one.
S4. **`whole-week`: "now the whole week has them too" is supported.**
    - In the saved digest, this post is the first use of "polyhedra week" in the window. No
      earlier post has the phrase or "polyhedron week".
    - After it, through 20 Nov, the name was used by norvid-studies (three posts, the first "it's
      polyhedra week now, lock in", all three words), anthonybecker ("for polyhedra week"),
      mokkenstorm.dev, bisks.net and its build bot. Variants came from shimmermathlabs (twice,
      "polyhedron week") and oszillate ("Simcluster Polyhedron Week™").
    - Six minutes after the post, a reply under it from gracekind.net tagged norvid-studies with
      "let's get it trending".
    - So "now" and "the whole week" are fair for a lyric. What the line claims is the order of
      events: the words came first, and the week then used them. It does not claim that every
      later use came from this post, and nothing on screen should claim that either.
    - The later uses mostly carry two of the three words, so "them" is lyric shorthand.
S5. **`mug`: naming Samantha is allowed and true.**
    - "Samantha" is the account's display name, the one on its cards and its tile.
    - The line is true: the post says "my mug this morning has polyhedra on it", with a photo.
    - The account is `featuredPrevious: spoke`, so it may not speak. A house voice singing its name
      is not the account speaking. The terms allow it to be shown and named, as the plotter
      segment already does.
    - `mug-too` ("simulator has it too") is Dave's `?mug=wolfram` reply, which is now within the
      consent term.
    - "simulator" in `coffee` and `mug-too` is now Dave's own word, which closes first-look note 5.
    - No pronouns are sung. The lyric's "someone" in `three-words` is @oscillatory.net, and the
      line is true: the post is three words.
S6. **People, counted again (this song in place of `music`):**
    - dave.9000ish.uk: the coffee segment and the song. Two, by the owner's ruling on the bot.
    - yonderdavid.bsky.social: the interview and the song. Two.
    - cee.wtf: `top-chicken` and the song. Two.
    - samantha.wiki: the plotter and the song. Two, shown and named, never voiced.
    - oscillatory.net: the song only. One.

    Nobody is in three segments, and there is one interview. Amber, oszillate.bsky.social,
    mokkenstorm.dev and norvid-studies are not in the song.
S7. **`tile-words`: the lit words do not match the sung words.** The card lights "it's",
    "polyhedra" and "week" on the sung words "three", "small" and "words". In this show, words
    lighting means they are being read, and here the words lit are not the words sung. It
    misquotes nobody, because the card is whole and a glance. But lighting "polyhedra" on "small"
    looks like a reading the post does not support. **builder/writer:** consider lighting the
    three words together on "words". This is not required.
S8. **On screen.** The `last-chord` frame now holds the banner, five credit tiles, the stand
    with its label, and (if still parked) Dave's card. Every piece is a credit or a glance, but
    the total is large for text nobody sings. First-look note 9 still applies (**builder**).
S9. **The show about itself (first-look note 10): mostly gone.** The bridge, "I only host." and
    the lift to the host are cut, and Larry no longer sings. What is left about the host is the
    button "I do what I can." That is one dry line after a song about the members. It does not
    make a third piece about the show itself.
