"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

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

export function LightingRig() {
  return (
    <>
      <ambientLight intensity={0.06} />
      <directionalLight position={[5, 5, 5]} intensity={0.25} color="#a855f7" />
      <directionalLight position={[-3, 2, 3]} intensity={0.12} color="#22d3ee" />
      <directionalLight position={[0, -5, -5]} intensity={0.08} color="#ec4899" />

      <PulsingLight position={[-4, -3, 4]} color="#ec4899" intensity={0.35} speed={1.2} />
      <PulsingLight position={[4, 3, -2]} color="#a855f7" intensity={0.25} speed={1.8} />
      <PulsingLight position={[0, 4, 3]} color="#22d3ee" intensity={0.18} speed={1.0} />
      <PulsingLight position={[-2, -8, -5]} color="#a855f7" intensity={0.15} speed={2.0} />
      <PulsingLight position={[3, -12, -8]} color="#22d3ee" intensity={0.12} speed={1.5} />
    </>
  )
}
