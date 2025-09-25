import "./FlipElement.scss"

import React, { useState } from "react"
import { Link } from "react-router-dom"

import FlipElement from "@/components/FlipElement"

const FlipElementPage: React.FC = () => {
  const [controlledFlip, setControlledFlip] = useState(false)

  return (
    <div className="flip-element-page">
      <header className="flip-element-page__header">
        <Link to="/" className="flip-element-page__back-link">
          ← Back to Components
        </Link>
        <h1>FlipElement Component</h1>
        <p>A versatile component for creating smooth flip animations with various trigger actions.</p>
      </header>

      <main className="flip-element-page__content">
        <section className="demo-section">
          <h2>Click to Flip (Horizontal)</h2>
          <p>Click on the card to see it flip horizontally.</p>
          <div className="demo-container">
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
          </div>
        </section>

        <section className="demo-section">
          <h2>Hover to Flip (Vertical)</h2>
          <p>Hover over the element to see it flip vertically.</p>
          <div className="demo-container">
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
          </div>
        </section>

        <section className="demo-section">
          <h2>Controlled Flip</h2>
          <p>Control the flip state programmatically with a button.</p>
          <div className="demo-container">
            <div className="controlled-demo">
              <button className="control-button" onClick={() => setControlledFlip(!controlledFlip)}>
                {controlledFlip ? "Show Front" : "Show Back"}
              </button>
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
          </div>
        </section>

        <section className="demo-section">
          <h2>Fast Flip Animation</h2>
          <p>A quick flip animation with custom duration.</p>
          <div className="demo-container">
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
          </div>
        </section>

        <section className="demo-section">
          <h2>Different Sizes</h2>
          <p>FlipElement adapts to different container sizes.</p>
          <div className="demo-container demo-container--sizes">
            <FlipElement action="click" className="demo-card demo-card--small" flipTo={<div className="card-back">Small</div>}>
              <div className="card-front">📱</div>
            </FlipElement>

            <FlipElement action="click" className="demo-card demo-card--medium" flipTo={<div className="card-back">Medium</div>}>
              <div className="card-front">💻</div>
            </FlipElement>

            <FlipElement action="click" className="demo-card demo-card--large" flipTo={<div className="card-back">Large</div>}>
              <div className="card-front">🖥️</div>
            </FlipElement>
          </div>
        </section>
      </main>

      <footer className="flip-element-page__footer">
        <h3>Props</h3>
        <div className="props-table">
          <div className="prop-row">
            <code>children</code>
            <span>Content for the front side</span>
          </div>
          <div className="prop-row">
            <code>flipTo</code>
            <span>Content for the back side</span>
          </div>
          <div className="prop-row">
            <code>action</code>
            <span>'click' | 'hover' | 'function' (default: 'click')</span>
          </div>
          <div className="prop-row">
            <code>flipDirection</code>
            <span>'horizontal' | 'vertical' (default: 'horizontal')</span>
          </div>
          <div className="prop-row">
            <code>flipDuration</code>
            <span>Animation duration in ms (default: 600)</span>
          </div>
          <div className="prop-row">
            <code>isFlipped</code>
            <span>Controlled flip state (for action: 'function')</span>
          </div>
          <div className="prop-row">
            <code>onFlipChange</code>
            <span>Callback when flip state changes</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FlipElementPage
