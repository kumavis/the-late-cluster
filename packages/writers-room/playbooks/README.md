# Playbooks: rules for every stage

You are one stage of the weekly pipeline for *The Late Cluster with Larry Nx*, a late-night talk show
performed by synthesized puppet heads about a Bluesky community, the simcluster. The pipeline gives
you a week's digest and asks for one stage's files. Deterministic gates check your work afterwards;
the owner, or a reviewer the owner names, reviews the whole episode in a pull request before
anything airs.

| stage | playbook | you produce |
|---|---|---|
| pitch | [pitch.md](pitch.md) | `production/pitch.md`, `production/plan.json` |
| write | [write.md](write.md) | `segments/*/script.js`, `production/sources.json` |
| direct | [direct.md](direct.md) | `segments/*/index.js` |
| self-check | [self-check.md](self-check.md) | `production/scorecard.md`, `production/dna-amendments.md`, the lore entries, any DNA edits |

## The bible has two layers

- **The constitution**, `docs/bible/00-constitution.md` and `docs/bible/09-real-people.md`. Read both
  in full at the start of every stage. Only the owner changes them; a run that touches either fails.
- **The DNA**, every other file in `docs/bible/`. It describes how the show is made today, and it is
  meant to move: each episode tries one experiment, and the self-check may amend the DNA when the
  experiment earns it. Treat the DNA as the current best practice, not as law.

The playbooks say only how to do your stage in this repository: which files, which commands, which
gates. When a playbook and the bible disagree about taste, the bible wins; when they disagree about a
file or a command, the playbook wins and the disagreement is a bug to report in the pitch's risks.

## Always

- **The first rule** (constitution, Article 1): only include it if it's interesting. Nothing in the
  running order is mandatory and there is no minimum length. Cut instead of padding, and record each
  cut with its reason in `plan.json` `cut`.
- **Real people** (chapter 9) override everything, the first rule included. The show works from what
  people publish openly, without asking them first (Article 3): never contact anyone, never wait for
  anyone, never make an episode depend on a reply. Their protection is chapter 9: their own words,
  in their original context, nothing invented, nothing private, the out-of-bounds subjects, the
  opt-out list. When in doubt, leave it out and say so in the pitch's "Risks and open questions".
- Material comes from the week's digest only (R2): `digest.md` to read, `digest.json` for exact text,
  URIs, follower counts and the out-of-bounds flags. The opt-out list is already applied to the
  digest; never bring anything in from elsewhere, including your own memory of these accounts.
- Use at:// URIs from `digest.json` when you cite a post. A bsky.app URL is accepted in prose.
- Invented accounts, sites and posts go on `.example` (`@zed.example`, `websitebymorning.example`),
  never on a real top-level domain (R8).
- **Build fresh.** You cannot read earlier episodes or their builds. If the pitch decided to carry a
  file forward, it is in `episodes/<id>/production/inherited/`, as reference to adapt, not to import.
  For a working example of a segment use the studio's reference episode
  (`packages/show/reference/segments/demo/` and `kit-tour/`), the templates in
  `packages/show/templates/`, and the READMEs in `packages/show/` and `packages/show/tools/`.
- Read files with the Read tool. Shell commands that print or search files are refused.
- Stay inside `episodes/<id>/` (and, in the self-check, the DNA). Never touch another episode, the
  studio (`packages/`), `scripts/`, `dist/`, git, or the network. The permission settings refuse it.
- Run the stage's check command before you stop, and stop only when it prints no FAIL lines. A warning
  is not a failure, but every freshness warning needs an answer (see the pitch playbook).
- You are not in a conversation. Do not ask questions; do not wait for a reply. Finish the stage, then
  end with two or three sentences: what you made, what you were unsure of, what the reviewer should
  look at first.
