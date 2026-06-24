"use client"

import { useRef, useMemo, type ReactNode } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { useParallax } from "@/contexts/parallax-context"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface Section3DProps {
  children: ReactNode
  className?: string
  index: number
}

export function Section3D({ children, className, index }: Section3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Create motion values that mirror the R3D mouse state so useTransform can read them
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { mouseState } = useParallax()

  // Keep MotionValues in sync with the shared R3F mouse state
  mouseX.set(mouseState.smoothed.x)
  mouseY.set(mouseState.smoothed.y)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax offset based on mouse position
  const parallaxX = useTransform(
    mouseX,
    [-1, 1],
    shouldReduceMotion ? [0, 0] : [8 * (index % 2 === 0 ? 1 : -1), -8 * (index % 2 === 0 ? 1 : -1)]
  )
  const parallaxY = useTransform(
    mouseY,
    [-1, 1],
    shouldReduceMotion ? [0, 0] : [5, -5]
  )

  // Scroll-driven Z translation for depth effect
  const translateZ = shouldReduceMotion
    ? 0
    : useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20])

  // Subtle rotation based on scroll progress
  const rotateX = shouldReduceMotion
    ? 0
    : useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2])

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative",
        !shouldReduceMotion && "perspective-1000",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        x: parallaxX,
        y: parallaxY,
        translateZ,
        rotateX,
      }}
    >
      {children}
    </motion.div>
  )
}
