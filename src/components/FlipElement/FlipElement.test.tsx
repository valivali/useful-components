import { describe, expect, it, jest } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import FlipElement, { type FlipElementProps } from "./FlipElement"

// Mock CSS custom properties support
Object.defineProperty(HTMLElement.prototype, "style", {
  value: {
    setProperty: jest.fn(),
    getPropertyValue: jest.fn()
  },
  writable: true
})

describe("FlipElement", () => {
  const defaultProps: FlipElementProps = {
    children: <div data-testid="front-content">Front Side</div>,
    flipTo: <div data-testid="back-content">Back Side</div>
  }

  const renderFlipElement = (props: Partial<FlipElementProps> = {}) => {
    return render(<FlipElement {...defaultProps} {...props} />)
  }

  describe("Rendering", () => {
    it("renders with default props", () => {
      renderFlipElement()

      expect(screen.getByTestId("front-content")).toBeDefined()
      expect(screen.getByTestId("back-content")).toBeDefined()
    })

    it("applies default CSS classes", () => {
      renderFlipElement()

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("flip-element")
      expect(container?.className).toContain("flip-element--horizontal")
      expect(container?.className).toContain("flip-element--clickable")
      expect(container?.className).not.toContain("flip-element--flipped")
    })

    it("applies custom className", () => {
      renderFlipElement({ className: "custom-class" })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("custom-class")
    })

    it("applies custom styles with flip duration", () => {
      renderFlipElement({
        style: { backgroundColor: "red" },
        flipDuration: 1000
      })

      const container = screen.getByTestId("front-content").closest(".flip-element") as HTMLElement
      expect(container).toBeTruthy()
      expect(container.style.backgroundColor).toBe("red")
    })

    it("applies vertical flip direction class", () => {
      renderFlipElement({ flipDirection: "vertical" })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("flip-element--vertical")
      expect(container?.className).not.toContain("flip-element--horizontal")
    })
  })

  describe("Click Action", () => {
    it("flips on click by default", async () => {
      const user = userEvent.setup()
      renderFlipElement()

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).not.toContain("flip-element--flipped")

      if (container) {
        await user.click(container)
        expect(container.className).toContain("flip-element--flipped")

        await user.click(container)
        expect(container.className).not.toContain("flip-element--flipped")
      }
    })

    it("calls onFlipChange callback on click", async () => {
      const user = userEvent.setup()
      const onFlipChange = jest.fn()
      renderFlipElement({ onFlipChange })

      const container = screen.getByTestId("front-content").closest(".flip-element")

      if (container) {
        await user.click(container)
        expect(onFlipChange).toHaveBeenCalledWith(true)

        await user.click(container)
        expect(onFlipChange).toHaveBeenCalledWith(false)
      }
    })

    it("does not add clickable class when action is not click", () => {
      renderFlipElement({ action: "hover" })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).not.toContain("flip-element--clickable")
    })
  })

  describe("Hover Action", () => {
    it("flips on hover", () => {
      const onFlipChange = jest.fn()
      renderFlipElement({ action: "hover", onFlipChange })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).not.toContain("flip-element--flipped")

      if (container) {
        fireEvent.mouseEnter(container)
        expect(container.className).toContain("flip-element--flipped")
        expect(onFlipChange).toHaveBeenCalledWith(true)

        fireEvent.mouseLeave(container)
        expect(container.className).not.toContain("flip-element--flipped")
        expect(onFlipChange).toHaveBeenCalledWith(false)
      }
    })

    it("does not flip on click when action is hover", async () => {
      const onFlipChange = jest.fn()

      // Create a fresh render to avoid state pollution from previous tests
      const { container: testContainer } = render(
        <FlipElement
          action="hover"
          onFlipChange={onFlipChange}
          initialFlipped={false}
          flipTo={<div data-testid="back-content-isolated">Back Side</div>}>
          <div data-testid="front-content-isolated">Front Side</div>
        </FlipElement>
      )

      const container = testContainer.querySelector(".flip-element")
      expect(container?.className).not.toContain("flip-element--flipped")

      if (container) {
        // Clear any previous calls
        onFlipChange.mockClear()

        // Use fireEvent.click instead of userEvent.click to avoid mouseenter events
        fireEvent.click(container)
        expect(container.className).not.toContain("flip-element--flipped")
        expect(onFlipChange).not.toHaveBeenCalled()
      }
    })
  })

  describe("Function Action (Controlled)", () => {
    it("respects controlled isFlipped prop", () => {
      const { rerender } = renderFlipElement({
        action: "function",
        isFlipped: false
      })

      let container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).not.toContain("flip-element--flipped")

      rerender(<FlipElement {...defaultProps} action="function" isFlipped={true} />)

      container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("flip-element--flipped")
    })

    it("does not flip on click when action is function", async () => {
      const user = userEvent.setup()
      const onFlipChange = jest.fn()
      renderFlipElement({
        action: "function",
        isFlipped: false,
        onFlipChange
      })

      const container = screen.getByTestId("front-content").closest(".flip-element")

      if (container) {
        await user.click(container)
        expect(container.className).not.toContain("flip-element--flipped")
        expect(onFlipChange).not.toHaveBeenCalled()
      }
    })

    it("does not flip on hover when action is function", () => {
      const onFlipChange = jest.fn()
      renderFlipElement({
        action: "function",
        isFlipped: false,
        onFlipChange
      })

      const container = screen.getByTestId("front-content").closest(".flip-element")

      if (container) {
        fireEvent.mouseEnter(container)
        expect(container.className).not.toContain("flip-element--flipped")
        expect(onFlipChange).not.toHaveBeenCalled()
      }
    })
  })

  describe("Initial State", () => {
    it("starts flipped when initialFlipped is true", () => {
      renderFlipElement({ initialFlipped: true })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("flip-element--flipped")
    })

    it("starts unflipped when initialFlipped is false", () => {
      renderFlipElement({ initialFlipped: false })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).not.toContain("flip-element--flipped")
    })
  })

  describe("Controlled vs Uncontrolled", () => {
    it("works in uncontrolled mode (no isFlipped prop)", async () => {
      const user = userEvent.setup()
      const onFlipChange = jest.fn()
      renderFlipElement({ onFlipChange })

      const container = screen.getByTestId("front-content").closest(".flip-element")

      if (container) {
        await user.click(container)
        expect(container.className).toContain("flip-element--flipped")
        expect(onFlipChange).toHaveBeenCalledWith(true)
      }
    })

    it("works in controlled mode with isFlipped prop", () => {
      const onFlipChange = jest.fn()
      const { rerender } = renderFlipElement({
        action: "function",
        isFlipped: false,
        onFlipChange
      })

      let container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).not.toContain("flip-element--flipped")

      rerender(<FlipElement {...defaultProps} action="function" isFlipped={true} onFlipChange={onFlipChange} />)

      container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("flip-element--flipped")
    })

    it("does not update internal state when controlled", async () => {
      const user = userEvent.setup()
      const onFlipChange = jest.fn()
      renderFlipElement({
        isFlipped: false, // Controlled mode
        onFlipChange
      })

      const container = screen.getByTestId("front-content").closest(".flip-element")

      if (container) {
        await user.click(container)
        // Should call callback but not change visual state since it's controlled
        expect(onFlipChange).toHaveBeenCalledWith(true)
        expect(container.className).not.toContain("flip-element--flipped")
      }
    })
  })

  describe("Edge Cases", () => {
    it("handles missing onFlipChange callback gracefully", async () => {
      const user = userEvent.setup()
      renderFlipElement({ onFlipChange: undefined })

      const container = screen.getByTestId("front-content").closest(".flip-element")

      if (container) {
        // Should not throw error when clicking without callback
        await user.click(container)
        expect(container.className).toContain("flip-element--flipped")
      }
    })

    it("handles empty className prop", () => {
      renderFlipElement({ className: "" })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container?.className).toContain("flip-element")
    })

    it("handles undefined style prop", () => {
      renderFlipElement({ style: undefined })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container).toBeTruthy()
    })

    it("handles zero flip duration", () => {
      renderFlipElement({ flipDuration: 0 })

      const container = screen.getByTestId("front-content").closest(".flip-element")
      expect(container).toBeTruthy()
    })
  })

  describe("DOM Structure", () => {
    it("maintains proper DOM structure", () => {
      renderFlipElement()

      const frontContent = screen.getByTestId("front-content")
      const backContent = screen.getByTestId("back-content")

      expect(frontContent.closest(".flip-element__front")).toBeTruthy()
      expect(backContent.closest(".flip-element__back")).toBeTruthy()
      expect(frontContent.closest(".flip-element__inner")).toBeTruthy()
      expect(backContent.closest(".flip-element__inner")).toBeTruthy()
    })
  })
})
