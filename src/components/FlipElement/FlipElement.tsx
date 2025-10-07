import "./FlipElement.scss"

import React, { memo, useMemo } from "react"

import { useFlipActionHandlers } from "@/hooks/useFlipActionHandlers"
import { type FlipAction, useFlipElement } from "@/hooks/useFlipElement"

export interface FlipElementProps {
  /**
   * The content to show on the front side of the flip
   */
  children: React.ReactNode

  /**
   * The content to show on the back side of the flip
   */
  flipTo: React.ReactNode

  /**
   * The action that triggers the flip
   * @default 'click'
   */
  action?: FlipAction

  /**
   * The direction of the flip animation
   * @default 'horizontal'
   */
  flipDirection?: "horizontal" | "vertical"

  /**
   * Duration of the flip animation in milliseconds
   * @default 600
   */
  flipDuration?: number

  /**
   * Rotation degrees for the flip animation
   * @default 180
   */
  flipRotation?: number

  /**
   * Whether the element is initially flipped
   * @default false
   */
  initialFlipped?: boolean

  /**
   * Function to control flip state when action is 'function'
   */
  isFlipped?: boolean

  /**
   * Callback when flip state changes
   */
  onFlipChange?: (isFlipped: boolean) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Additional styles for the container
   */
  style?: React.CSSProperties

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string

  /**
   * ARIA description for accessibility
   */
  "aria-describedby"?: string

  /**
   * Whether the element should be focusable
   * @default true for click actions, false for hover actions
   */
  focusable?: boolean
}

export const FlipElement: React.FC<FlipElementProps> = memo(
  ({
    children,
    flipTo,
    action = "click",
    flipDirection = "horizontal",
    flipDuration = 600,
    flipRotation = 180,
    initialFlipped = false,
    isFlipped: controlledFlipped,
    onFlipChange,
    className = "",
    style = {},
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    focusable = action === "click"
  }) => {
    const { flipped, handleToggle, handleFlip, handleUnflip } = useFlipElement({
      initialFlipped,
      isFlipped: controlledFlipped,
      onFlipChange,
      action
    })

    const { containerRef } = useFlipActionHandlers({
      action,
      onToggle: handleToggle,
      onFlip: handleFlip,
      onUnflip: handleUnflip
    })

    const numFlips = useMemo(() => Math.round(flipRotation / 180), [flipRotation])
    const isMultiFlip = numFlips > 1

    const containerClasses = useMemo(
      () =>
        [
          "flip-element",
          `flip-element--${flipDirection}`,
          flipped ? "flip-element--flipped" : "",
          action === "click" ? "flip-element--clickable" : "",
          isMultiFlip ? `flip-element--multi-flip flip-element--flips-${numFlips}` : "",
          className
        ]
          .filter(Boolean)
          .join(" "),
      [flipDirection, flipped, action, isMultiFlip, numFlips, className]
    )

    const containerStyle = useMemo(
      () =>
        ({
          ...style,
          "--flip-duration": `${flipDuration}ms`,
          "--flip-rotation": `${flipRotation}deg`,
          "--num-flips": numFlips.toString()
        }) as React.CSSProperties & {
          "--flip-duration": string
          "--flip-rotation": string
          "--num-flips": string
        },
      [style, flipDuration, flipRotation, numFlips]
    )

    const accessibilityProps = useMemo(
      () => ({
        role: action === "click" ? "button" : undefined,
        tabIndex: focusable && action === "click" ? 0 : -1,
        "aria-label": ariaLabel ?? (action === "click" ? "Flip element" : undefined),
        "aria-describedby": ariaDescribedBy,
        "aria-pressed": action === "click" ? flipped : undefined,
        onKeyDown:
          action === "click" && focusable
            ? (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleToggle()
                }
              }
            : undefined
      }),
      [action, focusable, ariaLabel, ariaDescribedBy, flipped, handleToggle]
    )

    return (
      <div ref={containerRef} className={containerClasses} style={containerStyle} {...accessibilityProps}>
        <div className="flip-element__inner">
          <div className="flip-element__front">{children}</div>
          <div className="flip-element__back">{flipTo}</div>
        </div>
      </div>
    )
  }
)

export default FlipElement
