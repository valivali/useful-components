import React, { useCallback, useReducer } from "react"

import { ToastContext } from "./context"
import type { IToast, IToastContext } from "./types"
import { generateId, toastReducer } from "./utils"

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

  const showToast = useCallback((toast: Omit<IToast, "id">) => {
    const id = generateId()
    const newToast: IToast = {
      ...toast,
      id,
      duration: toast.duration ?? 4000
    }

    dispatch({ type: "ADD_TOAST", payload: newToast })

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dispatch({ type: "HIDE_TOAST", payload: { id } })
        setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", payload: { id } })
        }, 300) // Animation duration
      }, newToast.duration)
    }
  }, [])

  const hideToast = useCallback((id: string) => {
    dispatch({ type: "HIDE_TOAST", payload: { id } })
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", payload: { id } })
    }, 300)
  }, [])

  const removeToast = useCallback((id: string) => {
    dispatch({ type: "REMOVE_TOAST", payload: { id } })
  }, [])

  const value: IToastContext = {
    toasts: state.toasts,
    showToast,
    hideToast,
    removeToast
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
