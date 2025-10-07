import { useCallback, useEffect, useMemo, useRef } from "react"

import { type FlipAction } from "./useFlipElement"

interface UseFlipActionHandlersProps {
  action: FlipAction
  onToggle: () => void
  onFlip: () => void
  onUnflip: () => void
}

export function useFlipActionHandlers({ action, onToggle, onFlip, onUnflip }: UseFlipActionHandlersProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Memoize event handlers to prevent unnecessary effect re-runs
  const memoizedOnToggle = useCallback(onToggle, [onToggle])
  const memoizedOnFlip = useCallback(onFlip, [onFlip])
  const memoizedOnUnflip = useCallback(onUnflip, [onUnflip])

  useEffect(() => {
    const container = containerRef.current
    if (!container || action === "function") return

    if (action === "click") {
      container.addEventListener("click", memoizedOnToggle, { passive: true })
      return () => container.removeEventListener("click", memoizedOnToggle)
    }

    if (action === "hover") {
      container.addEventListener("mouseenter", memoizedOnFlip, { passive: true })
      container.addEventListener("mouseleave", memoizedOnUnflip, { passive: true })

      return () => {
        container.removeEventListener("mouseenter", memoizedOnFlip)
        container.removeEventListener("mouseleave", memoizedOnUnflip)
      }
    }
  }, [action, memoizedOnToggle, memoizedOnFlip, memoizedOnUnflip])

  return useMemo(
    () => ({
      containerRef
    }),
    []
  )
}
