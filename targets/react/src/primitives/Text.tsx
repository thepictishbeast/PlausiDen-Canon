// Primitive: Text
// Conforms to canon.text.v1.
//   - size + line-height paired (typography.size.X with typography.line_height.X).
//   - Soft-wrap default; long unbroken strings get overflow-wrap: anywhere.
//   - color from token namespace only.

import type { ReactNode } from "react";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextColor =
  | "surface.fg_on_default"
  | "surface.fg_on_raised"
  | "primary.default"
  | "danger.default"
  | "neutral.default";
export type TextTone = "body" | "code";
export type TextTruncate = "none" | "single-line" | "two-line";

export interface TextProps {
  children?: ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  tone?: TextTone;
  truncate?: TextTruncate;
  /** Semantic element. Default `span`; use `p`/`h1`/etc. for landmarks. */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "code";
}

/**
 * Text — typographic primitive. Soft-wraps by default; non-breaking strings
 * (long URLs, hashes) wrap at any character to prevent horizontal overflow.
 *
 * @see contracts/text.toml
 */
export function Text(props: TextProps) {
  const {
    children,
    size = "md",
    weight = "regular",
    color = "surface.fg_on_default",
    tone = "body",
    truncate = "none",
    as = "span",
  } = props;

  const baseStyle: React.CSSProperties = {
    fontSize: `var(--canon-typography-size-${size})`,
    lineHeight: `var(--canon-typography-line-height-${size})px`,
    fontWeight: `var(--canon-typography-weight-${weight})`,
    fontFamily:
      tone === "code"
        ? "var(--canon-typography-font-family-mono)"
        : "var(--canon-typography-font-family-sans)",
    color: `var(--canon-color-${color.replace(".", "-")})`,
    overflowWrap: "anywhere", // canon.text.v1 soft-wrap-default
  };

  const truncateStyle: React.CSSProperties =
    truncate === "single-line"
      ? { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
      : truncate === "two-line"
      ? {
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }
      : {};

  const Tag = as as keyof JSX.IntrinsicElements;
  return <Tag style={{ ...baseStyle, ...truncateStyle }}>{children}</Tag>;
}
