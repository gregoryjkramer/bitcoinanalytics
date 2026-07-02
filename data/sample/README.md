# Sample Data

_Last updated: 2026-07-02_

## Files

| File | Description |
|---|---|
| `bitcoin_status_observations.csv` | Safe sample Bitcoin node, mempool, and Lightning status observation for the Power BI semantic model scaffold. |

## Safety

The sample data is credential-free and safe for source control. It contains only a manually normalized operational status observation derived from the supplied Discord status message.

It does not include:

- Bitcoin RPC credentials.
- Lightning macaroon files.
- Wallet material.
- Seed phrases.
- Private node hostnames or local network details.
- Environment secrets.
- Production deployment configuration.

## Future Power BI Use

The CSV can later feed:

1. Power BI Desktop as a manual import source.
2. A PBIP project as a source-controlled semantic model prototype.
3. TMDL table, column, and measure definitions.
4. Microsoft Fabric or OneLake as a landing table for a governed semantic model.
5. An automated export pipeline after live source, credential, gateway, and refresh boundaries are explicitly designed.

## Out of Scope

Live Bitcoin node integration, Lightning integration, credential handling, production refresh automation, and proprietary Power BI binary artifacts are intentionally out of scope for this first commit.
