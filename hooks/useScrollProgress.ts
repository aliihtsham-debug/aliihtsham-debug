"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface ScrollProgressState {
  progress: number
  activeSection: number
  sectionProgress: number
}

export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    activeSection: 0,
    sectionProgress: 0,
  })
  const rafId = useRef<number>(0)

  const update = useCallback(() => {
    const sections = ["hero", "about", "projects", "skills", "blog", "contact"]
    const scrollY = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0

    // Find active section
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

    // Calculate section-local progress
    const sectionEl = document.getElementById(sections[active])
    let sectionProgress = 0
    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect()
      const sectionHeight = rect.height
      const viewportProgress = Math.min(
        Math.max((window.innerHeight * 0.5 - rect.top) / sectionHeight,
        0),
        1
      )
      sectionProgress = viewportProgress
    }

    setState({ progress, activeSection: active, sectionProgress })
  }, [])

  useEffect(() => {
    const handler = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler, { passive: true })
    handler()

    return () => {
      window.removeEventListener("scroll", handler)
      window.removeEventListener("resize", handler)
      cancelAnimationFrame(rafId.current)
    }
  }, [update])

  return state
}
