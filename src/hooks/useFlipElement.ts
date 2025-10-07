import { useCallback, useMemo, useState } from "react"

export type FlipAction = "click" | "hover" | "function"

interface UseFlipElementProps {
  initialFlipped?: boolean
  isFlipped?: boolean
  onFlipChange?: (isFlipped: boolean) => void
  action?: FlipAction
}

export function useFlipElement({
  initialFlipped = false,
  isFlipped: controlledFlipped,
  onFlipChange,
  action = "click"
}: UseFlipElementProps) {
  const [internalFlipped, setInternalFlipped] = useState(initialFlipped)

  const isControlled = useMemo(() => controlledFlipped !== undefined, [controlledFlipped])
  const flipped = isControlled ? controlledFlipped : internalFlipped

  const handleToggle = useCallback(() => {
    if (action !== "function") {
      const newFlipped = !flipped
      if (!isControlled) {
        setInternalFlipped(newFlipped)
      }
      onFlipChange?.(newFlipped)
    }
  }, [action, flipped, isControlled, onFlipChange])

  const handleFlip = useCallback(() => {
    if (action === "hover" || action === "function") {
      const newFlipped = true
      if (!isControlled) {
        setInternalFlipped(newFlipped)
      }
      onFlipChange?.(newFlipped)
    }
  }, [action, isControlled, onFlipChange])

  const handleUnflip = useCallback(() => {
    if (action === "hover" || action === "function") {
      const newFlipped = false
      if (!isControlled) {
        setInternalFlipped(newFlipped)
      }
      onFlipChange?.(newFlipped)
    }
  }, [action, isControlled, onFlipChange])

  return useMemo(
    () => ({
      flipped,
      isControlled,
      handleToggle,
      handleFlip,
      handleUnflip
    }),
    [flipped, isControlled, handleToggle, handleFlip, handleUnflip]
  )
}
