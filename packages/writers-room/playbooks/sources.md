# sources.json: real people, their posts, and the occasion of every line

Every real account, post and link a segment uses is recorded in `sources.json`: a draft's own in
`production/drafts/<slug>/sources.json`, the episode's in `production/sources.json` (the tool merges
the selected drafts' at assembly). The gates check it against the digest, and the pull request shows
each real line beside its staged setup and its original, for the owner to compare.

Look every post up; never retype one: `npm run lookup -- --uri <at://…>` (or `--url`, `--text`,
`--author`, `--thread`) prints the exact record, with the author's DID, display name and counts.

```json
{
  "format": "late-cluster-sources/1",
  "accounts": [
    { "handle": "someone.example", "did": "did:plc:…", "role": "guest", "cast": "someone",
      "catchphrases": [{ "phrase": "claim.", "posts": ["at://…"] }] }
  ],
  "posts": [
    { "uri": "at://…", "author": "someone.example", "displayName": "Someone", "likes": 12, "reposts": 1, "replies": 3,
      "use": "card", "segment": "<segment id>" }
  ],
  "links": [{ "url": "https://…", "use": "credit", "segment": "<segment id>" }],
  "lines": [
    { "segment": "<segment id>", "line": "<the line's id in script.js>", "kind": "verbatim", "post": "at://<their post>",
      "context": "at://<the post it replied to>", "contextText": "<that post's exact text>",
      "setup": { "line": "<the id of the staged line that prompts it>", "who": "larry", "text": "<that line's text>" } },
    { "segment": "<segment id>", "line": "<id>", "kind": "verbatim", "post": "at://<a top-level post>",
      "context": "at://<the same post>", "situation": "<what it was said in: a top-level post on a Tuesday, starting a thread about …>",
      "setup": { "line": "<id>", "who": "larry", "text": "…" } }
  ]
}
```

- **accounts**: every real account the segment uses. `did` is the account's DID as the lookup prints
  it (handles change; the show matches people by DID). `role` is guest (their puppet speaks), quoted,
  credited or mentioned. `cast` is the puppet's cast id for a guest. A catchphrase a guest says is
  listed with at least one of their own posts that uses it the same way.
- **posts**: every post the segment uses, with the author's display name and the counts as the
  digest has them (a card shows them). `use` is `card` (on screen as a post card), `quote` (its text
  on screen), `line` (spoken by its author's puppet), `thread` (performed in a verbatim thread) or
  `reference`. An image-only post has no text; say what the image is in the script, not on a card.
- **lines**: one record for every line a real account's puppet speaks or sings:
  - `context` is what the post replied to (the digest's parent), or the post itself when it was
    top-level, in which case `situation` says, in a sentence, what it was said in.
  - `contextText` is the exact text of the post it replied to.
  - `setup` names the staged line that prompts it: its id in the same script, who says it and its
    text. It must come before the real line, and it must do the same job the original prompt did:
    the same kind of question or remark, the same meaning. A line never answers a question it was
    not answering.

## In the script

Every line a real account's puppet speaks carries its source on the line, with its context:

```js
{ say: 'larry', id: 'ask', text: 'Anyone here ever finish a project?' },
{ say: 'someone', id: 'answer', text: 'i finished one once. it was a nap.' }, // verbatim: at://<their post> · context: at://<the post it replied to>
```

- `text` is the post's text character for character. Runs of whitespace may become single spaces;
  nothing else changes (not case, punctuation, quotes or emoji). A cut is marked with `…` and must
  not change the meaning. Pronunciation goes in `as`, word for word.
- `// catchphrase: "<phrase>" · context: at://<a post where they use it this way>` for one of their
  own recurring phrases, used the way they use it.
- **No pastiche.** Words in a real person's style that they did not post are words put in their
  mouth. Only an invented guest on a `.example` handle says invented words (tag them `// invented`).
- **The show's own characters do the joking** around real posts: the host's setup, the band, the
  staging. The house characters can be given any words.

The gates that read this: `draft.lines` and `write.sources`, `write.guest-lines`, `write.names`,
`write.opt-out` (`npm run produce -- --week <week> --check draft` or `--check assemble`).
