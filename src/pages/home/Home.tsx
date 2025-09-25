import "./Home.scss"

import React from "react"
import { Link } from "react-router-dom"

interface ComponentInfo {
  id: string
  name: string
  description: string
  path: string
  icon: string
  tags: string[]
}

const components: ComponentInfo[] = [
  {
    id: "flip-element",
    name: "FlipElement",
    description: "A versatile component for creating smooth flip animations with click, hover, or programmatic triggers.",
    path: "/flip-element",
    icon: "🔄",
    tags: ["Animation", "Interactive", "Cards"]
  },
  {
    id: "drag-and-drop",
    name: "DragAndDropElement",
    description: "A powerful HTML5 drag and drop component with visual feedback, type restrictions, and custom styling.",
    path: "/drag-and-drop",
    icon: "🎯",
    tags: ["Interactive", "Drag & Drop", "HTML5"]
  },
  // Placeholder for future components
  {
    id: "coming-soon-1",
    name: "Coming Soon",
    description: "More awesome components are on the way!",
    path: "#",
    icon: "🚀",
    tags: ["Future"]
  }
]

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1>Useful Components Library</h1>
        <p>A collection of reusable React components with beautiful animations and interactions.</p>
      </header>

      <main className="home-page__content">
        <section className="components-grid">
          {components.map(component => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </section>
      </main>

      <footer className="home-page__footer">
        <p>Built with React, TypeScript, and SCSS</p>
      </footer>
    </div>
  )
}

interface ComponentCardProps {
  component: ComponentInfo
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  const isComingSoon = component.path === "#"

  const cardContent = (
    <div className={`component-card ${isComingSoon ? "component-card--coming-soon" : ""}`}>
      <div className="component-card__icon">{component.icon}</div>
      <div className="component-card__content">
        <h3 className="component-card__name">{component.name}</h3>
        <p className="component-card__description">{component.description}</p>
        <div className="component-card__tags">
          {component.tags.map(tag => (
            <span key={tag} className="component-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      {!isComingSoon && <div className="component-card__arrow">→</div>}
    </div>
  )

  if (isComingSoon) {
    return cardContent
  }

  return (
    <Link to={component.path} className="component-card-link">
      {cardContent}
    </Link>
  )
}

export default HomePage
