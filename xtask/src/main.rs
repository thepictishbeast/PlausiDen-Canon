// xtask — repo-wide commands for PlausiDen-Canon.
//
// Run via the workspace alias: `cargo xtask <subcommand>`.
// (Set up via .cargo/config.toml.)
//
//   cargo xtask verify   — token regen + audit + test pass locally
//   cargo xtask regen    — regenerate tokens/generated/*

use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(version, about = "Canon repo-wide tasks")]
struct Cli {
    #[command(subcommand)]
    cmd: Cmd,
}

#[derive(Subcommand)]
enum Cmd {
    /// Run the full local verification suite: token-forge verify + audits + tests.
    Verify,
    /// Regenerate tokens/generated/*.
    Regen,
}

fn main() -> anyhow::Result<()> {
    match Cli::parse().cmd {
        Cmd::Verify => {
            eprintln!("xtask verify: SCAFFOLD — wire to token-forge + PlausiDen-Audits + PlausiDen-Tests once they ship.");
            Ok(())
        }
        Cmd::Regen => {
            eprintln!("xtask regen: SCAFFOLD — call token-forge regenerate once generators land.");
            Ok(())
        }
    }
}
