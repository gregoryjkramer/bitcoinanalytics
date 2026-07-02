# Bitcoin Status Power BI Semantic Model Contract

_Last updated: 2026-07-02_

## 1. Purpose

Define a bounded v1 semantic model scaffold for converting Bitcoin node, mempool, and Lightning operational status observations into a Power BI-ready export shape.

This contract is intentionally documentation-first. It makes the model grain, columns, measures, security boundaries, and future Power BI implementation path reviewable before any live node connector, Fabric pipeline, PBIP project, TMDL model, XMLA automation, or TOM automation is built.

## 2. Grain

One row in `fact_bitcoin_node_status` represents one timestamped operational status observation from an approved source system.

For v1, the only sample observation is manually derived from the supplied Discord status message:

```text
Bitcoin node is 100% synced; mempool pressure at 42 sat/vB; Lightning channels healthy
```

## 3. Source Systems

| Source system | v1 status | Notes |
|---|---:|---|
| `manual_discord_status` | Included | Safe, manually normalized status from Discord/OpenClaw context. |
| Bitcoin node RPC | Out of scope | No RPC endpoint, credentials, hostnames, or live node details are included. |
| Lightning / LND | Out of scope | No macaroon files, TLS certs, channel backup data, wallet material, or live Lightning connector is included. |
| Power BI / Fabric | Future | The v1 files can later be imported or converted into PBIP/TMDL/Fabric artifacts. |

## 4. Tables

### Table: `fact_bitcoin_node_status`

Fact table containing timestamped Bitcoin operational status observations.

### Table: `dim_metric`

Small descriptive metric dimension for the status fields tracked by the v1 scaffold.

Suggested rows:

| metric_key | metric_name | description |
|---|---|---|
| `node_sync_percent` | Node Sync Percent | Percentage synced value for the observed Bitcoin node status. |
| `mempool_fee_sat_vb` | Mempool Fee sat/vB | Observed mempool fee pressure in satoshis per virtual byte. |
| `lightning_channels_health` | Lightning Channels Health | Categorical health state for Lightning channels. |

## 5. Columns

### `fact_bitcoin_node_status`

| Column | Type | Required | Description |
|---|---|---:|---|
| `observation_utc` | datetime | Yes | UTC timestamp when the status observation was captured or normalized. |
| `source_system` | text | Yes | Source label for the observation, such as `manual_discord_status`. |
| `node_sync_percent` | decimal | Yes | Bitcoin node sync percentage from the observation. |
| `is_node_synced` | boolean | Yes | True when the node is considered fully synced for reporting purposes. |
| `mempool_fee_sat_vb` | integer | Yes | Observed mempool fee pressure in sat/vB. |
| `lightning_channels_health` | text | Yes | Safe categorical Lightning channel health label, such as `healthy`. |
| `status_text` | text | Yes | Human-readable status summary. Must not include secrets or private node details. |
| `created_by` | text | Yes | Human or system that created the normalized observation. |

### `dim_metric`

| Column | Type | Required | Description |
|---|---|---:|---|
| `metric_key` | text | Yes | Stable key used by model documentation and future transformations. |
| `metric_name` | text | Yes | Display name for report users. |
| `description` | text | Yes | Business definition for the metric. |

## 6. Measures

Suggested DAX measure names for a later Power BI semantic model:

| Measure | Definition intent |
|---|---|
| `Latest Node Sync %` | Return `node_sync_percent` for the latest `observation_utc`. |
| `Latest Mempool Fee sat/vB` | Return `mempool_fee_sat_vb` for the latest `observation_utc`. |
| `Node Synced Flag` | Return the latest `is_node_synced` value as a report-friendly flag. |
| `Lightning Healthy Flag` | Return true when the latest `lightning_channels_health` is `healthy`. |
| `Last Observation UTC` | Return the maximum `observation_utc`. |
| `Observation Count` | Count rows in `fact_bitcoin_node_status`. |

## 7. Refresh Assumptions

- v1 refresh is file-based and manual.
- The sample CSV is safe to open in Power BI Desktop.
- Future refresh may use a controlled export job, Fabric pipeline, OneLake/Lakehouse table, PBIP source file, or XMLA/TOM deployment path.
- Live Bitcoin node and Lightning integration are intentionally excluded from this scaffold.

## 8. Security Boundaries

This scaffold must not contain:

- Bitcoin RPC credentials.
- Lightning macaroon files.
- Wallet material.
- Seed phrases.
- Private node hostnames or local network details.
- Environment secrets.
- Production DNS or deployment configuration.
- Customer or financial account data.

Only normalized, credential-free operational status observations are allowed.

## 9. Future PBIP/TMDL/XMLA/TOM Path

A later implementation can convert this scaffold into one of the following source-controlled Power BI paths:

1. Import `data/sample/bitcoin_status_observations.csv` into Power BI Desktop for manual prototyping.
2. Create a PBIP project and map the CSV or a generated export table into a semantic model.
3. Represent table, column, relationship, and measure definitions in TMDL.
4. Automate semantic model deployment through XMLA endpoints or TOM after workspace, gateway, and credential boundaries are explicitly designed.
5. Replace the sample CSV with a safe export pipeline from a controlled operational data store, not direct wallet or node secret access.

## 10. Definition of Done

The v1 scaffold is done when:

- `clanker_ops/models/powerbi/bitcoin-status-semantic-model.md` exists and documents the model contract.
- `data/sample/bitcoin_status_observations.csv` exists with the safe supplied status observation.
- `data/sample/README.md` explains sample safety, intended use, and live integration boundaries.
- No secrets, wallet material, Lightning files, DNS changes, deployment config changes, or unrelated app code are included.
- The sample data matches the supplied Discord status.
