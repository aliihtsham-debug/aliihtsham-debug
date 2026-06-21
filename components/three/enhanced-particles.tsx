"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { mouseState } from "./mouse-tracker"

// Shared velocity/inertia state accessible from other components
export const scrollState = {
  velocity: 0,
  targetVelocity: 0,
}

export function EnhancedParticles({ count = 1000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const mouseDelta = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)

  const { geometry, velocities } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const vels = new Float32Array(count * 3)

    const violet = new THREE.Color("#a855f7")
    const cyan = new THREE.Color("#22d3ee")
    const magenta = new THREE.Color("#ec4899")
    const white = new THREE.Color("#ffffff")

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5

      vels[i * 3] = (Math.random() - 0.5) * 0.002
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.001

      const choice = Math.random()
      const color = choice < 0.4 ? violet : choice < 0.7 ? cyan : choice < 0.9 ? magenta : white
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return { geometry: geo, velocities: vels }
  }, [count])

  // Track mouse velocity
  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => {
      mouseDelta.current.x = e.clientX - prevMouse.current.x
      mouseDelta.current.y = e.clientY - prevMouse.current.y
      prevMouse.current.x = e.clientX
      prevMouse.current.y = e.clientY
    }

    const scrollHandler = () => {
      const delta = window.scrollY - scrollY.current
      scrollState.targetVelocity = delta * 0.02
      scrollY.current = window.scrollY
    }

    window.addEventListener("mousemove", mouseHandler)
    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => {
      window.removeEventListener("mousemove", mouseHandler)
      window.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const positions = geometry.attributes.position.array as Float32Array

    // Smooth scroll velocity
    scrollState.velocity += (scrollState.targetVelocity - scrollState.velocity) * 0.05
    scrollState.targetVelocity *= 0.92 // Decay

    // Mouse velocity magnitude for warp intensity
    const mouseVelX = mouseDelta.current.x * 0.15
    const mouseVelY = mouseDelta.current.y * 0.15
    // Decay mouse delta
    mouseDelta.current.x *= 0.9
    mouseDelta.current.y *= 0.9

    const time = state.clock.elapsedTime
    const scrollWarp = scrollState.velocity

    for (let i = 0; i < count; i++) {
      // Base drift
      positions[i * 3] += velocities[i * 3] + mouseVelX * 0.01
      positions[i * 3 + 1] += velocities[i * 3 + 1] + mouseVelY * 0.01 + scrollWarp * 0.02
      positions[i * 3 + 2] += velocities[i * 3 + 2]

      // Scroll warp: particles stretch along Y based on scroll speed
      // Fast scroll = particles appear to streak downward
      const depthFactor = (positions[i * 3 + 2] + 10) / 20 // normalize depth
      positions[i * 3 + 1] += scrollWarp * depthFactor * 0.5

      // Mouse gravitational wake: push nearby particles
      const px = positions[i * 3]
      const py = positions[i * 3 + 1]
      const mouse3Dx = mouseState.smoothed.x * 8
      const mouse3Dy = mouseState.smoothed.y * 8
      const dx = px - mouse3Dx
      const dy = py - mouse3Dy
      const distSq = dx * dx + dy * dy
      const dist = Math.sqrt(distSq)

      if (dist < 4 && dist > 0.01) {
        const force = (4 - dist) * 0.008
        // Push away from mouse + add velocity-based warp
        positions[i * 3] += (dx / dist) * force + mouseVelX * (4 - dist) * 0.003
        positions[i * 3 + 1] += (dy / dist) * force + mouseVelY * (4 - dist) * 0.003
      }

      // Subtle wave motion
      positions[i * 3] += Math.sin(time * 0.3 + i * 0.01) * 0.001
      positions[i * 3 + 1] += Math.cos(time * 0.2 + i * 0.015) * 0.001

      // Wrap around
      if (positions[i * 3] > 15) positions[i * 3] = -15
      if (positions[i * 3] < -15) positions[i * 3] = 15
      if (positions[i * 3 + 1] > 15) positions[i * 3 + 1] = -15
      if (positions[i * 3 + 1] < -15) positions[i * 3 + 1] = 15
      if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -15
      if (positions[i * 3 + 2] < -15) positions[i * 3 + 2] = 5
    }

    geometry.attributes.position.needsUpdate = true

    // Subtle overall rotation influenced by scroll
    mesh.current.rotation.y = time * 0.0003 + scrollWarp * 0.1
    mesh.current.rotation.x = Math.sin(time * 0.0001) * 0.05 + mouseState.smoothed.y * 0.03
  })

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
