# The trial fixture

Prepared outputs for the fixture writer (`--writer fixture --fixture test/fixtures/trial`), used by
`bin/self-test.mjs` and `test/pipeline.test.mjs`: a two-segment episode with house characters and one
invented guest on `.example`, from an invented digest. Nothing in it is from a real account.

- `digest/digest.json`: the week's digest (invented accounts, invented at:// URIs).
- `limits.json`: trial limits (a 30-second episode).
- `pitch/`, `write/`, `direct/`, `self-check/`: what each creative stage writes, relative to
  `episodes/<id>/`. `__ID__`, `__NUMBER__`, `__WEEK__` and `__TITLE__` are substituted.
  `write/episode.patch.json` is merged into episode.json; `self-check/lore.append.md` goes into the
  lore file and `self-check/bible-append/<chapter>.md` is appended to that DNA chapter (the
  self-test points `--bible` at a scratch copy of docs/bible/, never at the real one).
- The plan carries a retro of the pilot (citing an invented reaction in the digest's "About the
  show"), one experiment, and inherits the pilot's `segments/cold-open/script.js` as reference.

The scorecard here is test data that satisfies the gate, not a judgement of the trial episode.
