"use client"

import React from "react"
import { motion } from "framer-motion"
import { skills, timeline } from "@/lib/data"
import { Zap, Briefcase } from "lucide-react"
import { TechTicker } from "./TechTicker"

const categories = [
  { key: "frontend", label: "Frontend", color: "neon-violet" },
  { key: "backend", label: "Backend", color: "neon-cyan" },
  { key: "tools", label: "Tools & DevOps", color: "neon-magenta" },
] as const

const barColorMap: Record<string, string> = {
  "neon-violet": "from-neon-violet to-neon-violet-glow",
  "neon-cyan": "from-neon-cyan to-neon-cyan-glow",
  "neon-magenta": "from-neon-magenta to-neon-magenta-glow",
}

const barGlowMap: Record<string, string> = {
  "neon-violet": "shadow-[0_0_10px_rgba(168,85,247,0.4)]",
  "neon-cyan": "shadow-[0_0_10px_rgba(34,211,238,0.4)]",
  "neon-magenta": "shadow-[0_0_10px_rgba(236,72,153,0.4)]",
}

const chipColorMap: Record<string, string> = {
  "neon-violet": "border-neon-violet/20 bg-neon-subtle-violet hover:border-neon-violet/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]",
  "neon-cyan": "border-neon-cyan/20 bg-neon-subtle-cyan hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]",
  "neon-magenta": "border-neon-magenta/20 bg-neon-subtle-magenta hover:border-neon-magenta/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]",
}

export function Skills() {
  return (
    <section id="skills" className="py-32 relative">
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
            // Skills &amp; Experience
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            The <span className="text-gradient-magenta">arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
        </motion.div>

        {/* Infinite Tech Ticker */}
        <TechTicker />

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-neon-subtle-violet border border-neon-violet/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-neon-violet-glow" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Technologies</h3>
            </div>

            <div className="space-y-10">
              {categories.map((category) => {
                const categorySkills = skills.filter(
                  (s) => s.category === category.key
                )
                return (
                  <div key={category.key}>
                    <h4 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${category.color}`} />
                      {category.label}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                          whileHover={{ scale: 1.08, y: -3 }}
                          className={`relative px-4 py-2.5 rounded-lg border bg-bg-secondary cursor-default transition-all duration-300 ${chipColorMap[category.color]}`}
                        >
                          <span className="text-sm text-text-primary font-medium">
                            {skill.name}
                          </span>
                          {/* Neon progress bar */}
                          <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-bg-tertiary rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${barColorMap[category.color]} ${barGlowMap[category.color]}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level * 20}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Experience timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-neon-subtle-cyan border border-neon-cyan/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-neon-cyan-glow" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Experience</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-neon-violet via-neon-cyan to-neon-magenta opacity-30" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="relative pl-8"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-3 w-[22px] h-[22px] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-neon-violet border-2 border-bg-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>

                    <div className="p-5 rounded-xl bg-bg-secondary border border-border-subtle hover:border-neon-violet/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.08)]">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-neon-cyan bg-neon-subtle-cyan px-2.5 py-1 rounded-full">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="font-semibold text-text-primary text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neon-violet-glow mb-2 font-medium">
                        {item.company}
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-bg-tertiary text-text-muted border border-border-subtle"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
