# PlausiDen-Canon — vision document

> "If PlausiDen-Canon was already built and did everything we
> wanted, what would this doc say?"

This is that doc. **[shipped]** works today. **[in-flight]** is
mid-build. **[queued]** has a task ID. **[concept]** has been
implied or requested and a developer should design it.

Companion to: [LOOM_VISION](https://github.com/thepictishbeast/PlausiDen-Loom/blob/main/docs/LOOM_VISION.md),
[CMS_VISION](https://github.com/thepictishbeast/PlausiDen-CMS/blob/main/docs/CMS_VISION.md),
[FORGE_VISION](https://github.com/thepictishbeast/PlausiDen-Forge/blob/main/docs/FORGE_VISION.md),
[CRAWLER_VISION](https://github.com/thepictishbeast/PlausiDen-Crawler/blob/master/docs/CRAWLER_VISION.md),
[ANNOTATOR_VISION](https://github.com/thepictishbeast/PlausiDen-Annotator/blob/master/docs/ANNOTATOR_VISION.md),
[AVP_DOCTRINE_VISION](https://github.com/thepictishbeast/PlausiDen-AVP-Doctrine/blob/main/docs/AVP_DOCTRINE_VISION.md),
OXIDIZER_VISION (in PlausiDen-Oxidizer scaffold).

---

## 1. What PlausiDen-Canon IS

**Tier-1 canonical invariant substrate for the entire PlausiDen
ecosystem.** Not just a design system — the source-of-truth
specification for every primitive, every contract, every
invariant that any UI surface (and eventually every non-UI
surface — APIs, errors, logs, CLI UX) must conform to.

Five layers, with enforcement at every boundary:

| Layer | What | Where |
|---|---|---|
| **1. Tokens** | Source-of-truth manifest of every colour, spacing step, radius, font size, line-height, motion duration, z-index, breakpoint, touch-target min | `tokens/tokens.toml` |
| **2. Primitives** | Atomic renderers (`Box`, `Stack`, `Inline`, `Text`, `Pressable`). Nothing else touches the view tree directly. Token-valued props only. | `adapters/<platform>/src/primitives/` |
| **3. Components** | Semantic wrappers (`Button`, `TextField`, `Dialog`, `LoginForm`). Composed only from primitives. Closed variant unions. | `adapters/<platform>/src/components/` |
| **4. Compositions** | Larger patterns (auth flow, payment flow, settings page) composed only from components. | (queued) |
| **5. Patterns** | Cross-cutting invariants (error-handling, loading-state, empty-state, focus-management). | (queued) |

Operational structure: `tokens/`, `adapters/`, `crates/`,
`contracts/`, `integrations/`, `doctrine/`, `harvest.toml`.

PlausiDen-Canon is **not**:

- A component library you `npm install` (the contracts come
  first; per-platform adapters render them)
- Bound to one rendering target (web, native, CLI, even
  print-stylesheet adapters all consume the same tokens)
- A theme marketplace (themes are typed token sets with
  enforcement, not plugin chrome)
- The same as Loom (Loom is the Rust render layer for web;
  Canon is the cross-platform substrate Loom-the-render-layer
  conforms to)

Canon's contract: every PlausiDen UI surface (Loom-rendered
sites, Forge-built bundles, Sentinel GUIs, CMS admin portals,
Salesman dashboards, Annotator panels) reads the same tokens,
uses the same primitives, exposes the same component variants.
Drift surfaces as Canon-conformance findings.

## The meta-mission: making AI-built UI reliable

Canon is **the typed-substrate that makes agentic UI work
deterministic.** An AI agent rendering a Button can ONLY pick a
variant from the closed enum — not "red-ish" or "primary-ish"
but `Variant::Primary | Secondary | Ghost`. An AI agent setting
spacing can ONLY pick a token (`SpaceStep::S2 | S3 | S4 | …`),
not a magic number. An AI agent rendering text can ONLY pick a
type-scale step, not an arbitrary px size.

Without Canon: agents drift toward "looks ok in the screenshot"
which means subtle inconsistency across pages.
With Canon: every agent edit either conforms to the typed
substrate or fails to compile.

## 2. Personas

### 2.1 Mom — non-technical client

What Mom gets: every PlausiDen-served site she touches has the
SAME visual + interaction grammar. The Save button on her bakery
site looks and behaves identically to the Save button on her
knitting club's CMS admin. Canon is why.

### 2.2 The technical client

What they get today:

- **`tokens/tokens.toml`** as language-neutral JSON they can
  consume from any frontend — Rust, TS, Swift, Kotlin, …
- **Per-platform adapters** rendering the same contract.
- **AVP-STATUS.md** showing the current tier + remaining gaps.

What they get next:

- **Custom token-set overrides** that still pass Canon
  conformance (their brand colours layer over the spacing /
  radius / motion canonical values).
- **Per-platform adapter authoring guide** — write your own
  for a platform Canon doesn't ship.
- **Brand-derived auto-palette** — single brand colour →
  WCAG-AAA-clean token set automatically.

### 2.3 The developer / contributor

What they get today:

- **Five-layer contract** with enforcement at every boundary.
- **Closed variant unions on every primitive + component** —
  drift is a compile error.
- **Cross-platform adapter pattern** — same contract, different
  render targets.
- **Doctrine + AVP-STATUS** showing what's stable vs in-flight.

What developers want next:

- **Layer 4 (Compositions) implementation** — auth flow / payment
  flow / settings page as typed compositions.
- **Layer 5 (Patterns) implementation** — error / loading / empty
  / focus-management as cross-cutting invariants.
- **Conformance gate in Forge** (`phase_canon_conformance`).
- **Visual-regression integration with Crawler** — every Canon
  primitive rendered into a snapshot grid; Crawler verifies
  per-platform parity.
- **Differential renderer** — render same composition via two
  adapters, diff the typed output for cross-platform parity.

### 2.4 Claude Code (and other autonomous agents)

What an agent gets today:

- **Typed contracts in every adapter** — agent picks from closed
  enums, can't accidentally invent a new variant.
- **Token manifest as JSON** — agent can read every token without
  parsing CSS.
- **Per-component documentation** — every variant + slot + state
  is enumerated for the agent to choose from.

What agents want next:

- **MCP server exposing Canon queries** — `list_tokens`,
  `list_primitives`, `list_components`, `get_variant_for_use_case`.
- **Per-platform compliance score** — agent sees how
  conformant the rendered output is.
- **Auto-suggest the closest Canon match** — agent describes the
  intent ("a primary action button"), Canon returns the typed
  ButtonVariant::Primary spec.
- **Cross-platform render preview** — agent renders the same
  Canon composition across web / native / CLI to see how it
  manifests in each.

## 3. Capability map

| Capability | Status |
|---|---|
| Layer 1 — Tokens (`tokens/tokens.toml`) | shipped |
| Layer 2 — Primitives (per-platform adapters) | shipped (web), in-flight (others) |
| Layer 3 — Components (per-platform adapters) | shipped (web), in-flight (others) |
| Layer 4 — Compositions (auth / payment / settings) | queued |
| Layer 5 — Patterns (error / loading / empty / focus) | queued |
| Cross-platform adapter pattern | shipped |
| Closed variant unions enforced at compile time | shipped (web) |
| Per-platform conformance status (`AVP-STATUS.md`) | shipped |
| Custom token-set overrides | concept |
| Brand-derived auto-palette | concept |
| Forge `phase_canon_conformance` | concept |
| Crawler visual-regression of every primitive | concept |
| Differential renderer (cross-platform parity) | concept |
| MCP server for agent queries | concept |
| `loom doctor` integration (per-site Canon score) | concept |
| Multi-platform extends (native iOS / Android / desktop GTK / CLI / print) | partial |

## 4. Architecture

```
┌────────────────── PlausiDen-Canon ──────────────────┐
│                                                       │
│  Layer 1: Tokens (tokens/tokens.toml)                │
│      ↓                                                │
│  Layer 2: Primitives (Box, Stack, Inline, Text, …)   │
│      ↓                                                │
│  Layer 3: Components (Button, Dialog, LoginForm)     │
│      ↓                                                │
│  Layer 4: Compositions (auth, payment, settings)     │
│      ↓                                                │
│  Layer 5: Patterns (error, loading, empty, focus)    │
│                                                       │
└───────────────────────────────────────────────────────┘
       │                       │                  │
       ▼                       ▼                  ▼
   Web adapter            Native adapter      CLI adapter
   (Loom-rendered)        (PlausiDen-OS-     (consumed by
                           for-Mobile,         every PlausiDen
                           PlausiDen-Desktop)  CLI)
       │                       │                  │
       └────────────┬──────────┴──────────────────┘
                    ▼
           Forge phase_canon_conformance
           (verifies every rendered surface)
```

## 5. Roadmap

### Sprint 1 — close Layer 4 + Layer 5 across web

- Layer 4 compositions: auth flow, payment flow, settings page
- Layer 5 patterns: error, loading, empty, focus-management
- Forge `phase_canon_conformance` (initial version)

### Sprint 2 — multi-platform + conformance gates

- Native adapters (iOS / Android / GTK desktop)
- CLI adapter (typed terminal UI per Canon)
- Crawler visual-regression integration

### Sprint 3 — agent + custom-brand tier

- MCP server (`canon` namespace)
- Custom token-set overrides with conformance preservation
- Brand-derived auto-palette (single colour → WCAG-AAA)
- Differential renderer (cross-platform parity)

## 6. Acceptance criteria for "done"

1. Every PlausiDen UI surface — web (Loom-rendered), native
   (PlausiDen-Android / Desktop), CLI (every PlausiDen CLI),
   admin portal (CMS) — passes Canon conformance.
2. Every primitive + component is enumerated — closed variant
   unions, no string-blindness.
3. An agent rendering ANY UI element ONLY picks from typed
   token / variant enums; out-of-bound choices are compile errors.
4. Custom brand overrides preserve conformance — bakery brand
   colours stay accessible in dark mode automatically.
5. Cross-platform parity is mechanically verifiable — same Canon
   composition renders consistently across web / native / CLI.
6. The five-layer enforcement gate runs in CI for every PlausiDen
   repo via Forge `phase_canon_conformance`.
