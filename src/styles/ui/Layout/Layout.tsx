import React from "react"
import { Link } from "react-router-dom"

export interface PageHeaderProps {
  children?: React.ReactNode
  className?: string
  variant?: "default" | "glass" | "gradient" | "bordered"
  align?: "left" | "center"
  title?: string
  subtitle?: string
  backLink?: {
    to?: string
    href?: string
    text?: string
    light?: boolean
  }
}

export interface PageFooterProps {
  children?: React.ReactNode
  className?: string
  variant?: "default" | "dark" | "glass"
  text?: string
  title?: string
}

export interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "small" | "default" | "large" | "fluid"
  noPadding?: boolean
}

export interface GridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4 | "auto-fit" | "auto-fill"
  gap?: "small" | "default" | "large"
}

export interface FlexProps {
  children: React.ReactNode
  className?: string
  direction?: "row" | "column" | "mobile-column"
  align?: "center" | "start" | "end" | "stretch"
  justify?: "center" | "start" | "end" | "space-between" | "space-around"
  wrap?: boolean
  gap?: "small" | "default" | "large"
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  className = "",
  variant = "default",
  align = "center",
  title,
  subtitle,
  backLink
}) => {
  const classes = [
    "ui-page-header",
    variant !== "default" && `ui-page-header--${variant}`,
    align !== "center" && `ui-page-header--${align}`,
    className
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <header className={classes}>
      {backLink && (
        <>
          {backLink.to ? (
            <Link to={backLink.to} className={`ui-page-header__back-link ${backLink.light ? "ui-page-header__back-link--light" : ""}`}>
              {backLink.text ?? "← Back"}
            </Link>
          ) : backLink.href ? (
            <a href={backLink.href} className={`ui-page-header__back-link ${backLink.light ? "ui-page-header__back-link--light" : ""}`}>
              {backLink.text ?? "← Back"}
            </a>
          ) : null}
        </>
      )}

      {title && <h1 className="ui-page-header__title">{title}</h1>}
      {subtitle && <p className="ui-page-header__subtitle">{subtitle}</p>}
      {children}
    </header>
  )
}

const PageFooter: React.FC<PageFooterProps> = ({ children, className = "", variant = "default", text, title }) => {
  const classes = ["ui-page-footer", variant !== "default" && `ui-page-footer--${variant}`, className].filter(Boolean).join(" ")

  return (
    <footer className={classes}>
      {title && <h3 className="ui-page-footer__title">{title}</h3>}
      {text && <p className="ui-page-footer__text">{text}</p>}
      {children}
    </footer>
  )
}

const Container: React.FC<ContainerProps> = ({ children, className = "", size = "default", noPadding = false }) => {
  const classes = ["ui-container", size !== "default" && `ui-container--${size}`, noPadding && "ui-container--no-padding", className]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}

const Grid: React.FC<GridProps> = ({ children, className = "", columns = "auto-fit", gap = "default" }) => {
  const classes = [
    "ui-grid",
    typeof columns === "number" ? `ui-grid--${columns}` : `ui-grid--${columns}`,
    gap !== "default" && `ui-grid--gap-${gap}`,
    className
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}

const Flex: React.FC<FlexProps> = ({ children, className = "", direction = "row", align, justify, wrap = false, gap }) => {
  const classes = [
    "ui-flex",
    direction !== "row" && `ui-flex--${direction}`,
    align && `ui-flex--align-${align}`,
    justify && `ui-flex--justify-${justify}`,
    wrap && "ui-flex--wrap",
    gap && `ui-flex--gap${gap !== "default" ? `-${gap}` : ""}`,
    className
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}

// Demo container component (commonly used in the pages)
export const DemoContainer: React.FC<{
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}> = ({ children, className = "", title, description }) => {
  const classes = ["ui-demo-container", "ui-demo-container--card", className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      <div className="demo-container">{children}</div>
    </div>
  )
}

// Props table component (commonly used in the pages)
export const PropsTable: React.FC<{
  props: Array<{
    name: string
    description: string
    type?: string
    default?: string
  }>
  className?: string
}> = ({ props, className = "" }) => {
  return (
    <div className={`props-table ${className}`}>
      {props.map((prop, index) => (
        <div key={index} className="prop-row">
          <code>{prop.name}</code>
          <span>
            {prop.description}
            {prop.type && ` (${prop.type})`}
            {prop.default && ` - Default: ${prop.default}`}
          </span>
        </div>
      ))}
    </div>
  )
}

// Features list component (commonly used in the pages)
export const FeaturesList: React.FC<{
  features: string[]
  className?: string
}> = ({ features, className = "" }) => {
  return (
    <ul className={`features-list ${className}`}>
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  )
}

export { PageHeader, PageFooter, Container, Grid, Flex }
