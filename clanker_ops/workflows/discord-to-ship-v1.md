# Discord-to-Ship v1 Workflow

_Last updated: 2026-07-02_

## Purpose

Discord-to-Ship v1 is the first practical Tenacious Data clanker workflow. It converts a Discord/OpenClaw message into durable project artifacts in GitHub, then prepares a bounded Codex implementation loop.

This is intentionally small. One useful operator first. No swarm circus.

## Operating Model

```text
Discord / OpenClaw message
    ↓
Tenacious Operator captures intent
    ↓
Repo-backed note or architecture update
    ↓
GitHub issue
    ↓
Implementation checklist
    ↓
Codex prompt
    ↓
Commit / PR / deploy-ready change
    ↓
Status report back to Discord
```

## Trigger

A Discord/OpenClaw message, ChatGPT project message, or manual instruction that includes one of the v1 command forms:

- `/capture`
- `/issue`
- `/checklist`
- `/prompt-codex`
- `/ship`
- `/status`

The command can be explicit or implied. For v1, these commands are manual conventions, not yet bot-enforced slash commands.

## Command Set

### `/capture`

**Purpose:** Convert raw discussion into a durable note.

**Input:** Rough Discord message, thread, screenshot summary, or spoken strategic direction.

**Output:** Markdown note or update to an existing Markdown file.

**Example:**

```text
/capture We need one hardcore clanker that turns Discord ideas into repo docs, GitHub issues, Codex prompts, and deployable work.
```

### `/issue`

**Purpose:** Convert captured intent into a GitHub issue.

**Required issue sections:**

- Objective
- Scope
- Acceptance criteria
- Implementation checklist
- Codex prompt or prompt link
- Boundaries
- Definition of done

### `/checklist`

**Purpose:** Convert an issue or architecture note into a concrete execution list.

**Output:** Checkbox list suitable for GitHub issue tracking.

### `/prompt-codex`

**Purpose:** Create a bounded implementation prompt for Codex.

**Required prompt sections:**

- Role
- Repository context
- Files to inspect
- Files to create/update
- Boundaries
- Step-by-step task list
- Verification steps
- Final response format

### `/ship`

**Purpose:** Move from plan to artifact.

**Allowed v1 outputs:**

- Markdown documentation commit
- GitHub issue update
- Codex prompt file
- Deployment-ready note
- Pull request, if branch workflow is required

**Not allowed in v1 without explicit approval:**

- Production DNS change
- Secret handling
- Wallet or private-key handling
- Financial account action
- Customer data mutation

### `/status`

**Purpose:** Report current state back to Discord/OpenClaw.

**Output:** Brief operational update with created artifacts, open issue, and next action.

## Workflow Steps

### Step 1 — Capture

Take the user/Discord message and extract:

- core objective
- desired outcome
- constraints
- urgency
- systems affected
- forbidden zones
- next artifact required

### Step 2 — Normalize

Translate the message into structured project language:

- problem statement
- decision or hypothesis
- target output
- measurable definition of done

### Step 3 — Write Repo Artifact

Create or update the relevant Markdown file under `clanker_ops/`.

Likely locations:

```text
clanker_ops/inventory/
clanker_ops/architecture/
clanker_ops/workflows/
clanker_ops/prompts/codex/
clanker_ops/status/
clanker_ops/decisions/
```

### Step 4 — Create GitHub Issue

Create a GitHub issue that becomes the execution ledger.

The issue must be specific enough that Codex or a human can act on it without a seance.

### Step 5 — Add Checklist

Add checkboxes for required deliverables.

Checklist items should be binary and observable.

Bad:

```text
- Improve the system.
```

Good:

```text
- Create clanker_ops/workflows/discord-to-ship-v1.md.
- Create clanker_ops/prompts/codex/discord-to-ship-v1.md.
```

### Step 6 — Generate Codex Prompt

Write a bounded prompt that tells Codex exactly:

- what repo it is in
- what files already exist
- what files to inspect
- what files to create/update
- what not to touch
- how to verify the result

### Step 7 — Ship Artifact

For v1, shipping can mean any of:

- direct commit to `main`
- branch + PR
- deploy-ready artifact
- issue update proving the loop completed

### Step 8 — Report Status

Post a short status update back to Discord/OpenClaw or the current ChatGPT project thread.

## Required Outputs

A complete run should produce at least one of each:

1. Repo-backed Markdown artifact
2. GitHub issue or issue update
3. Implementation checklist
4. Codex-ready prompt
5. Status report

## Sample Discord Input

```text
/ship
Project: Tenacious Data Sovereign Intelligence Platform v1
Desired Outcome: Functional, revenue-generating clanker system that adds serious SaaS + data licensing + sovereign consulting optionality by EOY 2026.
Current Next Action:
Document current architecture + inventory every repo/target.
Define v1 Clanker command set.
Ship the first end-to-end workflow today.
```

## Expected Output Artifacts

```text
clanker_ops/inventory/systems.md
clanker_ops/architecture/v1-architecture.md
clanker_ops/workflows/discord-to-ship-v1.md
clanker_ops/prompts/codex/discord-to-ship-v1.md
GitHub issue: Ship Discord-to-Ship v1 clanker workflow
```

## GitHub Issue Template

```markdown
# <Workflow or Task Name>

## Objective

<One paragraph describing the result.>

## Context

<Relevant project facts, decisions, and constraints.>

## Scope

### In Scope

- <Item>

### Out of Scope

- <Item>

## Acceptance Criteria

- [ ] <Observable deliverable>
- [ ] <Observable deliverable>

## Implementation Checklist

- [ ] <Step>
- [ ] <Step>

## Codex Prompt

```text
<Role, repo context, files, boundaries, tasks, verification, final response format.>
```

## Safety Boundaries

- <Forbidden action>

## Definition of Done

- <What must exist or be true when complete.>
```

## Verification Checklist

Before calling the workflow complete:

- [ ] At least one repo artifact was created or updated.
- [ ] A GitHub issue exists or was updated.
- [ ] The issue has acceptance criteria.
- [ ] The issue has an implementation checklist.
- [ ] A Codex prompt exists in the issue or in `clanker_ops/prompts/codex/`.
- [ ] Safety boundaries are explicit.
- [ ] The final status report includes changed files and next action.

## Safety Boundaries

The workflow must not touch:

- Bitcoin private keys
- Wallet seed phrases
- Lightning seed material
- Fedimint guardian secrets
- API keys
- Passwords
- Production DNS
- Financial accounts
- Legal filings
- Tax filings
- Customer data mutations

## Status Report Format

```text
Discord-to-Ship v1 status:

Created/Updated:
- <file or issue>

Issue:
- <issue title and number>

Current state:
- <one sentence>

Next action:
- <one concrete step>
```

## First Manual Run Status

```text
Discord-to-Ship v1 status:

Created/Updated:
- clanker_ops/inventory/systems.md
- clanker_ops/architecture/v1-architecture.md
- clanker_ops/workflows/discord-to-ship-v1.md
- clanker_ops/prompts/codex/discord-to-ship-v1.md
- GitHub issue #1: Ship Discord-to-Ship v1 clanker workflow

Current state:
- The first manual Discord → repo → issue → Codex loop is documented and ready to execute through Codex.

Next action:
- Run the Codex prompt in clanker_ops/prompts/codex/discord-to-ship-v1.md against the repo and verify no scope creep.
```
