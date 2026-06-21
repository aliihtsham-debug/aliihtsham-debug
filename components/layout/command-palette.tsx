"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command } from "cmdk"
import { Search, FileText, User, Code, Mail, ArrowRight } from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CommandItem {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
  group: string
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("")

  const commands: CommandItem[] = [
    {
      id: "about",
      label: "About Me",
      icon: <User className="w-4 h-4" />,
      action: () =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
      group: "Navigation",
    },
    {
      id: "projects",
      label: "View Projects",
      icon: <Code className="w-4 h-4" />,
      action: () =>
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" }),
      group: "Navigation",
    },
    {
      id: "skills",
      label: "Skills & Experience",
      icon: <FileText className="w-4 h-4" />,
      action: () =>
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
      group: "Navigation",
    },
    {
      id: "blog",
      label: "Read Blog",
      icon: <FileText className="w-4 h-4" />,
      action: () =>
        document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }),
      group: "Navigation",
    },
    {
      id: "contact",
      label: "Get in Touch",
      icon: <Mail className="w-4 h-4" />,
      action: () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" }),
      group: "Navigation",
    },
    {
      id: "github",
      label: "GitHub Profile",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => window.open("https://github.com/aliihtsham-debug", "_blank"),
      group: "External",
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => window.open("https://linkedin.com/in/aliihtsham", "_blank"),
      group: "External",
    },
  ]

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-black/70"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
            className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 px-4"
          >
            <Command className="rounded-2xl border border-neon-violet/20 bg-bg-secondary/95 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden">
              <div className="flex items-center border-b border-border-subtle px-4">
                <Search className="w-4 h-4 text-neon-violet mr-3" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="flex-1 h-12 bg-transparent text-text-primary text-sm placeholder:text-text-muted focus:outline-none"
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-text-muted">
                  No results found.
                </Command.Empty>
                {filteredCommands.map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    onSelect={() => {
                      cmd.action()
                      onOpenChange(false)
                      setSearch("")
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-text-secondary hover:bg-neon-subtle-violet hover:text-neon-violet-glow cursor-pointer transition-colors duration-150 animate-in"
                  >
                    <span className="text-text-muted">{cmd.icon}</span>
                    <span>{cmd.label}</span>
                  </Command.Item>
                ))}
              </Command.List>
              <div className="border-t border-border-subtle px-4 py-2.5 flex items-center gap-4 text-xs text-text-muted font-mono">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>esc Close</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
