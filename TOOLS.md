# TOOLS.md — PlausiDen-Canon

Canonical command index. Canon defines invariants + shared types; depends on nothing.

> Cross-repo TOOLS reference: see [../PlausiDen-Forge/TOOLS.md](../PlausiDen-Forge/TOOLS.md).

---

## Canon operations

```
cargo build --workspace              Build the canon workspace (no external deps)
cargo test --workspace               Run canon tests
cargo doc --workspace --no-deps      Generate rustdoc for downstream consumers
```

Canon does not have a top-level CLI. Adding a CLI requires ecosystem-wide signoff per `AGENTS.md` § Rule 1.

---

## Cross-references

- `AGENTS.md` — repo orientation
- `../PlausiDen-Forge/PLAUSIDEN_ECOSYSTEM.md` — Canon is at the root of the DAG
- Memory: `[[iso-standards]]` — preference order ISO/IEC > RFC > W3C > IETF
