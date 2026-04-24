// PlausiDen-Canon — React reference implementation entrypoint.
//
// Public API surface. Anything not re-exported here is an implementation
// detail and consumers MUST NOT import it directly.

export { Box } from "./primitives/Box.js";
export { Stack } from "./primitives/Stack.js";
export { Text } from "./primitives/Text.js";
export { Pressable } from "./primitives/Pressable.js";
// Inline pending; ships in v0.2.

export { Button } from "./components/Button.js";
// TextField, Dialog ship as scaffolds — see ./components/.

export type { BoxProps } from "./primitives/Box.js";
export type { StackProps } from "./primitives/Stack.js";
export type { TextProps } from "./primitives/Text.js";
export type { PressableProps } from "./primitives/Pressable.js";
export type { ButtonProps } from "./components/Button.js";
