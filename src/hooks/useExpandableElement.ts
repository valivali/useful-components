import { useCallback, useState } from "react"

import { type ExpandAction, ExpandActionEnum } from "@/components/ExpandableElement/types"

interface UseExpandableElementProps {
  initialExpanded?: boolean
  isExpanded?: boolean
  onExpandChange?: (isExpanded: boolean) => void
  action?: ExpandAction
}

export function useExpandableElement({
  initialExpanded = false,
  isExpanded: controlledExpanded,
  onExpandChange,
  action = ExpandActionEnum.CLICK
}: UseExpandableElementProps) {
  const [internalExpanded, setInternalExpanded] = useState(initialExpanded)

  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded

  const handleToggle = useCallback(() => {
    if (action !== ExpandActionEnum.FUNCTION) {
      const newExpanded = !expanded
      if (!isControlled) {
        setInternalExpanded(newExpanded)
      }
      onExpandChange?.(newExpanded)
    }
  }, [action, expanded, isControlled, onExpandChange])

  const handleExpand = useCallback(() => {
    const newExpanded = true
    if (!isControlled) {
      setInternalExpanded(newExpanded)
    }
    onExpandChange?.(newExpanded)
  }, [isControlled, onExpandChange])

  const handleCollapse = useCallback(() => {
    const newExpanded = false
    if (!isControlled) {
      setInternalExpanded(newExpanded)
    }
    onExpandChange?.(newExpanded)
  }, [isControlled, onExpandChange])

  return {
    expanded,
    isControlled,
    handleToggle,
    handleExpand,
    handleCollapse
  }
}
