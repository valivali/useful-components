import React from "react"
import { Link } from "react-router-dom"

import { TextDefault, TitleLg, TitleMd, TitleSm } from "@/styles/ui"

import { Button } from "../Button"

export type BackLinkProps = {
  to?: string
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  text?: string
  light?: boolean
}

// Simple BackButton component using the new Button
const BackButton: React.FC<BackLinkProps> = ({ to, href, onClick, children, text = "← Back" }) => {
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        <Button variant="outline" leftIcon="←">
          {children ?? text}
        </Button>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <Button variant="outline" leftIcon="←">
          {children ?? text}
        </Button>
      </a>
    )
  }

  return (
    <Button variant="outline" leftIcon="←" onClick={onClick}>
      {children ?? text}
    </Button>
  )
}

export interface PageHeaderProps {
  children?: React.ReactNode
  className?: string
  variant?: "default" | "glass" | "gradient" | "bordered"
  align?: "left" | "center"
  title?: string
  subtitle?: string
  backLink?: BackLinkProps
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

export interface PageProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  backLink?: BackLinkProps
  headerProps?: Partial<PageHeaderProps>
  footerProps?: Partial<PageFooterProps>
  showHeader?: boolean
  showFooter?: boolean
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
        <BackButton to={backLink.to} href={backLink.href} onClick={backLink.onClick}>
          {backLink.text ?? "← Back"}
        </BackButton>
      )}
      <div className="ui-page-header__content">
        {title && <TitleLg className="ui-page-header__title">{title}</TitleLg>}
        {subtitle && <TextDefault className="ui-page-header__subtitle">{subtitle}</TextDefault>}
        {children}
      </div>
    </header>
  )
}

const PageFooter: React.FC<PageFooterProps> = ({ children, className = "", variant = "default", text, title }) => {
  const classes = ["ui-page-footer", variant !== "default" && `ui-page-footer--${variant}`, className].filter(Boolean).join(" ")

  const footerText = text ?? "Built with React, TypeScript, and SCSS"

  return (
    <footer className={classes}>
      {title && <TitleSm className="ui-page-footer__title">{title}</TitleSm>}
      {<TextDefault className="ui-page-footer__text">{footerText}</TextDefault>}
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

const Page: React.FC<PageProps> = ({
  children,
  className = "",
  title,
  subtitle,
  backLink,
  headerProps,
  footerProps,
  showHeader = true,
  showFooter = true
}) => {
  const classes = ["ui-page", className].filter(Boolean).join(" ")

  return (
    <Container className={classes}>
      {showHeader && <PageHeader title={title} subtitle={subtitle} backLink={backLink} {...headerProps} />}
      <main className="ui-page__content">{children}</main>
      {showFooter && <PageFooter {...footerProps} />}
    </Container>
  )
}

export const DemoContainer: React.FC<{
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}> = ({ children, className = "", title, description }) => {
  const classes = ["ui-demo-container", "ui-demo-container--card", className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {title && <TitleMd>{title}</TitleMd>}
      {description && <TextDefault>{description}</TextDefault>}
      <div className="demo-container">{children}</div>
    </div>
  )
}

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
          <TextDefault>
            {prop.description}
            {prop.type && ` (${prop.type})`}
            {prop.default && ` - Default: ${prop.default}`}
          </TextDefault>
        </div>
      ))}
    </div>
  )
}

export const FeaturesList: React.FC<{
  features: string[]
  className?: string
}> = ({ features, className = "" }) => {
  return (
    <ul className={`features-list ${className}`}>
      {features.map((feature, index) => (
        <li key={index}>
          <TextDefault>{feature}</TextDefault>
        </li>
      ))}
    </ul>
  )
}

export { PageHeader, PageFooter, Container, Grid, Flex, Page }
