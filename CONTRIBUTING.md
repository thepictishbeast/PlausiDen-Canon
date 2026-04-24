# Contributing to PlausiDen-Canon

## Before you propose anything

Read [`DOCTRINE.md`](DOCTRINE.md). Every change must align with one of the 13 tenets, OR explicitly propose a doctrine amendment (with rationale).

## Tokens (`tokens/tokens.toml`)

1. Edit `tokens/tokens.toml`.
2. Run `cargo run -p token-forge -- validate` (schema check).
3. Run `cargo run -p token-forge -- regenerate` (rebuild generated/*).
4. Commit `tokens/tokens.toml` AND `tokens/generated/*`.
5. CI runs `token-forge verify` and rejects if generated/* doesn't match.

## Contracts (`contracts/<component>.toml`)

1. Add or edit the relevant TOML file.
2. Every behavior MUST declare: `id`, `description`, `detector`, `severity`, `waivable`, `rationale`.
3. Update `integrations/audits.toml` if you added a new contract file.
4. PlausiDen-Audits' canon rule pack will need an enforcer added before the rule activates in CI.

## Primitives & Components (`targets/<target>/src/`)

1. New components MUST satisfy an existing contract (`canon.<name>.v1`).
2. Public API MUST NOT include `style` / `className` / `Modifier`-raw escape hatches.
3. Variants only via discriminated union / sealed types.

## Doctrine changes

1. Open a PR editing `DOCTRINE.md` and the relevant `doctrine/*.toml`.
2. Bump the doctrine version in `DOCTRINE.md` header.
3. PR runs AVP doctrine-conformance + generality tiers.
4. One maintainer ratifies. AVP tier passes are required.

## Naming a new repo / target

If you're scaffolding a new target (e.g., a SwiftUI port), the directory MUST be `targets/<lowercase-name>/`. Update `integrations/tests.toml` to register the target so test parameterization picks it up.

## Co-author trailer

All commits include the author's `Co-Authored-By` trailer. Agent-authored commits include the agent identifier.
