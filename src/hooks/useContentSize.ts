import React, { useEffect, useRef, useState } from "react"

import { type ExpandDirection, ExpandDirectionEnum } from "@/components/ExpandableElement/types"

interface UseContentSizeProps {
  expandDirection: ExpandDirection
  children: React.ReactNode
}

export function useContentSize({ expandDirection, children }: UseContentSizeProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentSize, setContentSize] = useState<number>(0)

  useEffect(() => {
    const contentElement = contentRef.current
    if (!contentElement) return

    const measureSize = () => {
      if (expandDirection === ExpandDirectionEnum.LEFT || expandDirection === ExpandDirectionEnum.RIGHT) {
        setContentSize(contentElement.scrollWidth)
      } else {
        setContentSize(contentElement.scrollHeight)
      }
    }

    measureSize()

    const resizeObserver = new ResizeObserver(measureSize)
    resizeObserver.observe(contentElement)

    window.addEventListener("resize", measureSize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", measureSize)
    }
  }, [children, expandDirection])

  return {
    contentRef,
    contentSize
  }
}
