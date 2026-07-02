# Capture — Bitcoin Status to Power BI Semantic Model Export

_Date: 2026-07-02_

## Source

Discord / OpenClaw manual clanker loop.

## Raw Input

```text
STATUS: Bitcoin node is 100% synced | mempool pressure at 42 sat/vB | Lightning channels healthy | Question: Give me a 60-second executive summary + 3 next actions + Codex-ready prompt to turn this into a live PowerBI semantic model export.
```

## Normalized Intent

Convert a Bitcoin operational status message into a practical Power BI semantic model export workflow.

The user wants:

1. A short executive summary.
2. Three next actions.
3. A Codex-ready implementation prompt.
4. A path toward a live Power BI semantic model export.

## 60-Second Executive Summary

The Bitcoin infrastructure is ready enough to become a data product input. The node is fully synced, the mempool has meaningful fee pressure, and Lightning channels are healthy. That means the next move is not more node babysitting. The next move is to export a small, trusted operational dataset from the Bitcoin/Lightning stack into a model-friendly shape, then turn that into a Power BI semantic model artifact that can be versioned, refreshed, and eventually exposed through Tenacious Data as a sovereign intelligence product.

Start narrow: node status, fee pressure, channel health, and timestamped observations. Do not attempt a full Bitcoin analytics warehouse yet. Build one clean status fact table, one metrics dimension, and one Power BI-ready export path. If that works, expand into mempool trends, channel liquidity, block stats, and eventually MCP-accessible analytics.

## Three Next Actions

1. **Define the minimum semantic model.**
   - Fact table: `fact_bitcoin_node_status`
   - Dimensions: `dim_metric`, `dim_source`, `dim_time`
   - Measures: latest fee rate, node sync status, channel health flag, observation count, last refresh timestamp

2. **Create a repo-backed export artifact.**
   - Add a small sample dataset under `data/sample/bitcoin_status.csv` or JSON.
   - Add a model contract under `clanker_ops/models/powerbi/bitcoin-status-semantic-model.md`.
   - Keep secrets and node credentials out of the repo.

3. **Generate and run a Codex prompt.**
   - Ask Codex to create the sample export files, model contract, and a README describing how this becomes PBIP/TMDL or XMLA/TOM later.
   - Keep implementation bounded to documentation and sample export scaffolding first.

## Recommended v1 Approach

Do not try to live-wire the Bitcoin node directly into Power BI today.

The v1 path should be:

```text
Bitcoin/Lightning status observation
→ normalized status record
→ sample CSV/JSON export
→ semantic model contract
→ Power BI project/PBIP or TMDL/TOM implementation later
```

This keeps the first product loop safe, testable, and source-control friendly.

## Safety Boundaries

Do not include:

- RPC credentials
- wallet credentials
- node private information
- Lightning macaroon files
- seed phrases
- channel backup files
- local network secrets
- production DNS changes
- automated financial actions

## Durable Outputs Requested

- GitHub issue for the Power BI semantic model export workflow.
- Codex prompt for implementation.
- Status report back to Discord.
