import "./ExpandableElement.scss"

import React, { useMemo, useRef } from "react"

import { useActionHandlers } from "@/hooks/useActionHandlers.ts"
import { useContentSize } from "@/hooks/useContentSize.ts"
import { useExpandableElement } from "@/hooks/useExpandableElement.ts"

import {
  type ExpandAction,
  ExpandActionEnum,
  type ExpandDirection,
  ExpandDirectionEnum,
  type FoldDirection,
  FoldDirectionEnum
} from "./types"

export interface ExpandableElementProps {
  children: React.ReactNode
  trigger: React.ReactNode
  expandDirection?: ExpandDirection
  foldDirection?: FoldDirection
  animationSpeed?: number
  initialExpanded?: boolean
  isExpanded?: boolean
  onExpandChange?: (isExpanded: boolean) => void
  action?: ExpandAction
  className?: string
  triggerClassName?: string
  contentClassName?: string
  style?: React.CSSProperties
  maxSize?: number
  smooth?: boolean
}

export const ExpandableElement: React.FC<ExpandableElementProps> = React.memo(
  ({
    children,
    trigger,
    expandDirection = ExpandDirectionEnum.BOTTOM,
    foldDirection = FoldDirectionEnum.UP,
    animationSpeed = 300,
    initialExpanded = false,
    isExpanded: controlledExpanded,
    onExpandChange,
    action = ExpandActionEnum.CLICK,
    className = "",
    triggerClassName = "",
    contentClassName = "",
    style = {},
    maxSize,
    smooth = true
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { expanded, handleToggle, handleExpand, handleCollapse } = useExpandableElement({
      initialExpanded,
      isExpanded: controlledExpanded,
      onExpandChange,
      action
    })

    const { contentRef, contentSize } = useContentSize({
      expandDirection,
      children
    })

    const { triggerRef } = useActionHandlers({
      action,
      onToggle: handleToggle,
      onExpand: handleExpand,
      onCollapse: handleCollapse
    })

    const containerClasses = useMemo(() => {
      return [
        "expandable-element",
        `expandable-element--expand-${expandDirection}`,
        `expandable-element--fold-${foldDirection}`,
        expanded ? "expandable-element--expanded" : "expandable-element--collapsed",
        action === ExpandActionEnum.CLICK ? "expandable-element--clickable" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")
    }, [expandDirection, foldDirection, expanded, action, className])

    const contentClasses = useMemo(() => {
      const isHorizontal = expandDirection === ExpandDirectionEnum.LEFT || expandDirection === ExpandDirectionEnum.RIGHT
      const baseClasses = ["expandable-element__content"]

      if (!smooth) {
        baseClasses.push("expandable-element__content--no-smooth")
      }

      if (expanded) {
        baseClasses.push(
          isHorizontal ? "expandable-element__content--expanded-horizontal" : "expandable-element__content--expanded-vertical"
        )
      } else {
        baseClasses.push(
          isHorizontal ? "expandable-element__content--collapsed-horizontal" : "expandable-element__content--collapsed-vertical"
        )
      }

      if (contentClassName) {
        baseClasses.push(contentClassName)
      }

      return baseClasses.join(" ")
    }, [expandDirection, smooth, expanded, contentClassName])

    const containerStyle = useMemo(() => {
      const size = maxSize ?? contentSize
      const isHorizontal = expandDirection === ExpandDirectionEnum.LEFT || expandDirection === ExpandDirectionEnum.RIGHT

      return {
        ...style,
        "--animation-speed": `${animationSpeed}ms`,
        "--content-width": isHorizontal && size > 0 ? `${size}px` : "auto",
        "--content-height": !isHorizontal && size > 0 ? `${size}px` : "auto"
      } as React.CSSProperties & {
        "--animation-speed": string
        "--content-width": string
        "--content-height": string
      }
    }, [style, animationSpeed, maxSize, contentSize, expandDirection])

    return (
      <div ref={containerRef} className={containerClasses} style={containerStyle} data-testid="expandable-element">
        <div ref={triggerRef} className={`expandable-element__trigger ${triggerClassName}`} data-testid="expandable-trigger">
          {trigger}
        </div>
        <div className={contentClasses} data-testid="expandable-content">
          <div ref={contentRef} className="expandable-element__content-inner">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

ExpandableElement.displayName = "ExpandableElement"

export default ExpandableElement
