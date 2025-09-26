import "./App.scss"

import { Route, Routes } from "react-router-dom"

import ErrorBoundary from "@/components/general/ErrorBoundary"
import DragAndDropPage from "@/pages/drag-and-drop/DragAndDrop"
import ExpandablePage from "@/pages/expandable/Expandable"
import FlipPage from "@/pages/flip/Flip"
import HomePage from "@/pages/home/Home"

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flip" element={<FlipPage />} />
          <Route path="/drag-and-drop" element={<DragAndDropPage />} />
          <Route path="/expandable" element={<ExpandablePage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
