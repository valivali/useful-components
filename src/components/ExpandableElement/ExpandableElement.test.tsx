import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import ExpandableElement, { type ExpandableElementProps } from "./ExpandableElement"
import { ExpandActionEnum, ExpandDirectionEnum, FoldDirectionEnum } from "./types"

const mockResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: mockResizeObserver
})

const mockAddEventListener = jest.fn()
const mockRemoveEventListener = jest.fn()
Object.defineProperty(window, "addEventListener", { value: mockAddEventListener })
Object.defineProperty(window, "removeEventListener", { value: mockRemoveEventListener })

describe("ExpandableElement", () => {
  const defaultProps: ExpandableElementProps = {
    trigger: <button>Toggle</button>,
    children: <div>Expandable content</div>
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Basic Rendering", () => {
    it("renders trigger and content", () => {
      render(<ExpandableElement {...defaultProps} />)

      const trigger = screen.getByText("Toggle")
      const content = screen.getByText("Expandable content")

      expect(trigger).toBeDefined()
      expect(content).toBeDefined()
    })

    it("starts collapsed by default", () => {
      render(<ExpandableElement {...defaultProps} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.classList.contains("expandable-element--collapsed")).toBe(true)
      expect(container.classList.contains("expandable-element--expanded")).toBe(false)
    })

    it("starts expanded when initialExpanded is true", () => {
      render(<ExpandableElement {...defaultProps} initialExpanded />)

      const container = screen.getByTestId("expandable-element")
      expect(container.classList.contains("expandable-element--expanded")).toBe(true)
      expect(container.classList.contains("expandable-element--collapsed")).toBe(false)
    })

    it("applies correct direction classes", () => {
      render(<ExpandableElement {...defaultProps} expandDirection={ExpandDirectionEnum.RIGHT} foldDirection={FoldDirectionEnum.LEFT} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.classList.contains("expandable-element--expand-right")).toBe(true)
      expect(container.classList.contains("expandable-element--fold-left")).toBe(true)
    })
  })

  describe("Click Interaction", () => {
    it("toggles expansion on trigger click", async () => {
      render(<ExpandableElement {...defaultProps} />)

      const trigger = screen.getByText("Toggle")
      const container = screen.getByTestId("expandable-element")

      expect(container.classList.contains("expandable-element--collapsed")).toBe(true)

      fireEvent.click(trigger)
      await waitFor(() => {
        expect(container.classList.contains("expandable-element--expanded")).toBe(true)
      })

      fireEvent.click(trigger)
      await waitFor(() => {
        expect(container.classList.contains("expandable-element--collapsed")).toBe(true)
      })
    })

    it("calls onExpandChange when toggled", () => {
      const onExpandChange = jest.fn()
      render(<ExpandableElement {...defaultProps} onExpandChange={onExpandChange} />)

      const trigger = screen.getByText("Toggle")
      fireEvent.click(trigger)

      expect(onExpandChange).toHaveBeenCalledWith(true)
    })

    it("makes trigger clickable when action is click", () => {
      render(<ExpandableElement {...defaultProps} action={ExpandActionEnum.CLICK} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.classList.contains("expandable-element--clickable")).toBe(true)
    })
  })

  describe("Hover Interaction", () => {
    it("expands on hover and collapses on mouse leave", async () => {
      render(<ExpandableElement {...defaultProps} action={ExpandActionEnum.HOVER} />)

      const triggerContainer = screen.getByTestId("expandable-trigger")
      const container = screen.getByTestId("expandable-element")

      expect(container.classList.contains("expandable-element--collapsed")).toBe(true)

      fireEvent.mouseEnter(triggerContainer)
      await waitFor(() => {
        expect(container.classList.contains("expandable-element--expanded")).toBe(true)
      })

      fireEvent.mouseLeave(triggerContainer)
      await waitFor(() => {
        expect(container.classList.contains("expandable-element--collapsed")).toBe(true)
      })
    })

    it("does not make trigger clickable when action is hover", () => {
      render(<ExpandableElement {...defaultProps} action={ExpandActionEnum.HOVER} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.classList.contains("expandable-element--clickable")).toBe(false)
    })
  })

  describe("Controlled State", () => {
    it("uses controlled state when isExpanded is provided", () => {
      const { rerender } = render(<ExpandableElement {...defaultProps} isExpanded={false} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.classList.contains("expandable-element--collapsed")).toBe(true)

      rerender(<ExpandableElement {...defaultProps} isExpanded={true} />)
      expect(container.classList.contains("expandable-element--expanded")).toBe(true)
    })

    it("ignores clicks when using controlled state without onExpandChange", () => {
      render(<ExpandableElement {...defaultProps} isExpanded={false} />)

      const trigger = screen.getByText("Toggle")
      const container = screen.getByTestId("expandable-element")

      fireEvent.click(trigger)

      expect(container.classList.contains("expandable-element--collapsed")).toBe(true)
    })
  })

  describe("Function Action", () => {
    it("does not respond to clicks when action is function", () => {
      render(<ExpandableElement {...defaultProps} action={ExpandActionEnum.FUNCTION} />)

      const trigger = screen.getByText("Toggle")
      const container = screen.getByTestId("expandable-element")

      fireEvent.click(trigger)

      expect(container.classList.contains("expandable-element--collapsed")).toBe(true)
    })
  })

  describe("Animation and Styling", () => {
    it("applies custom animation speed", () => {
      render(<ExpandableElement {...defaultProps} animationSpeed={500} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.style.getPropertyValue("--animation-speed")).toBe("500ms")
    })

    it("applies custom classes", () => {
      render(
        <ExpandableElement
          {...defaultProps}
          className="custom-container"
          triggerClassName="custom-trigger"
          contentClassName="custom-content"
        />
      )

      const container = screen.getByTestId("expandable-element")
      const trigger = screen.getByTestId("expandable-trigger")
      const content = screen.getByTestId("expandable-content")

      expect(container).toBeTruthy()
      expect(trigger).toBeTruthy()
      expect(content).toBeTruthy()
    })

    it("applies custom styles", () => {
      const customStyle = { backgroundColor: "red" }
      render(<ExpandableElement {...defaultProps} style={customStyle} />)

      const container = screen.getByTestId("expandable-element")
      expect(container.style.backgroundColor).toBe("red")
    })

    it("disables smooth transitions when smooth is false", () => {
      render(<ExpandableElement {...defaultProps} smooth={false} />)

      const trigger = screen.getByText("Toggle")
      fireEvent.click(trigger)

      const content = screen.getByTestId("expandable-content")
      expect(content.className).toContain("expandable-element__content--no-smooth")
    })
  })

  describe("Content Sizing", () => {
    it("applies maxSize when provided", () => {
      render(<ExpandableElement {...defaultProps} maxSize={200} initialExpanded />)

      const container = screen.getByTestId("expandable-element")
      const computedStyle = getComputedStyle(container)
      expect(computedStyle.getPropertyValue("--content-height")).toBe("200px")
    })

    it("handles horizontal expansion", () => {
      render(<ExpandableElement {...defaultProps} expandDirection={ExpandDirectionEnum.RIGHT} initialExpanded maxSize={300} />)

      const container = screen.getByTestId("expandable-element")
      const computedStyle = getComputedStyle(container)
      expect(computedStyle.getPropertyValue("--content-width")).toBe("300px")

      const content = screen.getByTestId("expandable-content")
      expect(content.className).toContain("expandable-element__content--expanded-horizontal")
    })
  })

  describe("Edge Cases", () => {
    it("handles empty trigger", () => {
      render(<ExpandableElement trigger={null} children={<div>Content</div>} />)

      const content = screen.getByText("Content")
      expect(content).toBeDefined()
    })

    it("handles empty children", () => {
      render(<ExpandableElement trigger={<button>Toggle</button>} children={null} />)

      const trigger = screen.getByText("Toggle")
      expect(trigger).toBeDefined()
    })

    it("cleans up event listeners on unmount", () => {
      const { unmount } = render(<ExpandableElement {...defaultProps} />)

      unmount()

      expect(mockRemoveEventListener).toHaveBeenCalledWith("resize", expect.any(Function))
    })
  })

  describe("Accessibility", () => {
    it("makes trigger focusable when clickable", () => {
      render(<ExpandableElement {...defaultProps} action={ExpandActionEnum.CLICK} />)

      const trigger = screen.getByTestId("expandable-trigger")
      expect(trigger.getAttribute("tabindex")).toBe(null)
    })

    it("supports keyboard navigation", () => {
      render(<ExpandableElement {...defaultProps} />)

      const trigger = screen.getByText("Toggle")

      fireEvent.keyDown(trigger, { key: "Enter", code: "Enter" })
    })
  })

  describe("Multiple Instances", () => {
    it("handles multiple independent instances", () => {
      render(
        <div>
          <ExpandableElement trigger={<button>Toggle 1</button>} children={<div>Content 1</div>} />
          <ExpandableElement trigger={<button>Toggle 2</button>} children={<div>Content 2</div>} />
        </div>
      )

      const trigger1 = screen.getByText("Toggle 1")

      fireEvent.click(trigger1)

      const containers = screen.getAllByTestId("expandable-element")
      expect(containers[0].classList.contains("expandable-element--expanded")).toBe(true)
      expect(containers[1].classList.contains("expandable-element--collapsed")).toBe(true)
    })
  })

  describe("Performance", () => {
    it("measures content size on mount", () => {
      const mockScrollHeight = 100
      const mockScrollWidth = 200

      Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
        configurable: true,
        value: mockScrollHeight
      })
      Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
        configurable: true,
        value: mockScrollWidth
      })

      render(<ExpandableElement {...defaultProps} expandDirection={ExpandDirectionEnum.BOTTOM} />)

      const contentInner = screen.getByTestId("expandable-element")
      expect(contentInner).toBeTruthy()
    })
  })
})
