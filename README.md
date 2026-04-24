<!-- repo-label: infrastructure -->
<!-- repo-class: canonical-invariant-substrate -->
<!-- repo-consumes: nothing (root of the DAG) -->
<!-- repo-consumed-by: any project (internal or external) that adopts Canon as its design substrate -->

# PlausiDen-Canon

> **Tier 1** in [`PlausiDen-Meta/PRIORITY.md`](https://github.com/thepictishbeast/PlausiDen-Meta/blob/main/PRIORITY.md).
> Built ahead of trigger 2026-04-24 — full scaffold exists; awaiting first production consumer
> UI work as the first concrete adoption. Until then, do not expand. See
> [`PRIORITY.md`](https://github.com/thepictishbeast/PlausiDen-Meta/blob/main/PRIORITY.md)
> for the trigger-promotion rule.
>
> The canonical invariant substrate for the PlausiDen ecosystem. Tokens,
> primitives, components, and contracts that every UI surface (and eventually
> every non-UI surface — APIs, errors, logs, CLI UX) must conform to.
> Enforcement lives in [PlausiDen-Audits](https://github.com/thepictishbeast/PlausiDen-Audits);
> harnesses live in [PlausiDen-Tests](https://github.com/thepictishbeast/PlausiDen-Tests);
> validation grading lives in [PlausiDen-AVP-Doctrine](https://github.com/thepictishbeast/PlausiDen-AVP-Doctrine).

## Why this exists

A design system that's only a "component library" rots immediately. What you
need is **five layers**, with enforcement at every boundary:

| Layer | What | Where |
|---|---|---|
| **1. Tokens** | Source-of-truth manifest of every color, spacing step, radius, font size, line-height, motion duration, z-index, breakpoint, touch-target min. | [`tokens/tokens.toml`](tokens/tokens.toml) |
| **2. Primitives** | Atomic renderers (`Box`, `Stack`, `Inline`, `Text`, `Pressable`). Nothing else touches the view tree directly. Accept only token-valued props. | [`adapters/<platform>/src/primitives/`](adapters/) |
| **3. Components** | Semantic wrappers (`Button`, `TextField`, `Dialog`, `LoginForm`). Composed only from primitives. Closed variant unions. | [`adapters/<platform>/src/components/`](adapters/) |
| **4. Contracts** | Machine-readable spec ("Button must have 44×44 touch target", "TextField must soft-wrap"). Platform-independent. Drives tests on every platform. | [`contracts/`](contracts/) |
| **5. Audits** | The enforcement engine. Crawls repos with tree-sitter, runs static rules + runtime checks + visual-regression, emits reports. | external — [`PlausiDen-Audits`](https://github.com/thepictishbeast/PlausiDen-Audits) |

## Layout

| Path | Purpose |
|---|---|
| [`DOCTRINE.md`](DOCTRINE.md) | The philosophy. Why Canon exists, the five-layer rule, the no-escape-hatch principle. |
| [`AVP-STATUS.md`](AVP-STATUS.md) | Current AVP tier-pass state. Auto-regenerated from [`integrations/avp.toml`](integrations/avp.toml). |
| [`tokens/tokens.toml`](tokens/tokens.toml) | The single source of truth. Humans only edit this. |
| [`tokens/schema.toml`](tokens/schema.toml) | Validates `tokens.toml` structure. CI gate. |
| [`tokens/generated/`](tokens/generated/) | Per-target constants (CSS / TS / Kotlin / Rust). **Committed.** CI asserts parity with `tokens.toml`. Drift = build failure. |
| [`contracts/`](contracts/) | Component contracts in TOML. Platform-agnostic. Consumed by Audits + Tests. |
| [`crates/token-forge/`](crates/token-forge/) | Rust CLI: `tokens.toml` → `tokens/generated/*`. |
| [`crates/canon-core/`](crates/canon-core/) | Shared trait defs: `Themed`, `Accessible`, `Pressable`. Used by Rust UI targets. |
| [`crates/canon-contract-types/`](crates/canon-contract-types/) | Rust types for contract YAML. Imported by `PlausiDen-Audits` so contract schema authority stays here. |
| [`adapters/react/`](adapters/react/) | Reference React implementation. Published as `@plausiden/canon-react`. |
| [`adapters/compose/`](adapters/compose/) | Android / Compose target. |
| [`adapters/iced/`](adapters/iced/) | Rust desktop UI target (iced). |
| [`adapters/egui/`](adapters/egui/) | Alt Rust UI target (egui). |
| [`integrations/audits.toml`](integrations/audits.toml) | Tells `PlausiDen-Audits` where to find this repo's contracts. |
| [`integrations/tests.toml`](integrations/tests.toml) | Tells `PlausiDen-Tests` how to parameterize generated tests. |
| [`integrations/avp.toml`](integrations/avp.toml) | Declares AVP tier targets + current pass state. |
| [`integrations/harvest.toml`](integrations/harvest.toml) | Candidates this repo proposes upstream to other doctrine repos. |
| [`integrations/consumer-corpus.toml`](integrations/consumer-corpus.toml) | Long-term consumer-corpus ingestion path (e.g., HDC drift detection, PSL soft rules — generic for any neurosymbolic-substrate consumer) |
| [`xtask/`](xtask/) | Repo-wide commands. `cargo xtask verify` runs token regen + audits + tests locally. |

## How a consumer adopts Canon

```jsonc
// package.json (React/TS consumer)
"dependencies": {
  "@plausiden/canon-react": "workspace:^"
},
"devDependencies": {
  "@plausiden/audits": "workspace:^",
  "@plausiden/tests-harness": "workspace:^"
}
```

CI step:

```sh
design-audit run --baseline .audit-baseline.json
```

New projects start with an empty baseline (error mode from day one). Existing
projects generate a baseline on first adoption, then violations decay per the
severity schedule in `PlausiDen-Audits`.

## MVP scope (this repo's v0.1)

Per the spec, Canon does NOT ship a 12-target component library on day one.
The fatal version is contracts for components nobody's built yet. v0.1 is
deliberately narrow:

- ✅ `tokens.toml` covering color / spacing / radius / typography / breakpoints / motion / z-index / touch-target
- ✅ `tokens/schema.toml` and CI parity check
- ✅ `token-forge` Rust CLI scaffold (generates CSS + TS; Kotlin/Rust placeholders)
- ✅ Contracts for `Button`, `TextField`, `Stack`, `Box`, `Text`, `Dialog` + cross-component `invariants.toml`
- ✅ React target scaffold with primitives signatures and the `Button` reference component
- 🚧 First production consumer: first production UI consumer (smallest surface available) — adoption gates the v0.1 → v0.2 graduation
- 🚧 Compose / iced / egui targets — stubs only, no real components
- 🚧 First contract-driven runtime test wired through `PlausiDen-Tests` — pending Tests v0.1

**Graduation rule:** no domain (and no target) graduates from "experimental" to
"normative" until at least one consumer has used it in production.

## Naming

"Canon" = the authoritative, canonical standard. A design system is literally
that — the single source of truth. Parallels [`PlausiDen-AVP-Doctrine`](https://github.com/thepictishbeast/PlausiDen-AVP-Doctrine)
(both are rule-bearing repos) without colliding semantically.

## License

[MIT](LICENSE).
