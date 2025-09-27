import "./Flip.scss"

import React, { useState } from "react"

import FlipElement from "@/components/FlipElement"
import { Button, DemoContainer, Page, PropsTable, TextDefault, TitleMd, TitleSm } from "@/styles/ui"

const FlipPage: React.FC = () => {
  const [controlledFlip, setControlledFlip] = useState(false)

  return (
    <Page
      className="flip-element-page"
      title="FlipElement Component"
      subtitle="A versatile component for creating smooth flip animations with various trigger actions."
      backLink={{ to: "/", text: "Back to Components", children: null }}>
      <div className="demo-section">
        <TitleMd>Click to Flip (Horizontal)</TitleMd>
        <TextDefault>Click on the card to see it flip horizontally.</TextDefault>
        <DemoContainer>
          <FlipElement
            action="click"
            flipDirection="horizontal"
            flipDuration={600}
            className="demo-card"
            flipTo={
              <div className="card-back">
                <TitleSm>🎉</TitleSm>
                <TextDefault>You found the ace!</TextDefault>
              </div>
            }>
            <div className="card-front">
              <TitleSm>🂠</TitleSm>
              <TextDefault>Playing Card</TextDefault>
            </div>
          </FlipElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Hover to Flip (Vertical)</TitleMd>
        <TextDefault>Hover over the element to see it flip vertically.</TextDefault>
        <DemoContainer>
          <FlipElement
            action="hover"
            flipDirection="vertical"
            flipDuration={400}
            className="demo-card demo-card--hover"
            flipTo={
              <div className="card-back card-back--info">
                <TitleSm>ℹ️</TitleSm>
                <TextDefault>More information appears on hover!</TextDefault>
              </div>
            }>
            <div className="card-front card-front--info">
              <TitleSm>📋</TitleSm>
              <TextDefault>Hover for details</TextDefault>
            </div>
          </FlipElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Controlled Flip</TitleMd>
        <TextDefault>Control the flip state programmatically with a button.</TextDefault>
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
                  <TitleSm>🎛️</TitleSm>
                  <TextDefault>Controlled by button</TextDefault>
                </div>
              }>
              <div className="card-front card-front--controlled">
                <TitleSm>🎮</TitleSm>
                <TextDefault>Click button to flip</TextDefault>
              </div>
            </FlipElement>
          </div>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Fast Flip Animation</TitleMd>
        <TextDefault>A quick flip animation with custom duration.</TextDefault>
        <DemoContainer>
          <FlipElement
            action="click"
            flipDirection="horizontal"
            flipDuration={200}
            className="demo-card demo-card--fast"
            flipTo={
              <div className="card-back">
                <TitleSm>⚡</TitleSm>
                <TextDefault>Lightning fast!</TextDefault>
              </div>
            }>
            <div className="card-front">
              <TitleSm>🏃</TitleSm>
              <TextDefault>Quick Flip</TextDefault>
            </div>
          </FlipElement>
        </DemoContainer>
      </div>

      <div className="demo-section">
        <TitleMd>Different Sizes</TitleMd>
        <TextDefault>FlipElement adapts to different container sizes.</TextDefault>
        <DemoContainer className="demo-container--sizes">
          <FlipElement
            action="click"
            className="demo-card demo-card--small"
            flipTo={
              <div className="card-back">
                <TextDefault>Small</TextDefault>
              </div>
            }>
            <div className="card-front">📱</div>
          </FlipElement>

          <FlipElement
            action="click"
            className="demo-card demo-card--medium"
            flipTo={
              <div className="card-back">
                <TextDefault>Medium</TextDefault>
              </div>
            }>
            <div className="card-front">💻</div>
          </FlipElement>

          <FlipElement
            action="click"
            className="demo-card demo-card--large"
            flipTo={
              <div className="card-back">
                <TextDefault>Large</TextDefault>
              </div>
            }>
            <div className="card-front">🖥️</div>
          </FlipElement>
        </DemoContainer>
      </div>
      <div className="flip-element-page__footer">
        <TitleSm>Props</TitleSm>
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
      </div>
    </Page>
  )
}

export default FlipPage
