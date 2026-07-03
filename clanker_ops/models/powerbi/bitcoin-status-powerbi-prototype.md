# Bitcoin Status Power BI Desktop Prototype

_Last updated: 2026-07-03_

## 1. Purpose

Create a bounded Power BI Desktop prototype scaffold for manually importing the safe Bitcoin status sample CSV, adding core measures, and validating a one-page operational status report.

This prototype is documentation-first and source-controlled. It does not include a `.pbix` or `.pbit` file, live Bitcoin node connector, Lightning connector, secrets, wallet material, deployment configuration, or unrelated application code.

## 2. Source CSV Path

Use the existing safe sample CSV:

```text
data/sample/bitcoin_status_observations.csv
```

The CSV contains credential-free, manually normalized Bitcoin node, mempool, and Lightning status observations suitable for a local Power BI Desktop prototype.

## 3. Power BI Desktop Import Steps

1. Open Power BI Desktop.
2. Select **Get data** > **Text/CSV**.
3. Choose `data/sample/bitcoin_status_observations.csv` from the local repository clone.
4. Confirm that headers are detected.
5. Select **Transform Data**.
6. Rename the query/table to `fact_bitcoin_node_status`.
7. Apply the data types listed in this guide.
8. Select **Close & Apply**.
9. Create the measures from `clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax`.
10. Build the suggested one-page report layout and complete the validation checklist.

## 4. Expected Table Name

```text
fact_bitcoin_node_status
```

Use this exact table name so the DAX measures can be copied into Power BI Desktop without changing table references.

## 5. Required Data Types

| Column | Power BI data type |
|---|---|
| `observation_utc` | Date/Time/Timezone or Date/Time |
| `source_system` | Text |
| `node_sync_percent` | Decimal Number |
| `is_node_synced` | True/False |
| `mempool_fee_sat_vb` | Whole Number or Decimal Number |
| `lightning_channels_health` | Text |
| `status_text` | Text |
| `created_by` | Text |

## 6. Required Measures

Create these measures in Power BI Desktop from `clanker_ops/models/powerbi/dax/bitcoin-status-measures.dax`:

| Measure | Purpose |
|---|---|
| `Latest Observation UTC` | Returns the latest `observation_utc` in the fact table. |
| `Latest Node Sync %` | Returns `node_sync_percent` for the latest observation. |
| `Latest Mempool Fee sat/vB` | Returns `mempool_fee_sat_vb` for the latest observation. |
| `Node Synced Flag` | Returns the latest node synced boolean value. |
| `Lightning Healthy Flag` | Returns true when the latest Lightning channel health value is `healthy`. |
| `Observation Count` | Counts rows in `fact_bitcoin_node_status`. |

## 7. Suggested One-Page Report Layout

Create one simple report page with these visuals:

- Card: `Latest Node Sync %`
- Card: `Latest Mempool Fee sat/vB`
- Card: `Node Synced Flag`
- Card: `Lightning Healthy Flag`
- Card: `Latest Observation UTC`
- Table: raw observation row from `fact_bitcoin_node_status`

For the current sample, the cards should show a fully synced node, mempool fee pressure of `42` sat/vB, healthy Lightning status, and the sample observation timestamp.

## 8. Validation Checklist

- `fact_bitcoin_node_status` exists in the Power BI model.
- The table was imported from `data/sample/bitcoin_status_observations.csv`.
- All required columns are present.
- Required data types match this guide.
- All required measures are created.
- `Latest Observation UTC` returns the maximum observation timestamp.
- Latest-value measures return values from the row with the latest `observation_utc`.
- `Observation Count` equals the imported row count.
- The report page contains the five cards and raw observation table.
- No `.pbix`, `.pbit`, secrets, wallet material, Lightning files, live node connectors, DNS changes, deployment config, or unrelated app code were added to source control.

## 9. Save/Export Guidance

Power BI Desktop may be used locally to save a working `.pbix` during manual prototyping, but do not commit `.pbix` or `.pbit` files to this repository for this scaffold.

Only the markdown guide, DAX measure definitions, and Power Query sample belong in source control for this prototype package.

## 10. Out-of-Scope Boundaries

This prototype intentionally excludes:

- `.pbix` and `.pbit` binaries.
- Secrets and environment credentials.
- Bitcoin RPC credentials or live Bitcoin node connectors.
- Lightning macaroon files, TLS certificates, wallet material, seed phrases, channel backups, or live Lightning connectors.
- Private node hostnames, local network details, production DNS, and deployment configuration.
- Automated refresh, gateways, Fabric deployment, XMLA/TOM automation, and unrelated application code.
- Invented live data beyond the existing safe sample CSV.

## 11. Future PBIP/TMDL/Fabric Path

A future implementation can convert the validated Desktop prototype into source-controlled Power BI artifacts after security and refresh boundaries are designed:

1. Create a PBIP project from the manually validated prototype.
2. Represent table, column, and measure metadata in TMDL.
3. Land governed operational exports in Fabric, OneLake, or a controlled lakehouse table.
4. Add refresh orchestration only after gateway, credential, workspace, and data retention decisions are documented.
5. Use XMLA or TOM automation only after the model contract and deployment path are approved.
