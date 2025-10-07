import React from "react"

import { TextDefault, TitleSm } from "@/styles/ui"

export interface DemoConfig {
  id: string
  title: string
  description: string
  containerClassName?: string
  demos: Array<{
    action?: "click" | "hover" | "function"
    flipDirection?: "horizontal" | "vertical"
    flipDuration?: number
    flipRotation?: number
    className?: string
    children: React.ReactNode
    flipTo: React.ReactNode
  }>
}

export const demoConfigs: DemoConfig[] = [
  {
    id: "click-horizontal",
    title: "Click to Flip (Horizontal)",
    description: "Click on the card to see it flip horizontally.",
    demos: [
      {
        action: "click",
        flipDirection: "horizontal",
        flipDuration: 600,
        className: "demo-card",
        children: (
          <div className="card-front">
            <TitleSm>🂠</TitleSm>
            <TextDefault>Playing Card</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="card-back">
            <TitleSm>🎉</TitleSm>
            <TextDefault>You found the ace!</TextDefault>
          </div>
        )
      }
    ]
  },
  {
    id: "hover-vertical",
    title: "Hover to Flip (Vertical)",
    description: "Hover over the element to see it flip vertically.",
    demos: [
      {
        action: "hover",
        flipDirection: "vertical",
        flipDuration: 400,
        className: "demo-card demo-card--hover",
        children: (
          <div className="card-front card-front--info">
            <TitleSm>📋</TitleSm>
            <TextDefault>Hover for details</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="card-back card-back--info">
            <TitleSm>ℹ️</TitleSm>
            <TextDefault>More information appears on hover!</TextDefault>
          </div>
        )
      }
    ]
  },
  {
    id: "fast-flip",
    title: "Fast Flip Animation",
    description: "A quick flip animation with custom duration.",
    demos: [
      {
        action: "click",
        flipDirection: "horizontal",
        flipDuration: 200,
        className: "demo-card demo-card--fast",
        children: (
          <div className="card-front">
            <TitleSm>🏃</TitleSm>
            <TextDefault>Quick Flip</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="card-back">
            <TitleSm>⚡</TitleSm>
            <TextDefault>Lightning fast!</TextDefault>
          </div>
        )
      }
    ]
  },
  {
    id: "shapes",
    title: "Different Shapes",
    description: "FlipElement works with various shapes and layouts.",
    containerClassName: "demo-container--shapes",
    demos: [
      {
        action: "click",
        className: "demo-shape demo-shape--circle",
        children: (
          <div className="shape-front">
            <TitleSm>🔴</TitleSm>
            <TextDefault>Circle</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="shape-back">
            <TitleSm>🎯</TitleSm>
            <TextDefault>Target!</TextDefault>
          </div>
        )
      },
      {
        action: "click",
        className: "demo-shape demo-shape--rectangle",
        children: (
          <div className="shape-front">
            <TitleSm>📱</TitleSm>
            <TextDefault>Rectangle - Perfect for mobile cards</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="shape-back">
            <TitleSm>📊</TitleSm>
            <TextDefault>Data visualization works great in rectangular layouts!</TextDefault>
          </div>
        )
      },
      {
        action: "click",
        className: "demo-shape demo-shape--square",
        children: (
          <div className="shape-front">
            <TitleSm>⬜</TitleSm>
            <TextDefault>Square</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="shape-back">
            <TitleSm>✅</TitleSm>
            <TextDefault>Perfect square!</TextDefault>
          </div>
        )
      }
    ]
  },
  {
    id: "multi-flip",
    title: "Multi-Flip Animations",
    description: "Advanced flip animations with multiple rotations and coin flip simulation.",
    containerClassName: "demo-container--multi-flip",
    demos: [
      {
        action: "click",
        flipDirection: "horizontal",
        flipRotation: 540,
        flipDuration: 1200,
        className: "demo-card demo-card--multi-flip",
        children: (
          <div className="card-front">
            <TitleSm>🔄</TitleSm>
            <TextDefault>1.5 Rotations</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="card-back">
            <TitleSm>🌟</TitleSm>
            <TextDefault>540° Flip!</TextDefault>
          </div>
        )
      },
      {
        action: "click",
        flipDirection: "vertical",
        flipRotation: 720,
        flipDuration: 1500,
        className: "demo-card demo-card--coin",
        children: (
          <div className="card-front coin-front">
            <TitleSm>🪙</TitleSm>
            <TextDefault>Coin Flip (2 full rotations)</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="card-back coin-back">
            <TitleSm>👑</TitleSm>
            <TextDefault>Heads</TextDefault>
          </div>
        )
      },
      {
        action: "click",
        flipDirection: "horizontal",
        flipRotation: 900,
        flipDuration: 2000,
        className: "demo-card demo-card--extreme",
        children: (
          <div className="card-front">
            <TitleSm>⚡</TitleSm>
            <TextDefault>2.5 Rotations</TextDefault>
          </div>
        ),
        flipTo: (
          <div className="card-back">
            <TitleSm>🚀</TitleSm>
            <TextDefault>Extreme flip complete!</TextDefault>
          </div>
        )
      }
    ]
  }
]
