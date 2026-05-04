// token-forge — tokens.toml -> generated/{css,ts,kotlin,rust}/
//
// SCAFFOLD: this is the v0.1 skeleton. The CLI shape is final; the generators
// are stubs that emit placeholder banners. Filling them in is the first task
// for any contributor — see CONTRIBUTING.md.
//
// Doctrine alignment:
//   - Drift between tokens.toml and tokens/generated/* is a build failure
//     (`token-forge verify` exits non-zero). Wired into CI.
//   - Generators MUST be deterministic — same input bytes → same output bytes.
//     No timestamps, no maps with non-deterministic iteration, no env-dependent
//     output. Required for the diff-check to be stable.
//   - The TOML file is the only thing humans edit. Generated files carry a
//     "DO NOT EDIT — regenerate via `cargo run -p token-forge -- regenerate`"
//     header so accidental hand-edits self-document.

use clap::{Parser, Subcommand};
use std::path::PathBuf;

#[derive(Parser)]
#[command(version, about = "PlausiDen-Canon token forge")]
struct Cli {
    /// Path to tokens.toml. Defaults to ./tokens/tokens.toml.
    #[arg(long, default_value = "tokens/tokens.toml")]
    tokens: PathBuf,
    /// Path to schema.toml. Defaults to ./tokens/schema.toml.
    #[arg(long, default_value = "tokens/schema.toml")]
    schema: PathBuf,
    /// Output root. Defaults to ./tokens/generated.
    #[arg(long, default_value = "tokens/generated")]
    out: PathBuf,
    #[command(subcommand)]
    cmd: Cmd,
}

#[derive(Subcommand)]
enum Cmd {
    /// Validate tokens.toml against schema.toml. Exit non-zero on schema violation.
    Validate,
    /// Generate per-target constants. Overwrites generated/*.
    Regenerate,
    /// Check that on-disk generated files match what regenerate would produce.
    /// Exit non-zero on drift (CI gate).
    Verify,
}

fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    match cli.cmd {
        Cmd::Validate => validate(&cli),
        Cmd::Regenerate => regenerate(&cli),
        Cmd::Verify => verify(&cli),
    }
}

fn validate(cli: &Cli) -> anyhow::Result<()> {
    // TODO: parse tokens + schema, enforce required tables, color-pair completeness,
    //       spacing unit, breakpoint ordering, z-index band gap, touch-target floor.
    //       See tokens/schema.toml for the full rule set.
    let _ = std::fs::read_to_string(&cli.tokens)?;
    let _ = std::fs::read_to_string(&cli.schema)?;
    eprintln!(
        "token-forge validate: SCAFFOLD — implement schema enforcement before shipping v0.1."
    );
    Ok(())
}

fn regenerate(_cli: &Cli) -> anyhow::Result<()> {
    // TODO: per-target generators. Each target writes a single deterministic file
    //       with a "DO NOT EDIT" header.
    //
    //   tokens/generated/css/variables.css   — :root { --color-primary-default: #5b8def; ... }
    //   tokens/generated/ts/tokens.ts        — export const tokens = { ... } as const;
    //   tokens/generated/kotlin/Tokens.kt    — object Tokens { object Color { ... } }
    //   tokens/generated/rust/tokens.rs      — pub mod tokens { pub mod color { pub const PRIMARY_DEFAULT: &str = "..."; } }
    eprintln!("token-forge regenerate: SCAFFOLD — generators not yet implemented.");
    Ok(())
}

fn verify(_cli: &Cli) -> anyhow::Result<()> {
    // TODO: regenerate to a temp dir, diff against on-disk generated/. Exit non-zero on drift.
    eprintln!("token-forge verify: SCAFFOLD — drift check not yet implemented.");
    Ok(())
}
