import "./ToastContainer.scss"

import React from "react"

import ToastElement from "@/components/ToastElement"
import { useToast } from "@/contexts/toast"

const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map(toast => (
        <ToastElement key={toast.id} toast={toast} onClose={hideToast} />
      ))}
    </div>
  )
}

export default ToastContainer
