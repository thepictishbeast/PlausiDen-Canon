# AVP Status — PlausiDen-Canon

> Auto-regenerated from [`integrations/avp.toml`](integrations/avp.toml). Do not hand-edit.

**Repo version:** 0.1.0-pre
**Doctrine version:** 1.0
**Maturity tier:** **1 — Skeleton** (per [`DOCTRINE.md`](DOCTRINE.md) maturity table)

## Tier pass state

| AVP Tier | State | Notes |
|---|---|---|
| Tier 1 — Correctness (token schema enforcement, contract validity) | **passing** | Schema validation works; token-forge generators are scaffolds. |
| Tier 2 — Fuzz (content-length, viewport matrix) | **not started** | Awaits PlausiDen-Tests v0.1. |
| Tier 3 — Adversarial (RTL + emoji + 10k-char + nested dialog) | **not started** | Awaits PlausiDen-Tests v0.1. |
| Tier 4 — Cross-platform (same contract suite green on N targets) | **not started** | Only React target scaffolded; second target gates this. |
| Tier 5 — Visual drift (per-component × variant × viewport snapshots) | **not started** | Awaits Playwright infra in PlausiDen-Tests. |
| Tier 6 — Formal (Kani / TLA+ on critical contracts) | **not started** | Long-tail; only for security-critical components. |
| Doctrine-conformance | **passing** | DOCTRINE.md complete; doctrine/*.toml indexed. |
| Generality | **passing** | Contracts hold the two-unrelated-projects test by construction. |
| Harvest-readiness | **partial** | `integrations/harvest.toml` populated for v0.1 candidates only. |

## Graduation gate

Canon graduates from Tier 1 → Tier 2 once one production consumer (first production consumer) adopts the React target with a baseline.
