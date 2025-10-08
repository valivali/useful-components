import "./ToastElement.scss"

import React from "react"
import { match } from "ts-pattern"

import type { IToast } from "@/contexts/toast/types"
import { ToastType } from "@/contexts/toast/types"

interface ToastElementProps {
  toast: IToast
  onClose: (id: string) => void
}

const ToastElement: React.FC<ToastElementProps> = ({ toast, onClose }) => {
  const { id, type, title, description, isVisible } = toast

  const getIcon = () =>
    match(type)
      .with(ToastType.SUCCESS, () => "✓")
      .with(ToastType.ERROR, () => "✕")
      .with(ToastType.WARNING, () => "⚠")
      .with(ToastType.INFO, () => "ℹ")
      .exhaustive()

  return (
    <div
      className={`toast-element toast-element--${type} ${isVisible ? "toast-element--visible" : "toast-element--hidden"}`}
      role="alert"
      aria-live="polite">
      <div className="toast-element__icon">{getIcon()}</div>
      <div className="toast-element__content">
        <div className="toast-element__title">{title}</div>
        {description && <div className="toast-element__description">{description}</div>}
      </div>
      <button className="toast-element__close" onClick={() => onClose(id)} aria-label="Close notification" type="button">
        ✕
      </button>
    </div>
  )
}

export default ToastElement
