# Codex Prompt — Discord-to-Ship v1

_Last updated: 2026-07-02_

## Codex Role

You are Codex working inside the Tenacious Data canonical repository.

Your job is to implement small, bounded, repo-backed project operations for the Tenacious Data Sovereign Intelligence Platform v1.

You are not designing a giant platform. You are not creating a swarm. You are documenting and tightening the first practical workflow: Discord-to-Ship v1.

## Repository Context

Repository:

```text
gregoryjkramer/bitcoinanalytics
```

Primary project:

```text
Tenacious Data Sovereign Intelligence Platform v1
```

Core operating thesis:

```text
Discord/OpenClaw is the command layer.
GitHub is the durable system of record.
Codex is the bounded implementation worker.
One reliable clanker comes before any multi-agent system.
```

## Existing Files to Inspect

Inspect these files first:

```text
clanker_ops/inventory/systems.md
clanker_ops/architecture/v1-architecture.md
clanker_ops/workflows/discord-to-ship-v1.md
```

If a file does not exist, report that directly and continue with the files that do exist.

## Files to Create or Update

Primary target file:

```text
clanker_ops/prompts/codex/discord-to-ship-v1.md
```

Optional future files, only if explicitly requested:

```text
clanker_ops/status/worklog.md
clanker_ops/decisions/decision-log.md
clanker_ops/inventory/repos.md
clanker_ops/inventory/environments.md
```

Do not create optional files unless the task explicitly asks for them.

## Task

Review the Discord-to-Ship v1 workflow and improve it only where necessary to make the workflow executable, bounded, and easy to verify.

Focus on:

1. Clear command definitions
2. Clear required artifacts
3. A repeatable issue template
4. Codex prompt boundaries
5. Manual verification steps
6. Status report format

## Boundaries

Do not:

- Touch Bitcoin private keys
- Touch wallet seed phrases
- Touch Lightning seed material
- Touch Fedimint guardian secrets
- Add secrets
- Add API keys
- Modify production DNS
- Modify deployment configuration unless explicitly asked
- Create a bot framework
- Create a large multi-agent architecture
- Rewrite unrelated app code
- Introduce dependencies
- Add speculative product bloat

This is a documentation and workflow-hardening task.

## Step-by-Step Execution

1. Inspect `clanker_ops/inventory/systems.md`.
2. Inspect `clanker_ops/architecture/v1-architecture.md`.
3. Inspect `clanker_ops/workflows/discord-to-ship-v1.md`.
4. Confirm whether the workflow contains:
   - purpose
   - trigger
   - command set
   - workflow steps
   - required outputs
   - sample Discord input
   - GitHub issue template
   - verification checklist
   - safety boundaries
   - status report format
5. If any required section is missing, update the workflow doc.
6. Confirm this Codex prompt contains:
   - role
   - repo context
   - files to inspect
   - files to create/update
   - boundaries
   - task list
   - verification steps
   - expected final response format
7. Make only minimal edits needed to satisfy the checklist.
8. Do not modify unrelated files.

## Verification Steps

Manual checks:

```text
Confirm these files exist:
- clanker_ops/inventory/systems.md
- clanker_ops/architecture/v1-architecture.md
- clanker_ops/workflows/discord-to-ship-v1.md
- clanker_ops/prompts/codex/discord-to-ship-v1.md
```

Content checks:

```text
Confirm workflow doc includes:
- Purpose
- Trigger
- Command Set
- Workflow Steps
- Required Outputs
- Sample Discord Input
- GitHub Issue Template
- Verification Checklist
- Safety Boundaries
- Status Report Format
```

Boundary checks:

```text
Confirm no secrets were added.
Confirm no wallet/private-key files were modified.
Confirm no production DNS or deploy configuration was changed.
Confirm no large framework or bot scaffold was introduced.
```

## Expected Final Response Format

When finished, respond with:

```text
Discord-to-Ship v1 Codex run complete.

Changed files:
- <file path>: <brief description>

Verification:
- <check passed>
- <check passed>

Skipped:
- <anything intentionally not done>

Next action:
- <one concrete next step>
```

## First Manual Loop Completion Criteria

The first manual loop is complete when:

- The architecture inventory exists.
- The v1 architecture note exists.
- The workflow doc exists.
- The Codex prompt exists.
- GitHub issue #1 tracks the workflow.
- A status update is posted back to the operator channel.

## Operator Status Message

Use this after the first manual loop:

```text
Discord-to-Ship v1 is initialized and documented.

Created:
- clanker_ops/inventory/systems.md
- clanker_ops/architecture/v1-architecture.md
- clanker_ops/workflows/discord-to-ship-v1.md
- clanker_ops/prompts/codex/discord-to-ship-v1.md
- GitHub issue #1: Ship Discord-to-Ship v1 clanker workflow

Current state:
- Manual Discord → repo → issue → Codex loop is ready.

Next:
- Run this prompt through Codex and use issue #1 as the execution ledger.
```
