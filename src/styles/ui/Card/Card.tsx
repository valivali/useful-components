import React from "react"
import { Link } from "react-router-dom"

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined" | "glass" | "dark"
  size?: "small" | "default" | "large"
  interactive?: boolean
  comingSoon?: boolean
  href?: string
  to?: string
  onClick?: () => void
}

export interface CardIconProps {
  children: React.ReactNode
  variant?: "gradient-1" | "gradient-2" | "gradient-3" | "gradient-4"
  className?: string
}

export interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export interface CardTagsProps {
  tags: string[]
  className?: string
  variant?: "default" | "primary" | "success" | "warning" | "danger"
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  interactive = false,
  comingSoon = false,
  href,
  to,
  onClick,
  ...props
}) => {
  const baseClasses = [
    "ui-card",
    variant !== "default" && `ui-card--${variant}`,
    size !== "default" && `ui-card--${size}`,
    interactive && "ui-card--interactive",
    comingSoon && "ui-card--coming-soon",
    className
  ]
    .filter(Boolean)
    .join(" ")

  const cardContent = (
    <div className={baseClasses} onClick={onClick} {...props}>
      {children}
      {interactive && !comingSoon && <div className="ui-card__arrow">→</div>}
    </div>
  )

  // If it's a link, wrap with appropriate link component
  if (to && !comingSoon) {
    return (
      <Link to={to} className="ui-card-link">
        {cardContent}
      </Link>
    )
  }

  if (href && !comingSoon) {
    return (
      <a href={href} className="ui-card-link" target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    )
  }

  return cardContent
}

export const CardIcon: React.FC<CardIconProps> = ({ children, variant = "gradient-1", className = "" }) => {
  const classes = ["ui-card__icon", variant && `ui-card__icon--${variant}`, className].filter(Boolean).join(" ")

  return <div className={classes}>{children}</div>
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => {
  const classes = ["ui-card__content", className].filter(Boolean).join(" ")
  return <div className={classes}>{children}</div>
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => {
  const classes = ["ui-card__header", className].filter(Boolean).join(" ")
  return <div className={classes}>{children}</div>
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = "" }) => {
  const classes = ["ui-card__footer", className].filter(Boolean).join(" ")
  return <div className={classes}>{children}</div>
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = "", as: Component = "h3" }) => {
  const classes = ["ui-card__title", className].filter(Boolean).join(" ")
  return <Component className={classes}>{children}</Component>
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = "" }) => {
  const classes = ["ui-card__description", className].filter(Boolean).join(" ")
  return <p className={classes}>{children}</p>
}

export const CardTags: React.FC<CardTagsProps> = ({ tags, className = "", variant = "default" }) => {
  const containerClasses = ["ui-card__tags", className].filter(Boolean).join(" ")

  return (
    <div className={containerClasses}>
      {tags.map((tag, index) => (
        <span key={index} className={`ui-card__tag ${variant !== "default" ? `ui-card__tag--${variant}` : ""}`}>
          {tag}
        </span>
      ))}
    </div>
  )
}

export default Card
