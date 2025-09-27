import "./Expandable.scss"

import React, { useState } from "react"

import ExpandableElement from "@/components/ExpandableElement"
import { ExpandActionEnum, ExpandDirectionEnum, FoldDirectionEnum } from "@/components/ExpandableElement/types"
import { Button, DemoContainer, Page, PropsTable, TextDefault, TitleMd, TitleSm } from "@/styles/ui"

const ExpandablePage: React.FC = () => {
  const [controlledExpanded, setControlledExpanded] = useState(false)

  return (
    <Page
      className="expandable-element-page"
      title="ExpandableElement Component"
      subtitle="A flexible component for creating expandable UI elements like accordions, menus, and sidebars with smooth animations."
      backLink={{ to: "/", text: "Back to Components", children: null }}>
      <div className="demo-section">
        <TitleMd>Basic Accordion</TitleMd>
        <TextDefault>Click to expand and collapse content vertically.</TextDefault>
        <DemoContainer>
          <ExpandableElement
            trigger={<TextDefault>📋 Click to expand</TextDefault>}
            className="accordion-style"
            expandDirection={ExpandDirectionEnum.BOTTOM}
            foldDirection={FoldDirectionEnum.UP}
            animationSpeed={300}>
            <div className="accordion-content">
              <TitleSm>Accordion Content</TitleSm>
              <TextDefault>
                This is the expandable content that appears when you click the trigger. It can contain any React elements, text, images, or
                other components.
              </TextDefault>
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
        <TitleMd>Dropdown Menu</TitleMd>
        <TextDefault>A dropdown-style expandable element.</TextDefault>
        <DemoContainer>
          <ExpandableElement
            trigger={<TextDefault>🔽 Select Option</TextDefault>}
            className="dropdown-style"
            expandDirection={ExpandDirectionEnum.BOTTOM}
            foldDirection={FoldDirectionEnum.UP}
            animationSpeed={200}>
            <div className="dropdown-content">
              <div className="dropdown-item">
                <TextDefault>Option 1</TextDefault>
              </div>
              <div className="dropdown-item">
                <TextDefault>Option 2</TextDefault>
              </div>
              <div className="dropdown-item">
                <TextDefault>Option 3</TextDefault>
              </div>
              <div className="dropdown-item">
                <TextDefault>Option 4</TextDefault>
              </div>
            </div>
          </ExpandableElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Mobile Hamburger Menu</TitleMd>
        <TextDefault>A contained mobile-style hamburger menu that slides out from the side.</TextDefault>
        <DemoContainer className="demo-container--mobile-menu">
          <ExpandableElement
            trigger={<TextDefault>☰</TextDefault>}
            className="contained-mobile-menu"
            expandDirection={ExpandDirectionEnum.RIGHT}
            animationSpeed={400}>
            <div className="mobile-sidebar-content">
              <nav>
                <div className="mobile-nav-item">
                  <TextDefault>🏠 Home</TextDefault>
                </div>
                <div className="mobile-nav-item">
                  <TextDefault>ℹ️ About</TextDefault>
                </div>
                <div className="mobile-nav-item">
                  <TextDefault>⚙️ Services</TextDefault>
                </div>
                <div className="mobile-nav-item">
                  <TextDefault>📞 Contact</TextDefault>
                </div>
              </nav>
            </div>
          </ExpandableElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Horizontal Expansion</TitleMd>
        <TextDefault>Expand content to the right with horizontal animation.</TextDefault>
        <DemoContainer>
          <ExpandableElement
            trigger={<TextDefault>➡️ Expand Right</TextDefault>}
            expandDirection={ExpandDirectionEnum.RIGHT}
            foldDirection={FoldDirectionEnum.LEFT}
            animationSpeed={350}
            className="horizontal-demo">
            <div className="horizontal-content">
              <TextDefault>This content expands horizontally!</TextDefault>
              <TextDefault>Perfect for sidebars or side panels.</TextDefault>
            </div>
          </ExpandableElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Controlled Expansion</TitleMd>
        <TextDefault>Control the expansion state programmatically.</TextDefault>
        <DemoContainer>
          <div className="controlled-demo">
            <Button className="control-button" onClick={() => setControlledExpanded(!controlledExpanded)}>
              {controlledExpanded ? "Collapse" : "Expand"}
            </Button>
            <ExpandableElement
              trigger={<TextDefault>🎛️ Controlled Element</TextDefault>}
              isExpanded={controlledExpanded}
              onExpandChange={expanded => {
                console.log("Expansion state changed:", expanded)
                setControlledExpanded(expanded)
              }}
              className="card-style"
              animationSpeed={300}>
              <div className="controlled-content">
                <TitleSm>Programmatically Controlled</TitleSm>
                <TextDefault>This element's expansion state is controlled by the button above.</TextDefault>
                <TextDefault>You can integrate this with your application's state management.</TextDefault>
              </div>
            </ExpandableElement>
          </div>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Sidebar Style</TitleMd>
        <TextDefault>A collapsible sidebar that changes width.</TextDefault>
        <DemoContainer className="demo-container--sidebar">
          <ExpandableElement
            trigger={<TextDefault>Sidebar</TextDefault>}
            className="sidebar-style"
            expandDirection={ExpandDirectionEnum.RIGHT}
            animationSpeed={300}
            initialExpanded={true}>
            <div className="sidebar-content">
              <nav>
                <div className="nav-item">
                  <TextDefault>🏠 Dashboard</TextDefault>
                </div>
                <div className="nav-item">
                  <TextDefault>👥 Users</TextDefault>
                </div>
                <div className="nav-item">
                  <TextDefault>📊 Analytics</TextDefault>
                </div>
                <div className="nav-item">
                  <TextDefault>⚙️ Settings</TextDefault>
                </div>
              </nav>
            </div>
          </ExpandableElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Hover Action</TitleMd>
        <TextDefault>Expand on hover instead of click.</TextDefault>
        <DemoContainer>
          <ExpandableElement
            trigger={<TextDefault>🖱️ Hover me</TextDefault>}
            action={ExpandActionEnum.HOVER}
            className="card-style"
            expandDirection={ExpandDirectionEnum.BOTTOM}
            animationSpeed={250}>
            <div className="hover-content">
              <TextDefault>This expands when you hover over the trigger!</TextDefault>
              <TextDefault>Great for tooltips and quick previews.</TextDefault>
            </div>
          </ExpandableElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Animation Styles</TitleMd>
        <TextDefault>Different animation easing functions.</TextDefault>
        <DemoContainer className="demo-container--animations">
          <ExpandableElement trigger={<TextDefault>🏀 Bounce</TextDefault>} className="card-style bounce-animation" animationSpeed={500}>
            <div className="animation-content">
              <TextDefault>Bouncy animation with cubic-bezier easing!</TextDefault>
            </div>
          </ExpandableElement>

          <ExpandableElement trigger={<TextDefault>🏃 Slide</TextDefault>} className="card-style slide-animation" animationSpeed={400}>
            <div className="animation-content">
              <TextDefault>Smooth slide animation!</TextDefault>
            </div>
          </ExpandableElement>

          <ExpandableElement trigger={<TextDefault>👻 Fade</TextDefault>} className="card-style fade-animation" animationSpeed={300}>
            <div className="animation-content">
              <TextDefault>Gentle fade animation!</TextDefault>
            </div>
          </ExpandableElement>
        </DemoContainer>
      </div>
      <div className="expandable-element-page__footer">
        <TitleSm>Props</TitleSm>
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
      </div>
    </Page>
  )
}

export default ExpandablePage
