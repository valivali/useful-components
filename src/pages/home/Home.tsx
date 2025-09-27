import "./Home.scss"

import React from "react"

import { Card, CardContent, CardDescription, CardIcon, CardTags, CardTitle, Grid, Page } from "@/styles/ui"

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
    id: "flip",
    name: "Flip",
    description: "A versatile component for creating smooth flip animations with click, hover, or programmatic triggers.",
    path: "/flip",
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
  {
    id: "expandable",
    name: "Expandable",
    description: "A flexible component for creating expandable UI elements like accordions, menus, and sidebars with smooth animations.",
    path: "/expandable",
    icon: "📋",
    tags: ["Animation", "Interactive", "Layout", "Accordion"]
  }
]

const HomePage: React.FC = () => {
  return (
    <Page
      className="home-page"
      title="Useful Components Library"
      subtitle="A collection of reusable React components with beautiful animations and interactions.">
      <Grid columns="auto-fit" className="components-grid">
        {components.map(component => (
          <ComponentCard key={component.id} component={component} />
        ))}
      </Grid>
    </Page>
  )
}

interface ComponentCardProps {
  component: ComponentInfo
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  const isComingSoon = component.path === "#"

  return (
    <Card to={isComingSoon ? undefined : component.path} interactive={!isComingSoon} comingSoon={isComingSoon} className="component-card">
      <CardIcon>{component.icon}</CardIcon>
      <CardContent>
        <CardTitle>{component.name}</CardTitle>
        <CardDescription>{component.description}</CardDescription>
        <CardTags tags={component.tags} />
      </CardContent>
    </Card>
  )
}

export default HomePage
