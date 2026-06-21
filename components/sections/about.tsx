"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Code2, Rocket, Globe, MapPin, Bot } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: Code2, value: "5+", label: "Years Experience", color: "neon-violet" },
  { icon: Rocket, value: "4+", label: "Open Source Projects", color: "neon-cyan" },
  { icon: Bot, value: "8+", label: "AI Agents Built", color: "neon-magenta" },
  { icon: Globe, value: "143%", label: "Lead Growth", color: "neon-violet" },
]

const colorMap: Record<string, string> = {
  "neon-violet": "text-neon-violet shadow-[0_0_15px_rgba(168,85,247,0.3)]",
  "neon-cyan": "text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]",
  "neon-magenta": "text-neon-magenta shadow-[0_0_15px_rgba(236,72,153,0.3)]",
}

const borderColorMap: Record<string, string> = {
  "neon-violet": "hover:border-neon-violet/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  "neon-cyan": "hover:border-neon-cyan/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
  "neon-magenta": "hover:border-neon-magenta/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
}

function TiltAvatar() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Main avatar container */}
      <div className="w-full aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-bg-secondary to-bg-card border border-border overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Image
          src="/images/CEO FOUNDER CODE BRAND STUDIO.png"
          alt="Ali Ihtsham — AI Engineer & Founder"
          fill
          sizes="(max-width: 768px) 100vw, 28rem"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-violet/40 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/40 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-magenta/40 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-violet/40 rounded-br-lg" />
      </div>

      {/* Floating accent */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-neon-violet/10 rounded-2xl -z-10 border border-neon-violet/20 animate-float" />
      <div className="absolute -top-3 -left-3 w-16 h-16 bg-neon-cyan/5 rounded-xl -z-10 border border-neon-cyan/15" />
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 neon-line" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header with 3D depth */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="text-neon-cyan text-sm font-mono tracking-widest uppercase mb-4 block"
            style={{ transform: "translateZ(-15px)" }}
          >
            // About
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            Engineering the <span className="text-gradient-cyan">exceptional</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-violet via-neon-cyan to-neon-magenta mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TiltAvatar />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-neon-violet-glow mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-mono">Lahore, Pakistan — Available Worldwide</span>
            </div>

            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Bridging the gap between elite engineering and high-ticket positioning.
              I build lightweight, hyper-optimized, intelligent systems designed for maximum
              performance and conversion — from autonomous multi-agent networks to conversion-focused
              web experiences.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              <span className="text-neon-violet-glow font-semibold">AI-Native Systems:</span>{" "}
              Building autonomous multi-agent systems like{" "}
              <span className="text-neon-cyan-glow">Agent Org</span> and{" "}
              <span className="text-neon-magenta-glow">Alpha Council</span> that push the boundaries
              of how software is delivered.
            </p>
            <p className="text-text-secondary leading-relaxed mb-10">
              <span className="text-neon-violet-glow font-semibold">Code Brand Studio:</span>{" "}
              Hand-crafting fully custom portfolio and authority websites from scratch for
              consultants, coaches, and high-ticket professionals. No templates. Just clean,
              hand-coded React, Tailwind, and JavaScript — achieving load times under 2 seconds
              and driving up to <span className="text-neon-cyan-glow">+143% inbound lead growth</span>.
            </p>

            {/* Stats grid with 3D hover */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className={`p-5 rounded-xl bg-bg-secondary border border-border-subtle text-center transition-all duration-300 cursor-default ${borderColorMap[stat.color]}`}
                >
                  <stat.icon
                    className={`w-5 h-5 mx-auto mb-3 ${colorMap[stat.color]}`}
                  />
                  <div className="text-2xl font-bold text-text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
