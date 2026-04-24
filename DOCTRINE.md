# Canon Doctrine

**Doctrine version:** 1.0
**Engine version:** independent — see [`Cargo.toml`](Cargo.toml).
**Status:** normative for every UI consumer in the PlausiDen ecosystem; aspirational for non-UI domains until at least one consumer adopts each.

This file is the *philosophy*. The *rules* derived from it live in
[`doctrine/`](doctrine/) as machine-readable TOML. The *enforcement* lives in
[`PlausiDen-Audits`](https://github.com/thepictishbeast/PlausiDen-Audits).

---

## Tenets

### 1. Tokens are the only source of truth.

A color, spacing step, radius, font size, line-height, motion duration,
z-index, breakpoint, touch-target — every visual or behavioral constant —
exists in exactly one place: [`tokens/tokens.toml`](tokens/tokens.toml).

Humans edit `tokens.toml`. Generated artifacts (`tokens/generated/*`) are
*committed* and CI-verified to match. A literal hex color in source code
is a doctrine violation.

### 2. Primitives are the only renderers.

Five primitives — `Box`, `Stack`, `Inline`, `Text`, `Pressable` — are the
only things that touch the underlying view tree (DOM, View hierarchy,
Compose tree, Rust UI node graph). Components compose primitives. A
component that reaches around them is a doctrine violation.

### 3. No escape hatches in the public API.

Components do not accept `style`, `className`, `sx`, `Modifier` (raw),
or any other prop that lets a caller bypass the design system. Closed
variant unions only. If a use case isn't covered, the answer is to
extend the variant union — never to escape it.

### 4. Contracts are platform-independent.

A contract describes what a component *must do*, not how. "Button must
trap focus when active." "TextField must soft-wrap at container width."
The contract lives in TOML. The implementation lives per-target. The
test suite is generated from the contract and parameterized over targets.

### 5. The five layers do not collapse.

Tokens → Primitives → Components → Contracts → Audits. Skipping the
contract layer because "we only have one target right now" is the
specific failure mode that turns a design system into a React-only
library with aspirations. The contract layer is what makes Canon
multi-target, not the existence of multiple targets.

### 6. Composition beats inheritance.

UI class hierarchies rot fast. Canon uses composition + capability
mixins:

- **TypeScript/React:** primitives + variant functions + behavioral
  hooks (`useFocusTrap`, `usePressable`, `useOverflowGuard`).
- **Rust:** traits (`Themed`, `Accessible`, `Pressable`) + derive
  macros that enforce the contract at compile time.
- **Kotlin/Compose:** sealed interfaces + `Modifier` chains as mixins
  (`Modifier.pressable()`, `Modifier.overflowSafe()`).

A component is a trait-bound thing that composes capability mixins and
renders only through primitives.

### 7. Runtime audits are where the actual bugs live.

Static linting catches API misuse. ~80% of "text running off,
too close together" failures only surface when pixels meet a viewport
with real content. Canon mandates runtime audit infrastructure
(Playwright + content-length matrix + viewport matrix) from v0.1, not
"once we get around to it." Skimping here is why most design systems
ship overflow bugs despite having a token system.

### 8. Baselines exist so existing repos aren't blocked.

Adoption gradient: first audit run on a consumer records every existing
violation into `.audit-baseline.json`. CI fails only on *new* violations.
Existing code is technical debt with a ledger, not a blocker. Severity
decay schedule promotes warns to errors over time.

### 9. Codemods over docs.

Every static rule ships an auto-fixer. Compliance must be cheaper than
the workaround, or the workaround wins. `canon fix` is one command;
reading a 40-page doc is not.

### 10. Self-application.

Canon audits Canon. The `tokens.toml` is validated against its own
schema. Rust primitives obey the contracts. The CLI UX itself obeys
the future CLI domain contracts. Eating your own dog food is the
difference between rules that work and rules that are aspirational.

### 11. Versioning is independent.

The Canon **doctrine** is versioned separately from the Canon **engine**
code. A consumer can be on engine v2.3.1 while tracking doctrine v1.7.
The doctrine version is what `harvest.toml` declares alignment with.
This lets the engine iterate for performance/bug fixes without forcing
a doctrine review on every patch.

### 12. One-consumer-in-production rule.

A new domain (UI, errors, logging, CLI UX, …) does not graduate from
*experimental* to *normative* until at least one production consumer
has adopted it. The domain list in [`README.md`](README.md) is a
destination, not a v0.1 checklist.

### 13. Deterministic enforcement, AI-drafted suggestions.

AI is useful for fuzzy/semantic judgments and code generation. AI is a
bad fit for hard invariants that can be checked deterministically. The
boundary: deterministic engine enforces; AI may *draft* contracts,
explain violations, or propose fix codemods, but never autonomously
mutate a baseline, waive a violation, or run as a CI gate.

---

## Anti-patterns (see also [`doctrine/anti-patterns.toml`](doctrine/anti-patterns.toml))

- **A `style` / `className` / `sx` / raw `Modifier` prop on a public component.** Doctrine violation #3.
- **A literal hex color, px value, or rem value anywhere outside `tokens/tokens.toml`.** Doctrine violation #1.
- **A component that wraps a raw DOM element directly.** Doctrine violation #2.
- **A test that runs against only one target when a contract exists.** Doctrine violation #4.
- **An AI-suggested rule shipped at `error` severity without a deterministic detector.** Doctrine violation #13.
- **A new domain shipped without a real consumer.** Doctrine violation #12.
- **A token rename that paralyzes downstream repos.** Versioning + codemods are the cure; surface is in [`integrations/avp.toml`](integrations/avp.toml).

---

## Maturity levels

Canon's own maturity is tracked in [`AVP-STATUS.md`](AVP-STATUS.md).
Consumer maturity is tracked per-consumer in their own `harvest.toml`.

| Tier | Criterion |
|---|---|
| **0 — Sketch** | Tokens defined, primitives exist, no contracts, no audits, no consumer. |
| **1 — Skeleton** | Contracts for the primitive set exist. Token regen CI gate active. One target builds. |
| **2 — MVP** | Static audit rules running against one consumer with a baseline. First codemod ships. |
| **3 — Adopted** | Two production consumers. Runtime audits (overflow, contrast, touch-target) green on both. |
| **4 — Multi-target** | Two targets pass the same contract suite. Cross-target visual regression matrix green. |
| **5 — Normative** | Doctrine version frozen. Harvest active. New consumers adopt at error mode from day one. |

---

## How to propose a doctrine change

1. Open a PR editing `DOCTRINE.md` and the relevant `doctrine/*.toml`.
2. Include the **why** in the PR body. Doctrine changes without rationale are rejected.
3. Reference any consumer evidence (real cases where the current doctrine bit you).
4. Bump the doctrine version in this file's header.
5. The PR runs the AVP doctrine-conformance + generality tiers
   ([`integrations/avp.toml`](integrations/avp.toml) declares the tier targets).
6. One maintainer ratifies. Merge requires the AVP tier passes.
