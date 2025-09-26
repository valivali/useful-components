import "./Expandable.scss"

import React, { useState } from "react"

import ExpandableElement from "@/components/ExpandableElement"
import { ExpandActionEnum, ExpandDirectionEnum, FoldDirectionEnum } from "@/components/ExpandableElement/types"
import { Button, Container, DemoContainer, H2, H3, PageFooter, PageHeader, PropsTable } from "@/styles/ui"

const ExpandablePage: React.FC = () => {
  const [controlledExpanded, setControlledExpanded] = useState(false)

  return (
    <Container className="expandable-element-page">
      <PageHeader
        title="ExpandableElement Component"
        subtitle="A flexible component for creating expandable UI elements like accordions, menus, and sidebars with smooth animations."
        backLink={{ to: "/", text: "← Back to Components" }}
      />

      <main className="expandable-element-page__content">
        <div className="demo-section">
          <H2>Basic Accordion</H2>
          <p>Click to expand and collapse content vertically.</p>
          <DemoContainer>
            <ExpandableElement
              trigger={<span>📋 Click to expand</span>}
              className="accordion-style"
              expandDirection={ExpandDirectionEnum.BOTTOM}
              foldDirection={FoldDirectionEnum.UP}
              animationSpeed={300}>
              <div className="accordion-content">
                <h4>Accordion Content</h4>
                <p>
                  This is the expandable content that appears when you click the trigger. It can contain any React elements, text, images,
                  or other components.
                </p>
                <ul>
                  <li>✅ Smooth animations</li>
                  <li>✅ Customizable directions</li>
                  <li>✅ Flexible content</li>
                </ul>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Dropdown Menu</H2>
          <p>A dropdown-style expandable element.</p>
          <DemoContainer>
            <ExpandableElement
              trigger={<span>🔽 Select Option</span>}
              className="dropdown-style"
              expandDirection={ExpandDirectionEnum.BOTTOM}
              foldDirection={FoldDirectionEnum.UP}
              animationSpeed={200}>
              <div className="dropdown-content">
                <div className="dropdown-item">Option 1</div>
                <div className="dropdown-item">Option 2</div>
                <div className="dropdown-item">Option 3</div>
                <div className="dropdown-item">Option 4</div>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Mobile Hamburger Menu</H2>
          <p>A contained mobile-style hamburger menu that slides out from the side.</p>
          <DemoContainer className="demo-container--mobile-menu">
            <ExpandableElement
              trigger={<span>☰</span>}
              className="contained-mobile-menu"
              expandDirection={ExpandDirectionEnum.RIGHT}
              animationSpeed={400}>
              <div className="mobile-sidebar-content">
                <nav>
                  <div className="mobile-nav-item">🏠 Home</div>
                  <div className="mobile-nav-item">ℹ️ About</div>
                  <div className="mobile-nav-item">⚙️ Services</div>
                  <div className="mobile-nav-item">📞 Contact</div>
                </nav>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Horizontal Expansion</H2>
          <p>Expand content to the right with horizontal animation.</p>
          <DemoContainer>
            <ExpandableElement
              trigger={<span>➡️ Expand Right</span>}
              expandDirection={ExpandDirectionEnum.RIGHT}
              foldDirection={FoldDirectionEnum.LEFT}
              animationSpeed={350}
              className="horizontal-demo">
              <div className="horizontal-content">
                <p>This content expands horizontally!</p>
                <p>Perfect for sidebars or side panels.</p>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Controlled Expansion</H2>
          <p>Control the expansion state programmatically.</p>
          <DemoContainer>
            <div className="controlled-demo">
              <Button className="control-button" onClick={() => setControlledExpanded(!controlledExpanded)}>
                {controlledExpanded ? "Collapse" : "Expand"}
              </Button>
              <ExpandableElement
                trigger={<span>🎛️ Controlled Element</span>}
                isExpanded={controlledExpanded}
                onExpandChange={expanded => {
                  console.log("Expansion state changed:", expanded)
                  setControlledExpanded(expanded)
                }}
                className="card-style"
                animationSpeed={300}>
                <div className="controlled-content">
                  <h4>Programmatically Controlled</h4>
                  <p>This element's expansion state is controlled by the button above.</p>
                  <p>You can integrate this with your application's state management.</p>
                </div>
              </ExpandableElement>
            </div>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Sidebar Style</H2>
          <p>A collapsible sidebar that changes width.</p>
          <DemoContainer className="demo-container--sidebar">
            <ExpandableElement
              trigger={<span>Sidebar</span>}
              className="sidebar-style"
              expandDirection={ExpandDirectionEnum.RIGHT}
              animationSpeed={300}
              initialExpanded={true}>
              <div className="sidebar-content">
                <nav>
                  <div className="nav-item">🏠 Dashboard</div>
                  <div className="nav-item">👥 Users</div>
                  <div className="nav-item">📊 Analytics</div>
                  <div className="nav-item">⚙️ Settings</div>
                </nav>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Hover Action</H2>
          <p>Expand on hover instead of click.</p>
          <DemoContainer>
            <ExpandableElement
              trigger={<span>🖱️ Hover me</span>}
              action={ExpandActionEnum.HOVER}
              className="card-style"
              expandDirection={ExpandDirectionEnum.BOTTOM}
              animationSpeed={250}>
              <div className="hover-content">
                <p>This expands when you hover over the trigger!</p>
                <p>Great for tooltips and quick previews.</p>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Animation Styles</H2>
          <p>Different animation easing functions.</p>
          <DemoContainer className="demo-container--animations">
            <ExpandableElement trigger={<span>🏀 Bounce</span>} className="card-style bounce-animation" animationSpeed={500}>
              <div className="animation-content">
                <p>Bouncy animation with cubic-bezier easing!</p>
              </div>
            </ExpandableElement>

            <ExpandableElement trigger={<span>🏃 Slide</span>} className="card-style slide-animation" animationSpeed={400}>
              <div className="animation-content">
                <p>Smooth slide animation!</p>
              </div>
            </ExpandableElement>

            <ExpandableElement trigger={<span>👻 Fade</span>} className="card-style fade-animation" animationSpeed={300}>
              <div className="animation-content">
                <p>Gentle fade animation!</p>
              </div>
            </ExpandableElement>
          </DemoContainer>
        </div>
      </main>

      <PageFooter className="expandable-element-page__footer">
        <H3>Props</H3>
        <PropsTable
          props={[
            { name: "children", description: "Content to be expanded/collapsed" },
            { name: "trigger", description: "Element that triggers the expansion" },
            { name: "expandDirection", description: "'bottom' | 'top' | 'left' | 'right'", default: "bottom" },
            { name: "foldDirection", description: "'up' | 'down' | 'left' | 'right'", default: "up" },
            { name: "action", description: "'click' | 'hover' | 'function'", default: "click" },
            { name: "animationSpeed", description: "Animation duration in ms", default: "300" },
            { name: "initialExpanded", description: "Initial expansion state", default: "false" },
            { name: "isExpanded", description: "Controlled expansion state" },
            { name: "onExpandChange", description: "Callback when expansion state changes" },
            { name: "maxSize", description: "Maximum size in pixels when expanded" },
            { name: "smooth", description: "Enable smooth animations", default: "true" }
          ]}
        />
      </PageFooter>
    </Container>
  )
}

export default ExpandablePage
