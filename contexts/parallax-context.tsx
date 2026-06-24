"use client"

import { createContext, useContext, type ReactNode } from "react"
import { mouseState } from "@/components/three/mouse-tracker"

interface ParallaxContextValue {
  mouseState: typeof mouseState
}

const ParallaxContext = createContext<ParallaxContextValue>({
  mouseState,
})

export function ParallaxProvider({ children }: { children: ReactNode }) {
  return (
    <ParallaxContext.Provider value={{ mouseState }}>
      {children}
    </ParallaxContext.Provider>
  )
}

export function useParallax() {
  return useContext(ParallaxContext)
}
