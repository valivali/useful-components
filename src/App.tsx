import "./App.scss"

import { Route, Routes } from "react-router-dom"

import ErrorBoundary from "@/components/general/ErrorBoundary"
import DragAndDropPage from "@/pages/drag-and-drop/DragAndDrop"
import FlipElementPage from "@/pages/flip-element/FlipElement"
import HomePage from "@/pages/home/Home"

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flip-element" element={<FlipElementPage />} />
          <Route path="/drag-and-drop" element={<DragAndDropPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
