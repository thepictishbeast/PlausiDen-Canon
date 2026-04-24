// Component: Button
//
// Reference implementation of canon.button.v1. Composes Pressable + Box +
// Text — never touches raw DOM elements directly.
//
// Public API uses discriminated union to enforce icon-only labeling at the
// type level (canon.button.v1#icon-only-requires-label).

import type { ReactNode } from "react";
import { Pressable } from "../primitives/Pressable.js";
import { Box } from "../primitives/Box.js";
import { Text } from "../primitives/Text.js";

export type ButtonIntent = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBase {
  intent?: ButtonIntent;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  id?: string;
}

interface ButtonRectangle extends ButtonBase {
  shape?: "rectangle";
  children: ReactNode;          // text label required
  ariaLabel?: string;            // optional override
}

interface ButtonIconOnly extends ButtonBase {
  shape: "icon-only";
  children: ReactNode;          // the icon
  ariaLabel: string;             // REQUIRED at the type level
}

export type ButtonProps = ButtonRectangle | ButtonIconOnly;

const PADDING_BY_SIZE: Record<ButtonSize, "1" | "2" | "3"> = {
  sm: "1",
  md: "2",
  lg: "3",
};

const TEXT_SIZE_BY_SIZE: Record<ButtonSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

/**
 * Button — the canonical interactive surface. Composes Pressable for the
 * activation contract, Box for the surface, Text for the label.
 *
 * @see contracts/button.toml
 */
export function Button(props: ButtonProps) {
  const {
    intent = "secondary",
    size = "md",
    isDisabled = false,
    isLoading = false,
    onPress,
    id,
    children,
  } = props;
  const ariaLabel = "ariaLabel" in props ? props.ariaLabel : undefined;

  // Background CSS var per intent. Hover/active states via CSS pseudo-classes
  // resolved through token vars at the consumer's stylesheet (CSS layer);
  // the React layer just declares the intent variant.
  const background = (() => {
    switch (intent) {
      case "primary":
        return "surface.raised"; // primary surface in v0.1; specialize when intent vars expand
      case "danger":
        return "surface.raised";
      case "ghost":
        return "transparent" as const;
      case "secondary":
      default:
        return "surface.raised";
    }
  })();

  return (
    <Pressable
      onPress={onPress}
      isDisabled={isDisabled}
      isLoading={isLoading}
      ariaLabel={ariaLabel}
      id={id}
    >
      <Box padding={PADDING_BY_SIZE[size]} background={background} radius="md" border="default">
        <Text size={TEXT_SIZE_BY_SIZE[size]} weight="medium">
          {isLoading ? "…" : children}
        </Text>
      </Box>
    </Pressable>
  );
}
