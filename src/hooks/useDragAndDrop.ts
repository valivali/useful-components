import React, { useCallback, useState } from "react"

import type { DragItem, DropZone } from "@/components/DragAndDropElement"

interface DraggedItem {
  item: DragItem
  sourceZone: string | null
  sourceElement: HTMLElement
}

interface DragState {
  draggedItem: DraggedItem | null
  dropZone: string | null
}

interface UseDragAndDropProps {
  onDrop?: (itemId: string, dropZoneId: string, sourceZoneId?: string) => void
  onDragStart?: (itemId: string) => void
  onDragEnd?: (itemId: string) => void
  dropZones: DropZone[]
}

export const useDragAndDrop = ({ onDrop, onDragStart, onDragEnd, dropZones }: UseDragAndDropProps) => {
  const [dragState, setDragState] = useState<DragState>({
    draggedItem: null,
    dropZone: null
  })

  const clearDragState = useCallback(() => {
    setDragState({
      draggedItem: null,
      dropZone: null
    })
  }, [])

  const canDrop = useCallback((dropZone: DropZone, item: DragItem | null): boolean => {
    if (!item) return false
    if (!dropZone.accepts || dropZone.accepts.length === 0) return true
    return dropZone.accepts.includes(item.type ?? "")
  }, [])

  const handleDragStart = useCallback(
    (e: React.DragEvent, item: DragItem, sourceZoneId?: string) => {
      const sourceElement = e.currentTarget as HTMLElement

      setDragState({
        draggedItem: { item, sourceZone: sourceZoneId ?? null, sourceElement },
        dropZone: null
      })

      e.dataTransfer.setData("application/json", JSON.stringify({ itemId: item.id, sourceZone: sourceZoneId }))
      e.dataTransfer.effectAllowed = "move"

      onDragStart?.(item.id)
    },
    [onDragStart]
  )

  const handleDragEnter = useCallback(
    (e: React.DragEvent, targetDropZoneId: string) => {
      e.preventDefault()
      if (dragState.draggedItem) {
        const targetDropZone = dropZones.find(zone => zone.id === targetDropZoneId)
        if (targetDropZone && canDrop(targetDropZone, dragState.draggedItem.item)) {
          setDragState(prev => ({ ...prev, dropZone: targetDropZoneId }))
        }
      }
    },
    [dragState.draggedItem, dropZones, canDrop]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    // Only clear drop zone if we're actually leaving the drop zone
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragState(prev => ({ ...prev, dropZone: null }))
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent, targetDropZoneId: string) => {
      e.preventDefault()

      if (!dragState.draggedItem || !onDrop) {
        clearDragState()
        return
      }

      const { item, sourceZone } = dragState.draggedItem
      const targetDropZone = dropZones.find(zone => zone.id === targetDropZoneId)

      if (!targetDropZone || !canDrop(targetDropZone, item)) {
        clearDragState()
        return
      }

      // Don't drop if it's the same zone
      if (sourceZone === targetDropZoneId) {
        clearDragState()
        return
      }

      onDrop(item.id, targetDropZoneId, sourceZone ?? undefined)
      clearDragState()
    },
    [dragState.draggedItem, onDrop, dropZones, canDrop, clearDragState]
  )

  const handleDragEnd = useCallback(
    (_e: React.DragEvent, item: DragItem) => {
      onDragEnd?.(item.id)
      clearDragState()
    },
    [onDragEnd, clearDragState]
  )

  return {
    dragState,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    clearDragState,
    canDrop
  }
}
