import "./Flip.scss"

import React, { useState } from "react"

import FlipElement from "@/components/FlipElement"
import { Button, Container, DemoContainer, H2, H3, PageFooter, PageHeader, PropsTable } from "@/styles/ui"

const FlipPage: React.FC = () => {
  const [controlledFlip, setControlledFlip] = useState(false)

  return (
    <Container className="flip-element-page">
      <PageHeader
        title="FlipElement Component"
        subtitle="A versatile component for creating smooth flip animations with various trigger actions."
        backLink={{ to: "/", text: "← Back to Components" }}
      />

      <main className="flip-element-page__content">
        <div className="demo-section">
          <H2>Click to Flip (Horizontal)</H2>
          <p>Click on the card to see it flip horizontally.</p>
          <DemoContainer>
            <FlipElement
              action="click"
              flipDirection="horizontal"
              flipDuration={600}
              className="demo-card"
              flipTo={
                <div className="card-back">
                  <h3>🎉</h3>
                  <p>You found the ace!</p>
                </div>
              }>
              <div className="card-front">
                <h3>🂠</h3>
                <p>Playing Card</p>
              </div>
            </FlipElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Hover to Flip (Vertical)</H2>
          <p>Hover over the element to see it flip vertically.</p>
          <DemoContainer>
            <FlipElement
              action="hover"
              flipDirection="vertical"
              flipDuration={400}
              className="demo-card demo-card--hover"
              flipTo={
                <div className="card-back card-back--info">
                  <h3>ℹ️</h3>
                  <p>More information appears on hover!</p>
                </div>
              }>
              <div className="card-front card-front--info">
                <h3>📋</h3>
                <p>Hover for details</p>
              </div>
            </FlipElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Controlled Flip</H2>
          <p>Control the flip state programmatically with a button.</p>
          <DemoContainer>
            <div className="controlled-demo">
              <Button className="control-button" onClick={() => setControlledFlip(!controlledFlip)}>
                {controlledFlip ? "Show Front" : "Show Back"}
              </Button>
              <FlipElement
                action="function"
                flipDirection="horizontal"
                flipDuration={500}
                isFlipped={controlledFlip}
                className="demo-card"
                onFlipChange={flipped => console.log("Flip state changed:", flipped)}
                flipTo={
                  <div className="card-back card-back--controlled">
                    <h3>🎛️</h3>
                    <p>Controlled by button</p>
                  </div>
                }>
                <div className="card-front card-front--controlled">
                  <h3>🎮</h3>
                  <p>Click button to flip</p>
                </div>
              </FlipElement>
            </div>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Fast Flip Animation</H2>
          <p>A quick flip animation with custom duration.</p>
          <DemoContainer>
            <FlipElement
              action="click"
              flipDirection="horizontal"
              flipDuration={200}
              className="demo-card demo-card--fast"
              flipTo={
                <div className="card-back">
                  <h3>⚡</h3>
                  <p>Lightning fast!</p>
                </div>
              }>
              <div className="card-front">
                <h3>🏃</h3>
                <p>Quick Flip</p>
              </div>
            </FlipElement>
          </DemoContainer>
        </div>

        <div className="demo-section">
          <H2>Different Sizes</H2>
          <p>FlipElement adapts to different container sizes.</p>
          <DemoContainer className="demo-container--sizes">
            <FlipElement action="click" className="demo-card demo-card--small" flipTo={<div className="card-back">Small</div>}>
              <div className="card-front">📱</div>
            </FlipElement>

            <FlipElement action="click" className="demo-card demo-card--medium" flipTo={<div className="card-back">Medium</div>}>
              <div className="card-front">💻</div>
            </FlipElement>

            <FlipElement action="click" className="demo-card demo-card--large" flipTo={<div className="card-back">Large</div>}>
              <div className="card-front">🖥️</div>
            </FlipElement>
          </DemoContainer>
        </div>
      </main>

      <PageFooter className="flip-element-page__footer">
        <H3>Props</H3>
        <PropsTable
          props={[
            { name: "children", description: "Content for the front side" },
            { name: "flipTo", description: "Content for the back side" },
            { name: "action", description: "'click' | 'hover' | 'function'", default: "click" },
            { name: "flipDirection", description: "'horizontal' | 'vertical'", default: "horizontal" },
            { name: "flipDuration", description: "Animation duration in ms", default: "600" },
            { name: "isFlipped", description: "Controlled flip state (for action: 'function')" },
            { name: "onFlipChange", description: "Callback when flip state changes" }
          ]}
        />
      </PageFooter>
    </Container>
  )
}

export default FlipPage
