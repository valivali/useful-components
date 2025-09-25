import "./DragAndDropElement.scss"

import React, { useRef } from "react"

import { useDragAndDrop } from "@/hooks/useDragAndDrop.ts"

export interface DragItem {
  id: string
  content: React.ReactNode
  type?: string
}

export interface DropZone {
  id: string
  label: string
  accepts?: string[]
}

export interface DragAndDropElementProps {
  items: DragItem[]
  dropZones: DropZone[]
  onDrop?: (itemId: string, dropZoneId: string) => void
  onDragStart?: (itemId: string) => void
  onDragEnd?: (itemId: string) => void
  className?: string
  dropZoneClassName?: string
  itemClassName?: string
}

export const DragAndDropElement: React.FC<DragAndDropElementProps> = ({
  items,
  dropZones,
  onDrop,
  onDragStart,
  onDragEnd,
  className = "",
  dropZoneClassName = "",
  itemClassName = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    dragState,
    handleDragStart: hookHandleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop: hookHandleDrop,
    handleDragEnd: hookHandleDragEnd,
    canDrop
  } = useDragAndDrop({
    onDrop,
    onDragStart,
    onDragEnd,
    dropZones
  })

  return (
    <div ref={containerRef} className={`drag-and-drop-container ${className}`}>
      {/* Draggable Items */}
      <div className="draggable-items">
        {items.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={e => hookHandleDragStart(e, item)}
            onDragEnd={e => hookHandleDragEnd(e, item)}
            className={`draggable-item ${itemClassName} ${dragState.draggedItem?.item.id === item.id ? "dragging" : ""}`}>
            {item.content}
          </div>
        ))}
      </div>

      {/* Drop Zones */}
      <div className="drop-zones">
        {dropZones.map(dropZone => (
          <div
            key={dropZone.id}
            onDragEnter={e => handleDragEnter(e, dropZone.id)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={e => hookHandleDrop(e, dropZone.id)}
            className={`drop-zone ${dropZoneClassName} ${dragState.dropZone === dropZone.id && canDrop(dropZone, dragState.draggedItem?.item ?? null) ? "hovered" : ""} ${dragState.dropZone === dropZone.id && !canDrop(dropZone, dragState.draggedItem?.item ?? null) ? "invalid" : ""}`}>
            <div className="drop-zone-label">{dropZone.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DragAndDropElement
