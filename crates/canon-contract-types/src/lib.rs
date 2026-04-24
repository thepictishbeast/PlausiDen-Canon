//! Rust types for Canon contract files (`contracts/*.toml`).
//!
//! Owned by Canon — `PlausiDen-Audits` and `PlausiDen-Tests` import this crate
//! rather than redefining the schema. Keeps schema authority with the source
//! of truth, prevents the contract format from drifting per consumer.
//!
//! Doctrine alignment:
//!   - Tenet 4 (contracts are platform-independent) — these types are the
//!     canonical Rust mirror of the platform-agnostic TOML.

#![forbid(unsafe_code)]

use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Contract {
    pub meta: ContractMeta,
    #[serde(default)]
    pub variants: BTreeMap<String, VariantSpec>,
    #[serde(default, rename = "behavior")]
    pub behaviors: Vec<Behavior>,
    #[serde(default, rename = "invariant")]
    pub invariants: Vec<Invariant>,
    #[serde(default)]
    pub deprecation: Option<Deprecation>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContractMeta {
    pub id: String,
    pub doctrine_version: String,
    pub status: Status,
    pub owners: Vec<String>,
    #[serde(default)]
    pub implementations: Vec<String>,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Status {
    Experimental,
    Normative,
    Deprecated,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VariantSpec {
    pub values: Vec<String>,
    pub default: String,
    #[serde(default)]
    pub description: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Behavior {
    pub id: String,
    pub description: String,
    pub detector: Detector,
    pub severity: Severity,
    pub waivable: bool,
    pub rationale: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Invariant {
    pub id: String,
    pub description: String,
    pub detector: Detector,
    pub severity: Severity,
    pub waivable: bool,
    pub rationale: String,
}

/// Detector classes. Each maps to an enforcement engine in `PlausiDen-Audits`
/// or `PlausiDen-Tests`. Adding a variant requires a corresponding rule
/// implementation in Audits.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum Detector {
    StaticApiShape,
    StaticAst,
    StaticAstReturn,
    StaticAstImport,
    StaticAstProperty,
    StaticContrast,
    StaticCommentRequired,
    StaticStateMachine,
    StaticTokenUsage,
    StaticTypeFlow,
    TypeSystem,
    RuntimeLayout,
    RuntimeLayoutFuzz,
    RuntimeKeyboard,
    RuntimeInteraction,
    RuntimeProperty,
    RuntimeMediaQuery,
    RuntimeAxe,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Severity {
    Info,
    Warn,
    Error,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Deprecation {
    #[serde(default, rename = "variant")]
    pub variants: Vec<DeprecatedVariant>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeprecatedVariant {
    pub path: String,
    pub replacement: String,
    /// ISO-8601 date after which the variant is removed.
    pub remove_after: String,
}
