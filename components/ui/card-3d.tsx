"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Card3DProps {
  children: ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function Card3D({
  children,
  className = "",
  glowColor = "rgba(168,85,247,0.15)",
  intensity = 1,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], [8 * intensity, -8 * intensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8 * intensity, 8 * intensity])
  const glowX = useTransform(springX, [-0.5, 0.5], ["-20%", "20%"])
  const glowY = useTransform(springY, [-0.5, 0.5], ["-20%", "20%"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)
    x.set(Math.max(-1, Math.min(1, mouseX)))
    y.set(Math.max(-1, Math.min(1, mouseY)))
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as const,
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Specular glow that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${glowColor}, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
      {children}
    </motion.div>
  )
}
