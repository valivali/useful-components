export const ExpandDirectionEnum = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right"
} as const

export type ExpandDirection = (typeof ExpandDirectionEnum)[keyof typeof ExpandDirectionEnum]

export const FoldDirectionEnum = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right"
} as const

export type FoldDirection = (typeof FoldDirectionEnum)[keyof typeof FoldDirectionEnum]

export const ExpandActionEnum = {
  CLICK: "click",
  HOVER: "hover",
  FUNCTION: "function"
} as const

export type ExpandAction = (typeof ExpandActionEnum)[keyof typeof ExpandActionEnum]
