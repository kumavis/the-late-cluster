# Playbooks: rules for every stage

You are one stage of the weekly pipeline for *The Late Cluster with Larry Nx*, a late-night talk show
performed by synthesized puppet heads about a Bluesky community, the simcluster. The pipeline gives
you a week's digest and asks for one stage's files. Deterministic gates check your work afterwards; a
person reviews the whole episode in a pull request before anything airs.

| stage | playbook | you produce |
|---|---|---|
| pitch | [pitch.md](pitch.md) | `production/pitch.md`, `production/plan.json` |
| write | [write.md](write.md) | `segments/*/script.js`, `production/sources.json` |
| direct | [direct.md](direct.md) | `segments/*/index.js` |
| self-check | [self-check.md](self-check.md) | `production/scorecard.md`, the lore entry |

The design bible in `docs/bible/` says what a good episode is. The playbooks say only how to do your
stage in this repository: which chapters to read, which files, which commands, which gates. When a
playbook and the bible disagree about taste, the bible wins; when they disagree about a file or a
command, the playbook wins and the disagreement is a bug to report in the pitch's risks.

## Always

- **The first rule** (bible 01): only include it if it's interesting. Nothing in the running order is
  mandatory and there is no minimum length. Cut instead of padding, and record each cut with its
  reason in `plan.json` `cut`.
- **Real people** (bible 09) are not optional and override everything, the first rule included. When
  in doubt, leave it out and say so in the pitch's "Risks and open questions".
- Material comes from the week's digest only (R2): `digest.md` to read, `digest.json` for exact text,
  URIs, follower counts and the out-of-bounds flags. The opt-out list is already applied to the digest;
  never bring anything in from elsewhere, including your own memory of these accounts.
- Use at:// URIs from `digest.json` when you cite a post. A bsky.app URL is accepted in prose.
- Invented accounts, sites and posts go on `.example` (`@zed.example`, `websitebymorning.example`),
  never on a real top-level domain (R8).
- Stay inside `episodes/<id>/` (and, in the self-check, the lore file). Never touch another episode,
  the studio (`packages/`), `scripts/`, `dist/`, git, or the network. The permission settings refuse it.
- Run the stage's check command before you stop, and stop only when it prints no FAIL lines. A warning
  is not a failure, but every freshness warning needs an answer (see the pitch playbook).
- You are not in a conversation. Do not ask questions; do not wait for a reply. Finish the stage, then
  end with two or three sentences: what you made, what you were unsure of, what the reviewer should
  look at first.
