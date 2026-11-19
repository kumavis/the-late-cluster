# Playbooks

The pipeline's instructions live in three places, each for one reader:

| where | for | what |
|---|---|---|
| `.claude/agents/<role>.md` | every subagent of that role | the standing rules of the role: what it does, what it may read, what it never does |
| `episodes/<id>/production/briefs/<stage>/<task>.md` | one subagent, one task | written by the tool: the task, the files to read and not to read, the one place to write, the check command |
| this folder | the project manager, and writers for one reference | how to drive a run; the record of real people's words |

| playbook | for | what |
|---|---|---|
| [project-manager.md](project-manager.md) | the project manager (the top-level session) | the loop: status, spawn, check, send back, rework, exclude, the pull request |
| [sources.md](sources.md) | writers (drafts and assembly) | `sources.json`: every real account, post and line, with each line's occasion and staged setup |

There is no playbook per stage any more: the brief carries the task, the role definition carries
the rules, and the bible (`docs/bible/`) carries the craft.
