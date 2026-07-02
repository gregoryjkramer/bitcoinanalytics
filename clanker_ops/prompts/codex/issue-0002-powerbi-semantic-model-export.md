# Codex Prompt — Issue 0002 — Bitcoin Status Power BI Semantic Model Export

_Last updated: 2026-07-02_

## Role

You are Codex working inside the Tenacious Data canonical repository.

Your task is to create a bounded v1 scaffold for turning Bitcoin/Lightning operational status observations into a Power BI semantic model export path.

Do not build a full production integration. Create the minimum repo-backed artifacts needed to make the concept concrete, reviewable, and ready for a later Power BI/Fabric implementation.

## Repository

```text
gregoryjkramer/bitcoinanalytics
```

## Context

Source Discord status:

```text
STATUS: Bitcoin node is 100% synced | mempool pressure at 42 sat/vB | Lightning channels healthy | Question: Give me a 60-second executive summary + 3 next actions + Codex-ready prompt to turn this into a live PowerBI semantic model export.
```

Strategic intent:

```text
Create a repeatable workflow that transforms Bitcoin node / mempool / Lightning status into a Power BI semantic model-ready export.
```

## Files to Inspect

Inspect these first:

```text
clanker_ops/inventory/systems.md
clanker_ops/architecture/v1-architecture.md
clanker_ops/workflows/discord-to-ship-v1.md
clanker_ops/captures/2026-07-02-bitcoin-status-powerbi-semantic-export.md
```

If any file is missing, report it and continue with available files.

## Files to Create

Create these files:

```text
clanker_ops/models/powerbi/bitcoin-status-semantic-model.md
data/sample/bitcoin_status_observations.csv
data/sample/README.md
```

Do not create app code yet unless explicitly requested.

## Required Content — Semantic Model Contract

In `clanker_ops/models/powerbi/bitcoin-status-semantic-model.md`, include:

1. Purpose
2. Grain
3. Source systems
4. Tables
5. Columns
6. Measures
7. Refresh assumptions
8. Security boundaries
9. Future PBIP/TMDL/XMLA/TOM path
10. Definition of done

Minimum model:

### Table: `fact_bitcoin_node_status`

Suggested columns:

```text
observation_utc
source_system
node_sync_percent
is_node_synced
mempool_fee_sat_vb
lightning_channels_health
status_text
created_by
```

### Table: `dim_metric`

Suggested rows:

```text
node_sync_percent
mempool_fee_sat_vb
lightning_channels_health
```

### Measures

Suggested measures:

```text
Latest Node Sync %
Latest Mempool Fee sat/vB
Node Synced Flag
Lightning Healthy Flag
Last Observation UTC
Observation Count
```

## Required Content — Sample Data

In `data/sample/bitcoin_status_observations.csv`, include a small safe sample based on the Discord status:

```csv
observation_utc,source_system,node_sync_percent,is_node_synced,mempool_fee_sat_vb,lightning_channels_health,status_text,created_by
2026-07-02T19:45:00Z,manual_discord_status,100,true,42,healthy,"Bitcoin node is 100% synced; mempool pressure at 42 sat/vB; Lightning channels healthy",gregoryjkramer
```

Do not include private node details or credentials.

## Required Content — Sample Data README

In `data/sample/README.md`, explain:

1. What sample files exist.
2. That sample data is safe and credential-free.
3. How it can later feed Power BI Desktop, PBIP, Fabric, or an automated export pipeline.
4. That live node integration is intentionally out of scope for this first commit.

## Boundaries

Do not:

- Add Bitcoin RPC credentials.
- Add Lightning macaroon files.
- Add wallet material.
- Add seed phrases.
- Add environment secrets.
- Modify production deployment config.
- Create a large framework.
- Create a real-time node connector yet.
- Create a Power BI file that requires proprietary binary tooling.
- Invent actual live node data beyond the supplied status message.

## Verification

Confirm:

```text
- clanker_ops/models/powerbi/bitcoin-status-semantic-model.md exists.
- data/sample/bitcoin_status_observations.csv exists.
- data/sample/README.md exists.
- No secrets are included.
- No production config changed.
- Sample data matches the supplied Discord status.
```

## Expected Final Response

Respond with:

```text
Issue 0002 Power BI semantic model export scaffold complete.

Changed files:
- <path>: <description>

Verification:
- <check passed>

Next action:
- Open the sample CSV in Power BI Desktop or use it as the source for a PBIP/TMDL semantic model prototype.
```
