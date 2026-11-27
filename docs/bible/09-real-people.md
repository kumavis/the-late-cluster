# 9. Real people

The show puts words in the mouths of puppets that stand for real accounts, and posts the result
to the platform those people use. It is affectionate by design, and it can still hurt someone, embarrass
them, misquote them or send a crowd to their replies. These rules are not optional and are checked at
review. Each comes with its reason, so you can handle cases it doesn't name. When a case is unclear,
**leave it out**: no single joke is worth a person's bad week.

This chapter decides what is *allowed*. [The first rule](00-constitution.md#1-only-include-it-if-its-interesting)
("only include it if it's interesting") decides what is *worth including*. Material must pass both,
this chapter first, and the first rule can only remove things: it never licenses anything forbidden
here, and it never removes the labels, disclaimers and credits required here.

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

### R2. Public posts freely, a direct message only with a yes, nothing deleted, nothing from outside

Material comes from public posts in the digest. What someone said in public may be used, under the
rest of this chapter, unless they have explicitly asked the show's account not to (R11). The
owner's ruling, 27 November 2026: "anything said in public is fair game unless they explicitly
asked this account to not do that".

What someone sent the show's account by direct message is private until they say otherwise. It is
used only after they have answered yes to the show asking permission, for example the blanket
permission asked in an interview ("Interviews by the show's account" below), and only as far as
that yes goes. Until then it is not quoted, performed, described or committed. No answer means no.

Never from private groups, Discords, deleted posts, other platforms, screenshots someone else took,
or what an account's followers say about them.

*Why:* the show uses what people published, in essentially its original context
([constitution](00-constitution.md), Article 3). A direct message was written for one reader, so
only its sender can give it a wider audience. Anything else, the person reasonably thought had a
smaller audience.

### R3. Don't put words in their mouths

A puppet that stands for a real account says only words that account published, from three sources:

1. **Their own posts, verbatim.** Performed within the thread they came from (format 9, The
   Thread), shown as the post they were (a card with its date, the show's characters reacting
   around it), or spoken in an exchange the show stages that recreates the occasion they were said
   on (R4).
2. **Answers they gave the show's account**, verbatim, always with the question that was asked: that
   question is the answer's occasion. A public reply to the account is a public post (R2). An
   answer by direct message counts only once its author has said the show may quote it
   ("Interviews by the show's account" below).
3. **Their catchphrases, used the way they use them** (the owner's ruling): the same function, the
   same kind of occasion, the same meaning as in their own posts. This is R4's test applied to a
   phrase they repeat. Each catchphrase is listed for the account in `production/sources.json` with
   posts that show the author's own use, so the reviewer can check "the way they use them".
   - *In:* Abel opening with "good news, everyone!" before his own real announcement of something he
     made this week, which is how his posts use it.
   - *Out:* the pilot's "claim." as norvid's reply to Larry's "Thank you for coming". His posts use "claim."
     to stake a claim on an idea (as far as the pilot shows; his listed posts settle it), not to
     answer a greeting; here it becomes a comeback.

**No pastiche.** Inventing words in a real person's format puts words in their mouth, however
absurd the content. The pilot did it (norvid's "concept: this interview, but it's a museum exhibit,"
and "concept: talk show, but a giant crow hunts the host,"; Abel's "they don't want you to know this
but (it's already running)"); the show no longer does. A puppet of a real account never gives an
opinion, belief, preference, confession, agreement, criticism, fact about themselves or reaction to
anyone that they didn't publish.

**The show's own characters are free** to speak, set up, react and joke around real posts. They never
restate, paraphrase or summarise a real person's view in words that person did not use: Larry may say
"norvid posted this on Tuesday", not "norvid thinks the simcluster is a city".

**Tags and records.** Every line spoken by a puppet of a real account carries a source comment and
its occasion:

- `// verbatim: at://<post> · context: at://<the post it replied to>` (for a top-level post, the
  context is the post's own URI);
- `// interview: at://<answer> · context: at://<the show's question>` (for an answer by direct
  message, the two message ids in place of the addresses);
- `// catchphrase: "<phrase>" · context: at://<a post where the author uses it this way>`.

For each such line, `sources.json` records the post, its parent's URI and text (or, for a top-level
post, one line on the situation it was said in), and the show's own setup line, so the reviewer can
compare them. For an answer by direct message it also records the id of the message in which the
person said yes. `// invented` is for fictional characters on `.example` only. There is no pastiche tag
for a real account.

*Why:* a puppet saying something in a person's voice is heard as the person saying it, and a clip
travels without the show around it. Only their own words, said the way they said them, are safe to
put in that voice.

### R4. Real words keep how they were said

Fidelity is to **how the person said it**, not to the literal thread it sat in. One rule covers a
performed post, a catchphrase and a single post placed in a scene:

- **A real line may be performed in an exchange the show stages**, provided the staged exchange
  recreates the occasion the line was actually said on: the same kind of prompt, the same function,
  the same meaning. The puppet says what the person said, the way the person said it.
- **Out is the reverse:** a line made to answer something it was not answering, so that it means
  something its author did not mean; an exchange stitched together from unrelated conversations;
  and any invented words.

**The occasion test.** Put the show's setup line beside the original prompt (the post it replied to,
or the situation it was said in). Is it the same kind of prompt? Does the line do the same job? Does
it mean the same thing? And would the person, watching, recognise both what they said and what they
meant by it? All must be yes. The reviewer runs this from the records in `sources.json`.

**Worked example, a pass (the owner's ruling).** The pilot stages norvid's *buddy that's my freaking
simcluster* (Jul 20, 2026) as his reply to Larry's "Ah, look at that skyline. My beautiful city." He
said it that way: as that kind of reply to that kind of remark, someone calling the cluster theirs.
Same prompt, same function, same meaning.

**The same material, a fail.** Larry: "Abel says the simcluster belongs to him." norvid: "buddy
that's my freaking simcluster." Now the line is a retort to Abel, who never said that, and a fond
claim becomes a quarrel between two real people. Invented prompt, changed meaning: out.

More examples:

| in | out |
|---|---|
| The Discords reply (*I'm in like three simcluster discords… But I'd be down to join a fourth.*) shown as the reply it was, after Larry's joke about Discords. | norvid's "what else is like this" as his answer to Larry's "what is the simcluster?" (pilot). It asks for more things like something; it doesn't define anything. |
| The 2023 ingroup post at goodnight, shown dated and framed as about joining "the ingroup" then; the pilot notes it is not presented as a definition of the word. | Two posts by different people from different days performed as a conversation between them. |
| BorJev quoting norvid's 2024 *what simcluster is this and how do i escape* on a card with its author, date and QUOTED BY: that is what the bot actually does. | Samantha's puppet saying "Hundred percent." / "It shipped during that sentence.." in reply to Larry (pilot): invented words. |

Whenever a real post appears, spoken or on screen, the text is exactly the post's text, trimmed only with an ellipsis
that keeps the meaning (the pilot's *… that's fraud against simcluster-guests, not a build.*); a card
shows the real display name, handle, date and like count; the post's URI is in the digest and in
`production/sources.json`; read its thread before using it.

*Why:* a quote card with a handle on it is a factual claim that this person said this. It has to be
true in letter and in spirit, and so does the occasion the show puts it in.

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
with it". If you aren't sure they would be pleased, change it or cut it. The test is the writer's
and the reviewer's judgement, made from how the person posts in public.

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
- Never show a post the show is laughing *at* from anyone who is not a regular guest whose persona
  the show already plays, and who plainly enjoys the bit (judged from their public posts).
- Never show a post that is part of an argument, a complaint, a callout, or anything that invites
  people to reply to its author.
- Don't use one-off viral posts by people outside the cluster's regulars.
- **Winners may be named; losers never.** Winning Top Chicken is a hero moment and the game's own
  account names the winner, so the show may name the winner and show the winning post, subject to
  R10 and R11. Nobody else in a ranking is named, shown or ranked: no runners-up, no last place.

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

An opt-out is an explicit ask to the show: a reply or a tag to the show's account, a direct message
to it, or a post that says they don't want to be in the show. Treat it as an opt-out from the
moment it is made, even if the list has not caught up. An ask about one thing (not to be tagged,
not to be messaged) is honoured for that thing.

Not an opt-out by itself: a general remark about bots, quoting or screenshots; a line in a bio
addressed to everyone; how someone reacted to another account. What is said in public is fair game
unless they explicitly asked this account not to (the owner's ruling, 27 November 2026, quoted in
R2). These remarks are still read, because they are evidence for the repost test (R6).

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
the operator's persona. Ask whether quoting the bot quotes someone else (BorJev quotes other
people's posts; the quoted author is the one to check). The show's own account may tag the accounts
that appear in an episode, in the post that announces it or in a reply under it: they have passed
every gate to be there. It tags nobody else, and takes a tag off when the person asks. It speaks
only under its own posts and by direct message, never in someone else's thread (the owner's ruling,
22 November 2026: "we're not crashing the middle of someone elses thread - thats the important
distinction"). Interviews by the account follow the rules in the next section.

### R14. Recurring guests are re-checked every week

A guest who was fine last month may have asked not to be included, or may be having a hard time.
Re-run R10 and R11 for every guest, every episode: check the opt-out list, their bio and their posts
this week. This is the writer's own check of the list and the posts.
Their persona should come from this week's posts, not a fixed stereotype; people change how they
post.

### R15. If you don't understand it, don't use it

A reference you can't explain might be a private joke, a sore spot, or about someone's life. You can't
check it, and you can't write a fair joke on it. Mark it unclear in the pitch and move on.

## Interviews by the show's account

The show's account asks one person questions by direct message (`npm run bot -- dm send` and
`dm read`). The bot is a command a person runs: it watches nothing and answers nobody on its own,
and every message is sent on the owner's word.

- **An occasional extra, never a prerequisite.** Featuring someone's public posts never depends on
  interviewing them. An unanswered question never blocks an episode: it goes ahead without that
  answer, and the pipeline never waits for a reply.
- **Who may be asked.** Anyone whose public posts the show could feature, unless they are on the
  opt-out list or have asked the show's account not to contact them. The show asks by direct
  message, never by turning up in someone else's thread (R13). A message carries no mention and no
  link.
- **What the first message says, plainly and out of character.** That this is the show's account;
  that its messages are written by the show's AI writers' room and a person reads the answers;
  that what they say stays with the production; that none of it is quoted or performed unless they
  say it may be; and that they are free to ignore it.
- **The permission.** The show asks, in so many words, whether it may use the conversation and what
  follows from it, and whether it may quote them directly or only carry the sentiment. It is a
  blanket permission: one yes covers the conversation, at the level they chose. No answer means no.
  Until there is a yes, nothing they sent is quoted, performed, described or committed (R2).
  - *Quote directly:* an answer may be performed word for word by a puppet with their handle on
    screen, under R3 and R4, with the question that was asked.
  - *Sentiment only:* what they said may shape what the show does. Nothing is attributed to them on
    air, because R3 forbids restating a person's view in words they did not use.
- **The owner approves every message** before it is sent. Questions are light and about the
  person's own work, the week or the show: never about R10 topics, never about other people, never
  leading towards a joke at their expense.
- **Withdrawal until air.** Saying so in the conversation at any time before the episode airs takes
  the yes back, for one answer or for all of it, and so does deleting a message. The conversation
  is read again before the build, and anything withdrawn or deleted is dropped.
- **Where the text lives.** Message text stays in the gitignored `data/bot/dm/`. Only what a yes
  covers and an episode uses is committed, in that episode's `sources.json`, with the ids of the
  question, the answer and the yes.
- **Small accounts** who say yes may appear, still only as heroes (R7).
- **On screen,** the answer's card carries *ANSWERED FOR THE SHOW · <date>*.

Interviews run beside the weekly pipeline, not inside it: no stage sends a message or waits for
one.

## What the reviewer checks

For every episode, before approving. Any "no" is a send-back.

1. Every real account that appears is listed in `production/sources.json`, and none is on the opt-out
   list or has explicitly asked the show to leave them out (R11).
2. Every line spoken by a puppet of a real account is that account's verbatim post, an interview
   answer with its question, or a catchphrase used the way they use it (listed in `sources.json` with
   posts showing that use), each tagged with its source and the occasion it was said on. No pastiche. No puppet of a real
   account expresses an opinion, fact or reaction they haven't published. A performed thread matches
   its posts word for word and in order, with cuts marked.
3. Every real post card matches its source URI word for word, with the right handle, date and like
   count. Every performed line passes the occasion test (R4): the show's setup line, compared with
   the original prompt recorded in `sources.json`, is the same kind of prompt, with the same function
   and meaning; nothing answers what it wasn't answering, and nothing is stitched from unrelated
   conversations. House characters never paraphrase a real person's view.
4. No invented post, quote, event or number is attributed to a real person.
5. Every invented handle or URL fails to resolve and is not on a real TLD.
6. No out-of-bounds topic appears, even in a ticker, a map label or a chyron.
7. Every person in a joke passes the repost test. Small accounts appear only as heroes.
8. Every guest chyron shows PUPPET · PARODY; a disclaimer runs at the first guest; the credits list
   the personas; tributes are credited.
9. Nothing in the episode would be a false claim about a real person if screenshotted alone.
10. Every interview answer is a public reply to the show's account, or a direct message whose author
    said yes to being quoted, with that yes on record in `sources.json`. It is shown with the
    question it answered, and it has not been deleted or withdrawn at build time. Nothing else from
    a direct message appears, and nothing from one is attributed to its author in other words.
