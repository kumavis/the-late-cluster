# The trial fixture

Prepared outputs for the fixture writer (`--writer fixture --fixture test/fixtures/trial`), used by
`bin/self-test.mjs` and `test/pipeline.test.mjs`: a two-segment episode with house characters and one
invented guest on `.example`, from an invented digest. Nothing in it is from a real account.

- `digest/digest.json`: the week's digest (invented accounts, invented at:// URIs).
- `limits.json`: trial limits (a 30-second episode).
- `pitch/`, `write/`, `direct/`, `self-check/`: what each creative stage writes, relative to
  `episodes/<id>/`. `__ID__`, `__NUMBER__`, `__WEEK__` and `__TITLE__` are substituted.
  `write/episode.patch.json` is merged into episode.json; `self-check/lore.append.md` goes into the
  lore file (the self-test points `--lore` at a scratch copy, never at docs/bible/lore.md).

The scorecard here is test data that satisfies the gate, not a judgement of the trial episode.
