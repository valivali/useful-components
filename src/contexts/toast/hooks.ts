import { useContext } from "react"

import { ToastContext } from "./context"
import type { IToastContext } from "./types"

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
