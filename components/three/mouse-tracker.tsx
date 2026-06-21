"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export const mouseState = {
  current: new THREE.Vector2(0, 0),
  smoothed: new THREE.Vector2(0, 0),
}

export function MouseTracker() {
  const raw = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      raw.current.x = (e.clientX / window.innerWidth) * 2 - 1
      raw.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  useFrame(() => {
    mouseState.smoothed.lerp(raw.current, 0.08)
    mouseState.current.copy(raw.current)
  })

  return null
}
