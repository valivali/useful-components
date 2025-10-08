export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info"
} as const

export type ToastTypeValue = (typeof ToastType)[keyof typeof ToastType]

export interface IToast {
  id: string
  type: ToastTypeValue
  title: string
  description?: string
  duration?: number
  isVisible?: boolean
}

export interface ToastState {
  toasts: IToast[]
}

export type ToastAction =
  | { type: "ADD_TOAST"; payload: IToast }
  | { type: "REMOVE_TOAST"; payload: { id: string } }
  | { type: "HIDE_TOAST"; payload: { id: string } }

export interface IToastContext {
  toasts: IToast[]
  showToast: (toast: Omit<IToast, "id">) => void
  hideToast: (id: string) => void
  removeToast: (id: string) => void
}
