# Codex Prompt — Issue 0004 — Power BI Desktop Prototype from Bitcoin Status Sample

_Last updated: 2026-07-02_

## Role

You are Codex working inside the Tenacious Data canonical repository.

Your task is to create a bounded Power BI Desktop prototype package from the existing safe sample CSV.

This is a documentation, DAX, and validation scaffold. Do not create a `.pbix` binary file. Do not create a live Bitcoin node connector. Do not add secrets.

## Repository

```text
gregoryjkramer/bitcoinanalytics
```

## Context

The repo already contains a completed v1 scaffold for turning Bitcoin/Lightning operational status observations into a Power BI semantic model-ready export.

Existing source file:

```text
data/sample/bitcoin_status_observations.csv
```

Existing model contract:

```text
clanker_ops/models/powerbi/bitcoin-status-semantic-model.md
```

Goal:

```text
Create the repo-backed guidance and DAX needed to manually build and validate the first Power BI Desktop semantic model prototype from the sample CSV.
```

## Files to Inspect

Inspect these first:

```text
clanker_ops/models/powerbi/bitcoin-status-semantic-model.md
data/sample/bitcoin_status_observations.csv
data/sample/README.md
```

If any file is missing, report it directly and continue with available files.

## Files to Create

Create these files:

```text
clanker_ops/models/powerbi/bitcoin-status-powerbi-prototype.md
clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax
clanker_ops/models/powerbi/power-query/bitcoin-status-sample-import.pq
```

## Required Content — Prototype Guide

In `clanker_ops/models/powerbi/bitcoin-status-powerbi-prototype.md`, include:

1. Purpose
2. Source CSV path
3. Power BI Desktop import steps
4. Expected table name
5. Required data types
6. Required measures
7. Suggested one-page report layout
8. Validation checklist
9. Save/export guidance
10. Out-of-scope boundaries
11. Future PBIP/TMDL/Fabric path

Expected table name:

```text
fact_bitcoin_node_status
```

Recommended Power BI data types:

| Column | Type |
|---|---|
| observation_utc | Date/Time/Timezone or Date/Time |
| source_system | Text |
| node_sync_percent | Decimal Number |
| is_node_synced | True/False |
| mempool_fee_sat_vb | Whole Number or Decimal Number |
| lightning_channels_health | Text |
| status_text | Text |
| created_by | Text |

Suggested one-page report:

- Card: Latest Node Sync %
- Card: Latest Mempool Fee sat/vB
- Card: Node Synced Flag
- Card: Lightning Healthy Flag
- Card: Last Observation UTC
- Table: raw observation row

## Required Content — DAX Measures

In `clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax`, include DAX for these measures:

```text
Latest Observation UTC
Latest Node Sync %
Latest Mempool Fee sat/vB
Node Synced Flag
Lightning Healthy Flag
Observation Count
```

Use table name:

```text
fact_bitcoin_node_status
```

Assume the table contains at least one row and may contain multiple future observations.

Prefer measures that identify the latest observation by `observation_utc`.

## Required Content — Power Query M

In `clanker_ops/models/powerbi/power-query/bitcoin-status-sample-import.pq`, include a Power Query M sample that imports:

```text
data/sample/bitcoin_status_observations.csv
```

The query should:

1. Read the CSV.
2. Promote headers.
3. Apply types.
4. Name the intended query/table `fact_bitcoin_node_status`.

Use a relative-path-friendly comment explaining that Power BI Desktop may require selecting the file manually depending on local clone location.

## Boundaries

Do not:

- Add `.pbix` files.
- Add `.pbit` files.
- Add secrets.
- Add Bitcoin RPC credentials.
- Add Lightning macaroon files.
- Add wallet material.
- Create a live node connector.
- Modify deployment config.
- Create unrelated app code.
- Invent additional live data.

## Verification

Confirm:

```text
- clanker_ops/models/powerbi/bitcoin-status-powerbi-prototype.md exists.
- clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax exists.
- clanker_ops/models/powerbi/power-query/bitcoin-status-sample-import.pq exists.
- DAX uses fact_bitcoin_node_status.
- Power Query references data/sample/bitcoin_status_observations.csv.
- No secrets or live node credentials are present.
```

## Expected Final Response

Respond with:

```text
Issue 0004 Power BI Desktop prototype scaffold complete.

Changed files:
- <path>: <description>

Verification:
- <check passed>

Next action:
- Open Power BI Desktop, import data/sample/bitcoin_status_observations.csv, create the measures from bitcoin-status-measures.dax, and validate the one-page prototype.
```
