"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

interface BranchPath {
  id: string
  d: string
  color: string
  length: number
}

/**
 * Draws git-branch style SVG paths between project cards.
 * Each path's strokeDasharray is driven by the section's scroll progress
 * so the line "draws" itself as the user scrolls into view.
 */
export function GitBranchLines() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [paths, setPaths] = useState<BranchPath[]>([])
  const [progress, setProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Measure card positions relative to the SVG container
  const measurePaths = useCallback(() => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return

    const containerRect = container.getBoundingClientRect()
    const svgRect = svg.getBoundingClientRect()

    // Find all project card elements within the grid
    const cards = container.querySelectorAll("[data-project-card]")
    if (cards.length < 2) return

    const cardCenters: { x: number; y: number; el: Element }[] = []
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      cardCenters.push({
        x: rect.left - svgRect.left + rect.width / 2,
        y: rect.top - svgRect.top + rect.height / 2,
        el: card,
      })
    })

    setDimensions({ width: svgRect.width, height: svgRect.height })

    // Build branch paths: connect cards in a git-tree pattern
    // Row 1: cards 0 → 1 → 2 (horizontal with vertical drops)
    // Row 2: cards 3 → 4 → 5 (if they exist)
    // Cross-row connections: card 0 → 3, card 2 → 5 (merge branches)
    const newPaths: BranchPath[] = []
    const colors = ["#a855f7", "#22d3ee", "#ec4899"]

    // Helper: create a git-style branch path (horizontal with a vertical segment)
    const addBranchPath = (from: number, to: number, colorIdx: number, verticalOffset = 0) => {
      if (from >= cardCenters.length || to >= cardCenters.length) return
      const start = cardCenters[from]
      const end = cardCenters[to]
      const midX = (start.x + end.x) / 2

      // Git-style: horizontal → vertical → horizontal
      const d = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y + verticalOffset}, ${end.x} ${end.y}`

      // Approximate path length for dash animation
      const dx = end.x - start.x
      const dy = end.y - start.y + verticalOffset
      const length = Math.sqrt(dx * dx + dy * dy) * 1.2 // bezier is longer than straight line

      newPaths.push({
        id: `branch-${from}-${to}`,
        d,
        color: colors[colorIdx % colors.length],
        length,
      })
    }

    // Connect adjacent cards in sequence
    for (let i = 0; i < Math.min(cardCenters.length - 1, 2); i++) {
      addBranchPath(i, i + 1, i)
    }

    // Cross-row merge connections (if we have 6 cards in 2 rows)
    if (cardCenters.length >= 6) {
      addBranchPath(0, 3, 2, -30) // top-left → bottom-left (merge up)
      addBranchPath(2, 5, 2, 30) // top-right → bottom-right (merge down)
      addBranchPath(1, 4, 0, 0) // middle → middle (direct)
    } else if (cardCenters.length >= 4) {
      addBranchPath(0, 3, 2, -20)
      addBranchPath(1, cardCenters.length - 1, 2, 20)
    }

    setPaths(newPaths)
  }, [])

  // Measure on mount and resize
  useEffect(() => {
    measurePaths()
    window.addEventListener("resize", measurePaths)
    return () => window.removeEventListener("resize", measurePaths)
  }, [measurePaths])

  // Track scroll progress for this section
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Progress: 0 when section enters viewport, 1 when it leaves
      const sectionHeight = rect.height
      const scrolled = viewportHeight - rect.top
      const total = viewportHeight + sectionHeight
      const p = Math.max(0, Math.min(1, scrolled / total))

      setProgress(p)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}
        preserveAspectRatio="none"
      >
        <defs>
          {paths.map((path) => (
            <filter key={`branch-glow-${path.id}`} id={`branch-glow-${path.id}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor={path.color} floodOpacity="0.5" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {paths.map((path) => {
          // Each path draws in sequence — stagger their animation
          const pathIndex = paths.indexOf(path)
          const staggerStart = pathIndex * 0.15
          const staggerDuration = 0.4
          const localProgress = Math.max(0, Math.min(1, (progress - staggerStart) / staggerDuration))

          return (
            <g key={path.id}>
              {/* Background glow line */}
              <path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth="3"
                opacity="0.08"
                strokeLinecap="round"
              />
              {/* Animated main line */}
              <path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={path.length}
                strokeDashoffset={path.length * (1 - localProgress)}
                opacity={0.3 + localProgress * 0.5}
                filter={`url(#branch-glow-${path.id})`}
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
              {/* Traveling pulse dot at the drawing head */}
              {localProgress > 0.02 && localProgress < 0.98 && (
                <circle r="3" fill={path.color} opacity={0.8}>
                  <animateMotion
                    dur="0.5s"
                    repeatCount="1"
                    path={path.d}
                    fill="freeze"
                  />
                </circle>
              )}
            </g>
          )
        })}

        {/* Git node dots at card connection points */}
        {paths.length > 0 && paths.slice(0, 3).map((path) => {
          const startMatch = path.d.match(/M\s*([\d.]+)\s+([\d.]+)/)
          if (!startMatch) return null
          return (
            <circle
              key={`node-${path.id}`}
              cx={parseFloat(startMatch[1])}
              cy={parseFloat(startMatch[2])}
              r="4"
              fill={path.color}
              opacity={progress > 0.1 ? 0.6 : 0}
              style={{ transition: "opacity 0.3s ease" }}
            >
              <animate
                attributeName="r"
                values="3;5;3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>
    </div>
  )
}
