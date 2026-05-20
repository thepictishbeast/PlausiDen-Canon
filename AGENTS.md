# AGENTS.md — PlausiDen-Canon

Orientation for any AI agent working in this repository. Read **before** writing code.

> Cross-repo orientation: see [../PlausiDen-Forge/PLAUSIDEN_ECOSYSTEM.md](../PlausiDen-Forge/PLAUSIDEN_ECOSYSTEM.md).

---

## RULE 0 — Canon is the root of the dependency DAG

Per `PLAUSIDEN_ECOSYSTEM.md`: Canon defines canonical invariants + shared types that *everything* depends on. Canon depends on **nothing**. Adding a dependency from Canon to another substrate repo is a doctrine violation; surface it via capability-request + ADR.

**Forbidden:**
- Imports from any other PlausiDen repo into Canon (one-way dependency only).
- Adding types here that are domain-specific to one consumer — Canon is platform-wide.
- Changing a canonical type without per-consumer signoff (Canon changes ripple).

**Canonical:**
- ULID + Ed25519 + RFC 3339 + ISO/IEC standards references live here.
- Root types (e.g. `TenantId`, `Slug`, `Origin`) referenced by every downstream crate.
- Per `[[iso-standards]]` memory: default to ISO/IEC standards (8601 dates, 25010 quality, 40500 WCAG, 27001 infosec, 9075 SQL); fall back to RFC/W3C/IETF.

---

## RULE 1 — Look before you add

1. Search the existing Canon types — most reusable shapes already exist.
2. Cross-reference the consumer that needs the type; if only one consumer would use it, the type belongs in that consumer's *-core crate, not in Canon.
3. Adding a type to Canon requires sign-off from every active consumer's owner.

---

## Cross-references

- `README.md` — Canon's repo-class declaration
- `PLAUSIDEN_ECOSYSTEM.md` — dependency direction (Canon is at the root)
- `PlausiDen-AVP-Doctrine/AGENTS.md` — doctrine repo orientation
- Memory: `[[iso-standards]]` — preference order ISO/IEC > RFC > W3C > IETF

---

## First steps

1. Confirm the type genuinely belongs in Canon (not in a *-core crate downstream).
2. Open an ADR per rule `docs-004`.
3. Get signoff from active consumers.
4. Bump Canon's schema_version per `VERSION_DISCIPLINE.md`.
