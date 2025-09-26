import { useEffect, useRef } from "react"

import { type ExpandAction, ExpandActionEnum } from "@/components/ExpandableElement/types"

interface UseActionHandlersProps {
  action: ExpandAction
  onToggle: () => void
  onExpand: () => void
  onCollapse: () => void
}

export function useActionHandlers({ action, onToggle, onExpand, onCollapse }: UseActionHandlersProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggerElement = triggerRef.current
    if (!triggerElement || action === ExpandActionEnum.FUNCTION) return

    if (action === ExpandActionEnum.CLICK) {
      triggerElement.addEventListener("click", onToggle)
      return () => triggerElement.removeEventListener("click", onToggle)
    }

    if (action === ExpandActionEnum.HOVER) {
      triggerElement.addEventListener("mouseenter", onExpand)
      triggerElement.addEventListener("mouseleave", onCollapse)

      return () => {
        triggerElement.removeEventListener("mouseenter", onExpand)
        triggerElement.removeEventListener("mouseleave", onCollapse)
      }
    }
  }, [action, onToggle, onExpand, onCollapse])

  return {
    triggerRef
  }
}
