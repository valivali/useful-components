import "./Button.scss"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, children, className = "", disabled, ...props }, ref) => {
    const baseClasses = "btn"
    const variantClasses = `btn--${variant}`
    const sizeClasses = `btn--${size}`
    const loadingClasses = isLoading ? "btn--loading" : ""
    const disabledClasses = (disabled ?? isLoading) ? "btn--disabled" : ""

    const classes = [baseClasses, variantClasses, sizeClasses, loadingClasses, disabledClasses, className].filter(Boolean).join(" ")

    return (
      <button ref={ref} className={classes} disabled={disabled ?? isLoading} {...props}>
        {isLoading && <span className="btn__spinner" />}
        {!isLoading && leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
        <span className="btn__content">{children}</span>
        {!isLoading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
