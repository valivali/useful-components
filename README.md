# Useful Components Library

A collection of reusable React components with beautiful animations and interactions, built with TypeScript and modern development practices.

## ✨ Features

### Core Technologies

- ⚡ **Vite 7** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with new features
- 🔷 **TypeScript 5.8** - Type safety and better developer experience
- 🎨 **Sass** - Enhanced CSS with variables and mixins
- 🧭 **React Router** - Client-side routing

### Development Tools

- 🔍 **ESLint** - Code linting with TypeScript-aware rules and type checking
- 💅 **Prettier** - Code formatting integrated with ESLint
- 🧪 **Jest** - Testing framework with React Testing Library setup
- 📦 **Bundle Analyzer** - Analyze bundle size and composition
- 🪝 **lint-staged** - Pre-commit code quality checks

### Developer Experience

- 🛡️ **Error Boundaries** - Graceful error handling with user-friendly fallbacks
- 📁 **Absolute Imports** - Clean import paths with `@/` aliases
- 🔧 **Environment Variables** - Configurable app settings with example template
- 📋 **TypeScript Project References** - Optimized build performance
- 🎨 **Component Library** - Production-ready components with comprehensive examples
- 🚀 **Performance Optimized** - React best practices with memoization and static data
- ♿ **Accessibility First** - WCAG compliant components with proper ARIA support

## 🚀 Getting Started

### Prerequisites

- Node.js 20.18.0+ (see `.nvmrc` file)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project-name

# Install dependencies
npm install

# Copy environment variables template
cp env.example .env

# Start development server
npm run dev
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build

# Building
npm run build            # Build for production

# Code Quality
npm run lint             # Run ESLint with TypeScript type checking
npm run lint:fix         # Fix ESLint errors automatically

# Testing
npm run test             # Run Jest tests
```

## 🔧 Configuration

### Environment Variables

The boilerplate includes an `env.example` file with common configuration options:

```env
# Application Configuration
VITE_APP_TITLE=My App
VITE_APP_VERSION=1.0.0

# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEV_TOOLS=true
```

Copy this to `.env` and customize for your project.

### Absolute Imports

The project is configured with path aliases for cleaner imports:

```typescript
// Instead of relative imports
import ErrorBoundary from "../../components/general/ErrorBoundary"

// Use absolute imports
import ErrorBoundary from "@/components/general/ErrorBoundary"
```

Available aliases:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/pages/*` → `src/pages/*`
- `@/hooks/*` → `src/hooks/*`
- `@/contexts/*` → `src/contexts/*`

### ESLint Configuration

The boilerplate includes a comprehensive ESLint setup with:

- TypeScript-aware rules with type checking
- React and React Hooks rules
- Import sorting and unused import cleanup
- Prettier integration for consistent formatting

### Error Boundaries

The boilerplate includes a production-ready error boundary component that:

- Catches JavaScript errors in React components
- Displays user-friendly error messages
- Shows detailed error information in development
- Provides a reload button for recovery

## 🧪 Testing

### Test Setup

- Jest configured for TypeScript and React
- React Testing Library for component testing
- DOM mocking for browser APIs (IntersectionObserver, ResizeObserver, matchMedia)

### Writing Tests

```tsx
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import MyComponent from "./MyComponent"

// Wrap components that use React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("MyComponent", () => {
  it("renders correctly", () => {
    renderWithRouter(<MyComponent />)
    expect(screen.getByText("Hello world!")).toBeInTheDocument()
  })
})
```

## 🏗️ Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

## 📁 Project Structure

```
src/
├── components/
│   ├── general/           # General utility components (ErrorBoundary)
│   ├── FlipElement/       # FlipElement component with animations
│   │   ├── FlipElement.tsx
│   │   ├── FlipElement.scss
│   │   ├── FlipElement.test.tsx
│   │   └── index.ts
│   └── DragAndDropElement/ # Advanced drag and drop component
│       ├── DragAndDropElement.tsx
│       ├── DragAndDropElement.scss
│       ├── DragAndDropElement.test.tsx
│       └── index.ts
├── hooks/                 # Custom React hooks
│   └── useDragAndDrop.ts  # Drag and drop functionality hook
├── pages/                 # Page-level components for routing
│   ├── home/             # Homepage with component grid
│   ├── flip-element/     # FlipElement examples and documentation
│   └── drag-and-drop/    # DragAndDrop examples and documentation
├── App.tsx               # Main app component with routing
├── main.tsx              # Application entry point
└── setupTests.ts         # Jest test configuration
```

## 🧩 Available Components

### FlipElement

A versatile component for creating smooth flip animations with various trigger actions.

**Features:**

- Multiple trigger actions: click, hover, or programmatic
- Flip directions: horizontal or vertical
- Customizable animation duration
- Controlled and uncontrolled modes
- Accessibility support with reduced motion preferences

**Example:**

```tsx
<FlipElement action="click" flipDirection="horizontal" flipDuration={600} flipTo={<div>Back side content</div>}>
  <div>Front side content</div>
</FlipElement>
```

### DragAndDropElement

An advanced HTML5 drag-and-drop component with comprehensive features and performance optimizations.

**Features:**

- ✨ HTML5 drag and drop with visual feedback
- 🔒 Type-based restrictions for drop zones
- 🎨 Fully customizable styling with CSS classes
- 📱 Responsive design with mobile support
- ⚡ Smooth animations and transitions
- 🎮 Event callbacks for custom logic (onDrop, onDragStart, onDragEnd)
- ♿ Accessible drag and drop interactions
- 🚀 Performance optimized with `React.memo` and memoized callbacks
- 🎯 Multiple demo scenarios (Kanban board, shopping cart, type restrictions)

**Example:**

```tsx
const items = [
  { id: "item-1", content: "Task A", type: "task" },
  { id: "item-2", content: "Task B", type: "task" }
]

const dropZones = [
  { id: "todo", label: "To Do" },
  { id: "done", label: "Done", accepts: ["task"] }
]

const MyDragDropExample = () => {
  return (
    <DragAndDropElement
      items={items}
      dropZones={dropZones}
      onDrop={(itemId, dropZoneId) => console.log(`Dropped ${itemId} into ${dropZoneId}`)}
      className="my-drag-drop"
      itemClassName="draggable-item"
      dropZoneClassName="drop-zone"
    />
  )
}
```

**Props:**

- `items`: Array of draggable items with id, content, and optional type
- `dropZones`: Array of drop zones with id, label, and optionally accepts an array
- `onDrop`: Callback when item is dropped: (itemId, dropZoneId) => void
- `onDragStart`: Callback when dragging starts: (itemId) => void
- `onDragEnd`: Callback when dragging ends: (itemId) => void
- `className`: Additional CSS class for the container
- `itemClassName`: Additional CSS class for draggable items
- `dropZoneClassName`: Additional CSS class for drop zones

## 🆕 Recent Improvements

### Performance Optimizations (Latest Update)

The component library has been enhanced with comprehensive performance optimizations:

- **Static Data Extraction**: All demo data moved outside components to prevent recreation on every render
- **React.memo Integration**: KanbanBoard and other components wrapped with `React.memo` to prevent unnecessary re-renders
- **Memoized Callbacks**: All event handlers optimized with useCallback to maintain referential equality
- **Computed Values**: Shopping cart filtering and column data pre-computed with useMemo
- **Reduced Bundle Size**: Eliminated redundant object/function creation and inline JSX optimizations

**Impact**: Significantly improved rendering performance, especially during drag-and-drop operations and with larger datasets.

### UI/UX Enhancements

- **Improved Color Contrast**: Enhanced readability across all demo sections with better background opacity and text shadows
- **Better Visual Hierarchy**: Strengthened borders, improved section backgrounds, and optimized text visibility
- **Dark Mode Support**: Enhanced dark theme styles for better accessibility
- **Responsive Design**: Improved mobile experience with better touch interactions

## 🔄 Development Workflow

### Code Quality

The project enforces code quality through:

- **lint-staged**: Runs linting and formatting on staged files
- **TypeScript**: Strict type checking with comprehensive compiler options
- **ESLint**: Advanced rules including type-aware linting
- **Prettier**: Consistent code formatting

### Bundle Analysis

Analyze your production bundle:

```bash
# The bundle analyzer is integrated into Vite config
# Build in analyze mode to generate bundle report
npm run build -- --mode analyze
```

## 🎯 What's Included vs. What's Not

### ✅ Included

- Essential development tools and configurations
- Error handling and debugging setup
- Testing infrastructure with mocking
- TypeScript configuration optimized for React
- Build optimization and analysis tools
- Environment variable management

### ❌ Not Included (Intentionally Flexible)

- Specific UI component libraries
- State management solutions (Redux, Zustand, etc.)
- CSS frameworks (Tailwind, Material-UI, etc.)
- Additional testing libraries (Playwright, Cypress)
- Deployment configurations
- Database or backend integrations

This keeps the boilerplate flexible for various project requirements while providing a solid foundation.

## 🤝 Usage Tips

1. **Start Clean**: Remove unused folders in `src/components/`, `src/pages/`, etc.
2. **Environment Setup**: Configure `.env` file for your specific needs
3. **Error Boundaries**: Wrap route components with the ErrorBoundary for better UX
4. **Type Safety**: Leverage the strict TypeScript configuration for better code quality

## 📄 License

This project is licensed under the MIT License.
