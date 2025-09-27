import React from "react"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  onClick?: (event: React.MouseEvent) => void
  className?: string
  children: React.ReactNode
  title?: string
}
