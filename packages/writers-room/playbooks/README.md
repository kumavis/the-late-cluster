# Playbooks

The pipeline's instructions live in three places, each for one reader:

| where | for | what |
|---|---|---|
| `.claude/agents/<role>.md` | every subagent of that role | the standing rules of the role: what it does, what it may read, what it never does |
| `episodes/<id>/production/briefs/<stage>/<task>.md` | one subagent, one task | written by the tool: the task, a short reading list, the one place to write, a scratch folder, the gate's rules, the check command for that task alone |
| this folder | the project manager, and writers for one reference | how to drive a run; the record of real people's words |

| playbook | for | what |
|---|---|---|
| [project-manager.md](project-manager.md) | the project manager (the top-level session) | start the run, and what to decide at a stop |
| [sources.md](sources.md) | writers (drafts and assembly) | `sources.json`: every real account, post and line, with each line's occasion and staged setup |

There is no playbook per stage any more: the brief carries the task, the role definition carries
the rules, and the bible (`docs/bible/`) carries the craft.
