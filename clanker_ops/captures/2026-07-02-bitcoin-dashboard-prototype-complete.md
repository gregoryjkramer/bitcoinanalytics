# Capture — Bitcoin Dashboard Prototype Completed Locally

_Date: 2026-07-02_

## Milestone

Bitcoin dashboard prototype completed locally in Power BI Desktop.

## Local Power BI Artifact

- PBIX: `D:\1_github\bitcoinanalytics\artifacts\powerbi\bitcoin-status-prototype.pbix`
- Power BI Desktop window title observed: `bitcoin-status-prototype`
- Active local Analysis Services model: compatibility level `1600`

## Source CSV

- CSV: `D:\1_github\bitcoinanalytics\data\sample\bitcoin_status_observations.csv`
- Row captured:
  - `observation_utc`: `2026-07-02T19:45:00Z`
  - `source_system`: `manual_discord_status`
  - `node_sync_percent`: `100`
  - `is_node_synced`: `true`
  - `mempool_fee_sat_vb`: `42`
  - `lightning_channels_health`: `healthy`
  - `status_text`: `Bitcoin node is 100% synced; mempool pressure at 42 sat/vB; Lightning channels healthy`
  - `created_by`: `gregoryjkramer`

## Model Table

Table: `fact_bitcoin_node_status`

Columns:

- `observation_utc`
- `source_system`
- `node_sync_percent`
- `is_node_synced`
- `mempool_fee_sat_vb`
- `lightning_channels_health`
- `status_text`
- `created_by`

Measures:

- `Latest Observation UTC`
- `Latest Mempool Fee sat/vB`
- `Latest Node Sync %`
- `Node Synced Flag`
- `Lightning Healthy Flag`
- `Observation Count`

## Visible Report Items

Cards visible in the PBIX report definition:

- `Latest Node Sync %`
- `Latest Mempool Fee sat/vB`
- `Node Synced Flag`
- `Lightning Healthy Flag`
- `Observation Count`

Additional visible table visual:

- Table over `fact_bitcoin_node_status`, starting with `observation_utc` and `source_system`, for row-level status inspection.

## Current Prototype Values

Based on the source CSV row:

- Node sync: `100%`
- Node synced: `true`
- Mempool fee pressure: `42 sat/vB`
- Lightning channel health: `healthy`
- Observation count: `1`
- Latest observation: `2026-07-02T19:45:00Z`

## Next Action

Review the local PBIX in Power BI Desktop, confirm the card formatting and table layout, then publish or export the report artifact into the next repo-backed Power BI delivery format.
