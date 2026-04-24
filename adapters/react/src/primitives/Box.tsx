// Primitive: Box (atomic container)
//
// Conforms to canon.box.v1.
// - Token-only props (no raw style/className/sx).
// - One Box = one underlying view node.
// - All visual properties via the variant union.

import type { ReactNode, ForwardedRef } from "react";
import { forwardRef } from "react";

export type BoxPadding = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type BoxBackground = "transparent" | "surface.default" | "surface.raised" | "surface.sunken";
export type BoxRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type BoxBorder = "none" | "subtle" | "default" | "strong";

export interface BoxProps {
  children?: ReactNode;
  padding?: BoxPadding;
  background?: BoxBackground;
  radius?: BoxRadius;
  border?: BoxBorder;
  /** Required for screen reader semantics on landmarks; omit for generic containers. */
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav" | "aside";
  /** Forwarded to the underlying element for accessibility tree integration. */
  id?: string;
  /** ARIA label for landmark regions only. */
  ariaLabel?: string;
}

/**
 * Box — atomic container primitive. Renders a single view node with
 * token-driven padding/background/radius/border. No escape hatches.
 *
 * @see contracts/box.toml
 */
export const Box = forwardRef(function Box(
  props: BoxProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const {
    children,
    padding = "0",
    background = "transparent",
    radius = "none",
    border = "none",
    as = "div",
    id,
    ariaLabel,
  } = props;

  // SCAFFOLD: token resolution lives in tokens/generated/ts/tokens.ts once
  // token-forge ships its TS generator. Until then this carries placeholder
  // CSS vars — never edit raw values, the var name is what's stable.
  const style: React.CSSProperties = {
    padding: `var(--canon-spacing-${padding})`,
    background:
      background === "transparent"
        ? "transparent"
        : `var(--canon-color-${background.replace(".", "-")})`,
    borderRadius: `var(--canon-radius-${radius})`,
    border:
      border === "none"
        ? "none"
        : `1px solid var(--canon-color-border-${border})`,
  };

  // Type-narrowed dynamic element. The `as` set is closed.
  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag id={id} aria-label={ariaLabel} style={style} ref={ref as ForwardedRef<HTMLDivElement>}>
      {children}
    </Tag>
  );
});
