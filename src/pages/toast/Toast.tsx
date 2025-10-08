import "./Toast.scss"

import React, { useCallback } from "react"

import { useToast } from "@/contexts/toast"
import { ToastType } from "@/contexts/toast/types"
import { Button, DemoSection, Page, PropsTable, TitleSm } from "@/styles/ui"

const ToastPage: React.FC = () => {
  const { showToast } = useToast()

  const showSuccessToast = useCallback(() => {
    showToast({
      type: ToastType.SUCCESS,
      title: "Success!",
      description: "Your action was completed successfully."
    })
  }, [showToast])

  const showErrorToast = useCallback(() => {
    showToast({
      type: ToastType.ERROR,
      title: "Error occurred",
      description: "Something went wrong. Please try again."
    })
  }, [showToast])

  const showWarningToast = useCallback(() => {
    showToast({
      type: ToastType.WARNING,
      title: "Warning",
      description: "Please review your input before proceeding."
    })
  }, [showToast])

  const showInfoToast = useCallback(() => {
    showToast({
      type: ToastType.INFO,
      title: "Information",
      description: "Here's some helpful information for you."
    })
  }, [showToast])

  const showCustomDurationToast = useCallback(() => {
    showToast({
      type: ToastType.INFO,
      title: "Custom Duration",
      description: "This toast will disappear in 2 seconds.",
      duration: 2000
    })
  }, [showToast])

  const showPersistentToast = useCallback(() => {
    showToast({
      type: ToastType.WARNING,
      title: "Persistent Toast",
      description: "This toast won't auto-dismiss. Click the X to close it.",
      duration: 0 // 0 means it won't auto-dismiss
    })
  }, [showToast])

  const showTitleOnlyToast = useCallback(() => {
    showToast({
      type: ToastType.SUCCESS,
      title: "Simple success message"
    })
  }, [showToast])

  const showMultipleToasts = useCallback(() => {
    showToast({
      type: ToastType.INFO,
      title: "First toast",
      description: "This is the first toast in a series."
    })

    setTimeout(() => {
      showToast({
        type: ToastType.SUCCESS,
        title: "Second toast",
        description: "This is the second toast."
      })
    }, 500)

    setTimeout(() => {
      showToast({
        type: ToastType.WARNING,
        title: "Third toast",
        description: "This is the third and final toast."
      })
    }, 1000)
  }, [showToast])

  return (
    <Page
      className="toast-page"
      title="Toast Component"
      subtitle="A flexible notification system with context-based state management and smooth animations."
      backLink={{ to: "/", text: "Back to Components", children: null }}>
      <DemoSection title="Toast Types" description="Different toast types with semantic colors and icons.">
        <div className="toast-demo-grid">
          <Button onClick={showSuccessToast} variant="outline">
            Show Success Toast
          </Button>
          <Button onClick={showErrorToast} variant="outline">
            Show Error Toast
          </Button>
          <Button onClick={showWarningToast} variant="outline">
            Show Warning Toast
          </Button>
          <Button onClick={showInfoToast} variant="outline">
            Show Info Toast
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Custom Duration" description="Control how long toasts are displayed before auto-dismissing.">
        <div className="toast-demo-grid">
          <Button onClick={showCustomDurationToast} variant="outline">
            2 Second Toast
          </Button>
          <Button onClick={showPersistentToast} variant="outline">
            Persistent Toast
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Content Variations" description="Toasts can display with or without descriptions.">
        <div className="toast-demo-grid">
          <Button onClick={showTitleOnlyToast} variant="outline">
            Title Only Toast
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Multiple Toasts" description="Stack multiple toasts with smooth animations.">
        <div className="toast-demo-grid">
          <Button onClick={showMultipleToasts} variant="outline">
            Show Multiple Toasts
          </Button>
        </div>
      </DemoSection>

      <div className="toast-page__footer">
        <TitleSm>Toast Props</TitleSm>
        <PropsTable
          props={[
            {
              name: "type",
              description: "ToastType.SUCCESS | ToastType.ERROR | ToastType.WARNING | ToastType.INFO",
              default: "ToastType.INFO"
            },
            { name: "title", description: "Main toast message (required)" },
            { name: "description", description: "Optional additional details" },
            { name: "duration", description: "Auto-dismiss duration in ms (0 = persistent)", default: "4000" }
          ]}
        />

        <TitleSm>useToast Hook</TitleSm>
        <PropsTable
          props={[
            { name: "showToast", description: "Function to display a new toast" },
            { name: "hideToast", description: "Function to hide a toast by ID" },
            { name: "removeToast", description: "Function to remove a toast by ID" },
            { name: "toasts", description: "Array of current toast objects" }
          ]}
        />
      </div>
    </Page>
  )
}

export default ToastPage
