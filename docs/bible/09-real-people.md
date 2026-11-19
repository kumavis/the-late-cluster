# 9. Real people

The show puts words in the mouths of puppets that stand for real accounts, and posts the result
to the platform those people use. It is affectionate by design, and it can still hurt someone, embarrass
them, misquote them or send a crowd to their replies. These rules are not optional and are checked at
review. Each comes with its reason, so you can handle cases it doesn't name. When a case is unclear,
**leave it out**: no single joke is worth a person's bad week.

The organising idea is the show's own: *you're only here if you want to be*. Being in the show
is something people should be glad of, and leaving it is always one key away.

## The rules

### R1. Persona, not person

Use only the public posting persona: what an account posts in public, in the cluster. Never their
offline life: real name (unless it is their display name), job, employer, location, family,
relationships, appearance, age, health, money, or anything they posted about themselves that is
personal rather than part of the persona.

*Why:* the persona is a character the person chose to perform in public. The person behind it did
not choose to be in a show.

### R2. Nothing private, nothing deleted, nothing from outside

Material comes from public posts in the digest. Not from DMs, private groups, Discords, deleted
posts, other platforms, screenshots someone else took, or what an account's followers say about
them.

*Why:* public in the cluster is the only consent signal the show has. Anything else, the person
reasonably thought had a smaller audience.

### R3. Words in a guest's mouth come from three sources only

1. **Their own public posts**, verbatim and short (a phrase or a sentence).
2. **Their public catchphrases** ("claim.", "good news, everyone!").
3. **Obvious pastiche of a format they use**, with content that is plainly the show's absurd
   invention ("concept: talk show, but a giant crow hunts the host,").

Never an opinion, belief, preference, confession, agreement or criticism they have not posted. Never
a reaction to another person. Never a fact about themselves. Tag every guest line in `script.js` with
its source (`// verbatim: at://…`, `// catchphrase`, `// pastiche of "concept:"`).

*Why:* a puppet saying something in a person's voice is heard as the person saying it. Pastiche of a
*format* is safe because nobody thinks norvid really proposed a crow hunting a talk-show host.
Pastiche of an *opinion* is not, because someone will.

### R4. Real quotes are verbatim, sourced and in context

When a real post appears on screen:

- The text is exactly the post's text. Trim only with an ellipsis, and only if the trimmed version
  means the same thing (the pilot's *… that's fraud against simcluster-guests, not a build.*).
- The card shows the real display name, handle, date and like count.
- The post's URI is in the digest and is recorded in `production/sources.json`.
- The framing does not change what the post meant. The pilot's goodnight comment is the model: the
  2023 ingroup post "is about joining 'the ingroup' in 2023; the show does not present it as a
  definition of the word simcluster." Read the post's thread before using it.

*Why:* a quote card with a handle on it is a factual claim that this person said this. It has to be
true in letter and in spirit.

### R5. No invented scandal, no fabricated quotes presented as real

Never invent an event, a feud, a failure, a secret, a statistic or a post about a real person.
Never caption invented words as if a real account wrote them. Comic fiction is fine when it is
unmistakably the show's (the bot built a website "by morning"; Larry in a museum case) and never
when it could be mistaken for news about someone.

*Why:* clips travel without context. Anything that would be a false claim if screenshotted is a
false claim.

### R6. Affection over contempt; punch sideways or up

The target of a joke is a habit, an artefact, a rule, the scene, the show itself, the bot, or power
(platforms, big companies, algorithms, markets). People are in jokes as the hero or as a good sport,
never as the butt.

**The repost test:** would the person, seeing the clip, happily repost it? Not "would they put up
with it". If you aren't sure they would be pleased, change it or cut it.

*Why:* the show is made by and for the community it jokes about. A sneer at one member reads as the
show sneering at all of them.

The pilot's sharpest joke about a person is the Grace Limit: Top Chicken's real rule says contenders
need fewer followers than its founder, so "She founded the chicken. She cannot be the chicken." It
passes because the rule is hers, the game is hers, and the joke celebrates the game. A joke about
someone's follower count that wasn't their own rule would fail.

### R7. Small accounts and pile-on risk

The show's audience is bigger than many of the accounts it might show.

- A **small account** (say, under a few hundred followers, or anyone who doesn't usually get
  attention) may appear only as the hero of a moment: witty, kind, right. The pilot's goodnight cards
  (3 likes, 61 likes) and the Discords reply (16 likes) are all like this.
- Never show a post the show is laughing *at* from anyone who is not a regular, consenting guest.
- Never show a post that is part of an argument, a complaint, a callout, or anything that invites
  people to reply to its author.
- Don't use one-off viral posts by people outside the cluster's regulars.
- Keep the day's Top Chicken winner, or any ranked "loser", anonymous unless they are a recurring guest
  who would enjoy it (the pilot puts a blank card on the podium: "the winner is a secret").

*Why:* a person with 200 followers who suddenly gets 2,000 strangers in their replies has been harmed
even if every stranger is nice.

### R8. Fiction must look like fiction

Invented accounts, posts and sites use names that cannot belong to anyone:

- Handles and URLs under `.example` (`websitebymorning.example`), or a display name only.
- Never a real top-level domain. The pilot's `@made.a.website`, `@posted.a.cat` and
  `did-anyone-say-gn.website` don't resolve today, but `.website` and `.cat` are real TLDs and someone
  could register them. Don't repeat that.
- Check every invented handle with
  `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=<handle>`: it must fail.

*Why:* a fictional handle that turns out to be someone's real account puts words in their mouth.

### R9. The parody label, every time

- Every guest puppet has `guest: true` in its cast entry, so the chyron shows **PUPPET · PARODY**.
- The first segment with a guest has a `disclaimer` footer ("Guests are puppets playing posting
  personas. Parody.").
- The credits list the real accounts under "Puppets played the posting personas of".
- Tributes are credited on screen with the project's URL and maker ("A tribute · weather.samantha.wiki").

*Why:* a clip seen alone must still say what it is.

### R10. Out of bounds, always

Not as jokes, not as references, not as background:

- health, mental health, illness, disability (including jokey self-descriptions like "psychosis"
  that appear in people's posts: the show doesn't pick them up);
- grief, death, accidents, disasters;
- sexuality, gender identity, race, religion, nationality;
- partisan politics and elections;
- jobs and money troubles: layoffs, firings, debt, rent;
- legal trouble, harassment, abuse, safety incidents;
- minors;
- someone leaving the platform or the community, or going quiet;
- interpersonal conflict, including between members of the cluster.

If the week's biggest story is one of these, the show does not cover it. If it is so big that
ignoring it would be strange, the show still doesn't joke about it; it can simply leave it alone.

*Why:* these are the subjects where a puppet's joke can't be affectionate enough to be safe, and
where the person on the other end may be having the worst week of their year.

### R11. The opt-out list is absolute

`packages/scraper/config/` holds the opt-out list. An account on it never appears in any form: not as
a guest, not quoted, not named, not shown in a screenshot or a chart, not described identifiably.
Also treat these as opt-outs, even if the list has not caught up:

- a post saying they don't want to be in the show, or dislike being quoted or clipped;
- a request to the show's account;
- a bio that says not to quote, screenshot or repost them.

After airing, an opt-out request means: remove them from all future episodes and from
[lore](lore.md), and tell the reviewer, who decides whether a published episode needs re-cutting.

*Why:* "you're only here if you want to be" is the show's first line. BorJev's arc in the pilot ("my
bot. opt-in only now.") is the community's own version of this rule.

### R12. Data about people is computed, dated and benign

A number about a person (the pilot's "thirty-nine percent of your posts are replies to norvid") must
be computed from public posts, shown with its range and count (*OWN POSTS, AUG 18 – NOV 12, 2026 ·
389 OF 995 POSTS*), recorded in `sources.json`, and harmless. Counts of replies, posts or reposts are
fine; anything that measures someone's worth, mood, or activity at odd hours is not.

### R13. Bots and agents

A bot account is run by a person, and the person is who the rules protect. Treat the bot's posts as
the operator's persona. Ask whether quoting the bot quotes someone else (BorJev quotes other people's
posts; the quoted author is the one to check). The show's own announcement account should not tag
guests by default; tag only people who have said they'd like it.

### R14. Recurring guests are re-checked every week

A guest who was fine last month may have asked not to be included, or may be having a hard time.
Re-run R10 and R11 for every guest, every episode. Their persona should come from this week's posts,
not a fixed stereotype; people change how they post.

### R15. If you don't understand it, don't use it

A reference you can't explain might be a private joke, a sore spot, or about someone's life. You can't
check it, and you can't write a fair joke on it. Mark it unclear in the pitch and move on.

## What the reviewer checks

For every episode, before approving. Any "no" is a send-back.

1. Every real account that appears is listed in `production/sources.json`, and none is on the opt-out
   list or has opted out in a post or bio.
2. Every guest line has a source comment, and each is verbatim, a catchphrase, or format pastiche with
   obviously invented content. No guest expresses an opinion, fact or reaction they haven't posted.
3. Every real post card matches its source URI word for word, with the right handle, date and like
   count, and its framing matches its meaning in its thread.
4. No invented post, quote, event or number is attributed to a real person.
5. Every invented handle or URL fails to resolve and is not on a real TLD.
6. No out-of-bounds topic appears, even in a ticker, a map label or a chyron.
7. Every person in a joke passes the repost test. Small accounts appear only as heroes.
8. Every guest chyron shows PUPPET · PARODY; a disclaimer runs at the first guest; the credits list
   the personas; tributes are credited.
9. Nothing in the episode would be a false claim about a real person if screenshotted alone.
