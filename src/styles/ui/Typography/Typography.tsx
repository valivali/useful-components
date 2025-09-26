import React from "react"
import { match, P } from "ts-pattern"

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body-small" | "caption" | "lead"
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "muted" | "light" | "white" | "dark"
  weight?: "light" | "medium" | "semibold" | "bold"
  align?: "left" | "center" | "right" | "justify"
  transform?: "uppercase" | "lowercase" | "capitalize"
  gradient?: "gradient-1" | "gradient-2" | "gradient-3" | "gradient-4"
  shadow?: "light" | "default" | "heavy"
  truncate?: boolean | 2 | 3
  maxWidth?: "sm" | "md" | "lg"
  mobilePadding?: boolean
  noMargin?: boolean
  marginBottom?: "small" | "default" | "large"
}

export interface LinkProps extends Omit<TextProps, "as"> {
  href?: string
  to?: string
  underline?: boolean
  external?: boolean
  onClick?: (event: React.MouseEvent) => void
}

export interface CodeProps {
  children: React.ReactNode
  className?: string
  inline?: boolean
}

export interface ListProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "unstyled" | "inline" | "spaced" | "features"
  as?: "ul" | "ol"
}

export interface BlockquoteProps {
  children: React.ReactNode
  className?: string
  cite?: string
}

const Text: React.FC<TextProps> = ({
  children,
  className = "",
  as,
  variant,
  color,
  weight,
  align,
  transform,
  gradient,
  shadow,
  truncate,
  maxWidth,
  mobilePadding,
  noMargin,
  marginBottom,
  ...props
}) => {
  // Determine the HTML element to render using ts-pattern
  const Component: React.ElementType = match({ as, variant })
    .with({ as: P.string }, ({ as }) => as as React.ElementType)
    .with({ variant: P.string.startsWith("h") }, ({ variant }) => variant as React.ElementType)
    .with({ variant: P.union("body", "body-small", "lead") }, () => "p" as const)
    .with({ variant: "caption" }, () => "span" as const)
    .otherwise(() => "p" as const)

  const classes = [
    "ui-text",
    variant && `ui-text--${variant}`,
    color && `ui-text--${color}`,
    weight && `ui-text--${weight}`,
    align && `ui-text--${align}`,
    transform && `ui-text--${transform}`,
    gradient && `ui-text--gradient ui-text--${gradient}`,
    shadow && `ui-text--shadow${shadow !== "default" ? `-${shadow}` : ""}`,
    truncate === true && "ui-text--truncate",
    typeof truncate === "number" && `ui-text--truncate-${truncate}`,
    maxWidth && `ui-text--max-width-${maxWidth}`,
    mobilePadding && "ui-text--mobile-padding",
    noMargin && "ui-text--no-margin",
    marginBottom && `ui-text--margin-bottom${marginBottom !== "default" ? `-${marginBottom}` : ""}`,
    className
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export const Heading: React.FC<Omit<TextProps, "variant">> = ({ as = "h2", ...props }) => {
  const variant = as.startsWith("h") ? (as as TextProps["variant"]) : "h2"
  return <Text as={as} variant={variant} {...props} />
}

export const Body: React.FC<Omit<TextProps, "variant" | "as">> = props => {
  return <Text variant="body" as="p" {...props} />
}

export const Caption: React.FC<Omit<TextProps, "variant" | "as">> = props => {
  return <Text variant="caption" as="span" {...props} />
}

export const Lead: React.FC<Omit<TextProps, "variant" | "as">> = props => {
  return <Text variant="lead" as="p" {...props} />
}

export const TextLink: React.FC<LinkProps> = ({
  children,
  href,
  to,
  underline = false,
  external = false,
  onClick,
  className = "",
  ...textProps
}) => {
  const linkClasses = ["ui-text--link", underline && "ui-text--link-underline", !underline && "ui-text--link-no-underline", className]
    .filter(Boolean)
    .join(" ")

  if (to) {
    // Use React Router Link (you'll need to import Link from react-router-dom)
    const { Link } = require("react-router-dom")
    return (
      <Text as="span" className={linkClasses} {...textProps}>
        <Link to={to} onClick={onClick}>
          {children}
        </Link>
      </Text>
    )
  }

  if (href) {
    const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
    return (
      <Text as="span" className={linkClasses} {...textProps}>
        <a href={href} onClick={onClick} {...linkProps}>
          {children}
        </a>
      </Text>
    )
  }

  return (
    <Text as="span" className={linkClasses} onClick={onClick} {...textProps}>
      {children}
    </Text>
  )
}

export const Code: React.FC<CodeProps> = ({ children, className = "", inline = true }) => {
  if (inline) {
    return <span className={`ui-text--code ${className}`}>{children}</span>
  }

  return (
    <pre className={className}>
      <code className="ui-text--code">{children}</code>
    </pre>
  )
}

export const List: React.FC<ListProps> = ({ children, className = "", variant = "default", as = "ul" }) => {
  const classes = ["ui-list", variant !== "default" && `ui-list--${variant}`, className].filter(Boolean).join(" ")

  const Component = as
  return <Component className={classes}>{children}</Component>
}

export const Blockquote: React.FC<BlockquoteProps> = ({ children, className = "", cite }) => {
  const classes = ["ui-blockquote", className].filter(Boolean).join(" ")

  return (
    <blockquote className={classes}>
      {children}
      {cite && <cite>{cite}</cite>}
    </blockquote>
  )
}

// Convenience components for common heading levels
export const H1: React.FC<Omit<TextProps, "variant" | "as">> = props => <Text as="h1" variant="h1" {...props} />

export const H2: React.FC<Omit<TextProps, "variant" | "as">> = props => <Text as="h2" variant="h2" {...props} />

export const H3: React.FC<Omit<TextProps, "variant" | "as">> = props => <Text as="h3" variant="h3" {...props} />

export const H4: React.FC<Omit<TextProps, "variant" | "as">> = props => <Text as="h4" variant="h4" {...props} />

export const H5: React.FC<Omit<TextProps, "variant" | "as">> = props => <Text as="h5" variant="h5" {...props} />

export const H6: React.FC<Omit<TextProps, "variant" | "as">> = props => <Text as="h6" variant="h6" {...props} />

export default Text
