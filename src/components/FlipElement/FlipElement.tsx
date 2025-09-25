import "./FlipElement.scss"

import React, { useCallback, useEffect, useRef, useState } from "react"

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
  action?: "click" | "hover" | "function"

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
}

export const FlipElement: React.FC<FlipElementProps> = ({
  children,
  flipTo,
  action = "click",
  flipDirection = "horizontal",
  flipDuration = 600,
  initialFlipped = false,
  isFlipped: controlledFlipped,
  onFlipChange,
  className = "",
  style = {}
}) => {
  const [internalFlipped, setInternalFlipped] = useState(initialFlipped)
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine if we're using controlled or uncontrolled state
  const isControlled = controlledFlipped !== undefined
  const flipped = isControlled ? controlledFlipped : internalFlipped

  const handleFlip = useCallback(() => {
    if (action !== "function") {
      const newFlipped = !flipped
      if (!isControlled) {
        setInternalFlipped(newFlipped)
      }
      onFlipChange?.(newFlipped)
    }
  }, [action, flipped, isControlled, onFlipChange])

  // Set up event listeners based on action type
  useEffect(() => {
    const container = containerRef.current
    if (!container || action === "function") return

    if (action === "click") {
      container.addEventListener("click", handleFlip)
      return () => container.removeEventListener("click", handleFlip)
    }

    if (action === "hover") {
      const handleMouseEnter = () => {
        const newFlipped = true
        if (!isControlled) {
          setInternalFlipped(newFlipped)
        }
        onFlipChange?.(newFlipped)
      }

      const handleMouseLeave = () => {
        const newFlipped = false
        if (!isControlled) {
          setInternalFlipped(newFlipped)
        }
        onFlipChange?.(newFlipped)
      }

      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [action, isControlled, flipped, onFlipChange, handleFlip])

  const containerClasses = [
    "flip-element",
    `flip-element--${flipDirection}`,
    flipped ? "flip-element--flipped" : "",
    action === "click" ? "flip-element--clickable" : "",
    className
  ]
    .filter(Boolean)
    .join(" ")

  const containerStyle = {
    ...style,
    "--flip-duration": `${flipDuration}ms`
  } as React.CSSProperties & { "--flip-duration": string }

  return (
    <div ref={containerRef} className={containerClasses} style={containerStyle}>
      <div className="flip-element__inner">
        <div className="flip-element__front">{children}</div>
        <div className="flip-element__back">{flipTo}</div>
      </div>
    </div>
  )
}

export default FlipElement
