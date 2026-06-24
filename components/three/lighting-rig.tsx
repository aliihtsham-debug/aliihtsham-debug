"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Section color themes
const SECTION_THEMES = [
  { primary: "#a855f7", secondary: "#22d3ee", accent: "#ec4899" },  // Hero
  { primary: "#22d3ee", secondary: "#a855f7", accent: "#ec4899" },  // About
  { primary: "#ec4899", secondary: "#a855f7", accent: "#22d3ee" },  // Projects
  { primary: "#a855f7", secondary: "#ec4899", accent: "#22d3ee" },  // Skills
  { primary: "#22d3ee", secondary: "#ec4899", accent: "#a855f7" },  // Blog
  { primary: "#ec4899", secondary: "#22d3ee", accent: "#a855f7" },  // Contact
]

function PulsingLight({
  position,
  color,
  intensity,
  speed = 1.5,
}: {
  position: [number, number, number]
  color: string
  intensity: number
  speed?: number
}) {
  const ref = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.intensity = intensity * (0.75 + Math.sin(state.clock.elapsedTime * speed) * 0.25)
    }
  })

  return <pointLight ref={ref} position={position} intensity={intensity} color={color} distance={15} />
}

interface LightingRigProps {
  activeSection?: number
}

export function LightingRig({ activeSection = 0 }: LightingRigProps) {
  const theme = SECTION_THEMES[activeSection] || SECTION_THEMES[0]

  // Smoothly animated light positions
  const light1Pos: [number, number, number] = [
    5 + Math.sin(activeSection * 0.5) * 2,
    5,
    5
  ]
  const light2Pos: [number, number, number] = [
    -3 + Math.cos(activeSection * 0.3) * 2,
    2,
    3
  ]
  const light3Pos: [number, number, number] = [
    0,
    -5 - activeSection * 0.5,
    -5
  ]

  return (
    <>
      <ambientLight intensity={0.06} />
      <directionalLight position={light1Pos} intensity={0.25} color={theme.primary} />
      <directionalLight position={light2Pos} intensity={0.12} color={theme.secondary} />
      <directionalLight position={light3Pos} intensity={0.08} color={theme.accent} />

      <PulsingLight position={[-4, -3, 4]} color={theme.accent} intensity={0.35} speed={1.2} />
      <PulsingLight position={[4, 3, -2]} color={theme.primary} intensity={0.25} speed={1.8} />
      <PulsingLight position={[0, 4, 3]} color={theme.secondary} intensity={0.18} speed={1.0} />
      <PulsingLight position={[-2, -8, -5]} color={theme.primary} intensity={0.15} speed={2.0} />
      <PulsingLight position={[3, -12, -8]} color={theme.secondary} intensity={0.12} speed={1.5} />
    </>
  )
}
