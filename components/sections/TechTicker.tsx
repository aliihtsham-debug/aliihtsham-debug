"use client"

import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { motion } from "framer-motion"

const TECH_ITEMS = [
  { label: "React", color: "#a855f7" },
  { label: "TypeScript", color: "#22d3ee" },
  { label: "Next.js", color: "#ec4899" },
  { label: "Rust", color: "#a855f7" },
  { label: "Tauri", color: "#22d3ee" },
  { label: "Tailwind CSS", color: "#ec4899" },
  { label: "Three.js", color: "#a855f7" },
  { label: "Framer Motion", color: "#22d3ee" },
  { label: "Node.js", color: "#ec4899" },
  { label: "Python", color: "#a855f7" },
  { label: "Docker", color: "#22d3ee" },
  { label: "Claude SDK", color: "#ec4899" },
  { label: "OpenRouter", color: "#a855f7" },
  { label: "Prisma", color: "#22d3ee" },
  { label: "Zod", color: "#ec4899" },
  { label: "SQLite", color: "#a855f7" },
]

function TechTicker() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const posRef = useRef(0)
  const animRef = useRef<number | null>(null)
  const [copyWidth, setCopyWidth] = useState(0)

  // Measure after layout is committed to DOM
  useLayoutEffect(() => {
    const measure = () => {
      if (innerRef.current) {
        const total = innerRef.current.scrollWidth
        const oneCopy = total / 3
        if (oneCopy > 0) {
          setCopyWidth(oneCopy)
        }
      }
    }
    measure()
    // Re-measure after a tick (fonts may not be loaded yet)
    requestAnimationFrame(() => {
      measure()
    })
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    if (copyWidth <= 0) return

    const tick = () => {
      if (!isPaused) {
        posRef.current -= 0.5
        // Seamless loop: when first copy scrolls out, jump back
        if (Math.abs(posRef.current) >= copyWidth) {
          posRef.current += copyWidth
        }
        if (innerRef.current) {
          innerRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`
        }
      }
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current)
    }
  }, [isPaused, copyWidth])

  // Render items 3 times for seamless loop
  const triple = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div
      ref={outerRef}
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

      <div
        ref={innerRef}
        className="flex items-center gap-6 whitespace-nowrap will-change-transform"
      >
        {triple.map((tech, i) => (
          <motion.div
            key={`${tech.label}-${i}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle bg-bg-secondary/50 backdrop-blur-sm cursor-default flex-shrink-0"
            whileHover={{
              scale: 1.08,
              borderColor: tech.color,
              boxShadow: `0 0 20px ${tech.color}30`,
            }}
            style={{ borderColor: `${tech.color}20` }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}60` }}
            />
            <span
              className="text-sm font-mono font-medium"
              style={{ color: `${tech.color}cc` }}
            >
              {tech.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-muted/40"
        >
          PAUSED
        </motion.div>
      )}
    </div>
  )
}

export { TechTicker }
