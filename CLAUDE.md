# CLAUDE.md: working in this repo

The Late Cluster is a weekly late-night talk show about Bluesky's simcluster, performed by
synthesized puppet heads in the browser. Read these before changing anything:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): the structure, every command, and the
  decisions behind them. It is the contract: change it in the same commit as what it describes.
- [`docs/WORKFLOW.md`](docs/WORKFLOW.md): how an episode is made, stage by stage, who does
  each stage, and who may read what.
- [`docs/bible/README.md`](docs/bible/README.md): what a good episode is. Required reading
  before writing or reviewing any episode content.
- `packages/show/README.md` and `packages/show/tools/README.md`: how a segment is written,
  rendered and directed.

## Roles and models

Work on this repo is done by subagents, as set out in
[`docs/WORKFLOW.md`](docs/WORKFLOW.md). Fable writes and judges comedy; nothing else. What a
script can do is done by a tool, and what is checking, documenting or fitting is done on Opus.

| role | model | subagent |
|---|---|---|
| Project manager (the top-level agent) | latest Fable | the session itself |
| Writer: jokes, scripts, the open, close and joins | latest Fable | `writer` |
| Reviewer: ranking, the repetition gates, selection, the scorecard | latest Fable | `reviewer` |
| Researcher: content cards from the scraper's skeletons | latest Opus | `researcher` |
| Auditor: scope, the constitution screen, consent, staged frames | latest Opus | `auditor` |
| Sound editor: fitting scripts to the voice engine | latest Opus | `sound-editor` |
| Builder: staging code, tools, the pipeline, the scraper, the studio, infrastructure | latest Opus | `builder` |

The definitions are in `.claude/agents/`. Choose the subagent by role and the model follows;
do not pass a model by hand. The project manager starts a run and handles failures and
send-backs; routine waves are driven by the pipeline's runner. It does not write episode
content. Whoever makes a thing does not judge it. Writers never read earlier episodes,
`docs/ledger/`, `docs/trials/` or reviewers' files; reviewers and auditors do, which is how
repetition is caught. Give an agent a short reading list, never "the whole bible".

## The loop

```bash
npm run episode:new -- --title "..."   # the next episode, as a draft
npm run segment:new -- <ep> <seg>      # a segment skeleton
npm run render -- <ep> <seg>           # audio, telemetry, cues (bun + ffmpeg)
npm run check -- <ep>                  # rendered outputs against the contract
npm run shoot -- <ep> <seg> <t>...     # frames to look at (Playwright)
npm run build -- <ep> [--preview]      # dist/episodes/<id>/, or preview/<id>/ for a draft
npm run verify && npm test             # what CI runs; neither needs an install
npm run produce -- --week 2026-W47     # the whole weekly pipeline, stage by stage
```

## Rules that are easy to break

**Episodes**
- The constitution is `docs/bible/00-constitution.md` and `docs/bible/09-real-people.md`.
  Only the owner changes those two files. Everything else in the bible is DNA, and an episode
  is expected to amend it.
- Only include it if it's interesting. That overrules structure, formats and length.
- Their words, in their context: a puppet of a real account says only what that account
  published, the way they said it. No pastiche, nothing invented, nothing private. The
  opt-out list is absolute. The show does not wait on anyone's reply.
- Consent is two rules (the owner's ruling, 27 November 2026). What someone said in public is
  fair game unless they explicitly asked the show's account not to: a bio line, a general remark
  about bots or quoting, or a reaction to another account is not an opt-out, only evidence for
  the repost test. What someone sent by direct message is used only after their yes to the
  show's asking, as far as that yes goes. The limits on topics and tone (R1, R6, R7, R10) are
  not consent rules and still apply.
- Every episode runs one deliberate experiment. A reviewer proposes it after the shortlist
  exists, because reviewers are the ones who can see what the show has already tried; writers
  build it in without seeing the past.
- Best effort on pronunciation is sufficient, because the subtitles carry the line (the owner's
  ruling, 21 November 2026). Nothing goes back to a writer because the voice cannot say it, and a
  real person's words are never cut for it. Hard words go in `docs/voice-research.md`. Only
  something heard as crude, alarming or out of bounds is never accepted.
- Do not open an earlier episode's source to copy from it. Carry something forward only by
  naming it in the plan with a reason.
- New props and helpers live with the episode. Something moves into `packages/show` only when
  a second episode needs it.
- Nothing airs without a person reading it. The pipeline opens a pull request; it never
  deploys and never announces.
- Episodes import studio code as `@late-cluster/show/...`, never by relative path. Episode
  content never goes into `packages/show`.

**Builds**
- Builds are committed under `dist/episodes/<id>/`, and a published episode's audio lives
  only there. After re-rendering a segment, rebuild before committing, or the committed cues
  and audio disagree. `npm run verify` catches it.
- Do not rebuild an old episode unless that is the task: it re-bundles it with today's studio.
- Generated site files (`dist/index.html`, `dist/episodes.json`, `dist/latest/`,
  `dist/site-assets/`) are never committed.

**Configuration and secrets**
- Configuration is committed: `show.config.json`, each package's `config/`,
  `terraform/terraform.tfvars`. If a value is not secret, it belongs in one of those.
- Secrets come only from the environment, locally from the gitignored `.secrets`. Never read
  it, print it, or copy a value out of it. Commands that need a secret load it themselves.

**Outward-facing actions: ask first**
- The bot is a command-line tool and nothing more: it runs when a person runs it, and it does
  not watch or answer anyone (the owner's ruling, 21 November 2026).
- Every bot command that changes anything (`announce`, `post`, `reply`, `profile`, `repost`,
  `dm send`) is a dry run. Never
  add `--live` unless the owner says so in that conversation. The bot tags only the accounts that
  appear in the episode a post is about (the owner's ruling, 21 November 2026), and nobody else:
  `reply --episode` is the one command that writes a mention, and only for accounts in that
  episode's `production/sources.json`;
  direct messages never carry a mention. It reposts only posts by accounts listed in
  `show.config.json`, and the account's bio is configuration there too. Direct-message text is private: it stays in the
  gitignored `data/bot/dm/` and is never committed, quoted or performed unless the person says
  it may be.
- Terraform: `npm run terraform -- plan` freely; `apply` only for a change the owner asked
  for, after the plan shows exactly that change. Edit `terraform.tfvars` and
  `terraform/tests/committed.tftest.hcl` together. Never edit or delete `terraform.tfstate`.
- Never push, open a pull request, or switch on a workflow schedule unless asked.
- Since 27 November 2026 the repository is public on GitHub and a push to `main` deploys
  `dist/` to the site. An episode is made on its own branch; merging it into `main` and
  pushing is publishing, and happens on the owner's word after they have watched it. Write
  every commit as something the public will read.

**Housekeeping**
- Lockfile changes go in their own commit.
- Tests use Node builtins only and must pass on a checkout with nothing installed.
- A root-only `.gitignore` rule starts with a slash. An unanchored `data/` once dropped the
  pronunciation dictionary from git; `scripts/test/checkout.test.mjs` now guards the files
  the studio cannot regenerate. Add to that list when you add such a file.
- A mocked test cannot know a server's limits. When a real run fails on something the tests
  accepted, add the limit to the tests.
