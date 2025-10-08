import { match } from "ts-pattern"

import type { ToastAction, ToastState } from "./types"

export const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const toastReducer = (state: ToastState, action: ToastAction): ToastState =>
  match(action)
    .with({ type: "ADD_TOAST" }, ({ payload }) => ({
      ...state,
      toasts: [...state.toasts, { ...payload, isVisible: true }]
    }))
    .with({ type: "HIDE_TOAST" }, ({ payload }) => ({
      ...state,
      toasts: state.toasts.map(toast => (toast.id === payload.id ? { ...toast, isVisible: false } : toast))
    }))
    .with({ type: "REMOVE_TOAST" }, ({ payload }) => ({
      ...state,
      toasts: state.toasts.filter(toast => toast.id !== payload.id)
    }))
    .exhaustive()
