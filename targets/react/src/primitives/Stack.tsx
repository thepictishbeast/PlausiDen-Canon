// Primitive: Stack (vertical/horizontal layout)
// Conforms to canon.stack.v1. Token-only `gap` value.

import type { ReactNode } from "react";

export type StackDirection = "vertical" | "horizontal";
export type StackGap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around";
export type StackWrap = "nowrap" | "wrap";

export interface StackProps {
  children?: ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: StackWrap;
}

const ALIGN_MAP: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

const JUSTIFY_MAP: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

/**
 * Stack — composition primitive. Manages spacing between children via `gap`
 * tokens. Children MUST NOT use margin within a Stack (canon.stack.v1
 * `no-margin-on-children`).
 *
 * @see contracts/stack.toml
 */
export function Stack(props: StackProps) {
  const {
    children,
    direction = "vertical",
    gap = "2",
    align = "stretch",
    justify = "start",
    wrap = "nowrap",
  } = props;

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "vertical" ? "column" : "row",
    gap: `var(--canon-spacing-${gap})`,
    alignItems: ALIGN_MAP[align],
    justifyContent: JUSTIFY_MAP[justify],
    flexWrap: wrap === "wrap" ? "wrap" : "nowrap",
  };
  return <div style={style}>{children}</div>;
}
