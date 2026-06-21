"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const taglines = [
  "Building AI That Engineers Smarter",
  "Founder & Principal Engineer",
  "Multi-Agent Systems & High-Performance Web",
]

const SCRAMBLE_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%&*"

function TextScramble({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayed, setDisplayed] = useState(text)
  const [isSettled, setIsSettled] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Build a schedule: for each character, pick a random frame when it settles
    const scrambleFrames = 8
    const frameDelay = 50
    const settleFrame: number[] = []
    for (let i = 0; i < text.length; i++) {
      settleFrame.push(1 + Math.floor(Math.random() * scrambleFrames))
    }

    let frame = 0
    let intervalId: ReturnType<typeof setInterval>

    const startTimeout = setTimeout(() => {
      setHasStarted(true)
      // Initial scramble
      setDisplayed(
        text.split("").map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join("")
      )

      intervalId = setInterval(() => {
        frame++
        let allSettled = true
        const result: string[] = []

        for (let i = 0; i < text.length; i++) {
          if (frame >= settleFrame[i]) {
            result[i] = text[i]
          } else {
            result[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            allSettled = false
          }
        }

        setDisplayed(result.join(""))

        if (allSettled) {
          clearInterval(intervalId)
          setDisplayed(text)
          setIsSettled(true)
        }
      }, frameDelay)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(intervalId)
    }
  }, [text, delay])

  return (
    <span className={className} suppressHydrationWarning>
      {displayed}
      {hasStarted && !isSettled && <span className="animate-pulse text-neon-violet ml-0.5">▊</span>}
    </span>
  )
}

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = React.useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}</span>
}

function MouseParallax({
  children,
  intensity = 1,
}: {
  children: React.ReactNode
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [3 * intensity, -3 * intensity])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3 * intensity, 3 * intensity])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden pb-16"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid-bg opacity-30" />

      {/* Scanline */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.015]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.015 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(168,85,247,0.1)_2px,rgba(168,85,247,0.1)_4px)]"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Content */}
      <MouseParallax intensity={1.5}>
        <motion.div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 mt-16"
          >
            <motion.span
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-subtle-violet/50 backdrop-blur-md border border-neon-violet/20 text-neon-violet-glow text-sm font-medium"
              animate={{
                borderColor: ["rgba(168,85,247,0.2)", "rgba(168,85,247,0.5)", "rgba(168,85,247,0.2)"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="relative flex h-3 w-3 items-center justify-center">
                {/* Outer radiating ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-violet/30 animate-[ping_2s_ease-out_infinite]" />
                {/* Middle ring — delayed */}
                <span className="absolute inline-flex h-4 w-4 rounded-full border border-neon-violet/40 animate-[radiate_2.5s_ease-out_infinite]" />
                {/* Outer ring — more delayed */}
                <span className="absolute inline-flex h-5 w-5 rounded-full border border-neon-violet/20 animate-[radiate_2.5s_ease-out_infinite_0.5s]" />
                {/* Solid core dot */}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-violet shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
              </span>
              Open to AI &amp; Web Projects
            </motion.span>
          </motion.div>

          {/* Main heading with 3D depth */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.span
              className="text-text-primary inline-block"
              style={{ transform: "translateZ(30px)" }}
              initial={{ y: 60, opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Ali{" "}
            </motion.span>
            <motion.span
              className="text-gradient-violet inline-block"
              style={{ transform: "translateZ(50px)" }}
              initial={{ y: 60, opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TextScramble text="Ihtsham" delay={1400} />
            </motion.span>
          </motion.h1>

          {/* Animated tagline */}
          <motion.div
            className="h-14 md:h-16 flex items-center justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl text-text-secondary font-light"
              >
                {taglines[taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.div whileHover={{ scale: 1.05, translateZ: 8 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="xl"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                View My Work
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, translateZ: 8 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="xl"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Live stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            {[
              { value: 5, suffix: "+", label: "Years" },
              { value: 4, suffix: "", label: "Open Source" },
              { value: 970, suffix: "+", label: "Followers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-text-primary font-mono">
                  <AnimatedCounter target={stat.value} />
                  <span className="text-neon-violet-glow">{stat.suffix}</span>
                </div>
                <div className="text-xs text-text-muted mt-1 font-mono tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tech stack ticker */}
          <motion.div
            className="mt-14 flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            {["React", "TypeScript", "Next.js", "Rust", "AI Agents", "Tauri"].map((tech, i) => (
              <motion.span
                key={tech}
                className="text-text-muted/50 text-xs font-mono px-3 py-1.5 rounded-full border border-border-subtle hover:border-neon-violet/30 hover:text-neon-violet-glow transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </MouseParallax>
    </section>
  )
}
