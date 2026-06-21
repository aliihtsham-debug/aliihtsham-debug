"use client"

import { useState, useEffect } from "react"

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "blog", "contact"]

    const handler = () => {
      const scrollY = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? scrollY / docHeight : 0
      setProgress(Math.min(Math.max(p, 0), 1))

      let active = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5) {
            active = i
            break
          }
        }
      }
      setActiveSection(active)
    }

    window.addEventListener("scroll", handler, { passive: true })
    handler()
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return { progress, activeSection }
}
