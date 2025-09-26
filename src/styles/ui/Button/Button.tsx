import React from "react"
import { Link } from "react-router-dom"

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "outline" | "ghost" | "gradient"
  size?: "small" | "default" | "large"
  fullWidth?: boolean
  iconOnly?: boolean
  loading?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  href?: string
  to?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  attached?: boolean
  vertical?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "default",
  fullWidth = false,
  iconOnly = false,
  loading = false,
  disabled = false,
  type = "button",
  href,
  to,
  onClick,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses = [
    "ui-button",
    `ui-button--${variant}`,
    size !== "default" && `ui-button--${size}`,
    fullWidth && "ui-button--full-width",
    iconOnly && "ui-button--icon-only",
    loading && "ui-button--loading",
    className
  ]
    .filter(Boolean)
    .join(" ")

  const content = (
    <>
      {leftIcon && <span className="ui-button__icon ui-button__icon--left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ui-button__icon ui-button__icon--right">{rightIcon}</span>}
    </>
  )

  // If it's a link, render as Link or anchor
  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    )
  }

  // Render as button
  return (
    <button type={type} className={baseClasses} onClick={onClick} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = "", attached = false, vertical = false }) => {
  const classes = ["ui-button-group", attached && "ui-button-group--attached", vertical && "ui-button-group--vertical", className]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}

// Specialized button variants
export const BackButton: React.FC<Omit<ButtonProps, "variant" | "leftIcon">> = ({ children = "← Back", className = "", ...props }) => {
  return (
    <Button variant="ghost" className={`ui-button--back-link ${className}`} leftIcon="←" {...props}>
      {children}
    </Button>
  )
}

export const BackButtonLight: React.FC<Omit<ButtonProps, "variant" | "leftIcon">> = ({ children = "← Back", className = "", ...props }) => {
  return (
    <Button variant="secondary" className={`ui-button--back-link ui-button--back-link-light ${className}`} leftIcon="←" {...props}>
      {children}
    </Button>
  )
}

export default Button
