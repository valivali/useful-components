import { createContext } from "react"

import type { IToastContext } from "./types"

export const ToastContext = createContext<IToastContext | undefined>(undefined)
