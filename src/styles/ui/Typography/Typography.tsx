import React from "react"

import type { TypographyProps } from "@/styles/ui"

const TitleLg = ({ id, onClick, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-title-lg"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <div id={id} onClick={onClick} className={classes} {...props}>
      {children}
    </div>
  )
}

const SubtitleLg = ({ id, onClick, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-subtitle-lg"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <div id={id} onClick={onClick} className={classes} {...props}>
      {children}
    </div>
  )
}

const TitleMd = ({ id, onClick, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-title-md"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <div id={id} onClick={onClick} className={classes} {...props}>
      {children}
    </div>
  )
}

const SubtitleMd = ({ id, onClick, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-subtitle-md"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <div id={id} onClick={onClick} className={classes} {...props}>
      {children}
    </div>
  )
}

const TitleSm = ({ id, onClick, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-title-sm"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <div id={id} onClick={onClick} className={classes} {...props}>
      {children}
    </div>
  )
}

const TextDefault = ({ id, onClick, title, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-text-default"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <span id={id} onClick={onClick} title={title} className={classes} {...props}>
      {children}
    </span>
  )
}

const TextDefaultBold = ({ id, onClick, title, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-text-default-bold"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <span id={id} onClick={onClick} title={title} className={classes} {...props}>
      {children}
    </span>
  )
}

const TextLg = ({ id, onClick, title, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-text-lg"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <span id={id} onClick={onClick} title={title} className={classes} {...props}>
      {children}
    </span>
  )
}

const TextLgBold = ({ id, onClick, title, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-text-lg-bold"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <span id={id} onClick={onClick} title={title} className={classes} {...props}>
      {children}
    </span>
  )
}

const TextSm = ({ id, onClick, title, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-text-sm"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <span id={id} onClick={onClick} title={title} className={classes} {...props}>
      {children}
    </span>
  )
}

const TextSmBold = ({ id, onClick, title, className, children, ...props }: TypographyProps): React.ReactNode => {
  const baseClassName = "ui-text-sm-bold"
  const classes = [baseClassName, className].filter(Boolean).join(" ")

  return (
    <span id={id} onClick={onClick} title={title} className={classes} {...props}>
      {children}
    </span>
  )
}

export { TitleLg, SubtitleLg, TitleMd, SubtitleMd, TitleSm, TextDefault, TextDefaultBold, TextLg, TextLgBold, TextSm, TextSmBold }
