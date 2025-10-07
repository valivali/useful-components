import "./Demo.scss"

import React, { memo } from "react"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { TextDefault, TitleMd } from "@/styles/ui"

export interface DemoContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export const DemoContainer: React.FC<DemoContainerProps> = ({ children, className = "", title, description }) => {
  const classes = ["ui-demo-container", "ui-demo-container--card", className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {title && <TitleMd>{title}</TitleMd>}
      {description && <TextDefault>{description}</TextDefault>}
      <div className="demo-container">{children}</div>
    </div>
  )
}

export interface DemoSectionProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  lazyLoad?: boolean
  lazyLoadOptions?: {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  }
}

export const DemoSection: React.FC<DemoSectionProps> = memo(
  ({ title, description, children, className = "", containerClassName = "", lazyLoad = true, lazyLoadOptions = {} }) => {
    const { targetRef, shouldRender } = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: "100px",
      triggerOnce: true,
      ...lazyLoadOptions
    })

    const sectionClasses = ["demo-section", className].filter(Boolean).join(" ")

    if (!lazyLoad) {
      return (
        <div className={sectionClasses}>
          <TitleMd>{title}</TitleMd>
          <TextDefault>{description}</TextDefault>
          <DemoContainer className={containerClassName}>{children}</DemoContainer>
        </div>
      )
    }

    return (
      <div ref={targetRef} className={sectionClasses}>
        <TitleMd>{title}</TitleMd>
        <TextDefault>{description}</TextDefault>
        <DemoContainer className={containerClassName}>{shouldRender ? children : <div style={{ minHeight: "200px" }} />}</DemoContainer>
      </div>
    )
  }
)

DemoSection.displayName = "DemoSection"
