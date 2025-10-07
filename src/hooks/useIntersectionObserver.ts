import { useCallback, useEffect, useRef, useState } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver({ threshold = 0.1, rootMargin = "50px", triggerOnce = true }: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      const isCurrentlyIntersecting = entry.isIntersecting

      setIsIntersecting(isCurrentlyIntersecting)

      if (isCurrentlyIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
    },
    [hasIntersected]
  )

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    observer.observe(target)

    return () => {
      observer.unobserve(target)
      observer.disconnect()
    }
  }, [handleIntersection, threshold, rootMargin])

  const shouldRender = triggerOnce ? hasIntersected : isIntersecting

  return {
    targetRef,
    isIntersecting,
    hasIntersected,
    shouldRender
  }
}
