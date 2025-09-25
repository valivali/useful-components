import "./DragAndDrop.scss"

import React, { useCallback, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { match } from "ts-pattern"

import DragAndDropElement, { type DragItem, type DropZone } from "@/components/DragAndDropElement"

// Task status types for the Kanban board
interface Task extends DragItem {
  status: "todo" | "progress" | "done"
  title: string
}

// Static data moved outside component to prevent recreation on every render
const INITIAL_TASKS: Task[] = [
  { id: "task-1", content: "🎯 Design Homepage", status: "todo", title: "Design Homepage" },
  { id: "task-2", content: "📝 Write Documentation", status: "todo", title: "Write Documentation" },
  { id: "task-3", content: "🐛 Fix Login Bug", status: "todo", title: "Fix Login Bug" },
  { id: "task-4", content: "🚀 Deploy to Staging", status: "progress", title: "Deploy to Staging" },
  { id: "task-5", content: "✅ Setup Database", status: "done", title: "Setup Database" }
]

const KANBAN_COLUMNS: DropZone[] = [
  { id: "todo", label: "📋 To Do" },
  { id: "progress", label: "⚡ In Progress" },
  { id: "done", label: "✅ Done" }
]

const BASIC_ITEMS: DragItem[] = [
  { id: "item-1", content: "🎯 Task A" },
  { id: "item-2", content: "📝 Task B" },
  { id: "item-3", content: "🚀 Task C" },
  { id: "item-4", content: "💡 Task D" }
]

const BASIC_DROP_ZONES: DropZone[] = [
  { id: "todo", label: "📋 To Do" },
  { id: "progress", label: "⚡ In Progress" },
  { id: "done", label: "✅ Done" }
]

const TYPED_ITEMS: DragItem[] = [
  { id: "fruit-1", content: "🍎 Apple", type: "fruit" },
  { id: "fruit-2", content: "🍌 Banana", type: "fruit" },
  { id: "vegetable-1", content: "🥕 Carrot", type: "vegetable" },
  { id: "vegetable-2", content: "🥬 Lettuce", type: "vegetable" },
  { id: "meat-1", content: "🥩 Steak", type: "meat" },
  { id: "dairy-1", content: "🧀 Cheese", type: "dairy" }
]

const TYPED_DROP_ZONES: DropZone[] = [
  { id: "fruits-basket", label: "🧺 Fruits Basket", accepts: ["fruit"] },
  { id: "veggie-box", label: "📦 Vegetable Box", accepts: ["vegetable"] },
  { id: "fridge", label: "❄️ Refrigerator", accepts: ["meat", "dairy"] },
  { id: "pantry", label: "🏠 Pantry", accepts: [] } // Accepts all types
]

const PRODUCTS: DragItem[] = [
  { id: "laptop", content: "💻 Laptop - $999" },
  { id: "mouse", content: "🖱️ Wireless Mouse - $29" },
  { id: "keyboard", content: "⌨️ Keyboard - $79" },
  { id: "monitor", content: "🖥️ Monitor - $299" },
  { id: "headphones", content: "🎧 Headphones - $149" }
]

const SHOPPING_DROP_ZONES: DropZone[] = [
  { id: "cart", label: "🛒 Shopping Cart" },
  { id: "wishlist", label: "💝 Wishlist" },
  { id: "products", label: "🏪 Products" }
]

const CUSTOM_ITEMS: DragItem[] = [
  { id: "custom-1", content: <div className="custom-item gradient-1">🌟 Premium</div> },
  { id: "custom-2", content: <div className="custom-item gradient-2">💎 Luxury</div> },
  { id: "custom-3", content: <div className="custom-item gradient-3">🚀 Pro</div> }
]

const CUSTOM_DROP_ZONES: DropZone[] = [
  { id: "tier-1", label: "⭐ Tier 1" },
  { id: "tier-2", label: "⭐⭐ Tier 2" },
  { id: "tier-3", label: "⭐⭐⭐ Tier 3" }
]

// Kanban Board Component that demonstrates items moving between zones
const KanbanBoard: React.FC = React.memo(() => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  // This is the key logic - inspired by your example
  const handleTaskDrop = useCallback((taskId: string, targetColumnId: string) => {
    setTasks(prevTasks => {
      const taskToMove = prevTasks.find(task => task.id === taskId)
      if (!taskToMove) return prevTasks

      // Don't move if already in target column
      if (taskToMove.status === targetColumnId) return prevTasks

      // Update the task status based on target column using ts-pattern
      const newStatus = match(targetColumnId)
        .with("todo", () => "todo" as const)
        .with("progress", () => "progress" as const)
        .with("done", () => "done" as const)
        .otherwise(() => taskToMove.status)

      // Return updated tasks array
      return prevTasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    })
  }, [])

  // Memoized helper to get tasks for a specific column
  const getTasksForColumn = useCallback(
    (status: string) => {
      return tasks.filter(task => task.status === status)
    },
    [tasks]
  )

  // Memoized columns data for each column to prevent unnecessary re-renders
  const columnsData = useMemo(() => {
    return KANBAN_COLUMNS.map(column => ({
      ...column,
      tasks: getTasksForColumn(column.id)
    }))
  }, [getTasksForColumn])

  return (
    <div className="kanban-board">
      {columnsData.map(columnData => (
        <div key={columnData.id} className="kanban-column">
          <h3 className="kanban-column-title">
            {columnData.label} ({columnData.tasks.length})
          </h3>
          <div className="kanban-column-content">
            <DragAndDropElement
              items={columnData.tasks}
              dropZones={KANBAN_COLUMNS} // Show ALL columns as drop zones
              onDrop={handleTaskDrop}
              className="kanban-drag-drop"
              itemClassName="kanban-task"
              dropZoneClassName="kanban-drop-zone"
            />
          </div>
        </div>
      ))}
    </div>
  )
})

const DragAndDropPage: React.FC = () => {
  // State for shopping demo
  const [cart, setCart] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  // Memoized callback functions to prevent unnecessary re-renders
  const handleBasicDrop = useCallback((itemId: string, dropZoneId: string) => {
    console.log(`Dropped ${itemId} into ${dropZoneId}`)
  }, [])

  const handleTypedDrop = useCallback((itemId: string, dropZoneId: string) => {
    console.log(`Dropped typed item ${itemId} into ${dropZoneId}`)
  }, [])

  const handleCustomDrop = useCallback((itemId: string, dropZoneId: string) => {
    console.log(`Custom drop: ${itemId} → ${dropZoneId}`)
  }, [])

  const handleDragStart = useCallback((itemId: string) => {
    console.log("Started dragging:", itemId)
  }, [])

  const handleDragEnd = useCallback((itemId: string) => {
    console.log("Stopped dragging:", itemId)
  }, [])

  const handleShoppingDrop = useCallback(
    (itemId: string, dropZoneId: string, _sourceZoneId?: string) => {
      if (dropZoneId === "cart") {
        if (!cart.includes(itemId)) {
          setCart(prev => [...prev, itemId])
          setWishlist(prev => prev.filter(id => id !== itemId))
        }
      } else if (dropZoneId === "wishlist") {
        if (!wishlist.includes(itemId)) {
          setWishlist(prev => [...prev, itemId])
          setCart(prev => prev.filter(id => id !== itemId))
        }
      } else if (dropZoneId === "products") {
        setCart(prev => prev.filter(id => id !== itemId))
        setWishlist(prev => prev.filter(id => id !== itemId))
      }
    },
    [cart, wishlist]
  )

  // Memoized shopping items to prevent unnecessary filtering
  const cartItems = useMemo(() => PRODUCTS.filter(p => cart.includes(p.id)), [cart])

  const wishlistItems = useMemo(() => PRODUCTS.filter(p => wishlist.includes(p.id)), [wishlist])

  const availableProducts = useMemo(() => PRODUCTS.filter(p => !cart.includes(p.id) && !wishlist.includes(p.id)), [cart, wishlist])

  // Memoized global drop zone handler
  const handleGlobalDrop = useCallback(
    (e: React.DragEvent, zoneId: string) => {
      e.preventDefault()
      const itemId = e.dataTransfer.getData("text/plain")
      handleShoppingDrop(itemId, zoneId)
    },
    [handleShoppingDrop]
  )

  return (
    <div className="drag-and-drop-page">
      <header className="drag-and-drop-page__header">
        <Link to="/" className="drag-and-drop-page__back-link">
          ← Back to Components
        </Link>
        <h1>DragAndDropElement Component</h1>
        <p>A powerful component for implementing HTML5 drag and drop functionality with visual feedback.</p>
      </header>

      <main className="drag-and-drop-page__content">
        <section className="demo-section">
          <h2>Basic Drag and Drop</h2>
          <p>Drag tasks between different status columns. Notice the visual feedback when hovering over drop zones.</p>
          <div className="demo-container">
            <DragAndDropElement
              items={BASIC_ITEMS}
              dropZones={BASIC_DROP_ZONES}
              onDrop={handleBasicDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="basic-demo"
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>Kanban Board - Items Move Between Columns</h2>
          <p>
            This example shows items actually moving between columns when dropped. The state management is handled in the demo component,
            not the hook.
          </p>
          <div className="demo-container">
            <KanbanBoard />
          </div>
        </section>

        <section className="demo-section">
          <h2>Type-Restricted Drag and Drop</h2>
          <p>Items can only be dropped in compatible zones. Try dropping fruits in the vegetable box - it won't work!</p>
          <div className="demo-container">
            <DragAndDropElement items={TYPED_ITEMS} dropZones={TYPED_DROP_ZONES} onDrop={handleTypedDrop} className="typed-demo" />
          </div>
        </section>

        <section className="demo-section">
          <h2>Interactive Shopping Demo</h2>
          <p>Drag products between the store, cart, and wishlist. Items move between collections dynamically.</p>
          <div className="demo-container">
            <div className="shopping-demo">
              <div className="shopping-section">
                <h3>🏪 Available Products</h3>
                <DragAndDropElement
                  items={availableProducts}
                  dropZones={[SHOPPING_DROP_ZONES[2]]} // Only products zone
                  onDrop={handleShoppingDrop}
                  className="shopping-products"
                />
              </div>

              <div className="shopping-section">
                <h3>🛒 Shopping Cart ({cart.length} items)</h3>
                <DragAndDropElement
                  items={cartItems}
                  dropZones={[SHOPPING_DROP_ZONES[0]]} // Only cart zone
                  onDrop={handleShoppingDrop}
                  className="shopping-cart"
                />
              </div>

              <div className="shopping-section">
                <h3>💝 Wishlist ({wishlist.length} items)</h3>
                <DragAndDropElement
                  items={wishlistItems}
                  dropZones={[SHOPPING_DROP_ZONES[1]]} // Only wishlist zone
                  onDrop={handleShoppingDrop}
                  className="shopping-wishlist"
                />
              </div>

              {/* Global drop zones for cross-section dragging */}
              <div className="global-drop-zones">
                <div className="drop-zone-row">
                  {SHOPPING_DROP_ZONES.map(zone => (
                    <div
                      key={zone.id}
                      className="global-drop-zone"
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => handleGlobalDrop(e, zone.id)}>
                      {zone.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Custom Styled Elements</h2>
          <p>Customize the appearance of draggable items and drop zones.</p>
          <div className="demo-container">
            <DragAndDropElement
              items={CUSTOM_ITEMS}
              dropZones={CUSTOM_DROP_ZONES}
              onDrop={handleCustomDrop}
              className="custom-demo"
              itemClassName="custom-draggable"
              dropZoneClassName="custom-drop-zone"
            />
          </div>
        </section>
      </main>

      <footer className="drag-and-drop-page__footer">
        <h3>Props</h3>
        <div className="props-table">
          <div className="prop-row">
            <code>items</code>
            <span>Array of draggable items with id, content, and optional type</span>
          </div>
          <div className="prop-row">
            <code>dropZones</code>
            <span>Array of drop zones with id, label, and optional accepts array</span>
          </div>
          <div className="prop-row">
            <code>onDrop</code>
            <span>Callback when item is dropped: (itemId, dropZoneId) =&gt; void</span>
          </div>
          <div className="prop-row">
            <code>onDragStart</code>
            <span>Callback when dragging starts: (itemId) =&gt; void</span>
          </div>
          <div className="prop-row">
            <code>onDragEnd</code>
            <span>Callback when dragging ends: (itemId) =&gt; void</span>
          </div>
          <div className="prop-row">
            <code>className</code>
            <span>Additional CSS class for the container</span>
          </div>
          <div className="prop-row">
            <code>itemClassName</code>
            <span>Additional CSS class for draggable items</span>
          </div>
          <div className="prop-row">
            <code>dropZoneClassName</code>
            <span>Additional CSS class for drop zones</span>
          </div>
        </div>

        <h3>Features</h3>
        <ul className="features-list">
          <li>✨ HTML5 drag and drop with visual feedback</li>
          <li>🔒 Type-based restrictions for drop zones</li>
          <li>🎨 Fully customizable styling</li>
          <li>📱 Responsive design</li>
          <li>⚡ Smooth animations and transitions</li>
          <li>🎮 Event callbacks for custom logic</li>
          <li>♿ Accessible drag and drop interactions</li>
        </ul>
      </footer>
    </div>
  )
}

export default DragAndDropPage
