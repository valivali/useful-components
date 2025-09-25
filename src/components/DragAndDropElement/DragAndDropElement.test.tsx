import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react"

import DragAndDropElement, { type DragItem, type DropZone } from "./DragAndDropElement"

interface MockDragEvent extends Event {
  dataTransfer: DataTransfer
}

const createDragEvent = (type: string, dataTransfer?: Partial<DataTransfer>): MockDragEvent => {
  const event = new Event(type, { bubbles: true, cancelable: true }) as MockDragEvent
  event.dataTransfer = {
    setData: jest.fn(),
    getData: jest.fn((_format: string) => ""),
    setDragImage: jest.fn(),
    effectAllowed: "move",
    dropEffect: "move",
    ...dataTransfer
  } as DataTransfer
  return event
}

describe("DragAndDropElement", () => {
  const mockItems: DragItem[] = [
    { id: "item-1", content: "Item 1" },
    { id: "item-2", content: "Item 2", type: "special" }
  ]

  const mockDropZones: DropZone[] = [
    { id: "zone-1", label: "Zone 1" },
    { id: "zone-2", label: "Zone 2", accepts: ["special"] }
  ]

  const defaultProps = {
    items: mockItems,
    dropZones: mockDropZones
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Basic Rendering", () => {
    it("renders draggable items", () => {
      render(<DragAndDropElement {...defaultProps} />)

      const item1 = screen.getByText("Item 1")
      const item2 = screen.getByText("Item 2")

      expect(item1).toBeDefined()
      expect(item2).toBeDefined()
    })

    it("renders drop zones", () => {
      render(<DragAndDropElement {...defaultProps} />)

      const zone1 = screen.getByText("Zone 1")
      const zone2 = screen.getByText("Zone 2")

      expect(zone1).toBeDefined()
      expect(zone2).toBeDefined()
    })

    it("makes items draggable", () => {
      render(<DragAndDropElement {...defaultProps} />)

      const item = screen.getByText("Item 1").closest(".draggable-item")
      expect(item?.getAttribute("draggable")).toBe("true")
    })
  })

  describe("Drag Events", () => {
    it("calls onDragStart when dragging starts", () => {
      const onDragStart = jest.fn()
      render(<DragAndDropElement {...defaultProps} onDragStart={onDragStart} />)

      const item = screen.getByText("Item 1").closest(".draggable-item")!
      fireEvent(item, createDragEvent("dragstart"))

      expect(onDragStart).toHaveBeenCalledWith("item-1")
    })

    it("calls onDragEnd when dragging ends", () => {
      const onDragEnd = jest.fn()
      render(<DragAndDropElement {...defaultProps} onDragEnd={onDragEnd} />)

      const item = screen.getByText("Item 1").closest(".draggable-item")!
      fireEvent(item, createDragEvent("dragend"))

      expect(onDragEnd).toHaveBeenCalledWith("item-1")
    })
  })

  describe("Drop Events", () => {
    it("prevents default on drag over", () => {
      render(<DragAndDropElement {...defaultProps} />)

      const dropZone = screen.getByText("Zone 1").closest(".drop-zone")!
      const dragOverEvent = createDragEvent("dragover")
      const preventDefaultSpy = jest.spyOn(dragOverEvent, "preventDefault")

      fireEvent(dropZone, dragOverEvent)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it("calls onDrop when item is dropped", () => {
      const onDrop = jest.fn()
      const getData = jest.fn((format: string) => {
        if (format === "application/json") {
          return JSON.stringify({ itemId: "item-1", sourceZone: null })
        }
        return ""
      })

      render(<DragAndDropElement {...defaultProps} onDrop={onDrop} />)

      // Start dragging first
      const item = screen.getByText("Item 1").closest(".draggable-item")!
      fireEvent(item, createDragEvent("dragstart"))

      const dropZone = screen.getByText("Zone 1").closest(".drop-zone")!
      const dropEvent = createDragEvent("drop", { getData })

      fireEvent(dropZone, dropEvent)

      expect(onDrop).toHaveBeenCalledWith("item-1", "zone-1", undefined)
    })
  })

  describe("Custom Classes", () => {
    it("applies custom className to container", () => {
      render(<DragAndDropElement {...defaultProps} className="custom-class" />)

      const container = document.querySelector(".drag-and-drop-container.custom-class")
      expect(container).toBeTruthy()
    })

    it("applies custom itemClassName", () => {
      render(<DragAndDropElement {...defaultProps} itemClassName="custom-item" />)

      const item = document.querySelector(".draggable-item.custom-item")
      expect(item).toBeTruthy()
    })
  })

  describe("Edge Cases", () => {
    it("handles empty items array", () => {
      render(<DragAndDropElement items={[]} dropZones={mockDropZones} />)

      const items = document.querySelectorAll(".draggable-item")
      expect(items.length).toBe(0)
    })

    it("handles empty drop zones array", () => {
      render(<DragAndDropElement items={mockItems} dropZones={[]} />)

      const zones = document.querySelectorAll(".drop-zone")
      expect(zones.length).toBe(0)
    })
  })
})
