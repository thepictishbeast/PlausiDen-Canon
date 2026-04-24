//! canon-core — shared trait definitions for Canon-conformant Rust UI targets.
//!
//! Imported by `adapters/iced/`, `adapters/egui/`, and any Rust UI consumer.
//! The traits encode capability mixins; a Canon-compliant component composes
//! these and renders only through the primitives.
//!
//! Doctrine alignment:
//!   - Composition over inheritance (Canon Doctrine tenet 6).
//!   - Type-level enforcement of contract obligations where possible.

#![forbid(unsafe_code)]

/// A type that has a current theme (color tokens + density + reduced-motion preference).
pub trait Themed {
    fn theme(&self) -> &ThemeRef;
}

/// A type that participates in accessibility tree (label, role, focus order).
/// Required for any interactive component. The `derive(Accessible)` macro (TODO)
/// enforces presence of `aria_label` or equivalent at compile time.
pub trait Accessible {
    fn accessible_label(&self) -> Option<&str>;
    fn accessible_role(&self) -> AccessibleRole;
}

/// A type that responds to press input (mouse/touch/keyboard activation).
/// Implementors get the contract behaviors `pressable-feedback`, `loading-locks-action`,
/// and `focus-visible` for free via the default mixin (TODO once primitives ship).
pub trait Pressable {
    fn on_press(&self) -> &PressHandler;
    fn is_disabled(&self) -> bool {
        false
    }
    fn is_loading(&self) -> bool {
        false
    }
}

// =================== placeholder types — fill in alongside primitives ===================

/// Theme reference. Stub; resolves to canonical token constants at v0.2.
#[derive(Debug, Clone)]
pub struct ThemeRef;

/// ARIA role enum. Stub; expand to cover the primitives we ship.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AccessibleRole {
    Button,
    TextField,
    Dialog,
    Generic,
}

/// Press handler stub. Real shape defined per UI framework adapter.
#[derive(Debug, Clone, Copy)]
pub struct PressHandler;
