# Codex Prompt — Issue 0009 — Convert Bitcoin Status Power BI Prototype to PBIP/TMDL Source-Control Format

_Last updated: 2026-07-03_

## Role

You are Codex working inside the Tenacious Data canonical repository.

Your task is to convert the locally completed Bitcoin status Power BI prototype into a clean, source-control-friendly Power BI project path using PBIP/TMDL artifacts where practical.

This is a bounded source-control conversion task. Do not create or commit new `.pbix` binaries. Do not create live Bitcoin node, Lightning, wallet, or Fabric production connectors.

## Repository

```text
gregoryjkramer/bitcoinanalytics
```

## Motivation

The local Power BI Desktop prototype has proven the first useful reporting loop for Bitcoin operational status:

```text
manual Bitcoin/Lightning status
→ normalized CSV
→ Power BI Desktop model
→ cards/table operational dashboard
→ source-controlled PBIP/TMDL-ready artifact
```

Squeeze Maxim:

> Because we are building what outlives the obituary.

The next step is to make the working prototype durable, reviewable, and reproducible in Git.

## Existing Context

Inspect these files first:

```text
clanker_ops/captures/2026-07-02-bitcoin-dashboard-prototype-complete.md
clanker_ops/models/powerbi/bitcoin-status-powerbi-prototype.md
clanker_ops/models/powerbi/bitcoin-status-semantic-model.md
clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax
data/sample/bitcoin_status_observations.csv
data/sample/README.md
```

Local prototype artifact referenced by the capture:

```text
artifacts/powerbi/bitcoin-status-prototype.pbix
```

Treat the PBIX as a local/manual reference artifact only unless repository policy explicitly allows committing it. The desired output is source-controlled text artifacts.

## Target Codex Prompt Path

```text
clanker_ops/prompts/codex/issue-0009-powerbi-pbip-tmdl-source-control.md
```

## Scope

Create or update a repo-backed PBIP/TMDL source-control package for the Bitcoin status Power BI prototype.

The package should document and/or scaffold:

1. PBIP/TMDL target layout.
2. Semantic model table metadata for `fact_bitcoin_node_status`.
3. Column definitions and intended data types.
4. Measure definitions matching the current DAX file.
5. Report/page intent for the existing operational cards and raw observation table.
6. Manual export instructions from Power BI Desktop into PBIP/TMDL format.
7. Validation checklist proving the source-controlled files match the local prototype.
8. Clear boundaries excluding secrets, live connectors, wallets, deployment credentials, and binary artifacts.

## Suggested Files to Create

Use the existing repo conventions. Prefer paths under `clanker_ops/models/powerbi/`.

Create these files unless a better existing convention is discovered during inspection:

```text
clanker_ops/models/powerbi/pbip/README.md
clanker_ops/models/powerbi/pbip/bitcoin-status-pbip-source-control-plan.md
clanker_ops/models/powerbi/tmdl/fact_bitcoin_node_status.tmdl
clanker_ops/models/powerbi/tmdl/measures.tmdl
clanker_ops/models/powerbi/tmdl/README.md
```

If valid PBIP/TMDL syntax cannot be produced confidently without Power BI Desktop export, create documented templates and mark them as manual-export scaffolds rather than pretending they are fully generated Power BI output.

## Required Content

### PBIP README

Include:

- Purpose.
- Relationship to the local PBIX prototype.
- Source CSV path.
- Expected table name.
- Expected report visuals.
- Manual export/import steps.
- Validation checklist.
- Out-of-scope boundaries.

### Source-Control Plan

Include:

- Current state.
- Target state.
- File inventory.
- Manual Power BI Desktop export path.
- How Codex should verify text artifacts.
- How a human should verify the PBIP/TMDL project in Power BI Desktop.

### TMDL Table Scaffold

Represent:

- Table: `fact_bitcoin_node_status`
- Columns:
  - `observation_utc`
  - `source_system`
  - `node_sync_percent`
  - `is_node_synced`
  - `mempool_fee_sat_vb`
  - `lightning_channels_health`
  - `status_text`
  - `created_by`

Include intended data types and source mapping from:

```text
data/sample/bitcoin_status_observations.csv
```

### TMDL Measures Scaffold

Represent measures from:

```text
clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax
```

Required measures:

```text
Latest Observation UTC
Latest Mempool Fee sat/vB
Latest Node Sync %
Node Synced Flag
Lightning Healthy Flag
Observation Count
```

## Acceptance Criteria

- [ ] Repo contains a PBIP/TMDL source-control plan for the Bitcoin status prototype.
- [ ] Repo contains TMDL-oriented scaffold files for `fact_bitcoin_node_status` and its measures, or a clearly documented reason why only templates were created.
- [ ] Existing sample CSV remains the only data source.
- [ ] Existing DAX measures are preserved or accurately mapped into the TMDL measure scaffold.
- [ ] Documentation explains how to export from the local PBIX/PBIP workflow without committing `.pbix` binaries.
- [ ] Documentation includes the Squeeze Maxim motivation.
- [ ] Documentation includes validation steps for both Codex/text review and human Power BI Desktop review.
- [ ] No secrets, Bitcoin RPC credentials, Lightning credentials, wallet material, `.env` files, or production deployment config are added.
- [ ] No unrelated application code is modified.

## Boundaries

Do not:

- Commit `.pbix`, `.pbit`, or other binary Power BI Desktop artifacts.
- Add live Bitcoin node connectors.
- Add Lightning macaroon files or credentials.
- Add wallet material.
- Add Fabric workspace, gateway, or deployment secrets.
- Modify unrelated app code.
- Invent production infrastructure.
- Replace the existing CSV-first prototype path unless the repo already contains a safer documented alternative.

## Verification

Run lightweight repo checks appropriate for the changed files.

At minimum, confirm:

```text
- New PBIP/TMDL documentation files exist.
- TMDL scaffolds reference fact_bitcoin_node_status.
- Measure scaffold includes all six required measures.
- Source path data/sample/bitcoin_status_observations.csv is referenced.
- No .pbix/.pbit/.env/secret files were added.
- git diff only includes intended Power BI source-control artifacts.
```

If no automated test exists for docs/TMDL scaffolds, state that and provide manual verification steps.

## Expected Final Response

Respond with:

```text
Issue 0009 PBIP/TMDL source-control conversion artifact complete.

Changed files:
- <path>: <description>

Verification:
- <check passed>

Notes:
- <manual Power BI Desktop verification required, if applicable>

Next action:
- Open Power BI Desktop, export/save the prototype using PBIP/TMDL workflow, then compare the generated files against the repo scaffold before replacing templates with first-class exported artifacts.
```
