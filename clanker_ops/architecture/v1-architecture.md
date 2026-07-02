# Tenacious Data Sovereign Intelligence Platform v1 — Architecture

_Last updated: 2026-07-02_

## Executive Summary

Tenacious Data Sovereign Intelligence Platform v1 is an operator-driven AI workflow system. Its first useful form is not a large multi-agent swarm. Its first useful form is one reliable clanker that converts strategy and project chatter into durable artifacts: architecture notes, system inventory, GitHub issues, implementation checklists, Codex prompts, commits, pull requests, and deploy-ready changes.

The strategic bet is simple: in an AI-native world, user interfaces become cheaper, but owned data, trusted semantic context, workflow integration, and governed execution become more valuable.

## Desired Outcome

By end of 2026, build a functional, revenue-generating system with optionality across:

- SaaS
- Data licensing
- Sovereign data consulting
- Bitcoin analytics
- Power BI / Fabric / semantic layer implementation
- MCP/API-based data products

The internal north star is high optionality. The v1 operating requirement is much simpler: ship one reliable end-to-end clanker workflow today, then compound.

## Core Thesis

Traditional dashboards are no longer the highest-value software surface. AI systems can generate UI quickly. The durable advantage is the substrate beneath the UI:

1. Owned data
2. Governed data access
3. Semantic models
4. Context that machines can use safely
5. Repeatable workflows
6. Audit trails and decision logs
7. Trust boundaries around production systems and money

Tenacious Data should therefore bias toward data products, semantic infrastructure, MCP-accessible services, workflow automation, and consulting packages rather than dashboard-only delivery.

## v1 Architecture

```text
Discord / OpenClaw
    ↓
Tenacious Operator
    ↓
Capture + Normalize
    ↓
Repo-backed Markdown Notes
    ↓
GitHub Issue
    ↓
Implementation Checklist
    ↓
Codex Prompt
    ↓
Commit / PR / Deploy-ready Change
    ↓
Status Report Back to Discord
```

## System Components

### 1. Discord / OpenClaw Command Layer

Discord is the operating room. It is where rough ideas, strategic observations, commands, and workflow requests enter the system.

Discord is not the durable system of record. Valuable items must be pushed into GitHub as files, issues, checklists, prompts, or code.

### 2. Tenacious Operator

The first clanker is a single project operator.

Responsibilities:

- Maintain project inventory
- Capture architecture decisions
- Convert Discord discussion into GitHub issues
- Write implementation checklists
- Generate Codex prompts
- Produce deploy-ready changes
- Report status

Non-responsibilities:

- Holding private keys
- Managing wallet secrets
- Performing unsupervised financial actions
- Making production DNS changes without explicit approval
- Pretending uncertainty is certainty

### 3. GitHub Repository

GitHub is the durable backbone.

Initial repo:

```text
gregoryjkramer/bitcoinanalytics
```

Initial clanker operations tree:

```text
clanker_ops/
  inventory/
    systems.md
  architecture/
    v1-architecture.md
```

Future likely tree:

```text
clanker_ops/
  inventory/
    systems.md
    repos.md
    environments.md
    credentials-map.md
  architecture/
    v1-architecture.md
    aod-principles.md
    mcp-strategy.md
    semantic-layer-strategy.md
  decisions/
    decision-log.md
  workflows/
    discord-to-ship-v1.md
  prompts/
    codex/
      discord-to-ship-v1.md
  status/
    worklog.md
```

### 4. GitHub Issues

Issues are the execution ledger.

Each meaningful workflow should produce an issue with:

- Problem statement
- Scope
- Acceptance criteria
- Checklist
- Codex prompt
- Risk notes
- Definition of done

### 5. Codex Implementation Layer

Codex should receive bounded, specific prompts that include:

- Files to inspect
- Files to change
- Exact output expectation
- Tests or verification steps
- Commit message suggestion
- Out-of-scope boundaries

Codex should not be handed vague empire-building prompts. That is how you get a 2,000-line refactor from a robot with jazz hands.

### 6. Deployment Layer

The v1 deploy target still needs confirmation.

Candidates:

- Replit
- Azure App Service
- Static site / GitHub Pages
- Cloudflare-backed deployment
- Future Fabric/Azure-hosted service

The clanker workflow should support both:

- full deploy when deployment is wired and safe
- deployment-ready PR/commit when deployment is not yet automated

## v1 Command Set

| Command | Purpose | Durable Output |
|---|---|---|
| `/capture` | Convert a Discord idea/thread into a repo note | Markdown note |
| `/issue` | Convert note into GitHub issue | GitHub issue |
| `/checklist` | Turn issue into implementation checklist | Checklist in issue or file |
| `/prompt-codex` | Generate bounded implementation prompt | Prompt file / issue section |
| `/ship` | Produce code/docs/deploy-ready change | Commit / PR / deployment note |
| `/status` | Report current project state | Status note / Discord update |

## First End-to-End Workflow

### Name

Discord-to-Ship v1

### Trigger

A Discord message or ChatGPT project command containing strategic direction or implementation request.

### Flow

1. Capture the message.
2. Normalize it into a project note.
3. Update inventory or architecture docs if needed.
4. Create a GitHub issue.
5. Add checklist and acceptance criteria.
6. Add Codex prompt.
7. Commit artifacts.
8. Produce deployment or deployment-ready next step.

### Definition of Done

- `clanker_ops/inventory/systems.md` exists.
- `clanker_ops/architecture/v1-architecture.md` exists.
- A GitHub issue exists for the first workflow.
- The issue contains acceptance criteria, implementation checklist, and Codex prompt.
- The next execution step is unambiguous.

## Governance and Safety Boundaries

### Explicitly Forbidden Without Human Approval

- Bitcoin private key access
- Wallet seed handling
- Lightning seed handling
- Fedimint guardian secret handling
- Password/API key exposure
- Production DNS edits
- Irreversible financial actions
- Legal/tax filing submission
- Customer data mutation

### Allowed v1 Actions

- Create Markdown documentation
- Create GitHub issues
- Draft Codex prompts
- Draft implementation checklists
- Commit project docs
- Propose deployment steps
- Create deployment-ready artifacts

## Commercial Direction

Initial product directions worth testing:

1. Bitcoin analytics exposed through BI dashboards and MCP endpoints
2. Fabric/Power BI semantic-layer consulting with AI-agent integration
3. Application-owned-data architecture packages
4. Sovereign data operating room for small firms/family offices/Bitcoin-native businesses
5. Data licensing from curated Bitcoin/business intelligence models

## Immediate Next Action

Create the first GitHub issue for Discord-to-Ship v1 and use it as the execution ledger for the first end-to-end clanker workflow.

## Decision Log

- v1 starts with one operator, not twenty agents.
- GitHub is the durable system of record.
- Discord is the command layer.
- Codex is the bounded implementation worker.
- The product moat is owned data + semantic meaning + trusted execution, not UI alone.
