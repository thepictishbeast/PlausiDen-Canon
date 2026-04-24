// Primitive: Pressable
//
// Capability mixin for any interactive element. Implementations of Button,
// IconButton, MenuItem, etc. compose this. Direct DOM <button> / <a> use
// is a doctrine violation — go through Pressable.

import type { ReactNode, KeyboardEvent } from "react";

export interface PressableProps {
  children?: ReactNode;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  /** REQUIRED for icon-only invocations; otherwise infer from children. */
  ariaLabel?: string;
  /** Forwarded for accessibility tree integration. */
  id?: string;
}

/**
 * Pressable — primitive press handler with keyboard activation, focus
 * management, and disabled/loading lock-out.
 *
 * Behaviors satisfied (via composition, not direct DOM):
 *   - canon.button.v1#focus-visible (consumers add focus styles via Box border)
 *   - canon.button.v1#loading-locks-action
 *   - canon.button.v1#pressable-feedback (consumers wire visual feedback)
 *
 * @see contracts/button.toml
 */
export function Pressable(props: PressableProps) {
  const { children, onPress, isDisabled = false, isLoading = false, ariaLabel, id } = props;
  const locked = isDisabled || isLoading;

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (locked) return;
    // Standard activation keys for role=button (Space + Enter).
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onPress();
    }
  }

  return (
    <button
      type="button"
      id={id}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      disabled={locked}
      onClick={() => {
        if (!locked) onPress();
      }}
      onKeyDown={handleKeyDown}
      style={{
        // The minimum touch target is enforced here so every Pressable
        // satisfies canon.button.v1#touch-target without each component
        // having to remember.
        minWidth: "44px",
        minHeight: "44px",
        cursor: locked ? "not-allowed" : "pointer",
        // Reset native button styling — consumers compose visual surface
        // via Box around the Pressable.
        background: "transparent",
        border: "none",
        padding: 0,
        font: "inherit",
        color: "inherit",
      }}
    >
      {children}
    </button>
  );
}
