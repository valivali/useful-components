import "./App.scss"

import { Route, Routes } from "react-router-dom"

import ErrorBoundary from "@/components/general/ErrorBoundary"
import { ToastProvider } from "@/contexts/toast"
import DragAndDropPage from "@/pages/drag-and-drop/DragAndDrop"
import ExpandablePage from "@/pages/expandable/Expandable"
import FlipPage from "@/pages/flip/Flip"
import HomePage from "@/pages/home/Home"
import ToastPage from "@/pages/toast/Toast"
import { ToastContainer } from "@/styles/ui"

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flip" element={<FlipPage />} />
            <Route path="/drag-and-drop" element={<DragAndDropPage />} />
            <Route path="/expandable" element={<ExpandablePage />} />
            <Route path="/toast" element={<ToastPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
