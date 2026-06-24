"use client"

import React from "react"
import { motion } from "framer-motion"
import { Mail, GitFork, Globe, Bird, ArrowUpRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: GitFork, label: "GitHub", href: "https://github.com/aliihtsham-debug" },
  { icon: Globe, label: "LinkedIn", href: "https://linkedin.com/in/aliihtsham" },
  { icon: Bird, label: "Twitter", href: "https://twitter.com" },
]

export function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute top-0 left-0 right-0 neon-line" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-violet/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Header */}
          <span
            className="text-neon-violet text-sm font-mono tracking-widest uppercase mb-4 block"
            style={{ transform: "translateZ(-15px)" }}
          >
            // Get in Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            Let&apos;s build something <span className="text-gradient-violet">extraordinary</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-violet to-neon-magenta mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] mb-8" />

          <p className="text-text-secondary text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Looking to automate your engineering pipeline, integrate intelligent multi-agent
            systems, or outgrow generic website templates? I&apos;m currently open to AI projects,
            web development, and consulting opportunities.
          </p>
        </motion.div>

        {/* CTA area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Email button with 3D press */}
          <motion.div
            className="btn-3d-press"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button size="xl" className="w-full max-w-sm shadow-[0_4px_0_rgba(168,85,247,0.4)] hover:shadow-[0_6px_0_rgba(168,85,247,0.5)] active:shadow-[0_1px_0_rgba(168,85,247,0.3)]" asChild>
              <a href="mailto:ali@codebrandstudio.com" className="group">
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Get in Touch
              </a>
            </Button>
          </motion.div>

          {/* Social links with 3D hover */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -6, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-12 h-12 rounded-xl bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-neon-violet-glow hover:border-neon-violet/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-sm text-text-muted mt-4"
          >
            <span>Lahore, Pakistan — Available Worldwide</span>
            <ArrowUpRight className="w-3 h-3 text-neon-cyan/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
