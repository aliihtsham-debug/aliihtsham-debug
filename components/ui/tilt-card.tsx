"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  intensity?: number
  depth?: number
}

export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(168,85,247,0.2)",
  intensity = 1,
  depth = 20,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], [10 * intensity, -10 * intensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10 * intensity, 10 * intensity])
  const glowX = useTransform(springX, [-0.5, 0.5], ["-30%", "30%"])
  const glowY = useTransform(springY, [-0.5, 0.5], ["-30%", "30%"])
  const translateZ = useTransform(
    [springX, springY],
    ([vx, vy]: number[]) => {
      const dist = Math.sqrt(vx * vx + vy * vy)
      return dist * depth * 0.5
    }
  )

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
      className={cn("relative", className)}
      style={{
        rotateX,
        rotateY,
        translateZ,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dynamic glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
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
