import "./Flip.scss"

import React, { useCallback, useState } from "react"

import FlipElement from "@/components/FlipElement"
import { Button, DemoSection, Page, PropsTable, TextDefault, TitleSm } from "@/styles/ui"

import { demoConfigs } from "./data/demoConfigs"

const FlipPage: React.FC = () => {
  const [controlledFlip, setControlledFlip] = useState(false)

  const handleControlledFlipToggle = useCallback(() => {
    setControlledFlip(prev => !prev)
  }, [])

  const handleFlipChange = useCallback((flipped: boolean) => {
    console.log("Flip state changed:", flipped)
  }, [])

  return (
    <Page
      className="flip-element-page"
      title="FlipElement Component"
      subtitle="A versatile component for creating smooth flip animations with various trigger actions."
      backLink={{ to: "/", text: "Back to Components", children: null }}>
      {demoConfigs.map(config => (
        <DemoSection key={config.id} title={config.title} description={config.description} containerClassName={config.containerClassName}>
          {config.demos.map((demo, index) => (
            <FlipElement
              key={`${config.id}-${index}`}
              action={demo.action}
              flipDirection={demo.flipDirection}
              flipDuration={demo.flipDuration}
              flipRotation={demo.flipRotation}
              className={demo.className}
              flipTo={demo.flipTo}>
              {demo.children}
            </FlipElement>
          ))}
        </DemoSection>
      ))}

      {/* Controlled flip demo (special case) */}
      <DemoSection title="Controlled Flip" description="Control the flip state programmatically with a button.">
        <div className="controlled-demo">
          <Button className="control-button" onClick={handleControlledFlipToggle}>
            {controlledFlip ? "Show Front" : "Show Back"}
          </Button>
          <FlipElement
            action="function"
            flipDirection="horizontal"
            flipDuration={500}
            isFlipped={controlledFlip}
            className="demo-card"
            onFlipChange={handleFlipChange}
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
      </DemoSection>

      <div className="flip-element-page__footer">
        <TitleSm>Props</TitleSm>
        <PropsTable
          props={[
            { name: "children", description: "Content for the front side" },
            { name: "flipTo", description: "Content for the back side" },
            { name: "action", description: "'click' | 'hover' | 'function'", default: "click" },
            { name: "flipDirection", description: "'horizontal' | 'vertical'", default: "horizontal" },
            { name: "flipDuration", description: "Animation duration in ms", default: "600" },
            { name: "flipRotation", description: "Rotation degrees for flip animation", default: "180" },
            { name: "isFlipped", description: "Controlled flip state (for action: 'function')" },
            { name: "onFlipChange", description: "Callback when flip state changes" }
          ]}
        />
      </div>
    </Page>
  )
}

export default FlipPage
